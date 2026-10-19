// Builds the Carousel Studio: one self-contained HTML page with the phrase
// bank and the 12 hand-written examples baked in.
//   node app/build.mjs   ->  app/dist/studio.html

import { build } from 'esbuild'
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(here, '..')

const bundle = await build({
  stdin: {
    contents: `export { generateBankOne, THEMES, ARCS } from './src/bank.mjs'
export { SIGNS, SIGN_COLORS, CORE, LIMITS, validate } from './src/schema.mjs'`,
    resolveDir: root,
    loader: 'js',
  },
  bundle: true, format: 'iife', globalName: 'AlignBank', minify: true, write: false,
})

// The studio draws its own backgrounds, so the examples only need their words.
const examples = readdirSync(path.join(root, 'content'))
  .filter((f) => /^\d\d-.*\.json$/.test(f)).sort()
  .map((f) => {
    const c = JSON.parse(readFileSync(path.join(root, 'content', f), 'utf8'))
    return { ...c, slides: c.slides.map(({ text }) => ({ text })) }
  })

const html = readFileSync(path.join(here, 'studio.template.html'), 'utf8')
  .replace('/*BANK*/', () => bundle.outputFiles[0].text)
  .replace('/*EXAMPLES*/', () => JSON.stringify(examples))

mkdirSync(path.join(here, 'dist'), { recursive: true })
writeFileSync(path.join(here, 'dist', 'studio.html'), html)
console.log(`app/dist/studio.html  ${(html.length / 1024).toFixed(0)} KB, ${examples.length} examples`)
