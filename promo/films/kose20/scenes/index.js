// kose20 — OVERTHINKING SIMULATOR, Ep 20 (long): "My ex said 'happy holidays' (full simulation)" (90 s vertical,
// star_talk, cinematic · Gm). Hard cut. Promise: "the reply, at the end". Chapter stickers, a new beat every ~8 s.
//   0.0  FRAME 0: Sagittarius mid-stumble in the snow, INCOMING: YOUR EX "happy holidays :)", the bar glitching; hook.
//   3.0  CH 1 INCOMING: the smiley under forensic scan, the WHAT DO THEY WANT gauge.
//  16.0  CH 2 MEMORY LANE: old photos (the road trip, the burnt pancakes, the last goodbye), Pisces sobs; "get back together?" DELETED.
//  32.0  CH 3 TEN REPLIES: from an essay to silence, each DELETED; the tenth is SAVED.
//  56.0  CH 4 THE FRIENDS: "be kind, keep it short".   70.0 CH 5 THE REPLY: sent, phone down, a snowball fight with friends.
//  86.4  "Happy holidays. Nothing more. | That’s growth."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText } from '../../kose01/scenes/simkit.js'
const EX = 'cancer'
const MONO = "'Space Mono', monospace"
const snow = { under: (x, t) => { x.fillStyle = 'rgba(255,255,255,0.75)'; for (let i = 0; i < 60; i++) { const sx = (i * 173.3 + Math.sin(t * 0.7 + i) * 40) % 1080, sy = (i * 97.1 + t * (40 + (i % 5) * 18)) % 1920; const s = 4 + (i % 3) * 3; x.fillRect(Math.round(sx), Math.round(sy), s, s) } } }
const incoming = (x, t, R) => {
  const on = Math.floor(t * 5) % 2 === 0
  x.fillStyle = on ? 'rgba(255,59,78,0.22)' : 'rgba(255,59,78,0.08)'; x.fillRect(R.x, R.y, R.w, R.h)
  richText(x, 'INCOMING: | *YOUR EX*', R.x + R.w / 2, R.y + 40, { size: 70, acc: RED })
  drawSign(x, t, EX, { x: R.x + R.w / 2, y: R.y + 360, s: 180 }, { mood: 'happy', seed: 9 })
  x.fillStyle = INK; x.fillRect(R.x + 150, R.y + 480, R.w - 300, 120); x.fillStyle = '#d9cdf5'; x.fillRect(R.x + 156, R.y + 486, R.w - 312, 108)
  x.font = `800 60px Inter`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('happy holidays :)', R.x + R.w / 2, R.y + 541)
}
const smiley = (x, t, R) => {
  const cx = R.x + R.w / 2, cy = R.y + R.h / 2
  x.font = `800 300px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#d9cdf5'; x.fillText(':)', cx, cy)
  const sy = R.y + 60 + ((t * 260) % (R.h - 120)); x.fillStyle = 'rgba(127,227,255,0.35)'; x.fillRect(R.x + 20, sy, R.w - 40, 10)
  const L = [[4.4, 'two dots: eyes? or…', -0.32], [6.0, 'one curve: smile? smirk?', 0.0], [7.6, 'no nose: suspicious', 0.32]]
  for (const [t0, s, dy] of L) if (t > t0) { x.font = `700 34px ${MONO}`; x.fillStyle = CYAN; x.textAlign = 'left'; x.fillText(s, R.x + 40, cy + dy * R.h) }
}
const memory = (cap, n) => (x, t, R) => {
  const cx = R.x + R.w / 2, cy = R.y + R.h / 2, w = 460, h = 480
  x.save(); x.translate(cx, cy); x.rotate([-0.05, 0.04, -0.02][n])
  const fl = 0.85 + 0.15 * Math.sin(t * 13)
  x.globalAlpha *= fl; x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = '#efe0c0'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#b89a72'; x.fillRect(-w / 2 + 24, -h / 2 + 24, w - 48, h - 130)
  drawSign(x, t, 'sagittarius', { x: -80, y: -40, s: 150 }, { mood: 'happy', seed: 2 }); drawSign(x, t, EX, { x: 80, y: -40, s: 150 }, { mood: 'happy', seed: 9 })
  icon(x, ['plane', 'bowl', 'house'][n], 0, 90, 8)
  x.font = `700 34px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(cap, 0, h / 2 - 54)
  x.restore()
  x.font = `700 30px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('MEMORY LANE · (flickering)', cx, R.y + 30)
}
const REPLIES = [
  '“happy holidays! also… do you ever think about us?”', '“who is this?” (their number is saved)', 'a nine-paragraph *essay*', 'a *song.* (original.)',
  '“k”', 'a photo of my *new haircut*', '“I’m doing AMAZING. *thriving.* great.”', '“merry *everything!!!*”', '*silence.* (forever.)', '“happy holidays to you too :)”',
]
const fight = (x, t, R) => {
  x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(R.x, R.y + R.h * 0.7, R.w, R.h * 0.3)
  const F = ['sagittarius', 'leo', 'aries', 'pisces']
  F.forEach((s, i) => { const px = R.x + 140 + i * 210, py = R.y + 400 + (i % 2) * 40; drawSign(x, t, s, { x: px, y: py, s: 170 }, { mood: 'happy', tears: s === 'pisces' ? 3 : 0, squash: 0.1 * Math.max(0, Math.sin(t * 9 + i * 2)), seed: 50 + i }) })
  for (let i = 0; i < 6; i++) { const ph = (t * 0.9 + i / 6) % 1, x0 = R.x + 140 + (i % 4) * 210, x1 = R.x + 140 + ((i + 2) % 4) * 210, px = x0 + (x1 - x0) * ph, py = R.y + 330 - Math.sin(Math.PI * ph) * 200; x.fillStyle = '#ffffff'; x.fillRect(px - 14, py - 14, 28, 28); x.fillStyle = INK; x.fillRect(px - 14, py + 10, 28, 4) }
  richText(x, 'phone down. *snowball fight.*', R.x + R.w / 2, R.y + 30, { size: 48, acc: CYAN })
}
export const CFG = {
  ep: 20, sign: 'sagittarius', duration: 90, ending: 'cut', draw: snow,
  hook: 'Your ex: “happy holidays :)” | *DECODING.*', hookSize: 92,
  promise: { t: 0.9, d: 4.4, text: 'the reply, at the end', y: 1876 },
  heads: [
    { t: 2.95, text: 'Decoding | *the smiley…*', color: CYAN },
    { t: 15.95, text: 'Opening | *memory lane…*', color: PINK },
    { t: 31.95, text: 'Drafting | *a reply…*', color: GOLD },
    { t: 55.95, text: 'Calling in | *the friends…*', color: GOLD },
    { t: 69.95, text: 'Sending | *the reply.*', color: '#7ff0a0' },
    { t: 86.4, text: 'Happy holidays. Nothing more. | *That’s growth.*', color: GOLD, slam: true, size: 86 },
  ],
  chapters: [
    { t: 3.0, n: 1, text: 'INCOMING', color: RED }, { t: 16.0, n: 2, text: 'MEMORY LANE', color: PINK }, { t: 32.0, n: 3, text: 'TEN REPLIES', color: GOLD },
    { t: 56.0, n: 4, text: 'THE FRIENDS', color: CYAN }, { t: 70.0, n: 5, text: 'THE REPLY', color: '#7ff0a0' },
  ],
  bar: { label: 'Decoding “happy holidays :)”…', keys: [[0, 21], [0.5, 21], [3, 22], [16, 35], [32, 50], [55.5, 95], [70, 98], [72.6, 100]], err: [[0, 0.5], [30.0, 31.6]],
    labels: [[0, 'Decoding “happy holidays :)”…'], [16, 'Remembering…'], [32, 'Drafting replies…'], [56, 'Asking the friends…'], [72.6, 'Reply sent. Feelings: fine.']] },
  panels: [
    { t0: -1, t1: 2.95, kind: 'custom', draw: incoming },
    { t0: 3.0, t1: 9.0, kind: 'custom', draw: smiley },
    { t0: 9.0, t1: 15.95, kind: 'meter', style: 'gauge', label: 'WHAT DO THEY *WANT?*', keys: [[9, 50], [9.8, 95], [10.8, 10], [11.8, 80], [12.8, 30], [14, 50], [15.4, 18]], ends: ['to be nice', 'EVERYTHING'], segs: [[0, 0.33, '#7ff0a0'], [0.33, 0.66, GOLD], [0.66, 1, RED]], jitter: true },
    { t0: 16.0, t1: 20.5, kind: 'custom', draw: memory('the road trip', 0) },
    { t0: 20.5, t1: 25.0, kind: 'custom', draw: memory('the burnt pancakes', 1) },
    { t0: 25.0, t1: 28.5, kind: 'custom', draw: memory('the last goodbye', 2) },
    { t0: 28.5, t1: 31.95, kind: 'theory', chip: 'THEORY', title: 'Do they want to | *get back together?*', size: 54, del: 30.0, scene: { items: [{ sign: EX, x: 0.36, y: 0.72, s: 180, mood: 'neutral' }, { icon: 'broken', x: 0.66, y: 0.64, cell: 12 }] } },
    ...REPLIES.map((title, i) => ({ t0: 32.0 + i * 2.4, t1: 34.4 + i * 2.4, kind: 'theory', chip: `REPLY ${i + 1}/10`, title, size: 50, del: 33.7 + i * 2.4,
      stamp: i === 9 ? 'SAVED' : 'DELETED', stampCol: i === 9 ? '#7ff0a0' : RED, keep: false,
      scene: { items: [{ sign: 'sagittarius', x: 0.5, y: 0.74, s: 160, mood: ['wide', 'squint', 'sleepy', 'happy', 'eyeroll', 'wink', 'sparkle', 'heart', 'sleepy', 'happy'][i] }] } })),
    { t0: 56.0, t1: 69.95, kind: 'chat', title: 'THE FRIENDS', msgs: [
      { at: 56.3, side: 'R', text: 'my ex said happy holidays. what do I say' },
      { at: 58.0, side: 'L', text: 'be kind, keep it short', col: '#bff5cf' },
      { at: 60.2, side: 'L', text: 'you don’t owe more than that', col: '#ffd1e0' },
      { at: 62.4, side: 'L', text: 'then come outside. snowball fight', col: '#cfe9ff' },
      { at: 64.6, side: 'L', text: 'proud of you (crying)', col: '#e3d4ff' },
      { at: 66.8, side: 'R', text: 'short. kind. done.' },
    ] },
    { t0: 70.0, t1: 75.6, kind: 'chat', who: EX, title: 'ex', msgs: [
      { at: 70.1, side: 'L', text: 'happy holidays :)' },
      { at: 72.6, side: 'R', text: 'happy holidays to you too :)', size: 56 },
    ], seen: { at: 73.6, text: 'delivered · phone down', col: '#7ff0a0' } },
    { t0: 75.6, t1: 91, kind: 'custom', keep: true, draw: fight },
  ],
  stamps: [{ t: 73.8, d: 1.7, text: 'SENT. | DONE.', color: '#7ff0a0', y: 720 }],
  kit: [{ kind: 'achievement', o: { at: 80.0, out: [83.4, 83.8], text: 'replied *kindly.* moved on.', y: 1480 } }],
  says: [
    { t: 0.9, who: 'sign', text: 'my EX. with a SMILEY. in DECEMBER.', d: 2.0 },
    { t: 6.4, who: 'sup', text: 'it’s just a smiley', d: 1.8 },
    { t: 10.8, who: 'sign', text: 'the needle won’t sit still!', d: 2.0 },
    { t: 18.0, who: 'sup', text: 'the road trip!!', d: 1.8 },
    { t: 22.4, who: 'sign', text: 'we burnt every single pancake.', d: 2.1 },
    { t: 26.2, who: 'sup', text: 'I need a minute', d: 1.8 },
    { t: 30.4, who: 'sign', text: 'no. no, that’s done.', d: 1.6 },
    { t: 39.6, who: 'sup', text: 'not the essay', d: 1.4 },
    { t: 46.6, who: 'sign', text: 'thriving. very thriving.', d: 1.8 },
    { t: 54.2, who: 'sign', text: 'that one. the simple one.', d: 1.8 },
    { t: 61.2, who: 'sup', text: 'they’re so right', d: 1.6 },
    { t: 74.4, who: 'sign', text: 'ok. that felt… good?', d: 1.9 },
    { t: 77.6, who: 'sup', text: 'I’m so proud', d: 1.6 },
    { t: 81.8, who: 'sign', text: 'SNOWBALL FIGHT!!', d: 1.8 },
  ],
  moods: [[0, 'wide', [0.6, -1]], [3, 'squint', [0.4, -1]], [9, 'wide', [0.4, -1]], [16, 'sparkle'], [20.5, 'happy'], [25, 'sleepy'], [28.5, 'wide', [0.4, -1]], [30.4, 'neutral', [0.4, -1]],
    [32, 'wide', [0.4, -1]], [41.6, 'eyeroll'], [46.4, 'squint', [0.4, -1]], [53.6, 'sparkle'], [56, 'neutral', [0.4, -1]], [64.6, 'happy'], [70, 'neutral', [0.4, -1]], [72.6, 'sparkle'], [75.6, 'happy']],
  tears: [[25, 1], [30.4, 0]],
  squash: [[0, 0.2], [0.5, 0], [30, 0.1], [30.4, 0]],
  steam: [[0, 0.6], [12, 15.4], [46, 52]], panic: [[0, 0.5], [30, 31.6]],
  signAt: t => t < 0.5 ? { x: 262 + 60 * (0.5 - t) * Math.sin(t * 30), y: 1630, s: 320 } : { x: 262, y: 1610, s: 320 },
  sup: { moods: [[0, 'wide'], [6.4, 'happy'], [16, 'sparkle'], [25, 'wide'], [32, 'wide'], [56, 'happy'], [64.6, 'sparkle'], [75.6, 'happy']], tears: [[0, 2], [16, 3], [28.5, 2], [39.6, 3], [56, 2], [64.6, 3], [77.6, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 0.4, kind: 'flash', color: '#ff3b4e', d: 0.22 }, { t: 0.42, kind: 'shake', d: 0.4 },
    { t: 16.0, kind: 'whip', from: 1.15 }, { t: 30.0, kind: 'glitch', d: 0.6 }, { t: 32.0, kind: 'whip', from: 1.15 }, { t: 56.0, kind: 'whip', from: 1.15 }, { t: 72.6, kind: 'flash', color: '#7ff0a0', d: 0.25 }, { t: 75.6, kind: 'whip', from: 1.2 }],
  music: { style: 'cinematic', key: 'Gm', seed: 820, drop: 3.0, sections: { breakdown: [25, 56], lift: [32, 70] }, hits: [16, 72.6, 75.6] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
