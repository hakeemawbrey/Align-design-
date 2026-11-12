// r2a0393: star_advice, ADVICE SOLO (libra), "Libra, have you | eaten today?" (signs3kit social cut, music: lofi · C). Ending: callback.
//   nine cards: lunch spot still undecided · peace talks, day three · the pretty plate · "whatever you want" · the reserved plate
//   · iced coffee for lunch · the scales with you on them · you chose well · let life love you back
//   callback: the plate marked RESERVED: LIBRA is still warm.
import { makeFilm, hearts, drawBits, pop01, label, INK } from '../../signs3kit.js'
import { cam, BITS, RED, ORANGE, GREEN, GREY, CREAM, PINK, GOLD, MINT, LAV, SKYB, BONE, BROWN, DARK } from './gags.js'

const S = 'libra'
/** a plate of food with an optional little tent card */
function plate(x, cx, cy, k, t, { card = '', steam = false, fancy = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  drawBits(x, BITS.plate, { K: INK, W: '#fff', B: BONE }, 0, 0, 26)
  if (fancy) { for (const [dx, col] of [[-60, GREEN], [0, RED], [60, ORANGE]]) { x.fillStyle = INK; x.fillRect(dx - 24, -48, 48, 40); x.fillStyle = col; x.fillRect(dx - 18, -42, 36, 28) } }
  else { x.fillStyle = INK; x.fillRect(-80, -60, 160, 54); x.fillStyle = ORANGE; x.fillRect(-72, -54, 144, 42); x.fillStyle = GOLD; x.fillRect(-50, -48, 40, 14) }
  if (steam) {
    x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 10; x.lineCap = 'round'
    for (const dx of [-50, 0, 50]) { x.beginPath(); for (let j = 0; j <= 10; j++) { const yy = -80 - j * 10, xx = dx + Math.sin(j * 0.8 + t * 4 + dx) * 10; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
  }
  x.restore()
  if (card) label(x, cx + 10 * k, cy + 110 * k, card, k, { size: 32, bg: PINK, rot: -0.04 })
}

const CAMEOS = [
  cam(S, 'Can’t pick a lunch spot? | *Any snack counts.*', { mood: lt => lt > 1.5 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0] }, [
    ['label', 790, 760, lt => lt < 1.4 ? `OPTION ${1 + Math.floor(lt * 5) % 9}?` : 'A CRACKER. DONE.', 0.3, { size: 44, bg: lt => lt < 1.4 ? GOLD : MINT, rot: -0.05, mono: true }],
    ['label', 790, 920, 'LUNCH: TBD (4 PM)', 0.8, { size: 36, bg: PINK, rot: 0.05, mono: true, to: 1.4 }],
  ]),
  cam(S, 'Keeping the peace? | *Take a break too.*', { mood: lt => lt > 1.4 ? 'sleepy' : 'neutral' }, [
    ['bubble', 690, 650, 'they said—', 0.3, { size: 40, col: RED, tail: 'bl' }],
    ['bubble', 870, 760, 'no, THEY—', 0.5, { size: 40, col: SKYB, tail: 'br' }],
    ['label', 790, 960, 'PEACE TALKS: DAY 3', 1.0, { size: 36, bg: GOLD, rot: -0.04, mono: true }],
  ]),
  cam(S, 'Made it pretty first? | *Now eat it.*', { mood: lt => lt > 1.3 ? 'heart' : 'sparkle' }, [
    ['fn', (x, t, lt, t0) => plate(x, 790, 960, pop01(t, t0 + 0.2, 0.3, 2), t, { fancy: true })],
    ['label', 790, 700, 'PLATING: 40 MIN', 0.7, { size: 40, bg: PINK, rot: 0.05, mono: true }],
  ]),
  cam(S, 'Said “whatever you want”? | *What do you want?*', { mood: lt => lt > 1.3 ? 'wide' : 'happy' }, [
    ['bubble', 770, 680, 'whatever | you want!', 0.3, { size: 46, tail: 'bl' }],
    ['bubble', 800, 920, 'no, YOU.', 1.1, { size: 58, col: MINT, tail: 'br' }],
  ]),
  cam(S, 'Feeding everyone else? | *Save a plate for you.*', { mood: lt => lt > 1.3 ? 'heart' : 'happy', keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0] }, [
    ['fn', (x, t, lt, t0) => plate(x, 790, 900, pop01(t, t0 + 0.2, 0.3, 2), t, { card: lt > 0.9 ? 'RESERVED: LIBRA' : '', steam: true })],
    ['hearts', 790, 860, 1.2, { n: 4 }],
  ]),
  cam(S, 'Iced coffee for lunch? | *That’s not lunch.*', { mood: lt => lt > 1.3 ? 'squint' : 'happy' }, [
    ['bits', 'cup', 800, 900, 26, 0.2, { cols: { N: '#c58b5c' } }],
    ['label', 790, 680, 'MEAL: ICE', 1.1, { size: 46, bg: SKYB, rot: -0.05, mono: true }],
  ]),
  cam(S, 'Balancing everything? | *Add yourself.*', { mood: lt => lt > 1.4 ? 'heart' : 'neutral' }, [
    ['bits', 'scales', 790, 920, 26, 0.2, {}],
    ['bits', 'heartBig', 680, 880, 10, 1.1, {}],
    ['label', 790, 680, '+ YOU', 1.3, { size: 50, bg: PINK, rot: 0.05 }],
  ]),
  cam(S, 'Still doubting your pick? | *It was a good one.*', { mood: lt => lt > 1.3 ? 'sparkle' : 'squint' }, [
    ['label', 790, 760, lt => lt < 1.2 ? 'WAS IT RIGHT?' : 'YES. IT WAS.', 0.3, { size: 46, bg: lt => lt < 1.2 ? GREY : MINT, rot: -0.04 }],
    ['sparkles', 790, 760, 1.3, { n: 6, R: 170 }],
  ]),
  cam(S, 'You make life lovely. | *Let it love you back.*', { mood: 'heart', hops: [1.2] }, [
    ['bits', 'heartBig', 790, 880, 30, 0.3, {}],
    ['hearts', 790, 900, 0.9, { n: 6, spread: 220 }],
    ['label', 790, 660, 'YOU: ADORED', 1.0, { size: 44, bg: PINK, rot: -0.05 }],
  ]),
]

const F = makeFilm({
  id: 'r2a0393', key: 'C', accent: '#ff9fc8', solo: S, ending: 'callback',
  title: 'Libra, have you | *eaten today?*',
  cameos: CAMEOS,
  group: { cap: 'Feed the peacemaker. | *Today.*', mood: 'heart' },
  last: {
    text: 'Your plate | *is still warm.*',
    draw(x, t, lt) {
      plate(x, 540, 1020, 1.6 * pop01(t, t - lt + 0.3, 0.4, 1.9), t, { card: 'RESERVED: LIBRA', steam: true })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
