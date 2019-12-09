import chalk from 'chalk'
import glob from 'glob'
import { paths } from '../../lib/paths'

const appPackageJson: {} = require(paths.appPackageJson)

/**
 * Checks if there is a Prettier configuration file as described in
 * https://prettier.io/docs/en/configuration.html
 *
 * If it's not defined, print a warning so that the user doesn't get confused
 * from linting errors/warnings
 */
export function checkPrettierrcFile(): void {
  const matches = glob.sync(
    '{.prettierrc?(.json|.yaml|.yml|.toml|.js),prettier.config.js}'
  )
  if (!matches.length && !appPackageJson.hasOwnProperty('prettier')) {
    console.log(
      chalk.yellow(
        `• No Prettier configuration found, consider adding one to avoid linting confusion`
      )
    )
  }
}
