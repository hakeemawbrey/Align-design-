// r2t0151: star_talk SOLO, "How to spot | a Scorpio." (~43 s vertical, signs3kit social cut, music: lofi · C). Ending: 'group'.
//   0.0–3.6    "How to spot | *a Scorpio.*"  One big Scorpio pops in, then dives away.
//   3.6–37.8   nine field signs: sits facing the door · sunglasses indoors at night · profile photo is just an eye
//              · all black to a beach party · read the group chat, said nothing · remembers what you said in 2019
//              · hugs need three business days · laughs once a year · tell them a secret, the key's gone
//  37.8        "Spotted. | *They saw you first.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, inSprite, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, phone, shadesCells, CREAM, RED, WOOD, GREY, DEEP, PURPLE, NIGHT } from './props.js'

const S = 'scorpio', ST = { x: -170 }
const BALL = ['...RRWW...', '.RRRRWWWW.', 'RRRRRWWWWW', 'YYYYYBBBBB', 'YYYYYBBBBB', '.YYYYBBBB.', '...YYBB...']
const BALL_C = { R: RED, W: CREAM, Y: GOLD, B: SKYB }
const LOCK = ['..KKKKKK..', '.KK....KK.', '.K......K.', '.K......K.', 'GGGGGGGGGG', 'GGGGGGGGGG', 'GGGGKKGGGG', 'GGGGKKGGGG', 'GGGGGKGGGG', 'GGGGGGGGGG']
const LOCK_C = { K: GREY, G: GOLD }
const KEY = ['.GGG......', 'G...GGGGGG', 'G...G.G.G.', '.GGG......']

/** a door with a little window, ajar */
function door(x, cx, cy, k) {
  card(x, cx, cy, 240, 400, k, { bg: WOOD, rot: 0 }, () => {
    x.fillStyle = '#6e3a24'; x.fillRect(-90, -170, 180, 150); x.fillRect(-90, 10, 180, 150)
    x.fillStyle = SKYB; x.fillRect(-60, -150, 120, 90)
    x.fillStyle = GOLD; x.fillRect(70, 0, 22, 22)
    txt(x, 'EXIT', 0, -105, { size: 34, font: MONO, weight: 700, color: RED })
  })
}

const CAMEOS = [
  { sign: S, cap: 'Sits facing the door. | *Every. Single. Time.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'EXITS: MONITORED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: PURPLE, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sunglasses indoors. | *At night.*', mood: 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const on = ease.outCubic(prog(lt, 0.4, 0.8))
      if (on > 0) { x.save(); x.translate(0, (1 - on) * -160); x.globalAlpha = on; inSprite(x, F, () => shadesCells(x)); x.restore() }
      label(x, 780, 680, 'INDOORS · 11 P.M.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 780, 960, 'it’s bright | in here.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Profile photo: | just *one eye.*', mood: lt => lt > 1.5 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 300, 420, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = NIGHT; x.fillRect(-130, -190, 260, 230)
        x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, -75, 90, 44, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = PURPLE; x.beginPath(); x.arc(0, -75, 34, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.beginPath(); x.arc(0, -75, 16, 0, Math.PI * 2); x.fill()
        txt(x, '♏︎ SCORPIO, ??', -126, 80, { size: 26, font: MONO, weight: 700, align: 'left' })
        txt(x, 'bio: no.', -126, 130, { size: 30, align: 'left', color: '#6b62a8' })
      })
    } },
  { sign: S, cap: 'Beach party. | Wore *all black.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(800, 1140); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-8, -460, 16, 470)
      for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? CREAM : PINK; x.beginPath(); x.moveTo(0, -470); x.lineTo(-210 + i * 70, -360); x.lineTo(-140 + i * 70, -360); x.closePath(); x.fill() }
      x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, BALL, BALL_C, 830, 1060, 14 * pop01(t, P.t0 + 0.5, 0.35, 2), { rot: Math.sin(t * 2) * 0.2 })
      label(x, 800, 600, 'DRESS CODE: TROPICAL', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: '#ffb34a', rot: -0.04 })
      bubble(x, 800, 880, 'this is | my beachwear.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Read the group chat. | Said *nothing.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(214, Math.floor(Math.max(0, lt - 0.3) * 140))
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), {}, () => {
        txt(x, 'THE GROUP', 0, -130, { size: 24, font: MONO, weight: 700, color: BONE })
        for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#6b62a8' : '#3d3577'; x.fillRect(i % 2 ? -20 : -96, -96 + i * 44, 116, 30) }
        txt(x, `${n} new`, 0, 130, { size: 30, color: MINT })
      })
      label(x, 790, 1120, 'SEEN BY SCORPIO', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PURPLE, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Remembers what you said. | *In 2019.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 760, 300, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        x.fillStyle = RED; x.fillRect(-150, -110, 300, 60)
        txt(x, 'MARCH', 0, -80, { size: 32, font: MONO, weight: 700, color: CREAM })
        txt(x, '2019', 0, 30, { size: 90 })
      })
      bubble(x, 790, 1020, 'you said | “never.”', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Hugs need | *three business days.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'HUG REQUEST', 0, -100, { size: 30, font: MONO, weight: 700 })
        x.fillStyle = GREY; for (let i = 0; i < 3; i++) x.fillRect(-120, -50 + i * 34, i === 2 ? 150 : 240, 12)
        const st = lt > 1.5
        x.fillStyle = st ? '#2fa36b' : '#ffb34a'; x.fillRect(-110, 70, 220, 54)
        txt(x, st ? 'APPROVED' : 'PENDING', 0, 98, { size: 32, font: MONO, weight: 700, color: CREAM })
      })
      if (lt > 1.5) sparkles(x, t, 790, 900, P.t0 + 1.5 * 1.29, 6, 170, 0.2)
    } },
  { sign: S, cap: 'Laughs once a year. | *Worth the wait.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.25],
    keyCue: t0 => ['pluck', t0 + 1.6, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 660, 'LAUGH #1 OF 2026', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'heh.', pop01(t, P.t0 + 1.2 * 1.29, 0.25, 2.4), { size: 90, col: CREAM, tail: 'bl' })
      sparkles(x, t, 790, 900, P.t0 + 1.3 * 1.29, 7, 190, 0.4)
      if (lt > 1.4) hearts(x, t, 790, 1100, P.t0 + 1.4 * 1.29, { n: 4, life: 1.5, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Tell them a secret. | They *lose the key.*', mood: lt => lt > 1.5 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LOCK, LOCK_C, 790, 880, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const f = prog(lt, 0.9, 1.8)
      if (f > 0 && f < 1) drawBits(x, KEY, { G: GOLD }, lerp(820, 1100, f), 860 - Math.sin(Math.PI * f) * 320, 14, { rot: f * 8 })
      label(x, 790, 1130, 'SECRET: SAFE', pop01(t, P.t0 + 1.6 * 1.29, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0151', key: 'C', accent: PURPLE, solo: S, ending: 'group',
  title: 'How to spot | *a Scorpio.*',
  cameos: CAMEOS,
  group: { cap: 'Spotted. | *They saw you first.*', mood: 'wink' },

})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
