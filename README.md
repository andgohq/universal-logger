**This product is deprecated. Please use pino instead.**

# universal-logger

Logger for brower, nodejs and electron.

## Install

```sh
npm install @andgohq/universal-logger
```

## Usage examples

```typescript
import {
  updateOptions
  setExternalLogger,
  logFactory,
} from '@andgohq/universal-logger';

// update options (the below is a default value)
updateOptions({
  // debug, fatal, error, warn, info could be used
  level: 'debug', // LOG_LEVEL environment variable overwrites this
  // this value is appended to the every logs
  context: {},
  // the keys for masking value
  maskTargets: [],
  // mask replacement
  maskReplacement: '***',
  // enable stack trace
  enableStack: true,
  // browser option
  browser: {
    // use color output when color=true
    color: true,
    // show inline logs when inline=true
    inline: false,
  }
})

// usage
const logger = logFactory('Main');

// Support methods:
// - logger.debug -> outputs with gray color (should turn on the verbose flag on dev console to see logs)
// - logger.fatal -> outputs with red error icon and stacktrace
// - logger.error -> outputs with red error icon and stacktrace
// - logger.warn -> outputs with yellow warn icon
// - logger.info -> outputs with regular style

// Optionally you can add a context
// setContext({ user: 'test1@example.com' });

logger.info('Message text');
logger.info({ param1: 'value1', maskedKey: 'sensitive data...' }, 'Message text');
logger.info({ param1: 'value1' }, 'Message Text %s %s', 'REPLACE STRING1', 'REPLACE STRING2');
logger.info({ msg: 'Message text', param1: 'value1', maskedKey: 'sensitive data...' });
logger.error(new Error('Something wrong'), 'optional error message: %2', 'REPLACE STRING');
logger.error({ err: new Error('Something wrong'), msg: 'optional message', param1: 'value1' });


// Child logger
const childLogger = logger.child({ method: 'child' });
childLogger.info('Hello');
```

## Develop

```sh
npm install
npm run dev:web
npm run -s dev:nodejs | jq .

```

## Build

```sh
npm run build
```
