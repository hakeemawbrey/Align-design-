// r2t0218: star_talk, ROLL CALL, "The signs | with 100 unread." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself facing a phone with 100 unread messages.
//   0.0–3.6    "The signs | *with 100 unread.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ replied to all 100 in a minute · ♉ read one about pizza, left 99 · ♊ cleared them, started 100 more
//              · ♋ saved every one, printed a scrapbook · ♌ only opens the compliments · ♍ colour-coded before reading
//              · ♎ replied "haha" to all 100 · ♏ read them all, receipts off · ♐ left the phone on a beach
//              · ♑ inbox zero since birth · ♒ unread 100, vibes immaculate · ♓ mom said "proud of you", sobbed
//  49.2        "Read at 2 a.m. | *Reply in May.*"  Group photo.
//  52.6        callback: "Sag found the phone. | Unread: *400.*"  The beach phone comes back, sandy.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, sun, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, PHONEC, SUN } from './props.js'

const SAND = '#f3d08a'

/** a phone with a big red unread badge and a number on screen */
function inbox(x, cx, cy, k, n, { rot = 0.05, head = 'MESSAGES', headCol = LAV, s = 1, screen } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  const w = 240, h = 380
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 6, -h / 2 + 10, w + 8, h + 8)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
  x.fillStyle = PHONEC; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = DEEP; x.fillRect(-w / 2 + 12, -h / 2 + 24, w - 24, h - 48)
  x.fillStyle = headCol; x.fillRect(-w / 2 + 24, -h / 2 + 38, w - 48, 46)
  txt(x, head, 0, -h / 2 + 62, { size: 22, font: MONO, weight: 700 })
  if (screen) screen()
  else { txt(x, String(n), 0, 20, { size: 84, color: BONE }); txt(x, 'unread', 0, 86, { size: 26, color: GREY, font: MONO, weight: 700 }) }
  if (n > 0) { x.fillStyle = INK; x.beginPath(); x.arc(w / 2, -h / 2, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(w / 2, -h / 2, 44, 0, Math.PI * 2); x.fill(); txt(x, n > 999 ? '999+' : String(n), w / 2, -h / 2 + 2, { size: n > 99 ? 28 : 34, color: CREAM }) }
  x.restore()
}
const FOLDER = ['FFFF......', 'FFFFFFFFFF', 'FFFFFFFFFF', 'FFFFFFFFFF', 'FFFFFFFFFF', 'FFFFFFFFFF']
const TROPHY = ['YYYYYYYYY', 'Y.YYYYY.Y', 'Y.YYYYY.Y', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '.BBBBBBB.']
const SHADE = ['KKKKKKKKKKKKK', 'KBBBBKKKBBBBK', 'KBWBBK.KBWBBK', '.KBBK...KBBK.']
const UMB = ['....RRWW....', '..RRRRWWWW..', '.RRRRRWWWWW.', 'RRRRRRWWWWWW', '.....K......', '.....K......', '.....K......', '.....K......', '.....K......']

const CAMEOS = [
  { sign: 'aries', cap: 'Replied to all 100. | *In one minute.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.8, 1.1],
    front(x, t, lt, P) {
      const n = Math.max(0, Math.round(100 * (1 - prog(lt, 0.4, 1.4))))
      inbox(x, 790 + (n > 0 ? Math.sin(t * 50) * 4 : 0), 860, pop01(t, P.t0 + 0.2, 0.35, 2), n)
      label(x, 790, 1130, 'TIME: 0:59', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.45, 7, 200, 0.2)
    } },
  { sign: 'taurus', cap: 'Read one about pizza. | *Left 99.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const opened = lt > 0.9
      inbox(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), opened ? 99 : 100, { head: opened ? 'PIZZA?' : 'MESSAGES', headCol: opened ? ORANGE : LAV,
        screen: opened ? () => { txt(x, 'pizza', 0, -10, { size: 50, color: SUN }); txt(x, 'tonight?', 0, 50, { size: 40, color: BONE }) } : null })
      bubble(x, 390, 600, 'YES.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 50, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Cleared them all. | Started *100 more.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const n = lt < 1.0 ? Math.round(100 * (1 - prog(lt, 0.3, 0.9))) : Math.round(100 * prog(lt, 1.1, 1.9))
      inbox(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), n, { head: 'MATCHES', headCol: MINT, screen: () => { txt(x, lt < 1.0 ? 'clearing…' : 'hey!! hey!!', 0, 20, { size: 34, color: BONE }) } })
      label(x, 790, 1130, lt < 1.0 ? 'SENDING…' : 'NEW CHATS: 100', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Saved every one. | *Printed a scrapbook.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, 360, 300, k, { bg: '#c97bff', rot: -0.04 }, () => {
        x.fillStyle = CREAM; x.fillRect(-160, -130, 150, 260); x.fillRect(10, -130, 150, 260)
        const P2 = [['gm ♡', PINK], ['lol', MINT], ['ok', SKYB], ['miss u', GOLD]]
        P2.forEach(([s, c], i) => { x.fillStyle = c; x.fillRect(i % 2 ? 30 : -145, -110 + Math.floor(i / 2) * 110 + (i % 2) * 30, 110, 60); txt(x, s, (i % 2 ? 30 : -145) + 55, -80 + Math.floor(i / 2) * 110 + (i % 2) * 30, { size: 26 }) })
      })
      label(x, 790, 1100, 'VOLUME 7', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 4, life: 1.6, spread: 220, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Only opens | the *compliments.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      inbox(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 97, { head: 'FILTER: PRAISE', headCol: ORANGE, screen: () => {
        ;['you’re so cool', 'iconic.', 'your hair!!'].forEach((s, i) => { const kk = pop01(t, P.t0 + 0.6 + i * 0.3, 0.25, 2.2); if (kk > 0.01) { x.fillStyle = [GOLD, PINK, MINT][i]; x.fillRect(-96, -70 + i * 64, 192 * kk, 48); if (kk > 0.8) txt(x, s, 0, -45 + i * 64, { size: 24 }) } })
      } })
      bubble(x, 390, 600, 'only facts', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Colour-coded the inbox. | *Before reading it.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const F = [['WORK', SKYB], ['MOM', PINK], ['MATCHES', MINT], ['???', GOLD]]
      F.forEach(([s, c], i) => {
        const kk = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2)
        drawBits(x, FOLDER, { F: c }, 790, 660 + i * 130, 17 * kk)
        if (kk > 0.5) txt(x, s, 790, 670 + i * 130, { size: 28, font: MONO, weight: 700 })
      })
      label(x, 600, 1180, 'READ: 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Replied “haha” | to *all 100.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) bubble(x, 700 + (i % 2) * 170, 640 + i * 90, 'haha', pop01(t, P.t0 + 0.3 + i * 0.12, 0.2, 2.2), { size: 36, col: [PINK, MINT, SKYB][i % 3], tail: i % 2 ? 'br' : 'bl' })
      label(x, 790, 1180, 'HAHA × 100', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Read every one. | Shows *zero read.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      inbox(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 100, { head: 'SEEN: NO', headCol: '#c97bff' })
      label(x, 790, 1130, 'READ RECEIPTS: OFF', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Left the phone | *on a beach.*', mood: 'sparkle', look: [-1, 0], star: { x: -180, y: -20 }, hops: [0.6, 1.4],
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.1, 0.3, 2); x.fillStyle = SAND; x.fillRect(120, 1080, 840, 150); x.restore()
      sun(x, t, 820, 640, 50, pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, UMB, { R: '#ff6b5a', W: CREAM, K: BROWN }, 760, 950, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
    },
    front(x, t, lt, P) {
      inbox(x, 860, 1110, pop01(t, P.t0 + 0.4, 0.3, 2), 100, { rot: -0.5, s: 0.45 })
      bubble(x, 380, 600, 'what phone?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Inbox zero. | *Since birth.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      inbox(x, 760, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 0, { headCol: MINT, screen: () => { txt(x, '0', 0, 20, { size: 110, color: MINT }); txt(x, 'unread', 0, 96, { size: 26, color: GREY, font: MONO, weight: 700 }) } })
      drawBits(x, TROPHY, { Y: GOLD, B: BROWN }, 900, 1080, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      sparkles(x, t, 900, 1060, P.t0 + 1.3, 6, 120, 0.3)
    } },
  { sign: 'aquarius', cap: 'Unread: 100. | Vibes: *immaculate.*', mood: lt => lt > 0.8 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, SHADE, { K: INK, B: '#2a2350', W: SKYB }, F.x, F.cy - 10, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { outline: null })
      inbox(x, 820, 950, pop01(t, P.t0 + 0.2, 0.35, 2), 100, { rot: 0.2, s: 0.7 })
      notes(x, t, 600, 760, { n: 4, cell: 7, col: MINT, seed: 3 })
      label(x, 790, 650, 'DO NOT DISTURB', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Mom said “proud of you.” | *Sobbed.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      inbox(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 99, { head: 'MOM', headCol: PINK, screen: () => {
        const kk = pop01(t, P.t0 + 0.6, 0.3, 2.2); if (kk > 0.01) { x.fillStyle = PINK; x.fillRect(-96, -30, 192 * kk, 100); if (kk > 0.8) { txt(x, 'proud of', 0, -2, { size: 30 }); txt(x, 'you ♡', 0, 38, { size: 30 }) } }
      } })
      hearts(x, t, 790, 900, P.t0 + 1.2, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0218', key: 'G', accent: '#ff6b5a', ending: 'callback',
  title: 'The signs | *with 100 unread.*',
  cameos: CAMEOS,
  group: { cap: 'Read at 2 a.m. | *Reply in May.*' },
  last: {
    text: 'Sag found the phone. | Unread: *400.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const n = Math.round(lerp(100, 400, ease.outCubic(prog(lt, 0.8, 1.8))))
      const k = pop01(t, t0 + 0.3, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 330, 1080, 240 * k, { mood: lt > 1.6 ? 'wide' : 'sparkle', look: [1, 0], seed: 61, hops: [t0 + 0.9] })
      inbox(x, 700, 1060, pop01(t, t0 + 0.5, 0.4, 2), n, { rot: 0.06, s: 1.1 })
      sparkles(x, t, 700, 1060, t0 + 1.8, 8, 260, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
