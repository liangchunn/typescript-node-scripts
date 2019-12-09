import chalk from 'chalk'
import * as typescript from 'typescript'
import '../injectors/dev'
import { clearConsole } from '../lib/clearConsole'
import { createCompiler } from '../lib/webpackCompiler'
import { RuntimeOptions, IS_INTERACTIVE } from '../util/env'
import { checkCustomEslintRequirements } from './util/checkCustomEslintRequirements'
import { getWebpackConfig } from './util/getWebpackConfig'
import { checkPrettierrcFile } from './util/checkPrettierrcFile'

if (IS_INTERACTIVE) {
  clearConsole()
}

console.log(chalk.cyan('Starting the development server...'))
console.log(chalk.green('Using TypeScript v' + typescript.version))
console.log()

checkCustomEslintRequirements()
checkPrettierrcFile()

const compiler = createCompiler(getWebpackConfig('development'), RuntimeOptions)

// start the webpack watchers
compiler.watch({}, err => {
  if (err) {
    throw err
  }
})
