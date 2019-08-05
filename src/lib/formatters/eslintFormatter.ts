import chalk from 'chalk'
import stripAnsi from 'strip-ansi'
import textTable from 'text-table'

type EslintDiagnosticMessage = {
  ruleId: string
  severity: number
  message: string
  line: number
  column: number
  nodeType: string
  fix: {
    range: number[]
    text: string
  }
}

type EslintDiagnosticResults = {
  filePath: string
  messages: EslintDiagnosticMessage[]
  errorCount: number
  warningCount: number
  fixableErrorCount: number
  fixableWarningCount: number
  source: string
}

export default function eslintFormatter(results: EslintDiagnosticResults[]) {
  const formatRow = (row: EslintDiagnosticMessage) => {
    const { line, column, message, ruleId } = row
    return ['', line, column, chalk.dim(message), chalk.cyan(ruleId)]
  }
  return textTable(results[0].messages.map(formatRow), {
    align: ['', 'r', 'l'] as any,
    stringLength: str => stripAnsi(str).length,
  })
    .split('\n')
    .map(ln =>
      ln.replace(/(\d+)\s+(\d+)/, (_, line, char) => `${line}:${char}`)
    )
    .join('\n')
}
