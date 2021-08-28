import $6Xyho$pino from "pino";
import {format as $6Xyho$format} from "date-fns";
import $6Xyho$datefnslocaleja from "date-fns/locale/ja";
import {parse as $6Xyho$parse} from "stacktrace-parser";





const $53a9eefb35e8ba3a$var$options = {
    logLevel: undefined ?? 'debug',
    sharedContext: {
    },
    masks: [],
    maskFunc: (s)=>`${s.substr(0, 8)}***`
};
const $53a9eefb35e8ba3a$var$PINO_TO_CONSOLE = {
    debug: 'debug',
    fatal: 'error',
    error: 'error',
    warn: 'warn',
    info: 'info',
    trace: 'info'
};
const $53a9eefb35e8ba3a$export$ad9af676a058916b = ()=>{
};
let $53a9eefb35e8ba3a$var$_PRESENT_EXTERNAL_LOGGER = $53a9eefb35e8ba3a$export$ad9af676a058916b;
function $53a9eefb35e8ba3a$export$aaadf1406491db8f(logger) {
    $53a9eefb35e8ba3a$var$_PRESENT_EXTERNAL_LOGGER = logger;
}
const $53a9eefb35e8ba3a$export$c8a49597075a01d1 = (logLevel)=>{
    Object.assign($53a9eefb35e8ba3a$var$options, {
        logLevel: logLevel
    });
};
const $53a9eefb35e8ba3a$export$7447501bdd5a114f = (context)=>{
    $53a9eefb35e8ba3a$var$options.sharedContext = context;
};
const $53a9eefb35e8ba3a$export$9743ba9d972d3c84 = (masks)=>{
    $53a9eefb35e8ba3a$var$options.masks = masks;
};
const $53a9eefb35e8ba3a$export$5e658725549043b7 = (f)=>{
    $53a9eefb35e8ba3a$var$options.maskFunc = f;
};
const $53a9eefb35e8ba3a$export$1815758bd3c8c304 = (name)=>$6Xyho$pino({
        name: name,
        level: $53a9eefb35e8ba3a$var$options.logLevel,
        formatters: {
            bindings: ()=>({
                })
            ,
            log: (o)=>Object.fromEntries(Object.entries(o).map(([k, v])=>[
                        k,
                        $53a9eefb35e8ba3a$var$options.masks.findIndex((ele)=>ele === k
                        ) >= 0 && (typeof v === 'string' || typeof v === 'number') ? $53a9eefb35e8ba3a$var$options.maskFunc(`${v}`) : k === 'stack' && typeof v === 'string' ? $6Xyho$parse(v) : v, 
                    ]
                ))
        },
        browser: {
            serialize: true,
            write: (o)=>{
                const { type: type , stack: stack , level: level , time: time , msg: msg , ...rest } = o;
                const timeLabel = $6Xyho$format(new Date(time), 'HH:mm:ss', {
                    locale: $6Xyho$datefnslocaleja
                });
                const levelLabel = $53a9eefb35e8ba3a$var$PINO_TO_CONSOLE[$6Xyho$pino.levels.labels[`${level}`]];
                const s = `${timeLabel} [${name}] ${msg ?? ''}`;
                const masked = Object.fromEntries(Object.entries(rest).map(([k, v])=>[
                        k,
                        $53a9eefb35e8ba3a$var$options.masks.findIndex((ele)=>ele === k
                        ) >= 0 && (typeof v === 'string' || typeof v === 'number') ? $53a9eefb35e8ba3a$var$options.maskFunc(`${v}`) : k === 'stack' && typeof v === 'string' ? $6Xyho$parse(v) : v, 
                    ]
                ));
                if (Object.keys(masked).length) console[levelLabel](s, masked);
                else console[levelLabel](s);
                $53a9eefb35e8ba3a$var$_PRESENT_EXTERNAL_LOGGER({
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


export {$53a9eefb35e8ba3a$export$9743ba9d972d3c84 as setMasks, $53a9eefb35e8ba3a$export$5e658725549043b7 as setMaskFunc, $53a9eefb35e8ba3a$export$1815758bd3c8c304 as logFactory, $53a9eefb35e8ba3a$export$ad9af676a058916b as NO_OPS_LOGGER, $53a9eefb35e8ba3a$export$aaadf1406491db8f as setExternalLogger, $53a9eefb35e8ba3a$export$c8a49597075a01d1 as setLogLevel, $53a9eefb35e8ba3a$export$7447501bdd5a114f as setContext};
//# sourceMappingURL=index.js.map
