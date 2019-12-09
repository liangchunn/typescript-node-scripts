import chalk from 'chalk'
import glob from 'glob'
import { RuntimeOptions, TNS_ARGUMENTS } from '../../util/env'

/**
 * Preflight check for ESLint configurations
 *
 * If there are .eslintrc.* files in the root project, but the override argument was not passed to TNS, it will display a warning
 * If the argument is passed but no .eslintrc.* files are detected, it will display an error, and stop the program
 */
export function checkCustomEslintRequirements(): void {
  try {
    const matches = glob.sync('.eslintrc.*')
    if (matches.length) {
      if (!RuntimeOptions.overrideEslintConfig) {
        console.log(
          chalk.yellow(
            `• Ignoring .eslintrc.* files for compilation, since the argument '${TNS_ARGUMENTS.OVERRIDE_ESLINT_CONFIG}' was not passed`
          )
        )
      } else {
        console.log(chalk.cyan('• Using custom .eslintrc.* files'))
      }
    }
    if (!matches.length && RuntimeOptions.overrideEslintConfig) {
      console.log(
        chalk.redBright(
          `You've passed the argument '${TNS_ARGUMENTS.OVERRIDE_ESLINT_CONFIG}' but there was no ESLint configuration file(s) (.eslintrc.*) found.`
        )
      )
      console.log(
        chalk.redBright(
          `Either add a valid configuration(s), or remove this argument from the 'typescript-node-scripts' command in 'package.json'.`
        )
      )
      console.log()
      process.exit(1)
    }
  } catch (err) {
    console.error(err)
    return process.exit(1)
  }
}
