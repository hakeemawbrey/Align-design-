// kxsge08 · Your Star Guide: Extended · ♏ The Scorpio Guide: Left on Read · loop
//   HOOK   Scorpio mid-zoom into a phone with a magnifying glass on "Read 9:41"; an investigation board, string flying.
//   ch1    HOW YOU LOVE: Scorpio knits a scarf in their favourite colour, from memory; it wraps them.
//   ch2    WHAT YOU NEED: two divers go down together, calm, bubbles rising.
//   ch3    WHERE IT GETS HARD: the board fills with clues; the reply drops: "sorry!! was asleep". The board collapses.
//   ch4    TRY THIS WEEK: Scorpio types "I missed you today." and sends it. Hearts.
//   Last line: "Ask. Don't decode."  Loops back into the investigation.
import { guideXFilm, HK } from '../../kxsge01/sgxkit.js'

const WHIP = { at: 0.45, from: 1.5, cx: 540, cy: 1000 }
function board(K, x, t, cx, cy, s, a, n = 6, fall = 0) {
  if (a <= 0.01 || s <= 0.01) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy + fall * fall * 300); x.rotate(fall * 0.4); x.scale(s, s)
  x.fillStyle = K.INK; x.fillRect(-250, -150, 500, 300); x.fillStyle = '#b07a46'; x.fillRect(-242, -142, 484, 284)
  const pins = [[-170, -80, 'Read 9:41'], [120, -90, '“ok.”'], [-60, 30, 'no emoji?!'], [170, 60, 'online 2m ago'], [-180, 90, '3 dots, gone'], [40, -20, 'period. why.']]
  x.strokeStyle = '#e2453c'; x.lineWidth = 4; x.beginPath()
  pins.slice(0, n).forEach(([px, py], i) => { if (i === 0) x.moveTo(px, py); else x.lineTo(px, py) }); x.stroke()
  pins.slice(0, n).forEach(([px, py, w]) => {
    x.font = '700 22px Space Mono, monospace'; const tw = x.measureText(w).width + 20
    x.fillStyle = '#f5eedf'; x.fillRect(px - tw / 2, py - 20, tw, 40); x.fillStyle = K.INK; x.textAlign = 'center'; x.fillText(w, px, py + 7)
    x.fillStyle = '#e2453c'; x.fillRect(px - 5, py - 26, 10, 10)
  })
  x.restore()
}
const F = guideXFilm({
  id: 'kxsge08', sign: 'scorpio',
  hook: 'SCORPIO. LEFT ON READ. | *INVESTIGATING.*',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'SCORPIO: FIXED WATER,|RULED BY MARS AND PLUTO', chipCh: 0,
  last: '*Ask.* | Don’t decode.', late: 2, ending: 'loop',
  hookScene: K => ({
    fx: [{ scene: HK.whipZoom(WHIP), cues: HK.whipZoomCues(WHIP) }],
    draw(x, t) {
      board(K, x, t, 540, 820, 1.05, 1, 6)
      K.phone(x, 760, 1180, 0.8, { header: 'THEM', rows: [{ text: 'can’t wait!!', me: true }, { text: 'Read 9:41', center: true, color: 'rgba(0,0,0,0)', ink: '#9aa3b8', size: 20 }], rot: 0.08 })
      K.mini(x, t, { x: 380, y: 1260, size: 260, color: K.ME.color, glyph: K.ME.glyph, mood: 'squint', look: [1, -0.3], seed: 4, bob: 0, squash: 0.04 * Math.sin(t * 6) })
      // magnifying glass over the "Read"
      const mx = 760 + Math.sin(t * 3) * 20, my = 1225 + Math.cos(t * 3) * 10
      x.save(); x.strokeStyle = K.INK; x.lineWidth = 22; x.beginPath(); x.arc(mx, my, 80, 0, Math.PI * 2); x.stroke(); x.strokeStyle = '#9aa3b8'; x.lineWidth = 12; x.stroke()
      x.fillStyle = 'rgba(191,227,255,0.18)'; x.fill(); x.strokeStyle = '#7a4a2a'; x.lineWidth = 22; x.beginPath(); x.moveTo(mx - 58, my + 58); x.lineTo(mx - 140, my + 140); x.stroke(); x.restore()
      K.label(x, 'Read 9:41', mx, my, 34, '#ffd34d')
    },
    cues: [['tick', 0.05, 0.05], ['pop', 0.2, 466.16, 0.03, 0], ['pop', 0.9, 523.25, 0.03, 0.2]],
  }),
  chapters: [
    { lines: ['you love *deep*. you remember everything.', 'their favorite color? you *knit* it. from memory.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, knit: C + 1.4, done: C + 8.6, give: C + 9.4, wrap: C + 10.2, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            K.mini(x, t, { x: 320, y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.wrap ? 'heart' : 'neutral', look: t < B.done ? [0, 1] : [1, 0], seed: 4, pop: a, hops: [B.done, B.wrap] })
            K.mini(x, t, { x: 770, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.wrap ? 'heart' : t > B.give ? 'wide' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.wrap + 0.1] })
            const len = Math.min(10, Math.floor(K.prog(t, B.knit, B.done) * 10))
            const p = K.prog(t, B.give, B.wrap)
            const sx = K.lerp(330, 770, K.ease.inOutCubic(p)), sy = K.lerp(K.ACT_Y + 50, K.ACT_Y + 20, p) - Math.sin(Math.PI * p) * 120
            for (let i = 0; i < len; i++) { x.fillStyle = K.INK; x.fillRect(sx - 60 + i * 12 - 2, sy - 2, 14, 30); x.fillStyle = i % 2 ? '#3ce6cf' : '#23a796'; x.fillRect(sx - 60 + i * 12, sy, 10, 26) }
            if (t > B.knit && t < B.done) { x.strokeStyle = '#c9a6ff'; x.lineWidth = 5; x.beginPath(); x.moveTo(250 + Math.sin(t * 12) * 10, K.ACT_Y + 20); x.lineTo(410 - Math.sin(t * 12) * 10, K.ACT_Y + 40); x.stroke() }
            if (t > B.knit + 1) K.label(x, 'teal. they said it once.', 540, 960, 34, '#3ce6cf', K.pop01(t, B.knit + 1, 0.3, 3) * a * (1 - K.prog(t, B.give, B.give + 0.3)))
            if (t > B.wrap) K.label(x, 'you REMEMBERED?!', 770, 980, 40, '#ffd34d', K.pop01(t, B.wrap, 0.3, 3) * a)
          },
          cues: [...Array.from({ length: 10 }, (_, i) => ['tick', +(B.knit + 0.7 * i).toFixed(2), 0.02]), ['whoosh', B.give, 0.4, 0.03], ['glitter', B.wrap, B.wrap + 0.5], ['pop', B.wrap, 1318.51, 0.04, 0.3]],
        }
      } },
    { lines: ['you need someone who goes *deep*…', '…and doesn’t *flinch* at what’s down there.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, dive: C + 1.8, deep: C + 6.4, fish: C + 8.6, hold: C + 10.6, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const d = K.ease.inOutCubic(K.prog(t, B.dive, B.deep))
            x.save(); x.globalAlpha *= a * (0.25 + 0.5 * d); x.fillStyle = '#0d3a5c'; x.fillRect(80, 880, 920, K.GROUND - 880); x.restore()
            x.save(); x.globalAlpha *= a; x.fillStyle = 'rgba(127,224,255,0.7)'; x.fillRect(80, 880, 920, 6); x.restore()
            for (const [px, sd, col, gl] of [[440, 4, K.ME.color, K.ME.glyph], [640, 9, K.THEM, null]]) {
              const y = K.lerp(860, K.ACT_Y - 10, d) + Math.sin(t * 1.5 + sd) * 8
              K.mini(x, t, { x: px, y, size: 140, color: col, glyph: gl, mood: t > B.hold ? 'heart' : 'happy', look: [px < 540 ? 1 : -1, 0.3], seed: sd, pop: a })
              for (let i = 0; i < 4; i++) { const ph = (t * 0.8 + i / 4 + sd * 0.1) % 1; x.save(); x.globalAlpha *= a * (1 - ph) * d; x.strokeStyle = '#bfe3ff'; x.lineWidth = 3; x.beginPath(); x.arc(px + Math.sin(ph * 9) * 10, y - 90 - ph * 220, 7, 0, Math.PI * 2); x.stroke(); x.restore() }
            }
            if (t > B.fish) { const fx = K.lerp(1050, 30, K.prog(t, B.fish, B.fish + 4)); K.drawBits(x, ['.OO..', 'OOOOO', 'OKOO.', 'OOOOO', '.OO..'], K.COL, fx, 1030, 7 * a, { flipX: true }); K.label(x, 'a whole feeling', fx, 970, 26, '#ffb38a', 0.85 * a) }
            if (t > B.hold) K.heart(x, 540, K.ACT_Y - 160 - (t - B.hold) * 15, 8 * K.pop01(t, B.hold, 0.35, 3), a)
            K.label(x, 'DEPTH: OK', 900, 920, 26, '#9fe6b0', K.pop01(t, B.deep, 0.3, 3) * a)
          },
          cues: [['whoosh', B.dive, 1.2, 0.04], ['pluck', B.deep, 587.33, 0.03, 0.8, 0], ['pop', B.fish, 659.25, 0.03, 0.4], ['glitter', B.hold, B.hold + 0.5], ['pop', B.hold, 1174.66, 0.04, 0]],
        }
      } },
    { lines: ['you *decode* when you could just ask.', 'a period isn’t a *verdict*. it’s a period.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, board: C + 0.9, reply: C + 8.2, fall: C + 9.4, sheep: C + 11.0, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const n = Math.min(6, Math.floor(K.prog(t, B.board, B.board + 5) * 6) + 1)
            board(K, x, t, 540, 960, 0.78 * K.pop01(t, B.board, 0.35, 2.4), a * (1 - K.prog(t, B.fall + 0.5, B.fall + 0.9)), n, K.prog(t, B.fall, B.fall + 0.9))
            K.mini(x, t, { x: 280, y: K.ACT_Y, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.reply ? 'wide' : 'squint', look: [1, -0.5], seed: 4, pop: a, hops: [B.reply, B.sheep] })
            K.phone(x, 790, K.ACT_Y - 60, 0.5 * K.pop01(t, B.board, 0.35, 2.4) * a, { header: 'THEM', rows: t > B.reply ? [{ text: 'k.' }, { text: 'sorry!! was asleep' }, { text: 'zzz :)' }] : [{ text: 'k.' }] })
            K.stamp(x, t, B.reply, 'CASE CLOSED', 540, 1060, { size: 44, color: '#9fe6b0', life: 3.2 })
            if (t > B.sheep) K.label(x, 'they were just asleep.', 540, 880, 38, '#ffd34d', K.pop01(t, B.sheep, 0.3, 3) * a)
          },
          cues: [...Array.from({ length: 6 }, (_, i) => ['tick', +(B.board + i * 0.83).toFixed(2), 0.04]), ['pop', B.reply, 1318.51, 0.04, 0.3], ['boom', B.fall, 0.1], ['whoosh', B.fall, 0.5, 0.04], ['pluck', B.sheep, 880, 0.03, 0.5, 0]],
        }
      } },
    { lines: ['this week: say one *soft* true thing first.', '“I missed you today.” that’s the *whole* move.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, type: C + 1.8, send: C + 5.4, wait: C + 6.0, reply: C + 8.2, glow: C + 9.0 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in); if (a <= 0.01) return
            K.mini(x, t, { x: 300, y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.reply ? 'heart' : t > B.send ? 'wide' : 'neutral', look: [1, 0], seed: 4, pop: a, hops: [B.send, B.reply], blush: t > B.type ? 0.85 : 0, tears: t > B.glow ? 1 : 0 })
            K.mini(x, t, { x: 780, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.reply ? 'heart' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.reply - 0.2] })
            const msg = 'I missed you today.'
            const typed = msg.slice(0, Math.floor(Math.max(0, t - B.type) * 7.5))
            K.phone(x, 540, 960, 0.6 * K.pop01(t, B.type - 0.4, 0.35, 2.4) * a, { header: 'THEM', rows: t > B.send ? [{ text: msg, me: true }, ...(t > B.reply ? [{ text: 'me too. a lot.' }, { text: '♥', color: '#ff5c8e' }] : [])] : [{ text: typed + (t % 0.6 < 0.3 ? '|' : ''), me: true, color: '#3a3168' }] })
            if (t > B.wait && t < B.reply) K.label(x, '…', 780, K.ACT_Y - 150, 60, BONE(K), a)
            if (t > B.glow) { K.heart(x, 540, K.ACT_Y - 170 - (t - B.glow) * 16, 9 * K.pop01(t, B.glow, 0.35, 3)); K.sparkles(x, t, 540, K.ACT_Y - 60, B.glow, 14, 220, 4) }
          },
          cues: [...Array.from({ length: 10 }, (_, i) => ['tick', +(B.type + i * 0.27).toFixed(2), 0.015]), ['whoosh', B.send, 0.3, 0.04], ['pop', B.send, 1174.66, 0.04, 0], ['pop', B.reply, 1318.51, 0.045, 0.3], ['glitter', B.glow, B.glow + 0.6]],
        }
      } },
  ],
})
function BONE(K) { return K.BONE }
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
