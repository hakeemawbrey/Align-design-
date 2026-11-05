// kine20: IS THIS NORMAL? (long), "Everyone's pairing up for the holidays" (63.4 s vertical, star_advice post, music: jazzy · Eb).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Hard cut ending.
//   0.00       frame 0: "Everyone's coupled up. | Am I *behind?*" landed; ♍ Virgo mid-sprint past a wall of couples' holiday
//              photos as a "+1?" sign swings in and smacks them. Whip zoom.  2.4: "stay for the *twist.*"
//   CH 1 · THE FEED (2.6)
//     2.6   "Engaged. Moved in. | *Matching sweaters.*"  The feed scrolls: a ring, keys, two sweaters.
//     8.6   the party invite: "Name: Virgo  +1? ☐"  10.0 NEWS DESK: "Local Virgo, *still* a party of one".
//   CH 2 · THE FEELING (15.5)
//    16.0   "december can make single feel *louder.*"  A volume knob labelled SINGLE turns up.
//    20.0   "feeds show the highlights, not the *tuesdays.*"  HIGHLIGHT vs TUESDAY: the same couple, asleep at 8 p.m.
//    24.0   "your inside vs their outside is never a *fair* fight."
//   CH 3 · THE FACTS (29.0)
//    29.6   1 · No deadline: a calendar with no red circle.  36.0 2 · Not behind: runners in every direction.
//    42.4   3 · Love isn't only romance: hearts pop on friends, family, a dog.
//   CH 4 · THE TWIST (49.5)
//    50.0   NORMAL-O-METER: SO NORMAL.  55.0 the doorbell: Virgo's friends pile in for a friendsmas, paper crowns,
//           confetti. ♓ Pisces cries at the crowns.  56.4 "you're not doing this alone. look *around.*"
//    61.6   last line: "You’re not behind. | You’re on your own *clock.*"  Hard cut at 63.4.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, LAV, INTER, MONO, R, box, drawBits, HEART, sparkles, hearts, confetti, bubble, label, shadow, glowAt,
  room, pop01, outK, prog, lerp, clamp, ease, r3, signStar, drawStarChar,
} from '../../kine01/normalkit.js'

const D = 63.4, FLOOR = 1480
const VIR = '#9fe6b0'
const CH = [2.6, 15.5, 29.0, 49.5]
const T = {
  h0Out: [2.4, 2.6], promise: 2.4,
  h1: 2.6, h1Out: [8.4, 8.6], feed: [3.4, 5.0, 6.6], invite: 8.6, news: 10.0, newsOut: [14.9, 15.2],
  knob: 16.0, split: 20.0, fight: 24.0,
  facts: [29.6, 36.0, 42.4],
  meter: 50.0, mOut: [54.6, 54.9], bell: 55.0, pile: 55.6, last: 61.6,
}
const NEWS = { at: T.news, out: T.newsOut, headline: 'Local Virgo, *still* a party of one', tag: 'BREAKING', channel: 'STAR NEWS', ticker: ['matching sweaters spotted downtown', 'mistletoe traffic: heavy', 'forecast: cocoa'], clock: '7:45' }
const COUPLE_COLS = [['#f0603a', '#7fd0f0'], ['#ffe27a', '#ff8fb1'], ['#c9a6ff', '#e9b24a'], ['#7fd0f0', '#9fe6b0']]

function hall(x, t, warm = 0) {
  room(x, { y: FLOOR, wall: warm ? '#3a2438' : '#22183e', floor: '#30244c' })
  for (let i = 0; i < 14; i++) { const gx = i * 80 + 20, gy = 440 + 20 * Math.sin(i * 1.1); R(x, '#3f9a5f', gx, gy, 70, 14); if (i % 2) R(x, RED, gx + 30, gy + 12, 12, 12) }
}
function couplePhoto(x, t, cx, cy, s, cols, rot = 0, cap = '') {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -110, -130, 220, 260, '#f4e8cc', { b: 6 }); R(x, '#2b4a7a', -94, -114, 188, 180)
  drawStarChar(x, -40, -30, 90, t, { color: cols[0], mood: 'happy', look: [1, 0], tips: false, glow: 0, seed: 11 })
  drawStarChar(x, 40, -30, 90, t, { color: cols[1], mood: 'happy', look: [-1, 0], tips: false, glow: 0, seed: 12 })
  drawBits(x, HEART, { H: '#ff5c8a' }, 0, -90, 4)
  if (cap) { x.font = `700 18px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(cap, 0, 100) }
  x.restore()
}
function plusOneSign(x, t, cx, cy, swing) {
  x.save(); x.translate(cx, cy); x.rotate(swing)
  R(x, INK, -8, 0, 16, 220); R(x, '#a87a50', -4, 0, 8, 216)
  box(x, -110, -90, 220, 110, BONE, { b: 7 }); x.font = `800 64px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('+1?', 0, -34)
  x.restore()
}
function feedPost(x, t, i, k) {
  if (k <= 0.01) return
  const caps = ['we said YES', 'keys to our place!', 'matching sweaters season']
  x.save(); x.translate(540, 860); x.scale(k, k)
  box(x, -330, -330, 660, 640, '#120c2a', { b: 8 })
  R(x, ['#ffb38a', '#7fd0ff', '#c43a4a'][i], -300, -300, 600, 460)
  drawStarChar(x, -90, -90, 200, t, { color: COUPLE_COLS[i][0], mood: 'happy', look: [1, 0], tips: false, glow: 0.3, seed: 20 + i })
  drawStarChar(x, 90, -90, 200, t, { color: COUPLE_COLS[i][1], mood: 'happy', look: [-1, 0], tips: false, glow: 0.3, seed: 30 + i })
  if (i === 0) drawBits(x, ['.GGG.', 'G...G', 'G...G', '.GGG.'], { G: GOLD }, 0, 70, 12)
  if (i === 1) drawBits(x, ['YYY....', 'Y.YYYYY', 'YYY.Y.Y'], { Y: GOLD }, 0, 70, 12)
  if (i === 2) { R(x, '#2f9d5a', -170, -30, 160, 70); R(x, '#2f9d5a', 10, -30, 160, 70) }
  x.font = `700 28px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText(caps[i], -300, 220)
  x.font = `700 22px ${MONO}`; x.fillStyle = PINK; x.fillText('♥ 4,812', -300, 266)
  x.restore()
}
function invite(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 860); x.rotate(-0.04); x.scale(k, k)
  box(x, -330, -220, 660, 440, '#f4e8cc', { b: 8 }); R(x, RED, -330, -220, 660, 70)
  x.font = `800 34px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HOLIDAY PARTY · RSVP', 0, -185)
  x.font = `800 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText('Name: Virgo', -280, -80)
  x.fillText('+1?', -280, 20); box(x, -170, -10, 60, 60, BONE, { b: 5 })
  const n = ease.outCubic(prog(t, T.invite + 0.8, T.invite + 1.1))
  if (n > 0) { x.font = `800 30px ${INTER}`; x.fillStyle = '#8a2b4e'; x.fillText('"…just me?"', -80, 22) }
  x.restore()
}
function knob(x, t, k) {
  if (k <= 0.01) return
  const v = ease.inOutCubic(prog(t, T.knob + 0.6, T.knob + 2.6))
  x.save(); x.translate(540, 860); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 200, 0, Math.PI * 2); x.fill(); x.fillStyle = '#4a4270'; x.beginPath(); x.arc(0, 0, 186, 0, Math.PI * 2); x.fill()
  for (let i = 0; i <= 10; i++) { const a = Math.PI * 0.75 + i / 10 * Math.PI * 1.5; R(x, i / 10 <= v ? GOLD : 'rgba(239,230,214,0.3)', Math.cos(a) * 240 - 8, Math.sin(a) * 240 - 8, 16, 16) }
  const a = Math.PI * 0.75 + v * Math.PI * 1.5
  x.strokeStyle = BONE; x.lineWidth = 18; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 150, Math.sin(a) * 150); x.stroke()
  label(x, 'SINGLE', 0, 290, { size: 40, col: GOLD, font: INTER, weight: 800 })
  if (v > 0.9) label(x, 'LOUD', 0, -290, { size: 40, col: RED, font: INTER, weight: 800, alpha: Math.floor(t * 5) % 2 ? 1 : 0.4 })
  x.restore()
}
function highlightVsTuesday(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  couplePhoto(x, t, 290, 860, 1.6, COUPLE_COLS[1], -0.04)
  label(x, 'THE HIGHLIGHT', 290, 1110, { size: 30, col: GOLD, font: INTER, weight: 800 })
  const b = pop01(t, T.split + 1.2, 0.3, 2.4)
  if (b > 0.01) {
    x.save(); x.translate(800, 860); x.scale(b * 1.6, b * 1.6); x.rotate(0.04)
    box(x, -110, -130, 220, 260, '#f4e8cc', { b: 6 }); R(x, '#3a3058', -94, -114, 188, 180)
    box(x, -90, -10, 180, 50, '#6a5aa8', { b: 4 })
    drawStarChar(x, -40, -30, 80, t, { color: COUPLE_COLS[1][0], mood: 'sleepy', tips: false, glow: 0, seed: 13 })
    drawStarChar(x, 40, -30, 80, t, { color: COUPLE_COLS[1][1], mood: 'sleepy', tips: false, glow: 0, seed: 14 })
    x.font = `700 18px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('asleep at 8 p.m.', 0, 100)
    x.restore()
    label(x, 'A TUESDAY', 800, 1110, { size: 30, col: CYAN, font: INTER, weight: 800, alpha: b })
  }
  x.restore()
}
function noDeadline(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 860); x.scale(k, k)
  box(x, -330, -250, 660, 500, BONE, { b: 8 }); R(x, '#5a4a8a', -330, -250, 660, 60)
  x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LOVE DEADLINE', 0, -220)
  for (let w = 0; w < 4; w++) for (let i = 0; i < 7; i++) { x.strokeStyle = 'rgba(27,18,54,0.25)'; x.lineWidth = 3; x.strokeRect(-310 + i * 88, -170 + w * 100, 86, 96) }
  const s = ease.outCubic(prog(t, T.facts[0] + 1.5, T.facts[0] + 2.0))
  if (s > 0) { x.save(); x.rotate(-0.12); x.scale(lerp(1.6, 1, s), lerp(1.6, 1, s)); x.globalAlpha = s; x.strokeStyle = MINT; x.lineWidth = 10; x.strokeRect(-220, -60, 440, 120); x.font = `800 60px ${INTER}`; x.fillStyle = MINT; x.fillText('NONE.', 0, 6); x.restore() }
  x.restore()
}
function runners(x, t, k, a) {
  if (k <= 0.01) return
  const cols = ['#f0603a', '#7fd0f0', '#ffe27a', '#c9a6ff', '#ff8fb1', '#e9b24a']
  cols.forEach((c, i) => {
    const ang = i / cols.length * Math.PI * 2 + 0.3, d = 80 + 300 * ((t - a) * 0.25 % 1)
    drawStarChar(x, 540 + Math.cos(ang) * d, 880 + Math.sin(ang) * d * 0.6, 130, t, { color: c, mood: 'happy', look: [Math.cos(ang), Math.sin(ang)], seed: 40 + i, glow: 0.4, pop: k })
  })
  label(x, 'every direction is a direction.', 540, 1260, { size: 30, col: GOLD, font: INTER, weight: 800, alpha: k })
}
function loveIcons(x, t, k, a) {
  const IC = [['FRIENDS', 290, 720, '#ff8fb1'], ['FAMILY', 790, 720, GOLD], ['THE DOG', 290, 1080, '#d99a52'], ['YOU', 790, 1080, MINT]]
  IC.forEach(([cap, cx, cy, col], i) => {
    const kk = pop01(t, a + 0.8 + i * 1.0, 0.3, 2.6) * k
    if (kk <= 0.01) return
    drawBits(x, HEART, { H: col }, cx, cy, 20 * kk)
    label(x, cap, cx, cy + 110, { size: 30, col, font: INTER, weight: 800, alpha: kk })
    sparkles(x, t, cx, cy, a + 0.8 + i * 1.0, 8, 120, i, [col, BONE])
  })
}
function crown(x, cx, cy, s, col) { drawBits(x, ['C.C.C', 'CCCCC', 'CCCCC'], { C: col }, cx, cy, 7 * s) }

const EP = makeNormal({
  id: 'kine20', D, ending: 'cut', hero: 'virgo',
  hook: { text: 'Everyone’s coupled up. | Am I *behind?*', out: T.h0Out, accentColor: VIR },
  promise: { text: 'stay for the *twist.*', at: T.promise, out: [5.8, 6.1], top: 1640 },
  chapters: [
    { at: CH[0], out: [CH[0] + 3.0, CH[0] + 3.3], n: 1, title: 'the feed', y: 450 },
    { at: CH[1], out: [CH[1] + 3.0, CH[1] + 3.3], n: 2, title: 'the feeling', y: 450, color: CYAN },
    { at: CH[2], out: [CH[2] + 3.0, CH[2] + 3.3], n: 3, title: 'the facts', y: 450, color: MINT },
    { at: CH[3], out: [CH[3] + 3.0, CH[3] + 3.3], n: 4, title: 'the twist', y: 450, color: PINK },
  ],
  fx: [[hook.newsDesk, hook.newsDeskCues, NEWS]],
  heads: [
    { text: 'Engaged. Moved in. | *Matching sweaters.*', at: T.h1, out: T.h1Out, size: 92, accent: VIR, late: 2, lateAt: T.feed[2] },
    { text: '1 · No *deadline.*', at: T.facts[0] + 0.2, out: [T.facts[1] - 0.3, T.facts[1] - 0.1], size: 96, accent: MINT, late: 1, lateAt: T.facts[0] + 0.5 },
    { text: '2 · Not behind. | Just *you.*', at: T.facts[1] + 0.2, out: [T.facts[2] - 0.3, T.facts[2] - 0.1], size: 96, accent: MINT, late: 1, lateAt: T.facts[1] + 0.6 },
    { text: '3 · Love isn’t only | *romance.*', at: T.facts[2] + 0.2, out: [CH[3] - 0.3, CH[3] - 0.1], size: 92, accent: MINT, late: 1, lateAt: T.facts[2] + 0.7 },
  ],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  boxes: [
    { lines: [{ t: 16.0, text: 'december can make single feel *louder.*' }, { t: 20.0, text: 'feeds show the highlights, not the *tuesdays.*' }, { t: 24.0, text: 'your inside vs their outside is never a *fair* fight.' }], close: 28.7, y: 1460 },
    { lines: [{ t: 30.4, text: "there's no deadline on love. *none.*" }, { t: 36.8, text: "you're not late. you're on *your* road." }, { t: 43.2, text: "love isn't only romance. it's *everywhere.*" }], close: 49.2, y: 1460 },
    { lines: [{ t: 56.4, text: "you're not doing this alone. look *around.*" }], close: 61.3, y: 1460 },
  ],
  stars: { in: 15.8 },
  last: { text: 'You’re not behind. | You’re on your own *clock.*', at: T.last, lateAt: T.last + 0.75, accent: GOLD, size: 88 },
  punches: [CH[0], ...T.feed, T.invite, CH[1], T.split + 1.2, T.fight, CH[2], ...T.facts, CH[3], T.meter + 1.75, T.pile],
  shakes: [{ t: 0.05, a: 18 }, { t: T.bell, a: 10 }, { t: T.pile, a: 14 }],
  scene(x, t, S) {
    const pis = o => S.pis(x, t, o)
    if (t < CH[0]) {
      hall(x, t)
      // the wall of couples' photos, Virgo sprinting past, the +1? sign smacking in
      COUPLE_COLS.forEach((c, i) => couplePhoto(x, t, 150 + i * 260, 700 + (i % 2) * 40, 0.9, c, (i % 2 ? 0.05 : -0.05)))
      const run = t * 260
      S.hero(x, t, { x: 320 + run, y: 1200, s: 340, mood: 'wide', look: [1, -0.3], squash: -0.06 + 0.06 * Math.sin(t * 24), hops: [0.0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1] })
      plusOneSign(x, t, 820, 900, -0.6 * Math.exp(-Math.max(0, t + 0.2) * 3) * Math.cos(t * 12))
      pis({ x: 160, y: 1640, s: 170, tears: 2, mood: 'wide', look: [1, -0.6], tissues: 'right' })
      return
    }
    if (t < CH[1]) {
      hall(x, t)
      if (t < T.invite) { const i = t < T.feed[1] ? 0 : t < T.feed[2] ? 1 : 2; feedPost(x, t, i, pop01(t, T.feed[i], 0.3, 2.2) * outK(t, [(i < 2 ? T.feed[i + 1] : T.invite) - 0.2, i < 2 ? T.feed[i + 1] : T.invite])) }
      else if (t < T.news) invite(x, t, pop01(t, T.invite, 0.35, 2.2) * outK(t, [T.news - 0.2, T.news]))
      S.hero(x, t, { x: 240, y: t < T.news ? 1320 : 1100, s: t < T.news ? 230 : 300, mood: t > T.invite + 0.8 ? 'squint' : 'wide', look: [1, -1], hops: [...T.feed, T.invite + 0.8] })
      pis({ x: 860, y: t < T.news ? 1330 : 1100, s: 210, tears: 3, mood: 'wide', look: [-1, -1], tissues: 'left' })
      return
    }
    if (t < CH[2]) {
      hall(x, t)
      if (t < T.split) knob(x, t, pop01(t, T.knob, 0.35, 2.2) * outK(t, [T.split - 0.3, T.split]))
      else if (t < T.fight) highlightVsTuesday(x, t, pop01(t, T.split, 0.35, 2.2) * outK(t, [T.fight - 0.3, T.fight]))
      else {
        // inside vs outside: a boxing-ring bell, a cosy Virgo vs a glossy poster
        const k = pop01(t, T.fight, 0.35, 2.2) * outK(t, [CH[2] - 0.4, CH[2] - 0.1])
        x.save(); x.globalAlpha *= k
        couplePhoto(x, t, 760, 860, 1.5, COUPLE_COLS[2], 0.05, 'their outside')
        S.hero(x, t, { x: 290, y: 900, s: 280, mood: 'squint', look: [1, 0], pop: k })
        label(x, 'your inside', 290, 1110, { size: 28, col: VIR, font: INTER, weight: 800 })
        label(x, 'VS', 540, 860, { size: 64, col: RED, font: INTER, weight: 800 })
        label(x, 'not a fair fight.', 540, 1200, { size: 34, col: GOLD, font: INTER, weight: 800, alpha: prog(t, T.fight + 2, T.fight + 2.4) })
        x.restore()
      }
      if (t < T.fight) S.hero(x, t, { x: 230, y: 1330, s: 200, mood: 'neutral', look: [1, -1], hops: [T.knob + 2.6, T.split + 1.2] })
      pis({ x: 880, y: 1330, s: 190, tears: 3, mood: 'wide', look: [-1, -1], hops: [T.split + 1.3] })
      S.stars(x, t, { x: 140, y: 620, s: 120, pop: pop01(t, 15.8, 0.35, 2.1), mood: 'neutral', look: [1, 0.4] })
      return
    }
    if (t < CH[3]) {
      hall(x, t)
      const i = t < T.facts[1] ? 0 : t < T.facts[2] ? 1 : 2
      const a = T.facts[i], b = i < 2 ? T.facts[i + 1] : CH[3] - 0.2, k = pop01(t, a, 0.35, 2.2) * outK(t, [b - 0.3, b])
      if (i === 0) noDeadline(x, t, k)
      else if (i === 1) runners(x, t, k, a)
      else loveIcons(x, t, k, a)
      S.hero(x, t, { x: 220, y: 1340, s: 200, mood: 'happy', look: [1, -1], hops: [a + 1.5, a + 3.5, a + 5.5] })
      pis({ x: 880, y: 1340, s: 190, tears: 3, mood: 'sparkle', look: [-1, -1], hops: [a + 2.5, a + 4.5] })
      S.stars(x, t, { x: 960, y: 620, s: 110, mood: 'happy', look: [-1, 0.4] })
      return
    }
    hall(x, t, t > T.pile ? 1 : 0)
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut) * pop01(t, CH[3] + 0.2, 0.3, 2), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 180, mood: t > land ? 'sparkle' : 'wide', look: [1, -1], pop: k, hops: [land] })
      pis({ x: 850, y: 1560, s: 180, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      // the door + doorbell, then the friends pile in
      box(x, 760, 760, 240, 560, '#8a4a3a', { b: 8 }); R(x, GOLD, 960, 1040, 20, 20)
      if (t > T.bell && t < T.pile + 0.4) label(x, 'DING DONG', 880, 700, { size: 40, col: GOLD, font: INTER, weight: 800, rot: -0.06 })
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      S.hero(x, t, { x: 250, y: 1160, s: 300, pop: k, mood: t > T.pile ? 'sparkle' : 'wide', look: t > T.pile ? [1, 0] : [1, -0.3], hops: [T.bell + 0.1, T.pile + 0.2, 58, 59.5] })
      if (t > T.pile) crown(x, 250, 1000, 1.4, VIR)
      const FR = [['#f0603a', 530], ['#7fd0f0', 680], ['#ffe27a', 830], ['#c9a6ff', 980]]
      FR.forEach(([c, fx], i) => {
        const pk = pop01(t, T.pile + i * 0.18, 0.3, 2.4)
        if (pk <= 0.01) return
        const px = lerp(880, fx, ease.outCubic(prog(t, T.pile + i * 0.18, T.pile + i * 0.18 + 0.5)))
        drawStarChar(x, px, 1250, 200, t, { color: c, mood: 'happy', look: [-1, 0], seed: 50 + i, pop: pk, hops: [T.pile + 0.6 + i * 0.1, 59 + i * 0.2] })
        crown(x, px, 1150, 1.1, [GOLD, PINK, MINT, CYAN][i])
      })
      if (t > T.pile) { confetti(x, t, T.pile + 0.3, 540, 900, { n: 40, life: 2.6 }); label(x, 'FRIENDSMAS!', 540, 820, { size: 54, col: GOLD, font: INTER, weight: 800, alpha: pop01(t, T.pile + 0.4, 0.3, 2.4) * outK(t, [T.last - 0.4, T.last - 0.1]) }) }
      pis({ x: 170, y: 720, s: 170, pop: k, tears: 3, mood: t > T.pile ? 'sparkle' : 'wide', look: [1, -0.4], hops: [T.pile + 0.5, T.last + 0.5], say: [T.pile + 0.8, T.last - 0.1, 'the CROWNS'], sayDx: 170, sayDy: 120, saySize: 30 })
      if (t > T.pile) crown(x, 170, 600, 1, PINK)
    }
  },
  cues: [
    ...Array.from({ length: 9 }, (_, i) => ['tick', r3(i * 0.28), 0.03]), ['tom', 0.05, 120, { gain: 0.2, decay: 0.2 }],
    ...T.feed.map((f, i) => ['whoosh', r3(f - 0.05), 0.3, 0.04]), ...T.feed.map((f, i) => ['pop', r3(f + 0.2), [1174.66, 1318.51, 1567.98][i], 0.04, 0]),
    ['whoosh', T.invite - 0.05, 0.3, 0.04], ['pop', T.invite + 0.8, 523.25, 0.045, 0],
    ['riser', T.knob + 0.6, T.knob + 2.6, 0.025], ['pop', T.split + 1.2, 659.25, 0.04, 0.4], ['bell', T.fight, 1318.51, 0.04, 1.2, 0],
    ['tick', T.facts[0] + 1.5, 0.08], ['pop', T.facts[0] + 1.55, 1567.98, 0.045, 0],
    ...Array.from({ length: 6 }, (_, i) => ['whoosh', r3(T.facts[1] + 0.4 + i * 0.5), 0.3, 0.02]),
    ...[0, 1, 2, 3].map(i => ['pop', r3(T.facts[2] + 0.8 + i * 1.0), [987.77, 1174.66, 1318.51, 1567.98][i], 0.045, (i % 2 ? 0.3 : -0.3)]),
    ['pop', T.bell, 1318.51, 0.05, 0.4], ['pop', T.bell + 0.25, 1046.5, 0.05, 0.4],
    ['whoosh', T.pile, 0.4, 0.05], ['glitter', T.pile + 0.3, T.pile + 1.2], ['tom', T.pile + 0.4, 110, { gain: 0.2, decay: 0.2 }], ['pluck', T.pile + 0.8, 1174.66, 0.04, 0.5, -0.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [LAV, signStar, hearts, bubble, shadow, glowAt, clamp]
