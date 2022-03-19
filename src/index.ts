import pino from 'pino';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import * as stackTraceParser from 'stacktrace-parser';
import chalkModule from 'chalk';

let chalk = new chalkModule.Instance({ level: 0 });

const options = {
  logLevel: process.env.LOG_LEVEL || 'debug',
  sharedContext: {},
  masks: [] as string[],
  maskFunc: (s: string) => `${s.substring(0, 8)}***`,
  browser: {
    inline: false,
  },
};

export type Level = 'debug' | 'fatal' | 'error' | 'warn' | 'info' | 'trace';
export type StatusType = 'error' | 'warn' | 'info' | 'debug';

const PINO_TO_CONSOLE: Record<Level, StatusType> = {
  debug: 'debug',
  fatal: 'info',
  error: 'info',
  warn: 'warn',
  info: 'info',
  trace: 'info',
};

const LEVEL_TO_LABEL: Record<Level, string> = {
  debug: 'D',
  fatal: 'F',
  error: 'E',
  warn: 'W',
  info: 'I',
  trace: 'I',
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

export const setBrowserOptions = (opts: { inline?: boolean }) => {
  Object.assign(options.browser, opts);
};

export const setColorLevel = (level: chalkModule.Level) => {
  chalk = new chalkModule.Instance({ level });
};

export type LogFn = pino.LogFn;

export interface AGLogger {
  fatal: LogFn;
  error: LogFn;
  warn: LogFn;
  info: LogFn;
  debug: LogFn;
  child: (params: Record<string, any>) => AGLogger;
}

export const logFactory = (name: string): AGLogger =>
  pino({
    name,
    level: options.logLevel,
    formatters: {
      bindings: ({ name }) => ({ name }), // omit pid and hostname
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
        const { type, level, time, msg, ...rest } = o as {
          type?: 'Error'; // exist when logger.error is used
          level: number; // this is not a label (maybe this is a spec. bug)
          time: number;
          msg?: string;
        };

        const LEVEL_TO_COLOR: Record<Level, typeof chalkModule.Instance | ((s: string) => string)> = {
          debug: chalk.gray,
          fatal: chalk.bgRed.white,
          error: chalk.red,
          warn: chalk.yellow,
          info: (s: string) => s,
          trace: (s: string) => s,
        };

        const color = LEVEL_TO_COLOR[pino.levels.labels[`${level}`]];
        const timeLabel = format(new Date(time), 'HH:mm:ss', { locale: ja });
        const levelKey = pino.levels.labels[`${level}`] as Level;
        const consoleKey = PINO_TO_CONSOLE[levelKey];
        const levelLabel = LEVEL_TO_LABEL[levelKey];

        const s = `${timeLabel} ${levelLabel} [${name}] ${msg || ''}`;

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
          if (options.browser.inline) {
            console[consoleKey](color(`${s} ${JSON.stringify(masked)}`));
          } else {
            console[consoleKey](color(s), masked);
          }
        } else {
          console[consoleKey](color(s));
        }

        _PRESENT_EXTERNAL_LOGGER({ message: msg || '', context: { logger: name, ...masked }, status: consoleKey });
      },
    },
  });
