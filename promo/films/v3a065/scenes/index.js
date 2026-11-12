// v3a065: ADVICE ROLL CALL, "Each sign | after healing." (~54 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order: the small, specific thing each sign does once it has healed. Ending: group.
//   0.0–3.6    "Each sign | *after healing.*"
//   3.6–49.2   ♈ waits for the whole question (INTERRUPTIONS: 0) · ♉ shares the last bite (split down the middle)
//              · ♊ sits with one thought (a single flower) · ♋ deletes the old texts · ♌ posts without a filter
//              · ♍ leaves one mug in the sink · ♎ says "no." (no explanation) · ♏ texts "I miss you" first
//              · ♐ unpacks the suitcase (a plant on the shelf) · ♑ the whole weekend off · ♒ the personal-space bubble shrinks
//              · ♓ still cries: happy tears now (a rainbow)
//  49.2        "Same signs. | *Softer edges.*"  (the ending: group beat)
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, stamp, phone, calendar, thought, bits, ORANGE, RED, TEAL, CREAM, GREY, BROWN, clamp, prog, ease, lerp } from './props.js'

// a kitchen sink with n mugs in it
function sink(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -20, 340, 150); x.fillStyle = '#c9c9d8'; x.fillRect(-162, -12, 324, 134)
  x.fillStyle = '#8f9ab8'; x.fillRect(-140, 6, 280, 96)
  x.fillStyle = INK; x.fillRect(-12, -110, 24, 96); x.fillRect(-12, -110, 80, 22); x.fillStyle = '#c9c9d8'; x.fillRect(-6, -104, 18, 86); x.fillRect(-6, -104, 68, 12)
  x.restore()
  for (let i = 0; i < n; i++) bits(x, 'MUG', cx - 60 + i * 60, cy + 40 * k, 7 * k)
}
// a soft dashed bubble around the star that shrinks
function spaceBubble(x, F, r, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.strokeStyle = SKYB; x.lineWidth = 8; x.setLineDash([22, 16]); x.beginPath(); x.arc(F.x, F.cy, r, 0, Math.PI * 2); x.stroke(); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Waits for | *the whole question.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 830, 1000, 170 * k, { mood: 'happy', look: [-1, 0], seed: 16, glyph: false })
      bubble(x, 800, 780, 'so, what if we— | …and then maybe…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 30, tail: 'br' })
      label(x, 480, 640, 'INTERRUPTIONS: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Shares | *the last bite.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), split = ease.outCubic(prog(lt, 1.0, 1.4))
      if (k > 0.01) { x.save(); x.translate(790, 900); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 40, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4f0ff'; x.beginPath(); x.ellipse(0, -2, 142, 34, 0, 0, Math.PI * 2); x.fill(); x.restore() }
      bits(x, 'CAKE', 790 - split * 50, 860, 9 * k, { sx: 0.5, alpha: 1 })
      if (split > 0.01) bits(x, 'CAKE', 790 + split * 50, 860, 9 * k, { sx: 0.5 })
      label(x, 790, 1060, '50 / 50 (REALLY)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Sits with | *one thought.*', mood: lt => lt > 1.0 ? 'happy' : 'neutral', star: { x: -190 },
    front(x, t, lt, P) {
      thought(x, 760, 760, pop01(t, P.t0 + 0.3, 0.35, 2), '        ', { size: 60 })
      bits(x, 'FLOWER', 760, 750, 14 * pop01(t, P.t0 + 0.9, 0.35, 2))
      label(x, 790, 1040, 'TABS OPEN: 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Deletes | *the old texts.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { time: 'TEXTS', head: 'DELETE 2014?', body: lt < 1.2 ? ['YES   NO'] : ['DELETED ✓'], bodyBg: lt < 1.2 ? GOLD : MINT, size: 34 })
      sparkles(x, t, 790, 820, P.t0 + 1.6, 7, 170, 0.2)
      label(x, 790, 1100, 'LIGHTER ALREADY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Posts | *without a filter.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 830); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -170, 260, 340); x.fillStyle = CREAM; x.fillRect(-120, -160, 240, 320)
        x.fillStyle = '#3a2d70'; x.fillRect(-104, -144, 208, 200)
        signChar(x, t, 'leo', 0, -44, 150, { mood: 'happy', seed: 64, glyph: false, glow: 0.5 })
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FILTER: NONE', 0, 96)
        x.restore()
      }
      label(x, 790, 1080, 'STILL GLOWING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: ORANGE, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'One mug | *in the sink. Fine.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -190 },
    front(x, t, lt, P) {
      sink(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 1)
      label(x, 790, 680, 'TILL MORNING ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Says “no.” | *Just no.*', mood: lt => lt > 0.9 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 760, 760, 'no.', pop01(t, P.t0 + 0.5, 0.25, 2.4), { size: 90, tail: 'bl' })
      label(x, 790, 980, 'EXPLANATION: NONE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'GUILT: ALSO NONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Texts | *“I miss you” first.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { time: '8:12', head: 'YOU (SCORPIO):', body: ['miss you.'], bodyBg: PINK, size: 38, foot: lt > 1.3 ? 'sent. first.' : 'typing…' })
      hearts(x, t, 790, 760, P.t0 + 1.6, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: 'sagittarius', cap: 'Unpacks | *the suitcase.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.fillStyle = INK; x.fillRect(650, 820, 300, 22); x.fillStyle = '#c98f2a'; x.fillRect(654, 824, 292, 14); x.restore() }
      bits(x, 'PLANT', 720, 780, 9 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      bits(x, 'BOOK', 880, 780, 7 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      bits(x, 'SUITCASE', 800, 1040, 14 * k)
      label(x, 790, 650, 'STAYING A WHILE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Takes | *the whole weekend.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      calendar(x, 660, 850, k * 0.85, { month: 'SAT · OFF', big: '6', note: '', rot: -0.06 })
      calendar(x, 900, 870, pop01(t, P.t0 + 0.6, 0.3, 2) * 0.85, { month: 'SUN · OFF', big: '7', note: '', rot: 0.06 })
      label(x, 790, 1080, 'LAPTOP: CLOSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Lets people | *get close.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P, F) {
      const shrink = ease.inOutCubic(prog(lt, 0.6, 1.5))
      spaceBubble(x, F, lerp(330, 170, shrink), pop01(t, P.t0 + 0.2, 0.3, 1.5) * (1 - prog(lt, 1.6, 2.0)))
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', lerp(860, 610, shrink), 960, 180 * k, { mood: lt > 1.5 ? 'heart' : 'happy', look: [-1, 0], seed: 12, glyph: false })
      label(x, 790, 680, 'PERSONAL SPACE: CUTER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Still cries. | *Happy tears now.*', mood: 'heart', tears: 2, star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'RAINBOW', 760, 700, 22 * pop01(t, P.t0 + 0.3, 0.4, 2))
      label(x, 790, 960, 'FORECAST: SUNNY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 760, 700, P.t0 + 0.8, 8, 200, 0.4)
    } },
]

const F = makeFilm({
  id: 'v3a065', key: 'C', accent: MINT, ending: 'group',
  title: 'Each sign | *after healing.*',
  cameos: CAMEOS,
  group: {
    cap: 'Same signs. | *Softer edges.*',
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 1.2, { n: 10, life: 2.6, spread: 760, cell: 8, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
