import { spawn } from 'node:child_process'

const command = process.platform === 'win32' ? 'next.cmd' : 'next'

const child = spawn(command, ['build'], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
  },
  shell: process.platform === 'win32',
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 1)
})
