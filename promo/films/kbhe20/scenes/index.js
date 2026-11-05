// kbhe20: BRAIN VS HEART, Ep 20 "The New Year's Countdown" (80.4 s vertical, LONG, star_talk post, music: house · Ab). Hard cut.
// ♒ Aquarius' New Year's Eve with one crush at the party, in five rounds refereed by THE STARS.
//   0.00   frame 0: mid whip zoom; Heart mid-jump at the giant clock (10:59), confetti frozen in the air, ref mid-whistle.
//          Title "Aquarius. New Year's Eve. | *One crush.*"  3.4 promise: "Wait for | *midnight.*"
//   7.0    R1 GO OR STAY IN: countdown from bed vs SCARF ON. (Heart)
//  21.0    R2 THE CRUSH ARRIVES: "act normal" → Aquarius waves with both hands; the crush waves back. (both)
//  35.0    R3 11:30 SMALL TALK: Brain's topic cards vs "ask something real": "what was the best part of your year?" (Heart)
//  49.0    R4 11:58 THE NERVES: sweaty hands; Brain and Heart hold hands. (both)
//  63.0    R5 MIDNIGHT: 3-2-1, confetti. "I'm really glad you're here." / "me too. happy new year." (both)
//  77.0    Both crying happy: "New year, new rule: just *say it.*"
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, countdown, countdownCues } from '../../hookkit.js'
import { key, clamp, lerp, prog, ease, pop01, R, rrect, INK, BONE, GOLD, INTER, MONO, drawStarChar, signStar, bubble, sparkles } from '../../kbhe01/bhkit.js'
import { makeLong } from '../../kbhe16/longkit.js'

export const DURATION = 80.4
const SIGN = 'aquarius', AQU = signStar('aquarius'), CRUSH = '#ff8fb1'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: "Aquarius. New Year's Eve. | *One crush.*", top: 168, size: 90, out: [3.1, 3.35] }
const PROMISE = { at: 3.4, text: 'Wait for | *midnight.*', top: 180, size: 110, out: [6.6, 6.9] }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const R1 = 7, R2 = 21, R3 = 35, R4 = 49, R5 = 63, OUT = 77
const COUNT = { at: R5 + 0.8, from: 3, gap: 0.7, go: 'NOW!', y: 760 }
const BOOM = { at: R5 + 0.8 + 3 * 0.7, len: 0.5, amp: 22 }
const AQ = { bg: '#e0f4ff', fg: INK, acc: '#1f7cc0', tag: '♒︎ AQUARIUS' }, CR = { bg: '#ffe6ee', fg: INK, acc: '#c0306a', tag: 'THE CRUSH' }

function party(x, t, Rw, dim = 0) {
  const g = x.createLinearGradient(0, Rw.y, 0, Rw.y + Rw.h); g.addColorStop(0, '#2a1a5a'); g.addColorStop(1, '#4a2050'); x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  for (let i = 0; i < 16; i++) { x.fillStyle = ['#ffd23a', '#7fd0ff', '#ff8fb1', '#9fe6b0'][i % 4]; if (Math.sin(t * 3 + i) > -0.2) { x.beginPath(); x.arc(Rw.x + 30 + i * 60, Rw.y + 34 + 14 * Math.sin(i), 8, 0, 7); x.fill() } }
  R(x, '#3a2a6a', Rw.x, Rw.y + 470, Rw.w, 90)
  if (dim) { x.fillStyle = `rgba(8,4,20,${dim})`; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h) }
}
function bigClock(x, t, cx, cy, s, txt, col = '#ffd23a') {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -230, -80, 460, 160); R(x, '#14081e', -220, -70, 440, 140)
  x.fillStyle = col; x.font = `700 110px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = col; x.shadowBlur = 20; x.fillText(txt, 0, 6)
  x.restore()
}
function introView(x, t, Rw, u) { party(x, t, Rw); bigClock(x, t, 540, Rw.y + 260, 1, '10:59', '#ffd23a') }
function goView(x, t, Rw, u) {
  const half = Rw.w / 2
  x.save(); x.beginPath(); x.rect(Rw.x, Rw.y, half, Rw.h); x.clip()
  x.fillStyle = '#2a2040'; x.fillRect(Rw.x, Rw.y, half, Rw.h); R(x, '#5a4a8a', Rw.x + 60, Rw.y + 300, half - 120, 160); R(x, '#7a6aaa', Rw.x + 60, Rw.y + 260, half - 120, 60); R(x, '#4fb3a6', Rw.x + 120, Rw.y + 280, 200, 120)
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('STAY IN', Rw.x + half / 2, Rw.y + 80)
  x.restore()
  x.save(); x.beginPath(); x.rect(Rw.x + half, Rw.y, half, Rw.h); x.clip(); party(x, t, Rw); x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('THE PARTY', Rw.x + half * 1.5, Rw.y + 110); x.restore()
  R(x, INK, Rw.x + half - 4, Rw.y, 8, Rw.h)
  if (u > 4.4) { const k = pop01(u, 4.4, 0.3, 2.4); x.save(); x.translate(Rw.x + half * 1.5, Rw.y + 330); x.scale(k, k); x.strokeStyle = '#5fd38a'; x.lineWidth = 10; x.beginPath(); x.ellipse(0, 0, 190, 120, 0, 0, 7); x.stroke(); x.restore() }
  bigClock(x, t, 540, Rw.y + Rw.h - 70, 0.4, '10:59')
}
function arrives(x, t, Rw, u) {
  party(x, t, Rw)
  R(x, INK, 800, Rw.y + 140, 170, 340); R(x, u > 1.0 ? '#ffd98a' : '#5a3a2a', 808, Rw.y + 148, 154, 332)
  const cx = key(u, [[1.0, 885], [2.4, 700, ease.outCubic]])
  if (u > 1.0) drawStarChar(x, cx, Rw.y + 380, 190, t, { color: CRUSH, mood: u > 7.4 ? 'happy' : 'sparkle', look: [-1, 0], seed: 9, hops: u > 7.4 ? [R2 + 7.5, R2 + 7.9] : null })
  drawStarChar(x, 300, Rw.y + 380, 190, t, { color: AQU.color, glyph: AQU.glyph, mood: u > 4.6 ? 'happy' : 'wide', look: [1, 0], seed: 4, hops: u > 4.6 ? [R2 + 4.7, R2 + 5.0, R2 + 5.3, R2 + 5.6] : null })
  if (u > 4.6 && u < 7.4) for (const d of [-1, 1]) { const a = Math.sin(t * 16) * 0.5; x.save(); x.translate(300 + d * 110, Rw.y + 290); x.rotate(a * d); R(x, INK, -16, -60, 32, 70); R(x, AQU.color, -10, -54, 20, 58); x.restore() }
  if (u > 7.4) { const a = Math.sin(t * 10) * 0.4; x.save(); x.translate(cx + 110, Rw.y + 290); x.rotate(a); R(x, INK, -16, -60, 32, 70); R(x, CRUSH, -10, -54, 20, 58); x.restore() }
  bigClock(x, t, 200, Rw.y + 80, 0.4, '11:15')
}
const TOPICS = ['the weather', 'resolutions?', 'favourite snack', 'traffic, huh']
function smallTalk(x, t, Rw, u) {
  party(x, t, Rw, 0.2)
  drawStarChar(x, 300, Rw.y + 400, 190, t, { color: AQU.color, glyph: AQU.glyph, mood: u > 7.6 ? 'happy' : 'neutral', look: [1, 0], seed: 4 })
  drawStarChar(x, 780, Rw.y + 400, 190, t, { color: CRUSH, mood: u > 8.8 ? 'heart' : 'neutral', look: [-1, 0], seed: 9 })
  TOPICS.forEach((s, i) => { const k = pop01(u, 1.0 + i * 0.5, 0.3, 2.2) * (1 - prog(u, 5.6, 6.0)); if (k <= 0.01) return; x.save(); x.translate(240 + i * 200, Rw.y + 130 + (i % 2) * 40); x.rotate((i % 2 ? 1 : -1) * 0.1); x.scale(k, k); R(x, INK, -90, -40, 180, 80); R(x, '#fff1a8', -84, -34, 168, 68); x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2); x.restore() })
  bubble(x, u, { t0: 6.4, t1: 8.6, who: AQ, x: 360, y: Rw.y + 240, tail: -40, text: 'what was the best part of *your* year?', size: 32, maxW: 520 })
  bubble(x, u, { t0: 8.8, t1: 14, who: CR, x: 720, y: Rw.y + 240, tail: 40, text: 'honestly? *this* party.', size: 34, maxW: 460 })
  bigClock(x, t, 940, Rw.y + 70, 0.36, '11:30')
}
function nerves(x, t, Rw, u) {
  party(x, t, Rw, 0.35)
  const sec = Math.min(59, Math.floor(u * 4.2))
  bigClock(x, t, 540, Rw.y + 240, 1.1 + 0.03 * Math.sin(t * 8), `11:58:${String(sec).padStart(2, '0')}`.slice(0, 8), '#ff5c7a')
  x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.fillText('two minutes to midnight', 540, Rw.y + 420)
}
function midnight(x, t, Rw, u) {
  party(x, t, Rw)
  const m = u > COUNT.gap * 3 + 0.8
  if (!m) bigClock(x, t, 540, Rw.y + 140, 0.6, '11:59', '#ff5c7a')
  else for (let i = 0; i < 40; i++) { const ph = (t * 0.5 + i * 0.11) % 1; x.fillStyle = ['#ffd23a', '#7fd0ff', '#ff8fb1', '#9fe6b0'][i % 4]; x.fillRect(Rw.x + (i * 97) % Rw.w, Rw.y + ph * Rw.h, 12, 14) }
  drawStarChar(x, 360, Rw.y + 400, 200, t, { color: AQU.color, glyph: AQU.glyph, mood: m ? 'happy' : 'wide', look: [1, 0], seed: 4 })
  drawStarChar(x, 720, Rw.y + 400, 200, t, { color: CRUSH, mood: u > 7.0 ? 'heart' : m ? 'sparkle' : 'wide', look: [-1, 0], seed: 9 })
  bubble(x, u, { t0: 4.6, t1: 14, who: AQ, x: 380, y: Rw.y + 230, tail: -20, text: "I'm really glad *you're here.*", size: 34, maxW: 440 })
  bubble(x, u, { t0: 7.0, t1: 14, who: CR, x: 720, y: Rw.y + 110, tail: 20, text: 'me too. *happy new year.*', size: 34, maxW: 420 })
}

const L = makeLong({
  sign: SIGN, duration: DURATION, buttonLabel: 'MIDNIGHT', buttonCol: '#ffd23a',
  cam: { tears: [[0, 1], [R2 + 7.4, 2], [R5 + 4.6, 3]], mood: [[0, 'wide'], [R3 + 8.8, 'sparkle'], [R5 + 3, 'happy']], look: [0, -1], hops: [R5 + 3, R5 + 3.4, R5 + 3.8] },
  intro: {
    at: 0, len: 7, view: introView,
    lines: [{ dt: 1.3, who: 'heart', text: "they'll be *THERE.* at *MIDNIGHT.*", size: 44, t1: 3.3 }, { dt: 4.3, who: 'brain', text: 'okay. *one round* at a time.', size: 44, t1: 6.8 }],
    heart: [[0, { mood: 'love', mouth: 'grin', arms: [2.9, 2.9], fn: (t, u) => ({ y: key(u, [[0, 1300], [0.6, 1440, ease.inQuad]]), rot: key(u, [[0, -0.3], [0.6, 0]]) }) }], [1.3, { mood: 'love', mouth: 'scream', arms: [2.7, 2.7] }], [3.4, { mood: 'happy', mouth: 'grin', arms: [0.6, 0.6] }]],
    brain: [[0, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6], look: [1, -1] }], [4.3, { mood: 'neutral', mouth: 'smile', arms: [0.4, 2.2] }]],
    props: (x, t, u) => { // confetti frozen at frame 0, falling after
      const fall = Math.max(0, u - 0.3)
      for (let i = 0; i < 28; i++) { const cx = 60 + (i * 137) % 960, cy = 1060 + ((i * 71) % 300) + fall * fall * 300; if (cy > 1700) continue; x.save(); x.translate(cx, cy); x.rotate(i + fall * 4); x.fillStyle = ['#ffd23a', '#7fd0ff', '#ff8fb1', '#9fe6b0'][i % 4]; x.fillRect(-8, -5, 16, 10); x.restore() }
    },
  },
  rounds: [
    { at: R1, len: 14, n: 1, title: 'GO OR STAY IN', view: goView, point: 'heart', call: 'ROUND 1: *HEART.*',
      lines: [{ dt: 1.0, who: 'brain', text: 'we could watch the countdown *from bed.*', size: 42 }, { dt: 4.4, who: 'heart', text: '*SCARF ON.* we are going.', size: 48 }, { dt: 8.0, who: 'brain', text: '…bring a *backup* scarf.', size: 46 }],
      brain: [[0, { mood: 'sly', mouth: 'smile', arms: [0.4, 2.2] }], [4.4, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [8.0, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.0] }]],
      heart: [[0, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4] }], [4.4, { mood: 'angry', mouth: 'grin', arms: [2.6, 2.6] }], [8.0, { mood: 'love', mouth: 'grin', arms: [0.6, 0.6] }]],
      props: (x, t, u, B, H) => { if (!H || u < 4.4) return; const k = pop01(u, 4.4, 0.3, 2.4); x.save(); x.translate(H.cx, H.cy + 20); x.scale(k, k); R(x, INK, -110, -20, 220, 44); for (let i = 0; i < 5; i++) R(x, i % 2 ? '#ff5c7a' : '#fff1c8', -104 + i * 42, -14, 42, 32); R(x, INK, 60, 10, 44, 110); R(x, '#ff5c7a', 66, 16, 32, 98); x.restore() } },
    { at: R2, len: 14, n: 2, title: '11:15 · THE CRUSH ARRIVES', view: arrives, point: 'both', call: 'ROUND 2: *BOTH!*',
      lines: [{ dt: 1.6, who: 'brain', text: 'act *normal.* act *normal.*', size: 48 }, { dt: 4.4, who: 'heart', text: '*WAVE!*', size: 62 }, { dt: 7.6, who: 'brain', text: 'that was *two hands.* …they waved back!', size: 42 }],
      brain: [[0, { mood: 'wide', mouth: 'scream', arms: [2.6, 2.6], sweat: 1 }], [4.4, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [7.6, { mood: 'happy', mouth: 'grin', arms: [2.6, 2.6], sweat: 0 }]],
      heart: [[0, { mood: 'love', mouth: 'grin', arms: [2.6, 2.6] }], [4.4, { mood: 'love', mouth: 'scream', arms: [2.9, 2.9], fn: (t) => ({ arms: [2.6 + 0.4 * Math.sin(t * 16), 2.6 - 0.4 * Math.sin(t * 16)] }) }], [7.6, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8] }]] },
    { at: R3, len: 14, n: 3, title: '11:30 · SMALL TALK', view: smallTalk, point: 'heart', call: 'ROUND 3: *HEART.*',
      lines: [{ dt: 1.0, who: 'brain', text: 'deploying *topic cards.*', size: 48 }, { dt: 4.0, who: 'heart', text: 'ask them something *real.*', size: 46 }, { dt: 9.6, who: 'heart', text: '*THIS* party. us. *this.*', size: 48 }],
      brain: [[0, { mood: 'angry', mouth: 'open', arms: [1.6, 1.6] }], [4.0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [8.8, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4] }]],
      heart: [[0, { mood: 'neutral', mouth: 'flat', arms: [0.4, 0.4] }], [4.0, { mood: 'love', mouth: 'smile', arms: [0.4, 2.4] }], [8.8, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8], tears: 1 }]] },
    { at: R4, len: 14, n: 4, title: '11:58 · THE NERVES', view: nerves, point: 'both', call: 'ROUND 4: *BOTH!*', alarm: [0.6, 9.0],
      lines: [{ dt: 1.0, who: 'brain', text: 'my hands are *sweating.*', size: 48 }, { dt: 3.6, who: 'heart', text: '*mine too.*', size: 54 }, { dt: 6.6, who: 'both', text: '…*together?*', size: 56 }],
      brain: [[0, { mood: 'wide', mouth: 'wobble', arms: [0.4, 0.4], sweat: 1 }], [6.0, { mood: 'happy', mouth: 'smile', arms: [0.4, 1.6], sweat: 1, fn: (t, u) => ({ x: key(u, [[6.0, 250], [6.6, 430, ease.outBack]]) }) }]],
      heart: [[0, { mood: 'wide', mouth: 'wobble', arms: [0.4, 0.4], sweat: 1 }], [6.0, { mood: 'love', mouth: 'smile', arms: [1.6, 0.4], sweat: 1, fn: (t, u) => ({ x: key(u, [[6.0, 830], [6.6, 650, ease.outBack]]) }) }]] },
    { at: R5, len: 14, n: 5, title: 'MIDNIGHT', view: midnight, point: 'both', call: 'ROUND 5: *BOTH!*',
      lines: [{ dt: 9.0, who: 'heart', text: 'we *SAID* it!!', size: 54 }],
      brain: [[0, { mood: 'wide', mouth: 'o', arms: [1.6, 1.6], fn: () => ({ x: 400 }) }], [3.0, { mood: 'happy', mouth: 'grin', arms: [2.8, 2.8], fn: () => ({ x: 400 }) }], [7.0, { mood: 'cry', mouth: 'grin', arms: [2.8, 2.8], tears: 3, fn: () => ({ x: 400 }) }]],
      heart: [[0, { mood: 'wide', mouth: 'o', arms: [1.6, 1.6], fn: () => ({ x: 690 }) }], [3.0, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8], fn: () => ({ x: 690 }) }], [7.0, { mood: 'cry', mouth: 'grin', arms: [2.8, 2.8], tears: 3, fn: () => ({ x: 690 }) }]],
      props: (x, t, u) => { if (u < 2.9) return; const fall = u - 2.9; for (let i = 0; i < 30; i++) { const cy = 1000 + ((i * 53) % 200) + ((fall * 260 + i * 37) % 700); x.save(); x.translate(60 + (i * 137) % 960, cy); x.rotate(i + fall * 4); x.fillStyle = ['#ffd23a', '#7fd0ff', '#ff8fb1', '#9fe6b0'][i % 4]; x.fillRect(-8, -5, 16, 10); x.restore() } } },
  ],
  outro: {
    at: OUT, len: DURATION - OUT, view: midnight,
    lines: [{ dt: 0.5, who: 'both', text: 'New year, new rule: just *say it.*', size: 48, maxW: 620, t1: 99 }],
    brain: [[0, { mood: 'cry', mouth: 'grin', arms: [2.8, 2.8], tears: 3, fn: () => ({ x: 400 }) }]],
    heart: [[0, { mood: 'cry', mouth: 'grin', arms: [2.8, 2.8], tears: 3, fn: () => ({ x: 690 }) }]],
  },
})

export const SCENES = [L.build, whipZoom(WHIP), screenShake(SHAKE), screenShake(BOOM), slamTitle(HOOK), slamTitle(PROMISE), ...L.chapters, countdown(COUNT)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...shakeCues(BOOM), ...slamTitleCues(HOOK), ...slamTitleCues(PROMISE),
  ['glitter', 0.0, 0.5],
  ['pop', R1 + 4.4, 1244.51, 0.05, 0], ['whoosh', R2 + 1.0, 0.4, 0.04], ['bell', R2 + 1.1, 1661.22, 0.03, 1.0, 0], ['pop', R2 + 7.4, 1396.91, 0.04, 0.3],
  ...[0, 1, 2, 3].map(i => ['pop', +(R3 + 1.0 + i * 0.5).toFixed(2), 1046.5, 0.035, 0]), ['bell', R3 + 8.8, 1661.22, 0.03, 1.2, 0],
  ...Array.from({ length: 12 }, (_, i) => ['tick', +(R4 + 0.5 + i * 0.75).toFixed(2), 0.05]),
  ...countdownCues(COUNT), ['glitter', BOOM.at, BOOM.at + 0.8], ['bell', R5 + 7.0, 1661.22, 0.035, 1.6, 0],
  ['bell', OUT + 0.55, 1244.51, 0.03, 1.6, 0],
  ...L.cues,
]
