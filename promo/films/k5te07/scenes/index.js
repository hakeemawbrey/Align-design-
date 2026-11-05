// k5te07: 5 THINGS EVERY LIBRA NEEDS TO HEAR, "Libra, you\u2019re allowed to choose" (10 s, synthwave · C). Frame 0: Libra mid-coin-flip, the coin spinning in the air between two plans; sudden silence (tape stop + freeze "*…still deciding.*"); hard cut.
// Rows: promo/films/month2/m33.md #7. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te07', sign: 'libra', name: 'Libra', D: 10, ending: 'cut',
  brk: { type: 'silence', at: 0.42, caption: '*…still deciding.*' },
  hookLine: "Libra. *Just pick* | the restaurant.",
  hook(x, th, S) {
    // two plan cards
    const card = (cx, rot, a, b, col) => { x.save(); x.translate(cx, 760); x.rotate(rot); box(x, -150, -110, 300, 220, BONE, { b: 7 }); R(x, col, -150, -110, 300, 56)
      x.font = `800 30px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(a, 0, -82); x.font = `800 44px ${INTER}`; x.fillText(b, 0, 20); x.restore() }
    card(220, -0.12, 'PLAN A', 'noodles', '#7fd0ff'); card(860, 0.12, 'PLAN B', 'tacos', '#ff8fb1')
    // the coin, spinning mid-air
    const w = Math.abs(Math.cos(th * 14)) * 70 + 8
    x.save(); x.translate(540, 560 - 20 * Math.sin(th * 3)); R(x, INK, -w - 6, -76, 2 * w + 12, 152); R(x, GOLD, -w, -70, 2 * w, 140); R(x, '#fff1c8', -w * 0.5, -56, w * 0.4, 112); x.restore()
    shadow(x, 540, 1230, 300)
    S.hero(x, th, { x: 540, y: 1060, s: 330, mood: 'wide', look: [0, -1], squash: -0.04, bob: 0 })
  },
  items: [
    {text: "Your opinion is | *welcome here.*", icon: "chat", mood: "happy"},
    {text: "No is a | *full sentence.*", icon: "shield", mood: "neutral"},
    {text: "Peace can include | *conflict.*", icon: "hug", mood: "wide"},
    {text: "Choose *you* first | sometimes.", icon: "heart", mood: "sparkle"},
    {text: "Being liked isn’t | *being loved.*", icon: "crown", mood: "heart"},
  ],
  last: "Your vote counts. | *Cast it.*",
  music: { style: 'synthwave', key: 'C', seed: 3307 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
