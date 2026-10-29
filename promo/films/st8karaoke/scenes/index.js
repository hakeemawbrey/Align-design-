// st8karaoke (30 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", EP 09) · story 0–25.6, then the shared end card.
//   Genre: karaoke night. "Pisces is singing *the* song."  A cheesy karaoke monitor (stock sunset-beach video, the
//   "♪ NOW SINGING ♪" bar, lyrics that wipe pink with a bouncing ball), Pisces belting a breakup ballad about "u", a crowd
//   holding up phone torches, and Virgo in the sound booth live-editing the lyrics to be healthier.
//   0.00       frame 0: the hook card; Pisces mid-belt in the spotlight; the lyric "♪ i still think about u ♪" half wiped.
//   3.6        "♪ so pls come back to me ♪"   4.4 VIRGO: "hold on. small edit. same melody."
//   7.2        Virgo taps a key: "come back to me" is struck out → "be well, truly" (EDITED BY ♍). PISCES: "wait… these
//              lyrics are better?"  The torches sway.  (10.5: the hidden Comet crosses the sky above the monitor.)
//   11.0       "♪ i'll ~~text u at 2am~~ call my friends ♪"  VIRGO: "healthier lyrics. still a banger."  (13.0: the ghost
//              peeks from behind the speaker stack.)
//   14.6       "♪ i'm ~~nothing without u~~ whole on my own ♪"  Pisces pulls out the phone mid-song: a draft "come back?",
//              thumb over SEND. VIRGO: "sing it to the room. not to their phone."  17.4: Pisces drops the phone into the
//              PHONES HERE fishbowl.  PISCES: "this one's for me."
//   18.2       the big chorus: "♪ sing it out… don't send it ♪", pixel pyro.  21.3 the score screen: ★★★★★ HEALING.
//   21.8       the same framing as frame 0 (Pisces mid-belt), the phone safely in the bowl. Last line: "Sing it out.
//              Don't *send* it."  The UP NEXT ticker is the rewatch bait (Taurus: "Soup (Acoustic)"; Mars: removed).
// One canvas (sky + club + monitor + cast), DOM type (hook card, box, last line), grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { drawComet, drawPhone, drawDayChip, hookCard, hookCues, genreBug, drawTicker, stingerCues } from '../../st8cast.js'

export const DURATION = 30
const KEY = 'A'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MINT = '#6effc0', RED = '#ff3d5a'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const PIS = signStar('pisces'), VIR = signStar('virgo')

// ── the timeline
const T = {
  hookOut: 3.0,
  open: -0.9, l0: -0.7, l1: 4.4, edit: 7.2, l2: 8.2, punch: [8.2, 8.6], punchOut: [10.4, 10.8], sway: 9.4, comet: 10.5,
  l3: 12.0, ghost: 13.0, phone: [14.9, 17.4], l4: 15.3, drop: [17.4, 17.9], l5: 18.6, chorus: 18.2, close: 20.9,
  score: [21.25, 23.0], last: 21.8, lastLand: 22.3, lastOut: [25.3, 25.55], end: [25.25, 25.6],
}
// the lyrics: [start, end, tokens]  tokens: [text, kind]  kind '' plain · 's' struck (old) · 'n' new (Virgo's edit)
const LYR = [
  [-1.4, 3.6, [['i still think about u', '']]],
  [3.6, 7.2, [['so pls ', ''], ['come back to me', '']]],
  [7.2, 11.0, [['so pls ', ''], ['come back to me', 's'], [' be well, truly', 'n']]],
  [11.0, 14.6, [['i’ll ', ''], ['text u at 2am', 's'], [' call my friends', 'n']]],
  [14.6, 18.2, [['i’m ', ''], ['nothing without u', 's'], [' whole on my own', 'n']]],
  [18.2, 21.25, [['sing it out… ', ''], ['don’t send it', 'n']]],
]
const PIS_N = '♓ PISCES', VIR_N = '♍ VIRGO · SOUND BOOTH'
const LINES = [
  { t: T.l0, speaker: PIS_N, text: 'this one’s about *u.*', color: PIS.color },
  { t: T.l1, speaker: VIR_N, text: 'hold on. small edit. same *melody.*', color: VIR.color },
  { t: T.l2, speaker: PIS_N, text: 'wait… these lyrics are *better?*', color: PIS.color },
  { t: T.l3, speaker: VIR_N, text: 'healthier lyrics. still a *banger.*', color: VIR.color },
  { t: T.l4, speaker: VIR_N, text: 'sing it to the room. not to their *phone.*', color: VIR.color },
  { t: T.l5, speaker: PIS_N, text: 'this one’s for *me.*', color: PIS.color },
]
const CPS = 28
const QUEUE = '♉ TAURUS — “SOUP (ACOUSTIC)”  ·  ♊ GEMINI & THE TWIN — DUET  ·  ♂ MARS — “I WILL ALWAYS…” (REMOVED BY MANAGEMENT)  ·  ♀ VENUS — PASSING TONIGHT  ·  '

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const r3 = v => +v.toFixed(3)

// ── layout
const MON = { x0: 80, y0: 560, x1: 1000, y1: 1000 }
const PIS0 = { x: 360, y: 1160, size: 280 }
const VIR0 = { x: 870, y: 1150, size: 190 }
const BOWL = { x: 600, y: 1268 }
const SPK = { x0: 40, x1: 170, y0: 1020, y1: 1300 }

const MIC = ['.gg.', 'gGGg', 'gGGg', '.gg.', '.kk.', '.kk.', '.kk.', '.kk.', '.kk.']
const MIC_C = { g: '#8a8f9e', G: '#c9cdd8', k: '#2a2140' }
const PHONES = ['....hh....', '...hHHh...', '..hHHHHh..', '.hHHHHHHh.', 'hHHHHHHHHh', 'hHHHHHHHHh', '.hHHHHHHh.']
const HEADPH = ['.kkkkkkk.', 'k.......k', 'k.......k', 'P.......P', 'PP.....PP', 'PP.....PP']
const HEADPH_C = { k: '#2a2140', P: '#ff8fb1' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

export const GHOST = { at: T.ghost, x: SPK.x1 - 4, y: 1080, where: 'peeking out from behind the stage speaker stack, left edge' }
export const COMET_AT = T.comet

function pisState(t) {
  if (t < T.l1) return { mood: 'sparkle', look: [0.3, -0.6] }
  if (t < T.edit + 0.3) return { mood: 'happy', look: [0, -1] }
  if (t < T.l3) return { mood: 'wide', look: [1, -0.3], blink: false }
  if (t < T.phone[0]) return { mood: 'happy', look: [0, -1] }
  if (t < T.drop[0]) return { mood: 'sparkle', look: [0.6, 0.8] }
  if (t < T.chorus) return { mood: 'wide', look: [1, 0], blink: false }
  return { mood: 'happy', look: [0, -1] }
}
const PIS_HOPS = [0.05, 1.0, 2.0, 3.6, 5.4, 7.2, 9.0, 11.0, 12.8, 14.6, T.drop[1], 18.2, 19.0, 19.8, 20.6, T.lastLand, 23.4, 24.4]
const VIR_HOPS = [...talkHops(LINES, VIR_N, { cps: CPS }), T.edit]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "800 48px Inter", "italic 500 34px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Pisces is singing | *the* song.', at: 0, out: T.hookOut, accentColor: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1452, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const HS = [
    [popText(root, 'Live *edit.*', { top: 210, size: 120, accentSize: 190, at: T.edit, gap: 0.08, accentColor: MINT, wobble: true, late: 1, lateAt: T.edit + 0.3 }), [10.2, 10.45]],
    [popText(root, 'The *phone.*', { top: 210, size: 120, accentSize: 190, at: T.phone[0] + 0.1, gap: 0.08, accentColor: RED, wobble: true, late: 1, lateAt: T.phone[0] + 0.4 }), [17.95, 18.15]],
  ]
  const LAST = popText(root, 'Sing it out. | Don’t *send* it.', { top: 196, size: 112, accentSize: 178, at: T.last, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function label(text, cx, cy, { size = 30, color = BONE, font = MONO, weight = 700, align = 'center', alpha = 1, shadow = true, italic = false } = {}) {
    if (alpha <= 0) return
    x.save(); x.globalAlpha *= alpha; x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, cx + 3, cy + 3) }
    x.fillStyle = color; x.fillText(text, cx, cy); x.restore()
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
  }
  /** the karaoke monitor: stock sunset-beach loop, NOW SINGING bar, the lyric with a wipe + bouncing ball */
  function monitor(t) {
    const { x0, y0, x1, y1 } = MON, w = x1 - x0, h = y1 - y0
    x.fillStyle = INK; x.fillRect(x0 - 16, y0 - 16, w + 32, h + 32); x.fillStyle = '#2a2140'; x.fillRect(x0 - 10, y0 - 10, w + 20, h + 20)
    x.save(); x.beginPath(); x.rect(x0, y0, w, h); x.clip()
    const scoreK = prog(t, T.score[0], T.score[0] + 0.3) * (1 - prog(t, T.score[1], T.score[1] + 0.3))
    // the stock video: a sunset over the sea, slow waves, a swaying palm, a seagull on a loop
    const g = x.createLinearGradient(0, y0, 0, y0 + h * 0.6); g.addColorStop(0, '#ff7a8a'); g.addColorStop(1, '#ffc27a')
    x.fillStyle = g; x.fillRect(x0, y0, w, h)
    x.fillStyle = '#fff1b8'; x.beginPath(); x.arc(540, y0 + h * 0.58, 70, Math.PI, 0); x.fill()
    for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#3a5fa0' : '#4a72b8'; x.fillRect(x0, y0 + h * 0.58 + i * 26, w, 26) }
    for (let i = 0; i < 14; i++) { x.fillStyle = 'rgba(255,240,200,0.6)'; x.fillRect(x0 + ((i * 73 + t * 40) % w), y0 + h * 0.62 + (i % 5) * 26, 40, 5) }
    const pb = Math.sin(t * 1.4) * 0.06
    x.save(); x.translate(x0 + 120, y0 + h * 0.62); x.rotate(pb); x.fillStyle = '#4a2b1a'; x.fillRect(-8, -230, 16, 230)
    x.fillStyle = '#2e6b3a'; for (let k = 0; k < 5; k++) { x.save(); x.translate(0, -230); x.rotate(-1.2 + k * 0.6 + pb * 2); x.fillRect(0, -10, 110, 20); x.restore() }
    x.restore()
    const sg = (t * 0.25) % 1; x.fillStyle = '#fff'; x.fillRect(x0 + sg * w, y0 + 90 + Math.sin(t * 6) * 6, 22, 6); x.fillRect(x0 + sg * w + 8, y0 + 84 + Math.sin(t * 6) * 6, 6, 6)
    // NOW SINGING bar
    x.fillStyle = 'rgba(20,10,40,0.85)'; x.fillRect(x0, y0, w, 56)
    label('♪ NOW SINGING: ♓ PISCES ♪', 540, y0 + 29, { size: 28, color: GOLD })
    // the lyric
    const L = LYR.find(([a, b]) => t >= a && t < b)
    if (L && scoreK < 1) {
      const [a, b, toks] = L
      const yL = y1 - 92
      x.font = `800 48px ${INTER}`
      const full = '♪ ' + toks.map(k => k[0]).join('') + ' ♪'
      let wAll = x.measureText(full).width
      const sc = Math.min(1, (w - 60) / wAll)
      x.fillStyle = 'rgba(10,6,24,0.75)'; x.fillRect(x0, yL - 52, w, 104)
      x.save(); x.translate(540, yL); x.scale(sc, sc); x.translate(-wAll / 2, 0)
      // lay the tokens out
      const segs = []; let cx = 0
      const push = (text, kind) => { const ww = x.measureText(text).width; segs.push({ text, kind, x: cx, w: ww }); cx += ww }
      push('♪ ', ''); toks.forEach(([tx, k]) => push(tx, k)); push(' ♪', '')
      const editT = toks.some(k => k[1]) ? a + (a === T.edit ? 0.15 : 0) : null
      const newK = editT === null ? 1 : prog(t, editT + 0.1, editT + 0.6)
      const wipe = prog(t, a + 0.2, b - 0.5) * wAll
      x.textBaseline = 'middle'
      for (const s of segs) {
        const show = s.kind === 'n' ? newK : 1
        if (show <= 0) continue
        const base = s.kind === 's' ? 'rgba(239,230,214,0.45)' : s.kind === 'n' ? MINT : BONE
        x.globalAlpha = show; x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s.text, s.x + 3, 4); x.fillStyle = base; x.fillText(s.text, s.x, 0)
        // the sung part, pink (struck words are skipped over)
        if (s.kind !== 's' && wipe > s.x) { x.save(); x.beginPath(); x.rect(s.x, -40, Math.min(s.w, wipe - s.x), 80); x.clip(); x.fillStyle = s.kind === 'n' ? '#b8ffe0' : PINK; x.fillText(s.text, s.x, 0); x.restore() }
        if (s.kind === 's') { const sk = editT === null ? 1 : prog(t, editT, editT + 0.25); x.fillStyle = RED; x.fillRect(s.x, -4, s.w * sk, 7) }
      }
      x.globalAlpha = 1
      // the bouncing ball, hopping word to word ahead of the wipe
      const bx = clamp(wipe, 20, wAll - 20), hop = Math.abs(Math.sin(t * Math.PI * 1.8))
      x.fillStyle = INK; x.beginPath(); x.arc(bx, -46 - hop * 34, 13, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ffd23f'; x.beginPath(); x.arc(bx, -46 - hop * 34, 10, 0, Math.PI * 2); x.fill()
      x.restore()
      if (editT !== null && t < b) label('EDITED BY ♍', x1 - 20, y1 - 168, { size: 22, color: MINT, align: 'right', alpha: prog(t, editT + 0.1, editT + 0.4) })
    }
    // the score screen
    if (scoreK > 0) {
      x.fillStyle = `rgba(16,8,36,${0.9 * scoreK})`; x.fillRect(x0, y0, w, h)
      label('YOUR SCORE', 540, y0 + 140, { size: 44, color: GOLD, font: INTER, weight: 800, alpha: scoreK })
      for (let i = 0; i < 5; i++) { const k = pop01(t, T.score[0] + 0.2 + i * 0.12, 0.25, 2.5) * scoreK; if (k > 0) drawPixelStar(x, 540 + (i - 2) * 140, y0 + 250, 100 * k, 1, '#ffd23f') }
      label('HEALING', 540, y0 + 360, { size: 60, color: MINT, font: INTER, weight: 800, alpha: scoreK })
    }
    x.restore()
  }
  function club(t) {
    x.fillStyle = '#140b26'; x.fillRect(0, 1020, 1080, 900)
    // the stage
    x.fillStyle = INK; x.fillRect(0, 1268, 1080, 18); x.fillStyle = '#3a2350'; x.fillRect(0, 1286, 1080, 140)
    for (let i = 0; i < 14; i++) { x.fillStyle = ['#ff6fa3', '#7fd0ff', '#ffd23f'][i % 3]; x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 4 + i); x.fillRect(20 + i * 76, 1290, 30, 10) }
    x.globalAlpha = 1
    // the speaker stack (left)
    const { x0, x1, y0, y1 } = SPK
    x.fillStyle = INK; x.fillRect(x0 - 6, y0 - 6, x1 - x0 + 12, y1 - y0 + 12); x.fillStyle = '#2a2140'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    for (const cy of [y0 + 70, y0 + 200]) { const pulse = 1 + 0.08 * Math.abs(Math.sin(t * Math.PI * 1.8)); x.fillStyle = INK; x.beginPath(); x.arc((x0 + x1) / 2, cy, 46 * pulse, 0, Math.PI * 2); x.fill(); x.fillStyle = '#4a3a6a'; x.beginPath(); x.arc((x0 + x1) / 2, cy, 30 * pulse, 0, Math.PI * 2); x.fill() }
    // the sound booth (right)
    x.fillStyle = INK; x.fillRect(720, 1110, 360, 160); x.fillStyle = '#2f2550'; x.fillRect(728, 1118, 352, 150)
    label('SOUND BOOTH', 900, 1250, { size: 22, color: GOLD })
  }
  function crowd(t) {
    // silhouettes in front of the stage with phone torches (lights up from 9.4)
    const sway = 0.55 + 0.45 * prog(t, T.sway - 0.5, T.sway + 0.5)
    for (let i = 0; i < 8; i++) {
      const cx = 70 + i * 135, cy = 1390 + (i % 2) * 14
      const arm = sway > 0 ? Math.sin(t * 2.2 + i * 0.6) * 0.35 * sway : 0
      if (sway > 0) {
        const hx = cx + Math.sin(arm) * 70, hy = cy - 120 * sway
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createLinearGradient(hx, hy, hx, hy - 260); g.addColorStop(0, `rgba(255,250,220,${0.35 * sway})`); g.addColorStop(1, 'rgba(255,250,220,0)')
        x.fillStyle = g; x.beginPath(); x.moveTo(hx - 6, hy); x.lineTo(hx + 6, hy); x.lineTo(hx + 60, hy - 260); x.lineTo(hx - 60, hy - 260); x.closePath(); x.fill(); x.restore()
        x.strokeStyle = '#0a0616'; x.lineWidth = 14; x.beginPath(); x.moveTo(cx, cy - 20); x.lineTo(hx, hy); x.stroke()
        x.fillStyle = '#fffbe0'; x.fillRect(hx - 8, hy - 12, 16, 16)
      }
      drawStarChar(x, cx, cy, 150, t, { color: ['#3a2a5c', '#2f2450', '#43306a'][i % 3], mood: t > T.chorus ? 'heart' : 'happy', look: [0, -1], seed: 40 + i, glow: 0.15, tips: false, blush: false, hops: [T.chorus + (i % 3) * 0.1, T.drop[1] + 0.2] })
    }
  }
  function bowl(t) {
    const { x: bx, y: by } = BOWL
    x.save()
    x.fillStyle = 'rgba(180,230,255,0.25)'; x.beginPath(); x.arc(bx, by - 46, 56, 0, Math.PI * 2); x.fill()
    x.strokeStyle = 'rgba(220,245,255,0.8)'; x.lineWidth = 5; x.beginPath(); x.arc(bx, by - 46, 56, -0.4 * Math.PI - Math.PI / 2 + Math.PI, 0.4 * Math.PI - Math.PI / 2 + Math.PI * 2, false); x.stroke()
    x.fillStyle = 'rgba(127,208,255,0.35)'; x.fillRect(bx - 48, by - 50, 96, 40)
    x.restore()
    label('PHONES HERE ♡', bx, by + 26, { size: 18, color: BONE })
    // a little fish lives in it (Pisces)
    x.fillStyle = '#ff9a3a'; x.fillRect(bx - 20 + Math.sin(t * 2) * 14, by - 38, 22, 12); x.fillRect(bx + 2 + Math.sin(t * 2) * 14, by - 42, 8, 20)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const cp = prog(t, T.comet, T.comet + 1.6)
      if (cp > 0 && cp < 1) drawComet(x, lerp(1100, 560, cp), lerp(470, 520, cp), 30, t, { sunDir: [-1, 0.4], aura: false, exPin: false, tail: 90, mood: 'happy', alpha: 0.85 })
      // camera: a punch-in on Pisces' reaction at 8.2
      const pk = ease.outBack(prog(t, ...T.punch)) * (1 - ease.inOutQuad(prog(t, ...T.punchOut)))
      x.save(); if (pk > 0) { const s = 1 + 0.16 * pk; x.translate(PIS0.x, PIS0.y - 100); x.scale(s, s); x.translate(-PIS0.x, -(PIS0.y - 100)) }
      monitor(t)
      club(t)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 4 })
      // the spotlight on Pisces
      x.save(); x.globalCompositeOperation = 'lighter'
      const sg = x.createLinearGradient(0, 1000, 0, 1290); sg.addColorStop(0, 'rgba(255,230,250,0.04)'); sg.addColorStop(1, 'rgba(255,230,250,0.2)')
      x.fillStyle = sg; x.beginPath(); x.moveTo(PIS0.x - 40, 1000); x.lineTo(PIS0.x + 40, 1000); x.lineTo(PIS0.x + 230, 1290); x.lineTo(PIS0.x - 230, 1290); x.closePath(); x.fill(); x.restore()
      // Virgo in the booth, headphones, the laptop
      const rv = drawStarChar(x, VIR0.x, VIR0.y - 30, VIR0.size, t, { color: VIR.color, glyph: VIR.glyph, mood: t < T.l1 ? 'squint' : t < T.edit + 0.5 ? 'neutral' : t < T.l4 ? 'happy' : t < T.drop[1] ? 'squint' : 'happy', look: [-1, -0.3], hops: VIR_HOPS, seed: 6, glow: 0.8 })
      drawBits(x, HEADPH, HEADPH_C, Math.round(rv.x), Math.round(rv.y - rv.size * 0.08), Math.round(rv.size / 13))
      x.fillStyle = INK; x.fillRect(770, 1150, 140, 100); x.fillStyle = '#c9cdd8'; x.fillRect(776, 1156, 128, 84); x.fillStyle = MINT; x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 8); x.fillRect(790, 1176, 70, 8); x.fillRect(790, 1196, 90, 8); x.globalAlpha = 1
      x.fillStyle = INK; x.fillRect(740, 1240, 200, 14)
      // Pisces with the mic
      const rp = drawStarChar(x, PIS0.x, PIS0.y, PIS0.size, t, { color: PIS.color, glyph: PIS.glyph, ...pisState(t), hops: PIS_HOPS, seed: 2, glow: 1.0, squash: t < T.l1 || t >= T.chorus ? -0.04 * Math.abs(Math.sin(t * 3)) : 0 })
      drawBits(x, MIC, MIC_C, Math.round(rp.x + rp.size * 0.36), Math.round(rp.y - rp.size * 0.02), Math.round(rp.size / 22), { rot: 0.5 })
      // the phone: out at 14.9, the draft, thumb over SEND; then the drop into the bowl
      if (t >= T.phone[0] && t < T.drop[1]) {
        const dp = prog(t, ...T.drop)
        const px = lerp(rp.x - rp.size * 0.42, BOWL.x, ease.inQuad(dp)), py = lerp(rp.y - 10, BOWL.y - 40, ease.inQuad(dp)) - Math.sin(Math.PI * dp) * 160
        drawPhone(x, px, py, 150 * (1 - dp * 0.45), t, { text: dp > 0 ? null : 'come back?', lit: 1, buzz: t < T.phone[0] + 0.5 ? 1 : 0, pop: pop01(t, T.phone[0], 0.3, 2), rot: dp * 3 })
        if (dp <= 0) { const sk = pop01(t, T.phone[0] + 0.6, 0.25, 2); label('SEND?', px, py + 120, { size: 30, color: RED, font: INTER, weight: 800, alpha: sk }) }
      }
      bowl(t)
      if (t >= T.drop[1]) { label('📱', BOWL.x + 4, BOWL.y - 44, { size: 34, shadow: false, font: INTER }); const sp = prog(t, T.drop[1], T.drop[1] + 0.6); if (sp < 1) for (let i = 0; i < 6; i++) x.fillRect(BOWL.x + Math.cos(i) * 60 * sp, BOWL.y - 90 - Math.sin(i * 1.3) * 40 * sp, 8, 8) }
      // the chorus pyro
      if (t >= T.chorus && t < T.score[0] + 0.5) for (let i = 0; i < 2; i++) {
        const px = i ? 980 : 240, k = (t - T.chorus) % 0.9
        for (let j = 0; j < 10; j++) { x.fillStyle = ['#ffd23f', '#ff8a3a', '#fff3c8'][j % 3]; x.fillRect(px + Math.sin(j * 2.3) * 30 * k, 1260 - k * 300 - j * 18, 10, 10) }
      }
      crowd(t)
      x.restore()
      genreBug(x, t, { text: '♪ KARAOKE NIGHT', x: 70, y: 520, color: '#7a3aa8' })
      drawTicker(x, t, { text: QUEUE, y: 1800, label: 'UP NEXT', color: PINK })
      drawDayChip(x, t, { day: 18, phase: 'retro' })
      const e = prog(t, ...T.end)
      if (e > 0) { x.save(); x.globalAlpha = ease.inQuad(e); drawSky(x, t, SKY_H); x.restore() }
      hook.update(t)
      box.update(t)
      for (const [h, o] of HS) h.update(t, outK(t, o))
      LAST.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 14.55 (into the phone beat), 21.2 (into the score + the last line).
const CUTS = [{ t: 14.55, kind: 'flip' }, { t: 21.2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E09', fadeIn: 0.01 }), cardCuts(CUTS)]

// ── sound
const NOTE = [880, 987.77, 1108.73, 1318.51, 1479.98, 1760]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...LYR.slice(1).map(([a]) => ['whoosh', r3(a), 0.3, 0.02]),
  ['pop', T.open, 987.77, 0.04, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [VIR_N]: 659.25, [PIS_N]: 1108.73 } }),
  ['tick', T.edit, 0.08], ['pop', T.edit + 0.12, 1760, 0.05, 0.3], ['glitter', T.edit + 0.1, T.edit + 0.7], ['pluck', T.edit + 0.3, 1318.51, 0.04, 0.5, 0],
  ['whoosh', T.punch[0], 0.35, 0.03], ['riser', T.sway - 0.6, T.sway + 0.2, 0.04], ['glitter', T.comet, T.comet + 0.9], ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.phone[0], 1479.98, 0.05, -0.2], ['tick', T.phone[0] + 0.1, 0.05], ['tick', T.phone[0] + 0.25, 0.05],
  ['whoosh', T.drop[0], 0.45, 0.035], ['pop', T.drop[1], 659.25, 0.06, 0.1], ['bell', T.drop[1] + 0.05, 1760, 0.03, 0.8, 0.1],
  ['crash', T.chorus, { gain: 0.06, len: 2 }], ['boom', T.chorus, 0.2],
  ...stingerCues(T.score[0] + 0.2, { key: KEY, kind: 'gameshow' }),
  ...wordPops(T.last, 4, 0.08, 0, 0.026), ['pop', T.lastLand, 1760, 0.05, 0], ['pluck', T.lastLand, 1760, 0.045, 0.6, 0],
  ['pop', T.close, 880, 0.03, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
