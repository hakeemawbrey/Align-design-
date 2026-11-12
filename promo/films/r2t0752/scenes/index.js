// r2t0752: star_talk, BELIKE, "Someone says “no rush”? | Zodiacs *be like.*" (topic: zodiacs when someone says
// "no rush"; signs3kit social cut, music: lofi · E). Twelve signs in zodiac order, each one's most extreme take on
// "no rush". Ending: callback (one year later, Taurus: "almost done").
//   ♈ sent it back before you hung up · ♉ took it very literally (ETA next spring) · ♊ started it, and six other things
//   · ♋ "is this a test?" · ♌ handed it in with a cover page · ♍ made a schedule for not rushing · ♎ a week choosing the
//   font · ♏ knows "no rush" means now · ♐ said "sure!" and left on a trip · ♑ did it yesterday · ♒ forgot it,
//   invented a better one · ♓ cried, it was so kind
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Heard “no rush.” | *Sent it in 4 minutes.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 850, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.0 ? Math.sin(t * 50) * 0.03 : 0 })
      L(x, 800, 660, 'SENT ✓ 0:04', pop01(t, P.t0 + 1.0, 0.3, 2.2), RED, 0.05, 40)
      bubble(x, 800, 1080, 'wait, really?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: BONE, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Took “no rush” | *very literally.*', mood: 'sleepy', star: { x: -170, y: 20 },
    back(x, t, lt, P) { bits(x, 'PILLOW', 380, 1010, 24 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 800, 780, 'ETA: NEXT SPRING', pop01(t, P.t0 + 0.5, 0.3, 2.2), MINT, -0.04, 36)
      bubble(x, 800, 980, 'zzz… no rush', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Started it. | *And six other things.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['the task', 'a podcast', 'a cake', 'learn harp', 'a novel', 'new hobby', 'a garden']
      const n = Math.min(7, 1 + Math.floor(lt / 0.25))
      for (let i = 0; i < n; i++) L(x, 790 + (i % 2 ? 50 : -50), 610 + i * 82, W[i], 1, i ? [GOLD, PINK, MINT, SKYB, LAV][i % 5] : BONE, (i % 2 ? 0.04 : -0.04), 30)
    } },
  { sign: 'cancer', cap: '“No rush”… | *Is this a test?*', mood: 'wide', look: [1, 0], star: ST, tears: lt => lt > 1.4 ? 1 : 0,
    front(x, t, lt, P) {
      phone(x, t, 800, 820, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CHAT', headCol: SKYB, lines: [['no rush!', BONE, pop01(t, P.t0 + 0.4, 0.2, 2), false], ['are u mad??', '#bfe6ff', pop01(t, P.t0 + 1.0, 0.2, 2), true], ['be honest', '#bfe6ff', pop01(t, P.t0 + 1.3, 0.2, 2), true]], size: 26 })
      L(x, 810, 1120, 'OVERTHINKING: 100%', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Handed it in | *with a cover page.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 380, bg: '#fff1b0', head: '✦ A LEO ORIGINAL ✦', headBg: '#ffb34a', headInk: INK, lines: ['the task', '(but', 'iconic)'], size: 40, progress: clamp((lt - 0.4) / 0.8) })
      sparkles(x, t, 800, 850, P.t0 + 1.0, 8, 220, 0.4)
    } },
  { sign: 'virgo', cap: 'Made a schedule | *for not rushing.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 380, head: 'NO-RUSH PLAN', headBg: MINT, headInk: INK, lines: ['9:00 relax', '9:15 relax more', '9:30 calm (ok)', '9:45 start', '9:46 done'], size: 26, align: 'left', progress: clamp((lt - 0.3) / 1.4) })
      L(x, 800, 1110, 'COLOUR-CODED', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Spent a week | *choosing the font.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const F = ['Aa', 'Aa', 'Aa', 'Aa'], n = Math.min(4, 1 + Math.floor(lt / 0.4))
      const FN = ["800 64px Inter, sans-serif", "italic 500 70px Georgia, serif", "700 60px 'Space Mono', monospace", "900 66px Georgia, serif"]
      for (let i = 0; i < n; i++) {
        const cx = 720 + (i % 2) * 160, cy = 720 + Math.floor(i / 2) * 170
        x.save(); x.fillStyle = INK; x.fillRect(cx - 70, cy - 70, 140, 140); x.fillStyle = [CREAM, '#ffd6e4', '#d6f5ff', '#e8ffd6'][i]; x.fillRect(cx - 62, cy - 62, 124, 124)
        x.fillStyle = INK; x.font = FN[i]; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(F[i], cx, cy + 4); x.restore()
      }
      L(x, 800, 1110, 'DAY 7: STILL DECIDING', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, -0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Knows “no rush” | *means right now.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, '“no rush”', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 54, tail: 'bl' })
      L(x, 800, 900, 'TRANSLATION: NOW', pop01(t, P.t0 + 1.0, 0.3, 2.4), '#c97bff', 0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Said “sure!” | *Then left on a trip.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const d = ease.inOutCubic(prog(lt, 0.8, 2.0))
      bits(x, 'PLANE', lerp(660, 900, d), lerp(800, 660, d), 18 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: 0.5 })
      L(x, 800, 1130, 'BACK IN… SOMETIME', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#ff9a4a', -0.04, 30)
    } },
  { sign: 'capricorn', cap: '“No rush”? | *Did it yesterday.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 260, head: 'TASK', headBg: STEEL, headInk: INK, lines: [['DONE ✓', '#2f8a48'], 'filed', 'backed up'], size: 36, progress: clamp((lt - 0.3) / 0.8) })
      L(x, 800, 1080, 'DATE: YESTERDAY', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Forgot the task. | *Invented a better one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 870, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: Math.sin(t * 3) * 0.05 })
      L(x, 800, 660, 'PATENT PENDING', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#6fc3ff', 0.04, 32)
      sparkles(x, t, 800, 870, P.t0 + 1.2, 7, 180, 0.5)
    } },
  { sign: 'pisces', cap: '“No rush” was so kind | *they cried.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 960, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 800, 700, 'you’re so | patient ;_;', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: '#bfe6ff', tail: 'bl' })
      hearts(x, t, 560, 800, P.t0 + 1.2, { n: 4, life: 1.6, spread: 150, cell: 6, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2t0752', key: 'E', accent: ACC, ending: 'callback',
  title: 'Someone says “no rush”? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Same deadline. | *Twelve speeds.*', moods: ['sparkle', 'sleepy', 'wide', 'wide', 'wink', 'squint', 'squint', 'squint', 'sparkle', 'neutral', 'sparkle', 'wide'] },
  last: {
    text: 'One year later: | *“Almost done.”*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.7, 0.35, 2)
      bits(x, 'PILLOW', 470, 1110, 26 * k)
      signChar(x, t, 'taurus', 470, 1010, 300 * k, { mood: 'sleepy', seed: 9 })
      bubble(x, 760, 900, 'almost done!', pop01(t, t - lt + 1.3, 0.3, 2.2), { size: 46, col: MINT, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
