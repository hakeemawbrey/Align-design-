// kxmue04 · The Make-Up Talk: Extended, ep 4 · "Love in Two Languages" (90 s vertical, star_advice post, jazzy · Bb)
// No end card, no card transition. LOOP: the last 0.45 s eases back into the frame-0 twirl. Engine: kxmue01/m47kit.js.
//   0.00   frame 0: ♌ Leo mid-twirl in sparkles under a swinging spotlight, ♑ Capricorn mid-type at a glowing laptop.
//          Slam "Dressed up. | They *didn't look up.*"  0.7 record scratch + caught circle on the laptop.
//   2.3    promise "the spreadsheet *twist* is at the end"
//   3.0    1 · THE FIGHT       "you never *notice* me!" / "I planned our whole *TRIP!*" (the spreadsheet, row 4 blurred)
//  19.5    2 · THE TIME-OUT    split; glitch "LOVE.EXE: language not recognised"
//  27.5    THE STARS           "you're both saying *I love you.*" / "just in different *accents.*"
//  35.5    3 · THE OPENER      talk card "What makes you feel *most loved?*" → a phrasebook LEO ⇄ CAPRICORN
//  51.0    4 · THE HARD PART   "being *seen.* out loud." / "being helped. quietly."
//  69.0    5 · THE MEND        "you look *amazing.* I noticed. at 7:02." · the heart mends 74.0 · ROW 4 revealed
//  87.6    last line "Love them in | *their* language." → loop back into frame 0 (89.55–90)
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, mendHeart, bubble, glow,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxmue01/scenes/m47kit.js'

const LEO = 'leo', CAP = 'capricorn'
const LEOC = signStar(LEO), CAPC = signStar(CAP)
const MEND = 74.0

function spotlight(x, t, cx, by, a = 1) {
  const sw = Math.sin(t * 1.6) * 60
  x.save(); x.globalAlpha = 0.22 * a; x.fillStyle = '#fff1c8'
  x.beginPath(); x.moveTo(cx + sw - 30, 0); x.lineTo(cx + sw + 30, 0); x.lineTo(cx + 190, by); x.lineTo(cx - 190, by); x.closePath(); x.fill()
  x.restore()
  glow(x, cx, by - 40, 260, 0.5 * a, '255,236,180')
}
function twinkles(x, t, cx, cy, n = 10) {
  for (let i = 0; i < n; i++) {
    const a = t * 1.5 + i * 0.63, r = 150 + 30 * Math.sin(t * 3 + i)
    const k = 0.5 + 0.5 * Math.sin(t * 8 + i * 2)
    R(x, i % 2 ? GOLD : BONE, cx + Math.cos(a) * r - 6 * k, cy + Math.sin(a) * r * 0.8 - 6 * k, 12 * k, 12 * k)
  }
}
function laptop(x, t, cx, cy, { s = 1, glowA = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  glow(x, 0, -60, 200, 0.6 * glowA, '160,255,190')
  box(x, -110, -150, 220, 140, '#2a2148', { b: 6 }); R(x, '#123a2a', -98, -138, 196, 116)
  for (let j = 0; j < 5; j++) for (let i = 0; i < 4; i++) R(x, (i + j) % 3 ? '#2f7a5a' : '#7dffb0', -92 + i * 48, -132 + j * 22, 44, 18)
  box(x, -140, -10, 280, 22, '#4a4466', { b: 5 })
  x.restore()
}
function sheet(x, t, k, rows, { hi = -1, blurRow = -1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 820); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-420 + 14, -260 + 18, 840, 520)
  box(x, -420, -260, 840, 520, '#f4f8f2', { b: 8 })
  R(x, '#2f7a5a', -420, -260, 840, 60)
  x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('OUR TRIP ✦ plan_v7', -396, -230)
  rows.forEach((r, j) => {
    const y = -170 + j * 86
    R(x, j === hi ? '#ffe27a' : j % 2 ? '#e4efe4' : '#f4f8f2', -412, y - 38, 824, 80)
    R(x, '#c8d8c8', -412, y + 40, 824, 3); R(x, '#c8d8c8', -300, y - 38, 3, 80)
    x.font = `700 26px ${MONO}`; x.fillStyle = '#5a6a5a'; x.fillText(String(j + 1), -380, y)
    x.font = `800 ${r.length > 26 ? 26 : 30}px ${INTER}`; x.fillStyle = INK
    if (j === blurRow) { for (let q = 0; q < 14; q++) R(x, '#9aa89a', -270 + q * 44, y - 12, 34, 24); label(x, '???', 300, y, { size: 30, col: RED }) }
    else x.fillText(r, -276, y)
  })
  x.restore()
}
const ROWS = ['FLY OUT: friday, 8:40', "LEO'S FAVOURITE BEACH", 'SUNSET TABLE: booked', 'A DINNER WHERE LEO GETS THE SPOTLIGHT']

const F = makeM47({
  id: 'kxmue04', series: 'makeup', dur: 90, ending: 'loop', loopLen: 0.45,
  hook: { text: 'Dressed up. | They *didn’t look up.*', out: 2.9, top: 200, size: 108 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'the spreadsheet *twist* is at the end', top: 1290 },
  chapters: [{ at: 3.0, title: 'the fight' }, { at: 19.5, title: 'the time-out' }, { at: 35.5, title: 'the opener' }, { at: 51.0, title: 'the hard part' }, { at: 69.0, title: 'the mend' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.5 },
    { k: 'scratch', at: 0.7, len: 1.4, caption: 'the outfit. the twirl. | *the laptop.*', top: 1500 },
    { k: 'caught', at: 0.8, x: 912, y: 1215, r: 110, out: [2.2, 2.35], label: 'THE LAPTOP', arrow: 'tr' },
    { k: 'caught', at: 16.2, x: 540, y: 908, r: 440, ry: 60, out: [18.4, 18.6], label: 'ROW 4??', arrow: 'br', rec: false, color: GOLD },
    { k: 'glitch', at: 21.4, len: 1.8, text: 'LOVE.EXE: language not recognised', buttons: ['RETRY', 'SULK'] },
    { k: 'caught', at: 77.0, x: 540, y: 908, r: 450, ry: 64, out: [80.2, 80.4], label: 'ROW 4', arrow: 'br', rec: false, color: GOLD },
  ],
  lines: [
    say(3.4, LEO, 'I wore the *sparkly* one. for you.'),
    say(6.8, CAP, 'mm-hm. one sec, finishing *this.*'),
    say(10.2, LEO, 'you never *notice* me!'),
    say(13.2, CAP, 'never? I planned our whole *TRIP!*'),
    say(24.2, LEO, "a spreadsheet isn't a *compliment.*"),
    stars(28.0, "you're both saying *I love you.*"),
    stars(31.4, 'just in different *accents.*'),
    say(41.4, CAP, 'you first. I *want* to know.'),
    say(44.6, LEO, 'okay. but you answer *too.*'),
    say(51.6, LEO, 'being *seen.* out loud. in words.'),
    say(55.2, CAP, "being helped. quietly. that's how I *say* it."),
    say(59.2, CAP, "I don't know how to do the *out-loud* kind."),
    say(63.0, LEO, 'you already do. just say the rows *out loud.*'),
    say(66.2, CAP, '…okay. trying. *now.*'),
    say(69.4, CAP, 'you look *amazing.* I noticed. at 7:02.'),
    say(72.8, LEO, '…say that *AGAIN.*'),
    say(75.4, CAP, 'also: read *row 4.*'),
    say(81.0, LEO, "…I'm going to *cry.*"),
  ],
  boxes: [{ from: 0, to: 4, close: 19.2 }, { from: 4, to: 5, close: 27.3 }, { from: 5, to: 7, close: 35.2 }, { from: 7, to: 9, close: 50.6 }, { from: 9, to: 14, close: 68.8 }, { from: 14, to: 17, close: 77.6 }, { from: 17, to: 18, close: 86.2 }],
  cards: [{ at: 36.2, out: [40.6, 41.0], label: 'TALK CARD', text: 'What makes you feel | *most loved?*', top: 470, size: 66 }],
  last: { at: 87.6, text: 'Love them in | *their* language.', top: 300 },
  beats: [15.0, 47.6, 83.0],
  shots: [
    // A · the twirl (0–3)  — frame 0 and the loop target
    { at: 0, set: 'room', setOpts: { couch: false, lamp: false }, rug: true, cam: [1.1, 540, 900], push: 0.03,
      draw(x, t) {
        mendHeart(x, t, 540, 470, 10, MEND)
        spotlight(x, t, 300, 1180)
        twinkles(x, t, 300, 980)
        star(x, t, LEO, { x: 300, y: 1000, s: 270, mood: 'sparkle', look: [1, -0.5], hops: [-0.2, 1.2], squash: 0.07 * Math.sin(t * 14) })
        star(x, t, CAP, { x: 750, y: 1020, s: 240, mood: 'squint', look: [0, 1] })
        laptop(x, t, 910, 1250, { s: 0.72 })
      },
      pis: { x: 980, y: 1300, s: 100, tears: 2, mood: 'wide', look: [-1, -1] } },
    // B · the fight (3–19.5)
    { at: 3.0, set: 'room', setOpts: { couch: false, lamp: false }, rug: true, cam: [1.1, 540, 900], push: 0.05,
      draw(x, t, S) {
        mendHeart(x, t, 540, 560, 11, MEND, { wobble: t > 10 ? 1.6 : 1 })
        spotlight(x, t, 300, 1180, t < 10 ? 1 : 0.4)
        if (t < 10) twinkles(x, t, 300, 980, 6)
        star(x, t, LEO, { x: 300, y: 1010, s: 250, mood: t < 10 ? 'sparkle' : 'squint', look: [1, 0], hops: S.hopsFor(LEO) })
        star(x, t, CAP, { x: 750, y: 1020, s: 240, mood: t < 13 ? 'squint' : 'wide', look: t < 10 ? [0, 1] : [-1, 0], hops: S.hopsFor(CAP) })
        laptop(x, t, 910, 1250, { s: 0.72 })
      },
      pis: t => ({ x: 980, y: 1300, s: 100, tears: t < 12 ? 1 : 2, mood: 'wide', look: [-1, -1] }) },
    // C · the time-out (19.5–27.5): split
    { at: 19.5, set: 'split', cam: [1.1, 540, 900], push: 0.04,
      draw(x, t, S) {
        label(x, "LEO'S STAGE", 270, 380, { size: 24, col: LEOC.color }); label(x, "CAPRICORN'S DESK", 810, 380, { size: 24, col: CAPC.color })
        spotlight(x, t, 270, 1170, 0.45)
        star(x, t, LEO, { x: 270, y: 1010, s: 210, mood: 'sleepy', zzz: false, look: [1, 1], hops: S.hopsFor(LEO) })
        star(x, t, CAP, { x: 760, y: 1010, s: 200, mood: 'squint', look: [1, 1], hops: [23.5, 25.0, 26.5] })
        laptop(x, t, 900, 1150, { s: 0.7 })
        label(x, 'colour-coding feelings…', 810, 820, { size: 22, col: MINT, alpha: 0.6 + 0.4 * Math.sin(t * 4) })
      },
      pis: { x: 120, y: 1300, s: 90, tears: 2, mood: 'sparkle', look: [1, -1], tissue: false } },
    // D · THE STARS (27.5–35.5)
    { at: 27.5, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 31.2 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, LEO, { x: 180, y: 1210, s: 150, mood: 'neutral', look: [1, -1], hops: [32.0] })
        star(x, t, CAP, { x: 900, y: 1210, s: 150, mood: 'neutral', look: [-1, -1], hops: [32.2] })
        const k = pop01(t, 31.8, 0.3, 2) * outK(t, [34.8, 35.2])
        if (k > 0.01) { label(x, 'I LOVE YOU', 180, 1080, { size: 26, col: LEOC.color, alpha: k }); label(x, 'I made a plan', 900, 1080, { size: 26, col: CAPC.color, alpha: k }); label(x, '= same thing', 540, 1260, { size: 30, col: GOLD, alpha: k }) }
      },
      pis: { x: 540, y: 1330, s: 90, tears: 1, mood: 'sparkle', look: [0, -1], tissue: false } },
    // E · the opener (35.5–51): couch, the talk card, the phrasebook
    { at: 35.5, set: 'room', setOpts: { couchX: 540, couchW: 640 }, rug: { y: 1240 }, cam: [1.1, 540, 930], push: 0.05,
      draw(x, t, S) {
        star(x, t, LEO, { x: 360, y: 1010, s: 240, mood: t < 44 ? 'neutral' : 'sparkle', look: [1, 0], hops: S.hopsFor(LEO) })
        star(x, t, CAP, { x: 720, y: 1010, s: 240, mood: t < 41 ? 'neutral' : 'happy', look: [-1, 0], hops: S.hopsFor(CAP) })
        const k = pop01(t, 47.6, 0.35, 2.2)
        if (k > 0.01) { x.save(); x.translate(540, 760); x.scale(k, k); x.rotate(-0.05 + 0.03 * Math.sin(t * 2)); box(x, -190, -70, 380, 140, '#c0577a', { b: 7 }); R(x, '#a8476a', -6, -70, 12, 140); x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PHRASEBOOK', 0, -26); x.font = `700 26px ${MONO}`; x.fillText('LEO ⇄ CAPRICORN', 0, 24); x.restore() }
        mendHeart(x, t, 540, 560, 10, MEND)
      },
      pis: t => ({ x: 960, y: 1300, s: 100, tears: t < 45 ? 1 : 2, mood: 'sparkle', look: [-1, -1] }) },
    // F · the hard part (51–69)
    { at: 51.0, set: 'room', setOpts: { couchX: 540, couchW: 640 }, rug: { y: 1240 }, cam: [1.26, 540, 960], push: 0.06,
      draw(x, t, S) {
        star(x, t, LEO, { x: 380, y: 1030, s: 250, mood: t < 55 ? 'sparkle' : t < 62.8 ? 'neutral' : 'happy', look: [1, 0], hops: S.hopsFor(LEO) })
        star(x, t, CAP, { x: 700, y: 1030, s: 250, mood: t < 59 ? 'neutral' : t < 66 ? 'wide' : 'sparkle', look: [-1, 0], hops: S.hopsFor(CAP) })
        mendHeart(x, t, 540, 720, 12, MEND, { wobble: 0.5 })
      },
      pis: t => ({ x: 900, y: 1290, s: 100, tears: t < 60 ? 2 : 3, mood: 'sparkle', look: [-1, -1] }) },
    // G · the mend (69–90): back to the frame-0 room (so the loop lands home)
    { at: 69.0, set: 'room', setOpts: { couch: false, lamp: false }, rug: true, cam: [1.1, 540, 900], push: 0.0,
      draw(x, t, S) {
        const z = ease.inOutCubic(prog(t, 87.0, 89.55))
        mendHeart(x, t, 540, lerp(560, 470, z), lerp(13, 10, z), MEND)
        sparkles(x, t, 540, 560, MEND, 14, 200, 1, [GOLD, '#fff1c8', PINK])
        hearts(x, t, MEND + 0.2, 540, 520, { n: 6, cell: 7, spread: 260 })
        spotlight(x, t, 300, 1180, prog(t, 72.8, 73.6))
        if (t > 72.8) twinkles(x, t, 300, 980)
        star(x, t, LEO, { x: 300, y: lerp(1010, 1000, z), s: lerp(250, 270, z), mood: t < 72.6 ? 'wide' : 'sparkle', look: [1, -0.5], hops: [...S.hopsFor(LEO), MEND + 0.1, 83.6, 84.0], squash: t > 72.8 ? 0.07 * Math.sin(t * 14) : 0 })
        star(x, t, CAP, { x: 750, y: lerp(1010, 1020, z), s: lerp(240, 240, z), mood: t < 86.6 ? 'happy' : 'squint', look: t < 86.6 ? [-1, 0] : [0, 1], hops: [...S.hopsFor(CAP), MEND + 0.15] })
        laptop(x, t, 910, 1250, { s: 0.72 })
      },
      pis: t => ({ x: 980, y: 1300, s: 100, tears: 3, mood: t < MEND || t > 87 ? 'wide' : 'happy', look: [-1, -1], hops: t > MEND && t < 86 ? [MEND + 0.2, 82.0] : null }) },
  ],
  overlay(x, t) {
    if (inR(t, 14.8, 18.9)) sheet(x, t, pop01(t, 14.8, 0.35, 2) * outK(t, [18.5, 18.9]), ROWS, { blurRow: 3 })
    if (inR(t, 76.2, 80.8)) sheet(x, t, pop01(t, 76.2, 0.35, 2) * outK(t, [80.4, 80.8]), ROWS, { hi: 3 })
    if (inR(t, 81.8, 85.6)) bubble(x, t, 820, 1150, 82.0, 85.4, "I'm crying FOR you", { size: 30, col: '#cfe4ff' })
    if (inR(t, 83.4, 87.0)) { const k = pop01(t, 83.4, 0.3, 2) * outK(t, [86.6, 87.0]); x.save(); x.translate(540, 760); x.scale(k, k); x.rotate(0.04); box(x, -360, -46, 720, 92, '#ffe27a', { b: 6 }); x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('5  COMPLIMENT CAPRICORN (OUT LOUD)', 0, 2); x.restore() }
  },
  cues: [
    ['glitter', 0.0, 0.5], ['whoosh', 0.05, 0.5, 0.04],
    ['tick', 4.0, 0.02], ['tick', 4.25, 0.02], ['tick', 4.5, 0.02], ['tick', 7.6, 0.02], ['tick', 7.85, 0.02],
    ['whoosh', 14.8, 0.4, 0.035], ['pop', 15.0, 987.77, 0.035, 0],
    ['pop', 47.6, 880, 0.035, 0], ['tick', 47.8, 0.04],
    ['pluck', 69.8, 1567.98, 0.03, 0.4, 0.3], ['glitter', 72.8, 73.4],
    ['riser', 73.5, 74.0, 0.025], ['tick', 74.0, 0.07], ['pop', 74.0, 1174.66, 0.05, 0], ['bell', 74.05, 1760, 0.035, 1.3, 0], ['glitter', 74.0, 74.6],
    ['whoosh', 76.2, 0.4, 0.035], ['pop', 76.4, 987.77, 0.035, 0], ['pop', 83.4, 1318.51, 0.035, 0], ['tick', 83.6, 0.04],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
