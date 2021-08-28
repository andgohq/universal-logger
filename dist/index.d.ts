export type Level = 'debug' | 'fatal' | 'error' | 'warn' | 'info' | 'trace';
export type StatusType = 'error' | 'warn' | 'info' | 'debug';
export type ExternalLoggerType = (opts: {
    message: string;
    context?: Record<string, any>;
    status?: StatusType;
}) => void;
export const NO_OPS_LOGGER: ExternalLoggerType;
export function setExternalLogger(logger: ExternalLoggerType): void;
export const setLogLevel: (logLevel: Level) => void;
export const setContext: (context: Record<string, any>) => void;
export const setMasks: (masks: string[]) => void;
export const setMaskFunc: (f: (s: string) => string) => void;
export type AGLoggerFunc = (msgOrMergingObject?: string | Record<string, any>, msg?: string, ...interpolationValues: any[]) => void;
export interface AGLogger {
    fatal: AGLoggerFunc;
    error: AGLoggerFunc;
    warn: AGLoggerFunc;
    info: AGLoggerFunc;
    debug: AGLoggerFunc;
    child: (params: Record<string, any>) => AGLogger;
}
export const logFactory: (name: string) => AGLogger;

//# sourceMappingURL=index.d.ts.map
