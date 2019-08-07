import * as fs from 'fs-extra'

export function fileExists(path: string): Promise<boolean> {
  return new Promise(resolve => {
    fs.access(path, fs.constants.F_OK, err => {
      if (err) {
        return resolve(false)
      } else {
        return resolve(true)
      }
    })
  })
}
