// v3a112: star_advice, ADVICE SOLO, "Signs you’re | a healed Cancer." (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): the small, funny signs a Cancer has grown.
//   0.0–3.6    "Signs you’re | *a healed Cancer.*"
//   3.6–37.8   nine cards: left the group chat with no three-page goodbye · the ex shrine is now a box: ARCHIVED
//              · hosts dinner AND sits down · nostalgia with a VISITOR PASS · asks for a hug out loud (Leo delivers)
//              · claws out? only to make a heart · a new match, at turtle speed: PACE: YOURS · doesn't check who viewed
//              the story · lets the old grudge go, like a balloon
//  37.8        "Soft. Steady. | *Healed.*"
//  41.2        callback: "The grudge balloon? | *Still floating away.*"  the balloon, now a dot near the top.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'cancer'
const RED = '#e23d4e', WOOD = '#c98f2a', SILVER = '#d9e8ff', BOX = '#c98f5a'

const card = (x, cx, cy, w, h, k, rot = 0, bg = BONE) => {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
}
function phone(x, cx, cy, k, head, headCol, msgs, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 300, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-132, -190, 264, 380)
  x.fillStyle = headCol; x.fillRect(-120, -178, 240, 44)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -155)
  msgs.forEach(([at, y, col, lines, sz = 34]) => {
    const b = pop01(lt, at, 0.25, 2)
    if (b <= 0.01) return
    x.save(); x.translate(0, y); x.scale(b, b)
    const h = lines.length * (sz + 8) + 30
    x.fillStyle = INK; x.fillRect(-120, -h / 2 - 4, 240, h + 8); x.fillStyle = col; x.fillRect(-116, -h / 2, 232, h)
    x.fillStyle = INK; x.font = `800 ${sz}px ${INTER}`
    lines.forEach((l, j) => x.fillText(l, 0, -h / 2 + 15 + (sz + 8) * (j + 0.5) + 2))
    x.restore()
  })
  x.restore()
}
// a candlelit shrine (photo + candles) that folds into a cardboard box
function shrine(x, t, cx, cy, k, fold) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (fold < 0.5) {
    const a = 1 - fold * 2
    x.globalAlpha = a
    x.fillStyle = INK; x.fillRect(-110, -170, 220, 250); x.fillStyle = GOLD; x.fillRect(-100, -160, 200, 230)
    x.fillStyle = '#9aa5c4'; x.fillRect(-80, -140, 160, 190)
    x.fillStyle = INK; x.beginPath(); x.arc(0, -60, 40, 0, Math.PI * 2); x.fill(); x.fillRect(-60, -10, 120, 60)
    for (const sx of [-150, 150]) {
      x.fillStyle = INK; x.fillRect(sx - 20, -10, 40, 100); x.fillStyle = BONE; x.fillRect(sx - 15, -5, 30, 90)
      const fl = 1 + 0.15 * Math.sin(t * 12 + sx)
      x.fillStyle = '#ffb34a'; x.beginPath(); x.ellipse(sx, -30, 10 * fl, 22 * fl, 0, 0, Math.PI * 2); x.fill()
    }
    x.globalAlpha = 1
  } else {
    const b = ease.outBack ? clamp((fold - 0.5) * 2) : (fold - 0.5) * 2
    x.save(); x.scale(b, b)
    x.fillStyle = INK; x.fillRect(-150, -90, 300, 200); x.fillStyle = BOX; x.fillRect(-142, -82, 284, 184)
    x.fillStyle = '#a8743f'; x.fillRect(-142, -82, 284, 30)
    x.fillStyle = '#fff4e2'; x.fillRect(-90, -10, 180, 60); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('OLD STUFF', 0, 22)
    x.restore()
  }
  x.restore()
}
function table(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-300, -10, 600, 34); x.fillStyle = WOOD; x.fillRect(-294, -4, 588, 22)
  x.fillStyle = INK; x.fillRect(-270, 24, 24, 150); x.fillRect(246, 24, 24, 150)
  for (const px of [-150, 0, 150]) {
    x.fillStyle = INK; x.beginPath(); x.ellipse(px, -18, 62, 18, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(px, -20, 56, 14, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = px ? '#ffb34a' : '#5fd068'; x.beginPath(); x.ellipse(px, -26, 30, 10, 0, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
// an old photo album
function album(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 340, 250, k, -0.05, '#8a4a2e')
  x.fillStyle = '#fff4e2'; x.fillRect(-150, -105, 140, 210); x.fillRect(10, -105, 140, 210)
  x.fillStyle = '#c9c4d8'; x.fillRect(-135, -90, 110, 80); x.fillRect(25, -90, 110, 80); x.fillRect(-135, 5, 110, 80); x.fillRect(25, 5, 110, 80)
  x.fillStyle = PINK; x.fillRect(-100, -60, 40, 40); x.fillStyle = SKYB; x.fillRect(60, 30, 40, 40)
  x.restore()
}
// crab claws that pinch together into a heart
const CLAW = ['..RRRR', '.RR..R', 'RR....', 'RR....', 'RRR..R', '.RRRRR', '..RRR.']
function claws(x, t, cx, cy, k, join) {
  if (k <= 0.01) return
  const g = lerp(130, 70, join)
  drawBits(x, CLAW, { R: '#ff6b5a' }, cx - g, cy, 20 * k, { rot: -0.3 + join * 0.3 })
  drawBits(x, CLAW, { R: '#ff6b5a' }, cx + g, cy, 20 * k, { rot: 0.3 - join * 0.3, sx: -1 })
}
// a phone screen with a story's "viewed by" eye, face down
function storyPhone(x, cx, cy, k, flip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k * Math.max(0.05, Math.abs(Math.cos(flip * Math.PI))))
  x.fillStyle = INK; x.fillRect(-120, -190, 240, 380)
  if (flip < 0.5) {
    x.fillStyle = '#2a2350'; x.fillRect(-110, -180, 220, 360)
    x.fillStyle = BONE; x.beginPath(); x.ellipse(0, -20, 70, 40, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.beginPath(); x.arc(0, -20, 24, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('VIEWS: ?', 0, 80)
  } else { x.fillStyle = '#5a5482'; x.fillRect(-110, -180, 220, 360); x.fillStyle = INK; x.fillRect(-30, -150, 60, 60) }
  x.restore()
}
const TURTLE = [
  '...GGGG.....',
  '..GgGGgG....',
  '.GGGGGGGG.HH',
  '.GgGGGGgGHHH',
  'GGGGGGGGGGH.',
  '.HH....HH...',
]
// a balloon on a string with a label
function balloon(x, t, cx, cy, k, text, size = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * size, k * size)
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 110); x.quadraticCurveTo(20 * Math.sin(t * 3), 200, 0, 280); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 108, 128, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = RED; x.beginPath(); x.ellipse(0, 0, 100, 120, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff8a8a'; x.beginPath(); x.ellipse(-40, -50, 20, 34, -0.4, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-14, 130); x.lineTo(14, 130); x.lineTo(0, 112); x.fill()
  if (text) { x.fillStyle = BONE; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; text.split('|').forEach((l, i) => x.fillText(l.trim(), 0, -18 + i * 38)) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You left the chat | *without a speech.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 850, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), 'GROUP CHAT', LAV, [[0.6, -40, BONE, ['Cancer left', 'the chat.'], 32], [1.3, 100, MINT, ['that’s it.', 'that’s all.'], 32]], lt)
    } },
  { sign: S, cap: 'The ex shrine? | *Archived.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      shrine(x, t, 790, 900, 1.3 * pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.9, 1.4))
      label(x, 790, 640, 'TAPED SHUT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 42, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You host dinner | *and sit down too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: 0, y: -40, s: 240 },
    front(x, t, lt, P) {
      table(x, 540, 1060, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 540, 610, 'SEAT: YOURS TOO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Nostalgia is a visit, | *not a move-in.*', mood: lt => lt > 1.4 ? 'wink' : 'heart', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      album(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'VISITOR PASS: 10 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You ask for a hug | *out loud.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200, s: 270 },
    front(x, t, lt, P) {
      const slide = ease.inOutCubic(prog(lt, 1.0, 1.4))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', lerp(830, 640, slide), 970, 230 * k, { mood: 'sparkle', look: [-1, 0], seed: 41, glyph: false, hops: [P.t0 + 1.0] })
      bubble(x, 480, 600, 'hug, please. | now-ish.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      if (lt > 1.4) hearts(x, t, 470, 820, P.t0 + 1.4 * (3.1 / 2.4), { n: 6, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Claws out? | *Only to make hearts.*', mood: lt => lt > 1.3 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      claws(x, t, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2), ease.inOutCubic(prog(lt, 0.9, 1.3)))
      if (lt > 1.3) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 790, 700, 14 * pop01(lt, 1.3, 0.3, 2.4))
      label(x, 790, 1100, 'PINCH: GENTLE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New match? | You take it *slow.*', mood: 'sparkle', look: [1, 0], star: { x: -230, y: -30, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TURTLE, { G: '#5fd068', g: '#2f9a48', H: '#b8e986' }, 690 + lt * 40, 1090, 24 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 760, 640, '✦ IT’S A MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 900, 'PACE: YOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 42, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You don’t check | *who viewed it.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      storyPhone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.9, 1.3)))
      label(x, 790, 1120, 'FACE DOWN. CALM.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You feel it. | Then you *let it go.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: lt => lt > 1.2 ? [1, -1] : [1, 0], star: { x: -200, y: 40 },
    front(x, t, lt, P) {
      const up = ease.inCubic(prog(lt, 1.0, 2.4))
      balloon(x, t, lerp(560, 720, up), lerp(760, 380, up), pop01(t, P.t0 + 0.2, 0.35, 2), 'OLD | GRUDGE', lerp(1, 0.55, up))
      if (lt > 1.6) label(x, 780, 1100, 'BYE NOW', pop01(lt, 1.6, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a112', key: 'E', accent: SILVER, solo: S, ending: 'callback',
  title: 'Signs you’re | *a healed Cancer.*',
  cameos: CAMEOS,
  group: { cap: 'Soft. Steady. | *Healed.*', mood: 'sparkle' },
  last: {
    text: 'The grudge balloon? | *Still floating away.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      balloon(x, t, 540 + 30 * Math.sin(t), 1000 - lt * 50, k, '', 0.35)
      if (k > 0.01) signChar(x, t, 'cancer', 540, 1250, 240 * k, { mood: lt > 1.4 ? 'wink' : 'happy', look: [0, -1], seed: 44, glyph: false, hops: [t - lt + 1.3] })
      sparkles(x, t, 540, 1150, t - lt + 1.3, 8, 180, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
