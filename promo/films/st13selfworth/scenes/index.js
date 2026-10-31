// st13selfworth (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E30) · story 0–40.6, then the end card.
//   ❓ "Why does *self-worth* come first?" ♍ VIRGO (student) has a clipboard list of why they should like her; ♌ LEO
//   (teacher, crown, pointer) strikes it: start with why *you* like you. The board: a chalk cup filling up; know your worth
//   → you pick who matches it, you leave what doesn't (♥); a phone with a slow reply: your worth isn't a reply time (♥).
//   Lightbulb: "So my worth isn't on their *schedule*." Leo hands over the crown. Last line (Leo): "Date from *full*, not empty."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkText } from '../../stexplain.js'
import { makeLesson, CHALK, R } from './classkit.js'
import { drawCrown, drawClipboard, sparkBurst } from './props.js'

const LEO = signStar('leo'), VIR = signStar('virgo')

const EP = makeLesson({
  id: 'st13selfworth', numeral: 'S13 E30', duration: 45, key: 'A',
  q: 'Why does *self-worth* come first?', qAccent: '#ffd23f',
  cast: {
    leo: { tag: '♌ LEO', color: LEO.color, glyph: LEO.glyph, x: 230, y: 1176, size: 250, enter: 2.3, pitch: 440, pointer: true },
    virgo: { tag: '♍ VIRGO', color: VIR.color, glyph: VIR.glyph, x: 850, y: 1176, size: 250, x0: 600, y0: 930, size0: 480, pitch: 659.25 },
  },
  student: 'virgo',
  board: { title: 'WORTH 101' },
  lines: [
    ['virgo', 'I made a list of why they should *like* me.'],
    ['leo', 'Darling. Start with why *you* like you.', { mark: 'cup' }],
    ['leo', 'Know your worth, and you pick who *matches* it.', { mark: 'match' }],
    ['leo', 'And you leave what *doesn\'t*.', { mark: 'leave' }],
    ['virgo', 'But they took *forever* to text back.', { mark: 'reply' }],
    ['leo', 'Your worth isn\'t a *reply time*.', { mark: 'worth' }],
    ['virgo', 'So my worth isn\'t on their *schedule*.', { mark: 'bulb' }],
    ['leo', 'Exactly. The crown is *yours* now.', { mark: 'crown' }],
  ],
  chalk: [
    { text: 'Know your *worth*', at: ['cup', 1.0], x: 250, y: 92, size: 40 },
    { text: '→ pick who *matches* it', at: ['match', 0.4], x: 250, y: 158, size: 34 },
    { text: '→ leave what *doesn\'t*', at: ['leave', 0.3], x: 250, y: 212, size: 34 },
    { line: [[0, 316], [800, 316]], at: ['reply', 0.2], dur: 0.5, dash: [14, 12], width: 4 },
    { text: 'reply time', at: ['worth', 0.3], x: 210, y: 368, size: 40, color: CHALK.blue },
    { text: '≠ *your worth*', at: ['worth', 0.9], x: 210, y: 424, size: 40 },
  ],
  tags: [
    { kind: 'tip', at: ['leave', 1.4], x: 800, y: 260, align: 'right' },
    { kind: 'tip', at: ['worth', 1.7], x: 800, y: 470, align: 'right' },
  ],
  bulb: ['bulb', 0.25],
  recap: ['Know your *worth*', 'Pick who *matches* it', 'Worth ≠ *reply time*'],
  last: 'Date from *full*, not empty.', lastWho: 'leo',
  moods(who, t, T) {
    if (who === 'virgo') {
      if (t < T.walk[0]) return { mood: 'wide', look: [-1, -1], tilt: -0.1 }
      if (t < T.m.cup + 1) return { mood: 'neutral', look: [-1, 0] }
      if (t < T.m.reply) return { mood: 'wide', look: [-1, -1] }
      if (t < T.m.worth) return { mood: 'squint', look: [-1, 0] }
      if (t < T.bulb) return { mood: 'neutral', look: [-1, -1] }
      return { mood: 'sparkle', look: [-1, 0] }
    }
    if (t < T.m.reply) return { mood: 'wink', look: [1, -1] }
    if (t < T.bulb) return { mood: 'neutral', look: [1, 0] }
    return { mood: 'happy', look: [1, 0] }
  },
  draw(x, t, T, B) {
    // the cup: chalk outline, then gold chalk filling up as Leo talks worth
    const cx = B.x0 + 30, cy = B.y0 + 60
    chalkLine(x, t, { pts: [[cx, cy], [cx + 20, cy + 190], [cx + 150, cy + 190], [cx + 170, cy]], at: T.m.cup + 0.3, dur: 0.6 })
    chalkLine(x, t, { pts: [[cx + 170, cy + 50], [cx + 205, cy + 60], [cx + 200, cy + 120], [cx + 160, cy + 130]], at: T.m.cup + 0.85, dur: 0.3 })
    const fillK = ease.inOutCubic(clamp(prog(t, T.m.cup + 1.2, T.m.leave + 1.2)))
    if (fillK > 0) {
      const top = cy + 186 - 160 * fillK
      x.save(); x.globalAlpha *= 0.85
      for (let y = cy + 184; y > top; y -= 10) {
        const u = (y - cy) / 190, inset = 22 - 18 * (1 - u)
        R(x, (Math.floor(y / 10) % 2) ? CHALK.gold : '#f2c75c', cx + inset + 6, y - 8, 170 - 2 * inset - 12, 7)
      }
      x.restore()
    }
    chalkText(x, t, { text: 'FULL', x: cx + 85, y: cy + 218, at: T.m.leave + 1.0, size: 30, color: CHALK.gold, align: 'center' })
    // the phone: a chalk outline, a "typing…" bubble that never resolves, a clock
    const px = B.x0 + 40, py = B.y0 + 330
    chalkLine(x, t, { pts: [[px, py], [px + 90, py], [px + 90, py + 150], [px, py + 150], [px, py]], at: T.m.reply + 0.4, dur: 0.5, color: CHALK.blue })
    if (t > T.m.reply + 0.9) {
      const n = 1 + Math.floor((t * 3) % 3)
      x.save(); x.fillStyle = CHALK.white
      for (let i = 0; i < n; i++) x.fillRect(px + 22 + i * 18, py + 70, 10, 10)
      x.restore()
    }
    chalkLine(x, t, { pts: [[px + 120, py + 40], [px + 140, py + 40]], at: T.m.reply + 1.0, dur: 0.1 })
  },
  front(x, t, T, Rr) {
    const L = Rr.leo, V = Rr.virgo
    // Virgo's clipboard ("why they should like me"), struck through when Leo answers, put away by the lightbulb
    const ck = 1 - clamp(prog(t, T.bulb - 0.3, T.bulb))
    if (V && ck > 0) {
      x.save(); x.globalAlpha *= ck
      drawClipboard(x, V.x - V.size * 0.62, V.y + V.size * 0.02, Math.round(V.size / 44), { strike: clamp(prog(t, T.m.cup + 0.4, T.m.cup + 0.7)), rot: 0.14, page: 0 })
      x.restore()
    }
    // the crown: on Leo, then it hops over to Virgo when Leo says "the crown is yours now"
    if (!L || !V) return
    const c0 = T.m.crown + 1.0, c1 = c0 + 0.7
    const k = clamp(prog(t, c0, c1)), e = ease.inOutCubic(k)
    const ax = L.x, ay = L.top + L.size * 0.1, bx = V.x, by = V.top + V.size * 0.1
    const cxp = lerp(ax, bx, e), cyp = lerp(ay, by, e) - Math.sin(Math.PI * k) * 260
    drawCrown(x, cxp, cyp, Math.round(lerp(L.size, V.size, e) / 30), lerp(-0.12, 0.14, e) + Math.sin(Math.PI * k) * 0.6)
    if (t >= c1) sparkBurst(x, t, bx, by - 20, c1, { n: 10, R: 140, size: 18, seed: 3 })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ['whoosh', +(EP.T.m.crown + 1.0).toFixed(3), 0.5, 0.025], ['pluck', +(EP.T.m.crown + 1.7).toFixed(3), 1318.51, 0.05, 0.6, 0]].sort((a, b) => a[1] - b[1])
