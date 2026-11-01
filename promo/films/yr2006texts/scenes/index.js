// yr2006texts (20 s vertical, Star Talk Then vs Now · 21) "Fingers faster. Heart the same." · chiptune G.
// The format's shared look lives in ./tvn.js (identical in all five Block E films). Story 0–15.6, then the end card.
//   THEN 2006  "Texting a crush | in *2006*"  ♋ Cancer, side-swept bangs over one eye, and a chunky flip phone with a
//              green backlit screen and number keys. Rule of three: (1) 7·7·7·7 just to get "s" (p… q… r… s),
//              sticker "7777 = s"; (2) 8·8·8 overshoots to "v", CLR, try again (sticker "too far."); (3) SEND, "Sent!"…
//              and the date stamp fast-forwards three days while Cancer falls asleep staring at it (sticker
//              "3 days later"). BZZT: "sup :)". Cancer goes heart-eyed; ♓ Pisces, bottom-left, bursts into tears.
//   card cut   7.267, on the switch.
//   NOW 2026   "Texting a crush | in *2026*"  Same Cancer, no bangs, a slim phone. The text types itself in 0.4 s
//              (sticker "typed in 0.4 s")… and then the nerves: thumb over SEND, delete, a longer version, delete,
//              the first version again (sticker "deleted it. twice."), the clock overlay ticks 7:02 → 7:19 PM.
//              Sent (sticker "sent after 17 min"). The reply is instant: "YES!! :)" "was hoping u'd ask". Cancer
//              faints with happiness; Pisces (tissue in hand) sobs.
//   PAYOFF     the 2006 polaroid top-left, NOW big. THE STARS: "the nerves never got an *update.*"
//              Last: "Fingers faster. | *Heart* the same."
import { makeTVN, BEAT, r3, INK, BONE, GOLD, PINK, HOT, INTER, MONO, clamp, lerp, prog, ease, easeOutBack } from './tvn.js'

const CAN = 'cancer'
const STAR_P = { x: 300, y: 1150, s: 280 }

// ── THEN: the flip phone's key presses (multi-tap) and screen states
const PRESS = [
  [0.95, '7'], [1.22, '7'], [1.49, '7'], [1.76, '7'],
  [2.30, '8'], [2.54, '8'], [2.78, '8'],
  [3.15, 'clr'], [3.45, '8'], [3.68, '8'], [4.0, '7'], [4.45, 'send'],
]
// the screen text over time: [t, committed, pending]
const TYPE = [
  [0, '', ''], [0.95, '', 'p'], [1.22, '', 'q'], [1.49, '', 'r'], [1.76, '', 's'],
  [2.30, 's', 't'], [2.54, 's', 'u'], [2.78, 's', 'v'], [3.15, 's', ''], [3.45, 's', 't'], [3.68, 's', 'u'],
  [4.0, 'su', 'p'], [4.3, 'sup', ''],
]
const TT = { send: 4.45, sent: 4.95, wait: 5.3, buzz: 6.15, reply: 6.35, dates: [5.4, 5.58, 5.76, 5.94] }
const KEYS = [['1', ''], ['2', 'abc'], ['3', 'def'], ['4', 'ghi'], ['5', 'jkl'], ['6', 'mno'], ['7', 'pqrs'], ['8', 'tuv'], ['9', 'wxyz'], ['*', ''], ['0', '+'], ['#', '']]
const FP = { cx: 745, top: 618, w: 330 }      // the flip phone

// ── NOW: drafts, the clock, the thread
const CUT = BEAT(12)
const NT = {
  in: CUT + 0.05, type1: [8.0, 8.37], del1: [9.0, 9.2], type2: [9.3, 9.72], del2: [9.82, 10.02], type3: [10.1, 10.47],
  send: 10.6, typing: [10.85, 11.2], reply: 11.2, reply2: 11.62, faint: 11.3,
}
const D1 = 'hey! free saturday? :)', D2 = 'hi :) so I was wondering if maybe you'
const SP = { cx: 745, top: 640, w: 330, h: 700 }  // the smartphone

function draftAt(t) {
  const typed = (s, [a, b]) => s.slice(0, Math.round(s.length * clamp((t - a) / (b - a))))
  const del = (s, [a, b]) => s.slice(0, Math.round(s.length * (1 - clamp((t - a) / (b - a)))))
  if (t < NT.type1[0]) return ''
  if (t < NT.del1[0]) return typed(D1, NT.type1)
  if (t < NT.type2[0]) return del(D1, NT.del1)
  if (t < NT.del2[0]) return typed(D2, NT.type2)
  if (t < NT.type3[0]) return del(D2, NT.del2)
  if (t < NT.send) return typed(D1, NT.type3)
  return ''
}
const clockAt = t => {
  if (t < 8.6) return '7:02 PM'
  const m = Math.min(19, 2 + Math.floor(17 * clamp((t - 8.6) / 1.9)))
  return `7:${String(m).padStart(2, '0')} PM`
}

function wrap(x, s, maxW) {
  const words = s.split(' '), out = []; let cur = ''
  for (const w of words) { const n = cur ? cur + ' ' + w : w; if (x.measureText(n).width > maxW && cur) { out.push(cur); cur = w } else cur = n }
  if (cur) out.push(cur)
  return out
}

const TVN = makeTVN({
  id: 'yr2006texts', year: '2006',
  date: t => `03·${t < TT.dates[0] ? 14 : t < TT.dates[1] ? 15 : t < TT.dates[2] ? 16 : 17}·2006`,
  heads: { then: 'Texting a crush | in *2006*', now: 'Texting a crush | in *2026*', last: 'Fingers faster. | *Heart* the same.' },
  lastLate: 3,
  line: 'the nerves never got an *update.*',
  stickers: [
    { text: '7777 = s', at: 1.86, x: 280, y: 560, rot: -0.07, size: 44 },
    { text: 'too far.', at: 2.88, x: 300, y: 680, rot: 0.05, bg: '#ffe2e2' },
    { text: '3 days later…', at: 5.45, x: 290, y: 800, rot: -0.04, bg: '#fff1c8' },
    { text: 'typed in 0.4 s', at: 8.45, x: 290, y: 560, rot: -0.06, bg: '#d9ffe6' },
    { text: 'deleted it. twice.', at: 10.05, x: 300, y: 670, rot: 0.04, bg: '#ffe2e2' },
    { text: 'sent after 17 min', at: 10.62, x: 290, y: 780, rot: -0.05, bg: '#fff1c8' },
  ],
  freeze: 1.6, crop: [130, 600, 820],

  thenWorld(x, t, W) {
    const { px, bits, txt, panel } = W
    const live = W.live
    x.translate(540, 1060); x.scale(1.12, 1.12); x.translate(-540, -1000)
    const k = live ? W.pop01(t, 0.35, 0.4, 2) : 1
    // ── the star
    let mood = 'squint', look = [1, 0.4]
    if (t > 2.78 && t < 3.15) { mood = 'wide'; look = [1, 0.3] }
    if (t > 4.3 && t < TT.send) { mood = 'sparkle'; look = [1, 0] }
    if (t > TT.send && t < TT.wait) { mood = 'wide'; look = [1, -0.2] }
    if (t > TT.wait && t < TT.buzz) { mood = 'sleepy'; look = [1, 0] }
    if (t > TT.buzz && t < TT.reply + 0.05) { mood = 'wide'; look = [1, 0] }
    if (t > TT.reply + 0.05) { mood = 'heart'; look = undefined }
    const hops = [0.75, ...PRESS.map(p => p[0] + 0.02), TT.buzz + 0.05, TT.reply + 0.08, TT.reply + 0.4]
    W.star(CAN, STAR_P.x, STAR_P.y, STAR_P.s, { pop: k, mood, look, hops, bangs: true, seed: 4, zzz: true, blink: mood === 'wide' ? false : undefined })
    if (t > TT.reply) W.sparkles(t, STAR_P.x, STAR_P.y - 40, TT.reply + 0.08, 10, 190, 1, [HOT, PINK, GOLD])
    // ── the flip phone (pops in, buzzes on the reply)
    const pk = live ? W.pop01(t, 0.45, 0.4, 2) : 1
    const buzz = t > TT.buzz && t < TT.reply + 0.15 ? 6 * Math.sin(t * 90) : 0
    x.save(); x.translate(FP.cx + buzz, 1000); x.scale(pk, pk); x.translate(-FP.cx, -1000)
    flipPhone(x, t, W)
    x.restore()
    // ── Pisces, bottom-left, sobbing at the reply
    if (t > TT.reply - 0.1) W.pisces(178, 1395, 130, 3, 'happy', { pop: W.pop01(t, TT.reply - 0.1, 0.3, 2), hops: [TT.reply + 0.1, TT.reply + 0.5], look: [1, -1] })
    void px; void bits; void txt; void panel
  },

  nowWorld(x, t, W) {
    const { txt } = W
    x.translate(540, 1060); x.scale(1.12, 1.12); x.translate(-540, -1000)
    const k = W.pop01(t, NT.in, 0.36, 2)
    // ── the star (no bangs now)
    let mood = 'happy', look = [1, 0.4]
    if (t > NT.type1[1] && t < NT.del1[0]) { mood = 'sparkle'; look = [1, 0.4] }
    if (t > 8.7 && t < NT.send) { mood = t % 0.8 < 0.4 ? 'wide' : 'squint'; look = [1, 0.5] }
    if (t > NT.send && t < NT.reply) { mood = 'wide'; look = [1, -0.3] }
    if (t > NT.reply) { mood = 'heart'; look = undefined }
    const shake = t > 8.7 && t < NT.send ? 0.05 * Math.sin(t * 40) : 0
    const fp = ease.inOutCubic(prog(t, NT.faint, NT.faint + 0.4)) * (1 - ease.inOutCubic(prog(t, 12.0, 12.4)))
    const hops = [NT.in + 0.3, NT.type1[0], NT.type1[1] + 0.1, NT.send + 0.02, NT.reply + 0.05, 12.42, 12.8]
    x.save(); x.translate(STAR_P.x, STAR_P.y + 120); x.rotate(-0.5 * fp); x.translate(-STAR_P.x, -(STAR_P.y + 120))
    const F = W.star(CAN, STAR_P.x, STAR_P.y, STAR_P.s, { pop: k, mood, look, hops, seed: 4, squash: shake, blink: mood === 'wide' ? false : undefined })
    // a nervous sweat drop
    if (t > 8.7 && t < NT.send) W.inSprite(F, () => { const q = ((t - 8.7) * 1.4) % 1; x.fillStyle = INK; x.fillRect(29.5, 7.5 + q * 6, 3, 4); x.fillStyle = '#8fe3ff'; x.fillRect(30, 8 + q * 6, 2, 3) })
    x.restore()
    if (t > NT.reply) W.sparkles(t, STAR_P.x, STAR_P.y - 40, NT.reply + 0.05, 10, 190, 2, [HOT, PINK, GOLD])
    // ── the smartphone
    const pk = W.pop01(t, NT.in + 0.08, 0.36, 2)
    x.save(); x.translate(SP.cx, 990); x.scale(pk, pk); x.translate(-SP.cx, -990)
    smartPhone(x, t, W)
    x.restore()
    // ── the clock overlay (trend UI), ticking through the nerves
    const ck = W.pop01(t, 8.0, 0.3, 2.4) * W.outK(t, [T_PAY - 0.25, T_PAY - 0.05])
    if (ck > 0.01) {
      x.save(); x.translate(300, 870); x.scale(ck, ck)
      const s = clockAt(t)
      W.panel(-130, -34, 260, 68, 'rgba(16,10,36,0.92)', { rim: BONE, P: 5 })
      x.fillStyle = '#ff5a5a'; if ((t * 1.6) % 1 < 0.6) x.fillRect(-108, -8, 16, 16)
      txt(s, 14, 2, { size: 36, color: BONE, shadow: false, spacing: 2 })
      x.restore()
    }
    // ── Pisces, bottom-left, tissue in hand, sobbing at the reply
    if (t > NT.reply - 0.1) {
      const P = W.pisces(178, 1395, 130, 3, 'happy', { pop: W.pop01(t, NT.reply - 0.1, 0.3, 2), hops: [NT.reply + 0.1, NT.reply + 0.5], look: [1, -1] })
      W.inSprite(P, () => { x.fillStyle = INK; x.fillRect(27, 22, 9, 9); x.fillStyle = '#ffffff'; x.fillRect(28, 23, 7, 7); x.fillStyle = '#e8e2f2'; x.fillRect(28, 27, 7, 1) })
    }
  },

  cues(T) {
    const beep = (t0, hz = 1760) => [['pluck', r3(t0), hz, 0.03, 0.12, 0.35], ['tick', r3(t0), 0.03]]
    return [
      // THEN: the multi-tap beeps, the overshoot "bonk", CLR, SEND, sent, the fast-forward, the BZZT, the reply
      ...PRESS.filter(p => p[1] !== 'send' && p[1] !== 'clr').flatMap(([t0, key], i) => beep(t0, key === '7' ? [1318.51, 1396.91, 1567.98, 1760][i % 4] : 1174.66)),
      ['pluck', 2.8, 392, 0.05, 0.3, 0.3], ['pop', 2.82, 330, 0.04, 0.3],
      ['tick', 3.15, 0.06], ['whoosh', 3.15, 0.15, 0.02],
      ['pluck', TT.send, 1760, 0.04, 0.2, 0.35], ['riser', TT.send, TT.sent, 0.025],
      ['bell', TT.sent, 2093, 0.03, 0.8, 0.35],
      ['tapeStop', r3(TT.dates[0] - 0.1), 0.3], ...TT.dates.map(d => ['tick', d, 0.06]),
      ...Array.from({ length: 6 }, (_, i) => ['snare', r3(TT.buzz + i * 0.035), { gain: 0.03, decay: 0.03, tone: 140 }]),
      ['bell', TT.reply, 2349.32, 0.035, 1.0, 0.35], ['pluck', r3(TT.reply + 0.1), 1174.66, 0.04, 0.5, -0.3], ['pluck', r3(TT.reply + 0.22), 1567.98, 0.04, 0.5, -0.3],
      ['pop', r3(TT.reply + 0.1), 987.77, 0.03, -0.6],
      // NOW: rapid typing, deletes, retypes, send, the instant reply, the faint
      ...[NT.type1, NT.type2, NT.type3].flatMap(([a, b]) => Array.from({ length: Math.round((b - a) / 0.03) }, (_, i) => ['tick', r3(a + i * 0.03), 0.018 + 0.006 * (i % 3)])),
      ['whoosh', NT.del1[0], 0.2, 0.025], ['whoosh', NT.del2[0], 0.2, 0.025],
      ['whoosh', NT.send, 0.3, 0.04], ['pop', r3(NT.send + 0.08), 1174.66, 0.04, 0.35],
      ['tick', NT.typing[0], 0.02], ['tick', r3(NT.typing[0] + 0.12), 0.02], ['tick', r3(NT.typing[0] + 0.24), 0.02],
      ['pop', NT.reply, 1318.51, 0.05, 0.35], ['bell', r3(NT.reply + 0.04), 2637.02, 0.03, 1.0, 0.35], ['pop', NT.reply2, 1567.98, 0.04, 0.35],
      ['pluck', r3(NT.faint + 0.05), 1174.66, 0.04, 0.6, -0.3], ['pluck', r3(NT.faint + 0.18), 880, 0.04, 0.6, -0.3], ['glitter', NT.reply, r3(NT.reply + 0.4)],
    ]
  },
})
const T_PAY = TVN.T.pay

// ── THEN: the chunky flip phone
function flipPhone(x, t, W) {
  const { px, txt } = W
  const L = FP.cx - FP.w / 2, R = FP.cx + FP.w / 2, top = FP.top
  const SILV = '#c9c4d6', SILV_D = '#8f8aa3', SILV_L = '#ece8f4'
  // antenna stub
  px(L + 26, top - 44, 34, 60, INK); px(L + 32, top - 38, 22, 52, '#3a3450')
  // top half: screen housing
  W.panel(L, top, FP.w, 300, SILV, { P: 10 })
  px(L + 16, top + 12, FP.w - 32, 10, SILV_L)
  const sl = L + 26, st = top + 32, sw = FP.w - 52, sh = 236
  px(sl - 8, st - 8, sw + 16, sh + 16, INK)
  const lcd = t > TT.buzz && t < TT.reply + 0.4 && Math.floor(t * 12) % 2 ? '#e2ffd8' : '#b7e0b0'
  px(sl, st, sw, sh, lcd)
  // status row: signal bars + battery
  const D = '#1d3a26'
  for (let i = 0; i < 4; i++) px(sl + 10 + i * 10, st + 30 - i * 6, 6, 6 + i * 6, D)
  px(sw + sl - 46, st + 14, 32, 18, D); px(sw + sl - 42, st + 18, 24, 10, lcd); px(sw + sl - 42, st + 18, 16, 10, D); px(sw + sl - 14, st + 19, 4, 8, D)
  // the screen content
  const cx = sl + sw / 2
  if (t < TT.send) {
    let st2 = TYPE[0]
    for (const s of TYPE) if (t >= s[0]) st2 = s
    const [, com, pend] = st2
    x.save(); x.font = `700 64px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
    const cw = x.measureText('m').width
    const tx = sl + 18, ty = st + 112
    x.fillStyle = D; x.fillText(com, tx, ty)
    const ex = tx + cw * com.length
    if (pend) { px(ex - 2, ty - 36, cw + 4, 72, D); x.fillStyle = lcd; x.fillText(pend, ex, ty) }
    else if (Math.floor(t * 3) % 2) px(ex + 2, ty - 32, 6, 64, D)
    x.restore()
    txt('Send', sl + 14, st + sh - 22, { size: 22, color: D, align: 'left', shadow: false })
    txt('Clear', sl + sw - 14, st + sh - 22, { size: 22, color: D, align: 'right', shadow: false })
  } else if (t < TT.sent) {
    txt('Sending…', cx, st + 84, { size: 34, color: D, shadow: false })
    px(sl + 30, st + 136, sw - 60, 30, D); px(sl + 34, st + 140, sw - 68, 22, lcd)
    const n = Math.floor(8 * clamp((t - TT.send) / (TT.sent - TT.send - 0.05)))
    for (let i = 0; i < n; i++) px(sl + 38 + i * ((sw - 76) / 8), st + 143, (sw - 76) / 8 - 4, 16, D)
  } else if (t < TT.buzz) {
    if (t < TT.wait) {
      txt('Sent!', cx, st + 84, { size: 40, color: D, shadow: false })
      W.bits(['EEEEEEEEE', 'EE.....EE', 'E.E...E.E', 'E..EEE..E', 'EEEEEEEEE'], { E: D }, cx, st + 160, 8, { outline: null })
    } else {
      txt('0 new', cx, st + 92, { size: 38, color: D, shadow: false })
      txt('messages', cx, st + 140, { size: 34, color: D, shadow: false })
    }
  } else if (t < TT.reply) {
    txt('1 New', cx, st + 92, { size: 40, color: D, shadow: false })
    txt('Message!', cx, st + 142, { size: 40, color: D, shadow: false })
  } else {
    txt('crush:', sl + 16, st + 62, { size: 28, color: D, shadow: false, align: 'left' })
    txt('sup :)', sl + 16, st + 128, { size: 62, color: D, shadow: false, align: 'left' })
  }
  // hinge
  px(L + 20, top + 300, FP.w - 40, 26, INK); px(L + 26, top + 304, FP.w - 52, 18, SILV_D)
  // bottom half: the keypad
  const bt = top + 326
  W.panel(L + 4, bt, FP.w - 8, 470, SILV, { P: 10 })
  px(L + 18, bt + 10, FP.w - 36, 8, SILV_L)
  let pressed = null
  for (const [p0, key] of PRESS) if (t >= p0 && t < p0 + 0.16) pressed = key
  // soft keys: send (green), nav, clr (red)
  const skY = bt + 30
  const sk = (X, w, col, lab, key) => { const dn = pressed === key; px(X, skY + (dn ? 4 : 0), w, 54, INK); px(X + 4, skY + 4 + (dn ? 4 : 0), w - 8, 46, dn ? '#fff6c8' : col); txt(lab, X + w / 2, skY + 28 + (dn ? 4 : 0), { size: 22, color: INK, shadow: false, font: INTER, weight: 800 }) }
  sk(L + 20, 92, '#7fd77a', 'SEND', 'send')
  px(FP.cx - 38, skY - 2, 76, 58, INK); px(FP.cx - 32, skY + 4, 64, 46, '#5d5872'); px(FP.cx - 10, skY + 18, 20, 18, '#9a94b0')
  sk(R - 112, 92, '#ff8f8f', 'CLR', 'clr')
  // the 3×4 number keys
  const kw = 88, kh = 72, gx = 98, gy = 86, k0x = FP.cx - gx, k0y = bt + 140
  KEYS.forEach(([n, l], i) => {
    const X = k0x + (i % 3) * gx, Y = k0y + Math.floor(i / 3) * gy, dn = pressed === n
    px(X - kw / 2, Y - kh / 2 + (dn ? 4 : 0), kw, kh, INK)
    px(X - kw / 2 + 4, Y - kh / 2 + 4 + (dn ? 4 : 0), kw - 8, kh - 8, dn ? '#ffd27a' : SILV_L)
    if (!dn) px(X - kw / 2 + 4, Y + kh / 2 - 12, kw - 8, 8, '#bdb7cc')
    txt(n, X, Y - (l ? 10 : 0) + (dn ? 4 : 0), { size: 32, color: INK, shadow: false, font: INTER, weight: 800 })
    if (l) txt(l, X, Y + 20 + (dn ? 4 : 0), { size: 17, color: '#4a4560', shadow: false })
  })
  // the press counter: a little "×n" pops off the 7 key (live video only)
  if (W.live) {
    let n = 0, at = -1
    for (const [p0, key] of PRESS) if (key === '7' && t >= p0 && p0 < 2) { n++; at = p0 }
    if (n && t < 2.3) {
      const q = clamp((t - at) / 0.4), X = k0x - 20, Y = k0y + 2 * gy - 30 - 50 * ease.outCubic(q)
      txt(`×${n}`, X - 40, Y, { size: 44, color: '#ffd27a', alpha: 1 - 0.3 * q, font: INTER, weight: 800 })
    }
  }
}

// ── NOW: the slim smartphone with a generic chat
function smartPhone(x, t, W) {
  const { px, txt } = W
  const L = SP.cx - SP.w / 2, top = SP.top, w = SP.w, h = SP.h
  W.panel(L, top, w, h, '#16112a', { P: 12 })
  const sl = L + 16, st = top + 22, sw = w - 32, sh = h - 44
  px(sl, st, sw, sh, '#221b40')
  // header
  px(sl, st, sw, 70, '#2c2452')
  W.bits(['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: HOT }, sl + 34, st + 36, 4)
  txt('crush', sl + 62, st + 30, { size: 28, color: BONE, align: 'left', shadow: false, font: INTER, weight: 800 })
  const typingNow = t > NT.typing[0] && t < NT.typing[1]
  txt(typingNow ? 'typing…' : 'online', sl + 62, st + 54, { size: 16, color: '#9fe6b0', align: 'left', shadow: false })
  px(sw / 2 + sl - 36, st - 14, 72, 12, '#0c0818')
  // the thread
  x.save(); x.font = `700 24px ${MONO}`
  const bubble = (s, side, y, col, fg, k = 1) => {
    const lines = wrap(x, s, sw - 120), bw = Math.max(...lines.map(l => x.measureText(l).width)) + 36, bh = lines.length * 32 + 22
    const bx = side === 'R' ? sl + sw - 16 - bw : sl + 16
    x.save(); x.translate(bx + bw / 2, y + bh / 2); x.scale(k, k); x.translate(-(bx + bw / 2), -(y + bh / 2))
    W.panel(bx, y, bw, bh, col, { P: 4 })
    lines.forEach((l, i) => { x.fillStyle = fg; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(l, bx + 18, y + 27 + i * 32) })
    x.restore()
    return bh
  }
  let y = st + 96
  y += bubble('that was so fun today', 'L', y, '#3a3166', BONE) + 14
  if (t > NT.send) {
    const k = easeOutBack(prog(t, NT.send, NT.send + 0.3), 2)
    const yy = lerp(st + sh - 230, y, ease.outCubic(prog(t, NT.send, NT.send + 0.3)))
    bubble(D1, 'R', yy, PINK, INK, k); y += 80
  }
  if (typingNow) { W.panel(sl + 16, y, 90, 44, '#3a3166', { P: 4 }); for (let i = 0; i < 3; i++) px(sl + 34 + i * 20, y + 16 + (Math.floor(t * 8 + i) % 3 === 0 ? -4 : 0), 10, 10, BONE) }
  if (t > NT.reply) { const k = easeOutBack(prog(t, NT.reply, NT.reply + 0.3), 2.6); y += bubble('YES!! :)', 'L', y, '#3a3166', '#ffe27a', k) + 12 }
  if (t > NT.reply2) bubble("was hoping u'd ask", 'L', y, '#3a3166', BONE, easeOutBack(prog(t, NT.reply2, NT.reply2 + 0.3), 2.2))
  x.restore()
  // the draft field + send button
  const fy = st + sh - 214
  const d = draftAt(t)
  x.save(); x.font = `700 24px ${MONO}`
  const dl = d ? wrap(x, d, sw - 120) : []
  const fh = Math.max(56, dl.length * 30 + 24)
  W.panel(sl + 12, fy - (fh - 56), sw - 96, fh, '#f1edf8', { P: 4 })
  dl.forEach((l, i) => { x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(l, sl + 26, fy - (fh - 56) + 28 + i * 30) })
  if (!d && t < NT.send) { x.fillStyle = '#9a94b0'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('message', sl + 26, fy + 28) }
  x.restore()
  // send button: the thumb hovers over it (pulsing ring) during the nerves
  const bx = sl + sw - 46, by = fy + 28
  const hover = t > 8.7 && t < NT.send
  const dn = t > NT.send && t < NT.send + 0.15
  px(bx - 30, by - 30, 60, 60, INK); px(bx - 26, by - 26, 52, 52, dn ? '#fff6c8' : HOT)
  W.bits(['..W..', '.WWW.', 'W.W.W', '..W..', '..W..'], { W: '#ffffff' }, bx, by, 7, { outline: null })
  if (hover) { const q = (t * 2.2) % 1; x.save(); x.globalAlpha = 1 - q; x.strokeStyle = GOLD; x.lineWidth = 5; x.strokeRect(bx - 30 - q * 22, by - 30 - q * 22, 60 + q * 44, 60 + q * 44); x.restore()
    // a pixel thumb hovering, twitching
    const hy = by + 62 + 6 * Math.sin(t * 9)
    W.bits(['.SSSS.', 'SSSSSS', 'SNNNNS', 'SSSSSS', 'SSSSSS', 'SSSSSS', 'SSSSSS'], { S: '#ffd9a8', N: '#ffeedd' }, bx, hy + 30, 8)
  }
  // the keyboard: keys flash while typing
  const ky = fy + 76, rows = [10, 9, 7]
  const typing = [NT.type1, NT.type2, NT.type3].some(([a, b]) => t > a && t < b)
  rows.forEach((n, r) => {
    const kw = (sw - 24) / 10, x0 = sl + 12 + (10 - n) * kw / 2
    for (let i = 0; i < n; i++) {
      const lit = typing && ((i * 7 + r * 3 + Math.floor(t * 33)) % 11 === 0)
      px(x0 + i * kw + 2, ky + r * 40, kw - 4, 34, lit ? GOLD : '#3a3166')
    }
  })
  px(sl + 12 + (sw - 24) * 0.25, ky + 120, (sw - 24) * 0.5, 30, '#3a3166')
}

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = TVN
