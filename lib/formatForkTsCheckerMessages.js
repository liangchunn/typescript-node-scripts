const os = require('os')
const codeFrame = require('babel-code-frame')
const chalk = require('chalk')
const fs = require('fs')

module.exports = codeFrameOptions => (message, useColors) => {
    const colors = new chalk.constructor({ enabled: useColors })
    const file = message.getFile()
    const source = file && fs.existsSync(file) && fs.readFileSync(file, 'utf-8')

    let frame = ''

    if (source) {
        frame = codeFrame(
            source,
            message.line,
            message.character,
            Object.assign({}, codeFrameOptions || {}, {
                highlightCode: useColors,
            })
        )
            .split('\n')
            .map(str => '  ' + str.replace('|', '│'))
            .join(os.EOL)
    }
    return (
        message.getContent() +
        colors.cyan(` (TS${message.getCode()})`) +
        os.EOL +
        (frame ? os.EOL + frame : '')
    )
}
