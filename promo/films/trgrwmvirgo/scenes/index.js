// trgrwmvirgo: GET READY WITH ME, Virgo: "Checklist: *done*." (30 s vertical, Star Talk Trends §4, music: pop · F)
// Story 0–25.6, then the shared end card. The format look lives in ./grwm.js (identical in all five GRWM films).
//   0.0–6.9    "The pre-date | *checklist.*"  6:00 PM. ♍ Virgo: "preparation is a love language." On the drop, a pixel
//              DATE PREP checklist slides in and ticks: mints, phone charger, backup charger, backup for the backup.
//              "what if both chargers fail?"
//   7.0–13.7   "Conversation | *topics.*"  6:40. Page 2: "1. the moon" ✓, "2. favorite soup" ✓, "3. ???" (blinking).
//              The spiral starts. "topic three is… blank. unacceptable." → "3. the moon (again)" ✓.
//  13.9        card cut.
//  14.0–20.2   "Page three. | *Still going.*"  7:45. The list piles up and scrolls: umbrella, a fun fact, a second fun
//              fact, posture, a sincere compliment… "spontaneous laugh @ 7:50". THE STARS: "sweetie. that list has a scroll
//              bar." 7:50: Virgo, on schedule: "it's 7:50. ha. ha. ha."
//  20.2–22.3   the turn: the phone buzzes; the date's text: "just be you. that's who I said yes to :)". The spiral drops.
//  22.3–25.5   "Checklist: | *done.*"  Every item swipes away; one is left: "be me", and it gets the biggest tick.
// One canvas (room + props + stars), DOM type + dialogue box + bug + clock, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, INTER, MONO, FONTS, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  buildBug, buildClock, drawRoom, drawTable, drawNotif, drawSpiral, WIN,
} from './grwm.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const VIR = signStar('virgo'), PIS = signStar('pisces')
const ACC = '#ff9cc4'

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35, clock: 0.5,
  h0: 0.15, h0Land: 0.75, h0Out: [6.7, 6.9],
  virIn: 0.3, panelIn: [2.82, 3.2],
  h1: 7.0, h1Out: [13.45, 13.65], spiral: 8.9,
  cut: 13.9,
  h2: 14.0, h2Out: [20.05, 20.25], starsIn: 14.3, starsOut: [20.0, 20.3], haha: 17.75,
  buzz: [20.25, 20.55], notif: 20.6, notifOut: [22.3, 22.6], stop: 20.7, heart: 21.45,
  wipe: [21.9, 22.3], beMe: 22.35, h3: 22.45, h3Land: 23.05, tick: 23.05,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
// the checklist: pages shown in windows; items pop in at `at` and tick at `chk`
const PAGES = [
  { from: T.panelIn[0], to: T.h1 - 0.05, n: '1/3' },
  { from: T.h1, to: T.cut, n: '2/3' },
  { from: T.h2, to: T.wipe[1], n: '3/3' },
  { from: T.beMe - 0.05, to: 99, n: '1/1' },
]
const ITEMS = [
  { p: 0, at: 3.1, chk: 3.35, text: 'mints' },
  { p: 0, at: 3.6, chk: 3.85, text: 'phone charger' },
  { p: 0, at: 4.1, chk: 4.35, text: 'backup charger' },
  { p: 0, at: 4.6, chk: 4.85, text: 'backup for the backup' },
  { p: 1, at: 7.2, text: '3 conversation topics:', head: true },
  { p: 1, at: 7.5, chk: 7.8, text: '1. the moon' },
  { p: 1, at: 8.1, chk: 8.4, text: '2. favorite soup' },
  { p: 1, at: 8.7, text: '3. ???', blink: [8.7, 11.7] },
  { p: 1, at: 11.7, chk: 12.0, text: '3. the moon (again)', replace: 7 },
  { p: 2, at: 14.0, chk: 14.0, text: 'umbrella' },
  { p: 2, at: 14.0, chk: 14.0, text: 'a fun fact' },
  { p: 2, at: 14.0, chk: 14.0, text: 'a second fun fact' },
  { p: 2, at: 14.45, chk: 14.7, text: 'lip balm' },
  { p: 2, at: 15.0, chk: 15.25, text: 'posture' },
  { p: 2, at: 15.55, chk: 15.8, text: 'compliment (sincere)' },
  { p: 2, at: 16.1, chk: 16.35, text: 'a story under 2 min' },
  { p: 2, at: 16.65, chk: 16.9, text: 'laugh @ 7:50 (casual)' },
  { p: 2, at: 17.2, chk: 19.2, text: 'relax (by 7:55)' },
  { p: 3, at: T.beMe, chk: T.tick, text: 'be me', big: true },
]
const VSP = `${VIR.glyph}︎ VIRGO`, SPEAK = 'THE STARS'
const LINES = [
  { t: 0.9, speaker: VSP, color: ACC, text: 'preparation is a love *language.*' },
  { t: 5.05, speaker: VSP, color: ACC, text: 'what if *both* chargers fail?' },
  { t: 9.35, speaker: VSP, color: ACC, text: 'topic three is… blank. *unacceptable.*' },
  { t: 14.6, speaker: SPEAK, text: 'sweetie. that list has a *scroll bar.*' },
  { t: 17.85, speaker: VSP, color: ACC, text: "it's 7:50. *ha. ha. ha.*" },
]
const CPS = 30
const BOX1 = { open: 0.75, close: 12.95 }, BOX2 = { open: 14.45, close: 20.9 }
const CLOCK = [[0, '6:00'], [T.h1, '6:40'], [T.h2, '7:45'], [T.haha - 0.15, '7:50'], [T.notif, '7:52']]

// layout
const VIR_P = { x: 300, y: 980, s: 260 }
const PANEL = { x: 540, y: 520, w: 500, h: 660 }
const STARS_P = { x: 115, y: 1130, s: 118 }
const PIS_P = { x: WIN.x + 120, y: WIN.y + 170, s: 120 }
const ROW = 64

const VIR_HOPS = [T.virIn + 0.3, ...talkHops(LINES, VSP, { cps: CPS }), ...ITEMS.filter(i => i.chk && i.chk > i.at).map(i => i.chk), T.haha + 0.75, T.haha + 1.05, T.haha + 1.35, T.heart, T.tick]
const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, SPEAK, { cps: CPS })]

const CHECK = ['.......G', '......GG', 'G....GG.', 'GG..GG..', '.GGGG...', '..GG....']

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }

  const root = el('div', { position: 'absolute', inset: 0, overflow: 'hidden', background: '#140c2c' }, stage)
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'The pre-date | *checklist.*', { top: 172, size: 104, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: ACC })
  const H1 = popText(root, 'Conversation | *topics.*', { top: 178, size: 104, accentSize: 150, at: T.h1, gap: 0.1, accentColor: GOLD })
  const H2 = popText(root, 'Page three. | *Still going.*', { top: 178, size: 104, accentSize: 142, at: T.h2, gap: 0.1, accentColor: '#9fe6b0' })
  const H3 = popText(root, 'Checklist: | *done.*', { top: 172, size: 112, accentSize: 170, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: ACC })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 3), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(3), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const clock = buildClock(root, { at: T.clock, keys: CLOCK, date: '8:00' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function pisces(t) {
    let tears = 1, mood = 'sparkle'
    if (t > T.h1) tears = 2
    if (t > T.haha) { tears = 2; mood = 'wide' }
    if (t > T.notif) { tears = 3; mood = 'happy' }
    const P = { ...PIS_P, x: PIS_P.x + 6 * Math.sin(t * 0.9) }
    const opts = { color: PIS.color, mood, look: mood === 'happy' ? undefined : [1, 1], seed: 6, glow: 0.8, pop: pop01(t, 1.2, 0.4, 2), hops: [T.heart + 0.1, T.tick + 0.1] }
    drawStarChar(x, P.x, P.y, P.s, t, opts)
    inSprite(x, starFrame(P.x, P.y, P.s, t, opts), () => tearsCells(x, t, tears))
  }

  function virgo(t) {
    const k = pop01(t, T.virIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.02) return
    let mood = 'happy', look
    if (t > T.panelIn[0]) { mood = 'sparkle'; look = [1, -0.3] }
    if (t > LINES[1].t) { mood = 'wide'; look = [0, 0] }
    if (t > T.h1) { mood = 'sparkle'; look = [1, -0.3] }
    if (t > 8.7) { mood = 'wide'; look = [1, -0.3] }
    if (t > LINES[2].t + 0.6) { mood = 'squint'; look = [0, 0] }
    if (t > 11.7) { mood = 'happy'; look = undefined }
    if (t > T.h2) { mood = 'neutral'; look = [1, -0.3] }
    if (t > LINES[3].t + 0.5) { mood = 'wide'; look = [-1, 0.5] }
    if (t > T.haha) { mood = 'happy'; look = undefined }
    if (t > T.haha + 1.8) { mood = 'neutral'; look = [1, -0.3] }
    if (t > T.notif) { mood = 'wide'; look = [1, -1] }
    if (t > T.heart) { mood = 'heart'; look = undefined }
    if (t > T.tick) mood = 'sparkle'
    drawStarChar(x, VIR_P.x, VIR_P.y, VIR_P.s, t, { color: VIR.color, glyph: VIR.glyph, mood, look, hops: VIR_HOPS, pop: k, seed: 9, glow: 1.15 })
  }

  /** the pixel checklist panel */
  function panel(t) {
    const pin = easeOutBack(prog(t, ...T.panelIn), 1.4), po = popOut(t, T.out)
    if (pin <= 0.01 || po <= 0.01) return
    const { x: px, y: py, w, h } = PANEL
    x.save(); x.translate(px + w / 2, py + h / 2); x.scale(pin * po, pin * po); x.rotate(0.015 * Math.sin(t * 1.3)); x.translate(-px - w / 2, -py - h / 2)
    x.fillStyle = INK; x.fillRect(px - 8, py, w + 16, h); x.fillRect(px, py - 8, w, h + 16)
    x.fillStyle = GOLD; x.fillRect(px, py, w, h)
    x.fillStyle = '#fbf3df'; x.fillRect(px + 8, py + 8, w - 16, h - 16)
    // header
    x.fillStyle = '#2a1f55'; x.fillRect(px + 8, py + 8, w - 16, 70)
    const page = PAGES.filter(p => t >= p.from && t < p.to).pop() || PAGES[0]
    x.font = `700 30px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('DATE PREP', px + 30, py + 44)
    x.textAlign = 'right'; x.fillStyle = ACC; x.fillText(page.n, px + w - 30, py + 44)
    // ruled lines
    x.fillStyle = 'rgba(120,150,210,0.35)'
    for (let yy = py + 78 + ROW; yy < py + h - 10; yy += ROW) x.fillRect(px + 20, yy, w - 40, 3)
    // items of the current page(s), clipped, scrolling when the list gets long
    x.save(); x.beginPath(); x.rect(px + 8, py + 80, w - 16, h - 88); x.clip()
    PAGES.forEach((pg, pi) => {
      if (t < pg.from || t >= pg.to + 0.3) return
      const wipe = pi === 2 ? ease.inCubic(prog(t, ...T.wipe)) : ease.inCubic(prog(t, pg.to, pg.to + 0.3))
      const its = ITEMS.filter(i => i.p === pi && t >= i.at && !(ITEMS.some(r => r.replace !== undefined && ITEMS[r.replace] === i && t >= r.at)))
      const rows = its.length, visible = Math.floor((h - 100) / ROW)
      let scroll = Math.max(0, rows - visible) * ROW
      if (rows > visible) { const last = its[its.length - 1]; scroll -= ROW * (1 - ease.outCubic(prog(t, last.at, last.at + 0.25))) }
      its.forEach((it, n) => {
        const k = pop01(t, it.at, 0.25, 2.2)
        const yy = py + 80 + ROW * n + ROW / 2 + 6 - scroll + (it.replace !== undefined ? 0 : 0)
        const dx = wipe * (n % 2 ? 700 : -700) * (1 + n * 0.1)
        if (it.blink && t < it.blink[1] && Math.floor(t * 3) % 2) return
        x.save(); x.translate(px + 30 + dx, yy); x.scale(k, k)
        const big = it.big ? 1.5 : 1
        if (!it.head) {
          const B = 34 * big
          x.fillStyle = INK; x.fillRect(0, -B / 2, B, B); x.fillStyle = '#fff'; x.fillRect(4, -B / 2 + 4, B - 8, B - 8)
          if (it.chk !== undefined && t >= it.chk) drawBits(x, CHECK, { G: '#3fae6a' }, B / 2 + 2, -2, (B * 1.05 / 8) * easeOutBack(prog(t, it.chk, it.chk + 0.25), 2.6))
        }
        x.font = `${it.head ? 800 : 700} ${it.big ? 54 : 32}px ${INTER}`; x.fillStyle = it.head ? '#6a4ab0' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'
        x.fillText(it.text, it.head ? 0 : 54 * big, 2)
        // strike-through when ticked
        if (!it.head && it.chk !== undefined && t >= it.chk && !it.big) { const tw = x.measureText(it.text).width * clamp((t - it.chk) / 0.2); x.fillStyle = 'rgba(200,60,110,0.75)'; x.fillRect(54, 0, tw, 4) }
        x.restore()
      })
    })
    x.restore()
    // the scroll bar on page 3
    const pg3 = t >= T.h2 && t < T.wipe[1] ? 1 - prog(t, ...T.wipe) : 0
    if (pg3 > 0) { x.globalAlpha = pg3; x.fillStyle = '#c9bde6'; x.fillRect(px + w - 26, py + 90, 12, h - 110); x.fillStyle = '#6a4ab0'; x.fillRect(px + w - 26, py + 90 + (h - 230) * clamp((t - T.h2) / 4), 12, 120); x.globalAlpha = 1 }
    x.restore()
  }

  function theStars(t) {
    const k = pop01(t, T.starsIn, 0.36, 2.1) * outK(t, T.starsOut)
    if (k <= 0.02) return
    const mood = t > T.haha + 0.6 ? 'eyeroll' : 'neutral'
    drawStarChar(x, STARS_P.x, STARS_P.y + (1 - k) * 80, STARS_P.s, t, { color: STAR.sky, mood, look: mood === 'eyeroll' ? undefined : [1, -0.4], hops: STARS_HOPS, pop: k, seed: 2, glow: 1 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      x.clearRect(0, 0, 1080, 1920)
      drawRoom(x, t, { ring: 1, inWindow: (_, tt) => pisces(tt) })
      virgo(t)
      drawTable(x, t, { phone: { cx: 640, buzz: T.buzz } })
      panel(t)
      theStars(t)
      drawSpiral(x, t, VIR_P.x, VIR_P.y - 50, { from: T.spiral, stop: T.cut - 0.8, R: 210, tokens: ['3?', '…', '!', 'topic?', '?', '3?', '!!', '…'] })
      drawSpiral(x, t, VIR_P.x, VIR_P.y - 50, { from: T.h2 + 0.3, stop: T.stop, R: 220, tokens: ['+1', '!', '…', '+1', '?', '+1', '!!', '…'], ramp: 3 })
      // "ha. ha. ha." on schedule
      for (let i = 0; i < 3; i++) {
        const a = T.haha + 0.75 + i * 0.3, k = pop01(t, a, 0.2, 2.4) * outK(t, [T.haha + 2.2, T.haha + 2.5])
        if (t > a && k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.font = `800 ${Math.round(46 * k)}px ${INTER}`; x.textAlign = 'center'; x.lineWidth = 8; x.strokeStyle = INK; x.strokeText('ha.', VIR_P.x - 90 + i * 90, 760 - i * 22); x.fillStyle = BONE; x.fillText('ha.', VIR_P.x - 90 + i * 90, 760 - i * 22); x.restore() }
      }
      drawNotif(x, t, { at: T.notif, out: T.notifOut, text: 'just be you. that’s who I said yes to :)', cy: 430 })
      sparkles(x, t, PANEL.x + 90, PANEL.y + 130, T.tick, 12, 160, 1, [GOLD, ACC, BONE])
      if (t > T.heart && t < T.heart + 0.8) sparkles(x, t, VIR_P.x, VIR_P.y - 40, T.heart, 10, 190, 3, ['#ff4f86', BONE, GOLD])
      box1.update(t); box2.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut)); clock.update(t, outK(t, T.bugOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.9, between page two and page three)
const CUTS = [6.95, { t: T.cut, kind: 'flip' }, 20.22]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const buzz = t0 => [...Array.from({ length: 7 }, (_, i) => ['tick', +(t0 + i * 0.045).toFixed(3), 0.05]), ['tom', t0, 70, { gain: 0.12, decay: 0.2 }]]
export const CUES = [
  ...wordPops(T.h0, 2, 0.08, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.virIn + 0.05, 880, 0.04, 0],
  ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.clock + 0.05, 0.04],
  ['whoosh', T.panelIn[0], 0.4, 0.045], ['pluck', T.panelIn[1], 1174.66, 0.035, 0.4, 0.3],
  ...ITEMS.filter(i => i.at > 3 && !(i.p === 2 && i.at === 14.0)).map((i, n) => ['pop', i.at, NOTE[n % 7], 0.025, 0.3]),
  ...ITEMS.filter(i => i.chk && i.chk > i.at).flatMap((i, n) => [['tick', i.chk, 0.05], ['pop', i.chk + 0.03, NOTE[(n + 3) % 7] * 2, 0.03, 0.3]]),
  ['tick', T.h1, 0.06], ...wordPops(T.h1, 2, 0.1, 2, 0.024), ['riser', T.spiral, T.cut - 0.3, 0.02],
  ...talkCues(LINES, { cps: CPS }),
  ['tick', T.h2, 0.06], ...wordPops(T.h2, 4, 0.1, 1, 0.024), ['pop', T.starsIn + 0.05, 739.99, 0.04, -0.4],
  ['tick', T.haha - 0.15, 0.06], ...[0, 1, 2].map(i => ['pop', T.haha + 0.75 + i * 0.3, 880 + i * 110, 0.04, 0]),
  ...buzz(T.buzz[0]), ...buzz(T.buzz[1]), ['pop', T.notif + 0.05, 1174.66, 0.05, 0], ['bell', T.notif + 0.15, 1760, 0.03, 1.0, 0],
  ['whoosh', T.stop + 0.1, 0.5, 0.03], ['pluck', T.heart, 1174.66, 0.045, 0.5, -0.2], ['pluck', T.heart + 0.12, 1567.98, 0.04, 0.5, 0.2],
  ['whoosh', T.wipe[0], 0.4, 0.045], ['pop', T.beMe, 1318.51, 0.04, 0.3],
  ...wordPops(T.h3, 1, 0.08, 0, 0.024), ['pop', T.h3Land, 1174.66, 0.045, 0],
  ['tom', T.tick, 120, { gain: 0.18, decay: 0.25 }], ['bell', T.tick + 0.03, 1760, 0.045, 1.4, 0.3], ['glitter', T.tick, T.tick + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
