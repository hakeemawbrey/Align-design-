// kzce20: ZODIAC COURTROOM, "The People v. The Situationship" (90 s vertical, Month 2 boost m06 #20, long, synthwave · Cm). Hard cut.
//   0.0   frame 0: a fog cloud with a "?" in the dock, gavel mid-slam; whip in, 0.2 colour flash.
//         Hook: "Five months. No label. | *Court is in session.*"   3.2 the promise: "Stay for *the talk.*"
//   CH.1 OPENING (5.4): JUDGE: "Libra v. the *situationship.*" · ♎ plaintiff: "five months of 'hanging out a *lot.*'" ·
//         "we have *inside jokes!*" · "but no *label.*" (gasp) · THE SITUATIONSHIP: "it's just *vibes.*" · "labels are so *scary.*"
//   CH.2 THE EVIDENCE (22.0): A five months of Fridays, every one "hang out?" · B the chat: plus-one to the wedding?
//         "…am I *your* plus-one?" · "haha we'll see" (gasp) · C a toothbrush. at their place. (gasp)
//   CH.3 WITNESSES (42.0): the group chat (♊ ♐ ♒): "we've been asking for *months.*" · "we made a *poll.*" ·
//         surprise witness THE EX: "I was in one of these *once.*" · "ask. I wish I *had.*" · "the answer can be scary.
//         not knowing is *worse.*"
//   CH.4 CLOSING (60.0): LIBRA: "…I want to know what we *are.*" · "even if the answer is *no.*"
//   CH.5 THE VERDICT (70.0): JUDGE: "the court orders… *the talk.*" · THE TALK stamp (ORDERED) · a talk card lands:
//         "What are we doing?" · 76.4 the fog clears: it was ♑ Capricorn all along · LIBRA: "so… what are we doing?" ·
//         ♑: "…I was hoping you'd *ask.*" · "I'd like to be *together.*" (gasp, hearts) · JUDGE: "case *closed.*" (gavel)
//   88.2  last line "Ask the question. | Hear the *answer.*" holds to 90.0, hard cut.   Pisces cries the whole trial.
import { makeCourt, drawChat, star, label, box, R, drawBits, clamp, prog, ease, INK, RED, GOLD, PINK, popWords } from '../../kzce01/scenes/courtkit.js'

const seq = (t, list) => { let v = list[0][1]; for (const [a, m] of list) if (t >= a) v = m; return v }
const T = { lib: 7.8, fog2: 15.6, evA: 22.4, evB: 29.0, evC: 35.8, gc: 42.2, wit: 48.8, close: 60.0, order: 70.4, talk: 71.0, card: 72.0, clear: 76.4, ask: 77.0, adj: 86.6, last: 88.2 }
const CH = [
  { at: 5.4, out: [21.7, 22.0], title: 'OPENING STATEMENTS' }, { at: 22.0, out: [41.7, 42.0], title: 'THE EVIDENCE' },
  { at: 42.0, out: [59.7, 60.0], title: 'THE WITNESSES' }, { at: 60.0, out: [69.7, 70.0], title: 'CLOSING' }, { at: 70.0, out: [87.9, 88.2], title: 'THE VERDICT' },
]
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const FOG = { color: '#b8b3d6', glyph: null, tag: '? THE SITUATIONSHIP', tagColor: '#cfc9ee' }
function fog(x, t, cx, cy, k = 1, clear = 0) {
  x.save(); x.globalAlpha *= (1 - clear)
  for (let i = 0; i < 11; i++) {
    const a = i / 11 * Math.PI * 2 + t * 0.3, r = 95 + 25 * Math.sin(i * 2.3 + t) + clear * 300
    const px = cx + Math.cos(a) * r * 1.2, py = cy + Math.sin(a) * r * 0.6, rr = (70 + 20 * Math.sin(i + t * 1.5)) * k
    x.fillStyle = i % 2 ? 'rgba(200,196,230,0.82)' : 'rgba(170,165,210,0.82)'; x.beginPath(); x.arc(px, py, rr, 0, 6.3); x.fill()
  }
  x.fillStyle = 'rgba(214,210,240,0.92)'; x.beginPath(); x.ellipse(cx, cy, 150 * k, 105 * k, 0, 0, 6.3); x.fill()
  if (clear < 0.3) label(x, '?', cx, cy + 6, { size: 150 * k, col: '#5a5480', weight: 900, shadow: false, alpha: 1 - clear * 3 })
  x.restore()
}
function couple(x, t) {
  const cl = clamp(prog(t, T.clear, T.clear + 1.4))
  const lM = seq(t, [[0, 'neutral'], [T.ask, 'neutral'], [79.6, 'wide'], [82.2, 'heart']])
  const cM = seq(t, [[0, 'neutral'], [79.6, 'happy'], [82.2, 'heart']])
  star(x, t, { x: 165, y: 1080, s: 200 }, { who: 'libra', mood: lM, look: [1, -0.2], seed: 91, hops: [T.ask + 0.1, T.ask + 0.5, 82.4, 82.8] })
  star(x, t, { x: 400, y: 1080, s: 200, pop: clamp(cl * 1.6) }, { who: 'capricorn', mood: cM, look: [-1, -0.2], seed: 93, hops: [79.7, 80.1, 82.3, 82.7] })
  if (cl < 1) fog(x, t, 400, 1060, 0.9, cl)
  if (t > 82.3) for (let i = 0; i < 7; i++) { const ph = ((t - 82.3) * 0.55 + i / 7) % 1; drawBits(x, HEART, { H: i % 2 ? PINK : '#ff4f86' }, 280 + Math.sin(i * 2.1 + t * 2) * 140, 1000 - ph * 320, 6, { alpha: 1 - ph }) }
}
function groupChat(x, t) {
  ;[['gemini', 150, 1060], ['sagittarius', 280, 1040], ['aquarius', 410, 1060]].forEach(([id, px, py], i) =>
    star(x, t, { x: px, y: py, s: 140 }, { who: id, mood: t < 45 ? 'squint' : 'happy', look: [1, -0.3], seed: 95 + i, hops: i === 1 ? [42.5, 42.9, 45.1, 45.5] : [] }))
}
function talkCard(x, t) {
  if (t < T.card || t > 76.3) return
  const k = ease.outBack(clamp(prog(t, T.card, T.card + 0.4)), 1.5) * (1 - prog(t, 76.0, 76.3))
  x.save(); x.translate(540, 1010 + (1 - k) * -400); x.rotate(-0.06 + (1 - k) * 0.8); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-150, -200, 320, 420)
  box(x, -160, -210, 320, 420, '#1d1640', { b: 6 }); x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-140, -190, 280, 380)
  label(x, 'TALK CARD', 0, -150, { size: 26, col: GOLD, weight: 800, font: "'Space Mono', monospace" })
  label(x, 'What are', 0, -30, { size: 50, col: '#efe6d6', weight: 900 }); label(x, 'we doing?', 0, 34, { size: 50, col: '#efe6d6', weight: 900 })
  drawBits(x, HEART, { H: PINK }, 0, 130, 7)
  x.restore()
}
const CFG = {
  id: 'kzce20', dur: 90, ending: 'cut',
  hook: { at: -1, text: 'Five months. No label. | *Court is in session.*', out: [3.0, 3.2], accentColor: '#e163d6', size: 92 },
  heads: [
    { text: 'Stay for *the talk.*', at: 3.2, out: [5.2, 5.4], accent: GOLD, size: 104, late: 2, lateAt: 3.5 },
    { text: 'Ask the question. | Hear the *answer.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#e163d6', size: 100 },
  ],
  chapters: CH,
  fx: { whips: [{ at: -0.08, from: 1.3, blur: 7, len: 0.5 }, { at: T.evA - 0.05, from: 1.15 }, { at: T.wit, from: 1.3 }, { at: T.talk + 0.08, from: 1.22 }, { at: T.clear + 1.0, from: 1.12 }],
    recs: [{ at: 39.2, len: 1.2, caption: 'a *toothbrush.*', top: 1480 }], flashes: [[0.2, '#ff9fe8'], [T.wit, '#ffffff'], [T.talk + 0.1, '#ffe9a8'], [82.3, '#ffc2d4']] },
  gavels: [0.05, 5.5, T.wit - 1.2, T.order, T.adj],
  gasps: [-0.2, 13.4, 33.6, 38.4, T.wit + 0.1, T.talk + 0.1, T.clear + 1.0, 82.4],
  jury: ['taurus', 'leo', 'aries', 'pisces', 'scorpio', 'cancer'],
  tears: () => 3,
  juryTears: t => (t > 54 && t < 60) || t > 82.5 ? 1 : 0,
  juryMood: (t, id) => { if (id === 'pisces') return t > 82.4 ? 'heart' : undefined; if (t > 18.4 && t < 21.6) return 'eyeroll'; if (t > 82.5) return 'heart'; if (t > 63.6 && t < 69.5) return 'sparkle' },
  judge: { mood: t => seq(t, [[0, 'squint'], [1.4, 'neutral'], [13.4, 'wide'], [15.6, 'squint'], [18.4, 'eyeroll'], [22.4, 'neutral'], [33.6, 'wide'], [35.8, 'neutral'], [38.4, 'wide'], [42, 'neutral'], [T.wit, 'wide'], [52, 'neutral'], [T.close, 'sparkle'], [T.order, 'neutral'], [T.clear + 1, 'wide'], [82.3, 'heart']]),
    tears: t => t > 82.6 ? 2 : 0, look: t => (t > T.evA && t < 41.6) ? [0, 1] : t > 5.5 ? [-1, 1] : [0, 0.3] },
  dock: [
    { who: FOG, to: T.lib, s: 1, plate: 'DEFENDANT', prop: (x, t) => fog(x, t, 280, 1030) },
    { who: 'libra', from: T.lib, to: T.fog2, plate: 'PLAINTIFF', mood: t => seq(t, [[0, 'neutral'], [10.6, 'happy'], [13.2, 'wide']]), look: () => [1, -0.4] },
    { who: FOG, from: T.fog2, to: T.evA, s: 1, plate: 'DEFENDANT', prop: (x, t) => fog(x, t, 280, 1030) },
    { who: FOG, from: T.evA, to: T.gc, s: 1, plate: 'DEFENDANT', prop: (x, t) => fog(x, t, 280, 1030) },
    { who: { color: '#000', tag: '' }, from: T.gc, to: T.wit, s: 1, plate: 'THE GROUP CHAT', prop: (x, t) => groupChat(x, t) },
    { who: 'ex', from: T.wit, to: T.close, plate: 'WITNESS', mood: t => seq(t, [[0, 'neutral'], [51.6, 'squint'], [54.4, 'happy']]), look: () => [1, -0.3], tears: t => t > 51.4 && t < 54.2 ? 1 : 0 },
    { who: 'libra', from: T.close, to: T.clear, plate: 'PLAINTIFF', mood: t => seq(t, [[0, 'neutral'], [63.6, 'sparkle'], [T.order, 'wide'], [T.card, 'neutral']]), tears: t => t > 63.6 && t < T.order ? 1 : 0 },
    { who: { color: '#000', tag: '' }, from: T.clear, s: 1, plate: 'THE TALK', prop: (x, t) => couple(x, t) },
  ],
  ticker: { at: 1.0, out: [87.9, 88.2], label: 'THE CASE', text: 'LIBRA v. THE SITUATIONSHIP · FIVE MONTHS · NO LABEL' },
  boxes: [
    { open: 1.3, close: 3.15, lines: [{ t: 1.45, who: 'JUDGE', text: 'order! all *rise.*' }] },
    { open: 5.6, close: 7.7, lines: [{ t: 5.7, who: 'JUDGE', text: 'Libra v. the *situationship.*' }] },
    { open: 7.95, close: 15.5, lines: [{ t: 8.05, who: 'libra', text: "five months of 'hanging out a *lot.*'" }, { t: 10.6, who: 'libra', text: 'we have *inside jokes!*' }, { t: 13.2, who: 'libra', text: 'but no *label.*' }] },
    { open: 15.75, close: 21.8, lines: [{ t: 15.85, who: FOG, text: "it's just *vibes.*" }, { t: 18.4, who: FOG, text: 'labels are so *scary.*' }] },
    { open: 42.35, close: 47.4, lines: [{ t: 42.45, who: 'sagittarius', text: "we've been asking for *months.*" }, { t: 45.0, who: 'gemini', text: 'we made a *poll.*' }] },
    { open: 47.5, close: 48.7, lines: [{ t: 47.55, who: 'JUDGE', text: 'surprise *witness!*' }] },
    { open: 49.0, close: 59.8, lines: [{ t: 49.1, who: 'ex', text: 'I was in one of these *once.*' }, { t: 51.6, who: 'ex', text: 'ask. I wish I *had.*' }, { t: 54.4, who: 'ex', text: 'the answer can be scary. not knowing is *worse.*' }] },
    { open: 60.35, close: 69.8, lines: [{ t: 60.45, who: 'libra', text: '…I want to know what we *are.*' }, { t: 63.6, who: 'libra', text: 'even if the answer is *no.*' }, { t: 66.6, who: 'JUDGE', text: 'the court has heard *enough.*' }] },
    { open: 76.9, close: 86.4, lines: [{ t: 77.0, who: 'libra', text: 'so… what are we doing?' }, { t: 79.6, who: 'capricorn', text: "…I was hoping you'd *ask.*" }, { t: 82.2, who: 'capricorn', text: "I'd like to be *together.*" }, { t: 84.6, who: 'JUDGE', text: 'case *closed.*' }] },
  ],
  exhibits: [
    { at: T.evA, out: [28.4, 28.7], label: 'EXHIBIT A', draw(x, t, k, B) {
      box(x, B.cx - 330, B.cy - 320, 660, 640, '#fffaf0', { b: 6, hi: null }); label(x, 'FRIDAYS', B.cx, B.cy - 275, { size: 40, col: RED, weight: 900, shadow: false })
      for (let i = 0; i < 20; i++) { const a = 22.8 + i * 0.18; const cx = B.cx - 250 + (i % 5) * 125, cy = B.cy - 180 + Math.floor(i / 5) * 120
        R(x, '#e2d6bf', cx - 52, cy - 46, 104, 92); if (t > a) { const kk = ease.outBack(clamp(prog(t, a, a + 0.2))); drawBits(x, HEART, { H: PINK }, cx, cy - 10, 5 * kk); label(x, 'hang out?', cx, cy + 30, { size: 18, col: INK, weight: 800, shadow: false, alpha: kk }) } }
      if (t > 26.6) label(x, '…and still no label.', B.cx, B.cy + 285, { size: 34, col: RED, weight: 900, shadow: false, alpha: clamp(prog(t, 26.6, 26.8)) })
    } },
    { at: T.evB, out: [35.2, 35.5], label: 'EXHIBIT B', draw(x, t, k, B) {
      drawChat(x, t, B, { title: '♎︎ + ?', size: 38, msgs: [{ at: 29.4, side: 'L', text: 'are you bringing a plus-one to the wedding?' }, { at: 30.8, side: 'R', text: '…am I YOUR plus-one?' }, { at: 32.6, side: 'L', text: "haha we'll see" }] })
    } },
    { at: T.evC, out: [41.4, 41.7], label: 'EXHIBIT C', draw(x, t, k, B) {
      x.save(); x.translate(B.cx, B.cy - 40); x.rotate(-0.5); box(x, -24, -200, 48, 330, '#7fd0ff', { b: 6 }); box(x, -40, -260, 80, 80, '#fffaf0', { b: 5, hi: null }); for (let i = 0; i < 4; i++) R(x, '#4f7cd8', -34 + i * 18, -250, 8, 60); x.restore()
      label(x, 'a toothbrush.', B.cx, B.cy + 210, { size: 50, col: '#efe6d6', weight: 900 }); if (t > 37.6) label(x, 'at their place.', B.cx, B.cy + 275, { size: 44, col: RED, weight: 900, alpha: clamp(prog(t, 37.6, 37.8)) })
    } },
  ],
  stamps: [{ at: T.talk, text: 'THE TALK', sub: 'ORDERED', color: '#e163d6', out: [71.9, 72.15], y: 860, size: 130 }],
  over(x, t) { talkCard(x, t) },
  cues: [...Array.from({ length: 20 }, (_, i) => ['pop', +(22.8 + i * 0.18).toFixed(2), [880, 987.77, 1174.66, 1318.51][i % 4], 0.025, i % 2 ? 0.2 : -0.2]), ['pluck', 26.6, 392, 0.05, 0.6, 0],
    ['pop', 29.4, 987.77, 0.04, -0.2], ['pop', 30.8, 880, 0.04, 0.2], ['pop', 32.6, 587.33, 0.04, -0.2], ['pop', 36.2, 1174.66, 0.04, 0], ['riser', 47.6, T.wit, 0.04],
    ['whoosh', T.card, 0.5, 0.05], ['pluck', T.card + 0.4, 1318.51, 0.04, 0.6, 0], ['whoosh', T.clear, 1.2, 0.05], ['riser', T.clear, T.clear + 1.0, 0.04], ['bell', T.clear + 1.0, 1760, 0.035, 1.4, 0],
    ['glitter', 82.3, 83.4], ['bell', 82.4, 2349.32, 0.03, 1.6, 0.2], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
