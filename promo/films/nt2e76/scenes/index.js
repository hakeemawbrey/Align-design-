// nt2e76: LITTLE TREAT, "Little Treat: Aries listened" (18 s vertical, Star Talk Trends Vol. 2 ep 76,
// promo/films/next30/b14.md; music: chiptune · C). Story 0–15.6, then the shared short end card. Format: ./treat.js.
//   0.0–2.1    hook (frame 0): "Little treat for *every* dating win."  Aries mid-bite of a cookie, crumbs flying.
//   2.1–4.85   WIN 1 "*listened* without interrupting."  Libra tells a long story; Aries vibrates, mouth zipped… and
//              lets it finish. → a cocoa.
//   4.85–7.6   WIN 2 "let them pick the *place.*"  Libra: "the noodle place?" Aries: "YES. love that." → a cookie.
//   7.6–10.95  WIN 3 (the twist) "said “I like you” *first.*"  Aries blurts it (it always does). Libra pulls out a
//              cupcake: "I got you one too." → the treat comes from the date.
//   11.35      the stamp "TREAT *EARNED.*"  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Brave earns *dessert*."
import { makeTreat, treatIcon, FLOOR, R, box, bubble, label, shadow, sparkles, hearts, inSprite, starFrame, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, T } from './treat.js'

function zipper(x, F) {
  inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(13, 24, 10, 1.4); for (let i = 0; i < 5; i++) x.fillRect(13.5 + i * 2, 23.4, 1, 2.6); x.fillStyle = GOLD; x.fillRect(22, 23.6, 2, 2) })
}

const tells = [
  { caption: '*listened* without interrupting.', treat: 'cocoa',
    draw(x, t, S) {
      const { u, hero, date } = S
      shadow(x, 300, FLOOR + 30, 200); shadow(x, 760, FLOOR + 30, 200)
      date(x, t, { x: 760, y: 1000, s: 220, mood: 'happy', look: [-1, 0], hops: [0.2, 0.45, 0.7, 0.95, 1.2].map(v => S.t0 + v) })
      bubble(x, t, 700, 760, S.t0 + 0.2, S.t0 + 1.5, '…and THEN my cousin—', { size: 32, tail: 0.3 })
      const o = { x: 300, y: 1000, s: 220, mood: u < 1.5 ? 'wide' : 'happy', look: [1, 0], squash: u < 1.5 ? 0.03 * Math.sin(t * 40) : 0, hops: [S.t0 + 1.55] }
      hero(x, t, o)
      if (u < 1.5) zipper(x, starFrame(o.x, o.y, o.s, t, { ...o, seed: 3 }))
    },
    treatPos: [540, 620], pis: { x: 960, y: 1660 },
    cues: [0, 1, 2, 3, 4].map(i => ['pop', 0.2 + i * 0.25, 880 + i * 60, 0.02, 0.3]) },
  { caption: 'let them pick the *place.*', treat: 'cookie',
    draw(x, t, S) {
      const { u, hero, date } = S
      shadow(x, 300, FLOOR + 30, 200); shadow(x, 760, FLOOR + 30, 200)
      date(x, t, { x: 760, y: 1000, s: 220, mood: 'sparkle', look: [-1, -0.2], hops: [S.t0 + 0.3] })
      bubble(x, t, 760, 760, S.t0 + 0.3, S.t1, 'the noodle place?', { size: 32, tail: 0 })
      const nod = u > 0.9 && u < 1.5 ? Math.sin((u - 0.9) * 30) : 0
      hero(x, t, { x: 300, y: 1000 + nod * 10, s: 220, mood: 'happy', look: [1, nod * 0.8], hops: [S.t0 + 0.9, S.t0 + 1.1, S.t0 + 1.3] })
      bubble(x, t, 300, 1260 - 400, S.t0 + 1.0, S.t1, 'YES. love that.', { size: 32, tail: 0 })
    },
    treatPos: [540, 620], pis: { x: 120, y: 1660, look: [1, -0.6] },
    cues: [['pop', 0.3, 880, 0.03, 0.3], ['pop', 1.0, 1174.66, 0.035, -0.3]] },
  { caption: 'said “I like you” *first.*', treat: 'cupcake', treatAt: 1.95,
    draw(x, t, S) {
      const { u, hero, date } = S
      shadow(x, 300, FLOOR + 30, 200); shadow(x, 760, FLOOR + 30, 200)
      hero(x, t, { x: 300, y: 1000, s: 230, mood: u < 1.0 ? 'squint' : 'happy', look: [1, 0], squash: u < 0.6 ? -0.06 : 0, hops: [S.t0 + 0.6, S.t0 + 2.0] })
      bubble(x, t, 330, 760, S.t0 + 0.6, S.t1, 'I like you.', { size: 40, tail: -0.2 })
      date(x, t, { x: 760, y: 1000, s: 220, mood: u > 1.2 ? 'heart' : 'wide', look: [-1, 0], hops: [S.t0 + 1.2, S.t0 + 1.95] })
      bubble(x, t, 760, 1260 - 400, S.t0 + 2.1, S.t1, 'I got you one too.', { size: 30, tail: 0 })
      if (u > 1.2) hearts(x, t, S.t0 + 1.25, 760, 880, { n: 3 })
    },
    treatPos: [640, 600], pis: { x: 960, y: 1660 },
    cues: [['pop', 0.6, 1318.51, 0.04, -0.3], ['pluck', 1.2, 1567.98, 0.03, 0.3, 0.3], ['pop', 2.1, 987.77, 0.03, 0.3]] },
]

const EP = makeTreat({
  id: 'nt2e76', sign: 'aries', name: 'Aries', date: 'libra', deep: '#c0392b', accent: '#ffd23f',
  hookText: 'Little treat for | *every* dating win.',
  hook(x, t, S) {
    shadow(x, 540, FLOOR + 30, 260)
    S.hero(x, t, { x: 520, y: 980, s: 300, mood: 'happy', look: [1, 0], hops: [0.2, 0.7, 1.2, 1.7] })
    const bite = Math.floor(t * 2.2) % 2
    x.save(); x.translate(700, 1010); x.rotate(-0.2 + 0.1 * bite); treatIcon(x, t, 'cookie', 0, 0, 150); if (bite) { x.fillStyle = INK; x.beginPath(); x.arc(-60, -40, 30, 0, Math.PI * 2); x.fill(); x.globalCompositeOperation = 'destination-out' } x.restore()
    for (let i = 0; i < 6; i++) { const ph = (t * 1.4 + i / 6) % 1; R(x, '#d9a45a', 660 + Math.sin(i * 2) * 60 * ph, 1000 + ph * 160, 10, 10) }
  },
  hookCues: [['tick', 0.45, 0.05], ['tick', 0.9, 0.05], ['tick', 1.35, 0.05]],
  tells,
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    hero(x, t, { x: 420, y: 700, s: 230, pop: ok, mood: 'sparkle', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 680, y: 710, s: 210, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
  },
  last: 'Brave earns *dessert*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, label, sparkles, pop01, outK, prog, lerp, clamp, ease, BONE, PINK, RED, INTER]
