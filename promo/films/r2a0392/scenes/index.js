// r2a0392: star_advice, ADVICE SOLO (gemini), "Gemini, no need | to be perfect." (signs3kit social cut, music: lofi · F). Ending: lesson.
//   nine cards: forty tabs · draft six of a text · changed your mind · twelve half-done hobbies · talked a lot
//   · two moods · forgot to reply · the right ones get you · enough already
import { makeFilm, hearts, drawBits, pop01, INK } from '../../signs3kit.js'
import { cam, BITS, RED, ORANGE, GREEN, GREY, CREAM, PINK, GOLD, MINT, LAV, SKYB, BONE, BROWN, DARK } from './gags.js'

const S = 'gemini'
/** a stack of browser tabs that keeps growing */
function tabs(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const cols = [SKYB, MINT, LAV, PINK, GOLD]
  for (let i = 0; i < Math.min(n, 8); i++) {
    const y = -150 + i * 34, xo = -150 + i * 10
    x.fillStyle = INK; x.fillRect(xo - 4, y - 4, 268, 62); x.fillStyle = cols[i % 5]; x.fillRect(xo, y, 260, 54)
    x.fillStyle = INK; x.fillRect(xo + 228, y + 14, 16, 16)
  }
  x.fillStyle = INK; x.fillRect(-170, 140, 340, 130); x.fillStyle = BONE; x.fillRect(-164, 146, 328, 118)
  x.fillStyle = INK; x.font = `800 64px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${n} TABS`, 0, 206)
  x.restore()
}

const CAMEOS = [
  cam(S, 'Forty tabs open? | *Close one. Breathe.*', { mood: lt => lt > 1.6 ? 'happy' : 'wide' }, [
    ['fn', (x, t, lt, t0) => tabs(x, 790, 860, pop01(t, t0 + 0.2, 0.3, 2), lt < 1.5 ? Math.min(40, 3 + Math.floor(lt * 30)) : 39)],
  ]),
  cam(S, 'Rewrote the text six times? | *The first was fine.*', { mood: lt => lt > 1.4 ? 'happy' : 'squint' }, [
    ['phone', 770, 880, 0.2, { head: 'DRAFT 6', headCol: GOLD, lines: [['hey!', SKYB, 1], ['hey :)', SKYB, 1], ['heyyy', SKYB, 1], ['hi.', MINT, 1]] }],
    ['label', 620, 620, 'SEND IT.', 1.3, { size: 46, bg: MINT, rot: -0.05 }],
  ]),
  cam(S, 'Changed your mind again? | *That’s growing.*', { mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0] }, [
    ['bubble', 770, 680, lt => ['yes!', 'no.', 'maybe?', 'yes!!'][Math.min(3, Math.floor(lt / 0.5))], 0.3, { size: 70, col: GOLD, tail: 'bl' }],
    ['label', 790, 920, 'UPDATED!', 1.4, { size: 46, bg: MINT, rot: 0.05, mono: true }],
  ]),
  cam(S, 'Twelve half-done hobbies? | *They all count.*', { mood: 'sparkle', hops: [1.3] }, [
    ['bits', 'guitar', 690, 930, 32, 0.2, {}],
    ['bits', 'paint', 870, 990, 18, 0.5, {}],
    ['bits', 'heartBig', 860, 810, 16, 0.8, { cols: { P: LAV } }],
    ['label', 790, 650, 'ALL VALID', 1.2, { size: 46, bg: PINK, rot: -0.05 }],
  ]),
  cam(S, 'Talked a lot today? | *They loved it.*', { mood: lt => lt > 1.3 ? 'heart' : 'sparkle' }, [
    ['bubble', 770, 650, 'and another | thing—', 0.3, { size: 46, tail: 'bl' }],
    ['bubble', 800, 900, 'keep going!', 1.1, { size: 46, col: MINT, tail: 'br' }],
    ['hearts', 790, 1000, 1.3, { n: 5 }],
  ]),
  cam(S, 'Two moods today? | *Both are welcome.*', { mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'happy' }, [
    ['label', 790, 760, lt => Math.floor(lt * 2) % 2 ? 'MOOD: STORMY' : 'MOOD: SUNNY', 0.3, { size: 44, bg: SKYB, rot: -0.04, mono: true }],
    ['label', 790, 920, 'BOTH: WELCOME', 1.4, { size: 42, bg: GOLD, rot: 0.05 }],
  ]),
  cam(S, 'Forgot to reply? | *Friends forgive.*', { mood: lt => lt > 1.3 ? 'happy' : 'wide' }, [
    ['phone', 770, 900, 0.2, { head: lt => lt < 1.2 ? '3 UNREAD' : 'ALL GOOD', headCol: lt => lt < 1.2 ? RED : MINT, lines: [['u ok?', SKYB, 1], ['lol same', SKYB, 1], ['miss u!', PINK, 1]] }],
    ['hearts', 600, 760, 1.3, { n: 4 }],
  ]),
  cam(S, 'Not everyone gets you? | *The right ones do.*', { mood: lt => lt > 1.3 ? 'heart' : 'neutral' }, [
    ['label', 790, 760, 'COMPATIBLE?', 0.3, { size: 42, bg: LAV, rot: -0.04, mono: true }],
    ['label', 790, 900, '✓ GETS YOU', 1.1, { size: 50, bg: MINT, rot: 0.05 }],
    ['sparkles', 790, 900, 1.2, { n: 6, R: 150 }],
  ]),
  cam(S, 'Messy, curious, you? | *Already enough.*', { mood: 'sparkle', hops: [0.8, 1.6], keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0] }, [
    ['label', 790, 860, 'ENOUGH ✓', 0.6, { size: 66, bg: GOLD, rot: -0.05 }],
    ['sparkles', 790, 860, 1.0, { n: 8, R: 180 }],
  ]),
]

const F = makeFilm({
  id: 'r2a0392', key: 'F', accent: '#ffe27a', solo: S, ending: 'lesson',
  title: 'Gemini, no need | *to be perfect.*',
  cameos: CAMEOS,
  group: { cap: 'Curious. Chaotic. | *Lovable.*', mood: 'heart' },
  lesson: { text: 'Done beats perfect. | You’re *already enough.*', chip: 'PRESSURE: OFF' },
  last: {
    text: 'Tab forty-one | *can wait.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
