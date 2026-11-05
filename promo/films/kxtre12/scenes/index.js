// kxtre12: WHAT THEY SAID vs WHAT THEY MEANT, "What They Said vs What They Meant: Maybe I'll Come" (116 s vertical,
// Trends: Extended ep 12, rows in promo/films/month2/m41.md; music: house · G). Engine: ../../kxtre01/scenes/xkit.js.
// No end card; hard cut. One holiday party, one translation per chapter: what a sign SAID, then the MEANT sticker slaps on.
// ♒ Aquarius almost doesn't come; ♌ Leo "just threw this on"; ♉ Taurus guards the dip; ♍ Virgo "is just observing";
// ♈ Aries "oh, you're here?" to ♎ Libra; ♓ Pisces is "fine" (crying, happy); ♋ Cancer, the host, has the last translation.
//   0.0–3.6   frame 0: the party mid-freeze, confetti stopped in the air, a SAID / MEANT label slamming over Aquarius
//   1 THE INVITE · 2 THE ARRIVAL · 3 THE SNACKS · 4 THE CORNER · 5 THE CRUSH · 6 THE TOAST · 7 THE GOODBYE
//   8 THE LAST TRANSLATION: "thanks for coming" → MEANT: "I made this whole party so you'd come."
//   Last: "You came. | *That was the point.*"
import {
  makeEp, star, pisces, room, partyRoom, table, tag, sfx, hearts, sparkles, confetti, phone, label, glowSpot, drawBits,
  prog, lerp, clamp, ease, R, box, GOLD, BONE, PINK, INK, MINT, SKYB, RED, INTER, r3,
} from '../../kxtre01/scenes/xkit.js'

const ACC = '#7fd0ff'
const AQU = 'aquarius'
function frozenConfetti(x, t, k = 1) { const C = [GOLD, PINK, SKYB, MINT, BONE]; for (let i = 0; i < 40; i++) { x.fillStyle = C[i % 5]; x.save(); x.translate((i * 137) % 1080, 300 + ((i * 89) % 900) + (1 - k) * 0); x.rotate(i); x.fillRect(-9, -4, 18, 8); x.restore() } }
function dip(x, cx, cy) { box(x, cx - 80, cy - 20, 160, 50, '#ffffff', { b: 5 }); R(x, '#9fd06a', cx - 70, cy - 20, 140, 18); for (let i = 0; i < 4; i++) drawBits(x, ['.Y.', 'YYY'], { Y: '#ffd27a' }, cx - 120 + i * 80, cy + 50, 8) }
function said(x, t, S, cx, cy, text, at = 1.4, size = 46) {
  const k = S.w(at, S.t1 - S.t0 - 0.2)
  if (k <= 0.01) return
  tag(x, 'SAID', cx - 160, cy - 80, k, { bg: BONE, size: 26, rot: -0.08 })
  tag(x, `“${text}”`, cx, cy, k, { bg: BONE, size, rot: -0.03 })
}
function meant(x, t, S, cx, cy, text, at = 5.6, size = 42) {
  const k = S.w(at, S.t1 - S.t0 - 0.2, 0.2)
  if (k <= 0.01) return
  const slam = 1 + 0.4 * (1 - ease.outCubic(prog(S.u, at, at + 0.2)))
  tag(x, 'MEANT', cx - 170, cy - 80, k * slam, { bg: RED, col: BONE, size: 26, rot: 0.08 })
  tag(x, text, cx, cy, k * slam, { bg: RED, col: BONE, size, rot: 0.03 })
}
const SM_CUES = (sat = 1.4, mat = 5.6) => [['pop', sat, 880, 0.05, 0], ['tick', r3(sat + 0.02), 0.04], ['whoosh', r3(mat - 0.15), 0.2, 0.04], ['tom', mat, 120, { gain: 0.25, decay: 0.15 }], ['pop', r3(mat + 0.05), 523.25, 0.05, 0]]
const party = (x, t) => partyRoom(x, t, { warm: 1 })

function hook(x, t, S) {
  party(x, t)
  frozenConfetti(x, t)
  star(x, t, AQU, { x: 540, y: 1060, s: 270, mood: 'wide', look: [0, 0], bob: 0 })
  ;[['leo', 200], ['taurus', 880]].forEach(([id, px]) => star(x, t, id, { x: px, y: 1100, s: 180, mood: 'happy', look: [px < 540 ? 1 : -1, 0], bob: 0 }))
  const sl = 1 + 0.6 * (1 - ease.outCubic(clamp((t + 0.25) / 0.35)))
  tag(x, 'SAID', 360, 760, sl, { bg: BONE, size: 64, rot: -0.1 })
  tag(x, 'MEANT', 720, 760, sl, { bg: RED, col: BONE, size: 64, rot: 0.1 })
  pisces(x, t, { x: 930, y: 1420, s: 130, tears: 2, look: [-1, -1] })
  void S
}

const C = []
C.push({ name: 'THE INVITE', dur: 14, stamp: 'TUESDAY', caption: 'the invite. Aquarius *replies.*', captionAt: 10.0,
  cues: [['pop', 0.6, 1046.5, 0.05, 0], ...Array.from({ length: 10 }, (_, i) => ['tick', r3(2.2 + i * 0.18), 0.02]), ['pop', 4.2, 783.99, 0.05, 0], ['whoosh', 5.45, 0.2, 0.04], ['tom', 5.6, 120, { gain: 0.25, decay: 0.15 }]],
  draw(x, t, S) {
    room(x, t, { wall: '#202a4a', wall2: '#263052', night: true })
    phone(x, t, 700, 760, { w: 440, h: 560, title: '♋ CANCER', size: 32, msgs: [{ at: S.at(0.6), me: false, text: 'party saturday! come??' }, ...(S.u > 4.2 ? [{ at: S.at(4.2), me: true, text: "maybe I'll come" }] : [])], typing: S.u < 4.2 ? { from: S.at(2.2), to: S.at(4.0), text: "maybe I'll come" } : null })
    star(x, t, AQU, { x: 280, y: 1080, s: 200, mood: S.u > 5.6 ? 'squint' : 'neutral', look: [1, -0.6], hops: S.hops(4.2) })
    meant(x, t, S, 540, 1260, "I'm scared nobody will talk to me", 5.6, 34)
    pisces(x, t, { x: 930, y: 1450, s: 110, tears: 2, look: [-1, -1], pop: S.w(7, 14) })
  } })
const sm = (name, caption, speaker, sx, saidTxt, meantTxt, extra = {}) => ({ name, dur: extra.dur || 14, caption, captionAt: 9.6,
  cues: [...SM_CUES(), ...(extra.cues || [])],
  draw(x, t, S) {
    party(x, t)
    if (extra.bg) extra.bg(x, t, S)
    ;(extra.crowd || []).forEach(([id, px], i) => star(x, t, id, { x: px, y: 1120, s: 150, mood: S.u > 5.6 ? 'wink' : 'happy', look: [px < sx ? 1 : -1, -0.3], hops: S.hops(6 + i * 0.2) }))
    star(x, t, speaker, { x: sx, y: 1060, s: 240, mood: S.u > 5.6 ? (extra.mMood || 'squint') : (extra.sMood || 'happy'), look: [0, 0], hops: S.hops(1.4, 5.6), tears: extra.tears ? (S.u > 5.6 ? 3 : 1) : 0 })
    said(x, t, S, 540, 560, saidTxt, 1.4, extra.saidSize || 46)
    meant(x, t, S, 540, 720, meantTxt, 5.6, extra.meantSize || 40)
    if (extra.gag) extra.gag(x, t, S)
    if (speaker !== 'pisces') pisces(x, t, { x: 930, y: 1450, s: 110, tears: 2, look: [-1, -1], pop: S.w(3, 14) })
  } })
C.push(sm('THE ARRIVAL', 'Leo *arrives.*', 'leo', 540, 'I just threw this on', 'three hours. THREE.', {
  bg(x, t, S) { glowSpot(x, 540, 1000, 300, '255,220,150', 0.3 + 0.1 * Math.sin(t * 6)) },
  gag(x, t, S) { if (S.u > 7) sparkles(x, t, 540, 1000, S.at(7 + Math.floor((S.u - 7) / 1.4) * 1.4), 10, 170, S.u) },
  crowd: [['gemini', 200], ['libra', 880]] }))
C.push(sm('THE SNACKS', 'Taurus, *by the dip.*', 'taurus', 420, "I'm not hungry", 'guarding the dip. with my life.', {
  bg(x, t, S) { table(x, 700, 1150, { w: 360 }); dip(x, 700, 1120) },
  gag(x, t, S) { const reach = Math.sin(Math.PI * prog(S.u, 9.4, 10.4)); star(x, t, 'gemini', { x: 920 - reach * 80, y: 1100, s: 150, mood: reach > 0.5 ? 'wide' : 'happy', look: [-1, 0] }); if (S.u > 10) sfx(x, t, 'NOPE', 560, 900, S.at(10), { size: 50, col: GOLD }) },
  cues: [['tom', 10.0, 160, { gain: 0.2, decay: 0.1 }]] }))
C.push(sm('THE CORNER', 'Virgo, *in the corner.*', 'virgo', 260, "I'm just observing", 'please invite me to the game', {
  bg(x, t, S) { box(x, 560, 1060, 380, 80, '#2a6a3a', { b: 6 }); for (let i = 0; i < 6; i++) box(x, 580 + i * 58, 1040, 40, 56, BONE, { b: 3 }) },
  gag(x, t, S) {
    star(x, t, 'gemini', { x: 760, y: 1000, s: 170, mood: 'happy', look: [-1, 0], hops: S.hops(10.0) })
    if (S.u > 10) { tag(x, '“want to play?”', 760, 860, S.w(10, 13.8), { bg: MINT, size: 34 }); hearts(x, t, S.at(10.6), 260, 900) }
  },
  sMood: 'neutral', mMood: 'sparkle' }))
C.push(sm('THE CRUSH', 'then Libra *walks in.*', 'aries', 360, "oh, you're here?", "I came because you'd be here", {
  gag(x, t, S) { const w = ease.outCubic(prog(S.u, 0.2, 1.2)); star(x, t, 'libra', { x: lerp(1180, 760, w), y: 1060, s: 230, mood: S.u > 10 ? 'heart' : 'happy', look: [-1, 0], hops: S.hops(10) }); if (S.u > 10) tag(x, '“…me too, honestly.”', 760, 880, S.w(10, 13.8), { bg: PINK, size: 34 }) },
  sMood: 'wink', mMood: 'heart', cues: [['bell', 10.0, 1318.51, 0.04, 1.0, 0.4]] }))
C.push(sm('THE TOAST', 'Pisces *gives a toast.*', 'pisces', 540, "I'm fine", 'crying. HAPPY crying.', {
  tears: true, sMood: 'sparkle', mMood: 'happy',
  gag(x, t, S) { tissue(x, 760, 1150); if (S.u > 8) confetti(x, t, S.at(8), 540, 900) },
  crowd: [['leo', 200], ['taurus', 880]], cues: [['pluck', 6.0, 392, 0.04, 0.6, 0], ['pluck', 6.3, 349.23, 0.04, 0.6, 0]] }))
function tissue(x, cx, cy) { box(x, cx - 50, cy - 30, 100, 60, '#9fd8f6', { b: 4 }); R(x, '#ffffff', cx - 12, cy - 60, 24, 34) }
C.push(sm('THE GOODBYE', 'Aquarius, *at the door.*', AQU, 400, "I'll head out", 'best night all year', {
  bg(x, t, S) { box(x, 700, 640, 260, 600, '#8a5a3a', { b: 8, hi: '#a8744c' }); R(x, GOLD, 730, 940, 20, 20) },
  gag(x, t, S) { if (S.u > 8.4) { const k = S.w(8.4, 13.8); x.save(); x.globalAlpha = k; box(x, 140, 1250, 300, 120, BONE, { b: 5 }); label(x, 'earlier: dancing', 290, 1280, { size: 22, col: INK, font: INTER, weight: 800 }); star(x, t, AQU, { x: 290, y: 1340, s: 70, mood: 'happy', hops: [S.at(9), S.at(9.5), S.at(10), S.at(10.5), S.at(11)] }); x.restore() } },
  sMood: 'neutral', mMood: 'happy' }))
C.push({ name: 'THE LAST TRANSLATION', dur: 14.4, caption: null,
  cues: [...SM_CUES(1.4, 5.4), ['bell', 8.0, 1567.98, 0.05, 1.2, 0], ['glitter', 8.0, 8.8]],
  draw(x, t, S) {
    party(x, t)
    box(x, 700, 640, 260, 600, '#8a5a3a', { b: 8, hi: '#a8744c' })
    star(x, t, 'cancer', { x: 330, y: 1060, s: 240, mood: S.u > 5.4 ? 'sparkle' : 'happy', look: [1, 0], hops: S.hops(1.4, 5.4, 8.4, 10.4, 12.4), blush: 1 })
    star(x, t, AQU, { x: 760, y: 1060, s: 230, mood: S.u > 8 ? 'heart' : 'wide', look: [-1, 0], hops: S.hops(8.0, 8.4, 10.8, 12.8) })
    x.save(); x.globalAlpha = 1 - prog(S.u, 11.6, 12.2)
    said(x, t, S, 540, 560, 'thanks for coming', 1.4, 46)
    meant(x, t, S, 540, 720, "I made this whole party so you'd come", 5.4, 32)
    x.restore()
    if (S.u > 8) hearts(x, t, S.at(8 + Math.floor((S.u - 8) / 1.6) * 1.6), 545, 900, { n: 6 })
    pisces(x, t, { x: 930, y: 1450, s: 140, tears: 3, look: [-1, -1], hops: S.hops(8.2, 8.6, 11) })
  } })

const EP = makeEp({
  id: 'kxtre12', bug: 'SAID / MEANT', lead: AQU, accent: ACC, deep: '#2f6fb0',
  music: { style: 'house', key: 'G', seed: 4112, breakdown: [73.6], lift: [87.6] },
  hook: {
    text: 'They said | *“maybe I’ll come.”*', len: 3.6, draw: hook, top: 250, size: 104,
    fx: [['whip', { at: -0.08, len: 0.45, from: 1.3, blur: 6 }], ['rec', { at: 1.0, len: 1.5, caption: 'what they *meant*, though…', top: 1180 }]],
  },
  promiseAt: 2.55,
  promise: 'the last translation, *though.*',
  chapters: C,
  last: { text: 'You came. | *That was the point.*', at: 12.4, top: 300, size: 100 },
  ending: 'cut',
  hits: [87.6, 107.0],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [glowSpot, label, r3]
