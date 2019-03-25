import '../injectors/dev'
import chalk from 'chalk'
import * as typescript from 'typescript'
import { createCompiler } from '../lib/webpackCompiler'
import { clearConsole } from '../lib/clearConsole'
import { WebpackDevConfig } from '../lib/webpack.config.dev'
import { RuntimeOptions } from '../util/env'

const isInteractive = process.stdout.isTTY

const compiler = createCompiler(WebpackDevConfig, RuntimeOptions)

if (isInteractive) {
  clearConsole()
}

console.log(chalk.cyan('Starting the development server...'))
console.log(chalk.green('Using TypeScript v' + typescript.version))

// start the webpack watchers
compiler.watch({}, err => {
  if (err) {
    throw err
  }
})
