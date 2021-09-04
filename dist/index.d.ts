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
declare type AGLoggerFunc = (msgOrMergingObject?: string | Record<string, any>, msg?: string, ...interpolationValues: any[]) => void;
interface AGLogger {
    fatal: AGLoggerFunc;
    error: AGLoggerFunc;
    warn: AGLoggerFunc;
    info: AGLoggerFunc;
    debug: AGLoggerFunc;
    child: (params: Record<string, any>) => AGLogger;
}
declare const logFactory: (name: string) => AGLogger;

export { AGLogger, AGLoggerFunc, ExternalLoggerType, Level, NO_OPS_LOGGER, StatusType, logFactory, setContext, setExternalLogger, setLogLevel, setMaskFunc, setMasks };
