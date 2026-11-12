// r2t0232: star_talk, BELIKE, "Zodiacs blushing | be like." (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, each one's most extreme reaction to being embarrassed.
//   0.0–3.6    "Zodiacs blushing | *be like.*"
//   3.6–49.2   ♈ tripped, turned it into a race · ♉ caught snacking, kept chewing · ♊ sent the screenshot to the match
//              · ♋ said "love you" to the boss · ♌ tripped on stage, called it choreography · ♍ typo in their bio, three
//              sleepless nights · ♎ waved back, wasn't them, fixed hair instead · ♏ embarrassed in 2009, still thinks about it
//              · ♐ said the wrong name, laughed for an hour · ♑ pushed a pull door, filed a complaint · ♒ wore slippers to work,
//              started a trend · ♓ remembered year five at 3 a.m.
//  49.2        "Twelve signs. | *Zero dignity.*"
//  52.4        LESSON UNLOCKED: "Everyone trips. | *Laugh first.*"  STATUS: UNBOTHERED
//  58.3        "Pisces? | *Still on year five.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, phone, clock, pill, CREAM, RED, ORANGE, BROWN, GREY, DEEP, GREEN } from './props.js'

const ACC = '#ff9a8a'
const ST = { x: -170 }
const M = { font: MONO, weight: 700 }

const FLAG = ['KWKWKW', 'WKWKWK', 'KWKWKW', 'WKWKWK']
const SNACK = ['..YYYY..', '.YOYYOY.', 'YYYYYYYY', 'YYOYYYOY', '.YYYYYY.']
const SLIPPER = ['..PPPPP...', '.PWWWWWP..', 'PWWWWWWWPP', 'PPPPPPPPPP']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', '.YY...', '..YYY.']
/** a door with a sign */
function door(x, cx, cy, k, sign, shake = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + shake, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -220, 240, 440); x.fillStyle = '#c98f6a'; x.fillRect(-110, -210, 220, 430)
  x.fillStyle = '#b07a55'; x.fillRect(-90, -190, 180, 160); x.fillRect(-90, 0, 180, 190)
  x.fillStyle = INK; x.fillRect(70, -10, 20, 40); x.fillStyle = GOLD; x.fillRect(74, -6, 12, 32)
  x.fillStyle = INK; x.fillRect(-70, -150, 140, 64); x.fillStyle = CREAM; x.fillRect(-64, -144, 128, 52)
  txt(x, sign, 0, -117, { size: 34, ...M })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Tripped in public. | Made it *a race.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: ST, hops: [0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, W: BONE }, 790, 900, 22 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 780, 660, 'I WIN!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 56, tail: 'bl' })
      label(x, 790, 1080, 'NOBODY ELSE RACED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: 'taurus', cap: 'Caught snacking. | *Kept chewing.*', mood: 'neutral', look: [1, 0], star: ST, squash: lt => 0.05 * Math.sin(lt * 18),
    front(x, t, lt, P) {
      drawBits(x, SNACK, { Y: '#ffd86b', O: '#c98f2a' }, 790, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      bubble(x, 780, 680, 'mm?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 56, tail: 'bl' })
      label(x, 790, 860, 'EYE CONTACT: HELD', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: GREEN, rot: 0.04, ...M })
    } },
  { sign: 'gemini', cap: 'Sent the screenshot | *to the match.*', mood: lt => lt > 1.2 ? 'wide' : 'wink', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const a = s => pop01(t, P.t0 + s, 0.25, 2)
      phone(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '✦ YOUR MATCH', headCol: PINK, lines: [['lol look', MINT, a(0.5)], ['at this one', MINT, a(0.7)], ['…that’s me', CREAM, a(1.4)]], size: 24 })
      label(x, 790, 650, 'DELIVERED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: RED, color: BONE, rot: -0.05, ...M })
    } },
  { sign: 'cancer', cap: 'Said “love you” | *to the boss.*', mood: lt => lt > 1.3 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'love you, bye!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      pill(x, 790, 880, 'CALL: THE BOSS', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: GREY })
      label(x, 790, 1040, 'NEW HOME: SHELL', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, ...M })
    } },
  { sign: 'leo', cap: 'Tripped on stage. | Called it *choreography.*', mood: 'sparkle', star: { x: -150, y: 0 }, hops: [1.0],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.2, 0.5)); if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(350, 490); x.lineTo(430, 490); x.lineTo(590, 1180); x.lineTo(190, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'that was | planned.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 920, 'ENCORE?', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: ORANGE, rot: -0.05, ...M })
      sparkles(x, t, 390, 860, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Typo in their bio. | *Three sleepless nights.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 290, 330, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = '#ef5c94'; x.beginPath(); x.arc(0, -80, 56, 0, Math.PI * 2); x.fill()
        txt(x, 'VIRGO ♍︎', 0, 20, { size: 28, ...M })
        txt(x, 'perfectoinist', 0, 80, { size: 30, weight: 700 })
        if (lt > 0.9) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 80, 120, 32, 0, 0, Math.PI * 2); x.stroke() }
      })
      label(x, 790, 1110, '3:00 A.M. · STILL UP', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.04, ...M })
    } },
  { sign: 'libra', cap: 'Waved back. Wasn’t them. | *Fixed hair instead.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 780, 680, lt > 1.1 ? 'just… my hair' : 'hiii!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 880, 'WAVING AT: NOT YOU', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, ...M })
      sparkles(x, t, 370, 760, P.t0 + 1.5, 6, 120, 0.2)
    } },
  { sign: 'scorpio', cap: 'Embarrassed in 2009. | *Still thinks about it.*', mood: 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { x.save(); x.fillStyle = INK; for (const [cx, cy, r] of [[560, 760, 14], [610, 710, 22]]) { x.beginPath(); x.arc(cx, cy, r * k + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = LAV; x.beginPath(); x.arc(cx, cy, r * k, 0, Math.PI * 2); x.fill(); x.fillStyle = INK } x.restore() }
      card(x, 800, 640, 290, 180, k, { bg: LAV, rot: -0.03 }, () => { txt(x, 'THE INCIDENT', 0, -36, { size: 28, ...M }); txt(x, '2009', 0, 26, { size: 56 }) })
      label(x, 790, 960, 'REPLAYS: ALL OF THEM', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 26, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: 'sagittarius', cap: 'Said the wrong name. | *Laughed for an hour.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: { x: 160 }, hops: [1.1, 1.5, 1.9],
    front(x, t, lt, P) {
      bubble(x, 330, 680, 'hey, Steve!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'br' })
      label(x, 330, 880, 'NOT STEVE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: RED, color: BONE, rot: -0.05, ...M })
      if (lt > 1.2) bubble(x, 330, 1050, 'HAHAHA', pop01(t, P.t0 + 1.3, 0.25, 2.2) * (1 + 0.05 * Math.sin(t * 20)), { size: 40, col: GOLD, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Pushed a pull door. | *Filed a complaint.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      door(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), 'PULL', lt > 0.6 && lt < 1.0 ? 6 * Math.sin(lt * 60) : 0)
      label(x, 780, 1130, 'COMPLAINT #1 FILED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: 'aquarius', cap: 'Wore slippers to work. | *Started a trend.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, SLIPPER, { P: [PINK, MINT, SKYB][i], W: CREAM }, 700 + i * 100, 1080 - i * 20, 11 * pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2))
      label(x, 790, 820, 'NEW DRESS CODE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, ...M })
      bubble(x, 780, 660, 'you’re welcome', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Remembered year five. | *At 3 a.m.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: GOLD }, 860, 640, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 780, 880, 300, 170, pop01(t, P.t0 + 0.6, 0.35, 2), { bg: SKYB, rot: 0.03 }, () => { txt(x, 'the recorder', 0, -28, { size: 34 }); txt(x, 'solo.', 0, 26, { size: 34 }) })
      label(x, 790, 1070, 'SLEEP: CANCELLED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, ...M })
    } },
]

const F = makeFilm({
  id: 'r2t0232', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Zodiacs blushing | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero dignity.*' },
  lesson: { text: 'Everyone trips. | *Laugh first.*', chip: 'STATUS: UNBOTHERED' },
  last: { text: 'Pisces? | *Still on year five.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
