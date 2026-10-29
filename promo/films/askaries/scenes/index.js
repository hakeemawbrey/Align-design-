// askaries (15 s vertical Align ad, Star Talk S1 extra "Ask the Stars") · story 0–10.6, then the shared end card.
//   0.00–2.50  DM: "Should I make the *first* move?" (asked anonymously, buzzing).  The ♈ star is already crouched on a
//              starting line in neon running shoes, rocking, squinting at the finish. A starter pistol floats in: POP!
//              It sprints off the right edge and laps back in from the left, skidding to a stop.
//   2.50–5.90  ♈ ARIES STAR: "yes. a simple 'want to get coffee?' counts."  Chip: ♈ cardinal fire · ruled by Mars.
//   5.90–8.75  The DM slides away; two talk cards deal in: yours, played ("want to get coffee?"), and theirs, face down,
//              "their turn…".  ARIES: "then let *them* answer. no pressure."  It steps off the line and sets down a coffee.
//   8.80–10.45 card flip · "Go *first*. | Then go easy."  Aries strolls in place, sipping, shoes still on.
// One canvas (sky + track + star + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { GOLD, BONE, INK, MONO, loadFonts, pop01, outK, popOut, popText, dmCard, noteChip, drawBits, drawTalkCard, drawBurst, sparkles, wordPops } from './kit.js'

export const DURATION = 15
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const ARI = signStar('aries'), RED = ARI.color
const SPEAK = '♈ ARIES STAR'

// ── the timeline
const T = {
  dmOut: [5.38, 5.62],
  pistol: 0.75, pop: 1.6, dash: [1.66, 1.92], back: [2.0, 2.4], skid: 2.4,
  open: 2.5, l1: 2.7, chip: 3.55, wink: [4.5, 4.9],
  cards: 5.55, card2: 5.8, l2: 5.86, step: 6.9, cup: 7.3, close: 8.75,
  h2: 8.84, h2Land: 9.12, h2Out: [10.2, 10.42], out: [10.08, 10.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "yes. a simple 'want to get coffee?' counts.", color: RED },
  { t: T.l2, speaker: SPEAK, text: 'then let *them* answer. no pressure.', color: '#ff9a7a' },
]
const CPS = 30
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

// ── pixel props
const SHOE = ['...TTT..', '..TTSTTT', 'TTTTTTTT', 'WWWWWWWW']
const SHOE_C = { T: '#3ce6cf', S: '#ffffff', W: '#f5eedf' }
const PISTOL = ['........DD', 'GGGGGGGGDD', 'GGGGGGGGG.', 'HG..GGG...', '.....GG...', '....GGG...', '....RRR...']
const PISTOL_C = { G: '#aab3c8', D: '#4a4f66', H: '#ffffff', R: '#e8414f' }
const CUP = ['.WWWWWW..', '.WCCCCW..', '.WWWWWWWW', '.WWWWWW.W', '.WWWWWWWW', '..WWWW...']
const CUP_C = { W: '#f5eedf', C: '#7a4a2a' }

const HERO = { x: 540, y: 1060, size: 380 }
const TRACK_Y = HERO.y + 178
const HOPS = [T.skid + 0.02, ...talkHops(LINES, SPEAK, { cps: CPS }).filter(h => h > T.l1 + 0.3), T.h2Land]

function ariesState(t) {
  if (t < T.pop) return { mood: 'squint', look: [1, 0], blink: false }
  if (t < T.skid + 0.15) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.wink[0]) return { mood: 'happy' }
  if (t < T.wink[1]) return { mood: 'wink' }
  if (t < T.l2) return { mood: 'happy' }
  if (t < T.cup) return { mood: 'neutral', look: [0, 0] }
  return { mood: 'happy' }
}
/** x of the star: on the line, then the sprint lap */
function heroX(t) {
  if (t < T.dash[0]) return HERO.x
  if (t < T.dash[1]) return lerp(HERO.x, 1500, ease.inCubic(prog(t, ...T.dash)))
  if (t < T.back[0]) return 1500
  return lerp(-420, HERO.x, ease.outCubic(prog(t, ...T.back)))
}

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const DM = dmCard(root, { question: 'Should I make the *first* move?', accent: RED, top: 170 })
  const CHIP = noteChip(root, { text: '♈ CARDINAL FIRE · RULED BY MARS', color: RED, top: 1306, at: T.chip })
  const CAP = el('div', { position: 'absolute', left: 0, width: '1080px', top: '170px', textAlign: 'center', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: BONE, textShadow: '0 3px 0 rgba(6,4,18,0.85)', display: 'none' }, root, 'TALK CARDS · ANSWERS STAY HIDDEN<br>UNTIL YOU BOTH PLAY')
  const H2 = popText(root, 'Go *first.* | Then go easy.', { top: 210, size: 124, accentSize: 180, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Land, lateGap: 0.12, wobble: false, accentColor: RED, lineHeight: 1.0 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawTrack(t) {
    const a = 1 - prog(t, T.out[0], T.out[1])
    x.save(); x.globalAlpha = a
    // a strip of red track with white lane lines, fading at the sides
    const g = x.createLinearGradient(0, 0, 1080, 0)
    g.addColorStop(0, 'rgba(178,58,52,0)'); g.addColorStop(0.2, 'rgba(178,58,52,0.55)'); g.addColorStop(0.8, 'rgba(178,58,52,0.55)'); g.addColorStop(1, 'rgba(178,58,52,0)')
    x.fillStyle = g; x.fillRect(0, TRACK_Y - 26, 1080, 64)
    x.fillStyle = 'rgba(245,238,223,0.55)'
    for (let i = 0; i < 18; i++) x.fillRect(i * 64 - ((t * (t > T.l2 ? 40 : 0)) % 64), TRACK_Y - 30, 36, 6)
    x.fillRect(0, TRACK_Y + 36, 1080, 6)
    // the start line (it fades once Aries steps off it)
    x.globalAlpha = a * (1 - prog(t, T.step, T.step + 0.4)) * 0.95
    for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) { x.fillStyle = (i + j) % 2 ? '#1b1236' : '#f5eedf'; x.fillRect(HERO.x + 120 + j * 12, TRACK_Y - 26 + i * 10.6, 12, 10.6) }
    x.restore()
  }

  function drawPistol(t) {
    const pin = pop01(t, T.pistol, 0.36, 2.2), gone = prog(t, T.pop + 0.55, T.pop + 0.8)
    if (pin <= 0.01 || gone >= 1) return
    const kick = t > T.pop ? Math.exp(-(t - T.pop) * 9) * 0.5 : 0
    const cx = 850 + (1 - pin) * 200, cy = 800 + Math.sin(t * 2.6) * 6
    drawBits(x, PISTOL, PISTOL_C, cx, cy, 12 * pin * (1 - gone), { rot: -0.9 - kick, flipX: true })
    drawBurst(x, cx - 40, cy - 110, 110, t, T.pop, { word: 'POP!', color: '#ffd34d', size: 60 })
    // smoke puffs
    if (t > T.pop) for (let i = 0; i < 4; i++) {
      const p = prog(t, T.pop + i * 0.06, T.pop + 0.9 + i * 0.06)
      if (p <= 0 || p >= 1) continue
      x.fillStyle = `rgba(239,230,214,${0.5 * (1 - p)})`
      const s = 14 + p * 30
      x.fillRect(Math.round(cx - 30 - i * 14 - p * 30), Math.round(cy - 80 - p * 120 - i * 10), s, s)
    }
  }

  function speedLines(t, hx) {
    const on = (t > T.dash[0] && t < T.dash[1] + 0.05) || (t > T.back[0] && t < T.back[1] + 0.1)
    if (!on) return
    x.save(); x.fillStyle = 'rgba(255,240,220,0.7)'
    for (let i = 0; i < 7; i++) {
      const yy = HERO.y - 120 + i * 40, len = 90 + (i * 53) % 120
      x.fillRect(Math.round(hx - 200 - len - (i % 3) * 30), yy, len, 6)
    }
    x.restore()
  }

  function drawCup(t, cx, cy, sc = 1) {
    const p = pop01(t, T.cup, 0.32, 2.4) * sc
    if (p <= 0.01) return
    drawBits(x, CUP, CUP_C, cx, cy, 11 * p)
    // steam
    x.save(); x.fillStyle = 'rgba(239,230,214,0.6)'
    for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i * 0.33) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * p; x.fillRect(Math.round(cx - 24 + i * 18 + Math.sin(ph * 6 + i) * 6), Math.round(cy - 40 - ph * 60), 8, 8) }
    x.restore()
  }

  function drawStar(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const st = ariesState(t)
    const hx = heroX(t)
    const crouch = t < T.pop ? 0.16 + 0.04 * Math.sin(t * 9) : 0
    const lean = t >= T.dash[0] && t < T.skid ? -0.08 : 0
    const skid = t >= T.skid && t < T.skid + 0.6 ? 0.2 * Math.exp(-(t - T.skid) * 6) * Math.cos((t - T.skid) * 22) : 0
    const stroll = t > T.h2 ? 0.04 * Math.abs(Math.sin(t * 5)) : 0
    const sq = crouch + lean + skid + stroll
    const r = drawStarChar(x, hx, HERO.y, HERO.size, t, { color: RED, glyph: ARI.glyph, ...st, hops: HOPS, squash: sq, seed: 4, glow: 1.15, pop: ok, bob: t < T.pop ? 0 : undefined })
    // shoes under the two lower tips (the squash keeps the feet planted, widening them a little)
    const cell = Math.round(HERO.size / 36), fy = HERO.y + 15.84 * cell + 6, fx = 10.35 * cell * (1 + sq)
    const step = t > T.h2 ? Math.sin(t * 10) : (t > T.dash[0] && t < T.skid) ? Math.sin(t * 40) : 0
    for (const s of [-1, 1]) {
      const lift = Math.max(0, step * s) * 18
      drawBits(x, SHOE, SHOE_C, hx + s * fx, fy - lift, 8 * ok)
    }
    speedLines(t, hx)
    sparkles(x, drawPixelStar, t, r.x, r.y, T.skid, 10, 210, 1, [GOLD, BONE, RED])
    // the coffee (set down beside it, later held up while strolling)
    if (t > T.cup) drawCup(t, hx + 250, TRACK_Y - 40, ok)
  }

  function drawCards(t) {
    const a = 1 - prog(t, T.close - 0.1, T.close + 0.1)
    if (t < T.cards || a <= 0) { CAP.style.display = 'none'; return }
    const p1 = easeOutBack(prog(t, T.cards, T.cards + 0.45), 1.6), p2 = easeOutBack(prog(t, T.card2, T.card2 + 0.45), 1.6)
    CAP.style.display = 'block'; CAP.style.opacity = String(clamp(p1 * 2) * a)
    drawTalkCard(x, lerp(-200, 370, p1), 520, 290, { rot: lerp(-0.5, -0.07, p1), kicker: 'YOUR CARD', text: 'want to get coffee?', foot: 'PLAYED ✓', color: RED, alpha: a })
    const wob = Math.sin(t * 3) * 0.02
    drawTalkCard(x, lerp(1280, 710, p2), 520, 290, { rot: lerp(0.5, 0.07, p2) + wob, flip: 1, text: 'their turn' + '...'.slice(0, 1 + Math.floor(t * 3) % 3), alpha: a })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.8 })
      drawTrack(t)
      if (t < T.out[1] + 0.02) { drawPistol(t); drawStar(t) }
      drawCards(t)
      DM.update(t, outK(t, T.dmOut))
      CHIP.update(t, outK(t, [T.close - 0.1, T.close + 0.1]))
      box.update(t)
      H2.update(t, outK(t, T.h2Out))
      drawGrain(gx, t)
    },
  }
}

// one card cut: the box shuts → "Go first. Then go easy." End card flips at 10.6.
const CUTS = [{ t: 8.8, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

export const CUES = [
  // hook: the DM buzz, the pistol, POP, the sprint lap
  ['pop', 0.02, 987.77, 0.04, 0], ['tick', 0.1, 0.04], ['tick', 0.24, 0.035], ['tick', 0.38, 0.03],
  ['whoosh', T.pistol - 0.05, 0.3, 0.03], ['pop', T.pistol + 0.2, 1318.51, 0.03, 0.4],
  ['tick', 1.0, 0.03], ['tick', 1.3, 0.03],
  ['boom', T.pop, 0.2], ['pop', T.pop, 1567.98, 0.05, 0.4],
  ['whoosh', T.dash[0], 0.3, 0.05], ['whoosh', T.back[0], 0.4, 0.05], ['tick', T.skid, 0.05], ['glitter', T.skid, T.skid + 0.4],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pluck', T.chip, 1174.66, 0.04, 0.5, 0], ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.2],
  // the talk cards
  ['whoosh', T.dmOut[0], 0.3, 0.03], ['whoosh', T.cards, 0.35, 0.035], ['pop', T.cards + 0.3, 880, 0.035, -0.3], ['whoosh', T.card2, 0.35, 0.035], ['pop', T.card2 + 0.3, 659.25, 0.035, 0.3],
  ['tick', T.step, 0.03], ['pop', T.cup, 1174.66, 0.035, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // last line
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['bell', T.h2Land + 0.3, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
