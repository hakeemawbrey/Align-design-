// Bundle the live player into one self-contained HTML page (no module files,
// no local server needed): reels/out/wisdom/player.html
//
//   node reels/wisdom/build-player.mjs
//
// The part between <!--artifact-start--> and <!--artifact-end--> is the page;
// the script tag is swapped for the bundled player.

import { createRequire } from 'node:module'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '../..')
const require = createRequire(path.join(REPO, 'carousel', 'package.json'))
const esbuild = require('esbuild')

const out = await esbuild.build({ entryPoints: [path.join(HERE, 'player.js')], bundle: true, format: 'iife', minify: true, write: false, target: 'es2020', charset: 'utf8' })
const js = out.outputFiles[0].text.replace(/<\/script/gi, '<\\/script')
const html = readFileSync(path.join(HERE, 'player.html'), 'utf8')
const body = html.slice(html.indexOf('<!--artifact-start-->') + 21, html.indexOf('<!--artifact-end-->'))
  .replace('</head>\n<body>\n', '\n')
  .replace('<script type="module" src="player.js"></script>', () => `<script>${js}</script>`)
const dir = path.join(REPO, 'reels/out/wisdom')
mkdirSync(dir, { recursive: true })
writeFileSync(path.join(dir, 'player.html'), body.trim() + '\n')
console.log(`player → ${path.relative(REPO, path.join(dir, 'player.html'))} (${(body.length / 1024).toFixed(0)} KB)`)
