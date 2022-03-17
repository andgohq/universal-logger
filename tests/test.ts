import { Level, setLogLevel, logFactory, setMasks, setBrowserOptions, setColorLevel } from '../src/index';

export const output = (level: Level) => {
  setLogLevel(level);

  setMasks(['maskKey']);

  setColorLevel(1);

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

  setBrowserOptions({ inline: true });

  logger.info({ msg: 'inline test 1: no options' });
  logger.info({ msg: 'inline test 2: 1 option', param1: 'value1' });
  logger.info({ msg: 'inline test 3: 2 options', param1: 'value1', param2: 'value2' });
  childLogger.info({ msg: 'inline test 4: child - no options' });
  childLogger.info({ msg: 'inline test 4: child - 1 option', param1: 'value1' });
};
