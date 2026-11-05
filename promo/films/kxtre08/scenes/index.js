// kxtre08: ME AT 2 PM vs ME AT 2 AM, "Me at 2 PM vs Me at 2 AM: Missing an Ex" (116 s vertical, Trends: Extended ep 8,
// rows in promo/films/month2/m41.md; music: synthwave · Cm). Engine: ../../kxtre01/scenes/xkit.js. No end card; loops.
// Split screen all the way: bright 2 PM ♏ Scorpio (over it) vs midnight-blue 2 AM Scorpio (not). ♌ Leo at brunch;
// ♓ Pisces calls at 2 AM, also awake, also crying. 2 AM me writes it in the notes app instead of sending it.
//   0.0–3.6   frame 0: the split mid-flip, 2 PM mid-jump, 2 AM mid-faceplant into a pillow; glitch + whip
//   1 THE PLAYLIST · 2 THE PHOTOS · 3 THE DRAFT ("hey. random but") · 4 THE FRIENDS (brunch / Pisces calls)
//   5 THE THUMB (hovering over SEND) · 6 2 AM CHOOSES (a note to self) · 7 THE MORNING ("you're healing, not failing")
//   8 TOGETHER: the line between them disappears. Last: "Missing them | *isn't going back.*" Loops to frame 0.
import {
  makeEp, star, pisces, room, tag, sfx, hearts, sparkles, phone, label, glowSpot, split, drawBits, table,
  prog, lerp, clamp, ease, R, box, GOLD, BONE, PINK, INK, MINT, SKYB, RED, INTER, MONO, r3,
} from '../../kxtre01/scenes/xkit.js'

const ACC = '#c9a6ff'
const SCO = 'scorpio'
const day = (x, t) => room(x, t, { wall: '#5a4a8a', wall2: '#6a5a9a', floor: '#6a4a5a', night: false, warm: 1 })
const night = (x, t) => { room(x, t, { wall: '#141a3a', wall2: '#182042', floor: '#1a1a30', night: true, lamp: false }); glowSpot(x, 540, 1000, 380, '120,150,255', 0.25) }
const bed = (x) => { box(x, 300, 1120, 480, 120, '#3a4a8a', { b: 8, hi: '#4a5aa0' }); box(x, 320, 1070, 160, 60, BONE, { b: 6 }) }
function sco(x, t, o) { return star(x, t, SCO, { x: 540, y: 1000, s: 230, look: [0, 0], ...o }) }
function photo(x, cx, cy, s, t) { box(x, cx - 150 * s, cy - 120 * s, 300 * s, 240 * s, BONE, { b: 6 }); R(x, '#7a8ac8', cx - 130 * s, cy - 100 * s, 260 * s, 170 * s); star(x, t, SCO, { x: cx - 50 * s, y: cy - 10 * s, s: 110 * s, mood: 'happy', glyph: false }); star(x, t, 'cancer', { x: cx + 50 * s, y: cy - 10 * s, s: 110 * s, mood: 'happy', glyph: false }) }
const LBL = ['2 PM', '2 AM']
const SPL = (S, L, Rt, o = {}) => (x, t) => split(x, t, (cx, tt) => L(cx, tt, S), (cx, tt) => Rt(cx, tt, S), { labels: LBL, ...o })

function hook(x, t, S) {
  split(x, t, (cx, tt) => { day(cx, tt); sco(cx, tt, { y: 900, s: 250, mood: 'wink', squash: -0.08, hops: [-0.1] }); sfx(cx, tt, 'OVER IT', 540, 640, -0.2, { size: 52, col: GOLD, life: 4 }); sparkles(cx, tt, 540, 900, -0.2, 10, 180, 1) },
    (cx, tt) => { night(cx, tt); bed(cx); cx.save(); cx.translate(470, 1060); cx.rotate(1.2); sco(cx, tt, { x: 0, y: 0, s: 240, mood: 'squint' }); cx.restore(); sfx(cx, tt, 'mmmph', 560, 860, -0.3, { size: 46, col: SKYB, life: 4 }) }, { labels: LBL })
  pisces(x, t, { x: 960, y: 1450, s: 120, tears: 2, look: [-1, -1] })
  void S
}

const C = []
C.push({ name: 'THE PLAYLIST', dur: 14, caption: 'the *playlist* situation.',
  cues: [['pluck', 1.4, 783.99, 0.04, 0.3, -0.5], ['pluck', 1.7, 987.77, 0.04, 0.3, -0.5], ['pluck', 6.4, 261.63, 0.04, 1.2, 0.5]],
  draw: (x, t, S) => SPL(S, (cx, tt, S) => {
    day(cx, tt); sco(cx, tt, { mood: 'happy', hops: S.hops(...Array.from({ length: 14 }, (_, i) => 1 + i * 0.9)) })
    tag(cx, '▶ MAIN CHARACTER RUN', 540, 640, S.w(1, 14), { bg: GOLD, size: 30 })
    for (let i = 0; i < 4; i++) { const ph = (S.u * 0.6 + i / 4) % 1; label(cx, '♫', 400 + i * 80, 900 - ph * 300, { size: 54, col: GOLD, alpha: Math.sin(Math.PI * ph), font: INTER }) }
  }, (cx, tt, S) => {
    night(cx, tt); bed(cx); sco(cx, tt, { y: 1020, mood: 'sleepy', look: [0, -1] })
    tag(cx, '▶ track 1: "us?"', 540, 640, S.w(6.2, 14), { bg: '#8fb0ff', size: 30 })
    box(cx, 330, 720, 420, 20, '#2a3060', { b: 4 }); R(cx, SKYB, 330, 720, 420 * prog(S.u, 6.2, 14), 20)
  })(x, t) })
C.push({ name: 'THE PHOTOS', dur: 14, caption: 'the *photos.*',
  cues: [['whoosh', 2.4, 0.3, 0.04], ['pop', 3.2, 392, 0.05, -0.5], ['riser', 6.0, 9.0, 0.02]],
  draw: (x, t, S) => SPL(S, (cx, tt, S) => {
    day(cx, tt)
    const del = ease.inCubic(prog(S.u, 2.4, 3.2))
    if (del < 1) { cx.save(); cx.translate(540 + del * 120, 660 + del * 300); cx.scale(1 - del * 0.8, 1 - del * 0.8); photo(cx, 0, 0, 0.8, tt); cx.restore() }
    box(cx, 620, 980, 100, 120, '#8a8aa0', { b: 6 })
    sco(cx, tt, { x: 440, mood: S.u > 3.2 ? 'wink' : 'squint', hops: S.hops(3.2) })
    tag(cx, 'DELETED.', 540, 560, S.w(3.4, 14), { bg: MINT, size: 34 })
  }, (cx, tt, S) => {
    night(cx, tt)
    const z = 0.8 + 1.1 * ease.inOutCubic(prog(S.u, 5.0, 12))
    photo(cx, 540, 720, z, tt)
    sco(cx, tt, { y: 1180, mood: 'sparkle', look: [0, -1], tears: S.u > 10 ? 1 : 0 })
  })(x, t) })
C.push({ name: 'THE DRAFT', dur: 14, caption: 'the *draft.*',
  bubbles: [{ at: 2.0, end: 6.0, x: 270, y: 660, text: 'no.', size: 56 }],
  cues: Array.from({ length: 16 }, (_, i) => ['tick', r3(5.0 + i * 0.25), 0.02]),
  draw: (x, t, S) => SPL(S, (cx, tt, S) => {
    day(cx, tt); sco(cx, tt, { mood: 'squint', hops: S.hops(2.0), look: [1, 0] })
    tag(cx, 'NOT TEXTING THEM', 540, 1240, S.w(6.4, 14), { bg: GOLD, size: 28 })
  }, (cx, tt, S) => {
    night(cx, tt)
    phone(cx, tt, 540, 760, { w: 440, h: 520, title: '♋ (do not)', size: 28, typing: { from: S.at(5.0), to: S.at(9.0), text: 'hey. random but' } })
    sco(cx, tt, { y: 1180, s: 200, mood: 'wide', look: [0, -1] })
  })(x, t) })
C.push({ name: 'THE FRIENDS', dur: 14, caption: 'the *friends.*',
  bubbles: [{ at: 2.0, end: 5.0, x: 270, y: 640, text: 'HAHAHA', size: 44 }, { at: 7.6, end: 11.6, x: 810, y: 560, text: 'are you up too?? (crying)', size: 30, col: '#cfe9ff' }],
  cues: [['pop', 2.0, 659.25, 0.05, -0.5], ['pop', 6.6, 880, 0.05, 0.5], ['pluck', 7.8, 392, 0.04, 0.5, 0.5]],
  draw: (x, t, S) => SPL(S, (cx, tt, S) => {
    day(cx, tt); table(cx, 540, 1150, { w: 400 })
    drawBits(cx, ['.CCCCC.', 'CCCCCCC', 'BBBBBBB'], { C: '#f2b25c', B: '#c9853a' }, 540, 1120, 10)
    sco(cx, tt, { x: 430, mood: 'happy', hops: S.hops(2.0, 2.4, 2.8, 9, 9.4) }); star(cx, tt, 'leo', { x: 660, y: 1000, s: 200, mood: 'happy', look: [-1, 0], hops: S.hops(2.2, 2.6) })
  }, (cx, tt, S) => {
    night(cx, tt); bed(cx)
    sco(cx, tt, { x: 420, y: 1020, s: 200, mood: S.u > 7.6 ? 'sparkle' : 'neutral', look: [1, -0.5], tears: S.u > 8 ? 1 : 0 })
    if (S.u > 6.6) { box(cx, 560, 700, 200, 300, '#14102c', { b: 6 }); cx.save(); cx.beginPath(); cx.rect(560, 700, 200, 300); cx.clip(); pisces(cx, tt, { x: 660, y: 860, s: 150, tears: 3, look: [0, 0], noBox: true }); cx.restore() }
  })(x, t) })
C.push({ name: 'THE THUMB', dur: 13, caption: 'the *thumb.*',
  fx: [['load', { at: 4.0, len: 5.2, label: 'send it?…', stallAt: 99, error: "Error: it's 2 AM", y: 1300 }]],
  bubbles: [{ at: 1.2, end: 4.0, x: 270, y: 560, text: 'NO NO NO', size: 44 }],
  draw: (x, t, S) => SPL(S, (cx, tt, S) => {
    day(cx, tt); sco(cx, tt, { mood: 'wide', squash: 0.05 * Math.sin(tt * 20), hops: S.hops(1.2, 1.6, 2.0), look: [1, 0] })
  }, (cx, tt, S) => {
    night(cx, tt)
    phone(cx, tt, 540, 760, { w: 440, h: 520, title: '♋ (do not)', size: 28, typing: { from: S.at(-10), to: S.at(-9), text: 'hey. random but' } })
    const hov = Math.sin(S.u * 4) * 20
    box(cx, 640 + hov, 1000 - Math.abs(hov), 70, 140, '#f2c0a0', { b: 6 })
    tag(cx, 'SEND', 640, 960, 1, { bg: PINK, size: 28 })
  })(x, t) })
C.push({ name: '2 AM CHOOSES', dur: 14, caption: '2 AM me *writes a note instead.*',
  bubbles: [{ at: 9.6, end: 13.6, x: 270, y: 640, text: 'proud of you.', size: 40 }],
  cues: [...Array.from({ length: 24 }, (_, i) => ['tick', r3(1.0 + i * 0.3), 0.02]), ['bell', 9.4, 1318.51, 0.04, 1.0, -0.5]],
  draw: (x, t, S) => SPL(S, (cx, tt, S) => {
    day(cx, tt); sco(cx, tt, { mood: S.u > 9.4 ? 'heart' : 'neutral', look: [1, 0], hops: S.hops(9.4, 9.8) })
  }, (cx, tt, S) => {
    night(cx, tt)
    box(cx, 300, 500, 480, 560, '#fff4c8', { b: 8 })
    const txt = ['dear me,', "you miss them.", "that's allowed.", 'you are healing,', 'not failing.']
    let left = clamp(prog(S.u, 1.0, 8.4)) * txt.join('').length
    txt.forEach((l, i) => { const s2 = l.slice(0, Math.max(0, Math.floor(left))); left -= l.length; cx.font = `italic 600 ${i ? 40 : 44}px Georgia`; cx.fillStyle = INK; cx.textAlign = 'left'; cx.fillText(s2, 330, 570 + i * 80) })
    sco(cx, tt, { y: 1200, s: 200, mood: 'sparkle', look: [0, -1], tears: 1 })
  })(x, t) })
C.push({ name: 'THE MORNING', dur: 13, stamp: '8:00 AM', caption: 'the *morning.*',
  cues: [['bell', 1.0, 1046.5, 0.04, 1.4, 0], ['glitter', 1.0, 1.8], ['pop', 6.0, 783.99, 0.04, 0]],
  draw(x, t, S) {
    const k = ease.inOutCubic(prog(S.u, 0.3, 2.0))
    split(x, t, (cx, tt) => { day(cx, tt); sco(cx, tt, { mood: 'happy', hops: S.hops(6.0) }) }, (cx, tt) => {
      night(cx, tt); cx.save(); cx.globalAlpha = k; day(cx, tt); cx.restore()
      box(cx, 330, 560, 420, 300, '#fff4c8', { b: 8 }); cx.font = 'italic 600 40px Georgia'; cx.fillStyle = INK; cx.textAlign = 'center'; cx.fillText('you are healing,', 540, 680); cx.fillText('not failing.', 540, 750)
      sco(cx, tt, { y: 1100, mood: S.u > 4 ? 'happy' : 'sleepy', look: [0, -1], hops: S.hops(6.0) })
    }, { labels: ['2 PM', S.u > 1.2 ? '8 AM' : '2 AM'] })
    pisces(x, t, { x: 960, y: 1450, s: 130, tears: 2, mood: 'happy', look: [-1, -1], hops: S.hops(6.0) })
  } })
C.push({ name: 'TOGETHER', dur: 16.4, caption: null,
  cues: [['riser', 1.0, 3.0, 0.03], ['whoosh', 3.0, 0.5, 0.04], ['bell', 4.4, 1567.98, 0.05, 1.2, 0], ['glitter', 4.4, 5.2]],
  draw(x, t, S) {
    const m = ease.inOutCubic(prog(S.u, 1.0, 4.4))
    day(x, t)
    x.save(); x.globalAlpha = 1 - m; R(x, '#141a3a', 540, 0, 540, 1920); x.restore()
    x.save(); x.globalAlpha = 0.45 * prog(S.u, 5, 8); R(x, '#120c2e', 0, 0, 1080, 1920); x.restore()
    if (m < 1) R(x, INK, 534, 0, 12, 1920 * (1 - m))
    const sway = S.u > 5 ? Math.sin((S.u - 5) * 2.4) * 40 : 0
    x.save(); x.translate(sway, 0)
    star(x, t, SCO, { x: lerp(270, 450, m), y: 1000, s: 230, mood: m > 0.9 ? 'heart' : 'happy', look: [1, 0], hops: S.hops(4.4, 4.8, 8, 10, 12) })
    star(x, t, SCO, { x: lerp(810, 630, m), y: 1000, s: 230, mood: m > 0.9 ? 'heart' : 'sparkle', look: [-1, 0], hops: S.hops(4.5, 4.9, 8.2, 10.2, 12.2), tears: m < 0.9 ? 1 : 0 })
    x.restore()
    if (S.u > 4.4) hearts(x, t, S.at(4.4 + Math.floor((S.u - 4.4) / 2) * 2), 540 + sway, 860, { n: 6 })
    const pin = ease.inOutCubic(prog(S.u, 6.0, 8.0))
    pisces(x, t, { x: lerp(960, 760, pin), y: lerp(1450, 1150, pin), s: 150, tears: 3, look: [-1, -1], hops: S.hops(4.6, 5.0, 6.2, 6.8, 7.4, 9, 11, 13) })
  } })
C.forEach(c => { c.noCam = true })

const EP = makeEp({
  id: 'kxtre08', bug: '2 PM / 2 AM', lead: SCO, accent: ACC, deep: '#5a3ab0',
  music: { style: 'synthwave', key: 'Cm', seed: 4108, breakdown: [59.6], lift: [86.6] },
  hook: {
    text: '2 PM: over it. | 2 AM: *not.*', len: 3.6, draw: hook, top: 250, size: 110, noCam: true,
    fx: [['whip', { at: -0.08, len: 0.45, from: 1.3, blur: 6 }], ['glitch', { at: 0.5, len: 0.7, dialog: false }]],
  },
  promiseAt: 1.4,
  promise: 'wait for what *2 AM me* actually does.',
  chapters: C,
  last: { text: 'Missing them | *isn’t going back.*', at: 10.0, top: 300, size: 100 },
  ending: 'loop',
  hits: [86.6, 104.0],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [GOLD, RED, MONO, lerp, clamp]
