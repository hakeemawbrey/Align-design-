// nsage10: SAG SEASON TAKEOVER, ep 10, "Sag's Mystery Match" (25 s vertical, music: synthwave · F#m). promo/films/next30/b10.md.
// Story 0–20.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Sag flipped a | *blind mystery card.*"  Frame 0: Sag mid-flip of a glowing face-down card.
//   2.6–7.1    "The match: | a *homebody.*"  Cancer pops out in slippers. CANCER: "I like staying in."  Sag freezes.
//   7.1–11.6   "The *standoff.*"  CANCER: "I like cozy."  SAG: "…I like adventure."  A tumbleweed rolls by.
//  11.6        card cut.
//  11.6–16.1   "The *adventure:*"  A blanket fort with the night sky projected on its ceiling. Sag is amazed.
//  16.1–20.6   SAG: "Turns out *home* is a trip."  Pisces fountains.
import { makeTakeover, R, box, floor, shadow, glow, sparkles, hearts, cardImg, drawPixelStar, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD } from '../../nsage01/scenes/takekit.js'

// a card that flips (scaleX through 0): face-down back → reveal glow
function flipCard(x, img, cx, cy, w, flip, rot = 0) {
  if (!img) return
  const sx = Math.cos(Math.PI * flip)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(Math.max(0.02, Math.abs(sx)), 1)
  const h = w * img.height / img.width
  if (sx >= 0) x.drawImage(img, -w / 2, -h / 2, w, h)
  else { box(x, -w / 2, -h / 2, w, h, '#fff1c8', { b: 8 }); glow(x, 0, 0, w, 0.5, '255,240,200') }
  x.restore()
}
const WEED = ['..TTTT..', '.T.TT.T.', 'T.T..T.T', 'TT.TT.TT', 'T.T..T.T', '.T.TT.T.', '..TTTT..']
function weed(x, cx, cy, a) {
  x.save(); x.translate(cx, cy); x.rotate(a)
  for (let j = 0; j < WEED.length; j++) for (let i = 0; i < 8; i++) if (WEED[j][i] === 'T') { R(x, INK, -32 + i * 8 - 1, -28 + j * 8 - 1, 10, 10); R(x, '#b08a5a', -32 + i * 8, -28 + j * 8, 8, 8) }
  x.restore()
}
// the blanket fort, with a projected night sky on the inside
function fort(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 1240); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-430, 8); x.lineTo(-300, -520); x.lineTo(300, -520); x.lineTo(430, 8); x.closePath(); x.fill()
  x.fillStyle = '#ff8fb1'; x.beginPath(); x.moveTo(-412, 0); x.lineTo(-290, -506); x.lineTo(290, -506); x.lineTo(412, 0); x.closePath(); x.fill()
  x.fillStyle = '#140f30'; x.beginPath(); x.moveTo(-340, 0); x.lineTo(-250, -440); x.lineTo(250, -440); x.lineTo(340, 0); x.closePath(); x.fill()
  for (let i = 0; i < 26; i++) { const sx = ((i * 97) % 480) - 240, sy = -420 + ((i * 53) % 260); if (Math.sin(t * 3 + i) > -0.4) drawPixelStar(x, sx, sy, 10 + (i % 3) * 6, 1, i % 4 ? BONE : GOLD) }
  // a little moon + the projector beam
  x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(160,190,255,0.08)'; x.beginPath(); x.moveTo(-40, -40); x.lineTo(-240, -440); x.lineTo(240, -440); x.closePath(); x.fill(); x.restore()
  box(x, -60, -60, 120, 60, '#3a3550', { b: 5 }); R(x, '#bfe8ff', -20, -50, 40, 30)
  x.restore()
}

const EP = makeTakeover({
  id: 'nsage10', host: 'sag', duration: 25, dy: 120,
  images: ['card-back.png'],
  hook: {
    text: 'Sag flipped a | *blind mystery card.*', dur: 2.6,
    draw(x, t, S) {
      floor(x, 1260)
      glow(x, 640, 860, 460, 0.25, '200,160,255')
      shadow(x, 330, 1255, 230)
      S.host(x, t, { x: 330, y: 1080, s: 270, mood: 'sparkle', look: [1, -0.5], hops: [0.5, 1.4] })
      flipCard(x, S.img['card-back.png'], 680, 820, 280, clamp(0.25 + t * 0.12), 0.08)
      sparkles(x, t, 680, 820, 0.05, 10, 220, 1, [GOLD, BONE, '#c58bff'])
    },
    cues: [['whoosh', 0, 0.5, 0.04], ['glitter', 0, 0.8]],
  },
  beats: [
    { dur: 4.5, head: 'The match: | a *homebody.*', accent: '#bfe3ff',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260)
        if (u < 0.9) flipCard(x, S.img['card-back.png'], 680, 820, 280 * (1 - prog(u, 0.6, 0.9)), clamp(0.4 + u * 1.5), 0.08)
        sparkles(x, t, 680, 820, S.t0 + 0.6, 12, 200, 1)
        const ck = pop01(t, S.t0 + 0.6, 0.4, 2.4)
        shadow(x, 720, 1255, 240 * ck)
        S.star(x, t, 'cancer', { x: 720, y: 1090, s: 250, pop: ck, mood: 'happy', look: [-1, 0], hops: [S.t0 + 1.2, S.t0 + 1.6] })
        // slippers
        if (ck > 0.5) { box(x, 640, 1235, 60, 22, '#ff8fb1', { b: 5 }); box(x, 740, 1235, 60, 22, '#ff8fb1', { b: 5 }) }
        shadow(x, 300, 1255, 220)
        S.host(x, t, { x: 300, y: 1080, s: 250, mood: u < 2.0 ? 'sparkle' : 'wide', look: [1, 0], bob: u > 2.0 ? 0 : undefined, squash: u > 2.0 && u < 2.3 ? -0.12 : 0, hops: [S.t0 + 2.0] })
      },
      says: [{ at: 1.2, text: 'I like staying in.', x: 720, y: 860, who: 'cancer', tail: 0 }],
      pis: { x: 950, y: 1690, s: 120 },
      cues: [['whoosh', 0.1, 0.4, 0.03], ['bell', 0.6, 1760, 0.03, 1.0, 0.3], ['tick', 2.0, 0.07], ['pluck', 2.05, 440, 0.04, 0.6, -0.3]],
    },
    { dur: 4.5, head: 'The *standoff.*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260, '#3a2a30', '#4a3640')
        glow(x, 540, 1000, 600, 0.12, '255,170,110')
        shadow(x, 220, 1255, 220); shadow(x, 860, 1255, 220)
        S.host(x, t, { x: 220, y: 1080, s: 240, mood: 'squint', look: [1, 0], hops: [S.t0 + 2.1, S.t0 + 2.5] })
        S.star(x, t, 'cancer', { x: 860, y: 1080, s: 240, mood: 'squint', look: [-1, 0], hops: [S.t0 + 0.5] })
        const wp = prog(u, 0.2, 4.2)
        if (wp > 0 && wp < 1) weed(x, lerp(1150, -100, wp), 1220 - 30 * Math.abs(Math.sin(wp * 18)), -wp * 20)
      },
      says: [
        { at: 0.5, text: 'I like cozy.', x: 820, y: 860, who: 'cancer', tail: 0.2 },
        { at: 2.1, text: '…I like adventure.', x: 280, y: 720, who: 'host', tail: -0.2 },
      ],
      pis: { x: 540, y: 1690, s: 120, look: [0, -1] },
      cues: [['whoosh', 0.2, 1.2, 0.02], ['pluck', 1.6, 330, 0.03, 1.0, 0], ['whoosh', 2.4, 1.2, 0.02]],
    },
    { dur: 4.5, head: 'The *adventure:*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260)
        fort(x, t, pop01(t, S.t0 + 0.2, 0.45, 1.8))
        S.host(x, t, { x: 420, y: 1110, s: 210, mood: u < 1.0 ? 'wide' : 'sparkle', look: [0, -1], hops: [S.t0 + 1.0, S.t0 + 1.4, S.t0 + 1.8] })
        S.star(x, t, 'cancer', { x: 660, y: 1120, s: 200, mood: 'happy', look: [-1, 0], hops: [S.t0 + 2.2] })
        sparkles(x, t, 540, 900, S.t0 + 1.0, 12, 260, 2)
      },
      says: [{ at: 1.9, text: 'wait. this is incredible.', x: 420, y: 520, who: 'host', tail: 0 }],
      pis: { x: 950, y: 1690, s: 130, tears: 3 },
      cues: [['whoosh', 0.2, 0.4, 0.04], ['bell', 1.0, 1760, 0.035, 1.4, 0], ['glitter', 1.0, 1.8]],
    },
  ],
  last: { who: 'host', text: 'Turns out *home* is a trip.' },
  finale(x, t, S) {
    const { ok } = S
    x.save(); x.translate(540, 1000); x.scale(0.75 * ok, 0.75 * ok); x.translate(-540, -1000)
    fort(x, t, 1)
    S.host(x, t, { x: 430, y: 1110, s: 210, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
    S.star(x, t, 'cancer', { x: 660, y: 1120, s: 200, mood: 'heart', look: [-1, 0] })
    x.restore()
    hearts(x, t, S.t0 + 1.0, 540, 700, { n: 5 })
  },
  finalePis: { x: 930, y: 1300, s: 140 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [cardImg, ease]
