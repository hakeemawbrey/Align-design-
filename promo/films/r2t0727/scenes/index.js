// r2t0727: star_talk, ROLLCALL, "The signs hanging | *a picture frame.*" (signs3kit social cut, lofi · E). Ending: group.
//   ♈ no measuring, eleven holes · ♉ leaned it on the wall since 2019 · ♊ one frame became a gallery wall
//   · ♋ framed the group chat · ♌ framed their profile pic, life-size · ♍ one millimetre off, started over
//   · ♎ left, right, left, back where it started · ♏ hid a safe behind it · ♐ hung it crooked, called it art
//   · ♑ a spreadsheet for one nail · ♒ hung their birth chart on the ceiling · ♓ cried at a leaf, then framed it
//   group "Twelve signs. | *One crooked frame.*" (a crooked frame swings over the photo)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, frame, chart, B, C, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0'
Object.assign(B, {
  HAMMER: ['SSSSSS..', 'SSSSSSS.', 'SSSSSS..', '..WW....', '..WW....', '..WW....', '..WW....', '..WW....', '..WW....'],
  NAIL: ['SSS', '.S.', '.S.', '.S.'],
  LEAF: ['.....GG', '...GGGG', '..GGLGG', '.GGLGGG', '.GLGGG.', 'GLGGG..', 'BGG....', 'B......'],
  SAFE: ['KKKKKKKKKK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSYYSSSK', 'KSSYKKYSSK', 'KSSSYYSSSK', 'KSSSSSSSSK', 'KKKKKKKKKK'],
  LEVEL: ['YYYYYYYYYYYYYY', 'YYYYYGGGYYYYYY', 'YYYYYGWGYYYYYY', 'YYYYYYYYYYYYYY'],
})
Object.assign(C, {
  HAMMER: { S: STEEL, W: WOOD }, NAIL: { S: STEEL },
  LEAF: { G: '#ff9a4a', L: '#ffd23a', B: WOOD },
  SAFE: { K: INK, S: '#6b62a8', Y: GOLD },
  LEVEL: { Y: '#ffd23a', G: MINT, W: '#ffffff' },
})
const tiny = (x, t, id, cx, cy, s, o = {}) => signChar(x, t, id, cx, cy, s, { glyph: false, seed: 33, ...o })

const CAMEOS = [
  { sign: 'aries', cap: 'Didn\'t measure. | *Eleven holes.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      const n = Math.min(11, Math.floor(clamp((lt - 0.2) / 1.3) * 11))
      for (let i = 0; i < n; i++) { const hx = 680 + ((i * 53) % 230), hy = 640 + ((i * 97) % 330); x.fillStyle = INK; x.beginPath(); x.arc(hx, hy, 13, 0, Math.PI * 2); x.fill(); x.fillStyle = '#05040c'; x.beginPath(); x.arc(hx, hy, 8, 0, Math.PI * 2); x.fill() }
      bits(x, 'HAMMER', 600, 900, 16 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.6 + Math.sin(t * 14) * 0.3 })
      L(x, 790, 1120, 'HOLES: 11 · NAILS: 1', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Leaned it on the wall. | *Since 2019.*', mood: 'sleepy', star: { x: -160, y: 10 },
    front(x, t, lt, P) {
      frame(x, 800, 960, 240, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.18, col: WOOD, inner: '#3a5a9a' })
      L(x, 790, 680, 'HANGING: SOON', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, -0.04, 34)
      // cobweb in the corner
      if (lt > 1.3) { x.save(); x.globalAlpha = clamp((lt - 1.3) / 0.4) * 0.8; x.strokeStyle = BONE; x.lineWidth = 3; for (let r = 30; r <= 90; r += 30) { x.beginPath(); x.arc(930, 820, r, Math.PI * 0.5, Math.PI); x.stroke() } for (let a = 0.5; a <= 1.01; a += 0.25) { x.beginPath(); x.moveTo(930, 820); x.lineTo(930 + Math.cos(Math.PI * a) * 100, 820 + Math.sin(Math.PI * a) * 100); x.stroke() } x.restore() }
    } },
  { sign: 'gemini', cap: 'Hung one frame. | Now *a gallery wall.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const cols = ['#ff6b5a', '#8fe3ff', '#ffd23a', '#c97bff', '#7dffb0', '#ff8fb1', '#ffb34a']
      const spots = [[790, 820, 130, 160], [660, 680, 90, 90], [920, 670, 100, 80], [650, 1000, 90, 120], [930, 960, 110, 110], [790, 1080, 120, 70], [920, 1110, 70, 70]]
      spots.forEach(([cx, cy, w, h], i) => frame(x, cx, cy, w, h, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), { rot: (i % 2 ? 0.04 : -0.04), col: i % 3 ? GOLD : CREAM, inner: cols[i] }))
    } },
  { sign: 'cancer', cap: 'Framed the group chat. | *Every message.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      frame(x, 800, 880, 300, 400, k, { rot: -0.03, fn(x, w, h) {
        x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
        const msgs = [['miss u!', BONE, 0], ['brunch?', MINT, 1], ['♡♡♡', PINK, 0], ['yes!!', SKYB, 1], ['love u', LAV, 0]]
        msgs.forEach(([m, c, r], i) => { if (lt < 0.4 + i * 0.25) return; x.font = `700 26px ${MONO}`; const mw = x.measureText(m).width + 24; x.fillStyle = c; x.fillRect(r ? w / 2 - 16 - mw : -w / 2 + 16, -h / 2 + 18 + i * 62, mw, 44); x.fillStyle = INK; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillText(m, (r ? w / 2 - 16 - mw : -w / 2 + 16) + 12, -h / 2 + 42 + i * 62) })
      } })
      L(x, 800, 1130, 'VOL. 1 OF 40', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Framed their profile pic. | *Life-size.*', mood: 'sparkle', look: [-1, 0], star: { x: -200, y: 40, s: 240 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 1.8)
      frame(x, 720, 820, 420, 520, k, { rot: 0.02, col: GOLD, inner: '#5a2a1a', fn(x, w, h) { tiny(x, t, 'leo', 0, 30, 330, { mood: 'wink', glow: 1.2 }) } })
    },
    front(x, t, lt, P) {
      L(x, 720, 1110, 'MY PROFILE PIC', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 34)
      sparkles(x, t, 720, 820, P.t0 + 1.1, 8, 240, 0.2)
    } },
  { sign: 'virgo', cap: 'One millimetre off. | *Started over.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      frame(x, 790, 840, 260, 200, k, { rot: lt > 1.2 ? 0 : 0.012, col: CREAM, inner: '#6fc3ff' })
      bits(x, 'LEVEL', 790, 1010, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 1130, 'ATTEMPT #14', pop01(t, P.t0 + 1.3, 0.3, 2.2), RED, 0.04, 34)
      bubble(x, 790, 660, '0.1 cm off.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Left. Right. Left. | *Back where it started.*', mood: lt => lt > 1.8 ? 'happy' : 'squint', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const dx = lt > 1.8 ? 0 : Math.sin(lt * 4) * 90
      x.save(); x.globalAlpha = 0.3; x.strokeStyle = BONE; x.setLineDash([12, 10]); x.lineWidth = 4; x.strokeRect(790 - 130, 760 - 100, 260, 200); x.restore()
      frame(x, 790 + dx, 760, 260, 200, k, { col: GOLD, inner: PINK })
      bubble(x, 790, 1020, lt > 1.8 ? 'perfect.' : 'a bit more?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Hid a safe | *behind the frame.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'SAFE', 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const sw = ease.inOutCubic(clamp((lt - 0.6) / 0.6))
      frame(x, 790 + sw * 120, 860, 260 * (1 - 0.75 * sw), 220, pop01(t, P.t0 + 0.2, 0.3, 2), { col: GOLD, inner: '#5a2a5a' })
      L(x, 790, 1110, 'CONTENTS: CLASSIFIED', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Hung it crooked. | Called it *art.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      frame(x, 790, 840, 280, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.32, col: GOLD, inner: '#ff9a4a', fn(x, w, h) { x.fillStyle = '#ffe27a'; x.beginPath(); x.arc(30, -10, 40, 0, Math.PI * 2); x.fill() } })
      L(x, 790, 1080, '"IT\'S A VIBE"', pop01(t, P.t0 + 1.0, 0.3, 2.4), CREAM, -0.05, 38)
    } },
  { sign: 'capricorn', cap: 'Made a spreadsheet. | For *one nail.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 330, head: 'NAIL_PLAN_v7', headBg: '#2fc79a', lines: ['height: 152 cm', 'budget: 1 nail', 'risk: low', 'Q3: hang it'], size: 28, progress: clamp((lt - 0.3) / 1.2), align: 'left' })
      bits(x, 'NAIL', 790, 1110, 18 * pop01(t, P.t0 + 1.5, 0.3, 2.4))
    } },
  { sign: 'aquarius', cap: 'Hung their birth chart | on *the ceiling.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [0, -1], star: { x: -150, y: 60 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      frame(x, 790, 700, 290, 290, k, { rot: Math.PI + 0.05, col: GOLD, inner: NIGHT, fn(x) { chart(x, 0, 0, 110, 1, t) } })
      bits(x, 'NAIL', 790, 548, 12 * k, { rot: Math.PI })
      x.save(); x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(110, 520, 860, 12); x.restore()
      L(x, 790, 1100, 'VIEWING: LIE DOWN', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cried at a leaf. | Then *framed it.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (lt < 1.0) bits(x, 'LEAF', 790, lerp(620, 880, ease.outCubic(clamp(lt / 1.0))), 18 * k, { rot: Math.sin(t * 4) * 0.4 })
      else { frame(x, 790, 880, 260, 300, pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2), { col: GOLD, inner: CREAM }); bits(x, 'LEAF', 790, 880, 18) }
      L(x, 790, 1130, '"OUR LEAF"', pop01(t, P.t0 + 1.7, 0.3, 2.2), SKYB, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0727', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs hanging | *a picture frame.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *One crooked frame.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.4, 0.4, 2)
      bits(x, 'NAIL', 540, 560, 12 * k)
      frame(x, 540, 690, 300, 210, k, { rot: 0.22 + Math.sin(lt * 3) * 0.06, col: GOLD, inner: '#3a2a6a', fn(x) { tiny(x, t, 'aries', -60, 10, 90, { mood: 'happy' }); tiny(x, t, 'pisces', 60, 10, 90, { mood: 'happy', tears: 1 }) } })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
