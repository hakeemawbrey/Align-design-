// kdye09: DATE YOURSELF, "The Back Row Matinee" (21 s vertical, star_advice post, cinematic · Dm). Row: promo/films/month2/m16.md.
// Feeling: not letting anyone see you feel things. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
//   0.0–3.0   FRAME 0: ♏ Scorpio mid-flinch in a dark cinema, popcorn flying. Whip at 0.12.
//             Hook "Scorpio, the back row | *is yours.*" Stamp at 1.3.
//   3.0–8.2   STOP 1 a matinee, alone: ADMIT ONE, the back row, a nearly empty room.
//   8.2–13.6  STOP 2 the sad part: Scorpio cries quietly; Pisces in the row in front fountains and passes a tissue back.
//  13.6–19.2  STOP 3 nobody needs to know: the lights come up, the credits read "starring: your feelings".
//  19.4–end   last line "Feel it all. | Nobody's *keeping score.*", hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, shadow, glow, drawBits, tissues,
  sparkles, bubble, label, pop01, outK, r3,
} from '../../kdye01/props.js'

const D = 21.0
const S1 = [3.0, 8.2], S2 = [8.2, 13.6], S3 = [13.6, 19.2]
const SCO = '#c86aff'
const POP = ['.WW.', 'WWWW', '.WW.']

function cinema(x, t, { screen = '#3f5fa8', lights = 0, rows = true } = {}) {
  R(x, '#120a1c', 0, 0, 1080, 1920)
  // the screen
  box(x, 80, 450, 920, 420, screen, { b: 10 })
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 900, 760, '120,150,255', 0.16); x.restore()
  if (lights > 0) { x.save(); x.globalAlpha = 0.35 * lights; R(x, '#a0607a', 0, 0, 1080, 1920); x.restore() }
  if (rows) for (let r = 0; r < 3; r++) {
    const y = 1000 + r * 180
    for (let i = 0; i < 7; i++) box(x, 50 + i * 145, y, 120, 110, '#7a2a3a', { b: 5, hi: '#9a3a4a' })
  }
}

function opener(x, t, S) {
  cinema(x, t, { screen: '#ff8a6a' })
  label(x, 'BOO!', 540, 660, { size: 120, col: BONE, font: INTER, weight: 800 })
  for (let i = 0; i < 14; i++) {
    const tt = t + 0.3, a = -2.4 + i * 0.12 + Math.sin(i) * 0.2, v = 700 + (i * 97) % 300
    drawBits(x, POP, { W: '#fff6d8' }, 540 + Math.cos(a) * v * tt * 0.6, 1100 + Math.sin(a) * v * tt * 0.6 + 500 * tt * tt, 10, { rot: tt * 5 + i })
  }
  box(x, 600, 1250, 90, 120, '#e8344e', { b: 5 }); for (let i = 0; i < 3; i++) R(x, BONE, 610 + i * 28, 1250, 14, 120)
  S.hero(x, t, { x: 540, y: 1180, s: 300, mood: 'wide', look: [0, -1], squash: -0.14 })
  S.pis(x, t, { x: 180, y: 1480, s: 140, mood: 'wide', look: [1, -0.6] }, 2)
}

function matinee(x, t, S) {
  const { u } = S
  cinema(x, t, { screen: '#3f5fa8' })
  // a couple of heads far away in the front rows
  S.npc(x, t, { sign: 'aries', x: 200, y: 1040, s: 90, mood: 'neutral', look: [0, -1] })
  S.npc(x, t, { sign: 'libra', x: 880, y: 1040, s: 90, mood: 'neutral', look: [0, -1] })
  S.hero(x, t, { x: 540, y: 1250, s: 240, mood: u > 2 ? 'happy' : 'squint', look: [0, -1] })
  const tk = pop01(t, S.a + 0.5, 0.3, 2.2) * outK(t, [S.a + 4.6, S.a + 4.9])
  if (tk > 0.01) { x.save(); x.translate(820, 800); x.rotate(0.1); x.scale(tk, tk); box(x, -150, -60, 300, 120, '#ffe08a', { b: 6 }); x.font = `800 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ADMIT ONE', 0, 2); x.restore() }
  drawBits(x, POP, { W: '#fff6d8' }, 680, 1200, 8)
}

function sadPart(x, t, S) {
  const { u } = S
  cinema(x, t, { screen: '#2a3a6a' })
  // on screen: one small star alone under rain-less blue night (a sad scene)
  x.save(); x.beginPath(); x.rect(80, 450, 920, 420); x.clip()
  for (let i = 0; i < 10; i++) R(x, 'rgba(239,230,214,0.4)', 120 + i * 90, 490 + ((i * 61) % 120), 6, 6)
  S.npc(x, t, { sign: 'cancer', x: 540, y: 740, s: 120, mood: 'sleepy', look: [0, 1] })
  x.restore()
  // Pisces in the row in front, fountaining, passing a tissue back
  S.pis(x, t, { x: 700, y: 1060, s: 170, mood: 'sparkle', look: u > 2.4 ? [-1, 1] : [0, -1] }, 3)
  const pass = ease.inOutCubic(prog(u, 2.4, 3.0))
  tissues(x, lerp(780, 620, pass), lerp(1100, 1180, pass), 70)
  S.hero(x, t, { x: 470, y: 1280, s: 240, mood: u > 3.2 ? 'happy' : 'sleepy', look: [0, -1], tears: u > 0.8 ? 2 : 1, zzz: false })
}

function lightsUp(x, t, S) {
  const { u } = S
  const L = ease.inOutCubic(prog(u, 0, 1))
  cinema(x, t, { screen: '#1c1430', lights: L })
  // credits roll
  x.save(); x.beginPath(); x.rect(80, 450, 920, 420); x.clip()
  const roll = ['THE END', '', 'starring', 'your feelings', '', 'also starring', 'one popcorn']
  roll.forEach((s, i) => label(x, s, 540, 860 + i * 60 - u * 110, { size: i === 3 ? 44 : 30, col: i === 3 ? GOLD : BONE, font: i === 3 ? INTER : undefined, weight: 800 }))
  x.restore()
  S.hero(x, t, { x: 540, y: 1250, s: 250, mood: u > 2.0 ? 'happy' : 'neutral', look: [0.6, -0.2], hops: [S.a + 2.0] })
  S.pis(x, t, { x: 850, y: 1110, s: 140, mood: 'happy', look: [-1, 0] }, 2)
  bubble(x, t, 850, 950, S.a + 1.2, S.a + 3.6, 'BEST. MOVIE.', { size: 28, col: '#c9ecfb' })
}

const EP = makeDate({
  id: 'kdye09', sign: 'scorpio', name: 'Scorpio', D, ending: 'cut',
  hook: 'Scorpio, the back row | *is yours.*', hookSize: 108, hookAccent: SCO,
  fx: [{ kind: 'whip', o: { at: 0.12, len: 0.45, from: 1.5 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'a matinee, *alone*', draw: matinee,
      cues: [['pop', 0.5, 1318.51, 0.045, 0.3], ['tick', 0.6, 0.04]] },
    { a: S2[0], b: S2[1], sticker: 'the *sad* part', draw: sadPart,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['pluck', 0.8, 440, 0.03, 0.8, 0], ['whoosh', 2.4, 0.3, 0.03], ['pop', 3.0, 880, 0.03, -0.2]] },
    { a: S3[0], b: S3[1], sticker: 'nobody needs to *know*', draw: lightsUp,
      cues: [['riser', 0, 1, 0.02], ['bell', 1.0, 1760, 0.03, 1.2, 0], ['pop', 2.0, 987.77, 0.04, 0]] },
  ],
  lines: [
    { t: 3.6, who: 'hero', text: 'one ticket. *back* row.' },
    { t: 5.9, who: 'stars', text: 'best seat for *feeling* things.' },
    { t: 9.0, who: 'hero', text: "I'm *not* crying. it's dusty." },
    { t: 11.2, who: 'stars', text: "cry. it's *dark.* that's the point." },
    { t: 14.2, who: 'stars', text: 'you felt it. *all* of it.' },
    { t: 16.4, who: 'hero', text: '…same time next *week?*' },
  ],
  boxes: [[3.4, 8.05, [0, 1]], [8.8, 13.45, [2, 3]], [14.0, 19.0, [4, 5]]],
  last: { t: 19.4, text: "Feel it all. | Nobody's *keeping score.*", top: 300, size: 96, accent: SCO },
  cues: [['tick', 0.0, 0.06], ['boom', 0.12, 0.2]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, MONO, shadow, sparkles, clamp]
