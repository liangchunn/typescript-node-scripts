const fs = require('fs')
const os = require('os')
const chalk = require('chalk')
const path = require('path')
const { codeFrameColumns } = require('@babel/code-frame')

module.exports = codeFrameOptions => (error, colors) => {
    const file = path.join(error.context, error.file)
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
                highlightCode: chalk.supportsColor,
            })
        )
    }

    return (
        colors.dim(`${error.line}:${error.character} `) +
        error.content +
        colors.cyan(` (TS${error.code})`) +
        os.EOL +
        (frame ? os.EOL + frame : '')
    )
}
