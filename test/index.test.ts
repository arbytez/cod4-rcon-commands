import { createRconCommands } from '../src';

describe('createRconCommands', () => {
  it('should do not receive any player info', async () => {
    const cod4ServerIp = '';
    const cod4ServerPort = 28960;
    const cod4ServerRcon = '';

    const rconCmds = createRconCommands(
      cod4ServerIp,
      cod4ServerPort,
      cod4ServerRcon
    );

    const status = await rconCmds.status();

    expect(status.online).toBe(false);
    expect(status.onlinePlayers).toHaveLength(0);
  });
});
