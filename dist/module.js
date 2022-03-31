import $2RCvR$pino from "pino";
import $2RCvR$chalk from "chalk";
import $2RCvR$dayjs from "dayjs";




const $8348e366130e695f$export$a58c827866c87469 = ()=>{};
const $8348e366130e695f$var$DEFAULT_MASK_LENGTH = 8;
const $8348e366130e695f$var$DEFAULT_CHALK_LEVEL = 1;
const $8348e366130e695f$var$LEVEL_TO_CONSOLE = {
    debug: 'debug',
    fatal: 'info',
    error: 'info',
    warn: 'info',
    info: 'info',
    trace: 'info'
};
const $8348e366130e695f$var$LEVEL_TO_LABEL = {
    debug: 'D',
    fatal: 'F',
    error: 'E',
    warn: 'W',
    info: 'I',
    trace: 'I'
};
let $8348e366130e695f$var$chalk = new $2RCvR$chalk.Instance({
    level: $8348e366130e695f$var$DEFAULT_CHALK_LEVEL
});
let $8348e366130e695f$var$PRESENT_EXTERNAL_LOGGER = $8348e366130e695f$export$a58c827866c87469;
const $8348e366130e695f$var$OPTIONS = {
    level: undefined !== null && undefined !== void 0 ? undefined : 'debug',
    context: {},
    maskTargets: [],
    maskFunc: (s)=>`${s.substring(0, $8348e366130e695f$var$DEFAULT_MASK_LENGTH)}***`
    ,
    enableStack: true,
    browser: {
        inline: false
    }
};
const $8348e366130e695f$export$c6fe4049d20353ac = (options)=>{
    Object.assign($8348e366130e695f$var$OPTIONS, options);
};
function $8348e366130e695f$export$8f19a62963079f27(logger) {
    $8348e366130e695f$var$PRESENT_EXTERNAL_LOGGER = logger;
}
const $8348e366130e695f$export$f928010dd6a36a71 = (level)=>{
    $8348e366130e695f$var$chalk = new $2RCvR$chalk.Instance({
        level: level
    });
};
const $8348e366130e695f$var$serializer = (k, v)=>{
    const isMaskTarget = $8348e366130e695f$var$OPTIONS.maskTargets.findIndex((ele)=>ele === k
    ) >= 0 && (typeof v === 'string' || typeof v === 'number');
    if (isMaskTarget) return $8348e366130e695f$var$OPTIONS.maskFunc(`${v}`);
    else return v;
};
const $8348e366130e695f$var$transform = (obj)=>{
    return Object.fromEntries(Object.entries(obj).map(([k, v])=>[
            k,
            $8348e366130e695f$var$serializer(k, v)
        ]
    ));
};
const $8348e366130e695f$var$pickExists = (obj)=>{
    return Object.fromEntries(Object.entries(obj).filter(([, v])=>v !== undefined
    ));
};
const $8348e366130e695f$var$summarize = (obj)=>{
    // omit stack, level, time, msg from the parameter object
    const { type: type , message: message , stack: stack , err: err , msg: msg , method: method , ...rest } = obj;
    const isErrorMode = type == 'Error' && stack || err;
    var ref, ref1;
    const finalMsg = (ref1 = isErrorMode ? (ref = msg !== null && msg !== void 0 ? msg : message) !== null && ref !== void 0 ? ref : err === null || err === void 0 ? void 0 : err.message : msg) !== null && ref1 !== void 0 ? ref1 : '';
    var ref2;
    const finalParams = {
        ...$8348e366130e695f$var$transform(rest),
        ...isErrorMode && $8348e366130e695f$var$OPTIONS.enableStack ? {
            stack: ((ref2 = stack !== null && stack !== void 0 ? stack : err === null || err === void 0 ? void 0 : err.stack) !== null && ref2 !== void 0 ? ref2 : '').split('\n')
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
const $8348e366130e695f$export$43641a4cf14c61ba = (name1)=>$2RCvR$pino({
        name: name1,
        level: $8348e366130e695f$var$OPTIONS.level,
        formatters: {
            // omit pid and hostname
            bindings: ({ name: name  })=>({
                    name: name
                })
            ,
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
                const LEVEL_TO_COLOR = {
                    debug: $8348e366130e695f$var$chalk.gray,
                    fatal: $8348e366130e695f$var$chalk.bgRed.white,
                    error: $8348e366130e695f$var$chalk.red,
                    warn: $8348e366130e695f$var$chalk.yellow,
                    info: (s)=>s
                    ,
                    trace: (s)=>s
                };
                const color = LEVEL_TO_COLOR[$2RCvR$pino.levels.labels[`${level}`]];
                // get HH:mm:ss
                const timeLabel = $2RCvR$dayjs(time).format('HH:mm:ss');
                const levelKey = $2RCvR$pino.levels.labels[`${level}`];
                const consoleKey = $8348e366130e695f$var$LEVEL_TO_CONSOLE[levelKey];
                const levelLabel = $8348e366130e695f$var$LEVEL_TO_LABEL[levelKey];
                const _method = method ? `:${method}` : '';
                const s1 = `${timeLabel} ${levelLabel} [${name1}${_method}] ${msg}`;
                if (Object.keys(params).length) {
                    if ($8348e366130e695f$var$OPTIONS.browser.inline) console[consoleKey](color(`${s1} ${JSON.stringify(params)}`));
                    else console[consoleKey](color(s1), params);
                } else console[consoleKey](color(s1));
                $8348e366130e695f$var$PRESENT_EXTERNAL_LOGGER({
                    message: msg || '',
                    context: {
                        logger: name1,
                        ...params
                    },
                    status: consoleKey
                });
            }
        }
    })
;


export {$8348e366130e695f$export$a58c827866c87469 as NO_OPS_LOGGER, $8348e366130e695f$export$c6fe4049d20353ac as updateOptions, $8348e366130e695f$export$8f19a62963079f27 as setExternalLogger, $8348e366130e695f$export$f928010dd6a36a71 as setColorLevel, $8348e366130e695f$export$43641a4cf14c61ba as logFactory};
//# sourceMappingURL=module.js.map
