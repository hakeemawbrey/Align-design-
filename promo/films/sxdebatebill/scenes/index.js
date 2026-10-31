// sxdebatebill (30 s vertical, Star Talk Shows · TWO STARS DISAGREE · EP 2) "Split it, or I've got this?" · jazzy G.
// Same set as EP 1 (the shared debate look lives in ../../sxdebatetext/scenes/debate.js). Story 0–25.6, then the end card.
//   hook   "Split it, or | I've got *this?*"  ♌ LEO (I'VE GOT IT, tiny crown) vs ♍ VIRGO (SPLIT IT). GONG.
//   v1     LEO: "put it away. i'm *treating* you." (a gold card held up, sparkling) · VIRGO: "you had *two* breadsticks."
//          (a calculator: 2 × BREADSTICK)
//   v2     "Getting | *expensive.*"  LEO: "paying IS my *love language.*" (gold confetti, hearts) · VIRGO: "i *itemized* your
//          love language." (a receipt unrolls over the podium: COMPLIMENTS ×7 … LOVE LANGUAGE … TOTAL: ASK)
//   v3     card cut → "Final | *round.*"  LEO: "…i left my wallet in the *car.*" (sweating; the gold card is a library
//          card) · VIRGO: "then i've got this. *you* get next." (the calculator reads NEXT: LEO). Pisces sobs, touched.
//   turn   BIG GONG. "The stars | *interrupt.*"  THE STARS: "you're *both* right. just *talk* before the bill."
//   end    they bump, a heart. "Whoever's paying, | *ask.*"  + "Which side are *you* on?"
import { prog, ease, lerp } from '../../../src/lib.js'
import { makeDebate, DURATION, GOLD, INK, POS } from '../../sxdebatetext/scenes/debate.js'
import { drawPixelStar } from '../../sky.js'

export { DURATION }
export const KEY = 'G'
const CROWN = ['g.g.g', 'gGgGg', 'ggggg']
const CALC = ['KKKKKKK', 'KSSSSSK', 'KSSSSSK', 'KKKKKKK', 'KbKbKbK', 'KKKKKKK', 'KbKbKoK', 'KKKKKKK', 'KbKbKoK', 'KKKKKKK']
const SWEAT = ['.s.', 'sSs', 'sSs', '.s.']

const cfg = {
  id: 'sxdebatebill', ep: 2, key: KEY, accent: '#ffd36a',
  signs: [{ id: 'leo', name: 'LEO', stance: 'I’VE GOT IT' }, { id: 'virgo', name: 'VIRGO', stance: 'SPLIT IT' }],
  heads: {
    hook: 'Split it, or | I’ve got *this?*',
    r2: 'Getting | *expensive.*',
    r3: 'Final | *round.*',
    stars: 'The stars | *interrupt.*',
    last: 'Whoever’s paying, | *ask.*',
  },
  lines: [
    { who: 0, text: 'put it away. i’m *treating* you.', moods: ['happy', 'squint'] },
    { who: 1, text: 'you had *two* breadsticks.', moods: ['squint', 'wide'] },
    { who: 0, text: 'paying IS my *love language.*', moods: ['sparkle', 'eyeroll'] },
    { who: 1, text: 'i *itemized* your love language.', moods: ['happy', 'wide'] },
    { who: 0, text: '…i left my wallet in the *car.*', moods: ['wide', 'wide'] },
    { who: 1, text: 'then i’ve got this. *you* get next.', moods: ['happy', 'sparkle'] },
  ],
  star: 'you’re *both* right. just *talk* before the bill.',
  props(x, t, H) {
    const { L, T, px, bits, txt, pop01, ok } = H
    const until = (i, end) => pop01(t, L[i].t - 0.05, 0.3, 2) * (1 - ease.inQuad(prog(t, end - 0.25, end))) * ok
    const leo = H.pos[0], vir = H.pos[1]
    // Leo's tiny crown, all episode
    if (leo && leo.size) bits(CROWN, { g: '#f7c948', G: '#ff6a8a' }, leo.x, leo.top - 4, Math.round(leo.size / 30), { alpha: ok })
    // v1 → v3: the gold card, held high (flips to LIBRARY CARD at the wallet confession)
    const kg = until(0, T.stars)
    if (kg > 0.01) {
      const lib = t > L[4].t + 0.5
      const flip = Math.abs(Math.cos(Math.PI * prog(t, L[4].t + 0.25, L[4].t + 0.75)))
      const cx = 104, cy = 900 - (lib ? 0 : 10 * Math.sin(t * 3))
      x.save(); x.translate(cx, cy); x.rotate(-0.12); x.scale(kg * flip, kg)
      px(-66, -42, 132, 84, INK); px(-60, -36, 120, 72, lib ? '#7fb0e0' : '#f2c75c')
      px(-60, -36, 120, 8, lib ? '#a8cff0' : '#ffe9a0'); px(-46, -14, 24, 18, lib ? '#e8eef8' : '#c98a1f')
      x.restore()
      if (flip > 0.4) txt(lib ? 'LIBRARY' : 'GOLD', cx, cy + 22, { size: 18, color: INK, shadow: false, alpha: kg })
      if (!lib) drawPixelStar(x, cx + 50 + 8 * Math.sin(t * 5), cy - 46, 22, 1, '#fff1c8', '#ffffff')
    }
    // v1 + v3: Virgo's calculator
    const kc = Math.max(until(1, L[2].t + 0.3), until(5, T.stars + 0.1))
    if (kc > 0.01) {
      const v3 = t >= L[5].t - 0.05
      bits(CALC, { K: '#3a3456', S: '#bfe8b0', b: '#efe6d6', o: '#e9b24a' }, 978, 920, 18, { sx: kc, sy: kc, rot: 0.06 })
      txt(v3 ? 'NEXT:' : '2 ×', 978, 884, { size: 20, color: '#1b3a1b', shadow: false, alpha: kc })
      txt(v3 ? 'LEO' : 'BREAD', 978, 906, { size: 20, color: '#1b3a1b', shadow: false, alpha: kc })
    }
    // v2: love language — gold confetti + hearts around Leo
    const kl = until(2, L[3].t + 0.4)
    if (kl > 0.01 && leo) {
      for (let i = 0; i < 18; i++) {
        const ph = (t * 0.7 + i / 18) % 1, ang = i * 2.4
        px(leo.x + Math.cos(ang) * (90 + ph * 60), leo.y - 160 + ph * 260, 10, 14, ['#f7c948', '#ff8fb1', '#fff1c8'][i % 3])
      }
    }
    // v2: the itemized receipt unrolls over Virgo's podium
    const kr = until(3, T.stars + 0.2)
    if (kr > 0.01) {
      const cx = POS[1].x, top = 960
      const len = lerp(0, 420, ease.outCubic(prog(t, L[3].t + 0.15, L[3].t + 0.8))) * (t > T.stars - 0.1 ? 1 - ease.inCubic(prog(t, T.stars - 0.1, T.stars + 0.15)) : 1)
      x.save(); x.globalAlpha = ok
      px(cx - 112, top - 6, 224, len + 12, INK); px(cx - 106, top, 212, len, '#fbf7ec')
      x.save(); x.beginPath(); x.rect(cx - 106, top, 212, len); x.clip()
      const rows = [['BREADSTICK ×2', '4.00'], ['PASTA', '14.00'], ['COMPLIMENTS ×7', 'FREE'], ['“I’M TREATING”', '—'], ['LOVE LANGUAGE', '???']]
      txt('RECEIPT', cx, top + 22, { size: 18, color: '#3a2a5c', shadow: false })
      rows.forEach(([a, b], j) => {
        const yy = top + 62 + j * 56
        txt(a, cx - 96, yy, { size: 15, color: '#3a2a5c', align: 'left', shadow: false })
        txt(b, cx + 96, yy, { size: 15, color: j === 4 ? '#c0306a' : '#3a2a5c', align: 'right', shadow: false })
      })
      for (let i = 0; i < 20; i++) px(cx - 100 + i * 10, top + 340, 6, 3, '#9a8fb8')
      txt('TOTAL: ASK', cx, top + 370, { size: 20, color: '#c0306a', shadow: false })
      x.restore()
      // zig-zag tear at the bottom
      for (let i = 0; i < 21; i++) px(cx - 106 + i * 10, top + len - (i % 2 ? 0 : 6), 10, 6, '#fbf7ec')
      x.restore()
    }
    // v3: Leo sweats
    const ks = until(4, L[5].t + 1.2)
    if (ks > 0.01 && leo) for (let i = 0; i < 3; i++) {
      const p = (t * 1.3 + i / 3) % 1
      bits(SWEAT, { s: '#8fd8ff', S: '#e8f8ff' }, leo.x + (i - 1) * 90, leo.y - 70 + p * 70, 6, { alpha: ks * (1 - p * 0.6) })
    }
  },
}
const deb0 = makeDebate(cfg)
cfg.sobAt = [deb0.L[5].t + 0.8]
cfg.cues = () => {
  const L = deb0.L
  return [
    ['glitter', L[0].t + 0.1, L[0].t + 0.6], ['pluck', L[0].t + 0.2, 1318.51, 0.03, 0.5, -0.4],
    ...[0, 1, 2, 3].map(i => ['tick', +(L[1].t + 0.2 + i * 0.12).toFixed(3), 0.035]), ['pop', L[1].t + 0.7, 1567.98, 0.03, 0.4],
    ['glitter', L[2].t + 0.05, L[2].t + 1.2], ['bell', L[2].t + 0.4, 1174.66, 0.025, 1.2, -0.3],
    ['whoosh', L[3].t + 0.15, 0.6, 0.05], ...[0, 1, 2, 3, 4].map(i => ['tick', +(L[3].t + 0.25 + i * 0.1).toFixed(3), 0.03]),
    ['whoosh', L[4].t + 0.25, 0.3, 0.03], ['pop', L[4].t + 0.5, 392, 0.03, -0.4],
    ...[0, 1, 2].map(i => ['tick', +(L[5].t + 0.2 + i * 0.12).toFixed(3), 0.035]), ['pluck', L[5].t + 1.0, 1174.66, 0.035, 0.6, 0.4],
  ]
}
const deb = makeDebate(cfg)
export const T = deb.T
export const SCENES = deb.SCENES
export const CUES = deb.CUES
export const CUTS = deb.CUTS
