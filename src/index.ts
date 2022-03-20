import pino from 'pino';
import chalkModule from 'chalk';
import dayjs from 'dayjs';

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

const DEFAULT_MASK_LENGTH = 8;
const DEFAULT_CHALK_LEVEL = 1;

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

let chalk = new chalkModule.Instance({ level: DEFAULT_CHALK_LEVEL });
let PRESENT_EXTERNAL_LOGGER = NO_OPS_LOGGER;

const OPTIONS = {
  level: (process.env.LOG_LEVEL ?? 'debug') as Level,
  context: {} as Record<string, any>,
  maskTargets: [] as string[],
  maskFunc: (s: string) => `${s.substring(0, DEFAULT_MASK_LENGTH)}***`,
  enableStack: true,
  browser: {
    inline: false,
  },
};

export const updateOptions = (options: Partial<typeof OPTIONS>) => {
  Object.assign(OPTIONS, options);
};

export function setExternalLogger(logger: ExternalLoggerType) {
  PRESENT_EXTERNAL_LOGGER = logger;
}

export const setColorLevel = (level: chalkModule.Level) => {
  chalk = new chalkModule.Instance({ level });
};

const serializer = (k: string, v: any) => {
  const isMaskTarget =
    OPTIONS.maskTargets.findIndex((ele) => ele === k) >= 0 && (typeof v === 'string' || typeof v === 'number');

  if (isMaskTarget) {
    return OPTIONS.maskFunc(`${v}`);
  } else {
    return v;
  }
};

const transform = (obj: Record<string, any>) => {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, serializer(k, v)]));
};

const pickExists = (obj: Record<string, any>) => {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
};

const summarize = (obj: Record<string, any>) => {
  // omit stack, level, time, msg from the parameter object
  const { type, message, stack, err, msg, ...rest } = obj as {
    // properties when the object is Error instance
    // error style 1
    type?: 'Error';
    message?: string; // exist when logger.error is used
    stack?: string; // exist when logger.error is used
    // error style 2
    err?: Error;
    // standard properties
    msg?: string;
  };

  const isErrorMode = (type == 'Error' && stack) || err;
  const finalMsg = (isErrorMode ? msg ?? message ?? err?.message : msg) ?? '';
  const finalParams = {
    ...transform(rest),
    ...(isErrorMode && OPTIONS.enableStack
      ? { stack: (stack ?? err?.stack ?? '').split('\n') }
      : pickExists({ type, message, stack })),
  };

  return { msg: finalMsg, ...finalParams };
};

export const logFactory = (name: string): AGLogger =>
  pino({
    name,
    level: OPTIONS.level,
    formatters: {
      // omit pid and hostname
      bindings: ({ name }) => ({ name }),
      // for nodejs environment only
      log: (o) => {
        const { level, time, ...rest } = o as Record<string, any>;

        return { level, time, ...summarize(rest) };
      },
    },
    browser: {
      // use Pino's standard serializers
      // https://github.com/pinojs/pino-std-serializers
      serialize: false,
      write: (o) => {
        const { level, time, ...rest } = o as Record<string, any>;
        const { msg, ...params } = summarize(rest);

        const LEVEL_TO_COLOR: Record<Level, typeof chalkModule.Instance | ((s: string) => string)> = {
          debug: chalk.gray,
          fatal: chalk.bgRed.white,
          error: chalk.red,
          warn: chalk.yellow,
          info: (s: string) => s,
          trace: (s: string) => s,
        };

        const color = LEVEL_TO_COLOR[pino.levels.labels[`${level}`]];
        // get HH:mm:ss
        const timeLabel = dayjs(time).format('HH:mm:ss');
        const levelKey = pino.levels.labels[`${level}`] as Level;
        const consoleKey = LEVEL_TO_CONSOLE[levelKey];
        const levelLabel = LEVEL_TO_LABEL[levelKey];

        const s = `${timeLabel} ${levelLabel} [${name}] ${msg}`;

        if (Object.keys(params).length) {
          if (OPTIONS.browser.inline) {
            console[consoleKey](color(`${s} ${JSON.stringify(params)}`));
          } else {
            console[consoleKey](color(s), params);
          }
        } else {
          console[consoleKey](color(s));
        }

        PRESENT_EXTERNAL_LOGGER({ message: msg || '', context: { logger: name, ...params }, status: consoleKey });
      },
    },
  });
