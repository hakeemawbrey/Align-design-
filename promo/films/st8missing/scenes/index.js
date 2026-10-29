// st8missing (40 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", EP 10) · story 0–35.6, then the shared end card.
//   Genre: the true-crime podcast. "Venus has gone *missing.*"  Podcast chrome: cover art "EP 10: THE DISAPPEARANCE", an
//   ON AIR light, a live waveform, a scrub bar with chapter ticks and 1× speed, chapter cards in typewriter type. Hosts:
//   Scorpio (the detective coat from season 4, headphones) and the Moon. The real fact: in the middle of a retrograde,
//   Venus passes between Earth and the Sun (inferior conjunction) and is lost in the Sun's glare for a few days, then
//   comes back in the morning sky.
//   0.00       frame 0: the hook card; Scorpio leaning into the mic, ON AIR, the waveform spiking. SCORPIO: "she was last
//              seen in the evening sky."   3.4 MOON: "and then… she was gone." (horror sting)
//   5.6        CH 1 · LAST SEEN: the corkboard, red string, a polaroid of Venus low in the dusk. "no texts. no posts. not
//              even a sparkle."  (8.0: the hidden Comet crosses above the board.)
//   9.2        CH 2 · THE SUSPECTS: the Comet, the Orbiter, the Meteor. THE ORBITER: "i saw everything. i said nothing."
//              ALIBI stamps. MOON: "everyone has an alibi. so where is she?"
//   16.4       CH 3 · THE SCIENCE: a diagram: Venus slides between Earth and the Sun into the glare + the fact chip.
//              MOON: "mid-retrograde, Venus passes between us and the Sun." → "she's not missing. she's in the glare."
//   23.4       CH 4 · THE NOTE: a note drops onto the board: "taking space. back soon. ♀". SCORPIO: "…she told us." The
//              red strings go slack. MOON: "she'll be back in the morning sky."  (27.4: the ghost peeks round the board.)
//   29.8       back in the studio, framed like frame 0: the waveform calm, the cover now "EP 10: THE NOTE".
//              Last line: "Space is okay | when you *say* so."
// One canvas (sky + studio / corkboard / diagram + cast), DOM type (hook card, box, last line), grain on top. Pure f(t).
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
import { VENUS, COMET, SATELLITE, METEOR, drawVenus, drawComet, drawSatellite, drawMeteor, drawDayChip, hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'

export const DURATION = 40
const KEY = 'Bbm'
const STORY_END = DURATION - ENDCARD_LEN       // 35.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#ff3d5a', MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const SCO = signStar('scorpio')

// ── the timeline
const T = {
  hookOut: 3.1, open: -0.9, l1: -0.7, l2: 3.4, gone: 4.3,
  board: 5.6, ch1: 5.6, l3: 6.1, comet: 8.0,
  ch2: 9.2, sus: [9.5, 9.75, 10.0], l4: 10.4, alibi: [12.0, 12.4, 12.8], l5: 13.4,
  sci: 16.4, l6: 16.8, slide: [16.9, 19.6], chip: 17.6, chipOut: [22.9, 23.15], l7: 20.6,
  note: 23.4, noteFall: [23.7, 24.3], l8: 24.6, slack: [25.4, 26.4], l9: 26.9, ghost: 27.4,
  studio: 29.8, close: 29.85, last: 30.2, lastLand: 30.75, lastOut: [35.0, 35.3], end: [34.95, 35.3],
}
const SCO_N = '♏ SCORPIO', MOON_N = '☽ THE MOON', ORB_N = SATELLITE.tagText || 'THE ORBITER'
const LINES = [
  { t: T.l1, speaker: SCO_N, text: 'she was last seen in the *evening* sky.', color: SCO.color },
  { t: T.l2, speaker: MOON_N, text: 'and then… she was *gone.*', color: MOONLIGHT },
  { t: T.l3, speaker: SCO_N, text: 'no texts. no posts. not even a *sparkle.*', color: SCO.color },
  { t: T.l4, speaker: ORB_N, text: 'i saw everything. i said *nothing.*', color: '#ffd23f' },
  { t: T.l5, speaker: MOON_N, text: 'everyone has an alibi. so where *is* she?', color: MOONLIGHT },
  { t: T.l6, speaker: MOON_N, text: 'mid-retrograde, Venus passes between us and the *Sun.*', color: MOONLIGHT },
  { t: T.l7, speaker: MOON_N, text: 'she’s not missing. she’s in the *glare.*', color: MOONLIGHT },
  { t: T.l8, speaker: SCO_N, text: '…she *told* us.', color: SCO.color },
  { t: T.l9, speaker: MOON_N, text: 'she’ll be back in the *morning* sky.', color: MOONLIGHT },
]
const CPS = 28
const CHAPTERS = [[T.ch1, 'CH 1 · LAST SEEN'], [T.ch2, 'CH 2 · THE SUSPECTS'], [T.sci, 'CH 3 · THE SCIENCE'], [T.note, 'CH 4 · THE NOTE']]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const r3 = v => +v.toFixed(3)

// ── layout
const SCO0 = { x: 290, y: 1120, size: 300 }
const MOON0 = { x: 800, y: 1130, size: 260 }
const BOARD = { x0: 60, x1: 1020, y0: 560, y1: 1320 }
const PINS = { last: [300, 760], comet: [250, 1110], orb: [540, 1150], met: [830, 1110], note: [760, 790] }

const HEADPH = ['...kkkkk...', '..k.....k..', '.k.......k.', 'k.........k', 'PP.......PP', 'PP.......PP', 'PP.......PP']
const COAT = ['CC.......CC', 'CCC.....CCC', '.CCC...CCC.', '..CCC.CCC..']
const COAT_C = { C: '#a8834f' }
const HAT = ['...hhhhh...', '..hhhhhhh..', '..hbbbbbh..', 'hhhhhhhhhhh']
const HAT_C = { h: '#6b5232', b: '#2a1d14' }

export const GHOST = { at: T.ghost, x: 900, y: BOARD.y0 - 16, where: 'peeking up over the top edge of the corkboard in chapter 4, right side' }
export const COMET_AT = T.comet

function scoState(t) {
  if (t < T.l2) return { mood: 'squint', look: [0.4, 0.2] }
  if (t < T.board) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.studio) return { mood: 'squint', look: [0, 0] }
  return { mood: 'happy', look: [0.5, 0] }
}
function moonState(t) {
  if (t < T.l2) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.board) return { mood: 'sleepy', look: [-1, 0] }
  return { mood: 'happy', look: [-1, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "800 40px Inter", "italic 500 44px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Venus has gone | *missing.*', at: 0, out: T.hookOut, accentColor: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1452, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const LAST = popText(root, 'Space is okay | when you *say* so.', { top: 196, size: 104, accentSize: 168, at: T.last, gap: 0.08, accentColor: PINK, wobble: true, late: 2, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function label(text, cx, cy, { size = 30, color = BONE, font = MONO, weight = 700, align = 'center', alpha = 1, shadow = true, italic = false, rot = 0 } = {}) {
    if (alpha <= 0) return
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    if (shadow) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(text, 3, 3) }
    x.fillStyle = color; x.fillText(text, 0, 0); x.restore()
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r); x.restore()
  }
  /** the podcast player panel: cover art, title, waveform, scrub bar with chapter ticks */
  function player(t, calm) {
    const y0 = 560
    x.fillStyle = INK; x.fillRect(64, y0 - 6, 952, 376); x.fillStyle = 'rgba(14,9,32,0.95)'; x.fillRect(70, y0, 940, 364)
    // cover art
    x.fillStyle = '#2b0f2a'; x.fillRect(96, y0 + 26, 260, 260)
    const cg = x.createLinearGradient(0, y0 + 26, 0, y0 + 286); cg.addColorStop(0, '#5a1838'); cg.addColorStop(1, '#14060f'); x.fillStyle = cg; x.fillRect(96, y0 + 26, 260, 260)
    x.save(); x.globalAlpha = calm ? 1 : 0.35; drawStarChar(x, 226, y0 + 150, 120, t, { color: VENUS.color, mood: calm ? 'happy' : 'sleepy', glow: 0.4, tips: false, bob: 0, zzz: false }); x.restore()
    if (!calm) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(226, y0 + 150, 76, 0, Math.PI * 2); x.stroke() }
    label('?', 300, y0 + 70, { size: 54, color: RED, font: INTER, weight: 800, alpha: calm ? 0 : 1 })
    label(calm ? 'THE NOTE' : 'THE DISAPPEARANCE', 226, y0 + 262, { size: calm ? 26 : 20, color: BONE, font: INTER, weight: 800 })
    // title
    label('STAR CRIMES', 384, y0 + 50, { size: 30, color: GOLD, align: 'left' })
    label(calm ? 'EP 10: THE NOTE' : 'EP 10: THE DISAPPEARANCE', 384, y0 + 94, { size: 32, color: BONE, font: INTER, weight: 800, align: 'left' })
    label('with ♏ Scorpio & ☽ the Moon', 384, y0 + 134, { size: 26, color: 'rgba(239,230,214,0.75)', font: SERIF, italic: true, weight: 500, align: 'left' })
    // waveform
    const amp = calm ? 0.3 : 1
    for (let i = 0; i < 52; i++) {
      const v = Math.abs(Math.sin(t * 9 + i * 0.7) * Math.sin(t * 3.1 + i * 0.31)) * amp
      const h = 8 + v * 70
      x.fillStyle = i / 52 < ((t / 41) + 0.28) ? PINK : 'rgba(239,230,214,0.35)'
      x.fillRect(384 + i * 11.5, y0 + 210 - h / 2, 7, h)
    }
    // scrub bar with chapter ticks
    const bx = 96, bw = 888, by = y0 + 318, p = 0.28 + t / 41 * 0.5
    x.fillStyle = 'rgba(239,230,214,0.25)'; x.fillRect(bx, by, bw, 6); x.fillStyle = PINK; x.fillRect(bx, by, bw * p, 6)
    for (const c of [0.34, 0.46, 0.58, 0.7]) { x.fillStyle = GOLD; x.fillRect(bx + bw * c - 2, by - 6, 4, 18) }
    x.fillStyle = BONE; x.beginPath(); x.arc(bx + bw * p, by + 3, 11, 0, Math.PI * 2); x.fill()
    const mm = Math.floor(14 + t * 0.5), ss2 = Math.floor((t * 30) % 60)
    label(`${mm}:${String(ss2).padStart(2, '0')}`, bx, by + 30, { size: 20, color: BONE, align: 'left', shadow: false })
    label('◀◀  ❚❚  ▶▶   1×', bx + bw, by + 30, { size: 20, color: BONE, align: 'right', shadow: false })
  }
  function studio(t, calm) {
    x.fillStyle = '#1a1030'; x.fillRect(0, 940, 1080, 980)
    for (let i = 0; i < 12; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? '#24173f' : '#1e1336'; x.fillRect(i * 92, 960 + j * 80, 88, 76) }   // acoustic foam
    x.fillStyle = INK; x.fillRect(0, 1270, 1080, 20); x.fillStyle = '#3b2a56'; x.fillRect(0, 1290, 1080, 160)                                       // the desk
    player(t, calm)
    // hosts
    const lean = t < T.l2 ? 0.08 : 0
    const rs = drawStarChar(x, SCO0.x + (t < T.l2 ? 30 : 0), SCO0.y, SCO0.size, t, { color: SCO.color, glyph: SCO.glyph, ...scoState(t), hops: talkHops(LINES, SCO_N, { cps: CPS }), seed: 8, glow: 0.9, squash: lean })
    if (!calm) drawBits(x, HAT, HAT_C, Math.round(rs.x), Math.round(rs.top + rs.size * 0.06), Math.round(rs.size / 18), { rot: -0.15 })
    drawBits(x, HEADPH, { k: '#2a2140', P: PINK }, Math.round(rs.x), Math.round(rs.y - rs.size * 0.2), Math.round(rs.size / 15))
    const rm = drawStarChar(x, MOON0.x, MOON0.y, MOON0.size, t, { color: MOONC, glyph: '☽', ...moonState(t), hops: talkHops(LINES, MOON_N, { cps: CPS }), seed: 7, glow: 1.0 })
    drawBits(x, HEADPH, { k: '#2a2140', P: MOONLIGHT }, Math.round(rm.x), Math.round(rm.y - rm.size * 0.2), Math.round(rm.size / 15))
    // the mics on boom arms
    for (const [mx, my, d] of [[rs.x + 150, rs.y + 20, 1], [rm.x - 140, rm.y + 20, -1]]) {
      x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(mx + d * 80, 1280); x.lineTo(mx + d * 60, my + 80); x.lineTo(mx, my + 30); x.stroke()
      x.fillStyle = INK; x.fillRect(mx - 26, my - 50, 52, 96); x.fillStyle = '#4a4a5c'; x.fillRect(mx - 20, my - 44, 40, 84)
      x.fillStyle = '#6a6a80'; for (let k = 0; k < 5; k++) x.fillRect(mx - 18, my - 38 + k * 16, 36, 5)
    }
  }
  function polaroid(cx, cy, w, rot, draw, caption, k = 1) {
    if (k <= 0) return
    const h = w * 1.2, iw = w - 24, ih = w - 26
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.fillStyle = 'rgba(0,0,0,0.4)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
    x.fillStyle = '#f6efe2'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#140b26'; x.fillRect(-iw / 2, -h / 2 + 12, iw, ih)
    x.save(); x.beginPath(); x.rect(-iw / 2, -h / 2 + 12, iw, ih); x.clip(); x.translate(0, -h / 2 + 12 + ih / 2); draw(iw, ih); x.restore()
    x.font = `italic 500 ${Math.round(w * 0.1)}px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(caption, 0, h / 2 - w * 0.1)
    x.fillStyle = RED; x.beginPath(); x.arc(0, -h / 2 + 4, 10, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function corkboard(t) {
    const { x0, x1, y0, y1 } = BOARD
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 4 })
    x.fillStyle = INK; x.fillRect(x0 - 16, y0 - 16, x1 - x0 + 32, y1 - y0 + 32); x.fillStyle = '#6e4a2a'; x.fillRect(x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 20)
    x.fillStyle = '#b98a55'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    for (let i = 0; i < 260; i++) { x.fillStyle = i % 2 ? 'rgba(90,50,20,0.25)' : 'rgba(255,230,180,0.18)'; x.fillRect(x0 + (i * 137) % (x1 - x0), y0 + (i * 89) % (y1 - y0), 6, 6) }
    // red string between the pins: taut until the note, then slack
    const sl = ease.inOutQuad(prog(t, ...T.slack))
    const pinsOn = [['last', T.board], ['comet', T.sus[0]], ['orb', T.sus[1]], ['met', T.sus[2]]].filter(([, at]) => t >= at + 0.3).map(([k]) => PINS[k])
    x.strokeStyle = RED; x.lineWidth = 5
    for (let i = 0; i < pinsOn.length; i++) for (let j = i + 1; j < pinsOn.length; j++) {
      const [ax, ay] = pinsOn[i], [bx, by] = pinsOn[j]
      x.beginPath(); x.moveTo(ax, ay - 140); x.quadraticCurveTo((ax + bx) / 2, (ay + by) / 2 - 140 + sl * 160, bx, by - 140); x.stroke()
    }
    // CH 1: last seen, Venus low in the dusk
    polaroid(PINS.last[0], PINS.last[1], 300, -0.05, (iw, ih) => {
      const g = x.createLinearGradient(0, -ih / 2, 0, ih / 2); g.addColorStop(0, '#2b2160'); g.addColorStop(0.7, '#ff8a6b'); g.addColorStop(1, '#ffc27a'); x.fillStyle = g; x.fillRect(-iw / 2, -ih / 2, iw, ih)
      x.fillStyle = '#140b26'; x.fillRect(-iw / 2, ih * 0.3, iw, ih * 0.2)
      drawPixelStar(x, iw * 0.15, ih * 0.05, 34, 1, VENUS.color)
    }, 'LAST SEEN: evening sky', pop01(t, T.board + 0.2, 0.3, 2))
    // CH 2: the suspects
    const sus = [['comet', T.sus[0], (iw) => drawComet(x, 0, 0, iw * 0.4, t, { sunDir: [-1, 0.5], aura: false, exPin: false, mood: 'happy', tail: iw * 0.6 }), 'the Comet'],
      ['orb', T.sus[1], (iw) => drawSatellite(x, 0, 0, iw * 0.8, t, { aura: false, exPin: false }), 'the Orbiter'],
      ['met', T.sus[2], (iw) => drawMeteor(x, 0, 0, iw * 0.35, t, { aura: false, exPin: false, burn: 0.85 }), 'the Meteor']]
    sus.forEach(([k, at, draw, cap], i) => {
      polaroid(PINS[k][0], PINS[k][1], 250, [-0.07, 0.04, 0.08][i], draw, cap, pop01(t, at, 0.3, 2))
      const ak = pop01(t, T.alibi[i], 0.18, 3)
      if (ak > 0) {
        x.save(); x.translate(PINS[k][0], PINS[k][1] + 40); x.rotate(-0.25); x.scale(ak, ak)
        x.fillStyle = 'rgba(246,239,226,0.9)'; x.fillRect(-100, -30, 200, 60); x.strokeStyle = '#2f8f5a'; x.lineWidth = 6; x.strokeRect(-94, -24, 188, 48)
        x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#2f8f5a'; x.fillText('ALIBI ✓', 0, 2); x.restore()
      }
    })
    // CH 4: the note
    if (t >= T.note) {
      const fp = ease.outCubic(prog(t, ...T.noteFall))
      const nx = PINS.note[0], ny = lerp(400, PINS.note[1], fp) + Math.sin((1 - fp) * 12) * 30 * (1 - fp)
      x.save(); x.translate(nx, ny); x.rotate(lerp(0.6, 0.06, fp))
      x.fillStyle = 'rgba(0,0,0,0.35)'; x.fillRect(-170, -104, 350, 220); x.fillStyle = '#fff6f9'; x.fillRect(-176, -110, 352, 220)
      x.fillStyle = 'rgba(255,143,177,0.4)'; for (let i = 0; i < 4; i++) x.fillRect(-156, -60 + i * 44, 312, 3)
      x.fillStyle = RED; x.beginPath(); x.arc(0, -100, 12, 0, Math.PI * 2); x.fill()
      x.font = `italic 500 46px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#7a2a52'
      x.fillText('taking space.', 0, -36); x.fillText('back soon. ♀', 0, 22)
      x.restore()
    }
  }
  /** the science: Sun, Earth, Venus sliding between them into the glare */
  function diagram(t) {
    const { x0, x1, y0, y1 } = BOARD
    x.fillStyle = INK; x.fillRect(x0 - 8, y0 - 8, x1 - x0 + 16, y1 - y0 + 16); x.fillStyle = '#0c0820'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
    const S = { x: 300, y: 950 }, E = { x: 920, y: 950 }, R = 300
    x.strokeStyle = 'rgba(239,230,214,0.25)'; x.lineWidth = 3; x.setLineDash([10, 10])
    x.beginPath(); x.arc(S.x, S.y, R, 0, Math.PI * 2); x.stroke(); x.setLineDash([])
    glow(S.x, S.y, 220, '#ffd23f', 0.75)
    x.fillStyle = '#ffd23f'; x.beginPath(); x.arc(S.x, S.y, 60, 0, Math.PI * 2); x.fill()
    label('SUN', S.x, S.y + 100, { size: 26, color: GOLD })
    drawPixelStar(x, E.x, E.y, 50, 1, '#5fb0ff')
    label('EARTH (us)', E.x - 10, E.y + 60, { size: 24, color: '#9fd0ff' })
    // Venus along her orbit: from upper-right toward the Sun–Earth line
    const p = ease.inOutQuad(prog(t, ...T.slide)), a = lerp(-1.05, 0, p)
    const V = { x: S.x + Math.cos(a) * R, y: S.y + Math.sin(a) * R }
    // the glare: brightest along Earth's line of sight to the Sun
    const near = 1 - clamp(Math.abs(V.y - S.y) / 160)
    glow(lerp(V.x, S.x, 0.3), S.y, 260 * near + 20, '#fff3c8', 0.85 * near)
    x.strokeStyle = 'rgba(159,208,255,0.45)'; x.lineWidth = 3; x.setLineDash([6, 8]); x.beginPath(); x.moveTo(E.x - 30, E.y); x.lineTo(V.x, V.y); x.stroke(); x.setLineDash([])
    drawVenus(x, V.x, V.y, 90, t, { mood: near > 0.7 ? 'sleepy' : 'neutral', retro: 0.8, alpha: 1 - 0.75 * near, look: [1, 0], zzz: false, seed: 3 })
    label('VENUS', V.x, V.y - 70, { size: 24, color: VENUS.color, alpha: 1 - 0.8 * near })
    if (near > 0.8) label('lost in the glare', S.x + 180, S.y - 150, { size: 34, color: '#fff3c8', font: SERIF, italic: true, weight: 500, alpha: prog(near, 0.8, 1) })
    label('INFERIOR CONJUNCTION', 540, y0 + 50, { size: 28, color: GOLD, alpha: prog(t, T.slide[1] - 0.4, T.slide[1]) })
  }
  function chapterCard(t) {
    for (const [at, txt] of CHAPTERS) {
      const k = pop01(t, at, 0.25, 2) * outK(t, [at + 1.3, at + 1.55])
      if (k <= 0) continue
      x.save(); x.translate(540, 470); x.rotate(-0.02); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-380, -54, 760, 108); x.fillStyle = '#efe3c8'; x.fillRect(-372, -46, 744, 92)
      x.restore()
      const n = Math.floor(clamp((t - at) * 30, 0, txt.length))
      label(txt.slice(0, n), 540, 472, { size: 44, color: INK, shadow: false, alpha: k })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const cp = prog(t, T.comet, T.comet + 1.6)
      if (cp > 0 && cp < 1) drawComet(x, lerp(1100, 560, cp), lerp(380, 450, cp), 30, t, { sunDir: [-1, 0.6], aura: false, exPin: false, tail: 90, mood: 'happy', alpha: 0.85 })
      const inBoard = (t >= T.board && t < T.sci) || (t >= T.note && t < T.studio)
      if (t >= T.sci && t < T.note) diagram(t)
      else if (inBoard) corkboard(t)
      else studio(t, t >= T.studio)
      // "gone": the cover art flickers out
      const gk = prog(t, T.gone, T.gone + 0.6)
      if (gk > 0 && gk < 1) { x.fillStyle = `rgba(5,4,12,${0.6 * Math.sin(Math.PI * gk)})`; x.fillRect(0, 0, 1080, 1920) }
      chapterCard(t)
      // the fact chip
      const ck = pop01(t, T.chip, 0.3, 2) * outK(t, T.chipOut)
      if (ck > 0) {
        x.save(); x.translate(540, 1240); x.scale(ck, ck); x.fillStyle = INK; x.fillRect(-460, -80, 920, 160); x.fillStyle = 'rgba(16,10,40,0.96)'; x.fillRect(-452, -72, 904, 144); x.strokeStyle = '#7fd0ff'; x.lineWidth = 4; x.strokeRect(-452, -72, 904, 144); x.restore()
        label('✦ REAL: mid-retrograde, Venus passes between', 540, 1200, { size: 30, color: BONE, font: INTER, weight: 800, alpha: ck })
        label('Earth and the Sun, lost in its glare for a few days.', 540, 1240, { size: 30, color: BONE, font: INTER, weight: 800, alpha: ck })
        label('then she returns in the morning sky.', 540, 1282, { size: 28, color: GOLD, font: SERIF, italic: true, weight: 500, alpha: ck })
      }
      genreBug(x, t, { text: 'ON AIR', x: 70, y: 520, color: RED, blink: true })
      drawDayChip(x, t, { day: 21, phase: 'gone' })
      const e = prog(t, ...T.end)
      if (e > 0) { x.save(); x.globalAlpha = ease.inQuad(e); drawSky(x, t, SKY_H); x.restore() }
      hook.update(t)
      box.update(t)
      LAST.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.6 (studio → board), 16.4 (→ the science), 23.4 (→ the note), 29.8 (→ the studio).
const CUTS = [{ t: T.board, kind: 'flip' }, { t: T.sci, kind: 'deal' }, { t: T.note, kind: 'flip' }, { t: T.studio, kind: 'flip', dir: -1 }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E10', fadeIn: 0.01 }), cardCuts(CUTS)]

// ── sound
const NOTE = [466.16, 554.37, 622.25, 698.46, 830.61, 932.33]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...talkCues(LINES, { cps: CPS, pitch: { [SCO_N]: 523.25, [MOON_N]: 784, [ORB_N]: 1046.5 } }),
  ...stingerCues(T.gone, { key: KEY, kind: 'horror' }),
  ...CHAPTERS.flatMap(([at, txt]) => [...stingerCues(at + 0.05, { key: KEY, kind: 'noir' }), ...Array.from({ length: Math.ceil(txt.length / 3) }, (_, i) => ['tick', r3(at + i * 0.1), 0.02])]),
  ['glitter', T.comet, T.comet + 0.9],
  ...T.sus.map((s, i) => ['pop', r3(s), NOTE[i + 2], 0.04, (i - 1) * 0.4]),
  ...T.alibi.flatMap(a => [['boom', r3(a), 0.12], ['tick', r3(a), 0.08]]),
  ['riser', T.slide[0], T.slide[1], 0.05], ['glitter', T.slide[1] - 0.6, T.slide[1] + 0.4], ['pop', T.chip, 932.33, 0.045, 0],
  ['whoosh', T.noteFall[0], 0.6, 0.03], ['tick', T.noteFall[1], 0.06], ['bell', T.noteFall[1] + 0.05, 1244.51, 0.03, 1.4, 0],
  ['whoosh', T.slack[0], 0.8, 0.02], ['tick', T.ghost + 0.05, 0.015],
  ...wordPops(T.last, 4, 0.08, 0, 0.026), ['pop', T.lastLand, 932.33, 0.05, 0], ['pluck', T.lastLand + 0.1, 1244.51, 0.045, 0.6, 0],
  ['pop', T.close, 698.46, 0.03, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
