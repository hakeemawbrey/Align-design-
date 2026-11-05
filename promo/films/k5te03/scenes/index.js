// k5te03: 5 THINGS EVERY GEMINI NEEDS TO HEAR, "Gemini, say the real thing" (10.5 s, chiptune · A). Frame 0: Gemini mid-juggle of two phones and a laptop, all flying; record scratch "yep. *three screens.*"; hard cut.
// Rows: promo/films/month2/m33.md #3. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te03', sign: 'gemini', name: 'Gemini', D: 10.5, ending: 'cut',
  brk: { type: 'scratch', at: 0.42, caption: 'yep. *three screens.*' },
  hookLine: "Gemini. *Which tab* | are you on?",
  hook(x, th, S) {
    shadow(x, 540, 1220, 300)
    S.hero(x, th, { x: 540, y: 1050, s: 330, mood: 'wide', look: [0, -1], squash: -0.06, bob: 0 })
    const scr = (c, w, h, k) => { for (let i = 0; i < 4; i++) R(c, i % 2 ? '#ffe27a' : BONE, 12 + (i % 2) * 30, 18 + i * 44, w - 60, 30) }
    const P = [[300, 690, 120, 0.6], [780, 650, 120, -0.5]]
    P.forEach(([cx, cy, w, sp], i) => phone(x, cx + 20 * Math.sin(th * 3 + i), cy - 40 * Math.sin(th * 2 + i * 2), w, sp + th * (i ? -4 : 4), scr, { glow: 0.6 }))
    // the laptop, flipping over the top
    x.save(); x.translate(540 + 30 * Math.sin(th * 2), 520 - 30 * Math.cos(th * 2.4)); x.rotate(0.4 + th * 3)
    box(x, -110, -70, 220, 130, '#3a2d66', { b: 6 }); R(x, '#7fd0ff', -96, -58, 192, 104); box(x, -130, 66, 260, 22, '#8c86a8', { b: 5 })
    x.restore()
    debris(x, th, 540, 700, { n: 10, spread: 380, cols: ['#ffe27a', BONE], sz: 16, seed: 2, v: 0.4 })
  },
  items: [
    {text: "Your mind is not | *too much.*", icon: "sparkle", mood: "happy"},
    {text: "Pick *one* chat tonight.", icon: "chat", mood: "neutral"},
    {text: "Boredom isn’t a | *red flag.*", icon: "flag", mood: "squint"},
    {text: "Say the *second* thought.", icon: "heart", mood: "wide"},
    {text: "The right person | *keeps up.*", icon: "hug", mood: "heart"},
  ],
  last: "Curious is your | *love language.*",
  music: { style: 'chiptune', key: 'A', seed: 3303 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
