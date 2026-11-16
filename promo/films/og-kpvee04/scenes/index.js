// og-kpvee04: social rework of kpvee04. Static HOOK (box) 0–2.8 replaces the slam title; no whip zoom / screen shake;
// no series bug (kit copy); Venus a bit lower so her lines sit under the hook; Cancer, Pisces and their lines moved into
// the safe zone; crazier lines; the closing slam is now Venus's last line over the group hug.
// Was: kpvee04 · Planet Talk: Venus to Cancer — "The Wrong-Size Love" (26.4 s vertical, star_advice, hard cut). dreamy · Ab.
//   0.00  frame 0: Venus mid-swing on a crashing chandelier, crystals mid-air; Cancer on the floor scrolling an old chat.
//         Slam "CANCER. Close the *old* texts."  2.9 record scratch + freeze: "rereading the chat from someone who
//         stopped trying."
//   4.8   Venus kneels: "Love you have to beg for… is the wrong size, darling."  9.8 a tiny sweater (TOO SMALL) vs a big
//         cosy one (YOUR SIZE). "You deserve love that fits."  Cancer: "But I miss them." Venus: "Miss them. And choose you."
//  18.6   the chat is archived; Cancer texts the besties: "rough night. call?" → "come over. I have snacks."
//  21.8   Cancer and Pisces cry together (group hug).  24.6 slam "Love you beg for *doesn't fit.*" Hard cut.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { episode, panel, txt, heart, sparkleBurst, phone, pop01, outK, win, sobCues, INK, ROSE, CREAM, GOLD, BONE } from '../venuskit.js'

export const HOOK = 'Rereading their “k” | for the *40th time.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.8

const T = { rec: 2.9, sweat1: 9.8, sweat2: 11.0, archive: [18.6, 19.4], friend: 19.9, reply: 21.2, hug: 21.8, last: 24.6 }
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

function chandelier(x, t, V) {
  const swing = Math.sin(t * 2.2) * 0.06 * (1 - prog(t, 1, 4)) + Math.sin(t * 1.1) * 0.02
  const top = V.y - V.size * 0.5
  x.save(); x.translate(V.x, top); x.rotate(swing)
  x.strokeStyle = '#c9a24a'; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -top - 40); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -40, 190, 34, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e8c260'; x.beginPath(); x.ellipse(0, -42, 180, 26, 0, 0, Math.PI * 2); x.fill()
  for (let k = 0; k < 7; k++) {
    const cx = -150 + k * 50, cy = -70
    x.fillStyle = CREAM; x.fillRect(cx - 7, cy - 30, 14, 30)
    x.fillStyle = 'rgba(255,214,120,0.35)'; x.beginPath(); x.arc(cx, cy - 40, 22, 0, 7); x.fill()
    x.fillStyle = '#ffd27a'; x.beginPath(); x.ellipse(cx, cy - 40, 6, 11, 0, 0, 7); x.fill()
    // crystals
    x.fillStyle = 'rgba(200,235,255,0.85)'; x.strokeStyle = INK; x.lineWidth = 3
    x.beginPath(); x.moveTo(cx, -14); x.lineTo(cx + 9, 6); x.lineTo(cx, 28); x.lineTo(cx - 9, 6); x.closePath(); x.fill(); x.stroke()
  }
  x.restore()
  // crystals flying off on the crash (frame 0)
  const a = 1 - prog(t, 0.4, 1.6)
  if (a > 0) for (let k = 0; k < 12; k++) {
    const ph = clamp((t + 0.7) / 2.3)
    const px = V.x + (fr(k, 1) - 0.5) * 900 * ph, py = top - 60 + (fr(k, 2) * 0.6 + 0.2) * 1100 * ph * ph - 300 * ph * (1 - ph)
    x.save(); x.globalAlpha = a; x.translate(px, py); x.rotate(t * 6 + k)
    x.fillStyle = 'rgba(200,235,255,0.95)'; x.strokeStyle = INK; x.lineWidth = 3
    x.beginPath(); x.moveTo(0, -20); x.lineTo(12, 0); x.lineTo(0, 20); x.lineTo(-12, 0); x.closePath(); x.fill(); x.stroke()
    x.restore()
  }
}
function sweater(x, cx, cy, s, col, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s * k, s * k)
  const body = () => { x.beginPath(); x.moveTo(-60, -80); x.lineTo(-130, -40); x.lineTo(-110, 20); x.lineTo(-70, 0); x.lineTo(-70, 90); x.lineTo(70, 90); x.lineTo(70, 0); x.lineTo(110, 20); x.lineTo(130, -40); x.lineTo(60, -80); x.quadraticCurveTo(0, -50, -60, -80); x.closePath() }
  body(); x.lineWidth = 14; x.strokeStyle = INK; x.lineJoin = 'round'; x.stroke(); x.fillStyle = col; x.fill()
  x.fillStyle = 'rgba(255,255,255,0.35)'; for (let j = 0; j < 3; j++) x.fillRect(-70, 20 + j * 24, 140, 8)
  heart(x, 0, 6, 26, { color: CREAM })
  x.restore()
}

const OLD = [{ at: -3, side: 'R', text: 'how was your day?' }, { at: -2.5, side: 'R', text: 'I knitted you a scarf' }, { at: -2, side: 'L', text: 'k' }, { at: -1.5, side: 'R', text: 'are we still on for friday?' }]
const NEW = [{ at: T.friend, side: 'R', text: 'rough night. call?' }, { at: T.reply, side: 'L', text: 'come over. I have snacks.' }]

const EP = episode({
  sign: 'cancer', dur: 26.4, ending: 'cut',
  enter: { kind: 'slide', at: -0.42, x: 540, y: 720, size: 370 },
  venus: [
    { t: 0, x: 540, y: 720, size: 370, mood: 'wide', look: [0, 1] },
    { t: 1.5, mood: 'sad', look: [0, 1] },
    { t: 4.8, d: 0.6, x: 540, y: 820, size: 340, mood: 'sad', look: [0, 1] },
    { t: 9.8, mood: 'happy', look: [0, 0.5] },
    { t: 14.1, mood: 'sad', look: [0.2, 1] },
    { t: 16.2, mood: 'love' },
    { t: 21.8, mood: 'cry', tears: 1 },
    { t: 24.5, mood: 'love', tears: 0 },
  ],
  signK: [
    { t: 0, x: 640, y: 1400, size: 260, mood: 'sleepy', look: [-1, 0.5], tears: 1 },
    { t: 4.8, mood: 'wide', look: [0, -1] },
    { t: 9.8, mood: 'neutral', look: [0, -0.6] },
    { t: 14.0, mood: 'squint', look: [0, -1], tears: 2 },
    { t: 16.4, mood: 'neutral', tears: 1 },
    { t: 19.0, mood: 'happy', look: [-1, 0.2], tears: 0 },
    { t: 21.8, d: 0.6, x: 600, mood: 'happy', tears: 2 },
  ],
  pisK: [
    { t: 0, x: 840, y: 1460, size: 150, mood: 'wide', look: [-1, -1], tears: 2 },
    { t: 14.0, tears: 3 },
    { t: 21.8, d: 0.6, x: 800, y: 1420, size: 190, mood: 'happy', tears: 3, look: [-1, 0] },
  ],
  bubbles: [
    { t0: 4.8, t1: 7.2, who: 'venus', text: 'Love you have to *beg* for…', y: 560 },
    { t0: 7.4, t1: 9.6, who: 'venus', text: '…is the wrong *size*, darling.', y: 560 },
    { t0: 11.6, t1: 13.8, who: 'venus', text: 'You deserve love that *fits.*', y: 560 },
    { t0: 14.0, t1: 16.0, who: 'cancer', text: 'I *framed* their “k.”', x: 560, y: 1272, tailUp: false, tail: 80 },
    { t0: 16.2, t1: 18.4, who: 'venus', text: 'Miss them. *And* choose you.', y: 560 },
    { t0: 22.0, t1: 24.2, who: 'pisces', text: 'GROUP HUG. *Tissues for all.*', x: 660, y: 1150, tailUp: false, tail: 140, maxW: 460 },
    { t0: 24.4, t1: 27, who: 'venus', text: 'Love you beg for *doesn’t fit.*', y: 560 },
  ],
  fx: [
    ['recordScratch', { at: T.rec, len: 1.6, caption: 'rereading the chat from | *someone who stopped trying.*', sub: 'yep. again. by candlelight.', top: 1060 }],
  ],
  back(x, t, S) { if ((S.venus.alpha ?? 1) > 0) chandelier(x, t, S.venus) },
  mid(x, t) {
    // the old chat (on the floor with Cancer) → archived → the besties
    const ok = outK(t, [9.4, 9.7])
    const back = pop01(t, T.archive[0], 0.35)
    if (ok > 0.01) phone(x, t, { cx: 270, cy: 1230, w: 420, h: 540, s: 0.95 * ok, rot: -0.08, title: 'them', msgs: OLD, font: 31 })
    if (back > 0.01) {
      const sw = ease.inCubic(prog(t, ...T.archive))
      if (sw < 1) phone(x, t, { cx: 270 - sw * 700, cy: 1230, w: 420, h: 540, s: 0.95 * back, rot: -0.08 - sw * 0.3, title: 'them', msgs: OLD, font: 31 })
      if (t > T.archive[0] + 0.4 && t < T.archive[1] + 0.9) txt(x, 'ARCHIVED', 270, 1120, { size: 64, color: ROSE, stroke: INK, sw: 10, rot: -0.15, s: pop01(t, T.archive[0] + 0.4, 0.25, 3), alpha: outK(t, [T.archive[1] + 0.6, T.archive[1] + 0.9]) })
      const nk = pop01(t, T.archive[1], 0.35) * outK(t, [27, 27.3])
      if (nk > 0.01) phone(x, t, { cx: 270, cy: 1230, w: 420, h: 540, s: 0.95 * nk, rot: -0.05, title: 'the besties', msgs: NEW, font: 31 })
    }
    // sweaters
    const sk = outK(t, [18.2, 18.5])
    sweater(x, 280, 1040, 0.55, '#9aa3d6', pop01(t, T.sweat1, 0.35, 2.4) * sk, -0.1)
    if (t > T.sweat1 + 0.3) txt(x, 'TOO SMALL', 280, 1150, { size: 34, color: BONE, stroke: INK, sw: 8, alpha: sk * clamp(pop01(t, T.sweat1 + 0.3)) })
    sweater(x, 790, 1000, 1.15, ROSE, pop01(t, T.sweat2, 0.4, 2.4) * sk, 0.06)
    if (t > T.sweat2 + 0.3) txt(x, 'YOUR SIZE', 790, 1150, { size: 40, color: GOLD, stroke: INK, sw: 8, alpha: sk * clamp(pop01(t, T.sweat2 + 0.3)) })
  },
  front(x, t, S) {
    sparkleBurst(x, t, 790, 1000, T.sweat2 + 0.1, { R: 220 })
    if (t > T.reply) for (let k = 0; k < 3; k++) heart(x, 360 + k * 60, 1490 + Math.sin(t * 3 + k) * 8, 22 * pop01(t, T.reply + 0.15 + k * 0.1), { alpha: outK(t, [27, 27.3]) })
    sparkleBurst(x, t, (S.sign.x + S.pis.x) / 2, 1440, T.hug + 0.5, { R: 260 })
    void lerp; void win; void panel
  },
  cues: [
    ['pop', T.sweat1, 659.25, 0.05, -0.3], ['pop', T.sweat2, 987.77, 0.06, 0.3], ['glitter', T.sweat2, T.sweat2 + 0.4],
    ['whoosh', T.archive[0] + 0.2, 0.4, 0.06], ['tick', T.archive[0] + 0.4, 0.06],
    ['pop', T.friend, 880, 0.05, -0.2], ['pop', T.reply, 1174.66, 0.06, -0.2], ['bell', T.reply + 0.1, 1760, 0.03, 1.0, 0],
    ...sobCues(T.hug + 0.2, 5),
  ],
})
export const { DURATION, SCENES, CUES } = EP
