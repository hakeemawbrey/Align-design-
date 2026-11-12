// r2a0574: star_advice, ADVICE ROLL CALL, "Each sign | *outside their comfort zone.*" (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each gently stepping out of its comfort zone: one warm, specific line and a light gag. Ending: group.
//   0.0–3.6    "Each sign | *outside their comfort zone.*"
//   3.6–49.2   ♈ waited their turn · ♉ let their match choose, new favourite · ♊ sat in silence for a whole minute
//              · ♋ said no and stayed kind · ♌ let someone else shine · ♍ left one dish in the sink · ♎ sent the first
//              message, no drafts · ♏ shared a feeling out loud · ♐ stayed home all weekend · ♑ played a game just for fun
//              · ♒ matched their friends on purpose · ♓ asked for a hug (happy tears)
//  49.2        "Comfort zone? | *Just a starting line.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#b7a6ff', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

const PLATE = ['..WWWWWWW..', '.WWWWWWWWW.', 'WWWWSSWWWWW', 'WWWSSSSWWWW', '.WWWWWWWWW.', '..WWWWWWW..']
const DIE = ['KKKKKKKKK', 'KWWWWWWWK', 'KWKWWWKWK', 'KWWWWWWWK', 'KWWWKWWWK', 'KWWWWWWWK', 'KWKWWWKWK', 'KWWWWWWWK', 'KKKKKKKKK']
const SWEATER = ['.SS...SS.', 'SSSSSSSSS', 'SSHSSSHSS', 'SSSSSSSSS', '.SSSHSSS.', '.SSSSSSS.', '.SSSSSSS.']
const MUG = ['.WWWWW..', 'WCCCCCWW', 'WCCCCCW.W', 'WCCCCCWW', 'WCCCCCW.', '.WWWWW..']

function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
function txt(x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

const LS = { x: -170 }, RS = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Waited their turn. | *Look at you, growing.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: LS, squash: lt => lt < 1.2 ? 0.04 * Math.sin(lt * 30) : 0,
    front(x, t, lt, P) {
      card(x, 800, 860, 260, 220, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        txt(x, 'NOW SERVING', 0, -70, 24, INK, MONO, 700)
        const n = 38 + Math.min(4, Math.floor(clamp((lt - 0.3) / 1.2) * 4))
        txt(x, String(n), 0, 0, 72, RED, MONO, 700); txt(x, 'YOU: 42', 0, 72, 26, '#4a4470', MONO, 700)
      })
      L(x, 800, 1110, 'PATIENCE: UNLOCKED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Let their match choose. | *New favourite.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: PAPER, S: lt > 1.2 ? '#5fd068' : GREY }, 800, 950, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 700, 'trust me!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: PINK, tail: 'br' })
      L(x, 800, 1120, 'NEW FAVOURITE', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 32)
      if (lt > 1.4) hearts(x, t, 800, 900, P.t0 + 1.8, { n: 4, life: 1.3, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'gemini', cap: 'Sat in silence. | *A whole minute.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [0, 0], star: LS,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 880); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 120, 0, 7); x.fill(); x.fillStyle = PAPER; x.beginPath(); x.arc(0, 0, 108, 0, 7); x.fill()
        x.rotate(clamp((lt - 0.3) / 1.8) * Math.PI * 2); x.fillStyle = RED; x.fillRect(-5, -96, 10, 100); x.restore()
      }
      L(x, 800, 680, 'SHH: 60 SEC', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 34)
      L(x, 800, 1090, 'THOUGHTS: PEACEFUL', pop01(t, P.t0 + 1.8, 0.3, 2.2), SKYB, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Said no. | *And stayed kind.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'can you cover | my shift again?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
      bubble(x, 800, 930, 'no, thank you.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      L(x, 800, 1120, 'BOUNDARY: SET', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Let someone else shine. | *Still glowing.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: LS,
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.7))
      if (k > 0.01) { x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(770, 480); x.lineTo(830, 480); x.lineTo(930, 1100); x.lineTo(670, 1100); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      signChar(x, t, 'virgo', 800, 990, 200 * pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 0.8 ? 'sparkle' : 'wide', seed: 16, glyph: false, hops: [P.t0 + 1.0] })
      L(x, 800, 700, 'YOUR MOMENT, BESTIE', pop01(t, P.t0 + 1.0, 0.3, 2.2), ORANGE, -0.04, 28)
      sparkles(x, t, 420, 850, P.t0 + 1.6, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Left one dish in the sink. | *Still fine.*', mood: lt => lt > 1.6 ? 'happy' : 'wide', look: [1, 0.5], star: LS, squash: lt => lt < 1.4 ? 0.03 * Math.sin(lt * 40) : 0,
    front(x, t, lt, P) {
      card(x, 800, 1000, 300, 120, pop01(t, P.t0 + 0.2, 0.3, 2), 0, x => { x.fillStyle = '#9aa5c4'; x.fillRect(-130, -40, 260, 80) }, '#c9c9d8')
      drawBits(x, PLATE, { W: PAPER, S: ORANGE }, 800, 970, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.3 })
      L(x, 800, 700, 'DISHES: 1 (ONE)', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, -0.04, 32)
      L(x, 800, 1140, 'WORLD: STILL SPINNING', pop01(t, P.t0 + 1.7, 0.3, 2.2), SKYB, 0.04, 26)
    } },
  { sign: 'libra', cap: 'Sent the first message. | *No drafts.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: LS, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 800, 880, 260, 380, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, x => {
        x.fillStyle = '#140c30'; x.fillRect(-114, -174, 228, 348)
        txt(x, 'NEW MATCH ✦', 0, -130, 30, PINK, MONO, 700)
        if (lt > 0.8) { x.fillStyle = PINK; x.fillRect(-90, -70, 180, 80); txt(x, 'hi! :)', 0, -30, 44, INK) }
        if (lt > 1.2) txt(x, 'sent ✓', 40, 40, 30, MINT, MONO, 700)
      }, '#2a2350')
      L(x, 800, 1120, 'DRAFTS: ZERO', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Shared a feeling. | *Out loud. Wow.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'i felt… | a little hurt.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      L(x, 800, 990, 'VAULT: OPENED (1 INCH)', pop01(t, P.t0 + 1.3, 0.3, 2.2), '#c97bff', 0.04, 26, PAPER)
      if (lt > 1.4) hearts(x, t, 560, 820, P.t0 + 1.8, { n: 4, life: 1.3, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'sagittarius', cap: 'Stayed home all weekend. | *Cozy counts.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [-1, 0], star: RS,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      card(x, 710, 990, 300, 130, k, -0.02, x => { for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#c97bff' : LAV; x.fillRect(-150 + i * 60, -65, 60, 130) } }, LAV)
    },
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: PAPER, C: BROWN }, 300, 900, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 300, 690, 'PASSPORT: NAPPING', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Played a game | *just for fun.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: LS, hops: [1.3],
    front(x, t, lt, P) {
      const r = lt < 1.0 ? Math.sin(lt * 18) * 0.6 : 0.1
      drawBits(x, DIE, { K: INK, W: PAPER }, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: r })
      L(x, 800, 690, 'GOAL: NONE', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, -0.04, 32)
      L(x, 800, 1110, 'SCORE: WHO CARES', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Matched their friends. | *On purpose.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P, F) {
      for (let i = 0; i < 3; i++) drawBits(x, SWEATER, { S: '#ff8fb1', H: PAPER }, 680 + i * 120, 900, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      drawBits(x, SWEATER, { S: '#ff8fb1', H: PAPER }, F.x, F.cy + 80, 12 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 800, 700, 'TWINNING (IRONICALLY?)', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, -0.04, 26)
      L(x, 800, 1100, 'STILL ONE OF A KIND', pop01(t, P.t0 + 1.9, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Asked for a hug. | *Happy tears.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt < 1.0 ? 1 : 2, look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'can i have | a hug?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      const f = ease.outCubic(prog(lt, 0.8, 1.4))
      if (lt > 0.8) signChar(x, t, 'cancer', lerp(1000, 760, f), 990, 200, { mood: 'heart', look: [-1, 0], seed: 13, glyph: false, alpha: f })
      if (lt > 1.4) hearts(x, t, 600, 880, P.t0 + 1.8, { n: 6, life: 1.6, spread: 260, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0574', key: 'E', accent: ACC, ending: 'group',
  title: 'Each sign | *outside their comfort zone.*',
  cameos: CAMEOS,
  group: {
    cap: 'Comfort zone? | *Just a starting line.*',
    moods: ['sparkle', 'heart', 'happy', 'sparkle', 'heart', 'happy', 'sparkle', 'heart', 'sleepy', 'sparkle', 'happy', 'heart'],
    draw(x, t, lt) { L(x, 540, 660, 'COMFORT ZONE: EXPANDED', pop01(t, t - lt + 1.6, 0.3, 2.4), GOLD, -0.04, 38) },
  },
})
export const DURATION = F.DURATION
// the hook's accent line is long: widen the title box so each ' | ' line stays on one line, then scale it to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-160px', width: '1400px', transformOrigin: '50% 0', transform: 'scale(0.76)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
