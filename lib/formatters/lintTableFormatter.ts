import * as Lint from 'tslint'
import chalk from 'chalk'
import * as textTable from 'text-table'
const stripAnsi = require('strip-ansi')

export class Formatter extends Lint.Formatters.AbstractFormatter {
    private formatFailure(failure: Lint.RuleFailure): string[] {
        const {
            line,
            character
        } = failure.getStartPosition().getLineAndCharacter()
        const message = failure.getFailure()
        const ruleName = failure.getRuleName()
        return [
            '',
            `${line}`,
            `${character}`,
            chalk.dim(message),
            chalk.cyan(ruleName)
        ]
    }

    public format(failures: Lint.RuleFailure[]): string {
        return textTable(failures.map(this.formatFailure), {
            align: ['', 'r', 'l'] as any,
            stringLength: str => stripAnsi(str).length
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
