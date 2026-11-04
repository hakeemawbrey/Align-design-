// nh15e03: HOME FOR THE HOLIDAYS, "Gemini wrote three family guides" (35 s vertical, Season 15 ep 3; rows in
// promo/films/next30/b03.md; music chiptune · A). Story 0–30.6, then the shared end card. Show look: ../../nh15e01/homekit.js.
//   0.0–4.0    "*Gemini* prepped the date | with *three* guides."  Frame 0: on the porch, Gemini fans out three index
//              cards (A, B, C); the Aquarius date squints at them.
//   4.0–13.8   "Three guides. | *Zero* agreement."  The cards fly up one by one, big: A "Dad loves sports talk." B "never
//              bring up sports." C "Dad is mostly a cat person." A question mark pops over the date at each.
//              AQUARIUS: "so… does Dad like *sports*?"
//  14.0        flash: the door opens. "The door | *opens…*"  Dad (Taurus): "come in, it's *cold*." That's it.
//  17.2        inside by the fire. "No guide | *needed.*"  The date and Dad chat easily (a cat, snow, a big laugh); Gemini
//              watches, cards in hand; the Pisces cousin cries at the window.
//  19.0        card cut. THE STARS: "you don't need a script." → "let them meet *you*." Gemini drops the cards.
//  25.0–30.5   last line "No notes. | *Just us.*"
import { makeHome, drawHouse, drawYard, drawRoom, bubble, label, hearts, sparkles, snow, shadow, drawBits, R, INK, BONE, GOLD, PINK, RED, pop01, outK, prog, lerp, clamp, ease, win, stand, tagOf, r3 } from '../../nh15e01/homekit.js'

const AQU = tagOf('aquarius'), DAD = '♉︎ DAD', STARS = 'THE STARS'
const T = { cards: [4.1, 7.1, 10.1], door: [14.0, 14.4], inside: 17.2, chat: [17.8, 19.4, 21.0], cut: 19.0, drop: 23.4, last: 25.0 }
const LINES = [
  { t: 11.6, speaker: AQU, color: '#7fd0f0', text: 'so… does Dad like *sports*?' },
  { t: 14.6, speaker: DAD, color: '#9fe6b0', text: "come in, it's *cold*." },
  { t: 19.6, speaker: STARS, text: "you don't need a *script*." },
  { t: 22.2, speaker: STARS, text: 'let them meet *you*.' },
]
const GUIDES = [['GUIDE A', 'Dad loves', 'sports talk.'], ['GUIDE B', 'never bring', 'up sports.'], ['GUIDE C', 'Dad is mostly', 'a cat person.']]
const CARD_COL = ['#fff1c8', '#d8f0ff', '#ffd8e8']

function indexCard(x, cx, cy, w, h, rot, i, big) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 12, -h / 2 + 14, w, h)
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, CARD_COL[i], -w / 2, -h / 2, w, h)
  R(x, '#e86a7a', -w / 2, -h / 2 + h * 0.24, w, Math.max(2, h * 0.015))
  for (let k = 1; k < 4; k++) R(x, 'rgba(127,160,220,0.5)', -w / 2, -h / 2 + h * 0.24 + k * h * 0.19, w, Math.max(1, h * 0.008))
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  if (big) {
    x.font = `700 ${Math.round(h * 0.11)}px 'Space Mono', monospace`; x.fillStyle = '#c0303e'; x.fillText(GUIDES[i][0], 0, -h / 2 + h * 0.13)
    x.font = `800 ${Math.round(h * 0.16)}px Inter, sans-serif`; x.fillStyle = INK
    x.fillText(GUIDES[i][1], 0, -h * 0.02); x.fillText(GUIDES[i][2], 0, h * 0.2)
  } else { x.font = `800 ${Math.round(h * 0.5)}px Inter, sans-serif`; x.fillText('ABC'[i], 0, h * 0.04) }
  x.restore()
}
const QM = ['.QQQ.', 'Q...Q', '...Q.', '..Q..', '.....', '..Q..']

const EP = makeHome({
  id: 'nh15e03', duration: 35, hero: 'gemini', date: 'aquarius',
  heads: [
    { text: '*Gemini* prepped the date | with *three* guides.', at: -1, out: [3.85, 4.05], size: 86, accentSize: 116 },
    { text: 'Three guides. | *Zero* agreement.', at: 4.1, out: [13.7, 13.9], accent: '#ffe27a' },
    { text: 'The door | *opens…*', at: T.door[0] + 0.1, out: [17.0, 17.2], accent: '#9fe6b0' },
    { text: 'No guide | *needed.*', at: T.inside + 0.1, out: [24.75, 24.95], accent: '#7fd0f0' },
    { text: 'No notes. | *Just us.*', at: T.last, out: [30.05, 30.45], size: 108, accentSize: 156, late: 2, lateAt: T.last + 0.6, wobble: true },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 0, close: 13.8 }, { from: 1, to: 1, close: 17.05 }, { from: 2, to: 3, close: 24.8 }],
  flashes: [T.door[0], T.inside], shakes: [],
  cuts: [T.door[0], { t: T.cut, kind: 'flip' }, T.last],
  draw(x, t, K) {
    if (t < T.inside) {
      // ── the porch
      const op = ease.inOutCubic(prog(t, ...T.door))
      drawHouse(x, t, { open: op, wall: '#4a5a8a', trim: '#3f4d7a', door: '#2f8f55' })
      drawYard(x, t)
      const gx = 300, dx = 760
      shadow(x, gx, 1350, 190); shadow(x, dx, 1350, 180)
      const confused = T.cards.filter(c => t > c + 0.6).length
      K.hero(x, t, { x: gx, y: stand(240), s: 240, mood: t < T.door[0] ? 'sparkle' : 'wide', look: t < T.door[0] ? [1, -0.4] : [0.6, -0.4], hops: [-0.1, ...T.cards, T.door[0] + 0.1], scarf: '#ffe27a' })
      K.date(x, t, { x: dx, y: stand(230), s: 230, mood: t < T.door[0] ? (confused >= 3 ? 'wide' : 'squint') : 'happy', look: t < T.door[0] ? [-1, -0.5] : [-0.6, -0.3], hops: [T.cards[0] + 0.6, T.cards[1] + 0.6, T.cards[2] + 0.6, ...K.hops(AQU)], scarf: '#7fd0f0' })
      // question marks over the date, one per guide
      for (let i = 0; i < 3; i++) { const k = pop01(t, T.cards[i] + 0.6, 0.25, 2.8) * outK(t, [T.door[0] - 0.2, T.door[0]]); if (k > 0.01) drawBits(x, QM, { Q: ['#ffe27a', '#7fd0f0', PINK][i] }, dx - 80 + i * 80, stand(230) - 190 - (i % 2) * 30, 9 * k) }
      // the three cards: fanned in Gemini's hand, then each flies up big in turn
      for (let i = 0; i < 3; i++) {
        const a = T.cards[i], b = T.cards[i + 1] ?? 13.4
        const up = ease.outBack(prog(t, a, a + 0.4)), down = ease.inCubic(prog(t, b - 0.25, b))
        const k = clamp(up - down)
        const sx = gx - 40 + (i - 1) * 70, sy = stand(240) - 170, sr = (i - 1) * 0.28
        if (t < T.door[0]) indexCard(x, lerp(sx, 540, k), lerp(sy, 800, k), lerp(110, 640, k), lerp(70, 380, k), lerp(sr, (i - 1) * 0.04, k), i, k > 0.5)
      }
      // Dad in the doorway
      if (op > 0.3) K.fam(x, t, 'taurus', { x: 545, y: stand(230), s: 230, pop: pop01(t, T.door[0] + 0.2, 0.35, 2.1), mood: 'happy', look: [0, 0], tag: 'DAD', hat: RED, hops: K.hops(DAD) })
      snow(x, t, { n: 60 })
      return
    }
    // ── inside, by the fire
    drawRoom(x, t, { fireX: 540, treeX: 900, windowX: 110, wall: '#3f4d7a', stripe: '#45548a' })
    // Pisces cousin at the window, crying
    K.pisces(x, t, { x: 230, y: 880, s: 140, tears: t > T.last ? 3 : 2, look: [1, 0.4], tag: 'COUSIN' })
    const dx = 440, fx = 680, gx = 900
    shadow(x, dx, 1350, 180); shadow(x, fx, 1350, 190); shadow(x, gx, 1350, 170)
    const together = ease.inOutCubic(prog(t, T.last - 0.4, T.last + 0.2))
    K.date(x, t, { x: lerp(dx, 520, together), y: stand(230), s: 230, mood: t < T.last ? 'happy' : 'heart', look: t < T.last ? [1, 0] : [1, 0], hops: [...T.chat, T.last + 0.3], scarf: '#7fd0f0' })
    K.fam(x, t, 'taurus', { x: lerp(fx, 230 + 60, 0) , y: stand(240), s: 240, mood: 'happy', look: [-1, 0], tag: 'DAD', hat: RED, hops: T.chat.map(c => c + 0.5), alpha: 1 - together })
    K.hero(x, t, { x: lerp(gx, 760, together), y: stand(220), s: 220, mood: t < T.drop ? 'wide' : t < T.last ? 'happy' : 'heart', look: [-1, 0], hops: [T.drop, T.last + 0.35], scarf: '#ffe27a' })
    // the chat: little picture bubbles between the date and Dad
    const pics = [['', 'cats?!'], ['', 'snow!'], ['', 'HA!']]
    T.chat.forEach((c, i) => bubble(x, t, i % 2 ? fx - 30 : dx + 30, 960 - i * 20, c, c + 1.5, pics[i][1], { size: 34, tail: i % 2 ? 0.3 : -0.3 }))
    // Gemini's cards: held… then dropped, fluttering down
    for (let i = 0; i < 3; i++) {
      const f = prog(t, T.drop + i * 0.08, T.drop + 1.2 + i * 0.08)
      const cx = gx + 40 + (i - 1) * 46 + Math.sin(f * 8 + i) * 40 * f, cy = lerp(stand(220) - 150, 1330, ease.inQuad(f))
      if (f < 1 && t < T.last) indexCard(x, cx, cy, 90, 58, (i - 1) * 0.3 + f * 3 * (i - 1 || 1), i, false)
      else if (t < T.last + 0.3) indexCard(x, gx + (i - 1) * 70, 1335, 90, 30, 0, i, false)
    }
    if (win(t, 19.2, 25.0)) K.stars(x, t, { x: 860, y: 640, s: 170, pop: pop01(t, 19.3, 0.36, 2.1) * outK(t, [24.7, 24.95]), mood: t > 22 ? 'happy' : 'neutral', look: [-1, 0.6], hops: K.hops(STARS) })
    hearts(x, t, T.last + 0.4, 640, 1000, { n: 7 })
    if (t > T.last) sparkles(x, t, 640, 1000, T.last + 0.6, 12, 260, 3)
    void label
  },
  cues: [
    ...T.cards.flatMap((c, i) => [['whoosh', c, 0.35, 0.035], ['pop', r3(c + 0.3), [1318.51, 1567.98, 1760][i], 0.045, 0], ['pluck', r3(c + 0.6), 659.25, 0.03, 0.4, 0.3]]),
    ['whoosh', T.door[0] + 0.05, 0.5, 0.03], ['pop', T.door[0] + 0.25, 739.99, 0.04, 0],
    ...T.chat.flatMap((c, i) => [['pop', c, [987.77, 1174.66, 1318.51][i], 0.04, i % 2 ? 0.3 : -0.3]]),
    ...[0, 1, 2].map(i => ['tick', r3(T.drop + 1.1 + i * 0.08), 0.04]), ['whoosh', T.drop, 0.6, 0.025],
    ['pluck', 22.5, 2349.32, 0.015, 0.3, -0.6],
    ['pop', T.last + 0.6, 1174.66, 0.05, 0], ['bell', T.last + 0.65, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.6, T.last + 1.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, GOLD, RED]
