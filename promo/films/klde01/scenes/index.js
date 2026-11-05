// klde01: ZODIAC LIE DETECTOR, "Totally Over My Ex" (15 s vertical, star_talk post, chiptune · A). Loops.
// The set + engine live in ../ldkit.js (shared by klde01–klde12). No end card, no card cut.
//   0.00–0.72  frame 0: ♈ Aries mid-scream in the chair, the needle off the chart, paper flying, the beacon red,
//              "“I’m *totally* over my ex.”" slammed in. Whip zoom on frame 0.
//   0.72–1.34  record scratch + freeze: "let’s run that back."
//   1.40       THE STARS: "are you over your ex?"  ♈ "totally. 100%."  → the needle flies: LIE (3.1).
//   4.30–6.90  THE TRUTH: Aries asleep, hugging the ex's hoodie.
//   7.00       THE STARS: "is that… their hoodie?"  ♈ (clutching it) "it's MY hoodie now." → TRUTH.
//  11.20       last line: "Over them. *Not* over the hoodie."  Pisces (operator) fountains.
//  14.55–15    loops back into frame 0.
import { makeLD } from '../ldkit.js'
import { drawBits, R, box, label, inSprite, starFrame, INK, BONE } from '../m23kit.js'
import { drawStarChar, signStar } from '../../startalk.js'

const ARI = signStar('aries')
const HOODIE = [
  '...HHHHHH...',
  '..HHDDDDHH..',
  '.HHHHDDHHHH.',
  'HHHHHHHHHHHH',
  'HHSHHHHHHSHH',
  'HHSHHHHHHSHH',
  'HHSHPPPPHSHH',
  'HHSHPPPPHSHH',
  '...HHHHHH...',
  '...HHHHHH...',
]
const HC = { H: '#6f86e0', D: '#3e4f9e', S: '#5a6fc8', P: '#5164bb' }

function bedroom(x, t, S) {
  // a dark bedroom: wall, window with the moon, the bed
  R(x, '#1a1434', 0, 0, 1080, 1920)
  R(x, '#231b44', 0, 1180, 1080, 740)
  box(x, 620, 470, 300, 330, '#0e1430', { b: 10 })
  R(x, INK, 765, 470, 10, 330); R(x, INK, 620, 630, 300, 10)
  x.fillStyle = '#f7e7b0'; x.beginPath(); x.arc(700, 540, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#0e1430'; x.beginPath(); x.arc(714, 530, 30, 0, Math.PI * 2); x.fill()
  // bed
  box(x, 90, 900, 70, 420, '#7a5038', { b: 8 }); box(x, 920, 1020, 70, 300, '#7a5038', { b: 8 })
  box(x, 150, 1120, 780, 120, '#e9e2f5', { b: 8 })
  box(x, 170, 1020, 230, 110, '#ffffff', { b: 7 })
  const hug = 4 * Math.sin(t * 2.4)
  S.hero(x, t, { x: 330, y: 1010 + hug * 0.5, s: 250, mood: 'sleepy', look: [0, 0], bob: 3 })
  // the hoodie, hugged
  drawBits(x, HOODIE, HC, 400, 1100 + hug, 22, { rot: -0.18 })
  // blanket
  box(x, 150, 1160, 780, 190, '#c64a6a', { b: 8, hi: '#e0698a' })
  for (let i = 0; i < 6; i++) R(x, '#a83c5a', 190 + i * 125, 1210, 60, 120)
  // a little heart sniff
  if (S.u > 1.2) label(x, '*sniff*', 560, 960 - 10 * Math.sin(t * 3), { size: 40, col: '#ffd6e0', font: "Inter", weight: 800, rot: 0.08 })
}

const EP = makeLD({
  id: 'klde01', sign: 'aries', name: 'Aries', len: 15, ending: 'loop',
  music: { style: 'chiptune', key: 'A', seed: 2301 },
  hook: '“I’m *totally* | over my ex.”',
  qs: [
    { t: 1.4, q: 'are you over your *ex?*', a: 'totally. 100%.', v: 'lie', m: ['sparkle', 'wide'],
      truth: { at: 4.3, dur: 2.6, label: 'THE TRUTH: | *every* night.', draw: bedroom } },
    { t: 7.0, q: 'is that… *their* hoodie?', a: 'it’s MY hoodie now.', v: 'truth', m: ['squint', 'happy'], a2: '(it’s very soft.)', a2t: 9.7 },
  ],
  last: { t: 11.2, text: 'Over them. | *Not* over the hoodie.', size: 88 },
  // from the truth on, Aries clutches the hoodie in the chair
  prop(x, t, S) {
    if (t < 6.9 || !S.F) return
    const F = S.F
    drawBits(x, HOODIE, HC, F.ox + F.S * 0.36, F.oy - F.base + F.S * 0.2 + 4 * Math.sin(t * 3), 15, { rot: 0.28 })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [ARI, drawStarChar, inSprite, starFrame, BONE]
