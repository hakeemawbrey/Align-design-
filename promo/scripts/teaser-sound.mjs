// node promo/scripts/teaser-sound.mjs --teaser=01-blind   → promo/out/teasers/01-blind.wav
// Builds the teaser's score from its exported `music` and `cues`, plus the shared end-tag sounds.
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createMix } from './synth.mjs'
const here = path.dirname(fileURLToPath(import.meta.url))
const id = (process.argv.find(a => a.startsWith('--teaser=')) || '').split('=')[1]
if (!id) { console.error('usage: --teaser=<id>'); process.exit(1) }
const T = (await import(`../teasers/t${id}.js`)).default
const m = createMix(T.duration)
const music = T.music || {}
m.pad(music.chords || [[0, T.duration, [146.83, 220, 329.63, 369.99, 554.37]]], music.padGain ?? 0.022)
if (music.bpm) m.pulse(music.beatFrom ?? 0.5, music.beatTo ?? T.duration - 2.5, music.bpm, music.pulseGain ?? 0.26)
for (const [kind, ...a] of T.cues || []) m[kind](...a)
// shared end tag (see kit.endTag): rings, chakra chimes, wordmark, moon row
if (T.endTagAt != null) {
  const s = T.endTagAt
  m.whoosh(s + 0.1, 0.5, 0.08)
  ;[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].forEach((f, i) => m.bell(s + 0.35 + i * 0.06, f, 0.06, 2.2, (i - 3) * 0.12))
  ;[261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99].forEach((f, i) => m.bell(s + 1.1 + i * 0.06, f, 0.02, 1.2, (i - 4) * 0.1))
}
const out = path.join(here, `../out/teasers/${id}.wav`)
m.render(out)
console.log('teaser sound →', path.relative(process.cwd(), out))
