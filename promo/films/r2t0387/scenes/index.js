// r2t0387: star_talk, BELIKE (twelve signs), "Zodiacs typing for | ten minutes be like." (signs3kit social cut, music: lofi · E).
// Ending: group ("Ten minutes later: | still typing.").
//   each sign types for ten minutes; what finally gets sent is the most extreme version of that sign.
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }
// the phone types for a while, then the sent chips land
const typed = (lt, at) => lt < at ? 1 : 0
const sent = (t, P, at) => pop01(t, P.t0 + at, 0.25, 2.2)

const CAMEOS = [
  { sign: 'aries', cap: 'Ten minutes typing. | All *caps.*', mood: lt => lt > 1.1 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      phone(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GROUP CHAT', headCol: RED, typing: typed(lt, 1.0), lines: [['OK SO LISTEN', '#ff9a8a', sent(t, P, 1.0), true], ['I’M RIGHT', '#ff9a8a', sent(t, P, 1.3), true], ['ABOUT ALL OF IT', '#ff9a8a', sent(t, P, 1.6), true]] })
    } },
  { sign: 'taurus', cap: 'Ten minutes typing. | Sent: *“food?”*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: MINT, typing: typed(lt, 1.2), lines: [['food?', MINT, sent(t, P, 1.2), true]] })
      bits(x, 'PIZZA', 450, 620, 10 * pop01(t, P.t0 + 1.5, 0.3, 2.2), { rot: 0.3 })
    } },
  { sign: 'gemini', cap: 'Typed for ten minutes. | Sent to *the wrong chat.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'WORK CHAT', headCol: STEEL, typing: typed(lt, 1.0), lines: [['ok the TEA', GOLD, sent(t, P, 1.0), true], ['about Dave', GOLD, sent(t, P, 1.2), true]] })
      L(x, 790, 1120, 'UNSEND?? UNSEND??', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.05, 30)
    } },
  { sign: 'cancer', cap: 'Ten minutes typing. | Deleted. Sent *a heart.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const del = lt > 1.0
      phone(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM', headCol: PINK, typing: del ? 0 : 1, lines: del ? [['♡', PINK, sent(t, P, 1.25), true]] : [['i just think that', BONE, 1, true], ['maybe we could', BONE, 1, true]] })
      if (lt > 0.95 && lt < 1.25) L(x, 790, 1120, 'DELETE ALL', 1, RED, -0.04, 30)
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Ten minutes typing. | A *caption.* For a selfie.', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 380, head: 'NEW POST', headBg: GOLD, headInk: INK, lines: ['draft 14:', '“just me', 'existing,', 'beautifully.”'], size: 30, progress: (lt - 0.4) / 1.0 })
      sparkles(x, t, 790, 840, P.t0 + 1.4, 7, 190, 0.5)
      L(x, 790, 1100, 'POSTED. ICONIC.', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Ten minutes typing. | *Proofread* for twenty.', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 340, head: 'DRAFT', headBg: STEEL, headInk: INK, lines: ['hey! are you', 'free fri?', ['(check comma)', RED], ['(check tone)', RED]], size: 30, progress: (lt - 0.4) / 1.2 })
      L(x, 790, 1090, 'READ-THROUGH #9', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Message done. | Still choosing *the emoji.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      phone(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MY MATCH', headCol: PINK, lines: [['see you at 8', BONE, 1, true]] })
      const opts = [[':)', MINT], [':D', GOLD], ['<3', PINK], [';)', LAV]]
      const i = Math.floor(lt * 3) % 4
      L(x, 790, 960, `${opts[i][0]}  ?`, pop01(t, P.t0 + 0.6, 0.3, 2), opts[i][1], 0.04 * Math.sin(lt * 9), 52)
    } },
  { sign: 'scorpio', cap: 'Ten minutes typing. | Sent: *“interesting.”*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH', headCol: LAV, typing: typed(lt, 1.2), lines: [['i’m a gemini!', BONE, 1], ['interesting.', LAV, sent(t, P, 1.2), true]] })
      L(x, 790, 1120, 'CHART: STUDIED', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Got distracted typing. | *Booked a flight.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.2, 1.7],
    front(x, t, lt, P) {
      if (lt < 1.0) phone(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'REPLY', headCol: GOLD, typing: 1, lines: [] })
      else sheet(x, 790, 850, pop01(t, P.t0 + 1.0, 0.35, 2.2), { w: 340, h: 240, rot: 0.05, head: 'BOARDING PASS', headBg: SKYB, headInk: INK, lines: ['GATE 7', 'LEAVES: NOW'], size: 34 })
      bits(x, 'PLANE', 470, 600, 12 * pop01(t, P.t0 + 1.3, 0.3, 2), { rot: 0.6 })
    } },
  { sign: 'capricorn', cap: 'Ten minutes typing. | It’s *an agenda.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 380, head: 'RE: DINNER?', headBg: '#b9a6ff', headInk: INK, lines: ['1. time', '2. place', '3. budget', '4. Q&A'], size: 32, align: 'left', progress: (lt - 0.4) / 1.0 })
      L(x, 790, 1090, 'ATTACHED: 3 FILES', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Ten minutes typing. | A *manifesto.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const unroll = clamp((lt - 0.5) / 1.0)
      sheet(x, 790, 700 + 150 * unroll, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 120 + 340 * unroll, rot: 0.02, bg: CREAM, lines: ['PART ONE:', 'why we', 'should all', 'live on boats'], size: 30, progress: unroll })
      bubble(x, 420, 590, 'quick thought', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Ten minutes typing. | A *poem.* Cried sending it.', mood: 'sparkle', tears: lt => lt > 1.2 ? 3 : 2, look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 360, rot: 0.04, bg: '#e6dcff', lines: ['you said', '“good morning”', 'and the sky', 'opened up'], size: 30, font: "'EB Garamond', Georgia, serif", weight: 500, progress: (lt - 0.3) / 1.0 })
      L(x, 790, 1090, 'SENT (SOBBING)', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0387', key: 'E', accent: ACC, ending: 'group',
  title: 'Zodiacs typing for | ten minutes *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Ten minutes later: | *still typing.*',
    moods: ['squint', 'sleepy', 'happy', 'neutral', 'wink', 'squint', 'wide', 'neutral', 'sparkle', 'neutral', 'wide', 'sparkle'],
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.1, 0.4, 2.2)
      if (k <= 0.01) return
      x.save(); x.translate(540, 760); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-150, -60, 300, 120); x.fillStyle = BONE; x.fillRect(-142, -52, 284, 104)
      x.fillStyle = INK; x.fillRect(-120, 52, 26, 26); x.fillStyle = BONE; x.fillRect(-116, 48, 18, 22)
      for (let i = 0; i < 3; i++) { const up = Math.max(0, Math.sin(t * 7 - i * 0.9)) * 14; x.fillStyle = INK; x.fillRect(-70 + i * 60 - 14, -14 - up, 28, 28) }
      x.restore()
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
