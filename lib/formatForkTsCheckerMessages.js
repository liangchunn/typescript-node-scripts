const os = require('os')
const codeFrame = require('@babel/code-frame').default
const chalk = require('chalk')
const fs = require('fs')

module.exports = codeFrameOptions => (error, useColors) => {
    const colors = new chalk.constructor({ enabled: useColors })
    const file = error.getFile()
    const source = file && fs.existsSync(file) && fs.readFileSync(file, 'utf-8')

    let frame = ''

    if (source) {
        frame = codeFrame(
            source,
            error.line,
            error.character,
            Object.assign({}, codeFrameOptions || {}, {
                highlightCode: useColors,
            })
        )
            .split('\n')
            .map(str => '  ' + str.replace('|', '│'))
            .join(os.EOL)
    }

    return (
        colors.dim(`${error.line}:${error.character} `) +
        error.getContent() +
        colors.cyan(` (TS${error.getCode()})`) +
        os.EOL +
        (frame ? os.EOL + frame : '')
    )
}
