import { Level, updateOptions, logFactory, setColorLevel } from '../src/index';

export const output = (level: Level) => {
  updateOptions({
    level,
    maskTargets: ['maskedMsg'],
  });
  setColorLevel(1);

  const logger = logFactory('Module Logger');
  const childLogger = logger.child({ method: 'Child Logger' });

  logger.fatal('simple fatal message');

  logger.error('simple error message');
  logger.error({ param1: 'value1', param2: 123, maskedMsg: '123456789' }, 'error message');
  logger.error(new Error('simple error object'));
  logger.error(new Error('error object with custom message'), 'error message');
  logger.error(new Error('error object with custom replacing message'), 'error message: %s', 'REPLACE');
  logger.error({ err: new Error('error object without custom message'), param1: 'value1' });
  logger.error({ err: new Error('error object with custom message'), msg: 'custom message', param1: 'value1' });

  logger.warn('simple warning message');

  logger.info('simple info message');
  logger.info({ param1: 'value1', param2: 123, maskedMsg: '1' }, 'custom message');

  logger.debug({ param1: 'value1', param2: 123, maskedMsg: '12' }, 'custom message');

  childLogger.info('simple info message');

  updateOptions({
    browser: {
      inline: true,
    },
  });

  logger.info({ msg: 'inline message' });
  logger.info({ msg: 'inline message with option', param1: 'value1' });
  childLogger.info({ msg: 'inline message on the child logger' });
  childLogger.info({ msg: 'inline message on the child logger with option', param1: 'value1' });
};
