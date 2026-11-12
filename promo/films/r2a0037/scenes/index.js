// r2a0037: ADVICE SOLO, "Aquarius, you're allowed | to say no." (~50 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Aquarius truth + a warm reframe, one gag each.
// Ending: lesson.
//   0.0–3.6    "Aquarius, you’re allowed | *to say no.*"
//   3.6–37.8   three invites tonight (pick zero) · everyone's tech support (help desk closed) · a night alone (do not
//              disturb) · 999+ group chat (mute it) · "explain your feelings" (LATER is an answer) · weird Saturday plans
//              (stargazing, keep them) · a match wants to talk all night (goodnight is allowed) · "no, but I love you"
//              · practise on a plant ("ok!")
//  37.8        "Different. | And *allowed.*"
//  41.0        LESSON UNLOCKED: "Every “no” | makes room for a *yes.*"  BOUNDARIES: SET
//  46.9        "The plant? | *Respects you.*"  The plant comes back, nodding.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'aquarius', BLUE = '#6fc3ff', RED = '#e23d4e', NAVY = '#2a2350', GREEN = '#7ee08a', TERRA = '#c96a3a', ORANGE = '#ffb34a'
function box(x, l, tp, w, h, col, b = 6) { x.fillStyle = INK; x.fillRect(l - b, tp - b, w + 2 * b, h + 2 * b); x.fillStyle = col; x.fillRect(l, tp, w, h) }
function shadow(x, l, tp, w, h) { x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(l + 10, tp + 12, w, h) }
function txt(x, s, px, py, size, col = INK, { font = INTER, weight = 800, align = 'center' } = {}) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

function invite(x, cx, cy, k, rot, col, word) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  shadow(x, -110, -70, 220, 140); box(x, -110, -70, 220, 140, BONE)
  x.fillStyle = col; x.beginPath(); x.moveTo(-110, -70); x.lineTo(0, 10); x.lineTo(110, -70); x.fill()
  txt(x, word, 0, 42, 26, INK, { font: MONO, weight: 700 })
  x.restore()
}
function laptops(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 4; i++) { const ox = (i % 2 ? 30 : -30), oy = -i * 54; x.save(); x.translate(ox, oy); x.rotate((i % 2 ? 1 : -1) * 0.06); box(x, -130, 0, 260, 34, '#c9c9d8'); box(x, -110, -20, 220, 20, '#8a8aa0', 4); x.restore() }
  x.restore()
}
function doorHanger(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(Math.sin(t * 2) * 0.05); x.scale(k, k)
  shadow(x, -100, -170, 200, 360); box(x, -100, -170, 200, 360, RED)
  x.fillStyle = INK; x.beginPath(); x.arc(0, -110, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, -110, 36, 0, Math.PI * 2); x.fill()
  txt(x, 'DO NOT', 0, 0, 40, '#fff4e2'); txt(x, 'DISTURB', 0, 50, 40, '#fff4e2')
  txt(x, '(recharging)', 0, 120, 22, '#fff4e2', { font: MONO, weight: 700 })
  x.restore()
}
function chatPhone(x, t, cx, cy, k, muted) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  shadow(x, -130, -210, 260, 420); box(x, -130, -210, 260, 420, NAVY); x.fillStyle = '#140c30'; x.fillRect(-114, -180, 228, 360)
  for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#3a2a6a' : '#4a3a8a'; x.fillRect(-100 + (i % 2) * 40, -160 + i * 56 - (muted ? 0 : (t * 120) % 56), 160, 40) }
  x.fillStyle = '#140c30'; x.fillRect(-114, 110, 228, 70)
  // the bell
  x.fillStyle = muted ? '#8a8aa0' : GOLD; x.beginPath(); x.arc(0, 140, 26, Math.PI, 0); x.fill(); x.fillRect(-26, 140, 52, 18); x.fillRect(-6, 158, 12, 10)
  if (muted) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(-36, 110); x.lineTo(36, 176); x.stroke() }
  x.restore()
  if (!muted) label(x, cx + 120, cy - 200, '999+', k, { size: 36, bg: RED, color: '#fff4e2', rot: 0.08, font: MONO, weight: 700 })
}
function signStand(x, cx, cy, k, word) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -8, 0, 16, 220, '#8a4a2e', 4)
  shadow(x, -150, -100, 300, 120); box(x, -150, -100, 300, 120, GOLD)
  txt(x, word, 0, -38, 64, INK, { font: MONO, weight: 700 })
  x.restore()
}
function telescope(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(-70, 170); x.moveTo(0, 0); x.lineTo(70, 170); x.moveTo(0, 0); x.lineTo(0, 170); x.stroke()
  x.strokeStyle = '#8a8aa0'; x.lineWidth = 8; x.stroke()
  x.save(); x.rotate(-0.6); box(x, -40, -30, 200, 60, BLUE); box(x, 160, -40, 30, 80, '#d8dbe8'); box(x, -80, -20, 40, 40, NAVY); x.restore()
  x.restore()
}
const POT = ['TTTTTTTTT', '.TTTTTTT.', '.TTTTTTT.', '..TTTTT..']
function plant(x, t, cx, cy, k, { nod = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.translate(0, -40); x.rotate(Math.sin(nod) * 0.18)
  x.fillStyle = INK; x.fillRect(-8, -120, 16, 124)
  x.fillStyle = GREEN; x.fillRect(-4, -116, 8, 116)
  for (const [lx, ly, s] of [[-50, -90, -1], [50, -60, 1], [-44, -40, -1], [0, -140, 0]]) { x.save(); x.translate(lx, ly); x.rotate(s * 0.4); x.fillStyle = INK; x.fillRect(-36, -18, 72, 36); x.fillStyle = GREEN; x.fillRect(-30, -12, 60, 24); x.restore() }
  // a little face on the top leaf
  x.fillStyle = INK; x.fillRect(-12, -146, 6, 6); x.fillRect(6, -146, 6, 6)
  x.restore()
  drawBits(x, POT, { T: TERRA }, 0, 10, 16)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Three invites tonight? | *Pick zero.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      invite(x, 720, 720, pop01(t, P.t0 + 0.15, 0.3, 2), -0.1, PINK, 'PARTY')
      invite(x, 860, 880, pop01(t, P.t0 + 0.3, 0.3, 2), 0.08, GOLD, 'BRUNCH')
      invite(x, 720, 1030, pop01(t, P.t0 + 0.45, 0.3, 2), -0.04, MINT, 'KARAOKE')
      label(x, 790, 880, 'RSVP: SOFA', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 44, bg: BLUE, rot: -0.08, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Everyone’s tech support? | *Help desk: closed.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      laptops(x, 790, 1040, pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 700, 'HELP DESK', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 42, bg: BONE, font: MONO, weight: 700 })
      label(x, 790, 790, 'CLOSED ✦', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 42, bg: RED, color: '#fff4e2', rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Need a night alone? | *That’s not rude.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { doorHanger(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2)) } },
  { sign: S, cap: 'Group chat exploding? | *Mute it. No guilt.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chatPhone(x, t, 760, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.1)
      sparkles(x, t, 790, 1020, P.t0 + 1.1 * 3.1 / 2.4, 6, 120, 0.4)
    } },
  { sign: S, cap: '“Explain your feelings?” | *Later* is an answer.', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'so… how do you feel?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 30, col: LAV, tail: 'br' })
      signStand(x, 790, 920, pop01(t, P.t0 + 1.0, 0.35, 2.2), 'LATER')
    } },
  { sign: S, cap: 'Weird Saturday plans? | *Keep them.*', mood: 'sparkle', look: [1, -1], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      telescope(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'STARGAZING > PARTY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 900, 680, P.t0 + 1.0, 6, 80, 0.4)
    } },
  { sign: S, cap: 'Up all night chatting? | *Goodnight is allowed.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 690, '✦ NEW MATCH', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 32, bg: PINK, font: MONO, weight: 700 })
      bubble(x, 790, 830, 'one more hour?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: BONE, tail: 'br' })
      bubble(x, 760, 1000, 'goodnight! talk tomorrow', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 28, col: BLUE, tail: 'bl' })
    } },
  { sign: S, cap: 'Another favour? | *“No” can be kind.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'help me move? again?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 28, col: LAV, tail: 'br' })
      bubble(x, 780, 920, 'no. but I love you', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, col: BONE, tail: 'bl' })
      hearts(x, t, 560, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Saying no feels scary? | Practise *on a plant.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plant(x, t, 790, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), { nod: lt > 1.3 ? (t - P.t0) * 6 : 0 })
      bubble(x, 520, 660, 'no.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, tail: 'bc' })
      bubble(x, 830, 700, 'ok!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: GREEN, tail: 'bl' })
    } },
]

function fitTitleScenes(SCENES, maxW = 940) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) {
        const k = (maxW - 8) / widest
        tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'
        for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px'
      }
    }
    return r
  }]
}

const F = makeFilm({
  id: 'r2a0037', key: 'F', accent: BLUE, solo: S, ending: 'lesson',
  title: 'Aquarius, you’re allowed | *to say no.*',
  cameos: CAMEOS,
  group: { cap: 'Different. | And *allowed.*', mood: 'heart' },
  lesson: { text: 'Every “no” | makes room for a *yes.*', chip: 'BOUNDARIES: SET' },
  last: {
    text: 'The plant? | *Respects you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      plant(x, t, 820, 1180, pop01(t, t0 + 0.5, 0.35, 2) * 1.3, { nod: lt > 1.0 ? lt * 6 : 0 })
      sparkles(x, t, 820, 1000, t0 + 1.3, 7, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
