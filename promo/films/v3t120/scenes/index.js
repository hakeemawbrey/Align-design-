// v3t120: THE SIGNS AS… v3, SOLO film, "Things only | Cancers get." (~43 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine everyday situations, each pushed to the most extreme (and lovable) Cancer version.
//   0.0–3.6    "Things only | *Cancers* get."  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards: "I'm fine" (a rain cloud) · knows your coffee order from three jobs ago · kept every birthday
//              card, ever · one sad ad, called their mom · hosts, feeds you twice · group chat named "my babies"
//              · saw your match's profile, already protective · planned a night out, stayed in, happier
//              · forgave you, remembers everything
//  37.8        group ending: "Tough outside. | *Mush inside.*"  (Cancer comes back, big, heart-eyed)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', ACC = '#8fe3ff'

const CLOUD = ['...GGGG.....', '..GGGGGG.GG.', '.GGGGGGGGGGG', 'GGGGGGGGGGGG', '.GGGGGGGGGG.']
const CUP = ['.WWWWWW...', 'WBBBBBBW..', 'WBBBBBBWWW', 'WBBBBBBW.W', 'WBBBBBBWWW', '.WBBBBW...', '..WWWW....']
const BOX = ['BBBBBBBBBBBBBB', 'BBBBBBBBBBBBBB', 'B............B', 'B............B', 'B............B', 'BBBBBBBBBBBBBB', 'BBBBBBBBBBBBBB']
const ENV = ['WWWWWWWW', 'WKWWWWKW', 'WWKWWKWW', 'WWWKKWWW', 'WWWWWWWW']
const PHONE = ['KKKKKKKKKK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KKKKGGKKKK', 'KKKKKKKKKK']
const PLATE = ['..WWWWWWWWW..', '.WWFFFFFFFWW.', 'WWFFFFFFFFFWW', '.WWWWWWWWWWW.']
const SLIPPER = ['.PPPPP..', 'PPPPPPPP', 'PWWWWWPP', 'PPPPPPPP']
const NOTEBOOK = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWLLLLLLWK', 'KWWWWWWWWK', 'KWLLLLLWWK', 'KWWWWWWWWK', 'KWLLLLLLWK', 'KWWWWWWWWK', 'KWLLLLWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK']

function chatCard(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  const w = 320, h = 420
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = SKYB; x.fillRect(-w / 2, -h / 2, w, 70)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('my babies ♡', 0, -h / 2 + 36)
  const M = ['did u eat?', 'text when home', 'wear a coat!!', 'proud of u']
  x.font = `700 26px ${MONO}`
  M.forEach((s, i) => { if (lt > 0.4 + i * 0.3) { const bw = x.measureText(s).width + 30; x.fillStyle = BONE; x.fillRect(-w / 2 + 16, -h / 2 + 96 + i * 76, bw, 52); x.fillStyle = INK; x.textAlign = 'left'; x.fillText(s, -w / 2 + 31, -h / 2 + 122 + i * 76) } })
  x.restore()
}
function matchProfile(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const w = 300, h = 380
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, 160)
  signChar(x, t, 'sagittarius', 0, -h / 2 + 100, 120, { mood: 'wink', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = '#ff9a4a'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('♐︎ YOUR MATCH', 0, -h / 2 + 206)
  x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('likes: motorbikes,', 0, -h / 2 + 256); x.fillText('cliffs, “no plans”', 0, -h / 2 + 290)
  x.restore()
}

const CAMEOS = [
  { sign: 'cancer', cap: '“I’m fine.” | *Was not fine.*', mood: lt => lt > 1.0 ? 'neutral' : 'happy', tears: lt => lt > 1.4 ? 1 : 0, look: [0, 1], star: { x: -170, y: 30 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      drawBits(x, CLOUD, { G: '#9aa5c4' }, F.x, F.top - 70, 16 * k)
      if (k > 0.9) { x.save(); x.fillStyle = SKYB; for (let i = 0; i < 6; i++) { const ph = ((t * 1.6 + i / 6) % 1); x.fillRect(F.x - 70 + i * 28, F.top - 40 + ph * 90, 6, 18) } x.restore() }
      bubble(x, 790, 760, 'I’m fine!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 790, 960, 'FORECAST: TEARS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Knows your coffee order. | From *three jobs ago.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CUP, { W: '#fff4e2', B: BROWN }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'OAT · EXTRA HOT', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'the usual, right?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Kept every birthday card. | *Ever.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 8; i++) { const p = prog(lt, 0.4 + i * 0.12, 0.9 + i * 0.12); if (p > 0) drawBits(x, ENV, { W: ['#fff4e2', PINK, SKYB, GOLD][i % 4], K: INK }, 790 + Math.sin(i * 2.3) * 90, lerp(1000, 760 - (i % 3) * 50, ease.outCubic(p)), 12, { rot: Math.sin(i * 1.3) * 0.4 }) }
      drawBits(x, BOX, { B: '#c98a5a' }, 790, 1040, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1150, 'BOX 14 OF 14', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Watched one sad ad. | *Called their mom.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt < 1.2 ? 2 : 0, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PHONE, { K: '#2a2350', S: '#140c30', G: '#6b62a8' }, 790, 880, 30 * k, { rot: 0.05 * Math.sin(t * 20) * (lt > 0.8 && lt < 1.3 ? 1 : 0) })
      if (k > 0.9) { x.save(); x.fillStyle = MINT; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MOM', 790, 840); x.font = `700 26px ${MONO}`; x.fillStyle = BONE; x.fillText('calling…', 790, 900); x.restore() }
      bubble(x, 790, 640, 'love you!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1130, 'CALL: 2 HRS', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Hosts every gathering. | Feeds you *twice.*', mood: 'heart', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: '#fff4e2', F: ORANGE }, 790, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PLATE, { W: '#fff4e2', F: '#5fd068' }, 790, 900, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      drawBits(x, PLATE, { W: '#fff4e2', F: PINK }, 790, 800, 20 * pop01(t, P.t0 + 1.3, 0.3, 2))
      bubble(x, 790, 640, 'you look hungry', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1130, 'SECONDS: MANDATORY', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Their group chat name: | *“my babies.”*', mood: 'happy', star: { x: -170 },
    front(x, t, lt, P) { chatCard(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'cancer', cap: 'Saw your match’s profile. | *Already protective.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      matchProfile(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1110, 'APPROVAL: PENDING', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 380, 590, 'cliffs?!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Planned a night out. | Stayed in. *Happier.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170, y: -20 },
    front(x, t, lt, P, F) {
      label(x, 790, 700, 'NIGHT OUT ✗', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 860, 'NIGHT IN ✓', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      drawBits(x, SLIPPER, { P: PINK, W: '#fff4e2' }, F.x - 50, 1120, 12 * pop01(t, P.t0 + 1.2, 0.3, 2))
      drawBits(x, SLIPPER, { P: PINK, W: '#fff4e2' }, F.x + 60, 1120, 12 * pop01(t, P.t0 + 1.3, 0.3, 2))
      hearts(x, t, F.x, F.top, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'cancer', cap: 'Forgave you. | Remembers *everything.*', mood: lt => lt > 1.2 ? 'squint' : 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, NOTEBOOK, { K: '#c97bff', W: '#fff4e2', L: '#b9b0a0' }, 790, 880, 26 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: 0.05 })
      bubble(x, 790, 640, 'it’s okay ♡', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1150, 'FILED: VOL. 9', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t120', key: 'G', accent: ACC, solo: 'cancer', ending: 'group',
  title: 'Things only | *Cancers* get.',
  cameos: CAMEOS,
  group: {
    cap: 'Tough outside. | *Mush inside.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
