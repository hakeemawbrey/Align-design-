// r2t0750: star_talk, SOLO, "Scorpio roommates | *be like.*" (topic: "Your Scorpio roommate | be like") (~48 s vertical, signs3kit social cut, music: lofi · F).
// One sign the whole way, nine cards, each the most extreme (and lovable) Scorpio roommate:
//   labelled their food in code · knows who ate the leftovers, waits · candles only · up when you got home, made tea
//   · blackout curtains on every window · one look and the guest leaves · the wifi password is a riddle
//   · checked your sign before signing the lease · your ex texts, the roommate replies
//  37.8  "Intense roommate. | *Best roommate.*"   41.0  LESSON "Scary loyal. | *Lucky you.*" HOUSEHOLD: SAFE
//  46.9  "Rent’s due? | *Already paid.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, phone, friend, steam, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const S = 'scorpio', ACC = '#e23d66', ST = { x: -170 }

// a little fridge with labelled jars
function fridge(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -196, 250, 404)
  x.fillStyle = INK; x.fillRect(-130, -208, 260, 408)
  x.fillStyle = '#e8edf7'; x.fillRect(-122, -200, 244, 392)
  x.fillStyle = '#fff9e8'; x.fillRect(-104, -182, 208, 356)
  x.fillStyle = STEEL; x.fillRect(-104, -60, 208, 8); x.fillRect(-104, 60, 208, 8)
  const jars = [[-50, -110], [50, -110], [-50, 10], [50, 10], [0, 120]]
  jars.forEach(([jx, jy], i) => {
    x.fillStyle = INK; x.fillRect(jx - 34, jy - 40, 68, 84); x.fillStyle = ['#ff9a5a', '#a8e07a', '#ffd23a', PINK, SKYB][i]; x.fillRect(jx - 28, jy - 34, 56, 72)
    if (lt > 0.4 + i * 0.15) { x.fillStyle = '#ffffff'; x.fillRect(jx - 26, jy - 6, 52, 26); x.fillStyle = ACC; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(['X-7', '♏︎ 02', '???', 'NO.', '♏︎♏︎'][i], jx, jy + 8) }
  })
  x.restore()
}
// a window with a blackout curtain sliding shut
function windowCurtain(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -150, 280, 300)
  x.fillStyle = '#ffe7a8'; x.fillRect(-128, -138, 256, 276)
  x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(40, -40, 46, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-4, -138, 8, 276); x.fillRect(-128, -4, 256, 8)
  const w = 128 * p
  x.fillStyle = '#2a1238'; x.fillRect(-128, -138, w, 276); x.fillRect(128 - w, -138, w, 276)
  x.fillStyle = '#3d1a52'; for (let i = 0; i < 4; i++) { x.fillRect(-128 + i * w / 4, -138, 6, 276); x.fillRect(128 - w + i * w / 4, -138, 6, 276) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Labels their food. | *In code.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      fridge(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 790, 1120, 'DECODE IT. I DARE YOU.', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 26)
    } },
  { sign: S, cap: 'Knows who ate the leftovers. | *Waits.*', mood: 'squint', look: lt => [lt > 1 ? 1 : 0, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 790, 920, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1080, 'EMPTY.', pop01(t, P.t0 + 0.6, 0.3, 2), STEEL, 0.05, 34)
      L(x, 790, 700, 'EVIDENCE: FILED', pop01(t, P.t0 + 1.3, 0.3, 2.4), ACC, -0.04, 32)
    } },
  { sign: S, cap: 'Lights? Never. | *Candles only.*', mood: 'happy', star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)
        bits(x, 'CANDLE', 700 + i * 90, 960 - (i % 2) * 40, 16 * k)
        if (k > 0.5) { x.save(); x.globalAlpha = 0.2 + 0.08 * Math.sin(t * 9 + i); x.fillStyle = '#ffb34a'; x.beginPath(); x.arc(700 + i * 90, 900 - (i % 2) * 40, 70, 0, Math.PI * 2); x.fill(); x.restore() }
      }
      L(x, 790, 700, 'AMBIENCE: DRAMATIC', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Up when you got home. | *Made you tea.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 900, 640, 12 * pop01(t, P.t0 + 0.1, 0.3, 2))
      bits(x, 'MUG', 790, 940, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      steam(x, t, 780, 880, { n: 3, h: 110 })
      bubble(x, 700, 700, 'it’s 2 a.m. | sit.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
      L(x, 790, 1110, 'STILL WARM ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Blackout curtains. | *Every window.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      windowCurtain(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.6, 1.3)))
      L(x, 790, 1090, 'SUNLIGHT: DENIED', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 32)
    } },
  { sign: S, cap: 'Guest stays too long? | *One look.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const leave = ease.inCubic(prog(lt, 1.1, 1.9))
      friend(x, t, 'sagittarius', 790 + leave * 260, 980, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 0.9 ? 'wide' : 'happy', look: [-1, 0], alpha: 1 - leave, seed: 33 })
      bubble(x, 790, 720, 'I should… | go. bye!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bc' })
      L(x, 790, 1120, 'THE LOOK: USED', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'The wifi password? | *A riddle.*', mood: 'wink', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 310, head: 'WIFI PASSWORD', headBg: ACC, lines: ['what has eyes', 'but never sleeps?', '(no hints.)'], size: 28, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 790, 1100, 'GUESSES LEFT: 1', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Checked your sign | *before the lease.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, head: 'LEASE', headBg: STEEL, headInk: INK, lines: ['rent: split', 'quiet hours: yes', ['your sign: OK ✓', '#2f8a48']], size: 28, align: 'left', progress: clamp((lt - 0.4) / 1.1) })
      L(x, 790, 1110, 'APPROVED. (BARELY)', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Your ex texts? | *Roommate replies.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'YOUR EX', headCol: STEEL, lines: [['miss me?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2)], ['no. ♏︎', ACC, pop01(t, P.t0 + 1.1, 0.25, 2), true]] })
      L(x, 790, 1110, 'HANDLED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 38)
    } },
]

const F = makeFilm({
  id: 'r2t0750', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Scorpio roommates | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Intense roommate. | *Best roommate.*', mood: 'sparkle' },
  lesson: { text: 'Scary loyal. | *Lucky you.*', chip: 'HOUSEHOLD: SAFE' },
  last: {
    text: 'Rent’s due? | *Already paid.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
