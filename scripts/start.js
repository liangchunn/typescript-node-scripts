process.env.NODE_ENV = 'development'

process.on('unhandledRejection', err => {
    throw err
})

const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../lib/webpack.config.dev')
const { createCompiler } = require('../lib/webpackCompiler')
const clearConsole = require('../lib/clearConsole')
const typescript = require('typescript')

const isInteractive = process.stdout.isTTY

const { argv } = process
const noCollapse = argv.indexOf('--no-collapse') > -1
const noAutoStart = argv.indexOf('--no-auto-start') > -1

const options = {
    noCollapse,
    noAutoStart,
}

const compiler = createCompiler(webpack, config, options)

if (isInteractive) {
    clearConsole()
}

console.log(chalk.cyan('Starting the development server...'))
console.log(chalk.green('Using TypeScript v' + typescript.version))

// start the webpack watchers
compiler.watch({}, err => {
    if (err) {
        throw err
    }
})
