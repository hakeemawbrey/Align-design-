// A1 · SEEN (0–8.0). A dark room, one phone. Extreme close on a generic chat thread: your last message
// "had a really good time tonight :)" and under it the small grey "Seen · 3 days ago". You start typing
// "did I do something wrong?" … and delete it. Hook: "Seen. / 3 days ago." Then the camera pulls back, their
// avatar dissolves to grain, "Ghosted. / Again." — back to the thread list, where every row greys out
// (Seen · Seen · Unmatched …). The screen goes dark at 7.6; a2 picks up from the dark room at 8.0.
import { clamp, lerp, prog, ease, noise1, el } from '../../../../src/lib.js'
import { W, H, SANS, MONO, fill } from '../../../../src/scenes/common.js'
import { BONE, PHOTO, grainLayer, words, capStyle, loadImage, dissolveAvatar } from './common.js'

export const A1_END = 8.0
export const ROOM_BG = '#08090c'
export const A1_GRAIN = 0.5
const PW = 600, PH = 1300                        // phone screen (phone px)
const SCREEN_ON = 0.32, SCREEN_OFF = 7.75        // the screen wakes at the top, and goes dark at the end
const PULL0 = 4.3, PULL1 = 5.3                   // camera pulls back from the receipt to the header (Theo)
const DISSOLVE0 = 4.75, DISSOLVE1 = 5.6         // Theo's avatar + name fade to grain
const SLIDE0 = 5.78, SLIDE1 = 6.16               // back to the thread list
const ROW0 = 6.2, ROW_GAP = 0.17                 // list rows grey out one by one
const TYPE0 = 2.2, TYPED = 'did I do something wrong?', TYPE_CPS = 18, ERASE0 = 3.88, ERASE_CPS = 42

const ME_BG = '#34425c', THEM_BG = '#1d2129'
const bubbleCss = (me) => ({ position: 'absolute', [me ? 'right' : 'left']: '28px', maxWidth: '400px', padding: '16px 24px', borderRadius: '30px',
  [me ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: '10px', background: me ? ME_BG : THEM_BG,
  fontFamily: SANS, fontSize: '31px', lineHeight: 1.3, color: me ? '#eef1f6' : '#d6d9e0', fontWeight: 400 })

/** camera: phone point (fx, fy) lands on stage (sx, sy) at scale s, rotated rz */
function cam(t) {
  const close = { fx: 330, fy: 1075, sx: 660, sy: 560, s: 1.72, rz: -3.2 }
  const drift = ease.inOutQuad(prog(t, 0, PULL0))
  const c0 = { ...close, s: lerp(1.66, 1.8, drift), fy: lerp(1060, 1100, drift), rz: lerp(-3.4, -2.4, drift) }
  // header shot: Theo's avatar + name big enough to watch them go
  const k = ease.inOutCubic(prog(t, PULL0, PULL1))
  // then a slow pull out over the list: more and more rows
  const out = ease.inOutQuad(prog(t, SLIDE0 - 0.1, 7.5))
  const c1 = { fx: 300, fy: lerp(420, 640, out), sx: 640, sy: 540, s: lerp(1.22, 0.9, out), rz: lerp(-1.6, -0.7, out) }
  const L = (a, b) => lerp(c0[a], c1[a], k)
  return { fx: L('fx'), fy: L('fy'), sx: L('sx'), sy: L('sy'), s: L('s'), rz: L('rz') }
}

export default async function build(stage) {
  const root = fill(stage, { background: ROOM_BG })
  const [theoImg, ...rowImgs] = await Promise.all([PHOTO(4), PHOTO(7), PHOTO(9), PHOTO(1), PHOTO(8), PHOTO(6), PHOTO(5)].map(loadImage))

  // the room: near-black, a cold spill of phone light that breathes with the screen
  const spill = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px',
    background: 'radial-gradient(42% 62% at 34% 52%, rgba(120,140,180,0.22) 0%, rgba(60,72,98,0.1) 45%, rgba(8,9,12,0) 100%)' }, root)
  const world = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformOrigin: '0 0' }, root)
  // the phone: a thin cold rim (no device branding), screen inside
  const phone = el('div', { position: 'absolute', left: '-14px', top: '-14px', width: PW + 28 + 'px', height: PH + 28 + 'px', borderRadius: '84px',
    background: 'linear-gradient(160deg, #2a2e36 0%, #111318 40%, #0b0c10 100%)', boxShadow: '0 40px 120px rgba(0,0,0,0.7), inset 0 0 0 2px rgba(190,200,220,0.12)' }, world)
  const screen = el('div', { position: 'absolute', left: '14px', top: '14px', width: PW + 'px', height: PH + 'px', borderRadius: '70px', overflow: 'hidden', background: '#0c0e12' }, phone)
  const content = el('div', { position: 'absolute', inset: 0 }, screen)            // brightness lives here (screen on / off)
  const glass = el('div', { position: 'absolute', inset: 0, borderRadius: '70px', pointerEvents: 'none',
    background: 'linear-gradient(118deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.03) 100%)' }, screen)
  void glass

  // ── status bar (shared)
  const status = el('div', { position: 'absolute', left: 0, top: 0, width: PW + 'px', height: '70px', zIndex: 5 }, content)
  el('div', { position: 'absolute', left: '56px', top: '24px', fontFamily: SANS, fontWeight: 600, fontSize: '25px', color: '#d9dce3' }, status, '1:47')
  const bars = el('div', { position: 'absolute', right: '120px', top: '30px', display: 'flex', gap: '4px', alignItems: 'flex-end' }, status)
  for (let i = 0; i < 4; i++) el('div', { width: '6px', height: 8 + i * 4 + 'px', borderRadius: '2px', background: i < 3 ? '#d9dce3' : 'rgba(217,220,227,0.35)' }, bars)
  const batt = el('div', { position: 'absolute', right: '52px', top: '29px', width: '50px', height: '22px', borderRadius: '6px', border: '2px solid rgba(217,220,227,0.6)', boxSizing: 'border-box' }, status)
  el('div', { position: 'absolute', left: '2px', top: '2px', width: '9px', height: '14px', borderRadius: '3px', background: '#d9dce3' }, batt)

  // ── THREAD view
  const thread = el('div', { position: 'absolute', left: 0, top: 0, width: PW + 'px', height: PH + 'px' }, content)
  const head = el('div', { position: 'absolute', left: 0, top: '70px', width: PW + 'px', height: '128px', borderBottom: '1px solid rgba(255,255,255,0.07)' }, thread)
  el('div', { position: 'absolute', left: '28px', top: '18px', fontFamily: SANS, fontWeight: 300, fontSize: '64px', lineHeight: 1, color: '#8a93a6' }, head, '‹')
  const theo = dissolveAvatar(head, theoImg, 82, { left: '82px', top: '22px' })
  const theoName = el('div', { position: 'absolute', left: '186px', top: '30px', fontFamily: SANS, fontWeight: 600, fontSize: '33px', color: '#eceef2' }, head, 'Theo')
  const theoSub = el('div', { position: 'absolute', left: '187px', top: '74px', fontFamily: SANS, fontSize: '21px', color: '#7d8494' }, head, 'matched 3 weeks ago')
  // dots (more) on the right
  el('div', { position: 'absolute', right: '40px', top: '44px', fontFamily: SANS, fontSize: '40px', color: '#8a93a6', letterSpacing: '2px' }, head, '···')

  const msgs = el('div', { position: 'absolute', left: 0, top: '198px', width: PW + 'px', height: PH - 198 - 130 + 'px', overflow: 'hidden' }, thread)
  // older history (dimmer), then Saturday night, anchored to the bottom like a real thread
  const bub = (me, text, top, extra = {}) => el('div', { ...bubbleCss(me), top: top + 'px', ...extra }, msgs, text)
  const stamp = (text, top) => el('div', { position: 'absolute', left: 0, width: PW + 'px', top: top + 'px', textAlign: 'center', fontFamily: MONO, fontSize: '18px', letterSpacing: '0.12em', color: '#5d6472' }, msgs, text)
  stamp('WED 7:12 PM', 26)
  bub(false, 'ok you have to try the dumpling place', 70, { opacity: 0.8 })
  bub(true, 'deal. saturday?', 200, { opacity: 0.8 })
  bub(false, 'saturday :)', 290, { opacity: 0.8 })
  stamp('SAT 11:48 PM', 420)
  bub(true, 'home safe!', 466)
  bub(false, 'glad. tonight was fun', 556)
  const last = bub(true, 'had a really good time tonight :)', 646)
  const seen = el('div', { position: 'absolute', right: '34px', top: '782px', fontFamily: SANS, fontSize: '21px', color: '#7d8494', fontWeight: 500 }, msgs, 'Seen · 3 days ago')
  void last
  // composer
  const comp = el('div', { position: 'absolute', left: '26px', top: PH - 118 + 'px', width: PW - 52 - 84 + 'px', height: '74px', borderRadius: '37px',
    border: '2px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', boxSizing: 'border-box' }, thread)
  const ph = el('div', { position: 'absolute', left: '28px', top: '19px', fontFamily: SANS, fontSize: '27px', color: '#5d6472' }, comp, 'Message')
  const typed = el('div', { position: 'absolute', left: '28px', top: '18px', fontFamily: SANS, fontSize: '27px', color: '#eceef2', whiteSpace: 'pre' }, comp)
  const caret = el('span', { display: 'inline-block', width: '3px', height: '32px', marginLeft: '2px', verticalAlign: '-6px', background: '#8fb0ff' }, null)
  const send = el('div', { position: 'absolute', right: '26px', top: PH - 118 + 'px', width: '74px', height: '74px', borderRadius: '50%', background: '#232833' }, thread)
  el('div', { position: 'absolute', left: '22px', top: '14px', fontFamily: SANS, fontSize: '36px', color: '#5d6472' }, send, '↑')

  // ── LIST view (slides in from the left, like going back)
  const list = el('div', { position: 'absolute', left: 0, top: 0, width: PW + 'px', height: PH + 'px', background: '#0c0e12' }, content)
  el('div', { position: 'absolute', left: '40px', top: '96px', fontFamily: SANS, fontWeight: 700, fontSize: '50px', color: '#eceef2', letterSpacing: '-0.01em' }, list, 'Messages')
  const ROWS = [
    { name: 'Theo', msg: 'You: had a really good time tonight :)', st: 'Seen · 3d', gone: 'Seen · 3d' },
    { name: 'Maya', msg: 'You: haha yes. you?', st: 'Seen · 1w', gone: 'Seen · 1w' },
    { name: 'Jun', msg: 'You: so when are you free?', st: 'Delivered', gone: 'Unmatched' },
    { name: 'Nia', msg: 'You: wait, that’s my favourite too', st: 'Seen · 2w', gone: 'Seen · 2w' },
    { name: 'Dev', msg: 'You: hey :)', st: 'Delivered', gone: 'Unmatched' },
    { name: 'Cole', msg: 'You: it was really nice meeting you', st: 'Seen · 3w', gone: 'Seen · 3w' },
    { name: 'Ama', msg: 'You: how was the trip?', st: 'Seen · 1mo', gone: 'Seen · 1mo' },
  ]
  const rows = ROWS.map((r, i) => {
    const y = 196 + i * 142
    const row = el('div', { position: 'absolute', left: 0, top: y + 'px', width: PW + 'px', height: '142px' }, list)
    const av = dissolveAvatar(row, i === 0 ? theoImg : rowImgs[i - 1], 96, { left: '34px', top: '23px' })
    const nm = el('div', { position: 'absolute', left: '154px', top: '32px', fontFamily: SANS, fontWeight: 600, fontSize: '30px', color: '#eceef2' }, row, r.name)
    const ms = el('div', { position: 'absolute', left: '154px', top: '78px', width: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: SANS, fontSize: '23px', color: '#8a91a0' }, row, r.msg)
    const st = el('div', { position: 'absolute', right: '36px', top: '38px', fontFamily: SANS, fontSize: '21px', fontWeight: 500, color: '#7d8494', textAlign: 'right' }, row, r.st)
    el('div', { position: 'absolute', left: '154px', right: 0, bottom: 0, height: '1px', background: 'rgba(255,255,255,0.06)' }, row)
    return { row, av, nm, ms, st, r, t0: ROW0 + i * ROW_GAP + (i === 0 ? -0.2 : 0) }
  })

  // ── copy (right of the phone): "Seen. / 3 days ago." then "Ghosted. / Again."
  const capBox = el('div', { position: 'absolute', left: '1150px', width: '720px', top: '386px', textAlign: 'center' }, root)
  const c1a = words(capBox, 'Seen.', { ...capStyle(124), position: 'relative', display: 'block' }, 0.5, 0.1, 0.3)
  const c1b = words(capBox, '3 days ago.', { ...capStyle(124), position: 'relative', display: 'block' }, 1.1, 0.12, 0.3)
  const capBox2 = el('div', { position: 'absolute', left: '1150px', width: '720px', top: '386px', textAlign: 'center' }, root)
  const c2a = words(capBox2, 'Ghosted.', { ...capStyle(124), position: 'relative', display: 'block' }, 4.8, 0.1, 0.3)
  const c2b = words(capBox2, 'Again.', { ...capStyle(124), position: 'relative', display: 'block' }, 5.5, 0.1, 0.3)

  const grain = grainLayer(root, A1_GRAIN)
  const lift = grainLayer(root, 0.07, '3999', 'screen')            // silver in the blacks: the dark room is never flat

  return {
    start: 0, end: A1_END, root,
    update(t) {
      const c = cam(t)
      // a hand-held breath on the close shot (sub-pixel, slow)
      const hx = (noise1(t * 0.6, 11) - 0.5) * 10, hy = (noise1(t * 0.5, 23) - 0.5) * 8
      world.style.opacity = String(1 - ease.inQuad(prog(t, SCREEN_OFF, SCREEN_OFF + 0.22)))
      world.style.transform = `translate(${c.sx + hx}px, ${c.sy + hy}px) rotate(${c.rz}deg) scale(${c.s}) translate(${-c.fx}px, ${-c.fy}px)`

      // screen on (the phone is checked again) → screen off at the end
      const on = lerp(0.35, 1, ease.outCubic(prog(t, 0, SCREEN_ON))) * (1 - ease.inQuad(prog(t, SCREEN_OFF, SCREEN_OFF + 0.16)))
      content.style.filter = on < 0.999 ? `brightness(${on.toFixed(3)})` : 'none'
      content.style.opacity = '1'
      spill.style.opacity = String(on * (0.85 + 0.15 * noise1(t * 2, 5)))

      // composer: types "did I do something wrong?" … then deletes it, all of it
      const nType = Math.floor(clamp((t - TYPE0) * TYPE_CPS, 0, TYPED.length))
      const nErase = Math.floor(clamp((t - ERASE0) * ERASE_CPS, 0, TYPED.length))
      const n = t < ERASE0 ? nType : TYPED.length - nErase
      const typing = t >= TYPE0 - 0.25 && t < ERASE0 + TYPED.length / ERASE_CPS + 0.4
      typed.textContent = TYPED.slice(0, Math.max(0, n))
      const blink = Math.floor(t * 30 / 8) % 2 === 0 || (t > TYPE0 && t < ERASE0 + 0.8)
      if (typing && blink) typed.appendChild(caret)
      ph.style.opacity = n > 0 ? '0' : '1'

      // Theo dissolves: avatar to grain, name and line fade to nothing
      const dk = ease.inOutQuad(prog(t, DISSOLVE0, DISSOLVE1))
      theo.draw(dk)
      theoName.style.opacity = String(1 - dk); theoName.style.filter = dk > 0 && dk < 1 ? `blur(${(dk * 6).toFixed(2)}px)` : 'none'
      theoSub.style.opacity = String(1 - ease.outQuad(prog(t, DISSOLVE0 - 0.1, DISSOLVE0 + 0.5)))

      // back to the list
      const sl = ease.inOutCubic(prog(t, SLIDE0, SLIDE1))
      list.style.display = sl > 0 ? 'block' : 'none'
      list.style.transform = `translateX(${(-1 + sl) * PW * 0.32}px)`
      list.style.opacity = String(sl)
      thread.style.transform = `translateX(${sl * PW}px)`
      thread.style.display = sl < 1 ? 'block' : 'none'
      list.style.boxShadow = sl < 1 ? '20px 0 40px rgba(0,0,0,0.5)' : 'none'
      // rows grey out, one by one
      for (const r of rows) {
        const g = ease.inOutQuad(prog(t, r.t0, r.t0 + 0.55))
        r.av.draw(r === rows[0] ? 1 : g)
        const tc = Math.round(lerp(236, 92, r === rows[0] ? 1 : g))
        r.nm.style.color = `rgb(${tc},${tc + 2},${tc + 6})`
        r.ms.style.opacity = String(lerp(1, 0.45, r === rows[0] ? 1 : g))
        const swap = g > 0.5
        r.st.textContent = swap ? r.r.gone : r.r.st
        r.st.style.color = swap && r.r.gone === 'Unmatched' ? '#9a6a72' : '#7d8494'
        r.row.style.opacity = String(lerp(1, 0.72, r === rows[0] ? 1 : g))
      }

      // copy
      const out1 = 1 - ease.inOutQuad(prog(t, 4.12, 4.42))
      c1a.update(t, out1); c1b.update(t, out1)
      const out2 = 1 - ease.inOutQuad(prog(t, 7.4, 7.75))
      c2a.update(t, out2); c2b.update(t, out2)
      seen.style.opacity = '1'
      grain.update(t); lift.update(t)
    },
  }
}

export const cues = [
  ['tick', 0.04, 0.05],                                                   // the phone wakes
  ['bell', 0.5, 196, 0.035, 2.4, -0.2],                                   // "Seen." — low, alone
  ['bell', 1.1, 164.81, 0.03, 2.8, -0.15],
  ...Array.from({ length: TYPED.length }, (_, i) => ['tick', TYPE0 + i / TYPE_CPS, 0.012 + 0.006 * ((i * 7) % 3)]),
  ...Array.from({ length: 6 }, (_, i) => ['tick', ERASE0 + i * 0.13, 0.016]),   // delete, delete, delete
  ['whoosh', PULL0, 1.0, 0.05],
  ['bell', 4.8, 155.56, 0.035, 2.6, 0.15],                               // "Ghosted."
  ['whoosh', SLIDE0, 0.4, 0.06],
  ...Array.from({ length: 7 }, (_, i) => ['tick', ROW0 + i * ROW_GAP + 0.25, 0.02]),
  ['tick', SCREEN_OFF, 0.07],                                             // screen off
]
