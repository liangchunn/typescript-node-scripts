import chalk from 'chalk'
import webpack from 'webpack'
import * as path from 'path'
import * as typescript from 'typescript'
import { paths } from '../lib/paths'
import { getBundleSize, diffFileSize } from './util/fileSizeReporter'
import { formatWebpackMessages } from '../lib/formatWebpackMessages'
import { WebpackProdConfig } from '../lib/webpack.config.prod'
import { RuntimeOptions, IS_CI } from '../util/env'

const prodBundlePath = path.join(paths.appBuild, paths.prodBundle)
const sizeBeforeBuild = getBundleSize(prodBundlePath)

const build = (): Promise<{ stats: webpack.Stats; warnings: string[] }> => {
  console.log(chalk.cyan('Creating an optimized production build...'))
  console.log(chalk.green('Using TypeScript v' + typescript.version))
  const compiler = webpack(WebpackProdConfig)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      const messages = formatWebpackMessages(stats.toJson())
      if (messages.errors.length) {
        if (messages.errors.length > 1 && !RuntimeOptions.noCollapse) {
          messages.errors.length = 1
        }
        return reject(new Error(messages.errors.join('\n\n')))
      }

      if (IS_CI && messages.warnings.length) {
        if (RuntimeOptions.bypassCiWarnings) {
          console.log(
            chalk.yellow(
              '\nBypassing warnings as CI errors due to --bypass-ci-warnings option.\n'
            )
          )
        } else {
          console.log(
            chalk.yellow(
              '\nTreating warnings as errors because process.env.CI = true.\n' +
                'Most CI servers set it automatically.\n'
            )
          )
          return reject(new Error(messages.warnings.join('\n\n')))
        }
      }

      return resolve({
        stats,
        warnings: messages.warnings,
      })
    })
  })
}

build()
  .then(
    ({ warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'))
        console.log(warnings.join('\n\n'))

        console.log(
          '\nSearch for the keywords to learn more about each warning.'
        )
        console.log(
          'To ignore, add ' +
            chalk.cyan('// tslint:disable-next-line') +
            ' to the line before.\n'
        )
      }
    },
    err => {
      console.log(chalk.red('Failed to compile.\n'))
      console.log(err.message)
      console.log()
      process.exit(1)
    }
  )
  .then(() => {
    const sizeAfterBuild = getBundleSize(prodBundlePath)
    console.log()
    console.log(chalk.greenBright('Successfully built bundle.prod.js!'))
    console.log(
      'Bundle size: ' + diffFileSize(sizeBeforeBuild!, sizeAfterBuild!)
    )
    console.log()
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })