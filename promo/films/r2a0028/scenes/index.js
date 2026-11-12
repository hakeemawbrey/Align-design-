// r2a0028: star_advice, ADVICE SOLO, "How to encourage | a Cancer." (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Cancer truth + a warm way to encourage them, one gag
// each. Ending: the group beat.
//   0.0–3.6    "How to encourage | *a Cancer.*"
//   3.6–37.8   send a voice note (they'll replay it) · big day? a note in their bag · back in their shell? knock softly
//              · remember the little thing · praise the cooking, name the dish · doubting? show them the receipts
//              · they hold everyone up, hold them up too · say "I'm proud of you" · missing home? be a little home
//  37.8        group (the ending): "Soft shell. | *Strong heart.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#7fd3ff', CREAM = '#fff4e2', RED = '#e23d4e'

// ── props
const SHELL = ['....SSSSSS....', '..SSssSSssSS..', '.SSSSSSSSSSSS.', 'SSssSSSSSSssSS', 'SSSSSSSSSSSSSS', 'SSSSSSSSSSSSSS']
const HOUSE = ['......RR......', '....RRRRRR....', '..RRRRRRRRRR..', 'RRRRRRRRRRRRRR', '.WWWWWWWWWWWW.', '.WWYYWWWWYYWW.', '.WWYYWWWWYYWW.', '.WWWWWDDWWWWW.', '.WWWWWDDWWWWW.', '.WWWWWDDWWWWW.']

function card(x, cx, cy, k, lines, { rot = 0.04, title = '', w = 300, h = 360, size = 28, bg = CREAM } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  if (title) { x.font = `800 30px ${INTER}`; x.fillText(title, 0, -h / 2 + 44) }
  x.font = `700 ${size}px ${MONO}`
  lines.forEach((l, i) => x.fillText(l, 0, (title ? -h / 2 + 110 : -((lines.length - 1) / 2) * size * 1.5) + i * size * 1.5))
  x.restore()
}

const S = 'cancer'
const CAMEOS = [
  { sign: S, cap: 'Send a voice note. | *They’ll replay it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -50, 340, 100); x.fillStyle = SEA; x.fillRect(-162, -42, 324, 84)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-136, -24); x.lineTo(-136, 24); x.lineTo(-100, 0); x.fill()
        for (let i = 0; i < 12; i++) { const hh = 10 + 26 * Math.abs(Math.sin(i * 1.7 + t * 4)); x.fillRect(-80 + i * 20, -hh / 2, 10, hh) }
        x.restore()
      }
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 8)
      label(x, 790, 1010, `PLAYED: ${n}×`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big day? | *Leave a note in their bag.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2), ['you’ve', 'got this.', '– me'], { w: 280, h: 280, size: 38, bg: '#fff1b0', rot: -0.05 })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Back in their shell? | *Knock softly.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hideStar: true,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P, F) {
      const peek = ease.outBack ? ease.outBack(prog(lt, 1.1, 1.6)) : ease.outCubic(prog(lt, 1.1, 1.6))
      signChar(x, t, 'cancer', F.x, 960 - peek * 110, 280 * P.k, { mood: lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], seed: 8 })
      drawBits(x, SHELL, { S: '#ff9a7a', s: '#e0705a' }, F.x, 1030, 24 * P.k)
      bubble(x, 790, 760, 'knock knock.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 800, 960, 'take your time.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: SEA, tail: 'bl' })
    } },
  { sign: S, cap: 'Remember the little thing. | *They never forget.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'how did the | dentist go?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, tail: 'br' })
      bubble(x, 790, 930, 'YOU REMEMBERED?!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: SEA, tail: 'bl' })
      label(x, 790, 1110, 'FRIEND FOR LIFE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Praise their cooking. | *Name the dish.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'that curry? | unreal.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, tail: 'br' })
      sparkles(x, t, 790, 880, P.t0 + 1.0, 7, 160, 0.4)
      label(x, 790, 1040, 'CHEF: BLUSHING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Doubting themself? | *Show them the receipts.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.35) + 1)
      const L = ['helped Jo move', 'baked for 12', 'showed up.', 'always.'].slice(0, n)
      card(x, 790, 870, pop01(t, P.t0 + 0.15, 0.35, 2), L, { title: 'YOUR WINS', size: 28, w: 340, h: 400 })
    } },
  { sign: S, cap: 'They hold everyone up. | *Hold them up too.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -100, y: -60 }, hops: [],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) {
        signChar(x, t, 'aries', 350, 1060, 150 * k, { mood: 'sparkle', look: [0, -1], seed: 71, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.6] })
        signChar(x, t, 'leo', 530, 1060, 150 * k, { mood: 'sparkle', look: [0, -1], seed: 72, glyph: false, hops: [P.t0 + 1.2, P.t0 + 1.8] })
      }
      label(x, 800, 700, 'YOUR TURN', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 42, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say it plainly: | *“I’m proud of you.”*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, tears: lt => lt > 1.2 ? 1 : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'i’m proud | of you.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 1050, 'SAVED FOREVER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: SEA, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 470, 820, P.t0 + 1.1, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Missing home? | *Be a little home.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, HOUSE, { R: '#ff7a5a', W: CREAM, Y: lt > 0.9 ? '#ffd23a' : '#6b62a8', D: '#8a4a2e' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.9) { x.save(); x.globalAlpha = 0.35; x.shadowColor = '#ffd23a'; x.shadowBlur = 40; x.fillStyle = '#ffd23a'; x.fillRect(680, 860, 50, 50); x.fillRect(850, 860, 50, 50); x.restore() }
      label(x, 790, 1110, 'LIGHTS ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0028', key: 'C', accent: SEA, solo: 'cancer', ending: 'group',
  title: 'How to encourage | *a Cancer.*',
  cameos: CAMEOS,
  group: { cap: 'Soft shell. | *Strong heart.*', mood: 'heart' },

})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
