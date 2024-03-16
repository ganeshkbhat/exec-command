

const { execFile, exec, execFileSync, fork, spawn, spawnSync } = require('child_process');

let fileName = "ls", args = ["-a"], options = {};
let ls = new Function('fileName', 'args', 'options', 'spawnSync', `return spawnSync(fileName, args, options || { cwd: "' + ${pt} + '" });`)
let sl = ((fileName, args, options) => {
  ls(fileName, args, options, spawnSync)
})
sl(fileName, args, options)
console.log(ls(fileName, args, options, spawnSync).stdout.toString());

