# universal-logger

Logger for brower, nodejs and electron.

## Install

```sh
npm install @andgohq/universal-logger
```

## Usage

```typescript
import { setLogLevel, initDatadog, logFactory, setContext, setMasks, setMaskFunc } from '@andgohq/universal-logger';

// Set output log level (default: LOG_LEVEL environment variable or 'develop')
setLogLevel('develop');


setMasks(['maskedKey']);

setMaskFunc((s: string) => `${s.substr(0.8)}***`);

// Optionally you can setup Datadog integration
// initDatadog({ clientToken: DATADOG_CLIENT_TOKEN, applicationId: APPLICATION_ID });

const logger = logFactory('Main');

// Support methods
// - logger.fatal -> outputs with red error icon and stacktrace
// - logger.error -> outputs with red error icon and stacktrace
// - logger.warn -> outputs with yellow warn icon
// - logger.info -> outputs with regular style
// - logger.debug -> hidden outputs (should turn on the verbose flag on dev console to see logs)

// Optionally you can add context
// setContext({ user: 'test1@example.com' });

// Support usage
logger.info('Hello world');
logger.info({ param1: 'value1', maskedKey: 'sensitive data...' }, 'Hello world');
logger.info({ param1: 'value1' }, 'Hello world %s %s', 'REPLACE STRING1', 'REPLACE STRING2');
logger.error(new Error('Something wrong'), 'optional error message: %2', 'REPLACE STRING');

```

## Pretty

In nodejs environment, prettyPrint can be used.

```sh
npm install pino-pretty
```

```typescript
setLogLevel('develop', true);
```

## Develop

```sh
npm install
npm run dev
npm run dev:nodejs

```

## Build

```sh
npm run build
```
