// r2t0228: THE SIGNS AS… v3, "Zodiacs tagged in | a bad photo be like." (belike, star_talk, music: lofi · G). Ending: lesson.
//   ♈ demanded a rematch · ♉ mid-bite, worth it · ♊ commented twelve times · ♋ saved it, it's a memory
//   · ♌ blinked, called a press conference · ♍ sent edit notes to the photographer · ♎ started a poll: delete or keep?
//   · ♏ already has a worse one of you · ♐ made it their profile pic · ♑ emailed the tagger, formally
//   · ♒ called it art, hung it in a gallery · ♓ hated their face, sobbed at the sunset
//   group "Same photo. | *Twelve meltdowns.*"  LESSON "Bad photos. | *Good memories.*"  TAG: ACCEPTED
//   last "Leo’s statement? | *Still going.*"
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, frame, bits, ORANGE, RED, PAPER, WOOD, GREEN } from '../props.js'

const L = { x: -150 }, R = { x: 150 }

const CAMEOS = [
  { sign: 'aries', cap: 'Saw the tag. | *Demanded a rematch.*', mood: lt => lt > 0.9 ? 'wide' : 'neutral', star: L, hops: [0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 660, '@ARIES TAGGED', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'again. | NOW.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 56, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Caught mid-bite. | *Honestly? Worth it.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', star: L,
    front(x, t, lt, P) {
      frame(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 240, 200, x => { bits(x, 'cookie', 0, 0, 16) }, { col: BONE })
      label(x, 790, 1010, 'MID-BITE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 42, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Commented on it. | *Twelve times.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(12, 1 + Math.floor(Math.max(0, lt - 0.3) * 7))
      phone(x, 790, 820, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: `💬 ${n}`.replace('💬 ', '× '), head: 'COMMENTS', msg: 'LMAO | wait, ME?', bg: GOLD })
    } },
  { sign: 'cancer', cap: 'Saved it anyway. | *“It’s a memory.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: L,
    front(x, t, lt, P) {
      note(x, 790, 740, pop01(t, P.t0 + 0.2, 0.3, 2), 'bad photos | (precious)', { head: 'ALBUM ♡', headBg: PINK, size: 38, w: 330 })
      hearts(x, t, 720, 1120, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Tagged blinking. | Called *a press conference.*', mood: lt => lt > 1.0 ? 'neutral' : 'wide', look: [1, 0], star: L, hops: [0.9],
    front(x, t, lt, P) {
      label(x, 790, 680, 'STATEMENT: 3 P.M.', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'no questions.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl' })
      sparkles(x, t, 390, 860, P.t0 + 1.4, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Sent notes | *to the photographer.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'lighting ✗ | angle ✗ | timing ✗ | me ✓', { head: 'FEEDBACK', headBg: MINT, size: 36, w: 320 })
    } },
  { sign: 'libra', cap: 'Started a poll. | *Delete or keep?*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      const a = Math.floor(clamp((lt - 0.4) / 1.6) * 50)
      note(x, 790, 770, pop01(t, P.t0 + 0.2, 0.3, 2), `delete: ${a} | keep: ${a}`, { head: 'POLL', headBg: '#ff8fb1', size: 44, w: 300 })
      label(x, 790, 1040, 'IT’S A TIE', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Has a worse one. | *Of you.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      label(x, 790, 720, 'BACKUP: READY', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'your move.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Made it their | *profile pic.*', mood: 'sparkle', star: R, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      phone(x, 310, 800, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '♐︎', head: 'MY PROFILE', msg: 'new pic! | no regrets', bg: MINT })
    } },
  { sign: 'capricorn', cap: 'Emailed the tagger. | *Formally.*', mood: lt => lt < 1.2 ? 'neutral' : 'squint', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      bits(x, 'envelope', 310, 760, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      label(x, 310, 960, 'RE: THE PHOTO', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 310, 1070, 'CC: EVERYONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Called it art. | Hung it *in a gallery.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      frame(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 220, 240, x => {
        x.strokeStyle = PINK; x.lineWidth = 10; x.beginPath(); x.moveTo(-80, 60); x.bezierCurveTo(-40, -90, 30, 90, 80, -60); x.stroke()
        x.fillStyle = SKYB; x.fillRect(-30, -20, 40, 40)
      })
      label(x, 790, 1020, '“SELF, BLURRY”', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Hated their face. | *Sobbed* at the sunset.', mood: lt => lt < 0.9 ? 'neutral' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: L,
    front(x, t, lt, P) {
      frame(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 240, 200, x => {
        x.fillStyle = '#ff9a6a'; x.fillRect(-120, -100, 240, 110); x.fillStyle = '#6f8cff'; x.fillRect(-120, 10, 240, 90); bits(x, 'sun', 0, 10, 12)
      })
      bubble(x, 790, 1040, 'so beautiful', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0228', key: 'G', accent: SKYB, ending: 'lesson',
  title: 'Zodiacs tagged in | a bad photo *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Same photo. | *Twelve meltdowns.*' },
  lesson: { text: 'Bad photos. | *Good memories.*', chip: 'TAG: ACCEPTED' },
  last: {
    text: 'Leo’s statement? | *Still going.*',
    draw(x, t, lt) {
      bubble(x, 760, 800, 'and ANOTHER thing…', pop01(t, t - lt + 1.0, 0.3, 2.2), { size: 48, tail: 'bc' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
