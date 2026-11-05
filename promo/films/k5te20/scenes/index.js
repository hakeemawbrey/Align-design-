// k5te20: 5 THINGS EVERY SCORPIO NEEDS TO HEAR, "Scorpio, someone wants the real you" (11.5 s, synthwave · D). Frame 0: Scorpio mid-cinch of a hoodie drawstring, the hood snapping shut until only two glowing eyes show; sudden silence (tape stop + freeze "*…hood: up.*"); loops.
// Rows: promo/films/month2/m33.md #20. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te20', sign: 'scorpio', name: 'Scorpio', D: 11.5, ending: 'loop',
  brk: { type: 'silence', at: 0.45, caption: '*…hood: fully up.*' },
  hookLine: "Scorpio. *Take the* | *hood down.*",
  hook(x, th, S) {
    const o = { x: 540, y: 1000, s: 360, mood: 'neutral', look: [0, 0], bob: 0 }
    S.hero(x, th, o)
    // the hood: a dark shell cinched to an eye slit
    const c = 0.82 + 0.18 * ease.outCubic(Math.min(1, (th + 0.3) / 0.6))
    x.save(); x.beginPath(); x.ellipse(540, 950, 200, 215, 0, 0, Math.PI * 2)
    const sw = 150 * (1.25 - c), sh = 70 * (1.4 - c) + 26
    x.rect(540 + 150, 905 - sh / 2, -300, sh)
    x.fillStyle = '#4a3a78'; x.fill('evenodd'); x.restore()
    x.save(); x.lineWidth = 12; x.strokeStyle = INK; x.beginPath(); x.ellipse(540, 950, 200, 215, 0, 0, Math.PI * 2); x.stroke(); x.strokeStyle = '#6a5aa0'; x.lineWidth = 6; x.beginPath(); x.ellipse(540, 950, 186, 201, 0, 0, Math.PI * 2); x.stroke(); x.restore()
    R(x, '#4a3a78', 400, 1150, 280, 34)
    // the drawstrings, yanked
    for (const d of [-1, 1]) { x.lineWidth = 10; x.strokeStyle = BONE; x.beginPath(); x.moveTo(540 + d * 60, 1160); x.lineTo(540 + d * (90 + 60 * c), 1350 + 30 * Math.sin(th * 9 + d)); x.stroke(); R(x, GOLD, 540 + d * (90 + 60 * c) - 10, 1340 + 30 * Math.sin(th * 9 + d), 20, 30) }
    for (const d of [-1, 1]) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,90,140,0.35)'; x.beginPath(); x.arc(540 + d * 70, 900, 46, 0, Math.PI * 2); x.fill(); x.restore() }
    void sw
  },
  items: [
    {text: "Someone wants | *the real you.*", icon: "heart", mood: "wide"},
    {text: "Guarded is not the | same as *safe.*", icon: "shield", mood: "neutral"},
    {text: "Say the | *scary feeling.*", icon: "chat", mood: "squint"},
    {text: "Your intensity | is *devotion.*", icon: "key", mood: "sparkle"},
    {text: "Trust is built | *both ways.*", icon: "bridge", mood: "heart"},
  ],
  last: "Let one person | *all the way in.*",
  music: { style: 'synthwave', key: 'D', seed: 3320 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
