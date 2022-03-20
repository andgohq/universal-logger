var $53U0h$pino = require("pino");
var $53U0h$chalk = require("chalk");

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


const $163cd63d215c95aa$export$a58c827866c87469 = ()=>{
};
const $163cd63d215c95aa$var$DEFAULT_MASK_LENGTH = 8;
const $163cd63d215c95aa$var$DEFAULT_CHALK_LEVEL = 1;
const $163cd63d215c95aa$var$dateTimeFormatter = new Intl.DateTimeFormat('ja-jp', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
});
const $163cd63d215c95aa$var$LEVEL_TO_CONSOLE = {
    debug: 'debug',
    fatal: 'info',
    error: 'info',
    warn: 'warn',
    info: 'info',
    trace: 'info'
};
const $163cd63d215c95aa$var$LEVEL_TO_LABEL = {
    debug: 'D',
    fatal: 'F',
    error: 'E',
    warn: 'W',
    info: 'I',
    trace: 'I'
};
let $163cd63d215c95aa$var$chalk = new ($parcel$interopDefault($53U0h$chalk)).Instance({
    level: $163cd63d215c95aa$var$DEFAULT_CHALK_LEVEL
});
let $163cd63d215c95aa$var$PRESENT_EXTERNAL_LOGGER = $163cd63d215c95aa$export$a58c827866c87469;
const $163cd63d215c95aa$var$OPTIONS = {
    level: undefined ?? 'debug',
    context: {
    },
    maskTargets: [],
    maskFunc: (s)=>`${s.substring(0, $163cd63d215c95aa$var$DEFAULT_MASK_LENGTH)}***`
    ,
    browser: {
        inline: false
    }
};
const $163cd63d215c95aa$export$c6fe4049d20353ac = (options)=>{
    Object.assign($163cd63d215c95aa$var$OPTIONS, options);
};
function $163cd63d215c95aa$export$8f19a62963079f27(logger) {
    $163cd63d215c95aa$var$PRESENT_EXTERNAL_LOGGER = logger;
}
const $163cd63d215c95aa$export$f928010dd6a36a71 = (level)=>{
    $163cd63d215c95aa$var$chalk = new ($parcel$interopDefault($53U0h$chalk)).Instance({
        level: level
    });
};
const $163cd63d215c95aa$var$serializer = (k, v)=>{
    const isMaskTarget = $163cd63d215c95aa$var$OPTIONS.maskTargets.findIndex((ele)=>ele === k
    ) >= 0 && (typeof v === 'string' || typeof v === 'number');
    if (isMaskTarget) return $163cd63d215c95aa$var$OPTIONS.maskFunc(`${v}`);
    else return v;
};
const $163cd63d215c95aa$var$transform = (obj)=>{
    return Object.fromEntries(Object.entries(obj).map(([k, v])=>[
            k,
            $163cd63d215c95aa$var$serializer(k, v)
        ]
    ));
};
const $163cd63d215c95aa$var$pickExists = (obj)=>{
    return Object.fromEntries(Object.entries(obj).filter(([, v])=>v !== undefined
    ));
};
const $163cd63d215c95aa$var$summarize = (obj)=>{
    // omit stack, level, time, msg from the parameter object
    const { type: type , message: message , stack: stack , err: err , msg: msg , ...rest } = obj;
    const isErrorMode = type == 'Error' && stack || err;
    const finalMsg = (isErrorMode ? (msg ?? message) ?? err?.message : msg) ?? '';
    const finalParams = {
        ...$163cd63d215c95aa$var$transform(rest),
        ...isErrorMode ? {
            stack: ((stack ?? err?.stack) ?? '').split('\n')
        } : $163cd63d215c95aa$var$pickExists({
            type: type,
            message: message,
            stack: stack
        })
    };
    return {
        msg: finalMsg,
        ...finalParams
    };
};
const $163cd63d215c95aa$export$43641a4cf14c61ba = (name1)=>($parcel$interopDefault($53U0h$pino))({
        name: name1,
        level: $163cd63d215c95aa$var$OPTIONS.level,
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
                const { msg: msg , ...params } = $163cd63d215c95aa$var$summarize(rest);
                const LEVEL_TO_COLOR = {
                    debug: $163cd63d215c95aa$var$chalk.gray,
                    fatal: $163cd63d215c95aa$var$chalk.bgRed.white,
                    error: $163cd63d215c95aa$var$chalk.red,
                    warn: $163cd63d215c95aa$var$chalk.yellow,
                    info: (s)=>s
                    ,
                    trace: (s)=>s
                };
                const color = LEVEL_TO_COLOR[($parcel$interopDefault($53U0h$pino)).levels.labels[`${level}`]];
                const timeLabel = $163cd63d215c95aa$var$dateTimeFormatter.format(time);
                const levelKey = ($parcel$interopDefault($53U0h$pino)).levels.labels[`${level}`];
                const consoleKey = $163cd63d215c95aa$var$LEVEL_TO_CONSOLE[levelKey];
                const levelLabel = $163cd63d215c95aa$var$LEVEL_TO_LABEL[levelKey];
                const s1 = `${timeLabel} ${levelLabel} [${name1}] ${msg}`;
                if (Object.keys(params).length) {
                    if ($163cd63d215c95aa$var$OPTIONS.browser.inline) console[consoleKey](color(`${s1} ${JSON.stringify(params)}`));
                    else console[consoleKey](color(s1), params);
                } else console[consoleKey](color(s1));
                $163cd63d215c95aa$var$PRESENT_EXTERNAL_LOGGER({
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


//# sourceMappingURL=main.js.map
