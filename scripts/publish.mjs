import { cp, rm, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const built = 'dist/app.html';

if (!existsSync(built)) {
  console.error(`Build output not found at ${built}. Run "npm run build" first.`);
  process.exit(1);
}

// Rename app.html to index.html INSIDE dist
await rename(built, 'dist/index.html');

console.log('Published runnable entry: dist/index.html + assets/');
