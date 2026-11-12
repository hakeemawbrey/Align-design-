// r2t0615: star_talk, BELIKE, "Passenger-seat | Zodiacs *be like.*" (~57 s vertical, signs3kit social cut, music: lofi · F).
// Ending: callback.
//   0.0–3.6    the hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one passenger-seat move per sign (3.8 s each):
//              ♈ pressed the fake brake forty times · ♉ packed snacks for a five-minute drive · ♊ skipped the song every
//              nine seconds · ♋ "want me to drive?" every mile · ♌ mirror down the whole ride · ♍ corrected the map, was right
//              · ♎ "where should we eat?" for forty minutes · ♏ silent an hour, then "left." · ♐ "let's just go there": a
//              400-mile detour · ♑ checked the ETA every ninety seconds · ♒ read everyone's horoscope out loud · ♓ a sunset,
//              Pisces sobbing
//  49.2        "Twelve passengers. | *Zero chill.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Libra, two hours later: | *“pizza?”*"  Libra with the menu bubbles.
import { makeFilm, sparkles, hearts, bubble, label, notes, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff9a7a'
const R = { x: -170 }
const PEDAL = ['KKKKKKKK', 'KSSSSSSK', 'KSKSKSSK', 'KSSSSSSK', 'KSKSKSSK', 'KSSSSSSK', 'KKKKKKKK', '...KK...', '...KK...']
const MIRROR = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSWSSSSSSSSK', 'KSSWSSSSSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', '.....KK.....']
const SUN = ['....YYYY....', '..YYYYYYYY..', '.YYYYYYYYYY.', 'OOOOOOOOOOOO', '............', 'PPPPPPPPPPPP', '............', '..PPPPPPPP..']
const SIGNPOST = ['GGGGGGGGGGGG', 'GWWWWWWWWWWG', 'GWWWWWWWWWWG', 'GGGGGGGGGGGG', '.....KK.....', '.....KK.....', '.....KK.....', '.....KK.....']

const CAMEOS = [
  { sign: 'aries', cap: 'Pressed the fake brake. | *Forty times.*', mood: 'wide', look: [1, 1], star: R, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const press = Math.floor(lt * 6) % 2
      drawBits(x, PEDAL, { K: INK, S: STEEL }, 800, 960 + press * 16, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, `FAKE BRAKE: ${Math.min(40, 1 + Math.floor(lt * 17))}`, pop01(t, P.t0 + 0.4, 0.3, 2), '#ff6b5a', -0.04, 40)
    } },
  { sign: 'taurus', cap: 'Packed snacks | *for a five-minute drive.*', mood: 'heart', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bits(x, 'BAG', 760, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'APPLE', 900, 820, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bits(x, 'COOKIE', 900, 980, 12 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1120, 'SNACKS: 9', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'gemini', cap: 'Skipped the song | *every nine seconds.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: R,
    front(x, t, lt, P) {
      notes(x, t, 800, 1000, { n: 4, cell: 8, col: GOLD })
      L(x, 800, 780, `SKIP #${1 + Math.floor(lt * 9)}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.04, 46)
      bubble(x, 800, 1080, 'wait, | not this one', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: '“Want me to drive?” | *Every single mile.*', mood: 'wide', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'u tired? | i can drive', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      L(x, 790, 960, `ASKED: ${1 + Math.floor(lt * 6)}×`, pop01(t, P.t0 + 0.7, 0.3, 2), PINK, 0.04, 32)
      hearts(x, t, 800, 1150, P.t0 + 1.3, { n: 3, life: 1.4, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'Mirror down. | *The entire ride.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, -1], star: R,
    front(x, t, lt, P) {
      drawBits(x, MIRROR, { K: INK, S: '#cfe3ff', W: '#ffffff' }, 800, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 800, 760, P.t0 + 0.8, 7, 170, 0.2)
      L(x, 800, 1030, 'ROAD: NOT WATCHED', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'virgo', cap: 'Corrected the map. | *Was right.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MAP', headCol: MINT, lines: [['turn left', BONE, 1, false], [lt > 1.0 ? 'recalculating…' : 'in 200 ft', lt > 1.0 ? GOLD : BONE, 1, false]] })
      bubble(x, 760, 640, 'it’s right, | actually.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'libra', cap: '“Where should we eat?” | *For forty minutes.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: R,
    front(x, t, lt, P) {
      const opts = ['pizza?', 'tacos?', 'noodles?', 'pizza??']
      opts.forEach((o, i) => bubble(x, 720 + (i % 2) * 150, 680 + i * 110, o, pop01(t, P.t0 + 0.2 + i * 0.3, 0.25, 2), { size: 36, col: i % 2 ? PINK : BONE, tail: i % 2 ? 'br' : 'bl' }))
      L(x, 800, 1140, `MINUTES: ${Math.min(40, 1 + Math.floor(lt * 17))}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Silent for an hour. | *Then: “left.”*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 720, 'WORDS SPOKEN: 0', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 34)
      bubble(x, 800, 920, 'left.', pop01(t, P.t0 + 1.2, 0.25, 2.6), { size: 84, col: '#c97bff', tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Saw a road sign. | *“Let’s just go there.”*', mood: 'sparkle', look: [-1, -1], star: { x: 170 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      drawBits(x, SIGNPOST, { G: '#2fae5a', W: '#2fae5a', K: STEEL }, 320, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.globalAlpha = pop01(t, P.t0 + 0.3, 0.3, 2) > 0.9 ? 1 : 0; x.fillText('THE COAST 400', 320, 770); x.restore()
      L(x, 320, 1080, 'DETOUR: 400 MILES', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Checked the ETA | *every ninety seconds.*', mood: 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      const m = 12 + Math.floor(lt * 2)
      L(x, 800, 820, `ETA 4:${m}`, pop01(t, P.t0 + 0.2, 0.3, 2), MINT, -0.04, 56)
      bubble(x, 800, 1040, 'we’re losing | time.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Read everyone’s horoscope. | *Out loud.*', mood: 'sparkle', look: [1, 0], star: R, hops: [1.2],
    front(x, t, lt, P) {
      chart(x, 800, 800, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      const who = ['ARIES', 'TAURUS', 'GEMINI', 'YOURS']
      L(x, 800, 1060, `NEXT UP: ${who[Math.min(3, Math.floor(lt / 0.55))]}`, pop01(t, P.t0 + 0.5, 0.3, 2), SKYB, 0.04, 36)
    } },
  { sign: 'pisces', cap: 'A sunset came on. | *Pisces is sobbing.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: '#ffb34a', O: '#ff6b5a', P: '#c0558a' }, 800, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 1030, 'it’s just | so orange', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: '#b7a6ff', tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0615', key: 'F', accent: ACC, ending: 'callback',
  title: 'Passenger-seat | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve passengers. | *Zero chill.*' },
  last: {
    text: 'Libra, two hours later: | *“pizza?”*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'libra', 400, 1160, 260 * k, { mood: lt > 1.8 ? 'squint' : 'happy', look: [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], seed: 16, hops: [t0 + 1.6], glyph: false })
      bubble(x, 720, 1000, 'tacos?', pop01(t, t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 760, 1180, 'no… noodles?', pop01(t, t0 + 1.4, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      bubble(x, 720, 1360, 'pizza??', pop01(t, t0 + 2.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
