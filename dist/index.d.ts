import { StatusType } from "@datadog/browser-logs";
import { Context } from "@datadog/browser-core";
export function initDatadog(opts: {
    clientToken: string;
    applicationId: string;
}): void;
export function datadogMessage(message: string, context?: Context, status?: StatusType): void;
export const setLogLevel: (level: string) => void;
export const logFactory: (name: string) => pino.Logger;

//# sourceMappingURL=index.d.ts.map
