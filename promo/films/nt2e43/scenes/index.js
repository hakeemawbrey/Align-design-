// nt2e43: MAIN CHARACTER MOMENT, "The dropped book." (20 s vertical, Trends Vol. 2 ep 43, music: cinematic · F)
// Format kit: ../../nt2e41/scenes/mckit.js. Story 0–15.6, then the shared end card.
//   0.0–2.2    hook "*Main character moment:* | the café meet-cute." ♊ Gemini mid-fumble, a book in the air.
//   2.2–7.6    THE MOVIE "GEMINI · The Meet-Cute": the book tumbles in slow motion, Gemini reaches.
//   7.3        record scratch.  7.6 card cut.
//   7.6–11.0   REALITY "*they're* the main character too.": ♍ Virgo reaches for the same book, under their own title
//              card "VIRGO · The Meet-Cute"; the two cards slide in and bonk.
//   11.0–15.6  one card: "GEMINI & VIRGO". Virgo: "co-leads?"  THE STARS: "Shared *billing*."
import { makeMC, B } from '../../nt2e41/scenes/mckit.js'
const { R, box, shadow, hearts, bubble, label, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER, SERIF } = B

const GEM = '#ffd45c'

function cafe(x) {
  R(x, '#3a2a4e', 0, 0, 1080, 1920)
  // window with the night outside
  box(x, 90, 380, 900, 520, '#1d1840', { b: 10 }); R(x, INK, 535, 380, 10, 520); R(x, INK, 90, 630, 900, 10)
  for (let i = 0; i < 14; i++) R(x, 'rgba(255,220,150,0.5)', 130 + (i * 61) % 820, 420 + (i * 97) % 440, 6, 6)
  // string lights
  for (let i = 0; i < 12; i++) { const lx = 100 + i * 80, ly = 360 + Math.sin(i * 0.9) * 14; R(x, INK, lx - 7, ly - 7, 14, 18); R(x, ['#ffd45c', '#ff8fb1', '#9fe6b0'][i % 3], lx - 4, ly - 4, 8, 12) }
  // floor + table
  R(x, '#4b3560', 0, 1240, 1080, 680); for (let i = 0; i < 8; i++) R(x, 'rgba(0,0,0,0.15)', 0, 1260 + i * 80, 1080, 4)
  box(x, 330, 1160, 420, 34, '#a07850', { b: 7, hi: '#c09a6e' }); R(x, INK, 525, 1194, 30, 140); R(x, '#7a5a3c', 531, 1194, 18, 140)
  // two mugs, steam
  for (const mx of [400, 680]) { box(x, mx - 30, 1100, 60, 56, BONE, { b: 5 }); R(x, INK, mx + 30, 1112, 16, 30); R(x, BONE, mx + 30, 1118, 10, 18) }
}
function book(x, cx, cy, rot, k = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -60, -44, 120, 88, '#c94a6e', { b: 6 }); R(x, '#f4e3c8', -50, -36, 100, 72); R(x, INK, -3, -40, 6, 80)
  for (let i = 0; i < 4; i++) { R(x, '#b9a88e', -42, -24 + i * 14, 32, 4); R(x, '#b9a88e', 10, -24 + i * 14, 32, 4) }
  x.restore()
}
// a canvas title card (for the collision in reality)
function card(x, t, cx, cy, name, k = 1, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.72)'; x.fillRect(-260, -88, 520, 176)
  x.strokeStyle = 'rgba(255,240,214,0.6)'; x.lineWidth = 3; x.strokeRect(-250, -78, 500, 156)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 28px ${INTER}`; x.fillStyle = 'rgba(255,240,214,0.95)'; x.fillText(name.split('').join(' '), 0, -38)
  x.font = `italic 500 66px ${SERIF}`; x.fillStyle = '#fff3dc'; x.fillText('The Meet-Cute', 0, 22)
  x.restore()
}

const EP = makeMC({
  id: 'nt2e43', hero: 'gemini', date: 'virgo', accent: GEM, deep: '#b0820c',
  moment: 'the café *meet-cute.*',
  title: ['GEMINI', 'The Meet-Cute'],
  movieCap: 'the book falls. *destiny reaches.*',
  realCap: '*they’re* the main character too.',
  hook(x, t, S) {
    cafe(x)
    shadow(x, 330, 1250, 220)
    S.hero(x, t, { x: 330, y: 1060, s: 260, mood: 'wide', look: [1, -1], squash: -0.06, hops: [0.2, 1.3] })
    const p = (t % 2.2) / 2.2
    book(x, 470 + p * 40, 760 - Math.sin(p * Math.PI) * 120 + p * 80, p * 6)
  },
  movie(x, tm, S) {
    cafe(x)
    const p = prog(tm, 2.2, 2.2 + 5.1 * 0.3)
    shadow(x, 330, 1250, 220)
    S.hero(x, tm, { x: 330 + p * 60, y: 1060, s: 260, mood: 'sparkle', look: [1, 0.5], squash: 0.05, hops: [2.5] })
    book(x, lerp(480, 560, p), lerp(760, 1020, ease.inQuad(p)), lerp(0.3, 2.2, p))
    // sparkle trail on the book (slow-mo)
    for (let i = 0; i < 4; i++) B.drawPixelStar(x, lerp(480, 560, p) - 50 - i * 20, lerp(760, 1020, ease.inQuad(p)) - 40 - i * 26, 18, 1, GOLD)
  },
  real(x, t, S) {
    cafe(x)
    const u = S.u
    shadow(x, 390, 1250, 220); shadow(x, 760, 1250, 220)
    const vk = B.pop01(t, 7.7, 0.35, 2.2)
    S.hero(x, t, { x: 390, y: 1060, s: 250, mood: u > 1.6 ? 'wide' : 'sparkle', look: [1, 0.4], hops: [9.25] })
    if (vk > 0.01) S.date(x, t, { x: 760, y: 1060, s: 250, pop: vk, mood: u > 1.6 ? 'wide' : 'sparkle', look: [-1, 0.4], hops: [9.25] })
    book(x, 575, 1120, 0.15)
  },
  top(x, t, S) {
    if (S.phase === 'real') {
      const u = S.u
      const a = ease.outCubic(prog(u, 0.2, 0.7)), b = ease.outCubic(prog(u, 0.6, 1.1))
      const bonk = u > 1.6 ? Math.exp(-(u - 1.6) * 6) * Math.sin((u - 1.6) * 30) * 0.08 : 0
      const meet = ease.inCubic(prog(u, 1.2, 1.6))
      card(x, t, lerp(-300, 330, a) + meet * 60, 520, 'GEMINI', 0.8, -0.04 - bonk)
      card(x, t, lerp(1380, 750, b) - meet * 60, 560, 'VIRGO', 0.8, 0.05 + bonk)
      if (u > 1.6) label(x, 'BONK', 540, 420, { size: 60 * clamp(prog(u, 1.6, 1.75)), col: '#ff6b7f', font: INTER, weight: 800, rot: -0.1 })
    }
    if (S.phase === 'pay') {
      const k = B.pop01(t, 11.1, 0.4, 2)
      if (k > 0.01) {
        x.save(); x.translate(540, 520); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.72)'; x.fillRect(-380, -88, 760, 176)
        x.strokeStyle = 'rgba(255,240,214,0.6)'; x.lineWidth = 3; x.strokeRect(-370, -78, 740, 156)
        x.textAlign = 'center'; x.textBaseline = 'middle'
        x.font = `800 28px ${INTER}`; x.fillStyle = 'rgba(255,240,214,0.95)'; x.fillText('G E M I N I   &   V I R G O', 0, -38)
        x.font = `italic 500 66px ${SERIF}`; x.fillStyle = '#fff3dc'; x.fillText('The Meet-Cute', 0, 22)
        x.restore()
      }
    }
  },
  pay(x, t, S) {
    cafe(x)
    const u = S.u
    shadow(x, 430, 1250, 220); shadow(x, 700, 1250, 220)
    S.hero(x, t, { x: 430, y: 1050, s: 250, mood: 'happy', look: [1, 0], hops: [11.6, 12.9] })
    S.date(x, t, { x: 700, y: 1050, s: 250, mood: u > 0.6 ? 'heart' : 'happy', look: [-1, 0], hops: [11.3, 13.0] })
    book(x, 565, 1080, 0.05)
    bubble(x, t, 720, 790, 11.25, 13.6, 'co-leads?', { size: 36, tail: 0.2 })
    hearts(x, t, 12.9, 565, 900, { n: 6 })
  },
  last: 'Shared *billing*.',
  cues: {
    hook: [['whoosh', 0.2, 0.3, 0.03], ['pop', 0.25, 987.77, 0.03, 0.3]],
    movie: [['glitter', 0.5, 1.4]],
    real: [['pop', 0.12, 880, 0.04, 0.4], ['whoosh', 0.2, 0.5, 0.03], ['whoosh', 0.6, 0.5, 0.03], ['tom', 1.6, 140, { gain: 0.25, decay: 0.2 }], ['tick', 1.6, 0.08], ['pop', 1.65, 523.25, 0.04, 0]],
    pay: [['bell', 0.12, 1318.51, 0.03, 1.4, 0], ['pop', 1.9, 1567.98, 0.03, 0.2], ['glitter', 1.9, 2.4]],
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void R
