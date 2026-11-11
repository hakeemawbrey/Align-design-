// v3t034: THE SIGNS AS… v3, "The signs | making a playlist." (~57 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    the hook, the twelve line up, then dive into the pip row.
//   3.6–49.2   one playlist per sign, each pushed to the extreme:
//              ♈ every song at double speed · ♉ one song, on repeat, for years · ♊ nine genres, one minute
//              · ♋ a playlist for that one Tuesday · ♌ sure every song is about them · ♍ sorted by mood, tempo and key
//              · ♎ three hours naming it · ♏ every song is a clue · ♐ road-trip playlist, nine days long
//              · ♑ focus playlist: a ticking clock · ♒ only whale sounds · ♓ a playlist for their match, cried making it
//  49.2        group: "Who gets the aux? | *Nobody.*"
//  52.6        callback: "Party’s over. | Song’s *still on.*" (the repeat sign from Taurus' card)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', CREAM = '#fff4e2'

// a phone showing a playlist: title + rows
function phone(x, cx, cy, k, title, rows, { hi = -1, col = MINT, w = 300, size = 30 } = {}) {
  if (k <= 0.01) return
  const h = 120 + rows.length * 62
  x.save(); x.translate(cx, cy); x.scale(k * 1.25, k * 1.25)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = '#1e1640'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, 70)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 37)
  x.textAlign = 'left'; x.font = `700 ${size - 4}px ${MONO}`
  rows.forEach((r, i) => {
    const y = -h / 2 + 110 + i * 62
    if (i === hi) { x.fillStyle = 'rgba(242,199,92,0.25)'; x.fillRect(-w / 2 + 8, y - 26, w - 16, 52) }
    x.fillStyle = col; x.fillRect(-w / 2 + 18, y - 8, 16, 16)
    x.fillStyle = CREAM; x.fillText(r, -w / 2 + 48, y + 2)
  })
  x.restore()
}
// a big "repeat" loop sign
function repeat(x, t, cx, cy, k, col = GOLD) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 1.5)
  x.lineWidth = 26; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 90, 0.3, Math.PI * 2 - 0.3); x.stroke()
  x.lineWidth = 16; x.strokeStyle = col; x.beginPath(); x.arc(0, 0, 90, 0.3, Math.PI * 2 - 0.3); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.moveTo(70, -10); x.lineTo(126, -10); x.lineTo(98, 40); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(78, -4); x.lineTo(118, -4); x.lineTo(98, 30); x.fill()
  x.restore()
}
const WHALE = [
  '..........S...S',
  '...........S.S.',
  '....BBBBBB..B..',
  '..BBBBBBBBBBB..',
  '.BBWBBBBBBBBBB.',
  'BBBBBBBBBBBBBBB',
  'BbbbbbbbbbbBBB.',
  '.bbbbbbbbbBB...',
]
const WHALE_C = { B: '#4a7ac8', b: '#a8c8ef', W: '#ffffff', S: SKYB }
const MAGNIFY = [
  '.KKKK...',
  'KSSSSK..',
  'KSWSSK..',
  'KSSSSK..',
  '.KKKKK..',
  '.....KK.',
  '......KK',
]
const CAR = [
  '...RRRRR....',
  '..RSSRSSR...',
  'RRRRRRRRRRRR',
  'RRRRRRRRRRRR',
  '.KK.....KK..',
]

const CAMEOS = [
  { sign: 'aries', cap: 'Every song | *at double speed.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.3, 0.5, 0.7, 0.9, 1.1],
    front(x, t, lt, P) {
      phone(x, 750, 870, pop01(t, P.t0 + 0.2, 0.3, 2), 'GO GO GO', ['track 1', 'track 2', 'track 3'], { hi: Math.floor(t * 6) % 3, col: '#ff6b5a' })
      label(x, 800, 610, 'SPEED: 2×', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'One song. | On repeat. *For years.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      repeat(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      notes(x, t, 800, 760, { n: 3, cell: 7, alpha: clamp(lt - 0.4) })
      label(x, 800, 1080, 'PLAYS: ∞', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Nine genres. | *One minute.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const G = ['opera', 'polka', 'jazz', 'metal', 'lullaby', 'disco', 'sea shanty']
      const i = Math.floor(lt / 0.3) % G.length
      label(x, 800, 860, 'NOW: ' + G[i], pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 40, bg: [PINK, GOLD, SKYB, MINT, LAV][i % 5], rot: (i % 2 ? 1 : -1) * 0.05, font: MONO, weight: 700 })
      notes(x, t, 800, 760, { n: 5, cell: 7, col: GOLD, alpha: clamp(lt) })
      label(x, 800, 1080, 'SHUFFLE: CHAOS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A playlist | for *that one Tuesday.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 745, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'MY PLAYLISTS', ['that tuesday', 'rainy nap', 'mom’s soup', 'the bench'], { w: 320, col: SKYB, size: 30, hi: Math.min(3, Math.floor(lt / 0.5)) })
    } },
  { sign: 'leo', cap: 'Every love song? | *About them.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      notes(x, t, 800, 900, { n: 4, cell: 8, col: GOLD })
      bubble(x, 800, 690, 'they wrote | this for me', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 370, 820, P.t0 + 1.0, 6, 160, 0.2)
      label(x, 800, 1080, 'THEY DIDN’T', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Sorted by mood, | tempo and *key.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 745, 870, pop01(t, P.t0 + 0.2, 0.3, 2), 'SORTED (v14)', ['calm · 60 · C', 'calm · 62 · C', 'calm · 62 · D', 'calm · 64 · D'], { w: 320, col: MINT, size: 28 })
    } },
  { sign: 'libra', cap: 'Three hours | *naming it.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const N = ['vibes', 'Vibes', 'vibes.', 'v i b e s', 'untitled']
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.3, 0.25, 2.2)
        if (k <= 0.01) continue
        label(x, 790, 620 + i * 105, N[i], k, { size: 36, bg: i === 4 ? GOLD : CREAM, rot: (i % 2 ? 1 : -1) * 0.04, font: MONO, weight: 700 })
        if (i < 4 && lt > 0.4 + i * 0.3 + 0.25) { x.fillStyle = RED; x.fillRect(690, 620 + i * 105 - 4, 200, 8) }
      }
    } },
  { sign: 'scorpio', cap: 'Made you a playlist. | Every song’s *a clue.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 750, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 'FOR YOU', ['track 1', 'track 2', 'track 3'], { col: '#c23a5a' })
      drawBits(x, MAGNIFY, { K: INK, S: '#a8d8ef', W: '#fff' }, 860 + 20 * Math.sin(t * 2), 1010, 18 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 625, 'DECODE IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Road-trip playlist. | *Nine days long.*', mood: 'sparkle', star: { x: 150 }, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      drawBits(x, CAR, { R: '#9b5cff', S: SKYB, K: INK }, 330 + 20 * Math.sin(t * 3), 940, 32 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 330, 830, { n: 3, cell: 7, alpha: clamp(lt) })
      label(x, 330, 680, 'TIME: 9 DAYS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Focus playlist: | *a ticking clock.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 108, 0, Math.PI * 2); x.fill()
        const a = Math.floor(t * 2) / 60 * Math.PI * 2; x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(a) * 90, -Math.cos(a) * 90); x.stroke()
        x.restore()
      }
      label(x, 790, 660, 'TICK. TOCK.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'BANGER', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Only listens to | *whale sounds.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, WHALE, WHALE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 * Math.sin(t * 2) })
      bubble(x, 790, 680, 'ooOOOooo', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Made a playlist for a match. | *Cried.*', mood: lt => lt < 0.7 ? 'happy' : 'wide', tears: lt => lt < 0.7 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 750, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 'FOR MY MATCH', ['song 1 ♥', 'song 2 ♥', 'song 3 ♥'], { col: LAV, w: 300, size: 30 })
      label(x, 800, 620, 'TRACK 1. SOBBING.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t034', key: 'F', accent: '#7dffb0', ending: 'callback',
  title: 'The signs | *making a playlist.*',
  cameos: CAMEOS,
  group: { cap: 'Who gets the aux? | *Nobody.*' },
  last: {
    text: 'Party’s over. | Song’s *still on.*',
    draw(x, t, lt) {
      repeat(x, t, 540, 1120, 1.3 * pop01(t, t - lt + 0.4, 0.4, 2))
      notes(x, t, 540, 1000, { n: 5, cell: 9, alpha: clamp(lt - 0.6) })
      signChar(x, t, 'taurus', 540, 1430, 200, { mood: 'heart', pop: pop01(t, t - lt + 0.8, 0.4, 1.8), seed: 12 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
