import { Level, setLogLevel, logFactory } from './index';

export const output = (level: Level, pretty?: boolean) => {
  setLogLevel(level, pretty);

  const logger = logFactory('Main');
  const childLogger = logFactory('Child');

  logger.fatal('fatal message');

  logger.error('error message');
  logger.error({ param1: 'value1', param2: 123 }, 'error message');
  logger.error(new Error('ERROR_TEST'));
  logger.error(new Error('ERROR_TEST'), 'error message');
  logger.error(new Error('ERROR_TEST'), 'error message: %s', 'REPLACE');

  logger.warn('warn test');

  logger.info('info test');
  logger.info({ param1: 'value1', param2: 123 }, 'info test');

  logger.debug({ param1: 'value1', param2: 123 }, 'debug test');

  childLogger.info('Child');
};
