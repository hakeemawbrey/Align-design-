// r2t0558: star_talk, BELIKE, "Zodiacs after a season finale | be like." (signs3kit social cut, music: lofi · G). Ending: lesson.
//   ♈ already demanding season two · ♉ rewatching it right now · ♊ nine theories, all wrong · ♋ misses them like family
//   · ♌ recast themself as the lead · ♍ a report on the plot holes · ♎ shipping everyone with everyone · ♏ called the twist
//   in episode one · ♐ booked a trip to the filming spot · ♑ 7/10, slept fine · ♒ defending the villain · ♓ crying at the credits
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, zzz, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -170 }

/** a little TV with text on screen */
function tv(x, cx, cy, k, text, { size = 40, bg = '#3a5a9a', ink = BONE, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -100, 320, 230)
  x.fillStyle = INK; x.fillRect(-166, -122, 332, 236); x.fillStyle = '#2a2350'; x.fillRect(-156, -112, 312, 216)
  x.fillStyle = bg; x.fillRect(-140, -96, 280, 176)
  x.fillStyle = INK; x.fillRect(-40, 114, 80, 16); x.fillRect(-80, 128, 160, 12)
  x.fillStyle = ink; x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(text).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, -8 + (i - (a.length - 1) / 2) * size * 1.15))
  x.restore()
}
/** a movie poster with a name on it */
function poster(x, t, cx, cy, k, name) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -160, 260, 350)
  x.fillStyle = INK; x.fillRect(-136, -176, 272, 352); x.fillStyle = '#ffb34a'; x.fillRect(-126, -166, 252, 332)
  x.fillStyle = '#7a3a1a'; x.fillRect(-110, -150, 220, 230)
  x.fillStyle = GOLD; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('STARRING', 0, 110)
  x.font = `800 46px ${INTER}`; x.fillStyle = INK; x.fillText(name, 0, 145)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Already demanding | *season two.*', mood: lt => lt < 1.2 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      tv(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'THE END', { size: 52 })
      bubble(x, 800, 620, 'AND NOW??', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, col: '#ff6b5a', tail: 'bl' })
      L(x, 800, 1070, `EMAILS SENT: ${Math.min(40, Math.floor(clamp((lt - 1.0) / 1.0) * 40))}`, pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Rewatching it. | *Right now.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      tv(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.0 ? 'THE END' : 'EPISODE 1', { size: 44 })
      bits(x, 'REMOTE', 640, 1060, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.4 })
      L(x, 830, 1070, 'SNACKS: RESTOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'gemini', cap: 'Nine theories. | *All wrong.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const TH = ['the dog did it', 'it was a dream', 'twins!!', 'time travel?', 'the narrator']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.2) / 0.36))
      bubble(x, 800, 700, TH[n], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 900, `THEORY #${n + 5}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.05, 34)
      L(x, 800, 1080, 'CORRECT: 0', pop01(t, P.t0 + 1.8, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'Misses the characters. | Like *real family.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 280, head: 'MISSING', headBg: '#6fc3ff', headInk: INK, lines: ['the grandma', 'the dog', 'the whole town'], size: 30 })
      hearts(x, t, 800, 820, P.t0 + 1.1, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
      L(x, 800, 1110, 'SET THEM A PLACE', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Recast themself | *as the lead.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      poster(x, t, 800, 860, pop01(t, P.t0 + 0.3, 0.35, 2), 'LEO')
      sparkles(x, t, 800, 860, P.t0 + 0.8, 8, 210, 0.2)
      bubble(x, 800, 600, 'fixed it.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Found every plot hole. | *Wrote a report.*', mood: lt => lt < 1.3 ? 'squint' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'PLOT HOLES', headBg: MINT, headInk: INK, lines: ['1. the boat?', '2. ep 4, 12:31', '3. the dog?!', '4. why snow'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1110, 'PAGE 1 OF 14', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Shipping everyone | *with everyone.*', mood: 'heart', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const pts = [[700, 720], [900, 720], [700, 960], [900, 960]]
      if (k > 0.01) {
        x.save(); x.strokeStyle = PINK; x.lineWidth = 6; x.globalAlpha = clamp((lt - 0.5) * 2)
        for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) { x.beginPath(); x.moveTo(...pts[i]); x.lineTo(...pts[j]); x.stroke() }
        x.restore()
        pts.forEach(([px, py], i) => drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: ['#ff4f86', PINK, '#c97bff', '#6fc3ff'][i] }, px, py, 9 * k))
      }
      L(x, 800, 1110, 'COMPATIBILITY: ALL', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Called the twist. | In *episode one.*', mood: lt => lt < 1.2 ? 'neutral' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 220, head: 'SEALED · EP 1', headBg: '#c97bff', headInk: INK, lines: lt > 1.0 ? ['“it’s the', 'mailman.”'] : ['?????'], size: 34 })
      L(x, 800, 1060, 'TOLD YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, -0.04, 38)
    } },
  { sign: 'sagittarius', cap: 'Booked a trip | to *the filming spot.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const p = prog(lt, 0.2, 2.0)
      if (p > 0 && p < 1) bits(x, 'PLANE', lerp(520, 960, p), 680 - 60 * p, 14, { rot: Math.PI / 2 })
      bits(x, 'SUITCASE', 800, 920, 28 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 1110, 'FLIGHT: TONIGHT', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#ff9a4a', -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Rated it seven. | *Slept fine.*', mood: lt => lt < 1.1 ? 'neutral' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 260, h: 200, head: 'REVIEW', headBg: '#2fc79a', headInk: INK, lines: ['7/10'], size: 64, font: MONO, weight: 700 })
      L(x, 800, 1060, 'BEDTIME: 9:30 SHARP', pop01(t, P.t0 + 1.0, 0.3, 2.4), STEEL, -0.04, 28)
      if (lt > 1.2) zzz(x, t, 470, 700)
    } },
  { sign: 'aquarius', cap: 'Defending the villain. | *Respectfully.*', mood: lt => lt < 1.0 ? 'squint' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'he was | misunderstood', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: '#6fc3ff', tail: 'bl' })
      bubble(x, 800, 900, 'a 40-slide | deck, why?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1110, 'TEAM VILLAIN: 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Crying at the credits. | *The font.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 830); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-166, -152, 332, 304); x.fillStyle = '#05040c'; x.fillRect(-156, -142, 312, 284)
        x.beginPath(); x.rect(-156, -142, 312, 284); x.clip()
        x.fillStyle = BONE; x.textAlign = 'center'; x.font = `700 24px ${MONO}`
        const NM = ['DIRECTOR', 'a. person', 'BEST BOY', 'b. person', 'CATERING', 'c. person', 'THE DOG', 'good boy']
        for (let i = 0; i < 12; i++) { const y = 160 + i * 52 - ((lt * 90) % 104) - lt * 40; x.globalAlpha = i % 2 ? 0.7 : 1; x.fillText(NM[i % NM.length], 0, y) }
        x.restore()
      }
      L(x, 800, 1110, 'SO PRETTY', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0558', key: 'G', accent: ACC, ending: 'lesson',
  title: 'After the finale, | zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody is | *okay.*' },
  lesson: { text: 'Love things hard. | Even *made-up* things.', chip: 'FEELINGS: VALID' },
  last: { text: 'Season two? | Pisces *isn’t ready.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
