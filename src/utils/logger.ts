import logger from 'pino';

const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      levelFirst: true,
      translateTime: true,
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
});

export default log;
