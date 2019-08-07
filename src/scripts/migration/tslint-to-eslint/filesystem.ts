import * as fs from 'fs-extra'

export function loadJson(path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(err)
      }
      try {
        return resolve(JSON.parse(data as any))
      } catch (e) {
        return reject(err)
      }
    })
  })
}

export function saveJson(path: string, data: object): Promise<true> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data, null, 2), err => {
      if (err) {
        return reject(err)
      } else {
        return resolve(true)
      }
    })
  })
}
