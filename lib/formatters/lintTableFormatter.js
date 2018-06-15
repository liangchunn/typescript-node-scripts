'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const Lint = require('tslint')
const chalk_1 = require('chalk')
const textTable = require('text-table')
const stripAnsi = require('strip-ansi')
class Formatter extends Lint.Formatters.AbstractFormatter {
    formatFailure(failure) {
        const {
            line,
            character,
        } = failure.getStartPosition().getLineAndCharacter()
        const message = failure.getFailure()
        const ruleName = failure.getRuleName()
        return [
            '',
            `${line}`,
            `${character}`,
            chalk_1.default.dim(message),
            chalk_1.default.cyan(ruleName),
        ]
    }
    format(failures) {
        return textTable(failures.map(this.formatFailure), {
            align: ['', 'r', 'l'],
            stringLength: str => stripAnsi(str).length,
        })
            .split('\n')
            .map(ln =>
                ln.replace(
                    /(\d+)\s+(\d+)/,
                    (_, line, char) => `${line}:${char}`
                )
            )
            .join('\n')
    }
}
exports.Formatter = Formatter
