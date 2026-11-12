// r2a0295: star_advice, ADVICE ROLLCALL, "Each sign's | hidden worry." (~54 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "Each sign's | *hidden worry.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one quiet worry per sign + a warm reframe, each with a light gag:
//              ♈ "too much" (you're just enough) · ♉ change (some change is growth) · ♊ too scattered (curious is a gift)
//              · ♋ caring too much (never too much) · ♌ the applause stopping (loved offstage) · ♍ not perfect (already
//              lovely) · ♎ someone's upset (not all on you) · ♏ opening up (the right ones stay) · ♐ being tied down (love
//              can come along) · ♑ rest is lazy (rest counts) · ♒ not fitting in (your weird is welcome) · ♓ feeling too deeply
//  49.2        group ending: "Everyone worries. | *Everyone’s worth it.*"  Hearts float up over the group photo.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, GREY, DEEP, GREEN, WOOD, BROWN, SUN, clamp, ease, lerp, prog } from './props.js'

const ACC = LAV
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const SPROUT = ['...G.G...', '..GGGGG..', '...GGG...', '....G....', '....G....', '.BBBBBBB.', 'BBBBBBBBB', '.BBBBBBB.']
const BAG = ['..KKKK...', '.K....K..', 'KKKKKKKK.', 'KOOOOOOK.', 'KOOKKOOKK', 'KOOOOOOKP', 'KOOOOOOK.', 'KKKKKKKK.']
const PUZZLE = ['..KK..', 'KKPPKK', 'KPPPPK', 'PPPPPPK', 'KPPPPK', 'KKPPKK', '..KK..']
const PILLOW = ['.KKKKKKKKKK.', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', '.KKKKKKKKKK.']
const DIAL = ['..KKKKK..', '.KWWWWWK.', 'KWWWWWWWK', 'KWWWWWWWK', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']

const CAMEOS = [
  { sign: 'aries', cap: 'Worries they’re "too much." | *You’re just enough.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, DIAL, { K: INK, W: CREAM }, 790, 860, 24 * k)
      const a = lerp(1.2, 0, ease.inOutCubic(prog(lt, 0.6, 1.2))) - 0.6
      if (k > 0.5) { x.save(); x.translate(790, 860); x.rotate(a); x.fillStyle = RED; x.fillRect(-6, -78, 12, 78); x.restore() }
      lab(x, 790, 1080, lt > 1.2 ? 'VOLUME: JUST RIGHT' : 'VOLUME: 11', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: lt > 1.2 ? MINT : ORANGE, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Worries change means loss. | *Some change grows.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = ease.outBack ? ease.outBack(clamp((lt - 0.4) / 0.9)) : ease.outCubic(clamp((lt - 0.4) / 0.9))
      drawBits(x, SPROUT, { G: GREEN, B: BROWN }, 790, 960 - 40 * g, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { sy: 0.6 + 0.4 * g })
      lab(x, 790, 700, 'NEW LEAF', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: MINT, rot: 0.04, size: 38 })
    } },
  { sign: 'gemini', cap: 'Worries they’re scattered. | *Curious is a gift.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const tabs = ['moths', 'french', 'pottery', 'space', 'jazz', 'knots']
      tabs.forEach((s, i) => lab(x, 690 + (i % 2) * 190, 650 + Math.floor(i / 2) * 110, s, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { size: 28, bg: [SUN, PINK, SKYB][i % 3], rot: (i % 3 - 1) * 0.06 }))
      lab(x, 790, 1100, 'TABS OPEN: ALL OF THEM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: BONE, rot: -0.03 })
    } },
  { sign: 'cancer', cap: 'Worries they care too much. | *Never too much.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), b = 1 + 0.06 * Math.sin(t * 6)
      drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 790, 860, 30 * k * b)
      lab(x, 790, 1090, 'CARE LEVEL: ∞', pop01(t, P.t0 + 1.0, 0.3, 2.4), { bg: PINK, rot: 0.04, size: 36 })
    } },
  { sign: 'leo', cap: 'Worries the applause stops. | *You’re loved offstage.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 1000, 180 * k, { mood: 'heart', look: [-1, 0], seed: 32, glyph: false, hops: [P.t0 + 1.2, P.t0 + 1.6] })
      bubble(x, 790, 690, 'hey. how are | YOU, though?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'br' })
      lab(x, 440, 640, 'STAGE: OFF', pop01(t, P.t0 + 0.3, 0.3, 2), { bg: GREY, rot: -0.05 })
    } },
  { sign: 'virgo', cap: 'Worries it’s not perfect. | *It’s already lovely.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tilt = lt < 1.0 ? 0.12 : 0.12 * Math.exp(-(lt - 1.0) * 6) * Math.cos((lt - 1.0) * 18)
      card(x, 790, 850, 260, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: GOLD, rot: tilt, border: 10 }, () => {
        x.fillStyle = '#ffd6e6'; x.fillRect(-110, -90, 220, 180)
        x.fillStyle = SUN; x.beginPath(); x.arc(-30, -20, 34, 0, Math.PI * 2); x.fill()
        x.fillStyle = GREEN; x.fillRect(-110, 40, 220, 50)
      })
      lab(x, 790, 1100, 'VERDICT: LOVELY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Worries someone’s upset. | *Not all on you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const items = ['their mood', 'the weather', 'the vibe', 'everyone']
      items.forEach((s, i) => {
        const drop = ease.inCubic(prog(lt, 1.35 + i * 0.12, 1.75 + i * 0.12))
        lab(x, 790 + (i % 2 ? 60 : -60), 650 + i * 90 + drop * 700, s, pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2) * (1 - drop), { size: 28, bg: LAV, rot: (i % 2 ? 0.05 : -0.05) })
      })
      lab(x, 790, 1100, 'SHOULDERS: LIGHTER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: MINT, rot: 0.03, size: 30 })
    } },
  { sign: 'scorpio', cap: 'Worries about opening up. | *The right ones stay.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const op = ease.inOutCubic(prog(lt, 0.5, 1.1))
      x.save(); x.globalAlpha = clamp(P.k); x.fillStyle = INK; x.fillRect(680, 640, 230, 460); x.fillStyle = '#fff1b0'; x.fillRect(690, 650, 210, 440); x.restore()
      if (op > 0.3) signChar(x, t, 'pisces', 795, 930, 170, { mood: 'heart', look: [-1, 0], seed: 33, glyph: false, tears: 1, pop: clamp((op - 0.3) * 2) })
      x.save(); x.globalAlpha = clamp(P.k); x.fillStyle = '#5b2e1a'; x.fillRect(690 + 190 * op, 650, 210 - 190 * op, 440); x.restore()
      lab(x, 795, 1150, 'STILL HERE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: PINK, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Fears being tied down. | *Love can come along.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      drawBits(x, BAG, { K: INK, O: ORANGE, P: PINK }, 760, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 900, 1010, 150 * k, { mood: 'sparkle', look: [-1, 0], seed: 34, glyph: false, hops: [P.t0 + 1.2, P.t0 + 1.7] })
      lab(x, 790, 660, 'PACKED FOR TWO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: SUN, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Worries rest is lazy. | *Rest counts too.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', star: { x: -170, y: 20 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { K: INK, W: '#e8f0ff' }, 370, 1030, 26 * pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      card(x, 790, 830, 270, 180, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'TO DO:', -105, -46, { size: 26, font: MONO, weight: 700, align: 'left' })
        txt(x, lt > 1.0 ? '✓ nap' : '☐ nap', -105, 20, { size: 40, align: 'left', color: lt > 1.0 ? GREEN : INK })
      })
      lab(x, 790, 1080, 'TASK COMPLETE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Worries they don’t fit in. | *Your weird is welcome.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sl = ease.inOutCubic(prog(lt, 0.6, 1.2))
      x.save(); x.globalAlpha = clamp(P.k); x.fillStyle = INK; x.fillRect(660, 760, 260, 220); x.fillStyle = '#9a7be0'; x.fillRect(668, 768, 244, 204)
      x.fillStyle = '#140c30'; x.fillRect(760, 820, 84, 84); x.fillRect(790, 800, 24, 20); x.restore()
      drawBits(x, PUZZLE, { K: INK, P: SKYB }, lerp(880, 802, sl), lerp(640, 862, sl), 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: (1 - sl) * 0.8, outline: null })
      lab(x, 790, 1080, 'FITS PERFECTLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: SKYB, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Worries they feel too deeply. | *That’s your superpower.*', mood: 'sparkle', tears: 2, look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      if (lt > 0.9) { const g = ease.outCubic(prog(lt, 0.9, 1.4)); x.save(); x.globalAlpha = 0.3 * g; x.fillStyle = SKYB; x.beginPath(); x.arc(F.x, F.cy, 210 * g, 0, Math.PI * 2); x.fill(); x.restore() }
      lab(x, 790, 760, 'SUPERPOWER:', pop01(t, P.t0 + 0.5, 0.3, 2), { bg: BONE, rot: -0.04 })
      lab(x, 790, 860, 'FEELINGS', pop01(t, P.t0 + 0.9, 0.3, 2.4), { bg: SKYB, rot: 0.04, size: 44 })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.0, 8, 210, 0.4, [SKYB, BONE, LAV])
    } },
]

const F = makeFilm({
  id: 'r2a0295', key: 'G', accent: ACC, ending: 'group',
  title: 'Each sign’s | *hidden worry.*',
  cameos: CAMEOS,
  group: {
    cap: 'Everyone worries. | *Everyone’s worth it.*',
    draw(x, t, lt) { hearts(x, t, 540, 1350, t - lt + 1.2, { n: 12, life: 2.8, spread: 800, cell: 8, seed: 13 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
