// kxase01 · Ask the Stars: Extended, ep 1 · "When Their Texts Get Shorter" (75 s vertical, star_advice post, lofi · Am)
// No end card, no card transition. Hard cut on the punchline. The look lives in ../xkit.js (built on hookkit.js).
//   0.00   frame 0: ♊ Gemini mid-fall backwards off a stool, the phone flying; the chat: a long paragraph → "ok".
//          Slam title "Paragraphs to *'ok.'* | What happened?"; whip zoom settling; a shake as the stool goes.
//   0.70   record scratch + freeze: "one *'ok.'* | whole spiral."      2.2 promise "wait for what Gemini *finally* does"
//   3.0    1 · THE QUESTION  the DM "Their texts got *shorter.* | Is it me?"; Gemini under it; 9.5 a notification "ok"
//  12.5    2 · WHY IT HAPPENS  THE STARS: "texts shrink when life gets *loud.*" → split: Gemini | Sagittarius at a
//          busy desk (DEADLINE · 5 PM) → "it's rarely a verdict on *you.*"; Sag types "ok" between two tasks.
//  25.0    3 · THE STORY  the spiral: loading bar "decoding 'ok'…" → two drafts typed and struck (caught circle).
//  40.0    4 · WHAT HELPS  THE STARS: "ask, don't *guess.*" → the CHECK-IN card "hey, you seem busy. | *all good
//          with us?*" → sent.
//  55.0    5 · THE ANSWER  11:48 PM, typing… "sorry!! work is chaos this week." "still on for sunday?" Gemini flops
//          back onto the couch, happy (the frame-0 fall, rhymed). Pisces fountains. 68.0 SUNDAY: the bench, Sag
//          talking in paragraphs again. 73.5 last line "Short texts. | *Same* person."  Pisces cries in every act.
import {
  makeX, say, stars, star, pisces, bigPhone, phoneSmall, box, R, label, hearts, sparkles, couch, table, bench,
  signStar, INK, BONE, GOLD, PINK, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../xkit.js'

const GEM = 'gemini', SAG = 'sagittarius'
const SAGC = signStar(SAG)
const FALL = { a: -0.6, land: 2.45 }      // the frame-0 fall (frozen 0.7–2.1 by the scratch)

// the stool tipping and the flying phone (shot A)
function fallShot(x, t) {
  const p = ease.inQuad(prog(t, FALL.a, FALL.land))
  const rot = -0.25 - 1.05 * p
  // the stool, tipping over to the right
  x.save(); x.translate(560, 1170); x.rotate(0.15 + 1.1 * ease.inQuad(prog(t, -0.6, 1.8 + 0.6)))
  box(x, -70, -230, 140, 26, '#c98a4a', { b: 6, hi: 'rgba(255,255,255,0.25)' })
  R(x, INK, -60, -204, 16, 204); R(x, INK, 44, -204, 16, 204); R(x, INK, -50, -110, 100, 12)
  x.restore()
  // Gemini, mid-fall backwards
  const gx = lerp(480, 340, p), gy = lerp(900, 1060, p)
  x.save(); x.translate(gx, gy); x.rotate(rot)
  star(x, t, GEM, { x: 0, y: 0, s: 340, mood: 'wide', look: [1, -1], hops: null, squash: -0.05 })
  x.restore()
  if (t > FALL.land) { label(x, 'THUD.', 300, 1240, { size: 40, col: GOLD, rot: -0.1, alpha: outK(t, [3.0, 3.2]) }) }
  // the phone, flying up and spinning
  const ph = prog(t, -0.6, 2.8)
  const px = lerp(560, 760, ph), py = 760 - 260 * Math.sin(Math.PI * Math.min(1, ph * 1.2)) + 140 * ph
  phoneSmall(x, t, px, py, { rot: -0.4 + 5.5 * ph, s: 1.25, glowA: 1 })
  // the chat, popping out of the phone: a long paragraph → "ok"
  const k = 1
  x.save(); x.translate(780, 690)
  R(x, INK, -250, -150, 420, 210); R(x, '#ff9f6b', -246, -146, 412, 202)
  x.fillStyle = INK; for (let i = 0; i < 5; i++) R(x, 'rgba(27,18,54,0.55)', -224, -124 + i * 36, i === 4 ? 210 : 370, 18)
  R(x, INK, -250, 84, 140, 92); R(x, '#e8e2f6', -246, 88, 132, 84)
  x.font = `800 52px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ok', -180, 132)
  x.restore()
  void k
}

// Sagittarius at a busy desk (split right half, local coords 0…540)
function desk(x, t, typeAt) {
  box(x, 40, 1040, 460, 26, '#8a5a3a', { b: 6, hi: 'rgba(255,255,255,0.2)' })
  R(x, INK, 70, 1066, 18, 110); R(x, INK, 450, 1066, 18, 110)
  for (let i = 0; i < 5; i++) box(x, 330 + (i % 2) * 8, 1010 - i * 24, 130, 16, i % 2 ? '#f4f0ff' : '#e8e2f6', { b: 3 })
  for (let i = 0; i < 4; i++) box(x, 70 + (i % 2) * 6, 1010 - i * 24, 120, 16, '#f4f0ff', { b: 3 })
  label(x, 'DEADLINE · 5 PM', 270, 790, { size: 26, col: '#ff7a7a' })
  const busy = Math.floor(t * 3) % 2
  star(x, t, SAG, { x: 270, y: 960 + (busy ? -6 : 0), s: 230, mood: inR(t, typeAt, typeAt + 1.2) ? 'neutral' : 'squint', look: inR(t, typeAt, typeAt + 1.2) ? [0, 1] : [busy ? 1 : -1, 1] })
  const ty = inR(t, typeAt - 0.3, typeAt + 1.4)
  phoneSmall(x, t, ty ? 270 : 190, ty ? 1030 : 1110, { rot: ty ? 0 : 1.3, s: 0.8, buzz: inR(t, typeAt - 1.2, typeAt - 0.3) ? 1 : 0 })
}

const F = makeX({
  id: 'kxase01', series: 'ask', dur: 75, ending: 'cut',
  hook: { text: "Paragraphs to *'ok.'* | What happened?", out: 2.9, top: 200, size: 110, color: '#ffe58a' },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'wait for what Gemini *finally* does', top: 1300 },
  chapters: [{ at: 3.0, title: 'the question' }, { at: 12.5, title: 'why it happens' }, { at: 25.0, title: 'the story' }, { at: 40.0, title: 'what helps' }, { at: 55.0, title: 'the answer' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'shake', at: 0.2, len: 0.4, amp: 20 },
    { k: 'scratch', at: 0.7, len: 1.4, caption: "one *'ok.'* | whole spiral.", top: 1480 },
    { k: 'shake', at: 2.45, len: 0.35, amp: 26 },
    { k: 'notif', at: 9.5, out: [11.6, 11.85], title: 'texts', body: 'Sagittarius: *ok*', glyph: SAGC.glyph, color: SAGC.color, y: 150 },
    { k: 'loading', at: 26.0, len: 2.7, label: "decoding 'ok'…", stallAt: 99, error: 'Error: too many meanings', y: 700 },
    { k: 'caught', at: 33.4, x: 640, y: 1088, r: 230, ry: 60, label: 'DRAFT #2', arrow: 'br', rec: false, out: [35.1, 35.3] },
    { k: 'shake', at: 61.5, len: 0.4, amp: 14 },
    { k: 'whip', at: 68.0, len: 0.45, from: 1.3 },
  ],
  dm: { at: 3.2, out: [12.2, 12.5], text: 'Their texts got *shorter.* | Is it me?', top: 300 },
  chip: { at: 19.6, out: [24.3, 24.6], text: '♊ MUTABLE AIR · RULED BY MERCURY', color: '#ffe58a', top: 1290 },
  lines: [
    say(5.6, GEM, "it used to be paragraphs. now it's *'ok.'*"),
    say(8.8, GEM, 'did I do something *wrong?*'),
    stars(13.0, 'texts shrink when life gets *loud.*'),
    stars(17.2, "it's rarely a verdict on *you.*"),
    say(35.6, GEM, 'three drafts. zero sent. *one* spiral.'),
    stars(40.6, "ask, don't *guess.*"),
    stars(43.6, 'one kind, open question beats ten drafts.'),
    say(63.4, 'pisces', "they're still on for *sunday!*"),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 4, close: 24.6 }, { from: 4, to: 5, close: 39.7 }, { from: 5, to: 7, close: 47.7 }, { from: 7, to: 8, close: 67.7 }],
  cards: [{ at: 48.0, out: [53.4, 53.75], text: 'hey, you seem busy. | *all good with us?*', label: 'ASK, DON’T GUESS', top: 430 }],
  last: { at: 73.5, text: 'Short texts. | *Same* person.', top: 300, color: '#ffe58a' },
  shots: [
    // A · the fall (0–3)
    { at: 0, set: 'room', setOpts: { couch: false }, cam: [1.2, 560, 900], push: 0.02,
      draw(x, t) { fallShot(x, t) },
      pis: t => ({ x: 960, y: 1240, s: 120, tears: 1, mood: 'wide', look: [-1, -1] }) },
    // B · the question (3–12.5): the snowy sky, Gemini under the DM
    { at: 3.0, set: 'sky', cam: [1, 540, 960], push: 0.04,
      draw(x, t, S) {
        const sad = t > 8.6
        star(x, t, GEM, { x: 520, y: 1040, s: 330, mood: t < 5.5 ? 'wide' : sad ? 'sparkle' : 'neutral', look: t > 9.5 ? [1, 1] : [0, -1], hops: S.hopsFor(GEM), squash: sad ? 0.06 : 0 })
        phoneSmall(x, t, 720, 1120, { rot: 0.2, s: 0.95, buzz: inR(t, 9.4, 10.4) ? 1 : 0, text: t > 9.5 ? 'ok' : null })
      },
      pis: t => ({ x: 930, y: 1250, s: 140, tears: t < 9.5 ? 1 : 2, mood: 'sparkle', look: [-1, -0.6] }) },
    // C · THE STARS, then the split (12.5–25)
    { at: 12.5, set: 'sky', cam: [1, 540, 960], push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1000, s: 380, mood: 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, GEM, { x: 190, y: 1210, s: 150, mood: 'wide', look: [1, -1] })
      },
      pis: { x: 900, y: 1230, s: 130, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    { at: 16.0, set: 'split', cam: [1.22, 540, 860], push: 0.03,
      draw(x, t) {
        // left: Gemini staring at the phone · right: Sagittarius swamped at a desk
        label(x, 'GEMINI · 6:02 PM', 270, 380, { size: 26, col: '#ffe58a' })
        label(x, 'SAGITTARIUS · 6:02 PM', 810, 380, { size: 26, col: SAGC.color })
        star(x, t, GEM, { x: 270, y: 1030, s: 230, mood: t > 21.8 ? 'wide' : 'neutral', look: [0, 1] })
        phoneSmall(x, t, 370, 1110, { rot: 0.15, s: 0.75, text: t > 21.8 ? 'ok' : null, buzz: inR(t, 21.8, 22.5) ? 1 : 0 })
        x.save(); x.beginPath(); x.rect(548, 0, 532, 1920); x.clip(); x.translate(540, 0); desk(x, t, 21.0); x.restore()
        if (t > 21.1 && t < 22.4) label(x, 'ok. *send*', 810, 860 - 60, { size: 30, col: BONE, alpha: pop01(t, 21.1) })
      },
      pis: t => ({ x: 170, y: 1230, s: 90, tears: 2, mood: 'sparkle', look: [1, -1], tissue: false }) },
    // D · the spiral (25–40)
    { at: 25.0, set: 'room', setOpts: { couchX: 540 }, cam: [1.14, 540, 900], push: 0.04,
      draw(x, t, S) {
        star(x, t, GEM, { x: 260, y: 1060, s: 250, mood: t < 28.7 ? 'squint' : t < 35.5 ? 'wide' : 'sparkle', look: [1, -1], hops: S.hopsFor(GEM) })
      },
      pis: t => ({ x: 940, y: 1250, s: 120, tears: t < 33 ? 1 : 2, mood: 'sparkle', look: [-1, -1] }) },
    // E · what helps (40–55)
    { at: 40.0, set: 'sky', cam: [1, 540, 960], push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1010, s: 370, mood: t > 48 ? 'heart' : 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, GEM, { x: 180, y: 1210, s: 160, mood: t > 52.0 ? 'happy' : 'neutral', look: [1, -1], hops: [52.0, 52.5] })
        if (t > 52.0) { const p = prog(t, 52.0, 53.2); phoneSmall(x, t, lerp(250, 900, p), lerp(1150, 300, p), { rot: p * 6, s: lerp(0.8, 0.3, p) }); sparkles(x, t, 250, 1150, 52.0, 10, 90, 2) }
      },
      pis: { x: 900, y: 1220, s: 130, tears: 2, mood: 'sparkle', look: [-1, -1] } },
    // F · the answer (55–68): late night on the couch, the phone
    { at: 55.0, set: 'room', setOpts: { couchX: 540, warm: 0.6 }, cam: [1.14, 540, 900], push: 0.05, dim: 0.7,
      draw(x, t) {
        label(x, '11:48 PM', 900, 180, { size: 34, col: BONE })
        const flop = prog(t, 61.5, 61.9)
        const waitHop = t < 58.5 ? [55.6, 56.6, 57.6] : [60.1, 60.4]
        x.save(); x.translate(270, 1060); x.rotate(-0.55 * ease.outBack(flop))
        star(x, t, GEM, { x: 0, y: 0, s: 250, mood: t < 58.5 ? 'neutral' : t < 61.5 ? 'wide' : 'heart', look: t < 61.5 ? [1, -1] : [0, -1], hops: t < 61.5 ? waitHop : null, squash: flop > 0 ? 0.12 * (1 - flop) : 0 })
        x.restore()
        if (t > 61.6) hearts(x, t, 61.6, 270, 900, { n: 7, cell: 7, spread: 200 })
      },
      pis: t => ({ x: 940, y: 1250, s: 130, tears: t < 61.5 ? 2 : 3, mood: t < 61.5 ? 'sparkle' : 'happy', look: [-1, -1], hops: t > 61.5 ? [61.7, 62.3, 62.9] : null }) },
    // G · Sunday (68–75): the bench, Sag talking in paragraphs again
    { at: 68.0, set: 'park', cam: [1.12, 540, 900], push: 0.03, noFlash: true,
      draw(x, t) {
        star(x, t, GEM, { x: 400, y: 960, s: 220, mood: t > 72 ? 'heart' : 'happy', look: [1, 0], hops: [69.0, 71.3, 72.6] })
        star(x, t, SAG, { x: 690, y: 960, s: 220, mood: 'happy', look: [-1, 0], hops: [69.4, 69.9, 70.4, 70.9, 71.4] })
        if (t > 72.4) hearts(x, t, 72.4, 540, 820, { n: 5, cell: 6, spread: 220 })
      },
      front(x, t) {
        if (t > 69.2) {
          // Sag's paragraph bubble (no more "ok")
          const k = pop01(t, 69.2, 0.3, 2.2)
          x.save(); x.translate(720, 1290); x.scale(k, k)
          R(x, INK, -300, -90, 600, 180); R(x, BONE, -294, -84, 588, 168)
          x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
          x.fillText('…and THEN my boss said—', 0, -30); x.fillText('ok wait, from the start:', 0, 26)
          x.restore()
        }
        label(x, 'SUNDAY · 2 PM', 540, 1560, { size: 34, col: INK })
      },
      pis: t => ({ x: 200, y: 1190, s: 120, tears: 3, mood: 'happy', look: [1, -1], hops: [70.0, 71.0, 72.0, 73.0] }) },
  ],
  overlay(x, t) {
    // the chat on the big phone in the spiral (shot D) and the answer (shot F)
    if (t >= 28.8 && t < 39.85) {
      const k = pop01(t, 28.8, 0.35, 2) * outK(t, [39.5, 39.85])
      const d1 = prog(t, 29.4, 31.2), d2 = prog(t, 32.0, 33.3)
      const draft = t < 31.9 ? { text: 'is everything okay?? did I say smth weird', chars: d1 * 41, strike: t > 31.4 } : t < 35.4 ? { text: "fine. 'ok' to you too.", chars: d2 * 22, strike: t > 33.6 } : { text: '', chars: 0 }
      bigPhone(x, t, { cx: 640, cy: 800, w: 500, h: 640, title: 'sagittarius ♐︎', pop: k, accent: '#ffe58a', draft,
        msgs: [
          { at: -9, from: 'me', text: 'omg the funniest thing happened at the bakery, so the guy says' },
          { at: -9, from: 'them', name: 'SAGITTARIUS', nameCol: SAGC.color, text: 'ok' },
        ] })
    }
    if (t >= 55.4 && t < 67.8) {
      const k = pop01(t, 55.4, 0.35, 2) * outK(t, [67.4, 67.8])
      bigPhone(x, t, { cx: 650, cy: 760, w: 500, h: 640, title: 'sagittarius ♐︎', pop: k, accent: '#ffe58a', typing: [56.2, 58.5],
        msgs: [
          { at: -9, from: 'me', text: 'hey, you seem busy. all good with us?' },
          { at: 58.5, from: 'them', name: 'SAGITTARIUS', nameCol: SAGC.color, text: 'sorry!! work is chaos this week' },
          { at: 60.0, from: 'them', name: 'SAGITTARIUS', nameCol: SAGC.color, text: 'all good. still on for sunday?' },
          { at: 65.6, from: 'me', text: 'yes!! can’t wait' },
        ] })
    }
  },
  cues: [
    ['whoosh', 0.0, 0.5, 0.05], ['pop', 2.45, 196, 0.06, 0], ['tick', 2.5, 0.06],
    ['pop', 21.1, 880, 0.03, 0.3], ['pop', 21.8, 987.77, 0.035, -0.3],
    ['tick', 29.4, 0.02], ['tick', 29.9, 0.02], ['tick', 30.4, 0.02], ['tick', 30.9, 0.02], ['whoosh', 31.4, 0.2, 0.03],
    ['tick', 32.0, 0.02], ['tick', 32.5, 0.02], ['tick', 33.0, 0.02], ['whoosh', 33.6, 0.2, 0.03],
    ['whoosh', 52.0, 1.0, 0.04], ['pop', 52.05, 1318.51, 0.035, 0], ['glitter', 52.0, 52.6],
    ['tick', 56.4, 0.02], ['tick', 56.9, 0.02], ['tick', 57.4, 0.02], ['tick', 57.9, 0.02],
    ['pop', 58.5, 987.77, 0.04, 0], ['pop', 60.0, 1174.66, 0.04, 0], ['whoosh', 61.5, 0.3, 0.04], ['glitter', 61.6, 62.3],
    ['pluck', 61.8, 659.25, 0.035, 0.5, 0.3], ['pluck', 62.0, 587.33, 0.035, 0.5, 0.3], ['pop', 65.6, 1318.51, 0.035, 0],
    ['pluck', 72.5, 880, 0.03, 0.5, 0.3],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
