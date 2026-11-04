// nrde11: RATE MY DATE IDEA, "Aquarius plans a thrift-shop challenge" (18 s vertical trial reel, music: pop · D).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “Thrift challenge. We dress *each other.*”  ♒ Aquarius holds up a sparkly cape in front of a clothes rack.
//   2.6–5.8   THE PLAN "a cape. a feather hat. *one* moon boot."  Three finds pop up from the rack, one by one.
//   5.8       card cut.
//   5.8–9.3   BUT… "their date wears it *all.* proudly."  The ♑ Capricorn date steps out in cape + feather hat + one boot,
//             strikes a pose; then holds up a giant sequin bow tie for Aquarius. Both: heart eyes.
//   9.32      THE STARS RATE IT 10/10 *iconic*.  Pisces: 11/10.   9.8 THE STARS: "Weird together is the *best* weird."
import { makeDate, R, box, bubble, shadow, hearts, card, sparkles, starFrame, floor, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

function rack(x, y = 700) {
  R(x, INK, 100, y, 880, 14); R(x, '#c9cfe0', 104, y + 3, 872, 8)
  R(x, INK, 110, y, 12, 560); R(x, INK, 958, y, 12, 560)
  const cols = ['#e8605c', '#4f7cd8', '#9fd36a', '#f2c75c', '#c9a6ff', '#ff8fb1', '#3fb08a', '#f39a3a']
  for (let i = 0; i < 9; i++) { const cx = 170 + i * 92; R(x, INK, cx - 2, y + 10, 4, 24); box(x, cx - 36, y + 34, 72, 170 + (i % 3) * 30, cols[i % 8], { b: 5 }) }
  x.save(); x.globalAlpha = 0.45; R(x, '#05030c', 100, y, 880, 560); x.restore()
}
function cape(x, t, cx, top, w = 200, h = 220, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w * 0.25 - 6, -6); x.lineTo(w * 0.25 + 6, -6); x.lineTo(w / 2 + 8, h + 6); x.lineTo(-w / 2 - 8, h + 6); x.closePath(); x.fill()
  x.fillStyle = '#7a3fd0'; x.beginPath(); x.moveTo(-w * 0.25, 0); x.lineTo(w * 0.25, 0); x.lineTo(w / 2, h); x.lineTo(-w / 2, h); x.closePath(); x.fill()
  for (let i = 0; i < 12; i++) { const a = Math.sin(t * 5 + i * 1.7); if (a > 0.3) R(x, i % 2 ? GOLD : BONE, -w * 0.35 + ((i * 37) % (w * 0.7)), 20 + ((i * 53) % (h - 40)), 8, 8) }
  x.restore()
}
function featherHat(x, cx, cy, k = 1, rot = -0.1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -70, -10, 140, 22, '#e8605c', { b: 5 }); box(x, -44, -52, 88, 44, '#e8605c', { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.ellipse(52, -96, 22, 64, 0.5, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#9fe6b0'; x.beginPath(); x.ellipse(52, -96, 15, 56, 0.5, 0, Math.PI * 2); x.fill()
  x.restore()
}
function moonBoot(x, cx, by, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.scale(k, k)
  box(x, -40, -120, 80, 120, '#d9dce8', { b: 6, hi: '#ffffff' }); box(x, -40, -40, 120, 40, '#d9dce8', { b: 6 })
  R(x, '#ff6b7f', -40, -80, 80, 12)
  x.restore()
}
function bowTie(x, t, cx, cy, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.08 * Math.sin(t * 6))
  for (const d of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.moveTo(0, 0); x.lineTo(d * 120, -70); x.lineTo(d * 120, 70); x.closePath(); x.fill(); x.fillStyle = '#ffd36b'; x.beginPath(); x.moveTo(d * 8, 0); x.lineTo(d * 108, -56); x.lineTo(d * 108, 56); x.closePath(); x.fill() }
  box(x, -22, -26, 44, 52, '#ff8fb1', { b: 5 })
  x.restore()
}

const EP = makeDate({
  id: 'nrde11', sign: 'aquarius', date: 'capricorn', accent: '#7fd0ff', deep: '#1f6aa8',
  idea: 'Thrift challenge. We dress *each other.*',
  hook(x, t, S) {
    rack(x, 640)
    floor(x, 1330, '#2a2148', '#3a2f62', 190)
    shadow(x, 380, 1340, 220)
    S.hero(x, t, { x: 380, y: 1110, s: 290, mood: 'sparkle', look: [1, -0.3], hops: S.HOOK_HOPS })
    cape(x, t, 740, 880 + Math.sin(t * 5) * 10, 240, 300, 1)
    sparkles(x, t, 740, 1000, 0.05, 8, 160, 1)
  },
  beats: [
    { caption: 'a cape. a feather hat. *One* moon boot.', draw(x, t, S) {
      const { u, hero } = S
      rack(x, 620)
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      cape(x, t, 330, 700, 180, 220, pop01(t, S.t0 + 0.15, 0.3, 2.4))
      featherHat(x, 560, 840, pop01(t, S.t0 + 0.9, 0.3, 2.4) * 1.2)
      moonBoot(x, 780, 1000, pop01(t, S.t0 + 1.65, 0.3, 2.4) * 1.2)
      card(x, 780, 690, 160, 70, 'x1', { size: 44, col: GOLD, k: pop01(t, S.t0 + 1.8, 0.3, 2.6), rot: 0.1 })
      shadow(x, 540, 1190, 170)
      hero(x, t, { x: 540, y: 1080, s: 170, mood: 'sparkle', look: [u < 0.9 ? -1 : u < 1.65 ? 0 : 1, -1], hops: [S.t0 + 0.15, S.t0 + 0.9, S.t0 + 1.65] })
    }, cues: [['pop', 0.15, 880, 0.04, -0.3], ['pop', 0.9, 1174.66, 0.04, 0], ['pop', 1.65, 1318.51, 0.045, 0.3], ['pluck', 1.8, 1760, 0.035, 0.3, 0.3]] },
    { caption: 'their date wears it *all.* Proudly.', draw(x, t, S) {
      const { u, hero, date } = S
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      // the date, fully dressed, posing
      const o = { x: 380, y: 1010, s: 200, mood: u < 1.3 ? 'sparkle' : 'heart', look: [0, 0], hops: [S.t0 + 0.2, S.t0 + 0.6, S.t0 + 1.4] }
      const F = starFrame(o.x, o.y, o.s, t, o)
      cape(x, t, o.x, F.cy - 70, 300, 230)
      date(x, t, o)
      featherHat(x, o.x - 6, F.cy - o.s * 0.42, 1, -0.15)
      moonBoot(x, o.x - 70, 1200, 0.9)
      sparkles(x, t, o.x, F.cy, S.t0 + 0.2, 10, 190, 1)
      // Aquarius gets a giant sequin bow tie
      shadow(x, 780, 1190, 170)
      const ho = { x: 780, y: 1030, s: 180, mood: u < 1.3 ? 'wide' : 'heart', look: [-1, 0], hops: [S.t0 + 1.35, S.t0 + 1.9] }
      hero(x, t, ho)
      bowTie(x, t, 780, lerp(760, 1110, ease.outCubic(prog(u, 1.1, 1.4))), pop01(t, S.t0 + 1.0, 0.3, 2.2) * 0.75)
      card(x, 540, 720, 280, 80, 'ICONIC', { size: 46, col: GOLD, k: pop01(t, S.t0 + 2.0, 0.3, 2.6), rot: -0.05 })
      hearts(x, t, S.t0 + 1.9, 580, 940, { n: 6 })
    }, cues: [['glitter', 0.2, 0.7], ['pop', 0.22, 1318.51, 0.045, -0.3], ['whoosh', 1.0, 0.4, 0.03], ['pop', 1.4, 1174.66, 0.04, 0.3], ['clap', 2.0, { gain: 0.12 }], ['clap', 2.25, { gain: 0.12 }]] },
  ],
  score: '10/10', word: 'iconic',
  last: 'Weird together is the *best* weird.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, PINK, bubble]
