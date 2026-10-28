// st7typhon (30 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 03) · story 0–25.6, then the shared end card.
//   Capricorn × Pisces on a late-night phone call, split screen. In Greek myth both fled the monster Typhon by turning
//   (partly) into fish: one story says Pan leapt into a river and became the goat-fish (Capricorn); Aphrodite and Eros
//   became two fish tied by a cord so they wouldn't lose each other (Pisces).
//   0.00–2.60  opener: ★ SIGN TO SIGN ★ · ♑ × ♓ · "a phone call, 2:14 a.m."
//   2.7        "A *late-night* call."  Left pane: Capricorn at its desk lamp. Right pane: Pisces in bed. Both on the phone.
//   ~6         Typhon (a storm cloud with red eyes) rolls across both panes behind them.
//   ~9         "so you panicked into a fish too?" Capricorn grows its sea-goat tail; two fish on a cord swim into Pisces' pane.
//   ~22        CAPRICORN: "Same scare. | *Different* fish."  Plain sky at 25.6, end card.
// One canvas (sky + seed constellation + the two panes + cast), DOM type, grain on top. Pure f(t). Dialogue kit: ../s7talk.js.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { seq, chatThread, skyNote, opener, lastLine, drawTalkMarks, speaking, threadCues, noteCues, openerCues, lastLineCues, OPENER_LEN, lite } from '../s7talk.js'

export const DURATION = 30
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
const CAP = signStar('capricorn'), PIS = signStar('pisces')
const CAST = {
  CAPRICORN: { tag: '♑ CAPRICORN', color: CAP.color, side: 'L', pitch: 523.25 },
  PISCES: { tag: '♓ PISCES', color: PIS.color, side: 'R', pitch: 932.33 },
}
const CPS = 30

const C = (x, o = {}) => ({ s: 'CAPRICORN', x, ...o }), P = (x, o = {}) => ({ s: 'PISCES', x, ...o })
const SCRIPT = seq(3.0, [
  C('you up? i keep thinking about *Typhon.*'),
  P('the monster? ugh. *same.*', { hold: 1.5 }),
  { mark: 'fish' },
  C('so you panicked into a fish *too?*', { hold: 1.4 }),
  P('*two* fish. we’re holding hands.', { hold: 2.4 }),
  C('i only got *half* a fish. the top stayed goat.', { hold: 1.5 }),
  P('it’s a look. *own it.*', { hold: 1.5 }),
], { cast: CAST, cps: CPS, hold: 1.6 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 2.95,
  typhon: [LINES[0].t + 1.0, LINES[1].t + 2.2],
  fish: M.fish, tail: LINES[2].t + 0.6, fishes: LINES[3].t + 0.2,
  close: SCRIPT.end - 0.1,
}
T.h1Out = [T.fish - 0.3, T.fish - 0.1]
T.note = T.fish + 0.1; T.noteOut = [T.note + 5.6, T.note + 5.85]
T.last = SCRIPT.end + 0.2; T.out = [STORY_END - 0.45, STORY_END - 0.05]
T.ghost = T.close - 3.2
const LAST = { text: 'Same scare. | *Different* fish.' }
const NOTE = 'One Greek story: Pan became the *goat-fish;* | Aphrodite and Eros, *two fish on a cord.*'

// ── the split screen: two rooms, a divider down the middle
const PANE = { L: { x0: 48, x1: 528 }, R: { x0: 552, x1: 1032 }, y0: 520, y1: 1320 }
const POS = { L: { x: 288, y: 1000 }, R: { x: 792, y: 1000 } }
export const GHOST = { at: T.ghost, x: 820, y: 1182, where: 'rising out of Pisces’ duvet at the foot of the bed, right pane' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HOPS = { CAPRICORN: [T.h1 + 0.2, ...talkHops(LINES, CAST.CAPRICORN.tag, { cps: CPS }), T.last + 0.1, T.last + 0.6, T.last + 1.1], PISCES: [T.h1 + 0.35, ...talkHops(LINES, CAST.PISCES.tag, { cps: CPS })] }
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }
function moods(t) {
  const li = LINES.indexOf(lineAt(t))
  const tb = [   // [capricorn, pisces]
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'sleepy', zzz: false }],
    [{ mood: 'wide', look: [0, -1], blink: false }, { mood: 'wide', look: [0, -1], blink: false }],
    [{ mood: 'squint', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }],
    [{ mood: 'neutral', look: [0, 1] }, { mood: 'heart' }],
    [{ mood: 'eyeroll' }, { mood: 'happy', look: [-1, 0] }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'wink', look: [-1, 0] }],
  ]
  if (t < LINES[0].t) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'sleepy', zzz: false }]
  if (t >= T.last) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
  return tb[li] || tb[tb.length - 1]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'A *late-night* | call.', { top: 200, size: 116, accentSize: 176, at: T.h1, gap: 0.08, accentColor: GOLD, wobble: true, fit: true })
  const open = opener(root, { at: T.open, cast: [{ glyph: '♑', name: 'Capricorn', color: CAP.color }, { glyph: '♓', name: 'Pisces', color: PIS.color }], place: 'a phone call, 2:14 a.m.' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const note = skyNote(root, { at: T.note, out: T.noteOut, text: NOTE, top: 176, width: 920 })
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.CAPRICORN.tag, color: CAP.color, top: 1440, size: 108, accentSize: 170 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }

  function paneBg(side, t) {
    const p = PANE[side], { y0, y1 } = PANE
    R(INK, p.x0 - 10, y0 - 10, p.x1 - p.x0 + 20, y1 - y0 + 20)
    const g = x.createLinearGradient(0, y0, 0, y1)
    if (side === 'L') { g.addColorStop(0, '#10302a'); g.addColorStop(1, '#0a1a20') } else { g.addColorStop(0, '#1d1844'); g.addColorStop(1, '#120e2c') }
    x.fillStyle = g; x.fillRect(p.x0, y0, p.x1 - p.x0, y1 - y0)
    // a little window with stars in each room
    const wx = side === 'L' ? p.x1 - 170 : p.x0 + 40
    R('#2a2550', wx - 6, y0 + 40, 136, 116); R('#07061a', wx, y0 + 46, 124, 104)
    for (let i = 0; i < 6; i++) { x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7); R(BONE, wx + 10 + (i * 37) % 110, y0 + 56 + (i * 23) % 84, 4, 4) }
    x.globalAlpha = 1; R('#2a2550', wx + 59, y0 + 46, 6, 104)
  }
  function typhon(t, side) {
    const p = prog(t, ...T.typhon)
    if (p <= 0 || p >= 1) return
    const pn = PANE[side], { y0, y1 } = PANE
    x.save(); x.beginPath(); x.rect(pn.x0, y0, pn.x1 - pn.x0, y1 - y0); x.clip()
    const cx = lerp(-300, 1380, p), cy = y0 + 290 + Math.sin(t * 2) * 16
    x.globalAlpha = Math.sin(Math.PI * p) * 0.95
    drawBits(x, STORM, STORM_C, cx, cy, 24, { outline: '#0c0820' })
    if (Math.sin(t * 30) > 0.3 && p > 0.3 && p < 0.7) { x.fillStyle = '#fff1c8'; x.fillRect(cx - 40, cy + 70, 12, 60); x.fillRect(cx - 28, cy + 120, 12, 50) }
    x.restore()
  }
  function rooms(t) {
    paneBg('L', t); paneBg('R', t)
    typhon(t, 'L'); typhon(t, 'R')
    // Capricorn's desk + lamp
    const L = PANE.L
    R(INK, L.x0, 1160, 300, 160); R('#5b3d2a', L.x0, 1166, 294, 24); R('#4a3020', L.x0 + 20, 1190, 20, 130); R('#4a3020', L.x0 + 250, 1190, 20, 130)
    drawBits(x, LAMP, LAMP_C, L.x0 + 70, 1120, 9)
    x.save(); x.globalCompositeOperation = 'lighter'; const lg = x.createRadialGradient(L.x0 + 70, 1130, 0, L.x0 + 70, 1130, 220); lg.addColorStop(0, 'rgba(255,220,140,0.35)'); lg.addColorStop(1, 'rgba(255,220,140,0)'); x.fillStyle = lg; x.fillRect(L.x0, 910, 320, 410); x.restore()
    // the clock
    x.font = `700 34px 'Space Mono', monospace`; x.textAlign = 'center'; x.fillStyle = '#7dffb0'; x.fillText('2:14', L.x1 - 108, PANE.y0 + 200)
    // Pisces' bed
    const Rr = PANE.R
    R(INK, Rr.x0, 1100, Rr.x1 - Rr.x0, 220); R('#6d63c9', Rr.x0, 1106, Rr.x1 - Rr.x0, 70); R('#5a50b4', Rr.x0, 1176, Rr.x1 - Rr.x0, 144)
    R('#efe6d6', Rr.x1 - 160, 1050, 140, 60)                                        // pillow
  }
  function capTail(t, r) {
    const k = easeOutBack(prog(t, T.tail, T.tail + 0.5), 2.2)
    if (k <= 0) return
    const wag = Math.sin(t * 4) * 0.18
    drawBits(x, TAIL, TAIL_C, r.x - 128, r.y + 70, 13 * k, { rot: -0.35 + wag, flip: true })
  }
  function twoFish(t) {
    const k = prog(t, T.fishes, T.fishes + 0.6)
    if (k <= 0) return
    const c = POS.R, a = t * 1.3
    const p1 = { x: c.x + Math.cos(a) * 170, y: c.y - 190 + Math.sin(a) * 50 }, p2 = { x: c.x + Math.cos(a + Math.PI) * 170, y: c.y - 190 + Math.sin(a + Math.PI) * 50 }
    x.save(); x.globalAlpha *= k
    // the cord
    x.fillStyle = GOLD
    for (let i = 0; i <= 20; i++) { if (i % 2) continue; const u = i / 20; x.fillRect(Math.round(lerp(p1.x, p2.x, u) - 4), Math.round(lerp(p1.y, p2.y, u) + Math.sin(u * Math.PI) * 40 - 4), 8, 8) }
    drawBits(x, FISH, FISH_C, p1.x, p1.y, 10, { flip: Math.sin(a) > 0 })
    drawBits(x, FISH, FISH2_C, p2.x, p2.y, 10, { flip: Math.sin(a + Math.PI) > 0 })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = outK(t, T.out), setK = ease.outCubic(prog(t, OPENER_LEN - 0.2, OPENER_LEN + 0.3))
      if (setK > 0) {
        x.save(); x.globalAlpha = setK * (0.25 + 0.75 * ok)
        rooms(t)
        const [mc, mp] = moods(t)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
        R('#5a50b4', PANE.R.x0, GHOST.y, 360, 24)
        x.save(); x.beginPath(); x.rect(PANE.L.x0, PANE.y0, PANE.L.x1 - PANE.L.x0, PANE.y1 - PANE.y0); x.clip()
        const rc = drawStarChar(x, POS.L.x, POS.L.y, 270, t, { ...CAP, ...mc, pop: pop01(t, OPENER_LEN, 0.4, 2.2), seed: 3, hops: HOPS.CAPRICORN, glow: 0.9 })
        capTail(t, rc)
        drawBits(x, PHONE, PHONE_C, rc.x + 118, rc.y - 20, 6, { rot: 0.25 })
        x.restore()
        x.save(); x.beginPath(); x.rect(PANE.R.x0, PANE.y0, PANE.R.x1 - PANE.R.x0, PANE.y1 - PANE.y0); x.clip()
        const rp = drawStarChar(x, POS.R.x, POS.R.y, 270, t, { ...PIS, ...mp, pop: pop01(t, OPENER_LEN + 0.12, 0.4, 2.2), seed: 8, hops: HOPS.PISCES, glow: 0.9 })
        drawBits(x, PHONE, PHONE_C, rp.x - 118, rp.y - 20, 6, { rot: -0.25 })
        twoFish(t)
        x.restore()
        drawTalkMarks(x, rc.x, rc.top, t, Math.max(speaking(LINES, 'CAPRICORN', t, { cps: CPS }), prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 1.6, T.last + 1.9))), CAP.color)
        drawTalkMarks(x, rp.x, rp.top, t, speaking(LINES, 'PISCES', t, { cps: CPS }), PIS.color)
        // the divider: a zig of pixel static between the two calls
        for (let y = PANE.y0 - 10; y < PANE.y1 + 10; y += 12) R(((y / 12 + Math.floor(t * 8)) % 3) ? '#3b3466' : GOLD, 536 + ((y / 12) % 2 ? 2 : -2), y, 8, 8)
        x.restore()
      }
      open.update(t)
      H1.update(t, outK(t, T.h1Out))
      thread.update(t)
      note.update(t)
      last.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      drawGrain(gx, t)
    },
  }
}

// ── pixel art
const STORM = ['....DDDDD.......', '..DDDDDDDDDD....', '.DDDDDDDDDDDDDD.', 'DDDRRDDDDDRRDDDD', 'DDDRRDDDDDRRDDDD', 'DDDDDDDDDDDDDDD.', '.DDDDDDDDDDDDD..', '..DD.DD.DD.DD...', '..D..D..D..D....']
const STORM_C = { D: '#4e3d78', R: '#ff3d55' }
const TAIL = ['......GG', '.....GGG', '....GGG.', 'GGGGGG..', 'GDDDGG..', '.GGG.G..', '..GG..G.', '.GG....G', 'GG......']
const TAIL_C = { G: '#2fc79a', D: '#1e8a6a' }
const FISH = ['...BB...', '.BBBBB.B', 'BBWBBBBB', 'BBBBBBBB', '.BBBBB.B', '...BB...']
const FISH_C = { B: '#7c74f0', W: '#ffffff' }
const FISH2_C = { B: '#ff8fb1', W: '#ffffff' }
const PHONE = ['KKKK', 'KSSK', 'KSSK', 'KSSK', 'KSSK', 'KKKK']
const PHONE_C = { K: '#1d1830', S: '#9fe8ff' }
const LAMP = ['.YYYYY.', 'YYYYYYY', '...K...', '...K...', '...K...', '..KKK..']
const LAMP_C = { Y: '#ffd98a', K: '#3a3050' }

// card-motif candidates: the fish beat, the hand-off to the last line
const CUTS = [{ t: T.fish - 0.08, kind: 'flip' }, { t: T.last - 0.08, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E03' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE_HZ = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...openerCues(T.open, 2),
  ['pop', r3(OPENER_LEN + 0.05), 587.33, 0.04, -0.4], ['pop', r3(OPENER_LEN + 0.17), 880, 0.04, 0.4],
  ...wordPops(T.h1, 3, 0.08, 0),
  ...threadCues(LINES, CAST, { cps: CPS }),
  ['whoosh', r3(T.typhon[0] + 0.3), 1.2, 0.03], ['boom', r3(lerp(T.typhon[0], T.typhon[1], 0.5)), 0.25],
  ['pluck', r3(T.tail), 739.99, 0.04, 0.6, -0.4], ['glitter', r3(T.tail), r3(T.tail + 0.5)],
  ['pop', r3(T.fishes), 1174.66, 0.035, 0.4], ['pop', r3(T.fishes + 0.12), 1318.51, 0.035, 0.4],
  ...noteCues(T.note, T.noteOut),
  ['tick', r3(T.ghost + 0.05), 0.015],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
