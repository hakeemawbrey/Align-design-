// trfingeroverthink: PUT A FINGER DOWN, overthinker edition (30 s vertical, Star Talk Trends §8, music: house · G)
// Story 0–25.6, then the shared end card. The format look lives in ./finger.js (identical in all five trfinger* films).
//   0.0–2.7    "Put a finger down: | *overthinker* edition."  ♍ Virgo pops in, two pixel hands rise and the ten fingers
//              fan up one by one (rising pops). The counter lands on 10. Pisces, bottom right, plays along on tiny hands.
//   2.8        the sticker "put a finger down if…" slaps on (the drop).
//   2.9–5.1    "…you’ve *re-read* | a text 40 times."  A bubble: "sounds fun!" Virgo's eyes scan left-right-left, a
//              READ counter races to 40×. Finger down.
//   5.2–7.4    "…you drafted the reply | in your *notes* first."  A notepad: hey! / hey :) / hello!! struck out… "hey!" ✓.
//   7.45–9.6   "…you decoded their | *punctuation.*"  A bubble "ok." and a pixel magnifier over the full stop. Finger.
//   9.7–13.4   "…you tried *not* to | put a finger down."  The next finger trembles, goes down, then sneaks back up while
//              Virgo whistles at the sky. THE STARS (off-screen): "we *saw* that." The finger goes down, sheepishly.
//  13.6        card cut.
//  13.75–15.5 "…you replayed a ‘hi’ | from *last Tuesday.*"  A thought bubble "hi :)" keeps re-popping (REPLAY ×9).
//  15.6–17.9  "…you’re overthinking | *this video.*"  The music drops out, a slow push-in, Virgo stares at the lens… and
//              all five remaining fingers fall at once (the hit, 17.27). Counter: 0, in pink. Virgo melts.
//  18.0–22.4  The hands drop away. THE STARS (gold) pop in for a hug: "zero fingers. *busy* brain." → "a nice text is
//              just a *nice text.*" A heart pops between them; Pisces fountains.
//  22.5–25.5  "*Breathe*, star."  Both stars take one big breath (stretch in, squash out) with a soft ring. Out by 25.5.
// One canvas (sky + props + stars + hands), DOM type + sticker + counter + box + bug, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, PINK, HOT, MONO, INTER, BEAT, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  fingerState, drawHands, buildBug, buildSticker, buildCounter, buildProgress, drawBubble, fingerCues,
} from './finger.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const VIR = signStar('virgo'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.12, h0Land: 0.62, h0Out: [2.55, 2.75],
  heroIn: 0.25, handsIn: [0.5, 0.9], fanUp: 0.95, countIn: 1.75, pisIn: 1.2,
  sticker: BEAT(4), stickerOut: [17.85, 18.05],
  p1: 2.9, p1Out: [4.95, 5.1], bub1: 3.1, scan: [3.2, 4.4],
  p2: 5.2, p2Out: [7.2, 7.35], pad: 5.35,
  p3: 7.45, p3Out: [9.45, 9.6], bub3: 7.6,
  p4: 9.7, p4Out: [13.2, 13.4], tremble: [10.0, 10.6], sneak: 11.2, sheep: BEAT(22),
  cut: 13.6,
  p5: 13.75, p5Out: [15.35, 15.5], bub5: 13.9,
  p6: BEAT(27), p6Out: [17.85, 18.05], push: [15.7, 17.2], allDown: BEAT(30),
  handsOut: [18.0, 18.4], narIn: 18.1, hug: 19.9,
  h7: 22.5, h7Land: 22.9, breathe: [22.7, 23.7, 24.7],
  countOut: [22.2, 22.5],
  out: [25.1, 25.5], h7Out: [25.15, 25.45], bugOut: [25.3, 25.55],
}
// fingers 0–4 left hand pinky → thumb, 5–9 right hand thumb → pinky. Each starts folded (−1) and fans up in the intro.
const DOWNS = [[BEAT(7)], [BEAT(11)], [BEAT(15)], [BEAT(18), T.sneak, T.sheep], [BEAT(26)], ...[0, 1, 2, 3, 4].map(k => [T.allDown + k * 0.06])]
const F = fingerState(DOWNS.map((d, i) => [-1, T.fanUp + i * 0.08, ...d]))

const SPEAK = 'THE STARS'
const LINES = [
  { t: 11.3, speaker: SPEAK, text: 'we *saw* that.' },
  { t: 18.45, speaker: SPEAK, text: 'zero fingers. *busy* brain.' },
  { t: 20.95, speaker: SPEAK, text: 'a nice text is just a *nice text.*' },
]
const CPS = 30
const BOX1 = { open: 11.1, close: 13.5 }, BOX2 = { open: 18.25, close: 24.0 }

// layout
const HERO = { x: 540, y: 960, s: 300 }, HERO_B = { x: 410, y: 960, s: 280 }, NAR = { x: 700, y: 960, s: 260 }
const HANDS = { lx: 190, rx: 890, y: 900, cell: 13 }
const PIS_AT = { x: 900, y: 1790, s: 120 }

const NAR_HOPS = [T.narIn + 0.3, ...talkHops(LINES.slice(1), SPEAK, { cps: CPS }), T.hug]
const HERO_HOPS = [T.heroIn + 0.35, T.countIn + 0.05, ...F.downs.filter(v => v < T.allDown), T.sneak + 0.05, T.hug + 0.05]

// pixel bits
const MAG = ['..OOOO...', '.OCCCCO..', 'OCWCCCCO.', 'OCCCCCCO.', 'OCCCCCCO.', '.OCCCCO..', '..OOOOHH.', '......HHH', '.......HH']
const NOTE_PAD = { w: 420, h: 300 }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 46px Inter", "800 28px Inter", "700 34px Inter", "italic 500 150px 'EB Garamond'", "700 120px 'Space Mono'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const PT = { top: 262, size: 84, accentSize: 112, gap: 0.08, fit: true }
  const H0 = popText(root, 'Put a finger down: | *overthinker* edition.', { top: 190, size: 92, accentSize: 128, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: VIR.color })
  const P1 = popText(root, '…you’ve *re-read* | a text 40 times.', { ...PT, at: T.p1, accentColor: '#7fd0ff' })
  const P2 = popText(root, '…you drafted replies | in your *notes.*', { ...PT, at: T.p2, accentColor: '#ffe27a' })
  const P3 = popText(root, '…you decoded their | *punctuation.*', { ...PT, at: T.p3, late: 1, lateAt: T.p3 + 0.3, wobble: true, accentColor: '#7dffb0' })
  const P4 = popText(root, '…you tried *not* to | put a finger down.', { ...PT, at: T.p4, accentColor: HOT })
  const P5 = popText(root, '…you replayed a ‘hi’ | from *last Tuesday.*', { ...PT, at: T.p5, accentColor: '#c9a6ff' })
  const P6 = popText(root, '…you’re overthinking | *this video.*', { ...PT, at: T.p6, late: 2, lateAt: T.p6 + 0.55, wobble: true, accentColor: HOT })
  const H7 = popText(root, '*Breathe,* star.', { top: 240, size: 120, accentSize: 170, at: T.h7, late: 1, lateAt: T.h7, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [P1, T.p1Out], [P2, T.p2Out], [P3, T.p3Out], [P4, T.p4Out], [P5, T.p5Out], [P6, T.p6Out], [H7, T.h7Out]]
  const sticker = buildSticker(root, { at: T.sticker })
  const counter = buildCounter(root, { top: 1170 })
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const bar = buildProgress(root, { end: STORY_END })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── pieces
  function pisces(t) {
    const k = pop01(t, T.pisIn, 0.35, 2) * popOut(t, T.out)
    if (k <= 0.01) return
    const tears = t > T.hug ? 3 : t > T.allDown ? 3 : t > BEAT(15) ? 2 : 1
    const mood = t > T.hug ? 'happy' : t > T.allDown ? 'wide' : 'sparkle'
    const opts = { color: PIS.color, mood, look: [-1, -1], seed: 6, glow: 0.8, pop: k, hops: [T.allDown + 0.05, T.hug] }
    drawStarChar(x, PIS_AT.x, PIS_AT.y, PIS_AT.s, t, opts)
    inSprite(x, starFrame(PIS_AT.x, PIS_AT.y, PIS_AT.s, t, opts), () => tearsCells(x, t, tears))
    // Pisces plays along on tiny hands (same fingers as Virgo) until the hug
    drawHands(x, t, F, { lx: PIS_AT.x - 92, rx: PIS_AT.x + 92, y: PIS_AT.y - 18, cell: 4, color: PIS.color, pop: k * outK(t, T.handsOut), sway: 0.4 })
  }

  function heroPose(t) {
    const mv = ease.inOutCubic(prog(t, T.handsOut[0], T.narIn + 0.3))
    return { x: lerp(HERO.x, HERO_B.x, mv), y: HERO.y, s: lerp(HERO.s, HERO_B.s, mv) }
  }
  function hug(t) { return Math.sin(Math.PI * prog(t, T.hug - 0.15, T.hug + 1.3)) }
  function breath(t) {
    const [a, b, c] = T.breathe
    if (t < a || t > c + 0.3) return 0
    if (t < b) return -0.14 * ease.inOutQuad(prog(t, a, b))            // inhale: tall
    return lerp(-0.14, 0.1, ease.inOutQuad(prog(t, b, c))) * (1 - prog(t, c, c + 0.3))   // exhale: soft squash
  }

  function hero(t) {
    const k = pop01(t, T.heroIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.01) return
    const P = heroPose(t)
    let mood = 'happy', look = [0, 0], blink, squash = 0
    if (t > T.scan[0] && t < T.scan[1]) { mood = 'wide'; look = [Math.floor(t * 7) % 2 ? 1 : -1, -1]; blink = false }
    else if (t > T.scan[1] && t < T.p2) { mood = 'squint'; look = [0, 0] }
    else if (t > T.p2 && t < T.p3) { mood = 'neutral'; look = [-0.6, -1] }
    else if (t > T.p3 && t < BEAT(15)) { mood = 'squint'; look = [0.3, -1] }
    else if (t > BEAT(15) && t < T.p4) { mood = 'wide'; look = [0, 0] }
    else if (t > T.p4 && t < T.tremble[1]) { mood = 'squint'; look = [1, 0] }
    else if (t > T.tremble[1] && t < LINES[0].t + 0.2) { mood = 'happy'; look = [1, -1] }        // whistling at the sky
    else if (t > LINES[0].t + 0.2 && t < T.sheep) { mood = 'wide'; look = [0, -1]; blink = false }
    else if (t > T.sheep && t < T.p5) { mood = t < T.sheep + 0.5 ? 'eyeroll' : 'happy' }
    else if (t > T.p5 && t < BEAT(26)) { mood = 'sparkle'; look = [-0.5, -1] }
    else if (t > T.p6 && t < T.allDown) { mood = 'wide'; look = [0, 0]; blink = false }
    else if (t > T.allDown && t < T.handsOut[0]) { mood = t < T.allDown + 0.35 ? 'wide' : 'squint'; squash = 0.2 * ease.outCubic(prog(t, T.allDown + 0.3, T.allDown + 0.6)) }
    else if (t > T.handsOut[0] && t < T.hug) { mood = 'neutral'; look = [1, 0] }
    else if (t > T.hug) { mood = t < T.hug + 1.3 ? 'heart' : 'happy'; look = undefined }
    const hk = hug(t)
    drawStarChar(x, P.x + 34 * hk, P.y, P.s, t, { color: VIR.color, glyph: VIR.glyph, mood, look, blink, hops: HERO_HOPS, pop: k, seed: 3, glow: 1.1, squash: squash + 0.1 * hk + breath(t) })
  }

  function narrator(t) {
    if (t < T.narIn) return
    const k = pop01(t, T.narIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.01) return
    const sl = ease.outCubic(prog(t, T.narIn, T.narIn + 0.45))
    const hk = hug(t)
    let mood = t > T.hug ? 'heart' : 'happy'
    if (t > T.hug + 1.3) mood = 'happy'
    drawStarChar(x, lerp(1200, NAR.x, sl) - 34 * hk, NAR.y, NAR.s, t, { color: STAR.sky, mood, look: [-1, 0], hops: NAR_HOPS, pop: k, seed: 2, glow: 1.05, squash: 0.1 * hk + breath(t - 0.08) })
    if (t > T.hug) {
      const hp = pop01(t, T.hug + 0.1, 0.35, 2.4) * popOut(t, [T.hug + 1.6, T.hug + 1.9])
      if (hp > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: HOT }, 555, 760 - 30 * prog(t, T.hug, T.hug + 1.9), 11 * hp)
      sparkles(x, t, 555, 800, T.hug + 0.1, 10, 170, 1, [HOT, BONE, GOLD])
    }
  }

  function breathRing(t) {
    const [a, , c] = T.breathe
    if (t < a || t > c + 0.4) return
    const p = prog(t, a, c + 0.4)
    x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * p) * popOut(t, T.out)
    x.strokeStyle = GOLD; x.lineWidth = 8; x.setLineDash([16, 12])
    x.beginPath(); x.arc(555, 960, 200 + 180 * ease.outCubic(p), 0, Math.PI * 2); x.stroke()
    x.restore()
  }

  // P1: "sounds fun!" + a READ counter racing up
  function prop1(t) {
    const o = [T.p1Out[0] - 0.1, T.p1Out[1]]
    drawBubble(x, t, { cx: 540, cy: 600, text: 'sounds fun!', at: T.bub1, out: o, side: 'L', size: 44 })
    const n = Math.max(1, Math.round(40 * ease.inQuad(prog(t, T.scan[0], T.scan[1]))))
    const k = pop01(t, T.bub1 + 0.15, 0.3, 2) * popOut(t, o)
    if (k > 0.01) {
      x.save(); x.translate(800, 690); x.rotate(0.08); x.scale(k, k)
      x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const s = `READ ${n}×`, w = x.measureText(s).width + 30
      x.fillStyle = INK; x.fillRect(-w / 2 - 5, -27, w + 10, 54)
      x.fillStyle = HOT; x.fillRect(-w / 2, -22, w, 44)
      x.fillStyle = BONE; x.fillText(s, 0, 2)
      x.restore()
    }
  }
  // P2: the notes-app drafts
  function prop2(t) {
    const o = [T.p2Out[0] - 0.1, T.p2Out[1]]
    const k = pop01(t, T.pad, 0.32, 2) * popOut(t, o)
    if (k <= 0.01) return
    const { w, h } = NOTE_PAD
    x.save(); x.translate(540, 650); x.rotate(-0.04); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#fff4c2'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#ffd96b'; x.fillRect(-w / 2, -h / 2, w, 44)
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('NOTES · DRAFT 7', -w / 2 + 18, -h / 2 + 23)
    const drafts = ['hey!', 'hey :)', 'hello!!', 'hey!']
    x.font = `700 40px ${INTER}`
    drafts.forEach((d, i) => {
      const at = T.pad + 0.25 + i * 0.32
      if (t < at) return
      const yy = -h / 2 + 86 + i * 54
      x.fillStyle = INK; x.fillText(d, -w / 2 + 26, yy)
      const sw = x.measureText(d).width
      if (i < 3) { const sp = prog(t, at + 0.18, at + 0.3); if (sp > 0) { x.fillStyle = HOT; x.fillRect(-w / 2 + 20, yy - 3, (sw + 12) * sp, 6) } }
      else if (t > BEAT(11)) { x.fillStyle = '#2f9e5a'; x.font = `700 40px ${INTER}`; x.fillText('✓', -w / 2 + 40 + sw, yy); x.font = `700 40px ${INTER}` }
    })
    x.restore()
  }
  // P3: "ok." under the magnifier
  function prop3(t) {
    const o = [T.p3Out[0] - 0.1, T.p3Out[1]]
    drawBubble(x, t, { cx: 500, cy: 630, text: 'ok.', at: T.bub3, out: o, side: 'L', size: 84, weight: 800 })
    const k = pop01(t, T.bub3 + 0.35, 0.35, 2.2) * popOut(t, o)
    if (k > 0.01) {
      const sw = Math.sin((t - T.bub3) * 3.2) * 10
      drawBits(x, MAG, { O: INK, C: 'rgba(160,230,255,0.55)', W: '#ffffff', H: '#8a5a2e' }, 604 + sw * 0.5, 664, 15 * k, { outline: null })
    }
  }
  // P5: the replayed "hi :)"
  function prop5(t) {
    const o = [T.p5Out[0] - 0.1, T.p5Out[1]]
    if (t < T.bub5) return
    const rep = (t - T.bub5) % 0.55, re = t - T.bub5 > 0.55 ? 0.85 + 0.15 * easeOutBack(clamp(rep / 0.25), 2.6) : pop01(t, T.bub5, 0.28, 2.3)
    drawBubble(x, t, { cx: 600, cy: 610, text: 'hi :)', at: T.bub5, side: 'T', size: 54, k: re * popOut(t, o), col: '#e7dcff' })
    const n = Math.min(9, 1 + Math.floor((t - T.bub5) / 0.55))
    const k = pop01(t, T.bub5 + 0.2, 0.3, 2) * popOut(t, o)
    if (k > 0.01) {
      x.save(); x.translate(320, 700); x.rotate(-0.06); x.scale(k, k)
      x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const lines = ['TUE · 4:12 PM', `⟲ REPLAY ×${n}`]
      lines.forEach((s, i) => { const w = x.measureText(s).width + 26; x.fillStyle = INK; x.fillRect(-w / 2 - 4, i * 52 - 24, w + 8, 48); x.fillStyle = i ? '#c9a6ff' : BONE; x.fillRect(-w / 2, i * 52 - 20, w, 40); x.fillStyle = INK; x.fillText(s, 0, i * 52 + 1) })
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 2.5))
      const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      const dS = t - T.allDown, shake = dS > 0 && dS < 0.45 ? 16 * Math.exp(-dS * 9) * Math.sin(dS * 55) : 0
      // the push-in during "…this video."
      const pi = ease.inOutQuad(prog(t, ...T.push)) * (1 - ease.inOutCubic(prog(t, T.allDown + 0.4, T.handsOut[1])))
      const Z = 1 + 0.12 * pi
      if (t < T.out[1] + 0.02) {
        pisces(t)
        prop1(t); prop2(t); prop3(t); prop5(t)
        x.save(); x.translate(0, shake); x.translate(540, 940); x.scale(Z, Z); x.translate(-540, -940)
        breathRing(t)
        hero(t)
        narrator(t)
        const hk = pop01(t, T.handsIn[0], T.handsIn[1] - T.handsIn[0], 1.8)
        const ho = ease.inCubic(prog(t, ...T.handsOut))
        drawHands(x, t, F, { ...HANDS, y: HANDS.y + (1 - clamp(hk)) * 500 + ho * 700, color: VIR.color, pop: clamp(hk, 0, 1.2), alpha: 1 - ho, shake: T.tremble })
        x.restore()
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      sticker.update(t, outK(t, T.stickerOut))
      counter.update(t, F, pop01(t, T.countIn, 0.3, 2.2) * outK(t, T.countOut), { at: T.countIn })
      box1.update(t); box2.update(t)
      bug.update(t, outK(t, T.bugOut))
      bar.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.6, between the sheepish finger and the replayed "hi")
const CUTS = [9.62, { t: T.cut, kind: 'flip' }, 17.98]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // cold open
  ...wordPops(T.h0, 4, 0.07, 0), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
  ['pop', T.heroIn + 0.05, 739.99, 0.04, 0], ['whoosh', T.handsIn[0], 0.4, 0.04], ['pop', T.countIn, 1318.51, 0.04, 0],
  ['pop', T.pisIn + 0.05, 987.77, 0.025, 0.5],
  // the sticker slap
  ['tick', T.sticker, 0.08], ['pop', T.sticker + 0.02, 659.25, 0.05, 0], ['whoosh', T.sticker - 0.12, 0.25, 0.03],
  // prompts
  ...wordPops(T.p1, 4, 0.08, 1), ['pop', T.bub1, 880, 0.04, -0.2],
  ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.scan[0] + i * 0.12).toFixed(3), 0.025]),
  ...wordPops(T.p2, 5, 0.08, 2), ['pop', T.pad, 739.99, 0.04, 0],
  ...[0, 1, 2].map(i => ['whoosh', +(T.pad + 0.25 + i * 0.32 + 0.18).toFixed(3), 0.15, 0.025]), ['pluck', BEAT(11) + 0.05, 1318.51, 0.04, 0.5, 0],
  ...wordPops(T.p3, 3, 0.08, 3), ['pop', T.p3 + 0.3, 1174.66, 0.045, 0], ['pop', T.bub3, 659.25, 0.045, -0.2], ['pluck', T.bub3 + 0.35, 1567.98, 0.03, 0.4, 0.2],
  ...wordPops(T.p4, 5, 0.08, 4),
  ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.tremble[0] + i * 0.1).toFixed(3), 0.02]),
  ['pluck', T.tremble[1] + 0.15, 1567.98, 0.025, 0.25, 0.3], ['pluck', T.tremble[1] + 0.32, 1975.53, 0.025, 0.25, 0.3],   // whistle
  ...wordPops(T.p5, 5, 0.08, 0), ...Array.from({ length: 3 }, (_, i) => ['pop', +(T.bub5 + i * 0.55).toFixed(3), 1174.66, 0.03, 0.2]),
  // "…this video.": silence, push-in, then the five fall at once
  ...wordPops(T.p6, 2, 0.08, 1), ['pop', T.p6 + 0.55, 1174.66, 0.045, 0], ['pop', T.p6 + 0.65, 1567.98, 0.04, 0],
  ['riser', T.push[0], T.allDown - 0.05, 0.03],
  ['boom', T.allDown, 0.3], ['tom', T.allDown, 92, { gain: 0.28, decay: 0.3 }], ['glitter', T.allDown + 0.05, T.allDown + 0.45],
  ['pop', T.allDown + 0.35, 392, 0.04, 0], ['pluck', T.allDown + 0.5, 293.66, 0.035, 0.6, 0],
  // the hug
  ['whoosh', T.handsOut[0], 0.4, 0.035], ['whoosh', T.narIn, 0.35, 0.035], ['pop', T.narIn + 0.3, 880, 0.04, 0.3],
  ['pluck', T.hug + 0.1, 1174.66, 0.045, 0.5, 0], ['pluck', T.hug + 0.22, 1567.98, 0.04, 0.5, 0], ['glitter', T.hug + 0.1, T.hug + 0.5],
  ...talkCues(LINES, { cps: CPS }),
  // "Breathe, star."
  ['pop', T.h7, 1174.66, 0.045, 0], ['pop', T.h7 + 0.1, 1567.98, 0.035, 0], ['riser', T.breathe[0], T.breathe[1], 0.02], ['whoosh', T.breathe[1], 0.9, 0.03],
  ['bell', T.breathe[2], 1760, 0.025, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...fingerCues(F),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
