# Cod4 Rcon Commands

A simple wrapper library to the rcon commands you can send to a cod4 server.
Response data for commands '_status_', '_rconStatus_' and '_info_' is parsed
into custom type object, so it is possible to easily manage the server status/info.

## Installation

```sh
$ yarn add @arbytez/cod4-rcon-commands
# or
$ npm install --save @arbytez/cod4-rcon-commands
```

## Usage

```ts
import { createRconCommands } from '@arbytez/cod4-rcon-commands';

const cod4ServerIp = '127.0.0.1';
const cod4ServerPort = 28960;
const cod4ServerRcon = 'myrconpass';

const rconCmds = createRconCommands(
  cod4ServerIp,
  cod4ServerPort,
  // you can omit the rcon pass but you will be only be able
  // to execute the 'status' and 'info' commands
  cod4ServerRcon
);

const status = await rconCmds.status();

// commands are sent using the udp protocol so we can not track the connection state (start/end)
// each command has its predefined timeout (in ms) already set
// but you can specify a custom timeout for each of them
// useful if you get truncated results from the rcon requests
// timeout default values are different for each command.

// maxTimeOut of 1500ms instead of the default value (for rconStatus cmd is 500ms)
const rconStatus = await rconCmds.rconStatus(1500);

// if you need to send a custom command
const customCmd = await rconCmds.execRconCmd('custom command');
```

### Examples

#### status

```ts
const status = await rconCmds.status();
console.log(status);
{
  online: true,
  ip: '127.0.0.1',
  port: '28960',
  sv_hostname: 'hostname',
  g_gametype: 'sd',
  sv_maxclients: '32',
  uptime: '42 hours',
  g_mapStartTime: date,
  sv_privateClients: '0',
  fs_game: '',
  version: '...',
  mapname: 'mp_crash',
  onlinePlayers: [
    { score: 68, ping: '51', name: 'player2' },
    { score: 33, ping: '42', name: 'player1' },
    { score: 13, ping: '135', name: 'player3' },
    { score: 5, ping: '28', name: 'player4' }
  ],
  branch: '',
  build: '...',
  g_compassShowEnemies: '0',
  gamename: 'Call of Duty 4',
  protocol: '17',
  revision: '',
  shortversion: '1.8',
  sv_disableClientConsole: '0',
  sv_floodprotect: '4',
  sv_maxPing: '0',
  sv_maxRate: '25000',
  sv_minPing: '0',
  sv_pure: '1',
  sv_voice: '0',
  type: '1'
}
```

#### rconStatus

```ts
const rconStatus = await rconCmds.rconStatus();
console.log(rconStatus);
{
  ... // same as the status cmd response
  onlinePlayers: [
    {
      num: 3,
      score: 15,
      ping: 135,
      id: '1234567890123456789',
      steamId: '12345678901234567',
      name: 'player1',
      lastmsg: 0,
      ip: 'xx.xxx.x.xxx',
      port: 28960,
      qport: 3717,
      rate: 25000
    },
    {
      num: 1,
      score: 10,
      ping: 25,
      id: '1234567890123456789',
      steamId: '12345678901234567',
      name: 'player2',
      lastmsg: 0,
      ip: 'xx.xxx.x.xxx',
      port: 36785,
      qport: 28790,
      rate: 25000
    },
    {
      num: 5,
      score: 5,
      ping: 26,
      id: '1234567890123456789',
      steamId: '0',
      name: 'player3',
      lastmsg: 0,
      ip: 'xx.xxx.x.xxx',
      port: 28960,
      qport: 12999,
      rate: 25000
    },
    ...
  ],
  ...
}
```

#### info

```ts
const info = await rconCmds.info();
console.log(info);
{
  build: '...',
  clients: '6',
  ff: '0',
  g_humanplayers: '6',
  game: '...',
  gametype: 'sd',
  hc: '1',
  hostname: 'hostname',
  hw: '1',
  ki: '1',
  mapname: 'mp_crossfire',
  mod: '1',
  od: '1',
  protocol: '6',
  pswrd: '0',
  pure: '1',
  shortversion: '1.8',
  sv_maxclients: '32',
  type: '1',
  voice: '0'
}
```

#### List of all wrapped commands

```
AdminAddAdmin
AdminChangeCommandPower
AdminChangePassword
AdminListAdmins
AdminListCommands
AdminRemoveAdmin
ChangePassword
XAssetUsage
addCommand
cmdlist
cvarlist
dumpbanlist
dumpuser
echo
exec
fast_restart
gametype
getmodules
getss
info
kick
killserver
loadPlugin
map
map_restart
map_rotate
meminfo
ministatus
net_restart
path
permban
pluginInfo
plugins
quit
rconStatus
record
reset
say
screensay
screentell
serverinfo
set
seta
setcvartotime
setfromcvar
sets
setu
status
stoprecord
systeminfo
tell
tempban
toggle
unban
undercover
unloadPlugin
vstr
which
writeconfig
writenvcfg
zonememinfo
```
