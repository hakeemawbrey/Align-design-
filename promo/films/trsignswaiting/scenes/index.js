// trsignswaiting: THE SIGNS AS… waiting for a text back. (45 s vertical, Star Talk Trends §13.3, music: pop · E)
// Story 0–40.6, then the shared end card. The format look lives in ./signs.js (identical in all five trsigns films).
//   0.0–2.8    "The signs waiting | for a *text back.*"  The twelve line up for roll call, then dive into the pip row.
//   2.8–31.7   the roll call, one stage card per sign:
//              ♈ waited four minutes, ran a 5K · ♉ made a snack, then another · ♊ drafted 14 replies to no message
//              · ♋ re-reads the old texts, for comfort · ♌ posted a selfie, just in case · ♍ checks it really sent
//              · ♎ asks everyone "what does it mean?" · ♏ calm, unbothered, phone face-up · ♐ left the phone home,
//              learned to fly a kite · ♑ inbox zero, still waiting · ♒ theory: the phone is just shy
//              · ♓ it buzzed! battery low.
//  17.3        card cut (cameo 6 → 7).
//  31.7        "Twelve signs. | *One* typing bubble."  The group photo; a giant typing bubble floats over them. FLASH.
//  33.4        LESSON UNLOCKED: "The wait says | *nothing* about you."  +1 PEACE OF MIND
//  37.95       "*Phone down.*"  A phone flips face-down; hearts rise.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, inSprite, pop01, outK,
  GOLD, BONE, PINK, INK, MINT, SKYB, INTER, MONO,
} from './signs.js'

const at = (t0, d) => +(t0 + d).toFixed(3)
/** a pixel phone (portrait), centred on (cx, cy), w × h; fn(x, sx, sy, sw, sh) draws its screen */
function phone(x, cx, cy, w, h, k, { rot = 0, fn = null, body = '#2a2350', screen = '#120c2a' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const C = 8
  x.fillStyle = INK; x.fillRect(-w / 2 - C, -h / 2, w + 2 * C, h); x.fillRect(-w / 2, -h / 2 - C, w, h + 2 * C)
  x.fillStyle = body; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = screen; x.fillRect(-w / 2 + C, -h / 2 + 2 * C, w - 2 * C, h - 4 * C)
  x.fillStyle = INK; x.fillRect(-14, -h / 2 + 4, 28, 6)
  if (fn) { x.save(); x.beginPath(); x.rect(-w / 2 + C, -h / 2 + 2 * C, w - 2 * C, h - 4 * C); x.clip(); fn(x, -w / 2 + C, -h / 2 + 2 * C, w - 2 * C, h - 4 * C); x.restore() }
  x.restore()
}
const screenText = (x, s, cx, cy, size = 22, col = BONE) => { x.fillStyle = col; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy) }
const SANDWICH = ['.TTTTTT.', 'TTTTTTTT', 'GGGGGGGG', 'RRRRRRRR', 'YYYYYYYY', 'TTTTTTTT']
const SAND_C = { T: '#e9b24a', G: '#5fd38a', R: '#ff6b5a', Y: '#ffe27a' }
const KITE = ['....R....', '...RRR...', '..RRYRR..', '.RRYYYRR.', 'RRRRYRRRR', '.BBBYBBB.', '..BBYBB..', '...BBB...', '....B....']
const KITE_C = { R: '#ff4f86', Y: '#ffe27a', B: '#a35cf0' }
const LAPTOP = ['KKKKKKKKKK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KKKKKKKKKK', 'GGGGGGGGGGGG']
const BATT = ['KKKKKKKKK.', 'KR......KK', 'KR......KK', 'KKKKKKKKK.']

const CAMEOS = [
  { sign: 'aries', cap: 'Waited four minutes. | *Ran a 5K.*',
    mood: lt => lt < 0.9 ? 'squint' : 'sparkle', look: lt => lt < 0.9 ? [-1, 1] : [1, 0], hops: [1.0, 1.2, 1.4, 1.6, 1.8, 2.0],
    back(x, t, lt, P) {
      phone(x, 280, 1060, 110, 190, pop01(t, P.t0 + 0.1, 0.3, 2), { rot: -0.08, fn: (x, sx, sy, sw, sh) => screenText(x, '0:04', sx + sw / 2, sy + sh / 2, 28, '#ff6b5a') })
      if (lt > 0.95) for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillRect(320 + ((lt * 900 + i * 90) % 400), 800 + i * 50, 70, 8) }
      label(x, 780, 620, 'brb!!', pop01(t, P.t0 + 0.95, 0.25, 2.2), { size: 30, bg: '#f0603a', color: BONE, rot: 0.07 })
    },
    cues: t0 => [['whoosh', at(t0, 0.95), 0.4, 0.035]] },
  { sign: 'taurus', cap: 'Made a snack. | *Then another.*', mood: 'heart', look: [1, 0], star: { x: -150 },
    back(x, t, lt, P) {
      const n = 1 + Math.min(3, Math.floor(Math.max(0, lt - 0.2) / 0.45))
      for (let i = 0; i < n; i++) drawBits(x, SANDWICH, SAND_C, 770, 1100 - i * 74, 15 * pop01(t, P.t0 + 0.2 + i * 0.45, 0.25, 2.2))
    },
    cues: t0 => [0, 1, 2, 3].map(i => ['pop', at(t0, 0.2 + i * 0.45), [659.25, 783.99, 880, 1046.5][i], 0.035, 0.3]) },
  { sign: 'gemini', beats: 5, cap: 'Drafted 14 replies | to *no message.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => lt > 1.6 ? [0, 0] : [1, 1], star: { x: -180 }, hops: [0.4, 0.8, 1.2],
    back(x, t, lt, P) {
      const D = ['hey!', 'heyy', 'hi :)', 'hello!!', 'so anyway', 'ok wait', 'haha yes', 'hiii', 'what’s up', 'hey you', 'yo', 'hm', 'HEY', 'hi again']
      D.forEach((s, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.09, 0.2, 2.2)
        if (k <= 0.01) return
        bubble(x, 640 + ((i * 53) % 150) - 40, 560 + i * 40, s, k, { size: 26, col: i === 13 ? '#ffe27a' : '#c9c4d8', tail: 'bl' })
      })
      label(x, 330, 1130, 'SENT: 0', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 28, bg: '#f2cf4a', rot: -0.05 })
    },
    cues: t0 => Array.from({ length: 14 }, (_, i) => ['tick', at(t0, 0.3 + i * 0.09), 0.025]).concat([['pop', at(t0, 1.6), 1318.51, 0.04, -0.3]]) },
  { sign: 'cancer', cap: 'Re-reading the old texts. | *For comfort.*', mood: 'sparkle', tears: 1, star: { x: 150 },
    back(x, t, lt, P) {
      phone(x, 320, 880, 260, 440, pop01(t, P.t0 + 0.1, 0.3, 2), {
        fn: (x, sx, sy, sw, sh) => {
          const off = (lt * 90) % 120
          for (let i = 0; i < 6; i++) {
            const L = i % 2 === 0, by = sy + 20 + i * 70 - off + 60, bw = 110 + (i * 37) % 60
            x.fillStyle = L ? '#3b3466' : '#3fb6f0'; x.fillRect(L ? sx + 14 : sx + sw - 14 - bw, by, bw, 44)
          }
        },
      })
      hearts(x, t, 320, 760, P.t0 + 0.5, { n: 5, life: 1.5, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Posted a selfie. | *Just in case.*', mood: lt => lt > 0.8 && lt < 1.0 ? 'wink' : 'sparkle', squash: lt => 0.04 * Math.sin(lt * 7),
    front(x, t, lt, P, F) {
      phone(x, F.x + 230, F.cy - 80, 120, 200, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.25, fn: (x, sx, sy, sw, sh) => { x.fillStyle = '#f39a3a'; x.fillRect(sx + sw / 2 - 26, sy + sh / 2 - 26, 52, 52) } })
      const q = lt - 0.85
      if (q > 0 && q < 0.25) { x.save(); x.globalAlpha = 1 - q / 0.25; x.fillStyle = '#fffbea'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      label(x, 300, 640, 'golden hour (indoors)', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 26, bg: '#f39a3a', rot: -0.05 })
    },
    cues: t0 => [['tick', at(t0, 0.85), 0.07], ['pop', at(t0, 0.86), 1760, 0.035, 0]] },
  { sign: 'virgo', beats: 5, cap: 'Checking it | *really* sent.', mood: 'squint', look: [-1, 0], star: { x: 170 },
    back(x, t, lt, P) {
      const z = 1 + 0.5 * ease.inOutCubic(prog(lt, 0.8, 1.4))
      phone(x, 320, 880, 240 * z, 400 * z, pop01(t, P.t0 + 0.1, 0.3, 2), {
        fn: (x, sx, sy, sw, sh) => {
          x.fillStyle = '#ef5c94'; x.fillRect(sx + sw - 20 - 150 * z, sy + sh * 0.45, 150 * z, 50 * z)
          screenText(x, 'Delivered', sx + sw - 20 - 75 * z, sy + sh * 0.45 + 74 * z, 18 * z, '#c9c4d8')
        },
      })
      const n = Math.min(3, Math.floor(Math.max(0, lt - 1.4) / 0.25))
      if (lt > 1.4) label(x, 320, 640, `checked ×${12 + n * 7}`, 1, { size: 26, bg: '#ef5c94', color: BONE, rot: -0.04 })
    },
    cues: t0 => [['whoosh', at(t0, 0.8), 0.3, 0.025], ['tick', at(t0, 1.4), 0.03], ['tick', at(t0, 1.65), 0.03], ['tick', at(t0, 1.9), 0.03]] },
  { sign: 'libra', cap: 'Asked everyone: | *“what does it mean?”*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: lt => lt > 1.4 ? [0, 0] : [0, -1], star: { y: 60 },
    back(x, t, lt, P) {
      const op = [['good sign!', 300, 610, 0.3], ['bad sign!', 780, 640, 0.6], ['…a sign?', 540, 560, 0.95]]
      op.forEach(([s, bx, by, d], i) => bubble(x, bx, by, s, pop01(t, P.t0 + d, 0.22, 2.2), { size: 32, col: ['#9fe6b0', '#ff9fc0', '#ffe27a'][i], tail: i === 1 ? 'br' : 'bl' }))
    },
    cues: t0 => [0.3, 0.6, 0.95].map((d, i) => ['pop', at(t0, d), [880, 659.25, 1046.5][i], 0.035, (i - 1) * 0.4]) },
  { sign: 'scorpio', cap: 'Calm. Unbothered. | *Phone face-up.*', mood: 'neutral', look: [0, 1], star: { y: -60 },
    front(x, t, lt, P, F) {
      inSprite(x, F, () => { x.fillStyle = '#100a24'; x.fillRect(9.4, 16.6, 8, 5.4); x.fillRect(18.6, 16.6, 8, 5.4); x.fillRect(17.2, 17.4, 1.6, 1.2); x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(10.4, 17.4, 2, 1); x.fillRect(19.6, 17.4, 2, 1) })
      // the phone on the table, face-up; a twitchy eye-line every time it glows
      x.fillStyle = '#5a3a2a'; x.fillRect(300, 1080, 480, 26)
      phone(x, 540, 1050, 160, 70, pop01(t, P.t0 + 0.1, 0.3, 2), { fn: (x, sx, sy, sw, sh) => { const g = Math.sin(lt * 6) > 0.6; x.fillStyle = g ? '#3b3466' : '#120c2a'; x.fillRect(sx, sy, sw, sh) } })
      label(x, 810, 640, 'not checking', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 26, bg: '#e23d66', color: BONE, rot: 0.06 })
      label(x, 820, 720, '(checking)', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 22, bg: BONE, rot: -0.04 })
    },
    cues: t0 => [['pop', at(t0, 0.6), 783.99, 0.035, 0.3], ['pop', at(t0, 1.3), 659.25, 0.03, 0.3]] },
  { sign: 'sagittarius', beats: 5, cap: 'Left the phone home. | *Learned to fly a kite.*', mood: 'sparkle', look: [1, -1], star: { x: -170, y: 60 }, hops: [0.6, 1.4, 2.1],
    back(x, t, lt, P) {
      const kx = 700 + 90 * Math.sin(lt * 1.6), ky = lerp(1000, 640, ease.outCubic(prog(lt, 0.2, 1.2))) + 30 * Math.sin(lt * 2.3)
      x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 3; x.beginPath(); x.moveTo(400, 900); x.quadraticCurveTo(560, 900, kx, ky + 50); x.stroke()
      drawBits(x, KITE, KITE_C, kx, ky, 14, { rot: 0.2 * Math.sin(lt * 3) })
      for (let i = 0; i < 4; i++) drawBits(x, ['RR', 'RR'], { R: ['#ffe27a', '#5fd38a', '#5fb6ff', '#ff4f86'][i] }, kx + 10 + Math.sin(lt * 4 + i) * 12, ky + 80 + i * 32, 7)
      phone(x, 820, 1120, 90, 150, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      label(x, 820, 1020, 'home', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 22, bg: BONE })
    } },
  { sign: 'capricorn', cap: 'Inbox zero. | *Still waiting.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [-1, 1], star: { x: 170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      drawBits(x, LAPTOP, { K: '#2a2350', S: '#120c2a', G: '#6b62a8' }, 330, 990, 26 * k)
      const n = Math.max(0, 47 - Math.floor(lt * 40))
      if (k > 0.5) { x.font = `700 34px ${MONO}`; x.fillStyle = n ? BONE : '#2fc79a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`INBOX: ${n}`, 330, 960) }
      phone(x, 560, 1120, 70, 120, k, { rot: -0.2 })
      if (lt > 1.2) label(x, 560, 1030, '…', 1, { size: 30, bg: BONE })
    },
    cues: t0 => Array.from({ length: 8 }, (_, i) => ['tick', at(t0, 0.15 + i * 0.13), 0.02]).concat([['bell', at(t0, 1.2), 1760, 0.03, 0.8, -0.3]]) },
  { sign: 'aquarius', cap: 'Theory: the phone | *is just shy.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      phone(x, 770, 920, 230, 380, k, {
        rot: 0.05 * Math.sin(lt * 3),
        fn: (x, sx, sy, sw, sh) => {
          const cx = sx + sw / 2, cy = sy + sh / 2, bl = Math.sin(lt * 4) > 0.95
          x.fillStyle = BONE; x.fillRect(cx - 50, cy - 30, 22, bl ? 4 : 30); x.fillRect(cx + 28, cy - 30, 22, bl ? 4 : 30)
          x.fillStyle = '#ff6fa0'; x.fillRect(cx - 74, cy + 16, 30, 12); x.fillRect(cx + 44, cy + 16, 30, 12)
        },
      })
      label(x, 770, 650, 'hi…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 28, bg: '#38c4ec', rot: 0.05 })
    },
    cues: t0 => [['pluck', at(t0, 1.0), 1318.51, 0.03, 0.5, 0.3]] },
  { sign: 'pisces', beats: 5, cap: 'It buzzed! | *Battery low.*', mood: lt => lt < 1.1 ? 'sparkle' : 'wide', tears: lt => lt < 1.1 ? 1 : 3, star: { x: -160 }, hops: [0.5, 0.65],
    back(x, t, lt, P) {
      const bz = lt > 0.45 && lt < 1.0 ? Math.sin(lt * 90) * 8 : 0
      phone(x, 760 + bz, 920, 230, 380, pop01(t, P.t0 + 0.1, 0.3, 2), {
        fn: (x, sx, sy, sw, sh) => {
          if (lt < 1.1) return
          drawBits(x, BATT, { K: BONE, R: '#ff4f5e' }, sx + sw / 2, sy + sh / 2 - 20, 12, { outline: null })
          screenText(x, '1%', sx + sw / 2, sy + sh / 2 + 50, 34, '#ff4f5e')
        },
      })
      if (lt > 0.45 && lt < 1.0) for (const d of [-1, 1]) { x.fillStyle = BONE; x.fillRect(760 + d * 150, 860, 10, 40); x.fillRect(760 + d * 175, 850, 10, 60) }
    },
    cues: t0 => [['tick', at(t0, 0.45), 0.05], ['tick', at(t0, 0.55), 0.05], ['tick', at(t0, 0.65), 0.05], ['pop', at(t0, 1.1), 329.63, 0.05, 0.3], ['pluck', at(t0, 1.2), 246.94, 0.04, 0.6, 0.3]] },
]

const F = makeFilm({
  id: 'trsignswaiting', key: 'E', accent: '#9fe6b0',
  title: 'The signs waiting | for a *text back.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *One* typing bubble.',
    draw(x, t, lt) {
      const k = pop01(t, 31.711 + 0.9, 0.35, 2) * outK(t, [33.3, 33.5])
      if (k <= 0.01) return
      x.save(); x.translate(540, 760); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-150, -60, 300, 120); x.fillRect(-140, -70, 280, 140)
      x.fillStyle = '#3b3466'; x.fillRect(-140, -60, 280, 120)
      for (let i = 0; i < 3; i++) { const on = Math.floor(lt * 6) % 3 === i; x.fillStyle = on ? BONE : '#8a83b8'; x.fillRect(-80 + i * 60 - 16, -16 - (on ? 8 : 0), 32, 32) }
      x.restore()
    },
    cues: t0 => [['pop', at(t0, 0.9), 880, 0.04, 0], ['tick', at(t0, 1.1), 0.02], ['tick', at(t0, 1.27), 0.02], ['tick', at(t0, 1.44), 0.02]],
  },
  lesson: { text: 'The wait says | *nothing* about you.', chip: '+1 PEACE OF MIND' },
  last: {
    text: '*Phone down.*',
    draw(x, t, lt) {
      // a phone flips face-down on the table; the stars exhale
      const f = ease.inOutCubic(prog(lt, 0.3, 0.7))
      x.fillStyle = '#5a3a2a'; x.globalAlpha = clamp(lt * 3); x.fillRect(300, 1580, 480, 22); x.globalAlpha = 1
      x.save(); x.translate(540, 1530); x.scale(1, Math.abs(Math.cos(Math.PI * f)) || 0.02)
      phone(x, 0, 0, 320, 90, pop01(t, 37.95 + 0.1, 0.3, 2), { body: f > 0.5 ? '#6b62a8' : '#2a2350', screen: f > 0.5 ? '#6b62a8' : '#3b3466' })
      x.restore()
      hearts(x, t, 540, 1380, 37.95 + 0.8, { n: 8, life: 1.8, spread: 700, cell: 7, seed: 5 })
    },
    cues: t0 => [['whoosh', at(t0, 0.3), 0.25, 0.03], ['tick', at(t0, 0.7), 0.06], ['tom', at(t0, 0.7), 110, { gain: 0.15, decay: 0.2 }]],
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
