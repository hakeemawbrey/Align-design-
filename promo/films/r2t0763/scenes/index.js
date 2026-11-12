// r2t0763: star_talk, ROLLCALL, "New Year's Eve | by sign." (topic: "The signs on New Year's Eve") (signs3kit social cut, lofi · G). Ending: callback
// (Leo's midnight speech is still going).
//   ♈ started the countdown an hour early · ♉ midnight plans: the snack table · ♊ resolutions, then their opposites
//   · ♋ midnight hugs: everyone, twice · ♌ a midnight speech, page 14 · ♍ wrote resolutions for everyone else
//   · ♎ two parties, picked at 11:59 · ♏ already knew your resolution (read your chart) · ♐ three time zones
//   · ♑ asleep by ten, goals already done · ♒ midnight on Neptune time · ♓ the year ended, sobbed, grateful
//   group "New year. | *Same chaos.*"   last "Leo’s speech? | *Still going.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, zzz, confetti, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff'

/** an analog clock face; m = minutes past 11 (0–60), hands drawn at that time */
function clock(x, cx, cy, r, k, hh, mm, { label: lab = '', col = BONE } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.sin(a) * r * 0.8 - 4, -Math.cos(a) * r * 0.8 - 4, 8, 8) }
  const am = mm / 60 * Math.PI * 2, ah = ((hh % 12) + mm / 60) / 12 * Math.PI * 2
  x.strokeStyle = INK; x.lineCap = 'round'
  x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(ah) * r * 0.5, -Math.cos(ah) * r * 0.5); x.stroke()
  x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(am) * r * 0.75, -Math.cos(am) * r * 0.75); x.stroke()
  if (lab) { x.fillStyle = INK; x.font = `700 ${Math.round(r * 0.36)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lab, 0, r + 40) }
  x.restore()
}
const PARTYHAT = ['....Y....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPPY..', '.PPPPPPP.', '.PPYPPYP.', 'PPPPPPPPP']
const PARTYHAT_C = { P: PINK, Y: GOLD }
const ENV = ['KKKKKKKKKKKK', 'KWKWWWWWWKWK', 'KWWKWWWWKWWK', 'KWWWKRRKWWWK', 'KWWWWRRWWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const ENV_C = { K: INK, W: CREAM, R: RED }

const CAMEOS = [
  { sign: 'aries', cap: 'Started the countdown | *an hour early.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -160 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      clock(x, 790, 790, 120, pop01(t, P.t0 + 0.2, 0.3, 2), 11, 0)
      const n = 10 - Math.min(9, Math.floor(Math.max(0, lt - 0.5) / 0.2))
      bubble(x, 790, 1040, `${n}… ${n - 1}…`, pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 48, tail: 'bl' })
      L(x, 790, 610, 'IT’S 11:00', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.05, 36)
    } },
  { sign: 'taurus', cap: 'Midnight plans? | *The snack table.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'PIZZA', 700, 1060, 13 * k, { rot: -0.2 }); bits(x, 'COOKIE', 860, 1070, 14 * k); bits(x, 'SANDWICH', 790, 960, 13 * k); bits(x, 'BOWL', 790, 860, 12 * k)
    },
    front(x, t, lt, P) {
      L(x, 790, 680, 'RESERVED: TAURUS', pop01(t, P.t0 + 1.0, 0.3, 2.4), '#5fd068', 0.05, 32)
      bubble(x, 420, 620, 'happy new | snack!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Made resolutions. | *Then their opposites.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 380, head: 'RESOLUTIONS', headBg: '#ffd23a', headInk: INK, lines: ['run daily', ['never run', '#c0392b'], 'read more', ['no books', '#c0392b'], 'be calm', ['BE LOUD', '#c0392b']], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.5) })
    } },
  { sign: 'cancer', cap: 'Midnight hugs? | *Everyone. Twice.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      friend(x, t, 'libra', 720, 960, 160, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      friend(x, t, 'aries', 880, 990, 160, pop01(t, P.t0 + 0.5, 0.35, 2), { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 33 })
      L(x, 800, 640, `HUGS: ${Math.min(2, 1 + Math.floor(lt / 1.1))} EACH`, pop01(t, P.t0 + 0.8, 0.3, 2.4), PINK, 0.05, 34)
      hearts(x, t, 800, 1060, P.t0 + 0.9, { n: 6, life: 2, spread: 220, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Gave a midnight speech. | *Page fourteen.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const pg = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 13)
      for (let i = 0; i < 3; i++) sheet(x, 800 + i * 14, 860 - i * 14, pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { w: 260, h: 320, rot: 0.06 - i * 0.04, head: i === 2 ? `PAGE ${pg}` : '', headBg: '#ffb34a', headInk: INK, lines: i === 2 ? ['and another', 'thing about', 'ME…'] : [], size: 32 })
      bubble(x, 420, 620, 'thank you, | thank you', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Wrote resolutions | for *everyone else.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 380, head: 'YOUR GOALS', headBg: MINT, headInk: INK, lines: ['aries: patience', 'leo: listen', 'gemini: pick one', 'you: text', '  your match'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.3) })
      L(x, 790, 1110, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Invited to two parties. | Picked *at 11:59.*', mood: lt => lt > 1.7 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'HOUSE', 680, 1060, 16 * k); bits(x, 'HOUSE', 900, 1060, 16 * k)
      clock(x, 790, 770, 100, pop01(t, P.t0 + 0.5, 0.3, 2), 11, lerp(40, 59, clamp((lt - 0.5) / 1.4)))
      L(x, 790, 610, lt > 1.7 ? 'THIS ONE! RUN!' : 'this one? that one?', pop01(t, P.t0 + 0.7, 0.3, 2.4), PINK, 0.05, 30)
    } },
  { sign: 'scorpio', cap: 'Knew your resolution. | Read *your chart.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, ENV, ENV_C, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05 })
      L(x, 790, 650, 'SEALED: YOURS', pop01(t, P.t0 + 0.6, 0.3, 2), LAV, 0.05, 32)
      bubble(x, 790, 1060, 'gym. again. | i know.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Rang in the new year | in *three time zones.*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const k = i => pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2)
      clock(x, 230, 700, 62, k(0), 0, 0, { label: 'HERE' })
      clock(x, 400, 840, 62, k(1), 0, 0, { label: 'THERE', col: '#ffe7a8' })
      clock(x, 230, 990, 62, k(2), 0, 0, { label: 'ALSO', col: '#bfe6ff' })
      drawBits(x, PARTYHAT, PARTYHAT_C, 700, 700, 10 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
    } },
  { sign: 'capricorn', cap: 'Asleep by ten. | Goals *already done.*', mood: 'sleepy', star: { x: -170, y: 20 },
    back(x, t, lt, P) { bits(x, 'PILLOW', 380, 1010, 24 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 300, h: 320, head: 'NEXT YEAR', headBg: STEEL, headInk: INK, lines: [['✓ goal 1', '#2f8a48'], ['✓ goal 2', '#2f8a48'], ['✓ goal 3', '#2f8a48']], size: 36, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      zzz(x, t, 520, 740, { size: 44 })
      L(x, 800, 1080, 'DONE IN NOVEMBER', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Celebrated midnight | on *Neptune time.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {   // a little Neptune with a ring
        x.save(); x.translate(800, 780); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 98, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#4f7bff'; x.beginPath(); x.arc(0, 0, 90, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#7fa6ff'; x.fillRect(-80, -30, 160, 16); x.fillRect(-70, 22, 140, 12)
        x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.ellipse(0, 0, 150, 34, -0.2, 0, Math.PI * 2); x.stroke()
        x.restore()
      }
      L(x, 800, 1020, 'NEPTUNE: 00:00', pop01(t, P.t0 + 0.9, 0.3, 2.4), MINT, -0.04, 36)
      bubble(x, 800, 1140, 'earth is SO late', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'The year ended. | Pisces *sobbed.* Grateful.', mood: lt => lt < 1.0 ? 'wide' : 'heart', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 930, 18 * pop01(t, P.t0 + 0.3, 0.35, 2))
      confetti(x, t, 800, 760, P.t0 + 0.6, { n: 24, spread: 220 })
      L(x, 800, 650, 'THANK YOU, YEAR ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, 0.05, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0763', key: 'G', accent: ACC, ending: 'callback',
  title: 'New Year’s Eve | *by sign.*',
  cameos: CAMEOS,
  group: { cap: 'New year. | *Same chaos.*' },
  last: {
    text: 'Leo’s speech? | *Still going.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 380, 1120, 300 * k, { mood: 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.4, t - lt + 2.6] })
      const pg = 14 + Math.floor(clamp((lt - 0.8) / 2.4) * 26)
      sheet(x, 760, 1100, pop01(t, t - lt + 0.8, 0.35, 2), { w: 280, h: 300, rot: 0.06, head: `PAGE ${pg}`, headBg: '#ffb34a', headInk: INK, lines: ['and ANOTHER', 'thing…'], size: 32 })
      L(x, 760, 900, 'GUESTS: ASLEEP', pop01(t, t - lt + 2.0, 0.3, 2.4), STEEL, -0.04, 30)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
