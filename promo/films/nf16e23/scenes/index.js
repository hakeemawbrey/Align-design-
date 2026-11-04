// nf16e23: MEET THE FAMILY, "The Thank-You Text" (30 s vertical, star_advice post, music: chiptune · E).
// Story 0–25.6, then the shared end card. Series look: ../../nf16e13/famkit.js.
//   0.0–4.6    HOOK "How do I thank | their *parents?*"  ♒ Aquarius at the desk mid-type on a big phone, crumpled drafts
//              flying off. AQUARIUS: "ok. thank-you text. *easy.*"
//   4.6–10.6   "Draft one. Two. | *Three.*"  "thank u" (struck) · a whole essay (struck) · "10/10 would visit again" (struck).
//              ♉ TAURUS: "just say what you *loved.*"
//   10.6       card cut → NOTES: send it within a day · thank them by name · mention one real moment.
//   18.2–25.6  "Sent. | *Received.*"  The text goes: "Thank you, Rosa! Your soup recipe is going in my notebook." Taurus's mom
//              ♓ Pisces reads it and sobs: "*this* is going on the fridge." THE STARS: "Say thanks *by name.*"
import { makeFamily, hearts, sparkles, phone, R, box, prog, clamp, ease, lerp, BONE, GOLD, PINK, INK } from '../../nf16e13/famkit.js'

function paperBalls(x, t, t0, n = 5) {
  for (let i = 0; i < n; i++) {
    const p = (t - t0 - i * 0.7) / 1.2
    if (p < 0 || p > 1) continue
    const px = 640 + p * (300 + i * 30), py = 900 - Math.sin(Math.PI * p) * 260 + p * 200
    x.save(); x.translate(px, py); x.rotate(p * 8)
    R(x, INK, -20, -20, 40, 40); R(x, '#fffaf0', -16, -16, 32, 32); R(x, '#d8cfc0', -8, -10, 14, 8)
    x.restore()
  }
}
const D0 = 4.6
const DRAFTS = [
  { at: D0 + 0.3, side: 'R', text: 'thank u', strike: D0 + 1.1, gone: D0 + 1.5 },
  { at: D0 + 1.6, side: 'R', text: 'Dear Rosa, I want to begin by saying that from the moment I arrived…', strike: D0 + 2.8, gone: D0 + 3.2 },
  { at: D0 + 3.3, side: 'R', text: '10/10 would visit again', strike: D0 + 4.2, gone: D0 + 5.9 },
]
const EP = makeFamily({
  id: 'nf16e23', key: 'E',
  cast: {
    you: { sign: 'aquarius', role: 'AQUARIUS', acc: { scarf: '#ffd25a' }, text: '#bff0ff' },
    them: { sign: 'taurus', role: 'TAURUS', acc: { beanie: '#9fe6b0' }, text: '#d8ffd8' },
    mom: { sign: 'pisces', role: 'ROSA', text: '#cfe4ff' },
  },
  beats: [
    { len: 4.6, room: 'desk', roomOpts: { lamp: false }, head: 'How do I thank | their *parents?*',
      lines: [{ u: 0.5, who: 'you', text: 'ok. thank-you text. *easy.*' }],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 260, y: 1000, s: 210, mood: 'sparkle', look: [1, -0.3], squash: 0.03 * Math.sin(t * 18) })
        phone(x, t, 600, 820, 360, 520, { title: 'Rosa ♥', msgs: [], typing: [S.t0 - 1, S.t1], size: 28 })
        paperBalls(x, t, S.t0 - 1.2)
      } },
    { len: 6.0, room: 'desk', roomOpts: { lamp: false }, head: 'Draft one. Two. | *Three.*',
      lines: [{ u: 4.3, who: 'them', text: 'just say what you *loved.*' }],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'you', { x: 230, y: 1000, s: 200, mood: u > 4.0 ? 'wide' : 'squint', look: [1, -0.3] })
        phone(x, t, 600, 820, 380, 540, { title: 'Rosa ♥', msgs: DRAFTS.filter(m => !(m.gone && t > m.gone + 0.3)), size: 28 })
        paperBalls(x, t, S.t0 + 1.4, 3)
        S.cast(x, t, 'them', { x: 920, y: lerp(1300, 1060, ease.outBack(prog(u, 3.9, 4.3))), s: 170, mood: 'happy', look: [-1, -0.4] })
      },
      cues: [['pop', 0.3, 880, 0.03, 0.3], ['tick', 1.1, 0.05], ['pop', 1.6, 987.77, 0.03, 0.3], ['tick', 2.8, 0.05], ['pop', 3.3, 1174.66, 0.03, 0.3], ['tick', 4.2, 0.05], ['pop', 4.0, 1567.98, 0.03, -0.3]] },
    { len: 7.6, kind: 'notes',
      tips: ['Send it *within a day.*', 'Thank them *by name.*', 'Mention *one real moment.*'],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 3.0] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: 'happy', look: [-1, 0], hops: [S.t0 + 5.2] })
      } },
    { len: 7.4, room: 'desk', roomOpts: { lamp: false }, head: 'Sent. | *Received.*', pis: false,
      lines: [{ u: 2.0, who: 'mom', text: '*this* is going on the fridge.' }],
      lastU: 4.1, last: 'Say thanks *by name.*',
      draw(x, t, S) {
        const u = S.u, ok = S.out
        const msg = [{ at: S.t0 + 0.3, side: 'R', text: 'Thank you, Rosa! Your soup recipe is going in my notebook.' }]
        x.save(); x.globalAlpha *= clamp(ok)
        phone(x, t, 330, 800, 340, 500, { title: 'Rosa ♥', msgs: msg, size: 26 })
        x.restore()
        S.cast(x, t, 'you', { x: 150, y: 1000, s: 150, mood: u > 0.4 ? 'happy' : 'sparkle', look: [1, -1], pop: ok, hops: [S.t0 + 0.4] })
        // the other end: Rosa (♓) reads it on her own phone and sobs
        const rk = ease.outBack(prog(u, 0.9, 1.3)) * ok
        S.pisces(x, t, { x: 790, y: 1020, s: 220, mood: u > 1.6 ? 'happy' : 'wide', tears: u > 1.6 ? 3 : 1, pop: rk, look: [0, 1] })
        if (rk > 0.05) { box(x, 760, 1110, 70, 110, '#2a2148', { b: 5 }); R(x, '#4f7cd8', 768, 1122, 54, 30) }
        hearts(x, t, S.t0 + 1.6, 790, 860, { n: 6 })
        sparkles(x, t, 330, 760, S.t0 + 0.35, 10, 200, 1, [GOLD, PINK, BONE])
      },
      cues: [['whoosh', 0.3, 0.3, 0.035], ['pop', 0.35, 1318.51, 0.04, -0.3], ['pop', 1.0, 987.77, 0.035, 0.3], ['pluck', 1.6, 1174.66, 0.04, 0.5, 0.3], ['glitter', 1.6, 2.1]] },
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
