// st7solstice (60 s vertical Align ad, Star Talk season 7 "SIGN TO SIGN", EP 05) · story 0–55.6, then the shared end card.
//   Cancer × Capricorn, the season-4 couple, on moving day in year one, arguing about whose holidays go where. They are the
//   solstice signs: in the tropical zodiac Cancer season starts at the June solstice and Capricorn season at the December
//   one. The Tropics of Cancer and Capricorn mark how far north and south the Sun can stand directly overhead. Up north,
//   June brings the longest day and December the longest night. Rulers: Cancer the Moon, Capricorn Saturn.
//   0.00–2.60  opener: ★ SIGN TO SIGN ★ · ♋ × ♑ · "moving day, year one"
//   2.7        "Moving day, | *year one.*"  Boxes everywhere (FEELINGS · FRAGILE, FILES · 5-YR PLAN, MUGS). The holidays fight.
//   ~15        "The *solstice* signs."  A globe poster unrolls on the wall: the equator, the two tropics, the Sun's overhead
//              point swinging between them. Two SKY NOTEs.
//   ~33        "The *real* talk."  "some days you're the longest night." / "and you still stayed." Both host. The soup.
//   ~51        CANCER: "Opposite seasons. | *Same* house."  Plain sky at 55.6, end card.
// One canvas (sky + seed constellation + room + cast), DOM type, grain on top. Pure f(t). Dialogue kit: ../s7talk.js.
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

export const DURATION = 60
const KEY = 'D'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CARD = '#c99a62', CARD_D = '#a87a46'
const CAN = signStar('cancer'), CAP = signStar('capricorn')
const CAST = {
  CANCER: { tag: '♋ CANCER', color: CAN.color, side: 'L', pitch: 987.77 },
  CAPRICORN: { tag: '♑ CAPRICORN', color: CAP.color, side: 'R', pitch: 523.25 },
}
const CPS = 28

const Cn = (x, o = {}) => ({ s: 'CANCER', x, ...o }), Cp = (x, o = {}) => ({ s: 'CAPRICORN', x, ...o })
const SCRIPT = seq(3.05, [
  Cn('first holidays in our place. i want *everyone* here.'),
  Cp('december is my family’s. it’s already on the *calendar.*'),
  Cn('and june? my birthday? *my* season?'),
  Cp('you get the longest day. i get the longest *night.*', { hold: 3.0 }),
  { mark: 'sol' },
  Cn('we’re the *solstice* signs. the two edges.', { pre: 0.5, hold: 2.6 }),
  Cp('the Sun’s farthest reach before it turns *back.*', { hold: 2.8 }),
  Cn('funny. we both turn back toward *home.*', { hold: 2.6 }),
  { mark: 'real' },
  Cn('some days you’re the longest *night.*', { pre: 0.5, hold: 1.4 }),
  Cp('and you still *stayed.*', { hold: 2.2 }),
  Cp('june here. december at my parents’. we *both* host.'),
  Cn('with my soup?', { hold: 1.2 }),
  Cp('with your *soup.*', { hold: 1.4 }),
  Cn('and the box marked *FEELINGS?*', { hold: 1.3 }),
  Cp('we unpack that one *first.*', { hold: 1.5 }),
], { cast: CAST, cps: CPS, hold: 1.8 })
const LINES = SCRIPT.lines, M = SCRIPT.marks
const T = {
  open: 0, h1: 2.7, h1Land: 3.0,
  sol: M.sol, h2: M.sol - 0.05, h2Land: M.sol + 0.25, poster: M.sol + 0.1,
  real: M.real, h3: M.real - 0.05, h3Land: M.real + 0.25,
  close: SCRIPT.end - 0.1,
}
T.h1Out = [LINES[3].t - 0.5, LINES[3].t - 0.3]
T.note0 = LINES[3].t; T.note0Out = [T.sol - 0.35, T.sol - 0.1]
T.h2Out = [T.sol + 2.5, T.sol + 2.7]
T.note1 = T.sol + 2.9; T.note1Out = [T.sol + 7.2, T.sol + 7.45]
T.note2 = T.sol + 7.6; T.note2Out = [T.real - 0.35, T.real - 0.1]
T.h3Out = [T.real + 4.2, T.real + 4.4]
T.last = SCRIPT.end + 0.25; T.out = [STORY_END - 0.45, STORY_END - 0.05]
T.ghost = LINES[1].t + 1.6
const LAST = { text: 'Opposite seasons. | *Same* house.' }
const NOTE0 = 'Up north, June has the *longest day* | and December the *longest night.*'
const NOTE1 = 'Cancer season starts at the *June* solstice; | Capricorn’s at the *December* one.'
const NOTE2 = 'The two *Tropics* mark how far north and | south the Sun can be *directly overhead.*'

// ── the new place
const POSTER = { x0: 170, x1: 910, y0: 540, y1: 1000 }
const GLOBE = { x: 400, y: 772, r: 178 }
const SEAT = { L: { x: 196, y: 1120 }, R: { x: 884, y: 1120 } }
const MUGS = { x: 540, y: 1196 }
export const GHOST = { at: T.ghost, x: MUGS.x, y: MUGS.y - 50, where: 'rising out of the open MUGS moving box between the two of them' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HOPS = { CANCER: [T.h1 + 0.2, ...talkHops(LINES, CAST.CANCER.tag, { cps: CPS }), T.last + 0.1, T.last + 0.6, T.last + 1.1], CAPRICORN: [T.h1 + 0.35, ...talkHops(LINES, CAST.CAPRICORN.tag, { cps: CPS })] }
const lineAt = t => { let c = null; for (const l of LINES) if (t >= l.t) c = l; return c }
function moods(t) {
  const li = LINES.indexOf(lineAt(t))
  const tb = [   // [cancer, capricorn]
    [{ mood: 'sparkle', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }],
    [{ mood: 'wide', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }],
    [{ mood: 'squint', look: [1, 0] }, { mood: 'neutral', look: [-1, 1] }],
    [{ mood: 'neutral', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }],
    [{ mood: 'happy', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }],
    [{ mood: 'neutral', look: [1, -1] }, { mood: 'happy', look: [-1, -1] }],
    [{ mood: 'sparkle', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }],
    [{ mood: 'neutral', look: [0, 1] }, { mood: 'wide', look: [-1, 0], blink: false }],
    [{ mood: 'wide', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }],
    [{ mood: 'sparkle', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }],
    [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }],
    [{ mood: 'wide', look: [1, 1] }, { mood: 'wink', look: [-1, 0] }],
    [{ mood: 'heart' }, { mood: 'happy', look: [-1, 0] }],
  ]
  if (t < LINES[0].t) return [{ mood: 'happy', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }]
  if (t >= T.last) return [{ mood: 'sparkle', look: [1, 0] }, { mood: 'heart' }]
  return tb[li] || tb[tb.length - 1]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "600 36px Inter", "italic 500 160px 'EB Garamond'", "700 42px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H1 = popText(root, 'Moving day, | *year one.*', { top: 196, size: 112, accentSize: 176, at: T.h1, gap: 0.08, accentColor: lite(CAN.color, 0.25), wobble: true, late: 2, lateAt: T.h1Land, fit: true })
  const H2 = popText(root, 'The *solstice* | signs.', { top: 196, size: 112, accentSize: 176, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, fit: true })
  const H3 = popText(root, 'The *real* talk.', { top: 250, size: 116, accentSize: 176, at: T.h3, gap: 0.08, accentColor: lite(CAP.color, 0.25), wobble: true, late: 2, lateAt: T.h3Land, fit: true })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const open = opener(root, { at: T.open, cast: [{ glyph: '♋', name: 'Cancer', color: CAN.color }, { glyph: '♑', name: 'Capricorn', color: CAP.color }], place: 'moving day, year one' })
  const thread = chatThread(root, { lines: LINES, cast: CAST, close: T.close, cps: CPS })
  const notes = [[NOTE0, T.note0, T.note0Out], [NOTE1, T.note1, T.note1Out], [NOTE2, T.note2, T.note2Out]].map(([text, at, out]) => skyNote(root, { at, out, text, top: 176, width: 900 }))
  const last = lastLine(root, { at: T.last, out: T.out, text: LAST.text, tag: CAST.CANCER.tag, color: CAN.color, top: 1450, size: 100, accentSize: 164 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  const lbl = (s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px 'Space Mono', monospace`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }

  function box(x0, y0, w, h, lines, col = INK, open = false) {
    R(INK, x0 - 6, y0 - 6, w + 12, h + 12); R(CARD, x0, y0, w, h); R(CARD_D, x0, y0, w, 10)
    if (!open) R('#e6d3a0', x0 + w / 2 - 16, y0, 32, h * 0.35)                       // tape
    else { R(INK, x0 - 6, y0 - 34, 40, 34); R(CARD_D, x0, y0 - 28, 28, 28); R(INK, x0 + w - 34, y0 - 34, 40, 34); R(CARD_D, x0 + w - 28, y0 - 28, 28, 28) }
    lines.forEach((s, i) => lbl(s, x0 + w / 2, y0 + h * 0.52 + (i - (lines.length - 1) / 2) * 30, 22, col))
  }
  function poster(t) {
    const p = ease.inOutQuad(prog(t, T.poster, T.poster + 0.8))
    const { x0, x1, y0, y1 } = POSTER
    // the rolled poster on the wall hook, then it unrolls downwards
    R(INK, x0 - 10, y0 - 12, x1 - x0 + 20, 26); R('#c9c2b0', x0 - 4, y0 - 6, x1 - x0 + 8, 14)
    if (p <= 0) return
    const yb = lerp(y0 + 14, y1, p)
    x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, yb - y0); x.clip()
    R(INK, x0, y0, x1 - x0, y1 - y0); R('#0f1438', x0 + 6, y0 + 6, x1 - x0 - 12, y1 - y0 - 12)
    const { x: gx0, y: gy, r } = GLOBE
    // the globe
    x.fillStyle = '#2b62b8'; x.beginPath(); x.arc(gx0, gy, r, 0, Math.PI * 2); x.fill()
    x.save(); x.beginPath(); x.arc(gx0, gy, r, 0, Math.PI * 2); x.clip()
    for (const [u, v, w, h] of LAND) R('#4fae6a', gx0 + u * r, gy + v * r, w * r, h * r)
    x.restore()
    x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.arc(gx0, gy, r, 0, Math.PI * 2); x.stroke()
    const tro = r * Math.sin(23.44 * Math.PI / 180)
    const line = (yy, col, dash) => { const hw = Math.sqrt(r * r - (yy - gy) ** 2); for (let xx = gx0 - hw; xx < gx0 + hw; xx += dash * 2) R(col, xx, yy - 3, dash, 6) }
    line(gy, BONE, 8)
    line(gy - tro, lite(CAN.color, 0.2), 14); line(gy + tro, lite(CAP.color, 0.2), 14)
    // labels on the right
    const lx = gx0 + r + 26
    lbl('TROPIC OF CANCER', lx, gy - tro, 24, lite(CAN.color, 0.2), 'left')
    lbl('EQUATOR', lx, gy, 24, BONE, 'left')
    lbl('TROPIC OF', lx, gy + tro - 14, 24, lite(CAP.color, 0.2), 'left'); lbl('CAPRICORN', lx, gy + tro + 16, 24, lite(CAP.color, 0.2), 'left')
    // the Sun's overhead point swings between the tropics (June ↔ December)
    const sw = Math.sin((t - T.poster) * 1.4), sy = gy - tro * sw
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(gx0 - r * 0.15, sy, 0, gx0 - r * 0.15, sy, 60); g.addColorStop(0, 'rgba(255,230,140,0.9)'); g.addColorStop(1, 'rgba(255,230,140,0)'); x.fillStyle = g; x.fillRect(gx0 - r * 0.15 - 60, sy - 60, 120, 120); x.restore()
    drawBits(x, SUN, SUN_C, gx0 - r * 0.15, sy, 5, { outline: null })
    lbl(sw > 0.6 ? 'JUNE' : sw < -0.6 ? 'DECEMBER' : '', gx0 - r * 0.15, sy + (sw > 0 ? -44 : 44), 22, GOLD)
    lbl('THE SUN, DIRECTLY OVERHEAD', (x0 + x1) / 2, y1 - 34, 22, GOLD)
    x.restore()
    R(INK, x0 - 10, yb - 8, x1 - x0 + 20, 22); R('#c9c2b0', x0 - 4, yb - 4, x1 - x0 + 8, 12)       // the bottom roll
  }
  function room(t) {
    R('rgba(40,26,60,0.55)', 40, 1270, 1000, 40)
    // wall calendar (Capricorn's): DEC, a date circled
    R(INK, 930, 1020, 104, 120); R(BONE, 936, 1026, 92, 108); R('#c8323f', 936, 1026, 92, 28); lbl('DEC', 982, 1041, 20, BONE)
    for (let i = 0; i < 12; i++) R('#8b8fa3', 946 + (i % 4) * 20, 1066 + Math.floor(i / 4) * 20, 10, 10)
    x.strokeStyle = '#c8323f'; x.lineWidth = 4; x.beginPath(); x.arc(1001, 1091, 12, 0, Math.PI * 2); x.stroke()
    // a bare window (the poster will unroll over it) and fairy lights still in their first loop
    const W0 = { x0: 330, x1: 750, y0: 600, y1: 960 }
    R(INK, W0.x0 - 12, W0.y0 - 12, W0.x1 - W0.x0 + 24, W0.y1 - W0.y0 + 24); R('#d9cfb8', W0.x0 - 6, W0.y0 - 6, W0.x1 - W0.x0 + 12, W0.y1 - W0.y0 + 12)
    const wg = x.createLinearGradient(0, W0.y0, 0, W0.y1); wg.addColorStop(0, '#0b0a2a'); wg.addColorStop(1, '#2a1d50'); x.fillStyle = wg; x.fillRect(W0.x0, W0.y0, W0.x1 - W0.x0, W0.y1 - W0.y0)
    for (let i = 0; i < 12; i++) { x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.3); R(BONE, W0.x0 + 20 + (i * 71) % 380, W0.y0 + 20 + (i * 53) % 300, 5, 5) }
    x.globalAlpha = 1
    x.fillStyle = BONE; x.beginPath(); x.arc(640, 700, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = '#0b0a2a'; x.beginPath(); x.arc(662, 688, 40, 0, Math.PI * 2); x.fill()
    R('#d9cfb8', (W0.x0 + W0.x1) / 2 - 5, W0.y0, 10, W0.y1 - W0.y0); R('#d9cfb8', W0.x0, (W0.y0 + W0.y1) / 2 - 5, W0.x1 - W0.x0, 10)
    for (let i = 0; i <= 18; i++) { const u = i / 18, lx = lerp(60, 1020, u), ly = 560 + Math.sin(u * Math.PI) * 60; R('#3a3050', lx - 2, ly - 2, 4, 4); const on = Math.sin(t * 3 + i * 1.7) > -0.3; R(on ? ['#ffd34d', '#ff8fb1', '#7fdcff', '#7dffb0'][i % 4] : '#4a4060', lx - 7, ly + 4, 14, 14) }
    poster(t)
  }
  function boxes(t) {
    box(40, 1180, 250, 120, ['FEELINGS ♥', 'FRAGILE'], '#7a1f2c')
    box(790, 1190, 250, 110, ['FILES', '5-YR PLAN'], INK)
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
    box(MUGS.x - 80, MUGS.y - 50, 160, 110, ['MUGS'], INK, true)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const ok = outK(t, T.out), setK = ease.outCubic(prog(t, OPENER_LEN - 0.2, OPENER_LEN + 0.3))
      if (setK > 0) {
        x.save(); x.globalAlpha = setK * (0.25 + 0.75 * ok)
        room(t)
        const [mn, mp] = moods(t)
        const rn = drawStarChar(x, SEAT.L.x, SEAT.L.y, 290, t, { ...CAN, ...mn, pop: pop01(t, OPENER_LEN, 0.4, 2.2), seed: 9, hops: HOPS.CANCER, glow: 0.9 })
        const rp = drawStarChar(x, SEAT.R.x, SEAT.R.y, 290, t, { ...CAP, ...mp, pop: pop01(t, OPENER_LEN + 0.12, 0.4, 2.2), seed: 3, hops: HOPS.CAPRICORN, glow: 0.9 })
        drawBits(x, TIE, TIE_C, rp.x, rp.y + 52, 6)
        boxes(t)
        drawTalkMarks(x, rn.x, rn.top, t, Math.max(speaking(LINES, 'CANCER', t, { cps: CPS }), prog(t, T.last, T.last + 0.2) * (1 - prog(t, T.last + 1.6, T.last + 1.9))), CAN.color)
        drawTalkMarks(x, rp.x, rp.top, t, speaking(LINES, 'CAPRICORN', t, { cps: CPS }), CAP.color)
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

// rough continents as blocks in globe-radius units (not to scale; just "Earth")
const LAND = [[-0.7, -0.75, 0.5, 0.35], [-0.55, -0.4, 0.35, 0.35], [-0.35, 0.0, 0.25, 0.55], [0.05, -0.7, 0.55, 0.3], [0.1, -0.35, 0.3, 0.5], [0.45, -0.45, 0.4, 0.3], [0.5, 0.35, 0.3, 0.2]]
const SUN = ['..Y.Y..', '.YYYYY.', 'YYYYYYY', '.YYYYY.', '..Y.Y..']
const SUN_C = { Y: '#ffd34d' }
const TIE = ['KK', 'KK', '.K', 'KK', 'KK']
const TIE_C = { K: '#2a2346' }

// card-motif candidates: the solstice beat, the real talk, the hand-off to the last line
const CUTS = [{ t: T.sol - 0.08, kind: 'flip' }, { t: T.real - 0.08, kind: 'deal' }, { t: T.last - 0.08, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S7 E05' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE_HZ = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...openerCues(T.open, 2),
  ['pop', r3(OPENER_LEN + 0.05), 587.33, 0.04, -0.4], ['pop', r3(OPENER_LEN + 0.17), 880, 0.04, 0.4],
  ...wordPops(T.h1, 2, 0.08, 0), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.1, 1318.51, 0.04, 0],
  ...threadCues(LINES, CAST, { cps: CPS }),
  ...noteCues(T.note0, T.note0Out),
  ...wordPops(T.h2, 3, 0.08, 2),
  ['whoosh', r3(T.poster), 0.8, 0.03], ['tick', r3(T.poster + 0.8), 0.04], ['bell', r3(T.poster + 0.9), 1760, 0.025, 1.6, -0.2], ['glitter', r3(T.poster + 0.8), r3(T.poster + 1.4)],
  ...noteCues(T.note1, T.note1Out), ...noteCues(T.note2, T.note2Out),
  ...wordPops(T.h3, 1, 0.08, 4), ['pop', T.h3Land, 987.77, 0.045, 0], ['pluck', T.h3Land, 739.99, 0.035, 0.6, 0],
  ['tick', r3(T.ghost + 0.05), 0.015],
  ...lastLineCues(T.last, LAST.text),
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
