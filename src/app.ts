import config from 'config';
import log from './utils/logger';
import connect from './db/connect';
import createServer from './utils/server';

const port = config.get<number>('port');
const host = config.get<string>('host');

const app = createServer();

app.listen(port, host, () => {
  log.info(`Server listening at http://${host}:${port}`);

  connect();
});
