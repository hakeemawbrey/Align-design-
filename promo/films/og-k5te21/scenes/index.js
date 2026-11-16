// og-k5te21: the social rework of k5te21 (5 Things Every Sagittarius Needs to Hear), "Sagittarius, honesty needs a soft landing" (10 s, pop · Bb). Frame 0: Sag mid-blurt, slapping a hand over its mouth as a giant TRUTH flies out; record scratch "yep. *said it.*"; hard cut.
// og social: same TRUTH blurt, list and last line; static HOOK (box), no series bug, no record-scratch freeze, crazier Sag
// reaction bubbles; ends on the last line. Kit: ../fivekit.js (a social copy of ../../k5te01/fivekit.js).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../fivekit.js'

const EP = makeFive({
  id: 'og-k5te21', sign: 'sagittarius', name: 'Sagittarius', D: 11, ending: 'cut', bugName: 'Sagittarius',
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
    {text: "Honesty needs a | *soft landing.*", icon: "heart", mood: "wide", say: "your haircut is BRAVE."},
    {text: "Laugh *with* them, | not at them.", icon: "sparkle", mood: "happy", say: "HA. wait. you're serious?"},
    {text: "Commit to | *one plan.*", icon: "calendar", mood: "neutral", say: "i booked 3 flights. same day."},
    {text: "Your joy is | *contagious.*", icon: "sun", mood: "sparkle", say: "WHO WANTS ADVENTURE"},
    {text: "Stay through the | *boring parts.*", icon: "hug", mood: "heart", say: "...ok. i'm staying. (vibrating)"},
  ],
  last: "Say the truth | *with a smile.*",
  music: { style: 'pop', key: 'Bb', seed: 3321 },
})

// social hook: static caption from frame 0 (the film's own animated hook line is removed in ../fivekit.js)
export const HOOK = 'Sag, you said it. | Out loud. *Like that.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
