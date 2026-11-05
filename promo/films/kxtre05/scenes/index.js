// kxtre05: GRWM, "GRWM: The Date I Almost Cancelled" (120 s vertical, Trends: Extended ep 5, rows in
// promo/films/month2/m41.md; music: pop · Bb). Engine: ../../kxtre01/scenes/xkit.js. No end card; hard cut.
// ♍ Virgo gets ready for a first date with ♈ Aries and nearly cancels. ♐ Sagittarius gives a pep talk on speaker;
// ♓ Pisces is on a laptop video call the whole time, crying (happy, then very happy).
//   0.0–3.6   frame 0: Virgo mid-fling of a sweater at the lens, three outfits mid-air, 6:02 PM; whip zoom
//   1 6:02 PM (too try-hard) · 2 6:14 PM (too not-try-hard) · 3 THE DRAFT ("so sorry, something came up", unsent)
//   4 6:31 PM (Sagittarius on speaker) · 5 THE HAIR (it does a thing; accepted) · 6 6:50 PM (the checklist)
//   7 THE DOUBT (the reflection blinks first) · 8 THE TEXT (Aries: "honestly I'm nervous too. still on?")
//   9 7:30 PM: the cancel draft deleted, out the door. Last: "Nervous, | *and going anyway.*"
import {
  makeEp, star, pisces, room, tag, sfx, hearts, sparkles, confetti, phone, label, clock, drawBits,
  prog, lerp, clamp, ease, R, box, GOLD, BONE, PINK, INK, MINT, SKYB, RED, INTER, r3,
} from '../../kxtre01/scenes/xkit.js'

const ACC = '#9fe6b0'
const VIR = 'virgo'
const CLOTHES = ['#ff8fb1', '#7fd0ff', '#f2c75c', '#c9a6ff', '#9fe6b0', '#ff7a5c']
function garment(x, cx, cy, col, rot = 0, s = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); drawBits(x, ['SS..SS', 'SSSSSS', '.SSSS.', '.SSSS.', '.SSSS.'], { S: col }, 0, 0, 22); x.restore() }
function pile(x, n) { for (let i = 0; i < n; i++) garment(x, 220 + (i * 53) % 160, 1210 - Math.floor(i / 3) * 40, CLOTHES[i % 6], (i % 3 - 1) * 0.4, 0.8) }
function laptop(x, t, cx, cy, tears = 2, mood = 'sparkle') {
  box(x, cx - 150, cy - 110, 300, 200, '#14102c', { b: 8 }); box(x, cx - 180, cy + 96, 360, 24, '#8a8aa0', { b: 6 })
  R(x, '#2a2058', cx - 140, cy - 100, 280, 180)
  x.save(); x.beginPath(); x.rect(cx - 140, cy - 100, 280, 180); x.clip()
  pisces(x, t, { x: cx, y: cy + 10, s: 150, tears, mood, look: [0, 0], noBox: true })
  x.restore()
  label(x, '● LIVE', cx + 90, cy - 80, { size: 20, col: RED })
}
function vroom(x, t, mins, warm = 0) {
  room(x, t, { wall: '#3a2a50', wall2: '#42305c', night: mins > 18 * 60 + 20, warm })
  box(x, 600, 560, 260, 420, '#b8d8f0', { b: 10 }); R(x, 'rgba(255,255,255,0.3)', 620, 580, 30, 160)
  laptop(x, t, 860, 1140)
  void mins
}
function hair(x, cx, top, t, wild) {
  for (let i = 0; i < 5; i++) { const a = -0.6 + i * 0.3 + (wild ? Math.sin(t * 9 + i) * 0.3 : 0), l = wild ? 60 + (i % 2) * 30 : 30; x.save(); x.translate(cx, top + 16); x.rotate(a); R(x, INK, -7, -l - 4, 14, l + 4); R(x, '#8a5a2a', -4, -l, 8, l); x.restore() }
}
const stamp = (m) => `${Math.floor(m / 60) - 12}:${String(Math.floor(m % 60)).padStart(2, '0')} PM`

function hook(x, t, S) {
  vroom(x, t, 18 * 60 + 2)
  pile(x, 4)
  star(x, t, VIR, { x: 420, y: 1000, s: 270, mood: 'squint', look: [0, 0], squash: 0.06, hops: [0.1, 0.9] })
  ;[[640, 600, 0], [300, 520, 1], [780, 820, 2]].forEach(([gx, gy, i]) => garment(x, gx + Math.sin(t * 2 + i) * 10, gy - t * 30, CLOTHES[i], t * 2 + i, 1.4))
  garment(x, 540, 900, '#ff7a5c', 0.3, 2.6)
  label(x, '6:02 PM', 900, 300, { size: 44, col: ACC, font: INTER, weight: 800 })
  void S
}

const C = []
const outfit = (name, mins, col, verdict, k) => ({ name, dur: 13, stamp: stamp(mins), caption: `outfit ${k}: *${verdict}*`,
  bubbles: [{ at: 4.0, end: 7.0, x: 420, y: 640, text: k === 1 ? 'is this… a lot?' : 'is this… nothing?', size: 38 }, { at: 7.2, end: 10.0, x: 860, y: 860, text: k === 1 ? 'you look AMAZING' : 'you look COZY', tail: -0.2, size: 32, col: '#cfe9ff' }],
  cues: [['whoosh', 1.4, 0.3, 0.03], ['pop', 2.2, 783.99, 0.04, -0.2], ['whoosh', 10.6, 0.4, 0.04], ['tom', 11.2, 120, { gain: 0.2, decay: 0.2 }]],
  draw(x, t, S) {
    vroom(x, t, mins)
    pile(x, k * 3 + Math.floor(prog(S.u, 10.6, 11.2)))
    const on = ease.outCubic(prog(S.u, 1.4, 2.2)), off = ease.inCubic(prog(S.u, 10.6, 11.4))
    star(x, t, VIR, { x: 420, y: 1040, s: 250, mood: S.u > 9 ? 'squint' : 'neutral', look: [1, -0.2], hops: S.hops(2.2, 4.0, 10.6) })
    if (on > 0 && off < 1) garment(x, lerp(420, 420, on) - off * 260, lerp(700, 1170, on) - off * 300, col, off * 4, 0.95)
    tag(x, verdict.toUpperCase(), 420, 760, S.w(9.4, 12.8), { bg: k === 1 ? PINK : SKYB, size: 36 })
  } })
C.push(outfit('6:02 PM', 18 * 60 + 2, '#f2c75c', 'too try-hard.', 1))
C.push(outfit('6:14 PM', 18 * 60 + 14, '#8a8aa0', 'too not-try-hard.', 2))
C.push({ name: 'THE DRAFT', dur: 14, stamp: '6:22 PM', caption: 'the *“something came up”* draft.',
  cues: [...Array.from({ length: 16 }, (_, i) => ['tick', r3(1.0 + i * 0.2), 0.02]), ...[6, 7, 8, 9, 10].map(v => ['tick', v, 0.05])],
  draw(x, t, S) {
    vroom(x, t, 18 * 60 + 22)
    pile(x, 7)
    star(x, t, VIR, { x: 300, y: 1060, s: 230, mood: 'squint', look: [1, -0.8], hops: S.hops(6, 7, 8, 9, 10) })
    phone(x, t, 640, 700, { w: 480, h: 680, title: '♈ ARIES', size: 30, msgs: [{ at: S.at(-60), me: false, text: 'see you at 7:30! :)' }], typing: { from: S.at(1.0), to: S.at(4.4), text: 'so sorry, something came up :(' } })
    const hov = S.u > 5.5 ? Math.sin(S.u * 5) * 16 : 0
    if (S.u > 5.5) { x.save(); x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.arc(820 + hov, 1000, 40, 0, Math.PI * 2); x.stroke(); x.restore() }
    tag(x, 'NOT SENT (YET)', 640, 1150, S.w(10.4, 14), { bg: GOLD, size: 36 })
  } })
C.push({ name: '6:31 PM', dur: 14, stamp: '6:31 PM', caption: 'the pep talk, *on speaker.*',
  fx: [['call', { at: 0.3, out: [3.2, 3.4], name: 'Sagittarius', sub: 'incoming call…', glyph: '♐', color: '#f0603a', answerAt: 2.4 }]],
  bubbles: [
    { at: 4.0, end: 7.0, x: 700, y: 620, text: 'you said you LIKE them!', tail: -0.2, size: 36, col: '#ffd9c0' },
    { at: 6.8, end: 9.6, x: 330, y: 700, text: 'what if I am weird?', size: 36 },
    { at: 9.4, end: 13.6, x: 700, y: 620, text: 'then they get to meet weird you. lucky.', tail: -0.2, size: 34, col: '#ffd9c0' },
  ],
  draw(x, t, S) {
    vroom(x, t, 18 * 60 + 31)
    pile(x, 7)
    box(x, 600, 1060, 120, 200, '#14102c', { b: 6 }); label(x, '((( ♐ )))', 660, 1040, { size: 26, col: '#ffb070', alpha: S.w(3.4, 14) })
    star(x, t, VIR, { x: 330, y: 1060, s: 240, mood: S.u > 10 ? 'happy' : 'neutral', look: [1, 0], hops: S.hops(6.8, 10.4) })
  } })
C.push({ name: 'THE HAIR', dur: 12, caption: 'the hair *does a thing.*',
  cues: [['pop', 2.0, 392, 0.05, 0], ['whoosh', 4.0, 0.2, 0.03], ['pop', 5.0, 392, 0.05, 0], ['whoosh', 6.6, 0.2, 0.03], ['pop', 7.4, 392, 0.05, 0], ['bell', 9.4, 1174.66, 0.03, 0.8, 0]],
  draw(x, t, S) {
    vroom(x, t, 18 * 60 + 40)
    const flat = (S.u > 4 && S.u < 5) || (S.u > 6.6 && S.u < 7.4)
    const F = star(x, t, VIR, { x: 420, y: 1040, s: 280, mood: S.u > 9.2 ? 'happy' : 'squint', look: [0, -1], hops: S.hops(2.0, 5.0, 7.4) })
    hair(x, 420, F.top, t, !flat && S.u > 2)
    tag(x, 'THE THING: ACCEPTED', 540, 560, S.w(9.4, 12), { bg: MINT, size: 40 })
  } })
C.push({ name: '6:50 PM', dur: 13, stamp: '6:50 PM', caption: 'the checklist. *of course.*',
  cues: [1.6, 3.6, 5.6, 7.6, 9.6].map(v => ['pop', v, 1046.5, 0.05, 0.3]),
  draw(x, t, S) {
    vroom(x, t, 18 * 60 + 50)
    box(x, 520, 420, 440, 560, BONE, { b: 8 })
    const items = ['charger', 'mints', 'question 1: favourite snack', 'question 2: best trip', 'question 3: cats or dogs']
    items.forEach((it, i) => {
      x.font = `800 ${i > 1 ? 24 : 34}px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText(it, 600, 500 + i * 96)
      R(x, INK, 540, 476 + i * 96, 36, 36); R(x, BONE, 545, 481 + i * 96, 26, 26)
      if (S.u > 1.6 + i * 2) { x.font = `800 40px ${INTER}`; x.fillStyle = '#2a9a5a'; x.fillText('✓', 541, 508 + i * 96) }
    })
    const F = star(x, t, VIR, { x: 280, y: 1060, s: 230, mood: 'happy', look: [1, -0.4], hops: S.hops(1.6, 3.6, 5.6, 7.6, 9.6) })
    hair(x, 280, F.top, t, true)
  } })
C.push({ name: 'THE DOUBT', dur: 13, caption: 'mirror pep talk. *it blinks first.*',
  bubbles: [{ at: 1.8, end: 4.8, x: 330, y: 640, text: 'what if it is awkward?', size: 36 }, { at: 5.4, end: 8.6, x: 730, y: 470, text: 'what if it is nice?', tail: -0.2, size: 36, col: '#d8ecff' }],
  cues: [['pluck', 5.2, 880, 0.04, 0.5, 0.3], ['tick', 9.4, 0.05], ['pop', 10.6, 659.25, 0.04, 0]],
  draw(x, t, S) {
    vroom(x, t, 18 * 60 + 58)
    x.save(); x.beginPath(); x.rect(600, 560, 260, 420); x.clip(); x.translate(730, 0); x.scale(-1, 1)
    star(x, t, VIR, { x: 0, y: 860, s: 220, mood: S.u > 5.2 ? 'happy' : 'neutral', look: [0, 0], blink: S.u > 9 && S.u < 9.6 ? 1 : false, alpha: 0.85, glyph: false })
    x.restore()
    const F = star(x, t, VIR, { x: 330, y: 1060, s: 240, mood: S.u > 10.4 ? 'happy' : 'wide', look: [1, -0.3], hops: S.hops(1.8, 10.6) })
    hair(x, 330, F.top, t, true)
    tag(x, 'THE REFLECTION BLINKED', 640, 1050, S.w(9.4, 13), { bg: GOLD, size: 30 })
  } })
C.push({ name: 'THE TEXT', dur: 12, stamp: '7:04 PM', caption: 'then *their* text.',
  fx: [['notif', { at: 0.8, out: [6.6, 6.9], title: 'texts', body: "Aries: honestly I'm *nervous too.* still on?", glyph: '♈', time: '7:04 PM' }]],
  cues: [['glitter', 2.4, 3.2], ['pluck', 2.6, 659.25, 0.04, 0.5, 0], ['pluck', 2.8, 783.99, 0.04, 0.5, 0]],
  draw(x, t, S) {
    vroom(x, t, 19 * 60 + 4, 1)
    const F = star(x, t, VIR, { x: 420, y: 1040, s: 280, mood: S.u > 2.4 ? 'heart' : 'wide', look: [0, -1], hops: S.hops(2.4, 2.9, 3.4) })
    hair(x, 420, F.top, t, true)
    if (S.u > 2.4) { hearts(x, t, S.at(2.4), 420, 840, { n: 7 }); hearts(x, t, S.at(5.4), 420, 840, { n: 5 }) }
    tag(x, 'THEY ARE NERVOUS TOO', 540, 560, S.w(7.0, 12), { bg: PINK, size: 40 })
  } })
C.push({ name: '7:30 PM', dur: 12.4, stamp: '7:30 PM', caption: null,
  bubbles: [{ at: 4.4, end: 8.4, x: 860, y: 900, text: 'you look like a person who is loved', tail: -0.2, size: 32, col: '#cfe9ff' }],
  cues: [...Array.from({ length: 10 }, (_, i) => ['tick', r3(0.6 + i * 0.12), 0.02]), ['whoosh', 2.4, 0.4, 0.04], ['pop', 3.6, 523.25, 0.05, -0.3]],
  draw(x, t, S) {
    room(x, t, { wall: '#3a2a50', wall2: '#42305c', night: true, warm: 1 })
    box(x, 80, 560, 240, 680, '#8a5a3a', { b: 8, hi: '#a8744c' }); R(x, GOLD, 280, 900, 20, 20)
    laptop(x, t, 860, 1140, 3, 'sparkle')
    phone(x, t, 560, 640, { w: 380, h: 460, title: 'DRAFTS', size: 26, typing: { from: S.at(-10), to: S.at(-9), text: 'so sorry, something came up :(', del: [S.at(0.6), S.at(1.8)] }, k: 1 - ease.inCubic(prog(S.u, 2.2, 2.6)) })
    const go = ease.inOutCubic(prog(S.u, 3.0, 4.2))
    const F = star(x, t, VIR, { x: lerp(560, 220, go), y: 1080, s: 240, mood: 'happy', look: [-1, 0], hops: S.hops(3.0, 3.4, 3.8) })
    hair(x, lerp(560, 220, go), F.top, t, true)
    if (S.u > 2.6) sparkles(x, t, 560, 640, S.at(2.6), 10, 160, 1)
  } })

const EP = makeEp({
  id: 'kxtre05', bug: 'GRWM: FIRST DATE', lead: VIR, accent: ACC, deep: '#2a8a5a',
  music: { style: 'pop', key: 'Bb', seed: 4105, breakdown: [81.6], lift: [94.6] },
  hook: {
    text: 'Get ready with me: | *almost cancelling.*', len: 3.6, draw: hook, top: 250, size: 96,
    fx: [['whip', { at: -0.08, len: 0.45, from: 1.3, blur: 6 }], ['shake', { at: 0.4, len: 0.4, amp: 18 }]],
  },
  promiseAt: 1.4,
  promise: 'do I go? *find out at 7:30.*',
  chapters: C,
  last: { text: 'Nervous, | *and going anyway.*', at: 10.9, top: 300, size: 100 },
  ending: 'cut',
  hits: [94.6, 108.2],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [confetti, clock, clamp, RED, SKYB, BONE, lerp]
