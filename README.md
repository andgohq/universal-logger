# andgo-logger

Logger for brower, nodejs and electron.

## Setup

Place `.npmrc` file below on the project root

```plain
registry=https://npm.pkg.github.com/andgohq
```

Place `~/.npmrc` file below on the user home

```plain
//npm.pkg.github.com/:_authToken=[GITHUB PERSONAL TOKEN]
@andgohq:registry=https://npm.pkg.github.com/
```

Install package

```sh
npm install @andgohq/andgo-logger
```

## Usage

```typescript
import { setLogLevel, initDatadog, logFactory } from 'andgo-logger';

setLogLevel('develop');

// optionally you can setup Datadog integration
initDatadog({ clientToken: '', applicationId: '' });

const logger = logFactory('Main');

// Support methods
// - logger.fatal -> outputs with red error icon and stacktrace
// - logger.error -> outputs with red error icon and stacktrace
// - logger.warn -> outputs with yellow warn icon
// - logger.info -> outputs with regular style
// - logger.debug -> hidden outputs (should turn on the verbose flag on dev console to see logs)

// Support usage
logger.info('Hello world');
logger.info({ param1: 'value1' }, 'Hello world');
logger.info({ param1: 'value1' }, 'Hello world %s %s', 'REPLACE STRING1', 'REPLACE STRING2');
logger.error(new Error('Something wrong'), 'optional error message: %2', 'REPLACE STRING');

```

## Develop

```sh
npm install
npm start

```

## Build & Publish

```sh
# windows binary on mac/linux
npm run build:win
# mac binary
npm run build:mac

# publish
npm publish
```
