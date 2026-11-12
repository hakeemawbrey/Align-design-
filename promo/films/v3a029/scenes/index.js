// v3a029: star_advice, ADVICE ROLLCALL, "What each sign | needs to hear." (~63 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, the one kind sentence each sign needs, with one light gag each.
//   0.0–3.6    "What each sign | *needs to hear.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ you don't have to win this one (game night: "you go first!") · ♉ change can be cozy too (the armchair
//              moved: new spot, same nap) · ♊ your mind is a gift (idea bulbs) · ♋ your needs matter too (ME, top of the
//              list) · ♌ you're loved offstage too (curtain closed: "hi, just you!") · ♍ done is better than perfect (a
//              wobbly drawing: SHIPPED IT) · ♎ it's okay to pick one (chose mint) · ♏ letting people in is brave (the sign
//              flips: COME IN) · ♐ rest is part of the trip (a hammock) · ♑ you can stop (OUT OF OFFICE) · ♒ your weird is
//              wonderful (1 OF 1) · ♓ your tears water things (a flower grows)
//  49.2        "Everyone | *needed that.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Say it to a friend. | *Mean it.*"  HEART: HEARD
//  58.3        "Cap rested. | Pisces *sent flowers.*" over the match card: Capricorn + Pisces.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

// ── small prop helpers (local to this film)
const RED = '#e23d4e', ROSE = '#ff9ccf', WOOD = '#c98f2a', CREAM = '#fff4e2', ORANGE = '#ffb34a', GREEN = '#5fd068'
/** a bone card with an ink outline and a soft shadow; fn draws inside, in local coords centred on the card */
function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head = null, headH = 56 } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = head; x.fillRect(-w / 2, -h / 2, w, headH) }
  if (fn) fn()
  x.restore()
}
/** text helper */
function say(x, s, px, py, { size = 34, color = INK, font = INTER, weight = 800, align = 'center' } = {}) {
  x.font = `${weight} ${size}px ${font}`; x.fillStyle = color; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
/** a phone; fn draws on its screen (local coords, screen 224 × 330 centred) */
function phone(x, cx, cy, k, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -165, 224, 330)
  if (fn) fn()
  x.restore()
}

// ── props
const DIE = ['WWWWWW', 'WKWWWW', 'WWWWWW', 'WWWKWW', 'WWWWWW', 'WWWWKW']
const CHAIR = ['.PPPPPP.', 'PPPPPPPP', 'PPPPPPPP', 'PPLLLLPP', 'PPLLLLPP', 'PPPPPPPP', 'W......W']
const BULB = ['.YYY.', 'YYWYY', 'YYYYY', 'YYYYY', '.YYY.', '.GGG.', '.GGG.']
const CONE = ['.MMM.', 'MMMMM', 'MMMMM', '.WWW.', '.WWW.', '..W..']
const HAMMOCK = ['W............W', 'W............W', 'WHH........HHW', 'W.HHHHHHHHHH.W', 'W..HHHHHHHH..W', 'W............W', 'W............W']
const MEDAL = ['R.....R', '.R...R.', '..RRR..', '.YYYYY.', 'YYYWYYY', 'YYWYYYY', 'YYYYYYY', '.YYYYY.']
const FLOWER = ['.P.P.', 'PYPYP', '.PYP.', '..G..', 'G.G..', '.GG.G', '..GG.', '..G..']
const BOUQUET = ['P.R.P', 'RPYPR', '.PRP.', '..G..', '.GGG.', '..G..']

const CAMEOS = [
  { sign: 'aries', cap: 'You don’t have to | *win this one.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 820, 1000, 170 * k, { mood: lt > 1.3 ? 'sparkle' : 'happy', look: [-1, 0], seed: 121, glyph: false, hops: [P.t0 + 1.6] })
      drawBits(x, DIE, { W: '#fff', K: INK }, 600, 1090, 12 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: t * 3 * (lt < 1 ? 1 : 0) + 0.3 })
      bubble(x, 560, 680, 'you go first!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 760, 1160, 'GAME NIGHT: CHILL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Change can be | *cozy too.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const mv = ease.inOutCubic(prog(lt, 0.4, 1.1))
      drawBits(x, CHAIR, { P: '#2fc79a', L: '#9ff0cc', W: WOOD }, lerp(900, 760, mv), 980, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.4 && lt < 1.2) { x.fillStyle = GOLD; x.fillRect(820, 820, 100 * (1 - mv), 14) }
      label(x, 790, 720, 'NEW SPOT. SAME NAP.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Your busy mind | *is a gift.*', mood: 'sparkle', look: [1, -1], star: { x: -200 },
    front(x, t, lt, P) {
      ;[[660, 780], [790, 700], [920, 790], [720, 940], [880, 950]].forEach(([bx, by], i) =>
        drawBits(x, BULB, { Y: GOLD, W: '#fff', G: '#8d86a8' }, bx, by + 6 * Math.sin(t * 3 + i), 12 * pop01(t, P.t0 + 0.2 + i * 0.22, 0.3, 2.4)))
      label(x, 790, 1120, 'IDEAS: PLENTY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Your needs | *matter too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04, head: SKYB, headH: 60 }, () => {
        say(x, 'TAKE CARE OF:', 0, -160, { size: 26, font: MONO, weight: 700 })
        const L = ['ME', 'mom', 'friends', 'the plants']
        L.forEach((s, i) => {
          if (i === 0) { const m = pop01(t, P.t0 + 1.0, 0.3, 2.4); if (m > 0.01) { x.save(); x.translate(0, -90); x.scale(m, m); x.fillStyle = PINK; x.fillRect(-120, -28, 240, 56); say(x, 'ME ♡', 0, 2, { size: 40 }); x.restore() } return }
          say(x, s, 0, -90 + i * 64, { size: 34, color: '#8d86a8' })
        })
      })
      label(x, 790, 1130, 'TOP OF THE LIST', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'You’re loved | *offstage too.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.35, 1.6)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k
      for (let i = 0; i < 2; i++) { x.fillStyle = INK; x.fillRect(130 + i * 200, 490, 200, 740); x.fillStyle = '#b8323f'; x.fillRect(136 + i * 200, 490, 188, 734); x.fillStyle = '#d4485a'; for (let j = 0; j < 4; j++) x.fillRect(150 + i * 200 + j * 45, 490, 14, 734) }
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 990, 180 * k, { mood: 'heart', look: [-1, 0], seed: 122, glyph: false, hops: [P.t0 + 1.0] })
      bubble(x, 760, 700, 'hi! just you, | no show.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Done is better | *than perfect.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      card(x, 790, 850, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.03 }, () => {
        const p = clamp((lt - 0.4) / 0.9)
        x.strokeStyle = '#ff4f86'; x.lineWidth = 9; x.beginPath()
        for (let i = 0; i <= 40 * p; i++) { const a = i / 40 * Math.PI * 2, r = 90 + 12 * Math.sin(i * 1.7); i ? x.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.9) : x.moveTo(Math.cos(a) * r, Math.sin(a) * r * 0.9) }
        x.stroke()
      })
      label(x, 790, 1100, 'SHIPPED IT.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'It’s okay | *to pick one.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: lt => [lt < 1.1 ? (Math.floor(lt * 3) % 2 ? 1 : -1) : 1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const pick = ease.inOutCubic(prog(lt, 1.0, 1.4))
      drawBits(x, CONE, { M: '#9ff0cc', W: '#e7b46a' }, 700, 880 - 40 * pick, (30 + 6 * pick) * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, CONE, { M: PINK, W: '#e7b46a' }, 880, 880, 30 * pop01(t, P.t0 + 0.35, 0.35, 2), { alpha: 1 - 0.6 * pick })
      label(x, 790, 1110, 'MINT. NO REGRETS.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Letting people in | *is brave.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const flip = prog(lt, 0.9, 1.3), sx = Math.abs(Math.cos(Math.PI * flip)), back = flip > 0.5
      card(x, 790, 860, 330, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0, bg: back ? MINT : '#c9c4d8' }, () => {
        x.scale(Math.max(0.02, sx), 1)
        say(x, back ? 'COME IN ♡' : 'DO NOT', 0, back ? 2 : -30, { size: 42 })
        if (!back) say(x, 'DISTURB', 0, 30, { size: 42 })
      })
      x.fillStyle = INK; x.fillRect(786, 680, 8, 80)
      label(x, 790, 1110, 'TRUST: UNLOCKED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Rest is part | *of the trip.*', mood: 'sleepy', star: { x: 0, y: -40, s: 220 },
    back(x, t, lt, P) { drawBits(x, HAMMOCK, { W: WOOD, H: '#ffb34a' }, 540, 920, 44 * pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 540, 640, 'BREAK STOP', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 540, 1150, 'BACK ON THE ROAD: LATER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'You can stop. | *You earned it.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(600, 1010, 360, 24); x.fillStyle = WOOD; x.fillRect(606, 1016, 348, 14)
      card(x, 790, 900, 300, 150, pop01(t, P.t0 + 0.4, 0.35, 2), { rot: -0.04, bg: GOLD }, () => { say(x, 'OUT OF', 0, -26, { size: 42 }); say(x, 'OFFICE', 0, 26, { size: 42 }) })
      label(x, 790, 720, 'BACK: MONDAY. MAYBE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Your weird | *is wonderful.*', mood: 'sparkle', star: { x: -190 }, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, MEDAL, { R: SKYB, Y: GOLD, W: '#fff' }, 790, 860, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1080, 'ONE OF ONE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 8, 200, 0.3)
    } },
  { sign: 'pisces', cap: 'Your tears | *water things.*', tears: 3, mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.3, 0.3, 1.6); x.fillStyle = INK; x.beginPath(); x.ellipse(780, 1100, 150, 34, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = SKYB; x.beginPath(); x.ellipse(780, 1098, 140, 26, 0, 0, Math.PI * 2); x.fill(); x.restore()
      const g = ease.outBack(prog(lt, 0.8, 1.5))
      if (g > 0.01) drawBits(x, FLOWER, { P: PINK, Y: GOLD, G: GREEN }, 780, 1080 - 130 * g, 26 * g)
      label(x, 790, 700, 'IT GREW.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a029', key: 'G', accent: SKYB, ending: 'card',
  title: 'What each sign | *needs to hear.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'pisces', chip: 'ALIGNED' },
  group: { cap: 'Everyone | *needed that.*' },
  lesson: { text: 'Say it to a friend. | *Mean it.*', chip: 'HEART: HEARD' },
  last: {
    text: 'Cap rested. | Pisces *sent flowers.*',
    draw(x, t, lt) { drawBits(x, BOUQUET, { P: PINK, R: RED, Y: GOLD, G: GREEN }, 730, 800, 16 * pop01(t, t - lt + 1.5, 0.35, 2), { rot: 0.15 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
