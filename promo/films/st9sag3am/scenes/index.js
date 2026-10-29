// st9sag3am (33 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E45) · story 0–28.6, then the end card.
//   3 AM with Sagittarius: the soft part it doesn't post. Same bedroom as E41, dark (../../st9saghome.js, ep '3am':
//   seven pins on the map, the Jupiter lamp as night light).  "A Sag at 3 AM, booking a flight to avoid a *feeling*."
//   0.00  Frame 0: the dark bedroom, Sag sitting up in bed lit by its phone: ✈ FLIGHTS · FROM: HERE · TO: ANYWHERE ·
//         a thumb hovering over BOOK. A small grey cloud with a face sits on the blanket: the feeling (labelled).
//   3.20  The destinations scroll (LISBON · REYKJAVIK · ANYWHERE). SAG: "if i leave, it can’t *find* me."
//   8.60  The feeling hops into the backpack’s side pocket and peeks out. Gasp zoom. SAG: "…it packs *itself.*"
//  12.00  whip → the window seat, every star out. ★ ONE OLD STORY — the archer is linked to Chiron, the wise healer.
//  15.80  The flight tab closes (✕). SAG: "ok. not running. *calling.*"  CALLING ♌ LEO… → LEO: "hey. can’t sleep?
//         *talk to me.*"  SAG: "there’s a feeling and i almost flew to *Lisbon.*"  LEO: "stay on. i’ve got *time.*"
//  23.60  whip → the bed again, the same framing as frame 0: the phone now says LEO · 38:12, the backpack — packed since
//         E41 — finally unpacked (a shirt, a compass), the feeling small and warm on the blanket.
//         3:41 AM — still here. *that’s the point.*   LAST: "Feel it *here.*"
//   The ghost leans out from behind the nightstand at 4.6. Gentle, never despairing; the advice is: call someone.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom, drawBits } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { SAG, drawSagHome, drawSagHomeFront, drawSag, drawBackpack, R, blk, bubble, bubbleCues, whip, whipCues, popIn } from '../../st9saghome.js'

export const DURATION = 33
const KEY = 'Em'
const STORY_END = DURATION - ENDCARD_LEN       // 28.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', ORANGE = '#ffb36a', PINK = '#ff8fb1'
const MONO = "'Space Mono', ui-monospace, monospace"
const LEO = signStar('leo'), LEOT = '♌ LEO'

const T = {
  hookOut: 2.9, scroll: [3.2, 6.0], leave: 6.4, hop: [8.6, 9.3], gasp: 9.35, packs: 9.8,
  win: 12.0, fact: 12.6, close: 15.8, calling: 16.9, pick: 18.1, me: 20.2, time: 22.3,
  bed: 23.6, unpack: [23.9, 24.9], last: 25.4, out: [28.15, 28.55], ghost: 4.6,
}
const B = [
  { at: T.leave, out: 8.5, x: 400, y: 960, text: 'if i leave, it can’t *find* me.', tag: SAG.tag, tagColor: SAG.color, w: 500, tailX: 0.35 },
  { at: T.packs, out: 11.8, x: 400, y: 960, text: '…it packs *itself.*', tag: SAG.tag, tagColor: SAG.color, w: 420, tailX: 0.35 },
  { at: T.close + 0.1, out: 16.85, x: 380, y: 880, text: 'ok. not running. *calling.*', tag: SAG.tag, tagColor: SAG.color, w: 480, tailX: 0.3 },
  { at: T.pick, out: 20.05, x: 760, y: 640, text: 'hey. can’t sleep? *talk to me.*', tag: LEOT, tagColor: LEO.color, w: 480, tailX: 0.6 },
  { at: T.me, out: 22.15, x: 380, y: 880, text: 'there’s a feeling and i almost flew to *Lisbon.*', tag: SAG.tag, tagColor: SAG.color, w: 520, tailX: 0.3 },
  { at: T.time, out: 23.45, x: 760, y: 640, text: 'stay on. i’ve got *time.*', tag: LEOT, tagColor: LEO.color, w: 440, tailX: 0.6 },
]
const STAMPS = [
  { at: 3.3, out: 6.2, time: '3:04 AM', text: 'just *browsing.* (lie)' },
  { at: 24.0, out: 25.25, time: '3:41 AM', text: 'still here. *that’s the point.*' },
]
const FACT = { at: T.fact, dur: 3.0, text: 'One old story links the archer to Chiron, the wise centaur healer.', label: '★ ONE OLD STORY', y: 1330 }
const LAST = 'Feel it *here.*'
const CLOCK = [
  { t: 0, from: '3:04', to: '3:09', at: T.scroll[0], dur: 2.6, ampm: 'AM' },
  { t: T.win, from: '3:09', to: '3:12', at: T.win + 0.05, dur: 0.4, ampm: 'AM' },
  { t: T.bed, from: '3:12', to: '3:41', at: T.bed + 0.05, dur: 0.7, ampm: 'AM' },
]
export const GHOST = { at: T.ghost, x: 660, y: 1180, from: 'right', where: 'leaning out from behind the nightstand under the Jupiter lamp, in the dark' }
const DESTS = ['LISBON', 'REYKJAVIK', 'KYOTO', 'ANYWHERE']

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const CLOUD = [
  '...cccc.....',
  '..cCCCCc.cc.',
  '.cCCCCCCcCCc',
  'cCCCCCCCCCCc',
  'cCCeCCCeCCCc',
  'cCCCCCCCCCCc',
  '.cCCCmmCCCc.',
  '..cccccccc..',
]
/** the feeling: a small grey cloud with a face. warm 0…1 turns it pink and glowing */
function feeling(x, t, cx, cy, cell, warm = 0, label = false) {
  const C = warm > 0.5 ? '#ffc2d4' : '#9aa6c8', c = warm > 0.5 ? '#c96a8a' : '#5c6688'
  if (warm > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, cell * 14)
    g.addColorStop(0, `rgba(255,170,200,${0.4 * warm})`); g.addColorStop(1, 'rgba(255,170,200,0)')
    x.fillStyle = g; x.fillRect(cx - cell * 14, cy - cell * 14, cell * 28, cell * 28); x.restore()
  }
  const blink = (t * 0.7) % 3 < 0.12
  drawBits(x, CLOUD.map(r => (blink ? r.replace(/e/g, 'C') : r)), { c, C, e: INK, m: warm > 0.5 ? '#ff4f86' : INK }, Math.round(cx), Math.round(cy + Math.sin(t * 2.3) * cell * 0.6), cell)
  if (label) {
    x.font = `700 20px ${MONO}`; const w = x.measureText('THE FEELING').width + 20
    R(x, INK, cx - w / 2, cy - cell * 7 - 30, w, 30); x.fillStyle = '#c9d0ea'; x.textAlign = 'center'; x.fillText('THE FEELING', cx, cy - cell * 7 - 9); x.textAlign = 'left'
  }
}
/** the phone insert: the flight search, then the call */
function phone(x, t, cx, cy, mode, k) {
  if (k <= 0.02) return
  const w = 300, h = 470
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  // the glow it throws
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(0, 0, 0, 0, 0, 380); g.addColorStop(0, 'rgba(140,190,255,0.22)'); g.addColorStop(1, 'rgba(140,190,255,0)')
  x.fillStyle = g; x.fillRect(-380, -380, 760, 760); x.restore()
  blk(x, -w / 2, -h / 2, w, h, '#14112a', { o: 8 }); R(x, '#0b0918', -w / 2 + 12, -h / 2 + 16, w - 24, h - 32)
  R(x, INK, -30, -h / 2 + 4, 60, 8)
  x.textAlign = 'center'
  if (mode === 'flight') {
    x.font = `700 24px ${MONO}`; x.fillStyle = '#9fd3ff'; x.fillText('✈ FLIGHTS', 0, -h / 2 + 62)
    x.font = `700 18px ${MONO}`; x.fillStyle = '#9a8fb5'; x.fillText('FROM', 0, -h / 2 + 112); x.fillText('TO', 0, -h / 2 + 196)
    x.font = `800 32px Inter`; x.fillStyle = BONE; x.fillText('HERE', 0, -h / 2 + 148)
    const i = t < T.scroll[0] ? 3 : Math.min(3, Math.floor(prog(t, ...T.scroll) * 4))
    const flick = t > T.scroll[0] && t < T.scroll[1] && ((t - T.scroll[0]) * 4 % 1) < 0.15
    x.fillStyle = ORANGE; x.font = `800 ${DESTS[i].length > 7 ? 30 : 36}px Inter`; x.fillText(flick ? '' : DESTS[i], 0, -h / 2 + 236)
    x.font = `700 18px ${MONO}`; x.fillStyle = '#9a8fb5'; x.fillText('ONE WAY · 06:10', 0, -h / 2 + 284)
    blk(x, -100, 90, 200, 70, '#e0384f', { o: 0 }); x.font = `800 34px Inter`; x.fillStyle = BONE; x.fillText('BOOK ▸', 0, 136)
    // the thumb, hovering
    const hv = Math.sin(t * 3) * 10
    blk(x, 30, 150 + hv, 70, 110, '#a35cf0', { o: 5, hi: '#c79bff' })
  } else if (mode === 'close') {
    x.font = `800 120px Inter`; x.fillStyle = '#ff5d73'; x.fillText('✕', 0, 30)
    x.font = `700 20px ${MONO}`; x.fillStyle = BONE; x.fillText('TAB CLOSED', 0, 110)
  } else {
    const secs = mode === 'long' ? 38 * 60 + 12 + Math.floor(t - T.bed) : Math.max(0, Math.floor(t - T.pick))
    const ring = mode === 'call' && t < T.pick
    x.font = `700 22px ${MONO}`; x.fillStyle = '#7dffb8'; x.fillText(ring ? 'CALLING…' : 'ON A CALL', 0, -h / 2 + 70)
    // Leo's avatar: an orange star coin
    const pr = ring ? 1 + 0.08 * Math.sin(t * 14) : 1
    x.save(); x.scale(pr, pr); R(x, INK, -66, -96, 132, 132); R(x, LEO.color, -60, -90, 120, 120); x.font = `700 72px 'EB Garamond', serif`; x.fillStyle = INK; x.fillText('♌', 0, -8); x.restore()
    x.font = `800 40px Inter`; x.fillStyle = BONE; x.fillText('LEO', 0, 90)
    x.font = `700 26px ${MONO}`; x.fillStyle = '#9a8fb5'; x.fillText(ring ? '' : `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`, 0, 132)
    blk(x, -40, 160, 80, 50, '#e0384f', { o: 0 })
  }
  x.textAlign = 'left'
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "700 40px Inter", "800 36px Inter", "800 112px Inter", "italic 600 48px 'EB Garamond'", "italic 500 170px 'EB Garamond'", "700 72px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Sag at 3 AM, booking a flight to avoid a *feeling.*', at: 0, out: T.hookOut, accentColor: PINK, size: 74, accentSize: 112 })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, accentColor: PINK, top: 1560 }))
  const last = popText(root, LAST, { top: 300, size: 112, accentSize: 176, at: T.last, gap: 0.1, accentColor: PINK, wobble: true, late: 1, lateAt: T.last + 0.35, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out)
      drawSky(x, t); daySky(x, t, { hour: 3.2 })
      drawSeedConstellation(x, t, 100, { alpha: 0.6 })
      const z = gaspZoom(t, { at: T.gasp, dur: 1.4, x: 800, y: 1180, amount: 0.25, follow: 0.3 })
      x.save()
      if (ok < 1) { const s = lerp(0.9, 1, ok); x.globalAlpha = ok; x.translate(540, 1030); x.scale(s, s); x.translate(-540, -1030) }
      z.apply(x)
      if (t < T.win || t >= T.bed) {
        const end = t >= T.bed
        const up = end ? prog(t, ...T.unpack) : 0
        drawSagHome(x, t, { room: 'bed', ep: '3am', dark: 0.85, lamp: 0.55, noPack: true })
        drawBackpack(x, 940, 1236, 7, t, up)
        // the feeling: on the blanket → hops into the pack's pocket → (end) small and warm on the blanket
        if (!end) {
          const hp = prog(t, ...T.hop)
          if (hp <= 0) feeling(x, t, 585, 1092, 9, 0, t < T.leave + 2)
          else if (hp < 1) feeling(x, t, lerp(600, 905, hp), lerp(1092, 1205, hp) - Math.sin(Math.PI * hp) * 150, lerp(9, 5, hp))
          else { x.save(); x.beginPath(); x.rect(840, 900, 200, 318); x.clip(); feeling(x, t, 908, 1218 - 22 * clamp(popIn(t, T.hop[1], 0.3)), 5); x.restore() }
        }
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
        const mood = end ? 'happy' : t < T.leave ? 'neutral' : t < T.hop[1] ? 'squint' : t < T.packs + 0.6 ? 'wide' : 'neutral'
        const look = end ? [0, 0] : t < T.leave ? [1, 0] : t < T.hop[1] ? [1, 1] : [1, 1]
        const r = drawSag(x, 400, 1080, 270, t, { pack: false, mood, look, blink: !end && t > T.gasp && t < T.packs + 0.6 ? false : undefined, hops: [T.leave + 0.1, T.leave + 0.7, T.packs + 0.1, T.bed + 0.1, T.last + 0.35], seed: 3, glow: 0.6 })
        drawSagHomeFront(x, t, { room: 'bed', dark: 0.85 })
        if (end) feeling(x, t, 600, 1104, 7, prog(t, T.bed + 0.3, T.bed + 1.2))
        // the phone's light on the face
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(r.x + 60, r.y + 20, 0, r.x + 60, r.y + 20, 260)
        g.addColorStop(0, 'rgba(140,190,255,0.28)'); g.addColorStop(1, 'rgba(140,190,255,0)'); x.fillStyle = g; x.fillRect(r.x - 220, r.y - 240, 520, 520); x.restore()
        phone(x, t, 830, 820, end ? 'long' : 'flight', end ? popIn(t, T.bed + 0.1, 0.35) : 1 - ease.inCubic(prog(t, T.win - 0.35, T.win - 0.05)))
      } else {
        drawSagHome(x, t, { room: 'window', ep: '3am', dark: 0.85, lamp: 0.5, noPack: true })
        feeling(x, t, 700, 1105, 5, 0)
        const r = drawSag(x, 380, 995, 220, t, { pack: false, mood: t < T.close ? 'neutral' : t < T.pick ? 'squint' : t < T.time + 0.5 ? 'neutral' : 'happy', look: t < T.close ? [1, -1] : [1, -0.4], hops: [T.win + 0.1, T.close + 0.15, T.me + 0.1, T.me + 0.8, T.me + 1.4], seed: 3, glow: 0.6 })
        drawSagHomeFront(x, t, { room: 'window', dark: 0.85 })
        void r
        const mode = t < T.close ? 'flight' : t < T.calling ? 'close' : 'call'
        const pk = t < T.close ? popIn(t, T.win + 0.15, 0.3) * (1 - ease.inCubic(prog(t, T.fact - 0.3, T.fact))) : popIn(t, T.close, 0.3, 2.2)
        phone(x, t, 760, 860, mode, t < T.fact || t >= T.close ? pk : 0)
      }
      for (const b of B) bubble(x, t, b)
      x.restore()
      factChip(x, t, FACT)
      whip(x, t, T.win, { dir: 1 }); whip(x, t, T.bed, { dir: -1 })
      const c = [...CLOCK].reverse().find(s => t >= s.t)
      drawClock(x, t, { ...c, sign: 'sag' })
      drawRecFrame(x, t, { battery: lerp(0.3, 0.18, t / STORY_END), time: `00:${String(Math.floor(t)).padStart(2, '0')}` })
      hook.update(t); for (const s of stamps) s.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.win, kind: 'flip' }, { t: T.bed, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E45' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [329.63, 392, 440, 493.88, 587.33, 659.25, 783.99]
const scrollTicks = () => { const o = []; for (let i = 1; i < 4; i++) o.push(['tick', r3(T.scroll[0] + i * (T.scroll[1] - T.scroll[0]) / 4), 0.03]); return o }
const ringing = () => { const o = []; for (let t = T.calling; t < T.pick - 0.1; t += 0.5) o.push(['pluck', r3(t), 880, 0.025, 0.25, 0.3], ['pluck', r3(t + 0.12), 1108.73, 0.02, 0.25, 0.3]); return o }
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...bubbleCues(B, { pitch: { [SAG.tag]: 659.25, [LEOT]: 523.25 } }),
  ...clockCues(CLOCK[0].at, CLOCK[0].dur), ...clockCues(CLOCK[1].at, CLOCK[1].dur), ...clockCues(CLOCK[2].at, CLOCK[2].dur),
  ...scrollTicks(),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.hop[0] + 0.3, 0.4, 0.02], ['pop', T.hop[1], 392, 0.04, 0.5],
  ['whoosh', T.gasp, 0.3, 0.025], ['pluck', T.gasp + 0.05, 164.81, 0.05, 0.7, 0],
  ...whipCues(T.win), ...whipCues(T.bed),
  ...factChipCues(FACT.at, { dur: FACT.dur }), ['bell', T.fact + 0.2, 987.77, 0.025, 2.2, 0],
  ['pop', T.close + 0.02, 220, 0.05, 0], ['tick', T.close, 0.06],
  ...ringing(), ['pop', T.pick, 1318.51, 0.04, 0.3], ['bell', T.pick + 0.05, 1318.51, 0.03, 1.4, 0.3],
  ['whoosh', T.unpack[0] + 0.2, 0.4, 0.015], ['pop', T.unpack[0] + 0.5, 659.25, 0.035, 0.5], ['pop', T.unpack[0] + 0.7, 783.99, 0.03, -0.4],
  ['glitter', T.bed + 0.4, T.bed + 1.1],
  ['pop', r3(T.last), NOTE[2], 0.026, -0.15], ['pop', r3(T.last + 0.1), NOTE[3], 0.026, 0.15],
  ['pop', r3(T.last + 0.35), 987.77, 0.05, 0], ['pluck', r3(T.last + 0.35), 659.25, 0.045, 0.8, 0], ['bell', r3(T.last + 0.45), 1318.51, 0.03, 1.8, 0],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
