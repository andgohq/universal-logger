import pino from "pino";
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
export const NO_OPS_LOGGER: ExternalLoggerType;
declare const OPTIONS: {
    level: Level;
    context: Record<string, any>;
    maskTargets: string[];
    maskReplacement: string;
    enableStack: boolean;
    browser: {
        color: boolean;
        inline: boolean;
    };
};
export const updateOptions: (options: Partial<typeof OPTIONS>) => void;
export function setExternalLogger(logger: ExternalLoggerType): void;
export const logFactory: (name: string) => AGLogger;

//# sourceMappingURL=types.d.ts.map
