// r2t0554: star_talk ROLLCALL, "The signs on a | foggy morning." (signs3kit social cut, music: lofi · D). Ending: lesson.
//   ♈ can't see a thing, sprinting anyway · ♉ fog means back to bed · ♊ lost their friend, made a new one · ♋ texted
//   everyone "drive safe!!" · ♌ mirror fogged, devastated · ♍ filed a complaint about the forecast · ♎ 80 moody photos
//   · ♏ finally, weather that matches their vibe · ♐ walked into the fog, came out in a new town · ♑ at work since 5
//   · ♒ built a machine for more fog · ♓ fog is a cloud that got lonely (tears).
//   group: "Can't see a thing. | Still iconic."   lesson: take the next small step.
import { makeFilm, sparkles, hearts, bubble, drawBits, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9d2e8', ST = { x: -180 }
/** soft drifting fog puffs over a region */
function fog(x, t, cx, cy, k, { n = 7, w = 380, h = 300, a = 0.35 } = {}) {
  if (k <= 0.01) return
  x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
  for (let i = 0; i < n; i++) {
    const px = cx - w / 2 + ((i * 97 + t * 30) % w), py = cy - h / 2 + ((i * 53) % h), r = 50 + (i * 23) % 40
    x.globalAlpha = a * clamp(k); x.fillStyle = '#d8dcec'
    x.fillRect(px - r, py - r * 0.5, r * 2, r); x.fillRect(px - r * 0.6, py - r * 0.8, r * 1.2, r * 1.6)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Can’t see a thing. | *Sprinting anyway.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    front(x, t, lt, P) {
      fog(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.4, 1.5))
      L(x, 800, 660, 'VISIBILITY: 0', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.05, 32)
      L(x, 800, 1080, 'SPEED: MAX', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: 'taurus', cap: 'Fog? | *Back to bed.* Obviously.', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      zzz(x, t, 820, 760)
      L(x, 800, 1070, 'PLANS: CANCELED', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Lost their friend in the fog. | *Made a new one.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      fog(x, t, 820, 900, 1 - clamp((lt - 0.8) / 0.6) * 0.6, { a: 0.4 })
      friend(x, t, 'capricorn', 840, 930, 140, pop01(t, P.t0 + 0.9, 0.3, 2), { mood: 'wide', look: [-1, 0], seed: 52 })
      bubble(x, 800, 690, 'hi stranger! BFFs?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Texted everyone: | *“drive safe!!”*', mood: 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SENT TO: ALL', headCol: SKYB, lines: [['drive safe!!', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['headlights ON', GOLD, pop01(t, P.t0 + 0.9, 0.25, 2.2)], ['text when home', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2)]] })
      L(x, 800, 1090, 'CONTACTS: 214', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Mirror fogged up. | *Devastated.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 830); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -170, 260, 340); x.fillStyle = GOLD; x.fillRect(-122, -162, 244, 324); x.fillStyle = '#bfe6ff'; x.fillRect(-102, -142, 204, 284)
        x.restore()
        if (lt < 0.9) signChar(x, t, 'leo', 800, 830, 120 * k, { mood: 'sparkle', glyph: false, seed: 53, alpha: 0.8 })
        fog(x, t, 800, 830, clamp((lt - 0.7) / 0.4), { w: 200, h: 260, a: 0.55, n: 6 })
      }
      L(x, 800, 1070, 'WHERE DID I GO', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Forecast said sunny. | *Filed a complaint.*', mood: lt => lt > 1.2 ? 'neutral' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'COMPLAINT', headBg: RED, lines: ['re: “sunny”', 'see attached', 'fog (photo)'], size: 30, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1090, 'PAGES: 6', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Fog? So *aesthetic.* | Took 80 photos.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      fog(x, t, 800, 840, 1, { a: 0.25 })
      bits(x, 'LENS', 800, 840, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = Math.max(1, Math.floor(clamp((lt - 0.4) / 1.5) * 80))
      L(x, 800, 1070, `PHOTO ${n} OF 80`, pop01(t, P.t0 + 0.4, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Finally, weather that | *matches their vibe.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { fog(x, t, 540, 860, pop01(t, P.t0 + 0.2, 0.4, 1.5), { w: 700, h: 420, a: 0.22, n: 10 }) },
    front(x, t, lt, P) {
      L(x, 800, 700, 'MYSTERY: MAXED', pop01(t, P.t0 + 0.8, 0.3, 2.2), LAV, 0.05, 32)
      bubble(x, 800, 1060, 'perfect.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Walked into the fog. | Came out *in a new town.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 830, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      fog(x, t, 800, 830, 1 - clamp((lt - 0.5) / 1.0), { a: 0.5 })
      L(x, 800, 1070, 'WHERE AM I? LOVE IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Fog delay? | At work *since 5.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 860, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 680, '5:02 AM', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.05, 40)
      L(x, 800, 1070, 'INBOX: ZERO', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Loved the fog. | Built *a machine for more.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 9) * 0.04 })
      fog(x, t, 800, 730, clamp((lt - 0.8) / 0.6), { w: 320, h: 200, a: 0.45 })
      L(x, 800, 1090, 'FOG: ON DEMAND', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Fog is just a cloud | that *got lonely.*', mood: 'wide', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOUD', 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 660, 'I’ll be your friend', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      hearts(x, t, 800, 980, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 11 })
    } },
]

const F = makeFilm({
  id: 'r2t0554', key: 'D', accent: ACC, ending: 'lesson',
  title: 'The signs on a | *foggy morning.*',
  cameos: CAMEOS,
  group: { cap: 'Can’t see a thing. | *Still iconic.*' },
  lesson: { text: 'Can’t see far ahead? | Take *one small step.*', chip: 'PATH: CLEARING' },
  last: { text: 'The fog lifts. | *It always does.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
