// st9geminiwork (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E12: Gemini · 9 TO 5) · story 0–20.6, then
// the shared end card. The vlog parody (st9day.js) at Gemini's desk (st9geminihome.js: the corkboard now has six notes).
//   0.00  frame 0: "A Gemini explaining their *six* side hustles." The ♊ star mid-pitch at its desk, pointer up, the
//         slide "1/6 DOG WALKS" already shared on screen.
//   3.00  the deck speed-runs: 2/6 ETSY · 3/6 PODCAST · 4/6 DJ SETS · 5/6 TUTOR · 6/6 NEWSLETTER (a chart on every one).
//         "10:00 AM — standup. my *two* minutes."
//   7.10  cut to the call grid: Capricorn, Virgo, Taurus. CAPRICORN: "six? how do you have *time?*"
//         GEMINI: "i don't. i have *curiosity.*"  Taurus wakes up for it.
//  12.80  back at the desk. ★ ASTROLOGY SAYS: Gemini is the natural ruler of the 3rd house (communication, siblings, short
//         trips). On "siblings" the twin pops up behind the chair and waves.
//  16.40  the last slide: Q&A, and three hands are up. "Curious is a *superpower*." (the rhyme: same slide frame as 0.)
// Rewatch bait: slide 3's podcast is called "TWO OF ME"; Capricorn's tile has a calendar booked to 2031.
// Ghost: rises over the top of the window frame in the desk room.
import { lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawTwin } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawGeminiHome, geminiRoom, GEM } from '../../st9geminihome.js'

export const DURATION = 25
const KEY = 'G'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const INK = '#1b1236', BONE = '#efe6d6'
const GEMC = signStar('gemini'), CAPC = signStar('capricorn'), VIRC = signStar('virgo'), TAUC = signStar('taurus')
const GEMN = '♊ GEMINI', CAPN = '♑ CAPRICORN'

const T = {
  hookOut: 2.9, deck: 3.0, s1: [3.2, 6.6],
  grid: 7.1, l1: 7.45, l2: 9.95, close: 12.55, tauWake: 10.4,
  desk2: 12.8, chip: 13.0, twin: [13.6, 16.0],
  qa: 16.4, hands: [16.6, 16.85, 17.1], last: 16.6, lastLand: 16.95, out: [20.2, 20.55],
  ghost: 4.3,
}
const SLIDES = [
  { n: '1/6', title: 'DOG WALKS', sub: '3 dogs · 1 me' }, { n: '2/6', title: 'ETSY SHOP', sub: 'earrings (pairs only)' },
  { n: '3/6', title: 'PODCAST', sub: '“TWO OF ME” · ep 1' }, { n: '4/6', title: 'DJ SETS', sub: 'weddings + bar mitzvahs' },
  { n: '5/6', title: 'TUTORING', sub: 'italian · i’m learning too' }, { n: '6/6', title: 'NEWSLETTER', sub: '12 subscribers (all friends)' },
]
const slideAt = i => i === 0 ? -1 : T.deck + (i - 1) * 0.8
const LINES = [
  { t: T.l1, speaker: CAPN, text: 'six? how do you have *time?*', color: '#2fc79a' },
  { t: T.l2, speaker: GEMN, text: 'i don’t. i have *curiosity.*', color: GEM.yellow },
]
const CPS = 28
const GEM_HOPS = [T.deck + 0.05, ...talkHops(LINES, GEMN, { cps: CPS }), T.lastLand, ...SLIDES.map((_, i) => slideAt(i) + 0.03).filter(v => v > 0)]
const CAP_HOPS = talkHops(LINES, CAPN, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 900, y: 696, where: 'rising over the top of the desk room’s window frame' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "800 56px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Gemini explaining their *six* side hustles.', at: 0, out: T.hookOut, top: 270 })
  const caps = [stampCaption(root, { at: T.s1[0], out: T.s1[1], time: '10:00 AM', text: 'standup. my *two* minutes.', accentColor: GEM.yellow })]
  const box = dialogueBox(root, { lines: LINES, y: 1490, width: 960, height: 250, close: T.close, cps: CPS })
  const last = popText(root, 'Curious is a | *superpower.*', { top: 330, size: 108, accentSize: 160, at: T.last, gap: 0.08, accentColor: GEM.yellow, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = Math.round
  function rect(xx, y, w, h, c) { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  function txt(s, xx, y, font, c, align = 'center') { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }

  /** the shared slide, a pixel window: title bar, slide number, title, subtitle and a little chart that goes up */
  function slide(t, cx, cy, w, h, i, k, flipT) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    const fl = flipT != null ? prog(t, flipT, flipT + 0.2) : 1
    rect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, INK); rect(-w / 2, -h / 2, w, h, BONE)
    rect(-w / 2, -h / 2, w, 44, GEM.lilac); txt('SIDE_HUSTLES_final_v6.ppt', -w / 2 + 18, -h / 2 + 23, "700 20px 'Space Mono', monospace", INK, 'left')
    for (let d = 0; d < 3; d++) rect(w / 2 - 30 - d * 26, -h / 2 + 15, 14, 14, ['#ff5d73', '#f2c75c', '#6fdc6a'][d])
    x.save(); x.scale(1, Math.max(0.05, ease.outBack(fl)));
    if (i === 'qa') {
      txt('Q & A', 0, -20, "800 92px Inter", INK)
      txt('any questions?', 0, 70, "700 26px 'Space Mono', monospace", '#5a4c8a')
    } else {
      const S = SLIDES[i]
      txt(S.n, -w / 2 + 30, -h / 2 + 80, "700 26px 'Space Mono', monospace", '#8a7fa8', 'left')
      txt(S.title, -w / 2 + 30, -h / 2 + 140, "800 58px Inter", INK, 'left')
      txt(S.sub, -w / 2 + 32, -h / 2 + 196, "700 22px 'Space Mono', monospace", '#5a4c8a', 'left')
      const g = prog(t, Math.max(0, flipT ?? 0), (flipT ?? 0) + 0.6)
      for (let b = 0; b < 5; b++) {
        const bh = (24 + b * 22) * (flipT == null ? 1 : ease.outCubic(g))
        rect(-w / 2 + 34 + b * 52, h / 2 - 30 - bh, 36, bh, [GEM.mint, GEM.yellow, GEM.pink, GEM.lilac, GEM.mint][b])
      }
      rect(-w / 2 + 26, h / 2 - 28, 280, 4, INK)
      txt('↗', -w / 2 + 330, h / 2 - 90, "800 64px Inter", '#2fae6a')
    }
    x.restore(); x.restore()
  }
  /** one video-call tile with a star in it */
  function tile(t, cx, cy, w, h, name, draw, k = 1, talking = false) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    rect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, talking ? '#6fdc6a' : INK); rect(-w / 2, -h / 2, w, h, '#1c1840')
    x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip(); draw(); x.restore()
    rect(-w / 2 + 10, h / 2 - 42, Math.min(w - 20, name.length * 15 + 24), 32, 'rgba(10,6,28,0.8)')
    txt(name, -w / 2 + 22, h / 2 - 26, "700 20px 'Space Mono', monospace", BONE, 'left')
    x.restore()
  }
  function hand(cx, cy, k) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    const H = ['.k.k.k.', '.k.k.k.k', '.kkkkkk.', 'kkkkkkk.', '.kkkkk..', '..kkkk..']
    H.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'k') { rect(-24 + i * 7 - 2, -22 + j * 7 - 2, 11, 11, INK) } }))
    H.forEach((row, j) => [...row].forEach((c, i) => { if (c === 'k') rect(-24 + i * 7, -22 + j * 7, 7, 7, '#ffd98a') }))
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const inGrid = t >= T.grid && t < T.desk2
      const hour = 10 + prog(t, 0, STORY_END) * 0.3
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour })
      const L = geminiRoom('desk')
      const z = inGrid ? 1 : 1 + 0.05 * (1 - ease.outCubic(prog(t, t < T.grid ? T.deck : T.desk2, (t < T.grid ? T.deck : T.desk2) + 0.5)))
      x.save(); x.translate(540, 1000); x.scale(z, z); x.translate(-540, -1000)
      drawGeminiHome(x, t, { room: 'desk', ep: 'work', hour })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 3 })
      const [cx, cy] = L.spots.chair
      if (!inGrid) {
        const tw = prog(t, ...T.twin), twk = tw > 0 && tw < 1 ? easeOutBack(prog(t, T.twin[0], T.twin[0] + 0.35), 2) * (1 - ease.inCubic(prog(t, T.twin[1] - 0.3, T.twin[1]))) : 0
        if (twk > 0) drawTwin(x, cx + 250, cy - 40 - 60 * twk, 190, t, { mood: 'wink', look: [-1, 0], pop: twk, seed: 9, hops: [T.twin[0] + 0.4, T.twin[0] + 1.1, T.twin[0] + 1.8] })
        const mood = t < T.deck ? 'sparkle' : t < T.grid ? 'happy' : t < T.qa ? 'wink' : 'heart'
        drawStarChar(x, cx, cy - 30, 250, t, { ...GEMC, mood, look: [1, -1], seed: 3, hops: GEM_HOPS })
        // the pointer: a little stick it waves at the slide
        const a = 0.75 + 0.12 * Math.sin(t * 5)
        x.save(); x.translate(cx + 100, cy - 40); x.rotate(a); rect(-5, -150, 12, 150, INK); rect(-2, -146, 6, 142, GEM.wood); rect(-6, -160, 14, 14, '#ff3d6e'); x.restore()
      }
      x.restore()
      if (!inGrid) {
        // the shared slide, top right
        const k = t < T.desk2 ? 1 : pop01(t, T.desk2 + 0.05, 0.3, 2)
        if (t < T.qa) {
          let i = 0; for (let j = 0; j < SLIDES.length; j++) if (t >= slideAt(j)) i = j
          if (t >= T.desk2) i = 5
          slide(t, 740, 860, 560, 340, i, k, i === 0 || t >= T.desk2 ? null : slideAt(i))
        } else {
          slide(t, 740, 860, 560, 340, 'qa', 1, T.qa)
          T.hands.forEach((h, j) => hand(600 + j * 140, 1080, 1.7 * easeOutBack(prog(t, h, h + 0.3), 2.4)))
        }
      } else {
        // the call grid: four tiles on a dark call window
        rect(54, 540, 972, 860, INK); rect(60, 546, 960, 848, '#0e0b26')
        txt('● STANDUP · 4 PEOPLE', 90, 580, "700 22px 'Space Mono', monospace", '#ff5d73', 'left')
        const W2 = 450, H2 = 360
        const enter = j => easeOutBack(prog(t, T.grid + j * 0.06, T.grid + j * 0.06 + 0.3), 2)
        const capT = t >= T.l1 && t < T.l2, gemT = t >= T.l2
        tile(t, 300, 820, W2, H2, '♊ gemini (sharing)', () => drawStarChar(x, 0, 30, 220, t, { ...GEMC, mood: t < T.l2 ? 'neutral' : 'sparkle', seed: 3, hops: GEM_HOPS }), enter(0), gemT)
        tile(t, 780, 820, W2, H2, '♑ capricorn', () => {
          drawStarChar(x, 0, 30, 220, t, { ...CAPC, mood: t < T.l2 + 1 ? 'squint' : 'wide', look: [-1, 0], seed: 5, hops: CAP_HOPS })
          // the calendar behind it: booked to 2031
          rect(120, -150, 90, 80, BONE); rect(120, -150, 90, 18, '#2fc79a'); txt('2031', 165, -100, "700 18px 'Space Mono', monospace", INK)
        }, enter(1), capT)
        tile(t, 300, 1200, W2, H2, '♍ virgo', () => {
          drawStarChar(x, -40, 30, 200, t, { ...VIRC, mood: 'squint', look: [1, 1], seed: 6 })
          rect(80, 10, 100, 120, BONE); for (let r = 0; r < 4; r++) rect(92, 30 + r * 24, 76 * ((((t * 2 + r) % 4) + 1) / 4), 6, '#5a4c8a')   // taking notes
        }, enter(2))
        tile(t, 780, 1200, W2, H2, '♉ taurus', () => drawStarChar(x, 0, 30, 200, t, { ...TAUC, mood: t < T.tauWake ? 'sleepy' : 'wide', blink: t < T.tauWake ? undefined : false, seed: 8, hops: [T.tauWake] }), enter(3))
      }
      factChip(x, t, { label: '★ ASTROLOGY SAYS', text: 'Gemini is the natural ruler of the 3rd house: communication, siblings, short trips.', at: T.chip, dur: 3.2, x: 540, y: 290, color: GEM.yellow })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawClock(x, t, { from: '10:00', to: '10:16', at: 0, dur: STORY_END - 0.6, ampm: 'AM', sign: 'gemini' })
      drawRecFrame(x, t, { battery: 0.7 - 0.15 * prog(t, 0, STORY_END) })
      for (const c of [T.grid, T.desk2]) { const p = prog(t, c - 0.02, c + 0.16); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 0.5 * (1 - p); x.fillStyle = '#fff'; x.fillRect(0, 0, 1080, 1920); x.restore() } }
      hook.update(t)
      for (const c of caps) c.update(t)
      box.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.grid, kind: 'flip' }, { t: T.desk2, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E12' }), cardCuts(CUTS)]

const NOTE = [783.99, 880, 987.77, 1174.66, 1318.51, 1567.98]
const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...clockCues(0, STORY_END - 0.6, { gain: 0.01 }),
  ...SLIDES.slice(1).map((_, i) => ['whoosh', r3(slideAt(i + 1) - 0.04), 0.18, 0.02]),
  ...SLIDES.slice(1).map((_, i) => ['pop', r3(slideAt(i + 1) + 0.1), NOTE[i % NOTE.length], 0.035, 0.3]),
  ...stampCues(T.s1[0]),
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.grid - 0.08, 0.35, 0.03], ...[0, 1, 2, 3].map(j => ['pop', r3(T.grid + j * 0.06 + 0.05), NOTE[j], 0.03, j % 2 ? 0.3 : -0.3]),
  ...talkCues(LINES, { cps: CPS, pitch: { [CAPN]: 523, [GEMN]: 988 } }),
  ['pluck', T.tauWake, 1174.66, 0.04, 0.5, 0.3], ['tick', T.tauWake, 0.04],
  ['whoosh', T.desk2 - 0.08, 0.35, 0.03],
  ...factChipCues(T.chip, { dur: 3.2 }),
  ['pop', T.twin[0] + 0.05, 1318.51, 0.04, 0.3], ['bell', T.twin[0] + 0.1, 1975.53, 0.02, 0.8, 0.3],
  ['whoosh', T.qa - 0.05, 0.25, 0.025], ...T.hands.map((h, j) => ['pop', r3(h + 0.05), NOTE[2 + j], 0.035, (j - 1) * 0.3]),
  ['pop', T.last, 987.77, 0.03, 0], ['pop', T.last + 0.08, 1174.66, 0.03, 0], ['pop', T.lastLand, 1567.98, 0.05, 0], ['pluck', T.lastLand, 1567.98, 0.04, 0.6, 0],
  ['whoosh', T.out[0], 0.3, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
