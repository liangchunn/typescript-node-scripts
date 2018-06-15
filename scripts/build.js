const webpack = require('webpack')
const chalk = require('chalk')
const config = require('../lib/webpack.config.prod')
const formatWebpackMessages = require('../lib/formatWebpackMessages')
const getBundleSize = require('../lib/getBundleSize')
const paths = require('../lib/paths')

const { argv } = process
const noCollapse = argv.indexOf('--no-collapse') > -1
const bypassCiWarnings = argv.indexOf('--bypass-ci-warnings') > -1
const isCi =
    process.env.CI &&
    (typeof process.env.CI !== 'string' ||
        process.env.CI.toLowerCase() !== 'false')

const build = () => {
    console.log(chalk.cyan('Creating an optimized production build...'))
    const compiler = webpack(config)
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err)
            }
            const messages = formatWebpackMessages(stats.toJson({}, true))
            if (messages.errors.length) {
                if (messages.errors.length > 1 && !noCollapse) {
                    messages.errors.length = 1
                }
                return reject(new Error(messages.errors.join('\n\n')))
            }

            if (isCi && messages.warnings.length) {
                if (bypassCiWarnings) {
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
        const bundleSize = getBundleSize(paths.appBuild + '/bundle.prod.js')
        console.log(chalk.greenBright('Successfully built bundle.prod.js!'))
        console.log(chalk.green('Bundle size: ' + bundleSize + 'kB'))
        console.log()
    })
    .catch(err => {
        if (err && err.message) {
            console.log(err.message)
        }
        process.exit(1)
    })
