import chalk from 'chalk'

export enum MIGRATION_OP_TYPE {
  WRITE = 'write',
  MODIFY = 'modify',
  DELETE = 'delete',
  SKIP = 'skip',
  INFO = 'info',
  INSTALL = 'install',
  DONE = 'done',
  ERROR = 'error',
}

export function migrationLogger() {
  function log(message: string, type: MIGRATION_OP_TYPE) {
    let chalkWrapper
    switch (type) {
      case MIGRATION_OP_TYPE.DONE:
      case MIGRATION_OP_TYPE.INSTALL:
      case MIGRATION_OP_TYPE.WRITE:
        chalkWrapper = chalk.green
        break
      case MIGRATION_OP_TYPE.MODIFY:
        chalkWrapper = chalk.yellow
        break
      case MIGRATION_OP_TYPE.ERROR:
      case MIGRATION_OP_TYPE.DELETE:
        chalkWrapper = chalk.red
        break
      case MIGRATION_OP_TYPE.SKIP:
        chalkWrapper = chalk.dim
        break
      case MIGRATION_OP_TYPE.INFO:
        chalkWrapper = chalk.cyan
        break
      default:
        chalkWrapper = <T>(identity: T) => identity
    }
    console.log(`${chalkWrapper(type.padStart(7))} ${message}`)
  }
  return log
}
