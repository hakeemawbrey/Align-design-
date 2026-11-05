// kdde11 — DEEP DIVE: AQUARIUS IN LOVE, "Everything Nobody Tells You" (≈ 2 min vertical, star_advice; synthwave · F#).
// Show kit: ../../kdde07/scenes/ddkit.js (read-only) on top of hookkit.js. No end card, no card cut. LOOPS to frame 0.
//   0–8.5     COLD OPEN  Aquarius mid-glitch beside a telescope, pixels scattering, a weird fact flashing.
//             Slam title "Loving an Aquarius? Be their best friend." · whip zoom · record scratch + freeze.
//   1 HOW THEY FLIRT   a weird fact at 2 a.m. · a friendly debate as a date · an invite to the strange hobby
//   2 WHAT THEY NEED   space (an orbit: they always come back) · friendship first · liked for being odd
//   3 HOW THEY FIGHT   they go logical (robot mode) · they need a walk first · what helps: "take your space, then tell me"
//   4 WHAT MAKES THEM STAY   freedom plus loyalty · a partner who's also a friend · the payoff: back from the walk with
//             a weird gift (a rock that looks like your face).
//   Outro: the telescope, two stars. Last line "Give them space. They come back closer." then back into the glitch.
// Astronomy kept true: Saturn's rings are real; a day on Venus is longer than its year (true).
import { buildDeepDive, bits, PIX, PAL, GOLD, BONE, INK, PINK, CYAN, MINT, MONO, INTER, rgba, mixHex } from '../../kdde07/scenes/ddkit.js'

const AQ = 'aquarius'
function telescope(x, cx, cy, s, rot = -0.5) {
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.fillRect(-6, 0, 12, s * 0.9); x.save(); x.rotate(0.35); x.fillRect(-5, 0, 10, s * 0.95); x.restore(); x.save(); x.rotate(-0.35); x.fillRect(-5, 0, 10, s * 0.95); x.restore()
  x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-s * 0.5 - 6, -s * 0.12 - 6, s + 12, s * 0.24 + 12)
  x.fillStyle = '#5a7be0'; x.fillRect(-s * 0.5, -s * 0.12, s, s * 0.24); x.fillStyle = '#8fb0ff'; x.fillRect(-s * 0.5, -s * 0.12, s, s * 0.06)
  x.fillStyle = GOLD; x.fillRect(s * 0.42, -s * 0.15, s * 0.1, s * 0.3)
  x.restore()
}
function glitchBlocks(x, t, n = 14, seed = 1, k = 1) {
  for (let i = 0; i < n; i++) {
    const r = (Math.sin((Math.floor(t * 12) + i * 7.1 + seed) * 12.9898) * 43758.5453) % 1
    const rr = Math.abs(r)
    x.save(); x.globalAlpha = 0.6 * k; x.fillStyle = [CYAN, PINK, '#38c4ec', BONE][i % 4]
    x.fillRect(rr * 1000, 500 + ((rr * 7919) % 900), 40 + rr * 160, 10 + (i % 3) * 8); x.restore()
  }
}
function rock(x, cx, cy, cell, k = 1) {
  bits(x, ['...KKKKK...', '..KSSSSSK..', '.KSSSSSSSK.', 'KSSKSSSKSSK', 'KSSSSSSSSSK', 'KSSSKKKSSSK', '.KSSSSSSSK.', '..KKKKKKK..'], PAL, cx, cy, cell * k)
}

const chapters = [
  { note: 'Answer the weird fact with a weird fact. That\'s how you flirt back.',
    beats: [
      { cap: 'A weird fact | *at 2 a.m.*',
        lines: [{ who: 'sign', text: 'did you know a day on Venus is longer than its *year?*' }, { text: 'translation: *I thought of you.*' }],
        draw(x, t, lt, H) {
          H.phone(560, 800, 380, 520, t, { title: '2:04 AM', msgs: [{ at: t - lt + 0.6, side: 'L', text: 'u up? random fact:' }, { at: t - lt + 1.4, side: 'L', text: 'a day on Venus is longer than its year' }, { at: t - lt + 4.3, side: 'R', text: 'WHAT. tell me more' }] })
          H.hero({ x: 200, y: 1180, s: 200, mood: lt > 4.3 ? 'heart' : 'sparkle', look: [1, -1] })
          H.you({ x: 900, y: 1190, s: 170, mood: lt > 4.3 ? 'sparkle' : 'sleepy', look: [-1, -1] })
        } },
      { cap: 'A friendly debate | *is a date.*',
        lines: [{ who: 'sign', text: 'is a hot dog a sandwich? *defend yourself.*' }, { text: "they're not arguing. *they're having fun.*" }],
        draw(x, t, lt, H) {
          for (const [px, col] of [[300, CYAN], [780, PINK]]) { H.panel(px, 1200, 220, 130, { border: col, fillC: '#2a1f55' }) }
          H.label('YES', 300, 1200, { size: 40, col: CYAN }); H.label('NO', 780, 1200, { size: 40, col: PINK })
          const sw = Math.floor(lt / 1.1) % 2
          H.hero({ x: 300, y: 980, s: 240, mood: sw ? 'neutral' : 'happy', look: [1, 0], hops: [0.4, 2.6, 4.8] })
          H.you({ x: 780, y: 990, s: 220, mood: sw ? 'happy' : 'neutral', look: [-1, 0], hops: [1.5, 3.7, 5.9], tag: false })
          H.meter(540, 650, 560, H.clamp(lt / 6), { label: 'FUN LEVEL', col: MINT })
        } },
      { cap: 'An invite to | *the strange hobby.*',
        lines: [{ who: 'sign', text: 'wanna come count moths with me? *it\'s science.*' }, { text: 'saying yes = *you\'re in the inner circle.*' }],
        draw(x, t, lt, H) {
          H.bits(['..KKK..', '.KYYYK.', 'KYYYYYK', '.KYYYK.', '..KKK..', '...K...', '...K...', '..KKK..'], PAL, 540, 700, 16)
          for (let i = 0; i < 5; i++) { const a = lt * 3 + i * 1.25; H.bits(['K.K', 'SKS', 'K.K'], PAL, 540 + Math.cos(a) * 120, 690 + Math.sin(a * 1.3) * 70, 7) }
          H.panel(780, 1140, 220, 80, { border: GOLD, k: H.pop(lt, 1.2) }); H.label('MOTHS: 5', 780, 1140, { size: 30, font: MONO, weight: 700, col: GOLD, k: H.pop(lt, 1.2) })
          H.hero({ x: 300, y: 1060, s: 250, mood: 'sparkle', look: [1, -1] })
          H.you({ x: 800, y: 980, s: 190, mood: lt > 4.2 ? 'happy' : 'wide', look: [-1, -1] })
        } },
    ] },
  { note: 'Give them space, be their friend first, and like the odd parts out loud.',
    beats: [
      { cap: 'Space. | *They come back.*',
        lines: [{ text: 'they orbit. far out, then *right back.*' }, { text: 'holding tight makes it *wobble.*' }],
        draw(x, t, lt, H) {
          x.save(); x.strokeStyle = rgba(CYAN, 0.5); x.lineWidth = 4; x.setLineDash([12, 14]); x.beginPath(); x.ellipse(540, 900, 380, 200, -0.2, 0, Math.PI * 2); x.stroke(); x.restore()
          H.you({ x: 540, y: 920, s: 200, mood: 'happy' })
          const a = lt * 1.2 + 2.5
          H.hero({ x: 540 + Math.cos(a) * 380 * Math.cos(-0.2) - Math.sin(a) * 200 * Math.sin(-0.2), y: 900 + Math.cos(a) * 380 * Math.sin(-0.2) + Math.sin(a) * 200 * Math.cos(-0.2), s: 160, mood: 'happy', look: [0, 0] })
        } },
      { cap: 'Friendship | *first.*',
        lines: [{ text: 'they fall for their *best friend.* every time.' }, { who: 'sign', text: 'wait. we\'re dating? oh. *nice.*' }],
        draw(x, t, lt, H) {
          H.panel(540, 650, 540, 110, { border: GOLD, k: H.pop(lt, 0.3) })
          H.label(lt < 3.9 ? 'STATUS: BEST FRIENDS' : 'STATUS: BEST FRIENDS ♡+', 540, 650, { size: 34, font: MONO, weight: 700, col: BONE, k: H.pop(lt, 0.3) })
          H.hero({ x: 380, y: 1000, s: 250, mood: lt > 4.3 ? 'heart' : 'happy', look: [1, 0] })
          H.you({ x: 700, y: 1010, s: 230, mood: lt > 4.3 ? 'heart' : 'happy', look: [-1, 0] })
          H.bits(['KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KGKKGGKKGGGK', 'KKKKKKKKKKKK'], PAL, 540, 1180, 7)
        } },
      { cap: 'Liked for being | *odd.*',
        lines: [{ who: 'you', text: 'I love that you name your plants.' }, { text: 'say it out loud. *it means everything.*' }],
        draw(x, t, lt, H) {
          ;['GERALD', 'DOROTHY', 'SIR LEAF'].forEach((n, i) => { const px = 220 + i * 320; H.pix('plant', px, 700, 11); H.label(n, px, 800, { size: 26, font: MONO, weight: 700, col: MINT, k: H.pop(lt, 0.4 + i * 0.4) }) })
          H.hero({ x: 320, y: 1080, s: 240, mood: lt > 2 ? 'sparkle' : 'neutral', look: [1, 0], squash: lt > 2 ? 0.06 : 0 })
          H.you({ x: 780, y: 1090, s: 220, mood: 'happy', look: [-1, 0] })
          if (lt > 2) H.spark(t, 320, 950, t - lt + 2.1, 10, 160, 4)
        } },
    ] },
  { note: 'Let them take a walk. Ask them to come back and say how they feel.',
    beats: [
      { cap: 'They go | *logical.*',
        lines: [{ who: 'sign', text: 'PROCESSING. FEELINGS: NOT FOUND.' }, { text: "it's not cold. *it's overwhelm.*" }],
        draw(x, t, lt, H) {
          glitchBlocks(x, t, 10, 3, 0.6)
          H.hero({ x: 330, y: 990, s: 270, mood: 'neutral', look: [0, 0], blink: false })
          // robot visor
          x.save(); x.fillStyle = INK; x.fillRect(220, 940, 220, 36); x.fillStyle = '#ff3b3b'; x.fillRect(226 + ((lt * 200) % 160), 946, 50, 24); x.restore()
          H.you({ x: 790, y: 1000, s: 230, mood: 'wide', look: [-1, 0] })
          H.panel(540, 650, 560, 100, { border: CYAN, fillC: '#0b1236' }); H.label('ROBOT MODE: ON', 540, 650, { size: 36, font: MONO, weight: 700, col: CYAN })
        } },
      { cap: 'They need | *a walk first.*',
        lines: [{ who: 'sign', text: "I need a walk. *I'm coming back.*" }, { text: 'the second part matters. *believe it.*' }],
        draw(x, t, lt, H) {
          // a path
          x.fillStyle = '#2a1f55'; x.fillRect(0, 1150, 1080, 60); for (let i = 0; i < 9; i++) { x.fillStyle = '#4a3c72'; x.fillRect(i * 130 + ((lt * 60) % 130), 1172, 70, 14) }
          const go = H.in(lt, 1.6, 4.4)
          H.hero({ x: H.lerp(380, 1000, go), y: 1060, s: 220, mood: 'neutral', look: [1, 0], hops: [1.8, 2.3, 2.8, 3.3, 3.8] })
          H.you({ x: 200, y: 1060, s: 210, mood: 'happy', look: [1, 0] })
          if (lt > 4.4) H.bubble(860, 860, 'back in 20!', { k: H.pop(lt, 4.4), size: 30, tail: 'down' })
        } },
      { cap: 'What *actually* | helps.',
        lines: [{ who: 'you', text: 'take your space. then come back and *tell me.*' }, { text: 'space with a promise is *safe.*' }],
        draw(x, t, lt, H) {
          H.card(540, 720, 170, 'What did the walk help you figure out?', { k: H.pop(lt, 0.4), rot: -0.06 })
          H.you({ x: 790, y: 1060, s: 220, mood: 'happy', look: [-1, 0] })
          const back = H.in(lt, 2.2, 3.6)
          H.hero({ x: H.lerp(1180, 320, back), y: 1060, s: 240, mood: back > 0.9 ? 'sparkle' : 'neutral', look: [-1, 0], hops: [2.3, 2.8, 3.3] })
        } },
    ] },
  { note: 'Give freedom, stay loyal, and be their friend. They come back every time.',
    beats: [
      { cap: 'Freedom | *plus loyalty.*',
        lines: [{ text: 'they want room to roam *and* someone who stays.' }, { text: 'both. *at the same time.* yes, really.' }],
        draw(x, t, lt, H) {
          H.panel(300, 680, 380, 120, { border: CYAN, k: H.pop(lt, 0.4) }); H.label('FREEDOM ✓', 300, 680, { size: 40, col: CYAN, k: H.pop(lt, 0.4) })
          H.panel(780, 680, 380, 120, { border: PINK, k: H.pop(lt, 1.2) }); H.label('LOYALTY ✓', 780, 680, { size: 40, col: PINK, k: H.pop(lt, 1.2) })
          H.hero({ x: 330, y: 1040, s: 240, mood: lt > 4 ? 'heart' : 'happy', look: [1, 0] })
          H.you({ x: 760, y: 1050, s: 220, mood: lt > 4 ? 'heart' : 'happy', look: [-1, 0] })
          H.pix('ring', 545, 900, 8 * H.pop(lt, 4.0))
        } },
      { cap: 'A partner | *who\'s a friend.*',
        lines: [{ who: 'sign', text: 'you\'re my favorite person to be weird with.' }, { text: 'that\'s an Aquarius *love letter.*' }],
        draw(x, t, lt, H) {
          // matching silly hats
          H.hero({ x: 360, y: 1020, s: 250, mood: 'happy', look: [1, 0], hops: [0.6, 1.2, 1.8, 2.4] })
          H.you({ x: 720, y: 1030, s: 230, mood: 'happy', look: [-1, 0], hops: [0.9, 1.5, 2.1, 2.7] })
          for (const [hx, hy] of [[360, 830], [720, 860]]) H.bits(['...K...', '..KGK..', '.KPPPK.', 'KPPPPPK', 'KKKKKKK'], PAL, hx, hy - 20 + Math.sin(lt * 6) * 6, 10 * H.pop(lt, 0.5))
          if (lt > 3.6) H.spark(t, 540, 800, t - lt + 3.6, 12, 220, 6)
        } },
      { cap: 'The *gift.*',
        lines: [{ text: 'and after the walk, *they bring you this:*' }, { who: 'sign', text: 'this rock looks like you. *I had to.*' }],
        draw(x, t, lt, H) {
          const back = H.in(lt, 0.3, 1.6)
          H.hero({ x: H.lerp(1180, 360, back), y: 1040, s: 250, mood: 'sparkle', look: [1, 0] })
          H.you({ x: 760, y: 1050, s: 230, mood: lt > 4.2 ? 'heart' : 'wide', look: [-1, 0] })
          const gk = H.pop(lt, 2.4, 0.4, 2.4)
          rock(x, 560, 780, 16, gk)
          H.label('(it does look like you)', 560, 900, { size: 28, font: MONO, weight: 700, col: BONE, k: H.pop(lt, 3.4) })
          if (lt > 4.2) H.spark(t, 560, 780, t - lt + 4.2, 12, 220, 8)
        } },
    ] },
]

const DD = buildDeepDive({
  id: 'kdde11', sign: AQ, ep: 11, ending: 'loop',
  hook: { text: 'Loving an *Aquarius?* | Be their best friend.' },
  intro: 'a field guide to loving an *Aquarius.*',
  promise: 'stay for *chapter four,* though.',
  cold(x, t, H) {
    telescope(x, 720, 940, 340, -0.55 + 0.05 * Math.sin(t * 5))
    glitchBlocks(x, t, 16, 1, 1)
    const j = Math.floor(t * 10) % 3
    H.hero({ x: 380 + (j - 1) * 14, y: 1050, s: 300, mood: 'wide', look: [1, -1], squash: 0.05 * Math.sin(t * 40) })
    H.panel(560, 680, 520, 90, { border: CYAN, fillC: '#0b1236', rot: -0.04 })
    H.label('FACT: Saturn has rings!!', 560, 680, { size: 32, font: MONO, weight: 700, col: CYAN, rot: -0.04 })
  },
  chapters,
  outro(x, t, lt, H) {
    telescope(x, 880, 900, 260, -0.6)
    H.hero({ x: 380, y: 1060, s: 250, mood: 'heart', look: [1, 0] })
    H.you({ x: 600, y: 1070, s: 220, mood: 'heart', look: [-1, 0] })
    rock(x, 490, 1230, 7)
  },
  last: 'Give them space. | They come back *closer.*',
})
export const { DURATION, SCENES, CUES } = DD
export const T = DD.T, CHECK = DD.CHECK
