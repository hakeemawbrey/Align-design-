// kdwe17 · Don't Watch This If You're a ___ · "Everything Libra Hides" (64 s vertical, loop) · cinematic · F
//   0      Libra with both points flat on the lens, scales flying; "LIBRA. | Scroll. …Fine. *Everything.*" · scratch · whip out
//   1.5    the promise: "Five secrets. | Wait for *number five.*"
//   5      SECRET 1 · BOTH SIDES: arguing with its reflection about pineapple on pizza, and losing
//   15.5   SECRET 2 · FOUR DRAFTS OF “HEY”: hey / hey! / heyy :) / hey hey … sends “hi”
//   26     SECRET 3 · TWO PLANS, ONE NIGHT: yes to movie night AND dinner, spinning between two doors
//   36.5   SECRET 4 · THE POLL: the group chat votes on what “:)” means. Tied.
//   47     SECRET 5 · THE MESSY ONE: perfect on paper vs the one who makes it laugh; the heart meter swings
//          Pisces sobbing: "follow your *heart!!*" · Libra texts the messy one → "YES"
//   59.4   "Balanced. | *Secretly* team chaos." · 63.55 Libra lunges back at the lens → frame 0 (loop)
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const LI = tag('libra'), MI = '♎︎ LIBRA (MIRROR)', PI = tag('pisces')
const RW = 1400
const S = [5, 15.5, 26, 36.5, 47], LAST = 59.4
const TITLES = ['BOTH SIDES', 'FOUR DRAFTS OF “HEY”', 'TWO PLANS, ONE NIGHT', 'THE POLL', 'THE MESSY ONE']
const CH = S.map((at, i) => ({ at: at - 0.1, out: [at + 9.6, at + 9.9], n: i + 1, title: TITLES[i], x: 60, y: 330, color: i === 4 ? '#ff8fb1' : '#f2c75c' }))
const regionAt = t => t < S[1] ? 0 : t < S[2] ? 1 : t < S[3] ? 2 : t < S[4] ? 3 : 4
const cam = (r, z = 1, dx = 0, dy = 0) => [z, r * RW + 540 + dx, 960 + dy]
const DRAFTS = [['hey', 16.4], ['hey!', 17.6], ['heyy :)', 18.8], ['hey hey', 20.0]]
const F = dwFilm({
  id: 'kdwe17', sign: 'libra', dur: 64, ending: 'loop',
  hook: 'LIBRA.|Scroll. …Fine. *Everything.*', hookOut: 1.3, hookSize: 96, scratch: 'fine. *all five.*',
  lens: { mood: 'wide', look: [0, 0] }, pull: { x: 330, y: 1250, s: 310 },
  shots: [
    { at: 0, cam: cam(0) }, { at: 10.4, cam: cam(0, 1.2, 100, 150) },
    { at: S[1], cam: cam(1) },
    { at: S[2], cam: cam(2) }, { at: 31.4, cam: cam(2, 1.25, 0, 200) },
    { at: S[3], cam: cam(3) },
    { at: S[4], cam: cam(4) }, { at: 53.2, cam: cam(4, 1.1, 0, 120) }, { at: 58.8, cam: cam(4) },
  ],
  shakes: [29.0, 30.4],
  heads: [
    { text: 'Five secrets.|Wait for *number five.*', at: 1.5, out: [4.5, 4.75], top: 470, size: 92 },
    { text: 'Lost an argument|*to itself.*', at: 12.0, out: [15.0, 15.3], top: 470, size: 92 },
    { text: 'Four drafts.|*One* word.', at: 21.6, out: [25.5, 25.8], top: 470 },
    { text: 'Said *yes*|to both.', at: 27.0, out: [31.0, 31.3], top: 470, size: 104 },
    { text: 'It’s *tied.*', at: 42.4, out: [46.2, 46.5], top: 470, size: 110 },
    { text: 'Balanced.|*Secretly* team chaos.', at: LAST, out: [63.25, 63.5], top: 300, size: 92 },
  ],
  boxes: [
    { open: 5.5, close: 11.8, lines: [{ t: 5.65, speaker: LI, text: 'pineapple on pizza: *yes.*', color: '#ffc6e0' }, { t: 7.6, speaker: MI, text: 'counterpoint: *no.*', color: '#c9a6ff' }, { t: 9.6, speaker: LI, text: '…you make a *good* point.', color: '#ffc6e0' }] },
    { open: 31.6, close: 35.8, lines: [{ t: 31.75, speaker: LI, text: 'i can do *both!* i can… do both?', color: '#ffc6e0' }] },
    { open: 52.6, close: 58.6, lines: [{ t: 52.75, speaker: PI, text: 'follow your *heart!!*', color: '#9fd7ff' }, { t: 54.8, speaker: LI, text: 'okay. *texting* the messy one.', color: '#ffc6e0' }] },
  ],
  pitch: { [LI]: 698.46, [MI]: 622.25, [PI]: 1046.5 },
  fx: [
    ...CH.map(o => ({ f: HK.chapter, c: HK.chapterCues, o })),
    { f: HK.notification, c: HK.notificationCues, o: { at: 57.0, out: [58.6, 58.85], title: 'messages', body: 'THE MESSY ONE: *YES.* noodles??', glyph: '♐', y: 150 } },
  ],
  paint(x, t, K) {
    const r = regionAt(t)
    x.save(); x.translate(r * RW, 0)
    const libra = o => { if (!K.hide) K.star(x, t, 'libra', { s: 310, seed: 5, ...o }) }
    if (r === 0) {
      K.room(x, t, { wall: '#3a2440', wall2: '#1e1226', floor: '#2e2030', window: false, frame: '#ffc6e0' })
      K.box(x, 560, 760, 400, 620, '#c9d4dc', { o: 10 }); K.rect(x, 580, 780, 360, 580, '#4a3a5a')
      x.save(); x.beginPath(); x.rect(580, 780, 360, 580); x.clip()
      const mtalk = t > 7.6 && t < 9.6
      K.star(x, t, 'libra', { x: 760, y: 1170, s: 280, mood: t < 7.6 ? 'squint' : mtalk ? 'wink' : 'happy', look: [-1, 0], seed: 15, glow: 0.4, badge: false, squash: mtalk ? 0.05 * Math.sin(t * 14) : 0 })
      x.restore()
      x.fillStyle = 'rgba(255,255,255,0.12)'; x.beginPath(); x.moveTo(600, 800); x.lineTo(700, 800); x.lineTo(600, 960); x.fill()
      libra({ x: 330, y: 1250, mood: t < 5 ? 'happy' : t < 9.6 ? 'squint' : 'wide', look: t < 5 ? [0, 0] : [1, 0] })
    } else if (r === 1) {
      K.room(x, t, { wall: '#2a2244', wall2: '#151030', floor: '#2a2236', window: true })
      K.box(x, 80, 1300, 920, 40, '#6a5a8a')
      libra({ x: 260, y: 1250, mood: t < 21 ? 'squint' : 'wide', look: [1, -0.4], rot: Math.sin(t * 2) * 0.05 })
    } else if (r === 2) {
      K.room(x, t, { wall: '#30243a', wall2: '#18101e', floor: '#2e2228', window: false })
      for (const [X, lab, c] of [[140, 'MOVIE NIGHT · LEO', '#ffb36b'], [700, 'DINNER · GEMINI', '#ffe27a']]) { K.box(x, X, 780, 240, 560, '#6a4a3a', { o: 8 }); K.rect(x, X + 190, 1060, 20, 20, '#f2c75c'); K.label(x, lab, X + 120, 740, { size: 20, bg: c }) }
      const spin = t > 28.6 ? (t - 28.6) * 9 : 0
      const sx = 540 + Math.sin(spin * 0.5) * 220 * clamp((t - 28.6) / 0.5)
      libra({ x: sx, y: 1260, mood: t < 28.6 ? 'happy' : 'wide', look: [Math.sign(Math.sin(spin * 0.5)), 0], squash: t > 28.6 ? 0.08 * Math.sin(spin) : 0 })
      if (t > 28.6) for (let i = 0; i < 6; i++) { const a = spin * 0.6 + i; K.rect(x, sx + Math.cos(a) * 210, 1250 + Math.sin(a) * 40, 30, 6, 'rgba(255,255,255,0.5)') }
    } else if (r === 3) {
      K.room(x, t, { wall: '#22304a', wall2: '#101828', floor: '#22283a', window: true })
      libra({ x: 300, y: 1300, s: 260, mood: t < 42.4 ? 'squint' : 'wide', look: [1, -1] })
    } else {
      K.room(x, t, { wall: '#3a2440', wall2: '#1e1226', floor: '#2e2030', window: true })
      // perfect on paper (Capricorn with a checklist) vs the messy one (Sagittarius, tripping, laughing)
      const k = K.pop01(t, S[4] + 0.5, 0.4)
      K.star(x, t, 'capricorn', { x: 200, y: 1000, s: 230, pop: k, mood: 'neutral', look: [1, 0], seed: 10 })
      K.label(x, 'PERFECT ON PAPER ✓✓✓', 200, 1170, { size: 20, pop: k })
      const trip = Math.sin(t * 3) * 0.3
      K.star(x, t, 'sagittarius', { x: 860, y: 1000, s: 230, pop: K.pop01(t, S[4] + 0.8, 0.4), mood: 'happy', look: [-1, 0], seed: 4, rot: trip })
      K.label(x, 'THE MESSY ONE', 860, 1170, { size: 20, bg: '#ff8fb1', pop: K.pop01(t, S[4] + 0.8, 0.4) })
      // the heart meter
      const needle = t < 49.6 ? 0 : t < 51.4 ? Math.sin((t - 49.6) * 6) * 0.6 : lerp(0.2, 0.95, ease.outBack(prog(t, 51.4, 52.0)))
      x.save(); x.translate(540, 900); K.box(x, -150, -20, 300, 40, '#2c2450', { o: 4 }); K.txt(x, '♡ METER', 0, -46, { size: 22, color: '#ff8fb1' }); K.rect(x, needle * 140 - 6, -30, 12, 60, '#ff3b4e'); x.restore()
      libra({ x: 540, y: 1300, s: 280, mood: t < 51.4 ? 'squint' : 'heart', look: t < 51.4 ? [Math.sin(t * 4), -1] : [1, -1] })
      if (t > 52.4) K.pisces(x, t, { x: 860, y: 1300, s: 240, pop: K.pop01(t, 52.4, 0.4), look: [-1, -0.5], tears: 3 })
    }
    x.restore()
  },
  over(x, t, K) {
    // SECRET 2: four drafts, then "hi"
    const k2 = K.inOut(t, S[1] + 0.5, 25.4)
    if (k2 > 0.01) K.phone(x, t, {
      X: 640, Y: 1080, w: 480, h: 720, pop: k2, rot: 0.04, title: 'CRUSH ♡ · drafts', time: '8:05',
      screen: (c, tt, w, h) => {
        DRAFTS.forEach(([s, at], i) => {
          const p = K.pop01(tt, at, 0.3); if (p <= 0) return
          c.save(); c.translate(0, -h / 2 + 220 + i * 110); c.scale(p, p)
          K.rrect(c, -150, -36, 300, 72, 30, '#3a2f5a'); K.txt(c, s, 0, 0, { size: 32, color: '#efe6d6' })
          const cr = prog(tt, at + 0.8, at + 1.0); if (cr > 0) { c.strokeStyle = '#ff3b4e'; c.lineWidth = 6; c.beginPath(); c.moveTo(-120, 0); c.lineTo(-120 + 240 * cr, 0); c.stroke() }
          c.restore()
        })
        const sp = K.pop01(tt, 21.3, 0.3)
        if (sp > 0) { c.save(); c.translate(w / 2 - 120, h / 2 - 140); c.scale(sp, sp); K.rrect(c, -70, -36, 140, 72, 30, '#ff8fb1'); K.txt(c, 'hi', 0, 0, { size: 34, color: '#1a1236' }); K.txt(c, 'sent ✓', 0, 54, { size: 18, color: '#9fe6b0' }); c.restore() }
      },
    })
    // SECRET 4: the poll
    const k4 = K.inOut(t, S[3] + 0.5, 46.4)
    if (k4 > 0.01) K.phone(x, t, {
      X: 600, Y: 1080, w: 520, h: 740, pop: k4, rot: -0.03, title: 'the group chat', time: '10:12',
      bubbles: [{ side: 'R', text: 'POLL: what does ":)" mean??', at: 37.4 }],
      screen: (c, tt, w, h) => {
        const opts = [['they like you', 0.5], ['being polite', 0.5]]
        opts.forEach(([s, v], i) => {
          const p = K.pop01(tt, 38.6 + i * 0.4, 0.3); if (p <= 0) return
          const fill = v * ease.inOutQuad(prog(tt, 39.6, 41.8))
          c.save(); c.translate(0, -h / 2 + 330 + i * 120); c.scale(p, p)
          K.rrect(c, -w / 2 + 30, -40, w - 60, 80, 20, '#2c2450'); K.rrect(c, -w / 2 + 30, -40, (w - 60) * fill, 80, 20, i ? '#7fd0f0' : '#ff8fb1')
          K.txt(c, s, -w / 2 + 56, 0, { size: 28, align: 'left', color: '#efe6d6' })
          c.restore()
        })
        const vp = K.pop01(tt, 40.0, 0.3)
        if (vp > 0) ['LEO voted', 'GEMINI voted', 'VIRGO voted', 'ARIES voted'].forEach((s, i) => { if (tt > 40 + i * 0.45) K.txt(c, s, 0, -h / 2 + 600 + i * 34, { size: 20, color: '#bdb3d8' }) })
        if (tt > 42.2) { c.save(); c.translate(0, h / 2 - 110); c.rotate(-0.08); K.box(c, -110, -36, 220, 72, '#ff3b4e', { o: 5 }); K.txt(c, 'TIED', 0, 2, { size: 44, font: K.INTER, weight: 900, color: '#fff' }); c.restore() }
      },
    })
  },
  cues: [
    ...[5.65, 7.6, 9.6].map((t, i) => ['pop', t, i === 1 ? 587.33 : 698.46, 0.035, i === 1 ? 0.4 : -0.4]),
    ...DRAFTS.flatMap(([_, at]) => [['pop', at, 880, 0.035, 0], ['tick', +(at + 0.85).toFixed(2), 0.05]]), ['pop', 21.3, 1318.51, 0.05, 0.3], ['whoosh', 21.25, 0.2, 0.05],
    ['whoosh', 28.6, 2.4, 0.05], ['boom', 29.0, 0.06], ['boom', 30.4, 0.06],
    ['pop', 37.4, 987.77, 0.04, 0], ...[40, 40.45, 40.9, 41.35].map(t => ['tick', t, 0.04]), ['bell', 42.25, 1567.98, 0.05, 1, 0],
    ['whoosh', 49.6, 1.8, 0.04], ['pop', 51.5, 1174.66, 0.05, 0], ['glitter', 51.5, 52.6], ['pop', 52.43, 987.77, 0.05, 0.3],
  ],
  music: { style: 'cinematic', key: 'F', seed: 4117, sections: { drop: 1.42, breakdown: [S[1], S[3]], lift: [S[2], 51.4] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
