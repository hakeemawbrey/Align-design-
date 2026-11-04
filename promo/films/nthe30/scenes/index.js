// nthe30: THE THREAD, episode 30, "Dietary needs" (25 s vertical, promo/films/next30/b06.md, music: jazzy · D)
// Story 0–20.6, then the shared end card. The look lives in ../../nthe17/scenes/threadkit.js.
//   0.00  "Cancer: ‘dietary needs. go.’"  ♋ Cancer mid-stir at a big pot (the year-end dinner).
//   0.6   ♉ "yes" · ♈ "spicy. very spicy." · ♒ "something no one has ever tried" · ♍ a spreadsheet · ♊ triple ·
//         ♓ voice note, sobbing (chopping onions).
//   7.0   Cancer wants to surprise their partner with the partner's family recipe. What if it's not like theirs?
//  10.7   card cut → ♍ "ask them to teach you. cooking it together is the gift." (gold)
//  12.6   "but the surprise" · ♑ "agenda item: the surprise is that you asked."
//  14.9   The partner teaches; Cancer hands them a spoon; they're humming.  "Let them *stir*."
import { threadFilm } from '../../nthe17/scenes/threadkit.js'

function sheet(x, X, Y, w, h, t) {
  x.fillStyle = '#fffaf0'; x.fillRect(X, Y, w, h)
  x.fillStyle = '#ef5c94'; x.fillRect(X, Y, w, 34)
  x.font = "800 18px 'Space Mono', monospace"; x.fillStyle = '#05040c'
  ;['SIGN', 'NEEDS', 'SPICE'].forEach((c, i) => x.fillText(c, X + 16 + i * w / 3, Y + 23))
  const rows = [['Taurus', 'yes', '1'], ['Aries', 'spicy', '5'], ['Aquarius', 'new', '?']]
  x.font = "700 18px 'Space Mono', monospace"
  rows.forEach((r, j) => r.forEach((c, i) => { x.fillStyle = '#2a2350'; x.fillText(c, X + 16 + i * w / 3, Y + 66 + j * 34) }))
  x.strokeStyle = '#c9cfdc'; x.lineWidth = 2
  for (let j = 1; j < 4; j++) { x.beginPath(); x.moveTo(X, Y + 34 * j + 10); x.lineTo(X + w, Y + 34 * j + 10); x.stroke() }
}
const EP = {
  duration: 25,
  heads: [
    { text: 'Cancer: *‘dietary needs. go.’*', at: -0.9, out: [3.4, 3.65], size: 84 },
    { text: 'The chat: *very specific.*', at: 3.7, out: [7.0, 7.25], size: 88 },
    { text: '‘What if it’s not | like *theirs?*’', at: 7.3, out: [10.6, 10.85], size: 88 },
    { text: 'Let them *teach.*', at: 10.9, out: [14.6, 14.85], size: 100 },
    { text: 'One spoon. *Handed over.*', at: 14.9, out: [16.9, 17.15], size: 88, accent: '#9fe6b0' },
    { text: 'Let them *stir.*', at: 17.2, out: [20.15, 20.45], size: 110, late: 1, lateAt: 17.5 },
  ],
  items: [
    { t: -9, kind: 'msg', who: 'taurus', text: "is there bread" },
    { t: -8, kind: 'msg', who: 'cancer', text: "there is ALWAYS bread" },
    { t: -6, kind: 'msg', who: 'leo', text: 'what are we eating at the dinner' },
    { t: -4, kind: 'sys', who: 'cancer', gold: true, text: 'YEAR-END DINNER: Friday, at Cancer’s' },
    { t: -2, kind: 'msg', who: 'cancer', text: 'dietary needs. go.' },
    { t: 0.6, kind: 'msg', who: 'taurus', text: 'yes' },
    { t: 1.4, kind: 'msg', who: 'aries', text: 'spicy. very spicy.' },
    { t: 2.2, kind: 'msg', who: 'aqua', text: 'something no one has ever tried' },
    { t: 3.2, kind: 'photo', who: 'virgo', h: 180, w: 520, pic: sheet, caption: 'dietary needs (FINAL)' },
    { t: 4.6, kind: 'triple', who: 'gemini', parts: [['Taurus: yes', 'same'], ['Aries: spicy. very spicy.', 'not spicy'], ['Aquarius: something new', 'surprise me']] },
    { t: 5.8, kind: 'voice', who: 'pisces', dur: '0:05', sob: true, play: [6.0, 7.6], react: { t: 6.4, mark: 'tear', n: 3 } },
    { t: 7.3, kind: 'msg', who: 'cancer', text: "also: making my partner's family recipe as a surprise. what if it's not like theirs?" },
    { t: 10.9, kind: 'msg', who: 'virgo', hl: true, text: 'ask them to teach you. cooking it together is the gift.' },
    { t: 12.6, kind: 'msg', who: 'cancer', text: 'but the surprise' },
    { t: 13.5, kind: 'msg', who: 'cap', text: 'agenda item: the surprise is that you asked.' },
    { t: 14.9, kind: 'msg', who: 'cancer', text: "they're teaching me. they have the spoon. they're humming.", react: { t: 15.4, mark: 'heart', n: 12 } },
    { t: 16.3, kind: 'voice', who: 'pisces', dur: '0:02', sob: true, play: [16.5, 17.8] },
  ],
  typing: [{ who: 'virgo', a: 8.6, b: 10.85 }, { who: 'cancer', a: 14.0, b: 14.85 }],
  cuts: [7.1, { t: 10.7, kind: 'flip' }, 16.6],
  stage(x, t, K) {
    K.drawProp(x, 'pot', 450, 1800, 12)
    for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.fillStyle = `rgba(239,230,214,${0.35 * Math.sin(Math.PI * ph)})`; x.fillRect(410 + i * 36 + Math.sin(ph * 6 + i) * 8, 1730 - ph * 90, 10, 10) }
    const mood = t < 7.3 ? 'happy' : t < 10.9 ? 'squint' : t < 14.9 ? 'wide' : 'heart'
    const F = K.stageStar(x, t, { who: 'cancer', x: 230, y: 1730, s: 225, mood, hops: [-0.2, 7.3, 12.6, 14.9, 15.15] })
    if (t < 14.9) K.drawProp(x, 'ladle', F.ox + F.S * 0.42, F.oy - F.base - F.S * 0.05, F.cell * 1.6, { rot: 0.35 * Math.sin(t * 5) })
    // the partner arrives and gets the spoon
    const pk = K.pop01(t, 14.6, 0.35, 2)
    if (pk > 0.01) {
      const P = K.stageStar(x, t, { color: '#ffb38a', seed: 71, x: 640, y: 1740, s: 160, mood: 'happy', pop: pk, hops: [14.7, 15.6, 16.5, 17.4, 18.3] })
      K.drawProp(x, 'spoon', P.ox - P.S * 0.42, P.oy - P.base - P.S * 0.05, P.cell * 1.8, { rot: -0.4 + 0.35 * Math.sin(t * 5) })
      // humming notes
      for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; x.save(); x.globalAlpha *= Math.sin(Math.PI * ph) * pk; x.font = "700 30px 'DejaVu Sans', serif"; x.fillStyle = '#f2c75c'; x.fillText('♪', 680 + i * 26, 1640 - ph * 80); x.restore() }
    }
    K.stageStar(x, t, { who: 'pisces', x: 900, y: 1745, s: 155, mood: t > 14.9 ? 'happy' : 'wide', look: [-1, -0.5], tears: t > 16.3 ? 3 : t > 5.8 ? 2 : 1, phone: -1, hops: [5.8, 16.3, 16.6] })
  },
}
export const { DURATION, SCENES, CUES } = threadFilm(EP)
