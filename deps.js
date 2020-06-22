import { EventEmitter } from 'https://deno.land/std/node/events.ts'
import * as path from 'https://deno.land/std@0.54.0/path/mod.ts'
import * as _process from 'https://deno.land/std/node/process.ts'

export const spawn = (command, args) => {
  return Deno.run({
    cmd: args && args.length ? [command, ...args] : [command]
  })
}

const existsSync = (filePath) => {
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
  execPath: Deno.execPath(),
  execArgv: Deno.args,
  stdout: {
    columns: 80,
    write(str) {
        Deno.stdout.writeSync(new TextEncoder().encode(str))
    }
  },
  exit: Deno.exit
}

export {
  path,
  EventEmitter
}