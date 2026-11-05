// kpure03 · Planet Talk: Uranus · "Gemini, Forty Texts Deep" (23 s vertical, hard cut) · pop · G · star_talk
//   0      Uranus rocketing OUT of Gemini's phone screen at the lens, chat bubbles mid-scatter;
//          "GEMINI. | Forty texts. *Put it down.*"
//   0.45   glitch · 2.6 the phone shrinks into Gemini's hands: 40 blue bubbles in a row, one thought
//   2.8    "40 texts. *One* thought." · loading bar "explaining myself…" → "40/40 SENT"
//   6.2    ♅ "Unexpected move? *Call.* With your *voice.*" · 9.6 ♊ "With my… *VOICE?*"
//   11.4   Gemini presses call · ringing… · 13.4 picked up · the crush: "*FINALLY!* hi!!" (laughing)
//   16.2   Pisces sobbing: "they're *TALKING!!*" · 21.7 "One call. | *Thirty-nine* texts saved." · hard cut at 23
import { urFilm, HK, r3 } from '../../kpure01/urkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 23, HAND = 2.6, CALL = 11.4, PICK = 13.4, PIS = 16.2, LAST = 21.7
const CRUSH = '#ffb38a'
const SPAM = ['ok so', 'wait', 'not in a weird way', 'also', 'unless you want to', 'no pressure!!', 'haha', 'ok but', 'just saying', 'also also', 'ignore that', 'actually no']

function chatScreen(x, t, K, w, h) {
  // 40 bubbles stacked, scrolling up as the count climbs
  const n = t < HAND ? 40 : Math.min(40, 12 + Math.floor(prog(t, 2.9, 5.0) * 28))
  const lh = 74
  const scroll = Math.max(0, n * lh - (h - 260))
  for (let i = 0; i < n; i++) {
    const y = -h / 2 + 170 + i * lh - scroll
    if (y < -h / 2 + 120 || y > h / 2 - 40) continue
    const s = SPAM[i % SPAM.length]
    x.font = `700 26px ${K.MONO}`; const bw = x.measureText(s).width + 36
    K.rrect(x, w / 2 - 24 - bw, y, bw, 56, 20, '#5aa8ff')
    K.txt(x, s, w / 2 - 24 - bw / 2, y + 29, { size: 26, color: '#fff' })
  }
}
function callScreen(x, t, K, w, h) {
  const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#1d2f4a'); g.addColorStop(1, '#3a2050')
  x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
  const pulse = t < PICK ? (t * 1.4) % 1 : 0
  if (t < PICK) for (let k = 0; k < 2; k++) { const q = (pulse + k * 0.5) % 1; x.globalAlpha = 1 - q; x.strokeStyle = CRUSH; x.lineWidth = 6; x.beginPath(); x.arc(0, -120, 90 + q * 120, 0, Math.PI * 2); x.stroke(); x.globalAlpha = 1 }
  x.fillStyle = K.INK; x.beginPath(); x.arc(0, -120, 96, 0, Math.PI * 2); x.fill(); x.fillStyle = CRUSH; x.beginPath(); x.arc(0, -120, 88, 0, Math.PI * 2); x.fill()
  K.txt(x, '♥', 0, -116, { size: 90, font: K.INTER, color: '#fff' })
  K.txt(x, 'the crush', 0, 30, { size: 38, font: K.INTER, weight: 800, color: '#fff' })
  const sec = Math.max(0, Math.floor(t - PICK))
  K.txt(x, t < PICK ? 'calling' + '.'.repeat(1 + Math.floor(t * 3) % 3) : `00:0${Math.min(9, sec)}`, 0, 84, { size: 30, color: t < PICK ? '#cfe9ff' : '#7dffb0' })
  K.rrect(x, -60, h / 2 - 190, 120, 120, 60, '#ff4e5e', K.INK, 6)
  x.save(); x.translate(0, h / 2 - 130); x.rotate(2.3); K.rrect(x, -34, -12, 68, 24, 12, '#fff'); x.restore()
}

const F = urFilm({
  id: 'kpure03', sign: 'gemini', dur: D, ending: 'cut',
  hook: { text: 'GEMINI. | Forty texts. | *Put it down.*', top: 210, size: 96 },
  entry: { kind: 'zoom', at: -0.42, len: 0.9, x: 540, y: 920, size: 400 },
  brk: { at: 0.48, len: 0.45 },
  debris: [
    { label: 'wait', w: 150, h: 64, color: '#5aa8ff', ink: '#fff', front: true, x: 540, y: 1000, vx: -900, vy: -700, spin: 3, t0: -0.3 },
    { label: 'also', w: 150, h: 64, color: '#5aa8ff', ink: '#fff', front: true, x: 540, y: 1000, vx: 860, vy: -900, spin: -3, t0: -0.3 },
    { label: 'ok but', w: 190, h: 64, color: '#5aa8ff', ink: '#fff', front: true, x: 540, y: 1000, vx: -500, vy: -1300, spin: 2, t0: -0.3 },
    { label: 'haha', w: 150, h: 64, color: '#5aa8ff', ink: '#fff', front: true, x: 540, y: 1000, vx: 600, vy: -1500, spin: -2, t0: -0.3 },
  ],
  paint(x, t, K) {
    const big = 1 - ease.inOutCubic(prog(t, HAND, HAND + 0.5))
    // the phone, under Uranus at first (it came out of it), then in Gemini's hands
    const P = { X: lerp(735, 540, big), Y: lerp(1130, 1080, big), w: lerp(420, 760, big), h: lerp(700, 1340, big) }
    const onCall = t >= CALL + 0.3
    K.phone(x, t, { ...P, rot: lerp(0.06, 0, big), title: onCall ? '' : '♥ the crush', time: '00:47', screen: (c, tt, w, h) => onCall ? callScreen(c, t, K, w, h) : chatScreen(c, t, K, w, h) })
    // Gemini, two phones energy
    if (t >= HAND - 0.1) {
      const gk = K.pop01(t, HAND, 0.35)
      const mood = t < 6.2 ? 'squint' : t < 11.4 ? 'wide' : t < PICK ? 'squint' : 'heart'
      K.sign(x, t, 'gemini', { x: 280, y: 1460, s: 300, pop: gk, mood, look: [1, -0.4], hops: [9.7, PICK + 0.1, PICK + 0.5], sweat: t > CALL && t < PICK, shadow: true })
    }
    const U = K.track(t, [[0, { x: 540, y: 920, size: 400 }], [HAND + 0.5, { x: 300, y: 660, size: 340 }]])
    K.uranus(x, t, { ...U, mood: t < HAND ? 'happy' : t < 6.2 ? 'wide' : t < PICK ? 'sly' : 'happy', look: t < HAND ? [0, 0] : [1, 0.6], hops: [PICK + 0.2] })
    const pk = K.pop01(t, PIS, 0.4)
    if (pk > 0) K.pisces(x, t, { x: 880, y: 1690, s: 240, pop: pk, hops: [PIS + 0.8, PIS + 1.6] })
  },
  over(x, t, K) {
    K.loading(x, t, { at: 2.9, out: 5.9, label: 'explaining myself…', pct: tt => prog(tt, 3.0, 5.0), X: 540, Y: 1770, color: '#5aa8ff', err: '40/40 SENT' })
    // the thumb: pressing CALL
    const tk = K.win(t, CALL - 0.2, CALL + 0.6, 0.2)
    if (tk > 0.01) { x.save(); x.globalAlpha = tk; K.rrect(x, 640, 1320 - 30 * Math.sin(prog(t, CALL, CALL + 0.3) * Math.PI), 120, 170, 56, '#f2c75c', K.INK, 6); x.restore() }
  },
  lines: [
    { t0: 6.2, t1: 9.4, who: 'uranus', text: 'Unexpected move? *Call.* With your *voice.*', x: 560, y: 330, tail: -220, maxW: 760 },
    { t0: 9.6, t1: 11.2, who: 'gemini', text: 'With my… *VOICE?*', x: 300, y: 1780, tailUp: true, tail: -60 },
    { t0: PICK + 0.1, t1: 15.9, who: 'the crush', color: CRUSH, text: '*FINALLY!* hi!! (laughing)', x: 620, y: 330, tail: 120 },
    { t0: PIS + 0.2, t1: 18.9, who: 'pisces', text: "they're *TALKING!!*", x: 640, y: 1480, tail: 220 },
    { t0: 19.1, t1: 21.3, who: 'uranus', text: 'Texts saved: *39.*', x: 560, y: 330, tail: -220 },
  ],
  heads: [
    { at: 2.8, text: '40 texts. | *One* thought.', out: [5.8, 6.05], top: 230, size: 96 },
    { at: LAST, text: 'One call. | *Thirty-nine* texts saved.', top: 240, size: 96 },
  ],
  fx: [{ f: HK.screenShake, c: HK.shakeCues, o: { at: 9.6, len: 0.4, amp: 16 } }],
  cues: [
    ...Array.from({ length: 10 }, (_, i) => ['pop', r3(2.95 + i * 0.2), 1046.5 + i * 40, 0.025, 0.2]),
    ['tick', CALL, 0.08], ['pop', CALL + 0.02, 659.25, 0.05, 0],
    ...[0, 1].map(i => ['bell', r3(CALL + 0.4 + i * 0.85), 880, 0.035, 0.6, 0]),
    ['pop', PICK, 1318.51, 0.06, 0], ['glitter', PICK, PICK + 0.8], ['glitter', PIS, PIS + 1],
  ],
  music: { style: 'pop', key: 'G', seed: 8103, sections: { drop: 0.48, breakdown: [CALL], lift: [PICK] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
