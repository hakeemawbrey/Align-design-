// nole01: ONE-LINE ADVICE FOR YOUR SIGN, "Aries, when the date gets moved." (12 s vertical, star_advice trial,
// music: pop · C). Story 0–7.6, then the shared end card. The format lives in ./olkit.js (shared by nole01–nole24).
//   0.0–3.6   "*Aries*, when the date | gets *moved.*"  Aries mid-hop beside a buzzing phone: "so sorry!! can we do
//             thursday instead?"  Aries drafts "fine." (squints) … then deletes it letter by letter.
//   3.6       card flip.
//   3.6–7.6   ★ ONE LINE FOR YOU, ARIES → THE STARS: "A new day isn't | a *no.*"  Aries relaxes and pins THU ♥ on a
//             tiny calendar; Pisces cries happy tears into a tissue.
import { makeOneLine, miniPhone, box, R, label, shadow, sparkles, hearts, prog, clamp, pop01, outK, INK, BONE, GOLD, RED, INTER, MONO, r3 } from './olkit.js'

const DRAFT = 'fine.'
const D = { type: 1.35, hold: 2.25, del: [2.3, 2.75] }

function draft(x, t) {
  // the reply box under the phone: Aries types "fine." then deletes it
  let n = 0
  if (t > D.type) n = Math.min(DRAFT.length, Math.floor((t - D.type) / 0.11) + 1)
  if (t > D.del[0]) n = Math.max(0, DRAFT.length - Math.floor((t - D.del[0]) / ((D.del[1] - D.del[0]) / DRAFT.length)))
  box(x, 590, 1200, 400, 70, '#e9e2f5', { b: 5 })
  x.font = `700 34px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK
  const s = DRAFT.slice(0, n); x.fillText(s, 616, 1236)
  if (Math.floor(t * 3) % 2 === 0) R(x, INK, 620 + x.measureText(s).width, 1218, 4, 36)
  if (t > D.del[0] && t < D.del[1] + 0.3) label(x, '⌫ ⌫ ⌫', 790, 1310, { size: 30, col: GOLD })
}

function sit(x, t, S) {
  const { hero } = S
  shadow(x, 300, 1370, 240)
  const mood = t < D.type ? 'wide' : t < D.del[0] ? 'squint' : t < D.del[1] ? 'wide' : 'neutral'
  hero(x, t, { x: 300, y: 1180, s: 280, mood, look: [1, 0.2], hops: [-0.2, 0.45, 1.3, D.del[0] + 0.05], squash: t < 0.2 ? -0.06 : 0 })
  // steam puffs off Aries (it's a lot)
  for (let i = 0; i < 3; i++) { const p = ((t * 1.4 + i / 3) % 1); x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, BONE, 300 + (i - 1) * 70 + p * (i - 1) * 40, 980 - p * 120, 22, 22); x.restore() }
  miniPhone(x, t, { cx: 790, cy: 900, w: 400, h: 500, rot: 0.06, title: 'THEM ♡', buzz: [0, 0.6], msgs: [
    { at: -1, side: 'L', text: 'had the best time last week!' },
    { at: -1, side: 'L', text: 'so sorry!! can we do thursday instead?' },
  ] })
  draft(x, t)
}

function after(x, t, S) {
  const { hero, ok, T, u } = S
  const hk = pop01(t, T.heroIn, 0.38, 2.1) * ok
  shadow(x, 640, 1340, 220 * hk)
  hero(x, t, { x: 640, y: 1180, s: 250, pop: hk, mood: t > T.react ? 'happy' : 'wide', look: t > T.react ? [0, 0] : [-0.7, -0.8], hops: [T.heroIn + 0.3, T.react, T.react + 0.45] })
  // the tiny calendar: THU gets a heart
  const ck = pop01(t, T.react + 0.1, 0.3, 2.3) * ok
  if (ck > 0.01) {
    x.save(); x.translate(640, 900); x.rotate(-0.06); x.scale(ck, ck)
    box(x, -110, -90, 220, 180, BONE, { b: 6 }); R(x, RED, -110, -90, 220, 46)
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('DEC', 0, -66)
    x.fillStyle = INK; x.font = `800 58px ${INTER}`; x.fillText('THU', 0, 0)
    x.restore()
    hearts(x, t, T.react + 0.3, 800, 960, { n: 4, spread: 60 })
  }
  sparkles(x, t, 640, 1150, T.react, 8, 170, 2)
  void u; void clamp; void prog; void outK
}

const EP = makeOneLine({
  id: 'nole01', sign: 'aries', name: 'Aries', len: 12,
  hook: '*Aries*, when the date | gets *moved.*',
  line: 'A new day isn’t | a *no.*',
  sit, after,
  cues: [
    ['pop', 0.6, 1318.51, 0.04, 0.3], ['tick', 0.6, 0.03],
    ...Array.from({ length: DRAFT.length }, (_, i) => ['tick', r3(D.type + i * 0.11), 0.03]),
    ...Array.from({ length: DRAFT.length }, (_, i) => ['tick', r3(D.del[0] + i * 0.09), 0.025]),
    ['whoosh', 2.3, 0.3, 0.02],
    ['pop', 3.6 + 2.0, 1567.98, 0.035, 0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
