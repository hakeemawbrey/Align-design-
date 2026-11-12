// r2t0679: THE SIGNS AS… v3, "“We’ll see.” | Zodiacs be like." (~62 s vertical, signs3kit social cut, music: lofi · D)
// How each sign takes "we'll see", pushed to the extreme. Ending: lesson.
//   ♈ already went · ♉ we'll see about dinner? already ordered · ♊ follow-up question #40 · ♋ translated: never
//   · ♌ NOW SHOWING: LEO · ♍ date and time, please · ♎ says it about everything · ♏ saw it coming (crystal ball)
//   · ♐ forgot what we were seeing · ♑ Plan B by noon · ♒ invented option C · ♓ planned the whole wedding (sobbing)
//   group "We saw. | *Nobody waited.*"   LESSON "“We’ll see” isn’t no. | *Give it time.*"   last "Libra’s answer? | *We’ll see.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { phone, note, calendar, bits, ORANGE, RED, WOOD, PAPER, GREEN, SLATE } from '../props.js'

const L = { x: -170 }, TEAL = '#7dffb0'
const BALL = [
  '...PPPPP...',
  '..PPWPPPP..',
  '.PPWPPPPPP.',
  'PPPPPPPPYPP',
  'PPPPPPPYYYP',
  'PPPPPPPPYPP',
  '.PPPPPPPPP.',
  '..PPPPPPP..',
  '...GGGGG...',
  '..GGGGGGG..',
]
const BALL_C = { P: '#c97bff', W: '#f3dcff', Y: GOLD, G: WOOD }
const BUTTERFLY = ['PP...PP', 'PPP.PPP', 'PPPKPPP', '.PPKPP.', 'PP.K.PP', 'P..K..P']

/** a marquee sign with blinking bulbs */
function marquee(x, t, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  const W = 360, H = 170
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12)
  x.fillStyle = RED; x.fillRect(-W / 2, -H / 2, W, H)
  for (let i = 0; i < 12; i++) { const on = (Math.floor(t * 6) + i) % 2; x.fillStyle = on ? '#fff1a8' : '#8a5a3a'; x.fillRect(-W / 2 + 10 + i * 29, -H / 2 + 8, 14, 14); x.fillRect(-W / 2 + 10 + i * 29, H / 2 - 22, 14, 14) }
  x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NOW SHOWING', 0, -24)
  x.fillStyle = GOLD; x.font = `800 58px ${INTER}`; x.fillText(text, 0, 30)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Heard “we’ll see.” | *Already went.*', mood: 'wide', star: L, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'we’ll see…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, tail: 'br', col: LAV })
      label(x, 760, 920, 'ALREADY THERE', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 40, bg: '#ff6b5a', rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 920, P.t0 + 0.9, 8, 200, 0.2)
    } },
  { sign: 'taurus', cap: 'We’ll see about dinner? | *Already ordered.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: L,
    front(x, t, lt, P) {
      bits(x, 'bowl', 790, 860, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1060, 'ORDER #2: PLACED', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: '#5fd068', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: '“See what? When? Why?” | *Follow-up #40.*', mood: lt => Math.floor(lt * 4) % 2 ? 'wide' : 'happy', star: L,
    front(x, t, lt, P) {
      ;['see what?', 'when??', 'why???', 'and then?'].forEach((w, i) => bubble(x, 760 + (i % 2) * 60, 640 + i * 130, w, pop01(t, P.t0 + 0.2 + i * 0.3, 0.25, 2.2), { size: 40, tail: i % 2 ? 'br' : 'bl', col: i % 2 ? LAV : BONE }))
    } },
  { sign: 'cancer', cap: 'Heard “we’ll see.” | *Translated: never.*', mood: lt => lt > 1.0 ? 'neutral' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'we’ll see!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, tail: 'br', col: LAV })
      label(x, 790, 920, 'TRANSLATION:', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 1020, 'NEVER.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 60, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: '“We’ll see”? | *Everyone will see Leo.*', mood: 'sparkle', star: L, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      marquee(x, t, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2), 'LEO')
      sparkles(x, t, 790, 820, P.t0 + 0.6, 8, 230, 0.3)
    } },
  { sign: 'virgo', cap: '“We’ll see” when? | *Date and time, please.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'WE’LL SEE:', lt > 1.0 ? '4:15?' : '??')
      label(x, 790, 1060, 'PENDING YOUR RSVP', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Libra says it too. | *About everything.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', star: L,
    front(x, t, lt, P) {
      const n = 1 + Math.min(3, Math.floor(prog(lt, 0.3, 1.4) * 4))
      note(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ['lunch: we’ll see', 'plans: we’ll see', 'this list: we’ll see'].slice(0, Math.min(3, n)).join(' | '), { head: 'LIBRA’S ANSWERS', headBg: PINK, size: 36, w: 400 })
    } },
  { sign: 'scorpio', cap: 'Heard “we’ll see.” | *Saw it coming.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BALL, BALL_C, 790, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.6) { x.save(); x.globalAlpha = 0.2 + 0.1 * Math.sin(t * 6); x.fillStyle = '#f3dcff'; x.beginPath(); x.arc(790, 800, 150, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 1080, 'CALLED IT.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 44, bg: '#c97bff', color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: '“We’ll see what?” | *Sag already forgot.*', mood: lt => lt > 0.9 ? 'sparkle' : 'neutral', look: lt => lt > 0.9 ? [1, -1] : [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'we’ll see if—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'br', col: LAV })
      drawBits(x, BUTTERFLY, { P: '#ff9a4a', K: INK }, 790 + 50 * Math.sin(t * 2.4), 930 + 30 * Math.sin(t * 4.1), 22 * pop01(t, P.t0 + 0.8, 0.3, 2), { sy: 1 + 0.3 * Math.sin(t * 18) })
      label(x, 790, 1100, 'OOH. BUTTERFLY.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: '#ff9a4a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Heard “we’ll see.” | *Plan B by noon.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = 1 + Math.min(2, Math.floor(prog(lt, 0.3, 1.3) * 3))
      note(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ['PLAN B ✓', 'PLAN C ✓', 'PLAN D ✓'].slice(0, n).join(' | '), { head: '11:58 AM', headBg: TEAL, size: 46, w: 340, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Yes or no? | *Invented option C.*', mood: 'sparkle', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 720, 680, 'YES', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 880, 680, 'NO', pop01(t, P.t0 + 0.35, 0.3, 2), { size: 44, bg: RED, color: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 780, 900, 'OPTION C', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 56, bg: '#6fc3ff', rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.1, 8, 210, 0.3)
    } },
  { sign: 'pisces', cap: 'Heard “we’ll see.” | *Planned the wedding.*', mood: 'heart', look: [1, 0], star: L, tears: 3,
    front(x, t, lt, P) {
      bits(x, 'cake', 790, 850, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1060, 'SAVE THE DATE?', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0679', key: 'D', accent: TEAL, ending: 'lesson',
  title: '“We’ll see.” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'We saw. | *Nobody waited.*' },
  lesson: { text: '“We’ll see” isn’t no. | *Give it time.*', chip: 'STATUS: PENDING' },
  last: { text: 'Libra’s answer? | *We’ll see.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
