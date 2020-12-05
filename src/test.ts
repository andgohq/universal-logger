import { Level, setLogLevel, logFactory } from './index';

export const output = (level: Level, pretty?: boolean) => {
  setLogLevel(level, pretty);

  const logger = logFactory('Main');
  const childLogger = logFactory('Child');

  logger.fatal('fatal test');

  logger.error('error test');
  logger.error({ param1: 'value1', param2: 123 }, 'error test');
  logger.error(new Error('ERROR TEST'));
  logger.error(new Error('ERROR TEST'), 'error message');
  logger.error(new Error('ERROR TEST'), 'error message: %s', 'REPLACE');

  logger.warn('warn test');

  logger.info('info test');
  logger.info({ param1: 'value1', param2: 123 }, 'info test');

  logger.debug({ param1: 'value1', param2: 123 }, 'debug test');

  childLogger.info('Child');
};
