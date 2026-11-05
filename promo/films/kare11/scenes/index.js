// kare11 — THE ALMOST RELATIONSHIP, Ep 11: "Only texts after midnight" (16 s vertical, star_advice; synthwave · F#m; hard cut).
//   0.0–3.5   a dark bedroom: the phone lights up at 12:47 with "hey stranger" (Scorpio); Gemini mid-flinch awake in bed.
//             Hook "They only text | *after midnight.*"
//   3.5–7.4   the same room at noon: Gemini sends "lunch tomorrow?" … the thread just sits there. Tag: 12:04 PM · CRICKETS.
//   7.4–10.0  Pisces under a duvet, sobbing at a nature show on the laptop: "the baby OWL…"
//  10.0–16.0  THE STARS: "Late-night texts feel *close.*" · "Notice who makes plans *before noon.*"
//             14.8 Gemini puts the phone face down and gets comfy: "goodnight, phone." HARD CUT.
import { makeAlmost, bedroom, drawApartment, star, stars, say, tag, sparkles, lockPhone, bigPhone, prog, ease, pop01, R, box, INK, BONE } from '../../kare01/scenes/almostkit.js'

const D = 16
const T = { day: 3.5, send: 4.0, crick: 5.6, pis: 7.4, owl: 7.9, stars: 10.0, l1: 10.4, l2: 12.2, night: 14.8 }

function laptop(x, t, cx, cy) {
  box(x, cx - 150, cy - 110, 300, 190, '#2a2050', { b: 6 })
  const g = x.createLinearGradient(0, cy - 100, 0, cy + 70); g.addColorStop(0, '#7fd0a0'); g.addColorStop(1, '#3f8a5a'); x.fillStyle = g; x.fillRect(cx - 136, cy - 96, 272, 160)
  // a tiny owl on a branch
  R(x, '#5a3a2a', cx - 120, cy + 20, 240, 12); box(x, cx - 26, cy - 40, 52, 60, '#c9a26e', { b: 4 }); R(x, INK, cx - 14, cy - 26, 8, 8); R(x, INK, cx + 6, cy - 26, 8, 8)
  box(x, cx - 180, cy + 86, 360, 22, '#5a4e80', { b: 5 })
  x.save(); x.globalCompositeOperation = 'lighter'; const gl = x.createRadialGradient(cx, cy, 20, cx, cy, 380); gl.addColorStop(0, 'rgba(120,255,170,0.18)'); gl.addColorStop(1, 'rgba(120,255,170,0)'); x.fillStyle = gl; x.fillRect(cx - 400, cy - 400, 800, 800); x.restore()
  void t
}
const shots = [
  { a: 0, b: T.day, draw(x, t) {
    bedroom(x, t, { lamp: 0 })
    R(x, 'rgba(4,2,16,0.45)', 0, 0, 1080, 1920)
    star(x, 'gemini', 330, 1250, 300, t, { mood: 'wide', look: [1, -0.4], squash: -0.1 + 0.1 * prog(t, 0, 0.6), rot: 0.12, hops: [0.05] })
    lockPhone(x, t, 760, 1000, { w: 380, h: 680, time: '12:47', note: { from: 'SCORPIO', text: 'hey stranger' }, noteAt: -1, rot: 0.06, glow: 1.2 })
    // a pixel moon on the note
    R(x, '#ffe27a', 880, 1010, 26, 26); R(x, '#efe9fb', 892, 1004, 22, 22)
  } },
  { a: T.day, b: T.pis, draw(x, t) {
    drawApartment(x, t, { lamp: 0, time: 'dusk' })
    R(x, 'rgba(255,236,190,0.3)', 0, 0, 1080, 1920)
    star(x, 'gemini', 300, 1300, 260, t, { mood: t > T.crick ? 'squint' : 'happy', look: [1, -0.5], hops: [T.send] })
    bigPhone(x, t, 730, 1000, { w: 400, h: 640, k: 1.25, title: 'scorpio', msgs: [{ at: T.day - 1, side: 'L', text: 'hey stranger' }, { at: T.send, side: 'R', text: 'lunch tomorrow?' }] })
    tag(x, t, T.crick, 540, 420, '12:04 PM · CRICKETS', { size: 48, rot: -0.04 })
  } },
  { a: T.pis, b: T.stars, draw(x, t) {
    bedroom(x, t, { lamp: 0 })
    R(x, 'rgba(4,2,16,0.4)', 0, 0, 1080, 1920)
    laptop(x, t, 700, 1180)
    star(x, 'pisces', 330, 1230, 300, t, { tears: 3, mood: 'sparkle', look: [1, 0], hops: [T.owl, T.owl + 0.5] })
    box(x, 120, 1300, 440, 260, '#8a7ac0', { b: 7, hi: '#a898d8' })   // the duvet
    say(x, t, 420, 900, T.owl, T.stars, 'the baby OWL…', { size: 42 })
    sparkles(x, t, 330, 1150, T.owl, 10, 200, 7)
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    bedroom(x, t, { lamp: 0.25 })
    const nt = t > T.night
    star(x, 'gemini', 420, 1140, 280, t, { mood: nt ? 'sleepy' : 'neutral', look: [0.6, 0.4], rot: nt ? -0.2 : 0, hops: [T.night] })
    if (nt) box(x, 690, 1180, 160, 30, '#2a2050', { b: 6 })
    else lockPhone(x, t, 760, 1060, { w: 200, h: 340, time: '1:12', glow: 0.7 })
    say(x, t, 470, 850, T.night + 0.1, D + 1, 'goodnight, phone.', { size: 32 })
    star(x, 'pisces', 920, 1300, 130, t, { tears: 2, mood: 'sparkle', look: [-1, -0.3], box: false })
    stars(x, 540, 560, 170, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.l2 + 1.5 ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l2, T.l2 + 0.7] })
  } },
]
function cam(t) {
  const hit = [T.day, T.pis, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  return { z: 1.12 + 0.1 * k, fx: 540, fy: 1200, dx: 40 * k }
}
const E = makeAlmost({
  id: 'kare11', duration: D, ending: 'cut',
  hook: 'They only text | *after midnight.*', hookOut: [3.3, 3.5], hookTop: 220, hookSize: 108,
  shots, cam, flashCol: '#fff8e0',
  flash: t => (t >= T.day && t < T.day + 0.15 ? 0.7 * (1 - (t - T.day) / 0.15) : 0),
  fx: [['screenShake', { at: 0.05, len: 0.45, amp: 20 }], ['whipZoom', { at: 0.35, len: 0.4, from: 1.3, blur: 12, flash: 0.25 }]],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'Late-night texts feel *close.*' },
    { t: T.l2, speaker: 'THE STARS', text: 'Notice who makes plans *before noon.*' },
  ],
  cues: [['pop', 0.02, 1567.98, 0.04, 0.3], ['pop', 0.14, 1975.53, 0.03, 0.3], ['whoosh', T.day - 0.1, 0.3, 0.03], ['pop', T.send, 880, 0.035, 0.3],
    ...Array.from({ length: 6 }, (_, i) => ['tick', T.crick + i * 0.2, 0.025]), ['pop', T.owl, 1318.51, 0.035, -0.3], ['glitter', T.owl, T.owl + 0.5],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0], ['tick', T.night, 0.06]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void BONE
