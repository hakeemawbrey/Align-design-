// r2t0582: star_talk, BELIKE, "Zodiacs when they see | a rainbow *be like.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, each one's most extreme reaction to a rainbow. Ending: group (the group beat is the punchline).
//   ♈ raced to the end of it, still running · ♉ wants the gold, brought a shovel · ♊ called everyone: "go outside NOW"
//   · ♋ woke up the whole house · ♌ took a selfie, the rainbow was the background · ♍ counted the colours, only six?
//   · ♎ matched their outfit to it · ♏ stared at it until it looked away · ♐ tried to drive under it, day three
//   · ♑ asked who's maintaining it · ♒ explained refraction, nobody asked · ♓ sobbed happily
//   group "One rainbow. | *Total chaos.*" with the rainbow arching over the group photo.
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, rainbow, RAINBOW, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffe76a', ST = { x: -170 }
const SHOVEL = ['..SSS..', '.SSSSS.', '.SSSSS.', '.SSSSS.', '..SSS..', '...W...', '...W...', '...W...', '...W...', '...W...', '..WWW..']
const CAR = ['...RRRRR....', '..RWWRWWR...', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', '.KK.....KK..']
const SHIRT = ['.SS...SS.', 'SSSSSSSSS', 'SSSSSSSSS', '.SSSSSSS.', '.SSSSSSS.', '.SSSSSSS.', '.SSSSSSS.']
// a rainbow inside the panel, top right
const sky = (x, t, P, lt, o = {}) => { x.save(); x.beginPath(); x.rect(116, 486, 848, 728); x.clip(); rainbow(x, o.cx ?? 770, o.cy ?? 900, Math.min(175, o.r ?? 175), pop01(t, P.t0 + 0.15, 0.35, 1.8), { band: o.band ?? 16, p: prog(lt, 0.15, 0.7), ...o, r: undefined }); x.restore() }

const CAMEOS = [
  { sign: 'aries', cap: 'Raced to the end of it. | *Still running.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.4, 0.7, 1.0, 1.3, 1.6].slice(0, 3),
    front(x, t, lt, P) {
      sky(x, t, P, lt)
      L(x, 790, 1000, `KM ${Math.floor(clamp(lt / 2.2) * 40) + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 44)
      bubble(x, 790, 1150, 'ALMOST THERE', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: '#ff8a7a', tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Heard about the gold. | Brought a *shovel.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sky(x, t, P, lt, { cy: 840 })
      drawBits(x, SHOVEL, { S: STEEL, W: '#c98f5a' }, 820, 950, 18 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.3 + Math.sin(t * 6) * 0.08 })
      L(x, 790, 1160, 'DIGGING: DAY 1', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Called everyone. | *“GO OUTSIDE. NOW.”*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.35))
      phone(x, t, 800, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CALLING…', headCol: '#ffd23a', lines: ['mom', 'bestie', 'ex?', 'the group'].map((s, i) => [s, i === 2 ? PINK : BONE, i < n ? 1 : 0, i % 2 === 1]), size: 28 })
      L(x, 800, 1150, 'CONTACTS: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Woke up the whole house. | *“Come SEE.”*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.1],
    front(x, t, lt, P) {
      sky(x, t, P, lt, { cy: 820, r: 170 })
      bits(x, 'HOUSE', 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1150, 'everyone UP', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Took a selfie. | Rainbow: *background.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const k = 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388); x.fillStyle = '#7dc8ff'; x.fillRect(-112, -170, 224, 340)
        x.save(); x.beginPath(); x.rect(-112, -170, 224, 340); x.clip(); rainbow(x, 0, 60, 150, 1, { band: 12 }); x.restore()
        x.restore()
        signChar(x, t, 'leo', 800, 900, 190 * k / 1.2, { mood: 'wink', seed: 61, glyph: false })
      }
      L(x, 800, 1130, 'RAINBOW: CROPPED', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'virgo', cap: 'Counted the colours. | *Only six?* Concerned.', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sky(x, t, P, lt, { cy: 880, r: 200, band: 20 })
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.5) / 0.15))
      L(x, 790, 700, `COUNT: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), BONE, -0.04, 36)
      L(x, 790, 1020, 'INDIGO: MISSING?', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Matched their outfit | *to it.* Instantly.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      sky(x, t, P, lt, { cy: 820, r: 170 })
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) { const cols = { S: RAINBOW[Math.floor(t * 4) % 6] }; drawBits(x, SHIRT, cols, 790, 960, 20 * k) }
      L(x, 790, 1150, 'OUTFIT: COORDINATED', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Stared at it. | It *looked away first.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, -1], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const fade = 1 - 0.75 * ease.inCubic(prog(lt, 1.0, 1.6))
      sky(x, t, P, lt, { cy: 930, r: 210, band: 18, alpha: fade })
      L(x, 790, 1120, 'STARING CONTEST: WON', pop01(t, P.t0 + 1.6, 0.3, 2.2), '#c97bff', 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Tried to drive under it. | *Day three.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.5],
    front(x, t, lt, P) {
      sky(x, t, P, lt, { cy: 860, r: 190 })
      drawBits(x, CAR, { R: '#b46cff', W: SKYB, K: INK }, 790, 960 + Math.abs(Math.sin(t * 10)) * -4, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 1130, 'ROAD TRIP: DAY 3', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Asked who’s | *maintaining it.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sky(x, t, P, lt, { cy: 820, r: 160 })
      sheet(x, 790, 990, pop01(t, P.t0 + 0.7, 0.3, 2), { w: 300, h: 220, head: 'BUDGET', headBg: STEEL, headInk: INK, lines: ['upkeep: ?', 'owner: ?', 'permits: ?'], size: 30, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Explained light refraction. | *Nobody asked.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-80, 70); x.lineTo(80, 70); x.lineTo(0, -80); x.closePath(); x.fill()
        x.fillStyle = '#d9f4ff'; x.beginPath(); x.moveTo(-66, 62); x.lineTo(66, 62); x.lineTo(0, -64); x.closePath(); x.fill()
        x.fillStyle = BONE; x.fillRect(-200, -6, 160, 12)
        RAINBOW.forEach((c, i) => { x.save(); x.rotate(-0.25 + i * 0.1); x.fillStyle = c; x.fillRect(30, -5, 150, 10); x.restore() })
        x.restore()
      }
      bubble(x, 800, 650, 'so basically, | light BENDS—', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      L(x, 800, 1100, 'SLIDE 1 OF 40', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Saw a rainbow. | *Sobbed. Happily.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sky(x, t, P, lt, { cy: 880, r: 200, band: 20 })
      bubble(x, 790, 1060, 'it’s so | NICE to us', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      hearts(x, t, 790, 860, P.t0 + 1.2, { n: 5, life: 1.6, spread: 220, cell: 6, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0582', key: 'E', accent: ACC, ending: 'group',
  title: 'Zodiacs when they see | a rainbow *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'One rainbow. | *Total chaos.*',
    moods: ['wide', 'sparkle', 'wide', 'heart', 'wink', 'squint', 'sparkle', 'wink', 'sparkle', 'neutral', 'sparkle', 'wide'],
    draw(x, t, lt) {
      rainbow(x, 540, 1060, 470, pop01(t, t - lt + 0.3, 0.4, 1.6), { band: 26, p: prog(lt, 0.3, 1.2) })
      label(x, 540, 520, '✦ EVERYONE OUTSIDE ✦', pop01(t, t - lt + 1.6, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
