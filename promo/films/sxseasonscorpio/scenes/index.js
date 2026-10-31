// sxseasonscorpio — SEASONAL SKY: "Scorpio Season." (30 s vertical Align ad, Star Talk Shows, show 8 ep 1, music: screwed Cm).
// Story 0–25.6, then the shared end card. A love "forecast" from a pixel anchor desk with a big zodiac wheel.
//   0.00–5.5   "It’s *Scorpio* | season."  The desk, the forecaster (THE STARS, gold) with a pointer, the big wheel spinning…
//              it clunks to a stop on ♏ at 12 o'clock on the drop (2.82). THE STARS: "good evening. here's your love forecast."
//              ♓ Pisces, the desk intern, is already crying at the end of the desk (the running gag, all film).
//   5.5–10.6   "Forecast: | *intense.*"  The wheel flips into a LOVE FORECAST board. Three rows slam in (rule of three):
//              👁 INTENSE "heavy eye contact" · 🔒 PRIVATE "diaries: locked" · ⏻ ALL OR NOTHING "maybe: not found" (the third
//              slams so hard the board shakes and the switch sparks). THE STARS: "expect long stares and zero small talk."
//              The forecaster then does the Scorpio stare at camera.
//  10.75       card cut.
//  10.85–16.6  "Everything goes | *purple.*"  The sight gag, in three: the whole sky + wheel + desk wipe moody purple;
//              the forecaster looks down and it's purple too; it sips its coffee… pulls the mug away: the coffee is purple.
//              Double-take. THE STARS: "even the coffee. we don't make the rules." (…then sips again anyway.)
//  16.75–21.6  "Let it get | *deep.*"  The board flips into a DEPTH GAUGE: SHALLOW / DEEP / DARK. The needle sinks into DEEP
//              (✓ ding)… keeps sinking toward DARK (alarm)… the forecaster bonks the gauge with the pointer: back to DEEP, ✓.
//              THE STARS: "ask the big stuff. skip the mind games."
//  21.75       card cut.
//  21.85–25.5  "Go *deep.* | Not dark."  The wheel is back, ♏ glowing; the purple softens to a warm violet. A wink.
//              Pisces sobs happily. Everything pops out by 25.5; the end card takes over at 25.6.
// One canvas (sky + wheel/boards + cast + desk), DOM type, a dialogue box, the show bug + forecast crawl, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, INK, MONO, mixHex, buildBug, buildTicker, drawWheel, rotFor, drawMarker, drawBits, drawDesk, drawPointer, board,
  drawPisces, tintRect, pop01, outK, popOut, bump } from './desk.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const VIOLET = '#b57bff', PURPLE = '#7b2fd6', ACC = '#d08bff', HOT = '#ff6b8f'

// ── layout
const WX = 700, WY = 880, WR = 285                       // the big wheel
const BX = 400, BY = 600, BW = 600, BH = 540             // the boards (same footprint as the wheel)
const FX = 236, FY = 1068, FS = 270                      // the forecaster
const DESK_Y = 1190
const PX = 944, PY = 1142, PS = 118                      // Pisces, the intern
const MUG_REST = { x: 432, y: 1160 }
const ARM = { x: FX + FS * 0.34, y: FY - FS * 0.04 }      // where the pointer leaves the star

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.2, deskIn: 0.2, wheelIn: 0.3, fIn: 0.45, pisIn: 0.75, spin: [0.3, BEAT(4)], land: BEAT(4),
  h0: 0.15, h0Out: [5.2, 5.4],
  open: 2.62, l1: 2.88,
  flipA: [5.5, 5.9], h1: 5.65, h1Land: 6.0, rows: [6.35, BEAT(12), BEAT(14) + 0.02], l2: 6.5, stare: [9.25, 10.3], closeA: 10.25, h1Out: [10.3, 10.5],
  cut1: 10.75,
  h2: 10.85, h2Land: 11.2, wipe: [11.16, 11.56], self: BEAT(20) + 0.02, sip: [12.25, 12.7], away: 12.95, take: 13.15, l3: 13.75, open2: 13.52,
  sip2: [15.95, 16.4], h2Out: [16.45, 16.65],
  cut2: 16.75,
  flipB: [16.6, 16.95], h3: 16.85, h3Land: 17.2, l4: 17.55, deep: 18.0, sink: [18.6, 19.5], bonk: 19.62, deep2: 19.8, closeB: 21.1, h3Out: [21.4, 21.6],
  cut3: 21.75,
  h4: 21.85, h4Land: 22.25, wink: [23.0, 23.5], sob: 23.6, out: [25.0, 25.5],
}
const SPEAK = 'THE STARS'
const LINES_A = [
  { t: T.l1, speaker: SPEAK, text: "good evening. here's your *love* forecast." },
  { t: T.l2, speaker: SPEAK, text: 'expect long stares and *zero* small talk.' },
]
const LINES_B = [
  { t: T.l3, speaker: SPEAK, text: "even the coffee. we don't make the *rules.*" },
  { t: T.l4, speaker: SPEAK, text: 'ask the big stuff. skip the *mind games.*' },
]
const CPS = 28
const F_HOPS = [T.fIn + 0.3, ...talkHops([...LINES_A, ...LINES_B], SPEAK, { cps: CPS }), T.land + 0.05, T.take, T.deep2, T.h4Land]
const PIS_HOPS = [T.pisIn + 0.3, T.rows[2] + 0.05, T.take + 0.1, T.sob]

// spin: four full turns, easing out onto ♏, with a little settle wobble
const ROT0 = rotFor('scorpio')
function wheelRot(t) {
  const p = ease.outCubic(prog(t, ...T.spin))
  const wob = t > T.land ? 0.07 * Math.sin((t - T.land) * 17) * Math.exp(-(t - T.land) * 5) : 0
  return ROT0 - (1 - p) * Math.PI * 4 + wob
}
// how purple the world is
const washK = t => t < T.cut3 ? ease.inOutQuad(prog(t, ...T.wipe)) * 0.92 : 0.5
const wipeY = t => lerp(-40, 1960, ease.inOutQuad(prog(t, ...T.wipe)))
const starPurple = t => t < T.cut3 ? ease.outCubic(prog(t, T.self, T.self + 0.3)) * 0.85 : 0.5

// ── pixel art
const EYE = ['..WWWWW..', '.WWPPPWW.', 'WWPPKPPWW', 'WWPKKKPWW', 'WWPPKPPWW', '.WWPPPWW.', '..WWWWW..']
const LOCK = ['..YYY..', '.Y...Y.', '.Y...Y.', 'YYYYYYY', 'YYYKYYY', 'YYYKYYY', 'YYYYYYY']
const CHECK = ['......G', '.....GG', 'G...GG.', 'GG.GG..', '.GGG...', '..G....']
const CROSS = ['R....R', 'RR..RR', '.RRRR.', '.RRRR.', 'RR..RR', 'R....R']
const MUG = ['KKKKKKK..', 'KCCCCCK..', 'MMMMMMMHH', 'MMMMMMM.H', 'MMMMMMM.H', 'MMMMMMMHH', 'MMMMMMM..', '.MMMMM...']
const ARROW = ['...XX', '..XXX', '.XXXX', 'XXXXX', '.XXXX', '..XXX', '...XX']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'It’s *Scorpio* | season.', { top: 190, size: 118, accentSize: 170, at: T.h0, gap: 0.1, accentColor: ACC, fit: true })
  const H1 = popText(root, 'Forecast: | *intense.*', { top: 190, size: 112, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: HOT, fit: true })
  const H2 = popText(root, 'Everything goes | *purple.*', { top: 190, size: 104, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: VIOLET, fit: true })
  const H3 = popText(root, 'Let it get | *deep.*', { top: 190, size: 112, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: '#a89bff', fit: true })
  const H4 = popText(root, 'Go *deep.* | Not dark.', { top: 200, size: 132, accentSize: 196, at: T.h4, gap: 0.12, late: 0, accentColor: ACC, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, [T.out[0] + 0.2, T.out[1]]]]
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1398, width: 960, height: 290, open: T.open, close: T.closeA, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1398, width: 960, height: 290, open: T.open2, close: T.closeB, cps: CPS })
  const bug = buildBug(root, { at: T.bug, dot: ACC })
  const ticker = buildTicker(root, { text: 'SCORPIO SEASON   ·   HIGH CHANCE OF DEEP TALKS   ·   PRIVATE SKIES   ·   ALL OR NOTHING', at: 0.7, out: [25.0, 25.4], accent: ACC })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── pieces
  // wheel ↔ board flips: 1 = the wheel is showing
  function wheelShow(t) {
    if (t < T.flipA[0]) return 1
    if (t < T.cut1) return 1 - prog(t, T.flipA[0], (T.flipA[0] + T.flipA[1]) / 2)
    if (t < T.flipB[0]) return 1
    if (t < T.cut3) return 1 - prog(t, T.flipB[0], (T.flipB[0] + T.flipB[1]) / 2)
    return 1
  }
  function boardShow(t, [a, b]) { return ease.outCubic(prog(t, (a + b) / 2, b)) }

  function drawTheWheel(t, ok) {
    const sx = wheelShow(t)
    if (sx <= 0.01) return
    const pin = pop01(t, T.wheelIn, 0.45, 1.8) * ok
    if (pin <= 0.01) return
    const hiK = t >= T.land ? 0.75 + 0.25 * Math.sin((t - T.land) * 4) : 0
    x.save(); x.translate(WX, WY); x.scale(sx * pin, pin); x.translate(-WX, -WY)
    drawWheel(x, t, { cx: WX, cy: WY, r: WR, rot: wheelRot(t), hi: 7, hiK, alpha: 1 })
    x.restore()
    if (t > T.land && sx > 0.5) {
      // the landing flash on ♏
      const fl = t - T.land
      if (fl < 0.6) { x.save(); x.globalAlpha = (1 - fl / 0.6) * 0.9; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; drawPixelStar(x, WX + Math.cos(a) * (60 + fl * 160), WY - WR * 0.9 + Math.sin(a) * (60 + fl * 160), 24, i % 2 ? 1 : 2, i % 2 ? GOLD : ACC) } x.restore() }
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
      { icon: 'eye', label: 'INTENSE', sub: 'heavy eye contact', col: HOT },
      { icon: 'lock', label: 'PRIVATE', sub: 'diaries: locked', col: GOLD },
      { icon: 'switch', label: 'ALL OR NOTHING', sub: 'maybe: not found', col: ACC },
    ]
    rows.forEach((R, i) => {
      const p = prog(t, T.rows[i], T.rows[i] + 0.22)
      if (p <= 0) return
      const yc = r.y0 + 60 + i * 140
      const s = i === 2 ? lerp(2.2, 1, ease.outCubic(p)) : lerp(1.6, 1, ease.outCubic(p))
      x.save(); x.globalAlpha = clamp(p * 2.5)
      x.translate(r.x0 + 70, yc); x.scale(s, s)
      if (R.icon === 'eye') drawBits(x, EYE, { W: BONE, P: HOT, K: INK }, 0, 0, 9)
      if (R.icon === 'lock') drawBits(x, LOCK, { Y: GOLD, K: INK }, 0, 0, 10)
      if (R.icon === 'switch') {
        x.fillStyle = INK; x.fillRect(-46, -26, 92, 52)
        x.fillStyle = '#3a8f5a'; x.fillRect(-40, -20, 80, 40)
        x.fillStyle = BONE; x.fillRect(4, -16, 32, 32)
        x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('ON', -18, 1)
      }
      x.restore()
      x.save(); x.globalAlpha = clamp(p * 2.5)
      const lx = r.x0 + 140 + (1 - ease.outCubic(p)) * 60
      x.textAlign = 'left'; x.textBaseline = 'middle'
      x.font = `700 ${i === 2 ? 40 : 46}px ${MONO}`; x.fillStyle = R.col; x.fillText(R.label, lx, yc - 18)
      x.font = `700 28px ${MONO}`; x.fillStyle = BONE; x.fillText(R.sub, lx, yc + 28)
      x.restore()
      if (i < 2 && p >= 1) { x.fillStyle = 'rgba(239,230,214,0.18)'; x.fillRect(r.x0 + 20, yc + 70, r.w - 40, 3) }
    })
    // the third slam sparks
    const st = t - T.rows[2]
    if (st > 0 && st < 0.6) { x.save(); x.globalAlpha = 1 - st / 0.6; for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2 + 0.3; drawPixelStar(x, r.x0 + 70 + Math.cos(a) * (40 + st * 200), r.y0 + 340 + Math.sin(a) * (40 + st * 200), 22, i % 2 ? 1 : 2, i % 2 ? GOLD : '#fff1c8') } x.restore() }
    x.restore()
  }

  // the depth gauge: 0 = top of SHALLOW, 1 = bottom of DARK
  const Z = { top: 700, shallow: 800, deep: 965, bottom: 1100 }
  function needle(t) {
    let v = 0.08
    v = lerp(v, 0.42, ease.inOutCubic(prog(t, T.flipB[1] + 0.2, T.deep)))
    v = lerp(v, 0.86, ease.inQuad(prog(t, ...T.sink)))
    v = lerp(v, 0.45, easeOutBack(prog(t, T.bonk, T.deep2), 2.4))
    return v + 0.012 * Math.sin(t * 5)
  }
  function drawGauge(t) {
    if (t < T.flipB[0] || t >= T.cut3) return
    const k = boardShow(t, T.flipB)
    if (k <= 0) return
    const shake = bump(t, T.bonk, 0.3) * Math.sin((t - T.bonk) * 80) * 8
    x.save(); x.translate(shake, 0)
    x.translate(BX + BW / 2, 0); x.scale(k, 1); x.translate(-(BX + BW / 2), 0)
    board(x, BX, BY, BW, BH, { title: 'DEPTH GAUGE', accent: '#a89bff' })
    const gx0 = 448, gw = 104
    const alarm = t > T.sink[0] + 0.5 && t < T.bonk ? 0.5 + 0.5 * Math.sin((t - T.sink[0]) * 18) : 0
    // zones
    x.fillStyle = INK; x.fillRect(gx0 - 8, Z.top - 8, gw + 16, Z.bottom - Z.top + 16)
    let g = x.createLinearGradient(0, Z.top, 0, Z.shallow); g.addColorStop(0, '#9fe3ff'); g.addColorStop(1, '#5aa8e8'); x.fillStyle = g; x.fillRect(gx0, Z.top, gw, Z.shallow - Z.top)
    g = x.createLinearGradient(0, Z.shallow, 0, Z.deep); g.addColorStop(0, '#8a6bff'); g.addColorStop(1, '#5b2fc0'); x.fillStyle = g; x.fillRect(gx0, Z.shallow, gw, Z.deep - Z.shallow)
    x.fillStyle = mixHex('#0c0716', '#5a0f22', alarm); x.fillRect(gx0, Z.deep, gw, Z.bottom - Z.deep)
    // bubbles in DEEP
    for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6) % 1; x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(gx0 + 14 + (i * 37) % 76, lerp(Z.deep - 10, Z.shallow + 8, ph), 6, 6) }
    // labels
    x.textAlign = 'left'; x.textBaseline = 'middle'
    const lx = 600
    const lab = (txt, sub, y, col, on) => { x.globalAlpha = on; x.font = `700 42px ${MONO}`; x.fillStyle = col; x.fillText(txt, lx, y - 18); x.font = `700 26px ${MONO}`; x.fillStyle = BONE; x.fillText(sub, lx, y + 22); x.globalAlpha = 1 }
    lab('SHALLOW', 'small talk', (Z.top + Z.shallow) / 2, '#9fe3ff', 0.75)
    lab('DEEP', 'big questions', (Z.shallow + Z.deep) / 2, '#b9a4ff', 1)
    lab('DARK', 'mind games', (Z.deep + Z.bottom) / 2, alarm > 0 ? mixHex('#ff4f6e', '#ffd0d8', alarm) : '#ff4f6e', 1)
    // ✓ next to DEEP (after it lands), ✕ next to DARK
    const chk = pop01(t, T.deep, 0.3, 2.6) * (1 - prog(t, T.sink[0] + 0.4, T.sink[0] + 0.5)) + pop01(t, T.deep2, 0.3, 2.6)
    if (chk > 0.02) drawBits(x, CHECK, { G: '#5fe08a' }, 930, (Z.shallow + Z.deep) / 2 - 18, 8 * clamp(chk, 0, 1.3))
    drawBits(x, CROSS, { R: '#ff4f6e' }, 930, (Z.deep + Z.bottom) / 2 - 18, 7 * (1 + 0.25 * alarm))
    // the needle
    const ny = lerp(Z.top, Z.bottom, needle(t))
    x.fillStyle = INK; x.fillRect(gx0 - 14, ny - 5, gw + 28, 10)
    x.fillStyle = '#fff1c8'; x.fillRect(gx0 - 10, ny - 2, gw + 20, 4)
    drawBits(x, ARROW, { X: GOLD }, gx0 + gw + 30, ny, 6)
    x.restore()
  }

  function forecasterState(t) {
    if (t < T.land) return { mood: 'happy', look: [1, -1] }
    if (t < T.l1) return { mood: 'sparkle', look: [1, -1] }
    if (t < T.flipA[0]) return { mood: 'happy', look: [0, 0] }
    if (t < T.rows[2]) return { mood: 'neutral', look: [1, 0] }
    if (t < T.stare[0]) return { mood: 'wide', look: [1, 0], blink: false }
    if (t < T.stare[1]) return { mood: 'squint', look: [0, 0], blink: false }           // the Scorpio stare
    if (t < T.wipe[0]) return { mood: 'happy', look: [0, 0] }
    if (t < T.self) return { mood: 'wide', look: [0, -1], blink: false }
    if (t < T.sip[0]) return { mood: 'wide', look: [0, 1], blink: false }                // …me too?
    if (t < T.away) return { mood: 'happy' }                                              // sip
    if (t < T.take) return { mood: 'neutral', look: [1, 1] }                              // looks into the mug
    if (t < T.l3) return { mood: 'wide', look: [0, 0], blink: false }                     // double-take
    if (t < T.sip2[0]) return { mood: 'neutral', look: [0, 0] }
    if (t < T.flipB[0]) return { mood: 'happy' }
    if (t < T.deep) return { mood: 'neutral', look: [1, 0] }
    if (t < T.sink[0] + 0.3) return { mood: 'happy', look: [1, 0] }
    if (t < T.bonk) return { mood: 'wide', look: [1, 1], blink: false }
    if (t < T.h4) return { mood: 'happy' }
    if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink' }
    return { mood: 'sparkle', look: [0, 0] }
  }

  // the pointer: where its tip points
  function pointerTip(t) {
    if (t < T.land - 0.4) return null
    if (t < T.flipA[0]) return { x: WX - 40, y: WY - WR + 40 }
    if (t < T.cut1) {
      const i = t < T.rows[1] ? 0 : t < T.rows[2] ? 1 : 2
      return { x: BX + 34, y: BY + 88 + 60 + i * 140 }
    }
    if (t < T.flipB[0]) return null                                                      // busy with the coffee
    if (t < T.cut3) {
      const ny = lerp(Z.top, Z.bottom, needle(t))
      const wind = prog(t, T.bonk - 0.25, T.bonk), hit = prog(t, T.bonk, T.bonk + 0.12)
      const tx = 448 - 6 - 30 * Math.sin(Math.PI * wind) * (1 - hit)
      return { x: tx, y: ny + (t > T.bonk - 0.3 && t < T.bonk + 0.2 ? 30 : 0) }
    }
    return null
  }

  function drawMug(t, kP, ok) {
    // rest on the desk → up to the face (sip) → held out, tilted at camera (the reveal) → back down
    const up = ease.inOutCubic(prog(t, T.sip[0], T.sip[1])) * (1 - ease.inOutCubic(prog(t, 14.2, 14.6)))
    const up2 = bump(t, T.sip2[0], T.sip2[1] - T.sip2[0] + 0.35)
    const out = ease.outCubic(prog(t, T.away, T.away + 0.2)) * (1 - ease.inOutCubic(prog(t, 14.2, 14.6)))
    const face = { x: FX + 92, y: FY - 6 }, held = { x: FX + 150, y: FY + 20 }
    let mx = lerp(MUG_REST.x, face.x, Math.max(up, up2)), my = lerp(MUG_REST.y, face.y, Math.max(up, up2))
    mx = lerp(mx, held.x, out); my = lerp(my, held.y, out)
    const rot = Math.max(up, up2) * -0.5 * (1 - out) + out * 0.35
    const purple = t >= T.away - 0.02 ? 1 : 0
    const coffee = purple ? '#9b3dff' : '#6b3f22', rim = purple ? '#d9b8ff' : '#d8cfe0'
    const cell = 7 + out * 5
    x.save(); x.globalAlpha = ok
    drawBits(x, MUG, { K: rim, C: coffee, M: BONE, H: BONE }, mx, my, cell, { rot })
    // steam
    for (let i = 0; i < 3; i++) {
      const ph = (t * 0.7 + i / 3) % 1
      x.globalAlpha = ok * Math.sin(Math.PI * ph) * 0.8
      x.fillStyle = purple ? '#c28bff' : '#d9d2e8'
      const sx = mx - 18 + i * 16 + Math.sin(ph * 9 + i) * 6, sy = my - cell * 6 - ph * 70
      x.fillRect(Math.round(sx), Math.round(sy), 6, 10)
    }
    x.restore()
    // the purple reveal sparkle
    if (purple) { const k = t - T.away; if (k < 0.5) { x.save(); x.globalAlpha = 1 - k / 0.5; for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; drawPixelStar(x, mx + Math.cos(a) * (30 + k * 120), my - 30 + Math.sin(a) * (30 + k * 120), 20, 1, i % 2 ? VIOLET : '#fff1c8') } x.restore() } }
    void kP
  }

  function drawScene(t) {
    const ok = popOut(t, T.out)
    // 1. the wheel / boards (under the wash)
    if (t < T.out[1] + 0.02) {
      drawTheWheel(t, ok)
    }
    // 2. the purple wash over the sky + wheel, wiping down
    const wk = washK(t)
    if (wk > 0) tintRect(x, PURPLE, wk, 0, 0, 1080, t < T.cut1 + 0.5 ? Math.max(0, wipeY(t)) : 1920)
    if (t >= T.out[1] + 0.02) return
    drawForecastBoard(t)
    drawGauge(t)
    // 3. the forecaster
    const fp = pop01(t, T.fIn, 0.38, 2.2) * ok
    const st = forecasterState(t)
    const kP = starPurple(t)
    const take = t >= T.take && t < T.take + 0.5 ? -0.14 * Math.exp(-(t - T.take) * 7) * Math.cos((t - T.take) * 22) : 0
    const stareSq = t >= T.stare[0] && t < T.stare[1] ? 0.06 : 0
    const fcol = mixHex(STAR.sky, '#b07cff', kP)
    let rF = null
    if (fp > 0.02) rF = drawStarChar(x, FX, FY, FS, t, { color: fcol, ...st, hops: F_HOPS, pop: fp, squash: take + stareSq, seed: 3, glow: 1.1 })
    // the pointer
    const tip = pointerTip(t)
    if (tip && rF) drawPointer(x, ARM.x, ARM.y + (rF.y - FY), tip.x, tip.y, clamp(fp) * (t < T.land - 0.2 ? prog(t, T.land - 0.4, T.land - 0.2) : 1))
    // 4. Pisces (behind the desk, crying)
    const pp = pop01(t, T.pisIn, 0.36, 2.0) * ok
    const cry = t < T.rows[0] ? 1 : t < T.cut1 ? 2 : t < T.away ? 1 : t < T.flipB[0] ? 3 : t < T.h4 ? 2 : 3
    const pMood = t >= T.away && t < T.flipB[0] ? 'wide' : 'sparkle'
    drawPisces(x, t, { x: PX, y: PY, size: PS, cry, mood: pMood, pop: pp, look: t >= T.away && t < T.l3 ? [-1, 0] : [-1, -1], hops: PIS_HOPS })
    // 5. the desk (+ its share of the wash)
    const dk = pop01(t, T.deskIn, 0.4, 1.6) * ok
    const deskTint = t < T.cut1 + 0.5 ? clamp((wipeY(t) - DESK_Y) / 150) * wk : wk
    if (dk > 0.02) {
      x.save(); x.translate(540, DESK_Y + 75); x.scale(1, dk); x.translate(-540, -(DESK_Y + 75))
      drawDesk(x, { y: DESK_Y, tint: '#7b2fd6', tintK: deskTint * 0.75, accent: t < T.wipe[0] ? GOLD : mixHex(GOLD, ACC, deskTint) })
      x.restore()
    }
    // 6. the coffee
    drawMug(t, kP, clamp(dk))
    // the finale: soft violet sparkles
    if (t > T.h4Land) for (let i = 0; i < 10; i++) {
      const ph = ((t - T.h4Land) * 0.4 + i / 10) % 1
      x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.8 * ok
      drawPixelStar(x, 120 + (i * 97) % 860, 1160 - ph * 600, 18 + (i % 3) * 6, i % 2 ? 1 : 2, i % 2 ? VIOLET : GOLD)
      x.restore()
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

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 622.25, 698.46, 783.99, 830.61, 932.33, 1046.5]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
// a click each time a wedge passes the marker while the wheel spins
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
  // hook: the desk, the wheel spins and lands on ♏ on the drop
  ...wordPops(T.h0, 3, 0.1, 0, 0.026),
  ['pop', T.deskIn + 0.1, 392, 0.04, 0], ['whoosh', T.wheelIn, 0.8, 0.05], ['pop', T.fIn + 0.05, 783.99, 0.04, -0.3], ['pop', T.pisIn + 0.05, 1046.5, 0.025, 0.5],
  ...spinTicks,
  ['boom', T.land, 0.2], ['bell', T.land, 1046.5, 0.035, 1.4, 0], ['glitter', T.land, T.land + 0.5],
  ['pop', T.open, 698.46, 0.035, 0], ['pop', T.open + 0.06, 932.33, 0.03, 0],
  ...talkCues([...LINES_A, ...LINES_B], { cps: CPS }),
  // forecast: intense — the flip, three slams (the third shakes the board)
  ['whoosh', T.flipA[0], 0.4, 0.04], ['tick', (T.flipA[0] + T.flipA[1]) / 2, 0.05],
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['boom', T.rows[0], 0.1], ['pop', T.rows[0], 523.25, 0.04, 0.3],
  ['boom', T.rows[1], 0.12], ['pop', T.rows[1], 622.25, 0.04, 0.3],
  ['boom', T.rows[2], 0.24], ['pop', T.rows[2], 783.99, 0.05, 0.3], ['tick', T.rows[2] + 0.04, 0.06], ['glitter', T.rows[2], T.rows[2] + 0.4],
  ['pluck', T.stare[0], 261.63, 0.04, 0.9, 0],
  ['pop', T.closeA, 698.46, 0.03, 0], ['pop', T.closeA + 0.07, 523.25, 0.03, 0],
  // everything goes purple: wipe, self, sip, the reveal, double-take
  ...wordPops(T.h2, 2, 0.08, 1, 0.026), ['pop', T.h2Land, 932.33, 0.045, 0],
  ['riser', T.wipe[0] - 0.1, T.wipe[1], 0.05], ['bell', T.wipe[1], 622.25, 0.03, 1.6, 0],
  ['pluck', T.self, 466.16, 0.04, 0.5, -0.2],
  ['pop', T.sip[0] + 0.3, 349.23, 0.025, -0.2], ['pop', T.sip[0] + 0.45, 349.23, 0.022, -0.2],
  ['glitter', T.away, T.away + 0.4], ['pop', T.take, 440, 0.05, 0], ['pluck', T.take + 0.05, 196, 0.05, 0.7, 0],
  ['pop', T.open2, 698.46, 0.035, 0], ['pop', T.open2 + 0.06, 932.33, 0.03, 0],
  ['pop', T.sip2[0] + 0.3, 349.23, 0.022, -0.2],
  // let it get deep: gauge, ✓, the sink + alarm, the bonk, ✓ again
  ['whoosh', T.flipB[0], 0.4, 0.04], ['tick', (T.flipB[0] + T.flipB[1]) / 2, 0.05],
  ...wordPops(T.h3, 3, 0.07, 3, 0.025), ['pop', T.h3Land, 1046.5, 0.045, 0],
  ['bell', T.deep, 1567.98, 0.03, 0.9, 0.3],
  ...[0, 1, 2, 3].map(i => ['pop', +(T.sink[0] + 0.55 + i * 0.18).toFixed(3), i % 2 ? 622.25 : 783.99, 0.03, 0.3]),
  ['pop', T.bonk, 261.63, 0.06, 0.2], ['tick', T.bonk, 0.07], ['bell', T.deep2, 1567.98, 0.035, 1.0, 0.3],
  ['pop', T.closeB, 698.46, 0.03, 0], ['pop', T.closeB + 0.07, 523.25, 0.03, 0],
  // go deep, not dark
  ...wordPops(T.h4, 4, 0.12, 0, 0.03), ['pluck', T.h4 + 0.1, 1046.5, 0.04, 0.8, 0], ['glitter', T.h4Land, T.h4Land + 0.6],
  ['pluck', T.wink[0], 1174.66, 0.035, 0.5, -0.2], ['pop', T.sob, 523.25, 0.03, 0.5], ['pop', T.sob + 0.15, 466.16, 0.03, 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
