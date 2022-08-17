import { Logger } from 'tslog';

const logger: Logger = new Logger({ name: 'ErrorLogger' });
const loggers = [logger];

export function childLogger(name: string) {
  const newLogger = logger.getChildLogger({ name });

  loggers.push(newLogger);
  return newLogger;
}
