// r2t0625: star_talk, SOLO (leo), "Leos in group chats | *be like.*" (batch topic "Leos in the group chat | be like.", tightened to fit two lines) (signs3kit social cut, music: lofi · F). Ending: lesson.
// One sign the whole way: nine group-chat moments, each the most extreme (and lovable) Leo version.
//   renamed the chat "Leo & Friends" · someone replied "k", Leo took it personally · an eleven-minute voice note
//   · you got a cat, Leo got two · pinned their own message again · your haircut got forty hearts (all Leo)
//   · a poll about Leo · posted their birth chart (sun: Leo, obviously) · the group photo, Leo dead centre
//   group "Main character. | *Every chat.*"  lesson "Loud in the chat. | *Louder for you.*"  STATUS: HYPED
//   last "Mute them? | *Never.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, RED, CREAM, STEEL, NIGHT, WOOD, PLUM, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -190 }
const CAT = ['K...K', 'KK.KK', 'KKKKK', 'KWKWK', 'KKKKK', '.KKK.']

const CAMEOS = [
  { sign: S, cap: 'Renamed the group chat | *“Leo & Friends.”*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt < 1.1 ? 'THE GROUP' : 'LEO & FRIENDS', headCol: lt < 1.1 ? STEEL : ACC, lines: [['leo renamed', BONE, pop01(t, P.t0 + 1.1, 0.25, 2), false], ['the chat', BONE, pop01(t, P.t0 + 1.2, 0.25, 2), false], ['…ok', LAV, pop01(t, P.t0 + 1.8, 0.25, 2), true]] })
    } },
  { sign: S, cap: 'Someone replied “k.” | Leo *took it personally.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'k', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 90, col: BONE, tail: 'br' })
      L(x, 800, 1020, 'LEO: DEVASTATED', pop01(t, P.t0 + 1.0, 0.3, 2.2), RED, -0.05, 38)
    } },
  { sign: S, cap: 'One voice note. | *Eleven minutes.*', mood: 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-180, -60, 360, 120); x.fillStyle = ACC; x.fillRect(-172, -52, 344, 104)
        for (let i = 0; i < 16; i++) { const h = 14 + 34 * Math.abs(Math.sin(i * 1.7 + t * 6)); x.fillStyle = INK; x.fillRect(-120 + i * 17, -h / 2, 9, h) }
        x.fillStyle = INK; x.beginPath(); x.moveTo(-160, -24); x.lineTo(-132, 0); x.lineTo(-160, 24); x.fill()
        x.restore()
      }
      L(x, 800, 1060, `${Math.floor(lt * 4.6) % 12}:0${Math.floor(lt * 3) % 10} / 11:04`, pop01(t, P.t0 + 0.6, 0.3, 2), BONE, 0.04, 34)
    } },
  { sign: S, cap: 'You got a cat. | Leo *got two.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'i got a cat!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      bubble(x, 790, 860, 'I GOT TWO.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 50, col: ACC, tail: 'bl' })
      for (let i = 0; i < 2; i++) drawBits(x, CAT, { K: i ? '#ff9a4a' : '#5a4a6a', W: '#fff' }, 730 + i * 140, 1070, 22 * pop01(t, P.t0 + 1.3 + i * 0.15, 0.3, 2))
    } },
  { sign: S, cap: 'Pinned their own message. | *Again.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'PINNED (9)', headCol: GOLD, lines: [['leo: i’m back', ACC, 1, false], ['leo: did u miss', ACC, pop01(t, P.t0 + 0.7, 0.25, 2), false], ['leo: me', ACC, pop01(t, P.t0 + 1.2, 0.25, 2), false]] })
    } },
  { sign: S, cap: 'You posted a haircut. | Leo sent *forty hearts.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      hearts(x, t, 800, 1100, P.t0 + 0.3, { n: 14, life: 2.4, spread: 340, cell: 8, seed: 2 })
      L(x, 800, 700, `HEARTS: ${Math.floor(clamp((lt - 0.3) / 1.6) * 40)}`, pop01(t, P.t0 + 0.3, 0.3, 2), PINK, -0.04, 44)
      bubble(x, 800, 900, 'ICONIC. STUNNING.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Chat went quiet. | Leo *started a poll.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'POLL', headBg: ACC, headInk: INK, lines: ['is leo iconic?', ['○ yes', '#2f8a48'], ['○ also yes', '#2f8a48']], size: 32, progress: clamp((lt - 0.3) / 1.0) })
    } },
  { sign: S, cap: 'Shared their birth chart. | *In every chat.*', mood: 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 820, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 770, 1080, 'SUN: LEO (OBVIOUSLY)', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Group photo? | Leo, *dead centre.*', mood: 'sparkle', star: { x: 0, y: 20, s: 260 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(220, 620, 640, 520); x.fillStyle = CREAM; x.fillRect(232, 632, 616, 496); x.fillStyle = '#3a2a5a'; x.fillRect(250, 650, 580, 400); x.restore()
      ;['cancer', 'virgo', 'aquarius', 'taurus'].forEach((id, i) => friend(x, t, id, [320, 420, 660, 760][i], 1000, 100, k, { mood: 'happy', seed: 50 + i }))
    },
    front(x, t, lt, P) { L(x, 540, 1090, 'FRIENDS: CROPPED', pop01(t, P.t0 + 1.4, 0.3, 2.2), BONE, -0.04, 30) } },
]

const F = makeFilm({
  id: 'r2t0625', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Leos in group chats | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Main character. | *Every chat.*', mood: 'sparkle' },
  lesson: { text: 'Loud in the chat. | *Louder for you.*', chip: 'STATUS: HYPED' },
  last: { text: 'Mute them? | *Never.*', draw(x, t, lt) { hearts(x, t, 540, 1300, t - lt + 0.4, { n: 10, life: 2.2, spread: 600, cell: 8, seed: 3 }) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
