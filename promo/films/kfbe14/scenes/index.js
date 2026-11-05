// kfbe14: FIRST DATE BINGO E14, "Nervous bingo" (vertical, star_talk post, music: pop · F).
// No end card, no card transition; LOOP ending (Aries waves again: frame 0).
//   0.0   frame 0: ♈ Aries mid-wave at the wrong person (a stranger at the next table, mid-sip, confused); the dauber
//         mid-slam on WAVED AT THE WRONG PERSON. Hook: "First-date nerves: | *the card.*"  0.5 shake.
//   2.4   an EARLIER inset: Aries in the mirror, "hi. hi! HI." → REHEARSED "HI" IN THE MIRROR (2.9)
//   4.0   the server: "enjoy your meal!" Aries: "you too!" → SAID "YOU TOO" TO "ENJOY YOUR MEAL" (4.6)
//   5.3   Aries freezes: "…" a loading name tag → FORGOT THEIR NAME FOR ONE SECOND (5.8)
//   6.5   ♋ Cancer: "I’m SO nervous too." both laugh → THEY’RE NERVOUS TOO (7.2) → BINGO (7.45)
//   8.4   "Awkward just means | *you care.*" · 10.6 Aries waves (at the right person this time) → loop.
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, INTER, MONO } from '../../kfbe01/scenes/bingokit.js'

const D = 11.8
const T = { shake: 0.5, mirror: [2.4, 3.9], s1: 2.9, enjoy: 4.0, s2: 4.6, blank: 5.3, s3: 5.8, nerv: 6.5, s4: 7.2, bingo: 7.45, sob: 8.2, last: 8.4, wave: 10.4 }
const SHAKE = { at: T.shake, len: 0.4, amp: 16 }

const EP = makeBingo({
  id: 'kfbe14', D, n: 3, ink: '#ff6a4a', cardTag: '♈ × ♋', ending: 'loop', whip: false,
  squares: [
    { text: 'WAVED AT THE WRONG PERSON', at: -0.04 }, { text: 'SAID "YOU TOO" TO "ENJOY YOUR MEAL"', at: T.s2 }, { text: 'KNOCKED THE MENU OVER' },
    { text: 'LAUGHED AT NOTHING' }, { free: true }, { text: 'FORGOT THEIR NAME FOR ONE SECOND', at: T.s3 },
    { text: 'REHEARSED "HI" IN THE MIRROR', at: T.s1 }, { text: 'THEY’RE NERVOUS TOO', at: T.s4 }, { text: 'SAT IN THE WRONG CHAIR' },
  ],
  win: [1, 4, 7], bingoAt: T.bingo,
  hook: { text: 'First-date nerves: | *the card.*', out: [2.2, 2.4], accentColor: '#ffa070' },
  heads: [{ text: 'Awkward just means | *you care.*', at: T.last, out: [11.0, 11.35], accent: '#ffa070', late: 2, lateAt: T.last + 0.4, wobble: true }],
  effects: [[HK.screenShake, HK.shakeCues, SHAKE]],
  scene(x, t) {
    cafe(x, t, { wall: '#2e2040', trim: '#3a2a52' })
    // the stranger at the next table (frame 0 + loop)
    const stK = Math.max(1 - inK(t, 1.6, 0.3), inK(t, T.wave + 0.2, 0.6))
    if (stK > 0.01) { x.save(); x.globalAlpha = stK; table(x, 150, 1060, 200, { cloth: null }); star(x, t, 'grey', { x: 150, y: 960, s: 150, mood: 'wide', look: [1, 0], seed: 13 }); label(x, '?', 210, 860, { size: 60, col: BONE, font: INTER, weight: 900 }); x.restore() }
    const wav = t < 1.6 || t > T.wave
    let am = 'happy', al = wav ? [-1, 0] : undefined
    if (t > T.enjoy + 0.6 && t < T.blank) { am = 'wide'; al = [1, 0] }
    if (t > T.blank && t < T.nerv) { am = 'wide'; al = [0, -1] }
    if (t > T.nerv) { am = 'happy'; al = undefined }
    if (t > T.bingo + 0.4 && t < T.wave) am = 'heart'
    shadow(x, 360, 1150, 220)
    star(x, t, 'aries', { x: 360, y: 880, s: 240, mood: am, look: al, hops: [T.shake, T.s2, T.nerv + 0.3, T.nerv + 0.6, T.bingo + 0.3], seed: 3 })
    // the waving hand
    if (wav) drawBits(x, ['.BB.', 'BBBB', 'BBBB', '.BB.'], { B: '#ff8a6a' }, 220 + 18 * Math.sin(t * 14), 760, 12)
    let cm = 'neutral', cl = [-1, 0]
    if (t > T.enjoy + 0.6) cm = 'happy'
    if (t > T.nerv - 0.2) { cm = 'happy'; cl = undefined }
    shadow(x, 800, 1150, 210)
    star(x, t, 'cancer', { x: 800, y: 890, s: 230, mood: cm, look: cl, hops: [T.nerv, T.nerv + 0.3, T.nerv + 0.6], seed: 2 })
    table(x, 580, 1010, 500)
    candle(x, t, 580, 1010)
    // the EARLIER mirror inset
    const mk = pop01(t, T.mirror[0], 0.3, 2.2) * outK(t, [T.mirror[1], T.mirror[1] + 0.2])
    if (mk > 0.01) {
      x.save(); x.translate(560, 640); x.scale(mk, mk)
      box(x, -200, -130, 400, 250, '#1a1430', { b: 7 }); box(x, -150, -110, 300, 210, '#9fc8e8', { b: 6 })
      star(x, t, 'aries', { x: 0, y: 10, s: 140, mood: 'sparkle', look: [0, 0], hops: [T.mirror[0] + 0.3, T.mirror[0] + 0.7, T.mirror[0] + 1.1], seed: 3, glyph: false })
      x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillStyle = '#ffe27a'; x.fillText('EARLIER', -185, -142)
      const w = ['hi.', 'hi!', 'HI.'][Math.min(2, Math.floor(Math.max(0, t - T.mirror[0] - 0.2) / 0.4))]
      label(x, w, 100, -70, { size: 40, col: INK, font: INTER, weight: 900, alpha: 1 })
      x.restore()
    }
    // the server
    const sv = inK(t, T.enjoy - 0.4, 0.3) * outK(t, [T.blank - 0.2, T.blank + 0.1])
    if (sv > 0.01) star(x, t, 'grey', { x: lerp(1180, 980, sv), y: 980, s: 150, mood: 'happy', look: [-1, 0], seed: 13 })
    // the blank name tag loading
    const nk = pop01(t, T.blank, 0.3, 2.2) * outK(t, [T.nerv - 0.2, T.nerv])
    if (nk > 0.01) { x.save(); x.translate(380, 650); x.scale(nk, nk); box(x, -130, -50, 260, 100, '#ffffff', { b: 6 }); R(x, '#e8344e', -130, -50, 260, 30); x.font = `800 20px ${INTER}`; x.textAlign = 'center'; x.fillStyle = '#fff'; x.fillText('HELLO MY NAME IS', 0, -30); x.font = `700 30px ${MONO}`; x.fillStyle = INK; x.fillText('.'.repeat(1 + Math.floor((t * 4) % 4)), 0, 18); x.restore() }
    if (t > T.bingo + 0.4 && t < T.wave) hearts(x, t, T.bingo + 0.4, 580, 760, { n: 5 })
  },
  bubbles: [
    { t0: -1.2, t1: 1.6, x: 300, y: 640, text: 'HI!! oh. not you.', size: 40, tail: -0.3 },
    { t0: T.enjoy, t1: T.blank - 0.1, x: 840, y: 760, text: 'enjoy your meal!', size: 32, tail: 0.3 },
    { t0: T.enjoy + 0.6, t1: T.blank - 0.1, x: 380, y: 680, text: 'you too!', size: 44, tail: -0.2 },
    { t0: T.nerv, t1: T.last - 0.1, x: 760, y: 700, text: 'I’m SO nervous too.', size: 38, tail: 0.3 },
    { t0: T.sob, t1: T.wave, x: 790, y: 448, text: 'THEY’RE BOTH NERVOUS', size: 30, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['pop', T.mirror[0], 739.99, 0.035, 0], ...[0, 1, 2].map(i => ['pop', r3(T.mirror[0] + 0.2 + i * 0.4), [880, 987.77, 1174.66][i], 0.03, 0]), ['pop', T.enjoy, 880, 0.035, 0.4], ['pluck', r3(T.enjoy + 0.6), 1318.51, 0.035, 0.4, -0.3], ['tick', T.blank, 0.05], ['pluck', T.nerv, 1174.66, 0.04, 0.5, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [ease, win01, GOLD]
