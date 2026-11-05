// kxsre02: SILENT REVIEW: EXTENDED, "Scorpio and the six phone checks" (60 s vertical, star_talk post, jazzy · Eb).
// The format lives in ../../kxsre01/srkit.js. No end card, no card transition: hard cut on the last line.
// ♏ Scorpio reviews a late-night diner date with ♊ Gemini, who keeps checking their phone. Not one word from Scorpio.
//   0.0–3.0    HOOK: a giant phone mid-slam onto the table, PHONE CHECKS: 6 flashing red, Scorpio's glare.
//              "They checked their phone. | *Six times.*" 0.55 record scratch: "wait for *check six.*" ◀◀ SIX CHECKS EARLIER
//   3.0–14.0   1 · THE BOOTH: check 1. [ narrows eyes ] [ slow, *slow* blink ] → 5/10
//   14.0–25.0  2 · FRIES: checks 2 and 3, Gemini giggles at the screen. [ eats one fry. *intensely.* ] → 4/10
//   25.0–36.0  3 · PIE: checks 4 and 5; loading bar "assuming the worst… 99%". → 3/10
//   36.0–48.5  4 · CHECK SIX: Gemini turns the phone round: the friends' chat, "IT'S GOING SO WELL". "sorry. they wanted
//              updates. phone away." [ a single tear ] → 10/10. Pisces the waiter reads it over their shoulder, sobbing.
//   48.5–60.0  THE VERDICT: Phone etiquette ★★ · Honesty ★★★★★ · The pie ★★★★ · The updates *about me* · 9/10.
//              "Six phone checks. | All about *me.*"
import { makeSR, R, box, plate, label, glow, sparkles, hearts, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, PINK, RED, CREAM, DATE, REV, INTER, MONO } from '../../kxsre01/srkit.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'

const CHECKS = [5.6, 16.0, 19.0, 26.5, 28.0, 37.0]
const nChecks = t => t < 3.0 ? 6 : CHECKS.filter(c => t >= c).length
const checking = t => CHECKS.some(c => t >= c && t < c + 1.3)

function venue(x, t) {
  R(x, '#1f4a52', -300, 300, 1680, 800); R(x, '#173a41', -300, 960, 1680, 110)
  // a long diner window with the night outside and a neon pie sign (shape only)
  box(x, 60, 380, 960, 300, '#0f1a3a', { b: 8 })
  for (let i = 0; i < 12; i++) R(x, i % 3 ? GOLD : '#7fd0ff', 90 + (i * 83) % 900, 420 + (i * 47) % 220, 10, 14)
  const on = 0.7 + 0.3 * Math.sin(t * 6) * Math.sin(t * 2.3)
  glow(x, 800, 520, 140, '255,120,160', 0.25 * on)
  x.save(); x.strokeStyle = `rgba(255,140,180,${0.6 + 0.4 * on})`; x.lineWidth = 10
  x.beginPath(); x.arc(800, 540, 70, Math.PI, 0); x.closePath(); x.stroke()
  x.beginPath(); x.moveTo(740, 520); x.lineTo(860, 520); x.stroke(); x.restore()
  // the booth backs (red vinyl)
  for (const bx of [170, 630]) { box(x, bx, 760, 300, 280, '#c0384a', { b: 8, hi: '#e05a6a' }); for (let i = 0; i < 4; i++) R(x, '#9a2a3a', bx + 30 + i * 70, 780, 10, 240) }
  glow(x, 540, 820, 520, '200,240,255', 0.08)
}

/** the date's phone, in its hand while it checks */
function datePhone(x, t) {
  if (!checking(t)) return
  const c = CHECKS.find(c => t >= c && t < c + 1.3), k = pop01(t, c, 0.2, 2.4) * outK(t, [c + 1.15, c + 1.3])
  x.save(); x.translate(DATE.x - 90, 1010); x.rotate(-0.25); x.scale(k, k)
  box(x, -30, -52, 60, 104, '#2b2140', { b: 5 }); R(x, '#9fe0ff', -24, -44, 48, 80)
  glow(x, 0, -10, 80, '160,224,255', 0.25)
  x.restore()
}

/** the big screen in check six: the friends' group chat (fictional, no app names) */
function chatScreen(tx, t, a) {
  const k = pop01(t, a, 0.35, 1.8) * outK(t, [a + 3.1, a + 3.4])
  if (k <= 0.01) return
  tx.save(); tx.translate(540, 930); tx.rotate(0.03); tx.scale(k, k)
  tx.fillStyle = 'rgba(6,4,18,0.55)'; tx.fillRect(-250, -380, 520, 780)
  box(tx, -270, -400, 520, 780, '#2b2140', { b: 8 }); R(tx, '#f4f1fb', -250, -370, 480, 700)
  tx.font = `800 30px ${INTER}`; tx.fillStyle = INK; tx.textAlign = 'center'; tx.textBaseline = 'middle'; tx.fillText('the group ✦ 4 people', -10, -335)
  R(tx, '#d8d2e8', -250, -310, 480, 3)
  const msgs = [[0.3, 'how’s it going??', 0], [0.9, 'IT’S GOING SO WELL', 1], [1.5, 'they’re so cute I can’t', 1], [2.1, 'stop texting us. go talk to them!!', 0]]
  msgs.forEach(([d, s, me], i) => {
    const mk = pop01(t, a + d, 0.25, 2.4); if (mk <= 0.01) return
    tx.font = `800 34px ${INTER}`
    const w = Math.min(420, tx.measureText(s).width + 40)
    const sc = Math.min(1, 380 / tx.measureText(s).width)
    tx.save(); tx.translate(me ? 210 - w / 2 : -230 + w / 2, -240 + i * 150); tx.scale(mk, mk)
    box(tx, -w / 2, -40, w, 80, me ? '#ff8fb1' : '#dfe8ff', { b: 4 })
    tx.fillStyle = INK; tx.save(); tx.scale(sc, 1); tx.fillText(s, 0, 2); tx.restore()
    tx.restore()
  })
  tx.restore()
}

const LOAD = { at: 29.5, len: 3.0, label: 'assuming the worst…', error: 'Error: not enough info', y: 860 }

const EP = makeSR({
  id: 'kxsre02', reviewer: 'scorpio', date: 'gemini', accent: '#ff8fb1',
  hookLine: 'They checked their phone. | *Six times.*',
  promise: 'wait for *check six.*', rewindSub: 'SIX CHECKS EARLIER',
  plate: 'SCORPIO · CRITIC', cloth: '#e8f0f2', check: '#c8d6dc',
  venue,
  hook: {
    circle: { x: 640, y: 1150, r: 150 },
    draw(x, t) {
      // the phone mid-slam onto the table (huge → landed), screen glowing
      const p = ease.inCubic(clamp((t + 0.3) / 0.75))
      const s = lerp(2.4, 1, p), rot = lerp(-0.5, -0.12, p)
      x.save(); x.translate(640, lerp(820, 1170, p)); x.rotate(rot); x.scale(s, s)
      if (p >= 1) { x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-70, 50, 150, 30) }
      box(x, -60, -100, 120, 200, '#2b2140', { b: 6 }); R(x, '#9fe0ff', -50, -88, 100, 160)
      for (let i = 0; i < 3; i++) R(x, '#ffffff', -36, -70 + i * 40, 72 - i * 14, 18)
      x.restore()
      if (p >= 1) sparkles(x, t, 640, 1150, 0.45, 10, 120, 2, [RED, BONE, GOLD])
    },
  },
  hookFace: () => ({ mood: 'squint', look: [1, 1], brows: { l: -0.7, r: -0.7, sl: -1, sr: -1 }, mouth: 'tight', shake: 1 }),
  hookDate: (t) => ({ mood: 'wide', look: [-1, 1], hops: [0.45] }),
  courses: [
    { title: 'THE BOOTH',
      shots: [[0, 'wide'], [2.6, 'date'], [4.4, 'rev'], [7.0, 'wide']],
      cc: [[0.4, '[ unreadable stare ]'], [2.8, '[ narrows eyes ]'], [5.5, '[ slow, *slow* blink ]'], [7.2, '[ takes notes ]']],
      face: [[0, 'poker'], [2.8, 'suspicious'], [5.5, 'blink'], [7.2, 'eyebrow']],
      date: (u, t, t0) => ({ mood: checking(t) ? 'neutral' : 'happy', look: checking(t) ? [-1, 1] : [-1, 0], hops: [t0 + 0.8, t0 + 1.4, t0 + 4.0] }),
      bubbles: [[0.8, 2.4, 'this place has the BEST pie'], [4.0, 5.4, 'sorry! one sec']],
      draw(x, t, P) {
        datePhone(x, t)
        if (P.u > 7.2) { box(x, 280, 1150, 110, 80, CREAM, { b: 4 }); for (let i = 0; i < 3; i++) R(x, '#7a8aa8', 292, 1166 + i * 18, 70 - i * 12, 5) }
      },
      card: '5/10', pis: { at: 1.0, tears: 1, mood: 'wide' },
      cues: [['pop', 0.8, 880, 0.035, 0.3], ['pop', 2.6, 1318.51, 0.03, 0.4], ['tick', 2.62, 0.05], ['pop', 4.0, 739.99, 0.035, 0.3]] },
    { title: 'FRIES',
      shots: [[0, 'wide'], [2.0, 'date'], [3.4, 'rev'], [5.0, 'two'], [7.3, 'tight']],
      cc: [[0.3, '[ eats one fry. *intensely.* ]'], [2.1, '[ check *two* ]'], [5.1, '[ check *three* ]'], [7.4, '[ eyebrow: *suspicious* ]']],
      face: [[0, 'chew'], [2.1, 'suspicious'], [5.1, 'clench'], [7.4, 'eyebrow']],
      date: (u, t, t0) => ({ mood: checking(t) ? 'happy' : 'sparkle', look: checking(t) ? [-1, 1] : [-1, 0], hops: [t0 + 2.4, t0 + 2.7, t0 + 5.4, t0 + 5.7] }),
      bubbles: [[2.5, 3.6, 'hehe'], [5.4, 6.8, 'haha sorry, one sec']],
      draw(x, t, P) {
        datePhone(x, t)
        plate(x, 560, 1185, 210, { kind: 'bowl', col: '#e8443a', food: (q) => { for (let i = 0; i < 9; i++) R(q, '#f2c75c', -80 + i * 19, -30 - (i % 3) * 12, 10, 40) } })
      },
      card: '4/10', pis: { at: 0.6, tears: 2 },
      cues: [['pop', 2.0, 1318.51, 0.03, 0.4], ['tick', 2.02, 0.05], ['pop', 5.0, 1318.51, 0.03, 0.4], ['tick', 5.02, 0.05], ['pluck', 2.5, 1567.98, 0.03, 0.3, 0.4], ['pluck', 2.7, 1760, 0.03, 0.3, 0.4]] },
    { title: 'PIE',
      shots: [[0, 'wide'], [1.4, 'date'], [3.0, 'rev'], [4.4, 'wide'], [7.6, 'tight']],
      cc: [[0.3, '[ the pie is good. *unfortunately.* ]'], [1.5, '[ check *four* ]'], [3.0, '[ check *five* ]'], [7.7, '[ stirs coffee. *ominously.* ]']],
      face: [[0, 'chew'], [1.6, 'blink'], [3.1, 'clench'], [4.4, 'suspicious'], [7.7, 'poker']],
      date: (u, t, t0) => ({ mood: checking(t) ? 'happy' : 'neutral', look: checking(t) ? [-1, 1] : [-1, 0], hops: [t0 + 1.7, t0 + 3.2] }),
      draw(x, t, P) {
        datePhone(x, t)
        plate(x, 560, 1185, 200, { food: (q) => { R(q, INK, -64, -40, 128, 44); R(q, '#e8b25a', -58, -34, 116, 34); R(q, '#b0483a', -58, -34, 116, 10) } })
        R(x, INK, 330, 1120, 70, 74); R(x, '#f4efe6', 336, 1126, 58, 62); R(x, '#5a3a2a', 340, 1132, 50, 20)
        if (P.u > 7.7) { x.save(); x.translate(366, 1110); x.rotate(Math.sin(t * 8) * 0.5); R(x, '#c9c9d9', -3, -60, 6, 60); x.restore() }
      },
      card: '3/10', pis: { at: 0.5, tears: 2 },
      cues: [['pop', 1.5, 1318.51, 0.03, 0.4], ['tick', 1.52, 0.05], ['pop', 3.0, 1318.51, 0.03, 0.4], ['tick', 3.02, 0.05], ['tick', 7.8, 0.04], ['tick', 8.1, 0.04], ['tick', 8.4, 0.04]] },
    { title: 'CHECK SIX',
      shots: [[0, 'wide'], [1.0, 'date'], [2.4, 'tight'], [3.6, 'wide'], [6.8, 'date'], [8.4, 'tight'], [10.0, 'wide']],
      cc: [[0.3, '[ check *six* ]'], [2.4, '[ the stare of the century ]'], [3.7, '[ reads the screen ]'], [6.9, '[ wasn’t expecting *that* ]'], [8.5, '[ a single tear ]'], [10.1, '[ the stare… *softens* ]']],
      face: [[0, 'suspicious'], [2.4, 'clench'], [3.6, 'wide'], [6.8, 'touched'], [8.4, 'tear'], [10.0, 'smile']],
      date: (u, t, t0) => ({ mood: u > 6.8 ? 'happy' : u > 3.4 ? 'wide' : 'neutral', look: u < 3.4 ? [-1, 1] : [-1, 0], blush: u > 6.8 ? 0.9 : undefined, hops: [t0 + 3.4, t0 + 6.9, t0 + 7.6] }),
      bubbles: [[6.9, 9.6, 'sorry. they wanted updates. phone away.']],
      draw(x, t, P) { datePhone(x, t) },
      over(tx, t, P) { chatScreen(tx, t, P.t0 + 3.6); if (P.u > 9.6) hearts(tx, t, P.t0 + 9.8, 540, 760, { n: 5, rise: 220 }) },
      card: '10/10', pis: { at: 0.3, tears: 3, pos: { x: 170, y: 960, s: 180 } },
      cues: [['pop', 1.0, 1318.51, 0.03, 0.4], ['tick', 1.02, 0.05], ['whoosh', 3.5, 0.4, 0.04], ['pop', 3.9, 880, 0.035, -0.3], ['pop', 4.5, 987.77, 0.035, 0.3], ['pop', 5.1, 1174.66, 0.035, 0.3], ['pop', 5.7, 880, 0.035, -0.3], ['bell', 8.5, 2637.02, 0.026, 1.8, -0.2], ['glitter', 10.0, 10.5]] },
  ],
  over(tx, t, P) {
    // the PHONE CHECKS counter, top right (flashes red on each new check)
    if (P.ph === 'verdict' && t > 49.2) return
    const n = nChecks(t), last = t < 3 ? 0 : Math.max(-9, ...CHECKS.filter(c => t >= c))
    const fl = t < 3 ? (Math.floor(t * 4) % 2) : clamp(1 - (t - last) / 0.6)
    tx.save(); tx.translate(1010, 500)
    const sc = 1 + 0.25 * fl
    tx.scale(sc, sc)
    tx.font = `800 40px ${INTER}`; tx.textAlign = 'right'; tx.textBaseline = 'middle'
    const s = `PHONE CHECKS: ${n}`, w = tx.measureText(s).width + 40
    box(tx, -w, -34, w, 68, fl > 0.3 ? RED : 'rgba(16,9,38,0.92)', { b: 5 })
    tx.fillStyle = BONE; tx.fillText(s, -20, 2)
    tx.restore()
  },
  fx: [{ scene: loadingBar(LOAD), cues: loadingBarCues(LOAD) }],
  verdict: { rows: [['Phone etiquette', 2], ['Honesty', 5], ['The pie', 4], ['The updates', '*about me*']], total: '9/10' },
  verdictDate: (t) => ({ mood: t > 55.3 ? 'heart' : 'happy', look: [-1, 0], hops: [55.3, 55.8, 56.7] }),
  last: 'Six phone checks. | All about *me.*',
  hookCues: [['boom', 0.45, 0.25], ['tom', 0.45, 80, { gain: 0.25, decay: 0.3 }], ['tick', 0.46, 0.08]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, MONO, PINK, REV, GOLD, prog]
