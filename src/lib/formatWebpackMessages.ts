import chalk from 'chalk'

const friendlyModuleParseErrorLabel = 'Module parse failed:'
const friendlyRedundantModuleWarningLabel = 'Module Warning'
const filterWithLabel = (message: string, label: string) =>
  message.indexOf(label) === -1

function formatMessage(message: string): string {
  let lines = message.split('\n')

  // Remove full path if relative path exists.
  // This weird behavior happens when
  // ts-loader and webpack tries to print both paths.
  if (~lines[0].indexOf(lines[1].slice(2))) {
    lines.splice(0, 1)
  }
  if (~lines[1].indexOf(lines[0])) {
    lines.splice(0, 1)
  }

  // Remove excessive warning label
  lines = lines.filter(message =>
    filterWithLabel(message, friendlyRedundantModuleWarningLabel)
  )

  if (lines.length > 2 && lines[1] === '') {
    // Remove extra newline.
    lines.splice(1, 1)
  }

  // webpack adds a list of entry points to warning messages
  // @ src/...
  // we don't need this since we already have the path printed out
  lines = lines.filter(line => line.indexOf(' @ ') !== 0)

  // line #0 is filename
  // line #1 is the main error message
  if (!lines[0] || !lines[1]) {
    return lines.join('\n')
  }

  lines[0] = chalk.underline.bold(lines[0])

  // Reassemble the message.
  message = lines.join('\n')

  return message.trim()
}

export function formatWebpackMessages(
  json: any /** Webpack's stat output is typed as any*/
): {
  errors: string[]
  warnings: string[]
} {
  const errors = json.errors
    .map((message: string) => formatMessage(message))
    .filter((message: string) =>
      filterWithLabel(message, friendlyModuleParseErrorLabel)
    )
  const warnings = json.warnings.map((message: string) =>
    formatMessage(message)
  )

  return {
    errors,
    warnings,
  }
}
