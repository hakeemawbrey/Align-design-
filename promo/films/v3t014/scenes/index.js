// v3t014: THE SIGNS AS… v3, "The signs write | a dating bio." (~54 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "The signs write | a *dating bio.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one dating bio per sign (3.8 s each), each pushed to the extreme:
//              ♈ posted it mid-sentence · ♉ a list of favourite snacks · ♊ rewrote it nine times today
//              · ♋ the bio is their dog's bio · ♌ "You already know." · ♍ forty-two requirements
//              · ♎ still choosing the first word · ♏ one word: "Maybe." · ♐ "Back in a month." since 2019
//              · ♑ the bio is a résumé · ♒ written in their own alphabet · ♓ the bio is a poem, made themselves cry
//  49.2        ending 'group': "Read every bio. | Matched *anyway.*"  + a "12 NEW MATCHES" chip over the group photo
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', GREEN = '#5fd068', CREAM = '#fff4e2'

/** a profile card (the shared prop of this film): a header in the sign's colour, a bio area, drawn at k.
 *  body(x) draws inside, origin at the card centre, 300 × 380 */
function profile(x, cx, cy, k, color, head, body, rot = 0.04) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.2, k * 1.2)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150 + 8, -190 + 10, 300, 380)
  x.fillStyle = INK; x.fillRect(-156, -196, 312, 392)
  x.fillStyle = CREAM; x.fillRect(-150, -190, 300, 380)
  x.fillStyle = color; x.fillRect(-150, -190, 300, 70)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -155)
  x.textAlign = 'left'
  body(x)
  x.restore()
}
/** lines of text inside a profile card */
function lines(x, arr, { size = 30, top = -90, gap = 46, color = INK, font = `800 ${size}px Inter, Arial, sans-serif`, n = arr.length } = {}) {
  x.font = font; x.fillStyle = color
  arr.slice(0, n).forEach((s, i) => x.fillText(s, -125, top + i * gap))
}

const CAMEOS = [
  { sign: 'aries', cap: 'Wrote half a bio. | *Posted it anyway.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', star: { x: -170 }, hops: [0.5],
    front(x, t, lt, P) {
      const typed = 'Looking for someo'.slice(0, Math.floor(clamp((lt - 0.3) / 0.7) * 17))
      profile(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, 'ARIES, 0 MIN', x => lines(x, [typed.slice(0, 11), typed.slice(11)], { size: 34 }))
      label(x, 790, 1165, 'POSTED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Bio: a list of | *favourite snacks.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.4) / 1.2) * 5.99)
      profile(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, 'ABOUT ME', x => lines(x, ['1. bread', '2. more bread', '3. cheese', '4. you? (maybe)', '5. bread'], { size: 28, top: -95, gap: 52, n }))
    } },
  { sign: 'gemini', cap: 'Rewrote the bio | *nine times today.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const V = ['i love hiking', 'i hate hiking', 'hiking?', 'i AM a hike', 'chaotic good']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.42))
      profile(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, 'GEMINI', x => lines(x, [V[n]], { size: 34, top: -40 }))
      label(x, 790, 1165, `VERSION ${5 + n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Their bio is | *their dog’s bio.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, 'BISCUIT, 4', x => {
        // a little pixel dog
        const D = ['B......B', 'BB....BB', 'BBBBBBBB', 'BKBBBBKB', 'BBBNNBBB', '.BBBBBB.']
        D.forEach((r, j) => [...r].forEach((c, i) => { if (c !== '.') { x.fillStyle = c === 'B' ? '#d89a4a' : INK; x.fillRect(-64 + i * 16, -100 + j * 16, 16, 16) } }))
        lines(x, ['good boy.', 'likes: walks'], { size: 30, top: 50, gap: 50 })
      })
      hearts(x, t, 790, 800, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Their whole bio: | *“You already know.”*', mood: 'wink', star: { x: -160 }, hops: [0.9],
    front(x, t, lt, P) {
      profile(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, 'LEO ★★★★★', x => lines(x, ['You already', 'know.'], { size: 38, top: -40, gap: 54 }))
      sparkles(x, t, 790, 880, P.t0 + 1.0, 6, 200, 0.2)
      label(x, 790, 1165, 'VERIFIED ICON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Bio requirements: | *forty-two.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.4) * 5.99)
      profile(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, 'MUST:', x => lines(x, ['1. punctual', '2. no typos', '3. coasters', '4. …', '42. flosses'], { size: 28, top: -95, gap: 52, n }))
      label(x, 790, 1165, 'NON-NEGOTIABLE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still choosing | *the first word.*', mood: lt => lt > 1.5 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const W = ['Hi', 'Hello', 'Hey', 'Hi!', 'Greetings']
      const n = Math.floor(lt * 2.5) % W.length
      profile(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, 'LIBRA', x => {
        lines(x, [W[n] + ((t * 2) % 1 < 0.5 ? '|' : '')], { size: 40, top: -40 })
      })
      label(x, 790, 1165, 'DRAFT: DAY 40', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Bio is one word: | *“Maybe.”*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      profile(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, 'SCORPIO', x => {
        if (lt > 0.7) lines(x, ['Maybe.'], { size: 48, top: 0 })
      })
      bubble(x, 790, 640, 'intrigued?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: '“Back in a month.” | Bio *since 2019.*', mood: 'sparkle', star: { x: 160 }, hops: [0.5, 1.3],
    front(x, t, lt, P) {
      profile(x, 320, 860, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, 'AWAY', x => lines(x, ['back in a', 'month!'], { size: 36, top: -40, gap: 52 }))
      label(x, 320, 1165, 'POSTED: 2019', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'The bio | is a *résumé.*', mood: 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.2) * 4.99)
      profile(x, 320, 860, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, 'CURRICULUM', x => lines(x, ['EXPERIENCE: 9 yrs', 'SKILLS: Excel', 'GOALS: you, Q3', 'HOBBIES: work'], { size: 24, top: -90, gap: 56, n, font: `700 24px ${MONO}` }))
      label(x, 320, 1165, 'REFERENCES ON REQUEST', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 26, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Wrote the bio | in *their own alphabet.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      profile(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, '◊∆ ⌘◊', x => {
        const G = ['⌘◊∆ ⊕⊗', '∆∇ ◊⌘⊕', '⊗∆◊ ⌘', '◊⊕∇∆']
        lines(x, G, { size: 34, top: -90, gap: 56, n: Math.floor(clamp((lt - 0.3) / 1.0) * 4.99), font: `700 34px ${MONO}` })
      })
      label(x, 790, 1165, 'TRANSLATION: SOON', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'The bio is a poem. | *Made them cry.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      profile(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), P.color, 'PISCES', x => lines(x, ['the moon', 'and i', 'are both', 'so alone…'], { size: 30, top: -90, gap: 52, font: `italic 500 34px 'EB Garamond', Georgia, serif` }))
      label(x, 790, 1165, 'STANZA 1 OF 30', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t014', key: 'F', accent: PINK, ending: 'group',
  title: 'The signs write | a *dating bio.*',
  cameos: CAMEOS,
  group: {
    cap: 'Read every bio. | Matched *anyway.*',
    moods: Array(12).fill('heart'),
    draw(x, t, lt) {
      label(x, 540, 660, '✦ 12 NEW MATCHES', pop01(t, t - lt + 1.6, 0.35, 2.4), { size: 58, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 1000, t - lt + 1.9, { n: 10, life: 2.4, spread: 800, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
