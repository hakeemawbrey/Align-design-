// og-k5te06: social rework (static HOOK over a longer opening beat; no series bug, chip, break FX or flashes; the sign
// pushed further; ends on THE STARS' line). Kit: ../fivekit.js (og social copy of k5te01/fivekit.js). Was:
// k5te06: 5 THINGS EVERY VIRGO NEEDS TO HEAR, "Virgo, the text was already fine" (11 s, jazzy · Bb). Frame 0: Virgo mid-scribble, the red pen flying over a draft text, eraser crumbs everywhere; record scratch "draft *number fourteen.*"; loops.
// Rows: promo/films/month2/m33.md #6. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../fivekit.js'

const EP = makeFive({
  id: 'og-k5te06', sign: 'virgo', name: 'Virgo', D: 12.15, H: 2.6, ending: 'cut',
  brk: { type: 'scratch', at: 0.45, caption: 'draft *number fourteen.*' },
  hookLine: "Virgo. That text | *was fine.*",
  hook(x, th, S) {
    // the draft, scribbled to bits
    phone(x, 700, 820, 330, 0.08, (c, w, h) => {
      R(c, BONE, 20, 120, w - 40, 150); c.font = `800 30px ${INTER}`; c.fillStyle = INK; c.textAlign = 'left'
      c.fillText('hey! had fun', 40, 175); c.fillText('tonight :)', 40, 225)
      c.strokeStyle = RED; c.lineWidth = 9; c.beginPath()
      for (let i = 0; i < 9; i++) { const yy = 150 + i * 14; c.lineTo(30 + ((i % 2) ? w - 70 : 0), yy) }
      c.stroke()
      R(c, '#c9f2d4', 20, 330, w - 40, 60); c.fillStyle = INK; c.font = `700 22px ${MONO}`; c.fillText('draft 14 of 14', 40, 368)
    }, { glow: 0.5 })
    debris(x, th, 640, 760, { n: 16, spread: 330, cols: ['#ffb3c0', BONE], sz: 16, seed: 4, v: 0.5 })
    S.hero(x, th, { x: 300, y: 1180, s: 300, mood: 'squint', look: [1, -1], squash: 0.04, bob: 0 })
    // the red pen, mid-flick
    x.save(); x.translate(470 + 30 * th, 960 - 50 * th); x.rotate(-0.9 + th * 4)
    R(x, INK, -14, -120, 28, 240); R(x, RED, -9, -115, 18, 190); R(x, BONE, -9, 75, 18, 40); R(x, INK, -4, 112, 8, 14)
    x.restore()
  },
  items: [
    {text: "Draft one | was *perfect.*", icon: "check", mood: "wide"},
    {text: "Colour-coding your | crush *is a lot.*", icon: "heart", mood: "happy"},
    {text: "You can’t | *edit a feeling.*", icon: "chat", mood: "neutral"},
    {text: "Rest is not | *a typo to fix.*", icon: "zz", mood: "sleepy"},
    {text: "You’re allowed to be | *unfinished.*", icon: "plant", mood: "heart"},
  ],
  last: "Send it. | *Then breathe.*",
  music: { style: 'jazzy', key: 'Bb', seed: 3306 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]

export const HOOK = 'Virgo, draft 14? | *Draft 1 was fine.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.55
