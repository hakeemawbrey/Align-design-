// kmte15: MIRROR TALK No. 15, "First date in two years." (22 s vertical, star_advice post, pop · E). Hard cut.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Scorpio mid-trip on the WELCOME mat, keys flying, the front door half open. Hook "First date in two
//          *years.* Help."  0.4: record scratch + freeze: "yep. *rusty.*"  1.8: faceplant. 2.3: whip back to the mirror.
//   2.8    "Mirror. *Pep talk.* Now."  SCORPIO: "I forgot how people *talk*."
//   5.2    REFLECTION: "you talk to friends every *day*." → "ask about them. *listen*." → "laugh if it's *funny*. that's it."
//   11.8   SCORPIO: "…okay. I can do *that*."  13.4: the keys fly back into reach.
//   15.3   the door again: Scorpio hops clean over the mat and out. Pisces waves a tiny flag, crying. CLICK.
//   20.2   last line "Rusty still | *opens* doors."  Hard cut at 22.
import { makeMirror, drawStarChar, starFrame, inSprite, tearsCells, hearts, sparkles, drawBits, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, INK, BONE, GOLD, r3, INTER, MONO, signStar } from '../../kmte01/mirrorkit.js'

const T = { rec: 0.4, plant: 1.85, toMirror: 2.3, s1: 3.1, m1: 5.2, m2: 7.6, m3: 9.6, s2: 11.8, keys: [13.3, 13.9], toDoor: 15.3, hop: [15.9, 16.6], out: [16.6, 17.4], click: 17.7, last: 20.2 }
const SCO = signStar('scorpio'), PIS = signStar('pisces')
const KEY = ['.YY....', 'Y..Y...', 'Y..YYYY', 'Y..Y.Y.', '.YY..Y.']

function doorScene(x, t, phase) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#2a1d3e'); g.addColorStop(1, '#130c22')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // the door (half open), outside: night street lights
  box(x, 560, 470, 380, 830, '#3a2a5a', { b: 10 })
  R(x, '#0d1430', 580, 490, 340, 790)
  for (let i = 0; i < 6; i++) { const lx = 620 + i * 55, ly = 700 + (i % 3) * 60; x.save(); x.globalCompositeOperation = 'lighter'; const gg = x.createRadialGradient(lx, ly, 2, lx, ly, 40); gg.addColorStop(0, 'rgba(255,220,150,0.5)'); gg.addColorStop(1, 'rgba(255,220,150,0)'); x.fillStyle = gg; x.fillRect(lx - 40, ly - 40, 80, 80); x.restore() }
  const open = phase === 'end' ? lerp(0.55, 0.95, ease.inOutCubic(prog(t, T.toDoor, T.hop[0]))) * (1 - ease.inCubic(prog(t, T.click - 0.3, T.click))) : 0.55
  const dw = 340 * (1 - open)
  R(x, INK, 574, 484, dw + 12, 802); R(x, '#b36a3a', 580, 490, dw, 790); R(x, '#c98a52', 580, 490, dw, 16)
  if (dw > 40) { R(x, INK, 580 + dw - 34, 870, 18, 18); R(x, GOLD, 580 + dw - 31, 873, 12, 12) }
  // floor + the WELCOME mat
  R(x, '#24183a', 0, 1300, 1080, 620); R(x, INK, 0, 1296, 1080, 6)
  x.save(); x.translate(470, 1340); x.rotate(phase === 'start' ? -0.12 : 0)
  R(x, INK, -190, -34, 380, 68); R(x, '#b5894a', -184, -28, 368, 56)
  x.font = `800 32px ${INTER}`; x.fillStyle = '#6b4a2a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WELCOME', 0, 2); x.restore()
  // Pisces by the door, crying, flag in the end
  const pk = { x: 960, y: 1200, s: 150 }
  drawStarChar(x, pk.x, pk.y, pk.s, t, { color: PIS.color, mood: phase === 'end' ? 'happy' : 'wide', look: [-1, 0], seed: 6, tips: false, hops: phase === 'end' ? [T.hop[0], T.hop[0] + 0.5, T.click] : null })
  inSprite(x, starFrame(pk.x, pk.y, pk.s, t, { seed: 6, hops: phase === 'end' ? [T.hop[0], T.hop[0] + 0.5, T.click] : null }), () => tearsCells(x, t, phase === 'end' ? 3 : 2))
  if (phase === 'end') { const w = Math.sin(t * 10) * 0.3; x.save(); x.translate(pk.x - 80, pk.y - 40); x.rotate(-0.3 + w); R(x, INK, -4, -100, 8, 110); R(x, INK, 0, -104, 70, 50); R(x, '#ff8fb1', 4, -100, 62, 42); x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GO!', 35, -78); x.restore() }
}

const F = makeMirror({
  id: 'kmte15', sign: 'scorpio', dur: 22,
  hook: { text: 'First date in two | *years.* Help.', accentColor: '#ff6b7f', out: [2.25, 2.45] },
  fx: [
    { k: 'recordScratch', at: T.rec, len: 1.4, caption: 'yep. *rusty.*', top: 1560 },
    { k: 'screenShake', at: T.plant, amp: 26, len: 0.45 },
    { k: 'whipZoom', at: T.toMirror, from: 1.5 },
    { k: 'whipZoom', at: T.m1 - 0.08, from: 1.25 },
    { k: 'whipZoom', at: T.m3 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: T.toDoor, from: 1.5 },
    { k: 'screenShake', at: T.click, amp: 10, len: 0.3 },
  ],
  caps: [
    { at: 2.75, out: [9.4, 9.6], text: 'Mirror. *Pep talk.* | Now.', accent: '#ff6b7f' },
    { at: 9.65, out: [15.1, 15.3], text: 'Ask. Listen. | *Laugh.*', accent: '#8fe9ff' },
    { at: T.last, out: [99, 100], text: 'Rusty still | *opens* doors.', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: 'I forgot how people *talk*.' },
    { t: T.m1, who: 'M', text: 'you talk to friends every *day*.' },
    { t: T.m2, who: 'M', text: 'ask about them. *listen*.' },
    { t: T.m3, who: 'M', text: "laugh if it's *funny*. that's it." },
    { t: T.s2, who: 'S', text: '…okay. I can do *that*.' },
  ],
  boxes: [[2.95, 14.8]],
  pose(t) {
    const p = { mood: 'wide', look: [1, -0.6] }
    if (t > T.s1 + 1) { p.mood = 'neutral'; p.look = [1, -0.5] }
    if (t > T.m1) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.s2) { p.mood = 'happy'; p.look = undefined }
    return p
  },
  signHops: [T.keys[1], T.keys[1] + 0.4],
  refl(t) {
    const p = { mood: 'neutral', look: [-1, 0.6] }
    if (t > T.m1) p.mood = 'happy'
    if (t > T.s2) p.mood = 'wink'
    return p
  },
  pis(t) { return { tears: t > T.s2 ? 3 : 2, mood: t > T.s2 ? 'sparkle' : 'wide' } },
  tissuePulls: [T.s2 + 0.5, T.s2 + 1.0],
  front(x, t) {
    // the keys fly back up into reach
    if (t > T.keys[0] && t < T.toDoor) {
      const p = ease.inOutCubic(prog(t, ...T.keys))
      drawBits(x, KEY, { Y: GOLD }, lerp(560, 400, p), lerp(1400, 1060, p) - Math.sin(Math.PI * p) * 200, 9, { rot: p * 7 })
      if (t > T.keys[1]) sparkles(x, t, 400, 1060, T.keys[1], 10, 120, 2)
    }
  },
  over(x, t) {
    if (t < T.toMirror) {
      const tt = t < T.rec ? t : t < T.rec + 1.4 ? T.rec : t - 1.4
      doorScene(x, tt, 'start')
      // Scorpio mid-trip → faceplant
      const fall = ease.inCubic(prog(tt, -0.2, T.plant - 1.4))
      const sx = lerp(330, 470, fall), sy = lerp(1060, 1240, fall), rot = lerp(0.55, 1.45, fall)
      x.save(); x.translate(sx, sy); x.rotate(rot); x.translate(-sx, -sy)
      drawStarChar(x, sx, sy, 270, tt, { color: SCO.color, glyph: SCO.glyph, mood: 'wide', look: [0, 1], seed: 3, blink: false, squash: tt > T.plant - 1.45 ? 0.25 : 0 })
      x.restore()
      // keys mid-air
      for (let i = 0; i < 1; i++) drawBits(x, KEY, { Y: GOLD }, lerp(420, 640, ease.outCubic(prog(tt, -0.4, 0.5))), 860 - Math.sin(Math.PI * clamp(prog(tt, -0.4, 0.8))) * 120 + Math.max(0, tt - 0.4) * 500, 10, { rot: tt * 9 })
    }
    if (t >= T.toDoor) {
      doorScene(x, t, 'end')
      // Scorpio steps up, hops clean over the mat, out the door
      const hp = prog(t, ...T.hop), op = ease.inCubic(prog(t, ...T.out))
      const sx = lerp(lerp(200, 470, ease.inOutCubic(hp)), 760, op), sy = 1220 - Math.sin(Math.PI * hp) * 160 - op * 40
      if (op < 1) drawStarChar(x, sx, sy, lerp(260, 200, op), t, { color: SCO.color, glyph: SCO.glyph, mood: 'happy', seed: 3, alpha: 1 - op * 0.9, hops: [T.toDoor + 0.2] })
      sparkles(x, t, 470, 1300, T.hop[0] + 0.35, 10, 160, 2)
      hearts(x, t, T.click, 760, 1000, { n: 6, cell: 7, spread: 200 })
      if (t > T.click) {
        const k = pop01(t, T.click, 0.25, 2.6) * outK(t, [T.last - 0.1, T.last + 0.2])
        x.save(); x.translate(760, 620); x.rotate(-0.08); x.scale(k, k); R(x, INK, -120, -40, 240, 80); R(x, '#7dffb0', -112, -32, 224, 64)
        x.font = `800 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NO TRIP ✓', 0, 3); x.restore()
      }
    }
  },
  cues: [
    ['whoosh', 0.0, 0.4, 0.04], ['pluck', 0.1, 2637, 0.02, 0.2, 0.3], ['pluck', 0.2, 2349.32, 0.02, 0.2, 0.3],
    ['boom', T.plant, 0.2], ['pop', T.plant + 0.02, 220, 0.05, 0],
    ['whoosh', T.keys[0], 0.6, 0.03], ['pluck', T.keys[1], 2637, 0.03, 0.3, -0.2], ['pluck', T.keys[1] + 0.06, 3135.96, 0.025, 0.3, -0.2],
    ['whoosh', T.hop[0], 0.5, 0.035], ['pop', T.hop[1], 1318.51, 0.045, 0], ['glitter', T.hop[0] + 0.35, T.hop[0] + 0.8],
    ['whoosh', T.out[0], 0.5, 0.03], ['tick', T.click, 0.08], ['tom', T.click, 120, { gain: 0.15, decay: 0.15 }], ['pop', T.click + 0.1, 1567.98, 0.045, 0.3],
    ['bell', T.last + 0.5, 1318.51, 0.03, 1.0, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
