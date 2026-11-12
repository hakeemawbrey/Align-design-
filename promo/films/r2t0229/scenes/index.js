// r2t0229: THE SIGNS AS… v3, "Crush liked the pic. | Zodiacs be like." (belike, star_talk, music: lofi · D). Ending: card.
//   ♈ liked back, DMed, called · ♉ screenshotted it, framed it · ♊ thirty drafts, sent "lol" · ♋ named the kids
//   · ♌ not surprised, posted three more · ♍ analysed the timestamp · ♎ liked, unliked, liked · ♏ waited three days
//   · ♐ didn't notice, on a mountain · ♑ scheduled a reply for Tuesday · ♒ checked the compatibility · ♓ happy-sobbed
//   group "One little like. | *Total chaos.*"  LESSON "Small signs count. | *Say hi.*"  MATCH: PENDING
//   last "Libra kept | the like. *Finally.*" over the match card: Libra + Aries (the slowest like, the fastest call).
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, meter, frame, calendar, bits, ORANGE, RED, PAPER, WOOD, GREEN } from '../props.js'

const L = { x: -150 }, R = { x: 150 }
const MOUNT = [['......W......', '.....WWW.....', '....WGGGW....', '...GGGGGGG...', '..GGGGGGGGG..', '.GGGGGGGGGGG.', 'GGGGGGGGGGGGG'], { W: BONE, G: '#6f8cff' }]

const CAMEOS = [
  { sign: 'aries', cap: 'Liked it back. | DMed. *Called.*', mood: 'wide', star: L, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      const s = lt < 0.7 ? '♡ liked' : lt < 1.3 ? 'DM sent' : 'calling…'
      phone(x, 790, 810, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '0:03', head: 'CRUSH', msg: s, bg: PINK })
    } },
  { sign: 'taurus', cap: 'Screenshotted it. | *Framed it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: L,
    front(x, t, lt, P) {
      frame(x, 790, 790, pop01(t, P.t0 + 0.3, 0.3, 2), 220, 220, x => { bits(x, 'heart', 0, -10, 18); x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('1 like', 0, 80) })
    } },
  { sign: 'gemini', cap: 'Wrote thirty drafts. | *Sent “lol.”*', mood: lt => lt > 1.5 ? 'wink' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const d = Math.min(30, 1 + Math.floor(Math.max(0, lt - 0.2) * 22))
      phone(x, 790, 810, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: `DRAFT ${d}`, head: 'TO: CRUSH', msg: lt > 1.6 ? 'lol' : 'hey so I | was thinking…', bg: GOLD })
    } },
  { sign: 'cancer', cap: 'One like. | Already *named the kids.*', mood: 'heart', star: L,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'Luna | Leo | Biscuit (dog)', { head: 'BABY NAMES', headBg: PINK, size: 38, w: 330 })
      hearts(x, t, 680, 1140, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Not surprised. | Posted *three more.*', mood: 'sparkle', star: L, hops: [0.9],
    front(x, t, lt, P) {
      const n = 1 + Math.min(3, Math.floor(Math.max(0, lt - 0.5) / 0.35))
      label(x, 790, 760, `POSTS TODAY: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'you’re welcome.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 390, 860, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Analysed | *the timestamp.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'liked: 2:14 a.m. | meaning: ??? | theory 1 of 9', { head: 'EVIDENCE', headBg: MINT, size: 34, w: 360 })
    } },
  { sign: 'libra', cap: 'Liked. Unliked. | *Liked again.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      const on = Math.floor(lt * 2.5) % 2 === 0
      bubble(x, 790, 700, on ? '♡ liked' : 'unliked', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, tail: 'bl', col: on ? PINK : BONE })
      label(x, 790, 930, 'TAPS: 14', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Saw it. | Waited *three days.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      calendar(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'REPLY IN', lt > 1.0 ? '3 DAYS' : '…')
    } },
  { sign: 'sagittarius', cap: 'Didn’t notice. | *Was on a mountain.*', mood: 'sparkle', star: R, hops: [0.6, 1.4],
    back(x, t, lt, P) { drawBits(x, MOUNT[0], MOUNT[1], 320, 960, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 320, 680, 'SIGNAL: NONE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Scheduled a reply. | *For Tuesday.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      note(x, 310, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'TUE 9:00 | reply to crush | (casual)', { head: 'AGENDA', headBg: MINT, size: 36, w: 330 })
    } },
  { sign: 'aquarius', cap: 'Checked their chart. | *Compatible. Interesting.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      meter(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.5, 1.6)) * 0.9, { w: 320, col: PINK, title: 'COMPATIBILITY' })
      bubble(x, 790, 1000, 'hm. cool.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Got the like. | *Sobbed* happy tears.', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'heart', 790, 780, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 990, '♡ 1 NEW LIKE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0229', key: 'D', accent: PINK, ending: 'card',
  title: 'Crush liked the pic. | Zodiacs *be like.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'aries', chip: 'IT’S A MATCH' },
  group: { cap: 'One little like. | *Total chaos.*' },
  lesson: { text: 'Small signs count. | *Say hi.*', chip: 'MATCH: PENDING' },
  last: {
    text: 'Libra kept the like. | *Finally.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
