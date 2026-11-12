// v3t027: THE SIGNS AS… v3, "Friend has drama? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · D)
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Friend has drama? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   how each sign shows up when a friend has drama (3.8 s each), pushed to the extreme:
//              ♈ ready to fight, hasn't heard the story · ♉ advice: "block them." done · ♊ told three people, by accident
//              · ♋ moved them into the spare room · ♌ made it about Leo · ♍ checked the ex's chart, called it
//              · ♎ stayed friends with both sides · ♏ holds the grudge for you, forever · ♐ said "move on!", moved cities
//              · ♑ wrote a recovery plan · ♒ narrated it like a documentary · ♓ cried for both of you
//  49.2        "The drama? | *Handled.*"  The twelve fly up into a group photo.
//  52.6        callback: "They made up. | *Scorpio didn’t.*" (the grudge ledger comes back: STILL KEPT).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', GREEN = '#2fc79a'
const pad = bm => { const w = Math.max(...bm.map(r => r.length)); return bm.map(r => r.padEnd(w, '.')) }

const GLOVE = pad(['.RRRR..', 'RRRRRR.', 'RRRRRRR', 'RRRRRRR', 'RRRRRR.', '.RRRR..', '.WWWW..', '.WWWW..'])
const CASE = pad(['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', '.K......K.'])
const PILLOW = pad(['.WWWWWWWWW.', 'WWWWWWWWWWW', 'WWWWWWWWWWW', '.WWWWWWWWW.'])
const BLANKET = pad(['PPPPPPPPPPPPPP', 'PLPPLPPLPPLPPL', 'PPPPPPPPPPPPPP', 'PLPPLPPLPPLPPL', 'PPPPPPPPPPPPPP'])

function card(x, cx, cy, k, w, h, rot, bg, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn(); x.restore()
}
function ledger(x, cx, cy, k, still) {
  card(x, cx, cy, k, 300, 300, -0.04, '#3a2f63', () => {
    x.fillStyle = '#c97bff'; x.fillRect(-150, -150, 300, 56)
    x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.fillText('GRUDGES', 0, -122)
    x.font = `700 24px ${MONO}`; x.textAlign = 'left'
    ;['the ex: KEPT', 'their mom: KEPT', 'their dog: ok'].forEach((r, i) => x.fillText(r, -126, -54 + i * 46))
    x.textAlign = 'center'; x.fillStyle = GOLD; x.font = `800 26px ${INTER}`; x.fillText(still ? 'STILL KEPT.' : 'SINCE: TODAY', 0, 108)
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ready to fight. | Hasn’t heard *the story.*', mood: 'sparkle', star: { x: -160 }, hops: [0.4, 0.8, 1.2, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, GLOVE, { R: RED, W: '#fff4e2' }, F.x + 170, F.cy + 30 + 10 * Math.sin(t * 12), 14 * k)
      bubble(x, 790, 700, 'WHO?? | WHERE??', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 800, 1050, 'wait, what happened?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl', col: '#c9c2da' })
    } },
  { sign: 'taurus', cap: 'Advice: | *“Block them.”* Done.', mood: 'neutral', star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      const press = lt > 1.2 ? 8 : 0
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -30, 280, 110); x.fillStyle = '#5b2e1a'; x.fillRect(-132, -22, 264, 94)
        x.fillStyle = INK; x.fillRect(-110, -90 + press, 220, 100); x.fillStyle = RED; x.fillRect(-102, -82 + press, 204, 84)
        x.fillStyle = '#fff4e2'; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BLOCK', 0, -40 + press)
        x.restore()
      }
      label(x, 790, 1070, 'NEXT TOPIC', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Told three people. | *By accident.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.4) + 1)
      for (let i = 0; i < n; i++) bubble(x, 760 + (i % 2) * 40, 660 + i * 150, ['so, ANYWAY…', 'don’t tell anyone', 'oops.'][i], pop01(t, P.t0 + 0.3 + i * 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1130, 'TOLD: 3', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Moved them in. | *Spare room’s ready.*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, BLANKET, { P: PINK, L: '#ffc2d4' }, 790, 1040, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PILLOW, { W: '#fff4e2' }, 690, 970, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 780, 'STAY FOREVER', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.05 })
      hearts(x, t, 790, 980, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 1 })
    } },
  { sign: 'leo', cap: 'Listened. Then | made it *about Leo.*', mood: 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'that’s awful…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 900, 'anyway, ME:', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 50, tail: 'bl', col: ORANGE })
      sparkles(x, t, 790, 900, P.t0 + 1.3, 6, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'Checked the ex’s chart. | *Called it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 780, 850, 1.22 * pop01(t, P.t0 + 0.2, 0.35, 2), 300, 300, 0.05, '#fff4e2', () => {
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('THE EX: CHART', 0, -110)
        x.font = `700 24px ${MONO}`; x.textAlign = 'left'
        ;['sun: chaos', 'moon: also chaos', 'rising: red flag'].forEach((r, i) => x.fillText(r, -126, -46 + i * 48))
        x.textAlign = 'center'; x.fillStyle = RED; x.font = `800 28px ${INTER}`; if (lt > 1.2) x.fillText('TOLD YOU.', 0, 112)
      })
    } },
  { sign: 'libra', cap: 'Stayed friends | *with both sides.*', mood: 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: 0, y: 40 },
    front(x, t, lt, P) {
      label(x, 300, 760, 'TEAM YOU', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: PINK, rot: -0.06 })
      label(x, 780, 760, 'TEAM THEM', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: SKYB, rot: 0.06 })
      label(x, 540, 1150, 'BRUNCH WITH BOTH', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.03 })
    } },
  { sign: 'scorpio', cap: 'Holds the grudge. | *For you.* Forever.', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { ledger(x, 780, 850, 1.25 * pop01(t, P.t0 + 0.2, 0.35, 2), false) } },
  { sign: 'sagittarius', cap: 'Said “move on!” | Then *moved cities.*', mood: 'sparkle', star: { x: 150 }, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      bubble(x, 330, 660, 'just move on!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'br' })
      drawBits(x, CASE, { K: INK, B: '#ff9a4a', Y: GOLD }, 320, 930, 26 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: -0.05 })
      label(x, 320, 1120, 'SEE YOU SOMEDAY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Wrote a | *recovery plan.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 780, 850, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), 310, 340, 0.04, '#fff4e2', () => {
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('RECOVERY PLAN', 0, -132)
        x.font = `700 24px ${MONO}`; x.textAlign = 'left'
        const n = Math.min(5, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.3))
        ;['1. cry (15 min)', '2. hydrate', '3. new haircut', '4. gym, 6 a.m.', '5. new match'].slice(0, n).forEach((r, i) => x.fillText(r, -132, -76 + i * 46))
      })
    } },
  { sign: 'aquarius', cap: 'Narrated it | *like a documentary.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 760, 'and here, the ex, | in its natural | habitat…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl', col: MINT })
      label(x, 790, 1030, 'EPISODE 4', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Felt it all. | *Cried for both of you.*', mood: 'wide', tears: 3, star: { x: -160 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.8) * 11)
      label(x, 790, 780, `TISSUES: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'I’m fine, | YOU cry!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t027', key: 'D', accent: '#c97bff', ending: 'callback',
  title: 'Friend has drama? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'The drama? | *Handled.*' },
  last: {
    text: 'They made up. | *Scorpio didn’t.*',
    draw(x, t, lt) { ledger(x, 540, 1100, 2 * pop01(t, t - lt + 0.3, 0.4, 2), true) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
