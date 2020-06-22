export { EventEmitter } from 'https://deno.land/std@0.58.0/node/events.ts'
export { Buffer } from 'https://deno.land/std@0.58.0/node/buffer.ts'
export * as path from 'https://deno.land/std@0.58.0/path/mod.ts'
import * as _process from 'https://deno.land/std@0.58.0/node/process.ts'

export const spawn = (command: string, args: string[], opts?: any) => {
  return Deno.run({
    cmd: args && args.length ? [command, ...args] : [command]
  })
}

const existsSync = (filePath: string) => {
  try {
    Deno.lstatSync(filePath);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}

export const fs = {
  existsSync,
  realpathSync: Deno.realPathSync
}

export const process = {
  ..._process,
  get argv() {
    return [Deno.execPath(), ...Deno.args];
  },
  mainModule: {
    filename: Deno.mainModule
  },
  execPath: Deno.execPath(),
  execArgv: Deno.args,
  exitCode: 0,
  platform: Deno.build.os === 'windows' ? 'win32' : Deno.build.os,
  stdout: {
    columns: 80,
    write(str: string) {
        Deno.stdout.writeSync(new TextEncoder().encode(str))
    }
  },
  exit: Deno.exit
}
