// r2t0552: star_talk ROLLCALL, "The signs as | grandparents." (signs3kit social cut, music: lofi · E). Ending: group.
//   ♈ still races the grandkids · ♉ fourth dinner, insists · ♊ runs nine group chats · ♋ your drawing from age four,
//   still framed · ♌ brags about you to the whole street · ♍ leftovers labelled by date · ♎ brokered a peace treaty
//   between cousins · ♏ knows what you did, says nothing · ♐ retired, postcard #48 · ♑ birthday gift: a savings plan
//   · ♒ learned to code at 81 · ♓ you visited, happy tears.
//   group: "Spoiling you | since forever."
import { makeFilm, sparkles, hearts, bubble, drawBits, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Age 78. | Still *races the grandkids.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 880 - clamp((lt - 0.3) / 2) * 60, 980, 110, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'wide', look: [-1, 0], seed: 44 })
      L(x, 800, 680, 'GRANDPA: 1ST', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.05, 36)
      bubble(x, 760, 1120, 'too slow, kid!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'You ate already? | *Fourth dinner.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'PLATE', 800, 960 - i * 46, 12 * pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2))
      steam(x, t, 800, 760, { n: 3 })
      L(x, 800, 1110, 'NO ONE LEAVES HUNGRY', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'gemini', cap: 'Runs nine group chats. | *Admin* of all.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CHATS (9)', headCol: GOLD, lines: [['BINGO CLUB', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['GARDEN GANG', MINT, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['COUSINS 2', PINK, pop01(t, P.t0 + 1.1, 0.25, 2.2)], ['COUSINS 3', SKYB, pop01(t, P.t0 + 1.4, 0.25, 2.2)]] })
      L(x, 800, 1110, 'TYPING: ALWAYS', pop01(t, P.t0 + 1.8, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Your drawing from age 4? | *Still framed.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 830); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -130, 320, 260); x.fillStyle = GOLD; x.fillRect(-152, -122, 304, 244); x.fillStyle = CREAM; x.fillRect(-126, -96, 252, 192)
        x.fillStyle = SKYB; x.fillRect(-126, -96, 252, 50); x.fillStyle = '#4fbf6a'; x.fillRect(-126, 60, 252, 36)
        x.fillStyle = RED; x.fillRect(-70, -10, 70, 70); x.fillStyle = GOLD; x.fillRect(60, -70, 40, 40)
        x.fillStyle = INK; x.fillRect(30, 10, 8, 50); x.fillRect(20, 0, 28, 8)
        x.restore()
      }
      L(x, 800, 1080, 'MASTERPIECE', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 34)
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 150, cell: 6, seed: 5 })
    } },
  { sign: 'leo', cap: 'Brags about you | to *the whole street.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 760, 820, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.15 })
      bubble(x, 830, 660, 'MY GRANDKID!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bl' })
      L(x, 800, 1070, 'NEIGHBORS: INFORMED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'virgo', cap: 'Labels the leftovers. | *By the hour.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2), cy = 980 - i * 120
        if (k <= 0.01) continue
        x.save(); x.translate(800, cy); x.scale(k, k); x.fillStyle = INK; x.fillRect(-120, -48, 240, 96); x.fillStyle = ['#cfe9ff', '#e8fff0', '#fff4c0'][i]; x.fillRect(-112, -40, 224, 80); x.restore()
        L(x, 800, cy, ['TUE 6:15 PM', 'TUE 6:20 PM', 'TUE 6:25 PM'][i], k, CREAM, 0.02 * (i - 1), 24)
      }
      L(x, 800, 1110, 'FRIDGE: ORGANIZED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'libra', cap: 'Cousins fighting? | Drafted a *peace treaty.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'TREATY', headBg: LAV, headInk: INK, lines: ['1. share the swing', '2. both get cake', '3. hug it out'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.1) })
      L(x, 800, 1090, 'SIGNED. SEALED.', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Knows what you did. | *Says nothing.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 840, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 690, 'COOKIE JAR: EMPTY', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, 0.04, 30)
      bubble(x, 800, 1070, 'our secret.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Retired. Gone. | *Postcard #48.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bits(x, 'PLANE', 800 + Math.sin(t * 2) * 20, 700, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      sheet(x, 800, 900, pop01(t, P.t0 + 0.6, 0.35, 2), { w: 320, h: 200, rot: 0.05, bg: '#ffe7a8', lines: ['wish you were here!', 'love, grandma xx'], size: 26 })
      const n = 1 + Math.floor(clamp((lt - 0.8) / 1.0) * 47)
      L(x, 800, 1110, `POSTCARD #${n}`, pop01(t, P.t0 + 0.8, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Birthday gift? | A *savings plan.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 760, 16 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sheet(x, 800, 960, pop01(t, P.t0 + 0.9, 0.35, 2), { w: 300, h: 150, rot: -0.04, head: 'GROWTH PLAN', headBg: STEEL, headInk: INK, lines: ['matures at 30'], size: 28 })
      L(x, 800, 1130, 'VERY THOUGHTFUL', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Learned to code. | *At 81.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 840, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 680, 'BUILDING AN APP', pop01(t, P.t0 + 0.7, 0.3, 2.2), LAV, -0.04, 30)
      L(x, 800, 1070, 'FOR KNITTERS', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
      sparkles(x, t, 800, 840, P.t0 + 1.3, 7, 160, 0.5)
    } },
  { sign: 'pisces', cap: 'You visited. | *Happy tears.* All day.', mood: 'heart', tears: 2, look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 840, 960, 140, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 45 })
      bubble(x, 800, 690, 'you CAME!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      bits(x, 'TISSUE', 680, 1080, 9 * pop01(t, P.t0 + 1.5, 0.3, 2))
      hearts(x, t, 900, 1050, P.t0 + 1.2, { n: 5, life: 1.6, spread: 110, cell: 6, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0552', key: 'E', accent: ACC, ending: 'group',
  title: 'The signs as | *grandparents.*',
  cameos: CAMEOS,
  group: { cap: 'Spoiling you | *since forever.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
