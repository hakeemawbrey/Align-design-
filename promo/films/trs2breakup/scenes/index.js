// trs2breakup: THE SIGNS AS… after a breakup (v2 calm cut, ~64 s vertical, music: lofi · G). Built on ../../signs2kit.js.
//   0.0–3.6    "The signs after | a *breakup.*"  The twelve line up for roll call (Pisces already misty), then dive
//              into the pip row at the bottom.
//   3.6–49.2   the roll call, one stage card per sign (3.8 s each), each a gentle way to heal:
//              ♈ took up pottery the same day · ♉ baked a whole tray, then another · ♊ talked it out with everyone
//              · ♋ scrolled every old photo · ♌ new hair, new era · ♍ a five-step healing plan · ♎ moved the furniture
//              twice · ♏ went quiet, came back glowing · ♐ needed space, booked a trip · ♑ scheduled one good cry
//              · ♒ joined a stargazing club · ♓ cried at a commercial.
//  49.2        "Everyone *came back stronger.*"  The twelve fly up into a group photo under the bunting.
//  52.4        LESSON UNLOCKED: "Healing isn’t | *a race.*"  SELF-LOVE: UNLOCKED
//  58.3        "*Glow-up* season."  Hearts rise off the photo.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, inSprite, pop01, outK,
  GOLD, BONE, PINK, INK, SKYB,
} from '../../signs2kit.js'

// ── props
const VASE = ['..CCCC..', '...CC...', '..CCCC..', '.CCCCCC.', 'CCCcCCCC', 'CCcCCCCC', '.CCCCCC.', '..CCCC..', 'GGGGGGGG']
const VASE_C = { C: '#d9875a', c: '#f0b088', G: '#6b62a8' }
const TRAY = ['.BB...BB...BB.', 'BBBB.BBBB.BBBB', 'BbBB.BBbB.BBbB', 'PPPP.PPPP.PPPP', '.PP...PP...PP.', 'TTTTTTTTTTTTTT']
const TRAY_C = { B: '#d0904c', b: '#5a3418', P: '#ff9fc0', T: '#c9c4d8' }
const POLA = ['WWWWWWWWW', 'WSSSSSSSW', 'WSSYSSSSW', 'WSSSSSGSW', 'WSGGSGGGW', 'WGGGGGGGW', 'WWWWWWWWW', 'WWWWWWWWW']
const POLA_C = { W: '#fff4e2', S: '#8fe3ff', Y: '#ffe27a', G: '#5fd38a' }
const CHAIR = ['.RRRRRR.', '.RrrrrR.', 'RRrrrrRR', 'RRRRRRRR', 'RRRRRRRR', '.D....D.']
const CHAIR_C = { R: '#4fa6d8', r: '#9fd4ff', D: '#3a2d74' }
const SUIT = ['...HHHH...', '...H..H...', 'SSSSSSSSSS', 'SsSSSSSSsS', 'SSSSYYSSSS', 'SSSSYYSSSS', 'SsSSSSSSsS', 'SSSSSSSSSS', '.W......W.']
const SUIT_C = { S: '#ff9f4a', s: '#ffc68a', Y: '#ffe27a', H: '#3a2d74', W: '#2a2350' }
const SCOPE = ['......BB', '....BBBB', '..BBBBB.', 'BBBBB...', '.BB.....', '..L.....', '.L.L....', 'L...L...']
const SCOPE_C = { B: '#c9c4d8', L: '#6b62a8' }
const TV = ['..A....A..', '...A..A...', 'KKKKKKKKKK', 'KSSSSSSSSK', 'KSHHSSHHSK', 'KSHHHHHHSK', 'KSSHHHHSSK', 'KSSSHHSSSK', 'KSSSSSSSSK', 'KKKKKKKKKK', '.K......K.']
const TV_C = { A: '#c9c4d8', K: '#2a2350', S: '#5fb6ff', H: '#ff8fb1' }

const CAMEOS = [
  { sign: 'aries', cap: 'Took up pottery. | *Same day.*', mood: 'sparkle', star: { x: -130 }, hops: [0.6, 1.4],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, VASE, VASE_C, 780, 1020, 22 * k, { rot: 0.04 * Math.sin(lt * 8) })
      label(x, 780, 790, 'DAY 1', pop01(t, P.t0 + 0.7, 0.3, 2), { bg: '#ff6b5a', color: BONE, rot: 0.06 })
    } },
  { sign: 'taurus', cap: 'Baked a *whole tray.* | Then another.', mood: 'heart', look: [1, 0], star: { x: -150 },
    back(x, t, lt, P) {
      drawBits(x, TRAY, TRAY_C, 770, 1050, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = lt < 1.2 ? 1 : lt < 1.8 ? 2 : 3
      label(x, 770, 880, `TRAY ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { bg: GOLD, rot: -0.06 })
    } },
  { sign: 'gemini', cap: 'Talked it out. | With *everyone.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', star: { x: -60 },
    front(x, t, lt, P) {
      bubble(x, 650, 620, 'so ANYWAY…', pop01(t, P.t0 + 0.45, 0.25, 2.2) * outK(t, [P.t0 + 1.3, P.t0 + 1.45]), { size: 38, tail: 'bl' })
      bubble(x, 650, 620, 'ok, from the top', pop01(t, P.t0 + 1.45, 0.25, 2.2), { size: 38, tail: 'bl', col: '#ffe27a' })
    } },
  { sign: 'cancer', cap: 'Scrolled every | *old photo.*', mood: 'sparkle', tears: 1, star: { x: 130 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const n = Math.min(3, Math.floor(lt / 0.6))
      for (let i = 0; i < 3; i++) {
        const q = (i + n) % 3
        drawBits(x, POLA, POLA_C, 320 + (q - 1) * 40, 960 + (q - 1) * 14, 16 * k, { rot: (q - 1) * 0.16 })
      }
    } },
  { sign: 'leo', cap: 'New hair. | *New era.*', mood: 'sparkle', squash: lt => 0.04 * Math.sin(lt * 5),
    front(x, t, lt, P, F) {
      if (lt > 0.35) inSprite(x, F, () => {
        x.fillStyle = INK; x.fillRect(9.4, 16.6, 8, 5.4); x.fillRect(18.6, 16.6, 8, 5.4); x.fillRect(17.2, 17.4, 1.6, 1.2)
        x.fillStyle = GOLD; x.fillRect(9.4, 16.6, 8, 0.8); x.fillRect(18.6, 16.6, 8, 0.8)
        x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(10.4, 17.8, 2, 1); x.fillRect(19.6, 17.8, 2, 1)
      })
      sparkles(x, t, F.x, F.cy, P.t0 + 0.35, 10, 190, 1, [GOLD, BONE, PINK])
      label(x, 790, 610, 'NEW ME', pop01(t, P.t0 + 0.6, 0.3, 2), { bg: GOLD, rot: 0.07 })
    } },
  { sign: 'virgo', cap: 'Made a five-step | *healing plan.*', mood: lt => lt > 1.9 ? 'happy' : 'squint', look: [-1, 0], star: { x: 150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(320, 900); x.scale(k, k); x.rotate(-0.06)
      x.fillStyle = INK; x.fillRect(-150, -200, 300, 400)
      x.fillStyle = '#a0784a'; x.fillRect(-142, -192, 284, 384)
      x.fillStyle = '#f4e8cc'; x.fillRect(-122, -160, 244, 336)
      x.fillStyle = '#c9c4d8'; x.fillRect(-50, -214, 100, 40)
      for (let n = 0; n < 5; n++) {
        const ty = -120 + n * 64
        x.fillStyle = INK; x.fillRect(-100, ty - 18, 36, 36); x.fillStyle = '#fff'; x.fillRect(-94, ty - 12, 24, 24)
        x.fillStyle = '#b8a98a'; x.fillRect(-46, ty - 6, 130 - (n % 2) * 30, 12)
        if (lt > 0.5 + n * 0.3) drawBits(x, ['....R', '...R.', 'R.R..', '.R...'], { R: '#2fc79a' }, -80, ty - 4, 8, { outline: null })
      }
      x.restore()
    } },
  { sign: 'libra', cap: 'Moved the furniture. | *Twice.*', mood: lt => lt > 1.9 ? 'sparkle' : 'happy', look: lt => [lt < 1.1 ? -1 : 1, 0],
    back(x, t, lt) {
      const a = ease.inOutCubic(prog(lt, 0.4, 0.9)), b = ease.inOutCubic(prog(lt, 1.3, 1.8))
      const cx = lerp(lerp(250, 830, a), 260, b)
      drawBits(x, CHAIR, CHAIR_C, cx, 1080, 18)
    } },
  { sign: 'scorpio', cap: 'Went quiet. | Came back *glowing.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', look: [1, 0],
    front(x, t, lt, P, F) {
      label(x, 540, 610, 'DO NOT DISTURB', pop01(t, P.t0 + 0.3, 0.3, 2) * outK(t, [P.t0 + 1.2, P.t0 + 1.35]), { bg: '#c9c4d8', rot: -0.04 })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.35, 12, 200, 2, [GOLD, BONE, '#ff6b8a'])
      label(x, 540, 610, 'HELLO AGAIN', pop01(t, P.t0 + 1.4, 0.3, 2), { bg: '#ff6b8a', color: BONE, rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Needed space. | Booked *a trip.*', mood: 'sparkle', star: { x: 140 }, hops: [0.9],
    back(x, t, lt, P) {
      drawBits(x, SUIT, SUIT_C, 310, 1040, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05 })
      label(x, 310, 870, 'BOARDING', pop01(t, P.t0 + 0.7, 0.3, 2), { bg: '#c97bff', color: BONE, rot: -0.07 })
    } },
  { sign: 'capricorn', cap: 'Scheduled one | *good cry.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(320, 880); x.scale(k, k); x.rotate(-0.05)
      x.fillStyle = INK; x.fillRect(-140, -150, 280, 300)
      x.fillStyle = '#f4e8cc'; x.fillRect(-132, -142, 264, 284)
      x.fillStyle = '#e23d4e'; x.fillRect(-132, -142, 264, 60)
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
        const hi = r === 1 && c === 2 && lt > 0.8
        x.fillStyle = hi ? SKYB : '#c9c4d8'; x.fillRect(-112 + c * 58, -62 + r * 64, 44, 46)
      }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 330, 1080, '3 PM: GOOD CRY', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.05 })
    } },
  { sign: 'aquarius', cap: 'Joined a | *stargazing club.*', mood: 'sparkle', look: [1, -1], star: { x: -160 },
    back(x, t, lt, P) {
      drawBits(x, SCOPE, SCOPE_C, 790, 1010, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 760, 'CLUB NIGHT', pop01(t, P.t0 + 0.7, 0.3, 2), { bg: SKYB, rot: 0.06 })
    } },
  { sign: 'pisces', cap: 'Cried at | *a commercial.*', mood: lt => lt < 1.2 ? 'sparkle' : 'wide', tears: lt => lt < 1.2 ? 2 : 3, star: { x: -110 },
    back(x, t, lt, P) {
      drawBits(x, TV, TV_C, 790, 990, 16 * pop01(t, P.t0 + 0.2, 0.35, 2))
    },
    front(x, t, lt, P) {
      label(x, 790, 1130, 'it was for soup', pop01(t, P.t0 + 1.1, 0.35, 2.2), { size: 26, bg: '#7c74f0', color: BONE, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'trs2breakup', key: 'G', accent: '#c9a6ff',
  title: 'The signs after | a *breakup.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone *came back stronger.*' },
  lesson: { text: 'Healing isn’t | *a race.*', chip: 'SELF-LOVE: UNLOCKED' },
  last: {
    text: '*Glow-up* season.',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
