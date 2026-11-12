// r2a0268: star_advice, ADVICE SOLO, "Signs an Aquarius | likes you." (~49 s vertical, signs3kit social cut,
// music: lofi · C). One sign the whole way through (solo mode, 9 cards): Aquarius' odd, sincere ways of showing love,
// read kindly.
//   0.0–3.6    "Signs an Aquarius | *likes you.*"
//   3.6–37.8   nine cards (3.8 s each):
//              sent you an article about eels at 3 a.m. · showed you the theory board · club members: two (you)
//              · memorized your birth chart · gave you space, on purpose · opened the feelings vault
//              · asked your opinion and wrote it down · shared their last space snack · named you an honorary weirdo
//  37.8        "Odd? Yes. | *Loyal? Very.*"
//  41.0        LESSON UNLOCKED: "Weird is how | *they say love.*"  SIGNAL: RECEIVED
//  46.9        "Fellow weirdos. | *Perfect match.*" over the match card: Aquarius + Gemini (the 3 a.m. eel article, sent
//              to the one sign who'd read it).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'aquarius'
const ST = { x: -190 }
const tag = (x, cx, cy, k, s, bg, rot = -0.04, size = 32) => label(x, cx, cy, s, k, { size, bg, rot, font: MONO, weight: 700 })

const SCOPE = ['........KK', '.......KSK', '......KSSK', '.....KSSK.', '....KSSK..', '...KSSK...', '..KSSK....', '...K.K....', '..K...K...', '.K.....K..']
const SCOPE_C = { K: INK, S: '#9aa5c4' }
const PACK = ['.SSSSSSSS.', 'SSSSSSSSSS', 'SWWWWWWWWS', 'SWPPBBPPWS', 'SWPPBBPPWS', 'SWWWWWWWWS', 'SSSSSSSSSS', '.S.S.S.S.S']
const PACK_C = { S: '#d8dbe8', W: CREAM, P: PINK, B: '#8a4a2e' }
const HEART_BIG = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

/** a cork board with pinned notes and red strings */
function board(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -156, 352, 312); x.fillStyle = '#c98f5a'; x.fillRect(-168, -148, 336, 296)
  const pins = [[-110, -90], [100, -100], [-20, 10], [-120, 90], [110, 80]]
  const W = ['MOON?', 'PIGEONS', 'YOU', 'TOAST', 'TIME']
  const n = Math.floor(clamp(prog(lt, 0.3, 1.5)) * 5)
  x.strokeStyle = RED; x.lineWidth = 4
  for (let i = 1; i <= n && i < 5; i++) { x.beginPath(); x.moveTo(...pins[2]); x.lineTo(...pins[i === 2 ? 0 : i]); x.stroke() }
  pins.forEach(([px, py], i) => {
    x.fillStyle = i === 2 ? PINK : CREAM; x.fillRect(px - 56, py - 28, 112, 56)
    txt(x, W[i], px, py + 2, { size: 22, font: MONO, weight: 700 })
    x.fillStyle = RED; x.fillRect(px - 5, py - 34, 10, 10)
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Sent you an eel fact? | *At 3 a.m.? Love.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '3:07 A.M.', headCol: SKYB, size: 24, lines: [['did u know eels', SKYB, pop01(t, P.t0 + 0.5, 0.3, 2)], ['can travel on land', SKYB, pop01(t, P.t0 + 0.8, 0.3, 2)], ['thought of u', PINK, pop01(t, P.t0 + 1.5, 0.3, 2.4)]] })
    } },
  { sign: S, cap: 'Showed you | *the theory board.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      board(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      tag(x, 790, 1090, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'ACCESS: YOU ONLY', MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Invited you | *to their odd hobby.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 790, 850, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      tag(x, 790, 640, pop01(t, P.t0 + 0.8, 0.3, 2.2), 'CLOUD-NAMING CLUB', LAV, -0.04, 32)
      tag(x, 790, 1080, pop01(t, P.t0 + 1.4, 0.3, 2.2), 'MEMBERS: 2 (YOU!)', GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Memorized your chart? | *That’s devotion.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 800, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.15)
      tag(x, 790, 1000, pop01(t, P.t0 + 0.9, 0.3, 2.2), 'YOUR MOON: KNOWN', MINT, -0.04, 32)
      tag(x, 790, 1100, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'YOUR BIRTHDAY: ???', PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Gave you space? | *On purpose, with love.*', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.scale(k, k)
        x.strokeStyle = 'rgba(239,230,214,0.35)'; x.lineWidth = 3; x.beginPath(); x.ellipse(0, 0, 170, 80, -0.2, 0, Math.PI * 2); x.stroke()
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.fill(); x.fillStyle = '#6fc3ff'; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill()
        const a = t * 1.2, ox = Math.cos(a) * 170, oy = Math.sin(a) * 80
        x.save(); x.rotate(-0.2); x.fillStyle = INK; x.beginPath(); x.arc(ox, oy, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = PINK; x.beginPath(); x.arc(ox, oy, 21, 0, Math.PI * 2); x.fill(); x.restore()
        x.restore()
      }
      tag(x, 790, 1060, pop01(t, P.t0 + 1.2, 0.3, 2.2), 'SPACE: GIVEN', SKYB, 0.04, 36)
    } },
  { sign: S, cap: 'Opened up | *the feelings vault.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), op = ease.inOutCubic(prog(lt, 0.8, 1.4))
      if (k <= 0.01) return
      x.save(); x.translate(790, 860); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = '#9aa5c4'; x.fillRect(-160, -160, 320, 320)
      x.fillStyle = DEEP; x.fillRect(-140, -140, 280, 280)
      drawBits(x, HEART_BIG, { H: '#ff4f86', W: '#fff' }, 0, 0, 24 * op)
      x.fillStyle = '#c9c9d8'; x.fillRect(-140, -140, 280 * (1 - 0.85 * op), 280)
      x.fillStyle = INK; x.beginPath(); x.arc(-140 + 280 * (1 - 0.85 * op) - 50, 0, 30, 0, Math.PI * 2); x.fill()
      x.restore()
      if (op > 0.9) sparkles(x, t, 790, 860, P.t0 + 1.4 * 1.29, 7, 170, 0.3)
      tag(x, 790, 1110, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'RARE. CHERISH IT.', GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Asked your opinion? | *And wrote it down.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'YOUR THOUGHTS', 0, -140, { size: 28, font: MONO, weight: 700 })
        ;['• likes soup', '• hates clowns', '• is brilliant'].forEach((s, i) => { if (lt > 0.5 + i * 0.4) txt(x, s, -140, -70 + i * 64, { size: 32, weight: 700, color: i === 2 ? RED : BROWN, align: 'left' }) })
      })
      tag(x, 790, 1100, pop01(t, P.t0 + 1.8, 0.3, 2.2), 'FILED FOREVER', MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Shared their | *last space snack.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const give = ease.inOutCubic(prog(lt, 0.8, 1.4))
      drawBits(x, PACK, PACK_C, lerp(560, 820, give), 860, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: lerp(-0.2, 0.1, give) })
      tag(x, 800, 660, pop01(t, P.t0 + 0.5, 0.3, 2.2), 'FREEZE-DRIED. LAST ONE.', BONE, -0.04, 28)
      if (give > 0.9) hearts(x, t, 820, 1000, P.t0 + 1.4 * 1.29, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 5 })
      tag(x, 800, 1090, pop01(t, P.t0 + 1.7, 0.3, 2.2), 'FOR YOU', PINK, 0.04, 40)
    } },
  { sign: S, cap: 'Called you a weirdo? | *Highest honor.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -200 }, hops: [1.0, 1.6],
    back(x, t, lt, P) { hearts(x, t, 390, 1000, P.t0 + 1.1, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 7 }) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 2.2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.rotate(t * 0.3); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); for (let j = 0; j < 24; j++) { const a = j * Math.PI / 12, r = j % 2 ? 150 : 170; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath(); x.fill()
        x.fillStyle = GOLD; x.beginPath(); for (let j = 0; j < 24; j++) { const a = j * Math.PI / 12, r = j % 2 ? 142 : 160; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath(); x.fill()
        x.restore()
        x.save(); x.translate(790, 850); x.scale(k, k); txt(x, 'CERTIFIED', 0, -40, { size: 30, font: MONO, weight: 700 }); txt(x, 'WEIRDO', 0, 14, { size: 50 }); txt(x, '★★★', 0, 66, { size: 32, color: RED }); x.restore()
      }
      tag(x, 790, 1100, pop01(t, P.t0 + 1.3, 0.3, 2.2), 'MEANS: I LIKE YOU', MINT, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0268', key: 'C', accent: SKYB, solo: S, ending: 'card',
  title: 'Signs an Aquarius | *likes you.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'gemini', chip: 'ALIGNED' },
  group: { cap: 'Odd? Yes. | *Loyal? Very.*', mood: 'heart' },
  lesson: { text: 'Weird is how | *they say love.*', chip: 'SIGNAL: RECEIVED' },
  last: { text: 'Fellow weirdos. | *Perfect match.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
