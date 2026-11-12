// r2t0604: star_talk, SOLO (sagittarius), "Sag group chats | *be like.*" (signs3kit social cut, music: lofi · D).
// Nine group-chat situations, each the most extreme Sagittarius version: an eleven-minute voice note · suggested a trip,
// tickets already bought · replies to a message from three weeks ago · asked for outfit help, got pure honesty · forty
// memes in one minute · renames the chat weekly · posts everyone's birth charts unprompted · muted the chat, still
// replies first · typed for ten minutes, sent "lol".
// Ending: callback. "Voice note? | *Part two.*" (the voice note comes back, longer).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#b48cff', ST = { x: -180 }, SG = 'sagittarius'

// a voice-note chip: play triangle, a waveform and a time
function voice(x, t, cx, cy, k, time, { col = MINT, w = 360 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -44, w, 100)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -56, w + 12, 112)
  x.fillStyle = col; x.fillRect(-w / 2, -50, w, 100)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 + 26, -22); x.lineTo(-w / 2 + 26, 22); x.lineTo(-w / 2 + 60, 0); x.closePath(); x.fill()
  for (let i = 0; i < 16; i++) { const h = 10 + Math.abs(Math.sin(i * 1.7 + t * 5)) * 46; x.fillRect(-w / 2 + 80 + i * 12, -h / 2, 7, h) }
  x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(time, w / 2 - 14, 0)
  x.restore()
}

const CAMEOS = [
  { sign: SG, cap: 'Sends a voice note. | *Eleven minutes* long.', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const s = Math.floor(clamp((lt - 0.3) / 1.4) * 664)
      voice(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, { w: 400 })
      L(x, 800, 1020, 'PART 1 OF ?', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: SG, cap: 'Suggests a trip. | Tickets *already bought.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'road trip??', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      for (let i = 0; i < 4; i++) bits(x, 'STUB', 740 + i * 40, 860 + i * 40, 14 * pop01(t, P.t0 + 0.8 + i * 0.15, 0.3, 2.2), { rot: -0.2 + i * 0.12 })
      L(x, 800, 1110, 'WE LEAVE IN 1 HR', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, 0.04, 32)
    } },
  { sign: SG, cap: 'Replies to a message | from *three weeks ago.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GROUP CHAT', headCol: ACC, size: 22, lines: [['tacos tonight?', BONE, 1, false], ['(21 days ago)', STEEL, 1, false], ['YES!!', MINT, pop01(t, P.t0 + 1.0, 0.2, 2.2), true]] })
      L(x, 800, 1110, 'FASHIONABLY LATE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Asked for outfit help? | Got *pure honesty.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'this or this?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      bubble(x, 800, 860, 'neither. love u tho', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: ACC, tail: 'bl' })
      L(x, 800, 1060, 'NO FILTER. ALL HEART.', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: SG, cap: 'Sends forty memes | in *one minute.*', mood: 'wink', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.6) * 40)
      for (let i = 0; i < Math.min(9, Math.floor(n / 4) + 1); i++) { const c = i % 3, r = Math.floor(i / 3); x.fillStyle = INK; x.fillRect(680 + c * 84, 680 + r * 84, 76, 76); x.fillStyle = [PINK, SKYB, MINT, GOLD, LAV][i % 5]; x.fillRect(686 + c * 84, 686 + r * 84, 64, 64) }
      L(x, 800, 1010, `MEMES: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, -0.04, 36)
      L(x, 780, 1100, 'THIS IS AFFECTION', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: SG, cap: 'Renames the group chat. | *Every week.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      const N = ['THE BESTIES', 'GOBLIN CLUB', 'SNACK GANG', 'SIDEQUEST HQ']
      const i = Math.min(3, Math.floor(clamp((lt - 0.2) / 1.6) * 4))
      L(x, 800, 800, N[i], 1, [LAV, MINT, GOLD, PINK][i], -0.04 + i * 0.03, 44)
      L(x, 800, 1010, `NAME #${48 + i}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), BONE, 0.04, 32)
    } },
  { sign: SG, cap: 'Posts everyone’s birth chart. | *Unprompted.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) sheet(x, 720 + i * 80, 740 + i * 90, pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2), { w: 220, h: 170, rot: -0.08 + i * 0.08, head: ['YOUR CHART', 'HIS CHART', 'HER CHART'][i], headBg: [ACC, SKYB, PINK][i], headInk: INK, lines: [['explains a lot', INK]], size: 24 })
      L(x, 800, 1110, 'NOBODY ASKED ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Muted the chat. | Still *replies first.*', mood: 'wink', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      L(x, 800, 700, 'CHAT MUTED ✓', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 38)
      bubble(x, 800, 860, 'omg wait what', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      L(x, 800, 1030, 'REPLY TIME: 0.2 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: SG, cap: 'Typed for ten minutes. | Sent *“lol.”*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const sent = lt > 1.5
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: sent ? 'SENT' : 'TYPING…', headCol: sent ? MINT : ACC, size: 30, lines: sent ? [['lol', MINT, pop01(t, P.t0 + 1.5, 0.2, 2.4), true]] : [], typing: sent ? 0 : 1 })
      L(x, 800, 1110, sent ? 'A MASTERPIECE' : '9:58 TYPING…', 1, sent ? GOLD : LAV, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0604', key: 'D', accent: ACC, solo: SG, ending: 'callback',
  title: 'Sag group chats | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chaotic. Honest. | *Always* online.', mood: 'sparkle' },
  last: {
    text: 'Voice note? | *Part two.*',
    draw(x, t, lt) {
      const s = 664 + Math.floor(clamp((lt - 0.6) / 2.4) * 200)
      voice(x, t, 540, 1150, pop01(lt, 0.5, 0.35, 2), `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, { col: LAV, w: 460 })
      signChar(x, t, SG, 540, 940, 220 * pop01(lt, 0.3, 0.4, 1.8), { mood: 'wink', seed: 9, hops: [t - lt + 1.2] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
