// r2t0297: star_talk, BE LIKE roll call, 'Zodiacs when someone replies "lol" | *be like.*' (~62 s vertical, signs3kit, lofi · E)
// Twelve signs in zodiac order, each the most extreme reaction to a one-word "lol" reply. Ending: lesson.
//   0.0–3.6    'Zodiacs when someone replies "lol" | *be like.*'
//   3.6–49.2   ♈ called them, fourth time · ♉ back to the noodles · ♊ "lol" back in three chats · ♋ "they hate me now"
//              · ♌ expected an ovation · ♍ analysed the lowercase · ♎ polled the group chat · ♏ "lol." with a period
//              · ♐ LOLOLOLOL, meant it · ♑ "noted." meeting adjourned · ♒ replied in morse code · ♓ cried, saved it
//  49.2        'One "lol". | *Twelve meltdowns.*'
//  52.4        LESSON UNLOCKED: "Short texts aren't | *a verdict.*"  STATUS: CHILL
//  58.3        'Send this. | Reply only *"lol."*'
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = MINT, RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#c98f5a'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// a phone with one grey incoming "lol" bubble
function lolPhone(x, cx, cy, k, { rot = 0.05, txt = 'lol', ring = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + (ring ? Math.sin(ring * 60) * 6 : 0), cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-104, -160, 220, 340)
  x.fillStyle = INK; x.fillRect(-116, -176, 232, 352); x.fillStyle = '#2a2350'; x.fillRect(-106, -166, 212, 332)
  x.fillStyle = '#140c30'; x.fillRect(-94, -140, 188, 280)
  x.fillStyle = '#c9c9d8'; x.fillRect(-80, -40, 100, 56)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, -30, -10)
  x.restore()
}
const BOWL = ['.S.S.S.S..', '..S.S.S...', 'YYYYYYYYYY', 'RRRRRRRRRR', '.RRRRRRRR.', '..RRRRRR..', '...KKKK...']
const GLASS = ['..KKKK...', '.KWWWWK..', 'KWWBWWWK.', 'KWWWWWWK.', 'KWWWWWWK.', '.KWWWWK..', '..KKKKKK.', '......KKK', '.......KK']

function wheel(x, t, cx, cy, R, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, R + 8, 0, 7); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, R, 0, 7); x.fill()
  x.rotate(t * 0.4); x.strokeStyle = '#6b62a8'; x.lineWidth = 3
  for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(i * Math.PI / 6) * R, Math.sin(i * Math.PI / 6) * R); x.stroke() }
  x.beginPath(); x.arc(0, 0, R * 0.45, 0, 7); x.stroke()
  x.fillStyle = PINK; x.fillRect(R * 0.6, -6, 14, 14); x.fillStyle = MINT; x.fillRect(-R * 0.7, R * 0.3, 14, 14); x.fillStyle = GOLD; x.fillRect(-10, -R * 0.75, 14, 14)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: '“lol”?? | Called them *immediately.*', mood: lt => lt > 0.9 ? 'wide' : 'squint', star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      lolPhone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { ring: lt > 0.8 ? t : 0 })
      const n = 1 + Math.floor(clamp((lt - 0.8) / 1.0) * 3)
      if (lt > 0.8) L(x, 790, 1080, `CALLING… (${['1ST', '2ND', '3RD', '4TH'][n - 1]})`, 1, RED, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Saw the “lol”. | Back to *the noodles.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOWL, { S: BONE, Y: GOLD, R: '#ff6b5a', K: INK }, 790, 880, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 680, 'REPLY: LATER (MAYBE)', pop01(t, P.t0 + 1.2, 0.3, 2.4), BONE, 0.04, 28)
    } },
  { sign: 'gemini', cap: 'Replied “lol” back. | In *three chats.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        bubble(x, 760 + (i % 2) * 60, 680 + i * 170, 'lol', pop01(t, P.t0 + 0.3 + i * 0.45, 0.25, 2.2), { size: 46, col: [GOLD, MINT, PINK][i], tail: 'bl' })
        L(x, 900 - (i % 2) * 300 + 60, 740 + i * 170, `CHAT ${i + 1}`, pop01(t, P.t0 + 0.4 + i * 0.45, 0.3, 2), BONE, 0.05, 22)
      }
    } },
  { sign: 'cancer', cap: '“lol”? | They *hate me now.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], star: ST, tears: lt => lt > 1.5 ? 1 : 0,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'lol', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, col: '#c9c9d8', tail: 'br' })
      bubble(x, 780, 860, 'are we | okay??', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      L(x, 790, 1070, 'OVERTHINKING: DAY 2', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Got a “lol”. | Expected an *ovation.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', star: ST, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'that joke was | ELITE.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 860, 'lol', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: '#c9c9d8', tail: 'br' })
      L(x, 790, 1060, 'APPLAUSE: MISSING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Analysed the “lol”. | *Lowercase.* Suspicious.', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'lol', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 64, col: '#c9c9d8', tail: 'br' })
      const gx = lerp(700, 860, 0.5 + 0.5 * Math.sin(lt * 2.4))
      drawBits(x, GLASS, { K: INK, W: 'rgba(143,227,255,0.45)', B: '#fff' }, gx, 780, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 790, 1000, 'NO PERIOD. HMM.', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Polled the group chat | on *how to reply.*', mood: lt => lt > 1.6 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = CREAM; x.fillRect(-162, -162, 324, 324)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('POLL: REPLY WITH?', 0, -120)
        const O = ['haha', 'lol', 'both?'], C = [PINK, MINT, GOLD]
        O.forEach((o, i) => { const w = 220 * clamp((lt - 0.5 - i * 0.2) / 0.8); x.fillStyle = C[i]; x.fillRect(-130, -60 + i * 76, w, 54); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.fillText(o, -116, -32 + i * 76) })
        x.restore()
      }
      L(x, 790, 1100, 'POLL: STILL OPEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Replied “lol.” | *With a period.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, lt > 1.0 ? 'lol.' : 'lol', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 70, col: LAV, tail: 'bl' })
      if (lt > 1.0) sparkles(x, t, 860, 770, P.t0 + 1.0 * 1.29, 6, 80, 0.4, [SKYB, BONE])
      L(x, 790, 1020, 'TEMPERATURE: ICE', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Replied “LOLOLOLOL”. | *Meant it.*', mood: 'sparkle', star: { x: 170 }, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 5)
      bubble(x, 360, 760, 'LO'.repeat(n) + 'L', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: n > 3 ? 34 : 44, col: GOLD, tail: 'br' })
      L(x, 360, 960, 'LAUGHING: FOR REAL', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Replied “noted.” | *Meeting adjourned.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'lol', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: '#c9c9d8', tail: 'br' })
      bubble(x, 790, 860, 'noted.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 48, col: BONE, tail: 'bl' })
      L(x, 790, 1060, 'ADJOURNED 4:01 PM', pop01(t, P.t0 + 1.5, 0.3, 2.4), '#2fc79a', -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Replied “lol” | in *morse code.*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const M = '.-.. --- .-..', n = Math.floor(clamp((lt - 0.3) / 1.2) * M.length)
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(745, 800); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-220, -70, 440, 140); x.fillStyle = '#140c30'; x.fillRect(-212, -62, 424, 124)
        let px = -187
        for (let i = 0; i < n; i++) { const c = M[i]; x.fillStyle = MINT; if (c === '.') { x.fillRect(px, -10, 14, 18); px += 22 } else if (c === '-') { x.fillRect(px, -10, 32, 18); px += 42 } else px += 16 }
        x.restore()
      }
      L(x, 790, 1000, 'TRANSLATION: lol', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Got a “lol”. | *Cried.* Happy tears.', mood: lt => lt < 0.8 ? 'heart' : 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      lolPhone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 790, 760, P.t0 + 0.9, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 5 })
      L(x, 790, 1080, 'SCREENSHOT: SAVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0297', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Zodiacs after a “lol” | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One “lol”. | *Twelve meltdowns.*' },
  lesson: { text: 'Short texts aren’t | *a verdict.*', chip: 'STATUS: CHILL' },
  last: {
    text: 'Send this. | Reply only *“lol.”*',
    draw(x, t, lt) { bubble(x, 540, 1450, 'lol', pop01(t, t - lt + 1.0, 0.3, 2.2), { size: 80, col: '#c9c9d8', tail: 'bc' }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
