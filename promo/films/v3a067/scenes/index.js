// v3a067: ADVICE SOLO, "Cancer, read this | before your next date." (~43 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way (makeFilm solo mode, 9 cards): warm date advice for a Cancer, one gag each. Ending: group.
//   0.0–3.6    "Cancer, read this | *before your next date.*"
//   3.6–37.8   date one, not forever one (the photo album "US", ALBUM: TOO SOON) · let them hold the umbrella for you
//              · ask them questions too ("and you?") · wear the brave outfit (the mirror sparkles) · nerves are just
//              butterflies · you can leave early (EXIT, NO GUILT) · laugh loud, snort included · feelings can arrive
//              slowly (a snail delivers the letter) · watch how they treat the waiter (Virgo's tray, a green check)
//  37.8        "Open heart. | *Comfy shoes.*"  (the ending: group beat, Cancer comes back, heart eyes)
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, stamp, bits, door, fitTitleScenes, ORANGE, RED, TEAL, CREAM, GREY, BROWN, WOOD, clamp, prog, ease, lerp } from './props.js'

const S = 'cancer', SILVER = '#c9d6f0'
// a photo album with "US" on the cover, empty pages
function album(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -100, 316, 230)
  x.fillStyle = INK; x.fillRect(-160, -116, 320, 232)
  if (open < 0.5) { x.fillStyle = PINK; x.fillRect(-152, -108, 304, 216); x.fillStyle = CREAM; x.fillRect(-90, -50, 180, 100); x.fillStyle = INK; x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('US ♥', 0, 4) }
  else { x.fillStyle = CREAM; x.fillRect(-152, -108, 148, 216); x.fillRect(4, -108, 148, 216); x.strokeStyle = '#c9c0b0'; x.lineWidth = 4; x.setLineDash([12, 10]); x.strokeRect(-130, -80, 104, 80); x.strokeRect(26, -80, 104, 80); x.strokeRect(-130, 14, 104, 70); x.strokeRect(26, 14, 104, 70) }
  x.restore()
}
// a standing mirror
function mirror(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-100, -180, 200, 330); x.fillStyle = WOOD; x.fillRect(-92, -172, 184, 314)
  x.fillStyle = '#bfe6ff'; x.fillRect(-76, -156, 152, 282)
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-60, -140, 20, 120); x.fillRect(-30, -140, 10, 60)
  x.fillStyle = INK; x.fillRect(-70, 150, 16, 60); x.fillRect(54, 150, 16, 60)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Date one. | *Not forever one.*', mood: lt => lt > 1.3 ? 'happy' : 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      album(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.8, 0.9))
      label(x, 790, 1050, 'ALBUM: A BIT SOON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them | *hold the umbrella.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: { x: -150 },
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = 0.6 * pop01(t, P.t0 + 0.1, 0.3, 1.2); x.fillStyle = SKYB
      for (let i = 0; i < 22; i++) { const ph = (t * 1.4 + i * 0.37) % 1; const rx = 220 + (i * 41) % 720; if (rx > 250 && rx < 530 && lt > 1.0) continue; x.fillRect(rx, 480 + ph * 640, 5, 24) }
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 690, 1000, 170 * k, { mood: 'happy', look: [-1, 0], seed: 27, glyph: false })
      const u = ease.outCubic(prog(lt, 0.8, 1.2))
      bits(x, 'UMBRELLA', lerp(720, 480, u), lerp(880, 680, u), 20 * k)
      label(x, 790, 650, 'FOR ONCE: DRY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask them | *questions too.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 830, 990, 180 * k, { mood: lt > 1.4 ? 'wide' : 'neutral', look: [-1, 0], seed: 28, glyph: false })
      bubble(x, 470, 620, '…and you?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bc' })
      bubble(x, 830, 720, 'oh! well…', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bc' })
    } },
  { sign: S, cap: 'Wear | *the brave outfit.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      mirror(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'SHIRT', 790, 790, 16 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.04 })
      label(x, 790, 1100, 'VERDICT: ICONIC', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 800, P.t0 + 1.3, 8, 170, 0.3)
    } },
  { sign: S, cap: 'Nerves are just | *butterflies.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2), a = t * 1.3 + i * 1.05
        bits(x, 'BUTTERFLY', 720 + Math.cos(a) * (90 + i * 16), 820 + Math.sin(a * 1.3) * (80 + i * 10), 9 * k, { sy: 0.6 + 0.4 * Math.abs(Math.sin(t * 12 + i)) })
      }
      label(x, 790, 1080, 'CUTE ONES, THOUGH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You’re allowed | *to leave early.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      door(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.85, prog(lt, 1.1, 1.6) * 0.35, { col: TEAL })
      label(x, 790, 570, 'EXIT', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: MINT, rot: 0, font: MONO, weight: 700 })
      label(x, 790, 1090, 'GUILT: NOT INCLUDED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laugh loud. | *Snort included.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', star: { x: -190 }, hops: [1.0, 1.3, 1.6],
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'HA HA HA', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 800, 860, '*SNORT*', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 50, bg: PINK, rot: 0.08 })
      label(x, 790, 1060, 'THEY SNORTED BACK ♥', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Feelings can | *arrive slowly.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 1], star: { x: -190 },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.2, 2.0))
      bits(x, 'SNAIL', lerp(880, 620, p), 1060, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'ENVELOPE', lerp(880, 620, p) + 10, 990, 8 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 700, 'DELIVERY: NO RUSH', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Watch how they | *treat the waiter.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 840, 1000, 170 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 29, glyph: false })
      if (k > 0.01) { x.save(); x.fillStyle = INK; x.fillRect(740, 880, 200, 16); x.fillStyle = '#c9c9d8'; x.fillRect(744, 884, 192, 8); x.restore(); bits(x, 'MUG', 820, 860, 6 * k) }
      bubble(x, 800, 700, 'thank you | so much!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'br' })
      stamp(x, 470, 640, pop01(t, P.t0 + 1.5, 0.3, 2.6), 'GREEN FLAG ✓', { col: TEAL, size: 30, rot: -0.1 })
    } },
]

const F = makeFilm({
  id: 'v3a067', key: 'E', accent: SILVER, solo: S, ending: 'group',
  title: 'Cancer, read this | *before your next date.*',
  cameos: CAMEOS,
  group: {
    cap: 'Open heart. | *Comfy shoes.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)   // the hook is long: shrink it to fit two lines
export const CUES = F.CUES
export const T = F.T
