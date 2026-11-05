// ksre18: FALLING IN LOVE: SPEEDRUN · Virgo: 100%, Off Route (85 s vertical, star_talk post, Month 2 boost m03, long)
// music: chiptune · C. Loop (the last 0.4 s ease back into frame 0). No end card, no card cut. Kits: srkit + lkit.
//   0.0   frame 0: Virgo mid-panic, the route map tearing in half, an OFF ROUTE alarm; "VIRGO'S ROUTE | just tore in half."
//   2.9   the promise: "the route has 7 steps. the ending, though."
//   6.0   CH1 EYE CONTACT: route step 1 "eye contact: 2 seconds" — exactly 2 · ON SCHEDULE
//   16.0  CH2 FIRST TEXT: the template text "Hello. I enjoyed our eye contact." · "haha you're funny. dinner thursday?"
//   27.0  CH3 FIRST DATE: CLOSED TONIGHT · OFF ROUTE · recalculating… · "food truck?" · it's great
//   38.0  CH4 MEET THE FRIENDS: a board game Virgo has never seen · reads the rules at speed · loses · laughs
//   50.0  CH5 FIRST FIGHT: the 12-step weekend plan · "I wanted to see what happens" · "plans make me feel safe"
//   62.0  CH6 IMPROVISE: "plan half, wing half?" · Virgo tears the route in half on purpose · "deal."
//   73.0  CH7 100%: PB · 81.5 last line · 84.6 loop-back.
import { makeRun, fmtClock, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, drawBits, drawPhone, sparkles } from '../../ksre01/srkit.js'
import { act, chapterFx, chapterAt, tween } from '../../ksre16/lkit.js'

const D = 85
const CH = [
  { t: 6, n: 1, title: 'eye contact', theme: 'street', split: 14.5 },
  { t: 16, n: 2, title: 'the first text', theme: 'room', split: 25.5 },
  { t: 27, n: 3, title: 'the first date', theme: 'street', split: 36.8 },
  { t: 38, n: 4, title: 'meet the friends', theme: 'cafe', split: 48.8 },
  { t: 50, n: 5, title: 'the first fight', theme: 'room', split: 61.4 },
  { t: 62, n: 6, title: 'improvise', theme: 'night', split: 71.4 },
  { t: 73, n: 7, title: '100%', theme: 'park', split: 74.0 },
]
const NAMES = ['EYE CONTACT', 'FIRST TEXT', 'FIRST DATE', 'MEET THE FRIENDS', 'FIRST FIGHT', 'IMPROVISE', '100%']
const SPLITS = CH.map((c, i) => ({ name: NAMES[i], at: c.split, time: [2, 4].includes(i) ? 'OFF ROUTE' : fmtClock(c.split, { cs: false }), state: [2, 4].includes(i) ? 'red' : i === 1 || i === 0 ? 'green' : 'gold', delta: i === 6 ? 'PB' : i < 2 ? 'ON PLAN' : '' }))
const LAST_T = 81.5
const offRoute = t => t < 2.6 || (t > 28.4 && t < 36.8) || (t > 52 && t < 66)
const timer = t => ({ text: fmtClock(t < 74 ? t + 1.1 : 75.1), col: t > 74 ? GOLD : offRoute(t) ? RED : GREEN, sub: t > 74 ? 'PERSONAL BEST' : offRoute(t) ? 'OFF ROUTE' : 'ON ROUTE · v7', subCol: t > 74 ? GOLD : offRoute(t) ? RED : undefined })
const cam = t => {
  if (t > 29 && t < 32) return { mood: 'wide', tears: 3, look: [-1, 0.8], say: 'NOT THE ROUTE', sayAt: 29.1, sayEnd: 31.8, sayX: 690, sayY: 650 }
  if (t > 66.6 && t < 69.5) return { mood: 'heart', tears: 3, look: [-1, 0.8], say: 'she TORE it', sayAt: 66.7, sayEnd: 69.3, sayX: 690, sayY: 650 }
  if (t > 74) return { mood: 'happy', tears: 3, look: [-1, 0.6], hops: [74, 75, 76.5] }
  if (offRoute(t)) return { mood: 'wide', tears: 3, look: [-1, 0.8], shake: 2 }
  return { mood: 'sparkle', tears: 2, look: [-1, 0.8] }
}
// the route map: a pixel clipboard with a dotted line; torn = 0…1 splits it in half
function route(x, t, cx, cy, s, torn = 0, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  for (const side of [-1, 1]) {
    x.save(); x.translate(side * torn * 60, torn * 20); x.rotate(side * torn * 0.25)
    x.beginPath(); x.rect(side < 0 ? -130 : 0, -170, 130, 340); x.clip()
    x.fillStyle = INK; x.fillRect(-130, -170, 260, 340); x.fillStyle = '#f4e8cc'; x.fillRect(-122, -162, 244, 324)
    x.fillStyle = GOLD; x.fillRect(-40, -176, 80, 24)
    x.font = `700 22px 'Space Mono', monospace`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('ROUTE v7', 0, -126)
    for (let i = 0; i < 7; i++) { x.fillStyle = i < 3 ? GREEN : '#8f88ad'; x.fillRect(-96, -96 + i * 36, 18, 18); x.fillStyle = 'rgba(27,18,54,0.5)'; x.fillRect(-66, -92 + i * 36, 150 - (i % 3) * 30, 10) }
    x.restore()
  }
  if (torn > 0.05) { x.fillStyle = '#f4e8cc'; for (let i = 0; i < 8; i++) x.fillRect(-6 + (i % 2) * 6, -160 + i * 40, 8, 20) }
  x.restore()
}
function world(x, t, S) {
  const ch = t < 6 ? { theme: 'street' } : chapterAt(CH, t)
  S.level(x, t, { theme: ch.theme, floor: 1300 })
  // ── hook + promise (0–6)
  if (t < 6) {
    route(x, t, 700, 1040, 1.1, t < 2.4 ? 0.35 + 0.15 * Math.sin(t * 9) * (1 - t / 2.4) : 0.35, 0.08)
    act(x, t, S, { id: 'virgo', x: 330, s: 230, moods: [[0, 'wide', [1, -0.4]], [3, 'squint', [1, -0.4]]], hops: [0.3, 0.6, 0.9, 3.4], rot: tt => tt < 1.2 ? 0.08 * Math.sin(tt * 30) : 0 })
  }
  // ── CH1 eye contact: exactly 2 seconds
  if (t >= 6 && t < 16) {
    route(x, t, 170, 980, 0.55, 0, -0.1)
    act(x, t, S, { id: 'virgo', x: 360, s: 220, moods: [[6, 'neutral', [-1, -0.4]], [8, 'squint', [1, 0]], [10, 'neutral', [-1, -0.4]], [12, 'happy', [1, 0]]], hops: [8, 10, 12, 14.5] })
    act(x, t, S, { id: 'sagittarius', x: 820, s: 210, moods: [[6, 'happy', [-1, 0]], [11.6, 'wink', [-1, 0]], [12.4, 'happy', [-1, 0]]], hops: [11.6, 14.5] })
    if (t > 8 && t < 10.2) { S.txt(x, `EYE CONTACT ${(Math.min(2, t - 8)).toFixed(2)} s`, 540, 860, { size: 44, font: "'Space Mono', monospace", weight: 700, col: GREEN }) }
    S.stamp(x, 'EXACTLY 2.00 s', 540, 860, pop01(t, 10.1, 0.2, 2.8) * outK(t, [11.4, 11.6]), { size: 52, col: GREEN, rot: -0.05 })
    S.stamp(x, 'ON SCHEDULE', 540, 860, pop01(t, 12.4, 0.2, 2.8) * outK(t, [14.4, 14.6]), { size: 56, col: GREEN, rot: 0.04 })
  }
  // ── CH2 the template text
  if (t >= 16 && t < 27) {
    const msgs = [...(t > 18.2 ? [{ at: 18.2, side: 'R', text: 'Hello. I enjoyed our eye contact.' }] : []), ...(t > 21.6 ? [{ at: 21.6, side: 'L', text: "haha you're funny. dinner thursday?" }] : []), ...(t > 23.8 ? [{ at: 23.8, side: 'R', text: 'yes. 7:00. I will be early.' }] : [])]
    drawPhone(x, t, { cx: 640, top: 760, w: 600, h: 500, title: '♐︎ Sagittarius', msgs, font: 30, typing: [20.4, 21.6] })
    act(x, t, S, { id: 'virgo', x: 200, s: 200, moods: [[16, 'squint', [1, -0.4]], [18.2, 'neutral', [1, -0.4]], [21.6, 'wide', [1, -0.4]], [22.4, 'happy', [1, -0.4]]], hops: [18.2, 21.8, 23.8, 25.5] })
    S.stamp(x, 'TEMPLATE 3B', 640, 720, pop01(t, 17.2, 0.2, 2.8) * outK(t, [18.0, 18.2]), { size: 46, col: BLUE, rot: -0.05, font: "'Space Mono', monospace" })
  }
  // ── CH3 the first date: closed
  if (t >= 27 && t < 38) {
    x.fillStyle = INK; x.fillRect(600, 900, 420, 400); x.fillStyle = '#5a4aa0'; x.fillRect(608, 908, 404, 392); x.fillStyle = '#2a2350'; x.fillRect(740, 1060, 140, 240)
    const ck = pop01(t, 28.0, 0.3, 2.6)
    if (ck > 0.01) { x.save(); x.translate(810, 980); x.rotate(0.06); x.scale(ck, ck); S.pbox(x, -150, -40, 300, 80, RED, { b: 6 }); x.font = `900 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('CLOSED TONIGHT', 0, 2); x.restore() }
    act(x, t, S, { id: 'virgo', x: 280, s: 220, moods: [[27, 'happy', [1, -0.3]], [28.3, 'wide', [1, -0.3]], [32.8, 'neutral', [1, 0]], [34.6, 'sparkle', [1, 0]]], hops: [28.3, 28.6, 33.0, 34.8], rot: tt => tt > 28.3 && tt < 32 ? 0.05 * Math.sin(tt * 26) : 0 })
    act(x, t, S, { id: 'sagittarius', x: 500, s: 190, moods: [[27, 'happy', [-1, 0]], [32.6, 'sparkle', [-1, 0]]], hops: [32.6, 34.8] })
    if (t > 28.6 && t < 32.4) route(x, t, 160, 960, 0.5, clamp(prog(t, 28.6, 29.0)), 0)
    S.bubble(x, t, 500, 930, 32.6, 34.4, 'food truck?', { size: 40, col: '#e7d4ff', tail: 0.1 })
    S.bubble(x, t, 300, 930, 34.6, 36.6, '…this is GREAT.', { size: 38, tail: -0.1 })
  }
  // ── CH4 the board game
  if (t >= 38 && t < 50) {
    x.fillStyle = INK; x.fillRect(240, 1150, 600, 22); x.fillRect(530, 1170, 20, 130); x.fillStyle = '#c9855a'; x.fillRect(246, 1154, 588, 10)
    S.pbox(x, 340, 1110, 400, 44, '#3fb6f0', { b: 4 }); x.font = `900 22px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('ROLL THE MOON', 540, 1136)
    act(x, t, S, { id: 'virgo', x: 180, s: 200, moods: [[38, 'wide', [1, 0]], [40.6, 'squint', [1, 0.4]], [43.6, 'happy', [1, 0]], [46.4, 'wide', [1, 0]], [47.2, 'happy', [1, 0]]], hops: [40.6, 43.6, 47.2, 47.5] })
    act(x, t, S, { id: 'sagittarius', x: 940, s: 180, moods: [[38, 'happy', [-1, 0]], [46.4, 'sparkle', [-1, 0]]], hops: [46.4, 47.2] })
    act(x, t, S, { id: 'gemini', x: 420, y: 1030, s: 140, moods: [[38, 'happy', [1, 0]]], hops: [39, 46.4] })
    act(x, t, S, { id: 'aries', x: 680, y: 1030, s: 140, moods: [[38, 'squint', [-1, 0]], [46.4, 'happy', [-1, 0]]], hops: [39.4, 46.4] })
    // the rule book flipping at speed
    if (t > 40.6 && t < 43.4) { const pg = Math.floor((t - 40.6) * 8); S.pbox(x, 120, 860, 240, 160, '#f4e8cc', { b: 6 }); x.font = `700 22px 'Space Mono', monospace`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText(`RULES p.${pg + 1}/24`, 240, 940) }
    S.bubble(x, t, 600, 900, 39.0, 40.4, 'you know this one, right?', { size: 32, col: '#fff1a8', tail: -0.1 })
    S.stamp(x, 'YOU LOSE', 540, 820, pop01(t, 46.4, 0.2, 2.8) * outK(t, [47.8, 48]), { size: 64, col: RED, rot: -0.06 })
    S.bubble(x, t, 300, 900, 47.2, 49.6, 'again. I want a rematch.', { size: 34, tail: -0.3 })
  }
  // ── CH5 the first fight: the 12-step weekend
  if (t >= 50 && t < 62) {
    const pl = pop01(t, 50.6, 0.3, 2.4) * outK(t, [56.6, 56.9])
    if (pl > 0.01) { x.save(); x.translate(540, 920); x.scale(pl, pl); S.pbox(x, -220, -150, 440, 300, '#f4e8cc', { b: 8 }); x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.fillStyle = INK; ['THE WEEKEND (12 STEPS)', '8:00 breakfast', '8:40 walk (route A)', '9:15 museum', '10:05 …', '…'].forEach((l, i) => x.fillText(l, -196, -110 + i * 44)); x.restore() }
    act(x, t, S, { id: 'virgo', x: 230, s: 210, moods: [[50, 'sparkle', [1, 0]], [52, 'neutral', [1, 0]], [55, 'wide', [1, 0]], [58.4, 'neutral', [0, 1]]], hops: [50.6, 55, 57.2] })
    act(x, t, S, { id: 'sagittarius', x: 850, s: 200, moods: [[50, 'happy', [-1, 0]], [52, 'neutral', [-1, 0]], [58.4, 'neutral', [0, 1]]], hops: [52.2] })
    S.bubble(x, t, 760, 930, 52.2, 54.8, 'I wanted to just see what happens.', { size: 32, col: '#e7d4ff', tail: 0.3, maxW: 520 })
    S.bubble(x, t, 330, 930, 57.2, 59.6, 'plans make me feel safe.', { size: 36, tail: -0.2 })
    S.stamp(x, 'BOTH WENT QUIET', 540, 820, pop01(t, 59.8, 0.2, 2.8) * outK(t, [61.4, 61.6]), { size: 52, col: BLUE, rot: 0.04 })
  }
  // ── CH6 improvise
  if (t >= 62 && t < 73) {
    act(x, t, S, { id: 'virgo', x: 300, s: 220, moods: [[62, 'neutral', [1, 0]], [64.8, 'wide', [1, 0]], [66.6, 'squint', [0, 0]], [67.4, 'happy', [1, 0]], [70, 'heart', [1, 0]]], hops: [64.8, 66.6, 67.4, 70, 71.4] })
    act(x, t, S, { id: 'sagittarius', x: [[62, 1200], [63, 780]], s: 210, moods: [[62, 'happy', [-1, 0]], [70, 'heart', [-1, 0]]], hops: [63, 64.8, 70] })
    route(x, t, 540, 960, 0.7, ease.outCubic(prog(t, 66.6, 67.2)), 0)
    S.bubble(x, t, 760, 900, 63.2, 66.2, 'plan half, wing half?', { size: 38, col: '#e7d4ff', tail: 0.3 })
    S.stamp(x, 'ON PURPOSE', 540, 760, pop01(t, 67.2, 0.2, 2.8) * outK(t, [69, 69.2]), { size: 56, col: GOLD, rot: -0.05 })
    S.bubble(x, t, 300, 900, 69.4, 72.4, 'deal.', { size: 48, tail: -0.1 })
  }
  // ── CH7 100%
  if (t >= 73) {
    act(x, t, S, { id: 'virgo', x: 380, s: 230, moods: [[73, 'happy', [1, 0]], [74, 'heart', [1, 0]]], hops: [74, 74.3, 74.6, 77.5, 79.5] })
    act(x, t, S, { id: 'sagittarius', x: 720, s: 220, moods: [[73, 'happy', [-1, 0]], [74, 'heart', [-1, 0]]], hops: [74.1, 74.4, 78.5] })
    for (let i = 0; i < 30; i++) { if (t < 74) break; const p = ((t - 74) * 0.35 + i / 30) % 1; x.fillStyle = [GOLD, PINK, '#7fd0ff', GREEN, BONE][i % 5]; x.fillRect((i * 97) % 1080, 600 + p * 720, 14, 9) }
    S.bubble(x, t, 720, 930, 76.4, 78.6, 'so… what now?', { size: 38, col: '#e7d4ff', tail: 0.2 })
    S.bubble(x, t, 380, 930, 78.8, LAST_T - 0.2, 'no idea. come on.', { size: 38, tail: -0.2 })
  }
}
function over(x, t, S) {
  S.stamp(x, '⚠ OFF ROUTE', 540, t < 6 ? 975 : 860, t < 2.6 ? (Math.sin(t * 12) > -0.3 ? 1 : 0.9) : pop01(t, 28.4, 0.2, 2.8) * outK(t, [30.4, 30.6]), { size: 60, col: RED, rot: 0.05, fillc: 'rgba(16,10,40,0.85)', font: "'Space Mono', monospace" })
  if (t > 2.9 && t < 6.2) {
    const k = pop01(t, 2.9, 0.3, 2.6) * outK(t, [5.7, 6.0])
    x.save(); x.translate(540, 790); x.rotate(-0.03); x.scale(k, k)
    S.pbox(x, -440, -110, 880, 220, 'rgba(16,10,40,0.94)', { b: 8 })
    x.fillStyle = GOLD; x.fillRect(-432, -102, 864, 8)
    x.font = `900 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('the route has 7 steps.', 0, -30)
    x.font = `700 32px 'Space Mono', monospace`; x.fillStyle = GOLD; x.letterSpacing = '3px'; x.fillText('the ending, though.', 0, 48)
    x.restore()
  }
  S.stamp(x, 'PB', 540, 820, pop01(t, 74, 0.25, 3) * outK(t, [76.2, 76.4]), { size: 150, col: GOLD, rot: -0.06, fillc: 'rgba(16,10,40,0.85)' })
  sparkles(x, t, 540, 820, 74.05, 14, 360, 1, [GOLD, BONE, PINK])
}
const HOOK = { at: -1, text: "VIRGO'S ROUTE | *just tore in half.*", top: 620, size: 104, out: [2.6, 2.85] }
const SHK = { at: 0.2, len: 0.6, amp: 24 }
const GL = { at: 28.4, len: 1.0, text: 'ROUTE.EXE: *closed tonight*', buttons: ['RECALCULATE', 'PANIC'] }
const LOAD = { at: 29.6, len: 2.8, label: 'recalculating…', stallAt: 99, error: 'Error: no plan B', y: 840 }
const ACH1 = { at: 36.8, out: [37.8, 38.0], text: 'liked the *food truck*', y: 1540 }
const ACH2 = { at: 74.4, out: [LAST_T - 0.4, LAST_T - 0.15], title: '100% COMPLETE', text: 'half planned. *half lived.*', y: 1540 }
const LAST = { at: LAST_T, text: 'Off route. | *Still a personal best.*', top: 620, size: 100, out: [84.25, 84.5] }
const EP = makeRun({
  id: 'ksre18', duration: D, runner: 'virgo', category: '100% · ROUTED',
  fx: [['slamTitle', HOOK, true], ['screenShake', SHK], ...chapterFx(CH), ['glitch', GL], ['loadingBar', LOAD], ['achievement', ACH1], ['achievement', ACH2], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, ending: { type: 'loop', len: 0.4 },
  camera: t => ({ zoom: 1, dx: shake(t, 28.3, 12) + shake(t, 66.6, 10) }),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES,
  ...SPLITS.map(s => ['bell', s.at, s.state === 'red' ? 440 : 1760, 0.04, 0.9, 0.2]), ...SPLITS.map((s, i) => ['pop', s.at, 1174.66 * (1 + i * 0.06), 0.04, 0.2]),
  ...[0, 0.3, 0.6, 0.9].map(a => ['pop', a, 1760, 0.035, 0]), ['whoosh', 0.1, 0.4, 0.06], ['bell', 2.95, 1318.51, 0.04, 1, 0],
  ['tick', 8, 0.05], ['bell', 10.1, 1760, 0.04, 0.8, 0], ['pop', 11.6, 1174.66, 0.04, 0.3], ['pop', 12.4, 1318.51, 0.04, 0],
  ['pop', 18.2, 1318.51, 0.05, 0.3], ['pop', 21.6, 1174.66, 0.05, -0.3], ['pop', 23.8, 1318.51, 0.05, 0.3],
  ['tom', 28.3, 90, { gain: 0.28, decay: 0.3 }], ['pop', 32.6, 987.77, 0.04, 0.3], ['pop', 34.6, 1318.51, 0.045, -0.3],
  ...Array.from({ length: 22 }, (_, i) => ['tick', +(40.6 + i * 0.125).toFixed(3), 0.025]), ['pluck', 46.4, 293.66, 0.05, 0.4, 0], ['pop', 47.2, 1174.66, 0.04, -0.2],
  ['whoosh', 50.6, 0.4, 0.04], ['pop', 52.2, 880, 0.04, 0.3], ['pop', 57.2, 987.77, 0.04, -0.3], ['pluck', 59.8, 261.63, 0.05, 0.6, 0],
  ['pop', 63.2, 1174.66, 0.04, 0.3], ['whoosh', 66.6, 0.5, 0.06], ['tick', 66.8, 0.07], ['pop', 69.4, 1318.51, 0.05, -0.3],
  ['bell', 74, 1760, 0.06, 1.4, 0], ['glitter', 74, 75], ['pop', 76.4, 1174.66, 0.04, 0.3], ['pop', 78.8, 1318.51, 0.04, -0.3],
]
void [MONO, lerp, tween, drawBits]
