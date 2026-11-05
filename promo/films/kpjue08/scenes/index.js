// kpjue08 · PLANET TALK: JUPITER → SCORPIO · "Scorpio's Curtain Call" (28 s, star_advice, hard cut).
//   0.0  frame 0: Jupiter's giant striped eye filling Scorpio's window, the blackout curtain mid-rip, light flooding
//        in. Hook "SCORPIO. Curtains open. I'm in." Colour-flash whip at 0.4.
//   3.0  third date, still sharing nothing.   7.0  "Just one true thing."   11.2  "what if it's too much?"
//  13.8  "that's the adventure".   17.0  the date: Scorpio shares one true thing; the date shares one back.
//  22.8  Pisces at the next table cries into a napkin.   25.2  "One true thing. Then theirs." hard cut.
import { drawSpace, drawSign } from '../../planetkit.js'
import { whipZoom, whipZoomCues } from '../../hookkit.js'
import { jupFilm, drawJupiter, pisces, sticker, pr, easeOut, easeInOut, rr, INK, BONE, GOLD } from '../../kpjue01/jupkit.js'

export const DURATION = 28
const HOOK = { at: -1, text: 'SCORPIO. Curtains | open. I’m *in.*', top: 1230, size: 104, out: [2.7, 2.95] }
const WHIP = { at: 0.4, from: 1.5, flash: 0.9 }
const WIN = { x: 170, y: 220, w: 740, h: 780 }
const DATE = 17.0

const B = [
  { t0: 3.4, t1: 7.0, x: 540, y: 1210, who: 'scorpio', text: 'Third date. They’ve told me *everything.* I’ve told them… my name.', tail: 0, maxW: 740 },
  { t0: 7.2, t1: 11.0, x: 540, y: 1210, who: 'jupiter', text: 'Kiddo, you don’t owe anyone everything. Just *one true thing.*', tail: 0, tailUp: true, maxW: 740 },
  { t0: 11.2, t1: 13.6, x: 540, y: 1210, who: 'scorpio', text: '…what if it’s *too much?*', tail: 0 },
  { t0: 13.8, t1: 16.8, x: 540, y: 1210, who: 'jupiter', text: 'Then they show you who they are. That’s the *adventure.*', tail: 0, tailUp: true, maxW: 720 },
  { t0: 17.4, t1: 20.0, x: 400, y: 1000, who: 'scorpio', text: 'I get scared of being *too much.*', tail: -80 },
  { t0: 20.2, t1: 22.6, x: 680, y: 1000, who: 'cancer', text: 'Me too. *Honestly.*', tail: 80 },
  { t0: 22.8, t1: 25.0, x: 540, y: 1540, who: 'pisces', text: 'sorry 😭 keep going', tail: 120 },
  { t0: 25.2, t1: 29, x: 400, y: 1000, who: 'scorpio', text: 'One true thing. *Then theirs.*', tail: -80 },
]

function bedroom(x, t) {
  x.fillStyle = '#140a26'; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = '#0e0720'; x.fillRect(0, 1450, 1080, 470)
}

function draw(x, t, H) {
  if (t < DATE) {
    bedroom(x, t)
    // the window: outside is space with Jupiter (way too close at frame 0, backs off by ~3.4)
    const back = easeInOut(pr(t, 2.7, 3.5))
    const size = 2600 - 1960 * back, jx = 540 + 440 * (1 - back), jy = 610 + 260 * (1 - back)
    x.save(); rr(x, WIN.x, WIN.y, WIN.w, WIN.h, 16); x.clip()
    drawSpace(x, t, { planet: 'jupiter', seed: 19 })
    drawJupiter(x, jx, jy, size, t, { mood: t < 3 ? 'wide' : t > 11 && t < 13.8 ? 'love' : 'happy', lines: H.lines, look: [0, 1], bob: back > 0.5 ? undefined : 0, blink: t < 2.8 ? 0 : undefined, hops: [7.3, 13.9] })
    x.restore()
    x.strokeStyle = '#3a2b6b'; x.lineWidth = 24; rr(x, WIN.x - 12, WIN.y - 12, WIN.w + 24, WIN.h + 24, 18); x.stroke()
    x.fillStyle = '#3a2b6b'; x.fillRect(WIN.x + WIN.w / 2 - 6, WIN.y, 12, WIN.h); x.fillRect(WIN.x, WIN.y + WIN.h / 2 - 6, WIN.w, 12)
    // light flooding into the room
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, WIN.y + WIN.h, 0, 1920); g.addColorStop(0, 'rgba(255,214,150,0.35)'); g.addColorStop(1, 'rgba(255,214,150,0)')
    x.fillStyle = g; x.beginPath(); x.moveTo(WIN.x, WIN.y + WIN.h); x.lineTo(WIN.x + WIN.w, WIN.y + WIN.h); x.lineTo(1080, 1920); x.lineTo(0, 1920); x.closePath(); x.fill(); x.restore()
    // the blackout curtain mid-rip: two halves flung to the sides
    const rip = easeOut(pr(t, -0.8, 0.6))
    for (const s of [-1, 1]) {
      x.save(); x.translate(540 + s * (80 + 330 * rip), 120); x.rotate(s * 0.25 * (1 - rip) + s * 0.04 * Math.sin(t * 3))
      x.fillStyle = '#05030d'; x.strokeStyle = '#2a1d4a'; x.lineWidth = 6
      x.beginPath(); x.moveTo(-200, 0); x.lineTo(200, 0); x.lineTo(160 + s * 40, 980); for (let k = 0; k < 6; k++) x.lineTo(160 - k * 64 + (k % 2) * 30 * s, 980 + (k % 2 ? 40 : 0)); x.lineTo(-200, 980); x.closePath(); x.fill(); x.stroke()
      x.restore()
    }
    x.fillStyle = '#6b4a2a'; x.fillRect(80, 100, 920, 22)
    drawSign(x, 'scorpio', 540, 1580, 300, t, { mood: t < 3 ? 'wide' : t < 7.2 ? 'squint' : t < 11.2 ? 'neutral' : t < 13.8 ? 'wide' : 'happy', lines: H.lines, look: [0, -1], hops: [14.6], shadow: true })
  } else {
    // the date: a candle-lit table
    x.fillStyle = '#2a1430'; x.fillRect(0, 0, 1080, 1920)
    x.save(); rr(x, 700, 160, 320, 360, 16); x.clip(); drawSpace(x, t, { planet: 'jupiter', seed: 4 }); drawJupiter(x, 860, 380, 330, t, { mood: 'happy', look: [-1, 1], tears: t > 22.8 ? 1 : 0 }); x.restore()
    x.strokeStyle = '#6b4a2a'; x.lineWidth = 14; rr(x, 700, 160, 320, 360, 16); x.stroke()
    x.fillStyle = '#4a2a3a'; x.fillRect(0, 1360, 1080, 560)
    x.fillStyle = '#8a3a4a'; rr(x, 140, 1300, 800, 60, 20); x.fill(); x.strokeStyle = INK; x.lineWidth = 8; x.stroke()
    // candle
    x.fillStyle = BONE; x.fillRect(528, 1200, 24, 100); const fl = 1 + 0.15 * Math.sin(t * 17)
    x.fillStyle = '#ffcf6a'; x.beginPath(); x.ellipse(540, 1180, 14 * fl, 30 * fl, 0, 0, Math.PI * 2); x.fill()
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 1180, 0, 540, 1180, 380); g.addColorStop(0, 'rgba(255,200,120,0.35)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(0, 800, 1080, 800); x.restore()
    drawSign(x, 'scorpio', 300, 1210, 270, t, { mood: t < 20.2 ? 'squint' : 'happy', lines: H.lines, look: [1, 0], hops: [20.6, 25.4] })
    drawSign(x, 'cancer', 780, 1210, 270, t, { mood: t < 20.2 ? 'neutral' : 'happy', lines: H.lines, look: [-1, 0], hops: [20.3] })
    // Pisces at the next table with a napkin
    const pk = easeOut(pr(t, 22.6, 23.0))
    if (pk > 0) {
      pisces(x, 240, 1700, 240, t, { pop: pk, hops: [23.2, 23.9, 24.6], look: [1, -1] })
      x.save(); x.translate(330, 1700); x.rotate(-0.3); x.fillStyle = BONE; x.strokeStyle = INK; x.lineWidth = 5; x.fillRect(-40, -40, 80, 80); x.strokeRect(-40, -40, 80, 80); x.restore()
    }
    if (t > 17.6 && t < 22.6) sticker(x, 'ONE TRUE THING', 540, 880, { size: 36, rot: -0.05, scale: easeOut(pr(t, 17.6, 17.9)) })
  }
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B, hook: HOOK,
  overlays: [[whipZoom(WHIP), whipZoomCues(WHIP)]],
  cues: [['whoosh', 0, 0.5, 0.2], ['crash', 0.05, { gain: 0.05, len: 1.6 }], ['whoosh', 2.8, 0.6, 0.12], ['whoosh', DATE, 0.5, 0.12], ['bell', 17.6, 880, 0.05, 1.4, 0], ['bell', 20.4, 1174.7, 0.05, 1.4, 0], ['glitter', 22.8, 24]],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
