import pino from 'pino';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import * as stackTraceParser from 'stacktrace-parser';

const options = {
  logLevel: process.env.LOG_LEVEL ?? "debug",
  sharedContext: {},
  masks: [],
  maskFunc: (s) => `${s.substr(0, 8)}***`
};
const PINO_TO_CONSOLE = {
  debug: "debug",
  fatal: "error",
  error: "error",
  warn: "warn",
  info: "info",
  trace: "info"
};
const NO_OPS_LOGGER = () => {
};
let _PRESENT_EXTERNAL_LOGGER = NO_OPS_LOGGER;
function setExternalLogger(logger) {
  _PRESENT_EXTERNAL_LOGGER = logger;
}
const setLogLevel = (logLevel) => {
  Object.assign(options, { logLevel });
};
const setContext = (context) => {
  options.sharedContext = context;
};
const setMasks = (masks) => {
  options.masks = masks;
};
const setMaskFunc = (f) => {
  options.maskFunc = f;
};
const logFactory = (name) => pino({
  name,
  level: options.logLevel,
  formatters: {
    bindings: () => ({}),
    log: (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [
      k,
      options.masks.findIndex((ele) => ele === k) >= 0 && (typeof v === "string" || typeof v === "number") ? options.maskFunc(`${v}`) : k === "stack" && typeof v === "string" ? stackTraceParser.parse(v) : v
    ]))
  },
  browser: {
    serialize: true,
    write: (o) => {
      const { type, stack, level, time, msg, ...rest } = o;
      const timeLabel = format(new Date(time), "HH:mm:ss", { locale: ja });
      const levelLabel = PINO_TO_CONSOLE[pino.levels.labels[`${level}`]];
      const s = `${timeLabel} [${name}] ${msg ?? ""}`;
      const masked = Object.fromEntries(Object.entries(rest).map(([k, v]) => [
        k,
        options.masks.findIndex((ele) => ele === k) >= 0 && (typeof v === "string" || typeof v === "number") ? options.maskFunc(`${v}`) : k === "stack" && typeof v === "string" ? stackTraceParser.parse(v) : v
      ]));
      if (Object.keys(masked).length) {
        console[levelLabel](s, masked);
      } else {
        console[levelLabel](s);
      }
      _PRESENT_EXTERNAL_LOGGER({ message: msg ?? "", context: { logger: name, ...masked }, status: levelLabel });
    }
  }
});

export { NO_OPS_LOGGER, logFactory, setContext, setExternalLogger, setLogLevel, setMaskFunc, setMasks };
//# sourceMappingURL=index.mjs.map
