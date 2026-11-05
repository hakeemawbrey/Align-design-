// k5te16: 5 THINGS EVERY CANCER NEEDS TO HEAR, "Cancer, close the old photos" (10.5 s, cinematic · A). Frame 0: Cancer mid-scroll through old photos at 2 a.m., the phone glow huge, a tear about to fall; record scratch "yep. *2 a.m. again.*"; loops.
// Rows: promo/films/month2/m33.md #16. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te16', sign: 'cancer', name: 'Cancer', D: 10.5, ending: 'loop',
  brk: { type: 'scratch', at: 0.45, caption: 'yep. *2 a.m. again.*' },
  hookLine: "Cancer. Close the | *old photos.*",
  hook(x, th, S) {
    label(x, '2:13 AM', 540, 1640, { size: 56, col: '#9fe6b0' })
    // the old photos, scrolling past fast
    phone(x, 560, 900, 280, 0.05, (c, w, h) => {
      c.beginPath(); c.rect(0, 0, w, h); c.clip()
      for (let i = 0; i < 5; i++) { const yy = ((i * 170 - th * 900) % 850 + 850) % 850 - 100; box(c, 24, yy, w - 48, 140, ['#ffd9b0', '#c9f2d4', '#bfe8ff', '#ffd0dc', '#fff1a8'][i], { b: 4 })
        drawBits(c, HEART, { H: '#ff5c8a' }, w / 2, yy + 70, 6) }
    }, { glow: 1.2 })
    const o = { x: 540, y: 1400, s: 270, mood: 'sparkle', look: [0, -1], bob: 0 }
    S.hero(x, th, o)
    inSprite(x, starFrame(o.x, o.y, o.s, th, { bob: 0, seed: 3 }), () => tearsCells(x, th, 1))
  },
  items: [
    {text: "Missing them | is *normal.*", icon: "heart", mood: "wide"},
    {text: "Memories | aren’t a *map.*", icon: "map", mood: "neutral"},
    {text: "Call a friend | *instead.*", icon: "phone", mood: "happy"},
    {text: "You’ll love like | that *again.*", icon: "sun", mood: "sparkle"},
    {text: "Tonight, be gentle | *with you.*", icon: "moon", mood: "heart"},
  ],
  last: "Save the love. | *Close the album.*",
  music: { style: 'cinematic', key: 'A', seed: 3316 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
