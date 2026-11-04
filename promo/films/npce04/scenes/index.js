// npce04: PISCES CRIES ABOUT… "“take your time.”" (14 s vertical trial reel, promo/films/next30/b48.md,
// music: jazzy · Bb). Story 0–9.6, then the shared end card. The format lives in ../../npce01/scenes/criekit.js.
//   0.0       hook: a big phone; "how was your week?" from them; Pisces is typing a long reply… and deleting it.
//   0.0–2.5   type, delete, type again (the draft box), sniffle.
//   2.55      their reply lands: "no rush." → 2.95 "take your time."  Sticker (2.75) "they meant it *kindly.*"  4.3 fountains.
//   5.6       card cut. THE STARS: "Patience is a love language too."
import { makeCry, box, R, shadow, glow, phone, chat, dots, sparkles, pop01, prog, ease, INK, BONE, GOLD, PINK, INTER, MONO } from '../../npce01/scenes/criekit.js'

const D1 = 'ok so funny story, my week was', D2 = 'honestly? it was a lot and i'
function draft(t) {
  const u = t + 0.55
  if (u < 1.35) return D1.slice(0, Math.floor(u / 1.35 * D1.length))
  if (u < 1.95) return D1.slice(0, Math.max(0, Math.floor(D1.length * (1 - (u - 1.35) / 0.6))))
  if (u < 3.0) return D2.slice(0, Math.floor((u - 1.95) / 1.05 * D2.length))
  return D2
}
function screen(x, t, S, fin = 0) {
  const sc = phone(x, 600, 830, { w: 520, h: 860 })
  x.font = `700 26px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.textAlign = 'center'; x.fillText('♑ CAPRICORN', 600, sc.y + 36)
  R(x, 'rgba(239,230,214,0.15)', sc.x, sc.y + 60, sc.w, 3)
  chat(x, t, -1, 'how was your week?', sc.x + 10, sc.y + 90, sc.w - 20, { size: 30 })
  if (!fin && t < 2.55) dots(x, t, sc.x + 10, sc.y + 190, { me: true, W: sc.w - 20 })
  chat(x, t, fin ? -1 : 2.55, 'no rush.', sc.x + 10, sc.y + 190, sc.w - 20, { size: 34, col: '#ffe08a' })
  chat(x, t, fin ? -1 : 2.95, 'take your time.', sc.x + 10, sc.y + 270, sc.w - 20, { size: 34, col: '#ffe08a' })
  // the draft box
  const dy = sc.y + sc.h - 150
  box(x, sc.x + 14, dy, sc.w - 28, 120, '#241c40', { b: 4 })
  x.save(); x.beginPath(); x.rect(sc.x + 20, dy, sc.w - 40, 120); x.clip()
  x.font = `700 28px ${INTER}`; x.textAlign = 'left'; x.fillStyle = BONE
  const d = fin ? D2 : draft(t), half = d.length > 17 ? d.lastIndexOf(' ', 18) : -1
  const l1 = half > 0 ? d.slice(0, half) : d, l2 = half > 0 ? d.slice(half + 1) : ''
  x.fillText(l1, sc.x + 30, dy + 42); x.fillText(l2, sc.x + 30, dy + 84)
  if (Math.floor(t * 3) % 2 === 0) { const w = x.measureText(l2 || l1).width; R(x, '#7fd0ff', sc.x + 32 + w, dy + (l2 ? 64 : 22), 4, 30) }
  x.restore()
  void S
}

const EP = makeCry({
  id: 'npce04', topic: '“take your time”', accent: '#ffe08a', deep: '#a8741a',
  sticker: 'they meant it *kindly.*', peak: 4.3,
  tissues: [0.85, 1.5, 2.6, 3.0, 4.3, 4.55, 4.8],
  scene(x, t, S) {
    glow(x, 600, 830, 560, 0.4, '190,220,255')
    screen(x, t, S)
    sparkles(x, t, 700, 560, 2.95, 8, 200, 0.5, [GOLD, BONE, PINK])
    shadow(x, 220, 1300, 220)
    S.pis(x, t, { x: 210, y: 1130, s: 250, mood: t < 2.55 ? 'wide' : 'sparkle', look: [1, -0.6], hops: [0.85, 1.5, 2.6, 3.0, 4.32, 4.7] })
  },
  finaleBack(x, t, { ok }) { x.save(); x.globalAlpha = 0.35 * ok; x.translate(540, 600); x.scale(0.6, 0.6); x.translate(-600, -830); screen(x, t, null, 1); x.restore() },
  last: 'Patience is a love language too.',
  cues: [...[0.1, 0.3, 0.5, 0.7, 1.9, 2.1, 2.3].map(c => ['tick', c, 0.025]), ['pop', 2.57, 1318.51, 0.04, 0.2], ['pop', 2.97, 1567.98, 0.04, 0.2]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
