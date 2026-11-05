// k5te02: 5 THINGS EVERY TAURUS NEEDS TO HEAR, "Taurus, the comfort zone talk" (11 s vertical, star_advice trial reel,
// music: lofi · F). Rows: promo/films/month2/m33.md #2. The format lives in ../../k5te01/fivekit.js.
//   0.00   frame 0: ♉ Taurus mid-bite of a giant sandwich (crumbs flying) as a notification banner drops and smacks the
//          screen: "you up for something NEW tonight?". Hook: "Taurus. *Put the snack* down."  Record scratch + freeze at 0.45.
//   1.45   1 "Slow is not *boring.*" · 2 "New can feel *safe* too." · 3 "Say the want *out loud.*" ·
//          4 "Stubborn isn't the same as *loyal.*" · 5 "You deserve to be *chosen loudly.*"
//   8.6    THE STARS: "Comfort is a place | you can *share.*"  Loops back into frame 0 over the last 0.45 s.
import { makeFive, R, INK, BONE, GOLD, debris, shadow, box, lerp, ease, clamp, INTER, MONO, SKYB } from '../../k5te01/fivekit.js'

const TAU = '#e9b24a'

function sandwich(x, cx, cy, s, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -170, -70, 340, 46, '#e6b26a', { b: 6, hi: '#f4cf8e' })
  R(x, '#6fcf6a', -182, -26, 364, 18); R(x, '#e8344e', -160, -8, 320, 18); R(x, '#ffd23a', -170, 10, 340, 14)
  box(x, -170, 26, 340, 40, '#e6b26a', { b: 6 })
  // the bite: a scalloped edge on the near end
  for (let i = 0; i < 4; i++) R(x, '#c98a4a', -176, -64 + i * 34, 16, 22)
  x.restore()
}
function notif(x, th) {
  const drop = ease.outBack ? ease.outBack(clamp((th + 0.25) / 0.35)) : clamp((th + 0.25) / 0.35)
  const y = lerp(-140, 470, drop)
  const k = 1 + 0.04 * Math.sin(th * 30) * Math.exp(-th * 5)
  x.save(); x.translate(540, y); x.rotate(-0.03); x.scale(k, k)
  box(x, -400, -70, 800, 140, BONE, { b: 7 })
  box(x, -376, -46, 92, 92, '#ff8fb1', { b: 4 })
  x.font = `700 26px ${MONO}`; x.fillStyle = '#6a6488'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('NEW MESSAGE · now', -262, -30)
  x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.fillText('you up for something NEW tonight?', -262, 18)
  x.restore()
}

const EP = makeFive({
  id: 'k5te02', sign: 'taurus', name: 'Taurus', accent: TAU, deep: '#9a6a10', D: 11, ending: 'loop',
  brk: { type: 'scratch', at: 0.45, caption: 'yep. *mid-bite.*' },
  hookLine: 'Taurus. *Put the snack* | down.',
  hook(x, th, S) {
    debris(x, th, 610, 1000, { n: 16, spread: 300, cols: ['#e6b26a', '#f4cf8e', '#6fcf6a'], sz: 22, seed: 5, v: 0.5 })
    shadow(x, 540, 1200, 300)
    S.hero(x, th, { x: 480, y: 1010, s: 350, mood: 'wide', look: [1, -1], squash: 0.08, bob: 0 })
    sandwich(x, 690 + 6 * Math.sin(th * 20) * Math.exp(-th * 2), 1020, 1.05, -0.18)
    notif(x, th)
  },
  items: [
    { text: 'Slow is not *boring.*', icon: 'plant', mood: 'happy' },
    { text: 'New can feel | *safe* too.', icon: 'house', mood: 'wide' },
    { text: 'Say the want | *out loud.*', icon: 'chat', mood: 'happy' },
    { text: 'Stubborn isn’t the | same as *loyal.*', icon: 'key', mood: 'squint' },
    { text: 'You deserve to be | *chosen loudly.*', icon: 'heart', mood: 'heart' },
  ],
  last: 'Comfort is a place | you can *share.*',
  music: { style: 'lofi', key: 'F', seed: 3302 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [GOLD, SKYB]
