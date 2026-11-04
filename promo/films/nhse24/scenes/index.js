// nhse24: HOLIDAY SURVIVAL GUIDE No. 24, "You made it" (finale; 30 s vertical, star_advice post, music: cinematic · D).
// The show look lives in ../../nhse13/scenes/survkit.js. Story 0–25.6, then the shared end card.
//   0.0–5.4    hook "You survived the | *holidays.*" Frame 0: a heap of wrapping paper with signs poking out, dazed
//              (♌ Leo, ♊ Gemini, ♍ Virgo, ♉ Taurus, ♋ Cancer); ♈ Aries on top waving a tiny white flag; ♓ Pisces on the
//              summit, crying. SITUATION: "the holidays are over. phew."
//   5.4–17.4   THE GUIDE, as badges. 1 "You held a boundary. *Kindly.*" ♉ Taurus gets a KIND NO badge.
//              2 "You asked for help." ♋ Cancer gets an ASKED FOR HELP badge (a spoon on it).
//              3 "You were gentle with *yourself.*" (card cut) ♓ Pisces gets a GENTLE WITH ME badge and the happiest tears.
//   17.4–25.6  THE STARS: "last tip: rest is *allowed.*" The heap again, but everyone's lounging in it now, each with a
//              badge; Aries' flag has turned into a little banner: WE MADE IT. endHead "All of us. | *Still* here."
//              Last line: "You made it. | *Gently.*"
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, room, windowPane, starFrame, inSprite, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, RED, PINK, MINT, PAPER, INTER, MONO, SERIF, PANEL, HEART, drawPixelStar } from '../../nhse13/scenes/survkit.js'

const P = PANEL
const FLOOR = 1120
const SEEDS = { aries: 3, taurus: 9, gemini: 4, cancer: 7, leo: 5, virgo: 8, pisces: 6 }

function lounge(x, t) {
  room(x, { wall: '#2e2a52', floor: '#4a3e62', floorY: FLOOR })
  windowPane(x, 820, 600, 200, 170, t)
  // garland of tiny lights
  for (let i = 0; i < 16; i++) { const on = Math.sin(t * 2.5 + i * 1.3) > -0.2; R(x, on ? [GOLD, PINK, '#7fd0ff', '#9fe6b0'][i % 4] : '#5a5470', P.x + 30 + i * 58, P.y + 30 + 10 * Math.sin(i * 0.9), 12, 12) }
}
function heap(x, cx, base, w = 760, seed = 1) {
  const cols = ['#c8283c', '#2f9a5a', GOLD, '#3a5aa8', '#e163d6', '#f39a3a']
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, base, w / 2 + 8, 128, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#7a3a5a'; x.beginPath(); x.ellipse(cx, base, w / 2, 120, 0, Math.PI, 0); x.fill()
  for (let i = 0; i < 26; i++) {
    const a = Math.PI + (i / 26) * Math.PI, rr = 0.35 + ((i * 37 + seed) % 60) / 100
    const px = cx + Math.cos(a) * w / 2 * rr, py = base + Math.sin(a) * 120 * rr
    x.save(); x.translate(px, py); x.rotate(Math.sin(i * 3.1) * 0.7)
    const bw = 50 + ((i * 23) % 40)
    box(x, -bw / 2, -14, bw, 28, cols[(i + seed) % 6], { b: 4 }); R(x, 'rgba(255,255,255,0.35)', -bw / 2 + 5, -10, bw * 0.3, 5)
    x.restore()
  }
}
function whiteFlag(x, t, cx, cy, banner = 0) {
  R(x, INK, cx - 3, cy - 150, 6, 150)
  const wave = Math.sin(t * 6) * 6
  if (banner < 0.5) { box(x, cx + 3, cy - 150 + wave * 0.3, 80, 54, '#ffffff', { b: 4 }) }
  else { x.save(); x.translate(cx + 3, cy - 150); x.scale(banner, banner); box(x, 0, 0, 230, 60, GOLD, { b: 5 }); x.font = `800 28px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WE MADE IT', 115, 32); x.restore() }
}
/** a round merit badge pinned on a sprite */
function badge(x, t, sign, o, col, k = 1) {
  if (k <= 0.01) return
  const F = starFrame(o.x, o.y, o.s, t, { pop: o.pop ?? 1, hops: o.hops, seed: SEEDS[sign] ?? 1 })
  inSprite(x, F, () => {
    x.save(); x.translate(12, 27); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 3.6, 0, Math.PI * 2); x.fill()
    x.fillStyle = col; x.beginPath(); x.arc(0, 0, 3, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffffff'; x.fillRect(-0.5, -2, 1, 1); x.fillRect(-1.5, -0.5, 3, 1)
    x.restore()
  })
}
const BADGE = { taurus: '#2fc79a', cancer: '#38c4ec', pisces: '#ff8fb1' }
/** the big badge card that flies in during a step */
function badgeCard(x, t, text, sub, col, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 640); x.scale(k, k); x.rotate(-0.04)
  // ribbon tails
  for (const d of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.moveTo(d * 30 - 26, 60); x.lineTo(d * 30 + 26, 60); x.lineTo(d * 30 + 26, 200); x.lineTo(d * 30, 176); x.lineTo(d * 30 - 26, 200); x.fill(); x.fillStyle = RED; x.fillRect(d * 30 - 20, 64, 40, 116) }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, 124, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.18)'; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill()
  x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  text.split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, -10 + (i - (a.length - 1) / 2) * 36))
  x.font = `700 18px ${MONO}`; x.fillText(sub, 0, 70)
  x.restore()
}

const POKE = [['leo', 260, 1010, 150], ['gemini', 400, 960, 150], ['virgo', 690, 965, 150], ['taurus', 830, 1015, 150], ['cancer', 545, 1030, 140]]

function set(x, t, S) {
  lounge(x, t)
  if (!S.end) {
    // dazed signs poking out of the heap (drawn first, the paper covers their lower halves)
    for (const [sg, X, Y, s] of POKE) star(x, t, sg, { x: X, y: Y, s, mood: sg === 'gemini' ? 'squint' : 'sleepy', look: [0, 0], zzz: false, squash: 0.05 })
    heap(x, 540, FLOOR + 30)
    const ao = { x: 470, y: 840, s: 170, mood: 'squint', look: [1, -1], hops: [0.6, 1.8, 3.0, 4.2] }
    star(x, t, 'aries', ao)
    whiteFlag(x, t, 380, 880)
    pisces(x, t, { x: 650, y: 820, s: 140, tears: 2, mood: 'wide', look: [-1, -1] })
    if (t > 2.0) label(x, '…we survived?', 540, 560, { size: 34, col: BONE, alpha: pop01(t, 2.0, 0.3, 2) * outK(t, [5.0, 5.3]) })
    return
  }
  const u = S.u
  for (const [sg, X, Y, s] of POKE) { const o = { x: X, y: Y - 30, s, mood: 'happy', look: [0, 0], hops: [17.8 + (X % 5) * 0.05, 21.5] }; star(x, t, sg, o); if (BADGE[sg]) badge(x, t, sg, o, BADGE[sg]) }
  heap(x, 540, FLOOR + 40)
  const ao = { x: 470, y: 820, s: 170, mood: 'sparkle', look: [0, 0], hops: [17.9, 21.55] }
  star(x, t, 'aries', ao)
  whiteFlag(x, t, 380, 860, pop01(u, 0.6, 0.35, 2))
  const po = { x: 690, y: 800, s: 150, tears: 3, mood: 'happy', look: [-1, -1], hops: [18.0, 21.6] }
  pisces(x, t, po); badge(x, t, 'pisces', po, BADGE.pisces)
  hearts(x, t, 19.0, 540, 760, { n: 6 })
}

function stepScene(x, t, S, sign, o, text, sub) {
  const u = S.u
  lounge(x, t)
  heap(x, 540, FLOOR + 120, 900, S.i + 2)
  const k = pop01(u, 0.3, 0.4, 1.8) * outK(u, [1.8, 2.1])
  badgeCard(x, t, text, sub, BADGE[sign], k)
  // the badge flies from the card onto the sign at 2.0
  const fp = ease.inOutCubic(prog(u, 1.8, 2.2))
  const so = { ...o, hops: [S.t0 + 2.2, S.t0 + 2.5] }
  if (sign === 'pisces') pisces(x, t, { ...so, tears: u > 2.2 ? 3 : 2, mood: u > 2.2 ? 'happy' : 'wide' })
  else star(x, t, sign, { ...so, mood: u > 2.2 ? 'sparkle' : 'happy' })
  if (fp > 0 && fp < 1) { x.save(); x.fillStyle = INK; x.beginPath(); x.arc(lerp(540, o.x - 60, fp), lerp(640, o.y + 30, fp), lerp(60, 20, fp), 0, Math.PI * 2); x.fill(); x.fillStyle = BADGE[sign]; x.beginPath(); x.arc(lerp(540, o.x - 60, fp), lerp(640, o.y + 30, fp), lerp(54, 16, fp), 0, Math.PI * 2); x.fill(); x.restore() }
  if (u >= 2.2) badge(x, t, sign, so, BADGE[sign], pop01(u, 2.2, 0.25, 2.6))
  sparkles(x, t, o.x - 60, o.y + 30, S.t0 + 2.2, 10, 100, S.i)
}
const step1 = (x, t, S) => stepScene(x, t, S, 'taurus', { x: 540, y: 960, s: 240 }, 'KIND | NO', 'BOUNDARY HELD')
const step2 = (x, t, S) => {
  stepScene(x, t, S, 'cancer', { x: 540, y: 960, s: 240 }, 'ASKED | FOR HELP', 'TEAM PLAYER')
  // a spoon on the badge card, a callback to the pie
  const k = pop01(S.u, 0.4, 0.4, 1.8) * outK(S.u, [1.8, 2.1])
  if (k > 0.01) { x.save(); x.translate(640, 560); x.rotate(0.6); x.scale(k, k); R(x, INK, -6, -60, 12, 80); R(x, '#c8d0e0', -3, -58, 6, 76); x.fillStyle = INK; x.beginPath(); x.ellipse(0, -64, 16, 22, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8eef8'; x.beginPath(); x.ellipse(0, -64, 12, 18, 0, 0, Math.PI * 2); x.fill(); x.restore() }
}
const step3 = (x, t, S) => stepScene(x, t, S, 'pisces', { x: 540, y: 960, s: 240 }, 'GENTLE | WITH ME', 'MOST IMPORTANT')

const EP = makeSurvival({
  no: 24,
  accent: GOLD,
  hook: 'You survived the | *holidays.*',
  situation: 'the holidays are over. phew.',
  guide: 'Your survival | *badges.*',
  endHead: 'All of us. | *Still* here.',
  line: 'last tip: rest is *allowed.*',
  last: 'You made it. | *Gently.*',
  pisSteps: true,
  set,
  steps: [
    { text: 'You held a boundary. *Kindly.*', draw: step1, cues: [['whoosh', 0.3, 0.4, 0.03], ['pop', 0.7, 1174.66, 0.04, 0], ['whoosh', 1.8, 0.4, 0.03], ['pop', 2.2, 1567.98, 0.045, 0], ['bell', 2.25, 2093, 0.025, 1.0, 0], ['glitter', 2.2, 2.6]] },
    { text: 'You asked for help.', draw: step2, cues: [['whoosh', 0.3, 0.4, 0.03], ['pop', 0.7, 987.77, 0.04, 0], ['whoosh', 1.8, 0.4, 0.03], ['pop', 2.2, 1567.98, 0.045, 0], ['bell', 2.25, 2093, 0.025, 1.0, 0], ['glitter', 2.2, 2.6]] },
    { text: 'You were gentle with *yourself.*', draw: step3, cues: [['whoosh', 0.3, 0.4, 0.03], ['pop', 0.7, 880, 0.04, 0], ['whoosh', 1.8, 0.4, 0.03], ['pop', 2.2, 1567.98, 0.045, 0], ['bell', 2.25, 2349.32, 0.03, 1.4, 0], ['glitter', 2.2, 2.8]] },
  ],
  cues: [...[0.6, 1.8, 3.0, 4.2].map(c => ['whoosh', c, 0.2, 0.015]), ['pluck', 2.0, 523.25, 0.03, 0.8, 0], ['pop', 18.0, 1174.66, 0.04, 0], ['bell', 18.05, 1567.98, 0.025, 1.0, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [bubble, snow, MINT, PAPER, SERIF, HEART, clamp, drawPixelStar]
