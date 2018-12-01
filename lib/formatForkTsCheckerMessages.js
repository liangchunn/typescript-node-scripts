const os = require('os')
const { codeFrameColumns } = require('@babel/code-frame')
const chalk = require('chalk')
const fs = require('fs')

module.exports = codeFrameOptions => (error, useColors) => {
    const colors = new chalk.constructor({ enabled: useColors })
    const file = error.getFile()
    const source = file && fs.existsSync(file) && fs.readFileSync(file, 'utf-8')

    let frame = ''

    if (source) {
        frame = codeFrameColumns(
            source,
            {
                start: {
                    line: error.line,
                    column: error.character,
                },
            },
            Object.assign({}, codeFrameOptions || {}, {
                highlightCode: useColors,
            })
        )
    }

    return (
        colors.dim(`${error.line}:${error.character} `) +
        error.getContent() +
        colors.cyan(` (TS${error.getCode()})`) +
        os.EOL +
        (frame ? os.EOL + frame : '')
    )
}
