import { cp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const built = 'dist/app.html';
if (!existsSync(built)) {
  console.error(`Build output not found at ${built}. Run "npm run build" first.`);
  process.exit(1);
}

await rm('assets', { recursive: true, force: true });
await cp('dist/assets', 'assets', { recursive: true });
await cp(built, 'index.html');
console.log('Published runnable entry: index.html + assets/');
