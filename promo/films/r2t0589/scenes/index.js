// r2t0589: star_talk, SOLO (libra), "Group chat Libras | *be like.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine group-chat habits of a Libra, each pushed to the extreme. Ending: lesson.
//   a poll about making a poll · hearts on every message · typed for ten minutes, sent "haha" · two friends fighting,
//   DMs both · renamed the chat again · left you on read choosing a sticker · can't pick a date for the hangout
//   · a seating chart by compatibility · the chat goes quiet, Libra sends a compliment
//   group "The glue. | *With good taste.*"  lesson "Every chat needs | *a Libra.*"  VIBE: KEPT
//   last "Still choosing | *the perfect sticker.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, chart, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'libra', ST = { x: -180 }
const STAR5 = ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.', 'Y.....Y']
const SMILE = ['.YYYYY.', 'YYKYKYY', 'YYYYYYY', 'YKYYYKY', 'YYKKKYY', '.YYYYY.']

/** a 3×3 grid of stickers; one gets highlighted (sel) */
function stickers(x, t, cx, cy, k, sel) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = '#2a2350'; x.fillRect(-160, -160, 320, 320)
  for (let i = 0; i < 9; i++) {
    const gx = ((i % 3) - 1) * 100, gy = (Math.floor(i / 3) - 1) * 100
    if (i === sel) { x.fillStyle = GOLD; x.fillRect(gx - 46, gy - 46, 92, 92) }
    x.fillStyle = '#140c30'; x.fillRect(gx - 40, gy - 40, 80, 80)
    const bm = [HEART, STAR5, SMILE][i % 3], col = [{ H: PINK, W: '#fff' }, { Y: GOLD }, { Y: '#ffe76a', K: INK }][i % 3]
    drawBits(x, bm, col, gx, gy, 8, { outline: null })
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Made a poll | *about making a poll.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'POLL', headCol: PINK, lines: [['new poll?', GOLD, pop01(t, P.t0 + 0.5, 0.2, 2), true], ['yes ✓✓✓', MINT, pop01(t, P.t0 + 0.9, 0.2, 2), true], ['no', BONE, pop01(t, P.t0 + 1.1, 0.2, 2), true]], size: 30 })
      L(x, 770, 1120, 'POLL RESULT: MORE POLLS', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 26)
    } },
  { sign: S, cap: 'Heart-reacted | *every single message.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIES', headCol: MINT, lines: [['ok', BONE, 1, false], ['k', BONE, 1, false], ['brb', BONE, 1, false]], size: 30 })
      for (let i = 0; i < 3; i++) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 900, 800 + i * 62, 6 * pop01(t, P.t0 + 0.6 + i * 0.3, 0.25, 2.4))
      L(x, 770, 1120, 'EVEN “K” GOT ONE', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Typed for ten minutes. | Sent *“haha.”*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIES', headCol: MINT, lines: [['big news!!', SKYB, pop01(t, P.t0 + 0.3, 0.2, 2), false], ['haha', PINK, pop01(t, P.t0 + 1.4 * 1.29, 0.2, 2.4), true]], typing: lt > 0.4 && lt < 1.4 ? 1 : 0, size: 30 })
      L(x, 800, 640, 'DRAFTS: 14', pop01(t, P.t0 + 0.6, 0.3, 2), STEEL, -0.04, 32)
    } },
  { sign: S, cap: 'Two friends fighting? | *Libra DMs both.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'you’re so right.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      bubble(x, 820, 880, 'you’re so right.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: '#ffb34a', tail: 'br' })
      L(x, 770, 1100, 'MEDIATOR: ONLINE', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Renamed the chat. | *Eighth time today.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const names = ['besties', 'bestiesss', '✦ the girls ✦', 'the council']
      const n = Math.min(3, Math.floor(lt / 0.5))
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 260, head: 'CHAT NAME', headBg: PINK, headInk: INK, lines: [names[n]], size: 46, rot: -0.04 })
      L(x, 770, 1090, `RENAMED x${5 + n}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Left you on read? | *Choosing a sticker.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      stickers(x, t, 810, 860, 0.9 * pop01(t, P.t0 + 0.2, 0.3, 2), Math.floor(lt * 4) % 9)
      L(x, 770, 1120, 'STILL CHOOSING…', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, -0.04, 32)
    } },
  { sign: S, cap: 'Planned the hangout. | *Can’t pick a date.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 800, 860, k, { w: 340, h: 320, head: 'NEXT MONTH', headBg: STEEL, headInk: INK, lines: [], rot: 0.04 })
      for (let i = 0; i < 12; i++) { const kk = pop01(t, P.t0 + 0.4 + i * 0.08, 0.2, 2); if (kk < 0.01) continue; x.save(); x.translate(690 + (i % 4) * 74, 810 + Math.floor(i / 4) * 70); x.rotate(0.04); x.scale(kk, kk); x.fillStyle = i % 3 === 1 ? PINK : MINT; x.fillRect(-24, -24, 48, 48); x.fillStyle = INK; x.font = '800 32px Inter, Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 0, 2); x.restore() }
      L(x, 770, 1110, 'ALL OF THEM? MAYBE?', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Made a seating chart | *by compatibility.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 820, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 770, 1080, 'LEO NOT NEXT TO LEO', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Chat went quiet? | Libra *sent a compliment.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'you all look | so good today', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 1000, P.t0 + 1.0, { n: 6, life: 2.0, spread: 260, cell: 7, seed: 9 })
      L(x, 770, 1110, '14 PEOPLE TYPING', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0589', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Group chat Libras | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'The glue. | *With good taste.*', mood: 'heart' },
  lesson: { text: 'Every chat needs | *a Libra.*', chip: 'VIBE: KEPT' },
  last: { text: 'Still choosing | *the perfect sticker.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
