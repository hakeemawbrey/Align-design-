// st8gameshow (35 s vertical, Star Talk season 8 "EX RETROGRADE", S8 E05: game show) · story 0–30.6, then the end card.
//   Hook (frame 0): "Who wants to | text an *ex?*"  Gemini in the hot seat under the spotlights, typing a draft, the money
//   ladder of drafts climbing (hey → heyyy → hey stranger → u up? → i miss us → ★ DON'T ★).
//   2.6   the question: "WHAT DO YOU TEXT YOUR EX?"  A hey stranger ;)  B u up?  C saw this & thought of u  D nothing. (don't)
//         HOST (THE STARS): "for the big one: what do you text your *ex?*"  GEMINI: "um. B? no wait, C? maybe *A?*"
//   8.8   LIFELINE: PHONE A FRIEND. Sagittarius picks up: "don’t."
//   12.2  LIFELINE: 50:50. The twin pops in and knocks out A and B: "50:50. now it’s C… or *D.*"
//   16.2  LIFELINE: ASK THE AUDIENCE. The Aunties boo (BOOO); the poll: D 94%. AUNTIE TAURUS: "boooo. put the phone *down*, baby."
//   19.4  the lights drop, drumroll. HOST: "…is that your *final* answer?"  GEMINI: "locking in… *D.*"  D locks (orange)…
//   24.4  CORRECT! D goes green, the top rung "★ DON'T ★" lights, confetti; Gemini puts the phone face down.
//   26.9  frame 0's framing, changed: phone down, Gemini beaming. "Final answer: *don’t.*"
//   Hidden comet: crosses the top at 5.0. Ghost: rises over the question panel's top-left corner at 14.6.
//   Rewatch bait: Gemini's phone draft rewrites itself every few seconds, ending as "[draft deleted]".
// One canvas, DOM type (hook, last line, the box), grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawTwin, TWIN } from '../../st5cast.js'
import { auntie } from '../../st4aunties1/scenes/props.js'
import { drawComet, drawPhone, drawDayChip, hookCard, hookCues, genreBug, stingerCues, EX_RED } from '../../st8cast.js'

export const DURATION = 35
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN       // 30.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LOCK = '#ff9a2a', WIN = '#4fd07a', BLUE = '#2a4ab8'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

const T = {
  hookOut: [2.4, 2.65], q: 2.6, l1: 2.9, comet: 5.0, l2: 6.1,
  phone: [8.8, 12.2], l3: 9.4,
  fifty: [12.2, 16.2], l4: 12.6, strike: 13.1, ghost: 14.6,
  aud: [16.2, 19.4], l5: 16.6, poll: 16.5,
  final: 19.4, l6: 19.45, l7: 22.0, lock: 22.75, win: 24.4, close: 24.9,
  last: 26.9, lastOut: [30.25, 30.55],
}
const GEM = signStar('gemini'), SAG = signStar('sagittarius'), CAN = signStar('cancer'), TAU = signStar('taurus')
const HOST = 'THE STARS · HOST', GEMN = '♊ GEMINI', SAGN = '♐ SAGITTARIUS', TWN = TWIN.tag, AUN = '♉ AUNTIE TAURUS'
const LINES = [
  { t: T.l1, speaker: HOST, text: 'for the big one: what do you text your *ex?*' },
  { t: T.l2, speaker: GEMN, text: 'um. B? no wait, C? maybe *A?*', color: GEM.color },
  { t: T.l3, speaker: SAGN, text: 'don’t.', color: SAG.color },
  { t: T.l4, speaker: TWN, text: '50:50. now it’s C… or *D.*', color: TWIN.tagColor },
  { t: T.l5, speaker: AUN, text: 'boooo. put the phone *down*, baby.', color: TAU.color },
  { t: T.l6, speaker: HOST, text: '…is that your *final* answer?' },
  { t: T.l7, speaker: GEMN, text: 'locking in… *D.*', color: GEM.color },
]
const CPS = 28
const OPTS = [['A', 'hey stranger ;)'], ['B', 'u up?'], ['C', 'saw this & thought of u'], ['D', 'nothing. (don’t)']]
const RUNGS = ['hey', 'heyyy', 'hey stranger', 'u up?', 'i miss us', '★ DON’T ★']
const LAD = { x0: 690, x1: 1020, y0: 545, step: 80 }
const QP = { y0: 1095 }
const G = { x: 300, y: 880, s: 270 }
const inW = (t, [a, b]) => t >= a && t < b
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const GHOST = { at: T.ghost, x: 130, y: QP.y0, where: 'rising over the question panel’s top-left corner' }

async function build(stage) {
  try {
    await Promise.all(["800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "800 70px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Who wants to | text an *ex?*', at: 0, out: T.hookOut, size: 116, accentSize: 190, top: 170, accentColor: GOLD })
  const last = hookCard(root, { text: 'Final answer: | *don’t.*', at: T.last, out: T.lastOut, size: 116, accentSize: 200, top: 170, accentColor: WIN })
  const box = dialogueBox(root, { lines: LINES, y: 1505, width: 960, height: 240, open: T.l1 - 0.22, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const px = (X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
  function text(s, X, Y, { size = 30, color = BONE, align = 'center', font = MONO, weight = 700, alpha = 1 } = {}) {
    x.save(); x.globalAlpha *= alpha; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(s, X, Y + size * 0.08); x.fillStyle = color; x.fillText(s, X, Y); x.restore()
  }
  /** a game-show lozenge (hexagon ends) */
  function lozenge(cx, cy, w, h, fillC, edge = '#9fb8ff') {
    const d = h / 2
    x.beginPath(); x.moveTo(cx - w / 2, cy); x.lineTo(cx - w / 2 + d, cy - d); x.lineTo(cx + w / 2 - d, cy - d); x.lineTo(cx + w / 2, cy); x.lineTo(cx + w / 2 - d, cy + d); x.lineTo(cx - w / 2 + d, cy + d); x.closePath()
    x.fillStyle = INK; x.save(); x.translate(0, 5); x.fill(); x.restore()
    x.fillStyle = fillC; x.fill(); x.lineWidth = 4; x.strokeStyle = edge; x.stroke()
  }
  const dim = t => 0.55 * ease.inOutCubic(prog(t, T.final, T.final + 0.6)) * (1 - ease.outCubic(prog(t, T.win, T.win + 0.3)))
  function stage_(t) {
    // spotlight beams sweeping (pixel-stepped cones)
    x.save(); x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 4; i++) {
      const a = Math.sin(t * 0.9 + i * 1.7) * 0.35 + (i - 1.5) * 0.28, ox = 150 + i * 260
      x.save(); x.translate(ox, 380); x.rotate(a)
      const g = x.createLinearGradient(0, 0, 0, 1000); g.addColorStop(0, `rgba(160,190,255,${0.22 * (1 - dim(t))})`); g.addColorStop(1, 'rgba(160,190,255,0)')
      x.fillStyle = g; x.beginPath(); x.moveTo(-14, 0); x.lineTo(14, 0); x.lineTo(160, 1000); x.lineTo(-160, 1000); x.closePath(); x.fill(); x.restore()
    }
    x.restore()
    // the floor ring under the hot seat
    for (let i = 0; i < 40; i++) { if (i % 2) continue; const a = i / 40 * Math.PI * 2 + t * 0.3; px(G.x + Math.cos(a) * 210 - 5, G.y + 170 + Math.sin(a) * 40 - 5, 10, 10, i % 4 ? '#7fa0ff' : GOLD) }
    // the hot seat
    px(G.x - 150, G.y - 40, 300, 240, INK); px(G.x - 142, G.y - 32, 284, 120, '#3a2a7a'); px(G.x - 142, G.y + 96, 284, 50, '#2a1f5a')
    px(G.x - 20, G.y + 146, 40, 90, INK); px(G.x - 90, G.y + 230, 180, 14, INK)
  }
  function ladder(t) {
    const won = t >= T.win
    // the draft rung climbs while Gemini drafts
    const cur = won ? 5 : Math.min(4, Math.floor(prog(t, -1.2, 9.0) * 5))
    RUNGS.forEach((r, i) => {
      const y = LAD.y0 + (5 - i) * LAD.step, top = i === 5
      const on = i === cur, lit = won && top
      const fl = lit && (t * 4) % 1 < 0.5
      lozenge((LAD.x0 + LAD.x1) / 2, y, LAD.x1 - LAD.x0, 62, on ? (top ? (fl ? WIN : '#2fa05a') : LOCK) : top ? '#3a2a10' : '#141038', top ? GOLD : '#6a7ad8')
      text(String(i + 1), LAD.x0 + 40, y, { size: 24, color: on ? INK : '#9fb8ff' })
      text(r, (LAD.x0 + LAD.x1) / 2 + 16, y, { size: top ? 30 : 26, color: on ? INK : top ? GOLD : BONE })
    })
  }
  function lifelines(t) {
    const used = [t >= T.phone[0], t >= T.fifty[0], t >= T.aud[0]]
    const labels = ['☎', '50:50', 'ASK']
    used.forEach((u, i) => {
      const cx = 140 + i * 160, cy = 560
      x.save(); x.beginPath(); x.ellipse(cx, cy, 66, 44, 0, 0, Math.PI * 2); x.fillStyle = INK; x.fill(); x.beginPath(); x.ellipse(cx, cy, 60, 38, 0, 0, Math.PI * 2); x.fillStyle = u ? '#2a1838' : BLUE; x.fill(); x.lineWidth = 4; x.strokeStyle = '#9fb8ff'; x.stroke(); x.restore()
      text(labels[i], cx, cy, { size: i === 0 ? 34 : 26, color: u ? '#7a7090' : BONE, font: i === 0 ? INTER : MONO })
      if (u) { x.save(); x.strokeStyle = EX_RED; x.lineWidth = 9; x.beginPath(); x.moveTo(cx - 44, cy - 28); x.lineTo(cx + 44, cy + 28); x.moveTo(cx + 44, cy - 28); x.lineTo(cx - 44, cy + 28); x.stroke(); x.restore() }
    })
  }
  function question(t) {
    const k = t < T.q ? 1 : pop01(t, T.q, 0.35, 1.8)
    x.save(); x.translate(540, QP.y0 + 200); x.scale(1, k); x.translate(-540, -QP.y0 - 200)
    px(0, QP.y0 + 20, 1080, 360, 'rgba(6,4,24,0.85)'); px(0, QP.y0 + 20, 1080, 4, '#6a7ad8')
    lozenge(540, QP.y0 + 80, 1000, 80, BLUE, '#bfd0ff')
    text('WHAT DO YOU TEXT YOUR EX?', 540, QP.y0 + 80, { size: 36, color: '#ffffff' })
    const pollK = ease.outCubic(prog(t, T.poll + 0.6, T.poll + 1.8))
    const POLL = [2, 1, 3, 94]
    OPTS.forEach(([l, s], i) => {
      const cx = i % 2 ? 790 : 290, cy = QP.y0 + 190 + Math.floor(i / 2) * 100
      const struck = t >= T.strike && i < 2 && t < T.win + 100
      const locked = t >= T.lock && i === 3, won = t >= T.win && i === 3
      const opt = t < T.q + 0.2 + i * 0.1 && t >= T.q ? 0 : 1
      if (!opt) return
      lozenge(cx, cy, 480, 76, won ? WIN : locked ? LOCK : '#141038', won ? '#bfffd0' : locked ? '#ffe0b0' : '#6a7ad8')
      if (struck) { text(l + ':', cx - 200, cy, { size: 28, color: '#5a5478', align: 'left' }); return }
      text(l + ':', cx - 200, cy, { size: 28, color: locked || won ? INK : GOLD, align: 'left' })
      text(s, cx - 158, cy, { size: s.length > 18 ? 22 : 26, color: locked || won ? INK : BONE, align: 'left' })
      if (inW(t, T.aud) || (t >= T.aud[0] && t < T.final + 0.5)) {
        const pc = Math.round(POLL[i] * pollK)
        text(pc + '%', cx + 200, cy, { size: 24, color: i === 3 ? '#8ff0b4' : '#9fb8ff', align: 'right', alpha: clamp(pollK * 3) })
      }
    })
    x.restore()
  }
  function inset(t, [a, b], title, draw) {
    const k = pop01(t, a, 0.35, 2) * (1 - ease.inQuad(prog(t, b - 0.3, b)))
    if (k <= 0.01) return
    x.save(); x.translate(330, 800); x.scale(k, k)
    px(-270, -250, 540, 500, INK); px(-262, -242, 524, 484, '#0f0b2a'); px(-262, -242, 524, 64, BLUE)
    text(title, 0, -210, { size: 28, color: '#ffffff' })
    draw()
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.62 }); drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const cp = prog(t, T.comet, T.comet + 2.0)
      if (cp > 0 && cp < 1) drawComet(x, lerp(1110, 620, cp), lerp(400, 430, cp), 28, t, { aura: false, exPin: false, tail: 80, mood: 'happy', sunDir: [-1, 0.06], bob: 0 })
      stage_(t)
      // Gemini in the hot seat
      const won = t >= T.win, end = t >= T.last
      const gst = t < T.q ? { mood: 'wide', look: [1, 1], blink: false } : t < T.phone[0] ? { mood: 'eyeroll' } : t < T.final ? { mood: 'wide', look: [-1, 0] } : t < T.win ? { mood: 'squint', look: [0, 0] } : end ? (t < T.last + 0.5 ? { mood: 'neutral', look: [0, 0] } : { mood: 'happy' }) : { mood: 'sparkle', look: [0, 0] }
      const sweat = !won && t >= T.final
      const r = drawStarChar(x, G.x, G.y, G.s, t, { color: GEM.color, glyph: GEM.glyph, ...gst, hops: [...talkHops(LINES, GEMN, { cps: CPS }), T.win + 0.05, T.win + 0.5, T.last + 0.4], squash: sweat ? 0.04 * Math.sin(t * 20) : 0, seed: 21 })
      if (sweat) for (let i = 0; i < 2; i++) { const p = (t * 1.3 + i * 0.5) % 1; px(r.x + (i ? 90 : -100), r.y - 60 + p * 60, 10, 14, '#8fd8ff') }
      // the phone: drafts rewrite (rewatch bait), then face down
      const DR = ['hey', 'heyyy', 'hey stranger', 'u up?', 'i miss us', 'u up??']
      const draft = won ? '[draft deleted]' : DR[Math.floor((t * 0.8) % DR.length)]
      if (!won) drawPhone(x, r.x + 150, r.y + 60, 120, t, { lit: 1, text: draft, buzz: t < T.q ? 0.4 : 0, rot: 0.12 })
      else { x.save(); x.translate(r.x + 150, G.y + 104); px(-60, -10, 120, 20, INK); px(-56, -7, 112, 14, '#3a3456'); x.restore(); text(draft, r.x + 150, G.y + 70, { size: 18, color: '#9a96b0', alpha: end ? 1 : clamp((t - T.win) * 2) }) }
      ladder(t)
      lifelines(t)
      question(t)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y + 20, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
      // lifeline 1: phone a friend
      inset(t, T.phone, 'PHONE A FRIEND', () => {
        px(-110, -150, 220, 360, INK); px(-102, -142, 204, 344, '#20304a')
        drawStarChar(x, 0, 30, 190, t, { color: SAG.color, glyph: SAG.glyph, mood: t < T.l3 + 0.4 ? 'neutral' : 'squint', look: [0, 0], hops: talkHops(LINES, SAGN, { cps: CPS }), seed: 9 })
        text('♐ SAGITTARIUS', 0, 180, { size: 22, color: SAG.color })
        text(`0:${String(Math.max(0, 30 - Math.floor((t - T.phone[0]) * 6))).padStart(2, '0')}`, 190, -120, { size: 26, color: GOLD })
      })
      // lifeline 2: 50:50, the twin
      if (inW(t, T.fifty)) {
        const k = pop01(t, T.fifty[0], 0.4, 2.2) * (1 - ease.inQuad(prog(t, T.fifty[1] - 0.3, T.fifty[1])))
        drawTwin(x, 560, 960, 190, t, { mood: t < T.strike ? 'wink' : 'happy', look: [-1, 0], pop: k, hops: [T.fifty[0] + 0.3, ...talkHops(LINES, TWN, { cps: CPS }), T.strike], twitch: [T.strike], seed: 22 })
        if (k > 0.3) text('50:50', 560, 820, { size: 40, color: GOLD, alpha: k })
      }
      // lifeline 3: the Aunties boo
      inset(t, T.aud, 'ASK THE AUDIENCE', () => {
        const boo = Math.sin(t * 9)
        auntie(x, -110, 40, 180, t, { color: CAN.color, glyph: CAN.glyph, mood: 'squint', look: [0, 0], glasses: { fog: 0.15 }, squash: 0.05 * boo, seed: 31 })
        auntie(x, 120, 40, 180, t, { color: TAU.color, glyph: TAU.glyph, mood: 'squint', look: [0, 0], glasses: { fog: 0.15 }, squash: -0.05 * boo, hops: talkHops(LINES, AUN, { cps: CPS }), seed: 32 })
        const R = rng(Math.floor(t * 5))
        for (let i = 0; i < 3; i++) text('BOOO', -150 + R() * 300, -120 + R() * 60, { size: 30 + i * 6, color: EX_RED, font: INTER, weight: 800, alpha: 0.9 })
      })
      // the final-answer dim + drumroll lights
      const dm = dim(t)
      if (dm > 0) { x.save(); x.globalAlpha = dm; px(0, 0, 1080, 1920, '#020108'); x.restore(); x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(G.x, G.y, 0, G.x, G.y, 330); g.addColorStop(0, `rgba(160,190,255,${0.35 * dm / 0.55})`); g.addColorStop(1, 'rgba(160,190,255,0)'); x.fillStyle = g; x.fillRect(0, 400, 1080, 900); x.restore() }
      // CORRECT! + confetti
      if (won) {
        const ck = pop01(t, T.win, 0.35, 2.4) * (1 - prog(t, T.last - 0.4, T.last))
        if (ck > 0.01) { x.save(); x.translate(540, 380); x.rotate(-0.06); x.scale(ck, ck); px(-300, -70, 600, 140, INK); px(-292, -62, 584, 124, WIN); text('CORRECT!', 0, 4, { size: 84, color: INK, font: INTER, weight: 800 }); x.restore() }
        const R = rng(77)
        for (let i = 0; i < 60; i++) { const sx = R() * 1080, sp = 300 + R() * 300, ph = R(); const yy = ((t - T.win) * sp + ph * 1900) % 1900; px(sx + Math.sin(t * 3 + i) * 20, yy, 12, 18, [GOLD, PINK, WIN, '#7fe0ff', BONE][i % 5]) }
      }
      // the show's chrome
      genreBug(x, t, { text: 'LIVE', x: 70, y: 112, color: EX_RED, size: 22 })
      drawDayChip(x, t, { day: 10, phase: 'retro', y: 112 })
      hook.update(t); last.update(t); box.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E05', fadeIn: 0 })]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...stingerCues(T.q, { key: KEY, kind: 'gameshow' }),
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.q + 0.2 + i * 0.1), [659.25, 739.99, 880, 987.77][i], 0.035, (i % 2 ? 0.3 : -0.3)]),
  ['tick', T.comet + 0.5, 0.012],
  ...stingerCues(T.phone[0], { key: KEY, kind: 'news' }), ...[0, 1, 2].map(i => ['bell', r3(T.phone[0] + 0.3 + i * 0.35), 1318.51, 0.02, 0.4, -0.3]),
  ...stingerCues(T.fifty[0], { key: KEY, kind: 'gameshow' }), ['whoosh', T.strike, 0.35, 0.05], ['tom', T.strike, 90, { gain: 0.3 }], ['tom', T.strike + 0.12, 80, { gain: 0.3 }],
  ...stingerCues(T.aud[0], { key: KEY, kind: 'sitcom' }), ['riser', T.poll + 0.5, T.poll + 1.8, 0.03], ['pop', T.poll + 1.8, 1174.66, 0.04, 0.3],
  ...Array.from({ length: 22 }, (_, i) => ['snare', r3(T.final + 0.6 + i * 0.1), { gain: 0.06 + i * 0.004, decay: 0.08 }]).filter(c => c[1] < T.lock),
  ['boom', T.lock, 0.3], ['tom', T.lock, 70, { gain: 0.4, decay: 0.6 }],
  ...stingerCues(T.win, { key: KEY, kind: 'wedding' }), ['crash', T.win, { gain: 0.06, len: 2.2 }], ['glitter', T.win, T.win + 1.6],
  ...talkCues(LINES, { cps: CPS, pitch: { [HOST]: 784, [GEMN]: 1046.5, [SAGN]: 659.25, [TWN]: 880, [AUN]: 587.33 } }),
  ...hookCues(T.last - 0.16, { key: KEY }),
  ['bell', r3(T.last + 0.5), 1318.51, 0.03, 1.6, 0],
  ...endcardCues(STORY_END),
]
