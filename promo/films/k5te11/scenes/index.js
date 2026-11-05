// k5te11: 5 THINGS EVERY AQUARIUS NEEDS TO HEAR, "Aquarius, feelings aren\u2019t a bug" (10.5 s, synthwave · F#). Frame 0: Aquarius mid-glitch, half-teleported out of a hug, pixels scattering; glitch; hard cut.
// Rows: promo/films/month2/m33.md #11. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'
import { drawStarChar } from '../../startalk.js'
const drawStarChar0 = (x, th) => drawStarChar(x, 300, 1060, 280, th, { color: '#ff8fb1', mood: 'happy', look: [1, 0], seed: 8, bob: 0, squash: 0.06 })
const EP = makeFive({
  id: 'k5te11', sign: 'aquarius', name: 'Aquarius', D: 10.5, ending: 'cut',
  brk: { type: 'glitch', at: 0.4, len: 0.7, text: 'AQUARIUS.EXE left the hug' },
  hookLine: "Aquarius. Feelings | aren’t a *glitch.*",
  hook(x, th, S) {
    // the friend, hugging air
    shadow(x, 300, 1230, 240)
    drawStarChar0(x, th)
    // Aquarius, sliced and drifting out of frame
    const sl = 9
    for (let i = 0; i < sl; i++) {
      x.save(); x.beginPath(); x.rect(0, 760 + i * 46, 1080, 46); x.clip()
      x.translate(Math.sin(i * 2.3 + th * 9) * 50 * (i % 3 ? 1 : 2.2) + 40 * th, 0)
      S.hero(x, th, { x: 720, y: 980, s: 330, mood: 'wide', look: [-1, 0], bob: 0 })
      x.restore()
    }
    for (let i = 0; i < 26; i++) { const p = ((th * 0.6 + i / 26) % 1); R(x, i % 2 ? '#7fd0f0' : BONE, 720 + Math.cos(i * 1.7) * (120 + 380 * p), 980 + Math.sin(i * 2.9) * (100 + 260 * p) - 200 * p, 16, 16) }
  },
  items: [
    {text: "You can be close | *and free.*", icon: "hug", mood: "happy"},
    {text: "Weird is your | *best feature.*", icon: "sparkle", mood: "sparkle"},
    {text: "Say it before | you *vanish.*", icon: "chat", mood: "wide"},
    {text: "Friends first | is *still love.*", icon: "heart", mood: "happy"},
    {text: "Your heart | *runs fine.*", icon: "check", mood: "heart"},
  ],
  last: "Stay for the | *second hug.*",
  music: { style: 'synthwave', key: 'F#', seed: 3311 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
