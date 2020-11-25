import chalk from 'chalk'
import { ChildProcess, exec, spawn } from 'child_process'
import psTree, { hasPS } from 'pstree.remy'
import { isWindows } from '../util/platform'

type AppControllerState =
  | {
      appRunning: true
      proc: ChildProcess
      pid: string
    }
  | {
      appRunning: false
      proc: null
      pid: null
    }

function invariant(condition: boolean, message: string): void | never {
  if (!condition) {
    const err = new Error(message)
    err.name = 'Invariant Violation'
    throw err
  }
}

export class AppController {
  private readonly executablePath: string
  private readonly argv: string[]
  private state: AppControllerState

  public constructor(executablePath: string, argv: string[]) {
    this.state = {
      appRunning: false,
      proc: null,
      pid: null,
    }
    this.executablePath = executablePath
    this.argv = argv
  }

  public async stopApp() {
    return new Promise<void>((resolve) => {
      if (this.state.appRunning) {
        console.log('Sending SIGTERM signal to app...')

        const { pid } = this.state

        const closeHandler = (code: number, signal: string) => {
          this.setState({
            appRunning: false,
            proc: null,
            pid: null,
          })
          resolve()
        }

        if (isWindows()) {
          exec('taskkill /pid ' + pid + ' /T /F').on('close', closeHandler)
        } else {
          // pstree is used to kill the full subtree of a spawned app
          psTree(pid, (_, children) => {
            if (hasPS) {
              // we now send SIGTERM to the spawned process
              spawn('kill', ['-s', 'SIGTERM', pid].concat(children)).on(
                'close',
                closeHandler
              )
            } else {
              const pids = children.concat(pid).sort()
              pids.forEach((childPid) => {
                // 15 is for SIGTERM
                exec('kill -15 ' + childPid).on('close', closeHandler)
              })
            }
          })
        }
      } else {
        resolve()
      }
    })
  }

  public runApp() {
    invariant(
      !this.state.appRunning,
      "Can't start app when app is already running!"
    )

    // spawn the process
    const proc = spawn('node', [this.executablePath, ...this.argv])

    // attach event listeners
    proc.on('error', (e) => {
      console.log(chalk.red('Failed to start app: ' + e.message))
      this.setState({
        appRunning: false,
        proc: null,
        pid: null,
      })
    })
    proc.on('exit', (code, signal) => {
      if (code !== null) {
        console.log(
          code > 0
            ? chalk.red('App exited with code ' + code + '.')
            : chalk.green('App exited with code ' + code + '.')
        )
      }
      if (signal !== null) {
        console.log(
          signal !== 'SIGTERM'
            ? chalk.red('App killed with signal ' + signal + '.')
            : chalk.green('App killed with signal SIGTERM.')
        )
      }
      this.setState({
        appRunning: false,
        proc: null,
        pid: null,
      })
    })

    // pipe spawned output stream to current process's output streams
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)

    console.log(chalk.green('App started!'))

    this.setState({
      proc,
      pid: proc.pid.toString(),
      appRunning: true,
    })
  }

  private setState(state: AppControllerState) {
    this.state = state
  }
}
