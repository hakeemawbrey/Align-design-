// sxdebatetext (30 s vertical, Star Talk Shows · TWO STARS DISAGREE · EP 1) "Text first, or wait?" · synthwave Fm.
// The shared debate set lives in ./debate.js (also used by sxdebatebill and sxdebatephone): split screen, two podiums,
// the gong, the star audience with Pisces crying in it, the show bug. Story 0–25.6, then the end card (default CTA).
//   hook   "Text first, | or *wait?*"  ♈ ARIES (TEXT NOW) vs ♑ CAPRICORN (WAIT 48H). GONG.
//   v1     ARIES: "text NOW. feelings *expire.*" (a phone fires off sent bubbles) · CAPRICORN: "wait 48 hours. it's
//          *strategy.*" (an hourglass + a 47:59:59 countdown)
//   v2     "It's getting | *heated.*"  ARIES: "48 HOURS?? i'll *combust.*" (pixel flames on its tips) · CAPRICORN:
//          "i made a *spreadsheet.*" (it unrolls over the podium, down to the floor: THU 7:42 PM → TEXT)
//   v3     card cut → "Final | *round.*"  ARIES: "already sent it. *twice.*" (smug; ✓✓ read) · CAPRICORN: "…fine. my draft's
//          from *may.*" (its own dusty phone, a cobweb, "hey :)" never sent). Pisces sobs.
//   turn   BIG GONG. "The stars | *interrupt.*"  THE STARS: "you're *both* right. say your pace *out loud.*"
//   end    they turn to each other, bump, a heart. "Just *text.* | Respectfully."  + "Which side are *you* on?"
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDebate, DURATION, GOLD, BONE, INK, MONO, INTER, POS, STAR_Y, POD } from './debate.js'

export { DURATION }
export const KEY = 'Fm'
const FLAME = ['..f..', '.fFf.', '.fFf.', 'fFYFf', 'fFYFf', '.fff.']
const HOURGLASS = ['WWWWWWW', '.gSSSg.', '..gSg..', '...g...', '..gsg..', '.gsSsg.', 'WWWWWWW']
const COBWEB = ['w...w', '.w.w.', '..w..', '.w.w.', 'w...w']

const cfg = {
  id: 'sxdebatetext', ep: 1, key: KEY,
  signs: [{ id: 'aries', name: 'ARIES', stance: 'TEXT NOW' }, { id: 'capricorn', name: 'CAPRICORN', stance: 'WAIT 48H' }],
  heads: {
    hook: 'Text first, | or *wait?*',
    r2: 'It’s getting | *heated.*',
    r3: 'Final | *round.*',
    stars: 'The stars | *interrupt.*',
    last: 'Just *text.* | Respectfully.',
  },
  lines: [
    { who: 0, text: 'text NOW. feelings *expire.*', moods: ['squint', 'eyeroll'] },
    { who: 1, text: 'wait 48 hours. it’s *strategy.*', moods: ['squint', 'wide'] },
    { who: 0, text: '48 HOURS?? i’ll *combust.*', moods: ['wide', 'eyeroll'] },
    { who: 1, text: 'i made a *spreadsheet.*', moods: ['happy', 'wide'] },
    { who: 0, text: 'already sent it. *twice.*', moods: ['happy', 'wide'] },
    { who: 1, text: '…fine. my draft’s from *may.*', moods: ['squint', 'wide'] },
  ],
  star: 'you’re *both* right. say your pace *out loud.*',
  props(x, t, H) {
    const { L, T, times, px, bits, txt, phone, bubble, pop01, ok } = H
    const until = (i, end) => pop01(t, L[i].t - 0.05, 0.3, 2) * (1 - ease.inQuad(prog(t, end - 0.25, end))) * ok
    // v1 + v3: Aries' phone, firing off texts
    const ka = Math.max(until(0, L[1].t + 0.6), until(4, T.stars))
    if (ka > 0.01) {
      const v3 = t >= L[4].t - 0.05
      phone(108, 930, 116, { k: ka, rot: -0.1 + 0.03 * Math.sin(t * 20) * (t < times[v3 ? 4 : 0].done ? 1 : 0), draw: (sl, st, sw, sh) => {
        const msgs = v3 ? [['hey', 0], ['HEY!!', 0.35]] : [['hey', 0], ['u up', 0.25], ['HELLO??', 0.5]]
        const t0 = L[v3 ? 4 : 0].t
        let y = st + 8
        for (const [m, d] of msgs) { if (t < t0 + 0.2 + d) break; y += bubble(m, sl + sw - 4, y, sw - 8, { size: 17, color: '#e8553a' }) + 8 }
        if (v3 && t > t0 + 0.9) txt('✓✓ read', sl + sw / 2, st + sh - 18, { size: 16, color: '#7dffb0', shadow: false })
      } })
    }
    // v1: Capricorn's hourglass + countdown
    const kh = until(1, L[2].t + 0.3)
    if (kh > 0.01) {
      const flip = ease.inOutCubic(prog(t, L[1].t + 0.1, L[1].t + 0.5)) * Math.PI
      bits(HOURGLASS, { W: '#c08a4f', g: '#bfe6ff', S: '#f2c75c', s: '#e0a43c' }, 968, 900, 14, { rot: flip + Math.PI, sx: kh, sy: kh })
      const secs = Math.max(0, 59 - Math.floor((t - L[1].t) * 3))
      txt(`47:59:${String(secs).padStart(2, '0')}`, 966, 1020, { size: 26, color: GOLD, alpha: kh })
    }
    // v2: Aries combusts (pixel flames on its tips)
    const kf = until(2, L[4].t - 0.1)
    if (kf > 0.01) {
      const r = H.pos[0]
      ;[[0, -1.02], [-0.8, -0.3], [0.8, -0.3]].forEach(([u, v], n) => {
        const fl = 1 + 0.18 * Math.sin(t * 26 + n * 2)
        bits(FLAME, { f: '#ff5a2a', F: '#ffb340', Y: '#fff1a0' }, r.x + u * r.size * 0.42, r.y + v * r.size * 0.46 - 20, 7, { sx: kf, sy: kf * fl })
      })
    }
    // v2: the spreadsheet unrolls over Capricorn's podium, down to the floor
    const ks = until(3, T.stars + 0.2)
    if (ks > 0.01) {
      const cx = POS[1].x, top = 960
      const len = lerp(0, 410, ease.outCubic(prog(t, L[3].t + 0.15, L[3].t + 0.75))) * (t > T.stars - 0.1 ? 1 - ease.inCubic(prog(t, T.stars - 0.1, T.stars + 0.15)) : 1)
      x.save(); x.globalAlpha = ok
      px(cx - 118, top - 6, 236, len + 12, INK); px(cx - 112, top, 224, len, '#f6f1e2')
      const rows = [['MON', 'wait'], ['TUE', 'wait'], ['WED', 'wait'], ['THU 7:42 PM', 'TEXT']]
      x.save(); x.beginPath(); x.rect(cx - 112, top, 224, len); x.clip()
      for (let j = 0; j < 9; j++) px(cx - 112, top + 40 + j * 44, 224, 2, '#c9c2e6')
      px(cx - 30, top, 2, 410, '#c9c2e6')
      txt('PLAN.XLS', cx, top + 20, { size: 16, color: '#3a2a5c', shadow: false })
      rows.forEach(([d, a], j) => {
        const yy = top + 62 + j * 88, last = j === 3
        if (last) px(cx - 110, yy - 22, 220, 44, '#7dffb0')
        txt(d, cx - 104, yy, { size: last ? 14 : 16, color: '#3a2a5c', align: 'left', shadow: false })
        txt(a, cx + 100, yy, { size: 16, color: last ? '#1b6a3a' : '#9a8fb8', align: 'right', shadow: false })
      })
      x.restore()
      // the roll at the bottom
      px(cx - 124, top + len - 10, 248, 22, INK); px(cx - 118, top + len - 6, 236, 14, '#e2dac2')
      x.restore()
    }
    // v3: Capricorn's own phone — the draft from may
    const kc = until(5, T.stars + 0.1)
    if (kc > 0.01) {
      phone(972, 930, 116, { k: kc, rot: 0.1, body: '#3d3654', draw: (sl, st, sw, sh) => {
        txt('DRAFTS', sl + sw / 2, st + 18, { size: 16, color: '#9a96b0', shadow: false })
        bubble('hey :)', sl + sw - 4, st + 40, sw - 8, { size: 17, color: '#5a5470' })
        txt('saved · may', sl + sw / 2, st + 104, { size: 14, color: '#9a96b0', shadow: false })
      } })
      bits(COBWEB, { w: '#dcd6ee' }, 940, 832, 6, { outline: null, alpha: kc * 0.9 })
      const dust = (t * 0.8) % 1
      px(1000 + dust * 20, 820 - dust * 40, 5, 5, `rgba(220,214,238,${(1 - dust) * kc})`)
    }
  },
  sobAt: [],
  cues(T, times) {
    return []
  },
}
// Pisces sobs hardest at the draft from may (the saddest thing said tonight)
const deb0 = makeDebate(cfg)
cfg.sobAt = [deb0.L[5].t + 0.6]
const SEND = (t0, n, gap) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + 0.2 + i * gap).toFixed(3), 1318.51 + i * 120, 0.03, -0.3])
cfg.cues = (T) => {
  const L = deb0.L
  return [
    ...SEND(L[0].t, 3, 0.25), ['whoosh', L[0].t + 0.2, 0.2, 0.02],
    ['whoosh', L[1].t + 0.1, 0.4, 0.03], ...[0, 1, 2, 3].map(i => ['tick', +(L[1].t + 0.6 + i * 0.333).toFixed(3), 0.03]),
    ['snare', L[2].t + 0.05, { gain: 0.06, decay: 0.3, tone: 140 }], ['whoosh', L[2].t + 0.05, 0.5, 0.04],
    ['whoosh', L[3].t + 0.15, 0.6, 0.05], ['tom', L[3].t + 0.75, 90, { gain: 0.2 }],
    ...SEND(L[4].t, 2, 0.35), ['pluck', L[4].t + 0.9, 1567.98, 0.03, 0.4, -0.3],
    ['bell', L[5].t + 0.3, 587.33, 0.02, 1.2, 0.3], ['tick', L[5].t + 0.6, 0.02],
  ]
}
const deb = makeDebate(cfg)
export const T = deb.T
export const SCENES = deb.SCENES
export const CUES = deb.CUES
export const CUTS = deb.CUTS
