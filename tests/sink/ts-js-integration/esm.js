import fs from 'fs'

export const readFileSync = fs.readFileSync
export const TEST = 2
export default () => {
  // tslint:disable-next-line
  console.log('App is running')
}
