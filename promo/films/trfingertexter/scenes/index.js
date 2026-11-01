// trfingertexter: PUT A FINGER DOWN, texter edition (30 s vertical, Star Talk Trends §8, music: house · B)
// Story 0–25.6, then the shared end card. The format look lives in ./finger.js (identical in all five trfinger* films).
//   0.0–2.7    "Put a finger down: | *texter* edition."  ♊ Gemini pops in, the ten fingers fan up. Counter: 10.
//              Pisces plays along on tiny hands, bottom right.
//   2.8        the sticker "put a finger down if…" slaps on (the drop).
//   2.9–5.1    "…you’ve sent a | *triple* text."  Three bubbles stack up: "hey" · "also" · "ALSO". Finger.
//   5.2–7.4    "…you typed, deleted, | typed, *deleted.*"  A text field types "hey so I was thinking" and backspaces it,
//              twice, while the typing dots blink on and off. Finger.
//   7.45–9.6   "…your voice note was | longer than a *song.*"  A voice-note bar crawls: ▶ 0:12 … 7:42. Finger.
//   9.7–13.4   "…they called, and you | *texted* back ‘what’s up?’"  A ringing phone; Gemini hits decline, then texts.
//              Finger. THE STARS (off-screen): "it’s a *phone call.* not a monster."
//  13.6        card cut.
//  13.75–15.5 "…you texted someone | in the *same room.*"  "u in the kitchen?" → "I can see you". Finger.
//  15.6–18.0  "…you’ve *called* someone | just to talk."  The music drops out. A finger trembles… goes down… and pops
//              right back up: honest. The counter holds at 5 (the hit, 17.27).
//  18.0–22.4  THE STARS: "five left? *perfect.*" → "use one to *call* them." Gemini taps a phone with one finger:
//              "calling ♉…", then a ♉ Taurus star picks up, heart-eyed. Pisces fountains.
//  22.5–25.5  "Just *call* them."  The call timer ticks; both stars glow. Out by 25.5.
// One canvas (sky + props + stars + hands), DOM type + sticker + counter + box + bug, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, PINK, HOT, MINT, MONO, INTER, BEAT, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  fingerState, drawHands, buildBug, buildSticker, buildCounter, buildProgress, drawBubble, fingerCues,
} from './finger.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GEM = signStar('gemini'), TAU = signStar('taurus'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.12, h0Land: 0.62, h0Out: [2.55, 2.75],
  heroIn: 0.25, handsIn: [0.5, 0.9], fanUp: 0.95, countIn: 1.75, pisIn: 1.2,
  sticker: BEAT(4), stickerOut: [17.85, 18.05],
  p1: 2.9, p1Out: [4.95, 5.1], tri: [3.15, 3.5, 3.85],
  p2: 5.2, p2Out: [7.2, 7.35], field: 5.35,
  p3: 7.45, p3Out: [9.45, 9.6], vn: [7.6, 8.9],
  p4: 9.7, p4Out: [13.2, 13.4], ring: [9.85, 10.45], decline: 10.45, whatsup: 10.8,
  cut: 13.6,
  p5: 13.75, p5Out: [15.35, 15.5], kit: [13.95, 14.55],
  p6: BEAT(27), p6Out: [17.85, 18.05], tremble: [16.3, 16.75], fold: 16.8, honest: BEAT(30),
  phone: [20.9, 21.3], tap: 21.75, pick: 22.45,
  h7: 22.6, h7Land: 22.95,
  countOut: [21.3, 21.6],
  out: [25.1, 25.5], h7Out: [25.15, 25.45], bugOut: [25.3, 25.55],
}
// fingers 0–4 left hand pinky → thumb, 5–9 right hand thumb → pinky. Each starts folded (−1) and fans up in the intro.
const DOWNS = [[BEAT(7)], [BEAT(11)], [BEAT(15)], [BEAT(18)], [BEAT(26)], [T.fold, T.honest], [], [], [], []]
const F = fingerState(DOWNS.map((d, i) => [-1, T.fanUp + i * 0.08, ...d]))

const SPEAK = 'THE STARS'
const LINES = [
  { t: 11.3, speaker: SPEAK, text: 'it’s a *phone call.* not a monster.' },
  { t: 18.3, speaker: SPEAK, text: 'five left? *perfect.*' },
  { t: 20.5, speaker: SPEAK, text: 'use one to *call* them.' },
]
const CPS = 30
const BOX1 = { open: 11.1, close: 13.5 }, BOX2 = { open: 18.1, close: 22.95 }

// layout
const HERO = { x: 540, y: 960, s: 300 }
const HANDS = { lx: 190, rx: 890, y: 900, cell: 13 }
const PIS_AT = { x: 890, y: 1780, s: 140 }
const PHONE = { cx: 540, cy: 620, w: 300, h: 330 }

const HERO_HOPS = [T.heroIn + 0.35, T.countIn + 0.05, ...F.downs.filter(v => v < T.fold), T.decline, T.honest + 0.02, T.tap, T.pick + 0.05, T.pick + 0.6]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 46px Inter", "800 28px Inter", "700 34px Inter", "italic 500 150px 'EB Garamond'", "700 120px 'Space Mono'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const PT = { top: 262, size: 84, accentSize: 112, gap: 0.08, fit: true }
  const H0 = popText(root, 'Put a finger down: | *texter* edition.', { top: 190, size: 92, accentSize: 128, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GEM.color })
  const P1 = popText(root, '…you’ve sent a | *triple* text.', { ...PT, at: T.p1, late: 2, lateAt: T.p1 + 0.3, wobble: true, accentColor: GEM.color })
  const P2 = popText(root, '…you typed, deleted, | typed, *deleted.*', { ...PT, at: T.p2, accentColor: HOT })
  const P3 = popText(root, '…your voice note was | longer than a *song.*', { ...PT, at: T.p3, accentColor: '#c9a6ff' })
  const P4 = popText(root, '…they called, and you | *texted* back ‘what’s up?’', { ...PT, at: T.p4, accentColor: '#7fd0ff' })
  const P5 = popText(root, '…you texted someone | in the *same room.*', { ...PT, at: T.p5, accentColor: MINT })
  const P6 = popText(root, '…you’ve *called* someone | just to talk.', { ...PT, at: T.p6, accentColor: GOLD })
  const H7 = popText(root, 'Just *call* them.', { top: 240, size: 120, accentSize: 170, at: T.h7, late: 2, lateAt: T.h7Land, wobble: true, accentColor: GOLD })
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
    const tears = t > T.pick ? 3 : t > T.honest ? 2 : 1
    const mood = t > T.pick ? 'happy' : t > T.p6 && t < T.honest ? 'wide' : 'sparkle'
    const opts = { color: PIS.color, mood, look: [-1, -1], seed: 6, glow: 0.8, pop: k, hops: [T.honest + 0.05, T.pick + 0.1] }
    drawStarChar(x, PIS_AT.x, PIS_AT.y, PIS_AT.s, t, opts)
    inSprite(x, starFrame(PIS_AT.x, PIS_AT.y, PIS_AT.s, t, opts), () => tearsCells(x, t, tears))
    drawHands(x, t, F, { lx: PIS_AT.x - 118, rx: PIS_AT.x + 118, y: PIS_AT.y - 22, cell: 6, color: PIS.color, pop: k * outK(t, [T.phone[0], T.phone[1]]), sway: 0.4 })
  }

  function hero(t) {
    const k = pop01(t, T.heroIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.01) return
    let mood = 'happy', look = [0, 0], blink, squash = 0
    if (t > T.tri[0] && t < T.p2) { mood = 'sparkle'; look = [1, -1] }
    else if (t > T.p2 && t < BEAT(11)) { mood = 'squint'; look = [0, -1] }
    else if (t > BEAT(11) && t < T.p3) { mood = 'eyeroll' }
    else if (t > T.p3 && t < T.p4) { mood = 'happy'; look = undefined }
    else if (t > T.ring[0] && t < T.decline) { mood = 'wide'; look = [0, -1]; blink = false; squash = -0.06 }
    else if (t > T.decline && t < LINES[0].t) { mood = 'squint'; look = [1, 0] }
    else if (t > LINES[0].t && t < T.p5) { mood = 'wide'; look = [1, -1] }
    else if (t > T.p5 && t < T.p6) { mood = 'happy'; look = [0, -1] }
    else if (t > T.p6 && t < T.fold) { mood = 'squint'; look = [0, 0] }
    else if (t > T.fold && t < T.honest) { mood = 'wide'; look = [1, 0]; blink = false }
    else if (t > T.honest && t < T.phone[0]) { mood = 'neutral'; look = [0, 0] }
    else if (t > T.phone[0] && t < T.pick) { mood = 'wide'; look = [0, -1] }
    else if (t > T.pick) { mood = 'heart'; look = undefined }
    drawStarChar(x, HERO.x, HERO.y, HERO.s, t, { color: GEM.color, glyph: GEM.glyph, mood, look, blink, hops: HERO_HOPS, pop: k, seed: 3, glow: 1.1, squash })
  }

  // a pixel phone (ink body, stepped corners) with a screen painter
  function phoneBody(cx, cy, w, h, k, rot, screen) {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    const C = 10
    x.fillStyle = INK; x.fillRect(-w / 2 + C, -h / 2, w - 2 * C, h); x.fillRect(-w / 2, -h / 2 + C, w, h - 2 * C)
    x.fillStyle = '#3a2d74'; x.fillRect(-w / 2 + C, -h / 2 + 6, w - 2 * C, h - 12); x.fillRect(-w / 2 + 6, -h / 2 + C, w - 12, h - 2 * C)
    x.fillStyle = '#120c2a'; x.fillRect(-w / 2 + 20, -h / 2 + 22, w - 40, h - 44)
    x.save(); x.translate(0, 0); screen(w - 40, h - 44); x.restore()
    x.restore()
  }

  // P1: the triple text
  function prop1(t) {
    const o = [T.p1Out[0] - 0.1, T.p1Out[1]]
    ;['hey', 'also', 'ALSO'].forEach((s, i) => drawBubble(x, t, { cx: 640 - i * 70, cy: 510 + i * 112, text: s, at: T.tri[i], out: o, side: 'R', col: '#4f8df0', ink: INK, size: 52 + i * 12, weight: 800, rot: (i - 1) * 0.04 }))
  }
  // fix bubble text colour for blue bubbles: drawBubble paints text in ink; blue + ink reads fine.
  // P2: the typed / deleted field
  function prop2(t) {
    const o = [T.p2Out[0] - 0.1, T.p2Out[1]]
    const k = pop01(t, T.field, 0.3, 2) * popOut(t, o)
    if (k <= 0.01) return
    const full = 'hey so I was thinking', tt = t - T.field - 0.2
    const cyc = 0.9, ph = tt % cyc, n = tt < 0 ? 0 : ph < 0.55 ? Math.round(full.length * ph / 0.55) : Math.round(full.length * (1 - (ph - 0.55) / 0.3))
    const txt = full.slice(0, clamp(n, 0, full.length))
    const w = 700, h = 110
    x.save(); x.translate(540, 680); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = INK; x.font = `600 46px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText(txt, -w / 2 + 24, 2)
    if (Math.floor(t * 4) % 2) { const cw = x.measureText(txt).width; x.fillStyle = HOT; x.fillRect(-w / 2 + 26 + cw, -26, 5, 52) }
    x.restore()
    // typing dots blinking on / off above it
    if (tt > 0 && ph < 0.55) {
      x.fillStyle = '#3b3466'; x.fillRect(250, 540, 120, 60)
      for (let i = 0; i < 3; i++) { x.fillStyle = Math.floor(t * 8) % 3 === i ? BONE : '#8a83b8'; x.fillRect(272 + i * 28, 562, 16, 16) }
    }
  }
  // P3: the voice note
  function prop3(t) {
    const o = [T.p3Out[0] - 0.1, T.p3Out[1]]
    const k = pop01(t, T.vn[0], 0.3, 2) * popOut(t, o)
    if (k <= 0.01) return
    const p = ease.inQuad(prog(t, ...T.vn)), secs = Math.round(lerp(12, 462, p))
    const w = 640, h = 110
    x.save(); x.translate(540, 650); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#4f8df0'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = BONE; x.beginPath(); x.moveTo(-w / 2 + 30, -22); x.lineTo(-w / 2 + 64, 0); x.lineTo(-w / 2 + 30, 22); x.fill()
    for (let i = 0; i < 26; i++) {
      const hh = 10 + 30 * Math.abs(Math.sin(i * 1.7 + 0.3)), on = i / 26 < 0.15 + 0.85 * p
      x.fillStyle = on ? BONE : 'rgba(239,230,214,0.4)'; x.fillRect(-w / 2 + 90 + i * 16, -hh / 2, 9, hh)
    }
    x.font = `700 32px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillStyle = BONE
    x.fillText(`${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`, w / 2 - 22, 2)
    x.restore()
  }
  // P4: the ringing phone → decline → "what's up?"
  function prop4(t) {
    const o = [T.p4Out[0] - 0.1, T.p4Out[1]]
    const k = pop01(t, T.ring[0], 0.3, 2.2) * popOut(t, o)
    if (k <= 0.01) return
    const ringing = t < T.decline, rot = ringing ? 0.08 * Math.sin(t * 50) : -0.03
    phoneBody(380, 630, 240, 300, k, rot, (sw, sh) => {
      x.textAlign = 'center'; x.textBaseline = 'middle'
      if (ringing || t < T.decline + 0.25) {
        x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.fillText(ringing ? 'CALLING…' : 'DECLINED', 0, -90)
        x.font = `700 44px ${INTER}`; x.fillText(`${TAU.glyph}︎`, 0, -30)
        x.fillStyle = '#e2475e'; x.fillRect(-70, 70, 50, 40); x.fillStyle = '#2fbf6a'; x.fillRect(20, 70, 50, 40)
      } else {
        x.fillStyle = 'rgba(239,230,214,0.5)'; x.font = `700 22px ${MONO}`; x.fillText('MISSED CALL', 0, -100)
      }
    })
    drawBubble(x, t, { cx: 700, cy: 700, text: 'what’s up?', at: T.whatsup, out: o, side: 'R', col: '#4f8df0', size: 40, weight: 800 })
    if (ringing) for (let i = 0; i < 3; i++) { const a = ((t * 3 + i / 3) % 1); x.save(); x.globalAlpha = (1 - a) * 0.8 * k; x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.arc(380, 630, 160 + a * 90, -0.6, 0.6); x.stroke(); x.beginPath(); x.arc(380, 630, 160 + a * 90, Math.PI - 0.6, Math.PI + 0.6); x.stroke(); x.restore() }
  }
  // P5: same room
  function prop5(t) {
    const o = [T.p5Out[0] - 0.1, T.p5Out[1]]
    drawBubble(x, t, { cx: 660, cy: 560, text: 'u in the kitchen?', at: T.kit[0], out: o, side: 'R', col: '#4f8df0', size: 46, weight: 800 })
    drawBubble(x, t, { cx: 400, cy: 680, text: 'I can see you', at: T.kit[1], out: o, side: 'L', size: 46, weight: 800 })
  }
  // the finale: tap to call → Taurus picks up
  function finale(t) {
    if (t < T.phone[0]) return
    const k = pop01(t, T.phone[0], T.phone[1] - T.phone[0], 2.2) * popOut(t, T.out)
    if (k <= 0.01) return
    const on = t > T.pick
    phoneBody(PHONE.cx, PHONE.cy + Math.sin(t * 2) * 6, PHONE.w, PHONE.h, k, 0, (sw, sh) => {
      x.textAlign = 'center'; x.textBaseline = 'middle'
      if (!on) {
        x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.fillText(t > T.tap ? `CALLING ${TAU.glyph}︎…` : 'TAP TO CALL', 0, -110)
        x.fillStyle = '#2fbf6a'; const pk = t > T.tap ? 1 + 0.12 * Math.sin((t - T.tap) * 14) : 1
        x.fillRect(-45 * pk, 20 - 35 * pk, 90 * pk, 70 * pk)
        x.fillStyle = BONE; x.font = `700 40px ${INTER}`; x.fillText('☎︎', 0, 22)
      } else {
        const s = Math.floor(t - T.pick) + 1
        x.fillStyle = '#9fe6b0'; x.font = `700 24px ${MONO}`; x.fillText(`00:0${clamp(s, 1, 9)}`, 0, -122)
        drawStarChar(x, 0, 10, 170, t, { color: TAU.color, glyph: TAU.glyph, mood: 'heart', pop: pop01(t, T.pick, 0.35, 2.4), seed: 9, glow: 0.9, hops: [T.pick + 0.1, T.pick + 0.9] })
      }
    })
    if (on) { sparkles(x, t, PHONE.cx, PHONE.cy, T.pick, 12, 220, 1, [GOLD, BONE, PINK]); drawBubble(x, t, { cx: 800, cy: 470, text: 'hi!!', at: T.pick + 0.2, out: T.out, side: 'L', col: TAU.color, size: 44, weight: 800 }) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 2.5))
      const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        pisces(t)
        prop1(t); prop2(t); prop3(t); prop4(t); prop5(t); finale(t)
        hero(t)
        const hk = pop01(t, T.handsIn[0], T.handsIn[1] - T.handsIn[0], 1.8)
        // the tap: the right hand reaches up to the phone and back
        const tp = Math.sin(Math.PI * prog(t, T.tap - 0.3, T.tap + 0.35))
        const ho = ease.inCubic(prog(t, T.pick + 0.3, T.pick + 0.7))
        drawHands(x, t, F, { ...HANDS, rx: HANDS.rx - 200 * tp, y: HANDS.y + (1 - clamp(hk)) * 500 - 160 * tp + ho * 700, color: GEM.color, pop: clamp(hk, 0, 1.2), alpha: 1 - ho, shake: T.tremble })
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

// card-cut candidates (cardfx keeps the middle one: 13.6, between the declined call and the same-room text)
const CUTS = [9.62, { t: T.cut, kind: 'flip' }, 17.98]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const rings = (a, b) => Array.from({ length: Math.floor((b - a) / 0.1) }, (_, i) => ['pop', +(a + i * 0.1).toFixed(3), i % 2 ? 1318.51 : 1567.98, 0.02, 0])
export const CUES = [
  // cold open
  ...wordPops(T.h0, 4, 0.07, 0), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
  ['pop', T.heroIn + 0.05, 739.99, 0.04, 0], ['whoosh', T.handsIn[0], 0.4, 0.04], ['pop', T.countIn, 1318.51, 0.04, 0],
  ['pop', T.pisIn + 0.05, 987.77, 0.025, 0.5],
  ['tick', T.sticker, 0.08], ['pop', T.sticker + 0.02, 659.25, 0.05, 0], ['whoosh', T.sticker - 0.12, 0.25, 0.03],
  // prompts
  ...wordPops(T.p1, 3, 0.08, 1), ['pop', T.p1 + 0.3, 1174.66, 0.045, 0],
  ...T.tri.map((v, i) => ['pop', v, [880, 1046.5, 1318.51][i], 0.045, 0.2]),
  ...wordPops(T.p2, 5, 0.08, 2), ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.field + 0.2 + i * 0.12).toFixed(3), 0.018]),
  ...wordPops(T.p3, 5, 0.08, 3), ['riser', T.vn[0], T.vn[1], 0.02],
  ...wordPops(T.p4, 5, 0.08, 4), ...rings(T.ring[0], T.decline), ['tick', T.decline, 0.07], ['pop', T.decline + 0.02, 392, 0.04, -0.2],
  ['pop', T.whatsup, 1046.5, 0.04, 0.2],
  ...wordPops(T.p5, 5, 0.08, 0), ['pop', T.kit[0], 1046.5, 0.04, 0.2], ['pop', T.kit[1], 880, 0.04, -0.2],
  // "…called someone just to talk": silence, a tremble, down… and honestly back up
  ...wordPops(T.p6, 5, 0.08, 1),
  ...Array.from({ length: 5 }, (_, i) => ['tick', +(T.tremble[0] + i * 0.09).toFixed(3), 0.02]),
  ['crash', T.honest, { gain: 0.05, len: 1.8 }], ['pluck', T.honest + 0.1, 1567.98, 0.035, 0.5, 0.2],
  // the call
  ...talkCues(LINES, { cps: CPS }),
  ['whoosh', T.phone[0], 0.35, 0.035], ['pop', T.phone[1], 880, 0.04, 0],
  ['tick', T.tap, 0.08], ['pop', T.tap + 0.02, 1318.51, 0.045, 0.2],
  ...rings(T.tap + 0.15, T.pick - 0.05),
  ['pluck', T.pick, 1174.66, 0.045, 0.5, 0], ['pluck', T.pick + 0.12, 1567.98, 0.04, 0.5, 0], ['glitter', T.pick, T.pick + 0.5], ['pop', T.pick + 0.2, 987.77, 0.04, 0.4],
  ['whoosh', T.pick + 0.3, 0.35, 0.03],
  ['pop', T.h7, 880, 0.03, 0], ['pop', T.h7Land, 1174.66, 0.045, 0], ['pop', T.h7Land + 0.1, 1567.98, 0.04, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...fingerCues(F),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
