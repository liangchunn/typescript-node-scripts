import crypto from 'crypto'
import * as fs from 'fs'

export function getFileHash(path: string) {
  return new Promise(resolve => {
    const hash = crypto.createHash('sha256')
    const input = fs.createReadStream(path, { encoding: 'utf-8' })
    input.on('readable', () => {
      const data = input.read()
      if (data) {
        hash.update(data)
      } else {
        return resolve(hash.digest('hex'))
      }
    })
  })
}
