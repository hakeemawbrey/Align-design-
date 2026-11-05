// kpnee12: PLANET TALK: NEPTUNE, "Neptune to Pisces: The Movie in Your Head" (82 s vertical, star_advice, long,
// cinematic · Db). Pisces' home planet (modern ruler, as an astrology lens). Hard cut on the payoff.
//   0.00  frame 0: Pisces mid-swoon, falling back into Neptune's arms, heart confetti mid-air, both crying.
//         "Pisces. Sit down. | *Movie night.*" · 0.5 whip zoom · 2.6 the promise: "stay for the ending. | it's *better*
//         than the dream." · "in astrology, I rule Pisces. I *invented* this."
//   6.4   1 · THE OPENING SCENE: three sweet texts on the big screen. "three texts. I've planned our *first holiday.*"
//         · Neptune: "gorgeous opening. I'm *hooked.*"
//  16.0   2 · THE MONTAGE (Neptune in rose glasses): a beach, a dog, an umbrella for two, two mugs. "and then we get a
//         *dog* and—" · "*stop.* I'm crying. keep going." · "and an umbrella for *two.*"
//  28.0   3 · THE PLOT HOLES: house lights up, the glasses come off: "plans moved (again)", "replies once a week",
//         "we'll see :)". "a dream needs a co-star who's actually *there.*" · "…they've moved our plans *twice.*"
//  42.0   4 · THE REWRITE: Pisces asks "do you want to see where this goes?" … "honestly, I'm not looking for that right
//         now." · "that hurts. *and* it's an answer." · Cancer arrives: "I brought tissues. *and* snacks."
//  58.0   5 · THE ENDING: WEEKS LATER, a rainy Tuesday. Someone new shows up under an umbrella: "made it! sorry, the bus
//         was *late.*" · texts: "home safe?" "thursday again?" · "replies. plans. *shows up.*" · "it's quieter than the
//         dream." · "the real ones *usually* are. better, too."
//  79.4   "Eyes on the *real* one." Hard cut.
import { episode, P, drawSpace, drawSign, pop01, outK, prog, ease, lerp, clamp, rng, INK, BONE, GOLD, ROSE, NEP, MONO, INTER } from '../../kpnee01/scenes/nepkit.js'

const D = 82
const T = { promise: 2.6, ch1: 6.4, ch2: 16.0, ch3: 28.0, ch4: 42.0, sent: 44.0, reply: 47.0, friend: 52.4, ch5: 58.0, arrive: 60.4, txt: 64.4, end: 79.4 }
const NEW = '#ffb38a'

function cinema(x, t, { lights = 0 } = {}) {
  drawSpace(x, t, { planet: 'neptune', seed: 121 })
  if (lights > 0) { x.fillStyle = `rgba(255,236,200,${0.22 * lights})`; x.fillRect(0, 0, 1080, 1920) }
  // two seat rows behind the cast
  for (let i = 0; i < 6; i++) P.box(x, 90 + i * 180, 1560, 160, 200, '#7a1430', { r: 26, lw: 6, shadow: false })
  x.fillStyle = '#2a1d4a'; x.fillRect(0, 1640, 1080, 280)
}
function screenWith(x, t, inner, opts = {}) { P.screen(x, 540, 720, 880, 540, inner, { curtain: 0.05, ...opts }) }
function bigTexts(sx, t, msgs) {
  sx.fillStyle = '#231c4a'; sx.fillRect(100, 450, 880, 540)
  let y = 500
  for (const m of msgs) {
    if (t < m.at) continue
    const p = pop01(t, m.at, 0.25)
    sx.save(); sx.translate(m.side === 'R' ? 700 : 380, y + 40); sx.scale(p, p)
    sx.font = `700 40px ${INTER}`; const w = sx.measureText(m.text).width + 60
    sx.fillStyle = m.side === 'R' ? NEP : '#efe6ff'; sx.beginPath(); sx.roundRect(-w / 2, -40, w, 80, 26); sx.fill()
    sx.fillStyle = m.side === 'R' ? '#fff' : INK; sx.textAlign = 'center'; sx.textBaseline = 'middle'; sx.fillText(m.text, 0, 2)
    sx.restore(); y += 110
  }
}
const OPEN = [{ at: T.ch1 + 0.6, side: 'L', text: "you're so funny" }, { at: T.ch1 + 1.3, side: 'L', text: 'we should get food sometime' }, { at: T.ch1 + 2.0, side: 'L', text: 'goodnight!!' }]
function montage(sx, t) {
  const i = Math.floor(Math.max(0, t - T.ch2 - 0.4) / 2.6) % 4
  const g = sx.createLinearGradient(0, 450, 0, 990); g.addColorStop(0, ['#9fd8ff', '#ffd2e4', '#5a6aa0', '#ffe9c0'][i]); g.addColorStop(1, ['#ffe9a8', '#c9e0ff', '#2a2370', '#ffb3cf'][i]); sx.fillStyle = g; sx.fillRect(100, 450, 880, 540)
  const twin = (cx, cy, s) => { drawSign(sx, 'pisces', cx - s * 0.55, cy, s, t, { mood: 'happy', glyph: false, blink: false }); drawSign(sx, 'libra', cx + s * 0.55, cy, s, t, { mood: 'happy', glyph: false, blink: false, color: '#c9c4e0' }) }
  if (i === 0) { sx.fillStyle = '#f2d39a'; sx.fillRect(100, 860, 880, 130); sx.fillStyle = '#ffd98a'; sx.beginPath(); sx.arc(820, 560, 60, 0, Math.PI * 2); sx.fill(); twin(540, 790, 150); P.mono(sx, 'our first holiday', 540, 940, { color: INK, size: 32 }) }
  if (i === 1) { twin(450, 790, 140); sx.fillStyle = '#c98b52'; sx.beginPath(); sx.ellipse(740, 860, 80, 50, 0, 0, Math.PI * 2); sx.fill(); sx.beginPath(); sx.arc(810, 810, 40, 0, Math.PI * 2); sx.fill(); P.mono(sx, 'our dog', 540, 940, { color: INK, size: 32 }) }
  if (i === 2) { for (let k = 0; k < 40; k++) { sx.strokeStyle = 'rgba(200,220,255,0.6)'; sx.lineWidth = 3; const rx = 100 + ((k * 97 + t * 400) % 880), ry = 450 + ((k * 61 + t * 700) % 540); sx.beginPath(); sx.moveTo(rx, ry); sx.lineTo(rx - 10, ry + 30); sx.stroke() } sx.fillStyle = '#e04a5f'; sx.beginPath(); sx.arc(540, 700, 180, Math.PI, 0); sx.fill(); sx.fillStyle = INK; sx.fillRect(536, 700, 8, 150); twin(540, 820, 130); P.mono(sx, 'an umbrella for two', 540, 950, { color: BONE, size: 32 }) }
  if (i === 3) { for (const [mx, c] of [[440, '#9fc0ff'], [640, '#ffb3cf']]) { sx.fillStyle = c; sx.fillRect(mx - 60, 680, 120, 150); sx.strokeStyle = INK; sx.lineWidth = 8; sx.strokeRect(mx - 60, 680, 120, 150) } P.heart(sx, 540, 620, 40, ROSE); P.mono(sx, 'two mugs, forever', 540, 940, { color: INK, size: 32 }) }
  P.glow(sx, 540, 720, 500, '#ffffff', 0.12)
}
function holes(sx, t) {
  sx.fillStyle = '#e8e4f4'; sx.fillRect(100, 450, 880, 540)
  const L = [['plans moved (again)', 400, 560, -0.05], ['replies once a week', 640, 700, 0.04], ["\"we'll see :)\"", 420, 860, -0.03]]
  L.forEach(([s, px, py, r], i) => P.sticker(sx, s, px, py, { k: pop01(t, T.ch3 + 1.0 + i * 1.3, 0.3), col: i === 1 ? '#ffd98a' : BONE, size: 40, rot: r }))
}
function street(x, t) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#141038'); g.addColorStop(1, '#2d2464'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (const lx of [150, 930]) { x.fillStyle = INK; x.fillRect(lx - 10, 700, 20, 900); x.fillStyle = '#ffd98a'; x.beginPath(); x.arc(lx, 690, 34, 0, Math.PI * 2); x.fill(); P.glow(x, lx, 760, 320, '#ffd98a', 0.3) }
  x.fillStyle = '#231c4a'; x.fillRect(0, 1560, 1080, 360)
  for (let k = 0; k < 90; k++) { x.strokeStyle = 'rgba(190,210,255,0.45)'; x.lineWidth = 3; const rx = (k * 97 + t * 300) % 1100, ry = (k * 211 + t * 1400) % 1920; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 12, ry + 40); x.stroke() }
  P.sticker(x, 'WEEKS LATER · A RAINY TUESDAY', 540, 380, { k: pop01(t, T.ch5 + 0.3, 0.3) * outK(t, [T.ch5 + 3.6, T.ch5 + 3.9]), col: BONE, size: 36 })
}
function umbrella(x, t, cx, cy) {
  x.save(); x.translate(cx, cy)
  x.fillStyle = '#e04a5f'; x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, 240, Math.PI, 0); x.closePath(); x.fill(); x.stroke()
  x.fillStyle = INK; x.fillRect(-5, 0, 10, 260)
  x.restore()
}
const LATER = [{ at: T.txt + 0.3, side: 'L', text: 'home safe?' }, { at: T.txt + 1.2, side: 'L', text: 'thursday again?' }, { at: T.txt + 2.1, side: 'R', text: 'yes. <3' }]
const SEATED_N = { x: 230, y: 1340, size: 320 }, SEATED_S = { x: 790, y: 1400, size: 280 }

const E = episode({
  sign: 'pisces', duration: D, ending: 'cut', seat: false,
  entrance: { kind: 'burst', at: -0.45, x: 540, y: 760, size: 520 },
  hook: { text: 'Pisces. Sit down. | *Movie night.*', out: [2.35, 2.55], size: 112 },
  fx: [
    { kind: 'whip', at: 0.5 },
    { kind: 'chapter', at: T.ch1, n: 1, title: 'the opening scene', out: [T.ch2 - 0.3, T.ch2 - 0.05] },
    { kind: 'chapter', at: T.ch2, n: 2, title: 'the montage', out: [T.ch3 - 0.3, T.ch3 - 0.05] },
    { kind: 'chapter', at: T.ch3, n: 3, title: 'the plot holes', out: [T.ch4 - 0.3, T.ch4 - 0.05] },
    { kind: 'chapter', at: T.ch4, n: 4, title: 'the rewrite', out: [T.ch5 - 0.3, T.ch5 - 0.05] },
    { kind: 'chapter', at: T.ch5, n: 5, title: 'the ending', out: [T.end - 0.3, T.end - 0.05] },
  ],
  caps: [
    { at: T.promise, text: 'Stay for the ending. | It’s *better* than the dream.', top: 200, size: 80, out: [6.0, 6.3] },
    { at: T.end, text: 'Eyes on the | *real* one.', top: 250, size: 120 },
  ],
  cry: [],
  shots: [
    { a: -1, b: T.promise, bg: (x, t) => { cinema(x, t); P.hearts(x, t, -1.5, 540, 1500, { n: 18, spread: 1000, life: 4 }) },
      nep: { x: 540, y: 760, size: 520, mood: 'cry', tears: 2 }, sign: { x: 560, y: 1270, size: 330, mood: 'sparkle', tears: 3, look: [0, -1], squash: -0.06 } },
    { a: T.promise, b: T.ch1, bg: (x, t) => cinema(x, t), mid: (x, t) => screenWith(x, t, sx => { sx.fillStyle = '#1d1640'; sx.fillRect(100, 450, 880, 540); P.txt(sx, 'TONIGHT: *you.*', 540, 690, { size: 70 }) }, { curtain: lerp(0.9, 0.05, ease.inOutCubic(prog(t, T.promise + 0.5, T.promise + 2))) }),
      nep: { ...SEATED_N, mood: 'happy' }, sign: { ...SEATED_S, mood: 'sparkle', tears: 2, look: [-1, -0.4] } },
    { a: T.ch1, b: T.ch2, bg: (x, t) => cinema(x, t), mid: (x, t) => screenWith(x, t, sx => bigTexts(sx, t, OPEN)),
      nep: { ...SEATED_N, mood: [[0, 'happy'], [11.8, 'love']] }, sign: { ...SEATED_S, mood: [[0, 'sparkle'], [T.ch1 + 2.2, 'heart']], tears: [[0, 1], [T.ch1 + 2.2, 2]], look: [-0.3, -1] } },
    { a: T.ch2, b: T.ch3, bg: (x, t) => cinema(x, t), mid: (x, t) => { screenWith(x, t, sx => montage(sx, t)); P.hearts(x, t, T.ch2, 540, 1400, { n: 12, spread: 900, life: 10 }) },
      nep: { ...SEATED_N, mood: [[0, 'love'], [21.4, 'cry']], glasses: true, tears: [[0, 0], [21.4, 2]] }, sign: { ...SEATED_S, mood: 'heart', tears: 3, look: [-0.3, -1] } },
    { a: T.ch3, b: T.ch4, bg: (x, t) => cinema(x, t, { lights: prog(t, T.ch3, T.ch3 + 0.8) }), mid: (x, t) => screenWith(x, t, sx => holes(sx, t)),
      nep: { ...SEATED_N, mood: [[0, 'wide'], [T.ch3 + 4.6, 'sad']], glasses: [[0, true], [T.ch3 + 0.4, false]] }, sign: { ...SEATED_S, mood: [[0, 'wide'], [T.ch3 + 8.6, 'neutral']], tears: [[0, 0], [T.ch3 + 9, 3]], look: [-0.3, -1] } },
    { a: T.ch4, b: T.ch5, bg: (x, t) => cinema(x, t, { lights: 0.6 }),
      mid: (x, t) => {
        P.phone(x, t, 540, 760, { w: 600, h: 600, title: 'them', msgs: [{ at: T.sent, side: 'R', text: 'do you want to see where this goes?' }, { at: T.reply, side: 'L', text: "honestly, I'm not looking for that right now." }], k: pop01(t, T.ch4 + 0.3, 0.4) * outK(t, [T.friend - 0.4, T.friend]), typingAt: t < T.reply && t > T.sent + 0.8 ? T.sent + 0.8 : null })
        if (t > T.friend) { drawSign(x, 'cancer', 540, 900, 280, t, { mood: 'happy', pop: pop01(t, T.friend, 0.4), hops: [T.friend + 0.6, T.friend + 1.0, T.friend + 1.4] }); P.box(x, 680, 1010, 150, 110, '#9fd8ff', { r: 12, lw: 6, rot: 0.1, alpha: clamp((t - T.friend) * 3) }); P.mono(x, 'tissues', 680, 1010, { color: INK, size: 24, alpha: clamp((t - T.friend) * 3) }) }
      },
      front: (x, t) => { if (t > T.reply + 0.4 && t < T.friend + 2) P.tub(x, 330, 1210, 1.0) },
      nep: { ...SEATED_N, mood: [[0, 'neutral'], [T.reply + 0.3, 'sad'], [T.friend + 1, 'happy']] }, sign: { ...SEATED_S, mood: [[0, 'neutral'], [T.sent + 1, 'wide'], [T.reply + 0.2, 'neutral'], [T.friend + 0.6, 'happy']], tears: [[0, 0], [T.reply + 0.2, 3], [T.friend + 0.6, 2]], look: [-0.3, -1] } },
    { a: T.ch5, b: T.end, bg: (x, t) => street(x, t),
      back: (x, t) => { if (t > T.arrive) { const k = ease.outCubic(prog(t, T.arrive, T.arrive + 1.2)); const cx = lerp(1300, 700, k); umbrella(x, t, cx, 1010); drawSign(x, 'libra', cx, 1240, 260, t, { color: NEW, glyph: false, mood: 'happy', look: [-1, 0], hops: [T.arrive + 0.4, T.arrive + 0.8, T.arrive + 1.2] }) } },
      mid: (x, t) => { if (t > T.txt) P.phone(x, t, 330, 760, { w: 440, h: 520, title: 'them', msgs: LATER, k: pop01(t, T.txt, 0.4) * outK(t, [T.txt + 5.2, T.txt + 5.6]) }) },
      nep: { x: 200, y: 520, size: 240, mood: [[0, 'happy'], [T.txt + 3.4, 'love']] }, sign: { x: 330, y: 1400, size: 290, mood: [[0, 'neutral'], [T.arrive + 0.6, 'heart']], tears: [[0, 0], [T.arrive + 0.6, 2]], look: [1, -0.2] } },
    { a: T.end, b: D + 1, bg: (x, t) => street(x, t), back: (x, t) => { umbrella(x, t, 700, 1010); drawSign(x, 'libra', 700, 1240, 260, t, { color: NEW, glyph: false, mood: 'happy', look: [-1, 0] }) },
      nep: { x: 200, y: 640, size: 240, mood: 'proud' }, sign: { x: 330, y: 1400, size: 290, mood: 'heart', tears: 2, look: [1, -0.2] } },
  ],
  lines: [
    { t0: T.promise + 0.4, t1: T.ch1 - 0.2, who: 'neptune', text: 'in astrology, I rule Pisces. I *invented* this.', x: 540, y: 1760, tailUp: true, tail: -300 },
    { t0: T.ch1 + 2.6, t1: 11.6, who: 'pisces', text: "three texts. I've planned our *first holiday.*", x: 560, y: 1760, tailUp: true, tail: 230 },
    { t0: 11.8, t1: T.ch2 - 0.2, who: 'neptune', text: "gorgeous opening. I'm *hooked.*", x: 520, y: 1760, tailUp: true, tail: -300 },
    { t0: T.ch2 + 1.8, t1: 21.2, who: 'pisces', text: 'and then we get a *dog* and—', x: 560, y: 1760, tailUp: true, tail: 230 },
    { t0: 21.4, t1: 24.6, who: 'neptune', text: "*stop.* I'm crying. keep going.", x: 520, y: 1760, tailUp: true, tail: -300 },
    { t0: 24.8, t1: T.ch3 - 0.2, who: 'pisces', text: 'and an umbrella for *two.*', x: 560, y: 1760, tailUp: true, tail: 230 },
    { t0: T.ch3 + 4.6, t1: T.ch3 + 8.4, who: 'neptune', text: "a dream needs a co-star who's actually *there.*", x: 540, y: 1760, tailUp: true, tail: -300 },
    { t0: T.ch3 + 8.6, t1: T.ch4 - 0.2, who: 'pisces', text: "…they've moved our plans *twice.*", x: 560, y: 1760, tailUp: true, tail: 230 },
    { t0: T.ch4 + 0.8, t1: T.sent - 0.1, who: 'neptune', text: 'ask the real question.', x: 520, y: 1760, tailUp: true, tail: -300 },
    { t0: T.reply + 1.6, t1: T.friend - 0.2, who: 'neptune', text: 'that hurts. *and* it’s an answer.', x: 520, y: 1760, tailUp: true, tail: -300 },
    { t0: T.friend + 0.8, t1: T.ch5 - 0.3, who: 'cancer', text: 'I brought tissues. *and* snacks.', x: 560, y: 1760, tailUp: true, tail: 0 },
    { t0: T.arrive + 0.8, t1: T.txt - 0.2, who: 'someone new', color: NEW, text: 'made it! sorry, the bus was *late.*', x: 640, y: 1720, tailUp: true, tail: 100 },
    { t0: T.txt + 3.2, t1: T.txt + 6.4, who: 'neptune', text: 'replies. plans. *shows up.*', x: 540, y: 1720, tailUp: true, tail: -200 },
    { t0: T.txt + 6.6, t1: T.txt + 9.4, who: 'pisces', text: "it's quieter than the *dream.*", x: 540, y: 1720, tailUp: true, tail: -200 },
    { t0: T.txt + 9.6, t1: T.end - 0.2, who: 'neptune', text: 'the real ones *usually* are. better, too.', x: 540, y: 1720, tailUp: true, tail: -300 },
  ],
  cues: [
    ['whoosh', T.promise, 0.4, 0.04], ['riser', T.promise + 0.5, T.promise + 2, 0.03],
    ...OPEN.map(m => ['pop', m.at, 1174.66, 0.045, -0.2]),
    ['glitter', T.ch2, T.ch2 + 0.8], ...[0, 1, 2, 3].map(i => ['whoosh', +(T.ch2 + 0.4 + i * 2.6).toFixed(2), 0.3, 0.03]),
    ['tapeStop', T.ch3, 0.5], ['tick', T.ch3 + 0.4, 0.1], ...[0, 1, 2].map(i => ['pop', +(T.ch3 + 1.0 + i * 1.3).toFixed(2), 523.25, 0.04, 0]),
    ['pop', T.sent, 1174.66, 0.05, 0.2], ['pop', T.reply, 440, 0.06, -0.2], ['pop', T.friend, 880, 0.05, 0], ['glitter', T.friend + 0.2, T.friend + 0.8],
    ['whoosh', T.ch5, 0.5, 0.04], ['whoosh', T.arrive, 0.6, 0.04], ...LATER.map(m => ['pop', m.at, 1318.51, 0.045, -0.2]),
    ['glitter', T.end, T.end + 0.8], ['bell', T.end + 0.3, 1760, 0.04, 1.6, 0],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
