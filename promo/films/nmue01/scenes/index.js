// nmue01: THE MAKE-UP TALK, Ep 1 "Name the pause." (30 s vertical, promo/films/next30/b31.md, music: lofi · Dm)
// The show's spine lives in ./mukit.js (shared by nmue01–nmue12). Story 0–25.6, then the shared end card.
//   0.0–3.0    "We're *fighting.* | Now what?"  ♈ Aries and ♋ Cancer glare from either side of a cracked heart; a pixel
//              kettle on a stool between them is already whistling.
//   3.0–9.6    "Full volume… | or *full shell.*"  Aries keeps going in caps (bubbles pile up: "AND ANOTHER THING"),
//              Cancer pulls into its shell ("…"). The kettle rattles and boils over: FWEEEE.
//   9.6        card cut.
//   9.7–17.2   "Too hot? | *Say so.*"  THE STARS: "too hot to talk? *say so.*" → "'I need twenty minutes. I'm coming
//              *back.*'"  A timer card swings in: 20:00 · BACK SOON. The kettle comes off the heat.
//   17.2–22.4  "Cool off. | *Apart.*"  Aries does push-ups in one corner, Cancer sips tea in the other; the timer races
//              down and DINGS; they walk back to the middle. ARIES: "I'm back. can we try *again?*" CANCER: "me too."
//              The heart mends (21.0). Pisces: happy fountains.
//   22.4–25.5  "Step out. | *Come back.*"
import { makeEpisode, T, R, box, bubble, label, note, steam, shadow, room, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, RED, MINT, INTER, MONO, r3 } from './mukit.js'

// a pixel kettle on a little stool. heat 0…1 (steam, rattle), boil: the big whistle
function kettle(x, t, cx, cy, { heat = 0.3, rattle = 0, k = 1, stool = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (stool) { box(x, -70, 40, 140, 22, '#8a5a3c', { b: 5 }); R(x, INK, -60, 62, 14, 90); R(x, INK, 46, 62, 14, 90); R(x, '#6e4630', -56, 62, 6, 86); R(x, '#6e4630', 50, 62, 6, 86) }
  const rx = rattle * 4 * Math.sin(t * 60), lid = rattle * 6 * Math.abs(Math.sin(t * 38))
  x.translate(rx, 0)
  box(x, -62, -40, 124, 80, '#d8dce8', { b: 6, hi: '#ffffff', lo: '#a9aec4' })
  box(x, 62, -30, 40, 14, '#d8dce8', { b: 5 }); R(x, '#a9aec4', 92, -40, 14, 14)               // spout
  box(x, -40, -52 - lid, 80, 12, '#c4c9da', { b: 5 }); box(x, -10, -66 - lid, 20, 10, INK, { b: 2 }) // lid + knob
  box(x, -86, -24, 16, 44, '#2a2148', { b: 4 })                                                     // handle
  R(x, heat > 0.6 ? RED : '#f2a24a', -10, 10, 20, 10)                                               // the little light
  x.restore()
  steam(x, t, cx + 104 * k, cy - 46 * k, { n: Math.round(3 + heat * 6), a: heat, rise: 120 + heat * 140, size: 18 + heat * 14 })
}

// Cancer's shell: a dome that rises up over the star (0 = none, 1 = only the eyes peek out)
function shell(x, t, cx, cy, s, k) {
  if (k <= 0.01) return
  const w = s * 1.15, h = s * 0.95 * k
  x.save(); x.translate(cx, cy + s * 0.48)
  const C = 12
  for (let j = 0; j < Math.ceil(h / C); j++) {
    const yy = -j * C, u = j * C / (s * 0.95)
    const half = (w / 2) * Math.sqrt(Math.max(0, 1 - Math.pow(u, 2.2)))
    x.fillStyle = INK; x.fillRect(-half - 6, yy - C, half * 2 + 12, C)
    x.fillStyle = j % 3 === 0 ? '#c46a3a' : '#e0884e'; x.fillRect(-half, yy - C, half * 2, C)
    if (j % 4 === 2) { x.fillStyle = '#f3b07a'; x.fillRect(-half * 0.6, yy - C, half * 1.2, 4) }
  }
  x.restore()
  void t
}

const DOTS = (t, t0) => '.'.repeat(1 + (Math.floor((t - t0) * 4) % 3))

const EP = makeEpisode({
  id: 'nmue01', ep: 1, A: 'aries', B: 'cancer', accent: '#ff9a7a',
  heads: {
    hook: "We're *fighting.* | Now what?",
    trap: 'Full volume… | or *full shell.*',
    move: 'Too hot? | *Say so.*',
    try: 'Cool off. | *Apart.*',
    last: 'Step out. | *Come back.*',
  },
  lastLate: 2,
  lines: [
    { t: 10.25, who: 'S', text: 'too hot to talk? *say so.*' },
    { t: 12.85, who: 'S', text: "'I need twenty minutes. I'm coming *back.*'" },
    { t: 19.3, who: 'A', text: "I'm back. can we try *again?*" },
  ],
  hook(x, t, S) {
    room(x, t)
    kettle(x, t, 540, 1050, { heat: 0.75, rattle: 0.5 })
    S.couple(x, t, { a: { mood: 'squint', look: [1, 0], hops: [-0.1, 1.2] }, b: { mood: 'squint', look: [-1, 0], hops: [-0.02, 1.5] } })
    label(x, 'fweee…', 640, 930, { size: 30, col: BONE, alpha: 0.85 + 0.15 * Math.sin(t * 20), rot: 0.1 })
  },
  trap(x, t, S) {
    const u = S.u
    room(x, t)
    const heat = clamp(0.6 + u * 0.08), boil = u > 4.6
    kettle(x, t, 540, 1050, { heat: boil ? 1.2 : heat, rattle: boil ? 1 : 0.4 + u * 0.08 })
    if (boil) { label(x, 'FWEEEEE!', 620, 860 - 8 * Math.sin(t * 30), { size: 54, col: '#ffe27a', font: INTER, weight: 800, rot: 0.12 }); sparkles(x, t, 640, 900, S.t0 + 4.6, 8, 120, 2, [BONE, '#ffe27a']) }
    // Aries: full volume
    const ah = [S.t0 + 0.2, S.t0 + 0.9, S.t0 + 1.6, S.t0 + 2.3, S.t0 + 3.0, S.t0 + 3.7, S.t0 + 4.4, S.t0 + 5.1]
    shadow(x, 260, 1150, 230)
    S.A(x, t, { x: 260, y: 1020, s: 250, mood: u < 4.6 ? 'wide' : 'squint', look: [1, 0], hops: ah, squash: 0.04 * Math.sin(t * 20) })
    const caps = ['YOU SAID', 'LET ME FINISH', 'AND ANOTHER THING', 'ALSO!!', 'IN CONCLUSION…']
    caps.forEach((c, i) => bubble(x, t, 300 + [0, 60, 30, -20, 70][i], 760 - i * 92, S.t0 + 0.3 + i * 0.85, S.t1 - 0.1, c, { size: [34, 34, 36, 40, 34][i], col: i === 3 ? '#ffd0c4' : BONE, tail: -0.4, rot: [-0.04, 0.03, -0.02, 0.05, -0.03][i] }))
    // Cancer: full shell
    const sk = ease.outCubic(prog(u, 1.2, 2.6))
    shadow(x, 820, 1150, 230)
    S.B(x, t, { x: 820, y: 1020, s: 250, mood: u < 1.2 ? 'wide' : 'neutral', look: [-1, -0.3], hops: [S.t0 + 0.5] })
    shell(x, t, 820, 1020, 250, sk)
    if (u > 2.8) bubble(x, t, 860, 820, S.t0 + 2.8, S.t1 - 0.1, DOTS(t, S.t0 + 2.8), { size: 40, col: BONE, tail: 0.2 })
  },
  move(x, t, S) {
    const u = S.u
    room(x, t, { a: outK(t, [S.t1 - 0.2, S.t1]) })
    const ok = outK(t, [S.t1 - 0.2, S.t1])
    // the kettle comes off the heat: it slides right and calms
    const off = ease.inOutCubic(prog(u, 3.6, 4.4))
    kettle(x, t, lerp(540, 880, off), lerp(1050, 1110, off), { heat: lerp(0.9, 0.12, off), rattle: lerp(0.6, 0, off), k: ok * lerp(1, 0.75, off), stool: off < 0.5 })
    // the timer card swings in on 'twenty minutes'
    const ck = easeOutBack(prog(t, 13.0, 13.45), 1.6) * ok
    if (ck > 0.01) {
      const sw = 0.12 * Math.exp(-(t - 13.2) * 2) * Math.sin((t - 13.2) * 8)
      note(x, 560, 760, 440, 300, ['20:00', '*back soon'], { k: ck, rot: -0.04 + sw, size: 80, accent: '#c4544a' })
      // a tiny pixel clock badge
      x.save(); x.globalAlpha = clamp(ck)
      x.fillStyle = INK; x.beginPath(); x.arc(780, 620, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(780, 620, 36, 0, Math.PI * 2); x.fill()
      const a = t * 3; R(x, INK, 777, 594, 6, 30); x.save(); x.translate(780, 620); x.rotate(a); R(x, RED, -2, -30, 5, 30); x.restore()
      x.restore()
    }
    // the couple, smaller, listening (on the far marks)
    const k = pop01(t, S.t0 + 0.1, 0.3, 2) * ok
    S.A(x, t, { x: 380, y: 1150, s: 170, pop: k, mood: u > 4.8 ? 'happy' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 700, y: 1150, s: 170, pop: k, mood: u > 4.8 ? 'sparkle' : 'neutral', look: [-1, -1], talk: false })
  },
  try(x, t, S) {
    const u = S.u, ok = S.ok
    room(x, t, { a: ok })
    // the timer races down 20:00 → 00:00, then dings
    const tp = prog(u, 0.2, 1.9), left = Math.round(20 * 60 * (1 - tp))
    const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0')
    const tk = pop01(t, S.t0 + 0.1, 0.3, 2) * outK(t, [S.t1 - 0.3, S.t1])
    const ding = S.t0 + 1.95
    if (tk > 0.01) {
      const shake = t > ding && t < ding + 0.5 ? 6 * Math.sin((t - ding) * 70) : 0
      note(x, 540 + shake, 470, 300, 120, [`${mm}:${ss}`], { k: tk * (t > ding && t < ding + 0.25 ? 1.12 : 1), size: 64, font: MONO, weight: 700, col: t > ding ? MINT : BONE })
      if (t > ding) label(x, 'DING!', 740, 400, { size: 46, col: GOLD, font: INTER, weight: 800, rot: 0.15, alpha: outK(t, [ding + 1.2, ding + 1.5]) })
      sparkles(x, t, 540, 470, ding, 8, 170, 1, [GOLD, MINT, BONE])
    }
    // cooling off: push-ups vs tea, then they walk back to the middle
    const back = ease.inOutCubic(prog(t, ding + 0.15, ding + 0.85))
    const ax = lerp(200, 400, back), bx = lerp(880, 680, back)
    const pushing = back < 0.05
    const pu = pushing ? 0.16 * Math.max(0, Math.sin(t * 9)) : 0
    shadow(x, ax, 1140, 210 * ok); shadow(x, bx, 1140, 210 * ok)
    S.A(x, t, { x: ax, y: 1030, s: 220, pop: ok, squash: pu, mood: pushing ? 'squint' : t > T.mend ? 'happy' : 'neutral', look: [1, 0], hops: [ding + 0.2, ding + 0.5, T.mend + 0.05, T.h4Land + 0.05] })
    S.B(x, t, { x: bx, y: 1030, s: 220, pop: ok, mood: back < 0.05 ? 'sleepy' : t > T.mend ? 'happy' : 'sparkle', look: [-1, 0], zzz: false, hops: [ding + 0.3, ding + 0.6, T.mend + 0.12, T.h4Land + 0.15] })
    if (back < 0.05) {
      // Cancer's teacup
      box(x, bx + 70, 990, 50, 40, BONE, { b: 5 }); R(x, INK, bx + 120, 1000, 14, 20)
      steam(x, t, bx + 95, 980, { n: 3, a: 0.6, rise: 70, size: 12 })
      if (u > 0.3) label(x, `${1 + Math.floor(u * 6) % 10}…`, ax, 860, { size: 34, col: '#ffd0c4', font: INTER, weight: 800 })
    }
    bubble(x, t, 760, 850, 20.75, 22.3, 'me too.', { size: 36, tail: -0.3 })
  },
  cues: [
    // hook kettle whistle
    ['pluck', 0.1, 2637, 0.012, 0.6, 0.2], ['pluck', 0.9, 2637, 0.01, 0.6, 0.2],
    // trap: caps bubbles, the shell, the FWEEE
    ...[0, 1, 2, 3, 4].map(i => ['pop', r3(3.3 + i * 0.85), [880, 987.77, 1174.66, 1318.51, 987.77][i], 0.04, -0.3]),
    ['whoosh', 4.2, 0.4, 0.03], ['tick', 5.6, 0.04], ['riser', 6.0, 7.6, 0.03], ['pluck', 7.6, 2637, 0.03, 0.8, 0.2], ['pluck', 7.75, 3136, 0.025, 0.8, 0.2], ['glitter', 7.6, 8.0],
    // move: timer card swing, kettle off
    ['whoosh', 13.0, 0.4, 0.04], ['pop', 13.2, 1174.66, 0.045, 0], ['tick', 13.5, 0.04], ['whoosh', 13.3, 0.3, 0.02], ['tick', 14.1, 0.04],
    // try: the timer races, DING, footsteps back
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(17.4 + i * 0.17), 0.02]),
    ['bell', 19.15, 1760, 0.05, 1.2, 0.2], ['bell', 19.2, 2349.32, 0.03, 1.0, 0.2], ['pop', 19.35, 659.25, 0.03, -0.3], ['pop', 19.65, 739.99, 0.03, 0.3],
    ['pop', 20.75, 987.77, 0.035, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [GOLD, INK]
