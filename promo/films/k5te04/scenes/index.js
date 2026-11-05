// k5te04: 5 THINGS EVERY CANCER NEEDS TO HEAR, "Cancer, who is taking care of you" (11.5 s, dreamy · D). Frame 0: Cancer mid-pour, a soup pot bubbling over with heart steam, the ladle flying; colour flash; loops.
// Rows: promo/films/month2/m33.md #4. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te04', sign: 'cancer', name: 'Cancer', D: 11.5, ending: 'loop',
  brk: { type: 'flash', at: 0.4 },
  hookLine: "Cancer. Who’s feeding | *YOU* tonight?",
  hook(x, th, S) {
    S.hero(x, th, { x: 540, y: 860, s: 300, mood: 'wide', look: [0, 1], squash: 0.05, bob: 0 })
    // heart steam rising out of the pot
    for (let i = 0; i < 9; i++) { const p = ((th * 0.5 + i / 9) % 1); drawBits(x, HEART, { H: i % 2 ? PINK : '#ff5c8a' }, 540 + Math.sin(i * 2.1 + p * 4) * 200, 1040 - p * 640, 6 + 4 * (i % 3), { alpha: 0.85 * Math.sin(Math.PI * p) }) }
    // the pot
    box(x, 330, 1040, 420, 230, '#c94f3a', { b: 8, hi: '#e8735a' }); box(x, 300, 1020, 480, 40, '#e8735a', { b: 7 })
    R(x, INK, 290, 1100, 40, 26); R(x, INK, 750, 1100, 40, 26)
    for (let i = 0; i < 6; i++) R(x, '#ffe7a8', 330 + i * 70 + 10 * Math.sin(th * 8 + i), 1000 - 10 * Math.abs(Math.sin(th * 6 + i)), 50, 26)
    // the ladle, flying
    x.save(); x.translate(820 + 40 * th, 640 - 60 * th); x.rotate(0.8 + th * 5)
    R(x, INK, -10, -150, 20, 200); R(x, '#cfc8e8', -5, -146, 10, 192); box(x, -40, 40, 80, 46, '#cfc8e8', { b: 6 })
    x.restore()
  },
  items: [
    {text: "Your softness isn’t | a *weakness.*", icon: "heart", mood: "sparkle"},
    {text: "Let someone | *cook for you.*", icon: "cup", mood: "happy"},
    {text: "Say it before | you *shell up.*", icon: "chat", mood: "wide"},
    {text: "Old photos can | *stay closed.*", icon: "door", mood: "neutral"},
    {text: "Being home to | *yourself* counts.", icon: "house", mood: "heart"},
  ],
  last: "Take your turn | *being held.*",
  music: { style: 'dreamy', key: 'D', seed: 3304 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
