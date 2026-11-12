// r2t0170: THE SIGNS AS… v3, BELIKE, "Trying to be chill | be like." (~59 s vertical, signs3kit social cut,
// music: lofi · F). Topic: "Zodiacs trying to be chill be like."
//   0.0–3.6    "Trying to be chill | *be like.*"
//   3.6–49.2   ♈ said "no rush", already in the car · ♉ said "I'm flexible", brought their own pillow · ♊ acted
//              unbothered by the match, typed for an hour · ♋ said "I'm fine!", baked a cake about it · ♌ blended in on
//              a first date, in gold sequins · ♍ said "messy is fine", twitched · ♎ said "you pick", vetoed all twelve
//              · ♏ said "whatever", filed it forever · ♐ said "let's relax", planned a dawn hike · ♑ took a day off,
//              checked email thirty times · ♒ played it cool, too cool, froze · ♓ pretended not to care, cried in the car
//  49.2        "Twelve tries. | *Zero chill.*"
//  52.4        LESSON: "You don’t have to be chill. | Just be *you.*"  CHILL: OPTIONAL
//  58.3        "Caring a lot | *is cool, actually.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, sun, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#8fe3ff'
const ST = { x: -170 }
const CAR = ['...RRRRR....', '..RWWRWWR...', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', '.KK.....KK..']
const PILLOW = ['.WWWWWWWWW.', 'WWWWWWWWWWW', 'WWWLWWWLWWW', 'WWWWWWWWWWW', '.WWWWWWWWW.']
const CAKE = ['....R....', '...WWW...', '.PPPPPPP.', 'WWWWWWWWW', 'PPPPPPPPP', 'BBBBBBBBB', 'BBBBBBBBB']
const SOCK = ['.KK.', 'KWWK', 'KWWK', 'KWWK', 'KWWKK', 'KWWWWK', '.KKKK.']
const FOLDER = ['KKKK......', 'KYYYKKKKKK', 'KYYYYYYYYK', 'KYYYYYYYYK', 'KYYYYYYYYK', 'KYYYYYYYYK', 'KKKKKKKKKK']
const MOUNTAIN = ['......W......', '.....WWW.....', '....GGGGG....', '...GGGGGGG...', '..GGGGGGGGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG']

const CAMEOS = [
  { sign: 'aries', cap: 'Said “no rush.” | *Already in the car.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'no rush!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      const d = ease.outCubic(prog(lt, 0.9, 1.4))
      drawBits(x, CAR, { R: '#ff6b5a', W: SKYB, K: INK }, lerp(1000, 800, d), 960, 22, { alpha: clamp(d * 3) })
      label(x, 800, 1110, 'ENGINE: ON', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Said “I’m flexible.” | *Brought their own pillow.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { W: CREAM, L: LAV }, 800, 900, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 800, 1080, 'ALSO: OWN BLANKET', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 700, 'totally easy', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Unbothered by the match. | *Typed for an hour.*', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH', headCol: PINK, size: 30, w: 300, h: 440, lines: [
        ['hey :)', MINT, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        [['typing.', 'typing..', 'typing...'][Math.floor(t * 3) % 3], GOLD, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
      ] })
      const m = Math.floor(lerp(1, 60, prog(lt, 0.8, 2.2)))
      label(x, 800, 1120, `DRAFTING: ${m} MIN`, pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Said “I’m fine!” | *Baked a cake about it.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'i’m FINE!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl', col: PINK })
      drawBits(x, CAKE, { R: RED, W: CREAM, P: PINK, B: '#c4782e' }, 800, 960, 26 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      label(x, 800, 1130, 'FEELINGS: FROSTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'First date: blending in. | *Gold sequins.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    back(x, t, lt, P, F) {
      if (lt < 0.5) return
      x.save(); x.globalAlpha = clamp((lt - 0.5) * 2)
      for (let i = 0; i < 26; i++) { const a = i * 2.39, r = 40 + (i * 37) % 150; x.fillStyle = (Math.sin(t * 8 + i) > 0) ? '#fff1b0' : GOLD; x.fillRect(F.x + Math.cos(a) * r - 6, F.cy + Math.sin(a) * r * 0.8 - 6, 12, 12) }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 800, 760, 'LOW-KEY MODE', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: GREY, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1000, 'VISIBLE FROM SPACE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Said “messy is fine.” | *Eye twitch: constant.*', mood: 'squint', squash: lt => lt > 0.8 && Math.sin(lt * 30) > 0.7 ? 0.06 : 0, look: [1, 1], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, SOCK, { K: INK, W: [PINK, MINT, SKYB, GOLD][i] }, 700 + i * 70, 1050 - (i % 2) * 30, 12 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.25, 2), { rot: i * 0.7 - 1 })
      bubble(x, 800, 720, 'it’s fine. | it’s FINE.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Said “you pick.” | *Vetoed all twelve.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(prog(lt, 0.4, 1.9) * 4))
      card(x, 800, 880, 300, 330, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        ;['TACOS', 'SUSHI', 'PIZZA', 'SOUP'].forEach((s, i) => {
          txt(x, s, 0, -110 + i * 72, { size: 34, font: MONO, weight: 700 })
          if (i < n) { x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.moveTo(-90, -110 + i * 72); x.lineTo(90, -110 + i * 72); x.stroke() }
        })
      })
      label(x, 800, 660, 'YOU PICK!', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Said “whatever.” | *Filed it forever.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'whatever.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
      const d = ease.inOutCubic(prog(lt, 0.9, 1.5))
      drawBits(x, FOLDER, { K: INK, Y: GOLD }, 800, 960, 22 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 800, 1110, 'FILED: FOREVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Said “let’s just relax.” | *Planned a dawn hike.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      sun(x, t, 860, 820, 40, k)
      drawBits(x, MOUNTAIN, { G: '#7d86a8', W: CREAM }, 780, 960, 22 * k)
      label(x, 800, 1120, 'ALARM: 4:30 AM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Took a day off. | *Checked email 30 times.*', mood: lt => lt > 1.3 ? 'wide' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(lerp(1, 30, prog(lt, 0.5, 2.2)))
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'INBOX', headCol: MINT, size: 30, w: 300, h: 440, lines: [[`checked: ${n}×`, GOLD, 1], ['new: 0', BONE, 1]] })
      label(x, 800, 1120, 'DAY OFF: ON PAPER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GREY, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Played it cool. | Too cool. *Froze.*', mood: lt => lt > 1.2 ? 'wide' : 'wink', look: [1, 0], star: { x: -60 },
    front(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.8, 1.3))
      if (k > 0) {
        x.save(); x.globalAlpha = 0.55 * k; x.fillStyle = '#cfefff'; x.fillRect(F.x - 190, F.cy - 190, 380, 360)
        x.globalAlpha = 0.9 * k; x.strokeStyle = '#ffffff'; x.lineWidth = 8; x.strokeRect(F.x - 190, F.cy - 190, 380, 360)
        x.fillStyle = '#ffffff'; x.fillRect(F.x - 160, F.cy - 160, 18, 120); x.restore()
      }
      label(x, 760, 1130, 'COOL: −40°', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Pretended not to care. | *Cried in the car.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: { x: -170, y: -20 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAR, { R: '#b7a6ff', W: SKYB, K: INK }, 380, 1080, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 760, 'i’m so chill. | (sob)', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl', col: SKYB })
    } },
]

const F = makeFilm({
  id: 'r2t0170', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Trying to be chill | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve tries. | *Zero chill.*' },
  lesson: { text: 'You don’t have to be chill. | Just be *you.*', chip: 'CHILL: OPTIONAL' },
  last: { text: 'Caring a lot | *is cool, actually.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
