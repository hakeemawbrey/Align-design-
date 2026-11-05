// k5te10: 5 THINGS EVERY CAPRICORN NEEDS TO HEAR, "Capricorn, love isn\u2019t a meeting" (11.5 s, lofi · G). Frame 0: Capricorn mid-type at 2 a.m., calendar pages flying off the wall, laptop glowing; colour flash; loops.
// Rows: promo/films/month2/m33.md #10. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te10', sign: 'capricorn', name: 'Capricorn', D: 11.5, ending: 'loop',
  brk: { type: 'flash', at: 0.42 },
  hookLine: "Capricorn. Love isn’t a | *calendar invite.*",
  hook(x, th, S) {
    const page = (c, i, s) => { c.fillStyle = INK; c.fillRect(-s / 2 - 4, -s / 2 - 4, s + 8, s + 8); c.fillStyle = BONE; c.fillRect(-s / 2, -s / 2, s, s); c.fillStyle = RED; c.fillRect(-s / 2, -s / 2, s, s * 0.25)
      c.fillStyle = INK; c.font = `800 ${s * 0.4}px ${INTER}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String((i * 7) % 28 + 1), 0, s * 0.12) }
    debris(x, th, 540, 860, { n: 12, spread: 400, sz: 70, seed: 9, v: 0.4, grav: 60, shape: page })
    label(x, '2:07 AM', 540, 560, { size: 64, col: '#9fe6b0' })
    // the glow, the laptop, the typing
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 1050, 40, 540, 1050, 500); g.addColorStop(0, 'rgba(160,210,255,0.3)'); g.addColorStop(1, 'rgba(160,210,255,0)'); x.fillStyle = g; x.fillRect(0, 500, 1080, 1100); x.restore()
    S.hero(x, th, { x: 540, y: 930, s: 310, mood: 'squint', look: [0, 1], bob: 0, squash: 0.03 * Math.sin(th * 30) })
    box(x, 330, 1020, 420, 220, '#3a2d66', { b: 7 }); R(x, '#bfe8ff', 350, 1040, 380, 180)
    for (let i = 0; i < 5; i++) R(x, INK, 375, 1065 + i * 30, 80 + ((i * 97 + Math.floor(th * 12) * 31) % 260), 12)
    box(x, 290, 1240, 500, 34, '#8c86a8', { b: 6 })
  },
  items: [
    {text: "Your worth isn’t | your *output.*", icon: "heart", mood: "wide"},
    {text: "Let people see | you *tired.*", icon: "zz", mood: "sleepy"},
    {text: "Fun is not | a *reward.*", icon: "star", mood: "happy"},
    {text: "Leave the laptop | *at dinner.*", icon: "pizza", mood: "sparkle"},
    {text: "You can be | *held,* too.", icon: "hug", mood: "heart"},
  ],
  last: "Clock out. | *Somebody likes you.*",
  music: { style: 'lofi', key: 'G', seed: 3310 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
