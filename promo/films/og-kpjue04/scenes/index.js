// og-kpjue04: social rework of kpjue04 (Jupiter → Cancer, "Jupiter Can't Fit Through Cancer's Door"). Static HOOK
// (outline) 0–3.0 replaces the slam title; no series bug; no shakes / whip; Cancer and the party cast moved into the
// safe zone; crazier lines; ends on the last line (hard cut).
//   0.0  frame 0: Jupiter's huge face jammed in Cancer's doorway, the frame rattling, Cancer peeking out from under a
//        blanket. Hook "CANCER. I'm too big for your door." Shake + whip.
//   3.0  saying no to every invite since getting hurt.   7.2  "luck needs an open door".   11.6  one small yes.
//  15.8  the text back.   18.2  "home will still be here".   20.8  the get-together: Pisces hugs Cancer, crying.
//  24.0  "Porch light on. Back by ten." hard cut.
import { drawSpace, drawSign } from '../../planetkit.js'
import { jupFilm, drawJupiter, pisces, phone, sticker, pr, easeOut, easeInOut, back, rr, INK, BONE, GOLD } from '../jupkit.js'

export const DURATION = 28
export const HOOK = 'Jupiter is too big | for Cancer’s *door.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0
const PARTY = 20.8
const DOOR = { x: 300, y: 250, w: 480, h: 860 }

const B = [
  { t0: 3.0, t1: 7.0, x: 540, y: 1210, who: 'cancer', text: 'Since getting hurt I’ve said *no* to every invite. I live in this *blanket* now.', tail: 0, maxW: 720 },
  { t0: 7.4, t1: 11.4, x: 540, y: 1210, who: 'jupiter', text: 'Kiddo, I’m luck. Luck can’t get in if the door is *this small.* Ow.', tail: 0, tailUp: true, maxW: 720 },
  { t0: 11.6, t1: 15.6, x: 540, y: 1210, who: 'jupiter', text: 'Not a big leap. Text one friend back. Say yes to *one* thing.', tail: 0, tailUp: true, maxW: 740 },
  { t0: 18.2, t1: 20.6, x: 540, y: 1210, who: 'jupiter', text: 'And the blanket will still be *here.* I’ll guard it.', tail: 0, tailUp: true },
  { t0: 21.2, t1: 23.8, x: 580, y: 1000, who: 'pisces', text: 'you *CAME.* I’m crying on your *shell.*', tail: 40 },
  { t0: 24.0, t1: 29, x: 540, y: 1060, who: 'cancer', text: 'Porch light on. *Back by ten.*', tail: -80 },
]
const NOS = ['movie night? — no', 'birthday? — sent a card', 'walk sunday? — blanket', 'dinner? — I have soup']

function room(x, t, open) {
  // wall + floor
  x.fillStyle = '#2b1a46'; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = '#20133a'; x.fillRect(0, 1420, 1080, 500)
  x.strokeStyle = 'rgba(242,199,92,0.25)'; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 1420); x.lineTo(1080, 1420); x.stroke()
  // door opening shows the night outside
  const { x: dx, y: dy, w, h } = DOOR
  x.save(); rr(x, dx, dy, w, h, 20); x.clip(); drawSpace(x, t, { planet: 'jupiter', seed: 9 }); x.restore()
  // door leaf (swings open by `open`)
  x.save(); x.fillStyle = '#6b3f2a'; x.strokeStyle = INK; x.lineWidth = 8
  const lw = w * (1 - open * 0.82); rr(x, dx + w - lw, dy, lw, h, 10); x.fill(); x.stroke()
  x.fillStyle = GOLD; x.beginPath(); x.arc(dx + w - lw + 36, dy + h / 2, 14, 0, Math.PI * 2); x.fill(); x.restore()
  // frame
  x.strokeStyle = '#9b6b4a'; x.lineWidth = 26; rr(x, dx - 13, dy - 13, w + 26, h + 26, 24); x.stroke()
}

function draw(x, t, H) {
  if (t < PARTY) {
    const jam = t < 7.0
    room(x, t, 1)
    // Jupiter in the doorway: jammed (big, squashed, clipped) then pops back to a size that fits
    const pop = back(pr(t, 7.0, 7.5), 2.4)
    const size = jam ? 900 : 900 - 340 * pop
    const rat = jam ? Math.sin(t * 40) * 3 : 0          // social: a gentle wedge-wobble, no rattle
    x.save(); rr(x, DOOR.x, DOOR.y, DOOR.w, DOOR.h, 20); x.clip()
    drawJupiter(x, 540 + rat, 690, size, t, { squash: jam ? 0.08 : 0, mood: jam ? (t < 3 ? 'wide' : 'sad') : 'happy', lines: H.lines, look: [0, 1], hops: [11.7, 18.3], blink: jam && t < 2.8 ? 0 : undefined })
    x.restore()
    if (jam && t < 3) for (let i = 0; i < 10; i++) { const a = i * 0.63; x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillRect(300 + (i * 97) % 480, 260 + ((t * 600 + i * 140) % 860), 8, 8) }
    // Cancer under the blanket (until the text back), then out
    const out = easeInOut(pr(t, 17.0, 17.6))
    drawSign(x, 'cancer', 540, 1500, 290, t, { mood: t < 3 ? 'wide' : t < 15.8 ? 'squint' : 'happy', lines: H.lines, look: [0, -1], hops: [17.6] })
    if (out < 1) {
      x.save(); x.globalAlpha = 1 - out; x.fillStyle = '#7fa7d9'; x.strokeStyle = INK; x.lineWidth = 8
      x.beginPath(); x.moveTo(330, 1700); x.quadraticCurveTo(360, 1540 - 30 * Math.sin(t * 2), 540, 1565); x.quadraticCurveTo(720, 1540 + 30 * Math.sin(t * 2), 750, 1700); x.closePath(); x.fill(); x.stroke()
      x.fillStyle = '#5f86bd'; for (let k = 0; k < 4; k++) { x.fillRect(380 + k * 100, 1600, 40, 100) }
      x.restore()
    }
    // the pile of "no"s
    if (t > 3.3 && t < 7.1) NOS.forEach((n, i) => sticker(x, n, 540 + (i % 2 ? 230 : -230), 1340 + (i > 1 ? 80 : 0), { size: 28, rot: (i - 1.5) * 0.08, bg: BONE, scale: easeOut(pr(t, 3.5 + i * 0.6, 3.8 + i * 0.6)) * (1 - pr(t, 6.8, 7.1)), alpha: 1 }))
    // the text back
    const pk = easeOut(pr(t, 15.8, 16.2)) * (1 - pr(t, 17.9, 18.2))
    if (pk > 0) phone(x, 540, 1250, 520, 420, { title: 'Leo', scale: pk, t, msgs: [{ text: 'is the offer still open?', me: true, at: 16.0 }, { text: 'YES!! come!!', at: 16.9 }] })
    if (t > 18.2) sticker(x, 'PORCH LIGHT: ON', 800, 540, { size: 30, bg: GOLD, rot: 0.06, scale: easeOut(pr(t, 18.4, 18.7)) })
  } else {
    // the get-together
    const k = easeOut(pr(t, PARTY, PARTY + 0.4))
    x.fillStyle = '#3b1f45'; x.fillRect(0, 0, 1080, 1920)
    for (let i = 0; i < 9; i++) { x.fillStyle = ['#f2c75c', '#ff8fb1', '#7fe0ff'][i % 3]; x.globalAlpha = 0.7; x.beginPath(); x.arc(80 + i * 115, 160 + Math.sin(i + t * 2) * 12, 14, 0, Math.PI * 2); x.fill() }
    x.globalAlpha = 1; x.strokeStyle = 'rgba(242,199,92,0.6)'; x.lineWidth = 3; x.beginPath(); x.moveTo(40, 150); for (let i = 0; i < 10; i++) x.lineTo(80 + i * 115, 160 + (i % 2) * 12); x.stroke()
    x.fillStyle = '#2a1636'; x.fillRect(0, 1420, 1080, 500)
    // window with Jupiter peeking in
    x.save(); rr(x, 600, 480, 340, 380, 18); x.clip(); drawSpace(x, t, { planet: 'jupiter', seed: 2 }); drawJupiter(x, 770, 740, 380, t, { mood: 'happy', tears: 1, look: [-1, 1], lines: H.lines }); x.restore()
    x.strokeStyle = '#9b6b4a'; x.lineWidth = 16; rr(x, 600, 480, 340, 380, 18); x.stroke()
    drawSign(x, 'leo', 170, 1380, 200, t, { mood: 'happy', look: [1, 0], hops: [21.3] })
    drawSign(x, 'virgo', 880, 1380, 190, t, { mood: 'happy', look: [-1, 0], hops: [21.6] })
    // the hug
    const hug = easeInOut(pr(t, PARTY + 0.1, PARTY + 0.6))
    drawSign(x, 'cancer', 300 + 120 * hug, 1360, 280, t, { mood: 'happy', lines: H.lines, look: [1, 0], hops: [24.1], shadow: true })
    pisces(x, 780 - 120 * hug, 1360, 280, t, { look: [-1, 0], hops: [21.3, 22.0, 22.7], shadow: true })
    x.globalAlpha = k
  }
  x.globalAlpha = 1
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B,
  overlays: [],                                  // social: no shakes / whip zoom under the static hook
  cues: [['tom', 0.3, 90], ['tom', 0.6, 80], ...[0, 1, 2, 3].map(i => ['pop', +(3.5 + i * 0.6).toFixed(2), 520, 0.05, 0]), ['whoosh', 7.0, 0.4, 0.14], ['pop', 16.0, 1200, 0.05, 0], ['bell', 16.9, 1568, 0.06, 1, 0], ['bell', 18.4, 880, 0.06, 1.6, 0], ['whoosh', PARTY, 0.5, 0.14], ['glitter', 21.2, 22.6]],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
