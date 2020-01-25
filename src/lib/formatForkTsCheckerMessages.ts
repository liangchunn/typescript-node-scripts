import { Formatter } from 'fork-ts-checker-webpack-plugin/lib/formatter'
import { codeFrameColumns } from '@babel/code-frame'
import chalk from 'chalk'
import * as fs from 'fs'
import * as os from 'os'
import { IS_CI, IS_INTERACTIVE } from '../util/env'

export const formatForkTsCheckerMessages: Formatter = issue => {
  const { file } = issue
  const source = file && fs.existsSync(file) && fs.readFileSync(file, 'utf-8')
  if (source) {
    const frame = codeFrameColumns(
      source,
      {
        start: {
          line: issue.line,
          column: issue.character,
        },
      },
      {
        highlightCode: IS_INTERACTIVE && !IS_CI,
      }
    )
    return (
      chalk.dim(`${issue.line}:${issue.character} `) +
      issue.code +
      chalk.cyan(` (TS${issue.code})`) +
      os.EOL +
      (frame ? os.EOL + frame : '')
    )
  } else {
    return ''
  }
}
