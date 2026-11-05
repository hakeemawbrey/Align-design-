// ksre16: FALLING IN LOVE: SPEEDRUN · Cancer: 100% (80 s vertical, star_talk post, Month 2 boost m03, long)
// music: dreamy · E. Hard cut. No end card, no card cut. Kits: ../../ksre01/srkit.js, ../lkit.js.
// The 100% run: every stage, the friends and the first fight included. A promise up front ("stay for the final split"),
// chapter stickers, a new beat every 3–4 s.
//   0.0   frame 0: Cancer mid-trip over the 100% banner, cookies flying; "CANCER IS GOING | for 100%."
//   2.9   the promise: "100% means EVERYTHING. stay for the final split."
//   6.0   CH1 EYE CONTACT: looks, hides behind a tree, peeks, "hi!" "hi!!"
//   16.0  CH2 FIRST TEXT: a paragraph… deleted… "hi :)" · a dog photo comes back · Cancer melts
//   26.0  CH3 FIRST DATE: a tin of homemade cookies · "you MADE these?" · achievement
//   36.0  CH4 MEET THE FRIENDS: a tray for everyone · score cards 10 / 10 / 11 · "can we keep them?"
//   46.0  CH5 FIRST FIGHT: "omg I forgot about tonight" · "it's fine." (it was not fine) · into the shell · loading bar
//   57.0  CH6 THE TALK: "I felt forgotten tonight." · "you're right. I'm sorry." · "thank you for telling me."
//   68.0  CH7 100%: every split gold, the timer stops · "same time next week?" "I'll bake." · 78.4 last line · cut 80.
import { makeRun, fmtClock, runAt, shake, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, drawBits, drawPhone, sparkles } from '../../ksre01/srkit.js'
import { act, chapterFx, chapterAt, tween } from '../lkit.js'

const D = 80
const CH = [
  { t: 6, n: 1, title: 'eye contact', theme: 'park', split: 14.5 },
  { t: 16, n: 2, title: 'the first text', theme: 'room', split: 24.5 },
  { t: 26, n: 3, title: 'the first date', theme: 'cafe', split: 34.5 },
  { t: 36, n: 4, title: 'meet the friends', theme: 'party', split: 44.5 },
  { t: 46, n: 5, title: 'the first fight', theme: 'night', split: 56.6 },
  { t: 57, n: 6, title: 'the talk', theme: 'night', split: 65.8 },
  { t: 68, n: 7, title: '100%', theme: 'street', split: 69.0 },
]
const NAMES = ['EYE CONTACT', 'FIRST TEXT', 'FIRST DATE', 'MEET THE FRIENDS', 'FIRST FIGHT', 'THE TALK', '100%']
const SPLITS = CH.map((c, i) => ({ name: NAMES[i], at: c.split, time: i === 4 ? 'ROUGH' : fmtClock(c.split, { cs: false }), state: i === 4 ? 'red' : 'gold', delta: i === 6 ? 'PB' : '' }))
const LAST_T = 78.4
const timer = t => ({ text: fmtClock(t < 69 ? t + 0.6 : 69.6), col: t > 69 ? GOLD : t > 48.6 && t < 65.8 ? RED : GREEN, sub: t < 69 ? `100% · CHAPTER ${chapterAt(CH, t).t <= t && t >= 6 ? chapterAt(CH, t).n : 0}/7` : '100% COMPLETE', subCol: t > 69 ? GOLD : undefined })
const cam = t => {
  if (t > 9.6 && t < 12) return { mood: 'sparkle', tears: 3, look: [-1, 0.8], say: 'they LOOKED', sayAt: 9.6, sayEnd: 11.8, sayX: 690, sayY: 650 }
  if (t > 22 && t < 24.5) return { mood: 'heart', tears: 3, look: [-1, 0.8], say: 'THE DOG', sayAt: 22.2, sayEnd: 24.3, sayX: 700, sayY: 650 }
  if (t > 52 && t < 55) return { mood: 'wide', tears: 3, look: [-1, 0.8], say: 'use your WORDS', sayAt: 52, sayEnd: 54.8, sayX: 690, sayY: 650 }
  if (t > 69) return { mood: 'happy', tears: 3, look: [-1, 0.6], hops: [69, 70, 71, 72.5] }
  if (t > 46 && t < 57) return { mood: 'wide', tears: 3, look: [-1, 0.8], shake: 2 }
  return { mood: t < 6 ? 'wide' : 'sparkle', tears: t < 6 ? 2 : 2, look: [-1, 0.8] }
}
const COOKIE = ['.CCCC.', 'CCDCCC', 'CCCCDC', 'CDCCCC', '.CCCC.']
const cookie = (x, cx, cy, cell = 7, rot = 0) => drawBits(x, COOKIE, { C: '#d9a066', D: '#5a3a2a' }, cx, cy, cell, { rot })
const TREE = ['..GGGG..', '.GGGGGG.', 'GGGGGGGG', 'GGGGGGGG', '.GGGGGG.', '...BB...', '...BB...', '...BB...']
function shell(x, cx, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, 1300); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 150, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#3fb6f0'; x.beginPath(); x.ellipse(0, 0, 140, 140, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#2a86c0'; for (let i = -2; i <= 2; i++) { x.fillRect(i * 50 - 6, -120 + Math.abs(i) * 30, 12, 120 - Math.abs(i) * 30) }
  x.restore()
}

function world(x, t, S) {
  const ch = t < 6 ? { theme: 'street' } : chapterAt(CH, t)
  S.level(x, t, { theme: ch.theme, floor: 1300, scroll: t < 6 ? t * 300 : 0 })
  // ── the hook + the promise (0–6)
  if (t < 6) {
    // the 100% banner Cancer trips over
    x.fillStyle = INK; x.fillRect(560, 1150, 360, 150); x.fillStyle = GOLD; x.fillRect(568, 1158, 344, 134)
    x.font = `900 92px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('100%', 740, 1228)
    const trip = t < 1.4 ? t / 1.4 : 1
    const cx = t < 1.4 ? lerp(470, 400, trip) : 400, rot = t < 1.4 ? 0.7 - trip * 0.7 : 0
    act(x, t, S, { id: 'cancer', x: cx, y: t < 1.4 ? 1080 + 90 * trip : 1170, s: 240, moods: [[0, 'wide', [1, -0.5]], [1.6, 'happy', [1, 0]], [3, 'sparkle', [0, 0]]], hops: [1.4, 1.7, 3.1, 4.2], rot: () => rot })
    // cookies flying (frame 0: mid-air)
    for (let i = 0; i < 6; i++) { const p = clamp(0.25 + t * 0.6 + i * 0.04), px = 420 + (i - 2.5) * 110 * (1 + p), py = 960 - 260 * Math.sin(Math.PI * p) + 300 * p * p; if (p < 1) cookie(x, px, py, 8, t * 4 + i) }
  }
  // ── CH1 eye contact (6–16)
  if (t >= 6 && t < 16) {
    drawBits(x, TREE, { G: '#4fc06a', B: '#8a5a3c' }, 170, 1140, 30)
    const hide = t > 8.0 && t < 10.4
    act(x, t, S, { id: 'cancer', x: [[6, 340], [8.0, 340], [8.3, 170], [10.4, 170], [10.8, 300]], s: 220, moods: [[6, 'neutral', [1, 0]], [6.4, 'sparkle', [1, 0]], [7.6, 'wide', [1, 0]], [8.3, 'wide', [1, 0]], [10.6, 'sparkle', [1, 0]], [12.8, 'happy', [1, 0]]], hops: [6.4, 8.0, 10.6, 12.8, 13.1, 14.5], blush: 1 })
    if (hide) { x.save(); x.fillStyle = '#8a5a3c'; x.fillRect(140, 1150, 60, 150); x.restore(); drawBits(x, TREE.slice(0, 5), { G: '#4fc06a' }, 170, 1080, 30) }
    act(x, t, S, { id: 'taurus', x: 820, s: 220, moods: [[6, 'neutral', [0, -0.6]], [7.6, 'happy', [-1, 0]], [11.6, 'sparkle', [-1, 0]]], hops: [7.6, 11.6, 14.5] })
    S.bubble(x, t, 820, 960, 11.6, 13.6, 'hi!', { size: 44, col: '#ffe0b8', tail: 0 })
    S.bubble(x, t, 330, 960, 12.8, 15.2, 'hi!!', { size: 44, tail: 0 })
    S.stamp(x, 'HIDING', 260, 900, pop01(t, 8.3, 0.2, 2.8) * outK(t, [10.1, 10.3]), { size: 50, col: RED, rot: -0.1 })
  }
  // ── CH2 the first text (16–26)
  if (t >= 16 && t < 26) {
    const draft = 'hey!! I just wanted to say that I really enjoyed seeing you at the park and I hope'
    const msgs = [...(t > 20 ? [{ at: 20, side: 'R', text: 'hi :)' }] : []), ...(t > 22 ? [{ at: 22, side: 'L', text: 'hi!! this is my dog, Pickle' }] : [])]
    drawPhone(x, t, { cx: 640, top: 760, w: 600, h: 500, title: '♉︎ Taurus', msgs, font: 30, typing: [21, 22] })
    if (t > 22.2) drawBits(x, ['.........DD.', '........BBBB', 'B......BBEBB', 'BB....BBBBBN', '.BBBBBBBBBB.', '.BBBBBBBBB..', '.B.B...B.B..'], { B: '#c9a07a', D: '#8a5a3c', E: INK, N: INK }, 560, 1000, 12 * pop01(t, 22.2, 0.3, 2.4))
    if (t < 20) {
      const n = t < 18.6 ? Math.floor(clamp((t - 16.4) / 2.0) * draft.length) : Math.floor(draft.length * (1 - clamp((t - 18.8) / 0.6)))
      const s = t > 19.4 ? 'hi :)'.slice(0, Math.floor(clamp((t - 19.4) / 0.4) * 5)) : draft.slice(0, n)
      S.pbox(x, 360, 1190, 620, 90, '#f4eefc', { b: 6 })
      x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK
      const vis = s.length > 36 ? '…' + s.slice(-35) : s
      x.fillText(vis, 380, 1236)
      S.stamp(x, 'TOO MUCH?', 670, 900, pop01(t, 18.4, 0.2, 2.8) * outK(t, [19.2, 19.4]), { size: 50, col: RED, rot: 0.06 })
    }
    act(x, t, S, { id: 'cancer', x: 200, s: 200, moods: [[16, 'squint', [1, -0.4]], [18.6, 'wide', [1, -0.4]], [20, 'neutral', [1, -0.4]], [22.2, 'heart', [1, -0.4]]], hops: [20, 22.3, 22.6, 23.0, 24.5], squash: tt => tt > 23 && tt < 24.5 ? 0.12 : 0 })
  }
  // ── CH3 the first date (26–36)
  if (t >= 26 && t < 36) {
    x.fillStyle = INK; x.fillRect(380, 1150, 320, 20); x.fillRect(530, 1168, 20, 132); x.fillStyle = '#c9855a'; x.fillRect(386, 1154, 308, 10)
    // the cookie tin
    const tk = pop01(t, 27.6, 0.3, 2.4)
    if (tk > 0.01) { x.save(); x.translate(lerp(380, 560, ease.inOutCubic(prog(t, 27.6, 28.4))), 1116); x.scale(tk, tk); x.fillStyle = INK; x.fillRect(-64, -40, 128, 72); x.fillStyle = '#ff8fb1'; x.fillRect(-58, -34, 116, 60); x.fillStyle = GOLD; x.fillRect(-58, -12, 116, 10); x.restore() }
    if (t > 29) for (let i = 0; i < 3; i++) cookie(x, 520 + i * 40, 1070 - (t > 32 && i === 2 ? 400 : 0) * prog(t, 32, 32.4), 6)
    act(x, t, S, { id: 'cancer', x: 260, s: 220, moods: [[26, 'happy', [1, 0]], [29.2, 'wide', [1, 0]], [30.8, 'happy', [1, 0]], [32.2, 'heart', [1, 0]]], hops: [27.6, 30.8, 32.4, 34.5], blush: 1 })
    act(x, t, S, { id: 'taurus', x: 820, s: 220, moods: [[26, 'happy', [-1, 0]], [29.2, 'sparkle', [-1, 0]], [32.2, 'heart', [-1, 0]]], hops: [29.2, 32.2, 32.5] })
    S.bubble(x, t, 330, 950, 27.0, 28.9, 'I made you something!', { size: 34, tail: -0.2 })
    S.bubble(x, t, 760, 950, 29.2, 30.6, 'you MADE these?', { size: 38, col: '#ffe0b8', tail: 0.2 })
    S.bubble(x, t, 330, 950, 30.8, 32.0, "it's nothing.", { size: 38, tail: -0.2 })
    S.bubble(x, t, 760, 950, 32.2, 35.6, 'best cookie of my life.', { size: 36, col: '#ffe0b8', tail: 0.2 })
  }
  // ── CH4 meet the friends (36–46)
  if (t >= 36 && t < 46) {
    act(x, t, S, { id: 'leo', x: 640, s: 170, y: 1200, moods: [[36, 'neutral', [-1, 0]], [38, 'sparkle', [-1, 0]]], hops: [38, 40.5] })
    act(x, t, S, { id: 'sagittarius', x: 800, s: 170, y: 1200, moods: [[36, 'neutral', [-1, 0]], [38, 'happy', [-1, 0]], [42.5, 'heart', [-1, 0]]], hops: [38.2, 40.7, 42.5] })
    act(x, t, S, { id: 'aquarius', x: 960, s: 170, y: 1200, moods: [[36, 'neutral', [-1, 0]], [38.4, 'wide', [-1, 0]], [40.5, 'happy', [-1, 0]]], hops: [38.4, 40.9] })
    act(x, t, S, { id: 'taurus', x: 470, s: 190, moods: [[36, 'happy', [-1, 0]]], hops: [37, 44.5] })
    act(x, t, S, { id: 'cancer', x: [[36, -150], [37.2, 230]], s: 210, moods: [[36, 'happy', [1, 0]], [42.5, 'heart', [1, 0]]], hops: [37.2, 38, 42.6, 44.5], blush: 1 })
    // the huge tray
    const tx = tween([[36, -150], [37.2, 230]], t)
    x.fillStyle = INK; x.fillRect(tx - 120, 1040, 240, 20); x.fillStyle = '#c9c0ef'; x.fillRect(tx - 114, 1044, 228, 10)
    for (let i = 0; i < 7; i++) cookie(x, tx - 96 + i * 32, 1026 - (i % 2) * 14, 5)
    S.bubble(x, t, 300, 900, 37.4, 40.2, 'I made enough for everyone!', { size: 32, tail: -0.3 })
    // score cards
    ;[[640, '10'], [800, '10'], [960, '11']].forEach(([cx, s], i) => { const k = pop01(t, 40.5 + i * 0.2, 0.25, 2.8) * outK(t, [42.2, 42.4]); if (k > 0.01) { x.save(); x.translate(cx, 1010); x.scale(k, k); S.pbox(x, -56, -46, 112, 92, BONE, { b: 6 }); x.font = `900 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = i === 2 ? RED : INK; x.fillText(s, 0, 4); x.restore() } })
    S.bubble(x, t, 760, 960, 42.5, 45.4, 'can we keep them?', { size: 36, col: '#e7d4ff', tail: 0.2 })
  }
  // ── CH5 the first fight (46–57)
  if (t >= 46 && t < 57) {
    const sh = clamp(prog(t, 50.8, 51.3)) * (1 - clamp(prog(t, 56.6, 57)))
    act(x, t, S, { id: 'cancer', x: 400, s: 220, y: tween([[46, 1170], [50.8, 1170], [51.3, 1240]], t), moods: [[46, 'happy', [1, -0.6]], [46.8, 'wide', [1, -0.6]], [48.6, 'neutral', [0, 0]], [50.8, 'sleepy', [0, 0]]], hops: [46.8, 48.6], squash: tt => tt > 50.8 ? 0.2 : 0 })
    shell(x, 400, pop01(t, 50.8, 0.3, 2.2) * (sh > 0 ? 1 : 0))
    if (t < 50.8) drawPhone(x, t, { cx: 740, top: 860, w: 300, h: 380, s: 1, title: '♉︎ Taurus', msgs: [{ at: 46.6, side: 'L', text: 'omg I forgot about tonight, so sorry' }], font: 24 })
    S.bubble(x, t, 400, 950, 48.6, 50.4, "it's fine.", { size: 42, tail: 0 })
    S.stamp(x, 'IT WAS NOT FINE', 540, 820, pop01(t, 49.6, 0.2, 2.8) * outK(t, [51.4, 51.6]), { size: 56, col: RED, rot: -0.06 })
    S.stamp(x, 'CANCER WENT QUIET', 540, 820, pop01(t, 51.6, 0.2, 2.8) * outK(t, [53.0, 53.2]), { size: 50, col: BLUE, rot: 0.05 })
  }
  // ── CH6 the talk (57–68)
  if (t >= 57 && t < 68) {
    act(x, t, S, { id: 'cancer', x: 360, s: 220, moods: [[57, 'neutral', [1, 0]], [58.6, 'neutral', [1, 0]], [61.2, 'wide', [1, 0]], [63.6, 'happy', [1, 0]], [65.8, 'heart', [1, 0]]], hops: [58.0, 58.6, 63.8, 65.8, 66.2] })
    act(x, t, S, { id: 'taurus', x: [[57, 1180], [58.2, 740]], s: 220, moods: [[57, 'neutral', [-1, 0]], [61.2, 'neutral', [-1, 0.4]], [63.6, 'happy', [-1, 0]], [65.8, 'heart', [-1, 0]]], hops: [58.2, 61.2, 63.6, 65.8, 66.2] })
    S.bubble(x, t, 380, 950, 58.6, 61.0, 'I felt forgotten tonight.', { size: 38, tail: -0.2 })
    S.bubble(x, t, 720, 950, 61.2, 63.4, "you're right. I'm sorry.", { size: 36, col: '#ffe0b8', tail: 0.2 })
    S.bubble(x, t, 720, 950, 63.6, 66.4, 'thank you for telling me.', { size: 36, col: '#ffe0b8', tail: 0.2 })
    if (t > 65.8) S.heartBits(x, 550, 980 - 50 * prog(t, 65.8, 67), 10, PINK, outK(t, [67, 67.6]))
  }
  // ── CH7 100% (68–80)
  if (t >= 68) {
    act(x, t, S, { id: 'cancer', x: 380, s: 230, moods: [[68, 'happy', [1, 0]], [69, 'heart', [1, 0]], [74.5, 'sparkle', [1, 0]]], hops: [69, 69.3, 69.6, 72.6, 74.5] })
    act(x, t, S, { id: 'taurus', x: 720, s: 220, moods: [[68, 'happy', [-1, 0]], [69, 'heart', [-1, 0]]], hops: [69.1, 69.4, 72.5] })
    for (let i = 0; i < 30; i++) { const p = ((t - 68.9) * 0.35 + i / 30) % 1; if (t < 68.9) break; x.fillStyle = [GOLD, PINK, '#7fd0ff', GREEN, BONE][i % 5]; x.fillRect((i * 97) % 1080, 600 + p * 720, 14, 9) }
    S.bubble(x, t, 720, 950, 72.5, 74.4, 'same time next week?', { size: 36, col: '#ffe0b8', tail: 0.2 })
    S.bubble(x, t, 380, 950, 74.5, LAST_T - 0.2, "I'll bake.", { size: 42, tail: -0.2 })
  }
}
function over(x, t, S) {
  // the promise (2.9–6)
  if (t > 2.9 && t < 6.2) {
    const k = pop01(t, 2.9, 0.3, 2.6) * outK(t, [5.7, 6.0])
    x.save(); x.translate(540, 790); x.rotate(-0.03); x.scale(k, k)
    S.pbox(x, -440, -110, 880, 220, 'rgba(16,10,40,0.94)', { b: 8 })
    x.fillStyle = GOLD; x.fillRect(-432, -102, 864, 8)
    x.font = `900 56px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('100% means EVERYTHING.', 0, -30)
    x.font = `700 32px 'Space Mono', monospace`; x.fillStyle = GOLD; x.letterSpacing = '3px'; x.fillText('stay for the final split.', 0, 48)
    x.restore()
  }
  S.stamp(x, '100%', 540, 820, pop01(t, 69, 0.25, 3) * outK(t, [71.2, 71.5]), { size: 150, col: GOLD, rot: -0.06, fillc: 'rgba(16,10,40,0.85)' })
  sparkles(x, t, 540, 820, 69.05, 14, 360, 1, [GOLD, BONE, PINK])
}
const HOOK = { at: -1, text: 'CANCER IS GOING | *for 100%.*', top: 620, size: 112, out: [2.6, 2.85] }
const SHK = { at: 0.35, len: 0.5, amp: 24 }
const NOTIF = { at: 46.6, out: [48.4, 48.6], title: 'texts', body: 'Taurus: omg I *forgot* about tonight', glyph: '♉', time: 'now', y: 600 }
const LOAD = { at: 53.2, len: 3.2, label: 'saying how I feel…', stallAt: 99, error: null, y: 840 }
const ACH1 = { at: 33.0, out: [35.6, 35.85], text: 'brought *snacks* to a first date', y: 1540 }
const ACH2 = { at: 70.0, out: [LAST_T - 0.4, LAST_T - 0.15], title: '100% COMPLETE', text: 'every split. *every feeling.*', y: 1540 }
const LAST = { at: LAST_T, text: 'Hundred percent. | *No feelings skipped.*', top: 620, size: 100 }
const EP = makeRun({
  id: 'ksre16', duration: D, runner: 'cancer', category: '100%',
  fx: [['slamTitle', HOOK, true], ['screenShake', SHK], ...chapterFx(CH), ['notification', NOTIF], ['loadingBar', LOAD], ['achievement', ACH1], ['achievement', ACH2], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, over, ending: { type: 'cut' },
  camera: t => ({ zoom: 1, dx: shake(t, 1.4, 16) + shake(t, 50.8, 10) }),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [
  ...EP.CUES,
  ...SPLITS.map(s => ['bell', s.at, s.state === 'red' ? 440 : 1760, 0.04, 0.9, 0.2]), ...SPLITS.map((s, i) => ['pop', s.at, 1174.66 * (1 + i * 0.06), 0.04, 0.2]),
  ['tom', 1.4, 100, { gain: 0.28, decay: 0.3 }], ['pop', 0.1, 1318.51, 0.04, -0.3], ['pop', 0.25, 1567.98, 0.04, 0.3], ['bell', 2.95, 1318.51, 0.04, 1, 0],
  ['whoosh', 8.0, 0.35, 0.05], ['pop', 10.6, 987.77, 0.035, -0.3], ['pop', 11.6, 1174.66, 0.04, 0.3], ['pop', 12.8, 1318.51, 0.04, -0.3],
  ...Array.from({ length: 20 }, (_, i) => ['tick', +(16.4 + i * 0.1).toFixed(2), 0.025]), ['pluck', 18.6, 330, 0.04, 0.4, 0], ['pop', 20, 1318.51, 0.05, 0.3], ['pop', 22, 1174.66, 0.05, -0.3], ['glitter', 22.2, 22.8],
  ['pop', 27.6, 880, 0.04, 0], ['pop', 29.2, 1318.51, 0.045, 0.3], ['pop', 32.2, 1567.98, 0.045, 0.3],
  ['whoosh', 36.2, 0.6, 0.05], ...[0, 0.2, 0.4].map(d => ['pop', 40.5 + d, 1318.51 + d * 500, 0.045, 0.2]), ['pop', 42.5, 1174.66, 0.04, 0.3],
  ['pluck', 48.6, 293.66, 0.05, 0.5, 0], ['tom', 50.8, 90, { gain: 0.25, decay: 0.3 }], ['pluck', 52, 440, 0.035, 0.5, 0.4], ['pluck', 52.2, 415.3, 0.035, 0.5, 0.4],
  ['whoosh', 57.6, 0.4, 0.04], ['pop', 58.6, 880, 0.04, -0.2], ['pop', 61.2, 987.77, 0.04, 0.2], ['pop', 63.6, 1174.66, 0.04, 0.2], ['glitter', 65.8, 66.6],
  ['bell', 69, 1760, 0.06, 1.4, 0], ['bell', 69.12, 2349.32, 0.04, 1.4, 0], ['glitter', 69, 70.2], ['pop', 72.5, 1174.66, 0.04, 0.3], ['pop', 74.5, 1318.51, 0.045, -0.3],
]
void [MONO, runAt, lerp]
