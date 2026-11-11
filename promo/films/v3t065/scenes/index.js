// v3t065: THE SIGNS AS… v3, SOLO film, "Things only | Aquarians get." (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine everyday situations, each pushed to the most extreme (and lovable) Aquarius version.
//   0.0–3.6    "Things only | *Aquarians* get."  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards: replies a month later · best friend is the 90-year-old neighbour · at a party, talked to
//              the cat · tinfoil hat as fashion · silent group chat, sent a moon fact · started a club, one member
//              · their birth chart glitched · invited out, 5–7 business days · love language: sending articles
//  37.8        "Weird? | *Proudly.*"
//  41.2        callback: "The club now has | *two members.*"  The club banner comes back; the neighbour joined.
import {
  makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { paper, phone, chart, readout, bits, clamp, prog, ease, lerp, RED, ORANGE, CREAM, GREY, DEEP, NIGHT } from './props.js'

const ACC = '#38c4ec'
const CAT = ['K.....K..', 'KK...KK..', 'KKKKKKK..', 'KYKKKYK..', 'KKKPKKK.K', '.KKKKK..K', '.KKKKKKKK', '.KKKKKKK.', '.K.K.K.K.']
const CAT_C = { K: '#4a4470', Y: GOLD, P: PINK }

function banner(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-196, -56, 392, 112)
  x.fillStyle = ACC; x.fillRect(-188, -48, 376, 96)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-196, 56); x.lineTo(-150, 56); x.lineTo(-196, 96); x.fill(); x.beginPath(); x.moveTo(196, 56); x.lineTo(150, 56); x.lineTo(196, 96); x.fill()
  x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
  x.restore()
}

const CAMEOS = [
  { sign: 'aquarius', cap: 'Replies to texts | *a month later.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 460, head: 'BESTIE',
        msgs: [{ t: 'u free friday?' }, { t: 'hello??' }, { t: 'omg hi!! | yes!!', me: true, c: ACC }], n: lt > 1.3 ? 3 : 2, size: 28 })
      label(x, 800, 1120, 'SEEN · 4 WEEKS AGO', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Their best friend? | The *90-year-old neighbor.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'taurus', 790, 930, 230 * k, { mood: lt > 1.0 ? 'heart' : 'sleepy', look: [-1, 0], seed: 14, glyph: false })
        x.save(); x.fillStyle = GREY; x.fillRect(840, 940, 10, 150); x.fillRect(820, 1080, 50, 10); x.restore()
      }
      label(x, 790, 650, 'BFF · AGE 90', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 560, 1110, 'chess at 6?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Went to a party. | Talked to *the cat.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 780, 980, 22 * pop01(t, P.t0 + 0.25, 0.3, 2))
      bubble(x, 780, 680, 'tell me | everything.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 780, 1160, 'HOURS: 3', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Wore a tinfoil hat. | *As fashion.*', mood: 'sparkle', star: { x: -160 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.35, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(F.x, F.top + 40); x.scale(1.7 * k, 1.7 * k)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-74, 8); x.lineTo(0, -130); x.lineTo(74, 8); x.closePath(); x.fill()
        x.fillStyle = '#d8dbe8'; x.beginPath(); x.moveTo(-62, 0); x.lineTo(0, -118); x.lineTo(62, 0); x.closePath(); x.fill()
        x.fillStyle = '#9aa5c4'; x.fillRect(-20, -60, 12, 40); x.fillRect(14, -40, 12, 30)
        x.restore()
      }
      label(x, 790, 760, 'IT’S A LOOK', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: ACC, rot: 0.05 })
      bubble(x, 790, 960, 'trend starts | tomorrow', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 380, 620, P.t0 + 0.6, 6, 120, 0.4)
    } },
  { sign: 'aquarius', cap: 'Group chat silent? | They sent *a moon fact.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 310, h: 470, head: 'THE GROUP', msgs: [{ t: 'fun fact: | the moon | is drifting | away', me: true, c: ACC }], n: lt > 0.7 ? 1 : 0, size: 30 })
      bits(x, 'MOON', 900, 640, 14 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 800, 1140, 'REPLIES: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Started a club. | *Membership: one.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      banner(x, 790, 760, pop01(t, P.t0 + 0.25, 0.35, 2), 'WEIRD CLUB')
      label(x, 790, 960, 'MEMBERS: 1', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'exclusive.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Ran their birth chart. | It *glitched.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 830, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t, { spin: lt > 1.0 ? 3 : 0.25, glitch: lt > 1.0 ? 1 : 0 })
      label(x, 790, 1080, 'ERROR: TOO UNIQUE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invited out? | Needs *5–7 business days.*', mood: lt => lt > 1.0 ? 'neutral' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'hang out | tonight?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: LAV, tail: 'br' })
      const dots = '.'.repeat(1 + Math.floor(lt * 3) % 3)
      readout(x, 770, 880, pop01(t, P.t0 + 0.7, 0.3, 2), `PROCESSING${dots}`, { size: 38, color: ACC, w: 380 })
      label(x, 790, 1080, 'ETA: NEXT WEEK', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Their love language? | *Sending articles.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 310, h: 470, head: 'YOU + ME',
        msgs: [{ t: 'read this | (40 min)', me: true, c: ACC }, { t: 'and this', me: true, c: ACC }, { t: 'and this one', me: true, c: ACC }, { t: 'love u', me: true, c: PINK }], n: 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 4), size: 26 })
      hearts(x, t, 800, 1060, P.t0 + 1.7, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'v3t065', key: 'G', accent: ACC, solo: 'aquarius', ending: 'callback',
  title: 'Things only | *Aquarians* get.',
  cameos: CAMEOS,
  group: { cap: 'Weird? | *Proudly.*', mood: 'sparkle' },
  last: {
    text: 'The club now has | *two members.*',
    draw(x, t, lt) {
      const t0 = t - lt
      x.save(); x.translate(540, 760); x.scale(1.3, 1.3); x.translate(-540, -760); banner(x, 540, 760, pop01(t, t0 + 0.3, 0.35, 2), 'WEIRD CLUB'); x.restore()
      signChar(x, t, 'aquarius', 380, 1060, 330 * pop01(t, t0 + 0.5, 0.4, 1.8), { mood: 'sparkle', seed: 5, hops: [t0 + 1.4] })
      signChar(x, t, 'taurus', 710, 1075, 290 * pop01(t, t0 + 0.8, 0.4, 1.8), { mood: 'heart', seed: 6, look: [-1, 0], glyph: false })
      label(x, 540, 1300, 'MEMBERS: 2', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 1180, t0 + 1.5, { n: 8, life: 1.6, spread: 600, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
