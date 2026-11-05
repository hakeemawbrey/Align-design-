// kaue16 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E16 (long) "Single Saturday: the full playthrough" (72 s, chiptune · D, hard cut).
//   0.0  Frame 0: Cancer mid-jump out of bed, mid whip. Hook "Single Saturday. *Wait* for the boss." + tag WAIT FOR THE BOSS FIGHT
//   2.5  CH 1 · SLEEP IN: the alarm rings, snooze, snooze, snooze → 10.0 ★ BEAT THE ALARM
//   14   CH 2 · BRUNCH CO-OP: Gemini + Sagittarius. "so how’s dating?" → record scratch → "single, happy, ordering pancakes."
//        → 23 ★ ANSWERED HONESTLY · Pisces cam: "pancakes for one is self-love"
//   28   CH 3 · ERRANDS SPEEDRUN: laundry · plant · groceries for one (splits) → 37 ★ ERRANDS ANY%
//   40   CH 4 · SIDE QUEST: Capricorn’s heavy bags; Cancer carries them → 47 ★ GOOD NEIGHBOUR
//   50   BOSS · THE WEDDING TABLE PLAN: TABLE 9 · SINGLES (boss HP bar). Cancer sits with Leo, Aquarius and a sobbing
//        Pisces. "okay, table nine. who wants to dance?" → everyone up → 62 ★ BOSS DEFEATED: TABLE 9
//   64   LEVEL COMPLETE: the stats board.   69.4 last line "Table nine. *Best* table." · hard cut at 72.
import { makeAch } from '../../kaue01/achengine.js'
import { drawDiner, drawStreet, drawDinner } from '../../kaue01/sets.js'
import { hero, R, box, label, sparkles, hearts, confetti, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, RED, GREEN, INTER } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawCancerHome } from '../../st9cancerhome.js'

const CH = [0, 14, 28, 40, 50, 64]
const chap = t => { let i = 0; CH.forEach((c, k) => { if (t >= c) i = k }); return i }
function alarm(x, t, X, Y) {
  const ringing = [2.6, 4.6, 6.6].some(a => t >= a && t < a + 1.4)
  const slap = [4.4, 6.4, 8.4].some(a => t >= a && t < a + 0.25)
  x.save(); x.translate(X + (ringing ? Math.sin(t * 60) * 8 : 0), Y - (slap ? 0 : 0)); x.scale(1, slap ? 0.8 : 1)
  box(x, -70, -60, 140, 110, '#e8344e', { b: 6, hi: '#ff6b7f' }); R(x, BONE, -50, -40, 100, 60); label(x, t < 8.6 ? '7:00' : '11:30', 0, -10, { size: 30, col: INK })
  for (const k of [-1, 1]) box(x, k * 50 - 18, -90, 36, 26, '#e8344e', { b: 5 })
  x.restore()
  if (ringing) for (let k = 0; k < 3; k++) R(x, BONE, X + 90 + k * 14, Y - 70 - k * 20, 10, 30)
}
function bag(x, X, Y, col) { box(x, X - 40, Y - 50, 80, 100, col, { b: 5, hi: '#ffffff33' }); R(x, INK, X - 20, Y - 70, 40, 8) }
function chart(x, t) {
  const k = ease.outBack(prog(t, 50.3, 50.8)) * (1 - ease.inCubic(prog(t, 54.6, 55.0)))
  if (k <= 0) return
  x.save(); x.translate(540, 780); x.scale(k, k)
  box(x, -330, -260, 660, 520, BONE, { b: 8 }); R(x, '#c8a24a', -330, -260, 660, 60); label(x, 'SEATING PLAN', 0, -230, { size: 34, col: INK })
  const rows = ['TABLE 1 · FAMILY', 'TABLE 2 · COUPLES', 'TABLE 3 · COUPLES', 'TABLE 4 · MORE COUPLES', 'TABLE 9 · SINGLES']
  rows.forEach((r, i) => label(x, r, 0, -150 + i * 80, { size: 32, col: i === 4 ? RED : INK }))
  if (t > 51.6) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.ellipse(0, 170, 250, 50, -0.03, 0, Math.PI * 2 * clamp((t - 51.6) * 3)); x.stroke() }
  x.restore()
}
function bossBar(x, t) {
  const k = ease.outBack(prog(t, 51.0, 51.3)) * (1 - ease.inCubic(prog(t, 62.6, 62.9)))
  if (k <= 0.01) return
  const hp = 1 - ease.inOutCubic(prog(t, 59.6, 61.4))
  x.save(); x.translate(540, 1720); x.scale(k, k)
  x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText('BOSS: TABLE 9', 3, -38); x.fillStyle = '#ff6b7f'; x.fillText('BOSS: TABLE 9', 0, -42)
  R(x, INK, -404, -14, 808, 48); R(x, '#3a1020', -396, -6, 792, 32); R(x, RED, -396, -6, 792 * hp, 32); R(x, 'rgba(255,255,255,0.3)', -396, -6, 792 * hp, 8)
  x.restore()
}
function stats(x, t) {
  const k = ease.outBack(prog(t, 64.2, 64.6))
  if (k <= 0) return
  x.save(); x.translate(540, 1000); x.scale(k, k)
  box(x, -380, -300, 760, 600, '#140d30', { b: 8 }); R(x, GOLD, -380, -300, 760, 8)
  label(x, 'LEVEL COMPLETE', 0, -230, { size: 52, col: GOLD })
  const L = [['alarms beaten', '3'], ['questions answered', '1'], ['errands', '3 / 3'], ['neighbours helped', '1'], ['dances at table 9', 'all of them']]
  L.forEach(([a, b], i) => { if (t < 64.8 + i * 0.4) return; label(x, a, -320, -120 + i * 80, { size: 32, col: BONE, align: 'left' }); label(x, b, 320, -120 + i * 80, { size: 32, col: GREEN, align: 'right' }) })
  x.restore()
}
function scene(x, t) {
  const c = chap(t)
  if (c === 0) {
    daySky(x, t, { hour: t < 9 ? 7 : 11.5 })
    drawCancerHome(x, t, { room: 'bedroom', hour: t < 9 ? 7 : 11.5 })
    const jump = t < 0.6, awake = t > 9
    hero(x, t, 'cancer', 470, jump ? 1080 - Math.sin(t * 5) * 40 : awake ? 1160 : 1230, 300, { mood: jump ? 'wide' : awake ? 'sparkle' : 'sleepy', look: [1, 0], seed: 7, squash: jump ? -0.15 : 0, hops: [4.4, 6.4, 8.4, 9.2, 10.1] })
    alarm(x, t, 820, 1180)
    sparkles(x, t, 470, 1100, 10.0, 12, 280, 0.3)
  } else if (c === 1) {
    drawDiner(x, t, { room: 'booth' })
    hero(x, t, 'gemini', 260, 1160, 240, { mood: t < 17 ? 'happy' : t < 21.5 ? 'wide' : 'happy', look: [1, 0], seed: 5, hops: [17.1, 17.5] })
    hero(x, t, 'cancer', 540, 1150, 280, { mood: t < 19.5 ? 'happy' : t < 21.5 ? 'wide' : 'sparkle', look: t < 21.5 ? [-1, 0] : [0, 0], seed: 7, hops: [21.6, 22.0, 22.4] })
    hero(x, t, 'sagittarius', 820, 1160, 240, { mood: t < 25.4 ? 'happy' : 'wink', look: [-1, 0], seed: 11, hops: [25.5, 25.9] })
    // pancakes
    box(x, 470, 1270, 140, 16, BONE, { b: 4 }); for (let k = 0; k < 4; k++) box(x, 480, 1250 - k * 18, 120, 14, '#e0a050', { b: 3 })
    sparkles(x, t, 540, 1100, 23, 12, 260, 0.2)
  } else if (c === 2) {
    daySky(x, t, { hour: 13 })
    drawStreet(x, t, { bench: false })
    const run = ((t - 28) * 0.11) % 1
    const X = lerp(150, 930, ease.inOutQuad(prog(t, 28.4, 36.4)))
    hero(x, t, 'cancer', X, 1500 - Math.abs(Math.sin(t * 12)) * 40, 300, { mood: t < 37 ? 'squint' : 'sparkle', look: [1, 0], seed: 7 })
    if (t > 30) bag(x, X - 160, 1520, '#7fd0ff')
    if (t > 32.5) { box(x, X + 130, 1470, 70, 60, '#e08a52', { b: 5 }); box(x, X + 140, 1400, 50, 70, '#4fae6a', { b: 5 }) }
    if (t > 35) bag(x, X - 230, 1530, '#ffd24a')
    for (let k = 0; k < 5; k++) R(x, 'rgba(255,255,255,0.4)', X - 280 - k * 50, 1440 + k * 24, 160, 8)
    void run
  } else if (c === 3) {
    daySky(x, t, { hour: 16 })
    drawStreet(x, t, { bench: true })
    const carry = t > 44.5
    hero(x, t, 'capricorn', carry ? 360 : 300, 1500, 250, { mood: t < 44 ? 'squint' : 'happy', look: [1, 0], seed: 13, hops: [44.1, 47.2] })
    hero(x, t, 'cancer', carry ? 640 : 760, 1500, 280, { mood: 'happy', look: [-1, 0], seed: 7, hops: [41.5, 42.2, 45.0] })
    if (!carry) { bag(x, 300, 1640, '#e9a23a'); bag(x, 210, 1650, '#c8344e') } else { bag(x, 520, 1520, '#e9a23a'); bag(x, 770, 1520, '#c8344e') }
    hearts(x, t, 45.0, 500, 1300, { n: 6 })
  } else if (c === 4) {
    drawDinner(x, t, { warm: 1 })
    const party = t > 59.4
    const seat = (s, X, size, o) => hero(x, t, s, X, party ? 1080 - Math.abs(Math.sin(t * 7 + X)) * 50 : 1130, size, { seed: X, look: [0, 0], ...o })
    if (t > 55) {
      seat('leo', 260, 230, { mood: party ? 'happy' : 'neutral', crown: true })
      seat('aquarius', 820, 230, { mood: party ? 'happy' : 'neutral' })
      seat('pisces', 690, 220, { mood: 'sparkle', tears: 3 })
      seat('cancer', 430, 280, { mood: t < 57.4 ? 'wide' : party ? 'happy' : 'sparkle', hops: [57.5, 57.9, 58.3] })
      for (const px of [260, 430, 690, 820]) box(x, px - 70, 1228, 140, 16, BONE, { b: 4 })
      if (party) confetti(x, t, 59.5, 540, 900)
    } else hero(x, t, 'cancer', 540, 1150, 300, { mood: t < 52.6 ? 'squint' : 'wide', look: [0, -1], seed: 7, blink: false })
    chart(x, t)
    sparkles(x, t, 540, 1050, 62, 14, 360, 0.5)
  } else {
    drawDinner(x, t, { warm: 1 })
    for (const [s, X] of [['leo', 230], ['cancer', 430], ['pisces', 650], ['aquarius', 850]]) hero(x, t, s, X, 1500, 240, { mood: s === 'pisces' ? 'sparkle' : 'happy', tears: s === 'pisces' ? 3 : 0, seed: X, hops: [65, 66.5, 68, 69.5].map(v => v + X * 0.001), crown: s === 'leo' })
    stats(x, t)
  }
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 72, ending: 'cut', key: 'D',
  shots: [
    { at: 0, cam: [1.35, 600, 1150] }, { at: 14, cam: [1.25, 540, 1100] }, { at: 19.2, cam: [1.55, 540, 1100], silent: true }, { at: 22.6, cam: [1.25, 540, 1100], silent: true },
    { at: 28, cam: (t) => [1.15, lerp(400, 700, prog(t, 28.4, 36.4)), 1400] }, { at: 40, cam: [1.2, 500, 1400] },
    { at: 50, cam: [1.0, 540, 960] }, { at: 55, cam: [1.4, 540, 1060] }, { at: 59.4, cam: [1.25, 540, 1060], silent: true }, { at: 64, cam: [1.0, 540, 960] },
  ],
  scene, overlay: bossBar,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 520, cy: 1100 }, { at: 14, from: 1.4 }, { at: 28, from: 1.4 }, { at: 40, from: 1.35 }, { at: 50, from: 1.5 }, { at: 59.4, from: 1.3 }, { at: 64, from: 1.3 }],
  freezes: [{ at: 18.8, dur: 1.4, text: 'the question. *at brunch.*', sub: 'level 2, round 1', top: 1500 }],
  shakes: [{ at: 4.4, dur: 0.3, amp: 14 }, { at: 6.4, dur: 0.3, amp: 16 }, { at: 8.4, dur: 0.4, amp: 22 }, { at: 51.6, dur: 0.5, amp: 20 }, { at: 60.2, dur: 0.8, amp: 26 }],
  chapters: [
    { at: 2.5, out: 8.0, n: 1, text: 'sleep in' }, { at: 14.2, out: 18.6, n: 2, text: 'brunch co-op' }, { at: 28.2, out: 31.0, n: 3, text: 'errands speedrun' },
    { at: 40.2, out: 43.6, n: 4, text: 'side quest: a neighbour' }, { at: 50.2, out: 53.6, n: 5, text: 'BOSS: the table plan', col: RED },
  ],
  promise: { at: 0.4, out: 13.6, text: 'WAIT FOR THE BOSS FIGHT' },
  kit: [['gameHud', { at: 28.3, out: [38.6, 38.9], start: 28.3, title: 'CANCER · ERRANDS · ANY%', splits: [{ at: 30.0, name: 'laundry' }, { at: 32.5, name: 'plant' }, { at: 35.0, name: 'groceries for 1' }] }]],
  hook: { text: 'Single Saturday. | *Wait* for the boss.', out: 2.4 },
  bubbles: [
    { at: 2.8, out: 4.3, x: 820, y: 1000, text: 'BEEP BEEP BEEP', tail: 0 },
    { at: 4.5, out: 6.3, x: 470, y: 960, text: 'snooze.', tail: 0 },
    { at: 6.5, out: 8.3, x: 470, y: 960, text: 'snooze…', tail: 0 },
    { at: 8.5, out: 9.8, x: 470, y: 960, text: 'SNOOZE.', size: 52, tail: 0 },
    { at: 11.4, out: 13.6, x: 470, y: 960, text: 'woke up at 11:30. no regrets.', size: 34, tail: 0 },
    { at: 16.6, out: 18.7, x: 280, y: 900, text: 'so… how’s dating?', tail: -0.3 },
    { at: 20.6, out: 22.8, x: 540, y: 880, text: 'single, happy, ordering pancakes.', size: 34, tail: 0 },
    { at: 25.4, out: 27.6, x: 800, y: 900, text: 'honestly? iconic.', tail: 0.3 },
    { at: 41.4, out: 43.8, x: 330, y: 1240, text: 'oof. these are heavy.', tail: 0 },
    { at: 42.6, out: 44.4, x: 760, y: 1240, text: 'i got you!', tail: 0 },
    { at: 45.4, out: 47.6, x: 380, y: 1240, text: 'oh, thank you, dear.', tail: 0 },
    { at: 55.6, out: 57.3, x: 690, y: 900, text: 'we’re the singles table!!', size: 34, tail: 0.2 },
    { at: 57.5, out: 59.4, x: 430, y: 880, text: 'okay, table nine. who wants to dance?', size: 32, tail: -0.1 },
    { at: 66.4, out: 68.8, x: 230, y: 1260, text: 'best table in the room.', tail: -0.2 },
  ],
  achs: [
    { at: 10.0, out: 11.6, title: 'BEAT THE ALARM', sub: 'by not beating it', xp: 100, icon: 'star' },
    { at: 23.0, out: 25.0, title: 'ANSWERED HONESTLY', xp: 200, icon: 'heart' },
    { at: 37.0, out: 39.4, title: 'ERRANDS ANY%', xp: 150, y: 560 },
    { at: 47.0, out: 49.2, title: 'SIDE QUEST: GOOD NEIGHBOUR', xp: 250, size: 38, icon: 'heart' },
    { at: 62.0, out: 63.8, title: 'BOSS DEFEATED: TABLE 9', xp: 1000, icon: 'star' },
  ],
  cams: [{ at: 24.6, out: 27.9, line: 'pancakes for one is self-love', lineAt: 25.0, tears: 3, mood: 'happy', y: 640 }],
  last: { at: 69.4, text: 'Table nine. | *Best* table.', top: 330 },
})
