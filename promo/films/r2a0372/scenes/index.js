// r2a0372: star_advice, ADVICE SOLO (virgo), "Virgo, protect | *your peace.*" (signs3kit social cut, music: lofi · F). Ending: group.
//   nine Virgo truths, each with a warm reframe and one gag: not every mess is yours to fix · "no" is a full sentence
//   · the group chat can go on mute · good enough is enough (the crooked frame) · leave the dishes, just tonight
//   · your match can wait, breathe first · your to-do list can nap too · nobody needs a perfect you
//   · hot tea, soft socks, phone face down. Group beat: "Your peace | is *not group work.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#7dd8a8', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

/** a pixel phone with a header bar and rows: [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, down = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.18, k * 1.18)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a note card: lines = [[text, size, colour?, struck?], …] */
function note(x, cx, cy, k, lines, { bg = CREAM, bar = MINT, rot = -0.04, w = 320, h = 260 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 14, w - 4, h - 8)
  x.fillStyle = INK; x.fillRect(-w / 2, -h / 2, w, h); x.fillStyle = bg; x.fillRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16)
  x.fillStyle = bar; x.fillRect(-w / 2 + 8, -h / 2 + 8, w - 16, 16)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([s, sz, col], i) => { x.font = `${sz > 30 ? 800 : 700} ${sz}px ${sz > 30 ? INTER : MONO}`; x.fillStyle = col || INK; x.fillText(s, -w / 2 + 30, -h / 2 + 64 + i * 50) })
  x.restore()
}
/** a picture frame on the wall, tilted by rot */
function frame(x, t, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy - 150); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-5, -10, 10, 14)
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-90 * Math.cos(rot), 60 + 90 * Math.sin(rot)); x.moveTo(0, 0); x.lineTo(90 * Math.cos(rot), 60 - 90 * Math.sin(rot)); x.stroke()
  x.translate(0, 150); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = GOLD; x.fillRect(-142, -102, 284, 204)
  x.fillStyle = SKYB; x.fillRect(-120, -80, 240, 160); x.fillStyle = '#5fd068'; x.fillRect(-120, 20, 240, 60)
  x.fillStyle = '#ffd23a'; x.fillRect(60, -64, 34, 34)
  x.restore()
}
const PLATES = ['.WWWWWWWWW.', 'KKKKKKKKKKK', '.WWWWWWWWW.', 'KKKKKKKKKKK', '.WWWWWWWWW.', 'KKKKKKKKKKK', '.WWWWWWWWW.', 'KKKKKKKKKKK', '..WWWWWWW..']
const MUG = ['.S..S....', '..S..S...', '.S..S....', 'KKKKKKK..', 'KMMMMMKKK', 'KMWMMMK.K', 'KMMMMMK.K', 'KMMMMMKKK', 'KMMMMMK..', '.KKKKK...']
const SOCKS = ['PPP..PPP.', 'PWP..PWP.', 'PPP..PPP.', 'PWP..PWP.', 'PPPP.PPPP', 'PPPP.PPPP']
const BROOM = ['....K', '...K.', '..K..', '.K...', 'YYY..', 'YYYY.', 'YYYYY', '.YYYY']
const MIRROR = ['..KKKKKKK..', '.KSSSSSSSK.', 'KSSWSSSSSSK', 'KSWSSSSSSSK', 'KSSSSSSSSSK', 'KSSSSSSSSSK', 'KSSSSSSSSSK', 'KSSSSSSSSSK', 'KSSSSSSSSSK', '.KSSSSSSSK.', '..KKKKKKK..', '....KKK....', '..KKKKKKK..']

const S = 'virgo', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Not every mess | is *yours to fix.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 5; i++) drawBits(x, SOCKS, { P: [PINK, SKYB, GOLD, LAV, MINT][i], W: CREAM }, 700 + i * 50, 1010 - (i % 2) * 40, 10 * k, { rot: -0.4 + i * 0.3 })
      L(x, 800, 860, 'NOT YOURS', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, -0.05, 40)
      const drop = ease.inCubic(prog(lt, 1.2, 1.6))
      drawBits(x, BROOM, { K: '#8a4a2e', Y: '#ffe7a8' }, 560 + drop * 30, lerp(760, 1080, drop), 18, { rot: lerp(0, 1.2, drop) })
      L(x, 800, 1140, 'BROOM: DOWN', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: '“No” is | a *full sentence.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'no.', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 130, col: CREAM, tail: 'bl' })
      L(x, 790, 980, 'EXPLANATION:', pop01(t, P.t0 + 1.0, 0.3, 2), BONE, 0.04, 28)
      L(x, 790, 1060, 'OPTIONAL', pop01(t, P.t0 + 1.3, 0.3, 2.4), ACC, -0.04, 40)
    } },
  { sign: S, cap: 'The group chat | can *go on mute.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const muted = lt > 1.2
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: muted ? 'MUTED ♡' : 'GROUP (99+)', headCol: muted ? ACC : RED, lines: muted ? [] : [
        ['who’s bringing', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['the plates??', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)],
        ['VIRGO??', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
      ] })
      if (muted) { const k = pop01(t, P.t0 + 1.2, 0.3, 2.4); x.save(); x.globalAlpha = clamp(k); x.fillStyle = BONE; x.font = `800 90px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('shh', 790, 880); x.restore() }
    } },
  { sign: S, cap: 'Good enough | *is enough.*', mood: lt => lt < 1.3 ? 'squint' : 'happy', look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      frame(x, t, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 0.12)
      L(x, 790, 1050, lt > 1.3 ? 'CROOKED. CUTE.' : 'CROOKED…', pop01(t, P.t0 + (lt > 1.3 ? 1.3 : 0.5), 0.3, 2.4), lt > 1.3 ? ACC : BONE, -0.04, 34)
    } },
  { sign: S, cap: 'The dishes can wait. | *Just for tonight.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLATES, { W: CREAM, K: '#9aa5c4' }, 790, 930, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 720, 'TOMORROW’S JOB', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, 0.05, 32)
    } },
  { sign: S, cap: 'Your match can wait. | *Breathe first.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH', headCol: PINK, lines: [
        ['hey :)', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['draft 14…', '#9aa5c4', pop01(t, P.t0 + 0.8, 0.25, 2.2), true],
        ['breathe ♡', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Your to-do list | *can nap too.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), [['TO DO', 40], ['1. everything', 24], ['2. again', 24], ['3. perfectly', 24]], { bar: RED })
      if (lt > 1.0) {
        x.save(); x.fillStyle = BONE; x.font = `800 46px ${INTER}`; x.textAlign = 'center'
        for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; x.globalAlpha = Math.sin(Math.PI * ph); x.fillText('z', 900 + i * 30, 700 - ph * 120) }
        x.restore()
      }
      L(x, 790, 1080, 'LIST: RESTING', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 30)
    } },
  { sign: S, cap: 'Nobody needs | a *perfect you.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MIRROR, { K: INK, S: '#b9dfff', W: '#fff' }, 790, 850, 24 * k)
      if (k > 0.6) signChar(x, t, 'virgo', 790, 820, 140, { mood: lt > 1.3 ? 'heart' : 'happy', seed: 41, glyph: false, glow: 0.4, alpha: 0.85 })
      L(x, 790, 1120, 'AS IS ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 40)
    } },
  { sign: S, cap: 'Hot tea. Soft socks. | *Phone face down.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, { K: INK, M: ACC, W: CREAM, S: 'rgba(255,255,255,0.6)' }, 720, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SOCKS, { P: PINK, W: CREAM }, 880, 900, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 1080); x.scale(k, k); x.fillStyle = INK; x.fillRect(-120, -30, 240, 60); x.fillStyle = '#6b62a8'; x.fillRect(-112, -22, 224, 44); x.restore() }
      L(x, 800, 700, 'PEACE: ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0372', key: 'F', accent: ACC, solo: 'virgo', ending: 'group',
  title: 'Virgo, protect | *your peace.*',
  cameos: CAMEOS,
  group: { cap: 'Your peace | is *not group work.*', mood: 'heart' },

})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
