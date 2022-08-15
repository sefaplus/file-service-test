import Server from './src/server';

Server.startApp();

process.on('SIGINT', () => {
  process.exit(1);
});

process.on('SIGTERM', () => {
  process.exit(1);
});

process.on('unhandledRejection', () => {
  process.exit(1);
});

process.on('uncaughtException', () => {
  process.exit(1);
});
