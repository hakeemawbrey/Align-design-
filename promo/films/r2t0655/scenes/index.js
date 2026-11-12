// r2t0655: star_talk, ROLL CALL, "The signs | *at book club.*" (signs3kit social cut, music: lofi · F). Zodiac order:
//   ♈ read the last page, announced it · ♉ came for the snacks, book unopened · ♊ reading six books, mixed up the plots
//   · ♋ hosted, baked, knit bookmarks for all · ♌ didn't read it, wrote a sequel · ♍ two hundred sticky notes
//   · ♎ loved every character, even the villain · ♏ guessed the twist on page two · ♐ "but why are we here?"
//   · ♑ gave the book a performance review · ♒ picked a book nobody can find · ♓ sobbed at chapter one (nothing happened yet)
// Ending: lesson. group "Twelve opinions. | *Zero finished books.*", LESSON "Read slow or fast. | *Just come back.*"
// STATUS: BOOKWORM, last "Next month? | *Snacks. Again.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -170 }

// an open book (two pages), optional sticky-note flags along the top
function openBook(x, t, cx, cy, k, { flags = 0, cover = LAV, text = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -96, 336, 220)
  const FC = [PINK, MINT, GOLD, SKYB, LAV, '#ffb34a']
  for (let i = 0; i < flags; i++) { x.fillStyle = INK; x.fillRect(-150 + (i % 14) * 22 - 2, -130 - (i % 3) * 10 - 2, 20, 44); x.fillStyle = FC[i % 6]; x.fillRect(-150 + (i % 14) * 22, -130 - (i % 3) * 10, 16, 40) }
  x.fillStyle = INK; x.fillRect(-170, -104, 340, 216)
  x.fillStyle = cover; x.fillRect(-164, -98, 328, 204)
  x.fillStyle = CREAM; x.fillRect(-152, -90, 148, 186); x.fillRect(4, -90, 148, 186)
  x.fillStyle = '#c9bfa8'; x.fillRect(-4, -90, 8, 186)
  if (text) { x.fillStyle = '#b9b0a0'; for (let r = 0; r < 7; r++) { x.fillRect(-138, -70 + r * 24, 120 - (r % 3) * 14, 8); x.fillRect(18, -70 + r * 24, 120 - (r % 2) * 20, 8) } }
  x.restore()
}
// a knitted bookmark (zigzag ribbon with a pom-pom)
function bookmark(x, cx, cy, k, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-22, -90, 44, 180)
  x.fillStyle = col; x.fillRect(-16, -84, 32, 168)
  x.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 7; i++) x.fillRect(-16 + (i % 2) * 16, -80 + i * 24, 16, 8)
  x.fillStyle = col; x.beginPath(); x.arc(0, 110, 22, 0, 7); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Read the last page. | *Announced it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [0.9, 1.3],
    front(x, t, lt, P) {
      openBook(x, t, 790, 950, pop01(t, P.t0 + 0.2, 0.3, 2), { cover: RED })
      L(x, 790, 820, 'PAGE 412 OF 412', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.05, 30)
      bubble(x, 790, 650, 'SHE LIVES!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Came for the snacks. | *Book: unopened.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 700, 1060, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 700, 1150, 'STILL WRAPPED', pop01(t, P.t0 + 1.4, 0.3, 2.4), STEEL, -0.04, 28)
      bits(x, 'COOKIE', 760, 760, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bits(x, 'SANDWICH', 880, 900, 12 * pop01(t, P.t0 + 0.7, 0.3, 2))
      bits(x, 'PIZZA', 900, 700, 10 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: 0.3 })
    } },
  { sign: 'gemini', cap: 'Reading six books. | *Mixed up the plots.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const COV = [RED, MINT, LAV, GOLD, SKYB, PINK]
      for (let i = 0; i < 6; i++) bits(x, 'BOOK', 800, 1090 - i * 60, 12 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: (i % 2 ? 0.08 : -0.06) })
      bubble(x, 790, 640, 'so the dragon | married the detective?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Hosted. Baked. | *Knit bookmarks for all.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const COL = [PINK, MINT, LAV, GOLD, SKYB]
      for (let i = 0; i < 5; i++) bookmark(x, 650 + i * 75, 860 + (i % 2) * 30, pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), COL[i])
      L(x, 790, 1100, 'ONE EACH ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Didn’t read it. | *Wrote a sequel.*', mood: 'sparkle', star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(800, 860); x.rotate(0.05); x.scale(k, k); x.fillStyle = INK; x.fillRect(-130, -170, 260, 340); x.fillStyle = '#ffb34a'; x.fillRect(-122, -162, 244, 324); x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PART 2:', 0, -90); x.font = `800 44px ${INTER}`; x.fillText('ME', 0, -40); x.restore(); if (k > 0.6) signChar(x, t, 'leo', 800, 940, 120, { mood: 'wink', seed: 44, glyph: false, glow: 0.4 }) }
      L(x, 800, 1110, 'BY: LEO ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'virgo', cap: 'Sticky notes? | *Two hundred.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      openBook(x, t, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2), { cover: MINT, flags: Math.floor(clamp((lt - 0.4) / 1.4) * 28) })
      L(x, 790, 1110, 'ANNOTATED: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Loved every character. | *Even the villain.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'he’s just | misunderstood', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      bits(x, 'BOOK', 790, 920, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 560, 900, P.t0 + 0.8, { n: 6, life: 2.0, spread: 160, cell: 7, seed: 2 })
      L(x, 790, 1100, 'TEAM VILLAIN ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Guessed the twist | *on page two.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      openBook(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { cover: '#3a2a5a' })
      L(x, 790, 700, 'PAGE 2', pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, 0.05, 40)
      bubble(x, 790, 1100, 'the cat did it.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Skipped the book. | *Discussed life.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'but WHY | are we here?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 790, 900, P.t0 + 0.9, 8, 170, 0.3, [GOLD, SKYB, BONE])
      L(x, 790, 1080, 'BOOK CLUB → DEEP TALK', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Gave the book | *a performance review.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 330, h: 320, head: 'REVIEW', headBg: '#2fc79a', headInk: INK, lines: ['pacing: slow', 'chapter 9: why', ['verdict: B-', '#d23a4a']], size: 30, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1100, 'SEE ME AFTER', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Picked a book | *nobody can find.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 790, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      L(x, 790, 680, 'COPIES: 1 (MINE)', pop01(t, P.t0 + 0.6, 0.3, 2.2), SKYB, 0.05, 32)
      bubble(x, 790, 1090, 'it’s very niche', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl', col: MINT })
    } },
  { sign: 'pisces', cap: 'Sobbed at chapter one. | *Nothing happened yet.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      openBook(x, t, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2), { cover: SKYB })
      L(x, 790, 730, 'CHAPTER 1', pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, 0.05, 38)
      L(x, 790, 1110, 'PAGES: DAMP', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0655', key: 'F', accent: ACC, ending: 'lesson',
  title: 'The signs | *at book club.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve opinions. | *Zero finished books.*' },
  lesson: { text: 'Read slow or fast. | *Just come back.*', chip: 'STATUS: BOOKWORM' },
  last: {
    text: 'Next month? | *Snacks. Again.*',
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
