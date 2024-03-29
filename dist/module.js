import $2RCvR$pino from "pino";
import $2RCvR$ansicolors from "ansi-colors";
import $2RCvR$dayjs from "dayjs";
import $2RCvR$maskjson from "mask-json";





const $8348e366130e695f$export$a58c827866c87469 = ()=>{};
const $8348e366130e695f$var$LEVEL_TO_CONSOLE = {
    debug: "debug",
    fatal: "info",
    error: "info",
    warn: "info",
    info: "info",
    trace: "info"
};
const $8348e366130e695f$var$LEVEL_TO_LABEL = {
    debug: "D",
    fatal: "F",
    error: "E",
    warn: "W",
    info: "I",
    trace: "I"
};
const $8348e366130e695f$var$OPTIONS = {
    level: undefined !== null && undefined !== void 0 ? undefined : "debug",
    context: {},
    maskTargets: [],
    maskReplacement: "***",
    enableStack: true,
    browser: {
        color: true,
        inline: false
    }
};
let $8348e366130e695f$var$maskJson = (0, $2RCvR$maskjson)([], {
    replacement: $8348e366130e695f$var$OPTIONS.maskReplacement
});
let $8348e366130e695f$var$PRESENT_EXTERNAL_LOGGER = $8348e366130e695f$export$a58c827866c87469;
const $8348e366130e695f$export$c6fe4049d20353ac = (options)=>{
    Object.assign($8348e366130e695f$var$OPTIONS, options);
    $8348e366130e695f$var$maskJson = (0, $2RCvR$maskjson)($8348e366130e695f$var$OPTIONS.maskTargets, {
        replacement: $8348e366130e695f$var$OPTIONS.maskReplacement
    });
};
function $8348e366130e695f$export$8f19a62963079f27(logger) {
    $8348e366130e695f$var$PRESENT_EXTERNAL_LOGGER = logger;
}
const $8348e366130e695f$var$pickExists = (obj)=>{
    return Object.fromEntries(Object.entries(obj).filter(([, v])=>v !== undefined));
};
const $8348e366130e695f$var$summarize = (obj)=>{
    // omit stack, level, time, msg from the parameter object
    const { type: type , message: message , stack: stack , err: err , msg: msg , method: method , ...rest } = obj;
    const isErrorMode = type === "Error" && stack || err;
    var _ref, _ref1;
    const finalMsg = (_ref1 = isErrorMode ? (_ref = msg !== null && msg !== void 0 ? msg : message) !== null && _ref !== void 0 ? _ref : err === null || err === void 0 ? void 0 : err.message : msg) !== null && _ref1 !== void 0 ? _ref1 : "";
    var _ref2;
    const finalParams = {
        ...$8348e366130e695f$var$maskJson(rest),
        ...isErrorMode && $8348e366130e695f$var$OPTIONS.enableStack ? {
            stack: ((_ref2 = stack !== null && stack !== void 0 ? stack : err === null || err === void 0 ? void 0 : err.stack) !== null && _ref2 !== void 0 ? _ref2 : "").split("\n")
        } : $8348e366130e695f$var$pickExists({
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
const $8348e366130e695f$export$43641a4cf14c61ba = (name)=>(0, $2RCvR$pino)({
        name: name,
        level: $8348e366130e695f$var$OPTIONS.level,
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
                    ...$8348e366130e695f$var$summarize(rest)
                };
            }
        },
        browser: {
            // use Pino's standard serializers
            // https://github.com/pinojs/pino-std-serializers
            serialize: false,
            write: (o)=>{
                const { level: level , time: time , ...rest } = o;
                const { msg: msg , method: method , ...params } = $8348e366130e695f$var$summarize(rest);
                const noColor = (s)=>s;
                const LEVEL_TO_COLOR = {
                    debug: $8348e366130e695f$var$OPTIONS.browser.color ? (0, $2RCvR$ansicolors).gray : noColor,
                    fatal: $8348e366130e695f$var$OPTIONS.browser.color ? (0, $2RCvR$ansicolors).bgRed.white : noColor,
                    error: $8348e366130e695f$var$OPTIONS.browser.color ? (0, $2RCvR$ansicolors).red : noColor,
                    warn: $8348e366130e695f$var$OPTIONS.browser.color ? (0, $2RCvR$ansicolors).yellow : noColor,
                    info: noColor,
                    trace: noColor
                };
                const color = LEVEL_TO_COLOR[(0, $2RCvR$pino).levels.labels[`${level}`]];
                // get HH:mm:ss
                const timeLabel = (0, $2RCvR$dayjs)(time).format("HH:mm:ss");
                const levelKey = (0, $2RCvR$pino).levels.labels[`${level}`];
                const consoleKey = $8348e366130e695f$var$LEVEL_TO_CONSOLE[levelKey];
                const levelLabel = $8348e366130e695f$var$LEVEL_TO_LABEL[levelKey];
                const _method = method ? `:${method}` : "";
                const s = `${timeLabel} ${levelLabel} [${name}${_method}] ${msg}`;
                if (Object.keys(params).length) {
                    if ($8348e366130e695f$var$OPTIONS.browser.inline) console[consoleKey](color(`${s} ${JSON.stringify(params)}`));
                    else console[consoleKey](color(s), params);
                } else console[consoleKey](color(s));
                $8348e366130e695f$var$PRESENT_EXTERNAL_LOGGER({
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


export {$8348e366130e695f$export$a58c827866c87469 as NO_OPS_LOGGER, $8348e366130e695f$export$c6fe4049d20353ac as updateOptions, $8348e366130e695f$export$8f19a62963079f27 as setExternalLogger, $8348e366130e695f$export$43641a4cf14c61ba as logFactory};
//# sourceMappingURL=module.js.map
