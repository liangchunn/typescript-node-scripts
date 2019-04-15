import chalk from 'chalk'
import stripAnsi from 'strip-ansi'
import textTable from 'text-table'
import * as Lint from 'tslint'

export class Formatter extends Lint.Formatters.AbstractFormatter {
  public format(failures: Lint.RuleFailure[]): string {
    return textTable(failures.map(this.formatFailure), {
      align: ['', 'r', 'l'] as any,
      stringLength: str => stripAnsi(str).length,
    })
      .split('\n')
      .map(ln =>
        ln.replace(/(\d+)\s+(\d+)/, (_, line, char) => `${line}:${char}`)
      )
      .join('\n')
  }
  private formatFailure(failure: Lint.RuleFailure): string[] {
    const { line, character } = failure.getStartPosition().getLineAndCharacter()
    const message = failure.getFailure()
    const ruleName = failure.getRuleName()
    return [
      '',
      `${line}`,
      `${character}`,
      chalk.dim(message),
      chalk.cyan(ruleName),
    ]
  }
}
