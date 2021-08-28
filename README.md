# universal-logger

Logger for brower, nodejs and electron.

## Install

```sh
npm install @andgohq/universal-logger
```

## Usage examples

```typescript
import { setLogLevel, initDatadog, logFactory, setContext, setMasks, setMaskFunc } from '@andgohq/universal-logger';

// Set output log level (default: LOG_LEVEL environment variable or 'debug')
// log level: debug, fata, error, warn, info
setLogLevel('info');

// Set mask keys for sensitive data
setMasks(['maskedKey']);

// Set mask function
setMaskFunc((s: string) => `${s.substr(0.8)}***`);

// Logger usage
const logger = logFactory('Main');

// Support methods:
// - logger.debug -> hidden outputs (should turn on the verbose flag on dev console to see logs)
// - logger.fatal -> outputs with red error icon and stacktrace
// - logger.error -> outputs with red error icon and stacktrace
// - logger.warn -> outputs with yellow warn icon
// - logger.info -> outputs with regular style

// Optionally you can add a context
// setContext({ user: 'test1@example.com' });

logger.info('Message text');
logger.info({ param1: 'value1', maskedKey: 'sensitive data...' }, 'Message text');
logger.info({ param1: 'value1' }, 'Message Text %s %s', 'REPLACE STRING1', 'REPLACE STRING2');
logger.error(new Error('Something wrong'), 'optional error message: %2', 'REPLACE STRING');
```

## Develop

```sh
npm install
npm run dev
npm run -s dev:nodejs | jq .

```

## Build

```sh
npm run build
```
