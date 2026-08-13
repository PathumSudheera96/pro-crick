import { spawn } from 'node:child_process'

const isWindows = process.platform === 'win32'
const command = isWindows ? 'cmd' : 'next'
const args = isWindows ? ['/d', '/s', '/c', 'next build'] : ['build']

const child = spawn(command, args, {
  env: {
    ...process.env,
    NODE_ENV: 'production',
  },
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 1)
})
