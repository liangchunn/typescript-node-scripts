import * as path from 'path'
import { spawn, exec, ChildProcess } from 'child_process'

import chalk from 'chalk'
import webpack from 'webpack'
import psTree, { hasPS } from 'pstree.remy'

import { formatWebpackMessages } from './formatWebpackMessages'
import { clearConsole } from './clearConsole'
import { isWindows } from '../util/platform'
import { TNSOptions } from '../types/TNS'

const isInteractive = process.stdout.isTTY

/**
 * TODO dont use too many assertion operators (!)
 * @param config
 * @param options
 */
export function createCompiler(
  config: webpack.Configuration,
  options: TNSOptions
): webpack.Compiler {
  let compiler: webpack.Compiler
  let app: ChildProcess | null
  let appRunning = false
  let pid: string | null

  try {
    compiler = webpack(config)
  } catch (err) {
    console.log(chalk.red('Failed to compile.'))
    console.log()
    console.log(err.message || err)
    console.log()
    process.exit(1)
    throw err.message
  }

  compiler!.hooks.invalid.tap('compileInvalidate', () => {
    if (isInteractive) {
      clearConsole()
    }
    console.log('Compiling...')
    if (appRunning && app) {
      if (isWindows()) {
        exec('taskkill /pid ' + pid + ' /T /F')
        appRunning = false
      } else {
        // pstree is used to kill the full subtree of a spawned app
        psTree(pid!, (_, children) => {
          if (hasPS) {
            // we now send SIGTERM to the spawned process
            spawn('kill', ['-s', 'SIGTERM', pid!].concat(children)).on(
              'close',
              () => {
                appRunning = false
              }
            )
          } else {
            const pids = children.concat(pid!).sort()
            pids.forEach(pid => {
              // 15 is for SIGTERM
              exec('kill -15 ' + pid, () => {
                appRunning = false
              })
            })
          }
        })
      }
    }
  })

  compiler!.hooks.done.tap('compileDone', stats => {
    if (isInteractive) {
      clearConsole()
    }

    const statsJson = stats.toJson({})
    const messages = formatWebpackMessages(statsJson)
    const isSuccessful = !messages.errors.length && !messages.warnings.length

    if (isSuccessful) {
      console.log(
        `${chalk.green('Compiled successfully!')} ${chalk.dim(
          `(${statsJson.time}ms)`
        )}`
      )
      console.log()
    }

    if (messages.errors.length) {
      const collapsedErrorLength = messages.errors.length - 1

      if (messages.errors.length > 1 && !options.noCollapse) {
        messages.errors.length = 1
      }

      console.log(chalk.red('Failed to compile.\n'))
      console.log(messages.errors.join('\n\n'))
      if (collapsedErrorLength && !options.noCollapse) {
        console.log()
        console.log(
          chalk.red(
            collapsedErrorLength +
              (collapsedErrorLength > 1 ? ' errors have' : ' error has') +
              ' been collapsed.'
          )
        )
      }
      return
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'))
      console.log(messages.warnings.join('\n\n'))

      console.log(
        '\nSearch for the ' +
          chalk.cyan('keywords') +
          ' to learn more about each warning.'
      )
      console.log(
        'To ignore, add ' +
          chalk.yellow('// tslint:disable-next-line') +
          ' to the line before.\n'
      )
    }

    // Start the app if there are no errors
    if (!appRunning && !messages.errors.length && !options.noAutoStart) {
      app = spawn('node', [
        path.join(config.output!.path!, config.output!.filename!),
      ])

      if (app.pid > 0) {
        pid = app.pid.toString() // eslint-disable-line
        appRunning = true
        console.log(chalk.green('App started!'))
      }

      app.on('error', e => {
        console.log(chalk.red('Failed to start app: ' + e.message))
        pid = null
        app = null
        appRunning = false
      })

      app.stdout.pipe(process.stdout)
      app.stderr.pipe(process.stderr)

      app.on('exit', (code, signal) => {
        if (code !== null) {
          console.log(
            code > 0
              ? chalk.red('App exited with code ' + code + '.')
              : chalk.green('App exited with code ' + code + '.')
          )
        }
        if (signal !== null) {
          console.log(
            signal !== 'SIGTERM'
              ? chalk.red('App killed with signal ' + signal + '.')
              : chalk.green('App killed with signal SIGTERM.')
          )
        }
        app = null
        appRunning = false
        pid = null
      })
    }
  })

  return compiler!
}
