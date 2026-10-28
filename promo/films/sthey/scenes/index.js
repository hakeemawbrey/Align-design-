// sthey — "hey" (45 s vertical Align ad, Star Talk season 3 #8, music: chiptune · E). Story 0–40.6, then the shared end card.
//   0.00–2.82  "The signs when their | match sends *“hey.”*"  A huge "hey" notification slams into the middle of the sky and
//              the twelve sign stars burst up from the bottom into a ring around it, wide-eyed (the zodiac wheel, staring).
//   2.82       DROP. Rapid fire: one sign every ~2 s, hard cuts, headline "♈ *Aries*" etc., the "hey" pinned at the top:
//              ♈ "HEY. coffee? now? I'm outside." (dashes off screen) · ♉ "is this 'hey' buying me dinner or" (croissant,
//              slow chew) · ♊ "hey hey hey hey hey" (five replies at once, a twin, a sixth typing) · ♋ "it's 'hey' not
//              'hi'. are they mad at me" (darting eyes, one tear; Pisces cries along) · ♌ "hey? that's it? I'm a whole
//              show." (spotlight, crown, marquee TONIGHT: ME) · ♍ "no punctuation. noted." (red pen circles it: C−) ·
//              ♎ "drafted six replies. sent none." (six drafts pop) · ♏ "screenshotted. sent to three chats." (flash, three
//              phones: SENT) · ♐ "hey!! replying from Lisbon btw" (gate, plane, suitcase) · ♑ "pencilled in a reply
//              for Q3." (planner flips JUL→SEP) · ♒ "replied with a meme from 2014." (sideways, crusty cat meme) ·
//              ♓ … silence … "we're getting married." (veil, bells, hearts, fountain tears).
//  10.88 / 20.88  card cuts (between Cancer → Leo and Sag → Capricorn).
//  27.27      FREEZE: record scratch, the ring again, frozen mid-gag, desaturated, ❚❚. Aries' spot is empty (dust).
//             "Hold *up.*"  THE STARS (gold) drop into the middle: "nobody deserves a 'hey'." Aries skids back in with a
//             coffee. "ask them something worth answering." The gold star deals a talk card: "What's a hill you will die on?"
//  31.71      LIFT: twelve typing bubbles at once, all heart-eyes. "*Everyone’s* typing."
//  33.25      card cut. 33.38 ★ LESSON UNLOCKED: "Effort is attractive. | Send something | worth *answering.*" (+1 RIZZ)
//  37.6–40.5  "Skip the *hey.*"  The old "hey" drops back in over the card… and gets swiped away. The ring cheers.
//             Everything pops out by 40.45; the end card takes over at 40.6.
// One canvas (sky + scene), DOM type + the text boxes + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, crownCells, tieCells, tiaraCells, veilCells, tearsCells, dropCell, drawHeyNotif, HEY_AT, drawBubble, drawTyping,
  drawCroissant, drawRedPen, drawCoffee, drawHeart, drawSuitcase, drawPlane, drawMiniPhone, drawMemeCat, drawMarquee, drawSpotlight, drawBoard,
  drawPlanner, drawPencil, dustPuff, speedLines, rapidBox, INK } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const TAU = Math.PI * 2
const BL = 60 / 108, E8 = BL / 2
const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid
const EI = n => +(0.6 + n * E8).toFixed(3)        // eighth notes

// ── the twelve
const IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const NAMES = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
const TAGS = ['ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 'SAG', 'CAPRICORN', 'AQUARIUS', 'PISCES']
const SG = IDS.map(id => signStar(id))
const VS = '︎'
const RAPID = [
  "HEY. coffee? now? I'm *outside.*",
  "is this 'hey' buying me *dinner* or",
  'hey hey hey hey *hey*',
  "it's 'hey' not 'hi'. are they *mad at me*",
  "hey? that's it? I'm a *whole show.*",
  'no punctuation. *noted.*',
  'drafted six replies. sent *none.*',
  'screenshotted. sent to *three chats.*',
  'hey!! replying from *Lisbon* btw',
  'pencilled in a reply for *Q3.*',
  'replied with a meme *from 2014.*',
  "we're getting *married.*",
]
// slot lengths in eighth notes (7 ≈ 1.94 s): Cancer and Sag get 8 (a card cut follows each), Pisces 9 (2 of silence first)
const SLOT_E = [7, 7, 7, 8, 7, 7, 7, 7, 8, 7, 7, 9]
export const CUT = []
{ let n = 8; for (const e of SLOT_E) { CUT.push(EI(n)); n += e } }
const PIS_LINE = EI(89)                                            // 25.322: Pisces finally speaks
const LINE_T = CUT.map((c, i) => i === 11 ? PIS_LINE : +(c + 0.04).toFixed(3))
const REV = RAPID.map(s => +clamp(s.replace(/\*/g, '').length * 0.0085, 0.15, 0.3).toFixed(3))

// ── the timeline
export const T = {
  black: [0, 0.3],
  slam: 0.08, slamHit: 0.26, h0: 0.24, h0Land: 1.0, launch: 0.7, launchGap: 0.05, lean: [1.95, 2.3], blinkSync: 2.38,
  drop: CUT[0],                                                    // 2.822
  pisces: CUT[11], pisLine: PIS_LINE, brk: BEAT(44),               // 24.767 · 25.322 · drums out at 25.044
  freeze: EI(96),                                                  // 27.267 record scratch
  hTurn: 27.32, hTurnLand: 27.6, gold: 27.6, goldLand: 27.95, boxOpen: 27.66, lA: 27.85,
  ariesBack: [29.2, 29.55], lB: 30.15,
  cardIn: [31.05, 31.5], goldOut: [31.06, 31.36], hTurnOut: [31.48, 31.66],
  burst: BEAT(56),                                                 // 31.711 lift: everyone's typing
  hPay: 31.74, hPayOut: [33.0, 33.18], boxClose: 32.85,
  cutL: 33.25, lesson: BEAT(59), lessonOut: [37.35, 37.55],         // 33.378
  hLast: 37.62, hLastLand: 38.25, notifIn: [37.66, 37.98], swipe: [38.17, 38.42], cheer: 38.3, cheer2: 38.86,
  out: [40.0, 40.45], hLastOut: [40.05, 40.32],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Effort is attractive. | Send something | worth *answering.*', chip: '+1 RIZZ', accentColor: GOLD, dim: 0.55 }

// ── dialogue: the rapid box (one quick burst per sign) + THE STARS (typed)
const RLINES = RAPID.map((text, i) => ({ t: LINE_T[i], seg: CUT[i], speaker: `${SG[i].glyph}${VS} ${TAGS[i]}`, color: SG[i].color, text, rev: REV[i] }))
const STARS = 'THE STARS'
const CPS = 30
const SLINES = [
  { t: T.lA, speaker: STARS, text: "nobody deserves a *'hey'.*" },
  { t: T.lB, speaker: STARS, text: 'ask them something *worth answering.*' },
]
export const SLT = lineTimes(SLINES, { cps: CPS })
const GOLD_HOPS = talkHops(SLINES, STARS, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const slotOf = t => { let i = -1; for (let k = 0; k < 12; k++) if (t >= CUT[k]) i = k; return i }

// ── geometry
const NOTIF_AT = { x: 540, y: 470, s: 0.9 }                          // the "hey", pinned at the top during the rapid fire
const SOLO = { x: 540, y: 1000, s: 460 }
const RING = { cx: 540, cy: 930, rx: 390, ry: 440, s: 150 }
const ringPos = k => { const a = -Math.PI / 2 + k * Math.PI / 6; return [RING.cx + RING.rx * Math.cos(a), RING.cy + RING.ry * Math.sin(a)] }
const lookAt = (x0, y0, x1, y1) => [Math.abs(x1 - x0) > 60 ? Math.sign(x1 - x0) : 0, Math.abs(y1 - y0) > 60 ? Math.sign(y1 - y0) : 0]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 62px Inter", "900 54px Inter", "italic 500 150px 'EB Garamond'", "italic 600 30px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "400 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, talkIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-talk-1.png')])
  const BACK = bake(backIm, 640), TALK = bake(talkIm, 640)
  const BACK_BODY = 1320 / 1528, TALK_BODY = 610 / 732

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The signs when their | match sends *“hey.”*', { top: 126, size: 80, accentSize: 128, at: T.h0, gap: 0.08, late: 1, lateAt: T.h0Land, wobble: true, accentColor: PINK, lineHeight: 1.0, fit: true })
  const SH = NAMES.map((n, i) => popText(root, `${SG[i].glyph}${VS} *${n}*`, { top: 150, size: 104, accentSize: 150, at: CUT[i], gap: 0.03, late: 1, lateAt: CUT[i] + 0.04, wobble: true, accentColor: SG[i].color, fit: true }))
  const HT = popText(root, 'Hold *up.*', { top: 150, size: 124, accentSize: 176, at: T.hTurn, late: 1, lateAt: T.hTurnLand, wobble: true, accentColor: GOLD })
  const HP = popText(root, '*Everyone’s* typing.', { top: 160, size: 100, accentSize: 136, at: T.hPay, gap: 0.09, wobble: true, accentColor: PINK, fit: true })
  const HL = popText(root, 'Skip the *hey.*', { top: 140, size: 124, accentSize: 184, at: T.hLast, gap: 0.09, late: 1, lateAt: T.hLastLand, wobble: true, accentColor: PINK })
  const rbox = rapidBox(root, { lines: RLINES, y: 1480, width: 960, height: 250, open: T.drop, close: T.freeze })
  const sbox = dialogueBox(root, { lines: SLINES, y: 1480, width: 960, height: 250, open: T.boxOpen, close: T.boxClose, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ helpers ═══════════════════════
  /** a star with optional rotation/stretch and props behind (before) / in sprite cells (cells) / on top (after) */
  function star(px, py, size, t, opts, { rot = 0, sx = 1, sy = 1, before, cells, after } = {}) {
    x.save(); x.translate(px, py); x.rotate(rot); x.scale(sx, sy)
    const F = starFrame(0, 0, size, t, opts)
    if (before) inSprite(x, F, () => before(F))
    drawStarChar(x, 0, 0, size, t, opts)
    if (cells) inSprite(x, F, () => cells(F))
    if (after) after(F)
    x.restore()
    return F
  }
  function signBg(i, t, r, cx, cy) {
    const col = SG[i].color
    const g = x.createRadialGradient(cx, cy, 30, cx, cy, 760)
    g.addColorStop(0, rgba(col, 0.36)); g.addColorStop(0.55, rgba(col, 0.1)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.fillRect(0, 0, W, 1920)
    // slow sunburst
    x.save(); x.translate(cx, cy); x.rotate(t * 0.12 + i)
    x.fillStyle = rgba(col, 0.07)
    for (let k = 0; k < 14; k++) { x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 1500, k * TAU / 14, k * TAU / 14 + TAU / 28); x.closePath(); x.fill() }
    x.restore()
  }
  function pisPeek(t, px, py, rot, { tears = 2, mood = 'sparkle', look = [1, -1], seed = 61 } = {}) {
    star(px, py, 170, t, { color: SG[11].color, glyph: SG[11].glyph, mood, look, seed, bob: 4 }, { rot, cells: () => tearsCells(x, t, tears) })
  }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.7 + 0.5 * p), cy + Math.sin(a) * R0 * (0.7 + 0.5 * p), 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  const notifTop = (t, o = {}) => drawHeyNotif(x, NOTIF_AT.x, NOTIF_AT.y + Math.sin(t * 2.1) * 4, NOTIF_AT.s, o)

  // ═══════════════════════ 0 · the hook ═══════════════════════
  const ORDER = [6, 5, 7, 4, 8, 3, 9, 2, 10, 1, 11, 0]           // bottom of the ring first
  function hookStarPose(k, t) {
    const [rx, ry] = ringPos(k)
    const lt = T.launch + ORDER.indexOf(k) * T.launchGap, p = prog(t, lt, lt + 0.42)
    if (p <= 0) return null
    const sx0 = rx + (rx - 540) * 0.35
    let px = lerp(sx0, rx, ease.outCubic(p)), py = lerp(2080, ry, easeOutBack(p, 1.25))
    const rot = (1 - ease.outCubic(p)) * (k % 2 ? 1 : -1) * 1.1
    const d = t - (lt + 0.42)
    const sq = d > 0 ? 0.2 * Math.exp(-d * 9) * Math.cos(d * 24) : -0.12 * (1 - p)
    const ln = ease.inOutQuad(prog(t, T.lean[0], T.lean[0] + 0.2)) * (1 - ease.inOutQuad(prog(t, T.lean[1] + 0.2, T.lean[1] + 0.4)))
    px += (RING.cx - rx) * 0.05 * ln; py += (RING.cy - ry) * 0.05 * ln
    return { px, py, rot, sq }
  }
  function drawHook(t) {
    const shake = t > T.slamHit ? 16 * Math.exp(-(t - T.slamHit) * 8) * Math.sin(t * 73) : 0
    x.save(); x.translate(shake, shake * 0.6)
    // the wheel: a faint gold ring through the twelve spots + a centre glow
    wheelBg(t, clamp(prog(t, 0.6, 1.2)))
    // the notification slam
    const p = prog(t, T.slam, T.slamHit)
    if (p > 0) {
      const sc = p < 1 ? lerp(3.2, 1.18, ease.inCubic(p)) : 1.18 * (1 + 0.07 * Math.exp(-(t - T.slamHit) * 9) * Math.cos((t - T.slamHit) * 30))
      drawHeyNotif(x, RING.cx, RING.cy, sc, { alpha: clamp(p * 4), glow: 1 + 2 * Math.exp(-(t - T.slamHit) * 4) * (t > T.slamHit ? 1 : 0) })
      if (t > T.slamHit && t < T.slamHit + 0.5) { const q = (t - T.slamHit) / 0.5; x.save(); x.globalAlpha = 1 - q; x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.ellipse(RING.cx, RING.cy, 330 + q * 260, 110 + q * 120, 0, 0, TAU); x.stroke(); x.restore() }
    }
    // the twelve pop up
    for (let k = 0; k < 12; k++) {
      const P = hookStarPose(k, t)
      if (!P) continue
      const [rx, ry] = ringPos(k)
      const blink = inR(t, T.blinkSync, T.blinkSync + 0.14) ? 1 : false
      star(P.px, P.py, RING.s, t, { color: SG[k].color, glyph: SG[k].glyph, mood: 'wide', look: lookAt(rx, ry, RING.cx, RING.cy), blink, squash: P.sq, seed: 30 + k, bob: 4 }, { rot: P.rot })
    }
    x.restore()
  }
  function wheelBg(t, k) {
    if (k <= 0) return
    const g = x.createRadialGradient(RING.cx, RING.cy, 20, RING.cx, RING.cy, 520)
    g.addColorStop(0, rgba(GOLD, 0.2 * k)); g.addColorStop(1, rgba(GOLD, 0))
    x.fillStyle = g; x.fillRect(0, 0, W, 1920)
    x.save(); x.globalAlpha = 0.32 * k; x.strokeStyle = GOLD; x.lineWidth = 3; x.setLineDash([4, 14])
    x.lineDashOffset = -t * 12
    x.beginPath(); x.ellipse(RING.cx, RING.cy, RING.rx, RING.ry, 0, 0, TAU); x.stroke()
    x.setLineDash([]); x.restore()
  }

  // ═══════════════════════ 1 · rapid fire ═══════════════════════
  const SOLOS = [
    // ♈ ARIES: hops on the spot, crouches… dashes off screen
    (t, r) => {
      const i = 0, dashT = 1.18
      let px = SOLO.x + (r < 1.0 ? 3 * Math.sin(r * 55) : 0), sq = 0, sx = 1, sy = 1
      if (inR(r, 1.0, dashT)) sq = 0.24 * ease.outQuad(prog(r, 1.0, dashT))
      const dp = prog(r, dashT, dashT + 0.2)
      if (r >= dashT) { px = SOLO.x + 1500 * ease.inCubic(dp); sx = 1 + 0.7 * Math.min(1, dp * 3); sy = 1 - 0.32 * Math.min(1, dp * 3) }
      notifTop(t)
      speedLines(x, 260, 1080, SOLO.y, prog(r, dashT + 0.04, dashT + 0.7), { n: 8, h: 300 })
      dustPuff(x, SOLO.x - 40, SOLO.y + 190, prog(r, dashT, dashT + 0.8), { n: 9, spread: 170, seed: 4 })
      const mood = r < 1.0 ? 'sparkle' : 'squint', look = r < 0.55 ? [0, -1] : [1, 0]
      const hops = [0.02, 0.22, 0.42, 0.62, 0.82].map(v => CUT[i] + v)
      if (px < 1500) star(px, SOLO.y, SOLO.s, t, { color: SG[i].color, glyph: SG[i].glyph, mood, look, squash: sq, hops, seed: 20, pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) }, { sx, sy })
    },
    // ♉ TAURUS: a croissant, a slow chew, a squint
    (t, r) => {
      const i = 1, px = 590
      notifTop(t)
      const bites = (r >= 0.42 ? 1 : 0) + (r >= 1.26 ? 1 : 0)
      const chew = r > 0.42 ? 0.05 * Math.sin((r - 0.42) * TAU * 2.1) : 0
      const mood = r < 1.45 ? 'squint' : 'happy'
      star(px, SOLO.y, SOLO.s, t, { color: SG[i].color, glyph: SG[i].glyph, mood, look: r < 1.45 ? [-1, -1] : [0, 0], squash: chew, seed: 21, bob: 6, pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) })
      drawCroissant(x, 300, 950 + 4 * Math.sin(t * 2), 13, bites, -0.25)
      for (const bt of [0.42, 1.26]) {                             // crumbs
        const d = r - bt
        if (d < 0 || d > 0.8) continue
        const rr = rng(Math.round(bt * 100))
        for (let k = 0; k < 6; k++) { const vx = (rr() - 0.5) * 160, vy = -60 - rr() * 120; x.fillStyle = k % 2 ? '#e3a24a' : '#b8702c'; x.fillRect(Math.round(392 + vx * d), Math.round(930 + vy * d + 900 * d * d), 10, 10) }
      }
    },
    // ♊ GEMINI: five replies at once (and a twin, and a sixth on the way)
    (t, r) => {
      const i = 2, c = CUT[i]
      notifTop(t)
      star(208, 860, 250, t, { color: SG[i].color, glyph: null, mood: 'sparkle', look: [1, 0], seed: 41, hops: [c + 0.14, c + 0.46, c + 0.9] })
      star(400, 1030, 420, t, { color: SG[i].color, glyph: SG[i].glyph, mood: 'sparkle', look: [1, 0], seed: 22, hops: [c + 0.04, c + 0.32, c + 0.78], pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) })
      for (let k = 0; k < 5; k++) {
        const rk = 0.04 + 0.06 * k, s = easeOutBack(prog(r, rk, rk + 0.18), 2.6)
        drawBubble(x, 820, 676 + k * 92, 210, 74, { fill: SG[i].color, text: 'hey', color: INK, font: `800 44px ${INTER}`, side: 'r', sc: s, rot: (k % 2 ? 0.04 : -0.035) })
      }
      if (r > 0.45) { x.save(); x.globalAlpha = clamp((r - 0.45) * 5); x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.fillStyle = 'rgba(239,230,214,0.8)'; x.fillText('✓✓ DELIVERED ×5', 925, 1146); x.restore() }
      if (r > 1.0) drawTyping(x, 852, 1214, easeOutBack(prog(r, 1.0, 1.18), 2.4), t, { fill: SG[i].color, dot: INK })
    },
    // ♋ CANCER: darting eyes, one tear (Pisces cries along)
    (t, r) => {
      const i = 3
      notifTop(t)
      pisPeek(t, 118, 1338, 0.2, { tears: r > 0.9 ? 2 : 1, look: [1, -1] })
      const look = r < 0.25 ? [0, -1] : (Math.floor(r * 7) % 2 ? [-1, -1] : [1, -1])
      star(SOLO.x + 3 * Math.sin(r * 70), SOLO.y, SOLO.s, t, { color: SG[i].color, glyph: SG[i].glyph, mood: 'wide', look, blink: false, seed: 23, bob: 3, pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) }, { cells: () => dropCell(x, prog(r, 0.55, 1.9)) })
    },
    // ♌ LEO: a spotlight, a crown, a marquee
    (t, r) => {
      const i = 4, c = CUT[i]
      const fl = r < 0.04 ? 0.6 : r < 0.08 ? 0.15 : r < 0.12 ? 0.8 : 1
      drawSpotlight(x, SOLO.x, -80, 1230, 150, 780, fl)
      drawMarquee(x, 540, 642, 600, 128, t, 'TONIGHT: ME', { k: easeOutBack(prog(r, 0.85, 1.12), 2.2) })
      notifTop(t)
      pisPeek(t, 962, 1338, -0.2, { tears: 2, mood: 'heart', look: [-1, -1], seed: 62 })
      const mood = r < 0.85 ? 'squint' : 'sparkle'
      star(SOLO.x, 1010, SOLO.s, t, { color: SG[i].color, glyph: SG[i].glyph, mood, look: r < 0.85 ? [0, -1] : [0, 0], seed: 24, hops: [c + 0.88, c + 1.3], pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) }, { cells: () => crownCells(x) })
    },
    // ♍ VIRGO: the red pen circles the "hey"… C−
    (t, r) => {
      const i = 5, c = CUT[i]
      notifTop(t, {})
      const hx = NOTIF_AT.x + HEY_AT.x * NOTIF_AT.s, hy = NOTIF_AT.y + Math.sin(t * 2.1) * 4 + HEY_AT.y * NOTIF_AT.s - 8
      const p = prog(r, 0.12, 0.72), a0 = -2.5, a1 = a0 + p * TAU * 1.08
      const pt = a => [hx + Math.cos(a) * 96 * (1 + 0.05 * Math.sin(a * 3)), hy + Math.sin(a) * 52 * (1 + 0.06 * Math.cos(a * 2))]
      if (p > 0) {
        x.save(); x.lineCap = 'round'; x.lineJoin = 'round'
        for (const [lw, col] of [[14, INK], [8, '#ff3a52']]) { x.strokeStyle = col; x.lineWidth = lw; x.beginPath(); for (let a = a0; a <= a1; a += 0.06) { const [qx, qy] = pt(a); a === a0 ? x.moveTo(qx, qy) : x.lineTo(qx, qy) } x.stroke() }
        x.restore()
      }
      const gk = prog(r, 0.85, 1.05)
      if (gk > 0) {
        const s = easeOutBack(gk, 3)
        x.save(); x.translate(842, 452); x.rotate(-0.16); x.scale(s * (1 + 0.6 * (1 - gk)), s * (1 + 0.6 * (1 - gk)))
        x.font = `800 112px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 16; x.strokeStyle = INK; x.strokeText('C−', 0, 0); x.fillStyle = '#ff3a52'; x.fillText('C−', 0, 0)
        x.restore()
      }
      const nod = 0.12 * bump(r, 1.02, 0.3)
      star(570, 1010, SOLO.s, t, { color: SG[i].color, glyph: SG[i].glyph, mood: 'squint', look: r < 1.0 ? [-1, -1] : [0, 0], squash: nod, seed: 25, pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) })
      // the pen: follows the circle, then writes the grade, then rests
      let tip
      if (r < 0.12) tip = [pt(a0)[0] + 60, pt(a0)[1] + 120 * (1 - r / 0.12)]
      else if (r < 0.78) tip = pt(a1)
      else if (r < 1.05) { const q = prog(r, 0.78, 1.0); tip = [lerp(pt(a1)[0], 800 + 60 * Math.sin(q * 9), q), lerp(pt(a1)[1], 452 + 20 * Math.cos(q * 11), q)] }
      else tip = [900, 560]
      drawRedPen(x, tip[0], tip[1], 7, -0.7 + (r < 0.78 ? 0.25 * Math.sin(r * 18) : 0))
      void c
    },
    // ♎ LIBRA: six drafts, zero sent
    (t, r) => {
      const i = 6
      notifTop(t)
      pisPeek(t, 118, 1338, 0.2, { tears: r > 1.25 ? 3 : 1, look: [1, -1] })
      const D = [[215, 690, 'hey!'], [540, 640, 'hiii :)'], [865, 700, 'hello there'], [190, 1110, 'heyyy'], [890, 1110, "hi! how's ur"], [540, 1292, 'omg hi']]
      const popOrder = [3, 0, 5, 2, 4, 1]
      const lookC = [[-1, -1], [0, -1], [1, -1], [-1, 1], [1, 1], [0, 1]]
      const sigh = r >= 1.52
      star(SOLO.x, 1010, SOLO.s, t, { color: SG[i].color, glyph: SG[i].glyph, mood: r < 1.2 ? 'wide' : sigh ? 'eyeroll' : 'squint', look: r < 1.2 ? lookC[Math.floor(r * 5) % 6] : [0, 0], squash: sigh ? 0.07 : 0, blink: r < 1.2 ? false : undefined, seed: 26, pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) })
      D.forEach(([dx, dy, txt], k) => {
        const rin = 0.04 + 0.05 * k, rout = 1.2 + 0.05 * popOrder.indexOf(k)
        if (r < rin || r > rout + 0.16) return
        const s = r < rout ? easeOutBack(prog(r, rin, rin + 0.2), 2.4) : 1 + 0.25 * prog(r, rout, rout + 0.16)
        const a = r < rout ? 1 : 1 - prog(r, rout, rout + 0.16)
        const wv = Math.sin(t * 3 + k * 1.7)
        x.font = `600 36px ${INTER}`
        const w = Math.max(150, x.measureText(txt).width + 56)
        drawBubble(x, dx, dy + 6 * Math.sin(t * 2 + k), w, 70, { fill: rgba(SG[i].color, 0.28), text: txt, color: BONE, font: `600 36px ${INTER}`, side: k % 2 ? 'l' : 'r', sc: s, rot: 0.05 * wv, alpha: a, dashed: true })
        if (a > 0.5) { x.save(); x.globalAlpha = a * clamp(s); x.font = `700 18px ${MONO}`; x.textAlign = 'left'; x.fillStyle = PINK; x.fillText('DRAFT', dx - w / 2 + 14, dy - 44); x.restore() }
      })
    },
    // ♏ SCORPIO: screenshot (flash) → three phones: SENT
    (t, r) => {
      const i = 7
      const P = [[290, 812, -0.32], [540, 706, 0], [790, 812, 0.32]]
      P.forEach(([px, py, rot], k) => { const rk = 0.5 + 0.12 * k; drawMiniPhone(x, px, py, 112, { rot, sc: easeOutBack(prog(r, rk, rk + 0.24), 2.2), sent: prog(r, rk + 0.2, rk + 0.42) }) })
      const fl = r >= 0.1 ? 1 - prog(r, 0.1, 0.32) : 0
      notifTop(t, { flash: fl })
      const tp = prog(r, 0.22, 0.52)
      if (tp > 0) drawHeyNotif(x, lerp(NOTIF_AT.x, 205, ease.inOutCubic(tp)), lerp(NOTIF_AT.y, 1300, ease.inOutCubic(tp)), lerp(NOTIF_AT.s, 0.34, ease.inOutCubic(tp)), { flash: 0.12, alpha: 0.98 })
      star(SOLO.x, 1030, SOLO.s, t, { color: SG[i].color, glyph: SG[i].glyph, mood: 'squint', look: r < 0.6 ? [0, -1] : [0, 0], seed: 27, hops: [CUT[i] + 0.78], pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) })
      if (fl > 0) { x.fillStyle = `rgba(255,255,255,${0.55 * fl})`; x.fillRect(0, 0, W, 1920) }
    },
    // ♐ SAG: gate 9, Lisbon, a plane, a suitcase
    (t, r) => {
      const i = 8, c = CUT[i]
      drawBoard(x, 540, 668, 720, 160, t, [['LISBON', 'BOARDING', true]])
      const pp = prog(r, 0.3, 1.45)
      if (pp > 0 && pp < 1) {
        const px = lerp(-260, 1340, pp), py = 860 - 60 * pp
        x.save(); x.globalAlpha = 0.6; x.fillStyle = BONE; x.fillRect(Math.round(-260), Math.round(py + 4), Math.round(px - 110 + 260), 6); x.restore()
        drawPlane(x, px, py, 9)
      }
      notifTop(t)
      star(510, 1020, SOLO.s, t, { color: SG[i].color, glyph: SG[i].glyph, mood: 'happy', look: [0, 0], seed: 28, hops: [c + 0.04, c + 0.5, c + 0.96, c + 1.42], pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) })
      drawSuitcase(x, 880, 1262, 9)
    },
    // ♑ CAPRICORN: the planner flips to Q3
    (t, r) => {
      const i = 9
      notifTop(t)
      const month = r < 0.42 ? 'JUL' : r < 0.72 ? 'AUG' : 'SEP'
      const next = r < 0.42 ? 'AUG' : r < 0.72 ? 'SEP' : null
      const flip = r < 0.42 ? prog(r, 0.22, 0.42) : r < 0.72 ? prog(r, 0.52, 0.72) : 0
      drawPlanner(x, 812, 1000, 330, 390, { month, next, flip, write: prog(r, 0.82, 1.2), check: prog(r, 1.3, 1.5), label: "reply: 'hey'" })
      if (inR(r, 0.78, 1.28)) { const q = prog(r, 0.82, 1.2); drawPencil(x, 700 + q * 200, 1028 + 6 * Math.sin(r * 40), 7, -2.5) }
      star(372, 1020, 430, t, { color: SG[i].color, glyph: SG[i].glyph, mood: r < 1.3 ? 'squint' : 'happy', look: r < 1.3 ? [1, 0] : [0, 0], seed: 29, hops: [CUT[i] + 1.32], pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) }, { cells: () => tieCells(x) })
    },
    // ♒ AQUARIUS: floating sideways, a meme from 2014
    (t, r) => {
      const i = 10
      notifTop(t)
      const s = easeOutBack(prog(r, 0.15, 0.38), 2.2)
      if (s > 0) {
        x.save(); x.translate(790, 820); x.rotate(0.05); x.scale(s, s)
        drawBubble(x, 0, 0, 330, 340, { fill: SG[i].color, side: 'r' })
        drawMemeCat(x, 0, 0, 290, t)
        x.restore()
      }
      if (r > 0.6) { x.save(); x.globalAlpha = clamp((r - 0.6) * 5); x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.fillStyle = 'rgba(239,230,214,0.8)'; x.fillText('SENT · FROM THE ARCHIVE', 952, 1030); x.restore() }
      star(398, 1040 + 12 * Math.sin(t * 1.6), 430, t, { color: SG[i].color, glyph: SG[i].glyph, mood: 'happy', look: [0, 0], seed: 30, bob: 0, pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) }, { rot: -1.48 + 0.06 * Math.sin(t * 1.3) })
    },
    // ♓ PISCES: … (silence) … "we're getting married." Veil, bells, hearts, fountains.
    (t, r) => {
      const i = 11, lr = t - T.pisLine
      notifTop(t)
      const vk = prog(lr, 0.2, 0.42)
      if (lr > 0.25) {                                             // heart confetti
        const rr = rng(1111)
        for (let k = 0; k < 26; k++) {
          const d = lr - 0.25 - rr() * 0.6, hx = rr() * W, sp = 380 + rr() * 260, ph = rr() * TAU
          if (d < 0) continue
          drawHeart(x, hx + Math.sin(d * 3 + ph) * 40, -40 + d * sp, 6 + (k % 3), k % 3 === 0 ? '#ffffff' : k % 3 === 1 ? '#ff8fb1' : '#ff4f7e')
        }
      }
      const rise = 22 * ease.inOutQuad(prog(r, 0, 0.55))
      star(SOLO.x, 1010 - rise, SOLO.s, t, { color: SG[i].color, glyph: SG[i].glyph, mood: 'heart', look: [0, -1], seed: 31, hops: [T.pisLine + 0.2, T.pisLine + 0.8], pop: 1 + 0.08 * (1 - ease.outCubic(prog(r, 0, 0.16))) },
        { before: () => veilCells(x, vk), cells: () => { if (vk > 0) tiaraCells(x); if (lr > 0.5) tearsCells(x, t, lr > 0.8 ? 3 : 2) } })
    },
  ]
  function drawSolo(t) {
    const i = slotOf(t), r = t - CUT[i], len = (i < 11 ? CUT[i + 1] : T.freeze) - CUT[i]
    const z = 1 + 0.028 * ease.inOutQuad(clamp(r / len))
    signBg(i, t, r, SOLO.x, SOLO.y)
    x.save(); x.translate(SOLO.x, SOLO.y); x.scale(z, z); x.translate(-SOLO.x, -SOLO.y)
    SOLOS[i](t, r)
    x.restore()
  }

  // ═══════════════════════ 2 · the ring: freeze, the turn, the payoff, the last line ═══════════════════════
  function cardImg(img, body, cx, cy, wBody, rot = 0, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / body, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  const CARD_W = 420
  function drawCard(t) {
    if (t < T.cardIn[0]) return
    const p = prog(t, ...T.cardIn), k = popOut(t, [T.out[0] + 0.05, T.out[0] + 0.35])
    if (k <= 0) return
    const s = lerp(0.25, 1, easeOutBack(p, 1.5)) * k
    const ph = Math.PI * (1 - ease.outCubic(p)), sx = Math.cos(ph)
    const glowK = 0.6 + 0.4 * Math.sin(t * 2.2) + 0.8 * bump(t, T.swipe[1], 0.6)
    const g = x.createRadialGradient(RING.cx, RING.cy, 40, RING.cx, RING.cy, 420)
    g.addColorStop(0, rgba(GOLD, 0.3 * glowK * clamp(p * 2) * k)); g.addColorStop(1, rgba(GOLD, 0))
    x.fillStyle = g; x.fillRect(0, 300, W, 1300)
    const rot = (1 - ease.outCubic(p)) * -0.4 + 0.012 * Math.sin(t * 1.4)
    const cy = RING.cy + (1 - ease.outCubic(p)) * -40 + 6 * Math.sin(t * 1.8)
    if (sx < 0) cardImg(BACK, BACK_BODY, RING.cx, cy, CARD_W * s, rot, -sx)
    else cardImg(TALK, TALK_BODY, RING.cx, cy, CARD_W * s, rot, sx)
    sparkleRing(t, RING.cx, RING.cy, T.cardIn[0] + 0.28, 12, 300, 2)
  }
  /** each ring star's pose for this frame */
  function ringState(k, t) {
    const [rx, ry] = ringPos(k)
    const frozen = t < T.gold
    const tt = frozen ? T.freeze - 0.001 : t
    let px = rx, py = ry, mood = 'neutral', look = lookAt(rx, ry, RING.cx, RING.cy), blink, squash = 0, rot = 0, hops = null, alpha = 1, bob = 4, tears = 0
    const seed = 30 + k
    if (frozen) {
      blink = false; bob = 0
      mood = ['wide', 'squint', 'sparkle', 'wide', 'sparkle', 'squint', 'eyeroll', 'squint', 'happy', 'squint', 'happy', 'heart'][k]
      if (k === 2) py -= 22
      if (k === 1) squash = 0.06
      if (k === 0) alpha = 0
      if (k === 11) tears = 3
    } else if (t < T.burst) {
      // the turn: they look at the gold star in the middle; sheepish during line A, leaning in for line B
      const sheep = inR(t, T.lA, T.lB)
      mood = t < T.lA ? 'wide' : sheep ? (k % 3 === 0 ? 'squint' : 'neutral') : 'wide'
      if (t >= T.cardIn[0]) mood = 'sparkle'
      if (sheep) squash = 0.05
      if (t >= T.lB) { const ln = ease.inOutQuad(prog(t, T.lB, T.lB + 0.5)); px += (RING.cx - rx) * 0.04 * ln; py += (RING.cy - ry) * 0.04 * ln }
      if (k === 11) { mood = 'sparkle'; tears = 2 }
    } else if (t < T.hLast) {
      mood = 'heart'
      hops = [T.burst + 0.02 + (k % 3) * 0.04, T.burst + 0.6 + (k % 4) * 0.05]
      if (k === 11) tears = 3
    } else {
      mood = 'happy'; look = [0, 0]
      hops = [T.cheer, T.cheer2]
      if (k === 11) { tears = 3; mood = 'heart' }
      if (t < T.swipe[1]) { look = lookAt(rx, ry, RING.cx, RING.cy); mood = 'squint' }
    }
    if (k === 10) rot = -1.48 + (frozen ? 0 : 0.06 * Math.sin(t * 1.3))
    // Aries: gone (dashed off) until it skids back in with a coffee
    if (k === 0 && !frozen) {
      const p = prog(t, ...T.ariesBack)
      if (p <= 0) alpha = 0
      else if (p < 1) { px = lerp(1250, rx, ease.outCubic(p)); py = lerp(330, ry, ease.outCubic(p)) + Math.sin(p * Math.PI) * -40; squash = -0.2 * (1 - p) }
      else { const d = t - T.ariesBack[1]; squash += 0.18 * Math.exp(-d * 9) * Math.cos(d * 24); if (t < T.lB) { mood = 'wide'; look = Math.floor(t * 3) % 2 ? [-1, 0] : [1, 0] } }
    }
    // pop out at the end (a ripple)
    const pk = popOut(t, [T.out[0] + k * 0.02, T.out[0] + 0.24 + k * 0.02])
    return { px, py, tt, mood, look, blink, squash, rot, hops, alpha, bob, tears, seed, pop: pk, frozen }
  }
  function drawRingStar(k, t) {
    const S = ringState(k, t)
    if (S.alpha <= 0 || S.pop <= 0) return null
    const o = { color: SG[k].color, glyph: SG[k].glyph, mood: S.mood, look: S.look, blink: S.blink, squash: S.squash, hops: S.hops, seed: S.seed, bob: S.bob, pop: S.pop, alpha: S.alpha, tips: !S.frozen }
    const tt = S.tt, sz = RING.s
    // props beside the star (world)
    const side = () => {
      if (k === 1) drawCroissant(x, S.px - 74, S.py - 6, 3.4, 2, -0.25)
      if (k === 5) drawRedPen(x, S.px + 58, S.py - 34, 3, -0.6)
      if (k === 7) drawMiniPhone(x, S.px + 64, S.py - 18, 44, { rot: 0.2 })
      if (k === 8) drawSuitcase(x, S.px + 74, S.py + 64, 3.2)
      if (k === 0 && t >= T.ariesBack[0]) drawCoffee(x, S.px + 62, S.py + 40, 3.2, t)
    }
    star(S.px, S.py, sz, tt, o, {
      rot: S.rot,
      before: () => { if (k === 11) veilCells(x, 1) },
      cells: () => {
        if (k === 4) crownCells(x)
        if (k === 9) tieCells(x)
        if (k === 11) tiaraCells(x)
        if (k === 3 && t < T.burst) dropCell(x, 0.75)
        if (S.tears) tearsCells(x, tt, S.tears)
      },
    })
    if (S.pop > 0.5 && S.alpha > 0.5) side()
    return S
  }
  function drawRingScene(t) {
    const frozen = t < T.gold
    const fade = outK(t, [T.out[0], T.out[1]])
    wheelBg(frozen ? T.freeze : t, fade)
    // Aries' empty spot: the dust it left
    if (t < T.ariesBack[0] + 0.2) { const [ax, ay] = ringPos(0); dustPuff(x, ax, ay + 30, frozen ? 0.32 : 0.32 + prog(t, T.gold, T.gold + 0.9) * 0.68, { n: 7, spread: 110, seed: 9 }) }
    // the gold star (THE STARS) in the middle during the turn
    if (t >= T.gold && t < T.goldOut[1]) {
      const p = prog(t, T.gold, T.goldLand), y = lerp(-260, RING.cy, easeOutBack(p, 1.35))
      const d = t - T.goldLand, land = d > 0 ? 0.2 * Math.exp(-d * 8) * Math.cos(d * 22) : 0
      const out = 1 - ease.inCubic(prog(t, ...T.goldOut))
      const mood = t < T.lA ? 'neutral' : t < T.lB ? 'neutral' : t < T.cardIn[0] - 0.1 ? 'happy' : 'sparkle'
      star(RING.cx, y, 300, t, { color: STAR.sky, mood, look: [0, 0], squash: land - 0.2 * (1 - p), hops: [...GOLD_HOPS, T.cardIn[0] - 0.05], seed: 7, pop: out, glow: 1.3 })
    }
    if (t >= T.goldOut[0]) sparkleRing(t, RING.cx, RING.cy, T.goldOut[0] + 0.1, 10, 200, 1)
    drawCard(t)
    // the twelve
    const states = []
    for (let k = 0; k < 12; k++) states.push(drawRingStar(k, t))
    // Aries skid dust + speed lines on the way back
    { const p = prog(t, T.ariesBack[0], T.ariesBack[1] + 0.6); if (p > 0 && p < 1) { const [ax, ay] = ringPos(0); dustPuff(x, ax + 30, ay + 70, prog(t, T.ariesBack[1] - 0.05, T.ariesBack[1] + 0.6), { n: 6, spread: 90, seed: 12 }); speedLines(x, ax + 80, 1080, ay - 20, prog(t, T.ariesBack[0] + 0.1, T.ariesBack[1] + 0.3), { n: 5, h: 120, seed: 13 }) } }
    // typing bubbles: twelve at once
    if (t >= T.burst && t < T.out[0] + 0.3) {
      const jr = rng(56)
      for (let k = 0; k < 12; k++) {
        const S = states[k]; if (!S) { jr(); continue }
        const jit = jr() * 0.1, [rx, ry] = ringPos(k)
        const s = easeOutBack(prog(t, T.burst + jit, T.burst + jit + 0.24), 2.4) * 0.82 * popOut(t, [T.out[0] - 0.05, T.out[0] + 0.15])
        if (k === 6 && t > T.burst + 0.5 && Math.floor(t * 2.6) % 3 === 0) continue          // Libra: typing… stopped… typing…
        const dx = Math.abs(rx - 540) < 60 ? 64 : Math.sign(rx - 540) * 46
        drawTyping(x, S.px + dx, S.py - 100, s, t + k * 0.13)
        if (k === 2) drawTyping(x, S.px + dx + 34, S.py - 160, s * 0.8, t + 0.4)                // Gemini types twice
      }
    }
    // the last line: the old "hey" drops back in… and gets swiped
    if (t >= T.notifIn[0] && t < T.swipe[1] + 0.05) {
      const p = prog(t, ...T.notifIn), sp = prog(t, ...T.swipe)
      const nx = RING.cx - 1250 * ease.inCubic(sp), ny = lerp(-140, RING.cy - 10, easeOutBack(p, 1.5))
      const rot = -0.05 * Math.sin(t * 9) * (1 - sp) - 0.4 * sp
      for (let g = 2; g >= 1; g--) if (sp > 0.05) drawHeyNotif(x, nx + 160 * g * sp, ny, 1.0, { alpha: 0.25 / g, rot })
      drawHeyNotif(x, nx, ny, 1.0, { rot })
    }
    // the freeze: desaturated, a pause sign
    if (t < T.gold + 0.3) {
      const k = t < T.gold ? 1 : 1 - prog(t, T.gold, T.gold + 0.3)
      x.save(); x.globalCompositeOperation = 'saturation'; x.globalAlpha = 0.82 * k; x.fillStyle = '#808080'; x.fillRect(0, 0, W, 1920); x.restore()
      x.save(); x.globalAlpha = 0.18 * k; x.fillStyle = '#6a7ab0'; x.fillRect(0, 0, W, 1920); x.restore()
      const pk = pop01(t, T.freeze + 0.02, 0.22, 2.4) * (1 - prog(t, T.gold - 0.1, T.gold + 0.1))
      if (pk > 0) {
        x.save(); x.translate(RING.cx, RING.cy); x.scale(pk, pk)
        for (const bx of [-48, 22]) { x.fillStyle = INK; x.beginPath(); x.roundRect(bx - 8, -78, 42, 156, 12); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.roundRect(bx - 2, -72, 30, 144, 8); x.fill() }
        x.restore()
      }
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.drop) drawHook(t)
      else if (t < T.freeze) drawSolo(t)
      else if (t < T.out[1] + 0.05) drawRingScene(t)
      // type
      H0.update(t, t < T.drop ? 1 : 0)
      const si = t >= T.drop && t < T.freeze ? slotOf(t) : -1
      SH.forEach((h, i) => h.update(t, i === si ? 1 : 0))
      HT.update(t, t >= T.freeze ? outK(t, T.hTurnOut) : 0)
      HP.update(t, outK(t, T.hPayOut))
      HL.update(t, outK(t, T.hLastOut))
      rbox.update(t); sbox.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (every beat change). The default selection keeps 3 of these 8 (indices 1, 4, 6):
// 10.878 (Cancer → Leo), 20.878 (Sag → Capricorn), 33.25 (→ LESSON UNLOCKED). The end card flips at 40.6.
export const CUTS = [CUT[0], CUT[4], CUT[5], CUT[7], CUT[9], T.freeze, T.cutL, 37.6]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are written in D and moved into E by the engine; chip / lead / brass are written in E)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const EN = { E4: 329.63, Gs4: 415.3, B4: 493.88, E5: 659.25, Fs5: 739.99, Gs5: 830.61, A5: 880, B5: 987.77, Cs6: 1108.73, Ds6: 1244.51, E6: 1318.51 }
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]]
const noise = (t, f, len, g, o = {}) => ['chip', r3(t), f, len, { wave: 'noise', gain: g, decay: len * 0.6, sustain: 0, ...FXO, ...o }]
const scratch = t0 => [['tapeStop', t0, 0.5], noise(t0, 1600, 0.08, 0.05, { slide: 70, sustain: 0.8, decay: 0.05 }), noise(t0 + 0.09, 5200, 0.14, 0.045, { slide: -60, sustain: 0.7, decay: 0.08 })]
const blips = (t0, rev, n, base, pan = 0) => Array.from({ length: n }, (_, k) => ['pop', r3(t0 + rev * k / n), +(base * 2 ** ([0, 2, 4, 2, 5, 4, 7, 5, 9][k % 9] / 12)).toFixed(2), 0.017, pan])
const crunch = t => [noise(t, 2600, 0.05, 0.04), noise(t + 0.045, 1900, 0.05, 0.035), noise(t + 0.09, 3100, 0.04, 0.025)]
const VOICE = [1174.66, 587.33, 1318.51, 880, 739.99, 987.77, 880, 659.25, 1174.66, 587.33, 987.77, 1318.51]
const SIGN_SFX = [
  // ♈ hops, crouch, dash
  c => [...[0.02, 0.22, 0.42, 0.62, 0.82].map((v, k) => ['pop', r3(c + v + 0.05), NOTE[(k * 2) % 7], 0.02, 0.2]),
    ['chip', r3(c + 1.0), EN.E4, 0.18, { wave: 'tri', slide: 24, gain: 0.03, decay: 0.15, sustain: 0.6, ...FXO }],
    ['whoosh', r3(c + 1.18), 0.32, 0.07], noise(c + 1.18, 900, 0.3, 0.03, { slide: -20, sustain: 0.5, decay: 0.2 })],
  // ♉ two bites (crunch), a happy hum
  c => [...crunch(c + 0.42), ...crunch(c + 1.26), ['pluck', r3(c + 1.48), 587.33, 0.03, 0.5, -0.2]],
  // ♊ five replies (a rising burst), delivered, typing
  c => [...[0, 1, 2, 3, 4].flatMap(k => [['pop', r3(c + 0.04 + 0.06 * k), NOTE[2 + k], 0.034, 0.3], ['tick', r3(c + 0.04 + 0.06 * k), 0.025]]), ['pop', r3(c + 0.47), 1318.51, 0.02, 0.4], ...[0, 1, 2, 3, 4, 5].map(k => ['tick', r3(c + 1.05 + k * 0.11), 0.018])],
  // ♋ a nervous warble, the tear drops
  c => [['chip', r3(c + 0.12), EN.B5, 0.9, { wave: 'tri', vib: 0.05, gain: 0.011, decay: 0.8, sustain: 0.7, ...FXO }], ['pop', r3(c + 1.6), 1318.51, 0.03, 0.2], ['pluck', r3(c + 1.62), 1760, 0.02, 0.4, 0.2]],
  // ♌ spotlight clunk, ta-da
  c => [['pop', r3(c + 0.01), 110, 0.08, 0], noise(c + 0.01, 700, 0.1, 0.045), ...[EN.E5, EN.Gs5, EN.B5, EN.E6].map((f, k) => ['chip', r3(c + 0.85 + k * 0.06), f, 0.16, { duty: 0.25, gain: 0.03, decay: 0.12, sustain: 0.6, rev: 0.15, dly: 0.12, bus: 'fx' }]), ['brass', r3(c + 1.05), [EN.E4, EN.Gs4, EN.B4], 0.4, { gain: 0.03, bright: 1.3, rev: 0.15, bus: 'fx' }]],
  // ♍ pen squeak, the grade stamps on
  c => [['chip', r3(c + 0.12), 2100, 0.6, { wave: 'tri', slide: 5, vib: 0.03, gain: 0.009, decay: 0.5, sustain: 0.8, ...FXO }], ['pop', r3(c + 0.86), 130, 0.08, 0.3], ['tick', r3(c + 0.86), 0.06], ['pop', r3(c + 0.9), 987.77, 0.02, 0.3]],
  // ♎ six drafts appear, six drafts pop, a sigh
  c => [...[0, 1, 2, 3, 4, 5].map(k => ['pop', r3(c + 0.04 + 0.05 * k), NOTE[k % 7], 0.018, (k % 2 ? 0.3 : -0.3)]), ...[0, 1, 2, 3, 4, 5].map(k => ['pop', r3(c + 1.2 + 0.05 * k), NOTE[6 - k], 0.028, (k % 2 ? 0.25 : -0.25)]),
    ['lead', r3(c + 1.52), EN.Gs4, 0.42, { wave: 'tri', from: EN.B4, glide: 0.3, gain: 0.025, cutoff: 1500, decay: 0.3, sustain: 0.6, release: 0.1, rev: 0.2, dly: 0, bus: 'fx' }]],
  // ♏ the shutter, three phones, SENT
  c => [noise(c + 0.1, 5600, 0.04, 0.06), ['tick', r3(c + 0.1), 0.07], noise(c + 0.17, 2500, 0.05, 0.04), ['whoosh', r3(c + 0.22), 0.3, 0.03],
    ...[0, 1, 2].flatMap(k => [['whoosh', r3(c + 0.5 + 0.12 * k), 0.2, 0.03], ['pop', r3(c + 0.72 + 0.12 * k), NOTE[3 + k], 0.026, (k - 1) * 0.4]])],
  // ♐ the airport chime, a plane
  c => [['bell', r3(c + 0.08), 1174.66, 0.035, 1.3, 0], ['bell', r3(c + 0.38), 880, 0.035, 1.6, 0], ['whoosh', r3(c + 0.45), 0.9, 0.05], ...[0.04, 0.5, 0.96].map(v => ['pop', r3(c + v + 0.05), 784, 0.018, -0.2])],
  // ♑ page, page, pencil, tick
  c => [...[0.22, 0.52].flatMap(v => [['tick', r3(c + v), 0.04], ['whoosh', r3(c + v), 0.18, 0.02]]), ...[0, 1, 2, 3, 4, 5].map(k => noise(c + 0.84 + k * 0.06, 1700 + (k % 2) * 500, 0.05, 0.016)), ['pop', r3(c + 1.31), 987.77, 0.03, 0.3], ['pluck', r3(c + 1.31), 1318.51, 0.025, 0.4, 0.3]],
  // ♒ send: a crunchy dial-up-ish chirp
  c => [['whoosh', r3(c + 0.14), 0.3, 0.04], ...[0, 1, 2, 3].map(k => ['chip', r3(c + 0.16 + k * 0.05), [EN.E6, EN.B5, EN.Gs5, EN.E5][k], 0.05, { duty: 0.125, gain: 0.016, decay: 0.04, sustain: 0.4, ...FXO }]), noise(c + 0.36, 800, 0.12, 0.02)],
  // ♓ silence… then bells, a harp run, a sob
  c => { const L = T.pisLine; return [['bell', r3(L + 0.2), 1174.66, 0.04, 2.4, -0.2], ['bell', r3(L + 0.4), 1318.51, 0.035, 2.4, 0.2], ['bell', r3(L + 0.6), 1760, 0.03, 2.6, 0], ['glitter', r3(L + 0.25), r3(L + 1.2)],
    ...[0, 1, 2, 3, 4, 5, 6].map(k => ['pluck', r3(L + 0.22 + k * 0.04), NOTE[k], 0.022, 0.5, 0.1]), ['chip', r3(L + 0.9), EN.Cs6, 0.7, { duty: 0.25, slide: -4, vib: 0.04, gain: 0.012, decay: 0.6, sustain: 0.7, pan: 0.3, rev: 0.25, dly: 0.1, bus: 'fx' }]] },
]
export const CUES = [
  // 0 · the hook
  ['boom', T.slamHit, 0.22], ['pop', T.slamHit, 196, 0.07, 0], ['tick', T.slamHit, 0.06],
  ['chip', r3(T.slamHit + 0.06), EN.E6, 0.1, { duty: 0.25, gain: 0.032, decay: 0.1, sustain: 0.3, rev: 0.2, dly: 0.15, bus: 'fx' }], ['chip', r3(T.slamHit + 0.16), EN.B5 * 2, 0.16, { duty: 0.25, gain: 0.028, decay: 0.14, sustain: 0.3, rev: 0.2, dly: 0.15, bus: 'fx' }],
  ...head(T.h0, 6, T.h0Land, 0),
  ...Array.from({ length: 12 }, (_, i) => ['pop', r3(T.launch + i * T.launchGap + 0.3), NOTE[i % 7] * (i >= 7 ? 2 : 1), 0.022, ((i % 4) - 1.5) * 0.25]),
  ['whoosh', r3(T.launch + 0.1), 0.6, 0.03],
  ['pluck', r3(T.blinkSync), 1760, 0.02, 0.25, 0],
  // 1 · rapid fire: a snap on every hard cut, a burst of blips per line, each sign's own gag
  ...CUT.flatMap((c, i) => [['tick', c, 0.045], noise(c, 3400, 0.045, 0.03), ['pop', r3(c + 0.01), NOTE[(i * 3) % 7], 0.026, (i % 2 ? 0.2 : -0.2)], ['pop', r3(c + 0.04), 1174.66, 0.03, 0]]),
  ...RAPID.flatMap((s, i) => blips(LINE_T[i], REV[i], clamp(Math.round(s.length / 4), 4, 9), VOICE[i], 0)),
  ...RAPID.map((s, i) => ['tick', r3(LINE_T[i] + REV[i] + 0.04), 0.02]),
  ...SIGN_SFX.flatMap((f, i) => f(CUT[i])),
  // 2 · freeze, the turn
  ...scratch(T.freeze),
  ...head(T.hTurn, 1, T.hTurnLand, 3),
  ['whoosh', r3(T.gold), 0.4, 0.04], ['bell', r3(T.goldLand), 1760, 0.03, 1.6, 0], ['glitter', r3(T.goldLand), r3(T.goldLand + 0.6)], ['pop', r3(T.goldLand), 220, 0.05, 0],
  ...talkCues(SLINES, { cps: CPS, pitch: { [STARS]: 880 } }),
  ['whoosh', r3(T.ariesBack[0]), 0.35, 0.05], noise(T.ariesBack[1], 1100, 0.3, 0.03, { slide: -25, sustain: 0.5, decay: 0.2 }), ['pop', r3(T.ariesBack[1] + 0.02), 1174.66, 0.03, 0.2],
  // 3 · the talk card + everyone's typing
  ['whoosh', r3(T.cardIn[0]), 0.4, 0.05], ['bell', r3(T.cardIn[0] + 0.32), 1318.51, 0.035, 1.4, 0], ['glitter', r3(T.cardIn[0] + 0.2), r3(T.cardIn[1] + 0.4)],
  ...(() => { const r = rng(56), out = []; for (let k = 0; k < 12; k++) { const t0 = T.burst + r() * 0.1; out.push(['pop', r3(t0), NOTE[k % 7] * (k > 6 ? 2 : 1), 0.022, ((k % 6) - 2.5) * 0.2]); for (let j = 0; j < 9; j++) out.push(['tick', r3(t0 + 0.3 + j * (0.11 + (k % 3) * 0.02)), 0.011]) } return out })(),
  ...wordPops(T.hPay, 2, 0.09, 4, 0.026),
  // 4 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: 'E' }),
  // 5 · skip the hey
  ['whoosh', r3(T.notifIn[0]), 0.3, 0.035], ['pop', r3(T.notifIn[1]), 330, 0.04, 0],
  ...head(T.hLast, 2, T.hLastLand, 2),
  ['whoosh', r3(T.swipe[0]), 0.35, 0.07], ['tick', r3(T.swipe[0] + 0.05), 0.04],
  ...[T.cheer, T.cheer2].flatMap((c, j) => Array.from({ length: 6 }, (_, k) => ['pop', r3(c + 0.03 + k * 0.03), NOTE[(k * 2 + j) % 7], 0.022, ((k % 3) - 1) * 0.4])),
  ['whoosh', r3(T.out[0]), 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void SERIF; void lineTimes
