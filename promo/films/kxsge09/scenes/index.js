// kxsge09 · Your Star Guide: Extended · ♐ The Sagittarius Guide: Bag Already Packed · hard cut
//   HOOK   Sagittarius mid-leap out a door, backpack bursting (socks flying), a "what are we?" bubble chasing them; shake.
//   ch1    HOW YOU LOVE: Sag grabs the other star for a spontaneous dumpling run; a map with a dotted line.
//   ch2    WHAT YOU NEED: a porch light on at the end of a long road; Sag comes home to it.
//   ch3    WHERE IT GETS HARD: a "WHAT ARE WE?" sign spins; Sag edges toward an EXIT sign, step by step.
//   ch4    TRY THIS WEEK: Sag unpacks the bag on the couch and answers: "I like us. Let's call it something."
//   Last line: "Staying is the trip."
import { guideXFilm, HK } from '../../kxsge01/sgxkit.js'

const SHAKE = { at: 0.35, len: 0.5, amp: 24 }
function door(K, x, cx, cy, s, a, open = 1) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = K.INK; x.fillRect(-90, -200, 180, 210); x.fillStyle = '#ffe9a8'; x.fillRect(-80, -190, 160, 200)
  x.fillStyle = '#8a5a33'; x.fillRect(-80, -190, 160 * (1 - 0.8 * open), 200); x.restore()
}
const F = guideXFilm({
  id: 'kxsge09', sign: 'sagittarius',
  hook: 'SAGITTARIUS. THEY ASKED | *“WHAT ARE WE?”*',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'SAGITTARIUS: MUTABLE FIRE,|RULED BY JUPITER', chipCh: 0,
  last: 'Staying is | the *trip.*', late: 1, ending: 'cut',
  hookScene: K => ({
    fx: [{ scene: HK.screenShake(SHAKE), cues: HK.shakeCues(SHAKE) }],
    draw(x, t) {
      door(K, x, 860, 1280, 1.4, 1, 1)
      const sx = K.lerp(560, 760, K.prog(t, 0, 3.4)), sy = 1080 - Math.sin(Math.min(1, t / 3.4) * Math.PI) * 60
      x.fillStyle = 'rgba(255,214,140,0.7)'; for (let i = 0; i < 6; i++) x.fillRect(sx - 230 - i * 20, sy - 60 + i * 26, 110, 7)
      K.mini(x, t, { x: sx, y: sy, size: 260, color: K.ME.color, glyph: K.ME.glyph, mood: 'squint', look: [1, 0], squash: -0.1, seed: 4, bob: 0 })
      K.drawBits(x, K.BM.BAG, K.COL, sx - 120, sy + 10, 13, { rot: -0.3 })
      for (let i = 0; i < 4; i++) { const ph = (t * 0.9 + i / 4) % 1; K.drawBits(x, ['WWW.', 'WWW.', '.WWW', '..WW'], { W: ['#ff8fb1', '#7fe0ff', '#9fe6b0', '#ffd34d'][i] }, sx - 160 - ph * 260, sy - 80 - Math.sin(ph * Math.PI) * 200 + ph * 120, 8, { rot: ph * 5 }) }
      K.bubble(x, 'so… what are we?', K.lerp(330, 400, K.prog(t, 0, 3.4)), 820, { size: 34, color: '#6f5bd6', s: 1 + 0.05 * Math.sin(t * 10) })
    },
    cues: [['whoosh', 0.05, 0.6, 0.05], ['pop', 0.2, 880, 0.03, -0.3], ['pop', 0.6, 987.77, 0.03, -0.3]],
  }),
  chapters: [
    { lines: ['you love like an *adventure*. let’s go. now.', 'a 10 pm dumpling run counts as a *date*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, map: C + 1.4, grab: C + 3.4, run: C + 4.2, cart: C + 7.8, eat: C + 9.6, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const mp = K.pop01(t, B.map, 0.35, 2.4) * a * (1 - K.prog(t, B.run, B.run + 0.4))
            if (mp > 0.01) {
              x.save(); x.translate(540, 980); x.scale(mp, mp); x.fillStyle = K.INK; x.fillRect(-210, -100, 420, 200); x.fillStyle = '#f5e2b8'; x.fillRect(-202, -92, 404, 184)
              x.strokeStyle = '#e2453c'; x.lineWidth = 6; x.setLineDash([14, 10]); x.beginPath(); x.moveTo(-160, 50); x.quadraticCurveTo(-20, -90, 150, 20); x.stroke(); x.setLineDash([])
              x.font = '800 40px Inter'; x.fillStyle = '#e2453c'; x.fillText('X', 140, 30); x.font = '700 22px Space Mono, monospace'; x.fillStyle = K.INK; x.fillText('dumplings', 40, 80); x.restore()
            }
            const rp = K.ease.inOutCubic(K.prog(t, B.run, B.cart))
            const sx = K.lerp(300, 620, rp), tx = t < B.grab ? 780 : K.lerp(420, 740, rp) - (t < B.run ? 0 : 140)
            // the dumpling cart
            if (t > B.run) { const cp = K.pop01(t, B.run + 1, 0.4, 2.4) * a; x.save(); x.translate(900, K.GROUND - 70); x.scale(cp, cp); x.fillStyle = K.INK; x.fillRect(-100, -80, 200, 130); x.fillStyle = '#e2453c'; x.fillRect(-94, -74, 188, 30); x.fillStyle = '#f5eedf'; x.fillRect(-94, -44, 188, 88); x.restore(); K.label(x, 'DUMPLINGS', 900, K.GROUND - 210, 30, '#ffd34d', cp) }
            K.mini(x, t, { x: t < B.run ? 300 : sx, y: K.ACT_Y, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.eat ? 'heart' : 'sparkle', look: [1, 0], seed: 4, pop: a, hops: [B.grab, B.run + 0.5, B.run + 1.4, B.run + 2.3, B.eat] })
            K.mini(x, t, { x: t < B.grab ? 780 : t < B.run ? K.lerp(780, 450, K.prog(t, B.grab, B.run)) : tx, y: K.ACT_Y, size: 140, color: K.THEM, mood: t > B.eat ? 'heart' : t > B.grab ? 'wide' : 'neutral', look: [t < B.grab ? -1 : 1, 0], seed: 9, pop: a, hops: [B.run + 0.9, B.run + 1.8, B.eat + 0.2] })
            if (t > B.grab && t < B.run + 2) K.label(x, 'NOW?!', 450, K.ACT_Y - 150, 40, '#ffd34d', K.pop01(t, B.grab, 0.3, 3) * a)
            if (t > B.eat) { K.drawBits(x, ['.WWW.', 'WWWWW', 'WCCCW'], K.COL, 560, K.ACT_Y - 120, 7 * a); K.drawBits(x, ['.WWW.', 'WWWWW', 'WCCCW'], K.COL, 660, K.ACT_Y - 120, 7 * a); K.sparkles(x, t, 610, K.ACT_Y - 80, B.eat, 10, 160, 4) }
          },
          cues: [['pop', B.map, 739.99, 0.035, 0], ['pop', B.grab, 1174.66, 0.04, 0], ['whoosh', B.run, 0.8, 0.045], ...[0.5, 1.4, 2.3].map(d => ['tick', +(B.run + d).toFixed(2), 0.03]), ['pop', B.run + 1, 659.25, 0.03, 0.4], ['glitter', B.eat, B.eat + 0.5], ['pop', B.eat, 1318.51, 0.04, 0.2]],
        }
      } },
    { lines: ['you need someone who lets you *roam*…', '…and leaves the *porch light* on.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, go: C + 1.6, far: C + 4.8, night: C + 6.8, back: C + 8.4, home: C + 11.0, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            // a road going into the distance
            x.save(); x.globalAlpha *= a; x.fillStyle = '#3a3168'; x.beginPath(); x.moveTo(200, K.GROUND); x.lineTo(500, 880); x.lineTo(580, 880); x.lineTo(880, K.GROUND); x.closePath(); x.fill()
            x.fillStyle = 'rgba(255,233,168,0.6)'; for (let i = 0; i < 6; i++) { const y = 900 + i * 62; x.fillRect(536 - i * 1.5, y, 8 + i * 1.5, 26 + i * 4) } x.restore()
            // porch + light at the front
            const lit = t > B.night
            K.drawBits(x, K.BM.LAMP, { ...K.COL, Q: lit ? '#fff6c8' : '#6c7489' }, 860, K.GROUND - 70, 9 * a)
            if (lit) { const g = x.createRadialGradient(860, K.GROUND - 120, 10, 860, K.GROUND - 120, 240); g.addColorStop(0, `rgba(255,220,120,${0.45 * a})`); g.addColorStop(1, 'rgba(255,200,100,0)'); x.fillStyle = g; x.fillRect(600, K.GROUND - 360, 520, 480) }
            K.mini(x, t, { x: 760, y: K.ACT_Y, size: 140, color: K.THEM, mood: t > B.home ? 'heart' : 'happy', look: [-1, -0.4], seed: 9, pop: a, hops: [B.night, B.home] })
            // Sag walks off up the road (shrinking), then comes back
            const out = K.ease.inOutCubic(K.prog(t, B.go, B.far)), back = K.ease.inOutCubic(K.prog(t, B.back, B.home))
            const u = out * (1 - back)
            const sx = K.lerp(t > B.back ? 640 : 380, 540, u), sy = K.lerp(K.ACT_Y, 900, u), ss = K.lerp(150, 40, u)
            K.mini(x, t, { x: sx, y: sy, size: ss, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.home ? 'heart' : 'happy', look: [0, -1], seed: 4, pop: a })
            if (t > B.far && t < B.back) K.label(x, 'adventuring…', 540, 820, 30, '#ffd34d', a)
            if (t > B.home) K.heart(x, 700, K.ACT_Y - 170 - (t - B.home) * 15, 8 * K.pop01(t, B.home, 0.35, 3), a)
          },
          cues: [['whoosh', B.go, 1.2, 0.03], ['pop', B.night, 1174.66, 0.04, 0.4], ['glitter', B.night, B.night + 0.4], ['whoosh', B.back, 1.2, 0.03], ['glitter', B.home, B.home + 0.5], ['pop', B.home, 1318.51, 0.04, 0.3]],
        }
      } },
    { lines: ['you run when it gets *real*. we see it.', 'that itch to leave? it’s *fear*. not fate.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, sign: C + 1.4, s1: C + 3.2, s2: C + 5.0, s3: C + 7.0, stop: C + 9.2, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const sp = K.pop01(t, B.sign, 0.35, 2.4) * a
            K.banner(x, 'WHAT ARE WE?', 540, 940, { size: 46, s: sp, color: '#2a1d55', rot: Math.sin(t * 6) * 0.08 * (t < B.stop ? 1 : 0.2) })
            K.banner(x, 'EXIT →', 960, K.GROUND - 200, { size: 30, s: sp, color: '#3fae6a', ink: '#fff' })
            const steps = [B.s1, B.s2, B.s3].filter(s => t > s).length
            const back = K.ease.inOutCubic(K.prog(t, B.stop + 0.6, B.stop + 1.6))
            const sx = K.lerp(380 + steps * 140, 400, back)
            K.mini(x, t, { x: sx, y: K.ACT_Y, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.stop ? 'neutral' : 'squint', look: [t < B.stop ? 1 : -1, 0], seed: 4, pop: a, hops: [B.s1, B.s2, B.s3, B.stop] })
            K.mini(x, t, { x: 220, y: K.ACT_Y, size: 140, color: K.THEM, mood: 'neutral', look: [1, 0], seed: 9, pop: a, tears: t > B.s3 && t < B.stop + 2 ? 1 : 0 })
            ;[B.s1, B.s2, B.s3].forEach((s, i) => { if (t > s && t < s + 1) K.label(x, ['*yawn*', '“oh look, a bird”', '“brb forever”'][i], 380 + (i + 1) * 140, K.ACT_Y - 150, 30, '#ffd34d', 1 - K.prog(t, s + 0.7, s + 1)) })
            if (t > B.stop) K.label(x, 'wait. I’m scared. that’s all.', 540, 1050, 34, '#ff8fb1', K.pop01(t, B.stop, 0.3, 3) * a)
          },
          cues: [['pop', B.sign, 587.33, 0.035, 0], ['tick', B.s1, 0.04], ['tick', B.s2, 0.04], ['tick', B.s3, 0.04], ['boom', B.stop, 0.08], ['whoosh', B.stop + 0.6, 0.6, 0.03], ['pluck', B.stop, 659.25, 0.03, 0.6, 0]],
        }
      } },
    { lines: ['this week: *answer* the question.', 'honestly. kindly. even “I don’t know yet” is *brave*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, couch: C + 1.0, unpack: C + 2.4, say: C + 6.6, reply: C + 8.6, snug: C + 10.0 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in); if (a <= 0.01) return
            const cp = K.pop01(t, B.couch, 0.4, 2.4) * a
            x.save(); x.translate(540, K.GROUND - 40); x.scale(cp, cp); x.fillStyle = K.INK; x.fillRect(-250, -100, 500, 130); x.fillStyle = '#8c6bd6'; x.fillRect(-242, -92, 484, 50); x.fillStyle = '#a98af0'; x.fillRect(-242, -42, 484, 64); x.restore()
            const snug = K.ease.inOutCubic(K.prog(t, B.snug, B.snug + 0.6))
            K.mini(x, t, { x: K.lerp(400, 470, snug), y: K.ACT_Y - 50, size: 145, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.snug ? 'heart' : t > B.say ? 'happy' : 'neutral', look: [1, 0], squash: 0.12, seed: 4, pop: a, hops: [B.unpack, B.unpack + 1.2, B.say] })
            K.mini(x, t, { x: K.lerp(690, 620, snug), y: K.ACT_Y - 50, size: 140, color: K.THEM, mood: t > B.reply ? 'heart' : 'neutral', look: [-1, 0], squash: 0.12, seed: 9, pop: a, hops: [B.reply], tears: t > B.reply ? 1 : 0 })
            // the bag unpacks onto the floor
            K.drawBits(x, K.BM.BAG, K.COL, 240, K.GROUND - 40, 9 * a)
            for (let i = 0; i < 4; i++) { const it = B.unpack + i * 0.7; if (t > it) { const p = K.prog(t, it, it + 0.5); K.drawBits(x, ['WWW.', 'WWW.', '.WWW', '..WW'], { W: ['#ff8fb1', '#7fe0ff', '#9fe6b0', '#ffd34d'][i] }, K.lerp(240, 120 + i * 60, p), K.GROUND - 40 - Math.sin(Math.PI * p) * 120 + 30 * p, 6 * a) } }
            if (t > B.say && t < B.snug + 1.6) K.bubble(x, 'I like us. let’s name it.', 420, K.ACT_Y - 230, { size: 26, color: K.ME.color, ink: K.INK, s: K.pop01(t, B.say, 0.3, 2.6) * a })
            if (t > B.reply) K.bubble(x, 'yes. us.', 700, K.ACT_Y - 220 + (t > B.snug + 1.6 ? 0 : 60), { size: 28, color: '#6f5bd6', s: K.pop01(t, B.reply, 0.3, 2.6) * a, tail: -1 })
            if (t > B.snug) { K.heart(x, 545, K.ACT_Y - 220 - (t - B.snug) * 14, 9 * K.pop01(t, B.snug, 0.35, 3)); K.sparkles(x, t, 545, K.ACT_Y - 80, B.snug, 14, 220, 3) }
          },
          cues: [['pop', B.couch, 587.33, 0.035, 0], ...[0, 1, 2, 3].map(i => ['pop', +(B.unpack + i * 0.7).toFixed(2), 880 + i * 90, 0.03, -0.4]), ['pop', B.say, 1174.66, 0.04, -0.2], ['pop', B.reply, 1318.51, 0.04, 0.3], ['glitter', B.snug, B.snug + 0.6]],
        }
      } },
  ],
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
