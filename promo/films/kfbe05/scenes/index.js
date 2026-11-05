// kfbe05: FIRST DATE BINGO E5, "Leo gets a compliment back" (vertical, star_talk post, music: funk · A).
// No end card, no card transition; hard cut on the last line.
//   0.0   frame 0: ♌ Leo mid-pose, checking its reflection in a giant spoon (sparkle); the dauber mid-slam on CHECKS
//         REFLECTION IN SPOON. Hook: "Leo came to | *impress.*"  0.5 gold flash + shake.
//   2.9   a little slideshow behind Leo: "ME" · "ALSO ME" · "ME, AGAIN" → TELLS A STORY ABOUT THEMSELF (3.9)
//   5.4   ♒ Aquarius: "I love how you light up when you talk." · Leo freezes, goes pink → SPEECHLESS (7.0) → BINGO
//   8.5   the host: "I'M ON THE FLOOR" · 9.6 a gold frame drops round Leo: "Leo, *speechless.* | Frame it." · hard cut.
import { makeBingo, cafe, table, candle, star, label, shadow, hearts, sparkles, drawBits, R, box, prog, lerp, ease, outK, pop01, inK, win01, r3, HK, INK, BONE, GOLD, INTER } from '../../kfbe01/scenes/bingokit.js'

const D = 12.6
const T = { flash: 0.5, slides: [2.9, 3.5, 4.1], story: 3.9, comp: 5.4, freeze: 6.4, speech: 7.0, bingo: 7.25, floor: 8.5, frame: 9.6, last: 9.7 }
const SHAKE = { at: T.flash, len: 0.45, amp: 22 }

const EP = makeBingo({
  id: 'kfbe05', D, n: 3, ink: '#f0a030', cardTag: '♌ × ♒',
  squares: [
    { text: 'BROUGHT THEIR GOOD SIDE' }, { text: 'TALKS WITH JAZZ HANDS' }, { text: 'ORDERS THE MOST GOLDEN DISH' },
    { text: 'FISHES FOR A COMPLIMENT' }, { free: true }, { text: 'LAUGHS LOUDEST AT OWN JOKE' },
    { text: 'CHECKS REFLECTION IN SPOON', at: -0.04 }, { text: 'TELLS A STORY ABOUT THEMSELF', at: T.story }, { text: 'SPEECHLESS', at: T.speech },
  ],
  win: [6, 7, 8], bingoAt: T.bingo,
  hook: { text: 'Leo came to | *impress.*', out: [2.7, 2.9], accentColor: '#ffb84a' },
  heads: [{ text: 'Leo, *speechless.* | Frame it.', at: T.last, accent: '#ffb84a', wobble: true }],
  effects: [[HK.screenShake, HK.shakeCues, SHAKE]],
  scene(x, t) {
    cafe(x, t, { wall: '#3a1f3a', trim: '#4a2a48' })
    // the slideshow screen
    const sk = pop01(t, T.slides[0] - 0.3, 0.3, 2) * outK(t, [5.2, 5.5])
    if (sk > 0.01) {
      x.save(); x.translate(540, 600); x.scale(sk, sk)
      box(x, -170, -110, 340, 200, '#fff8e8', { b: 8 })
      const n = t < T.slides[1] ? 0 : t < T.slides[2] ? 1 : 2
      x.font = `900 ${[70, 54, 50][n]}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
      x.fillText(['ME', 'ALSO ME', 'ME, AGAIN'][n], 0, -10)
      x.font = `700 22px 'Space Mono', monospace`; x.fillStyle = '#a08a70'; x.fillText(`slide ${n + 1} of 40`, 0, 60)
      x.restore()
    }
    let lm = 'sparkle', ll = [1, 0.4]
    if (t > 1.2) { lm = 'happy'; ll = undefined }
    if (t > T.comp + 0.8) { lm = 'wide'; ll = [1, 0] }
    if (t > T.speech + 0.4) { lm = 'heart'; ll = undefined }
    const blush = t > T.comp + 0.8
    shadow(x, 290, 1150, 230)
    const pose = t < 1.2 ? 0.08 : 0
    const F = star(x, t, 'leo', { x: 290, y: 870, s: 260, mood: lm, look: ll, blush, hops: [T.flash, 1.6, 2.2, ...T.slides, T.bingo], seed: 4, squash: pose + (t > T.freeze && t < T.speech ? -0.08 : 0), bob: t > T.freeze && t < T.speech ? 0 : undefined })
    // the giant spoon (frame 0)
    const spk = 1 - inK(t, 1.2, 0.3)
    if (spk > 0.01) {
      x.save(); x.translate(470, 800); x.rotate(-0.4); x.scale(spk, spk)
      R(x, INK, -14, 40, 28, 180); R(x, '#d8d4e8', -8, 44, 16, 172)
      x.fillStyle = INK; x.beginPath(); x.ellipse(0, -20, 70, 92, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#e8e4f8'; x.beginPath(); x.ellipse(0, -20, 60, 82, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ffb84a'; x.beginPath(); x.ellipse(0, -10, 34, 40, 0, 0, Math.PI * 2); x.fill()   // the reflection
      x.restore()
      sparkles(x, t, 470, 780, -0.3, 8, 90, 3, [GOLD, '#fff'])
    }
    let am = 'neutral', al = [-1, 0]
    if (t > T.comp) { am = 'happy'; al = undefined }
    shadow(x, 790, 1150, 210)
    star(x, t, 'aquarius', { x: 790, y: 890, s: 230, mood: am, look: al, hops: [T.comp, T.comp + 0.4], seed: 12 })
    table(x, 540, 1010, 520)
    candle(x, t, 540, 1010)
    if (t > T.speech + 0.4) hearts(x, t, T.speech + 0.4, 290, 720, { n: 5 })
    // the gold frame drops round Leo
    const fk = easeDrop(prog(t, T.frame, T.frame + 0.35))
    if (fk > 0) {
      const y0 = lerp(-600, 0, fk)
      x.save(); x.translate(0, y0)
      const X = 120, Y = 650, W = 340, H = 400
      const bar = (bx, by, bw, bh) => { R(x, INK, bx - 6, by - 6, bw + 12, bh + 12); R(x, GOLD, bx, by, bw, bh); R(x, '#c89a30', bx + 6, by + bh - 8, bw - 12, 6) }
      bar(X - 16, Y - 16, W + 32, 26); bar(X - 16, Y + H - 10, W + 32, 26); bar(X - 16, Y - 16, 26, H + 32); bar(X + W - 10, Y - 16, 26, H + 32)
      for (const [cx, cy] of [[X - 3, Y - 3], [X + W + 3, Y - 3], [X - 3, Y + H + 3], [X + W + 3, Y + H + 3]]) box(x, cx - 18, cy - 18, 36, 36, '#ffe27a', { b: 5 })
      box(x, X + W / 2 - 90, Y + H + 20, 180, 44, GOLD, { b: 5 }); x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('SPEECHLESS', X + W / 2, Y + H + 43)
      x.restore()
      sparkles(x, t, 290, 850, T.frame + 0.35, 12, 220, 2, [GOLD, '#fff'])
    }
    void F
  },
  bubbles: [
    { t0: T.comp, t1: T.bingo + 0.1, x: 700, y: 690, text: 'I love how you light up', size: 36, tail: 0.3 },
    { t0: T.comp + 0.6, t1: T.bingo + 0.1, x: 700, y: 770, text: 'when you talk.', size: 36, tail: 0.3 },
    { t0: T.speech - 0.4, t1: T.bingo, x: 300, y: 650, text: '…', size: 60, tail: -0.2 },
    { t0: T.floor, t1: D + 1, x: 790, y: 448, text: 'I’M ON THE FLOOR', size: 32, tail: 0.5, col: '#cfe8ff' },
  ],
  cues: [['bell', T.flash, 2349.32, 0.03, 0.8, 0], ...T.slides.map((s, i) => ['tick', s, 0.05]), ['pluck', T.comp, 1318.51, 0.035, 0.5, 0.3], ['riser', T.freeze, T.speech, 0.02],
    ['whoosh', T.frame, 0.3, 0.04], ['tom', r3(T.frame + 0.35), 90, { gain: 0.3, decay: 0.25 }], ['glitter', r3(T.frame + 0.35), r3(T.frame + 0.8)]],
  fxFlash: true,
})
function easeDrop(p) { return p <= 0 ? 0 : p >= 1 ? 1 : 1 - Math.pow(1 - p, 3) * Math.cos(p * 9) * 0.6 - Math.pow(1 - p, 3) * 0.4 }
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, drawBits, BONE, r3, win01, ease]
