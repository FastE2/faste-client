import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('public header remains visible at restored scroll positions', async () => {
  const source = await readSource('src/views/layouts/LayoutPublic/components/header/index.tsx');

  assert.match(source, /sticky top-0 z-50 w-full/);
  assert.match(source, /isHeaderVisible \? 'translate-y-0' : '-translate-y-full'/);
});

test('auth initialization does not suppress the application shell', async () => {
  const source = await readSource('src/contexts/AuthContext.tsx');

  assert.doesNotMatch(source, /!loading\s*&&\s*children/);
  assert.match(source, /return children/);
});

test('public routes do not wait for authentication before rendering', async () => {
  const source = await readSource('src/guards/PublicGuard.tsx');

  assert.doesNotMatch(source, /if\s*\(loading\)/);
  assert.match(source, /return <>{children}<\/>/);
});
