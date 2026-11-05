// kpsae10 · Planet Talk: Saturn · "Saturn's Talk With Capricorn" (75 s vertical, hard cut) · cinematic · C
// Capricorn is Saturn's home sign (in astrology, Saturn rules Capricorn): the long heart-to-heart, in five chapters.
//   0      11 p.m., Capricorn's office: Saturn descending like a giant boss, the window blinds flying, papers mid-air,
//          Capricorn mid-type. "CAPRICORN. | Close the laptop. *Now.*"  · 0.5 the landing
//   2.7    the promise: "wait for what Saturn's *really* here for."
//   5.4    1 · THE SUMMONS  ♑ "is this a… *performance review?*" · ♄ "worse. it's a *check-in.*" · ♑ "I have *four* deadlines."
//          Pisces the intern: "it's 11 p.m. on a *Friday!*"
//   14.0   2 · THE AUDIT    the week on Saturn's clipboard: four plans, CANCELLED · "work ran late" ×4
//          ♄ "four plans. same *excuse.*" · ♑ "I'm doing it *for* us. for later." · ♄ "later needs a *now.*"
//   24.2   3 · THE RULE     RULE #1: one evening a week, phone in the drawer · the phone goes in · ♑ "…the *whole* evening?"
//          ♄ "the whole evening. *non-negotiable.*" · ♓ "so *strict.* and so *right.*"
//   33.6   4 · THE DATE     a restaurant · the date: "so how was your *week?*" · Capricorn checks the watch → Saturn
//          pops up behind the plant holding BE HERE ♡ · the date's story · Capricorn laughs for real ("HA!")
//   46.4   5 · THE SOFT PART back at the desk · ♄ "everyone thinks I'm *cold.*" · "my rings are mostly *ice.* still shine."
//          "I take about 29 years to go round the Sun *once.*" · "I know slow things *last.*" · ♑ "so why are you *really* here?"
//          ♄ "love isn't a *promotion.*" · "you already *qualify.*" · Pisces sobbing · the laptop closes
//          ♑ "…booking next Thursday. for *me.*" · "are you… *smiling?*" ♄ "no."
//   73.0   ♄ "You don't have to *earn* this." · hard cut 75
// Astronomy used (true): Saturn's rings are mostly water ice; Saturn takes about 29½ years to go round the Sun.
import { saFilm, HK } from '../../kpsae01/sakit.js'
import { prog, ease, lerp, clamp, rng } from '../../../src/lib.js'

const D = 75
const OX = 1400                        // the restaurant set sits to the right of the office in world space
const CH = [[5.4, 'THE SUMMONS'], [14.0, 'THE AUDIT'], [24.2, 'THE RULE'], [33.6, 'THE DATE'], [46.4, 'THE SOFT PART']]
const AUDIT = [14.2, 23.8], WEEK = [['MON', 'dinner with friends', 14.6], ['TUE', 'call home', 15.4], ['WED', 'second date', 16.2], ['THU', 'climbing night', 17.0]]
const RULE = [24.6, 30.2], DRAWER = 27.0, WATCH = [36.0, 37.8], SIGN = [36.4, 39.4], HA = 43.2, LID = 67.0
const DATE = [33.4, 46.2]
const F = saFilm({
  id: 'kpsae10', sign: 'capricorn', dur: D, ending: 'cut',
  hook: 'CAPRICORN.|Close the laptop. *Now.*', hookY: 1690, hookSize: 86, hookOut: 2.5,
  arrive: { kind: 'drop', at: -0.9, x: 560, y: 600, size: 470 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 10.0, cam: [1.14, 440, 1080] },
    { at: 12.0, cam: [1, 540, 960] },
    { at: 20.0, cam: [1.14, 440, 1080] },
    { at: 22.4, cam: [1, 540, 960] },
    { at: 27.0, cam: [1.2, 700, 1300] },
    { at: 29.2, cam: [1, 540, 960] },
    { at: DATE[0], cam: [1, OX + 540, 960] },
    { at: 36.0, cam: [1.12, OX + 560, 1060] },
    { at: 40.0, cam: [1, OX + 540, 960] },
    { at: HA, cam: [1.16, OX + 400, 1080] },
    { at: 44.8, cam: [1, OX + 540, 960] },
    { at: DATE[1], cam: [1, 540, 960] },
    { at: 58.2, cam: [1.14, 440, 1080] },
    { at: 60.4, cam: [1, 540, 960] },
    { at: 67.0, cam: [1.16, 520, 1100] },
    { at: 70.0, cam: [1, 540, 960] },
  ],
  punch: [{ at: 62.6, dur: 2.0, z: 0.1, x: 560, y: 620 }, { at: 71.8, dur: 1.0, z: 0.12, x: 560, y: 600 }],
  shakes: [DRAWER + 0.8, HA, LID + 0.45],
  says: [
    { t0: 5.6, t1: 7.8, who: 'capricorn', text: 'is this a… *performance review?*', x: 420, y: 1720, tailUp: true, tail: -60 },
    { t0: 8.0, t1: 9.8, who: 'saturn', text: "worse. it's a *check-in.*", x: 540, y: 185 },
    { t0: 10.0, t1: 11.8, who: 'capricorn', text: 'I have *four* deadlines.', x: 420, y: 1720, tailUp: true, tail: -60 },
    { t0: 12.0, t1: 13.8, who: 'pisces', text: "it's 11 p.m. on a *Friday!*", x: 700, y: 1460, tail: 200 },
    { t0: 17.8, t1: 19.8, who: 'saturn', text: 'four plans. same *excuse.*', x: 540, y: 185 },
    { t0: 20.0, t1: 22.2, who: 'capricorn', text: "I'm doing it *for* us. for later.", x: 420, y: 1720, tailUp: true, tail: -60 },
    { t0: 22.4, t1: 24.0, who: 'saturn', text: 'later needs a *now.*', x: 540, y: 185, size: 52 },
    { t0: 27.2, t1: 29.0, who: 'capricorn', text: '…the *whole* evening?', x: 420, y: 1720, tailUp: true, tail: -60 },
    { t0: 29.2, t1: 31.2, who: 'saturn', text: 'the whole evening. *non-negotiable.*', x: 540, y: 185 },
    { t0: 31.4, t1: 33.2, who: 'pisces', text: 'so *strict.* and so *right.*', x: 700, y: 1460, tail: 200 },
    { t0: 36.2 - 2.2, t1: 35.8, who: 'THE DATE ♡', color: '#ff8fb1', text: 'so how was your *week?*', x: 680, y: 1720, tailUp: true, tail: 160 },
    { t0: 37.8, t1: 40.0, who: 'capricorn', text: 'honestly? *long.* but this is nice.', x: 400, y: 1720, tailUp: true, tail: -80 },
    { t0: 40.2, t1: 43.0, who: 'THE DATE ♡', color: '#ff8fb1', text: 'I once waved back at someone waving at the person *behind* me.', x: 600, y: 1700, tailUp: true, tail: 200, size: 40 },
    { t0: 49.0, t1: 50.8, who: 'saturn', text: 'everyone thinks I’m *cold.*', x: 540, y: 185 },
    { t0: 51.0, t1: 53.4, who: 'saturn', text: 'my rings are mostly *ice.* still shine.', x: 540, y: 185 },
    { t0: 53.6, t1: 56.0, who: 'saturn', text: 'I take about 29 years to go round the Sun *once.*', x: 540, y: 200, size: 40 },
    { t0: 56.2, t1: 58.0, who: 'saturn', text: 'I know slow things *last.*', x: 540, y: 185, size: 50 },
    { t0: 58.2, t1: 60.2, who: 'capricorn', text: "so… why are you *really* here?", x: 420, y: 1720, tailUp: true, tail: -60 },
    { t0: 60.4, t1: 62.4, who: 'saturn', text: "love isn't a *promotion.*", x: 540, y: 185, size: 50 },
    { t0: 62.6, t1: 64.6, who: 'saturn', text: 'you already *qualify.*', x: 540, y: 185, size: 56 },
    { t0: 64.8, t1: 66.8, who: 'pisces', text: 'I need a *tissue.* or *nine.*', x: 700, y: 1460, tail: 200 },
    { t0: 67.6, t1: 69.8, who: 'capricorn', text: '…booking next Thursday. for *me.*', x: 420, y: 1720, tailUp: true, tail: -60 },
    { t0: 70.0, t1: 71.6, who: 'capricorn', text: 'are you… *smiling?*', x: 420, y: 1720, tailUp: true, tail: -60 },
    { t0: 71.8, t1: 72.8, who: 'saturn', text: 'no.', x: 540, y: 185, size: 56 },
    { t0: 73.0, who: 'saturn', text: 'You don’t have to *earn* this.', x: 540, y: 185, size: 52 },
  ],
  heads: [
    { text: "wait for what Saturn's|*really* here for.", at: 2.7, out: [5.0, 5.25], top: 880, size: 76 },
    { text: 'a real laugh.|*first one* this week.', at: HA + 0.3, out: [45.9, 46.15], top: 300, size: 80 },
  ],
  fx: CH.map(([at, title], i) => ({ f: HK.chapter, c: HK.chapterCues, o: { at, out: [at + 2.2, at + 2.45], n: i + 1, title, y: 300 } })),
  paint(x, t, K) {
    office(x, t, K)
    if (t > DATE[0] - 0.5 && t < DATE[1] + 0.5) restaurant(x, t, K)
  },
  over(x, t, K) {
    // THE AUDIT: the week on Saturn's clipboard
    const ak = K.inOut(t, AUDIT[0], AUDIT[1])
    if (ak > 0.01) {
      x.save(); x.translate(540, 1020); x.scale(ak, ak)
      K.box(x, -430, -330, 860, 660, '#b07a45', { o: 8 }); K.rect(x, -400, -300, 800, 610, '#fffaf0'); K.box(x, -100, -360, 200, 50, '#8a8a9a', { o: 5 })
      K.txt(x, 'THIS WEEK · PLANS', 0, -250, { size: 34, color: K.INK })
      WEEK.forEach(([d, s, at], i) => {
        const p = K.pop01(t, at, 0.3)
        if (p <= 0.01) return
        const y = -160 + i * 115
        x.save(); x.globalAlpha *= clamp(p)
        K.txt(x, d, -370, y, { size: 30, align: 'left', color: '#7a6a9a' }); K.txt(x, s, -270, y, { size: 32, align: 'left', color: K.INK })
        const st = K.pop01(t, at + 0.35, 0.25, 2.6)
        if (st > 0.01) { x.save(); x.translate(250, y + 34); x.rotate(-0.08); x.scale(st, st); K.rrect(x, -130, -24, 260, 48, 8, null, '#c8243a', 5); K.txt(x, 'CANCELLED', 0, 2, { size: 28, color: '#c8243a' }); x.restore() }
        K.txt(x, '"work ran late"', -270, y + 42, { size: 22, align: 'left', color: '#a08aa0', italic: true })
        x.restore()
      })
      const ck = K.pop01(t, 17.6, 0.3, 2.6)
      if (ck > 0.01) { x.save(); x.translate(300, 250); x.rotate(0.1); x.scale(ck, ck); K.txt(x, '×4', 0, 0, { size: 96, font: K.INTER, weight: 900, color: '#c8243a' }); x.restore() }
      x.restore()
    }
    // THE RULE card
    const rk = K.inOut(t, RULE[0], RULE[1])
    if (rk > 0.01) {
      x.save(); x.translate(540, 880); x.rotate(-0.03); x.scale(rk, rk)
      K.box(x, -420, -150, 840, 300, '#1a1236', { o: 8 }); K.rect(x, -404, -134, 808, 268, '#2a1d4e')
      K.txt(x, "SATURN'S RULE #1", 0, -90, { size: 30, color: K.GOLD })
      K.txt(x, 'ONE EVENING A WEEK.', 0, -10, { size: 50, font: K.INTER, weight: 900, color: K.BONE })
      K.txt(x, 'PHONE IN THE DRAWER.', 0, 64, { size: 50, font: K.INTER, weight: 900, color: K.BONE })
      x.restore()
    }
  },
  cues: [
    ...[0.0, 0.12, 0.24, 0.36].map(t => ['tick', t, 0.04]), ['whoosh', 0.0, 0.5, 0.05],
    ...WEEK.flatMap(([, , at], i) => [['pop', at, [523.25, 587.33, 659.25, 698.46][i], 0.04, 0], ['boom', at + 0.36, 0.04], ['tick', at + 0.37, 0.05]]),
    ['boom', 17.62, 0.05], ['pop', 17.65, 392, 0.05, 0],
    ['boom', RULE[0] + 0.02, 0.05], ['bell', RULE[0] + 0.05, 1046.5, 0.04, 1.2, 0],
    ['whoosh', DRAWER, 0.4, 0.04], ['tick', DRAWER + 0.8, 0.07], ['tom', DRAWER + 0.8, 120, { gain: 0.25 }],
    ['whoosh', DATE[0] - 0.05, 0.4, 0.05], ['tick', WATCH[0], 0.05], ...[36.2, 36.7, 37.2].map(t => ['tick', t, 0.03]),
    ['pop', SIGN[0], 783.99, 0.05, 0.3], ['pop', SIGN[0] + 0.08, 1046.5, 0.04, 0.3],
    ['pop', HA, 523.25, 0.06, 0], ['pop', HA + 0.12, 659.25, 0.06, 0], ['pop', HA + 0.24, 783.99, 0.06, 0], ['glitter', HA, HA + 1.4],
    ['whoosh', DATE[1] - 0.05, 0.4, 0.05], ['glitter', 51.6, 53.2], ['bell', 51.7, 1567.98, 0.04, 2.0, 0.2],
    ['bell', 62.7, 1046.5, 0.05, 2.2, 0], ['glitter', 64.8, 66.4],
    ['tom', LID + 0.45, 90, { gain: 0.3 }], ['tick', LID + 0.45, 0.06], ['pop', 71.85, 261.63, 0.05, 0], ['bell', 73.1, 1046.5, 0.045, 1.6, 0],
  ],
  music: { style: 'cinematic', key: 'C', seed: 7110, sections: { breakdown: 46.4, lift: [33.6, 60.4], build: 24.2 } },
})

// ── the office (world x 0–1080): 11 p.m., the blinds, the desk, the laptop, the drawer
function office(x, t, K) {
  K.room(x, t, { wall: '#1e2a3a', wall2: '#0e141f', floor: '#252836', floorY: 1480, window: false, warm: 0.35 })
  // the city window + its blinds (slats flying at frame 0, then hanging wonky)
  K.box(x, 600, 300, 420, 560, '#0a0f24', { o: 10 })
  for (let k = 0; k < 16; k++) { const R = rng(k * 7 + 1); K.rect(x, 620 + R() * 380, 560 + R() * 280, 26 + R() * 30, 60 + R() * 200, `rgba(255,230,170,${0.25 + 0.35 * R()})`) }
  const R = rng(42)
  for (let i = 0; i < 12; i++) {
    const y0 = 320 + i * 44, ph = R(), d = t + 0.9 - ph * 0.4
    if (i % 3 === 1 || t > 3) { if (i % 3 === 1 && t < 3) continue; K.rect(x, 610, y0, 400, 16, '#c9c2b0'); continue }
    // flying slats
    const vx = (R() - 0.5) * 900, vy = -200 - R() * 300
    if (d < 0) { K.rect(x, 610, y0, 400, 16, '#c9c2b0'); continue }
    x.save(); x.translate(810 + vx * d, y0 + vy * d + 900 * d * d); x.rotate(d * (R() * 8 - 4)); K.rect(x, -200, -8, 400, 16, '#c9c2b0'); x.restore()
  }
  // papers mid-air at frame 0
  const P = rng(9)
  for (let i = 0; i < 14; i++) {
    const sx = 300 + P() * 500, d = t + 0.8 - P() * 0.3, vx = (P() - 0.5) * 600
    if (d < 0 || d > 3.2) continue
    x.save(); x.translate(sx + vx * d, 1100 - 700 * d + 380 * d * d * (0.8 + P() * 0.4)); x.rotate(d * 3 + P() * 6); K.box(x, -40, -52, 80, 104, '#fffaf0', { o: 3 }); for (let j = 0; j < 4; j++) K.rect(x, -28, -36 + j * 20, 56, 5, '#c9bfd8'); x.restore()
  }
  // a shelf with a trophy (Capricorn things)
  K.box(x, 60, 640, 360, 24, '#5a4a3a'); K.box(x, 120, 560, 60, 80, '#f2c75c'); K.box(x, 240, 590, 120, 50, '#3a6ae0')
  // Capricorn (behind the desk)
  const typing = t < 2.6 || (t > 10 && t < 12) || (t > 46.4 && t < 49)
  const cMood = t < 2.6 ? 'wide' : t < 8 ? 'squint' : t < 14 ? 'neutral' : t < 22.4 ? 'sad' : t < 27 ? 'neutral' : t < 33.4 ? 'wide' : t < 58 ? 'neutral' : t < 60.4 ? 'squint' : t < 62.6 ? 'wide' : t < 67 ? 'sparkle' : 'happy'
  K.sign(x, t, 'capricorn', { x: 330, y: 1230 - (typing ? Math.abs(Math.sin(t * 20)) * 8 : 0), s: 300, mood: cMood, look: t < 5 ? [1, 0.6] : [0.6, -1], tears: t > 62.6 && t < 67 ? 1 : 0 })
  // the desk + the drawer + the laptop
  K.box(x, 40, 1340, 820, 40, '#6a4a3a'); K.box(x, 60, 1380, 300, 220, '#5a3a2a')
  const dOpen = Math.sin(Math.PI * clamp((t - DRAWER) / 0.9))
  K.box(x, 80 + 0 * dOpen, 1410, 260, 80, '#7a5a4a'); K.box(x, 80, 1410 - 0, 260 + 0, 80, '#7a5a4a')
  if (dOpen > 0.01) { K.box(x, 60 + 140 * dOpen, 1400, 300, 100, '#8a6a4a') }
  K.box(x, 190, 1440, 40, 14, '#c9c2b0')
  // the phone flying into the drawer
  if (t > DRAWER - 0.1 && t < DRAWER + 0.9) {
    const p = ease.inOutCubic(prog(t, DRAWER, DRAWER + 0.7))
    x.save(); x.translate(lerp(560, 300, p), lerp(1260, 1420, p) - Math.sin(Math.PI * p) * 240); x.rotate(p * 6); K.box(x, -30, -54, 60, 108, '#140c28', { o: 4 }); K.rect(x, -24, -46, 48, 88, '#3a6ae0'); x.restore()
  } else if (t < DRAWER) { x.save(); x.translate(560, 1316); x.rotate(Math.PI / 2); K.box(x, -14, -30, 28, 60, '#140c28', { o: 3 }); x.restore() }
  // the laptop (closes at LID)
  const lid = 1 - ease.inCubic(prog(t, LID, LID + 0.45))
  K.box(x, 520, 1320, 280, 20, '#9aa0b0')
  const h = 200 * lid
  if (h > 4) { K.box(x, 530, 1320 - h, 260, h, '#9aa0b0'); K.rect(x, 545, 1320 - h + 12, 230, Math.max(0, h - 24), `rgba(127,227,255,${0.5 + 0.2 * Math.sin(t * 3)})`) }
  const glow = x.createRadialGradient(660, 1220, 10, 660, 1220, 380); glow.addColorStop(0, `rgba(127,227,255,${0.18 * lid})`); glow.addColorStop(1, 'rgba(127,227,255,0)'); x.fillStyle = glow; x.fillRect(260, 840, 800, 760)
  // the coffee mugs piling up
  for (let i = 0; i < 4; i++) K.box(x, 820 - i * 2, 1262 - i * 64, 50, 60, ['#c8243a', '#3a6ae0', '#f2c75c', '#7dffb0'][i], { o: 4 })
  // Saturn (not during the date)
  if (t < DATE[0] + 0.3 || t > DATE[1] - 0.3) {
    const sMood = t < 2.6 ? 'angry' : t < 14 ? 'neutral' : t < 24.2 ? 'sly' : t < 33.4 ? 'neutral' : t < 49 ? 'neutral' : t < 58 ? 'sad' : t < 62.6 ? 'neutral' : t < 70 ? 'happy' : t < 72.8 ? 'proud' : 'love'
    const shine = t > 51.4 && t < 53.6
    K.arriving(x, t, { mood: sMood, look: [-0.7, 0.7], blush: t > 70 ? 1 : undefined, glow: shine ? 1.8 : 1 })
    if (shine) { for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + t, tw = 0.5 + 0.5 * Math.sin(t * 9 + i * 2); x.fillStyle = `rgba(255,255,255,${tw})`; x.fillRect(560 + Math.cos(a) * 420 - 6, 600 + Math.sin(a) * 100 - 6, 12, 12) } }
    if (t > AUDIT[0] - 0.5 && t < AUDIT[1]) K.clipboard(x, 860, 620, 1.2, { ticks: 0, lines: 4, rot: 0.2 })
  }
  // Pisces the intern
  K.intern(x, t, { x: 930, y: 1590, s: 200, pop: K.pop01(t, 1.6, 0.4), tears: [[12, 13.8], [31.4, 33.2], [62.6, 67]].some(([a, b]) => t > a && t < b) ? 3 : 2, mood: t > 64.6 && t < 67 ? 'wide' : 'sparkle', clip: !(t > 64.8 && t < 67) })
  if (t > 64.8 && t < 67) K.tissue(x, 850, 1600, 1.2, { pop: K.pop01(t, 64.85, 0.3), rot: -0.3 + 0.1 * Math.sin(t * 6) })
}

// ── the restaurant (world x OX…OX+1080): the date, the candle, the plant Saturn hides behind
function restaurant(x, t, K) {
  x.save(); x.translate(OX, 0)
  K.room(x, t, { wall: '#3a1b2a', wall2: '#1c0d1e', floor: '#2b1622', floorY: 1460, frame: '#7a3a2a', warm: 0.6 })
  for (let i = 0; i < 12; i++) { const a = 0.5 + 0.5 * Math.sin(t * 2 + i); K.rect(x, 40 + i * 90, 170 + 26 * Math.sin(i * 0.9), 12, 12, `rgba(255,214,140,${0.4 + 0.6 * a})`) }
  // Saturn behind the plant, holding up BE HERE ♡
  const up = Math.max(0, Math.min(ease.outBack ? ease.outCubic(prog(t, SIGN[0], SIGN[0] + 0.35)) : 0, 1 - ease.inCubic(prog(t, SIGN[1] - 0.3, SIGN[1]))))
  const peek = Math.max(up, 0.35 * ease.outCubic(prog(t, HA, HA + 0.4)) * (1 - prog(t, 45.6, 46.1)))
  if (peek > 0.01) {
    K.saturn(x, t, { x: 560, y: 1120 - 330 * peek, size: 300, mood: t > HA ? 'happy' : 'sly', look: [-0.8, 0.5], rings: true })
    if (up > 0.01) { x.save(); x.translate(560, 1180 - 330 * up); x.rotate(0.05); K.box(x, -150, -60, 300, 120, '#fffaf0', { o: 5 }); K.txt(x, 'BE HERE ♡', 0, 2, { size: 40, font: K.INTER, weight: 900, color: '#c8243a' }); x.restore() }
  }
  // the plant
  K.box(x, 500, 1220, 120, 140, '#8a4a3a')
  for (let i = 0; i < 7; i++) { x.save(); x.translate(560, 1220); x.rotate(-1.2 + i * 0.4 + 0.05 * Math.sin(t * 2 + i)); K.box(x, -18, -260, 36, 260, i % 2 ? '#2aa86a' : '#3ac87a', { o: 3 }); x.restore() }
  // table + candle
  K.box(x, 80, 1360, 920, 36, '#e9d8c0'); K.box(x, 500, 1396, 80, 260, '#5a3a2a')
  K.box(x, 620, 1300, 22, 60, '#fff3dc'); const fl = 0.8 + 0.2 * Math.sin(t * 13); x.fillStyle = `rgba(255,190,90,${fl})`; x.beginPath(); x.ellipse(631, 1284, 9, 16 * fl, 0, 0, Math.PI * 2); x.fill()
  // Capricorn + the date
  const laugh = t > HA && t < HA + 2.4
  K.sign(x, t, 'capricorn', { x: 300, y: 1250 - (laugh ? Math.abs(Math.sin(t * 14)) * 30 : 0), s: 280, mood: t < 36 ? 'neutral' : t < 37.8 ? 'squint' : t < HA ? 'neutral' : laugh ? 'happy' : 'sparkle', look: t > WATCH[0] && t < WATCH[1] ? [-0.6, 1] : [1, -0.2] })
  K.sign(x, t, 'cancer', { x: 800, y: 1250, s: 260, mood: t < 40.2 ? 'happy' : t < 43 ? 'wink' : 'sparkle', look: [-1, 0], glyph: false, seed: 4 })
  const wk = K.inOut(t, WATCH[0], WATCH[1])
  if (wk > 0.01) K.watch(x, t, 180, 1300, 0.8, { pop: wk })
  if (laugh) { const hk = K.pop01(t, HA, 0.3, 2.6); x.save(); x.translate(300, 960); x.rotate(-0.1); x.scale(hk, hk); K.txt(x, 'HA!', 0, 0, { size: 120, font: K.INTER, weight: 900, color: K.GOLD }); x.restore() }
  // Pisces the intern, also behind the plant, crying
  K.intern(x, t, { x: 960, y: 1600, s: 190, tears: t > HA ? 3 : 2, mood: 'sparkle' })
  x.restore()
}
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
