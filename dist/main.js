var $53U0h$pino = require("pino");
var $53U0h$chalk = require("chalk");
var $53U0h$dayjs = require("dayjs");
var $53U0h$maskjson = require("mask-json");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "NO_OPS_LOGGER", function () { return $163cd63d215c95aa$export$a58c827866c87469; });
$parcel$export(module.exports, "updateOptions", function () { return $163cd63d215c95aa$export$c6fe4049d20353ac; });
$parcel$export(module.exports, "setExternalLogger", function () { return $163cd63d215c95aa$export$8f19a62963079f27; });
$parcel$export(module.exports, "setColorLevel", function () { return $163cd63d215c95aa$export$f928010dd6a36a71; });
$parcel$export(module.exports, "logFactory", function () { return $163cd63d215c95aa$export$43641a4cf14c61ba; });




const $163cd63d215c95aa$export$a58c827866c87469 = ()=>{};
const $163cd63d215c95aa$var$DEFAULT_CHALK_LEVEL = 1;
const $163cd63d215c95aa$var$LEVEL_TO_CONSOLE = {
    debug: "debug",
    fatal: "info",
    error: "info",
    warn: "info",
    info: "info",
    trace: "info"
};
const $163cd63d215c95aa$var$LEVEL_TO_LABEL = {
    debug: "D",
    fatal: "F",
    error: "E",
    warn: "W",
    info: "I",
    trace: "I"
};
const $163cd63d215c95aa$var$OPTIONS = {
    level: undefined ?? "debug",
    context: {},
    maskTargets: [],
    maskReplacement: "***",
    enableStack: true,
    browser: {
        inline: false
    }
};
let $163cd63d215c95aa$var$chalk = new (0, ($parcel$interopDefault($53U0h$chalk))).Instance({
    level: $163cd63d215c95aa$var$DEFAULT_CHALK_LEVEL
});
let $163cd63d215c95aa$var$maskJson = (0, ($parcel$interopDefault($53U0h$maskjson)))([], {
    replacement: $163cd63d215c95aa$var$OPTIONS.maskReplacement
});
let $163cd63d215c95aa$var$PRESENT_EXTERNAL_LOGGER = $163cd63d215c95aa$export$a58c827866c87469;
const $163cd63d215c95aa$export$c6fe4049d20353ac = (options)=>{
    Object.assign($163cd63d215c95aa$var$OPTIONS, options);
    $163cd63d215c95aa$var$maskJson = (0, ($parcel$interopDefault($53U0h$maskjson)))($163cd63d215c95aa$var$OPTIONS.maskTargets, {
        replacement: $163cd63d215c95aa$var$OPTIONS.maskReplacement
    });
};
function $163cd63d215c95aa$export$8f19a62963079f27(logger) {
    $163cd63d215c95aa$var$PRESENT_EXTERNAL_LOGGER = logger;
}
const $163cd63d215c95aa$export$f928010dd6a36a71 = (level)=>{
    $163cd63d215c95aa$var$chalk = new (0, ($parcel$interopDefault($53U0h$chalk))).Instance({
        level: level
    });
};
const $163cd63d215c95aa$var$pickExists = (obj)=>{
    return Object.fromEntries(Object.entries(obj).filter(([, v])=>v !== undefined));
};
const $163cd63d215c95aa$var$summarize = (obj)=>{
    // omit stack, level, time, msg from the parameter object
    const { type: type , message: message , stack: stack , err: err , msg: msg , method: method , ...rest } = obj;
    const isErrorMode = type == "Error" && stack || err;
    const finalMsg = (isErrorMode ? (msg ?? message) ?? err?.message : msg) ?? "";
    const finalParams = {
        ...$163cd63d215c95aa$var$maskJson(rest),
        ...isErrorMode && $163cd63d215c95aa$var$OPTIONS.enableStack ? {
            stack: ((stack ?? err?.stack) ?? "").split("\n")
        } : $163cd63d215c95aa$var$pickExists({
            type: type,
            message: message,
            stack: stack
        })
    };
    return {
        msg: finalMsg,
        method: method,
        ...finalParams
    };
};
const $163cd63d215c95aa$export$43641a4cf14c61ba = (name)=>(0, ($parcel$interopDefault($53U0h$pino)))({
        name: name,
        level: $163cd63d215c95aa$var$OPTIONS.level,
        formatters: {
            // omit pid and hostname
            bindings: ({ name: name  })=>({
                    name: name
                }),
            // for nodejs environment only
            log: (o)=>{
                const { level: level , time: time , ...rest } = o;
                return {
                    level: level,
                    time: time,
                    ...$163cd63d215c95aa$var$summarize(rest)
                };
            }
        },
        browser: {
            // use Pino's standard serializers
            // https://github.com/pinojs/pino-std-serializers
            serialize: false,
            write: (o)=>{
                const { level: level , time: time , ...rest } = o;
                const { msg: msg , method: method , ...params } = $163cd63d215c95aa$var$summarize(rest);
                const LEVEL_TO_COLOR = {
                    debug: $163cd63d215c95aa$var$chalk.gray,
                    fatal: $163cd63d215c95aa$var$chalk.bgRed.white,
                    error: $163cd63d215c95aa$var$chalk.red,
                    warn: $163cd63d215c95aa$var$chalk.yellow,
                    info: (s)=>s,
                    trace: (s)=>s
                };
                const color = LEVEL_TO_COLOR[(0, ($parcel$interopDefault($53U0h$pino))).levels.labels[`${level}`]];
                // get HH:mm:ss
                const timeLabel = (0, ($parcel$interopDefault($53U0h$dayjs)))(time).format("HH:mm:ss");
                const levelKey = (0, ($parcel$interopDefault($53U0h$pino))).levels.labels[`${level}`];
                const consoleKey = $163cd63d215c95aa$var$LEVEL_TO_CONSOLE[levelKey];
                const levelLabel = $163cd63d215c95aa$var$LEVEL_TO_LABEL[levelKey];
                const _method = method ? `:${method}` : "";
                const s = `${timeLabel} ${levelLabel} [${name}${_method}] ${msg}`;
                if (Object.keys(params).length) {
                    if ($163cd63d215c95aa$var$OPTIONS.browser.inline) console[consoleKey](color(`${s} ${JSON.stringify(params)}`));
                    else console[consoleKey](color(s), params);
                } else console[consoleKey](color(s));
                $163cd63d215c95aa$var$PRESENT_EXTERNAL_LOGGER({
                    message: msg || "",
                    context: {
                        logger: name,
                        ...params
                    },
                    status: levelKey
                });
            }
        }
    });


//# sourceMappingURL=main.js.map
