// k5te23: 5 THINGS EVERY AQUARIUS NEEDS TO HEAR, "Aquarius, everything nobody says out loud" (60 s vertical, star_advice
// trial reel, long; music: synthwave · B). Rows: promo/films/month2/m33.md #23. Format: ../fivelong.js (+ ../../k5te01/fivekit.js).
//   0.00   frame 0: ♒ Aquarius mid-glitch, beaming up out of a crowded party in a column of light, the picture tearing.
//          Hook: "Aquarius. *Stay.* | Number five matters."  Glitch at 0.42 ("AQUARIUS has left the party"),
//          promise chip 1.25: "NUMBER 5 IS THE ONE."
//   3      1 · THE WEIRD FACT  "You’re not too weird | *to love.*"  Aquarius drops a true fact (octopuses have three hearts),
//          the friends go heart-eyed: "tell me MORE."
//   13     2 · THE SOFA  "Space and closeness can | *share a sofa.*"  Two ends of a sofa, two blankets, inching together.
//   23     3 · LOG OFF  "Say the feeling | *before you log off.*"  A DISCONNECTING… bar; Aquarius hits CANCEL.
//   33     4 · THE CHAT  "Your friends are | *your family.*"  The group chat lights up for it.
//   43     5 · THE ASK  "You are allowed | *to need people.*"  "can you stay a bit?" "obviously." Hug. Pisces: fountains.
//   53.1   THE STARS: "Need people. | *That’s the future too.*"  Hard cut at 60.
import { makeLong } from '../fivelong.js'
import { R, box, INK, BONE, GOLD, PINK, MINT, SKYB, LAV, RED, bubble, shadow, hearts, sparkles, label, phone, drawBits, HEART, debris, INTER, MONO } from '../../k5te01/fivekit.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const AQ = signStar('aquarius')
const aq = (x, t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: AQ.color, glyph: o.s >= 150 ? AQ.glyph : null, seed: 3, glow: 1.1, ...o })
const pal = (x, t, col, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: col, seed: o.seed || 8, glow: 0.9, ...o })
const pop = (u, a, d = 0.3) => clamp(ease.outBack ? ease.outCubic(prog(u, a, a + d)) : prog(u, a, a + d))

const EP = makeLong({
  id: 'k5te23', sign: 'aquarius', name: 'Aquarius', ending: 'cut', deep: '#1f6aa0',
  brk: { type: 'glitch', at: 0.42, len: 0.75, text: 'AQUARIUS has left the party' },
  hookLine: 'Aquarius. *Stay.* | Number five matters.',
  promise: 'NUMBER 5 IS THE ONE.',
  hook(x, th, S) {
    // the party crowd at the bottom, looking up
    const cols = [PINK, MINT, '#ffd23a', LAV, '#ff9d5c', SKYB]
    for (let i = 0; i < 6; i++) pal(x, th, cols[i], { x: 110 + i * 172, y: 1450 + (i % 2) * 40, s: 150, mood: 'wide', look: [0, -1], seed: 10 + i, bob: 0 })
    // the beam
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(380, 0, 700, 0); g.addColorStop(0, 'rgba(127,208,240,0)'); g.addColorStop(0.5, 'rgba(127,208,240,0.4)'); g.addColorStop(1, 'rgba(127,208,240,0)')
    x.fillStyle = g; x.fillRect(380, 380, 320, 1100); x.restore()
    // Aquarius, sliced and rising
    for (let i = 0; i < 9; i++) {
      x.save(); x.beginPath(); x.rect(0, 720 + i * 46, 1080, 46); x.clip()
      x.translate(Math.sin(i * 2.3 + th * 9) * 46 * (i % 3 ? 1 : 2.2), 0)
      aq(x, th, { x: 540, y: 930 - 60 * th, s: 330, mood: 'wide', look: [0, 1], bob: 0 })
      x.restore()
    }
    for (let i = 0; i < 24; i++) { const p = ((th * 0.5 + i / 24) % 1); R(x, i % 2 ? '#7fd0f0' : BONE, 540 + Math.cos(i * 1.7) * (90 + 300 * p), 930 + Math.sin(i * 2.9) * (100 + 200 * p) - 260 * p, 14, 14) }
  },
  chapters: [
    { title: 'the weird fact', text: 'You’re not too weird | *to love.*', icon: 'sparkle', mood: 'wide',
      lines: [{ text: 'the odd fact is the *icebreaker.*' }, { text: 'your people *love* your weird.' }],
      draw(x, t, S) {
        const u = S.u
        shadow(x, 540, 1190, 240)
        aq(x, t, { x: 540, y: 1020, s: 260, mood: u < 2.4 ? 'sparkle' : 'happy', look: [0, 0], hops: [S.t0 + 0.3, S.t0 + 0.8, S.t0 + 2.6] })
        const heart = u > 2.3
        pal(x, t, PINK, { x: 210, y: 1080, s: 200, mood: heart ? 'heart' : 'wide', look: [1, -0.3], seed: 11, hops: [S.t0 + 2.3, S.t0 + 4.2] })
        pal(x, t, MINT, { x: 870, y: 1080, s: 200, mood: heart ? 'heart' : 'wide', look: [-1, -0.3], seed: 12, hops: [S.t0 + 2.4, S.t0 + 5.2] })
        bubble(x, t, 540, 640, S.t0 + 0.3, S.t0 + 4.0, 'octopuses have THREE hearts!', { size: 38 })
        bubble(x, t, 260, 830, S.t0 + 2.5, S.t0 + 6.8, 'tell me MORE', { size: 36, col: '#ffd0dc', tail: 0.4 })
        bubble(x, t, 820, 780, S.t0 + 4.2, S.t0 + 6.8, 'one more fact!!', { size: 34, col: '#c9f2d4', tail: -0.4 })
        hearts(x, t, S.t0 + 2.4, 210, 930); hearts(x, t, S.t0 + 2.5, 870, 930)
        sparkles(x, t, 540, 640, S.t0 + 0.32, 10, 260, 2, [GOLD, BONE, SKYB])
      },
      cues: [['pop', 0.3, 1174.66, 0.04, 0], ['pluck', 2.35, 1567.98, 0.035, 0.5, -0.3], ['pluck', 2.5, 1318.51, 0.035, 0.5, 0.3], ['pop', 4.2, 987.77, 0.035, 0.3]] },
    { title: 'the sofa', text: 'Space and closeness can | *share a sofa.*', icon: 'house', mood: 'neutral',
      lines: [{ text: 'ask for space *and* stay close.' }, { speaker: `${AQ.glyph}︎ AQUARIUS`, color: '#7fd0f0', text: 'ok. this is… *nice.*' }],
      draw(x, t, S) {
        const u = S.u, m = ease.inOutCubic(prog(u, 1.0, 5.5))
        // the sofa
        box(x, 140, 980, 800, 120, '#6a4fb0', { b: 8, hi: '#8a6fd0' }); box(x, 110, 1090, 860, 130, '#5a3f9a', { b: 8 }); box(x, 90, 1000, 70, 220, '#6a4fb0', { b: 8 }); box(x, 920, 1000, 70, 220, '#6a4fb0', { b: 8 })
        const ax = lerp(250, 440, m), bx = lerp(830, 640, m)
        aq(x, t, { x: ax, y: 1000, s: 220, mood: u > 5.6 ? 'happy' : 'neutral', look: [1, 0], hops: [S.t0 + 1.2, S.t0 + 3.0, S.t0 + 5.6] })
        pal(x, t, LAV, { x: bx, y: 1000, s: 220, mood: u > 5.6 ? 'heart' : 'happy', look: [-1, 0], seed: 13, hops: [S.t0 + 1.4, S.t0 + 3.2, S.t0 + 5.6] })
        // two blankets
        box(x, ax - 110, 1060, 220, 110, '#7fd0f0', { b: 6 }); box(x, bx - 110, 1060, 220, 110, '#ff8fb1', { b: 6 })
        for (let i = 0; i < 4; i++) { R(x, 'rgba(255,255,255,0.4)', ax - 90 + i * 50, 1070, 20, 90); R(x, 'rgba(255,255,255,0.4)', bx - 90 + i * 50, 1070, 20, 90) }
        bubble(x, t, 700, 760, S.t0 + 0.4, S.t0 + 3.4, 'same sofa, different blankets?', { size: 34, tail: 0.3 })
        bubble(x, t, 330, 790, S.t0 + 2.2, S.t0 + 5.0, 'deal.', { size: 40, col: '#bfe8ff', tail: -0.2 })
        if (u > 5.6) hearts(x, t, S.t0 + 5.7, 540, 900, { n: 6 })
      },
      cues: [['pop', 0.4, 880, 0.035, 0.3], ['pop', 2.2, 1174.66, 0.04, -0.3], ['riser', 1.0, 5.5, 0.012], ['bell', 5.6, 1760, 0.03, 0.9, 0]] },
    { title: 'log off', text: 'Say the feeling | *before you log off.*', icon: 'chat', mood: 'wide',
      lines: [{ text: 'say *one* feeling, then recharge.' }, { speaker: `${AQ.glyph}︎ AQUARIUS`, color: '#7fd0f0', text: 'I liked tonight. *a lot.*' }],
      draw(x, t, S) {
        const u = S.u, cancel = u > 2.6
        aq(x, t, { x: 300, y: 1060, s: 260, mood: cancel ? 'sparkle' : 'neutral', look: [1, -0.4], hops: [S.t0 + 2.6, S.t0 + 3.3, S.t0 + 5.0] })
        pal(x, t, '#ffd23a', { x: 820, y: 1100, s: 200, mood: u > 3.6 ? 'heart' : 'happy', look: [-1, 0], seed: 14, hops: [S.t0 + 3.6] })
        // the bar
        const f = cancel ? 0.82 : 0.82 * ease.outCubic(prog(u, 0.2, 2.4))
        box(x, 140, 600, 800, 140, '#14102a', { b: 8 })
        x.font = `700 34px ${MONO}`; x.fillStyle = cancel ? '#9fe6b0' : BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
        x.fillText(cancel ? 'staying online ♥︎' : `disconnecting… ${Math.round(f * 100)}%`, 170, 640)
        R(x, '#2a1f55', 170, 680, 740, 36); R(x, cancel ? '#5fd38a' : '#7fd0f0', 170, 680, 740 * f, 36)
        // the CANCEL button, tapped
        const bk = cancel ? 1 + 0.15 * Math.exp(-(u - 2.6) * 8) : 1
        x.save(); x.translate(780, 820); x.scale(bk, bk); box(x, -110, -38, 220, 76, cancel ? '#5fd38a' : RED, { b: 6 }); x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('CANCEL', 0, 2); x.restore()
        sparkles(x, t, 780, 820, S.t0 + 2.6, 10, 140, 3, ['#5fd38a', BONE, GOLD])
        if (u > 3.6) hearts(x, t, S.t0 + 3.7, 820, 950, { n: 5 })
      },
      cues: [['riser', 0.2, 2.4, 0.02], ['tick', 0.6, 0.03], ['tick', 1.2, 0.03], ['tick', 1.8, 0.03], ['pop', 2.6, 1318.51, 0.05, 0.2], ['bell', 2.65, 1760, 0.03, 0.8, 0.2]] },
    { title: 'the chat', text: 'Your friends are | *your family.*', icon: 'heart', mood: 'sparkle',
      lines: [{ text: 'chosen family *counts.*' }, { text: 'they’re already *on your side.*' }],
      draw(x, t, S) {
        const u = S.u
        const MS = ['AQUARIUS!!', 'we love you', 'movie night?', 'bring your weird facts', 'saving you a seat', 'proud of you', '♥︎ ♥︎ ♥︎']
        phone(x, 640, 960, 360, 0.04, (c, w, h) => {
          c.font = `700 22px ${MONO}`; c.fillStyle = '#9fe6b0'; c.textAlign = 'center'; c.fillText('the group chat', w / 2, 34)
          MS.forEach((m, i) => { const at = 0.3 + i * 0.75; if (u < at) return
            const k = clamp(prog(u, at, at + 0.2)), yy = 70 + i * 82 - Math.max(0, (u - 0.3) / 0.75 - 6) * 82
            c.save(); c.globalAlpha = k; c.font = `800 26px ${INTER}`; const tw = c.measureText(m).width + 32, L = i % 2
            R(c, L ? '#ffd0dc' : BONE, L ? w - tw - 14 : 14, yy, tw, 52); c.fillStyle = INK; c.textAlign = 'left'; c.fillText(m, (L ? w - tw - 14 : 14) + 16, yy + 34); c.restore() })
        }, { glow: 1 })
        aq(x, t, { x: 250, y: 1150, s: 240, mood: u > 3 ? 'heart' : 'sparkle', look: [1, -0.5], hops: [S.t0 + 0.3, S.t0 + 1.8, S.t0 + 3.3, S.t0 + 4.8] })
        const cs = [PINK, MINT, '#ffd23a', LAV]
        cs.forEach((c, i) => pal(x, t, c, { x: 130 + i * 90, y: 1300 - (i % 2) * 30, s: 90, mood: 'happy', seed: 20 + i, pop: clamp(prog(u, 0.5 + i * 0.6, 0.8 + i * 0.6)) }))
        if (u > 3) hearts(x, t, S.t0 + 3.1, 250, 1000, { n: 6 })
      },
      cues: [0.3, 1.05, 1.8, 2.55, 3.3, 4.05, 4.8].map((a, i) => ['pop', a, [880, 987.77, 1174.66, 1318.51, 1174.66, 1567.98, 1760][i], 0.035, (i % 2 ? 0.3 : -0.3)]) },
    { title: 'the ask', text: 'You are allowed | *to need people.*', icon: 'hug', mood: 'heart',
      lines: [{ text: 'needing people isn’t a *bug.*' }, { text: 'and look: *they stayed.*' }],
      draw(x, t, S) {
        const u = S.u, m = ease.inOutCubic(prog(u, 2.4, 3.1))
        // a doorway, coat half on
        box(x, 720, 600, 260, 640, '#6b4a2f', { b: 8 }); R(x, '#c98a4a', 740, 620, 220, 600); R(x, GOLD, 760, 920, 18, 18)
        const fx = lerp(820, 620, m), ax = lerp(300, 470, m)
        shadow(x, 540, 1250, 420)
        aq(x, t, { x: ax, y: 1070, s: 250, mood: u < 2.2 ? 'neutral' : 'sparkle', look: [1, 0], hops: [S.t0 + 0.3, S.t0 + 2.4, S.t0 + 3.1] })
        pal(x, t, PINK, { x: fx, y: 1070, s: 230, mood: u < 1.8 ? 'happy' : 'heart', look: [-1, 0], seed: 11, hops: [S.t0 + 1.8, S.t0 + 3.1] })
        bubble(x, t, 330, 780, S.t0 + 0.3, S.t0 + 2.6, 'can you stay a bit?', { size: 38, col: '#bfe8ff', tail: -0.3 })
        bubble(x, t, 760, 520, S.t0 + 1.8, S.t0 + 3.6, 'obviously.', { size: 44, col: '#ffd0dc', tail: 0.2 })
        if (u > 3.1) { hearts(x, t, S.t0 + 3.1, 540, 900, { n: 8, spread: 300 }); hearts(x, t, S.t0 + 4.6, 540, 900, { n: 8, spread: 300 }) }
        sparkles(x, t, 540, 1000, S.t0 + 3.1, 14, 260, 4, [GOLD, PINK, BONE])
        label(x, 'HUG: 10/10', 540, 1290, { size: 40, col: GOLD, alpha: clamp(prog(u, 3.3, 3.6)) })
      },
      cues: [['pop', 0.3, 880, 0.04, -0.3], ['pop', 1.8, 1318.51, 0.045, 0.3], ['whoosh', 2.4, 0.7, 0.03], ['bell', 3.1, 1760, 0.04, 1.2, 0], ['glitter', 3.1, 3.7]] },
  ],
  last: 'Need people. | *That’s the future too.*',
  finale(x, t, S) { pal(x, t, PINK, { x: 820, y: 960, s: 190, pop: S.k, mood: 'heart', look: [-1, 0], seed: 11, hops: [t - S.u + 0.4, t - S.u + 3] }) },
  music: { style: 'synthwave', key: 'B', seed: 3323 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
void [debris, HEART, drawBits, pop]
