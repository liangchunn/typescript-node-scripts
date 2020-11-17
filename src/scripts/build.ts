import chalk from 'chalk'
import * as path from 'path'
import * as typescript from 'typescript'
import webpack from 'webpack'
import { formatWebpackMessages } from '../lib/formatWebpackMessages'
import { paths } from '../lib/paths'
import { IS_CI, RuntimeOptions } from '../util/env'
import { diffFileSize, getBundleSize } from './util/fileSizeReporter'
import { getWebpackConfig } from './util/getWebpackConfig'

const prodBundlePath = path.join(paths.appBuild, paths.prodBundle)
const sizeBeforeBuild = getBundleSize(prodBundlePath)

const build = (): Promise<{ stats: webpack.Stats; warnings: string[] }> => {
  console.log(chalk.cyan('Creating an optimized production build...'))
  console.log(chalk.green('Using TypeScript v' + typescript.version))
  console.log()

  const compiler: webpack.Compiler = webpack(getWebpackConfig('production'))

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      const messages = formatWebpackMessages(stats!.toJson())
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
        stats: stats!,
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
    },
    (err) => {
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
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })
