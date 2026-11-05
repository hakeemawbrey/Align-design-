// kpsae01 · Planet Talk: Saturn · "Saturn Puts Aries on a Slow Clock" (24 s vertical, hard cut) · chiptune · E
//   0      Aries mid-sprint across the restaurant; Saturn crashing in, its ring slamming down like a hurdle; Aries bonks
//          into it. "ARIES. | Stop. *Running.*"  · 0.45 the landing: flash, shake, whip zoom
//   0.7    ♄ "where are you *going?*" · 2.6 ♈ "to ask if we're *exclusive!*" · the ring flies back onto Saturn
//   4.9    record scratch + freeze: "first date. *minute four.*"
//   6.5    ♄ "commitment is *built.* not sprinted." · 8.7 the pocket watch + the PATIENCE bar · Aries fidgets
//   11.0   ♄ "ask about *them.* the rest grows." · 13.6 the date: "honestly? I've *loved* tonight."
//   15.8   Pisces the intern, sobbing: "it's *GROWTH!!*" · 18.0 ♄ "…proud of you. don't make it *weird.*"
//   21.6   ♈ "Fine. I'll ask at *dessert.*"  · hard cut at 24
import { saFilm, HK } from '../sakit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 24
const REC = { at: 4.9, len: 1.4, caption: 'first date. *minute four.*', sub: 'for context:', top: 1660 }
const WATCH = [8.7, 15.4]
const BAR = { at: 9.0, out: 15.4 }
const F = saFilm({
  id: 'kpsae01', sign: 'aries', dur: D, ending: 'cut',
  hook: 'ARIES.|Stop. *Running.*', hookY: 210, hookSize: 92, hookOut: 2.4,
  arrive: { kind: 'crash', at: -0.6, x: 540, y: 640, size: 470 },
  freezes: [{ at: REC.at, len: REC.len }],
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 8.7, cam: [1.16, 420, 1060] },
    { at: 13.5, cam: [1.14, 690, 1080] },
    { at: 15.7, cam: [1, 540, 960] },
    { at: 21.5, cam: [1.12, 400, 1080] },
  ],
  punch: [{ at: 2.65, dur: 1.5, z: 0.12, x: 300, y: 1200 }],
  shakes: [0.36],
  says: [
    { t0: 0.7, t1: 2.45, who: 'saturn', text: 'ARIES. Where are you *going?*', x: 540, y: 930, tailUp: true },
    { t0: 2.65, t1: 4.8, who: 'aries', text: "to ask if we're *exclusive!*", x: 380, y: 1620, tailUp: true, tail: -80 },
    { t0: 6.5, t1: 8.5, who: 'saturn', text: 'commitment is *built.* not sprinted.', x: 540, y: 930, tailUp: true },
    { t0: 9.0, t1: 10.8, who: 'aries', text: 'how long do I *wait?*', x: 380, y: 1640, tailUp: true, tail: -60 },
    { t0: 11.0, t1: 13.4, who: 'saturn', text: 'ask about *them.* the rest grows.', x: 540, y: 930, tailUp: true },
    { t0: 13.6, t1: 15.6, who: 'THE DATE ♡', color: '#ff8fb1', text: "honestly? I've *loved* tonight.", x: 700, y: 1620, tailUp: true, tail: 80 },
    { t0: 15.8, t1: 17.8, who: 'pisces', text: "it's *GROWTH!!*", x: 760, y: 1380, tail: 120 },
    { t0: 18.0, t1: 21.3, who: 'saturn', text: '…proud of you. don’t make it *weird.*', x: 540, y: 930, tailUp: true },
    { t0: 21.6, who: 'aries', text: "Fine. I'll ask at *dessert.*", x: 400, y: 1640, tailUp: true, tail: -80, size: 50 },
  ],
  fx: [{ f: HK.recordScratch, c: HK.recordScratchCues, o: REC }],
  paint(x, t, K) {
    K.room(x, t, { wall: '#3a1b2a', wall2: '#1c0d1e', floor: '#2b1622', floorY: 1420, frame: '#7a3a2a', warm: 0.5 })
    // fairy lights
    for (let i = 0; i < 12; i++) { const a = 0.5 + 0.5 * Math.sin(t * 2 + i); K.rect(x, 40 + i * 90, 170 + 26 * Math.sin(i * 0.9), 12, 12, `rgba(255,214,140,${0.4 + 0.6 * a})`) }
    // the table
    K.box(x, 120, 1300, 840, 36, '#e9d8c0'); K.rect(x, 140, 1336, 800, 26, '#c9b49a')
    K.box(x, 500, 1362, 80, 280, '#5a3a2a')
    // the appetiser + candle
    K.box(x, 470, 1262, 140, 24, '#fffaf0'); x.fillStyle = '#e5573b'; for (let i = 0; i < 4; i++) x.fillRect(484 + i * 30, 1246, 22, 18)
    K.box(x, 640, 1232, 22, 60, '#fff3dc'); const fl = 0.8 + 0.2 * Math.sin(t * 13); x.fillStyle = `rgba(255,190,90,${fl})`; x.beginPath(); x.ellipse(651, 1216, 9, 16 * fl, 0, 0, Math.PI * 2); x.fill()
    // the date (opposite side)
    const dMood = t < 13.6 ? (t > 2.6 && t < 6.5 ? 'wide' : 'neutral') : t < 15.8 ? 'happy' : 'sparkle'
    K.sign(x, t, 'libra', { x: 800, y: 1190, s: 230, mood: dMood, look: [-1, 0], glyph: false, seed: 4 })
    // Aries: frame 0 mid-sprint → bonks into the ring → bounces back to its seat
    const run = t < 0.36 ? 1 : 0
    const bonk = prog(t, 0.36, 1.1)
    let ax, ay, sq = 0, mood, look = [1, -0.4]
    if (t < 0.36) { ax = lerp(250, 470, prog(t, -0.3, 0.36)); ay = 1180 - 30 * Math.abs(Math.sin(t * 18)); sq = -0.12; mood = 'wide' }
    else if (bonk < 1) { const e = ease.outCubic(bonk); ax = lerp(470, 280, e); ay = 1180 - 120 * Math.sin(Math.PI * e); sq = 0.3 * (1 - bonk); mood = 'wide' }
    else { ax = 280; ay = 1190; mood = t < 2.6 ? 'squint' : t < 6.5 ? 'happy' : t < 9 ? 'neutral' : t < 13.6 ? 'wide' : t < 18 ? 'heart' : t < 21.6 ? 'happy' : 'wink'; look = t > 6.5 && t < 13.5 ? [0.6, -1] : [1, -0.2] }
    // fidgeting while it waits (bouncing knee, sweat)
    const fidget = t > 9 && t < 13.6 ? Math.abs(Math.sin(t * 14)) * 14 : 0
    if (run) { x.save(); x.strokeStyle = 'rgba(255,240,220,0.7)'; x.lineWidth = 10; x.lineCap = 'round'; for (let i = 0; i < 5; i++) { const yy = ay - 90 + i * 45; x.beginPath(); x.moveTo(ax - 150 - i * 20, yy); x.lineTo(ax - 330 - i * 30, yy); x.stroke() } x.restore() }
    K.sign(x, t, 'aries', { x: ax, y: ay - fidget, s: 260, mood, look, squash: sq, sweat: t > 9 && t < 13.6 })
    // the ring: slams down like a hurdle (frame 0 mid-slam), stands, then flies back onto Saturn
    const P = K.pose(t), sr = P.size / 2
    const back = ease.inOutCubic(prog(t, 2.5, 3.1))
    const slam = ease.inQuad(prog(t, -0.8, 0.3))
    const standX = 560, standY = lerp(-500, 1180, slam)
    const rX = lerp(standX, P.x, back), rY = lerp(standY, P.y, back)
    const rx = lerp(70, 1.85 * sr, back), ry = lerp(330, 0.42 * sr, back), rot = lerp(0, -0.32, back)
    const ringOn = back >= 1
    // Saturn
    const sMood = t < 2.6 ? 'angry' : t < 6.5 ? 'wide' : t < 18 ? 'neutral' : t < 21.6 ? 'happy' : 'wide'
    K.arriving(x, t, { mood: sMood, look: t < 2.6 ? [-0.6, 1] : t > 21.6 ? [-0.5, 0.8] : [0, 0.6], rings: ringOn, blush: t > 18 && t < 21.6 ? 1 : undefined })
    if (!ringOn) K.ring(x, rX, rY, rx, ry, { rot, w: 0.32, t, spin: 1.2 })
    // the pocket watch Saturn holds out
    const wk = K.inOut(t, WATCH[0], WATCH[1])
    if (wk > 0.01) K.watch(x, t, 760, 800, 1.1, { pop: wk })
    // Pisces the intern
    const ik = K.pop01(t, 1.2, 0.4)
    K.intern(x, t, { x: 930, y: 1560, s: 210, pop: ik, tears: t > 15.8 ? 3 : 2, mood: t > 15.8 ? 'wide' : 'sparkle' })
  },
  over(x, t, K) {
    // the PATIENCE bar (speedrun HUD style)
    const k = K.inOut(t, BAR.at, BAR.out)
    if (k > 0.01) {
      const left = 1 - clamp((t - BAR.at) / 4.4)
      const split = t > 13.6
      x.save(); x.translate(540, 1820); x.scale(k, k)
      K.box(x, -440, -64, 880, 128, 'rgba(12,8,30,0.94)', { o: 6 })
      K.txt(x, 'PATIENCE · ANY%', -410, -30, { size: 26, align: 'left', color: '#7dffb0' })
      const secs = Math.max(0, t - BAR.at), tm = `0:${String(Math.floor(secs)).padStart(2, '0')}.${String(Math.floor((secs % 1) * 100)).padStart(2, '0')}`
      K.txt(x, split ? 'NEW PB ★' : tm, 410, -30, { size: 30, align: 'right', color: split ? K.GOLD : '#fff' })
      K.box(x, -410, 6, 820, 36, '#2c2450', { o: 4 }); K.rect(x, -410, 6, 820 * (split ? 1 : clamp(0.15 + left * 0.8)), 36, split ? K.GOLD : (left < 0.35 ? K.RED : '#7dffb0'))
      x.restore()
    }
  },
  cues: [
    ['crash', 0.36, 0.06], ['boom', 0.37, 0.05],
    ['whoosh', 2.5, 0.35, 0.05], ['pop', 3.1, 659.25, 0.05, 0], ['bell', 3.12, 1318.51, 0.035, 0.8, 0],
    ['tick', 8.75, 0.05], ['bell', 8.78, 1567.98, 0.035, 0.6, 0.2],
    ...[9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13].map(t => ['tick', t, 0.03]),
    ['chip', 13.62, 1318.51, 0.25, { gain: 0.03 }], ['glitter', 13.7, 14.6], ['glitter', 15.85, 17.2],
    ['pop', 21.62, 523.25, 0.05, 0], ['bell', 22.9, 1318.51, 0.04, 1.0, 0],
  ],
  music: { style: 'chiptune', key: 'E', seed: 7101, sections: { lift: [13.6] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
