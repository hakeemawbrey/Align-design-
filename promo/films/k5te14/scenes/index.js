// k5te14: 5 THINGS EVERY TAURUS NEEDS TO HEAR, "Taurus, letting go isn't losing" (11.5 s, jazzy · E). Frame 0: Taurus mid-tug-of-war with a rope labelled THE EX, feet skidding; whip zoom; loops.
// Rows: promo/films/month2/m33.md #14. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te14', sign: 'taurus', name: 'Taurus', D: 11.5, ending: 'loop',
  brk: { type: 'whip', at: 0.42 },
  hookLine: "Taurus. *Let go* | of the rope.",
  hook(x, th, S) {
    // the rope, pulled taut off the right edge
    const sw = 6 * Math.sin(th * 18)
    x.lineWidth = 30; x.strokeStyle = INK; x.beginPath(); x.moveTo(360, 1010); x.lineTo(1120, 960 + sw); x.stroke()
    x.lineWidth = 20; x.strokeStyle = '#d9b77a'; x.beginPath(); x.moveTo(360, 1010); x.lineTo(1120, 960 + sw); x.stroke()
    for (let i = 0; i < 12; i++) R(x, '#a07850', 380 + i * 62, 1000 - i * 3.5 + sw * i / 12, 8, 18)
    x.save(); x.translate(820, 900); x.rotate(-0.05); box(x, -110, -40, 220, 70, BONE, { b: 6 }); x.font = `800 40px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE EX', 0, -4); x.restore()
    // dust from skidding feet
    for (let i = 0; i < 8; i++) { const p = ((th * 1.4 + i / 8) % 1); x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, '#cfc8e8', 200 - p * 160 + i * 6, 1190 - p * 60 - (i % 3) * 14, 24, 24); x.restore() }
    shadow(x, 300, 1200, 280)
    x.save(); x.translate(300, 1060); x.rotate(-0.28); x.translate(-300, -1060)
    S.hero(x, th, { x: 300, y: 1040, s: 330, mood: 'squint', look: [1, 0], squash: 0.08, bob: 0 })
    x.restore()
  },
  items: [
    {text: "Letting go | isn’t *losing.*", icon: "hand", mood: "wide"},
    {text: "Your loyalty deserves | a *return.*", icon: "key", mood: "happy"},
    {text: "Change can | be *gentle.*", icon: "plant", mood: "neutral"},
    {text: "New people | can be *safe.*", icon: "house", mood: "sparkle"},
    {text: "Your calm is | *magnetic.*", icon: "heart", mood: "heart"},
  ],
  last: "Open hands catch | *better things.*",
  music: { style: 'jazzy', key: 'E', seed: 3314 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
