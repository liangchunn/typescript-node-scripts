import chalk from 'chalk'
import filesize from 'filesize'
import * as fs from 'fs'

interface FileSizeObjectOutput {
  value: number
  symbol: string
}

export const getBundleSize = (fileName: string) => {
  try {
    const read = fs.statSync(fileName)
    return read.size
  } catch (e) {
    return null
  }
}

export const diffFileSize = (
  sizeBeforeBuild: number,
  sizeAfterBuild: number
) => {
  if (!sizeAfterBuild) {
    return ''
  }
  const afterBuildFormatted: FileSizeObjectOutput = filesize(sizeAfterBuild, {
    base: 10,
    output: 'object',
  }) as unknown as FileSizeObjectOutput
  if (!sizeBeforeBuild) {
    return chalk.green(
      `${afterBuildFormatted.value} ${afterBuildFormatted.symbol}`
    )
  }
  const diff: FileSizeObjectOutput = filesize(
    sizeAfterBuild - sizeBeforeBuild,
    {
      base: 10,
      output: 'object',
    }
  ) as unknown as FileSizeObjectOutput

  if (diff.value === 0) {
    return `${afterBuildFormatted.value} ${afterBuildFormatted.symbol} (+0 B)`
  } else if (diff.value > 0) {
    return chalk.yellow(
      `${afterBuildFormatted.value} ${afterBuildFormatted.symbol} (+${diff.value} ${diff.symbol})`
    )
  } else {
    return chalk.green(
      `${afterBuildFormatted.value} ${afterBuildFormatted.symbol} (${diff.value} ${diff.symbol})`
    )
  }
}
