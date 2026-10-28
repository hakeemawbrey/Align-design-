// st7campfire (90 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 12, the season finale) · story 0–85.6,
//   then the shared end card. All twelve signs around a campfire, and Ophiuchus (drawOphiuchus from st5cast.js) finally
//   gets a seat, between Scorpio and Sagittarius, which is where the Sun's path really crosses its stars. A game: each one
//   says one true thing it never told the others (short lines; season-6 callbacks). The real history: about 2,500 years
//   ago Babylonian astronomers divided the zodiac into twelve equal parts, which makes this a very old family.
//   0.00–2.60  opener: ★ SIGN TO SIGN ★ · thirteen glyph coins (two rows) · "a campfire, the last night of the season"
//   2.7        "The *campfire.*"  Twelve stars on logs in a ring; one empty log. Ophiuchus hovers at the tree line.
//   ~9         SCORPIO spots it; SAG scoots over; Ophiuchus walks in and sits. SKY NOTE (the Sun's path crosses it).
//   ~19        "One *true* | thing."  GEMINI starts the game; the thirteen confessions go round the ring in zodiac
//              order. The speaker always: grows a little, hops, gets a pool of its colour on the ground, a ▼ marker,
//              talk ticks, and the box tag sits over its seat (cast.tagX); everyone else turns to look at it.
//   ~66        "A very old | *family.*"  The smoke draws a zodiac wheel of twelve equal slices. SKY NOTE (Babylon).
//   ~81        ARIES: "Twelve signs. One *sky.* | Pull up a log."  Plain sky at 85.6, end card.
// One canvas (sky + seed constellation + clearing + ring + fire), DOM type, grain on top. Pure f(t). Kit: ../s7talk.js.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits, drawOphiuchus, OPH } from '../../st5cast.js'
import { seq, chatThread, skyNote, opener, lastLine, drawTalkMarks, speaking, threadCues, noteCues, openerCues, lastLineCues, OPENER_LEN, lite } from '../s7talk.js'

export const DURATION = 90
const KEY = 'C'
const STORY_END = DURATION - ENDCARD_LEN       // 85.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
const IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'oph', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const KEYS = IDS.map(id => id === 'oph' ? 'OPH' : id === 'sagittarius' ? 'SAG' : id.toUpperCase())
const SIGN = Object.fromEntries(IDS.map((id, i) => [KEYS[i], id === 'oph' ? { color: OPH.tagColor, glyph: '✦' } : signStar(id)]))
const NAME = { OPH: 'OPHIUCHUS', SAG: 'SAGITTARIUS' }

// ── the ring: thirteen logs on an ellipse with a gap at the front (camera side), zodiac order clockwise from front-left
const RING = { x: 540, y: 994, rx: 420, ry: 246 }
const SEAT = Object.fromEntries(KEYS.map((k, i) => { const a = (120 + i * 25) * Math.PI / 180; return [k, { x: Math.round(RING.x + Math.cos(a) * RING.rx), y: Math.round(RING.y + Math.sin(a) * RING.ry), a, depth: (Math.sin(a) + 1) / 2 }] }))
const sizeOf = k => lerp(100, 146, SEAT[k].depth)
const CAST = Object.fromEntries(KEYS.map((k, i) => {
  const s = SEAT[k], c = SIGN[k]
  return [k, { tag: k === 'OPH' ? OPH.tag : `${c.glyph} ${NAME[k] || k}`, color: c.color, side: s.x < 540 ? 'L' : 'R', pitch: [440, 392, 987.77, 659.25, 739.99, 587.33, 698.46, 493.88, 1046.5, 783.99, 523.25, 880, 830.61][i], tagX: clamp((s.x - 150) / 780) }]
}))
const CPS = 30
const S = (s, x, o = {}) => ({ s, x, ...o })
const CONF = [   // the thirteen true things, in ring order
  ['ARIES', 'i go first because waiting *scares* me.'],
  ['TAURUS', 'i say no to change because i love *this.*'],
  ['GEMINI', 'i talk a lot so silence can’t *find* me.'],
  ['CANCER', 'i remember every kind thing you *said.*'],
  ['LEO', 'the clapping’s nice. you *staying* is better.'],
  ['VIRGO', 'i fix things so nobody *leaves.*'],
  ['LIBRA', 'i do know what i want. i’m *scared* to say it.'],
  ['SCORPIO', 'i trust you. *yes,* all of you.'],
  ['OPH', 'i only ever wanted a *seat.* thank you.'],
  ['SAG', 'i’m learning to *land.* here’s good.'],
  ['CAPRICORN', 'i rest on Fridays now. *mostly.*'],
  ['AQUARIUS', 'i’m not cold. i’m *buffering.*'],
  ['PISCES', 'i daydreamed about *this.* exactly this.'],
]
const SCRIPT = seq(3.05, [
  S('LEO', 'everyone here? good. *marshmallows.*'),
  S('CAPRICORN', 'i made a schedule. it says *relax.*', { hold: 1.6 }),
  S('SCORPIO', 'someone’s at the edge of the *trees.*', { hold: 1.4 }),
  { mark: 'oph' },
  S('OPH', 'hi. is this… a twelve-only *thing?*', { hold: 1.6 }),
  S('SAG', 'scoot over, Scorpio. there’s *room.*', { hold: 4.4 }),
  { mark: 'game' },
  S('GEMINI', 'game: one true thing nobody knows. *go.*', { pre: 0.6, hold: 1.6 }),
  ...CONF.map(([k, x], i) => S(k, x, { hold: i === 12 ? 2.4 : 2.0 })),
  { mark: 'family' },
  S('AQUARIUS', 'we’ve been doing this a *while,* huh?', { pre: 0.6 }),
  S('VIRGO', 'Babylon split the zodiac into *twelve.*', { hold: 4.0 }),
  S('OPH', '…and one *extra* log.', { hold: 1.8 }),
], { cast: CAST, cps: CPS, hold: 1.8 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 3.0,
  oph: M.oph, walkIn: LINES[4].t + 0.6,
  game: M.game, h2: M.game - 0.05, h2Land: M.game + 0.25,
  conf0: LINES[6].t,
  family: M.family, h3: M.family - 0.05, h3Land: M.family + 0.25, wheel: LINES[20].t + 0.1,
  extra: LINES[21].t + 0.4,
  close: SCRIPT.end - 0.1,
}
T.h1Out = [T.oph - 0.35, T.oph - 0.1]
T.note1 = T.walkIn + 1.2; T.note1Out = [T.game - 0.3, T.game - 0.05]
T.h2Out = [T.family - 0.35, T.family - 0.1]
T.h3Out = [T.wheel - 0.35, T.wheel - 0.1]
T.note2 = T.wheel + 0.2; T.note2Out = [T.close - 0.3, T.close - 0.05]
T.last = SCRIPT.end + 0.25; T.out = [STORY_END - 0.45, STORY_END - 0.05]
T.ghost = LINES[9].t + 0.4
export const BEATS = T
const LAST = { text: 'Twelve signs. One *sky.* | Pull up a log.' }
const NOTE1 = 'The Sun’s path really crosses *Ophiuchus,* | but the zodiac kept twelve signs.'
const NOTE2 = 'About 2,500 years ago, Babylonian astronomers | divided the zodiac into *twelve equal parts.*'

// ── the clearing
const FIRE = { x: RING.x, y: RING.y + 10 }
const TENT = { x: 930, y: 760 }
const WAIT = { x: 1004, y: 700 }
const WHEEL = { x: 540, y: 522, r: 150 }
export const GHOST = { at: T.ghost, x: TENT.x - 4, y: TENT.y + 6, where: 'peeking out of the tent flap behind the circle, top right' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HOPS = Object.fromEntries(KEYS.map(k => [k, [...talkHops(LINES, CAST[k].tag, { cps: CPS }), ...(k === 'ARIES' ? [T.last + 0.1, T.last + 0.6, T.last + 1.1] : [])]]))
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }
const ophIn = t => ease.inOutCubic(prog(t, T.walkIn, T.walkIn + 1.4))
function posOf(k, t) {
  const s = SEAT[k]
  if (k !== 'OPH') return { x: s.x, y: s.y }
  const p = ophIn(t)
  return { x: lerp(WAIT.x, s.x, p), y: lerp(WAIT.y, s.y, p) - Math.sin(p * Math.PI) * 30 }
}
/** 0…1: how much `k` is "the one talking" right now (holds through its line, so the focus never flickers) */
function focus(k, t) {
  if (t >= T.last - 0.2) return k === 'ARIES' ? prog(t, T.last - 0.2, T.last + 0.2) : 0
  const L = lineAt(t)
  if (!L || L.who !== k) { return 0 }
  return prog(t, L.t - 0.25, L.t + 0.05)
}
function mood(k, t) {
  const L = lineAt(t), me = SEAT[k], pos = posOf(k, t)
  if (t >= T.last) return k === 'ARIES' ? { mood: 'sparkle', look: [0, 0] } : { mood: 'happy', look: [clamp((SEAT.ARIES.x - pos.x) / 200, -1, 1), 0] }
  if (!L) return { mood: 'happy', look: [0, 0] }
  if (L.who === k) {
    if (t >= T.conf0 && t < T.family) return { mood: { ARIES: 'wide', TAURUS: 'neutral', GEMINI: 'sparkle', CANCER: 'heart', LEO: 'happy', VIRGO: 'neutral', LIBRA: 'squint', SCORPIO: 'wink', OPH: 'heart', SAG: 'happy', CAPRICORN: 'sleepy', AQUARIUS: 'neutral', PISCES: 'sparkle' }[k], look: [0, 1], zzz: false }
    return { mood: 'happy', look: [0, 0] }
  }
  const sp = posOf(L.who, t), look = [clamp((sp.x - pos.x) / 160, -1, 1), clamp((sp.y - pos.y) / 120, -1, 1)]
  if (t < T.walkIn + 1.4 && t >= T.oph - 1.2) return { mood: k === 'SCORPIO' ? 'squint' : 'wide', look: [clamp((WAIT.x - pos.x) / 160, -1, 1), 0], blink: k === 'OPH' ? undefined : false }
  if (t >= T.conf0 && t < T.family) { const done = LINES.indexOf(L) > 6 + KEYS.indexOf(k); return { mood: done ? 'happy' : 'neutral', look } }
  if (t >= T.wheel) return { mood: 'wide', look: [clamp((WHEEL.x - pos.x) / 200, -1, 1), -1] }
  return { mood: 'happy', look }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'The *campfire.*', { top: 196, size: 112, accentSize: 176, at: T.h1, gap: 0.08, accentColor: '#ffb066', wobble: true, fit: true })
  const H2 = popText(root, 'One *true* | thing.', { top: 196, size: 112, accentSize: 176, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, fit: true })
  const H3 = popText(root, 'A very old | *family.*', { top: 196, size: 112, accentSize: 176, at: T.h3, gap: 0.08, accentColor: lite(OPH.tagColor, 0.1), wobble: true, late: 1, lateAt: T.h3Land, fit: true })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const open = opener(root, { at: T.open, cast: KEYS.map(k => ({ glyph: SIGN[k].glyph, name: k, color: SIGN[k].color })), place: 'a campfire, the season’s last night' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const notes = [[NOTE1, T.note1, T.note1Out], [NOTE2, T.note2, T.note2Out]].map(([text, at, out]) => skyNote(root, { at, out, text, top: 176, width: 960 }))
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.ARIES.tag, color: SIGN.ARIES.color, top: 1450, size: 92, accentSize: 150 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  const GL = s => `700 ${s}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`

  function clearing(t) {
    // pine tree line, the tent, the ground
    x.fillStyle = '#0f1430'
    for (let i = 0; i < 12; i++) { const tx = i * 98 - 20, h = 150 + (i * 53) % 90; x.beginPath(); x.moveTo(tx, 820); x.lineTo(tx + 55, 820 - h); x.lineTo(tx + 110, 820); x.fill() }
    R('#141a3a', 0, 800, 1080, 30)
    const g = x.createLinearGradient(0, 810, 0, 1330); g.addColorStop(0, '#16203a'); g.addColorStop(1, '#0e1428'); x.fillStyle = g; x.fillRect(0, 810, 1080, 520)
    // the tent (its flap is where the ghost peeks out)
    x.fillStyle = INK; x.beginPath(); x.moveTo(TENT.x - 110, TENT.y + 70); x.lineTo(TENT.x, TENT.y - 90); x.lineTo(TENT.x + 110, TENT.y + 70); x.closePath(); x.fill()
    x.fillStyle = '#c8763a'; x.beginPath(); x.moveTo(TENT.x - 100, TENT.y + 64); x.lineTo(TENT.x, TENT.y - 80); x.lineTo(TENT.x + 100, TENT.y + 64); x.closePath(); x.fill()
    x.fillStyle = '#2a1830'; x.beginPath(); x.moveTo(TENT.x - 34, TENT.y + 64); x.lineTo(TENT.x, TENT.y - 20); x.lineTo(TENT.x + 34, TENT.y + 64); x.closePath(); x.fill()
    drawGhostCameo(x, t, { x: GHOST.x, y: TENT.y + 64, at: GHOST.at, dur: 1.5, from: 'below', cell: 2 })
    // firelight on the ground
    const fl = 0.9 + 0.1 * Math.sin(t * 9) * Math.sin(t * 5.3)
    const lg = x.createRadialGradient(FIRE.x, FIRE.y, 10, FIRE.x, FIRE.y, 520); lg.addColorStop(0, `rgba(255,150,70,${0.32 * fl})`); lg.addColorStop(1, 'rgba(255,150,70,0)'); x.fillStyle = lg
    x.save(); x.translate(FIRE.x, FIRE.y); x.scale(1, 0.55); x.translate(-FIRE.x, -FIRE.y); x.fillRect(FIRE.x - 520, FIRE.y - 520, 1040, 1040); x.restore()
  }
  function log(k) { const s = SEAT[k], w = lerp(100, 140, s.depth); R(INK, s.x - w / 2 - 4, s.y + sizeOf(k) * 0.32, w + 8, 30); R('#7a4a2a', s.x - w / 2, s.y + sizeOf(k) * 0.32 + 4, w, 22); R('#c99a6a', s.x + w / 2 - 14, s.y + sizeOf(k) * 0.32 + 4, 10, 22) }
  function fire(t) {
    // logs + flames (quantised flicker) + sparks drifting up
    R(INK, FIRE.x - 84, FIRE.y + 18, 168, 28); R('#6b3f22', FIRE.x - 80, FIRE.y + 22, 160, 20)
    const fr = Math.floor(t * 8) % 3
    drawBits(x, FLAME[fr], FLAME_C, FIRE.x, FIRE.y - 40, 11, { outline: 'rgba(0,0,0,0)' })
    for (let i = 0; i < 9; i++) { const ph = (t * 0.6 + i * 0.37) % 1, sx = FIRE.x + Math.sin(i * 2.1 + t * 1.3) * (20 + ph * 60), sy = FIRE.y - 70 - ph * 380; x.globalAlpha = (1 - ph) * 0.9; R(i % 2 ? '#ffd27a' : '#ff8a4a', sx, sy, 6, 6); x.globalAlpha = 1 }
  }
  function wheel(t) {
    const k = prog(t, T.wheel - 0.2, T.wheel + 0.4) * (1 - prog(t, T.last + 0.3, T.last + 0.9))
    if (k <= 0) return
    const { x: cx, y: cy, r } = WHEEL
    x.save(); x.globalAlpha *= k
    const sg = x.createRadialGradient(cx, cy, 10, cx, cy, r + 60); sg.addColorStop(0, 'rgba(200,190,230,0.18)'); sg.addColorStop(1, 'rgba(200,190,230,0)'); x.fillStyle = sg; x.fillRect(cx - r - 60, cy - r - 60, 2 * r + 120, 2 * r + 120)
    x.strokeStyle = 'rgba(239,230,214,0.75)'; x.lineWidth = 5; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
    x.beginPath(); x.arc(cx, cy, r * 0.42, 0, Math.PI * 2); x.stroke()
    // twelve equal slices, Aries on the left, counter-clockwise like a chart
    KEYS.filter(k => k !== 'OPH').forEach((key, i) => {
      const p = prog(t, T.wheel + 0.3 + i * 0.12, T.wheel + 0.5 + i * 0.12)
      if (p <= 0) return
      const a = Math.PI - i * Math.PI / 6, am = a - Math.PI / 12
      x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 3; x.beginPath(); x.moveTo(cx + Math.cos(a) * r * 0.42, cy + Math.sin(a) * r * 0.42); x.lineTo(cx + Math.cos(a) * lerp(r * 0.42, r, p), cy + Math.sin(a) * lerp(r * 0.42, r, p)); x.stroke()
      const gx2 = cx + Math.cos(am) * r * 0.72, gy2 = cy + Math.sin(am) * r * 0.72, s = SIGN[key]
      x.save(); x.globalAlpha *= p; x.font = GL(40); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s.glyph + '︎', gx2 + 2, gy2 + 4); x.fillStyle = lite(s.color, 0.15); x.fillText(s.glyph + '︎', gx2, gy2 + 2); x.restore()
    })
    x.font = `700 22px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('12 × 30°', cx, cy)
    // …and one extra log: a teal spark on the rim between Scorpio and Sagittarius
    const e = easeOutBack(prog(t, T.extra, T.extra + 0.4), 2.6)
    if (e > 0) { const a = Math.PI - 8 * Math.PI / 6; drawPixelStar(x, cx + Math.cos(a) * (r + 22), cy + Math.sin(a) * (r + 22), 34 * e * (1 + 0.1 * Math.sin(t * 5)), 2, OPH.teal) }
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
        wheel(t)
        clearing(t)
        const conf = t >= T.conf0 - 0.3 && t < T.family ? 1 : 0
        const order = [...KEYS].sort((a, b) => posOf(a, t).y - posOf(b, t).y)
        const drawOne = (k, i) => {
          const p = posOf(k, t), f = focus(k, t), sz = sizeOf(k) * (1 + 0.3 * f)
          // the speaker's pool of light on the ground + the ▼ marker above it
          if (f > 0) {
            const c = SIGN[k].color, pg = x.createRadialGradient(p.x, p.y + sz * 0.38, 4, p.x, p.y + sz * 0.38, sz * 0.9)
            pg.addColorStop(0, rgbaHex(c, 0.55 * f)); pg.addColorStop(1, rgbaHex(c, 0))
            x.save(); x.translate(p.x, p.y + sz * 0.38); x.scale(1, 0.4); x.translate(-p.x, -(p.y + sz * 0.38)); x.fillStyle = pg; x.fillRect(p.x - sz, p.y + sz * 0.38 - sz, 2 * sz, 2 * sz); x.restore()
          }
          if (k !== 'OPH' || ophIn(t) > 0.98) log(k)
          const anyone = t >= LINES[0].t - 0.2 && t < T.close + 0.2
          const dim = (conf || anyone) && f < 0.5 ? (conf ? 0.55 : 0.75) : 1
          const opts = { ...SIGN[k], ...mood(k, t), pop: pop01(t, OPENER_LEN + i * 0.04, 0.4, 2.2), seed: 40 + i * 3, hops: HOPS[k], glow: 0.7 + 0.4 * f, alpha: dim }
          const r = k === 'OPH' ? drawOphiuchus(x, p.x, p.y, sz, t, { ...opts, side: -1, glitter: 0.8 }) : drawStarChar(x, p.x, p.y, sz, t, opts)
          if (f > 0) {
            x.save(); x.globalAlpha *= f
            const by = r.top - 40 + Math.sin(t * 6) * 5
            drawBits(x, ARROW, { X: lite(SIGN[k].color, 0.3) }, p.x, by, 8)
            x.restore()
          }
          drawTalkMarks(x, r.x, r.top - 4, t, Math.max(speaking(LINES, k, t, { cps: CPS }), k === 'ARIES' ? prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 1.6, T.last + 1.9)) : 0), SIGN[k].color)
        }
        // an empty log waits for Ophiuchus until it sits down
        if (ophIn(t) <= 0.98) log('OPH')
        order.forEach(k => { if (posOf(k, t).y < FIRE.y) drawOne(k, KEYS.indexOf(k)) })
        fire(t)
        order.forEach(k => { if (posOf(k, t).y >= FIRE.y) drawOne(k, KEYS.indexOf(k)) })
        x.restore()
      }
      open.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      thread.update(t)
      for (const n of notes) n.update(t)
      last.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      drawGrain(gx, t)
    },
  }
}
const rgbaHex = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }

// ── pixel art
const FLAME = [
  ['....R....', '...RR....', '..RYR.R..', '..RYYRR..', '.RYYWYR..', '.RYWWYRR.', 'RRYWWWYRR', 'RYYWWWYYR', '.RYYYYYR.'],
  ['.....R...', '....RR...', '.R.RYR...', '.RRYYR...', '.RYYWYR..', 'RRYWWYR..', 'RRYWWWYRR', 'RYYWWWYYR', '.RYYYYYR.'],
  ['...R.....', '...RR..R.', '..RYR.RR.', '..RYYRYR.', '.RYYWYYR.', '.RYWWWYR.', 'RRYWWWYRR', 'RYYWWWYYR', '.RYYYYYR.'],
]
const FLAME_C = { R: '#ff5a3a', Y: '#ffb03a', W: '#fff1b8' }
const ARROW = ['XXXXX', '.XXX.', '..X..']

// card-motif candidates: Ophiuchus arrives, the game starts, the family beat, the hand-off to the last line
const CUTS = [{ t: T.oph - 0.08, kind: 'flip' }, { t: T.game - 0.08, kind: 'deal' }, { t: T.family - 0.08, kind: 'flip' }, { t: T.last - 0.08, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E12' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE_HZ = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...openerCues(T.open, 0),
  ...KEYS.map((k, i) => ['pop', r3(T.open + 0.42 + i * 0.09), NOTE_HZ[i % NOTE_HZ.length] * (i >= 7 ? 2 : 1), 0.03, (i / 12 - 0.5) * 0.6]),
  ...wordPops(T.h1, 2, 0.08, 0),
  ...threadCues(LINES, CAST, { cps: CPS }),
  ['whoosh', r3(T.walkIn), 0.6, 0.025], ['glitter', r3(T.walkIn), r3(T.walkIn + 1.4)], ['pluck', r3(T.walkIn + 1.4), 1046.5, 0.04, 0.7, 0.3],
  ...noteCues(T.note1, T.note1Out),
  ...wordPops(T.h2, 3, 0.08, 2),
  ...wordPops(T.h3, 2, 0.08, 4),
  ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T.wheel + 0.3 + i * 0.12), 0.018]), ['bell', r3(T.wheel + 1.8), 1567.98, 0.028, 1.6, 0],
  ...noteCues(T.note2, T.note2Out),
  ['bell', r3(T.extra + 0.05), 2093, 0.03, 1.4, 0.3], ['glitter', r3(T.extra), r3(T.extra + 0.5)],
  ['tick', r3(T.ghost + 0.05), 0.015],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
