import $fuI5D$pino from "pino";
import $fuI5D$chalk from "chalk";
import $fuI5D$dayjs from "dayjs";




const $f54e6e80c53e998d$export$a58c827866c87469 = ()=>{
};
const $f54e6e80c53e998d$var$DEFAULT_MASK_LENGTH = 8;
const $f54e6e80c53e998d$var$DEFAULT_CHALK_LEVEL = 1;
const $f54e6e80c53e998d$var$LEVEL_TO_CONSOLE = {
    debug: 'debug',
    fatal: 'info',
    error: 'info',
    warn: 'info',
    info: 'info',
    trace: 'info'
};
const $f54e6e80c53e998d$var$LEVEL_TO_LABEL = {
    debug: 'D',
    fatal: 'F',
    error: 'E',
    warn: 'W',
    info: 'I',
    trace: 'I'
};
let $f54e6e80c53e998d$var$chalk = new $fuI5D$chalk.Instance({
    level: $f54e6e80c53e998d$var$DEFAULT_CHALK_LEVEL
});
let $f54e6e80c53e998d$var$PRESENT_EXTERNAL_LOGGER = $f54e6e80c53e998d$export$a58c827866c87469;
const $f54e6e80c53e998d$var$OPTIONS = {
    level: undefined ?? 'debug',
    context: {
    },
    maskTargets: [],
    maskFunc: (s)=>`${s.substring(0, $f54e6e80c53e998d$var$DEFAULT_MASK_LENGTH)}***`
    ,
    enableStack: true,
    browser: {
        inline: false
    }
};
const $f54e6e80c53e998d$export$c6fe4049d20353ac = (options)=>{
    Object.assign($f54e6e80c53e998d$var$OPTIONS, options);
};
function $f54e6e80c53e998d$export$8f19a62963079f27(logger) {
    $f54e6e80c53e998d$var$PRESENT_EXTERNAL_LOGGER = logger;
}
const $f54e6e80c53e998d$export$f928010dd6a36a71 = (level)=>{
    $f54e6e80c53e998d$var$chalk = new $fuI5D$chalk.Instance({
        level: level
    });
};
const $f54e6e80c53e998d$var$serializer = (k, v)=>{
    const isMaskTarget = $f54e6e80c53e998d$var$OPTIONS.maskTargets.findIndex((ele)=>ele === k
    ) >= 0 && (typeof v === 'string' || typeof v === 'number');
    if (isMaskTarget) return $f54e6e80c53e998d$var$OPTIONS.maskFunc(`${v}`);
    else return v;
};
const $f54e6e80c53e998d$var$transform = (obj)=>{
    return Object.fromEntries(Object.entries(obj).map(([k, v])=>[
            k,
            $f54e6e80c53e998d$var$serializer(k, v)
        ]
    ));
};
const $f54e6e80c53e998d$var$pickExists = (obj)=>{
    return Object.fromEntries(Object.entries(obj).filter(([, v])=>v !== undefined
    ));
};
const $f54e6e80c53e998d$var$summarize = (obj)=>{
    // omit stack, level, time, msg from the parameter object
    const { type: type , message: message , stack: stack , err: err , msg: msg , method: method , ...rest } = obj;
    const isErrorMode = type == 'Error' && stack || err;
    const finalMsg = (isErrorMode ? (msg ?? message) ?? err?.message : msg) ?? '';
    const finalParams = {
        ...$f54e6e80c53e998d$var$transform(rest),
        ...isErrorMode && $f54e6e80c53e998d$var$OPTIONS.enableStack ? {
            stack: ((stack ?? err?.stack) ?? '').split('\n')
        } : $f54e6e80c53e998d$var$pickExists({
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
const $f54e6e80c53e998d$export$43641a4cf14c61ba = (name1)=>$fuI5D$pino({
        name: name1,
        level: $f54e6e80c53e998d$var$OPTIONS.level,
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
                    ...$f54e6e80c53e998d$var$summarize(rest)
                };
            }
        },
        browser: {
            // use Pino's standard serializers
            // https://github.com/pinojs/pino-std-serializers
            serialize: false,
            write: (o)=>{
                const { level: level , time: time , ...rest } = o;
                const { msg: msg , method: method , ...params } = $f54e6e80c53e998d$var$summarize(rest);
                const LEVEL_TO_COLOR = {
                    debug: $f54e6e80c53e998d$var$chalk.gray,
                    fatal: $f54e6e80c53e998d$var$chalk.bgRed.white,
                    error: $f54e6e80c53e998d$var$chalk.red,
                    warn: $f54e6e80c53e998d$var$chalk.yellow,
                    info: (s)=>s
                    ,
                    trace: (s)=>s
                };
                const color = LEVEL_TO_COLOR[$fuI5D$pino.levels.labels[`${level}`]];
                // get HH:mm:ss
                const timeLabel = $fuI5D$dayjs(time).format('HH:mm:ss');
                const levelKey = $fuI5D$pino.levels.labels[`${level}`];
                const consoleKey = $f54e6e80c53e998d$var$LEVEL_TO_CONSOLE[levelKey];
                const levelLabel = $f54e6e80c53e998d$var$LEVEL_TO_LABEL[levelKey];
                const _method = method ? `:${method}` : '';
                const s1 = `${timeLabel} ${levelLabel} [${name1}${_method}] ${msg}`;
                if (Object.keys(params).length) {
                    if ($f54e6e80c53e998d$var$OPTIONS.browser.inline) console[consoleKey](color(`${s1} ${JSON.stringify(params)}`));
                    else console[consoleKey](color(s1), params);
                } else console[consoleKey](color(s1));
                $f54e6e80c53e998d$var$PRESENT_EXTERNAL_LOGGER({
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


export {$f54e6e80c53e998d$export$a58c827866c87469 as NO_OPS_LOGGER, $f54e6e80c53e998d$export$c6fe4049d20353ac as updateOptions, $f54e6e80c53e998d$export$8f19a62963079f27 as setExternalLogger, $f54e6e80c53e998d$export$f928010dd6a36a71 as setColorLevel, $f54e6e80c53e998d$export$43641a4cf14c61ba as logFactory};
//# sourceMappingURL=module.js.map
