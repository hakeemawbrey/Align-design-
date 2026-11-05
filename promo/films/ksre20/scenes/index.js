// ksre20: FALLING IN LOVE: SPEEDRUN · Aquarius: 100%, Co-op Mode (90 s vertical, star_talk post, Month 2 boost m03, long)
// music: synthwave · B. Loop (the last 0.4 s ease back into frame 0). No end card, no card cut. Kits: srkit + lkit.
//   0.0   frame 0: Aquarius mid-teleport (pixels scattering), PLAYER 2 JOINED popping; "AQUARIUS SAYS LOVE | is a solo run."
//   2.9   the promise: "7 stages. wait for the last split."
//   6.0   CH1 EYE CONTACT at a stargazing meetup: both looking at the same star · "you saw it too?"
//   17.0  CH2 FIRST TEXT: a link to an article about octopuses having three hearts · "I READ IT ALL. more please."
//   28.0  CH3 FIRST DATE: an arcade co-op cabinet · P1 + P2 · CO-OP CLEAR
//   41.0  CH4 MEET THE FRIENDS: PLAYERS 3–6 JOINED (the whole chaotic group) · "we like them."
//   53.0  CH5 FIRST FIGHT: "I need… to be alone. forever. no, not forever." · "is it me?"
//   65.0  CH6 CO-OP: "I need quiet nights to recharge. it's not you." · "alone time, together?" · the couch
//   78.0  CH7 100%: two timer bars merge into one · 86.8 last line · 89.6 loop-back.
import { makeRun, fmtClock, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, LAV, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, drawBits, drawPhone, sparkles } from '../../ksre01/srkit.js'
import { act, chapterFx, chapterAt } from '../../ksre16/lkit.js'

const D = 90
const CH = [
  { t: 6, n: 1, title: 'eye contact', theme: 'night', split: 15.8 },
  { t: 17, n: 2, title: 'the first text', theme: 'room', split: 26.8 },
  { t: 28, n: 3, title: 'the first date', theme: 'party', split: 39.6 },
  { t: 41, n: 4, title: 'meet the friends', theme: 'street', split: 51.8 },
  { t: 53, n: 5, title: 'the first fight', theme: 'room', split: 64.2 },
  { t: 65, n: 6, title: 'co-op', theme: 'room', split: 76.6 },
  { t: 78, n: 7, title: '100%', theme: 'night', split: 81.0 },
]
const NAMES = ['EYE CONTACT', 'FIRST TEXT', 'FIRST DATE', 'MEET THE FRIENDS', 'FIRST FIGHT', 'CO-OP MODE', '100%']
const SPLITS = CH.map((c, i) => ({ name: NAMES[i], at: c.split, time: i === 4 ? 'LAG' : fmtClock(c.split, { cs: false }), state: i === 4 ? 'red' : 'gold', delta: i === 6 ? 'PB' : '' }))
const LAST_T = 86.8
const timer = t => ({ text: fmtClock(t < 81 ? t + 0.9 : 81.9), col: t > 81 ? GOLD : t > 55 && t < 66 ? RED : GREEN, sub: t > 81 ? 'CO-OP COMPLETE' : t > 28 ? 'P1 + P2' : 'SOLO RUN?', subCol: t > 81 ? GOLD : undefined })
const cam = t => {
  if (t > 11 && t < 14) return { mood: 'heart', tears: 3, look: [-1, 0.8], say: 'the SAME star', sayAt: 11.1, sayEnd: 13.8, sayX: 700, sayY: 650 }
  if (t > 58 && t < 61) return { mood: 'wide', tears: 3, look: [-1, 0.8], say: 'say it NICER', sayAt: 58.1, sayEnd: 60.8, sayX: 690, sayY: 650 }
  if (t > 81) return { mood: 'happy', tears: 3, look: [-1, 0.6], hops: [81, 82, 83.5] }
  return { mood: t > 53 && t < 65 ? 'wide' : 'sparkle', tears: t > 53 && t < 65 ? 3 : 2, look: [-1, 0.8] }
}
function telescope(x, cx, rot) { x.save(); x.translate(cx, 1150); x.rotate(rot); x.fillStyle = INK; x.fillRect(-14, -14, 190, 40); x.fillStyle = '#8f88ad'; x.fillRect(-8, -8, 178, 28); x.fillStyle = GOLD; x.fillRect(150, -10, 14, 32); x.restore(); x.fillStyle = INK; x.fillRect(cx - 6, 1160, 12, 140); x.save(); x.translate(cx, 1300); for (const d of [-1, 1]) { x.save(); x.rotate(d * 0.4); x.fillStyle = INK; x.fillRect(-5, -110, 10, 110); x.restore() } x.restore() }
function cabinet(x, cx) { x.fillStyle = INK; x.fillRect(cx - 170, 880, 340, 420); x.fillStyle = '#5a1f66'; x.fillRect(cx - 162, 888, 324, 412); x.fillStyle = '#120c2a'; x.fillRect(cx - 130, 930, 260, 190); x.fillStyle = INK; x.fillRect(cx - 150, 1150, 300, 40); x.fillStyle = RED; x.fillRect(cx - 110, 1160, 22, 20); x.fillStyle = BLUE; x.fillRect(cx + 88, 1160, 22, 20) }
function world(x, t, S) {
  const ch = t < 6 ? { theme: 'void' } : chapterAt(CH, t)
  S.level(x, t, { theme: ch.theme, floor: 1300 })
  // ── hook (0–6): the teleport
  if (t < 6) {
    const tp = clamp(t / 0.9)
    if (tp < 1) for (let i = 0; i < 24; i++) { const a = i * 0.9, r = (1 - tp) * (120 + (i * 37) % 160); x.fillStyle = i % 2 ? '#38c4ec' : BONE; x.globalAlpha = 1 - tp * 0.6; x.fillRect(420 + Math.cos(a) * r, 1150 + Math.sin(a) * r * 0.7, 16, 16); x.globalAlpha = 1 }
    act(x, t, S, { id: 'aquarius', x: 420, s: 240, moods: [[0, 'wide', [1, 0]], [1.4, 'squint', [1, 0]], [3.2, 'neutral', [1, 0]]], hops: [0.9, 3.4], pop: undefined })
  }
  // ── CH1 stargazing
  if (t >= 6 && t < 17) {
    const meet = t > 10.6
    telescope(x, 300, meet ? -0.2 : -0.7)
    telescope(x, 780, Math.PI + (meet ? 0.2 : 0.7))
    act(x, t, S, { id: 'aquarius', x: 200, s: 200, moods: [[6, 'neutral', [1, -1]], [10.6, 'wide', [1, 0]], [12.4, 'happy', [1, 0]]], hops: [10.6, 12.4, 15.8] })
    act(x, t, S, { id: 'gemini', x: 880, s: 200, moods: [[6, 'neutral', [-1, -1]], [10.6, 'wide', [-1, 0]], [12.4, 'sparkle', [-1, 0]]], hops: [10.6, 12.4, 15.8] })
    if (!meet) { x.save(); x.strokeStyle = 'rgba(242,199,92,0.5)'; x.setLineDash([10, 12]); x.lineWidth = 4; x.beginPath(); x.moveTo(460, 1080); x.lineTo(540, 700); x.lineTo(620, 1080); x.stroke(); x.restore(); S.pbox(x, 528, 688, 24, 24, GOLD, { b: 4 }) }
    S.bubble(x, t, 820, 960, 12.4, 14.6, 'you saw it too?', { size: 38, col: '#fff1a8', tail: 0.2 })
    S.bubble(x, t, 280, 960, 14.6, 16.6, "it's my favourite one.", { size: 34, tail: -0.2 })
  }
  // ── CH2 the weird article
  if (t >= 17 && t < 28) {
    const msgs = [...(t > 18.2 ? [{ at: 18.2, side: 'R', text: 'did you know octopuses have three hearts' }] : []), ...(t > 18.9 ? [{ at: 18.9, side: 'R', text: '[ article: OCTOPUS HEARTS, EXPLAINED ]' }] : []), ...(t > 22.6 ? [{ at: 22.6, side: 'L', text: 'I READ IT ALL. more please.' }] : [])]
    drawPhone(x, t, { cx: 640, top: 760, w: 600, h: 500, title: '♊︎ Gemini', msgs, font: 28, typing: [20.8, 22.6] })
    act(x, t, S, { id: 'aquarius', x: 200, s: 200, moods: [[17, 'sparkle', [1, -0.4]], [20, 'neutral', [1, -0.4]], [22.6, 'wide', [1, -0.4]], [23.4, 'heart', [1, -0.4]]], hops: [18.2, 18.9, 22.8, 23.4, 26.8] })
    S.stamp(x, 'NERD ALERT', 640, 720, pop01(t, 19.4, 0.2, 2.8) * outK(t, [20.6, 20.8]), { size: 52, col: BLUE, rot: -0.06 })
    S.stamp(x, 'IT WORKED', 640, 720, pop01(t, 23.4, 0.2, 2.8) * outK(t, [25.8, 26.0]), { size: 56, col: GREEN, rot: 0.05 })
  }
  // ── CH3 the arcade
  if (t >= 28 && t < 41) {
    cabinet(x, 540)
    // the game on the screen: two pixel ships dodging blocks
    x.save(); x.beginPath(); x.rect(410, 930, 260, 190); x.clip()
    for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? PINK : GOLD; x.fillRect(410 + ((i * 53 + t * 140) % 260), 940 + (i * 37) % 160, 18, 18) }
    x.fillStyle = '#38c4ec'; x.fillRect(470 + 20 * Math.sin(t * 3), 1080, 24, 16); x.fillStyle = '#f2cf4a'; x.fillRect(590 + 20 * Math.sin(t * 3 + 1), 1080, 24, 16)
    if (t > 36.4) { x.fillStyle = 'rgba(16,10,40,0.85)'; x.fillRect(410, 990, 260, 70); x.font = `700 28px 'Space Mono', monospace`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('CO-OP CLEAR', 540, 1034) }
    x.restore()
    act(x, t, S, { id: 'aquarius', x: 240, s: 200, moods: [[28, 'squint', [1, -0.4]], [33, 'wide', [1, -0.4]], [36.4, 'heart', [1, 0]]], hops: [29, 30, 31, 32, 36.4, 36.8] })
    act(x, t, S, { id: 'gemini', x: 840, s: 200, moods: [[28, 'squint', [-1, -0.4]], [33, 'wide', [-1, -0.4]], [36.4, 'heart', [-1, 0]]], hops: [29.5, 30.5, 31.5, 32.5, 36.4, 36.8] })
    S.bubble(x, t, 280, 920, 33.0, 35.0, 'LEFT! go LEFT!', { size: 36, tail: -0.1 })
    S.bubble(x, t, 800, 920, 34.4, 36.2, 'I got you!!', { size: 38, col: '#fff1a8', tail: 0.1 })
  }
  // ── CH4 the whole friend group
  if (t >= 41 && t < 53) {
    const gang = [['aries', 560, 42.6], ['sagittarius', 700, 43.0], ['leo', 840, 43.4], ['virgo', 980, 43.8]]
    gang.forEach(([id, gx, en], i) => act(x, t, S, { id, x: gx, y: tween0(t, en, 1200), s: 150, enter: en, moods: [[41, 'sparkle', [-1, 0]], [49, 'happy', [-1, 0]]], hops: [en + 0.3, 45 + i * 0.3, 49 + i * 0.2] }))
    act(x, t, S, { id: 'aquarius', x: 380, s: 200, moods: [[41, 'happy', [1, 0]], [44, 'sparkle', [1, 0]]], hops: [42, 44.4, 49] })
    act(x, t, S, { id: 'gemini', x: 180, s: 200, moods: [[41, 'happy', [1, 0]], [43, 'wide', [1, 0]], [46.6, 'happy', [1, 0]], [49, 'heart', [1, 0]]], hops: [43, 46.6, 49.2] })
    S.bubble(x, t, 760, 940, 44.4, 46.4, 'IS THIS THEM??', { size: 40, col: '#ffe0b8', tail: 0.1 })
    S.bubble(x, t, 240, 940, 46.6, 48.6, '…hi, everyone!', { size: 36, col: '#fff1a8', tail: -0.1 })
    S.bubble(x, t, 760, 940, 49.0, 51.6, 'we like them.', { size: 40, col: '#ffe0b8', tail: 0.1 })
  }
  // ── CH5 the first fight
  if (t >= 53 && t < 65) {
    act(x, t, S, { id: 'aquarius', x: 300, s: 210, moods: [[53, 'neutral', [1, 0]], [54.2, 'squint', [0, 0]], [56.6, 'wide', [1, 0]], [61.4, 'neutral', [0, 1]]], hops: [54.2, 55.4, 56.6] })
    act(x, t, S, { id: 'gemini', x: 800, s: 210, moods: [[53, 'happy', [-1, 0]], [55, 'wide', [-1, 0]], [57.8, 'neutral', [0, 1]]], hops: [57.8], squash: tt => tt > 58 ? 0.08 : 0 })
    S.bubble(x, t, 320, 930, 54.2, 55.3, 'I need… to be alone.', { size: 36, tail: -0.2 })
    S.bubble(x, t, 320, 930, 55.4, 56.5, 'forever.', { size: 42, tail: -0.2 })
    S.bubble(x, t, 320, 930, 56.6, 57.7, 'no, not forever!', { size: 38, tail: -0.2 })
    S.bubble(x, t, 780, 930, 57.8, 61.2, 'is it me?', { size: 40, col: '#fff1a8', tail: 0.2 })
  }
  // ── CH6 co-op mode
  if (t >= 65 && t < 78) {
    const couch = t > 72.4
    if (couch) { x.fillStyle = INK; x.fillRect(250, 1150, 580, 150); x.fillStyle = '#6b5ab8'; x.fillRect(258, 1158, 564, 70); x.fillStyle = '#5a4aa0'; x.fillRect(258, 1228, 564, 72) }
    act(x, t, S, { id: 'aquarius', x: couch ? 380 : 320, y: couch ? 1120 : 1180, s: 200, moods: [[65, 'neutral', [1, 0]], [66, 'neutral', [1, 0]], [69.6, 'happy', [1, 0]], [72.4, 'sparkle', [0, 1]]], hops: [66, 69.6, 72.4, 76.6] })
    act(x, t, S, { id: 'gemini', x: couch ? 700 : 780, y: couch ? 1120 : 1180, s: 200, moods: [[65, 'neutral', [-1, 0]], [69.6, 'sparkle', [-1, 0]], [72.4, 'happy', [0, 1]]], hops: [69.6, 72.4, 76.6] })
    if (couch) { S.pbox(x, 790, 1150, 90, 70, '#ff8fb1', { b: 5 }); drawBits(x, ['.GG.', 'GBBG', 'GBBG', '.GG.'], { G: '#8f88ad', B: '#38c4ec' }, 270, 1190, 10); S.txt(x, 'shh.', 540, 980, { size: 36, col: BONE, alpha: 0.6 + 0.4 * Math.sin(t * 2) }) }
    S.bubble(x, t, 340, 930, 66.0, 69.4, "I need quiet nights to recharge. it's not you.", { size: 32, tail: -0.2, maxW: 520 })
    S.bubble(x, t, 760, 930, 69.6, 72.2, 'so… alone time, together?', { size: 36, col: '#fff1a8', tail: 0.2 })
  }
  // ── CH7 100%: two bars merge
  if (t >= 78) {
    act(x, t, S, { id: 'aquarius', x: 380, s: 230, moods: [[78, 'happy', [1, 0]], [81, 'heart', [1, 0]]], hops: [81, 81.3, 81.6, 84.6] })
    act(x, t, S, { id: 'gemini', x: 720, s: 220, moods: [[78, 'happy', [-1, 0]], [81, 'heart', [-1, 0]]], hops: [81.1, 81.4, 85.2] })
    const m = ease.inOutCubic(prog(t, 79.0, 80.8))
    if (t < 83.4) {
      const k = pop01(t, 78.4, 0.3, 2.4) * outK(t, [83.0, 83.4])
      x.save(); x.globalAlpha = k
      for (const [col, y0, lab] of [['#38c4ec', 840, 'P1'], ['#f2cf4a', 960, 'P2']]) {
        const y = lerp(y0, 900, m)
        x.fillStyle = INK; x.fillRect(160, y - 30, 760, 60); x.fillStyle = m > 0.98 ? GOLD : col; x.fillRect(168, y - 22, 744, 44)
        x.font = `700 28px 'Space Mono', monospace`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(m > 0.98 ? 'P1 + P2' : lab, 186, y + 2)
      }
      x.restore()
    }
    for (let i = 0; i < 30; i++) { if (t < 81) break; const p = ((t - 81) * 0.35 + i / 30) % 1; x.fillStyle = [GOLD, PINK, '#7fd0ff', GREEN, BONE][i % 5]; x.fillRect((i * 97) % 1080, 600 + p * 720, 14, 9) }
  }
}
const tween0 = (t, en, y) => y - Math.max(0, 1 - (t - en) / 0.3) * 400
function over(x, t, S) {
  S.stamp(x, 'PLAYER 2 JOINED', 540, 960, t < 2.4 ? (t < 0.2 ? 1.2 - t : 1) : 0, { size: 52, col: GREEN, rot: 0.05, fillc: 'rgba(16,10,40,0.88)', font: "'Space Mono', monospace" })
  if (t > 2.9 && t < 6.2) {
    const k = pop01(t, 2.9, 0.3, 2.6) * outK(t, [5.7, 6.0])
    x.save(); x.translate(540, 790); x.rotate(-0.03); x.scale(k, k)
    S.pbox(x, -440, -110, 880, 220, 'rgba(16,10,40,0.94)', { b: 8 })
    x.fillStyle = '#38c4ec'; x.fillRect(-432, -102, 864, 8)
    x.font = `900 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('7 stages. 2 players.', 0, -30)
    x.font = `700 32px 'Space Mono', monospace`; x.fillStyle = GOLD; x.letterSpacing = '3px'; x.fillText('wait for the last split.', 0, 48)
    x.restore()
  }
  S.stamp(x, 'PLAYERS 3–6 JOINED', 540, 800, pop01(t, 42.8, 0.2, 2.8) * outK(t, [44.2, 44.4]), { size: 48, col: GREEN, rot: -0.04, fillc: 'rgba(16,10,40,0.85)', font: "'Space Mono', monospace" })
  S.stamp(x, 'CO-OP COMPLETE', 540, 760, pop01(t, 81, 0.25, 3) * outK(t, [83.4, 83.7]), { size: 72, col: GOLD, rot: -0.05, fillc: 'rgba(16,10,40,0.85)' })
  sparkles(x, t, 540, 900, 80.85, 14, 360, 1, [GOLD, BONE, PINK])
}
const HOOK = { at: -1, text: 'AQUARIUS SAYS LOVE | *is a solo run.*', top: 600, size: 100, out: [2.6, 2.85] }
const GL0 = { at: -0.3, len: 1.0, dialog: false, amp: 0.6 }
const GL = { at: 57.0, len: 1.2, text: 'COMMUNICATION.EXE: *lag detected*', buttons: ['TRY AGAIN', 'TRY AGAIN'] }
const ACH1 = { at: 25.0, out: [26.8, 27.05], text: 'bonded over *octopus hearts*', y: 1540 }
const ACH2 = { at: 74.0, out: [77.4, 77.65], title: 'CO-OP ACHIEVEMENT', text: 'alone time, *together*', y: 1540 }
const LAST = { at: LAST_T, text: 'Space, but together. | *Run complete.*', top: 600, size: 100, out: [89.3, 89.55] }
const EP = makeRun({
  id: 'ksre20', duration: D, runner: 'aquarius', category: '100% · CO-OP MODE',
  fx: [['glitch', GL0], ['slamTitle', HOOK, true], ...chapterFx(CH), ['glitch', GL], ['achievement', ACH1], ['achievement', ACH2], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, ending: { type: 'loop', len: 0.4 },
  camera: t => ({ zoom: 1, dx: shake(t, 55.4, 10) + shake(t, 42.6, 8) }),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES,
  ...SPLITS.map(s => ['bell', s.at, s.state === 'red' ? 440 : 1760, 0.04, 0.9, 0.2]), ...SPLITS.map((s, i) => ['pop', s.at, 1174.66 * (1 + i * 0.06), 0.04, 0.2]),
  ['whoosh', 0, 0.6, 0.06], ['bell', 0.05, 1760, 0.04, 0.8, 0], ['bell', 2.95, 1318.51, 0.04, 1, 0],
  ['bell', 10.6, 2349.32, 0.035, 1.2, 0], ['pop', 12.4, 1174.66, 0.04, 0.3], ['pop', 14.6, 987.77, 0.04, -0.3],
  ['pop', 18.2, 880, 0.04, 0.3], ['pop', 18.9, 987.77, 0.04, 0.3], ['pop', 22.6, 1318.51, 0.05, -0.3],
  ...Array.from({ length: 16 }, (_, i) => ['tick', +(29 + i * 0.45).toFixed(2), 0.03]), ['bell', 36.4, 1760, 0.05, 1, 0], ['glitter', 36.4, 37.2],
  ...[42.6, 43.0, 43.4, 43.8].map((a, i) => ['tom', a + 0.3, 100 + i * 10, { gain: 0.2, decay: 0.25 }]), ['pop', 44.4, 1318.51, 0.045, 0.3], ['pop', 49, 1174.66, 0.04, 0.3],
  ['pop', 54.2, 880, 0.04, -0.3], ['pop', 55.4, 659.25, 0.045, -0.3], ['pop', 56.6, 987.77, 0.04, -0.3], ['pluck', 57.8, 293.66, 0.05, 0.6, 0.3],
  ['pop', 66, 880, 0.04, -0.2], ['pop', 69.6, 1174.66, 0.04, 0.3], ['whoosh', 72.4, 0.4, 0.04],
  ['riser', 79, 80.8, 0.04], ['bell', 81, 1760, 0.06, 1.4, 0], ['glitter', 81, 82],
]
void [MONO, LAV, RED]
