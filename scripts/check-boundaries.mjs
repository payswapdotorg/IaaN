import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.cwd();
const rules = [
  { source: /packages\/kernel\//, forbidden: /(?:packages\/adapters|packages\/persistence|packages\/protocol|apps\/)/, label: 'kernel may not depend on runtime/integration/application packages' },
  { source: /packages\/protocol\//, forbidden: /packages\/infrastructure|packages\/adapters/, label: 'protocol may not import infrastructure or adapters' },
  { source: /packages\/infrastructure\//, forbidden: /packages\/protocol/, label: 'infrastructure may not import protocol' },
  { source: /packages\/contracts\//, forbidden: /packages\/(?:kernel|protocol|infrastructure|orchestration|adapters|persistence|asset-runtime|verification|economics)|apps\//, label: 'contracts must remain dependency-light' },
  { source: /apps\/web\//, forbidden: /packages\/persistence|packages\/protocol\/src\/internal|packages\/infrastructure\/src\/internal/, label: 'web may not bypass application boundaries' },
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(path));
    else if (/\.(ts|tsx|mts|cts|js|mjs)$/.test(entry.name)) out.push(path);
  }
  return out;
}

const files = await walk(join(root, 'packages')).catch(() => []);
files.push(...await walk(join(root, 'apps')).catch(() => []));
const violations = [];

for (const file of files) {
  const sourcePath = relative(root, file).replaceAll('\\', '/');
  const text = await readFile(file, 'utf8');
  for (const rule of rules) {
    if (!rule.source.test(sourcePath)) continue;
    if (rule.forbidden.test(text)) violations.push(`${sourcePath}: ${rule.label}`);
  }
}

if (violations.length) {
  console.error('Architecture boundary violations:');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`Architecture boundary check passed (${files.length} source files scanned).`);
