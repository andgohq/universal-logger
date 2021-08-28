var $Y2jCW$pino = require("pino");
var $Y2jCW$datefns = require("date-fns");
var $Y2jCW$datefnslocaleja = require("date-fns/locale/ja");
var $Y2jCW$stacktraceparser = require("stacktrace-parser");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "setMasks", function () { return $72eddd5c956b2791$export$9743ba9d972d3c84; });
$parcel$export(module.exports, "setMaskFunc", function () { return $72eddd5c956b2791$export$5e658725549043b7; });
$parcel$export(module.exports, "setExternalLogger", function () { return $72eddd5c956b2791$export$aaadf1406491db8f; });
$parcel$export(module.exports, "setLogLevel", function () { return $72eddd5c956b2791$export$c8a49597075a01d1; });
$parcel$export(module.exports, "NO_OPS_LOGGER", function () { return $72eddd5c956b2791$export$ad9af676a058916b; });
$parcel$export(module.exports, "setContext", function () { return $72eddd5c956b2791$export$7447501bdd5a114f; });
$parcel$export(module.exports, "logFactory", function () { return $72eddd5c956b2791$export$1815758bd3c8c304; });




const $72eddd5c956b2791$var$options = {
    logLevel: undefined ?? 'debug',
    sharedContext: {
    },
    masks: [],
    maskFunc: (s)=>`${s.substr(0, 8)}***`
};
const $72eddd5c956b2791$var$PINO_TO_CONSOLE = {
    debug: 'debug',
    fatal: 'error',
    error: 'error',
    warn: 'warn',
    info: 'info',
    trace: 'info'
};
const $72eddd5c956b2791$export$ad9af676a058916b = ()=>{
};
let $72eddd5c956b2791$var$_PRESENT_EXTERNAL_LOGGER = $72eddd5c956b2791$export$ad9af676a058916b;
function $72eddd5c956b2791$export$aaadf1406491db8f(logger) {
    $72eddd5c956b2791$var$_PRESENT_EXTERNAL_LOGGER = logger;
}
const $72eddd5c956b2791$export$c8a49597075a01d1 = (logLevel)=>{
    Object.assign($72eddd5c956b2791$var$options, {
        logLevel: logLevel
    });
};
const $72eddd5c956b2791$export$7447501bdd5a114f = (context)=>{
    $72eddd5c956b2791$var$options.sharedContext = context;
};
const $72eddd5c956b2791$export$9743ba9d972d3c84 = (masks)=>{
    $72eddd5c956b2791$var$options.masks = masks;
};
const $72eddd5c956b2791$export$5e658725549043b7 = (f)=>{
    $72eddd5c956b2791$var$options.maskFunc = f;
};
const $72eddd5c956b2791$export$1815758bd3c8c304 = (name)=>$parcel$interopDefault($Y2jCW$pino)({
        name: name,
        level: $72eddd5c956b2791$var$options.logLevel,
        formatters: {
            bindings: ()=>({
                })
            ,
            log: (o)=>Object.fromEntries(Object.entries(o).map(([k, v])=>[
                        k,
                        $72eddd5c956b2791$var$options.masks.findIndex((ele)=>ele === k
                        ) >= 0 && (typeof v === 'string' || typeof v === 'number') ? $72eddd5c956b2791$var$options.maskFunc(`${v}`) : k === 'stack' && typeof v === 'string' ? $Y2jCW$stacktraceparser.parse(v) : v, 
                    ]
                ))
        },
        browser: {
            serialize: true,
            write: (o)=>{
                const { type: type , stack: stack , level: level , time: time , msg: msg , ...rest } = o;
                const timeLabel = $Y2jCW$datefns.format(new Date(time), 'HH:mm:ss', {
                    locale: $parcel$interopDefault($Y2jCW$datefnslocaleja)
                });
                const levelLabel = $72eddd5c956b2791$var$PINO_TO_CONSOLE[$parcel$interopDefault($Y2jCW$pino).levels.labels[`${level}`]];
                const s = `${timeLabel} [${name}] ${msg ?? ''}`;
                const masked = Object.fromEntries(Object.entries(rest).map(([k, v])=>[
                        k,
                        $72eddd5c956b2791$var$options.masks.findIndex((ele)=>ele === k
                        ) >= 0 && (typeof v === 'string' || typeof v === 'number') ? $72eddd5c956b2791$var$options.maskFunc(`${v}`) : k === 'stack' && typeof v === 'string' ? $Y2jCW$stacktraceparser.parse(v) : v, 
                    ]
                ));
                if (Object.keys(masked).length) console[levelLabel](s, masked);
                else console[levelLabel](s);
                $72eddd5c956b2791$var$_PRESENT_EXTERNAL_LOGGER({
                    message: msg ?? '',
                    context: {
                        logger: name,
                        ...masked
                    },
                    status: levelLabel
                });
            }
        }
    })
;


//# sourceMappingURL=index.js.map
