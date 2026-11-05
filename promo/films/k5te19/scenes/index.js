// k5te19: 5 THINGS EVERY LIBRA NEEDS TO HEAR, "Libra, stop saying sorry" (10.5 s, dreamy · Eb). Frame 0: Libra mid-bow, saying sorry to a chair it bumped, apology bubbles flying; record scratch "yep. *that's a chair.*"; hard cut.
// Rows: promo/films/month2/m33.md #19. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te19', sign: 'libra', name: 'Libra', D: 10.5, ending: 'cut',
  brk: { type: 'scratch', at: 0.45, caption: 'yep. *that’s a chair.*' },
  hookLine: "Libra. You apologised | to a *chair.*",
  hook(x, th, S) {
    // the chair, wobbling
    x.save(); x.translate(780, 1170); x.rotate(0.06 * Math.sin(th * 14) * Math.exp(-th))
    box(x, -110, -260, 30, 260, '#a07850', { b: 6 }); box(x, -110, -60, 220, 36, '#c98a4a', { b: 6 }); box(x, -100, -24, 24, 140, '#a07850', { b: 5 }); box(x, 80, -24, 24, 140, '#a07850', { b: 5 })
    x.restore()
    shadow(x, 360, 1220, 260)
    x.save(); x.translate(360, 1140); x.rotate(0.45); x.translate(-360, -1140)
    S.hero(x, th, { x: 360, y: 1040, s: 310, mood: 'wide', look: [1, 1], bob: 0, squash: 0.06 })
    x.restore()
    const B = ['sorry!', 'so sorry', 'my bad!', 'sorry!!', 'oops sorry']
    B.forEach((s, i) => { const p = ((th * 0.5 + i / 5) % 1); bubble(x, th, 420 + Math.cos(i * 1.5 - 1.2) * (140 + 300 * p), 760 - 380 * p + (i % 2) * 40, -1, 99, s, { size: 36, col: i % 2 ? '#ffd0dc' : BONE, rot: 0.12 * Math.sin(i * 3) }) })
  },
  items: [
    {text: "Stop saying sorry | *for space.*", icon: "house", mood: "wide"},
    {text: "Your needs | aren’t *drama.*", icon: "heart", mood: "neutral"},
    {text: "Balance | *includes you.*", icon: "check", mood: "happy"},
    {text: "Kind is not the | same as *quiet.*", icon: "mic", mood: "sparkle"},
    {text: "Be loved, | not just *liked.*", icon: "hug", mood: "heart"},
  ],
  last: "Say *thanks* | instead of sorry.",
  music: { style: 'dreamy', key: 'Eb', seed: 3319 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
