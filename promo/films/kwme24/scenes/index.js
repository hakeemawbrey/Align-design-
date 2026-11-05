// kwme24: WAIT, THAT'S ME (long), "Find your sign. Pisces is last." (60 s loop, star_advice trial, music: funk · A).
// All 12 signs, one hyper-relatable line each, each ending on the series' slow turn to camera. Four hook-kit chapter
// stickers by element. The joke is on the situation, never the sign. Format pieces: ../../kwme23/longkit.js.
//   0–3      frame 0: the camera mid-whip, 12 sign stars mid-scramble into a line-up, ♈ Aries crashing in last.
//   3–16.2   1 · FIRE   ♈ replying in four seconds, then panicking · ♌ 40 selfies for one profile pic · ♐ booking a trip
//                       to avoid a feeling
//   16.2–29.4 2 · EARTH ♉ deciding they’re the one over dessert · ♍ proofreading a two-word text · ♑ treating a crush
//                       like a five-year plan
//   29.4–42.6 3 · AIR   ♊ three crushes, zero plans · ♎ an hour picking an outfit, then the hoodie · ♒ explaining my
//                       feelings like a science fair
//   42.6–55.8 4 · WATER ♋ missing someone I talked to once · ♏ reading "k" and hearing a whole tone · ♓ crying because
//                       the ending was happy (the promised payoff: Pisces, fountaining)
//   55.8–60  all 12 turn to camera at once. Last line: "comment your sign. we see you."  59.55–60 loop back to the scramble.
import { makeLong } from '../../kwme23/longkit.js'
import { box, label, phone, sms, drawBits, drawStarChar, signStar, inSprite, tearsCells, tissue, wrap, glow, pop01, outK, prog, ease, lerp, clamp, sine, HEART, GOLD, RED, INK, BONE, MINT } from '../../kwme01/wmkit.js'

const ORDER = ['aries', 'leo', 'sagittarius', 'taurus', 'virgo', 'capricorn', 'gemini', 'libra', 'aquarius', 'cancer', 'scorpio', 'pisces']
const T0 = 3.0, SEG = 4.4, FIN = T0 + 12 * SEG   // 55.8
const GROUPS = [['fire', '#f0603a'], ['earth', '#e9b24a'], ['air', '#7fd0f0'], ['water', '#7f9cf0']]
const HX = 360, HY = 1220, HS = 380

// a big caption for the sign's line (canvas, centred, wraps)
function caption(x, t, t0, text, col) {
  const k = pop01(t, t0 + 0.15, 0.3, 2.2) * outK(t, [t0 + SEG - 0.35, t0 + SEG - 0.15])
  if (k <= 0.01) return
  x.save(); x.translate(540, 640); x.scale(k, k)
  x.font = `800 60px Inter`
  const L = wrap(x, text, 880)
  L.forEach((l, i) => label(x, l, 0, (i - (L.length - 1) / 2) * 70, { size: 60, col: i === L.length - 1 ? col : BONE, sw: 0.14 }))
  x.restore()
}
const at = (i, u) => T0 + i * SEG + u

// ── per-sign props (u = seconds into the segment)
const PROPS = {
  aries: { line: 'Replying in four seconds, then panicking', opts: u => ({ mood: u < 1.0 ? 'happy' : 'wide', hops: [at(0, 0.6), at(0, 1.1), at(0, 1.4)] }),
    draw(x, t, u) { phone(x, 780, 1120, { w: 300, h: 460, rot: 0.06, draw: (c, w) => { sms(c, 'hey :)', 'L', 30, w, { size: 28 }); if (u > 0.6) sms(c, 'HEY!! hi!! how are you!!', 'R', 120, w, { size: 26 }) } }); if (u > 1.1 && u < 2.1) for (let i = 0; i < 3; i++) drawBits(x, ['.D.', 'DDD', '.D.'], { D: '#8fe3ff' }, HX - 120 + i * 110, HY - 230 - ((u * 3 + i / 3) % 1) * 60, 9) } },
  leo: { line: '40 selfies for one profile pic', opts: u => ({ mood: 'sparkle', look: [1, -0.5], hops: [0.5, 0.9, 1.3, 1.7].map(v => at(1, v)), squash: -0.05 }),
    draw(x, t, u) { const n = Math.min(40, Math.max(1, Math.round(40 * prog(u, 0.2, 1.9)))); const fl = (u * 5) % 1; if (u < 2 && fl < 0.25) glow(x, HX, HY - 60, 420, '#fffbea', 0.6 * (1 - fl * 4)); box(x, 680, 1040, 260, 170, '#2a2148', { bw: 7 }); x.fillStyle = '#1b1236'; x.beginPath(); x.arc(810, 1125, 55, 0, Math.PI * 2); x.fill(); label(x, `${n}/40`, 810, 990, { size: 44, col: GOLD }) } },
  sagittarius: { line: 'Booking a trip to avoid a feeling', opts: u => ({ mood: u < 1.2 ? 'happy' : 'squint', hops: [at(2, 0.4), at(2, 1.0)] }),
    draw(x, t, u) { const s = ease.outBack(prog(u, 0.1, 0.5)); x.save(); x.translate(800, 1180); x.scale(s, s); box(x, -130, -110, 260, 220, '#c4502f', { bw: 7, hi: '#e0704f' }); box(x, -40, -150, 80, 40, INK, { bw: 0 }); x.restore(); const tk = ease.outBack(prog(u, 0.8, 1.1)); if (tk > 0.01) { x.save(); x.translate(780, 900); x.rotate(-0.1); x.scale(tk, tk); box(x, -160, -50, 320, 100, '#fff6e8', { bw: 5 }); label(x, 'ONE WAY · TONIGHT', 0, 2, { size: 26, col: INK, stroke: null, font: "'Space Mono', monospace", weight: 700 }); x.restore() } } },
  taurus: { line: 'Deciding they’re the one over dessert', opts: u => ({ mood: u < 0.8 ? 'happy' : 'heart', hops: [at(3, 0.5), at(3, 0.9)] }),
    draw(x, t, u) { box(x, 650, 1240, 320, 24, BONE, { bw: 5 }); drawBits(x, ['..W...', '.PPPP.', 'WWWWWW', 'PPPPPP', 'WWWWWW'], { W: '#fff6e8', P: '#ff8fb1' }, 810, 1190, 22); drawStarChar(x, 860, 960, 200, t, { color: signStar('cancer').color, mood: 'happy', look: [-1, 0], seed: 31, tips: false }); for (let i = 0; i < 3; i++) { const tt = u - 0.8 - i * 0.3; if (tt > 0 && tt < 1.5) drawBits(x, HEART, { H: '#ff5c8e' }, HX + 40 + i * 50, HY - 220 - tt * 140, 8, { alpha: 1 - tt / 1.5 }) } } },
  virgo: { line: 'Proofreading a two-word text. Three times.', opts: u => ({ mood: 'squint', look: [1, 0], hops: [0.5, 1.0, 1.5].map(v => at(4, v)) }),
    draw(x, t, u) { phone(x, 790, 1100, { w: 320, h: 480, rot: -0.04, draw: (c, w) => sms(c, 'sounds good', 'R', 60, w, { size: 32 }) }); const n = Math.min(3, Math.floor(prog(u, 0.4, 1.9) * 3.2)); if (n) label(x, `×${n}`, 920, 830, { size: 60 + n * 10, col: n === 3 ? RED : GOLD }); x.save(); x.translate(780 + 60 * Math.sin(u * 4), 1000); x.strokeStyle = GOLD; x.lineWidth = 10; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.stroke(); x.restore() } },
  capricorn: { line: 'Treating a crush like a five-year plan', opts: u => ({ mood: 'neutral', look: [1, -0.4], hops: [at(5, 0.5), at(5, 1.2)] }),
    draw(x, t, u) { box(x, 600, 860, 420, 360, '#efe6d6', { bw: 7 }); label(x, 'THE PLAN', 810, 900, { size: 34, col: INK, stroke: null }); ['Y1: say hi', 'Y2: coffee', 'Y3: ???', 'Y5: profit'].forEach((s, i) => { const k = pop01(t, at(5, 0.3 + i * 0.35), 0.2, 2); if (k > 0.01) label(x, s, 640, 960 + i * 62, { size: 30 * k, col: i === 3 ? '#2f8f6a' : INK, stroke: null, font: "'Space Mono', monospace", weight: 700, align: 'left' }) }) } },
  gemini: { line: 'Three crushes, zero plans', opts: u => ({ mood: 'heart', look: [1, -1], hops: [at(6, 0.4), at(6, 1.0), at(6, 1.6)] }),
    draw(x, t, u) { for (let i = 0; i < 3; i++) { const a = t * 2.2 + i * 2.094; drawBits(x, HEART, { H: ['#ff5c8e', '#ff8fb1', '#ffb0c8'][i] }, HX + Math.cos(a) * 260, HY - 120 + Math.sin(a) * 90, 12) } label(x, 'plans: 0', 800, 1300, { size: 44, col: GOLD }) } },
  libra: { line: 'An hour picking an outfit, then the hoodie', opts: u => ({ mood: u < 1.6 ? 'wide' : 'happy', hops: [0.3, 0.7, 1.1, 1.6].map(v => at(7, v)) }),
    draw(x, t, u) { ['#ff8fb1', '#7fd0ff', '#ffe27a', '#9fe6b0'].forEach((c, i) => { const tt = u - 0.2 - i * 0.3; if (tt > 0 && tt < 1.4) { x.save(); x.translate(HX + 60 + tt * 500, HY - 200 - Math.sin(tt * 2.5) * 300); x.rotate(tt * 6); box(x, -50, -40, 100, 80, c, { bw: 5 }); x.restore() } }); label(x, '1:00:00', 820, 880, { size: 44, col: MINT }) },
    after(x, t, u) { if (u > 1.6) inSprite(x, null, () => {}) } },
  aquarius: { line: 'Explaining my feelings like a science fair', opts: u => ({ mood: 'sparkle', look: [1, 0], hops: [at(8, 0.4), at(8, 1.1)] }),
    draw(x, t, u) { const k = ease.outBack(prog(u, 0.1, 0.5)); x.save(); x.translate(800, 1060); x.scale(k, k); box(x, -230, -170, 120, 300, '#7fd0ff', { bw: 6 }); box(x, -110, -190, 220, 320, '#efe6d6', { bw: 6 }); box(x, 110, -170, 120, 300, '#7fd0ff', { bw: 6 }); label(x, 'MY FEELINGS:', 0, -140, { size: 26, col: INK, stroke: null }); label(x, 'A STUDY', 0, -104, { size: 26, col: INK, stroke: null }); x.fillStyle = '#e0507a'; [40, 80, 60].forEach((h, i) => x.fillRect(-70 + i * 50, 80 - h * prog(u, 0.6, 1.4), 36, h * prog(u, 0.6, 1.4))); x.restore() } },
  cancer: { line: 'Missing someone I talked to once', opts: u => ({ mood: 'sparkle', look: [1, -0.3], hops: [at(9, 0.6)] }),
    draw(x, t, u) { box(x, 690, 980, 240, 280, '#c49a6c', { bw: 7 }); x.fillStyle = '#2a3a6a'; x.fillRect(710, 1000, 200, 240); drawStarChar(x, 810, 1130, 150, t, { color: signStar('aries').color, mood: 'happy', look: [0, 0], seed: 40, tips: false, bob: 0 }); label(x, 'that one bus ride', 810, 1310, { size: 28, col: BONE, stroke: null, font: "'Space Mono', monospace", weight: 700 }) } },
  scorpio: { line: 'Reading “k” and hearing a whole tone', opts: u => ({ mood: u < 0.6 ? 'neutral' : 'wide', look: [1, 0], hops: [at(10, 0.6)] }),
    draw(x, t, u) { const k = ease.outBack(prog(u, 0.4, 0.7)); label(x, 'k', 800, 1060, { size: 260 * k, col: BONE, font: "'Space Mono', monospace", weight: 700 }); for (let i = 0; i < 3; i++) { const ph = ((u * 1.2 + i / 3) % 1); x.save(); x.globalAlpha = (1 - ph) * clamp(u - 0.5); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(800, 1040, 120 + ph * 200, -0.6, 0.6); x.stroke(); x.beginPath(); x.arc(800, 1040, 120 + ph * 200, Math.PI - 0.6, Math.PI + 0.6); x.stroke(); x.restore() } } },
  pisces: { line: 'Crying because the ending was happy', opts: u => ({ mood: u < 0.9 ? 'sparkle' : 'wide', look: [1, 0], hops: [at(11, 0.9), at(11, 1.3)] }),
    draw(x, t, u) { box(x, 640, 960, 340, 260, '#2a2148', { bw: 8 }); x.fillStyle = '#3a2d66'; x.fillRect(660, 980, 300, 220); if (u > 0.7) { label(x, 'THE END', 810, 1060, { size: 48, col: GOLD, stroke: null }); drawBits(x, HEART, { H: '#ff5c8e' }, 810, 1130, 8) } for (let i = 0; i < 4; i++) { const tt = u - 1.0 - i * 0.25; if (tt > 0 && tt < 1.6) tissue(x, HX + 100 + tt * 260 * (i % 2 ? 1 : -0.6), HY - 250 - Math.sin(tt * 2) * 200 + tt * tt * 120, 12, t + i) } },
    after(x, t, u, F) { inSprite(x, F, () => tearsCells(x, t, 3)) } },
}
// Libra's hoodie, drawn over the sprite once the outfit hour is over
PROPS.libra.after = (x, t, u, F) => { if (u > 1.6) inSprite(x, F, () => { x.fillStyle = '#5a5470'; x.fillRect(9, 25, 18, 8); x.fillStyle = '#4a4460'; x.fillRect(11, 9, 14, 3); x.fillStyle = BONE; x.fillRect(15, 26, 1, 4); x.fillRect(20, 26, 1, 4) }) }

const STAGES = ORDER.map((sg, i) => {
  const P = PROPS[sg], t0 = T0 + i * SEG, g = Math.floor(i / 3)
  return {
    t0, t1: t0 + SEG, sign: sg, x: HX, y: HY, s: HS, turn: t0 + 2.05, turnLen: 1.1, seed: 50 + i,
    chapter: i % 3 === 0 ? { n: g + 1, title: GROUPS[g][0], color: GROUPS[g][1], until: t0 + 3 * SEG } : null,
    heroOpts: (t, u) => ({ tilt: 0.06, ...P.opts(u) }),
    back(x, t, u) { if (u >= 0) P.draw(x, t, u) },
    hud(x, t) { caption(x, t, t0, P.line, signStar(sg).color) },
    after: P.after,
  }
})
// the finale: all 12 in a row, turning at once
const ROW = i => ({ x: 120 + (i % 6) * 168, y: i < 6 ? 980 : 1240 })
function lineup(x, t, k, scramble) {
  ORDER.forEach((sg, i) => {
    const S = signStar(sg), R0 = ROW(i)
    let px = R0.x, py = R0.y
    if (scramble) { const d = 1 - ease.outCubic(clamp(scramble[i])); px += Math.cos(i * 2.3) * 900 * d; py += Math.sin(i * 1.7) * 700 * d }
    x.save(); x.translate(px, 0); x.scale(lerp(0.74, 1, k), 1); x.translate(-px, 0)
    drawStarChar(x, px, py, 160, t, { color: S.color, mood: k > 0.3 ? (sg === 'pisces' ? 'wide' : 'neutral') : 'happy', look: k > 0.55 ? [0, 0] : [i % 2 ? 1 : -1, 0], seed: 60 + i, hops: k > 0.05 ? null : [t - 0.1 - (i % 3) * 0.1] })
    if (sg === 'pisces') { const F = { cell: Math.max(1, Math.round(160 / 36)) }; void F }
    x.restore()
  })
  // Pisces' tears in the line-up (index 11)
  const P = ROW(11), o = { color: '#000' }; void o
  x.save(); x.translate(P.x, 0); x.scale(lerp(0.74, 1, k), 1); x.translate(-P.x, 0)
  const cell = Math.max(1, Math.round(160 / 36)), S = cell * 36, base = (19.6 + 17.6 * Math.cos(Math.PI / 5) - 18) * cell
  x.translate(Math.round(P.x), Math.round(P.y + base)); x.translate(-S / 2, -S / 2 - base); x.scale(cell, cell); tearsCells(x, t, 3)
  x.restore()
}
const FINALE = {
  t0: FIN, t1: 60, sign: 'pisces', x: 540, y: 1110, s: 500, turn: FIN + 0.2, turnLen: 1.2, noHero: true, push: 0.06,
  line: 'comment your sign. we see you.',
  back(x, t) { lineup(x, t, sine(prog(t, FIN + 0.2, FIN + 1.4)), null) },
}

const EP = makeLong({
  id: 'kwme24', dur: 60, hook: 'Find your sign. | *Pisces is last.*', hookAccent: '#9fb4ff', wash: '#3a5ab0',
  stages: [...STAGES, FINALE],
  intro(x, t) {
    // frame 0: mid-scramble into the line-up; Aries crashes in last (spinning)
    const sc = ORDER.map((sg, i) => sg === 'aries' ? prog(t, -0.3, 1.1) : prog(t, -0.9 + i * 0.05, 0.6 + i * 0.04))
    lineup(x, t, 0, sc)
    const a = prog(t, -0.3, 1.1)
    if (a < 1) label(x, 'CRASH!', ROW(0).x + 60, ROW(0).y - 140, { size: 60 * (1 - a), col: GOLD, rot: -0.2, alpha: a > 0.6 ? 1 : 0 })
    label(x, '12 signs. 12 moments.', 540, 640, { size: 56, col: BONE, alpha: clamp(prog(t, 0.6, 1.0)) * (1 - prog(t, 2.6, 2.9)) })
    return true
  },
  pisTears: () => 2,
  cues: [
    ['boom', 0.8, 0.12], ['tick', 0.8, 0.08], ...ORDER.map((sg, i) => ['pop', +(T0 + i * SEG + 0.15).toFixed(2), 659.25 * (1 + (i % 4) * 0.12), 0.04, (i % 2 ? 0.3 : -0.3)]),
    ['pluck', at(0, 0.6), 1318.51, 0.035, 0.4, 0.3], ...[0.5, 0.9, 1.3, 1.7].map(v => ['tick', at(1, v), 0.07]), ['whoosh', at(2, 0.1), 0.4, 0.04], ['pluck', at(3, 0.8), 1174.66, 0.03, 0.4, 0.2],
    ...[0.5, 1.0, 1.5].map(v => ['pop', at(4, v), 880, 0.04, 0.3]), ...[0.3, 0.65, 1.0, 1.35].map(v => ['tick', at(5, v), 0.05]), ['glitter', at(6, 0.3), at(6, 1.2)],
    ...[0.2, 0.5, 0.8, 1.1].map(v => ['whoosh', at(7, v), 0.2, 0.03]), ['riser', at(8, 0.6), at(8, 1.4), 0.02], ['pluck', at(9, 0.6), 659.25, 0.03, 0.6, 0.2],
    ['tom', at(10, 0.45), 90, { gain: 0.2, decay: 0.2 }], ['bell', at(11, 0.75), 1760, 0.035, 1.0, 0.3], ['glitter', at(11, 1.0), at(11, 1.8)], ['bell', FIN + 1.4, 2349.32, 0.03, 1.2, 0],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = { style: 'funk', key: 'A', seed: 2624, sections: { drop: 0.8, breakdown: [42.6], lift: [16.2, 29.4, 46.0], outroAt: EP.LOOP[0] }, hits: [0.8, FIN + 0.2] }
void [RED, GOLD]
