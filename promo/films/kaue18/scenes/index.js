// kaue18 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E18 (long) "Week one after the breakup: the run" (80 s, cinematic · Fm, loop).
//   0.0  Frame 0: Scorpio mid-fall onto the bed, the picture glitching. Hook "Week one single. *Continue?*" + tag WAIT FOR DAY 7
//   1.4  glitch: "GAME OVER… *continue?*"   [CONTINUE] [QUIT]
//   3    DAY 1 · EAT SOMETHING: quest accepted; toast → 9 ★ ATE A WHOLE TOAST
//   13   DAY 2 · THE PLAYLIST: skip, skip, skip the sad ones → "dance anyway" → 21 ★ SKIPPED THE SAD ONES
//   23   DAY 3 · BOSS: TEXT THE EX? Three almost-texts, each typed and deleted (boss HP drains) → 34.5 ★ DIDN’T SEND IT
//   37   DAY 4 · CO-OP: Cancer + Pisces arrive with soup and tissues → 45 ★ PARTY JOINED: 3 PLAYERS
//   49   DAY 5 · GO OUTSIDE: the walk, a joke, the first laugh → 54 ★ FIRST LAUGH
//   58   DAY 6 · AN OLD PHOTO: "i miss them. that’s okay." · "i hope they’re doing well." → 65 ★ MISSED THEM, STAYED KIND
//   67   DAY 7 · GOOD MORNING: "good morning, me." → 71 ★ WEEK ONE: CLEARED · Pisces cam "I’M SO PROUD"
//   75.6 last line "Day seven. *Still* standing." · 79.6–80 loops back into the day-1 fall.
import { makeAch } from '../../kaue01/achengine.js'
import { drawStreet } from '../../kaue01/sets.js'
import { hero, R, box, label, sparkles, hearts, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, RED, GREEN, INTER, MONO } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawScorpioHome } from '../../st9scorpiohome.js'

const CH = [0, 13, 23, 37, 49, 58, 67]
const chap = t => { let i = 0; CH.forEach((c, k) => { if (t >= c) i = k }); return i }
function toast(x, t) {
  box(x, 690, 1150, 200, 120, '#c8c4d8', { b: 6, hi: '#e8e4f4' }); R(x, INK, 730, 1150, 120, 10)
  const up = ease.outBack(prog(t, 7.2, 7.6)), eat = prog(t, 9.0, 10.5)
  if (up > 0 && eat < 1) { const Y = lerp(1150, 980, up); box(x, 730, Y - 50, 120, 100 * (1 - eat * 0.8), '#e0a050', { b: 5, hi: '#f0c070' }) }
}
const SONGS = ['sad song (slow)', 'a sadder song', 'the one from the car', 'dance anyway']
function playlist(x, t) {
  x.save(); x.translate(540, 820)
  box(x, -330, -220, 660, 440, '#140d30', { b: 8 }); label(x, 'PLAYLIST · tonight', 0, -180, { size: 30, col: GOLD })
  const cur = t < 17 ? 0 : t < 18 ? 1 : t < 19 ? 2 : 3
  SONGS.forEach((s, i) => {
    const y = -110 + i * 80, on = i === cur
    if (on) R(x, '#3a2a6a', -310, y - 32, 620, 64)
    label(x, (on ? '▶ ' : '   ') + s, -290, y, { size: 30, col: i < cur ? 'rgba(239,230,214,0.35)' : on && i === 3 ? GREEN : BONE, align: 'left' })
    if (i < cur) R(x, RED, -290, y - 2, 420, 5)
  })
  x.restore()
}
const DRAFTS = [['i miss u', 23.8, 26.4], ['remember when we', 27.0, 29.6], ['can we talk', 30.2, 32.8]]
function phone(x, t) {
  x.save(); x.translate(540, 860)
  box(x, -250, -330, 500, 660, '#1a1430', { b: 10 }); R(x, '#0e0a20', -226, -300, 452, 600)
  label(x, 'to: them', -200, -260, { size: 28, col: '#c9c0e0', align: 'left' })
  R(x, '#2a2448', -210, 170, 420, 80)
  for (const [txt, a, b] of DRAFTS) {
    if (t < a || t > b) continue
    const typed = Math.floor(clamp((t - a) / 1.2) * txt.length), del = clamp((t - (b - 0.9)) / 0.6)
    const shown = txt.slice(0, Math.max(0, Math.round(typed * (1 - del))))
    label(x, shown + (Math.floor(t * 3) % 2 ? '|' : ''), -190, 210, { size: 34, col: BONE, align: 'left' })
    if (t > b - 1.2 && t < b - 0.8) { x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(-200, 250); x.lineTo(200, 170); x.stroke() }
  }
  R(x, '#5a5a7a', 140, 190, 60, 40); label(x, 'send', 170, 210, { size: 18, col: '#9a9ab8' })
  x.restore()
}
function bossBar(x, t) {
  const k = ease.outBack(prog(t, 23.2, 23.5)) * (1 - ease.inCubic(prog(t, 35.0, 35.3)))
  if (k <= 0.01) return
  const hp = 1 - (prog(t, 25.8, 26.4) + prog(t, 29.0, 29.6) + prog(t, 32.2, 32.8)) / 3
  x.save(); x.translate(540, 1640); x.scale(k, k)
  x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText('BOSS: TEXT THE EX?', 3, -38); x.fillStyle = '#ff6b7f'; x.fillText('BOSS: TEXT THE EX?', 0, -42)
  R(x, INK, -404, -14, 808, 48); R(x, '#3a1020', -396, -6, 792, 32); R(x, RED, -396, -6, 792 * hp, 32)
  x.restore()
}
function photo(x, t) {
  const k = ease.outBack(prog(t, 58.6, 59.0))
  if (k <= 0) return
  x.save(); x.translate(540, 760); x.rotate(-0.05); x.scale(k, k)
  box(x, -170, -150, 340, 300, '#c98a4a', { b: 8 }); R(x, '#3a2a6a', -140, -120, 280, 240)
  hero(x, t, 'scorpio', -60, 10, 110, { mood: 'happy', look: [1, 0], seed: 1, bob: 0, tips: false })
  x.save(); x.globalAlpha = 0.55; hero(x, t, 'gemini', 60, 10, 110, { mood: 'happy', look: [-1, 0], seed: 2, bob: 0, tips: false }); x.restore()
  x.restore()
}
function scene(x, t) {
  const c = chap(t)
  const hour = [23, 21, 1, 18, 15, 20, 8][c]
  daySky(x, t, { hour })
  if (c === 4) { drawStreet(x, t, { bench: false }) }
  else drawScorpioHome(x, t, { room: c === 1 || c === 5 ? 'desk' : c === 0 && t > 6 && t < 11 ? 'kitchen' : 'bedroom', dark: c === 6 ? 0 : c === 2 ? 0.75 : 0.4, hour })
  if (c === 0) {
    const fall = t < 0.8
    hero(x, t, 'scorpio', 460, fall ? lerp(1000, 1200, t / 0.8) : 1200, 300, { mood: fall ? 'wide' : t < 7 ? 'neutral' : 'happy', look: [0, 1], seed: 10, squash: fall ? -0.12 : 0, hops: [4.2, 9.1, 9.6] })
    if (t > 6 && t < 11) toast(x, t)
  } else if (c === 1) {
    playlist(x, t)
    hero(x, t, 'scorpio', 540, 1360, 280, { mood: t < 20 ? 'squint' : 'happy', look: [0, -1], seed: 10, hops: t > 20 ? [20.1, 20.5, 20.9, 21.3, 21.7, 22.1] : [17, 18, 19] })
  } else if (c === 2) {
    phone(x, t)
    hero(x, t, 'scorpio', 860, 1400, 240, { mood: t < 33.4 ? 'squint' : 'happy', look: [-1, -1], seed: 10, hops: [33.6, 34.0] })
  } else if (c === 3) {
    const arrive = ease.outCubic(prog(t, 37.4, 38.4))
    hero(x, t, 'scorpio', 400, 1200, 280, { mood: t < 38 ? 'wide' : 'happy', look: [1, 0], seed: 10, hops: [42.4] })
    hero(x, t, 'cancer', lerp(1200, 680, arrive), 1220, 240, { mood: 'happy', look: [-1, 0], seed: 7, hops: [42.0, 42.4] })
    hero(x, t, 'pisces', lerp(1350, 860, arrive), 1250, 220, { mood: 'sparkle', look: [-1, 0], seed: 12, tears: 3, hops: [39.6, 40.0] })
    if (arrive > 0.9) { box(x, 610, 1300, 140, 60, '#c8c4d8', { b: 5 }); R(x, '#f0a040', 620, 1296, 120, 12); box(x, 820, 1320, 90, 60, '#e9f6ff', { b: 4 }) }
    hearts(x, t, 42.6, 520, 1050, { n: 7 })
  } else if (c === 4) {
    const walk = ease.inOutQuad(prog(t, 49.4, 56))
    hero(x, t, 'scorpio', lerp(300, 620, walk), 1500, 280, { mood: t < 52.4 ? 'neutral' : 'happy', look: [1, 0], seed: 10, hops: [52.5, 52.8, 53.1, 53.4] })
    hero(x, t, 'cancer', lerp(520, 840, walk), 1510, 250, { mood: 'wink', look: [-1, 0], seed: 7, hops: [51.0] })
    // the pigeon
    const px = 760 - walk * 200; box(x, px, 1640, 60, 40, '#8a8aa8', { b: 4 }); box(x, px + 46, 1620, 26, 26, '#8a8aa8', { b: 4 }); R(x, INK, px + 58, 1628, 6, 6)
  } else if (c === 5) {
    photo(x, t)
    hero(x, t, 'scorpio', 540, 1330, 280, { mood: t < 63.4 ? 'neutral' : 'happy', look: [0, -1], seed: 10, hops: [61.2, 63.6] })
  } else {
    const sun = prog(t, 67, 68)
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.25 * sun; R(x, '#ffd890', 0, 0, 1080, 1920); x.restore()
    hero(x, t, 'scorpio', 480, 1170, 320, { mood: t < 68.4 ? 'sleepy' : 'sparkle', look: [0, -1], seed: 10, squash: -0.12 * Math.sin(Math.PI * prog(t, 68.2, 69.0)), hops: [69.2, 71.1, 71.5], zzz: t < 68.4 })
    sparkles(x, t, 480, 1100, 71, 16, 360, 0.3)
  }
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 80, ending: 'loop', key: 'Fm',
  shots: [
    { at: 0, cam: [1.35, 560, 1150] }, { at: 6.0, cam: [1.3, 620, 1150] }, { at: 11.0, cam: [1.35, 560, 1150] }, { at: 13, cam: [1.05, 540, 1000] },
    { at: 23, cam: [1.05, 540, 1000] }, { at: 37, cam: [1.25, 600, 1150] }, { at: 49, cam: (t) => [1.25, lerp(440, 700, prog(t, 49.4, 56)), 1350] },
    { at: 58, cam: [1.1, 540, 1000] }, { at: 67, cam: [1.35, 560, 1150] },
  ],
  scene, overlay: bossBar,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 500, cy: 1150 }, { at: 13, from: 1.35 }, { at: 23, from: 1.5 }, { at: 37, from: 1.35 }, { at: 49, from: 1.35 }, { at: 58, from: 1.3 }, { at: 67, from: 1.35 }],
  shakes: [{ at: 0.75, dur: 0.4, amp: 22 }, { at: 25.9, dur: 0.3, amp: 12 }, { at: 29.1, dur: 0.3, amp: 14 }, { at: 32.3, dur: 0.5, amp: 22 }],
  kit: [
    ['glitch', { at: -0.1, len: 1.0, dialog: false, amp: 0.6 }],
    ['glitch', { at: 1.5, len: 1.4, text: 'GAME OVER… *continue?*', buttons: ['CONTINUE', 'QUIT'] }],
  ],
  chapters: [
    { at: 3.0, out: 7.0, n: 'DAY 1', text: 'eat something' }, { at: 13.2, out: 16.4, n: 'DAY 2', text: 'the playlist' }, { at: 23.2, out: 26.0, n: 'DAY 3', text: 'BOSS: text the ex?', col: RED },
    { at: 37.2, out: 40.4, n: 'DAY 4', text: 'co-op' }, { at: 49.2, out: 52.2, n: 'DAY 5', text: 'go outside' }, { at: 58.2, out: 60.8, n: 'DAY 6', text: 'an old photo' },
    { at: 67.2, out: 70.6, n: 'DAY 7', text: 'good morning', col: GREEN },
  ],
  promise: { at: 0.4, out: 12.6, text: 'WAIT FOR DAY 7' },
  hook: { text: 'Week one single. | *Continue?*', out: 1.4 },
  bubbles: [
    { at: 3.6, out: 5.8, x: 460, y: 940, text: 'quest: eat something.', tail: 0 },
    { at: 7.8, out: 8.9, x: 500, y: 940, text: 'toast. counts.', tail: 0 },
    { at: 20.2, out: 22.4, x: 540, y: 1140, text: 'okay. this one.', tail: 0 },
    { at: 33.6, out: 35.4, x: 820, y: 1200, text: 'not tonight.', tail: 0 },
    { at: 39.4, out: 41.4, x: 820, y: 960, text: 'we brought soup AND tissues', size: 34, tail: 0.2 },
    { at: 41.8, out: 44.4, x: 640, y: 960, text: 'you don’t have to talk.', tail: 0 },
    { at: 50.6, out: 52.4, x: 760, y: 1250, text: 'that pigeon just judged you.', size: 34, tail: 0.2 },
    { at: 52.5, out: 53.9, x: 480, y: 1250, text: 'HA.', size: 60, tail: 0 },
    { at: 61.0, out: 63.3, x: 540, y: 1100, text: 'i miss them. that’s okay.', tail: 0 },
    { at: 63.4, out: 65.0, x: 540, y: 1100, text: 'i hope they’re doing well.', tail: 0 },
    { at: 69.2, out: 71.0, x: 480, y: 940, text: 'good morning, me.', tail: 0 },
  ],
  achs: [
    { at: 9.0, out: 11.0, title: 'ATE A WHOLE TOAST', xp: 50, icon: 'heart' },
    { at: 21.0, out: 22.8, title: 'SKIPPED THE SAD ONES', xp: 100, icon: 'star', y: 1380 },
    { at: 34.5, out: 36.6, title: 'DIDN’T SEND IT', sub: 'three drafts, zero sent', xp: 500, icon: 'star' },
    { at: 45.0, out: 47.4, title: 'PARTY JOINED: 3 PLAYERS', xp: 300, icon: 'heart' },
    { at: 54.0, out: 56.4, title: 'FIRST LAUGH', xp: 200, icon: 'star' },
    { at: 65.0, out: 66.8, title: 'MISSED THEM, STAYED KIND', xp: 700, size: 40, icon: 'heart', y: 1480 },
    { at: 71.0, out: 73.0, title: 'WEEK ONE: CLEARED', xp: 1000, icon: 'star' },
  ],
  cams: [{ at: 72.6, out: 75.4, line: 'I’M SO PROUD', lineAt: 73.0, tears: 3 }],
  last: { at: 75.6, text: 'Day seven. | *Still* standing.', top: 330, out: 79.5 },
})
