// klge04 · Your Sign's Love Glitch · "Gemini.exe: Subject Changed" (19 s vertical, star_advice post, loop).
//   0.0   frame 0: GEMINI.EXE switched topics. Again. Gemini mid-swerve away from a chat that says "can we talk about
//         us?", six browser tabs flying open around it. 0.5 whip onto the chat.
//   3.0   the glitch: changing the subject when it gets real. More tabs (a dog in a hat, snack rankings, the weather,
//         "octopuses have three hearts"); Gemini texts about the dog. RIO: "…us?"
//   7.4   error: TAB OVERLOAD.   9.1 Pisces pops out of the tray, crying.
//   11.1  THE STARS: "stay in the hard sentence *one line longer.*"   14.2 patch 1.4 installs.
//   15.6  the tabs close one by one; Gemini: "yeah. i want that too." RIO: "me too ♡"
//   17.1  last line "Stay for *one more sentence.*"   18.55 loop back into frame 0.
import { makeGlitch, R, box, label, phone, hearts, sparkles, osWindow, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const CLOSE = 15.6
const CHAT = [
  { from: 'RIO', text: 'can we talk about us?', at: -1 },
  { from: 'me', text: 'omg did you see this dog', at: 3.7 },
  { from: 'me', text: 'wait is it gonna rain', at: 5.2 },
  { from: 'RIO', text: '…us?', at: 6.5 },
  { from: 'me', text: 'yeah. i want that too.', at: 16.1 },
  { from: 'RIO', text: 'me too ♡', at: 16.8 },
]
// tabs: [open time, x, y, title, content, colour]
const TABS = [
  [-0.6, 520, 640, 'a dog in a hat', 'DOG', '#f2cf4a'],
  [-0.45, 600, 760, 'weather', 'cloudy-ish', '#7fd0f0'],
  [-0.3, 540, 880, 'snack rankings', '#1 crackers', '#f39a3a'],
  [-0.15, 640, 1000, 'fun fact', 'octopuses have 3 hearts', '#9fe6b0'],
  [0, 560, 1120, 'new tab', '…', '#c9a6ff'],
  [0.05, 680, 1230, 'new tab (2)', '…', '#ff8fb1'],
  [3.4, 500, 700, 'dog in a hat 2', 'DOG (again)', '#f2cf4a'],
  [4.2, 620, 840, 'is it gonna rain', 'maybe!', '#7fd0f0'],
  [4.9, 560, 980, 'top 10 sandwiches', '#1 grilled cheese', '#f39a3a'],
  [5.6, 660, 1110, 'how to change subject', 'too late', RED],
  [6.2, 520, 1240, 'new tab (37)', '…', '#c9a6ff'],
]
function tab(x, t, T, i) {
  const [at, tx, ty, title, body, col] = T
  if (t < at) return
  const close = CLOSE + (TABS.length - 1 - i) * 0.07
  if (t > close + 0.3) return
  const fly = ease.inCubic(prog(t, close, close + 0.3))
  const k = pop01(t, at, 0.24, 2.4)
  const X = tx + fly * 600, Y = ty - fly * 200
  osWindow(x, X, Y, 360, 200, title, { k: Math.min(1.2, k), accent: col, body: '#f4f0fa' })
  if (k > 0.6) label(x, body, X + 180, Y + 128, { size: body.length > 16 ? 24 : 36, col: INK, font: INTER, weight: 900 })
}

function scene(x, t, K) {
  R(x, '#1a1236', 70, 556, 940, 880)
  phone(x, t, { cx: 290, cy: 870, w: 400, h: 560, title: 'RIO', lines: CHAT, typing: [5.9, 6.5], size: 30, rot: -0.03, clock: '10:04', accent: '#a07f1a' })
  TABS.forEach((T, i) => tab(x, t, T, i))
  const calm = t >= CLOSE
  if (t > CLOSE + 0.5) { const k = pop01(t, CLOSE + 0.5, 0.3, 2.4); osWindow(x, 580, 760, 380, 260, 'tabs: 1', { k, accent: '#2f9a6e', body: '#f4f0fa' }); if (k > 0.6) { label(x, 'us', 770, 900, { size: 72, col: INK, font: INTER, weight: 900 }); hearts(x, t, CLOSE + 0.9, 770, 860, { n: 3 }) } }
  const sw = calm ? 0 : Math.sin(t * 3.2)
  K.hero(x, t, calm ? 290 : 300 + sw * 40, 1300, 240, { mood: calm ? (t > 16.8 ? 'heart' : 'neutral') : t > 7.4 && t < 9.1 ? 'wide' : 'sparkle', look: calm ? [-0.3, -1] : [1, -0.5], squash: calm ? 0 : -0.1, hops: [3.4, 4.2, 4.9, 5.6, 6.2, 16.1, 16.8] })
  if (t > 16.8) hearts(x, t, 16.8, 290, 1120, { n: 5 })
}

const F = makeGlitch({
  id: 'klge04', sign: 'gemini', len: 19, ending: 'loop',
  hook: 'GEMINI.EXE switched topics. *Again.*',
  err: { msg: ['Topic: "us"', 'Redirecting to: a dog.'], out: 2.75 },
  notResp: [[-1, 2.7], [7.4, 9.0]],
  hits: [{ kind: 'whip', at: 0.5, x: 290, y: 700, z: 0.35, hold: 0.5 }, { kind: 'glitch', at: 7.4, dur: 0.45 }, { kind: 'flash', at: CLOSE, col: MINT }],
  caps: [{ at: 3.0, out: 7.2, text: 'the glitch: changing the *subject* when it gets real' }],
  errs: [{ at: 7.5, out: 9.0, msg: ['TAB OVERLOAD.', 'Tabs: 37. Feelings: 1.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.1, out: 11.0, text: 'just answer them!! *sniff*', tears: 3 }],
  stars: [{ t: 11.15, text: 'stay in the hard sentence *one line longer.*' }],
  box: { close: 14.2 },
  patch: { at: 14.2, ver: '1.4', name: 'CLOSE THE TABS. STAY.', dur: 0.9, out: 15.5 },
  last: { at: 17.0, text: 'Stay for *one more sentence.*' },
  scene, accent: '#a07f1a',
  cues: [...TABS.filter(T => T[0] > 0).map(T => ['pop', T[0], 1046.5, 0.035, 0.4]), ...TABS.map((_, i) => ['tick', +(CLOSE + i * 0.07).toFixed(3), 0.03]), ['pop', 16.1, 880, 0.04, 0.3], ['bell', 16.8, 1318.51, 0.04, 1, 0]],
  music: { style: 'funk', key: 'Gm', seed: 1804, drop: 3.0, breakdown: [9.1], lift: [CLOSE] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
