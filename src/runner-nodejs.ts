import { output } from './test';

console.log('=== DEBUG LEVEL ===');
output('debug', false);

console.log('=== INFO LEVEL ===');
output('info', false);

console.log('=== DEBUG LEVEL ===');
output('debug', true);

console.log('=== INFO LEVEL ===');
output('info', true);
