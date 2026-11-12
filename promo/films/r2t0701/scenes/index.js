// r2t0701: star_talk, BELIKE, "Missed the train? | Zodiacs *be like.*" (topic: zodiacs when they miss the train;
// signs3kit social cut, music: lofi · C). Twelve signs in zodiac order, each one's most extreme reaction to watching
// the doors close. Ending: group (the board says the next one is four minutes away).
//   ♈ raced it to the next stop (and won) · ♉ next one in an hour? picnic on the platform · ♊ told the whole group chat,
//   and their match · ♋ called mom from the platform · ♌ "I meant to wait for the next one" · ♍ replayed every second
//   it went wrong · ♎ couldn't pick a carriage, doors closed · ♏ glared until it reversed · ♐ missed it, booked a
//   flight abroad · ♑ never misses one, arrived yesterday · ♒ built a scooter on the spot · ♓ waved it off, sobbing
//   group "Next train? | *Four minutes.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, fitTitleScenes, RED, CREAM, STEEL, PLUM, clamp, lerp, ease, prog } from './props.js'

const ACC = SKYB, ST = { x: -170 }

/** a little pixel train (side view) at (cx, cy); dx slides it, clipped to the stage panel */
function train(x, t, cx, cy, k, { dx = 0, col = '#6fc3ff', clip = true } = {}) {
  if (k <= 0.01) return
  x.save()
  if (clip) { x.beginPath(); x.rect(112, 482, 856, 736); x.clip() }
  x.translate(cx + dx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-196, -64, 410, 150)
  x.fillStyle = INK; x.fillRect(-210, -80, 420, 150)
  x.fillStyle = col; x.fillRect(-202, -72, 404, 134)
  x.fillStyle = CREAM; x.fillRect(-202, 18, 404, 14)
  for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(-180 + i * 96, -52, 72, 52); x.fillStyle = '#c9ecff'; x.fillRect(-174 + i * 96, -46, 60, 40) }
  for (const wx of [-150, -60, 60, 150]) { x.fillStyle = INK; x.beginPath(); x.arc(wx, 76, 20, 0, 7); x.fill(); x.fillStyle = STEEL; x.beginPath(); x.arc(wx, 76, 12, 0, 7); x.fill() }
  x.restore()
}
/** a platform departures board */
function board(x, cx, cy, k, rows, { head = 'DEPARTURES', w = 340 } = {}) {
  sheet(x, cx, cy, k, { w, h: 70 + rows.length * 52, head, headBg: GOLD, headInk: INK, bg: PLUM, ink: MINT, lines: rows, size: 30, font: MONO, weight: 700, rot: 0.03 })
}
const leaving = (lt, a = 0.2, b = 1.2) => 700 * ease.inCubic(prog(lt, a, b))

const CAMEOS = [
  { sign: 'aries', cap: 'Missed it. | *Raced it to the next stop.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.5, 0.8, 1.1, 1.4],
    front(x, t, lt, P) {
      train(x, t, 770, 760, 0.85 * pop01(t, P.t0 + 0.15, 0.3, 2), { dx: 160 * ease.inOutCubic(prog(lt, 0.2, 1.4)) })
      L(x, 790, 1000, 'ARIES 1 · TRAIN 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 36)
    } },
  { sign: 'taurus', cap: 'Next one’s in an hour? | *Picnic time.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      board(x, 790, 720, pop01(t, P.t0 + 0.15, 0.3, 2), ['NEXT: 60 MIN'])
      bits(x, 'SANDWICH', 720, 990, 13 * pop01(t, P.t0 + 0.8, 0.3, 2))
      bits(x, 'COOKIE', 880, 1010, 11 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 800, 1140, 'BLANKET: OUT', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Missed it. Told | *everyone they’ve ever met.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SENDING…', headCol: '#ffe76a', lines: [['group chat ✓', BONE, pop01(t, P.t0 + 0.5, 0.2, 2)], ['work chat ✓', BONE, pop01(t, P.t0 + 0.8, 0.2, 2)], ['my match ✓', PINK, pop01(t, P.t0 + 1.1, 0.2, 2)], ['the driver?', GOLD, pop01(t, P.t0 + 1.5, 0.2, 2)]], size: 26 })
    } },
  { sign: 'cancer', cap: 'Missed the train. | *Called mom from the platform.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 840, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '♥ MOM', headCol: PINK, lines: [['calling…', BONE, pop01(t, P.t0 + 0.4, 0.2, 2)], ['are you ok??', PINK, pop01(t, P.t0 + 1.0, 0.2, 2), true], ['i’m coming', MINT, pop01(t, P.t0 + 1.5, 0.2, 2), true]], size: 26 })
      hearts(x, t, 800, 700, P.t0 + 1.6, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Missed it. | *“I meant to wait.”*', mood: lt => lt > 1.0 ? 'wink' : 'wide', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      train(x, t, 770, 760, 0.85 * pop01(t, P.t0 + 0.1, 0.3, 2), { dx: leaving(lt, 0.1, 0.9), col: '#ffb34a' })
      bubble(x, 800, 960, 'I prefer | the next one.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: '#ffd23a', tail: 'bl' })
      L(x, 800, 1150, 'COMPLETELY FINE', pop01(t, P.t0 + 1.7, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Missed it by four seconds. | *Replayed every one.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 330, head: 'WHAT WENT WRONG', headBg: MINT, headInk: INK, lines: ['0:01 shoelace', '0:02 the stairs', '0:03 a pigeon', '0:04 fate'], size: 28, font: MONO, weight: 700, align: 'left', progress: prog(lt, 0.3, 1.6), rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a carriage. | *Doors closed.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: lt => [Math.sin(lt * 6) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      train(x, t, 770, 780, 0.85 * pop01(t, P.t0 + 0.1, 0.3, 2), { dx: leaving(lt, 1.3, 2.2), col: PINK })
      L(x, 690, 640, 'CAR 1?', pop01(t, P.t0 + 0.4, 0.3, 2), BONE, -0.06, 32)
      L(x, 890, 640, 'CAR 2?', pop01(t, P.t0 + 0.7, 0.3, 2), BONE, 0.06, 32)
      L(x, 790, 1000, 'DOORS CLOSING', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, -0.03, 32)
    } },
  { sign: 'scorpio', cap: 'Missed it. | *Glared until it came back.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const back = 260 - 260 * ease.outCubic(prog(lt, 0.9, 1.8))
      train(x, t, 770, 780, 0.85 * pop01(t, P.t0 + 0.1, 0.3, 2), { dx: lt < 0.9 ? 260 * ease.inCubic(prog(lt, 0.1, 0.8)) : back, col: '#c97bff' })
      L(x, 790, 1000, 'TRAIN: REVERSING', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#c97bff', 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Missed the train. | *Booked a flight abroad.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.6, 2.0))
      bits(x, 'PLANE', lerp(690, 860, p), lerp(930, 720, p), 26 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.5 })
      bits(x, 'SUITCASE', 820, 1080, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 620, 'WHY NOT?', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Never misses a train. | *Arrived yesterday.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      board(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), ['YOUR TRAIN:', 'TOMORROW'])
      bits(x, 'PILLOW', 790, 1060, 11 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 1150, 'EARLY BY 19 HOURS', pop01(t, P.t0 + 1.4, 0.3, 2.2), STEEL, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Missed it. Built | *a scooter on the spot.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'WRENCH', 700, 740, 10 * k, { rot: Math.sin(t * 8) * 0.3 })
      // the scooter: a deck, a pole, two wheels, assembled in steps
      const n = Math.floor(clamp((lt - 0.4) / 1.0) * 4)
      x.save(); x.translate(820, 1000)
      if (n > 0) { x.fillStyle = INK; x.fillRect(-124, -14, 248, 28); x.fillStyle = MINT; x.fillRect(-118, -8, 236, 16) }
      if (n > 1) { x.fillStyle = INK; x.fillRect(96, -220, 26, 220); x.fillStyle = STEEL; x.fillRect(101, -214, 16, 208); x.fillStyle = INK; x.fillRect(60, -232, 100, 22) }
      if (n > 2) for (const wx of [-100, 110]) { x.fillStyle = INK; x.beginPath(); x.arc(wx, 28, 26, 0, 7); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(wx, 28, 14, 0, 7); x.fill() }
      x.restore()
      if (n > 3) sparkles(x, t, 820, 900, P.t0 + 1.4 * 1.29, 6, 160, 0.3)
      L(x, 790, 640, 'PATENT PENDING', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Missed the train. | *Waved it off, sobbing.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      train(x, t, 770, 760, 0.85 * pop01(t, P.t0 + 0.1, 0.3, 2), { dx: 700 * ease.inOutCubic(prog(lt, 0.3, 2.2)), col: SKYB })
      bubble(x, 800, 980, 'we were | so aligned', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0701', key: 'C', accent: ACC, ending: 'group',
  title: 'Missed the train? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Next train? | *Four minutes.*',
    moods: ['wide', 'happy', 'wide', 'heart', 'wink', 'squint', 'wide', 'squint', 'sparkle', 'happy', 'sparkle', 'wide'],
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.9, 0.35, 2)
      board(x, 540, 740, 1.45 * k, ['NEXT: 4 MIN'], { head: 'PLATFORM 2', w: 380 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
