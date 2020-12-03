// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"c72c7ad0a0f98dc5d22bd6d284b34de0":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "f4cccd61729d14584a7fec3c20dca053";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"7843b3960e086726267ff606847fc92b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDatadog = initDatadog;
exports.datadogMessage = datadogMessage;
exports.logFactory = exports.setLogLevel = void 0;

var _pino = _interopRequireDefault(require("pino"));

var _browserLogs = require("@datadog/browser-logs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DATADOG_INITIALIZED = false;

function initDatadog(opts) {
  _browserLogs.datadogLogs.init({
    clientToken: opts.clientToken,
    datacenter: _browserLogs.Datacenter.US,
    applicationId: opts.applicationId,
    silentMultipleInit: true,
    forwardErrorsToLogs: true,
    sampleRate: 100
  });

  DATADOG_INITIALIZED = true;
}

function datadogMessage(message, context, status) {
  if (!DATADOG_INITIALIZED) {
    return;
  }

  _browserLogs.datadogLogs.logger.log(message, {
    context
  }, status);
}

const baseLogger = (0, _pino.default)({
  level: 'debug',
  // this is overwritten by setLevel
  browser: {
    serialize: true,
    write: o => {
      console.log(o); // const loggerTree = logEvent.bindings.map((b) => b.module).join('.');
      // const timeLabel = format(new Date(logEvent.ts), 'HH:mm:ss', { locale: ja });
      // // level !== 'error': set first arg as a message
      // // level === 'error': set first arg's msg field as a message
      // const isError = level === 'error' && logEvent.messages[0].type === 'Error';
      // const msg = isError ? logEvent.messages[1] ?? logEvent.messages[0].msg : logEvent.messages[0];
      // // level !== 'error': set second arg as a context
      // // level === 'error': set third arg as a context
      // const context = logEvent.messages[isError ? 2 : 1];
      // // validation
      // if (typeof msg !== 'string') {
      //   console.debug('[logger]', { level, logEvent, msg });
      //   throw new Error(`${msg} should be string type`);
      // }
      // if (typeof context !== 'object') {
      //   console.debug('[logger]', { level, logEvent, context });
      //   throw new Error(`${msg} should be object type`);
      // }
      // // when level === 'error', console.error shows a stack trace on dev console
      // console[level](`${timeLabel} [${loggerTree}] ${msg}`, context);
      // datadogMessage(msg, context, StatusType[level]);
    }
  }
});

const setLogLevel = level => {
  baseLogger.level = level;
}; // export class AGLogger {
//   _logger: Logger
//   constructor(name: string) {
//     this._logger = baseLogger.child({ module: name });
//   }
//   log(msg: string, params?: Record<string,any>) {
//     this._logger.log(msg, params);
//   }
//   info(msg: string, params?: Record<string,any>) {
//     this._l log(msg, params);
//   }
// }


exports.setLogLevel = setLogLevel;

const logFactory = name => {
  const _logger = baseLogger.child({
    module: name
  });

  return _logger;
};

exports.logFactory = logFactory;
},{"pino":"53406330d12493e24777f49b9233054b","@datadog/browser-logs":"6e0c3116e37f766869430b3c4a2787cf"}],"53406330d12493e24777f49b9233054b":[function(require,module,exports) {
'use strict'

var format = require('quick-format-unescaped')

module.exports = pino

var _console = pfGlobalThisOrFallback().console || {}
var stdSerializers = {
  mapHttpRequest: mock,
  mapHttpResponse: mock,
  wrapRequestSerializer: passthrough,
  wrapResponseSerializer: passthrough,
  wrapErrorSerializer: passthrough,
  req: mock,
  res: mock,
  err: asErrValue
}

function pino (opts) {
  opts = opts || {}
  opts.browser = opts.browser || {}

  var transmit = opts.browser.transmit
  if (transmit && typeof transmit.send !== 'function') { throw Error('pino: transmit option must have a send function') }

  var proto = opts.browser.write || _console
  if (opts.browser.write) opts.browser.asObject = true
  var serializers = opts.serializers || {}
  var serialize = Array.isArray(opts.browser.serialize)
    ? opts.browser.serialize.filter(function (k) {
      return k !== '!stdSerializers.err'
    })
    : opts.browser.serialize === true ? Object.keys(serializers) : false
  var stdErrSerialize = opts.browser.serialize

  if (
    Array.isArray(opts.browser.serialize) &&
    opts.browser.serialize.indexOf('!stdSerializers.err') > -1
  ) stdErrSerialize = false

  var levels = ['error', 'fatal', 'warn', 'info', 'debug', 'trace']

  if (typeof proto === 'function') {
    proto.error = proto.fatal = proto.warn =
    proto.info = proto.debug = proto.trace = proto
  }
  if (opts.enabled === false) opts.level = 'silent'
  var level = opts.level || 'info'
  var logger = Object.create(proto)
  if (!logger.log) logger.log = noop

  Object.defineProperty(logger, 'levelVal', {
    get: getLevelVal
  })
  Object.defineProperty(logger, 'level', {
    get: getLevel,
    set: setLevel
  })

  var setOpts = {
    transmit,
    serialize,
    asObject: opts.browser.asObject,
    levels,
    timestamp: getTimeFunction(opts)
  }
  logger.levels = pino.levels
  logger.level = level

  logger.setMaxListeners = logger.getMaxListeners =
  logger.emit = logger.addListener = logger.on =
  logger.prependListener = logger.once =
  logger.prependOnceListener = logger.removeListener =
  logger.removeAllListeners = logger.listeners =
  logger.listenerCount = logger.eventNames =
  logger.write = logger.flush = noop
  logger.serializers = serializers
  logger._serialize = serialize
  logger._stdErrSerialize = stdErrSerialize
  logger.child = child

  if (transmit) logger._logEvent = createLogEventShape()

  function getLevelVal () {
    return this.level === 'silent'
      ? Infinity
      : this.levels.values[this.level]
  }

  function getLevel () {
    return this._level
  }
  function setLevel (level) {
    if (level !== 'silent' && !this.levels.values[level]) {
      throw Error('unknown level ' + level)
    }
    this._level = level

    set(setOpts, logger, 'error', 'log') // <-- must stay first
    set(setOpts, logger, 'fatal', 'error')
    set(setOpts, logger, 'warn', 'error')
    set(setOpts, logger, 'info', 'log')
    set(setOpts, logger, 'debug', 'log')
    set(setOpts, logger, 'trace', 'log')
  }

  function child (bindings) {
    if (!bindings) {
      throw new Error('missing bindings for child Pino')
    }
    var bindingsSerializers = bindings.serializers
    if (serialize && bindingsSerializers) {
      var childSerializers = Object.assign({}, serializers, bindingsSerializers)
      var childSerialize = opts.browser.serialize === true
        ? Object.keys(childSerializers)
        : serialize
      delete bindings.serializers
      applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize)
    }
    function Child (parent) {
      this._childLevel = (parent._childLevel | 0) + 1
      this.error = bind(parent, bindings, 'error')
      this.fatal = bind(parent, bindings, 'fatal')
      this.warn = bind(parent, bindings, 'warn')
      this.info = bind(parent, bindings, 'info')
      this.debug = bind(parent, bindings, 'debug')
      this.trace = bind(parent, bindings, 'trace')
      if (childSerializers) {
        this.serializers = childSerializers
        this._serialize = childSerialize
      }
      if (transmit) {
        this._logEvent = createLogEventShape(
          [].concat(parent._logEvent.bindings, bindings)
        )
      }
    }
    Child.prototype = this
    return new Child(this)
  }
  return logger
}

pino.levels = {
  values: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  labels: {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal'
  }
}

pino.stdSerializers = stdSerializers
pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime })

function set (opts, logger, level, fallback) {
  var proto = Object.getPrototypeOf(logger)
  logger[level] = logger.levelVal > logger.levels.values[level] ? noop
    : (proto[level] ? proto[level] : (_console[level] || _console[fallback] || noop))

  wrap(opts, logger, level)
}

function wrap (opts, logger, level) {
  if (!opts.transmit && logger[level] === noop) return

  logger[level] = (function (write) {
    return function LOG () {
      var ts = opts.timestamp()
      var args = new Array(arguments.length)
      var proto = (Object.getPrototypeOf && Object.getPrototypeOf(this) === _console) ? _console : this
      for (var i = 0; i < args.length; i++) args[i] = arguments[i]

      if (opts.serialize && !opts.asObject) {
        applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize)
      }
      if (opts.asObject) write.call(proto, asObject(this, level, args, ts))
      else write.apply(proto, args)

      if (opts.transmit) {
        var transmitLevel = opts.transmit.level || logger.level
        var transmitValue = pino.levels.values[transmitLevel]
        var methodValue = pino.levels.values[level]
        if (methodValue < transmitValue) return
        transmit(this, {
          ts,
          methodLevel: level,
          methodValue,
          transmitLevel,
          transmitValue: pino.levels.values[opts.transmit.level || logger.level],
          send: opts.transmit.send,
          val: logger.levelVal
        }, args)
      }
    }
  })(logger[level])
}

function asObject (logger, level, args, ts) {
  if (logger._serialize) applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize)
  var argsCloned = args.slice()
  var msg = argsCloned[0]
  var o = {}
  if (ts) {
    o.time = ts
  }
  o.level = pino.levels.values[level]
  var lvl = (logger._childLevel | 0) + 1
  if (lvl < 1) lvl = 1
  // deliberate, catching objects, arrays
  if (msg !== null && typeof msg === 'object') {
    while (lvl-- && typeof argsCloned[0] === 'object') {
      Object.assign(o, argsCloned.shift())
    }
    msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : undefined
  } else if (typeof msg === 'string') msg = format(argsCloned.shift(), argsCloned)
  if (msg !== undefined) o.msg = msg
  return o
}

function applySerializers (args, serialize, serializers, stdErrSerialize) {
  for (var i in args) {
    if (stdErrSerialize && args[i] instanceof Error) {
      args[i] = pino.stdSerializers.err(args[i])
    } else if (typeof args[i] === 'object' && !Array.isArray(args[i])) {
      for (var k in args[i]) {
        if (serialize && serialize.indexOf(k) > -1 && k in serializers) {
          args[i][k] = serializers[k](args[i][k])
        }
      }
    }
  }
}

function bind (parent, bindings, level) {
  return function () {
    var args = new Array(1 + arguments.length)
    args[0] = bindings
    for (var i = 1; i < args.length; i++) {
      args[i] = arguments[i - 1]
    }
    return parent[level].apply(this, args)
  }
}

function transmit (logger, opts, args) {
  var send = opts.send
  var ts = opts.ts
  var methodLevel = opts.methodLevel
  var methodValue = opts.methodValue
  var val = opts.val
  var bindings = logger._logEvent.bindings

  applySerializers(
    args,
    logger._serialize || Object.keys(logger.serializers),
    logger.serializers,
    logger._stdErrSerialize === undefined ? true : logger._stdErrSerialize
  )
  logger._logEvent.ts = ts
  logger._logEvent.messages = args.filter(function (arg) {
    // bindings can only be objects, so reference equality check via indexOf is fine
    return bindings.indexOf(arg) === -1
  })

  logger._logEvent.level.label = methodLevel
  logger._logEvent.level.value = methodValue

  send(methodLevel, logger._logEvent, val)

  logger._logEvent = createLogEventShape(bindings)
}

function createLogEventShape (bindings) {
  return {
    ts: 0,
    messages: [],
    bindings: bindings || [],
    level: { label: '', value: 0 }
  }
}

function asErrValue (err) {
  var obj = {
    type: err.constructor.name,
    msg: err.message,
    stack: err.stack
  }
  for (var key in err) {
    if (obj[key] === undefined) {
      obj[key] = err[key]
    }
  }
  return obj
}

function getTimeFunction (opts) {
  if (typeof opts.timestamp === 'function') {
    return opts.timestamp
  }
  if (opts.timestamp === false) {
    return nullTime
  }
  return epochTime
}

function mock () { return {} }
function passthrough (a) { return a }
function noop () {}

function nullTime () { return false }
function epochTime () { return Date.now() }
function unixTime () { return Math.round(Date.now() / 1000.0) }
function isoTime () { return new Date(Date.now()).toISOString() } // using Date.now() for testability

/* eslint-disable */
/* istanbul ignore next */
function pfGlobalThisOrFallback () {
  function defd (o) { return typeof o !== 'undefined' && o }
  try {
    if (typeof globalThis !== 'undefined') return globalThis
    Object.defineProperty(Object.prototype, 'globalThis', {
      get: function () {
        delete Object.prototype.globalThis
        return (this.globalThis = this)
      },
      configurable: true
    })
    return globalThis
  } catch (e) {
    return defd(self) || defd(window) || defd(this) || {}
  }
}
/* eslint-enable */

},{"quick-format-unescaped":"87585a7c1c272705375f55ae0b6eed76"}],"87585a7c1c272705375f55ae0b6eed76":[function(require,module,exports) {
'use strict'
function tryStringify (o) {
  try { return JSON.stringify(o) } catch(e) { return '"[Circular]"' }
}

module.exports = format

function format(f, args, opts) {
  var ss = (opts && opts.stringify) || tryStringify
  var offset = 1
  if (typeof f === 'object' && f !== null) {
    var len = args.length + offset
    if (len === 1) return f
    var objects = new Array(len)
    objects[0] = ss(f)
    for (var index = 1; index < len; index++) {
      objects[index] = ss(args[index])
    }
    return objects.join(' ')
  }
  if (typeof f !== 'string') {
    return f
  }
  var argLen = args.length
  if (argLen === 0) return f
  var x = ''
  var str = ''
  var a = 1 - offset
  var lastPos = -1
  var flen = (f && f.length) || 0
  for (var i = 0; i < flen;) {
    if (f.charCodeAt(i) === 37 && i + 1 < flen) {
      lastPos = lastPos > -1 ? lastPos : 0
      switch (f.charCodeAt(i + 1)) {
        case 100: // 'd'
          if (a >= argLen)
            break
          if (lastPos < i)
            str += f.slice(lastPos, i)
          if (args[a] == null)  break
          str += Number(args[a])
          lastPos = i = i + 2
          break
        case 79: // 'O'
        case 111: // 'o'
        case 106: // 'j'
          if (a >= argLen)
            break
          if (lastPos < i)
            str += f.slice(lastPos, i)
          if (args[a] === undefined) break
          var type = typeof args[a]
          if (type === 'string') {
            str += '\'' + args[a] + '\''
            lastPos = i + 2
            i++
            break
          }
          if (type === 'function') {
            str += args[a].name || '<anonymous>'
            lastPos = i + 2
            i++
            break
          }
          str += ss(args[a])
          lastPos = i + 2
          i++
          break
        case 115: // 's'
          if (a >= argLen)
            break
          if (lastPos < i)
            str += f.slice(lastPos, i)
          str += String(args[a])
          lastPos = i + 2
          i++
          break
        case 37: // '%'
          if (lastPos < i)
            str += f.slice(lastPos, i)
          str += '%'
          lastPos = i + 2
          i++
          break
      }
      ++a
    }
    ++i
  }
  if (lastPos === -1)
    return f
  else if (lastPos < flen) {
    str += f.slice(lastPos)
  }

  return str
}

},{}],"6e0c3116e37f766869430b3c4a2787cf":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_core_1 = require("@datadog/browser-core");
exports.Datacenter = browser_core_1.Datacenter;
var logger_1 = require("./domain/logger");
exports.StatusType = logger_1.StatusType;
exports.HandlerType = logger_1.HandlerType;
exports.Logger = logger_1.Logger;
var logs_entry_1 = require("./boot/logs.entry");
exports.datadogLogs = logs_entry_1.datadogLogs;
//# sourceMappingURL=index.js.map
},{"@datadog/browser-core":"2c4da984019bc1ef174ca0e92bb0855d","./domain/logger":"c554a92bfe782f83f0d50f842e4de8fb","./boot/logs.entry":"c79a2cf2f6490c66d1cda96afe8b5ba6"}],"2c4da984019bc1ef174ca0e92bb0855d":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var configuration_1 = require("./domain/configuration");
exports.DEFAULT_CONFIGURATION = configuration_1.DEFAULT_CONFIGURATION;
exports.isIntakeRequest = configuration_1.isIntakeRequest;
exports.buildCookieOptions = configuration_1.buildCookieOptions;
var automaticErrorCollection_1 = require("./domain/automaticErrorCollection");
exports.startAutomaticErrorCollection = automaticErrorCollection_1.startAutomaticErrorCollection;
var tracekit_1 = require("./domain/tracekit");
exports.computeStackTrace = tracekit_1.computeStackTrace;
var init_1 = require("./boot/init");
exports.BuildMode = init_1.BuildMode;
exports.Datacenter = init_1.Datacenter;
exports.defineGlobal = init_1.defineGlobal;
exports.makeGlobal = init_1.makeGlobal;
exports.commonInit = init_1.commonInit;
exports.checkCookiesAuthorized = init_1.checkCookiesAuthorized;
exports.checkIsNotLocalFile = init_1.checkIsNotLocalFile;
var internalMonitoring_1 = require("./domain/internalMonitoring");
exports.monitored = internalMonitoring_1.monitored;
exports.monitor = internalMonitoring_1.monitor;
exports.addMonitoringMessage = internalMonitoring_1.addMonitoringMessage;
var observable_1 = require("./tools/observable");
exports.Observable = observable_1.Observable;
var sessionManagement_1 = require("./domain/sessionManagement");
exports.startSessionManagement = sessionManagement_1.startSessionManagement;
exports.SESSION_TIME_OUT_DELAY = sessionManagement_1.SESSION_TIME_OUT_DELAY;
// Exposed for tests
exports.SESSION_COOKIE_NAME = sessionManagement_1.SESSION_COOKIE_NAME;
exports.stopSessionManagement = sessionManagement_1.stopSessionManagement;
var transport_1 = require("./transport/transport");
exports.HttpRequest = transport_1.HttpRequest;
exports.Batch = transport_1.Batch;
tslib_1.__exportStar(require("./tools/urlPolyfill"), exports);
tslib_1.__exportStar(require("./tools/utils"), exports);
var error_1 = require("./tools/error");
exports.ErrorSource = error_1.ErrorSource;
exports.formatUnknownError = error_1.formatUnknownError;
var context_1 = require("./tools/context");
exports.combine = context_1.combine;
exports.deepClone = context_1.deepClone;
exports.withSnakeCaseKeys = context_1.withSnakeCaseKeys;
var cookie_1 = require("./browser/cookie");
exports.areCookiesAuthorized = cookie_1.areCookiesAuthorized;
exports.getCookie = cookie_1.getCookie;
exports.setCookie = cookie_1.setCookie;
exports.COOKIE_ACCESS_DELAY = cookie_1.COOKIE_ACCESS_DELAY;
var xhrProxy_1 = require("./browser/xhrProxy");
exports.startXhrProxy = xhrProxy_1.startXhrProxy;
exports.resetXhrProxy = xhrProxy_1.resetXhrProxy;
var fetchProxy_1 = require("./browser/fetchProxy");
exports.startFetchProxy = fetchProxy_1.startFetchProxy;
exports.resetFetchProxy = fetchProxy_1.resetFetchProxy;
var boundedBuffer_1 = require("./tools/boundedBuffer");
exports.BoundedBuffer = boundedBuffer_1.BoundedBuffer;
var contextManager_1 = require("./tools/contextManager");
exports.createContextManager = contextManager_1.createContextManager;
tslib_1.__exportStar(require("./tools/specHelper"), exports);
//# sourceMappingURL=index.js.map
},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1","./domain/configuration":"6763541ca333269e57118bc4c50800cf","./domain/automaticErrorCollection":"be29ffc5ff3ec36df8a0526d8efa37e5","./domain/tracekit":"35ac35b5e9178c44050ae5baee46483f","./boot/init":"a64034b0e647d8ea8b683cc52eb89f8d","./domain/internalMonitoring":"6d081b3adf74fb2ed9632aae8731586a","./tools/observable":"38310c2b77d6e778570b5a56ef9806bb","./domain/sessionManagement":"183a6e16ab4f7d1c9cc409df2a4654f3","./transport/transport":"7e0163e11a7ed0141607e7e5d6bf43a0","./tools/urlPolyfill":"30a74b82219bd3790087d6a539e0dec1","./tools/utils":"a4c0c5c567ad3af2f7aa1ae7108bd730","./tools/error":"0dddf352a2255acaa5426f9ee2e94d13","./tools/context":"0a95ec8b7489425ff8c95bc9182230cf","./browser/cookie":"ebaf883ffc0dcd01cd439a4ca56c6088","./browser/xhrProxy":"dfdf6d7dbd141ea1bafda02e0c0b4cae","./browser/fetchProxy":"139ace042ae6bdfd7849fc66c7e6554e","./tools/boundedBuffer":"c7de07e42779b3f5dae266fc246d6b22","./tools/contextManager":"a2b38010c0d318219e1b264edf210175","./tools/specHelper":"4086e826a87d0c04dcb7fa2132257e73"}],"a212b5bd40bedbc434eaed1b3a2942b1":[function(require,module,exports) {
var global = arguments[3];
var define;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global global, define, System, Reflect, Promise */
var __extends;

var __assign;

var __rest;

var __decorate;

var __param;

var __metadata;

var __awaiter;

var __generator;

var __exportStar;

var __values;

var __read;

var __spread;

var __spreadArrays;

var __await;

var __asyncGenerator;

var __asyncDelegator;

var __asyncValues;

var __makeTemplateObject;

var __importStar;

var __importDefault;

var __classPrivateFieldGet;

var __classPrivateFieldSet;

var __createBinding;

(function (factory) {
  var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};

  if (typeof define === "function" && define.amd) {
    define("tslib", ["exports"], function (exports) {
      factory(createExporter(root, createExporter(exports)));
    });
  } else if (typeof module === "object" && typeof module.exports === "object") {
    factory(createExporter(root, createExporter(module.exports)));
  } else {
    factory(createExporter(root));
  }

  function createExporter(exports, previous) {
    if (exports !== root) {
      if (typeof Object.create === "function") {
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
      } else {
        exports.__esModule = true;
      }
    }

    return function (id, v) {
      return exports[id] = previous ? previous(id, v) : v;
    };
  }
})(function (exporter) {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  __extends = function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };

  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  __rest = function (s, e) {
    var t = {};

    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  };

  __decorate = function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  __param = function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };

  __metadata = function (metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  };

  __awaiter = function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  __generator = function (thisArg, body) {
    var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
        f,
        y,
        t,
        g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }), g;

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");

      while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  };

  __createBinding = function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  };

  __exportStar = function (m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
  };

  __values = function (o) {
    var s = typeof Symbol === "function" && Symbol.iterator,
        m = s && o[s],
        i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function () {
        if (o && i >= o.length) o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };

  __read = function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;

    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = {
        error: error
      };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }

    return ar;
  };

  __spread = function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

    return ar;
  };

  __spreadArrays = function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

    for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

    return r;
  };

  __await = function (v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  };

  __asyncGenerator = function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []),
        i,
        q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i;

    function verb(n) {
      if (g[n]) i[n] = function (v) {
        return new Promise(function (a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
    }

    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }

    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }

    function fulfill(value) {
      resume("next", value);
    }

    function reject(value) {
      resume("throw", value);
    }

    function settle(f, v) {
      if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  };

  __asyncDelegator = function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) {
      throw e;
    }), verb("return"), i[Symbol.iterator] = function () {
      return this;
    }, i;

    function verb(n, f) {
      i[n] = o[n] ? function (v) {
        return (p = !p) ? {
          value: __await(o[n](v)),
          done: n === "return"
        } : f ? f(v) : v;
      } : f;
    }
  };

  __asyncValues = function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
        i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i);

    function verb(n) {
      i[n] = o[n] && function (v) {
        return new Promise(function (resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }

    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function (v) {
        resolve({
          value: v,
          done: d
        });
      }, reject);
    }
  };

  __makeTemplateObject = function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", {
        value: raw
      });
    } else {
      cooked.raw = raw;
    }

    return cooked;
  };

  __importStar = function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };

  __importDefault = function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  };

  __classPrivateFieldGet = function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    return privateMap.get(receiver);
  };

  __classPrivateFieldSet = function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }

    privateMap.set(receiver, value);
    return value;
  };

  exporter("__extends", __extends);
  exporter("__assign", __assign);
  exporter("__rest", __rest);
  exporter("__decorate", __decorate);
  exporter("__param", __param);
  exporter("__metadata", __metadata);
  exporter("__awaiter", __awaiter);
  exporter("__generator", __generator);
  exporter("__exportStar", __exportStar);
  exporter("__createBinding", __createBinding);
  exporter("__values", __values);
  exporter("__read", __read);
  exporter("__spread", __spread);
  exporter("__spreadArrays", __spreadArrays);
  exporter("__await", __await);
  exporter("__asyncGenerator", __asyncGenerator);
  exporter("__asyncDelegator", __asyncDelegator);
  exporter("__asyncValues", __asyncValues);
  exporter("__makeTemplateObject", __makeTemplateObject);
  exporter("__importStar", __importStar);
  exporter("__importDefault", __importDefault);
  exporter("__classPrivateFieldGet", __classPrivateFieldGet);
  exporter("__classPrivateFieldSet", __classPrivateFieldSet);
});
},{}],"6763541ca333269e57118bc4c50800cf":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var init_1 = require("../boot/init");
var cookie_1 = require("../browser/cookie");
var urlPolyfill_1 = require("../tools/urlPolyfill");
var utils_1 = require("../tools/utils");
exports.DEFAULT_CONFIGURATION = {
    allowedTracingOrigins: [],
    maxErrorsByMinute: 3000,
    maxInternalMonitoringMessagesPerPage: 15,
    resourceSampleRate: 100,
    sampleRate: 100,
    silentMultipleInit: false,
    trackInteractions: false,
    /**
     * arbitrary value, byte precision not needed
     */
    requestErrorResponseLengthLimit: 32 * utils_1.ONE_KILO_BYTE,
    /**
     * flush automatically, aim to be lower than ALB connection timeout
     * to maximize connection reuse.
     */
    flushTimeout: 30 * utils_1.ONE_SECOND,
    /**
     * Logs intake limit
     */
    maxBatchSize: 50,
    maxMessageSize: 256 * utils_1.ONE_KILO_BYTE,
    /**
     * beacon payload max queue size implementation is 64kb
     * ensure that we leave room for logs, rum and potential other users
     */
    batchBytesLimit: 16 * utils_1.ONE_KILO_BYTE,
};
function buildConfiguration(userConfiguration, buildEnv) {
    var transportConfiguration = {
        applicationId: userConfiguration.applicationId,
        buildMode: buildEnv.buildMode,
        clientToken: userConfiguration.clientToken,
        env: userConfiguration.env,
        proxyHost: userConfiguration.proxyHost,
        sdkVersion: buildEnv.sdkVersion,
        service: userConfiguration.service,
        site: userConfiguration.site || init_1.INTAKE_SITE[userConfiguration.datacenter || buildEnv.datacenter],
        version: userConfiguration.version,
    };
    var enableExperimentalFeatures = Array.isArray(userConfiguration.enableExperimentalFeatures)
        ? userConfiguration.enableExperimentalFeatures
        : [];
    var configuration = tslib_1.__assign({ cookieOptions: buildCookieOptions(userConfiguration), isEnabled: function (feature) {
            return utils_1.includes(enableExperimentalFeatures, feature);
        }, logsEndpoint: getEndpoint('browser', transportConfiguration), proxyHost: userConfiguration.proxyHost, rumEndpoint: getEndpoint('rum', transportConfiguration), service: userConfiguration.service, traceEndpoint: getEndpoint('public-trace', transportConfiguration) }, exports.DEFAULT_CONFIGURATION);
    if (userConfiguration.internalMonitoringApiKey) {
        configuration.internalMonitoringEndpoint = getEndpoint('browser', transportConfiguration, 'browser-agent-internal-monitoring');
    }
    if ('allowedTracingOrigins' in userConfiguration) {
        configuration.allowedTracingOrigins = userConfiguration.allowedTracingOrigins;
    }
    if ('sampleRate' in userConfiguration) {
        configuration.sampleRate = userConfiguration.sampleRate;
    }
    if ('resourceSampleRate' in userConfiguration) {
        configuration.resourceSampleRate = userConfiguration.resourceSampleRate;
    }
    if ('trackInteractions' in userConfiguration) {
        configuration.trackInteractions = !!userConfiguration.trackInteractions;
    }
    if (transportConfiguration.buildMode === init_1.BuildMode.E2E_TEST) {
        configuration.internalMonitoringEndpoint = '<<< E2E INTERNAL MONITORING ENDPOINT >>>';
        configuration.logsEndpoint = '<<< E2E LOGS ENDPOINT >>>';
        configuration.rumEndpoint = '<<< E2E RUM ENDPOINT >>>';
    }
    if (transportConfiguration.buildMode === init_1.BuildMode.STAGING) {
        if (userConfiguration.replica !== undefined) {
            var replicaTransportConfiguration = tslib_1.__assign(tslib_1.__assign({}, transportConfiguration), { applicationId: userConfiguration.replica.applicationId, clientToken: userConfiguration.replica.clientToken, site: init_1.INTAKE_SITE[init_1.Datacenter.US] });
            configuration.replica = {
                applicationId: userConfiguration.replica.applicationId,
                internalMonitoringEndpoint: getEndpoint('browser', replicaTransportConfiguration, 'browser-agent-internal-monitoring'),
                logsEndpoint: getEndpoint('browser', replicaTransportConfiguration),
                rumEndpoint: getEndpoint('rum', replicaTransportConfiguration),
            };
        }
    }
    return configuration;
}
exports.buildConfiguration = buildConfiguration;
function buildCookieOptions(userConfiguration) {
    var cookieOptions = {};
    cookieOptions.secure = mustUseSecureCookie(userConfiguration);
    cookieOptions.crossSite = !!userConfiguration.useCrossSiteSessionCookie;
    if (!!userConfiguration.trackSessionAcrossSubdomains) {
        cookieOptions.domain = cookie_1.getCurrentSite();
    }
    return cookieOptions;
}
exports.buildCookieOptions = buildCookieOptions;
function getEndpoint(type, conf, source) {
    var tags = "sdk_version:" + conf.sdkVersion +
        ("" + (conf.env ? ",env:" + conf.env : '')) +
        ("" + (conf.service ? ",service:" + conf.service : '')) +
        ("" + (conf.version ? ",version:" + conf.version : ''));
    var datadogHost = type + "-http-intake.logs." + conf.site;
    var host = conf.proxyHost ? conf.proxyHost : datadogHost;
    var proxyParameter = conf.proxyHost ? "ddhost=" + datadogHost + "&" : '';
    var applicationIdParameter = conf.applicationId ? "_dd.application_id=" + conf.applicationId + "&" : '';
    var parameters = "" + applicationIdParameter + proxyParameter + "ddsource=" + (source || 'browser') + "&ddtags=" + tags;
    return "https://" + host + "/v1/input/" + conf.clientToken + "?" + parameters;
}
function isIntakeRequest(url, configuration) {
    return (urlPolyfill_1.getPathName(url).indexOf('/v1/input/') !== -1 &&
        (urlPolyfill_1.haveSameOrigin(url, configuration.logsEndpoint) ||
            urlPolyfill_1.haveSameOrigin(url, configuration.rumEndpoint) ||
            urlPolyfill_1.haveSameOrigin(url, configuration.traceEndpoint) ||
            (!!configuration.internalMonitoringEndpoint && urlPolyfill_1.haveSameOrigin(url, configuration.internalMonitoringEndpoint)) ||
            (!!configuration.replica &&
                (urlPolyfill_1.haveSameOrigin(url, configuration.replica.logsEndpoint) ||
                    urlPolyfill_1.haveSameOrigin(url, configuration.replica.rumEndpoint) ||
                    urlPolyfill_1.haveSameOrigin(url, configuration.replica.internalMonitoringEndpoint)))));
}
exports.isIntakeRequest = isIntakeRequest;
function mustUseSecureCookie(userConfiguration) {
    return !!userConfiguration.useSecureSessionCookie || !!userConfiguration.useCrossSiteSessionCookie;
}
//# sourceMappingURL=configuration.js.map
},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1","../boot/init":"a64034b0e647d8ea8b683cc52eb89f8d","../browser/cookie":"ebaf883ffc0dcd01cd439a4ca56c6088","../tools/urlPolyfill":"30a74b82219bd3790087d6a539e0dec1","../tools/utils":"a4c0c5c567ad3af2f7aa1ae7108bd730"}],"a64034b0e647d8ea8b683cc52eb89f8d":[function(require,module,exports) {
"use strict";

var _a;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = require("tslib");

var cookie_1 = require("../browser/cookie");

var configuration_1 = require("../domain/configuration");

var internalMonitoring_1 = require("../domain/internalMonitoring");

function makeGlobal(stub) {
  var global = tslib_1.__assign(tslib_1.__assign({}, stub), {
    // This API method is intentionally not monitored, since the only thing executed is the
    // user-provided 'callback'.  All SDK usages executed in the callback should be monitored, and
    // we don't want to interfer with the user uncaught exceptions.
    onReady: function (callback) {
      callback();
    }
  }); // Add an "hidden" property to set debug mode. We define it that way to hide it
  // as much as possible but of course it's not a real protection.


  Object.defineProperty(global, '_setDebug', {
    get: function () {
      return internalMonitoring_1.setDebugMode;
    },
    enumerable: false
  });
  return global;
}

exports.makeGlobal = makeGlobal;

function defineGlobal(global, name, api) {
  var existingGlobalVariable = global[name];
  global[name] = api;

  if (existingGlobalVariable && existingGlobalVariable.q) {
    existingGlobalVariable.q.forEach(function (fn) {
      return fn();
    });
  }
}

exports.defineGlobal = defineGlobal;
var Datacenter;

(function (Datacenter) {
  Datacenter["US"] = "us";
  Datacenter["EU"] = "eu";
})(Datacenter = exports.Datacenter || (exports.Datacenter = {}));

exports.INTAKE_SITE = (_a = {}, _a[Datacenter.EU] = 'datadoghq.eu', _a[Datacenter.US] = 'datadoghq.com', _a);
var BuildMode;

(function (BuildMode) {
  BuildMode["RELEASE"] = "release";
  BuildMode["STAGING"] = "staging";
  BuildMode["E2E_TEST"] = "e2e-test";
})(BuildMode = exports.BuildMode || (exports.BuildMode = {}));

function commonInit(userConfiguration, buildEnv) {
  var configuration = configuration_1.buildConfiguration(userConfiguration, buildEnv);
  var internalMonitoring = internalMonitoring_1.startInternalMonitoring(configuration);
  return {
    configuration: configuration,
    internalMonitoring: internalMonitoring
  };
}

exports.commonInit = commonInit;

function checkCookiesAuthorized(options) {
  if (!cookie_1.areCookiesAuthorized(options)) {
    console.warn('Cookies are not authorized, we will not send any data.');
    return false;
  }

  return true;
}

exports.checkCookiesAuthorized = checkCookiesAuthorized;

function checkIsNotLocalFile() {
  if (isLocalFile()) {
    console.error('Execution is not allowed in the current context.');
    return false;
  }

  return true;
}

exports.checkIsNotLocalFile = checkIsNotLocalFile;

function isLocalFile() {
  return window.location.protocol === 'file:';
} //# sourceMappingURL=init.js.map
},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1","../browser/cookie":"ebaf883ffc0dcd01cd439a4ca56c6088","../domain/configuration":"6763541ca333269e57118bc4c50800cf","../domain/internalMonitoring":"6d081b3adf74fb2ed9632aae8731586a"}],"ebaf883ffc0dcd01cd439a4ca56c6088":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../tools/utils");
exports.COOKIE_ACCESS_DELAY = utils_1.ONE_SECOND;
function cacheCookieAccess(name, options) {
    var timeout;
    var cache;
    var hasCache = false;
    var cacheAccess = function () {
        hasCache = true;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            hasCache = false;
        }, exports.COOKIE_ACCESS_DELAY);
    };
    return {
        get: function () {
            if (hasCache) {
                return cache;
            }
            cache = getCookie(name);
            cacheAccess();
            return cache;
        },
        set: function (value, expireDelay) {
            setCookie(name, value, expireDelay, options);
            cache = value;
            cacheAccess();
        },
    };
}
exports.cacheCookieAccess = cacheCookieAccess;
function setCookie(name, value, expireDelay, options) {
    var date = new Date();
    date.setTime(date.getTime() + expireDelay);
    var expires = "expires=" + date.toUTCString();
    var sameSite = options && options.crossSite ? 'none' : 'strict';
    var domain = options && options.domain ? ";domain=" + options.domain : '';
    var secure = options && options.secure ? ";secure" : '';
    document.cookie = name + "=" + value + ";" + expires + ";path=/;samesite=" + sameSite + domain + secure;
}
exports.setCookie = setCookie;
function getCookie(name) {
    return utils_1.findCommaSeparatedValue(document.cookie, name);
}
exports.getCookie = getCookie;
function areCookiesAuthorized(options) {
    if (document.cookie === undefined || document.cookie === null) {
        return false;
    }
    try {
        // Use a unique cookie name to avoid issues when the SDK is initialized multiple times during
        // the test cookie lifetime
        var testCookieName = "dd_cookie_test_" + utils_1.generateUUID();
        var testCookieValue = 'test';
        setCookie(testCookieName, testCookieValue, utils_1.ONE_SECOND, options);
        return getCookie(testCookieName) === testCookieValue;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
exports.areCookiesAuthorized = areCookiesAuthorized;
/**
 * No API to retrieve it, number of levels for subdomain and suffix are unknown
 * strategy: find the minimal domain on which cookies are allowed to be set
 * https://web.dev/same-site-same-origin/#site
 */
var getCurrentSiteCache;
function getCurrentSite() {
    if (getCurrentSiteCache === undefined) {
        // Use a unique cookie name to avoid issues when the SDK is initialized multiple times during
        // the test cookie lifetime
        var testCookieName = "dd_site_test_" + utils_1.generateUUID();
        var testCookieValue = 'test';
        var domainLevels = window.location.hostname.split('.');
        var candidateDomain = domainLevels.pop();
        while (domainLevels.length && !getCookie(testCookieName)) {
            candidateDomain = domainLevels.pop() + "." + candidateDomain;
            setCookie(testCookieName, testCookieValue, utils_1.ONE_SECOND, { domain: candidateDomain });
        }
        getCurrentSiteCache = candidateDomain;
    }
    return getCurrentSiteCache;
}
exports.getCurrentSite = getCurrentSite;
//# sourceMappingURL=cookie.js.map
},{"../tools/utils":"a4c0c5c567ad3af2f7aa1ae7108bd730"}],"a4c0c5c567ad3af2f7aa1ae7108bd730":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMonitoring_1 = require("../domain/internalMonitoring");
exports.ONE_SECOND = 1000;
exports.ONE_MINUTE = 60 * exports.ONE_SECOND;
exports.ONE_HOUR = 60 * exports.ONE_MINUTE;
exports.ONE_KILO_BYTE = 1024;
var DOM_EVENT;
(function (DOM_EVENT) {
    DOM_EVENT["BEFORE_UNLOAD"] = "beforeunload";
    DOM_EVENT["CLICK"] = "click";
    DOM_EVENT["KEY_DOWN"] = "keydown";
    DOM_EVENT["LOAD"] = "load";
    DOM_EVENT["POP_STATE"] = "popstate";
    DOM_EVENT["SCROLL"] = "scroll";
    DOM_EVENT["TOUCH_START"] = "touchstart";
    DOM_EVENT["VISIBILITY_CHANGE"] = "visibilitychange";
    DOM_EVENT["DOM_CONTENT_LOADED"] = "DOMContentLoaded";
    DOM_EVENT["POINTER_DOWN"] = "pointerdown";
    DOM_EVENT["POINTER_UP"] = "pointerup";
    DOM_EVENT["POINTER_CANCEL"] = "pointercancel";
    DOM_EVENT["HASH_CHANGE"] = "hashchange";
    DOM_EVENT["PAGE_HIDE"] = "pagehide";
    DOM_EVENT["MOUSE_DOWN"] = "mousedown";
})(DOM_EVENT = exports.DOM_EVENT || (exports.DOM_EVENT = {}));
var ResourceType;
(function (ResourceType) {
    ResourceType["DOCUMENT"] = "document";
    ResourceType["XHR"] = "xhr";
    ResourceType["BEACON"] = "beacon";
    ResourceType["FETCH"] = "fetch";
    ResourceType["CSS"] = "css";
    ResourceType["JS"] = "js";
    ResourceType["IMAGE"] = "image";
    ResourceType["FONT"] = "font";
    ResourceType["MEDIA"] = "media";
    ResourceType["OTHER"] = "other";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
var RequestType;
(function (RequestType) {
    RequestType["FETCH"] = "fetch";
    RequestType["XHR"] = "xhr";
})(RequestType = exports.RequestType || (exports.RequestType = {}));
// use lodash API
function throttle(fn, wait, options) {
    var needLeadingExecution = options && options.leading !== undefined ? options.leading : true;
    var needTrailingExecution = options && options.trailing !== undefined ? options.trailing : true;
    var inWaitPeriod = false;
    var hasPendingExecution = false;
    var pendingTimeoutId;
    return {
        throttled: function () {
            var _this = this;
            if (inWaitPeriod) {
                hasPendingExecution = true;
                return;
            }
            if (needLeadingExecution) {
                fn.apply(this);
            }
            else {
                hasPendingExecution = true;
            }
            inWaitPeriod = true;
            pendingTimeoutId = window.setTimeout(function () {
                if (needTrailingExecution && hasPendingExecution) {
                    fn.apply(_this);
                }
                inWaitPeriod = false;
                hasPendingExecution = false;
            }, wait);
        },
        cancel: function () {
            window.clearTimeout(pendingTimeoutId);
            inWaitPeriod = false;
            hasPendingExecution = false;
        },
    };
}
exports.throttle = throttle;
function assign(target) {
    var toAssign = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        toAssign[_i - 1] = arguments[_i];
    }
    toAssign.forEach(function (source) {
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    });
}
exports.assign = assign;
/**
 * UUID v4
 * from https://gist.github.com/jed/982883
 */
function generateUUID(placeholder) {
    return placeholder
        ? // tslint:disable-next-line no-bitwise
            (parseInt(placeholder, 10) ^ ((Math.random() * 16) >> (parseInt(placeholder, 10) / 4))).toString(16)
        : (1e7 + "-" + 1e3 + "-" + 4e3 + "-" + 8e3 + "-" + 1e11).replace(/[018]/g, generateUUID);
}
exports.generateUUID = generateUUID;
/**
 * Return true if the draw is successful
 * @param threshold between 0 and 100
 */
function performDraw(threshold) {
    return threshold !== 0 && Math.random() * 100 <= threshold;
}
exports.performDraw = performDraw;
function round(num, decimals) {
    return +num.toFixed(decimals);
}
exports.round = round;
function msToNs(duration) {
    if (typeof duration !== 'number') {
        return duration;
    }
    return round(duration * 1e6, 0);
}
exports.msToNs = msToNs;
// tslint:disable-next-line:no-empty
function noop() { }
exports.noop = noop;
/**
 * Custom implementation of JSON.stringify that ignores value.toJSON.
 * We need to do that because some sites badly override toJSON on certain objects.
 * Note this still supposes that JSON.stringify is correct...
 */
function jsonStringify(value, replacer, space) {
    if (value === null || value === undefined) {
        return JSON.stringify(value);
    }
    var originalToJSON = [false, undefined];
    if (hasToJSON(value)) {
        // We need to add a flag and not rely on the truthiness of value.toJSON
        // because it can be set but undefined and that's actually significant.
        originalToJSON = [true, value.toJSON];
        delete value.toJSON;
    }
    var originalProtoToJSON = [false, undefined];
    var prototype;
    if (typeof value === 'object') {
        prototype = Object.getPrototypeOf(value);
        if (hasToJSON(prototype)) {
            originalProtoToJSON = [true, prototype.toJSON];
            delete prototype.toJSON;
        }
    }
    var result;
    try {
        result = JSON.stringify(value, undefined, space);
    }
    catch (_a) {
        result = '<error: unable to serialize object>';
    }
    finally {
        if (originalToJSON[0]) {
            ;
            value.toJSON = originalToJSON[1];
        }
        if (originalProtoToJSON[0]) {
            ;
            prototype.toJSON = originalProtoToJSON[1];
        }
    }
    return result;
}
exports.jsonStringify = jsonStringify;
function hasToJSON(value) {
    return typeof value === 'object' && value !== null && value.hasOwnProperty('toJSON');
}
function includes(candidate, search) {
    // tslint:disable-next-line: no-unsafe-any
    return candidate.indexOf(search) !== -1;
}
exports.includes = includes;
function find(array, predicate) {
    for (var i = 0; i < array.length; i += 1) {
        var item = array[i];
        if (predicate(item, i, array)) {
            return item;
        }
    }
    return undefined;
}
exports.find = find;
function isPercentage(value) {
    return isNumber(value) && value >= 0 && value <= 100;
}
exports.isPercentage = isPercentage;
function isNumber(value) {
    return typeof value === 'number';
}
exports.isNumber = isNumber;
/**
 * Get the time since the navigation was started.
 *
 * Note: this does not use `performance.timeOrigin` because it doesn't seem to reflect the actual
 * time on which the navigation has started: it may be much farther in the past, at least in Firefox 71.
 * Related issue in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1429926
 */
function getRelativeTime(timestamp) {
    return timestamp - getNavigationStart();
}
exports.getRelativeTime = getRelativeTime;
function getTimestamp(relativeTime) {
    return Math.floor(getNavigationStart() + relativeTime);
}
exports.getTimestamp = getTimestamp;
/**
 * Navigation start slightly change on some rare cases
 */
var navigationStart;
function getNavigationStart() {
    if (navigationStart === undefined) {
        navigationStart = performance.timing.navigationStart;
    }
    return navigationStart;
}
exports.getNavigationStart = getNavigationStart;
function objectValues(object) {
    var values = [];
    Object.keys(object).forEach(function (key) {
        values.push(object[key]);
    });
    return values;
}
exports.objectValues = objectValues;
function objectEntries(object) {
    return Object.keys(object).map(function (key) { return [key, object[key]]; });
}
exports.objectEntries = objectEntries;
function isEmptyObject(object) {
    return Object.keys(object).length === 0;
}
exports.isEmptyObject = isEmptyObject;
/**
 * inspired by https://mathiasbynens.be/notes/globalthis
 */
function getGlobalObject() {
    if (typeof globalThis === 'object') {
        return globalThis;
    }
    Object.defineProperty(Object.prototype, '_dd_temp_', {
        get: function () {
            return this;
        },
        configurable: true,
    });
    // @ts-ignore
    var globalObject = _dd_temp_;
    // @ts-ignore
    delete Object.prototype._dd_temp_;
    if (typeof globalObject !== 'object') {
        // on safari _dd_temp_ is available on window but not globally
        // fallback on other browser globals check
        if (typeof self === 'object') {
            globalObject = self;
        }
        else if (typeof window === 'object') {
            globalObject = window;
        }
        else {
            globalObject = {};
        }
    }
    return globalObject;
}
exports.getGlobalObject = getGlobalObject;
function getLocationOrigin() {
    return getLinkElementOrigin(window.location);
}
exports.getLocationOrigin = getLocationOrigin;
/**
 * IE fallback
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/origin
 */
function getLinkElementOrigin(element) {
    if (element.origin) {
        return element.origin;
    }
    var sanitizedHost = element.host.replace(/(:80|:443)$/, '');
    return element.protocol + "//" + sanitizedHost;
}
exports.getLinkElementOrigin = getLinkElementOrigin;
function findCommaSeparatedValue(rawString, name) {
    var matches = rawString.match("(?:^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
    return matches ? matches[1] : undefined;
}
exports.findCommaSeparatedValue = findCommaSeparatedValue;
function safeTruncate(candidate, length) {
    var lastChar = candidate.charCodeAt(length - 1);
    // check if it is the high part of a surrogate pair
    if (lastChar >= 0xd800 && lastChar <= 0xdbff) {
        return candidate.slice(0, length + 1);
    }
    return candidate.slice(0, length);
}
exports.safeTruncate = safeTruncate;
/**
 * Add an event listener to an event emitter object (Window, Element, mock object...).  This provides
 * a few conveniences compared to using `element.addEventListener` directly:
 *
 * * supports IE11 by:
 *   * using an option object only if needed
 *   * emulating the `once` option
 *
 * * wraps the listener with a `monitor` function
 *
 * * returns a `stop` function to remove the listener
 */
function addEventListener(emitter, event, listener, options) {
    return addEventListeners(emitter, [event], listener, options);
}
exports.addEventListener = addEventListener;
/**
 * Add event listeners to an event emitter object (Window, Element, mock object...).  This provides
 * a few conveniences compared to using `element.addEventListener` directly:
 *
 * * supports IE11 by:
 *   * using an option object only if needed
 *   * emulating the `once` option
 *
 * * wraps the listener with a `monitor` function
 *
 * * returns a `stop` function to remove the listener
 *
 * * with `once: true`, the listener will be called at most once, even if different events are
 *   listened
 */
function addEventListeners(emitter, events, listener, _a) {
    var _b = _a === void 0 ? {} : _a, once = _b.once, capture = _b.capture, passive = _b.passive;
    var wrapedListener = internalMonitoring_1.monitor(once
        ? function (event) {
            stop();
            listener(event);
        }
        : listener);
    var options = passive ? { capture: capture, passive: passive } : capture;
    events.forEach(function (event) { return emitter.addEventListener(event, wrapedListener, options); });
    var stop = function () { return events.forEach(function (event) { return emitter.removeEventListener(event, wrapedListener, options); }); };
    return {
        stop: stop,
    };
}
exports.addEventListeners = addEventListeners;
//# sourceMappingURL=utils.js.map
},{"../domain/internalMonitoring":"6d081b3adf74fb2ed9632aae8731586a"}],"6d081b3adf74fb2ed9632aae8731586a":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// tslint:disable ban-types
var context_1 = require("../tools/context");
var error_1 = require("../tools/error");
var utils = tslib_1.__importStar(require("../tools/utils"));
var transport_1 = require("../transport/transport");
var tracekit_1 = require("./tracekit");
var StatusType;
(function (StatusType) {
    StatusType["info"] = "info";
    StatusType["error"] = "error";
})(StatusType || (StatusType = {}));
var monitoringConfiguration = { maxMessagesPerPage: 0, sentMessageCount: 0 };
var externalContextProvider;
function startInternalMonitoring(configuration) {
    if (configuration.internalMonitoringEndpoint) {
        var batch = startMonitoringBatch(configuration);
        utils.assign(monitoringConfiguration, {
            batch: batch,
            maxMessagesPerPage: configuration.maxInternalMonitoringMessagesPerPage,
            sentMessageCount: 0,
        });
    }
    return {
        setExternalContextProvider: function (provider) {
            externalContextProvider = provider;
        },
    };
}
exports.startInternalMonitoring = startInternalMonitoring;
function startMonitoringBatch(configuration) {
    var primaryBatch = createMonitoringBatch(configuration.internalMonitoringEndpoint);
    var replicaBatch;
    if (configuration.replica !== undefined) {
        replicaBatch = createMonitoringBatch(configuration.replica.internalMonitoringEndpoint);
    }
    function createMonitoringBatch(endpointUrl) {
        return new transport_1.Batch(new transport_1.HttpRequest(endpointUrl, configuration.batchBytesLimit), configuration.maxBatchSize, configuration.batchBytesLimit, configuration.maxMessageSize, configuration.flushTimeout);
    }
    function withContext(message) {
        return context_1.combine({
            date: new Date().getTime(),
            view: {
                referrer: document.referrer,
                url: window.location.href,
            },
        }, externalContextProvider !== undefined ? externalContextProvider() : {}, message);
    }
    return {
        add: function (message) {
            var contextualizedMessage = withContext(message);
            primaryBatch.add(contextualizedMessage);
            if (replicaBatch) {
                replicaBatch.add(contextualizedMessage);
            }
        },
    };
}
function resetInternalMonitoring() {
    monitoringConfiguration.batch = undefined;
}
exports.resetInternalMonitoring = resetInternalMonitoring;
function monitored(_, __, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var decorated = (monitoringConfiguration.batch ? monitor(originalMethod) : originalMethod);
        return decorated.apply(this, arguments);
    };
}
exports.monitored = monitored;
function monitor(fn) {
    return function () {
        try {
            return fn.apply(this, arguments);
        }
        catch (e) {
            logErrorIfDebug(e);
            try {
                addErrorToMonitoringBatch(e);
            }
            catch (e) {
                logErrorIfDebug(e);
            }
        }
    }; // consider output type has input type
}
exports.monitor = monitor;
function addMonitoringMessage(message, context) {
    logMessageIfDebug(message);
    addToMonitoringBatch(tslib_1.__assign(tslib_1.__assign({ message: message }, context), { status: StatusType.info }));
}
exports.addMonitoringMessage = addMonitoringMessage;
function addErrorToMonitoringBatch(e) {
    addToMonitoringBatch(tslib_1.__assign(tslib_1.__assign({}, formatError(e)), { status: StatusType.error }));
}
function addToMonitoringBatch(message) {
    if (monitoringConfiguration.batch &&
        monitoringConfiguration.sentMessageCount < monitoringConfiguration.maxMessagesPerPage) {
        monitoringConfiguration.sentMessageCount += 1;
        monitoringConfiguration.batch.add(message);
    }
}
function formatError(e) {
    if (e instanceof Error) {
        var stackTrace = tracekit_1.computeStackTrace(e);
        return {
            error: {
                kind: stackTrace.name,
                stack: error_1.toStackTraceString(stackTrace),
            },
            message: stackTrace.message,
        };
    }
    return {
        error: {
            stack: 'Not an instance of error',
        },
        message: "Uncaught " + utils.jsonStringify(e),
    };
}
function setDebugMode(debugMode) {
    monitoringConfiguration.debugMode = debugMode;
}
exports.setDebugMode = setDebugMode;
function logErrorIfDebug(e) {
    if (monitoringConfiguration.debugMode) {
        // Log as warn to not forward the logs.
        console.warn('[INTERNAL ERROR]', e);
    }
}
function logMessageIfDebug(message) {
    if (monitoringConfiguration.debugMode) {
        console.log('[MONITORING MESSAGE]', message);
    }
}
//# sourceMappingURL=internalMonitoring.js.map
},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1","../tools/context":"0a95ec8b7489425ff8c95bc9182230cf","../tools/error":"0dddf352a2255acaa5426f9ee2e94d13","../tools/utils":"a4c0c5c567ad3af2f7aa1ae7108bd730","../transport/transport":"7e0163e11a7ed0141607e7e5d6bf43a0","./tracekit":"35ac35b5e9178c44050ae5baee46483f"}],"0a95ec8b7489425ff8c95bc9182230cf":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function withSnakeCaseKeys(candidate) {
    var result = {};
    Object.keys(candidate).forEach(function (key) {
        result[toSnakeCase(key)] = deepSnakeCase(candidate[key]);
    });
    return result;
}
exports.withSnakeCaseKeys = withSnakeCaseKeys;
function deepSnakeCase(candidate) {
    if (Array.isArray(candidate)) {
        return candidate.map(function (value) { return deepSnakeCase(value); });
    }
    if (typeof candidate === 'object' && candidate !== null) {
        return withSnakeCaseKeys(candidate);
    }
    return candidate;
}
exports.deepSnakeCase = deepSnakeCase;
function toSnakeCase(word) {
    return word
        .replace(/[A-Z]/g, function (uppercaseLetter, index) { return "" + (index !== 0 ? '_' : '') + uppercaseLetter.toLowerCase(); })
        .replace(/-/g, '_');
}
exports.toSnakeCase = toSnakeCase;
var isContextArray = function (value) { return Array.isArray(value); };
var isContext = function (value) {
    return !Array.isArray(value) && typeof value === 'object' && value !== null;
};
function combine() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var destination;
    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
        var source = sources_1[_a];
        // Ignore any undefined or null sources.
        if (source === undefined || source === null) {
            continue;
        }
        destination = mergeInto(destination, source, createCircularReferenceChecker());
    }
    return destination;
}
exports.combine = combine;
/*
 * Performs a deep clone of objects and arrays.
 * - Circular references are replaced by 'undefined'
 */
function deepClone(context) {
    return mergeInto(undefined, context, createCircularReferenceChecker());
}
exports.deepClone = deepClone;
function createCircularReferenceChecker() {
    if (typeof WeakSet !== 'undefined') {
        var set_1 = new WeakSet();
        return {
            hasAlreadyBeenSeen: function (value) {
                var has = set_1.has(value);
                if (!has) {
                    set_1.add(value);
                }
                return has;
            },
        };
    }
    var array = [];
    return {
        hasAlreadyBeenSeen: function (value) {
            var has = array.indexOf(value) >= 0;
            if (!has) {
                array.push(value);
            }
            return has;
        },
    };
}
exports.createCircularReferenceChecker = createCircularReferenceChecker;
/**
 * Iterate over 'source' and affect its subvalues into 'destination', recursively.  If the 'source'
 * and 'destination' can't be merged, return 'source'.
 */
function mergeInto(destination, source, circularReferenceChecker) {
    // Ignore the 'source' if it is undefined
    if (source === undefined) {
        return destination;
    }
    // If the 'source' is not an object or array, it can't be merged with 'destination' in any way, so
    // return it directly.
    if (!isContext(source) && !isContextArray(source)) {
        return source;
    }
    // Return 'undefined' if we already iterated over this 'source' to avoid infinite recursion
    if (circularReferenceChecker.hasAlreadyBeenSeen(source)) {
        return undefined;
    }
    // 'source' and 'destination' are objects, merge them together
    if (isContext(source) && (destination === undefined || isContext(destination))) {
        var finalDestination = destination || {};
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                finalDestination[key] = mergeInto(finalDestination[key], source[key], circularReferenceChecker);
            }
        }
        return finalDestination;
    }
    // 'source' and 'destination' are arrays, merge them together
    if (isContextArray(source) && (destination === undefined || isContextArray(destination))) {
        var finalDestination = destination || [];
        finalDestination.length = Math.max(finalDestination.length, source.length);
        for (var index = 0; index < source.length; index += 1) {
            finalDestination[index] = mergeInto(finalDestination[index], source[index], circularReferenceChecker);
        }
        return finalDestination;
    }
    // The destination in not an array nor an object, so we can't merge it
    return source;
}
exports.mergeInto = mergeInto;
//# sourceMappingURL=context.js.map
},{}],"0dddf352a2255acaa5426f9ee2e94d13":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var ErrorSource;
(function (ErrorSource) {
    ErrorSource["AGENT"] = "agent";
    ErrorSource["CONSOLE"] = "console";
    ErrorSource["NETWORK"] = "network";
    ErrorSource["SOURCE"] = "source";
    ErrorSource["LOGGER"] = "logger";
    ErrorSource["CUSTOM"] = "custom";
})(ErrorSource = exports.ErrorSource || (exports.ErrorSource = {}));
function formatUnknownError(stackTrace, errorObject, nonErrorPrefix) {
    if (!stackTrace || (stackTrace.message === undefined && !(errorObject instanceof Error))) {
        return {
            message: nonErrorPrefix + " " + utils_1.jsonStringify(errorObject),
            stack: 'No stack, consider using an instance of Error',
            type: stackTrace && stackTrace.name,
        };
    }
    return {
        message: stackTrace.message || 'Empty message',
        stack: toStackTraceString(stackTrace),
        type: stackTrace.name,
    };
}
exports.formatUnknownError = formatUnknownError;
function toStackTraceString(stack) {
    var result = (stack.name || 'Error') + ": " + stack.message;
    stack.stack.forEach(function (frame) {
        var func = frame.func === '?' ? '<anonymous>' : frame.func;
        var args = frame.args && frame.args.length > 0 ? "(" + frame.args.join(', ') + ")" : '';
        var line = frame.line ? ":" + frame.line : '';
        var column = frame.line && frame.column ? ":" + frame.column : '';
        result += "\n  at " + func + args + " @ " + frame.url + line + column;
    });
    return result;
}
exports.toStackTraceString = toStackTraceString;
//# sourceMappingURL=error.js.map
},{"./utils":"a4c0c5c567ad3af2f7aa1ae7108bd730"}],"7e0163e11a7ed0141607e7e5d6bf43a0":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../tools/utils");
// https://en.wikipedia.org/wiki/UTF-8
var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/;
/**
 * Use POST request without content type to:
 * - avoid CORS preflight requests
 * - allow usage of sendBeacon
 *
 * multiple elements are sent separated by \n in order
 * to be parsed correctly without content type header
 */
var HttpRequest = /** @class */ (function () {
    function HttpRequest(endpointUrl, bytesLimit, withBatchTime) {
        if (withBatchTime === void 0) { withBatchTime = false; }
        this.endpointUrl = endpointUrl;
        this.bytesLimit = bytesLimit;
        this.withBatchTime = withBatchTime;
    }
    HttpRequest.prototype.send = function (data, size) {
        var url = this.withBatchTime ? addBatchTime(this.endpointUrl) : this.endpointUrl;
        if (navigator.sendBeacon && size < this.bytesLimit) {
            var isQueued = navigator.sendBeacon(url, data);
            if (isQueued) {
                return;
            }
        }
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.send(data);
    };
    return HttpRequest;
}());
exports.HttpRequest = HttpRequest;
function addBatchTime(url) {
    return "" + url + (url.indexOf('?') === -1 ? '?' : '&') + "batch_time=" + new Date().getTime();
}
var Batch = /** @class */ (function () {
    function Batch(request, maxSize, bytesLimit, maxMessageSize, flushTimeout, beforeUnloadCallback) {
        if (beforeUnloadCallback === void 0) { beforeUnloadCallback = utils_1.noop; }
        this.request = request;
        this.maxSize = maxSize;
        this.bytesLimit = bytesLimit;
        this.maxMessageSize = maxMessageSize;
        this.flushTimeout = flushTimeout;
        this.beforeUnloadCallback = beforeUnloadCallback;
        this.pushOnlyBuffer = [];
        this.upsertBuffer = {};
        this.bufferBytesSize = 0;
        this.bufferMessageCount = 0;
        this.flushOnVisibilityHidden();
        this.flushPeriodically();
    }
    Batch.prototype.add = function (message) {
        this.addOrUpdate(message);
    };
    Batch.prototype.upsert = function (message, key) {
        this.addOrUpdate(message, key);
    };
    Batch.prototype.flush = function () {
        if (this.bufferMessageCount !== 0) {
            var messages = tslib_1.__spreadArrays(this.pushOnlyBuffer, utils_1.objectValues(this.upsertBuffer));
            this.request.send(messages.join('\n'), this.bufferBytesSize);
            this.pushOnlyBuffer = [];
            this.upsertBuffer = {};
            this.bufferBytesSize = 0;
            this.bufferMessageCount = 0;
        }
    };
    Batch.prototype.sizeInBytes = function (candidate) {
        // Accurate byte size computations can degrade performances when there is a lot of events to process
        if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) {
            return candidate.length;
        }
        if (window.TextEncoder !== undefined) {
            return new TextEncoder().encode(candidate).length;
        }
        return new Blob([candidate]).size;
    };
    Batch.prototype.addOrUpdate = function (message, key) {
        var _a = this.process(message), processedMessage = _a.processedMessage, messageBytesSize = _a.messageBytesSize;
        if (messageBytesSize >= this.maxMessageSize) {
            console.warn("Discarded a message whose size was bigger than the maximum allowed size " + this.maxMessageSize + "KB.");
            return;
        }
        if (this.hasMessageFor(key)) {
            this.remove(key);
        }
        if (this.willReachedBytesLimitWith(messageBytesSize)) {
            this.flush();
        }
        this.push(processedMessage, messageBytesSize, key);
        if (this.isFull()) {
            this.flush();
        }
    };
    Batch.prototype.process = function (message) {
        var processedMessage = utils_1.jsonStringify(message);
        var messageBytesSize = this.sizeInBytes(processedMessage);
        return { processedMessage: processedMessage, messageBytesSize: messageBytesSize };
    };
    Batch.prototype.push = function (processedMessage, messageBytesSize, key) {
        if (this.bufferMessageCount > 0) {
            // \n separator at serialization
            this.bufferBytesSize += 1;
        }
        if (key !== undefined) {
            this.upsertBuffer[key] = processedMessage;
        }
        else {
            this.pushOnlyBuffer.push(processedMessage);
        }
        this.bufferBytesSize += messageBytesSize;
        this.bufferMessageCount += 1;
    };
    Batch.prototype.remove = function (key) {
        var removedMessage = this.upsertBuffer[key];
        delete this.upsertBuffer[key];
        var messageBytesSize = this.sizeInBytes(removedMessage);
        this.bufferBytesSize -= messageBytesSize;
        this.bufferMessageCount -= 1;
        if (this.bufferMessageCount > 0) {
            this.bufferBytesSize -= 1;
        }
    };
    Batch.prototype.hasMessageFor = function (key) {
        return key !== undefined && this.upsertBuffer[key] !== undefined;
    };
    Batch.prototype.willReachedBytesLimitWith = function (messageBytesSize) {
        // byte of the separator at the end of the message
        return this.bufferBytesSize + messageBytesSize + 1 >= this.bytesLimit;
    };
    Batch.prototype.isFull = function () {
        return this.bufferMessageCount === this.maxSize || this.bufferBytesSize >= this.bytesLimit;
    };
    Batch.prototype.flushPeriodically = function () {
        var _this = this;
        setTimeout(function () {
            _this.flush();
            _this.flushPeriodically();
        }, this.flushTimeout);
    };
    Batch.prototype.flushOnVisibilityHidden = function () {
        var _this = this;
        /**
         * With sendBeacon, requests are guaranteed to be successfully sent during document unload
         */
        // @ts-ignore this function is not always defined
        if (navigator.sendBeacon) {
            /**
             * beforeunload is called before visibilitychange
             * register first to be sure to be called before flush on beforeunload
             * caveat: unload can still be canceled by another listener
             */
            utils_1.addEventListener(window, utils_1.DOM_EVENT.BEFORE_UNLOAD, this.beforeUnloadCallback);
            /**
             * Only event that guarantee to fire on mobile devices when the page transitions to background state
             * (e.g. when user switches to a different application, goes to homescreen, etc), or is being unloaded.
             */
            utils_1.addEventListener(document, utils_1.DOM_EVENT.VISIBILITY_CHANGE, function () {
                if (document.visibilityState === 'hidden') {
                    _this.flush();
                }
            });
            /**
             * Safari does not support yet to send a request during:
             * - a visibility change during doc unload (cf: https://bugs.webkit.org/show_bug.cgi?id=194897)
             * - a page hide transition (cf: https://bugs.webkit.org/show_bug.cgi?id=188329)
             */
            utils_1.addEventListener(window, utils_1.DOM_EVENT.BEFORE_UNLOAD, function () { return _this.flush(); });
        }
    };
    return Batch;
}());
exports.Batch = Batch;
//# sourceMappingURL=transport.js.map
},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1","../tools/utils":"a4c0c5c567ad3af2f7aa1ae7108bd730"}],"35ac35b5e9178c44050ae5baee46483f":[function(require,module,exports) {
"use strict";
// tslint:disable no-unsafe-any
Object.defineProperty(exports, "__esModule", { value: true });
var internalMonitoring_1 = require("./internalMonitoring");
var UNKNOWN_FUNCTION = '?';
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
// tslint:disable-next-line max-line-length
var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
/**
 * A better form of hasOwnProperty<br/>
 * Example: `has(MainHostObject, property) === true/false`
 *
 * @param {Object} object to check property
 * @param {string} key to check
 * @return {Boolean} true if the object has the key and it is not inherited
 */
function has(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
}
/**
 * Returns true if the parameter is undefined<br/>
 * Example: `isUndefined(val) === true/false`
 *
 * @param {*} what Value to check
 * @return {Boolean} true if undefined and false otherwise
 */
function isUndefined(what) {
    return typeof what === 'undefined';
}
/**
 * Wrap any function in a TraceKit reporter<br/>
 * Example: `func = wrap(func);`
 *
 * @param {Function} func Function to be wrapped
 * @return {Function} The wrapped func
 * @memberof TraceKit
 */
// tslint:disable-next-line ban-types
function wrap(func) {
    function wrapped() {
        try {
            return func.apply(this, arguments);
        }
        catch (e) {
            exports.report(e);
            throw e;
        }
    }
    return wrapped;
}
exports.wrap = wrap;
/**
 * Cross-browser processing of unhandled exceptions
 *
 * Syntax:
 * ```js
 *   report.subscribe(function(stackInfo) { ... })
 *   report.unsubscribe(function(stackInfo) { ... })
 *   report(exception)
 *   try { ...code... } catch(ex) { report(ex); }
 * ```
 *
 * Supports:
 *   - Firefox: full stack trace with line numbers, plus column number
 *     on top frame; column number is not guaranteed
 *   - Opera: full stack trace with line and column numbers
 *   - Chrome: full stack trace with line and column numbers
 *   - Safari: line and column number for the top frame only; some frames
 *     may be missing, and column number is not guaranteed
 *   - IE: line and column number for the top frame only; some frames
 *     may be missing, and column number is not guaranteed
 *
 * In theory, TraceKit should work on all of the following versions:
 *   - IE5.5+ (only 8.0 tested)
 *   - Firefox 0.9+ (only 3.5+ tested)
 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
 *     Exceptions Have Stacktrace to be enabled in opera:config)
 *   - Safari 3+ (only 4+ tested)
 *   - Chrome 1+ (only 5+ tested)
 *   - Konqueror 3.5+ (untested)
 *
 * Requires computeStackTrace.
 *
 * Tries to catch all unhandled exceptions and report them to the
 * subscribed handlers. Please note that report will rethrow the
 * exception. This is REQUIRED in order to get a useful stack trace in IE.
 * If the exception does not reach the top of the browser, you will only
 * get a stack trace from the point where report was called.
 *
 * Handlers receive a StackTrace object as described in the
 * computeStackTrace docs.
 *
 * @memberof TraceKit
 * @namespace
 */
exports.report = (function reportModuleWrapper() {
    var handlers = [];
    var lastException;
    var lastExceptionStack;
    /**
     * Add a crash handler.
     * @param {Function} handler
     * @memberof report
     */
    function subscribe(handler) {
        installGlobalHandler();
        installGlobalUnhandledRejectionHandler();
        handlers.push(handler);
    }
    /**
     * Remove a crash handler.
     * @param {Function} handler
     * @memberof report
     */
    function unsubscribe(handler) {
        for (var i = handlers.length - 1; i >= 0; i -= 1) {
            if (handlers[i] === handler) {
                handlers.splice(i, 1);
            }
        }
        if (handlers.length === 0) {
            uninstallGlobalHandler();
            uninstallGlobalUnhandledRejectionHandler();
        }
    }
    /**
     * Dispatch stack information to all handlers.
     * @param {StackTrace} stack
     * @param {boolean} isWindowError Is this a top-level window error?
     * @param {Error=} error The error that's being handled (if available, null otherwise)
     * @memberof report
     * @throws An exception if an error occurs while calling an handler.
     */
    function notifyHandlers(stack, isWindowError, error) {
        var exception;
        for (var i in handlers) {
            if (has(handlers, i)) {
                try {
                    handlers[i](stack, isWindowError, error);
                }
                catch (inner) {
                    exception = inner;
                }
            }
        }
        if (exception) {
            throw exception;
        }
    }
    var oldOnerrorHandler;
    var onErrorHandlerInstalled;
    var oldOnunhandledrejectionHandler;
    var onUnhandledRejectionHandlerInstalled;
    /**
     * Ensures all global unhandled exceptions are recorded.
     * Supported by Gecko and IE.
     * @param {Event|string} message Error message.
     * @param {string=} url URL of script that generated the exception.
     * @param {(number|string)=} lineNo The line number at which the error occurred.
     * @param {(number|string)=} columnNo The column number at which the error occurred.
     * @param {Error=} errorObj The actual Error object.
     * @memberof report
     */
    function traceKitWindowOnError(message, url, lineNo, columnNo, errorObj) {
        var stack;
        if (lastExceptionStack) {
            exports.computeStackTrace.augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, "" + message);
            processLastException();
        }
        else if (errorObj) {
            stack = exports.computeStackTrace(errorObj);
            notifyHandlers(stack, true, errorObj);
        }
        else {
            var location_1 = {
                url: url,
                column: columnNo,
                line: lineNo,
            };
            var name_1;
            var msg = message;
            if ({}.toString.call(message) === '[object String]') {
                var groups = msg.match(ERROR_TYPES_RE);
                if (groups) {
                    name_1 = groups[1];
                    msg = groups[2];
                }
            }
            stack = {
                name: name_1,
                message: msg,
                stack: [location_1],
            };
            notifyHandlers(stack, true);
        }
        if (oldOnerrorHandler) {
            return oldOnerrorHandler.apply(this, arguments);
        }
        return false;
    }
    /**
     * Ensures all unhandled rejections are recorded.
     * @param {PromiseRejectionEvent} e event.
     * @memberof report
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
     * @see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
     */
    function traceKitWindowOnUnhandledRejection(e) {
        var reason = e.reason || 'Empty reason';
        var stack = exports.computeStackTrace(reason);
        notifyHandlers(stack, true, reason);
    }
    /**
     * Install a global onerror handler
     * @memberof report
     */
    function installGlobalHandler() {
        if (onErrorHandlerInstalled) {
            return;
        }
        oldOnerrorHandler = window.onerror;
        window.onerror = internalMonitoring_1.monitor(traceKitWindowOnError);
        onErrorHandlerInstalled = true;
    }
    /**
     * Uninstall the global onerror handler
     * @memberof report
     */
    function uninstallGlobalHandler() {
        if (onErrorHandlerInstalled) {
            window.onerror = oldOnerrorHandler;
            onErrorHandlerInstalled = false;
        }
    }
    /**
     * Install a global onunhandledrejection handler
     * @memberof report
     */
    function installGlobalUnhandledRejectionHandler() {
        if (onUnhandledRejectionHandlerInstalled) {
            return;
        }
        oldOnunhandledrejectionHandler = window.onunhandledrejection !== null ? window.onunhandledrejection : undefined;
        window.onunhandledrejection = internalMonitoring_1.monitor(traceKitWindowOnUnhandledRejection);
        onUnhandledRejectionHandlerInstalled = true;
    }
    /**
     * Uninstall the global onunhandledrejection handler
     * @memberof report
     */
    function uninstallGlobalUnhandledRejectionHandler() {
        if (onUnhandledRejectionHandlerInstalled) {
            window.onunhandledrejection = oldOnunhandledrejectionHandler;
            onUnhandledRejectionHandlerInstalled = false;
        }
    }
    /**
     * Process the most recent exception
     * @memberof report
     */
    function processLastException() {
        var currentLastExceptionStack = lastExceptionStack;
        var currentLastException = lastException;
        lastExceptionStack = undefined;
        lastException = undefined;
        notifyHandlers(currentLastExceptionStack, false, currentLastException);
    }
    /**
     * Reports an unhandled Error.
     * @param {Error} ex
     * @memberof report
     * @throws An exception if an incomplete stack trace is detected (old IE browsers).
     */
    function doReport(ex) {
        if (lastExceptionStack) {
            if (lastException === ex) {
                return; // already caught by an inner catch block, ignore
            }
            processLastException();
        }
        var stack = exports.computeStackTrace(ex);
        lastExceptionStack = stack;
        lastException = ex;
        // If the stack trace is incomplete, wait for 2 seconds for
        // slow slow IE to see if onerror occurs or not before reporting
        // this exception; otherwise, we will end up with an incomplete
        // stack trace
        setTimeout(function () {
            if (lastException === ex) {
                processLastException();
            }
        }, stack.incomplete ? 2000 : 0);
        throw ex; // re-throw to propagate to the top level (and cause window.onerror)
    }
    doReport.subscribe = subscribe;
    doReport.unsubscribe = unsubscribe;
    doReport.traceKitWindowOnError = traceKitWindowOnError;
    return doReport;
})();
/**
 * computeStackTrace: cross-browser stack traces in JavaScript
 *
 * Syntax:
 *   ```js
 *   s = computeStackTrace.ofCaller([depth])
 *   s = computeStackTrace(exception) // consider using report instead (see below)
 *   ```
 *
 * Supports:
 *   - Firefox:  full stack trace with line numbers and unreliable column
 *               number on top frame
 *   - Opera 10: full stack trace with line and column numbers
 *   - Opera 9-: full stack trace with line numbers
 *   - Chrome:   full stack trace with line and column numbers
 *   - Safari:   line and column number for the topmost stacktrace element
 *               only
 *   - IE:       no line numbers whatsoever
 *
 * Tries to guess names of anonymous functions by looking for assignments
 * in the source code. In IE and Safari, we have to guess source file names
 * by searching for function bodies inside all page scripts. This will not
 * work for scripts that are loaded cross-domain.
 * Here be dragons: some function names may be guessed incorrectly, and
 * duplicate functions may be mismatched.
 *
 * computeStackTrace should only be used for tracing purposes.
 * Logging of unhandled exceptions should be done with report,
 * which builds on top of computeStackTrace and provides better
 * IE support by utilizing the window.onerror event to retrieve information
 * about the top of the stack.
 *
 * Note: In IE and Safari, no stack trace is recorded on the Error object,
 * so computeStackTrace instead walks its *own* chain of callers.
 * This means that:
 *  * in Safari, some methods may be missing from the stack trace;
 *  * in IE, the topmost function in the stack trace will always be the
 *    caller of computeStackTrace.
 *
 * This is okay for tracing (because you are likely to be calling
 * computeStackTrace from the function you want to be the topmost element
 * of the stack trace anyway), but not okay for logging unhandled
 * exceptions (because your catch block will likely be far away from the
 * inner function that actually caused the exception).
 *
 * Tracing example:
 *  ```js
 *     function trace(message) {
 *         let stackInfo = computeStackTrace.ofCaller();
 *         let data = message + "\n";
 *         for(let i in stackInfo.stack) {
 *             let item = stackInfo.stack[i];
 *             data += (item.func || '[anonymous]') + "() in " + item.url + ":" + (item.line || '0') + "\n";
 *         }
 *         if (window.console)
 *             console.info(data);
 *         else
 *             alert(data);
 *     }
 * ```
 * @memberof TraceKit
 * @namespace
 */
exports.computeStackTrace = (function computeStackTraceWrapper() {
    var debug = false;
    // Contents of Exception in various browsers.
    //
    // SAFARI:
    // ex.message = Can't find variable: qq
    // ex.line = 59
    // ex.sourceId = 580238192
    // ex.sourceURL = http://...
    // ex.expressionBeginOffset = 96
    // ex.expressionCaretOffset = 98
    // ex.expressionEndOffset = 98
    // ex.name = ReferenceError
    //
    // FIREFOX:
    // ex.message = qq is not defined
    // ex.fileName = http://...
    // ex.lineNumber = 59
    // ex.columnNumber = 69
    // ex.stack = ...stack trace... (see the example below)
    // ex.name = ReferenceError
    //
    // CHROME:
    // ex.message = qq is not defined
    // ex.name = ReferenceError
    // ex.type = not_defined
    // ex.arguments = ['aa']
    // ex.stack = ...stack trace...
    //
    // INTERNET EXPLORER:
    // ex.message = ...
    // ex.name = ReferenceError
    //
    // OPERA:
    // ex.message = ...message... (see the example below)
    // ex.name = ReferenceError
    // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
    // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'
    /**
     * Computes stack trace information from the stack property.
     * Chrome and Gecko use this property.
     * @param {Error} ex
     * @return {?StackTrace} Stack trace information.
     * @memberof computeStackTrace
     */
    function computeStackTraceFromStackProp(ex) {
        if (!ex.stack) {
            return;
        }
        // tslint:disable-next-line max-line-length
        var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
        // tslint:disable-next-line max-line-length
        var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
        // tslint:disable-next-line max-line-length
        var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
        // Used to additionally parse URL/line/column from eval frames
        var isEval;
        var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
        var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/;
        var lines = ex.stack.split('\n');
        var stack = [];
        var submatch;
        var parts;
        var element;
        for (var i = 0, j = lines.length; i < j; i += 1) {
            if (chrome.exec(lines[i])) {
                parts = chrome.exec(lines[i]);
                var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
                isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
                submatch = chromeEval.exec(parts[2]);
                if (isEval && submatch) {
                    // throw out eval line/column and use top-most line/column number
                    parts[2] = submatch[1]; // url
                    parts[3] = submatch[2]; // line
                    parts[4] = submatch[3]; // column
                }
                element = {
                    args: isNative ? [parts[2]] : [],
                    column: parts[4] ? +parts[4] : undefined,
                    func: parts[1] || UNKNOWN_FUNCTION,
                    line: parts[3] ? +parts[3] : undefined,
                    url: !isNative ? parts[2] : undefined,
                };
            }
            else if (winjs.exec(lines[i])) {
                parts = winjs.exec(lines[i]);
                element = {
                    args: [],
                    column: parts[4] ? +parts[4] : undefined,
                    func: parts[1] || UNKNOWN_FUNCTION,
                    line: +parts[3],
                    url: parts[2],
                };
            }
            else if (gecko.exec(lines[i])) {
                parts = gecko.exec(lines[i]);
                isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
                submatch = geckoEval.exec(parts[3]);
                if (isEval && submatch) {
                    // throw out eval line/column and use top-most line number
                    parts[3] = submatch[1];
                    parts[4] = submatch[2];
                    parts[5] = undefined; // no column when eval
                }
                else if (i === 0 && !parts[5] && !isUndefined(ex.columnNumber)) {
                    // FireFox uses this awesome columnNumber property for its top frame
                    // Also note, Firefox's column number is 0-based and everything else expects 1-based,
                    // so adding 1
                    // NOTE: this hack doesn't work if top-most frame is eval
                    stack[0].column = ex.columnNumber + 1;
                }
                element = {
                    args: parts[2] ? parts[2].split(',') : [],
                    column: parts[5] ? +parts[5] : undefined,
                    func: parts[1] || UNKNOWN_FUNCTION,
                    line: parts[4] ? +parts[4] : undefined,
                    url: parts[3],
                };
            }
            else {
                continue;
            }
            if (!element.func && element.line) {
                element.func = UNKNOWN_FUNCTION;
            }
            stack.push(element);
        }
        if (!stack.length) {
            return;
        }
        return {
            stack: stack,
            message: ex.message,
            name: ex.name,
        };
    }
    /**
     * Computes stack trace information from the stacktrace property.
     * Opera 10+ uses this property.
     * @param {Error} ex
     * @return {?StackTrace} Stack trace information.
     * @memberof computeStackTrace
     */
    function computeStackTraceFromStacktraceProp(ex) {
        // Access and store the stacktrace property before doing ANYTHING
        // else to it because Opera is not very good at providing it
        // reliably in other circumstances.
        var stacktrace = ex.stacktrace;
        if (!stacktrace) {
            return;
        }
        var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
        // tslint:disable-next-line max-line-length
        var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i;
        var lines = stacktrace.split('\n');
        var stack = [];
        var parts;
        for (var line = 0; line < lines.length; line += 2) {
            var element = void 0;
            if (opera10Regex.exec(lines[line])) {
                parts = opera10Regex.exec(lines[line]);
                element = {
                    args: [],
                    column: undefined,
                    func: parts[3],
                    line: +parts[1],
                    url: parts[2],
                };
            }
            else if (opera11Regex.exec(lines[line])) {
                parts = opera11Regex.exec(lines[line]);
                element = {
                    args: parts[5] ? parts[5].split(',') : [],
                    column: +parts[2],
                    func: parts[3] || parts[4],
                    line: +parts[1],
                    url: parts[6],
                };
            }
            if (element) {
                if (!element.func && element.line) {
                    element.func = UNKNOWN_FUNCTION;
                }
                element.context = [lines[line + 1]];
                stack.push(element);
            }
        }
        if (!stack.length) {
            return;
        }
        return {
            stack: stack,
            message: ex.message,
            name: ex.name,
        };
    }
    /**
     * NOT TESTED.
     * Computes stack trace information from an error message that includes
     * the stack trace.
     * Opera 9 and earlier use this method if the option to show stack
     * traces is turned on in opera:config.
     * @param {Error} ex
     * @return {?StackTrace} Stack information.
     * @memberof computeStackTrace
     */
    function computeStackTraceFromOperaMultiLineMessage(ex) {
        // TODO: Clean this function up
        // Opera includes a stack trace into the exception message. An example is:
        //
        // Statement on line 3: Undefined variable: undefinedFunc
        // Backtrace:
        //   Line 3 of linked script file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.js:
        //   In function zzz
        //         undefinedFunc(a);
        //   Line 7 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html:
        //   In function yyy
        //           zzz(x, y, z);
        //   Line 3 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html:
        //   In function xxx
        //           yyy(a, a, a);
        //   Line 1 of function script
        //     try { xxx('hi'); return false; } catch(ex) { report(ex); }
        //   ...
        var lines = ex.message.split('\n');
        if (lines.length < 4) {
            return;
        }
        var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i;
        var lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i;
        var lineRE3 = /^\s*Line (\d+) of function script\s*$/i;
        var stack = [];
        var scripts = window && window.document && window.document.getElementsByTagName('script');
        var inlineScriptBlocks = [];
        var parts;
        for (var s in scripts) {
            if (has(scripts, s) && !scripts[s].src) {
                inlineScriptBlocks.push(scripts[s]);
            }
        }
        for (var line = 2; line < lines.length; line += 2) {
            var item = void 0;
            if (lineRE1.exec(lines[line])) {
                parts = lineRE1.exec(lines[line]);
                item = {
                    args: [],
                    column: undefined,
                    func: parts[3],
                    line: +parts[1],
                    url: parts[2],
                };
            }
            else if (lineRE2.exec(lines[line])) {
                parts = lineRE2.exec(lines[line]);
                item = {
                    args: [],
                    column: undefined,
                    func: parts[4],
                    line: +parts[1],
                    url: parts[3],
                };
            }
            else if (lineRE3.exec(lines[line])) {
                parts = lineRE3.exec(lines[line]);
                var url = window.location.href.replace(/#.*$/, '');
                item = {
                    url: url,
                    args: [],
                    column: undefined,
                    func: '',
                    line: +parts[1],
                };
            }
            if (item) {
                if (!item.func) {
                    item.func = UNKNOWN_FUNCTION;
                }
                item.context = [lines[line + 1]];
                stack.push(item);
            }
        }
        if (!stack.length) {
            return; // could not parse multiline exception message as Opera stack trace
        }
        return {
            stack: stack,
            message: lines[0],
            name: ex.name,
        };
    }
    /**
     * Adds information about the first frame to incomplete stack traces.
     * Safari and IE require this to get complete data on the first frame.
     * @param {StackTrace} stackInfo Stack trace information from
     * one of the compute* methods.
     * @param {string=} url The URL of the script that caused an error.
     * @param {(number|string)=} lineNo The line number of the script that
     * caused an error.
     * @param {string=} message The error generated by the browser, which
     * hopefully contains the name of the object that caused the error.
     * @return {boolean} Whether or not the stack information was
     * augmented.
     * @memberof computeStackTrace
     */
    function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
        var initial = {
            url: url,
            line: lineNo ? +lineNo : undefined,
        };
        if (initial.url && initial.line) {
            stackInfo.incomplete = false;
            var stack = stackInfo.stack;
            if (stack.length > 0) {
                if (stack[0].url === initial.url) {
                    if (stack[0].line === initial.line) {
                        return false; // already in stack trace
                    }
                    if (!stack[0].line && stack[0].func === initial.func) {
                        stack[0].line = initial.line;
                        stack[0].context = initial.context;
                        return false;
                    }
                }
            }
            stack.unshift(initial);
            stackInfo.partial = true;
            return true;
        }
        stackInfo.incomplete = true;
        return false;
    }
    /**
     * Computes stack trace information by walking the arguments.caller
     * chain at the time the exception occurred. This will cause earlier
     * frames to be missed but is the only way to get any stack trace in
     * Safari and IE. The top frame is restored by
     * {@link augmentStackTraceWithInitialElement}.
     * @param {Error} ex
     * @param {number} depth
     * @return {StackTrace} Stack trace information.
     * @memberof computeStackTrace
     */
    function computeStackTraceByWalkingCallerChain(ex, depth) {
        var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i;
        var stack = [];
        var funcs = {};
        var recursion = false;
        var parts;
        var item;
        for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
            if (curr === exports.computeStackTrace || curr === exports.report) {
                continue;
            }
            item = {
                args: [],
                column: undefined,
                func: UNKNOWN_FUNCTION,
                line: undefined,
                url: undefined,
            };
            parts = functionName.exec(curr.toString());
            if (curr.name) {
                item.func = curr.name;
            }
            else if (parts) {
                item.func = parts[1];
            }
            if (typeof item.func === 'undefined') {
                item.func = parts ? parts.input.substring(0, parts.input.indexOf('{')) : undefined;
            }
            if (funcs["" + curr]) {
                recursion = true;
            }
            else {
                funcs["" + curr] = true;
            }
            stack.push(item);
        }
        if (depth) {
            stack.splice(0, depth);
        }
        var result = {
            stack: stack,
            message: ex.message,
            name: ex.name,
        };
        augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
        return result;
    }
    /**
     * Computes a stack trace for an exception.
     * @param {Error} ex
     * @param {(string|number)=} depth
     * @memberof computeStackTrace
     */
    function doComputeStackTrace(ex, depth) {
        var stack;
        var normalizedDepth = depth === undefined ? 0 : +depth;
        try {
            // This must be tried first because Opera 10 *destroys*
            // its stacktrace property if you try to access the stack
            // property first!!
            stack = computeStackTraceFromStacktraceProp(ex);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        try {
            stack = computeStackTraceFromStackProp(ex);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        try {
            stack = computeStackTraceFromOperaMultiLineMessage(ex);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        try {
            stack = computeStackTraceByWalkingCallerChain(ex, normalizedDepth + 1);
            if (stack) {
                return stack;
            }
        }
        catch (e) {
            if (debug) {
                throw e;
            }
        }
        return {
            message: ex.message,
            name: ex.name,
            stack: [],
        };
    }
    /**
     * Logs a stacktrace starting from the previous call and working down.
     * @param {(number|string)=} depth How many frames deep to trace.
     * @return {StackTrace} Stack trace information.
     * @memberof computeStackTrace
     */
    function computeStackTraceOfCaller(depth) {
        var currentDepth = (depth === undefined ? 0 : +depth) + 1; // "+ 1" because "ofCaller" should drop one frame
        try {
            throw new Error();
        }
        catch (ex) {
            return exports.computeStackTrace(ex, currentDepth + 1);
        }
    }
    doComputeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
    doComputeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;
    doComputeStackTrace.ofCaller = computeStackTraceOfCaller;
    return doComputeStackTrace;
})();
/**
 * Extends support for global error handling for asynchronous browser
 * functions. Adopted from Closure Library's errorhandler.js
 * @memberof TraceKit
 */
function extendToAsynchronousCallbacks() {
    function helper(fnName) {
        var originalFn = window[fnName];
        window[fnName] = function traceKitAsyncExtension() {
            // Make a copy of the arguments
            var args = [].slice.call(arguments);
            var originalCallback = args[0];
            if (typeof originalCallback === 'function') {
                args[0] = wrap(originalCallback);
            }
            // IE < 9 doesn't support .call/.apply on setInterval/setTimeout, but it
            // also only supports 2 argument and doesn't care what "this" is, so we
            // can just call the original function directly.
            if (originalFn.apply) {
                return originalFn.apply(this, args);
            }
            return originalFn(args[0], args[1]);
        };
    }
    helper('setTimeout');
    helper('setInterval');
}
exports.extendToAsynchronousCallbacks = extendToAsynchronousCallbacks;
//# sourceMappingURL=tracekit.js.map
},{"./internalMonitoring":"6d081b3adf74fb2ed9632aae8731586a"}],"30a74b82219bd3790087d6a539e0dec1":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function normalizeUrl(url) {
    return buildUrl(url, utils_1.getLocationOrigin()).href;
}
exports.normalizeUrl = normalizeUrl;
function isValidUrl(url) {
    try {
        return !!buildUrl(url);
    }
    catch (_a) {
        return false;
    }
}
exports.isValidUrl = isValidUrl;
function haveSameOrigin(url1, url2) {
    return getOrigin(url1) === getOrigin(url2);
}
exports.haveSameOrigin = haveSameOrigin;
function getOrigin(url) {
    return utils_1.getLinkElementOrigin(buildUrl(url));
}
exports.getOrigin = getOrigin;
function getPathName(url) {
    var pathname = buildUrl(url).pathname;
    return pathname[0] === '/' ? pathname : "/" + pathname;
}
exports.getPathName = getPathName;
function getSearch(url) {
    return buildUrl(url).search;
}
exports.getSearch = getSearch;
function getHash(url) {
    return buildUrl(url).hash;
}
exports.getHash = getHash;
function buildUrl(url, base) {
    if (checkURLSupported()) {
        return base !== undefined ? new URL(url, base) : new URL(url);
    }
    if (base === undefined && !/:/.test(url)) {
        throw new Error("Invalid URL: '" + url + "'");
    }
    var doc = document;
    var anchorElement = doc.createElement('a');
    if (base !== undefined) {
        doc = document.implementation.createHTMLDocument('');
        var baseElement = doc.createElement('base');
        baseElement.href = base;
        doc.head.appendChild(baseElement);
        doc.body.appendChild(anchorElement);
    }
    anchorElement.href = url;
    return anchorElement;
}
exports.buildUrl = buildUrl;
var isURLSupported;
function checkURLSupported() {
    if (isURLSupported !== undefined) {
        return isURLSupported;
    }
    try {
        var url = new URL('http://test/path');
        isURLSupported = url.href === 'http://test/path';
        return isURLSupported;
    }
    catch (_a) {
        isURLSupported = false;
    }
    return isURLSupported;
}
//# sourceMappingURL=urlPolyfill.js.map
},{"./utils":"a4c0c5c567ad3af2f7aa1ae7108bd730"}],"be29ffc5ff3ec36df8a0526d8efa37e5":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fetchProxy_1 = require("../browser/fetchProxy");
var xhrProxy_1 = require("../browser/xhrProxy");
var error_1 = require("../tools/error");
var observable_1 = require("../tools/observable");
var utils_1 = require("../tools/utils");
var configuration_1 = require("./configuration");
var internalMonitoring_1 = require("./internalMonitoring");
var tracekit_1 = require("./tracekit");
var filteredErrorsObservable;
function startAutomaticErrorCollection(configuration) {
    if (!filteredErrorsObservable) {
        var errorObservable = new observable_1.Observable();
        trackNetworkError(configuration, errorObservable);
        startConsoleTracking(errorObservable);
        startRuntimeErrorTracking(errorObservable);
        filteredErrorsObservable = filterErrors(configuration, errorObservable);
    }
    return filteredErrorsObservable;
}
exports.startAutomaticErrorCollection = startAutomaticErrorCollection;
function filterErrors(configuration, errorObservable) {
    var errorCount = 0;
    var filteredErrorObservable = new observable_1.Observable();
    errorObservable.subscribe(function (error) {
        if (errorCount < configuration.maxErrorsByMinute) {
            errorCount += 1;
            filteredErrorObservable.notify(error);
        }
        else if (errorCount === configuration.maxErrorsByMinute) {
            errorCount += 1;
            filteredErrorObservable.notify({
                message: "Reached max number of errors by minute: " + configuration.maxErrorsByMinute,
                source: error_1.ErrorSource.AGENT,
                startTime: performance.now(),
            });
        }
    });
    setInterval(function () { return (errorCount = 0); }, utils_1.ONE_MINUTE);
    return filteredErrorObservable;
}
exports.filterErrors = filterErrors;
var originalConsoleError;
function startConsoleTracking(errorObservable) {
    originalConsoleError = console.error;
    console.error = internalMonitoring_1.monitor(function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        originalConsoleError.apply(console, tslib_1.__spreadArrays([message], optionalParams));
        errorObservable.notify({
            message: tslib_1.__spreadArrays(['console error:', message], optionalParams).map(formatConsoleParameters).join(' '),
            source: error_1.ErrorSource.CONSOLE,
            startTime: performance.now(),
        });
    });
}
exports.startConsoleTracking = startConsoleTracking;
function stopConsoleTracking() {
    console.error = originalConsoleError;
}
exports.stopConsoleTracking = stopConsoleTracking;
function formatConsoleParameters(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (param instanceof Error) {
        return error_1.toStackTraceString(tracekit_1.computeStackTrace(param));
    }
    return utils_1.jsonStringify(param, undefined, 2);
}
var traceKitReportHandler;
function startRuntimeErrorTracking(errorObservable) {
    traceKitReportHandler = function (stackTrace, _, errorObject) {
        var _a = error_1.formatUnknownError(stackTrace, errorObject, 'Uncaught'), stack = _a.stack, message = _a.message, type = _a.type;
        errorObservable.notify({
            message: message,
            stack: stack,
            type: type,
            source: error_1.ErrorSource.SOURCE,
            startTime: performance.now(),
        });
    };
    tracekit_1.report.subscribe(traceKitReportHandler);
}
exports.startRuntimeErrorTracking = startRuntimeErrorTracking;
function stopRuntimeErrorTracking() {
    ;
    tracekit_1.report.unsubscribe(traceKitReportHandler);
}
exports.stopRuntimeErrorTracking = stopRuntimeErrorTracking;
function trackNetworkError(configuration, errorObservable) {
    xhrProxy_1.startXhrProxy().onRequestComplete(function (context) { return handleCompleteRequest(utils_1.RequestType.XHR, context); });
    fetchProxy_1.startFetchProxy().onRequestComplete(function (context) { return handleCompleteRequest(utils_1.RequestType.FETCH, context); });
    function handleCompleteRequest(type, request) {
        if (!configuration_1.isIntakeRequest(request.url, configuration) && (isRejected(request) || isServerError(request))) {
            errorObservable.notify({
                message: format(type) + " error " + request.method + " " + request.url,
                resource: {
                    method: request.method,
                    statusCode: request.status,
                    url: request.url,
                },
                source: error_1.ErrorSource.NETWORK,
                stack: truncateResponse(request.response, configuration) || 'Failed to load',
                startTime: request.startTime,
            });
        }
    }
    return {
        stop: function () {
            xhrProxy_1.resetXhrProxy();
            fetchProxy_1.resetFetchProxy();
        },
    };
}
exports.trackNetworkError = trackNetworkError;
function isRejected(request) {
    return request.status === 0 && request.responseType !== 'opaque';
}
function isServerError(request) {
    return request.status >= 500;
}
function truncateResponse(response, configuration) {
    if (response && response.length > configuration.requestErrorResponseLengthLimit) {
        return response.substring(0, configuration.requestErrorResponseLengthLimit) + "...";
    }
    return response;
}
function format(type) {
    if (utils_1.RequestType.XHR === type) {
        return 'XHR';
    }
    return 'Fetch';
}
//# sourceMappingURL=automaticErrorCollection.js.map
},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1","../browser/fetchProxy":"139ace042ae6bdfd7849fc66c7e6554e","../browser/xhrProxy":"dfdf6d7dbd141ea1bafda02e0c0b4cae","../tools/error":"0dddf352a2255acaa5426f9ee2e94d13","../tools/observable":"38310c2b77d6e778570b5a56ef9806bb","../tools/utils":"a4c0c5c567ad3af2f7aa1ae7108bd730","./configuration":"6763541ca333269e57118bc4c50800cf","./internalMonitoring":"6d081b3adf74fb2ed9632aae8731586a","./tracekit":"35ac35b5e9178c44050ae5baee46483f"}],"139ace042ae6bdfd7849fc66c7e6554e":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var internalMonitoring_1 = require("../domain/internalMonitoring");
var tracekit_1 = require("../domain/tracekit");
var error_1 = require("../tools/error");
var urlPolyfill_1 = require("../tools/urlPolyfill");
var fetchProxySingleton;
var originalFetch;
var beforeSendCallbacks = [];
var onRequestCompleteCallbacks = [];
function startFetchProxy() {
    if (!fetchProxySingleton) {
        proxyFetch();
        fetchProxySingleton = {
            beforeSend: function (callback) {
                beforeSendCallbacks.push(callback);
            },
            onRequestComplete: function (callback) {
                onRequestCompleteCallbacks.push(callback);
            },
        };
    }
    return fetchProxySingleton;
}
exports.startFetchProxy = startFetchProxy;
function resetFetchProxy() {
    if (fetchProxySingleton) {
        fetchProxySingleton = undefined;
        beforeSendCallbacks.splice(0, beforeSendCallbacks.length);
        onRequestCompleteCallbacks.splice(0, onRequestCompleteCallbacks.length);
        window.fetch = originalFetch;
    }
}
exports.resetFetchProxy = resetFetchProxy;
function proxyFetch() {
    if (!window.fetch) {
        return;
    }
    originalFetch = window.fetch;
    // tslint:disable promise-function-async
    window.fetch = internalMonitoring_1.monitor(function (input, init) {
        var _this = this;
        var method = (init && init.method) || (typeof input === 'object' && input.method) || 'GET';
        var url = urlPolyfill_1.normalizeUrl((typeof input === 'object' && input.url) || input);
        var startTime = performance.now();
        var context = {
            init: init,
            method: method,
            startTime: startTime,
            url: url,
        };
        var reportFetch = function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var text, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context.duration = performance.now() - context.startTime;
                        if (!('stack' in response || response instanceof Error)) return [3 /*break*/, 1];
                        context.status = 0;
                        context.response = error_1.toStackTraceString(tracekit_1.computeStackTrace(response));
                        onRequestCompleteCallbacks.forEach(function (callback) { return callback(context); });
                        return [3 /*break*/, 6];
                    case 1:
                        if (!('status' in response)) return [3 /*break*/, 6];
                        text = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, response.clone().text()];
                    case 3:
                        text = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        text = "Unable to retrieve response: " + e_1;
                        return [3 /*break*/, 5];
                    case 5:
                        context.response = text;
                        context.responseType = response.type;
                        context.status = response.status;
                        onRequestCompleteCallbacks.forEach(function (callback) { return callback(context); });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        beforeSendCallbacks.forEach(function (callback) { return callback(context); });
        var responsePromise = originalFetch.call(this, input, context.init);
        responsePromise.then(internalMonitoring_1.monitor(reportFetch), internalMonitoring_1.monitor(reportFetch));
        return responsePromise;
    });
}
//# sourceMappingURL=fetchProxy.js.map
},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1","../domain/internalMonitoring":"6d081b3adf74fb2ed9632aae8731586a","../domain/tracekit":"35ac35b5e9178c44050ae5baee46483f","../tools/error":"0dddf352a2255acaa5426f9ee2e94d13","../tools/urlPolyfill":"30a74b82219bd3790087d6a539e0dec1"}],"dfdf6d7dbd141ea1bafda02e0c0b4cae":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var internalMonitoring_1 = require("../domain/internalMonitoring");
var urlPolyfill_1 = require("../tools/urlPolyfill");
var xhrProxySingleton;
var beforeSendCallbacks = [];
var onRequestCompleteCallbacks = [];
var originalXhrOpen;
var originalXhrSend;
function startXhrProxy() {
    if (!xhrProxySingleton) {
        proxyXhr();
        xhrProxySingleton = {
            beforeSend: function (callback) {
                beforeSendCallbacks.push(callback);
            },
            onRequestComplete: function (callback) {
                onRequestCompleteCallbacks.push(callback);
            },
        };
    }
    return xhrProxySingleton;
}
exports.startXhrProxy = startXhrProxy;
function resetXhrProxy() {
    if (xhrProxySingleton) {
        xhrProxySingleton = undefined;
        beforeSendCallbacks.splice(0, beforeSendCallbacks.length);
        onRequestCompleteCallbacks.splice(0, onRequestCompleteCallbacks.length);
        XMLHttpRequest.prototype.open = originalXhrOpen;
        XMLHttpRequest.prototype.send = originalXhrSend;
    }
}
exports.resetXhrProxy = resetXhrProxy;
function proxyXhr() {
    originalXhrOpen = XMLHttpRequest.prototype.open;
    originalXhrSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = internalMonitoring_1.monitor(function (method, url) {
        // WARN: since this data structure is tied to the instance, it is shared by both logs and rum
        // and can be used by different code versions depending on customer setup
        // so it should stay compatible with older versions
        this._datadog_xhr = {
            method: method,
            startTime: -1,
            url: urlPolyfill_1.normalizeUrl(url),
        };
        return originalXhrOpen.apply(this, arguments);
    });
    XMLHttpRequest.prototype.send = internalMonitoring_1.monitor(function (body) {
        var _this = this;
        if (this._datadog_xhr) {
            this._datadog_xhr.startTime = performance.now();
            var originalOnreadystatechange_1 = this.onreadystatechange;
            this.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    internalMonitoring_1.monitor(reportXhr_1)();
                }
                if (originalOnreadystatechange_1) {
                    originalOnreadystatechange_1.apply(this, arguments);
                }
            };
            var hasBeenReported_1 = false;
            var reportXhr_1 = function () {
                if (hasBeenReported_1) {
                    return;
                }
                hasBeenReported_1 = true;
                _this._datadog_xhr.duration = performance.now() - _this._datadog_xhr.startTime;
                _this._datadog_xhr.response = _this.response;
                _this._datadog_xhr.status = _this.status;
                onRequestCompleteCallbacks.forEach(function (callback) { return callback(_this._datadog_xhr); });
            };
            this.addEventListener('loadend', internalMonitoring_1.monitor(reportXhr_1));
            beforeSendCallbacks.forEach(function (callback) { return callback(_this._datadog_xhr, _this); });
        }
        return originalXhrSend.apply(this, arguments);
    });
}
//# sourceMappingURL=xhrProxy.js.map
},{"../domain/internalMonitoring":"6d081b3adf74fb2ed9632aae8731586a","../tools/urlPolyfill":"30a74b82219bd3790087d6a539e0dec1"}],"38310c2b77d6e778570b5a56ef9806bb":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable = /** @class */ (function () {
    function Observable() {
        this.observers = [];
    }
    Observable.prototype.subscribe = function (f) {
        this.observers.push(f);
    };
    Observable.prototype.notify = function (data) {
        this.observers.forEach(function (observer) { return observer(data); });
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=observable.js.map
},{}],"183a6e16ab4f7d1c9cc409df2a4654f3":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cookie_1 = require("../browser/cookie");
var observable_1 = require("../tools/observable");
var utils = tslib_1.__importStar(require("../tools/utils"));
var internalMonitoring_1 = require("./internalMonitoring");
var oldCookiesMigration_1 = require("./oldCookiesMigration");
exports.SESSION_COOKIE_NAME = '_dd_s';
exports.SESSION_EXPIRATION_DELAY = 15 * utils.ONE_MINUTE;
exports.SESSION_TIME_OUT_DELAY = 4 * utils.ONE_HOUR;
exports.VISIBILITY_CHECK_DELAY = utils.ONE_MINUTE;
/**
 * Limit access to cookie to avoid performance issues
 */
function startSessionManagement(options, productKey, computeSessionState) {
    var sessionCookie = cookie_1.cacheCookieAccess(exports.SESSION_COOKIE_NAME, options);
    oldCookiesMigration_1.tryOldCookiesMigration(sessionCookie);
    var renewObservable = new observable_1.Observable();
    var currentSessionId = retrieveActiveSession(sessionCookie).id;
    var expandOrRenewSession = utils.throttle(function () {
        var session = retrieveActiveSession(sessionCookie);
        var _a = computeSessionState(session[productKey]), trackingType = _a.trackingType, isTracked = _a.isTracked;
        session[productKey] = trackingType;
        if (isTracked && !session.id) {
            session.id = utils.generateUUID();
            session.created = String(Date.now());
        }
        // save changes and expand session duration
        persistSession(session, sessionCookie);
        // If the session id has changed, notify that the session has been renewed
        if (isTracked && currentSessionId !== session.id) {
            currentSessionId = session.id;
            renewObservable.notify();
        }
    }, cookie_1.COOKIE_ACCESS_DELAY).throttled;
    var expandSession = function () {
        var session = retrieveActiveSession(sessionCookie);
        persistSession(session, sessionCookie);
    };
    expandOrRenewSession();
    trackActivity(expandOrRenewSession);
    trackVisibility(expandSession);
    return {
        getId: function () {
            return retrieveActiveSession(sessionCookie).id;
        },
        getTrackingType: function () {
            return retrieveActiveSession(sessionCookie)[productKey];
        },
        renewObservable: renewObservable,
    };
}
exports.startSessionManagement = startSessionManagement;
var SESSION_ENTRY_REGEXP = /^([a-z]+)=([a-z0-9-]+)$/;
var SESSION_ENTRY_SEPARATOR = '&';
function isValidSessionString(sessionString) {
    return (sessionString !== undefined &&
        (sessionString.indexOf(SESSION_ENTRY_SEPARATOR) !== -1 || SESSION_ENTRY_REGEXP.test(sessionString)));
}
exports.isValidSessionString = isValidSessionString;
function retrieveActiveSession(sessionCookie) {
    var session = retrieveSession(sessionCookie);
    if (isActiveSession(session)) {
        return session;
    }
    clearSession(sessionCookie);
    return {};
}
function isActiveSession(session) {
    // created and expire can be undefined for versions which was not storing them
    // these checks could be removed when older versions will not be available/live anymore
    return ((session.created === undefined || Date.now() - Number(session.created) < exports.SESSION_TIME_OUT_DELAY) &&
        (session.expire === undefined || Date.now() < Number(session.expire)));
}
function retrieveSession(sessionCookie) {
    var sessionString = sessionCookie.get();
    var session = {};
    if (isValidSessionString(sessionString)) {
        sessionString.split(SESSION_ENTRY_SEPARATOR).forEach(function (entry) {
            var matches = SESSION_ENTRY_REGEXP.exec(entry);
            if (matches !== null) {
                var key = matches[1], value = matches[2];
                session[key] = value;
            }
        });
    }
    return session;
}
function persistSession(session, cookie) {
    if (utils.isEmptyObject(session)) {
        clearSession(cookie);
        return;
    }
    session.expire = String(Date.now() + exports.SESSION_EXPIRATION_DELAY);
    var cookieString = utils
        .objectEntries(session)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return key + "=" + value;
    })
        .join(SESSION_ENTRY_SEPARATOR);
    cookie.set(cookieString, exports.SESSION_EXPIRATION_DELAY);
}
exports.persistSession = persistSession;
function clearSession(cookie) {
    cookie.set('', 0);
}
function stopSessionManagement() {
    stopCallbacks.forEach(function (e) { return e(); });
    stopCallbacks = [];
}
exports.stopSessionManagement = stopSessionManagement;
var stopCallbacks = [];
function trackActivity(expandOrRenewSession) {
    var stop = utils.addEventListeners(window, [utils.DOM_EVENT.CLICK, utils.DOM_EVENT.TOUCH_START, utils.DOM_EVENT.KEY_DOWN, utils.DOM_EVENT.SCROLL], expandOrRenewSession, { capture: true, passive: true }).stop;
    stopCallbacks.push(stop);
}
exports.trackActivity = trackActivity;
function trackVisibility(expandSession) {
    var expandSessionWhenVisible = internalMonitoring_1.monitor(function () {
        if (document.visibilityState === 'visible') {
            expandSession();
        }
    });
    var stop = utils.addEventListener(document, utils.DOM_EVENT.VISIBILITY_CHANGE, expandSessionWhenVisible).stop;
    stopCallbacks.push(stop);
    var visibilityCheckInterval = window.setInterval(expandSessionWhenVisible, exports.VISIBILITY_CHECK_DELAY);
    stopCallbacks.push(function () {
        clearInterval(visibilityCheckInterval);
    });
}
//# sourceMappingURL=sessionManagement.js.map
},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1","../browser/cookie":"ebaf883ffc0dcd01cd439a4ca56c6088","../tools/observable":"38310c2b77d6e778570b5a56ef9806bb","../tools/utils":"a4c0c5c567ad3af2f7aa1ae7108bd730","./internalMonitoring":"6d081b3adf74fb2ed9632aae8731586a","./oldCookiesMigration":"cb1bc434093eb0e1b8981b4a33ad989e"}],"cb1bc434093eb0e1b8981b4a33ad989e":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_1 = require("../browser/cookie");
var sessionManagement_1 = require("./sessionManagement");
exports.OLD_SESSION_COOKIE_NAME = '_dd';
exports.OLD_RUM_COOKIE_NAME = '_dd_r';
exports.OLD_LOGS_COOKIE_NAME = '_dd_l';
// duplicate values to avoid dependency issues
exports.RUM_SESSION_KEY = 'rum';
exports.LOGS_SESSION_KEY = 'logs';
/**
 * This migration should remain in the codebase as long as older versions are available/live
 * to allow older sdk versions to be upgraded to newer versions without compatibility issues.
 */
function tryOldCookiesMigration(sessionCookie) {
    var sessionString = sessionCookie.get();
    var oldSessionId = cookie_1.getCookie(exports.OLD_SESSION_COOKIE_NAME);
    var oldRumType = cookie_1.getCookie(exports.OLD_RUM_COOKIE_NAME);
    var oldLogsType = cookie_1.getCookie(exports.OLD_LOGS_COOKIE_NAME);
    if (!sessionString) {
        var session = {};
        if (oldSessionId) {
            session.id = oldSessionId;
        }
        if (oldLogsType && /^[01]$/.test(oldLogsType)) {
            session[exports.LOGS_SESSION_KEY] = oldLogsType;
        }
        if (oldRumType && /^[012]$/.test(oldRumType)) {
            session[exports.RUM_SESSION_KEY] = oldRumType;
        }
        sessionManagement_1.persistSession(session, sessionCookie);
    }
}
exports.tryOldCookiesMigration = tryOldCookiesMigration;
//# sourceMappingURL=oldCookiesMigration.js.map
},{"../browser/cookie":"ebaf883ffc0dcd01cd439a4ca56c6088","./sessionManagement":"183a6e16ab4f7d1c9cc409df2a4654f3"}],"c7de07e42779b3f5dae266fc246d6b22":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DEFAULT_LIMIT = 10000;
var BoundedBuffer = /** @class */ (function () {
    function BoundedBuffer(limit) {
        if (limit === void 0) { limit = DEFAULT_LIMIT; }
        this.limit = limit;
        this.buffer = [];
    }
    BoundedBuffer.prototype.add = function (item) {
        var length = this.buffer.push(item);
        if (length > this.limit) {
            this.buffer.splice(0, 1);
        }
    };
    BoundedBuffer.prototype.drain = function (fn) {
        this.buffer.forEach(function (item) { return fn(item); });
        this.buffer.length = 0;
    };
    return BoundedBuffer;
}());
exports.BoundedBuffer = BoundedBuffer;
//# sourceMappingURL=boundedBuffer.js.map
},{}],"a2b38010c0d318219e1b264edf210175":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createContextManager() {
    var context = {};
    return {
        get: function () {
            return context;
        },
        add: function (key, value) {
            context[key] = value;
        },
        remove: function (key) {
            delete context[key];
        },
        set: function (newContext) {
            context = newContext;
        },
    };
}
exports.createContextManager = createContextManager;
//# sourceMappingURL=contextManager.js.map
},{}],"4086e826a87d0c04dcb7fa2132257e73":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
exports.SPEC_ENDPOINTS = {
    internalMonitoringEndpoint: 'https://monitoring-intake.com/v1/input/abcde?foo=bar',
    logsEndpoint: 'https://logs-intake.com/v1/input/abcde?foo=bar',
    rumEndpoint: 'https://rum-intake.com/v1/input/abcde?foo=bar',
    traceEndpoint: 'https://trace-intake.com/v1/input/abcde?foo=bar',
};
function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
exports.isSafari = isSafari;
function isFirefox() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}
exports.isFirefox = isFirefox;
function isIE() {
    return navigator.userAgent.indexOf('MSIE ') > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
}
exports.isIE = isIE;
function clearAllCookies() {
    document.cookie.split(';').forEach(function (c) {
        document.cookie = c.replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/;samesite=strict");
    });
}
exports.clearAllCookies = clearAllCookies;
function stubFetch() {
    var _this = this;
    var originalFetch = window.fetch;
    var allFetchCompleteCallback = utils_1.noop;
    var pendingRequests = 0;
    function onRequestEnd() {
        pendingRequests -= 1;
        if (pendingRequests === 0) {
            setTimeout(function () { return allFetchCompleteCallback(); });
        }
    }
    window.fetch = (function () {
        pendingRequests += 1;
        var resolve;
        var reject;
        var promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        promise.resolveWith = function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var resolved;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                resolved = resolve(tslib_1.__assign(tslib_1.__assign({}, response), { clone: function () {
                        var cloned = {
                            text: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    if (response.responseTextError) {
                                        throw response.responseTextError;
                                    }
                                    return [2 /*return*/, response.responseText];
                                });
                            }); },
                        };
                        return cloned;
                    } }));
                onRequestEnd();
                return [2 /*return*/, resolved];
            });
        }); };
        promise.rejectWith = function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var rejected;
            return tslib_1.__generator(this, function (_a) {
                rejected = reject(error);
                onRequestEnd();
                return [2 /*return*/, rejected];
            });
        }); };
        return promise;
    });
    return {
        whenAllComplete: function (callback) {
            allFetchCompleteCallback = callback;
        },
        reset: function () {
            window.fetch = originalFetch;
            allFetchCompleteCallback = utils_1.noop;
        },
    };
}
exports.stubFetch = stubFetch;
var StubXhr = /** @class */ (function () {
    function StubXhr() {
        this.response = undefined;
        this.status = undefined;
        this.readyState = XMLHttpRequest.UNSENT;
        this.onreadystatechange = utils_1.noop;
        this.fakeEventTarget = document.createElement('div');
    }
    // tslint:disable:no-empty
    StubXhr.prototype.open = function (method, url) { };
    StubXhr.prototype.send = function () { };
    // tslint:enable:no-empty
    StubXhr.prototype.abort = function () {
        this.status = 0;
    };
    StubXhr.prototype.complete = function (status, response) {
        this.response = response;
        this.status = status;
        this.readyState = XMLHttpRequest.DONE;
        this.onreadystatechange();
        if (status >= 200 && status < 500) {
            this.dispatchEvent('load');
        }
        if (status >= 500) {
            this.dispatchEvent('error');
        }
        this.dispatchEvent('loadend');
    };
    StubXhr.prototype.addEventListener = function (name, callback) {
        this.fakeEventTarget.addEventListener(name, callback);
    };
    StubXhr.prototype.dispatchEvent = function (name) {
        this.fakeEventTarget.dispatchEvent(createNewEvent(name));
    };
    return StubXhr;
}());
function createNewEvent(eventName, properties) {
    if (properties === void 0) { properties = {}; }
    var event;
    if (typeof Event === 'function') {
        event = new Event(eventName);
    }
    else {
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
    }
    utils_1.objectEntries(properties).forEach(function (_a) {
        var name = _a[0], value = _a[1];
        // Setting values directly or with a `value` descriptor seems unsupported in IE11
        Object.defineProperty(event, name, {
            get: function () {
                return value;
            },
        });
    });
    return event;
}
exports.createNewEvent = createNewEvent;
function stubXhr() {
    var originalXhr = XMLHttpRequest;
    XMLHttpRequest = StubXhr;
    return {
        reset: function () {
            XMLHttpRequest = originalXhr;
        },
    };
}
exports.stubXhr = stubXhr;
function withXhr(_a) {
    var setup = _a.setup, onComplete = _a.onComplete;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('loadend', function () {
        setTimeout(function () {
            onComplete(xhr);
        });
    });
    setup(xhr);
}
exports.withXhr = withXhr;
function setPageVisibility(visibility) {
    Object.defineProperty(document, 'visibilityState', {
        get: function () {
            return visibility;
        },
        configurable: true,
    });
}
exports.setPageVisibility = setPageVisibility;
function restorePageVisibility() {
    delete document.visibilityState;
}
exports.restorePageVisibility = restorePageVisibility;
//# sourceMappingURL=specHelper.js.map
},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1","./utils":"a4c0c5c567ad3af2f7aa1ae7108bd730"}],"c554a92bfe782f83f0d50f842e4de8fb":[function(require,module,exports) {
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var browser_core_1 = require("@datadog/browser-core");
var StatusType;
(function (StatusType) {
    StatusType["debug"] = "debug";
    StatusType["info"] = "info";
    StatusType["warn"] = "warn";
    StatusType["error"] = "error";
})(StatusType = exports.StatusType || (exports.StatusType = {}));
exports.STATUS_PRIORITIES = (_a = {},
    _a[StatusType.debug] = 0,
    _a[StatusType.info] = 1,
    _a[StatusType.warn] = 2,
    _a[StatusType.error] = 3,
    _a);
exports.STATUSES = Object.keys(StatusType);
var HandlerType;
(function (HandlerType) {
    HandlerType["http"] = "http";
    HandlerType["console"] = "console";
    HandlerType["silent"] = "silent";
})(HandlerType = exports.HandlerType || (exports.HandlerType = {}));
var Logger = /** @class */ (function () {
    function Logger(sendLog, handlerType, level, loggerContext) {
        if (handlerType === void 0) { handlerType = HandlerType.http; }
        if (level === void 0) { level = StatusType.debug; }
        if (loggerContext === void 0) { loggerContext = {}; }
        this.sendLog = sendLog;
        this.handlerType = handlerType;
        this.level = level;
        this.contextManager = browser_core_1.createContextManager();
        this.contextManager.set(loggerContext);
    }
    Logger.prototype.log = function (message, messageContext, status) {
        if (status === void 0) { status = StatusType.info; }
        if (exports.STATUS_PRIORITIES[status] >= exports.STATUS_PRIORITIES[this.level]) {
            switch (this.handlerType) {
                case HandlerType.http:
                    this.sendLog(tslib_1.__assign({ message: message,
                        status: status }, browser_core_1.combine(this.contextManager.get(), messageContext)));
                    break;
                case HandlerType.console:
                    console.log(status + ": " + message, browser_core_1.combine(this.contextManager.get(), messageContext));
                    break;
                case HandlerType.silent:
                    break;
            }
        }
    };
    Logger.prototype.debug = function (message, messageContext) {
        this.log(message, messageContext, StatusType.debug);
    };
    Logger.prototype.info = function (message, messageContext) {
        this.log(message, messageContext, StatusType.info);
    };
    Logger.prototype.warn = function (message, messageContext) {
        this.log(message, messageContext, StatusType.warn);
    };
    Logger.prototype.error = function (message, messageContext) {
        var errorOrigin = {
            error: {
                origin: browser_core_1.ErrorSource.LOGGER,
            },
        };
        this.log(message, browser_core_1.combine(errorOrigin, messageContext), StatusType.error);
    };
    Logger.prototype.setContext = function (context) {
        this.contextManager.set(context);
    };
    Logger.prototype.addContext = function (key, value) {
        this.contextManager.add(key, value);
    };
    Logger.prototype.removeContext = function (key) {
        this.contextManager.remove(key);
    };
    Logger.prototype.setHandler = function (handler) {
        this.handlerType = handler;
    };
    Logger.prototype.setLevel = function (level) {
        this.level = level;
    };
    tslib_1.__decorate([
        browser_core_1.monitored
    ], Logger.prototype, "log", null);
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map
},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1","@datadog/browser-core":"2c4da984019bc1ef174ca0e92bb0855d"}],"c79a2cf2f6490c66d1cda96afe8b5ba6":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var browser_core_1 = require("@datadog/browser-core");
var logger_1 = require("../domain/logger");
var logs_1 = require("./logs");
exports.datadogLogs = makeLogsGlobal(logs_1.startLogs);
browser_core_1.defineGlobal(browser_core_1.getGlobalObject(), 'DD_LOGS', exports.datadogLogs);
function makeLogsGlobal(startLogsImpl) {
    var isAlreadyInitialized = false;
    var globalContextManager = browser_core_1.createContextManager();
    var customLoggers = {};
    var beforeInitSendLog = new browser_core_1.BoundedBuffer();
    var sendLogStrategy = function (message, currentContext) {
        beforeInitSendLog.add([message, currentContext]);
    };
    var logger = new logger_1.Logger(sendLog);
    return browser_core_1.makeGlobal({
        logger: logger,
        init: browser_core_1.monitor(function (userConfiguration) {
            if (!browser_core_1.checkIsNotLocalFile() || !canInitLogs(userConfiguration)) {
                return;
            }
            if (userConfiguration.publicApiKey) {
                userConfiguration.clientToken = userConfiguration.publicApiKey;
                console.warn('Public API Key is deprecated. Please use Client Token instead.');
            }
            sendLogStrategy = startLogsImpl(userConfiguration, logger, globalContextManager.get);
            beforeInitSendLog.drain(function (_a) {
                var message = _a[0], context = _a[1];
                return sendLogStrategy(message, context);
            });
            isAlreadyInitialized = true;
        }),
        getLoggerGlobalContext: browser_core_1.monitor(globalContextManager.get),
        setLoggerGlobalContext: browser_core_1.monitor(globalContextManager.set),
        addLoggerGlobalContext: browser_core_1.monitor(globalContextManager.add),
        removeLoggerGlobalContext: browser_core_1.monitor(globalContextManager.remove),
        createLogger: browser_core_1.monitor(function (name, conf) {
            if (conf === void 0) { conf = {}; }
            customLoggers[name] = new logger_1.Logger(sendLog, conf.handler, conf.level, tslib_1.__assign(tslib_1.__assign({}, conf.context), { logger: { name: name } }));
            return customLoggers[name];
        }),
        getLogger: browser_core_1.monitor(function (name) {
            return customLoggers[name];
        }),
    });
    function canInitLogs(userConfiguration) {
        if (isAlreadyInitialized) {
            if (!userConfiguration.silentMultipleInit) {
                console.error('DD_LOGS is already initialized.');
            }
            return false;
        }
        if (!userConfiguration || (!userConfiguration.publicApiKey && !userConfiguration.clientToken)) {
            console.error('Client Token is not configured, we will not send any data.');
            return false;
        }
        if (userConfiguration.sampleRate !== undefined && !browser_core_1.isPercentage(userConfiguration.sampleRate)) {
            console.error('Sample Rate should be a number between 0 and 100');
            return false;
        }
        return true;
    }
    function sendLog(message) {
        sendLogStrategy(message, browser_core_1.combine({
            date: Date.now(),
            view: {
                referrer: document.referrer,
                url: window.location.href,
            },
        }, globalContextManager.get()));
    }
}
exports.makeLogsGlobal = makeLogsGlobal;
//# sourceMappingURL=logs.entry.js.map
},{"tslib":"a212b5bd40bedbc434eaed1b3a2942b1","@datadog/browser-core":"2c4da984019bc1ef174ca0e92bb0855d","../domain/logger":"c554a92bfe782f83f0d50f842e4de8fb","./logs":"0e370e779ac03ba8475f482e6a0bcf37"}],"0e370e779ac03ba8475f482e6a0bcf37":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_core_1 = require("@datadog/browser-core");
var loggerSession_1 = require("../domain/loggerSession");
var buildEnv_1 = require("./buildEnv");
function startLogs(userConfiguration, errorLogger, getGlobalContext) {
    var _a = browser_core_1.commonInit(userConfiguration, buildEnv_1.buildEnv), configuration = _a.configuration, internalMonitoring = _a.internalMonitoring;
    var errorObservable = userConfiguration.forwardErrorsToLogs !== false
        ? browser_core_1.startAutomaticErrorCollection(configuration)
        : new browser_core_1.Observable();
    var session = loggerSession_1.startLoggerSession(configuration, browser_core_1.areCookiesAuthorized(configuration.cookieOptions));
    return doStartLogs(configuration, errorObservable, internalMonitoring, session, errorLogger, getGlobalContext);
}
exports.startLogs = startLogs;
function doStartLogs(configuration, errorObservable, internalMonitoring, session, errorLogger, getGlobalContext) {
    internalMonitoring.setExternalContextProvider(function () {
        return browser_core_1.combine({ session_id: session.getId() }, getGlobalContext(), getRUMInternalContext());
    });
    var batch = startLoggerBatch(configuration, session);
    errorObservable.subscribe(function (error) {
        errorLogger.error(error.message, browser_core_1.combine({
            date: browser_core_1.getTimestamp(error.startTime),
            error: {
                kind: error.type,
                origin: error.source,
                stack: error.stack,
            },
        }, error.resource
            ? {
                http: {
                    method: error.resource.method,
                    status_code: error.resource.statusCode,
                    url: error.resource.url,
                },
            }
            : undefined, getRUMInternalContext(error.startTime)));
    });
    return function (message, currentContext) {
        if (session.isTracked()) {
            batch.add(message, currentContext);
        }
    };
}
exports.doStartLogs = doStartLogs;
function startLoggerBatch(configuration, session) {
    var primaryBatch = createLoggerBatch(configuration.logsEndpoint);
    var replicaBatch;
    if (configuration.replica !== undefined) {
        replicaBatch = createLoggerBatch(configuration.replica.logsEndpoint);
    }
    function createLoggerBatch(endpointUrl) {
        return new browser_core_1.Batch(new browser_core_1.HttpRequest(endpointUrl, configuration.batchBytesLimit), configuration.maxBatchSize, configuration.batchBytesLimit, configuration.maxMessageSize, configuration.flushTimeout);
    }
    return {
        add: function (message, currentContext) {
            var contextualizedMessage = assembleMessageContexts({ service: configuration.service, session_id: session.getId() }, currentContext, getRUMInternalContext(), message);
            primaryBatch.add(contextualizedMessage);
            if (replicaBatch) {
                replicaBatch.add(contextualizedMessage);
            }
        },
    };
}
function assembleMessageContexts(defaultContext, currentContext, rumInternalContext, message) {
    return browser_core_1.combine(defaultContext, currentContext, rumInternalContext, message);
}
exports.assembleMessageContexts = assembleMessageContexts;
function getRUMInternalContext(startTime) {
    var rum = window.DD_RUM;
    return rum && rum.getInternalContext ? rum.getInternalContext(startTime) : undefined;
}
//# sourceMappingURL=logs.js.map
},{"@datadog/browser-core":"2c4da984019bc1ef174ca0e92bb0855d","../domain/loggerSession":"4e8a324063c0e4b712d8c4f54647d9d0","./buildEnv":"1f613e6b3a007e3d973b36c1c51e0051"}],"4e8a324063c0e4b712d8c4f54647d9d0":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_core_1 = require("@datadog/browser-core");
exports.LOGGER_SESSION_KEY = 'logs';
var LoggerTrackingType;
(function (LoggerTrackingType) {
    LoggerTrackingType["NOT_TRACKED"] = "0";
    LoggerTrackingType["TRACKED"] = "1";
})(LoggerTrackingType = exports.LoggerTrackingType || (exports.LoggerTrackingType = {}));
function startLoggerSession(configuration, areCookieAuthorized) {
    if (!areCookieAuthorized) {
        var isTracked_1 = computeTrackingType(configuration) === LoggerTrackingType.TRACKED;
        return {
            getId: function () { return undefined; },
            isTracked: function () { return isTracked_1; },
        };
    }
    var session = browser_core_1.startSessionManagement(configuration.cookieOptions, exports.LOGGER_SESSION_KEY, function (rawTrackingType) {
        return computeSessionState(configuration, rawTrackingType);
    });
    return {
        getId: session.getId,
        isTracked: function () { return session.getTrackingType() === LoggerTrackingType.TRACKED; },
    };
}
exports.startLoggerSession = startLoggerSession;
function computeTrackingType(configuration) {
    if (!browser_core_1.performDraw(configuration.sampleRate)) {
        return LoggerTrackingType.NOT_TRACKED;
    }
    return LoggerTrackingType.TRACKED;
}
function computeSessionState(configuration, rawSessionType) {
    var trackingType = hasValidLoggerSession(rawSessionType) ? rawSessionType : computeTrackingType(configuration);
    return {
        trackingType: trackingType,
        isTracked: trackingType === LoggerTrackingType.TRACKED,
    };
}
function hasValidLoggerSession(trackingType) {
    return trackingType === LoggerTrackingType.NOT_TRACKED || trackingType === LoggerTrackingType.TRACKED;
}
//# sourceMappingURL=loggerSession.js.map
},{"@datadog/browser-core":"2c4da984019bc1ef174ca0e92bb0855d"}],"1f613e6b3a007e3d973b36c1c51e0051":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEnv = {
    buildMode: 'release',
    datacenter: 'us',
    sdkVersion: '1.26.1',
};
//# sourceMappingURL=buildEnv.js.map
},{}]},{},["c72c7ad0a0f98dc5d22bd6d284b34de0","7843b3960e086726267ff606847fc92b"], null)

//# sourceMappingURL=andgo-logger.f4cccd61.js.map
