// r2t0764: star_talk, BELIKE, "Sign twin spotted? | Zodiacs be like." (topic: "Zodiacs meeting their sign twin
// be like", reworded to fit two lines; signs3kit social cut, lofi · D). Ending: lesson. Every card: a sign meets
// another of the same sign.
//   ♈ raced to say hi, tied, rematch · ♉ one snack, a standoff · ♊ four personalities, one chat · ♋ met an hour ago,
//   crying together · ♌ two Leos, one spotlight · ♍ corrected each other's corrections · ♎ where to eat? day three
//   · ♏ neither shares a secret first · ♐ met at the gate, booked a trip · ♑ swapped cards, formed a company
//   · ♒ finally, someone as weird · ♓ both sobbed, instantly
//   group "Like looking | *in a mirror.*"   LESSON "Being understood | *feels like home.*" TWIN: FOUND
//   last "Two Leos? | *Still not sharing.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0'
/** the twin: the same sign, facing the hero */
const twin = (x, t, P, id, o = {}) => friend(x, t, id, o.x ?? 800, o.y ?? 990, o.s ?? 220, pop01(t, P.t0 + (o.at ?? 0.3), 0.35, 2), { look: [-1, 0], seed: 37, ...o })

const CAMEOS = [
  { sign: 'aries', cap: 'Raced to say hi. | *Tied.* Rematch.', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -160 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      twin(x, t, P, 'aries', { at: 0.2, mood: lt > 1.2 ? 'wide' : 'sparkle', hops: [P.t0 + 0.5, P.t0 + 0.9, P.t0 + 1.3] })
      L(x, 600, 680, 'PHOTO FINISH', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 36)
      L(x, 800, 760, 'RACE #2: NOW', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, 0.05, 32)
    } },
  { sign: 'taurus', cap: 'One snack left. | *Neither moved.*', mood: 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      twin(x, t, P, 'taurus', { mood: 'squint' })
      bits(x, 'COOKIE', 600, 1100, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 600, 700, 'STANDOFF: HOUR 2', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#5fd068', 0.05, 32)
    } },
  { sign: 'gemini', cap: 'Four personalities. | *One conversation.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      twin(x, t, P, 'gemini', { mood: Math.floor(lt * 3) % 2 ? 'sparkle' : 'wink' })
      const W = ['wait—', 'me too—', 'ANYWAY—', 'so true—']
      for (let i = 0; i < 4; i++) bubble(x, 470 + (i % 2) * 300, 620 + Math.floor(i / 2) * 110, W[i], pop01(t, P.t0 + 0.5 + i * 0.25, 0.25, 2.2), { size: 34, tail: i % 2 ? 'br' : 'bl' })
    } },
  { sign: 'cancer', cap: 'Met an hour ago. | *Crying together.*', mood: 'heart', tears: lt => lt > 0.8 ? 2 : 0, look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      twin(x, t, P, 'cancer', { mood: 'heart', tears: lt > 0.8 ? 2 : 0 })
      L(x, 600, 680, 'BEST FRIENDS NOW', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, 0.05, 32)
      hearts(x, t, 600, 960, P.t0 + 1.2, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Two Leos. | *One spotlight.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -160 }, hops: [1.3],
    back(x, t, lt, P) {
      const sw = Math.sin(lt * 3.2), cx = lerp(380, 800, (sw + 1) / 2)
      x.save(); x.globalAlpha = 0.3 * clamp(lt / 0.4); x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(560, 470); x.lineTo(620, 470); x.lineTo(cx + 170, 1180); x.lineTo(cx - 170, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      twin(x, t, P, 'leo', { mood: lt > 1.2 ? 'squint' : 'sparkle', hops: [P.t0 + 1.0] })
      L(x, 590, 690, 'MINE. NO, MINE.', pop01(t, P.t0 + 1.0, 0.3, 2.4), '#ffb34a', 0.05, 34)
    } },
  { sign: 'virgo', cap: 'Corrected each other’s | *corrections.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      twin(x, t, P, 'virgo', { x: 840, mood: 'squint' })
      sheet(x, 620, 760, pop01(t, P.t0 + 0.5, 0.35, 2), { w: 260, h: 220, head: 'NOTES', headBg: MINT, headInk: INK, lines: [['its', '#b9b0a0'], ['it’s', '#c0392b'], ['IT IS.', '#2f8a48']], size: 32, progress: clamp((lt - 0.6) / 1.0) })
    } },
  { sign: 'libra', cap: 'Where to eat? | *Day three.*', mood: lt => lt > 1.5 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      twin(x, t, P, 'libra', { look: [Math.floor(lt * 2.5) % 2 ? -1 : 1, 0] })
      bubble(x, 600, 640, 'you pick ♡', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 820, 760, 'no, YOU ♡', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'br' })
      L(x, 600, 1120, 'MATCH: SAME SIGN', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Who shares a secret first? | *Nobody.*', mood: 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      twin(x, t, P, 'scorpio', { mood: 'neutral' })
      bubble(x, 520, 640, 'you first.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
      bubble(x, 820, 760, 'no. you.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'br', col: LAV })
      L(x, 600, 1120, 'SECRETS SHARED: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Met at the gate. | *Booked a trip.*', mood: 'sparkle', look: [1, 0], star: { x: -160 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      twin(x, t, P, 'sagittarius', { mood: 'sparkle', hops: [P.t0 + 0.9, P.t0 + 1.7] })
      L(x, 600, 680, 'GATE: ANYWHERE', pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.05, 36)
      const p = prog(lt, 1.0, 2.4)
      if (p > 0 && p < 1) bits(x, 'PLANE', lerp(200, 980, p), 820 - 80 * p, 12, { rot: Math.PI / 2 - 0.1 })
    } },
  { sign: 'capricorn', cap: 'Swapped business cards. | Formed *a company.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      twin(x, t, P, 'capricorn', { mood: lt > 1.3 ? 'happy' : 'neutral' })
      sheet(x, 600, 700, pop01(t, P.t0 + 0.5, 0.3, 2), { w: 240, h: 130, rot: -0.08, lines: ['CAP', 'ceo'], size: 30 })
      L(x, 600, 1120, 'TWIN CORP: EST.', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Finally met someone | *as weird.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      twin(x, t, P, 'aquarius', { mood: lt > 1.0 ? 'heart' : 'wide' })
      x.save(); x.strokeStyle = MINT; x.lineWidth = 6
      for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.globalAlpha = (1 - ph) * clamp(lt - 0.6); x.beginPath(); x.arc(590, 900, 30 + ph * 90, -0.9, 0.9); x.stroke(); x.beginPath(); x.arc(590, 900, 30 + ph * 90, Math.PI - 0.9, Math.PI + 0.9); x.stroke() }
      x.restore()
      L(x, 600, 680, 'SAME WAVELENGTH', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.05, 32)
    } },
  { sign: 'pisces', cap: 'Met a Pisces. | *Both sobbed.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      twin(x, t, P, 'pisces', { mood: 'wide', tears: lt < 0.8 ? 2 : 3 })
      bits(x, 'TISSUE', 600, 1110, 13 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 600, 680, 'INSTANTLY', pop01(t, P.t0 + 0.7, 0.3, 2.4), SKYB, 0.05, 36)
    } },
]

const F = makeFilm({
  id: 'r2t0764', key: 'D', accent: ACC, ending: 'lesson',
  title: 'Sign twin spotted? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Like looking | *in a mirror.*' },
  lesson: { text: 'Being understood | *feels like home.*', chip: 'TWIN: FOUND' },
  last: {
    text: 'Two Leos? | *Still not sharing.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      // the two Leos, still elbowing for one spotlight, in the gap above the group photo
      const sw = Math.sin(lt * 3), cx = lerp(400, 680, (sw + 1) / 2)
      x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(515, 560); x.lineTo(565, 560); x.lineTo(cx + 120, 840); x.lineTo(cx - 120, 840); x.closePath(); x.fill(); x.restore()
      if (k > 0.01) {
        signChar(x, t, 'leo', 400, 740, 190 * k, { mood: 'squint', look: [1, 0], seed: 40, glyph: false })
        signChar(x, t, 'leo', 680, 740, 190 * k, { mood: 'squint', look: [-1, 0], seed: 41, glyph: false })
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
