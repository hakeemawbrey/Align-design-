// r2a0719: star_advice, ADVICE SOLO (leo), "Leo, it's okay | to be quiet." (signs3kit social cut, lofi · E).
// One sign the whole way: nine gentle permissions for a Leo who feels they always have to be "on", each with one light
// gag. Ending: callback (the sun that set in card six rises again, brightness back to 100).
//   brightness dial at 40, cozy · skipped the party, still a star · best listener · sunglasses off, just you
//   · do not disturb · even suns set · cheered from the crowd · a journal, not a post · quiet Leos still glow
//   group "Loud or quiet. | Always loved."   last "Back tomorrow. | Fully charged."
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -190 }

/** a dial that turns down to a level */
function dial(x, cx, cy, k, v, txt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 16; x.beginPath(); x.arc(0, 0, 80, Math.PI * 0.75, Math.PI * (0.75 + 1.5 * v)); x.stroke()
  x.fillStyle = BONE; x.font = `800 44px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 4)
  x.restore()
}
/** a sun sinking (or rising) behind a horizon line; h: 0 = fully up, 1 = gone */
function horizonSun(x, cx, cy, cell, h, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k)
  x.beginPath(); x.rect(cx - 170, cy - 400, 340, 400); x.clip()
  bits(x, 'SUN', cx, cy - 90 + h * 220, cell)
  x.restore()
  x.save(); x.globalAlpha *= clamp(k); x.fillStyle = INK; x.fillRect(cx - 160, cy - 4, 320, 12); x.fillStyle = '#ff9a4a'; x.fillRect(cx - 160, cy - 2, 320, 6); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Not in the mood to shine? | *Dim is cozy.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const v = lerp(1, 0.4, ease.inOutCubic(clamp((lt - 0.5) / 1.0)))
      dial(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), v, `${Math.round(v * 100)}`)
      L(x, 800, 660, 'BRIGHTNESS', pop01(t, P.t0 + 0.4, 0.3, 2), CREAM, -0.04, 32)
      L(x, 800, 1080, 'COZY MODE', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 36)
    } },
  { sign: S, cap: 'Skipped the party? | *Still a star.*', mood: 'happy', star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 260, head: 'PARTY TONIGHT', headBg: PINK, headInk: INK, lines: ['RSVP:', 'next time ♡'], size: 36, progress: clamp((lt - 0.5) / 0.8) })
      bits(x, 'MUG', 800, 1075, 15 * pop01(t, P.t0 + 1.4, 0.3, 2.2))
    } },
  { sign: S, cap: 'Listened more than talked? | *They noticed.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 830, 940, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      bubble(x, 800, 680, 'and then…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'br' })
      L(x, 830, 1120, 'BEST LISTENER', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Sunglasses off. | *Just you is plenty.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: { x: -150 },
    front(x, t, lt, P, F) {
      const off = ease.inOutCubic(clamp((lt - 0.6) / 0.7))
      bits(x, 'SHADES', lerp(F.x, 790, off), lerp(F.cy - 6, 1040, off), 18, { rot: off * 0.4 })
      L(x, 780, 680, 'NO FILTER', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 40)
    } },
  { sign: S, cap: 'Phone on silent? | *The world can wait.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DO NOT DISTURB', headCol: LAV, size: 24, lines: [['(quiet)', BONE, pop01(t, P.t0 + 0.6, 0.2, 2)], ['(still quiet)', BONE, pop01(t, P.t0 + 1.1, 0.2, 2)], ['(lovely)', MINT, pop01(t, P.t0 + 1.6, 0.2, 2)]] })
    } },
  { sign: S, cap: 'Need to recharge alone? | *Even suns set.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      horizonSun(x, 800, 1000, 16, ease.inOutCubic(clamp((lt - 0.5) / 1.3)), pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, 'BACK TOMORROW', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'Cheered from the crowd? | *Generous is gorgeous.*', mood: 'heart', star: ST, hops: [0.8, 1.3, 1.8],
    front(x, t, lt, P) {
      friend(x, t, 'aries', 830, 900, 170, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'sparkle', look: [-1, 0] })
      L(x, 830, 680, 'ARIES ON STAGE', pop01(t, P.t0 + 0.4, 0.3, 2), CREAM, -0.04, 30)
      bubble(x, 760, 1100, 'GO ARIES!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl', col: GOLD })
    } },
  { sign: S, cap: 'Wrote it in a journal? | *Some things stay yours.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      L(x, 800, 680, 'NOT POSTED', pop01(t, P.t0 + 0.8, 0.3, 2.2), STEEL, 0.04, 36)
      L(x, 800, 1080, 'JUST FOR ME', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 36)
    } },
  { sign: S, cap: 'Quiet Leos | *still glow.*', mood: 'sparkle', star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.save(); x.globalAlpha = 0.35 * k; x.fillStyle = '#ffd27a'; x.beginPath(); x.arc(800, 830, 130 + 8 * Math.sin(t * 3), 0, Math.PI * 2); x.fill(); x.restore()
      bits(x, 'CANDLE', 800, 880, 22 * k)
      L(x, 800, 1090, 'SOFT GLOW: ON', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0719', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Leo, it’s okay | *to be quiet.*',
  cameos: CAMEOS,
  group: { cap: 'Loud or quiet. | *Always loved.*', mood: 'heart' },
  last: {
    text: 'Back tomorrow. | *Fully charged.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.35, 2)
      horizonSun(x, 540, 1360, 20, 1 - ease.outCubic(clamp((lt - 0.4) / 1.4)), k)
      friend(x, t, 'leo', 540, 1520, 200, pop01(t, t0 + 0.6, 0.35, 2), { mood: lt > 1.6 ? 'sparkle' : 'sleepy', seed: 45 })
      L(x, 820, 1700, 'BRIGHTNESS: 100', pop01(t, t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 34)
      sparkles(x, t, 540, 1200, t0 + 1.8, 9, 240, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
