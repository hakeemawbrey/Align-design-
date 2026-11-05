// klde08: ZODIAC LIE DETECTOR, "Off the Clock" (15 s vertical, star_talk post, lofi · Dm). Hard cut on the last line.
// The set + engine live in ../../klde01/ldkit.js (shared by klde01–klde12). No end card, no card cut.
//   0.00–0.72  frame 0: the sign mid-scream in the chair, the needle off the chart, the hook line slammed in.
//   0.72–1.34  record scratch + freeze: "let’s run that back."
//   1.40       THE STARS: thinking about *work* on this date?  → not at all. → LIE.
//   4.25–6.90  THE TRUTH (cutaway).
//   7.00       THE STARS: what did your date *order?*  → pasta. I took notes. → TRUTH.
//   13.30      last line: Off the clock. | *Mostly.*

import { makeLD } from '../../klde01/ldkit.js'
import { R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01 } from '../../klde01/m23kit.js'
import { drawStarChar, signStar } from '../../startalk.js'

function wall(x, a, b) { R(x, a, 0, 0, 1080, 1920); R(x, b, 0, 1200, 1080, 720); R(x, INK, 0, 1196, 1080, 8) }
function truth(x, t, S) {
  wall(x, '#2a1a24', '#3a2430')
  // candle-lit table, the date across, a laptop glowing under the tablecloth
  S.hero(x, t, { x: 280, y: 860, s: 250, mood: 'happy', look: [1, 0] })
  drawStarChar(x, 800, 860, 250, t, { ...signStar('libra'), mood: 'happy', look: [-1, 0], seed: 5 })
  box(x, 90, 990, 900, 60, '#f4ecd8', { b: 8 }); R(x, '#e2cfa6', 90, 1050, 900, 170)
  R(x, '#f4ecd8', 520, 930, 40, 60); R(x, GOLD, 532, 905 + 4 * Math.sin(t * 9), 16, 26)
  // laptop peeking under the cloth
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(320, 1260, 10, 320, 1260, 220); g.addColorStop(0, 'rgba(120,200,255,0.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(100, 1040, 440, 440); x.restore()
  box(x, 200, 1220, 240, 150, '#2a2148', { b: 6 }); R(x, '#9fd8ff', 214, 1234, 212, 122)
  for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) R(x, (i + j) % 3 ? '#ffffff' : '#7dffb0', 222 + i * 42, 1242 + j * 28, 36, 20)
  label(x, 'Q4_final_FINAL', 320, 1400, { size: 24, col: '#9fd8ff' })
}

const EP = makeLD({
  id: 'klde08', sign: 'capricorn', len: 15, ending: 'cut',
  music: { style: 'lofi', key: 'Dm', seed: 2308 },
  hook: "“I’m *not* thinking | about work tonight.”",
  qs: [
    { t: 1.4, q: "thinking about *work* on this date?", a: "not at all.", v: 'lie', m: ['sparkle', 'wide'],
      truth: { at: 4.25, dur: 2.65, label: "THE TRUTH: | *under the table.*", draw: truth } },
    { t: 7.0, q: "what did your date *order?*", a: "pasta. I took notes.", v: 'truth', m: ['squint', 'happy'], a2: "(and the date’s favourite dessert.)", a2t: 9.7 },
  ],
  pisLine: { t: 10.60, text: "*sob* such good notes", end: 13.25 },
  last: { t: 13.30, text: "Off the clock. | *Mostly.*", size: 88 },
  
  
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [R, box, drawBits, label, bubble, sparkles, hearts, shadow, spotlight, inSprite, tearsCells, shadesCells, GOLD, BONE, INK, RED, MINT, PINK, INTER, MONO, clamp, lerp, prog, ease, pop01, drawStarChar, signStar]
