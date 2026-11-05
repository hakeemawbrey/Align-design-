// ksre17: FALLING IN LOVE: SPEEDRUN · Leo: 100%, All Achievements (85 s vertical, star_talk post, Month 2 boost m03, long)
// music: pop · A. Hard cut. No end card, no card cut. Kits: ../../ksre01/srkit.js, ../../ksre16/lkit.js.
//   0.0   frame 0: Leo mid-entrance through a glitter curtain, achievement pops raining; "LEO VS 100%. | Wait for chapter 6."
//   6.0   CH1 EYE CONTACT: Leo strikes three poses across the room; the crush laughs · ACHIEVEMENT: made them laugh
//   16.0  CH2 FIRST TEXT: Leo sends a 4-minute voice note; the chat screams; the reply: a 3-second voice note "haha hi"
//   27.0  CH3 FIRST DATE: a picnic with fairy lights · "you did all this?" · "I may have rehearsed."
//   38.0  CH4 MEET THE FRIENDS: the interview panel with score cards · "approved."
//   50.0  CH5 FIRST FIGHT: a party; the crush is busy, Leo performs louder… it doesn't help · Leo goes quiet
//   62.0  CH6 SAY IT: "I missed you tonight." · "I missed you too. sit with me next time?" · "I'd like that."
//   73.0  CH7 100%: every achievement cascades in, the timer stops · 82.8 last line · cut 85.
import { makeRun, fmtClock, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, drawBits, drawPhone, sparkles } from '../../ksre01/srkit.js'
import { act, chapterFx, chapterAt, tween } from '../../ksre16/lkit.js'

const D = 85
const CH = [
  { t: 6, n: 1, title: 'eye contact', theme: 'party', split: 15.0 },
  { t: 16, n: 2, title: 'the first text', theme: 'room', split: 26.0 },
  { t: 27, n: 3, title: 'the first date', theme: 'park', split: 37.0 },
  { t: 38, n: 4, title: 'meet the friends', theme: 'cafe', split: 49.0 },
  { t: 50, n: 5, title: 'the first fight', theme: 'party', split: 61.4 },
  { t: 62, n: 6, title: 'say it', theme: 'night', split: 71.8 },
  { t: 73, n: 7, title: '100%', theme: 'street', split: 74.0 },
]
const NAMES = ['EYE CONTACT', 'FIRST TEXT', 'FIRST DATE', 'MEET THE FRIENDS', 'FIRST FIGHT', 'SAY IT', '100%']
const SPLITS = CH.map((c, i) => ({ name: NAMES[i], at: c.split, time: i === 4 ? 'OUCH' : fmtClock(c.split, { cs: false }), state: i === 4 ? 'red' : 'gold', delta: i === 6 ? 'PB' : '' }))
const LAST_T = 82.8
const ACHS = t => 1 + [14, 24, 35.5, 47.5, 71.6].filter(a => t > a).length
const timer = t => ({ text: fmtClock(t < 74 ? t + 0.4 : 74.4), col: t > 74 ? GOLD : t > 52 && t < 71.8 ? RED : GREEN, sub: t < 74 ? `ACHIEVEMENTS: ${ACHS(t)}/7` : 'ALL ACHIEVEMENTS', subCol: GOLD })
const cam = t => {
  if (t > 18.6 && t < 21.5) return { mood: 'wide', tears: 3, look: [-1, 0.8], say: 'FOUR MINUTES??', sayAt: 18.7, sayEnd: 21.3, sayX: 690, sayY: 650 }
  if (t > 31 && t < 34) return { mood: 'heart', tears: 3, look: [-1, 0.8], say: 'the LIGHTS', sayAt: 31.1, sayEnd: 33.8, sayX: 700, sayY: 650 }
  if (t > 56 && t < 59) return { mood: 'wide', tears: 3, look: [-1, 0.8], say: 'just tell them!!', sayAt: 56.1, sayEnd: 58.8, sayX: 690, sayY: 650 }
  if (t > 74) return { mood: 'happy', tears: 3, look: [-1, 0.6], hops: [74, 75, 76, 77, 78] }
  return { mood: 'sparkle', tears: 2, look: [-1, 0.8] }
}
const CROWN = ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG']
function crown(x, cx, cy, k = 1, droop = 0) { drawBits(x, CROWN, { G: GOLD, R: RED }, cx + droop * 40, cy + droop * 30, 9 * k, { rot: droop * 0.6 }) }
function lights(x, t, y0) { for (let i = 0; i < 14; i++) { const lx = 40 + i * 76, ly = y0 + 30 * Math.sin(i * 0.6); x.fillStyle = INK; x.fillRect(lx - 8, ly - 8, 16, 16); x.fillStyle = [GOLD, PINK, '#7fd0ff', GREEN][i % 4]; x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 4 + i); x.fillRect(lx - 5, ly - 5, 10, 10); x.globalAlpha = 1 } }
function card(x, cx, cy, s, k, col = INK) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); x.fillStyle = INK; x.fillRect(-58, -48, 116, 96); x.fillStyle = BONE; x.fillRect(-52, -42, 104, 84); x.font = `900 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, 0, 4); x.restore() }

function world(x, t, S) {
  const ch = t < 6 ? { theme: 'party' } : chapterAt(CH, t)
  S.level(x, t, { theme: ch.theme, floor: 1300 })
  // ── the hook (0–6): the glitter curtain entrance
  if (t < 6) {
    const open = clamp(t / 1.2)
    for (let i = 0; i < 16; i++) { const side = i < 8 ? -1 : 1, j = i % 8; const xx = 540 + side * (40 + j * 34 + open * 360); x.fillStyle = j % 2 ? GOLD : '#ffe7a0'; x.globalAlpha = 0.85; x.fillRect(xx, 880 + (j % 3) * 10, 18, 420); x.globalAlpha = 1 }
    act(x, t, S, { id: 'leo', x: 540, s: 250, moods: [[0, 'sparkle', [0, 0]], [2, 'happy', [0, 0]], [3.2, 'wink', [0, 0]]], hops: [0.2, 1.4, 3.2, 4.4] })
    crown(x, 540, 1010)
    sparkles(x, t, 540, 1100, 0.0, 12, 260, 2)
  }
  // ── CH1 eye contact
  if (t >= 6 && t < 16) {
    const poses = [7.0, 9.0, 11.0]
    const pi = poses.filter(p => t > p).length
    act(x, t, S, { id: 'leo', x: 300, s: 230, moods: [[6, 'sparkle', [1, 0]], [7, 'wink', [1, 0]], [9, 'squint', [1, 0]], [11, 'happy', [1, 0]], [12.6, 'heart', [1, 0]]], hops: [...poses, 12.6], rot: tt => [0, -0.25, 0.25, 0][poses.filter(p => tt > p).length] || 0 })
    crown(x, 300, 1020 - (pi === 3 ? 30 : 0))
    if (pi > 0 && pi <= 3 && t < 12.4) S.stamp(x, ['POSE 1: MYSTERIOUS', 'POSE 2: DRAMATIC', 'POSE 3: THE WAVE'][pi - 1], 540, 830, pop01(t, poses[pi - 1], 0.2, 2.8), { size: 44, col: GOLD, rot: -0.05, fillc: 'rgba(16,10,40,0.85)' })
    act(x, t, S, { id: 'aquarius', x: 800, s: 210, moods: [[6, 'neutral', [-1, 0]], [9.2, 'squint', [-1, 0]], [11.2, 'happy', [-1, 0]], [12.6, 'heart', [-1, 0]]], hops: [11.2, 11.5, 11.8, 12.6] })
    if (t > 11.2 && t < 13.4) for (let i = 0; i < 3; i++) S.txt(x, 'HA', 760 + i * 60, 940 - i * 40, { size: 50, col: GOLD, scale: pop01(t, 11.2 + i * 0.25, 0.2, 2.6), rot: 0.2 - i * 0.15 })
  }
  // ── CH2 the first text: a 4-minute voice note
  if (t >= 16 && t < 27) {
    const msgs = [...(t > 18.4 ? [{ at: 18.4, side: 'R', text: '▶ ▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮ 4:12' }] : []), ...(t > 23 ? [{ at: 23, side: 'L', text: '▶ ▮▮ 0:03' }] : []), ...(t > 24 ? [{ at: 24, side: 'L', text: '(it says "haha hi")' }] : [])]
    drawPhone(x, t, { cx: 640, top: 760, w: 600, h: 500, title: '♒︎ Aquarius', msgs, font: 30, typing: [21.8, 23] })
    act(x, t, S, { id: 'leo', x: 210, s: 210, moods: [[16, 'squint', [1, -0.4]], [16.6, 'happy', [1, -0.4]], [18.4, 'sparkle', [1, -0.4]], [21, 'neutral', [1, -0.4]], [23, 'wide', [1, -0.4]], [24, 'heart', [1, -0.4]]], hops: [16.6, 17.2, 17.8, 18.4, 23, 24, 26] })
    crown(x, 210, 1050)
    if (t > 16.4 && t < 18.4) { S.txt(x, '● REC', 210, 960, { size: 40, font: "'Space Mono', monospace", weight: 700, col: RED, alpha: Math.sin(t * 8) > 0 ? 1 : 0.4 }); for (let i = 0; i < 9; i++) { const h = 10 + 40 * Math.abs(Math.sin(t * 9 + i)); x.fillStyle = GOLD; x.fillRect(130 + i * 18, 900 - h / 2, 10, h) } }
    S.stamp(x, 'A VOICE NOTE??', 540, 820, pop01(t, 19, 0.2, 2.8) * outK(t, [20.8, 21]), { size: 60, col: RED, rot: 0.05 })
  }
  // ── CH3 the first date: the fairy-light picnic
  if (t >= 27 && t < 38) {
    const lk = clamp(prog(t, 28.0, 28.8))
    if (lk > 0) { x.save(); x.globalAlpha = lk; lights(x, t, 760); x.restore() }
    x.fillStyle = INK; x.fillRect(300, 1268, 480, 40); x.fillStyle = '#ff8fb1'; x.fillRect(306, 1272, 468, 30); for (let i = 0; i < 8; i++) { x.fillStyle = BONE; x.fillRect(316 + i * 58, 1278, 24, 18) }
    act(x, t, S, { id: 'leo', x: 330, s: 220, moods: [[27, 'happy', [1, 0]], [29.6, 'sparkle', [1, 0]], [31.4, 'wink', [1, 0]], [33.4, 'happy', [1, 0]]], hops: [28, 31.4, 33.6, 37] })
    crown(x, 330, 1040)
    act(x, t, S, { id: 'aquarius', x: [[27, 1200], [28.6, 760]], s: 210, moods: [[27, 'neutral', [-1, 0]], [28.8, 'wide', [-1, 0]], [29.6, 'sparkle', [-1, 0]], [33.4, 'heart', [-1, 0]]], hops: [28.6, 29.6, 33.4] })
    S.bubble(x, t, 760, 950, 29.6, 31.2, 'you did all this?', { size: 38, col: '#d4f2ff', tail: 0.2 })
    S.bubble(x, t, 340, 950, 31.4, 33.2, 'I may have rehearsed.', { size: 36, tail: -0.2 })
    S.bubble(x, t, 760, 950, 33.4, 36.6, "it's perfect. you're a lot. I love it.", { size: 32, col: '#d4f2ff', tail: 0.2, maxW: 520 })
  }
  // ── CH4 meet the friends: the interview panel
  if (t >= 38 && t < 50) {
    x.fillStyle = INK; x.fillRect(470, 1120, 600, 24); x.fillStyle = '#8a5a3c'; x.fillRect(476, 1124, 588, 14); x.fillStyle = INK; x.fillRect(470, 1144, 600, 156); x.fillStyle = '#6b3a3a'; x.fillRect(476, 1144, 588, 150)
    const panel = [['virgo', 580], ['capricorn', 770], ['scorpio', 960]]
    panel.forEach(([id, px], i) => act(x, t, S, { id, x: px, y: 1060, s: 160, moods: [[38, 'squint', [-1, 0]], [44, 'neutral', [-1, 0]], [46, 'happy', [-1, 0]]], hops: [38.4 + i * 0.2, 46 + i * 0.2] }))
    act(x, t, S, { id: 'leo', x: 220, s: 220, moods: [[38, 'wide', [1, 0]], [40, 'neutral', [1, 0]], [42, 'sparkle', [1, 0]], [46, 'happy', [1, 0]], [48, 'heart', [1, 0]]], hops: [38.2, 42, 46.2, 48], squash: tt => tt > 38 && tt < 40 ? 0.06 : 0 })
    crown(x, 220, 1040)
    S.bubble(x, t, 700, 900, 39.0, 41.8, 'favourite thing about them?', { size: 34, col: '#ffd9e8', tail: 0.2 })
    S.bubble(x, t, 360, 900, 42.0, 45.6, 'they laugh at their own jokes before the punchline.', { size: 30, tail: -0.3, maxW: 520 })
    ;['10', '10', '9.5'].forEach((s, i) => card(x, panel[i][1], 920, s, pop01(t, 46 + i * 0.25, 0.25, 2.8) * outK(t, [47.6, 47.8]), i === 2 ? RED : INK))
    S.bubble(x, t, 900, 900, 47.9, 49.6, 'approved.', { size: 40, col: '#ffd9e8', tail: 0.3 })
  }
  // ── CH5 the first fight: Leo felt unseen at the party
  if (t >= 50 && t < 62) {
    const spot = t > 54 && t < 57.6
    if (spot) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,244,200,0.18)'; x.beginPath(); x.moveTo(270, 560); x.lineTo(330, 560); x.lineTo(450, 1300); x.lineTo(150, 1300); x.fill(); x.restore() }
    act(x, t, S, { id: 'leo', x: 300, s: 220, moods: [[50, 'happy', [1, 0]], [52, 'neutral', [1, 0]], [54, 'sparkle', [0, 0]], [57.6, 'neutral', [1, 0.4]], [59, 'neutral', [0, 1]]], hops: [50.4, 54, 54.4, 54.8, 55.2], squash: tt => tt > 59 ? 0.1 : 0 })
    crown(x, 300, 1040, 1, clamp(prog(t, 57.8, 58.6)))
    act(x, t, S, { id: 'virgo', x: 700, s: 160, y: 1210, moods: [[50, 'happy', [1, 0]]], hops: [51, 53] })
    act(x, t, S, { id: 'capricorn', x: 960, s: 160, y: 1210, moods: [[50, 'happy', [-1, 0]]], hops: [51.4, 53.4] })
    act(x, t, S, { id: 'aquarius', x: 830, s: 190, moods: [[50, 'happy', [1, 0]], [56, 'happy', [1, 0]], [60, 'neutral', [-1, 0]]], hops: [51.2, 53.2] })
    S.bubble(x, t, 830, 940, 51.0, 53.6, 'and THEN the spreadsheet…', { size: 30, col: '#d4f2ff', tail: 0.1 })
    S.stamp(x, 'LOUDER?', 300, 860, pop01(t, 54, 0.2, 2.8) * outK(t, [55.4, 55.6]), { size: 56, col: GOLD, rot: -0.08 })
    S.stamp(x, "DIDN'T HELP", 540, 820, pop01(t, 57.6, 0.2, 2.8) * outK(t, [59.6, 59.8]), { size: 56, col: RED, rot: 0.06 })
    S.stamp(x, 'LEO WENT QUIET', 540, 820, pop01(t, 59.9, 0.2, 2.8) * outK(t, [61.6, 61.8]), { size: 52, col: BLUE, rot: -0.05 })
  }
  // ── CH6 say it
  if (t >= 62 && t < 73) {
    act(x, t, S, { id: 'leo', x: 340, s: 220, moods: [[62, 'neutral', [1, 0]], [63, 'neutral', [1, 0]], [66, 'wide', [1, 0]], [69, 'happy', [1, 0]], [71.6, 'heart', [1, 0]]], hops: [63, 69, 71.6, 72] })
    crown(x, 340, 1040, 1, 1 - clamp(prog(t, 69, 69.6)))
    act(x, t, S, { id: 'aquarius', x: [[62, 1200], [63, 740]], s: 210, moods: [[62, 'neutral', [-1, 0]], [65.6, 'neutral', [-1, 0.3]], [66, 'happy', [-1, 0]], [71.6, 'heart', [-1, 0]]], hops: [63, 66, 71.6, 72.1] })
    S.bubble(x, t, 360, 950, 63.4, 65.8, 'I missed you tonight.', { size: 40, tail: -0.2 })
    S.bubble(x, t, 720, 950, 66.0, 68.8, 'I missed you too. sit with me next time?', { size: 32, col: '#d4f2ff', tail: 0.2, maxW: 520 })
    S.bubble(x, t, 360, 950, 69.0, 72.4, "I'd like that.", { size: 40, tail: -0.2 })
    if (t > 71.6) S.heartBits(x, 550, 980 - 50 * prog(t, 71.6, 72.8), 10, PINK, outK(t, [72.6, 73]))
  }
  // ── CH7 100%
  if (t >= 73) {
    act(x, t, S, { id: 'leo', x: 380, s: 230, moods: [[73, 'happy', [1, 0]], [74, 'heart', [1, 0]]], hops: [74, 74.3, 74.6, 78, 80] })
    crown(x, 380, 1030)
    act(x, t, S, { id: 'aquarius', x: 720, s: 220, moods: [[73, 'happy', [-1, 0]], [74, 'heart', [-1, 0]]], hops: [74.1, 74.4, 79] })
    for (let i = 0; i < 30; i++) { if (t < 74) break; const p = ((t - 74) * 0.35 + i / 30) % 1; x.fillStyle = [GOLD, PINK, '#7fd0ff', GREEN, BONE][i % 5]; x.fillRect((i * 97) % 1080, 600 + p * 720, 14, 9) }
  }
}
const CASCADE = ['made them laugh', 'sent a voice note (brave)', 'planned the lights', 'passed the panel', 'said the hard thing', 'listened back']
function over(x, t, S) {
  if (t >= 0 && t < 2.8) for (let i = 0; i < 3; i++) S.toast(x, t, -0.3 + i * 0.6, 0.3 + i * 0.6 + 0.5, 'ACHIEVEMENT', ['walked in', 'walked in (again)', 'walked in (glitter)'][i], { cy: 1500 - i * 40, w: 700, col: GOLD })
  // the promise
  if (t > 2.9 && t < 6.2) {
    const k = pop01(t, 2.9, 0.3, 2.6) * outK(t, [5.7, 6.0])
    x.save(); x.translate(540, 790); x.rotate(-0.03); x.scale(k, k)
    S.pbox(x, -440, -110, 880, 220, 'rgba(16,10,40,0.94)', { b: 8 })
    x.fillStyle = GOLD; x.fillRect(-432, -102, 864, 8)
    x.font = `900 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('all 7 achievements or bust.', 0, -30)
    x.font = `700 32px 'Space Mono', monospace`; x.fillStyle = GOLD; x.letterSpacing = '3px'; x.fillText('chapter 6 is the hard one.', 0, 48)
    x.restore()
  }
  CASCADE.forEach((s, i) => S.toast(x, t, 74.6 + i * 1.1, 74.6 + i * 1.1 + 1.0, `ACHIEVEMENT ${i + 2}/7`, s, { cy: 1500, w: 760, col: GOLD }))
  S.stamp(x, '100%', 540, 820, pop01(t, 74, 0.25, 3) * outK(t, [LAST_T - 0.3, LAST_T]), { size: 150, col: GOLD, rot: -0.06, fillc: 'rgba(16,10,40,0.85)' })
  sparkles(x, t, 540, 820, 74.05, 14, 360, 1, [GOLD, BONE, PINK])
}
const HOOK = { at: -1, text: 'LEO VS 100%. | *Wait for chapter 6.*', top: 620, size: 100, out: [2.6, 2.85] }
const SHK = { at: 0.3, len: 0.45, amp: 20 }
const ACH1 = { at: 14.0, out: [15.6, 15.85], text: 'made them *laugh*', y: 1540 }
const ACH2 = { at: 35.5, out: [37.0, 37.25], text: 'planned the *lights*', y: 1540 }
const ACH3 = { at: 71.6, out: [72.8, 73.0], text: 'said the *hard thing*', y: 1540 }
const LAST = { at: LAST_T, text: 'Final split: | *“I missed you.”*', top: 620, size: 108 }
const EP = makeRun({
  id: 'ksre17', duration: D, runner: 'leo', category: '100% · ALL ACHIEVEMENTS',
  fx: [['slamTitle', HOOK, true], ['screenShake', SHK], ...chapterFx(CH), ['achievement', ACH1], ['achievement', ACH2], ['achievement', ACH3], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, ending: { type: 'cut' },
  camera: t => ({ zoom: 1, dx: shake(t, 54, 8) + shake(t, 57.6, 12) }),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES,
  ...SPLITS.map(s => ['bell', s.at, s.state === 'red' ? 440 : 1760, 0.04, 0.9, 0.2]), ...SPLITS.map((s, i) => ['pop', s.at, 1174.66 * (1 + i * 0.06), 0.04, 0.2]),
  ['glitter', 0, 1.2], ['whoosh', 0, 0.8, 0.05], ...[-0.3, 0.3, 0.9].filter(a => a >= 0).map(a => ['bell', a, 1567.98, 0.03, 0.6, 0]),
  ['bell', 2.95, 1318.51, 0.04, 1, 0], ...[7, 9, 11].map((a, i) => ['pop', a, 987.77 * (1 + i * 0.12), 0.045, 0]), ...[11.2, 11.45, 11.7].map(a => ['pop', a, 1318.51, 0.035, 0.3]),
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(16.5 + i * 0.18).toFixed(2), 659.25 + (i % 3) * 80, 0.02, -0.3]), ['pop', 18.4, 1318.51, 0.05, 0.3], ['tom', 19, 110, { gain: 0.2, decay: 0.25 }], ['pop', 23, 1174.66, 0.045, -0.3],
  ['glitter', 28, 28.8], ['pop', 29.6, 1318.51, 0.04, 0.3], ['pop', 31.4, 1174.66, 0.04, -0.3],
  ['pop', 39, 880, 0.04, 0.3], ['pop', 42, 987.77, 0.04, -0.3], ...[0, 0.25, 0.5].map(d => ['pop', 46 + d, 1318.51 + d * 400, 0.045, 0.2]), ['pop', 47.9, 1567.98, 0.04, 0.3],
  ['whoosh', 54, 0.4, 0.05], ['glitter', 54, 54.6], ['pluck', 57.6, 293.66, 0.05, 0.5, 0], ['pluck', 59.9, 261.63, 0.05, 0.6, 0], ['pluck', 56.2, 440, 0.035, 0.5, 0.4], ['pluck', 56.4, 415.3, 0.035, 0.5, 0.4],
  ['pop', 63.4, 880, 0.04, -0.2], ['pop', 66, 987.77, 0.04, 0.2], ['pop', 69, 1174.66, 0.04, -0.2], ['glitter', 71.6, 72.4],
  ['bell', 74, 1760, 0.06, 1.4, 0], ['glitter', 74, 75], ...CASCADE.map((c, i) => ['bell', +(74.6 + i * 1.1).toFixed(2), 1318.51 * (1 + i * 0.06), 0.035, 0.8, 0]),
]
void [MONO, lerp, tween, drawPhone]
