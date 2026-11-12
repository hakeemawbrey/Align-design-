// r2t0055: star_talk, SOLO, "Leos making plans | be like." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): Leo making plans, every plan pushed to the extreme.
//   0.0–3.6    "Leos making plans | *be like.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              dinner for four? booked a ballroom · made a group chat, named it after themself · movie night: red carpet,
//              velvet rope · the plan has a theme: gold, mandatory · brunch at 11, arrived 11:40 for the entrance · picked
//              the restaurant with the best lighting · planned a first date: a six-page itinerary · plans fell through?
//              hosted it at home, bigger (a disco ball) · your birthday? Leo made you the star
//  37.8        "Big plans. | *Bigger heart.*"  Leo comes back, big.
//  41.0        LESSON: "Let a Leo plan. | Just *show up glowing.*"  STATUS: INVITED
//  46.9        "Your invite? | *Dress code: gold.*"  The gold invitation comes back.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const ORANGE = '#f39a3a', CREAM = '#fff4e2', RED = '#e23d4e', VELVET = '#b0203a'
const S = 'leo'

const DISCO = [
  '...SSSS...',
  '..SsSSsS..',
  '.SSSsSSSS.',
  'SsSSSSsSSS',
  'SSSsSSSSsS',
  'SSSSSsSSSS',
  '.SsSSSSsS.',
  '..SSsSSS..',
  '...SSSS...',
]

function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, edge = INK } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const txt = (x, s, X, Y, font, col = INK, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

// the gold invitation (card 4, and the last line)
function invite(x, t, cx, cy, k, lt, s = 1) {
  if (!card(x, cx, cy, 300 * s, 360 * s, k, { rot: -0.04, bg: GOLD })) return
  x.scale(s, s)
  x.fillStyle = '#fff1b0'; x.fillRect(-134, -164, 268, 328)
  x.strokeStyle = '#c98f2a'; x.lineWidth = 4; x.strokeRect(-120, -150, 240, 300)
  txt(x, 'You’re invited', 0, -96, `italic 500 40px ${SERIF}`)
  txt(x, '✦', 0, -40, `700 40px ${INTER}`, '#c98f2a')
  txt(x, 'DRESS CODE:', 0, 20, `700 24px ${MONO}`)
  const g = lt > 1.0
  txt(x, g ? 'GOLD.' : '…', 0, 70, `800 50px ${INTER}`, g ? VELVET : INK)
  if (g) txt(x, '(mandatory)', 0, 116, `italic 700 22px ${INTER}`, '#6b62a8')
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Dinner for four? | *Booked a ballroom.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      if (card(x, 790, 850, 300, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })) {
        x.fillStyle = ORANGE; x.fillRect(-150, -150, 300, 56); txt(x, 'RESERVATION', 0, -122, `700 24px ${MONO}`)
        txt(x, 'Party of: 4', 0, -50, `800 30px ${INTER}`)
        txt(x, 'Room:', 0, 10, `800 30px ${INTER}`)
        if (lt > 1.0) txt(x, 'GRAND BALLROOM', 0, 64, `800 30px ${INTER}`, VELVET)
        x.restore()
      }
      label(x, 790, 1080, 'CHANDELIER: YES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Made a group chat. | Named it *after themself.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.15],
    front(x, t, lt, P) {
      if (card(x, 790, 850, 280, 410, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#2a2350' })) {
        x.fillStyle = '#140c30'; x.fillRect(-124, -182, 248, 364)
        x.fillStyle = ORANGE; x.fillRect(-110, -166, 220, 54)
        const s = '♌︎ LEO & FRIENDS', n = Math.floor(clamp((lt - 0.4) / 0.7) * s.length)
        txt(x, s.slice(0, n), 0, -138, `700 22px ${MONO}`)
        ;[['who’s in?? ✦', BONE, 1.2], ['me!', MINT, 1.5], ['me too', PINK, 1.7]].forEach(([m, c, at], i) => {
          if (lt < at) return; x.font = `800 24px ${INTER}`; const w = x.measureText(m).width + 28; const X = i ? 20 : -20
          x.fillStyle = c; x.fillRect(X - w / 2, -60 + i * 66 - 24, w, 48); txt(x, m, X, -58 + i * 66, `800 24px ${INTER}`)
        })
        x.restore()
      }
    } },
  { sign: S, cap: 'Movie night? | *Red carpet. Velvet rope.*', mood: 'sparkle', star: { x: -40, y: -30, s: 260 }, hops: [0.8],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.1, 0.8))
      if (k > 0.01) { x.fillStyle = INK; x.beginPath(); x.moveTo(470, 980); x.lineTo(610, 980); x.lineTo(650 + 150 * k, 1210); x.lineTo(430 - 150 * k, 1210); x.fill(); x.fillStyle = VELVET; x.beginPath(); x.moveTo(476, 986); x.lineTo(604, 986); x.lineTo(640 + 146 * k, 1204); x.lineTo(440 - 146 * k, 1204); x.fill() }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      for (const sx of [-1, 1]) if (k > 0.01) { const px = 540 + sx * 290; x.fillStyle = INK; x.fillRect(px - 12, 900, 24, 220); x.fillStyle = GOLD; x.fillRect(px - 8, 904, 16, 212); x.fillRect(px - 24, 884, 48, 26) }
      if (k > 0.01) { x.strokeStyle = VELVET; x.lineWidth = 14; for (const sx of [-1, 1]) { x.beginPath(); x.moveTo(540 + sx * 290, 910); x.quadraticCurveTo(540 + sx * 230, 990 * k + 10 * (1 - k), 540 + sx * 175, 940); x.stroke() } }
      label(x, 540, 640, 'NOW SHOWING: US', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The plan has a theme. | *Gold. Mandatory.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.05],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      invite(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      sparkles(x, t, 790, 850, P.t0 + 1.0, 8, 200, 0.4)
    } },
  { sign: S, cap: 'Brunch at 11. | *Arrived 11:40. Entrance.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 116, 0, Math.PI * 2); x.fill()
        x.save(); x.rotate(lerp(0, 0.67, ease.inOutCubic(prog(lt, 0.3, 1.1))) * Math.PI * 2); x.fillStyle = INK; x.fillRect(-5, -96, 10, 96); x.restore()
        x.save(); x.rotate((11 / 12) * Math.PI * 2 + 0.3); x.fillStyle = ORANGE; x.fillRect(-7, -60, 14, 60); x.restore()
        x.restore()
      }
      label(x, 790, 1060, 'FASHIONABLY LATE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 400, 860, P.t0 + 1.3, 8, 180, 0.2)
    } },
  { sign: S, cap: 'Picked the restaurant. | *Best lighting wins.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.4],
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(F.x - 30, 470); x.lineTo(F.x + 30, 470); x.lineTo(F.x + 190, 1100); x.lineTo(F.x - 190, 1100); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      if (card(x, 790, 850, 290, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })) {
        txt(x, 'REVIEWS', 0, -120, `700 24px ${MONO}`, ORANGE)
        txt(x, 'Food: ★★', -120, -50, `800 28px ${INTER}`, INK, 'left'); txt(x, 'Service: ★★', -120, 0, `800 28px ${INTER}`, INK, 'left')
        txt(x, 'Lighting: ★★★★★', -120, 60, `800 28px ${INTER}`, VELVET, 'left')
        x.restore()
      }
      label(x, 790, 1090, 'BOOKED.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Planned a first date. | *Six-page itinerary.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.35],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.18))
      for (let i = n - 1; i >= 0; i--) {
        if (!card(x, 790 + i * 14, 860 + i * 10, 260, 340, k, { rot: 0.04 + i * 0.03 })) continue
        if (i === 0) { txt(x, '✦ DATE NIGHT ✦', 0, -130, `700 22px ${MONO}`, ORANGE); ['6:00 arrive', '6:05 compliment', '6:10 sunset', '6:30 photos'].forEach((s, j) => txt(x, s, -108, -70 + j * 48, `800 24px ${INTER}`, INK, 'left')); txt(x, 'p. 1 / 6', 0, 140, `700 20px ${MONO}`, '#6b62a8') }
        x.restore()
      }
    } },
  { sign: S, cap: 'Plans fell through? | *Hosted it. Bigger.*', mood: 'sparkle', star: { x: -180, y: 30 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      x.save(); x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(760, 470); x.lineTo(760, 520 + 140 * k); x.stroke(); x.restore()
      drawBits(x, DISCO, { S: '#d8dbe8', s: '#9a9ab0' }, 760, 660 + 140 * k - 140 + 140, 20 * k, { rot: t * 0.6 })
      if (k > 0.5) for (let i = 0; i < 8; i++) { const a = t * 1.5 + i * 0.8; x.fillStyle = [GOLD, PINK, SKYB, MINT][i % 4]; x.globalAlpha = 0.8; x.fillRect(760 + Math.cos(a) * 200, 900 + Math.sin(a) * 150, 14, 14); x.globalAlpha = 1 }
      label(x, 760, 1100, 'GUESTS: EVERYONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your birthday? | Leo made you *the star.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -220, s: 250 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.32 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(740, 470); x.lineTo(820, 470); x.lineTo(940, 1100); x.lineTo(620, 1100); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 780, 920, 220 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 1.5] })
      label(x, 780, 650, 'IT’S YOUR DAY ✦', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 900, P.t0 + 1.3, 9, 200, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2t0055', key: 'F', accent: ORANGE, solo: S, ending: 'lesson',
  title: 'Leos making plans | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Big plans. | *Bigger heart.*', mood: 'sparkle' },
  lesson: { text: 'Let a Leo plan. | Just *show up glowing.*', chip: 'STATUS: INVITED' },
  last: {
    text: 'Your invite? | *Dress code: gold.*',
    draw(x, t, lt) { invite(x, t, 540, 1290, pop01(t, t - lt + 0.5, 0.35, 2), lt + 1, 1.1) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
