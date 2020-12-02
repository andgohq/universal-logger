# andgo-logger

Logger for brower, nodejs and electron.


## Usage

```typescript
import { setLogLevel, initDatadog, logFactory } from 'andgo-logger';

setLogLevel('develop');

// optionally you can setup Datadog integration
initDatadog({ clientToken: '', applicationId: '' });


const logger = logFactory('Main');

logger.log('Hello world');

logger.error(new Error('Something wrong'), 'optional error message', { param1: 'value1' });

```
