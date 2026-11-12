// r2t0464: star_talk, SOLO (virgo), "Virgos texting | *be like.*" (signs3kit social cut, music: lofi · D). Ending: lesson.
//   replied in bullet points · edited a text six times after you read it · "lol." with a full stop · the group chat in folders
//   · a match sent a voice note, Virgo sent a transcript · replied "noted." to a love letter · zero unread, always
//   · you sent a meme, got a fact-check · you sent "k.", they sent a follow-up form
//   group "Clean inbox. | Big heart."   lesson "Love a Virgo? | Every text is care."   last "Tag a Virgo. | They'll edit this."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'virgo', ACC = '#7dffb0', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }
const VP = '#ff8fc0'   // Virgo's own bubbles

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, size = 26 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 ${size}px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 60); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -21, w, 42); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, lh = 1.55, align = 'center' } = {}) {
  if (k <= 0.01) return
  const LH = size * lh, h = lines.length * LH + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, align === 'left' ? -w / 2 + 24 : 0, -h / 2 + 25 + LH * (i + 0.5)))
  x.restore()
}
const FOLDER = ['KKKK.......', 'KYYYK......', 'KYYYYYYYYYK', 'KYYYYYYYYYK', 'KYYYYYYYYYK', 'KYYYYYYYYYK', 'KKKKKKKKKKK']
const LETTER = ['KKKKKKKKKKKK', 'KWWWWWWWWWWK', 'KWPPWWWWWWWK', 'KWWWWWWWWWWK', 'KWPPPPPPPWWK', 'KWWWWWWWWWWK', 'KWPPPPPPWWWK', 'KWWWWWWHWWWK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const LETTER_C = { K: PURP, W: CREAM, P: '#c9a6ff', H: RED }
const FROG = ['.GG...GG.', 'GWKG.GWKG', 'GGGGGGGGG', 'GGGGGGGGG', 'GRRRRRRRG', '.GGGGGGG.']
const FROG_C = { G: '#5fd068', W: '#ffffff', K: INK, R: PINK }

const CAMEOS = [
  // 1 · bullet points
  { sign: S, cap: '“Free tonight?” | Replied in *bullet points.*', mood: lt => lt < 1.1 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 880, 1.15 * pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'BESTIE', headCol: GOLD, lines: [['free tonight?', LAV, pop01(t, P.t0 + 0.3, 0.2, 2), false], ['• yes', VP, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['• 7:00 pm', VP, pop01(t, P.t0 + 1.0, 0.2, 2), true], ['• bring snacks', VP, pop01(t, P.t0 + 1.2, 0.2, 2), true]] })
    } },
  // 2 · edited
  { sign: S, cap: 'Edited the text. | *After you read it.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 5)
      phone(x, 790, 880, 1.15 * pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'READ 9:41', headCol: LAV, lines: [['see you soon!', VP, pop01(t, P.t0 + 0.3, 0.2, 2), true], [`(edited ×${n})`, BONE, pop01(t, P.t0 + 0.6, 0.2, 2), true]] })
    } },
  // 3 · "lol."
  { sign: S, cap: 'Full punctuation. | *Even on “lol.”*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'lol.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 80, tail: 'bl' })
      L(x, 790, 1040, 'FULL STOP:', pop01(t, P.t0 + 0.9, 0.3, 2), BONE, 0.04, 34)
      L(x, 790, 1110, 'INTENTIONAL', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 38)
    } },
  // 4 · folders
  { sign: S, cap: 'Sorted the group chat | into *folders.*', mood: lt => lt < 1.2 ? 'happy' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      const names = ['PLANS', 'MEMES', 'URGENT', 'FEELINGS']
      names.forEach((nm, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), cy = 650 + i * 145
        drawBits(x, FOLDER, { K: INK, Y: [GOLD, MINT, RED, LAV][i] }, 690, cy, 11 * k)
        L(x, 840, cy, nm, k, BONE, 0, 32)
      })
    } },
  // 5 · Align nod: the voice note
  { sign: S, cap: 'Match sent a voice note. | Virgo *sent a transcript.*', mood: lt => lt < 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 880, 1.15 * pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MATCH · LEO', headCol: GOLD, lines: [['▶ ∿∿∿∿ 4:12', '#ffb34a', pop01(t, P.t0 + 0.3, 0.2, 2), false], ['transcript:', VP, pop01(t, P.t0 + 1.0, 0.2, 2), true], ['“hey so um…”', VP, pop01(t, P.t0 + 1.2, 0.2, 2), true], ['(+ 3 pages)', BONE, pop01(t, P.t0 + 1.5, 0.2, 2), true]] })
    } },
  // 6 · the love letter
  { sign: S, cap: 'Got a love letter. | Replied *“noted.”*', mood: lt => lt < 1.2 ? 'happy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LETTER, LETTER_C, 800, 840, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.06 })
      bubble(x, 560, 1110, 'noted.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, tail: 'bl' })
      if (lt > 1.4) hearts(x, t, 800, 700, P.t0 + 1.5, { n: 4, life: 1.2, spread: 160, cell: 7, seed: 2 })
      L(x, 840, 1110, '(swooning)', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.05, 30)
    } },
  // 7 · zero unread
  { sign: S, cap: 'Unread messages? | *Zero. Always.*', mood: 'sparkle', star: ST,
    front(x, t, lt, P) {
      const n = Math.max(0, 47 - Math.floor(clamp((lt - 0.3) / 1.0) * 47))
      L(x, 790, 860, `UNREAD: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), n ? RED : MINT, -0.04, 52, n ? CREAM : INK)
      if (!n) sparkles(x, t, 790, 860, P.t0 + 1.0 * 1.29 + 0.4, 8, 220, 0.3)
      L(x, 790, 1080, 'INBOX: PRISTINE', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 34)
    } },
  // 8 · the fact-check
  { sign: S, cap: 'You sent a meme. | Got *a fact-check.*', mood: lt => lt < 1.1 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 760); x.rotate(-0.05); x.scale(k, k); x.fillStyle = INK; x.fillRect(-138, -98, 276, 196); x.fillStyle = SKYB; x.fillRect(-130, -90, 260, 180); x.restore() }
      drawBits(x, FROG, FROG_C, 790, 760, 20 * k, { rot: -0.05 })
      L(x, 790, 640, 'FROGS CAN FLY', k, BONE, -0.05, 30)
      note(x, 790, 1050, pop01(t, P.t0 + 0.9, 0.3, 2), ['FACT-CHECK:', 'they cannot.', 'sources: 3'], { w: 280, bg: CREAM, size: 28, rot: 0.04, font: MONO, weight: 700, lh: 1.4 })
    } },
  // 9 · "k."
  { sign: S, cap: 'You texted “k.” | Got *a follow-up form.*', mood: lt => lt < 1.0 ? 'wide' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.3, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 560, 620, 'k.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 56, col: LAV, tail: 'bc' })
      note(x, 800, 920, pop01(t, P.t0 + 0.7, 0.3, 2), ['FOLLOW-UP', '☐ upset', '☐ busy', '☐ just “k”', 'reply by 5 pm'], { w: 300, bg: CREAM, size: 30, rot: 0.05, font: MONO, weight: 700, lh: 1.4 })
    } },
]

const F = makeFilm({
  id: 'r2t0464', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Virgos texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Clean inbox. | *Big heart.*', mood: 'sparkle' },
  lesson: { text: 'Love a Virgo? | Every text *is care.*', chip: 'INBOX: LOVED' },
  last: {
    text: 'Tag a Virgo. | They’ll *edit this.*',
    draw(x, t, lt) { label(x, 540, 1290, '(edited ×1)', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
