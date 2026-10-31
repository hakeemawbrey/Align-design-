// st12finale (30 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E35, the season finale) · story 0–25.6, then
// the shared end card ("SIGN UP TO VOTE YOUR CITY").
//   0.00   🔥 HOT TAKE "Your city doesn't decide your love life. *You* do."  A rooftop at sunset: the Houston star, mid-smirk,
//          front and centre; behind it every city star (ATX, DAL, SA, NYC, LA, MIA, CHI, ATL) and, on the railing, the
//          whole zodiac. Heat: 5 flames.
//   2.60   OBJECTION! (record scratch) Every city star hops at once and argues for its town, bubble after bubble:
//          "live music capital!" · "brunch is a sport!" · "River Walk dates!" · "city that never sleeps!" ·
//          "sunsets every night!" · "beach dates!" · "the lakefront!" · "peach state charm!"
//   9.30   HOUSTON: "so… vote for *yours.*"
//  11.95   card cut → the season 4 city-vote map callback: the outline draws on, then the cities light up one by one
//          (a little star lands on each), then all of them pulse together. Chyron: "THE CITY VOTE · STILL OPEN".
//  17.25   THE STARS RULE: "love happens wherever people are brave and kind. vote for the city you want next."
//  20.55   🔥 AGREE · 🧊 DISAGREE?
//  21.05   back on the rooftop: "Your city. Your *vote*. | Your story."  The frame-0 framing again, changed: the Houston star
//          beams instead of smirking and every star behind it holds up a tiny glowing ballot-star.
// Rewatch bait: the zodiac on the railing does a slow wave left-to-right during the map, and Virgo straightens the line
//          of ballot-stars at the end.
// One canvas (sky + rooftop + cast / the map + sthot devices), DOM type, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues, cityStar, loadHotFonts, objectionShake, slamShake } from '../../sthot.js'

export const DURATION = 30
export const KEY = 'Dm'
const NUMERAL = 'S12 E35'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', CYAN = '#8fd8f6'
const W = 1080
const MONO = "'Space Mono', ui-monospace, monospace"

const T = {
  takeOut: [2.42, 2.62],
  obj: 2.6, bubbles: 2.9, bubbleGap: 0.62, bubbleHold: 1.6,
  open: 9.15, l1: 9.3, close: 11.75,
  mapCut: 11.95, mapIn: 12.0, draw: [12.05, 13.3], light: 13.4, lightGap: 0.36, wave: [16.6, 17.4], chyron: 12.4,
  verdict: 17.25, verdictOut: [21.6, 21.8],
  pill: 21.3, pillDur: 0.6,
  backCut: 21.85, back: 21.9, last: 21.95, lastLand: 22.4, ballots: 22.5, out: [25.3, 25.58],
}
const HOU = 'HOUSTON STAR'
const LINES = [{ t: T.l1, speaker: HOU, text: 'so… vote for *yours.*', color: GOLD }]
const CPS = 24
const HEAT = 5, PICK = 'agree'
const VERDICT = 'love happens wherever people are | brave and kind. vote for the city | you want *next.*'

// the city stars on the rooftop (back row) + what each one argues
const CREW = [
  { c: 'ATX', x: 120, y: 1000, say: 'live music capital!' },
  { c: 'DAL', x: 245, y: 960, say: 'brunch is a sport!' },
  { c: 'SA', x: 370, y: 1000, say: 'River Walk dates!' },
  { c: 'NYC', x: 495, y: 950, say: 'city that never sleeps!' },
  { c: 'LA', x: 620, y: 1000, say: 'sunsets every night!' },
  { c: 'MIA', x: 745, y: 960, say: 'beach dates!' },
  { c: 'CHI', x: 870, y: 1000, say: 'the lakefront!' },
  { c: 'ATL', x: 975, y: 950, say: 'peach state charm!' },
]
const SAY_ORDER = [3, 0, 5, 2, 7, 1, 4, 6]       // who talks when (alternating sides so it reads as a crowd)
const sayAt = i => T.bubbles + SAY_ORDER.indexOf(i) * T.bubbleGap

// ── the map (a stylised lower-48 outline, as in st4map / votemap: lon/lat → px, not exact geography)
const MAP = { cx: 540, cy: 1010, k: 15.6, ky: 25.5, lon0: -96, lat0: 38 }
const P = (lon, lat) => ({ x: MAP.cx + (lon - MAP.lon0) * MAP.k, y: MAP.cy + (MAP.lat0 - lat) * MAP.ky })
const OUTLINE = [
  [-124.7, 48.4], [-123, 49], [-95.2, 49], [-95, 49.4], [-89.6, 48], [-84.8, 46.6], [-84.2, 45.8], [-82.4, 43.2], [-82.7, 41.7], [-79, 42.9],
  [-79, 43.4], [-76.4, 44.2], [-74.7, 45], [-71.5, 45], [-70.2, 46.9], [-69.2, 47.4], [-67.8, 47], [-67, 44.8], [-70.2, 43.6], [-70.8, 42.6],
  [-70, 41.8], [-71.8, 41.3], [-74, 40.6], [-74, 39.4], [-75.4, 38.6], [-76, 37], [-75.5, 35.3], [-77.9, 34], [-79.2, 33.2], [-81, 32],
  [-81.4, 30.5], [-80.5, 28.5], [-80.1, 26.5], [-80.4, 25.2], [-81.2, 25.3], [-81.8, 26.7], [-82.7, 28], [-82.8, 29.2], [-84, 30.1], [-85.4, 29.7],
  [-86.5, 30.4], [-88, 30.5], [-89.5, 30.2], [-89.3, 29.1], [-90.5, 29.2], [-92, 29.6], [-93.8, 29.7], [-94.8, 29.3], [-96.5, 28.3], [-97.4, 27.3],
  [-97.2, 25.9], [-99.1, 26.5], [-99.6, 27.6], [-101.4, 29.8], [-103, 29], [-104.5, 29.7], [-106.5, 31.8], [-108.2, 31.8], [-108.2, 31.3], [-111, 31.3],
  [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.7, 39], [-124.2, 40.4], [-124.2, 42], [-124, 46.3], [-124.7, 48.4],
].map(([lo, la]) => P(lo, la))
const SEG = (() => { const a = [0]; for (let i = 1; i < OUTLINE.length; i++) a.push(a[i - 1] + Math.hypot(OUTLINE[i].x - OUTLINE[i - 1].x, OUTLINE[i].y - OUTLINE[i - 1].y)); return a })()
const TEXAS = [
  [-106.6, 32.0], [-103.05, 32.0], [-103.05, 36.5], [-100, 36.5], [-100, 34.56], [-98.5, 34.1], [-97.1, 33.8], [-95.6, 33.9], [-94.05, 33.55],
  [-94.05, 31.0], [-93.8, 29.7], [-94.8, 29.3], [-96.5, 28.3], [-97.4, 27.3], [-97.2, 25.9], [-99.1, 26.5], [-99.6, 27.6], [-101.4, 29.8],
  [-103, 29], [-104.5, 29.7], [-106.6, 32.0],
].map(([lo, la]) => P(lo, la))
// the nine pins (label offsets lx/ly); Texas pins get labels pushed outward so the cluster stays readable
const PINS = [
  { n: 'LA', p: P(-118.2, 34.05), lx: 0, ly: 44, col: PINK },
  { n: 'CHI', p: P(-87.6, 41.9), lx: 0, ly: -40, col: CYAN },
  { n: 'NYC', p: P(-74, 40.7), lx: -10, ly: -42, col: '#c9a6ff' },
  { n: 'ATL', p: P(-84.4, 33.75), lx: 62, ly: -6, col: '#ff9f6b' },
  { n: 'MIA', p: P(-80.2, 25.8), lx: -66, ly: 6, col: '#3fd8c8' },
  { n: 'DAL', p: P(-96.8, 32.8), lx: 18, ly: -40, col: '#7fa8ff' },
  { n: 'SA', p: P(-98.5, 29.4), lx: -62, ly: 26, col: '#ffb36a' },
  { n: 'ATX', p: P(-97.7, 30.3), lx: -76, ly: -16, col: '#3fc8c0' },
  { n: 'HOU', p: P(-95.4, 29.8), lx: 70, ly: 12, col: GOLD },
]
const pinAt = i => T.light + i * T.lightGap

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

async function build(stage) {
  await loadHotFonts()
  try { await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const take = hotStamp(root, { take: "Your city doesn't decide your love life. *You* do.", at: 0, out: T.takeOut, accentColor: GOLD })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 230, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const LAST = popText(root, 'Your city. | Your *vote*. | Your story.', { top: 190, size: 104, accentSize: 150, fit: true, at: T.last, gap: 0.12, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const ov = layerCanvas(root), ox = ov.getContext('2d')            // the overlay canvas: meter, objection, pill
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const HOU_HOPS = [0.3, ...talkHops(LINES, HOU, { cps: CPS }), T.lastLand]

  function sunset(t) {
    const g = x.createLinearGradient(0, 300, 0, 1100)
    g.addColorStop(0, 'rgba(110,60,190,0)'); g.addColorStop(0.55, 'rgba(255,100,140,0.35)'); g.addColorStop(1, 'rgba(255,175,90,0.6)')
    x.fillStyle = g; x.fillRect(0, 300, W, 800)
    const cx = 540, cy = 900
    for (let j = -10; j <= 2; j++) {
      if (j % 3 === -1) continue
      const w = Math.round(Math.sqrt(Math.max(0, 121 - j * j))) * 14
      x.fillStyle = j > -3 ? '#ff7a6a' : '#ffbf6a'; x.fillRect(cx - w, cy + j * 14, w * 2, 14)
    }
  }
  function skyline() {
    // a generic Houston-ish downtown silhouette behind the roof (no real buildings)
    const B = [[40, 120, 230], [170, 90, 300], [270, 120, 260], [400, 70, 380], [480, 110, 320], [600, 80, 420], [690, 120, 290], [820, 90, 340], [920, 130, 250]]
    for (const [bx, bw, bh] of B) {
      x.fillStyle = '#1a1340'; x.fillRect(bx, 1060 - bh, bw, bh)
      for (let wy = 1060 - bh + 20; wy < 1050; wy += 34) for (let wx = bx + 12; wx < bx + bw - 16; wx += 26) {
        if (((wx * 13 + wy * 7) | 0) % 4 === 0) continue
        x.fillStyle = 'rgba(255,217,138,0.4)'; x.fillRect(wx, wy, 10, 14)
      }
    }
  }
  function roof(t) {
    x.fillStyle = '#140c2c'; x.fillRect(0, 1060, W, 900)
    x.fillStyle = '#241a50'; x.fillRect(0, 1060, W, 18)
    // roof tiles + a warm sunset bounce on the deck
    for (let i = 0; i < 12; i++) for (let j = 0; j < 9; j++) { x.fillStyle = (i + j) % 2 ? '#1a1238' : '#201646'; x.fillRect(i * 90, 1078 + j * 96, 90, 96) }
    const bg = x.createLinearGradient(0, 1078, 0, 1500); bg.addColorStop(0, 'rgba(255,140,100,0.22)'); bg.addColorStop(1, 'rgba(255,140,100,0)'); x.fillStyle = bg; x.fillRect(0, 1078, W, 422)
    // the railing the zodiac sits on
    x.fillStyle = '#5a5470'; x.fillRect(0, 840, W, 8)
    for (let xx = 20; xx < W; xx += 90) x.fillRect(xx, 840, 6, 220)
    // string lights
    x.strokeStyle = '#0b0820'; x.lineWidth = 3; x.beginPath()
    for (let xx = -20; xx <= 1100; xx += 20) { const u = (xx + 20) / 1120, y = 680 + 60 * 4 * u * (1 - u); xx === -20 ? x.moveTo(xx, y) : x.lineTo(xx, y) }
    x.stroke()
    for (let i = 0; i < 14; i++) {
      const xx = 10 + i * 80, u = (xx + 20) / 1120, y = 680 + 60 * 4 * u * (1 - u), tw = 0.6 + 0.4 * Math.sin(t * 2.4 + i * 1.7)
      x.fillStyle = `rgba(255,217,138,${0.5 + 0.5 * tw})`; x.fillRect(xx - 6, y + 4, 12, 14)
    }
  }
  function zodiacRow(t, ballots) {
    for (let i = 0; i < 12; i++) {
      const s = SIGNS[i], zx = 50 + i * 89, zy = 800
      const wave = Math.max(0, Math.sin((t - T.wave[0]) * 6 - i * 0.5)) * (t > T.wave[0] && t < T.wave[1] + 1 ? 1 : 0)
      const hop = t > T.obj && t < T.obj + 0.5 ? [T.obj + (i % 3) * 0.06] : []
      const r = drawStarChar(x, zx, zy - wave * 20, 78, t, { color: s.color, glyph: null, mood: ballots ? 'happy' : t > T.obj && t < T.l1 ? 'wide' : 'happy', look: [0, 0], seed: 20 + i, glow: 0.6, hops: hop })
      if (ballots) ballotStar(r.x, r.top - 18, 0.6, t, i, s.id === 'virgo')
    }
  }
  function ballotStar(cx, cy, k, t, i, straighten = false) {
    const p = pop01(t, T.ballots + (i % 6) * 0.05, 0.3)
    if (p <= 0) return
    const tilt = straighten ? 0 : Math.sin(i * 2.3) * 0.25 * (1 - prog(t, 23.6, 23.9) * (i % 2))
    x.save(); x.translate(cx, cy); x.rotate(tilt); x.scale(p * k, p * k)
    x.fillStyle = INK; x.fillRect(-4, 0, 8, 46)
    x.fillStyle = rgba(GOLD, 0.35); x.beginPath(); x.arc(0, -10, 34, 0, Math.PI * 2); x.fill()
    x.fillStyle = GOLD
    x.beginPath()
    for (let k2 = 0; k2 < 10; k2++) { const a = -Math.PI / 2 + k2 * Math.PI / 5, rr = k2 % 2 ? 9 : 22; x.lineTo(Math.cos(a) * rr, -10 + Math.sin(a) * rr) }
    x.closePath(); x.fill()
    x.restore()
  }
  function bubble(cx, cy, text, k) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 30px ${MONO}`
    const w = Math.max(120, x.measureText(text).width + 36), h = 62
    let ox = 0
    if (cx - w / 2 < 30) ox = 30 - (cx - w / 2)
    if (cx + w / 2 > W - 30) ox = W - 30 - (cx + w / 2)
    x.fillStyle = INK; x.fillRect(ox - w / 2 - 5, -h - 5, w + 10, h + 10)
    x.fillStyle = BONE; x.fillRect(ox - w / 2, -h, w, h)
    x.fillRect(-10, 0, 20, 14); x.fillStyle = INK; x.fillRect(-16, 4, 6, 14)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, ox, -h / 2 + 2)
    x.restore()
  }
  function rooftopScene(t, back) {
    sunset(t); skyline(); roof(t)
    const ballots = back && t > T.ballots
    zodiacRow(t, ballots)
    // the city stars (back row)
    const rs = CREW.map((c, i) => {
      const sa = sayAt(i), talking = t > sa && t < sa + T.bubbleHold
      const hops = [T.obj + (i % 4) * 0.05, sa]
      const mood = back ? 'happy' : talking ? 'sparkle' : t > T.obj && t < T.open ? 'wide' : t > T.open ? 'happy' : 'neutral'
      return cityStar(x, c.x, c.y, 130, t, { city: c.c, mood, look: back ? [0, 0] : [Math.sign(540 - c.x) * 0.5, 0.4], hops, seed: 30 + i })
    })
    if (ballots) rs.forEach((r, i) => ballotStar(r.x + 50, r.top + 6, 0.8, t, i + 12))
    // Houston, front and centre
    const houMood = back ? 'sparkle' : t > T.l1 ? 'happy' : t > T.obj ? 'squint' : 'wink'
    const rh = cityStar(x, 540, 1360, 430, t, { city: 'HOU', mood: houMood, look: back ? [0, 0] : t > T.obj && t < T.open ? [0, -1] : [0, 0], hops: HOU_HOPS, seed: 3 })
    if (ballots) ballotStar(rh.x + 190, rh.y - 60, 1.4, t, 30)
    // the arguing bubbles (drawn last so they're on top)
    if (!back) CREW.forEach((c, i) => {
      const sa = sayAt(i)
      if (t < sa || t > sa + T.bubbleHold) return
      const k = pop01(t, sa, 0.22, 2.2) * (1 - ease.inQuad(prog(t, sa + T.bubbleHold - 0.15, sa + T.bubbleHold)))
      bubble(rs[i].x, rs[i].top - 14 - (i % 3) * 72, c.say, k)
    })
  }
  function outlinePath(frac = 1) {
    const L = SEG[SEG.length - 1] * frac
    x.beginPath(); x.moveTo(OUTLINE[0].x, OUTLINE[0].y)
    for (let i = 1; i < OUTLINE.length; i++) {
      if (SEG[i] <= L) { x.lineTo(OUTLINE[i].x, OUTLINE[i].y); continue }
      const f = (L - SEG[i - 1]) / (SEG[i] - SEG[i - 1])
      x.lineTo(lerp(OUTLINE[i - 1].x, OUTLINE[i].x, f), lerp(OUTLINE[i - 1].y, OUTLINE[i].y, f)); return
    }
    x.closePath()
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function pixStar(cx, cy, r, col) {
    x.fillStyle = INK; x.fillRect(Math.round(cx - r - 3), Math.round(cy - 3), Math.round(2 * r + 6), 6); x.fillRect(Math.round(cx - 3), Math.round(cy - r - 3), 6, Math.round(2 * r + 6))
    x.fillStyle = col; x.fillRect(Math.round(cx - r), Math.round(cy - 2), Math.round(2 * r), 4); x.fillRect(Math.round(cx - 2), Math.round(cy - r), 4, Math.round(2 * r))
    x.fillRect(Math.round(cx - r * 0.45), Math.round(cy - r * 0.45), Math.round(r * 0.9), Math.round(r * 0.9))
  }
  function mapScene(t) {
    x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 0, W, 1920)
    const dp = ease.inOutCubic(prog(t, ...T.draw))
    if (dp > 0) {
      x.save()
      outlinePath(dp)
      x.strokeStyle = rgba(BONE, 0.85); x.lineWidth = 5; x.lineJoin = 'round'; x.stroke()
      if (dp >= 1) { x.fillStyle = 'rgba(143,216,246,0.07)'; x.fill() }
      // Texas glows gold (home of the show)
      const tk = prog(t, T.draw[1] - 0.2, T.draw[1] + 0.4)
      x.beginPath(); x.moveTo(TEXAS[0].x, TEXAS[0].y); for (const q of TEXAS) x.lineTo(q.x, q.y); x.closePath()
      x.fillStyle = rgba(GOLD, 0.18 * tk); x.fill(); x.strokeStyle = rgba(GOLD, 0.8 * tk); x.lineWidth = 4; x.stroke()
      x.restore()
    }
    const all = prog(t, T.wave[0], T.wave[0] + 0.3)
    PINS.forEach((pin, i) => {
      const at = pinAt(i)
      const dim = prog(t, T.draw[1] - 0.3, T.draw[1])
      if (dim <= 0) return
      const lit = prog(t, at, at + 0.12)
      // a little star flies up from below and lands
      const fp = prog(t, at - 0.5, at)
      if (fp > 0 && fp < 1) pixStar(lerp(pin.p.x + (i % 2 ? 80 : -80), pin.p.x, ease.outCubic(fp)), lerp(1700, pin.p.y, ease.outCubic(fp)), 8, pin.col)
      const pulse = Math.max(t > at ? Math.exp(-(t - at) * 3) : 0, all * (0.5 + 0.5 * Math.sin(t * 5 - i * 0.7)))
      glow(pin.p.x, pin.p.y, 40 + 50 * pulse, pin.col, lit * (0.5 + pulse))
      pixStar(pin.p.x, pin.p.y, 7 + lit * 5 + pulse * 4, lit > 0 ? pin.col : rgba(BONE, 0.4 * dim))
      if (lit > 0) {
        const lk = pop01(t, at, 0.25)
        x.save(); x.translate(pin.p.x + pin.lx, pin.p.y + pin.ly); x.scale(lk, lk)
        x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const w = x.measureText(pin.n).width + 18
        x.fillStyle = INK; x.fillRect(-w / 2, -18, w, 36); x.fillStyle = pin.col; x.fillText(pin.n, 0, 1)
        x.restore()
      }
    })
    // the chyron (a callback to the season-4 vote)
    const ck = pop01(t, T.chyron, 0.3)
    if (ck > 0) {
      x.save(); x.translate(540, 1460); x.scale(1, ck)
      x.fillStyle = INK; x.fillRect(-380, -40, 760, 80)
      x.fillStyle = '#c8352c'; x.fillRect(-374, -34, 150, 68)
      x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(Math.floor(t * 2) % 2 ? '● LIVE' : '○ LIVE', -299, 2)
      x.fillStyle = GOLD; x.fillText('THE CITY VOTE · STILL OPEN', 80, 2)
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.5 })
      const onMap = t >= T.mapCut && t < T.backCut
      if (!onMap) rooftopScene(t, t >= T.backCut)
      else mapScene(t)
      x.globalAlpha = 1
      take.update(t)
      box.update(t)
      verdict.update(t)
      LAST.update(t, outK(t, T.out))
      ox.clearRect(0, 0, W, 1920)
      heatMeter(ox, t, { level: HEAT, at: -1, out: [T.verdict - 0.2, T.verdict] })
      objection(ox, t, { at: T.obj, x: 560, y: 760 })
      agreePill(ox, t, { at: T.pill, dur: T.pillDur, pick: PICK })
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.mapCut, kind: 'shuffle', keep: true }, { t: T.backCut, kind: 'flip', keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: NUMERAL, corners: 'tl bl br' }), cardCuts(CUTS)]

const NOTE_HZ = [587.33, 659.25, 698.46, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(0, { key: KEY }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur, pick: PICK }),
  ...objectionCues(T.obj, { key: KEY }),
  ...CREW.map((c, i) => ['pop', +sayAt(i).toFixed(3), NOTE_HZ[i % 7], 0.035, (c.x - 540) / 600]),
  ...talkCues(LINES, { cps: CPS, pitch: { [HOU]: 659.25 } }),
  ['whoosh', T.draw[0], 0.8, 0.02],
  ...PINS.map((p, i) => ['pop', +pinAt(i).toFixed(3), NOTE_HZ[i % 7] * (i > 6 ? 2 : 1), 0.04, (p.p.x - 540) / 600]),
  ['glitter', T.wave[0], T.wave[0] + 0.8], ['bell', T.wave[0], 1760, 0.025, 1.2, 0],
  ...wordPops(T.last, 6, 0.12, 0, 0.026), ['pluck', T.last + 0.85, 1174.66, 0.05, 0.7, 0],
  ['glitter', T.ballots, T.ballots + 0.6],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
