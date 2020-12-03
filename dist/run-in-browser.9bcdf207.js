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
})({"2075bdda7f3d1179ab1798efa7bdc0f0":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "9bcdf2072047b0ae8c717af4491d83e4";
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
},{}],"f9d1fdab4daafc675f509edfcc40bc23":[function(require,module,exports) {
"use strict";

var _index = require("./index");

const logger = (0, _index.logFactory)('Main');
const childLogger = (0, _index.logFactory)('Child');

const output = level => {
  (0, _index.setLogLevel)(level);
  logger.fatal('fatal test');
  logger.error('error test');
  logger.error({
    param1: 'value1',
    param2: 123
  }, 'error test');
  logger.error(new Error('ERROR TEST'));
  logger.error(new Error('ERROR TEST'), 'error message');
  logger.error(new Error('ERROR TEST'), 'error message: %s', 'REPLACE');
  logger.warn('warn test');
  logger.info('info test');
  logger.info({
    param1: 'value1',
    param2: 123
  }, 'info test');
  logger.debug({
    param1: 'value1',
    param2: 123
  }, 'debug test');
  childLogger.info('Child');
};

console.log('=== DEBUG LEVEL ===');
output('debug');
console.log('=== INFO LEVEL ===');
output('info');
},{"./index":"7843b3960e086726267ff606847fc92b"}],"7843b3960e086726267ff606847fc92b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDatadog = initDatadog;
exports.datadogMessage = datadogMessage;
exports.logFactory = exports.setLogLevel = void 0;

var _pino = _interopRequireDefault(require("pino"));

var _dateFns = require("date-fns");

var _ja = _interopRequireDefault(require("date-fns/locale/ja"));

var _browserLogs = require("@datadog/browser-logs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DATADOG_INITIALIZED = false;
const PINO_TO_CONSOLE = {
  fatal: _browserLogs.StatusType.error,
  error: _browserLogs.StatusType.error,
  warn: _browserLogs.StatusType.warn,
  info: _browserLogs.StatusType.info,
  debug: _browserLogs.StatusType.debug,
  trace: _browserLogs.StatusType.info
};

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
  // this is overwritten by setLogLevel
  browser: {
    serialize: true,
    write: o => {
      const {
        module,
        type,
        stack,
        level,
        time,
        msg,
        ...rest
      } = o;
      const errMsg = type === 'Error' ? `${stack?.split('\n')[0].substr(7)} ` ?? 'Error ' : '';
      const timeLabel = (0, _dateFns.format)(new Date(time), 'HH:mm:ss', {
        locale: _ja.default
      });
      const levelLabel = PINO_TO_CONSOLE[baseLogger.levels.labels[`${level}`]];

      if (Object.keys(rest).length) {
        console[levelLabel](`${timeLabel} ${errMsg}${msg ?? ''}`, rest);
      } else {
        console[levelLabel](`${timeLabel} ${errMsg}${msg ?? ''}`);
      }

      datadogMessage(msg ?? '', { ...rest
      }, levelLabel);
    }
  }
});

const setLogLevel = level => {
  baseLogger.level = level;
};

exports.setLogLevel = setLogLevel;

const logFactory = name => {
  const _logger = baseLogger.child({
    module: name
  });

  return _logger;
};

exports.logFactory = logFactory;
},{"pino":"53406330d12493e24777f49b9233054b","@datadog/browser-logs":"6e0c3116e37f766869430b3c4a2787cf","date-fns":"8ef0b0bcdaf6b121d785c4674025d8a8","date-fns/locale/ja":"e01b06873970098a24800651e0ccce10"}],"53406330d12493e24777f49b9233054b":[function(require,module,exports) {
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
},{}],"8ef0b0bcdaf6b121d785c4674025d8a8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  add: true,
  addBusinessDays: true,
  addDays: true,
  addHours: true,
  addISOWeekYears: true,
  addMilliseconds: true,
  addMinutes: true,
  addMonths: true,
  addQuarters: true,
  addSeconds: true,
  addWeeks: true,
  addYears: true,
  areIntervalsOverlapping: true,
  closestIndexTo: true,
  closestTo: true,
  compareAsc: true,
  compareDesc: true,
  differenceInBusinessDays: true,
  differenceInCalendarDays: true,
  differenceInCalendarISOWeekYears: true,
  differenceInCalendarISOWeeks: true,
  differenceInCalendarMonths: true,
  differenceInCalendarQuarters: true,
  differenceInCalendarWeeks: true,
  differenceInCalendarYears: true,
  differenceInDays: true,
  differenceInHours: true,
  differenceInISOWeekYears: true,
  differenceInMilliseconds: true,
  differenceInMinutes: true,
  differenceInMonths: true,
  differenceInQuarters: true,
  differenceInSeconds: true,
  differenceInWeeks: true,
  differenceInYears: true,
  eachDayOfInterval: true,
  eachHourOfInterval: true,
  eachMonthOfInterval: true,
  eachQuarterOfInterval: true,
  eachWeekOfInterval: true,
  eachWeekendOfInterval: true,
  eachWeekendOfMonth: true,
  eachWeekendOfYear: true,
  eachYearOfInterval: true,
  endOfDay: true,
  endOfDecade: true,
  endOfHour: true,
  endOfISOWeek: true,
  endOfISOWeekYear: true,
  endOfMinute: true,
  endOfMonth: true,
  endOfQuarter: true,
  endOfSecond: true,
  endOfToday: true,
  endOfTomorrow: true,
  endOfWeek: true,
  endOfYear: true,
  endOfYesterday: true,
  format: true,
  formatDistance: true,
  formatDistanceStrict: true,
  formatDistanceToNow: true,
  formatDistanceToNowStrict: true,
  formatDuration: true,
  formatISO: true,
  formatISO9075: true,
  formatISODuration: true,
  formatRFC3339: true,
  formatRFC7231: true,
  formatRelative: true,
  fromUnixTime: true,
  getDate: true,
  getDay: true,
  getDayOfYear: true,
  getDaysInMonth: true,
  getDaysInYear: true,
  getDecade: true,
  getHours: true,
  getISODay: true,
  getISOWeek: true,
  getISOWeekYear: true,
  getISOWeeksInYear: true,
  getMilliseconds: true,
  getMinutes: true,
  getMonth: true,
  getOverlappingDaysInIntervals: true,
  getQuarter: true,
  getSeconds: true,
  getTime: true,
  getUnixTime: true,
  getWeek: true,
  getWeekOfMonth: true,
  getWeekYear: true,
  getWeeksInMonth: true,
  getYear: true,
  intervalToDuration: true,
  isAfter: true,
  isBefore: true,
  isDate: true,
  isEqual: true,
  isExists: true,
  isFirstDayOfMonth: true,
  isFriday: true,
  isFuture: true,
  isLastDayOfMonth: true,
  isLeapYear: true,
  isMatch: true,
  isMonday: true,
  isPast: true,
  isSameDay: true,
  isSameHour: true,
  isSameISOWeek: true,
  isSameISOWeekYear: true,
  isSameMinute: true,
  isSameMonth: true,
  isSameQuarter: true,
  isSameSecond: true,
  isSameWeek: true,
  isSameYear: true,
  isSaturday: true,
  isSunday: true,
  isThisHour: true,
  isThisISOWeek: true,
  isThisMinute: true,
  isThisMonth: true,
  isThisQuarter: true,
  isThisSecond: true,
  isThisWeek: true,
  isThisYear: true,
  isThursday: true,
  isToday: true,
  isTomorrow: true,
  isTuesday: true,
  isValid: true,
  isWednesday: true,
  isWeekend: true,
  isWithinInterval: true,
  isYesterday: true,
  lastDayOfDecade: true,
  lastDayOfISOWeek: true,
  lastDayOfISOWeekYear: true,
  lastDayOfMonth: true,
  lastDayOfQuarter: true,
  lastDayOfWeek: true,
  lastDayOfYear: true,
  lightFormat: true,
  max: true,
  min: true,
  parse: true,
  parseISO: true,
  parseJSON: true,
  roundToNearestMinutes: true,
  set: true,
  setDate: true,
  setDay: true,
  setDayOfYear: true,
  setHours: true,
  setISODay: true,
  setISOWeek: true,
  setISOWeekYear: true,
  setMilliseconds: true,
  setMinutes: true,
  setMonth: true,
  setQuarter: true,
  setSeconds: true,
  setWeek: true,
  setWeekYear: true,
  setYear: true,
  startOfDay: true,
  startOfDecade: true,
  startOfHour: true,
  startOfISOWeek: true,
  startOfISOWeekYear: true,
  startOfMinute: true,
  startOfMonth: true,
  startOfQuarter: true,
  startOfSecond: true,
  startOfToday: true,
  startOfTomorrow: true,
  startOfWeek: true,
  startOfWeekYear: true,
  startOfYear: true,
  startOfYesterday: true,
  sub: true,
  subBusinessDays: true,
  subDays: true,
  subHours: true,
  subISOWeekYears: true,
  subMilliseconds: true,
  subMinutes: true,
  subMonths: true,
  subQuarters: true,
  subSeconds: true,
  subWeeks: true,
  subYears: true,
  toDate: true
};
Object.defineProperty(exports, "add", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});
Object.defineProperty(exports, "addBusinessDays", {
  enumerable: true,
  get: function () {
    return _index2.default;
  }
});
Object.defineProperty(exports, "addDays", {
  enumerable: true,
  get: function () {
    return _index3.default;
  }
});
Object.defineProperty(exports, "addHours", {
  enumerable: true,
  get: function () {
    return _index4.default;
  }
});
Object.defineProperty(exports, "addISOWeekYears", {
  enumerable: true,
  get: function () {
    return _index5.default;
  }
});
Object.defineProperty(exports, "addMilliseconds", {
  enumerable: true,
  get: function () {
    return _index6.default;
  }
});
Object.defineProperty(exports, "addMinutes", {
  enumerable: true,
  get: function () {
    return _index7.default;
  }
});
Object.defineProperty(exports, "addMonths", {
  enumerable: true,
  get: function () {
    return _index8.default;
  }
});
Object.defineProperty(exports, "addQuarters", {
  enumerable: true,
  get: function () {
    return _index9.default;
  }
});
Object.defineProperty(exports, "addSeconds", {
  enumerable: true,
  get: function () {
    return _index10.default;
  }
});
Object.defineProperty(exports, "addWeeks", {
  enumerable: true,
  get: function () {
    return _index11.default;
  }
});
Object.defineProperty(exports, "addYears", {
  enumerable: true,
  get: function () {
    return _index12.default;
  }
});
Object.defineProperty(exports, "areIntervalsOverlapping", {
  enumerable: true,
  get: function () {
    return _index13.default;
  }
});
Object.defineProperty(exports, "closestIndexTo", {
  enumerable: true,
  get: function () {
    return _index14.default;
  }
});
Object.defineProperty(exports, "closestTo", {
  enumerable: true,
  get: function () {
    return _index15.default;
  }
});
Object.defineProperty(exports, "compareAsc", {
  enumerable: true,
  get: function () {
    return _index16.default;
  }
});
Object.defineProperty(exports, "compareDesc", {
  enumerable: true,
  get: function () {
    return _index17.default;
  }
});
Object.defineProperty(exports, "differenceInBusinessDays", {
  enumerable: true,
  get: function () {
    return _index18.default;
  }
});
Object.defineProperty(exports, "differenceInCalendarDays", {
  enumerable: true,
  get: function () {
    return _index19.default;
  }
});
Object.defineProperty(exports, "differenceInCalendarISOWeekYears", {
  enumerable: true,
  get: function () {
    return _index20.default;
  }
});
Object.defineProperty(exports, "differenceInCalendarISOWeeks", {
  enumerable: true,
  get: function () {
    return _index21.default;
  }
});
Object.defineProperty(exports, "differenceInCalendarMonths", {
  enumerable: true,
  get: function () {
    return _index22.default;
  }
});
Object.defineProperty(exports, "differenceInCalendarQuarters", {
  enumerable: true,
  get: function () {
    return _index23.default;
  }
});
Object.defineProperty(exports, "differenceInCalendarWeeks", {
  enumerable: true,
  get: function () {
    return _index24.default;
  }
});
Object.defineProperty(exports, "differenceInCalendarYears", {
  enumerable: true,
  get: function () {
    return _index25.default;
  }
});
Object.defineProperty(exports, "differenceInDays", {
  enumerable: true,
  get: function () {
    return _index26.default;
  }
});
Object.defineProperty(exports, "differenceInHours", {
  enumerable: true,
  get: function () {
    return _index27.default;
  }
});
Object.defineProperty(exports, "differenceInISOWeekYears", {
  enumerable: true,
  get: function () {
    return _index28.default;
  }
});
Object.defineProperty(exports, "differenceInMilliseconds", {
  enumerable: true,
  get: function () {
    return _index29.default;
  }
});
Object.defineProperty(exports, "differenceInMinutes", {
  enumerable: true,
  get: function () {
    return _index30.default;
  }
});
Object.defineProperty(exports, "differenceInMonths", {
  enumerable: true,
  get: function () {
    return _index31.default;
  }
});
Object.defineProperty(exports, "differenceInQuarters", {
  enumerable: true,
  get: function () {
    return _index32.default;
  }
});
Object.defineProperty(exports, "differenceInSeconds", {
  enumerable: true,
  get: function () {
    return _index33.default;
  }
});
Object.defineProperty(exports, "differenceInWeeks", {
  enumerable: true,
  get: function () {
    return _index34.default;
  }
});
Object.defineProperty(exports, "differenceInYears", {
  enumerable: true,
  get: function () {
    return _index35.default;
  }
});
Object.defineProperty(exports, "eachDayOfInterval", {
  enumerable: true,
  get: function () {
    return _index36.default;
  }
});
Object.defineProperty(exports, "eachHourOfInterval", {
  enumerable: true,
  get: function () {
    return _index37.default;
  }
});
Object.defineProperty(exports, "eachMonthOfInterval", {
  enumerable: true,
  get: function () {
    return _index38.default;
  }
});
Object.defineProperty(exports, "eachQuarterOfInterval", {
  enumerable: true,
  get: function () {
    return _index39.default;
  }
});
Object.defineProperty(exports, "eachWeekOfInterval", {
  enumerable: true,
  get: function () {
    return _index40.default;
  }
});
Object.defineProperty(exports, "eachWeekendOfInterval", {
  enumerable: true,
  get: function () {
    return _index41.default;
  }
});
Object.defineProperty(exports, "eachWeekendOfMonth", {
  enumerable: true,
  get: function () {
    return _index42.default;
  }
});
Object.defineProperty(exports, "eachWeekendOfYear", {
  enumerable: true,
  get: function () {
    return _index43.default;
  }
});
Object.defineProperty(exports, "eachYearOfInterval", {
  enumerable: true,
  get: function () {
    return _index44.default;
  }
});
Object.defineProperty(exports, "endOfDay", {
  enumerable: true,
  get: function () {
    return _index45.default;
  }
});
Object.defineProperty(exports, "endOfDecade", {
  enumerable: true,
  get: function () {
    return _index46.default;
  }
});
Object.defineProperty(exports, "endOfHour", {
  enumerable: true,
  get: function () {
    return _index47.default;
  }
});
Object.defineProperty(exports, "endOfISOWeek", {
  enumerable: true,
  get: function () {
    return _index48.default;
  }
});
Object.defineProperty(exports, "endOfISOWeekYear", {
  enumerable: true,
  get: function () {
    return _index49.default;
  }
});
Object.defineProperty(exports, "endOfMinute", {
  enumerable: true,
  get: function () {
    return _index50.default;
  }
});
Object.defineProperty(exports, "endOfMonth", {
  enumerable: true,
  get: function () {
    return _index51.default;
  }
});
Object.defineProperty(exports, "endOfQuarter", {
  enumerable: true,
  get: function () {
    return _index52.default;
  }
});
Object.defineProperty(exports, "endOfSecond", {
  enumerable: true,
  get: function () {
    return _index53.default;
  }
});
Object.defineProperty(exports, "endOfToday", {
  enumerable: true,
  get: function () {
    return _index54.default;
  }
});
Object.defineProperty(exports, "endOfTomorrow", {
  enumerable: true,
  get: function () {
    return _index55.default;
  }
});
Object.defineProperty(exports, "endOfWeek", {
  enumerable: true,
  get: function () {
    return _index56.default;
  }
});
Object.defineProperty(exports, "endOfYear", {
  enumerable: true,
  get: function () {
    return _index57.default;
  }
});
Object.defineProperty(exports, "endOfYesterday", {
  enumerable: true,
  get: function () {
    return _index58.default;
  }
});
Object.defineProperty(exports, "format", {
  enumerable: true,
  get: function () {
    return _index59.default;
  }
});
Object.defineProperty(exports, "formatDistance", {
  enumerable: true,
  get: function () {
    return _index60.default;
  }
});
Object.defineProperty(exports, "formatDistanceStrict", {
  enumerable: true,
  get: function () {
    return _index61.default;
  }
});
Object.defineProperty(exports, "formatDistanceToNow", {
  enumerable: true,
  get: function () {
    return _index62.default;
  }
});
Object.defineProperty(exports, "formatDistanceToNowStrict", {
  enumerable: true,
  get: function () {
    return _index63.default;
  }
});
Object.defineProperty(exports, "formatDuration", {
  enumerable: true,
  get: function () {
    return _index64.default;
  }
});
Object.defineProperty(exports, "formatISO", {
  enumerable: true,
  get: function () {
    return _index65.default;
  }
});
Object.defineProperty(exports, "formatISO9075", {
  enumerable: true,
  get: function () {
    return _index66.default;
  }
});
Object.defineProperty(exports, "formatISODuration", {
  enumerable: true,
  get: function () {
    return _index67.default;
  }
});
Object.defineProperty(exports, "formatRFC3339", {
  enumerable: true,
  get: function () {
    return _index68.default;
  }
});
Object.defineProperty(exports, "formatRFC7231", {
  enumerable: true,
  get: function () {
    return _index69.default;
  }
});
Object.defineProperty(exports, "formatRelative", {
  enumerable: true,
  get: function () {
    return _index70.default;
  }
});
Object.defineProperty(exports, "fromUnixTime", {
  enumerable: true,
  get: function () {
    return _index71.default;
  }
});
Object.defineProperty(exports, "getDate", {
  enumerable: true,
  get: function () {
    return _index72.default;
  }
});
Object.defineProperty(exports, "getDay", {
  enumerable: true,
  get: function () {
    return _index73.default;
  }
});
Object.defineProperty(exports, "getDayOfYear", {
  enumerable: true,
  get: function () {
    return _index74.default;
  }
});
Object.defineProperty(exports, "getDaysInMonth", {
  enumerable: true,
  get: function () {
    return _index75.default;
  }
});
Object.defineProperty(exports, "getDaysInYear", {
  enumerable: true,
  get: function () {
    return _index76.default;
  }
});
Object.defineProperty(exports, "getDecade", {
  enumerable: true,
  get: function () {
    return _index77.default;
  }
});
Object.defineProperty(exports, "getHours", {
  enumerable: true,
  get: function () {
    return _index78.default;
  }
});
Object.defineProperty(exports, "getISODay", {
  enumerable: true,
  get: function () {
    return _index79.default;
  }
});
Object.defineProperty(exports, "getISOWeek", {
  enumerable: true,
  get: function () {
    return _index80.default;
  }
});
Object.defineProperty(exports, "getISOWeekYear", {
  enumerable: true,
  get: function () {
    return _index81.default;
  }
});
Object.defineProperty(exports, "getISOWeeksInYear", {
  enumerable: true,
  get: function () {
    return _index82.default;
  }
});
Object.defineProperty(exports, "getMilliseconds", {
  enumerable: true,
  get: function () {
    return _index83.default;
  }
});
Object.defineProperty(exports, "getMinutes", {
  enumerable: true,
  get: function () {
    return _index84.default;
  }
});
Object.defineProperty(exports, "getMonth", {
  enumerable: true,
  get: function () {
    return _index85.default;
  }
});
Object.defineProperty(exports, "getOverlappingDaysInIntervals", {
  enumerable: true,
  get: function () {
    return _index86.default;
  }
});
Object.defineProperty(exports, "getQuarter", {
  enumerable: true,
  get: function () {
    return _index87.default;
  }
});
Object.defineProperty(exports, "getSeconds", {
  enumerable: true,
  get: function () {
    return _index88.default;
  }
});
Object.defineProperty(exports, "getTime", {
  enumerable: true,
  get: function () {
    return _index89.default;
  }
});
Object.defineProperty(exports, "getUnixTime", {
  enumerable: true,
  get: function () {
    return _index90.default;
  }
});
Object.defineProperty(exports, "getWeek", {
  enumerable: true,
  get: function () {
    return _index91.default;
  }
});
Object.defineProperty(exports, "getWeekOfMonth", {
  enumerable: true,
  get: function () {
    return _index92.default;
  }
});
Object.defineProperty(exports, "getWeekYear", {
  enumerable: true,
  get: function () {
    return _index93.default;
  }
});
Object.defineProperty(exports, "getWeeksInMonth", {
  enumerable: true,
  get: function () {
    return _index94.default;
  }
});
Object.defineProperty(exports, "getYear", {
  enumerable: true,
  get: function () {
    return _index95.default;
  }
});
Object.defineProperty(exports, "intervalToDuration", {
  enumerable: true,
  get: function () {
    return _index96.default;
  }
});
Object.defineProperty(exports, "isAfter", {
  enumerable: true,
  get: function () {
    return _index97.default;
  }
});
Object.defineProperty(exports, "isBefore", {
  enumerable: true,
  get: function () {
    return _index98.default;
  }
});
Object.defineProperty(exports, "isDate", {
  enumerable: true,
  get: function () {
    return _index99.default;
  }
});
Object.defineProperty(exports, "isEqual", {
  enumerable: true,
  get: function () {
    return _index100.default;
  }
});
Object.defineProperty(exports, "isExists", {
  enumerable: true,
  get: function () {
    return _index101.default;
  }
});
Object.defineProperty(exports, "isFirstDayOfMonth", {
  enumerable: true,
  get: function () {
    return _index102.default;
  }
});
Object.defineProperty(exports, "isFriday", {
  enumerable: true,
  get: function () {
    return _index103.default;
  }
});
Object.defineProperty(exports, "isFuture", {
  enumerable: true,
  get: function () {
    return _index104.default;
  }
});
Object.defineProperty(exports, "isLastDayOfMonth", {
  enumerable: true,
  get: function () {
    return _index105.default;
  }
});
Object.defineProperty(exports, "isLeapYear", {
  enumerable: true,
  get: function () {
    return _index106.default;
  }
});
Object.defineProperty(exports, "isMatch", {
  enumerable: true,
  get: function () {
    return _index107.default;
  }
});
Object.defineProperty(exports, "isMonday", {
  enumerable: true,
  get: function () {
    return _index108.default;
  }
});
Object.defineProperty(exports, "isPast", {
  enumerable: true,
  get: function () {
    return _index109.default;
  }
});
Object.defineProperty(exports, "isSameDay", {
  enumerable: true,
  get: function () {
    return _index110.default;
  }
});
Object.defineProperty(exports, "isSameHour", {
  enumerable: true,
  get: function () {
    return _index111.default;
  }
});
Object.defineProperty(exports, "isSameISOWeek", {
  enumerable: true,
  get: function () {
    return _index112.default;
  }
});
Object.defineProperty(exports, "isSameISOWeekYear", {
  enumerable: true,
  get: function () {
    return _index113.default;
  }
});
Object.defineProperty(exports, "isSameMinute", {
  enumerable: true,
  get: function () {
    return _index114.default;
  }
});
Object.defineProperty(exports, "isSameMonth", {
  enumerable: true,
  get: function () {
    return _index115.default;
  }
});
Object.defineProperty(exports, "isSameQuarter", {
  enumerable: true,
  get: function () {
    return _index116.default;
  }
});
Object.defineProperty(exports, "isSameSecond", {
  enumerable: true,
  get: function () {
    return _index117.default;
  }
});
Object.defineProperty(exports, "isSameWeek", {
  enumerable: true,
  get: function () {
    return _index118.default;
  }
});
Object.defineProperty(exports, "isSameYear", {
  enumerable: true,
  get: function () {
    return _index119.default;
  }
});
Object.defineProperty(exports, "isSaturday", {
  enumerable: true,
  get: function () {
    return _index120.default;
  }
});
Object.defineProperty(exports, "isSunday", {
  enumerable: true,
  get: function () {
    return _index121.default;
  }
});
Object.defineProperty(exports, "isThisHour", {
  enumerable: true,
  get: function () {
    return _index122.default;
  }
});
Object.defineProperty(exports, "isThisISOWeek", {
  enumerable: true,
  get: function () {
    return _index123.default;
  }
});
Object.defineProperty(exports, "isThisMinute", {
  enumerable: true,
  get: function () {
    return _index124.default;
  }
});
Object.defineProperty(exports, "isThisMonth", {
  enumerable: true,
  get: function () {
    return _index125.default;
  }
});
Object.defineProperty(exports, "isThisQuarter", {
  enumerable: true,
  get: function () {
    return _index126.default;
  }
});
Object.defineProperty(exports, "isThisSecond", {
  enumerable: true,
  get: function () {
    return _index127.default;
  }
});
Object.defineProperty(exports, "isThisWeek", {
  enumerable: true,
  get: function () {
    return _index128.default;
  }
});
Object.defineProperty(exports, "isThisYear", {
  enumerable: true,
  get: function () {
    return _index129.default;
  }
});
Object.defineProperty(exports, "isThursday", {
  enumerable: true,
  get: function () {
    return _index130.default;
  }
});
Object.defineProperty(exports, "isToday", {
  enumerable: true,
  get: function () {
    return _index131.default;
  }
});
Object.defineProperty(exports, "isTomorrow", {
  enumerable: true,
  get: function () {
    return _index132.default;
  }
});
Object.defineProperty(exports, "isTuesday", {
  enumerable: true,
  get: function () {
    return _index133.default;
  }
});
Object.defineProperty(exports, "isValid", {
  enumerable: true,
  get: function () {
    return _index134.default;
  }
});
Object.defineProperty(exports, "isWednesday", {
  enumerable: true,
  get: function () {
    return _index135.default;
  }
});
Object.defineProperty(exports, "isWeekend", {
  enumerable: true,
  get: function () {
    return _index136.default;
  }
});
Object.defineProperty(exports, "isWithinInterval", {
  enumerable: true,
  get: function () {
    return _index137.default;
  }
});
Object.defineProperty(exports, "isYesterday", {
  enumerable: true,
  get: function () {
    return _index138.default;
  }
});
Object.defineProperty(exports, "lastDayOfDecade", {
  enumerable: true,
  get: function () {
    return _index139.default;
  }
});
Object.defineProperty(exports, "lastDayOfISOWeek", {
  enumerable: true,
  get: function () {
    return _index140.default;
  }
});
Object.defineProperty(exports, "lastDayOfISOWeekYear", {
  enumerable: true,
  get: function () {
    return _index141.default;
  }
});
Object.defineProperty(exports, "lastDayOfMonth", {
  enumerable: true,
  get: function () {
    return _index142.default;
  }
});
Object.defineProperty(exports, "lastDayOfQuarter", {
  enumerable: true,
  get: function () {
    return _index143.default;
  }
});
Object.defineProperty(exports, "lastDayOfWeek", {
  enumerable: true,
  get: function () {
    return _index144.default;
  }
});
Object.defineProperty(exports, "lastDayOfYear", {
  enumerable: true,
  get: function () {
    return _index145.default;
  }
});
Object.defineProperty(exports, "lightFormat", {
  enumerable: true,
  get: function () {
    return _index146.default;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function () {
    return _index147.default;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function () {
    return _index148.default;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _index149.default;
  }
});
Object.defineProperty(exports, "parseISO", {
  enumerable: true,
  get: function () {
    return _index150.default;
  }
});
Object.defineProperty(exports, "parseJSON", {
  enumerable: true,
  get: function () {
    return _index151.default;
  }
});
Object.defineProperty(exports, "roundToNearestMinutes", {
  enumerable: true,
  get: function () {
    return _index152.default;
  }
});
Object.defineProperty(exports, "set", {
  enumerable: true,
  get: function () {
    return _index153.default;
  }
});
Object.defineProperty(exports, "setDate", {
  enumerable: true,
  get: function () {
    return _index154.default;
  }
});
Object.defineProperty(exports, "setDay", {
  enumerable: true,
  get: function () {
    return _index155.default;
  }
});
Object.defineProperty(exports, "setDayOfYear", {
  enumerable: true,
  get: function () {
    return _index156.default;
  }
});
Object.defineProperty(exports, "setHours", {
  enumerable: true,
  get: function () {
    return _index157.default;
  }
});
Object.defineProperty(exports, "setISODay", {
  enumerable: true,
  get: function () {
    return _index158.default;
  }
});
Object.defineProperty(exports, "setISOWeek", {
  enumerable: true,
  get: function () {
    return _index159.default;
  }
});
Object.defineProperty(exports, "setISOWeekYear", {
  enumerable: true,
  get: function () {
    return _index160.default;
  }
});
Object.defineProperty(exports, "setMilliseconds", {
  enumerable: true,
  get: function () {
    return _index161.default;
  }
});
Object.defineProperty(exports, "setMinutes", {
  enumerable: true,
  get: function () {
    return _index162.default;
  }
});
Object.defineProperty(exports, "setMonth", {
  enumerable: true,
  get: function () {
    return _index163.default;
  }
});
Object.defineProperty(exports, "setQuarter", {
  enumerable: true,
  get: function () {
    return _index164.default;
  }
});
Object.defineProperty(exports, "setSeconds", {
  enumerable: true,
  get: function () {
    return _index165.default;
  }
});
Object.defineProperty(exports, "setWeek", {
  enumerable: true,
  get: function () {
    return _index166.default;
  }
});
Object.defineProperty(exports, "setWeekYear", {
  enumerable: true,
  get: function () {
    return _index167.default;
  }
});
Object.defineProperty(exports, "setYear", {
  enumerable: true,
  get: function () {
    return _index168.default;
  }
});
Object.defineProperty(exports, "startOfDay", {
  enumerable: true,
  get: function () {
    return _index169.default;
  }
});
Object.defineProperty(exports, "startOfDecade", {
  enumerable: true,
  get: function () {
    return _index170.default;
  }
});
Object.defineProperty(exports, "startOfHour", {
  enumerable: true,
  get: function () {
    return _index171.default;
  }
});
Object.defineProperty(exports, "startOfISOWeek", {
  enumerable: true,
  get: function () {
    return _index172.default;
  }
});
Object.defineProperty(exports, "startOfISOWeekYear", {
  enumerable: true,
  get: function () {
    return _index173.default;
  }
});
Object.defineProperty(exports, "startOfMinute", {
  enumerable: true,
  get: function () {
    return _index174.default;
  }
});
Object.defineProperty(exports, "startOfMonth", {
  enumerable: true,
  get: function () {
    return _index175.default;
  }
});
Object.defineProperty(exports, "startOfQuarter", {
  enumerable: true,
  get: function () {
    return _index176.default;
  }
});
Object.defineProperty(exports, "startOfSecond", {
  enumerable: true,
  get: function () {
    return _index177.default;
  }
});
Object.defineProperty(exports, "startOfToday", {
  enumerable: true,
  get: function () {
    return _index178.default;
  }
});
Object.defineProperty(exports, "startOfTomorrow", {
  enumerable: true,
  get: function () {
    return _index179.default;
  }
});
Object.defineProperty(exports, "startOfWeek", {
  enumerable: true,
  get: function () {
    return _index180.default;
  }
});
Object.defineProperty(exports, "startOfWeekYear", {
  enumerable: true,
  get: function () {
    return _index181.default;
  }
});
Object.defineProperty(exports, "startOfYear", {
  enumerable: true,
  get: function () {
    return _index182.default;
  }
});
Object.defineProperty(exports, "startOfYesterday", {
  enumerable: true,
  get: function () {
    return _index183.default;
  }
});
Object.defineProperty(exports, "sub", {
  enumerable: true,
  get: function () {
    return _index184.default;
  }
});
Object.defineProperty(exports, "subBusinessDays", {
  enumerable: true,
  get: function () {
    return _index185.default;
  }
});
Object.defineProperty(exports, "subDays", {
  enumerable: true,
  get: function () {
    return _index186.default;
  }
});
Object.defineProperty(exports, "subHours", {
  enumerable: true,
  get: function () {
    return _index187.default;
  }
});
Object.defineProperty(exports, "subISOWeekYears", {
  enumerable: true,
  get: function () {
    return _index188.default;
  }
});
Object.defineProperty(exports, "subMilliseconds", {
  enumerable: true,
  get: function () {
    return _index189.default;
  }
});
Object.defineProperty(exports, "subMinutes", {
  enumerable: true,
  get: function () {
    return _index190.default;
  }
});
Object.defineProperty(exports, "subMonths", {
  enumerable: true,
  get: function () {
    return _index191.default;
  }
});
Object.defineProperty(exports, "subQuarters", {
  enumerable: true,
  get: function () {
    return _index192.default;
  }
});
Object.defineProperty(exports, "subSeconds", {
  enumerable: true,
  get: function () {
    return _index193.default;
  }
});
Object.defineProperty(exports, "subWeeks", {
  enumerable: true,
  get: function () {
    return _index194.default;
  }
});
Object.defineProperty(exports, "subYears", {
  enumerable: true,
  get: function () {
    return _index195.default;
  }
});
Object.defineProperty(exports, "toDate", {
  enumerable: true,
  get: function () {
    return _index196.default;
  }
});

var _index = _interopRequireDefault(require("./add/index.js"));

var _index2 = _interopRequireDefault(require("./addBusinessDays/index.js"));

var _index3 = _interopRequireDefault(require("./addDays/index.js"));

var _index4 = _interopRequireDefault(require("./addHours/index.js"));

var _index5 = _interopRequireDefault(require("./addISOWeekYears/index.js"));

var _index6 = _interopRequireDefault(require("./addMilliseconds/index.js"));

var _index7 = _interopRequireDefault(require("./addMinutes/index.js"));

var _index8 = _interopRequireDefault(require("./addMonths/index.js"));

var _index9 = _interopRequireDefault(require("./addQuarters/index.js"));

var _index10 = _interopRequireDefault(require("./addSeconds/index.js"));

var _index11 = _interopRequireDefault(require("./addWeeks/index.js"));

var _index12 = _interopRequireDefault(require("./addYears/index.js"));

var _index13 = _interopRequireDefault(require("./areIntervalsOverlapping/index.js"));

var _index14 = _interopRequireDefault(require("./closestIndexTo/index.js"));

var _index15 = _interopRequireDefault(require("./closestTo/index.js"));

var _index16 = _interopRequireDefault(require("./compareAsc/index.js"));

var _index17 = _interopRequireDefault(require("./compareDesc/index.js"));

var _index18 = _interopRequireDefault(require("./differenceInBusinessDays/index.js"));

var _index19 = _interopRequireDefault(require("./differenceInCalendarDays/index.js"));

var _index20 = _interopRequireDefault(require("./differenceInCalendarISOWeekYears/index.js"));

var _index21 = _interopRequireDefault(require("./differenceInCalendarISOWeeks/index.js"));

var _index22 = _interopRequireDefault(require("./differenceInCalendarMonths/index.js"));

var _index23 = _interopRequireDefault(require("./differenceInCalendarQuarters/index.js"));

var _index24 = _interopRequireDefault(require("./differenceInCalendarWeeks/index.js"));

var _index25 = _interopRequireDefault(require("./differenceInCalendarYears/index.js"));

var _index26 = _interopRequireDefault(require("./differenceInDays/index.js"));

var _index27 = _interopRequireDefault(require("./differenceInHours/index.js"));

var _index28 = _interopRequireDefault(require("./differenceInISOWeekYears/index.js"));

var _index29 = _interopRequireDefault(require("./differenceInMilliseconds/index.js"));

var _index30 = _interopRequireDefault(require("./differenceInMinutes/index.js"));

var _index31 = _interopRequireDefault(require("./differenceInMonths/index.js"));

var _index32 = _interopRequireDefault(require("./differenceInQuarters/index.js"));

var _index33 = _interopRequireDefault(require("./differenceInSeconds/index.js"));

var _index34 = _interopRequireDefault(require("./differenceInWeeks/index.js"));

var _index35 = _interopRequireDefault(require("./differenceInYears/index.js"));

var _index36 = _interopRequireDefault(require("./eachDayOfInterval/index.js"));

var _index37 = _interopRequireDefault(require("./eachHourOfInterval/index.js"));

var _index38 = _interopRequireDefault(require("./eachMonthOfInterval/index.js"));

var _index39 = _interopRequireDefault(require("./eachQuarterOfInterval/index.js"));

var _index40 = _interopRequireDefault(require("./eachWeekOfInterval/index.js"));

var _index41 = _interopRequireDefault(require("./eachWeekendOfInterval/index.js"));

var _index42 = _interopRequireDefault(require("./eachWeekendOfMonth/index.js"));

var _index43 = _interopRequireDefault(require("./eachWeekendOfYear/index.js"));

var _index44 = _interopRequireDefault(require("./eachYearOfInterval/index.js"));

var _index45 = _interopRequireDefault(require("./endOfDay/index.js"));

var _index46 = _interopRequireDefault(require("./endOfDecade/index.js"));

var _index47 = _interopRequireDefault(require("./endOfHour/index.js"));

var _index48 = _interopRequireDefault(require("./endOfISOWeek/index.js"));

var _index49 = _interopRequireDefault(require("./endOfISOWeekYear/index.js"));

var _index50 = _interopRequireDefault(require("./endOfMinute/index.js"));

var _index51 = _interopRequireDefault(require("./endOfMonth/index.js"));

var _index52 = _interopRequireDefault(require("./endOfQuarter/index.js"));

var _index53 = _interopRequireDefault(require("./endOfSecond/index.js"));

var _index54 = _interopRequireDefault(require("./endOfToday/index.js"));

var _index55 = _interopRequireDefault(require("./endOfTomorrow/index.js"));

var _index56 = _interopRequireDefault(require("./endOfWeek/index.js"));

var _index57 = _interopRequireDefault(require("./endOfYear/index.js"));

var _index58 = _interopRequireDefault(require("./endOfYesterday/index.js"));

var _index59 = _interopRequireDefault(require("./format/index.js"));

var _index60 = _interopRequireDefault(require("./formatDistance/index.js"));

var _index61 = _interopRequireDefault(require("./formatDistanceStrict/index.js"));

var _index62 = _interopRequireDefault(require("./formatDistanceToNow/index.js"));

var _index63 = _interopRequireDefault(require("./formatDistanceToNowStrict/index.js"));

var _index64 = _interopRequireDefault(require("./formatDuration/index.js"));

var _index65 = _interopRequireDefault(require("./formatISO/index.js"));

var _index66 = _interopRequireDefault(require("./formatISO9075/index.js"));

var _index67 = _interopRequireDefault(require("./formatISODuration/index.js"));

var _index68 = _interopRequireDefault(require("./formatRFC3339/index.js"));

var _index69 = _interopRequireDefault(require("./formatRFC7231/index.js"));

var _index70 = _interopRequireDefault(require("./formatRelative/index.js"));

var _index71 = _interopRequireDefault(require("./fromUnixTime/index.js"));

var _index72 = _interopRequireDefault(require("./getDate/index.js"));

var _index73 = _interopRequireDefault(require("./getDay/index.js"));

var _index74 = _interopRequireDefault(require("./getDayOfYear/index.js"));

var _index75 = _interopRequireDefault(require("./getDaysInMonth/index.js"));

var _index76 = _interopRequireDefault(require("./getDaysInYear/index.js"));

var _index77 = _interopRequireDefault(require("./getDecade/index.js"));

var _index78 = _interopRequireDefault(require("./getHours/index.js"));

var _index79 = _interopRequireDefault(require("./getISODay/index.js"));

var _index80 = _interopRequireDefault(require("./getISOWeek/index.js"));

var _index81 = _interopRequireDefault(require("./getISOWeekYear/index.js"));

var _index82 = _interopRequireDefault(require("./getISOWeeksInYear/index.js"));

var _index83 = _interopRequireDefault(require("./getMilliseconds/index.js"));

var _index84 = _interopRequireDefault(require("./getMinutes/index.js"));

var _index85 = _interopRequireDefault(require("./getMonth/index.js"));

var _index86 = _interopRequireDefault(require("./getOverlappingDaysInIntervals/index.js"));

var _index87 = _interopRequireDefault(require("./getQuarter/index.js"));

var _index88 = _interopRequireDefault(require("./getSeconds/index.js"));

var _index89 = _interopRequireDefault(require("./getTime/index.js"));

var _index90 = _interopRequireDefault(require("./getUnixTime/index.js"));

var _index91 = _interopRequireDefault(require("./getWeek/index.js"));

var _index92 = _interopRequireDefault(require("./getWeekOfMonth/index.js"));

var _index93 = _interopRequireDefault(require("./getWeekYear/index.js"));

var _index94 = _interopRequireDefault(require("./getWeeksInMonth/index.js"));

var _index95 = _interopRequireDefault(require("./getYear/index.js"));

var _index96 = _interopRequireDefault(require("./intervalToDuration/index.js"));

var _index97 = _interopRequireDefault(require("./isAfter/index.js"));

var _index98 = _interopRequireDefault(require("./isBefore/index.js"));

var _index99 = _interopRequireDefault(require("./isDate/index.js"));

var _index100 = _interopRequireDefault(require("./isEqual/index.js"));

var _index101 = _interopRequireDefault(require("./isExists/index.js"));

var _index102 = _interopRequireDefault(require("./isFirstDayOfMonth/index.js"));

var _index103 = _interopRequireDefault(require("./isFriday/index.js"));

var _index104 = _interopRequireDefault(require("./isFuture/index.js"));

var _index105 = _interopRequireDefault(require("./isLastDayOfMonth/index.js"));

var _index106 = _interopRequireDefault(require("./isLeapYear/index.js"));

var _index107 = _interopRequireDefault(require("./isMatch/index.js"));

var _index108 = _interopRequireDefault(require("./isMonday/index.js"));

var _index109 = _interopRequireDefault(require("./isPast/index.js"));

var _index110 = _interopRequireDefault(require("./isSameDay/index.js"));

var _index111 = _interopRequireDefault(require("./isSameHour/index.js"));

var _index112 = _interopRequireDefault(require("./isSameISOWeek/index.js"));

var _index113 = _interopRequireDefault(require("./isSameISOWeekYear/index.js"));

var _index114 = _interopRequireDefault(require("./isSameMinute/index.js"));

var _index115 = _interopRequireDefault(require("./isSameMonth/index.js"));

var _index116 = _interopRequireDefault(require("./isSameQuarter/index.js"));

var _index117 = _interopRequireDefault(require("./isSameSecond/index.js"));

var _index118 = _interopRequireDefault(require("./isSameWeek/index.js"));

var _index119 = _interopRequireDefault(require("./isSameYear/index.js"));

var _index120 = _interopRequireDefault(require("./isSaturday/index.js"));

var _index121 = _interopRequireDefault(require("./isSunday/index.js"));

var _index122 = _interopRequireDefault(require("./isThisHour/index.js"));

var _index123 = _interopRequireDefault(require("./isThisISOWeek/index.js"));

var _index124 = _interopRequireDefault(require("./isThisMinute/index.js"));

var _index125 = _interopRequireDefault(require("./isThisMonth/index.js"));

var _index126 = _interopRequireDefault(require("./isThisQuarter/index.js"));

var _index127 = _interopRequireDefault(require("./isThisSecond/index.js"));

var _index128 = _interopRequireDefault(require("./isThisWeek/index.js"));

var _index129 = _interopRequireDefault(require("./isThisYear/index.js"));

var _index130 = _interopRequireDefault(require("./isThursday/index.js"));

var _index131 = _interopRequireDefault(require("./isToday/index.js"));

var _index132 = _interopRequireDefault(require("./isTomorrow/index.js"));

var _index133 = _interopRequireDefault(require("./isTuesday/index.js"));

var _index134 = _interopRequireDefault(require("./isValid/index.js"));

var _index135 = _interopRequireDefault(require("./isWednesday/index.js"));

var _index136 = _interopRequireDefault(require("./isWeekend/index.js"));

var _index137 = _interopRequireDefault(require("./isWithinInterval/index.js"));

var _index138 = _interopRequireDefault(require("./isYesterday/index.js"));

var _index139 = _interopRequireDefault(require("./lastDayOfDecade/index.js"));

var _index140 = _interopRequireDefault(require("./lastDayOfISOWeek/index.js"));

var _index141 = _interopRequireDefault(require("./lastDayOfISOWeekYear/index.js"));

var _index142 = _interopRequireDefault(require("./lastDayOfMonth/index.js"));

var _index143 = _interopRequireDefault(require("./lastDayOfQuarter/index.js"));

var _index144 = _interopRequireDefault(require("./lastDayOfWeek/index.js"));

var _index145 = _interopRequireDefault(require("./lastDayOfYear/index.js"));

var _index146 = _interopRequireDefault(require("./lightFormat/index.js"));

var _index147 = _interopRequireDefault(require("./max/index.js"));

var _index148 = _interopRequireDefault(require("./min/index.js"));

var _index149 = _interopRequireDefault(require("./parse/index.js"));

var _index150 = _interopRequireDefault(require("./parseISO/index.js"));

var _index151 = _interopRequireDefault(require("./parseJSON/index.js"));

var _index152 = _interopRequireDefault(require("./roundToNearestMinutes/index.js"));

var _index153 = _interopRequireDefault(require("./set/index.js"));

var _index154 = _interopRequireDefault(require("./setDate/index.js"));

var _index155 = _interopRequireDefault(require("./setDay/index.js"));

var _index156 = _interopRequireDefault(require("./setDayOfYear/index.js"));

var _index157 = _interopRequireDefault(require("./setHours/index.js"));

var _index158 = _interopRequireDefault(require("./setISODay/index.js"));

var _index159 = _interopRequireDefault(require("./setISOWeek/index.js"));

var _index160 = _interopRequireDefault(require("./setISOWeekYear/index.js"));

var _index161 = _interopRequireDefault(require("./setMilliseconds/index.js"));

var _index162 = _interopRequireDefault(require("./setMinutes/index.js"));

var _index163 = _interopRequireDefault(require("./setMonth/index.js"));

var _index164 = _interopRequireDefault(require("./setQuarter/index.js"));

var _index165 = _interopRequireDefault(require("./setSeconds/index.js"));

var _index166 = _interopRequireDefault(require("./setWeek/index.js"));

var _index167 = _interopRequireDefault(require("./setWeekYear/index.js"));

var _index168 = _interopRequireDefault(require("./setYear/index.js"));

var _index169 = _interopRequireDefault(require("./startOfDay/index.js"));

var _index170 = _interopRequireDefault(require("./startOfDecade/index.js"));

var _index171 = _interopRequireDefault(require("./startOfHour/index.js"));

var _index172 = _interopRequireDefault(require("./startOfISOWeek/index.js"));

var _index173 = _interopRequireDefault(require("./startOfISOWeekYear/index.js"));

var _index174 = _interopRequireDefault(require("./startOfMinute/index.js"));

var _index175 = _interopRequireDefault(require("./startOfMonth/index.js"));

var _index176 = _interopRequireDefault(require("./startOfQuarter/index.js"));

var _index177 = _interopRequireDefault(require("./startOfSecond/index.js"));

var _index178 = _interopRequireDefault(require("./startOfToday/index.js"));

var _index179 = _interopRequireDefault(require("./startOfTomorrow/index.js"));

var _index180 = _interopRequireDefault(require("./startOfWeek/index.js"));

var _index181 = _interopRequireDefault(require("./startOfWeekYear/index.js"));

var _index182 = _interopRequireDefault(require("./startOfYear/index.js"));

var _index183 = _interopRequireDefault(require("./startOfYesterday/index.js"));

var _index184 = _interopRequireDefault(require("./sub/index.js"));

var _index185 = _interopRequireDefault(require("./subBusinessDays/index.js"));

var _index186 = _interopRequireDefault(require("./subDays/index.js"));

var _index187 = _interopRequireDefault(require("./subHours/index.js"));

var _index188 = _interopRequireDefault(require("./subISOWeekYears/index.js"));

var _index189 = _interopRequireDefault(require("./subMilliseconds/index.js"));

var _index190 = _interopRequireDefault(require("./subMinutes/index.js"));

var _index191 = _interopRequireDefault(require("./subMonths/index.js"));

var _index192 = _interopRequireDefault(require("./subQuarters/index.js"));

var _index193 = _interopRequireDefault(require("./subSeconds/index.js"));

var _index194 = _interopRequireDefault(require("./subWeeks/index.js"));

var _index195 = _interopRequireDefault(require("./subYears/index.js"));

var _index196 = _interopRequireDefault(require("./toDate/index.js"));

var _index197 = require("./constants/index.js");

Object.keys(_index197).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index197[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./add/index.js":"dbc152ece63d89d8bdc08cbfd38c638f","./addBusinessDays/index.js":"e461bf4ab3d2c090b0e29faa612bfb12","./addDays/index.js":"5fdec9afb4e5b1ea71ca3db109ea4b4a","./addHours/index.js":"cd47d6b53a35480fa364f0daccc1ea68","./addISOWeekYears/index.js":"0597a676a6f18ebb7f1c8b05acab95aa","./addMilliseconds/index.js":"c4e4e6442c21d238185ea6cfbfc467c7","./addMinutes/index.js":"6add3d9bd711b465b1f3fcfd9dbaacef","./addMonths/index.js":"c378d91acb6a81ab70e2f3bf5c6f8f0b","./addQuarters/index.js":"928b02c9289f2a44dc206b85a4f19db0","./addSeconds/index.js":"06da1dae2be75137482b0934e6a816e4","./addWeeks/index.js":"d7f228172dbd1739d5d2624dd7fbb932","./addYears/index.js":"e3b1a16fd74a5e331a21f425de5cae3a","./areIntervalsOverlapping/index.js":"e47bf185512c165acce5a3741e0c6e04","./closestIndexTo/index.js":"8381fcdddd0fdf1fc4fd28334af2f2aa","./closestTo/index.js":"7fea8f1ae7de29ba39f17c90da0ea282","./compareAsc/index.js":"b04482b11d51799a5c68a70b87615149","./compareDesc/index.js":"e02fecb119e20fe80086932a10da9ed7","./differenceInBusinessDays/index.js":"eddd240809e8fee5af7f8f5bad8ac998","./differenceInCalendarDays/index.js":"8255b070c42b22dde4ff1d9e2d1f8222","./differenceInCalendarISOWeekYears/index.js":"18c16c5332fa4f63b09e67b9c7a7fc1b","./differenceInCalendarISOWeeks/index.js":"ec76ab77b7bb44461e431771fb94f6fc","./differenceInCalendarMonths/index.js":"e984a378c181216f952d3092b443aafe","./differenceInCalendarQuarters/index.js":"8e1087f3fd86a7da0e03c6c28d4e4212","./differenceInCalendarWeeks/index.js":"d4d5352b34b5aee15bb4569fd972b1cf","./differenceInCalendarYears/index.js":"b1fe2f7d039a16b07bc71fa8afb3fb98","./differenceInDays/index.js":"e72a5837ea1f56123b018d801f470db5","./differenceInHours/index.js":"92048a9d588a87285c40d130e50b6b68","./differenceInISOWeekYears/index.js":"9b4375424ff0357c135ad7ef30291ee6","./differenceInMilliseconds/index.js":"26b72fa6011e59ec2ab4f8e75a9c84f5","./differenceInMinutes/index.js":"77e3eae59cf68a6fdb8fa98359c05325","./differenceInMonths/index.js":"cb69a5f4f1d92f10394e57b4ab1bcbd0","./differenceInQuarters/index.js":"a02a8f0f2afe250f4823662a268803f7","./differenceInSeconds/index.js":"e36bd3db1290140be285bef03e3cf595","./differenceInWeeks/index.js":"a53a705bac8f744f6a4547bde44bebc8","./differenceInYears/index.js":"3cb153d4a0f49dc0186870c197a4b734","./eachDayOfInterval/index.js":"30e84481553b98cf72d4cbc1fc8c0e2b","./eachHourOfInterval/index.js":"923eb1ebe3e1942ce41572286f2fe691","./eachMonthOfInterval/index.js":"946da497007277cb7e59a6b9a12d31c2","./eachQuarterOfInterval/index.js":"0b98245e34fffb5cd9e6bd82d29b63b2","./eachWeekOfInterval/index.js":"6870f81cf26a7c18a8196bcedfc05685","./eachWeekendOfInterval/index.js":"394859bd13016bd8353d2891dcaab335","./eachWeekendOfMonth/index.js":"8e0966d62adce416522ef62832c07b2a","./eachWeekendOfYear/index.js":"25254f6429c18f2c8bb810591eaea380","./eachYearOfInterval/index.js":"d4d34126fc2fa29ea78e984c22e374b9","./endOfDay/index.js":"ad0eb03bd09a3bb13c3ba6ca29582aac","./endOfDecade/index.js":"675e51ca6e9a18bbb85b85a48291192d","./endOfHour/index.js":"99c14fbb29ece220627d0b749c9b69a0","./endOfISOWeek/index.js":"1f67ae1ce17426b004656e0d42115075","./endOfISOWeekYear/index.js":"2702e02bbede1ff194db4b63f3c6d5f4","./endOfMinute/index.js":"f2c85f2643486d739872940cb479184c","./endOfMonth/index.js":"13de8359936822f10aa6792c9ec3415b","./endOfQuarter/index.js":"5829e3cbf279671a678ef447081faf9e","./endOfSecond/index.js":"fe443b00c99bb183746141467747d68c","./endOfToday/index.js":"99273d15b894708ed794b2508b31d46c","./endOfTomorrow/index.js":"8e495b2d2946155bce8800c44171ff02","./endOfWeek/index.js":"0dbe9973f377852a567dffa03a94feb5","./endOfYear/index.js":"1af7d1321e39f626a1be376833fa51fa","./endOfYesterday/index.js":"76fefa545970aabab7afa8b654656a2b","./format/index.js":"c217462ea1c04722fbe0db40230d04da","./formatDistance/index.js":"f26f2bc96ec50f6f32d2e74132053377","./formatDistanceStrict/index.js":"cad7995075a76bac8ef24c788ff855d5","./formatDistanceToNow/index.js":"e3a91c3d174f69e12f671cb9cbf559d6","./formatDistanceToNowStrict/index.js":"4287171b502a903b79ebcc55ca87c654","./formatDuration/index.js":"46046c529c6bfe793a16c15cce52341d","./formatISO/index.js":"cec88e60960d0931b8bb01acad62380a","./formatISO9075/index.js":"b21ae32a71a4abde22435b4dd50b72a7","./formatISODuration/index.js":"9511734b55c82b556eeea741e98b2529","./formatRFC3339/index.js":"337e1183fe2e777440e0896dc87d149d","./formatRFC7231/index.js":"d23e2348fc30428dcecca286a3cc6302","./formatRelative/index.js":"32883df9534093463c147e6f123c8121","./fromUnixTime/index.js":"78bd40dd208b9760ab8804267384e418","./getDate/index.js":"dfdbada56c5e909dbb4dc7f0e91a1072","./getDay/index.js":"fe98ca9a7a81ba5cd11fd41eef44d9f6","./getDayOfYear/index.js":"9c22dff0a24b471b4a422965091e531c","./getDaysInMonth/index.js":"8298413df5cc7073c82e7242ea292acd","./getDaysInYear/index.js":"41f8ca411898af0bc8fd0b4a36122a99","./getDecade/index.js":"467843cfb510d5293958569f428acf18","./getHours/index.js":"5183d01c6c581da2f9fe2961fef70b2f","./getISODay/index.js":"6a3e0610b347e6c8e6f76863aab4f479","./getISOWeek/index.js":"71883f1860b86a189ef2fc77e755a732","./getISOWeekYear/index.js":"29a61091f03d2559b5ae8dbb8640b0af","./getISOWeeksInYear/index.js":"e971f00d9a879791052a9d3649e54b73","./getMilliseconds/index.js":"535b0a56278f233d449b49867f7c0e19","./getMinutes/index.js":"feaaedb714ccb9855efd2709a78a5d17","./getMonth/index.js":"8dee39b68db47d65f6195a33239a626d","./getOverlappingDaysInIntervals/index.js":"67ef46684e15271c1e13bd8a9b83443c","./getQuarter/index.js":"648826ec24a33d43dc7a7aae676df432","./getSeconds/index.js":"7bd5a4d5b46a09bc32809037ff18634b","./getTime/index.js":"22861e17c251157a65c1c172dec5ec26","./getUnixTime/index.js":"9e48a7ab65268131d9bdb270fabd09d1","./getWeek/index.js":"a997e8e39a4da3af79e448fa39a525be","./getWeekOfMonth/index.js":"4708f77d239a2a7c12ee8ec587dd8bfa","./getWeekYear/index.js":"239b765e7843884489fe96ce6a15edf9","./getWeeksInMonth/index.js":"675c288b63035ef0f5617ddbc37187e9","./getYear/index.js":"7c62184b9bdaf8d2935707eb39476f0e","./intervalToDuration/index.js":"ff55739890702a124dd2f05b3251e692","./isAfter/index.js":"18372d0b3b61759ba962b2a2b35f5459","./isBefore/index.js":"64fead70a1ae27ab94c3936da1f68966","./isDate/index.js":"f8dc856ec7b070a9064f46eabc655589","./isEqual/index.js":"9002389ff04dcbcee3da6f5309c67e46","./isExists/index.js":"000b6b2ea0c996a6d63a91aa1dea72a7","./isFirstDayOfMonth/index.js":"44499fe204134bb46a09d8a800c23d5f","./isFriday/index.js":"b8df0f14e0bb3af5f063c737dc50dfc6","./isFuture/index.js":"7d8dfa1d074c1b4d18ac0018d57ff445","./isLastDayOfMonth/index.js":"edc74cad19c0b41205865fb2a8829ffc","./isLeapYear/index.js":"ef313748214a21b8b16038e2f5ad1d5e","./isMatch/index.js":"74b61f0febcdecdbee0d218835e2ff92","./isMonday/index.js":"f6bfe08b8d7d7835d9bc8e62d80794da","./isPast/index.js":"7a24ae0b780d99bc22ba24757009f9dc","./isSameDay/index.js":"444d26f8c29e5f455146d915b97fd66d","./isSameHour/index.js":"385f6ac118e285619ea9712563b8988e","./isSameISOWeek/index.js":"2db3ddd96ca94f2bf32fb95a4587cea7","./isSameISOWeekYear/index.js":"ba3c0e6f36d971c15ee11f326eaf6d42","./isSameMinute/index.js":"150dcf88a9186e501c8ddc097bd1e7d7","./isSameMonth/index.js":"81adb2ef01aae27ad4ce057c66c2656f","./isSameQuarter/index.js":"dd61663df2ab7c3c09a5cc1f7f46b2f7","./isSameSecond/index.js":"6fcb80b72940c3561a7d273d878bd881","./isSameWeek/index.js":"37fe8e6e10ab49bef0bdb83d65177d66","./isSameYear/index.js":"5e947007c9aa91445703fa03c1fa3743","./isSaturday/index.js":"ea4d946847e65dcc3b0eceba96bc5b54","./isSunday/index.js":"3d25d420af4143a09d4b2d3bf8e6338a","./isThisHour/index.js":"06d531dbcb1f239580b8e59d2daa1438","./isThisISOWeek/index.js":"578b008b8d5483a0a10d855f18efb76c","./isThisMinute/index.js":"ffd6095abe07ffd1e01d843dfd3fde95","./isThisMonth/index.js":"f4724bc521b4e96fc16503c3a3bb9f12","./isThisQuarter/index.js":"ecad26fa72313a4252b2b48f631d73f7","./isThisSecond/index.js":"01600f408c7ba656a6e61c717093b0c8","./isThisWeek/index.js":"9aa0211e673af75e1f5ee48c8e7dd507","./isThisYear/index.js":"8c1de84ae5a9d09a635123ebc2c64ab6","./isThursday/index.js":"9607416ea3b170ae8d77a290847d4c0d","./isToday/index.js":"67da3cd3ca238e192c0dd11d2aacf172","./isTomorrow/index.js":"3c07555b1dde6eabeabfa153d2487167","./isTuesday/index.js":"be83b9b29cf0fedd047879f7c1bdec85","./isValid/index.js":"e498f8242893901cb098193d741d5e7a","./isWednesday/index.js":"a3d7529edfe734998e30f5539a2f9ee7","./isWeekend/index.js":"e1bdc4b76a9814a07a461efe9dc25d58","./isWithinInterval/index.js":"3509ac09a6c7f1f41ad82e411146add7","./isYesterday/index.js":"656d68e013180585a56e31ee3cd32d59","./lastDayOfDecade/index.js":"83d6b22b1d0086d1798a4a6e965c8d2f","./lastDayOfISOWeek/index.js":"644b3635fcb0200454813043b0300ebb","./lastDayOfISOWeekYear/index.js":"5d7ff489623578ef313254fc1dd72f21","./lastDayOfMonth/index.js":"7d2f7158ed0821a6753f961942ce1a0c","./lastDayOfQuarter/index.js":"599f8b744c992cbaa64ec474a44a1a2f","./lastDayOfWeek/index.js":"a133e2aa766515de6db672ba39771a2c","./lastDayOfYear/index.js":"fc9356a5267f529004b5ac5c2d12fa63","./lightFormat/index.js":"e4ee3c1b701234b1d31f1584ebaf8850","./max/index.js":"85f164c93466a8032b1e63dd8dffdd5e","./min/index.js":"cb9968590348c3277d9086ce2d814ccf","./parse/index.js":"74f434cfff03493e820ee532b0e3d2f2","./parseISO/index.js":"39723a78eb8b374467405e532e310d94","./parseJSON/index.js":"16d5412446adeb40a9cf7840c93ec114","./roundToNearestMinutes/index.js":"b0061c9fe342923672da62c452cf1904","./set/index.js":"3aeb2a4c24eb0b0b0f160a8dc94f667c","./setDate/index.js":"e2dec063b4e5f7e9cbe7696b5d6e9666","./setDay/index.js":"a71fd34e1ecfa7761719202ba566a403","./setDayOfYear/index.js":"cedb3d267a5636728a65550cf793b5f5","./setHours/index.js":"8ceafa0198583670c2bccf4454f38794","./setISODay/index.js":"a3624be2c4911b06b3fa58307fce5f0d","./setISOWeek/index.js":"050399cd697636cd8e914dbc6186d831","./setISOWeekYear/index.js":"20fc0b1cd8ed7eb93f5dd4fef5d1c6e1","./setMilliseconds/index.js":"dca6009831992d9318e40f1684915140","./setMinutes/index.js":"09cd966935083291ac9970913055f927","./setMonth/index.js":"f1c5ebb39c2a668d3a445d46f935ca2c","./setQuarter/index.js":"21b5f859c69ef4933710126207ae21ab","./setSeconds/index.js":"614a3436499e906c08b869cdb16370ce","./setWeek/index.js":"f6718bd87379ed600a0e516621879633","./setWeekYear/index.js":"0a9036a4faff0278acde0c3bf4523d30","./setYear/index.js":"0980643c559e7cff77f6ce2c5d6034b4","./startOfDay/index.js":"744d936ab12e05d0425f696fac165804","./startOfDecade/index.js":"b2f1c99c79182001fe9763c34ffb30f2","./startOfHour/index.js":"1459963c5acd6a374d91d4ff8b87d166","./startOfISOWeek/index.js":"5cdfef1aaca2ce8eb5f04f653206d691","./startOfISOWeekYear/index.js":"8335b930839a50f32d190455599201c0","./startOfMinute/index.js":"fcee0c3b3244d2626be2d438770da43b","./startOfMonth/index.js":"7ab6abfabd43021d3a26e7331311a7cb","./startOfQuarter/index.js":"169a2e7964834756211ffaa78256e0de","./startOfSecond/index.js":"df63f10981bee5473694888e5f813faf","./startOfToday/index.js":"8dfe1c16ea542e8b1c7afa351a4fb2c7","./startOfTomorrow/index.js":"74fdb0c4bed6fd0542b5cca829f14bc1","./startOfWeek/index.js":"9773da116ecae709ccce70a09b54431c","./startOfWeekYear/index.js":"78e987916a9f12e1c18744fd944f6014","./startOfYear/index.js":"655a08231b6bc1822e7a69e1372d74f9","./startOfYesterday/index.js":"ad75d97f335f78ab3d3c0a0961f50744","./sub/index.js":"03521e77eb3ab73dd1ae4b9e11f0d7a1","./subBusinessDays/index.js":"5fde211b45ae5d3c2c4fdc7c1e19477c","./subDays/index.js":"70eaf93ad7b28e364c9f707a17d69bcf","./subHours/index.js":"a9708b84504bdd67663413519bc924d0","./subISOWeekYears/index.js":"090345afe34fd3cbc75d5a7eb0f96431","./subMilliseconds/index.js":"d4c3fa7c1a401b98fc12fd2f31ab3db4","./subMinutes/index.js":"c9b4820f62efa127bead6974eb642f14","./subMonths/index.js":"6e33148d4a1d84362d717b05a63adcee","./subQuarters/index.js":"afaa74b055749afcfe4234604fc159af","./subSeconds/index.js":"49ca86ad057e050f8cebdd01a06d5bfa","./subWeeks/index.js":"aee1d441e5f850d2ec745c4c6098dd09","./subYears/index.js":"35538a1800388d694d4ef9c863fea581","./toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","./constants/index.js":"fd3e1097ec67f3d6a19982ca02550c0a"}],"dbc152ece63d89d8bdc08cbfd38c638f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = add;

var _index = _interopRequireDefault(require("../addDays/index.js"));

var _index2 = _interopRequireDefault(require("../addMonths/index.js"));

var _index3 = _interopRequireDefault(require("../toDate/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

var _index5 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name add
 * @category Common Helpers
 * @summary Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Duration} duration - the object with years, months, weeks, days, hours, minutes and seconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 *
 * | Key            | Description                        |
 * |----------------|------------------------------------|
 * | years          | Amount of years to be added        |
 * | months         | Amount of months to be added       |
 * | weeks          | Amount of weeks to be added       |
 * | days           | Amount of days to be added         |
 * | hours          | Amount of hours to be added        |
 * | minutes        | Amount of minutes to be added      |
 * | seconds        | Amount of seconds to be added      |
 *
 * All values default to 0
 *
 * @returns {Date} the new date with the seconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add the following duration to 1 September 2014, 10:19:50
 * var result = add(new Date(2014, 8, 1, 10, 19, 50), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30,
 * })
 * //=> Thu Jun 15 2017 15:29:20
 */
function add(dirtyDate, duration) {
  (0, _index4.default)(2, arguments);
  if (!duration || typeof duration !== 'object') return new Date(NaN);
  var years = 'years' in duration ? (0, _index5.default)(duration.years) : 0;
  var months = 'months' in duration ? (0, _index5.default)(duration.months) : 0;
  var weeks = 'weeks' in duration ? (0, _index5.default)(duration.weeks) : 0;
  var days = 'days' in duration ? (0, _index5.default)(duration.days) : 0;
  var hours = 'hours' in duration ? (0, _index5.default)(duration.hours) : 0;
  var minutes = 'minutes' in duration ? (0, _index5.default)(duration.minutes) : 0;
  var seconds = 'seconds' in duration ? (0, _index5.default)(duration.seconds) : 0; // Add years and months

  var date = (0, _index3.default)(dirtyDate);
  var dateWithMonths = months || years ? (0, _index2.default)(date, months + years * 12) : date; // Add weeks and days

  var dateWithDays = days || weeks ? (0, _index.default)(dateWithMonths, days + weeks * 7) : dateWithMonths; // Add days, hours, minutes and seconds

  var minutesToAdd = minutes + hours * 60;
  var secondsToAdd = seconds + minutesToAdd * 60;
  var msToAdd = secondsToAdd * 1000;
  var finalDate = new Date(dateWithDays.getTime() + msToAdd);
  return finalDate;
}

module.exports = exports.default;
},{"../addDays/index.js":"5fdec9afb4e5b1ea71ca3db109ea4b4a","../addMonths/index.js":"c378d91acb6a81ab70e2f3bf5c6f8f0b","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e"}],"5fdec9afb4e5b1ea71ca3db109ea4b4a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addDays;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the days added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var amount = (0, _index.default)(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  date.setDate(date.getDate() + amount);
  return date;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"4f12886b17b9e27a855b6b6925f19f6e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toInteger;

function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

module.exports = exports.default;
},{}],"4d4cbccb04ce5990e942550dfe4cd445":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDate;

var _index = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  (0, _index.default)(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

module.exports = exports.default;
},{"../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"96233ac16f80ecbe82bbfc9a5dea36d1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requiredArgs;

function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

module.exports = exports.default;
},{}],"c378d91acb6a81ab70e2f3bf5c6f8f0b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMonths;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * var result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */
function addMonths(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var amount = (0, _index.default)(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  var dayOfMonth = date.getDate(); // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 1, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.

  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();

  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e461bf4ab3d2c090b0e29faa612bfb12":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addBusinessDays;

var _index = _interopRequireDefault(require("../isWeekend/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

var _index5 = _interopRequireDefault(require("../isSunday/index.js"));

var _index6 = _interopRequireDefault(require("../isSaturday/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addBusinessDays
 * @category Day Helpers
 * @summary Add the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Add the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of business days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the business days added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 10 business days to 1 September 2014:
 * var result = addBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Sep 15 2014 00:00:00 (skipped weekend days)
 */
function addBusinessDays(dirtyDate, dirtyAmount) {
  (0, _index4.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var startedOnWeekend = (0, _index.default)(date);
  var amount = (0, _index3.default)(dirtyAmount);
  if (isNaN(amount)) return new Date(NaN);
  var hours = date.getHours();
  var sign = amount < 0 ? -1 : 1;
  var fullWeeks = (0, _index3.default)(amount / 5);
  date.setDate(date.getDate() + fullWeeks * 7); // Get remaining days not part of a full week

  var restDays = Math.abs(amount % 5); // Loops over remaining days

  while (restDays > 0) {
    date.setDate(date.getDate() + sign);
    if (!(0, _index.default)(date)) restDays -= 1;
  } // If the date is a weekend day and we reduce a dividable of
  // 5 from it, we land on a weekend date.
  // To counter this, we add days accordingly to land on the next business day


  if (startedOnWeekend && (0, _index.default)(date) && amount !== 0) {
    // If we're reducing days, we want to add days until we land on a weekday
    // If we're adding days we want to reduce days until we land on a weekday
    if ((0, _index6.default)(date)) date.setDate(date.getDate() + (sign < 0 ? 2 : -1));
    if ((0, _index5.default)(date)) date.setDate(date.getDate() + (sign < 0 ? 1 : -2));
  } // Restore hours to avoid DST lag


  date.setHours(hours);
  return date;
}

module.exports = exports.default;
},{"../isWeekend/index.js":"e1bdc4b76a9814a07a461efe9dc25d58","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1","../isSunday/index.js":"3d25d420af4143a09d4b2d3bf8e6338a","../isSaturday/index.js":"ea4d946847e65dcc3b0eceba96bc5b54"}],"e1bdc4b76a9814a07a461efe9dc25d58":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWeekend;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isWeekend
 * @category Weekday Helpers
 * @summary Does the given date fall on a weekend?
 *
 * @description
 * Does the given date fall on a weekend?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date falls on a weekend
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Does 5 October 2014 fall on a weekend?
 * var result = isWeekend(new Date(2014, 9, 5))
 * //=> true
 */
function isWeekend(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var day = date.getDay();
  return day === 0 || day === 6;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"3d25d420af4143a09d4b2d3bf8e6338a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSunday;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSunday
 * @category Weekday Helpers
 * @summary Is the given date Sunday?
 *
 * @description
 * Is the given date Sunday?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Sunday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 21 September 2014 Sunday?
 * var result = isSunday(new Date(2014, 8, 21))
 * //=> true
 */
function isSunday(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate).getDay() === 0;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"ea4d946847e65dcc3b0eceba96bc5b54":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSaturday;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSaturday
 * @category Weekday Helpers
 * @summary Is the given date Saturday?
 *
 * @description
 * Is the given date Saturday?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Saturday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 27 September 2014 Saturday?
 * var result = isSaturday(new Date(2014, 8, 27))
 * //=> true
 */
function isSaturday(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate).getDay() === 6;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"cd47d6b53a35480fa364f0daccc1ea68":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addHours;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addMilliseconds/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_HOUR = 3600000;
/**
 * @name addHours
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the hours added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * var result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */

function addHours(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, amount * MILLISECONDS_IN_HOUR);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addMilliseconds/index.js":"c4e4e6442c21d238185ea6cfbfc467c7","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"c4e4e6442c21d238185ea6cfbfc467c7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMilliseconds;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var timestamp = (0, _index2.default)(dirtyDate).getTime();
  var amount = (0, _index.default)(dirtyAmount);
  return new Date(timestamp + amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"0597a676a6f18ebb7f1c8b05acab95aa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addISOWeekYears;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../getISOWeekYear/index.js"));

var _index3 = _interopRequireDefault(require("../setISOWeekYear/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `addISOYears` to `addISOWeekYears`.
 *   "ISO week year" is short for [ISO week-numbering year](https://en.wikipedia.org/wiki/ISO_week_date).
 *   This change makes the name consistent with
 *   locale-dependent week-numbering year helpers, e.g., `addWeekYears`.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of ISO week-numbering years to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the ISO week-numbering years added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 ISO week-numbering years to 2 July 2010:
 * var result = addISOWeekYears(new Date(2010, 6, 2), 5)
 * //=> Fri Jun 26 2015 00:00:00
 */
function addISOWeekYears(dirtyDate, dirtyAmount) {
  (0, _index4.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index3.default)(dirtyDate, (0, _index2.default)(dirtyDate) + amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../getISOWeekYear/index.js":"29a61091f03d2559b5ae8dbb8640b0af","../setISOWeekYear/index.js":"20fc0b1cd8ed7eb93f5dd4fef5d1c6e1","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"29a61091f03d2559b5ae8dbb8640b0af":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getISOWeekYear;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../startOfISOWeek/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `getISOYear` to `getISOWeekYear`.
 *   "ISO week year" is short for [ISO week-numbering year](https://en.wikipedia.org/wiki/ISO_week_date).
 *   This change makes the name consistent with
 *   locale-dependent week-numbering year helpers, e.g., `getWeekYear`.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the ISO week-numbering year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * var result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOWeekYear(dirtyDate) {
  (0, _index3.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var year = date.getFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = (0, _index2.default)(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = (0, _index2.default)(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../startOfISOWeek/index.js":"5cdfef1aaca2ce8eb5f04f653206d691","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"5cdfef1aaca2ce8eb5f04f653206d691":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfISOWeek;

var _index = _interopRequireDefault(require("../startOfWeek/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of an ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate, {
    weekStartsOn: 1
  });
}

module.exports = exports.default;
},{"../startOfWeek/index.js":"9773da116ecae709ccce70a09b54431c","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"9773da116ecae709ccce70a09b54431c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfWeek;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(dirtyDate, dirtyOptions) {
  (0, _index3.default)(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index2.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index2.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0, _index.default)(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"20fc0b1cd8ed7eb93f5dd4fef5d1c6e1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setISOWeekYear;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../startOfISOWeekYear/index.js"));

var _index4 = _interopRequireDefault(require("../differenceInCalendarDays/index.js"));

var _index5 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Set the ISO week-numbering year to the given date.
 *
 * @description
 * Set the ISO week-numbering year to the given date,
 * saving the week number and the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `setISOYear` to `setISOWeekYear`.
 *   "ISO week year" is short for [ISO week-numbering year](https://en.wikipedia.org/wiki/ISO_week_date).
 *   This change makes the name consistent with
 *   locale-dependent week-numbering year helpers, e.g., `setWeekYear`.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} isoWeekYear - the ISO week-numbering year of the new date
 * @returns {Date} the new date with the ISO week-numbering year set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set ISO week-numbering year 2007 to 29 December 2008:
 * var result = setISOWeekYear(new Date(2008, 11, 29), 2007)
 * //=> Mon Jan 01 2007 00:00:00
 */
function setISOWeekYear(dirtyDate, dirtyISOWeekYear) {
  (0, _index5.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var isoWeekYear = (0, _index.default)(dirtyISOWeekYear);
  var diff = (0, _index4.default)(date, (0, _index3.default)(date));
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(isoWeekYear, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  date = (0, _index3.default)(fourthOfJanuary);
  date.setDate(date.getDate() + diff);
  return date;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../startOfISOWeekYear/index.js":"8335b930839a50f32d190455599201c0","../differenceInCalendarDays/index.js":"8255b070c42b22dde4ff1d9e2d1f8222","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"8335b930839a50f32d190455599201c0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfISOWeekYear;

var _index = _interopRequireDefault(require("../getISOWeekYear/index.js"));

var _index2 = _interopRequireDefault(require("../startOfISOWeek/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of an ISO week-numbering year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * var result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOWeekYear(dirtyDate) {
  (0, _index3.default)(1, arguments);
  var year = (0, _index.default)(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = (0, _index2.default)(fourthOfJanuary);
  return date;
}

module.exports = exports.default;
},{"../getISOWeekYear/index.js":"29a61091f03d2559b5ae8dbb8640b0af","../startOfISOWeek/index.js":"5cdfef1aaca2ce8eb5f04f653206d691","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"8255b070c42b22dde4ff1d9e2d1f8222":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarDays;

var _index = _interopRequireDefault(require("../_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index2 = _interopRequireDefault(require("../startOfDay/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_DAY = 86400000;
/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * var result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  (0, _index3.default)(2, arguments);
  var startOfDayLeft = (0, _index2.default)(dirtyDateLeft);
  var startOfDayRight = (0, _index2.default)(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - (0, _index.default)(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - (0, _index.default)(startOfDayRight); // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

module.exports = exports.default;
},{"../_lib/getTimezoneOffsetInMilliseconds/index.js":"e1613370c964787e828d6e71e9590bf4","../startOfDay/index.js":"744d936ab12e05d0425f696fac165804","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e1613370c964787e828d6e71e9590bf4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTimezoneOffsetInMilliseconds;
var MILLISECONDS_IN_MINUTE = 60000;

function getDateMillisecondsPart(date) {
  return date.getTime() % MILLISECONDS_IN_MINUTE;
}
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */


function getTimezoneOffsetInMilliseconds(dirtyDate) {
  var date = new Date(dirtyDate.getTime());
  var baseTimezoneOffset = Math.ceil(date.getTimezoneOffset());
  date.setSeconds(0, 0);
  var hasNegativeUTCOffset = baseTimezoneOffset > 0;
  var millisecondsPartOfTimezoneOffset = hasNegativeUTCOffset ? (MILLISECONDS_IN_MINUTE + getDateMillisecondsPart(date)) % MILLISECONDS_IN_MINUTE : getDateMillisecondsPart(date);
  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;
}

module.exports = exports.default;
},{}],"744d936ab12e05d0425f696fac165804":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfDay;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"6add3d9bd711b465b1f3fcfd9dbaacef":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMinutes;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addMilliseconds/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_MINUTE = 60000;
/**
 * @name addMinutes
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the minutes added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */

function addMinutes(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, amount * MILLISECONDS_IN_MINUTE);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addMilliseconds/index.js":"c4e4e6442c21d238185ea6cfbfc467c7","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"928b02c9289f2a44dc206b85a4f19db0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addQuarters;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addMonths/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addQuarters
 * @category Quarter Helpers
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of quarters to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the quarters added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * var result = addQuarters(new Date(2014, 8, 1), 1)
 * //=> Mon Dec 01 2014 00:00:00
 */
function addQuarters(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  var months = amount * 3;
  return (0, _index2.default)(dirtyDate, months);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addMonths/index.js":"c378d91acb6a81ab70e2f3bf5c6f8f0b","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"06da1dae2be75137482b0934e6a816e4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addSeconds;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addMilliseconds/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addSeconds
 * @category Second Helpers
 * @summary Add the specified number of seconds to the given date.
 *
 * @description
 * Add the specified number of seconds to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of seconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the seconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 30 seconds to 10 July 2014 12:45:00:
 * var result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:45:30
 */
function addSeconds(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, amount * 1000);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addMilliseconds/index.js":"c4e4e6442c21d238185ea6cfbfc467c7","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"d7f228172dbd1739d5d2624dd7fbb932":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addWeeks;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addDays/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addWeeks
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of week to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the weeks added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * var result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
function addWeeks(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  var days = amount * 7;
  return (0, _index2.default)(dirtyDate, days);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addDays/index.js":"5fdec9afb4e5b1ea71ca3db109ea4b4a","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e3b1a16fd74a5e331a21f425de5cae3a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addYears;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addMonths/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the years added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * var result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, amount * 12);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addMonths/index.js":"c378d91acb6a81ab70e2f3bf5c6f8f0b","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e47bf185512c165acce5a3741e0c6e04":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = areIntervalsOverlapping;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name areIntervalsOverlapping
 * @category Interval Helpers
 * @summary Is the given time interval overlapping with another time interval?
 *
 * @description
 * Is the given time interval overlapping with another time interval? Adjacent intervals do not count as overlapping.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `areRangesOverlapping` to `areIntervalsOverlapping`.
 *   This change was made to mirror the use of the word "interval" in standard ISO 8601:2004 terminology:
 *
 *   ```
 *   2.1.3
 *   time interval
 *   part of the time axis limited by two instants
 *   ```
 *
 *   Also, this function now accepts an object with `start` and `end` properties
 *   instead of two arguments as an interval.
 *   This function now throws `RangeError` if the start of the interval is after its end
 *   or if any date in the interval is `Invalid Date`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   areRangesOverlapping(
 *     new Date(2014, 0, 10), new Date(2014, 0, 20),
 *     new Date(2014, 0, 17), new Date(2014, 0, 21)
 *   )
 *
 *   // v2.0.0 onward
 *
 *   areIntervalsOverlapping(
 *     { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *     { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 *   )
 *   ```
 *
 * @param {Interval} intervalLeft - the first interval to compare. See [Interval]{@link docs/types/Interval}
 * @param {Interval} intervalRight - the second interval to compare. See [Interval]{@link docs/types/Interval}
 * @param {Object} [options] - the object with options
 * @param {Boolean} [options.inclusive=false] - whether the comparison is inclusive or not
 * @returns {Boolean} whether the time intervals are overlapping
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> false
 *
 * @example
 * // For adjacent time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 *
 * @example
 * // Using the inclusive option:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) }
 * )
 * //=> false
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) },
 *   { inclusive: true }
 * )
 * //=> true
 */
function areIntervalsOverlapping(dirtyIntervalLeft, dirtyIntervalRight) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  (0, _index2.default)(2, arguments);
  var intervalLeft = dirtyIntervalLeft || {};
  var intervalRight = dirtyIntervalRight || {};
  var leftStartTime = (0, _index.default)(intervalLeft.start).getTime();
  var leftEndTime = (0, _index.default)(intervalLeft.end).getTime();
  var rightStartTime = (0, _index.default)(intervalRight.start).getTime();
  var rightEndTime = (0, _index.default)(intervalRight.end).getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(leftStartTime <= leftEndTime && rightStartTime <= rightEndTime)) {
    throw new RangeError('Invalid interval');
  }

  if (options.inclusive) {
    return leftStartTime <= rightEndTime && rightStartTime <= leftEndTime;
  }

  return leftStartTime < rightEndTime && rightStartTime < leftEndTime;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"8381fcdddd0fdf1fc4fd28334af2f2aa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closestIndexTo;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name closestIndexTo
 * @category Common Helpers
 * @summary Return an index of the closest date from the array comparing to the given date.
 *
 * @description
 * Return an index of the closest date from the array comparing to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - Now, `closestIndexTo` doesn't throw an exception
 *   when the second argument is not an array, and returns Invalid Date instead.
 *
 * @param {Date|Number} dateToCompare - the date to compare with
 * @param {Date[]|Number[]} datesArray - the array to search
 * @returns {Number} an index of the date closest to the given date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Which date is closer to 6 September 2015?
 * var dateToCompare = new Date(2015, 8, 6)
 * var datesArray = [
 *   new Date(2015, 0, 1),
 *   new Date(2016, 0, 1),
 *   new Date(2017, 0, 1)
 * ]
 * var result = closestIndexTo(dateToCompare, datesArray)
 * //=> 1
 */
function closestIndexTo(dirtyDateToCompare, dirtyDatesArray) {
  (0, _index2.default)(2, arguments);
  var dateToCompare = (0, _index.default)(dirtyDateToCompare);

  if (isNaN(dateToCompare)) {
    return NaN;
  }

  var timeToCompare = dateToCompare.getTime();
  var datesArray; // `dirtyDatesArray` is undefined or null

  if (dirtyDatesArray == null) {
    datesArray = []; // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
  } else if (typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray; // If `dirtyDatesArray` is Array-like Object, convert to Array. Otherwise, make it empty Array
  } else {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  }

  var result;
  var minDistance;
  datesArray.forEach(function (dirtyDate, index) {
    var currentDate = (0, _index.default)(dirtyDate);

    if (isNaN(currentDate)) {
      result = NaN;
      minDistance = NaN;
      return;
    }

    var distance = Math.abs(timeToCompare - currentDate.getTime());

    if (result == null || distance < minDistance) {
      result = index;
      minDistance = distance;
    }
  });
  return result;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"7fea8f1ae7de29ba39f17c90da0ea282":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closestTo;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name closestTo
 * @category Common Helpers
 * @summary Return a date from the array closest to the given date.
 *
 * @description
 * Return a date from the array closest to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - Now, `closestTo` doesn't throw an exception
 *   when the second argument is not an array, and returns Invalid Date instead.
 *
 * @param {Date|Number} dateToCompare - the date to compare with
 * @param {Date[]|Number[]} datesArray - the array to search
 * @returns {Date} the date from the array closest to the given date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
 * var dateToCompare = new Date(2015, 8, 6)
 * var result = closestTo(dateToCompare, [
 *   new Date(2000, 0, 1),
 *   new Date(2030, 0, 1)
 * ])
 * //=> Tue Jan 01 2030 00:00:00
 */
function closestTo(dirtyDateToCompare, dirtyDatesArray) {
  (0, _index2.default)(2, arguments);
  var dateToCompare = (0, _index.default)(dirtyDateToCompare);

  if (isNaN(dateToCompare)) {
    return new Date(NaN);
  }

  var timeToCompare = dateToCompare.getTime();
  var datesArray; // `dirtyDatesArray` is undefined or null

  if (dirtyDatesArray == null) {
    datesArray = []; // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
  } else if (typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray; // If `dirtyDatesArray` is Array-like Object, convert to Array. Otherwise, make it empty Array
  } else {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  }

  var result;
  var minDistance;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = (0, _index.default)(dirtyDate);

    if (isNaN(currentDate)) {
      result = new Date(NaN);
      minDistance = NaN;
      return;
    }

    var distance = Math.abs(timeToCompare - currentDate.getTime());

    if (result == null || distance < minDistance) {
      result = currentDate;
      minDistance = distance;
    }
  });
  return result;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"b04482b11d51799a5c68a70b87615149":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compareAsc;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * var result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * var result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e02fecb119e20fe80086932a10da9ed7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compareDesc;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name compareDesc
 * @category Common Helpers
 * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return -1 if the first date is after the second,
 * 1 if the first date is before the second or 0 if dates are equal.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:
 * var result = compareDesc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> 1
 *
 * @example
 * // Sort the array of dates in reverse chronological order:
 * var result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareDesc)
 * //=> [
 * //   Sun Jul 02 1995 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Wed Feb 11 1987 00:00:00
 * // ]
 */
function compareDesc(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();

  if (diff > 0) {
    return -1;
  } else if (diff < 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"eddd240809e8fee5af7f8f5bad8ac998":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInBusinessDays;

var _index = _interopRequireDefault(require("../isValid/index.js"));

var _index2 = _interopRequireDefault(require("../isWeekend/index.js"));

var _index3 = _interopRequireDefault(require("../toDate/index.js"));

var _index4 = _interopRequireDefault(require("../differenceInCalendarDays/index.js"));

var _index5 = _interopRequireDefault(require("../addDays/index.js"));

var _index6 = _interopRequireDefault(require("../isSameDay/index.js"));

var _index7 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index8 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInBusinessDays
 * @category Day Helpers
 * @summary Get the number of business days between the given dates.
 *
 * @description
 * Get the number of business day periods between the given dates.
 * Business days being days that arent in the weekend.
 * Like `differenceInCalendarDays`, the function removes the times from
 * the dates before calculating the difference.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of business days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many business days are between
 * // 10 January 2014 and 20 July 2014?
 * var result = differenceInBusinessDays(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 0, 10)
 * )
 * //=> 136
 */
function differenceInBusinessDays(dirtyDateLeft, dirtyDateRight) {
  (0, _index8.default)(2, arguments);
  var dateLeft = (0, _index3.default)(dirtyDateLeft);
  var dateRight = (0, _index3.default)(dirtyDateRight);
  if (!(0, _index.default)(dateLeft) || !(0, _index.default)(dateRight)) return new Date(NaN);
  var calendarDifference = (0, _index4.default)(dateLeft, dateRight);
  var sign = calendarDifference < 0 ? -1 : 1;
  var weeks = (0, _index7.default)(calendarDifference / 7);
  var result = weeks * 5;
  dateRight = (0, _index5.default)(dateRight, weeks * 7); // the loop below will run at most 6 times to account for the remaining days that don't makeup a full week

  while (!(0, _index6.default)(dateLeft, dateRight)) {
    // sign is used to account for both negative and positive differences
    result += (0, _index2.default)(dateRight) ? 0 : sign;
    dateRight = (0, _index5.default)(dateRight, sign);
  }

  return result === 0 ? 0 : result;
}

module.exports = exports.default;
},{"../isValid/index.js":"e498f8242893901cb098193d741d5e7a","../isWeekend/index.js":"e1bdc4b76a9814a07a461efe9dc25d58","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../differenceInCalendarDays/index.js":"8255b070c42b22dde4ff1d9e2d1f8222","../addDays/index.js":"5fdec9afb4e5b1ea71ca3db109ea4b4a","../isSameDay/index.js":"444d26f8c29e5f455146d915b97fd66d","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e498f8242893901cb098193d741d5e7a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValid;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - Now `isValid` doesn't throw an exception
 *   if the first argument is not an instance of Date.
 *   Instead, argument is converted beforehand using `toDate`.
 *
 *   Examples:
 *
 *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
 *   |---------------------------|---------------|---------------|
 *   | `new Date()`              | `true`        | `true`        |
 *   | `new Date('2016-01-01')`  | `true`        | `true`        |
 *   | `new Date('')`            | `false`       | `false`       |
 *   | `new Date(1488370835081)` | `true`        | `true`        |
 *   | `new Date(NaN)`           | `false`       | `false`       |
 *   | `'2016-01-01'`            | `TypeError`   | `false`       |
 *   | `''`                      | `TypeError`   | `false`       |
 *   | `1488370835081`           | `TypeError`   | `true`        |
 *   | `NaN`                     | `TypeError`   | `false`       |
 *
 *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
 *   that try to coerce arguments to the expected type
 *   (which is also the case with other *date-fns* functions).
 *
 * @param {*} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * var result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  return !isNaN(date);
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"444d26f8c29e5f455146d915b97fd66d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameDay;

var _index = _interopRequireDefault(require("../startOfDay/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 */
function isSameDay(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeftStartOfDay = (0, _index.default)(dirtyDateLeft);
  var dateRightStartOfDay = (0, _index.default)(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

module.exports = exports.default;
},{"../startOfDay/index.js":"744d936ab12e05d0425f696fac165804","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"18c16c5332fa4f63b09e67b9c7a7fc1b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarISOWeekYears;

var _index = _interopRequireDefault(require("../getISOWeekYear/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInCalendarISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of calendar ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of calendar ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `differenceInCalendarISOYears` to `differenceInCalendarISOWeekYears`.
 *   "ISO week year" is short for [ISO week-numbering year](https://en.wikipedia.org/wiki/ISO_week_date).
 *   This change makes the name consistent with
 *   locale-dependent week-numbering year helpers, e.g., `addWeekYears`.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar ISO week-numbering years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar ISO week-numbering years are 1 January 2010 and 1 January 2012?
 * var result = differenceInCalendarISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 2
 */
function differenceInCalendarISOWeekYears(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  return (0, _index.default)(dirtyDateLeft) - (0, _index.default)(dirtyDateRight);
}

module.exports = exports.default;
},{"../getISOWeekYear/index.js":"29a61091f03d2559b5ae8dbb8640b0af","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"ec76ab77b7bb44461e431771fb94f6fc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarISOWeeks;

var _index = _interopRequireDefault(require("../_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index2 = _interopRequireDefault(require("../startOfISOWeek/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;
/**
 * @name differenceInCalendarISOWeeks
 * @category ISO Week Helpers
 * @summary Get the number of calendar ISO weeks between the given dates.
 *
 * @description
 * Get the number of calendar ISO weeks between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar ISO weeks
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?
 * var result = differenceInCalendarISOWeeks(
 *   new Date(2014, 6, 21),
 *   new Date(2014, 6, 6)
 * )
 * //=> 3
 */

function differenceInCalendarISOWeeks(dirtyDateLeft, dirtyDateRight) {
  (0, _index3.default)(2, arguments);
  var startOfISOWeekLeft = (0, _index2.default)(dirtyDateLeft);
  var startOfISOWeekRight = (0, _index2.default)(dirtyDateRight);
  var timestampLeft = startOfISOWeekLeft.getTime() - (0, _index.default)(startOfISOWeekLeft);
  var timestampRight = startOfISOWeekRight.getTime() - (0, _index.default)(startOfISOWeekRight); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK);
}

module.exports = exports.default;
},{"../_lib/getTimezoneOffsetInMilliseconds/index.js":"e1613370c964787e828d6e71e9590bf4","../startOfISOWeek/index.js":"5cdfef1aaca2ce8eb5f04f653206d691","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e984a378c181216f952d3092b443aafe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarMonths;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"8e1087f3fd86a7da0e03c6c28d4e4212":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarQuarters;

var _index = _interopRequireDefault(require("../getQuarter/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInCalendarQuarters
 * @category Quarter Helpers
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar quarters
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * var result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
function differenceInCalendarQuarters(dirtyDateLeft, dirtyDateRight) {
  (0, _index3.default)(2, arguments);
  var dateLeft = (0, _index2.default)(dirtyDateLeft);
  var dateRight = (0, _index2.default)(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var quarterDiff = (0, _index.default)(dateLeft) - (0, _index.default)(dateRight);
  return yearDiff * 4 + quarterDiff;
}

module.exports = exports.default;
},{"../getQuarter/index.js":"648826ec24a33d43dc7a7aae676df432","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"648826ec24a33d43dc7a7aae676df432":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getQuarter;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getQuarter
 * @category Quarter Helpers
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which quarter is 2 July 2014?
 * var result = getQuarter(new Date(2014, 6, 2))
 * //=> 3
 */
function getQuarter(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var quarter = Math.floor(date.getMonth() / 3) + 1;
  return quarter;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"d4d5352b34b5aee15bb4569fd972b1cf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarWeeks;

var _index = _interopRequireDefault(require("../startOfWeek/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;
/**
 * @name differenceInCalendarWeeks
 * @category Week Helpers
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Number} the number of calendar weeks
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
 * var result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 3
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
 * var result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5),
 *   { weekStartsOn: 1 }
 * )
 * //=> 2
 */

function differenceInCalendarWeeks(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  (0, _index3.default)(2, arguments);
  var startOfWeekLeft = (0, _index.default)(dirtyDateLeft, dirtyOptions);
  var startOfWeekRight = (0, _index.default)(dirtyDateRight, dirtyOptions);
  var timestampLeft = startOfWeekLeft.getTime() - (0, _index2.default)(startOfWeekLeft);
  var timestampRight = startOfWeekRight.getTime() - (0, _index2.default)(startOfWeekRight); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK);
}

module.exports = exports.default;
},{"../startOfWeek/index.js":"9773da116ecae709ccce70a09b54431c","../_lib/getTimezoneOffsetInMilliseconds/index.js":"e1613370c964787e828d6e71e9590bf4","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"b1fe2f7d039a16b07bc71fa8afb3fb98":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarYears;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInCalendarYears
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * var result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * )
 * //=> 2
 */
function differenceInCalendarYears(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  return dateLeft.getFullYear() - dateRight.getFullYear();
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e72a5837ea1f56123b018d801f470db5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInDays;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../differenceInCalendarDays/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Like `compareAsc` but uses local time not UTC, which is needed
// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.
function compareLocalAsc(dateLeft, dateRight) {
  var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}
/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 24-hour periods, use this instead:
 * `Math.floor(differenceInHours(dateLeft, dateRight)/24)|0`.
 *
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full days according to the local timezone
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * var result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 * // How many full days are between
 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 92 days, even in
 * // time zones where DST starts and the
 * // period has only 92*24-1 hours.
 * var result = differenceInDays(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 1)
 * )
//=> 92
 */


function differenceInDays(dirtyDateLeft, dirtyDateRight) {
  (0, _index3.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var sign = compareLocalAsc(dateLeft, dateRight);
  var difference = Math.abs((0, _index2.default)(dateLeft, dateRight));
  dateLeft.setDate(dateLeft.getDate() - sign * difference); // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value

  var isLastDayNotFull = compareLocalAsc(dateLeft, dateRight) === -sign;
  var result = sign * (difference - isLastDayNotFull); // Prevent negative zero

  return result === 0 ? 0 : result;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../differenceInCalendarDays/index.js":"8255b070c42b22dde4ff1d9e2d1f8222","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"92048a9d588a87285c40d130e50b6b68":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInHours;

var _index = _interopRequireDefault(require("../differenceInMilliseconds/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_HOUR = 3600000;
/**
 * @name differenceInHours
 * @category Hour Helpers
 * @summary Get the number of hours between the given dates.
 *
 * @description
 * Get the number of hours between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of hours
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
 * var result = differenceInHours(
 *   new Date(2014, 6, 2, 19, 0),
 *   new Date(2014, 6, 2, 6, 50)
 * )
 * //=> 12
 */

function differenceInHours(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_HOUR;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}

module.exports = exports.default;
},{"../differenceInMilliseconds/index.js":"26b72fa6011e59ec2ab4f8e75a9c84f5","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"26b72fa6011e59ec2ab4f8e75a9c84f5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInMilliseconds;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInMilliseconds
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of milliseconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * var result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
function differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  return dateLeft.getTime() - dateRight.getTime();
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"9b4375424ff0357c135ad7ef30291ee6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInISOWeekYears;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../differenceInCalendarISOWeekYears/index.js"));

var _index3 = _interopRequireDefault(require("../compareAsc/index.js"));

var _index4 = _interopRequireDefault(require("../subISOWeekYears/index.js"));

var _index5 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of full ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of full ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `differenceInISOYears` to `differenceInISOWeekYears`.
 *   "ISO week year" is short for [ISO week-numbering year](https://en.wikipedia.org/wiki/ISO_week_date).
 *   This change makes the name consistent with
 *   locale-dependent week-numbering year helpers, e.g., `addWeekYears`.
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full ISO week-numbering years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
 * var result = differenceInISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 1
 */
function differenceInISOWeekYears(dirtyDateLeft, dirtyDateRight) {
  (0, _index5.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var sign = (0, _index3.default)(dateLeft, dateRight);
  var difference = Math.abs((0, _index2.default)(dateLeft, dateRight));
  dateLeft = (0, _index4.default)(dateLeft, sign * difference); // Math.abs(diff in full ISO years - diff in calendar ISO years) === 1
  // if last calendar ISO year is not full
  // If so, result must be decreased by 1 in absolute value

  var isLastISOWeekYearNotFull = (0, _index3.default)(dateLeft, dateRight) === -sign;
  var result = sign * (difference - isLastISOWeekYearNotFull); // Prevent negative zero

  return result === 0 ? 0 : result;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../differenceInCalendarISOWeekYears/index.js":"18c16c5332fa4f63b09e67b9c7a7fc1b","../compareAsc/index.js":"b04482b11d51799a5c68a70b87615149","../subISOWeekYears/index.js":"090345afe34fd3cbc75d5a7eb0f96431","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"090345afe34fd3cbc75d5a7eb0f96431":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subISOWeekYears;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addISOWeekYears/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Subtract the specified number of ISO week-numbering years from the given date.
 *
 * @description
 * Subtract the specified number of ISO week-numbering years from the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `subISOYears` to `subISOWeekYears`.
 *   "ISO week year" is short for [ISO week-numbering year](https://en.wikipedia.org/wiki/ISO_week_date).
 *   This change makes the name consistent with
 *   locale-dependent week-numbering year helpers, e.g., `setWeekYear`.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of ISO week-numbering years to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the ISO week-numbering years subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 ISO week-numbering years from 1 September 2014:
 * var result = subISOWeekYears(new Date(2014, 8, 1), 5)
 * //=> Mon Aug 31 2009 00:00:00
 */
function subISOWeekYears(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addISOWeekYears/index.js":"0597a676a6f18ebb7f1c8b05acab95aa","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"77e3eae59cf68a6fdb8fa98359c05325":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInMinutes;

var _index = _interopRequireDefault(require("../differenceInMilliseconds/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_MINUTE = 60000;
/**
 * @name differenceInMinutes
 * @category Minute Helpers
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the signed number of full (rounded towards 0) minutes between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of minutes
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * var result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 *
 * @example
 * // How many minutes are from 10:01:59 to 10:00:00
 * var result = differenceInMinutes(
 *   new Date(2000, 0, 1, 10, 0, 0),
 *   new Date(2000, 0, 1, 10, 1, 59)
 * )
 * //=> -1
 */

function differenceInMinutes(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_MINUTE;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}

module.exports = exports.default;
},{"../differenceInMilliseconds/index.js":"26b72fa6011e59ec2ab4f8e75a9c84f5","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"cb69a5f4f1d92f10394e57b4ab1bcbd0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInMonths;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../differenceInCalendarMonths/index.js"));

var _index3 = _interopRequireDefault(require("../compareAsc/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */
function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var sign = (0, _index3.default)(dateLeft, dateRight);
  var difference = Math.abs((0, _index2.default)(dateLeft, dateRight));
  dateLeft.setMonth(dateLeft.getMonth() - sign * difference); // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
  // If so, result must be decreased by 1 in absolute value

  var isLastMonthNotFull = (0, _index3.default)(dateLeft, dateRight) === -sign;
  var result = sign * (difference - isLastMonthNotFull); // Prevent negative zero

  return result === 0 ? 0 : result;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../differenceInCalendarMonths/index.js":"e984a378c181216f952d3092b443aafe","../compareAsc/index.js":"b04482b11d51799a5c68a70b87615149","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"a02a8f0f2afe250f4823662a268803f7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInQuarters;

var _index = _interopRequireDefault(require("../differenceInMonths/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInQuarters
 * @category Quarter Helpers
 * @summary Get the number of full quarters between the given dates.
 *
 * @description
 * Get the number of full quarters between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full quarters
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full quarters are between 31 December 2013 and 2 July 2014?
 * var result = differenceInQuarters(new Date(2014, 6, 2), new Date(2013, 11, 31))
 * //=> 2
 */
function differenceInQuarters(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / 3;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}

module.exports = exports.default;
},{"../differenceInMonths/index.js":"cb69a5f4f1d92f10394e57b4ab1bcbd0","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e36bd3db1290140be285bef03e3cf595":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInSeconds;

var _index = _interopRequireDefault(require("../differenceInMilliseconds/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInSeconds
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of seconds
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * var result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */
function differenceInSeconds(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / 1000;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}

module.exports = exports.default;
},{"../differenceInMilliseconds/index.js":"26b72fa6011e59ec2ab4f8e75a9c84f5","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"a53a705bac8f744f6a4547bde44bebc8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInWeeks;

var _index = _interopRequireDefault(require("../differenceInDays/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInWeeks
 * @category Week Helpers
 * @summary Get the number of full weeks between the given dates.
 *
 * @description
 * Get the number of full weeks between two dates. Fractional weeks are
 * truncated towards zero.
 *
 * One "full week" is the distance between a local time in one day to the same
 * local time 7 days earlier or later. A full week can sometimes be less than
 * or more than 7*24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 7*24-hour periods, use this instead:
 * `Math.floor(differenceInHours(dateLeft, dateRight)/(7*24))|0`.
 *
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full weeks
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full weeks are between 5 July 2014 and 20 July 2014?
 * var result = differenceInWeeks(new Date(2014, 6, 20), new Date(2014, 6, 5))
 * //=> 2
 *
 * // How many full weeks are between
 * // 1 March 2020 0:00 and 6 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 8 weeks (54 days),
 * // even if DST starts and the period has
 * // only 54*24-1 hours.
 * var result = differenceInWeeks(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 6)
 * )
 * //=> 8
 */
function differenceInWeeks(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var diff = (0, _index.default)(dirtyDateLeft, dirtyDateRight) / 7;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}

module.exports = exports.default;
},{"../differenceInDays/index.js":"e72a5837ea1f56123b018d801f470db5","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"3cb153d4a0f49dc0186870c197a4b734":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInYears;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../differenceInCalendarYears/index.js"));

var _index3 = _interopRequireDefault(require("../compareAsc/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInYears
 * @category Year Helpers
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * var result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
 * //=> 1
 */
function differenceInYears(dirtyDateLeft, dirtyDateRight) {
  (0, _index4.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  var sign = (0, _index3.default)(dateLeft, dateRight);
  var difference = Math.abs((0, _index2.default)(dateLeft, dateRight)); // Set both dates to a valid leap year for accurate comparison when dealing
  // with leap days

  dateLeft.setFullYear('1584');
  dateRight.setFullYear('1584'); // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
  // If so, result must be decreased by 1 in absolute value

  var isLastYearNotFull = (0, _index3.default)(dateLeft, dateRight) === -sign;
  var result = sign * (difference - isLastYearNotFull); // Prevent negative zero

  return result === 0 ? 0 : result;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../differenceInCalendarYears/index.js":"b1fe2f7d039a16b07bc71fa8afb3fb98","../compareAsc/index.js":"b04482b11d51799a5c68a70b87615149","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"30e84481553b98cf72d4cbc1fc8c0e2b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachDayOfInterval;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachDayOfInterval
 * @category Interval Helpers
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `eachDay` to `eachDayOfInterval`.
 *   This change was made to mirror the use of the word "interval" in standard ISO 8601:2004 terminology:
 *
 *   ```
 *   2.1.3
 *   time interval
 *   part of the time axis limited by two instants
 *   ```
 *
 *   Also, this function now accepts an object with `start` and `end` properties
 *   instead of two arguments as an interval.
 *   This function now throws `RangeError` if the start of the interval is after its end
 *   or if any date in the interval is `Invalid Date`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   eachDay(new Date(2014, 0, 10), new Date(2014, 0, 20))
 *
 *   // v2.0.0 onward
 *
 *   eachDayOfInterval(
 *     { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
 *   )
 *   ```
 *
 * @param {Interval} interval - the interval. See [Interval]{@link docs/types/Interval}
 * @param {Object} [options] - an object with options.
 * @param {Number} [options.step=1] - the step to increment by. The value should be more than 1.
 * @returns {Date[]} the array with starts of days from the day of the interval start to the day of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.step` must be a number greater than 1
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * var result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
function eachDayOfInterval(dirtyInterval, options) {
  (0, _index2.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index.default)(interval.start);
  var endDate = (0, _index.default)(interval.end);
  var endTime = endDate.getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  var step = options && 'step' in options ? Number(options.step) : 1;
  if (step < 1 || isNaN(step)) throw new RangeError('`options.step` must be a number greater than 1');

  while (currentDate.getTime() <= endTime) {
    dates.push((0, _index.default)(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }

  return dates;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"923eb1ebe3e1942ce41572286f2fe691":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachHourOfInterval;

var _index = _interopRequireDefault(require("../addHours/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachHourOfInterval
 * @category Interval Helpers
 * @summary Return the array of hours within the specified time interval.
 *
 * @description
 * Return the array of hours within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link docs/types/Interval}
 * @param {Object} [options] - an object with options.
 * @param {Number} [options.step=1] - the step to increment by. The value should be more than 1.
 * @returns {Date[]} the array with starts of hours from the hour of the interval start to the hour of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.step` must be a number greater than 1
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each hour between 6 October 2014, 12:00 and 10 October 2014, 15:00
 * var result = eachHourOfInterval({
 *   start: new Date(2014, 9, 6, 12),
 *   end: new Date(2014, 9, 6, 15)
 * })
 * //=> [
 * //   Mon Oct 06 2014 12:00:00,
 * //   Mon Oct 06 2014 13:00:00,
 * //   Mon Oct 06 2014 14:00:00,
 * //   Mon Oct 06 2014 15:00:00
 * // ]
 */
function eachHourOfInterval(dirtyInterval, options) {
  (0, _index3.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index2.default)(interval.start);
  var endDate = (0, _index2.default)(interval.end);
  var startTime = startDate.getTime();
  var endTime = endDate.getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(startTime <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  var dates = [];
  var currentDate = startDate;
  currentDate.setMinutes(0, 0, 0);
  var step = options && 'step' in options ? Number(options.step) : 1;
  if (step < 1 || isNaN(step)) throw new RangeError('`options.step` must be a number greater than 1');

  while (currentDate.getTime() <= endTime) {
    dates.push((0, _index2.default)(currentDate));
    currentDate = (0, _index.default)(currentDate, step);
  }

  return dates;
}

module.exports = exports.default;
},{"../addHours/index.js":"cd47d6b53a35480fa364f0daccc1ea68","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"946da497007277cb7e59a6b9a12d31c2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachMonthOfInterval;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachMonthOfInterval
 * @category Interval Helpers
 * @summary Return the array of months within the specified time interval.
 *
 * @description
 * Return the array of months within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link docs/types/Interval}
 * @returns {Date[]} the array with starts of months from the month of the interval start to the month of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each month between 6 February 2014 and 10 August 2014:
 * var result = eachMonthOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10)
 * })
 * //=> [
 * //   Sat Feb 01 2014 00:00:00,
 * //   Sat Mar 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Thu May 01 2014 00:00:00,
 * //   Sun Jun 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * //   Fri Aug 01 2014 00:00:00
 * // ]
 */
function eachMonthOfInterval(dirtyInterval) {
  (0, _index2.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index.default)(interval.start);
  var endDate = (0, _index.default)(interval.end);
  var endTime = endDate.getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(1);

  while (currentDate.getTime() <= endTime) {
    dates.push((0, _index.default)(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return dates;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"0b98245e34fffb5cd9e6bd82d29b63b2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachQuarterOfInterval;

var _index = _interopRequireDefault(require("../addQuarters/index.js"));

var _index2 = _interopRequireDefault(require("../startOfQuarter/index.js"));

var _index3 = _interopRequireDefault(require("../toDate/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachQuarterOfInterval
 * @category Interval Helpers
 * @summary Return the array of quarters within the specified time interval.
 *
 * @description
 * Return the array of quarters within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link docs/types/Interval}
 * @returns {Date[]} the array with starts of quarters from the quarter of the interval start to the quarter of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each quarter within interval 6 February 2014 - 10 August 2014:
 * var result = eachQuarterOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10)
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * // ]
 */
function eachQuarterOfInterval(dirtyInterval) {
  (0, _index4.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index3.default)(interval.start);
  var endDate = (0, _index3.default)(interval.end);
  var endTime = endDate.getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  var startDateQuarter = (0, _index2.default)(startDate);
  var endDateQuarter = (0, _index2.default)(endDate);
  endTime = endDateQuarter.getTime();
  var quarters = [];
  var currentQuarter = startDateQuarter;

  while (currentQuarter.getTime() <= endTime) {
    quarters.push((0, _index3.default)(currentQuarter));
    currentQuarter = (0, _index.default)(currentQuarter, 1);
  }

  return quarters;
}

module.exports = exports.default;
},{"../addQuarters/index.js":"928b02c9289f2a44dc206b85a4f19db0","../startOfQuarter/index.js":"169a2e7964834756211ffaa78256e0de","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"169a2e7964834756211ffaa78256e0de":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfQuarter;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfQuarter
 * @category Quarter Helpers
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * var result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
function startOfQuarter(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3;
  date.setMonth(month, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"6870f81cf26a7c18a8196bcedfc05685":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachWeekOfInterval;

var _index = _interopRequireDefault(require("../addWeeks/index.js"));

var _index2 = _interopRequireDefault(require("../startOfWeek/index.js"));

var _index3 = _interopRequireDefault(require("../toDate/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachWeekOfInterval
 * @category Interval Helpers
 * @summary Return the array of weeks within the specified time interval.
 *
 * @description
 * Return the array of weeks within the specified time interval.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Interval} interval - the interval. See [Interval]{@link docs/types/Interval}
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date[]} the array with starts of weeks from the week of the interval start to the week of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be 0, 1, ..., 6
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each week within interval 6 October 2014 - 23 November 2014:
 * var result = eachWeekOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 10, 23)
 * })
 * //=> [
 * //   Sun Oct 05 2014 00:00:00,
 * //   Sun Oct 12 2014 00:00:00,
 * //   Sun Oct 19 2014 00:00:00,
 * //   Sun Oct 26 2014 00:00:00,
 * //   Sun Nov 02 2014 00:00:00,
 * //   Sun Nov 09 2014 00:00:00,
 * //   Sun Nov 16 2014 00:00:00,
 * //   Sun Nov 23 2014 00:00:00
 * // ]
 */
function eachWeekOfInterval(dirtyInterval, options) {
  (0, _index4.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index3.default)(interval.start);
  var endDate = (0, _index3.default)(interval.end);
  var endTime = endDate.getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  var startDateWeek = (0, _index2.default)(startDate, options);
  var endDateWeek = (0, _index2.default)(endDate, options); // Some timezones switch DST at midnight, making start of day unreliable in these timezones, 3pm is a safe bet

  startDateWeek.setHours(15);
  endDateWeek.setHours(15);
  endTime = endDateWeek.getTime();
  var weeks = [];
  var currentWeek = startDateWeek;

  while (currentWeek.getTime() <= endTime) {
    currentWeek.setHours(0);
    weeks.push((0, _index3.default)(currentWeek));
    currentWeek = (0, _index.default)(currentWeek, 1);
    currentWeek.setHours(15);
  }

  return weeks;
}

module.exports = exports.default;
},{"../addWeeks/index.js":"d7f228172dbd1739d5d2624dd7fbb932","../startOfWeek/index.js":"9773da116ecae709ccce70a09b54431c","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"394859bd13016bd8353d2891dcaab335":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachWeekendOfInterval;

var _index = _interopRequireDefault(require("../eachDayOfInterval/index.js"));

var _index2 = _interopRequireDefault(require("../isSunday/index.js"));

var _index3 = _interopRequireDefault(require("../isWeekend/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachWeekendOfInterval
 * @category Interval Helpers
 * @summary List all the Saturdays and Sundays in the given date interval.
 *
 * @description
 * Get all the Saturdays and Sundays in the given date interval.
 *
 * @param {Interval} interval - the given interval. See [Interval]{@link docs/types/Interval}
 * @returns {Date[]} an array containing all the Saturdays and Sundays
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Lists all Saturdays and Sundays in the given date interval
 * var result = eachWeekendOfInterval({
 *   start: new Date(2018, 8, 17),
 *   end: new Date(2018, 8, 30)
 * })
 * //=> [
 * //   Sat Sep 22 2018 00:00:00,
 * //   Sun Sep 23 2018 00:00:00,
 * //   Sat Sep 29 2018 00:00:00,
 * //   Sun Sep 30 2018 00:00:00
 * // ]
 */
function eachWeekendOfInterval(interval) {
  (0, _index4.default)(1, arguments);
  var dateInterval = (0, _index.default)(interval);
  var weekends = [];
  var index = 0;

  while (index < dateInterval.length) {
    var date = dateInterval[index++];

    if ((0, _index3.default)(date)) {
      weekends.push(date);
      if ((0, _index2.default)(date)) index = index + 5;
    }
  }

  return weekends;
}

module.exports = exports.default;
},{"../eachDayOfInterval/index.js":"30e84481553b98cf72d4cbc1fc8c0e2b","../isSunday/index.js":"3d25d420af4143a09d4b2d3bf8e6338a","../isWeekend/index.js":"e1bdc4b76a9814a07a461efe9dc25d58","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"8e0966d62adce416522ef62832c07b2a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachWeekendOfMonth;

var _index = _interopRequireDefault(require("../eachWeekendOfInterval/index.js"));

var _index2 = _interopRequireDefault(require("../startOfMonth/index.js"));

var _index3 = _interopRequireDefault(require("../endOfMonth/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachWeekendOfMonth
 * @category Month Helpers
 * @summary List all the Saturdays and Sundays in the given month.
 *
 * @description
 * Get all the Saturdays and Sundays in the given month.
 *
 * @param {Date|Number} date - the given month
 * @returns {Date[]} an array containing all the Saturdays and Sundays
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The passed date is invalid
 *
 * @example
 * // Lists all Saturdays and Sundays in the given month
 * var result = eachWeekendOfMonth(new Date(2022, 1, 1))
 * //=> [
 * //   Sat Feb 05 2022 00:00:00,
 * //   Sun Feb 06 2022 00:00:00,
 * //   Sat Feb 12 2022 00:00:00,
 * //   Sun Feb 13 2022 00:00:00,
 * //   Sat Feb 19 2022 00:00:00,
 * //   Sun Feb 20 2022 00:00:00,
 * //   Sat Feb 26 2022 00:00:00,
 * //   Sun Feb 27 2022 00:00:00
 * // ]
 */
function eachWeekendOfMonth(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var startDate = (0, _index2.default)(dirtyDate);
  if (isNaN(startDate)) throw new RangeError('The passed date is invalid');
  var endDate = (0, _index3.default)(dirtyDate);
  return (0, _index.default)({
    start: startDate,
    end: endDate
  });
}

module.exports = exports.default;
},{"../eachWeekendOfInterval/index.js":"394859bd13016bd8353d2891dcaab335","../startOfMonth/index.js":"7ab6abfabd43021d3a26e7331311a7cb","../endOfMonth/index.js":"13de8359936822f10aa6792c9ec3415b","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"7ab6abfabd43021d3a26e7331311a7cb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfMonth;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"13de8359936822f10aa6792c9ec3415b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfMonth;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * var result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"25254f6429c18f2c8bb810591eaea380":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachWeekendOfYear;

var _index = _interopRequireDefault(require("../eachWeekendOfInterval/index.js"));

var _index2 = _interopRequireDefault(require("../startOfYear/index.js"));

var _index3 = _interopRequireDefault(require("../endOfYear/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachWeekendOfYear
 * @category Year Helpers
 * @summary List all the Saturdays and Sundays in the year.
 *
 * @description
 * Get all the Saturdays and Sundays in the year.
 *
 * @param {Date|Number} date - the given year
 * @returns {Date[]} an array containing all the Saturdays and Sundays
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The passed date is invalid
 *
 * @example
 * // Lists all Saturdays and Sundays in the year
 * var result = eachWeekendOfYear(new Date(2020, 1, 1))
 * //=> [
 * //   Sat Jan 03 2020 00:00:00,
 * //   Sun Jan 04 2020 00:00:00,
 * //   ...
 * //   Sun Dec 27 2020 00:00:00
 * // ]
 * ]
 */
function eachWeekendOfYear(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var startDate = (0, _index2.default)(dirtyDate);
  if (isNaN(startDate)) throw new RangeError('The passed date is invalid');
  var endDate = (0, _index3.default)(dirtyDate);
  return (0, _index.default)({
    start: startDate,
    end: endDate
  });
}

module.exports = exports.default;
},{"../eachWeekendOfInterval/index.js":"394859bd13016bd8353d2891dcaab335","../startOfYear/index.js":"655a08231b6bc1822e7a69e1372d74f9","../endOfYear/index.js":"1af7d1321e39f626a1be376833fa51fa","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"655a08231b6bc1822e7a69e1372d74f9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfYear;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var cleanDate = (0, _index.default)(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"1af7d1321e39f626a1be376833fa51fa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfYear;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfYear
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * var result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
function endOfYear(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"d4d34126fc2fa29ea78e984c22e374b9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachYearOfInterval;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachYearOfInterval
 * @category Interval Helpers
 * @summary Return the array of yearly timestamps within the specified time interval.
 *
 * @description
 * Return the array of yearly timestamps within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link docs/types/Interval}
 * @returns {Date[]} the array with starts of yearly timestamps from the month of the interval start to the month of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each year between 6 February 2014 and 10 August 2017:
 * var result = eachYearOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2017, 7, 10)
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Thu Jan 01 2015 00:00:00,
 * //   Fri Jan 01 2016 00:00:00,
 * //   Sun Jan 01 2017 00:00:00
 * // ]
 */
function eachYearOfInterval(dirtyInterval) {
  (0, _index2.default)(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = (0, _index.default)(interval.start);
  var endDate = (0, _index.default)(interval.end);
  var endTime = endDate.getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setMonth(0, 1);

  while (currentDate.getTime() <= endTime) {
    dates.push((0, _index.default)(currentDate));
    currentDate.setFullYear(currentDate.getFullYear() + 1);
  }

  return dates;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"ad0eb03bd09a3bb13c3ba6ca29582aac":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfDay;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * var result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"675e51ca6e9a18bbb85b85a48291192d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfDecade;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfDecade
 * @category Decade Helpers
 * @summary Return the end of a decade for the given date.
 *
 * @description
 * Return the end of a decade for the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a decade
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // The end of a decade for 12 May 1984 00:00:00:
 * var result = endOfDecade(new Date(1984, 4, 12, 00, 00, 00))
 * //=> Dec 31 1989 23:59:59.999
 */
function endOfDecade(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var year = date.getFullYear();
  var decade = 9 + Math.floor(year / 10) * 10;
  date.setFullYear(decade, 11, 31);
  date.setHours(23, 59, 59, 999);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"99c14fbb29ece220627d0b749c9b69a0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfHour;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfHour
 * @category Hour Helpers
 * @summary Return the end of an hour for the given date.
 *
 * @description
 * Return the end of an hour for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of an hour
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of an hour for 2 September 2014 11:55:00:
 * var result = endOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:59:59.999
 */
function endOfHour(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setMinutes(59, 59, 999);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"1f67ae1ce17426b004656e0d42115075":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfISOWeek;

var _index = _interopRequireDefault(require("../endOfWeek/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the end of an ISO week for the given date.
 *
 * @description
 * Return the end of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of an ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of an ISO week for 2 September 2014 11:55:00:
 * var result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfISOWeek(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate, {
    weekStartsOn: 1
  });
}

module.exports = exports.default;
},{"../endOfWeek/index.js":"0dbe9973f377852a567dffa03a94feb5","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"0dbe9973f377852a567dffa03a94feb5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfWeek;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the end of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(dirtyDate, dirtyOptions) {
  (0, _index3.default)(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index2.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index2.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0, _index.default)(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"2702e02bbede1ff194db4b63f3c6d5f4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfISOWeekYear;

var _index = _interopRequireDefault(require("../getISOWeekYear/index.js"));

var _index2 = _interopRequireDefault(require("../startOfISOWeek/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `endOfISOYear` to `endOfISOWeekYear`.
 *   "ISO week year" is short for [ISO week-numbering year](https://en.wikipedia.org/wiki/ISO_week_date).
 *   This change makes the name consistent with
 *   locale-dependent week-numbering year helpers, e.g., `addWeekYears`.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of an ISO week-numbering year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * var result = endOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
function endOfISOWeekYear(dirtyDate) {
  (0, _index3.default)(1, arguments);
  var year = (0, _index.default)(dirtyDate);
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var date = (0, _index2.default)(fourthOfJanuaryOfNextYear);
  date.setMilliseconds(date.getMilliseconds() - 1);
  return date;
}

module.exports = exports.default;
},{"../getISOWeekYear/index.js":"29a61091f03d2559b5ae8dbb8640b0af","../startOfISOWeek/index.js":"5cdfef1aaca2ce8eb5f04f653206d691","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"f2c85f2643486d739872940cb479184c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfMinute;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfMinute
 * @category Minute Helpers
 * @summary Return the end of a minute for the given date.
 *
 * @description
 * Return the end of a minute for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a minute
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a minute for 1 December 2014 22:15:45.400:
 * var result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:59.999
 */
function endOfMinute(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setSeconds(59, 999);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"5829e3cbf279671a678ef447081faf9e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfQuarter;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfQuarter
 * @category Quarter Helpers
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * var result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfQuarter(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"fe443b00c99bb183746141467747d68c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfSecond;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfSecond
 * @category Second Helpers
 * @summary Return the end of a second for the given date.
 *
 * @description
 * Return the end of a second for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a second
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a second for 1 December 2014 22:15:45.400:
 * var result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.999
 */
function endOfSecond(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setMilliseconds(999);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"99273d15b894708ed794b2508b31d46c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfToday;

var _index = _interopRequireDefault(require("../endOfDay/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfToday
 * @category Day Helpers
 * @summary Return the end of today.
 * @pure false
 *
 * @description
 * Return the end of today.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @returns {Date} the end of today
 *
 * @example
 * // If today is 6 October 2014:
 * var result = endOfToday()
 * //=> Mon Oct 6 2014 23:59:59.999
 */
function endOfToday() {
  return (0, _index.default)(Date.now());
}

module.exports = exports.default;
},{"../endOfDay/index.js":"ad0eb03bd09a3bb13c3ba6ca29582aac"}],"8e495b2d2946155bce8800c44171ff02":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfTomorrow;

/**
 * @name endOfTomorrow
 * @category Day Helpers
 * @summary Return the end of tomorrow.
 * @pure false
 *
 * @description
 * Return the end of tomorrow.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `new Date()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @returns {Date} the end of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * var result = endOfTomorrow()
 * //=> Tue Oct 7 2014 23:59:59.999
 */
function endOfTomorrow() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day + 1);
  date.setHours(23, 59, 59, 999);
  return date;
}

module.exports = exports.default;
},{}],"76fefa545970aabab7afa8b654656a2b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfYesterday;

/**
 * @name endOfYesterday
 * @category Day Helpers
 * @summary Return the end of yesterday.
 * @pure false
 *
 * @description
 * Return the end of yesterday.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `new Date()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @returns {Date} the end of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * var result = endOfYesterday()
 * //=> Sun Oct 5 2014 23:59:59.999
 */
function endOfYesterday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(23, 59, 59, 999);
  return date;
}

module.exports = exports.default;
},{}],"c217462ea1c04722fbe0db40230d04da":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;

var _index = _interopRequireDefault(require("../isValid/index.js"));

var _index2 = _interopRequireDefault(require("../locale/en-US/index.js"));

var _index3 = _interopRequireDefault(require("../subMilliseconds/index.js"));

var _index4 = _interopRequireDefault(require("../toDate/index.js"));

var _index5 = _interopRequireDefault(require("../_lib/format/formatters/index.js"));

var _index6 = _interopRequireDefault(require("../_lib/format/longFormatters/index.js"));

var _index7 = _interopRequireDefault(require("../_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index8 = require("../_lib/protectedTokens/index.js");

var _index9 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index10 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://git.io/fxCyr
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | AM, PM                          | a..aaa  | AM, PM                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 0001, ..., 999               |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 05/29/1453                        | 7     |
 * |                                 | PP      | May 29, 1453                      | 7     |
 * |                                 | PPP     | May 29th, 1453                    | 7     |
 * |                                 | PPPP    | Sunday, May 29th, 1453            | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 05/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | May 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | May 29th, 1453 at ...             | 7     |
 * |                                 | PPPPpppp| Sunday, May 29th, 1453 at ...     | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
 *
 * 9. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The second argument is now required for the sake of explicitness.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   format(new Date(2016, 0, 1))
 *
 *   // v2.0.0 onward
 *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
 *   ```
 *
 * - New format string API for `format` function
 *   which is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 *   See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
 *
 * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
 *
 * @param {Date|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://git.io/fxCyr
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://git.io/fxCyr
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */

function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
  (0, _index10.default)(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var options = dirtyOptions || {};
  var locale = options.locale || _index2.default;
  var localeFirstWeekContainsDate = locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index9.default)(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index9.default)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var localeWeekStartsOn = locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index9.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index9.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  if (!locale.localize) {
    throw new RangeError('locale must contain localize property');
  }

  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }

  var originalDate = (0, _index4.default)(dirtyDate);

  if (!(0, _index.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376


  var timezoneOffset = (0, _index7.default)(originalDate);
  var utcDate = (0, _index3.default)(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
    var firstCharacter = substring[0];

    if (firstCharacter === 'p' || firstCharacter === 'P') {
      var longFormatter = _index6.default[firstCharacter];
      return longFormatter(substring, locale.formatLong, formatterOptions);
    }

    return substring;
  }).join('').match(formattingTokensRegExp).map(function (substring) {
    // Replace two single quote characters with one single quote character
    if (substring === "''") {
      return "'";
    }

    var firstCharacter = substring[0];

    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }

    var formatter = _index5.default[firstCharacter];

    if (formatter) {
      if (!options.useAdditionalWeekYearTokens && (0, _index8.isProtectedWeekYearToken)(substring)) {
        (0, _index8.throwProtectedError)(substring, dirtyFormatStr, dirtyDate);
      }

      if (!options.useAdditionalDayOfYearTokens && (0, _index8.isProtectedDayOfYearToken)(substring)) {
        (0, _index8.throwProtectedError)(substring, dirtyFormatStr, dirtyDate);
      }

      return formatter(utcDate, substring, locale.localize, formatterOptions);
    }

    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
    }

    return substring;
  }).join('');
  return result;
}

function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}

module.exports = exports.default;
},{"../isValid/index.js":"e498f8242893901cb098193d741d5e7a","../locale/en-US/index.js":"64a45174a7b8aab2ebedcd537506623f","../subMilliseconds/index.js":"d4c3fa7c1a401b98fc12fd2f31ab3db4","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/format/formatters/index.js":"5eb6591d96df20705f2987008b01aaf9","../_lib/format/longFormatters/index.js":"c5cae08211bae46f320f6578b64023ec","../_lib/getTimezoneOffsetInMilliseconds/index.js":"e1613370c964787e828d6e71e9590bf4","../_lib/protectedTokens/index.js":"c72cd04215458e3a41ee275d842547f7","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"64a45174a7b8aab2ebedcd537506623f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./_lib/formatDistance/index.js"));

var _index2 = _interopRequireDefault(require("./_lib/formatLong/index.js"));

var _index3 = _interopRequireDefault(require("./_lib/formatRelative/index.js"));

var _index4 = _interopRequireDefault(require("./_lib/localize/index.js"));

var _index5 = _interopRequireDefault(require("./_lib/match/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */
var locale = {
  code: 'en-US',
  formatDistance: _index.default,
  formatLong: _index2.default,
  formatRelative: _index3.default,
  localize: _index4.default,
  match: _index5.default,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};
var _default = locale;
exports.default = _default;
module.exports = exports.default;
},{"./_lib/formatDistance/index.js":"44144112559fb20b0cf4a05e4d258eb3","./_lib/formatLong/index.js":"7f209cd9dfb309c9d4e57b391275fb3b","./_lib/formatRelative/index.js":"79a20a0b41d122ec288e649d45bdd430","./_lib/localize/index.js":"4d4c339e40e8b942f34303a245d072b5","./_lib/match/index.js":"50ae0991387ba6b912b4cf5ceea95ea0"}],"44144112559fb20b0cf4a05e4d258eb3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistance;
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};

function formatDistance(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    result = formatDistanceLocale[token].one;
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
}

module.exports = exports.default;
},{}],"7f209cd9dfb309c9d4e57b391275fb3b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../../_lib/buildFormatLongFn/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: (0, _index.default)({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: (0, _index.default)({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: (0, _index.default)({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};
var _default = formatLong;
exports.default = _default;
module.exports = exports.default;
},{"../../../_lib/buildFormatLongFn/index.js":"b571d15f97b80c26f7eb16935408a770"}],"b571d15f97b80c26f7eb16935408a770":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFormatLongFn;

function buildFormatLongFn(args) {
  return function (dirtyOptions) {
    var options = dirtyOptions || {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

module.exports = exports.default;
},{}],"79a20a0b41d122ec288e649d45bdd430":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};

function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

module.exports = exports.default;
},{}],"4d4c339e40e8b942f34303a245d072b5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../../_lib/buildLocalizeFn/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'] // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.

};
var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};

function ordinalNumber(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';

      case 2:
        return number + 'nd';

      case 3:
        return number + 'rd';
    }
  }

  return number + 'th';
}

var localize = {
  ordinalNumber: ordinalNumber,
  era: (0, _index.default)({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: (0, _index.default)({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: (0, _index.default)({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: (0, _index.default)({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: (0, _index.default)({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};
var _default = localize;
exports.default = _default;
module.exports = exports.default;
},{"../../../_lib/buildLocalizeFn/index.js":"8f7ddafaf95fdd3e695c193a0102c4ab"}],"8f7ddafaf95fdd3e695c193a0102c4ab":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildLocalizeFn;

function buildLocalizeFn(args) {
  return function (dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {};
    var context = options.context ? String(options.context) : 'standalone';
    var valuesArray;

    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;

      var _width = options.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }

    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}

module.exports = exports.default;
},{}],"50ae0991387ba6b912b4cf5ceea95ea0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../../_lib/buildMatchPatternFn/index.js"));

var _index2 = _interopRequireDefault(require("../../../_lib/buildMatchFn/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: (0, _index.default)({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: (0, _index2.default)({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: (0, _index2.default)({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: (0, _index2.default)({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: (0, _index2.default)({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: (0, _index2.default)({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};
var _default = match;
exports.default = _default;
module.exports = exports.default;
},{"../../../_lib/buildMatchPatternFn/index.js":"3a8f4ca505b26393d3253bdaf88126ff","../../../_lib/buildMatchFn/index.js":"f0ef253011215a7078936954aa1782c8"}],"3a8f4ca505b26393d3253bdaf88126ff":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMatchPatternFn;

function buildMatchPatternFn(args) {
  return function (dirtyString, dirtyOptions) {
    var string = String(dirtyString);
    var options = dirtyOptions || {};
    var matchResult = string.match(args.matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);

    if (!parseResult) {
      return null;
    }

    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    return {
      value: value,
      rest: string.slice(matchedString.length)
    };
  };
}

module.exports = exports.default;
},{}],"f0ef253011215a7078936954aa1782c8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMatchFn;

function buildMatchFn(args) {
  return function (dirtyString, dirtyOptions) {
    var string = String(dirtyString);
    var options = dirtyOptions || {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var value;

    if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {
      value = findIndex(parsePatterns, function (pattern) {
        return pattern.test(matchedString);
      });
    } else {
      value = findKey(parsePatterns, function (pattern) {
        return pattern.test(matchedString);
      });
    }

    value = args.valueCallback ? args.valueCallback(value) : value;
    value = options.valueCallback ? options.valueCallback(value) : value;
    return {
      value: value,
      rest: string.slice(matchedString.length)
    };
  };
}

function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
}

function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
}

module.exports = exports.default;
},{}],"d4c3fa7c1a401b98fc12fd2f31ab3db4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subMilliseconds;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addMilliseconds/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subMilliseconds
 * @category Millisecond Helpers
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
 * var result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:29.250
 */
function subMilliseconds(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addMilliseconds/index.js":"c4e4e6442c21d238185ea6cfbfc467c7","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"5eb6591d96df20705f2987008b01aaf9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../lightFormatters/index.js"));

var _index2 = _interopRequireDefault(require("../../../_lib/getUTCDayOfYear/index.js"));

var _index3 = _interopRequireDefault(require("../../../_lib/getUTCISOWeek/index.js"));

var _index4 = _interopRequireDefault(require("../../../_lib/getUTCISOWeekYear/index.js"));

var _index5 = _interopRequireDefault(require("../../../_lib/getUTCWeek/index.js"));

var _index6 = _interopRequireDefault(require("../../../_lib/getUTCWeekYear/index.js"));

var _index7 = _interopRequireDefault(require("../../addLeadingZeros/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dayPeriodEnum = {
  am: 'am',
  pm: 'pm',
  midnight: 'midnight',
  noon: 'noon',
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'night'
  /*
   * |     | Unit                           |     | Unit                           |
   * |-----|--------------------------------|-----|--------------------------------|
   * |  a  | AM, PM                         |  A* | Milliseconds in day            |
   * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
   * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
   * |  d  | Day of month                   |  D  | Day of year                    |
   * |  e  | Local day of week              |  E  | Day of week                    |
   * |  f  |                                |  F* | Day of week in month           |
   * |  g* | Modified Julian day            |  G  | Era                            |
   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
   * |  i! | ISO day of week                |  I! | ISO week of year               |
   * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
   * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
   * |  l* | (deprecated)                   |  L  | Stand-alone month              |
   * |  m  | Minute                         |  M  | Month                          |
   * |  n  |                                |  N  |                                |
   * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
   * |  p! | Long localized time            |  P! | Long localized date            |
   * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
   * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
   * |  s  | Second                         |  S  | Fraction of second             |
   * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
   * |  u  | Extended year                  |  U* | Cyclic year                    |
   * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
   * |  w  | Local week of year             |  W* | Week of month                  |
   * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
   * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
   * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
   *
   * Letters marked by * are not implemented but reserved by Unicode standard.
   *
   * Letters marked by ! are non-standard, but implemented by date-fns:
   * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
   * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
   *   i.e. 7 for Sunday, 1 for Monday, etc.
   * - `I` is ISO week of year, as opposed to `w` which is local week of year.
   * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
   *   `R` is supposed to be used in conjunction with `I` and `i`
   *   for universal ISO week-numbering date, whereas
   *   `Y` is supposed to be used in conjunction with `w` and `e`
   *   for week-numbering date specific to the locale.
   * - `P` is long localized date format
   * - `p` is long localized time format
   */

};
var formatters = {
  // Era
  G: function (date, token, localize) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;

    switch (token) {
      // AD, BC
      case 'G':
      case 'GG':
      case 'GGG':
        return localize.era(era, {
          width: 'abbreviated'
        });
      // A, B

      case 'GGGGG':
        return localize.era(era, {
          width: 'narrow'
        });
      // Anno Domini, Before Christ

      case 'GGGG':
      default:
        return localize.era(era, {
          width: 'wide'
        });
    }
  },
  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === 'yo') {
      var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, {
        unit: 'year'
      });
    }

    return _index.default.y(date, token);
  },
  // Local week-numbering year
  Y: function (date, token, localize, options) {
    var signedWeekYear = (0, _index6.default)(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)

    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year

    if (token === 'YY') {
      var twoDigitYear = weekYear % 100;
      return (0, _index7.default)(twoDigitYear, 2);
    } // Ordinal number


    if (token === 'Yo') {
      return localize.ordinalNumber(weekYear, {
        unit: 'year'
      });
    } // Padding


    return (0, _index7.default)(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function (date, token) {
    var isoWeekYear = (0, _index4.default)(date); // Padding

    return (0, _index7.default)(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    var year = date.getUTCFullYear();
    return (0, _index7.default)(year, token.length);
  },
  // Quarter
  Q: function (date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

    switch (token) {
      // 1, 2, 3, 4
      case 'Q':
        return String(quarter);
      // 01, 02, 03, 04

      case 'QQ':
        return (0, _index7.default)(quarter, 2);
      // 1st, 2nd, 3rd, 4th

      case 'Qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4

      case 'QQQ':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

      case 'QQQQQ':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'formatting'
        });
      // 1st quarter, 2nd quarter, ...

      case 'QQQQ':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone quarter
  q: function (date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

    switch (token) {
      // 1, 2, 3, 4
      case 'q':
        return String(quarter);
      // 01, 02, 03, 04

      case 'qq':
        return (0, _index7.default)(quarter, 2);
      // 1st, 2nd, 3rd, 4th

      case 'qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4

      case 'qqq':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

      case 'qqqqq':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'standalone'
        });
      // 1st quarter, 2nd quarter, ...

      case 'qqqq':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Month
  M: function (date, token, localize) {
    var month = date.getUTCMonth();

    switch (token) {
      case 'M':
      case 'MM':
        return _index.default.M(date, token);
      // 1st, 2nd, ..., 12th

      case 'Mo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec

      case 'MMM':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // J, F, ..., D

      case 'MMMMM':
        return localize.month(month, {
          width: 'narrow',
          context: 'formatting'
        });
      // January, February, ..., December

      case 'MMMM':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone month
  L: function (date, token, localize) {
    var month = date.getUTCMonth();

    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return String(month + 1);
      // 01, 02, ..., 12

      case 'LL':
        return (0, _index7.default)(month + 1, 2);
      // 1st, 2nd, ..., 12th

      case 'Lo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec

      case 'LLL':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // J, F, ..., D

      case 'LLLLL':
        return localize.month(month, {
          width: 'narrow',
          context: 'standalone'
        });
      // January, February, ..., December

      case 'LLLL':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Local week of year
  w: function (date, token, localize, options) {
    var week = (0, _index5.default)(date, options);

    if (token === 'wo') {
      return localize.ordinalNumber(week, {
        unit: 'week'
      });
    }

    return (0, _index7.default)(week, token.length);
  },
  // ISO week of year
  I: function (date, token, localize) {
    var isoWeek = (0, _index3.default)(date);

    if (token === 'Io') {
      return localize.ordinalNumber(isoWeek, {
        unit: 'week'
      });
    }

    return (0, _index7.default)(isoWeek, token.length);
  },
  // Day of the month
  d: function (date, token, localize) {
    if (token === 'do') {
      return localize.ordinalNumber(date.getUTCDate(), {
        unit: 'date'
      });
    }

    return _index.default.d(date, token);
  },
  // Day of year
  D: function (date, token, localize) {
    var dayOfYear = (0, _index2.default)(date);

    if (token === 'Do') {
      return localize.ordinalNumber(dayOfYear, {
        unit: 'dayOfYear'
      });
    }

    return (0, _index7.default)(dayOfYear, token.length);
  },
  // Day of week
  E: function (date, token, localize) {
    var dayOfWeek = date.getUTCDay();

    switch (token) {
      // Tue
      case 'E':
      case 'EE':
      case 'EEE':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'EEEEE':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'EEEEEE':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'EEEE':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Local day of week
  e: function (date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case 'e':
        return String(localDayOfWeek);
      // Padded numerical value

      case 'ee':
        return (0, _index7.default)(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th

      case 'eo':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });

      case 'eee':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'eeeee':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'eeeeee':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'eeee':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

    switch (token) {
      // Numerical value (same as in `e`)
      case 'c':
        return String(localDayOfWeek);
      // Padded numerical value

      case 'cc':
        return (0, _index7.default)(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th

      case 'co':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });

      case 'ccc':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // T

      case 'ccccc':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'standalone'
        });
      // Tu

      case 'cccccc':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'standalone'
        });
      // Tuesday

      case 'cccc':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // ISO day of week
  i: function (date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    switch (token) {
      // 2
      case 'i':
        return String(isoDayOfWeek);
      // 02

      case 'ii':
        return (0, _index7.default)(isoDayOfWeek, token.length);
      // 2nd

      case 'io':
        return localize.ordinalNumber(isoDayOfWeek, {
          unit: 'day'
        });
      // Tue

      case 'iii':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'iiiii':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'iiiiii':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'iiii':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM or PM
  a: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';

    switch (token) {
      case 'a':
      case 'aa':
      case 'aaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'aaaaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'aaaa':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;

    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    }

    switch (token) {
      case 'b':
      case 'bb':
      case 'bbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'bbbbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'bbbb':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;

    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'BBBBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'BBBB':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === 'ho') {
      var hours = date.getUTCHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return _index.default.h(date, token);
  },
  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === 'Ho') {
      return localize.ordinalNumber(date.getUTCHours(), {
        unit: 'hour'
      });
    }

    return _index.default.H(date, token);
  },
  // Hour [0-11]
  K: function (date, token, localize) {
    var hours = date.getUTCHours() % 12;

    if (token === 'Ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return (0, _index7.default)(hours, token.length);
  },
  // Hour [1-24]
  k: function (date, token, localize) {
    var hours = date.getUTCHours();
    if (hours === 0) hours = 24;

    if (token === 'ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return (0, _index7.default)(hours, token.length);
  },
  // Minute
  m: function (date, token, localize) {
    if (token === 'mo') {
      return localize.ordinalNumber(date.getUTCMinutes(), {
        unit: 'minute'
      });
    }

    return _index.default.m(date, token);
  },
  // Second
  s: function (date, token, localize) {
    if (token === 'so') {
      return localize.ordinalNumber(date.getUTCSeconds(), {
        unit: 'second'
      });
    }

    return _index.default.s(date, token);
  },
  // Fraction of second
  S: function (date, token) {
    return _index.default.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return 'Z';
    }

    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`

      case 'XXXX':
      case 'XX':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`

      case 'XXXXX':
      case 'XXX': // Hours and minutes with `:` delimiter

      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`

      case 'xxxx':
      case 'xx':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`

      case 'xxxxx':
      case 'xxx': // Hours and minutes with `:` delimiter

      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (GMT)
  O: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long

      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (specific non-location)
  z: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long

      case 'zzzz':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Seconds timestamp
  t: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1000);
    return (0, _index7.default)(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return (0, _index7.default)(timestamp, token.length);
  }
};

function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;

  if (minutes === 0) {
    return sign + String(hours);
  }

  var delimiter = dirtyDelimiter || '';
  return sign + String(hours) + delimiter + (0, _index7.default)(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? '-' : '+';
    return sign + (0, _index7.default)(Math.abs(offset) / 60, 2);
  }

  return formatTimezone(offset, dirtyDelimiter);
}

function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = (0, _index7.default)(Math.floor(absOffset / 60), 2);
  var minutes = (0, _index7.default)(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

var _default = formatters;
exports.default = _default;
module.exports = exports.default;
},{"../lightFormatters/index.js":"edad03f1fca5010f453d69b051a500b3","../../../_lib/getUTCDayOfYear/index.js":"224d57fbd02b4abaaac54238bd46266c","../../../_lib/getUTCISOWeek/index.js":"f3613635cc9fc7efad7d22c854caed92","../../../_lib/getUTCISOWeekYear/index.js":"2244a9608e49ef256b18052f7e49c694","../../../_lib/getUTCWeek/index.js":"e3d3aa3003176186fc43148b0c87d694","../../../_lib/getUTCWeekYear/index.js":"7f365d2185f29a314f6b1bff3c47a7b4","../../addLeadingZeros/index.js":"8cff01970fca5c94e1d816ad5c2aa104"}],"edad03f1fca5010f453d69b051a500b3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../addLeadingZeros/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */
var formatters = {
  // Year
  y: function (date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
    var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return (0, _index.default)(token === 'yy' ? year % 100 : year, token.length);
  },
  // Month
  M: function (date, token) {
    var month = date.getUTCMonth();
    return token === 'M' ? String(month + 1) : (0, _index.default)(month + 1, 2);
  },
  // Day of the month
  d: function (date, token) {
    return (0, _index.default)(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function (date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';

    switch (token) {
      case 'a':
      case 'aa':
      case 'aaa':
        return dayPeriodEnumValue.toUpperCase();

      case 'aaaaa':
        return dayPeriodEnumValue[0];

      case 'aaaa':
      default:
        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
    }
  },
  // Hour [1-12]
  h: function (date, token) {
    return (0, _index.default)(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function (date, token) {
    return (0, _index.default)(date.getUTCHours(), token.length);
  },
  // Minute
  m: function (date, token) {
    return (0, _index.default)(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function (date, token) {
    return (0, _index.default)(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function (date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return (0, _index.default)(fractionalSeconds, token.length);
  }
};
var _default = formatters;
exports.default = _default;
module.exports = exports.default;
},{"../../addLeadingZeros/index.js":"8cff01970fca5c94e1d816ad5c2aa104"}],"8cff01970fca5c94e1d816ad5c2aa104":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addLeadingZeros;

function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? '-' : '';
  var output = Math.abs(number).toString();

  while (output.length < targetLength) {
    output = '0' + output;
  }

  return sign + output;
}

module.exports = exports.default;
},{}],"224d57fbd02b4abaaac54238bd46266c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCDayOfYear;

var _index = _interopRequireDefault(require("../../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_DAY = 86400000; // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCDayOfYear(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}

module.exports = exports.default;
},{"../../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"f3613635cc9fc7efad7d22c854caed92":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCISOWeek;

var _index = _interopRequireDefault(require("../../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../startOfUTCISOWeek/index.js"));

var _index3 = _interopRequireDefault(require("../startOfUTCISOWeekYear/index.js"));

var _index4 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCISOWeek(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var diff = (0, _index2.default)(date).getTime() - (0, _index3.default)(date).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

module.exports = exports.default;
},{"../../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../startOfUTCISOWeek/index.js":"1b7c3193f71ebe9277f9bc6bc4f40cbe","../startOfUTCISOWeekYear/index.js":"dee4c2bbd2900d81637454612074d77c","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"1b7c3193f71ebe9277f9bc6bc4f40cbe":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCISOWeek;

var _index = _interopRequireDefault(require("../../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCISOWeek(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var weekStartsOn = 1;
  var date = (0, _index.default)(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"dee4c2bbd2900d81637454612074d77c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCISOWeekYear;

var _index = _interopRequireDefault(require("../getUTCISOWeekYear/index.js"));

var _index2 = _interopRequireDefault(require("../startOfUTCISOWeek/index.js"));

var _index3 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCISOWeekYear(dirtyDate) {
  (0, _index3.default)(1, arguments);
  var year = (0, _index.default)(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = (0, _index2.default)(fourthOfJanuary);
  return date;
}

module.exports = exports.default;
},{"../getUTCISOWeekYear/index.js":"2244a9608e49ef256b18052f7e49c694","../startOfUTCISOWeek/index.js":"1b7c3193f71ebe9277f9bc6bc4f40cbe","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"2244a9608e49ef256b18052f7e49c694":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCISOWeekYear;

var _index = _interopRequireDefault(require("../../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../startOfUTCISOWeek/index.js"));

var _index3 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCISOWeekYear(dirtyDate) {
  (0, _index3.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0, _index2.default)(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0, _index2.default)(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

module.exports = exports.default;
},{"../../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../startOfUTCISOWeek/index.js":"1b7c3193f71ebe9277f9bc6bc4f40cbe","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e3d3aa3003176186fc43148b0c87d694":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCWeek;

var _index = _interopRequireDefault(require("../../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../startOfUTCWeek/index.js"));

var _index3 = _interopRequireDefault(require("../startOfUTCWeekYear/index.js"));

var _index4 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCWeek(dirtyDate, options) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var diff = (0, _index2.default)(date, options).getTime() - (0, _index3.default)(date, options).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

module.exports = exports.default;
},{"../../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../startOfUTCWeek/index.js":"c6972dc14416654e45ba64c66596216a","../startOfUTCWeekYear/index.js":"edfd573747c63af6dffafae4aaa06701","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"c6972dc14416654e45ba64c66596216a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCWeek;

var _index = _interopRequireDefault(require("../toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCWeek(dirtyDate, dirtyOptions) {
  (0, _index3.default)(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0, _index2.default)(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"edfd573747c63af6dffafae4aaa06701":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCWeekYear;

var _index = _interopRequireDefault(require("../toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../getUTCWeekYear/index.js"));

var _index3 = _interopRequireDefault(require("../startOfUTCWeek/index.js"));

var _index4 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
  (0, _index4.default)(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index.default)(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index.default)(options.firstWeekContainsDate);
  var year = (0, _index2.default)(dirtyDate, dirtyOptions);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = (0, _index3.default)(firstWeek, dirtyOptions);
  return date;
}

module.exports = exports.default;
},{"../toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../getUTCWeekYear/index.js":"7f365d2185f29a314f6b1bff3c47a7b4","../startOfUTCWeek/index.js":"c6972dc14416654e45ba64c66596216a","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"7f365d2185f29a314f6b1bff3c47a7b4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCWeekYear;

var _index = _interopRequireDefault(require("../toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../startOfUTCWeek/index.js"));

var _index4 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCWeekYear(dirtyDate, dirtyOptions) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var year = date.getUTCFullYear();
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index.default)(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index.default)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0, _index3.default)(firstWeekOfNextYear, dirtyOptions);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0, _index3.default)(firstWeekOfThisYear, dirtyOptions);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

module.exports = exports.default;
},{"../toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../startOfUTCWeek/index.js":"c6972dc14416654e45ba64c66596216a","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"c5cae08211bae46f320f6578b64023ec":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function dateLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'P':
      return formatLong.date({
        width: 'short'
      });

    case 'PP':
      return formatLong.date({
        width: 'medium'
      });

    case 'PPP':
      return formatLong.date({
        width: 'long'
      });

    case 'PPPP':
    default:
      return formatLong.date({
        width: 'full'
      });
  }
}

function timeLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'p':
      return formatLong.time({
        width: 'short'
      });

    case 'pp':
      return formatLong.time({
        width: 'medium'
      });

    case 'ppp':
      return formatLong.time({
        width: 'long'
      });

    case 'pppp':
    default:
      return formatLong.time({
        width: 'full'
      });
  }
}

function dateTimeLongFormatter(pattern, formatLong) {
  var matchResult = pattern.match(/(P+)(p+)?/);
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  var dateTimeFormat;

  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({
        width: 'short'
      });
      break;

    case 'PP':
      dateTimeFormat = formatLong.dateTime({
        width: 'medium'
      });
      break;

    case 'PPP':
      dateTimeFormat = formatLong.dateTime({
        width: 'long'
      });
      break;

    case 'PPPP':
    default:
      dateTimeFormat = formatLong.dateTime({
        width: 'full'
      });
      break;
  }

  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
}

var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var _default = longFormatters;
exports.default = _default;
module.exports = exports.default;
},{}],"c72cd04215458e3a41ee275d842547f7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isProtectedDayOfYearToken = isProtectedDayOfYearToken;
exports.isProtectedWeekYearToken = isProtectedWeekYearToken;
exports.throwProtectedError = throwProtectedError;
var protectedDayOfYearTokens = ['D', 'DD'];
var protectedWeekYearTokens = ['YY', 'YYYY'];

function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}

function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}

function throwProtectedError(token, format, input) {
  if (token === 'YYYY') {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'YY') {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'D') {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'DD') {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  }
}
},{}],"f26f2bc96ec50f6f32d2e74132053377":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistance;

var _index = _interopRequireDefault(require("../compareAsc/index.js"));

var _index2 = _interopRequireDefault(require("../differenceInMonths/index.js"));

var _index3 = _interopRequireDefault(require("../differenceInSeconds/index.js"));

var _index4 = _interopRequireDefault(require("../locale/en-US/index.js"));

var _index5 = _interopRequireDefault(require("../toDate/index.js"));

var _index6 = _interopRequireDefault(require("../_lib/cloneObject/index.js"));

var _index7 = _interopRequireDefault(require("../_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index8 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MINUTES_IN_DAY = 1440;
var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_TWO_MONTHS = 86400;
/**
 * @name formatDistance
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `distanceInWords ` to `formatDistance`
 *   to make its name consistent with `format` and `formatRelative`.
 *
 * - The order of arguments is swapped to make the function
 *   consistent with `differenceIn...` functions.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWords(
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     new Date(1986, 3, 4, 11, 32, 0),
 *     { addSuffix: true }
 *   ) //=> 'in about 1 hour'
 *
 *   // v2.0.0 onward
 *
 *   formatDistance(
 *     new Date(1986, 3, 4, 11, 32, 0),
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     { addSuffix: true }
 *   ) //=> 'in about 1 hour'
 *   ```
 *
 * @param {Date|Number} date - the date
 * @param {Date|Number} baseDate - the date to compare with
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `baseDate` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * var result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * var result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * var result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * var result = formatDistance(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> 'pli ol 1 jaro'
 */

function formatDistance(dirtyDate, dirtyBaseDate, dirtyOptions) {
  (0, _index8.default)(2, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale || _index4.default;

  if (!locale.formatDistance) {
    throw new RangeError('locale must contain formatDistance property');
  }

  var comparison = (0, _index.default)(dirtyDate, dirtyBaseDate);

  if (isNaN(comparison)) {
    throw new RangeError('Invalid time value');
  }

  var localizeOptions = (0, _index6.default)(options);
  localizeOptions.addSuffix = Boolean(options.addSuffix);
  localizeOptions.comparison = comparison;
  var dateLeft;
  var dateRight;

  if (comparison > 0) {
    dateLeft = (0, _index5.default)(dirtyBaseDate);
    dateRight = (0, _index5.default)(dirtyDate);
  } else {
    dateLeft = (0, _index5.default)(dirtyDate);
    dateRight = (0, _index5.default)(dirtyBaseDate);
  }

  var seconds = (0, _index3.default)(dateRight, dateLeft);
  var offsetInSeconds = ((0, _index7.default)(dateRight) - (0, _index7.default)(dateLeft)) / 1000;
  var minutes = Math.round((seconds - offsetInSeconds) / 60);
  var months; // 0 up to 2 mins

  if (minutes < 2) {
    if (options.includeSeconds) {
      if (seconds < 5) {
        return locale.formatDistance('lessThanXSeconds', 5, localizeOptions);
      } else if (seconds < 10) {
        return locale.formatDistance('lessThanXSeconds', 10, localizeOptions);
      } else if (seconds < 20) {
        return locale.formatDistance('lessThanXSeconds', 20, localizeOptions);
      } else if (seconds < 40) {
        return locale.formatDistance('halfAMinute', null, localizeOptions);
      } else if (seconds < 60) {
        return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
      } else {
        return locale.formatDistance('xMinutes', 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
      } else {
        return locale.formatDistance('xMinutes', minutes, localizeOptions);
      }
    } // 2 mins up to 0.75 hrs

  } else if (minutes < 45) {
    return locale.formatDistance('xMinutes', minutes, localizeOptions); // 0.75 hrs up to 1.5 hrs
  } else if (minutes < 90) {
    return locale.formatDistance('aboutXHours', 1, localizeOptions); // 1.5 hrs up to 24 hrs
  } else if (minutes < MINUTES_IN_DAY) {
    var hours = Math.round(minutes / 60);
    return locale.formatDistance('aboutXHours', hours, localizeOptions); // 1 day up to 1.75 days
  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
    return locale.formatDistance('xDays', 1, localizeOptions); // 1.75 days up to 30 days
  } else if (minutes < MINUTES_IN_MONTH) {
    var days = Math.round(minutes / MINUTES_IN_DAY);
    return locale.formatDistance('xDays', days, localizeOptions); // 1 month up to 2 months
  } else if (minutes < MINUTES_IN_TWO_MONTHS) {
    months = Math.round(minutes / MINUTES_IN_MONTH);
    return locale.formatDistance('aboutXMonths', months, localizeOptions);
  }

  months = (0, _index2.default)(dateRight, dateLeft); // 2 months up to 12 months

  if (months < 12) {
    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
    return locale.formatDistance('xMonths', nearestMonth, localizeOptions); // 1 year up to max Date
  } else {
    var monthsSinceStartOfYear = months % 12;
    var years = Math.floor(months / 12); // N years up to 1 years 3 months

    if (monthsSinceStartOfYear < 3) {
      return locale.formatDistance('aboutXYears', years, localizeOptions); // N years 3 months up to N years 9 months
    } else if (monthsSinceStartOfYear < 9) {
      return locale.formatDistance('overXYears', years, localizeOptions); // N years 9 months up to N year 12 months
    } else {
      return locale.formatDistance('almostXYears', years + 1, localizeOptions);
    }
  }
}

module.exports = exports.default;
},{"../compareAsc/index.js":"b04482b11d51799a5c68a70b87615149","../differenceInMonths/index.js":"cb69a5f4f1d92f10394e57b4ab1bcbd0","../differenceInSeconds/index.js":"e36bd3db1290140be285bef03e3cf595","../locale/en-US/index.js":"64a45174a7b8aab2ebedcd537506623f","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/cloneObject/index.js":"97dd7e714d3db78e47931eba030ebbc5","../_lib/getTimezoneOffsetInMilliseconds/index.js":"e1613370c964787e828d6e71e9590bf4","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"97dd7e714d3db78e47931eba030ebbc5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cloneObject;

var _index = _interopRequireDefault(require("../assign/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cloneObject(dirtyObject) {
  return (0, _index.default)({}, dirtyObject);
}

module.exports = exports.default;
},{"../assign/index.js":"c7bdd937395d9cd7fcc13dedfeb5c069"}],"c7bdd937395d9cd7fcc13dedfeb5c069":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assign;

function assign(target, dirtyObject) {
  if (target == null) {
    throw new TypeError('assign requires that input parameter not be null or undefined');
  }

  dirtyObject = dirtyObject || {};

  for (var property in dirtyObject) {
    if (dirtyObject.hasOwnProperty(property)) {
      target[property] = dirtyObject[property];
    }
  }

  return target;
}

module.exports = exports.default;
},{}],"cad7995075a76bac8ef24c788ff855d5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistanceStrict;

var _index = _interopRequireDefault(require("../_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index2 = _interopRequireDefault(require("../compareAsc/index.js"));

var _index3 = _interopRequireDefault(require("../toDate/index.js"));

var _index4 = _interopRequireDefault(require("../differenceInSeconds/index.js"));

var _index5 = _interopRequireDefault(require("../_lib/cloneObject/index.js"));

var _index6 = _interopRequireDefault(require("../locale/en-US/index.js"));

var _index7 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MINUTES_IN_DAY = 1440;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_YEAR = 525600;
/**
 * @name formatDistanceStrict
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `distanceInWordsStrict` to `formatDistanceStrict`
 *   to make its name consistent with `format` and `formatRelative`.
 *
 * - The order of arguments is swapped to make the function
 *   consistent with `differenceIn...` functions.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWordsStrict(
 *     new Date(2015, 0, 2),
 *     new Date(2014, 6, 2)
 *   ) //=> '6 months'
 *
 *   // v2.0.0 onward
 *
 *   formatDistanceStrict(
 *     new Date(2014, 6, 2),
 *     new Date(2015, 0, 2)
 *   ) //=> '6 months'
 *   ```
 *
 * - `partialMethod` option is renamed to `roundingMethod`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWordsStrict(
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     { partialMethod: 'ceil' }
 *   ) //=> '2 minutes'
 *
 *   // v2.0.0 onward
 *
 *   formatDistanceStrict(
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     { roundingMethod: 'ceil' }
 *   ) //=> '2 minutes'
 *   ```
 *
 * - If `roundingMethod` is not specified, it now defaults to `round` instead of `floor`.
 *
 * - `unit` option now accepts one of the strings:
 *   'second', 'minute', 'hour', 'day', 'month' or 'year' instead of 's', 'm', 'h', 'd', 'M' or 'Y'
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWordsStrict(
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     { unit: 'm' }
 *   )
 *
 *   // v2.0.0 onward
 *
 *   formatDistanceStrict(
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     { unit: 'minute' }
 *   )
 *   ```
 *
 * @param {Date|Number} date - the date
 * @param {Date|Number} baseDate - the date to compare with
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {'second'|'minute'|'hour'|'day'|'month'|'year'} [options.unit] - if specified, will force a unit
 * @param {'floor'|'ceil'|'round'} [options.roundingMethod='round'] - which way to round partial units
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `baseDate` must not be Invalid Date
 * @throws {RangeError} `options.roundingMethod` must be 'floor', 'ceil' or 'round'
 * @throws {RangeError} `options.unit` must be 'second', 'minute', 'hour', 'day', 'month' or 'year'
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * var result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * var result = formatDistanceStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * var result = formatDistanceStrict(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> '1 year ago'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, in minutes?
 * var result = formatDistanceStrict(new Date(2016, 0, 1), new Date(2015, 0, 1), {
 *   unit: 'minute'
 * })
 * //=> '525600 minutes'
 *
 * @example
 * // What is the distance from 1 January 2015
 * // to 28 January 2015, in months, rounded up?
 * var result = formatDistanceStrict(new Date(2015, 0, 28), new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * var result = formatDistanceStrict(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> '1 jaro'
 */

function formatDistanceStrict(dirtyDate, dirtyBaseDate, dirtyOptions) {
  (0, _index7.default)(2, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale || _index6.default;

  if (!locale.formatDistance) {
    throw new RangeError('locale must contain localize.formatDistance property');
  }

  var comparison = (0, _index2.default)(dirtyDate, dirtyBaseDate);

  if (isNaN(comparison)) {
    throw new RangeError('Invalid time value');
  }

  var localizeOptions = (0, _index5.default)(options);
  localizeOptions.addSuffix = Boolean(options.addSuffix);
  localizeOptions.comparison = comparison;
  var dateLeft;
  var dateRight;

  if (comparison > 0) {
    dateLeft = (0, _index3.default)(dirtyBaseDate);
    dateRight = (0, _index3.default)(dirtyDate);
  } else {
    dateLeft = (0, _index3.default)(dirtyDate);
    dateRight = (0, _index3.default)(dirtyBaseDate);
  }

  var roundingMethod = options.roundingMethod == null ? 'round' : String(options.roundingMethod);
  var roundingMethodFn;

  if (roundingMethod === 'floor') {
    roundingMethodFn = Math.floor;
  } else if (roundingMethod === 'ceil') {
    roundingMethodFn = Math.ceil;
  } else if (roundingMethod === 'round') {
    roundingMethodFn = Math.round;
  } else {
    throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");
  }

  var seconds = (0, _index4.default)(dateRight, dateLeft);
  var offsetInSeconds = ((0, _index.default)(dateRight) - (0, _index.default)(dateLeft)) / 1000;
  var minutes = roundingMethodFn((seconds - offsetInSeconds) / 60);
  var unit;

  if (options.unit == null) {
    if (minutes < 1) {
      unit = 'second';
    } else if (minutes < 60) {
      unit = 'minute';
    } else if (minutes < MINUTES_IN_DAY) {
      unit = 'hour';
    } else if (minutes < MINUTES_IN_MONTH) {
      unit = 'day';
    } else if (minutes < MINUTES_IN_YEAR) {
      unit = 'month';
    } else {
      unit = 'year';
    }
  } else {
    unit = String(options.unit);
  } // 0 up to 60 seconds


  if (unit === 'second') {
    return locale.formatDistance('xSeconds', seconds, localizeOptions); // 1 up to 60 mins
  } else if (unit === 'minute') {
    return locale.formatDistance('xMinutes', minutes, localizeOptions); // 1 up to 24 hours
  } else if (unit === 'hour') {
    var hours = roundingMethodFn(minutes / 60);
    return locale.formatDistance('xHours', hours, localizeOptions); // 1 up to 30 days
  } else if (unit === 'day') {
    var days = roundingMethodFn(minutes / MINUTES_IN_DAY);
    return locale.formatDistance('xDays', days, localizeOptions); // 1 up to 12 months
  } else if (unit === 'month') {
    var months = roundingMethodFn(minutes / MINUTES_IN_MONTH);
    return locale.formatDistance('xMonths', months, localizeOptions); // 1 year up to max Date
  } else if (unit === 'year') {
    var years = roundingMethodFn(minutes / MINUTES_IN_YEAR);
    return locale.formatDistance('xYears', years, localizeOptions);
  }

  throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'");
}

module.exports = exports.default;
},{"../_lib/getTimezoneOffsetInMilliseconds/index.js":"e1613370c964787e828d6e71e9590bf4","../compareAsc/index.js":"b04482b11d51799a5c68a70b87615149","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../differenceInSeconds/index.js":"e36bd3db1290140be285bef03e3cf595","../_lib/cloneObject/index.js":"97dd7e714d3db78e47931eba030ebbc5","../locale/en-US/index.js":"64a45174a7b8aab2ebedcd537506623f","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e3a91c3d174f69e12f671cb9cbf559d6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistanceToNow;

var _index = _interopRequireDefault(require("../formatDistance/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatDistanceToNow
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given date and now in words.
 *
 * | Distance to now                                                   | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance to now     | Result               |
 * |---------------------|----------------------|
 * | 0 secs ... 5 secs   | less than 5 seconds  |
 * | 5 secs ... 10 secs  | less than 10 seconds |
 * | 10 secs ... 20 secs | less than 20 seconds |
 * | 20 secs ... 40 secs | half a minute        |
 * | 40 secs ... 60 secs | less than a minute   |
 * | 60 secs ... 90 secs | 1 minute             |
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `distanceInWordsToNow ` to `formatDistanceToNow`
 *   to make its name consistent with `format` and `formatRelative`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWordsToNow(new Date(2014, 6, 2), { addSuffix: true })
 *   //=> 'in 6 months'
 *
 *   // v2.0.0 onward
 *
 *   formatDistanceToNow(new Date(2014, 6, 2), { addSuffix: true })
 *   //=> 'in 6 months'
 *   ```
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - the object with options
 * @param {Boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {Boolean} [options.addSuffix=false] - result specifies if now is earlier or later than the passed date
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * var result = formatDistanceToNow(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * var result = formatDistanceToNow(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   {includeSeconds: true}
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * var result = formatDistanceToNow(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in about 1 year'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 August 2016 in Esperanto?
 * var eoLocale = require('date-fns/locale/eo')
 * var result = formatDistanceToNow(
 *   new Date(2016, 7, 1),
 *   {locale: eoLocale}
 * )
 * //=> 'pli ol 1 jaro'
 */
function formatDistanceToNow(dirtyDate, dirtyOptions) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate, Date.now(), dirtyOptions);
}

module.exports = exports.default;
},{"../formatDistance/index.js":"f26f2bc96ec50f6f32d2e74132053377","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"4287171b502a903b79ebcc55ca87c654":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistanceToNowStrict;

var _index = _interopRequireDefault(require("../formatDistanceStrict/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatDistanceToNowStrict
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {'second'|'minute'|'hour'|'day'|'month'|'year'} [options.unit] - if specified, will force a unit
 * @param {'floor'|'ceil'|'round'} [options.roundingMethod='round'] - which way to round partial units
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * var result = formatDistanceToNowStrict(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * var result = formatDistanceToNowStrict(
 *   new Date(2015, 0, 1, 0, 0, 15)
 * )
 * //=> '20 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * var result = formatDistanceToNowStrict(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in 1 year'
 *
 * @example
 * // If today is 28 January 2015,
 * // what is the distance to 1 January 2015, in months, rounded up??
 * var result = formatDistanceToNowStrict(new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 August 2016 in Esperanto?
 * var eoLocale = require('date-fns/locale/eo')
 * var result = formatDistanceToNowStrict(
 *   new Date(2016, 7, 1),
 *   {locale: eoLocale}
 * )
 * //=> '1 jaro'
 */
function formatDistanceToNowStrict(dirtyDate, dirtyOptions) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate, Date.now(), dirtyOptions);
}

module.exports = exports.default;
},{"../formatDistanceStrict/index.js":"cad7995075a76bac8ef24c788ff855d5","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"46046c529c6bfe793a16c15cce52341d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDuration;

var _index = _interopRequireDefault(require("../locale/en-US/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultFormat = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];
/**
 * @name formatDuration
 * @category Common Helpers
 * @summary Formats a duration in human-readable format
 *
 * @description
 * Return human-readable duration string i.e. "9 months 2 days"
 *
 * @param {Duration} duration - the duration to format
 * @param {Object} [options] - an object with options.

 * @param {string[]} [options.format=['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']] - the array of units to format
 * @param {boolean} [options.zero=false] - should be zeros be included in the output?
 * @param {string} [options.delimiter=' '] - delimiter string
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {string} the formatted date string
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Format full duration
 * formatDuration({
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> '2 years 9 months 1 week 7 days 5 hours 9 minutes 30 seconds
 *
 * @example
 * // Format partial duration
 * formatDuration({ months: 9, days: 2 })
 * //=> '9 months 2 days'
 *
 * @example
 * // Customize the format
 * formatDuration(
 *   {
 *     years: 2,
 *     months: 9,
 *     weeks: 1,
 *     days: 7,
 *     hours: 5,
 *     minutes: 9,
 *     seconds: 30
 *   },
 *   { format: ['months', 'weeks'] }
 * ) === '9 months 1 week'
 *
 * @example
 * // Customize the zeros presence
 * formatDuration({ years: 0, months: 9 })
 * //=> '9 months'
 * formatDuration({ years: 0, months: 9 }, null, { zero: true })
 * //=> '0 years 9 months'
 *
 * @example
 * // Customize the delimiter
 * formatDuration({ years: 2, months: 9, weeks: 3 }, { delimiter: ', ' })
 * //=> '2 years, 9 months, 3 weeks'
 */

function formatDuration(duration) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (arguments.length < 1) {
    throw new TypeError("1 argument required, but only ".concat(arguments.length, " present"));
  }

  var format = options.format || defaultFormat;
  var locale = options.locale || _index.default;
  var zero = options.zero || false;
  var delimiter = options.delimiter || ' ';
  var result = format.reduce(function (acc, unit) {
    var token = "x".concat(unit.replace(/(^.)/, function (m) {
      return m.toUpperCase();
    }));
    var addChunk = typeof duration[unit] === 'number' && (zero || duration[unit]);
    return addChunk ? acc.concat(locale.formatDistance(token, duration[unit])) : acc;
  }, []).join(delimiter);
  return result;
}

module.exports = exports.default;
},{"../locale/en-US/index.js":"64a45174a7b8aab2ebedcd537506623f"}],"cec88e60960d0931b8bb01acad62380a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatISO;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../isValid/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/addLeadingZeros/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatISO
 * @category Common Helpers
 * @summary Format the date according to the ISO 8601 standard (http://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a003169814.htm).
 *
 * @description
 * Return the formatted date string in ISO 8601 format. Options may be passed to control the parts and notations of the date.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {'extended'|'basic'} [options.format='extended'] - if 'basic', hide delimiters between date and time values.
 * @param {'complete'|'date'|'time'} [options.representation='complete'] - format date, time with time zone, or both.
 * @returns {String} the formatted date string
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.format` must be 'extended' or 'basic'
 * @throws {RangeError} `options.represenation` must be 'date', 'time' or 'complete'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format (UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601, short format (UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918T190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, date only:
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, time only (UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52Z'
 */
function formatISO(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError("1 argument required, but only ".concat(arguments.length, " present"));
  }

  var originalDate = (0, _index.default)(dirtyDate);

  if (!(0, _index2.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  }

  var options = dirtyOptions || {};
  var format = options.format == null ? 'extended' : String(options.format);
  var representation = options.representation == null ? 'complete' : String(options.representation);

  if (format !== 'extended' && format !== 'basic') {
    throw new RangeError("format must be 'extended' or 'basic'");
  }

  if (representation !== 'date' && representation !== 'time' && representation !== 'complete') {
    throw new RangeError("representation must be 'date', 'time', or 'complete'");
  }

  var result = '';
  var tzOffset = '';
  var dateDelimiter = format === 'extended' ? '-' : '';
  var timeDelimiter = format === 'extended' ? ':' : ''; // Representation is either 'date' or 'complete'

  if (representation !== 'time') {
    var day = (0, _index3.default)(originalDate.getDate(), 2);
    var month = (0, _index3.default)(originalDate.getMonth() + 1, 2);
    var year = (0, _index3.default)(originalDate.getFullYear(), 4); // yyyyMMdd or yyyy-MM-dd.

    result = "".concat(year).concat(dateDelimiter).concat(month).concat(dateDelimiter).concat(day);
  } // Representation is either 'time' or 'complete'


  if (representation !== 'date') {
    // Add the timezone.
    var offset = originalDate.getTimezoneOffset();

    if (offset !== 0) {
      var absoluteOffset = Math.abs(offset);
      var hourOffset = (0, _index3.default)(Math.floor(absoluteOffset / 60), 2);
      var minuteOffset = (0, _index3.default)(absoluteOffset % 60, 2); // If less than 0, the sign is +, because it is ahead of time.

      var sign = offset < 0 ? '+' : '-';
      tzOffset = "".concat(sign).concat(hourOffset, ":").concat(minuteOffset);
    } else {
      tzOffset = 'Z';
    }

    var hour = (0, _index3.default)(originalDate.getHours(), 2);
    var minute = (0, _index3.default)(originalDate.getMinutes(), 2);
    var second = (0, _index3.default)(originalDate.getSeconds(), 2); // If there's also date, separate it with time with 'T'

    var separator = result === '' ? '' : 'T'; // Creates a time string consisting of hour, minute, and second, separated by delimiters, if defined.

    var time = [hour, minute, second].join(timeDelimiter); // HHmmss or HH:mm:ss.

    result = "".concat(result).concat(separator).concat(time).concat(tzOffset);
  }

  return result;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../isValid/index.js":"e498f8242893901cb098193d741d5e7a","../_lib/addLeadingZeros/index.js":"8cff01970fca5c94e1d816ad5c2aa104"}],"b21ae32a71a4abde22435b4dd50b72a7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatISO9075;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../isValid/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/addLeadingZeros/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatISO9075
 * @category Common Helpers
 * @summary Format the date according to the ISO 9075 standard (https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_get-format).
 *
 * @description
 * Return the formatted date string in ISO 9075 format. Options may be passed to control the parts and notations of the date.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {'extended'|'basic'} [options.format='extended'] - if 'basic', hide delimiters between date and time values.
 * @param {'complete'|'date'|'time'} [options.representation='complete'] - format date, time, or both.
 * @returns {String} the formatted date string
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.format` must be 'extended' or 'basic'
 * @throws {RangeError} `options.represenation` must be 'date', 'time' or 'complete'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18 19:00:52'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075, short format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918 190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, date only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, time only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52'
 */
function formatISO9075(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError("1 argument required, but only ".concat(arguments.length, " present"));
  }

  var originalDate = (0, _index.default)(dirtyDate);

  if (!(0, _index2.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  }

  var options = dirtyOptions || {};
  var format = options.format == null ? 'extended' : String(options.format);
  var representation = options.representation == null ? 'complete' : String(options.representation);

  if (format !== 'extended' && format !== 'basic') {
    throw new RangeError("format must be 'extended' or 'basic'");
  }

  if (representation !== 'date' && representation !== 'time' && representation !== 'complete') {
    throw new RangeError("representation must be 'date', 'time', or 'complete'");
  }

  var result = '';
  var dateDelimiter = format === 'extended' ? '-' : '';
  var timeDelimiter = format === 'extended' ? ':' : ''; // Representation is either 'date' or 'complete'

  if (representation !== 'time') {
    var day = (0, _index3.default)(originalDate.getDate(), 2);
    var month = (0, _index3.default)(originalDate.getMonth() + 1, 2);
    var year = (0, _index3.default)(originalDate.getFullYear(), 4); // yyyyMMdd or yyyy-MM-dd.

    result = "".concat(year).concat(dateDelimiter).concat(month).concat(dateDelimiter).concat(day);
  } // Representation is either 'time' or 'complete'


  if (representation !== 'date') {
    var hour = (0, _index3.default)(originalDate.getHours(), 2);
    var minute = (0, _index3.default)(originalDate.getMinutes(), 2);
    var second = (0, _index3.default)(originalDate.getSeconds(), 2); // If there's also date, separate it with time with a space

    var separator = result === '' ? '' : ' '; // HHmmss or HH:mm:ss.

    result = "".concat(result).concat(separator).concat(hour).concat(timeDelimiter).concat(minute).concat(timeDelimiter).concat(second);
  }

  return result;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../isValid/index.js":"e498f8242893901cb098193d741d5e7a","../_lib/addLeadingZeros/index.js":"8cff01970fca5c94e1d816ad5c2aa104"}],"9511734b55c82b556eeea741e98b2529":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatISODuration;

var _index = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatISODuration
 * @category Common Helpers
 * @summary Format a duration object according as ISO 8601 duration string
 *
 * @description
 * Format a duration object according to the ISO 8601 duration standard (https://www.digi.com/resources/documentation/digidocs/90001437-13/reference/r_iso_8601_duration_format.htm)
 *
 * @param {Duration} duration - the duration to format
 *
 * @returns {String} The ISO 8601 duration string
 * @throws {TypeError} Requires 1 argument
 * @throws {Error} Argument must be an object
 *
 * @example
 * // Format the given duration as ISO 8601 string
 * formatISODuration({
 *   years: 39,
 *   months: 2,
 *   days: 20,
 *   hours: 7,
 *   minutes: 5,
 *   seconds: 0
 * })
 * //=> 'P39Y2M20DT0H0M0S'
 */
function formatISODuration(duration) {
  (0, _index.default)(1, arguments);
  if (typeof duration !== 'object') throw new Error('Duration must be an object');
  var _duration$years = duration.years,
      years = _duration$years === void 0 ? 0 : _duration$years,
      _duration$months = duration.months,
      months = _duration$months === void 0 ? 0 : _duration$months,
      _duration$days = duration.days,
      days = _duration$days === void 0 ? 0 : _duration$days,
      _duration$hours = duration.hours,
      hours = _duration$hours === void 0 ? 0 : _duration$hours,
      _duration$minutes = duration.minutes,
      minutes = _duration$minutes === void 0 ? 0 : _duration$minutes,
      _duration$seconds = duration.seconds,
      seconds = _duration$seconds === void 0 ? 0 : _duration$seconds;
  return "P".concat(years, "Y").concat(months, "M").concat(days, "DT").concat(hours, "H").concat(minutes, "M").concat(seconds, "S");
}

module.exports = exports.default;
},{"../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"337e1183fe2e777440e0896dc87d149d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRFC3339;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../isValid/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/addLeadingZeros/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatRFC3339
 * @category Common Helpers
 * @summary Format the date according to the ISO 3339 standard (https://tools.ietf.org/html/rfc3339#section-5.6).
 *
 * @description
 * Return the formatted date string in ISO 3339 format. Options may be passed to control the parts and notations of the date.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {0|1|2|3} [options.fractionDigits=0] - number of digits after the decimal point after seconds
 * @returns {String} the formatted date string
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.fractionDigits` must be between 0 and 3
 *
 * @example
 * // Represent 18 September 2019 in ISO 3339 format:
 * const result = formatRFC3339(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 3339 format, 2 digits of second fraction:
 * const result = formatRFC3339(new Date(2019, 8, 18, 19, 0, 52, 234), { fractionDigits: 2 })
 * //=> '2019-09-18T19:00:52.23Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 3339 format, 3 digits of second fraction
 * const result = formatRFC3339(new Date(2019, 8, 18, 19, 0, 52, 234), { fractionDigits: 3 })
 * //=> '2019-09-18T19:00:52.234Z'
 */
function formatRFC3339(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError("1 arguments required, but only ".concat(arguments.length, " present"));
  }

  var originalDate = (0, _index.default)(dirtyDate);

  if (!(0, _index2.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  }

  var options = dirtyOptions || {};
  var fractionDigits = options.fractionDigits == null ? 0 : (0, _index4.default)(options.fractionDigits); // Test if fractionDigits is between 0 and 3 _and_ is not NaN

  if (!(fractionDigits >= 0 && fractionDigits <= 3)) {
    throw new RangeError('fractionDigits must be between 0 and 3 inclusively');
  }

  var day = (0, _index3.default)(originalDate.getDate(), 2);
  var month = (0, _index3.default)(originalDate.getMonth() + 1, 2);
  var year = originalDate.getFullYear();
  var hour = (0, _index3.default)(originalDate.getHours(), 2);
  var minute = (0, _index3.default)(originalDate.getMinutes(), 2);
  var second = (0, _index3.default)(originalDate.getSeconds(), 2);
  var fractionalSecond = '';

  if (fractionDigits > 0) {
    var milliseconds = originalDate.getMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, fractionDigits - 3));
    fractionalSecond = '.' + (0, _index3.default)(fractionalSeconds, fractionDigits);
  }

  var offset = '';
  var tzOffset = originalDate.getTimezoneOffset();

  if (tzOffset !== 0) {
    var absoluteOffset = Math.abs(tzOffset);
    var hourOffset = (0, _index3.default)((0, _index4.default)(absoluteOffset / 60), 2);
    var minuteOffset = (0, _index3.default)(absoluteOffset % 60, 2); // If less than 0, the sign is +, because it is ahead of time.

    var sign = tzOffset < 0 ? '+' : '-';
    offset = "".concat(sign).concat(hourOffset, ":").concat(minuteOffset);
  } else {
    offset = 'Z';
  }

  return "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hour, ":").concat(minute, ":").concat(second).concat(fractionalSecond).concat(offset);
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../isValid/index.js":"e498f8242893901cb098193d741d5e7a","../_lib/addLeadingZeros/index.js":"8cff01970fca5c94e1d816ad5c2aa104","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e"}],"d23e2348fc30428dcecca286a3cc6302":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRFC7231;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../isValid/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/addLeadingZeros/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/**
 * @name formatRFC7231
 * @category Common Helpers
 * @summary Format the date according to the RFC 7231 standard (https://tools.ietf.org/html/rfc7231#section-7.1.1.1).
 *
 * @description
 * Return the formatted date string in RFC 7231 format.
 * The result will always be in UTC timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {String} the formatted date string
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 *
 * @example
 * // Represent 18 September 2019 in RFC 7231 format:
 * const result = formatRFC7231(new Date(2019, 8, 18, 19, 0, 52))
 * //=> 'Wed, 18 Sep 2019 19:00:52 GMT'
 */

function formatRFC7231(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError("1 arguments required, but only ".concat(arguments.length, " present"));
  }

  var originalDate = (0, _index.default)(dirtyDate);

  if (!(0, _index2.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  }

  var dayName = days[originalDate.getUTCDay()];
  var dayOfMonth = (0, _index3.default)(originalDate.getUTCDate(), 2);
  var monthName = months[originalDate.getUTCMonth()];
  var year = originalDate.getUTCFullYear();
  var hour = (0, _index3.default)(originalDate.getUTCHours(), 2);
  var minute = (0, _index3.default)(originalDate.getUTCMinutes(), 2);
  var second = (0, _index3.default)(originalDate.getUTCSeconds(), 2); // Result variables.

  return "".concat(dayName, ", ").concat(dayOfMonth, " ").concat(monthName, " ").concat(year, " ").concat(hour, ":").concat(minute, ":").concat(second, " GMT");
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../isValid/index.js":"e498f8242893901cb098193d741d5e7a","../_lib/addLeadingZeros/index.js":"8cff01970fca5c94e1d816ad5c2aa104"}],"32883df9534093463c147e6f123c8121":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;

var _index = _interopRequireDefault(require("../differenceInCalendarDays/index.js"));

var _index2 = _interopRequireDefault(require("../format/index.js"));

var _index3 = _interopRequireDefault(require("../locale/en-US/index.js"));

var _index4 = _interopRequireDefault(require("../subMilliseconds/index.js"));

var _index5 = _interopRequireDefault(require("../toDate/index.js"));

var _index6 = _interopRequireDefault(require("../_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index7 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name formatRelative
 * @category Common Helpers
 * @summary Represent the date in words relative to the given base date.
 *
 * @description
 * Represent the date in words relative to the given base date.
 *
 * | Distance to the base date | Result                    |
 * |---------------------------|---------------------------|
 * | Previous 6 days           | last Sunday at 04:30 AM   |
 * | Last day                  | yesterday at 04:30 AM     |
 * | Same day                  | today at 04:30 AM         |
 * | Next day                  | tomorrow at 04:30 AM      |
 * | Next 6 days               | Sunday at 04:30 AM        |
 * | Other                     | 12/31/2017                |
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to format
 * @param {Date|Number} baseDate - the date to compare with
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {String} the date in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `baseDate` must not be Invalid Date
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.locale` must contain `formatRelative` property
 */
function formatRelative(dirtyDate, dirtyBaseDate, dirtyOptions) {
  (0, _index7.default)(2, arguments);
  var date = (0, _index5.default)(dirtyDate);
  var baseDate = (0, _index5.default)(dirtyBaseDate);
  var options = dirtyOptions || {};
  var locale = options.locale || _index3.default;

  if (!locale.localize) {
    throw new RangeError('locale must contain localize property');
  }

  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }

  if (!locale.formatRelative) {
    throw new RangeError('locale must contain formatRelative property');
  }

  var diff = (0, _index.default)(date, baseDate);

  if (isNaN(diff)) {
    throw new RangeError('Invalid time value');
  }

  var token;

  if (diff < -6) {
    token = 'other';
  } else if (diff < -1) {
    token = 'lastWeek';
  } else if (diff < 0) {
    token = 'yesterday';
  } else if (diff < 1) {
    token = 'today';
  } else if (diff < 2) {
    token = 'tomorrow';
  } else if (diff < 7) {
    token = 'nextWeek';
  } else {
    token = 'other';
  }

  var utcDate = (0, _index4.default)(date, (0, _index6.default)(date));
  var utcBaseDate = (0, _index4.default)(baseDate, (0, _index6.default)(baseDate));
  var formatStr = locale.formatRelative(token, utcDate, utcBaseDate, options);
  return (0, _index2.default)(date, formatStr, options);
}

module.exports = exports.default;
},{"../differenceInCalendarDays/index.js":"8255b070c42b22dde4ff1d9e2d1f8222","../format/index.js":"c217462ea1c04722fbe0db40230d04da","../locale/en-US/index.js":"64a45174a7b8aab2ebedcd537506623f","../subMilliseconds/index.js":"d4c3fa7c1a401b98fc12fd2f31ab3db4","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/getTimezoneOffsetInMilliseconds/index.js":"e1613370c964787e828d6e71e9590bf4","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"78bd40dd208b9760ab8804267384e418":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fromUnixTime;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name fromUnixTime
 * @category Timestamp Helpers
 * @summary Create a date from a Unix timestamp.
 *
 * @description
 * Create a date from a Unix timestamp.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Number} unixTime - the given Unix timestamp
 * @returns {Date} the date
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Create the date 29 February 2012 11:45:05:
 * var result = fromUnixTime(1330515905)
 * //=> Wed Feb 29 2012 11:45:05
 */
function fromUnixTime(dirtyUnixTime) {
  (0, _index3.default)(1, arguments);
  var unixTime = (0, _index2.default)(dirtyUnixTime);
  return (0, _index.default)(unixTime * 1000);
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"dfdbada56c5e909dbb4dc7f0e91a1072":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDate;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDate
 * @category Day Helpers
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the day of month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * var result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
function getDate(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var dayOfMonth = date.getDate();
  return dayOfMonth;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"fe98ca9a7a81ba5cd11fd41eef44d9f6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDay;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {0|1|2|3|4|5|6} the day of week, 0 represents Sunday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * var result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var day = date.getDay();
  return day;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"9c22dff0a24b471b4a422965091e531c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDayOfYear;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../startOfYear/index.js"));

var _index3 = _interopRequireDefault(require("../differenceInCalendarDays/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the day of year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * var result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var diff = (0, _index3.default)(date, (0, _index2.default)(date));
  var dayOfYear = diff + 1;
  return dayOfYear;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../startOfYear/index.js":"655a08231b6bc1822e7a69e1372d74f9","../differenceInCalendarDays/index.js":"8255b070c42b22dde4ff1d9e2d1f8222","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"8298413df5cc7073c82e7242ea292acd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDaysInMonth;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the number of days in a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // How many days are in February 2000?
 * var result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"41f8ca411898af0bc8fd0b4a36122a99":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDaysInYear;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../isLeapYear/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDaysInYear
 * @category Year Helpers
 * @summary Get the number of days in a year of the given date.
 *
 * @description
 * Get the number of days in a year of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the number of days in a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // How many days are in 2012?
 * var result = getDaysInYear(new Date(2012, 0, 1))
 * //=> 366
 */
function getDaysInYear(dirtyDate) {
  (0, _index3.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);

  if (isNaN(date)) {
    return NaN;
  }

  return (0, _index2.default)(date) ? 366 : 365;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../isLeapYear/index.js":"ef313748214a21b8b16038e2f5ad1d5e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"ef313748214a21b8b16038e2f5ad1d5e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLeapYear;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isLeapYear
 * @category Year Helpers
 * @summary Is the given date in the leap year?
 *
 * @description
 * Is the given date in the leap year?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in the leap year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 1 September 2012 in the leap year?
 * var result = isLeapYear(new Date(2012, 8, 1))
 * //=> true
 */
function isLeapYear(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var year = date.getFullYear();
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"467843cfb510d5293958569f428acf18":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDecade;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDecade
 * @category Decade Helpers
 * @summary Get the decade of the given date.
 *
 * @description
 * Get the decade of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the year of decade
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which decade belongs 27 November 1942?
 * var result = getDecade(new Date(1942, 10, 27))
 * //=> 1940
 */
function getDecade(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var year = date.getFullYear();
  var decade = Math.floor(year / 10) * 10;
  return decade;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"5183d01c6c581da2f9fe2961fef70b2f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHours;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getHours
 * @category Hour Helpers
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the hours
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * var result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
function getHours(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var hours = date.getHours();
  return hours;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"6a3e0610b347e6c8e6f76863aab4f479":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getISODay;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getISODay
 * @category Weekday Helpers
 * @summary Get the day of the ISO week of the given date.
 *
 * @description
 * Get the day of the ISO week of the given date,
 * which is 7 for Sunday, 1 for Monday etc.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the day of ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the ISO week is 26 February 2012?
 * var result = getISODay(new Date(2012, 1, 26))
 * //=> 7
 */
function getISODay(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var day = date.getDay();

  if (day === 0) {
    day = 7;
  }

  return day;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"71883f1860b86a189ef2fc77e755a732":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getISOWeek;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../startOfISOWeek/index.js"));

var _index3 = _interopRequireDefault(require("../startOfISOWeekYear/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;
/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * var result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */

function getISOWeek(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var diff = (0, _index2.default)(date).getTime() - (0, _index3.default)(date).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../startOfISOWeek/index.js":"5cdfef1aaca2ce8eb5f04f653206d691","../startOfISOWeekYear/index.js":"8335b930839a50f32d190455599201c0","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e971f00d9a879791052a9d3649e54b73":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getISOWeeksInYear;

var _index = _interopRequireDefault(require("../startOfISOWeekYear/index.js"));

var _index2 = _interopRequireDefault(require("../addWeeks/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;
/**
 * @name getISOWeeksInYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * @description
 * Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the number of ISO weeks in a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // How many weeks are in ISO week-numbering year 2015?
 * var result = getISOWeeksInYear(new Date(2015, 1, 11))
 * //=> 53
 */

function getISOWeeksInYear(dirtyDate) {
  (0, _index3.default)(1, arguments);
  var thisYear = (0, _index.default)(dirtyDate);
  var nextYear = (0, _index.default)((0, _index2.default)(thisYear, 60));
  var diff = nextYear.valueOf() - thisYear.valueOf(); // Round the number of weeks to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK);
}

module.exports = exports.default;
},{"../startOfISOWeekYear/index.js":"8335b930839a50f32d190455599201c0","../addWeeks/index.js":"d7f228172dbd1739d5d2624dd7fbb932","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"535b0a56278f233d449b49867f7c0e19":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMilliseconds;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getMilliseconds
 * @category Millisecond Helpers
 * @summary Get the milliseconds of the given date.
 *
 * @description
 * Get the milliseconds of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the milliseconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the milliseconds of 29 February 2012 11:45:05.123:
 * var result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 123
 */
function getMilliseconds(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var milliseconds = date.getMilliseconds();
  return milliseconds;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"feaaedb714ccb9855efd2709a78a5d17":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMinutes;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getMinutes
 * @category Minute Helpers
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the minutes
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * var result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
function getMinutes(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var minutes = date.getMinutes();
  return minutes;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"8dee39b68db47d65f6195a33239a626d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMonth;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getMonth
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which month is 29 February 2012?
 * var result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
function getMonth(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var month = date.getMonth();
  return month;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"67ef46684e15271c1e13bd8a9b83443c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOverlappingDaysInIntervals;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
/**
 * @name getOverlappingDaysInIntervals
 * @category Interval Helpers
 * @summary Get the number of days that overlap in two time intervals
 *
 * @description
 * Get the number of days that overlap in two time intervals
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `getOverlappingDaysInRanges` to `getOverlappingDaysInIntervals`.
 *   This change was made to mirror the use of the word "interval" in standard ISO 8601:2004 terminology:
 *
 *   ```
 *   2.1.3
 *   time interval
 *   part of the time axis limited by two instants
 *   ```
 *
 *   Also, this function now accepts an object with `start` and `end` properties
 *   instead of two arguments as an interval.
 *   This function now throws `RangeError` if the start of the interval is after its end
 *   or if any date in the interval is `Invalid Date`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   getOverlappingDaysInRanges(
 *     new Date(2014, 0, 10), new Date(2014, 0, 20),
 *     new Date(2014, 0, 17), new Date(2014, 0, 21)
 *   )
 *
 *   // v2.0.0 onward
 *
 *   getOverlappingDaysInIntervals(
 *     { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *     { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 *   )
 *   ```
 *
 * @param {Interval} intervalLeft - the first interval to compare. See [Interval]{@link docs/Interval}
 * @param {Interval} intervalRight - the second interval to compare. See [Interval]{@link docs/Interval}
 * @returns {Number} the number of days that overlap in two time intervals
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For overlapping time intervals adds 1 for each started overlapping day:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> 3
 *
 * @example
 * // For non-overlapping time intervals returns 0:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> 0
 */

function getOverlappingDaysInIntervals(dirtyIntervalLeft, dirtyIntervalRight) {
  (0, _index2.default)(2, arguments);
  var intervalLeft = dirtyIntervalLeft || {};
  var intervalRight = dirtyIntervalRight || {};
  var leftStartTime = (0, _index.default)(intervalLeft.start).getTime();
  var leftEndTime = (0, _index.default)(intervalLeft.end).getTime();
  var rightStartTime = (0, _index.default)(intervalRight.start).getTime();
  var rightEndTime = (0, _index.default)(intervalRight.end).getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(leftStartTime <= leftEndTime && rightStartTime <= rightEndTime)) {
    throw new RangeError('Invalid interval');
  }

  var isOverlapping = leftStartTime < rightEndTime && rightStartTime < leftEndTime;

  if (!isOverlapping) {
    return 0;
  }

  var overlapStartDate = rightStartTime < leftStartTime ? leftStartTime : rightStartTime;
  var overlapEndDate = rightEndTime > leftEndTime ? leftEndTime : rightEndTime;
  var differenceInMs = overlapEndDate - overlapStartDate;
  return Math.ceil(differenceInMs / MILLISECONDS_IN_DAY);
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"7bd5a4d5b46a09bc32809037ff18634b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSeconds;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getSeconds
 * @category Second Helpers
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the seconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * var result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */
function getSeconds(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var seconds = date.getSeconds();
  return seconds;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"22861e17c251157a65c1c172dec5ec26":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTime;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getTime
 * @category Timestamp Helpers
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the timestamp
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * var result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */
function getTime(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var timestamp = date.getTime();
  return timestamp;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"9e48a7ab65268131d9bdb270fabd09d1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUnixTime;

var _index = _interopRequireDefault(require("../getTime/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getUnixTime
 * @category Timestamp Helpers
 * @summary Get the seconds timestamp of the given date.
 *
 * @description
 * Get the seconds timestamp of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the timestamp
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05 CET:
 * var result = getUnixTime(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 1330512305
 */
function getUnixTime(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return Math.floor((0, _index.default)(dirtyDate) / 1000);
}

module.exports = exports.default;
},{"../getTime/index.js":"22861e17c251157a65c1c172dec5ec26","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"a997e8e39a4da3af79e448fa39a525be":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWeek;

var _index = _interopRequireDefault(require("../startOfWeek/index.js"));

var _index2 = _interopRequireDefault(require("../startOfWeekYear/index.js"));

var _index3 = _interopRequireDefault(require("../toDate/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;
/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Number} the week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * var result = getISOWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * var result = getISOWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */

function getWeek(dirtyDate, options) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index3.default)(dirtyDate);
  var diff = (0, _index.default)(date, options).getTime() - (0, _index2.default)(date, options).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

module.exports = exports.default;
},{"../startOfWeek/index.js":"9773da116ecae709ccce70a09b54431c","../startOfWeekYear/index.js":"78e987916a9f12e1c18744fd944f6014","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"78e987916a9f12e1c18744fd944f6014":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfWeekYear;

var _index = _interopRequireDefault(require("../getWeekYear/index.js"));

var _index2 = _interopRequireDefault(require("../startOfWeek/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Date} the start of a week-numbering year
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * var result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * var result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfWeekYear(dirtyDate, dirtyOptions) {
  (0, _index4.default)(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index3.default)(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index3.default)(options.firstWeekContainsDate);
  var year = (0, _index.default)(dirtyDate, dirtyOptions);
  var firstWeek = new Date(0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  var date = (0, _index2.default)(firstWeek, dirtyOptions);
  return date;
}

module.exports = exports.default;
},{"../getWeekYear/index.js":"239b765e7843884489fe96ce6a15edf9","../startOfWeek/index.js":"9773da116ecae709ccce70a09b54431c","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"239b765e7843884489fe96ce6a15edf9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWeekYear;

var _index = _interopRequireDefault(require("../startOfWeek/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Number} the local week-numbering year
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * var result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * var result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * var result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
function getWeekYear(dirtyDate, dirtyOptions) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = date.getFullYear();
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index3.default)(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index3.default)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = (0, _index.default)(firstWeekOfNextYear, dirtyOptions);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = (0, _index.default)(firstWeekOfThisYear, dirtyOptions);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

module.exports = exports.default;
},{"../startOfWeek/index.js":"9773da116ecae709ccce70a09b54431c","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"4708f77d239a2a7c12ee8ec587dd8bfa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWeekOfMonth;

var _index = _interopRequireDefault(require("../getDate/index.js"));

var _index2 = _interopRequireDefault(require("../getDay/index.js"));

var _index3 = _interopRequireDefault(require("../startOfMonth/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index5 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getWeekOfMonth
 * @category Week Helpers
 * @summary Get the week of the month of the given date.
 *
 * @description
 * Get the week of the month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Number} the week of month
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Which week of the month is 9 November 2017?
 * var result = getWeekOfMonth(new Date(2017, 10, 9))
 * //=> 2
 */
function getWeekOfMonth(date, dirtyOptions) {
  (0, _index5.default)(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index4.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index4.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var currentDayOfMonth = (0, _index.default)(date);

  if (isNaN(currentDayOfMonth)) {
    return currentDayOfMonth;
  }

  var startWeekDay = (0, _index2.default)((0, _index3.default)(date));
  var lastDayOfFirstWeek = 0;

  if (startWeekDay >= weekStartsOn) {
    lastDayOfFirstWeek = weekStartsOn + 7 - startWeekDay;
  } else {
    lastDayOfFirstWeek = weekStartsOn - startWeekDay;
  }

  var weekNumber = 1;

  if (currentDayOfMonth > lastDayOfFirstWeek) {
    var remainingDaysAfterFirstWeek = currentDayOfMonth - lastDayOfFirstWeek;
    weekNumber = weekNumber + Math.ceil(remainingDaysAfterFirstWeek / 7);
  }

  return weekNumber;
}

module.exports = exports.default;
},{"../getDate/index.js":"dfdbada56c5e909dbb4dc7f0e91a1072","../getDay/index.js":"fe98ca9a7a81ba5cd11fd41eef44d9f6","../startOfMonth/index.js":"7ab6abfabd43021d3a26e7331311a7cb","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"675c288b63035ef0f5617ddbc37187e9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getWeeksInMonth;

var _index = _interopRequireDefault(require("../differenceInCalendarWeeks/index.js"));

var _index2 = _interopRequireDefault(require("../lastDayOfMonth/index.js"));

var _index3 = _interopRequireDefault(require("../startOfMonth/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getWeeksInMonth
 * @category Week Helpers
 * @summary Get the number of calendar weeks a month spans.
 *
 * @description
 * Get the number of calendar weeks the month in the given date spans.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Number} the number of calendar weeks
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // How many calendar weeks does February 2015 span?
 * var result = getWeeksInMonth(new Date(2015, 1, 8))
 * //=> 4
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks does July 2017 span?
 * var result = getWeeksInMonth(new Date(2017, 6, 5), { weekStartsOn: 1 })
 * //=> 6
 */
function getWeeksInMonth(date, options) {
  (0, _index4.default)(1, arguments);
  return (0, _index.default)((0, _index2.default)(date), (0, _index3.default)(date), options) + 1;
}

module.exports = exports.default;
},{"../differenceInCalendarWeeks/index.js":"d4d5352b34b5aee15bb4569fd972b1cf","../lastDayOfMonth/index.js":"7d2f7158ed0821a6753f961942ce1a0c","../startOfMonth/index.js":"7ab6abfabd43021d3a26e7331311a7cb","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"7d2f7158ed0821a6753f961942ce1a0c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfMonth;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfMonth
 * @category Month Helpers
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the last day of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * var result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfMonth(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"7c62184b9bdaf8d2935707eb39476f0e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getYear;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getYear
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which year is 2 July 2014?
 * var result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
function getYear(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var year = date.getFullYear();
  return year;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"ff55739890702a124dd2f05b3251e692":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = intervalToDuration;

var _index = _interopRequireDefault(require("../compareAsc/index.js"));

var _index2 = _interopRequireDefault(require("../differenceInYears/index.js"));

var _index3 = _interopRequireDefault(require("../differenceInMonths/index.js"));

var _index4 = _interopRequireDefault(require("../differenceInDays/index.js"));

var _index5 = _interopRequireDefault(require("../differenceInHours/index.js"));

var _index6 = _interopRequireDefault(require("../differenceInMinutes/index.js"));

var _index7 = _interopRequireDefault(require("../differenceInSeconds/index.js"));

var _index8 = _interopRequireDefault(require("../isValid/index.js"));

var _index9 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

var _index10 = _interopRequireDefault(require("../toDate/index.js"));

var _index11 = _interopRequireDefault(require("../sub/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name intervalToDuration
 * @category Common Helpers
 * @summary Convert interval to duration
 *
 * @description
 * Convert a interval object to a duration object.
 *
 * @param {Interval} interval - the interval to convert to duration
 *
 * @returns {Duration} The duration Object
 * @throws {TypeError} Requires 2 arguments
 * @throws {RangeError} `start` must not be Invalid Date
 * @throws {RangeError} `end` must not be Invalid Date
 *
 * @example
 * // Get the duration between January 15, 1929 and April 4, 1968.
 * intervalToDuration({
 *   start: new Date(1929, 0, 15, 12, 0, 0),
 *   end: new Date(1968, 3, 4, 19, 5, 0)
 * })
 * // => { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
 */
function intervalToDuration(_ref) {
  var start = _ref.start,
      end = _ref.end;
  (0, _index9.default)(1, arguments);
  var dateLeft = (0, _index10.default)(start);
  var dateRight = (0, _index10.default)(end);

  if (!(0, _index8.default)(dateLeft)) {
    throw new RangeError('Start Date is invalid');
  }

  if (!(0, _index8.default)(dateRight)) {
    throw new RangeError('End Date is invalid');
  }

  var duration = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  var sign = (0, _index.default)(dateLeft, dateRight);
  duration.years = Math.abs((0, _index2.default)(dateLeft, dateRight));
  var remainingMonths = (0, _index11.default)(dateLeft, {
    years: sign * duration.years
  });
  duration.months = Math.abs((0, _index3.default)(remainingMonths, dateRight));
  var remainingDays = (0, _index11.default)(remainingMonths, {
    months: sign * duration.months
  });
  duration.days = Math.abs((0, _index4.default)(remainingDays, dateRight));
  var remainingHours = (0, _index11.default)(remainingDays, {
    days: sign * duration.days
  });
  duration.hours = Math.abs((0, _index5.default)(remainingHours, dateRight));
  var remainingMinutes = (0, _index11.default)(remainingHours, {
    hours: sign * duration.hours
  });
  duration.minutes = Math.abs((0, _index6.default)(remainingMinutes, dateRight));
  var remainingSeconds = (0, _index11.default)(remainingMinutes, {
    minutes: sign * duration.minutes
  });
  duration.seconds = Math.abs((0, _index7.default)(remainingSeconds, dateRight));
  return duration;
}

module.exports = exports.default;
},{"../compareAsc/index.js":"b04482b11d51799a5c68a70b87615149","../differenceInYears/index.js":"3cb153d4a0f49dc0186870c197a4b734","../differenceInMonths/index.js":"cb69a5f4f1d92f10394e57b4ab1bcbd0","../differenceInDays/index.js":"e72a5837ea1f56123b018d801f470db5","../differenceInHours/index.js":"92048a9d588a87285c40d130e50b6b68","../differenceInMinutes/index.js":"77e3eae59cf68a6fdb8fa98359c05325","../differenceInSeconds/index.js":"e36bd3db1290140be285bef03e3cf595","../isValid/index.js":"e498f8242893901cb098193d741d5e7a","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../sub/index.js":"03521e77eb3ab73dd1ae4b9e11f0d7a1"}],"03521e77eb3ab73dd1ae4b9e11f0d7a1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sub;

var _index = _interopRequireDefault(require("../subDays/index.js"));

var _index2 = _interopRequireDefault(require("../subMonths/index.js"));

var _index3 = _interopRequireDefault(require("../toDate/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

var _index5 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name sub
 * @category Common Helpers
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Duration} duration - the object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 *
 * | Key     | Description                        |
 * |---------|------------------------------------|
 * | years   | Amount of years to be subtracted   |
 * | months  | Amount of months to be subtracted  |
 * | weeks   | Amount of weeks to be subtracted   |
 * | days    | Amount of days to be subtracted    |
 * | hours   | Amount of hours to be subtracted   |
 * | minutes | Amount of minutes to be subtracted |
 * | seconds | Amount of seconds to be subtracted |
 *
 * All values default to 0
 *
 * @returns {Date} the new date with the seconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
function sub(dirtyDate, duration) {
  (0, _index4.default)(2, arguments);
  if (!duration || typeof duration !== 'object') return new Date(NaN);
  var years = 'years' in duration ? (0, _index5.default)(duration.years) : 0;
  var months = 'months' in duration ? (0, _index5.default)(duration.months) : 0;
  var weeks = 'weeks' in duration ? (0, _index5.default)(duration.weeks) : 0;
  var days = 'days' in duration ? (0, _index5.default)(duration.days) : 0;
  var hours = 'hours' in duration ? (0, _index5.default)(duration.hours) : 0;
  var minutes = 'minutes' in duration ? (0, _index5.default)(duration.minutes) : 0;
  var seconds = 'seconds' in duration ? (0, _index5.default)(duration.seconds) : 0; // Subtract years and months

  var dateWithoutMonths = (0, _index2.default)((0, _index3.default)(dirtyDate), months + years * 12); // Subtract weeks and days

  var dateWithoutDays = (0, _index.default)(dateWithoutMonths, days + weeks * 7); // Subtract hours, minutes and seconds

  var minutestoSub = minutes + hours * 60;
  var secondstoSub = seconds + minutestoSub * 60;
  var mstoSub = secondstoSub * 1000;
  var finalDate = new Date(dateWithoutDays.getTime() - mstoSub);
  return finalDate;
}

module.exports = exports.default;
},{"../subDays/index.js":"70eaf93ad7b28e364c9f707a17d69bcf","../subMonths/index.js":"6e33148d4a1d84362d717b05a63adcee","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e"}],"70eaf93ad7b28e364c9f707a17d69bcf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subDays;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addDays/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * var result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addDays/index.js":"5fdec9afb4e5b1ea71ca3db109ea4b4a","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"6e33148d4a1d84362d717b05a63adcee":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subMonths;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addMonths/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subMonths
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * var result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
function subMonths(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addMonths/index.js":"c378d91acb6a81ab70e2f3bf5c6f8f0b","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"18372d0b3b61759ba962b2a2b35f5459":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAfter;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date that should be after the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is after the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter(dirtyDate, dirtyDateToCompare) {
  (0, _index2.default)(2, arguments);
  var date = (0, _index.default)(dirtyDate);
  var dateToCompare = (0, _index.default)(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"64fead70a1ae27ab94c3936da1f68966":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBefore;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date that should be before the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore(dirtyDate, dirtyDateToCompare) {
  (0, _index2.default)(2, arguments);
  var date = (0, _index.default)(dirtyDate);
  var dateToCompare = (0, _index.default)(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"f8dc856ec7b070a9064f46eabc655589":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDate;

var _index = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {*} value - the value to check
 * @returns {boolean} true if the given value is a date
 * @throws {TypeError} 1 arguments required
 *
 * @example
 * // For a valid date:
 * var result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * var result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * var result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * var result = isDate({})
 * //=> false
 */
function isDate(value) {
  (0, _index.default)(1, arguments);
  return value instanceof Date || typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}

module.exports = exports.default;
},{"../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"9002389ff04dcbcee3da6f5309c67e46":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEqual;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isEqual
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Boolean} the dates are equal
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * var result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
function isEqual(dirtyLeftDate, dirtyRightDate) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyLeftDate);
  var dateRight = (0, _index.default)(dirtyRightDate);
  return dateLeft.getTime() === dateRight.getTime();
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"000b6b2ea0c996a6d63a91aa1dea72a7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isExists;

/**
 * @name isExists
 * @category Common Helpers
 * @summary Is the given date exists?
 *
 * @description
 * Checks if the given arguments convert to an existing date.
 *
 * @param {Number} year of the date to check
 * @param {Number} month of the date to check
 * @param {Number} day of the date to check
 * @returns {Boolean} the date exists
 * @throws {TypeError} 3 arguments required
 *
 * @example
 * // For the valid date:
 * var result = isExists(2018, 0, 31)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isExists(2018, 1, 31)
 * //=> false
 */
function isExists(year, month, day) {
  if (arguments.length < 3) {
    throw new TypeError('3 argument required, but only ' + arguments.length + ' present');
  }

  var date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

module.exports = exports.default;
},{}],"44499fe204134bb46a09d8a800c23d5f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFirstDayOfMonth;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isFirstDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the first day of a month?
 *
 * @description
 * Is the given date the first day of a month?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is the first day of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 1 September 2014 the first day of a month?
 * var result = isFirstDayOfMonth(new Date(2014, 8, 1))
 * //=> true
 */
function isFirstDayOfMonth(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate).getDate() === 1;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"b8df0f14e0bb3af5f063c737dc50dfc6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFriday;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isFriday
 * @category Weekday Helpers
 * @summary Is the given date Friday?
 *
 * @description
 * Is the given date Friday?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Friday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 26 September 2014 Friday?
 * var result = isFriday(new Date(2014, 8, 26))
 * //=> true
 */
function isFriday(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate).getDay() === 5;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"7d8dfa1d074c1b4d18ac0018d57ff445":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFuture;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isFuture
 * @category Common Helpers
 * @summary Is the given date in the future?
 * @pure false
 *
 * @description
 * Is the given date in the future?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in the future
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 31 December 2014 in the future?
 * var result = isFuture(new Date(2014, 11, 31))
 * //=> true
 */
function isFuture(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate).getTime() > Date.now();
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"edc74cad19c0b41205865fb2a8829ffc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLastDayOfMonth;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../endOfDay/index.js"));

var _index3 = _interopRequireDefault(require("../endOfMonth/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isLastDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is the last day of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * var result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
function isLastDayOfMonth(dirtyDate) {
  (0, _index4.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  return (0, _index2.default)(date).getTime() === (0, _index3.default)(date).getTime();
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../endOfDay/index.js":"ad0eb03bd09a3bb13c3ba6ca29582aac","../endOfMonth/index.js":"13de8359936822f10aa6792c9ec3415b","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"74b61f0febcdecdbee0d218835e2ff92":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMatch;

var _index = _interopRequireDefault(require("../parse/index.js"));

var _index2 = _interopRequireDefault(require("../isValid/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isMatch
 * @category Common Helpers
 * @summary validates the date string against given formats
 *
 * @description
 * Return the true if given date is string correct against the given format else
 * will return false.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://git.io/fxCyr
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
 *
 * ```javascript
 * isMatch('23 AM', 'HH a')
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Su            | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 0001, ..., 999               |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
 * |                                 |     | PP      | May 29, 1453                      |       |
 * |                                 |     | PPP     | May 29th, 1453                    |       |
 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
 * |                                 |     | pp      | 12:00:00 AM                       |       |
 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `isMatch` will try to match both formatting and stand-alone units interchangably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `isMatch` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `isMatch` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
 *
 *    `isMatch('50', 'yy') //=> true`
 *
 *    `isMatch('75', 'yy') //=> true`
 *
 *    while `uu` will use the year as is:
 *
 *    `isMatch('50', 'uu') //=> true`
 *
 *    `isMatch('75', 'uu') //=> true`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear]{@link https://date-fns.org/docs/setISOWeekYear}
 *    and [setWeekYear]{@link https://date-fns.org/docs/setWeekYear}).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
 *
 * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
 *
 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
 *    on the given locale.
 *
 *    using `en-US` locale: `P` => `MM/dd/yyyy`
 *    using `en-US` locale: `p` => `hh:mm a`
 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
 *    using `pt-BR` locale: `p` => `HH:mm`
 *
 * Values will be checked in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are matched (e.g. when matching string 'January 1st' without a year),
 * the values will be taken from today's using `new Date()` date which works as a context of parsing.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
 *
 *
 *
 * @param {String} dateString - the date string to verify
 * @param {String} formatString - the string of tokens
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://git.io/fxCyr
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://git.io/fxCyr
 * @returns {Boolean}
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} `options.locale` must contain `match` property
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years; see: https://git.io/fxCyr
 * @throws {RangeError} use `yy` instead of `YY` for formatting years; see: https://git.io/fxCyr
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month; see: https://git.io/fxCyr
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month; see: https://git.io/fxCyr
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Match 11 February 2014 from middle-endian format:
 * var result = isMatch('02/11/2014', 'MM/dd/yyyy')
 * //=> true
 *
 * @example
 * // Match 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * var result = isMatch('28-a de februaro', "do 'de' MMMM", {
 *   locale: eo
 * })
 * //=> true
 */
function isMatch(dateString, formatString, dirtyOptions) {
  (0, _index3.default)(2, arguments);
  return (0, _index2.default)((0, _index.default)(dateString, formatString, new Date(), dirtyOptions));
}

module.exports = exports.default;
},{"../parse/index.js":"74f434cfff03493e820ee532b0e3d2f2","../isValid/index.js":"e498f8242893901cb098193d741d5e7a","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"74f434cfff03493e820ee532b0e3d2f2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _index = _interopRequireDefault(require("../locale/en-US/index.js"));

var _index2 = _interopRequireDefault(require("../subMilliseconds/index.js"));

var _index3 = _interopRequireDefault(require("../toDate/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/assign/index.js"));

var _index5 = _interopRequireDefault(require("../_lib/format/longFormatters/index.js"));

var _index6 = _interopRequireDefault(require("../_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index7 = require("../_lib/protectedTokens/index.js");

var _index8 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index9 = _interopRequireDefault(require("./_lib/parsers/index.js"));

var _index10 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TIMEZONE_UNIT_PRIORITY = 10; // This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps

var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
/**
 * @name parse
 * @category Common Helpers
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://git.io/fxCyr
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
 *
 * ```javascript
 * parse('23 AM', 'HH a', new Date())
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 0001, ..., 999               |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
 * |                                 |     | PP      | May 29, 1453                      |       |
 * |                                 |     | PPP     | May 29th, 1453                    |       |
 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
 * |                                 |     | pp      | 12:00:00 AM                       |       |
 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `parse` will try to match both formatting and stand-alone units interchangably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
 *
 *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
 *
 *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
 *
 *    while `uu` will just assign the year as is:
 *
 *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
 *
 *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear]{@link https://date-fns.org/docs/setISOWeekYear}
 *    and [setWeekYear]{@link https://date-fns.org/docs/setWeekYear}).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
 *
 * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
 *
 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
 *    on the given locale.
 *
 *    using `en-US` locale: `P` => `MM/dd/yyyy`
 *    using `en-US` locale: `p` => `hh:mm a`
 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
 *    using `pt-BR` locale: `p` => `HH:mm`
 *
 * Values will be assigned to the date in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
 * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
 *
 * `referenceDate` must be passed for correct work of the function.
 * If you're not sure which `referenceDate` to supply, create a new instance of Date:
 * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
 * In this case parsing will be done in the context of the current date.
 * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
 * then `Invalid Date` will be returned.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
 *
 * If parsing failed, `Invalid Date` will be returned.
 * Invalid Date is a Date, whose time value is NaN.
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - Old `parse` was renamed to `toDate`.
 *   Now `parse` is a new function which parses a string using a provided format.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   parse('2016-01-01')
 *
 *   // v2.0.0 onward
 *   toDate('2016-01-01')
 *   parse('2016-01-01', 'yyyy-MM-dd', new Date())
 *   ```
 *
 * @param {String} dateString - the string to parse
 * @param {String} formatString - the string of tokens
 * @param {Date|Number} referenceDate - defines values missing from the parsed dateString
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://git.io/fxCyr
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://git.io/fxCyr
 * @returns {Date} the parsed date
 * @throws {TypeError} 3 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} `options.locale` must contain `match` property
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
 * //=> Tue Feb 11 2014 00:00:00
 *
 * @example
 * // Parse 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
 *   locale: eo
 * })
 * //=> Sun Feb 28 2010 00:00:00
 */

function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, dirtyOptions) {
  (0, _index10.default)(3, arguments);
  var dateString = String(dirtyDateString);
  var formatString = String(dirtyFormatString);
  var options = dirtyOptions || {};
  var locale = options.locale || _index.default;

  if (!locale.match) {
    throw new RangeError('locale must contain match property');
  }

  var localeFirstWeekContainsDate = locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index8.default)(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index8.default)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var localeWeekStartsOn = locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index8.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index8.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  if (formatString === '') {
    if (dateString === '') {
      return (0, _index3.default)(dirtyReferenceDate);
    } else {
      return new Date(NaN);
    }
  }

  var subFnOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale // If timezone isn't specified, it will be set to the system timezone

  };
  var setters = [{
    priority: TIMEZONE_UNIT_PRIORITY,
    subPriority: -1,
    set: dateToSystemTimezone,
    index: 0
  }];
  var i;
  var tokens = formatString.match(longFormattingTokensRegExp).map(function (substring) {
    var firstCharacter = substring[0];

    if (firstCharacter === 'p' || firstCharacter === 'P') {
      var longFormatter = _index5.default[firstCharacter];
      return longFormatter(substring, locale.formatLong, subFnOptions);
    }

    return substring;
  }).join('').match(formattingTokensRegExp);
  var usedTokens = [];

  for (i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (!options.useAdditionalWeekYearTokens && (0, _index7.isProtectedWeekYearToken)(token)) {
      (0, _index7.throwProtectedError)(token, formatString, dirtyDateString);
    }

    if (!options.useAdditionalDayOfYearTokens && (0, _index7.isProtectedDayOfYearToken)(token)) {
      (0, _index7.throwProtectedError)(token, formatString, dirtyDateString);
    }

    var firstCharacter = token[0];
    var parser = _index9.default[firstCharacter];

    if (parser) {
      var incompatibleTokens = parser.incompatibleTokens;

      if (Array.isArray(incompatibleTokens)) {
        var incompatibleToken = void 0;

        for (var _i = 0; _i < usedTokens.length; _i++) {
          var usedToken = usedTokens[_i].token;

          if (incompatibleTokens.indexOf(usedToken) !== -1 || usedToken === firstCharacter) {
            incompatibleToken = usedTokens[_i];
            break;
          }
        }

        if (incompatibleToken) {
          throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
        }
      } else if (parser.incompatibleTokens === '*' && usedTokens.length) {
        throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
      }

      usedTokens.push({
        token: firstCharacter,
        fullToken: token
      });
      var parseResult = parser.parse(dateString, token, locale.match, subFnOptions);

      if (!parseResult) {
        return new Date(NaN);
      }

      setters.push({
        priority: parser.priority,
        subPriority: parser.subPriority || 0,
        set: parser.set,
        validate: parser.validate,
        value: parseResult.value,
        index: setters.length
      });
      dateString = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
      } // Replace two single quote characters with one single quote character


      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString(token);
      } // Cut token from string, or, if string doesn't match the token, return Invalid Date


      if (dateString.indexOf(token) === 0) {
        dateString = dateString.slice(token.length);
      } else {
        return new Date(NaN);
      }
    }
  } // Check if the remaining input contains something other than whitespace


  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
    return new Date(NaN);
  }

  var uniquePrioritySetters = setters.map(function (setter) {
    return setter.priority;
  }).sort(function (a, b) {
    return b - a;
  }).filter(function (priority, index, array) {
    return array.indexOf(priority) === index;
  }).map(function (priority) {
    return setters.filter(function (setter) {
      return setter.priority === priority;
    }).sort(function (a, b) {
      return b.subPriority - a.subPriority;
    });
  }).map(function (setterArray) {
    return setterArray[0];
  });
  var date = (0, _index3.default)(dirtyReferenceDate);

  if (isNaN(date)) {
    return new Date(NaN);
  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/37


  var utcDate = (0, _index2.default)(date, (0, _index6.default)(date));
  var flags = {};

  for (i = 0; i < uniquePrioritySetters.length; i++) {
    var setter = uniquePrioritySetters[i];

    if (setter.validate && !setter.validate(utcDate, setter.value, subFnOptions)) {
      return new Date(NaN);
    }

    var result = setter.set(utcDate, flags, setter.value, subFnOptions); // Result is tuple (date, flags)

    if (result[0]) {
      utcDate = result[0];
      (0, _index4.default)(flags, result[1]); // Result is date
    } else {
      utcDate = result;
    }
  }

  return utcDate;
}

function dateToSystemTimezone(date, flags) {
  if (flags.timestampIsSet) {
    return date;
  }

  var convertedDate = new Date(0);
  convertedDate.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  convertedDate.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
  return convertedDate;
}

function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}

module.exports = exports.default;
},{"../locale/en-US/index.js":"64a45174a7b8aab2ebedcd537506623f","../subMilliseconds/index.js":"d4c3fa7c1a401b98fc12fd2f31ab3db4","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/assign/index.js":"c7bdd937395d9cd7fcc13dedfeb5c069","../_lib/format/longFormatters/index.js":"c5cae08211bae46f320f6578b64023ec","../_lib/getTimezoneOffsetInMilliseconds/index.js":"e1613370c964787e828d6e71e9590bf4","../_lib/protectedTokens/index.js":"c72cd04215458e3a41ee275d842547f7","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","./_lib/parsers/index.js":"4d935aea9f2bb4d26048131480150efb","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"4d935aea9f2bb4d26048131480150efb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../../_lib/getUTCWeekYear/index.js"));

var _index2 = _interopRequireDefault(require("../../../_lib/setUTCDay/index.js"));

var _index3 = _interopRequireDefault(require("../../../_lib/setUTCISODay/index.js"));

var _index4 = _interopRequireDefault(require("../../../_lib/setUTCISOWeek/index.js"));

var _index5 = _interopRequireDefault(require("../../../_lib/setUTCWeek/index.js"));

var _index6 = _interopRequireDefault(require("../../../_lib/startOfUTCISOWeek/index.js"));

var _index7 = _interopRequireDefault(require("../../../_lib/startOfUTCWeek/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var MILLISECONDS_IN_SECOND = 1000;
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/ // 0 to 9999, -0 to -9999

};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};

function parseNumericPattern(pattern, string, valueCallback) {
  var matchResult = string.match(pattern);

  if (!matchResult) {
    return null;
  }

  var value = parseInt(matchResult[0], 10);
  return {
    value: valueCallback ? valueCallback(value) : value,
    rest: string.slice(matchResult[0].length)
  };
}

function parseTimezonePattern(pattern, string) {
  var matchResult = string.match(pattern);

  if (!matchResult) {
    return null;
  } // Input is 'Z'


  if (matchResult[0] === 'Z') {
    return {
      value: 0,
      rest: string.slice(1)
    };
  }

  var sign = matchResult[1] === '+' ? 1 : -1;
  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * MILLISECONDS_IN_SECOND),
    rest: string.slice(matchResult[0].length)
  };
}

function parseAnyDigitsSigned(string, valueCallback) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, string, valueCallback);
}

function parseNDigits(n, string, valueCallback) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, string, valueCallback);

    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, string, valueCallback);

    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, string, valueCallback);

    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, string, valueCallback);

    default:
      return parseNumericPattern(new RegExp('^\\d{1,' + n + '}'), string, valueCallback);
  }
}

function parseNDigitsSigned(n, string, valueCallback) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, string, valueCallback);

    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, string, valueCallback);

    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, string, valueCallback);

    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, string, valueCallback);

    default:
      return parseNumericPattern(new RegExp('^-?\\d{1,' + n + '}'), string, valueCallback);
  }
}

function dayPeriodEnumToHours(enumValue) {
  switch (enumValue) {
    case 'morning':
      return 4;

    case 'evening':
      return 17;

    case 'pm':
    case 'noon':
    case 'afternoon':
      return 12;

    case 'am':
    case 'midnight':
    case 'night':
    default:
      return 0;
  }
}

function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  var isCommonEra = currentYear > 0; // Absolute number of the current year:
  // 1 -> 1 AC
  // 0 -> 1 BC
  // -1 -> 2 BC

  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  var result;

  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    var rangeEnd = absCurrentYear + 50;
    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }

  return isCommonEra ? result : 1 - result;
}

var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // User for validation

function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
 * |  p  |                                |  P  |                                |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 */


var parsers = {
  // Era
  G: {
    priority: 140,
    parse: function (string, token, match, _options) {
      switch (token) {
        // AD, BC
        case 'G':
        case 'GG':
        case 'GGG':
          return match.era(string, {
            width: 'abbreviated'
          }) || match.era(string, {
            width: 'narrow'
          });
        // A, B

        case 'GGGGG':
          return match.era(string, {
            width: 'narrow'
          });
        // Anno Domini, Before Christ

        case 'GGGG':
        default:
          return match.era(string, {
            width: 'wide'
          }) || match.era(string, {
            width: 'abbreviated'
          }) || match.era(string, {
            width: 'narrow'
          });
      }
    },
    set: function (date, flags, value, _options) {
      flags.era = value;
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['R', 'u', 't', 'T']
  },
  // Year
  y: {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
    priority: 130,
    parse: function (string, token, match, _options) {
      var valueCallback = function (year) {
        return {
          year: year,
          isTwoDigitYear: token === 'yy'
        };
      };

      switch (token) {
        case 'y':
          return parseNDigits(4, string, valueCallback);

        case 'yo':
          return match.ordinalNumber(string, {
            unit: 'year',
            valueCallback: valueCallback
          });

        default:
          return parseNDigits(token.length, string, valueCallback);
      }
    },
    validate: function (_date, value, _options) {
      return value.isTwoDigitYear || value.year > 0;
    },
    set: function (date, flags, value, _options) {
      var currentYear = date.getUTCFullYear();

      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }

      var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'u', 'w', 'I', 'i', 'e', 'c', 't', 'T']
  },
  // Local week-numbering year
  Y: {
    priority: 130,
    parse: function (string, token, match, _options) {
      var valueCallback = function (year) {
        return {
          year: year,
          isTwoDigitYear: token === 'YY'
        };
      };

      switch (token) {
        case 'Y':
          return parseNDigits(4, string, valueCallback);

        case 'Yo':
          return match.ordinalNumber(string, {
            unit: 'year',
            valueCallback: valueCallback
          });

        default:
          return parseNDigits(token.length, string, valueCallback);
      }
    },
    validate: function (_date, value, _options) {
      return value.isTwoDigitYear || value.year > 0;
    },
    set: function (date, flags, value, options) {
      var currentYear = (0, _index.default)(date, options);

      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
        date.setUTCHours(0, 0, 0, 0);
        return (0, _index7.default)(date, options);
      }

      var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
      date.setUTCHours(0, 0, 0, 0);
      return (0, _index7.default)(date, options);
    },
    incompatibleTokens: ['y', 'R', 'u', 'Q', 'q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
  },
  // ISO week-numbering year
  R: {
    priority: 130,
    parse: function (string, token, _match, _options) {
      if (token === 'R') {
        return parseNDigitsSigned(4, string);
      }

      return parseNDigitsSigned(token.length, string);
    },
    set: function (_date, _flags, value, _options) {
      var firstWeekOfYear = new Date(0);
      firstWeekOfYear.setUTCFullYear(value, 0, 4);
      firstWeekOfYear.setUTCHours(0, 0, 0, 0);
      return (0, _index6.default)(firstWeekOfYear);
    },
    incompatibleTokens: ['G', 'y', 'Y', 'u', 'Q', 'q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
  },
  // Extended year
  u: {
    priority: 130,
    parse: function (string, token, _match, _options) {
      if (token === 'u') {
        return parseNDigitsSigned(4, string);
      }

      return parseNDigitsSigned(token.length, string);
    },
    set: function (date, _flags, value, _options) {
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['G', 'y', 'Y', 'R', 'w', 'I', 'i', 'e', 'c', 't', 'T']
  },
  // Quarter
  Q: {
    priority: 120,
    parse: function (string, token, match, _options) {
      switch (token) {
        // 1, 2, 3, 4
        case 'Q':
        case 'QQ':
          // 01, 02, 03, 04
          return parseNDigits(token.length, string);
        // 1st, 2nd, 3rd, 4th

        case 'Qo':
          return match.ordinalNumber(string, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4

        case 'QQQ':
          return match.quarter(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.quarter(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

        case 'QQQQQ':
          return match.quarter(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // 1st quarter, 2nd quarter, ...

        case 'QQQQ':
        default:
          return match.quarter(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.quarter(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.quarter(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 4;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
  },
  // Stand-alone quarter
  q: {
    priority: 120,
    parse: function (string, token, match, _options) {
      switch (token) {
        // 1, 2, 3, 4
        case 'q':
        case 'qq':
          // 01, 02, 03, 04
          return parseNDigits(token.length, string);
        // 1st, 2nd, 3rd, 4th

        case 'qo':
          return match.ordinalNumber(string, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4

        case 'qqq':
          return match.quarter(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.quarter(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

        case 'qqqqq':
          return match.quarter(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // 1st quarter, 2nd quarter, ...

        case 'qqqq':
        default:
          return match.quarter(string, {
            width: 'wide',
            context: 'standalone'
          }) || match.quarter(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.quarter(string, {
            width: 'narrow',
            context: 'standalone'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 4;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'Q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
  },
  // Month
  M: {
    priority: 110,
    parse: function (string, token, match, _options) {
      var valueCallback = function (value) {
        return value - 1;
      };

      switch (token) {
        // 1, 2, ..., 12
        case 'M':
          return parseNumericPattern(numericPatterns.month, string, valueCallback);
        // 01, 02, ..., 12

        case 'MM':
          return parseNDigits(2, string, valueCallback);
        // 1st, 2nd, ..., 12th

        case 'Mo':
          return match.ordinalNumber(string, {
            unit: 'month',
            valueCallback: valueCallback
          });
        // Jan, Feb, ..., Dec

        case 'MMM':
          return match.month(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.month(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // J, F, ..., D

        case 'MMMMM':
          return match.month(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // January, February, ..., December

        case 'MMMM':
        default:
          return match.month(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.month(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.month(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 11;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'L', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
  },
  // Stand-alone month
  L: {
    priority: 110,
    parse: function (string, token, match, _options) {
      var valueCallback = function (value) {
        return value - 1;
      };

      switch (token) {
        // 1, 2, ..., 12
        case 'L':
          return parseNumericPattern(numericPatterns.month, string, valueCallback);
        // 01, 02, ..., 12

        case 'LL':
          return parseNDigits(2, string, valueCallback);
        // 1st, 2nd, ..., 12th

        case 'Lo':
          return match.ordinalNumber(string, {
            unit: 'month',
            valueCallback: valueCallback
          });
        // Jan, Feb, ..., Dec

        case 'LLL':
          return match.month(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.month(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // J, F, ..., D

        case 'LLLLL':
          return match.month(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // January, February, ..., December

        case 'LLLL':
        default:
          return match.month(string, {
            width: 'wide',
            context: 'standalone'
          }) || match.month(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.month(string, {
            width: 'narrow',
            context: 'standalone'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 11;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
  },
  // Local week of year
  w: {
    priority: 100,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'w':
          return parseNumericPattern(numericPatterns.week, string);

        case 'wo':
          return match.ordinalNumber(string, {
            unit: 'week'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 53;
    },
    set: function (date, _flags, value, options) {
      return (0, _index7.default)((0, _index5.default)(date, value, options), options);
    },
    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
  },
  // ISO week of year
  I: {
    priority: 100,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'I':
          return parseNumericPattern(numericPatterns.week, string);

        case 'Io':
          return match.ordinalNumber(string, {
            unit: 'week'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 53;
    },
    set: function (date, _flags, value, options) {
      return (0, _index6.default)((0, _index4.default)(date, value, options), options);
    },
    incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
  },
  // Day of the month
  d: {
    priority: 90,
    subPriority: 1,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'd':
          return parseNumericPattern(numericPatterns.date, string);

        case 'do':
          return match.ordinalNumber(string, {
            unit: 'date'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (date, value, _options) {
      var year = date.getUTCFullYear();
      var isLeapYear = isLeapYearIndex(year);
      var month = date.getUTCMonth();

      if (isLeapYear) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    },
    set: function (date, _flags, value, _options) {
      date.setUTCDate(value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
  },
  // Day of year
  D: {
    priority: 90,
    subPriority: 1,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'D':
        case 'DD':
          return parseNumericPattern(numericPatterns.dayOfYear, string);

        case 'Do':
          return match.ordinalNumber(string, {
            unit: 'date'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (date, value, _options) {
      var year = date.getUTCFullYear();
      var isLeapYear = isLeapYearIndex(year);

      if (isLeapYear) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMonth(0, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'L', 'w', 'I', 'd', 'E', 'i', 'e', 'c', 't', 'T']
  },
  // Day of week
  E: {
    priority: 90,
    parse: function (string, token, match, _options) {
      switch (token) {
        // Tue
        case 'E':
        case 'EE':
        case 'EEE':
          return match.day(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // T

        case 'EEEEE':
          return match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu

        case 'EEEEEE':
          return match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tuesday

        case 'EEEE':
        default:
          return match.day(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.day(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 6;
    },
    set: function (date, _flags, value, options) {
      date = (0, _index2.default)(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['D', 'i', 'e', 'c', 't', 'T']
  },
  // Local day of week
  e: {
    priority: 90,
    parse: function (string, token, match, options) {
      var valueCallback = function (value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };

      switch (token) {
        // 3
        case 'e':
        case 'ee':
          // 03
          return parseNDigits(token.length, string, valueCallback);
        // 3rd

        case 'eo':
          return match.ordinalNumber(string, {
            unit: 'day',
            valueCallback: valueCallback
          });
        // Tue

        case 'eee':
          return match.day(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // T

        case 'eeeee':
          return match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu

        case 'eeeeee':
          return match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tuesday

        case 'eeee':
        default:
          return match.day(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.day(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 6;
    },
    set: function (date, _flags, value, options) {
      date = (0, _index2.default)(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'c', 't', 'T']
  },
  // Stand-alone local day of week
  c: {
    priority: 90,
    parse: function (string, token, match, options) {
      var valueCallback = function (value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };

      switch (token) {
        // 3
        case 'c':
        case 'cc':
          // 03
          return parseNDigits(token.length, string, valueCallback);
        // 3rd

        case 'co':
          return match.ordinalNumber(string, {
            unit: 'day',
            valueCallback: valueCallback
          });
        // Tue

        case 'ccc':
          return match.day(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.day(string, {
            width: 'short',
            context: 'standalone'
          }) || match.day(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // T

        case 'ccccc':
          return match.day(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // Tu

        case 'cccccc':
          return match.day(string, {
            width: 'short',
            context: 'standalone'
          }) || match.day(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // Tuesday

        case 'cccc':
        default:
          return match.day(string, {
            width: 'wide',
            context: 'standalone'
          }) || match.day(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.day(string, {
            width: 'short',
            context: 'standalone'
          }) || match.day(string, {
            width: 'narrow',
            context: 'standalone'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 6;
    },
    set: function (date, _flags, value, options) {
      date = (0, _index2.default)(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'e', 't', 'T']
  },
  // ISO day of week
  i: {
    priority: 90,
    parse: function (string, token, match, _options) {
      var valueCallback = function (value) {
        if (value === 0) {
          return 7;
        }

        return value;
      };

      switch (token) {
        // 2
        case 'i':
        case 'ii':
          // 02
          return parseNDigits(token.length, string);
        // 2nd

        case 'io':
          return match.ordinalNumber(string, {
            unit: 'day'
          });
        // Tue

        case 'iii':
          return match.day(string, {
            width: 'abbreviated',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'short',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting',
            valueCallback: valueCallback
          });
        // T

        case 'iiiii':
          return match.day(string, {
            width: 'narrow',
            context: 'formatting',
            valueCallback: valueCallback
          });
        // Tu

        case 'iiiiii':
          return match.day(string, {
            width: 'short',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting',
            valueCallback: valueCallback
          });
        // Tuesday

        case 'iiii':
        default:
          return match.day(string, {
            width: 'wide',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'abbreviated',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'short',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting',
            valueCallback: valueCallback
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 7;
    },
    set: function (date, _flags, value, options) {
      date = (0, _index3.default)(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'E', 'e', 'c', 't', 'T']
  },
  // AM or PM
  a: {
    priority: 80,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'a':
        case 'aa':
        case 'aaa':
          return match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'aaaaa':
          return match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'aaaa':
        default:
          return match.dayPeriod(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    set: function (date, _flags, value, _options) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['b', 'B', 'H', 'K', 'k', 't', 'T']
  },
  // AM, PM, midnight
  b: {
    priority: 80,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'b':
        case 'bb':
        case 'bbb':
          return match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'bbbbb':
          return match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'bbbb':
        default:
          return match.dayPeriod(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    set: function (date, _flags, value, _options) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['a', 'B', 'H', 'K', 'k', 't', 'T']
  },
  // in the morning, in the afternoon, in the evening, at night
  B: {
    priority: 80,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'B':
        case 'BB':
        case 'BBB':
          return match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'BBBBB':
          return match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'BBBB':
        default:
          return match.dayPeriod(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    set: function (date, _flags, value, _options) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['a', 'b', 't', 'T']
  },
  // Hour [1-12]
  h: {
    priority: 70,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'h':
          return parseNumericPattern(numericPatterns.hour12h, string);

        case 'ho':
          return match.ordinalNumber(string, {
            unit: 'hour'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 12;
    },
    set: function (date, _flags, value, _options) {
      var isPM = date.getUTCHours() >= 12;

      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date.setUTCHours(0, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }

      return date;
    },
    incompatibleTokens: ['H', 'K', 'k', 't', 'T']
  },
  // Hour [0-23]
  H: {
    priority: 70,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'H':
          return parseNumericPattern(numericPatterns.hour23h, string);

        case 'Ho':
          return match.ordinalNumber(string, {
            unit: 'hour'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 23;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCHours(value, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['a', 'b', 'h', 'K', 'k', 't', 'T']
  },
  // Hour [0-11]
  K: {
    priority: 70,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'K':
          return parseNumericPattern(numericPatterns.hour11h, string);

        case 'Ko':
          return match.ordinalNumber(string, {
            unit: 'hour'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 11;
    },
    set: function (date, _flags, value, _options) {
      var isPM = date.getUTCHours() >= 12;

      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }

      return date;
    },
    incompatibleTokens: ['a', 'b', 'h', 'H', 'k', 't', 'T']
  },
  // Hour [1-24]
  k: {
    priority: 70,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'k':
          return parseNumericPattern(numericPatterns.hour24h, string);

        case 'ko':
          return match.ordinalNumber(string, {
            unit: 'hour'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 24;
    },
    set: function (date, _flags, value, _options) {
      var hours = value <= 24 ? value % 24 : value;
      date.setUTCHours(hours, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['a', 'b', 'h', 'H', 'K', 't', 'T']
  },
  // Minute
  m: {
    priority: 60,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'm':
          return parseNumericPattern(numericPatterns.minute, string);

        case 'mo':
          return match.ordinalNumber(string, {
            unit: 'minute'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 59;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMinutes(value, 0, 0);
      return date;
    },
    incompatibleTokens: ['t', 'T']
  },
  // Second
  s: {
    priority: 50,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 's':
          return parseNumericPattern(numericPatterns.second, string);

        case 'so':
          return match.ordinalNumber(string, {
            unit: 'second'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 59;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCSeconds(value, 0);
      return date;
    },
    incompatibleTokens: ['t', 'T']
  },
  // Fraction of second
  S: {
    priority: 30,
    parse: function (string, token, _match, _options) {
      var valueCallback = function (value) {
        return Math.floor(value * Math.pow(10, -token.length + 3));
      };

      return parseNDigits(token.length, string, valueCallback);
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMilliseconds(value);
      return date;
    },
    incompatibleTokens: ['t', 'T']
  },
  // Timezone (ISO-8601. +00:00 is `'Z'`)
  X: {
    priority: 10,
    parse: function (string, token, _match, _options) {
      switch (token) {
        case 'X':
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);

        case 'XX':
          return parseTimezonePattern(timezonePatterns.basic, string);

        case 'XXXX':
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);

        case 'XXXXX':
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);

        case 'XXX':
        default:
          return parseTimezonePattern(timezonePatterns.extended, string);
      }
    },
    set: function (date, flags, value, _options) {
      if (flags.timestampIsSet) {
        return date;
      }

      return new Date(date.getTime() - value);
    },
    incompatibleTokens: ['t', 'T', 'x']
  },
  // Timezone (ISO-8601)
  x: {
    priority: 10,
    parse: function (string, token, _match, _options) {
      switch (token) {
        case 'x':
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);

        case 'xx':
          return parseTimezonePattern(timezonePatterns.basic, string);

        case 'xxxx':
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);

        case 'xxxxx':
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);

        case 'xxx':
        default:
          return parseTimezonePattern(timezonePatterns.extended, string);
      }
    },
    set: function (date, flags, value, _options) {
      if (flags.timestampIsSet) {
        return date;
      }

      return new Date(date.getTime() - value);
    },
    incompatibleTokens: ['t', 'T', 'X']
  },
  // Seconds timestamp
  t: {
    priority: 40,
    parse: function (string, _token, _match, _options) {
      return parseAnyDigitsSigned(string);
    },
    set: function (_date, _flags, value, _options) {
      return [new Date(value * 1000), {
        timestampIsSet: true
      }];
    },
    incompatibleTokens: '*'
  },
  // Milliseconds timestamp
  T: {
    priority: 20,
    parse: function (string, _token, _match, _options) {
      return parseAnyDigitsSigned(string);
    },
    set: function (_date, _flags, value, _options) {
      return [new Date(value), {
        timestampIsSet: true
      }];
    },
    incompatibleTokens: '*'
  }
};
var _default = parsers;
exports.default = _default;
module.exports = exports.default;
},{"../../../_lib/getUTCWeekYear/index.js":"7f365d2185f29a314f6b1bff3c47a7b4","../../../_lib/setUTCDay/index.js":"9b89a52d02567ced769df852948f6a9b","../../../_lib/setUTCISODay/index.js":"f1a74909068367ac58ab8f1ca89101a6","../../../_lib/setUTCISOWeek/index.js":"67e3637bd4537ac8ef005d1fcc9400f0","../../../_lib/setUTCWeek/index.js":"d0df60588186cd36361a1f24b77f7488","../../../_lib/startOfUTCISOWeek/index.js":"1b7c3193f71ebe9277f9bc6bc4f40cbe","../../../_lib/startOfUTCWeek/index.js":"c6972dc14416654e45ba64c66596216a"}],"9b89a52d02567ced769df852948f6a9b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCDay;

var _index = _interopRequireDefault(require("../toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
  (0, _index3.default)(2, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0, _index2.default)(dirtyDate);
  var day = (0, _index.default)(dirtyDay);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

module.exports = exports.default;
},{"../toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"f1a74909068367ac58ab8f1ca89101a6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCISODay;

var _index = _interopRequireDefault(require("../toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCISODay(dirtyDate, dirtyDay) {
  (0, _index3.default)(2, arguments);
  var day = (0, _index.default)(dirtyDay);

  if (day % 7 === 0) {
    day = day - 7;
  }

  var weekStartsOn = 1;
  var date = (0, _index2.default)(dirtyDate);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

module.exports = exports.default;
},{"../toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"67e3637bd4537ac8ef005d1fcc9400f0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCISOWeek;

var _index = _interopRequireDefault(require("../toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../getUTCISOWeek/index.js"));

var _index4 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  (0, _index4.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var isoWeek = (0, _index.default)(dirtyISOWeek);
  var diff = (0, _index3.default)(date) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}

module.exports = exports.default;
},{"../toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../getUTCISOWeek/index.js":"f3613635cc9fc7efad7d22c854caed92","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"d0df60588186cd36361a1f24b77f7488":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setUTCWeek;

var _index = _interopRequireDefault(require("../toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../getUTCWeek/index.js"));

var _index4 = _interopRequireDefault(require("../requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCWeek(dirtyDate, dirtyWeek, options) {
  (0, _index4.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var week = (0, _index.default)(dirtyWeek);
  var diff = (0, _index3.default)(date, options) - week;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}

module.exports = exports.default;
},{"../toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../getUTCWeek/index.js":"e3d3aa3003176186fc43148b0c87d694","../requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"f6bfe08b8d7d7835d9bc8e62d80794da":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMonday;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isMonday
 * @category Weekday Helpers
 * @summary Is the given date Monday?
 *
 * @description
 * Is the given date Monday?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Monday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 22 September 2014 Monday?
 * var result = isMonday(new Date(2014, 8, 22))
 * //=> true
 */
function isMonday(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate).getDay() === 1;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"7a24ae0b780d99bc22ba24757009f9dc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPast;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isPast
 * @category Common Helpers
 * @summary Is the given date in the past?
 * @pure false
 *
 * @description
 * Is the given date in the past?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in the past
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * var result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
function isPast(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate).getTime() < Date.now();
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"385f6ac118e285619ea9712563b8988e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameHour;

var _index = _interopRequireDefault(require("../startOfHour/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameHour
 * @category Hour Helpers
 * @summary Are the given dates in the same hour?
 *
 * @description
 * Are the given dates in the same hour?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same hour
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
 * var result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 6, 30))
 * //=> true
 */
function isSameHour(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeftStartOfHour = (0, _index.default)(dirtyDateLeft);
  var dateRightStartOfHour = (0, _index.default)(dirtyDateRight);
  return dateLeftStartOfHour.getTime() === dateRightStartOfHour.getTime();
}

module.exports = exports.default;
},{"../startOfHour/index.js":"1459963c5acd6a374d91d4ff8b87d166","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"1459963c5acd6a374d91d4ff8b87d166":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfHour;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfHour
 * @category Hour Helpers
 * @summary Return the start of an hour for the given date.
 *
 * @description
 * Return the start of an hour for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of an hour
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of an hour for 2 September 2014 11:55:00:
 * var result = startOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:00:00
 */
function startOfHour(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setMinutes(0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"2db3ddd96ca94f2bf32fb95a4587cea7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameISOWeek;

var _index = _interopRequireDefault(require("../isSameWeek/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameISOWeek
 * @category ISO Week Helpers
 * @summary Are the given dates in the same ISO week?
 *
 * @description
 * Are the given dates in the same ISO week?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same ISO week
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 1 September 2014 and 7 September 2014 in the same ISO week?
 * var result = isSameISOWeek(new Date(2014, 8, 1), new Date(2014, 8, 7))
 * //=> true
 */
function isSameISOWeek(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  return (0, _index.default)(dirtyDateLeft, dirtyDateRight, {
    weekStartsOn: 1
  });
}

module.exports = exports.default;
},{"../isSameWeek/index.js":"37fe8e6e10ab49bef0bdb83d65177d66","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"37fe8e6e10ab49bef0bdb83d65177d66":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameWeek;

var _index = _interopRequireDefault(require("../startOfWeek/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week?
 *
 * @description
 * Are the given dates in the same week?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the dates are in the same week
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 */
function isSameWeek(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  (0, _index2.default)(2, arguments);
  var dateLeftStartOfWeek = (0, _index.default)(dirtyDateLeft, dirtyOptions);
  var dateRightStartOfWeek = (0, _index.default)(dirtyDateRight, dirtyOptions);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}

module.exports = exports.default;
},{"../startOfWeek/index.js":"9773da116ecae709ccce70a09b54431c","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"ba3c0e6f36d971c15ee11f326eaf6d42":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameISOWeekYear;

var _index = _interopRequireDefault(require("../startOfISOWeekYear/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Are the given dates in the same ISO week-numbering year?
 *
 * @description
 * Are the given dates in the same ISO week-numbering year?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `isSameISOYear` to `isSameISOWeekYear`.
 *   "ISO week year" is short for [ISO week-numbering year](https://en.wikipedia.org/wiki/ISO_week_date).
 *   This change makes the name consistent with
 *   locale-dependent week-numbering year helpers, e.g., `getWeekYear`.
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same ISO week-numbering year
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
 * var result = isSameISOWeekYear(new Date(2003, 11, 29), new Date(2005, 0, 2))
 * //=> true
 */
function isSameISOWeekYear(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeftStartOfYear = (0, _index.default)(dirtyDateLeft);
  var dateRightStartOfYear = (0, _index.default)(dirtyDateRight);
  return dateLeftStartOfYear.getTime() === dateRightStartOfYear.getTime();
}

module.exports = exports.default;
},{"../startOfISOWeekYear/index.js":"8335b930839a50f32d190455599201c0","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"150dcf88a9186e501c8ddc097bd1e7d7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameMinute;

var _index = _interopRequireDefault(require("../startOfMinute/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameMinute
 * @category Minute Helpers
 * @summary Are the given dates in the same minute?
 *
 * @description
 * Are the given dates in the same minute?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same minute
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 4 September 2014 06:30:15
 * // in the same minute?
 * var result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 4, 6, 30, 15)
 * )
 * //=> true
 */
function isSameMinute(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeftStartOfMinute = (0, _index.default)(dirtyDateLeft);
  var dateRightStartOfMinute = (0, _index.default)(dirtyDateRight);
  return dateLeftStartOfMinute.getTime() === dateRightStartOfMinute.getTime();
}

module.exports = exports.default;
},{"../startOfMinute/index.js":"fcee0c3b3244d2626be2d438770da43b","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"fcee0c3b3244d2626be2d438770da43b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfMinute;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfMinute
 * @category Minute Helpers
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a minute
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a minute for 1 December 2014 22:15:45.400:
 * var result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:00
 */
function startOfMinute(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setSeconds(0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"81adb2ef01aae27ad4ce057c66c2656f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameMonth;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameMonth
 * @category Month Helpers
 * @summary Are the given dates in the same month?
 *
 * @description
 * Are the given dates in the same month?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same month
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * var result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
function isSameMonth(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear() && dateLeft.getMonth() === dateRight.getMonth();
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"dd61663df2ab7c3c09a5cc1f7f46b2f7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameQuarter;

var _index = _interopRequireDefault(require("../startOfQuarter/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameQuarter
 * @category Quarter Helpers
 * @summary Are the given dates in the same year quarter?
 *
 * @description
 * Are the given dates in the same year quarter?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same quarter
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * var result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 */
function isSameQuarter(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeftStartOfQuarter = (0, _index.default)(dirtyDateLeft);
  var dateRightStartOfQuarter = (0, _index.default)(dirtyDateRight);
  return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime();
}

module.exports = exports.default;
},{"../startOfQuarter/index.js":"169a2e7964834756211ffaa78256e0de","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"6fcb80b72940c3561a7d273d878bd881":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameSecond;

var _index = _interopRequireDefault(require("../startOfSecond/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameSecond
 * @category Second Helpers
 * @summary Are the given dates in the same second?
 *
 * @description
 * Are the given dates in the same second?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same second
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500
 * // in the same second?
 * var result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 30, 15),
 *   new Date(2014, 8, 4, 6, 30, 15, 500)
 * )
 * //=> true
 */
function isSameSecond(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeftStartOfSecond = (0, _index.default)(dirtyDateLeft);
  var dateRightStartOfSecond = (0, _index.default)(dirtyDateRight);
  return dateLeftStartOfSecond.getTime() === dateRightStartOfSecond.getTime();
}

module.exports = exports.default;
},{"../startOfSecond/index.js":"df63f10981bee5473694888e5f813faf","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"df63f10981bee5473694888e5f813faf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfSecond;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfSecond
 * @category Second Helpers
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a second
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * var result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
function startOfSecond(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  date.setMilliseconds(0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"5e947007c9aa91445703fa03c1fa3743":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameYear;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameYear
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same year
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * var result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
function isSameYear(dirtyDateLeft, dirtyDateRight) {
  (0, _index2.default)(2, arguments);
  var dateLeft = (0, _index.default)(dirtyDateLeft);
  var dateRight = (0, _index.default)(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear();
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"06d531dbcb1f239580b8e59d2daa1438":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisHour;

var _index = _interopRequireDefault(require("../isSameHour/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisHour
 * @category Hour Helpers
 * @summary Is the given date in the same hour as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same hour as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this hour
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:00:00 in this hour?
 * var result = isThisHour(new Date(2014, 8, 25, 18))
 * //=> true
 */
function isThisHour(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(Date.now(), dirtyDate);
}

module.exports = exports.default;
},{"../isSameHour/index.js":"385f6ac118e285619ea9712563b8988e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"578b008b8d5483a0a10d855f18efb76c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisISOWeek;

var _index = _interopRequireDefault(require("../isSameISOWeek/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisISOWeek
 * @category ISO Week Helpers
 * @summary Is the given date in the same ISO week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same ISO week as the current date?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 25 September 2014, is 22 September 2014 in this ISO week?
 * var result = isThisISOWeek(new Date(2014, 8, 22))
 * //=> true
 */
function isThisISOWeek(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate, Date.now());
}

module.exports = exports.default;
},{"../isSameISOWeek/index.js":"2db3ddd96ca94f2bf32fb95a4587cea7","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"ffd6095abe07ffd1e01d843dfd3fde95":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisMinute;

var _index = _interopRequireDefault(require("../isSameMinute/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisMinute
 * @category Minute Helpers
 * @summary Is the given date in the same minute as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same minute as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this minute
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:00 in this minute?
 * var result = isThisMinute(new Date(2014, 8, 25, 18, 30))
 * //=> true
 */
function isThisMinute(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(Date.now(), dirtyDate);
}

module.exports = exports.default;
},{"../isSameMinute/index.js":"150dcf88a9186e501c8ddc097bd1e7d7","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"f4724bc521b4e96fc16503c3a3bb9f12":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisMonth;

var _index = _interopRequireDefault(require("../isSameMonth/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisMonth
 * @category Month Helpers
 * @summary Is the given date in the same month as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same month as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 25 September 2014, is 15 September 2014 in this month?
 * var result = isThisMonth(new Date(2014, 8, 15))
 * //=> true
 */
function isThisMonth(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(Date.now(), dirtyDate);
}

module.exports = exports.default;
},{"../isSameMonth/index.js":"81adb2ef01aae27ad4ce057c66c2656f","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"ecad26fa72313a4252b2b48f631d73f7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisQuarter;

var _index = _interopRequireDefault(require("../isSameQuarter/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisQuarter
 * @category Quarter Helpers
 * @summary Is the given date in the same quarter as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same quarter as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this quarter?
 * var result = isThisQuarter(new Date(2014, 6, 2))
 * //=> true
 */
function isThisQuarter(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(Date.now(), dirtyDate);
}

module.exports = exports.default;
},{"../isSameQuarter/index.js":"dd61663df2ab7c3c09a5cc1f7f46b2f7","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"01600f408c7ba656a6e61c717093b0c8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisSecond;

var _index = _interopRequireDefault(require("../isSameSecond/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisSecond
 * @category Second Helpers
 * @summary Is the given date in the same second as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same second as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this second
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:15.000 in this second?
 * var result = isThisSecond(new Date(2014, 8, 25, 18, 30, 15))
 * //=> true
 */
function isThisSecond(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(Date.now(), dirtyDate);
}

module.exports = exports.default;
},{"../isSameSecond/index.js":"6fcb80b72940c3561a7d273d878bd881","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"9aa0211e673af75e1f5ee48c8e7dd507":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisWeek;

var _index = _interopRequireDefault(require("../isSameWeek/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @param {Object} [options] - the object with options
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the date is in this week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * var result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * var result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */
function isThisWeek(dirtyDate, options) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate, Date.now(), options);
}

module.exports = exports.default;
},{"../isSameWeek/index.js":"37fe8e6e10ab49bef0bdb83d65177d66","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"8c1de84ae5a9d09a635123ebc2c64ab6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThisYear;

var _index = _interopRequireDefault(require("../isSameYear/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThisYear
 * @category Year Helpers
 * @summary Is the given date in the same year as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same year as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in this year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this year?
 * var result = isThisYear(new Date(2014, 6, 2))
 * //=> true
 */
function isThisYear(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate, Date.now());
}

module.exports = exports.default;
},{"../isSameYear/index.js":"5e947007c9aa91445703fa03c1fa3743","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"9607416ea3b170ae8d77a290847d4c0d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isThursday;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isThursday
 * @category Weekday Helpers
 * @summary Is the given date Thursday?
 *
 * @description
 * Is the given date Thursday?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Thursday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 25 September 2014 Thursday?
 * var result = isThursday(new Date(2014, 8, 25))
 * //=> true
 */
function isThursday(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate).getDay() === 4;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"67da3cd3ca238e192c0dd11d2aacf172":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isToday;

var _index = _interopRequireDefault(require("../isSameDay/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is today
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * var result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate, Date.now());
}

module.exports = exports.default;
},{"../isSameDay/index.js":"444d26f8c29e5f455146d915b97fd66d","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"3c07555b1dde6eabeabfa153d2487167":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTomorrow;

var _index = _interopRequireDefault(require("../addDays/index.js"));

var _index2 = _interopRequireDefault(require("../isSameDay/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isTomorrow
 * @category Day Helpers
 * @summary Is the given date tomorrow?
 * @pure false
 *
 * @description
 * Is the given date tomorrow?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is tomorrow
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * var result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
function isTomorrow(dirtyDate) {
  (0, _index3.default)(1, arguments);
  return (0, _index2.default)(dirtyDate, (0, _index.default)(Date.now(), 1));
}

module.exports = exports.default;
},{"../addDays/index.js":"5fdec9afb4e5b1ea71ca3db109ea4b4a","../isSameDay/index.js":"444d26f8c29e5f455146d915b97fd66d","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"be83b9b29cf0fedd047879f7c1bdec85":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTuesday;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isTuesday
 * @category Weekday Helpers
 * @summary Is the given date Tuesday?
 *
 * @description
 * Is the given date Tuesday?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Tuesday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 23 September 2014 Tuesday?
 * var result = isTuesday(new Date(2014, 8, 23))
 * //=> true
 */
function isTuesday(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate).getDay() === 2;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"a3d7529edfe734998e30f5539a2f9ee7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWednesday;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isWednesday
 * @category Weekday Helpers
 * @summary Is the given date Wednesday?
 *
 * @description
 * Is the given date Wednesday?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is Wednesday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Is 24 September 2014 Wednesday?
 * var result = isWednesday(new Date(2014, 8, 24))
 * //=> true
 */
function isWednesday(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate).getDay() === 3;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"3509ac09a6c7f1f41ad82e411146add7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWithinInterval;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `isWithinRange` to `isWithinInterval`.
 *   This change was made to mirror the use of the word "interval" in standard ISO 8601:2004 terminology:
 *
 *   ```
 *   2.1.3
 *   time interval
 *   part of the time axis limited by two instants
 *   ```
 *
 *   Also, this function now accepts an object with `start` and `end` properties
 *   instead of two arguments as an interval.
 *   This function now throws `RangeError` if the start of the interval is after its end
 *   or if any date in the interval is `Invalid Date`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   isWithinRange(
 *     new Date(2014, 0, 3),
 *     new Date(2014, 0, 1), new Date(2014, 0, 7)
 *   )
 *
 *   // v2.0.0 onward
 *
 *   isWithinInterval(
 *     new Date(2014, 0, 3),
 *     { start: new Date(2014, 0, 1), end: new Date(2014, 0, 7) }
 *   )
 *   ```
 *
 * @param {Date|Number} date - the date to check
 * @param {Interval} interval - the interval to check
 * @returns {Boolean} the date is within the interval
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> false
 *
 * @example
 * // For date equal to interval start:
 * isWithinInterval(date, { start, end: date }) // => true
 *
 * @example
 * // For date equal to interval end:
 * isWithinInterval(date, { start: date, end }) // => true
 */
function isWithinInterval(dirtyDate, dirtyInterval) {
  (0, _index2.default)(2, arguments);
  var interval = dirtyInterval || {};
  var time = (0, _index.default)(dirtyDate).getTime();
  var startTime = (0, _index.default)(interval.start).getTime();
  var endTime = (0, _index.default)(interval.end).getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(startTime <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  return time >= startTime && time <= endTime;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"656d68e013180585a56e31ee3cd32d59":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isYesterday;

var _index = _interopRequireDefault(require("../isSameDay/index.js"));

var _index2 = _interopRequireDefault(require("../subDays/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isYesterday
 * @category Day Helpers
 * @summary Is the given date yesterday?
 * @pure false
 *
 * @description
 * Is the given date yesterday?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is yesterday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
 * var result = isYesterday(new Date(2014, 9, 5, 14, 0))
 * //=> true
 */
function isYesterday(dirtyDate) {
  (0, _index3.default)(1, arguments);
  return (0, _index.default)(dirtyDate, (0, _index2.default)(Date.now(), 1));
}

module.exports = exports.default;
},{"../isSameDay/index.js":"444d26f8c29e5f455146d915b97fd66d","../subDays/index.js":"70eaf93ad7b28e364c9f707a17d69bcf","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"83d6b22b1d0086d1798a4a6e965c8d2f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfDecade;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfDecade
 * @category Decade Helpers
 * @summary Return the last day of a decade for the given date.
 *
 * @description
 * Return the last day of a decade for the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the last day of a decade
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of a decade for 21 December 2012 21:12:00:
 * var result = lastDayOfDecade(new Date(2012, 11, 21, 21, 12, 00))
 * //=> Wed Dec 31 2019 00:00:00
 */
function lastDayOfDecade(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var year = date.getFullYear();
  var decade = 9 + Math.floor(year / 10) * 10;
  date.setFullYear(decade + 1, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"644b3635fcb0200454813043b0300ebb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfISOWeek;

var _index = _interopRequireDefault(require("../lastDayOfWeek/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the last day of an ISO week for the given date.
 *
 * @description
 * Return the last day of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the last day of an ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of an ISO week for 2 September 2014 11:55:00:
 * var result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 00:00:00
 */
function lastDayOfISOWeek(dirtyDate) {
  (0, _index2.default)(1, arguments);
  return (0, _index.default)(dirtyDate, {
    weekStartsOn: 1
  });
}

module.exports = exports.default;
},{"../lastDayOfWeek/index.js":"a133e2aa766515de6db672ba39771a2c","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"a133e2aa766515de6db672ba39771a2c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfWeek;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfWeek
 * @category Week Helpers
 * @summary Return the last day of a week for the given date.
 *
 * @description
 * Return the last day of a week for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the last day of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The last day of a week for 2 September 2014 11:55:00:
 * var result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the last day of the week for 2 September 2014 11:55:00:
 * var result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
function lastDayOfWeek(dirtyDate, dirtyOptions) {
  (0, _index3.default)(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index2.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index2.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6');
  }

  var date = (0, _index.default)(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + diff);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"5d7ff489623578ef313254fc1dd72f21":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfISOWeekYear;

var _index = _interopRequireDefault(require("../getISOWeekYear/index.js"));

var _index2 = _interopRequireDefault(require("../startOfISOWeek/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the last day of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the last day of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `lastDayOfISOYear` to `lastDayOfISOWeekYear`.
 *   "ISO week year" is short for [ISO week-numbering year](https://en.wikipedia.org/wiki/ISO_week_date).
 *   This change makes the name consistent with
 *   locale-dependent week-numbering year helpers, e.g., `getWeekYear`.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of an ISO week-numbering year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of an ISO week-numbering year for 2 July 2005:
 * var result = lastDayOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 00:00:00
 */
function lastDayOfISOWeekYear(dirtyDate) {
  (0, _index3.default)(1, arguments);
  var year = (0, _index.default)(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year + 1, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = (0, _index2.default)(fourthOfJanuary);
  date.setDate(date.getDate() - 1);
  return date;
}

module.exports = exports.default;
},{"../getISOWeekYear/index.js":"29a61091f03d2559b5ae8dbb8640b0af","../startOfISOWeek/index.js":"5cdfef1aaca2ce8eb5f04f653206d691","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"599f8b744c992cbaa64ec474a44a1a2f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfQuarter;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfQuarter
 * @category Quarter Helpers
 * @summary Return the last day of a year quarter for the given date.
 *
 * @description
 * Return the last day of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the last day of a quarter
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // The last day of a quarter for 2 September 2014 11:55:00:
 * var result = lastDayOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfQuarter(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"fc9356a5267f529004b5ac5c2d12fa63":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lastDayOfYear;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name lastDayOfYear
 * @category Year Helpers
 * @summary Return the last day of a year for the given date.
 *
 * @description
 * Return the last day of a year for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the last day of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The last day of a year for 2 September 2014 11:55:00:
 * var result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 00:00:00
 */
function lastDayOfYear(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e4ee3c1b701234b1d31f1584ebaf8850":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lightFormat;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/format/lightFormatters/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/getTimezoneOffsetInMilliseconds/index.js"));

var _index4 = _interopRequireDefault(require("../isValid/index.js"));

var _index5 = _interopRequireDefault(require("../subMilliseconds/index.js"));

var _index6 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This RegExp consists of three parts separated by `|`:
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
var formattingTokensRegExp = /(\w)\1*|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
/**
 * @name lightFormat
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. Unlike `format`,
 * `lightFormat` doesn't use locales and outputs date using the most popular tokens.
 *
 * > ⚠️ Please note that the `lightFormat` tokens differ from Moment.js and other libraries.
 * > See: https://git.io/fxCyr
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   |
 * |---------------------------------|---------|-----------------------------------|
 * | AM, PM                          | a..aaa  | AM, PM                            |
 * |                                 | aaaa    | a.m., p.m.                        |
 * |                                 | aaaaa   | a, p                              |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 |
 * |                                 | yy      | 44, 01, 00, 17                    |
 * |                                 | yyy     | 044, 001, 000, 017                |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |
 * |                                 | MM      | 01, 02, ..., 12                   |
 * | Day of month                    | d       | 1, 2, ..., 31                     |
 * |                                 | dd      | 01, 02, ..., 31                   |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |
 * |                                 | hh      | 01, 02, ..., 11, 12               |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |
 * |                                 | HH      | 00, 01, 02, ..., 23               |
 * | Minute                          | m       | 0, 1, ..., 59                     |
 * |                                 | mm      | 00, 01, ..., 59                   |
 * | Second                          | s       | 0, 1, ..., 59                     |
 * |                                 | ss      | 00, 01, ..., 59                   |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |
 * |                                 | SS      | 00, 01, ..., 99                   |
 * |                                 | SSS     | 000, 0001, ..., 999               |
 * |                                 | SSSS    | ...                               |
 *
 * @param {Date|Number} date - the original date
 * @param {String} format - the string of tokens
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * var result = lightFormat(new Date(2014, 1, 11), 'yyyy-MM-dd')
 * //=> '2014-02-11'
 */

function lightFormat(dirtyDate, dirtyFormatStr) {
  (0, _index6.default)(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var originalDate = (0, _index.default)(dirtyDate);

  if (!(0, _index4.default)(originalDate)) {
    throw new RangeError('Invalid time value');
  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376


  var timezoneOffset = (0, _index3.default)(originalDate);
  var utcDate = (0, _index5.default)(originalDate, timezoneOffset);
  var result = formatStr.match(formattingTokensRegExp).map(function (substring) {
    // Replace two single quote characters with one single quote character
    if (substring === "''") {
      return "'";
    }

    var firstCharacter = substring[0];

    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }

    var formatter = _index2.default[firstCharacter];

    if (formatter) {
      return formatter(utcDate, substring, null, {});
    }

    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
    }

    return substring;
  }).join('');
  return result;
}

function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/format/lightFormatters/index.js":"edad03f1fca5010f453d69b051a500b3","../_lib/getTimezoneOffsetInMilliseconds/index.js":"e1613370c964787e828d6e71e9590bf4","../isValid/index.js":"e498f8242893901cb098193d741d5e7a","../subMilliseconds/index.js":"d4c3fa7c1a401b98fc12fd2f31ab3db4","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"85f164c93466a8032b1e63dd8dffdd5e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = max;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name max
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - `max` function now accepts an array of dates rather than spread arguments.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   var date1 = new Date(1989, 6, 10)
 *   var date2 = new Date(1987, 1, 11)
 *   var maxDate = max(date1, date2)
 *
 *   // v2.0.0 onward:
 *   var dates = [new Date(1989, 6, 10), new Date(1987, 1, 11)]
 *   var maxDate = max(dates)
 *   ```
 *
 * @param {Date[]|Number[]} datesArray - the dates to compare
 * @returns {Date} the latest of the dates
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which of these dates is the latest?
 * var result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */
function max(dirtyDatesArray) {
  (0, _index2.default)(1, arguments);
  var datesArray; // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method

  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray; // If `dirtyDatesArray` is Array-like Object, convert to Array.
  } else if (typeof dirtyDatesArray === 'object' && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    // `dirtyDatesArray` is non-iterable, return Invalid Date
    return new Date(NaN);
  }

  var result;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = (0, _index.default)(dirtyDate);

    if (result === undefined || result < currentDate || isNaN(currentDate)) {
      result = currentDate;
    }
  });
  return result || new Date(NaN);
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"cb9968590348c3277d9086ce2d814ccf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = min;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name min
 * @category Common Helpers
 * @summary Return the earliest of the given dates.
 *
 * @description
 * Return the earliest of the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - `min` function now accepts an array of dates rather than spread arguments.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   var date1 = new Date(1989, 6, 10)
 *   var date2 = new Date(1987, 1, 11)
 *   var minDate = min(date1, date2)
 *
 *   // v2.0.0 onward:
 *   var dates = [new Date(1989, 6, 10), new Date(1987, 1, 11)]
 *   var minDate = min(dates)
 *   ```
 *
 * @param {Date[]|Number[]} datesArray - the dates to compare
 * @returns {Date} the earliest of the dates
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which of these dates is the earliest?
 * var result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */
function min(dirtyDatesArray) {
  (0, _index2.default)(1, arguments);
  var datesArray; // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method

  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray; // If `dirtyDatesArray` is Array-like Object, convert to Array.
  } else if (typeof dirtyDatesArray === 'object' && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    // `dirtyDatesArray` is non-iterable, return Invalid Date
    return new Date(NaN);
  }

  var result;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = (0, _index.default)(dirtyDate);

    if (result === undefined || result > currentDate || isNaN(currentDate)) {
      result = currentDate;
    }
  });
  return result || new Date(NaN);
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"39723a78eb8b374467405e532e310d94":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseISO;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The previous `parse` implementation was renamed to `parseISO`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   parse('2016-01-01')
 *
 *   // v2.0.0 onward
 *   parseISO('2016-01-01')
 *   ```
 *
 * - `parseISO` now validates separate date and time values in ISO-8601 strings
 *   and returns `Invalid Date` if the date is invalid.
 *
 *   ```javascript
 *   parseISO('2018-13-32')
 *   //=> Invalid Date
 *   ```
 *
 * - `parseISO` now doesn't fall back to `new Date` constructor
 *   if it fails to parse a string argument. Instead, it returns `Invalid Date`.
 *
 * @param {String} argument - the value to convert
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * var result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */

function parseISO(argument, dirtyOptions) {
  (0, _index2.default)(1, arguments);
  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : (0, _index.default)(options.additionalDigits);

  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }

  if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
    return new Date(NaN);
  }

  var dateStrings = splitDateString(argument);
  var date;

  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (isNaN(date) || !date) {
    return new Date(NaN);
  }

  var timestamp = date.getTime();
  var time = 0;
  var offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);

    if (isNaN(time) || time === null) {
      return new Date(NaN);
    }
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);

    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time); // js parsed string assuming it's in UTC timezone
    // but we need it to be parsed in our timezone
    // so we use utc values to build date in our timezone.
    // Year values from 0 to 99 map to the years 1900 to 1999
    // so set year explicitly with setFullYear.

    var result = new Date(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate(), dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    result.setFullYear(dirtyDate.getUTCFullYear());
    return result;
  }

  return new Date(timestamp + time + offset);
}

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString; // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].

  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];

    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }

  if (timeString) {
    var token = patterns.timezone.exec(timeString);

    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var regex = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + additionalDigits) + '})|(\\d{2}|[+-]\\d{' + (2 + additionalDigits) + '})$)');
  var captures = dateString.match(regex); // Invalid ISO-formatted year

  if (!captures) return {
    year: null
  };
  var year = captures[1] && parseInt(captures[1]);
  var century = captures[2] && parseInt(captures[2]);
  return {
    year: century == null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return null;
  var captures = dateString.match(dateRegex); // Invalid ISO-formatted string

  if (!captures) return null;
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }

    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = new Date(0);

    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }

    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures) return null; // Invalid ISO-formatted time

  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
}

function parseTimeUnit(value) {
  return value && parseFloat(value.replace(',', '.')) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === 'Z') return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  var sign = captures[1] === '+' ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
} // Validation functions
// February is null to handle the leap year (using ||)


var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100;
}

function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28));
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"16d5412446adeb40a9cf7840c93ec114":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseJSON;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name parseJSON
 * @category Common Helpers
 * @summary Parse a JSON date string
 *
 * @description
 * Converts a complete ISO date string in UTC time, the typical format for transmitting
 * a date in JSON, to a JavaScript `Date` instance.
 *
 * This is a minimal implementation for converting dates retrieved from a JSON API to
 * a `Date` instance which can be used with other functions in the `date-fns` library.
 * The following formats are supported:
 *
 * - `2000-03-15T05:20:10.123Z`: The output of `.toISOString()` and `JSON.stringify(new Date())`
 * - `2000-03-15T05:20:10Z`: Without milliseconds
 * - `2000-03-15T05:20:10+00:00`: With a zero offset, the default JSON encoded format in some other languages
 * - `2000-03-15T05:20:10+0000`: With a zero offset without a colon
 * - `2000-03-15T05:20:10`: Without a trailing 'Z' symbol
 * - `2000-03-15T05:20:10.1234567`: Up to 7 digits in milliseconds field. Only first 3 are taken into account since JS does not allow fractional milliseconds
 * - `2000-03-15 05:20:10`: With a space instead of a 'T' separator for APIs returning a SQL date without reformatting
 *
 * For convenience and ease of use these other input types are also supported
 * via [toDate]{@link https://date-fns.org/docs/toDate}:
 *
 * - A `Date` instance will be cloned
 * - A `number` will be treated as a timestamp
 *
 * Any other input type or invalid date strings will return an `Invalid Date`.
 *
 * @param {String|Number|Date} argument A fully formed ISO8601 date string to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 */
function parseJSON(argument) {
  (0, _index2.default)(1, arguments);

  if (typeof argument === 'string') {
    var parts = argument.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|\+00:?00)?/);

    if (parts) {
      return new Date(Date.UTC(+parts[1], parts[2] - 1, +parts[3], +parts[4], +parts[5], +parts[6], +((parts[7] || '0') + '00').substring(0, 3)));
    }

    return new Date(NaN);
  }

  return (0, _index.default)(argument);
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"b0061c9fe342923672da62c452cf1904":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = roundToNearestMinutes;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name roundToNearestMinutes
 * @category Minute Helpers
 * @summary Rounds the given date to the nearest minute
 *
 * @description
 * Rounds the given date to the nearest minute (or number of minutes).
 * Rounds up when the given date is exactly between the nearest round minutes.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to round
 * @param {Object} [options] - an object with options.
 * @param {Number} [options.nearestTo=1] - nearest number of minutes to round to. E.g. `15` to round to quarter hours.
 * @returns {Date} the new date rounded to the closest minute
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.nearestTo` must be between 1 and 30
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest minute:
 * var result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
 * //=> Thu Jul 10 2014 12:13:00
 *
 * @example
 * // Round 10 July 2014 12:07:30 to nearest quarter hour:
 * var result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
 * // rounds up because given date is exactly between 12:00:00 and 12:15:00
 * //=> Thu Jul 10 2014 12:15:00
 */
function roundToNearestMinutes(dirtyDate, options) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only none provided present');
  }

  var nearestTo = options && 'nearestTo' in options ? (0, _index2.default)(options.nearestTo) : 1;

  if (nearestTo < 1 || nearestTo > 30) {
    throw new RangeError('`options.nearestTo` must be between 1 and 30');
  }

  var date = (0, _index.default)(dirtyDate);
  var seconds = date.getSeconds(); // relevant if nearestTo is 1, which is the default case

  var minutes = date.getMinutes() + seconds / 60;
  var roundedMinutes = Math.floor(minutes / nearestTo) * nearestTo;
  var remainderMinutes = minutes % nearestTo;
  var addedMinutes = Math.round(remainderMinutes / nearestTo) * nearestTo;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), roundedMinutes + addedMinutes);
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e"}],"3aeb2a4c24eb0b0b0f160a8dc94f667c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = set;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../setMonth/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name set
 * @category Common Helpers
 * @summary Set date values to a given date.
 *
 * @description
 * Set date values to a given date.
 *
 * Sets time values to date from object `values`.
 * A value is not set if it is undefined or null or doesn't exist in `values`.
 *
 * Note about bundle size: `set` does not internally use `setX` functions from date-fns but instead opts
 * to use native `Date#setX` methods. If you use this function, you may not want to include the
 * other `setX` functions that date-fns provides if you are concerned about the bundle size.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Object} values - an object with options
 * @param {Number} [values.year] - the number of years to be set
 * @param {Number} [values.month] - the number of months to be set
 * @param {Number} [values.date] - the number of days to be set
 * @param {Number} [values.hours] - the number of hours to be set
 * @param {Number} [values.minutes] - the number of minutes to be set
 * @param {Number} [values.seconds] - the number of seconds to be set
 * @param {Number} [values.milliseconds] - the number of milliseconds to be set
 * @returns {Date} the new date with options set
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `values` must be an object
 *
 * @example
 * // Transform 1 September 2014 into 20 October 2015 in a single line:
 * var result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
 * //=> Tue Oct 20 2015 00:00:00
 *
 * @example
 * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
 * var result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
 * //=> Mon Sep 01 2014 12:23:45
 */
function set(dirtyDate, values) {
  (0, _index4.default)(2, arguments);

  if (typeof values !== 'object' || values === null) {
    throw new RangeError('values parameter must be an object');
  }

  var date = (0, _index.default)(dirtyDate); // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date

  if (isNaN(date)) {
    return new Date(NaN);
  }

  if (values.year != null) {
    date.setFullYear(values.year);
  }

  if (values.month != null) {
    date = (0, _index2.default)(date, values.month);
  }

  if (values.date != null) {
    date.setDate((0, _index3.default)(values.date));
  }

  if (values.hours != null) {
    date.setHours((0, _index3.default)(values.hours));
  }

  if (values.minutes != null) {
    date.setMinutes((0, _index3.default)(values.minutes));
  }

  if (values.seconds != null) {
    date.setSeconds((0, _index3.default)(values.seconds));
  }

  if (values.milliseconds != null) {
    date.setMilliseconds((0, _index3.default)(values.milliseconds));
  }

  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../setMonth/index.js":"f1c5ebb39c2a668d3a445d46f935ca2c","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"f1c5ebb39c2a668d3a445d46f935ca2c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setMonth;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../getDaysInMonth/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setMonth
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} month - the month of the new date
 * @returns {Date} the new date with the month set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set February to 1 September 2014:
 * var result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth(dirtyDate, dirtyMonth) {
  (0, _index4.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var month = (0, _index.default)(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = (0, _index3.default)(dateWithDesiredMonth); // Set the last day of the new month
  // if the original date was the last day of the longer month

  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../getDaysInMonth/index.js":"8298413df5cc7073c82e7242ea292acd","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"e2dec063b4e5f7e9cbe7696b5d6e9666":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setDate;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setDate
 * @category Day Helpers
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} dayOfMonth - the day of the month of the new date
 * @returns {Date} the new date with the day of the month set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set the 30th day of the month to 1 September 2014:
 * var result = setDate(new Date(2014, 8, 1), 30)
 * //=> Tue Sep 30 2014 00:00:00
 */
function setDate(dirtyDate, dirtyDayOfMonth) {
  (0, _index3.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var dayOfMonth = (0, _index.default)(dirtyDayOfMonth);
  date.setDate(dayOfMonth);
  return date;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"a71fd34e1ecfa7761719202ba566a403":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setDay;

var _index = _interopRequireDefault(require("../addDays/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setDay
 * @category Weekday Helpers
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} day - the day of the week of the new date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the new date with the day of the week set
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Set week day to Sunday, with the default weekStartsOn of Sunday:
 * var result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Set week day to Sunday, with a weekStartsOn of Monday:
 * var result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
function setDay(dirtyDate, dirtyDay, dirtyOptions) {
  (0, _index4.default)(2, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0, _index3.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0, _index3.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0, _index2.default)(dirtyDate, options);
  var day = (0, _index3.default)(dirtyDay);
  var currentDay = date.getDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var delta = 7 - weekStartsOn;
  var diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
  return (0, _index.default)(date, diff, options);
}

module.exports = exports.default;
},{"../addDays/index.js":"5fdec9afb4e5b1ea71ca3db109ea4b4a","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"cedb3d267a5636728a65550cf793b5f5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setDayOfYear;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setDayOfYear
 * @category Day Helpers
 * @summary Set the day of the year to the given date.
 *
 * @description
 * Set the day of the year to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} dayOfYear - the day of the year of the new date
 * @returns {Date} the new date with the day of the year set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set the 2nd day of the year to 2 July 2014:
 * var result = setDayOfYear(new Date(2014, 6, 2), 2)
 * //=> Thu Jan 02 2014 00:00:00
 */
function setDayOfYear(dirtyDate, dirtyDayOfYear) {
  (0, _index3.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var dayOfYear = (0, _index.default)(dirtyDayOfYear);
  date.setMonth(0);
  date.setDate(dayOfYear);
  return date;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"8ceafa0198583670c2bccf4454f38794":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setHours;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setHours
 * @category Hour Helpers
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} hours - the hours of the new date
 * @returns {Date} the new date with the hours set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * var result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
function setHours(dirtyDate, dirtyHours) {
  (0, _index3.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var hours = (0, _index.default)(dirtyHours);
  date.setHours(hours);
  return date;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"a3624be2c4911b06b3fa58307fce5f0d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setISODay;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../addDays/index.js"));

var _index4 = _interopRequireDefault(require("../getISODay/index.js"));

var _index5 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setISODay
 * @category Weekday Helpers
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday etc.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} day - the day of the ISO week of the new date
 * @returns {Date} the new date with the day of the ISO week set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * var result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
function setISODay(dirtyDate, dirtyDay) {
  (0, _index5.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var day = (0, _index.default)(dirtyDay);
  var currentDay = (0, _index4.default)(date);
  var diff = day - currentDay;
  return (0, _index3.default)(date, diff);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../addDays/index.js":"5fdec9afb4e5b1ea71ca3db109ea4b4a","../getISODay/index.js":"6a3e0610b347e6c8e6f76863aab4f479","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"050399cd697636cd8e914dbc6186d831":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setISOWeek;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../getISOWeek/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setISOWeek
 * @category ISO Week Helpers
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} isoWeek - the ISO week of the new date
 * @returns {Date} the new date with the ISO week set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * var result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
function setISOWeek(dirtyDate, dirtyISOWeek) {
  (0, _index4.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var isoWeek = (0, _index.default)(dirtyISOWeek);
  var diff = (0, _index3.default)(date) - isoWeek;
  date.setDate(date.getDate() - diff * 7);
  return date;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../getISOWeek/index.js":"71883f1860b86a189ef2fc77e755a732","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"dca6009831992d9318e40f1684915140":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setMilliseconds;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setMilliseconds
 * @category Millisecond Helpers
 * @summary Set the milliseconds to the given date.
 *
 * @description
 * Set the milliseconds to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} milliseconds - the milliseconds of the new date
 * @returns {Date} the new date with the milliseconds set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
 * var result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
 * //=> Mon Sep 01 2014 11:30:40.300
 */
function setMilliseconds(dirtyDate, dirtyMilliseconds) {
  (0, _index3.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var milliseconds = (0, _index.default)(dirtyMilliseconds);
  date.setMilliseconds(milliseconds);
  return date;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"09cd966935083291ac9970913055f927":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setMinutes;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setMinutes
 * @category Minute Helpers
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} minutes - the minutes of the new date
 * @returns {Date} the new date with the minutes set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * var result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
function setMinutes(dirtyDate, dirtyMinutes) {
  (0, _index3.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var minutes = (0, _index.default)(dirtyMinutes);
  date.setMinutes(minutes);
  return date;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"21b5f859c69ef4933710126207ae21ab":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setQuarter;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../setMonth/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setQuarter
 * @category Quarter Helpers
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} quarter - the quarter of the new date
 * @returns {Date} the new date with the quarter set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * var result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */
function setQuarter(dirtyDate, dirtyQuarter) {
  (0, _index4.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var quarter = (0, _index.default)(dirtyQuarter);
  var oldQuarter = Math.floor(date.getMonth() / 3) + 1;
  var diff = quarter - oldQuarter;
  return (0, _index3.default)(date, date.getMonth() + diff * 3);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../setMonth/index.js":"f1c5ebb39c2a668d3a445d46f935ca2c","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"614a3436499e906c08b869cdb16370ce":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setSeconds;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setSeconds
 * @category Second Helpers
 * @summary Set the seconds to the given date.
 *
 * @description
 * Set the seconds to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} seconds - the seconds of the new date
 * @returns {Date} the new date with the seconds set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * var result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
function setSeconds(dirtyDate, dirtySeconds) {
  (0, _index3.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var seconds = (0, _index.default)(dirtySeconds);
  date.setSeconds(seconds);
  return date;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"f6718bd87379ed600a0e516621879633":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setWeek;

var _index = _interopRequireDefault(require("../getWeek/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setWeek
 * @category Week Helpers
 * @summary Set the local week to the given date.
 *
 * @description
 * Set the local week to the given date, saving the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} week - the week of the new date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Date} the new date with the local week set
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // Set the 1st week to 2 January 2005 with default options:
 * var result = setWeek(new Date(2005, 0, 2), 1)
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // Set the 1st week to 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January:
 * var result = setWeek(new Date(2005, 0, 2), 1, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sun Jan 4 2004 00:00:00
 */
function setWeek(dirtyDate, dirtyWeek, dirtyOptions) {
  (0, _index4.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var week = (0, _index3.default)(dirtyWeek);
  var diff = (0, _index.default)(date, dirtyOptions) - week;
  date.setDate(date.getDate() - diff * 7);
  return date;
}

module.exports = exports.default;
},{"../getWeek/index.js":"a997e8e39a4da3af79e448fa39a525be","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"0a9036a4faff0278acde0c3bf4523d30":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setWeekYear;

var _index = _interopRequireDefault(require("../differenceInCalendarDays/index.js"));

var _index2 = _interopRequireDefault(require("../startOfWeekYear/index.js"));

var _index3 = _interopRequireDefault(require("../toDate/index.js"));

var _index4 = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index5 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Set the local week-numbering year to the given date.
 *
 * @description
 * Set the local week-numbering year to the given date,
 * saving the week number and the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#Week_numbering
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} weekYear - the local week-numbering year of the new date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @returns {Date} the new date with the local week-numbering year set
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010 with default options:
 * var result = setWeekYear(new Date(2010, 0, 2), 2004)
 * //=> Sat Jan 03 2004 00:00:00
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010,
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * var result = setWeekYear(new Date(2010, 0, 2), 2004, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sat Jan 01 2005 00:00:00
 */
function setWeekYear(dirtyDate, dirtyWeekYear, dirtyOptions) {
  (0, _index5.default)(2, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0, _index4.default)(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0, _index4.default)(options.firstWeekContainsDate);
  var date = (0, _index3.default)(dirtyDate);
  var weekYear = (0, _index4.default)(dirtyWeekYear);
  var diff = (0, _index.default)(date, (0, _index2.default)(date, dirtyOptions));
  var firstWeek = new Date(0);
  firstWeek.setFullYear(weekYear, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  date = (0, _index2.default)(firstWeek, dirtyOptions);
  date.setDate(date.getDate() + diff);
  return date;
}

module.exports = exports.default;
},{"../differenceInCalendarDays/index.js":"8255b070c42b22dde4ff1d9e2d1f8222","../startOfWeekYear/index.js":"78e987916a9f12e1c18744fd944f6014","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"0980643c559e7cff77f6ce2c5d6034b4":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setYear;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../toDate/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setYear
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} year - the year of the new date
 * @returns {Date} the new date with the year set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * var result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear(dirtyDate, dirtyYear) {
  (0, _index3.default)(2, arguments);
  var date = (0, _index2.default)(dirtyDate);
  var year = (0, _index.default)(dirtyYear); // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date

  if (isNaN(date)) {
    return new Date(NaN);
  }

  date.setFullYear(year);
  return date;
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"b2f1c99c79182001fe9763c34ffb30f2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfDecade;

var _index = _interopRequireDefault(require("../toDate/index.js"));

var _index2 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfDecade
 * @category Decade Helpers
 * @summary Return the start of a decade for the given date.
 *
 * @description
 * Return the start of a decade for the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a decade
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a decade for 21 October 2015 00:00:00:
 * var result = startOfDecade(new Date(2015, 9, 21, 00, 00, 00))
 * //=> Jan 01 2010 00:00:00
 */
function startOfDecade(dirtyDate) {
  (0, _index2.default)(1, arguments);
  var date = (0, _index.default)(dirtyDate);
  var year = date.getFullYear();
  var decade = Math.floor(year / 10) * 10;
  date.setFullYear(decade, 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{"../toDate/index.js":"4d4cbccb04ce5990e942550dfe4cd445","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"8dfe1c16ea542e8b1c7afa351a4fb2c7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfToday;

var _index = _interopRequireDefault(require("../startOfDay/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfToday
 * @category Day Helpers
 * @summary Return the start of today.
 * @pure false
 *
 * @description
 * Return the start of today.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @returns {Date} the start of today
 *
 * @example
 * // If today is 6 October 2014:
 * var result = startOfToday()
 * //=> Mon Oct 6 2014 00:00:00
 */
function startOfToday() {
  return (0, _index.default)(Date.now());
}

module.exports = exports.default;
},{"../startOfDay/index.js":"744d936ab12e05d0425f696fac165804"}],"74fdb0c4bed6fd0542b5cca829f14bc1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfTomorrow;

/**
 * @name startOfTomorrow
 * @category Day Helpers
 * @summary Return the start of tomorrow.
 * @pure false
 *
 * @description
 * Return the start of tomorrow.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `new Date()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @returns {Date} the start of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * var result = startOfTomorrow()
 * //=> Tue Oct 7 2014 00:00:00
 */
function startOfTomorrow() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{}],"ad75d97f335f78ab3d3c0a0961f50744":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfYesterday;

/**
 * @name startOfYesterday
 * @category Day Helpers
 * @summary Return the start of yesterday.
 * @pure false
 *
 * @description
 * Return the start of yesterday.
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `new Date()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @returns {Date} the start of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * var result = startOfYesterday()
 * //=> Sun Oct 5 2014 00:00:00
 */
function startOfYesterday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = exports.default;
},{}],"5fde211b45ae5d3c2c4fdc7c1e19477c":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subBusinessDays;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addBusinessDays/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subBusinessDays
 * @category Day Helpers
 * @summary Substract the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Substract the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of business days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the business days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Substract 10 business days from 1 September 2014:
 * var result = subBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Aug 18 2014 00:00:00 (skipped weekend days)
 */
function subBusinessDays(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addBusinessDays/index.js":"e461bf4ab3d2c090b0e29faa612bfb12","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"a9708b84504bdd67663413519bc924d0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subHours;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addHours/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subHours
 * @category Hour Helpers
 * @summary Subtract the specified number of hours from the given date.
 *
 * @description
 * Subtract the specified number of hours from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the hours subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 2 hours from 11 July 2014 01:00:00:
 * var result = subHours(new Date(2014, 6, 11, 1, 0), 2)
 * //=> Thu Jul 10 2014 23:00:00
 */
function subHours(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addHours/index.js":"cd47d6b53a35480fa364f0daccc1ea68","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"c9b4820f62efa127bead6974eb642f14":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subMinutes;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addMinutes/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subMinutes
 * @category Minute Helpers
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the minutes subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * var result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */
function subMinutes(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addMinutes/index.js":"6add3d9bd711b465b1f3fcfd9dbaacef","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"afaa74b055749afcfe4234604fc159af":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subQuarters;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addQuarters/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subQuarters
 * @category Quarter Helpers
 * @summary Subtract the specified number of year quarters from the given date.
 *
 * @description
 * Subtract the specified number of year quarters from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of quarters to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the quarters subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 3 quarters from 1 September 2014:
 * var result = subQuarters(new Date(2014, 8, 1), 3)
 * //=> Sun Dec 01 2013 00:00:00
 */
function subQuarters(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addQuarters/index.js":"928b02c9289f2a44dc206b85a4f19db0","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"49ca86ad057e050f8cebdd01a06d5bfa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subSeconds;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addSeconds/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subSeconds
 * @category Second Helpers
 * @summary Subtract the specified number of seconds from the given date.
 *
 * @description
 * Subtract the specified number of seconds from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of seconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the seconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 30 seconds from 10 July 2014 12:45:00:
 * var result = subSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:44:30
 */
function subSeconds(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addSeconds/index.js":"06da1dae2be75137482b0934e6a816e4","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"aee1d441e5f850d2ec745c4c6098dd09":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subWeeks;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addWeeks/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subWeeks
 * @category Week Helpers
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the weeks subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * var result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
function subWeeks(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addWeeks/index.js":"d7f228172dbd1739d5d2624dd7fbb932","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"35538a1800388d694d4ef9c863fea581":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = subYears;

var _index = _interopRequireDefault(require("../_lib/toInteger/index.js"));

var _index2 = _interopRequireDefault(require("../addYears/index.js"));

var _index3 = _interopRequireDefault(require("../_lib/requiredArgs/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name subYears
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the years subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * var result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
function subYears(dirtyDate, dirtyAmount) {
  (0, _index3.default)(2, arguments);
  var amount = (0, _index.default)(dirtyAmount);
  return (0, _index2.default)(dirtyDate, -amount);
}

module.exports = exports.default;
},{"../_lib/toInteger/index.js":"4f12886b17b9e27a855b6b6925f19f6e","../addYears/index.js":"e3b1a16fd74a5e331a21f425de5cae3a","../_lib/requiredArgs/index.js":"96233ac16f80ecbe82bbfc9a5dea36d1"}],"fd3e1097ec67f3d6a19982ca02550c0a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minTime = exports.maxTime = void 0;

/**
 *  Maximum allowed time.
 *  @constant
 *  @type {number}
 *  @default
 */
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;
/**
 *  Minimum allowed time.
 *  @constant
 *  @type {number}
 *  @default
 */

exports.maxTime = maxTime;
var minTime = -maxTime;
exports.minTime = minTime;
},{}],"e01b06873970098a24800651e0ccce10":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./_lib/formatDistance/index.js"));

var _index2 = _interopRequireDefault(require("./_lib/formatLong/index.js"));

var _index3 = _interopRequireDefault(require("./_lib/formatRelative/index.js"));

var _index4 = _interopRequireDefault(require("./_lib/localize/index.js"));

var _index5 = _interopRequireDefault(require("./_lib/match/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {Locale}
 * @category Locales
 * @summary Japanese locale.
 * @language Japanese
 * @iso-639-2 jpn
 * @author Thomas Eilmsteiner [@DeMuu]{@link https://github.com/DeMuu}
 * @author Yamagishi Kazutoshi [@ykzts]{@link https://github.com/ykzts}
 * @author Luca Ban [@mesqueeb]{@link https://github.com/mesqueeb}
 * @author Terrence Lam [@skyuplam]{@link https://github.com/skyuplam}
 * @author Taiki IKeda [@so99ynoodles]{@link https://github.com/so99ynoodles}
 */
var locale = {
  code: 'ja',
  formatDistance: _index.default,
  formatLong: _index2.default,
  formatRelative: _index3.default,
  localize: _index4.default,
  match: _index5.default,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};
var _default = locale;
exports.default = _default;
},{"./_lib/formatDistance/index.js":"5689956a6b4ffad009b72cbd9d86174e","./_lib/formatLong/index.js":"c522ffd41e580f613b1e3b1d91debc78","./_lib/formatRelative/index.js":"722d4342c6975e58eae6c39804c8c059","./_lib/localize/index.js":"e3dcde37e03d985c4f43e3a37baeb5a1","./_lib/match/index.js":"fc2f092bf18653a7fd109fe772c149fd"}],"5689956a6b4ffad009b72cbd9d86174e":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistance;
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: '1秒未満',
    other: '{{count}}秒未満',
    oneWithSuffix: '約1秒',
    otherWithSuffix: '約{{count}}秒'
  },
  xSeconds: {
    one: '1秒',
    other: '{{count}}秒'
  },
  halfAMinute: '30秒',
  lessThanXMinutes: {
    one: '1分未満',
    other: '{{count}}分未満',
    oneWithSuffix: '約1分',
    otherWithSuffix: '約{{count}}分'
  },
  xMinutes: {
    one: '1分',
    other: '{{count}}分'
  },
  aboutXHours: {
    one: '約1時間',
    other: '約{{count}}時間'
  },
  xHours: {
    one: '1時間',
    other: '{{count}}時間'
  },
  xDays: {
    one: '1日',
    other: '{{count}}日'
  },
  aboutXWeeks: {
    one: '約1週間',
    other: '約{{count}}週間'
  },
  xWeeks: {
    one: '1週間',
    other: '{{count}}週間'
  },
  aboutXMonths: {
    one: '約1か月',
    other: '約{{count}}か月'
  },
  xMonths: {
    one: '1か月',
    other: '{{count}}か月'
  },
  aboutXYears: {
    one: '約1年',
    other: '約{{count}}年'
  },
  xYears: {
    one: '1年',
    other: '{{count}}年'
  },
  overXYears: {
    one: '1年以上',
    other: '{{count}}年以上'
  },
  almostXYears: {
    one: '1年近く',
    other: '{{count}}年近く'
  }
};

function formatDistance(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    if (options.addSuffix && formatDistanceLocale[token].oneWithSuffix) {
      result = formatDistanceLocale[token].oneWithSuffix;
    } else {
      result = formatDistanceLocale[token].one;
    }
  } else {
    if (options.addSuffix && formatDistanceLocale[token].otherWithSuffix) {
      result = formatDistanceLocale[token].otherWithSuffix.replace('{{count}}', count);
    } else {
      result = formatDistanceLocale[token].other.replace('{{count}}', count);
    }
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return result + '後';
    } else {
      return result + '前';
    }
  }

  return result;
}
},{}],"c522ffd41e580f613b1e3b1d91debc78":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../../_lib/buildFormatLongFn/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateFormats = {
  full: 'y年M月d日EEEE',
  long: 'y年M月d日',
  medium: 'y/MM/dd',
  short: 'y/MM/dd'
};
var timeFormats = {
  full: 'H時mm分ss秒 zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong = {
  date: (0, _index.default)({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: (0, _index.default)({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: (0, _index.default)({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};
var _default = formatLong;
exports.default = _default;
},{"../../../_lib/buildFormatLongFn/index.js":"cbef255c644a728fb304b481e26634d0"}],"cbef255c644a728fb304b481e26634d0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFormatLongFn;

function buildFormatLongFn(args) {
  return function (dirtyOptions) {
    var options = dirtyOptions || {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}
},{}],"722d4342c6975e58eae6c39804c8c059":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;
var formatRelativeLocale = {
  lastWeek: '先週のeeeeのp',
  yesterday: '昨日のp',
  today: '今日のp',
  tomorrow: '明日のp',
  nextWeek: '翌週のeeeeのp',
  other: 'P'
};

function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}
},{}],"e3dcde37e03d985c4f43e3a37baeb5a1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../../_lib/buildLocalizeFn/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eraValues = {
  narrow: ['BC', 'AC'],
  abbreviated: ['紀元前', '西暦'],
  wide: ['紀元前', '西暦']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['第1四半期', '第2四半期', '第3四半期', '第4四半期']
};
var monthValues = {
  narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  abbreviated: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  wide: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
};
var dayValues = {
  narrow: ['日', '月', '火', '水', '木', '金', '土'],
  short: ['日', '月', '火', '水', '木', '金', '土'],
  abbreviated: ['日', '月', '火', '水', '木', '金', '土'],
  wide: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
};
var dayPeriodValues = {
  narrow: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  },
  abbreviated: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  },
  wide: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  },
  abbreviated: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  },
  wide: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  }
};

function ordinalNumber(dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var options = dirtyOptions || {};
  var unit = String(options.unit);

  if (unit === 'date') {
    return number + '日';
  }

  return number;
}

var localize = {
  ordinalNumber: ordinalNumber,
  era: (0, _index.default)({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: (0, _index.default)({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: (0, _index.default)({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: (0, _index.default)({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: (0, _index.default)({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};
var _default = localize;
exports.default = _default;
},{"../../../_lib/buildLocalizeFn/index.js":"78b5d48c2048fa772959d16a420315cf"}],"78b5d48c2048fa772959d16a420315cf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildLocalizeFn;

function buildLocalizeFn(args) {
  return function (dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {};
    var context = options.context ? String(options.context) : 'standalone';
    var valuesArray;

    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;

      var _width = options.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }

    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}
},{}],"fc2f092bf18653a7fd109fe772c149fd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../../_lib/buildMatchPatternFn/index.js"));

var _index2 = _interopRequireDefault(require("../../../_lib/buildMatchFn/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchOrdinalNumberPattern = /^第?\d+(日)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(B\.?C\.?|A\.?D\.?)/i,
  abbreviated: /^(紀元[前後]|西暦)/i,
  wide: /^(紀元[前後]|西暦)/i
};
var parseEraPatterns = {
  narrow: [/^B/i, /^A/i],
  any: [/^(紀元前)/i, /^(西暦|紀元後)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^Q[1234]/i,
  wide: /^第[1234一二三四１２３４]四半期/i
};
var parseQuarterPatterns = {
  any: [/(1|一|１)/i, /(2|二|２)/i, /(3|三|３)/i, /(4|四|４)/i]
};
var matchMonthPatterns = {
  narrow: /^([123456789]|1[012])/,
  abbreviated: /^([123456789]|1[012])月/i,
  wide: /^([123456789]|1[012])月/i
};
var parseMonthPatterns = {
  any: [/^1\D/, /^2/, /^3/, /^4/, /^5/, /^6/, /^7/, /^8/, /^9/, /^10/, /^11/, /^12/]
};
var matchDayPatterns = {
  narrow: /^[日月火水木金土]/,
  short: /^[日月火水木金土]/,
  abbreviated: /^[日月火水木金土]/,
  wide: /^[日月火水木金土]曜日/
};
var parseDayPatterns = {
  any: [/^日/, /^月/, /^火/, /^水/, /^木/, /^金/, /^土/]
};
var matchDayPeriodPatterns = {
  any: /^(AM|PM|午前|午後|正午|深夜|真夜中|夜|朝)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^(A|午前)/i,
    pm: /^(P|午後)/i,
    midnight: /^深夜|真夜中/i,
    noon: /^正午/i,
    morning: /^朝/i,
    afternoon: /^午後/i,
    evening: /^夜/i,
    night: /^深夜/i
  }
};
var match = {
  ordinalNumber: (0, _index.default)({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: (0, _index2.default)({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: (0, _index2.default)({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: (0, _index2.default)({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: (0, _index2.default)({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: (0, _index2.default)({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};
var _default = match;
exports.default = _default;
},{"../../../_lib/buildMatchPatternFn/index.js":"132027be8a7c2059b0e86ad1df8a3d35","../../../_lib/buildMatchFn/index.js":"2b8fa5150aeb8637dae61fd315d048ac"}],"132027be8a7c2059b0e86ad1df8a3d35":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMatchPatternFn;

function buildMatchPatternFn(args) {
  return function (dirtyString, dirtyOptions) {
    var string = String(dirtyString);
    var options = dirtyOptions || {};
    var matchResult = string.match(args.matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);

    if (!parseResult) {
      return null;
    }

    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    return {
      value: value,
      rest: string.slice(matchedString.length)
    };
  };
}
},{}],"2b8fa5150aeb8637dae61fd315d048ac":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMatchFn;

function buildMatchFn(args) {
  return function (dirtyString, dirtyOptions) {
    var string = String(dirtyString);
    var options = dirtyOptions || {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var value;

    if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {
      value = findIndex(parsePatterns, function (pattern) {
        return pattern.test(matchedString);
      });
    } else {
      value = findKey(parsePatterns, function (pattern) {
        return pattern.test(matchedString);
      });
    }

    value = args.valueCallback ? args.valueCallback(value) : value;
    value = options.valueCallback ? options.valueCallback(value) : value;
    return {
      value: value,
      rest: string.slice(matchedString.length)
    };
  };
}

function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
}

function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
}
},{}]},{},["2075bdda7f3d1179ab1798efa7bdc0f0","f9d1fdab4daafc675f509edfcc40bc23"], null)

//# sourceMappingURL=run-in-browser.9bcdf207.js.map
