// k5te05: 5 THINGS EVERY LEO NEEDS TO HEAR, "Leo, the spotlight can wait" (10.5 s, pop · G). Frame 0: Leo mid-pose as the spotlight swings away; record scratch "yep. *it left.*"; hard cut.
// Rows: promo/films/month2/m33.md #5. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te05', sign: 'leo', name: 'Leo', D: 10.5, ending: 'cut',
  brk: { type: 'scratch', at: 0.45, caption: 'yep. *the light left.*' },
  hookLine: "Leo. The spotlight | *just left.* Breathe.",
  hook(x, th, S) {
    // the spotlight cone swinging off to the right
    const sw = 0.25 + 0.5 * ease.outCubic(Math.min(1, (th + 0.3) / 1.5))
    const bx = lerp(520, 1200, sw)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, 300, 0, 1250); g.addColorStop(0, 'rgba(255,236,180,0.05)'); g.addColorStop(1, 'rgba(255,236,180,0.32)')
    x.fillStyle = g; x.beginPath(); x.moveTo(760, 280); x.lineTo(820, 280); x.lineTo(bx + 220, 1240); x.lineTo(bx - 220, 1240); x.closePath(); x.fill()
    x.fillStyle = 'rgba(255,236,180,0.3)'; x.beginPath(); x.ellipse(bx, 1240, 220, 34, 0, 0, Math.PI * 2); x.fill(); x.restore()
    box(x, 730, 230, 120, 70, '#3a2d66', { b: 6 }); R(x, '#fff1c8', 750, 290, 80, 16)
    // Leo, left in the dark mid-pose
    x.save(); x.translate(430, 1020); x.rotate(-0.15); x.translate(-430, -1020)
    S.hero(x, th, { x: 430, y: 1000, s: 340, mood: 'wide', look: [1, -0.4], squash: -0.08, bob: 0, glow: 0.6 })
    x.restore()
    label(x, '?!', 640, 720, { size: 90, col: GOLD, font: INTER, weight: 800, rot: 0.15 })
  },
  items: [
    {text: "You’re loved | *off-stage* too.", icon: "heart", mood: "sparkle"},
    {text: "Quiet nights | *still count.*", icon: "moon", mood: "happy"},
    {text: "Ask how | *THEY* are.", icon: "chat", mood: "wide"},
    {text: "Your warmth | *is the show.*", icon: "sun", mood: "happy"},
    {text: "You don’t have | to *earn it.*", icon: "crown", mood: "heart"},
  ],
  last: "Glow for you, | *not the crowd.*",
  music: { style: 'pop', key: 'G', seed: 3305 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
