// nthe32: THE THREAD, episode 32 (finale), "Why so quiet?" (30 s vertical, promo/films/next30/b06.md, music: pop · C)
// Story 0–25.6, then the shared end card. The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Why is the group chat | so quiet?"  ♓ Pisces alone with the phone, sniffling. The last messages: dinner at 7,
//         ♐ "home!! on my way", ♍ "on my way". Then nothing. 10:16 PM. Pisces voice note: "why is it so quiet"
//   6.7   ♋ posts ONE photo: all twelve at the year-end dinner table (Sag home). "sorry Pisces, we're all here! (you're
//         next to me)" · ♓ "oh. hi."  The stage reveals the table: Pisces was sitting at it the whole time.
//  10.9   "the bread burnt. I'm sorry."  11 stars are typing…  card cut 13.7 → ♍ "we came for you, not the bread." (gold)
//  15.2   ♉ "also burnt bread is great" · ♌ pins the bread.
//  18.7   ♑'s last agenda: "1. be here" (ticked).  "Group chat, *in person*."
import { threadFilm, drawProp } from '../../nthe17/scenes/threadkit.js'
import { drawStarChar } from '../../startalk.js'
import { SIGNS } from '../../wheel.js'

function table(x, X, Y, w, h, t) {
  x.fillStyle = '#3a2a5a'; x.fillRect(X, Y, w, h)
  for (let i = 0; i < 8; i++) { x.fillStyle = ['#f2c75c', '#ff8fb1', '#8fd8f6'][i % 3]; x.beginPath(); x.arc(X + 30 + i * (w - 60) / 7, Y + 22, 7, 0, Math.PI * 2); x.fill() }
  SIGNS.forEach((s, i) => { const row = i < 6 ? 0 : 1, k = i % 6; drawStarChar(x, X + 60 + k * (w - 120) / 5, Y + 90 + row * 80, 82, t, { color: s.color, mood: s.id === 'pisces' ? 'happy' : 'happy', seed: 80 + i, glow: 0.3, tips: false }) })
  x.fillStyle = '#8a5a3a'; x.fillRect(X + 20, Y + h - 60, w - 40, 24)
  drawProp(x, 'bread', X + w / 2, Y + h - 66, 5)
}
const EP = {
  duration: 30,
  heads: [
    { text: 'Why is the group chat | *so quiet?*', at: -0.9, out: [4.0, 4.25], size: 88 },
    { text: '*Hours* of nothing.', at: 4.3, out: [6.5, 6.75], size: 100 },
    { text: 'Because they’re all | *here.*', at: 6.8, out: [10.6, 10.85], size: 92, accent: '#ff8fb1' },
    { text: '‘The bread *burnt.*’', at: 10.95, out: [13.5, 13.75], size: 100 },
    { text: 'We came for *you.*', at: 13.9, out: [18.4, 18.65], size: 100 },
    { text: 'Agenda: *be here.*', at: 18.75, out: [21.3, 21.55], size: 100, accent: '#9fe6b0' },
    { text: 'Group chat, *in person.*', at: 21.6, out: [25.15, 25.45], size: 100, late: 2, lateAt: 21.9 },
  ],
  items: [
    { t: -9, kind: 'msg', who: 'aqua', text: "is everyone coming tonight?" },
    { t: -8, kind: 'msg', who: 'cap', text: "attendance: 12 of 12" },
    { t: -7, kind: 'msg', who: 'taurus', text: "I'm hungry already" },
    { t: -6, kind: 'msg', who: 'cancer', text: 'dinner at 7. everyone?' },
    { t: -5, kind: 'msg', who: 'sag', text: 'home!! on my way' },
    { t: -4, kind: 'msg', who: 'virgo', text: 'on my way' },
    { t: -3, kind: 'sys', text: 'today 6:58 PM' },
    { t: 1.4, kind: 'sys', text: 'today 10:16 PM' },
    { t: 3.6, kind: 'voice', who: 'pisces', dur: '0:03', sob: true, play: [3.85, 5.6], caption: 'why is it so quiet' },
    { t: 6.8, kind: 'photo', who: 'cancer', h: 320, w: 600, pic: table, caption: 'the year-end dinner' },
    { t: 8.4, kind: 'msg', who: 'cancer', text: "Pisces we're all here. you're sitting next to me" },
    { t: 9.6, kind: 'msg', who: 'pisces', text: 'oh. hi.', react: { t: 10.1, mark: 'ha', n: 11 } },
    { t: 10.95, kind: 'msg', who: 'cancer', text: "the bread burnt. I'm sorry." },
    { t: 12.2, kind: 'sys', gold: true, text: '11 stars are typing…' },
    { t: 13.9, kind: 'msg', who: 'virgo', hl: true, text: 'we came for you, not the bread.' },
    { t: 15.2, kind: 'msg', who: 'taurus', text: 'also burnt bread is great' },
    { t: 16.2, kind: 'sys', who: 'leo', text: 'LEO pinned the burnt bread' },
    { t: 17.4, kind: 'msg', who: 'cancer', text: 'ok. I love you all. put your phones down.' },
    { t: 18.75, kind: 'agenda', who: 'cap', rows: ['1. be here'], ticks: [19.6] },
    { t: 20.3, kind: 'voice', who: 'pisces', dur: '0:02', sob: true, play: [20.5, 22.0], react: { t: 21.0, mark: 'heart', n: 12 } },
  ],
  pins: [{ t: 16.2, who: 'leo', text: '(the burnt bread. iconic.)' }],
  typing: [{ who: 'pisces', a: 2.4, b: 3.55 }, { who: 'virgo', a: 12.6, b: 13.85 }],
  subtitle: '12 stars · 1 table',
  cuts: [10.75, { t: 13.75, kind: 'flip' }, 18.6],
  stage(x, t, K) {
    const rev = K.pop01(t, 6.8, 0.5, 1.6)
    if (rev < 0.02) {
      // alone (so it seems): a dim spotlight on Pisces
      const g = x.createRadialGradient(540, 1760, 0, 540, 1760, 260); g.addColorStop(0, 'rgba(143,216,246,0.18)'); g.addColorStop(1, 'rgba(143,216,246,0)'); x.fillStyle = g; x.fillRect(280, 1500, 520, 420)
      K.stageStar(x, t, { who: 'pisces', x: 540, y: 1730, s: 230, mood: 'wide', look: [0.3, -1], tears: t > 3.6 ? 3 : 1, phone: 1, hops: [-0.2, 3.6] })
      return
    }
    // the reveal: everyone at one table, Pisces in the middle
    x.fillStyle = '#8a5a3a'; x.fillRect(60, 1790, 960 * Math.min(1, rev), 26); x.fillRect(100, 1816, 16, 70); x.fillRect(964, 1816, 16, 70)
    drawProp(x, 'bread', 300, 1772, 6)
    const order = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'pisces', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius']
    order.forEach((id, i) => {
      if (id === 'pisces') return
      const k = K.pop01(t, 6.85 + i * 0.05, 0.3, 2)
      K.stageStar(x, t, { who: id, glyph: false, x: 80 + i * 84, y: 1740 + (i % 2) * 12, s: 98, mood: t > 13.9 ? 'happy' : t > 10.95 && t < 13.9 ? 'sparkle' : 'happy', pop: k, hops: [13.95 + (i % 4) * 0.08, 15.2 + (i % 3) * 0.1] })
    })
    K.stageStar(x, t, { who: 'pisces', glyph: false, x: 584, y: 1724, s: 140, mood: t < 9.6 ? 'wide' : 'happy', tears: t > 20.3 ? 3 : 2, hops: [6.9, 9.6, 20.3, 20.6] })
    if (t > 13.9) K.sparkles(x, t, 540, 1700, 13.95, 12, 300, 2)
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
