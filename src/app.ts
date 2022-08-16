import { Logger } from 'tslog';
import { childLogger } from './helpers';
import Server from './server';

Server.startApp();

const log: Logger = childLogger('App Log');

process.on('SIGINT', () => {
  log.error('Received SIGINT');
  process.exit(1);
});

process.on('SIGTERM', () => {
  log.error('Received SIGTERM');
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  log.error('Unhandled promise rejection: ', e);
  process.exit(1);
});

process.on('uncaughtException', (e) => {
  log.error('Unhandled error:', e);
  process.exit(1);
});
