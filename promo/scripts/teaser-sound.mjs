// node promo/scripts/teaser-sound.mjs --teaser=01-blind   → promo/out/teasers/01-blind.wav
// node promo/scripts/teaser-sound.mjs --film=htxloops     → promo/out/films/htxloops/soundtrack.wav
// Builds the teaser's score from its exported `music` and `cues`, plus the shared end-tag sounds.
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createMix } from './synth.mjs'
import { rng } from '../src/lib.js'

// ═══════════════════ style arranger (music.style) ═══════════════════
// A film's cues.js can set music: { style, key, seed, sections: { drop, breakdown, lift, outroAt, build }, hits: [t…],
// musicRel, lufs, cueShift } and the whole score is arranged from the preset below, on the 108 bpm grid
// (beat n at 0.6 + n·0.5556). `drop` becomes beat 1 of a bar, so the groove, the chord changes and the motif all start
// on the film's big moment. Sections: intro → build → drop → (breakdown → build → lift) → outro (the tonic lands at
// `outroAt` and rings out under the end card). Films without `style` keep the legacy score below, untouched.
// Flags: --debug (sections + per-bus loudness) · --notes (chords + lead) · --stems=<prefix> (dry music / SFX wavs).
const PC = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 }
const Q = {
  maj: [0, 4, 7], m: [0, 3, 7], sus2: [0, 2, 7], sus4: [0, 5, 7], add9: [0, 4, 7, 14], madd9: [0, 3, 7, 14], 6: [0, 4, 7, 9], 69: [0, 4, 9, 14],
  7: [0, 4, 7, 10], maj7: [0, 4, 7, 11], m7: [0, 3, 7, 10], '7sus4': [0, 5, 7, 10], 9: [0, 4, 7, 10, 14], maj9: [0, 4, 7, 11, 14], m9: [0, 3, 7, 10, 14],
  13: [0, 4, 10, 14, 21], m11: [0, 3, 10, 14, 17], sus2add: [0, 2, 7, 14],
}
const SCALES = { major: [0, 2, 4, 5, 7, 9, 11], minor: [0, 2, 3, 5, 7, 8, 10], dorian: [0, 2, 3, 5, 7, 9, 10], mixolydian: [0, 2, 4, 5, 7, 9, 10] }
const PARENT = { major: 0, minor: 3, dorian: -2, mixolydian: 5 }   // semitones from the tonic to the parent major key
const mod = (a, n) => ((a % n) + n) % n
const hz = n => 440 * 2 ** ((n - 69) / 12)
const VEL = { '.': 0, '-': 0, g: 0.3, o: 0.62, x: 1, X: 1.25 }
const pat = (len, hits) => { const a = Array(len).fill('.'); for (const [k, c] of Object.entries(hits)) a[+k] = c; return a.join('') }
const pickW = (r, items) => { let s = 0; for (const [, w] of items) s += w; let x = r() * s; for (const [v, w] of items) if ((x -= w) <= 0) return v; return items[items.length - 1][0] }
const seqEvents = p => { const ev = new Map(); for (let i = 0; i < p.length; i++) { const c = p[i]; if (c === '.' || c === '-') continue; let L = 1; while (i + L < p.length && p[i + L] === '-') L++; ev.set(i, [c, L]) } return ev }

// melodic rhythm cells (one beat each, on 16ths) — the motif generator draws from these
const CELLS = {
  flowing: [['x...', 4], ['x.x.', 4], ['x..x', 2], ['..x.', 1.5], ['x.xx', 1], ['xxx.', 0.6], ['....', 0.6]],
  long: [['x...', 6], ['x.x.', 1.5], ['....', 1.5], ['..x.', 1]],
  funky: [['x..x', 3], ['.x.x', 2], ['x.x.', 2], ['..x.', 2], ['xx.x', 1], ['.xx.', 1], ['....', 1]],
  bouncy: [['x.x.', 4], ['x..x', 3], ['..x.', 2], ['x...', 2], ['xx..', 1], ['.x.x', 1]],
  sparse: [['x...', 4], ['....', 3], ['..x.', 1.5], ['x.x.', 1]],
}
function makeMotif(r, L, bars) {
  // rhythm from the style's cells, pitch as a scale-degree walk; retried (deterministically) until the phrase has a real
  // contour: enough distinct pitches, a range of at least a fourth, no note struck three times running
  const cells = CELLS[L.cells || 'flowing'], beats = bars * 4, want = L.notes || [4, 10], lo = L.dlo ?? -2, hi = L.dhi ?? 9
  let best = null
  for (let tries = 0; tries < 60; tries++) {
    let on = []
    for (let b = 0; b < beats; b++) {
      let c = pickW(r, b === 0 ? cells.filter(([s]) => s[0] === 'x') : cells)
      if (b === beats - 1) c = r() < 0.6 ? '....' : 'x...'
      else if (b === beats - 2 && r() < 0.5) c = 'x...'
      for (let k = 0; k < 4; k++) if (c[k] === 'x') on.push(b * 4 + k)
    }
    if (on.length < want[0] || on.length > want[1]) continue
    let d = pickW(r, [[0, 2], [2, 2], [4, 3], [7, 1]])
    const notes = on.map((s, i) => {
      if (i) { const st = pickW(r, [[1, 3], [-1, 3], [2, 2.2], [-2, 2], [3, 1], [-3, 0.8], [4, 0.6], [0, 0.4]]); d += st; if (d > hi || d < lo) d -= 2 * st; d = Math.max(lo, Math.min(hi, d)) }
      return { s, d }
    })
    const last = notes[notes.length - 1]; last.d = [0, 2, 4, 7].reduce((a, b) => Math.abs(b - last.d) < Math.abs(a - last.d) ? b : a)
    const ds = notes.map(n => n.d), distinct = new Set(ds).size, range = Math.max(...ds) - Math.min(...ds)
    const triple = ds.some((x, i) => i > 1 && x === ds[i - 1] && x === ds[i - 2])
    const score = Math.min(distinct, 5) + Math.min(range, 5) - (triple ? 4 : 0)
    if (!best || score > best.score) best = { notes, score }
    if (distinct >= Math.min(4, notes.length) && range >= 3 && !triple) break
  }
  const notes = best.notes
  notes.forEach((n, i) => { n.len = Math.min(L.maxLen ?? 8, (i + 1 < notes.length ? notes[i + 1].s : bars * 16) - n.s) })
  return notes
}
function varyMotif(r, A, bars) {
  let B = A.map(n => ({ ...n })); const k = r(), half = bars * 8
  if (k < 0.45 && B.length >= 2) { B[B.length - 2].d += r() < 0.5 ? 1 : -1; B[B.length - 1].d = B[B.length - 1].d === 0 ? 4 : 0 }   // answer
  else if (k < 0.8) { for (const x of B) if (x.s < half) x.d += 2; B[B.length - 1].d = 0 }                                           // sequence up a third
  else { B = B.filter(x => x.s < half + 4); const l = B[B.length - 1]; l.d = 0; l.len = Math.min(8, bars * 16 - l.s) }               // settle early
  return B
}

// ── fills (scheduled before the parts so they can mute what they replace)
const DRUMKIT = ['kick', 'kick4', 'snare', 'clap', 'hat', 'hat16', 'ohat', 'shaker', 'rim', 'toms', 'ride', 'brush']
const FILLS = {
  crash: (c, tE) => c.m.crash(tE, { gain: 0.05, len: 2.4 }),
  toms: (c, tE) => { const f = [196, 165, 131, 98]; f.forEach((fr, i) => c.m.tom(tE - (4 - i) * c.S16, fr * (c.st.tomPitch ?? 1), { gain: 0.16 + 0.05 * i, pan: 0.45 - i * 0.3 })); c.mute(tE - c.BEAT, tE, ['snare', 'hat', 'hat16', 'clap', 'ohat', 'toms']) },
  toms2: (c, tE) => { for (let i = 0; i < 8; i++) c.m.tom(tE - (8 - i) * c.S16, (220 - i * 18) * (c.st.tomPitch ?? 1), { gain: 0.1 + 0.035 * i, pan: 0.5 - i * 0.14 }); c.mute(tE - 2 * c.BEAT, tE, ['snare', 'hat', 'hat16', 'clap', 'ohat', 'toms']) },
  snareRoll: (c, tE) => { for (let i = 0; i < 8; i++) c.m.snare(tE - (8 - i) * c.S16, { gain: 0.05 + 0.028 * i, tone: 205, decay: 0.09, rev: 0.15 }); c.mute(tE - 2 * c.BEAT, tE, ['snare', 'clap']) },
  clapRoll: (c, tE) => { for (let i = 0; i < 8; i++) c.m.clap(tE - (8 - i) * c.S16, { gain: 0.05 + 0.025 * i, rev: 0.15 }); c.mute(tE - 2 * c.BEAT, tE, ['snare', 'clap']) },
  dropout: (c, tE) => c.mute(tE - 2 * c.S16, tE, [...DRUMKIT, 'bass', 'keys', 'organ', 'comp2']),
  tapestop: (c, tE) => { c.m.tapeStop(tE - c.BEAT, c.BEAT * 0.97); c.mute(tE - c.BEAT, tE, ['kick', 'snare', 'clap']) },
  chop: (c, tE) => { const si = c.segIdx(tE - c.BEAT), v = c.voice([52, 70], true)[si]; for (let i = 0; i < 4; i++) c.m.epiano(tE - c.BEAT + i * c.S16, v.map(hz), c.S16 * 0.8, { gain: 0.03 * (1 - i * 0.18), bright: 0.6, bus: 'keys' }) },
  chip: (c, tE) => { for (let i = 0; i < 8; i++) c.m.chip(tE - (8 - i) * c.S16, 2200 + i * 500, 0.07, { wave: 'noise', gain: 0.02 + 0.006 * i, decay: 0.05, sustain: 0, bus: 'drums', rev: 0, dly: 0 }); c.m.chip(tE - 2 * c.BEAT, hz(c.tonicMidi(60)), 2 * c.BEAT, { wave: 'square', duty: 0.25, slide: 12 / (2 * c.BEAT), gain: 0.02, bus: 'lead' }); c.mute(tE - 2 * c.BEAT, tE, ['snare', 'hat']) },
}

// ── the presets. Instruments are closures over the mix `m`; gains are relative (the master levels the music under the SFX).
const kit = {
  kick: o => (m, t, v) => m.kick(t, { ...o, gain: (o.gain ?? 0.5) * v }),
  snare: o => (m, t, v) => m.snare(t, { ...o, gain: (o.gain ?? 0.26) * v }),
  clap: o => (m, t, v) => m.clap(t, { ...o, gain: (o.gain ?? 0.22) * v }),
  hat: o => (m, t, v) => m.hat(t, { ...o, gain: (o.gain ?? 0.045) * v }),
  shaker: o => (m, t, v) => m.shaker(t, { ...o, gain: (o.gain ?? 0.03) * v }),
  rim: o => (m, t, v) => m.rim(t, { ...o, gain: (o.gain ?? 0.09) * v }),
}

const STYLES = {
  // 80s night drive: gated snare on 2 & 4, octave 8th bass, detuned saw pad, 16th saw arp, soaring saw lead
  synthwave: {
    mode: 'minor', key: 'F#m', prog: [[0, 'm9'], [8, 'maj7'], [3, 'add9'], [10, '6']], chordBars: 1, cadence: [10, 'sus4'], final: [0, 'sus2add'], bassLo: 33,
    drums: {
      kick: { pat: 'x...x...x...x...', fn: kit.kick({ f1: 140, decay: 0.3 }) },
      snare: { pat: '....x.......x...', fn: kit.snare({ gated: 0.27, tone: 200, rev: 0.4 }) },
      hat: { pat: 'o.x.o.x.o.x.o.x.', fn: kit.hat({ pan: 0.3 }) },
      ohat: { pat: '..x...x...x...x.', fn: kit.hat({ open: true, decay: 0.16, gain: 0.03, pan: -0.25 }) },
    },
    bass: { pat: 'R-o-R-o-R-o-R-o-', var4: 'R-o-R-o-R-o-5-o-', legato: 0.8, fn: (m, t, f, len, v) => m.bass(t, f, len, { type: 'pluck', gain: 0.2 * v, bright: 0.55 }) },
    pads: [{ layer: 'pad', range: [52, 72], fn: (m, t0, t1, fs, v) => m.superpad(t0, t1, fs, { gain: 0.013 * v, cut0: 500, cut1: 1900, lfo: 0.11, voices: 5, detune: 0.012 }) }],
    arp: { every: 1, order: [0, 1, 2, 3, 4, 3, 2, 1], range: [57, 72], fn: (m, t, f, len, v) => m.lead(t, f, len * 0.9, { gain: 0.022 * v, cutoff: 700, env: 2600, envDecay: 28, q: 2, decay: 0.12, sustain: 0.15, release: 0.06, vib: 0, rev: 0.25, dly: 0.25, pan: 0.25 * Math.sin(t * 3), bus: 'keys' }) },
    lead: { lo: 64, cells: 'long', notes: [4, 8], glide: true, hi: 'oct', fn: (m, t, f, len, v, o) => m.lead(t, f, len, { gain: 0.04 * v, detune: 0.008, cutoff: 1500, env: 1800, envDecay: 5, q: 1.2, attack: 0.02, vib: 0.006, from: o.from, rev: 0.35, dly: 0.28 }) },
    layers: {
      intro: { pad: 0.8, arp: 0.55 },
      build: { pad: 1, arp: 0.8, kick: 0.8, hat: 0.6, bass: 0.7 },
      drop: { kick: 1, snare: 1, hat: 1, bass: 1, pad: 1, arp: 1, lead: 1 },
      break: { pad: 1, arp: 0.7, lead: 0.85, hat: 0.4 },
      lift: { kick: 1, snare: 1, hat: 1, ohat: 1, bass: 1, pad: 1, arp: 1, lead: 1, leadHi: 0.55 },
      outro: { pad: 1 },
    },
    fills: { drop: ['toms', 'crash'], lift: ['toms2', 'crash'], break: ['crash'], outro: ['toms'] },
    mix: { pad: -7 },
    swell: 0.035, fx: { pad: { duck: 0.55, width: 1.4 }, bass: { duck: 0.45 }, keys: { duck: 0.3, width: 1.3 } }, reverb: { room: 0.86, damp: 0.25 },
  },
  // half-time boom-bap, swung 16ths, Rhodes 9ths/13ths, warm bass, vinyl crackle, a little tape wow
  lofi: {
    mode: 'major', key: 'Eb', prog: [[2, 'm9'], [7, '13'], [0, 'maj9'], [9, 'm9']], chordBars: 1, cadence: [7, '13'], final: [0, 'maj9'], bassLo: 31, swing: 0.32, humanize: 0.012,
    drums: {
      kick: { pat: 'x.........x.....', var4: 'x.........x..x..', fn: kit.kick({ f1: 120, decay: 0.32, drive: 1.3, click: 0.25 }) },
      snare: { pat: '........x.......', fn: kit.snare({ tone: 170, decay: 0.13, snappy: 0.55, rev: 0.25, gain: 0.24 }) },
      rim: { pat: '......g.......g.', fn: kit.rim({ gain: 0.07 }) },
      hat: { pat: 'x.ogx.o.x.ogx.o.', fn: kit.hat({ tone: 0.8, gain: 0.03 }) },
    },
    bass: { pat: 'R---------5---a-', legato: 0.95, fn: (m, t, f, len, v) => m.bass(t, f, len, { type: 'warm', gain: 0.2 * v, bright: 0.4 }) },
    comps: [{ layer: 'keys', pat: 'x-------..o---..', range: [52, 72], rootless: true, fn: (m, t, fs, len, v) => fs.forEach((f, i) => m.epiano(t + i * 0.012, f, len, { gain: 0.03 * v, trem: 4.2, depth: 0.45, bright: 0.85, rev: 0.3 })) }],
    pads: [{ layer: 'pad', range: [55, 72], fn: (m, t0, t1, fs, v) => m.superpad(t0, t1, fs, { gain: 0.008 * v, cut0: 500, cut1: 1100, voices: 3, detune: 0.006, attack: 1.2 }) }],
    lead: { lo: 62, cells: 'sparse', notes: [3, 7], fn: (m, t, f, len, v) => m.lead(t, f, len, { gain: 0.034 * v, wave: 'tri', cutoff: 1500, env: 500, attack: 0.03, vib: 0.006, rev: 0.4, dly: 0.25 }) },
    extras: c => c.m.vinyl(0, c.DUR, { gain: 0.03 }),
    layers: {
      intro: { keys: 0.85, hat: 0.5 },
      build: { keys: 1, kick: 0.8, hat: 0.8, bass: 0.7 },
      drop: { kick: 1, snare: 1, rim: 1, hat: 1, bass: 1, keys: 1, lead: 1 },
      break: { keys: 1, lead: 0.8, bass: 0.6, pad: 0.8 },
      lift: { kick: 1, snare: 1, rim: 1, hat: 1, bass: 1, keys: 1, lead: 1, pad: 0.7 },
      outro: { pad: 1 },
    },
    fills: { drop: ['dropout'], lift: ['dropout'], outro: ['dropout'] },
    mix: { fx: -19, keys: -4, lead: -6 },
    fx: { keys: { wobble: 1.3, lowpass: 5200, duck: 0.15 }, lead: { wobble: 1.0 }, drums: { lowpass: 9000 }, bass: { duck: 0.25 }, pad: { wobble: 1.5 } }, reverb: { room: 0.82, damp: 0.45 },
  },
  // 16th hats, ghosted snare, syncopated slap-ish bass, clav stabs, brass hits at the phrase end
  funk: {
    mode: 'dorian', key: 'Am', prog: [[0, 'm9'], [0, 'm7'], [5, '9'], [7, '7sus4']], chordBars: 1, cadence: [7, '7sus4'], final: [0, 'm9'], bassLo: 28, swing: 0.12,
    drums: {
      kick: { pat: 'x.....x.x.....x.', fn: kit.kick({ f1: 150, decay: 0.26, click: 0.7 }) },
      snare: { pat: '....X..g.g..X..g', fn: kit.snare({ tone: 210, decay: 0.12, snappy: 0.9 }) },
      clap: { pat: '....x.......x...', fn: kit.clap({ gain: 0.14 }) },
      hat: { pat: 'xgxgxgxgxgxgxg.g', fn: kit.hat({ gain: 0.04, pan: 0.3 }) },
      ohat: { pat: '..............x.', fn: kit.hat({ open: true, decay: 0.14, gain: 0.035, pan: 0.3 }) },
    },
    bass: { pat: 'R-.r..o.R-75..o.', var4: 'R-.r..o.R..5b.o.', legato: 0.85, fn: (m, t, f, len, v) => m.bass(t, f, len, { type: 'pluck', gain: 0.22 * v, bright: 0.9 }) },
    comps: [
      { layer: 'keys', pat: '..x..o.x..x..o.x', range: [55, 72], rootless: true, fn: (m, t, fs, len, v) => m.clav(t, fs, len * 0.7, { gain: 0.018 * v, pan: -0.2 }) },
      { layer: 'comp2', pat: pat(32, { 22: 'x', 25: 'X', 26: '-', 28: 'x', 29: '-' }), range: [58, 74], fn: (m, t, fs, len, v) => m.brass(t, fs, len, { gain: 0.022 * v, pan: 0.15 }) },
    ],
    pads: [{ layer: 'pad', range: [55, 72], fn: (m, t0, t1, fs, v) => m.organ(t0, fs, t1 - t0, { gain: 0.012 * v, perc: 0 }) }],
    lead: { lo: 64, cells: 'funky', notes: [6, 11], maxLen: 3, hi: 'third', fn: (m, t, f, len, v) => m.lead(t, f, len, { gain: 0.032 * v, wave: 'square', duty: 0.3, cutoff: 1900, env: 2500, envDecay: 14, decay: 0.2, sustain: 0.5, release: 0.05, vib: 0.003, rev: 0.18, dly: 0.12 }) },
    layers: {
      intro: { hat: 0.7, keys: 0.8, kick: 0.6 },
      build: { hat: 1, keys: 1, kick: 1, bass: 0.8 },
      drop: { kick: 1, snare: 1, hat: 1, ohat: 1, bass: 1, keys: 1, comp2: 1, lead: 0.9 },
      break: { hat: 0.7, bass: 1, keys: 0.8, pad: 0.8, snare: 0.5 },
      lift: { kick: 1, snare: 1, clap: 1, hat: 1, ohat: 1, bass: 1, keys: 1, comp2: 1, lead: 1, leadHi: 0.6 },
      outro: { pad: 1 },
    },
    fills: { drop: ['toms', 'crash'], lift: ['snareRoll', 'crash'], break: ['dropout'], outro: ['toms'] },
    fx: { bass: { duck: 0.2 }, keys: { duck: 0.1, width: 1.3 }, pad: { duck: 0.3 } }, reverb: { room: 0.78, damp: 0.4 },
  },
  // taiko toms, half-time hits, swelling saw pad + strings, a rising arp, heroic lead, sub booms
  cinematic: {
    mode: 'minor', key: 'Dm', prog: [[0, 'madd9'], [8, 'add9'], [3, 'add9'], [10, 'sus2']], chordBars: 2, cadence: [10, 'sus4'], final: [0, 'sus2add'], bassLo: 28, tomPitch: 0.75,
    drums: {
      kick: { pat: 'X...............', var4: 'X.........x.....', fn: kit.kick({ f0: 42, f1: 120, decay: 0.55, drive: 1.3, click: 0.3 }) },
      snare: { pat: '........x.......', fn: kit.snare({ tone: 150, decay: 0.3, snappy: 0.7, rev: 0.6, gain: 0.26 }) },
      toms: { pat: pat(32, { 0: 'X', 3: 'o', 6: 'x', 8: 'o', 11: 'o', 14: 'x', 16: 'X', 19: 'o', 22: 'x', 24: 'o', 26: 'x', 28: 'x', 29: 'o', 30: 'x', 31: 'X' }), fn: (m, t, v) => m.tom(t, v > 1.1 ? 62 : v > 0.9 ? 82 : 110, { gain: 0.26 * Math.min(1, v), decay: 0.5, rev: 0.45, pan: v > 0.9 ? 0 : 0.3 }) },
      shaker: { pat: 'xgogxgogxgogxgog', fn: kit.shaker({ gain: 0.025 }) },
    },
    bass: { pat: 'R-------R-------', legato: 1, fn: (m, t, f, len, v) => m.bass(t, f, len, { type: 'sub', gain: 0.26 * v }) },
    pads: [
      { layer: 'pad', range: [50, 69], fn: (m, t0, t1, fs, v) => m.superpad(t0, t1, fs, { gain: 0.014 * v, cut0: 400, cut1: 2200, lfo: 0.08, swell: 0.8, attack: 1.4, voices: 5, detune: 0.01, rev: 0.6 }) },
      { layer: 'strings', range: [62, 81], fn: (m, t0, t1, fs, v) => m.strings(t0, t1, fs, { gain: 0.011 * v }) },
    ],
    arp: { every: 1, rise: 2, order: [0, 1, 2, 3, 4, 5, 6, 7], range: [55, 67], fn: (m, t, f, len, v) => m.lead(t, f, len * 0.85, { gain: 0.02 * v, cutoff: 900, env: 2600, envDecay: 22, q: 1.6, decay: 0.15, sustain: 0.2, release: 0.08, vib: 0, rev: 0.45, dly: 0.25, pan: 0.3 * Math.sin(t * 2.3), bus: 'keys' }) },
    lead: { lo: 62, cells: 'long', notes: [3, 7], glide: true, hi: 'oct', fn: (m, t, f, len, v, o) => m.lead(t, f, len, { gain: 0.036 * v, cutoff: 1300, env: 900, envDecay: 3, attack: 0.06, vib: 0.006, from: o.from, rev: 0.55, dly: 0.2 }) },
    hit: (c, t) => { c.m.crash(t, { gain: 0.05, len: 3 }); c.m.sub808(t, hz(c.st.bassLo + mod(c.tonic - c.st.bassLo, 12)), 1.4, { gain: 0.3, decay: 0.9 }) },
    layers: {
      intro: { pad: 1, strings: 0.6, arp: 0.5 },
      build: { pad: 1, strings: 1, arp: 0.9, toms: 0.6, shaker: 0.6 },
      drop: { kick: 1, snare: 1, toms: 1, shaker: 1, bass: 1, pad: 1, strings: 1, arp: 1 },
      break: { pad: 1, strings: 1, arp: 0.6, lead: 0.8, bass: 0.6 },
      lift: { kick: 1, snare: 1, toms: 1, shaker: 1, bass: 1, pad: 1, strings: 1, arp: 1, lead: 1, leadHi: 0.45 },
      outro: { pad: 1, strings: 0.8 },
    },
    fills: { drop: ['toms2', 'crash'], lift: ['toms2', 'crash'], break: ['crash'], outro: ['toms2'] },
    mix: { pad: -4, keys: -9, lead: -5 },
    swell: 0.04, fx: { pad: { duck: 0.25, width: 1.4 }, bass: { duck: 0.25 }, keys: { width: 1.3 } }, reverb: { room: 0.9, damp: 0.25 }, reverbWet: 3.0,
  },
  // Houston chopped-and-screwed nod: half-time, deep 808 with glides, detuned dreamy pad through a phaser and tape wow,
  // dark Rhodes, a slow bell line, tape-stops into the drops. All original, all on the grid.
  screwed: {
    mode: 'minor', key: 'C#m', prog: [[0, 'm9'], [8, 'maj7'], [5, 'm9'], [7, 'm7']], chordBars: 2, cadence: [7, 'm7'], final: [0, 'm9'], bassLo: 25,
    drums: {
      kick: { pat: pat(32, { 0: 'x', 10: 'x', 13: 'o', 16: 'x', 27: 'x' }), fn: kit.kick({ f0: 45, f1: 110, decay: 0.28, click: 0.35 }) },
      clap: { pat: pat(16, { 8: 'x' }), fn: kit.clap({ gain: 0.2, rev: 0.4 }) },
      snare: { pat: pat(16, { 8: 'o' }), fn: kit.snare({ tone: 175, decay: 0.16, rev: 0.4 }) },
      hat: { pat: 'x.o.x.o.x.o.x.o.', var4: 'x.o.x.o.x.o.xgog', fn: kit.hat({ tone: 0.85, gain: 0.035 }) },
    },
    bass: { pat: 'R' + '-'.repeat(9) + 'R--o--R' + '-'.repeat(10) + '5----', legato: 1, fn: (m, t, f, len, v, o) => m.sub808(t, f, len, { gain: 0.36 * v, from: o.from, glide: 0.1, decay: 2.2 }) },
    comps: [{ layer: 'keys', pat: 'x' + '-'.repeat(31), range: [50, 66], rootless: true, fn: (m, t, fs, len, v) => fs.forEach((f, i) => m.epiano(t + i * 0.03, f, len, { gain: 0.026 * v, bright: 0.45, trem: 3, depth: 0.5, rev: 0.4 })) }],
    pads: [{ layer: 'pad', range: [48, 67], fn: (m, t0, t1, fs, v) => m.superpad(t0, t1, fs, { gain: 0.014 * v, voices: 6, detune: 0.022, cut0: 350, cut1: 1300, lfo: 0.08, attack: 1.4, rev: 0.6 }) }],
    lead: { lo: 60, cells: 'sparse', notes: [3, 6], bars: 2, fn: (m, t, f, len, v) => m.fmbell(t, f, { gain: 0.04 * v, ratio: 2, index: 1.4, decay: 2.4, rev: 0.5, dly: 0.3 }) },
    extras: c => c.m.vinyl(0, c.DUR, { gain: 0.016, rate: 4 }),
    layers: {
      intro: { pad: 1, keys: 0.7 },
      build: { pad: 1, keys: 0.8, hat: 0.6, bass: 0.6 },
      drop: { kick: 1, clap: 1, snare: 1, hat: 1, bass: 1, pad: 1, keys: 1, lead: 1 },
      break: { pad: 1, keys: 1, lead: 1, bass: 0.5 },
      lift: { kick: 1, clap: 1, snare: 1, hat: 1, bass: 1, pad: 1, keys: 1, lead: 1 },
      outro: { pad: 1 },
    },
    fills: { drop: ['tapestop', 'crash'], lift: ['tapestop', 'crash'], break: ['chop'], outro: ['chop'] },
    mix: { fx: -21, pad: -6, keys: -8, lead: -6 }, musicRel: -6,
    fx: { pad: { phaser: { rate: 0.12, mix: 0.5 }, wobble: 3.2, duck: 0.35, width: 1.4 }, keys: { wobble: 2.6, lowpass: 3800, duck: 0.2 }, lead: { wobble: 2.2, lowpass: 5000 }, bass: { duck: 0.1 }, drums: { lowpass: 11000 } }, reverb: { room: 0.88, damp: 0.4 },
  },
  // ambient bell arps, soft kick, airy pad, gentle and wistful
  dreamy: {
    mode: 'major', key: 'Ab', prog: [[0, 'maj9'], [5, 'maj9'], [9, 'm9'], [7, '7sus4']], chordBars: 2, cadence: [5, 'maj9'], final: [0, 'maj9'], bassLo: 31,
    drums: {
      kick: { pat: pat(16, { 0: 'x', 10: 'o' }), fn: kit.kick({ f1: 100, decay: 0.24, click: 0.1, drive: 1.1 }) },
      rim: { pat: pat(16, { 12: 'g' }), fn: kit.rim({ gain: 0.06, rev: 0.4 }) },
      shaker: { pat: 'o.g.o.g.o.g.o.gg', fn: kit.shaker({ gain: 0.022, pan: 0.35 }) },
    },
    bass: { pat: 'R-----------5---', legato: 1, fn: (m, t, f, len, v) => m.bass(t, f, len, { type: 'sub', gain: 0.18 * v }) },
    pads: [
      { layer: 'pad', range: [55, 74], fn: (m, t0, t1, fs, v) => m.superpad(t0, t1, fs, { gain: 0.012 * v, voices: 4, detune: 0.008, cut0: 900, cut1: 3000, lfo: 0.06, attack: 1.6, release: 1.8, rev: 0.7 }) },
      { layer: 'air', range: [74, 91], fn: (m, t0, t1, fs, v) => m.superpad(t0, t1, fs, { gain: 0.004 * v, voices: 3, detune: 0.005, wave: 'tri', cut0: 3000, cut1: 6000, attack: 2, release: 2, rev: 0.8, width: 1 }) },
    ],
    arp: { every: 2, order: [0, 2, 1, 3, 2, 4, 3, 5], range: [64, 79], fn: (m, t, f, len, v) => m.fmbell(t, f, { gain: 0.022 * v, ratio: 3.5, index: 1.4, decay: 1.4, pan: 0.5 * Math.sin(t * 1.7), rev: 0.5, dly: 0.35 }) },
    lead: { lo: 67, cells: 'sparse', notes: [3, 6], fn: (m, t, f, len, v) => m.fmbell(t, f, { gain: 0.035 * v, ratio: 1.0, index: 1.1, decay: 2.2, rev: 0.6, dly: 0.3 }) },
    layers: {
      intro: { pad: 1, air: 0.8, arp: 0.6 },
      build: { pad: 1, air: 1, arp: 0.8, shaker: 0.6 },
      drop: { kick: 1, rim: 1, shaker: 1, bass: 1, pad: 1, air: 1, arp: 1, lead: 0.9 },
      break: { pad: 1, air: 1, arp: 0.7, lead: 1 },
      lift: { kick: 1, rim: 1, shaker: 1, bass: 1, pad: 1, air: 1, arp: 1, lead: 1 },
      outro: { pad: 1, air: 1 },
    },
    fills: { drop: [], lift: [], outro: [] },
    mix: { drums: -3, pad: -3, lead: -4 }, musicRel: -5,
    swell: 0.02, fx: { pad: { duck: 0.15, width: 1.5 }, bass: { duck: 0.15 } }, reverb: { room: 0.9, damp: 0.3 }, reverbWet: 3.2, delayTime: 0.75,
  },
  // modern pop: claps, plucky bass, bright hook, a big chorus lift (four-on-the-floor, 16th hats, wide pad, octave lead)
  pop: {
    mode: 'major', key: 'A', prog: [[0, 'add9'], [7, 'maj'], [9, 'm7'], [5, 'maj9']], chordBars: 1, cadence: [7, 'sus4'], final: [0, 'add9'], bassLo: 31,
    drums: {
      kick: { pat: 'x.....x.x.....x.', fn: kit.kick({ f1: 150, decay: 0.28 }) },
      kick4: { pat: 'x...x...x...x...', fn: kit.kick({ f1: 150, decay: 0.28 }) },
      clap: { pat: '....x.......x...', fn: kit.clap({ gain: 0.2 }) },
      snare: { pat: '....x.......x...', fn: kit.snare({ tone: 220, decay: 0.12, gain: 0.16 }) },
      hat: { pat: 'x.o.x.o.x.o.x.o.', fn: kit.hat({ gain: 0.04 }) },
      hat16: { pat: 'xoxoxoxoxoxoxoxo', fn: kit.hat({ gain: 0.035, pan: -0.25 }) },
      ohat: { pat: '..x...x...x...x.', fn: kit.hat({ open: true, decay: 0.13, gain: 0.03 }) },
      shaker: { pat: 'gogogogogogogogo', fn: kit.shaker({}) },
    },
    bass: { pat: 'R--R--R-R--R--o-', legato: 0.8, fn: (m, t, f, len, v) => m.bass(t, f, len, { type: 'pluck', gain: 0.21 * v, bright: 0.8 }) },
    comps: [{ layer: 'keys', pat: 'x..x..x.x..x..x.', range: [57, 74], fn: (m, t, fs, len, v) => fs.forEach(f => m.lead(t, f, 0.18, { gain: 0.014 * v, cutoff: 900, env: 3500, envDecay: 18, q: 1.3, decay: 0.12, sustain: 0.1, release: 0.1, vib: 0, rev: 0.25, dly: 0.12, bus: 'keys' })) }],
    pads: [{ layer: 'pad', range: [55, 74], fn: (m, t0, t1, fs, v) => m.superpad(t0, t1, fs, { gain: 0.012 * v, cut0: 900, cut1: 2800, voices: 5, detune: 0.012, attack: 0.4 }) }],
    lead: { lo: 67, cells: 'bouncy', notes: [6, 11], maxLen: 4, hi: 'third', fn: (m, t, f, len, v) => m.lead(t, f, len, { gain: 0.034 * v, wave: 'square', duty: 0.42, detune: 0.004, cutoff: 2400, env: 2400, envDecay: 9, decay: 0.25, sustain: 0.6, release: 0.08, vib: 0.004, rev: 0.25, dly: 0.2 }) },
    layers: {
      intro: { keys: 0.8, shaker: 0.6, pad: 0.4 },
      build: { keys: 1, shaker: 1, kick: 0.7, bass: 0.7, hat: 0.6 },
      drop: { kick: 1, clap: 1, snare: 1, hat: 1, bass: 1, keys: 1, lead: 1 },
      break: { keys: 1, pad: 0.8, lead: 0.7, shaker: 0.8 },
      lift: { kick4: 1, clap: 1, snare: 1, hat16: 1, ohat: 1, bass: 1, keys: 1, pad: 1, lead: 1, leadHi: 0.6 },
      outro: { pad: 1 },
    },
    fills: { drop: ['snareRoll', 'crash'], lift: ['snareRoll', 'dropout', 'crash'], break: ['crash'], outro: ['snareRoll'] },
    swell: 0.035, fx: { bass: { duck: 0.4 }, pad: { duck: 0.5, width: 1.4 }, keys: { duck: 0.25, width: 1.25 } }, reverb: { room: 0.8, damp: 0.35 },
  },
  // 8-bit: pulse leads, triangle bass, noise drums, 50 Hz chord arps
  chiptune: {
    mode: 'major', key: 'C', prog: [[0, 'maj'], [9, 'm'], [5, 'maj'], [7, 'maj']], chordBars: 1, cadence: [7, 'maj'], final: [0, 'maj'], bassLo: 36,
    drums: {
      kick: { pat: 'x.....x.x.......', fn: (m, t, v) => m.chip(t, 140, 0.11, { wave: 'tri', slide: -90, gain: 0.16 * v, decay: 0.05, sustain: 0, rev: 0, dly: 0, bus: 'drums' }) },
      snare: { pat: '....x.......x...', fn: (m, t, v) => m.chip(t, 5200, 0.12, { wave: 'noise', gain: 0.07 * v, decay: 0.07, sustain: 0, rev: 0.05, dly: 0, bus: 'drums' }) },
      hat: { pat: 'x.o.x.o.x.o.x.oo', fn: (m, t, v) => m.chip(t, 15000, 0.03, { wave: 'noise', gain: 0.025 * v, decay: 0.015, sustain: 0, rev: 0, dly: 0, bus: 'drums', pan: 0.2 }) },
    },
    bass: { pat: 'R-o-R-o-5-o-R-o-', legato: 0.75, fn: (m, t, f, len, v) => m.chip(t, f, len, { wave: 'tri', gain: 0.1 * v, decay: 0.2, sustain: 0.8, rev: 0, dly: 0, bus: 'bass' }) },
    comps: [{ layer: 'keys', pat: 'x-.x-.x-x-.x-.x-', range: [55, 70], fn: (m, t, fs, len, v) => m.chip(t, fs[0], len, { wave: 'square', duty: 0.125, arp: fs.map(f => Math.round(12 * Math.log2(f / fs[0]))), gain: 0.022 * v, decay: 0.15, sustain: 0.5, pan: -0.2, bus: 'keys' }) }],
    lead: { lo: 67, cells: 'bouncy', notes: [6, 11], maxLen: 4, hi: 'oct', fn: (m, t, f, len, v) => m.chip(t, f, len, { wave: 'square', duty: 0.25, vib: 0.008, gain: 0.03 * v, decay: 0.2, sustain: 0.7, pan: 0.1, dly: 0.22 }) },
    land: c => { const t = c.outroAt, r = c.tonicMidi(60);[0, 4, 7, 12].forEach((s, i) => c.m.chip(t + i * c.S16, hz(r + s), 1.4 - i * c.S16, { wave: 'square', duty: 0.25, gain: 0.03, decay: 0.6, sustain: 0.4, dly: 0.25 })); c.m.chip(t, hz(c.st.bassLo + mod(c.tonic - c.st.bassLo, 12)), 1.6, { wave: 'tri', gain: 0.1, decay: 0.8, sustain: 0.3, bus: 'bass' }) },
    layers: {
      intro: { keys: 0.8, hat: 0.6 },
      build: { keys: 1, hat: 1, kick: 1, bass: 0.8 },
      drop: { kick: 1, snare: 1, hat: 1, bass: 1, keys: 1, lead: 1 },
      break: { keys: 1, bass: 0.8, lead: 0.8 },
      lift: { kick: 1, snare: 1, hat: 1, bass: 1, keys: 1, lead: 1, leadHi: 0.45 },
      outro: {},
    },
    fills: { drop: ['chip'], lift: ['chip'], break: [], outro: ['chip'] },
    mix: { keys: -8, lead: -4 },
    fx: { bass: { duck: 0.1 } }, reverb: { room: 0.6, damp: 0.5 }, reverbWet: 1.6, delayTime: 0.5,
  },
  // four-on-the-floor, offbeat bass, marimba stabs and hook, organ stabs in the lift, pumping sidechain
  house: {
    mode: 'major', key: 'F', prog: [[9, 'm7'], [5, 'maj7'], [0, 'add9'], [7, 'sus4']], chordBars: 1, cadence: [7, 'sus4'], final: [0, 'add9'], bassLo: 29,
    drums: {
      kick: { pat: 'x...x...x...x...', fn: kit.kick({ f1: 145, decay: 0.3 }) },
      clap: { pat: '....x.......x...', fn: kit.clap({ gain: 0.2 }) },
      ohat: { pat: '..x...x...x...x.', fn: kit.hat({ open: true, decay: 0.12, gain: 0.04 }) },
      shaker: { pat: 'goxogoxogoxogoxo', fn: kit.shaker({ gain: 0.028 }) },
      rim: { pat: pat(16, { 3: 'o', 6: 'o', 11: 'o', 14: 'o' }), fn: kit.rim({ gain: 0.06, pan: 0.35 }) },
    },
    bass: { pat: '..R-..R-..R-..o-', legato: 0.9, fn: (m, t, f, len, v) => m.bass(t, f, len, { type: 'warm', gain: 0.22 * v, bright: 0.7 }) },
    comps: [
      { layer: 'keys', pat: 'x..x..x...x..x..', range: [60, 79], fn: (m, t, fs, len, v) => fs.slice(-3).forEach((f, i) => m.marimba(t, f, { gain: 0.024 * v, pan: (i - 1) * 0.3, bus: 'keys' })) },
      { layer: 'organ', pat: '..x-..x-..x-..x-', range: [57, 74], rootless: true, fn: (m, t, fs, len, v) => m.organ(t, fs, len * 0.8, { gain: 0.012 * v, perc: 0.5 }) },
    ],
    pads: [{ layer: 'pad', range: [55, 74], fn: (m, t0, t1, fs, v) => m.superpad(t0, t1, fs, { gain: 0.01 * v, cut0: 700, cut1: 2200, voices: 4, attack: 0.6 }) }],
    lead: { lo: 67, cells: 'bouncy', notes: [6, 11], maxLen: 3, hi: 'oct', fn: (m, t, f, len, v) => m.marimba(t, f, { gain: 0.05 * v, decay: 0.45, rev: 0.3, dly: 0.2 }) },
    layers: {
      intro: { keys: 0.8, shaker: 0.7, pad: 0.6 },
      build: { keys: 1, shaker: 1, kick: 0.8, pad: 0.8 },
      drop: { kick: 1, clap: 1, ohat: 1, shaker: 1, bass: 1, keys: 1, lead: 1 },
      break: { keys: 1, pad: 1, shaker: 0.7, lead: 0.7 },
      lift: { kick: 1, clap: 1, ohat: 1, shaker: 1, rim: 1, bass: 1, keys: 1, organ: 1, pad: 0.7, lead: 1, leadHi: 0.5 },
      outro: { pad: 1 },
    },
    fills: { drop: ['clapRoll', 'crash'], lift: ['clapRoll', 'dropout', 'crash'], break: ['crash'], outro: ['dropout'] },
    swell: 0.035, fx: { bass: { duck: 0.6 }, pad: { duck: 0.65, width: 1.4 }, keys: { duck: 0.35, width: 1.25 } }, reverb: { room: 0.8, damp: 0.35 },
  },
  // swung brushes and ride, walking bass, rootless piano 9ths on a Charleston comp, a vibes-ish line
  jazzy: {
    mode: 'major', key: 'Bb', prog: [[2, 'm9'], [7, '13'], [0, 'maj9'], [9, '7']], chordBars: 1, cadence: [7, '13'], final: [0, '69'], bassLo: 28, swing8: 0.667, humanize: 0.008,
    drums: {
      ride: { pat: 'x...x.o.x...x.o.', fn: (m, t, v) => m.hat(t, { gain: 0.03 * v, tone: 0.55, decay: 0.32, pan: 0.35, rev: 0.15 }) },
      brush: { pat: 'x...x...x...x...', fn: (m, t, v) => m.brush(t, { gain: 0.03 * v, len: 0.3 }) },
      kick: { pat: 'g...g...g...g...', fn: kit.kick({ f1: 110, decay: 0.22, click: 0.1, drive: 1.1, duck: false }) },
      rim: { pat: '....x.......x...', fn: kit.rim({ gain: 0.07 }) },
    },
    bass: { pat: 'W---W---W---W---', legato: 0.92, fn: (m, t, f, len, v) => m.bass(t, f, len, { type: 'finger', gain: 0.24 * v }) },
    comps: [{ layer: 'keys', pat: 'x-....x-........', var4: 'x-..x-....x-....', range: [52, 70], rootless: true, fn: (m, t, fs, len, v) => m.piano(t, fs, len, { gain: 0.022 * v, bright: 0.75, rev: 0.25 }) }],
    pads: [{ layer: 'pad', range: [55, 72], fn: (m, t0, t1, fs, v) => m.organ(t0, fs, t1 - t0, { gain: 0.008 * v, perc: 0, leslie: 1.2 }) }],
    lead: { lo: 65, cells: 'flowing', notes: [6, 11], maxLen: 6, fn: (m, t, f, len, v) => m.marimba(t, f, { gain: 0.045 * v, decay: 1.1, rev: 0.35, dly: 0.1 }) },
    layers: {
      intro: { keys: 0.9, ride: 0.6, brush: 0.6 },
      build: { keys: 1, ride: 1, brush: 1, bass: 0.8 },
      drop: { keys: 1, ride: 1, brush: 1, kick: 1, rim: 1, bass: 1, lead: 1 },
      break: { keys: 1, bass: 1, brush: 0.7, lead: 0.8 },
      lift: { keys: 1, ride: 1, brush: 1, kick: 1, rim: 1, bass: 1, lead: 1, pad: 0.6 },
      outro: { pad: 1 },
    },
    fills: { drop: ['crash'], lift: ['crash'], break: ['dropout'], outro: [] },
    mix: { keys: -3, bass: -1, lead: -4 }, musicRel: -6,
    fx: { keys: { duck: 0 }, bass: {} }, reverb: { room: 0.8, damp: 0.5 },
  },
}

function scoreStyle(m, T) {
  const mu = T.music, st = STYLES[mu.style]
  if (!st) throw new Error(`unknown music.style "${mu.style}" (have: ${Object.keys(STYLES).join(', ')})`)
  const DUR = T.duration, BEAT = 60 / 108, S16 = BEAT / 4, BAR = 4 * BEAT, B0 = mu.beat0 ?? 0.6
  const snap = t => B0 + Math.round((t - B0) / BEAT) * BEAT
  const rnd = rng(mu.seed ?? 1)
  let DBG = null; const NN = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']
  // key: a minor key for a major preset (or vice versa) is read as its relative
  const km = /^([A-G][#b]?)\s*(.*)$/.exec(mu.key || st.key)
  if (!km || PC[km[1]] == null) throw new Error(`bad music.key "${mu.key}"`)
  let tonic = PC[km[1]]
  const keyMinor = /^(m|min|minor|dorian)$/i.test(km[2].trim()), styleMinor = st.mode === 'minor' || st.mode === 'dorian'
  if (keyMinor !== styleMinor) tonic = mod(tonic + (styleMinor ? 9 : 3), 12)
  const scale = SCALES[st.mode]
  // sections
  const sec = mu.sections || {}
  const drop = sec.drop != null ? snap(sec.drop) : B0, anchor = drop
  const snapBar = t => anchor + Math.round((t - anchor) / BAR) * BAR
  const outroAt = Math.min(DUR - 0.5, sec.outroAt != null ? snap(sec.outroAt) : snapBar(DUR - 2 * BAR))
  // breakdown / lift may be single times or lists (pairs); they snap to the beat so they hit the visual moment exactly
  const brks = [].concat(sec.breakdown ?? []).map(snap), lifts = [].concat(sec.lift ?? []).map(snap)
  const bb = (sec.build ?? 4) * BEAT, bb2 = (sec.build2 ?? 2) * BEAT
  const S = [], push = (type, t0, t1) => { if (t1 - t0 > 1e-3) S.push({ type, t0, t1 }) }
  const ev = [...brks.map(t => ['break', t]), ...lifts.map(t => ['lift', t])].filter(([, t]) => t > drop + BEAT * 0.5 && t < outroAt - BEAT).sort((x, y) => x[1] - y[1])
  push('intro', 0, Math.max(0, drop - bb)); push('build', Math.max(0, drop - bb), drop)
  let cur = ['drop', drop]
  for (const e of [...ev, ['outro', outroAt]]) {
    const end = e[0] === 'lift' ? Math.max(cur[1], e[1] - bb2) : e[1]
    push(cur[0], cur[1], end)
    if (e[0] === 'lift') push('build', end, e[1])
    cur = e
  }
  push('outro', outroAt, DUR)
  const secAt = t => S.find(s => t >= s.t0 - 1e-6 && t < s.t1 - 1e-6) || S[S.length - 1]
  const mutes = [], mute = (a, b, parts) => mutes.push([a, b, parts])
  const lv = (part, t) => { for (const [a, b, ps] of mutes) if (t >= a - 1e-6 && t < b - 1e-6 && ps.includes(part)) return 0; return st.layers[secAt(t).type]?.[part] ?? 0 }
  // chords: one per chordBars from the drop; a cadence for the last 2 beats before the outro; the final chord after it
  const CL = (st.chordBars ?? 1) * BAR, cadLen = 2 * BEAT
  const chordAt = t => {
    if (t >= outroAt - 1e-6) return st.final
    if (st.cadence && t >= outroAt - cadLen - 1e-6 && outroAt - cadLen > drop + 1e-6) return st.cadence
    return st.prog[mod(Math.floor((t - anchor + 1e-6) / CL), st.prog.length)]
  }
  const cuts = new Set([0])
  for (let t = anchor - Math.ceil(anchor / CL) * CL; t < DUR; t += CL) if (t > 0) cuts.add(+t.toFixed(5))
  for (const s of S) cuts.add(+s.t0.toFixed(5))
  if (outroAt - cadLen > 0) cuts.add(+(outroAt - cadLen).toFixed(5))
  const ts = [...cuts].filter(t => t >= 0 && t < DUR).sort((a, b) => a - b)
  const segs = ts.map((t0, i) => ({ t0, t1: ts[i + 1] ?? DUR, ch: chordAt(t0 + 1e-4) }))
  const segIdx = t => { let i = 0; while (i + 1 < segs.length && segs[i + 1].t0 <= t + 1e-6) i++; return i }
  const pcsOf = ([r, q], rootless) => { const iv = Q[q]; if (!iv) throw new Error(`unknown chord quality ${q}`); let p = iv.map(i => mod(tonic + r + i, 12)); if (rootless && iv.length >= 4) p = p.slice(1); return [...new Set(p)] }
  const vcache = {}
  const voice = (range, rootless = false, maxN = 5) => vcache[range + rootless] || (vcache[range + rootless] = (() => {
    const [lo, hi] = range; let prev = null
    return segs.map(sg => {
      let pcs = pcsOf(sg.ch, rootless); if (pcs.length > maxN) pcs = pcs.filter((_, i) => i !== 2).slice(0, maxN)
      let best = null, bc = 1e9
      const cands = []
      for (let base = lo; base < lo + 12; base++) {
        const ns = pcs.map(pc => base + mod(pc - base, 12)).sort((a, b) => a - b)
        if (ns.length >= 4) { const d2 = [...ns]; d2[d2.length - 2] -= 12; d2.sort((a, b) => a - b); if (d2[0] >= lo - 5) cands.push(d2) }   // drop-2 spread
        cands.push(ns)
      }
      for (const ns of cands) {
        if (ns[ns.length - 1] > hi) continue
        let cl = 0; for (let j = 1; j < ns.length; j++) { const iv = ns[j] - ns[j - 1]; if (iv === 1) cl += j < ns.length - 1 ? 4 : 2; else if (iv === 2 && ns[j] < 57) cl += 1.5 }
        const c = cl + (prev ? ns.reduce((s, n) => s + Math.min(...prev.map(p => Math.abs(p - n))), 0) + prev.reduce((s, p) => s + Math.min(...ns.map(n => Math.abs(p - n))), 0) + 0.1 * Math.abs(ns[0] - lo - 4) : Math.abs((ns[0] + ns[ns.length - 1]) / 2 - (lo + hi) / 2))
        if (c < bc) { bc = c; best = ns }
      }
      prev = best || pcs.map(pc => lo + mod(pc - lo, 12)).sort((a, b) => a - b)
      return prev
    })
  })())
  const rootMidi = sg => st.bassLo + mod(tonic + sg.ch[0] - st.bassLo, 12)
  const tonicMidi = lo => lo + mod(tonic - lo, 12)
  const nearestChordTone = (n, sg) => { const p = pcsOf(sg.ch, false); for (const o of [0, -1, 1, -2, 2, -3, 3]) if (p.includes(mod(n + o, 12))) return n + o; return n }
  const g0 = Math.ceil((0 - anchor) / S16 - 1e-9), g1 = Math.floor((DUR - anchor) / S16 - 1e-9)
  const tOf = g => anchor + g * S16 + (mod(g, 2) === 1 ? (st.swing || 0) * S16 : 0) + (st.swing8 && mod(g, 4) === 2 ? st.swing8 * S16 : 0)
  const isVar4 = g => mod(Math.floor(g / 16), 4) === 3
  const c = { m, st, DUR, BEAT, S16, BAR, tonic, segs, segIdx, voice, mute, tonicMidi, outroAt, S }

  // fills, builds, hits
  for (const s of S) if (s.t0 > 0.3) for (const f of (st.fills?.[s.type] || [])) FILLS[f](c, s.t0)
  if (st.swell) for (const s of S) if (s.type === 'build' && s.t1 - s.t0 >= BEAT * 0.99) m.swell(s.t0, s.t1, { gain: st.swell })
  for (const t of (mu.hits || []).map(snap)) (st.hit || ((c, t) => c.m.crash(t, { gain: 0.05, len: 2.6 })))(c, t)
  st.extras?.(c)

  // drums
  for (const [part, d] of Object.entries(st.drums || {})) {
    for (let g = g0; g <= g1; g++) {
      const p = d.var4 && isVar4(g) ? d.var4 : d.pat, v = VEL[p[mod(g, p.length)]]; if (!v) continue
      const t = tOf(g) + (st.humanize ? (rnd() - 0.5) * st.humanize : 0); if (t < 0 || t >= DUR) continue
      const l = lv(part, t); if (l) d.fn(m, t, v * l, c)
    }
  }
  // bass (pattern language: R root · r ghost root · o octave · 5 fifth · 3 third · 7 seventh · b seventh below · a approach · W walk)
  if (st.bass) {
    const B = st.bass, ev = seqEvents(B.pat), ev4 = B.var4 && seqEvents(B.var4); let pEnd = -1, pF = 0
    for (let g = g0; g <= g1; g++) {
      const e = (ev4 && isVar4(g) ? ev4 : ev).get(mod(g, B.pat.length)); if (!e) continue
      const t = tOf(g); if (t < 0 || t >= DUR) continue
      const l = lv('bass', t); if (!l) { pEnd = -1; continue }
      const si = segIdx(t), sg = segs[si], iv = Q[sg.ch[1]], r = rootMidi(sg)
      let len = Math.min(e[1] * S16 * (B.legato ?? 0.9), sg.t1 - t - 0.012, outroAt - t - 0.01); if (len < 0.04) continue
      const nxt = segs[segIdx(t + e[1] * S16 + 0.01)], nr = rootMidi(nxt), sev = iv.find(i => i === 10 || i === 11) ?? 10
      let n
      switch (e[0]) {
        case 'o': n = r + 12; break
        case '5': n = r + (iv.includes(7) ? 7 : 5); break
        case '3': n = r + (iv.find(i => i === 3 || i === 4) ?? 2); break
        case '7': n = r + sev; break
        case 'b': n = r + sev - 12; break
        case 'a': n = nxt === sg ? r + 7 : (nr - 1 >= st.bassLo ? nr - 1 : nr + 1); break
        case 'W': {
          const k = Math.round((t - sg.t0) / BEAT), last = sg.t1 - t < BEAT * 1.5 && nxt !== sg
          n = k === 0 ? r : last ? (rnd() < 0.5 ? nr - 1 : nr + 1) : r + [iv.find(i => i === 3 || i === 4) ?? 2, 7, sev, 5, 9][Math.floor(rnd() * (k === 1 ? 2 : 5))]
          if (n > st.bassLo + 16) n -= 12
          break
        }
        default: n = r
      }
      const vel = e[0] === 'r' ? 0.45 : e[0] === 'R' ? 1 : 0.85
      const f = hz(n), legatoFrom = Math.abs(pEnd - t) < 0.03 ? pF : undefined
      B.fn(m, t, f, len, vel * l, { from: legatoFrom && legatoFrom !== f ? legatoFrom : undefined })
      pEnd = t + len; pF = f
    }
  }
  // comping parts
  for (const cp of st.comps || []) {
    const ev = seqEvents(cp.pat), ev4 = cp.var4 && seqEvents(cp.var4), V = voice(cp.range, cp.rootless)
    for (let g = g0; g <= g1; g++) {
      const e = (ev4 && isVar4(g) ? ev4 : ev).get(mod(g, cp.pat.length)); if (!e) continue
      const t = tOf(g); if (t < 0 || t >= DUR) continue
      const l = lv(cp.layer, t); if (!l) continue
      const si = segIdx(t), len = Math.min(e[1] * S16, segs[si].t1 - t, outroAt - t); if (len < 0.03) continue
      cp.fn(m, t, V[si].map(hz), len, VEL[e[0]] * l * (0.92 + 0.16 * rnd()), c)
    }
  }
  // pads: one sustained voice per chord, merged across section cuts
  for (const pd of st.pads || []) {
    const V = voice(pd.range, false); let cur = null
    const flush = () => { if (cur) pd.fn(m, cur.t0, cur.t1, cur.v.map(hz), cur.l, c); cur = null }
    segs.forEach((sg, i) => {
      const l = lv(pd.layer, sg.t0 + 1e-3)
      if (!l) return flush()
      if (cur && cur.l === l && cur.key === V[i].join() && Math.abs(cur.t1 - sg.t0) < 1e-4) { cur.t1 = sg.t1; return }
      flush(); cur = { t0: sg.t0, t1: sg.t1, v: V[i], l, key: V[i].join() }
    })
    flush()
  }
  // arp
  if (st.arp) {
    const A = st.arp, ev = A.every ?? 1, V = voice(A.range, false)
    for (let g = g0; g <= g1; g++) {
      if (mod(g, ev)) continue
      const t = tOf(g); if (t < 0 || t >= DUR) continue
      const l = lv('arp', t); if (!l) continue
      const si = segIdx(t), tones = [...V[si], ...V[si].map(n => n + 12)], k = mod(Math.floor(g / ev), A.order.length)
      let n = tones[A.order[k] % tones.length]
      if (A.rise) { const s = secAt(t); n += 12 * Math.min(A.rise, Math.floor((t - s.t0) / Math.max(BAR, s.t1 - s.t0) * (A.rise + 1))) }
      A.fn(m, t, hz(n), ev * S16, (k % 2 ? 0.75 : 1) * l, c)
    }
  }
  // lead: a seeded 2-bar motif + its varied answer, repeating every 4 bars from the drop, snapped to the chords
  if (st.lead) {
    const L = st.lead, bars = L.bars ?? 2, PS = bars * 16, A = makeMotif(rnd, L, bars), Bv = varyMotif(rnd, A, bars)
    const phrase = [...A, ...Bv.map(n => ({ ...n, s: n.s + PS }))], lr = tonicMidi(L.lo)
    const degMidi = d => lr + scale[mod(d, 7)] + 12 * Math.floor(d / 7)
    const third = n => { let best = 0, bd = 99; for (let d = -14; d < 21; d++) { const x = Math.abs(degMidi(d) - n); if (x < bd) { bd = x; best = d } } return degMidi(best + 2) }
    let pEnd = -1, pF = 0, last2 = [null, null]; DBG = process.argv.includes('--notes') ? [] : null
    if (DBG) console.log('chords:', segs.map(g => `${g.t0.toFixed(2)} ${NN[mod(tonic + g.ch[0], 12)]}${g.ch[1]} [${voice([52, 72])[segs.indexOf(g)].map(n => NN[mod(n, 12)]).join(' ')}]`).join(' | '))
    for (let rep = Math.floor(g0 / (2 * PS)); rep * 2 * PS <= g1; rep++) for (const nt of phrase) {
      const g = rep * 2 * PS + nt.s; if (g < g0 || g > g1) continue
      const t = tOf(g), l = lv('lead', t), lh = lv('leadHi', t); if (!l && !lh) { continue }
      const sg = segs[segIdx(t)]
      let n = degMidi(nt.d)
      if (nt.s % 8 === 0 || nt.len >= 4) n = nearestChordTone(n, sg)
      else if (pcsOf(sg.ch, false).includes(mod(n - 1, 12)) && !scale.map(x => mod(x + tonic, 12)).includes(mod(n, 12))) n -= 1
      if (n === last2[0] && n === last2[1]) { const p = pcsOf(sg.ch, false), dir = nt.d >= 4 ? -1 : 1; for (let o = 1; o < 6; o++) if (p.includes(mod(n + o * dir, 12))) { n += o * dir; break } }
      last2 = [last2[1], n]
      const len = Math.min(nt.len * S16 * (L.legato ?? 0.9), outroAt - t - 0.02); if (len < 0.05) continue
      const f = hz(n), from = L.glide && Math.abs(pEnd - t) < 0.06 && pF !== f ? pF : undefined
      if (DBG) DBG.push(`${t.toFixed(2)}:${NN[mod(n, 12)]}${Math.floor(n / 12) - 1}/${(len / S16).toFixed(0)}`)
      if (l) L.fn(m, t, f, len, l, { from })
      if (lh) L.fn(m, t, hz(L.hi === 'third' ? third(n) : n + 12), len, lh * 0.7, {})
      pEnd = t + nt.len * S16; pF = f
    }
  }
    if (DBG) console.log('lead:', DBG.join(' '))
  // the landing: the final chord at outroAt, ringing out to the end (the pads carry it via the outro layer)
  if (st.land) st.land(c)
  else {
    const si = segIdx(outroAt + 1e-3), ring = DUR - outroAt
    if (st.drums?.kick) st.drums.kick.fn(m, outroAt, 0.75, c)
    m.crash(outroAt, { gain: 0.035, len: Math.min(3, ring) })
    if (st.bass) st.bass.fn(m, outroAt, hz(rootMidi(segs[si])), Math.max(0.5, ring - 0.6), 0.8, {})
    for (const cp of st.comps || []) if (cp.layer === 'keys') cp.fn(m, outroAt, voice(cp.range, cp.rootless)[si].map(hz), Math.max(0.5, ring - 0.3), 0.85, c)
    if (st.lead) { const n = nearestChordTone(tonicMidi(st.lead.lo) + 12, segs[si]); st.lead.fn(m, outroAt + BEAT, hz(n), Math.min(1.6, ring * 0.4), 0.5, {}) }
  }
  const fadeLen = Math.max(0.8, Math.min(2, (DUR - outroAt) * 0.45))
  m.setMusicFade(DUR - fadeLen, DUR - 0.05)
  const busDefaults = { bass: { duck: 0.35 }, pad: { duck: 0.45, width: 1.25 }, keys: { duck: 0.2 } }
  for (const [b, cfg] of Object.entries({ ...busDefaults, ...(st.fx || {}) })) m.busFx(b, cfg)
  // pitched SFX follow the key: shift from the films' D-major palette to this key's parent major (nearest way round)
  const parent = mod(tonic + PARENT[st.mode], 12), cueShift = mu.cueShift ?? (mod(parent - 2 + 6, 12) - 6)
  return {
    cueShift, sections: S, tonic, mode: st.mode,
    master: { lufs: mu.lufs ?? -15, musicRel: mu.musicRel ?? st.musicRel ?? -4.5, levels: { drums: 0, bass: -2, pad: -8, keys: -7, lead: -5, fx: -9, ...(st.mix || {}) }, reverb: { ...(st.reverb || {}), wet: st.reverbWet ?? 2.6 }, delay: { time: (st.delayTime ?? 0.75) * BEAT, wet: 0.5 } },
  }
}
const PITCHED = new Set(['pop', 'pluck', 'bell'])
const here = path.dirname(fileURLToPath(import.meta.url))
const id = (process.argv.find(a => a.startsWith('--teaser=')) || '').split('=')[1]
const film2 = process.argv.includes('--film2')
const film3 = process.argv.includes('--film3')
const film = (process.argv.find(a => a.startsWith('--film=')) || '').split('=')[1]
if (!id && !film2 && !film3 && !film) { console.error('usage: --teaser=<id> | --film2'); process.exit(1) }
const T = film ? (await import(`../films/${film}/cues.js`)).default : film3 ? (await import('../film3/cues.js')).default : film2 ? (await import('../film2/cues.js')).default : (await import(`../teasers/t${id}.js`)).default
if (T.loop) {
  // seamless loop: two cycles scheduled, second one kept
  const L = T.duration, m = createMix(2 * L)
  const mu = T.music || {}
  const chords = (mu.chords || []).flatMap(([a, b, c]) => [[a, b, c], [a + L, b + L, c]])
  m.pad(chords, mu.padGain ?? 0.022)
  if (mu.bpm) { m.pulse(0, 2 * L, mu.bpm, mu.pulseGain ?? 0.24); if (mu.hats !== false) m.hats(0, 2 * L, mu.bpm, mu.hatGain ?? 0.04) }
  for (const [kind, ...a] of T.cues || []) { m[kind](...a); const b = [...a]; b[0] += L; if (kind === 'glitter' || kind === 'riser') b[1] += L; m[kind](...b) }
  const out = path.join(here, `../out/teasers/${id}.wav`)
  m.renderLoop(out, L)
  console.log('loop sound →', path.relative(process.cwd(), out))
  process.exit(0)
}
if (T.music?.style) {
  // styled score (see the arranger above); the film's cues play on top, pitched ones moved into the score's key
  const m = createMix(T.duration), res = scoreStyle(m, T), k = 2 ** (res.cueShift / 12)
  for (const [kind, ...a] of T.cues || []) { if (res.cueShift && PITCHED.has(kind)) a[1] *= k; m[kind](...a) }
  const out = film ? path.join(here, `../out/films/${film}/soundtrack.wav`) : path.join(here, `../out/teasers/${id}.wav`)
  const stems = (process.argv.find(a => a.startsWith('--stems=')) || '').split('=')[1] || null
  const r = m.renderMaster(out, { ...res.master, log: process.argv.includes('--debug'), stems })
  if (process.argv.includes('--debug')) console.log(res.sections.map(s => `${s.type} ${s.t0.toFixed(2)}–${s.t1.toFixed(2)}`).join(' · '), '\n', r)
  console.log(`${T.music.style} score (cues ${res.cueShift >= 0 ? '+' : ''}${res.cueShift} st) → ${path.relative(process.cwd(), out)}  ${r.lufs.toFixed(1)} LUFS, peak ${r.peakDb.toFixed(1)} dBFS, music ${r.musicGainDb.toFixed(1)} dB`)
  process.exit(0)
}
const m = createMix(T.duration)
const music = T.music || {}
m.pad(music.chords || [[0, T.duration, [146.83, 220, 329.63, 369.99, 554.37]]], music.padGain ?? 0.022)
if (music.bpm) m.pulse(music.beatFrom ?? 0.5, music.beatTo ?? T.duration - 2.5, music.bpm, music.pulseGain ?? 0.26)
if (music.bpm && music.hatGain) m.hats(music.beatFrom ?? 0.5, music.beatTo ?? T.duration - 2.5, music.bpm, music.hatGain)
if (music.arpGain) m.arp(music.chords, music.bpm, music.arpFrom ?? music.beatFrom ?? 0.5, music.arpTo ?? music.beatTo ?? T.duration - 2.5, music.arpGain)
for (const [kind, ...a] of T.cues || []) m[kind](...a)
// shared end tag (see kit.endTag): rings, chakra chimes, wordmark, moon row
if (T.endTagAt != null) {
  const s = T.endTagAt
  m.whoosh(s + 0.1, 0.5, 0.08)
  ;[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].forEach((f, i) => m.bell(s + 0.35 + i * 0.06, f, 0.06, 2.2, (i - 3) * 0.12))
  ;[261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99].forEach((f, i) => m.bell(s + 1.1 + i * 0.06, f, 0.02, 1.2, (i - 4) * 0.1))
}
const out = film ? path.join(here, `../out/films/${film}/soundtrack.wav`) : film3 ? path.join(here, '../out/film3/soundtrack.wav') : film2 ? path.join(here, '../out/film2/soundtrack.wav') : path.join(here, `../out/teasers/${id}.wav`)
m.render(out)
console.log('teaser sound →', path.relative(process.cwd(), out))
