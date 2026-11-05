// kcfe17: ZODIAC CONFESSIONAL ep 17 (long), "Episode: The Ex Walks In" (90 s vertical, music: screwed · Gm). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition. Chapter stickers from the hook kit.
// Cast: ♋ Cancer, ♌ Leo, ♏ Scorpio, and THE EX (a grey star). Pisces runs the boom and cries all episode.
//   0.0–4.2   COLD OPEN: Cancer mid-SPIT-TAKE of tea at the dinner table, a red circle on the opening door; hook "The ex
//             just *walked in.* To dinner." · record scratch: "wait for *what Cancer says.*"
//   4.2–16    CH 1 · THE SETUP: Leo "dinner party! I invited *everyone.*" · Scorpio "who's everyone?" · Leo "…*everyone*
//             everyone." · Cancer sets a fourth plate: "a fourth plate! *who's that for?*" (Leo whistles)
//   16–42     CH 2 · CONFESSIONALS: Leo "I invited everyone. *EVERYONE.*" / PRODUCER "including…?" / "I panicked. it was
//             *a group chat.*" · Scorpio "I'm calm." / "I've *never* been calmer." (glitch) / PRODUCER "your eye is doing a
//             thing." / "it does that *when I'm calm.*" · Cancer "we haven't talked *since spring.*" / "I still make *their
//             soup.*" / PRODUCER "what would you say to them?" / "…I don't know *yet.*"
//   42–58.4   CH 3 · THE DINNER: doorbell, THE EX walks in and sits; silence; a fork drops; Leo knocks the gravy flying:
//             "GRAVY? anyone? *gravy?*" · EX "hi. sorry. Leo said *everyone.*" · Scorpio "lovely. *lovely.*" (glitch) ·
//             Cancer stands: "can we talk? *outside?*"
//   58.4–76   CH 4 · THE PORCH: a kind, short talk. EX "I didn't know if I *should come.*" · Cancer "I'm glad you did. I'm
//             glad *you're okay.*" · EX "you too. *really.*" · Cancer "I'm keeping the soup recipe." · EX "it was always
//             *yours.*" · a small hug. Pisces sobs in the bush with the boom.
//   76–90     CH 5 · DESSERT: pie. Scorpio unclenches: "…ok. that was *mature.*" · Leo "pie! I invited *pie* too." · the ex
//             waves bye · PRODUCER "how do you feel?" · Cancer "*lighter.*"
//   87.0      last line "Closure tastes like *pie,* apparently." holds → hard cut at 90.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, RED, INTER, MONO, EX_GREY,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, drawDiningRoom, drawTable, recChrome, blk, rr, sparkles, step, pop01,
  buildBug, buildLower, buildCaps, buildSlam, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { porch, flicker } from '../../kcfe16/scenes/longkit.js'
import {
  slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, chapter, chapterCues, screenShake, shakeCues,
  caught, caughtCues, glitch, glitchCues,
} from '../../hookkit.js'

export const DURATION = 90
const SHOTS = [
  [0, 4.2, 'cold'], [4.2, 16, 'setup'],
  [16, 24.4, 'booth', 'leo'], [24.4, 32.6, 'booth', 'scorpio'], [32.6, 42, 'booth', 'cancer'],
  [42, 58.4, 'dinner'], [58.4, 76, 'porch'], [76, 90.1, 'dessert'],
]
const T = { scratch: 0.9, bell: 43.0, exIn: [43.4, 45.0], fork: 47.2, gravy: 48.0, stand: 55.6, hug: [72.2, 74.4], bye: 81.4, last: 87.0 }
const HOOK = { at: -1, text: 'The ex just *walked in.* | To dinner.', top: 150, size: 98, accentColor: SIGN('cancer').color, out: [4.0, 4.2] }
const WHIP0 = { at: -0.26, len: 0.5, from: 1.7, blur: 12 }
const REC = { at: T.scratch, len: 1.7, caption: 'wait for *what Cancer says.*', sub: 'three hours earlier…', top: 1560 }
const CAUGHT = { at: -1, x: 940, y: 900, r: 170, label: null, arrow: null, rec: false, out: [0.85, 0.9] }
const CH = [
  { at: 4.3, out: [15.7, 16], n: 1, title: 'THE SETUP', color: GOLD },
  { at: 16.1, out: [41.7, 42], n: 2, title: 'CONFESSIONALS', color: '#7fd0f0' },
  { at: 42.1, out: [58.1, 58.4], n: 3, title: 'THE DINNER', color: PINK },
  { at: 58.5, out: [75.7, 76], n: 4, title: 'THE PORCH', color: '#c9a6ff' },
  { at: 76.1, out: [86.6, 87], n: 5, title: 'DESSERT', color: '#9fe6b0' },
]
const WHIPS = SHOTS.slice(1).map(s => ({ at: s[0] - 0.04, len: 0.4, from: 1.5 }))
const SHAKE = { at: T.gravy, len: 0.6, amp: 26 }
const GL1 = { at: 26.6, len: 0.8, dialog: false, amp: 0.8 }, GL2 = { at: 53.4, len: 0.7, dialog: false, amp: 0.7 }
const w = id => { if (id === 'ex') return { who: 'THE EX', color: '#c8ccdc' }; const s = SIGN(id); return { who: `${s.glyph}︎ ${s.name}`, color: s.color } }
const CAPS = [
  { t: 5.0, end: 7.4, ...w('leo'), text: 'dinner party! I invited *everyone.*' },
  { t: 7.6, end: 9.4, ...w('scorpio'), text: "who's everyone?" },
  { t: 9.6, end: 11.6, ...w('leo'), text: '…*everyone* everyone.' },
  { t: 12.0, end: 15.6, ...w('cancer'), text: "a fourth plate! *who's that for?*" },
  { t: 16.4, end: 18.6, ...w('leo'), text: 'I invited everyone. *EVERYONE.*' },
  { t: 18.8, end: 20.2, kind: 'prod', text: 'including…?' },
  { t: 20.4, end: 24.2, ...w('leo'), text: 'I panicked. it was *a group chat.*' },
  { t: 24.8, end: 26.4, ...w('scorpio'), text: "I'm calm." },
  { t: 26.6, end: 28.8, ...w('scorpio'), text: "I've *never* been calmer." },
  { t: 29.0, end: 30.6, kind: 'prod', text: 'your eye is doing a thing.' },
  { t: 30.8, end: 32.5, ...w('scorpio'), text: "it does that *when I'm calm.*" },
  { t: 33.0, end: 35.2, ...w('cancer'), text: "we haven't talked *since spring.*" },
  { t: 35.4, end: 37.4, ...w('cancer'), text: 'I still make *their soup.*', accent: '#9fc4ff' },
  { t: 37.6, end: 39.4, kind: 'prod', text: 'what would you say to them?' },
  { t: 39.6, end: 41.9, ...w('cancer'), text: "…I don't know *yet.*" },
  { t: 48.2, end: 50.4, ...w('leo'), text: 'GRAVY? anyone? *gravy?*' },
  { t: 50.8, end: 53.0, ...w('ex'), text: 'hi. sorry. Leo said *everyone.*' },
  { t: 53.4, end: 55.4, ...w('scorpio'), text: 'lovely. *lovely.*', accent: RED },
  { t: 55.8, end: 58.2, ...w('cancer'), text: 'can we talk? *outside?*' },
  { t: 59.2, end: 61.6, ...w('ex'), text: "I didn't know if I *should come.*" },
  { t: 61.8, end: 64.4, ...w('cancer'), text: "I'm glad you did. I'm glad *you're okay.*" },
  { t: 64.6, end: 66.6, ...w('ex'), text: 'you too. *really.*' },
  { t: 66.8, end: 69.4, ...w('cancer'), text: "I'm keeping the *soup recipe.*" },
  { t: 69.6, end: 72.0, ...w('ex'), text: 'it was always *yours.*' },
  { t: 76.6, end: 78.8, ...w('scorpio'), text: '…ok. that was *mature.*' },
  { t: 79.0, end: 81.2, ...w('leo'), text: 'pie! I invited *pie* too.' },
  { t: 83.2, end: 84.6, kind: 'prod', text: 'how do you feel?' },
  { t: 84.8, end: 86.8, ...w('cancer'), text: '*lighter.*' },
  { t: T.last, end: 99, who: 'THE HOUSE', color: BONE, text: 'Closure tastes like *pie,* apparently.' },
]
const LOWER = { leo: '“invites everyone”', scorpio: '“extremely calm”', cancer: '“still makes the soup”' }
const shotAt = t => SHOTS.find(s => t >= s[0] && t < s[1]) || SHOTS[SHOTS.length - 1]
const SEAT4 = [190, 420, 660, 890]

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const dots = buildSlam(root, '…', { top: 600, size: 220, rot: 0 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function door(t, open) {
    blk(x, 870, 640, 180, 600, '#8a3a4a', { r: 6 })
    if (open > 0) { x.fillStyle = '#ffe6b0'; x.fillRect(876, 646, 168 * open, 588); x.fillStyle = '#5a2a34'; x.fillRect(876 + 168 * open - 20, 646, 20, 588) }
    x.fillStyle = GOLD; x.beginPath(); x.arc(1020, 950, 9, 0, Math.PI * 2); x.fill()
  }
  // four at the table; who: [cancer, leo, scorpio, ex|null]
  function table4(t, cast, { open = 0, rattle = 0, pie = 0, plates = 4, gravy = 0 } = {}) {
    drawDiningRoom(x, t, { wall: '#3a2a4a' })
    door(t, open)
    cast.forEach((c, i) => { if (c) seat(x, t, c.id, { x: c.x ?? SEAT4[i], y: c.y ?? 1020, s: 230, hops: c.hops, pop: c.pop }, { mood: c.mood || 'neutral', look: c.look, tears: c.tears || 0, seed: 40 + i, sweat: c.sweat || 0, squash: c.squash || 0 }) })
    drawTable(x, t, { y: 1150, plates: SEAT4.slice(0, plates), candles: [305, 775], rattle })
    // the gravy boat
    if (gravy < 1) { x.save(); x.translate(lerp(540, 600, gravy), lerp(1190, 1170, gravy)); x.rotate(gravy * 1.6); blk(x, -50, -24, 100, 48, BONE, { r: 20 }); x.fillStyle = '#8a5a2a'; x.fillRect(-40, -20, 80, 12); x.restore() }
    if (gravy > 0) { x.fillStyle = '#8a5a2a'; x.beginPath(); x.ellipse(620, 1215, 40 + gravy * 110, 14 + gravy * 18, 0.05, 0, Math.PI * 2); x.fill() }
    if (pie > 0) { x.save(); x.translate(540, 1200); x.scale(pie, pie); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 50, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8b25a'; x.beginPath(); x.ellipse(0, -4, 120, 42, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c8823a'; for (let i = 0; i < 6; i++) x.fillRect(-90 + i * 32, -20, 10, 30); x.restore() }
  }

  function cold(t) {
    table4(t, [{ id: 'cancer', mood: 'wide', look: [1, 0], squash: -0.08 }, { id: 'leo', mood: 'wide', look: [1, 0] }, { id: 'scorpio', mood: 'squint', look: [1, 0] }, null], { open: 0.7, plates: 3 })
    // grey silhouette in the doorway
    seat(x, t, 'ex', { x: 960, y: 900, s: 200 }, { mood: 'neutral', look: [-1, 0], seed: 44 })
    // the spit-take spray
    for (let i = 0; i < 18; i++) { const p = ((i * 0.37) % 1), a = -0.6 + p * 1.0, r = 60 + ((t + 0.4) * 400 + i * 23) % 260; x.fillStyle = INK; x.fillRect(190 + Math.cos(a) * r - 8, 980 + Math.sin(a) * r - 8, 16, 16); x.fillStyle = '#b8e0a0'; x.fillRect(190 + Math.cos(a) * r - 5, 980 + Math.sin(a) * r - 5, 10, 10) }
    blk(x, 240, 1040, 60, 70, '#f4ead8', { r: 8 })
    boomOp(x, t, { tears: 3, mood: 'wide', mic: [560, 640], op: [960, 520], size: 140 })
    recChrome(x, t, { label: 'COMING UP', tc0: 9000, y0: 440 })
  }

  function setup(t) {
    const fourth = t > 12.0
    table4(t, [
      { id: 'cancer', mood: t > 12 ? 'happy' : 'neutral', hops: [12.05, 12.7], look: t > 12 ? [1, 0] : undefined },
      { id: 'leo', mood: t > 12 ? 'squint' : 'happy', hops: [5.05, 5.7, 9.65, 10.3], look: [0, 0] },
      { id: 'scorpio', mood: step(t, [[0, 'neutral'], [7.6, 'squint'], [9.6, 'wide'], [12, 'squint']]), hops: [7.65], look: [-1, 0] },
      null,
    ], { plates: fourth ? 4 : 3 })
    if (fourth) sparkles(x, t, 890, 1240, 12.0, 8, 100, 1)
    // Leo's guest list scroll
    if (t > 5.0 && t < 12) { const k = pop01(t, 5.0, 0.3, 2); x.save(); x.translate(420, 760); x.scale(k, k); x.rotate(-0.05); blk(x, -120, -150, 240, 300, '#fbf0d8', { r: 6, hi: 0, lo: 0 }); x.font = `900 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('GUESTS', 0, -110); x.font = `600 24px ${MONO}`; ['everyone ✓', 'everyone ✓', 'EVERYONE ✓', '…'].forEach((s, i) => x.fillText(s, 0, -60 + i * 46)); x.restore() }
    if (t > 12.4 && t < 15.6) { x.font = `900 46px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('♪ ~whistle~ ♪', 420, 800 + Math.sin(t * 6) * 8) }
    boomOp(x, t, { tears: 2, mood: 'sparkle', mic: [560, 640], op: [960, 520], size: 140 })
    recChrome(x, t, { tc0: 600, y0: 440 })
  }

  function booth(t, id) {
    drawBooth(x, t, { sign: id })
    let mood = 'neutral', look = [0, 0], tears = 0, sq = 0
    if (id === 'leo') mood = step(t, [[16, 'happy'], [18.8, 'wide'], [20.4, 'squint']])
    if (id === 'scorpio') { mood = step(t, [[24, 'squint'], [29, 'wide'], [30.8, 'squint']]); sq = Math.sin(t * 23) > 0.75 ? 0.07 : 0 }
    if (id === 'cancer') { mood = step(t, [[32, 'neutral'], [35.4, 'sparkle'], [37.6, 'wide'], [39.6, 'neutral']]); look = t > 39.6 ? [0, 1] : [0, 0]; tears = t > 35.4 ? 1 : 0 }
    const F = seat(x, t, id, { ...SUBJ, hops: CAPS.filter(c => c.who && SIGN(id).name && c.who.includes(SIGN(id).name) && c.t > 16 && c.t < 42).map(c => c.t + 0.05) }, { mood, look, tears, seed: 3, squash: sq })
    if (id === 'scorpio' && sq) { x.fillStyle = RED; x.fillRect(SUBJ.x + 70, F.cy - 110, 14, 30); x.fillRect(SUBJ.x + 92, F.cy - 118, 14, 30) }
    drawChairFront(x)
    if (id === 'cancer' && t > 35.4) { const k = pop01(t, 35.4, 0.3, 2); x.save(); x.translate(SUBJ.x - 210, F.cy + 210); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 100, 60, 0, 0, Math.PI); x.fill(); x.fillRect(-106, -10, 212, 16); x.fillStyle = '#e8a24a'; x.beginPath(); x.ellipse(0, 4, 90, 50, 0, 0, Math.PI); x.fill(); x.restore() }
    boomOp(x, t, { tears: id === 'cancer' ? 4 : 2, mood: id === 'cancer' ? 'sparkle' : 'wide', sway: id === 'cancer' ? 2 : 1 })
    recChrome(x, t, { tc0: 4000 + SHOTS.findIndex(s => s[3] === id) * 700, y0: 440 })
  }

  function dinnerShot(t) {
    const open = t > T.bell ? ease.outCubic(prog(t, T.bell, T.bell + 0.4)) * (1 - ease.inCubic(prog(t, 45.2, 45.6))) : 0
    const exK = ease.inOutCubic(prog(t, ...T.exIn))
    const shock = t > T.exIn[0]
    const gravy = ease.inOutCubic(prog(t, T.gravy, T.gravy + 0.5))
    table4(t, [
      { id: 'cancer', mood: step(t, [[42, 'happy'], [T.exIn[0], 'wide'], [50.8, 'neutral'], [55.6, 'neutral']]), look: shock && t < 55.6 ? [1, 0] : [0, 0], hops: [55.65, 56.3], y: t > T.stand ? 980 : 1020, tears: t > 50.8 ? 1 : 0 },
      { id: 'leo', mood: step(t, [[42, 'happy'], [T.exIn[0], 'wide'], [48.2, 'squint'], [50.4, 'wide']]), sweat: t > 47 && t < 55 ? 1 : 0, hops: [48.25, 48.8, 49.4] },
      { id: 'scorpio', mood: step(t, [[42, 'neutral'], [T.exIn[0], 'squint']]), look: shock ? [1, 0] : undefined, squash: t > 53 && Math.sin(t * 23) > 0.75 ? 0.07 : 0, hops: [53.45] },
      t > T.exIn[0] ? { id: 'ex', mood: t > 50.8 ? 'happy' : 'neutral', look: [-1, 0], x: lerp(960, 890, exK), y: lerp(880, 1020, exK), hops: [50.85, 51.5] } : null,
    ], { open, rattle: t > T.gravy && t < T.gravy + 0.6 ? 5 : 0, gravy })
    if (t > T.fork && t < T.fork + 0.8) { const p = prog(t, T.fork, T.fork + 0.5); x.save(); x.translate(430, 1150 + p * 160); x.rotate(p * 4); x.fillStyle = '#d8dbe6'; x.fillRect(-5, -50, 10, 100); x.restore() }
    if (t > T.gravy) sparkles(x, t, 620, 1200, T.gravy, 10, 140, 1, ['#8a5a2a', BONE])
    boomOp(x, t, { tears: t > 50.8 ? 4 : 3, mood: 'wide', mic: [560, 640], op: [960, 520], size: 140, sway: t > T.gravy ? 2 : 1 })
    recChrome(x, t, { tc0: 10800, y0: 440 })
  }

  function porchShot(t) {
    porch(x, t)
    const hugK = ease.inOutCubic(prog(t, ...T.hug))
    const cm = step(t, [[58, 'neutral'], [61.8, 'happy'], [66.8, 'wink'], [69.6, 'sparkle'], [T.hug[0], 'happy']])
    const em = step(t, [[58, 'neutral'], [64.6, 'happy'], [69.6, 'happy']])
    seat(x, t, 'cancer', { x: lerp(370, 470, hugK), y: 1150, s: 270, hops: CAPS.filter(c => c.who && c.who.includes('CANCER') && c.t > 58 && c.t < 76).map(c => c.t + 0.05) }, { mood: cm, look: [1, 0], tears: t > 61.8 ? 1 : 0, seed: 45 })
    seat(x, t, 'ex', { x: lerp(720, 620, hugK), y: 1150, s: 270, hops: CAPS.filter(c => c.who === 'THE EX' && c.t > 58).map(c => c.t + 0.05) }, { mood: em, look: [-1, 0], seed: 46 })
    if (hugK > 0.6) sparkles(x, t, 545, 1000, T.hug[0] + 0.8, 10, 200, 2, [PINK, GOLD, BONE])
    // Pisces in the bush with the boom
    x.fillStyle = '#2f6a3a'; for (const [bx, by, r] of [[900, 1330, 120], [1000, 1310, 100], [820, 1340, 90]]) { x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill() }
    boomOp(x, t, { tears: 4, mood: 'sparkle', mic: [560, 780], op: [940, 1200], size: 150, sway: 1.5 })
    x.fillStyle = '#3a8a4a'; for (const [bx, by, r] of [[880, 1380, 90], [990, 1370, 80]]) { x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill() }
    recChrome(x, t, { label: 'PORCH CAM', tc0: 11800, y0: 440 })
  }

  function dessert(t) {
    const exLeave = ease.inOutCubic(prog(t, T.bye, T.bye + 1.4))
    table4(t, [
      { id: 'cancer', mood: step(t, [[76, 'happy'], [83.2, 'neutral'], [84.8, 'sparkle'], [T.last, 'happy']]), hops: [84.85, T.last + 0.05] },
      { id: 'leo', mood: step(t, [[76, 'happy'], [79, 'wink'], [81.4, 'happy']]), hops: [79.05, 79.7, T.last + 0.05] },
      { id: 'scorpio', mood: step(t, [[76, 'neutral'], [76.6, 'happy'], [T.last, 'sparkle']]), hops: [76.65, 77.3, T.last + 0.05] },
      t < T.bye + 1.4 ? { id: 'ex', mood: 'happy', look: [-1, 0], x: lerp(890, 990, exLeave), y: lerp(1020, 880, exLeave), hops: [T.bye, T.bye + 0.4] } : null,
    ], { open: t > T.bye ? ease.outCubic(prog(t, T.bye, T.bye + 0.4)) * (1 - prog(t, T.bye + 1.5, T.bye + 1.8)) : 0, pie: easeOutBack(prog(t, 76.2, 76.6), 2), plates: 4 })
    if (t > T.bye && t < T.bye + 1.6) { x.font = `900 50px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('bye!', 960, 760) }
    if (t > 84.8) sparkles(x, t, 190, 900, 84.85, 10, 180, 1, [PINK, GOLD, BONE])
    boomOp(x, t, { tears: 4, mood: 'happy', mic: [560, 640], op: [960, 520], size: 140, sway: 1.5 })
    recChrome(x, t, { tc0: 13000, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const [, , kind, arg] = shotAt(t)
      if (kind === 'cold') cold(t)
      else if (kind === 'setup') setup(t)
      else if (kind === 'booth') booth(t, arg)
      else if (kind === 'dinner') dinnerShot(t)
      else if (kind === 'porch') porchShot(t)
      else dessert(t)
      const lid = kind === 'booth' ? arg : null
      lower.update(t, { k: lid ? 1 : 0, name: lid ? `${SIGN(lid).glyph}︎ ${SIGN(lid).name}` : '', color: lid ? SIGN(lid).color : GOLD, tag: lid ? LOWER[lid] : '' })
      dots.update(t, [45.1, 47.0])
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [frozen(build, [REC]), whipZoom(WHIP0), slamTitle(HOOK), caught(CAUGHT), recordScratch(REC), ...WHIPS.map(w => whipZoom(w)), ...CH.map(c => chapter(c)), screenShake(SHAKE), glitch(GL1), glitch(GL2)]
export const CUES = [
  ['whoosh', 0.0, 0.5, 0.05], ['pop', 0.05, 392, 0.04, -0.3],
  ...whipZoomCues(WHIP0), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...WHIPS.flatMap(w => whipZoomCues(w)), ...CH.flatMap(c => chapterCues(c)), ...shakeCues(SHAKE), ...glitchCues(GL1), ...glitchCues(GL2),
  ...capCues(CAPS),
  ['glitter', 12.0, 12.4], ...[12.4, 12.7, 13.0].map(t => ['pluck', t, 1567.98, 0.025, 0.3, -0.2]),
  ...sobCues(35.6, 5, 0.42),
  ['bell', T.bell, 1318.5, 0.05, 1.0, 0.4], ['bell', T.bell + 0.3, 1046.5, 0.05, 1.2, 0.4], ['whoosh', T.exIn[0], 0.6, 0.03],
  ['tick', T.fork + 0.4, 0.08], ['pluck', T.fork + 0.42, 2093, 0.03, 0.3, -0.2], ['boom', T.gravy, 0.2],
  ...sobCues(51, 4, 0.45),
  ['whoosh', T.hug[0], 0.6, 0.03], ['glitter', T.hug[0] + 0.8, T.hug[0] + 1.3], ['bell', T.hug[0] + 0.85, 1318.5, 0.03, 1.4, 0], ...sobCues(T.hug[0] + 0.5, 5, 0.42),
  ['pop', 76.4, 880, 0.04, 0], ['glitter', 76.4, 76.8], ['bell', T.bye + 0.1, 1567.98, 0.03, 0.8, 0.4],
  ['glitter', 84.85, 85.3],
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
