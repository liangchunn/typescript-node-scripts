import { execSync } from 'child_process'

export function yarnAvailable() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}
