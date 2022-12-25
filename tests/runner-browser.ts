import { output } from './test';

console.log('=== LOG_LEVEL=debug color=true ===');
output('debug', true);
console.log('=== LOG_LEVEL=debug color=false ===');
output('debug', false);

console.log('=== LOG_LEVEL=info color=true ===');
output('info', true);
console.log('=== LOG_LEVEL=info color=false ===');
output('info', false);
