// k5te17: 5 THINGS EVERY LEO NEEDS TO HEAR, "Leo, the selfie can rest" (10 s, house · Ab). Frame 0: Leo mid-selfie, the flash going off huge and white, sunglasses flying; colour flash; hard cut.
// Rows: promo/films/month2/m33.md #17. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te17', sign: 'leo', name: 'Leo', D: 10, ending: 'cut',
  brk: { type: 'flash', at: 0.4 },
  hookLine: "Leo. *One* selfie. | Then live.",
  hook(x, th, S) {
    // the flash burst
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(760, 760, 10, 760, 760, 520); g.addColorStop(0, 'rgba(255,255,250,0.95)'); g.addColorStop(0.3, 'rgba(255,250,230,0.35)'); g.addColorStop(1, 'rgba(255,250,230,0)'); x.fillStyle = g; x.fillRect(200, 200, 1100, 1100); x.restore()
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; x.save(); x.globalAlpha = 0.7; R(x, '#fffbea', 760 + Math.cos(a) * 170 - 6, 760 + Math.sin(a) * 170 - 6, 12, 12); x.restore() }
    phone(x, 760, 820, 150, 0.35, null, { glow: 0.6 })
    const o = { x: 430, y: 1080, s: 340, mood: 'wink', look: [1, -0.5], bob: 0, squash: -0.05 }
    x.save(); x.translate(430, 1080); x.rotate(-0.12); x.translate(-430, -1080); S.hero(x, th, o); x.restore()
    // the sunglasses, flying off
    x.save(); x.translate(560 + 60 * th, 760 - 80 * th); x.rotate(0.7 + 5 * th); x.scale(9, 9); x.translate(-18, -18); shadesCells(x, 0); x.restore()
  },
  items: [
    {text: "You’re stunning | *without the angle.*", icon: "sparkle", mood: "sparkle"},
    {text: "Let *them* | hype you.", icon: "mic", mood: "happy"},
    {text: "Ask for what | you *need.*", icon: "chat", mood: "wide"},
    {text: "Be the date, | *not the star.*", icon: "heart", mood: "happy"},
    {text: "Your heart | is *the crown.*", icon: "crown", mood: "heart"},
  ],
  last: "The best photo | is *remembered.*",
  music: { style: 'house', key: 'Ab', seed: 3317 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
