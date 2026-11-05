// k5te13: 5 THINGS EVERY ARIES NEEDS TO HEAR, "Aries, you don't have to win this" (10 s, funk · B). Frame 0: Aries mid-shout into a megaphone at a text war, letters flying; sudden silence (tape stop + freeze "ok. *deep breath.*"); hard cut.
// Rows: promo/films/month2/m33.md #13. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te13', sign: 'aries', name: 'Aries', D: 10, ending: 'cut',
  brk: { type: 'silence', at: 0.42, caption: 'ok. *deep breath.*' },
  hookLine: "Aries. It’s *not* | *a debate.*",
  hook(x, th, S) {
    // the text war on a phone
    phone(x, 860, 1330, 200, 0.16, (c, w, h) => { for (let i = 0; i < 6; i++) { const L = i % 2; R(c, L ? '#ff8fb1' : BONE, L ? w - 150 : 14, 20 + i * 62, 136, 46) }
      c.font = `800 26px ${INTER}`; c.fillStyle = RED; c.textAlign = 'center'; c.fillText('ACTUALLY—', w / 2, h - 40) }, { glow: 0.6 })
    S.hero(x, th, { x: 330, y: 1060, s: 330, mood: 'wide', look: [1, -0.2], squash: -0.08, bob: 0 })
    // the megaphone
    x.save(); x.translate(500, 960); x.rotate(-0.25)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-10, -50); x.lineTo(190, -130); x.lineTo(190, 130); x.lineTo(-10, 50); x.closePath(); x.fill()
    x.fillStyle = RED; x.beginPath(); x.moveTo(0, -38); x.lineTo(178, -114); x.lineTo(178, 114); x.lineTo(0, 38); x.closePath(); x.fill()
    box(x, -60, -40, 60, 80, BONE, { b: 6 }); x.restore()
    // the shouted letters, flying
    const W = ['ACTUALLY', 'NO', 'LISTEN', '!!!', 'WRONG', '?!']
    W.forEach((w, i) => { const p = ((th * 0.8 + i / 6) % 1); label(x, w, 700 + 340 * p * Math.cos(-0.9 + i * 0.28), 900 + 420 * p * Math.sin(-0.9 + i * 0.28) - 120 * p, { size: 40 + 30 * p, col: i % 2 ? GOLD : '#ffd0b0', font: INTER, weight: 800, rot: -0.3 + i * 0.12, alpha: 1 - p * 0.7 }) })
  },
  items: [
    {text: "You can lose and | still be *loved.*", icon: "heart", mood: "wide"},
    {text: "Cool off, then | *come back.*", icon: "water", mood: "neutral"},
    {text: "Sorry isn’t | *surrender.*", icon: "flag", mood: "happy"},
    {text: "Your passion | is *the point.*", icon: "sun", mood: "sparkle"},
    {text: "Pick peace | over *points.*", icon: "hug", mood: "heart"},
  ],
  last: "Win the hug, | not *the argument.*",
  music: { style: 'funk', key: 'B', seed: 3313 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
