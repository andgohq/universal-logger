import pino from 'pino';
import chalkModule from 'chalk';

declare type Level = 'debug' | 'fatal' | 'error' | 'warn' | 'info' | 'trace';
declare type StatusType = 'error' | 'warn' | 'info' | 'debug';
declare type ExternalLoggerType = (opts: {
    message: string;
    context?: Record<string, any>;
    status?: StatusType;
}) => void;
declare const NO_OPS_LOGGER: ExternalLoggerType;
declare function setExternalLogger(logger: ExternalLoggerType): void;
declare const setLogLevel: (logLevel: Level) => void;
declare const setContext: (context: Record<string, any>) => void;
declare const setMasks: (masks: string[]) => void;
declare const setMaskFunc: (f: (s: string) => string) => void;
declare const setBrowserOptions: (opts: {
    inline?: boolean;
}) => void;
declare const setColorLevel: (level: chalkModule.Level) => void;
declare type LogFn = pino.LogFn;
interface AGLogger {
    fatal: LogFn;
    error: LogFn;
    warn: LogFn;
    info: LogFn;
    debug: LogFn;
    child: (params: Record<string, any>) => AGLogger;
}
declare const logFactory: (name: string) => AGLogger;

export { AGLogger, ExternalLoggerType, Level, LogFn, NO_OPS_LOGGER, StatusType, logFactory, setBrowserOptions, setColorLevel, setContext, setExternalLogger, setLogLevel, setMaskFunc, setMasks };
