import { getInfo, getStatus, executeRconCommand, rconStatus } from './rcon';

export const createRconCommands = (
  cod4ServerIp: string,
  cod4ServerPort: number,
  cod4ServerRcon: string = ''
) => ({
  execRconCmd: (rconCommand: string, maxTimeOut = 500) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      rconCommand,
      maxTimeOut
    ),
  rconStatus: (maxTimeOut = 500) =>
    rconStatus(cod4ServerIp, cod4ServerPort, cod4ServerRcon, maxTimeOut),
  info: (maxTimeOut = 200) => getInfo(cod4ServerIp, cod4ServerPort, maxTimeOut),
  status: (maxTimeOut = 500) =>
    getStatus(cod4ServerIp, cod4ServerPort, maxTimeOut),
  cmdlist: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'cmdlist',
      maxTimeOut
    ),
  cvarlist: (maxTimeOut = 1000) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'cvarlist',
      maxTimeOut
    ),
  fast_restart: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'fast_restart',
      maxTimeOut
    ),
  tell: (user: number | string, message: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `tell ${user} ${message}`,
      maxTimeOut
    ),
  say: (message: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `say ${message}`,
      maxTimeOut
    ),
  set: (variable: string, value: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `set ${variable} ${value}`,
      maxTimeOut
    ),
  exec: (filename: string, maxTimeOut = 500) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `exec ${filename}`,
      maxTimeOut
    ),
  getss: (user: number | string, filename: string = '', maxTimeOut = 200) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      filename ? `getss ${user} ${filename}` : `getss ${user}`,
      maxTimeOut
    ),
  which: (file: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `which ${file}`,
      maxTimeOut
    ),
  path: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'path',
      maxTimeOut
    ),
  map_rotate: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'map_rotate',
      maxTimeOut
    ),
  kick: (user: number | string, reason: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `kick ${user} ${reason}`,
      maxTimeOut
    ),
  dumpbanlist: (maxTimeOut = 1000) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'dumpbanlist',
      maxTimeOut
    ),
  loadPlugin: (plugin: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `loadPlugin ${plugin}`,
      maxTimeOut
    ),
  unloadPlugin: (plugin: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `unloadPlugin ${plugin}`,
      maxTimeOut
    ),
  ministatus: (maxTimeOut = 500) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'ministatus',
      maxTimeOut
    ),
  tempban: (
    user: number | string,
    time: string,
    reason: string,
    maxTimeOut = 100
  ) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `tempban ${user} ${time} ${reason}`,
      maxTimeOut
    ),
  dumpuser: (user: number | string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `dumpuser ${user}`,
      maxTimeOut
    ),
  map: (map: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `map ${map}`,
      maxTimeOut
    ),
  permban: (user: number | string, reason: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `permban ${user} ${reason}`,
      maxTimeOut
    ),
  record: (user: number | string, demoname: string = '', maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      demoname ? `record ${user} ${demoname}` : `record ${user}`,
      maxTimeOut
    ),
  screentell: (user: number | string, message: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `screentell ${user} ${message}`,
      maxTimeOut
    ),
  screensay: (message: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `screensay ${message}`,
      maxTimeOut
    ),
  map_restart: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'map_restart',
      maxTimeOut
    ),
  sets: (variable: string, value: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `sets ${variable} ${value}`,
      maxTimeOut
    ),
  unban: (playerid: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `unban ${playerid}`,
      maxTimeOut
    ),
  getmodules: (
    user: number | string,
    filename: string = '',
    maxTimeOut = 100
  ) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      filename ? `getmodules ${user} ${filename}` : `getmodules ${user}`,
      maxTimeOut
    ),
  systeminfo: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'systeminfo',
      maxTimeOut
    ),
  serverinfo: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'serverinfo',
      maxTimeOut
    ),
  undercover: (slot: number, onoff: number, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `undercover ${slot} ${onoff}`,
      maxTimeOut
    ),
  AdminChangeCommandPower: (
    commmand: string,
    newMinPower: number,
    maxTimeOut = 100
  ) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `AdminChangeCommandPower ${commmand} ${newMinPower}`,
      maxTimeOut
    ),
  addCommand: (
    commandname: string,
    stringToExecute: string,
    maxTimeOut = 100
  ) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `addCommand ${commandname} ${stringToExecute}`,
      maxTimeOut
    ),
  seta: (variable: string, value: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `seta ${variable} ${value}`,
      maxTimeOut
    ),
  XAssetUsage: (maxTimeOut = 200) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'XAssetUsage',
      maxTimeOut
    ),
  stoprecord: (user: number | string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `stoprecord ${user}`,
      maxTimeOut
    ),
  killserver: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'killserver',
      maxTimeOut
    ),
  ChangePassword: (oldpass: string, newpass: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `ChangePassword ${oldpass} ${newpass}`,
      maxTimeOut
    ),
  AdminChangePassword: (user: string, newpass: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `AdminChangePassword ${user} ${newpass}`,
      maxTimeOut
    ),
  AdminListAdmins: (maxTimeOut = 200) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'AdminListAdmins',
      maxTimeOut
    ),
  AdminAddAdmin: (user: number | string, power: number, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `AdminAddAdmin ${user} ${power}`,
      maxTimeOut
    ),
  AdminRemoveAdmin: (user: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `AdminRemoveAdmin ${user}`,
      maxTimeOut
    ),
  gametype: (gametypename: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `gametype ${gametypename}`,
      maxTimeOut
    ),
  writenvcfg: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'writenvcfg',
      maxTimeOut
    ),
  pluginInfo: (plugin: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `pluginInfo ${plugin}`,
      maxTimeOut
    ),
  plugins: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'plugins',
      maxTimeOut
    ),
  writeconfig: (filename: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `writeconfig ${filename}`,
      maxTimeOut
    ),
  quit: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'quit',
      maxTimeOut
    ),
  net_restart: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'net_restart',
      maxTimeOut
    ),
  zonememinfo: (maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'zonememinfo',
      maxTimeOut
    ),
  setu: (variable: string, value: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `setu ${variable} ${value}`,
      maxTimeOut
    ),
  reset: (variable: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `reset ${variable}`,
      maxTimeOut
    ),
  setcvartotime: (variable: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `setcvartotime ${variable}`,
      maxTimeOut
    ),
  setfromcvar: (destcvar: string, sourcecvar: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `setfromcvar ${destcvar} ${sourcecvar}`,
      maxTimeOut
    ),
  toggle: (variable: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `toggle ${variable}`,
      maxTimeOut
    ),
  echo: (message: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `echo ${message}`,
      maxTimeOut
    ),
  vstr: (variable: string, maxTimeOut = 100) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      `vstr ${variable}`,
      maxTimeOut
    ),
  meminfo: (maxTimeOut = 200) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'meminfo',
      maxTimeOut
    ),
  AdminListCommands: (maxTimeOut = 200) =>
    executeRconCommand(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      'AdminListCommands',
      maxTimeOut
    ),
});
