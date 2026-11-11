// v3t095: THE SIGNS AS… v3, SOLO film, "Geminis in love | be like." (~51 s vertical, signs3kit social cut, lofi · G)
// One sign the whole way: nine love situations, each the most extreme (and lovable) Gemini version. Ending: 'callback'.
//   0.0–3.6    "Geminis in love | *be like.*"
//   3.6–37.8   fell for them twice, same afternoon · first date lasted eleven hours · a voice note with chapters
//              · new match, told the group chat first · love language: fun facts · two moods, both obsessed with you
//              · one date, five locations · "I love you" in four languages · your bad day, forty memes
//  37.8        "Chaotic. Curious. | *All in.*"
//  41.2        callback: "The voice note? | Chapter *two* is out."  The voice-note bubble is back, longer.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffd23a'
const PIN = [
  '.RRRR.',
  'RRWWRR',
  'RRWWRR',
  '.RRRR.',
  '..RR..',
  '..RR..',
  '...R..',
]

// a voice-note bubble: play button, waveform, a duration and a chapter label
function voiceNote(x, t, cx, cy, k, { dur = '14:02', chapter = 'CH. 1', w = 420 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = 110
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2, w + 10, h); x.fillRect(-w / 2, -h / 2 - 5, w, h + 10)
  x.fillStyle = '#7dffb0'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 + 30, -22); x.lineTo(-w / 2 + 30, 22); x.lineTo(-w / 2 + 66, 0); x.closePath(); x.fill()
  for (let i = 0; i < 18; i++) { const bh = 10 + 30 * Math.abs(Math.sin(i * 1.7 + t * 4)); x.fillRect(-w / 2 + 90 + i * ((w - 200) / 18), -bh / 2 - 6, 8, bh) }
  x.font = `700 24px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(dur, w / 2 - 20, 34)
  x.restore()
  label(x, cx + w / 2 - 50, cy - 80, chapter, k, { size: 26, bg: GOLD, rot: 0.06 })
}
// a phone screen with a message count
function phone(x, cx, cy, k, title, count) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -190, 240, 380)
  x.fillStyle = '#140c30'; x.fillRect(-108, -160, 216, 320)
  x.fillStyle = BONE; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -128)
  for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? '#6b62a8' : YEL; x.fillRect(i % 2 ? -90 : -40, -90 + i * 52, 130, 36) }
  x.fillStyle = '#ff4f86'; x.beginPath(); x.arc(100, -180, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff'; x.font = `800 28px ${INTER}`; x.fillText(count, 100, -178)
  x.restore()
}

const S = 'gemini'
const CAMEOS = [
  { sign: S, cap: 'Fell for them twice. | *Same afternoon.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: { x: -160 }, hops: [1.0],
    front(x, t, lt, P) {
      label(x, 790, 700, 'CRUSH #1', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: PINK, rot: -0.05 })
      label(x, 790, 860, 'CRUSH #2 (SAME ONE)', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 28, bg: GOLD, rot: 0.05 })
      hearts(x, t, 790, 1040, P.t0 + 1.1, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'First date lasted | *eleven hours.*', mood: 'sparkle', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const TOP = ['and then—', 'wait, sharks?', 'ok, but space—', 'so my cousin—']
      bubble(x, 780, 680, TOP[Math.min(3, Math.floor(lt * 1.8))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 880, `TIME: ${Math.min(11, 1 + Math.floor(lt * 5))}H`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: GOLD, rot: 0.04 })
      label(x, 790, 1020, 'CAFÉ: CLOSED', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 28, bg: LAV, rot: -0.05 })
    } },
  { sign: S, cap: 'Sent a voice note. | It has *chapters.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -40, y: 40, s: 260 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { voiceNote(x, t, 540, 620, pop01(t, P.t0 + 0.3, 0.3, 2), { dur: '47:13', chapter: lt > 1.2 ? 'CH. 1 OF 6' : 'CH. 1' }) } },
  { sign: S, cap: 'New match. | Told *the group chat* first.', mood: 'wide', star: { x: -160 }, hops: [0.6],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), 'BESTIES', lt > 1.0 ? '48' : '1')
      label(x, 790, 620, '✦ NEW MATCH', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: GOLD, rot: -0.05 })
    } },
  { sign: S, cap: 'Love language: | *fun facts.*', mood: 'sparkle', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'octopuses have | three hearts!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 790, 920, 'I have one. | it’s yours.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Two moods. | Both *obsessed with you.*', mood: 'heart', star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, S, 790, 900, 260 * k, { mood: 'heart', seed: 13, glyph: false, hops: [P.t0 + 1.0] })
      hearts(x, t, 540, 820, P.t0 + 1.0, { n: 8, life: 2.0, spread: 500, cell: 8, seed: 6 })
    } },
  { sign: S, cap: 'One date. | *Five locations.*', mood: 'sparkle', star: { x: -160 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const PTS = [[690, 1040], [870, 980], [720, 860], [880, 760], [760, 650]]
      PTS.forEach(([px, py], i) => drawBits(x, PIN, { R: '#ff6b5a', W: '#fff' }, px, py, 14 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2)))
      label(x, 790, 1120, 'NEXT: MINI GOLF', pop01(t, P.t0 + 1.8, 0.3, 2), { size: 28, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Said “I love you” | in *four languages.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      const W = ['te quiero!', 'je t’aime!', 'ti amo!', 'I love you!']
      W.forEach((w, i) => bubble(x, i % 2 ? 860 : 720, 640 + i * 130, w, pop01(t, P.t0 + 0.3 + i * 0.3, 0.25, 2.2), { size: 32, col: i === 3 ? PINK : BONE, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: S, cap: 'You had a bad day. | *Forty memes.*', mood: 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), 'GEMINI', String(Math.min(40, 1 + Math.floor(lt * 22))))
      label(x, 790, 1100, 'FEELING: BETTER', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 28, bg: PINK, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3t095', key: 'G', accent: YEL, solo: S, ending: 'callback',
  title: 'Geminis in love | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chaotic. Curious. | *All in.*', mood: 'heart' },
  last: {
    text: 'The voice note? | Chapter *two* is out.',
    draw(x, t, lt) {
      x.save(); x.translate(540, 1060); x.scale(1.5, 1.5); voiceNote(x, t, 0, 0, pop01(t, t - lt + 0.5, 0.35, 2), { dur: '58:40', chapter: 'CH. 2 OF 6', w: 520 }); x.restore()
      hearts(x, t, 540, 1200, t - lt + 1.2, { n: 6, life: 1.8, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
