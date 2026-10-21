// D2 · SEEN → GHOSTED (5.2–15.95). A personal example, big and slow. From d1's dark, a generic phone wakes and fills the
// left of the frame (phone ≈ 1800 px tall on stage, cropped; every word on it reads at ≥ 44 px). Your message "had a really
// good time tonight :)" and under it "Seen · 3 days ago". Caption "Seen. / Three days ago." You type "did I do something
// wrong?" … hold … and slowly delete it. The camera eases up to the header: "Ghosted." — Theo's picture and name fade to
// grain — "As if we were never there." Back to the message list: row by row it greys out (Seen · Seen · Unmatched …).
// The screen goes dark by 15.9; d3 picks up from that dark.
import { clamp, lerp, prog, ease, noise1, el } from '../../../../src/lib.js'
import { W, H, SANS, MONO, fill } from '../../../../src/scenes/common.js'
import { BONE, PHOTO, ROOM_BG, GRAIN, SILVER, grainLayer, words, capStyle, loadImage, dissolveAvatar } from './common.js'
import { D1_END } from './d1-stack.js'

export const D2_START = 5.2, D2_END = 15.95
const PW = 600, PH = 1300                         // phone screen (phone px)
const WAKE0 = 5.2, WAKE1 = 5.95                   // out of the dark, the screen wakes
const CAP1A = 5.95, CAP1B = 6.55, CAP1_OUT0 = 10.25, CAP1_OUT1 = 10.65
const TYPED = 'did I do something wrong?', TYPE0 = 7.85, TYPE_SPC = 0.045, ERASE0 = 9.45, ERASE_SPC = 0.032
const PULL0 = 10.5, PULL1 = 11.75                 // the camera eases up from the receipt to the header (Theo)
const CAP2A = 10.75, CAP2B = 11.45, CAP2_OUT0 = 15.25, CAP2_OUT1 = 15.62
const DISSOLVE0 = 11.35, DISSOLVE1 = 12.7         // Theo's picture + name fade to grain
const SLIDE0 = 12.85, SLIDE1 = 13.6               // back to the message list
const ROW0 = 13.55, ROW_GAP = 0.42                // list rows grey out one by one
const OFF0 = 15.25, OFF1 = 15.9                   // the screen goes dark
const CAM_S = 1.38

const ME_BG = '#435373', THEM_BG = '#2d323c'
const bubbleCss = (me) => ({ position: 'absolute', [me ? 'right' : 'left']: '26px', maxWidth: '450px', padding: '18px 26px', borderRadius: '34px',
  [me ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: '10px', background: me ? ME_BG : THEM_BG,
  fontFamily: SANS, fontSize: '34px', lineHeight: 1.28, color: me ? '#f0f2f7' : '#dcdfe6', fontWeight: 400 })

/** camera: phone point (fx, fy) lands on stage (sx, sy) at scale s, rotated rz */
function cam(t) {
  const drift = ease.inOutQuad(prog(t, WAKE0, PULL0))
  const c0 = { fx: 300, fy: lerp(985, 1010, drift), sx: 545, sy: 540, s: lerp(CAM_S - 0.02, CAM_S + 0.02, drift), rz: lerp(-2.2, -1.6, drift) }
  const k = ease.inOutCubic(prog(t, PULL0, PULL1))
  const out = ease.inOutQuad(prog(t, SLIDE0, OFF1))
  const c1 = { fx: 300, fy: lerp(445, 600, out), sx: 545, sy: 540, s: CAM_S, rz: lerp(-1.2, -0.7, out) }
  const L = (a) => lerp(c0[a], c1[a], k)
  return { fx: L('fx'), fy: L('fy'), sx: L('sx'), sy: L('sy'), s: L('s'), rz: L('rz') }
}

export default async function build(stage) {
  const root = fill(stage, { background: ROOM_BG })
  const [theoImg, ...rowImgs] = await Promise.all([PHOTO(4), PHOTO(7), PHOTO(9), PHOTO(1), PHOTO(8)].map(loadImage))

  // the room: a cold spill of phone light, wider and brighter than ghosted's
  const spill = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px',
    background: 'radial-gradient(60% 80% at 30% 52%, rgba(140,160,200,0.34) 0%, rgba(80,94,124,0.2) 50%, rgba(14,16,21,0) 100%)' }, root)
  const world = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformOrigin: '0 0' }, root)
  const phone = el('div', { position: 'absolute', left: '-14px', top: '-14px', width: PW + 28 + 'px', height: PH + 28 + 'px', borderRadius: '84px',
    background: 'linear-gradient(160deg, #343944 0%, #171a20 40%, #101217 100%)', boxShadow: '0 40px 120px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(190,200,220,0.14)' }, world)
  const screen = el('div', { position: 'absolute', left: '14px', top: '14px', width: PW + 'px', height: PH + 'px', borderRadius: '70px', overflow: 'hidden', background: '#1e222a' }, phone)
  const content = el('div', { position: 'absolute', inset: 0 }, screen)
  el('div', { position: 'absolute', inset: 0, borderRadius: '70px', pointerEvents: 'none',
    background: 'linear-gradient(118deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.03) 100%)' }, screen)

  // ── status bar
  const status = el('div', { position: 'absolute', left: 0, top: 0, width: PW + 'px', height: '70px', zIndex: 5 }, content)
  el('div', { position: 'absolute', left: '56px', top: '22px', fontFamily: SANS, fontWeight: 600, fontSize: '28px', color: '#dfe2e8' }, status, '1:47')
  const bars = el('div', { position: 'absolute', right: '120px', top: '30px', display: 'flex', gap: '4px', alignItems: 'flex-end' }, status)
  for (let i = 0; i < 4; i++) el('div', { width: '6px', height: 8 + i * 4 + 'px', borderRadius: '2px', background: i < 3 ? '#dfe2e8' : 'rgba(217,220,227,0.35)' }, bars)
  const batt = el('div', { position: 'absolute', right: '52px', top: '29px', width: '50px', height: '22px', borderRadius: '6px', border: '2px solid rgba(217,220,227,0.6)', boxSizing: 'border-box' }, status)
  el('div', { position: 'absolute', left: '2px', top: '2px', width: '9px', height: '14px', borderRadius: '3px', background: '#dfe2e8' }, batt)

  // ── THREAD view
  const thread = el('div', { position: 'absolute', left: 0, top: 0, width: PW + 'px', height: PH + 'px', background: '#1e222a' }, content)
  const head = el('div', { position: 'absolute', left: 0, top: '70px', width: PW + 'px', height: '140px', borderBottom: '1px solid rgba(255,255,255,0.08)' }, thread)
  el('div', { position: 'absolute', left: '26px', top: '22px', fontFamily: SANS, fontWeight: 300, fontSize: '70px', lineHeight: 1, color: '#939cb0' }, head, '‹')
  const theo = dissolveAvatar(head, theoImg, 96, { left: '80px', top: '22px' })
  const theoName = el('div', { position: 'absolute', left: '196px', top: '24px', fontFamily: SANS, fontWeight: 600, fontSize: '42px', color: '#eef0f4' }, head, 'Theo')
  const theoSub = el('div', { position: 'absolute', left: '197px', top: '78px', fontFamily: SANS, fontSize: '32px', color: '#8a91a2' }, head, 'met 3 weeks ago')
  el('div', { position: 'absolute', right: '36px', top: '46px', fontFamily: SANS, fontSize: '42px', color: '#939cb0', letterSpacing: '2px' }, head, '···')

  const bub = (me, text, top, extra = {}) => el('div', { ...bubbleCss(me), top: top + 'px', ...extra }, thread, text)
  const stamp = (text, top) => el('div', { position: 'absolute', left: 0, width: PW + 'px', top: top + 'px', textAlign: 'center', fontFamily: MONO, fontSize: '22px', letterSpacing: '0.12em', color: '#6a7180' }, thread, text)
  stamp('WED 7:12 PM', 246)
  bub(false, 'you have to try the dumpling place', 296, { opacity: 0.85 })
  bub(true, 'deal. saturday?', 442, { opacity: 0.85 })
  bub(false, 'saturday :)', 544, { opacity: 0.85 })
  stamp('SAT 11:48 PM', 660)
  bub(true, 'home safe!', 706)
  bub(false, 'glad. tonight was fun', 808)
  bub(true, 'had a really good time tonight :)', 910)
  el('div', { position: 'absolute', right: '30px', top: '1048px', fontFamily: SANS, fontSize: '32px', color: '#9aa1b0', fontWeight: 500 }, thread, 'Seen · 3 days ago')
  // composer
  const comp = el('div', { position: 'absolute', left: '22px', top: '1132px', width: '466px', height: '86px', borderRadius: '43px',
    border: '2px solid rgba(255,255,255,0.13)', background: 'rgba(255,255,255,0.04)', boxSizing: 'border-box' }, thread)
  const ph = el('div', { position: 'absolute', left: '24px', top: '20px', fontFamily: SANS, fontSize: '34px', color: '#6a7180' }, comp, 'Message')
  const typed = el('div', { position: 'absolute', left: '22px', top: '19px', fontFamily: SANS, fontSize: '33px', color: '#eef0f4', whiteSpace: 'pre' }, comp)
  const caret = el('span', { display: 'inline-block', width: '3px', height: '38px', marginLeft: '2px', verticalAlign: '-7px', background: '#8fb0ff' }, null)
  const send = el('div', { position: 'absolute', right: '22px', top: '1135px', width: '80px', height: '80px', borderRadius: '50%', background: '#2a303c' }, thread)
  el('div', { position: 'absolute', left: '0', width: '80px', top: '14px', textAlign: 'center', fontFamily: SANS, fontSize: '40px', color: '#6a7180' }, send, '↑')

  // ── LIST view (slides in from the left, like going back)
  const list = el('div', { position: 'absolute', left: 0, top: 0, width: PW + 'px', height: PH + 'px', background: '#1e222a' }, content)
  el('div', { position: 'absolute', left: '36px', top: '92px', fontFamily: SANS, fontWeight: 700, fontSize: '56px', color: '#eef0f4', letterSpacing: '-0.01em' }, list, 'Messages')
  const ROWS = [
    { name: 'Theo', msg: 'You: had a really good time', st: 'Seen · 3d', gone: 'Seen · 3d' },
    { name: 'Maya', msg: 'You: haha yes. you?', st: 'Seen · 1w', gone: 'Seen · 1w' },
    { name: 'Jun', msg: 'You: so when are you free?', st: 'Sent', gone: 'Gone' },
    { name: 'Nia', msg: 'You: that’s my favourite too', st: 'Seen · 2w', gone: 'Seen · 2w' },
    { name: 'Dev', msg: 'You: hey :)', st: 'Sent', gone: 'Gone' },
  ]
  const rows = ROWS.map((r, i) => {
    const y = 196 + i * 172
    const row = el('div', { position: 'absolute', left: 0, top: y + 'px', width: PW + 'px', height: '172px' }, list)
    const av = dissolveAvatar(row, i === 0 ? theoImg : rowImgs[i - 1], 108, { left: '26px', top: '32px' })
    const nm = el('div', { position: 'absolute', left: '154px', top: '30px', fontFamily: SANS, fontWeight: 600, fontSize: '40px', color: '#eef0f4' }, row, r.name)
    const ms = el('div', { position: 'absolute', left: '154px', top: '92px', width: '420px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: SANS, fontSize: '32px', color: '#959cab' }, row, r.msg)
    const stCss = { position: 'absolute', right: '26px', top: '38px', fontFamily: SANS, fontSize: '32px', fontWeight: 500, textAlign: 'right', color: '#8a91a2' }
    const st0 = el('div', stCss, row, r.st)
    const st1 = r.gone !== r.st ? el('div', { ...stCss, color: '#b47a84', opacity: 0 }, row, r.gone) : null
    el('div', { position: 'absolute', left: '154px', right: 0, bottom: 0, height: '1px', background: 'rgba(255,255,255,0.07)' }, row)
    return { row, av, nm, ms, st0, st1, t0: i === 0 ? -1 : ROW0 + (i - 1) * ROW_GAP }
  })

  // ── copy (right of the phone)
  const colCss = { position: 'absolute', left: '1030px', width: '840px', textAlign: 'center' }
  const box1 = el('div', { ...colCss, top: '398px' }, root)
  const c1a = words(box1, 'Seen.', { ...capStyle(124), position: 'relative', display: 'block' }, CAP1A, 0.16, 0.55)
  const c1b = words(box1, 'Three days ago.', { ...capStyle(124), position: 'relative', display: 'block' }, CAP1B, 0.16, 0.55)
  const box2 = el('div', { ...colCss, top: '318px' }, root)
  const c2a = words(box2, 'Ghosted.', { ...capStyle(132), position: 'relative', display: 'block', marginBottom: '34px' }, CAP2A, 0.16, 0.55)
  const c2b = words(box2, 'As if we were never there.', { ...capStyle(112), position: 'relative', display: 'block', whiteSpace: 'normal', padding: '0 70px' }, CAP2B, 0.13, 0.55)

  const dark = el('div', { position: 'absolute', inset: 0, background: ROOM_BG, zIndex: '3800', pointerEvents: 'none' }, root)
  const grain = grainLayer(root, GRAIN)
  const silver = grainLayer(root, SILVER, '3900', 'screen')

  const nType = TYPED.length, typeEnd = TYPE0 + nType * TYPE_SPC, eraseEnd = ERASE0 + nType * ERASE_SPC
  return {
    start: D2_START, end: D2_END, root,
    update(t) {
      const c = cam(t)
      const hx = (noise1(t * 0.35, 11) - 0.5) * 6, hy = (noise1(t * 0.3, 23) - 0.5) * 5        // a slow hand-held breath
      world.style.transform = `translate(${(c.sx + hx).toFixed(2)}px, ${(c.sy + hy).toFixed(2)}px) rotate(${c.rz.toFixed(3)}deg) scale(${c.s.toFixed(4)}) translate(${-c.fx}px, ${-c.fy}px)`

      // the screen: wakes out of the dark, goes dark at the end
      const on = lerp(0.4, 1, ease.inOutQuad(prog(t, WAKE0, WAKE1))) * (1 - ease.inOutQuad(prog(t, OFF0, OFF1)))
      content.style.filter = on < 0.999 ? `brightness(${on.toFixed(3)})` : 'none'
      spill.style.opacity = String(on)
      dark.style.opacity = String(Math.max(1 - ease.inOutQuad(prog(t, WAKE0, WAKE1)), ease.inOutQuad(prog(t, OFF0 + 0.1, OFF1))))

      // composer: types "did I do something wrong?" (0.045 s a letter) … holds … deletes it, slowly, all of it
      const nT = Math.floor(clamp((t - TYPE0) / TYPE_SPC, 0, nType))
      const nE = Math.floor(clamp((t - ERASE0) / ERASE_SPC, 0, nType))
      const n = t < ERASE0 ? nT : nType - nE
      typed.textContent = TYPED.slice(0, Math.max(0, n))
      const busy = (t > TYPE0 && t < typeEnd + 0.1) || (t > ERASE0 - 0.05 && t < eraseEnd)
      const blink = busy || Math.floor((t - TYPE0) * 30 / 16) % 2 === 0
      if (t >= TYPE0 - 0.5 && t < eraseEnd + 0.6 && blink) typed.appendChild(caret)
      ph.style.opacity = n > 0 || (t >= TYPE0 - 0.5 && t < eraseEnd + 0.6) ? '0' : '1'

      // Theo fades to grain: picture, then name and line
      const dk = ease.inOutQuad(prog(t, DISSOLVE0, DISSOLVE1))
      theo.draw(dk)
      const nk = ease.inOutQuad(prog(t, DISSOLVE0 + 0.3, DISSOLVE1))
      theoName.style.opacity = String(1 - nk); theoName.style.filter = nk > 0 && nk < 1 ? `blur(${(nk * 5).toFixed(2)}px)` : 'none'
      theoSub.style.opacity = String(1 - ease.inOutQuad(prog(t, DISSOLVE0, DISSOLVE0 + 0.8)))

      // back to the list
      // the chat fades out, then the list fades in (in sequence: never both screens' words at once)
      const SLIDE_MID = (SLIDE0 + SLIDE1) / 2
      const fo = ease.inOutQuad(prog(t, SLIDE0, SLIDE_MID)), sl = ease.inOutQuad(prog(t, SLIDE_MID, SLIDE1))
      thread.style.opacity = String(1 - fo)
      thread.style.transform = `translateX(${(fo * 40).toFixed(2)}px)`
      thread.style.display = fo < 1 ? 'block' : 'none'
      list.style.display = sl > 0 ? 'block' : 'none'
      list.style.opacity = String(sl)
      list.style.transform = `translateX(${((sl - 1) * 40).toFixed(2)}px)`
      list.style.background = 'transparent'
      for (const r of rows) {
        const g = r.t0 < 0 ? 1 : ease.inOutQuad(prog(t, r.t0, r.t0 + 0.8))
        r.av.draw(g)
        const tc = Math.round(lerp(238, 110, g))
        r.nm.style.color = `rgb(${tc},${tc + 2},${tc + 6})`
        r.ms.style.opacity = String(lerp(1, 0.55, g))
        if (r.st1) { r.st0.style.opacity = String(1 - ease.inOutQuad(prog(g, 0.2, 0.7))); r.st1.style.opacity = String(ease.inOutQuad(prog(g, 0.4, 0.9))) }
        r.row.style.opacity = String(lerp(1, 0.78, g))
      }

      // copy
      const o1 = 1 - ease.inOutQuad(prog(t, CAP1_OUT0, CAP1_OUT1))
      c1a.update(t, o1); c1b.update(t, o1)
      box1.style.display = o1 > 0 ? 'block' : 'none'
      const o2 = 1 - ease.inOutQuad(prog(t, CAP2_OUT0, CAP2_OUT1))
      c2a.update(t, o2); c2b.update(t, o2)
      grain.update(t); silver.update(t)
    },
  }
}
void D1_END; void BONE

export const cues = [
  ['tick', WAKE0 + 0.2, 0.03],                                            // the phone wakes
  ['bell', CAP1A, 196, 0.025, 2.8, -0.15],                                // "Seen." — low, alone
  ['bell', CAP1B, 164.81, 0.022, 3.2, -0.1],
  ...Array.from({ length: TYPED.length }, (_, i) => TYPED[i] === ' ' ? null : ['tick', TYPE0 + i * TYPE_SPC, 0.008 + 0.003 * ((i * 7) % 3)]).filter(Boolean),
  ...Array.from({ length: 8 }, (_, i) => ['tick', ERASE0 + i * 0.1, 0.01]),   // delete, delete, delete
  ['whoosh', PULL0, 1.2, 0.03],
  ['bell', CAP2A, 155.56, 0.025, 3.0, 0.1],                               // "Ghosted."
  ['whoosh', SLIDE0, 0.7, 0.03],
  ...Array.from({ length: 4 }, (_, i) => ['tick', ROW0 + i * ROW_GAP + 0.4, 0.012]),
  ['tick', OFF0 + 0.3, 0.03],                                             // screen off
]
