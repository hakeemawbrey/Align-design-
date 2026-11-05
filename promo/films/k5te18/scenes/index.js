// k5te18: 5 THINGS EVERY VIRGO NEEDS TO HEAR, "Virgo, nobody needs you perfect" (11 s, chiptune · G). Frame 0: Virgo mid-checklist that unrolls off the table and across the floor, pen flying; whip zoom; loops.
// Rows: promo/films/month2/m33.md #18. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te18', sign: 'virgo', name: 'Virgo', D: 11, ending: 'loop',
  brk: { type: 'whip', at: 0.42 },
  hookLine: "Virgo. *Drop the checklist.* | Hear this.",
  hook(x, th, S) {
    // the table and the endless list unrolling down and across
    box(x, 120, 900, 520, 40, '#a07850', { b: 7 }); R(x, INK, 150, 940, 22, 300); R(x, INK, 590, 940, 22, 300)
    const L = 1500 + 600 * th
    x.save(); x.beginPath(); x.moveTo(560, 905); x.lineTo(660, 905); x.lineTo(700, 1260); x.lineTo(1200, 1300); x.lineTo(1200, 1380); x.lineTo(640, 1340); x.closePath()
    x.fillStyle = INK; x.fill(); x.restore()
    R(x, BONE, 566, 908, 88, 360); R(x, BONE, 650, 1270, 560, 60)
    for (let i = 0; i < 8; i++) { R(x, INK, 580, 930 + i * 42, 18, 18); R(x, '#8c86a8', 606, 934 + i * 42, 40, 8) }
    for (let i = 0; i < 9; i++) { R(x, INK, 670 + i * 64, 1288, 18, 18); R(x, '#8c86a8', 694 + i * 64, 1294, 30, 8) }
    label(x, `item ${Math.floor(L / 10)} of ∞`, 380, 1340, { size: 30, col: '#9fe6b0' })
    S.hero(x, th, { x: 360, y: 740, s: 300, mood: 'wide', look: [1, 1], bob: 0, squash: -0.06 })
    x.save(); x.translate(560 + 80 * th, 560 - 60 * th); x.rotate(-0.6 + th * 6); R(x, INK, -12, -90, 24, 180); R(x, '#7fd0ff', -7, -85, 14, 140); R(x, INK, -4, 60, 8, 20); x.restore()
  },
  items: [
    {text: "Nobody needs | you *perfect.*", icon: "heart", mood: "wide"},
    {text: "Your care shows | in *details.*", icon: "sparkle", mood: "happy"},
    {text: "Ask for help | *out loud.*", icon: "hand", mood: "neutral"},
    {text: "Spontaneous | can be *safe.*", icon: "plane", mood: "sparkle"},
    {text: "You are enough | *today.*", icon: "check", mood: "heart"},
  ],
  last: "Cross yourself off | the list. *Rest.*",
  music: { style: 'chiptune', key: 'G', seed: 3318 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
