// r2t0616: star_talk, ROLLCALL (twelve signs), "The signs in a | *packed elevator.*" (signs3kit social cut, music: lofi · C).
// Aries: pressed "close door" forty times · Taurus: finished lunch between floors · Gemini: three best friends by floor 4
// · Cancer: asked a stranger if they ate today · Leo: mirror wall = photoshoot · Virgo: did the weight-limit math
// · Libra: pressed every button, couldn't decide · Scorpio: won the silence · Sagittarius: wrong floor, explored it
// · Capricorn: pitched the boss between floors · Aquarius: pressed floor 13 · Pisces: sobbed at the elevator music.
// Ending: callback. "Everyone got off. | *Libra's still riding.*" (the all-lit button panel comes back).
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, swapLabel, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }

// an elevator button panel: a steel plate with round numbered buttons; `lit` = which are glowing (fn of index)
function buttons(x, cx, cy, k, lit, { n = 8, cols = 2, size = 1, head = '' } = {}) {
  if (k <= 0.01) return
  const rows = Math.ceil(n / cols), w = cols * 96 + 40, h = rows * 96 + (head ? 96 : 40)
  x.save(); x.translate(cx, cy); x.scale(k * size, k * size)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 12, -h / 2 + 14, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = '#c9cfe0'; x.fillRect(-w / 2, -h / 2, w, h)
  let top = -h / 2 + 20
  if (head) {
    x.fillStyle = NIGHT; x.fillRect(-w / 2 + 16, -h / 2 + 16, w - 32, 60)
    x.fillStyle = '#ff6b5a'; x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 47)
    top += 76
  }
  for (let i = 0; i < n; i++) {
    const c = i % cols, r = Math.floor(i / cols)
    const bx = -w / 2 + 20 + c * 96 + 48, by = top + r * 96 + 48
    const on = lit(i)
    x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 38, 0, Math.PI * 2); x.fill()
    x.fillStyle = on ? '#ffe27a' : '#8a90a8'; x.beginPath(); x.arc(bx, by, 32, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(i + 1), bx, by + 2)
  }
  x.restore()
}
const MIRROR = 'rgba(190,225,255,0.22)'

const CAMEOS = [
  { sign: 'aries', cap: 'Pressed “close door.” | *Forty times.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -90, 300, 180)
        x.fillStyle = '#c9cfe0'; x.fillRect(-142, -82, 284, 164)
        const press = Math.floor(lt * 6) % 2
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 66, 0, Math.PI * 2); x.fill()
        x.fillStyle = press ? '#ffe27a' : '#ff6b5a'; x.beginPath(); x.arc(0, press ? 4 : 0, 58, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.beginPath(); x.moveTo(-40, -26); x.lineTo(-8, 0); x.lineTo(-40, 26); x.fill(); x.beginPath(); x.moveTo(40, -26); x.lineTo(8, 0); x.lineTo(40, 26); x.fill()
        x.restore()
      }
      L(x, 800, 1060, `PRESSES: ${Math.min(40, Math.floor(clamp((lt - 0.3) / 1.4) * 40))}`, pop01(t, P.t0 + 0.4, 0.3, 2), RED, -0.04, 38)
      L(x, 800, 620, 'DOOR: OPEN', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, 0.05, 30)
    } },
  { sign: 'taurus', cap: 'Floor two to three. | Finished *lunch.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (lt < 0.9) bits(x, 'SANDWICH', 800, 840, 24 * k)
      else if (lt < 1.5) bits(x, 'BITTEN', 800, 840, 24)
      else bits(x, 'PLATE', 800, 860, 22 * pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2))
      swapLabel(x, 800, 1070, lt, 1.5, 'FLOOR 2', 'FLOOR 3: FULL', { size: 36, fromBg: STEEL, toBg: MINT })
    } },
  { sign: 'gemini', cap: 'Floor four. | Three *new best friends.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 720, 1020, 150, pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      friend(x, t, 'virgo', 880, 1020, 150, pop01(t, P.t0 + 0.9, 0.35, 2), { mood: 'squint', look: [-1, 0] })
      bubble(x, 790, 700, 'what’s your | sign??', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 220, cell: 7, seed: 2 })
    } },
  { sign: 'cancer', cap: 'Asked a total stranger | if they *ate today.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'capricorn', 830, 1010, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.4 ? 'wide' : 'neutral', look: [-1, 0] })
      bubble(x, 760, 690, 'did you | eat today?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      bits(x, 'COOKIE', 640, 1090, 14 * pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.4))
    } },
  { sign: 'leo', cap: 'Mirrored walls? | *Full photoshoot.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: ST, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k
      x.fillStyle = INK; x.fillRect(630, 640, 340, 440); x.fillStyle = '#b9d6f2'; x.fillRect(642, 652, 316, 416)
      x.fillStyle = MIRROR; x.fillRect(666, 652, 36, 416); x.fillRect(716, 652, 14, 416)
      x.restore()
      signChar(x, t, 'leo', 800, 880, 180 * k, { mood: Math.floor(lt * 2.4) % 2 ? 'sparkle' : 'wink', look: [-1, 0], glyph: false, seed: 41, alpha: 0.7 })
    },
    front(x, t, lt, P) {
      const fl = Math.floor(lt * 2.4) % 2 && lt > 0.5
      if (fl) { x.save(); x.fillStyle = 'rgba(255,250,235,0.35)'; x.fillRect(642, 652, 316, 416); x.restore() }
      L(x, 800, 1110, `TAKE ${Math.max(1, Math.floor(lt * 16))}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, -0.04, 36)
      L(x, 800, 620, 'NEW PROFILE PIC', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Read the weight limit. | Did *the math.*', mood: lt => lt > 1.6 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 360, head: 'MAX: 12 PEOPLE', headBg: STEEL, headInk: INK, lines: ['us: 11', '+ 3 bags', '+ 1 lunch', '= RISKY'], size: 36, align: 'left', progress: prog(lt, 0.3, 1.4) })
      bubble(x, 800, 1100, 'nobody | inhale', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Pressed every floor. | *Couldn’t decide.*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.4) / 1.2) * 8)
      buttons(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), i => i < n, { n: 8, cols: 2 })
      L(x, 800, 1130, 'FLOORS: ALL OF THEM', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Didn’t say a word. | *Won the silence.*', mood: lt => lt > 1.5 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 680, '…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 70, col: STEEL, tail: 'bl' })
      bits(x, 'TROPHY', 800, 900, 18 * pop01(t, P.t0 + 1.2 * 1.29, 0.35, 2.2))
      sparkles(x, t, 800, 900, P.t0 + 1.7, 7, 150, 0.4)
      L(x, 800, 1100, 'QUIET: 1ST PLACE', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Got off on the wrong floor. | *Explored it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 840, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      L(x, 800, 640, 'FLOOR 9: ??', pop01(t, P.t0 + 0.5, 0.3, 2), STEEL, 0.04, 34)
      bubble(x, 800, 1060, 'new | adventure!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Pitched the boss | *between floors.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 620, `FLOOR ${Math.min(30, 1 + Math.floor(lt * 12))}`, pop01(t, P.t0 + 0.3, 0.3, 2), STEEL, 0.04, 32)
      L(x, 800, 1040, 'DEAL: CLOSED', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.4), '#2fc79a', -0.05, 40)
    } },
  { sign: 'aquarius', cap: 'Pressed floor 13. | *There isn’t one.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 830); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
        x.fillStyle = lt > 1.0 ? '#c9a6ff' : '#8a90a8'; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.font = `800 90px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('13', 0, 6)
        x.restore()
      }
      sparkles(x, t, 800, 830, P.t0 + 1.4, 9, 170, 0.8, [LAV, MINT, BONE])
      bubble(x, 800, 1080, 'going up!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'The elevator music started. | *Sobbed.*', mood: lt => lt < 1.0 ? 'happy' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 800, 900, { n: 5, cell: 9, col: SKYB, alpha: clamp((lt - 0.2) / 0.4) })
      bits(x, 'TISSUE', 800, 1060, 16 * pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2.2))
      bubble(x, 800, 650, 'it’s just | so pretty', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: '#b7a6ff', tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0616', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs in a | *packed elevator.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One tiny box.*', moods: ['wide', 'heart', 'sparkle', 'happy', 'wink', 'squint', 'neutral', 'wink', 'sparkle', 'neutral', 'sparkle', 'wide'] },
  last: {
    text: 'Everyone got off. | *Libra’s still riding.*',
    draw(x, t, lt) {
      const t0 = t - lt
      buttons(x, 740, 1110, pop01(t, t0 + 0.4, 0.35, 2), i => i < 8, { n: 8, cols: 2, size: 0.95, head: lt > 1.4 ? '▲ 1' : '▼ 8' })
      const k = pop01(t, t0 + 0.6, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'libra', 380, 1110, 300 * k, { mood: lt > 1.6 ? 'wide' : 'neutral', look: [Math.floor(lt * 2) % 2 ? 1 : -1, 0], seed: 88, glyph: false, hops: [t0 + 1.6] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
