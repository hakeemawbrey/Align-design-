// kose17 — OVERTHINKING SIMULATOR, Ep 17 (long): "They sent 'k' (full simulation)" (60 s vertical, star_talk, funk · A).
// Hard cut. Promise up front: "wait for what ‘k’ means". Chapter stickers, a new beat every ~8 s.
//   0.0  FRAME 0: Taurus mid-crash into a pile of dictionaries, a single giant "k"; hook on screen.
//   3.0  CH 1 THE LETTER: forensic zoom on the k.   12.0 CH 2 THE ARCHIVE: every past "ok" vs this "k", the ENTHUSIASM graph.
//  22.0  CH 3 THE THEORIES: mad k · busy k · cool k · cold k (DELETED).   38.0 CH 4 THE FRIENDS: the group chat votes.
//  48.0  CH 5 THE ANSWER: "all good?" → "k! sorry, in a meeting. call you at 8?" → the call.  58.0 last line.
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText, bubble } from '../../kose01/scenes/simkit.js'
const CRUSH = 'gemini'
const MONO = "'Space Mono', monospace"
const bigK = (scan) => (x, t, R) => {
  const cx = R.x + R.w / 2, cy = R.y + R.h / 2
  x.font = `800 ${scan ? 420 : 380}px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText('k', cx + 8, cy + 12); x.fillStyle = '#d9cdf5'; x.fillText('k', cx, cy)
  if (!scan) { for (let i = 0; i < 5; i++) { x.fillStyle = '#b9875a'; x.fillRect(R.x + 60 + i * 30, R.y + R.h - 70 - i * 46, 230, 40); x.fillStyle = INK; x.fillRect(R.x + 70 + i * 30, R.y + R.h - 60 - i * 46, 210, 6) } return }
  const sy = R.y + 60 + ((t * 260) % (R.h - 120))
  x.fillStyle = 'rgba(127,227,255,0.35)'; x.fillRect(R.x + 20, sy, R.w - 40, 10)
  const labels = [[3.6, 'case: lowercase', -1, -0.3], [5.2, 'punctuation: none', 1, -0.1], [6.8, 'emoji: zero', -1, 0.25], [8.4, 'warmth: ???', 1, 0.35]]
  for (const [t0, s, side, dy] of labels) if (t > t0) {
    const ly = cy + dy * R.h, lx = side < 0 ? R.x + 40 : R.x + R.w - 40
    x.strokeStyle = CYAN; x.lineWidth = 4; x.beginPath(); x.moveTo(cx + side * 90, cy + dy * 200); x.lineTo(lx + (side < 0 ? 240 : -240), ly); x.stroke()
    x.font = `700 32px ${MONO}`; x.fillStyle = CYAN; x.textAlign = side < 0 ? 'left' : 'right'; x.fillText(s, lx, ly - 22)
  }
}
const poll = (x, t, R) => {
  richText(x, 'GROUP VOTE: what does | *“k”* mean?', R.x + R.w / 2, R.y + 30, { size: 50, acc: GOLD })
  const rows = [['just “ok”', 5, '#7ff0a0'], ['doom', 1, RED]]
  rows.forEach(([l, n, c], i) => {
    const y = R.y + 250 + i * 150, k = Math.min(1, Math.max(0, (t - 43.6 - i * 0.4) / 1.2)), w = (R.w - 340) * (n / 5) * k
    x.font = `800 44px Inter`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(l, R.x + 40, y)
    x.fillStyle = INK; x.fillRect(R.x + 250, y - 36, R.w - 330, 72); x.fillStyle = c; x.fillRect(R.x + 256, y - 30, Math.max(0, w - 12), 60)
    x.font = `700 32px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'right'; x.fillText(i ? `${n} (you)` : `${n}`, R.x + R.w - 30, y + 60)
  })
}
const call = (x, t, R) => {
  const mid = R.x + R.w / 2
  x.fillStyle = 'rgba(127,240,160,0.1)'; x.fillRect(R.x, R.y, R.w, R.h)
  x.font = `700 34px ${MONO}`; x.fillStyle = '#7ff0a0'; x.textAlign = 'center'; x.textBaseline = 'middle'
  const s = Math.max(0, Math.floor(t - 54.6)); x.fillText(`ON A CALL · 0:${String(s).padStart(2, '0')}`, mid, R.y + 40)
  drawSign(x, t, 'taurus', { x: R.x + 240, y: R.y + 380, s: 220 }, { mood: 'happy', seed: 3 })
  drawSign(x, t, CRUSH, { x: R.x + R.w - 240, y: R.y + 380, s: 220 }, { mood: 'happy', seed: 4 })
  bubble(x, t, { t0: 55.0, d: 99, text: 'hiii', cx: R.x + R.w - 240, cy: R.y + 170, size: 40 })
  bubble(x, t, { t0: 55.7, d: 99, text: 'so… “k”?', cx: R.x + 240, cy: R.y + 150, size: 36 })
  bubble(x, t, { t0: 56.6, d: 99, text: 'k means ok!! I was in a meeting!', cx: R.x + R.w - 260, cy: R.y + 600, size: 30, maxW: 380, tail: 'up' })
}
export const CFG = {
  ep: 17, sign: 'taurus', duration: 60, ending: 'cut',
  hook: 'They sent *“k”.* | One letter. RUN ALL.',
  promise: { t: 0.9, d: 4.2, text: 'wait for what “k” means', y: 1876 },
  heads: [
    { t: 2.95, text: 'Examining | *the letter…*', color: CYAN },
    { t: 11.95, text: 'Opening | *the archive…*', color: GOLD },
    { t: 21.95, text: 'Running | *every theory…*', color: PINK },
    { t: 37.95, text: 'Asking | *the group…*', color: GOLD },
    { t: 47.95, text: 'Or… just | *ask them.*', color: '#7ff0a0' },
    { t: 58.0, text: '“k” meant ok. That’s | *all “k” means.*', color: GOLD, slam: true, size: 92 },
  ],
  chapters: [
    { t: 3.0, n: 1, text: 'THE LETTER', color: CYAN }, { t: 12.0, n: 2, text: 'THE ARCHIVE', color: GOLD }, { t: 22.0, n: 3, text: 'THE THEORIES', color: PINK },
    { t: 38.0, n: 4, text: 'THE FRIENDS', color: GOLD }, { t: 48.0, n: 5, text: 'THE ANSWER', color: '#7ff0a0' },
  ],
  bar: { label: 'Decoding one letter…', keys: [[0, 8], [0.5, 8], [3, 10], [22, 40], [38, 75], [48, 88], [50.6, 100]], err: [[0, 0.5], [36.5, 38]],
    labels: [[0, 'Decoding one letter…'], [12, 'Searching old messages…'], [22, 'Rendering theories…'], [38, 'Polling friends…'], [48, 'Asking directly…'], [50.6, 'Decoded: k = ok']] },
  panels: [
    { t0: -1, t1: 2.95, kind: 'custom', draw: bigK(false) },
    { t0: 3.0, t1: 11.95, kind: 'custom', draw: bigK(true) },
    { t0: 12.0, t1: 16.4, kind: 'chat', who: CRUSH, title: 'them · the archive', msgs: [
      { at: 12.2, side: 'L', text: 'ok!!' }, { at: 12.8, side: 'L', text: 'okayyy :)' }, { at: 13.4, side: 'L', text: 'ok sounds amazing' }, { at: 14.0, side: 'L', text: 'okie dokie' },
      { at: 14.9, side: 'L', text: 'k', size: 96, col: '#ffd1e0', circle: 15.2 },
    ] },
    { t0: 16.4, t1: 21.95, kind: 'meter', style: 'graph', label: '*ENTHUSIASM* over time', keys: [[16.5, 90], [17.5, 85], [18.5, 80], [19.5, 75], [20.6, 4]], max: 100, col: GOLD, icon: 'star', fmt: v => `${Math.round(v)}% o` },
    { t0: 22.0, t1: 26.0, kind: 'theory', chip: 'THEORY 1/4', title: '*Mad* k. | (Fury, compressed.)', size: 56, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'squint' }, { icon: 'bolt', x: 0.66, y: 0.6, cell: 14, wob: 1 }] } },
    { t0: 26.0, t1: 30.0, kind: 'theory', chip: 'THEORY 2/4', title: '*Busy* k. | (Typing with one thumb.)', size: 52, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'wide' }, { icon: 'phone', x: 0.66, y: 0.62, cell: 14, wob: 1 }] } },
    { t0: 30.0, t1: 34.0, kind: 'theory', chip: 'THEORY 3/4', title: '*Cool* k. | (Too cool for the o.)', size: 52, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'wink' }, { icon: 'star', x: 0.66, y: 0.6, cell: 12, bob: 1 }] } },
    { t0: 34.0, t1: 38.0, kind: 'theory', chip: 'THEORY 4/4', title: '*Cold* k. | (It’s December.)', size: 56, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'sleepy' }, { icon: 'snow', x: 0.66, y: 0.6, cell: 12, wob: 1 }] } },
    { t0: 38.0, t1: 43.4, kind: 'chat', title: 'THE GROUP', msgs: [
      { at: 38.2, side: 'R', text: 'they sent “k”. HELP.' }, { at: 39.2, side: 'L', text: 'a k is a k', col: '#bff5cf' },
      { at: 40.2, side: 'L', text: 'it’s short for ok, bestie', col: '#ffd1e0' }, { at: 41.3, side: 'L', text: 'just ask them??', col: '#cfe9ff' },
    ] },
    { t0: 43.4, t1: 47.95, kind: 'custom', draw: poll },
    { t0: 48.0, t1: 54.4, kind: 'chat', who: CRUSH, title: 'them', msgs: [
      { at: 48.1, side: 'L', text: 'k' }, { at: 49.0, side: 'R', text: 'all good? :)', size: 56 },
      { at: 50.6, side: 'L', text: 'k! sorry, in a meeting. call you at 8?', col: '#bff5cf', size: 50 },
    ], typing: [[49.6, 50.6]] },
    { t0: 54.6, t1: 61, kind: 'custom', keep: true, draw: call },
  ],
  kit: [{ kind: 'call', o: { at: 52.6, out: [54.4, 54.7], name: 'them', sub: 'incoming call… 8:00 PM', glyph: '♊', color: '#7fd0f0', answerAt: 53.9 } }],
  notifs: [{ t: 50.6, d: 1.9, from: 'THEM · now', text: 'k! sorry, in a meeting. call you at 8?', sign: CRUSH }],
  says: [
    { t: 0.9, who: 'sign', text: 'ONE letter. not even the o.', d: 1.9 },
    { t: 4.5, who: 'sup', text: 'it’s just a little k', d: 1.8 },
    { t: 9.5, who: 'sign', text: 'warmth: unknown. UNKNOWN.', d: 1.9 },
    { t: 15.6, who: 'sign', text: 'they used to send “okie dokie”!', d: 2.0 },
    { t: 23.0, who: 'sup', text: 'it’s not a mad k', d: 1.6 },
    { t: 27.2, who: 'sign', text: 'one thumb. that’s… possible.', d: 1.9 },
    { t: 31.2, who: 'sup', text: 'the o is crying', d: 1.6 },
    { t: 35.0, who: 'sign', text: 'December k. a winter k.', d: 1.9 },
    { t: 44.8, who: 'sup', text: 'five to one!!', d: 1.6 },
    { t: 51.8, who: 'sign', text: 'a meeting. A MEETING.', d: 1.6 },
  ],
  moods: [[0, 'wide', [0.6, -1]], [3, 'squint', [0.4, -1]], [12, 'wide', [0.4, -1]], [16.4, 'sleepy'], [20.6, 'wide', [0.4, -1]], [22, 'squint', [0.4, -1]], [26, 'wide', [0.4, -1]], [30, 'squint', [0.4, -1]], [34, 'sleepy'], [38, 'wide', [0.4, -1]], [43.4, 'squint', [0.4, -1]], [48, 'neutral', [0.4, -1]], [50.6, 'sparkle'], [52.6, 'wide', [0.4, -1]], [54.6, 'happy']],
  squash: [[0, 0.22], [0.5, 0], [20.6, 0.12], [21.0, 0]],
  steam: [[0, 0.6], [34, 38]], panic: [[0, 0.5], [36.5, 38]],
  signAt: t => t < 0.5 ? { x: 262 + 50 * (0.5 - t), y: 1650 - 80 * t, s: 320 } : { x: 262, y: 1610, s: 320 },
  sup: { moods: [[0, 'wide'], [31, 'squint'], [44.8, 'sparkle'], [55, 'happy']], tears: [[0, 2], [22, 3], [26, 2], [44.8, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 0.4, kind: 'flash', color: '#ff8fb1', d: 0.22 }, { t: 0.42, kind: 'shake', d: 0.4 },
    { t: 14.9, kind: 'whip', from: 1.15 }, { t: 22.0, kind: 'whip', from: 1.15 }, { t: 36.5, kind: 'glitch', d: 0.6 }, { t: 50.6, kind: 'whip', from: 1.15 }],
  music: { style: 'funk', key: 'A', seed: 817, drop: 3.0, sections: { breakdown: [34, 43.4], lift: [48, 54.6] }, hits: [22, 50.6] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
