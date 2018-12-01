const chalk = require('chalk')
const formatWebpackMessages = require('./formatWebpackMessages')
const clearConsole = require('./clearConsole')
const { spawn, exec } = require('child_process')
const path = require('path')
const { isWindows } = require('./util/platform')
const psTree = require('pstree.remy')

const isInteractive = process.stdout.isTTY

const createCompiler = (webpack, config, options = {}) => {
    let compiler

    let app = null
    let appRunning = false
    let pid = null

    try {
        compiler = webpack(config)
    } catch (err) {
        console.log(chalk.red('Failed to compile.'))
        console.log()
        console.log(err.message || err)
        console.log()
        process.exit(1)
    }

    compiler.hooks.invalid.tap('compileInvalidate', () => {
        if (isInteractive) {
            clearConsole()
        }
        console.log('Compiling...')
        if (appRunning && app) {
            if (isWindows) {
                exec('taskkill /pid ' + pid + ' /T /F')
                appRunning = false
            } else {
                // pstree is used to kill the full subtree of a spawned app
                psTree(pid, (_, children) => {
                    if (psTree.hasPS) {
                        // we now send SIGTERM to the spawned process
                        spawn(
                            'kill',
                            ['-s', 'SIGTERM', pid].concat(children)
                        ).on('close', () => {
                            appRunning = false
                        })
                    } else {
                        const pids = children.concat(pid).sort()
                        pids.forEach(pid => {
                            // 15 is for SIGTERM
                            exec('kill -15 ' + pid, () => {
                                /* eslint-disable-line */
                            })
                        })
                        appRunning = false
                    }
                })
            }
        }
    })

    compiler.hooks.done.tap('compileDone', stats => {
        if (isInteractive) {
            clearConsole()
        }

        const statsJson = stats.toJson({}, true)
        const messages = formatWebpackMessages(statsJson)
        const isSuccessful =
            !messages.errors.length && !messages.warnings.length

        if (isSuccessful) {
            console.log(
                `${chalk.green('Compiled successfully!')} ${chalk.dim(
                    `(${statsJson.time}ms)`
                )}`
            )
            console.log()
        }

        if (messages.errors.length) {
            const collapsedErrorLength = messages.errors.length - 1

            if (messages.errors.length > 1 && !options.noCollapse) {
                messages.errors.length = 1
            }

            console.log(chalk.red('Failed to compile.\n'))
            console.log(messages.errors.join('\n\n'))
            if (collapsedErrorLength && !options.noCollapse) {
                console.log()
                console.log(
                    chalk.red(
                        collapsedErrorLength +
                            (collapsedErrorLength > 1
                                ? ' errors have'
                                : ' error has') +
                            ' been collapsed.'
                    )
                )
            }
            return
        }

        // Show warnings if no errors were found.
        if (messages.warnings.length) {
            console.log(chalk.yellow('Compiled with warnings.\n'))
            console.log(messages.warnings.join('\n\n'))

            console.log(
                '\nSearch for the ' +
                    chalk.cyan('keywords') +
                    ' to learn more about each warning.'
            )
            console.log(
                'To ignore, add ' +
                    chalk.yellow('// tslint:disable-next-line') +
                    ' to the line before.\n'
            )
        }

        // Start the app if there are no errors
        if (!appRunning && !messages.errors.length && !options.noAutoStart) {
            app = spawn('node', [
                path.join(config.output.path, config.output.filename),
            ])

            if (app.pid > 0) {
                pid = app.pid // eslint-disable-line
                appRunning = true
                console.log(chalk.green('App started!'))
            }

            app.on('error', e => {
                console.log(chalk.red('Failed to start app: ' + e.message))
                pid = null
                app = null
                appRunning = false
            })

            app.stdout.pipe(process.stdout)
            app.stderr.pipe(process.stderr)

            app.on('exit', (code, signal) => {
                if (code !== null) {
                    console.log(
                        code > 0
                            ? chalk.red('App exited with code ' + code + '.')
                            : chalk.green('App exited with code ' + code + '.')
                    )
                }
                if (signal !== null) {
                    console.log(
                        signal !== 'SIGTERM'
                            ? chalk.red(
                                  'App killed with signal ' + signal + '.'
                              )
                            : chalk.green('App killed with signal SIGTERM.')
                    )
                }
                app = null
                appRunning = false
                pid = null
            })
        }
    })

    return compiler
}

module.exports = {
    createCompiler,
}
