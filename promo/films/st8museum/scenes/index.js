// st8museum (35 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", EP 07) · story 0–30.6, then the shared end card.
//   Genre: the museum audio tour. "Welcome to the | Museum of *Exes.*"  Cancer (Moon-ruled, the sign of keeping things)
//   is the curator, in little gold glasses and a lanyard, with an audio-tour bar ("🎧 STOP 02 · THE HOODIE ▶") under the
//   gallery. Velvet ropes, brass stanchions, spotlights, plaques in museum-label format.
//   0.00       frame 0: the hook card over the skylight; Cancer mid-bow beside exhibit 1, the hoodie in its glass case,
//              plaque "HOODIE, 2019 · NEVER RETURNED".  CANCER: "welcome. please stay behind the velvet rope."
//   3.2        STOP 02: punch-in on the plaque. "the hoodie. still smells like them. probably."
//   7.0        pan → STOP 03: "PLAYLIST · STILL GOOD" (a cassette, "for u ♡"). "the playlist. honestly? still good."
//   10.4       pan → STOP 04: an empty plinth, "RESERVED · ARRIVING LATER THIS SEASON" (rewatch bait: E24's pebble), oil
//              portraits of the Comet and the Orbiter (its red "viewed" light blinks in the painting). The ghost peeks
//              round the plinth. Capricorn (Cancer's partner, seasons 4–5) wanders in with an audio guide: "so… should i be
//              worried?"  CANCER: "no. it's a museum. it's the past."  (13.0: the hidden Comet crosses the skylight.)
//   16.4       pan back to the hoodie. Cancer lifts it out: the DO NOT TOUCH alarm flashes ("it's my museum").
//              "keeping the memory? fine. keeping their stuff?"
//   20.8       whip to STOP 05 · THE GIFT SHOP: the hoodie folds into a parcel, RETURN TO SENDER stamps, it hops into the
//              mailbox. "mailed back. with a thank-you note."
//   26.0       card cut back to exhibit 1, framed exactly like frame 0: Cancer bows, Capricorn beside, the case now holds a
//              framed photo (the memory), plaque "HOODIE, 2019 · RETURNED ✓". Last line: "Keep the memory. Return the *hoodie.*"
// One canvas (sky through the skylight + the gallery + cast), DOM type (hook card, box, last line), grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { drawComet, drawSatellite, drawDayChip, hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'

export const DURATION = 35
const KEY = 'F'
const STORY_END = DURATION - ENDCARD_LEN       // 30.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#c8344f', WALL = '#3a2140'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const CAN = signStar('cancer'), CAP = signStar('capricorn')

// ── the timeline
const T = {
  hookOut: 3.0, open: -0.9, l1: -0.7,
  stop2: 3.2, punch: [3.25, 3.75], punchOut: [6.5, 7.0], l2: 4.7,
  pan1: [7.0, 7.7], stop3: 7.0, l3: 8.2, notes: [8.2, 10.3],
  pan2: [10.4, 11.2], stop4: 10.4, ghost: 11.0, capIn: 11.3, l4: 11.9, comet: 13.0, l5: 14.6,
  pan3: [16.4, 17.2], lift: 17.35, alarm: [17.5, 18.7], l6: 17.8,
  shop: 20.8, stop5: 20.8, fold: [21.0, 21.5], stamp: 21.6, mail: [22.3, 22.75], l7: 22.9, close: 25.8,
  final: 26.0, last: 26.4, lastLand: 26.95, bow: 27.4, lastOut: [30.3, 30.55], end: [30.25, 30.6],
}
const CAN_N = '♋ CANCER · CURATOR', CAP_N = '♑ CAPRICORN'
const LINES = [
  { t: T.l1, speaker: CAN_N, text: 'welcome. please stay behind the velvet *rope.*', color: CAN.color },
  { t: T.l2, speaker: CAN_N, text: 'the hoodie. still smells like them. *probably.*', color: CAN.color },
  { t: T.l3, speaker: CAN_N, text: 'the playlist. honestly? still *good.*', color: CAN.color },
  { t: T.l4, speaker: CAP_N, text: 'so… should i be *worried?*', color: CAP.color },
  { t: T.l5, speaker: CAN_N, text: 'no. it’s a museum. it’s the *past.*', color: CAN.color },
  { t: T.l6, speaker: CAN_N, text: 'keeping the memory? fine. keeping their *stuff?*', color: CAN.color },
  { t: T.l7, speaker: CAN_N, text: 'mailed back. with a *thank-you* note.', color: CAN.color },
]
const CPS = 28
const STOPS = [[0, '01', 'WELCOME'], [T.stop2, '02', 'THE HOODIE'], [T.stop3, '03', 'THE PLAYLIST'], [T.stop4, '04', 'COMING SOON'], [T.shop, '05', 'THE GIFT SHOP'], [T.final, '01', 'WELCOME (BACK)']]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const r3 = v => +v.toFixed(3)

// ── the gallery, in world x (the camera shows camX ± 540)
const FLOOR = 1300, WALL_TOP = 690
const EX = { hoodie: 650, playlist: 1730, reserved: 2810 }
const CAM_KEYS = [[0, 540], [T.pan1[0], 540], [T.pan1[1], 1620], [T.pan2[0], 1620], [T.pan2[1], 2700], [T.pan3[0], 2700], [T.pan3[1], 540]]
function camX(t) {
  for (let i = CAM_KEYS.length - 1; i > 0; i--) {
    const [t0, x0] = CAM_KEYS[i - 1], [t1, x1] = CAM_KEYS[i]
    if (t >= t0) return t >= t1 ? x1 : lerp(x0, x1, ease.inOutCubic(prog(t, t0, t1)))
  }
  return 540
}
// Cancer walks with the camera, a little left of each exhibit
function canWX(t) { const c = camX(t); return c - 250 + (t > T.pan3[1] && t < T.shop ? 30 : 0) }

// pixel bits
const HOODIE = [
  '....hhhhhh....', '...hHHHHHHh...', '..hHH....HHh..', '.hhHHh..hHHhh.', 'hHHHHHHHHHHHHh', 'hHHHHHssHHHHHh',
  'hHhHHHssHHHhHh', 'hHhHHHHHHHHhHh', 'hHhHppppppHhHh', 'hHhHpHHHHpHhHh', 'hhhHHHHHHHHhhh', '...HHHHHHHH...', '...hhhhhhhh...',
]
const HOODIE_C = { h: '#4b3f6e', H: '#7a6aa8', s: '#efe6d6', p: '#5d4f8a' }
const CASSETTE = ['cccccccccccccc', 'cLLLLLLLLLLLLc', 'cLwwwwwwwwwwLc', 'cLLLLLLLLLLLLc', 'cLLooLLLLooLLc', 'cLLooLLLLooLLc', 'cLLLLLLLLLLLLc', 'cccccccccccccc']
const CASSETTE_C = { c: '#2a2140', L: '#ff8fb1', w: '#fff3f7', o: '#1b1236' }
const GLASSES = ['GGG.GGG', 'G.GGG.G', 'GGG.GGG']
const GLASSES_C = { G: '#f2c75c' }
const TIE = ['.tt.', '.tt.', 'tttt', '.tt.', '.tt.', '..t.']
const TIE_C = { t: '#c8344f' }
const PARCEL = ['bbbbbbbbbb', 'bBBBBsBBBb', 'bBBBBsBBBb', 'bsssssssss', 'bBBBBsBBBb', 'bBBBBsBBBb', 'bbbbbbbbbb']
const PARCEL_C = { b: '#7a5232', B: '#c08a55', s: '#efe6d6' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
const NOTE8 = ['..nn', '..nn', '..n.', '..n.', 'nnn.', 'nnn.']
const NOTE_C = { n: '#ffd23f' }

export const GHOST = { at: T.ghost, x: EX.reserved - 2700 + 540 - 92, y: 1120, where: 'peeking round the left side of the empty RESERVED plinth (gallery stop 04)' }
export const COMET_AT = T.comet

function canState(t) {
  if (t < T.l2) return { mood: 'happy', look: [1, 0] }
  if (t < T.pan1[0]) return { mood: 'sparkle', look: [1, -0.5] }
  if (t < T.pan2[0]) return { mood: 'heart', look: [1, 0] }
  if (t < T.capIn + 0.3) return { mood: 'neutral', look: [1, 0] }
  if (t < T.l5) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.pan3[0]) return { mood: 'happy', look: [1, 0] }
  if (t < T.alarm[0]) return { mood: 'neutral', look: [1, -0.4] }
  if (t < T.alarm[1]) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.shop) return { mood: 'squint', look: [1, 0] }
  if (t < T.final) return { mood: 'happy', look: [0.6, 0.4] }
  return { mood: t < T.bow ? 'happy' : 'heart', look: [0, 0] }
}
const CAN_HOPS = [0.05, ...talkHops(LINES, CAN_N, { cps: CPS }), T.lift, T.stamp, T.bow]
const CAP_HOPS = [T.capIn + 0.4, ...talkHops(LINES, CAP_N, { cps: CPS }), T.bow + 0.1]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "800 40px Inter", "italic 500 34px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Welcome to the | Museum of *Exes.*', at: 0, out: T.hookOut, accentColor: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1452, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const HS = [
    [popText(root, 'Exhibit *A.*', { top: 200, size: 120, accentSize: 190, at: 3.3, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: 3.6 }), [6.7, 6.95]],
    [popText(root, 'Still a | *banger.*', { top: 190, size: 112, accentSize: 176, at: 7.75, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: 8.05 }), [10.15, 10.4]],
    [popText(root, 'Coming | *soon…*', { top: 190, size: 112, accentSize: 176, at: 11.25, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: 11.55 }), [13.5, 13.7]],
    [popText(root, 'Special | *guest.*', { top: 190, size: 112, accentSize: 176, at: 13.8, gap: 0.08, accentColor: CAP.color, wobble: true, late: 1, lateAt: 14.1 }), [16.2, 16.4]],
    [popText(root, 'Exit through | the *gift shop.*', { top: 190, size: 100, accentSize: 160, at: 21.0, gap: 0.08, accentColor: GOLD, wobble: true, late: 2, lateAt: 21.35, fit: true }), [25.6, 25.85]],
  ]
  const LAST = popText(root, 'Keep the memory. | Return the *hoodie.*', { top: 200, size: 92, accentSize: 150, at: T.last, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
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
  function spotlight(cx, a = 1) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, WALL_TOP, 0, FLOOR)
    g.addColorStop(0, `rgba(255,236,190,${0.2 * a})`); g.addColorStop(1, `rgba(255,236,190,${0.05 * a})`)
    x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, WALL_TOP); x.lineTo(cx + 40, WALL_TOP); x.lineTo(cx + 210, FLOOR); x.lineTo(cx - 210, FLOOR); x.closePath(); x.fill()
    x.restore()
    x.fillStyle = INK; x.fillRect(cx - 30, WALL_TOP - 4, 60, 22); x.fillStyle = '#ffe9b0'; x.fillRect(cx - 20, WALL_TOP + 14, 40, 6)
  }
  /** a plinth with a glass case on top; content(cx, cy) draws inside */
  function plinth(cx, content, { caseOn = true } = {}) {
    const top = 1050
    x.fillStyle = INK; x.fillRect(cx - 118, top - 6, 236, FLOOR - top + 6)
    x.fillStyle = '#e9e1d2'; x.fillRect(cx - 110, top, 220, FLOOR - top)
    x.fillStyle = '#cfc5b2'; x.fillRect(cx + 70, top, 40, FLOOR - top)
    x.fillStyle = '#f7f1e6'; x.fillRect(cx - 118, top - 14, 236, 14)
    if (content) content(cx, top - 110)
    if (caseOn) {
      x.save(); x.fillStyle = 'rgba(190,230,255,0.10)'; x.fillRect(cx - 100, top - 222, 200, 208)
      x.strokeStyle = 'rgba(220,240,255,0.55)'; x.lineWidth = 4; x.strokeRect(cx - 100, top - 222, 200, 208)
      x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(cx - 86, top - 206, 10, 70); x.fillRect(cx - 70, top - 206, 5, 40)
      x.restore()
    }
  }
  /** a museum label on the plinth front */
  function plaque(cx, y, title, sub, sub2, { k = 1, tick = false } = {}) {
    x.save(); x.translate(cx, y); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-100, -44, 200, 96); x.fillStyle = '#fbf7ef'; x.fillRect(-96, -40, 192, 88)
    x.restore()
    label(title, cx - 84 * k, y - 22 * k, { size: 17 * k, color: INK, font: INTER, weight: 800, align: 'left', shadow: false })
    label(sub, cx - 84 * k, y + 2 * k, { size: 13 * k, color: '#5a4e66', font: SERIF, weight: 500, italic: true, align: 'left', shadow: false })
    label(sub2, cx - 84 * k, y + 28 * k, { size: 15 * k, color: tick ? '#2f8f5a' : RED, font: MONO, weight: 700, align: 'left', shadow: false })
  }
  function stanchions(wx0, wx1, cam) {
    for (let wx = wx0; wx <= wx1; wx += 330) {
      const sx = wx - cam + 540
      if (sx < -80 || sx > 1160) continue
      x.fillStyle = INK; x.fillRect(sx - 10, 1290, 20, 130); x.fillStyle = GOLD; x.fillRect(sx - 6, 1294, 12, 122)
      x.fillStyle = GOLD; x.beginPath(); x.arc(sx, 1290, 13, 0, Math.PI * 2); x.fill(); x.fillRect(sx - 26, 1414, 52, 10)
      const nx = sx + 330
      x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(sx + 12, 1300); x.quadraticCurveTo(sx + 165, 1370, nx - 12, 1300); x.stroke()
      x.strokeStyle = '#ff6f86'; x.lineWidth = 3; x.beginPath(); x.moveTo(sx + 14, 1296); x.quadraticCurveTo(sx + 165, 1364, nx - 14, 1296); x.stroke()
    }
  }
  function portrait(sx, sy, w, h, draw, title) {
    x.fillStyle = INK; x.fillRect(sx - w / 2 - 22, sy - h / 2 - 22, w + 44, h + 44)
    x.fillStyle = '#c99a3a'; x.fillRect(sx - w / 2 - 16, sy - h / 2 - 16, w + 32, h + 32)
    x.fillStyle = '#f2c75c'; x.fillRect(sx - w / 2 - 10, sy - h / 2 - 10, w + 20, h + 20)
    x.fillStyle = '#1d1430'; x.fillRect(sx - w / 2, sy - h / 2, w, h)
    x.save(); x.beginPath(); x.rect(sx - w / 2, sy - h / 2, w, h); x.clip(); draw(); x.restore()
    label(title, sx, sy + h / 2 + 40, { size: 16, color: BONE, font: SERIF, weight: 500, italic: true })
  }
  /** the gallery wall, floor and skylight, at camera c */
  function gallery(t, c) {
    // skylight mullions over the sky
    x.save(); x.strokeStyle = 'rgba(20,12,36,0.85)'; x.lineWidth = 10
    for (let wx = Math.floor((c - 700) / 240) * 240; wx < c + 700; wx += 240) { const sx = wx - c + 540; x.beginPath(); x.moveTo(sx, 0); x.lineTo(sx, WALL_TOP); x.stroke() }
    x.beginPath(); x.moveTo(0, 360); x.lineTo(1080, 360); x.stroke()
    x.restore()
    // wall
    const g = x.createLinearGradient(0, WALL_TOP, 0, FLOOR); g.addColorStop(0, '#2c1832'); g.addColorStop(1, WALL)
    x.fillStyle = g; x.fillRect(0, WALL_TOP, 1080, FLOOR - WALL_TOP)
    x.fillStyle = INK; x.fillRect(0, WALL_TOP - 10, 1080, 16)
    x.fillStyle = '#4a2b52'; x.fillRect(0, 1190, 1080, 8)                                       // dado rail
    for (let wx = Math.floor((c - 700) / 180) * 180; wx < c + 700; wx += 180) { const sx = wx - c + 540; x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(sx, 1198, 6, FLOOR - 1198) }
    // floor (parquet)
    x.fillStyle = '#5a3a2a'; x.fillRect(0, FLOOR, 1080, 620)
    for (let row = 0; row < 8; row++) for (let wx = Math.floor((c - 700) / 120) * 120; wx < c + 700; wx += 120) {
      const sx = wx - c + 540 + (row % 2) * 60
      x.fillStyle = (row + Math.floor(wx / 120)) % 2 ? '#6b4632' : '#553524'; x.fillRect(sx, FLOOR + row * 70, 116, 66)
    }
    x.fillStyle = 'rgba(5,4,12,0.35)'; x.fillRect(0, FLOOR, 1080, 620)
    // exhibits
    const S = wx => wx - c + 540
    // 1: the hoodie (or, at the end, the framed memory)
    if (Math.abs(S(EX.hoodie) - 540) < 900) {
      spotlight(S(EX.hoodie))
      const lifted = t >= T.lift && t < T.final
      plinth(S(EX.hoodie), (cx, cy) => {
        if (t >= T.final) {
          // a framed photo of the two of them, kept
          x.fillStyle = INK; x.fillRect(cx - 62, cy - 40, 124, 150); x.fillStyle = '#c99a3a'; x.fillRect(cx - 56, cy - 34, 112, 138)
          x.fillStyle = '#ffb08a'; x.fillRect(cx - 46, cy - 24, 92, 118)
          drawStarChar(x, cx - 18, cy + 50, 54, t, { color: CAN.color, mood: 'happy', bob: 0, tips: false, glow: 0.3, blink: false })
          drawStarChar(x, cx + 22, cy + 50, 54, t, { color: '#b8b2c8', mood: 'happy', bob: 0, tips: false, glow: 0.3, blink: false })
        } else if (!lifted) drawBits(x, HOODIE, HOODIE_C, Math.round(cx), Math.round(cy + 30), 11)
      })
      if (t >= T.final) plaque(S(EX.hoodie), 1180, 'HOODIE, 2019', 'cotton, one string missing', 'RETURNED ✓', { tick: true })
      else plaque(S(EX.hoodie), 1180, 'HOODIE, 2019', 'cotton, one string missing', 'NEVER RETURNED')
    }
    // 2: the playlist
    if (Math.abs(S(EX.playlist) - 540) < 900) {
      spotlight(S(EX.playlist))
      plinth(S(EX.playlist), (cx, cy) => {
        drawBits(x, CASSETTE, CASSETTE_C, Math.round(cx), Math.round(cy + 30), 11, { rot: -0.08 })
        label('for u ♡', cx, cy + 4, { size: 20, color: INK, font: SERIF, weight: 500, italic: true, shadow: false })
      })
      plaque(S(EX.playlist), 1180, 'PLAYLIST', 'mixed feelings, mostly bangers', 'STILL GOOD')
      if (t > T.notes[0] && t < T.notes[1] + 0.8) for (let i = 0; i < 4; i++) {
        const p = ((t - T.notes[0]) * 0.7 + i * 0.25) % 1
        drawBits(x, NOTE8, NOTE_C, Math.round(S(EX.playlist) + 60 + i * 24 + Math.sin(p * 9) * 14), Math.round(900 - p * 220), 5, { alpha: Math.sin(Math.PI * p) * (1 - prog(t, T.notes[1], T.notes[1] + 0.8)) })
      }
    }
    // 3: the reserved plinth + the portraits
    if (Math.abs(S(EX.reserved) - 540) < 1000) {
      portrait(S(EX.reserved - 420), 860, 170, 130, () => drawComet(x, S(EX.reserved - 420) + 20, 860, 90, t, { sunDir: [1, 0.3], aura: false, exPin: false, mood: 'happy', tail: 160 }), 'The Comeback, oil on canvas')
      portrait(S(EX.reserved + 420), 860, 170, 130, () => drawSatellite(x, S(EX.reserved + 420), 860, 150, t, { aura: false, exPin: false }), 'Still Watching, mixed media')
      spotlight(S(EX.reserved), 0.7)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'left', cell: 4 })
      plinth(S(EX.reserved), null, { caseOn: false })
      plaque(S(EX.reserved), 1180, 'RESERVED', 'a new acquisition', 'LATER THIS SEASON')
    }
    stanchions(Math.floor((c - 900) / 330) * 330 + 75, c + 900, c)
  }
  function giftShop(t) {
    // the shop: shelves, a counter, the mailbox
    x.fillStyle = '#2c1832'; x.fillRect(0, WALL_TOP, 1080, FLOOR - WALL_TOP)
    x.fillStyle = INK; x.fillRect(0, WALL_TOP - 10, 1080, 16)
    x.fillStyle = '#4a2b52'; for (const sy of [800, 930]) x.fillRect(90, sy, 520, 14)
    const goods = [['#ff8fb1', 'MUG'], ['#7fd0ff', 'TOTE'], ['#ffd23f', 'PIN'], ['#c9a6ff', 'CARD']]
    goods.forEach(([col], i) => { x.fillStyle = col; x.fillRect(120 + i * 125, 740, 80, 60); x.fillRect(130 + i * 125, 870, 64, 60) })
    label('GIFT SHOP ♡ ALL SALES FINAL', 540, 720, { size: 26, color: GOLD })
    x.fillStyle = '#5a3a2a'; x.fillRect(0, FLOOR, 1080, 620); x.fillStyle = 'rgba(5,4,12,0.35)'; x.fillRect(0, FLOOR, 1080, 620)
    // counter
    x.fillStyle = INK; x.fillRect(60, 1094, 640, 230); x.fillStyle = '#8a5a3c'; x.fillRect(68, 1102, 624, 214); x.fillStyle = '#a8734f'; x.fillRect(60, 1094, 640, 20)
    // mailbox (right)
    x.fillStyle = INK; x.fillRect(800, 1000, 200, 300); x.fillStyle = '#3366cc'; x.fillRect(808, 1008, 184, 286)
    x.fillStyle = INK; x.fillRect(830, 1060, 140, 18)
    label('OUTGOING', 900, 1130, { size: 22, color: BONE })
    // the hoodie folds into the parcel on the counter, the stamp, then it hops into the mailbox
    const fp = prog(t, ...T.fold), mp = prog(t, ...T.mail)
    const px = lerp(470, 900, ease.inOutQuad(mp)), py = lerp(1050, 1068, mp) - Math.sin(Math.PI * mp) * 260
    if (fp < 1) drawBits(x, HOODIE, HOODIE_C, 470, 1040, Math.max(3, 11 * (1 - fp * 0.6)), { rot: fp * 0.3 })
    if (fp > 0.5 && mp < 0.98) {
      drawBits(x, PARCEL, PARCEL_C, Math.round(px), Math.round(py), Math.round(lerp(6, 12, prog(fp, 0.5, 1))) * (1 - 0.5 * ease.inQuad(prog(mp, 0.7, 1))))
      if (t >= T.stamp) {
        const sk = pop01(t, T.stamp, 0.18, 3)
        const ss = 1.35 * sk * (1 - 0.5 * ease.inQuad(prog(mp, 0.7, 1))); x.save(); x.translate(px, py - 70); x.rotate(-0.18); x.scale(ss, ss); x.fillStyle = 'rgba(251,247,239,0.9)'; x.fillRect(-104, -28, 208, 56)
        x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(-100, -24, 200, 48)
        x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText('RETURN TO SENDER', 0, 1)
        x.restore()
      }
    }
    if (mp >= 1) { const fk = prog(t, T.mail[1], T.mail[1] + 0.5); x.fillStyle = '#ffd23f'; x.fillRect(830, 1060 - 30 * Math.sin(Math.PI * fk), 140, 18) }
    // a little thank-you note on the counter
    if (t > T.l7) { const nk = pop01(t, T.l7 + 0.3, 0.3, 2); x.save(); x.translate(340, 1060); x.rotate(-0.1); x.scale(nk, nk); x.fillStyle = '#fbf7ef'; x.fillRect(-70, -44, 140, 88); x.restore(); if (nk > 0.5) label('thank you ♡', 340, 1056, { size: 22, color: INK, font: SERIF, italic: true, weight: 500, shadow: false }) }
  }
  function audioBar(t) {
    let si = 0; STOPS.forEach(([st], i) => { if (t >= st) si = i })
    const [st, num, name] = STOPS[si], k = pop01(t, st, 0.3, 2)
    const y0 = 1338, prog01 = ((t - st) / 6) % 1
    x.save(); x.translate(540, y0 + 40); x.scale(lerp(0.96, 1, k), lerp(0.7, 1, k)); x.translate(-540, -(y0 + 40))
    x.fillStyle = INK; x.fillRect(64, y0, 952, 84); x.fillStyle = 'rgba(16,10,40,0.95)'; x.fillRect(70, y0 + 6, 940, 72)
    x.fillStyle = GOLD; x.fillRect(70, y0 + 6, 120, 72)
    x.restore()
    label('🎧', 106, y0 + 42, { size: 34, shadow: false, font: INTER })
    label(num, 158, y0 + 43, { size: 34, color: INK, font: INTER, weight: 800, shadow: false })
    label(`STOP ${num} · ${name}`, 214, y0 + 28, { size: 24, color: BONE, align: 'left' })
    x.fillStyle = 'rgba(239,230,214,0.25)'; x.fillRect(214, y0 + 56, 600, 6)
    x.fillStyle = PINK; x.fillRect(214, y0 + 56, 600 * prog01, 6)
    label('▶', 960, y0 + 42, { size: 30, color: GOLD, font: INTER })
    // the keypad beep: the stop number flashes big at each change
    const fk = prog(t, st, st + 0.6)
    if (st > 0 && fk > 0 && fk < 1) label(`▶ ${num}`, 880, 1260, { size: 54, color: GOLD, font: INTER, weight: 800, alpha: 1 - ease.inQuad(fk) })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      // the hidden Comet across the skylight
      const cp = prog(t, T.comet, T.comet + 1.7)
      if (cp > 0 && cp < 1) drawComet(x, lerp(-40, 560, cp), lerp(600, 520, cp), 30, t, { sunDir: [1, 1], aura: false, exPin: false, tail: 90, mood: 'happy', alpha: 0.8 })
      const inShop = t >= T.shop && t < T.final
      const c = camX(t)
      // camera: the punch-in on the hoodie plaque
      const pk = ease.outCubic(prog(t, ...T.punch)) * (1 - ease.inOutQuad(prog(t, ...T.punchOut)))
      x.save()
      if (pk > 0 && !inShop) { const s = 1 + 0.9 * pk; x.translate(540, 1100); x.scale(s, s); x.translate(-lerp(540, EX.hoodie - c + 540, pk), -lerp(1100, 1150, pk)) }
      if (inShop) giftShop(t)
      else gallery(t, c)
      // Capricorn (with an audio guide) from 11.3 until the gift shop; then with Cancer to the end
      if (t >= T.capIn) {
        let cxs, cys = 1192
        if (inShop) cxs = 705
        else if (t >= T.final) cxs = 900
        else cxs = lerp(1200, 820, ease.outCubic(prog(t, T.capIn, T.capIn + 0.9))) + (EX.reserved - 2700) - (c - 2700)
        const r = drawStarChar(x, cxs, cys, 210, t, { color: CAP.color, glyph: CAP.glyph, mood: t < T.l5 ? 'wide' : t < T.final ? 'happy' : 'heart', look: [-1, 0], hops: CAP_HOPS, seed: 9, glow: 0.85, blink: t < T.l5 ? false : undefined })
        drawBits(x, TIE, TIE_C, Math.round(r.x), Math.round(r.y + r.size * 0.22), Math.round(r.size / 30))
      }
      // Cancer, the curator
      const cx = inShop ? 150 : (t >= T.final ? 300 : canWX(t) - c + 540)
      const cy = inShop ? 1000 : 1180
      const lean = t < 1.0 || (t >= T.final && t < T.bow + 0.6) ? 0.12 : 0
      const r = drawStarChar(x, cx, cy, 236, t, { color: CAN.color, glyph: CAN.glyph, ...canState(t), hops: CAN_HOPS, seed: 5, glow: 0.9, squash: lean })
      drawBits(x, GLASSES, GLASSES_C, Math.round(r.x), Math.round(r.y - r.size * 0.02), Math.round(r.size / 26), { alpha: 0.95 })
      x.fillStyle = '#7fd0ff'; x.fillRect(Math.round(r.x + r.size * 0.12), Math.round(r.y + r.size * 0.16), 26, 34); x.fillStyle = INK; x.fillRect(Math.round(r.x + r.size * 0.12) + 4, Math.round(r.y + r.size * 0.16) + 8, 18, 4)
      // carrying the hoodie back from the case, alarm going
      if (t >= T.lift && t < T.shop) drawBits(x, HOODIE, HOODIE_C, Math.round(r.x + 110), Math.round(r.y - 20 - 10 * Math.sin(t * 6)), 8, { rot: 0.1 })
      x.restore()
      // the alarm gag
      const al = prog(t, ...T.alarm)
      if (al > 0 && al < 1) {
        const on = Math.floor((t - T.alarm[0]) * 6) % 2 === 0
        x.fillStyle = on ? 'rgba(255,40,70,0.22)' : 'rgba(255,40,70,0.06)'; x.fillRect(0, 0, 1080, 1920)
        x.save(); x.translate(540, 560); x.rotate(-0.03); x.scale(pop01(t, T.alarm[0], 0.2, 2.5), pop01(t, T.alarm[0], 0.2, 2.5))
        x.fillStyle = '#ffd23f'; x.fillRect(-370, -64, 740, 128); x.fillStyle = INK; x.fillRect(-362, -56, 724, 112)
        x.restore()
        label('⚠ PLEASE DO NOT TOUCH', 540, 540, { size: 44, color: '#ffd23f', font: INTER, weight: 800 })
        label('(it’s my museum)', 540, 590, { size: 30, color: BONE, font: SERIF, italic: true, weight: 500 })
      }
      // the whip pan into the gift shop
      const wp = 1 - Math.abs(prog(t, T.shop - 0.2, T.shop + 0.2) * 2 - 1)
      if (wp > 0) { x.save(); x.globalAlpha = wp; for (let i = 0; i < 40; i++) { x.fillStyle = i % 2 ? 'rgba(239,230,214,0.25)' : 'rgba(58,33,64,0.7)'; x.fillRect(0, i * 48, 1080, 30) } x.restore() }
      audioBar(t)
      genreBug(x, t, { text: '🎧 AUDIO TOUR', x: 70, y: 640, color: GOLD })
      // the big green stamp on the case at the end
      if (t >= T.final + 0.35) {
        const sk = pop01(t, T.final + 0.35, 0.22, 3) * outK(t, T.lastOut)
        x.save(); x.translate(EX.hoodie - 540 + 540, 760); x.rotate(-0.12); x.scale(sk, sk)
        x.fillStyle = 'rgba(251,247,239,0.92)'; x.fillRect(-170, -46, 340, 92); x.strokeStyle = '#2f8f5a'; x.lineWidth = 8; x.strokeRect(-162, -38, 324, 76)
        x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#2f8f5a'; x.fillText('RETURNED ✓', 0, 2)
        x.restore()
      }
      // a heart between them at the end
      if (t > T.bow) drawBits(x, HEART, HEART_C, Math.round(600), Math.round(1000 - 40 * prog(t, T.bow, T.bow + 1.5)), 7, { alpha: Math.sin(Math.PI * prog(t, T.bow, T.bow + 1.5)) })
      drawDayChip(x, t, { day: 12, phase: 'retro' })
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

// card-motif candidates: 20.8 (gallery → gift shop: covered by the film's own whip if cardfx skips it), 26.0 (→ exhibit 1).
const CUTS = [{ t: T.shop, kind: 'deal' }, { t: T.final, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E07', fadeIn: 0.01 }), cardCuts(CUTS)]

// ── sound
const NOTE = [698.46, 783.99, 880, 1046.5, 1174.66, 1396.91]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ['pop', T.open, 880, 0.04, 0], ['pop', T.open + 0.06, 1174.66, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [CAN_N]: 784, [CAP_N]: 523.25 } }),
  ...STOPS.slice(1).flatMap(([st], i) => [['pop', r3(st), 1396.91, 0.04, 0.3], ['pop', r3(st + 0.09), 1760, 0.03, 0.3]]),
  ['whoosh', T.punch[0], 0.4, 0.03], ['whoosh', T.pan1[0], 0.6, 0.03], ['whoosh', T.pan2[0], 0.6, 0.03], ['whoosh', T.pan3[0], 0.6, 0.03],
  ...[0, 1, 2, 3, 4, 5].map(i => ['pluck', r3(T.notes[0] + 0.1 + i * 0.28), [1046.5, 1174.66, 1396.91, 1174.66, 1046.5, 880][i], 0.03, 0.5, 0.2]),
  ['tick', T.ghost + 0.05, 0.015], ['pop', T.capIn + 0.4, 523.25, 0.04, 0.4], ['glitter', T.comet, T.comet + 0.9],
  ...[0, 1, 2, 3, 4, 5, 6].map(i => ['bell', r3(T.alarm[0] + i * 0.17), i % 2 ? 1318.51 : 1567.98, 0.022, 0.25, 0]),
  ...stingerCues(T.shop - 0.25, { key: KEY, kind: 'sitcom' }),
  ['whoosh', T.fold[0], 0.4, 0.025], ['boom', T.stamp, 0.18], ['tick', T.stamp, 0.1], ['whoosh', T.mail[0], 0.45, 0.03], ['pop', T.mail[1], 1046.5, 0.05, 0.4],
  ...wordPops(T.last, 5, 0.08, 0, 0.024), ['pop', T.lastLand, 1396.91, 0.05, 0], ['pluck', T.lastLand, 1396.91, 0.045, 0.6, 0],
  ['bell', T.bow, 1760, 0.03, 1.4, 0], ['pop', T.close, 880, 0.03, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
