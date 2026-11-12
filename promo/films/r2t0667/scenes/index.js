// r2t0667: star_talk, ROLLCALL (twelve signs), "The signs | *as chefs.*" (signs3kit social cut, music: lofi · E).
// Aries: max heat, done in forty seconds · Taurus taste-tested the whole dish · Gemini cooking four recipes at once ·
// Cancer cried into grandma's soup · Leo plated it, then signed it · Virgo salts grain by grain · Libra checked if the
// pasta and sauce are a match · Scorpio's secret ingredient: classified · Sagittarius: no recipe, just paprika · Capricorn
// meal-prepped until 2031 · Aquarius planned dinner by birth chart · Pisces cutting onions (was crying anyway).
// Ending: group. "Twelve chefs. | *Zero recipes.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, confetti, RED, CREAM, STEEL, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -190 }
const HAT = ['..WWW.WWW..', '.WWWWWWWWW.', 'WWWWWWWWWWW', 'WWWWWWWWWWW', '.WWWWWWWWW.', '..WWWWWWW..', '..SSSSSSS..', '..WWWWWWW..']
const HAT_C = { W: '#ffffff', S: STEEL }
const PAN = ['..KKKKKKK.......', '.KSSSSSSSK......', 'KSSSSSSSSSKHHHHH', '.KSSSSSSSK......', '..KKKKKKK.......']
const PAN_C = { K: '#5a5f7a', S: '#3a3f5a', H: '#8a4a2e' }
const POT = ['..KKKKKKKK..', 'KKKKKKKKKKKK', '.SSSSSSSSSS.', '.SSSSSSSSSS.', '.SSSSSSSSSS.', '..SSSSSSSS..']
const POT_C = { K: '#5a5f7a', S: STEEL }
const JAR = ['.KKKK.', 'KKKKKK', 'GGGGGG', 'GGGGGG', 'GGGGGG', 'GGGGGG', '.GGGG.']
const JAR_C = { K: GOLD, G: '#b48ae0' }
const ONION = ['...G...', '..GG...', '.PPPP..', 'PPpPPP.', 'PPPpPP.', 'PPPPPP.', '.PPPP..']
const ONION_C = { G: '#5fd068', P: '#d6a3ff', p: '#ffffff' }
const SHAKER = ['.KKK.', 'KRRRK', 'RRRRR', 'RRRRR', 'RRRRR', 'RRRRR', '.RRR.']
const SHAKER_C = { K: STEEL, R: RED }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#c9d6ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = NIGHT; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.rotate(-t * 0.25); drawBits(x, POT, POT_C, 0, 0, r * 0.06)
  x.restore()
}
const hat = (x, F, k = 1) => drawBits(x, HAT, HAT_C, F.x, F.top - 40, 11 * k)

const CAMEOS = [
  { sign: 'aries', cap: 'Max heat. | Done in *forty seconds.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      hat(x, F)
      drawBits(x, PAN, PAN_C, 780, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 * Math.sin(t * 20) })
      steam(x, t, 740, 860, { n: 4, alpha: 0.8, h: 160 })
      L(x, 790, 700, 'HEAT: MAX', pop01(t, P.t0 + 0.5, 0.3, 2.2), RED, -0.04, 40)
      L(x, 790, 1080, `0:${String(Math.max(0, 40 - Math.floor(clamp((lt - 0.4) / 1.4) * 40))).padStart(2, '0')}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.04, 44)
    } },
  { sign: 'taurus', cap: 'Taste-tested the dish. | *All of it.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      hat(x, F)
      bits(x, lt > 1.1 ? 'BOWL' : 'DISH', 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1070, lt > 1.1 ? 'LEFT: 0' : 'SERVES 6', 1 * pop01(t, P.t0 + 0.5, 0.3, 2.2), lt > 1.1 ? RED : MINT, -0.04, 36)
      bubble(x, 790, 700, 'mm. needs… more.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Cooking four recipes | *at once.*', mood: 'wide', look: lt => [Math.sin(lt * 7) > 0 ? 1 : -1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P, F) {
      hat(x, F)
      const W = ['PASTA?', 'TACOS?', 'SOUP?', 'CAKE?'], C = [GOLD, PINK, MINT, SKYB]
      W.forEach((w, i) => L(x, 700 + (i % 2) * 180, 720 + Math.floor(i / 2) * 140 + (i % 2) * 30, w, pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2.4), C[i], (i % 2 ? 0.06 : -0.06), 36))
      L(x, 790, 1080, 'ALL OF THEM', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.03, 36)
    } },
  { sign: 'cancer', cap: 'Grandma’s recipe. | Cried into *the soup.*', mood: 'heart', tears: lt => lt > 0.9 ? 2 : 0, look: [1, 1], star: ST,
    front(x, t, lt, P, F) {
      hat(x, F)
      drawBits(x, POT, POT_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 860, { n: 3, alpha: 0.7, h: 120 })
      sheet(x, 790, 700, pop01(t, P.t0 + 0.6, 0.3, 2), { w: 300, h: 150, rot: -0.05, head: 'GRANDMA’S', headBg: PINK, headInk: INK, lines: ['+ love'], size: 34 })
      L(x, 790, 1100, 'SALT: TEARS', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, 0.04, 36)
    } },
  { sign: 'leo', cap: 'Plated it. | Then *signed it.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      hat(x, F)
      bits(x, 'PLATE', 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.9) { x.save(); x.fillStyle = GOLD; x.font = `italic 700 56px 'EB Garamond', Georgia, serif`; x.textAlign = 'center'; x.globalAlpha = clamp((lt - 0.9) * 3); x.fillText('Leo ✦', 790, 1060); x.restore() }
      sparkles(x, t, 790, 900, P.t0 + 1.2 * 3.1 / 2.4, 7, 200, 0.3)
      L(x, 790, 700, 'MASTERPIECE', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 38)
    } },
  { sign: 'virgo', cap: 'Salted it | *grain by grain.*', mood: 'squint', look: [1, 1], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      hat(x, F)
      bits(x, 'TWEEZ', 790, 800, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      for (let i = 0; i < 6; i++) { x.fillStyle = '#ffffff'; x.fillRect(730 + i * 24, 970 + (i % 2) * 12, 14, 14) }
      L(x, 790, 1080, `GRAIN #${1 + Math.floor(clamp((lt - 0.3) / 1.6) * 4016)}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), MINT, 0.04, 40)
    } },
  { sign: 'libra', cap: 'Checked if pasta and sauce | are *a match.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      hat(x, F)
      bits(x, 'BOWL', 700, 860, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MUG', 880, 860, 13 * pop01(t, P.t0 + 0.35, 0.3, 2))
      L(x, 700, 960, 'PASTA', pop01(t, P.t0 + 0.4, 0.3, 2.2), CREAM, -0.05, 30)
      L(x, 880, 960, 'SAUCE', pop01(t, P.t0 + 0.5, 0.3, 2.2), RED, 0.05, 30)
      if (lt > 1.2) hearts(x, t, 790, 860, P.t0 + 1.2 * 3.1 / 2.4, { n: 5, life: 1.5, spread: 140, cell: 7, seed: 3 })
      L(x, 790, 1090, 'IT’S A MATCH ✦', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.03, 38)
    } },
  { sign: 'scorpio', cap: 'Secret ingredient? | *Classified.* Forever.', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      hat(x, F)
      drawBits(x, JAR, JAR_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 900, 'TOP SECRET', pop01(t, P.t0 + 0.7, 0.3, 2.4), RED, -0.08, 34)
      bubble(x, 790, 650, 'what’s in it?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'br', col: LAV })
      bubble(x, 790, 1100, 'love. and no.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'No recipe. | Just *vibes and paprika.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P, F) {
      hat(x, F)
      const shake = Math.sin(t * 22) * 0.3
      drawBits(x, SHAKER, SHAKER_C, 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 2.6 + shake })
      for (let i = 0; i < 10; i++) { const ph = ((t * 1.4 + i / 10) % 1); x.fillStyle = i % 2 ? RED : '#ff9a4a'; x.globalAlpha = 1 - ph; x.fillRect(760 + Math.sin(i * 3.1) * 50, 900 + ph * 160, 10, 10) } x.globalAlpha = 1
      L(x, 790, 1100, 'RECIPE: ?', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 40)
    } },
  { sign: 'capricorn', cap: 'Meal-prepped | *until 2031.*', mood: 'happy', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      hat(x, F)
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 8)
      for (let i = 0; i < n; i++) bits(x, 'BOX', 720 + (i % 2) * 150, 1020 - Math.floor(i / 2) * 90, 12)
      L(x, 790, 650, 'MONDAYS: SORTED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Planned the menu | by *birth chart.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      hat(x, F)
      chart(x, 790, 830, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1070, 'TONIGHT: MOON SOUP', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cutting onions. | Was crying *anyway.*', mood: 'heart', tears: 3, look: [1, 1], star: ST,
    front(x, t, lt, P, F) {
      hat(x, F)
      drawBits(x, ONION, ONION_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1090, 'ONION: INNOCENT', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 36)
      bubble(x, 790, 690, 'the soup has | a story…', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
    } },
]

const F = makeFilm({
  id: 'r2t0667', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs | *as chefs.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve chefs. | *Zero recipes.*',
    draw(x, t, lt) {
      drawBits(x, POT, POT_C, 540, 690, 26 * pop01(t, t - lt + 1.2, 0.35, 2))
      steam(x, t, 540, 610, { n: 5, alpha: 0.8, h: 150 })
      confetti(x, t, 540, 900, t - lt + 1.0, { n: 26, spread: 420 })
    } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
