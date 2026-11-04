// nrde20: RATE MY DATE IDEA, "Scorpio plans a ghost-story walk" (18 s vertical trial reel, music: cinematic · Em).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “A ghost-story *history walk.*”  ♏ Scorpio holds up a lantern on an old cobbled street, eyebrows low.
//   2.6–5.8   THE PLAN "Scorpio tells the *spooky* part."  Lantern under the chin, Scorpio whispers the tale; the ♌ Leo
//             date grips the lantern pole, wide-eyed.
//   5.8       card cut.
//   5.8–9.3   BUT… "a cat. a bin lid. *CLANG.*"  A little cat bumps a bin lid; Scorpio jumps higher than the date;
//             both burst out laughing; the cat strolls off.
//   9.32      THE STARS RATE IT 8/10 *both screamed*.  Pisces: 10/10.   9.8 THE STARS: "It's okay to be the *scared* one."
import { makeDate, R, box, bubble, shadow, hearts, card, drawBits, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

function street(x, y) {
  R(x, '#2a2240', 0, y, 1080, 1320 - y)
  for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) R(x, '#3a3058', i * 130 + (r % 2) * 65 - 30, y + 14 + r * 40, 110, 28)
  // old buildings
  for (let i = 0; i < 3; i++) { const bx = 40 + i * 360; box(x, bx, y - 420 - (i % 2) * 60, 300, 420 + (i % 2) * 60, '#1f1838', { b: 6 }); for (let j = 0; j < 4; j++) R(x, j % 3 ? '#14102a' : '#ffd98c', bx + 40 + (j % 2) * 140, y - 380 - (i % 2) * 60 + Math.floor(j / 2) * 150, 80, 100) }
}
function lantern(x, t, cx, cy, s = 1) {
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, cy, 10, cx, cy, 260 * s); g.addColorStop(0, `rgba(255,200,110,${0.4 + 0.05 * Math.sin(t * 9)})`); g.addColorStop(1, 'rgba(255,200,110,0)'); x.fillStyle = g; x.fillRect(cx - 260 * s, cy - 260 * s, 520 * s, 520 * s); x.restore()
  R(x, INK, cx - 4 * s, cy - 70 * s, 8 * s, 30 * s)
  box(x, cx - 32 * s, cy - 44 * s, 64 * s, 80 * s, '#ffd98c', { b: 6 }); R(x, '#ffb347', cx - 12 * s, cy - 14 * s, 24 * s, 30 * s)
  R(x, INK, cx - 40 * s, cy - 48 * s, 80 * s, 10 * s); R(x, INK, cx - 40 * s, cy + 36 * s, 80 * s, 10 * s)
}
const CAT = ['K...K....', 'KK.KK....', 'KKKKK...K', 'KEKEK...K', 'KKKKKKKK.', '.KKKKKKK.', '.K.K.K.K.']
function cat(x, cx, cy, flip = 1) { drawBits(x, CAT, { K: '#3a3058', E: '#ffe58a' }, cx, cy, 12, { sx: flip, outline: '#0c0918' }) }
function binLid(x, cx, cy, rot, k = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); box(x, -70, -12, 140, 24, '#8c86a8', { b: 5 }); R(x, INK, -14, -26, 28, 14); x.restore() }
function bin(x, cx, by) { box(x, cx - 60, by - 130, 120, 130, '#6a6488', { b: 6 }); for (let i = 0; i < 3; i++) R(x, '#5a5470', cx - 60, by - 110 + i * 40, 120, 8) }

const EP = makeDate({
  id: 'nrde20', sign: 'scorpio', date: 'leo', accent: '#e5687a', deep: '#9a1f3a',
  idea: 'A ghost-story *history walk.*',
  sky: { dim: 0.75 },
  hook(x, t, S) {
    street(x, 1290)
    shadow(x, 520, 1330, 220)
    S.hero(x, t, { x: 520, y: 1100, s: 290, mood: 'squint', look: [0, 0], hops: S.HOOK_HOPS })
    lantern(x, t, 760, 1000 + Math.sin(t * 3) * 14, 1.3)
  },
  beats: [
    { caption: 'Scorpio tells the *spooky* part.', draw(x, t, S) {
      const { u, hero, date } = S
      street(x, 1150)
      shadow(x, 330, 1190, 160); shadow(x, 760, 1190, 160)
      hero(x, t, { x: 330, y: 1030, s: 190, mood: 'squint', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 1.4] })
      lantern(x, t, 380, 1130, 0.8)
      date(x, t, { x: 760, y: 1030, s: 180, mood: u < 1.2 ? 'neutral' : 'wide', look: [-1, 0], squash: u > 1.2 ? 0.03 * Math.sin(t * 40) : 0 })
      bubble(x, t, 330, 800, S.t0 + 0.4, S.t1, 'and on nights like this…', { size: 30, col: '#d9d2ff' })
      bubble(x, t, 760, 860, S.t0 + 1.6, S.t1, 'mm-hm. sure. totally fine.', { size: 28, tail: 0.2 })
    }, cues: [['riser', 0.3, 2.4, 0.012], ['pop', 0.42, 440, 0.025, -0.3], ['pop', 1.62, 880, 0.03, 0.3]] },
    { caption: 'a cat. a bin lid. *CLANG.*', draw(x, t, S) {
      const { u, hero, date } = S
      street(x, 1150)
      bin(x, 880, 1170)
      const hit = 0.45
      const lp = prog(u, hit, hit + 0.6)
      binLid(x, 880 + lp * 80, 1040 - 160 * Math.sin(Math.PI * lp) + lp * 120, lp * 3, 1)
      cat(x, lerp(1000, 820, prog(u, 0, hit)) + prog(u, 1.4, 2.6) * 400, 1100, u > 1.4 ? 1 : -1)
      if (u > hit && u < hit + 0.6) card(x, 760, 820, 250, 90, 'CLANG!', { size: 52, col: GOLD, rot: -0.1, k: pop01(t, S.t0 + hit, 0.2, 2.8) })
      const jump = Math.max(0, Math.sin(Math.PI * prog(u, hit + 0.05, hit + 0.6)))
      shadow(x, 280, 1190, 150); shadow(x, 560, 1190, 150)
      hero(x, t, { x: 280, y: 1030 - jump * 260, s: 180, mood: u < hit ? 'squint' : u < 1.2 ? 'wide' : 'happy', look: [1, 0], hops: [S.t0 + 1.3, S.t0 + 1.6, S.t0 + 1.9] })
      date(x, t, { x: 560, y: 1030 - jump * 90, s: 180, mood: u < hit ? 'neutral' : u < 1.2 ? 'wide' : 'happy', look: [-1, -0.5], hops: [S.t0 + 1.35, S.t0 + 1.65, S.t0 + 1.95] })
      lantern(x, t, 420, 1140, 0.7)
      bubble(x, t, 420, 760, S.t0 + 1.3, S.t1, 'HAHAHA you jumped first!', { size: 30 })
      hearts(x, t, S.t0 + 2.0, 420, 940, { n: 4 })
    }, cues: [['tick', 0.45, 0.09], ['boom', 0.45, 0.18], ['bell', 0.46, 2093, 0.03, 0.6, 0.4], ['whoosh', 0.5, 0.3, 0.04], ['pop', 1.32, 987.77, 0.035, -0.3], ['pop', 1.62, 1174.66, 0.035, 0], ['pluck', 2.0, 1567.98, 0.035, 0, 0.3]] },
  ],
  score: '8/10', word: 'both screamed',
  last: 'It’s okay to be the *scared* one.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, PINK, ease]
