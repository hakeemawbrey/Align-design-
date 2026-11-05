// rescuekit — the TEXT RESCUE look (Month 2 boost, batch m12; imported read-only by ktre01–ktre20).
//
//   import { rescue } from '../../ktre01/rescuekit.js'
//   const F = rescue({ id, len, ending: 'cut' | 'loop', sender: 'aries', partner: 'libra', hook, thread, receipt, rounds, last })
//   export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
//
// One big pixel phone in the night sky. Every round: (optional incoming bubbles) → the cringe DRAFT in the compose bar
// (round 1 of a film is already typed at frame 0, the hand mid-slam on SEND) → optional "caught" circle on the worst
// words → THE STARS' red pen slashes it (record scratch + freeze) → THE STARS explain in the dialogue box → the honest,
// kind rewrite types in gold → SEND → typing dots → the reply. Pisces peeks over the phone's right shoulder and cries
// (more every round). No end card: the film ends on the last line (hard cut) or eases back into frame 0 (loop).
//
// spec
//   len       story length in s (the schedule is stretched to fit: slack goes into the reading pauses)
//   hook      frame-0 headline ('Left on read. | *Two days.*'), on screen at t = 0
//   thread    [{ side: 'L' | 'R', text }] already in the chat at frame 0;  receipt: 'Read 2 days ago' (under the last R)
//   rounds    [{ chapter?, head?, incoming?: [text], draft, caught?: 'substring', bar?: { label, to }, keep?: bool,
//               lines: [{ text, who?: 'stars' | 'sender' | 'pisces' }], rewrite, replies: [text], from?: 'L' }]
//   last      the last line (popText syntax), slammed at the top for the ending
//   chapters  true → a chapter sticker per round (long films)
//   promise   long films: a "wait for …" sticker in the first seconds
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import { drawBits, sparkles, starFrame, inSprite, tearsCells, pop01, outK } from '../sxmail1/scenes/mail.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, frozen, chapter, chapterCues, loadingBar, loadingBarCues, loopBack, loopCues } from '../hookkit.js'

export const RED = '#ff4d5e', GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', BLUE = '#4f8df0', GREEN = '#5fd38a'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const CPS = 30, DRAFT_CPS = 22, REWRITE_CPS = 26
const NAME = id => id[0].toUpperCase() + id.slice(1)

// layout (1080 × 1920)
export const PH = { cx: 540, top: 470, w: 700, h: 790 }
export const BOX = { y: 1330, height: 236, size: 44 }
export const SND = { x: 225, y: 1738, s: 236 }, NAR = { x: 858, y: 1738, s: 214 }, PIS = { x: 962, y: 880, s: 176 }

// ─────────────────────────────────────────── the schedule (pure: shared by the picture and the sound)
function schedule(S, pad) {
  const R = [], LINES = []
  let e = 0
  S.rounds.forEach((r, i) => {
    const o = { i, r, s: e }
    const first = i === 0
    // incoming bubbles
    o.inc = (r.incoming || []).map((txt, k) => ({ at: +(e + 0.35 + k * 0.55).toFixed(3), side: r.from || 'L', text: txt }))
    if (o.inc.length) e = o.inc[o.inc.length - 1].at + 0.55
    // loading bar ("overthinking…")
    if (r.bar) { o.bar = [e + 0.1, e + 2.0]; e += 2.2 }
    // the draft: pre-typed at frame 0 for round 1, else typed live
    o.drafts = []
    const dr = { text: r.draft }
    if (first && !r.live) { dr.d0 = -1; dr.d1 = -1; e = Math.max(e, 0.42) }
    else { dr.d0 = e + 0.25; dr.d1 = dr.d0 + r.draft.length / DRAFT_CPS; e = dr.d1 + 0.55 }
    if (r.caught) { dr.caught = e; dr.sub = r.caught; e += first && dr.d0 < 0 ? 1.45 : 0.95 }
    else if (first && dr.d0 < 0) e = Math.max(e, 1.6)
    if (!r.keep) { dr.slash = e; e += 0.75 } else { o.approve = e; e += 0.5 }
    o.drafts.push(dr)
    // THE STARS (and friends) explain; a { retry } step is another bad draft, typed live and slashed again
    o.lines = []
    for (const L of r.lines) {
      if (L.retry) {
        const d = { text: L.retry, d0: e + 0.2 }
        d.d1 = d.d0 + L.retry.length / DRAFT_CPS; e = d.d1 + 0.4
        if (L.caught) { d.caught = e; d.sub = L.caught; e += 0.7 }
        d.slash = e; e += 0.7
        o.drafts.push(d)
        continue
      }
      const who = L.who || 'stars'
      const sg = L.sign || (who === 'pisces' ? 'pisces' : S.sender)
      const sp = who === 'stars' ? 'THE STARS' : `${signStar(sg).glyph}︎ ${sg.toUpperCase()}`
      const color = who === 'stars' ? GOLD : signStar(sg).color
      const line = { t: +e.toFixed(3), speaker: sp, text: L.text, color, who }
      o.lines.push(line); LINES.push(line)
      const n = L.text.replace(/\*/g, '').length
      e += n / CPS + 1.45 + pad
    }
    o.slash = o.drafts[0].slash
    // the rewrite types in gold (starts while the last line is read)
    const kept = r.keep
    o.r0 = kept ? -1 : e - 0.9 - pad * 0.5
    o.r1 = kept ? -1 : o.r0 + r.rewrite.replace(/\*/g, '').length / REWRITE_CPS
    e = kept ? e : Math.max(e, o.r1 + 0.45)
    o.send = +e.toFixed(3)
    o.typing = [o.send + 0.35, o.send + 1.15]
    o.rep = (r.replies || []).map((txt, k) => ({ at: +(o.send + 1.2 + k * 0.75).toFixed(3), side: 'L', text: txt }))
    e = (o.rep.length ? o.rep[o.rep.length - 1].at : o.send) + 1.25 + pad
    o.e = e
    R.push(o)
  })
  const fin = e
  return { R, LINES, fin, natural: fin + 1.9 }
}

export function rescue(S) {
  const pauses = S.rounds.reduce((n, r) => n + r.lines.length + 1, 0)
  const nat = schedule(S, 0).natural
  const pad = Math.min(S.padMax ?? 0.45, Math.max(0, (S.len - nat) / pauses))
  if (nat - 1.0 > S.len + 0.01 && typeof console !== 'undefined') console.warn(`[rescuekit] ${S.id}: natural ${nat.toFixed(2)} s > len ${S.len}`)
  const { R, LINES, fin } = schedule(S, pad)
  const DURATION = S.len
  const LOOP = S.ending === 'loop'
  const LB = LOOP ? [DURATION - 0.45, DURATION] : null
  const SL = R.flatMap(o => o.drafts.filter(d => d.slash != null).map(d => ({ o, d, t: d.slash })))
  const T = { R, LINES, fin, last: fin + 0.05, D: DURATION, LB, SL }
  // hookkit pieces
  const d0 = R[0].drafts[0], recAt = d0.caught != null ? d0.caught + 0.3 : 0.42
  const REC = { at: recAt, len: Math.max(0.5, (d0.slash ?? recAt + 1.2) - 0.47 - recAt), caption: S.rec || 'hold on. *read that back.*', top: 1360 }
  const WHIP = { at: -0.2, from: 1.35, blur: 8, len: 0.5 }
  const hookOff = (d0.slash ?? R[0].lines[0].t) + 1.5
  const HOOK = { at: -1, text: S.hook, top: 150, size: 104, accentColor: S.hookColor || RED, out: [hookOff, hookOff + 0.2] }
  const CHAP = S.chapters ? R.map((o, i) => ({ at: o.s + 0.02, out: [(R[i + 1] ? R[i + 1].s : T.last) - 0.2, R[i + 1] ? R[i + 1].s : T.last], n: i + 1, title: o.r.chapter || 'RESCUE', x: 70, y: 400, color: i % 2 ? GOLD : '#ff9aa6' })) : []
  const BARS = R.filter(o => o.bar).map(o => ({ at: o.bar[0], len: o.bar[1] - o.bar[0], label: o.r.bar.label || 'overthinking…', stallAt: o.r.bar.to ?? 99, error: o.r.bar.error ?? 'Error: too many feelings', y: 760 }))

  // every chat bubble with its arrival time
  const MSGS = [
    ...(S.thread || []).map(m => ({ ...m, at: -9 })),
    ...R.flatMap(o => [...o.inc, ...(o.r.keep || o.r.rewrite ? [{ side: 'R', text: (o.r.keep ? o.r.draft : o.r.rewrite).replace(/\*/g, ''), at: o.send, gold: true }] : []), ...o.rep]),
  ]
  const PEEK = S.sender === 'pisces' ? (S.peek || 'cancer') : null, SNDK = { k: 2 }
  const SEN = signStar(S.sender), PAR = S.partner ? signStar(S.partner) : null, PIS_ = signStar('pisces')
  const title = S.title || (PAR ? `${PAR.glyph}︎ ${NAME(S.partner)}` : 'chat')
  const SPK_S = `${SEN.glyph}︎ ${S.sender.toUpperCase()}`
  const NAR_HOPS = [...talkHops(LINES, 'THE STARS', { cps: CPS }), ...SL.map(q => q.t)]
  const SND_HOPS = [-0.16, ...talkHops(LINES, SPK_S, { cps: CPS }), ...R.flatMap(o => o.rep.map(m => m.at + 0.05)), T.last + 0.1]
  const PIS_HOPS = [...R.flatMap(o => o.rep.map(m => m.at + 0.15)), T.last + 0.2]

  // which round is "on" at t
  const roundAt = t => { let k = 0; for (const o of R) if (t >= o.s) k = o.i; return R[k] }

  async function build(stage) {
    try { await Promise.all(["800 112px Inter", "700 34px Inter", "600 34px Inter", "italic 500 150px 'EB Garamond'", "700 44px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { }
    const root = fill(stage, { background: '#05040c' })
    const world = el('div', { position: 'absolute', inset: 0, transformOrigin: '50% 48%' }, root)
    const cv = layerCanvas(world), x = cv.getContext('2d')
    // headlines
    const H = []
    R.forEach((o, i) => {
      if (!o.r.head) return
      const on = Math.max((o.slash ?? o.approve) + 0.85, i === 0 ? HOOK.out[1] + 0.05 : 0), nxt = R[i + 1]
      const off = nxt ? nxt.s + (nxt.r.head ? 0.2 : 2.5) : T.last - 0.15
      H.push({ p: popText(world, o.r.head, { top: 150, size: 86, accentSize: 118, at: on, gap: 0.09, accentColor: o.r.headColor || GOLD, fit: true }), on, off })
    })
    const HL = popText(world, S.last, { top: 150, size: 92, accentSize: 126, at: T.last, gap: 0.1, late: 0, wobble: true, accentColor: S.lastColor || GOLD, fit: true })
    const box = dialogueBox(world, { lines: LINES, y: BOX.y, height: BOX.height, size: BOX.size, cps: CPS, open: LINES[0].t - 0.22, close: Math.min(T.last - 0.1, (R[R.length - 1].rep.slice(-1)[0]?.at ?? R[R.length - 1].send) + 0.2) })
    const boxes = [box]
    // chapter stickers + promise (long films)
    const stick = (txt, col, top) => el('div', { position: 'absolute', right: '54px', top: top + 'px', padding: '10px 18px', font: `700 30px ${MONO}`, letterSpacing: '0.12em', color: INK, background: col, border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}`, display: 'none', transformOrigin: '100% 0%', whiteSpace: 'nowrap' }, world, txt)
    const CH = []
    const PR = S.promise ? { e: stick(S.promise, GOLD, 120), on: 0.9, off: Math.min(7.5, R[0].e) } : null
    // the bug
    const bug = el('div', { position: 'absolute', left: '56px', top: '58px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
    const ic = el('canvas', { width: '48px', height: '48px', imageRendering: 'pixelated' }, bug); ic.width = 48; ic.height = 48
    drawBits(ic.getContext('2d'), RING, { R: RED, W: BONE }, 24, 24, 4)
    el('div', { font: `800 30px ${INTER}`, letterSpacing: '0.22em', color: '#ff8f9a', textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, bug, 'TEXT&nbsp;RESCUE')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none' }, root)

    // ── one full canvas frame at time t (also used for the loop-back: the frame-0 picture)
    function paint(c, t) {
      drawSky(c, t, { ...SKY_H, zoom: SKY_H.zoom * (1 + 0.04 * Math.sin(t * 0.2)) })
      // a warm glow behind the phone
      const g = c.createRadialGradient(540, 860, 0, 540, 860, 640); g.addColorStop(0, 'rgba(255,120,140,0.10)'); g.addColorStop(1, 'rgba(255,120,140,0)'); c.fillStyle = g; c.fillRect(0, 200, 1080, 1400)
      const o = roundAt(t)
      // Pisces peeks from behind the phone's right shoulder
      pisces(c, t)
      phone(c, t, o)
      chars(c, t, o)
      pen(c, t)
    }

    function pisces(c, t) {
      const nRep = MSGS.filter(m => m.side === 'L' && m.at > 0 && t >= m.at).length
      let k = t < 0.8 ? 1 : 2
      if (nRep >= 1) k = 2
      if (nRep >= 2 || t > T.last - 0.2) k = 3
      const peek = 1, rk = R.find(o => t >= o.rep[0]?.at && t < o.rep[0]?.at + 0.8)
      const mood = t > T.last ? 'happy' : rk ? 'wide' : 'sparkle'
      const P = { x: PIS.x + (rk ? 10 : 0), y: PIS.y - 6 * Math.sin(t * 1.3), s: PIS.s * peek }
      const pk = PEEK ? signStar(PEEK) : PIS_
      const opts = { color: pk.color, glyph: PEEK ? pk.glyph : null, mood: PEEK ? (rk || t > T.last ? 'happy' : 'wide') : mood, look: [-1, -0.2], seed: 6, glow: 0.8, hops: PIS_HOPS }
      drawStarChar(c, P.x, P.y, P.s, t, opts)
      if (!PEEK) inSprite(c, starFrame(P.x, P.y, P.s, t, opts), () => tearsCells(c, t, k))
      else SNDK.k = k
    }

    function chars(c, t, o) {
      // the sender: mid-lunge at frame 0, nervous while the draft is up, delighted at replies
      const repOn = MSGS.some(m => m.side === 'L' && m.at > 0 && t >= m.at && t < m.at + 2.2)
      let mood = 'wide', look = [0.5, -1]
      if (o.slash != null && t > o.slash && t < o.slash + 1.2) { mood = 'squint'; look = [0.7, -0.6] }
      else if (t > o.send && t < (o.rep[0]?.at ?? o.send + 9)) { mood = 'neutral'; look = [0.4, -1] }
      else if (repOn) { mood = 'sparkle'; look = [0.4, -1] }
      else if (o.slash != null && t > o.slash + 1.2) { mood = 'neutral'; look = [1, -0.2] }
      if (t > T.last) { mood = S.endMood || 'heart'; look = undefined }
      const lean = t < 0.5 ? (1 - ease.outCubic(prog(t, 0, 0.5))) : 0
      const so = { color: SEN.color, glyph: SEN.glyph, mood, look, hops: SND_HOPS, squash: -0.12 * lean, seed: 3, glow: 1.1 }
      drawStarChar(c, SND.x + 30 * lean, SND.y - 30 * lean, SND.s, t, so)
      if (PEEK) inSprite(c, starFrame(SND.x + 30 * lean, SND.y - 30 * lean, SND.s, t, so), () => tearsCells(c, t, Math.max(2, SNDK.k)))
      // the motion lines behind the frame-0 lunge
      if (lean > 0.02) { c.save(); c.globalAlpha = lean; c.fillStyle = BONE; for (let k = 0; k < 4; k++) c.fillRect(SND.x - 190 - k * 14, SND.y - 90 + k * 40, 90 - k * 10, 8); c.restore() }
      // THE STARS with the red pen
      let nm = 'neutral', nl = [-0.6, -0.8]
      if (o.slash != null && t > o.slash - 0.4 && t < o.slash + 0.9) { nm = 'squint'; nl = [-0.8, -1] }
      if (t > o.send) { nm = 'happy'; nl = undefined }
      if (o.approve != null && t > o.approve) { nm = 'sparkle'; nl = undefined }
      if (t > T.last) nm = 'happy'
      drawStarChar(c, NAR.x, NAR.y, NAR.s, t, { color: STAR.sky, mood: nm, look: nl, hops: NAR_HOPS, seed: 2, glow: 1.05 })
    }

    // the red pen: rests by THE STARS, flies up for each slash and draws it
    function pen(c, t) {
      const q = SL.find(q2 => t > q2.t - 0.45 && t < q2.t + 0.75)
      const rest = { x: NAR.x + 92, y: NAR.y - 70, r: 0.5 }
      let p = rest
      if (q) {
        const o = { slash: q.t }, cb = composeBox(c, q.o, Math.min(t, q.t + 0.3))
        const a = prog(t, o.slash - 0.45, o.slash - 0.05), b = prog(t, o.slash + 0.35, o.slash + 0.75)
        const sp = slashPath(cb, prog(t, o.slash, o.slash + 0.32))
        const tip = t < o.slash ? { x: cb.x + 10, y: cb.y - 10 } : sp
        p = { x: lerp(lerp(rest.x, tip.x, ease.inOutCubic(a)), rest.x, ease.inOutCubic(b)), y: lerp(lerp(rest.y, tip.y, ease.inOutCubic(a)), rest.y, ease.inOutCubic(b)), r: lerp(0.5, -0.4, a * (1 - b)) }
      }
      drawPen(c, p.x, p.y, 5, p.r)
    }

    const caughtR = []
    function composeBox(c, o, t) {
      const W = PH.w - 6 * 8, sx0 = PH.cx - PH.w / 2 + 24
      return { x: sx0 + 16, y: PH.top + PH.h - 24 - 16 - composeH(c, o, t), w: W - 32 - 96, h: composeH(c, o, t) }
    }
    function draftAt(o, t) { let d = o.drafts[0]; for (const q of o.drafts) if (q.d0 < 0 || t >= q.d0) d = q; return d }
    function composeText(o, t) {
      // what the compose bar shows at t
      const d = draftAt(o, t), typed = d.d0 < 0 ? 1e9 : Math.floor((t - d.d0) * DRAFT_CPS)
      if (o.r.keep) return t >= o.send ? null : { text: d.text, n: typed, col: BONE, d }
      if (t < d.slash + 0.55) return { text: d.text, n: typed, col: BONE, crumple: prog(t, d.slash + 0.35, d.slash + 0.55), d }
      if (t < o.r0) return { text: '', n: 0, col: GOLD }
      if (t < o.send) return { text: o.r.rewrite, n: Math.floor((t - o.r0) * REWRITE_CPS), col: GOLD, gold: true }
      return null
    }
    function wrap(c, text, maxW) {
      const out = []
      for (const para of text.split('\n')) {
        let cur = ''
        for (const wd of para.split(' ')) { const s = cur ? cur + ' ' + wd : wd; if (c.measureText(s).width > maxW && cur) { out.push(cur); cur = wd } else cur = s }
        out.push(cur)
      }
      return out
    }
    function composeH(c, o, t) {
      const ct = composeText(o, t)
      const txt = ct ? ct.text.replace(/\*/g, '') : ''
      c.save(); c.font = `600 34px ${INTER}`
      const n = txt ? wrap(c, txt, PH.w - 48 - 32 - 96 - 40).length : 1
      c.restore()
      return clamp(n, 1, o.r.tall ? 13 : 6) * 44 + 44
    }

    function phone(c, t, o) {
      const { cx, top, w, h } = PH
      const shk = shakeAt(t)
      c.save(); c.translate(shk.x, shk.y + 7 * Math.sin(t * 1.3))
      c.translate(cx, top + h / 2); c.rotate(shk.r); c.translate(-w / 2, -h / 2)
      const C = 8
      c.fillStyle = INK; c.fillRect(C, 0, w - 2 * C, h); c.fillRect(0, C, w, h - 2 * C)
      c.fillStyle = '#3a2d74'; c.fillRect(2 * C, C, w - 4 * C, h - 2 * C); c.fillRect(C, 2 * C, w - 2 * C, h - 4 * C)
      c.fillStyle = '#5b48a8'; c.fillRect(2 * C, C, w - 4 * C, C / 2)
      const sx0 = 3 * C, sy0 = 3 * C, sw = w - 6 * C, sh = h - 6 * C
      c.fillStyle = '#120c2a'; c.fillRect(sx0, sy0, sw, sh)
      const HH = 96
      c.fillStyle = '#1f1747'; c.fillRect(sx0, sy0, sw, HH)
      c.fillStyle = BONE; c.font = `700 36px ${INTER}`; c.textAlign = 'center'; c.textBaseline = 'middle'
      c.fillText(title, sx0 + sw / 2, sy0 + HH / 2 + 6)
      c.fillStyle = INK; c.fillRect(sx0 + sw / 2 - 44, sy0, 88, 12)
      // compose bar geometry (in phone space)
      const ct = composeText(o, t)
      c.font = `600 34px ${INTER}`
      const cw = sw - 32 - 96, lines = ct ? wrap(c, ct.text.replace(/\*/g, ''), cw - 40) : ['']
      const maxL = o.r.tall ? 13 : 6
      const chH = clamp(lines.length, 1, maxL) * 44 + 44
      const cy0 = sy0 + sh - 16 - chH
      // messages (above the compose bar)
      c.save(); c.beginPath(); c.rect(sx0, sy0 + HH, sw, cy0 - 12 - sy0 - HH); c.clip()
      c.font = `600 38px ${INTER}`
      const maxW = sw * 0.8, pad = 22, lh = 47, gapB = 16
      const vis = MSGS.filter(m => t >= m.at)
      const lay = vis.map(m => { const ls = wrap(c, m.text, maxW - 2 * pad); return { ...m, ls, bw: Math.min(maxW, Math.max(...ls.map(l => c.measureText(l).width)) + 2 * pad), bh: ls.length * lh + pad * 1.2 } })
      const typingOn = R.some(q => t >= q.typing[0] && t < q.typing[1] && q.rep.length)
      const tot = k => { let s2 = 0; for (let i = 0; i < k; i++) s2 += lay[i].bh + gapB; return s2 }
      let Hs = tot(lay.length)
      if (lay.length) { const lm = lay[lay.length - 1], e2 = ease.outCubic(prog(t, lm.at, lm.at + 0.22)); Hs = lerp(tot(lay.length - 1), tot(lay.length), e2) }
      const rc = S.receipt && t < (R[0].send ?? 0) ? 40 : 0
      if (typingOn) Hs += 74
      let y = cy0 - 14 - Hs - rc
      for (const m of lay) {
        const k = pop01(t, m.at, 0.22, 2.2)
        const bx = m.side === 'L' ? sx0 + 20 : sx0 + sw - 20 - m.bw
        c.save(); c.translate(m.side === 'L' ? bx : bx + m.bw, y + m.bh); c.scale(k, k); c.translate(m.side === 'L' ? 0 : -m.bw, -m.bh)
        if (m.gold) { c.fillStyle = GOLD; c.fillRect(0, 0, m.bw, m.bh); c.fillRect(-4, 4, m.bw + 8, m.bh - 8) }
        c.fillStyle = m.side === 'L' ? '#3b3466' : BLUE
        c.fillRect(4, m.gold ? 4 : 0, m.bw - 8, m.bh - (m.gold ? 8 : 0)); c.fillRect(m.gold ? 4 : 0, 4, m.bw - (m.gold ? 8 : 0), m.bh - 8)
        c.fillStyle = BONE; c.textAlign = 'left'; c.textBaseline = 'alphabetic'
        m.ls.forEach((l, i) => c.fillText(l, pad, pad * 0.62 + (i + 0.8) * lh))
        c.restore()
        y += m.bh + gapB
      }
      if (rc) { c.font = `600 24px ${INTER}`; c.fillStyle = 'rgba(239,230,214,0.6)'; c.textAlign = 'right'; c.fillText(S.receipt, sx0 + sw - 24, y + 14) ; c.font = `600 34px ${INTER}` }
      if (typingOn) {
        const q = R.find(q2 => t >= q2.typing[0] && t < q2.typing[1])
        c.fillStyle = '#3b3466'; c.fillRect(sx0 + 20, cy0 - 14 - 60, 120, 58)
        for (let i = 0; i < 3; i++) { const on = Math.floor((t - q.typing[0]) * 8) % 3 === i; c.fillStyle = on ? BONE : '#8a83b8'; c.fillRect(sx0 + 20 + 24 + i * 28, cy0 - 14 - 60 + 22, 15, 15) }
      }
      c.restore()
      // the compose bar
      const bx0 = sx0 + 16
      const gold = ct && ct.gold
      c.fillStyle = gold ? GOLD : '#4a3f86'; c.fillRect(bx0 - 4, cy0 - 4, cw + 8, chH + 8)
      c.fillStyle = '#231a4c'; c.fillRect(bx0, cy0, cw, chH)
      if (gold) { c.font = `700 22px ${MONO}`; c.fillStyle = INK; c.fillRect(bx0, cy0 - 40, 300, 36); c.fillStyle = GOLD; c.fillRect(bx0 + 3, cy0 - 37, 294, 30); c.fillStyle = INK; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText("★ THE STARS' VERSION", bx0 + 14, cy0 - 21) }
      if (ct) {
        const crum = ct.crumple || 0
        c.save()
        if (crum > 0) { c.translate(bx0 + cw / 2, cy0 + chH / 2 + crum * 260); c.rotate(crum * 0.9); c.scale(1 - 0.8 * crum, 1 - 0.8 * crum); c.translate(-(bx0 + cw / 2), -(cy0 + chH / 2)); c.globalAlpha = 1 - crum }
        c.font = `600 34px ${INTER}`; c.textAlign = 'left'; c.textBaseline = 'alphabetic'
        let left = ct.n
        const shown = lines.slice(Math.max(0, lines.length - maxL))
        const skip = lines.slice(0, Math.max(0, lines.length - maxL)).reduce((a, l) => a + l.length + 1, 0)
        left -= skip
        let caret = null
        shown.forEach((l, i) => {
          if (left <= 0) return
          const s = l.slice(0, left); left -= l.length + 1
          c.fillStyle = ct.col; c.fillText(s, bx0 + 20, cy0 + 17 + (i + 0.82) * 44)
          caret = { x: bx0 + 20 + c.measureText(s).width + 4, y: cy0 + 17 + i * 44 }
        })
        if (!caret) caret = { x: bx0 + 20, y: cy0 + 17 }
        if (Math.floor(t * 2.4) % 2 === 0 && crum === 0) { c.fillStyle = ct.col; c.fillRect(caret.x, caret.y + 4, 4, 38) }
        c.restore()
        // the caught circle around the worst words
        const d = ct.d
        if (d && d.caught != null && t > d.caught && (d.slash == null || t < d.slash + 0.4)) {
          const r = findSub(c, shown, d.sub, bx0 + 20, cy0 + 17)
          if (r) caughtCircle(c, r, prog(t, d.caught, d.caught + 0.3), t)
        }
        // the slash
        if (d && d.slash != null && t > d.slash && t < d.slash + 0.55) {
          const k = prog(t, d.slash, d.slash + 0.32)
          drawSlash(c, { x: bx0, y: cy0, w: cw, h: chH }, k, 1 - prog(t, d.slash + 0.4, d.slash + 0.55))
          // the stamp
          const sk = easeOutBack(prog(t, d.slash + 0.12, d.slash + 0.3), 2.4) * (1 - prog(t, d.slash + 0.42, d.slash + 0.55))
          if (sk > 0.01) stamp(c, bx0 + cw / 2, cy0 - 70, o.drafts.indexOf(d) ? 'ALSO NO.' : 'NOPE.', RED, sk, o.drafts.indexOf(d) ? 0.1 : -0.12)
        }
        if (o.approve != null && t > o.approve && t < o.send) {
          const sk = easeOutBack(prog(t, o.approve, o.approve + 0.25), 2.4)
          stamp(c, bx0 + cw / 2, cy0 - 70, 'SEND IT.', GREEN, sk, 0.08)
        }
      }
      // the SEND button + the hand
      const sbx = bx0 + cw + 14, sby = cy0 + chH - 84
      const pulse = ct && t < o.send ? 0.5 + 0.5 * Math.sin(t * 10) : 0
      c.fillStyle = INK; c.fillRect(sbx - 4, sby - 4, 88, 88)
      c.fillStyle = ct && ct.gold ? GOLD : pulse > 0 ? '#ff6b78' : BLUE; c.fillRect(sbx, sby, 80, 80)
      drawBits(c, ['...X...', '..XXX..', '.XXXXX.', 'XX.X.XX', '...X...', '...X...', '...X...'], { X: BONE }, sbx + 40, sby + 40, 7, { outline: null })
      // the hand: frame 0 mid-slam on SEND, hovering while a draft is up, taps on send
      let hk = 0, hy = 0
      if (t < 0.5) { hk = 1; hy = -40 * (1 - ease.outCubic(prog(t, 0, 0.12))) + 60 * ease.inCubic(prog(t, 0.3, 0.5)) }
      const ht = R.find(q => t > q.send - 0.5 && t < q.send + 0.4)
      if (ht) { hk = 1; const p2 = prog(t, ht.send - 0.5, ht.send); hy = lerp(140, 0, ease.outCubic(p2)) + 140 * ease.inCubic(prog(t, ht.send + 0.1, ht.send + 0.4)) }
      if (hk) drawHand(c, sbx + 52, sby + 70 + hy + 3 * Math.sin(t * 40), 7)
      c.restore()
    }

    // camera: frame-0 whip zoom settling, shakes on slashes
    function shakeAt(t) {
      let a = 0
      for (const q of SL) { const d = t - q.t - 0.08; if (d > 0 && d < 0.45) a += 12 * Math.exp(-d * 9) }
      const d0 = t; if (d0 < 0.35) a += 10 * (1 - d0 / 0.35)
      return { x: a * Math.sin(t * 71), y: a * Math.cos(t * 53), r: a * 0.0012 * Math.sin(t * 47) }
    }
    function freezeAt(t) { for (const q of SL) if (t > q.t && t < q.t + 0.3) return q.t; return null }

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        // freeze frames on each slash (the picture holds while the pen lands)
        const fz = freezeAt(t)
        const tp = fz != null ? fz + (t - fz) * 0.15 : t
        x.clearRect(0, 0, 1080, 1920)
        paint(x, tp)
        sparkles(x, t, PIS.x, PIS.y, T.last + 0.1, 14, 220, 5, [GOLD, '#8fe3ff', BONE])
        R.forEach(o => o.rep[0] && sparkles(x, t, SND.x, SND.y - 120, o.rep[0].at, 8, 140, o.i + 2, [GOLD, BONE, '#ff8fb1']))
        // camera: whip zoom at frame 0
        const z0 = 1
        const zs = SL.reduce((a, q) => a + 0.05 * Math.sin(Math.PI * prog(t, q.t, q.t + 0.3)), 0)
        world.style.transform = `scale(${(z0 + zs).toFixed(4)})`
        // DOM
        for (const h of H) h.p.update(t, t < h.off ? 1 : outK(t, [h.off, h.off + 0.2]))
        HL.update(t, 1)
        for (const b of boxes) b.update(t)
        for (const ch of CH) { const k = t >= ch.on && t < ch.off ? easeOutBack(prog(t, ch.on, ch.on + 0.3), 2.6) * (1 - prog(t, ch.off - 0.15, ch.off)) : 0; ch.e.style.display = k > 0.01 ? 'block' : 'none'; ch.e.style.transform = `scale(${k.toFixed(3)}) rotate(${(-3 + 3 * k).toFixed(2)}deg)` }
        if (PR) { const k = t >= PR.on && t < PR.off ? easeOutBack(prog(t, PR.on, PR.on + 0.3), 2.6) * (1 - prog(t, PR.off - 0.2, PR.off)) : 0; PR.e.style.display = k > 0.01 ? 'block' : 'none'; PR.e.style.transform = `scale(${k.toFixed(3)}) rotate(${(2 - 2 * k).toFixed(2)}deg)` }
        // colour flash on each slash
        const fl = SL.reduce((a, q) => a + 0.55 * (1 - prog(t, q.t, q.t + 0.12)) * (t >= q.t ? 1 : 0), 0)
        flash.style.background = '#ff4d5e'
        flash.style.opacity = String(clamp(fl) * 0.5)
        drawGrain(gx, t)
      },
    }
  }

  // ── sound
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const CUES = [
    // frame 0: the slam + whip
    ['whoosh', 0, 0.35, 0.05], ['tick', 0.02, 0.06], ['pop', 0.05, 1174.66, 0.04, 0],
    ...R.flatMap(o => [
      ...o.inc.map((m, k) => ['pop', m.at, NOTE[(k + 2) % 7], 0.04, -0.25]),
      ...(o.bar ? [['riser', o.bar[0], o.bar[1], 0.03], ['bell', o.bar[1] - 0.05, 1760, 0.02, 0.6, 0]] : []),
      ...o.drafts.flatMap(d => [
      ...(d.d0 >= 0 ? Array.from({ length: Math.floor((d.d1 - d.d0) * DRAFT_CPS / 2) }, (_, k) => ['tick', +(d.d0 + k * 2 / DRAFT_CPS).toFixed(3), 0.014]) : []),
      ...(d.caught != null ? [['pluck', d.caught, 440, 0.04, 0.4, 0], ['tick', d.caught + 0.05, 0.04]] : []),
      ...(d.slash != null ? (o => [['whoosh', o.slash - 0.4, 0.3, 0.04], ['whoosh', o.slash, 0.08, 0.07], ['whoosh', o.slash + 0.07, 0.1, 0.05], ['whoosh', o.slash + 0.02, 0.25, 0.06], ['tom', o.slash + 0.15, 110, { gain: 0.22, decay: 0.25 }], ['tick', o.slash + 0.15, 0.06], ['whoosh', o.slash + 0.4, 0.3, 0.03]])(d) : [])]),
      ...(o.approve != null ? [['bell', o.approve, 1760, 0.04, 0.9, 0], ['glitter', o.approve, o.approve + 0.4]] : []),
      ...(o.r0 >= 0 ? Array.from({ length: Math.floor((o.r1 - o.r0) * REWRITE_CPS / 3) }, (_, k) => ['pop', +(o.r0 + k * 3 / REWRITE_CPS).toFixed(3), NOTE[k % 7] * 2, 0.008, 0.2]) : []),
      ['tick', o.send - 0.02, 0.05], ['whoosh', o.send, 0.35, 0.05], ['pop', o.send + 0.05, 1318.51, 0.04, 0.3],
      ...(o.rep.length ? [['tick', o.typing[0], 0.02], ['tick', o.typing[0] + 0.13, 0.02], ['tick', o.typing[0] + 0.26, 0.02]] : []),
      ...o.rep.flatMap((m, k) => [['pop', m.at, NOTE[(k * 2 + 1) % 7], 0.05, -0.25], ['bell', m.at + 0.04, 1760, 0.02, 0.6, -0.2]]),
      ...(o.rep.length ? [['glitter', o.rep[0].at, o.rep[0].at + 0.4]] : []),
    ]),
    ...talkCues(LINES, { cps: CPS }),
    ['pop', T.last, 1174.66, 0.045, 0], ['pop', T.last + 0.1, 1567.98, 0.04, 0], ['glitter', T.last + 0.05, T.last + 0.6],
    ...(LOOP ? [['whoosh', LB[0], 0.4, 0.035]] : []),
  ]
  const KIT = [whipZoom(WHIP), slamTitle(HOOK), recordScratch(REC),
    ...CHAP.map(c => chapter(c)), ...BARS.map(b => loadingBar(b))]
  const SCENES = [frozen(build, [REC]), ...KIT]
  if (LOOP) SCENES.push(loopBack([build, whipZoom(WHIP), slamTitle(HOOK)], { duration: DURATION, len: 0.45 }))
  CUES.push(...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...CHAP.flatMap(c => chapterCues(c)), ...BARS.flatMap(b => loadingBarCues(b)), ...(LOOP ? loopCues({ duration: DURATION, len: 0.45 }) : []))
  return { DURATION, SCENES, CUES, T }
}

// ─────────────────────────────────────────── props
const RING = ['...WWWW...', '.WRRWWRRW.', '.RR....RR.', 'WR......RW', 'WW......WW', 'WW......WW', 'WR......RW', '.RR....RR.', '.WRRWWRRW.', '...WWWW...']
const HAND = ['...XX.....', '..XWWX....', '..XWWX....', '..XWWXXX..', '..XWWXWWXX', 'XXXWWXWWXWX', 'XWXWWWWWWWX', 'XWWWWWWWWWX', '.XWWWWWWWX.', '..XWWWWWX..', '..XXXXXXX..']
export function drawHand(c, cx, cy, cell) { drawBits(c, HAND, { X: INK, W: '#ffffff' }, cx, cy + 4 * cell, cell, { outline: null }) }
const PEN = ['..KK..', '.KRRK.', '.KRRK.', '.KRRK.', '.KRRK.', '.KRRK.', '.KRRK.', '.KWWK.', '.KWWK.', '..KK..', '...K..']
export function drawPen(c, x, y, cell, rot) { drawBits(c, PEN, { K: INK, R: RED, W: BONE }, x, y, cell, { rot, outline: null }) }
export function slashPath(b, k) {
  // two zig-zag strokes across the box: down-right then back across
  const P = [[b.x + 10, b.y + 8], [b.x + b.w - 10, b.y + b.h - 8], [b.x + 30, b.y + b.h * 0.55], [b.x + b.w - 30, b.y + 10]]
  const seg = Math.min(2.999, k * 3), i = Math.floor(seg), f = seg - i
  return { x: lerp(P[i][0], P[i + 1][0], f), y: lerp(P[i][1], P[i + 1][1], f), P }
}
export function drawSlash(c, b, k, alpha = 1) {
  if (k <= 0 || alpha <= 0) return
  const { P } = slashPath(b, 0), tip = slashPath(b, k)
  const seg = Math.min(2.999, k * 3), n = Math.floor(seg)
  c.save(); c.globalAlpha *= alpha; c.lineCap = 'round'; c.lineJoin = 'round'
  for (const [col, wd] of [[INK, 26], [RED, 16]]) {
    c.strokeStyle = col; c.lineWidth = wd; c.beginPath(); c.moveTo(P[0][0], P[0][1])
    for (let i = 1; i <= n; i++) c.lineTo(P[i][0], P[i][1])
    c.lineTo(tip.x, tip.y); c.stroke()
  }
  c.restore()
}
export function stamp(c, cx, cy, text, col, k, rot) {
  c.save(); c.translate(cx, cy); c.rotate(rot); c.scale(k, k)
  c.font = `800 64px ${INTER}`; const w = c.measureText(text).width + 50
  c.fillStyle = INK; c.fillRect(-w / 2 - 8, -46, w + 16, 92)
  c.fillStyle = col; c.fillRect(-w / 2, -38, w, 76)
  c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, 0, 3)
  c.restore()
}
function findSub(c, lines, sub, x0, y0) {
  if (!sub) return null
  for (let i = 0; i < lines.length; i++) {
    const j = lines[i].toLowerCase().indexOf(sub.toLowerCase())
    if (j >= 0) { const a = c.measureText(lines[i].slice(0, j)).width, w = c.measureText(lines[i].slice(j, j + sub.length)).width; return { x: x0 + a, y: y0 + i * 44, w, h: 44 } }
  }
  return null
}
export function caughtCircle(c, r, k, t) {
  const cx = r.x + r.w / 2, cy = r.y + r.h / 2 + 4, rx = r.w / 2 + 26, ry = r.h / 2 + 18
  c.save(); c.lineCap = 'round'
  for (const [col, wd] of [[INK, 14], [RED, 8]]) {
    c.strokeStyle = col; c.lineWidth = wd; c.beginPath()
    const N = 40, end = Math.floor(N * 1.12 * k)
    for (let i = 0; i <= end; i++) { const a = -2.2 + (i / N) * Math.PI * 2, rr = 1 + 0.04 * Math.sin(i * 1.7); const px = cx + Math.cos(a) * rx * rr, py = cy + Math.sin(a) * ry * rr; i ? c.lineTo(px, py) : c.moveTo(px, py) }
    c.stroke()
  }
  c.restore()
}
