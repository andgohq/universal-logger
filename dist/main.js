var $33vPW$pino = require("pino");
var $33vPW$ansicolors = require("ansi-colors");
var $33vPW$dayjs = require("dayjs");
var $33vPW$maskjson = require("mask-json");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "NO_OPS_LOGGER", () => $a11effce52aa2bec$export$a58c827866c87469);
$parcel$export(module.exports, "updateOptions", () => $a11effce52aa2bec$export$c6fe4049d20353ac);
$parcel$export(module.exports, "setExternalLogger", () => $a11effce52aa2bec$export$8f19a62963079f27);
$parcel$export(module.exports, "logFactory", () => $a11effce52aa2bec$export$43641a4cf14c61ba);




const $a11effce52aa2bec$export$a58c827866c87469 = ()=>{};
const $a11effce52aa2bec$var$LEVEL_TO_CONSOLE = {
    debug: "debug",
    fatal: "info",
    error: "info",
    warn: "info",
    info: "info",
    trace: "info"
};
const $a11effce52aa2bec$var$LEVEL_TO_LABEL = {
    debug: "D",
    fatal: "F",
    error: "E",
    warn: "W",
    info: "I",
    trace: "I"
};
const $a11effce52aa2bec$var$OPTIONS = {
    level: undefined ?? "debug",
    context: {},
    maskTargets: [],
    maskReplacement: "***",
    enableStack: true,
    browser: {
        color: true,
        inline: false
    }
};
let $a11effce52aa2bec$var$maskJson = (0, ($parcel$interopDefault($33vPW$maskjson)))([], {
    replacement: $a11effce52aa2bec$var$OPTIONS.maskReplacement
});
let $a11effce52aa2bec$var$PRESENT_EXTERNAL_LOGGER = $a11effce52aa2bec$export$a58c827866c87469;
const $a11effce52aa2bec$export$c6fe4049d20353ac = (options)=>{
    Object.assign($a11effce52aa2bec$var$OPTIONS, options);
    $a11effce52aa2bec$var$maskJson = (0, ($parcel$interopDefault($33vPW$maskjson)))($a11effce52aa2bec$var$OPTIONS.maskTargets, {
        replacement: $a11effce52aa2bec$var$OPTIONS.maskReplacement
    });
};
function $a11effce52aa2bec$export$8f19a62963079f27(logger) {
    $a11effce52aa2bec$var$PRESENT_EXTERNAL_LOGGER = logger;
}
const $a11effce52aa2bec$var$pickExists = (obj)=>{
    return Object.fromEntries(Object.entries(obj).filter(([, v])=>v !== undefined));
};
const $a11effce52aa2bec$var$summarize = (obj)=>{
    // omit stack, level, time, msg from the parameter object
    const { type: type , message: message , stack: stack , err: err , msg: msg , method: method , ...rest } = obj;
    const isErrorMode = type === "Error" && stack || err;
    const finalMsg = (isErrorMode ? msg ?? message ?? err?.message : msg) ?? "";
    const finalParams = {
        ...$a11effce52aa2bec$var$maskJson(rest),
        ...isErrorMode && $a11effce52aa2bec$var$OPTIONS.enableStack ? {
            stack: (stack ?? err?.stack ?? "").split("\n")
        } : $a11effce52aa2bec$var$pickExists({
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
const $a11effce52aa2bec$export$43641a4cf14c61ba = (name)=>(0, ($parcel$interopDefault($33vPW$pino)))({
        name: name,
        level: $a11effce52aa2bec$var$OPTIONS.level,
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
                    ...$a11effce52aa2bec$var$summarize(rest)
                };
            }
        },
        browser: {
            // use Pino's standard serializers
            // https://github.com/pinojs/pino-std-serializers
            serialize: false,
            write: (o)=>{
                const { level: level , time: time , ...rest } = o;
                const { msg: msg , method: method , ...params } = $a11effce52aa2bec$var$summarize(rest);
                const noColor = (s)=>s;
                const LEVEL_TO_COLOR = {
                    debug: $a11effce52aa2bec$var$OPTIONS.browser.color ? (0, ($parcel$interopDefault($33vPW$ansicolors))).gray : noColor,
                    fatal: $a11effce52aa2bec$var$OPTIONS.browser.color ? (0, ($parcel$interopDefault($33vPW$ansicolors))).bgRed.white : noColor,
                    error: $a11effce52aa2bec$var$OPTIONS.browser.color ? (0, ($parcel$interopDefault($33vPW$ansicolors))).red : noColor,
                    warn: $a11effce52aa2bec$var$OPTIONS.browser.color ? (0, ($parcel$interopDefault($33vPW$ansicolors))).yellow : noColor,
                    info: noColor,
                    trace: noColor
                };
                const color = LEVEL_TO_COLOR[(0, ($parcel$interopDefault($33vPW$pino))).levels.labels[`${level}`]];
                // get HH:mm:ss
                const timeLabel = (0, ($parcel$interopDefault($33vPW$dayjs)))(time).format("HH:mm:ss");
                const levelKey = (0, ($parcel$interopDefault($33vPW$pino))).levels.labels[`${level}`];
                const consoleKey = $a11effce52aa2bec$var$LEVEL_TO_CONSOLE[levelKey];
                const levelLabel = $a11effce52aa2bec$var$LEVEL_TO_LABEL[levelKey];
                const _method = method ? `:${method}` : "";
                const s = `${timeLabel} ${levelLabel} [${name}${_method}] ${msg}`;
                if (Object.keys(params).length) {
                    if ($a11effce52aa2bec$var$OPTIONS.browser.inline) console[consoleKey](color(`${s} ${JSON.stringify(params)}`));
                    else console[consoleKey](color(s), params);
                } else console[consoleKey](color(s));
                $a11effce52aa2bec$var$PRESENT_EXTERNAL_LOGGER({
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
