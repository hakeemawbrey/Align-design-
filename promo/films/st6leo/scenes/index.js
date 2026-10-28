// st6leo (60 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 05) · story 0–55.6, then the shared end card.
//   A documentary profile of Leo (the season look + beat engine: ../s6.js, copied from st6aries).
//   COLD OPEN  LEO, crown on (season 3), a red stage curtain at the right: "is my light okay? okay. *roll* it."
//   TITLE      BEHIND THE SIGN · ♌ LEO · *the big heart.* · FIRE · FIXED · RULED BY THE SUN / THE LION · JUL 23 – AUG 22
//   I MYTH     archive footage: in Greek myth the Nemean lion's hide turned every weapon (arrows bounce off); defeating it
//              was Heracles' first labour, and he wore the hide after.
//   II SKY     the real figure (the Sickle + the hindquarters to Denebola). Regulus labelled: "little king", at the heart.
//              LEO: "ruled by the Sun. so yes, i *glow.*"
//   III CLOSE  the spotlight is warm but *lonely*; people see the hair, it wants them to see the *heart*; Aquarius cutaway
//              (engaged in season 5): "it cried at my exhibit. *loudly.*"; what scares it: the lights go off and everyone
//              *leaves.*
//   TAKEAWAY   "Clap for me. Then *stay* after the show."
//   The ghost leans out from behind the stage curtain during the interview.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { makeEpisode, drawBits, HEROFIG, HEROFIG_C, GOLD, BONE } from '../s6.js'

const INK = '#1b1236'
const LION = [            // the Nemean lion, facing left, big mane
  '....MMMMM...............',
  '..MMMmMMMMM.............',
  '.MMMFFFFMMMM............',
  'MMMFEFFEFMMM............',
  'MMMFFFFFFMMMBBBBBBBBB...',
  'MMMFFNNFFMMBBBBBBBBBBB..',
  '.MMFFmmFFMMBBBBBBBBBBBt.',
  '.MMMFFFFMMMBBBBbBBBBBB.t',
  '..MMMMMMMMBBBBBBBBBBBB.t',
  '....MMMM.BBBBBBBBBBBB..t',
  '.........LL.LL...LL.LLtt',
  '.........LL.LL...LL.LL..',
  '.........dd.dd...dd.dd..',
]
const LION_C = { M: '#c8862e', m: '#e0a84a', F: '#f2c77a', E: '#1b1236', N: '#5a3a1e', B: '#e8b45a', b: '#d29a40', t: '#c8862e', L: '#e8b45a', d: '#8a5a2c' }
const ARROW = ['A.....', '.AAAAA', 'A.....']
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
// Heracles in the hide: the lion-skin hood is his hood (HEROFIG), with the mane drawn round it
const MANE = ['..MMMMM..', '.MMMMMMM.', 'MM.....MM', 'MM.....MM', 'M.......M']

function tableau(ctx, t, { tab, tabAt, P }) {
  ctx.fillStyle = '#8a7650'; ctx.fillRect(P.x0, 1150, P.x1 - P.x0, P.y1 - 1150)
  ctx.fillStyle = '#a8946a'; for (let xx = P.x0; xx < P.x1; xx += 24) ctx.fillRect(xx, 1146 + ((xx / 24) % 2) * 4, 12, 8)
  if (tab === 0) {
    // the lion stands; arrows fly in from the left and bounce off its hide
    drawBits(ctx, LION, LION_C, 640, 1060, 16)
    for (let i = 0; i < 3; i++) {
      const a0 = tabAt + 0.5 + i * 1.1, d = t - a0
      if (d < 0 || d > 1.0) continue
      const hit = 0.35
      let ax, ay, rot = 0
      if (d < hit) { ax = lerp(150, 470, d / hit); ay = 960 + i * 40 }
      else { const q = (d - hit) / 0.65; ax = 470 - q * 120; ay = 960 + i * 40 - Math.sin(Math.PI * q) * 90 + q * 120; rot = q * 4 }
      drawBits(ctx, ARROW, { A: '#d9d2c2' }, Math.round(ax), Math.round(ay), 8, { rot })
      if (d >= hit && d < hit + 0.15) drawPixelStar(ctx, 480, 960 + i * 40, 30, 1, '#fff1c8', '#ffffff')
    }
  } else {
    // Heracles, his first labour done, wears the hide
    drawBits(ctx, HEROFIG, HEROFIG_C, 540, 1050, 18)
    drawBits(ctx, MANE, { M: '#c8862e' }, 540 - 18, 1050 - 18 * 5.2, 18, { outline: null })
    const p = clamp((t - tabAt) / 1.2)
    ctx.save(); ctx.globalAlpha *= p
    monoText2(ctx, 'LABOUR No. 1', 540, 700)
    ctx.restore()
  }
}
function monoText2(ctx, s, x, y) {
  ctx.save(); ctx.font = "700 40px 'Space Mono', monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = INK; ctx.fillRect(x - 190, y - 34, 380, 68); ctx.fillStyle = '#f3e7cc'; ctx.fillRect(x - 182, y - 26, 364, 52)
  ctx.fillStyle = INK; ctx.fillText(s, x, y + 2); ctx.restore()
}
function tint(ctx, t, { tab }) {
  if (tab !== 0) return
  ctx.save(); ctx.globalAlpha *= 0.35; drawBits(ctx, LION.map(r => r.replace(/[^Mm]/g, '.')), { M: '#f39a3a', m: '#ffc060' }, 640, 1060, 16, { outline: null }); ctx.restore()
}

// ── the sky (RA h, Dec °, V mag)
const STARS = [
  { id: 'regulus', ra: 10.1395, dec: 11.97, mag: 1.35 },
  { id: 'eta', ra: 10.1222, dec: 16.76, mag: 3.5 },
  { id: 'algieba', ra: 10.3329, dec: 19.84, mag: 2.0 },
  { id: 'adhafera', ra: 10.2782, dec: 23.42, mag: 3.4 },
  { id: 'rasalas', ra: 9.8794, dec: 26.01, mag: 3.9 },
  { id: 'eps', ra: 9.7642, dec: 23.77, mag: 3.0 },
  { id: 'zosma', ra: 11.2351, dec: 20.52, mag: 2.55 },
  { id: 'chertan', ra: 11.2373, dec: 15.43, mag: 3.3 },
  { id: 'denebola', ra: 11.8177, dec: 14.57, mag: 2.1 },
]

// ── the curtain (behind, at the right edge, interview only) + the crown
function under(ctx, t, { seg }) {
  if (seg === 'sky') return
  const x0 = 960
  for (let i = 0; i < 6; i++) {
    const xx = x0 + i * 20
    ctx.fillStyle = i % 2 ? '#9c1d2a' : '#c8283a'; ctx.fillRect(xx, 0, 20, 1920)
    ctx.fillStyle = 'rgba(255,200,200,0.12)'; ctx.fillRect(xx + 4, 0, 4, 1920)
  }
  ctx.fillStyle = INK; ctx.fillRect(x0 - 6, 0, 6, 1920)
  ctx.fillStyle = '#f2c75c'; ctx.fillRect(x0 - 2, 960, 20, 12)   // the tie-back
}
function prop(ctx, t, r, { size }) {
  const c = Math.max(3, Math.round(size / 36))
  drawBits(ctx, CROWN, CROWN_C, Math.round(r.x), Math.round(r.top + c), c * 1.2, { rot: -0.12 + 0.04 * Math.sin(t * 3) })
}

const EP = makeEpisode({
  id: 'st6leo', sign: 'leo', ep: 5, duration: 60, pitch: 880,
  cold: [{ text: 'is my light okay? okay. *roll* it.', mood: 'sparkle' }],
  title: { accent: 'the big heart.', facts: [['FIRE', 'FIXED', 'RULED BY THE SUN'], ['THE LION', 'JUL 23 – AUG 22']] },
  myth: {
    head: 'The *Nemean* lion.',
    lines: [
      { who: 'stars', tab: 0, text: 'in Greek myth, the Nemean lion had a hide no weapon could *pierce.*' },
      { who: 'stars', tab: 1, text: 'defeating it was Heracles’ first labour. he wore its hide after.' },
    ],
    tableau, tint,
  },
  sky: {
    head: 'The little *king.*',
    map: { name: 'Leo', stars: STARS, bright: 'regulus', brightCol: '#cfe2ff',
      lines: [['regulus', 'eta'], ['eta', 'algieba'], ['algieba', 'adhafera'], ['adhafera', 'rasalas'], ['rasalas', 'eps'], ['algieba', 'zosma'], ['zosma', 'denebola'], ['denebola', 'chertan'], ['chertan', 'regulus'], ['zosma', 'chertan']],
      box: { cx: 540, cy: 880, w: 780, h: 460 },
      labels: [{ star: 'regulus', text: 'REGULUS', sub: 'α LEONIS · “LITTLE KING”', dx: -60, dy: 80, align: 'right', at: 1.4 }] },
    lines: [
      { who: 'stars', text: 'Regulus, the “little king”, sits at the lion’s *heart.*' },
      { text: 'and Leo’s ruled by the Sun. so yes, i *glow.*', mood: 'sparkle' },
    ],
    heroAt: [176, 1238],
  },
  personal: {
    chyron: 'SIGN No. 5 · RULED BY THE SUN',
    cutChyron: 'CUTAWAY · THE FIANCÉ',
    items: [
      { q: 'Q. Life in the | *spotlight?*', lines: [{ text: 'the spotlight’s warm. but it’s *lonely* up here.', mood: 'neutral', look: [0, 1] }] },
      { q: 'Q. What do people | get *wrong?*', lines: [
        { text: 'they see the hair. i want them to see the *heart.*', mood: 'heart' },
        { who: 'aquarius', text: 'it cried at my exhibit. *loudly.*' },
      ] },
      { q: 'Q. How do you | *love?*', lines: [{ text: 'out loud. banners. toasts. a *standing* ovation, minimum.', mood: 'happy' }] },
      { q: 'Q. What *scares* you?', lines: [{ text: 'the lights go off, and everyone *leaves.*', mood: 'wide', look: [0, 0] }] },
    ],
  },
  takeaway: { text: 'Clap for me. | Then *stay* after | the show.', words: 4, late: 4, top: 330, size: 108, accentSize: 170, byY: 830 },
  hero: { under, prop, state: (t, seg) => seg === 'take' ? { mood: 'happy', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [1, -1] } : { mood: 'happy' } },
  ghost: { t: null, seg: 'personal', at: 6.0, x: 960, y: 760, from: 'right', cell: 3, where: 'leaning out from behind the red stage curtain at the right edge, during the interview (III · UP CLOSE)' },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
void GOLD; void BONE; void ease
