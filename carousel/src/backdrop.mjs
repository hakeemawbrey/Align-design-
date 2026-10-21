// Assigns slide backgrounds from the text, following SPEC.md:
// - the sign's figure opens the carousel, held 2–3 slides with zoom creeping
//   1.0 -> 1.3 and the focus drifting, like one camera move;
// - the mood turn ("but", "and still", ...) cuts to a neon in the element's tint;
// - after the turn the sign's aura is held with the same slow push-in;
// - a slide that talks about faces / looks / photos gets a `veil` (a blurred card);
// - a slide about 11:11 / the night gets a `sky` with a moon.
// Used by both engines (bank.mjs and ai.mjs), so the look stays consistent.

import { ELEMENT, SIGNS } from './schema.mjs'
import { makeRng, hash } from './rng.mjs'

export const ELEMENT_TINTS = {
  fire: ['ember', 'rub'],
  earth: ['gold', 'spark'],
  air: ['tide', 'violet'],
  water: ['violet', 'tide'],
}

const VEIL_RE = /\b(face|faces|looks|photo|photos|pic|pics|selfie|selfies|swiped|swipe|profile|pretty)\b/
const SKY_RE = /11:11|\bnight\b|midnight|tonight|\b\d{1,2}\s?am\b|\bmoon\b|\bstars?\b|\bsky\b|\basleep\b|\bawake\b|\bsleep\b/
const TURN_START_RE = /^(but|and still|and yet|and somehow|which is|a real gift|all true|it's a gift|still|except|instead|meanwhile)\b/
const TURN_ANY_RE = /\b(but|still|yet|except|instead)\b/

const round2 = (x) => Math.round(x * 100) / 100
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x))

/** Which slide is the mood turn: the first "but / and still" after the hook. */
export function findTurn(texts) {
  const n = texts.length
  const lo = 2
  const hi = n - 2
  for (let i = lo; i <= hi; i++) if (TURN_START_RE.test(texts[i])) return i
  for (let i = lo; i <= hi; i++) if (TURN_ANY_RE.test(texts[i])) return i
  return clamp(Math.floor(n / 2), lo, hi)
}

/**
 * Returns a copy of the carousel with every slide's `bg` (re)assigned.
 * Deterministic for a given carousel id + seed.
 */
export function assignBackgrounds(carousel, seed = 0, { turn: turnHint } = {}) {
  const rng = makeRng(hash(`${carousel.id ?? ''}:${seed}`))
  const slides = carousel.slides.map((s) => ({ ...s }))
  const texts = slides.map((s) => String(s.text ?? '').replace(/\n/g, ' ').toLowerCase())
  const n = slides.length
  const sign = (carousel.signs ?? []).find((s) => SIGNS.includes(s))
  const tints = sign ? ELEMENT_TINTS[ELEMENT[sign]] : ['violet', 'rub']
  const turn = Number.isInteger(turnHint) && turnHint >= 2 && turnHint <= n - 2 ? turnHint : findTurn(texts)
  const special = texts.map((t) => (VEIL_RE.test(t) ? 'veil' : SKY_RE.test(t) ? 'sky' : null))

  // 1. a scene key per slide (before zoom/focus)
  //    opening: held 2–3 slides. It's the sign's figure, unless slide 1 or 2
  //    talks about faces or the night, in which case that scene opens and the
  //    figure comes in after it.
  // when the sign is named mid-sentence ("if they wanted to, / they would, /
  // scorpio,"), the opening ends there so the sign's art lands on its name
  const signAt = sign ? texts.findIndex((t, i) => i >= 2 && i <= 3 && i <= turn && t.startsWith(sign)) : -1
  const open = signAt > 0 ? signAt : clamp(turn, 2, 3)
  const openKind = special[0] || special[1] || (sign ? 'figure' : 'sky')
  const gapKind = openKind === 'figure' ? 'aura' : sign ? 'figure' : 'neon1'
  const scene = new Array(n)
  for (let i = 0; i < n; i++) {
    if (i < open) scene[i] = openKind
    else if (i < turn) scene[i] = gapKind
    else if (i === turn) scene[i] = 'neon0'
    else if (i === n - 1 && n - 1 - turn >= 3) scene[i] = 'neon1'
    else scene[i] = sign ? 'aura' : 'neon1'
  }

  // 2. text overrides after the opening: veil for faces/photos, sky for
  //    11:11 / night lines. The override holds onto the next slide too,
  //    unless that slide is the turn, the last slide, or has its own.
  for (let i = open; i < n; i++) {
    if (!special[i] || i === turn) continue
    scene[i] = special[i]
    const j = i + 1
    if (j < n - 1 && j !== turn && !special[j]) scene[j] = special[i]
  }

  // 2b. no held shot longer than 3 slides: split 4 -> 2+2, 5 -> 3+2, 6 -> 3+3,
  //     cutting between figure and aura (or to a fresh framing of the same scene)
  for (let i = 0; i < n; ) {
    let j = i
    while (j + 1 < n && scene[j + 1] === scene[i]) j++
    const len = j - i + 1
    if (len > 3) {
      const first = Math.ceil(len / 2)
      const alt = { figure: 'aura', aura: 'figure' }[scene[i]] ?? `${scene[i]}#2`
      for (let k = i + first; k <= j; k++) scene[k] = alt
    }
    i = j + 1
  }

  // 3. resolve scenes to bg objects; consecutive equal scenes form a held shot
  const person = 1 + rng.int(12)
  const moon = round2(rng.range(0.15, 0.85))
  const skyTint = rng.pick(['violet', 'tide'])
  let i = 0
  while (i < n) {
    let j = i
    while (j + 1 < n && scene[j + 1] === scene[i]) j++
    const len = j - i + 1
    // focus starts near the art's upper middle and drifts a few % per slide
    let fx = 50 + rng.int(9) - 4
    let fy = 38 + rng.int(11) - 5
    const dx = rng.pick([-3, -2, 2, 3])
    const dy = rng.pick([-3, -2, -1, 1, 2])
    for (let k = 0; k <= j - i; k++) {
      const zoom = len === 1 ? 1.1 : round2(1 + (0.3 * k) / (len - 1))
      const focus = `${clamp(fx + dx * k, 20, 80)}% ${clamp(fy + dy * k, 20, 70)}%`
      slides[i + k].bg = bgFor(scene[i].split('#')[0], { sign, tints, person, moon, skyTint, zoom, focus, held: len > 1, k })
    }
    i = j + 1
  }
  return { ...carousel, slides }
}

function bgFor(kind, o) {
  switch (kind) {
    case 'figure':
    case 'aura': {
      const bg = { kind, sign: o.sign, zoom: o.zoom }
      if (o.held && o.k > 0) bg.focus = o.focus
      return bg
    }
    case 'veil': {
      const bg = { kind: 'veil', person: o.person, zoom: round2(clamp(o.zoom + 0.05, 1, 1.6)) }
      if (o.held && o.k > 0) bg.focus = o.focus
      return bg
    }
    case 'sky':
      return { kind: 'sky', tint: o.skyTint, moon: o.moon, ...(o.held ? { zoom: o.zoom } : {}) }
    case 'neon0':
      return { kind: 'neon', tint: o.tints[0] }
    case 'neon1':
      return { kind: 'neon', tint: o.tints[1] }
    default:
      return { kind: 'neon', tint: o.tints[0] }
  }
}
