// og-k5te15: OG social cut of k5te15 (same star, set, props and five-things story). Static HOOK (box) on frame 0 until 3 s,
// the hook drawing held to 3 s, no kit hook line / bug / pips / chip / pattern break, crazier lines, ends on THE STARS' last line.
// Kit: ./fivekit.js (social copy of ../../k5te01/fivekit.js).
// k5te15: 5 THINGS EVERY GEMINI NEEDS TO HEAR, "Gemini, one bubble is enough" (11 s, pop · D). Frame 0: Gemini mid-typing as nine message bubbles fire out of the phone at once; record scratch "yep. *nine texts.*"; hard cut.
// Rows: promo/films/month2/m33.md #15. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from './fivekit.js'

const EP = makeFive({
  id: 'k5te15', sign: 'gemini', name: 'Gemini', D: 12.1, ending: 'cut', H: 3,
  hook(x, th, S) {
    S.hero(x, th, { x: 380, y: 1120, s: 320, mood: 'happy', look: [1, -1], bob: 0, squash: 0.04 * Math.sin(th * 40) })
    phone(x, 640, 1140, 170, -0.2, (c, w, h) => { R(c, '#2a1f55', 0, 0, w, h); c.font = `700 20px ${MONO}`; c.fillStyle = '#9fe6b0'; c.textAlign = 'center'; c.fillText('sending…', w / 2, h / 2) }, { glow: 0.6 })
    const T = ['omg', 'ok wait', 'so', 'LISTEN', 'also', 'hi!!', 'ok bye', 'jk', 'one more']
    T.forEach((s, i) => { const a = -2.2 + i * 0.32, d = 260 + 140 * ((i * 5) % 3) + 20 * th
      bubble(x, th, 600 + Math.cos(a) * d * 0.8, 1100 + Math.sin(a) * d * 0.72, -1, 99, s, { size: 34, col: i % 3 === 1 ? '#ffe27a' : BONE, rot: 0.15 * Math.sin(i * 2) }) })
  },
  items: [
    {text: "One text | is *plenty.*", icon: "chat", mood: "wide"},
    {text: "Not three. Not nine. | *One.*", icon: "sparkle", mood: "happy"},
    {text: "Silence isn’t | *rejection.*", icon: "moon", mood: "neutral"},
    {text: "Ask the | *deep question.*", icon: "eye", mood: "sparkle"},
    {text: "Both of you | are *lovable.*", icon: "hug", mood: "heart"},
  ],
  last: "Both of you | *deserve the date.*",
  music: { style: 'pop', key: 'D', seed: 3315 },
})

export const HOOK = "Gemini sent nine | texts in *one breath.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
