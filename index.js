/**
 * 
 * Package: 
 * Author: Ganesh B
 * Description: 
 * Install: npm i  --save
 * Github: https://github.com/ganeshkbhat/exec-commands
 * npmjs Link: https://www.npmjs.com/package/exec-commands
 * File: index.js
 * File Description: 
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';

const { execFile, exec, execFileSync, fork, spawn, spawnSync } = require('child_process');
const util = require("util");

/**
 *
 *
 * @param {*} fileName
 * @param {*} args
 * @param {*} options
 * @return {*} 
 */
async function executeFile(fileName, args, options) {
  const exeFile = util.promisify(execFile);
  const { error, stdout, stderr } = await exeFile(fileName, args, options || { cwd: process.cwd() });
  // const { error, stdout, stderr } = await execFile('node', ['--version']);
  return { error, stdout, stderr };
}

/**
 *
 *
 * @param {*} fileName
 * @param {*} args
 * @param {*} options
 * @return {*} 
 */
function executeFileSync(fileName, args, options) {
  return execFileSync(fileName, args, options || { cwd: process.cwd() });
}

/**
 *
 *
 * @param {*} fileName
 * @param {*} args
 * @param {*} options
 * @return {*} 
 */
async function execute(fileName, args, options) {
  const exec = util.promisify(exec);
  const { error, stdout, stderr } = await exec(fileName, args, options || { cwd: process.cwd() });
  return { error, stdout, stderr };
}

/**
 *
 *
 * @param {*} fileName
 * @param {*} args
 * @param {*} options
 * @return {*} 
 */
function executeCommand(fileName, args, options) {
  let promise = new Promise((resolve, reject) => {
    let ps = spawn(fileName, args, options || { cwd: process.cwd() }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });

    ps.stdout.on('data', (data) => {
      console.error(`ps stdout: ${data}`);
    });

    ps.stderr.on('data', (data) => {
      console.error(`ps stderr: ${data}`);
    });

    ps.on('close', (code) => {
      if (code !== 0) {
        console.log(`ps process exited with code ${code}`);
      }
      // ...
    });

    ps.on('error', (err) => {
      console.error('Failed to start subprocess.');
    });
  });
  return promise;
}

/**
 *
 *
 * @param {*} fileName
 * @param {*} args
 * @param {*} options
 * @return {*} 
 */
function executeCommandSync(fileName, args, options) {
  return spawnSync(fileName, args, options || { cwd: process.cwd() });
}

/**
 *
 *
 * @param {*} fileName
 * @param {*} args
 * @param {*} options
 */
function executeFork(fileName, args, options) {
  let child = fork(fileName, args, options || { cwd: process.cwd() });
  child.on('error', (err) => {
    // This will be called with err being an AbortError if the controller aborts
  });
}

/**
 *
 *
 * @param {*} fileName
 * @param {*} args
 * @param {*} options
 */
function executeFork(fileName, args, options) {
  let child = exec(fileName, args, options || { cwd: process.cwd() }, () => {

  });
  child.on('error', (err) => {
    // This will be called with err being an AbortError if the controller aborts
  });
}

let commands = [
  "access", "accton", "aclocal", "acpi", "acpi_available",
  "acpid", "addr2line", "agetty", "alias", "amixer", "aplay",
  "aplaymidi", "apropos", "apt", "apt-get", "aptitude", "ar",
  "arch", "arp", "aspell", "atd", "atrm", "atq", "autoconf",
  "autoheader", "automake", "autoreconf", "autoupdate", "awk",
  "banner", "basename", "batch", "bc", "bg", "biff", "bind",
  "bison", "break", "builtin", "bzcmp", "bzdiff", "bzgrep",
  "bzip2", "bzless", "cal", "case", "cat", "cc", "ccrypt",
  "cd", "cfdisk", "chage", "chattr", "chfn", "chgrp", "chkconfig",
  "chmod", "chown", "chpasswd", "chroot", "chrt", "chsh", "chvt",
  "cksum", "clear", "cmp", "col", "colcrt", "colrm", "column",
  "comm", "compress", "continue", "cp", "cpio", "cpp", "cron",
  "crontab", "csplit", "ctags", "cupsd", "curl", "cut", "cvs",
  "date", "dc", "dd", "declare", "depmod", "df", "diff", "diff3",
  "dir", "dirname", "dirs", "disable", "dmesg", "dmesg", "dmidecode",
  "domainname", "dos2unix", "dosfsck", "dstat", "du", "dump",
  "dumpe2fs", "dumpkeys", "echo", "ed", "egrep", "eject", "emacs",
  "enable", "env", "eval", "ex", "exec", "exit", "expand", "expect",
  "export", "expr", "factor", "fc", "fc-cache", "fc-list", "fdisk",
  "fg", "fgrep", "file", "find", "finger", "fmt", "fold", "for",
  "free", "Fun", "function", "g++", "gawk", "gcc", "gdb", "getent",
  "gpasswd", "grep", "groupadd", "groupdel", "groupmod", "groups",
  "grpconv", "gs", "tar", "xz", "gz", "gunzip", "gzexe", "gzip",
  "halt", "hash", "hdparm", "help", "hexdump", "history",
  "host", "hostid", "hostname", "hostnamectl", "htop",
  "hwclock", "iconv", "id", "if", "iftop", "ifup",
  "import", "info", "insmod", "install", "iostat", "iotop", "ip",
  "ipcrm", "ipcs", "iptables", "iptables-save", "iwconfig",
  "join", "journalctl", "kill", "last", "less", "let", "ln", "locate",
  "look", "lsblk", "lshw", "lsmod", "lsof", "lsusb", "mailq", "man",
  "md5sum", "mkdir", "modinfo", "more", "mount", "mpstat", "mv", "nc",
  "netstat", "nmcli", "nslookup", "od", "passwd", "paste", "pidof",
  "ping", "pinky", "pmap", "poweroff", "printf", "ps", "pwd", "ranlib",
  "rcp", "read", "readelf", "readlink", "reboot", "rename",
  "reset", "restore", "return", "rev", "rm", "rmdir", "rmmod",
  "route", "rsync", "sar", "scp", "screen", "script", "scriptreplay",
  "sdiff", "sed", "select", "seq", "setsid", "shift", "showkey",
  "shred", "shutdown", "sleep", "source", "sort", "split", "ssh",
  "strace", "stty", "su", "sudo", "sum", "sync", "systemctl", "tac",
  "tail", "tee", "time", "top", "touch", "tr", "tracepath",
  "traceroute", "tree", "tty", "type", "uname", "unexpand", "uniq",
  "unix2dos", "until", "uptime", "useradd", "usermod", "username",
  "users", "userdel", "vi", "vmstat", "vnstat", "w", "wall", "watch",
  "wc", "wget", "whatis", "which", "while", "who", "whoami", "write",
  "xargs", "xdg-open", "yes", "zdiff", "zdump", "zgrep", "zip", "ls",
  "find", "kill", "ifconfig", "curl", "diff",
  "head", "tail", "set", "apropos", "cat", "whereis", "hd", "at",
  "apt-get", "yumrm", "yum", "cc", "make", "nohup",
  "jobs", "wait", "atop", "pgrep", "/etc/inittab", "init"
]

let pt = process.cwd();

// let fileName = "ls", args = ["-a"], options = {};
// let ls = new Function('fileName', 'args', 'options', 'spawnSync', `return spawnSync(fileName, args, options || { cwd: "' + ${pt} + '" });`)
// let sl = ((fileName, args, options) => {
//   ls(fileName, args, options, spawnSync)
// })
// sl(fileName, args, options)
// console.log(ls(fileName, args, options, spawnSync).stdout.toString());

function generateCommandFunctions(commands) {
  let l = commands.length;
  let cmds = {};
  for (let i = 0; i < l; i++) {
    let fileName = commands[i], options = {};
    let cmd = new Function('fileName', 'args', 'options', 'spawnSync', `return spawnSync(fileName, args, options || { cwd: "' + ${pt} + '" });`);
    cmds[fileName] = ((args, options) => cmd(fileName, args || [], options || { cwd: process.cwd() }, spawnSync))
  }
  return cmds;
}


let commandFunctions = generateCommandFunctions(commands);
module.exports = commandFunctions;
module.exports.default = commandFunctions;
