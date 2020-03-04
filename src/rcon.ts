import dgram from 'dgram';
import iconv from 'iconv-lite';

import {
  OnlinePlayerFullInfo,
  ServerStatus,
  ServerInfo,
  Obj,
  OnlinePlayer,
  ServerRconStatus,
} from './types';

function createCommand(command: string, rcon: string = '') {
  let cmd = '';
  if (rcon) {
    cmd = `rcon ${rcon} ${command}`;
  } else {
    cmd = `${command}`;
  }
  const bufferTemp = iconv.encode(cmd, 'ascii');
  const bufferSend: any = new Uint8Array(bufferTemp.length + 5);
  bufferSend[0] = iconv.encode('255', 'ascii');
  bufferSend[1] = iconv.encode('255', 'ascii');
  bufferSend[2] = iconv.encode('255', 'ascii');
  bufferSend[3] = iconv.encode('255', 'ascii');
  bufferSend[4] = iconv.encode('02', 'ascii');
  let j = 4;
  for (let i = 0; i < bufferTemp.length; i++) {
    bufferSend[j++] = bufferTemp[i];
  }
  bufferSend[bufferSend.length - 1] = iconv.encode('00', 'ascii');
  return bufferSend;
}

const sendUdpMessage = (
  host: string,
  port: number,
  rcon: string = '',
  message: string,
  maxTimeOut = 1000
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let out = '';
      let socket = dgram.createSocket('udp4');
      socket.send(createCommand(message, rcon), port, host);
      socket.on('message', (incomingMessage, _rinfo) => {
        const res = Buffer.from(incomingMessage)
          .toString()
          .replace('����print', '')
          .replace('����infoResponse', '')
          .replace('����statusResponse', '')
          .replace('\n', '');
        out += res;
      });
      setTimeout(() => {
        socket.close();
        resolve(out);
      }, maxTimeOut);
    } catch (error) {
      reject(error.message);
    }
  });
};

export const executeRconCommand = async (
  cod4ServerIp: string,
  cod4ServerPort: number,
  cod4ServerRcon: string,
  command: string,
  maxTimeOut = 1000
): Promise<string> => {
  const res = await sendUdpMessage(
    cod4ServerIp,
    cod4ServerPort,
    cod4ServerRcon,
    command,
    maxTimeOut
  );
  return res;
};

export const executeCommand = async (
  cod4ServerIp: string,
  cod4ServerPort: number,
  command: string,
  maxTimeOut = 1000
): Promise<string> => {
  const res = await sendUdpMessage(
    cod4ServerIp,
    cod4ServerPort,
    '',
    command,
    maxTimeOut
  );
  return res;
};

const getOnlinePlayerFullInfo = async (
  cod4ServerIp: string,
  cod4ServerPort: number,
  cod4ServerRcon: string,
  maxTimeOut = 1000
) => {
  const resCommand = await executeRconCommand(
    cod4ServerIp,
    cod4ServerPort,
    cod4ServerRcon,
    'status',
    maxTimeOut
  );
  const lines = resCommand.split('\n');
  let players: OnlinePlayerFullInfo[] = [];
  lines.forEach((line: string, _i) => {
    const patternPl = /^\s*(\d+)\s+(-?\d+)\s+(\d+)\s+(\d+)\s+([a-fA-F0-9]{16,32}|\d+) (.+?)\s+(\d+) (\d+\.\d+\.\d+\.\d+):(\-?\d+)\s+(\-?\d+)\s+(\d+)$/;
    let lineParsed = line.match(patternPl);
    if (lineParsed) {
      const playerParsed: OnlinePlayerFullInfo = {
        num: parseInt(lineParsed[1]),
        score: parseInt(lineParsed[2]),
        ping: parseInt(lineParsed[3]),
        id: lineParsed[4].trim(),
        steamId: lineParsed[5].trim(),
        name: lineParsed[6].trim(),
        lastmsg: parseInt(lineParsed[7]),
        ip: lineParsed[8].trim(),
        port: parseInt(lineParsed[9]),
        qport: parseInt(lineParsed[10]),
        rate: parseInt(lineParsed[11]),
      };
      if (playerParsed.name && playerParsed.name.endsWith('^7')) {
        playerParsed.name = playerParsed.name.slice(
          0,
          playerParsed.name.length - 2
        );
      }
      players.push(playerParsed);
    }
  });
  players = players.sort((a, b) => (b.score || 0) - (a.score || 0));
  return players;
};

export const rconStatus = async (
  cod4ServerIp: string,
  cod4ServerPort: number,
  cod4ServerRcon: string,
  maxTimeOut = 500
): Promise<ServerRconStatus> => {
  const serverStatus = await Promise.all([
    getStatus(cod4ServerIp, cod4ServerPort, 200),
    getOnlinePlayerFullInfo(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon,
      maxTimeOut
    ),
  ]);
  return {
    ...serverStatus[0],
    onlinePlayers: serverStatus[1],
  };
};

export const getInfo = async (
  cod4ServerIp: string,
  cod4ServerPort: number,
  maxTimeOut = 200
) => {
  const getInfo = await executeCommand(
    cod4ServerIp,
    cod4ServerPort,
    'getinfo',
    maxTimeOut
  );
  const infos = getInfo.split('\\');
  const infoObj: Obj = {};
  for (let i = 2; i < infos.length; i = i + 2) {
    infoObj[infos[i - 1]] = infos[i];
  }
  const serverInfo: ServerInfo = {
    build: infoObj.build || '',
    clients: Number(infoObj.clients || 0),
    ff: Number(infoObj.ff || NaN),
    g_humanplayers: Number(infoObj.g_humanplayers || 0),
    game: infoObj.game || '',
    gametype: infoObj.gametype || '',
    hc: Number(infoObj.hc || NaN),
    hostname: infoObj.hostname || '',
    hw: Number(infoObj.hw || NaN),
    ki: Number(infoObj.ki || NaN),
    mapname: infoObj.mapname || '',
    mod: Number(infoObj.mod || NaN),
    od: Number(infoObj.od || NaN),
    protocol: Number(infoObj.protocol || NaN),
    pswrd: infoObj.pswrd || '',
    pure: Number(infoObj.pure || NaN),
    shortversion: infoObj.shortversion || '',
    sv_maxclients: Number(infoObj.sv_maxclients || 0),
    type: Number(infoObj.type || NaN),
    voice: Number(infoObj.voice || NaN),
  };

  return serverInfo;
};

export const getStatus = async (
  cod4ServerIp: string,
  cod4ServerPort: number,
  maxTimeOut = 500
) => {
  const getStatus = await executeCommand(
    cod4ServerIp,
    cod4ServerPort,
    'getstatus',
    maxTimeOut
  );
  const lines = getStatus.split('\n');
  const status = lines[0].split('\\');
  const statusObj: Obj = {};
  let onlinePlayers: OnlinePlayer[] = [];
  for (let i = 2; i < status.length; i = i + 2) {
    statusObj[status[i - 1]] = status[i];
  }
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const patternPlayerInfo = /^(-?\d+)\s+(-?\d+)\s+"(.*)"$/;
    const lineParsed = line.match(patternPlayerInfo);
    if (lineParsed) {
      onlinePlayers.push({
        score: Number(lineParsed[1]),
        ping: lineParsed[2],
        name: lineParsed[3].trim(),
      });
    }
  }
  onlinePlayers = onlinePlayers.sort((a, b) => (b.score || 0) - (a.score || 0));
  let mapStartDate: Date | undefined;
  const parsedDate = Date.parse(statusObj.g_mapStartTime);
  if (!isNaN(parsedDate)) {
    statusObj.g_mapStartTime = new Date(parsedDate);
  }
  if (
    Object.prototype.toString.call(statusObj.g_mapStartTime) === '[object Date]'
  ) {
    mapStartDate = statusObj.g_mapStartTime;
  }
  const serverStatus: ServerStatus = {
    online: Boolean(statusObj.sv_hostname),
    ip: String(cod4ServerIp),
    port: String(cod4ServerPort),
    sv_hostname: statusObj.sv_hostname || '',
    g_gametype: statusObj.g_gametype || '',
    sv_maxclients: Number(statusObj.sv_maxclients || 0),
    uptime: statusObj.uptime || '',
    g_mapStartTime: mapStartDate ? mapStartDate : new Date(),
    sv_privateClients: Number(statusObj.sv_privateClients || 0),
    fs_game: statusObj._Mod || statusObj.fs_game || '',
    version: statusObj.version || '',
    mapname: statusObj.mapname || '',
    onlinePlayers: onlinePlayers || [],
    branch: statusObj.branch || '',
    build: statusObj.build || '',
    g_compassShowEnemies: Number(statusObj.g_compassShowEnemies || NaN),
    gamename: statusObj.gamename || '',
    protocol: Number(statusObj.protocol || NaN),
    revision: statusObj.revision || '',
    shortversion: statusObj.shortversion || '',
    sv_disableClientConsole: Number(statusObj.sv_disableClientConsole || NaN),
    sv_floodprotect: Number(statusObj.sv_floodprotect || NaN),
    sv_maxPing: Number(statusObj.sv_maxPing || NaN),
    sv_maxRate: Number(statusObj.sv_maxRate || NaN),
    sv_minPing: Number(statusObj.sv_minPing || NaN),
    sv_pure: Number(statusObj.sv_pure || NaN),
    sv_voice: Number(statusObj.sv_voice || NaN),
    type: Number(statusObj.type || NaN),
  };
  return serverStatus;
};
