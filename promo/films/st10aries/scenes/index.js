// st10aries (60 s vertical, Star Talk season 10 "Little Stars", S10 E01: Aries) · story 0–55.6, then the shared end card.
// The home-video scrapbook (st10kids.js): the Star Nursery, then the Zodiac Academy yard, story time in class, the yard.
//   0.00  HOOK  frame 0: "Baby Aries skipped *crawling*." Baby Aries mid-sprint across the cloud floor, speed lines, the
//               Moon (night nurse) gasping, "AGE 10 MONTHS". It runs straight into the cloud door: BONK.
//   3.20  WANT  ☾ THE MOON: "Little ram, babies *crawl* first." · BABY ARIES: "crawling is *slow*." BONK (crib bars),
//               up the cloud slide: "I want to be *first*. At everything." Down the slide: FIRST!
//  12.00  TRY   The Academy yard, "AGE 6". Race 1: 3·2·1, Aries wins by a mile (1ST). A jump-cut montage of races 2–5,
//               rosettes piling up, the scoreboard ticking ARIES 5 · EVERYONE 0. It turns round at the finish… nobody.
//               The others are laughing together in the sandbox. A confetti popper for one: "yay… me." "Winning is *lonely*."
//  30.00  TURN  Story time in class: Saturn reads a picture book. ★ IN THE MYTH: the golden ram rescued two children,
//               Phrixus and Helle, and carried them through the sky. KID ARIES: "The ram carried *kids*?" ♄ SATURN:
//               "Aries was a *kid-saver* first."
//  42.00  WIN   The yard. Aries hits the finish first… and waits. Kid Libra is still at the start, picking shoes. Aries
//               holds up a crayon sign "GO LIBRA!", Libra picks one of each, they finish, a hug, confetti for two.
//               LIBRA: "you *waited* for me!"
//  50.60        growUp: both kids → today's adult Aries and Libra, running side by side (frame 0's sprint, together).
//  52.20  LAST  "First is fun. *Together* is better."
// Rewatch bait: the scoreboard (ARIES 5 · EVERYONE 0 → ARIES + LIBRA: 1), tiny Libra sits at the start line picking shoes
// in EVERY race, and Baby Aries' crib has tiny red boxing gloves on it (adult Aries' gloves on their hook, st9arieshome).
// Ghost: a baby ghost (cell 2) pops up out of the sandbox while Aries celebrates alone.
import { prog, ease, clamp, lerp, tw } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { buildEndcard, endcardCues, ENDCARD_LEN } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawSaturn } from '../../st5cast.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import {
  drawBabyStar, drawNursery, drawAcademy, drawCrayonFrame, growUp, growUpCues, ageCaption, ageCaptionCues, drawMoonNurse,
  drawCloudCrib, drawHomeVideo, kidSign, NURSERY, ACADEMY, KIDS_FONTS, crayonPow, crayonPowCues, speedLines, dustPuffs,
  confetti, drawStoryPage, drawRibbon,
} from '../../st10kids.js'

export const DURATION = 60
const KEY = 'Em'
const STORY_END = DURATION - ENDCARD_LEN        // 55.6
const INK = '#1b1236', BONE = '#efe6d6', RED = '#f0603a'
const AR = kidSign('aries'), LI = kidSign('libra')
const BABY = AR.tag, KID = AR.kidTag, MOON = '☾ THE MOON', SAT = '♄ SATURN', LIB = LI.kidTag

const T = {
  hookOut: 2.9, door: 2.55,
  moon: [3.2, 5.6], slow: [5.7, 7.9], crib: 6.7, want: [8.2, 11.6], slideUp: [7.9, 9.0], slideDown: [9.6, 10.4], first: 10.45,
  yard: 12.0, cd: [12.5, 12.9, 13.3], go: 13.6, win1: 15.1,
  montage: [16.2, 17.2, 18.2, 19.2], turn: 20.4, popper: 22.2, yay: [22.5, 24.8], lonely: [25.6, 29.3],
  story: 30.0, satIntro: [30.5, 32.3], chip: 32.4, chipDur: 6.0, carried: [36.4, 38.9], saver: [39.2, 41.9],
  yard2: 42.0, arrive: 42.7, look: 43.3, pick: [43.6, 46.0], sign: 44.6, both: 46.3, libRun: [46.8, 49.0], hug: 49.1,
  waited: [49.3, 50.9], grow: 50.6, last: 52.2, lastLand: 52.6, out: [55.2, 55.55],
  ghost: 23.0,
}
const CUTS_CAM = [T.moon[0], T.yard, ...T.montage, T.turn, T.story, T.yard2]
const pop01 = (t, t0, d = 0.3, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 640, y: 1322, where: 'a baby ghost (cell 2) pops up out of the sandbox while Aries celebrates alone' }

// the start / finish lines in the yard, and where everyone stands
const START = 230, FINISH = 850, LANE = 1215
const YZ = 1.3, YC = [540, 1150]                // the yard is shot closer: zoom about YC
const zx = v => YC[0] + (v - YC[0]) * YZ, zy = v => YC[1] + (v - YC[1]) * YZ
const RIVALS = [['taurus', 0.42], ['gemini', 0.36], ['cancer', 0.3], ['leo', 0.48]]

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, "800 104px Inter", "italic 500 158px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Baby Aries skipped *crawling*.', at: 0, out: T.hookOut, top: 320, accentColor: '#ffb08a' })
  const last = popText(root, 'First is fun. | *Together* is better.', { top: 330, size: 104, accentSize: 158, at: T.last, gap: 0.09, accentColor: '#ffb08a', wobble: true, late: 3, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const R = Math.round
  const rect = (xx, y, w, h, c) => { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  const txt = (s, xx, y, font, c, align = 'center') => { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }

  // ── props
  function gloves(cx, cy, k = 1) {      // tiny red boxing gloves on a string (the adult's gloves, st9arieshome)
    x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(Math.sin(cv._t * 2) * 0.08)
    rect(-2, -60, 4, 50, BONE)
    for (const s of [-1, 1]) { rect(s * 16 - 15, -12, 30, 32, INK); rect(s * 16 - 12, -9, 24, 26, RED); rect(s * 16 - 12, -9, 24, 6, '#ff9a7a'); rect(s * 16 - 12, 14, 24, 6, '#fffaf0') }
    x.restore()
  }
  function scoreboard(t, text) {
    const c = 690
    rect(c - 150, 560, 300, 150, INK); rect(c - 142, 568, 284, 134, '#1f4a3c'); rect(c - 70, 710, 14, 170, INK); rect(c + 56, 710, 14, 170, INK)
    txt('SCORE', c, 596, "700 22px 'Space Mono', monospace", '#e8f2ea')
    const lines = text.split('|')
    lines.forEach((l, i) => txt(l, c, 642 + i * 36 - (lines.length - 1) * 14, "700 28px 'Space Mono', monospace", '#ffd36e'))
  }
  function lines(xs) { for (const lx of xs) { rect(lx - 5, LANE - 10, 10, 90, '#fffaf0') } }
  function finishTape(t, broken) {
    rect(FINISH - 8, LANE - 190, 12, 270, INK); rect(FINISH - 5, LANE - 187, 6, 264, BONE)
    if (!broken) for (let i = 0; i < 6; i++) rect(FINISH - 3, LANE - 170 + i * 26, 8, 13, i % 2 ? RED : '#fffaf0')
    rect(FINISH - 30, LANE - 230, 60, 40, '#ffd36e'); txt('END', FINISH, LANE - 210, "700 20px 'Space Mono', monospace", INK)
  }
  function shoes(cx, cy, t, pick) {      // Libra's two pairs: pink and blue, one held up at a time
    const up = pick < 0.5 ? 0 : 1
    for (const [i, col] of [[0, '#ff9ec7'], [1, '#7fd8ff']]) {
      const lifted = i === up && t >= T.pick[0] - 0.4
      const sx = cx + (i ? 46 : -46), sy = cy + (lifted ? -40 - 6 * Math.sin(t * 6) : 0)
      rect(sx - 24, sy - 12, 48, 24, INK); rect(sx - 20, sy - 9, 40, 18, col); rect(sx - 20, sy - 9, 18, 6, '#fffaf0')
    }
  }
  function sign(cx, cy, k) {             // the crayon "GO LIBRA!" sign
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.rotate(Math.sin(cv._t * 7) * 0.06); x.scale(k, k)
    rect(-4, 0, 8, 120, '#a8724a'); rect(-130, -110, 260, 110, INK); rect(-124, -104, 248, 98, '#fffaf0')
    txt('GO LIBRA!', 0, -56, "800 44px Inter", '#e163d6'); rect(-100, -26, 200, 6, '#ffd36e')
    x.restore()
  }
  function ramArt(ctx, w, h, t) {        // the picture book: a crayon golden ram flying two children over the clouds
    ctx.fillStyle = '#cfe8ff'; ctx.fillRect(0, 0, w / 2 - 6, h); ctx.fillStyle = '#ffe9c8'; ctx.fillRect(w / 2 + 6, 0, w / 2, h)
    // left page: the ram in the sky
    const bob = Math.sin(t * 2.4) * 8
    for (const [cx, cy, r] of [[70, 470, 50], [140, 490, 60], [330, 500, 50], [380, 470, 40]]) { ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill() }
    ctx.save(); ctx.translate(215, 300 + bob)
    ctx.fillStyle = '#f2c75c'; ctx.strokeStyle = INK; ctx.lineWidth = 5
    ctx.beginPath(); ctx.ellipse(0, 0, 120, 62, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()           // fleece
    for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(-90 + i * 30, -40 + (i % 2) * 8, 22, 0, Math.PI * 2); ctx.fill(); ctx.stroke() }
    ctx.beginPath(); ctx.ellipse(130, -36, 38, 30, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()        // head
    ctx.strokeStyle = '#c98f2a'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(132, -48, 22, Math.PI * 0.9, Math.PI * 2.3); ctx.stroke()  // horn
    ctx.fillStyle = INK; ctx.fillRect(140, -40, 8, 8)
    ctx.strokeStyle = INK; ctx.lineWidth = 8; for (const lx of [-70, -30, 40, 80]) { ctx.beginPath(); ctx.moveTo(lx, 50); ctx.lineTo(lx + 16, 96); ctx.stroke() }
    // two kids riding: little round heads + waving arms
    for (const [kx, col] of [[-50, '#ffb08a'], [10, '#c9a6ff']]) {
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(kx, -96, 22, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke()
      ctx.fillRect(kx - 14, -78, 28, 30); ctx.strokeRect(kx - 14, -78, 28, 30)
      ctx.beginPath(); ctx.moveTo(kx + 14, -70); ctx.lineTo(kx + 34, -100 + Math.sin(t * 8 + kx) * 6); ctx.stroke()
    }
    ctx.restore()
    // sparkle trail
    ctx.fillStyle = '#f2c75c'; for (let i = 0; i < 6; i++) ctx.fillRect(40 - i * 4 + ((t * 60 + i * 30) % 40), 330 + i * 12 + bob, 10, 10)
    // right page: the words (kept short) + a heart doodle
    ctx.fillStyle = '#5a3a2a'; ctx.font = "italic 500 46px 'EB Garamond', serif"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ;['The golden ram', 'flew two children', 'through the sky.'].forEach((l, i) => ctx.fillText(l, w * 0.75, 190 + i * 64))
    ctx.strokeStyle = '#ff6f8a'; ctx.lineWidth = 6; ctx.beginPath(); const hx = w * 0.75, hy = 470
    ctx.moveTo(hx, hy + 30); ctx.bezierCurveTo(hx - 60, hy - 10, hx - 26, hy - 50, hx, hy - 16); ctx.bezierCurveTo(hx + 26, hy - 50, hx + 60, hy - 10, hx, hy + 30); ctx.stroke()
  }

  // ── where Aries is, per beat
  function nurseryAries(t) {
    // frame 0: mid-sprint at x 380, reaches the door at 2.55, bounces back dizzy, then runs to the crib, then the slide
    let xx = tw(t, [[0, 330], [T.door, 900, ease.inQuad], [T.door + 0.5, 760, ease.outCubic], [5.9, 760], [T.crib, 300, ease.inQuad], [T.crib + 0.4, 360, ease.outCubic], [T.slideUp[0], 360], [T.slideUp[1], 140, ease.inOutQuad], [T.slideDown[0], 140], [T.slideDown[1], 520, ease.inQuad], [11.9, 560]])
    let yy = tw(t, [[0, 1340], [T.slideUp[0], 1340], [T.slideUp[1], 1110], [T.slideDown[0], 1110], [T.slideDown[1], 1345], [11.9, 1345]])
    const running = (t < T.door) || (t > 5.9 && t < T.crib) || (t > T.slideUp[0] && t < T.slideUp[1])
    if (running) yy -= Math.abs(Math.sin(t * 16)) * 26
    const dizzy = (t > T.door && t < T.door + 0.6) || (t > T.crib && t < T.crib + 0.6)
    return { xx, yy, running, dizzy, dir: (t > T.door && t < 5.9) || (t > 5.9 && t < T.slideUp[1]) ? -1 : 1 }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      cv._t = t
      const said = []
      const say = o => said.push(o)
      const flush = () => { for (const o of said) speechBubble(x, t, { ...o, x: zx(o.x), y: zy(o.y) }) }
      const cam = vlogCam(t, { cuts: CUTS_CAM, punches: [{ at: T.moon[0], out: T.slow[1], zoom: 1.12, x: 640, y: 1000 }, { at: T.carried[0], out: T.carried[1], zoom: 1.15, x: 540, y: 1250 }, { at: T.pick[0], out: T.sign - 0.1, zoom: 1.25, x: START + 60, y: LANE - 60 }] })
      x.save(); cam.apply(x)
      if (t < T.yard) {
        // ── the Star Nursery
        drawNursery(x, t, { glow: 1.1 })
        const [c0, c1, c2] = NURSERY.cribs
        drawBabyStar(x, c1[0], c1[1] - 95, 150, t, { sign: 'taurus', mood: 'sleepy', pacifier: true, seed: 2 })
        drawCloudCrib(x, c1[0], c1[1], 230, t, { front: true })
        drawBabyStar(x, c2[0] - 30, c2[1] - 92, 130, t, { sign: 'gemini', mood: 'wide', seed: 3, look: [-1, 0] })
        drawBabyStar(x, c2[0] + 40, c2[1] - 92, 130, t, { sign: 'gemini', mood: 'wide', seed: 5, look: [-1, 0] })
        drawCloudCrib(x, c2[0], c2[1], 230, t, { front: true })
        drawCloudCrib(x, c0[0], c0[1], 230, t, { front: true })          // Aries' crib: empty, the gloves on it
        gloves(c0[0] + 90, c0[1] - 60)
        const a = nurseryAries(t)
        const mood = a.dizzy ? 'squint' : t > T.want[0] && t < T.want[1] ? 'sparkle' : t > T.first ? 'laugh' : t > T.slow[0] && t < T.slow[1] ? 'pout' : 'determined'
        if (a.running) speedLines(x, t, { x: a.xx, y: a.yy, dir: -a.dir, len: 200, spread: 100 })
        drawBabyStar(x, a.xx, a.yy - 15, 200, t, { sign: 'aries', mood, seed: 1, look: [a.dir, 0], flip: a.dir < 0, squash: a.running ? 0.06 * Math.sin(t * 32) : 0 })
        dustPuffs(x, t, { x: a.xx, y: a.yy + 70, at: T.door + 0.05, dir: 1 })
        dustPuffs(x, t, { x: a.xx, y: a.yy + 70, at: T.slideDown[1], dir: -1 })
        if (a.dizzy) for (let k = 0; k < 3; k++) { const an = t * 8 + k * 2.1; rect(a.xx + Math.cos(an) * 70 - 6, a.yy - 110 + Math.sin(an) * 18 - 6, 12, 12, '#ffd36e') }
        // the Moon (night nurse): gasping at frame 0, then the talk
        const moonMood = t < T.moon[0] ? 'wide' : t < T.slow[1] ? 'neutral' : t > T.first ? 'happy' : 'wide'
        drawMoonNurse(x, 820, 820, 105, t, { mood: moonMood, look: [-1, 1], hops: [T.moon[0]] })
        crayonPow(x, t, { text: 'BONK!', at: T.door, x: 900, y: 1130, color: '#ff6f8a' })
        crayonPow(x, t, { text: 'BONK!', at: T.crib, x: 260, y: 1060, color: '#ffd36e', rot: 0.1 })
        crayonPow(x, t, { text: 'FIRST!', at: T.first, dur: 1.4, x: 560, y: 1140, color: '#ffb08a', size: 84 })
        speechBubble(x, t, { text: 'Little ram, babies *crawl* first.', at: T.moon[0], out: T.moon[1], x: 780, y: 680, name: MOON, color: '#f4ead8', w: 560 })
        speechBubble(x, t, { text: 'crawling is *slow*.', at: T.slow[0], out: T.slow[1], x: clamp(a.xx, 330, 750), y: a.yy - 110, name: BABY, color: '#ffb08a', w: 520 })
        speechBubble(x, t, { text: 'I want to be *first*. At everything.', at: T.want[0], out: T.want[1], x: clamp(a.xx, 330, 750), y: a.yy - 120, name: BABY, color: '#ffb08a', w: 600 })
        ageCaption(x, t, { text: 'AGE 10 MONTHS', at: -0.4, out: T.yard - 0.3, size: 58, sub: 'HOME VIDEO · TAPE 1' })
      } else if (t < T.story) {
        // ── the yard: race 1, the montage, alone at the finish
        x.save(); x.translate(YC[0], YC[1]); x.scale(YZ, YZ); x.translate(-YC[0], -YC[1])
        drawAcademy(x, t, { room: 'yard' })
        const wins = t < T.win1 ? 0 : t < T.montage[0] ? 1 : t < T.turn ? 1 + T.montage.filter(m => t >= m + 0.5).length : 5
        scoreboard(t, `ARIES ${wins}|EVERYONE 0`)
        lines([START]); finishTape(t, t > T.win1 - 0.1)
        // tiny Libra at the start line, picking shoes, every single race
        shoes(START + 10, LANE + 40, t, Math.sin(t * 1.7))
        drawBabyStar(x, START + 10, LANE - 40, 110, t, { sign: 'libra', age: 'kid', mood: 'squint', seed: 7, look: [Math.sin(t * 1.7) > 0 ? 1 : -1, 1] })
        const alone = t >= T.turn
        // rivals: race, then (from the turn) playing together in the sandbox
        RIVALS.forEach(([s, v], i) => {
          let rx, ry = LANE - 40 - (i % 2) * 30
          if (alone) { rx = 430 + i * 85; ry = 1290 - (i % 2) * 24 }
          else if (t < T.go) rx = START + 120 + i * 70
          else if (t < T.montage[0]) rx = Math.min(FINISH - 40 - i * 60, START + 120 + i * 70 + (t - T.go) * v * 260)
          else rx = START + 300 + i * 80 + ((t * 120 * v) % 200)
          const run = !alone && t >= T.go
          drawBabyStar(x, rx, ry - (run ? Math.abs(Math.sin(t * 12 + i)) * 14 : 0), 120, t, { sign: s, age: 'kid', mood: alone ? 'laugh' : run ? 'determined' : 'neutral', seed: 10 + i, look: alone ? [0, 0] : [1, 0], backpack: i === 1 })
        })
        // Aries
        let ax, ay = LANE - 60, amood = 'determined'
        if (t < T.go) { ax = START + 60; amood = 'determined' }
        else if (t < T.win1) { ax = lerp(START + 60, FINISH + 20, ease.inQuad(prog(t, T.go, T.win1))); ay -= Math.abs(Math.sin(t * 18)) * 24 }
        else if (t < T.turn) { ax = FINISH + 20; amood = 'laugh' }
        else { ax = FINISH; amood = t < T.popper ? 'wide' : t < T.lonely[0] ? 'happy' : 'cry' }
        const runA = t >= T.go && t < T.win1
        if (runA) speedLines(x, t, { x: ax, y: ay, dir: -1, len: 260 })
        const lookA = t >= T.turn ? [-1, 0] : [1, 0]
        drawBabyStar(x, ax, ay, 150, t, { sign: 'aries', age: 'kid', mood: amood, backpack: true, backpackColor: RED, seed: 1, look: lookA, flip: t >= T.turn })
        // the rosettes piling up on Aries
        for (let i = 0; i < Math.min(wins, 5); i++) drawRibbon(x, ax - 60 + i * 30, ay + 70 + (i % 2) * 10, 50, t)
        if (t >= T.montage[0] && t < T.turn) {
          const n = T.montage.filter(m => t >= m).length
          txt(`RACE ${n + 1} · 1ST`, 540, 820, "700 40px 'Space Mono', monospace", '#ffd36e')
        }
        // countdown + GO
        T.cd.forEach((c, i) => crayonPow(x, t, { text: String(3 - i), at: c, dur: 0.38, x: 540, y: 900, size: 110, color: ['#7fd8ff', '#9be08a', '#ffd36e'][i] }))
        crayonPow(x, t, { text: 'GO!', at: T.go, dur: 0.6, x: 540, y: 900, size: 110, color: '#ff6f8a' })
        crayonPow(x, t, { text: 'FIRST!', at: T.win1, dur: 1.0, x: FINISH - 120, y: 980, size: 80, color: '#ffb08a' })
        T.montage.forEach((m, i) => crayonPow(x, t, { text: 'FIRST!', at: m + 0.45, dur: 0.5, x: 760 - i * 40, y: 980, size: 64, color: ['#ffd36e', '#9be08a', '#7fd8ff', '#c9a6ff'][i] }))
        confetti(x, t, { x: ax, y: ay - 60, at: T.popper, dur: 1.8, n: 14, spread: 160 })
        if (t >= T.popper - 0.3 && t < T.popper + 1) { rect(ax - 70, ay - 20 - 8, 40, 16, '#ff9ec7') }       // the tiny popper
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.6, from: 'below', cell: 2 })
        say({ text: '…guys?', at: T.turn + 0.3, out: T.popper - 0.1, x: ax, y: ay - 110, name: KID, color: '#ffb08a', w: 400 })
        say({ text: 'yay… me.', at: T.yay[0], out: T.yay[1], x: ax, y: ay - 110, name: KID, color: '#ffb08a', w: 400 })
        say({ text: 'Winning is *lonely*.', at: T.lonely[0], out: T.lonely[1], x: ax, y: ay - 110, name: KID, color: '#ffb08a', w: 520 })
        x.restore(); flush()
        ageCaption(x, t, { text: 'AGE 6', at: T.yard + 0.1, out: T.story - 0.4, size: 64 })
      } else if (t < T.yard2) {
        // ── story time in class
        drawAcademy(x, t, { room: 'class' })
        const open = prog(t, T.story + 0.15, T.story + 0.75)
        drawStoryPage(x, t, { x: 540, y: 700, w: 900, h: 560, open, art: ramArt })
        drawSaturn(x, 900, 1080, 210, t, { mood: t > T.saver[0] ? 'happy' : 'neutral', look: [-1, 0], pointer: true, hops: [T.satIntro[0], T.saver[0]] })
        const [d0, d1, d2] = ACADEMY.class.spots.desks
        drawBabyStar(x, d0[0], d0[1] - 40, 150, t, { sign: 'taurus', age: 'kid', mood: 'sparkle', seed: 2, look: [0, -1] })
        drawBabyStar(x, d1[0], d1[1] - 40, 160, t, { sign: 'aries', age: 'kid', mood: t > T.carried[0] ? (t > T.saver[0] ? 'sparkle' : 'wide') : 'neutral', seed: 1, look: [0, -1], backpack: true, backpackColor: RED, hops: [T.carried[0]] })
        drawBabyStar(x, d2[0] - 120, d2[1] - 40, 140, t, { sign: 'libra', age: 'kid', mood: 'happy', seed: 7, look: [-1, -1] })
        speechBubble(x, t, { text: 'Story time: *the ram.*', at: T.satIntro[0], out: T.satIntro[1], x: 880, y: 1000, name: SAT, color: '#f7dca0', w: 480 })
        speechBubble(x, t, { text: 'The ram carried *kids*?', at: T.carried[0], out: T.carried[1], x: d1[0], y: d1[1] - 130, name: KID, color: '#ffb08a', w: 560 })
        speechBubble(x, t, { text: 'Aries was a *kid-saver* first.', at: T.saver[0], out: T.saver[1], x: 880, y: 1000, name: SAT, color: '#f7dca0', side: -0.4, w: 560 })
        ageCaption(x, t, { text: 'STORY TIME', at: T.story + 0.2, out: T.yard2 - 0.4, size: 56, rot: 0.03, y: 1680 })
      } else {
        // ── the yard again: Aries waits
        x.save(); x.translate(YC[0], YC[1]); x.scale(YZ, YZ); x.translate(-YC[0], -YC[1])
        drawAcademy(x, t, { room: 'yard' })
        scoreboard(t, t >= T.hug ? 'ARIES + LIBRA|1' : 'ARIES 5|EVERYONE 0')
        lines([START]); finishTape(t, t > T.hug - 0.05)
        const grown = t >= T.grow
        // Libra: picking shoes at the start, then running (one pink, one blue)
        const pickP = prog(t, T.pick[0], T.both)
        let lx = START + 10, ly = LANE - 40
        if (t >= T.libRun[0]) { lx = lerp(START + 10, FINISH - 120, ease.inOutQuad(prog(t, T.libRun[0], T.libRun[1]))); ly -= Math.abs(Math.sin(t * 12)) * 16 }
        if (t >= T.libRun[1]) lx = FINISH - 120
        if (t < T.libRun[0]) shoes(START + 10, LANE + 40, t, pickP < 0.33 ? 0 : pickP < 0.66 ? 1 : 0)
        else { rect(lx - 40, LANE + 22, 30, 16, '#ff9ec7'); rect(lx + 10, LANE + 22, 30, 16, '#7fd8ff') }
        if (t >= T.libRun[0] && t < T.libRun[1]) speedLines(x, t, { x: lx, y: ly, dir: -1, len: 160, spread: 70 })
        // Aries: arrives first, turns, holds up the sign, cheers, hugs
        let ax = t < T.arrive ? lerp(-100, FINISH + 20, ease.inQuad(prog(t, T.yard2, T.arrive))) : FINISH + 20, ay = LANE - 60
        if (t < T.arrive) { ay -= Math.abs(Math.sin(t * 18)) * 24; speedLines(x, t, { x: ax, y: ay, dir: -1, len: 260 }) }
        if (t >= T.hug) ax = lerp(FINISH + 20, FINISH - 40, ease.outCubic(prog(t, T.hug, T.hug + 0.3)))
        const hugK = t >= T.hug ? 1 : 0
        if (!grown) {
          drawBabyStar(x, lx + hugK * 30, ly, 120, t, { sign: 'libra', age: 'kid', mood: t >= T.hug ? 'heart' : t >= T.both ? 'determined' : 'squint', seed: 7, look: [1, 0], hops: [T.both] })
          const amood = t >= T.hug ? 'happy' : t >= T.sign ? 'laugh' : t >= T.look ? 'sparkle' : 'determined'
          drawBabyStar(x, ax, ay, 150, t, { sign: 'aries', age: 'kid', mood: amood, backpack: true, backpackColor: RED, seed: 1, look: t >= T.look ? [-1, 0] : [1, 0], flip: t >= T.look, hops: t >= T.sign && t < T.hug ? [T.sign, T.sign + 0.6, T.sign + 1.2, T.both, T.libRun[0] + 0.5, T.libRun[0] + 1.1, T.libRun[0] + 1.7] : [T.hug] })
          sign(ax - 120, ay - 60, t >= T.sign && t < T.hug ? pop01(t, T.sign) : 0)
          if (t >= T.hug && t < T.grow) { const hk = pop01(t, T.hug, 0.3, 2.5); for (let k = 0; k < 3; k++) { const hy = ay - 140 - ((t - T.hug) * 60 + k * 30) % 90; x.globalAlpha = hk; rect(ax - 60 + k * 30, hy, 16, 14, '#ff6f8a'); x.globalAlpha = 1 } }
        } else {
          // growUp (both at once), then the rhyme: frame 0's sprint, side by side
          const run = t > T.grow + 1.6
          const bob = run ? Math.abs(Math.sin(t * 14)) * 20 : 0
          if (run) { speedLines(x, t, { x: 470, y: 1150, dir: -1, len: 280, spread: 160 }) }
          growUp(x, t, { sign: 'libra', at: T.grow, x: run ? 650 : lx + 30, y: (run ? 1160 : ly) - bob, size: 170, seed: 7, look: [-1, 0], caption: null })
          growUp(x, t, { sign: 'aries', at: T.grow, x: run ? 470 : ax, y: (run ? 1150 : ay) - bob, size: 210, seed: 1, look: [1, 0], caption: ['AGE 6', 'TODAY'] })
        }
        confetti(x, t, { x: FINISH - 80, y: LANE - 140, at: T.hug, dur: 2.0, n: 50, spread: 380 })
        crayonPow(x, t, { text: 'FIRST!', at: T.arrive, dur: 0.6, x: FINISH - 140, y: 980, size: 70, color: '#ffb08a' })
        crayonPow(x, t, { text: 'BOTH!', at: T.both, dur: 0.8, x: START + 120, y: 1010, size: 70, color: '#9be08a' })
        crayonPow(x, t, { text: 'YAY!', at: T.hug, dur: 1.2, x: 760, y: 940, size: 84, color: '#ffd36e' })
        say({ text: 'pink? or *blue*?', at: T.pick[0], out: T.pick[1], x: START + 30, y: LANE - 110, name: LIB, color: '#f2a6ec', side: 0.6, w: 460 })
        say({ text: 'you *waited* for me!', at: T.waited[0], out: T.waited[1], x: lx + 30, y: ly - 90, name: LIB, color: '#f2a6ec', side: -0.2, w: 480 })
        x.restore(); flush()
        ageCaption(x, t, { text: 'AGE 6 ¾', at: T.yard2 + 0.1, out: T.grow - 0.2, size: 64 })
      }
      x.restore()
      // the seasonal chrome
      if (cam.flash > 0) { x.fillStyle = `rgba(255,250,240,${(cam.flash * 0.5).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) }
      factChip(x, t, { label: '★ IN THE MYTH', text: 'In the myth, the golden ram rescued two children, Phrixus and Helle, and carried them through the sky.', at: T.chip, dur: T.chipDur, x: 540, y: 1430, color: '#ffd36e', w: 860 })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawCrayonFrame(x, t, { alpha: 1 - 0.6 * prog(t, T.last - 0.4, T.last) })
      drawHomeVideo(x, t, { y0: 232, alpha: 1 - prog(t, T.last - 0.4, T.last), date: t < T.yard ? 'MAR 21 · TAPE 1' : 'SEP 03 · TAPE 2' })
      hook.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.story, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E01' }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }), ...ageCaptionCues(0.1),
  ...[0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4].map(s => ['tick', s, 0.02]),
  ...crayonPowCues(T.door), ...crayonPowCues(T.crib), ...crayonPowCues(T.first, { kind: 'yay' }),
  ...speechCues(T.moon[0], { pitch: 523 }), ...speechCues(T.slow[0], { pitch: 988 }), ...speechCues(T.want[0], { pitch: 988 }),
  ['riser', T.slideUp[0], T.slideDown[0], 0.03], ['whoosh', T.slideDown[0], 0.8, 0.04],
  ...vlogCutCues(CUTS_CAM.filter(c => c !== T.story), { gain: 0.04 }), ...ageCaptionCues(T.yard + 0.1),
  ...T.cd.map(c => ['bell', r3(c), 880, 0.03, 0.4, 0]), ['bell', T.go, 1760, 0.04, 0.8, 0], ['whoosh', T.go, 0.6, 0.04],
  ...crayonPowCues(T.win1, { kind: 'yay' }),
  ...T.montage.flatMap(m => [['bell', r3(m + 0.1), 1760, 0.02, 0.3, 0], ['pop', r3(m + 0.45), 1318.51, 0.03, 0]]),
  ...speechCues(T.turn + 0.3, { pitch: 988 }), ['pop', T.popper, 1567.98, 0.03, 0], ['glitter', T.popper, T.popper + 0.4],
  ...speechCues(T.yay[0], { pitch: 784 }), ['tick', T.ghost + 0.05, 0.012], ...speechCues(T.lonely[0], { pitch: 659 }),
  ...ageCaptionCues(T.story + 0.2), ...speechCues(T.satIntro[0], { pitch: 392 }),
  ...factChipCues(T.chip, { dur: T.chipDur }),
  ...speechCues(T.carried[0], { pitch: 988 }), ...speechCues(T.saver[0], { pitch: 392 }),
  ...ageCaptionCues(T.yard2 + 0.1), ...crayonPowCues(T.arrive, { kind: 'pop' }),
  ...speechCues(T.pick[0], { pitch: 1175 }), ['pop', T.sign, 1046.5, 0.035, 0], ...crayonPowCues(T.both, { kind: 'pop' }),
  ['whoosh', T.libRun[0], 0.6, 0.03], ...crayonPowCues(T.hug, { kind: 'yay' }), ...speechCues(T.waited[0], { pitch: 1175 }),
  ...growUpCues(T.grow),
  ['pop', T.last, 659.25, 0.025, 0], ['pop', T.last + 0.09, 783.99, 0.025, 0], ['pop', T.lastLand, 987.77, 0.04, 0], ['bell', T.lastLand, 1318.51, 0.025, 1.8, 0],
  ['whoosh', T.out[0], 0.3, 0.02],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void drawCloudCrib
