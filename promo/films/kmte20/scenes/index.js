// kmte20: MIRROR TALK No. 20 (long), "The first New Year's without them." (90 s vertical, star_advice post, lofi · C).
// Hard cut. Row: promo/films/month2/m21.md. No end card, no card cut. Chapter stickers (hookkit).
//   0.00   frame 0: Capricorn mid-spin, the clock slammed to 11:59 PM, confetti frozen mid-air. Hook "First New Year's |
//          *without* them."  2.7 the promise: "Stay till *midnight.*"  4.6: EARLIER THAT NIGHT · 9:00 PM.
//   5.0    1 · THE INVITE  "party at Jo's!! you coming?" · "stay home or go?" (HOME / PARTY, the arrow swings) ·
//          "what would you tell a friend tonight?" · "come, even for an *hour*." · "I'll come for a bit!" → "YAY"
//   20.0   2 · THE YEAR IN REVIEW  JAN the good trip · APR the breakup · JUN the friends who showed up · SEP new job ·
//          NOV learned to cook · "it was a *lot* of year." · "you got through *every* month." · PISCES: "the friends one!!"
//   38.0   3 · THE RESOLUTIONS  be less sensitive · never cry at work · fix everything → "these are all about *fixing* you."
//          → sleep more · call friends back · be gentle with me · "that list I'd actually *keep*."
//   54.0   4 · THE TEXT  typed to the ex: "happy new year. I miss" · "what do you *want* from sending it?" · "to not feel
//          alone at *midnight*." · "then text someone who'll be *there*." · deleted → to a friend: "save me a spot by the
//          window?" → "ALWAYS. hurry!!" · PISCES: "growth!!"
//   70.0   5 · MIDNIGHT  11:59 · countdown 10…1 → 2027, confetti · the friends' video call, answered ·
//          "happy new year. *start* soft."
//   87.6   last line "Begin the year | *gently.*"  Hard cut at 90.
import { makeMirror, drawPhone, drawPhoto, drawNote, drawClock, bubble, hearts, sparkles, confetti, drawBits, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, INK, BONE, GOLD, RED, r3, INTER, MONO } from '../../kmte01/mirrorkit.js'

const CH = [5.0, 20.0, 38.0, 54.0, 70.0]
const T = {
  promise: 2.7, earlier: 4.4,
  inv: 5.6, s1: 6.6, swing: [8.0, 11.0], m1: 11.4, s2: 13.6, m2: 15.8, rep: 17.2, yay: 17.9,
  year: [20.6, 22.4, 24.2, 26.0, 27.8], s3: 29.8, m3: 32.0, p1: 34.6,
  res: [38.6, 39.4, 40.2], m4: 41.4, s4: 43.6, strikes: [45.8, 46.2, 46.6], nres: [47.2, 48.0, 48.8], s5: 50.2,
  typing: [54.6, 57.0], m5: 57.6, s6: 60.0, m6: 62.4, del: [63.8, 64.8], sent: 65.6, reply: 66.8, p2: 68.0,
  clock: 70.4, count: 73.8, ny: 79.8, call: 81.4, answer: 83.2, m7: 84.4, last: 87.6,
}
const YEAR = [['JAN', 'the good trip', '#7fd0ff', false], ['APR', 'the breakup', '#8f86a8', true], ['JUN', 'the friends who showed up', '#ff8fb1', false], ['SEP', 'new job', '#ffe27a', false], ['NOV', 'learned to cook', '#9fe6b0', false]]
const CONF = Array.from({ length: 28 }, (_, i) => ({ x: (i * 131) % 1040 + 20, y: 380 + (i * 197) % 1000, r: i * 0.7, c: [GOLD, '#ff8fb1', '#7fd0ff', '#9fe6b0', BONE][i % 5] }))
const DRAFT_EX = 'happy new year. I miss'

function frozenConfetti(x, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  for (const c of CONF) { x.save(); x.translate(c.x, c.y); x.rotate(c.r); x.fillStyle = c.c; x.fillRect(-8, -4, 16, 8); x.restore() }
  x.restore()
}
function choice(x, t, cx, label, col, on, icon) {
  x.save(); x.translate(cx, 760); x.scale(on ? 1.08 : 0.94, on ? 1.08 : 0.94)
  box(x, -115, -140, 230, 280, on ? '#2a1f55' : '#1a1430', { b: 6 }); R(x, col, -115, -140, 230, 46)
  x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 0, -116)
  icon(x)
  x.restore()
}

const F = makeMirror({
  id: 'kmte20', sign: 'capricorn', dur: 90,
  hook: { text: 'First New Year’s | *without* them.', accentColor: '#ffd36b', out: [2.45, 2.65] },
  chapters: [
    { at: CH[0], text: 'THE INVITE' }, { at: CH[1], text: 'THE YEAR IN REVIEW' }, { at: CH[2], text: 'THE RESOLUTIONS' }, { at: CH[3], text: 'THE TEXT' }, { at: CH[4], text: 'MIDNIGHT', out: [87.3, 87.55] },
  ],
  fx: [
    { k: 'screenShake', at: 0.1, amp: 18, len: 0.6 },
    { k: 'whipZoom', at: CH[0] - 0.06, from: 1.3 }, { k: 'whipZoom', at: T.m1 - 0.08, from: 1.2 }, { k: 'screenShake', at: T.yay, amp: 10, len: 0.3 },
    { k: 'whipZoom', at: CH[1] - 0.06, from: 1.3 }, { k: 'whipZoom', at: T.m3 - 0.08, from: 1.2 }, { k: 'screenShake', at: T.p1, amp: 10, len: 0.35 },
    { k: 'whipZoom', at: CH[2] - 0.06, from: 1.3 }, { k: 'whipZoom', at: T.m4 - 0.08, from: 1.2 }, { k: 'screenShake', at: T.strikes[0], amp: 8, len: 0.3 },
    { k: 'whipZoom', at: CH[3] - 0.06, from: 1.3 }, { k: 'recordScratch', at: T.m5 - 0.3, len: 1.0, caption: 'wait. *why* though?', top: 1000 }, { k: 'whipZoom', at: T.m6 - 0.08, from: 1.2 }, { k: 'screenShake', at: T.p2, amp: 10, len: 0.35 },
    { k: 'whipZoom', at: CH[4] - 0.06, from: 1.3 }, { k: 'countdown', at: T.count, from: 10, gap: 0.6, go: '2027', y: 860 }, { k: 'screenShake', at: T.ny, amp: 24, len: 0.6 },
    { k: 'incomingCall', at: T.call, out: [T.answer + 0.2, T.answer + 0.5], name: 'the group chat', sub: 'video call…', glyph: '★', color: '#ff8fb1', answerAt: T.answer },
  ],
  caps: [
    { at: T.promise, out: [4.25, 4.45], text: 'Stay till | *midnight.*', accent: '#ffd36b' },
    { at: CH[0] + 0.3, out: [19.7, 19.95], text: 'Home or *party?*', accent: '#ff8fb1', top: 240, size: 76, accentSize: 100 },
    { at: CH[1] + 0.3, out: [37.7, 37.95], text: 'You got *through* it.', accent: '#7fd0ff', top: 240, size: 76, accentSize: 100 },
    { at: CH[2] + 0.3, out: [53.7, 53.95], text: 'Gentle *beats* fixed.', accent: '#7dffb0', top: 240, size: 76, accentSize: 100 },
    { at: CH[3] + 0.3, out: [69.7, 69.95], text: 'Text who’ll be *there.*', accent: '#c9a6ff', top: 240, size: 76, accentSize: 100 },
    { at: CH[4] + 0.3, out: [73.6, 73.8], text: '11:59. *Almost.*', accent: '#ffd36b', top: 240, size: 76, accentSize: 100 },
    { at: T.last, out: [99, 100], text: 'Begin the year | *gently.*', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: "stay home or go? I can't *decide*." },
    { t: T.m1, who: 'M', text: 'what would you tell a *friend* tonight?' },
    { t: T.s2, who: 'S', text: '…"come, even for an *hour*."' },
    { t: T.m2, who: 'M', text: "then that's your *answer*." },
    { t: T.s3, who: 'S', text: 'it was a *lot* of year.' },
    { t: T.m3, who: 'M', text: 'you got through *every* month of it.' },
    { t: T.p1, who: 'P', text: 'the *friends* one!!' },
    { t: T.m4, who: 'M', text: 'these are all about *fixing* you.' },
    { t: T.s4, who: 'S', text: "isn't that the *point*?" },
    { t: T.s5, who: 'S', text: "…that list I'd actually *keep*." },
    { t: T.m5, who: 'M', text: 'what do you *want* from sending it?' },
    { t: T.s6, who: 'S', text: 'to not feel alone at *midnight*.' },
    { t: T.m6, who: 'M', text: "then text someone who'll be *there*." },
    { t: T.p2, who: 'P', text: '*growth*!!' },
    { t: T.m7, who: 'M', text: 'happy new year. *start* soft.' },
  ],
  boxes: [[6.4, 17.0], [29.6, 37.7], [41.2, 45.6], [50.0, 53.7], [57.4, 63.6], [67.8, 69.7], [84.2, 87.3]],
  cam(t) { const w = 1 - ease.outCubic(prog(t, 0, 0.6)); return { zoom: 1 + 0.15 * w, dy: 50 * w, rot: -0.04 * w } },
  pose(t) {
    const spin = t < 1 ? 0.5 * Math.cos(t * 7) * (1 - t) : 0
    const p = { mood: 'wide', look: [0, -0.6], rot: spin, blink: t < 1 ? false : undefined }
    if (t > CH[0]) { p.mood = 'neutral'; p.look = [1, 0.2] }
    if (t > T.s1) { p.mood = 'squint'; p.look = [1, -0.6] }
    if (t > T.m1) { p.mood = 'neutral'; p.look = [1, -0.8] }
    if (t > T.s2) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.yay) { p.mood = 'happy'; p.look = undefined }
    if (t > CH[1]) { p.mood = 'neutral'; p.look = [1, -0.7] }
    if (t > T.year[1]) { p.mood = 'wide' }
    if (t > T.year[2]) { p.mood = 'sparkle' }
    if (t > T.m3) { p.mood = 'happy'; p.look = undefined }
    if (t > CH[2]) { p.mood = 'squint'; p.look = [1, -0.4] }
    if (t > T.m4) { p.mood = 'wide'; p.look = [1, -0.8] }
    if (t > T.nres[2]) { p.mood = 'happy'; p.look = undefined }
    if (t > CH[3]) { p.mood = 'neutral'; p.look = [1, 0.4] }
    if (t > T.m5) { p.mood = 'wide'; p.look = [1, -0.8] }
    if (t > T.s6) { p.mood = 'neutral'; p.look = [0, 1] }
    if (t > T.m6) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.reply) { p.mood = 'happy'; p.look = undefined }
    if (t > CH[4]) { p.mood = 'wide'; p.look = [1, -0.8] }
    if (t > T.ny) { p.mood = 'heart'; p.look = undefined }
    return p
  },
  signHops: [T.yay, T.nres[2] + 0.3, T.reply, ...Array.from({ length: 10 }, (_, i) => r3(T.count + i * 0.6)), T.ny, T.ny + 0.5, T.answer],
  refl(t) {
    const p = { mood: 'neutral', look: [-1, 0.6] }
    if (t < 1) { p.mood = 'wide'; p.look = [-0.4, -0.4] }
    if (t > T.m1) p.mood = 'happy'
    if (t > T.year[0] - 0.2 && t < T.s3) { p.x = 740; p.y = 1060; p.s = 160 }
    if (t > T.m3) p.mood = 'sparkle'
    if (t > T.m4) p.mood = 'happy'
    if (t > CH[4]) { p.mood = 'wide'; p.look = [-1, -0.6] }
    if (t > T.ny) p.mood = 'heart'
    if (t > T.m7) { p.mood = 'wink' }
    return p
  },
  reflHops: Array.from({ length: 10 }, (_, i) => r3(T.count + i * 0.6 + 0.05)),
  pis(t) {
    const p = { tears: 2, mood: 'wide' }
    if (t > T.yay - 0.2 && t < CH[1]) { p.tears = 3; p.mood = 'happy' }
    if (t > T.year[1]) { p.tears = 3; p.mood = 'wide' }
    if (t > T.year[2]) { p.mood = 'sparkle' }
    if (t > CH[2]) { p.tears = 2; p.mood = 'wide' }
    if (t > T.p2 - 0.3) { p.tears = 3; p.mood = 'happy' }
    if (t > CH[4]) { p.tears = 2; p.mood = 'wide' }
    if (t > T.ny) { p.tears = 3; p.mood = 'happy' }
    return p
  },
  pisHops: [T.p1, T.p2, T.ny, T.ny + 0.4],
  tissuePulls: [T.yay, T.year[1] + 0.3, T.p1, T.p2, T.ny, T.ny + 0.3, T.ny + 0.6],
  glass(x, t) {
    // home or party?
    const ck = easeOutBack(prog(t, T.swing[0] - 0.4, T.swing[0]), 1.6) * outK(t, [T.m2, T.m2 + 0.4])
    if (ck > 0.01) {
      x.save(); x.translate(540, 760); x.scale(ck, ck); x.translate(-540, -760)
      const sw = t < T.swing[1] ? Math.sin((t - T.swing[0]) * 5) : t < T.s2 ? 0 : 1
      choice(x, t, 410, 'HOME', '#7fd0ff', sw < -0.3, (c) => { R(c, INK, -70, -20, 140, 90); R(c, '#9fd8f6', -64, -14, 128, 78); R(c, '#c9ecfb', -64, -14, 128, 14) })
      choice(x, t, 670, 'PARTY', '#ff8fb1', sw > 0.3, (c) => { for (let i = 0; i < 3; i++) { c.fillStyle = INK; c.beginPath(); c.arc(-50 + i * 50, 10 - (i % 2) * 20, 28, 0, 7); c.fill(); c.fillStyle = [GOLD, '#ff8fb1', '#9fe6b0'][i]; c.beginPath(); c.arc(-50 + i * 50, 10 - (i % 2) * 20, 23, 0, 7); c.fill() } })
      const ax = 540 + clamp(sw, -1, 1) * 120
      drawBits(x, ['..A..', '.AAA.', 'AAAAA', '..A..', '..A..'], { A: GOLD }, ax, 950, 9)
      x.restore()
    }
    // the year in review
    YEAR.forEach(([m, c, col, sad], i) => {
      const t0 = T.year[i], k = easeOutBack(prog(t, t0, t0 + 0.35), 1.6) * outK(t, [CH[2] - 0.4, CH[2]])
      if (k <= 0.01) return
      const pos = [[380, 640, -0.08], [620, 640, 0.07], [410, 870, 0.04], [650, 880, -0.05], [530, 760, 0.02]][i]
      drawPhoto(x, { cx: pos[0], cy: pos[1], w: 190, rot: pos[2], k, a: '#e9b24a', b: col, capt: c.length > 14 ? c.slice(0, 13) + '…' : c, heart: !sad, faded: sad ? 0.45 : 0 })
      x.save(); x.translate(pos[0] - 70, pos[1] - 120); x.rotate(-0.15); x.scale(k, k); R(x, INK, -38, -18, 76, 36); R(x, GOLD, -34, -14, 68, 28)
      x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(m, 0, 2); x.restore()
    })
  },
  front(x, t, K) {
    // frame 0: 11:59 slammed in, confetti frozen mid-air (it erupts for real at midnight)
    const c0 = t < T.earlier ? 1 : 0
    frozenConfetti(x, c0)
    if (t < T.earlier + 0.6) {
      const lbl = t < T.earlier ? '11:59 PM' : '9:00 PM'
      drawClock(x, 760, 560, lbl, { k: (t < T.earlier ? 1 + 0.25 * Math.exp(-t * 6) : pop01(t, T.earlier, 0.25, 2.6)) * outK(t, [T.earlier + 0.4, T.earlier + 0.6]), size: 64, col: '#ffd36b' })
      if (t > T.earlier) { const k = pop01(t, T.earlier, 0.25, 2.6) * outK(t, [T.earlier + 0.4, T.earlier + 0.6]); x.save(); x.translate(540, 1000); x.rotate(-0.06); x.scale(k, k); R(x, INK, -250, -40, 500, 80); R(x, '#ffe27a', -242, -32, 484, 64); x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('EARLIER THAT NIGHT…', 0, 3); x.restore() }
    }
    // the invite phone
    if (t > T.inv - 0.4 && t < T.swing[0]) {
      const inn = easeOutBack(prog(t, T.inv - 0.4, T.inv), 1.4), go = ease.inCubic(prog(t, T.swing[0] - 0.4, T.swing[0]))
      drawPhone(x, t, { cx: 700, top: 560 + (1 - inn) * 1500 + go * 1500, w: 420, h: 520, title: 'the group chat', size: 30, rot: 0.03, msgs: [{ at: T.inv, side: 'L', text: "party at Jo's!! you coming?" }] })
    }
    if (t > T.rep - 0.4 && t < CH[1]) {
      const inn = easeOutBack(prog(t, T.rep - 0.4, T.rep), 1.4), go = ease.inCubic(prog(t, CH[1] - 0.4, CH[1]))
      drawPhone(x, t, { cx: 700, top: 560 + (1 - inn) * 1500 + go * 1500, w: 420, h: 520, title: 'the group chat', size: 30, rot: 0.03, msgs: [{ at: -1, side: 'L', text: "party at Jo's!! you coming?" }, { at: T.rep, side: 'R', text: "I'll come for a bit!" }, { at: T.yay, side: 'L', text: 'YAY!!!' }] })
    }
    // resolutions
    const rk = easeOutBack(prog(t, T.res[0] - 0.4, T.res[0]), 1.6) * outK(t, [CH[3] - 0.4, CH[3]])
    const re = t > T.nres[0] - 0.3
    drawNote(x, t, { cx: 640, cy: 780, w: 440, h: 330, rot: 0.03, k: rk * (re ? pop01(t, T.nres[0] - 0.3, 0.3, 2) : 1) * (t > T.strikes[2] + 0.2 && !re ? 1 - prog(t, T.strikes[2] + 0.2, T.nres[0] - 0.3) : 1), size: 30, lineGap: 58,
      title: re ? 'next year (kind version)' : 'NEXT YEAR I WILL:', lines: re
        ? [{ text: '1. sleep more', at: T.nres[0] }, { text: '2. call friends back', at: T.nres[1] }, { text: '3. be gentle with me', at: T.nres[2], col: '#7a3ec8', bold: true }]
        : [{ text: '1. be less sensitive', at: T.res[0], strike: T.strikes[0] }, { text: '2. never cry at work', at: T.res[1], strike: T.strikes[1] }, { text: '3. fix everything', at: T.res[2], strike: T.strikes[2] }] })
    // the text to the ex → deleted → to a friend
    if (t > T.typing[0] - 0.5 && t < CH[4]) {
      const inn = easeOutBack(prog(t, T.typing[0] - 0.5, T.typing[0] - 0.15), 1.4), go = ease.inCubic(prog(t, CH[4] - 0.4, CH[4]))
      const toFriend = t > T.del[1]
      const top = 540 + (1 - inn) * 1500 + go * 1500
      drawPhone(x, t, { cx: 700, top, w: 440, h: 560, title: toFriend ? 'Jo ★' : 'them', size: 30, rot: 0.03, msgs: toFriend ? [{ at: T.sent, side: 'R', text: 'save me a spot by the window?' }, { at: T.reply, side: 'L', text: 'ALWAYS. hurry!!' }] : [] })
      if (!toFriend) {
        const n = t < T.del[0] ? Math.ceil(DRAFT_EX.length * prog(t, ...T.typing)) : Math.ceil(DRAFT_EX.length * (1 - prog(t, ...T.del)))
        x.save(); x.translate(700, top + 280); x.rotate(0.03)
        R(x, '#2a1f55', -190, 160, 380, 70); x.font = `700 28px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
        x.fillText(DRAFT_EX.slice(0, n) + (Math.floor(t * 4) % 2 ? '|' : ''), -175, 195, 350); x.restore()
      }
    }
    // midnight
    if (t > T.clock && t < T.ny + 0.3) drawClock(x, 760, 560, t < T.ny ? '11:59 PM' : '12:00 AM', { k: pop01(t, T.clock, 0.3, 2.4) * outK(t, [T.ny + 0.05, T.ny + 0.3]), size: 64, col: '#ffd36b' })
    confetti(x, t, T.ny, 540, 900, { n: 40, life: 3 })
    confetti(x, t, T.ny + 1.2, 300, 1000, { n: 30, life: 2.6 })
    confetti(x, t, T.yay, 700, 900)
    hearts(x, t, T.nres[2] + 0.3, 300, 1060, { n: 6, cell: 7, spread: 160 })
    hearts(x, t, T.reply + 0.1, 300, 1060, { n: 6, cell: 7, spread: 160 })
    hearts(x, t, T.answer + 0.4, 540, 1000, { n: 8, cell: 8, spread: 300, life: 1.8 })
    sparkles(x, t, 540, 760, T.ny, 14, 300, 2)
    void K
  },
  cues: [
    ['boom', 0.0, 0.18], ['bell', 0.05, 1046.5, 0.03, 1.0, 0], ...Array.from({ length: 4 }, (_, i) => ['whoosh', r3(i * 0.25), 0.3, 0.03]),
    ['whoosh', T.earlier, 0.6, 0.04], ['pop', T.earlier + 0.05, 523.25, 0.045, 0],
    ['pop', T.inv, 880, 0.045, 0.3], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.swing[0] + i * 0.5), 0.03]),
    ['pop', T.rep, 1174.66, 0.045, 0.3], ['pop', T.yay, 1567.98, 0.05, 0.3], ['glitter', T.yay, T.yay + 0.5],
    ...T.year.map((y, i) => ['pop', y, [783.99, 523.25, 1046.5, 1174.66, 1318.51][i], 0.045, (i % 2 ? 0.3 : -0.3)]),
    ...T.res.flatMap(s => Array.from({ length: 5 }, (_, i) => ['tick', r3(s + i * 0.08), 0.015])), ...T.strikes.map(s => ['whoosh', s, 0.15, 0.03]),
    ...T.nres.map((n, i) => ['pluck', n, [1046.5, 1174.66, 1318.51][i], 0.03, 0.5, 0.2]),
    ...Array.from({ length: 16 }, (_, i) => ['tick', r3(T.typing[0] + i * 0.15), 0.015]), ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.del[0] + i * 0.12), 0.02]),
    ['pop', T.sent, 1174.66, 0.045, 0.3], ['pop', T.reply, 1318.51, 0.05, -0.2], ['glitter', T.reply, T.reply + 0.4],
    ['pop', T.clock, 659.25, 0.045, 0], ['crash', T.ny, { gain: 0.09 }], ['bell', T.ny + 0.05, 2093, 0.035, 1.6, 0], ['glitter', T.ny, T.ny + 1.2],
    ['bell', T.last + 0.5, 1046.5, 0.03, 1.4, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
