// kxase02 · Ask the Stars: Extended, ep 2 · "Missing Them, Not Going Back" (75 s vertical, star_advice post, screwed · Fm)
// No end card, no card transition. Hard cut on the punchline. The look lives in ../../kxase01/xkit.js.
//   0.00   frame 0: 2:13 AM. ♏ Scorpio mid-lunge at a phone glowing on the pillow; a red caught circle on it already.
//          Slam title "2 a.m. Missing them. *Again.*"; whip zoom settling.  0.8 record scratch "yep. *the 2 a.m.* feeling."
//   2.2    promise "stay for the 2 a.m. *plot twist*"
//   3.0    1 · THE QUESTION  DM "I miss my ex. | Does that mean *go back?*"
//  12.5    2 · WHY IT HAPPENS  THE STARS: "missing someone is *memory*, not a map." → the screen: THE GOOD BITS (cocoa,
//          laughing, the first snow) → "the mind plays the *trailer*, not the film." → THE FULL REEL (the same fight,
//          the plans that kept falling through). Chip ♏ FIXED WATER · RULED BY MARS & PLUTO.
//  25.0    3 · THE STORY  MON 2:04 · TUE 2:11 · WED 2:13: the same draft "hey stranger", typed and deleted.
//  40.0    4 · WHAT HELPS  "let the feeling visit. don't hand it the *keys.*" → "write it down. text a friend instead."
//          → the TRY THIS card "I miss them. | *I'm still sure.*" → Scorpio writes it in a notebook.
//  55.0    5 · THE ANSWER  WED 2:13 again. Record scratch "plot twist:" — Scorpio texts Pisces instead: "you up?"
//          "always." Pisces bursts in with a blanket, sobbing. 69.0 THURSDAY · 9 AM, a walk in the snow.
//  73.5    last line "Miss them. | *Keep* walking."
import {
  makeX, say, stars, star, bigPhone, phoneSmall, box, R, label, hearts, sparkles, blanket, mug,
  signStar, INK, BONE, GOLD, PINK, RED, MONO, INTER, SERIF, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxase01/xkit.js'

const SCO = 'scorpio', PIS = 'pisces'
const SC = '#ffa8c0'
const night = (x, text, t, at) => { const k = pop01(t, at, 0.3, 2.4); x.save(); x.translate(540, 1640); x.scale(k, k); label(x, text, 0, 0, { size: 44, col: SC }); x.restore() }

// the bedroom at 2 a.m.: Scorpio on the bed, the phone on the pillow
function bedScene(x, t, { lunge = 0, reach = 0, mood = 'wide', look = [1, 0], hops = null, phoneText = 'THEM', glowA = 1 } = {}) {
  const sx = lerp(330, 470, lunge), sy = lerp(960, 900, lunge)
  x.save(); x.translate(sx, sy); x.rotate(0.35 * lunge)
  star(x, t, SCO, { x: 0, y: 0, s: 280, mood, look, hops })
  x.restore()
  phoneSmall(x, t, lerp(640, 600, reach), 1010, { rot: -1.5, s: 1.1, glowA, text: phoneText })
}
// the "trailer" screen: the good bits vs the full reel
function screen(x, t, full) {
  box(x, 140, 380, 800, 520, '#0c0a1c', { b: 10 })
  R(x, full ? '#2a2240' : '#3a2a58', 160, 400, 760, 480)
  label(x, full ? 'THE FULL REEL' : 'THE GOOD BITS', 540, 350, { size: 36, col: full ? BONE : GOLD })
  const sc = Math.floor((t * (full ? 0.8 : 0.9)) % 3)
  const near = !full
  star(x, t, SCO, { x: near ? 470 : 380, y: 700, s: 170, mood: full ? 'neutral' : 'happy', look: [1, 0] })
  star(x, t, 'capricorn', { x: near ? 610 : 700, y: 700, s: 170, mood: full ? 'neutral' : 'happy', look: [-1, 0] })
  const cap = full ? ['the same fight, again', 'plans that kept falling through', '"we want different things"'][sc] : ['cocoa on the first snow', 'laughing till 3 a.m.', 'the inside joke'][sc]
  label(x, cap, 540, 840, { size: 30, col: full ? '#c9c4d8' : '#ffe2a0' })
  if (!full) { mug(x, t, 540, 790, 0.6); hearts(x, t, Math.floor(t / 1.2) * 1.2, 540, 600, { n: 3, cell: 5, spread: 120 }) }
  // film grain lines / scan
  x.save(); x.globalAlpha = 0.18; for (let y = 400; y < 880; y += 8) R(x, '#000', 160, y, 760, 3); x.restore()
}
function notebook(x, t, at) {
  const k = pop01(t, at, 0.35, 2)
  if (k <= 0.01) return
  x.save(); x.translate(560, 1150); x.rotate(-0.06); x.scale(k, k)
  box(x, -230, -120, 460, 240, '#f5eedf', { b: 7 })
  for (let i = 0; i < 4; i++) R(x, 'rgba(90,120,200,0.35)', -210, -70 + i * 50, 420, 3)
  R(x, '#e86a5a', -180, -120, 4, 240)
  const s = 'I miss them. I’m still sure.'
  const n = Math.floor(clamp(prog(t, at + 0.4, at + 2.6)) * s.length)
  x.font = `italic 500 44px ${SERIF}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(s.slice(0, Math.min(n, 12)), -160, -42); if (n > 13) x.fillText(s.slice(13, n), -160, 8)
  x.restore()
}

const F = makeX({
  id: 'kxase02', series: 'ask', dur: 75, ending: 'cut',
  hook: { text: '2 a.m. Missing them. | *Again.*', out: 2.9, top: 200, size: 112, color: SC },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'stay for the 2 a.m. *plot twist*', top: 1300 },
  chapters: [{ at: 3.0, title: 'the question' }, { at: 12.5, title: 'why it happens' }, { at: 25.0, title: 'the story' }, { at: 40.0, title: 'what helps' }, { at: 55.0, title: 'the answer' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'caught', at: -1, x: 640, y: 1010, r: 150, ry: 120, label: '2:13 AM', arrow: 'bl', rec: true, out: [2.7, 2.9] },
    { k: 'scratch', at: 0.8, len: 1.3, caption: 'yep. *the 2 a.m.* feeling.', top: 1480 },
    { k: 'whip', at: 30.0, len: 0.4, from: 1.25 }, { k: 'whip', at: 35.0, len: 0.4, from: 1.25 },
    { k: 'scratch', at: 56.6, len: 1.2, caption: 'plot twist:', top: 1480 },
    { k: 'shake', at: 63.0, len: 0.4, amp: 18 },
    { k: 'whip', at: 69.0, len: 0.45, from: 1.3 },
  ],
  dm: { at: 3.2, out: [12.2, 12.5], text: 'I miss my ex. | Does that mean *go back?*', top: 300 },
  chip: { at: 22.0, out: [24.3, 24.6], text: '♏ FIXED WATER · RULED BY MARS & PLUTO', color: SC, top: 1290 },
  lines: [
    say(5.6, SCO, 'we ended it for real reasons.'),
    say(8.8, SCO, 'so why do I *miss* them?'),
    stars(13.0, 'missing someone is *memory*, not a map.'),
    stars(17.4, 'the mind plays the *trailer*, not the film.'),
    say(36.4, SCO, 'every night. the *same* draft.'),
    stars(40.6, "let the feeling visit. don't hand it the *keys.*"),
    stars(44.6, 'write it down. text a friend instead.'),
    say(64.4, PIS, "I'm SO *proud* of you!!"),
    say(67.6, SCO, 'still miss them. *still sure.*'),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 4, close: 24.6 }, { from: 4, to: 5, close: 39.7 }, { from: 5, to: 7, close: 47.7 }, { from: 7, to: 9, close: 70.6 }],
  cards: [{ at: 48.0, out: [51.6, 51.95], text: 'I miss them. | *I’m still sure.*', label: 'TRY THIS', top: 430, accent: '#c0577a' }],
  last: { at: 73.5, text: 'Miss them. | *Keep* walking.', top: 300, color: SC },
  shots: [
    // A · the lunge (0–3)
    { at: 0, set: 'bedroom', dim: 0.6, cam: [1.18, 520, 900], push: 0.02,
      draw(x, t) { bedScene(x, t, { lunge: 0.85 - 0.25 * prog(t, 2.1, 2.9), reach: 1, mood: 'wide', look: [1, 1] }) },
      pis: { x: 900, y: 1230, s: 130, tears: 1, mood: 'sleepy', look: [-1, -1] } },
    // B · the question (3–12.5)
    { at: 3.0, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, SCO, { x: 520, y: 1040, s: 330, mood: t < 8.6 ? 'neutral' : 'sparkle', look: t < 8.6 ? [0, -1] : [0, 1], hops: S.hopsFor(SCO) })
      },
      pis: t => ({ x: 920, y: 1250, s: 140, tears: t < 8.8 ? 1 : 2, mood: 'sparkle', look: [-1, -0.6] }) },
    // C · why: THE STARS (12.5–16.5), the screen (16.5–25)
    { at: 12.5, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1000, s: 380, mood: 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, SCO, { x: 190, y: 1210, s: 150, mood: 'neutral', look: [1, -1] })
      },
      pis: { x: 900, y: 1230, s: 130, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    { at: 16.2, set: 'sky', setOpts: { dim: 0.6 }, push: 0.05,
      draw(x, t, S) {
        screen(x, t, t > 20.6)
        if (inR(t, 20.6, 21.0)) { x.save(); x.globalAlpha = 1 - prog(t, 20.6, 21.0); R(x, '#ffffff', 160, 400, 760, 480); x.restore() }
        star(x, t, SCO, { x: 300, y: 1130, s: 200, mood: t > 20.8 ? 'wide' : 'heart', look: [1, -1], hops: S.hopsFor(SCO) })
      },
      pis: t => ({ x: 800, y: 1150, s: 170, tears: t > 20.8 ? 2 : 3, mood: 'sparkle', look: [-1, -1], tissue: 'box' }) },
    // D · three nights (25–40)
    { at: 25.0, set: 'bedroom', dim: 0.6, cam: [1.14, 540, 900], push: 0.03,
      draw(x, t, S) { bedScene(x, t, { lunge: 0.15, reach: 0, mood: t > 36 ? 'sparkle' : 'neutral', look: [1, 1], hops: S.hopsFor(SCO), phoneText: null, glowA: 0.5 }) },
      front(x, t) { night(x, t < 30 ? 'MON · 2:04 AM' : t < 35 ? 'TUE · 2:11 AM' : 'WED · 2:13 AM', t, t < 30 ? 25.2 : t < 35 ? 30.0 : 35.0) },
      pis: t => ({ x: 940, y: 1250, s: 110, tears: t < 35 ? 1 : 2, mood: 'sleepy', look: [-1, -1] }) },
    // E · what helps (40–55)
    { at: 40.0, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: t > 51.9 ? 760 : 1010, s: t > 51.9 ? 260 : 370, mood: t > 48 ? 'heart' : 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, SCO, { x: 180, y: 1210, s: 160, mood: t > 52 ? 'happy' : 'neutral', look: [1, -1], hops: [52.2, 52.9, 53.6] })
        notebook(x, t, 52.0)
      },
      pis: { x: 900, y: 1230, s: 130, tears: 2, mood: 'sparkle', look: [-1, -1] } },
    // F · the answer (55–63): WED 2:13 again, the twist
    { at: 55.0, set: 'bedroom', dim: 0.6, cam: [1.14, 540, 900], push: 0.04,
      draw(x, t) { bedScene(x, t, { lunge: t < 56.6 ? lerp(0.2, 0.85, prog(t, 55.2, 56.6)) : 0.6, reach: 1, mood: t < 59.6 ? 'wide' : 'happy', look: [1, 1], phoneText: null }) },
      front(x, t) { night(x, 'WED · 2:13 AM', t, 55.1) },
      pis: false },
    // G · Pisces bursts in (63–69)
    { at: 63.0, set: 'bedroom', dim: 0.7, cam: [1.14, 540, 900], push: 0.04,
      draw(x, t, S) {
        star(x, t, SCO, { x: 380, y: 960, s: 250, mood: t > 67.4 ? 'happy' : 'sparkle', look: [1, 0], hops: S.hopsFor(SCO) })
        const px = lerp(1100, 680, ease.outBack(prog(t, 63.0, 63.6)))
        star(x, t, PIS, { x: px, y: 960, s: 250, mood: 'happy', look: [-1, 0], tears: 3, hops: S.hopsFor(PIS).concat([63.2, 63.6]) })
        blanket(x, 530, 1010, 620, 200, '#7c74f0')
        mug(x, t, 840, 1130, 0.8)
        if (t > 64.4) hearts(x, t, 64.4, 540, 800, { n: 6, cell: 6, spread: 260 })
      },
      pis: false },
    // H · Thursday morning walk (69–75)
    { at: 69.0, set: 'street', cam: [1.1, 540, 900], push: 0.03, noFlash: true,
      draw(x, t) {
        const w = (t - 69) * 40
        star(x, t, SCO, { x: 300 + w, y: 1060, s: 220, mood: 'happy', look: [1, 0], hops: [69.3, 69.8, 70.3, 70.8, 71.3, 71.8, 72.3, 72.8, 73.3, 73.8, 74.3] })
        star(x, t, PIS, { x: 130 + w, y: 1080, s: 180, mood: 'happy', look: [1, 0], tears: 2, hops: [69.55, 70.05, 70.55, 71.05, 71.55, 72.05, 72.55, 73.05, 73.55, 74.05] })
      },
      front(x, t) { label(x, 'THURSDAY · 9 AM', 540, 1560, { size: 36, col: INK }) },
      pis: false },
  ],
  overlay(x, t) {
    if (t >= 25.6 && t < 39.8) {
      const k = pop01(t, 25.6, 0.35, 2) * outK(t, [39.4, 39.8])
      const D = 'hey stranger'
      const cyc = t < 30 ? 25.8 : t < 35 ? 30.4 : 35.4
      const u = t - cyc, n = u < 1.6 ? u / 1.6 * D.length : u < 2.6 ? D.length : Math.max(0, D.length - (u - 2.6) / 0.8 * D.length)
      bigPhone(x, t, { cx: 650, cy: 720, w: 480, h: 560, title: 'them', pop: k, accent: SC, draft: { text: D, chars: n },
        msgs: [{ at: -9, from: 'them', name: 'LAST MESSAGE · OCTOBER', nameCol: '#c9c4d8', text: 'take care of yourself, ok?' }] })
    }
    if (t >= 57.8 && t < 62.9) {
      const k = pop01(t, 57.8, 0.35, 2) * outK(t, [62.5, 62.9])
      bigPhone(x, t, { cx: 650, cy: 720, w: 480, h: 560, title: 'pisces ♓︎', pop: k, accent: SC, typing: [58.9, 59.6],
        msgs: [
          { at: 58.3, from: 'me', text: 'you up?' },
          { at: 59.6, from: 'them', name: 'PISCES', nameCol: '#c8d8ff', text: 'always.' },
          { at: 60.8, from: 'them', name: 'PISCES', nameCol: '#c8d8ff', text: 'coming over. bringing the big blanket' },
        ] })
    }
  },
  cues: [
    ['whoosh', 20.6, 0.3, 0.04], ['pop', 20.62, 392, 0.04, 0],
    ...[25.8, 30.4, 35.4].flatMap(c => [['tick', c, 0.02], ['tick', c + 0.5, 0.02], ['tick', c + 1.0, 0.02], ['tick', c + 1.5, 0.02], ['whoosh', c + 2.6, 0.7, 0.025]]),
    ['tick', 52.4, 0.02], ['tick', 52.9, 0.02], ['tick', 53.4, 0.02], ['tick', 53.9, 0.02],
    ['pop', 58.3, 1318.51, 0.04, 0], ['tick', 59.0, 0.02], ['tick', 59.3, 0.02], ['pop', 59.6, 987.77, 0.04, 0], ['pop', 60.8, 1174.66, 0.04, 0],
    ['whoosh', 62.95, 0.3, 0.05], ['pluck', 63.4, 659.25, 0.035, 0.5, 0.3], ['pluck', 63.6, 587.33, 0.035, 0.5, 0.3], ['glitter', 64.4, 65.0],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
