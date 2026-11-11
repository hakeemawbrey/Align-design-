// v3t041: THE SIGNS AS… v3, SOLO film, "Your Gemini friend | be like." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine everyday moments with a Gemini friend, each pushed to the most extreme version.
//   0.0–3.6    "Your Gemini friend | *be like.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards: asked for one sentence, got a podcast · a new hobby Monday, quit Wednesday · knows everyone,
//              even the pigeon · changed their order mid-order (order #7) · runs nine group chats · brought a whiteboard
//              for the news · dating profile with two bios · two moods in the same minute · your birthday: three parties
//  37.8        "Chaotic. | *Never boring.*"
//  41.0        LESSON UNLOCKED: "Keep a Gemini close. | Life gets *louder.*"  FUN: UNLOCKED
//  46.9        "Never a quiet | *group chat.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffd23a', RED = '#e23d4e', GREY = '#9aa5c4'

const PIGEON = [
  '...GGG.....',
  '..GGWGG....',
  '..GGGGGOO..',
  '.MMGGGG....',
  'MMMGGGGG...',
  'GGGGGGGGG..',
  '.GGGGGGGGG.',
  '..GGGGGGG..',
  '....O..O...',
  '...OO.OO...',
]
const PIGEON_C = { G: GREY, W: '#ffffff', O: '#ff9a4a', M: '#7dd3a8' }
const CAKE = [
  '..Y..Y..Y..',
  '..R..R..R..',
  'PPPPPPPPPPP',
  'PWPWPWPWPWP',
  'PPPPPPPPPPP',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
]
const CAKE_C = { Y: GOLD, R: RED, P: PINK, W: '#fff4e2', B: '#8a4a2e' }

// a whiteboard with boxes and arrows drawing themselves
function whiteboard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -130, 356, 280)
  x.fillStyle = INK; x.fillRect(-182, -144, 364, 288)
  x.fillStyle = '#c9c9d8'; x.fillRect(-176, -138, 352, 276)
  x.fillStyle = '#ffffff'; x.fillRect(-164, -126, 328, 252)
  const p = clamp((lt - 0.3) / 1.4)
  const boxes = [[-110, -70, 'SAM'], [100, -70, 'JO'], [-110, 60, 'DOG'], [100, 60, '???']]
  x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  boxes.forEach(([bx, by, s], i) => {
    if (p < i / 4) return
    x.strokeStyle = [RED, SKYB, MINT, LAV][i]; x.lineWidth = 6; x.strokeRect(bx - 52, by - 28, 104, 56)
    x.fillStyle = INK; x.fillText(s, bx, by + 2)
  })
  x.strokeStyle = RED; x.lineWidth = 5
  const L = [[-58, -70, 48, -70], [-110, -42, -110, 32], [-58, 60, 48, 60], [-70, -50, 60, 40]]
  L.forEach(([a, b, c, d], i) => { const q = clamp(p * 5 - 1 - i); if (q <= 0) return; x.beginPath(); x.moveTo(a, b); x.lineTo(lerp(a, c, q), lerp(b, d, q)); x.stroke() })
  x.restore()
}
// a dating profile card with two bios side by side
function profile(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -190, 316, 396)
  x.fillStyle = INK; x.fillRect(-162, -204, 324, 404)
  x.fillStyle = '#fff4e2'; x.fillRect(-154, -196, 308, 388)
  x.fillStyle = YEL; x.fillRect(-154, -196, 308, 150)
  x.restore()
  signChar(x, t, 'gemini', cx, cy - 110 * k, 120 * k, { mood: 'wink', seed: 51, glyph: false, glow: 0.5 })
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('BIO A', -72, -10); x.fillText('BIO B', 72, -10)
  x.fillStyle = '#b9b0a0'; x.fillRect(-2, -26, 4, 196)
  x.font = `700 25px ${MONO}`; x.fillStyle = '#6b62a8'
  ;['homebody', 'loves', 'quiet'].forEach((s, i) => x.fillText(s, -72, 34 + i * 40))
  ;['party', 'every', 'night'].forEach((s, i) => x.fillText(s, 72, 34 + i * 40))
  x.restore()
}
// a stack of chat rows ticking in
function chats(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const names = ['the girls', 'work work', 'gym?', 'cousins', 'book club', 'brunch', 'old school', 'plants', 'chat 9']
  const n = Math.min(names.length, Math.floor(clamp((lt - 0.3) / 1.4) * names.length) + 1)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -250, 300, 500); x.fillStyle = '#2a2350'; x.fillRect(-142, -242, 284, 484)
  for (let i = 0; i < n; i++) {
    const y = -222 + i * 52
    x.fillStyle = '#140c30'; x.fillRect(-128, y, 256, 44)
    x.fillStyle = [YEL, PINK, MINT, SKYB, LAV][i % 5]; x.fillRect(-120, y + 8, 28, 28)
    x.fillStyle = BONE; x.font = `700 27px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(names[i], -82, y + 23)
    x.fillStyle = RED; x.fillRect(96, y + 12, 22, 22)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'gemini', cap: 'Asked for one sentence. | Got *a podcast.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'so basically…', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 42, tail: 'bl' })
      notes(x, t, 790, 900, { n: 3, cell: 7, col: YEL, seed: 1, alpha: clamp(lt - 0.6) })
      label(x, 790, 860, 'EPISODE 1', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 40, bg: YEL, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'OF 9', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 52, bg: RED, color: '#fff4e2', rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'New hobby Monday. | Quit *Wednesday.*', mood: lt => lt > 1.6 ? 'wink' : 'sparkle', star: { x: -190 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const rows = [['MON: POTTERY', MINT], ['TUE: GUITAR', SKYB], ['WED: DONE', PINK]]
      rows.forEach(([s, c], i) => label(x, 790, 680 + i * 170, s, pop01(t, P.t0 + 0.3 + i * 0.5, 0.3, 2.2), { size: 36, bg: c, rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
      if (lt > 1.4) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; for (let i = 0; i < 2; i++) { x.beginPath(); x.moveTo(640, 680 + i * 170); x.lineTo(lerp(640, 940, clamp((lt - 1.4 - i * 0.15) * 4)), 680 + i * 170); x.stroke() } x.restore() }
    } },
  { sign: 'gemini', cap: 'Knows everyone. | Even *the pigeon.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, PIGEON, PIGEON_C, 800, 960, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 380, 600, 'hey, Gary!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bc' })
      bubble(x, 830, 700, 'coo!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      hearts(x, t, 800, 880, P.t0 + 1.4, { n: 4, life: 1.5, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Changed their order | *mid-order.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: { x: -190 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      const opts = ['a latte—', 'no, tea—', 'wait, juice—', 'a latte.']
      const i = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 790, 680, opts[i], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 960, `ORDER #${i * 2 + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 44, bg: YEL, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Group chat? | They run *nine.*', mood: 'sparkle', star: { x: -200 }, hops: [0.8, 1.6],
    front(x, t, lt, P) { chats(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'gemini', cap: 'Got news? | Brought *a whiteboard.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -200, y: 40, s: 260 },
    front(x, t, lt, P) {
      whiteboard(x, 760, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 760, 1050, 'IT GETS WORSE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Their dating profile? | *Two bios.*', mood: 'wink', star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 1120, 'BOTH TRUE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: YEL, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Two moods. | *Same minute.*', mood: lt => (Math.floor(lt * 2.2) % 2) ? 'squint' : 'heart', star: { x: -190 }, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2), flip = Math.floor(lt * 2.2) % 2
      label(x, 790, 760, flip ? 'GRUMPY' : 'IN LOVE', k, { size: 48, bg: flip ? LAV : PINK, rot: flip ? 0.06 : -0.06 })
      label(x, 790, 980, '0:59', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Your birthday? | *Three parties.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', star: { x: -200 }, hops: [0.6, 1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2.2)
        drawBits(x, CAKE, CAKE_C, 680, 650 + i * 190, 14 * k)
        label(x, 850, 650 + i * 190, `PARTY ${i + 1}`, k, { size: 32, bg: [MINT, SKYB, YEL][i], rot: i % 2 ? 0.05 : -0.04, font: MONO, weight: 700 })
      }
      sparkles(x, t, 760, 840, P.t0 + 1.5, 7, 200, 0.3)
    } },
]

const F = makeFilm({
  id: 'v3t041', key: 'C', accent: YEL, solo: 'gemini', ending: 'lesson',
  title: 'Your Gemini friend | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chaotic. | *Never boring.*', mood: 'sparkle' },
  lesson: { text: 'Keep a Gemini close. | Life gets *louder.*', chip: 'FUN: UNLOCKED' },
  last: {
    text: 'Never a quiet | *group chat.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1150, t - lt + 0.6, 9, 260, 0.4) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
