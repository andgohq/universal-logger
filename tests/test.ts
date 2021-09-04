import { Level, setLogLevel, logFactory, setMasks } from '../src/index';

export const output = (level: Level) => {
  setLogLevel(level);

  setMasks(['maskKey']);

  const logger = logFactory('Main');
  const childLogger = logger.child({ method: 'child' });

  logger.fatal('fatal message');

  logger.error('error message');
  logger.error({ param1: 'value1', param2: 123, maskKey: '123456789' }, 'error message');
  logger.error(new Error('ERROR_TEST'));
  logger.error(new Error('ERROR_TEST'), 'error message');
  logger.error(new Error('ERROR_TEST'), 'error message: %s', 'REPLACE');

  logger.warn('warn test');

  logger.info('info test');
  logger.info({ param1: 'value1', param2: 123, maskKey: '1' }, 'info test');

  logger.debug({ param1: 'value1', param2: 123, maskKey: '12' }, 'debug test');

  childLogger.info('Child');
};
