#!/usr/bin/env node
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { spawnSync } = require('child_process')

process.on('unhandledRejection', err => {
  throw err
})

const args = process.argv.slice(2)

const scriptIndex = args.findIndex(
  x => x === 'start' || x === 'test' || x === 'build' || x === 'create'
)

const script = scriptIndex === -1 ? args[0] : args[scriptIndex]
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []

switch (script) {
  case 'migration/tslint-to-eslint':
  case 'build':
  case 'test':
  case 'create':
  case 'start': {
    const result = spawnSync(
      'node',
      nodeArgs
        .concat(require.resolve('../build/scripts/' + script))
        .concat(args.slice(scriptIndex + 1)),
      {
        stdio: 'inherit',
      }
    )
    if (result.signal) {
      if (result.signal === 'SIGKILL') {
        console.log(
          'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
        )
      } else if (result.signal === 'SIGTERM') {
        console.log(
          'The build failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
        )
      }
      process.exit(1)
    }
    process.exit(result.status)
    break
  }
  case undefined: {
    console.log('No command provided.')
    break
  }
  default:
    console.log('Unknown script "' + script + '".')
    break
}
