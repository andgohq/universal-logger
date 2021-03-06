import { Level } from "pino";
import { datadogLogs } from "@datadog/browser-logs";
import { Context } from "@datadog/browser-core";
export type { Logger, Level } from 'pino';
export type StatusType = Exclude<Parameters<typeof datadogLogs['logger']['log']>[2], undefined>;
export function initDatadog(userConfiguration: Parameters<typeof datadogLogs.init>[0]): void;
export function datadogMessage(message: string, context?: Context, status?: StatusType): void;
export const setLogLevel: (logLevel: Level, prettyPrint?: boolean) => void;
export const setContext: (context: Record<string, any>) => void;
export type AGLoggerFunc = (msgOrMergingObject?: string | Record<string, any>, msg?: string, ...interpolationValues: any[]) => void;
export interface AGLogger {
    fatal: AGLoggerFunc;
    error: AGLoggerFunc;
    warn: AGLoggerFunc;
    info: AGLoggerFunc;
    debug: AGLoggerFunc;
}
export const logFactory: (name: string) => AGLogger;

//# sourceMappingURL=index.d.ts.map
