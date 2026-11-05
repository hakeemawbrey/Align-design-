// kdwe19 · Don't Watch This If You're a ___ · "Everything Taurus Hides" (70 s vertical, hard cut) · jazzy · Bb
//   0      Taurus planting both feet against the lens, a sweater in its teeth; "TAURUS. | No. Okay. *All of it.*" · whip out
//   1.5    the promise: "Five secrets. | Number five took *six months.*"
//   5      SECRET 1 · THE SWEATER: still has the sweater from date one, still wears it
//   17     SECRET 2 · THE COMFORT FILM: the same made-up film again, mouthing every line
//   29     SECRET 3 · THE MAP VOICE: the 2-lane standoff with the (made-up) map voice: RECALCULATING ×3
//   41     SECRET 4 · THE FRIES: ate the shared fries before the date arrived, reordered, nobody knows
//   53     SECRET 5 · THE STICKY NOTE: "I LIKE YOU", written six months ago, carried everywhere
//          Pisces sobbing: "SAY *IT!!*" · ♉ "i like you." · ♍ "me *too.*"
//   66.6   "Slow? | *Six months* of sticky notes." · hard cut at 70
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const TA = tag('taurus'), VI = tag('virgo'), PI = tag('pisces'), TV = '▶︎ THE FILM', MAP = '◈ MAP VOICE'
const RW = 1400
const S = [5, 17, 29, 41, 53], LAST = 66.6, SAY = 61.4
const TITLES = ['THE SWEATER', 'THE COMFORT FILM', 'THE MAP VOICE', 'THE FRIES', 'THE STICKY NOTE']
const CH = S.map((at, i) => ({ at: at - 0.1, out: [at + 9.8, at + 10.1], n: i + 1, title: TITLES[i], x: 60, y: 330, color: i === 4 ? '#ff8fb1' : '#9fe6b0' }))
const regionAt = t => t < S[1] ? 0 : t < S[2] ? 1 : t < S[3] ? 2 : t < S[4] ? 3 : 4
const cam = (r, z = 1, dx = 0, dy = 0) => [z, r * RW + 540 + dx, 960 + dy]
const NOTE_SPOTS = [[54.6, 'IN THE COAT POCKET'], [55.8, 'ON THE FRIDGE'], [57.0, 'IN THE WALLET'], [58.2, 'AT THE GYM'], [59.4, 'RIGHT NOW']]
const SWEATER = '#c9603a'
function sweater(x, K, X, Y, s, k) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y + s * 0.18); x.scale(s / 300, s / 300); x.globalAlpha = Math.min(1, k * 2)
  K.box(x, -120, -20, 240, 110, SWEATER); for (const d of [-1, 1]) K.box(x, d * 150 - 40, -30, 80, 90, SWEATER)
  for (let i = 0; i < 5; i++) K.rect(x, -100 + i * 44, 20, 20, 8, '#efe6d6')
  x.restore()
}
const F = dwFilm({
  id: 'kdwe19', sign: 'taurus', dur: 70, ending: 'cut',
  hook: 'TAURUS.|No. Okay. *All of it.*', hookOut: 1.3, scratch: 'all of it. *slowly.*',
  lens: { mood: 'squint', look: [0, 0] }, pull: { x: 330, y: 1250, s: 310 },
  shots: [
    { at: 0, cam: cam(0) }, { at: 10.6, cam: cam(0, 1.3, -40, 200) },
    { at: S[1], cam: cam(1) }, { at: 22.6, cam: cam(1, 1.15, 0, 120) },
    { at: S[2], cam: cam(2) }, { at: 35.0, cam: cam(2, 1.2, 0, 160) },
    { at: S[3], cam: cam(3) }, { at: 46.4, cam: cam(3, 1.1, 0, 100) },
    { at: S[4], cam: cam(4) }, { at: SAY, cam: cam(4, 1.1, 0, 120) }, { at: 65.6, cam: cam(4) },
  ],
  punch: [{ at: 24.4, dur: 1.2, z: 0.15, x: RW + 380, y: 1150 }],
  shakes: [37.0],
  heads: [
    { text: 'Five secrets.|Number five took *six months.*', at: 1.5, out: [4.5, 4.75], top: 470, size: 84 },
    { text: 'Date one.|*Still* soft.', at: 11.0, out: [16.4, 16.7], top: 470 },
    { text: 'Knows every line.|*Every* line.', at: 22.8, out: [28.4, 28.7], top: 470, size: 92 },
    { text: 'Forty minutes.|*Did not* turn.', at: 35.4, out: [40.4, 40.7], top: 470, size: 92 },
    { text: 'Nobody knows.|*Except you, now.*', at: 47.8, out: [52.4, 52.7], top: 470, size: 88 },
    { text: 'Slow?|*Six months* of sticky notes.', at: LAST, top: 300, size: 88 },
  ],
  boxes: [
    { open: 5.6, close: 10.4, lines: [{ t: 5.75, speaker: TA, text: 'it’s just a *nice* sweater.', color: '#9fe6b0' }] },
    { open: 18.6, close: 22.4, lines: [{ t: 18.75, speaker: TV, text: '“i would wait *forever* for you.”', color: '#ffd98a' }] },
    { open: 29.6, close: 34.8, lines: [{ t: 29.75, speaker: MAP, text: 'TURN LEFT.', color: '#7fe3ff' }, { t: 31.5, speaker: TA, text: '*no.*', color: '#9fe6b0' }, { t: 33.2, speaker: MAP, text: 'RECALCULATING…', color: '#7fe3ff' }] },
    { open: 44.6, close: 47.4, lines: [{ t: 44.75, speaker: VI, text: 'aw, you *waited* for me?', color: '#9fe6b0' }] },
    { open: 60.2, close: 66.3, lines: [{ t: 60.35, speaker: PI, text: 'SAY *IT!!*', color: '#9fd7ff' }, { t: 62.0, speaker: TA, text: 'i like *you.*', color: '#9fe6b0' }, { t: 64.0, speaker: VI, text: 'me *too.*', color: '#c8f0c8' }] },
  ],
  pitch: { [TA]: 392, [VI]: 659.25, [PI]: 1046.5, [TV]: 523.25, [MAP]: 293.66 },
  fx: CH.map(o => ({ f: HK.chapter, c: HK.chapterCues, o })),
  paint(x, t, K) {
    const r = regionAt(t)
    x.save(); x.translate(r * RW, 0)
    const ta = o => { if (!K.hide) K.star(x, t, 'taurus', { s: 310, seed: 2, ...o }) }
    if (r === 0) {
      K.room(x, t, { wall: '#3a2a22', wall2: '#22150f', floor: '#3a2a20', window: true, warm: 0.6 })
      K.box(x, 640, 1100, 300, 260, '#6a4a3a'); K.rect(x, 650, 1110, 280, 30, '#8a6a4a')
      const wear = ease.outCubic(prog(t, 7.4, 7.8))
      if (wear < 0.5) { x.save(); x.translate(790, 1060); K.box(x, -100, -40, 200, 80, SWEATER); x.restore(); K.label(x, 'DATE ONE · still soft', 790, 990, { size: 20 }) }
      ta({ x: 330, y: 1250, mood: t < 7.4 ? 'wide' : t < 10.6 ? 'happy' : 'sparkle', look: [1, 0] })
      if (!K.hide) sweater(x, K, 330, 1250, 310, wear)
    } else if (r === 1) {
      K.room(x, t, { wall: '#3a2a3a', wall2: '#1e1420', floor: '#2e2228', window: false, warm: 0.4 })
      K.box(x, 300, 600, 540, 360, '#0a0820', { o: 14 })
      x.save(); x.beginPath(); x.rect(300, 600, 540, 360); x.clip()
      const g = x.createLinearGradient(0, 600, 0, 960); g.addColorStop(0, '#5a7ab4'); g.addColorStop(1, '#ffb38a'); x.fillStyle = g; x.fillRect(300, 600, 540, 360)
      K.rect(x, 640, 680, 60, 200, '#efe6d6'); K.rect(x, 630, 660, 80, 30, '#c84a5a'); x.fillStyle = '#fff6c0'; x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 3); x.fillRect(640, 690, 60, 20); x.globalAlpha = 1
      K.rect(x, 360, 820, 120, 140, '#8a5a3a'); K.txt(x, 'BAKERY', 420, 840, { size: 18, color: '#efe6d6' })
      x.restore()
      K.txt(x, '“THE LIGHTHOUSE BAKERY” (a made-up film)', 570, 990, { size: 18, color: '#bdb3d8' })
      K.label(x, 'WATCHED: lost count', 570, 1060, { size: 22, bg: '#ffd98a', pop: K.pop01(t, 20.6, 0.3) })
      K.box(x, 120, 1230, 840, 140, '#6a4a6a'); K.box(x, 120, 1150, 80, 220, '#6a4a6a'); K.box(x, 880, 1150, 80, 220, '#6a4a6a')
      const mouth = t > 18.75 && t < 20.4
      ta({ x: 380, y: 1160, mood: mouth ? 'sparkle' : t < 24 ? 'happy' : 'sparkle', look: [0.5, -1], squash: mouth ? 0.05 * Math.sin(t * 16) : 0, tears: t > 24.4 ? 1 : 0 })
    } else if (r === 2) {
      // the car, at a junction
      x.fillStyle = '#20263e'; x.fillRect(-600, -800, 2400, 3600)
      K.rect(x, 80, 900, 920, 400, '#3a3a4a'); K.rect(x, 520, 900, 40, 400, '#c9c9a0'); K.rect(x, 80, 1080, 920, 20, '#c9c9a0')
      x.fillStyle = '#1a1226'; x.fillRect(-600, 1300, 2000, 900); x.fillRect(-600, -800, 680, 3000); x.fillRect(1000, -800, 600, 3000)
      K.box(x, 60, 1290, 960, 70, '#3a2a40')
      // the map screen
      K.box(x, 600, 1100, 320, 170, '#140c28', { o: 5 })
      const rc = t < 33.2 ? 'TURN LEFT ←' : 'RECALCULATING ×' + Math.min(3, 1 + Math.floor((t - 33.2) / 1.2))
      K.txt(x, rc, 760, 1150, { size: 22, color: '#7fe3ff' })
      const mins = Math.floor(lerp(0, 40, prog(t, 30, 39)))
      K.txt(x, `6:${String(mins).padStart(2, '0')} PM`, 760, 1210, { size: 26, color: '#ffd98a' })
      ta({ x: 330, y: 1180, mood: t < 31.5 ? 'neutral' : 'squint', look: [1, 0], squash: 0 })
      x.strokeStyle = '#140c28'; x.lineWidth = 46; x.beginPath(); x.arc(330, 1430, 200, Math.PI * 1.1, Math.PI * 1.9); x.stroke(); x.strokeStyle = '#4a3a50'; x.lineWidth = 30; x.stroke()
    } else if (r === 3) {
      K.room(x, t, { wall: '#4a2a1e', wall2: '#2a160e', floor: '#3a2418', window: true, warm: 0.6 })
      K.box(x, 200, 1220, 680, 30, '#c9a07a'); K.rect(x, 520, 1250, 26, 520, '#6a4a3a')
      // the fries basket: full → empty → full (reordered)
      const fries = t < 42.0 ? 1 : t < 43.2 ? 1 - prog(t, 42.0, 43.2) : t < 43.8 ? 0 : 1
      K.box(x, 470, 1130, 140, 90, '#ff3b4e')
      for (let i = 0; i < Math.round(9 * fries); i++) K.box(x, 482 + (i % 5) * 26, 1080 + Math.floor(i / 5) * 20 - (i % 2) * 10, 12, 60, '#f2c75c', { o: 2 })
      if (t > 43.8 && t < 44.3) K.label(x, 'REORDERED ✓', 540, 1040, { size: 22 })
      if (t > 43.2) for (let i = 0; i < 6; i++) K.rect(x, 300 + i * 31, 1214, 8, 6, '#f2c75c')
      if (t > 44.4) K.star(x, t, 'virgo', { x: 830, y: 1150, s: 280, pop: K.pop01(t, 44.4, 0.35), mood: 'happy', look: [-1, 0], seed: 5 })
      ta({ x: 300, y: 1150, mood: t < 42 ? 'neutral' : t < 43.8 ? 'heart' : t < 44.4 ? 'wide' : 'happy', look: [1, 0], squash: t > 42 && t < 43.2 ? 0.06 * Math.sin(t * 20) : 0 })
    } else {
      K.room(x, t, { wall: '#3a2a22', wall2: '#22150f', floor: '#3a2a20', window: true, warm: 0.6 })
      if (t > SAY - 1.6) K.star(x, t, 'virgo', { x: 820, y: 1220, s: 280, pop: K.pop01(t, SAY - 1.6, 0.4), mood: t < 64 ? 'wide' : 'heart', look: [-1, 0], seed: 5 })
      if (t > 60.0) K.pisces(x, t, { x: 560, y: 900, s: 220, pop: K.pop01(t, 60.0, 0.4), look: [0, 1], tears: 3 })
      ta({ x: 320, y: 1240, mood: t < SAY ? 'neutral' : t < 64 ? 'wide' : 'heart', look: [1, 0] })
      if (t > 62.0) { const k = K.pop01(t, 62.0, 0.35); x.save(); x.translate(470, 1160); x.rotate(-0.08); x.scale(k, k); K.box(x, -60, -60, 120, 120, '#fff3a8', { o: 4 }); K.txt(x, 'I LIKE', 0, -14, { size: 24, color: '#1a1236' }); K.txt(x, 'YOU', 0, 20, { size: 28, color: '#ff3b4e' }); x.restore() }
    }
    x.restore()
  },
  over(x, t, K) {
    // SECRET 5: the sticky note, everywhere for six months
    if (t > S[4] + 0.4 && t < 60.2) {
      const k = K.inOut(t, S[4] + 0.4, 60.2)
      const spot = NOTE_SPOTS.filter(s => t >= s[0]).pop()
      x.save(); x.translate(540, 1000); x.scale(k, k); x.rotate(-0.06 + Math.sin(t * 2) * 0.02)
      K.box(x, -230, -230, 460, 460, '#fff3a8', { o: 8 }); K.rect(x, -230, -230, 460, 50, '#f2d870')
      K.txt(x, 'I LIKE', 0, -50, { size: 80, font: K.INTER, weight: 900, color: '#1a1236' })
      K.txt(x, 'YOU', 0, 60, { size: 110, font: K.INTER, weight: 900, color: '#ff3b4e' })
      K.txt(x, 'written: six months ago', 0, 170, { size: 22, color: '#7a6a3a' })
      x.restore()
      if (spot) K.label(x, spot[1], 540, 1340, { size: 30, bg: '#ff8fb1', pop: K.pop01(t, spot[0], 0.3), rot: 0.03 })
    }
  },
  cues: [
    ['whoosh', 7.4, 0.4, 0.04], ['pop', 7.7, 659.25, 0.04, 0],
    ['bell', 18.6, 783.99, 0.03, 1.6, 0], ['pop', 20.65, 1174.66, 0.04, 0],
    ...[33.2, 34.4, 35.6].map(t => ['pop', t, 293.66, 0.05, 0]), ['boom', 37.0, 0.06],
    ['whoosh', 42.0, 1.2, 0.04], ...[42.2, 42.5, 42.8, 43.1].map(t => ['tick', t, 0.04]), ['bell', 43.85, 1567.98, 0.04, 1, 0],
    ...NOTE_SPOTS.map(([at]) => ['pop', at, 880, 0.04, 0]), ['glitter', 60.0, 61.4], ['bell', 64.05, 1174.66, 0.05, 2, 0], ['glitter', 64, 66],
  ],
  music: { style: 'jazzy', key: 'Bb', seed: 4119, sections: { drop: 1.42, breakdown: [S[2], S[4]], lift: [S[3], SAY] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
