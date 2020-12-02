import pino, { Logger } from 'pino';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { datadogLogs, StatusType, Datacenter } from '@datadog/browser-logs';
import { Context } from '@datadog/browser-core';

let DATADOG_INITIALIZED = false;

export function initDatadog(opts: { clientToken: string; applicationId: string }) {
  datadogLogs.init({
    clientToken: opts.clientToken,
    datacenter: Datacenter.US,
    applicationId: opts.applicationId,
    silentMultipleInit: true,
    forwardErrorsToLogs: true,
    sampleRate: 100,
  });

  DATADOG_INITIALIZED = true;
}

export function datadogMessage(message: string, context?: Context, status?: StatusType) {
  if (!DATADOG_INITIALIZED) {
    return;
  }

  datadogLogs.logger.log(
    message,
    {
      context,
    },
    status
  );
}

const baseLogger = pino({
  level: 'debug', // this is overwritten by setLevel
  browser: {
    serialize: true,
    write: () => {}, // skip default serializer
    transmit: {
      send(level, logEvent) {
        const loggerTree = logEvent.bindings.map((b) => b.module).join('.');

        const timeLabel = format(new Date(logEvent.ts), 'HH:mm:ss', { locale: ja });

        // level !== 'error': set first arg as a message
        // level === 'error': set first arg's msg field as a message
        const isError = level === 'error' && logEvent.messages[0].type === 'Error';

        const msg = isError ? logEvent.messages[1] ?? logEvent.messages[0].msg : logEvent.messages[0];

        // level !== 'error': set second arg as a context
        // level === 'error': set third arg as a context
        const context = logEvent.messages[isError ? 2 : 1];

        // validation
        if (typeof msg !== 'string') {
          console.debug('[logger]', { level, logEvent, msg });
          throw new Error(`${msg} should be string type`);
        }
        if (typeof context !== 'object') {
          console.debug('[logger]', { level, logEvent, context });
          throw new Error(`${msg} should be object type`);
        }

        // when level === 'error', console.error shows a stack trace on dev console
        console[level](`${timeLabel} [${loggerTree}] ${msg}`, context);

        datadogMessage(msg, context, StatusType[level]);
      },
    },
  },
});

export const setLogLevel = (level: string) => {
  baseLogger.level = level;
};

export const logFactory = (name: string): Logger => {
  const _logger = baseLogger.child({ module: name });

  return _logger;
};
