// k5te21: 5 THINGS EVERY SAGITTARIUS NEEDS TO HEAR, "Sagittarius, honesty needs a soft landing" (10 s, pop · Bb). Frame 0: Sag mid-blurt, slapping a hand over its mouth as a giant TRUTH flies out; record scratch "yep. *said it.*"; hard cut.
// Rows: promo/films/month2/m33.md #21. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te21', sign: 'sagittarius', name: 'Sagittarius', D: 10, ending: 'cut', bugName: 'Sagittarius',
  brk: { type: 'scratch', at: 0.42, caption: 'yep. *said it out loud.*' },
  hookLine: "Sag. Don’t say it | *like that.*",
  hook(x, th, S) {
    // the blurted word, flying out
    const p = 0.4 + 0.6 * ease.outCubic(Math.min(1, (th + 0.2) / 1.2))
    x.save(); x.translate(lerp(620, 780, p), lerp(900, 640, p)); x.rotate(-0.2); x.scale(0.6 + 0.6 * p, 0.6 + 0.6 * p)
    x.font = `800 130px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 18; x.lineJoin = 'round'; x.strokeStyle = INK; x.strokeText('TRUTH', 0, 0); x.fillStyle = RED; x.fillText('TRUTH', 0, 0); x.restore()
    speedLines(x, th, 560, 1000, 0.4, { n: 12, r0: 220, col: '#ffd0b0' })
    const o = { x: 400, y: 1080, s: 340, mood: 'wide', look: [1, -0.5], bob: 0, squash: 0.06 }
    S.hero(x, th, o)
    // the hand, slapped over the mouth
    icon(x, 'hand', 440, 1080 + 10 * Math.sin(th * 20) * Math.exp(-th * 4), 14, { rot: -0.3 })
  },
  items: [
    {text: "Honesty needs a | *soft landing.*", icon: "heart", mood: "wide"},
    {text: "Laugh *with* them, | not at them.", icon: "sparkle", mood: "happy"},
    {text: "Commit to | *one plan.*", icon: "calendar", mood: "neutral"},
    {text: "Your joy is | *contagious.*", icon: "sun", mood: "sparkle"},
    {text: "Stay through the | *boring parts.*", icon: "hug", mood: "heart"},
  ],
  last: "Say the truth | *with a smile.*",
  music: { style: 'pop', key: 'Bb', seed: 3321 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
