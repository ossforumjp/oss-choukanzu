#!/usr/bin/env node
/*
 * data/landscape.csv に載っているOSS名を Simple Icons と突き合わせ、
 * 必要なロゴだけを assets/icons.svg（スプライト）と
 * assets/icons.json（名称 → スラッグ・ブランド色）に書き出す。
 *
 *   npm install
 *   node tools/build-icons.mjs
 *
 * 外部CDNを使わずロゴを表示するための仕組みなので、
 * CSVにOSSを追加したあとに実行すると新しいロゴが取り込まれる。
 * 突き合わせに失敗したOSSは丸印で表示されるだけで、エラーにはならない。
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

/* simple-icons は package.json の exports で data/ と icons/ を隠しているため、
   パッケージのルートを解決してファイルとして読む。 */
let siData, iconDir;
try {
  const pkgRoot = dirname(require.resolve('simple-icons'));
  siData = JSON.parse(readFileSync(join(pkgRoot, 'data', 'simple-icons.json'), 'utf8'));
  iconDir = join(pkgRoot, 'icons');
  if (!existsSync(iconDir)) throw new Error('icons ディレクトリがありません');
} catch (err) {
  console.error('simple-icons を読めませんでした:', err.message);
  console.error('リポジトリのルートで `npm install` を実行してください。');
  process.exit(1);
}

/* 名称の表記ゆれを吸収するための手動対応表。
   Simple Icons 側の名前が実際のプロダクト名と違うものだけを書く。
   null を指定すると、同名の別プロダクトのロゴが付くのを防いで丸印にする。 */
const ALIASES = {
  // 同名の別プロダクト。Simple Icons 側はスポーツ用品ブランドとコードレビューSaaS
  'Puma': null,
  'Graphite': null,

  'Apache NetBeans': 'apachenetbeanside',
  'Eclipse': 'eclipseide',
  'Jetty': 'eclipsejetty',
  'Mosquitto': 'eclipsemosquitto',
  'GnuPG': 'gnuprivacyguard',
  'JUnit': 'junit5',
  'Jupyter Notebook': 'jupyter',
  'Proxmox VE': 'proxmox',
  'Tor': 'torproject',
  'Traefik': 'traefikproxy',
  'Xorg': 'xdotorg',
  'Argo CD': 'argo',
  'Argo Workflows': 'argo',
  'Envoy': 'envoyproxy',
  'NATS': 'natsdotio',
  'OWASP ZAP': 'zap',
  'Pulmi': 'pulumi',
  'CloudFoundry': 'cloudfoundry',
  'CloudFoundry BOSH': 'cloudfoundry'
};

const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const bySlug = new Map(siData.map(e => [e.slug, e]));
const byName = new Map();
for (const e of siData) {
  for (const key of [e.title, e.slug, ...(e.aliases?.aka ?? [])]) {
    if (!byName.has(norm(key))) byName.set(norm(key), e);
  }
}

/* 「Apache Kafka」「Go (Golang)」のように装飾がついた名前を段階的に削って探す */
function candidates(name) {
  const out = [name];
  const bare = name.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  if (bare !== name) out.push(bare);
  for (const s of [...out]) {
    for (const prefix of ['Apache ', 'GNU ', 'The ']) {
      if (s.startsWith(prefix)) out.push(s.slice(prefix.length));
    }
  }
  for (const s of [...out]) {
    const trimmed = s.replace(/\s+(Core|Server|CORE|Framework|Open Source Edition|CMS|ERP - CRM|Portal|Studio|Tool)$/, '').trim();
    if (trimmed && trimmed !== s) out.push(trimmed);
  }
  return out;
}

/* 引用符つきCSVを読む（名称列しか使わないので最小限） */
function parseCSV(text) {
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false; }
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  const head = rows[0].map(h => h.trim());
  return rows.slice(1).filter(r => r.some(v => v.trim())).map(r =>
    Object.fromEntries(head.map((h, i) => [h, (r[i] ?? '').trim()])));
}

const csvPath = join(root, 'data', 'landscape.csv');
if (!existsSync(csvPath)) {
  console.error(`${csvPath} がありません。`);
  process.exit(1);
}

const records = parseCSV(readFileSync(csvPath, 'utf8'));
const names = [...new Set(records.map(r => r['名称']).filter(Boolean))].sort();

const map = {};
const missed = [];
for (const name of names) {
  const explicit = records.find(r => r['名称'] === name && r['アイコン'])?.['アイコン'];
  let entry = explicit ? bySlug.get(explicit.trim()) : null;
  if (!entry && name in ALIASES) {
    if (ALIASES[name] === null) { missed.push(name); continue; }
    entry = bySlug.get(ALIASES[name]);
  }
  if (!entry) {
    for (const c of candidates(name)) {
      entry = byName.get(norm(c));
      if (entry) break;
    }
  }
  if (entry) map[name] = { slug: entry.slug, hex: entry.hex };
  else missed.push(name);
}

const slugs = [...new Set(Object.values(map).map(v => v.slug))].sort();
const symbols = slugs.map(slug => {
  const svg = readFileSync(join(iconDir, `${slug}.svg`), 'utf8');
  const d = svg.match(/<path[^>]*\sd="([^"]+)"/)[1];
  return `<symbol id="i-${slug}" viewBox="0 0 24 24"><path d="${d}"/></symbol>`;
});

writeFileSync(join(root, 'assets', 'icons.svg'),
  ['<svg xmlns="http://www.w3.org/2000/svg" style="display:none">', ...symbols, '</svg>', ''].join('\n'));
writeFileSync(join(root, 'assets', 'icons.json'),
  JSON.stringify(map, null, 0) + '\n');

console.log(`ロゴあり ${Object.keys(map).length} 件 / 全 ${names.length} 件（シンボル ${slugs.length} 個）`);
if (missed.length) console.log(`ロゴなし（丸印で表示）: ${missed.length} 件`);
