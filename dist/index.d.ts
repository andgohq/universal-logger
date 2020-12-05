import { Level } from "pino";
import { StatusType } from "@datadog/browser-logs";
import { Context } from "@datadog/browser-core";
export type { Logger, Level } from 'pino';
export function initDatadog(opts: {
    clientToken: string;
    applicationId: string;
}): void;
export function datadogMessage(message: string, context?: Context, status?: StatusType): void;
export const setLogLevel: (logLevel: Level, prettyPrint?: boolean) => void;
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
