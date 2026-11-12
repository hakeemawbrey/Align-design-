// r2t0640: star_talk, BELIKE (twelve signs), "Wet socks? | Zodiacs *be like.*" (signs3kit social cut, music: lofi · F).
// Each sign's most extreme reaction to wet socks. Ending: lesson.
//   ♈ stepped in a puddle, fought the puddle · ♉ day: cancelled · ♊ texted every match about it · ♋ called mom, twice
//   · ♌ made wet socks a trend · ♍ packed backup socks, and backup backups · ♎ one wet sock, balance ruined · ♏ the puddle
//   is on the list, forever · ♐ ditched the socks, barefoot now · ♑ kept working, meeting 4 of 9 · ♒ noticed three days
//   later · ♓ cried, socks got wetter
//   lesson "Small stuff happens. | *Dry socks* come back."  SOCKS: DRYING
//   last "Aquarius | *still hasn’t noticed.*" (card 11, paid off)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, rain, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }
const SOCK = ['.WWWW..', '.SSSS..', '.SDSS..', '.SSSS..', '.SSDS..', '.SSSSSS', 'SSSSSSS', '.SSSSS.']
const sock = (x, cx, cy, cell, col = SKYB, o) => drawBits(x, SOCK, { W: CREAM, S: col, D: '#3f8fe0' }, cx, cy, cell, o)
// a drip falling from a wet sock
function drips(x, t, cx, cy, n = 3, a = 1) {
  x.save(); x.fillStyle = SKYB
  for (let i = 0; i < n; i++) { const ph = ((t * 1.4 + i / n) % 1 + 1) % 1; x.globalAlpha = a * (1 - ph); x.fillRect(cx - 20 + i * 20, cy + ph * 90, 10, 16) }
  x.restore()
}
// a puddle ellipse on the stage floor
function puddle(x, cx, cy, w, k) { if (k <= 0.01) return; x.save(); x.globalAlpha = 0.85; x.fillStyle = '#3f8fe0'; x.beginPath(); x.ellipse(cx, cy, w * k, w * 0.22 * k, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#bfe6ff'; x.fillRect(cx - w * 0.4 * k, cy - 6, w * 0.3 * k, 8); x.restore() }

const CAMEOS = [
  { sign: 'aries', cap: 'Stepped in a puddle. | *Fought the puddle.*', mood: lt => lt > 0.9 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      puddle(x, 800, 1080, 180, pop01(t, P.t0 + 0.2, 0.3, 2) * (lt > 1.9 ? 0.5 : 1))
      L(x, 800, 700, 'ROUND 1', pop01(t, P.t0 + 0.8, 0.3, 2), RED, -0.05, 40)
      L(x, 800, 860, 'ARIES 1 · PUDDLE 0', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Wet socks? | Day: *cancelled.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', star: ST,
    front(x, t, lt, P) {
      sock(x, 800, 820, 30 * pop01(t, P.t0 + 0.2, 0.3, 2)); drips(x, t, 800, 950)
      L(x, 800, 1080, 'GOING BACK TO BED', pop01(t, P.t0 + 1.3, 0.3, 2.2), STEEL, 0.04, 32)
      L(x, 800, 620, 'PLANS: 0', pop01(t, P.t0 + 0.9, 0.3, 2), RED, -0.05, 36)
    } },
  { sign: 'gemini', cap: 'Texted every match | *about it.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 840, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCHES (6)', headCol: GOLD, size: 30,
        lines: [['my SOCKS', SKYB, pop01(t, P.t0 + 0.4, 0.25, 2), true], ['are WET', SKYB, pop01(t, P.t0 + 0.7, 0.25, 2), true], ['a thread 1/9', SKYB, pop01(t, P.t0 + 1.2, 0.25, 2), true]] })
    } },
  { sign: 'cancer', cap: 'Called mom. | *Twice.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 840, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt < 1.2 ? 'CALLING MOM…' : 'MOM (2)', headCol: PINK, size: 30,
        lines: [['they’re WET', SKYB, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['oh sweetie', PINK, pop01(t, P.t0 + 1.0, 0.25, 2), false], ['come home', PINK, pop01(t, P.t0 + 1.5, 0.25, 2), false]] })
    } },
  { sign: 'leo', cap: 'Made wet socks | *a trend.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      sock(x, 760, 850, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, { rot: -0.15 }); drips(x, t, 760, 960, 3, 0.8)
      L(x, 800, 640, 'NEW LOOK', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, -0.05, 40)
      L(x, 800, 1080, 'EVERYONE: COPYING', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 32)
      sparkles(x, t, 760, 840, P.t0 + 0.7, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Packed backup socks. | *And backup backups.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.14))
      for (let i = 0; i < n; i++) sock(x, 680 + (i % 3) * 120, 700 + Math.floor(i / 3) * 150, 10 * pop01(t, P.t0 + 0.2 + i * 0.14, 0.2, 2), [MINT, LAV, PINK][i % 3])
      L(x, 800, 1140, 'LABELLED BY DAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), '#2fc79a', 0.04, 32)
    } },
  { sign: 'libra', cap: 'One wet sock? | *Balance ruined.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tip = clamp((lt - 0.7) / 0.5) * 0.35
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.translate(800, 820); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-10, -20, 20, 260); x.fillRect(-80, 230, 160, 20)
      x.rotate(tip); x.fillRect(-190, -30, 380, 18)
      sock(x, -170, 50, 15, SKYB); sock(x, 170, 50, 15, CREAM)
      x.restore()
      if (lt > 1.2) drips(x, t, 640, 900, 3)
      L(x, 800, 610, 'BALANCE: 0', pop01(t, P.t0 + 1.3, 0.3, 2.2), RED, -0.05, 36)
    } },
  { sign: 'scorpio', cap: 'The puddle is on | *the list. Forever.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      puddle(x, 800, 1090, 170, pop01(t, P.t0 + 0.2, 0.3, 2))
      sheet(x, 800, 790, pop01(t, P.t0 + 0.5, 0.3, 2), { w: 340, h: 300, head: 'THE LIST', headBg: '#c97bff', headInk: INK, lines: ['1. Mondays', '2. loud chewing', ['3. THAT PUDDLE', RED]], size: 32, align: 'left', progress: clamp((lt - 0.6) / 0.9) })
    } },
  { sign: 'sagittarius', cap: 'Ditched the socks. | *Barefoot now.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      const p = clamp((lt - 0.4) / 1.0)
      sock(x, lerp(700, 940, p), 820 - 160 * Math.sin(p * Math.PI), 24 * pop01(t, P.t0 + 0.2, 0.3, 2), '#c97bff', { rot: p * 6 })
      L(x, 800, 1080, 'SHOES: ALSO GONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Wet socks? | Kept *working.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 840, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      puddle(x, 800, 1090, 150, pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 650, `MEETING ${Math.min(9, 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 8))} OF 9`, pop01(t, P.t0 + 0.6, 0.3, 2), STEEL, -0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Noticed | *three days later.*', mood: lt => lt > 1.6 ? 'wide' : 'sparkle', look: lt => lt > 1.6 ? [0, 1] : [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 2.1, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sock(x, 360, 1110, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), SKYB); drips(x, t, 360, 1150, 2, 0.7)
      L(x, 800, 700, lt < 1.6 ? 'THINKING: SPACE' : 'DAY 3: …wait.', pop01(t, P.t0 + 0.3, 0.3, 2), lt < 1.6 ? '#6fc3ff' : RED, -0.04, 36)
      bubble(x, 800, 900, 'are my socks | wet?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried about it. | Socks got *wetter.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sock(x, 800, 830, 30 * pop01(t, P.t0 + 0.3, 0.3, 2), LAV); drips(x, t, 800, 960, 4)
      L(x, 800, 1090, 'SOCKS: SOAKED', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0640', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Wet socks? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One puddle. | *Twelve* meltdowns.' },
  lesson: { text: 'Small stuff happens. | *Dry socks* come back.', chip: 'SOCKS: DRYING' },
  last: { text: 'Aquarius | *still hasn’t noticed.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
