import chalk from 'chalk'
import * as fs from 'fs'
import * as typescript from 'typescript'
import * as webpack from 'webpack'
import merge from 'webpack-merge'
import '../injectors/dev'
import { clearConsole } from '../lib/clearConsole'
import { paths } from '../lib/paths'
import { WebpackDevConfig } from '../lib/webpack.config.dev'
import { createCompiler } from '../lib/webpackCompiler'
import { RuntimeOptions, IS_INTERACTIVE } from '../util/env'

let compiler: webpack.Compiler

if (IS_INTERACTIVE) {
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
  // TODO: remove `any` once merge() updates to the latest webpack definitions
  const mergedConfig = merge(
    WebpackDevConfig as any,
    require(paths.webpackOverride)
  )
  // TODO: remove `webpack.Configuration` once merge() updates to the latest webpack definitions
  compiler = createCompiler(
    mergedConfig as webpack.Configuration,
    RuntimeOptions
  )
} else {
  compiler = createCompiler(WebpackDevConfig, RuntimeOptions)
}
// start the webpack watchers
compiler.watch({}, err => {
  if (err) {
    throw err
  }
})
