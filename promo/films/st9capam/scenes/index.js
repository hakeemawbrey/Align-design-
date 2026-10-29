// st9capam (22 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E46) · story 0–17.6, then the end card.
//   MORNING with Capricorn. "POV: a Capricorn's morning started *yesterday.*"  The vlog chrome (../../st9day.js) on
//   Capricorn's home (../../st9caphome.js, ep 'am': the goat pin on the poster's lowest ledge).
//   0.00  Frame 0 / thumbnail: the bedroom before dawn, Capricorn wide awake in bed with its tie ALREADY on, staring at the
//         Saturn clock: 4:59. CAP: "the alarm is a *backup.*"
//   2.85  5:00: the clock rings and shakes (punch-in). 5:00 AM — alarm is a *formality.*
//   5.80  whip → the kitchen: coffee, and the morning spreadsheet types on: COFFEE ✓ · RUN ✓ · INBOX 0 ✓ · REST ✗.
//         (the ghost rises from behind the coffee machine)
//   9.10  Saturn rises in the window, squinting: "you forgot a *row.*"  ★ ASTROLOGY SAYS — Capricorn is ruled by Saturn.
//  12.10  The REST row gets filled: "6:00 · REST · 15 MIN" ✓, highlighted green.
//  13.40  whip → the bedroom again (rhymes with frame 0): same framing, Capricorn lying back, eyes closed, clock 6:00.
//         LAST: "Rest is part of the *plan.*"
// One canvas (sky + day tint + home + cast + chrome), DOM type (hook, stamps, last line), grain. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { gaspZoom, drawSaturn, SATURN } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { bubble, bubbleCues, whip, whipCues, popIn } from '../../st9saghome.js'
import { CAP, drawCapHome, drawCapHomeFront, drawCap, drawSheet } from '../../st9caphome.js'

export const DURATION = 22
const KEY = 'Em'
const STORY_END = DURATION - ENDCARD_LEN       // 17.6
const MINT = '#7fe8c4'

const T = {
  hookOut: 2.6, ring: 2.85, ringOff: 4.4, kitchen: 5.8, ghost: 7.5, sheet: 6.0, saturn: 9.1, rest: 12.1,
  bed: 13.4, last: 14.9, out: [17.15, 17.55],
}
const SAT_TAG = SATURN.tag
const B = [
  { at: 0.55, out: 2.6, x: 450, y: 960, text: 'the alarm is a *backup.*', tag: CAP.tag, tagColor: CAP.color, w: 520 },
  { at: 9.6, out: 12.0, x: 700, y: 676, text: 'you forgot a *row.*', tag: SAT_TAG, tagColor: '#e2bf72', w: 440, tail: 'down', tailX: 0.6 },
]
const STAMPS = [
  { at: 3.1, out: 5.6, time: '5:00 AM', text: 'alarm is a *formality*' },
  { at: 6.3, out: 8.9, time: '5:20 AM', text: 'already *ahead*' },
  { at: 13.7, out: 17.1, time: '6:00 AM', text: 'rest: *scheduled*' },
]
const FACT = { at: 9.45, dur: 2.2, text: 'Capricorn is ruled by Saturn.', label: '★ ASTROLOGY SAYS', y: 1320 }
const LAST = 'Rest is part | of the *plan.*'
const CLOCK = [
  { t: 0, from: '4:59', to: '5:00', at: T.ring - 0.15, dur: 0.2 },
  { t: T.kitchen, from: '5:00', to: '5:20', at: T.kitchen + 0.05, dur: 0.8 },
  { t: T.bed, from: '5:20', to: '6:00', at: T.bed + 0.05, dur: 0.7 },
]
const ROWS = [
  { at: 6.2, cells: ['5:01', 'COFFEE'], check: true },
  { at: 6.75, cells: ['5:05', 'RUN 5K'], check: true },
  { at: 7.3, cells: ['5:20', 'INBOX 0'], check: true },
  { at: 7.9, cells: ['?:??', 'REST'], check: false, color: '#c94a4a' },
]
const REST_ROW = { at: T.rest, cells: ['6:00', 'REST 15 MIN'], check: true, hl: { at: T.rest + 0.7, color: '#bff0d4' } }
export const GHOST = { at: T.ghost, x: 180, y: 1082, from: 'below', where: 'rising from behind the kitchen counter’s edge, just under the morning spreadsheet' }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const hour = t => lerp(4.9, 6.2, t / STORY_END)

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "700 40px Inter", "800 112px Inter", "italic 600 48px 'EB Garamond'", "italic 500 170px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'POV: a Capricorn’s morning started *yesterday.*', at: 0, out: T.hookOut, accentColor: MINT, size: 82, accentSize: 122 })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, accentColor: MINT }))
  const last = popText(root, LAST, { top: 262, size: 104, accentSize: 160, at: T.last, gap: 0.08, accentColor: MINT, wobble: true, late: 2, lateAt: T.last + 0.35, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out)
      drawSky(x, t); daySky(x, t, { hour: hour(t) })
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const z1 = gaspZoom(t, { at: T.ring, dur: 1.2, x: 725, y: 1068, amount: 0.3, follow: 0.35 })
      const z2 = gaspZoom(t, { at: T.rest + 0.6, dur: 1.2, x: 330, y: 900, amount: 0.22, follow: 0.3 })
      x.save()
      if (ok < 1) { const s = lerp(0.9, 1, ok); x.globalAlpha = ok; x.translate(540, 1030); x.scale(s, s); x.translate(-540, -1030) }
      z1.apply(x); z2.apply(x)
      if (t < T.kitchen) {
        const ringing = t >= T.ring && t < T.ringOff
        drawCapHome(x, t, { room: 'bed', ep: 'am', dark: 0.45, clock: t < T.ring ? '4:59' : '5:00', ring: ringing, tieOnHook: false })
        drawCap(x, 400, 1080, 270, t, { mood: t < T.ring ? 'wide' : t < T.ringOff ? 'squint' : 'happy', look: [1, 0], blink: t < T.ring ? false : undefined, hops: [0.1, 1.2, T.ring + 0.05, T.ringOff], seed: 6 })
        drawCapHomeFront(x, t, { room: 'bed' })
      } else if (t < T.bed) {
        drawCapHome(x, t, { room: 'kitchen', ep: 'am', friday: 'free', clock: '5:20' })
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
        // Saturn rises into the kitchen window
        const sp = popIn(t, T.saturn, 0.5, 1.6) * (1 - ease.inCubic(prog(t, T.bed - 0.6, T.bed - 0.2)))
        if (sp > 0.02) { x.save(); x.beginPath(); x.rect(560, 640, 360, 290); x.clip(); drawSaturn(x, 740, lerp(1100, 800, sp), 300, t, { mood: 'squint', look: [-1, 1], pointer: true }); x.restore() }
        const r = drawCap(x, 720, 1150, 250, t, { mood: t > T.saturn && t < T.rest ? 'wide' : 'neutral', look: t > T.saturn && t < T.rest ? [0, -1] : [-1, -0.5], hops: [T.kitchen + 0.1, 6.8, 7.4, T.saturn + 0.1, T.rest + 0.1, T.rest + 0.8], seed: 6 })
        void r
        drawSheet(x, t, { x: 320, y: 840, w: 470, h: 360, title: 'MORNING_v12.xlsx', cols: ['TIME', 'TASK'], widths: [130, 296], rows: t < T.rest ? ROWS : [...ROWS.slice(0, 3), REST_ROW], pop: popIn(t, T.sheet, 0.3, 2), size: 28 })
      } else {
        // the last shot rhymes with frame 0: same bed, same framing, now lying back, eyes closed
        drawCapHome(x, t, { room: 'bed', ep: 'am', clock: '6:00', tieOnHook: false })
        drawCap(x, 400, 1100, 270, t, { mood: 'sleepy', look: [0, 0], squash: 0.08, hops: [T.bed + 0.1], seed: 6, tie: 'loose' })
        drawCapHomeFront(x, t, { room: 'bed' })
      }
      bubble(x, t, B[0]); bubble(x, t, B[1])
      x.restore()
      factChip(x, t, FACT)
      whip(x, t, T.kitchen, { dir: 1 }); whip(x, t, T.bed, { dir: -1 })
      const c = [...CLOCK].reverse().find(s => t >= s.t)
      drawClock(x, t, { from: c.from, to: c.to, at: c.at, dur: c.dur, sign: 'cap' })
      drawRecFrame(x, t, { battery: 1, time: `00:${String(Math.floor(t)).padStart(2, '0')}` })
      hook.update(t); for (const s of stamps) s.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.kitchen, kind: 'flip' }, { t: T.bed, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E46' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [329.63, 392, 440, 493.88, 587.33, 659.25, 783.99]
const alarm = () => { const o = []; for (let t = T.ring; t < T.ringOff; t += 0.16) o.push(['pop', r3(t), (Math.round((t - T.ring) / 0.16) % 2) ? 1567.98 : 1318.51, 0.035, 0.4]); return o }
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...bubbleCues(B, { pitch: { [CAP.tag]: 523.25, [SAT_TAG]: 392 } }),
  ...alarm(), ['tick', T.ringOff, 0.06],
  ...clockCues(CLOCK[0].at, CLOCK[0].dur), ...clockCues(CLOCK[1].at, CLOCK[1].dur), ...clockCues(CLOCK[2].at, CLOCK[2].dur),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ...whipCues(T.kitchen), ...whipCues(T.bed),
  ['pop', T.sheet + 0.05, 783.99, 0.04, -0.3],
  ...ROWS.map((r, i) => ['pluck', r3(r.at + 0.3), r.check ? NOTE[i + 2] : 220, 0.035, 0.4, -0.2]),
  ['tick', T.ghost + 0.05, 0.015],
  ['riser', T.saturn - 0.5, T.saturn + 0.1, 0.05], ['boom', T.saturn + 0.12, 0.12],
  ...factChipCues(FACT.at, { dur: FACT.dur }),
  ['pluck', r3(T.rest + 0.5), 659.25, 0.045, 0.6, -0.2], ['bell', r3(T.rest + 0.75), 1318.51, 0.035, 1.2, 0],
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.last + i * 0.08), NOTE[i + 1], 0.026, (i % 2 ? 0.15 : -0.15)]),
  ['pop', r3(T.last + 0.35), 987.77, 0.05, 0], ['pluck', r3(T.last + 0.35), 659.25, 0.045, 0.6, 0], ['bell', r3(T.last + 0.45), 1318.51, 0.03, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void clamp
