// Half b · THE TALK DECK (15.0–25.2): one talk card is dealt out of the stars and flips (Wheel of Fortune,
// "What's worth spending real money on?"), a hand fans behind it, then it drops into the phone's card-of-the-day
// slot, is played, and two answers open at once; the conversation keeps going ("I really do.").
// Builds into two layers: objs (card + phone, under the grain) and type (captions, above the grain).
// Timing (sound):
//   15.12–15.45 a star glints high right (1230, 300) · 15.30–16.02 a card back is dealt out of it, spinning in
//   15.90–16.38 it flips: Wheel of Fortune face · 16.40 gold ring + pixel burst · 16.45–16.85 glint sweep
//   15.95 eyebrow "THE TALK DECK" · 16.05 "No small talk." (out 17.62–17.84) · 17.94 "Real questions." (out 19.42–19.64)
//   18.10–18.45 two more talk cards fan out behind it (The Fool, The Sun) · 19.28–19.55 they tuck away
//   19.50–20.20 the phone rises (screen: chat + talk-card hand) and the card shrinks into its card-of-the-day slot
//   20.20 lands (gold flash) · 20.38–20.95 "Play it to Juniper" glows, pressed 20.70
//   20.35 "Then you talk in cards." (out 22.38–22.60)
//   20.85–21.30 the sheet closes into the chat; the card settles into the thread
//   21.35 / 21.60 both answer (sealed, blurred) · 21.95 BOTH ANSWERED · 22.00–22.35 both answers open together
//   22.70 "And someone / finally listens." (out with the exit) · Juniper asks back 23.05, you 23.70, "I really do." 24.25
//   24.75–25.20 phone + captions drift down and fade into the sky
import { clamp, lerp, prog, ease, tw, el, C } from '../../../../src/lib.js'
import { W, H, A, SERIF, MONO, SANS, fill, img } from '../../../../src/scenes/common.js'

export const TT = {
  GLINT: 15.12, FLY0: 15.3, FLY1: 16.02, FLIP0: 15.9, FLIP1: 16.38, FLASH: 16.4,
  FAN0: 18.1, FAN1: 18.45, TUCK0: 19.28, TUCK1: 19.55,
  MOVE0: 19.5, LAND: 20.2, PH0: 19.5, PH1: 20.1, BTN: 20.38, PRESS: 20.7, SCR0: 20.85, SCR1: 21.3,
  SEAL: [21.35, 21.6], BOTH: 21.95, OPEN0: 22.0, OPEN1: 22.35,
  PUSH0: 21.3, PUSH1: 21.6, EXIT0: 25.35, EXIT1: 25.8,
}
export const CAPS = [
  { text: 'No small talk.', fs: 104, t0: 16.05, t1: 17.62 },
  { text: 'Real questions.', fs: 104, t0: 17.94, t1: 19.42 },
  { text: 'Then you talk in cards.', fs: 88, t0: 20.35, t1: 22.38 },
  { text: 'And someone<br>finally listens.', fs: 88, t0: 22.7, t1: 99 },
]
const EYE0 = 15.95
// messages in the thread: answers (sealed → open together), then the conversation keeps going
export const MSGS = [
  { who: 'j', ans: true, text: 'Flights home to see my grandma.', show: 21.35 },
  { who: 'me', ans: true, text: 'Live music. I cry at every show.', show: 21.6 },
  { who: 'j', text: 'Wait. Which show made you cry?', dots: 22.72, show: 23.05 },
  { who: 'me', text: 'You actually want to know?', dots: 23.4, show: 23.7 },
  { who: 'j', text: 'I really do.', dots: 23.95, show: 24.25 },
]

export const ORG = { x: 1230, y: 300 }               // the star the card is dealt out of
export const CX = 600, CY = 520                      // the dealt card's rest (scene)
const FH = 780, FW = FH * 1176 / 1884                // card-talk-daily face (glow margin incl.; frame ≈ 0.84 w × 0.90 h)
const BH = FH * 0.90 / 0.89, BW = BH * 1528 / 2347   // card-back, frame height matched to the face
const FAN_H = 700, FAN_W = FAN_H * 732 / 1170
const FAN = [{ src: 'card-talk-1.png', dx: -112, rz: -9 }, { src: 'card-talk-3.png', dx: 112, rz: 9 }]
const GROW = 1.15                                     // the face grows while it is read (16.4–17.3)
// phone
export const PX = 600, PY = 540
const PH = 900, PW = Math.round(PH * 1170 / 2532)   // 416
const K = PW / 1170
const SLOT = { x: 585 * K, y: 1605 * K, w: 593 * K }  // card-of-the-day slot on screen-chat-cards (as a card-talk-daily image)
const BTN = { x: 114 * K, y: (2304 - 81) * K, w: 942 * K, h: 162 * K }
const CLIP0 = 512 * K, CLIP1 = 2030 * K              // thread area between the cropped header and the input bar
const ANCH = 452                                     // push-in anchor: phone-local y of the thread centre
const PUSH_S = 1.40, PUSH_DX = -40, PUSH_DY = 35
const TCW = 132, TCY = 118                           // card in the thread: width, centre y inside the thread

export function buildTalk(objs, type) {
  // ── the dealt card (scene space, 3D flip)
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '2200px', zIndex: 3 }, objs)
  const fans = FAN.map(f => {
    const c = el('div', { position: 'absolute', left: 0, top: 0, width: FAN_W + 'px', height: FAN_H + 'px', marginLeft: -FAN_W / 2 + 'px', marginTop: -FAN_H / 2 + 'px', opacity: 0, willChange: 'transform' }, persp)
    img(c, A + f.src, { left: 0, top: 0, width: '100%', height: '100%', filter: 'drop-shadow(0 26px 34px rgba(4,2,14,0.6)) brightness(0.86)' })
    return { ...f, c }
  })
  const ring = el('div', { position: 'absolute', left: -(FW * 0.75) + 'px', top: -(FH * 0.68) + 'px', width: FW * 1.5 + 'px', height: FH * 1.36 + 'px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(242,199,92,0.5), rgba(242,160,120,0.18) 55%, rgba(242,199,92,0) 100%)' }, persp)
  const cardG = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d', willChange: 'transform', opacity: 0 }, persp)
  const back = el('div', { position: 'absolute', left: -BW / 2 + 'px', top: -BH / 2 + 'px', width: BW + 'px', height: BH + 'px', backfaceVisibility: 'hidden' }, cardG)
  img(back, A + 'card-back.png', { left: 0, top: 0, width: '100%', height: '100%', filter: 'drop-shadow(0 30px 40px rgba(4,2,14,0.55))' })
  const front = el('div', { position: 'absolute', left: -FW / 2 + 'px', top: -FH / 2 + 'px', width: FW + 'px', height: FH + 'px', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }, cardG)
  img(front, A + 'card-talk-daily.png', { left: 0, top: 0, width: '100%', height: '100%', filter: 'drop-shadow(0 30px 40px rgba(4,2,14,0.55))' })
  const clip = el('div', { position: 'absolute', left: '8%', top: '5%', width: '84%', height: '90%', borderRadius: '5%', overflow: 'hidden', mixBlendMode: 'screen' }, front)
  const sheen = el('div', { position: 'absolute', left: '-60%', top: '-30%', width: '45%', height: '160%', transform: 'rotate(20deg)', opacity: 0,
    background: 'linear-gradient(90deg, rgba(255,226,160,0) 0%, rgba(255,226,160,0.5) 40%, rgba(255,252,240,0.9) 50%, rgba(255,226,160,0.5) 60%, rgba(255,226,160,0) 100%)' }, clip)

  // ── the phone (2D: translate + scale only, so the card swap at LAND is pixel-exact)
  const aura = el('div', { position: 'absolute', left: (PX - 470) + 'px', top: (PY - 560) + 'px', width: '940px', height: '1120px', borderRadius: '50%', opacity: 0, zIndex: 1,
    background: 'radial-gradient(closest-side, rgba(242,170,140,0.42), rgba(180,120,255,0.22) 55%, rgba(180,92,255,0) 100%)' }, objs)
  const ph = el('div', { position: 'absolute', left: (PX - PW / 2) + 'px', top: (PY - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', opacity: 0, willChange: 'transform', zIndex: 2, transformOrigin: `${PW / 2}px ${ANCH}px` }, objs)
  const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '54px', overflow: 'hidden', background: C.canvas,
    boxShadow: '0 60px 120px rgba(4,2,14,0.7), 0 18px 40px rgba(4,2,14,0.45), 0 0 60px rgba(242,160,140,0.16), 0 0 0 1.5px rgba(239,230,214,0.35)' }, ph)
  const scrA = img(scr, A + 'screen-chat-cards.png', { left: 0, top: 0, width: '100%', height: '100%' })
  // the screenshot's own card-of-the-day is covered until the dealt card lands in its place (no doubled card)
  const plate = el('div', { position: 'absolute', left: 318 * K + 'px', top: 1160 * K + 'px', width: (852 - 318) * K + 'px', height: (2050 - 1160) * K + 'px', borderRadius: '14px',
    background: 'linear-gradient(180deg, rgb(31,16,67), rgb(26,15,55) 50%, rgb(21,13,46))', boxShadow: '0 0 10px 6px rgb(26,15,55)' }, scr)
  const btnGlow = el('div', { position: 'absolute', left: BTN.x + 'px', top: BTN.y + 'px', width: BTN.w + 'px', height: BTN.h + 'px', borderRadius: '999px', opacity: 0,
    boxShadow: '0 0 0 2px rgba(242,199,92,0.9), 0 0 28px rgba(242,199,92,0.75), 0 0 60px rgba(242,199,92,0.35)' }, scr)
  // chat (generic thread built here; header + input bar cropped from the app's own chat screen)
  const chat = fill(scr, { width: PW + 'px', height: PH + 'px', background: '#150b35', opacity: 0 })
  const hdr = el('div', { position: 'absolute', left: 0, top: 0, width: PW + 'px', height: CLIP0 + 'px', overflow: 'hidden' }, chat)
  img(hdr, A + 'screen-chat.png', { left: 0, top: 0, width: PW + 'px', height: PH + 'px' })
  const ftr = el('div', { position: 'absolute', left: 0, top: CLIP1 + 'px', width: PW + 'px', height: (PH - CLIP1) + 'px', overflow: 'hidden' }, chat)
  img(ftr, A + 'screen-chat.png', { left: 0, top: -CLIP1 + 'px', width: PW + 'px', height: PH + 'px' })
  const area = el('div', { position: 'absolute', left: 0, top: CLIP0 + 'px', width: PW + 'px', height: (CLIP1 - CLIP0) + 'px', overflow: 'hidden' }, chat)
  const thr = el('div', { position: 'absolute', left: 0, top: 0, width: PW + 'px', padding: '0 18px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px', willChange: 'transform' }, area)
  el('div', { height: (TCY * 2 - 6) + 'px', flex: 'none' }, thr)    // room for the played card
  const chip = el('div', { alignSelf: 'center', fontFamily: MONO, fontSize: '11px', letterSpacing: '0.2em', color: '#f2c75c', opacity: 0, padding: '2px 0 4px', textShadow: '0 0 10px rgba(242,199,92,0.6)' }, thr, '✦ BOTH ANSWERED ✦')
  const msgs = MSGS.map(m => {
    const row = el('div', { display: 'flex', justifyContent: m.who === 'me' ? 'flex-end' : 'flex-start', position: 'relative', flex: 'none' }, thr)
    const ansStyle = m.ans ? { background: m.who === 'me' ? 'linear-gradient(135deg, rgba(242,154,74,0.32), rgba(232,98,138,0.34))' : 'linear-gradient(135deg, rgba(232,98,138,0.26), rgba(154,123,224,0.32))',
      boxShadow: '0 0 0 1px rgba(242,199,92,0.55), 0 0 22px rgba(242,170,120,0.25)' } : { background: m.who === 'me' ? '#4a2982' : 'rgba(52,35,95,0.95)' }
    const b = el('div', { maxWidth: '274px', padding: '10px 15px 11px', borderRadius: m.who === 'me' ? '20px 20px 6px 20px' : '20px 20px 20px 6px', fontFamily: SANS, fontWeight: 400, fontSize: '18px', lineHeight: 1.3, color: C.bone, opacity: 0, ...ansStyle }, row)
    let lab = null, labOpen = null
    if (m.ans) {
      const lw = el('div', { position: 'relative', height: '16px', marginBottom: '4px', fontFamily: MONO, fontSize: '12px', letterSpacing: '0.14em', color: '#f2c75c' }, b)
      lab = el('div', { position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }, lw, 'ANSWERED · HIDDEN')
      labOpen = el('div', { position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', opacity: 0 }, lw, m.who === 'me' ? 'YOUR ANSWER' : 'JUNIPER')
    }
    const tx = el('div', {}, b, m.text)
    let dotsEl = null
    if (m.dots) {
      const dots = el('div', { position: 'absolute', top: 0, [m.who === 'me' ? 'right' : 'left']: 0, padding: '15px 16px', borderRadius: '20px', background: m.who === 'me' ? '#4a2982' : 'rgba(52,35,95,0.95)', display: 'flex', gap: '6px', opacity: 0 }, row)
      dotsEl = { box: dots, d: [0, 1, 2].map(() => el('div', { width: '8px', height: '8px', borderRadius: '50%', background: C.bone }, dots)) }
    }
    return { ...m, row, b, tx, lab, labOpen, dotsEl }
  })
  // the card that lives in the phone from LAND on (slot → thread)
  const tcard = el('div', { position: 'absolute', left: 0, top: 0, width: '10px', height: '10px', display: 'none' }, scr)
  img(tcard, A + 'card-talk-daily.png', { left: 0, top: 0, width: '100%', height: '100%' })
  const tring = el('div', { position: 'absolute', inset: '-30%', borderRadius: '50%', opacity: 0, background: 'radial-gradient(closest-side, rgba(242,199,92,0.7), rgba(242,199,92,0.2) 60%, rgba(242,199,92,0) 100%)' }, tcard)
  tcard.insertBefore(tring, tcard.firstChild)

  // ── captions (above the grain): mono eyebrow + one serif line at a time (never two at once)
  const capWrap = fill(type, { background: 'transparent' })
  const box = el('div', { position: 'absolute', left: '1010px', top: (H / 2 - 130) + 'px', textAlign: 'left', opacity: 0, isolation: 'isolate' }, capWrap)
  el('div', { position: 'absolute', left: '-300px', width: '1300px', top: '-150px', height: '560px', zIndex: -1,
    background: `radial-gradient(closest-side, ${[[0, 1], [25, 0.95], [48, 0.76], [66, 0.48], [82, 0.2], [100, 0]].map(([o, k]) => `rgba(11,6,32,${(0.62 * k).toFixed(3)}) ${o}%`).join(', ')})` }, box)
  const eye = el('div', { fontFamily: MONO, fontSize: '30px', letterSpacing: '0.22em', color: C.bone, textShadow: '0 0 16px rgba(8,4,24,0.85), 0 0 5px rgba(8,4,24,0.6)', marginBottom: '18px', whiteSpace: 'nowrap' }, box, 'THE TALK DECK')
  const lines = el('div', { position: 'relative' }, box)
  const caps = CAPS.map(c => {
    const e = el('div', { position: 'absolute', left: 0, top: 0, fontFamily: SERIF, fontStyle: 'italic', fontSize: c.fs + 'px', lineHeight: 1.04, color: C.bone, whiteSpace: 'nowrap', opacity: 0,
      textShadow: '0 0 26px rgba(8,4,24,0.75), 0 0 8px rgba(8,4,24,0.6), 0 2px 3px rgba(4,2,14,0.5)' }, lines)
    const words = []
    c.text.split('<br>').forEach((ln, li) => {
      if (li) el('br', {}, e)
      ln.split(' ').forEach((w, i, arr) => words.push(el('span', { display: 'inline-block', opacity: 0, marginRight: i < arr.length - 1 ? '0.24em' : '0' }, e, w)))
    })
    return { ...c, e, words }
  })

  let layout = null
  function measure() {
    // pure layout, measured once (fonts are ready before the first seek)
    const ys = msgs.map(m => ({ top: m.row.offsetTop, bot: m.row.offsetTop + m.row.offsetHeight }))
    const view = CLIP1 - CLIP0 - 18
    const steps = msgs.map((m, i) => ({ t: (m.dots ?? m.show) - 0.3, to: Math.max(0, ys[i].bot - view) }))
    layout = { ys, steps }
  }
  function scrollAt(t) {
    let s = 0
    for (const st of layout.steps) s = lerp(s, Math.max(s, st.to), ease.inOutCubic(prog(t, st.t, st.t + 0.38)))
    return s
  }
  // phone transform at t → { y, s, op }
  function phone(t) {
    const p = prog(t, TT.PH0, TT.PH1)
    const ex = ease.inCubic(prog(t, TT.EXIT0, TT.EXIT1))
    const push = ease.inOutCubic(prog(t, TT.PUSH0, TT.PUSH1))
    return { x: PUSH_DX * push, y: lerp(80, 0, ease.outCubic(p)) + ex * 140 + PUSH_DY * push, s: lerp(0.96, 1, ease.outCubic(p)) * (1 + 0.01 * prog(t, TT.PH1, TT.EXIT0)) * lerp(1, PUSH_S, push), op: ease.outQuad(prog(t, TT.PH0, TT.PH0 + 0.15)) }
  }
  /** scene position of a phone-local point (the phone scales about (PW/2, ANCH)) */
  function toScene(t, lx, ly) { const P = phone(t); return { x: PX + P.x + (lx - PW / 2) * P.s, y: PY - PH / 2 + ANCH + P.y + (ly - ANCH) * P.s, s: P.s } }

  /** dealt card state (scene) */
  function cardState(t) {
    const p = prog(t, TT.FLY0, TT.FLY1), e = ease.outCubic(p)
    let x = lerp(ORG.x, CX, e), y = lerp(ORG.y, CY, e) - Math.sin(Math.PI * e) * 70
    let s = lerp(0.05, 1, e), rz = lerp(32, 0, ease.outQuad(p))
    const f = ease.inOutCubic(prog(t, TT.FLIP0, TT.FLIP1))
    const settle = prog(t, TT.FLIP1, TT.FLIP1 + 0.8) * (1 - prog(t, TT.MOVE0, TT.MOVE0 + 0.4))
    let ry = 180 * f + Math.sin((t - TT.FLIP1) * 1.1) * 4 * settle
    y += Math.sin((t - TT.FLIP1) * 1.3) * 7 * settle
    s *= (1 + 0.05 * Math.sin(Math.PI * f) + 0.012 * prog(t, TT.FLIP1, TT.MOVE0)) * lerp(1, GROW, ease.inOutCubic(prog(t, TT.FLIP1, TT.FLIP1 + 0.9)))
    // into the phone slot
    const m = ease.inOutCubic(prog(t, TT.MOVE0, TT.LAND))
    if (m > 0) {
      const tg = toScene(t, SLOT.x, SLOT.y)
      x = lerp(x, tg.x, m); y = lerp(y, tg.y, m); s = lerp(s, SLOT.w / FW * tg.s, m)
    }
    return { x, y, s, rz, ry, z: Math.sin(Math.PI * f) * 80 }
  }

  return {
    cardState, toScene, PW, PH,
    update(t) {
      if (!layout) measure()
      // ── dealt card + fan
      const cs = cardState(t)
      const on = t < TT.LAND
      cardG.style.display = on ? 'block' : 'none'
      cardG.style.opacity = String(ease.outQuad(prog(t, TT.FLY0, TT.FLY0 + 0.16)))
      cardG.style.transform = `translate(${cs.x}px, ${cs.y}px) translateZ(${cs.z}px) rotateZ(${cs.rz}deg) rotateY(${cs.ry}deg) scale(${cs.s})`
      ring.style.opacity = String(on ? tw(t, [[TT.FLASH - 0.04, 0], [TT.FLASH + 0.08, 0.95, ease.outQuad], [TT.FLASH + 0.9, 0.3, ease.inOutQuad], [TT.MOVE0, 0.3], [TT.MOVE0 + 0.3, 0]]) : 0)
      ring.style.transform = `translate(${cs.x}px, ${cs.y}px) scale(${cs.s})`
      const gp = prog(t, TT.FLASH + 0.05, TT.FLASH + 0.5)
      sheen.style.opacity = String(Math.sin(Math.PI * gp))
      sheen.style.left = lerp(-60, 120, ease.inOutQuad(gp)) + '%'
      fans.forEach((f, i) => {
        const o = ease.outCubic(prog(t, TT.FAN0 + i * 0.05, TT.FAN1 + i * 0.05)), b = ease.inCubic(prog(t, TT.TUCK0, TT.TUCK1))
        const k = o * (1 - b)
        f.c.style.display = k > 0.001 ? 'block' : 'none'
        f.c.style.opacity = String(clamp(k * 3) * (1 - b))
        f.c.style.transform = `translate(${cs.x + f.dx * k}px, ${cs.y + 26 * k}px) rotateZ(${f.rz * k}deg) scale(${0.92 * cs.s})`
      })

      // ── phone
      const P = phone(t)
      const exitOp = 1 - ease.inOutQuad(prog(t, TT.EXIT0 + 0.05, TT.EXIT1))
      ph.style.display = t >= TT.PH0 ? 'block' : 'none'
      ph.style.opacity = String(P.op * exitOp)
      ph.style.transform = `translate(${P.x}px, ${P.y}px) scale(${P.s})`
      persp.style.zIndex = t < TT.LAND ? '3' : '0'
      plate.style.display = t < TT.LAND ? 'block' : 'none'
      aura.style.opacity = String(P.op * exitOp * (0.55 + 0.45 * tw(t, [[TT.LAND - 0.05, 0], [TT.LAND + 0.12, 1, ease.outQuad], [TT.LAND + 0.9, 0.2, ease.inOutQuad], [TT.OPEN0, 0.2], [TT.OPEN0 + 0.2, 0.8, ease.outQuad], [TT.OPEN1 + 0.8, 0.25, ease.inOutQuad]])))
      aura.style.transform = `translate(${P.x}px, ${P.y}px) scale(${lerp(1, 1.2, prog(P.s, 1.01, PUSH_S))})`
      btnGlow.style.opacity = String(tw(t, [[TT.BTN, 0], [TT.BTN + 0.2, 0.95, ease.outQuad], [TT.PRESS + 0.15, 0.6, ease.inOutQuad], [TT.SCR0 + 0.2, 0]]) * (0.85 + 0.15 * Math.sin((t - TT.BTN) * 6)))
      const press = tw(t, [[TT.PRESS - 0.06, 0], [TT.PRESS + 0.04, 1, ease.outQuad], [TT.PRESS + 0.22, 0, ease.inOutQuad]])
      btnGlow.style.transform = `scale(${1 - 0.04 * press})`
      const sw = ease.inOutQuad(prog(t, TT.SCR0, TT.SCR1))
      chat.style.opacity = String(sw)
      scrA.style.display = sw >= 1 ? 'none' : 'block'

      // the card inside the phone: slot → thread (then scrolls with it)
      const scroll = scrollAt(t)
      tcard.style.display = t >= TT.LAND ? 'block' : 'none'
      if (t >= TT.LAND) {
        const m = ease.inOutCubic(prog(t, TT.SCR0, TT.SCR1 + 0.05))
        const w = lerp(SLOT.w, TCW, m), h = w * 1884 / 1176
        const cx = lerp(SLOT.x, PW / 2, m), cy = lerp(SLOT.y, CLIP0 + TCY, m) - scroll
        tcard.style.left = (cx - w / 2) + 'px'; tcard.style.top = (cy - h / 2) + 'px'
        tcard.style.width = w + 'px'; tcard.style.height = h + 'px'
        const cut = Math.max(0, CLIP0 - (cy - h / 2))
        tcard.style.clipPath = cut > 0 ? `inset(${cut}px -60px 0 -60px)` : 'none'
        tring.style.opacity = String(tw(t, [[TT.LAND - 0.02, 0.9], [TT.LAND + 0.06, 1, ease.outQuad], [TT.LAND + 0.7, 0, ease.inOutQuad]]))
      }

      // ── thread
      thr.style.transform = `translateY(${-scroll}px)`
      chip.style.opacity = String(ease.outQuad(prog(t, TT.BOTH, TT.BOTH + 0.2)))
      chip.style.transform = `scale(${lerp(0.9, 1, ease.outBack(prog(t, TT.BOTH, TT.BOTH + 0.3)))})`
      msgs.forEach(m => {
        const p = ease.outCubic(prog(t, m.show, m.show + 0.28))
        m.b.style.opacity = String(p)
        m.b.style.transform = `translateY(${lerp(14, 0, p)}px) scale(${lerp(0.94, 1, p)})`
        m.b.style.transformOrigin = m.who === 'me' ? '100% 100%' : '0 100%'
        if (m.ans) {
          const o = ease.inOutQuad(prog(t, TT.OPEN0, TT.OPEN1))
          m.tx.style.filter = o < 1 ? `blur(${lerp(7, 0, o)}px)` : 'none'
          m.tx.style.opacity = String(lerp(0.55, 1, o))
          m.lab.style.opacity = String(1 - o); m.labOpen.style.opacity = String(o)
          const glow = tw(t, [[TT.OPEN0, 0], [TT.OPEN0 + 0.15, 1, ease.outQuad], [TT.OPEN1 + 0.7, 0.25, ease.inOutQuad]])
          m.b.style.boxShadow = `0 0 0 1px rgba(242,199,92,${0.45 + 0.45 * glow}), 0 0 ${22 + 20 * glow}px rgba(242,170,120,${0.22 + 0.4 * glow})`
        }
        if (m.dots) {
          const d = prog(t, m.dots, m.dots + 0.12) * (1 - prog(t, m.show - 0.04, m.show + 0.06))
          m.dotsEl.box.style.opacity = String(d)
          m.dotsEl.d.forEach((dd, i) => { dd.style.opacity = String(0.35 + 0.65 * Math.max(0, Math.sin((t - m.dots) * 9 - i * 0.9))) })
        }
      })

      // ── captions
      const exitC = ease.inCubic(prog(t, TT.EXIT0, TT.EXIT1))
      box.style.opacity = String(prog(t, EYE0, EYE0 + 0.16) * exitOp)
      eye.style.opacity = String(1 - ease.inQuad(prog(t, CAPS[1].t1, CAPS[1].t1 + 0.22)) * (1 - ease.outQuad(prog(t, CAPS[2].t0 - 0.05, CAPS[2].t0 + 0.15))))
      box.style.transform = `translate(${lerp(30, 0, ease.outCubic(prog(t, EYE0, EYE0 + 0.4)))}px, ${exitC * 140}px)`
      caps.forEach(c => {
        const out = ease.inQuad(prog(t, c.t1, c.t1 + 0.22))
        const vis = t >= c.t0 && out < 1
        c.e.style.display = vis ? 'block' : 'none'
        if (!vis) return
        c.e.style.opacity = String(1 - out)
        c.e.style.transform = `translateY(${-10 * out}px)`
        c.words.forEach((s, i) => {
          const p = ease.outCubic(prog(t, c.t0 + 0.04 + i * 0.07, c.t0 + 0.32 + i * 0.07))
          s.style.opacity = String(p)
          s.style.transform = `translateY(${lerp(18, 0, p)}px)`
          s.style.filter = p < 1 ? `blur(${(1 - p) * 6}px)` : 'none'
        })
      })
    },
    /** scene positions of the last two bubbles (for the end's two stars) */
    bubbleScene(t, i) {
      const m = msgs[i]
      const lx = m.who === 'me' ? PW - 4 : 4
      const ly = CLIP0 + m.row.offsetTop + m.row.offsetHeight / 2 - (layout ? scrollAt(t) : 0)
      return toScene(t, lx, ly)
    },
  }
}
