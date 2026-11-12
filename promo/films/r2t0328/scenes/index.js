// r2t0328: star_talk, ROLL CALL, "The signs | playing charades." (signs3kit social cut, music: lofi · G). Ending: group.
//   ♈ shouted the answer to their own clue · ♉ every clue is "lunch" · ♊ clue "first date": played both people
//   · ♋ got "a hug", hugged everyone · ♌ one-minute clue, forty-minute show · ♍ disqualified everyone for mouthing it
//   · ♎ let the other team win, to be nice · ♏ guessed your sign from one gesture · ♐ acted out "travel", left
//   · ♑ a spreadsheet of everyone's scores · ♒ clue "cat", acted out time itself · ♓ "sad movie": got too into it
//  49.2   GROUP ending: "Final score: | *nobody knows.*"  a scoreboard reading ?? – ?? over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', TEAL = '#2fc79a', ORANGE = '#ffb34a', GREY = '#c9c9d8', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
/** a charades clue card */
function clue(x, cx, cy, k, text, { rot = 0.06, col = CREAM } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-124, -74, 260, 160)
  x.fillStyle = INK; x.fillRect(-134, -86, 268, 172); x.fillStyle = col; x.fillRect(-126, -78, 252, 156)
  x.fillStyle = '#9aa5c4'; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CLUE', 0, -50)
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; text.split('|').forEach((s, i, a) => x.fillText(s.trim(), 0, 10 + (i - (a.length - 1) / 2) * 42))
  x.restore()
}
const SAND = ['BBBBBBBB', '.YYYYYY.', '..YYYY..', '...YY...', '...YY...', '..Y..Y..', '.Y....Y.', 'BBBBBBBB']
const BURGER = ['..BBBBB..', '.BBWBBWB.', 'GGGGGGGGG', 'MMMMMMMMM', '.BBBBBBB.']
const WHISTLE = ['......KK', '.SSSSSKK', 'SSSSSSS.', 'SSWSSSS.', 'SSSSSS..', '.SSSS...']
const DOOR = ['KKKKKKKK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBYBK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBBK', 'KBBBBBBK']
const CASE = ['...KK...', '..K..K..', 'OOOOOOOO', 'OOWOOOOO', 'OOOOOOOO', 'OOOOOOOO']

const CAMEOS = [
  { sign: 'aries', cap: 'Shouted the answer | to *their own clue.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [0.5, 1.0, 1.4],
    front(x, t, lt, P) {
      clue(x, 800, 700, pop01(t, P.t0 + 0.15, 0.3, 2), 'a volcano')
      bubble(x, 790, 920, 'VOLCANO! | I WIN!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: ORANGE, tail: 'bl' })
      L(x, 790, 1150, 'POINTS: DISPUTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Every single clue | is *“lunch.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      clue(x, 800, 700, pop01(t, P.t0 + 0.15, 0.3, 2), 'a castle')
      drawBits(x, BURGER, { B: '#e8a24a', W: CREAM, G: '#5fd068', M: '#8a4a2e' }, F.x + 120, F.cy + 50, 16 * pop01(t, P.t0 + 0.6, 0.3, 2.2), { rot: 0.1 * Math.sin(t * 8) })
      bubble(x, 800, 960, 'lunch?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 1150, 'IT WAS A CASTLE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Clue: “first date.” | Played *both people.*', mood: 'heart', look: [1, 0], star: { x: -170, s: 260 }, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 760, 900, 230 * k, { mood: 'heart', look: [-1, 0], seed: 31, hops: [P.t0 + 1.2] })
      L(x, 370, 640, 'ME', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.06, 38)
      L(x, 760, 640, 'ALSO ME', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, 0.06, 38)
      hearts(x, t, 560, 860, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'cancer', cap: 'Got “a hug.” | Hugged *everyone.*', mood: 'heart', look: [1, 0], star: { x: -120 }, hops: [1.0],
    front(x, t, lt, P) {
      const ids = ['aries', 'leo', 'virgo']
      ids.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.4 + i * 0.25, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 680 + i * 110, 980 - (i % 2) * 40, 150 * k, { mood: 'happy', look: [-1, 0], seed: 40 + i, glyph: false })
      })
      hearts(x, t, 620, 820, P.t0 + 1.1, { n: 7, life: 1.8, spread: 380, cell: 8, seed: 7 })
      L(x, 760, 660, 'HUGS: 12/12', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, 0.04, 34)
    } },
  { sign: 'leo', cap: 'One-minute clue. | *Forty-minute show.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1c8'
      x.beginPath(); x.moveTo(330, 470); x.lineTo(410, 470); x.lineTo(560, 1180); x.lineTo(180, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, SAND, { B: BROWN, Y: GOLD }, 800, 760, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: lt > 1.2 ? Math.PI : 0 })
      L(x, 800, 960, `MINUTE ${Math.min(40, 1 + Math.floor(lt * 18))}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), ORANGE, 0.04, 40)
      bubble(x, 800, 1110, 'and for act two…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Disqualified everyone. | *For mouthing it.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, WHISTLE, { K: INK, S: '#c9c9d8', W: '#ffffff' }, F.x + 140, F.cy + 30, 14 * pop01(t, P.t0 + 0.3, 0.3, 2.2), { rot: -0.2 })
      L(x, 800, 700, 'FOUL!', pop01(t, P.t0 + 0.7, 0.3, 2.4), RED, 0.06, 56)
      L(x, 800, 1080, 'RULE 14, SECTION B', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#a8d86a', -0.04, 30)
    } },
  { sign: 'libra', cap: 'Let the other team | *win. To be nice.*', mood: lt => lt > 1.3 ? 'happy' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-180, -110, 360, 220); x.fillStyle = '#140c30'; x.fillRect(-170, -100, 340, 200)
        x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = PINK; x.fillText('US', -85, -66); x.fillStyle = SKYB; x.fillText('THEM', 85, -66)
        x.font = `700 72px ${MONO}`; x.fillStyle = BONE; x.fillText('2', -85, 20); x.fillText(String(2 + Math.min(7, Math.floor(lt * 4))), 85, 20)
        x.restore()
      }
      bubble(x, 800, 1060, 'good game!! ♡', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Guessed your sign | from *one gesture.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 800, 820, 170 * k, { mood: lt > 1.0 ? 'wide' : 'happy', look: [-1, 0], seed: 51, glyph: false, hops: [P.t0 + 0.4] })
      bubble(x, 800, 640, 'Leo. obviously.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 800, 1060, 'ANSWER WAS “HAT”', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Acted out “travel.” | *Actually left.*', mood: 'sparkle', look: [1, 0], star: { x: -150, s: 280 }, hops: [0.4, 0.8],
    back(x, t, lt, P) { drawBits(x, DOOR, { K: INK, B: BROWN, Y: GOLD }, 830, 860, 34 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, CASE, { K: INK, O: ORANGE, W: CREAM }, 380, 1080, 26 * pop01(t, P.t0 + 0.4, 0.3, 2.2))
      L(x, 830, 620, 'BACK IN 2 WEEKS', pop01(t, P.t0 + 1.2, 0.3, 2.4), ORANGE, 0.05, 30)
    } },
  { sign: 'capricorn', cap: 'Made a spreadsheet | of *everyone’s scores.*', mood: 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(300, 840); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -200, 340, 400); x.fillStyle = CREAM; x.fillRect(-162, -192, 324, 384)
        x.fillStyle = TEAL; x.fillRect(-162, -192, 324, 50)
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Q3 CHARADES', 0, -167)
        for (let r = 0; r < 6; r++) for (let c = 0; c < 3; c++) { x.fillStyle = (r + c) % 2 ? '#d8ecc0' : '#ffffff'; if (lt > 0.3 + r * 0.12) x.fillRect(-150 + c * 102, -130 + r * 52, 96, 46) }
        x.restore()
      }
      L(x, 300, 1110, 'PIVOT TABLE: ADDED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Clue: “cat.” | Acted out *time itself.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      clue(x, 800, 680, pop01(t, P.t0 + 0.15, 0.3, 2), 'a cat')
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 930); x.scale(k, k * (1 + 0.15 * Math.sin(t * 3)))
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 110, 90, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 0, 100, 80, 0, 0, Math.PI * 2); x.fill()
        x.save(); x.rotate(t * 4); x.fillStyle = INK; x.fillRect(-5, -70, 10, 70); x.restore()
        x.fillStyle = INK; x.beginPath(); x.moveTo(-60, 70); x.quadraticCurveTo(-50, 150, -30, 170); x.lineTo(-10, 80); x.fill()
        x.restore()
      }
      L(x, 800, 1140, 'EVERYONE: ??', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Acted out “sad movie.” | Got *too into it.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clue(x, 800, 690, pop01(t, P.t0 + 0.15, 0.3, 2), 'a sad movie', { col: '#e6dcff' })
      L(x, 800, 920, 'GUESSED IN 1 SEC', pop01(t, P.t0 + 0.9, 0.3, 2.4), MINT, -0.04, 32)
      bubble(x, 800, 1080, 'we’re all crying', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0328', key: 'G', accent: '#7dffb0', ending: 'group',
  title: 'The signs | *playing charades.*',
  cameos: CAMEOS,
  group: {
    cap: 'Final score: | *nobody knows.*',
    moods: ['wide', 'happy', 'heart', 'heart', 'sparkle', 'squint', 'happy', 'wink', 'sparkle', 'neutral', 'squint', 'wide'],
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.4, 0.4, 2.2)
      if (k <= 0.01) return
      x.save(); x.translate(540, 720); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-230, -90, 460, 180); x.fillStyle = '#140c30'; x.fillRect(-220, -80, 440, 160)
      x.fillStyle = GOLD; x.font = `700 84px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?? – ??', 0, 6)
      x.restore()
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
