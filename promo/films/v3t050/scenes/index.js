// v3t050: THE SIGNS AS… v3, SOLO film, "Dating a Leo | be like." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine dating moments, each pushed to the most extreme (and lovable) Leo version.
//   0.0–3.6    "Dating a Leo | *be like.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards: your anniversary, their photoshoot · first date outfit, rehearsed with lighting
//              · your birthday: fireworks · you complimented them, they bowed · grand gesture: a banner on a plane
//              · your couple name is mostly their name · you had a rough day, they sang to you
//              · profile says "will fight a goose for you" · bragged about you: 48 times today
//  37.8        "Loud love. | *All of it.*"
//  41.0        LESSON UNLOCKED: "Clap for your Leo. | They clap *back louder.*"  MATCH: MADE
//  46.9        "Their perfect match? | *Their biggest fan.*" over the match card: Leo + Libra (the compliment and the bow).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'

const CAMERA = [
  '...KKK......',
  'KKKKKKKKKKKK',
  'KGGGGGGGGGWK',
  'KGGGKKKGGGGK',
  'KGGKSSSKGGGK',
  'KGGKSWSKGGGK',
  'KGGKSSSKGGGK',
  'KGGGKKKGGGGK',
  'KKKKKKKKKKKK',
]
const CAMERA_C = { K: '#2a2350', G: '#9aa5c4', S: SKYB, W: '#ffffff' }
const PLANE = [
  '......WW.....',
  '......WWW....',
  'W.....WWWW...',
  'WWWWWWWWWWWWW',
  'WWWWWWWWWWWWS',
  'W.....WWWW...',
  '......WWW....',
  '......WW.....',
]
const PLANE_C = { W: '#ffffff', S: SKYB }
const GOOSE = [
  '..WWW.....',
  '.WWKW.....',
  '.WWWWOO...',
  '..WW......',
  '..WW......',
  '..WWWWWWW.',
  '.WWWWWWWWW',
  '.WWWWWWWW.',
  '...O..O...',
]
const GOOSE_C = { W: '#f4f8ff', K: INK, O: '#ff9a4a' }

function firework(x, t, cx, cy, t0, col) {
  const tt = t - t0; if (tt < 0 || tt > 1.4) return
  const p = ease.outCubic(Math.min(1, tt / 0.9)), a = 1 - ease.inQuad(clamp((tt - 0.5) / 0.9))
  x.save(); x.globalAlpha = a; x.fillStyle = col
  for (let i = 0; i < 12; i++) { const ang = i / 12 * Math.PI * 2; x.fillRect(cx + Math.cos(ang) * 150 * p - 9, cy + Math.sin(ang) * 150 * p - 9, 18, 18) }
  x.restore()
}

const CAMEOS = [
  { sign: 'leo', cap: 'Your anniversary? | *Their photoshoot.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -190 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CAMERA, CAMERA_C, 800, 840, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (lt > 0.9 && (lt * 3) % 1 < 0.2) { x.save(); x.globalAlpha = 0.35; x.fillStyle = '#fff'; x.fillRect(110, 480, 860, 740); x.restore() }
      label(x, 800, 1070, 'SHOT 312', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 42, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 650, 'ANNIVERSARY', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Date outfit? | Tested *the lighting.*', mood: 'sparkle', star: { x: -150 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1c8'; x.beginPath(); x.moveTo(330, 470); x.lineTo(560, 470); x.lineTo(590, 1180); x.lineTo(170, 1180); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      label(x, 800, 720, 'DRESS REHEARSAL', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 900, 'TAKE 9', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 48, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1090, 'from the top!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Your birthday? | *Fireworks.* Obviously.', mood: lt => lt > 0.8 ? 'heart' : 'sparkle', star: { x: -190 }, hops: [0.8, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      firework(x, t, 720, 680, P.t0 + 0.5, PINK); firework(x, t, 880, 760, P.t0 + 0.9, GOLD); firework(x, t, 760, 900, P.t0 + 1.3, SKYB); firework(x, t, 860, 640, P.t0 + 1.8, MINT)
      label(x, 800, 1080, 'HAPPY BIRTHDAY!!', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'You said “nice shirt.” | *They bowed.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -190 }, squash: lt => lt > 1.0 && lt < 1.8 ? 0.18 : 0,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'nice shirt!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: LAV, tail: 'br' })
      label(x, 800, 920, 'THANK YOU, THANK YOU', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 360, 860, P.t0 + 1.1, 8, 180, 0.4)
      label(x, 800, 1080, 'ENCORE?', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.05 })
    } },
  { sign: 'leo', cap: 'Grand gesture? | *A banner. On a plane.*', mood: 'sparkle', look: [1, -1], star: { x: -190, y: 60 }, hops: [1.4],
    front(x, t, lt, P) {
      const px = lerp(1000, 520, ease.outCubic(prog(lt, 0.2, 1.4)))
      drawBits(x, PLANE, PLANE_C, px, 700, 15, { sx: -1 })
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(px + 100, 700); x.lineTo(px + 150, 720); x.stroke(); x.restore() }
      label(x, px + 280, 720, 'I ♥ YOU', k, { size: 40, bg: '#fff4e2', rot: 0, font: MONO, weight: 700 })
      hearts(x, t, 800, 1000, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Your couple name? | *Mostly their name.*', mood: 'wink', star: { x: -190 },
    front(x, t, lt, P) {
      label(x, 800, 720, 'LEO + YOU =', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 900, '“LEOLEOLEOU”', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05 })
      bubble(x, 800, 1090, 'it flows!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'You had a rough day. | *They sang to you.*', mood: 'heart', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 940, 200 * k, { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], seed: 17, glyph: false })
      notes(x, t, 560, 760, { n: 5, cell: 8, col: ORANGE, seed: 4, alpha: clamp(lt - 0.5) })
      label(x, 820, 690, lt > 1.3 ? 'DAY: BETTER' : 'DAY: ROUGH', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: lt > 1.3 ? MINT : LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Their dating profile? | *Very honest.*', mood: 'sparkle', star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 820); x.rotate(-0.03); x.scale(1.2 * k, 1.2 * k)
        x.fillStyle = INK; x.fillRect(-170, -160, 340, 320); x.fillStyle = '#fff4e2'; x.fillRect(-162, -152, 324, 304)
        x.fillStyle = ORANGE; x.fillRect(-162, -152, 324, 60)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ABOUT ME', 0, -122)
        x.font = `700 30px ${INTER}`; ;['will fight', 'a goose', 'for you.'].forEach((s, i) => x.fillText(s, 0, -50 + i * 46))
        x.restore()
      }
      drawBits(x, GOOSE, GOOSE_C, 900, 1110, 13 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      label(x, 690, 1110, 'TRUE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Bragged about you. | *Forty-eight times.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -190 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      bubble(x, 800, 690, 'my partner…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 0.5) / 1.5) * 47)
      label(x, 800, 900, `MENTIONS: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1080, 'BEFORE NOON', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3t050', key: 'G', accent: ORANGE, solo: 'leo', ending: 'card',
  title: 'Dating a Leo | *be like.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'libra', chip: 'IT’S A MATCH' },
  group: { cap: 'Loud love. | *All of it.*', mood: 'heart' },
  lesson: { text: 'Clap for your Leo. | They clap *back louder.*', chip: 'MATCH: MADE' },
  last: {
    text: 'Their perfect match? | *Their biggest fan.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
