// npce10: PISCES CRIES ABOUT… "saying no." (14 s vertical trial reel, promo/films/next30/b48.md, music: house · G).
// Story 0–9.6, then the shared end card. The format lives in ../../npce01/scenes/criekit.js.
//   0.0       hook: Pisces in a blanket on the couch; the phone: "party tonight?" → "can’t tonight, have fun!" (sent).
//   0.0–1.7   Pisces braces (wide eyes, trembling); typing dots…
//   1.75      the reply: "totally! rest up"   2.75 sticker "relief tears are *still* tears."  4.2 fountains, cocoa.
//   5.6       card cut. THE STARS: "A kind no is still a kind word."
import { makeCry, box, R, shadow, glow, phone, chat, dots, blanket, mug, sparkles, pop01, prog, ease, INK, BONE, GOLD, PINK, MONO } from '../../npce01/scenes/criekit.js'

function couch(x) {
  box(x, 40, 1020, 640, 120, '#5b4a8a', { b: 7, hi: '#6e5ca0' })
  box(x, 40, 880, 640, 150, '#4b3c78', { b: 7 })
  box(x, 10, 940, 70, 220, '#5b4a8a', { b: 7 }); box(x, 640, 940, 70, 220, '#5b4a8a', { b: 7 })
  R(x, INK, 70, 1160, 24, 40); R(x, INK, 630, 1160, 24, 40)
}
function screen(x, t, fin = 0) {
  const sc = phone(x, 830, 760, { w: 360, h: 620, rot: 0.04 })
  x.font = `700 22px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.textAlign = 'center'; x.fillText('♌ LEO', 830, sc.y + 30)
  chat(x, t, -1, 'party tonight?', sc.x + 4, sc.y + 60, sc.w - 8, { size: 26 })
  chat(x, t, -1, 'can’t tonight,', sc.x + 4, sc.y + 140, sc.w - 8, { size: 26, me: true })
  chat(x, t, -1, 'have fun!', sc.x + 4, sc.y + 200, sc.w - 8, { size: 26, me: true })
  if (!fin && t > 0.5 && t < 1.75) dots(x, t, sc.x + 4, sc.y + 280)
  chat(x, t, fin ? -1 : 1.75, 'totally!', sc.x + 4, sc.y + 280, sc.w - 8, { size: 30, col: '#ffe08a' })
  chat(x, t, fin ? -1 : 2.05, 'rest up', sc.x + 4, sc.y + 350, sc.w - 8, { size: 30, col: '#ffe08a' })
}

const EP = makeCry({
  id: 'npce10', topic: 'saying no', accent: '#ffb3c7', deep: '#b0306a',
  sticker: 'relief tears are *still* tears.', peak: 4.2,
  tissues: [1.8, 2.1, 2.9, 3.5, 4.2, 4.45, 4.7],
  scene(x, t, S) {
    glow(x, 400, 950, 560, 0.55)
    couch(x)
    const brace = t < 1.75 ? 1 : 0
    const shake = brace ? 4 * Math.sin(t * 50) : 0
    S.pis(x, t, { x: 360 + shake, y: 840, s: 270, mood: brace ? 'wide' : 'sparkle', look: [1, -0.4], hops: [1.8, 2.1, 4.22, 4.6] })
    blanket(x, 360 + shake, 985, 340)
    screen(x, t)
    sparkles(x, t, 830, 1030, 1.8, 10, 180, 0.4, [GOLD, BONE, PINK])
    if (t > 3.3) { const k = pop01(t, 3.3, 0.3, 2.4); x.save(); x.translate(560, 1060); x.scale(k, k); mug(x, t, 0, 0, 80); x.restore() }
  },
  last: 'A kind no is still a kind word.',
  cues: [['riser', 0.3, 1.4, 0.012], ['pop', 1.77, 1318.51, 0.045, 0.4], ['pop', 2.07, 1567.98, 0.04, 0.4], ['pop', 3.32, 987.77, 0.03, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
