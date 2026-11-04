// n3ae01 · 3 AM IN WINTER 1: "Aries, first snow, 3 AM idea" (18 s vertical, star_advice trial reel, lofi Am).
// Rows: promo/films/next30/b40.md. The format engine is ../amkit.js (shared by n3ae01–n3ae12).
//   0      "3 AM. First snow. | *Aries* is up."  ♈ Aries hops at the frosted window, nose to the glass.
//   1.5    "SNOW!!"   3.6 "text them: *snowman*, now?" (the phone comes out)   5.7 "…it's *3 AM.*" (Aries freezes)
//   7.5    card cut. THE STARS in the window: "Invite them for *tomorrow*. The snow will wait for you."
//   ~10.4  last line: "Snow *keeps*."  ♓ Pisces across the street, crying at the snow the whole time.
import { makeAM, R, INK, pop01, outK, clamp, prog } from '../amkit.js'

const PHONE = { w: 70, h: 120 }
const AM = makeAM({
  sign: 'aries',
  caption: '3 AM. First snow. | *Aries* is up.', captionAccent: '#ff9a7a',
  thoughts: ['SNOW!!', 'text them: *snowman*, now?', '…it\'s *3 AM.*'],
  line: 'Invite them for *tomorrow*. The snow will wait for you.',
  last: 'Snow *keeps*.', lastAccent: '#ffd0a0',
  me: { x: 420, y: 1228, s: 250 },
  mood(t, T) {
    if (t < T.th[0]) return { mood: 'sparkle', look: [0.4, -1], hops: [0, 0.4, 0.8, 1.2] }
    if (t < T.th[1]) return { mood: 'sparkle', look: [0.4, -1], hops: [1.52, 1.9, 2.3, 2.7, 3.1] }
    if (t < T.th[2]) return { mood: 'happy', look: [1, 0] }
    if (t < T.cut) return { mood: 'wide', look: [1, 0], sweat: 2, hops: [T.th[2] + 0.02] }
    if (t < T.last) return { mood: 'neutral', look: [0, -1] }
    return { mood: 'happy', hops: [T.last + 0.08, T.last + 0.5, T.last + 0.95] }
  },
  over(x, t, W) {
    const { T } = W
    // the phone, out for the "text them" thought, put away after the cut
    const k = pop01(t, T.th[1] + 0.1, 0.3, 2) * outK(t, [T.cut + 0.2, T.cut + 0.5])
    if (k <= 0.01) return
    const F = W.starFrame(W.ME.x, W.ME.y, W.ME.s, t, { hops: [] , seed: 3 })
    const px = W.ME.x + 150, py = F.cy + 20
    x.save(); x.translate(px, py); x.rotate(-0.12); x.scale(k, k)
    R(x, INK, -PHONE.w / 2 - 5, -PHONE.h / 2 - 5, PHONE.w + 10, PHONE.h + 10)
    R(x, '#2a2a40', -PHONE.w / 2, -PHONE.h / 2, PHONE.w, PHONE.h)
    const glow = t < T.th[2] ? 1 : 0.6
    x.globalAlpha *= glow; R(x, '#9fd8ff', -PHONE.w / 2 + 6, -PHONE.h / 2 + 10, PHONE.w - 12, PHONE.h - 24)
    R(x, '#ffffff', -PHONE.w / 2 + 12, -PHONE.h / 2 + 22, 40, 10); R(x, '#5a8ad0', -PHONE.w / 2 + 12, -PHONE.h / 2 + 40, 30, 10)
    x.restore()
    void clamp; void prog
  },
})

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
