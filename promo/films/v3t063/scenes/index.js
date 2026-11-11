// v3t063: THE SIGNS AS… v3, "Zodiac work calls | be like." (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one work call each, pushed to the extreme; ends on the two-card match.
//   0.0–3.6    "Zodiac work calls | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ not hosting, ended the call · ♉ quick call, full lunch · ♊ talking and typing · ♋ "how are you?", meant it
//              · ♌ ring light at max · ♍ an agenda for the agenda · ♎ nine backgrounds · ♏ camera off, saw everything
//              · ♐ joined from a zipline · ♑ Saturday, still on the call · ♒ an office on the moon · ♓ "great job", cried
//  49.2        "Could’ve been | an *email.*"
//  52.4        LESSON UNLOCKED: "Every team needs | *all twelve.*"  TEAM: ALIGNED
//  58.3        "Next meeting? | *Already booked.*" over the match card: Virgo + Capricorn (the agenda and the Saturday call).
import {
  makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { paper, phone, tile, readout, bits, B, clamp, prog, ease, lerp, RED, ORANGE, CREAM, GREY, DEEP, NIGHT, GREEN } from './props.js'

const ACC = SKYB

const CAMEOS = [
  { sign: 'aries', cap: 'Not even hosting. | *Ended the call* anyway.', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      tile(x, t, 790, 700, pop01(t, P.t0 + 0.2, 0.3, 2), { sign: 'capricorn', mood: lt > 1.1 ? 'wide' : 'neutral', name: 'HOST: CAP', w: 280, h: 200 })
      const press = lt > 1.0 && lt < 1.25 ? 0.88 : 1
      label(x, 790, 960, '■ END CALL', pop01(t, P.t0 + 0.6, 0.3, 2) * press, { size: 40, bg: RED, color: CREAM, rot: 0, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'great chat, bye!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: '“Quick call.” | Brought a *full lunch.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'SANDWICH', 790, 760, 20 * pop01(t, P.t0 + 0.25, 0.3, 2))
      bits(x, 'BOWL', 760, 930, 18 * pop01(t, P.t0 + 0.55, 0.3, 2))
      bits(x, 'CAKE', 870, 1050, 14 * pop01(t, P.t0 + 0.85, 0.3, 2))
      label(x, 600, 640, 'COURSE 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
      bubble(x, 420, 1120, 'you’re muted', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Talking out loud. | *And* in the chat.', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.6) * 5) + 1
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 470, head: 'CHAT', headBg: '#c79a2a',
        msgs: [{ t: 'also—' }, { t: 'one more thing' }, { t: 'WAIT' }, { t: 'ok so' }, { t: 'lol same' }].map(m => ({ ...m, c: '#f2cf4a' })), n, size: 28 })
      bubble(x, 380, 620, 'AS I WAS | SAYING—', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Asked “how are you?” | *Meant it.* An hour.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 770, 650, 'no, really. | how ARE you?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, tail: 'bl' })
      const m = Math.floor(clamp((lt - 0.7) / 1.4) * 58)
      readout(x, 790, 900, pop01(t, P.t0 + 0.7, 0.3, 2), `+${m} MIN`, { size: 56, color: SKYB })
      label(x, 790, 1080, 'AGENDA: FEELINGS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Camera on. | *Ring light* at max.', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.7, 1.0))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = '#fff7c8'; x.beginPath(); x.ellipse(370, 880, 260, 260, 0, 0, Math.PI * 2); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      bits(x, 'RINGLIGHT', 800, 860, 26 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 800, 1110, 'BRIGHTNESS: MAX', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 620, 'can you see me?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      sparkles(x, t, 370, 880, P.t0 + 0.85, 8, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Sent an agenda | for *the agenda.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 420, rot: 0.04, head: 'PRE-AGENDA', headBg: '#ef5c94', headColor: CREAM, align: 'left',
        lines: ['1. agenda intro', '2. agenda review', '3. agenda Q&A', '4. the agenda', '5. recap'], size: 26, n: 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 5) })
      label(x, 790, 1110, 'v7 · FINAL · FINAL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Changed their background | *nine times.*', mood: lt => lt > 1.8 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.min(8, Math.floor(Math.max(0, lt - 0.3) / 0.2))
      const BG = [LAV, MINT, GOLD, SKYB, PINK, ORANGE, GREEN, '#6fc3ff', '#e163d6']
      tile(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { sign: 'libra', mood: 'sparkle', bg: BG[n], name: 'LIBRA', w: 320, h: 260 })
      readout(x, 790, 1100, pop01(t, P.t0 + 0.4, 0.3, 2), `BACKGROUND ${n + 1}`, { size: 36, color: '#e163d6' })
    } },
  { sign: 'scorpio', cap: 'Camera off. | Saw *everything.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      tile(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), { off: true, eyes: true, name: 'SCORPIO', w: 320, h: 230 })
      bubble(x, 790, 990, 'nice cat, | Gemini.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 1140, 'NOTES: TAKEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: '#e23d66', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Joined the call | from *a zipline.*', mood: 'sparkle',
    star: { x: -60, y: -20, s: 250 },
    back(x, t, lt, P) {
      x.save(); x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.moveTo(110, 560); x.lineTo(980, 900); x.stroke(); x.restore()
    },
    front(x, t, lt, P, F) {
      x.save(); x.fillStyle = GREY; x.fillRect(F.x - 6, F.top - 90, 12, 90); x.fillRect(F.x - 40, F.top - 100, 80, 16); x.restore()
      bubble(x, 760, 1080, 'can you | hear meeee', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 300, 1100, 'WIFI: WINDY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: '#a35cf0', color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'It’s Saturday. | *Still* on the call.', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      paper(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 240, h: 230, rot: 0.05, head: 'NOV', headBg: RED, lines: [{ t: 'SAT', s: 80, f: INTER, w: 800 }], top: -20, size: 80 })
      const h = 1 + Math.floor(clamp((lt - 0.6) / 1.2) * 8)
      readout(x, 790, 1040, pop01(t, P.t0 + 0.6, 0.3, 2), `HOUR ${h}`, { size: 52, color: '#2fc79a' })
      bubble(x, 420, 610, 'one more | thing.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Pitched an idea: | an office *on the moon.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MOON', 800, 800, 34 * pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 800, 1060, 'NEXT SLIDE: COMMUTE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 600, 'hear me out', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 800, 800, P.t0 + 0.7, 7, 180, 0.4)
    } },
  { sign: 'pisces', cap: 'Boss said “great job.” | *Cried* on camera.', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tile(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), { sign: 'capricorn', mood: 'happy', name: 'BOSS', w: 260, h: 190 })
      bubble(x, 790, 980, 'great job!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bc' })
      label(x, 790, 1130, 'MEETING: PAUSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t063', key: 'E', accent: ACC, ending: 'card',
  title: 'Zodiac work calls | *be like.*',
  cameos: CAMEOS,
  card: { a: 'virgo', b: 'capricorn', chip: 'IT’S A MATCH' },
  group: { cap: 'Could’ve been | an *email.*' },
  lesson: { text: 'Every team needs | *all twelve.*', chip: 'TEAM: ALIGNED' },
  last: {
    text: 'Next meeting? | *Already booked.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
