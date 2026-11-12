// r2t0522: star_talk, ROLL CALL, "The signs as | *tour guides.*" (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme tour guide. Ending: callback.
//   0.0–3.6    "The signs as | *tour guides.*"
//   3.6–49.2   ♈ ran the tour, literally · ♉ every stop is a bakery · ♊ gave two tours at once · ♋ packed everyone a lunch
//              · ♌ first stop: Leo's birthplace · ♍ fact-checked the museum · ♎ paired everyone up by compatibility
//              · ♏ skipped the landmarks, showed the secret tunnel · ♐ lost the group, kept going · ♑ upsold the tour,
//              everyone went VIP · ♒ a tour of their favourite rocks · ♓ cried at every statue
//  49.2        "Twelve guides. | *Zero refunds.*"
//  52.6        CALLBACK: "Sagittarius? | *Sent a postcard.*"  the lost guide's postcard lands.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const SL = { x: -160 }, SR = { x: 150 }

function txt(x, s, px, py, size, col = INK, align = 'center', font = INTER, w = 800) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function sheet(x, cx, cy, w, h, k, rot, fn, bg = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
// the guide's flag on a stick
const FLAG = ['KFFFFFF', 'KFFFFFF', 'KFFFFFF', 'K......', 'K......', 'K......', 'K......', 'K......', 'K......']
const flag = (x, cx, cy, col, cell = 14, rot = 0) => drawBits(x, FLAG, { K: BROWN, F: col }, cx, cy, cell, { rot })
const CROISSANT = ['....OOOO....', '..OOYOOYOO..', '.OOYOOOOYOO.', 'OOYOO..OOYOO', 'OO........OO']
const LUNCH = ['....KKKK....', '...K....K...', 'RRRRRRRRRRRR', 'RWWWWWWWWWWR', 'RWWWWWWWWWWR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR']
const DOOR = ['..KKKKKK..', '.KDDDDDDK.', 'KDDDDDDDDK', 'KDDDDDDDDK', 'KDDDDDDYDK', 'KDDDDDDDDK', 'KDDDDDDDDK', 'KDDDDDDDDK', 'KKKKKKKKKK']
const ROCK = ['...GGGG...', '.GGGgGGGG.', 'GGgGGGGgGG', 'GGGGGGGGGG', '.GGGGgGGG.']
const TISSUE = ['...WWW...', '..WWWWW..', 'BBBBBBBBB', 'BPPPPPPPB', 'BPBBBBBPB', 'BPPPPPPPB', 'BBBBBBBBB']
function compass(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, 7); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 100, 0, 7); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 86, 0, 7); x.fill()
  txt(x, 'N', 0, -62, 28, INK); txt(x, '?', 62, 2, 28, INK); txt(x, '?', -62, 2, 28, INK); txt(x, '?', 0, 64, 28, INK)
  x.rotate(t * 9)
  x.fillStyle = RED; x.beginPath(); x.moveTo(0, -60); x.lineTo(14, 0); x.lineTo(-14, 0); x.fill()
  x.fillStyle = GREY; x.beginPath(); x.moveTo(0, 60); x.lineTo(14, 0); x.lineTo(-14, 0); x.fill()
  x.restore()
}
function postcard(x, t, cx, cy, k, rot = -0.06) {
  sheet(x, cx, cy, 420, 280, k, rot, () => {
    x.fillStyle = SKYB; x.fillRect(-196, -126, 200, 252)
    x.fillStyle = '#5fd068'; x.fillRect(-196, 60, 200, 66)
    x.fillStyle = GOLD; x.beginPath(); x.arc(-140, -70, 30, 0, 7); x.fill()
    signChar(x, t, 'sagittarius', -96, 30, 120, { mood: 'sparkle', seed: 55, glyph: false, glow: 0.4 })
    x.fillStyle = '#c8b89a'; x.fillRect(20, -110, 4, 230)
    txt(x, 'wish you', 112, -50, 28, INK); txt(x, 'were here!', 112, -10, 28, INK)
    txt(x, '— ♐︎', 112, 50, 26, '#4a4470', 'center', MONO, 700)
    x.fillStyle = RED; x.fillRect(150, -118, 40, 46)
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ran the tour. | *Literally ran.*', mood: 'sparkle', star: SL, hops: [0.4, 0.8, 1.2, 1.6],
    back(x, t, lt, P, F) {
      x.save(); x.globalAlpha = 0.6 * clamp(lt / 0.4); x.fillStyle = BONE
      for (let i = 0; i < 4; i++) x.fillRect(F.x - 330 + ((t * 900 + i * 90) % 140), F.cy - 80 + i * 50, 120, 10)
      x.restore()
      flag(x, F.x + 120, F.cy - 110, '#ff6b5a', 13, 0.2)
    },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'keep up!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 790, 960, 'TOUR TIME: 4 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.05, 32)
    } },
  { sign: 'taurus', cap: 'Every stop | is *a bakery.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: SL,
    front(x, t, lt, P) {
      drawBits(x, CROISSANT, { O: ORANGE, Y: '#ffd98a' }, 790, 900, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 680, 'STOP 7: BAKERY', pop01(t, P.t0 + 0.7, 0.3, 2.4), '#5fd068', -0.04, 32)
      L(x, 790, 1080, 'STOP 8: BAKERY', pop01(t, P.t0 + 1.5, 0.3, 2.4), '#5fd068', 0.05, 32)
    } },
  { sign: 'gemini', cap: 'Gave two tours. | *At the same time.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: 0, y: 40 },
    front(x, t, lt, P, F) {
      flag(x, F.x - 170, F.cy - 120, '#ffd23a', 12, -0.25); flag(x, F.x + 170, F.cy - 120, '#8fe3ff', 12, 0.25)
      bubble(x, 330, 640, 'on your left—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'br' })
      bubble(x, 750, 640, 'on your right—', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      L(x, 540, 1120, 'GROUPS: 2 · GUIDE: 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.03, 30)
    } },
  { sign: 'cancer', cap: 'Packed everyone | *a lunch.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: SL,
    front(x, t, lt, P) {
      drawBits(x, LUNCH, { K: INK, R: '#ff6b5a', W: CREAM }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'LUNCHES PACKED: 30', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, 0.04, 30)
      L(x, 790, 660, 'EACH WITH A NOTE', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 30)
      hearts(x, t, 790, 820, P.t0 + 1.4, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'First stop: | *Leo’s birthplace.*', mood: 'sparkle', star: { x: -160, y: -40 }, hops: [1.3],
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(F.x, 1045); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-140, -50, 280, 120); x.fillStyle = '#c9c9d8'; x.fillRect(-130, -40, 260, 100)
      x.fillStyle = '#a9a9bd'; x.fillRect(-130, 30, 260, 30)
      x.restore()
    },
    front(x, t, lt, P) {
      sheet(x, 790, 820, 300, 180, pop01(t, P.t0 + 0.6, 0.3, 2), 0.04, () => {
        txt(x, 'A LEGEND', 0, -40, 34, INK); txt(x, 'WAS BORN', 0, 4, 34, INK); txt(x, 'HERE ♌︎', 0, 48, 34, '#c98f2a')
      }, GOLD)
      bubble(x, 790, 1060, 'any questions | about me?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      sparkles(x, t, 380, 840, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Fact-checked | *the museum.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      sheet(x, 790, 840, 320, 230, pop01(t, P.t0 + 0.2, 0.3, 2), -0.03, () => {
        txt(x, 'BUILT IN', 0, -60, 34, INK); txt(x, '1642', 0, 6, 64, INK, 'center', MONO, 700)
        const g = clamp((lt - 0.7) / 0.4)
        if (g > 0) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(-80, 6); x.lineTo(-80 + 160 * g, 6); x.stroke() }
        if (lt > 1.1) txt(x, '1643.', 60, 72, 40, RED, 'center', MONO, 700)
      }, '#d8dbe8')
      L(x, 790, 1090, 'CORRECTED (KINDLY)', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Paired everyone up. | *By compatibility.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: SL,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const pairs = [['aries', 'leo'], ['taurus', 'virgo'], ['cancer', 'pisces']]
      pairs.forEach(([a, b], i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2), y = 690 + i * 165
        if (k <= 0.01) return
        signChar(x, t, a, 720, y, 120 * k, { mood: 'happy', seed: 60 + i, glyph: false, tears: a === 'pisces' || b === 'pisces' ? 0 : 0 })
        signChar(x, t, b, 860, y, 120 * k, { mood: 'heart', seed: 70 + i, glyph: false, tears: b === 'pisces' ? 1 : 0 })
      })
      L(x, 790, 1170, 'TOUR BUDDIES: MATCHED', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.03, 28)
    } },
  { sign: 'scorpio', cap: 'Skipped the landmarks. | Showed *the secret tunnel.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), open = lt > 0.9
      drawBits(x, DOOR, { K: INK, D: open ? '#ffe7a8' : '#4a4470', Y: GOLD }, 790, 880, 28 * k)
      L(x, 790, 640, 'NOT ON THE MAP', pop01(t, P.t0 + 0.9, 0.3, 2.4), LAV, 0.04, 30)
      bubble(x, 790, 1120, 'tell no one.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Lost the group. | *Kept going.*', mood: 'sparkle', star: SR, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      compass(x, t, 330, 800, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 330, 1000, 'GROUP: MISSING', pop01(t, P.t0 + 0.9, 0.3, 2.4), RED, -0.05, 30, CREAM)
      bubble(x, 330, 1130, 'see you | in spring!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Upsold the tour. | *Everyone went VIP.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [-1, 0], star: SR,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 330, 820, 260, 300, k, -0.06, () => {
        x.fillStyle = INK; x.beginPath(); x.arc(0, -110, 16, 0, 7); x.fill()
        txt(x, 'VIP', 0, -30, 72, '#c98f2a'); txt(x, 'TOUR', 0, 36, 40, INK)
        txt(x, `SOLD: ${Math.min(12, 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 12))}/12`, 0, 100, 26, '#4a4470', 'center', MONO, 700)
      }, GOLD)
      L(x, 330, 1080, 'BASIC TOUR: GONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'A whole tour | of *their favourite rocks.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', look: [1, 0], star: SL,
    front(x, t, lt, P) {
      drawBits(x, ROCK, { G: GREY, g: '#6e7896' }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1060, 'ROCK #38 OF 200', pop01(t, P.t0 + 0.8, 0.3, 2.4), SKYB, 0.04, 30)
      bubble(x, 790, 700, 'isn’t she | perfect?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: '*Cried* at | every statue.', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: SL,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: '#ffffff', B: SKYB, P: '#b7a6ff' }, 790, 960, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 700, 'STOP 3: SOBBING', pop01(t, P.t0 + 0.8, 0.3, 2.4), SKYB, -0.04, 32)
      bubble(x, 790, 1120, 'he looks | so lonely!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0522', key: 'E', accent: ACC, ending: 'callback',
  title: 'The signs as | *tour guides.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve guides. | *Zero refunds.*' },
  last: {
    text: 'Sagittarius? | *Sent a postcard.*',
    draw(x, t, lt) {
      const t0 = t - lt, d = ease.outCubic(prog(lt, 0.3, 1.0))
      if (lt < 0.3) return
      postcard(x, t, 540, lerp(1700, 1060, d), 1.5, lerp(0.3, -0.06, d))
      sparkles(x, t, 540, 1080, t0 + 1.0, 8, 260, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
