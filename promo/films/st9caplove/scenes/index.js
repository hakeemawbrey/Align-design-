// st9caplove (30 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E48) · story 0–25.6, then the end card.
//   DATE NIGHT with Capricorn and Cancer (its season-4 partner) at Capricorn's home (../../st9caphome.js, ep 'love').
//   0.00  Frame 0 / thumbnail: the kitchen at 7 PM, Capricorn typing DATE_NIGHT_v3.xlsx (7:00 DINNER (SOUP) already in).
//         Hook: "A Capricorn schedules a date… in a *spreadsheet.*"  The rows type on: WALK 0.8 MI · DESSERT · FUN.
//   4.20  Cancer hops in. CANCER: "you made a *spreadsheet?*"  CAP: "with conditional *formatting.*" (the FUN cell blinks pink)
//   9.60  whip → the window room: the armchair, the night sky, a dotted TROPIC OF CAPRICORN across the glass.
//         ★ REAL SKY — the Sun stood in Capricorn at the December solstice when the Tropic of Capricorn was named.
//         (the ghost rises over the reading-lamp shade)
//  13.20  whip → the kitchen: Cancer has added a row: 9:30 · ??? (SURPRISE). CAP: "an *unscheduled* row?!"
//         CANCER: "trust me. *dance?*"  19.0: they dance in the kitchen, notes and sparkles.
//  21.50  Rhymes with frame 0: same laptop, same sheet, Cancer beside; Capricorn highlights FUN (and ???).
//         LAST: "Schedule the *fun,* too."
// Pure f(t).
import { lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { R, bubble, bubbleCues, whip, whipCues, popIn, drawHeart } from '../../st9saghome.js'
import { CAP, CAP_SPOTS, drawCapHome, drawCapHomeFront, drawCap, drawSheet } from '../../st9caphome.js'

export const DURATION = 30
const KEY = 'Bbm'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const MINT = '#7fe8c4', PINK = '#ff8fb1', GOLD = '#f2c75c', BONE = '#efe6d6'
const MONO = "'Space Mono', ui-monospace, monospace"
const CAN = { ...signStar('cancer'), tag: '♋ CANCER' }

const T = {
  hookOut: 2.6, cancer: 4.2, window: 9.6, ghost: 11.6, kitchen: 13.2, newRow: 13.5, gasp: 14.4, dance: 19.0,
  rhyme: 21.5, hlFun: 21.8, last: 22.6, out: [25.15, 25.55],
}
const B = [
  { at: 4.65, out: 6.9, x: 880, y: 1000, text: 'you made a *spreadsheet?*', tag: CAN.tag, tagColor: CAN.color, w: 480, tailX: 0.75 },
  { at: 7.0, out: 9.4, x: 700, y: 990, text: 'with conditional *formatting.*', tag: CAP.tag, tagColor: CAP.color, w: 520, tailX: 0.6 },
  { at: 14.6, out: 16.6, x: 700, y: 990, text: 'an *unscheduled* row?!', tag: CAP.tag, tagColor: CAP.color, w: 480, tailX: 0.6 },
  { at: 16.7, out: 18.9, x: 880, y: 1000, text: 'trust me. *dance?*', tag: CAN.tag, tagColor: CAN.color, w: 420, tailX: 0.75 },
]
const STAMPS = [
  { at: 1.0, out: 3.9, time: '7:00 PM', text: 'date night, *v3*' },
  { at: 10.0, out: 12.8, time: '8:30 PM', text: 'dessert, *on time*' },
  { at: 19.3, out: 21.3, time: '9:30 PM', text: '??? was *dancing*' },
]
const FACT = { at: 10.15, dur: 2.7, text: 'The Sun stood in Capricorn at the December solstice when the Tropic of Capricorn got its name.', label: '★ REAL SKY', y: 1310 }
const LAST = 'Schedule the | *fun,* too.'
const CLOCK = [
  { t: 0, from: '7:00 PM', to: '7:00 PM', at: 0, dur: 0.1 },
  { t: T.window, from: '7:00 PM', to: '8:30 PM', at: T.window + 0.05, dur: 0.7 },
  { t: T.kitchen, from: '8:30 PM', to: '9:30 PM', at: T.kitchen + 0.05, dur: 0.6 },
  { t: T.rhyme, from: '9:30 PM', to: '10:00 PM', at: T.rhyme + 0.05, dur: 0.5 },
]
const ROWS = [
  { at: -2, cells: ['7:00', 'DINNER (SOUP)'] },
  { at: 0.8, cells: ['7:45', 'WALK 0.8 MI'] },
  { at: 1.8, cells: ['8:30', 'DESSERT'] },
  { at: 2.8, cells: ['9:00', 'FUN'] },
]
const NEW_ROW = { at: T.newRow, cells: ['9:30', '??? (SURPRISE)'], color: '#c94a4a' }
export const GHOST = { at: T.ghost, ...CAP_SPOTS.window }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const hour = t => lerp(18.8, 22, t / STORY_END)
const scene = t => (t < T.window ? 'k1' : t < T.kitchen ? 'win' : 'k2')

function rows(t) {
  const fun = { ...ROWS[3] }
  if (t > 7.6 && t < T.rhyme) fun.hl = { at: 7.6, color: Math.floor(t * 4) % 2 ? '#ffc2d6' : '#fff2a8' }      // conditional formatting
  if (t >= T.hlFun) fun.hl = { at: T.hlFun, color: '#fff2a8' }
  const out = [ROWS[0], ROWS[1], ROWS[2], fun]
  if (t >= T.kitchen) out.push(t >= T.hlFun + 0.4 ? { ...NEW_ROW, color: '#1f7a4f', hl: { at: T.hlFun + 0.4, color: '#bff0d4' } } : NEW_ROW)
  return out
}
function tropic(x, t) {
  const y = 880, k = popIn(t, T.window + 0.5, 0.4, 1.6)
  if (k <= 0.02) return
  x.save(); x.globalAlpha = Math.min(1, k)
  for (let xx = 310; xx < 970; xx += 22) R(x, GOLD, xx, y, 12, 4)
  x.font = `700 20px ${MONO}`; x.fillStyle = GOLD; x.fillText('TROPIC OF CAPRICORN', 330, y - 12)
  drawPixelStar(x, 880, 700, 40, 2, '#ffe9a0')
  x.restore()
}
function notes(x, t, cx, cy) {
  if (t < T.dance || t > T.rhyme) return
  for (let i = 0; i < 6; i++) {
    const ph = ((t - T.dance) * 0.7 + i / 6) % 1
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph)
    x.font = '800 54px Inter'; x.fillStyle = [GOLD, PINK, MINT][i % 3]
    x.fillText(i % 2 ? '♪' : '♫', cx - 300 + i * 110 + Math.sin(t * 3 + i) * 20, cy - ph * 220)
    x.restore()
  }
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "700 40px Inter", "800 112px Inter", "italic 600 48px 'EB Garamond'", "italic 500 170px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Capricorn schedules a date… in a *spreadsheet.*', at: 0, out: T.hookOut, accentColor: MINT, size: 76, accentSize: 112, top: 250 })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, accentColor: MINT }))
  const last = popText(root, LAST, { top: 262, size: 108, accentSize: 168, at: T.last, gap: 0.08, accentColor: MINT, wobble: true, late: 2, lateAt: T.last + 0.35, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out), sc = scene(t)
      drawSky(x, t); daySky(x, t, { hour: hour(t) })
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const z1 = gaspZoom(t, { at: T.cancer + 0.45, dur: 1.1, x: 900, y: 1150, amount: 0.2, follow: 0.3 })
      const z2 = gaspZoom(t, { at: T.gasp, dur: 1.3, x: 720, y: 1130, amount: 0.3, follow: 0.4 })
      x.save()
      if (ok < 1) { const s = lerp(0.9, 1, ok); x.globalAlpha = ok; x.translate(540, 1030); x.scale(s, s); x.translate(-540, -1030) }
      z1.apply(x); z2.apply(x)
      if (sc === 'win') {
        drawCapHome(x, t, { room: 'window', ep: 'love', clock: '8:30', lamp: 0.7 })
        tropic(x, t)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
        drawCap(x, 500, 1070, 250, t, { mood: 'happy', look: [1, -1], seed: 6, hops: [T.window + 0.1] })
        drawStarChar(x, 690, 1080, 236, t, { color: CAN.color, glyph: CAN.glyph, mood: 'heart', look: [-1, -1], seed: 8, glow: 0.8, hops: [T.window + 0.2] })
        drawCapHomeFront(x, t, { room: 'window' })
        drawHeart(x, 595, 930 - Math.sin(t * 2) * 10, 7, 0.9)
      } else {
        drawCapHome(x, t, { room: 'kitchen', ep: 'love', friday: 'heart', clock: sc === 'k1' ? '7:00' : '9:30', steam: false })
        const dancing = t >= T.dance && t < T.rhyme
        const dx = dancing ? Math.sin((t - T.dance) * 5) * 40 : 0
        const capHops = dancing ? Array.from({ length: 16 }, (_, i) => T.dance + i * 0.32) : [0.15, 0.9, 1.9, 2.9, 7.1, T.gasp, T.hlFun]
        const canIn = popIn(t, T.cancer, 0.35, 2)
        const capMood = t > T.gasp - 0.1 && t < 16.8 ? 'wide' : t > 16.8 && t < T.dance ? 'squint' : dancing || t > T.rhyme ? 'happy' : 'neutral'
        drawCap(x, 720 - dx, 1150, 250, t, { mood: capMood, look: t < T.cancer + 0.3 ? [-1, -0.5] : [1, 0], seed: 6, hops: capHops, blink: capMood === 'wide' ? false : undefined })
        if (canIn > 0.02) {
          const canHops = dancing ? Array.from({ length: 16 }, (_, i) => T.dance + 0.16 + i * 0.32) : [T.cancer + 0.1, 4.8, 5.6, T.newRow, 16.9, 17.6]
          drawStarChar(x, 910 + dx, 1160, 220, t, { color: CAN.color, glyph: CAN.glyph, pop: canIn, mood: t < 7.0 ? 'wide' : t < 9.4 ? 'heart' : 'happy', look: [-1, 0], seed: 8, glow: 0.8, hops: canHops })
        }
        drawSheet(x, t, { x: 320, y: 840, w: 480, h: 380, title: 'DATE_NIGHT_v3.xlsx', cols: ['TIME', 'PLAN'], widths: [120, 316], rows: rows(t), size: 26 })
        notes(x, t, 720, 1000)
        if (t > T.rhyme + 0.6) drawHeart(x, 815, 960 - Math.sin(t * 3) * 8, 7, 1)
      }
      for (const b of B) bubble(x, t, b)
      x.restore()
      if (t >= T.dance && t < T.rhyme) {      // the kitchen-disco tint
        x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.1; x.fillStyle = ['#ff4f86', '#5fd0ff', '#f7c948'][Math.floor(t * 3) % 3]; x.fillRect(50, 560, 980, 940); x.restore()
      }
      factChip(x, t, FACT)
      whip(x, t, T.window, { dir: 1 }); whip(x, t, T.kitchen, { dir: -1 })
      const c = [...CLOCK].reverse().find(s => t >= s.t)
      drawClock(x, t, { from: c.from, to: c.to, at: c.at, dur: c.dur, sign: 'cap' })
      drawRecFrame(x, t, { battery: lerp(0.6, 0.3, t / STORY_END), time: `00:${String(Math.floor(t)).padStart(2, '0')}` })
      hook.update(t); for (const s of stamps) s.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.window, kind: 'flip' }, { t: T.kitchen, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E48' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [466.16, 554.37, 622.25, 698.46, 830.61, 932.33, 1108.73]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...ROWS.slice(1).map((r, i) => ['pluck', r3(r.at + 0.3), NOTE[i + 1], 0.035, 0.4, -0.3]),
  ...bubbleCues(B, { pitch: { [CAP.tag]: 523.25, [CAN.tag]: 830.61 } }),
  ['bell', T.cancer, 1396.91, 0.04, 1.2, 0.4], ['pop', T.cancer + 0.1, 932.33, 0.045, 0.4],
  ['glitter', 7.6, 8.2],
  ...clockCues(CLOCK[1].at, CLOCK[1].dur), ...clockCues(CLOCK[2].at, CLOCK[2].dur), ...clockCues(CLOCK[3].at, CLOCK[3].dur),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ...whipCues(T.window), ...whipCues(T.kitchen),
  ['tick', T.ghost + 0.05, 0.015],
  ...factChipCues(FACT.at, { dur: FACT.dur }),
  ['pluck', r3(T.newRow + 0.4), 220, 0.04, 0.5, -0.3],
  ['whoosh', T.gasp, 0.3, 0.03], ['boom', T.gasp, 0.1],
  ...Array.from({ length: 8 }, (_, i) => ['pop', r3(T.dance + i * 0.32), NOTE[(i * 3) % 7], 0.03, (i % 2 ? 0.3 : -0.3)]),
  ['glitter', T.dance, T.dance + 0.8],
  ['pluck', r3(T.hlFun), 932.33, 0.04, 0.5, -0.2], ['pluck', r3(T.hlFun + 0.4), 1108.73, 0.04, 0.5, -0.2],
  ...[0, 1, 2].map(i => ['pop', r3(T.last + i * 0.08), NOTE[i + 1], 0.026, (i % 2 ? 0.15 : -0.15)]),
  ['pop', r3(T.last + 0.35), 1108.73, 0.05, 0], ['pluck', r3(T.last + 0.35), 698.46, 0.045, 0.6, 0], ['bell', r3(T.last + 0.45), 1396.91, 0.03, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void BONE
