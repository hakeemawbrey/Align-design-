// st9arieslove (30 s vertical, Star Talk season 9 "A Day in the Life", S9 E03, DATE NIGHT) · story 0–25.6, then the end card.
//   "How an Aries flirts: a *speedrun.*"  On the window seat at dusk, Aries texts Libra three lines with a speedrun timer
//   running: asked out in 4.00 s flat (WORLD RECORD). Then Libra is typing… for forty minutes. Aries will *not* double-text;
//   it waits (season 6 canon: it waited forty minutes while Libra picked dinner). "you pick. i'll wait :)". Friday, the date:
//   the same window seat, Libra beside it. "you're so… *direct.*" "ruled by Mars. it's in my *chart.*" Fact chip: Aries is
//   ruled by Mars, named for the Roman god of war. "so i brought you a *rose.*" Last shot = frame 0's framing: alone on
//   the seat, Libra texts "home safe. again soon?" and the timer stops at 0.65 s.   "Bold is *sweet*, actually."
//   Rewatch bait: Libra's chat shows three dinner options, then picks the first one. Ghost: on the sill, outside the glass.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockTrack, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, speechBubble, speechCues, phoneScreen, phoneCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawAriesHome } from '../../st9arieshome.js'

export const DURATION = 30
const KEY = 'Gm'
const STORY_END = DURATION - ENDCARD_LEN         // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', MINT = '#7dffb0', PINK = '#ff8fb1'
const AR = signStar('aries'), LI = signStar('libra')
const MONO = "'Space Mono', monospace"

const T = {
  hookOut: 2.75, sent: 4.0, wait: 6.8, date: 13.2, fact: 17.6, rose: 19.2, after: 21.0, reply: 21.9,
  ghost: 8.2, last: 22.7, lastOut: [25.0, 25.25], fade: [25.2, 25.6],
}
const CUTS = [T.date, T.after]
const PUNCH = [{ at: T.wait + 0.2, out: 9.0, zoom: 1.3, x: 330, y: 1000 }]
const CLOCK = [
  { at: 0, from: '6:30 PM' },
  { at: T.wait, dur: 1.2, from: '6:30 PM', to: '7:10 PM' },
  { at: T.date, from: '7:00 PM' },
  { at: T.after, from: '11:42 PM' },
]
const CHAT = [
  { from: 'me', text: 'hey libra', at: -1 },
  { from: 'me', text: 'dinner friday?', at: 1.25 },
  { from: 'me', text: '7pm. i’ll drive.', at: 3.9 },
  { from: 'Libra', text: 'yes!! wait. italian? thai? both?', at: 9.4, typing: 4.6 },
  { from: 'me', text: 'you pick. i’ll wait :)', at: 10.6 },
  { from: 'Libra', text: 'ok thai. no, italian. ok… thai.', at: 11.9, typing: 11.0 },
]
const CHAT2 = [
  { from: 'Libra', text: 'home safe. again soon?', at: 21.25, typing: 20.9 },
  { from: 'me', text: 'yes.', at: T.reply },
]
const SAY = [
  { text: 'i will *not* double-text.', at: 7.0, out: 8.85, who: 'aries' },
  { text: 'you’re so… *direct.*', at: 15.4, out: 17.15, who: 'libra' },
  { text: 'ruled by Mars. it’s in my *chart.*', at: 17.3, out: 19.05, who: 'aries' },
  { text: 'so i brought you a *rose.*', at: 19.2, out: 20.85, who: 'aries' },
]
const STAMPS = [
  { at: 4.25, out: T.wait - 0.1, time: '6:30 PM', text: 'asked in *four* seconds' },
  { at: 9.0, out: T.date - 0.15, time: '7:10 PM', text: '*waited* forty minutes' },
  { at: T.date + 0.25, out: 15.3, time: 'FRI 7:00 PM', text: 'date *night*' },
]
const FACT = { text: 'Aries is ruled by Mars, named for the Roman god of war.', at: T.fact, dur: 2.6, y: 1694, label: '★ ASTROLOGY SAYS' }
export const GHOST = { at: T.ghost, x: 900, y: 1010, where: 'peeking in at the right end of the window sill, outside the glass, window seat' }

const ROSE = ['..RR..', '.RrRR.', 'RRrrRR', '.RRRR.', '..GG..', 'L.G...', 'LLG...', '..G.LL', '..GLL.', '..G...']
const ROSE_C = { R: '#e8304a', r: '#ff7a8a', G: '#3f9a4a', L: '#6cc25a' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

/** the ask-out speedrun timer (floor, left) */
function timerHUD(x, t) {
  const second = t >= T.after
  const t0 = second ? CHAT2[0].at : -0.0, stop = second ? T.reply : T.sent
  const vis = t < T.wait + 0.3 ? 1 - prog(t, T.wait, T.wait + 0.3) : second ? prog(t, T.after, T.after + 0.2) * (1 - prog(t, T.last - 0.1, T.last + 0.2)) : 0
  if (vis <= 0) return
  const el = clamp(t - t0, 0, stop - t0), done = t >= stop
  const x0 = 66, y0 = 1250, w = 420
  x.save(); x.globalAlpha = vis
  x.fillStyle = 'rgba(10,6,24,0.84)'; x.fillRect(x0, y0, w, 118); x.fillStyle = '#ff5a3c'; x.fillRect(x0, y0, w, 6)
  x.font = `700 20px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = '#ffb199'
  x.fillText(second ? 'REPLY% · ANY%' : 'ASK-OUT% · ANY%', x0 + 16, y0 + 28)
  x.font = `700 46px ${MONO}`; x.fillStyle = done ? (Math.floor(t * 4) % 2 ? GOLD : '#ffffff') : MINT
  x.fillText(`00:${el.toFixed(2).padStart(5, '0')}`, x0 + 16, y0 + 78)
  if (done) { x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.fillStyle = GOLD; x.fillText(second ? 'PB!' : 'WORLD RECORD', x0 + w - 14, y0 + 30) }
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'", "500 26px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'How an Aries flirts: | a *speedrun.*', out: T.hookOut, accentColor: GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, top: 1560 }))
  const last = popText(root, 'Bold is *sweet,* | actually.', { top: 290, size: 112, accentSize: 150, lineHeight: 1.2, at: T.last, gap: 0.09, accentColor: GOLD, wobble: true, late: 0, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 820)
    g.addColorStop(0, `rgba(10,6,24,${0.7 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 820)
  }
  function hearts(t, cx, cy, t0, t1) {
    for (let i = 0; i < 5; i++) for (let b = t0 + i * 0.31; b < t1; b += 1.55) {
      if (t < b || t > b + 1.3) continue
      const p = (t - b) / 1.3
      drawBits(x, HEART, HEART_C, Math.round(cx + ((i * 47) % 160) - 80 + Math.sin(p * 6 + i) * 10), Math.round(cy - p * 150), 5, { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ck = clockTrack(t, CLOCK)
      const date = t >= T.date && t < T.after
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: date ? 19.4 : t >= T.after ? 23.7 : lerp(18.4, 19.1, prog(t, T.wait, T.wait + 1.2)) })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      const g = drawAriesHome(x, t, { room: 'window', ep: 3 })
      if (date && t > T.fact - 0.3) {                                 // Mars, a small red point in the window
        const k = prog(t, T.fact - 0.3, T.fact + 0.3)
        x.save(); x.globalAlpha = k; x.fillStyle = '#ff6a4a'; x.shadowColor = '#ff6a4a'; x.shadowBlur = 16; x.fillRect(756, 520, 10, 10); x.restore()
      }
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'right', cell: 3 })
      // the cast
      if (!date) {
        const waiting = t >= T.wait && t < T.date
        const mood = t < T.sent ? 'squint' : t < T.wait ? 'sparkle' : waiting ? (t < 9.4 ? 'neutral' : 'happy') : (t > T.reply ? 'heart' : 'happy')
        const hops = waiting ? Array.from({ length: 10 }, (_, i) => T.wait + 0.2 + i * 0.45) : t < T.sent ? [0.3, 1.25, 2.6, 3.9] : [T.sent + 0.05, T.reply]
        drawStarChar(x, 330, 1000, 300, t, { color: AR.color, glyph: AR.glyph, mood, look: [1, 0.4], hops, seed: 9, bob: waiting ? 2 : undefined })
        if (t >= T.after && t > T.reply) hearts(t, 330, 860, T.reply, T.last + 2)
      } else {
        drawStarChar(x, 360, 1010, 280, t, { color: LI.color, glyph: LI.glyph, mood: t > T.rose + 0.3 ? 'heart' : t > 15.4 ? 'sparkle' : 'happy', look: [1, 0], hops: [T.date + 0.3, 15.4, 16.2, T.rose + 0.35], seed: 21 })
        const r = drawStarChar(x, 720, 1000, 300, t, { color: AR.color, glyph: AR.glyph, mood: t < T.rose ? 'happy' : 'sparkle', look: [-1, 0], hops: [17.3, 18.0, T.rose, T.rose + 0.6], seed: 9 })
        if (t > T.rose) {
          const k = ease.outBack ? clamp((t - T.rose) / 0.3) : 1
          drawBits(x, ROSE, ROSE_C, Math.round(lerp(r.x - 60, r.x - 150, ease.outCubic(k))), Math.round(r.y - 20), 9)
          hearts(t, 360, 860, T.rose + 0.3, T.after)
        }
      }
      // the phone
      if (!date) {
        const k = t < T.after ? 1 : ease.outCubic(prog(t, T.after, T.after + 0.25))
        phoneScreen(x, t, { x: 790, y: 1150, w: 420, h: 720, app: 'chat', title: 'Libra', lines: t < T.after ? CHAT : CHAT2, clock: t < T.after ? (t < T.wait + 1.2 ? '6:30' : '7:10') : '11:42', pop: k, rot: 0.04, accent: '#ff6a4a', size: 32 })
      }
      x.restore()

      topScrim(t)
      drawClock(x, t, { ...ck, sign: 'aries' })
      timerHUD(x, t)
      for (const s of SAY) {
        const ali = s.who === 'aries'
        speechBubble(x, t, { ...s, x: date ? (ali ? 720 : 360) : 330, y: 850, name: ali ? '♈ ARIES' : '♎ LIBRA', color: ali ? AR.color : LI.color, side: date ? (ali ? 0.4 : -0.4) : 0.3 })
      }
      factChip(x, t, FACT)
      drawRecFrame(x, t, { battery: 0.6 })
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.5 * cam.flash; x.fillStyle = '#fff6ea'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) drawSky(ex, t, SKY_H)
      hook.update(t)
      for (const s of stamps) s.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [{ t: T.date, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E03' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...Array.from({ length: 16 }, (_, i) => ['tick', r3(0.1 + i * 0.24), 0.018]),        // thumbs typing
  ...phoneCues(CHAT.filter(l => l.at > 0)), ...phoneCues(CHAT2),
  ['bell', T.sent, 1567.98, 0.04, 1.2, 0], ['glitter', T.sent, T.sent + 0.6], ['pop', T.sent + 0.05, 2093, 0.04, 0],
  ...SAY.flatMap(s => speechCues(s.at, { pitch: s.who === 'aries' ? 880 : 1174.66 })),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ...CLOCK.slice(1, 2).flatMap(c => clockCues(c.at, c.dur)),
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.wait + 0.3 + i * 0.45), 0.03]),  // the foot-tap
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.date + 0.3, 1567.98, 0.04, -0.3], ['bell', T.date + 0.35, 1318.51, 0.03, 1.4, -0.3],   // the doorbell
  ...factChipCues(FACT.at, FACT),
  ['pluck', T.rose, 1174.66, 0.05, 0.8, 0.2], ['glitter', T.rose, T.rose + 0.7], ['bell', T.rose + 0.3, 1760, 0.03, 1.2, -0.2],
  ['bell', T.reply + 0.02, 2093, 0.035, 1.0, 0], ['glitter', T.reply, T.reply + 0.5],
  ...[0, 0.09, 0.18, 0.27].map((d, i) => ['pop', r3(T.last + d), [783.99, 880, 1174.66, 1046.5][i], 0.04, 0]), ['pluck', T.last + 0.2, 1174.66, 0.04, 0.7, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
