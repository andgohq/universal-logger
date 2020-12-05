import pino, { Level } from 'pino';
export type { Logger, Level } from 'pino';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { datadogLogs, StatusType, Datacenter } from '@datadog/browser-logs';
import { Context } from '@datadog/browser-core';

let DATADOG_INITIALIZED = false;
let PRETTY_PRINT = false;

const PINO_TO_CONSOLE: Record<Level, StatusType> = {
  fatal: StatusType.error,
  error: StatusType.error,
  warn: StatusType.warn,
  info: StatusType.info,
  debug: StatusType.debug,
  trace: StatusType.info,
};

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
  prettyPrint: PRETTY_PRINT,
  level: 'debug', // this is overwritten by setLogLevel
  browser: {
    serialize: true,
    write: (o) => {
      const { module, type, stack, level, time, msg, ...rest } = o as {
        module: string;
        type?: 'Error'; // exist when logger.error is used
        stack?: string;
        level: number; // this is not a label (maybe this is a spec. bug)
        time: number;
        msg?: string;
      };

      const errMsg = type === 'Error' ? `${stack?.split('\n')[0].substr(7)} ` ?? 'Error ' : '';

      const timeLabel = format(new Date(time), 'HH:mm:ss', { locale: ja });
      const levelLabel = PINO_TO_CONSOLE[baseLogger.levels.labels[`${level}`] as Level];

      const s = `${timeLabel} [${module}] ${errMsg}${msg ?? ''}`;

      if (Object.keys(rest).length) {
        console[levelLabel](s, rest);
      } else {
        console[levelLabel](s);
      }

      datadogMessage(msg ?? '', { ...rest }, levelLabel);
    },
  },
});

export const setLogLevel = (level: Level, pretty = false) => {
  baseLogger.level = level;
  PRETTY_PRINT = pretty;
};

export type AGLoggerFunc = (
  msgOrMergingObject?: string | Record<string, any>,
  msg?: string,
  ...interpolationValues: any[]
) => void;

export interface AGLogger {
  fatal: AGLoggerFunc;
  error: AGLoggerFunc;
  warn: AGLoggerFunc;
  info: AGLoggerFunc;
  debug: AGLoggerFunc;
}

export const logFactory = (name: string): AGLogger => {
  const _logger = baseLogger.child({ module: name });

  return _logger;
};
