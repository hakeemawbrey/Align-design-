// trlittlecharge: LITTLE THINGS, "Charging their phone without asking." (20 s vertical, Star Talk Trends §18.5, music: dreamy · G)
// The format's look lives in ./little.js (identical in all five tr-little films).
//   0–3.2     12:14 AM. ♐ Sagittarius flops into bed ("night!") and is out cold. Two phones on the nightstand:
//             Sag's at 2% (blinking red), ♍ Virgo's at 4%. ONE charger. Virgo looks at its own… then at Sag's.
//   3.2–7.2   The very quiet mission. Rule of three: a floorboard CREAKS (freeze; Sag stirs) · the cable clicks into
//             Sag's phone ("mm… five more…", freeze) · the bolt appears, 3%: a silent victory dance.
//             THE STARS: "virgo, on a *very* quiet mission."  ♓ Pisces cries in a portrait on the wall.
//   7.2       card cut.
//   7.2–12.2  7:30 AM, sunlight. Sag wakes: 100%, a sticky note "charged :)". Heart eyes. Virgo's phone: 1%… bloop,
//             dead. Virgo shrugs, happy. THE STARS: "one charger. they picked *yours.*" Then Sag moves the cable
//             over: "your turn."
//   12.2–15.6 the patch shrinks up. Last line: "*Full* battery, full heart."
import {
  makeLittle, drawStarChar, signStar, R, S, speech, sfx, hearts, sparkles, drawBits, pisces, drawPhoneMini, pop01,
  outK, r3, crescent, clamp, lerp, prog, ease, INK, BONE, GOLD, PINK, HEART, CREAM, MONO, INTER,
} from './little.js'

const SAG = signStar('sagittarius'), VIR = signStar('virgo')

const A = { flop: 0.8, night: 0.9, asleep: 1.4, look1: 2.0, look2: 2.5 }
const B = { step: [3.1, 3.4], creak: 3.4, stir: 3.5, step2: [3.95, 4.3], plug: [4.35, 4.7], click: 4.7, mumble: 4.9, bolt: 5.6, yay: [6.1, 6.4, 6.7] }
const C = { wake: 7.6, see: 8.0, dying: 8.7, dead: 9.1, shrug: 9.3, move: [10.2, 10.6], turn: 10.4, vheart: 10.85 }
const PH_S = { x: 455, y: 395 }, PH_V = { x: 565, y: 395 }, OUTLET = { x: 655, y: 560 }

function bedroom(x, t, day) {
  R(x, day ? '#7a6aa8' : '#3f3470', 0, 0, S, 560)
  for (let i = 0; i < 10; i++) R(x, day ? '#8576b4' : '#463a7a', i * 84 + 28, 0, 24, 560)
  R(x, day ? '#4f3f6e' : '#2a2148', 0, 560, S, 240)
  for (let i = 0; i < 6; i++) R(x, day ? '#58477a' : '#30264f', 0, 586 + i * 36, S, 4)
  R(x, INK, 0, 554, S, 8)
  // the window (top left): night → morning
  R(x, INK, 40, 60, 200, 150); R(x, day ? '#ffd9a0' : '#16123a', 48, 68, 184, 134)
  if (day) { R(x, '#fff1c8', 150, 90, 48, 48); const g = x.createLinearGradient(0, 60, 400, 600); g.addColorStop(0, 'rgba(255,220,150,0.35)'); g.addColorStop(1, 'rgba(255,220,150,0)'); x.fillStyle = g; x.fillRect(0, 0, S, S) }
  else crescent(x, 180, 120, 6)
  R(x, INK, 136, 60, 8, 150); R(x, INK, 40, 131, 200, 8)
  // the outlet
  R(x, INK, OUTLET.x - 18, OUTLET.y - 52, 36, 46); R(x, CREAM, OUTLET.x - 14, OUTLET.y - 48, 28, 38); R(x, INK, OUTLET.x - 7, OUTLET.y - 40, 4, 10); R(x, INK, OUTLET.x + 3, OUTLET.y - 40, 4, 10)
}
function portrait(x, t, day, tears) {
  // ♓ Pisces's portrait on the wall, crying (it's a very emotional portrait)
  R(x, INK, 300, 70, 150, 150); R(x, GOLD, 306, 76, 138, 138); R(x, day ? '#c9b8f0' : '#2a2058', 318, 88, 114, 114)
  x.save(); x.beginPath(); x.rect(318, 88, 114, 114); x.clip()
  pisces(x, t, 375, 160, 120, tears, { mood: tears >= 3 ? 'happy' : 'wide', look: [1, 1], seed: 6, glow: 0.4 })
  x.restore()
}
function bed(x) {
  R(x, INK, 40, 330, 30, 240); R(x, '#9a6a44', 46, 336, 18, 228)                   // headboard
  R(x, INK, 40, 470, 360, 110); R(x, '#f4e8cc', 46, 476, 348, 30); R(x, '#d9cdb8', 46, 506, 348, 6)
  R(x, '#9a6a44', 46, 512, 348, 62); R(x, INK, 60, 574, 16, 30); R(x, INK, 370, 574, 16, 30)
}
function blanket(x, cy) {
  R(x, INK, 70, cy, 330, 100); R(x, '#ff9cbf', 76, cy + 6, 318, 88)
  for (let i = 0; i < 6; i++) R(x, '#ffb8d2', 96 + i * 52, cy + 6, 24, 88)
  R(x, '#ffd6e6', 76, cy + 6, 318, 12)
}
function nightstand(x) { R(x, INK, 400, 470, 220, 110); R(x, '#b47a52', 406, 476, 208, 98); R(x, INK, 410, 520, 200, 6); R(x, GOLD, 503, 540, 14, 10) }
// a phone standing on the nightstand, battery readout on the screen
function phoneOn(x, t, P, { pct, charging = false, dead = false, note = 0, glow = 0 }) {
  drawPhoneMini(x, P.x, P.y, 92, 150, {
    glow, off: dead,
    screen: (q, sx, sy, sw, sh) => {
      const low = pct <= 5
      const blink = low && !charging ? (Math.floor(t * 3) % 2 ? 0.45 : 1) : 1
      const col = pct >= 80 ? '#5fd38a' : low ? '#ff4f5e' : '#ffd23a'
      // battery icon
      q.save(); q.globalAlpha = blink
      R(q, BONE, sx + 14, sy + 22, sw - 34, 34); R(q, BONE, sx + sw - 20, sy + 32, 6, 14)
      R(q, '#1d1640', sx + 18, sy + 26, sw - 42, 26)
      R(q, col, sx + 18, sy + 26, Math.max(3, (sw - 42) * pct / 100), 26)
      q.restore()
      if (charging) drawBits(q, ['..YY', '.YY.', 'YYYY', '.YY.', 'YY..'], { Y: '#ffe14d' }, sx + sw / 2 - 4, sy + 39, 4)
      q.font = `700 28px ${MONO}`; q.fillStyle = col; q.textAlign = 'center'; q.textBaseline = 'middle'
      q.fillText(`${Math.round(pct)}%`, sx + sw / 2, sy + 86)
      if (note > 0.01) {
        q.save(); q.translate(sx + sw / 2, sy + sh - 4); q.rotate(-0.06); q.scale(note, note)
        R(q, '#ffe680', -40, -26, 80, 30); q.font = `800 15px ${INTER}`; q.fillStyle = INK; q.fillText('charged :)', 0, -10)
        q.restore()
      }
    },
  })
}
function cable(x, t, toX, toY, k) {
  // from the outlet, sagging along the floor, up to the phone's bottom
  const ex = lerp(OUTLET.x, toX, k), ey = lerp(OUTLET.y - 20, toY, k)
  x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'round'
  x.beginPath(); x.moveTo(OUTLET.x, OUTLET.y - 26); x.quadraticCurveTo((OUTLET.x + ex) / 2, 640, ex, ey); x.stroke()
  x.strokeStyle = '#efe6d6'; x.lineWidth = 5
  x.beginPath(); x.moveTo(OUTLET.x, OUTLET.y - 26); x.quadraticCurveTo((OUTLET.x + ex) / 2, 640, ex, ey); x.stroke()
  R(x, INK, ex - 9, ey - 6, 18, 18); R(x, BONE, ex - 5, ey - 2, 10, 10)
}

function draw(x, t) {
  const day = t >= 7.2
  bedroom(x, t, day)
  portrait(x, t, day, day ? (t > C.see ? 3 : 2) : t > B.bolt ? 3 : t > B.creak ? 2 : 1)
  bed(x)
  // ♐ Sagittarius in bed
  const sagX = 230
  let sm = 'sleepy', sl = [0, 0], sb
  if (t < A.asleep) { sm = 'happy' }
  if (day) { sm = 'sleepy'; if (t > C.wake) { sm = 'wide'; sl = [1, 0]; sb = false } if (t > C.see + 0.3) { sm = 'heart'; sb = undefined } if (t > C.dead) { sm = 'wide'; sl = [1, 0] } if (t > C.move[1]) { sm = 'happy'; sl = [1, 0] } }
  const sHops = [A.flop, A.night, B.stir, B.mumble, C.wake, C.see + 0.3, C.move[0], C.turn]
  const sit = day && t > C.wake ? ease.outCubic(prog(t, C.wake, C.wake + 0.3)) : 0
  drawStarChar(x, sagX, lerp(450, 410, sit), 220, t, { color: SAG.color, glyph: SAG.glyph, mood: sm, look: sl, blink: sb, hops: sHops, seed: 3, glow: 1.1, squash: sit ? 0 : 0.08 })
  blanket(x, lerp(470, 490, sit))
  nightstand(x)
  // the phones (Sag's left, Virgo's right) and the one charger
  let pS = 2, pV = 4
  if (!day && t > B.bolt) pS = 2 + clamp((t - B.bolt) / 0.6)
  if (day) { pS = 100; pV = t > C.dying ? 1 : 1; }
  const vDead = day && t > C.dead
  let plugK = !day ? ease.inOutCubic(prog(t, ...B.plug)) : 1
  let target = PH_S
  if (day && t > C.move[0]) { const m = ease.inOutCubic(prog(t, ...C.move)); plugK = 1; target = { x: lerp(PH_S.x, PH_V.x, m), y: PH_S.y } }
  phoneOn(x, t, PH_V, { pct: day && t > C.move[1] ? 1 : pV, dead: vDead && t < C.move[1] + 0.3, charging: day && t > C.move[1], glow: 0 })
  phoneOn(x, t, PH_S, { pct: pS, charging: (!day && t > B.bolt) || (day && t < C.move[0]), note: day ? pop01(t, 7.4, 0.3, 2.4) : 0, glow: day && t > C.see ? 0.6 : 0 })
  cable(x, t, target.x, target.y + 84, plugK)
  // ♍ Virgo, tiptoeing
  let vx = 725
  vx = lerp(vx, 700, ease.inOutQuad(prog(t, ...B.step)))
  vx = lerp(vx, 685, ease.inOutQuad(prog(t, ...B.step2)))
  if (day) vx = 715
  let vm = 'neutral', vl = [-1, 0], vb
  if (!day) {
    if (t > A.look1) { vm = 'wide'; vl = [-1, 1]; vb = false }
    if (t > A.look2) { vm = 'wide'; vl = [-1, 1] }
    if (t > B.step[0]) { vm = 'squint'; vl = [-1, 0]; vb = undefined }
    if (t > B.creak) { vm = 'wide'; vl = [-1, 0]; vb = false }
    if (t > B.step2[0]) { vm = 'squint'; vb = undefined }
    if (t > B.mumble) { vm = 'wide'; vb = false }
    if (t > B.bolt) { vm = 'sparkle'; vb = undefined }
    if (t > B.yay[0]) vm = 'happy'
  } else {
    vm = 'happy'; vl = [-1, 0]
    if (t > C.dead) { vm = 'wide'; vl = [-1, 1]; vb = false }
    if (t > C.shrug) { vm = 'happy'; vb = undefined }
    if (t > C.vheart) vm = 'heart'
  }
  const tip = !day && t > B.step[0] && t < B.bolt ? 0.04 * Math.sin(t * 16) : 0
  const vHops = [A.look1, ...B.yay, C.shrug, C.vheart, C.vheart + 0.35]
  drawStarChar(x, vx, 380 + (!day && t > B.step[0] && t < B.bolt ? -14 : 0), 210, t, { color: VIR.color, glyph: VIR.glyph, mood: vm, look: vl, blink: vb, hops: vHops, seed: 9, glow: 1.1, squash: -0.06 + tip })
  // words
  speech(x, t, 300, 280, A.night, 'night!', { size: 36, tail: 0, life: 0.7, col: '#ffe7b0' })
  sfx(x, t, PH_V.x, 270, A.look1 + 0.15, '4%', { size: 40, life: 0.45, col: '#ff4f5e' })
  sfx(x, t, PH_S.x, 260, A.look2 + 0.1, '2%?!', { size: 46, life: 0.6, col: '#ff4f5e' })
  sfx(x, t, 650, 640, B.creak, 'creak', { size: 40, life: 0.6, col: '#ffcf7a', rot: 0.1 })
  sfx(x, t, 470, 620, B.click, 'click', { size: 34, life: 0.5, col: BONE })
  speech(x, t, 230, 300, B.mumble, 'mm… five more…', { size: 28, tail: 0, life: 0.8, col: '#e9dcff' })
  sparkles(x, t, PH_S.x, PH_S.y, B.bolt, 8, 90, 1, ['#ffe14d', BONE], 20)
  B.yay.forEach((y, i) => sfx(x, t, 690 + (i - 1) * 40, 230 - i * 14, y, i === 1 ? '(silent yay)' : '♪', { size: i === 1 ? 30 : 36, life: 0.45, col: '#fff1c8', rot: (i - 1) * 0.1 }))
  if (day) {
    sparkles(x, t, PH_S.x, PH_S.y, C.see, 10, 110, 2, ['#5fd38a', BONE, GOLD], 22)
    if (t > C.see + 0.3) hearts(x, t, sagX, 300, C.see + 0.3, { n: 5, life: 1.4, cell: 6, spread: 120 })
    sfx(x, t, PH_V.x, 290, C.dead, 'bloop', { size: 38, life: 0.7, col: '#9fe6ff' })
    sfx(x, t, 730, 230, C.shrug + 0.3, 'eh.', { size: 40, life: 0.6, col: BONE })
    speech(x, t, 300, 270, C.turn, 'your turn.', { size: 34, tail: -1, life: 1.2, col: '#ffe7b0' })
    if (t > C.vheart) hearts(x, t, 725, 280, C.vheart, { n: 5, life: 1.3, cell: 6, spread: 120, seed: 3 })
  }
  // night: the room in lamp-less blue dark
  if (!day) { x.fillStyle = 'rgba(12,8,44,0.28)'; x.fillRect(0, 0, S, S) }
}

const EP = makeLittle({
  id: 'trlittlecharge', accent: '#5fd38a',
  tag: 'Charging their phone, *unasked.*',
  draw,
  clock: [{ at: 0.7, text: '12:14 AM' }, { at: B.step[0], text: '12:16 AM' }, { at: 7.25, text: '7:30 AM' }],
  lines: [{ t: 3.55, text: 'virgo, on a *very* quiet mission.' }, { t: 9.35, text: 'one charger. they picked *yours.*' }],
  last: '*Full* battery, | full heart.', lastSize: 108, lastAccentSize: 148, lastLate: 2,
  cues: () => [
    ['whoosh', A.flop, 0.3, 0.03], ['tom', A.flop + 0.1, 100, { gain: 0.15, decay: 0.15 }], ['pop', A.night, 880, 0.03, -0.2],
    ['pop', A.look1 + 0.15, 659.25, 0.03, 0.3], ['pop', A.look2 + 0.1, 1318.51, 0.04, 0.2], ['pop', A.look2 + 0.18, 1567.98, 0.03, 0.2],
    ...[0, 0.18].map(d => ['tick', r3(B.step[0] + d), 0.02]),
    ['pluck', B.creak, 196, 0.04, 0.5, 0.3], ['pluck', B.creak + 0.08, 185, 0.03, 0.5, 0.3],
    ['pop', B.stir, 523.25, 0.02, -0.3], ...[0, 0.18].map(d => ['tick', r3(B.step2[0] + d), 0.02]),
    ['tick', B.click, 0.07], ['tick', B.click + 0.03, 0.05], ['pop', B.mumble, 587.33, 0.02, -0.3],
    ['bell', B.bolt, 1567.98, 0.03, 0.8, 0.2], ['glitter', B.bolt, B.bolt + 0.4],
    ...B.yay.map((y, i) => ['pop', y, [1046.5, 1174.66, 1318.51][i], 0.012, 0.3]),
    ['pop', C.wake, 880, 0.03, -0.2], ['pluck', C.see + 0.3, 1318.51, 0.04, 0.5, 0], ['pluck', C.see + 0.42, 1567.98, 0.035, 0.5, 0], ['glitter', C.see, C.see + 0.4],
    ['pluck', C.dead, 523.25, 0.035, 0.4, 0.3], ['pluck', C.dead + 0.12, 392, 0.03, 0.5, 0.3], ['pop', r3(C.shrug + 0.3), 783.99, 0.03, 0.3],
    ['whoosh', C.move[0], 0.25, 0.025], ['tick', C.move[1], 0.06], ['pop', C.turn, 1046.5, 0.03, -0.3],
    ['pluck', C.vheart, 1318.51, 0.035, 0.5, 0.3], ['bell', C.vheart + 0.1, 2093, 0.025, 1.0, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
