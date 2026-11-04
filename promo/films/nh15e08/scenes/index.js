// nh15e08: HOME FOR THE HOLIDAYS, "Scorpio hid the baby photos" (35 s vertical, Season 15 ep 8; rows in
// promo/films/next30/b03.md; music screwed · Ebm). Story 0–30.6, then the shared end card. Show look: ../../nh15e01/homekit.js.
//   0.0–4.6    "*Scorpio* brings someone home. | The album is *hidden.*"  Frame 0: Scorpio mid-tiptoe, sliding a photo album
//              under a sofa cushion; the Cancer date watches from the doorway.
//   4.6        "Guarding | *the vault.*"  Scorpio sits on the cushion, eyes left, eyes right. SCORPIO: "nothing to see here."
//   8.2        "Mom has | *copies.*"  Mom (Leo) sails in with a second album. MOM: "oh, I have *copies*!"
//  11.4        flash: the page. "Tiny Scorpio. | *Tiny dinosaur.*"  A photo of baby Scorpio in a dinosaur costume. Scorpio
//              sinks into its scarf.
//  15.0        card cut. "Then, | *a trade.*"  The date laughs… then holds up its own photo: a tiny Cancer dressed as a
//              lobster. CANCER: "me, age four. *a lobster*." Scorpio peeks out and laughs; the Pisces uncle weeps at both.
//  18.6        "Seen | *and liked.*"  THE STARS: "being seen is *scary*." → "seen *and liked*? that's it."
//  24.4–30.5   last line "Seen. | *Still* liked."
import { makeHome, drawRoom, sofa, bubble, hearts, sparkles, shadow, drawBits, drawStarChar, R, INK, BONE, GOLD, PINK, RED, GREEN, pop01, outK, prog, lerp, clamp, ease, win, stand, tagOf, r3, inSprite } from '../../nh15e01/homekit.js'

const SCO = tagOf('scorpio'), MOM = '♌︎ MOM', CAN = tagOf('cancer'), STARS = 'THE STARS'
const T = { slide: [-0.5, 1.4], sit: 4.6, mom: 8.2, page: 11.4, sink: [12.6, 13.3], trade: 15.2, photo2: 16.0, peek: 17.6, cut: 15.0, last: 24.4 }
const LINES = [
  { t: 5.2, speaker: SCO, color: '#e07aa8', text: 'nothing to see here.' },
  { t: 8.6, speaker: MOM, color: '#ffc06a', text: 'oh, I have *copies*!' },
  { t: 15.6, speaker: CAN, color: '#9fd8f6', text: 'me, age four. *a lobster*.' },
  { t: 19.0, speaker: STARS, text: 'being seen is *scary*.' },
  { t: 21.6, speaker: STARS, text: "seen *and liked*? that's it." },
]
const SEAT = 1200

function album(x, cx, cy, s, rot = 0, col = '#7a3a5a') {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -86, -64, 172, 128); R(x, col, -80, -58, 160, 116); R(x, 'rgba(255,255,255,0.15)', -80, -58, 160, 10)
  R(x, GOLD, -40, -20, 80, 40); x.font = "700 18px 'Space Mono', monospace"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BABY', 0, 1)
  x.restore()
}
/** a framed photo with a tiny star in costume ('dino' | 'lobster') */
function photo(x, t, cx, cy, w, kind, rot = 0, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const h = w * 1.15
  R(x, 'rgba(6,4,18,0.45)', -w / 2 + 14, -h / 2 + 16, w, h)
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, '#fbf7ee', -w / 2, -h / 2, w, h)
  R(x, kind === 'dino' ? '#bfe8ff' : '#ffe0c8', -w / 2 + w * 0.08, -h / 2 + w * 0.08, w * 0.84, w * 0.84)
  const sx = 0, sy = -h / 2 + w * 0.5, ss = w * 0.5
  if (kind === 'dino') {
    drawStarChar(x, sx, sy, ss, t, { color: '#5fbf7a', glyph: null, mood: 'happy', look: [0, 0], seed: 9, bob: 0, tips: false })
    drawBits(x, ['.S...S...S.', 'SSS.SSS.SSS'], { S: '#2f8f55' }, sx, sy - ss * 0.42, ss / 22)
  } else {
    drawStarChar(x, sx, sy, ss, t, { color: '#e8444e', glyph: null, mood: 'happy', look: [0, 0], seed: 8, bob: 0, tips: false })
    for (const d of [-1, 1]) drawBits(x, ['CC.CC', 'CCCCC', '.CCC.'], { C: '#c0303e' }, sx + d * ss * 0.62, sy - ss * 0.18, ss / 20)
  }
  x.font = `700 ${Math.round(w * 0.09)}px 'Space Mono', monospace`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(kind === 'dino' ? 'age 3 · RAWR' : 'age 4 · snip', 0, h / 2 - w * 0.12)
  x.restore()
}

const EP = makeHome({
  id: 'nh15e08', duration: 35, hero: 'scorpio', date: 'cancer',
  heads: [
    { text: '*Scorpio* brings someone home. | The album is *hidden.*', at: -1, out: [4.4, 4.6], size: 76, accentSize: 104 },
    { text: 'Guarding | *the vault.*', at: 4.7, out: [8.0, 8.2], accent: '#e07aa8' },
    { text: 'Mom has | *copies.*', at: T.mom + 0.1, out: [11.2, 11.4], accent: '#ffc06a' },
    { text: 'Tiny Scorpio. | *Tiny dinosaur.*', at: T.page + 0.1, out: [14.8, 15.0], accent: '#5fbf7a' },
    { text: 'Then, | *a trade.*', at: 15.1, out: [18.4, 18.6], accent: '#ff7a6a' },
    { text: 'Seen | *and liked.*', at: 18.65, out: [24.15, 24.35], accent: GOLD },
    { text: 'Seen. | *Still* liked.', at: T.last, out: [30.05, 30.45], size: 112, accentSize: 160, late: 2, lateAt: T.last + 0.6, wobble: true },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 0, close: 8.0 }, { from: 1, to: 1, close: 11.2 }, { from: 2, to: 2, close: 18.4 }, { from: 3, to: 4, close: 24.2 }],
  flashes: [T.page, T.trade], shakes: [T.mom + 0.4],
  cuts: [T.sit, { t: T.cut, kind: 'flip' }, T.last],
  draw(x, t, K) {
    drawRoom(x, t, { fire: false, treeX: 960, windowX: 70, wall: '#4a3a5a', stripe: '#52406a' })
    if (t < T.page || t >= T.trade) {
      // the Pisces uncle peeks over the sofa back (crying at everything, more at the photos)
      K.pisces(x, t, { x: 462, y: SEAT - 215, s: 120, tears: t >= T.trade ? 3 : 1, look: t >= T.trade ? [1, -1] : [1, 0.3] })
      sofa(x, 540, SEAT, 560, '#5a3a6a')
      // the hidden album: slides under the cushion
      const sl = ease.inOutCubic(prog(t, ...T.slide))
      if (t < T.sit) album(x, lerp(780, 600, sl), lerp(SEAT - 60, SEAT - 6, sl), 1.1, lerp(-0.3, 0.05, sl))
      else R(x, '#7a3a5a', 560, SEAT - 4, 90, 10)
      // Scorpio: tiptoe → sits on the cushion like a guard → sinks into scarf → peeks and laughs
      const sit = ease.inOutCubic(prog(t, T.sit - 0.4, T.sit))
      const sink = ease.inOutCubic(prog(t, ...T.sink)) * (1 - ease.inOutCubic(prog(t, T.peek, T.peek + 0.4)))
      const sx = lerp(820, 600, sit), sy = lerp(stand(240), SEAT - 120, sit) + sink * 60
      const eyes = t < T.sit ? [-1, 0] : t < T.mom ? [Math.sin(t * 3) > 0 ? 1 : -1, 0] : t < T.trade ? [1, 0] : t < T.peek ? [-1, -0.2] : [-1, 0]
      const sm = t < T.sit ? 'squint' : t < T.mom ? 'squint' : t < T.peek ? 'wide' : t < T.last ? 'happy' : 'heart'
      if (t < T.sit) shadow(x, sx, 1350, 190)
      const h = K.hero(x, t, { x: sx, y: sy, s: 240, mood: sm, look: eyes, hops: t < T.sit ? [-0.1, 0.35, 0.8, 1.25] : [...K.hops(SCO), T.peek + 0.4, T.last + 0.3], squash: 0.1 * sink, scarf: '#e07aa8', blink: t < T.mom ? false : undefined })
      // the scarf pulled up over the face while sunk
      if (h && sink > 0.05) inSprite(x, h.F, () => { x.fillStyle = INK; x.fillRect(9.4, 25.4 - 10 * sink, 17.2, 4.2 + 10 * sink); x.fillStyle = '#e07aa8'; x.fillRect(10, 26 - 10 * sink, 16, 3 + 10 * sink) })
      // the date in the doorway (left), then on the sofa arm with its own photo
      const come = ease.inOutCubic(prog(t, T.trade - 0.3, T.trade + 0.2))
      const dx = lerp(140, 330, come), dy = lerp(stand(220), SEAT - 110, come)
      if (t < T.sit) shadow(x, dx, 1350, 170)
      K.date(x, t, { x: dx, y: dy, s: 220, mood: t < T.sit ? 'wide' : t < T.trade ? 'happy' : 'sparkle', look: [1, 0], hops: [...K.hops(CAN), T.trade + 0.1] })
      // Mom (Leo) and the second album
      if (t > T.mom) {
        const mk = pop01(t, T.mom, 0.35, 2.2), mx = 860
        shadow(x, mx, 1350, 180)
        K.fam(x, t, 'leo', { x: mx, y: stand(230), s: 230, pop: mk, mood: 'sparkle', look: [-1, 0], tag: 'MOM', hops: [T.mom + 0.35, ...K.hops(MOM)] })
        if (t < T.page) album(x, mx - 110, stand(230) - 20 - 20 * Math.sin(t * 6), 1.1 * mk, 0.1, '#3a5a8a')
      }
      // the trade: two photos side by side
      if (t >= T.trade) {
        photo(x, t, 380, 760, 230, 'lobster', -0.08, pop01(t, T.photo2, 0.35, 2.4) * outK(t, [T.last - 0.3, T.last]))
        photo(x, t, 690, 760, 230, 'dino', 0.07, pop01(t, T.photo2 + 0.25, 0.35, 2.4) * outK(t, [T.last - 0.3, T.last]))
        hearts(x, t, T.peek + 0.5, 470, SEAT - 240, { n: 7 })
        if (win(t, 18.7, T.last)) K.stars(x, t, { x: 540, y: 545, s: 120, pop: pop01(t, 18.75, 0.36, 2.1) * outK(t, [24.0, 24.3]), mood: t > 21.5 ? 'happy' : 'neutral', look: [0, 0.6], hops: K.hops(STARS) })
      }
      if (t > T.last) sparkles(x, t, 470, SEAT - 140, T.last + 0.6, 12, 240, 3)
      // "laser grid" glances while guarding
      if (win(t, T.sit + 0.3, T.mom)) for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha *= 0.35 + 0.2 * Math.sin(t * 8 + i); R(x, '#ff4f6e', 120, 1020 + i * 60, 840, 4); x.restore() }
      return
    }
    // ── the page: the photo, big; Scorpio sinks in the corner
    x.save(); x.fillStyle = 'rgba(10,6,24,0.55)'; x.fillRect(0, 0, 1080, 1920); x.restore()
    R(x, INK, 110, 420, 860, 900); R(x, '#3a5a8a', 120, 430, 840, 880); R(x, '#fbf7ee', 150, 460, 780, 820)
    photo(x, t, 540, 860, 470, 'dino', -0.04, pop01(t, T.page + 0.1, 0.4, 2))
    const sink = ease.inOutCubic(prog(t, ...T.sink))
    const h = K.hero(x, t, { x: 900, y: 1330 + sink * 50, s: 200, mood: 'wide', look: [-1, -1], scarf: '#e07aa8', hops: [T.page + 0.2] })
    if (h && sink > 0.05) inSprite(x, h.F, () => { x.fillStyle = INK; x.fillRect(9.4, 25.4 - 10 * sink, 17.2, 4.2 + 10 * sink); x.fillStyle = '#e07aa8'; x.fillRect(10, 26 - 10 * sink, 16, 3 + 10 * sink) })
    K.date(x, t, { x: 180, y: 1330, s: 190, mood: t > T.page + 1.2 ? 'happy' : 'wide', look: [1, -1], hops: [T.page + 1.2, T.page + 1.6, T.page + 2.0] })
    bubble(x, t, 260, 1130, T.page + 1.3, T.trade - 0.1, 'awww!!', { size: 36, tail: -0.4 })
    void [PINK, RED, GREEN, BONE, clamp]
  },
  cues: [
    ['whoosh', 0.2, 0.5, 0.025], ['tick', 1.4, 0.05],
    ['pop', T.sit, 659.25, 0.035, 0], ...[5.6, 6.4, 7.2].map(s => ['tick', s, 0.04]),
    ['whoosh', T.mom, 0.4, 0.035], ['pop', T.mom + 0.35, 1174.66, 0.045, 0.3],
    ['pop', T.page + 0.1, 1318.51, 0.045, 0], ['bell', T.page + 0.2, 1760, 0.025, 0.9, 0], ['whoosh', T.sink[0], 0.6, 0.025],
    ['pop', T.photo2, 987.77, 0.045, -0.3], ['pop', T.photo2 + 0.25, 1174.66, 0.045, 0.3],
    ['pluck', T.peek + 0.4, 1567.98, 0.04, 0.5, 0], ['glitter', T.peek + 0.5, T.peek + 1.0], ['pluck', 17.0, 2349.32, 0.015, 0.3, 0.7],
    ['pop', T.last + 0.6, 1174.66, 0.05, 0], ['bell', T.last + 0.65, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.6, T.last + 1.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
