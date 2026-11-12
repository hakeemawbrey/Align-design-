// r2t0439: star_talk, SOLO, "Virgos in the chat | *be like.*" (signs3kit social cut, music: lofi · D). Ending: lesson.
// One sign the whole film (makeFilm solo mode, 9 cards), each the most extreme group-chat Virgo:
//   3.6–37.8   corrected a typo from 2019 · made the plan, with a spreadsheet · muted the chat, read all 412 · pinned the
//              address five times · replied to every message, numbered · birthday reminder, set in March · "who's bringing
//              what?" already assigned · checked everyone's birth chart first · sent one sticker, the chat panicked
//  37.8        "The chat’s | *unofficial admin.*"   41.0 LESSON: "Every chat | needs a *Virgo.*"  PLAN: SORTED
//  46.9        "Spotted a typo | in this *video?*"
import {
  makeFilm, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import {
  L, at, phone, sheet, chartWheel, buddy, drawBits, clamp, prog, ease, lerp,
  PIN, PIN_C, RED, CREAM, ORANGE, TEAL, GREEN,
} from './props.js'

const SAGE = '#b6e08a'
/** a spreadsheet grid */
function grid(x, cx, cy, k, fillN) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-166, -146, 350, 310)
  x.fillStyle = INK; x.fillRect(-176, -156, 352, 312); x.fillStyle = CREAM; x.fillRect(-170, -150, 340, 300)
  x.fillStyle = SAGE; x.fillRect(-170, -150, 340, 50)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BRUNCH.xls', 0, -124)
  x.fillStyle = '#9fb4c8'
  for (let i = 0; i <= 4; i++) x.fillRect(-170, -100 + i * 62, 340, 2)
  for (let j = 1; j < 4; j++) x.fillRect(-170 + j * 85, -100, 2, 250)
  const COL = [MINT, GOLD, PINK, SKYB]
  for (let n = 0; n < fillN; n++) { const r = Math.floor(n / 4), c = n % 4; x.fillStyle = COL[(r + c) % 4]; x.fillRect(-160 + c * 85, -90 + r * 62, 66, 42) }
  x.restore()
}

const S = 'virgo'
const CAMEOS = [
  { sign: S, cap: 'Corrected a typo. | *From 2019.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, at(t, P, 0.15), { head: 'FRIENDS ♡', headCol: SAGE, lines: [
        ['see you their!', LAV, at(t, P, 0.3)], ['*there', SAGE, at(t, P, 1.0), true],
      ] })
      L(x, 790, 1130, 'SENT: 2019. FIXED: NOW.', at(t, P, 1.4), GOLD, 0.04, 26)
    } },
  { sign: S, cap: 'Made the plan. | *With a spreadsheet.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      grid(x, 790, 860, at(t, P, 0.15), Math.floor(clamp((lt - 0.3) / 1.4) * 16))
      L(x, 790, 1100, 'TAB 2: BACKUP BRUNCH', at(t, P, 1.5), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Muted the chat. | *Read all 412.*', mood: 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, at(t, P, 0.15), { head: 'MUTED', headCol: '#9fb4c8', lines: [
        [`${Math.floor(clamp((lt - 0.3) / 1.4) * 412)} new`, GOLD, at(t, P, 0.3)], ['read ✓✓', SAGE, at(t, P, 1.5), true],
      ] })
    } },
  { sign: S, cap: 'Pinned the address. | *Five times.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(clamp((lt - 0.2) / 1.3) * 5) + 1)
      for (let i = 0; i < n; i++) drawBits(x, PIN, PIN_C, 680 + (i % 3) * 110, 760 + Math.floor(i / 3) * 150 + 10 * Math.sin(i * 2), 14 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2.2))
      L(x, 790, 1120, '12 OAK ST (PINNED)', at(t, P, 1.4), RED, 0.04, 28, CREAM)
    } },
  { sign: S, cap: 'Replied to every message. | *Numbered.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, at(t, P, 0.15), { w: 320, h: 360, head: 'RE: ALL', headCol: SAGE, size: 28, rows: [
        ['1. yes', INK, at(t, P, 0.4)], ['2. 7pm', INK, at(t, P, 0.6)], ['3. no glitter', INK, at(t, P, 0.8)], ['4. love you all', INK, at(t, P, 1.0)],
      ] })
      L(x, 790, 1110, 'SEE ATTACHED', at(t, P, 1.5), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Your birthday reminder? | *Set in March.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, at(t, P, 0.15), { head: 'REMINDER', headCol: PINK, lines: [
        ['your bday', PINK, at(t, P, 0.4)], ['in 5 months', PINK, at(t, P, 0.7)], ['gift: bought', SAGE, at(t, P, 1.2), true],
      ] })
    } },
  { sign: S, cap: '“Who’s bringing what?” | *Already assigned.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, at(t, P, 0.15), { w: 330, h: 360, head: 'POTLUCK', headCol: ORANGE, size: 26, rows: [
        ['TAURUS: snacks', INK, at(t, P, 0.4)], ['LEO: dessert', INK, at(t, P, 0.6)], ['SAG: ice', INK, at(t, P, 0.8)], ['PISCES: tissues', INK, at(t, P, 1.0)],
      ] })
      L(x, 790, 1110, 'NO SWAPS', at(t, P, 1.5), RED, 0.04, 34, CREAM)
    } },
  { sign: S, cap: 'Checked everyone’s | *birth chart* first.', mood: 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 830, at(t, P, 0.2), 140)
      L(x, 790, 1070, 'MERCURY: BEHAVING', at(t, P, 1.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Sent one sticker. | *The chat panicked.*', mood: lt => lt > 1.2 ? 'wide' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, at(t, P, 0.15), { head: 'FRIENDS ♡', headCol: SAGE, lines: [
        ['(dancing star)', SAGE, at(t, P, 0.3), true], ['VIRGO???', ORANGE, at(t, P, 0.9)], ['are u ok', ORANGE, at(t, P, 1.1)], ['who is this', ORANGE, at(t, P, 1.3)],
      ] })
    } },
]

const F = makeFilm({
  id: 'r2t0439', key: 'D', accent: SAGE, solo: S, ending: 'lesson',
  title: 'Virgos in the chat | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'The chat’s | *unofficial admin.*', mood: 'sparkle' },
  lesson: { text: 'Every chat | needs a *Virgo.*', chip: 'PLAN: SORTED' },
  last: { text: 'Spotted a typo | in this *video?*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
