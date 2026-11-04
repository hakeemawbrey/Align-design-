// nmue20: THE MAKE-UP TALK, "Let it be a tie" (28 s vertical, promo/films/next30/b32.md, music: cinematic · Dm).
// ♏ Scorpio × ♉ Taurus. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“Tinsel goes *on* | the tree. Obviously.”" Scorpio mid-toss of a tinsel clump, Taurus holding one
//             strand like a rule: "throw it ON!" / "it goes strand by strand." / "this is a hill I'll stand on."
//   6.6–12.8  UNDER IT   "Still arguing. | *Day three.*" A scoreboard (DAY 3, 0–0), a still-bare tree, two tired stars.
//   12.8–21.6 THE TALK   "Not everything | needs a *winner.*" TRY SAYING "Left side yours, right side mine?"
//             Taurus: "fine. but my side will be perfect."
//   21.6–25.5 MADE UP    the tree: half tossed, half precise, both proud; the scoreboard flips to TIE.
//             "Some fights | end *in a tie*."
import { makeMakeUp, R, box, ink, label, glow, sparkles, signStar, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

const SCO = signStar('scorpio'), TAU = signStar('taurus')
const TINSEL = '#d9e2f2'
function tree(x, t, cx, by, s = 1, { left = 0, right = 0 } = {}) {
  x.save(); x.translate(cx, by); x.scale(s, s)
  box(x, -30, -60, 60, 60, '#7a5030', { b: 6 })
  const tiers = [[-60, 300, 150], [-190, 240, 140], [-310, 170, 130]]
  for (const [y, w, h] of tiers) {
    x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 - 10, y + 6); x.lineTo(0, y - h - 10); x.lineTo(w / 2 + 10, y + 6); x.closePath(); x.fill()
    x.fillStyle = '#2f9a5a'; x.beginPath(); x.moveTo(-w / 2, y); x.lineTo(0, y - h); x.lineTo(w / 2, y); x.closePath(); x.fill()
    x.fillStyle = '#3fb870'; x.beginPath(); x.moveTo(-w / 4, y - h / 2); x.lineTo(0, y - h); x.lineTo(0, y - h / 2); x.closePath(); x.fill()
  }
  // left half: tossed clumps (Scorpio)
  for (let i = 0; i < Math.floor(left * 12); i++) {
    const px = -20 - ((i * 37) % 110), py = -90 - ((i * 53) % 330)
    for (let j = 0; j < 5; j++) R(x, j % 2 ? TINSEL : '#ffffff', px + Math.sin(i + j) * 16 - 4, py + j * 6 - 8 + Math.cos(i * 3 + j) * 12, 12, 20)
  }
  // right half: precise strands (Taurus)
  for (let i = 0; i < Math.floor(right * 6); i++) {
    const y = -100 - i * 52, half = 120 - i * 18
    for (let k = 0; k < 8; k++) R(x, k % 2 ? TINSEL : '#ffffff', 6 + k * half / 8, y + 4 * Math.sin(k), half / 8 - 2, 5)
  }
  drawStar(x, 0, -330)
  x.restore()
}
function drawStar(x, cx, cy) { x.fillStyle = INK; x.fillRect(cx - 22, cy - 22, 44, 44); x.fillStyle = GOLD; x.fillRect(cx - 16, cy - 16, 32, 32); x.fillStyle = '#fff1a8'; x.fillRect(cx - 8, cy - 8, 16, 16) }
function board(x, cx, cy, text, sub, k = 1, col = '#1b1530') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -230, -90, 460, 180, col, { b: 8 })
  ink(x, text, 0, -30, { size: 56, font: MONO, weight: 700, col: '#ffd23a' })
  ink(x, sub, 0, 40, { size: 50, font: MONO, weight: 700, col: BONE })
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue20', a: 'scorpio', b: 'taurus',
  hook: '“Tinsel goes *on* | the tree. Obviously.”', hookColor: '#d9e2f2',
  fight: {
    lines: [['a', 'throw it ON!'], ['b', 'it goes strand by strand.'], ['a', "this is a hill I'll stand on."]],
    bubbleAt: [[260, 840], [800, 760], [380, 640]],
    posA: { x: 200, y: 1150, s: 240 }, posB: { x: 880, y: 1150, s: 240 },
    moods: { a: 'squint', b: 'neutral' },
    noSquiggle: true, noSteam: true,
    draw(x, t) { tree(x, t, 540, 1320, 1.1, { left: 0.3 }) },
    front(x, t) {
      // the tossed clump, in flight
      const p = (t * 0.7) % 1
      for (let j = 0; j < 6; j++) R(x, j % 2 ? TINSEL : '#ffffff', lerp(260, 470, p) + Math.sin(j * 2 + t * 6) * 14, 1000 - Math.sin(Math.PI * p) * 260 + j * 6, 9, 16)
      // Taurus's single strand
      for (let k = 0; k < 7; k++) R(x, k % 2 ? TINSEL : '#ffffff', 760 + k * 14, 1000 + Math.sin(k + t * 2) * 3, 12, 6)
    },
    cues: [['whoosh', 0.7, 0.3, 0.02], ['whoosh', 2.1, 0.3, 0.02], ['whoosh', 3.5, 0.3, 0.02], ['whoosh', 4.9, 0.3, 0.02]],
  },
  under: {
    head: 'Still arguing. | *Day three.*', color: '#d9e2f2',
    draw(x, t, S) {
      const { u, drawA, drawB } = S
      tree(x, t, 540, 1350, 1.0)
      const day = u < 1.0 ? 1 : u < 2.0 ? 2 : 3
      board(x, 540, 640, `DAY ${day}`, `${SCO.glyph} 0 – 0 ${TAU.glyph}`, pop01(t, S.t0 + 0.15, 0.3, 2))
      drawA(x, t, { x: 190, y: 1250, s: 200, mood: u > 2.0 ? 'sleepy' : 'squint', look: [1, 0], hops: [S.t0 + 1.0, S.t0 + 2.0] })
      drawB(x, t, { x: 890, y: 1250, s: 200, mood: u > 2.0 ? 'sleepy' : 'squint', look: [-1, 0], hops: [S.t0 + 1.0, S.t0 + 2.0] })
      if (u > 2.6) label(x, 'the tree: still bare.', 540, 1460, { size: 34, col: BONE, alpha: clamp(prog(u, 2.6, 2.9)) })
    },
    pis: { x: 980, y: 1660, s: 110 },
    cues: [['tom', 1.0, 90, { gain: 0.2, decay: 0.2 }], ['tom', 2.0, 90, { gain: 0.25, decay: 0.25 }], ['pluck', 2.6, 293.66, 0.04, 0.8, 0]],
  },
  talk: {
    head: 'Not everything | needs a *winner.*', color: '#ffd23a',
    stars: "some things don't need a winner. let the *small ones* tie.",
    script: 'Left side *yours,* right side *mine?*',
    reply: ['b', 'fine. *but my side will be perfect.*'],
  },
  made: {
    posA: { x: 190, y: 1160, s: 230 }, posB: { x: 890, y: 1160, s: 230 },
    draw(x, t, S) {
      x.save(); x.globalAlpha = S.ok
      glow(x, 540, 1000, 420, 1, '255,226,160')
      tree(x, t, 540, 1360, 1.15, { left: clamp(prog(t, S.t0 + 0.2, S.t0 + 1.2)), right: clamp(prog(t, S.t0 + 0.4, S.t0 + 1.4)) })
      x.restore()
    },
    front(x, t, S) {
      board(x, 540, 1530, 'TIE', `${SCO.glyph} proud ${TAU.glyph}`, pop01(t, S.t0 + 1.6, 0.3, 2.4) * S.ok, '#2a1f55')
      sparkles(x, t, 540, 960, S.t0 + 1.5, 12, 260, 1, [GOLD, BONE, PINK])
    },
    cues: [...Array.from({ length: 6 }, (_, i) => ['tick', +(0.3 + i * 0.18).toFixed(2), 0.04]), ['pop', 1.6, 880, 0.045, 0], ['bell', 1.62, 1760, 0.03, 1.0, 0], ['glitter', 1.5, 1.9]],
  },
  last: 'Some fights | end *in a tie*.', lastColor: '#ffd23a',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [ease, easeOutBack, INTER]
