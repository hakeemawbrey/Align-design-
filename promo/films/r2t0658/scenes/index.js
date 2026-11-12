// r2t0658: star_talk, BELIKE, "Ate my leftovers? | Zodiacs *be like.*" (topic: zodiacs when someone eats their
// leftovers; signs3kit social cut, music: lofi · G). Twelve signs in zodiac order:
//   ♈ house meeting at 2 a.m. · ♉ a funeral for the noodles · ♊ blamed the dog (no dog) · ♋ cooked a fresh batch,
//   for the thief too · ♌ demanded an apology on a stage · ♍ evidence board, has a suspect · ♎ "it's fine!", labels
//   everything now · ♏ said nothing, one very long look · ♐ ate yours too, called it even · ♑ put a lock on the fridge
//   · ♒ invented a leftover alarm · ♓ wept into the empty box (it was soup).
// Ending: callback. group "Nobody | *confessed.*", then "Capricorn locked it. | *Lost the key.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, notes, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, steam, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -170 }, SR = { x: 170 }

// a takeaway box (open, empty or full)
function tbox(x, cx, cy, k, { full = false, name = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-120, -70); x.lineTo(120, -70); x.lineTo(96, 110); x.lineTo(-96, 110); x.closePath(); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.moveTo(-110, -62); x.lineTo(110, -62); x.lineTo(88, 102); x.lineTo(-88, 102); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-126, -110, 252, 44); x.fillStyle = '#e8dcc6'; x.fillRect(-120, -104, 240, 32)
  if (full) { x.fillStyle = '#ffe27a'; for (let i = 0; i < 7; i++) x.fillRect(-90 + i * 26, -100 - (i % 2) * 14, 18, 40) }
  if (name) { x.fillStyle = RED; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, 30) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Called a house meeting. | *At 2 a.m.*', mood: 'wide', star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'WHO?!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 64, col: RED, ink: INK, tail: 'bl' })
      bits(x, 'CLOCK', 800, 900, 12 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 800, 1080, 'MEETING: NOW', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Held a funeral | *for the noodles.*', mood: 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      tbox(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CANDLE', 680, 930, 10 * pop01(t, P.t0 + 0.7, 0.3, 2)); bits(x, 'CANDLE', 920, 930, 10 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 660, 'RIP NOODLES', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 38)
    } },
  { sign: 'gemini', cap: 'Blamed the dog. | *There’s no dog.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'it was the dog.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 920, 'DOGS OWNED: 0', pop01(t, P.t0 + 1.1, 0.3, 2.3), RED, 0.04, 38)
      L(x, 800, 1070, 'SAUCE ON SHIRT', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Cooked a fresh batch. | *For the thief too.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DISH', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 830, { n: 3, h: 130 })
      L(x, 800, 1080, 'SERVES: EVERYONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Demanded an apology. | *On a stage.*', mood: 'sparkle', star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      L(x, 800, 680, '✦ APOLOGY TOUR ✦', pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, 0.04, 34)
      bubble(x, 800, 900, 'LOUDER.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 56, col: BONE, tail: 'bl' })
      sparkles(x, t, 800, 680, P.t0 + 0.4, 7, 170, 0.2)
      L(x, 800, 1080, 'SEATS: SOLD OUT', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Checked the evidence. | *Has a suspect.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 320, head: 'EVIDENCE', headBg: STEEL, headInk: INK, lines: ['fork: wet', 'lid: crooked', ['suspect: twin', '#c2185b']], size: 34, align: 'left', progress: clamp((lt - 0.3) / 1.1) })
      bits(x, 'LENS', 930, 1040, 10 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
  { sign: 'libra', cap: '“It’s fine!” | *Labels everything now.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      tbox(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { full: true, name: 'LIBRA’S ♡' })
      L(x, 760, 680, 'LIBRA’S ♡', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.08, 30)
      L(x, 880, 1080, 'ALSO LIBRA’S ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.06, 30)
    } },
  { sign: 'scorpio', cap: 'Said nothing. | Just *one long look.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 760, `STARE: ${Math.floor(lt * 6)} MIN`, pop01(t, P.t0 + 0.3, 0.3, 2.2), RED, 0.04, 40)
      bubble(x, 800, 960, '…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 60, col: LAV, tail: 'bl' })
      L(x, 800, 1100, 'CONFESSIONS: 3', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Ate yours too. | *Called it even.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: SR, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 330, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      L(x, 330, 660, 'EVEN?', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, 0.05, 48)
      L(x, 330, 1080, 'NOT EVEN.', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 36)
    } },
  { sign: 'capricorn', cap: 'Put a lock | *on the fridge.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], star: SR,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(330, 880); x.scale(k, k); x.fillStyle = INK; x.fillRect(-120, -200, 240, 400); x.fillStyle = '#e8eef8'; x.fillRect(-112, -192, 224, 384); x.fillStyle = STEEL; x.fillRect(-112, -60, 224, 8); x.fillRect(80, -170, 12, 80); x.restore() }
      bits(x, 'KEY', 330, 760, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 330, 1100, 'FRIDGE: SECURED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Invented a | *leftover alarm.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      tbox(x, 800, 920, pop01(t, P.t0 + 0.2, 0.3, 2), { full: true })
      const on = lt > 1.0 && Math.floor(t * 6) % 2
      x.fillStyle = INK; x.fillRect(770, 740, 60, 60); x.fillStyle = on ? RED : '#7a2030'; x.fillRect(776, 746, 48, 48)
      bubble(x, 800, 640, 'BEEP BEEP', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: RED, tail: 'bc', font: MONO, weight: 700 })
      L(x, 800, 1100, 'THIEVES: WARNED', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Wept into the empty box. | *It was soup.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 1], star: ST,
    front(x, t, lt, P) {
      tbox(x, 800, 920, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'IT WAS SOUP', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, 0.04, 40)
      L(x, 800, 1100, 'NOW IT’S TEARS', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0658', key: 'G', accent: ACC, ending: 'callback',
  title: 'Ate my leftovers? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *confessed.*' },
  last: {
    text: 'Capricorn locked it. | *Lost the key.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'capricorn', 380, 1100, 280 * k, { mood: lt > 1.4 ? 'wide' : 'happy', seed: 7, look: [1, 1], hops: [t0 + 1.45] })
      const fk = pop01(t, t0 + 0.3, 0.35, 2)
      if (fk > 0.01) { x.save(); x.translate(760, 1165); x.scale(fk * 0.6, fk * 0.6); x.fillStyle = INK; x.fillRect(-120, -200, 240, 400); x.fillStyle = '#e8eef8'; x.fillRect(-112, -192, 224, 384); x.fillStyle = STEEL; x.fillRect(-112, -60, 224, 8); x.fillStyle = INK; x.fillRect(-46, -40, 92, 80); x.fillStyle = GOLD; x.fillRect(-38, -32, 76, 64); x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(0, -40, 30, Math.PI, 0); x.stroke(); x.restore() }
      // the key slips and falls out of reach
      const f = ease.inQuad(prog(lt, 1.0, 1.7))
      bits(x, 'KEY', lerp(560, 760, f), lerp(1000, 1300, f), 14, { rot: f * 2.4, alpha: 1 - prog(lt, 1.7, 2.2) })
      L(x, 760, 1000, 'FRIDGE: LOCKED', pop01(t, t0 + 0.5, 0.3, 2.2), GOLD, 0.04, 34)
      L(x, 760, 1330, 'KEY: GONE', pop01(t, t0 + 1.8, 0.3, 2.4), RED, -0.04, 36)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
