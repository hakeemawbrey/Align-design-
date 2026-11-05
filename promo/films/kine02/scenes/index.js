// kine02: IS THIS NORMAL?, "Rereading old texts at 2 a.m." (19.6 s vertical, star_advice post, music: screwed · Fm).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Loop ending (back into frame 0).
//   0.00       frame 0: "2 a.m. reading | the *WHOLE* thread?" landed; ♏ Scorpio in bed, lit blue by the phone, thumb
//              mid-scroll; the bedside clock has just flipped to 2:00.
//   0.70       whip zoom into the phone: the thread scrolls back through the years (date stamps fly past).
//   1.6–5.6    "Reading old texts | at *2 a.m.*"  Record scratch + freeze at 3.0 on a bubble from two years ago:
//              "haha same" (caught). ♓ Pisces peeks over Scorpio's shoulder, crying at an old dog meme.
//   5.8–9.6    NORMAL-O-METER: NORMAL.
//   9.7–17.3   THE STARS: "late-night brains go *looking* for closure." → "phone in another room. write it in a *note*
//              instead."  Scorpio carries the phone out to charge in the hall, comes back, writes in a notebook.
//  17.4–19.6   last line: "The thread will still | be there at *noon.*"  Then the loop back into frame 0.
import {
  makeNormal, GOLD, BONE, PINK, INK, RED, MINT, CYAN, LAV, INTER, MONO, R, box, drawBits, sparkles, bubble, label, shadow, glowAt,
  room, miniPhone, starFrame, inSprite, tearsCells, pop01, outK, prog, lerp, clamp, ease, win, r3, signStar,
} from '../../kine01/normalkit.js'

const D = 19.6, FLOOR = 1360
const T = {
  whip: 0.7, h0Out: [1.4, 1.6], h1: 1.6, h1Out: [5.55, 5.75], rec: 3.0, pisIn: 3.9,
  meter: 5.85, mOut: [9.45, 9.7],
  starsIn: 9.6, l1: 9.85, l2: 13.3, boxClose: 17.2,
  walk: [13.5, 14.6], back: [14.9, 15.7], write: [15.8, 17.2],
  last: 17.45,
}

// ── the bedroom
function bedroom(x, t, glow = 1) {
  room(x, { y: FLOOR, wall: '#120d2e', floor: '#1d1640' })
  // window with the moon-blue night
  box(x, 700, 470, 260, 300, '#0d1a3a', { b: 8 }); R(x, INK, 826, 470, 8, 300); R(x, INK, 700, 616, 260, 8)
  for (let i = 0; i < 6; i++) drawBits(x, ['.S.', 'SSS', '.S.'], { S: '#cfe0ff' }, 730 + (i * 47) % 210, 500 + (i * 83) % 240, 3, { outline: null, alpha: 0.5 + 0.5 * Math.sin(t * 2 + i) })
}
function bed(x, t) {
  // headboard, mattress, pillow
  box(x, 110, 1060, 700, 70, '#4a3a7a', { b: 8, hi: '#5d4a96' })
  box(x, 130, 1130, 660, 220, '#2e2458', { b: 8 })
  box(x, 170, 1120, 200, 70, BONE, { b: 6, hi: '#fff' })
}
function blanket(x, t, bump = 0) {
  const y = 1220 - bump
  x.save(); x.fillStyle = INK; x.beginPath(); x.moveTo(120, 1360); x.lineTo(120, y + 18); x.quadraticCurveTo(460, y - 30, 820, y + 18); x.lineTo(820, 1360); x.fill()
  x.fillStyle = '#7a5fc8'; x.beginPath(); x.moveTo(128, 1356); x.lineTo(128, y + 26); x.quadraticCurveTo(460, y - 20, 812, y + 26); x.lineTo(812, 1356); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.12)'; for (let i = 0; i < 6; i++) x.fillRect(160 + i * 105, y + 60 + (i % 2) * 40, 60, 12)
  x.restore()
}
function clock(x, t, cx, cy, text, flip = 0) {
  box(x, cx - 90, cy, 180, 220, '#3a2d60', { b: 7 })
  box(x, cx - 80, cy - 70, 160, 64, '#0b0716', { b: 6 })
  x.save(); x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = RED; x.shadowColor = RED; x.shadowBlur = 12; x.fillText(text, cx, cy - 36 + flip * 6); x.restore()
  if (flip > 0) { x.save(); x.globalAlpha = flip; R(x, '#ff6b7f', cx - 74, cy - 40, 148, 4); x.restore() }
}

// the thread: bubbles scroll down (we're scrolling UP into the past); date stamps fly past
const THREAD = [
  ['STAMP', 'TWO YEARS AGO'], ['L', 'I think I like you'], ['R', 'haha same'], ['STAMP', 'LAST YEAR'], ['L', 'my dog says hi'],
  ['R', 'tell him I love him'], ['STAMP', 'MARCH'], ['L', 'remember the noodle place'], ['R', 'THE noodle place'],
  ['STAMP', 'LAST WEEK'], ['L', "hope you're well"],
]
function thread(x, t, P) {
  const { cx, top, w, h, scroll, alpha = 1 } = P
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha *= alpha
  box(x, cx - w / 2, top, w, h, '#120c2a', { b: 10 })
  R(x, '#1f1747', cx - w / 2, top, w, 80)
  x.font = `700 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♏︎ them', cx, top + 42)
  x.beginPath(); x.rect(cx - w / 2, top + 80, w, h - 80); x.clip()
  // newest at the bottom; scroll moves everything down
  let y = top + h - 60 + scroll
  for (let i = 0; i < THREAD.length; i++) {
    const [side, text] = THREAD[i]
    const yy = y - (THREAD.length - 1 - i) * 92
    if (yy < top - 100 || yy > top + h + 100) continue
    if (side === 'STAMP') { x.font = `700 24px ${MONO}`; x.fillStyle = GOLD; x.fillText(`— ${text} —`, cx, yy); continue }
    x.font = `600 30px ${INTER}`
    const bw = x.measureText(text).width + 40, bx = side === 'L' ? cx - w / 2 + 24 : cx + w / 2 - 24 - bw
    R(x, side === 'L' ? '#3b3466' : '#4f8df0', bx, yy - 32, bw, 64)
    x.fillStyle = BONE; x.textAlign = 'left'; x.fillText(text, bx + 20, yy + 2); x.textAlign = 'center'
  }
  x.restore()
}
const LAST_Y = i => (THREAD.length - 1 - i) * 92        // offset of bubble i above the bottom

const NOTE_LINES = ['things I miss:', '- the noodle place', '- being someone\'s', '  2 a.m.', 'ok. sleep now.']
function notebook(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  box(x, -150, -110, 300, 220, '#f4e8cc', { b: 7 }); R(x, RED, -126, -110, 4, 220)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#2c2a7a'; x.textAlign = 'left'
  const n = Math.floor(p * 60)
  let used = 0
  NOTE_LINES.forEach((l, i) => { const s = l.slice(0, Math.max(0, n - used)); used += l.length; x.fillText(s, -110, -76 + i * 38) })
  x.restore()
}

const EP = makeNormal({
  id: 'kine02', D, ending: 'loop', hero: 'scorpio',
  hook: { text: '2 a.m. reading | the *WHOLE* thread?', out: T.h0Out, accentColor: CYAN, top: 190 },
  whips: [{ at: T.whip, len: 0.45, from: 1.7, cx: 640, cy: 1000 }],
  rec: { at: T.rec, len: 1.2, caption: '“haha same” · *two years ago.*', top: 1580 },
  catch: { at: T.rec + 0.12, x: 850, y: 1010, r: 130, out: [T.rec + 1.05, T.rec + 1.2], label: null, arrow: null },
  heads: [{ text: 'Reading old texts | at *2 a.m.*', at: T.h1, out: T.h1Out, size: 96, accent: CYAN, late: 1, lateAt: T.h1 + 0.5 }],
  meter: { at: T.meter, land: 'normal', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: 'late-night brains go *looking* for closure.' },
    { t: T.l2, text: 'phone in another room. write it in a *note* instead.' },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'The thread will still | be there at *noon.*', at: T.last, lateAt: T.last + 0.6, accent: GOLD, size: 92 },
  punches: [T.h1, T.meter + 1.75],
  scene(x, t, S) {
    // act 1: the bed and the phone
    if (t < T.meter) {
      bedroom(x, t)
      clock(x, t, 940, 1150, '2:00', 1 - clamp(t / 0.25))
      bed(x, t)
      const big = ease.inOutCubic(prog(t, T.whip - 0.05, T.whip + 0.3))
      // Scorpio in bed, lit by the phone
      glowAt(x, 540, 1000, 360, '120,170,255', 0.35)
      const o = { x: 540, y: 1060, s: 340, mood: t > T.rec ? 'wide' : 'squint', look: [0.3, 0.6], hops: [T.rec + 1.25], seed: 3 }
      S.hero(x, t, o)
      if (t > T.pisIn) {
        const pk = pop01(t, T.pisIn, 0.35, 2.2) * outK(t, [T.meter - 0.2, T.meter])
        S.pis(x, t, { x: 170, y: 880, s: 170, pop: pk, tears: 3, mood: 'sparkle', look: [1, 0.4], say: [T.pisIn + 0.4, T.meter - 0.2, 'the dog!!'], sayDx: 30 })
      }
      blanket(x, t, 0)
      // the phone: small in the hand, then the whip pushes into the full thread
      if (big < 1) miniPhone(x, 690 + big * -150, 1150 - big * 300, { rot: -0.15, s: 1 + big, glow: 1, lines: [{ text: '♏︎ them', size: 16 }, { text: '▲ ▲ ▲', size: 20, col: CYAN, dy: 30 + 20 * Math.sin(t * 20) }] })
      if (big > 0) {
        // scroll: fast through the years, then stops on the last bubble (index 10)
        const sp = ease.outCubic(prog(t, T.whip, T.rec))
        const scroll = lerp(0, LAST_Y(2) - 250, sp)
        thread(x, t, { cx: 640, top: 560, w: 640, h: 760, scroll, alpha: big })
        // motion blur streaks while scrolling fast
        if (t < T.rec - 0.4) { x.save(); x.globalAlpha = 0.25 * (1 - sp); for (let i = 0; i < 8; i++) R(x, BONE, 360 + i * 70, 640 + ((t * 2400 + i * 170) % 640), 8, 50); x.restore() }
      }
      if (big > 0.5) S.hero(x, t, { x: 210, y: 1250, s: 170, mood: t > T.rec ? 'wide' : 'squint', look: [1, -0.6], seed: 3 })
      return
    }
    // the meter
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'happy' : 'squint', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'sparkle' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    // the answer: phone goes to the hall, the notebook comes out
    if (t >= T.mOut[0]) {
      bedroom(x, t)
      // the hall door at left, the phone charging on a little shelf there
      box(x, 40, 820, 200, 520, '#3a2d60', { b: 8 }); R(x, '#0b0716', 60, 840, 160, 500)
      R(x, INK, 70, 1000, 140, 14); R(x, '#8a6440', 74, 1002, 132, 8)
      clock(x, t, 940, 1150, t > T.write[0] ? '2:41' : '2:14', 0)
      bed(x, t)
      const walkOut = ease.inOutCubic(prog(t, ...T.walk)), walkBack = ease.inOutCubic(prog(t, ...T.back))
      const hx = t < T.back[0] ? lerp(540, 140, walkOut) : lerp(140, 540, walkBack)
      const phoneOnShelf = t > T.walk[1]
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      const o = { x: hx, y: t > T.walk[0] && t < T.back[1] ? 1230 : 1060, s: t > T.walk[0] && t < T.back[1] ? 220 : 340, pop: k, mood: t > T.write[0] ? 'happy' : 'neutral', look: t < T.l2 ? [0, -1] : [hx > 300 ? -1 : 1, 0], hops: [T.mOut[0] + 0.2, T.walk[0] + 0.2, T.walk[0] + 0.6, T.walk[1] - 0.1, T.back[0] + 0.2, T.back[0] + 0.6, T.write[0]], seed: 3 }
      S.hero(x, t, o)
      // the phone: in hand → on the hall shelf, charging (a little green bolt)
      if (!phoneOnShelf) { if (t > T.l2 - 0.3) miniPhone(x, hx + 120, o.y + 40, { rot: -0.15, s: 0.7, glow: 0.6 }) }
      else { miniPhone(x, 140, 950, { s: 0.42, glow: 0.3, lines: [{ text: '⚡', size: 40, col: MINT, dy: 50 }] }); label(x, 'charging.', 140, 1050, { size: 22, col: MINT }) }
      blanket(x, t, 0)
      notebook(x, t, 690, 1250, pop01(t, T.write[0], 0.3, 2.2), prog(t, T.write[0] + 0.2, T.write[1]))
      S.pis(x, t, { x: 880, y: 960, s: 160, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.write[0] ? 3 : 2, mood: t > T.write[0] ? 'happy' : 'wide', look: [-1, 0.4], hops: [T.write[0] + 0.2, T.last + 0.6] })
      S.stars(x, t, { x: 880, y: 640, s: 140, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.write[0] ? 'happy' : 'neutral', look: [-1, 0.3] })
    }
  },
  cues: [
    ['tick', 0.0, 0.06], ['pop', 0.02, 1318.51, 0.03, 0.4],
    ...Array.from({ length: 14 }, (_, i) => ['tick', r3(T.whip + 0.3 + i * 0.13 * (1 + i * 0.08)), 0.02]),
    ['pop', T.pisIn + 0.05, 987.77, 0.035, -0.4], ['pluck', T.pisIn + 0.45, 1174.66, 0.03, 0.4, -0.3],
    ['whoosh', T.walk[0], 0.4, 0.03], ['tick', T.walk[1], 0.06], ['pop', T.walk[1] + 0.05, 1567.98, 0.03, -0.5],
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.write[0] + 0.25 + i * 0.12), 0.015]),
    ['bell', T.write[0] + 0.2, 1760, 0.025, 1.0, 0.2],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, LAV, sparkles, bubble, shadow, starFrame, inSprite, tearsCells, win, signStar]
