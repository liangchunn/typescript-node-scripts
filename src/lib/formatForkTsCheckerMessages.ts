import { codeFrameColumns } from '@babel/code-frame'
import chalk from 'chalk'
import * as fs from 'fs'
import * as os from 'os'
import { IS_CI, IS_INTERACTIVE } from '../util/env'

/**
 * Copied from fTCWP's NormalizedMessage.d.ts
 */
interface NormalizedMessageJson {
  type: 'diagnostic' | 'lint'
  code: string | number
  severity: 'error' | 'warning'
  content: string
  file?: string
  line?: number
  character?: number
}

export function formatForkTsCheckerMessages(
  error: NormalizedMessageJson,
  useColors: boolean
): string {
  const colors = new chalk.constructor({ enabled: useColors })
  const { file } = error
  const source = file && fs.existsSync(file) && fs.readFileSync(file, 'utf-8')
  if (source) {
    const frame = codeFrameColumns(
      source,
      {
        start: {
          line: error.line,
          column: error.character,
        },
      },
      {
        highlightCode: IS_INTERACTIVE && !IS_CI,
      }
    )
    return (
      colors.dim(`${error.line}:${error.character} `) +
      error.content +
      colors.cyan(` (TS${error.code})`) +
      os.EOL +
      (frame ? os.EOL + frame : '')
    )
  } else {
    return ''
  }
}
