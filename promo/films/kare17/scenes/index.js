// kare17 — THE ALMOST RELATIONSHIP, Ep 17 (long): "The holiday party plus-one" (80 s vertical, star_advice; jazzy · F; loop).
// Cancer wants to bring Capricorn to the holiday party, as a date. Five chapter stickers; a new beat every 4–8 s.
//   0.0–6.0   COLD OPEN  the apartment, snow at the window: Cancer mid-spin with a glowing invite that says "+1?".
//             Hook "The invite says *'+1.'* | Now what?"  3.2: "(wait for the doorstep.)"
//   6.0–20    1 · THE INVITE  the "+1" glows · Capricorn's name on the phone · "is it too soon?" · Pisces: "a PLUS ONE…"
//  20.0–36    2 · THE SPIRAL  the kit's loading bar "imagining the party…" · three imagined parties: they say no · it's awkward
//             (AWKWARD stamp) · it's wonderful (hearts)
//  36.0–52    3 · THE DRAFT   a speech scrolls on the phone · THE STARS: "Shorter." · "Two lines: *what you want*, and a question."
//             · the draft becomes "would you come to the party with me? as my date."
//  52.0–64    4 · THE ASK     Capricorn's doorstep in the snow: KNOCK KNOCK · "come to the party… as my date?" · Pisces in a bush
//  64.0–80    5 · THE ANSWER  "yes. and slow is good for me." · "slow is perfect." · the party: both arrive; Pisces sobbing by
//             the snacks · THE STARS: "Ask *before* the party, not at the door." The last 0.45 s blend back into frame 0.
import { makeAlmost, drawApartment, APT, drawLane, LANE, partyRoom, star, stars, standY, say, tag, stamp, thought, hearts, sparkles, snow, bigPhone, prog, ease, pop01, outK, R, box, INK, BONE, RED, GOLD, PINK, CYAN, MINT, INTER, SERIF } from '../../kare01/scenes/almostkit.js'

const D = 80
const CH = [[6, 20, 'THE INVITE'], [20, 36, 'THE SPIRAL'], [36, 52, 'THE DRAFT'], [52, 64, 'THE ASK'], [64, 80, 'THE ANSWER']]
const B = {
  wait: 3.2, glow: 6, name: 12, soon: 13.5, pis1: 16, aplus: 16.5,
  bar: 20.2, no: 24.4, awk: 28.4, great: 32.2,
  draft: 36, s1: 40.2, s2: 42.6, short: 47.2,
  door: 52, knock: 53, open: 56.2, ask: 57.4, bush: 60,
  yes: 64.6, perfect: 67.4, party: 70, sob: 71.2, last: 74.6,
}
const SZ = 270

function invite(c, t, cx, cy, s, rot = 0, glow = 1) {
  c.save(); c.translate(cx, cy); c.rotate(rot); c.scale(s, s)
  if (glow > 0) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(0, 0, 40, 0, 0, 320); g.addColorStop(0, `rgba(255,220,140,${0.35 * glow})`); g.addColorStop(1, 'rgba(255,220,140,0)'); c.fillStyle = g; c.fillRect(-320, -320, 640, 640); c.restore() }
  box(c, -150, -190, 300, 380, '#fbf6ea', { b: 7 })
  R(c, RED, -150, -190, 300, 60); R(c, '#2f9a62', -150, 130, 300, 60)
  c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = INK
  c.font = `800 34px ${INTER}`; c.fillText('HOLIDAY PARTY', 0, -100); c.font = `700 24px ${INTER}`; c.fillText('sat · 8 pm', 0, -56)
  c.font = `italic 500 ${Math.round(120 + 10 * Math.sin(t * 4))}px ${SERIF}`; c.fillStyle = RED; c.fillText('+1?', 0, 40)
  c.restore()
}
function apt(c, t) { drawApartment(c, t, { lamp: 0.9 }); c.save(); c.beginPath(); c.rect(APT.window.x, APT.window.y, APT.window.w, APT.window.h); c.clip(); snow(c, t, { n: 30 }); c.restore() }
function dream(c, t, a, fn, label) {
  c.save(); c.globalAlpha = clampA(prog(t, a, a + 0.3)); fn(c)
  c.fillStyle = 'rgba(160,120,255,0.18)'; c.fillRect(0, 0, 1080, 1920)
  c.restore()
  tag(c, t, a + 0.3, 540, 560, label, { size: 44, rot: -0.03, badge: LAVc })
}
const LAVc = '#c9a6ff'
const clampA = v => Math.max(0, Math.min(1, v))
function door(c, t, open) {
  drawLane(c, t, { time: 'night', pan: 100 })
  box(c, 360, 760, 360, 640, '#6b3a2a', { b: 9, hi: '#8a4a36' })
  const w = 340 * (1 - open)
  R(c, '#ffe7a8', 370, 770, 340, 620)
  box(c, 370, 770, w, 620, '#8a4a36', { b: 0 })
  R(c, GOLD, 370 + w - 40, 1080, 20, 20)
  // a wreath
  c.strokeStyle = '#2f9a62'; c.lineWidth = 20; c.beginPath(); c.arc(540, 880, 60, 0, Math.PI * 2); c.stroke(); R(c, RED, 528, 930, 24, 24)
  R(c, BONE, 250, 1400, 580, 30)
}
function bush(c, cx, cy) { for (const [dx, dy, r] of [[-70, 0, 80], [60, -10, 90], [0, -60, 80]]) { c.fillStyle = INK; c.beginPath(); c.arc(cx + dx, cy + dy, r + 6, 0, Math.PI * 2); c.fill() } for (const [dx, dy, r] of [[-70, 0, 80], [60, -10, 90], [0, -60, 80]]) { c.fillStyle = '#2f7a4a'; c.beginPath(); c.arc(cx + dx, cy + dy, r, 0, Math.PI * 2); c.fill() } }

const DRAFT_LONG = 'Dear Capricorn, as you may know, the holidays are a time of reflection, and I have been reflecting on the matter of the party and also on us, in seven parts. Part one:'
const shots = [
  { a: 0, b: B.glow, draw(c, t) {
    apt(c, t)
    const spin = t < 1.4 ? Math.sin(t * 7) * 0.35 * (1 - t / 1.4) : 0
    star(c, 'cancer', 400, standY(SZ, 1430), SZ, t, { mood: 'sparkle', look: [1, -0.4], rot: spin, hops: [0.05, 1.5, 3.0] })
    invite(c, t, 760, 980, 0.9, 0.12 + spin * 0.5)
    say(c, t, 540, 1560, B.wait, B.glow, '(wait for the doorstep.)', { size: 32, col: '#ffe9b0' })
  } },
  { a: B.glow, b: B.bar, draw(c, t, S) {
    apt(c, t)
    if (t < B.name) { invite(c, t, 540, 900, 1.5, 0.02 * Math.sin(t * 3), 1 + 0.5 * Math.sin(t * 6)); sparkles(c, t, 540, 900, B.glow + 0.3, 12, 320, 2); star(c, 'cancer', 540, 1500, 220, t, { mood: 'heart', look: [0, -1] }) }
    else {
      star(c, 'cancer', 400, standY(SZ, 1430), SZ, t, { mood: t > B.soon ? 'wide' : 'sparkle', look: [1, -0.4], hops: [B.name, B.soon] })
      bigPhone(c, t, 770, 960, { w: 340, h: 520, k: 1.1, title: 'capricorn', msgs: [{ at: B.name - 2, side: 'L', text: 'good luck at the gig!' }, { at: B.name - 1.5, side: 'R', text: 'thank you!!' }] })
      thought(c, t, 400, 820, B.soon, B.pis1 + 0.6, 'is it too soon?', { size: 36 })
      if (t > B.pis1) { star(c, 'pisces', 870, 1500, 200, t, { tears: 3, mood: 'sparkle', look: [-1, -0.6], hops: [B.aplus], pop: pop01(t, B.pis1, 0.35, 2.2) }); say(c, t, 840, 1310, B.aplus, B.bar, 'a PLUS ONE…', { size: 34 }) }
    }
    void S
  } },
  { a: B.bar, b: B.draft, draw(c, t) {
    if (t < B.no) { apt(c, t); star(c, 'cancer', 540, standY(320, 1480), 320, t, { mood: 'squint', look: [0, -0.8], squash: 0.03 * Math.sin(t * 20) }) }
    else if (t < B.awk) dream(c, t, B.no, x => { partyRoom(x, t); star(x, 'cancer', 540, standY(260, 1460), 260, t, { mood: 'squint', look: [0, 0.6] }); star(x, 'pisces', 900, standY(140, 1460), 140, t, { tears: 3, mood: 'wide', look: [-1, 0], box: false }) }, 'IMAGINED #1: THEY SAY NO')
    else if (t < B.great) {
      dream(c, t, B.awk, x => { partyRoom(x, t); star(x, 'cancer', 400, standY(250, 1460), 250, t, { mood: 'neutral', look: [1, 0] }); star(x, 'capricorn', 700, standY(250, 1460), 250, t, { mood: 'neutral', look: [1, 0.4], bob: 0 }) }, 'IMAGINED #2: IT’S AWKWARD')
      stamp(c, t, B.awk + 1.2, 540, 900, 'AWKWARD', { size: 80 })
    } else dream(c, t, B.great, x => { partyRoom(x, t); star(x, 'cancer', 420, standY(250, 1460), 250, t, { mood: 'happy', rot: Math.sin(t * 5) * 0.2, hops: [B.great + 0.5, B.great + 1, B.great + 1.5, B.great + 2, B.great + 2.5, B.great + 3] }); star(x, 'capricorn', 680, standY(250, 1460), 250, t, { mood: 'heart', rot: -Math.sin(t * 5) * 0.2, hops: [B.great + 0.75, B.great + 1.25, B.great + 1.75, B.great + 2.25, B.great + 2.75] }); hearts(x, t, B.great + 0.8, 550, 1100, { n: 8 }) }, 'IMAGINED #3: IT’S WONDERFUL')
  } },
  { a: B.draft, b: B.door, draw(c, t, S) {
    apt(c, t)
    const short = t > B.short
    const scroll = short ? [] : [{ at: B.draft - 1, side: 'R', text: DRAFT_LONG.slice(0, Math.min(DRAFT_LONG.length, Math.floor((t - B.draft + 1) * 30))) }]
    bigPhone(c, t, 540, 860, { w: 460, h: 700, k: 1.2, title: 'capricorn · draft', msgs: short ? [{ at: B.short, side: 'R', text: 'would you come to the party with me? as my date.' }] : scroll })
    star(c, 'cancer', 170, 1330, 190, t, { mood: short ? 'sparkle' : 'squint', look: [1, -0.8], hops: [B.short] })
    stars(c, 920, 1320, 150, t, { pop: pop01(t, B.s1 - 0.4, 0.38, 2.1) * outK(t, [B.door - 0.4, B.door]), mood: short ? 'happy' : 'neutral', look: [-1, -0.6], hops: [B.s1, B.s2, B.s2 + 0.8] })
    stamp(c, t, B.s1 + 0.3, 540, 640, 'TOO LONG', { size: 70, out: [B.short - 0.3, B.short] })
    void S
  } },
  { a: B.door, b: B.yes, draw(c, t) {
    const open = ease.outCubic(prog(t, B.open, B.open + 0.6))
    door(c, t, open)
    if (open > 0.05) star(c, 'capricorn', 540, standY(240, 1390), 240, t, { mood: t > B.ask + 0.8 ? 'wide' : 'happy', look: [0, 0.5], alpha: open })
    star(c, 'cancer', 300, standY(260, 1560), 260, t, { mood: 'neutral', look: [1, -0.6], hops: [B.knock, B.knock + 0.4, B.ask] })
    snow(c, t, { n: 60 })
    say(c, t, 560, 720, B.knock, B.open, 'KNOCK KNOCK', { size: 48 })
    say(c, t, 330, 1180, B.ask, B.yes, 'come to the party… as my date?', { size: 30 })
    bush(c, 880, 1560)
    if (t > B.bush) { star(c, 'pisces', 880, 1430, 160, t, { tears: 3, mood: 'sparkle', look: [-1, -0.4], box: false, pop: pop01(t, B.bush, 0.3, 2.2) }); bush(c, 880, 1640) }
  } },
  { a: B.yes, b: B.party, draw(c, t) {
    door(c, t, 1)
    star(c, 'capricorn', 540, standY(240, 1390), 240, t, { mood: 'happy', look: [-0.6, 0.5], hops: [B.yes] })
    star(c, 'cancer', 300, standY(260, 1560), 260, t, { mood: t > B.perfect ? 'heart' : 'wide', look: [1, -0.6], hops: [B.perfect] })
    snow(c, t, { n: 60 })
    say(c, t, 620, 780, B.yes, B.party, 'yes. and slow is good for me.', { size: 30 })
    say(c, t, 330, 1180, B.perfect, B.party, 'slow is perfect.', { size: 32 })
    hearts(c, t, B.perfect + 0.2, 300, 1300, { n: 6 })
    bush(c, 880, 1560); star(c, 'pisces', 880, 1430, 160, t, { tears: 3, mood: 'sparkle', look: [-1, -0.4], box: false }); bush(c, 880, 1640)
  } },
  { a: B.party, b: D + 1, draw(c, t) {
    const back = ease.inOutCubic(prog(t, D - 1.2, D - 0.5))
    partyRoom(c, t)
    star(c, 'cancer', 400, standY(250, 1300), 250, t, { mood: 'happy', look: [1, 0], hops: [B.party + 0.4, B.party + 1.4, B.party + 2.4] })
    star(c, 'capricorn', 660, standY(250, 1300), 250, t, { mood: 'sparkle', look: [-1, 0], hops: [B.party + 0.9, B.party + 1.9] })
    star(c, 'pisces', 900, standY(200, 1180), 200, t, { tears: 3, mood: t > B.sob ? 'sparkle' : 'wide', look: [-1, 0], hops: [B.sob, B.sob + 0.5], alpha: 1 - back })
    say(c, t, 880, 860, B.sob, D - 1, 'MY BABIES', { size: 36 })
    tag(c, t, B.party + 0.4, 540, 480, 'SAT · 8 PM · +1 ✓', { size: 44, rot: -0.03, out: [D - 1.2, D - 0.8] })
  } },
]
const HITS = [B.glow, B.name, B.bar, B.no, B.awk, B.great, B.draft, B.door, B.yes, B.party]
function cam(t) {
  const hit = HITS.reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const drift = 0.03 * Math.sin(t * 0.5)
  return { z: 1.1 + drift * (t > 1 ? 1 : t) + 0.1 * k, fx: 540, fy: 1200, dx: 50 * k * (HITS.indexOf(hit) % 2 ? 1 : -1) }
}
const E = makeAlmost({
  id: 'kare17', duration: D, ending: 'loop',
  hook: 'The invite says *‘+1.’* | Now what?', hookOut: [5.4, 5.8], hookTop: 220, hookSize: 104, hookPlate: [180, 480],
  shots, cam,
  flash: t => HITS.reduce((m, c) => Math.max(m, t >= c && t < c + 0.1 ? 0.4 * (1 - (t - c) / 0.1) : 0), 0),
  fx: [
    ['whipZoom', { at: 0.1, from: 1.45, blur: 12 }],
    ...CH.map(([a, b, title], i) => ['chapter', { at: a + 0.1, out: [b - 0.4, b - 0.1], n: i + 1, title, y: 230, color: [GOLD, LAVc, CYAN, PINK, MINT][i] }]),
    ['loadingBar', { at: B.bar, len: 4.0, label: 'imagining the party…', stallAt: 99, error: 'Error: too many parties', y: 560 }],
    ['screenShake', { at: B.knock, len: 0.4, amp: 16 }], ['screenShake', { at: B.knock + 0.4, len: 0.4, amp: 16 }], ['screenShake', { at: B.sob, len: 0.5, amp: 16 }],
  ],
  lines: [
    { t: B.s1, speaker: 'THE STARS', text: '*Shorter.*' },
    { t: B.s2, speaker: 'THE STARS', text: 'Two lines: *what you want*, and a question.' },
  ],
  box: { open: B.s1 - 0.22, close: B.door - 0.3, y: 1460 },
  boxes: [{ lines: [{ t: B.last, speaker: 'THE STARS', text: 'Ask *before* the party, not at the door.' }], close: D - 1.0, y: 1460 }],
  cues: [
    ['pop', B.wait, 659.25, 0.03, 0], ['glitter', B.glow + 0.3, B.glow + 1.0], ['pop', B.name, 880, 0.035, 0.3], ['pop', B.soon, 659.25, 0.03, -0.3], ['pop', B.aplus, 1318.51, 0.035, 0.4],
    ['whoosh', B.no - 0.1, 0.4, 0.03], ['whoosh', B.awk - 0.1, 0.4, 0.03], ['boom', B.awk + 1.2, 0.14], ['whoosh', B.great - 0.1, 0.4, 0.03], ['glitter', B.great + 0.8, B.great + 1.6],
    ...Array.from({ length: 40 }, (_, i) => ['tick', B.draft + i * 0.1, 0.01]), ['boom', B.s1 + 0.3, 0.12], ['pluck', B.short, 1174.66, 0.04, 0.5, 0],
    ['tom', B.knock, 120, { gain: 0.3, decay: 0.2 }], ['tom', B.knock + 0.4, 120, { gain: 0.3, decay: 0.2 }], ['whoosh', B.open, 0.5, 0.025], ['pop', B.ask, 880, 0.04, -0.3], ['pop', B.bush, 1318.51, 0.03, 0.4],
    ['pluck', B.yes, 1174.66, 0.045, 0.5, 0], ['pluck', B.yes + 0.12, 1567.98, 0.04, 0.5, 0], ['glitter', B.perfect, B.perfect + 0.6], ['pop', B.sob, 1318.51, 0.035, 0.4],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [LANE]
