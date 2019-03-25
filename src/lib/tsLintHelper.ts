export function tslintShouldEmitErrors(path: string): boolean {
  const tslintConfig = require(path)
  if (tslintConfig.defaultSeverity === 'error') {
    return true
  } else {
    return false
  }
}
