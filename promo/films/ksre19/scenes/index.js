// ksre19: FALLING IN LOVE: SPEEDRUN · Scorpio: 100%, Final Boss (90 s vertical, star_talk post, Month 2 boost m03, long)
// music: cinematic · D. Hard cut. No end card, no card cut. Kits: srkit + lkit.
//   0.0   frame 0: Scorpio mid-dodge, a boss health bar SAYING HOW I FEEL slamming in; "THE FINAL BOSS | is three words."
//   2.9   the promise: "6 stages, then the boss. stay for the boss fight."
//   6.0   CH1 EYE CONTACT: BLINKS: 0 · "do you ever blink?" · BLINKS: 1 (achievement)
//   17.0  CH2 FIRST TEXT: "hey." vs three paragraphs · "same." · WORD COUNT 1 vs 214
//   28.0  CH3 FIRST DATE: Scorpio asks question after question · "wait, what about YOU?" · "…next question."
//   41.0  CH4 MEET THE FRIENDS: the friends ask back · "I like… soup." · SCORPIO SHARED A FACT
//   53.0  CH5 FIRST FIGHT: "I don't know what you're thinking. ever." · SCORPIO.EXE is not responding
//   65.0  CH6 FINAL BOSS: three hits — "I" · "like" · "you." — K.O. · "I like you too. that's all I wanted to hear."
//   79.0  CH7 100% · 87.6 last line · cut 90.
import { makeRun, fmtClock, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, drawPhone, sparkles } from '../../ksre01/srkit.js'
import { act, chapterFx, chapterAt } from '../../ksre16/lkit.js'

const D = 90
const CH = [
  { t: 6, n: 1, title: 'eye contact', theme: 'night', split: 15.8 },
  { t: 17, n: 2, title: 'the first text', theme: 'room', split: 26.8 },
  { t: 28, n: 3, title: 'the first date', theme: 'cafe', split: 39.8 },
  { t: 41, n: 4, title: 'meet the friends', theme: 'party', split: 51.8 },
  { t: 53, n: 5, title: 'the first fight', theme: 'room', split: 64.2 },
  { t: 65, n: 6, title: 'final boss', theme: 'void', split: 76.4 },
  { t: 79, n: 7, title: '100%', theme: 'night', split: 79.6 },
]
const NAMES = ['EYE CONTACT', 'FIRST TEXT', 'FIRST DATE', 'MEET THE FRIENDS', 'FIRST FIGHT', 'FINAL BOSS', '100%']
const SPLITS = CH.map((c, i) => ({ name: NAMES[i], at: c.split, time: i === 4 ? 'SILENT' : fmtClock(c.split, { cs: false }), state: i === 4 ? 'red' : 'gold', delta: i === 6 ? 'PB' : '' }))
const LAST_T = 87.6
const HITS = [69.4, 71.6, 73.8]
const bossHP = t => t < 6 ? 1 : 1 - HITS.filter(h => t > h).length / 3
const timer = t => ({ text: fmtClock(t < 79.6 ? t + 0.8 : 80.4), col: t > 79.6 ? GOLD : (t > 55 && t < 65) || (t > 65 && t < 74) ? RED : GREEN, sub: t > 79.6 ? 'BOSS DEFEATED' : t > 65 ? `BOSS HP: ${Math.round(bossHP(t) * 100)}%` : `CHAPTER ${t < 6 ? 0 : chapterAt(CH, t).n}/7`, subCol: t > 65 ? GOLD : undefined })
const cam = t => {
  if (t > 9 && t < 12) return { mood: 'wide', tears: 3, look: [-1, 0.8], say: 'BLINK. PLEASE.', sayAt: 9.1, sayEnd: 11.8, sayX: 690, sayY: 650 }
  if (t > 66 && t < 69.2) return { mood: 'wide', tears: 3, look: [-1, 0.8], say: 'you can DO this', sayAt: 66.1, sayEnd: 69.1, sayX: 690, sayY: 650 }
  if (t > 74 && t < 79) return { mood: 'heart', tears: 3, look: [-1, 0.8], shake: 3 }
  if (t > 79) return { mood: 'happy', tears: 3, look: [-1, 0.6], hops: [79.6, 80.6, 81.6] }
  if (t > 53 && t < 65) return { mood: 'wide', tears: 3, look: [-1, 0.8] }
  return { mood: 'sparkle', tears: 2, look: [-1, 0.8] }
}
function bossBar(x, t, S, k) {
  if (k <= 0.01) return
  const hp = bossHP(t), hit = HITS.some(h => t > h && t < h + 0.25)
  x.save(); x.translate(540 + (hit ? 10 * Math.sin(t * 80) : 0), 960); x.scale(k, k)
  S.pbox(x, -460, -70, 920, 140, 'rgba(16,10,40,0.95)', { b: 8 })
  x.font = `700 28px 'Space Mono', monospace`; x.letterSpacing = '4px'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText('FINAL BOSS: SAYING HOW I FEEL', -430, -34)
  x.fillStyle = INK; x.fillRect(-430, 4, 860, 44); x.fillStyle = '#3a1020'; x.fillRect(-424, 10, 848, 32)
  const shown = lerp(hp + 0.33 * (HITS.filter(h => t > h).length ? 1 : 0), hp, clamp((t - Math.max(...HITS.filter(h => t > h), -9)) / 0.5))
  x.fillStyle = hit ? BONE : RED; x.fillRect(-424, 10, 848 * clamp(shown), 32)
  x.restore()
}
function world(x, t, S) {
  const ch = t < 6 ? { theme: 'void' } : chapterAt(CH, t)
  S.level(x, t, { theme: ch.theme, floor: 1300 })
  // ── hook (0–6)
  if (t < 6) {
    act(x, t, S, { id: 'scorpio', x: [[0, 300], [0.6, 380], [3, 380]], s: 240, moods: [[0, 'wide', [1, -0.6]], [1.2, 'squint', [1, -0.4]]], hops: [0.6, 1.2, 3.2], rot: tt => tt < 0.6 ? -0.35 * (1 - tt / 0.6) : 0 })
    S.speedLines(x, t, 330, 1150, { n: 8, alpha: 1 - clamp(t / 0.8), dir: 1 })
  }
  // ── CH1 eye contact: BLINKS: 0
  if (t >= 6 && t < 17) {
    const blink = t > 13.2
    act(x, t, S, { id: 'scorpio', x: 320, s: 220, moods: [[6, 'neutral', [1, 0]], [7, 'squint', [1, 0]], [13.2, 'happy', [1, 0]]], hops: [13.2, 15.8], blink: undefined })
    act(x, t, S, { id: 'libra', x: 800, s: 210, moods: [[6, 'happy', [-1, 0]], [9, 'wide', [-1, 0]], [10.8, 'happy', [-1, 0]]], hops: [10.8, 11.1, 13.4] })
    S.txt(x, `BLINKS: ${blink ? 1 : 0}`, 540, 860, { size: 46, font: "'Space Mono', monospace", weight: 700, col: blink ? GREEN : RED, alpha: t > 7 ? 1 : 0 })
    S.bubble(x, t, 780, 960, 10.8, 13.0, 'do you ever blink?', { size: 36, col: '#ffd9f4', tail: 0.2 })
    S.bubble(x, t, 340, 960, 13.4, 15.6, '…now I do.', { size: 38, tail: -0.2 })
  }
  // ── CH2 the first text
  if (t >= 17 && t < 28) {
    const msgs = [...(t > 18.2 ? [{ at: 18.2, side: 'R', text: 'hey.' }] : []), ...(t > 20.6 ? [{ at: 20.6, side: 'L', text: 'HEY!! ok so I had the best time and also I keep thinking about the thing you said about the moon and' }] : []), ...(t > 21.4 ? [{ at: 21.4, side: 'L', text: 'anyway how was your day!!' }] : []), ...(t > 23.4 ? [{ at: 23.4, side: 'R', text: 'same.' }] : [])]
    drawPhone(x, t, { cx: 640, top: 760, w: 600, h: 500, title: '♎︎ Libra', msgs, font: 28, typing: [19.2, 20.6] })
    act(x, t, S, { id: 'scorpio', x: 200, s: 200, moods: [[17, 'squint', [1, -0.4]], [20.6, 'wide', [1, -0.4]], [23.4, 'neutral', [1, -0.4]], [24.6, 'happy', [1, -0.4]]], hops: [18.2, 20.8, 23.4, 26.8] })
    S.stamp(x, 'WORD COUNT: 1 vs 214', 540, 720, pop01(t, 24.2, 0.2, 2.8) * outK(t, [26.4, 26.6]), { size: 44, col: GOLD, rot: -0.04, fillc: 'rgba(16,10,40,0.88)', font: "'Space Mono', monospace" })
  }
  // ── CH3 the first date: all the questions
  if (t >= 28 && t < 41) {
    x.fillStyle = INK; x.fillRect(380, 1150, 320, 20); x.fillRect(530, 1168, 20, 132); x.fillStyle = '#c9855a'; x.fillRect(386, 1154, 308, 10)
    const nq = Math.min(37, Math.floor(clamp((t - 29) / 5) * 37))
    act(x, t, S, { id: 'scorpio', x: 250, s: 220, moods: [[28, 'squint', [1, 0]], [34.6, 'wide', [1, 0]], [37.2, 'squint', [1, 0]]], hops: [29, 29.6, 30.2, 30.8, 31.4, 32, 32.6, 33.2, 37.2] })
    act(x, t, S, { id: 'libra', x: 830, s: 210, moods: [[28, 'happy', [-1, 0]], [33, 'sparkle', [-1, 0]], [34.6, 'wide', [-1, 0]], [37.2, 'happy', [-1, 0]]], hops: [34.6, 37.6] })
    if (t > 29 && t < 34.4) { const qs = ['favourite colour?', 'first memory?', 'cats or dogs?', 'biggest fear?', 'why?', 'and then?']; S.bubble(x, t, 330, 930, 29 + Math.floor((t - 29) / 0.9) * 0.9, 29 + Math.floor((t - 29) / 0.9) * 0.9 + 0.85, qs[Math.floor((t - 29) / 0.9) % qs.length], { size: 36, tail: -0.2 }); for (let i = 0; i < 6; i++) S.txt(x, '?', 200 + ((i * 173 + t * 120) % 700), 1050 - ((t * 200 + i * 90) % 400), { size: 50, col: GOLD, alpha: 0.7 }) }
    S.txt(x, `QUESTIONS ASKED: ${nq}`, 540, 760, { size: 38, font: "'Space Mono', monospace", weight: 700, col: GOLD, alpha: t > 29 ? 1 : 0 })
    S.bubble(x, t, 780, 930, 34.6, 37.0, 'wait, what about YOU?', { size: 36, col: '#ffd9f4', tail: 0.2 })
    S.bubble(x, t, 330, 930, 37.2, 39.6, '…next question.', { size: 38, tail: -0.2 })
  }
  // ── CH4 meet the friends: they ask back
  if (t >= 41 && t < 53) {
    act(x, t, S, { id: 'gemini', x: 640, s: 180, y: 1200, moods: [[41, 'happy', [-1, 0]], [49.4, 'sparkle', [-1, 0]]], hops: [42, 44, 49.4] })
    act(x, t, S, { id: 'sagittarius', x: 820, s: 180, y: 1200, moods: [[41, 'happy', [-1, 0]], [49.4, 'sparkle', [-1, 0]]], hops: [43, 45, 49.6] })
    act(x, t, S, { id: 'libra', x: 980, s: 170, y: 1210, moods: [[41, 'happy', [-1, 0]], [49.4, 'heart', [-1, 0]]], hops: [49.8] })
    act(x, t, S, { id: 'scorpio', x: 260, s: 220, moods: [[41, 'neutral', [1, 0]], [42, 'wide', [1, 0]], [46, 'squint', [0, 1]], [47.6, 'happy', [1, 0]]], hops: [47.6, 49.4], squash: tt => tt > 42 && tt < 47.4 ? 0.06 : 0 })
    if (t > 42 && t < 47.4) for (let i = 0; i < 3; i++) { const ph = (t * 1.5 + i / 3) % 1; x.fillStyle = '#8fe3ff'; x.globalAlpha = 1 - ph; x.fillRect(360 + i * 14, 1060 + ph * 80, 8, 12); x.globalAlpha = 1 }
    S.bubble(x, t, 640, 930, 42.0, 43.8, 'so what do YOU like?', { size: 34, col: '#fff1a8', tail: 0.1 })
    S.bubble(x, t, 820, 930, 44.0, 45.8, 'any hobbies? secrets?', { size: 34, col: '#e7d4ff', tail: 0.1 })
    S.bubble(x, t, 330, 930, 46.0, 49.2, 'I like… soup.', { size: 40, tail: -0.2 })
  }
  // ── CH5 the first fight
  if (t >= 53 && t < 65) {
    act(x, t, S, { id: 'scorpio', x: 300, s: 220, moods: [[53, 'neutral', [1, 0]], [56.6, 'neutral', [0, 1]], [61, 'squint', [0, 1]]], hops: [] })
    act(x, t, S, { id: 'libra', x: [[53, 760], [60.6, 760], [61.6, 900]], s: 210, moods: [[53, 'neutral', [-1, 0]], [56.6, 'neutral', [0, 1]]], hops: [54, 60.6] })
    S.bubble(x, t, 760, 930, 54.0, 57.4, "I don't know what you're thinking. ever.", { size: 32, col: '#ffd9f4', tail: 0.2, maxW: 520 })
    S.txt(x, '. . .', 300, 980, { size: 60, col: BONE, alpha: t > 57.6 && t < 60.4 ? 0.5 + 0.5 * Math.sin(t * 6) : 0 })
  }
  // ── CH6 the final boss
  if (t >= 65 && t < 79) {
    const rise = ease.outCubic(prog(t, 65.2, 65.8))
    act(x, t, S, { id: 'scorpio', x: 300, s: 230, moods: [[65, 'squint', [1, 0]], [69.4, 'wide', [1, 0]], [74, 'heart', [1, 0]]], hops: [...HITS, 74.4, 76.4], rot: tt => HITS.some(h => tt > h - 0.2 && tt < h) ? -0.15 : 0 })
    act(x, t, S, { id: 'libra', x: 800, s: 220, moods: [[65, 'neutral', [-1, 0]], [70, 'wide', [-1, 0]], [74, 'heart', [-1, 0]]], hops: [74.2, 76.4] })
    if (t < 74.4) bossBar(x, t, S, rise * 0.9)
    HITS.forEach((h, i) => S.txt(x, ['I', 'like', 'you.'][i], 540, 760, { size: 150, col: GOLD, scale: pop01(t, h, 0.2, 3) * outK(t, i === 2 ? [h + 0.7, h + 0.9] : [h + 1.6, h + 1.9]), rot: [-0.05, 0.04, -0.03][i] }))
    S.stamp(x, 'K.O.', 540, 960, pop01(t, 74.7, 0.2, 3) * outK(t, [75.8, 76.0]), { size: 120, col: GOLD, rot: -0.08, fillc: 'rgba(16,10,40,0.85)' })
    S.bubble(x, t, 760, 930, 76.0, 78.8, "I like you too. that's all I wanted to hear.", { size: 32, col: '#ffd9f4', tail: 0.2, maxW: 520 })
  }
  // ── CH7 100%
  if (t >= 79) {
    act(x, t, S, { id: 'scorpio', x: 380, s: 230, moods: [[79, 'happy', [1, 0]], [79.6, 'heart', [1, 0]]], hops: [79.6, 79.9, 80.2, 83.6] })
    act(x, t, S, { id: 'libra', x: 720, s: 220, moods: [[79, 'heart', [-1, 0]]], hops: [79.7, 80.0, 84.4] })
    for (let i = 0; i < 30; i++) { if (t < 79.6) break; const p = ((t - 79.6) * 0.35 + i / 30) % 1; x.fillStyle = [GOLD, PINK, '#7fd0ff', GREEN, BONE][i % 5]; x.fillRect((i * 97) % 1080, 600 + p * 720, 14, 9) }
    S.bubble(x, t, 720, 930, 82.0, 84.2, 'say it again?', { size: 38, col: '#ffd9f4', tail: 0.2 })
    S.bubble(x, t, 380, 930, 84.4, LAST_T - 0.2, "don't push it. (I like you.)", { size: 32, tail: -0.2 })
  }
}
function over(x, t, S) {
  // frame 0: the boss bar slams in
  if (t < 2.7) bossBar(x, t, S, (t < 0.25 ? 1.2 - t * 0.8 : 1) * outK(t, [2.4, 2.7]))
  if (t > 2.9 && t < 6.2) {
    const k = pop01(t, 2.9, 0.3, 2.6) * outK(t, [5.7, 6.0])
    x.save(); x.translate(540, 790); x.rotate(-0.03); x.scale(k, k)
    S.pbox(x, -440, -110, 880, 220, 'rgba(16,10,40,0.94)', { b: 8 })
    x.fillStyle = RED; x.fillRect(-432, -102, 864, 8)
    x.font = `900 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('6 stages. then the boss.', 0, -30)
    x.font = `700 32px 'Space Mono', monospace`; x.fillStyle = GOLD; x.letterSpacing = '3px'; x.fillText('stay for the boss fight.', 0, 48)
    x.restore()
  }
  S.stamp(x, '100%', 540, 820, pop01(t, 79.6, 0.25, 3) * outK(t, [81.6, 81.9]), { size: 150, col: GOLD, rot: -0.06, fillc: 'rgba(16,10,40,0.85)' })
  sparkles(x, t, 540, 820, 79.65, 14, 360, 1, [GOLD, BONE, PINK])
}
const HOOK = { at: -1, text: 'THE FINAL BOSS | *is three words.*', top: 600, size: 108, out: [2.6, 2.85] }
const SHK = { at: 0.05, len: 0.5, amp: 26 }
const GL = { at: 58.4, len: 1.6, text: 'SCORPIO.EXE is *not responding*', buttons: ['WAIT', 'SAY SOMETHING'] }
const ACH1 = { at: 14.0, out: [16.4, 16.65], text: 'blinked. *finally.*', y: 1540 }
const ACH2 = { at: 49.4, out: [52.2, 52.45], title: 'RARE ACHIEVEMENT', text: 'Scorpio *shared a fact*', y: 1540 }
const ACH3 = { at: 80.4, out: [LAST_T - 0.4, LAST_T - 0.15], title: '100% COMPLETE', text: 'final boss: *beaten*', y: 1540 }
const LAST = { at: LAST_T, text: 'Final boss: three words. | *Beaten.*', top: 600, size: 96 }
const EP = makeRun({
  id: 'ksre19', duration: D, runner: 'scorpio', category: '100% · BOSS RUN',
  fx: [['slamTitle', HOOK, true], ['screenShake', SHK], ...chapterFx(CH), ['glitch', GL], ...HITS.map(h => ['screenShake', { at: h, len: 0.45, amp: 26 }]), ['achievement', ACH1], ['achievement', ACH2], ['achievement', ACH3], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, ending: { type: 'cut' },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES,
  ...SPLITS.map(s => ['bell', s.at, s.state === 'red' ? 440 : 1760, 0.04, 0.9, 0.2]), ...SPLITS.map((s, i) => ['pop', s.at, 1174.66 * (1 + i * 0.06), 0.04, 0.2]),
  ['tom', 0.02, 80, { gain: 0.32, decay: 0.4 }], ['whoosh', 0, 0.5, 0.06], ['bell', 2.95, 1318.51, 0.04, 1, 0],
  ['pop', 10.8, 1174.66, 0.04, 0.3], ['tick', 13.2, 0.06], ['pop', 13.4, 987.77, 0.04, -0.3],
  ['pop', 18.2, 880, 0.04, 0.3], ['pop', 20.6, 1318.51, 0.05, -0.3], ['pop', 21.4, 1318.51, 0.04, -0.3], ['pop', 23.4, 880, 0.04, 0.3],
  ...Array.from({ length: 6 }, (_, i) => ['pop', +(29 + i * 0.9).toFixed(2), 987.77 * (1 + (i % 3) * 0.1), 0.035, -0.2]), ['pop', 34.6, 1318.51, 0.045, 0.3], ['pluck', 37.2, 293.66, 0.04, 0.4, 0],
  ['pop', 42, 1174.66, 0.04, 0.2], ['pop', 44, 1318.51, 0.04, 0.3], ['pop', 46, 880, 0.04, -0.3], ['glitter', 49.4, 50.2],
  ['pop', 54, 987.77, 0.04, 0.3], ['pluck', 57.6, 261.63, 0.05, 0.8, 0],
  ['riser', 65.2, 69.4, 0.04], ...HITS.flatMap((h, i) => [['tom', h, 70 + i * 15, { gain: 0.34, decay: 0.4 }], ['pop', h, 1174.66 * (1 + i * 0.12), 0.05, 0]]), ['bell', 74, 1760, 0.06, 1.4, 0], ['glitter', 74, 75], ['pop', 75.6, 1318.51, 0.045, 0.3],
  ['bell', 79.6, 1760, 0.06, 1.4, 0], ['glitter', 79.6, 80.6], ['pop', 82, 1174.66, 0.04, 0.3], ['pop', 84.4, 1318.51, 0.04, -0.3],
]
void [MONO, BLUE]
