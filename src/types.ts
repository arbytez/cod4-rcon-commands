export interface OnlinePlayer {
  name: string;
  ping: number | string;
  score: number;
}

export interface OnlinePlayerFullInfo extends OnlinePlayer {
  id: string;
  num: number;
  steamId: string;
  ip: string;
  port: number;
  lastmsg: number;
  qport: number;
  rate: number;
}

interface Status {
  branch: string;
  build: string;
  fs_game: string;
  g_compassShowEnemies: number;
  g_gametype: string;
  g_mapStartTime: Date;
  gamename: string;
  ip: string;
  mapname: string;
  online: boolean;
  port: string;
  protocol: number;
  revision: string;
  shortversion: string;
  sv_disableClientConsole: number;
  sv_floodprotect: number;
  sv_hostname: string;
  sv_maxPing: number;
  sv_maxRate: number;
  sv_maxclients: number;
  sv_minPing: number;
  sv_privateClients: number;
  sv_pure: number;
  sv_voice: number;
  type: number;
  uptime: string;
  version: string;
}

export interface ServerStatus extends Status {
  onlinePlayers: OnlinePlayer[];
}

export interface ServerRconStatus extends Status {
  onlinePlayers: OnlinePlayerFullInfo[];
}

export interface ServerInfo {
  build: string;
  clients: number;
  ff: number;
  g_humanplayers: number;
  game: string;
  gametype: string;
  hc: number;
  hostname: string;
  hw: number;
  ki: number;
  mapname: string;
  mod: number;
  od: number;
  protocol: number;
  pswrd: string;
  pure: number;
  shortversion: string;
  sv_maxclients: number;
  type: number;
  voice: number;
}

export interface Obj {
  [key: string]: any;
}
