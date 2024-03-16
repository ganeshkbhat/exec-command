

const { execFile, exec, execFileSync, fork, spawn, spawnSync } = require('child_process');

let pt = process.cwd();
let fileName = "ls", args = ["-a"], options = {};
let lsf = new Function('fileName', 'args', 'options', 'spawnSync', `return spawnSync(fileName, args, options || { cwd: "' + ${pt} + '" });`)
let ls = ((fileName, args, options) => lsf(fileName, args, options, spawnSync))

// USAGE: ls command
// ls(fileName, args, options)

console.log(ls(fileName, args, options, spawnSync).stdout.toString());

