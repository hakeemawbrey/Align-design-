// kroe24: RATE THE OPENER, "Aries Has 60 Seconds" (60 s vertical, long star_advice trial reel, Month 2 boost m37,
// funk · E). Built from ../../kroe01/openerkit.js + promo/films/hookkit.js. No end card, no card cut. Hard cut.
//   0.00   frame 0: ♈ Aries mid-yell, thumbs a blur, draft 1 "HI" mid-slam out of the phone, the countdown HUD at 60s;
//          hook "Aries. 60 seconds. | Perfect opener. Go." · 0.35 screen shake + whip · 1.0 promise "WAIT FOR THE REPLY"
//   DRAFT 1 (0–10)   "HI" → 3/10 "loud" · a VOLUME meter maxes out · deleted
//   DRAFT 2 (10–20)  "hey so I saw your profile and" → 4/10 "finish the thought" · loading bar: Error: thought not found
//   DRAFT 3 (20–30)  a rhyming poem → 5/10 "too much, too soon" · Pisces sobs "it's BEAUTIFUL"
//   DRAFT 4 (30–40)  "you seem cool" → record scratch "yep. 'cool.'" · 5/10 "vague"
//   DRAFT 5 (40–51.5) "hi! you climb? I fell off the easiest wall twice. tips?" → 10/10 "funny, true, a question"
//          · the timer goes red · Pisces: "SEND IT" · 51.5 SEND at 3 s left · typing dots · 54.0 the reply
//          "haha the green one is a trap. saturday?" · Aries frozen in joy, Pisces fountains · 56.0 the last line.
import {
  R, box, label, star, paddle, desk, nameplate, tissues, chatCard, chatBubble, measureBubble, typingDots, pen, sparkles, confetti, hearts,
  tint, buildBug, loadFonts, signStar, fill, drawSky, drawGrain, layerCanvas, SKY_H, GRAIN_H, pop01, outK, prog, clamp, lerp, ease,
  JUDGES, DESK, SLOT, INK, BONE, GOLD, RED, GREEN, INTER, MONO, r3,
} from '../../kroe01/openerkit.js'
import {
  slamTitle, slamTitleCues, whipZoom, whipZoomCues, screenShake, shakeCues, chapter, chapterCues, loadingBar, loadingBarCues,
  recordScratch, recordScratchCues, freezeTime,
} from '../../hookkit.js'

export const DURATION = 60
const ARIES = signStar('aries'), ACOL = tint(ARIES.color, 0.5)
// drafts: [start, end, text, score, why, typeLen]
const D = [
  { a: 0, b: 10, text: 'HI', score: '3', why: 'loud', type: [-1, -0.5], rate: 3.4, del: [8.4, 9.4], size: 120 },
  { a: 10, b: 20, text: 'hey so I saw your profile and', score: '4', why: 'finish the thought', type: [10.4, 12.2], rate: 13.0, del: [18.4, 19.4] },
  { a: 20, b: 30, text: 'roses are red, the sky is so blue, I saw your profile and wrote this for you', score: '5', why: 'too much, too soon', type: [20.4, 22.6], rate: 23.4, del: [28.3, 29.4], size: 46 },
  { a: 30, b: 40, text: 'you seem cool', score: '5', why: 'vague', type: [30.4, 31.6], rate: 34.7, del: [38.4, 39.4], size: 60 },
  { a: 40, b: 60, text: 'hi! you climb? I fell off the easiest wall twice. tips?', score: '10', why: 'funny, true, a question', type: [40.4, 42.9], rate: 43.6, del: null },
]
const SEND = 51.5, DOTS = [52.4, 54.0], REPLY = 54.0, BAWL = 54.9, LASTT = 56.0
const clock = t => t >= SEND ? 3 : Math.max(3, 60 - t * 57 / SEND)
const HOOK = { at: -1, text: 'Aries. 60 seconds. | *Perfect opener.* Go.', top: 200, size: 96, out: [2.6, 2.8] }
const WHIP = { at: 0.35, len: 0.45, from: 1.8, to: 1, cx: 620, cy: 760 }
const SHAKE = { at: 0.3, len: 0.5, amp: 26 }
const SHAKE2 = { at: 5.0, len: 0.6, amp: 30 }
const LOAD = { at: 14.0, len: 3.4, label: 'finishing the thought…', stallAt: 99, error: 'Error: thought not found', y: 1080 }
const REC = { at: 33.0, len: 1.5, caption: 'yep. *‘cool.’*', sub: 'four words. zero clues.', top: 1300 }
const CHAPS = [
  ...D.map((d, i) => ({ at: Math.max(3.0, d.a + 0.05), out: [(i < 4 ? d.b : SEND) - 0.3, (i < 4 ? d.b : SEND) - 0.12], n: i + 1, title: 'draft', color: GOLD, y: 250, x: 70 })),
  { at: SEND + 0.05, out: [REPLY - 0.2, REPLY - 0.05], n: 6, title: 'send', color: GREEN, y: 250, x: 70 },
  { at: REPLY + 0.05, out: [LASTT - 0.25, LASTT - 0.1], n: 7, title: 'the reply', color: '#ff8fb1', y: 250, x: 70 },
]
const LAST = { at: LASTT, text: 'Funny, true, and a question. | *Send it.*', top: 190, size: 84 }
const REPLY_TXT = 'haha the green one is a trap. saturday?'

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  buildBug(root)
  const gx = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }).getContext('2d')
  const MD = D.map(d => measureBubble(x, d.text, { size: d.size || 54 }))

  function current(t) { for (let i = D.length - 1; i >= 0; i--) if (t >= D[i].a) return i; return 0 }

  function draft(t) {
    const i = current(t), d = D[i], M = MD[i]
    let chars = Infinity
    if (t < d.type[1]) chars = Math.floor(d.text.length * prog(t, d.type[0], d.type[1]))
    if (d.del && t > d.del[0]) chars = Math.floor(d.text.length * (1 - prog(t, d.del[0], d.del[1])))
    if (chars <= 0 && t > d.type[0] + 0.1) return
    // frame 0: draft 1 is mid-slam out of the phone
    const fly = i === 0 ? 1 - ease.outBack(prog(t, 0.35, 0.95)) : 0
    const k = (1 + 0.6 * fly) * (1 + (t > SEND && t < SEND + 0.4 ? 0.08 * Math.sin((t - SEND) * 30) : 0))
    const sent = t > SEND
    x.save(); x.translate(-60 * fly, 220 * fly)
    chatBubble(x, d.text, 'R', SLOT.right, SLOT.top, { col: sent ? ACOL : (i === 0 ? ACOL : '#fff6ea'), size: d.size || 54, k, rot: -0.12 * fly, chars, caret: !sent && t > d.type[0], t })
    x.restore()
    if (!sent) label(x, `DRAFT ${i + 1}`, SLOT.right - 80, SLOT.top - 24, { size: 24, col: GOLD })
    else label(x, 'SENT ✓', SLOT.right - 80, SLOT.top + M.h + 26, { size: 24, col: GREEN })
    // the SEND button under the draft
    if (!sent || t < SEND + 0.5) {
      const ready = i === 4 && t > D[4].rate
      const pulse = ready ? 1 + 0.06 * Math.sin(t * 9) : 1
      x.save(); x.translate(SLOT.right - 90, SLOT.top + M.h + 70); x.scale(pulse, pulse)
      box(x, -80, -30, 160, 60, ready ? GREEN : '#4a4068', { b: 5 }); x.font = `800 30px ${INTER}`; x.fillStyle = ready ? INK : 'rgba(239,230,214,0.5)'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEND', 0, 2)
      x.restore()
    }
    // backspace flash
    if (d.del && t > d.del[0] && t < d.del[1]) label(x, '⌫ ⌫ ⌫', 540, SLOT.top + M.h + 150, { size: 40, col: RED })
  }

  function aries(t) {
    const i = current(t), d = D[i]
    let mood = 'wide', look = [1, -1]
    if (t > d.rate && t < (d.del ? d.del[0] : 99)) mood = Number(d.score) >= 9 ? 'sparkle' : 'squint'
    if (d.del && t > d.del[0]) mood = 'neutral'
    if (t > d.type[0] && t < d.type[1]) mood = 'wide'
    if (t > SEND) mood = 'wide'
    if (t > REPLY) mood = 'heart'
    const frozen = t > REPLY ? REPLY + 0.3 : t          // frozen in joy
    const F = star(x, frozen, 'aries', { x: 160, y: 1190, s: 250, mood, look, hops: [0.1, d.rate, ...(d.del ? [d.del[0]] : []), SEND, REPLY + 0.05], seed: 3, squash: t < 0.4 ? -0.08 : 0 })
    // blurred thumbs while typing (motion lines)
    const typing = (t > d.type[0] && t < d.type[1]) || t < 0.8 || (d.del && t > d.del[0] && t < d.del[1])
    if (typing) for (let q = 0; q < 5; q++) { const a = -0.9 + q * 0.3 + 0.1 * Math.sin(t * 40 + q); R(x, GOLD, 160 + Math.cos(a) * (150 + 10 * Math.sin(t * 50 + q)), F.cy + Math.sin(a) * 150, 30, 8) }
    if (t > REPLY) { hearts(x, t, REPLY + 0.1, 170, 1060, { n: 9, cell: 9 }); label(x, 'FROZEN IN JOY', 170, 1340, { size: 26, col: '#ff8fb1', alpha: clamp((t - REPLY - 0.4) * 3) }) }
  }

  function gags(t) {
    // draft 1: the VOLUME meter
    if (t > 4.4 && t < 8.3) {
      const k = pop01(t, 4.4, 0.3, 2) * outK(t, [8.0, 8.3]), f = clamp((t - 4.6) / 0.6)
      x.save(); x.globalAlpha = k
      box(x, 300, 1110, 560, 80, '#140c28', { b: 6 })
      label(x, 'VOLUME', 380, 1150, { size: 28, col: BONE })
      for (let s = 0; s < 10; s++) if (s / 10 < f) R(x, s < 6 ? GREEN : s < 8 ? GOLD : RED, 460 + s * 38, 1124, 30, 52)
      if (f >= 1) label(x, 'MAX', 840, 1100, { size: 32, col: RED, rot: 0.15 })
      x.restore()
    }
    // draft 3: Pisces sobbing "it's BEAUTIFUL"
    if (t > 24.4 && t < 28.0) {
      const k = pop01(t, 24.4, 0.3, 2.4) * outK(t, [27.7, 28.0])
      x.save(); x.translate(760, 1230); x.scale(k, k); x.rotate(0.05)
      x.font = `800 46px ${INTER}`; const w = x.measureText('it’s BEAUTIFUL').width + 50
      R(x, INK, -w / 2 - 6, -40, w + 12, 80); R(x, tint(signStar('pisces').color, 0.55), -w / 2, -34, w, 68); R(x, INK, 10, 40, 24, 22)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('it’s BEAUTIFUL', 0, 2); x.restore()
    }
    // draft 5: the timer goes red, Pisces: "SEND IT"
    if (t > 47.6 && t < SEND + 0.3) {
      const k = pop01(t, 47.6, 0.3, 2.4) * outK(t, [SEND, SEND + 0.3])
      x.save(); x.translate(760, 1230); x.scale(k, k); x.rotate(-0.05 + 0.03 * Math.sin(t * 12))
      x.font = `800 54px ${INTER}`; const w = x.measureText('SEND IT!!').width + 50
      R(x, INK, -w / 2 - 6, -44, w + 12, 88); R(x, GOLD, -w / 2, -38, w, 76); R(x, INK, 10, 44, 24, 22)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEND IT!!', 0, 2); x.restore()
    }
    if (t > D[4].rate) confetti(x, t, D[4].rate + 0.15, 540, 1200, { n: 40 })
    if (t > REPLY) confetti(x, t, REPLY + 0.2, 540, 1000, { n: 36 })
  }

  function reply(t) {
    const yy = SLOT.top + MD[4].h + 60
    if (t > DOTS[0] && t < DOTS[1]) typingDots(x, t, SLOT.left, yy, pop01(t, DOTS[0], 0.2, 2))
    if (t > REPLY) chatBubble(x, REPLY_TXT, 'L', SLOT.left, yy, { col: BONE, size: 54, k: pop01(t, REPLY, 0.28, 2.4) })
  }

  function judges(t) {
    const J = JUDGES, i = current(t), d = D[i]
    const before = t < d.rate, dt = t - d.rate
    const spin = (o) => (t * 2.4 + o) % 1
    const flip = before ? spin(0) : 1 - clamp(dt / 0.3) * 1
    const f = before ? spin(0) : clamp(dt / 0.32) < 0.5 ? 0.5 - clamp(dt / 0.32) : 0
    void flip
    const txt = before ? '?' : d.score, good = Number(d.score) >= 7
    const lift = !before && dt < 1 ? -24 * Math.exp(-dt * 4) : 0
    paddle(x, J.stars.x, J.paddleY + lift + 4 * Math.sin(t * 3), txt, { flip: before ? spin(0) : f, ink: txt === '?' ? INK : good ? '#1f9e55' : RED, rot: -0.06 })
    paddle(x, J.end.x, J.paddleY + 4 * Math.sin(t * 3 + 1), before ? '?' : '10', { flip: before ? spin(0.37) : f, ink: '#1f9e55', rot: 0.07 })
    star(x, t, 'stars', { ...J.stars, mood: before ? 'wide' : good ? 'happy' : 'squint', look: [0.6, -1], hops: [d.rate, ...(t > REPLY ? [REPLY + 0.2, REPLY + 0.8] : [])], seed: 2 })
    const pt = t > BAWL || (t > 24.0 && t < 28.0) || (t > D[4].rate && t < D[4].rate + 2) ? 3 : 2
    star(x, t, 'pisces', { ...J.end, mood: pt === 3 ? 'happy' : 'wide', look: [-0.6, -1], hops: [d.rate + 0.08, BAWL], tears: pt, seed: 6 })
    desk(x, t)
    tissues(x, 985, DESK.y + 4, 96)
    label(x, 'THE STARS', J.stars.x, DESK.y + 36, { size: 28, col: GOLD })
    label(x, 'PISCES', J.end.x, DESK.y + 36, { size: 28, col: tint(signStar('pisces').color, 0.4) })
    nameplate(x, t, d.why, d.rate + 0.15, d.del ? d.del[0] : 99, { col: good ? '#d9f7e3' : '#ffd6dc', rot: i % 2 ? 0.025 : -0.03 })
    if (good && !before) sparkles(x, t, J.stars.x, J.paddleY, d.rate + 0.3, 12, 140, 1)
  }

  function hud(t) {
    const c = clock(t), crit = c <= 10 && t < SEND
    const k = 1 + (crit ? 0.06 * Math.sin(t * 14) : 0)
    x.save(); x.translate(905, 92); x.scale(k, k)
    box(x, -125, -46, 250, 92, crit ? '#3a0a18' : '#140c28', { b: 6 })
    x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = crit ? (Math.floor(t * 6) % 2 ? RED : '#ff8a9a') : t >= SEND ? GREEN : GOLD
    x.fillText(`${Math.ceil(c)}s`, 0, 4)
    x.restore()
    label(x, t >= SEND ? 'SENT WITH' : 'TIME LEFT', 905, 162, { size: 22, col: BONE })
    // the promise
    const pk = pop01(t, 1.0, 0.3, 2.6) * outK(t, [3.4, 3.6])
    const drawP = (kk, X, Y, sz) => {
      if (kk <= 0.01) return
      x.save(); x.translate(X, Y); x.rotate(0.06); x.scale(kk, kk)
      x.font = `800 ${sz}px ${INTER}`; const w = x.measureText('WAIT FOR THE REPLY').width + 50, h = sz * 1.7
      R(x, 'rgba(6,4,18,0.6)', -w / 2 + 8, -h / 2 + 8, w, h); box(x, -w / 2, -h / 2, w, h, RED, { b: 6 })
      x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WAIT FOR THE REPLY', 0, 3); x.restore()
    }
    drawP(pk * (1 + 0.04 * Math.sin(t * 10)), 540, 1300, 60)
    drawP(clamp((t - 3.6) / 0.3) * outK(t, [REPLY - 0.2, REPLY]), 905, 205, 22)
  }

  return {
    start: 0, end: DURATION + 1, root,
    update(rt) {
      const t = freezeTime(rt, [REC])
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom + 0.03 * Math.sin(t * 0.4) })
      if (clock(t) <= 10 && t < SEND) { x.save(); x.globalAlpha = 0.1 + 0.06 * Math.sin(t * 14); x.fillStyle = RED; x.fillRect(0, 0, 1080, 1920); x.restore() }
      chatCard(x, t, { match: 'Robin', sub: 'new match · climbing pics', avatar: '#9fe6b0' })
      aries(t)
      draft(t)
      reply(t)
      judges(t)
      gags(t)
      hud(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), screenShake(SHAKE2), loadingBar(LOAD), recordScratch(REC), slamTitle(HOOK), ...CHAPS.map(c => chapter(c)), slamTitle(LAST)]

// ── sound
const typeTicks = (a, b, n) => Array.from({ length: n }, (_, k) => ['tick', r3(a + (b - a) * k / n), 0.035])
const draftCues = D.flatMap((d, i) => {
  const good = Number(d.score) >= 7
  return [
    ...(d.type[0] > 0 ? typeTicks(d.type[0], d.type[1], Math.min(18, Math.round(d.text.length / 3))) : []),
    ['tom', r3(d.rate - 0.6), 70, { gain: 0.1, decay: 0.5 }], ['riser', r3(d.rate - 0.6), d.rate, 0.02],
    ...(good ? [['bell', d.rate, 1760, 0.05, 1.2, -0.2], ['bell', r3(d.rate + 0.12), 2349.32, 0.04, 1.2, 0.2], ['crash', d.rate, { gain: 0.06 }], ['glitter', r3(d.rate + 0.1), r3(d.rate + 0.8)]]
      : [['chip', d.rate, 110, 0.32, { gain: 0.05, wave: 'square', slide: -30 }], ['tom', d.rate, 90, { gain: 0.2, decay: 0.2 }]]),
    ['pop', r3(d.rate + 0.15), 1174.66, 0.035, 0],
    ['pluck', r3(d.rate + 0.3), 659.25, 0.03, 0.4, 0.45], ['pluck', r3(d.rate + 0.45), 587.33, 0.026, 0.4, 0.45],
    ...(d.del ? [...typeTicks(d.del[0], d.del[1], 8), ['whoosh', d.del[1], 0.2, 0.03]] : []),
  ]
})
export const CUES = [
  ...slamTitleCues(HOOK), ['whoosh', 0, 0.4, 0.06], ...shakeCues(SHAKE), ...whipZoomCues(WHIP),
  ['tom', 1.0, 110, { gain: 0.2, decay: 0.2 }], ['pop', 1.05, 1318.51, 0.04, 0],
  ...shakeCues(SHAKE2), ['tom', 5.0, 80, { gain: 0.25, decay: 0.3 }],
  ...Array.from({ length: 10 }, (_, s) => ['chip', r3(4.6 + s * 0.06), 220 * 2 ** (s / 12), 0.05, { gain: 0.025 }]),
  ...loadingBarCues(LOAD), ...recordScratchCues(REC),
  ['pluck', 24.45, 880, 0.035, 0.5, 0.3], ['pluck', 24.6, 783.99, 0.035, 0.5, 0.3], ['pluck', 24.8, 659.25, 0.03, 0.6, 0.3],
  ...CHAPS.flatMap(c => chapterCues(c)),
  ...draftCues,
  // the last seconds: a ticking clock
  ...Array.from({ length: 8 }, (_, k) => ['tick', r3(44.0 + k * 1.0), 0.07]),
  ['tom', 47.6, 110, { gain: 0.18, decay: 0.2 }], ['pop', 47.65, 1567.98, 0.04, 0.3],
  ['whoosh', SEND, 0.3, 0.07], ['pop', r3(SEND + 0.03), 1567.98, 0.05, 0.4],
  ['tick', DOTS[0], 0.03], ['tick', r3(DOTS[0] + 0.3), 0.03], ['tick', r3(DOTS[0] + 0.6), 0.03],
  ['pop', REPLY, 1318.51, 0.05, -0.2], ['pop', r3(REPLY + 0.07), 1760, 0.04, -0.2], ['crash', REPLY, { gain: 0.06 }], ['glitter', REPLY, r3(REPLY + 1.0)],
  ...Array.from({ length: 6 }, (_, k) => ['clap', r3(REPLY + 0.3 + k * 0.24), { gain: 0.11, pan: k % 2 ? 0.3 : -0.3 }]),
  ['pluck', BAWL, 659.25, 0.035, 0.5, 0.4], ['pluck', r3(BAWL + 0.16), 587.33, 0.035, 0.5, 0.4], ['pluck', r3(BAWL + 0.34), 554.37, 0.03, 0.6, 0.4],
  ...slamTitleCues(LAST),
].filter(c => c[1] >= 0 && c[1] < DURATION)
void [pen, lerp, MONO]
