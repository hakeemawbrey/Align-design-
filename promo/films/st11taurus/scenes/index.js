// st11taurus (60 s vertical, Star Talk season 11 "Far Out", S11 E02: Taurus to the Pleiades) · story 0–55.6, then the
// shared end card. Kit: st11space.js.
//   0.00  HOOK  frame 0: "Mission: rescue the *Seven Sisters*." The ♉ star in its suit mid-hop, hauling a huge snack
//               basket up to its rocket on the Houston pad, a red SOS light flashing. 3… 2… 1… and it launches right on 1.
//   4.40  WANT  Houston: the SOS on the big screen (ONE SISTER MISSING). SATURN: "the pleiades say a sister is lost."
//               TAURUS (on the big screen): "on my way. slowly. but *surely*." In flight, the HUD: THE PLEIADES · ABOUT
//               440 LIGHT-YEARS · STEADY. TAURUS: "i packed snacks. for *seven*."
//  13.00  TRY   the set-piece: into the blue haze round the cluster. It counts the bright ones: 1 … 6. "six. one *is*
//               missing." It sets out seven plates and calls into the fog: "SISTER? i brought cookies!" Nobody comes.
//               The ghost (stowaway) peeks out from behind the rocket and steals a cookie. SATURN: "try the telescope."
//  30.00  TURN  the telescope view: the faint stars come in, the counter runs 7 … 20 … 60 … HUNDREDS. ★ REAL SKY chips:
//               most people see six or seven with the naked eye, but the Pleiades is a young open cluster with
//               hundreds of stars, about 440 light-years away · the blue haze is a dust cloud they're passing through.
//               TAURUS: "nobody's lost. the family's just *big*."
//  42.00  WIN   The sisters, big and little, crowd in; Taurus shares out the basket: "good thing i *always* pack extra."
//               The group hug under Taurus's blanket. The trip home (a crowd of tiny faces waving goodbye), Houston cheers.
//  52.20  LAST  back on the pad (frame 0's hop, now unloading an EMPTY basket): "Family is *bigger* than it looks."
// Rewatch bait: adult Taurus's monstera (st9taurushome) rides along in the porthole and on the picnic; it has six
//   leaves all episode, and its seventh unfurls when the family turns out to be bigger. Ghost: steals a cookie.
import { lerp, prog, ease, clamp, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, lineTimes } from '../../startalk.js'
import { drawSeedConstellation } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawSaturn } from '../../st5cast.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawMonstera } from '../../st9taurushome.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawCluster, drawCountdown, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'
import { drawPad, rect, box6, txt, pop01 } from './set.js'

export const DURATION = 60
const KEY = 'Ab'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c', CYAN = '#7fe0ff', BLUE = '#bfe0ff'
const TA = signStar('taurus')
const TAN = '♉ TAURUS', PLN = '✦ THE PLEIADES', SAT = '♄ SATURN · HOUSTON'
const MONO = "'Space Mono', ui-monospace, monospace"
const TAC = '#9fe0a0'

const T = {
  hookOut: 2.9, cd: 1.0, cdStep: 0.8, launch: 3.4,
  mc: 4.4, fly: 8.6, hud: 8.8, haze: 13.0, count: 15.0, plates: 19.0, ghost: 23.4, scope: 30.0, chip1: 30.6, chip2: 35.6,
  crowd: 42.0, hug: 46.2, home: 48.0, cheer: 50.0, pad2: 52.2, last: 52.4, lastLand: 53.0, lastOut: [55.15, 55.55],
}
const LINES = [
  { t: 4.5, speaker: SAT, text: 'the pleiades say a sister is *lost*.', color: '#f7dca0' },
  { t: 7.1, speaker: TAN, text: 'on my way. slowly. but *surely*.', color: TAC },
  { t: 10.05, speaker: TAN, text: 'i packed snacks. for *seven*.', color: TAC },
  { t: 17.2, speaker: TAN, text: 'six. one *is* missing.', color: TAC },
  { t: 20.0, speaker: TAN, text: 'SISTER? i brought *cookies*!', color: TAC },
  { t: 26.3, speaker: SAT, text: 'try the *telescope*, taurus.', color: '#f7dca0' },
  { t: 39.6, speaker: TAN, text: 'nobody’s lost. the family’s just *big*.', color: TAC },
  { t: 43.0, speaker: PLN, text: 'hi! hi! hi! hi! *hi!*', color: BLUE },
  { t: 45.7, speaker: TAN, text: 'good thing i *always* pack extra.', color: TAC },
  { t: 50.2, speaker: SAT, text: 'welcome home, taurus. *all* of you.', color: '#f7dca0' },
]
const CPS = 30
const BOX_CLOSE = [{ a: 12.6, b: 17.0 }, { a: 29.0, b: 39.4 }]
const HOPS_TA = [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, ...talkHops(LINES, TAN, { cps: CPS }), T.count + 0.1, 19.1, 19.9, T.pad2 + 0.2, T.pad2 + 0.9, T.pad2 + 1.6]
const HOPS_SAT = talkHops(LINES, SAT, { cps: CPS })
const HOPS_PL = talkHops(LINES, PLN, { cps: CPS, gap: 0.2 })

// the seven bright sisters (screen space) for the count; the cluster's faint members come from drawCluster
const SEVEN = [[380, 700], [520, 620], [660, 690], [600, 800], [450, 830], [760, 780], [300, 860]]
const CROWD = (() => { const r = rng(207), out = []; for (let k = 0; k < 26; k++) out.push([80 + r() * 920, 420 + r() * 560, 46 + r() * 34, r()]); return out })()

export const GHOST = { at: T.ghost, x: 900, y: 1210, where: 'the stowaway: peeking out from behind the rocket parked in the Pleiades haze, stealing a cookie off plate seven' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...SPACE_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Mission: rescue the *Seven Sisters*.', at: 0, out: T.hookOut, top: 200, accentColor: BLUE })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, cps: CPS, close: 52.0 })
  const last = popText(root, 'Family is *bigger* | than it looks.', { top: 300, size: 108, accentSize: 168, at: T.last, gap: 0.1, accentColor: BLUE, wobble: true, late: 3, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const boxRoot = box.root
  const boxVis = t => { if (BOX_CLOSE.some(w => t >= w.a && t < w.b)) boxRoot.style.opacity = '0' }

  function basket(cx, cy, k = 1, empty = false) {
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(0, -40, 70, Math.PI, 0); x.stroke()
    x.strokeStyle = '#c98f5f'; x.lineWidth = 7; x.beginPath(); x.arc(0, -40, 70, Math.PI, 0); x.stroke()
    if (!empty) for (let k2 = 0; k2 < 5; k2++) cookie(-60 + k2 * 30, -46 - (k2 % 2) * 14, 1)
    box6(x, -90, -40, 180, 90, '#b8773f', '#d89a5c')
    for (let j = 0; j < 3; j++) rect(x, -90, -24 + j * 26, 180, 5, '#8a5630')
    rect(x, -90, -6, 180, 16, '#e9e1f0'); for (let k2 = 0; k2 < 6; k2++) rect(x, -90 + k2 * 30, -6, 15, 16, '#d0566a')
    x.restore()
  }
  function cookie(cx, cy, k = 1) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    rect(x, -16, -16, 32, 32, INK); rect(x, -13, -13, 26, 26, '#d9a35a'); rect(x, -8, -6, 6, 6, '#5a3418'); rect(x, 3, -9, 5, 5, '#5a3418'); rect(x, 0, 4, 6, 6, '#5a3418')
    x.restore()
  }
  function plate(cx, cy, k, has) {
    if (k <= 0.02) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    rect(x, -38, -10, 76, 20, INK); rect(x, -34, -7, 68, 14, '#f4f0fa'); rect(x, -24, -4, 48, 8, '#d9d2ea')
    x.restore()
    if (has) cookie(cx, cy - 16, k)
  }
  function counter(t, n, label = 'COUNT', cy = 1180) {
    x.save(); x.translate(540, cy)
    box6(x, -190, -60, 380, 120, 'rgba(6,10,32,0.94)', CYAN)
    txt(x, label, 0, -28, `700 22px ${MONO}`, CYAN)
    txt(x, String(n), 0, 22, `700 60px ${MONO}`, GOLD)
    x.restore()
  }
  function blanket(cx, cy, w, k) {
    if (k <= 0.02) return
    const h = 140 * k
    box6(x, cx - w / 2, cy - h / 2, w, h, '#c7d86a', '#e2ef8a')
    for (let i = 0; i < w; i += 60) for (let j = 0; j < h; j += 60) if (((i + j) / 60) % 2 === 0) rect(x, cx - w / 2 + i, cy - h / 2 + j, Math.min(60, w - i), Math.min(60, h - j), '#a9bd52')
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, moon: null })
      // ── HOOK: the pad, hauling the basket, the SOS light
      if (t < T.mc) {
        const launched = t >= T.launch
        const ry = launched ? 1150 - 2400 * ease.inQuad(prog(t, T.launch, T.launch + 1.0)) : 1150
        drawPad(x, t)
        if ((t * 2.5) % 1 < 0.5 && !launched) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,60,80,0.10)'; x.fillRect(0, 0, 1080, 1920); x.restore(); txt(x, '● SOS · THE PLEIADES', 540, 520, `700 40px ${MONO}`, '#ff5d6a') }
        drawRocket(x, 760, ry, 560, t, { color: TA.color, flame: launched ? 1.3 : 0.25, shake: launched ? 6 : 1, smoke: launched ? 1 : 0.3, pilot: t > 2.9 ? TA.color : null, seed: 2 })
        if (t < 2.9) {
          const sx = lerp(260, 470, ease.inOutQuad(prog(t, 0, 2.6)))
          const r = drawSpaceSuit(x, sx, 1300, 250, t, { sign: 'taurus', mood: 'squint', look: [1, -1], hops: HOPS_TA, seed: 3 })
          basket(r.x + 150, r.y - 70, 0.9)
        }
        drawCountdown(x, t, { at: T.cd, step: T.cdStep, x: 300, y: 860, size: 200 })
      }
      // ── WANT: Houston, the SOS on the big screen
      else if (t < T.fly) {
        const screen = (cx, rc, tt) => {
          if (tt < 6.6) {
            drawCluster(cx, rc.x + rc.w / 2, rc.y + rc.h / 2 - 20, 170, tt, { n: 0, bright: 6, haze: 0.6 })
            if ((tt * 2) % 1 < 0.6) txt(cx, 'SOS · ONE SISTER MISSING', rc.x + rc.w / 2, rc.y + rc.h - 50, `700 34px ${MONO}`, '#ff5d6a')
          } else { starfield(cx, tt, { speed: 2 }); drawSpaceSuit(cx, rc.x + rc.w / 2, rc.y + rc.h / 2 + 30, 300, tt, { sign: 'taurus', mood: 'happy', hops: HOPS_TA, seed: 3 }); txt(cx, '● LIVE · MISSION 02', rc.x + 30, rc.y + 40, `700 26px ${MONO}`, '#ff5d6a', 'left') }
        }
        const M = drawMissionControl(x, t, { mission: 'MISSION 02', screens: { big: screen } })
        drawSaturn(x, M.spots.director[0], M.spots.director[1] - 30, 230, t, { mood: t < 6.6 ? 'wide' : 'neutral', hops: HOPS_SAT, look: [0, -1] })
      }
      // ── WANT: the flight, steady
      else if (t < T.haze) {
        starfield(x, t, { speed: 2.2, dim: 0.3 })
        const k = ease.outCubic(prog(t, T.fly, T.fly + 0.6))
        const r = drawRocket(x, 540, lerp(1500, 1020, k), 520, t, { color: TA.color, flame: 0.9, shake: 1, pilot: TA.color, trail: 1, seed: 2 })
        drawMonstera(x, r.window[0] + 2, r.window[1] + 62, 6, t, { s: 0.28 })
        missionHUD(x, t, { mission: 'MISSION 02', target: 'The Pleiades (M45)', distance: 'about 440 light-years', status: 'steady', at: T.hud })
        if (t > 11.2) { basket(780, 1150, pop01(t, 11.2, 0.3, 2) * 0.8) }
      }
      // ── TRY: into the blue haze; counting; the plates; calling out
      else if (t < T.scope) {
        starfield(x, t, { speed: 0.12, dim: 0.35 })
        drawCluster(x, 540, 760, 360, t, { n: 0, bright: 0, haze: 1 })
        // the seven bright ones (the seventh is faint to the eye: it never "counts")
        SEVEN.forEach(([sx, sy], i) => {
          const a = i === 6 ? 0.25 : 1
          x.save(); x.globalAlpha = a; drawCluster(x, sx, sy, 1, t + i, { n: 0, bright: 1, seed: 90 + i }); x.restore()
          const ti = T.count + i * 0.35
          if (i < 6 && t > ti && t < T.plates) { const k = pop01(t, ti, 0.25, 2.4); x.save(); x.translate(sx, sy - 46); x.scale(k, k); txt(x, String(i + 1), 0, 0, `700 34px ${MONO}`, GOLD); x.restore() }
        })
        const rk = ease.outCubic(prog(t, T.haze, T.haze + 0.9))
        drawRocket(x, lerp(540, 860, rk), lerp(1700, 1230, rk), 300, t, { color: TA.color, flame: 1 - rk * 0.9, rot: 0.2 * rk, seed: 2, stowaway: pop01(t, T.ghost, 0.4, 1.4) * (1 - ease.inCubic(prog(t, T.ghost + 1.3, T.ghost + 1.6))) })
        const wander = t > T.plates + 0.6 ? Math.sin((t - T.plates) * 0.9) * 120 : 0
        drawSpaceSuit(x, 420 + wander, 1080, 240, t, { sign: 'taurus', mood: t < T.count ? 'sparkle' : t < T.plates ? 'squint' : t < 26.2 ? 'wide' : 'neutral', hops: HOPS_TA, seed: 3, pop: pop01(t, T.haze + 0.7, 0.3, 2), look: t < T.plates ? [0, -1] : undefined })
        if (t > T.count && t < T.plates) counter(t, Math.min(6, Math.max(0, Math.floor((t - T.count) / 0.35) + 1)), 'BRIGHT SISTERS', 1400)
        // seven plates: cookie on each; the ghost takes number seven's
        for (let i = 0; i < 7; i++) plate(250 + i * 95, 1290, pop01(t, T.plates + i * 0.12, 0.25, 2), !(i === 6 && t > T.ghost + 0.8))
        if (t > T.ghost + 0.6 && t < T.ghost + 1.4) cookie(lerp(820, 880, prog(t, T.ghost + 0.6, T.ghost + 1.2)), lerp(1274, 1200, prog(t, T.ghost + 0.6, T.ghost + 1.2)), 1)
        drawMonstera(x, 160, 1300, 6, t, { s: 0.55 })
        missionHUD(x, t, { mission: 'MISSION 02', target: 'The Pleiades (M45)', distance: 'about 440 light-years', status: t < T.count ? 'arrived · hazy' : 'sister missing?' })
      }
      // ── TURN: the telescope
      else if (t < T.crowd) {
        starfield(x, t, { speed: 0.05, dim: 0.6 })
        const rev = ease.inOutCubic(prog(t, T.scope + 0.8, T.scope + 7.5))
        x.save(); x.beginPath(); x.arc(540, 820, 430, 0, Math.PI * 2); x.clip()
        x.fillStyle = 'rgba(4,6,22,0.6)'; x.fillRect(0, 0, 1080, 1920)
        drawCluster(x, 540, 820, 420, t, { n: 260, bright: 7, haze: 1, reveal: rev, seed: 45 })
        x.restore()
        x.strokeStyle = INK; x.lineWidth = 40; x.beginPath(); x.arc(540, 820, 450, 0, Math.PI * 2); x.stroke()
        x.strokeStyle = '#5a5f86'; x.lineWidth = 14; x.beginPath(); x.arc(540, 820, 444, 0, Math.PI * 2); x.stroke()
        for (const a of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) rect(x, 540 + Math.cos(a) * 400 - 6, 820 + Math.sin(a) * 400 - 6, 12, 12, 'rgba(127,224,255,0.6)')
        const steps = [7, 12, 20, 40, 60]
        const n = rev < 0.98 ? steps[Math.min(steps.length - 1, Math.floor(rev * steps.length))] : 'HUNDREDS'
        counter(t, n, 'SISTERS (TELESCOPE)')
        factChip(x, t, { label: '★ REAL SKY', text: 'Most people see six or seven with the naked eye. The Pleiades has hundreds of stars.', at: T.chip1, dur: 4.4, x: 540, y: 1300, color: BLUE })
        factChip(x, t, { label: '★ REAL SKY', text: 'A young open cluster, about 440 light-years away. The blue haze is a dust cloud they’re passing through.', at: T.chip2, dur: 3.8, x: 540, y: 1300, color: BLUE })
        if (t > 39.2) drawSpaceSuit(x, 540, 1260, 220, t, { sign: 'taurus', mood: 'sparkle', hops: HOPS_TA, seed: 3, pop: pop01(t, 39.2, 0.3, 2) })
      }
      // ── WIN: the crowd of sisters, the snacks, the hug
      else if (t < T.home) {
        starfield(x, t, { speed: 0.1, dim: 0.35 })
        drawCluster(x, 540, 700, 420, t, { n: 0, bright: 0, haze: 0.8 })
        const hug = t > T.hug
        CROWD.forEach(([cx, cy, s, ph], i) => {
          const k = pop01(t, T.crowd + ph * 1.2, 0.3, 2)
          const tx = hug ? lerp(cx, 540 + (cx - 540) * 0.45, ease.outCubic(prog(t, T.hug, T.hug + 0.8))) : cx
          const ty = hug ? lerp(cy, 880 + (cy - 700) * 0.4, ease.outCubic(prog(t, T.hug, T.hug + 0.8))) : cy
          drawStarChar(x, tx, ty, s, t, { color: i % 3 ? BLUE : '#e6f2ff', mood: hug ? 'happy' : i % 4 ? 'happy' : 'wide', seed: i + 3, pop: k, hops: HOPS_PL.map(h => h + (i % 5) * 0.06), glow: 0.6, tips: false })
          if (!hug && t > 45.6 && i % 3 === 0) cookie(tx + s * 0.4, ty + s * 0.2, pop01(t, 45.6 + (i % 7) * 0.1, 0.2, 2) * 0.8)
        })
        SEVEN.slice(0, 7).forEach(([sx, sy], i) => {
          const tx = hug ? lerp(sx, 400 + i * 45, ease.outCubic(prog(t, T.hug, T.hug + 0.8))) : sx, ty = hug ? lerp(sy, 880 - (i % 2) * 40, ease.outCubic(prog(t, T.hug, T.hug + 0.8))) : sy
          drawStarChar(x, tx, ty, 100, t, { color: '#e6f2ff', mood: hug ? 'heart' : 'happy', seed: 40 + i, pop: pop01(t, T.crowd + 0.1 * i, 0.3, 2), hops: HOPS_PL.map(h => h + i * 0.05), glow: 0.9 })
        })
        drawSpaceSuit(x, 540, 1080, 260, t, { sign: 'taurus', mood: hug ? 'heart' : 'happy', hops: HOPS_TA, seed: 3 })
        if (!hug) basket(760, 1260, 0.9)
        blanket(540, 1250, 760, ease.outCubic(prog(t, T.hug + 0.4, T.hug + 1.0)))
        drawMonstera(x, 130, 1330, 6, t, { s: 0.5 })
      }
      // ── WIN: the trip home
      else if (t < T.cheer) {
        starfield(x, t, { speed: 2.4, dim: 0.3 })
        const p = prog(t, T.home, T.cheer)
        drawCluster(x, 540, lerp(700, 300, p), lerp(260, 120, p), t, { n: 40, bright: 7, haze: 0.8, reveal: 1 })
        const r = drawRocket(x, 540, 1180, 460, t, { color: TA.color, flame: 0.9, pilot: TA.color, trail: 1, seed: 2 })
        drawMonstera(x, r.window[0] + 2, r.window[1] + 54, 7, t, { s: 0.24, leafAt: T.home + 0.4 })
        txt(x, 'BYE! BYE! BYE! BYE!', 540, lerp(900, 520, p), `700 30px ${MONO}`, BLUE)
        missionHUD(x, t, { mission: 'MISSION 02', target: 'home · Houston', status: 'family: hundreds', at: T.home + 0.2 })
      }
      // ── WIN: Houston cheers
      else if (t < T.pad2) {
        const scr = (cx, rc, tt) => { drawCluster(cx, rc.x + rc.w / 2, rc.y + rc.h / 2 - 30, 220, tt, { n: 140, bright: 7, haze: 0.7, seed: 45 }); drawStarChar(cx, rc.x + rc.w / 2, rc.y + rc.h / 2 + 40, 170, tt, { ...TA, mood: 'heart', seed: 3 }) }
        const M = drawMissionControl(x, t, { mission: 'MISSION 02', screens: { big: scr, text: 'FAMILY PHOTO · 1 BULL + HUNDREDS' }, cheer: 1, cheerAt: T.cheer })
        drawSaturn(x, M.spots.director[0], M.spots.director[1] - 30, 230, t, { mood: 'happy', hops: [T.cheer + 0.1, ...HOPS_SAT] })
      }
      // ── LAST: back on the pad, the basket empty
      else {
        drawPad(x, t)
        drawRocket(x, 760, 1150, 560, t, { color: TA.color, flame: 0, seed: 2 })
        const r = drawSpaceSuit(x, 330, 1300, 250, t, { sign: 'taurus', mood: 'happy', look: [-1, 0], hops: HOPS_TA, seed: 3 })
        basket(r.x + 160, r.y - 60, 0.9, true)
        drawMonstera(x, 950, 1480, 7, t, { s: 0.6 })
        ;[[120, 600], [200, 680], [940, 640], [860, 720], [1000, 760], [60, 760]].forEach(([sx, sy], i) => drawStarChar(x, sx, sy, 50, t, { color: '#e6f2ff', mood: 'happy', seed: 60 + i, glow: 0.5, tips: false }))
      }
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      hook.update(t)
      box.update(t); boxVis(t)
      last.update(t, 1 - ease.inQuad(prog(t, T.lastOut[0], T.lastOut[1])))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.scope, kind: 'flip' }, { t: T.pad2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E02' }), cardCuts(CUTS)]

export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...[0.2, 0.6, 1.0, 1.4, 1.8, 2.2].map(v => ['chip', v, 660, 0.1, { wave: 'square', gain: 0.012, decay: 0.08, sustain: 0.3, rev: 0.05, dly: 0 }]),
  ...countdownCues(T.cd, { step: T.cdStep }),
  ...launchCues(T.launch, { len: 1.6 }),
  ['whoosh', T.mc, 0.4, 0.04], ['whoosh', T.fly, 0.5, 0.05], ['pop', T.hud, 1318.51, 0.03, 0.3], ['pop', 11.2, 880, 0.03, 0],
  ...warpCues(T.haze, { len: 1.2 }),
  ...[0, 1, 2, 3, 4, 5].map(i => ['bell', +(T.count + i * 0.35).toFixed(2), [659.25, 739.99, 830.61, 880, 987.77, 1108.73][i], 0.025, 1.2, (i - 2.5) * 0.15]),
  ...[0, 1, 2, 3, 4, 5, 6].map(i => ['pop', +(T.plates + i * 0.12).toFixed(2), 1318.51, 0.02, (i - 3) * 0.15]),
  ['tick', T.ghost + 0.1, 0.02], ['pop', T.ghost + 0.7, 1760, 0.025, 0.4],
  ['whoosh', T.scope, 0.5, 0.05], ['swell', T.scope + 0.8, T.scope + 7.5, { gain: 0.03, f0: 300, f1: 3200 }], ['glitter', T.scope + 5, T.scope + 8],
  ...factChipCues(T.chip1, { dur: 4.4 }), ...factChipCues(T.chip2, { dur: 3.8 }),
  ['glitter', T.crowd, T.crowd + 1.4], ['whoosh', T.hug, 0.6, 0.04], ['bell', T.hug + 0.5, 1318.51, 0.03, 2, 0],
  ['whoosh', T.home, 0.6, 0.05], ['bell', T.home + 0.4, 1567.98, 0.02, 1.5, 0.3],
  ...cheerCues(T.cheer, { len: 2 }),
  ['whoosh', T.pad2, 0.4, 0.04],
  ['pop', T.last, 659.25, 0.03, 0], ['pop', T.last + 0.1, 783.99, 0.03, 0], ['pop', T.lastLand, 987.77, 0.045, 0], ['bell', T.lastLand, 1318.51, 0.03, 1.8, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [TAN]: 520, [PLN]: 1200, [SAT]: 300 }, gain: 0.014 }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const _times = () => lineTimes(LINES, { cps: CPS })
export const _hides = () => BOX_CLOSE
