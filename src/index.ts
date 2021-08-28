import pino from 'pino';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import * as stackTraceParser from 'stacktrace-parser';

const options = {
  logLevel: process.env.LOG_LEVEL ?? 'debug',
  sharedContext: {},
  masks: [] as string[],
  maskFunc: (s: string) => `${s.substr(0, 8)}***`,
};

export type Level = 'debug' | 'fatal' | 'error' | 'warn' | 'info' | 'trace';
export type StatusType = 'error' | 'warn' | 'info' | 'debug';

const PINO_TO_CONSOLE: Record<Level, StatusType> = {
  debug: 'debug',
  fatal: 'error',
  error: 'error',
  warn: 'warn',
  info: 'info',
  trace: 'info',
};

export type ExternalLoggerType = (opts: {
  message: string;
  context?: Record<string, any>;
  status?: StatusType;
}) => void;

export const NO_OPS_LOGGER: ExternalLoggerType = () => {};

let _PRESENT_EXTERNAL_LOGGER = NO_OPS_LOGGER;

export function setExternalLogger(logger: ExternalLoggerType) {
  _PRESENT_EXTERNAL_LOGGER = logger;
}

export const setLogLevel = (logLevel: Level) => {
  Object.assign(options, { logLevel });
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
    level: options.logLevel,
    formatters: {
      bindings: () => ({}), // omit pid and hostname
      log: (o) =>
        Object.fromEntries(
          Object.entries(o).map(([k, v]) => [
            k,
            options.masks.findIndex((ele) => ele === k) >= 0 && (typeof v === 'string' || typeof v === 'number')
              ? options.maskFunc(`${v}`)
              : k === 'stack' && typeof v === 'string'
              ? stackTraceParser.parse(v)
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
              : k === 'stack' && typeof v === 'string'
              ? stackTraceParser.parse(v)
              : v,
          ])
        );

        if (Object.keys(masked).length) {
          console[levelLabel](s, masked);
        } else {
          console[levelLabel](s);
        }

        _PRESENT_EXTERNAL_LOGGER({ message: msg ?? '', context: { logger: name, ...masked }, status: levelLabel });
      },
    },
  });
