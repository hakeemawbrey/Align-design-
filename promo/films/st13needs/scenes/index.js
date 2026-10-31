// st13needs (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E29) · story 0–25.6, then the end card.
//   ❓ "Is it *needy* to have needs?" ♑ CAPRICORN (student) insists they only have goals; ♋ CANCER (teacher) puts it on
//   the board: everyone has needs, and saying them clearly is healthy (♥); a need is a request, not a demand (♥), shown as
//   a REQUEST / DEMAND split. Lightbulb: "So asking isn't weak. It's *efficient*." Last line (Cancer): "Needs aren't *needy*."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { makeLesson, CHALK, R } from './classkit.js'
import { drawHearts } from './props.js'

const CAN = signStar('cancer'), CAP = signStar('capricorn')

const EP = makeLesson({
  id: 'st13needs', numeral: 'S13 E29', duration: 30, key: 'F',
  q: 'Is it *needy* to have needs?', qAccent: '#9fdcff',
  cast: {
    cancer: { tag: '♋ CANCER', color: CAN.color, glyph: CAN.glyph, x: 230, y: 1176, size: 250, enter: 2.3, pitch: 523.25 },
    cap: { tag: '♑ CAPRICORN', color: CAP.color, glyph: CAP.glyph, x: 850, y: 1176, size: 250, x0: 600, y0: 930, size0: 480, pitch: 392 },
  },
  student: 'cap',
  board: { title: 'NEEDS 101' },
  lines: [
    ['cap', "Needs? I don't have needs. I have *goals*."],
    ['cancer', 'Sweetie. Everyone has *needs*.', { mark: 'every' }],
    ['cancer', 'Saying them clearly is *healthy*.', { mark: 'clear' }],
    ['cancer', 'And a need is a *request*, not a demand.', { mark: 'req' }],
    ['cap', 'So asking isn\'t weak. It\'s *efficient*.', { mark: 'bulb' }],
  ],
  chalk: [
    { text: 'Everyone has *needs*.', at: ['every', 0.5], x: 0, y: 84, size: 46 },
    { text: 'rest · time · a hug', at: ['every', 1.4], x: 0, y: 148, size: 34, color: CHALK.blue },
    { text: 'Say them *clearly*.', at: ['clear', 0.3], x: 0, y: 214, size: 40 },
    { line: [[400, 280], [400, 470]], at: ['req', 0.2], dur: 0.4 },
    { text: 'REQUEST', at: ['req', 0.5], x: 30, y: 310, size: 38, color: CHALK.green },
    { text: '"Can we talk|tonight?"', at: ['req', 0.9], x: 30, y: 370, size: 32 },
    { text: 'DEMAND', at: ['req', 1.5], x: 430, y: 310, size: 38, color: CHALK.red },
    { text: '"Text me back|NOW."', at: ['req', 1.9], x: 430, y: 370, size: 32 },
    { line: [[250, 306], [266, 322], [300, 288]], at: ['req', 2.7], dur: 0.3, color: CHALK.green, width: 7 },
    { line: [[640, 292], [674, 326]], at: ['req', 2.9], dur: 0.2, color: CHALK.red, width: 7 },
    { line: [[674, 292], [640, 326]], at: ['req', 3.05], dur: 0.2, color: CHALK.red, width: 7 },
  ],
  tags: [
    { kind: 'tip', at: ['clear', 1.4], x: 800, y: 214, align: 'right' },
    { kind: 'tip', at: ['req', 3.3], x: 400, y: 470, align: 'center' },
  ],
  bulb: ['bulb', 0.2],
  recap: ['Everyone has *needs*', 'Say them *clearly*', 'Ask, don\'t *demand*'],
  last: 'Needs aren\'t *needy*.', lastWho: 'cancer',
  moods(who, t, T) {
    const b = T.bulb
    if (who === 'cap') {
      if (t < T.walk[0]) return { mood: 'squint', look: [-1, -1], tilt: -0.12 }
      if (t < T.m.every) return { mood: 'neutral', look: [-1, 0] }
      if (t < T.m.req) return { mood: 'eyeroll' }
      if (t < b) return { mood: 'wide', look: [-1, -1] }
      return { mood: 'sparkle', look: [0, 0] }
    }
    if (t < T.m.every) return { mood: 'happy', look: [1, 0] }
    if (t < b) return { mood: 'neutral', look: [1, -1] }
    return { mood: 'heart', look: [1, 0] }
  },
  front(x, t, T, Rr) {
    // a little hug of hearts when Cancer lands the last line
    const c = Rr.cancer
    if (c) drawHearts(x, t, T.last + 0.2, c.x, c.top - 10, { n: 6, px: 6, spread: 120 })
    // Capricorn's goals clipboard-list gag: a tiny "GOALS" sign held up at the start, gone when the board talks needs
    const s = Rr.cap
    const k = 1 - clamp(prog(t, T.m.every, T.m.every + 0.3))
    if (s && k > 0) {
      x.save(); x.globalAlpha *= k
      const px = s.size / 40, gx = s.x - s.size * 0.62, gy = s.y - s.size * 0.05
      R(x, '#1b1236', gx - 4 * px, gy - 3.2 * px, 8.4 * px, 6.4 * px)
      R(x, '#fbf3e2', gx - 3.6 * px, gy - 2.8 * px, 7.6 * px, 5.6 * px)
      x.font = `700 ${Math.round(1.8 * px)}px 'Space Mono', monospace`; x.fillStyle = '#1b1236'; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('GOALS', gx + 0.2 * px, gy - 0.9 * px)
      R(x, '#2fc79a', gx - 2.6 * px, gy + 0.9 * px, 5.6 * px, 0.6 * px)
      R(x, '#2fc79a', gx - 2.6 * px, gy + 1.9 * px, 4.2 * px, 0.6 * px)
      x.restore()
    }
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
