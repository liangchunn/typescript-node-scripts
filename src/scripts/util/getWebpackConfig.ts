import * as fs from 'fs'
import * as webpack from 'webpack'
import chalk from 'chalk'
import merge from 'webpack-merge'
import { paths } from '../../lib/paths'
import { createWebpackConfig } from '../../lib/createWebpackConfig'

/**
 * Gets the webpack configuration depending on the environment being passed in
 *
 * This also checks for a custom 'webpack.config.override.js' and merges it with the base configuration provided by the library
 * @param environment
 */
export function getWebpackConfig(
  environment: 'development' | 'production'
): webpack.Configuration {
  const baseConfig = createWebpackConfig(environment)
  if (fs.existsSync(paths.webpackOverride)) {
    console.log(chalk.cyan('• Using merged webpack.config.override.js'))
    const customConfig: (isDev: boolean) => any = require(paths.webpackOverride)
    if (typeof customConfig === 'function') {
      return merge(
        baseConfig as any,
        customConfig(environment === 'development')
      ) as webpack.Configuration
    } else if (typeof customConfig === 'object') {
      return merge(
        baseConfig as any,
        require(paths.webpackOverride)
      ) as webpack.Configuration
    } else {
      console.log(chalk.red('Failed to parse webpack.config.override.js'))
      process.exit(1)
    }
  } else {
    return baseConfig
  }
}
