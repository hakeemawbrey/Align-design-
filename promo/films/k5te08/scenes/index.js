// k5te08: 5 THINGS EVERY SCORPIO NEEDS TO HEAR, "Scorpio, not everything is a clue" (11 s, cinematic · C#). Frame 0: Scorpio mid-squint at a phone through a giant magnifier, red string flying off a corkboard; whip zoom; loops.
// Rows: promo/films/month2/m33.md #8. The format lives in ../../k5te01/fivekit.js (shared by k5te01–k5te24).
import { makeFive, R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles } from '../../k5te01/fivekit.js'

const EP = makeFive({
  id: 'k5te08', sign: 'scorpio', name: 'Scorpio', D: 11, ending: 'loop',
  brk: { type: 'whip', at: 0.4 },
  hookLine: "Scorpio. *Put the* | *magnifier* down.",
  hook(x, th, S) {
    // the corkboard of "clues"
    box(x, 90, 470, 900, 520, '#a07850', { b: 8, hi: '#b98d60' })
    const pins = [[200, 560], [420, 620], [700, 540], [880, 700], [260, 860], [600, 880]]
    pins.forEach(([px, py], i) => { box(x, px - 60, py - 40, 120, 80, i % 2 ? BONE : '#fff1a8', { b: 4 }); R(x, RED, px - 6, py - 46, 12, 12) })
    x.strokeStyle = RED; x.lineWidth = 6
    for (let i = 0; i < pins.length - 1; i++) { const [a, b] = [pins[i], pins[(i + 2) % pins.length]]; x.beginPath(); x.moveTo(a[0], a[1] - 40); x.quadraticCurveTo((a[0] + b[0]) / 2 + 40 * Math.sin(th * 3 + i), (a[1] + b[1]) / 2 + 60, b[0], b[1] - 40); x.stroke() }
    // one string snapping loose and flying
    x.beginPath(); x.moveTo(880, 660); x.quadraticCurveTo(980 + 40 * th, 500, 1040 + 60 * th, 380 - 80 * th); x.stroke()
    S.hero(x, th, { x: 380, y: 1200, s: 320, mood: 'squint', look: [1, -0.5], bob: 0 })
    phone(x, 760, 1220, 170, 0.12, (c, w, h) => { c.font = `700 22px ${MONO}`; c.fillStyle = '#9fe6b0'; c.textAlign = 'center'; c.fillText('seen 2h ago', w / 2, h / 2) }, { glow: 0.7 })
    // the giant magnifier over the phone
    x.save(); x.translate(700, 1140); x.rotate(-0.5)
    x.lineWidth = 26; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.stroke()
    x.lineWidth = 16; x.strokeStyle = '#cfc8e8'; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.stroke()
    x.fillStyle = 'rgba(191,232,255,0.18)'; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill()
    R(x, INK, -18, 126, 36, 170); R(x, '#6b4a2f', -11, 132, 22, 158)
    x.restore()
  },
  items: [
    {text: "Not every pause | is a *clue.*", icon: "clock", mood: "neutral"},
    {text: "Ask instead | of *decoding.*", icon: "chat", mood: "wide"},
    {text: "Trust can be | built *slowly.*", icon: "bridge", mood: "happy"},
    {text: "Your loyalty | is *rare.*", icon: "key", mood: "sparkle"},
    {text: "Soft is still | *powerful.*", icon: "heart", mood: "heart"},
  ],
  last: "Let someone see | *the whole you.*",
  music: { style: 'cinematic', key: 'C#', seed: 3308 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [R, box, INK, BONE, GOLD, RED, PINK, MINT, SKYB, LAV, debris, speedLines, shadow, lerp, ease, clamp, prog, INTER, MONO, phone, bubble, label, icon, drawBits, HEART, inSprite, starFrame, tearsCells, shadesCells, tissues, hearts, sparkles]
