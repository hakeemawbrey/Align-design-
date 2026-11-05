// k5te24: 5 THINGS EVERY PISCES NEEDS TO HEAR, "Pisces, you're going to cry at 5" (60 s vertical, star_advice trial
// reel, long; music: dreamy · E). Rows: promo/films/month2/m33.md #24. Format: ../../k5te23/fivelong.js. Pisces is the
// hero, so the hero cries all the way through (a TISSUES counter runs top-right) and the corner Pisces is skipped.
//   0.00   frame 0: ♓ Pisces mid-wail, both tear fountains on full, a tissue box flying open. Hook: "Pisces. Don’t cry. |
//          *(You will.)*"  Record scratch + freeze at 0.45 ("yep. *already crying.*"); promise chip: "BET YOU CRY AT NUMBER 5."
//   3      1 · THE NOTES  "Your feelings are | *information.*"  Tears drip into a NOTES jar; "noted." stamp.
//   13     2 · THE CAPE  "Rescuing isn’t the | same as *loving.*"  Pisces rushes in wearing a cape; the friend just wanted
//          to vent; the cape drops.
//   23     3 · THE STEP  "Daydreams need a | *first step.*"  A dream cloud turns into a calendar note: SAT: coffee?
//   33     4 · THE CUP  "Rest before you | *pour out.*"  Friends refill Pisces’ empty cup.
//   43     5 · THE MIRROR  "You deserve the | *love you give.*"  The mirror shows Pisces being hugged. TISSUES: ALL OF THEM.
//   53.1   THE STARS: "Feel all of it. | *Keep your heart.*"  Loops back into frame 0 over the last 0.45 s.
import { makeLong } from '../../k5te23/fivelong.js'
import { R, box, INK, BONE, GOLD, PINK, MINT, SKYB, LAV, RED, bubble, shadow, hearts, sparkles, label, drawBits, HEART, debris, pisces, tissues, INTER, MONO, icon } from '../../k5te01/fivekit.js'
import { drawStarChar, STAR } from '../../startalk.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const pal = (x, t, col, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: col, seed: o.seed || 8, glow: 0.9, ...o })
const P = (x, t, o, tears, mood = 'wide', look = [0, 0]) => pisces(x, t, { ...o }, tears, mood, look)

const EP = makeLong({
  id: 'k5te24', sign: 'pisces', name: 'Pisces', ending: 'loop', accent: '#9fd8f6', deep: '#3a4fb0', heroTears: true,
  brk: { type: 'scratch', at: 0.45, caption: 'yep. *already crying.*' },
  hookLine: 'Pisces. Don’t cry. | *(You will.)*',
  promise: 'BET YOU CRY AT NUMBER 5.',
  hook(x, th, S) {
    const tis = (c, i, s) => { c.fillStyle = INK; c.fillRect(-s / 2 - 3, -s / 2 - 3, s + 6, s * 0.8 + 6); c.fillStyle = '#ffffff'; c.fillRect(-s / 2, -s / 2, s, s * 0.8); c.fillStyle = '#e6f6ff'; c.fillRect(-s / 2, s * 0.1, s, s * 0.2) }
    debris(x, th, 820, 1000, { n: 10, spread: 300, sz: 46, seed: 6, v: 0.5, grav: 80, shape: tis })
    x.save(); x.translate(820 + 30 * th, 1180 - 40 * th); x.rotate(-0.5 + th * 2); tissues(x, 0, 0, 200); x.restore()
    shadow(x, 440, 1240, 300)
    P(x, th, { x: 440, y: 1050, s: 380, bob: 0, squash: 0.06 * Math.sin(th * 20) }, 3, 'wide', [0, -0.3])
    label(x, 'WAAAH', 440, 720, { size: 70, col: SKYB, font: INTER, weight: 800, rot: -0.1 })
  },
  chapters: [
    { title: 'the notes', text: 'Your feelings are | *information.*', icon: 'water', mood: 'wide',
      lines: [{ text: 'feelings are *info,* not orders.' }, { speaker: '♓︎ PISCES', color: '#9fd8f6', text: 'so I can feel it *and* think?' }],
      draw(x, t, S) {
        const u = S.u, f = clamp(prog(u, 0.2, 4.2))
        P(x, t, { x: 330, y: 1020, s: 280, hops: [S.t0 + 0.3, S.t0 + 3.4, S.t0 + 6.4] }, S.tears, u > 4.4 ? 'sparkle' : 'wide', [1, 0.6])
        // the NOTES jar filling with tears
        box(x, 600, 820, 280, 340, 'rgba(191,232,255,0.25)', { b: 8 }); R(x, '#8fe3ff', 600, 1160 - 330 * f, 280, 330 * f); box(x, 590, 780, 300, 40, '#a07850', { b: 6 })
        x.font = `800 44px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; R(x, BONE, 650, 940, 180, 64); x.fillText('NOTES', 740, 974)
        for (let i = 0; i < 4; i++) { const p = ((u * 1.6 + i / 4) % 1); R(x, '#8fe3ff', 470 + 200 * p, 900 - 120 * Math.sin(Math.PI * p), 14, 18) }
        // the "noted." stamp
        const sk = clamp(prog(u, 4.4, 4.55))
        if (sk > 0) { x.save(); x.translate(740, 700); x.rotate(-0.12); x.scale(lerp(1.6, 1, sk), lerp(1.6, 1, sk)); x.globalAlpha = sk; x.lineWidth = 8; x.strokeStyle = RED; x.strokeRect(-130, -50, 260, 100); x.font = `800 60px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('noted.', 0, 4); x.restore() }
      },
      cues: [['pluck', 0.4, 1318.51, 0.02, 0.4, 0.3], ['pluck', 1.0, 1174.66, 0.02, 0.4, 0.3], ['pluck', 1.6, 1318.51, 0.02, 0.4, 0.3], ['tom', 4.4, 90, { gain: 0.25, decay: 0.2 }], ['tick', 4.4, 0.07]] },
    { title: 'the cape', text: 'Rescuing isn’t the | same as *loving.*', icon: 'shield', mood: 'neutral',
      lines: [{ text: 'you can care without *fixing.*' }, { text: 'sometimes *listening* is the rescue.' }],
      draw(x, t, S) {
        const u = S.u, run = ease.outCubic(prog(u, 0, 1.2)), drop = prog(u, 3.4, 4.2)
        const px = lerp(120, 360, run)
        // the cape (falls off at 3.4)
        x.save(); x.translate(px - 60 + 140 * drop, 1000 + 260 * ease.inQuad(drop)); x.rotate(-0.4 + 0.2 * Math.sin(t * 8) + drop * 1.5)
        x.fillStyle = INK; x.beginPath(); x.moveTo(0, -80); x.lineTo(-150, 120); x.lineTo(40, 110); x.closePath(); x.fill()
        x.fillStyle = RED; x.beginPath(); x.moveTo(0, -66); x.lineTo(-132, 108); x.lineTo(30, 98); x.closePath(); x.fill(); x.restore()
        P(x, t, { x: px, y: 1020, s: 260, hops: [S.t0 + 1.2, S.t0 + 3.4, S.t0 + 5.0] }, S.tears, u < 3.4 ? 'wide' : 'happy', [1, 0])
        pal(x, t, MINT, { x: 780, y: 1040, s: 240, mood: u < 2.4 ? 'neutral' : 'happy', look: [-1, 0], seed: 15, hops: [S.t0 + 2.2, S.t0 + 4.5] })
        bubble(x, t, 380, 720, S.t0 + 0.3, S.t0 + 2.2, 'I’LL FIX IT!!', { size: 42, col: '#ffd0dc', tail: -0.2 })
        bubble(x, t, 720, 760, S.t0 + 2.2, S.t0 + 5.4, 'I’m ok, I just needed to vent', { size: 32, col: '#c9f2d4', tail: 0.4 })
        bubble(x, t, 380, 760, S.t0 + 4.4, S.t0 + 6.8, 'oh. I can do that.', { size: 36, col: '#bfe8ff', tail: -0.2 })
        if (u > 4.6) hearts(x, t, S.t0 + 4.7, 580, 900, { n: 6 })
      },
      cues: [['whoosh', 0, 1.0, 0.04], ['pop', 0.3, 1318.51, 0.04, -0.3], ['pop', 2.2, 880, 0.035, 0.3], ['whoosh', 3.4, 0.7, 0.03], ['pop', 4.4, 1174.66, 0.035, -0.3]] },
    { title: 'the step', text: 'Daydreams need a | *first step.*', icon: 'moon', mood: 'sparkle',
      lines: [{ text: 'pick *one* tiny step.' }, { speaker: '♓︎ PISCES', color: '#9fd8f6', text: 'I texted. *we’re on for saturday!*' }],
      draw(x, t, S) {
        const u = S.u, mo = ease.inOutCubic(prog(u, 2.4, 3.2))
        P(x, t, { x: 540, y: 1120, s: 270, hops: [S.t0 + 0.4, S.t0 + 3.2, S.t0 + 6.4] }, S.tears, u < 3.2 ? 'sparkle' : 'heart', [0, -1])
        // the dream cloud…
        if (mo < 1) {
          x.save(); x.globalAlpha = 1 - mo; x.translate(540, 760); x.scale(1 - 0.4 * mo, 1 - 0.4 * mo)
          for (const [cx, cy, r] of [[-150, 20, 90], [-50, -40, 120], [80, -30, 110], [170, 30, 80], [0, 50, 110]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill() }
          for (const [cx, cy, r] of [[-150, 20, 90], [-50, -40, 120], [80, -30, 110], [170, 30, 80], [0, 50, 110]]) { x.fillStyle = '#efe6ff'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
          drawBits(x, HEART, { H: PINK }, -40, 0, 14); drawBits(x, ['..G..', '.GGG.', 'GGGGG', '.G.G.'], { G: GOLD }, 110, -10, 12)
          x.restore()
        }
        // …becomes a calendar note
        if (mo > 0) {
          x.save(); x.globalAlpha = mo; x.translate(540, 760); x.rotate(-0.05); x.scale(0.6 + 0.4 * mo, 0.6 + 0.4 * mo)
          box(x, -200, -130, 400, 260, BONE, { b: 8 }); R(x, RED, -200, -130, 400, 60)
          x.font = `800 36px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -100)
          x.font = `800 64px ${INTER}`; x.fillStyle = INK; x.fillText('coffee?', 0, 10)
          if (u > 4.0) icon(x, 'check', 150, 80, 12)
          x.restore()
        }
        sparkles(x, t, 540, 760, S.t0 + 3.2, 12, 230, 2, [GOLD, PINK, BONE])
      },
      cues: [['riser', 2.0, 3.2, 0.02], ['pop', 3.2, 1318.51, 0.045, 0], ['bell', 3.25, 1760, 0.03, 0.9, 0], ['pop', 4.0, 1567.98, 0.035, 0.3]] },
    { title: 'the cup', text: 'Rest before you | *pour out.*', icon: 'cup', mood: 'sleepy',
      lines: [{ text: 'let people *fill your cup* too.' }, { text: 'rest is part of *loving well.*' }],
      draw(x, t, S) {
        const u = S.u, f = ease.inOutCubic(prog(u, 1.6, 5.0))
        P(x, t, { x: 540, y: 1080, s: 260, hops: [S.t0 + 0.3, S.t0 + 5.0] }, S.tears, u < 1.4 ? 'sleepy' : u < 5 ? 'wide' : 'heart', [0, -1])
        // the cup, held up
        box(x, 450, 820, 180, 160, BONE, { b: 8 }); R(x, '#f59cc4', 458, 972 - 150 * f, 164, 150 * f); box(x, 630, 850, 40, 80, BONE, { b: 6 })
        label(x, f > 0.98 ? 'FULL' : f < 0.05 ? 'EMPTY' : '', 540, 780, { size: 34, col: f > 0.98 ? MINT : '#ff9db0' })
        // two friends, pouring
        for (const [d, col, sd] of [[-1, '#ffd23a', 16], [1, LAV, 17]]) {
          const fx = 540 + d * 330, k = clamp(prog(u, 0.8 + (d > 0 ? 0.3 : 0), 1.4 + (d > 0 ? 0.3 : 0)))
          pal(x, t, col, { x: fx, y: 960, s: 200, pop: k, mood: 'happy', look: [-d, 0.5], seed: sd, hops: [S.t0 + 1.6, S.t0 + 3.2] })
          if (u > 1.6 && u < 5.0) { x.save(); x.translate(fx - d * 90, 760); x.rotate(-d * 0.6); box(x, -50, -40, 100, 80, col, { b: 6 }); R(x, INK, d < 0 ? 46 : -70, -10, 30, 14); x.restore()
            x.strokeStyle = '#f59cc4'; x.lineWidth = 12; x.beginPath(); x.moveTo(fx - d * 150, 770); x.quadraticCurveTo(fx - d * 220, 760, 540 + d * 30, 840); x.stroke() }
        }
        if (u > 5) hearts(x, t, S.t0 + 5.1, 540, 800, { n: 6 })
      },
      cues: [['pop', 0.85, 880, 0.035, -0.4], ['pop', 1.15, 987.77, 0.035, 0.4], ['riser', 1.6, 5.0, 0.016], ['bell', 5.0, 1760, 0.035, 1.0, 0]] },
    { title: 'the mirror', text: 'You deserve the | *love you give.*', icon: 'mirror', mood: 'heart',
      lines: [{ text: 'the love you give? *it’s yours too.*' }, { speaker: '♓︎ PISCES', color: '#9fd8f6', text: 'I’m not crying. *(I’m crying.)*' }],
      draw(x, t, S) {
        const u = S.u, show = ease.outCubic(prog(u, 1.2, 2.2))
        // the mirror
        box(x, 560, 520, 400, 700, GOLD, { b: 8 }); R(x, '#1d2550', 584, 544, 352, 652)
        x.save(); x.beginPath(); x.rect(584, 544, 352, 652); x.clip()
        x.globalAlpha = 0.85
        P(x, t, { x: 760, y: 900, s: 230, hops: [S.t0 + 2.2] }, 0, u > 2.2 ? 'heart' : 'neutral', [-1, 0])
        if (show > 0) { drawStarChar(x, lerp(1000, 820, show), 870, 220, t, { color: STAR.sky, mood: 'happy', look: [-1, 0], seed: 2, pop: show }); hearts(x, t, S.t0 + 2.2, 760, 760, { n: 6 }) }
        R(x, 'rgba(255,255,255,0.12)', 600, 560, 40, 600)
        x.restore()
        P(x, t, { x: 300, y: 1060, s: 280, hops: [S.t0 + 0.3, S.t0 + 2.3, S.t0 + 4.0, S.t0 + 6.5] }, 3, u > 2.2 ? 'sparkle' : 'wide', [1, -0.2])
        if (u > 2.2) label(x, 'SOB-O-METER: MAX', 300, 760, { size: 34, col: SKYB, alpha: clamp(prog(u, 2.3, 2.6)) })
        sparkles(x, t, 760, 880, S.t0 + 2.2, 14, 220, 4, [GOLD, PINK, BONE])
      },
      cues: [['whoosh', 1.2, 0.9, 0.03], ['bell', 2.2, 1760, 0.04, 1.4, 0], ['glitter', 2.2, 2.9], ['pluck', 2.4, 1567.98, 0.03, 0.6, 0.3], ['pop', 6.4, 987.77, 0.03, -0.3]] },
  ],
  last: 'Feel all of it. | *Keep your heart.*',
  finale(x, t, S) { drawStarChar(x, 820, 960, 190, t, { color: STAR.sky, pop: S.k, mood: 'happy', look: [-1, 0], seed: 2, hops: [t - S.u + 0.5, t - S.u + 3.4] }) },
  music: { style: 'dreamy', key: 'E', seed: 3324 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [SKYB, MONO]
