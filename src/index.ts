import pino from 'pino';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import * as stackTraceParser from 'stacktrace-parser';
import chalkModule from 'chalk';

export type Level = 'debug' | 'fatal' | 'error' | 'warn' | 'info' | 'trace';
export type StatusType = 'error' | 'warn' | 'info' | 'debug';
export type LogFn = pino.LogFn;
export type ExternalLoggerType = (opts: {
  message: string;
  context?: Record<string, any>;
  status?: StatusType;
}) => void;

export interface AGLogger {
  fatal: LogFn;
  error: LogFn;
  warn: LogFn;
  info: LogFn;
  debug: LogFn;
  child: (params: Record<string, any>) => AGLogger;
}

export const NO_OPS_LOGGER: ExternalLoggerType = () => {};

const LEVEL_TO_CONSOLE: Record<Level, StatusType> = {
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

const DEFAULT_MASK_LENGTH = 8;
const DEFAULT_CHALK_LEVEL = 0;

let chalk = new chalkModule.Instance({ level: DEFAULT_CHALK_LEVEL });
let _PRESENT_EXTERNAL_LOGGER = NO_OPS_LOGGER;

const OPTIONS = {
  level: (process.env.LOG_LEVEL ?? 'debug') as Level,
  context: {} as Record<string, any>,
  maskTargets: [] as string[],
  maskFunc: (s: string) => `${s.substring(0, DEFAULT_MASK_LENGTH)}***`,
  browser: {
    inline: false,
  },
};

export const updateOptions = (options: Partial<typeof OPTIONS>) => {
  Object.assign(OPTIONS, options);
};

export function setExternalLogger(logger: ExternalLoggerType) {
  _PRESENT_EXTERNAL_LOGGER = logger;
}

export const setColorLevel = (level: chalkModule.Level) => {
  chalk = new chalkModule.Instance({ level });
};

export const logFactory = (name: string): AGLogger =>
  pino({
    name,
    level: OPTIONS.level,
    formatters: {
      // omit pid and hostname
      bindings: ({ name }) => ({ name }),
      // for nodejs environment only
      log: (o) =>
        Object.fromEntries(
          Object.entries(o).map(([k, v]) => [
            k,
            OPTIONS.maskTargets.findIndex((ele) => ele === k) >= 0 && (typeof v === 'string' || typeof v === 'number')
              ? OPTIONS.maskFunc(`${v}`)
              : k === 'err' && v instanceof Error
              ? { message: v.message, stack: stackTraceParser.parse(v.stack ?? '') }
              : v,
          ])
        ),
    },
    browser: {
      // use Pino's standard serializers
      // https://github.com/pinojs/pino-std-serializers
      serialize: true,
      write: (o) => {
        // omit level, time, msg from the parameter object
        const { level, time, msg, ...rest } = o as {
          type?: 'Error'; // exist when logger.error is used
          stack?: string;
          err?: Error;
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
        const consoleKey = LEVEL_TO_CONSOLE[levelKey];
        const levelLabel = LEVEL_TO_LABEL[levelKey];

        const s = `${timeLabel} ${levelLabel} [${name}] ${msg || ''}`;

        const masked = Object.fromEntries(
          Object.entries(rest).map(([k, v]) => [
            k,
            OPTIONS.maskTargets.findIndex((ele) => ele === k) >= 0 && (typeof v === 'string' || typeof v === 'number')
              ? OPTIONS.maskFunc(`${v}`)
              : k === 'err' && v instanceof Error
              ? { type: 'AAA', message: v.message, stack: stackTraceParser.parse(v.stack ?? '') }
              : v,
          ])
        );

        if (Object.keys(masked).length) {
          if (OPTIONS.browser.inline) {
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
