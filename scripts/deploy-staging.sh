#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CREDENTIALS_FILE="${ROOT_DIR}/.cpanel_creds"

SKIP_CHECKS=0
SKIP_MIGRATIONS=0
DRY_RUN=0

usage() {
  cat <<'EOF'
Usage: bash scripts/deploy-staging.sh [options]

Options:
  --skip-checks      Skip local lint/typecheck/build verification
  --skip-migrations  Skip remote Payload migrations
  --dry-run          Show rsync changes without applying them
  -h, --help         Show this help text

Credentials:
  The script reads these values from environment variables or from .cpanel_creds:
  - SERVER_IP
  - USER
  - PORT
  - APP_ROOT

Expected .cpanel_creds example:
  SERVER_IP=66.29.132.210
  USER=ovixivvl
  PORT=21098
  APP_ROOT="/home/ovixivvl/procric.ovixglobal.com"
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --)
      shift
      continue
      ;;
    --skip-checks)
      SKIP_CHECKS=1
      shift
      ;;
    --skip-migrations)
      SKIP_MIGRATIONS=1
      shift
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [[ -f "${CREDENTIALS_FILE}" ]]; then
  # shellcheck disable=SC1090
  source "${CREDENTIALS_FILE}"
fi

: "${SERVER_IP:?SERVER_IP is required}"
: "${USER:?USER is required}"
: "${PORT:?PORT is required}"
: "${APP_ROOT:?APP_ROOT is required}"

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is required." >&2
  exit 1
fi

if ! command -v ssh >/dev/null 2>&1; then
  echo "ssh is required." >&2
  exit 1
fi

cd "${ROOT_DIR}"

if [[ "${SKIP_CHECKS}" -eq 0 ]]; then
  echo "==> Running local checks"
  pnpm lint
  pnpm typecheck
  pnpm build
fi

SSH_TARGET="${USER}@${SERVER_IP}"
SSH_OPTS=(-p "${PORT}")
APP_KEY="$(basename "${APP_ROOT}")"

RSYNC_ARGS=(
  -az
  --itemize-changes
  --exclude ".git/"
  --exclude ".DS_Store"
  --exclude "**/.DS_Store"
  --exclude ".next/"
  --exclude "node_modules/"
  --exclude ".env"
  --exclude ".env.*"
  --exclude "storage/"
  --exclude ".pnpm-store/"
  --exclude ".cpanel_creds"
  --exclude "tsconfig.tsbuildinfo"
  --exclude "*.tsbuildinfo"
  --exclude "stderr.log"
  --exclude "*.log"
  --filter "P .htaccess"
  --filter "P .htaccess.*"
  --filter "P .well-known/"
  --filter "P cgi-bin/"
  --filter "P tmp/"
  --filter "P storage/"
  --filter "P node_modules"
  --filter "P node_modules/"
  --filter "P .deploy-backups/"
  --filter "P .deploy-*/"
  --filter "P .release-*/"
  --filter "P *.zip"
  --filter "P activate-step03.sh"
  --filter "P inspect-prod-db.sh"
  --filter "P run-prod-migrations.sh"
  --filter "P server.js"
  --filter "P verify-and-restart.sh"
  --filter "P storage/"
  --filter "P .env"
  --filter "P .env.*"
  --filter "P node_modules/"
  -e "ssh -p ${PORT}"
)

if [[ "${DRY_RUN}" -eq 1 ]]; then
  RSYNC_ARGS+=(--dry-run)
fi

echo "==> Syncing repository to ${SSH_TARGET}:${APP_ROOT}"
rsync "${RSYNC_ARGS[@]}" "${ROOT_DIR}/" "${SSH_TARGET}:${APP_ROOT}/"

REMOTE_SCRIPT=$(cat <<EOF
set -euo pipefail
cd "${APP_ROOT}"

export APP_KEY="${APP_KEY}"
NODEVENV_ROOT="\${HOME}/nodevenv/\${APP_KEY}"
NODEVENV_BIN=""

if [[ -d "\${NODEVENV_ROOT}" ]]; then
  while IFS= read -r node_dir; do
    if [[ -x "\${node_dir}/bin/activate" ]]; then
      NODEVENV_BIN="\${node_dir}/bin"
    fi
  done < <(find "\${NODEVENV_ROOT}" -mindepth 1 -maxdepth 1 -type d | sort)
fi

if [[ -z "\${NODEVENV_BIN}" ]]; then
  echo "Unable to locate the cPanel Node environment under \${NODEVENV_ROOT}" >&2
  exit 1
fi

# shellcheck disable=SC1090
set +u
source "\${NODEVENV_BIN}/activate"
set -u

eval "\$(python3 - <<'PY'
import json
import os
import shlex

app_key = os.environ["APP_KEY"]
config_path = os.path.expanduser("~/.cl.selector/node-selector.json")
with open(config_path, "r", encoding="utf-8") as f:
    config = json.load(f)

env_vars = config[app_key]["env_vars"]
for key, value in env_vars.items():
    print(f"export {key}={shlex.quote(str(value))}")
PY
)"

export PATH="\${NODEVENV_BIN}:\${PATH}"

corepack pnpm install --frozen-lockfile
corepack pnpm prepare:next-env
corepack pnpm exec next build --webpack
corepack pnpm prepare:next-env
corepack pnpm payload migrate:status
EOF
)

if [[ "${SKIP_MIGRATIONS}" -eq 0 ]]; then
  REMOTE_SCRIPT+=$'\n''corepack pnpm payload migrate'
fi

REMOTE_SCRIPT+=$'\n''cloudlinux-selector restart --json --interpreter nodejs --app-root "'"${APP_KEY}"'"'

if [[ "${DRY_RUN}" -eq 1 ]]; then
  echo "==> Dry run enabled, skipping remote install/build/restart"
  exit 0
fi

echo "==> Installing, building, migrating, and restarting remotely"
ssh "${SSH_OPTS[@]}" "${SSH_TARGET}" "${REMOTE_SCRIPT}"

echo "==> Deployment complete"
