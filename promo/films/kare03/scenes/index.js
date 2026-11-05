// kare03 — THE ALMOST RELATIONSHIP, Ep 3: "Month three, still no label" (18 s vertical, star_advice; dreamy · D; loop).
//   0.0–5.2   the wall calendar whip-flips by itself, pages flying: DATE 1 · DATE 7 · DATE 20 tags. Capricorn on the
//             couch stares up mid-flip; Sagittarius is asleep on Capricorn's shoulder. Hook "Three months. *Zero labels.*"
//   5.2–8.6   Capricorn: "it's been long enough… right?"  Sagittarius snores (z z z).
//   8.6–11.2  Pisces bursts in with the tissues, sobbing at the calendar: "THREE MONTHS?!"
//  11.2–18.0  THE STARS: "A calendar can't *define* anything." · "Time won't say it for you. *You can.*"
//             The last 0.45 s blend back into frame 0 (the kit's loop helper).
import { makeAlmost, drawApartment, APT, star, stars, standY, calendarPage, tag, say, sparkles, prog, ease, clamp, pop01, outK, R, INK } from '../../kare01/scenes/almostkit.js'

const D = 18
const T = { flips: [0, 5.2], ask: 5.4, pis: 8.6, wail: 9.1, stars: 11.2, l1: 11.6, l2: 14.1 }
const SEAT = APT.couch.seats, SY = APT.couch.seatY, SZ = 240, ty = standY(SZ, SY)
const CAL = { x: 330, y: 790, w: 230 }
const PAGES = [['SEP', '3'], ['SEP', '10'], ['SEP', '24'], ['OCT', '8'], ['OCT', '19'], ['NOV', '2'], ['NOV', '16'], ['NOV', '30'], ['DEC', '4']]
// page index at t (flips fast, slowing toward the end); frame 0 is mid-flip of page 0
const pageAt = t => Math.min(PAGES.length - 1, Math.floor(prog(t, -0.3, 5.0) ** 0.8 * (PAGES.length - 1) + 0.0001))
function calendar(x, t) {
  const n = t < T.flips[1] ? pageAt(t) : PAGES.length - 1
  calendarPage(x, CAL.x, CAL.y, CAL.w, { month: PAGES[n][0], day: PAGES[n][1], mark: n === PAGES.length - 1 ? 'TODAY' : null })
  // the page tearing off (the previous one) flies out
  if (t < T.flips[1] + 0.6) for (let k = 1; k <= 2; k++) {
    const m = n - k + 1, tStart = m <= 0 ? -0.35 : findStart(m)
    const p = (t - tStart) / 0.7
    if (p < 0 || p > 1 || m - 1 < -1) continue
    const prev = Math.max(0, m - 1)
    calendarPage(x, CAL.x + 520 * p * (k === 1 ? 1 : 0.8), CAL.y - 260 * p + 900 * p * p, CAL.w, { month: PAGES[prev][0], day: PAGES[prev][1], rot: 2.6 * p, alpha: 1 - p * 0.5 })
  }
}
// when page m first appears (pure search)
function findStart(m) { let lo = -0.3, hi = 5.0; for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (pageAt(mid) >= m) hi = mid; else lo = mid } return hi }

const shots = [
  { a: 0, b: T.stars, draw(x, t, S) {
    drawApartment(x, t, { lamp: 0.9 })
    calendar(x, t)
    const asking = t > T.ask
    star(x, 'capricorn', SEAT[0], ty, SZ, t, { mood: asking ? 'neutral' : 'wide', look: asking ? [1, -0.2] : [-0.6, -1], hops: [T.ask, T.ask + 0.6] })
    star(x, 'sagittarius', SEAT[0] + 210, ty + 18, SZ * 0.94, t, { mood: 'sleepy', rot: -0.42, bob: 2 })
    ;['DATE 1', 'DATE 7', 'DATE 20'].forEach((s, i) => tag(x, t, 0.6 + i * 1.5, 760, 700 + i * 110, s, { n: i + 1, size: 40, rot: [-0.06, 0.04, -0.03][i], out: [T.ask - 0.2, T.ask] }))
    say(x, t, 440, 1010, T.ask, T.pis, 'it’s been long enough… right?', { size: 30 })
    if (t > T.pis) {
      const pk = pop01(t, T.pis, 0.35, 2.2)
      star(x, 'pisces', 800, standY(250, 1250) + (1 - pk) * 400, 250, t, { tears: 3, mood: 'wide', look: [-1, -0.8], hops: [T.wail, T.wail + 0.5, T.wail + 1.0] })
      say(x, t, 740, 1010, T.wail, T.stars, 'THREE MONTHS?!', { size: 38 })
      sparkles(x, t, 830, 1100, T.wail, 10, 200, 5)
    }
    void S
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    drawApartment(x, t, { lamp: 0.8 })
    calendar(x, t)
    star(x, 'capricorn', SEAT[0], ty, SZ, t, { mood: t > T.l2 + 1.4 ? 'happy' : 'neutral', look: [0.4, -0.8], hops: [T.l2 + 1.3] })
    star(x, 'sagittarius', SEAT[0] + 210, ty + 18, SZ * 0.94, t, { mood: t > T.l2 + 1.5 ? 'wide' : 'sleepy', rot: t > T.l2 + 1.5 ? 0 : -0.42, bob: 2, hops: [T.l2 + 1.5] })
    star(x, 'pisces', 900, standY(150, 1240), 150, t, { tears: 2, mood: 'sparkle', look: [-1, -0.5], box: false })
    stars(x, 640, 820, 170, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.l2 + 1.6 ? 'happy' : 'neutral', look: [-0.3, 0.6], hops: [T.l1, T.l2, T.l2 + 0.7] })
  } },
]
function cam(t) {
  const hit = [T.ask, T.pis, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const up = -200 * ease.inOutCubic(prog(t, T.stars, T.stars + 0.5))
  return { z: 1.3 + 0.12 * k + 0.01 * Math.sin(t * 0.7), fx: 540, fy: 1150, dx: 40 * k, dy: up }
}
const E = makeAlmost({
  id: 'kare03', duration: D, ending: 'loop',
  hook: 'Three months. | *Zero labels.*', hookOut: [5.0, 5.3], hookTop: 1500,
  shots, cam,
  fx: [
    ['whipZoom', { at: 0.15, from: 1.4, blur: 12 }],
    ['screenShake', { at: T.wail, len: 0.5, amp: 18 }],
  ],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'A calendar can’t *define* anything.' },
    { t: T.l2, speaker: 'THE STARS', text: 'Time won’t say it for you. *You can.*' },
  ],
  cues: [
    ...Array.from({ length: PAGES.length - 1 }, (_, i) => ['whoosh', findStart(i + 1), 0.18, 0.025]),
    ...[0.6, 2.1, 3.6].map((a, i) => ['pop', a, [1174.66, 1318.51, 1567.98][i], 0.04, 0.2]),
    ['pop', T.ask, 659.25, 0.03, -0.2], ['pop', T.pis, 987.77, 0.04, 0.4], ['pop', T.wail, 1318.51, 0.035, 0.4],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0], ['pluck', T.l2 + 1.4, 1174.66, 0.035, 0.5, 0],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [clamp, outK, R, INK]
