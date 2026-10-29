// askcancer (30 s vertical Align ad, Star Talk S1 extra "Ask the Stars") · story 0–25.6, then the shared end card.
//   0.00–3.20  DM: "They want me to meet their *family*."  The ♋ star, a homemade pie at its feet and a HELLO name-tag sticker,
//              practises nervous handshakes with its reflection in a pixel standing mirror (sweat drop and all).
//   3.20–7.40  ♋ CANCER STAR: "bring something small. flowers. a dessert."  Flowers pop up beside the pie.
//              Chip: ♋ cardinal water · ruled by the Moon | the sign of home in astrology.
//   7.40–11.2  CANCER: "ask the parents one question about them."  The reflection holds up a cue card: "how did you two meet?"
//   11.2–14.6  CANCER: "and let your date rescue you if needed."  A life ring drops onto it; it laughs.
//   14.65      card cut → two talk cards flip together (both played): "my grandma's kitchen" / "my dad's sunday soup".
//              CANCER: "family isn't a test. it's a welcome."  A WELCOME mat rolls out under it.
//   18.75      card cut → "Show up *warm*. | That's enough."  The mirror is gone; a front door opens, warm light spills out,
//              and Cancer hops toward it with the pie.
// One canvas (sky + props + star), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { GOLD, BONE, PINK, INK, MONO, INTER, loadFonts, pop01, outK, popOut, popText, dmCard, noteChip, drawBits, drawTalkCard, sparkles, wordPops } from './kit.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const CAN = signStar('cancer'), BLUE = CAN.color
const SPEAK = '♋ CANCER STAR'
const WARM = '#ffcf7a'

// ── the timeline
const T = {
  open: 3.2, l1: 3.4, flowers: 4.55, dessert: 5.1, chip: 5.9,
  dmOut: [7.0, 7.3], l2: 7.4, cue: 8.3,
  l3: 11.2, ring: 11.9, laugh: 12.3,
  cut1: 14.65, cards: 14.75, flipC: [15.4, 15.8], l4: 15.1, mat: 16.1, close: 18.6,
  cut2: 18.75, h2: 18.85, h2Land: 19.4, door: [20.6, 21.3], hopIn: [22.6, 23.6], h2Out: [25.2, 25.42], out: [25.08, 25.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'bring something small. *flowers.* a dessert.', color: '#8fdcff' },
  { t: T.l2, speaker: SPEAK, text: 'ask the parents one question about *them.*', color: '#8fdcff' },
  { t: T.l3, speaker: SPEAK, text: 'and let your date *rescue* you if needed.', color: '#8fdcff' },
  { t: T.l4, speaker: SPEAK, text: "family isn't a test. it's a *welcome.*", color: WARM },
]
const CPS = 28
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

// ── pixel props
const PIE = ['....s..s....', '..ssSssSss..', '.sSsssssSss.', 'ssssSssSssss', 'CCCCCCCCCCCC', '.CCCCCCCCCC.', '..CCCCCCCC..']
const PIE_C = { s: '#e8b060', S: '#9e5a26', C: '#d9e6f2' }
const HAND = ['.hhh.', 'hhhhh', 'hhhhh', 'hhhhh', '.hhh.']
const FLOWERS = ['.R...Y...P.', 'RWR.YWY.PWP', '.R...Y...P.', '..G..G..G..', '...G.G.G...', '....GGG....', '...KKKKK...', '...KKKKK...', '....KKK....']
const FLOWERS_C = { R: '#ff5d7a', Y: '#ffd34d', P: '#c48bff', W: '#fff3dc', G: '#4fbf6a', K: '#f5eedf' }
const RING = ['...RRRRR...', '..RWWRWWR..', '.RW.....WR.', 'RW.......WR', 'RR.......RR', 'WR.......RW', 'RR.......RR', 'RW.......WR', '.RW.....WR.', '..RWWRWWR..', '...RRRRR...']
const RING_C = { R: '#ff4a4a', W: '#fff3dc' }
const SWEAT = ['.B.', 'BBB', 'BWB', '.B.']

const HERO = { x: 450, y: 1040, size: 360 }
const GROUND = HERO.y + 170
const MIRROR = { x: 840, y: 1000 }
const HOPS = [...talkHops(LINES, SPEAK, { cps: CPS }).filter(h => h > T.l1 + 0.3), T.laugh, T.laugh + 0.35, T.h2Land, T.hopIn[0], T.hopIn[0] + 0.45]

function canState(t) {
  if (t < T.l1) return { mood: 'wide', look: [1, 0], blink: false }               // nervous practice
  if (t < T.dessert + 0.3) return { mood: 'neutral', look: [-1, 1] }               // checks the pie + flowers
  if (t < T.l2) return { mood: 'happy' }
  if (t < T.cue) return { mood: 'neutral', look: [0, 0] }
  if (t < T.l3) return { mood: 'neutral', look: [1, 0] }                           // reads the cue card
  if (t < T.ring) return { mood: 'squint', look: [0, 0] }
  if (t < T.cut1) return { mood: 'happy' }
  if (t < T.mat) return { mood: 'neutral', look: [0, -1] }
  if (t < T.h2) return { mood: 'sparkle' }
  if (t < T.door[1]) return { mood: 'neutral', look: [1, 0] }
  return { mood: 'happy' }
}
/** handshake bob (practice: frantic; later only when idle) */
const shake = t => t < T.l1 + 0.6 ? Math.sin(t * 16) : 0

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const DM = dmCard(root, { question: 'They want me to meet their *family*.', accent: '#8fdcff', top: 170 })
  const CHIP = noteChip(root, { text: '♋ CARDINAL WATER · RULED BY THE MOON|THE SIGN OF HOME IN ASTROLOGY', color: BLUE, top: 1278, at: T.chip, size: 27 })
  const CAP = el('div', { position: 'absolute', left: 0, width: '1080px', top: '170px', textAlign: 'center', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: BONE, textShadow: '0 3px 0 rgba(6,4,18,0.85)', display: 'none' }, root, 'TALK CARDS · ANSWERS STAY HIDDEN<br>UNTIL YOU BOTH PLAY')
  const H2 = popText(root, 'Show up *warm.* | That\'s enough.', { top: 200, size: 118, accentSize: 176, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Land, lateGap: 0.14, accentColor: WARM, lineHeight: 1.02 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawFloor(t) {
    const a = 1 - prog(t, T.out[0], T.out[1])
    x.save(); x.globalAlpha = a
    const pool = x.createRadialGradient(560, GROUND, 10, 560, GROUND, 560)
    pool.addColorStop(0, 'rgba(140,200,255,0.16)'); pool.addColorStop(1, 'rgba(140,200,255,0)')
    x.fillStyle = pool; x.fillRect(0, GROUND - 400, 1080, 700)
    x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(90, GROUND, 900, 5)
    x.restore()
  }

  function drawMirror(t) {
    const out = prog(t, T.cut2 - 0.05, T.cut2 + 0.05)
    if (out >= 1) return
    const c = 10, RX = 8, RY = 15, cx = MIRROR.x, cy = MIRROR.y
    x.save(); x.translate(cx, cy)
    // stand legs
    x.fillStyle = INK; x.fillRect(-6 * c, (RY - 1) * c, 3 * c, 5 * c); x.fillRect(3 * c, (RY - 1) * c, 3 * c, 5 * c)
    x.fillStyle = '#c98a1f'; x.fillRect(-5 * c, RY * c, c, 4 * c); x.fillRect(4 * c, RY * c, c, 4 * c)
    for (let j = -RY - 2; j <= RY + 2; j++) for (let i = -RX - 2; i <= RX + 2; i++) {
      const u = (i + 0.5) / RX, v = (j + 0.5) / RY, d = u * u + v * v
      const col = d <= 0.7 ? null : d <= 0.9 ? (u + v < -0.2 ? '#fff1c8' : '#f7c948') : d <= 1.05 ? '#c98a1f' : d <= 1.28 ? INK : undefined
      if (col === undefined) continue
      x.fillStyle = col || '#2a1f55'; x.fillRect(i * c, j * c, c + 0.5, c + 0.5)
    }
    // the reflection: a mini Cancer, mirrored, mid-handshake
    x.save()
    x.beginPath(); x.ellipse(0, 0, RX * Math.sqrt(0.7) * c, RY * Math.sqrt(0.7) * c, 0, 0, Math.PI * 2); x.clip()
    const gl = x.createLinearGradient(0, -RY * c, 0, RY * c); gl.addColorStop(0, '#3a2c74'); gl.addColorStop(1, '#1d1440')
    x.fillStyle = gl; x.fillRect(-RX * c, -RY * c, 2 * RX * c, 2 * RY * c)
    x.scale(-1, 1)
    const st = canState(t)
    drawStarChar(x, 20, 30, 130, t, { color: BLUE, ...st, mood: st.mood === 'squint' ? 'happy' : st.mood, look: [1, 0], seed: 3, glow: 0.4, tips: false })
    drawBits(x, HAND, { h: '#bfe8ff' }, 20 + 62, 16 + shake(t) * 8, 7)
    x.restore()
    // the cue card the reflection holds up
    const cp = pop01(t, T.cue, 0.35, 2) * (1 - prog(t, T.l3, T.l3 + 0.2))
    if (cp > 0.01) {
      x.save(); x.translate(-10, -60); x.scale(cp, cp); x.rotate(0.06)
      x.fillStyle = '#f5eedf'; x.fillRect(-110, -60, 220, 120); x.strokeStyle = INK; x.lineWidth = 6; x.strokeRect(-110, -60, 220, 120)
      x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('how did you', 0, -20); x.fillText('two meet?', 0, 18)
      x.restore()
    }
    // the practice counter
    if (t < T.l1 + 0.6) {
      const n = 11 + Math.floor(Math.max(0, t) / 0.39)
      x.save(); x.globalAlpha = 1 - prog(t, T.l1 + 0.3, T.l1 + 0.6); x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 8
      x.fillText('HANDSHAKE', 0, -(RY + 6) * c); x.fillText('PRACTICE #' + n, 0, -(RY + 6) * c + 36); x.restore()
    }
    // glass shine
    x.fillStyle = 'rgba(255,255,255,0.4)'
    for (let k = 0; k < 4; k++) x.fillRect((-5 + k) * c, (-9 + k) * c, c, c)
    x.restore()
  }

  function drawDoor(t) {
    if (t < T.cut2) return
    const a = popOut(t, T.out), pin = pop01(t, T.cut2 + 0.1, 0.45, 1.6) * a
    if (pin <= 0.01) return
    const open = ease.inOutCubic(prog(t, ...T.door))
    const cx = MIRROR.x, top = GROUND - 380 * pin, w = 200, h = 380 * pin
    x.save()
    // warm light spill through the doorway
    if (open > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, GROUND - 160, 10, cx, GROUND - 160, 460)
      g.addColorStop(0, `rgba(255,200,120,${0.45 * open})`); g.addColorStop(1, 'rgba(255,170,90,0)')
      x.fillStyle = g; x.fillRect(cx - 520, GROUND - 640, 1040, 760)
      x.fillStyle = `rgba(255,214,150,${0.3 * open})`
      x.beginPath(); x.moveTo(cx - w / 2, GROUND); x.lineTo(cx + w / 2, GROUND); x.lineTo(cx + w * 0.2, GROUND + 90); x.lineTo(cx - w * 1.6, GROUND + 90); x.closePath(); x.fill()
      x.restore()
    }
    // the frame + the warm inside
    x.fillStyle = INK; x.fillRect(cx - w / 2 - 22, top - 22, w + 44, h + 22)
    x.fillStyle = '#8a5a3a'; x.fillRect(cx - w / 2 - 14, top - 14, w + 28, h + 14)
    x.fillStyle = open > 0 ? `rgb(${Math.round(lerp(40, 255, open))},${Math.round(lerp(30, 214, open))},${Math.round(lerp(60, 150, open))})` : '#281c4a'
    x.fillRect(cx - w / 2, top, w, h)
    // the door leaf swings inward (narrows to its hinge)
    const lw = w * (1 - 0.85 * open)
    x.fillStyle = '#3f7fbf'; x.fillRect(cx - w / 2, top, lw, h)
    x.fillStyle = '#2d5f93'; x.fillRect(cx - w / 2 + lw * 0.15, top + h * 0.1, lw * 0.7, h * 0.32); x.fillRect(cx - w / 2 + lw * 0.15, top + h * 0.52, lw * 0.7, h * 0.38)
    if (lw > 40) { x.fillStyle = GOLD; x.fillRect(cx - w / 2 + lw - 30, top + h * 0.5, 14, 14) }
    // a little roof light
    x.fillStyle = WARM; x.fillRect(cx - 14, top - 60, 28, 28); x.fillStyle = INK; x.fillRect(cx - 4, top - 34, 8, 12)
    x.restore()
  }

  function drawMat(t) {
    const p = ease.outCubic(prog(t, T.mat, T.mat + 0.6)) * (1 - prog(t, T.out[0], T.out[1]))
    if (p <= 0) return
    const w = 300 * p, cx = t > T.cut2 ? MIRROR.x - 40 : HERO.x
    x.save()
    x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, GROUND - 6, w + 12, 58)
    x.fillStyle = '#c96a3a'; x.fillRect(cx - w / 2, GROUND, w, 46)
    if (p > 0.6) { x.fillStyle = '#fff3dc'; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.globalAlpha = prog(p, 0.6, 1); x.fillText('WELCOME', cx, GROUND + 24) }
    x.restore()
  }

  function drawCards(t) {
    const a = 1 - prog(t, T.close - 0.1, T.close + 0.1)
    if (t < T.cards || a <= 0) { CAP.style.display = 'none'; return }
    const p = easeOutBack(prog(t, T.cards, T.cards + 0.45), 1.5)
    CAP.style.display = 'block'; CAP.style.opacity = String(clamp(p * 2) * a)
    const f = 1 - ease.inOutCubic(prog(t, ...T.flipC))
    drawTalkCard(x, lerp(-200, 370, p), 520, 280, { rot: -0.07, flip: f, kicker: 'YOU', text: "my grandma's kitchen", foot: 'BOTH PLAYED', color: BLUE, alpha: a })
    drawTalkCard(x, lerp(1280, 710, p), 520, 280, { rot: 0.07, flip: f, kicker: 'THEM', text: "my dad's sunday soup", foot: 'BOTH PLAYED', color: BLUE, alpha: a })
    // the shared question above them, typed small
    if (f < 0.5) { x.save(); x.globalAlpha = a * prog(t, T.flipC[1] - 0.2, T.flipC[1] + 0.2); x.fillStyle = WARM; x.font = `italic 500 46px 'EB Garamond', serif`; x.textAlign = 'center'; x.fillText('what does home smell like?', 540, 760); x.restore() }
  }

  function drawStar(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const st = canState(t)
    const hop = ease.inOutCubic(prog(t, ...T.hopIn))
    const hx = lerp(HERO.x, MIRROR.x - 200, hop)
    const ringSq = t > T.ring && t < T.ring + 0.6 ? 0.18 * Math.exp(-(t - T.ring - 0.2) * 6) * Math.max(0, Math.cos((t - T.ring - 0.2) * 20)) : 0
    const r = drawStarChar(x, hx, HERO.y, HERO.size, t, { color: BLUE, glyph: CAN.glyph, ...st, hops: HOPS, squash: ringSq, seed: 9, glow: 1.15, pop: ok })
    const cell = Math.round(HERO.size / 36)
    // the practice hand on its right tip
    if (t < T.l1 + 0.8) drawBits(x, HAND, { h: '#bfe8ff' }, hx + cell * 17.8, HERO.y - cell * 3.5 + shake(t) * 16, 11 * ok)
    // sweat drop while nervous
    if (t < T.l1 + 0.4) drawBits(x, SWEAT, { B: '#8fdcff', W: '#ffffff' }, hx - cell * 9, HERO.y - cell * 12 + ((t * 1.5) % 1) * 30, 8 * ok)
    // HELLO name tag
    x.save(); x.translate(hx - cell * 5, HERO.y + cell * 6.5); x.rotate(-0.12); x.globalAlpha = ok
    x.fillStyle = INK; x.fillRect(-56, -40, 112, 80)
    x.fillStyle = '#e8414f'; x.fillRect(-50, -34, 100, 26); x.fillStyle = '#fff'; x.fillRect(-50, -8, 100, 42)
    x.fillStyle = '#fff'; x.font = `700 17px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HELLO', 0, -21)
    x.fillStyle = INK; x.font = `italic 600 26px 'EB Garamond', serif`; x.fillText('nervous', 0, 13)
    x.restore()
    // the pie at its feet (lifted on "dessert"; carried along at the end)
    const lift = t > T.dessert && t < T.dessert + 0.7 ? Math.sin(Math.PI * prog(t, T.dessert, T.dessert + 0.7)) * 60 : 0
    drawBits(x, PIE, PIE_C, hx - 230, GROUND - 32 - lift, 11 * ok)
    // steam off the pie
    x.save(); x.fillStyle = 'rgba(239,230,214,0.55)'
    for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i * 0.33) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * ok * 0.8; x.fillRect(Math.round(hx - 260 + i * 26 + Math.sin(ph * 6 + i) * 6), Math.round(GROUND - 90 - lift - ph * 70), 9, 9) }
    x.restore()
    // flowers
    const fp = pop01(t, T.flowers, 0.4, 2.4) * ok
    if (fp > 0.01) drawBits(x, FLOWERS, FLOWERS_C, hx - 330, GROUND - 60, 10 * fp)
    // the life ring drops onto it
    const rp = prog(t, T.ring - 0.3, T.ring), rOff = prog(t, T.cut1 - 0.2, T.cut1)
    if (rp > 0 && rOff < 1) {
      const ry = lerp(-200, HERO.y + 135, ease.inQuad(rp))
      drawBits(x, RING, RING_C, hx, ry, 22 * (1 - rOff) * ok)
    }
    sparkles(x, drawPixelStar, t, r.x, r.y, T.flowers + 0.2, 8, 200, 1, [GOLD, BONE, PINK])
    sparkles(x, drawPixelStar, t, r.x, r.y, T.h2Land, 12, 240, 2, [GOLD, BONE, WARM])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.8 })
      if (t < T.out[1] + 0.02) {
        drawFloor(t)
        drawMirror(t)
        drawDoor(t)
        drawMat(t)
        drawStar(t)
      }
      drawCards(t)
      DM.update(t, outK(t, T.dmOut))
      CHIP.update(t, outK(t, [T.cut1 - 0.1, T.cut1]))
      box.update(t)
      H2.update(t, outK(t, T.h2Out))
      drawGrain(gx, t)
    },
  }
}

// two card cuts (both kept): into the talk cards, and into the last line. End card flips at 25.6.
const CUTS = [{ t: T.cut1, kind: 'deal', keep: true }, { t: T.cut2, kind: 'flip', keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

export const CUES = [
  // hook: the DM buzz, nervous handshakes
  ['pop', 0.02, 739.99, 0.04, 0], ['tick', 0.1, 0.04], ['tick', 0.24, 0.035], ['tick', 0.38, 0.03],
  ...Array.from({ length: 8 }, (_, i) => ['tick', +(0.3 + i * 0.39).toFixed(2), 0.02]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.flowers, 1318.51, 0.04, -0.4], ['glitter', T.flowers + 0.2, T.flowers + 0.6], ['pluck', T.dessert, 1174.66, 0.035, 0.5, -0.4],
  ['pluck', T.chip, 1174.66, 0.04, 0.5, 0],
  ['whoosh', T.dmOut[0], 0.3, 0.03], ['pop', T.cue, 987.77, 0.04, 0.4],
  ['whoosh', T.ring - 0.3, 0.3, 0.04], ['boom', T.ring, 0.1], ['pluck', T.laugh, 1318.51, 0.035, 0.4, 0], ['pluck', T.laugh + 0.35, 1567.98, 0.035, 0.4, 0],
  // talk cards, welcome mat
  ['whoosh', T.cards, 0.4, 0.035], ['whoosh', T.flipC[0], 0.3, 0.035], ['bell', T.flipC[1], 1318.51, 0.03, 1.0, 0], ['whoosh', T.mat, 0.5, 0.03],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // last line, the door
  ...wordPops(T.h2, 3, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['tick', T.door[0], 0.04], ['whoosh', T.door[0], 0.7, 0.03], ['bell', T.door[1], 1760, 0.025, 1.4, 0.3], ['glitter', T.door[1], T.door[1] + 0.6],
  ['pop', T.hopIn[0], 880, 0.03, 0.2], ['pop', T.hopIn[0] + 0.45, 987.77, 0.03, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
