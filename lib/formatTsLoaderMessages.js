const fs = require('fs')
const textTable = require('text-table')
const stripAnsi = require('strip-ansi')

/**
 * Creates an array with the number range
 * Example: range(1, 4) => [1, 2, 3, 4]
 * @param {number} min
 * @param {number} max
 */
const range = (min, max) => {
    const len = max - min + 1
    return Array.from({ length: len }).map((_, i) => i + min)
}

/**
 * Creates an array where mid is the middle number in an array,
 * and padded by padLength number of elements on the left and right
 * Example: padNumber(4, 3) => [1, 2, 3, 4, 5, 6, 7]
 * @param {number} mid
 * @param {number} padLength
 */
const padNumber = (mid, padLength) => range(mid - padLength, mid + padLength)

module.exports = (error, colors) => {
    const friendlyMessage =
        error.content + ' ' + colors.cyan('(TS' + error.code + ')')

    // if there are no source files to parse, return only the message
    if (!error.file) {
        return friendlyMessage
    }

    // try to load the file
    let fileContents = ''
    try {
        fileContents = fs.readFileSync(error.file, 'utf-8')
    } catch (e) {
        return colors.red(
            '[TNS] Unable to read file ' + error.file + '\nReason: ' + e.message
        )
    }

    const SEPERATOR = colors.dim('│')

    const lines = fileContents.split('\n')
    const parsedLines = padNumber(error.line, 2)

    /**
     * Parse the line contents into a 2D array where one line is an array of
     * [line number, seperator, content]
     */
    const tableBuffer = []
    parsedLines.forEach(line => {
        const isSourceLine = line === error.line
        const lineContent = lines[line - 1]

        // if there is no data inside the line, return
        if (lineContent === undefined) {
            return
        }

        // if it's the source line, we want to display the message
        // with a red arrow and a carat to indicate the position
        // otherwise, we will just display it with the source dimmed
        if (isSourceLine) {
            const lineNumber = colors.red('> ' + line)
            const carat =
                ' '.repeat(error.character - 1) + colors.redBright('^')
            tableBuffer.push(
                [lineNumber, SEPERATOR, lineContent],
                ['', SEPERATOR, carat]
            )
        } else {
            const lineNumber = colors.dim(line)
            tableBuffer.push([lineNumber, SEPERATOR, colors.dim(lineContent)])
        }
    })

    return [
        friendlyMessage,
        textTable(tableBuffer, {
            align: ['r', 'c', 'l'],
            stringLength: l => stripAnsi(l).length,
        }),
    ].join('\n\n')
}
