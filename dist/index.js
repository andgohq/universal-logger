'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pino = require('pino');
var dateFns = require('date-fns');
var ja = require('date-fns/locale/ja');
var stackTraceParser = require('stacktrace-parser');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var pino__default = /*#__PURE__*/_interopDefaultLegacy(pino);
var ja__default = /*#__PURE__*/_interopDefaultLegacy(ja);
var stackTraceParser__namespace = /*#__PURE__*/_interopNamespace(stackTraceParser);

const options = {
  logLevel: process.env.LOG_LEVEL || "debug",
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
const logFactory = (name) => pino__default['default']({
  name,
  level: options.logLevel,
  formatters: {
    bindings: ({ name: name2 }) => ({ name: name2 }),
    log: (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [
      k,
      options.masks.findIndex((ele) => ele === k) >= 0 && (typeof v === "string" || typeof v === "number") ? options.maskFunc(`${v}`) : k === "stack" && typeof v === "string" ? stackTraceParser__namespace.parse(v) : v
    ]))
  },
  browser: {
    serialize: true,
    write: (o) => {
      const { type, stack, level, time, msg, ...rest } = o;
      const timeLabel = dateFns.format(new Date(time), "HH:mm:ss", { locale: ja__default['default'] });
      const levelLabel = PINO_TO_CONSOLE[pino__default['default'].levels.labels[`${level}`]];
      const s = `${timeLabel} [${name}] ${msg || ""}`;
      const masked = Object.fromEntries(Object.entries(rest).map(([k, v]) => [
        k,
        options.masks.findIndex((ele) => ele === k) >= 0 && (typeof v === "string" || typeof v === "number") ? options.maskFunc(`${v}`) : k === "stack" && typeof v === "string" ? stackTraceParser__namespace.parse(v) : v
      ]));
      if (Object.keys(masked).length) {
        console[levelLabel](s, masked);
      } else {
        console[levelLabel](s);
      }
      _PRESENT_EXTERNAL_LOGGER({ message: msg || "", context: { logger: name, ...masked }, status: levelLabel });
    }
  }
});

exports.NO_OPS_LOGGER = NO_OPS_LOGGER;
exports.logFactory = logFactory;
exports.setContext = setContext;
exports.setExternalLogger = setExternalLogger;
exports.setLogLevel = setLogLevel;
exports.setMaskFunc = setMaskFunc;
exports.setMasks = setMasks;
//# sourceMappingURL=index.js.map
