// kare19 — THE ALMOST RELATIONSHIP, Ep 19 (long): "When the answer is no" (90 s vertical, star_advice; cinematic · D minor; hard cut).
// Virgo asks Leo; Leo says no, honestly and kindly; Virgo is sad, is looked after, and gets their life back.
//   0.0–6.0   COLD OPEN  Virgo mid-sprint up the steps with flowers, Leo opening the door. Record scratch + freeze 0.5:
//             "spoiler: everyone *survives* this." Hook "Wait for the ending. | *It's good.*"
//   6.0–24    1 · THE ALMOST     game night (Pisces lost and is crying happily) · the long walk · "my favourite person to do nothing with"
//  24.0–36    2 · THE ASK        the doorstep, flowers: "I like you. I'd like us to be together."
//  36.0–48    3 · THE NO         Leo: "I care about you. but I'm not ready for a relationship." · "I wanted to be honest." ·
//             Virgo: "…thank you for telling me." The flowers droop.
//  48.0–66    4 · THE WEEKEND    SATURDAY: Virgo on the floor · Pisces arrives with soup and tissues · both cry ·
//             SUNDAY: a movie, a small smile · THE STARS: "It's okay to be sad about a *clear* answer."
//  66.0–90    5 · THE GOOD ENDING  a friends' dinner: Aries, Sagittarius, Pisces · a talk card on the table: "what made you
//             laugh this week?" · Virgo: "this. you guys." · Pisces' fountain · THE STARS: "A clear no gave you *your weekends
//             back.*" HARD CUT.
import { makeAlmost, drawApartment, APT, drawLane, LANE, drawCafe, drawCafeTable, CAFE, star, stars, standY, starFrame, inSprite, tearsCells, say, tag, sparkles, hearts, prog, ease, pop01, outK, R, box, INK, BONE, RED, GOLD, PINK, CYAN, MINT, INTER, MONO } from '../../kare01/scenes/almostkit.js'

const D = 90
const CH = [[6, 24, 'THE ALMOST'], [24, 36, 'THE ASK'], [36, 48, 'THE NO'], [48, 66, 'THE WEEKEND'], [66, 90, 'THE GOOD ENDING']]
const B = {
  rec: 0.5, game: 6, lost: 8.4, walk: 12, fav: 18, fav2: 19.0,
  ask: 24, askSay: 26.2,
  no: 36, no1: 36.8, no2: 40.6, thanks: 43.6, droop: 44,
  sat: 48, soup: 52.6, soupSay: 53.4, cry: 57, sun: 60, s1: 61.4,
  dinner: 66, card: 70.5, laugh: 74.6, fountain: 79, last: 86.4,
}
const virgoTears = (c, t, x, y, s, k, o = {}) => { const F = starFrame(x, y, s, t, o); c.save(); if (o.rot) { c.translate(F.ox, F.oy); c.rotate(o.rot); c.translate(-F.ox, -F.oy) } inSprite(c, F, () => tearsCells(c, t, k)); c.restore() }
function flowers(c, cx, cy, droop = 0) {
  for (let i = 0; i < 5; i++) { const a = -0.5 + i * 0.25 + droop * (i - 2) * 0.35, len = 120 - droop * 30; c.save(); c.translate(cx, cy); c.rotate(a + droop * 0.6); R(c, '#2f7a4a', -3, -len, 6, len); c.fillStyle = INK; c.beginPath(); c.arc(0, -len, 22, 0, Math.PI * 2); c.fill(); c.fillStyle = [PINK, GOLD, '#ff6b7f', CYAN, PINK][i]; c.beginPath(); c.arc(0, -len, 17, 0, Math.PI * 2); c.fill(); c.restore() }
  box(c, cx - 30, cy - 10, 60, 50, BONE, { b: 4 })
}
function door(c, t, open) {
  drawLane(c, t, { time: 'night', pan: 1000 })
  for (let i = 0; i < 4; i++) box(c, 200 + i * 20, 1420 + i * 40, 680 - i * 40, 30, '#8c86a8', { b: 5 })
  box(c, 360, 760, 360, 640, '#6b3a2a', { b: 9 }); R(c, '#ffe7a8', 370, 770, 340, 620)
  box(c, 370, 770, 340 * (1 - open), 620, '#8a4a36', { b: 0 })
}
function talkCard(c, t, cx, cy, k) {
  if (k <= 0.01) return
  c.save(); c.translate(cx, cy); c.rotate(-0.06); c.scale(k, k)
  box(c, -210, -120, 420, 240, '#fbf6ea', { b: 7 }); R(c, GOLD, -210, -120, 420, 44)
  c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `700 22px ${MONO}`; c.fillText('TALK CARD', 0, -98)
  c.font = `800 32px ${INTER}`; c.fillText('what made you', 0, -10); c.fillText('laugh this week?', 0, 32)
  c.restore()
}
const shots = [
  { a: 0, b: B.game, draw(c, t) {
    door(c, t, ease.outCubic(prog(t, -0.6, 0.5)))
    star(c, 'leo', 540, standY(230, 1390), 230, t, { mood: 'wide', look: [-0.8, 0.6] })
    star(c, 'virgo', 300, standY(250, 1540), 250, t, { mood: 'sparkle', look: [1, -0.6], rot: 0.25, squash: -0.1, hops: [0.05, 0.3] })
    flowers(c, 420, 1420)
  } },
  // 1 · THE ALMOST
  { a: B.game, b: B.walk, draw(c, t, S) {
    drawApartment(c, t, { lamp: 1 })
    box(c, 300, 1360, 480, 120, '#2f7a4a', { b: 7 }); for (let i = 0; i < 6; i++) R(c, [RED, GOLD, CYAN][i % 3], 330 + i * 70, 1390, 40, 40)   // a board game on the rug
    star(c, 'virgo', 280, 1280, 230, t, { mood: 'happy', look: [1, 0], hops: [S.a + 0.8, S.a + 2.2, S.a + 3.4] })
    star(c, 'leo', 800, 1280, 230, t, { mood: 'happy', look: [-1, 0], hops: [S.a + 1.2, S.a + 2.6] })
    star(c, 'pisces', 540, 1080, 180, t, { tears: 3, mood: 'sparkle', look: [0, 0.4], hops: [B.lost, B.lost + 0.5] })
    say(c, t, 540, 870, B.lost, B.walk, 'I LOST AND I’M SO HAPPY', { size: 30 })
    tag(c, t, S.a + 0.4, 540, 560, 'GAME NIGHT #6', { size: 44, rot: -0.03 })
  } },
  { a: B.walk, b: B.ask, draw(c, t, S) {
    drawLane(c, t, { time: 'dusk', pan: 200 + S.u * 70, lampsAt: B.walk + 1 })
    const F = standY(240, LANE.feet)
    star(c, 'virgo', 420, F, 240, t, { mood: t > B.fav2 ? 'heart' : 'happy', look: [1, -0.2], hops: Array.from({ length: 12 }, (_, i) => S.a + 0.5 + i * 0.5) })
    star(c, 'leo', 650, F, 240, t, { mood: 'happy', look: [-1, -0.2], hops: Array.from({ length: 12 }, (_, i) => S.a + 0.75 + i * 0.5) })
    tag(c, t, S.a + 0.4, 540, 560, 'THE LONG WALK', { size: 44, rot: 0.03, out: [B.fav - 0.3, B.fav] })
    say(c, t, 640, 1000, B.fav, B.ask, 'my favourite person to do nothing with.', { size: 26 })
    hearts(c, t, B.fav2, 420, 1100, { n: 6 })
  } },
  // 2 · THE ASK
  { a: B.ask, b: B.no, draw(c, t) {
    door(c, t, 1)
    star(c, 'leo', 540, standY(230, 1390), 230, t, { mood: t > B.askSay + 1.6 ? 'wide' : 'happy', look: [-0.8, 0.6] })
    star(c, 'virgo', 300, standY(250, 1540), 250, t, { mood: 'neutral', look: [1, -0.6], hops: [B.askSay] })
    flowers(c, 420, 1420)
    say(c, t, 360, 1180, B.askSay, B.no, 'I like you. I’d like us to be together.', { size: 28 })
    star(c, 'pisces', 960, standY(120, LANE.feet), 120, t, { tears: 2, mood: 'wide', look: [-1, -0.3], box: false })
  } },
  // 3 · THE NO
  { a: B.no, b: B.sat, draw(c, t) {
    door(c, t, 1)
    star(c, 'leo', 540, standY(230, 1390), 230, t, { mood: t > B.no2 ? 'squint' : 'neutral', look: [-0.8, 0.6], hops: [B.no1, B.no2] })
    const sad = t > B.droop
    star(c, 'virgo', 300, standY(250, 1540), 250, t, { mood: sad ? 'squint' : 'wide', look: [1, -0.6], hops: [B.thanks] })
    flowers(c, 420, 1420, ease.inOutCubic(prog(t, B.droop, B.droop + 1.2)))
    say(c, t, 560, 640, B.no1, B.no2, 'I care about you.', { size: 32 })
    say(c, t, 560, 720, B.no1 + 1.8, B.no2, 'but I’m not ready for a relationship.', { size: 28 })
    say(c, t, 560, 680, B.no2, B.thanks + 0.2, 'I wanted to be honest with you.', { size: 30 })
    say(c, t, 340, 1180, B.thanks, B.sat, '…thank you for telling me.', { size: 28 })
    star(c, 'pisces', 960, standY(120, LANE.feet), 120, t, { tears: 3, mood: 'wide', look: [-1, -0.3], box: false })
  } },
  // 4 · THE WEEKEND
  { a: B.sat, b: B.dinner, draw(c, t, S) {
    drawApartment(c, t, { lamp: t > B.sun ? 0.9 : 0.4 })
    const sun = t > B.sun
    if (!sun) {
      star(c, 'virgo', 470, 1440, 260, t, { mood: 'squint', look: [0, -1], rot: 1.4, bob: 2 })
      if (t > B.cry) virgoTears(c, t, 470, 1440, 260, 2, { rot: 1.4 })
      if (t > B.soup) {
        const pk = pop01(t, B.soup, 0.4, 2)
        star(c, 'pisces', 780 + (1 - pk) * 400, standY(240, 1460), 240, t, { tears: 3, mood: 'sparkle', look: [-1, 0.4], hops: [B.soupSay, B.cry] })
        box(c, 650 + (1 - pk) * 400, 1420, 110, 60, BONE, { b: 5 }); R(c, '#e8a040', 658 + (1 - pk) * 400, 1424, 94, 14)
        say(c, t, 740, 1060, B.soupSay, B.sun, 'I brought soup. and MORE tissues.', { size: 26 })
      }
    } else {
      // Sunday: the couch, a movie glow, a small smile
      c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(540, 1900, 80, 540, 1900, 1000); g.addColorStop(0, 'rgba(120,170,255,0.3)'); g.addColorStop(1, 'rgba(120,170,255,0)'); c.fillStyle = g; c.fillRect(0, 800, 1080, 1120); c.restore()
      star(c, 'virgo', APT.couch.seats[0], standY(230, APT.couch.seatY) - 140, 230, t, { mood: t > B.sun + 3.2 ? 'happy' : 'neutral', look: [0, 0.5] })
      star(c, 'pisces', APT.couch.seats[1], standY(230, APT.couch.seatY) - 140, 230, t, { tears: 2, mood: 'sparkle', look: [0, 0.5], box: false })
    }
    tag(c, t, sun ? B.sun + 0.2 : B.sat + 0.3, 540, 560, sun ? 'SUNDAY' : 'SATURDAY', { size: 50, rot: -0.03, out: sun ? [B.dinner - 0.4, B.dinner] : [B.sun - 0.3, B.sun] })
    void S
  } },
  // 5 · THE GOOD ENDING
  { a: B.dinner, b: D + 1, draw(c, t) {
    drawCafe(c, t, {})
    const lift = 150, F2 = 1250
    star(c, 'aries', 170, standY(200, F2), 200, t, { mood: 'happy', look: [1, 0], hops: [B.laugh, B.laugh + 0.3] })
    star(c, 'virgo', 420, standY(240, F2), 240, t, { mood: t > B.laugh ? 'happy' : 'neutral', look: [1, 0], hops: [B.laugh, B.laugh + 0.3, B.laugh + 0.6] })
    star(c, 'sagittarius', 680, standY(220, F2), 220, t, { mood: 'happy', look: [-1, 0], hops: [B.laugh + 0.15] })
    star(c, 'pisces', 900, standY(200, F2), 200, t, { tears: t > B.fountain ? 3 : 2, mood: 'sparkle', look: [-1, 0], box: false, hops: [B.fountain, B.fountain + 0.5] })
    box(c, 40, F2 + 10, 1000, 40, '#5a2a2a', { b: 6 }); R(c, '#3a1e1e', 80, F2 + 56, 20, 300); R(c, '#3a1e1e', 980, F2 + 56, 20, 300)
    talkCard(c, t, 540, 1480, pop01(t, B.card, 0.35, 2.2))
    say(c, t, 420, 850, B.laugh, B.last, 'this. you guys.', { size: 34 })
    hearts(c, t, B.laugh + 0.4, 420, 1050, { n: 7 })
    if (t > B.fountain) sparkles(c, t, 900, 1100, B.fountain + 0.1, 12, 220, 3)
    void CAFE; void drawCafeTable
  } },
]
const HITS = [B.game, B.walk, B.ask, B.no, B.sat, B.sun, B.dinner]
function cam(t) {
  const hit = HITS.reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const z0 = t < B.game ? 1.25 : (t > B.no && t < B.sat) ? 1.1 + 0.08 * prog(t, B.no, B.sat) : 1.1
  return { z: z0 + 0.02 * Math.sin(t * 0.5) * (t > 1 ? 1 : t) + 0.08 * k, fx: 540, fy: 1200, dx: 40 * k * (HITS.indexOf(hit) % 2 ? 1 : -1) }
}
const E = makeAlmost({
  id: 'kare19', duration: D, ending: 'cut',
  hook: 'Wait for the ending. | *It’s good.*', hookOut: [5.4, 5.8], hookTop: 220, hookSize: 104, hookPlate: [180, 480],
  shots, cam,
  flash: t => HITS.reduce((m, c) => Math.max(m, t >= c && t < c + 0.1 ? 0.4 * (1 - (t - c) / 0.1) : 0), 0),
  fx: [
    ['recordScratch', { at: B.rec, len: 1.7, caption: 'spoiler: everyone *survives* this.', top: 1640 }],
    ...CH.map(([a, b, title], i) => ['chapter', { at: a + 0.1, out: [b - 0.4, b - 0.1], n: i + 1, title, y: 230, color: [GOLD, PINK, CYAN, GOLD, MINT][i] }]),
    ['screenShake', { at: B.lost, len: 0.4, amp: 14 }], ['screenShake', { at: B.fountain, len: 0.5, amp: 16 }],
  ],
  lines: [{ t: B.s1, speaker: 'THE STARS', text: 'It’s okay to be sad about a *clear* answer.' }],
  box: { open: B.s1 - 0.22, close: B.dinner - 0.3, y: 1460 },
  boxes: [{ lines: [{ t: B.last, speaker: 'THE STARS', text: 'A clear no gave you *your weekends back.*' }], y: 1460 }],
  cues: [
    ['pop', B.lost, 1318.51, 0.035, 0], ['glitter', B.lost, B.lost + 0.5], ['pop', B.fav, 880, 0.03, 0.3], ['pluck', B.fav2, 1174.66, 0.035, 0.5, -0.3],
    ['pop', B.askSay, 880, 0.035, -0.3], ['pop', B.no1, 659.25, 0.03, 0.2], ['pop', B.no2, 587.33, 0.03, 0.2], ['pop', B.thanks, 659.25, 0.03, -0.3], ['tom', B.droop + 0.6, 98, { gain: 0.15, decay: 0.3 }],
    ['pop', B.soup, 987.77, 0.035, 0.4], ['pop', B.soupSay, 1318.51, 0.03, 0.4], ['pluck', B.sun, 1174.66, 0.03, 0.5, 0],
    ['pluck', B.card, 1567.98, 0.04, 0.5, 0], ['pop', B.laugh, 1174.66, 0.04, -0.3], ['glitter', B.laugh + 0.4, B.laugh + 1.0], ['glitter', B.fountain, B.fountain + 0.8], ['pop', B.fountain, 1567.98, 0.04, 0.4],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [outK, BONE, RED]
