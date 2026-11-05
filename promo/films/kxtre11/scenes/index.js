// kxtre11: NATURE DOCUMENTARY NARRATOR, "Nature Documentary: The Situationship" (114 s vertical, Trends: Extended ep 11,
// rows in promo/films/month2/m41.md; music: cinematic · Fm). Engine: ../../kxtre01/scenes/xkit.js. No end card; loops.
// THE STARS narrate in a hush (the captions are the narration; the gold star whispers from the corner) while ♎ Libra and
// ♉ Taurus live in a situationship. ♊ Gemini and ♓ Pisces (crying) in the group chat. The rare behaviour: just asking.
//   0.0–3.6   frame 0: a camera lens zooming through the grass onto Libra frozen over a phone; whip + record scratch
//   1 THE HABITAT · 2 FEEDING (the fries) · 3 THE CALL ("wyd") · 4 MIGRATION (the group chat) · 5 CAMOUFLAGE
//   6 THE STANDOFF · 7 RARE BEHAVIOUR ("what are we?") · 8 THE ANSWER ("I wanted to ask you that for weeks.")
//   Last: "Rare behaviour: | *just asking.*" Loops back into frame 0.
import {
  makeEp, star, pisces, room, couch, tag, sfx, hearts, sparkles, phone, label, glowSpot, drawBits,
  prog, lerp, clamp, ease, R, box, GOLD, BONE, PINK, INK, MINT, SKYB, RED, INTER, SERIF, MONO, r3, STAR,
} from '../../kxtre01/scenes/xkit.js'

const ACC = '#9fe6b0'
const LIB = 'libra', TAU = 'taurus'
function grass(x, t, y = 1500, a = 1) {
  x.save(); x.globalAlpha = a
  for (let i = 0; i < 60; i++) { const gx = i * 19 - 20, h = 180 + ((i * 37) % 140), sw = Math.sin(t * 1.6 + i * 0.7) * 14; x.fillStyle = i % 3 ? '#2f6a3a' : '#3f8a4a'; x.beginPath(); x.moveTo(gx, y + 300); x.lineTo(gx + 16, y + 300); x.lineTo(gx + 8 + sw, y + 300 - h); x.closePath(); x.fill() }
  x.restore()
}
function habitat(x, t, night = false) { room(x, t, { wall: night ? '#1a2040' : '#2a3a4a', wall2: night ? '#1f2648' : '#304454', floor: '#3a3a2a', night, warm: 0.3 }); couch(x, 540, 1200, { w: 760, col: '#4a7a6a', hi: '#5a9a84' }) }
// the narrator: THE STARS, a gold star with a tiny mic, whispering from the corner
function narrator(x, t, S, mood = 'neutral', tears = 0) { star(x, t, 'stars', { x: 150, y: 1460, s: 140, mood, look: [1, -1], tears, hops: S ? S.hops(0.6) : null }); R(x, INK, 214, 1440, 8, 70); box(x, 206, 1420, 24, 24, '#555', { b: 3 }) }

function hook(x, t, S) {
  habitat(x, t)
  star(x, t, LIB, { x: 540, y: 1040, s: 260, mood: 'wide', look: [0, 1], bob: 0 })
  box(x, 500, 1080, 80, 120, '#14102c', { b: 5 })
  grass(x, t, 1300 + t * 40, 1)
  x.save(); x.strokeStyle = 'rgba(239,230,214,0.8)'; x.lineWidth = 6; x.beginPath(); x.arc(540, 1000, 330 - t * 20, 0, Math.PI * 2); x.stroke(); R(x, 'rgba(239,230,214,0.8)', 520, 1000 - 30, 40, 6); R(x, 'rgba(239,230,214,0.8)', 537, 980 - 30, 6, 46); x.restore()
  pisces(x, t, { x: 930, y: 1440, s: 120, tears: 2, look: [-1, -1] })
  void S
}

const C = []
C.push({ name: 'THE HABITAT', dur: 14, caption: 'here, two stars *share a sofa.*',
  cues: [['pluck', 1.0, 349.23, 0.03, 1.2, 0], ['tick', 6.0, 0.04]],
  draw(x, t, S) {
    habitat(x, t)
    star(x, t, LIB, { x: 330, y: 1050, s: 220, mood: 'neutral', look: [1, 0], hops: S.hops(6) })
    star(x, t, TAU, { x: 750, y: 1050, s: 220, mood: 'neutral', look: [-1, 0] })
    tag(x, '“WHAT ARE WE?” · NEVER SPOKEN', 540, 760, S.w(5.6, 14), { bg: BONE, size: 32 })
    tag(x, 'LIBRA', 330, 860, S.w(1, 5.4), { bg: ACC, size: 26 }); tag(x, 'TAURUS', 750, 860, S.w(1.4, 5.4), { bg: ACC, size: 26 })
    grass(x, t, 1560, 0.9); narrator(x, t, S); pisces(x, t, { x: 930, y: 1440, s: 110, tears: 1, look: [-1, -1], pop: S.w(7, 14) })
  } })
C.push({ name: 'FEEDING', dur: 14, caption: 'they share fries. *eye contact: avoided.*',
  cues: [2, 4, 6, 8, 10, 12].map(v => ['tick', v, 0.04]),
  draw(x, t, S) {
    habitat(x, t)
    drawBits(x, ['Y.Y.Y.Y', 'YYYYYYY', 'RRRRRRR', 'RRRRRRR', '.RRRRR.'], { Y: '#ffd27a', R: RED }, 540, 1090, 14)
    const ph = Math.floor(S.u / 2) % 2
    star(x, t, LIB, { x: 360, y: 1050, s: 220, mood: 'neutral', look: ph ? [1, 0] : [-1, -1], hops: S.hops(2, 6, 10) })
    star(x, t, TAU, { x: 720, y: 1050, s: 220, mood: 'neutral', look: ph ? [1, -1] : [-1, 0], hops: S.hops(4, 8, 12) })
    grass(x, t, 1560, 0.9); narrator(x, t, S); pisces(x, t, { x: 930, y: 1440, s: 110, tears: 1, look: [-1, -1], pop: S.w(3, 14) })
  } })
C.push({ name: 'THE CALL', dur: 13, stamp: '11:02 PM', caption: 'the classic signal: *“wyd.”*',
  cues: [['pop', 1.6, 1046.5, 0.05, 0], ['pop', 1.75, 1318.51, 0.04, 0], ['whoosh', 4.0, 0.4, 0.03]],
  draw(x, t, S) {
    habitat(x, t, true)
    star(x, t, LIB, { x: 330, y: 1060, s: 230, mood: S.u > 1.8 ? 'wide' : 'sleepy', look: [1, -1], hops: S.hops(1.8, 2.2) })
    phone(x, t, 700, 760, { w: 420, h: 520, title: '♉ TAURUS', size: 40, msgs: [{ at: S.at(1.6), me: false, text: 'wyd' }] })
    tag(x, 'SIGNAL: AMBIGUOUS', 700, 1110, S.w(5, 13), { bg: GOLD, size: 30 })
    grass(x, t, 1560, 0.9); narrator(x, t, S); pisces(x, t, { x: 930, y: 1440, s: 110, tears: 2, look: [-1, -1], pop: S.w(6, 13) })
  } })
C.push({ name: 'MIGRATION', dur: 14, caption: 'the Libra *migrates* to the group chat.',
  cues: [['pop', 1.4, 880, 0.04, 0], ['pop', 4.0, 987.77, 0.04, 0], ['pop', 6.6, 783.99, 0.04, 0], ['pluck', 6.8, 392, 0.04, 0.5, 0], ['pop', 9.2, 1046.5, 0.04, 0]],
  draw(x, t, S) {
    habitat(x, t, true)
    phone(x, t, 560, 760, { w: 700, h: 760, title: 'GROUP CHAT', size: 34, msgs: [
      { at: S.at(1.4), me: true, text: 'they said wyd. what does it MEAN' },
      { at: S.at(4.0), me: false, text: '♊ so are you two… dating?' },
      { at: S.at(6.6), me: false, text: '♓ ▶ voice note (crying)' },
      { at: S.at(9.2), me: true, text: "we don't… label it" },
    ] })
    star(x, t, LIB, { x: 200, y: 1260, s: 170, mood: 'squint', look: [1, -1], hops: S.hops(1.4, 9.2) })
    grass(x, t, 1560, 0.9); narrator(x, t, S); pisces(x, t, { x: 930, y: 1300, s: 150, tears: 3, look: [-1, -1], hops: S.hops(6.6, 7.0) })
  } })
C.push({ name: 'CAMOUFLAGE', dur: 14, caption: 'camouflage: *extremely chill.* (not chill)',
  bubbles: [{ at: 2.0, end: 5.4, x: 330, y: 700, text: 'oh, I am SO chill.', tail: 0.2, size: 38 }],
  cues: Array.from({ length: 28 }, (_, i) => ['tick', r3(1 + i * 0.4), 0.03]),
  draw(x, t, S) {
    habitat(x, t)
    const F = star(x, t, LIB, { x: 330, y: 1050, s: 230, mood: 'neutral', look: [1, 0], hops: S.hops(2) })
    for (const ex of [-40, 40]) { R(x, INK, 330 + ex - 34, F.top + 80, 68, 40); R(x, '#2b2140', 330 + ex - 28, F.top + 86, 56, 28) }
    star(x, t, TAU, { x: 750, y: 1050, s: 220, mood: 'neutral', look: [-1, 0] })
    // the heart monitor, losing it
    box(x, 560, 500, 440, 220, '#0c1a14', { b: 6 })
    x.save(); x.strokeStyle = '#7fe0a0'; x.lineWidth = 6; x.beginPath()
    for (let i = 0; i <= 40; i++) { const px = 580 + i * 10, sp = (i + Math.floor(S.u * 12)) % 6 === 0, py = 610 - (sp ? 80 * Math.min(1, S.u / 4 + 0.3) : 0) + Math.sin(i + t * 10) * 4; i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke(); x.restore()
    label(x, `BPM ${Math.floor(70 + S.u * 12)}`, 780, 690, { size: 28, col: '#7fe0a0' })
    grass(x, t, 1560, 0.9); narrator(x, t, S); pisces(x, t, { x: 930, y: 1440, s: 110, tears: 2, look: [-1, -1], pop: S.w(6, 14) })
  } })
C.push({ name: 'THE STANDOFF', dur: 14, caption: 'the standoff. *who says it first?*',
  cues: [...Array.from({ length: 12 }, (_, i) => ['tick', r3(1 + i), 0.05]), ['whoosh', 6, 1.2, 0.02]],
  draw(x, t, S) {
    habitat(x, t, true)
    const lean = Math.sin(S.u * 0.9) * 30
    star(x, t, LIB, { x: 330 + lean, y: 1050, s: 230, mood: 'squint', look: [1, 0] })
    star(x, t, TAU, { x: 750 - lean, y: 1050, s: 230, mood: 'squint', look: [-1, 0] })
    // a tumbleweed rolls through
    const tw = prog(S.u, 5, 10)
    if (tw > 0 && tw < 1) { x.save(); x.translate(lerp(-100, 1180, tw), 1180); x.rotate(tw * 12); x.strokeStyle = '#a08050'; x.lineWidth = 6; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(0, 0, 30 + i * 6, i, i + 3); x.stroke() } x.restore() }
    tag(x, `WAITING: ${Math.floor(S.u * 3)} WEEKS`, 540, 760, S.w(1, 14), { bg: BONE, size: 36 })
    grass(x, t, 1560, 0.9); narrator(x, t, S); pisces(x, t, { x: 930, y: 1440, s: 110, tears: 2, look: [-1, -1], pop: S.w(3, 14) })
  } })
C.push({ name: 'RARE BEHAVIOUR', dur: 13, caption: 'extremely rare: *it asks.*', captionAt: 4.0,
  fx: [['slam', { at: 1.0, text: '*RARE* BEHAVIOUR', top: 480, size: 120, out: [3.4, 3.6], accentColor: ACC }]],
  bubbles: [{ at: 4.4, end: 9.0, x: 330, y: 680, text: 'what are we?', tail: 0.2, size: 52 }, { at: 9.0, end: 12.6, x: 160, y: 1250, text: '(gasps)', size: 36, col: '#fff2c0' }],
  cues: [['riser', 3.6, 4.4, 0.03], ['tom', 4.4, 90, { gain: 0.3, decay: 0.3 }]],
  draw(x, t, S) {
    habitat(x, t)
    star(x, t, LIB, { x: 330, y: 1050, s: 240, mood: S.u > 4.4 ? 'wide' : 'neutral', look: [1, 0], hops: S.hops(4.4, 4.8) })
    star(x, t, TAU, { x: 750, y: 1050, s: 230, mood: S.u > 4.6 ? 'wide' : 'neutral', look: [-1, 0] })
    grass(x, t, 1560, 0.9); narrator(x, t, S, S.u > 9 ? 'wide' : 'neutral'); pisces(x, t, { x: 930, y: 1440, s: 120, tears: 3, look: [-1, -1], pop: S.w(5, 13) })
  } })
C.push({ name: 'THE ANSWER', dur: 14.4, caption: null,
  bubbles: [{ at: 1.0, end: 5.6, x: 750, y: 640, text: 'I wanted to ask you that for weeks.', tail: -0.3, size: 38 }, { at: 6.0, end: 9.4, x: 160, y: 1250, text: '*narrator is not okay*', size: 30, col: '#fff2c0' }],
  cues: [['bell', 1.4, 1567.98, 0.05, 1.2, 0], ['glitter', 1.4, 2.2], ['pluck', 6.2, 392, 0.04, 0.6, -0.6], ['pluck', 6.5, 349.23, 0.04, 0.6, -0.6]],
  draw(x, t, S) {
    habitat(x, t)
    const close = ease.inOutCubic(prog(S.u, 1.4, 3.0))
    star(x, t, LIB, { x: lerp(330, 450, close), y: 1050, s: 240, mood: S.u > 1.4 ? 'heart' : 'wide', look: [1, 0], hops: S.hops(1.4, 1.8, 5, 8, 11) })
    star(x, t, TAU, { x: lerp(750, 640, close), y: 1050, s: 230, mood: 'heart', look: [-1, 0], blush: 1, hops: S.hops(1.0, 5.4, 8.4, 11.4) })
    if (S.u > 1.4) hearts(x, t, S.at(1.4 + Math.floor((S.u - 1.4) / 1.8) * 1.8), 545, 880, { n: 6 })
    grass(x, t, 1560, 0.9); narrator(x, t, S, 'sparkle', S.u > 6 ? 3 : 1); pisces(x, t, { x: 930, y: 1440, s: 130, tears: 3, look: [-1, -1], hops: S.hops(6, 6.4) })
  } })

const EP = makeEp({
  id: 'kxtre11', bug: 'NATURE DOCUMENTARY', lead: LIB, accent: ACC, deep: '#2a7a4a', capTop: 1770,
  music: { style: 'cinematic', key: 'Fm', seed: 4111, breakdown: [72.6], lift: [86.6] },
  hook: {
    text: 'Here we observe: | *the situationship.*', len: 3.6, draw: hook, top: 250, size: 100,
    fx: [['whip', { at: -0.08, len: 0.45, from: 1.3, blur: 6 }], ['rec', { at: 0.9, len: 1.5, caption: '*shh.* a rare sighting.', top: 1180 }]],
  },
  promiseAt: 2.5,
  promise: 'stay for *the rare behaviour.*',
  chapters: C,
  overlay(tx, t) {
    // the documentary frame: corner brackets, REC, the timecode (screen space)
    tx.save(); tx.strokeStyle = 'rgba(239,230,214,0.75)'; tx.lineWidth = 6
    for (const [cx, cy, sx, sy] of [[60, 180, 1, 1], [1020, 180, -1, 1], [60, 1500, 1, -1], [1020, 1500, -1, -1]]) { tx.beginPath(); tx.moveTo(cx, cy + sy * 60); tx.lineTo(cx, cy); tx.lineTo(cx + sx * 60, cy); tx.stroke() }
    tx.restore()
    if (Math.floor(t * 2) % 2 === 0) { tx.fillStyle = RED; tx.beginPath(); tx.arc(830, 230, 10, 0, Math.PI * 2); tx.fill() }
    tx.font = `700 26px ${MONO}`; tx.fillStyle = BONE; tx.textAlign = 'left'; tx.fillText('REC', 850, 240)
    const s = Math.floor(t), tc = `00:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
    tx.fillText(tc, 830, 280)
  },
  last: { text: 'Rare behaviour: | *just asking.*', at: 10.4, top: 300, size: 100 },
  ending: 'loop',
  hits: [86.6, 99.6],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [sfx, sparkles, glowSpot, label, GOLD, PINK, MINT, SKYB, INTER, SERIF, STAR, lerp]
