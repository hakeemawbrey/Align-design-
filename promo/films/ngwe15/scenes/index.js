// ngwe15 · Your Star Guide: Winter · ♊ Gemini · note 2 / 4 (your holiday blind spot) · 25 s (story 0–20.6, then the end card)
//   0.00–2.85  "*Gemini,* it's | party *season.*"  The ♊ guide, big, lantern lit, snow falling.
//   2.9–7.1    Three party doors in the snow, each with a wreath. Gemini zips in and out of all three in a blur (zip!
//              zip!). YOUR STAR: "three parties in one night. you're a blur."
//   7.15–10.8  On the right, the lavender star holds Gemini's coat under a clock that spins from 8:00 to 11:00, tapping a
//              foot, then yawning. YOUR STAR: "they've held your coat since eight."
//   10.85–14.5 YOUR STAR: "pick one. stay till the last song."  Gemini screeches to a stop, sees them, takes the coat, and
//              the two of them dance (music notes).
//   14.55      card flip · "Stay where | *they* are."  Still dancing. Pisces sobs in the snow.
import { guideFilm } from '../../ngwe01/gwkit.js'

const DOORS = [{ x: 175, c: '#c42a3f' }, { x: 355, c: '#2a7a4b' }, { x: 535, c: '#3a6fd8' }]
const COAT = ['..CCCC..', '.CCccCC.', 'CCCccCCC', 'CC.cc.CC', 'CC.cc.CC', 'CC.cc.CC', '.C.cc.C.', '...cc...']
const F = guideFilm({
  id: 'ngwe15', sign: 'gemini', note: 2, len: 25,
  hook: '*Gemini,* it’s | party *season.*',
  lines: ["three parties in one night. you're *a blur*.", "they've held your coat *since eight*.", 'pick one. stay till *the last song*.'],
  chip: 'GEMINI: SYMBOL, THE TWINS.|RULER OF THE 3RD HOUSE (TALK)',
  last: 'Stay where | *they* are.', late: 1,
  gag: (T, K) => {
    const B = { zip: [3.3, 11.1], yawn: [9.2, 10.4], stop: 11.25, coat: [11.8, 12.2], dance: 12.5 }
    const CLX = 800, CLY = 990, TX = 800
    const zipX = t => { const p = (t - B.zip[0]) * 1.6; const i = Math.floor(p) % 4, f = p % 1; const seq = [0, 2, 1, 2]; const a = DOORS[seq[i]].x, b = DOORS[seq[(i + 1) % 4]].x; return K.lerp(a, b, K.ease.inOutCubic(Math.min(1, f * 1.6))) }
    const gemX = t => t < B.zip[0] ? DOORS[0].x : t < B.zip[1] ? zipX(t) : K.lerp(zipX(B.zip[1]), TX - 210, K.ease.outCubic(K.prog(t, B.zip[1], B.stop)))
    const hours = t => K.clamp(K.prog(t, B.zip[0], B.stop)) * 3
    return {
      draw(x, t) {
        const a = K.appear(t, T.scene + 0.05)
        if (a <= 0.01) return
        // the doors
        x.save(); x.globalAlpha *= Math.min(1, a)
        DOORS.forEach((d, i) => {
          const open = t > B.zip[0] && t < B.zip[1] && Math.abs(gemX(t) - d.x) < 50 ? 1 : 0
          x.fillStyle = K.INK; x.fillRect(d.x - 64, K.GROUND - 230, 128, 230); x.fillStyle = '#ffd68c'; x.fillRect(d.x - 58, K.GROUND - 224, 116, 224)
          if (!open) { x.fillStyle = d.c; x.fillRect(d.x - 58, K.GROUND - 224, 116, 224); x.fillStyle = K.GOLD; x.fillRect(d.x + 34, K.GROUND - 120, 10, 10) }
          // wreath
          x.fillStyle = K.INK; x.beginPath(); x.arc(d.x, K.GROUND - 172, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = '#3fae6a'; x.beginPath(); x.arc(d.x, K.GROUND - 172, 25, 0, Math.PI * 2); x.fill(); x.fillStyle = open ? '#ffd68c' : d.c; x.beginPath(); x.arc(d.x, K.GROUND - 172, 12, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e2453c'; x.fillRect(d.x - 6, K.GROUND - 150, 12, 10)
          if (open) { x.fillStyle = 'rgba(255,214,140,0.25)'; x.fillRect(d.x - 90, K.GROUND - 10, 180, 14) }
        })
        x.restore()
        // the clock
        const cp = K.pop01(t, T.scene + 0.3, 0.35, 2.2) * K.popOut(t, T.out), h = hours(t)
        if (cp > 0.01) {
          x.save(); x.translate(CLX, CLY); x.scale(cp, cp)
          x.fillStyle = K.INK; x.beginPath(); x.arc(0, 0, 62, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f5eedf'; x.beginPath(); x.arc(0, 0, 55, 0, Math.PI * 2); x.fill()
          for (let k = 0; k < 12; k++) { const an = k * Math.PI / 6; x.fillStyle = K.INK; x.fillRect(Math.cos(an) * 44 - 3, Math.sin(an) * 44 - 3, 6, 6) }
          const hr = (8 + h) / 12 * Math.PI * 2 - Math.PI / 2, mn = h * Math.PI * 2 - Math.PI / 2
          x.strokeStyle = K.INK; x.lineCap = 'round'; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(hr) * 26, Math.sin(hr) * 26); x.stroke()
          x.strokeStyle = '#c42a3f'; x.lineWidth = 5; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(mn) * 42, Math.sin(mn) * 42); x.stroke()
          x.restore()
          K.label(x, `${8 + Math.floor(h)}:00 PM`, CLX, CLY + 92, 32, K.GOLD, cp)
        }
        // the lavender star with the coat
        const dancing = t > B.dance, yawn = t > B.yawn[0] && t < B.yawn[1], waiting = t > B.zip[0] + 1 && t < B.stop
        const danceHops = []; for (let d = B.dance; d < T.out[0]; d += 0.6) danceHops.push(+d.toFixed(2))
        const tap = waiting && !yawn ? 0.05 * Math.max(0, Math.sin(t * 9)) : 0
        K.mini(x, t, { x: TX + (dancing ? Math.sin((t - B.dance) * 3.4) * 26 : 0), size: 150, color: K.THEM, mood: dancing ? 'happy' : t > B.stop ? 'sparkle' : yawn ? 'sleepy' : waiting ? 'squint' : 'neutral', zzz: false, look: [-1, 0], seed: 9, pop: K.appear(t, T.scene + 0.3), squash: tap, hops: dancing ? danceHops.map(v => v + 0.3) : [] })
        const gx = gemX(t) + (dancing ? Math.sin((t - B.dance) * 3.4 + Math.PI) * 26 : 0)
        const blur = t > B.zip[0] && t < B.zip[1]
        if (blur) for (let k = 1; k <= 4; k++) K.mini(x, t, { x: gemX(t - k * 0.03), size: 160, color: K.ME.color, alpha: 0.18 / k, mood: 'squint', seed: 4, pop: a })
        K.mini(x, t, { x: gx, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: dancing ? 'heart' : t > B.stop ? 'wide' : blur ? 'happy' : 'neutral', look: blur ? [0, 0] : [1, 0], seed: 4, pop: a, squash: t > B.stop && t < B.stop + 0.3 ? 0.18 : 0, hops: dancing ? danceHops : [B.stop + 0.3] })
        // the coat: on their arm → onto Gemini
        const cpos = K.ease.inOutCubic(K.prog(t, ...B.coat))
        const cx = K.lerp(TX - 70, gx + 70, cpos), cy = K.ACT_Y + 10 - Math.sin(Math.PI * cpos) * 60
        K.drawBits(x, COAT, { C: '#ff9a4a', c: '#c96f2f' }, cx, cy, 7 * Math.min(a, K.popOut(t, T.out)))
        if (yawn) K.label(x, 'yawn', TX - 120, K.ACT_Y - 110, 34, K.BONE, K.prog(t, B.yawn[0], B.yawn[0] + 0.2) * (1 - K.prog(t, B.yawn[1] - 0.2, B.yawn[1])))
        if (blur) { const ph = (t * 1.6) % 1; K.label(x, 'zip!', gemX(t), K.ACT_Y - 150, 36, K.ME.color, ph < 0.5 ? 1 : 0, -0.1) }
        K.burst(x, gx, K.ACT_Y - 160, 80, t, B.stop, { word: 'SKRT', size: 30, color: '#9fe6b0', life: 0.6 })
        if (dancing) for (let k = 0; k < 3; k++) { const ph = ((t - B.dance) * 0.6 + k / 3) % 1; K.label(x, '♪', (gx + TX) / 2 + (k - 1) * 70, K.ACT_Y - 120 - ph * 140, 44, k % 2 ? K.GOLD : K.ME.color, Math.sin(Math.PI * ph) * K.popOut(t, T.out)) }
      },
      cues: [
        ...Array.from({ length: 12 }, (_, i) => ['whoosh', +(B.zip[0] + i * 0.625).toFixed(2), 0.2, 0.025]),
        ['tick', 7.4, 0.03], ['tick', 7.6, 0.03], ['tick', 7.8, 0.03], ['tick', 8.0, 0.03], ['pluck', B.yawn[0], 293.66, 0.03, 0.8, 0.4],
        ['tick', B.stop, 0.06], ['pop', B.stop, 1567.98, 0.04, 0], ['whoosh', B.coat[0], 0.3, 0.025], ['pop', B.coat[1], 1174.66, 0.035, 0], ['glitter', B.dance, B.dance + 0.5],
      ],
    }
  },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
