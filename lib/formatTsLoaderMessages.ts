import * as fs from 'fs'
import * as os from 'os'
import { Chalk } from 'chalk'
import { codeFrameColumns } from '@babel/code-frame'

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

export function formatTsLoaderMessages(
  error: NormalizedMessageJson,
  colors: Chalk
): string {
  const { file } = error
  const source = file && fs.existsSync(file) && fs.readFileSync(file, 'utf-8')

  if (source) {
    const frame = codeFrameColumns(source, {
      start: {
        line: error.line,
        column: error.character,
      },
    })
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
