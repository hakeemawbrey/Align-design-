// st7royals (90 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 06) · story 0–85.6, then the shared end card.
//   Taurus · Scorpio · Leo · Aquarius (two season-4/5 couples) hold a royal summit. They are the four fixed signs (each
//   sits in the middle of a season), and an old tradition, often credited to Persia, named four "royal stars" that guard
//   the sky: Aldebaran (Taurus' red eye), Regulus (Leo's heart, "little king"), Antares (the Scorpion's heart) and
//   Fomalhaut (in the Southern Fish, just below Aquarius; its name means "mouth of the fish"). They sit roughly a quarter
//   of the sky apart. Four stubborn rulers try to agree on one thing: where to eat. The real topic: stubborn and in love.
//   0.00–2.60  opener: ★ SIGN TO SIGN ★ · ♉ ♏ ♌ ♒ · "a royal summit"
//   2.7        "The royal | *summit.*"  Four thrones behind one long table, a menu card in the middle. Agenda item one: dinner.
//   ~21        "Four *fixed* signs."  SKY NOTE. The banner turns into a sky chart: the four royal stars by their real
//              right ascension around the sky, each linked to its sign. SKY NOTEs (the tradition, Fomalhaut).
//   ~52        "The *real* agenda."  Why each of them digs in. Each gives up one thing. ALL FOUR: "the bread place."
//   ~80        TAURUS: "Fixed doesn't | mean *stuck.*"  Plain sky at 85.6, end card.
// One canvas (sky + seed constellation + hall + cast), DOM type, grain on top. Pure f(t). Dialogue kit: ../s7talk.js.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { seq, chatThread, skyNote, opener, lastLine, drawTalkMarks, speaking, threadCues, noteCues, openerCues, lastLineCues, OPENER_LEN, lite } from '../s7talk.js'

export const DURATION = 90
const KEY = 'Eb'
const STORY_END = DURATION - ENDCARD_LEN       // 85.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', VELVET = '#5b1f4a'
const TAU_ = signStar('taurus'), SCO = signStar('scorpio'), LEO = signStar('leo'), AQU = signStar('aquarius')
const SEATS = { TAURUS: 150, SCORPIO: 400, LEO: 680, AQUARIUS: 930 }
const CAST = {
  TAURUS: { tag: '♉ TAURUS', color: TAU_.color, side: 'L', pitch: 440, tagX: 0 },
  SCORPIO: { tag: '♏ SCORPIO', color: SCO.color, side: 'L', pitch: 587.33, tagX: 0.36 },
  LEO: { tag: '♌ LEO', color: LEO.color, side: 'R', pitch: 739.99, tagX: 0.64 },
  AQUARIUS: { tag: '♒ AQUARIUS', color: AQU.color, side: 'R', pitch: 987.77, tagX: 1 },
  ALL: { tag: '★ ALL FOUR', color: GOLD, side: 'C', pitch: 659.25 },
}
const CPS = 28
const S = (s, x, o = {}) => ({ s, x, ...o })
const SCRIPT = seq(3.05, [
  S('LEO', 'this summit is called to order. item one: *dinner.*'),
  S('TAURUS', 'the good place. the one with the *bread.*'),
  S('SCORPIO', 'the quiet place. i know the owner’s *secrets.*'),
  S('AQUARIUS', 'the new place. it’s *weird.* i love it.'),
  S('LEO', 'we go where i get *recognised.*', { hold: 1.4 }),
  S('TAURUS', 'i am not moving from this *chair.*', { hold: 1.4 }),
  { mark: 'fixed' },
  S('SCORPIO', 'four rulers. zero *budging.*', { pre: 0.5, hold: 4.4 }),
  { mark: 'royal' },
  S('AQUARIUS', 'fun fact: we each have a *royal star.*', { pre: 0.4, hold: 2.8 }),
  S('TAURUS', 'Aldebaran. the bull’s red *eye.*'),
  S('LEO', 'Regulus. the *little king.* obviously.'),
  S('SCORPIO', 'Antares. the scorpion’s *heart.*'),
  S('AQUARIUS', 'Fomalhaut. technically in the fish *next door.*', { hold: 2.8 }),
  S('LEO', 'four guards. spread around the whole *sky.*', { hold: 1.8 }),
  { mark: 'real' },
  S('SCORPIO', 'we’re not really fighting about *dinner,* are we.', { pre: 0.5 }),
  S('TAURUS', 'i dig in when i’m scared of *losing* something.'),
  S('AQUARIUS', 'i dig in so i don’t *disappear* into us.'),
  S('LEO', 'and i dig in so you’ll *see* me.', { hold: 1.5 }),
  S('TAURUS', 'so we each give up *one* thing.'),
  S('LEO', 'the spotlight. for *one* night.', { hold: 1.3 }),
  S('AQUARIUS', 'my weird place. *next* time.', { hold: 1.3 }),
  S('SCORPIO', 'i’ll share the secrets. at *dinner.*', { hold: 1.4 }),
  S('TAURUS', '…so. the bread place?', { hold: 1.0 }),
  S('ALL', '*the bread place.*', { hold: 1.4 }),
], { cast: CAST, cps: CPS, hold: 1.8 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 3.0,
  fixed: M.fixed, h2: M.fixed - 0.05, h2Land: M.fixed + 0.25,
  royal: M.royal, chart: M.royal - 0.1,
  real: M.real, h3: M.real - 0.05, h3Land: M.real + 0.25,
  close: SCRIPT.end - 0.1,
}
T.h1Out = [T.fixed - 0.4, T.fixed - 0.2]
T.note1 = T.fixed + 2.6; T.note1Out = [T.royal - 0.3, T.royal - 0.05]
T.note2 = T.royal + 0.2; T.note2Out = [LINES[8].t + 0.6, LINES[8].t + 0.85]
T.note3 = LINES[11].t + 0.4; T.note3Out = [T.real - 0.3, T.real - 0.05]
T.h3Out = [T.real + 4.4, T.real + 4.6]
T.last = SCRIPT.end + 0.25; T.out = [STORY_END - 0.45, STORY_END - 0.05]
T.ghost = LINES[3].t + 0.8
const LAST = { text: 'Fixed doesn’t | mean *stuck.*' }
const NOTE1 = 'Taurus, Leo, Scorpio and Aquarius are the | *fixed* signs: each sits mid-season.'
const NOTE2 = 'An old tradition, often credited to Persia, | named four *royal stars* to guard the sky.'
const NOTE3 = 'Fomalhaut, “mouth of the fish,” is in the | Southern Fish, *just below Aquarius.*'

// ── the hall
const TABLE_Y = 1176
const BAN = { x0: 150, x1: 930, y0: 486, y1: 880 }
const RING = { x: 540, y: 668, r: 136 }
const MENU = { x: 540, y: TABLE_Y - 64 }
export const GHOST = { at: T.ghost, x: MENU.x, y: MENU.y - 60, where: 'rising from behind the summit’s menu card in the middle of the long table' }
// the royal stars at their real right ascension (hours), drawn around the sky ring
const ROYAL = [
  { name: 'ALDEBARAN', sub: 'the bull’s eye', ra: 4.60, sign: TAU_, at: () => LINES[8].t },
  { name: 'REGULUS', sub: 'little king', ra: 10.14, sign: LEO, at: () => LINES[9].t },
  { name: 'ANTARES', sub: 'scorpion’s heart', ra: 16.49, sign: SCO, at: () => LINES[10].t },
  { name: 'FOMALHAUT', sub: 'mouth of the fish', ra: 22.96, sign: AQU, at: () => LINES[11].t },
]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const ALLT = LINES[LINES.length - 1].t
const HOPS = Object.fromEntries(['TAURUS', 'SCORPIO', 'LEO', 'AQUARIUS'].map((k, i) => [k, [OPENER_LEN + 0.3 + i * 0.1, ...talkHops(LINES, CAST[k].tag, { cps: CPS }), ALLT + 0.05 + i * 0.04, ALLT + 0.5, ...(k === 'TAURUS' ? [T.last + 0.1, T.last + 0.6, T.last + 1.1] : [])]]))
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }
const ORDER = ['TAURUS', 'SCORPIO', 'LEO', 'AQUARIUS']
function mood(k, t) {
  const L = lineAt(t)
  if (t >= T.last) return k === 'TAURUS' ? { mood: 'sparkle', look: [0, 0] } : { mood: 'happy', look: [0, 0] }
  if (!L) return { mood: 'neutral', look: [0, 0] }
  if (L.who === 'ALL') return { mood: 'happy', look: [0, 0] }
  const i = ORDER.indexOf(k), j = ORDER.indexOf(L.who), toward = [clamp(j - i, -1, 1), 0]
  const sec = t < T.fixed ? 'agenda' : t < T.real ? 'stars' : 'real'
  if (L.who === k) return { mood: sec === 'agenda' ? (k === 'SCORPIO' ? 'squint' : k === 'TAURUS' ? 'neutral' : 'happy') : sec === 'stars' ? 'sparkle' : 'neutral', look: [0, 0] }
  if (sec === 'agenda') return { mood: (i + j) % 3 === 0 ? 'eyeroll' : 'squint', look: toward }
  if (sec === 'stars') return { mood: t > T.chart + 0.6 ? 'wide' : 'neutral', look: [0, -1], blink: undefined }
  // the real talk: partners soften toward each other
  const partner = { TAURUS: 'SCORPIO', SCORPIO: 'TAURUS', LEO: 'AQUARIUS', AQUARIUS: 'LEO' }[k]
  return { mood: L.who === partner ? 'heart' : 'neutral', look: toward }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'The royal | *summit.*', { top: 196, size: 112, accentSize: 176, at: T.h1, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'Four *fixed* | signs.', { top: 196, size: 112, accentSize: 176, at: T.h2, gap: 0.08, accentColor: lite(TAU_.color, 0.2), wobble: true, fit: true })
  const H3 = popText(root, 'The *real* | agenda.', { top: 196, size: 112, accentSize: 176, at: T.h3, gap: 0.08, accentColor: lite(SCO.color, 0.25), wobble: true, fit: true })
  const HEADS = [[H1, T.h1Out], [H2, [T.note1 - 0.3, T.note1 - 0.1]], [H3, T.h3Out]]
  const open = opener(root, { at: T.open, cast: [{ glyph: '♉', name: 'Taurus', color: TAU_.color }, { glyph: '♏', name: 'Scorpio', color: SCO.color }, { glyph: '♌', name: 'Leo', color: LEO.color }, { glyph: '♒', name: 'Aquarius', color: AQU.color }], place: 'a royal summit' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const notes = [[NOTE1, T.note1, T.note1Out], [NOTE2, T.note2, T.note2Out], [NOTE3, T.note3, T.note3Out]].map(([text, at, out]) => skyNote(root, { at, out, text, top: 176, width: 920 }))
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.TAURUS.tag, color: TAU_.color, top: 1450, size: 108, accentSize: 176 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  const lbl = (s, cx, cy, size, col, align = 'center', font = `700 ${size}px 'Space Mono', monospace`) => { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s, cx + 2, cy + 3); x.fillStyle = col; x.fillText(s, cx, cy) }

  function banner(t) {
    const { x0, x1, y0, y1 } = BAN
    R(INK, x0 - 20, y0 - 18, x1 - x0 + 40, 24); R('#c99a2e', x0 - 14, y0 - 14, x1 - x0 + 28, 14)        // the gold rod
    // the velvet banner, pointed hem
    x.fillStyle = INK; x.beginPath(); x.moveTo(x0 - 6, y0); x.lineTo(x1 + 6, y0); x.lineTo(x1 + 6, y1); x.lineTo((x0 + x1) / 2, y1 + 50); x.lineTo(x0 - 6, y1); x.closePath(); x.fill()
    x.fillStyle = VELVET; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y0); x.lineTo(x1, y1 - 4); x.lineTo((x0 + x1) / 2, y1 + 42); x.lineTo(x0, y1 - 4); x.closePath(); x.fill()
    R('rgba(242,199,92,0.7)', x0 + 16, y0 + 14, x1 - x0 - 32, 4)
    const flip = prog(t, T.chart, T.chart + 0.5)
    if (flip < 0.5) {
      // the crest: four glyph coins
      const k = 1 - flip * 2
      x.save(); x.translate(RING.x, RING.y); x.scale(1, k); x.translate(-RING.x, -RING.y)
      lbl('ROYAL SUMMIT', RING.x, y0 + 70, 44, GOLD)
      ;[TAU_, SCO, LEO, AQU].forEach((s, i) => {
        const cx = RING.x + (i - 1.5) * 150, cy = RING.y + 20
        x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 58, 0, Math.PI * 2); x.fill()
        x.fillStyle = s.color; x.beginPath(); x.arc(cx, cy, 52, 0, Math.PI * 2); x.fill()
        lbl(s.glyph + '︎', cx, cy + 4, 60, '#fffaf0', 'center', `700 60px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`)
      })
      lbl('agenda: dinner', RING.x, y1 - 60, 40, BONE, 'center', `italic 500 44px 'EB Garamond', serif`)
      x.restore()
      return
    }
    const k = (flip - 0.5) * 2
    x.save(); x.translate(RING.x, RING.y); x.scale(1, k); x.translate(-RING.x, -RING.y)
    // the sky ring: the zodiac around the sky, with a faint cross for the quarters
    const { x: cx, y: cy, r } = RING
    x.strokeStyle = 'rgba(242,199,92,0.65)'; x.lineWidth = 6; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
    x.strokeStyle = 'rgba(239,230,214,0.25)'; x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, r - 22, 0, Math.PI * 2); x.stroke()
    for (let h = 0; h < 24; h++) { const a = -h / 24 * Math.PI * 2 + Math.PI + 0.6; R('rgba(239,230,214,0.5)', cx + Math.cos(a) * (r + 10) - 2, cy + Math.sin(a) * (r + 10) - 2, 4, 4) }
    lbl('THE SKY', cx, cy, 28, 'rgba(239,230,214,0.75)')
    ROYAL.forEach((s, i) => {
      const a = -s.ra / 24 * Math.PI * 2 + Math.PI + 0.6, px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r
      const p = easeOutBack(prog(t, s.at() - 0.1, s.at() + 0.35), 2.4)
      if (p <= 0) return
      const col = lite(s.sign.color, 0.25)
      // dashed spoke to the centre
      x.fillStyle = rgbaHex(col, 0.5); for (let d = 0.2; d < 0.95; d += 0.08) x.fillRect(Math.round(lerp(cx, px, d) - 3), Math.round(lerp(cy, py, d) - 3), 6, 6)
      drawPixelStar(x, px, py, 48 * p * (1 + 0.08 * Math.sin(t * 3 + i)), 2, col)
      const side = Math.cos(a) >= 0 ? 1 : -1, ly = py + (Math.sin(a) > 0.3 ? 20 : Math.sin(a) < -0.3 ? -30 : -10)
      x.save(); x.globalAlpha *= clamp(p)
      lbl(s.sign.glyph + '︎ ' + s.name, px + side * 34, ly, 26, col, side > 0 ? 'left' : 'right')
      lbl(s.sub, px + side * 34, ly + 30, 26, BONE, side > 0 ? 'left' : 'right', `italic 500 28px 'EB Garamond', serif`)
      x.restore()
    })
    x.restore()
  }
  function hall(t) {
    banner(t)
    // thrones (sign-coloured backs)
    ORDER.forEach(k => {
      const sx = SEATS[k], c = signStar(k.toLowerCase()).color
      R(INK, sx - 108, 940, 216, 250); R('#c99a2e', sx - 102, 946, 204, 244); R('#2a1238', sx - 92, 956, 184, 234)
      R(INK, sx - 116, 924, 30, 42); R('#f2c75c', sx - 110, 930, 18, 30); R(INK, sx + 86, 924, 30, 42); R('#f2c75c', sx + 92, 930, 18, 30)
      R(INK, sx - 14, 930, 28, 28); R(c, sx - 9, 935, 18, 18)
    })
  }
  function table(t) {
    R(INK, 20, TABLE_Y - 8, 1040, 150); R('#efe3c8', 26, TABLE_Y - 2, 1028, 26); R('#7a2c5e', 26, TABLE_Y + 24, 1028, 112)
    for (let i = 0; i < 8; i++) R('#f2c75c', 70 + i * 132, TABLE_Y + 24, 36, 18)                      // gold fringe
    // goblets
    ORDER.forEach(k => drawBits(x, GOBLET, GOBLET_C, SEATS[k] + 70, TABLE_Y - 28, 5))
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
    // the menu card
    R(INK, MENU.x - 54, MENU.y - 66, 108, 132); R('#fff6e0', MENU.x - 48, MENU.y - 60, 96, 120)
    lbl('MENU', MENU.x, MENU.y - 34, 22, '#7a2c5e')
    for (let i = 0; i < 3; i++) R('#b9a98a', MENU.x - 30, MENU.y - 6 + i * 20, 60, 6)
    // the bread, once they agree
    const bp = easeOutBack(prog(t, ALLT + 0.3, ALLT + 0.7), 2.6)
    if (bp > 0) drawBits(x, BREAD, BREAD_C, MENU.x, MENU.y - 100, 8 * bp)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = outK(t, T.out), setK = ease.outCubic(prog(t, OPENER_LEN - 0.2, OPENER_LEN + 0.3))
      if (setK > 0) {
        x.save(); x.globalAlpha = setK * (0.25 + 0.75 * ok)
        hall(t)
        const rs = {}
        ORDER.forEach((k, i) => {
          const st = signStar(k.toLowerCase())
          const r = drawStarChar(x, SEATS[k], 1080, 224, t, { ...st, ...mood(k, t), pop: pop01(t, OPENER_LEN + i * 0.1, 0.4, 2.2), seed: 20 + i * 3, hops: HOPS[k], glow: 0.85 })
          drawBits(x, CROWN, CROWN_C, Math.round(r.x), Math.round(r.top + 2), 4, { rot: (i % 2 ? 0.12 : -0.12) + 0.03 * Math.sin(t * 3 + i) })
          rs[k] = r
        })
        table(t)
        ORDER.forEach(k => drawTalkMarks(x, rs[k].x, rs[k].top - 22, t, Math.max(speaking(LINES, k, t, { cps: CPS }), speaking(LINES, 'ALL', t, { cps: CPS }), k === 'TAURUS' ? prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 1.6, T.last + 1.9)) : 0), signStar(k.toLowerCase()).color))
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

const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const GOBLET = ['YYYYY', 'YRRRY', '.YYY.', '..Y..', '..Y..', '.YYY.']
const GOBLET_C = { Y: '#f2c75c', R: '#a3224a' }
const BREAD = ['..BBBBB..', '.BLBLBLB.', 'BBBBBBBBB', 'BBBBBBBBB', '.DDDDDDD.']
const BREAD_C = { B: '#d9984a', L: '#f2c78a', D: '#a8692e' }

// card-motif candidates: the fixed-signs beat, the royal stars, the real agenda, the hand-off to the last line
const CUTS = [{ t: T.fixed - 0.08, kind: 'flip' }, { t: T.royal - 0.15, kind: 'deal' }, { t: T.real - 0.08, kind: 'flip' }, { t: T.last - 0.08, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E06' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE_HZ = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...openerCues(T.open, 4),
  ...wordPops(T.h1, 2, 0.08, 0), ['pop', T.h1Land, 1174.66, 0.045, 0], ['bell', T.h1Land + 0.05, 1760, 0.025, 1.4, 0],
  ...threadCues(LINES, CAST, { cps: CPS }),
  ...wordPops(T.h2, 3, 0.08, 2),
  ...noteCues(T.note1, T.note1Out),
  ['whoosh', r3(T.chart), 0.5, 0.03], ['tick', r3(T.chart + 0.25), 0.04], ['glitter', r3(T.chart + 0.25), r3(T.chart + 0.9)],
  ...noteCues(T.note2, T.note2Out),
  ...ROYAL.map((s, i) => ['bell', r3(s.at() + 0.05), [1318.51, 1479.98, 1760, 1975.53][i], 0.028, 1.4, (i - 1.5) * 0.3]),
  ...noteCues(T.note3, T.note3Out),
  ...wordPops(T.h3, 2, 0.08, 4),
  ['tick', r3(T.ghost + 0.05), 0.015],
  ['pop', r3(ALLT + 0.5), 1174.66, 0.05, 0], ['pluck', r3(ALLT + 0.55), 880, 0.04, 0.7, 0], ['glitter', r3(ALLT + 0.3), r3(ALLT + 0.9)],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const LIFT = +T.royal.toFixed(2)   // the royal-star chart: the score's lift
