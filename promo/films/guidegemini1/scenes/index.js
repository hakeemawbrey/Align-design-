// guidegemini1 (20 s vertical Align ad, Star Talk "Your Star Guide", ♊ note 1 / 3: the blind spot) · story 0–15.6, then the end card.
//   0.00–2.80  "*Gemini,* your star has a note."  The ♊ guide, lantern lit, big and centred.
//   2.80–7.20  The guide drifts up. Below, tiny Gemini with a phone; eight chat bubbles pop up around it, one by one, buzzing.
//              YOUR STAR: "you're texting eight people. call one."  Chip: ★ ASTROLOGY SAYS · GEMINI: MUTABLE AIR, RULED BY MERCURY.
//   7.20–10.6  YOUR STAR: "depth over a full inbox."  Gemini swipes seven bubbles shut (pop, pop, pop…). The last one swells
//              into a call: CALLING… → the other star pops in beside it, sound waves between them.
//   10.6–15.6  card flip · "One *real* talk beats ten chats."  The two stars chat, one real talk, hearts.
// One canvas (sky + stars + bubbles), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { popText } from '../../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { guideSign, guideSpeaker, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK, MONO,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../../stguide.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const S = guideSign('gemini'), COL = S.color
const SPEAK = guideSpeaker(S.glyph)
const THEM = '#b7a6f2'

const T = {
  wink: [1.2, 1.6], lift: 1.25, hookOut: [2.55, 2.85], rise: [2.6, 3.4], scene: 2.9,
  open: 3.25, l1: 3.45, chats: 3.6, chatGap: 0.24, chip: 5.6,
  l2: 7.25, swipe: 8.1, swipeGap: 0.13, call: 9.15, connect: 9.85,
  close: 10.6, h2: 10.75, h2Land: 11.15, hearts: [12.2, 13.4], out: [15.0, 15.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "you're texting *eight* people. call one.", color: COL },
  { t: T.l2, speaker: SPEAK, text: 'depth over a full *inbox*.', color: '#ffe48a' },
]
const CPS = 28
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const PHONE = ['KKKKKK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KSSSSK', 'KKWKKK']
const PHONE_C = { K: '#1b1236', S: '#7fd4ff', W: '#efe6d6' }
const HEART = ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']
const HEART_C = { P: '#ff5c8e' }

const HERO = { x: 540, y: 880, size: 350 }
const UP = { x: 540, y: 580, size: 270 }
const GX = 540, GY = 1150, SM = 180
// eight bubble spots around tiny Gemini (the KEEP one is index 2, top right)
const SPOTS = [[-330, -170], [-360, 10], [330, -170], [360, 10], [-300, 180], [300, 180], [-150, -225], [150, -225]]
const DOTS = ['#ff8fb1', '#3ce6cf', '#ffd34d', '#e163d6', '#7fd4ff', '#ff9a7a', '#5ec46a', '#c9b8f0']
const KEEP = 2
const CLOSE_ORDER = [0, 1, 3, 4, 5, 6, 7]
const HOPS = talkHops(LINES, SPEAK, { cps: CPS })

function guidePos(t) {
  const p = ease.inOutCubic(prog(t, ...T.rise))
  return { x: HERO.x, y: lerp(HERO.y, UP.y, p), size: lerp(HERO.size, UP.size, p) }
}

async function build(stage) {
  await loadGuideFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const CHIP = noteChip(root, { sign: S.name, glyph: S.glyph, n: 1, of: 3, top: 96, out: T.out })
  const HOOK = guideHook(root, { text: '*Gemini,* your star | has a note.', accentColor: COL, top: 220, size: 104, out: T.hookOut })
  const H2 = popText(root, 'One *real* talk | beats ten chats.', { top: 1420, size: 112, accentSize: 160, at: T.h2, gap: 0.07, accentColor: COL, lineHeight: 1.02 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function chatBubble(cx, cy, s, dot, t, i, a) {
    if (s <= 0.01 || a <= 0) return
    const w = 170, h = 84
    const buzz = Math.sin(t * 40 + i) * 2 * (Math.sin(t * 3 + i * 1.3) > 0.7 ? 1 : 0)
    x.save(); x.globalAlpha *= a; x.translate(cx + buzz, cy); x.scale(s, s)
    x.fillStyle = '#f5eedf'; x.strokeStyle = INK; x.lineWidth = 6
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 22); x.fill(); x.stroke()
    x.fillStyle = dot; x.beginPath(); x.arc(-w / 2 + 28, 0, 15, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#7a6aa8'
    x.fillRect(-w / 2 + 54, -16, 90, 10); x.fillRect(-w / 2 + 54, 6, 64, 10)
    // unread badge
    x.fillStyle = '#e8414f'; x.beginPath(); x.arc(w / 2 - 6, -h / 2 + 4, 16, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff'; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(1 + (i * 3) % 5), w / 2 - 6, -h / 2 + 5)
    x.restore()
  }

  function drawScene(t) {
    const a = clamp(prog(t, T.scene, T.scene + 0.4)) * (1 - prog(t, T.out[0], T.out[1]))
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const g0 = x.createRadialGradient(GX, GY, 30, GX, GY, 520)
    g0.addColorStop(0, 'rgba(255,220,120,0.18)'); g0.addColorStop(1, 'rgba(255,220,120,0)')
    x.fillStyle = g0; x.fillRect(0, GY - 520, 1080, 900)
    x.restore()
    const k = pop01(t, T.scene + 0.1, 0.4, 2.2) * popOut(t, T.out)
    const nChats = Math.max(0, Math.min(8, Math.floor((t - T.chats) / T.chatGap) + 1))
    const frazzled = nChats >= 5 && t < T.swipe
    const pair = t > T.connect
    const gxNow = pair ? lerp(GX, GX - 160, ease.outCubic(prog(t, T.connect, T.connect + 0.4))) : GX
    const mood = pair ? (t > T.hearts[0] ? 'heart' : 'happy') : frazzled ? 'wide' : t > T.swipe ? 'squint' : 'neutral'
    const look = frazzled ? [Math.sin(t * 9) > 0 ? 1 : -1, -1] : pair ? [1, 0] : [0, 1]
    const talkHopsPair = pair ? [10.1, 10.6, 11.3, 11.9, 12.7, 13.3, 14.0] : []
    const r = drawStarChar(x, gxNow, GY, SM, t, { color: COL, glyph: S.glyph, mood, look, seed: 4, glow: 0.85, pop: k, hops: [T.swipe + 0.4, ...talkHopsPair] })
    // phone in its hand (lower left), glowing while chats pile up
    drawBits(x, PHONE, PHONE_C, gxNow - 95, GY + 40, 9 * k, { rot: -0.15 + (frazzled ? Math.sin(t * 30) * 0.05 : 0) })
    // the bubbles
    SPOTS.forEach(([dx, dy], i) => {
      const t0 = T.chats + i * T.chatGap
      if (t < t0) return
      let s = pop01(t, t0, 0.3, 2.6)
      let bx = GX + dx, by = GY + dy
      const ci = CLOSE_ORDER.indexOf(i)
      if (ci >= 0) {
        const tc = T.swipe + ci * T.swipeGap
        const p = prog(t, tc, tc + 0.18)
        s *= 1 - ease.inCubic(p); bx += p * (dx < 0 ? -80 : 80)
      } else if (t > T.call) {
        return     // the kept bubble becomes the call card (drawn below)
      }
      chatBubble(bx, by, s, DOTS[i], t, i, a)
    })
    CLOSE_ORDER.forEach((i, ci) => drawBurst(x, GX + SPOTS[i][0], GY + SPOTS[i][1], 46, t, T.swipe + ci * T.swipeGap, { word: '✕', color: '#ffd34d', size: 30, life: 0.35 }))
    // the call card: the kept bubble swells and slides above Gemini
    if (t > T.call && t < T.connect + 0.6) {
      const p = ease.outCubic(prog(t, T.call, T.call + 0.35)), q = 1 - prog(t, T.connect + 0.2, T.connect + 0.6)
      const cx = lerp(GX + SPOTS[KEEP][0], GX, p), cy = lerp(GY + SPOTS[KEEP][1], GY - 230, p)
      const w = lerp(170, 360, p), h = lerp(84, 110, p)
      x.save(); x.globalAlpha = a * q
      x.fillStyle = '#241653'; x.strokeStyle = COL; x.lineWidth = 6
      x.beginPath(); x.roundRect(cx - w / 2, cy - h / 2, w, h, 30); x.fill(); x.stroke()
      x.fillStyle = BONE; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('CALLING' + '...'.slice(0, 1 + Math.floor(t * 4) % 3).padEnd(3, ' '), cx, cy + 2)
      x.restore()
    }
    // the other star pops in beside it; sound waves between them
    if (pair) {
      const k2 = pop01(t, T.connect, 0.4, 2.4) * popOut(t, T.out)
      drawStarChar(x, GX + 170, GY, SM, t, { color: THEM, mood: t > T.hearts[0] ? 'heart' : 'happy', look: [-1, 0], seed: 9, glow: 0.7, pop: k2, hops: [10.4, 11.0, 11.6, 12.4, 13.0, 13.7, 14.3] })
      x.save(); x.globalAlpha = a * clamp(prog(t, T.connect + 0.2, T.connect + 0.5))
      for (let i = 0; i < 3; i++) {
        const ph = (t * 1.4 + i / 3) % 1
        x.strokeStyle = `rgba(255,228,138,${0.8 * (1 - ph)})`; x.lineWidth = 6
        x.beginPath(); x.arc(GX + 5, GY - 20, 20 + ph * 70, -0.6, 0.6); x.stroke()
        x.beginPath(); x.arc(GX + 5, GY - 20, 20 + ph * 70, Math.PI - 0.6, Math.PI + 0.6); x.stroke()
      }
      x.restore()
      T.hearts.forEach(th => {
        if (t < th || t > th + 1.8) return
        const p = pop01(t, th, 0.4, 3), q = 1 - prog(t, th + 1.3, th + 1.8)
        drawBits(x, HEART, HEART_C, GX + 5, GY - 160 - (t - th) * 50, 8 * p, { alpha: q * a })
      })
      sparkles(x, t, GX, GY - 40, T.connect, 10, 200, 2, [GOLD, BONE, COL])
    }
  }

  function drawTheGuide(t) {
    const g = guidePos(t), k = popOut(t, T.out)
    if (k <= 0) return
    const n = Math.floor((t - T.chats) / T.chatGap) + 1
    const mood = t > T.wink[0] && t < T.wink[1] ? 'wink' : t < T.rise[0] ? 'happy' : n >= 6 && t < T.l2 ? 'eyeroll' : t > T.connect ? 'sparkle' : 'neutral'
    const raise = t > T.lift ? Math.exp(-(t - T.lift) * 4) : 0
    const r = drawGuide(x, g.x, g.y, g.size, t, { color: COL, glyph: S.glyph, mood, look: t < T.rise[1] ? [0, 0] : [0, 1], hops: [T.lift, ...HOPS], seed: 2, glow: 1.1, pop: k }, { lantern: 1 + 0.25 * raise, glow: 1.2 + raise })
    sparkles(x, t, r.lx, r.ly, T.lift, 8, 90, 1, [GOLD, BONE, COL])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.75 })
      drawTheGuide(t)
      drawScene(t)
      factChip(x, t, { text: 'GEMINI: MUTABLE AIR,|RULED BY MERCURY', at: T.chip, dur: 1.9, x: 540, y: 775, color: GOLD })
      CHIP.update(t); HOOK.update(t); box.update(t)
      H2.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.close + 0.05, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

const NOTES8 = [659.25, 739.99, 880, 987.77, 1174.66, 1318.51, 1479.98, 1760]
export const CUES = [
  ...guideCues(0.02, { gain: 0.03 }), ...guideCues(T.lift, { gain: 0.024 }), ['pluck', T.wink[0], 1318.51, 0.03, 0.5, 0.2],
  ['whoosh', T.rise[0], 0.4, 0.03], ['pop', T.scene + 0.1, 880, 0.035, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...SPOTS.map((s, i) => ['pop', +(T.chats + i * T.chatGap).toFixed(3), NOTES8[i], 0.035, s[0] < 0 ? -0.4 : 0.4]),
  ...guideCues(T.chip, { gain: 0.02, notes: [1174.66, 1318.51, 1567.98] }),
  ...CLOSE_ORDER.map((i, ci) => ['tick', +(T.swipe + ci * T.swipeGap).toFixed(3), 0.04]),
  ['whoosh', T.call, 0.35, 0.03], ['pluck', T.call + 0.3, 880, 0.03, 0.4, 0], ['pluck', T.call + 0.6, 880, 0.03, 0.4, 0],
  ['pop', T.connect, 1318.51, 0.05, 0.2], ['glitter', T.connect, T.connect + 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 6, 0.07, 1, 0.024),
  ...T.hearts.map(h => ['pop', h, 1318.51, 0.035, 0]),
  ...guideCues(T.hearts[1] + 0.2, { gain: 0.018 }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
