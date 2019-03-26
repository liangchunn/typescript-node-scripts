import '../injectors/dev'
import * as fs from 'fs'
import * as webpack from 'webpack'
import * as typescript from 'typescript'
import chalk from 'chalk'
import { merge } from 'lodash'
import { createCompiler } from '../lib/webpackCompiler'
import { clearConsole } from '../lib/clearConsole'
import { WebpackDevConfig } from '../lib/webpack.config.dev'
import { RuntimeOptions } from '../util/env'
import { paths } from '../lib/paths'

const isInteractive = process.stdout.isTTY
let compiler: webpack.Compiler

if (isInteractive) {
  clearConsole()
}

console.log(chalk.cyan('Starting the development server...'))
console.log(chalk.green('Using TypeScript v' + typescript.version))

if (fs.existsSync(paths.webpackOverride)) {
  console.log(
    chalk.yellow(
      '[EXPERIMENTAL] Detected webpack.config.override.js file, merging configuration...'
    )
  )
  const mergedConfig = merge(WebpackDevConfig, require(paths.webpackOverride))
  compiler = createCompiler(mergedConfig, RuntimeOptions)
} else {
  compiler = createCompiler(WebpackDevConfig, RuntimeOptions)
}
// start the webpack watchers
compiler.watch({}, err => {
  if (err) {
    throw err
  }
})
