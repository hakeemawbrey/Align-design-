// trpacknerves: STARTER PACK, "First date nerves" (20 s vertical, Star Talk Trends §5.1, music: funk · E)
// Story 0–15.6, then the shared end card. The format engine is ./packkit.js (identical in every trpack* film).
//   0.1        "First date nerves | *starter pack*" over four empty slots (slot 4 is a pulsing "?").
//   1.71       1 · "3 outfit changes": shirts fly out of a closet onto a growing pile; the counter keeps going (LOOK #7).
//   3.93       2 · "a practice laugh (take 6)": ♋ Cancer laughs at the mirror: "ha!", "HA ha.", "hehe?", "*snort*".
//              THE STARS: "every first date comes with *this* pack."
//   6.16       3 · "a pep talk from Aries": ♈ Aries through a megaphone, "YOU GOT THIS!!", Cancer blown back.
//   8.38       the "?" rattles. THE STARS: "and the *rare* item…"
//   9.49       4 · "…the date, also nervous": across the table ♑ Capricorn sweats too; "hi!" "HI!" collide.
//   11.16      card cut → payoff: ♑ "wait… you practiced the *laugh* too?" — both crack up, a heart pops.
//   13.4       last line: "Nervous *together*."  Pisces fountains behind the box the whole way.
import { makePack, drawBits, bubble, label, star, heart, sparkles, R, INK, BONE, GOLD, PINK, CREAM, MONO, signStar, prog, ease, lerp, clamp, r3 } from './packkit.js'

const CAN = signStar('cancer'), ARI = signStar('aries'), CAP = signStar('capricorn')
const SHIRT = ['SS.....SS', 'SSSS.SSSS', 'SSSSSSSSS', '.SSSSSSS.', '..SSSSS..', '..SSSSS..', '..SSSSS..']
const SHIRT_C = ['#ff8fb1', '#8fd8f6', '#9fe6b0', '#f2c75c', '#c9a6ff', '#ff9f5a', '#ffffff', '#7fa0ff']
const MEGA = ['......WW', '....WWWW', 'GGWWWWWW', 'GGWWWWWW', '....WWWW', '......WW']

// 1 · the closet + the shirt pile
function outfits(x, t, lt) {
  // closet
  R(x, INK, 22, 52, 140, 290); R(x, '#8a5a3c', 28, 58, 128, 278); R(x, '#5a3a26', 40, 70, 104, 254)
  R(x, '#3a2418', 44, 96, 96, 4)
  for (let i = 0; i < 5; i++) drawBits(x, SHIRT, { S: SHIRT_C[(i + 3) % 8] }, 60 + i * 18, 128, 3.2)
  R(x, INK, 4, 54, 22, 286); R(x, '#a06c48', 8, 58, 14, 278)           // open doors
  R(x, INK, 158, 54, 22, 286); R(x, '#a06c48', 162, 58, 14, 278)
  const GAP = 0.42, n = clamp(Math.floor((lt - 0.2) / GAP) + 1, 0, 7)
  // the pile
  for (let i = 0; i < n; i++) {
    const t0 = 0.2 + i * GAP, f = prog(lt, t0, t0 + 0.32)
    const px = 230 + (i % 4) * 52, py = 332 - Math.floor(i / 4) * 22
    const cx = lerp(92, px, ease.outQuad(f)), cy = lerp(180, py, f) - Math.sin(Math.PI * f) * 120
    drawBits(x, SHIRT, { S: SHIRT_C[i % 8] }, cx, cy, 4.4, { rot: (i % 3 - 1) * 0.35 + (1 - f) * 4 })
  }
  star(x, 320, 186, 150, t, { color: CAN.color, mood: 'wide', look: [-1, 0], seed: 3, glow: 0.8, hops: Array.from({ length: n }, (_, i) => r3(t - lt + 0.2 + i * GAP)) }, { sweat: 2 })
  label(x, `LOOK #${Math.max(1, n)}`, 330, 40, { size: 24, col: GOLD })
}

// 2 · the mirror
const LAUGHS = ['ha!', 'HA ha.', 'hehe?', 'ahaha!!', '*snort*']
function laugh(x, t, lt) {
  // mirror
  R(x, INK, 250, 40, 168, 300); R(x, GOLD, 256, 46, 156, 288); R(x, '#a7d8f0', 266, 56, 136, 268)
  x.save(); x.beginPath(); x.rect(266, 56, 136, 268); x.clip()
  R(x, '#c9ecff', 266, 56, 136, 268); R(x, 'rgba(255,255,255,0.35)', 280, 60, 14, 260)
  const i = Math.max(0, Math.floor(lt / 0.6)) % LAUGHS.length, snort = LAUGHS[i] === '*snort*'
  x.globalAlpha = 0.65
  star(x, 334, 214, 130, t, { color: CAN.color, mood: snort ? 'squint' : 'happy', look: [-1, 0], seed: 4, glow: 0, tips: false, hops: [r3(t - lt + Math.floor(lt / 0.6) * 0.6)] })
  x.restore()
  star(x, 128, 214, 150, t, { color: CAN.color, mood: snort ? 'squint' : 'happy', look: [1, 0], seed: 4, glow: 0.8, hops: [r3(t - lt + Math.floor(lt / 0.6) * 0.6)] })
  const bk = clamp(prog(lt % 0.6, 0, 0.12)) * (lt > 0.15 ? 1 : 0)
  bubble(x, 132, 78, LAUGHS[i], { k: bk, size: 30, tail: 1 })
  label(x, `TAKE ${6 + Math.floor(Math.max(0, lt) / 0.6)}`, 70, 336, { size: 22, col: GOLD })
}

// 3 · the pep talk
function pep(x, t, lt) {
  const blast = 0.5 + 0.5 * Math.sin(lt * 18)
  // wind lines
  for (let i = 0; i < 9; i++) {
    const ph = ((lt * 2.2 + i * 0.37) % 1 + 1) % 1
    R(x, 'rgba(239,230,214,0.55)', 210 + ph * 220, 120 + (i * 37) % 170, 30 + (i % 3) * 14, 4)
  }
  const hops = Array.from({ length: 12 }, (_, i) => r3(t - lt + 0.1 + i * 0.36))
  star(x, 110, 214, 160, t, { color: ARI.color, mood: 'wide', look: [1, 0], seed: 7, glow: 0.9, hops })
  drawBits(x, MEGA, { W: BONE, G: '#9a8fb8' }, 205, 208, 6, { rot: -0.08 + 0.04 * blast })
  star(x, 352 + 10 * blast, 222, 120, t, { color: CAN.color, mood: 'squint', look: [-1, 0], seed: 3, glow: 0.7, squash: 0.12 + 0.06 * blast }, { sweat: 2 })
  bubble(x, 220 + Math.sin(lt * 40) * 3, 62, 'YOU GOT THIS!!', { k: clamp(prog(lt, 0.15, 0.3)), size: 34, col: '#ffd0c8', tail: -1 })
}

// 4 · the date, also nervous (grid) and the payoff (big)
function table(x) {
  R(x, INK, 96, 286, 248, 20); R(x, '#a06c48', 100, 290, 240, 12); R(x, INK, 120, 306, 14, 54); R(x, INK, 306, 306, 14, 54)
}
function date(x, t, lt) {
  table(x)
  const hi = Math.floor(Math.max(0, lt) / 0.7) % 2
  star(x, 104, 200, 150, t, { color: CAN.color, mood: 'wide', look: [1, 0], seed: 3, glow: 0.8, hops: [r3(t - lt + 0.3)] }, { sweat: 2 })
  star(x, 336, 200, 150, t, { color: CAP.color, mood: 'wide', look: [-1, 0], seed: 8, glow: 0.8, hops: [r3(t - lt + 0.35)] }, { sweat: 2 })
  if (lt > 0.3) { bubble(x, 120, 70, 'hi!', { k: hi ? 0 : 1, size: 30, tail: 1 }); bubble(x, 320, 70, 'HI!', { k: hi ? 1 : 0, size: 30, tail: -1 }) }
  label(x, 'LOOK #9', 336, 336, { size: 20, col: GOLD })
}
function payoff(x, t, pt, P) {
  table(x)
  const crack = P.T.last - P.T.cut - 0.15                 // they crack up just before the last line
  const lol = pt > crack
  const hops = lol ? [r3(t - pt + crack), r3(t - pt + crack + 0.45), r3(t - pt + crack + 0.9)] : [r3(t - pt + 0.45)]
  star(x, 104, 196, 150, t, { color: CAN.color, glyph: CAN.glyph, mood: lol ? 'happy' : pt > 1.0 ? 'wide' : 'neutral', look: lol ? undefined : [1, pt > 1.0 ? 0 : 1], seed: 3, glow: 0.9, hops }, { sweat: lol ? 0 : 2 })
  star(x, 336, 196, 150, t, { color: CAP.color, glyph: CAP.glyph, mood: lol ? 'happy' : 'wide', look: lol ? undefined : [-1, 0], seed: 8, glow: 0.9, hops }, { sweat: lol ? 0 : 2 })
  if (lol) {
    const k = clamp(prog(pt, crack + 0.1, crack + 0.4))
    heart(x, 220, 112 - 10 * Math.sin(t * 3), 6 * k)
    for (let i = 0; i < 3; i++) { const ph = ((pt - crack) * 0.5 + i / 3) % 1; heart(x, 160 + i * 60, 260 - ph * 220, 2.5, { alpha: Math.sin(Math.PI * ph) * k }) }
  }
  void sparkles; void PINK; void CREAM; void MONO; void GOLD
}

const EP = makePack({
  caption: 'First date nerves | *starter pack*', captionAccent: '#ff9fc4',
  items: [
    { label: '3 outfit changes', tint: '#3a2a64', draw: outfits },
    { label: 'a practice laugh (take 6)', tint: '#23406a', draw: laugh },
    { label: 'a pep talk from Aries', tint: '#5a2440', draw: pep },
  ],
  twist: { label: '…the date, also nervous', tint: '#4a2a5a', draw: date, payoff },
  lines: [
    { text: 'every first date comes with *this* pack.' },
    { text: 'and the *rare* item…' },
  ],
  payoffLine: { speaker: `${CAP.glyph}︎ THE DATE`, color: '#c9b8ff', text: 'wait… you practiced the *laugh* too?' },
  last: 'Nervous *together*.', lastAccent: '#ff8fb1',
  cues: T => [
    // shirts flying
    ...Array.from({ length: 7 }, (_, i) => ['pop', r3(T.items[0] + 0.2 + i * 0.42 + 0.3), [659.25, 739.99, 830.61, 987.77][i % 4], 0.022, 0.3]),
    // practice laughs
    ...Array.from({ length: 6 }, (_, i) => ['pop', r3(T.items[1] + 0.02 + i * 0.6), [987.77, 830.61, 1108.73, 1318.51, 493.88, 987.77][i], 0.03, -0.3]),
    // megaphone blasts
    ['whoosh', r3(T.items[2] + 0.2), 0.6, 0.04], ['pluck', r3(T.items[2] + 0.25), 659.25, 0.04, 0.3, -0.3], ['pluck', r3(T.items[2] + 0.4), 830.61, 0.04, 0.3, -0.3], ['pluck', r3(T.items[2] + 0.55), 987.77, 0.045, 0.4, -0.3],
    // hi! HI!
    ['pop', r3(T.twist + 0.35), 987.77, 0.035, -0.3], ['pop', r3(T.twist + 1.05), 1318.51, 0.035, 0.3], ['pop', r3(T.twist + 1.75), 987.77, 0.03, -0.3],
    // they crack up
    ['pop', r3(T.last - 0.15), 1318.51, 0.035, -0.2], ['pop', r3(T.last + 0.05), 1567.98, 0.035, 0.2], ['bell', r3(T.last - 0.05), 1760, 0.025, 1.0, 0],
  ],
})
void INK; void BONE

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const TIMES = EP.T
