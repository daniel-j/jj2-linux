#!/usr/bin/env node

const child_process = require('child_process')
const path = require('path')
const fs = require('fs')
const stream = require('stream')
const readline = require('readline')
const colors = require('colors/safe')

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
if (process.stdout.isTTY) {
  rl.setPrompt('> ')
} else {
  rl.setPrompt('')
}
rl.on('line', (line) => {
  bridge.stdin.write(line + '\n', 'binary')
  rl.prompt()
})
rl.on('close', () => {
  rl.setPrompt('')
  process.stdout.write('\x1b[2K\r')
  // rl.output.write('\n')
  try {
    bridge.stdin.write('/close' + '\n', 'binary')
  } catch (err) {

  }
})
rl.prompt()

const realConsoleLog = console.log
console.log = function () {
  rl.output.write('\x1b[2K\r')
  realConsoleLog.apply(this, arguments)
  rl.prompt(true)
}
const realConsoleWarn = console.warn
console.log = function () {
  rl.output.write('\x1b[2K\r')
  realConsoleWarn.apply(this, arguments)
  rl.prompt(true)
}
const realConsoleError = console.error
console.log = function () {
  rl.output.write('\x1b[2K\r')
  realConsoleError.apply(this, arguments)
  rl.prompt(true)
}
function writeOut (data) {
  rl.output.write('\x1b[2K\r')
  process.stdout.write(data)
  rl.prompt(true)
}
function writeErr (data) {
  rl.output.write('\x1b[2K\r')
  process.stderr.write(data)
  rl.prompt(true)
}

function cmd (cmd, stdin = '') {
  return child_process.execSync(cmd, {
    input: stdin
  })
}

function writeLog (data) {
  let lines = data.toString('binary').trim().split('\n')
  lines.forEach((s) => {
    s = s.trim()
    if (s.includes('Name: |Server Query|')) return
    s = s.replace(/^(\[\d\d\:\d\d\:\d\d\] )(.*?)$/, (match, time, rest) => {
      rest = rest.replace(/^(>>>? )(.*?)$/, (match, arrow, rest) => {
        let f = colors.yellow.bold
        if (rest.startsWith('Error: ')) f = colors.red.bold
        return f(arrow + rest)
      })
      if (rest.startsWith('* ')) {
        // rest = colors.italic(rest)
      } else if (!rest.includes(':')) {
        rest = colors.green.bold(rest)
      } else if (rest.startsWith('Console: ')) {
        rest = colors.bold('Console: ') + colors.green.bold(rest.substring(9))
      }
      return colors.cyan.bold(time) + rest
    })
    s = s.replace(/^(\*\*?\*?)(.*?)$/, (match, stars, rest) => {
      let f = colors.cyan
      if (stars.length === 3) f = colors.blue
      return f(stars + rest)
    })
    writeOut(Buffer.from(s + '\n', 'utf8'))
  })
}

/*
let pwd = process.cwd()

if (!process.env.WINEPREFIX) process.env.WINEPREFIX = pwd + '/.wine'
if (!process.env.WINEARCH) process.env.WINEARCH = 'win32'
if (!process.env.WINEDEBUG) process.env.WINEDEBUG = 'fixme-all,err-all'

process.env.WINEDLLOVERRIDES = 'mscoree,mshtml=,winemenubuilder.exe=d'
*/

// process.env.WINEPREFIX = path.join(pwd, p, '.wine')

let p = process.argv[2]
let extraflags = process.argv.slice(3)

console.log('Starting dedicated JJ2 server ' + p)

let startup = fs.readFileSync(path.join(p, 'startup.txt'), 'utf8')
let initcommands = startup.trim().split('\n').filter((line) => {
  line = line.trim()
  if (!line) return false
  return line.charAt(0) !== ';'
})

let followpaths = [
  path.join(p, 'chatlog001.txt'),
  path.join(p, 'playlog001.txt'),
  path.join(p, 'iplog001.txt')
]

let tail = child_process.spawn('tail', ['-f', '-n0', '--quiet'].concat(followpaths))
tail.stdout.on('data', writeLog)

let jj2 = child_process.spawn('./start', [p, '-nosound', '-nochatlogger', '-server'].concat(extraflags))
jj2.stdout.on('data', writeOut)
jj2.stderr.on('data', writeErr)
jj2.once('exit', (code, signal) => {
  bridge.kill('SIGINT')
  tail.kill('SIGINT')
  rl.close()
  process.stdout.write('\x1b[2K\r')
  process.exit(code)
})

let bridge = child_process.spawn('wine', ['utils/jj2-bridge.exe'])
bridge.stdout.on('data', writeOut)
bridge.stderr.on('data', writeErr)

initcommands.forEach((cmd) => {
  bridge.stdin.write(cmd + '\n', 'binary')
})
