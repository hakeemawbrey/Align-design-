// k5te12: 5 THINGS EVERY PISCES NEEDS TO HEAR, "Pisces, cry it out then read" (11 s, dreamy · Ab). Frame 0: Pisces mid-sob at a tiny puppy video, two tear fountains arcing out; record scratch "yep. *a puppy video.*"; Pisces is the hero, so the hero cries all the way through; loops.
// Rows: promo/films/month2/m33.md #12. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te12', sign: 'pisces', name: 'Pisces', D: 11, ending: 'loop', accent: '#9fd8f6', heroTears: true,
  brk: { type: 'scratch', at: 0.45, caption: 'yep. *a puppy video.*' },
  hookLine: "Pisces. Wipe your eyes. | *Five things.*",
  hook(x, th, S) {
    const PUP = ['..BB....BB..', '.BBBBBBBBBB.', '.BWWBBBBWWB.', '.BWDBBBBDWB.', '.BBBBPPBBBB.', '..BBBDDBBB..', '...BBBBBB...', '..BB....BB..']
    phone(x, 760, 760, 250, 0.1, (c, w, h) => { R(c, '#2a1f55', 0, 0, w, h); drawBits(c, PUP, { B: '#c98a4a', W: BONE, D: INK, P: '#ff8fb1' }, w / 2, h / 2 - 20, 15); hearts(c, th + 1, 0.2, w / 2, h / 2 - 60, { n: 4, cell: 4, spread: 80 })
      c.font = `700 20px ${MONO}`; c.fillStyle = '#9fe6b0'; c.textAlign = 'center'; c.fillText('he sneezed :(', w / 2, h - 50) }, { glow: 0.8 })
    const o = { x: 380, y: 1050, s: 360, mood: 'wide', look: [1, -0.6], bob: 0, squash: 0.05 * Math.sin(th * 18) }
    S.hero(x, th, o)
    inSprite(x, starFrame(o.x, o.y, o.s, th, { squash: o.squash, bob: 0, seed: 3 }), () => tearsCells(x, th, 3))
    tissues(x, 160, 1330, 120)
    debris(x, th, 160, 1240, { n: 6, spread: 120, cols: [BONE, '#ffffff'], sz: 30, seed: 3, v: 0.4 })
  },
  items: [
    {text: "Your big heart | *is right.*", icon: "heart", mood: "sparkle"},
    {text: "Boundaries are | *love* too.", icon: "shield", mood: "wide"},
    {text: "Not every story | needs *saving.*", icon: "door", mood: "neutral"},
    {text: "Feel it, | then *decide.*", icon: "water", mood: "happy"},
    {text: "You’re allowed to be | *loved back.*", icon: "hug", mood: "heart"},
  ],
  last: "Cry it out. | Then *love on purpose.*",
  music: { style: 'dreamy', key: 'Ab', seed: 3312 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
