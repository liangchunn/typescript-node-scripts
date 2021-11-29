import chalk from 'chalk'
import * as path from 'path'
import webpack from 'webpack'
import { TNSOptions } from '../types/TNS'
import { clearConsole } from './clearConsole'
import { formatWebpackMessages } from './formatWebpackMessages'
import { AppController } from './processHandler'
import { IS_INTERACTIVE } from '../util/env'

const { argv } = process
const argvSeparatorIndex = argv.indexOf('--')
const appArgs: string[] = ~argvSeparatorIndex
  ? process.argv.slice(argvSeparatorIndex + 1, argv.length)
  : []

export function createCompiler(
  config: webpack.Configuration,
  options: TNSOptions
): webpack.Compiler {
  let compiler: webpack.Compiler
  const controller = new AppController(
    path.join(config.output!.path!, config.output!.filename! as string),
    appArgs
  )

  try {
    compiler = webpack(config)
  } catch (err: any) {
    console.log(chalk.red('Failed to compile.'))
    console.log()
    console.log(err.message || err)
    console.log()
    process.exit(1)
  }

  compiler.hooks.invalid.tap('compileInvalidate', async () => {
    if (IS_INTERACTIVE) {
      clearConsole()
    }
    console.log('Compiling...')
    console.log()
    if (!options.noAutoStart) {
      await controller.stopApp()
    }
  })

  compiler.hooks.done.tap('compileDone', (stats) => {
    if (IS_INTERACTIVE) {
      clearConsole()
    }
    const statsJson = stats.toJson({ errors: true, warnings: true })
    const messages = formatWebpackMessages(statsJson)
    const isSuccessful = !messages.errors.length && !messages.warnings.length

    if (isSuccessful) {
      const successMessage = chalk.green('Compiled successfully!')
      const time = chalk.dim(`(${statsJson.time}ms)`)
      console.log(`${successMessage} ${time}`)
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
          chalk.yellow('// eslint-disable-next-line') +
          ' to the line before.\n'
      )
    }

    // Start the app if there are no errors
    if (!messages.errors.length && !options.noAutoStart) {
      controller.runApp()
    }
  })

  return compiler
}
