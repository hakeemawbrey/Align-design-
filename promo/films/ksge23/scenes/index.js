// ksge23 · SPOT THE GREEN FLAG: "The Texting Round" (trial reel, LONG ≈ 60 s, synthwave · A). Format: ./longkit.js.
//   0–4.6   frame 0: five phones mid-fall across the screen, notifications bursting; slam title
//           "FIVE TEXTS. FIVE FLAGS. | *ROUND FIVE, THOUGH.*"; promise sticker "round 5 is the hard one. stay."
//   ROUND 1 · LATE NIGHT      Aquarius: "wyd" at 12:04 AM  vs  "free tomorrow? I'd love to see you"          → B
//   ROUND 2 · THE SLOW REPLY  Taurus, three hours later: "sorry, long shift! hi!!"  vs  "k"                   → A
//   ROUND 3 · THE VOICE NOTE  Pisces: a 9-minute voice note  vs  "can I call? easier to say out loud"         → B
//   ROUND 4 · THE BIG DAY     Leo, 8 AM: "good luck today, you've got this"  vs  nothing                      → A
//   ROUND 5 · AFTER THE FIGHT Cancer: "whatever."  vs  "I'm still upset, but I want to talk. tonight?"        → B
//   THE STARS: "Upset and still showing up? *Green.*"  Hard cut.
import { makeGreenLong } from './longkit.js'
import { R, box, pbubble, hearts, phone, sweat, drawBits, prog, clamp, lerp, ease, INK, BONE, GOLD, GREEN, RED, INTER, MONO } from '../../ksge01/scenes/greenkit.js'
import { living, bedroomDark } from '../../ksge02/scenes/sets.js'

// a texting take: your phone with the thread, the sign beside it, you in the corner, the key line echoed big
function textTake({ name, time = null, msgs, echo, echoCol, mood, dark = false, voice = null }) {
  return (x, tk, S) => {
    const { hero, you } = S
    if (dark) bedroomDark(x, tk, { glow: 1 }); else living(x, { lamp: true })
    phone(x, 170, 360, { w: 250, h: 420, rot: -0.03, glow: 0.8, screen: (q, w, h) => {
      R(q, '#211a3e', 0, 0, w, h); R(q, '#2e2656', 0, 0, w, 40)
      q.font = `800 18px ${INTER}`; q.fillStyle = BONE; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText(name, w / 2, 21)
      if (time) { q.font = `700 13px ${MONO}`; q.fillStyle = '#c9c0e8'; q.fillText(time, w / 2, 56) }
      let y = 72
      for (const m of msgs) {
        if (tk < m.at) continue
        q.font = `700 18px ${INTER}`
        const lines = m.text.split('\n'), tw = Math.max(...lines.map(s => q.measureText(s).width)), bw = Math.min(w - 16, tw + 18), bh = lines.length * 22 + 12
        const X = m.me ? w - bw - 8 : 8
        R(q, m.me ? '#7fd0ff' : BONE, X, y, bw, bh); q.fillStyle = INK; q.textAlign = 'left'; q.textBaseline = 'top'
        lines.forEach((s, i) => q.fillText(s, X + 9, y + 6 + i * 22)); y += bh + 10
      }
      if (voice && tk >= voice.at) {
        R(q, BONE, 8, y, w - 16, 44); R(q, GREEN, 16, y + 10, 24, 24)
        for (let i = 0; i < 14; i++) R(q, INK, 50 + i * 9, y + 22 - (4 + (i * 7) % 12), 5, 2 * (4 + (i * 7) % 12))
        q.font = `700 14px ${MONO}`; q.fillStyle = INK; q.textAlign = 'right'; q.textBaseline = 'middle'; q.fillText(voice.len, w - 14, y + 22)
      }
    } })
    const m = mood(tk, S)
    hero(x, tk, { x: 405, y: 470, s: 170, mood: m.hero, look: [-1, 0], hops: m.hops || [] })
    you(x, tk, { x: 400, y: 660, s: 100, mood: m.you, look: [-1, -0.5] })
    if (m.sweat) sweat(x, tk, 450, 600)
    if (echo) pbubble(x, tk, 300, 110, echo.at, 99, echo.text, { size: echo.size || 30, col: echoCol || BONE })
    if (m.hearts) hearts(x, tk, m.hearts, 400, 560, { n: 4, cell: 4 })
  }
}
const fA = 0.7, fB = 3.5
const ROUNDS = [
  { sign: 'aquarius', title: 'LATE NIGHT', win: 'B', premise: 'Midnight. *Your phone lights up.*', why: '“wyd” at midnight is a ping. A plan is a *hello.*',
    takes: {
      A: { draw: textTake({ name: 'AQUARIUS', time: '12:04 AM', dark: true, msgs: [{ at: fA + 0.3, text: 'wyd' }], echo: { at: fA + 0.4, text: '“wyd”  (12:04 AM)', size: 32 }, mood: tk => ({ hero: 'neutral', you: tk > fA + 0.8 ? 'eyeroll' : 'wide' }) }) },
      B: { draw: textTake({ name: 'AQUARIUS', time: '7:30 PM', msgs: [{ at: fB + 0.3, text: 'free tomorrow?\nI’d love to see you' }], echo: { at: fB + 0.4, text: 'free tomorrow? I’d love to see you', size: 26 }, echoCol: '#c9f2d4', mood: tk => ({ hero: tk > fB + 0.3 ? 'happy' : 'neutral', you: tk > fB + 0.7 ? 'heart' : 'neutral', hearts: fB + 0.8 }) }) },
    }, cues: [['pop', fA + 0.3, 659.25, 0.035, -0.4], ['pop', fB + 0.3, 1318.51, 0.04, 0.4]] },
  { sign: 'taurus', title: 'THE SLOW REPLY', win: 'A', premise: 'They reply… *three hours later.*', why: 'Slow is fine. A *“sorry, long shift!”* is the flag.',
    takes: {
      A: { draw: textTake({ name: 'TAURUS', time: '3 HOURS LATER', msgs: [{ at: -9, text: 'how’s your day?', me: true }, { at: fA + 0.4, text: 'sorry, long shift!\nhi!!' }], echo: { at: fA + 0.5, text: 'sorry, long shift! hi!!', size: 30 }, echoCol: '#c9f2d4', mood: tk => ({ hero: tk > fA + 0.4 ? 'happy' : 'sleepy', you: tk > fA + 0.8 ? 'happy' : 'neutral', hearts: fA + 0.9 }) }) },
      B: { draw: textTake({ name: 'TAURUS', time: '3 HOURS LATER', msgs: [{ at: -9, text: 'how’s your day?', me: true }, { at: fB + 0.4, text: 'k' }], echo: { at: fB + 0.5, text: '“k”', size: 40 }, mood: tk => ({ hero: tk > fB + 0.4 ? 'neutral' : 'sleepy', you: tk > fB + 0.8 ? 'wide' : 'neutral' }) }) },
    }, cues: [['pop', fA + 0.4, 1174.66, 0.04, -0.4], ['pop', fB + 0.4, 440, 0.035, 0.4]] },
  { sign: 'pisces', title: 'THE VOICE NOTE', win: 'B', premise: 'They have *a lot* to say.', why: 'Big feelings deserve *a real conversation.*',
    takes: {
      A: { draw: textTake({ name: 'PISCES', msgs: [], voice: { at: fA + 0.3, len: '9:12' }, echo: { at: fA + 0.4, text: 'a 9-minute voice note', size: 30 }, mood: tk => ({ hero: tk > fA ? 'sparkle' : 'neutral', you: tk > fA + 0.8 ? 'wide' : 'neutral', sweat: tk > fA + 1.0 }) }) },
      B: { draw: textTake({ name: 'PISCES', msgs: [{ at: fB + 0.3, text: 'can I call? easier\nto say out loud' }], echo: { at: fB + 0.4, text: 'can I call? easier to say out loud', size: 26 }, echoCol: '#c9f2d4', mood: tk => ({ hero: 'happy', you: tk > fB + 0.7 ? 'happy' : 'neutral', hearts: fB + 0.8 }) }) },
    }, cues: [['pop', fA + 0.3, 880, 0.035, -0.4], ['pop', fB + 0.3, 1318.51, 0.04, 0.4]] },
  { sign: 'leo', title: 'THE BIG DAY', win: 'A', premise: 'Your big interview is *today.*', why: 'They remembered *your* big day.',
    takes: {
      A: { draw: textTake({ name: 'LEO', time: '8:00 AM', msgs: [{ at: fA + 0.3, text: 'good luck today!!\nyou’ve got this' }], echo: { at: fA + 0.4, text: 'good luck today!! you’ve got this', size: 26 }, echoCol: '#c9f2d4', mood: tk => ({ hero: 'sparkle', you: tk > fA + 0.7 ? 'sparkle' : 'neutral', hearts: fA + 0.8, hops: [fA + 0.35] }) }) },
      B: { draw: textTake({ name: 'LEO', time: '8:00 AM', msgs: [], echo: { at: fB + 0.6, text: '…', size: 44 }, mood: tk => ({ hero: 'neutral', you: tk > fB + 1.2 ? 'wide' : 'neutral' }) }) },
    }, cues: [['pop', fA + 0.3, 1567.98, 0.04, -0.4], ['tick', fB + 0.6, 0.04]] },
  { sign: 'cancer', title: 'AFTER THE FIGHT', win: 'B', premise: 'Your *first fight.* Then: their text.', ask: 'The hard one. *Which take?*', why: '',
    takes: {
      A: { draw: textTake({ name: 'CANCER', msgs: [{ at: fA + 0.3, text: 'whatever.' }], echo: { at: fA + 0.4, text: '“whatever.”', size: 40 }, mood: tk => ({ hero: tk > fA ? 'eyeroll' : 'neutral', you: tk > fA + 0.7 ? 'wide' : 'neutral' }) }) },
      B: { draw: textTake({ name: 'CANCER', msgs: [{ at: fB + 0.3, text: 'I’m still upset, but\nI want to talk.\ntonight?' }], echo: { at: fB + 0.4, text: 'I’m still upset, but I\nwant to talk. tonight?', size: 26 }, echoCol: '#c9f2d4', mood: tk => ({ hero: tk > fB ? 'happy' : 'neutral', you: tk > fB + 0.8 ? 'heart' : 'neutral', hearts: fB + 0.9 }) }) },
    }, cues: [['pop', fA + 0.3, 440, 0.035, -0.4], ['pop', fB + 0.3, 1174.66, 0.04, 0.4], ['pop', fB + 0.45, 1567.98, 0.03, 0.4]] },
]
ROUNDS[4].why = undefined

// the intro: five phones mid-fall, notifications bursting
function intro(x, t, C) {
  const cols = ['#7fd0f0', '#e9b24a', '#9a7be0', '#f0603a', '#3f7cf0']
  for (let i = 0; i < 5; i++) {
    const ph = clamp(prog(t, -0.6 + i * 0.12, 1.6 + i * 0.15))
    const px = 150 + i * 195, py = lerp(380 + (i % 2) * 120, 1000 + (i % 2) * 80, ease.outCubic(ph))
    phone(x, px, py, { w: 120, h: 200, rot: (1 - ph) * (i % 2 ? 0.6 : -0.5), glow: 1, screen: (q, w, h) => { R(q, '#211a3e', 0, 0, w, h); R(q, cols[i], 6, 10, w - 12, 34) } })
    const nk = clamp(prog(t, 0.2 + i * 0.25, 0.35 + i * 0.25))
    if (nk > 0) pbubbleGlobal(x, t, px, py - 150, ['wyd', 'k', '9:12', '…', 'whatever.'][i], nk)
  }
  void C; void GOLD; void RED; void drawBits; void box
}
function pbubbleGlobal(x, t, cx, cy, text, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 30px ${INTER}`; const w = x.measureText(text).width + 36
  R(x, INK, -w / 2 - 5, -26, w + 10, 52); R(x, BONE, -w / 2, -21, w, 42)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 1)
  x.restore()
}

const EP = makeGreenLong({
  id: 'ksge23', ending: 'cut',
  hook: 'FIVE TEXTS. FIVE FLAGS. | *ROUND FIVE, THOUGH.*',
  promise: 'Round 5 is *the hard one.* Stay.',
  intro,
  rounds: ROUNDS.map(r => ({ ...r, why: r.why || 'x' })),
  last: 'Upset and still showing up? *Green.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const SECTIONS = EP.SECTIONS
