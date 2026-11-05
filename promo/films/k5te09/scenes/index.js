// k5te09: 5 THINGS EVERY SAGITTARIUS NEEDS TO HEAR, "Sagittarius, staying isn\u2019t a cage" (10.5 s, funk · Eb). Frame 0: Sag mid-leap onto an overstuffed suitcase, the zip bursting, socks flying; record scratch "yep. *packing again.*"; hard cut.
// Rows: promo/films/month2/m33.md #9. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te09', sign: 'sagittarius', name: 'Sagittarius', D: 10.5, ending: 'cut', bugName: 'Sagittarius',
  brk: { type: 'scratch', at: 0.42, caption: 'yep. *packing again.*' },
  hookLine: "Sag. *Unpack.* | Just for tonight.",
  hook(x, th, S) {
    const sock = (c, i, s) => { c.fillStyle = INK; c.fillRect(-s / 2 - 3, -s - 3, s * 0.5 + 6, s * 1.2 + 6); c.fillRect(-s / 2 - 3, 0, s + 6, s * 0.5 + 6)
      c.fillStyle = i % 2 ? '#7fd0ff' : '#ff8fb1'; c.fillRect(-s / 2, -s, s * 0.5, s * 1.2); c.fillRect(-s / 2, 0, s, s * 0.5); c.fillStyle = BONE; c.fillRect(-s / 2, -s, s * 0.5, s * 0.25) }
    // the suitcase, lid bursting
    box(x, 260, 1080, 560, 220, '#c98a4a', { b: 8, hi: '#e0a66a' }); R(x, '#6b4a2f', 270, 1150, 540, 14)
    x.save(); x.translate(260, 1080); x.rotate(-0.35 - 0.05 * Math.sin(th * 10)); box(x, 0, -60, 560, 60, '#b8793c', { b: 8 }); x.restore()
    debris(x, th, 540, 1020, { n: 12, spread: 360, sz: 34, seed: 7, v: 0.6, shape: sock })
    S.hero(x, th, { x: 560, y: 780 - 30 * Math.sin(th * 2), s: 320, mood: 'wide', look: [0, 1], squash: -0.14, bob: 0 })
    speedLines(x, th, 560, 780, 0.5, { n: 14, r0: 260, col: '#ffd0b0' })
  },
  items: [
    {text: "Staying isn’t | a *cage.*", icon: "house", mood: "wide"},
    {text: "Honest can still | be *gentle.*", icon: "chat", mood: "happy"},
    {text: "Plans are a | *kind of love.*", icon: "calendar", mood: "neutral"},
    {text: "Your freedom | *fits with someone.*", icon: "plane", mood: "sparkle"},
    {text: "Home can be | an *adventure.*", icon: "map", mood: "heart"},
  ],
  last: "The best trip | is *a person.*",
  music: { style: 'funk', key: 'Eb', seed: 3309 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
