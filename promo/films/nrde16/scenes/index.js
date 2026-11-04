// nrde16: RATE MY DATE IDEA, "Cancer plans cookies with Mom" (18 s vertical trial reel, music: lofi · Gb).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “Date three: cookies *with my mom.*”  ♋ Cancer in an apron, proudly holding up a tray of cookies.
//   2.6–5.8   THE PLAN "Mom's here. *Surprise!*"  Mom (a bone star in a flowery apron) waves from the kitchen door; the
//             ♍ Virgo date freezes mid-step: wide eyes.
//   5.8       card cut.
//   5.8–9.3   BUT… "Cancer checks in *first.*"  Cancer: "too soon? we can just go." The date breathes: "…okay. I'm in."
//             Mom holds up the date's wonky cookie like a trophy.
//   9.32      THE STARS RATE IT 7/10 *ask first next time*.  Pisces: 10/10.   9.8 THE STARS: "Meet the family when you're *both* ready."
import { makeDate, R, box, bubble, shadow, hearts, card, starFrame, floor, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, STAR } from '../../nrde01/scenes/datekit.js'
import { drawStarChar } from '../../startalk.js'

function apron(x, t, o, col = '#ffffff', dot = '#ff8fb1') {
  const F = starFrame(o.x, o.y, o.s, t, o)
  const top = F.cy + o.s * 0.17, w = o.s * 0.32, h = o.s * 0.2
  box(x, o.x - w / 2, top, w, h, col, { b: 4 })
  for (let i = 0; i < 4; i++) R(x, dot, o.x - w / 2 + 8 + (i % 2) * w * 0.5, top + 8 + Math.floor(i / 2) * h * 0.4, 6, 6)
}
function cookie(x, cx, cy, s = 1, wonky = 0) {
  x.save(); x.translate(cx, cy); x.scale(s * (1 + wonky * 0.25), s * (1 - wonky * 0.2)); x.rotate(wonky * 0.4)
  x.beginPath(); x.arc(0, 0, 32, 0, Math.PI * 2); x.fillStyle = INK; x.fill()
  x.beginPath(); x.arc(0, 0, 26, 0, Math.PI * 2); x.fillStyle = '#d99a52'; x.fill()
  R(x, '#5a3420', -12, -10, 7, 7); R(x, '#5a3420', 8, -2, 7, 7); R(x, '#5a3420', -4, 10, 7, 7)
  x.restore()
}
function tray(x, cx, cy, s = 1) { box(x, cx - 130 * s, cy - 14 * s, 260 * s, 28 * s, '#c9cfe0', { b: 5 }); for (let i = 0; i < 4; i++) cookie(x, cx - 90 * s + i * 60 * s, cy - 30 * s, 0.75 * s) }
function door(x, cx, by) { box(x, cx - 120, by - 380, 240, 380, '#ffd98c', { b: 7 }); R(x, '#f2c46b', cx - 100, by - 360, 200, 340) }
const mom = (x, t, o) => { drawStarChar(x, o.x, o.y, o.s, t, { color: '#f3e3c3', seed: 9, glow: 0.9, ...o }); apron(x, t, o, '#ffd6e4', '#ff6b8a') }

const EP = makeDate({
  id: 'nrde16', sign: 'cancer', date: 'virgo', accent: '#cfe0ff', deep: '#3a5ea8',
  idea: 'Date three: cookies *with my mom.*',
  hook(x, t, S) {
    floor(x, 1330, '#2a2148', '#3a2f62', 190)
    shadow(x, 540, 1340, 240)
    const o = { x: 540, y: 1100, s: 300, mood: 'sparkle', look: [0, 0], hops: S.HOOK_HOPS }
    S.hero(x, t, o); apron(x, t, o)
    tray(x, 540, 880 + Math.sin(t * 5) * 10, 1.6)
  },
  beats: [
    { caption: 'Mom’s here. *Surprise!*', draw(x, t, S) {
      const { u, hero, date } = S
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      door(x, 790, 1180)
      const mk = pop01(t, S.t0 + 0.3, 0.35, 2)
      if (mk > 0.01) mom(x, t, { x: 790, y: 1020, s: 200, pop: mk, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.7, S.t0 + 1.0, S.t0 + 1.3] })
      shadow(x, 220, 1190, 150); shadow(x, 470, 1190, 150)
      const o = { x: 220, y: 1050, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.3] }
      hero(x, t, o); apron(x, t, o)
      date(x, t, { x: 470, y: 1050, s: 170, mood: u < 0.9 ? 'happy' : 'wide', look: [1, 0], squash: u > 0.9 ? 0.06 * Math.sin(t * 30) * Math.exp(-(u - 0.9) * 3) : 0, hops: [S.t0 + 0.92] })
      bubble(x, t, 790, 720, S.t0 + 0.7, S.t1, 'hi sweetie!! cookies?', { size: 32, tail: 0 })
      card(x, 470, 820, 120, 90, '!!', { size: 60, col: GOLD, k: pop01(t, S.t0 + 0.95, 0.25, 2.6), rot: 0.1 })
    }, cues: [['tick', 0.3, 0.05], ['pop', 0.32, 880, 0.04, 0.3], ['pop', 0.72, 1174.66, 0.035, 0.3], ['pop', 0.96, 1567.98, 0.05, -0.2], ['whoosh', 0.92, 0.2, 0.03]] },
    { caption: 'Cancer checks in *first.*', draw(x, t, S) {
      const { u, hero, date } = S
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      shadow(x, 280, 1190, 150); shadow(x, 520, 1190, 150); shadow(x, 840, 1190, 150)
      const o = { x: 280, y: 1050, s: 170, mood: u < 1.2 ? 'neutral' : 'happy', look: [1, 0], hops: [S.t0 + 0.2, S.t0 + 1.3] }
      hero(x, t, o); apron(x, t, o)
      date(x, t, { x: 520, y: 1050, s: 170, mood: u < 1.2 ? 'neutral' : 'happy', look: [-1, 0], hops: [S.t0 + 1.25] })
      mom(x, t, { x: 840, y: 1040, s: 180, mood: u < 1.9 ? 'happy' : 'sparkle', look: [-1, -0.5], hops: [S.t0 + 1.95, S.t0 + 2.3] })
      bubble(x, t, 300, 820, S.t0 + 0.2, S.t0 + 1.25, 'too soon? we can just go.', { size: 30, tail: 0 })
      bubble(x, t, 520, 820, S.t0 + 1.25, S.t1, '…okay. I’m in.', { size: 32, tail: 0 })
      // mom holds up the date's wonky cookie like a trophy
      const ck = pop01(t, S.t0 + 1.95, 0.3, 2.4)
      if (ck > 0.01) { cookie(x, 840, 780 - 20 * Math.sin(t * 5), 1.6 * ck, 1); card(x, 840, 650, 220, 64, 'PERFECT!', { size: 32, col: GOLD, k: ck, rot: -0.05 }) }
      hearts(x, t, S.t0 + 1.6, 400, 1020, { n: 4 })
    }, cues: [['pop', 0.22, 659.25, 0.03, -0.3], ['pop', 1.27, 880, 0.035, 0], ['pop', 1.97, 1318.51, 0.045, 0.3], ['pluck', 2.05, 1567.98, 0.035, 0.3, 0.3]] },
  ],
  score: '7/10', word: 'ask first next time',
  last: 'Meet the family when you’re *both* ready.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, PINK, STAR, lerp, ease, prog]
