// kpure10 · Planet Talk: Uranus · "Capricorn, It's a Date Not an Interview" (30 s vertical, hard cut) · cinematic · C · star_advice
//   0      Uranus barging into the café date, Capricorn's clipboard of questions + the papers mid-air; "CAPRICORN. | This is a *date.*"
//   0.45   glitch · 2.7 "Date one. *Interview mode.*" · 5.8 ♑ "Where do you see yourself in *five years?*"
//   8.5    the date, sweating: "…hopefully *finishing this coffee?*"
//   11.0   ♅ "Unexpected for you: be *silly.* For one minute." · the SILLY MINUTE timer
//   14.4   ♑ "What do you call a sad coffee? *Depresso.*" · 17.6 the date snorts, laughs, tells a worse one:
//          "Why don't eggs tell jokes? They'd *crack up.*" · 21.2 the clipboard drops
//   21.6   Pisces crying-laughing at the next table · 24.6 ♅ "Interview *over.*" · 26.6 the date: "Same café *next week?*"
//   28.6   "Hired. | *For a second date.*" · hard cut at 30
import { urFilm, HK, r3 } from '../../kpure01/urkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 30, INT = 2.7, URA = 11.0, JOKE = 14.4, LAUGH = 17.6, DROP = 21.2, PIS = 21.6, LAST = 28.6
const DATE = 'aries', DC = '#ff9a6a'

function cafe(x, t, K) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#3a2230'); g.addColorStop(1, '#5a3438')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let i = 0; i < 12; i++) K.rect(x, i * 96, 0, 4, 1400, 'rgba(0,0,0,0.12)')
  // the window
  K.box(x, 140, 360, 800, 520, '#141030', { o: 10 })
  for (let k = 0; k < 18; k++) { const sx = 160 + ((k * 137) % 760), sy = 380 + ((k * 89) % 480); K.rect(x, sx, sy, 6, 6, `rgba(255,236,190,${0.4 + 0.5 * Math.abs(Math.sin(t * 2 + k))})`) }
  K.rect(x, 535, 360, 10, 520, '#140c28'); K.label(x, 'CAFÉ', 840, 905, { size: 30, bg: '#f2c75c' })
  // the counter + floor
  K.box(x, -20, 1240, 1120, 80, '#8a5a3a', { o: 8 }); x.fillStyle = '#2a1820'; x.fillRect(-20, 1320, 1120, 600)
  // the table
  K.box(x, 200, 1460, 680, 50, '#c99a6a', { o: 8 }); K.rect(x, 510, 1510, 60, 420, '#3a2232')
  for (const cx of [330, 750]) { K.box(x, cx - 40, 1390, 80, 70, '#efe6d6', { o: 4 }); K.rect(x, cx - 30, 1398, 60, 14, '#6a3a2a') }
}
function clipboard(x, X, Y, rot, s = 1) {
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(s, s)
  x.fillStyle = '#140c28'; x.fillRect(-76, -100, 152, 200); x.fillStyle = '#8a5a3a'; x.fillRect(-70, -94, 140, 188)
  x.fillStyle = '#fffaf0'; x.fillRect(-58, -76, 116, 160); x.fillStyle = '#9aa6b8'; x.fillRect(-30, -104, 60, 24)
  x.fillStyle = '#7a6a9a'; for (let i = 0; i < 5; i++) x.fillRect(-46, -56 + i * 28, 92 - (i % 2) * 24, 8)
  x.restore()
}

const F = urFilm({
  id: 'kpure10', sign: 'capricorn', dur: D, ending: 'cut',
  hook: { text: 'CAPRICORN. | This is a *date.*', top: 240, size: 108 },
  entry: { kind: 'slide', at: -0.32, x: 560, y: 900, size: 380 },
  brk: { at: 0.5, len: 0.45 },
  debris: [
    { w: 130, h: 170, color: '#fffaf0', x: 300, y: 1250, vx: -420, vy: -1200, spin: 4, t0: -0.25, front: true },
    { w: 130, h: 170, color: '#fffaf0', x: 360, y: 1250, vx: -120, vy: -1500, spin: -5, t0: -0.25, front: true },
    { w: 130, h: 170, color: '#efe6d6', x: 420, y: 1250, vx: 380, vy: -1350, spin: 3, t0: -0.25, front: true },
    { w: 0, h: 0, x: 330, y: 1250, vx: -250, vy: -1700, spin: 6, t0: -0.25, front: true, draw(x) { clipboard(x, 0, 0, 0, 0.9) } },
  ],
  bg: cafe,
  paint(x, t, K) {
    const U = K.track(t, [[0, { x: 560, y: 900, size: 380 }], [INT + 0.5, { x: 790, y: 720, size: 300 }]])
    K.uranus(x, t, { ...U, mood: t < INT ? 'happy' : t < URA ? 'wide' : t < LAUGH ? 'sly' : 'happy', look: t < INT ? [-0.6, 1] : [-1, 0.8], hops: [LAUGH + 0.3, LAUGH + 0.8] })
    const joking = t >= JOKE && t < LAUGH
    const laughing = t >= LAUGH
    K.sign(x, t, 'capricorn', { x: 300, y: 1340, s: 340, mood: t < INT ? 'wide' : t < URA ? 'squint' : joking ? 'wink' : laughing ? 'happy' : 'wide', look: [1, 0], hops: laughing ? [LAUGH + 0.4, LAUGH + 0.9, DROP + 0.2, DROP + 0.7] : [JOKE + 2.4], shadow: false })
    const dk = ease.outCubic(prog(t, INT - 0.2, INT + 0.3))
    if (dk > 0) K.sign(x, t, DATE, { x: lerp(1300, 780, dk), y: 1340, s: 340, glyph: false, seed: 5, mood: t < 8.5 ? 'neutral' : t < LAUGH ? 'wide' : 'happy', look: [-1, 0], sweat: t > 6.5 && t < URA, hops: [LAUGH, LAUGH + 0.3, LAUGH + 0.6], shadow: false })
    // the clipboard: in Capricorn's hand, then dropped
    if (t >= INT) {
      const dr = prog(t, DROP, DROP + 0.45)
      clipboard(x, 430 + dr * 40, lerp(1270, 1430, ease.inQuad(dr)), lerp(-0.25, 1.4, dr), 0.85)
    }
    const pk = K.pop01(t, PIS, 0.4)
    if (pk > 0) K.pisces(x, t, { x: 160, y: 1720, s: 230, pop: pk, mood: 'happy', hops: [PIS + 0.5, PIS + 1.0, PIS + 1.5, PIS + 2.0] })
  },
  over(x, t, K) {
    // the SILLY MINUTE timer
    const k = K.win(t, 14.2, DROP + 0.4)
    if (k > 0.01) {
      const left = Math.max(0, 60 - Math.floor((t - 14.2) * 1))
      x.save(); x.translate(540, 1020); x.rotate(0.04); x.scale(k, k)
      K.box(x, -230, -60, 460, 120, '#ff8fb1', { o: 6 })
      K.txt(x, `SILLY MINUTE  0:${String(left).padStart(2, '0')}`, 0, 2, { size: 38, font: K.MONO, color: K.INK })
      x.restore()
    }
  },
  lines: [
    { t0: 5.8, t1: 8.3, who: 'capricorn', text: 'Where do you see yourself in *five years?*', x: 400, y: 1680, tailUp: true, tail: -100, maxW: 640 },
    { t0: 8.5, t1: 10.8, who: 'the date', color: DC, text: '…hopefully *finishing this coffee?*', x: 680, y: 1680, tailUp: true, tail: 100 },
    { t0: URA, t1: 14.1, who: 'uranus', text: 'Unexpected for you: be *silly.* For one minute.', x: 540, y: 420, tail: 200, maxW: 780 },
    { t0: JOKE, t1: 17.4, who: 'capricorn', text: 'What do you call a sad coffee? *Depresso.*', x: 420, y: 1680, tailUp: true, tail: -120, maxW: 640 },
    { t0: LAUGH, t1: 21.0, who: 'the date', color: DC, text: 'HA! Why don’t eggs tell jokes? They’d *crack up.*', x: 640, y: 1680, tailUp: true, tail: 140, maxW: 660 },
    { t0: PIS + 0.2, t1: 24.4, who: 'pisces', text: 'I’m *crying…* (laughing)', x: 460, y: 1540, tail: -200 },
    { t0: 24.6, t1: 26.4, who: 'uranus', text: 'Interview *over.*', x: 640, y: 420, tail: 180 },
    { t0: 26.6, t1: 28.4, who: 'the date', color: DC, text: 'Same café *next week?*', x: 680, y: 1680, tailUp: true, tail: 100 },
  ],
  heads: [
    { at: INT, text: 'Date one. | *Interview mode.*', out: [5.6, 5.85], top: 240, size: 96 },
    { at: LAST, text: 'Hired. | *For a second date.*', top: 240, size: 104 },
  ],
  fx: [{ f: HK.screenShake, c: HK.shakeCues, o: { at: LAUGH, len: 0.35, amp: 10 } }],
  cues: [
    ['tick', 14.25, 0.06], ['pop', JOKE + 2.4, 523.25, 0.05, 0], ['tom', LAUGH, 160, { gain: 0.12, decay: 0.25 }],
    ['whoosh', DROP, 0.3, 0.04], ['tom', DROP + 0.45, 90, { gain: 0.18, decay: 0.3 }],
    ['glitter', PIS, PIS + 1],
  ],
  music: { style: 'cinematic', key: 'C', seed: 8110, sections: { drop: 0.5, breakdown: [URA], lift: [LAUGH] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
