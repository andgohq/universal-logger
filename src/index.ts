import pino, { Level } from 'pino';
export type { Logger, Level } from 'pino';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { datadogLogs } from '@datadog/browser-logs';
import { Context } from '@datadog/browser-core';

const options = {
  datadogInitialized: false,
  logLevel: process.env.LOG_LEVEL ?? 'debug',
  prettyPrint: false,
  sharedContext: {},
  masks: [] as string[],
  maskFunc: (s: string) => `${s.substr(0, 8)}***`,
};

export type StatusType = Exclude<Parameters<typeof datadogLogs['logger']['log']>[2], undefined>;

const PINO_TO_CONSOLE: Record<Level, StatusType> = {
  fatal: 'error',
  error: 'error',
  warn: 'warn',
  info: 'info',
  debug: 'debug',
  trace: 'info',
};

export function initDatadog(userConfiguration: Parameters<typeof datadogLogs.init>[0]) {
  datadogLogs.init(userConfiguration);

  options.datadogInitialized = true;
}

export function datadogMessage(message: string, context?: Context, status?: StatusType) {
  if (!options.datadogInitialized) {
    return;
  }

  datadogLogs.logger.log(
    message,
    {
      context: { ...options.sharedContext, ...context },
    },
    status
  );
}

export const setLogLevel = (logLevel: Level, prettyPrint = false) => {
  Object.assign(options, { logLevel, prettyPrint });
};

export const setContext = (context: Record<string, any>) => {
  options.sharedContext = context;
};

export const setMasks = (masks: string[]) => {
  options.masks = masks;
};

export const setMaskFunc = (f: (s: string) => string) => {
  options.maskFunc = f;
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

export const logFactory = (name: string): AGLogger =>
  pino({
    name,
    prettyPrint: options.prettyPrint
      ? {
          translateTime: 'SYS:HH:mm:ss',
          ignore: 'pid,hostname',
        }
      : false,
    level: options.logLevel,
    formatters: {
      log: (o) =>
        Object.fromEntries(
          Object.entries(o).map(([k, v]) => [
            k,
            options.masks.findIndex((ele) => ele === k) >= 0 && (typeof v === 'string' || typeof v === 'number')
              ? options.maskFunc(`${v}`)
              : v,
          ])
        ),
    },
    browser: {
      serialize: true,
      write: (o) => {
        const { type, stack, level, time, msg, ...rest } = o as {
          type?: 'Error'; // exist when logger.error is used
          stack?: string; // exist when logger.error is used
          level: number; // this is not a label (maybe this is a spec. bug)
          time: number;
          msg?: string;
        };

        const timeLabel = format(new Date(time), 'HH:mm:ss', { locale: ja });
        const levelLabel = PINO_TO_CONSOLE[pino.levels.labels[`${level}`] as Level];

        const s = `${timeLabel} [${name}] ${msg ?? ''}`;

        const masked = Object.fromEntries(
          Object.entries(rest).map(([k, v]) => [
            k,
            options.masks.findIndex((ele) => ele === k) >= 0 && (typeof v === 'string' || typeof v === 'number')
              ? options.maskFunc(`${v}`)
              : v,
          ])
        );

        if (Object.keys(masked).length) {
          console[levelLabel](s, masked);
        } else {
          console[levelLabel](s);
        }

        datadogMessage(msg ?? '', { logger: name, ...masked }, levelLabel);
      },
    },
  });
