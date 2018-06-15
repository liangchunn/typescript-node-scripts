const chalk = require('chalk')
const formatWebpackMessages = require('./formatWebpackMessages')
const clearConsole = require('./clearConsole')
const { spawn } = require('child_process')
const path = require('path')

const isInteractive = process.stdout.isTTY

const createCompiler = (webpack, config, options = {}) => {
    let compiler

    let app
    let appRunning = false
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
            app.kill()
            appRunning = false
        }
    })

    compiler.hooks.done.tap('compileDone', stats => {
        if (isInteractive) {
            clearConsole()
        }

        const messages = formatWebpackMessages(stats.toJson({}, true))
        const isSuccessful =
            !messages.errors.length && !messages.warnings.length

        if (isSuccessful) {
            console.log(chalk.green('Compiled successfully!\n'))
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

        // Start the app if everything there are no errors
        if (!appRunning && !messages.errors.length && !options.noAutoStart) {
            app = spawn('node', [
                path.join(config.output.path, config.output.filename),
            ])

            if (app.pid > 0) {
                appRunning = true
                console.log(chalk.green('App started!'))
            }

            app.on('error', e => {
                console.log(chalk.red('Failed to start app: ' + e.message))
                app = null
                appRunning = false
            })

            app.stdout.pipe(process.stdout)
            app.stderr.pipe(process.stderr)

            app.on('exit', code => {
                console.log(
                    code > 0
                        ? chalk.red('App exited with code ' + code + '.')
                        : chalk.green('App exited with code ' + code + '.')
                )
                app = null
                appRunning = false
            })
        }
    })

    return compiler
}

module.exports = {
    createCompiler,
}
