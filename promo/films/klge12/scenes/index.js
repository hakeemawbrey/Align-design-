// klge12 · Your Sign's Love Glitch · "Pisces.exe: The Fairy Tale Filter" (24 s vertical, star_advice post, hard cut).
//   0.0   frame 0: PISCES.EXE: falling for the potential. Pisces mid-sob behind a sparkly FAIRY TALE FILTER: through it
//         the crush stands on a pink castle with a crown and sparkles. 0.5 whip onto the castle.
//   3.0   the glitch: loving who they could be. Pisces: "they'll change, i can tell." 5.8 the filter slips off:
//         the same crush, on a couch, phone in hand: "seen 2 days ago".
//   7.6   error: FILTER ERROR.   9.3 the tray Pisces pops out too: "wait, that's me. *sob*"
//   11.3  THE STARS: "date who's actually there, not who they *could* be."   14.0 patch 1.12 installs.
//   15.9  the filter goes down. Someone who shows up: "on my way! 5 min" → "here :)". Pisces cries happy tears.
//   21.9  last line "Love who's *actually* there.", held to the cut at 24.0.
import { makeGlitch, R, box, label, bubble, phone, hearts, sparkles, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const OFF = 5.8, REAL = 15.9
function castle(x, t) {
  const g = x.createLinearGradient(0, 556, 0, 1436); g.addColorStop(0, '#ffb8d8'); g.addColorStop(1, '#c9a6ff'); x.fillStyle = g; x.fillRect(70, 556, 940, 880)
  // castle
  const C = '#f4e8ff'
  box(x, 560, 820, 300, 330, C, { b: 6 }); box(x, 520, 720, 90, 430, C, { b: 6 }); box(x, 810, 720, 90, 430, C, { b: 6 })
  for (const tx of [565, 855]) { x.fillStyle = INK; x.beginPath(); x.moveTo(tx - 56, 726); x.lineTo(tx, 620); x.lineTo(tx + 56, 726); x.fill(); x.fillStyle = '#ff6fae'; x.beginPath(); x.moveTo(tx - 48, 720); x.lineTo(tx, 632); x.lineTo(tx + 48, 720); x.fill() }
  box(x, 670, 1040, 80, 110, '#c97ab0', { b: 5 })
  R(x, '#a8e0a8', 70, 1150, 940, 286)
  for (let i = 0; i < 14; i++) { const a = t * 0.6 + i; drawSpark(x, 120 + ((i * 137) % 860), 600 + ((i * 251 + Math.floor(t * 2) * 40) % 700), (i % 3) + 1) }
}
function drawSpark(x, px, py, s) { R(x, '#fff', px - s * 2, py - 1, s * 4, 2 + s); R(x, '#fff', px - 1, py - s * 2, 2 + s, s * 4) }
function couchRoom(x, t) {
  R(x, '#2a2240', 70, 556, 940, 880); R(x, '#3a3050', 70, 1300, 940, 136)
  box(x, 520, 1150, 420, 120, '#6a5a7a', { b: 6 }); box(x, 500, 1090, 60, 180, '#5a4a6a', { b: 6 }); box(x, 900, 1090, 60, 180, '#5a4a6a', { b: 6 })
  void t
}
function lens(x, t, px, py, on) {
  // the hand-held FAIRY TALE FILTER: a pink oval frame on a stick
  x.save(); x.translate(px, py); x.rotate(-0.15 + Math.sin(t * 2) * 0.03)
  R(x, INK, -8, 90, 16, 120); R(x, '#ff6fae', -4, 94, 8, 112)
  x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.ellipse(0, 0, 110, 92, 0, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = '#ff6fae'; x.lineWidth = 12; x.stroke()
  if (on) { x.fillStyle = 'rgba(255,200,230,0.25)'; x.fill() }
  x.restore()
}

function scene(x, t, K) {
  const dream = t < OFF
  const real = t >= REAL
  if (dream) {
    castle(x, t)
    // the dream crush (Leo star) with a crown and sparkles
    K.star(x, t, 'leo', 710, 1000 - Math.sin(t * 2) * 10, 220, { mood: 'sparkle', look: [-1, 0], seed: 3, glow: 1.4 })
    const cr = ['G.G.G', 'GGGGG', 'GRGRG']
    cr.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') { R(x, INK, 680 + i * 12 - 2, 860 + j * 12 - 2, 16, 16); R(x, ch === 'R' ? RED : GOLD, 680 + i * 12, 860 + j * 12, 12, 12) } }))
    sparkles(x, t, 710, 960, Math.floor(t / 0.7) * 0.7, 10, 150, Math.floor(t), ['#fff', GOLD, PINK])
    label(x, '✦ FAIRY TALE FILTER: ON ✦', 540, 600, { size: 30, col: '#7a2a5a', stroke: '#fff' })
  } else {
    couchRoom(x, t)
    if (!real) {
      // reality: the crush on the couch, phone up, ignoring everything
      K.star(x, t, 'leo', 720, 1110, 210, { mood: 'neutral', look: [0, 1], seed: 3 })
      box(x, 770, 1150, 50, 80, '#2a2148', { b: 4 }); R(x, '#7fe3ff', 776, 1158, 38, 60)
      const k = pop01(t, OFF + 0.6, 0.25, 2.2)
      x.save(); x.translate(540, 700); x.scale(k, k); box(x, -230, -60, 460, 120, '#f4f0fa', { b: 5 })
      label(x, 'you: hey! how was your day?', 0, -18, { size: 26, col: INK, font: INTER, weight: 800 }); label(x, 'seen 2 days ago', 0, 26, { size: 26, col: '#a03a5a', font: INTER, weight: 800 }); x.restore()
    } else {
      // someone who shows up (Capricorn star), with flowers
      const arr = ease.outCubic(prog(t, 17.1, 17.7))
      phone(x, t, { cx: 800, cy: 820, w: 320, h: 380, title: 'DEV', lines: [{ from: 'DEV', text: 'on my way! 5 min', at: 16.3 }, { from: 'DEV', text: 'here :)', at: 17.3 }], size: 28, rot: 0.04, accent: '#1f8a6a', clock: '7:58' })
      if (arr > 0) {
        K.star(x, t, 'capricorn', lerp(1100, 760, arr), 1190, 230, { mood: 'happy', look: [-1, 0], seed: 5, hops: [17.7, 18.4] })
        for (let i = 0; i < 3; i++) { const fx = lerp(1100, 760, arr) - 150 + i * 18; R(x, '#2f8a3a', fx, 1150, 6, 60); box(x, fx - 10, 1130 - (i % 2) * 14, 24, 24, [PINK, GOLD, '#ff6fae'][i], { b: 3 }) }
      }
    }
  }
  // Pisces at the front, holding the filter (dropped after the patch)
  const sob = real ? 2 : 3
  K.hero(x, t, 300, 1160, 280, { mood: real ? (t > 17.7 ? 'heart' : 'happy') : dream ? 'sparkle' : 'wide', look: dream ? [1, -1] : real ? [1, 0] : [1, -0.3], tears: sob, hops: [3.2, OFF, 17.7] })
  if (!real) lens(x, t, 480, 1000 + (t >= OFF ? ease.inCubic(prog(t, OFF, OFF + 0.35)) * 260 : 0), dream)
  bubble(x, t, 330, 1000, 3.2, OFF - 0.1, 'they’ll change, i can tell', { size: 30, col: '#ffe0f0', maxW: 380 })
  if (real && t > 17.7) { hearts(x, t, 17.7, 300, 1050, { n: 6 }); sparkles(x, t, 540, 1050, 17.7, 12, 200, 1) }
}

const F = makeGlitch({
  id: 'klge12', sign: 'pisces', len: 24, ending: 'cut',
  hook: 'PISCES.EXE: falling for *the potential.*',
  err: { msg: ['Filter: FAIRY TALE (on).', 'Real texts received: 0.'], out: 2.75 },
  notResp: [[-1, 2.7], [7.6, 9.2]],
  hits: [{ kind: 'whip', at: 0.5, x: 700, y: 900, z: 0.35, hold: 0.5 }, { kind: 'scratch', at: OFF, dur: 0.6 }, { kind: 'glitch', at: 7.6, dur: 0.45 }, { kind: 'flash', at: REAL, col: '#ffd98a' }],
  caps: [{ at: 3.0, out: OFF - 0.05, text: 'the glitch: loving who they *could* be' }, { at: OFF + 0.6, out: 7.5, text: 'filter off:', col: '#ff9aa8' }],
  errs: [{ at: 7.6, out: 9.2, msg: ['FILTER ERROR.', 'Reality: loading…'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.3, out: 11.2, text: 'wait, that’s me. *sob*', tears: 3 }],
  stars: [{ t: 11.35, text: 'date who’s actually there, not who they *could* be.' }],
  box: { close: 14.0 },
  patch: { at: 14.0, ver: '1.12', name: 'SEE WHO’S REALLY THERE', dur: 1.0, out: 15.8 },
  last: { at: 21.9, text: 'Love who’s *actually* there.' },
  trayCry: t => 3,
  scene, accent: '#5a4ad0',
  cues: [['glitter', 0.2, 1.4], ['glitter', 3.2, 4.4], ['tom', OFF + 0.35, 90, { gain: 0.2 }], ['pop', 6.4, 523.25, 0.04, 0], ['pop', 16.3, 783.99, 0.04, 0.3], ['pop', 17.3, 880, 0.04, 0.3], ['bell', 17.7, 1318.51, 0.05, 1.2, 0], ['glitter', 17.7, 18.6]],
  music: { style: 'dreamy', key: 'Ab', seed: 1812, drop: 3.0, breakdown: [OFF, 9.3], lift: [REAL] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
