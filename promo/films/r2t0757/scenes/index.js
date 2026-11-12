// r2t0757: star_talk, ROLLCALL, "The signs | *decorating cookies.*" (signs3kit social cut, lofi · E).
// Twelve signs in zodiac order, each one's most extreme cookie-decorating self. Ending: group (the punchline).
//   ♈ couldn't wait for it to cool: icing soup · ♉ ate the dough · ♊ two cookies, two personalities
//   · ♋ iced the whole family, even the cousins · ♌ one cookie, a self-portrait · ♍ measured the sprinkles
//   · ♎ pink or lilac, still deciding · ♏ all-black icing, a secret heart inside · ♐ sprinkles from across the room
//   · ♑ decorated twelve, priced them · ♒ iced their cookie as a birth chart · ♓ cookie cracked, wrote it a poem
//   group "Cookies made: 12. | *Cookies left: 0.*"  (one crumb-covered plate)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, chart, cookie, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb0c8', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Couldn’t wait for it to cool. | *Icing soup.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      const melt = clamp((lt - 0.6) / 1.0)
      cookie(x, 800, 880, 130, pop01(t, P.t0 + 0.2, 0.3, 2), { icing: '#ff6b5a' })
      if (melt > 0) { x.save(); x.fillStyle = '#ff6b5a'; for (let i = 0; i < 5; i++) { const dx = 700 + i * 50, h = melt * (60 + (i * 37) % 70); x.fillStyle = INK; x.fillRect(dx - 4, 960, 30, h + 4); x.fillStyle = '#ff6b5a'; x.fillRect(dx, 960, 22, h) } x.restore() }
      L(x, 800, 660, 'OVEN: 2 SECONDS AGO', pop01(t, P.t0 + 0.4, 0.3, 2.2), RED, -0.04, 28)
    } },
  { sign: 'taurus', cap: 'Decorating? | Taurus *ate the dough.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWLW', 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'DOUGH: GONE', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 36)
      L(x, 800, 1090, 'COOKIES: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Two cookies. | *Two personalities.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      cookie(x, 700, 860, 95, pop01(t, P.t0 + 0.2, 0.3, 2), { icing: GOLD, face: 'smile', rot: -0.1 })
      cookie(x, 900, 900, 95, pop01(t, P.t0 + 0.5, 0.3, 2), { icing: LAV, face: 'frown', rot: 0.1 })
      L(x, 800, 1100, 'BOTH ARE ME', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'cancer', cap: 'Iced the whole family. | *Even the cousins.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const N = ['MOM', 'DAD', 'NAN', 'COUSIN', 'COUSIN', 'COUSIN']
      N.forEach((n, i) => cookie(x, 680 + (i % 3) * 120, 790 + Math.floor(i / 3) * 140, 56, pop01(t, P.t0 + 0.2 + i * 0.22, 0.3, 2.2), { icing: i < 3 ? PINK : SKYB, text: n, textCol: INK }))
      L(x, 800, 1110, 'THE DOG IS NEXT', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'leo', cap: 'One cookie. | A *self-portrait.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      cookie(x, 800, 880, 150, k, { icing: GOLD })
      if (k > 0.6) friend(x, t, 'leo', 800, 880, 170, k, { mood: 'wink', glow: 0.4 })
      L(x, 800, 650, 'EDIBLE GOLD', pop01(t, P.t0 + 0.9, 0.3, 2.2), '#ffb34a', -0.04, 32)
      L(x, 800, 1100, 'NOT FOR EATING', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, 0.04, 30)
      sparkles(x, t, 800, 880, P.t0 + 1.0, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Measured the sprinkles. | *With a ruler.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      cookie(x, 800, 860, 120, pop01(t, P.t0 + 0.2, 0.3, 2), { icing: MINT, sprinkles: Math.floor(clamp((lt - 0.4) / 1.0) * 24) })
      bits(x, 'RULER', 800, 1020, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.05 })
      L(x, 800, 660, 'SPACING: 2.0 mm', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Pink or lilac? | *Still deciding.*', mood: 'neutral', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const a = Math.sin(lt * 5) > 0
      drawBits(x, ['....K....', '...KKK...', '..PPPPP..', '.PPPPPPP.', 'PPPWPPPPP', 'PPPPPPPPP', 'PPPPPPPPP', 'KKKKKKKKK'], { K: INK, P: PINK, W: '#fff' }, 690, 840 - (a ? 40 : 0), 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.PI })
      drawBits(x, ['....K....', '...KKK...', '..PPPPP..', '.PPPPPPP.', 'PPPWPPPPP', 'PPPPPPPPP', 'PPPPPPPPP', 'KKKKKKKKK'], { K: INK, P: LAV, W: '#fff' }, 880, 840 - (a ? 0 : 40), 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.PI })
      cookie(x, 800, 1050, 70, pop01(t, P.t0 + 0.4, 0.3, 2), { icing: '' })
      L(x, 800, 650, `DECIDING: ${1 + Math.floor(clamp(lt / 2) * 3)} HRS`, pop01(t, P.t0 + 1.0, 0.3, 2.2), STEEL, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'All-black icing. | *Secret heart inside.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const bit = lt > 1.1
      cookie(x, 800, 870, 130, pop01(t, P.t0 + 0.2, 0.3, 2), { icing: '#4a2a5a', base: '#2a1a3a', bite: bit })
      if (bit) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 860, 800, 10 * pop01(t, P.t0 + 1.15, 0.3, 2.4))
      L(x, 800, 1090, 'FOUND IT? WE’RE CLOSE.', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#c97bff', 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Sprinkles? | From *across the room.*', mood: lt => lt > 0.8 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      cookie(x, 840, 1010, 80, pop01(t, P.t0 + 0.2, 0.3, 2), { icing: SKYB, sprinkles: 2 })
      const SC = [GOLD, MINT, PINK, '#ffffff', LAV]
      for (let i = 0; i < 40; i++) { const ph = clamp((lt - 0.5 - i * 0.015) / 0.7); if (ph <= 0) continue; const ang = -0.9 + (i * 0.618 % 1) * 1.6, d = ph * (260 + (i * 53) % 200); x.fillStyle = SC[i % 5]; x.fillRect(420 + Math.cos(ang) * d, 880 + Math.sin(ang) * d * 0.9 + ph * ph * 120, 14, 8) }
      L(x, 800, 650, 'ACCURACY: 3%', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Decorated twelve. | *Priced them.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) cookie(x, 680 + i * 120, 880, 52, pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { icing: i % 2 ? CREAM : '#7dd18a' })
      for (let i = 0; i < 3; i++) L(x, 680 + i * 120, 980, '$4', pop01(t, P.t0 + 0.9 + i * 0.15, 0.25, 2.2), GOLD, 0.06, 30)
      L(x, 800, 650, 'COOKIE CO. EST. TODAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Iced their cookie | as a *birth chart.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      cookie(x, 800, 870, 150, k, { icing: '' })
      chart(x, 800, 870, 118, k * clamp((lt - 0.3) / 0.6 + 0.01), t * 0.4)
      L(x, 800, 1100, 'RISING: SPRINKLES', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cookie cracked. | Pisces *wrote it a poem.*', mood: 'wide', look: [1, 0], tears: lt => lt > 0.7 ? 3 : 2, star: ST,
    front(x, t, lt, P) {
      cookie(x, 820, 1000, 80, pop01(t, P.t0 + 0.2, 0.3, 2), { icing: '#c9b8ff', crack: lt > 0.5 })
      sheet(x, 820, 740, pop01(t, P.t0 + 0.8, 0.3, 2), { w: 270, h: 200, rot: 0.05, lines: ['o sweet one,', 'gone too soon', 'like crumbs…'], size: 28, align: 'left', progress: prog(lt, 0.9, 1.8) })
    } },
]

const F = makeFilm({
  id: 'r2t0757', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs | *decorating cookies.*',
  cameos: CAMEOS,
  group: {
    cap: 'Cookies made: 12. | *Cookies left: 0.*',
    moods: ['happy', 'heart', 'wink', 'happy', 'sparkle', 'squint', 'neutral', 'wink', 'wide', 'happy', 'sparkle', 'wide'],
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.6, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(540, 760); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 196, 66, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 0, 186, 58, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#d99a52'; for (let i = 0; i < 9; i++) x.fillRect(-110 + (i * 47) % 220, -20 + (i * 29) % 40, 12, 10)
      x.restore()
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
