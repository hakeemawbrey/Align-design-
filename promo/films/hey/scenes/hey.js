// hey (15s, LOOK B "Nebula"). One scene on one sky, one moon, one grain.
//   0.00–4.80  THE LOOP. A cold, desaturated sky; a generic chat on a phone: "hey" / "hey" / "how's your week" /
//              "good u" / "good"… the same five lines, day after day, faster and faster until they smear.
//              0.25 "Stuck on ‘hey’." (fully in ≈1.0, out 4.95–5.25). 4.80 the last "hey" sticks. 5.00 "Seen".
//   5.30       a gold star glints in the grey sky and colour blooms out of it (5.35–6.6); the phone becomes Align.
//   5.50–6.60  a talk card is dealt out of the star and flips: 0 The Fool, "What's a hill you will die on?"
//   6.85       "TALK CARDS" / "Start with a real question." (out 9.95–10.20)
//   7.90–8.50  the card drops into the chat · 8.55–8.95 push in · 8.75/9.00 both answer · 9.55 she asks back
//   10.15–10.6 the phone drifts away; end.js: two stars, "Skip to the good part.", lockup, fade (14.5–14.95)
// Layers: sky canvas · glow · objects (phone, dealt card) · pixel stars · grain · type · black plate.
import { clamp, lerp, prog, ease, tw, rng, noise1, el, C } from '../../../src/lib.js'
import { W, H, A, IMG, SERIF, MONO, SANS, fill, img } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, grainOpacity, drawPixelStar, buildStarSprite, layerCanvas } from '../../sky.js'
import { buildEnd, ET, endCues } from './end.js'

// ── the timeline
export const T = {
  CAP1: 0.25, CAP1_OUT: [4.95, 5.25], STOP: 4.8, SEEN: 5.0,
  GLINT: 5.3, BLOOM: [5.35, 6.6], SWAP: [5.72, 6.3], MOVE: [5.35, 6.45],
  FLY0: 5.5, FLY1: 6.25, FLIP0: 6.12, FLIP1: 6.6, FLASH: 6.62,
  EYE: 6.75, CAP2: 6.85, CAP2_OUT: [9.95, 10.2],
  MOVE0: 7.9, LAND: 8.5, PUSH: [8.55, 8.95], CHIP: 9.0,
  EXIT: [10.15, 10.6],
}

// ── the loop: five lines, each gap shorter than the last (0.43 × 0.87^k, floor 0.07); ends on "hey" at 4.80
const LOOP = [['me', 'hey'], ['them', 'hey'], ['me', "how's your week"], ['them', 'good u'], ['me', 'good']]
const N_LOOP = 41
const LT = (() => { const a = []; let t = 0.12; for (let k = 0; k < N_LOOP; k++) { a.push(t); t += Math.max(0.07, 0.43 * Math.pow(0.87, k)) } a[N_LOOP - 1] = T.STOP; return a })()
const DAYS = ['MON 9:12 PM', 'TUE 10:40 PM', 'WED 8:03 PM', 'THU 11:26 PM', 'FRI 9:58 PM', 'SAT 1:14 AM', 'SUN 10:31 PM']

// ── the phone (screen 960 tall at scale 1, the app's own aspect)
const PHH = 960, PHW = Math.round(PHH * 1170 / 2532), BZ = 13
const K = PHW / 1170
const CLIP0 = 512 * K, CLIP1 = 2030 * K               // Align thread area (header + input bar cropped from screen-chat)
const ANCH = (CLIP0 + CLIP1) / 2                      // phone pose anchor (screen-local y)
const G = { top: 142, bot: PHH - 104 }                // generic thread viewport
const MOON0 = { x: 1764, y: 116, r: 50, phase: 0.12 }

// the camera: a slow drift on the nebula
function cam(t) { return { zoom: 1 + 0.004 * t, dx: -5 * t, dy: 1.8 * t } }
function moonPose(t) { const c = cam(t); return { x: W / 2 + (MOON0.x - W / 2) * c.zoom + c.dx, y: H / 2 + (MOON0.y - H / 2) * c.zoom + c.dy, r: MOON0.r * c.zoom, phase: MOON0.phase, alpha: 1 } }

// the dealt card
const ORG = { x: 930, y: 214 }                        // the star it is dealt out of
const CX = 560, CY = 432                              // its rest (scene)
const FH = 700, FW = FH * 732 / 1170                  // card-talk-1 (glow margin incl.)
const BH = FH * 0.90 / 0.89, BW = BH * 1528 / 2347
const TCW = 140, TCH = TCW * 1170 / 732               // the card in the thread
const TC_Y = CLIP0 + 10 + TCH / 2                     // its centre (screen-local)

// the conversation after the card
const MSGS = [
  { who: 'j', ans: true, lab: 'JUNIPER', text: 'Breakfast for dinner is the best meal. Always.', show: 8.75 },
  { who: 'me', ans: true, lab: 'YOUR ANSWER', text: 'Movies belong in a theatre. Big screen or nothing.', show: 9.0 },
  { who: 'j', text: 'Okay. Defend the theatre. I’m listening.', dots: 9.25, show: 9.55 },
]

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  const greyC = document.createElement('canvas'); greyC.width = W; greyC.height = H
  const gy = greyC.getContext('2d')
  const spriteS = buildStarSprite(true)

  // phone glows (scene space, under the phone): cold screen light → warm aura
  const glowCold = el('div', { position: 'absolute', left: '-520px', top: '-640px', width: '1040px', height: '1280px', borderRadius: '50%', pointerEvents: 'none',
    background: 'radial-gradient(closest-side, rgba(90,130,220,0.30), rgba(70,100,180,0.12) 55%, rgba(60,90,160,0) 100%)' }, root)
  const glowWarm = el('div', { position: 'absolute', left: '-480px', top: '-600px', width: '960px', height: '1200px', borderRadius: '50%', opacity: 0, pointerEvents: 'none',
    background: 'radial-gradient(closest-side, rgba(242,170,140,0.40), rgba(180,120,255,0.20) 55%, rgba(180,92,255,0) 100%)' }, root)
  const objs = fill(root, { background: 'transparent' })

  // ── the phone
  const ph = el('div', { position: 'absolute', left: 0, top: 0, width: PHW + 2 * BZ + 'px', height: PHH + 2 * BZ + 'px', borderRadius: '66px', transformOrigin: '0 0', willChange: 'transform',
    background: 'linear-gradient(160deg, #1d2129 0%, #0c0e13 42%, #08090d 100%)',
    boxShadow: '0 50px 120px rgba(0,0,0,0.75), 0 16px 40px rgba(0,0,0,0.45), inset 0 0 0 2px rgba(160,175,205,0.18), inset 0 0 0 6px #07080b' }, objs)
  const scr = el('div', { position: 'absolute', left: BZ + 'px', top: BZ + 'px', width: PHW + 'px', height: PHH + 'px', borderRadius: '54px', overflow: 'hidden', background: '#161c28' }, ph)

  // generic chat (cold, no real app's look): header, a thread that loops, an input bar
  const gen = el('div', { position: 'absolute', inset: 0, background: '#161c28' }, scr)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.style.position = 'absolute'
  const MONO_M = '0.05 0.56 0.05 0 0  0.05 0.66 0.08 0 0  0.06 0.76 0.18 0 0  0 0 0 1 0'
  svg.innerHTML = `<filter id="heyMB" x="0" y="-10%" width="100%" height="120%"><feGaussianBlur stdDeviation="0 0"/></filter><filter id="heyCold" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${MONO_M}"/></filter>`
  root.appendChild(svg)
  const mb = svg.querySelector('feGaussianBlur')
  const UI = '#d8deea'
  const view = el('div', { position: 'absolute', left: 0, top: G.top + 'px', width: PHW + 'px', height: (G.bot - G.top) + 'px', overflow: 'hidden' }, gen)
  const thread = el('div', { position: 'absolute', left: 0, top: 0, width: PHW + 'px', height: '6000px', willChange: 'transform' }, view)
  const BUB = { fs: 27, h: 60, gap: 12 }
  let y = 16
  el('div', { position: 'absolute', left: 0, width: PHW + 'px', top: y + 'px', textAlign: 'center', fontFamily: MONO, fontSize: '15px', letterSpacing: '0.08em', color: 'rgba(216,222,234,0.42)' }, thread, 'YOU MATCHED · 3 WEEKS AGO')
  y += 44
  const loop = LOOP.length && Array.from({ length: N_LOOP }, (_, k) => {
    const [who, txt] = LOOP[k % 5], me = who === 'me'
    let sep = null
    if (k % 5 === 0 && k > 0) {
      sep = el('div', { position: 'absolute', left: 0, width: PHW + 'px', top: (y + 6) + 'px', textAlign: 'center', fontFamily: MONO, fontSize: '15px', letterSpacing: '0.08em', color: 'rgba(216,222,234,0.4)', opacity: 0 }, thread, DAYS[(k / 5) % 7])
      y += 44
    }
    const b = el('div', { position: 'absolute', top: y + 'px', [me ? 'right' : 'left']: '22px', height: BUB.h + 'px', boxSizing: 'border-box', padding: '12px 24px 0', borderRadius: '30px',
      [me ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: '9px', background: me ? '#3b5f9c' : '#262b35', color: '#f3f5f9', whiteSpace: 'nowrap',
      fontFamily: SANS, fontWeight: 400, fontSize: BUB.fs + 'px', lineHeight: '34px', opacity: 0, transformOrigin: me ? '100% 100%' : '0 100%' }, thread, txt)
    const m = { b, sep, me, t: LT[k], top: y, bot: y + BUB.h }
    y += BUB.h + BUB.gap
    return m
  })
  const receipt = el('div', { position: 'absolute', right: '28px', top: (loop[N_LOOP - 1].bot + 6) + 'px', fontFamily: SANS, fontWeight: 500, fontSize: '19px', color: 'rgba(216,222,234,0.56)', opacity: 0 }, thread, 'Seen')
  // scroll targets: keep the newest bubble just above the input bar
  const VH = G.bot - G.top
  const targ = loop.map(m => Math.max(0, m.bot + 40 - VH))
  const scrollAt = t => loop.reduce((s, m, k) => {
    const d = k + 1 < N_LOOP ? loop[k + 1].t - m.t : 0.3
    return s + (targ[k] - (k ? targ[k - 1] : 0)) * ease.outCubic(prog(t, m.t, m.t + Math.min(0.3, d * 1.25)))
  }, 0)
  // header
  el('div', { position: 'absolute', left: 0, top: 0, width: PHW + 'px', height: G.top + 'px', background: '#161c28' }, gen)
  el('div', { position: 'absolute', left: '24px', top: '62px', fontFamily: SANS, fontWeight: 300, fontSize: '54px', lineHeight: '54px', color: UI }, gen, '‹')
  const av = el('div', { position: 'absolute', left: '66px', top: '64px', width: '54px', height: '54px', borderRadius: '50%', overflow: 'hidden', filter: 'url(#heyCold)' }, gen)
  img(av, `${IMG}people/p2.jpg`, { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%' })
  el('div', { position: 'absolute', left: '136px', top: '72px', fontFamily: SANS, fontWeight: 600, fontSize: '30px', color: '#f1f3f7' }, gen, 'Theo')
  el('div', { position: 'absolute', left: '22px', right: '22px', top: (G.top - 1) + 'px', height: '1px', background: 'rgba(216,222,234,0.12)' }, gen)
  // input bar
  el('div', { position: 'absolute', left: 0, top: G.bot + 'px', width: PHW + 'px', height: (PHH - G.bot) + 'px', background: '#161c28' }, gen)
  el('div', { position: 'absolute', left: '22px', right: '22px', top: (G.bot + 16) + 'px', height: '54px', borderRadius: '27px', border: '1.5px solid rgba(216,222,234,0.2)', boxSizing: 'border-box',
    padding: '11px 22px', fontFamily: SANS, fontSize: '22px', color: 'rgba(216,222,234,0.38)' }, gen, 'Message')
  // status bar
  el('div', { position: 'absolute', left: '48px', top: '22px', fontFamily: SANS, fontWeight: 600, fontSize: '22px', color: '#f1f3f7' }, gen, '11:48')
  el('div', { position: 'absolute', left: (PHW / 2 - 52) + 'px', top: '16px', width: '104px', height: '32px', borderRadius: '17px', background: '#000' }, scr)

  // Align chat (the app's own header + input bar; a thread built here)
  const al = el('div', { position: 'absolute', inset: 0, background: '#150b35', opacity: 0 }, scr)
  scr.appendChild(scr.children[1])   // notch stays on top
  const hdr = el('div', { position: 'absolute', left: 0, top: 0, width: PHW + 'px', height: CLIP0 + 'px', overflow: 'hidden' }, al)
  img(hdr, A + 'screen-chat.png', { left: 0, top: 0, width: PHW + 'px', height: PHH + 'px' })
  const ftr = el('div', { position: 'absolute', left: 0, top: CLIP1 + 'px', width: PHW + 'px', height: (PHH - CLIP1) + 'px', overflow: 'hidden' }, al)
  img(ftr, A + 'screen-chat.png', { left: 0, top: -CLIP1 + 'px', width: PHW + 'px', height: PHH + 'px' })
  const area = el('div', { position: 'absolute', left: 0, top: CLIP0 + 'px', width: PHW + 'px', height: (CLIP1 - CLIP0) + 'px', overflow: 'hidden' }, al)
  const thr = el('div', { position: 'absolute', left: 0, top: 0, width: PHW + 'px', padding: '0 18px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '11px' }, area)
  el('div', { height: (TCH + 14) + 'px', flex: 'none' }, thr)
  const chip = el('div', { alignSelf: 'center', fontFamily: MONO, fontSize: '12px', letterSpacing: '0.2em', color: '#f2c75c', opacity: 0, textShadow: '0 0 10px rgba(242,199,92,0.6)' }, thr, '✦ BOTH ANSWERED ✦')
  const msgs = MSGS.map(m => {
    const row = el('div', { display: 'flex', justifyContent: m.who === 'me' ? 'flex-end' : 'flex-start', position: 'relative', flex: 'none' }, thr)
    const st = m.ans ? { background: m.who === 'me' ? 'linear-gradient(135deg, rgba(242,154,74,0.34), rgba(232,98,138,0.36))' : 'linear-gradient(135deg, rgba(232,98,138,0.28), rgba(154,123,224,0.34))',
      boxShadow: '0 0 0 1px rgba(242,199,92,0.55), 0 0 22px rgba(242,170,120,0.25)' } : { background: m.who === 'me' ? '#4a2982' : 'rgba(52,35,95,0.95)' }
    const b = el('div', { maxWidth: '300px', padding: '10px 15px 11px', borderRadius: m.who === 'me' ? '20px 20px 6px 20px' : '20px 20px 20px 6px', fontFamily: SANS, fontWeight: 400, fontSize: '19px', lineHeight: 1.3, color: C.bone, opacity: 0, ...st }, row)
    if (m.ans) el('div', { fontFamily: MONO, fontSize: '12px', letterSpacing: '0.14em', color: '#f2c75c', marginBottom: '4px' }, b, m.lab)
    el('div', {}, b, m.text)
    let dots = null
    if (m.dots) {
      const box = el('div', { position: 'absolute', top: 0, left: 0, padding: '15px 16px', borderRadius: '20px', background: 'rgba(52,35,95,0.95)', display: 'flex', gap: '6px', opacity: 0 }, row)
      dots = { box, d: [0, 1, 2].map(() => el('div', { width: '8px', height: '8px', borderRadius: '50%', background: C.bone }, box)) }
    }
    return { ...m, row, b, dots }
  })
  // the card that lives in the phone from LAND on
  const tcard = el('div', { position: 'absolute', left: (PHW / 2 - TCW / 2) + 'px', top: (TC_Y - TCH / 2) + 'px', width: TCW + 'px', height: TCH + 'px', display: 'none' }, al)
  const tring = el('div', { position: 'absolute', inset: '-30%', borderRadius: '50%', opacity: 0, background: 'radial-gradient(closest-side, rgba(242,199,92,0.7), rgba(242,199,92,0.2) 60%, rgba(242,199,92,0) 100%)' }, tcard)
  img(tcard, A + 'card-talk-1.png', { left: 0, top: 0, width: '100%', height: '100%' })

  // ── the dealt card (scene space, 3D flip)
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '2200px' }, objs)
  const ring = el('div', { position: 'absolute', left: -(FW * 0.75) + 'px', top: -(FH * 0.68) + 'px', width: FW * 1.5 + 'px', height: FH * 1.36 + 'px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(242,199,92,0.45), rgba(242,160,120,0.16) 55%, rgba(242,199,92,0) 100%)' }, persp)
  const cardG = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d', willChange: 'transform', opacity: 0 }, persp)
  const back = el('div', { position: 'absolute', left: -BW / 2 + 'px', top: -BH / 2 + 'px', width: BW + 'px', height: BH + 'px', backfaceVisibility: 'hidden' }, cardG)
  img(back, A + 'card-back.png', { left: 0, top: 0, width: '100%', height: '100%', filter: 'drop-shadow(0 30px 40px rgba(4,2,14,0.55))' })
  const front = el('div', { position: 'absolute', left: -FW / 2 + 'px', top: -FH / 2 + 'px', width: FW + 'px', height: FH + 'px', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }, cardG)
  img(front, A + 'card-talk-1.png', { left: 0, top: 0, width: '100%', height: '100%', filter: 'drop-shadow(0 30px 40px rgba(4,2,14,0.55))' })
  const clip = el('div', { position: 'absolute', left: '6%', top: '4%', width: '88%', height: '92%', borderRadius: '6%', overflow: 'hidden', mixBlendMode: 'screen' }, front)
  const sheen = el('div', { position: 'absolute', left: '-60%', top: '-30%', width: '45%', height: '160%', transform: 'rotate(20deg)', opacity: 0,
    background: 'linear-gradient(90deg, rgba(255,226,160,0) 0%, rgba(255,226,160,0.45) 40%, rgba(255,252,240,0.85) 50%, rgba(255,226,160,0.45) 60%, rgba(255,226,160,0) 100%)' }, clip)

  // ── pixel stars, grain, type, black
  const pxC = layerCanvas(root), px = pxC.getContext('2d')
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(grainOpacity(1)), pointerEvents: 'none' }), gx = gC.getContext('2d')
  const type = fill(root, { background: 'transparent', pointerEvents: 'none' })
  const SHADOW = '0 2px 34px rgba(3,4,8,0.95), 0 0 3px rgba(3,4,8,0.7)'
  const words = (parent, text, size, align) => {
    const row = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: size + 'px', lineHeight: 1.08, color: C.bone, whiteSpace: 'nowrap', textAlign: align, textShadow: SHADOW }, parent)
    return text.split(' ').map((w, i, a) => el('span', { display: 'inline-block', marginRight: i < a.length - 1 ? '0.22em' : '0', opacity: 0 }, row, w))
  }
  const cap1Box = el('div', { position: 'absolute', left: '150px', top: '420px' }, type)
  const cap1 = words(cap1Box, 'Stuck on ‘hey’.', 124, 'left')
  const cap2Box = el('div', { position: 'absolute', left: (CX - 640) + 'px', width: '1280px', top: '842px', textAlign: 'center', isolation: 'isolate' }, type)
  el('div', { position: 'absolute', left: '140px', width: '1000px', top: '-90px', height: '330px', zIndex: -1,
    background: 'radial-gradient(closest-side, rgba(11,6,32,0.55), rgba(11,6,32,0.32) 55%, rgba(11,6,32,0) 100%)' }, cap2Box)
  const eye = el('div', { fontFamily: MONO, fontSize: '28px', letterSpacing: '0.22em', textIndent: '0.22em', color: C.bone, opacity: 0, marginBottom: '10px', textShadow: '0 0 16px rgba(8,4,24,0.85)' }, cap2Box, 'TALK CARDS')
  const cap2 = words(cap2Box, 'Start with a real question.', 92, 'center')
  const end = buildEnd(type)
  const black = fill(root, { background: '#000', opacity: 0 })

  // ── motion
  function pose(t) {
    // the loop: pushes in and starts to shake as it speeds up; then glides to the answer pose
    const sp = speed(t)
    const push = ease.inQuad(prog(t, 0, T.STOP))
    const jolt = tw(t, [[T.STOP - 0.02, 0], [T.STOP + 0.04, 1, ease.outQuad], [T.STOP + 0.35, 0, ease.outQuad]])
    const shake = 1.5 + 5 * sp
    const p0 = { x: 1300 + (noise1(t * 9, 3) - 0.5) * shake, y: 556 + (noise1(t * 9, 4) - 0.5) * shake - 6 * jolt, s: 1.1 + 0.07 * push - 0.012 * jolt, r: -2.5 }
    const m = ease.inOutCubic(prog(t, T.MOVE[0], T.MOVE[1]))
    const pu = ease.inOutCubic(prog(t, T.PUSH[0], T.PUSH[1]))
    const ex = ease.inCubic(prog(t, T.EXIT[0], T.EXIT[1]))
    const f = 1 + 0.012 * prog(t, T.MOVE[1], T.PUSH[0])
    return { x: lerp(p0.x, 1330, m) - 20 * pu, y: lerp(p0.y, 540, m) + 30 * pu + 150 * ex, s: lerp(p0.s, 1.0, m) * f * lerp(1, 1.24, pu), r: lerp(p0.r, 0, m) }
  }
  function toScene(t, lx, ly) {
    const P = pose(t), a = P.r * Math.PI / 180
    const dx = (lx - PHW / 2) * P.s, dy = (ly - ANCH) * P.s
    return { x: P.x + dx * Math.cos(a) - dy * Math.sin(a), y: P.y + dx * Math.sin(a) + dy * Math.cos(a), s: P.s }
  }
  // loop speed 0..1 (scroll velocity, for blur/shake)
  const vel = t => Math.abs(scrollAt(t + 1 / 60) - scrollAt(t - 1 / 60)) * 30
  function speed(t) { return t > T.STOP + 0.4 ? 0 : clamp(vel(t) / 900) }
  function cardState(t) {
    const p = prog(t, T.FLY0, T.FLY1), e = ease.outCubic(p)
    let x = lerp(ORG.x, CX, e), y = lerp(ORG.y, CY, e) - Math.sin(Math.PI * e) * 60
    let s = lerp(0.05, 1, e), rz = lerp(-28, 0, ease.outQuad(p))
    const f = ease.inOutCubic(prog(t, T.FLIP0, T.FLIP1))
    const settle = prog(t, T.FLIP1, T.FLIP1 + 0.8) * (1 - prog(t, T.MOVE0, T.MOVE0 + 0.3))
    const ry = 180 * f + Math.sin((t - T.FLIP1) * 1.1) * 4 * settle
    y += Math.sin((t - T.FLIP1) * 1.3) * 6 * settle
    s *= 1 + 0.05 * Math.sin(Math.PI * f) + 0.015 * prog(t, T.FLIP1, T.MOVE0)
    const m = ease.inOutCubic(prog(t, T.MOVE0, T.LAND))
    if (m > 0) { const tg = toScene(t, PHW / 2, TC_Y); x = lerp(x, tg.x, m); y = lerp(y, tg.y, m); s = lerp(s, (TCW / FW) * tg.s, m) }
    return { x, y, s, rz: rz * (1 - m), ry, z: Math.sin(Math.PI * f) * 80 }
  }

  // pixel field (after the bloom), kept off the card, caption, phone and moon
  const fr0 = rng(4404), PIXC = ['#e8628a', '#f2c75c', '#9a7be0', '#f29a4a', '#ff8fb1', '#c9a6ff', '#ffd98a']
  const FIELD = []
  while (FIELD.length < 20) {
    const x = fr0() * W, y = fr0() * H
    if (x > 230 && x < 1720 && y > 60 && y < 1010) continue
    if (x > 1640 && y < 260) continue
    FIELD.push({ x, y, s: fr0() < 0.3 ? 28 : 21, col: PIXC[Math.floor(fr0() * PIXC.length)], ph: fr0() * 6.28, sp: 2 + fr0() * 3, kind: Math.floor(fr0() * 4), t0: 5.6 + fr0() * 1.4 })
  }
  const br = rng(1907)
  const burst = (n, d0, d1) => Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + br() * 0.35, d: d0 + br() * (d1 - d0), s: br() < 0.4 ? 28 : 21, col: ['#ffe2a0', '#fff6ea', '#f2c75c', '#ffbed6'][i % 4], dl: br() * 0.08 }))
  const B_FLIP = burst(18, 250, 400), B_LAND = burst(12, 50, 140)
  let layout = null, from = null

  return {
    start: 0, end: 15.01, root,
    update(t) {
      if (!layout) layout = msgs.map(m => ({ top: m.row.offsetTop, h: m.row.offsetHeight, left: m.b.offsetLeft, w: m.b.offsetWidth }))
      // ── sky: colour underneath; a cold grey copy on top with a hole that blooms out of the star
      const c = cam(t), mo = moonPose(t)
      drawSky(bx, t, { zoom: c.zoom, dx: c.dx, dy: c.dy, dim: 1, moon: mo })
      end.moonGlow(bx, t, mo)
      const bl = prog(t, T.BLOOM[0], T.BLOOM[1])
      if (bl < 1) {
        gy.globalCompositeOperation = 'source-over'; gy.clearRect(0, 0, W, H)
        gy.filter = 'grayscale(1) brightness(0.74) contrast(1.06)'; gy.drawImage(bgC, 0, 0); gy.filter = 'none'
        gy.globalCompositeOperation = 'color'; gy.fillStyle = 'rgba(70,98,150,0.55)'; gy.fillRect(0, 0, W, H)
        if (bl > 0) {
          const R = 2400 * ease.inOutCubic(bl), soft = 420
          gy.globalCompositeOperation = 'destination-out'
          const g = gy.createRadialGradient(ORG.x, ORG.y, Math.max(0, R - soft), ORG.x, ORG.y, R + 1)
          g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)')
          gy.fillStyle = g; gy.fillRect(0, 0, W, H)
          const inner = Math.max(0, R - soft)
          if (inner > 2) { gy.beginPath(); gy.arc(ORG.x, ORG.y, inner, 0, Math.PI * 2); gy.fillStyle = '#000'; gy.fill() }
        }
        gy.globalCompositeOperation = 'source-over'
        bx.drawImage(greyC, 0, 0)
      }

      // ── phone
      const P = pose(t)
      const exitOp = 1 - ease.inOutQuad(prog(t, T.EXIT[0] + 0.05, T.EXIT[1]))
      ph.style.display = exitOp > 0 ? 'block' : 'none'
      ph.style.opacity = String(exitOp)
      ph.style.transform = `translate(${P.x}px, ${P.y}px) rotate(${P.r}deg) scale(${P.s}) translate(${-(BZ + PHW / 2)}px, ${-(BZ + ANCH)}px)`
      // the app changes under a dip (never two headers at once): the cold chat fades out, then Align fades in
      const sw = ease.inOutQuad(prog(t, T.SWAP[0], T.SWAP[1]))
      const swMid = (T.SWAP[0] + T.SWAP[1]) / 2
      gen.style.opacity = String(1 - ease.inOutQuad(prog(t, T.SWAP[0], swMid)))
      al.style.opacity = String(ease.inOutQuad(prog(t, swMid, T.SWAP[1])))
      gen.style.display = t >= swMid ? 'none' : 'block'
      const ctr = toScene(t, PHW / 2, PHH / 2)
      const sp = speed(t)
      glowCold.style.opacity = String((1 - sw) * (0.85 + 0.25 * sp) * exitOp)
      glowCold.style.transform = `translate(${ctr.x}px, ${ctr.y}px) scale(${P.s})`
      const land = tw(t, [[T.LAND - 0.05, 0], [T.LAND + 0.12, 1, ease.outQuad], [T.LAND + 0.9, 0.2, ease.inOutQuad], [T.CHIP, 0.2], [T.CHIP + 0.2, 0.7, ease.outQuad], [T.CHIP + 1.0, 0.2, ease.inOutQuad]])
      glowWarm.style.opacity = String(sw * exitOp * (0.6 + 0.4 * land))
      glowWarm.style.transform = `translate(${ctr.x}px, ${ctr.y}px) scale(${P.s})`

      // the loop
      if (sw < 1) {
        const S = scrollAt(t)
        thread.style.transform = `translateY(${-S}px)`
        mb.setAttribute('stdDeviation', `0 ${Math.min(16, vel(t) / 30 * 0.3).toFixed(2)}`)
        loop.forEach((m, k) => {
          const a = prog(t, m.t, m.t + 0.08), p = ease.outBack(prog(t, m.t, m.t + 0.2))
          const nx = k + 1 < N_LOOP ? loop[k + 1].t : 99
          const grey = ease.inOutQuad(prog(t, nx + 0.05, nx + 0.4))
          m.b.style.opacity = String(a * (1 - 0.4 * grey))
          m.b.style.transform = `translateY(${(1 - p) * 12}px) scale(${lerp(0.88, 1, p)})`
          m.b.style.filter = grey > 0 ? `grayscale(${grey.toFixed(2)}) brightness(${1 - 0.15 * grey})` : ''
          if (m.sep) m.sep.style.opacity = String(prog(t, m.t - 0.06, m.t))
        })
        thread.style.filter = vel(t) > 60 ? 'url(#heyMB)' : 'none'
        receipt.style.opacity = String(ease.outQuad(prog(t, T.SEEN, T.SEEN + 0.15)))
      }

      // Align thread
      const lands = t >= T.LAND
      tcard.style.display = lands ? 'block' : 'none'
      tring.style.opacity = String(tw(t, [[T.LAND - 0.02, 0], [T.LAND + 0.08, 1, ease.outQuad], [T.LAND + 0.7, 0, ease.inOutQuad]]))
      chip.style.opacity = String(ease.outQuad(prog(t, T.CHIP, T.CHIP + 0.2)))
      msgs.forEach(m => {
        const p = ease.outBack(prog(t, m.show, m.show + 0.24)), a = prog(t, m.show, m.show + 0.1)
        m.b.style.opacity = String(a)
        m.b.style.transform = `translateY(${(1 - p) * 10}px) scale(${lerp(0.9, 1, p)})`
        if (m.dots) {
          const dIn = prog(t, m.dots, m.dots + 0.12), dOut = prog(t, m.show - 0.05, m.show + 0.05)
          m.dots.box.style.opacity = String(dIn * (1 - dOut))
          m.dots.d.forEach((d, i) => { const q = (t - m.dots) * 7.5 - i * 0.9; d.style.transform = `translateY(${-Math.max(0, Math.sin(q)) * 5}px)` })
        }
      })

      // ── dealt card
      const cs = cardState(t), on = t < T.LAND
      cardG.style.display = on && t >= T.FLY0 ? 'block' : 'none'
      cardG.style.opacity = String(ease.outQuad(prog(t, T.FLY0, T.FLY0 + 0.16)))
      cardG.style.transform = `translate(${cs.x}px, ${cs.y}px) translateZ(${cs.z}px) rotateZ(${cs.rz}deg) rotateY(${cs.ry}deg) scale(${cs.s})`
      ring.style.opacity = String(on ? tw(t, [[T.FLASH - 0.04, 0], [T.FLASH + 0.08, 0.9, ease.outQuad], [T.FLASH + 0.9, 0.28, ease.inOutQuad], [T.MOVE0, 0.28], [T.MOVE0 + 0.3, 0]]) : 0)
      ring.style.transform = `translate(${cs.x}px, ${cs.y}px) scale(${cs.s})`
      const gp = prog(t, T.FLASH + 0.05, T.FLASH + 0.55)
      sheen.style.opacity = String(Math.sin(Math.PI * gp))
      sheen.style.left = lerp(-60, 120, ease.inOutQuad(gp)) + '%'

      // ── captions
      const o1 = 1 - ease.inOutQuad(prog(t, T.CAP1_OUT[0], T.CAP1_OUT[1]))
      cap1Box.style.display = o1 > 0 ? 'block' : 'none'
      cap1.forEach((w, i) => {
        const p = prog(t, T.CAP1 + i * 0.14, T.CAP1 + i * 0.14 + 0.42), e = ease.outCubic(p)
        w.style.opacity = String(e * o1)
        w.style.transform = `translateY(${(1 - e) * 16}px)`
        w.style.filter = p < 1 ? `blur(${((1 - e) * 7).toFixed(2)}px)` : 'none'
      })
      const o2 = 1 - ease.inOutQuad(prog(t, T.CAP2_OUT[0], T.CAP2_OUT[1]))
      cap2Box.style.display = t >= T.EYE && o2 > 0 ? 'block' : 'none'
      cap2Box.style.opacity = String(o2)
      eye.style.opacity = String(ease.outQuad(prog(t, T.EYE, T.EYE + 0.3)))
      cap2.forEach((w, i) => {
        const p = prog(t, T.CAP2 + i * 0.1, T.CAP2 + i * 0.1 + 0.42), e = ease.outCubic(p)
        w.style.opacity = String(e)
        w.style.transform = `translateY(${(1 - e) * 16}px)`
        w.style.filter = p < 1 ? `blur(${((1 - e) * 7).toFixed(2)}px)` : 'none'
      })
      end.update(t)

      // ── pixel layer
      px.clearRect(0, 0, W, H)
      const fr = Math.round(t * 30)
      px.imageSmoothingEnabled = false
      FIELD.forEach((s, i) => {
        const a = ease.outQuad(prog(t, s.t0, s.t0 + 0.4)) * (0.45 + 0.55 * Math.sin(t * s.sp + s.ph))
        if (a <= 0.02) return
        px.globalAlpha = a
        drawPixelStar(px, s.x + c.dx * 1.2, s.y + c.dy * 1.2, s.s, ((fr >> 1) + i) % 5 === 0 ? 2 : s.kind, s.col)
      })
      px.globalAlpha = 1
      // the star in the grey sky: glints, swells, deals the card, fades
      {
        const g = tw(t, [[T.GLINT - 0.1, 0], [T.GLINT + 0.2, 1, ease.outQuad], [T.FLY0 + 0.1, 0.9], [T.FLY0 + 0.7, 0, ease.inOutQuad]])
        if (g > 0.003) {
          px.globalCompositeOperation = 'lighter'; px.globalAlpha = g
          const R = 40 + 60 * g; px.drawImage(spriteS, ORG.x - R, ORG.y - R, R * 2, R * 2)
          px.globalCompositeOperation = 'source-over'
          drawPixelStar(px, ORG.x, ORG.y, g > 0.6 ? 35 : 28, 0, '#f2c75c', '#fff6dc')
          px.globalAlpha = 1
        }
      }
      if (t > T.FLY0 && t < T.FLY1 + 0.3) {
        for (let k = 1; k <= 6; k++) {
          const tt = t - k * 0.045
          if (tt < T.FLY0) break
          const s = cardState(tt)
          px.globalAlpha = (1 - k / 7) * (1 - prog(t, T.FLY1 - 0.1, T.FLY1 + 0.3)) * ((fr + k) % 3 === 0 ? 0.5 : 1)
          drawPixelStar(px, s.x + (k % 2 ? 10 : -10), s.y + (k % 3) * 8 - 8, 21, 2, k % 2 ? '#ffe2a0' : '#ffbed6')
        }
        px.globalAlpha = 1
      }
      const doBurst = (B, t0, x0, y0, r0 = 0) => B.forEach(b => {
        const p = prog(t, t0 + b.dl, t0 + b.dl + 0.75)
        if (p <= 0 || p >= 1) return
        const d = r0 + ease.outCubic(p) * b.d
        px.globalAlpha = (1 - ease.inQuad(p)) * ((fr + Math.round(b.a * 10)) % 3 === 0 ? 0.6 : 1)
        drawPixelStar(px, x0 + Math.cos(b.a) * d, y0 + Math.sin(b.a) * d * 0.9, b.s, p < 0.5 ? 0 : 2, b.col)
        px.globalAlpha = 1
      })
      doBurst(B_FLIP, T.FLASH, CX, CY)
      { const s = toScene(T.LAND, PHW / 2, TC_Y); doBurst(B_LAND, T.LAND, s.x, s.y, 120) }
      px.imageSmoothingEnabled = true
      if (t >= ET.STARS0) {
        if (!from) {
          const bs = i => { const L = layout[i]; return toScene(ET.STARS0, L.left + L.w / 2 + (msgs[i].who === 'me' ? 0 : 0), CLIP0 + L.top + L.h / 2) }
          from = [bs(MSGS.length - 1), bs(MSGS.length - 2)]
        }
        end.stars(px, t, from)
      }

      drawGrain(gx, t)
      black.style.opacity = String(ease.inOutQuad(prog(t, ET.OUT, ET.END)))
    },
  }
}

// ── sound
export const CUES = [
  ['riser', 0.4, T.STOP, 0.05],                                                     // the loop winds up
  ...LT.map((t, k) => k % 2 === 0 ? ['tick', t, 0.03 + 0.025 * k / N_LOOP] : (k < 14 ? ['bell', t, 1174.66, 0.018, 0.25, 0.25] : ['tick', t, 0.022])),
  ['tick', T.STOP, 0.08], ['boom', T.STOP + 0.02, 0.08],                           // …and sticks on "hey"
  ['bell', T.GLINT, 1174.66, 0.04, 2.0, 0.2],                                      // a star glints in the grey
  ['glitter', T.GLINT, T.GLINT + 0.6],
  ['riser', T.BLOOM[0], T.BLOOM[0] + 0.9, 0.04],                                   // colour blooms
  ['whoosh', T.FLY0, 0.65, 0.09],                                                  // dealt
  ['tick', T.FLIP0 + 0.2, 0.05],
  ['bell', T.FLASH, 880, 0.05, 2.2, -0.15], ['bell', T.FLASH + 0.03, 1318.51, 0.03, 1.6, -0.2],
  ['glitter', T.FLASH, T.FLASH + 0.55],
  ['bell', T.CAP2, 587.33, 0.04, 2.2, 0.15],                                       // "Start with a real question."
  ['whoosh', T.MOVE0 - 0.02, 0.6, 0.08],                                           // into the chat
  ['bell', T.LAND, 1174.66, 0.045, 1.6, 0.25], ['glitter', T.LAND, T.LAND + 0.45],
  ['tick', MSGS[0].show, 0.045], ['tick', MSGS[1].show, 0.045],
  ['bell', T.CHIP, 880, 0.04, 2.2, 0.2], ['bell', T.CHIP + 0.04, 1108.73, 0.03, 2.0, -0.2],
  ['tick', MSGS[2].show, 0.04], ['bell', MSGS[2].show, 1479.98, 0.022, 1.8, -0.1],
  ['whoosh', T.EXIT[0], 0.5, 0.05],
  ...endCues,
]
