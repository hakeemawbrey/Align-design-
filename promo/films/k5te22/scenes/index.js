// k5te22: 5 THINGS EVERY CAPRICORN NEEDS TO HEAR, "Capricorn, put the bags down" (11 s, funk · F). Frame 0: Capricorn mid-stagger under a tower of everyone's bags, one flying off; whip zoom; loops.
// Rows: promo/films/month2/m33.md #22. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te22', sign: 'capricorn', name: 'Capricorn', D: 11, ending: 'loop',
  brk: { type: 'whip', at: 0.42 },
  hookLine: "Capricorn. Put everyone’s | *bags down.*",
  hook(x, th, S) {
    const lean = 0.12 * Math.sin(th * 3) - 0.08
    x.save(); x.translate(540, 1300); x.rotate(lean); x.translate(-540, -1300)
    S.hero(x, th, { x: 540, y: 1260, s: 300, mood: 'squint', look: [0, -1], bob: 0, squash: 0.14 })
    const C = ['#c98a4a', '#7fd0ff', '#ff8fb1', '#9fe6b0', '#e8b4ff', '#ffd23a']
    const tags = ['MOM', 'BOSS', 'BFF', 'EX', 'TEAM', 'SIS']
    for (let i = 0; i < 6; i++) { const w = 280 - i * 16, yy = 1100 - i * 88, xx = 540 + 16 * Math.sin(i * 1.7 + th * 4) * (i / 5)
      box(x, xx - w / 2, yy - 90, w, 90, C[i], { b: 6 }); R(x, INK, xx - 30, yy - 104, 60, 14)
      x.font = `800 30px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tags[i], xx, yy - 45) }
    x.restore()
    // one bag flying off the top
    x.save(); x.translate(830 + 80 * th, 600 - 40 * th); x.rotate(0.6 + 3 * th); box(x, -100, -45, 200, 90, '#ffb36b', { b: 6 }); x.font = `800 30px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('COUSIN', 0, 0); x.restore()
  },
  items: [
    {text: "You don’t carry | *everyone.*", icon: "bag", mood: "wide"},
    {text: "Asking for help | is *strong.*", icon: "hand", mood: "neutral"},
    {text: "Your plans need | *play time.*", icon: "star", mood: "happy"},
    {text: "Love isn’t earned | by *effort.*", icon: "heart", mood: "sparkle"},
    {text: "You can be | *soft at home.*", icon: "house", mood: "heart"},
  ],
  last: "Hands free. | *Heart open.*",
  music: { style: 'funk', key: 'F', seed: 3322 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
