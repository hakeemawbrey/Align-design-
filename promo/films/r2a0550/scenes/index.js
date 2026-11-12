// r2a0550: star_advice, ADVICE ROLLCALL, "How each sign | *shows they listen.*" (signs3kit social cut, music: lofi · G).
// Topic: how each sign shows they're listening. Twelve signs in zodiac order, one warm, specific line each with a light
// gag. Ending: callback (Virgo's notes from card 6 come back as a whole binder).
//   ♈ already planning your comeback · ♉ brings snacks, stays · ♊ remembers your moon sign · ♋ cries with you, then soup
//   · ♌ hypes you up like a crowd · ♍ takes actual notes · ♎ sees both sides, takes yours · ♏ keeps every secret
//   · ♐ makes you laugh mid-cry · ♑ phone face down, all yours · ♒ asks the question nobody asked · ♓ feels every word
//   group "Twelve ways to say | *“I hear you.”*"   last "And Virgo’s notes? | *Now a binder.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, steam, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -160 }
/** a balance scale; tilt > 0 leans right */
function scale(x, cx, cy, k, tilt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -120, 28, 230); x.fillRect(-80, 100, 160, 26)
  x.fillStyle = GOLD; x.fillRect(-8, -116, 16, 220); x.fillRect(-74, 104, 148, 16)
  x.save(); x.translate(0, -110); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-150, -8, 300, 16); x.fillStyle = GOLD; x.fillRect(-146, -4, 292, 8)
  for (const s of [-1, 1]) { x.save(); x.translate(s * 140, 0); x.rotate(-tilt); x.fillStyle = INK; x.fillRect(-56, 60, 112, 22); x.fillStyle = BONE; x.fillRect(-52, 62, 104, 16); x.fillStyle = BONE; x.fillRect(-2, 0, 4, 62); x.restore() }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Already planning | *your comeback.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.1, 1.6],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 280, head: 'COMEBACK', headBg: '#ff6b5a', lines: ['step 1: rest', 'step 2: shine', 'step 3: win'], size: 30, align: 'left', progress: clamp(lt / 1.3) })
      L(x, 800, 1100, 'WE GOT THIS', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'taurus', cap: 'Brings snacks. | *Stays all night.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'NOT LEAVING', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Remembers everything. | *Even your moon.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'your moon’s | in Leo, right?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      L(x, 800, 1050, 'MEMORY: FULL OF YOU', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Cries with you. | *Then makes soup.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], tears: lt => lt < 1.1 ? 2 : 0, star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 920, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
      if (lt > 1.2) steam(x, t, 800, 850, { alpha: clamp((lt - 1.2) * 3) })
      L(x, 800, 1090, 'SOUP: READY', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Hypes you up | *like a whole crowd.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.3, 1.8],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'YOU DID | THAT!!', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 50, col: GOLD, tail: 'bl' })
      confetti(x, t, 800, 900, P.t0 + 0.9, { n: 18, spread: 240 })
      L(x, 800, 1080, 'STANDING OVATION', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Takes notes. | *Actual notes.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 320, head: 'NOTES ON YOU', headBg: MINT, headInk: INK, lines: ['• bad day', '• boss = rude', '• likes pears', '• hug: needed'], size: 28, align: 'left', progress: clamp(lt / 1.5) })
      bits(x, 'PEN', 970, 960, 10 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.6 })
    } },
  { sign: 'libra', cap: 'Sees both sides. | *Still takes yours.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      scale(x, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt < 1.0 ? 0.12 * Math.sin(lt * 8) : -0.22)
      L(x, 800, 1110, 'TEAM YOU', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Keeps every secret. | *Forever.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'KEY', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.0 ? -0.6 : 0 })
      L(x, 800, 1060, 'VAULT: LOCKED', pop01(t, P.t0 + 1.1, 0.3, 2.2), RED, 0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Makes you laugh | *mid-cry.*', mood: 'wink', look: [1, 0], star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'okay but | remember when—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1060, 'MOOD: LIFTED', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Phone face down. | *All yours.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const f = ease.inOutCubic(prog(lt, 0.8, 1.2))
      if (f < 0.5) phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: PINK, lines: [], rot: 0.05, size: 22 })
      else { const k = 1; x.save(); x.translate(800, 960); x.scale(k, 1); x.fillStyle = INK; x.fillRect(-150, -34, 300, 68); x.fillStyle = STEEL; x.fillRect(-140, -24, 280, 48); x.fillStyle = BONE; x.fillRect(-120, -16, 40, 8); x.restore() }
      L(x, 800, 1090, 'NOTIFICATIONS: LATER', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Asks the question | *nobody else asked.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'but how do | YOU feel?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 800, 1060, 'DEEP QUESTION ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Feels it with you. | *Every word.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], tears: 3, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 900, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      hearts(x, t, 800, 800, P.t0 + 0.8, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
      L(x, 800, 1090, 'TISSUES: SHARED', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0550', key: 'G', accent: ACC, ending: 'callback',
  title: 'How each sign | *shows they listen.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways to say | *“I hear you.”*', moods: ['sparkle', 'heart', 'sparkle', 'heart', 'sparkle', 'happy', 'wink', 'happy', 'wink', 'happy', 'sparkle', 'heart'] },
  last: {
    text: 'And Virgo’s notes? | *Now a binder.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 340, 1060, 240 * k, { mood: 'sparkle', look: [1, 0], seed: 12, hops: [t0 + 1.2] })
      for (let i = 0; i < 5; i++) sheet(x, 740 + (i % 2 ? 8 : -8), 1120 - i * 22, pop01(t, t0 + 0.5 + i * 0.12, 0.25, 2), { w: 300, h: 220, rot: (i % 2 ? 0.03 : -0.03), head: i === 4 ? 'VOL. 5' : '', headBg: MINT, headInk: INK, lines: i === 4 ? ['• still', '  listening'] : [], size: 30, align: 'left' })
      L(x, 740, 1290, 'TABS: COLOUR-CODED', pop01(t, t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 28)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
