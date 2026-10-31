// sxseasonsag — SEASONAL SKY: "Sagittarius Season." (30 s vertical Align ad, Star Talk Shows, show 8 ep 2, music: pop A).
// Story 0–25.6, then the shared end card. Same forecast desk as sxseasonscorpio (desk.js is an identical copy).
//   0.00–5.5   "It’s *Sagittarius* | season."  The desk, the forecaster (THE STARS) and the big wheel spinning… it lands on ♐
//              on the drop (2.82). THE STARS: "good evening. tonight's forecast: adventure."  ♓ Pisces, the intern, cries already.
//   5.5–10.6   "Forecast: | *say yes.*"  The wheel flips into the LOVE FORECAST board. Three rows (rule of three):
//              ➶ ADVENTURE "new places, new plans" · 💬 HONESTY "blunt, but kind" · a giant YES stamp "to almost everything"
//              (the third slams so hard the board shakes). THE STARS: "expect big plans and honest answers."
//  10.75       card cut.
//  10.85–16.6  "Pack for a | *first date.*"  The sight gag: suitcases thump onto the desk — a carry-on, a duffel… then a huge
//              trunk (the desk bounces) with a luggage tag: "DESTINATION: ACROSS TOWN". THE STARS: "it's across town. we packed
//              three bags."  Pisces, sobbing, adds a tiny fourth pouch on top: "TISSUES".
//  16.75–21.6  "Try a *new* date."  The board flips into the DATE NIGHT PICKER, a slot window: DINNER… DINNER… DINNER.
//              THE STARS: "same old dinner? try something new."  The forecaster bonks the machine: POTTERY CLASS. NEW!
//  21.75       card cut.
//  21.85–25.5  "Say *yes* to | something new."  The wheel is back, ♐ glowing; the bags zip off screen one by one (off to the
//              date); the forecaster waves them off, Pisces waves a tissue. Everything pops out by 25.5; end card at 25.6.
// One canvas (sky + wheel/boards + cast + desk + luggage), DOM type, a dialogue box, the show bug + forecast crawl, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, INK, MONO, mixHex, buildBug, buildTicker, drawWheel, rotFor, drawMarker, drawBits, drawDesk, drawPointer, board,
  drawPisces, pop01, outK, popOut, bump } from './desk.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const ACC = '#ffb347', HOT = '#ff7a59', SAGC = '#c08bff', GREEN = '#5fe08a'

// ── layout
const WX = 700, WY = 880, WR = 285
const BX = 400, BY = 600, BW = 600, BH = 540
const FX = 236, FY = 1068, FS = 270
const DESK_Y = 1190
const PX = 944, PY = 1142, PS = 118
const ARM = { x: FX + FS * 0.34, y: FY - FS * 0.04 }

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.2, deskIn: 0.2, wheelIn: 0.3, fIn: 0.45, pisIn: 0.75, spin: [0.3, BEAT(4)], land: BEAT(4),
  h0: 0.15, h0Out: [5.2, 5.4],
  open: 2.62, l1: 2.88,
  flipA: [5.5, 5.9], h1: 5.65, h1Land: 6.0, rows: [6.35, BEAT(12), BEAT(14) + 0.02], l2: 6.5, closeA: 10.2, h1Out: [10.3, 10.5],
  cut1: 10.75,
  h2: 10.85, h2Land: 11.2, bags: [BEAT(19) + 0.1, BEAT(20) + 0.2, BEAT(22) + 0.02], tag: 12.95, open2: 13.52, l3: 13.75, pouch: 15.9, h2Out: [16.45, 16.65],
  cut2: 16.75,
  flipB: [16.6, 16.95], h3: 16.85, h3Land: 17.2, rolls: [17.0, 17.45, 17.9], l4: 18.2, bonk: 19.3, newRoll: [19.35, 20.0], closeB: 21.42, h3Out: [21.45, 21.62],
  cut3: 21.75,
  h4: 21.85, h4Land: 22.3, leave: [22.6, 23.05, 23.5], wave: [22.6, 24.6], out: [25.0, 25.5],
}
const SPEAK = 'THE STARS'
const LINES_A = [
  { t: T.l1, speaker: SPEAK, text: "good evening. tonight's forecast: *adventure.*" },
  { t: T.l2, speaker: SPEAK, text: 'expect big plans and *honest* answers.' },
]
const LINES_B = [
  { t: T.l3, speaker: SPEAK, text: "it's across town. we packed *three* bags." },
  { t: T.l4, speaker: SPEAK, text: 'same old dinner? try something *new.*' },
]
const CPS = 28
const F_HOPS = [T.fIn + 0.3, ...talkHops([...LINES_A, ...LINES_B], SPEAK, { cps: CPS }), T.land + 0.05, T.bags[2] + 0.05, T.newRoll[1], T.h4Land]
const PIS_HOPS = [T.pisIn + 0.3, T.rows[2] + 0.05, T.bags[2] + 0.1, T.pouch - 0.2, T.leave[0], T.leave[2]]

const ROT0 = rotFor('sagittarius')
function wheelRot(t) {
  const p = ease.outCubic(prog(t, ...T.spin))
  const wob = t > T.land ? 0.07 * Math.sin((t - T.land) * 17) * Math.exp(-(t - T.land) * 5) : 0
  return ROT0 - (1 - p) * Math.PI * 4 + wob
}

// ── pixel art
const BOWARROW = ['......XXX', '.......XX', '......X.X', '.....X...', '....X....', '...X.....', '..X......', 'FX.......', 'FF.......']
const BUBBLE = ['.WWWWWWW.', 'WWWWWWWWW', 'WWKWKWKWW', 'WWWWWWWWW', '.WWWWWWW.', '..WW.....', '.W.......']
const STRIPE = '#ff6b8f'

// luggage: { x (centre), w, h, body, trim, stickers }
const BAGS = [
  { x: 438, w: 92, h: 116, body: '#3fb6f0', trim: '#1d6f9c', handle: 'top' },
  { x: 566, w: 138, h: 84, body: '#ef5c94', trim: '#9c2a5a', handle: 'duffel' },
  { x: 760, w: 236, h: 186, body: '#c98a4a', trim: '#7a4a1f', handle: 'trunk' },
]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'It’s *Sagittarius* | season.', { top: 190, size: 112, accentSize: 158, at: T.h0, gap: 0.1, accentColor: SAGC, fit: true })
  const H1 = popText(root, 'Forecast: | *say yes.*', { top: 190, size: 112, accentSize: 176, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: ACC, fit: true })
  const H2 = popText(root, 'Pack for a | *first date.*', { top: 190, size: 108, accentSize: 168, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: HOT, fit: true })
  const H3 = popText(root, 'Try a *new* | date.', { top: 190, size: 120, accentSize: 180, at: T.h3, gap: 0.12, accentColor: GREEN, fit: true })
  const H4 = popText(root, 'Say *yes* to | something new.', { top: 200, size: 112, accentSize: 176, at: T.h4, gap: 0.1, accentColor: ACC, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, [T.out[0] + 0.2, T.out[1]]]]
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1398, width: 960, height: 290, open: T.open, close: T.closeA, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1398, width: 960, height: 290, open: T.open2, close: T.closeB, cps: CPS })
  const bug = buildBug(root, { at: T.bug, dot: ACC })
  const ticker = buildTicker(root, { text: 'SAGITTARIUS SEASON   ·   HIGH CHANCE OF ADVENTURE   ·   HONEST SKIES   ·   SAY YES', at: 0.7, out: [25.0, 25.4], accent: ACC })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function wheelShow(t) {
    if (t < T.flipA[0]) return 1
    if (t < T.cut1) return 1 - prog(t, T.flipA[0], (T.flipA[0] + T.flipA[1]) / 2)
    if (t < T.flipB[0]) return 1
    if (t < T.cut3) return 1 - prog(t, T.flipB[0], (T.flipB[0] + T.flipB[1]) / 2)
    return 1
  }
  const boardShow = (t, [a, b]) => ease.outCubic(prog(t, (a + b) / 2, b))
  const deskBounce = t => bump(t, T.bags[2], 0.3) * 14

  function drawTheWheel(t, ok) {
    const sx = wheelShow(t)
    if (sx <= 0.01) return
    const pin = pop01(t, T.wheelIn, 0.45, 1.8) * ok
    if (pin <= 0.01) return
    const hiK = t >= T.land ? 0.75 + 0.25 * Math.sin((t - T.land) * 4) : 0
    const jig = bump(t, T.bags[2], 0.35) * Math.sin((t - T.bags[2]) * 60) * 0.04
    x.save(); x.translate(WX, WY); x.scale(sx * pin, pin); x.rotate(jig); x.translate(-WX, -WY)
    drawWheel(x, t, { cx: WX, cy: WY, r: WR, rot: wheelRot(t), hi: 8, hiK, alpha: 1 })
    x.restore()
    if (t > T.land && sx > 0.5) {
      const fl = t - T.land
      if (fl < 0.6) { x.save(); x.globalAlpha = (1 - fl / 0.6) * 0.9; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; drawPixelStar(x, WX + Math.cos(a) * (60 + fl * 160), WY - WR * 0.9 + Math.sin(a) * (60 + fl * 160), 24, i % 2 ? 1 : 2, i % 2 ? GOLD : SAGC) } x.restore() }
    }
    drawMarker(x, t, WX, WY - WR - 6, GOLD, pin * sx)
  }

  function drawForecastBoard(t) {
    if (t < T.flipA[0] || t >= T.cut1) return
    const k = boardShow(t, T.flipA)
    if (k <= 0) return
    const shake = bump(t, T.rows[2], 0.35) * Math.sin((t - T.rows[2]) * 70) * 10
    x.save(); x.translate(shake, 0)
    x.translate(BX + BW / 2, 0); x.scale(k, 1); x.translate(-(BX + BW / 2), 0)
    const r = board(x, BX, BY, BW, BH, { title: 'LOVE FORECAST', accent: ACC })
    const rows = [
      { icon: 'bow', label: 'ADVENTURE', sub: 'new places, new plans', col: SAGC },
      { icon: 'bubble', label: 'HONESTY', sub: 'blunt, but kind', col: '#7fdcff' },
      { icon: 'yes', label: 'SAY YES', sub: 'to almost everything', col: GREEN },
    ]
    rows.forEach((R, i) => {
      const p = prog(t, T.rows[i], T.rows[i] + 0.22)
      if (p <= 0) return
      const yc = r.y0 + 60 + i * 140
      const s = i === 2 ? lerp(2.4, 1, ease.outCubic(p)) : lerp(1.6, 1, ease.outCubic(p))
      x.save(); x.globalAlpha = clamp(p * 2.5)
      x.translate(r.x0 + 70, yc); x.scale(s, s)
      if (R.icon === 'bow') drawBits(x, BOWARROW, { X: GOLD, F: STRIPE }, 0, 0, 9)
      if (R.icon === 'bubble') drawBits(x, BUBBLE, { W: BONE, K: INK }, 0, 0, 9)
      if (R.icon === 'yes') {
        x.rotate(-0.12)
        x.fillStyle = INK; x.fillRect(-52, -30, 104, 60)
        x.fillStyle = GREEN; x.fillRect(-46, -24, 92, 48)
        x.fillStyle = INK; x.fillRect(-40, -18, 80, 36)
        x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GREEN; x.fillText('YES', 0, 2)
      }
      x.restore()
      x.save(); x.globalAlpha = clamp(p * 2.5)
      const lx = r.x0 + 140 + (1 - ease.outCubic(p)) * 60
      x.textAlign = 'left'; x.textBaseline = 'middle'
      x.font = `700 46px ${MONO}`; x.fillStyle = R.col; x.fillText(R.label, lx, yc - 18)
      x.font = `700 28px ${MONO}`; x.fillStyle = BONE; x.fillText(R.sub, lx, yc + 28)
      x.restore()
      if (i < 2 && p >= 1) { x.fillStyle = 'rgba(239,230,214,0.18)'; x.fillRect(r.x0 + 20, yc + 70, r.w - 40, 3) }
    })
    const st = t - T.rows[2]
    if (st > 0 && st < 0.6) { x.save(); x.globalAlpha = 1 - st / 0.6; for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + 0.3; drawPixelStar(x, r.x0 + 70 + Math.cos(a) * (40 + st * 200), r.y0 + 340 + Math.sin(a) * (40 + st * 200), 22, i % 2 ? 1 : 2, i % 2 ? GREEN : '#fff1c8') } x.restore() }
    x.restore()
  }

  // the date-night picker: a slot window
  const WIN = { x0: 440, x1: 960, y0: 712, y1: 840 }
  const OPTS = ['DINNER', 'MOVIE', 'DINNER', 'BRUNCH', 'DINNER']
  function slotState(t) {
    // returns { word list offset, landed word, which roll }
    for (let i = T.rolls.length - 1; i >= 0; i--) {
      if (t >= T.rolls[i] && t < (i < 2 ? T.rolls[i + 1] : T.newRoll[0])) {
        const p = prog(t, T.rolls[i], T.rolls[i] + 0.38)
        return { roll: i, p, final: 'DINNER' }
      }
    }
    if (t >= T.newRoll[0]) return { roll: 3, p: prog(t, ...T.newRoll), final: 'POTTERY CLASS' }
    return { roll: -1, p: 0, final: '???' }
  }
  function drawPicker(t) {
    if (t < T.flipB[0] || t >= T.cut3) return
    const k = boardShow(t, T.flipB)
    if (k <= 0) return
    const shake = bump(t, T.bonk, 0.3) * Math.sin((t - T.bonk) * 80) * 9
    x.save(); x.translate(shake, 0)
    x.translate(BX + BW / 2, 0); x.scale(k, 1); x.translate(-(BX + BW / 2), 0)
    board(x, BX, BY, BW, 420, { title: 'DATE NIGHT PICKER', accent: GREEN })
    const S = slotState(t)
    const isNew = S.roll === 3 && S.p >= 1
    // the window
    x.fillStyle = INK; x.fillRect(WIN.x0 - 8, WIN.y0 - 8, WIN.x1 - WIN.x0 + 16, WIN.y1 - WIN.y0 + 16)
    x.fillStyle = isNew ? '#1d3a28' : '#0e0a20'; x.fillRect(WIN.x0, WIN.y0, WIN.x1 - WIN.x0, WIN.y1 - WIN.y0)
    x.save(); x.beginPath(); x.rect(WIN.x0, WIN.y0, WIN.x1 - WIN.x0, WIN.y1 - WIN.y0); x.clip()
    x.textAlign = 'center'; x.textBaseline = 'middle'
    const cy = (WIN.y0 + WIN.y1) / 2, rowH = 110
    if (S.roll >= 0) {
      const n = S.roll === 3 ? 9 : 5
      const off = ease.outCubic(S.p) * n                                  // rows travelled
      for (let j = -1; j <= 1; j++) {
        const idx = Math.floor(off) + j
        const w2 = idx >= n ? S.final : OPTS[((idx % OPTS.length) + OPTS.length) % OPTS.length]
        const yy = cy + (j - (off - Math.floor(off))) * rowH
        x.font = `700 ${w2.length > 8 ? 52 : 62}px ${MONO}`
        x.fillStyle = w2 === 'POTTERY CLASS' ? GREEN : BONE
        x.fillText(w2, (WIN.x0 + WIN.x1) / 2, yy + 2)
      }
    } else {
      x.font = `700 62px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillText('? ? ?', (WIN.x0 + WIN.x1) / 2, cy + 2)
    }
    x.restore()
    // shine bars
    x.fillStyle = 'rgba(255,255,255,0.08)'; x.fillRect(WIN.x0, WIN.y0, WIN.x1 - WIN.x0, 18)
    // the "TRIED:" tally
    x.textAlign = 'left'; x.textBaseline = 'middle'
    x.font = `700 26px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillText('TRIED:', 446, 912)
    for (let i = 0; i < 3; i++) {
      if (t < T.rolls[i] + 0.38) continue
      const xx = 556 + i * 136
      x.font = `700 28px ${MONO}`; x.fillStyle = BONE; x.fillText('DINNER', xx, 912)
      const ex = prog(t, T.rolls[i] + 0.38, T.rolls[i] + 0.55)
      x.fillStyle = HOT; x.fillRect(xx - 6, 909, 116 * ex, 5)
    }
    // NEW! chip
    if (S.roll === 3) {
      const p = pop01(t, T.newRoll[1], 0.35, 2.6)
      if (p > 0.02) {
        x.save(); x.translate(900, 712); x.rotate(-0.15); x.scale(p * 0.8, p * 0.8)
        x.fillStyle = INK; x.fillRect(-92, -46, 184, 92)
        x.fillStyle = GREEN; x.fillRect(-84, -38, 168, 76)
        x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('NEW!', 0, 3)
        x.restore()
      }
      const st = t - T.newRoll[1]
      if (st > 0 && st < 0.7) { x.save(); x.globalAlpha = 1 - st / 0.7; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; drawPixelStar(x, 700 + Math.cos(a) * (60 + st * 260), 776 + Math.sin(a) * (40 + st * 160), 24, i % 2 ? 1 : 2, i % 2 ? GREEN : GOLD) } x.restore() }
    }
    x.restore()
  }

  function forecasterState(t) {
    if (t < T.land) return { mood: 'happy', look: [1, -1] }
    if (t < T.l1) return { mood: 'sparkle', look: [1, -1] }
    if (t < T.flipA[0]) return { mood: 'happy', look: [0, 0] }
    if (t < T.rows[2]) return { mood: 'neutral', look: [1, 0] }
    if (t < T.rows[2] + 0.6) return { mood: 'wide', look: [1, 0], blink: false }
    if (t < T.h2) return { mood: 'happy', look: [0, 0] }
    if (t < T.bags[2]) return { mood: 'happy', look: [1, 0] }                              // packing, delighted
    if (t < T.l3) return { mood: 'wide', look: [1, 0], blink: false }                       // …that's a lot of trunk
    if (t < T.pouch) return { mood: 'neutral', look: [0, 0] }
    if (t < T.flipB[0]) return { mood: 'happy', look: [1, 0] }
    if (t < T.rolls[2] + 0.4) return { mood: 'neutral', look: [1, 0] }
    if (t < T.l4) return { mood: 'eyeroll' }                                                // dinner. again.
    if (t < T.bonk) return { mood: 'neutral', look: [0, 0] }
    if (t < T.newRoll[1]) return { mood: 'squint', look: [1, 0] }
    if (t < T.h4) return { mood: 'sparkle', look: [1, 0] }
    if (t < T.wave[1]) return { mood: 'happy', look: [1, 0] }
    return { mood: 'wink' }
  }

  function pointerTip(t) {
    if (t < T.land - 0.4) return null
    if (t < T.flipA[0]) return { x: WX - 40, y: WY - WR + 40 }
    if (t < T.cut1) { const i = t < T.rows[1] ? 0 : t < T.rows[2] ? 1 : 2; return { x: BX + 34, y: BY + 88 + 60 + i * 140 } }
    if (t < T.flipB[0]) return null
    if (t < T.cut3) {
      const wind = prog(t, T.bonk - 0.25, T.bonk), hit = prog(t, T.bonk, T.bonk + 0.12)
      return { x: WIN.x0 - 14 - 34 * Math.sin(Math.PI * wind) * (1 - hit), y: (WIN.y0 + WIN.y1) / 2 + 20 }
    }
    return null
  }

  function drawBag(t, i, ok) {
    const B = BAGS[i], t0 = T.bags[i]
    if (t < t0 - 0.25 || ok <= 0) return
    // drop in from above, squash on landing; in the finale zip off to the right
    const fall = prog(t, t0 - 0.25, t0)
    const lv = ease.inCubic(prog(t, T.leave[i], T.leave[i] + 0.4))
    const bx = B.x + lv * 900, by0 = DESK_Y - B.h / 2 - deskBounce(t) * 0
    const by = lerp(by0 - 700, by0, ease.inQuad(fall)) - Math.sin(Math.PI * Math.min(1, lv * 1.5)) * 60
    const land = t > t0 ? Math.exp(-(t - t0) * 9) * Math.cos((t - t0) * 30) * 0.18 : 0
    const sx = 1 + land, sy = 1 - land
    x.save(); x.globalAlpha = ok; x.translate(bx, by + B.h / 2); x.scale(sx, sy); x.rotate(lv * 0.2); x.translate(0, -B.h / 2)
    const w = B.w, h = B.h
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = B.body; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = mixHex(B.body, '#ffffff', 0.3); x.fillRect(-w / 2, -h / 2, w, 8)
    x.fillStyle = B.trim; x.fillRect(-w / 2, h / 2 - 10, w, 10)
    if (B.handle === 'top') {
      x.fillStyle = INK; x.fillRect(-24, -h / 2 - 28, 48, 24); x.fillStyle = B.trim; x.fillRect(-18, -h / 2 - 22, 36, 12); x.fillStyle = INK; x.fillRect(-12, -h / 2 - 16, 24, 10)
      x.fillStyle = B.trim; x.fillRect(-w / 2 + 14, -h / 2 + 14, 8, h - 30); x.fillRect(w / 2 - 22, -h / 2 + 14, 8, h - 30)
    }
    if (B.handle === 'duffel') {
      x.fillStyle = B.trim; x.fillRect(-w / 2, -6, w, 12)
      x.fillStyle = INK; x.fillRect(-40, -h / 2 - 30, 10, 30); x.fillRect(30, -h / 2 - 30, 10, 30); x.fillRect(-40, -h / 2 - 34, 80, 10)
    }
    if (B.handle === 'trunk') {
      x.fillStyle = B.trim; x.fillRect(-w / 2, -h / 2 + 44, w, 10); x.fillRect(-w / 2 + 40, -h / 2, 14, h); x.fillRect(w / 2 - 54, -h / 2, 14, h)
      x.fillStyle = GOLD; x.fillRect(-14, -h / 2 + 36, 28, 26); x.fillStyle = INK; x.fillRect(-4, -h / 2 + 44, 8, 10)
      // stickers: a heart, a star, a little map
      x.fillStyle = STRIPE; x.fillRect(-w / 2 + 70, -h / 2 + 80, 30, 26)
      drawPixelStar(x, 50, h / 2 - 50, 34, 2, GOLD)
      x.fillStyle = '#7fdcff'; x.fillRect(-w / 2 + 64, h / 2 - 66, 46, 34); x.fillStyle = HOT; x.fillRect(-w / 2 + 74, h / 2 - 56, 8, 8)
    }
    x.restore()
    // the luggage tag on the trunk, swinging
    if (i === 2 && t > T.tag - 0.1) {
      const sw = Math.sin((t - T.tag) * 6) * Math.exp(-(t - T.tag) * 1.2) * 0.35 + 0.12
      const tp = pop01(t, T.tag, 0.3, 2.2)
      x.save(); x.globalAlpha = ok; x.translate(bx - B.w / 2 + 10, by - B.h / 2 + 20); x.rotate(sw); x.scale(tp, tp)
      x.fillStyle = INK; x.fillRect(-3, 0, 6, 46)
      x.translate(0, 46)
      x.fillStyle = INK; x.fillRect(-150, 0, 300, 96)
      x.fillStyle = '#fff1c8'; x.fillRect(-144, 6, 288, 84)
      x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#7a4a1f'; x.fillText('DESTINATION:', 0, 28)
      x.font = `700 32px ${MONO}`; x.fillStyle = INK; x.fillText('ACROSS TOWN', 0, 64)
      x.restore()
    }
    // the landing puff
    const lt = t - t0
    if (lt > 0 && lt < 0.4) { x.save(); x.globalAlpha = (1 - lt / 0.4) * 0.8; x.fillStyle = BONE; for (const d of [-1, 1]) for (let q = 0; q < 3; q++) x.fillRect(bx + d * (B.w / 2 + 10 + lt * 140 + q * 16), DESK_Y - 14 - q * 8, 10, 10); x.restore() }
  }
  function drawPouch(t, ok) {
    const p = pop01(t, T.pouch, 0.35, 2.4)
    if (p <= 0.02) return
    const lv = ease.inCubic(prog(t, T.leave[2], T.leave[2] + 0.4))
    const B = BAGS[2], cx = B.x + 50 + lv * 900, cy = DESK_Y - B.h - 34 - Math.sin(Math.PI * Math.min(1, lv * 1.5)) * 60
    x.save(); x.globalAlpha = ok; x.translate(cx, cy); x.scale(p, p)
    x.fillStyle = INK; x.fillRect(-58, -34, 116, 68)
    x.fillStyle = '#7c74f0'; x.fillRect(-52, -28, 104, 56)
    x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('TISSUES', 0, 2)
    x.restore()
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    if (t >= T.out[1] + 0.02) return
    drawTheWheel(t, ok)
    drawForecastBoard(t)
    drawPicker(t)
    const fp = pop01(t, T.fIn, 0.38, 2.2) * ok
    const st = forecasterState(t)
    const jolt = t >= T.bags[2] && t < T.bags[2] + 0.5 ? -0.14 * Math.exp(-(t - T.bags[2]) * 7) * Math.cos((t - T.bags[2]) * 22) : 0
    const waveSq = t >= T.wave[0] && t < T.wave[1] ? 0.05 * Math.sin((t - T.wave[0]) * 12) : 0
    let rF = null
    if (fp > 0.02) rF = drawStarChar(x, FX, FY, FS, t, { color: STAR.sky, ...st, hops: F_HOPS, pop: fp, squash: jolt + waveSq, seed: 3, glow: 1.1 })
    const tip = pointerTip(t)
    if (tip && rF) drawPointer(x, ARM.x, ARM.y + (rF.y - FY), tip.x, tip.y, clamp(fp) * (t < T.land - 0.2 ? prog(t, T.land - 0.4, T.land - 0.2) : 1))
    // Pisces
    const pp = pop01(t, T.pisIn, 0.36, 2.0) * ok
    const cry = t < T.rows[0] ? 1 : t < T.cut1 ? 2 : t < T.bags[2] ? 1 : t < T.flipB[0] ? 3 : t < T.h4 ? 1 : 3
    drawPisces(x, t, { x: PX, y: PY - deskBounce(t), size: PS, cry, mood: t >= T.bags[2] && t < T.l3 ? 'wide' : 'sparkle', pop: pp, look: t >= T.h4 ? [1, 0] : [-1, -1], hops: PIS_HOPS })
    // Pisces waves a tissue in the finale
    if (t > T.wave[0] && t < T.out[1]) {
      const a = Math.sin((t - T.wave[0]) * 10) * 0.5
      x.save(); x.globalAlpha = ok; x.translate(PX - 40, PY - 70); x.rotate(a)
      x.fillStyle = INK; x.fillRect(-4, -60, 8, 60); x.fillStyle = '#fbf7ee'; x.fillRect(-2, -64, 40, 30); x.fillStyle = '#cfc6dc'; x.fillRect(10, -54, 8, 6)
      x.restore()
    }
    // the desk
    const dk = pop01(t, T.deskIn, 0.4, 1.6) * ok
    if (dk > 0.02) {
      x.save(); x.translate(0, deskBounce(t) * 0.5); x.translate(540, DESK_Y + 75); x.scale(1, dk); x.translate(-540, -(DESK_Y + 75))
      drawDesk(x, { y: DESK_Y, accent: GOLD })
      x.restore()
    }
    // the luggage (on the desk)
    for (let i = 0; i < 3; i++) drawBag(t, i, clamp(dk))
    drawPouch(t, clamp(dk))
    // finale speed lines as the bags zip off
    for (let i = 0; i < 3; i++) {
      const lt = t - T.leave[i]
      if (lt > 0 && lt < 0.5) { x.save(); x.globalAlpha = (1 - lt / 0.5) * 0.7; x.fillStyle = BONE; for (let q = 0; q < 4; q++) x.fillRect(BAGS[i].x - 40 + lt * 800 - 160 - q * 30, DESK_Y - 30 - q * 34, 120, 6); x.restore() }
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawScene(t)
      boxA.update(t); boxB.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, [T.out[0], T.out[1]]))
      ticker.update(t)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (beat changes). cardfx keeps 2 for this 25.6 s story: 10.75 and 21.75.
const CUTS = [5.5, T.cut1, T.cut2, T.cut3]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound
const NOTE = [880, 987.77, 1108.73, 1174.66, 1318.51, 1479.98, 1661.22, 1760]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const spinTicks = (() => {
  const out = []; let last = null
  for (let t = T.spin[0]; t <= T.land; t += 1 / 120) {
    const k = Math.floor((wheelRot(t) - ROT0) / (Math.PI / 6))
    if (last !== null && k !== last) { if (!out.length || t - out[out.length - 1][1] > 0.045) out.push(['tick', +t.toFixed(3), 0.03]) }
    last = k
  }
  return out
})()
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.026),
  ['pop', T.deskIn + 0.1, 440, 0.04, 0], ['whoosh', T.wheelIn, 0.8, 0.05], ['pop', T.fIn + 0.05, 880, 0.04, -0.3], ['pop', T.pisIn + 0.05, 1174.66, 0.025, 0.5],
  ...spinTicks,
  ['boom', T.land, 0.18], ['bell', T.land, 1760, 0.035, 1.4, 0], ['glitter', T.land, T.land + 0.5],
  ['pop', T.open, 880, 0.035, 0], ['pop', T.open + 0.06, 1108.73, 0.03, 0],
  ...talkCues([...LINES_A, ...LINES_B], { cps: CPS }),
  // forecast: say yes
  ['whoosh', T.flipA[0], 0.4, 0.04], ['tick', (T.flipA[0] + T.flipA[1]) / 2, 0.05],
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 1318.51, 0.045, 0], ['pop', T.h1Land + 0.1, 1760, 0.04, 0],
  ['boom', T.rows[0], 0.1], ['pop', T.rows[0], 880, 0.04, 0.3],
  ['boom', T.rows[1], 0.12], ['pop', T.rows[1], 1108.73, 0.04, 0.3],
  ['boom', T.rows[2], 0.24], ['pop', T.rows[2], 1318.51, 0.05, 0.3], ['tick', T.rows[2] + 0.04, 0.06], ['glitter', T.rows[2], T.rows[2] + 0.4],
  ['pop', T.closeA, 880, 0.03, 0], ['pop', T.closeA + 0.07, 659.25, 0.03, 0],
  // pack for a first date: thump, thump… THUMP, the tag, the tissues pouch
  ...wordPops(T.h2, 2, 0.08, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.045, 0],
  ['whoosh', T.bags[0] - 0.25, 0.25, 0.03], ['boom', T.bags[0], 0.1], ['tick', T.bags[0], 0.05],
  ['whoosh', T.bags[1] - 0.25, 0.25, 0.03], ['boom', T.bags[1], 0.13], ['tick', T.bags[1], 0.05],
  ['whoosh', T.bags[2] - 0.3, 0.3, 0.04], ['boom', T.bags[2], 0.3], ['tick', T.bags[2], 0.08], ['pluck', T.bags[2] + 0.1, 220, 0.04, 0.8, 0],
  ['bell', T.tag, 1760, 0.025, 0.8, -0.3],
  ['pop', T.open2, 880, 0.035, 0], ['pop', T.open2 + 0.06, 1108.73, 0.03, 0],
  ['pop', T.pouch, 1479.98, 0.035, 0.5], ['pop', T.pouch + 0.12, 1318.51, 0.03, 0.5],
  // try a new date: the picker, dinner ×3, the bonk, NEW!
  ['whoosh', T.flipB[0], 0.4, 0.04], ['tick', (T.flipB[0] + T.flipB[1]) / 2, 0.05],
  ...wordPops(T.h3, 3, 0.12, 3, 0.025),
  ...T.rolls.flatMap(r => [['tick', r + 0.05, 0.04], ['tick', r + 0.15, 0.04], ['tick', r + 0.26, 0.035], ['pop', r + 0.38, 659.25, 0.04, 0.3]]),
  ['pluck', T.rolls[2] + 0.5, 196, 0.04, 0.7, 0],
  ['pop', T.bonk, 293.66, 0.06, 0.2], ['tick', T.bonk, 0.07],
  ...[0.05, 0.12, 0.2, 0.28, 0.37, 0.47].map(d => ['tick', +(T.newRoll[0] + d).toFixed(3), 0.035]),
  ['bell', T.newRoll[1], 1760, 0.04, 1.2, 0.3], ['glitter', T.newRoll[1], T.newRoll[1] + 0.5],
  ['pop', T.closeB, 880, 0.03, 0], ['pop', T.closeB + 0.07, 659.25, 0.03, 0],
  // say yes to something new: the bags zip off
  ...wordPops(T.h4, 5, 0.1, 0, 0.03), ['glitter', T.h4Land, T.h4Land + 0.5],
  ...T.leave.map(l => ['whoosh', l, 0.4, 0.04]),
  ['pop', T.wave[0] + 0.3, 1318.51, 0.025, 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
