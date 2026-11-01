// yr2006mixtape (20 s vertical, Star Talk Then vs Now · 22) "Still for u." · chiptune A.
// The format's shared look lives in ./tvn.js (identical in all five Block E films). Story 0–15.6, then the end card.
//   THEN 2006  "Showing you care | in *2006*"  ♉ Taurus, side-swept bangs, makes a burned CD. Rule of three:
//              (1) BURNING… the bar races to 99% and sticks there (sticker "99%… for an hour"); (2) the liner notes, in
//              handwriting: "1. the bus one / 2. our song (?) / 3. listen to the lyrics / 4. sorry, also this"
//              (sticker "liner notes: draft 4"); (3) the marker writes "for u" on the disc, adds a heart… and smudges
//              it with a thumb (sticker "“it's art.”"). ♒ Aquarius pops in, gets the disc, goes heart-eyed;
//              ♓ Pisces, bottom-left, cries.
//   card cut   7.267, on the switch.
//   NOW 2026   "Showing you care | in *2026*"  Same Taurus, no bangs, a phone: a new playlist titled "for u" (sticker
//              "same title."), the same tracks pop in (callback to the liner notes)… then 47 songs (sticker "47 songs.
//              edited 9×"); the cover is a hand-drawn heart, wobbly, with a smudge (sticker "“it's art.” (still)").
//              SHARE. Aquarius pops in with headphones, bopping, heart-eyed; Pisces sobs.
//   PAYOFF     the 2006 polaroid top-left, NOW big. THE STARS: "new format. same *effort.*"
//              Last: "*Still* for u."
import { makeTVN, BEAT, r3, INK, BONE, GOLD, PINK, HOT, INTER, MONO, SERIF, clamp, lerp, prog, ease, easeOutBack } from './tvn.js'

const TAU = 'taurus', AQU = 'aquarius'
const ST = { x: 286, y: 1160, s: 280 }
const AQ = { x: 860, y: 1330, s: 190 }      // THEN
const AQN = { x: 920, y: 1220, s: 160 }     // NOW (clear of the payoff narrator)
const DISC = { x: 735, y: 1000, r: 200 }

// ── THEN timeline
const TT = {
  burn: [0.95, 1.85], stuck: 1.85, notes: [2.4, 3.95], noteLines: [2.6, 2.86, 3.12, 3.38],
  write: [4.05, 4.75], heart: 4.85, smudge: 5.12, hand: [5.6, 6.0], aqIn: 5.55, love: 6.1,
}
const NOTES = ['for u (side A)', '1. the bus one', '2. our song (?)', '3. listen to the lyrics', '4. sorry, also this']

// ── NOW timeline
const CUT = BEAT(12)
const NT = {
  in: CUT + 0.05, title: [7.95, 8.25], rows: [8.55, 8.8, 9.05, 9.3], many: 9.6, cover: [10.0, 10.4], smudge: 10.48,
  share: 10.85, aqIn: 11.05, bop: 11.2,
}
const ROWS = ['the bus one', 'our song (?)', 'the lyrics one', 'sorry, also this']
const PH = { cx: 745, top: 640, w: 340, h: 700 }

const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const WOBBLY = ['.HH..HH.', 'HHHH.HHH', 'HHHHHHHH', '.HHHHHH.', '..HHHHH.', '...HHH..', '...H....']

function drawDisc(x, W, cx, cy, R, t, { sheen = 0 } = {}) {
  const c = 8, n = Math.ceil(R / c)
  // ink rim
  for (let j = -n - 1; j <= n; j++) { const yy = (j + 0.5) * c, hw = Math.sqrt(Math.max(0, (R + c) ** 2 - yy * yy)); W.px(cx - hw, cy + j * c, hw * 2, c, INK) }
  for (let j = -n; j < n; j++) for (let i = -n; i < n; i++) {
    const X = (i + 0.5) * c, Y = (j + 0.5) * c, d = Math.hypot(X, Y)
    if (d > R) continue
    let col = '#d9d6e6'
    if (d < R * 0.16) col = '#120c24'
    else if (d < R * 0.3) col = '#eef0f8'
    else {
      const a = Math.atan2(Y, X), s = Math.sin(a * 2 + sheen) * Math.sin(d / 23)
      col = s > 0.55 ? ['#ffd1e8', '#d1f0ff', '#fff3c4', '#d8ffd9'][Math.floor((a + 4) * 2) % 4] : s < -0.6 ? '#b9b5cc' : '#d9d6e6'
    }
    x.fillStyle = col; x.fillRect(cx + i * c, cy + j * c, c + 0.5, c + 0.5)
  }
}
function marker(x, W, X, Y, rot = -0.7) {
  W.bits(['.TT.', 'TTTT', 'BBBB', 'BbBB', 'BbBB', 'BbBB', 'BbBB', 'BbBB', 'BBBB', 'cccc', 'cccc', '.cc.'], { T: '#1b1236', B: '#2d2a3a', b: '#55506a', c: '#e8e6f0' }, X + 40 * Math.sin(-rot), Y - 40 * Math.cos(rot) + 0, 8, { rot })
}

const TVN = makeTVN({
  id: 'yr2006mixtape', year: '2006', date: '09·22·2006',
  heads: { then: 'Showing you care | in *2006*', now: 'Showing you care | in *2026*', last: '*Still* for u.' },
  lastLate: 3,
  line: 'new format. same *effort.*',
  stickers: [
    { text: '99%… for an hour', at: 1.98, x: 290, y: 560, rot: -0.07, bg: '#fff1c8' },
    { text: 'liner notes: draft 4', at: 3.0, x: 300, y: 670, rot: 0.05 },
    { text: '“it\'s art.”', at: 5.2, x: 260, y: 780, rot: -0.05, bg: '#ffe2e2', size: 44 },
    { text: 'same title.', at: 8.35, x: 270, y: 560, rot: -0.06, bg: '#d9ffe6' },
    { text: '47 songs. edited 9×', at: 9.75, x: 300, y: 670, rot: 0.04 },
    { text: '“it\'s art.” (still)', at: 10.55, x: 290, y: 780, rot: -0.05, bg: '#ffe2e2' },
  ],
  freeze: 4.55, crop: [120, 600, 840],

  thenWorld(x, t, W) {
    const live = W.live
    x.translate(540, 1060); x.scale(1.12, 1.12); x.translate(-540, -1000)
    const k = live ? W.pop01(t, 0.35, 0.4, 2) : 1
    // ── Taurus
    let mood = 'happy', look = [1, -0.4]
    if (t > TT.burn[0] && t < TT.stuck) { mood = 'sparkle'; look = [1, -1] }
    if (t > TT.stuck && t < TT.notes[0]) { mood = 'squint'; look = [1, -1] }
    if (t > TT.notes[0] && t < TT.write[0]) { mood = 'squint'; look = [1, 0] }
    if (t > TT.write[0] && t < TT.smudge) { mood = 'happy'; look = [1, -0.3] }
    if (t > TT.smudge && t < TT.smudge + 0.45) { mood = 'wide'; look = [1, -0.3] }
    if (t > TT.smudge + 0.45) { mood = 'sparkle'; look = [1, 0] }
    if (t > TT.love) { mood = 'heart'; look = undefined }
    const hops = [0.75, TT.burn[0], TT.stuck + 0.4, ...TT.noteLines, TT.heart, TT.smudge + 0.02, TT.hand[0], TT.love + 0.05]
    W.star(TAU, ST.x, ST.y, ST.s, { pop: k, mood, look, hops, bangs: true, seed: 5, blink: mood === 'wide' ? false : undefined })
    // ── the disc: grows in, then is handed over (shrinks toward Aquarius)
    const dk = live ? W.pop01(t, 0.5, 0.4, 2) : 1
    const hp = ease.inOutCubic(prog(t, ...TT.hand))
    const dx = lerp(DISC.x, 700, hp), dy = lerp(DISC.y, 1200, hp), R = DISC.r * dk * lerp(1, 0.45, hp)
    if (R > 2) {
      drawDisc(x, W, dx, dy, R, t, { sheen: t * 1.3 })
      // the marker writing: "for u" + a heart (then the smudge)
      const wp = prog(t, ...TT.write)
      if (wp > 0) {
        x.save(); x.translate(dx, dy - R * 0.5); x.scale(R / DISC.r, R / DISC.r); x.rotate(-0.08)
        x.font = `italic 700 92px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const tw = x.measureText('for u').width
        x.save(); x.beginPath(); x.rect(-tw / 2 - 10, -70, (tw + 20) * wp, 140); x.clip()
        x.fillStyle = INK; x.fillText('for u', -30, 0); x.restore()
        if (t > TT.heart) {
          const smudged = t > TT.smudge
          W.bits(smudged ? WOBBLY : HEART, { H: HOT }, tw / 2 + 10, 4, 9 * W.pop01(t, TT.heart, 0.25, 2.6), { rot: smudged ? 0.2 : 0 })
          if (smudged) { x.fillStyle = 'rgba(255,79,134,0.45)'; x.fillRect(tw / 2 + 30, 10, 70, 14); x.fillRect(tw / 2 + 50, 22, 60, 10) }
        }
        x.restore()
        if (t < TT.heart + 0.2 && live) {
          const penX = dx - tw * 0.5 * (R / DISC.r) - 30 + (tw + 20) * wp * (R / DISC.r) + (t > TT.write[1] ? 150 : 0)
          marker(x, W, penX, dy - R * 0.5 + 10 + 6 * Math.sin(t * 30), -0.6)
        }
        // the smudging thumb
        if (live && t > TT.smudge - 0.1 && t < TT.smudge + 0.35) W.bits(['.SSSS.', 'SSSSSS', 'SNNNNS', 'SSSSSS', 'SSSSSS', 'SSSSSS'], { S: '#ffd9a8', N: '#ffeedd' }, dx + 160 + 40 * prog(t, TT.smudge - 0.1, TT.smudge + 0.2), dy - R * 0.5 + 30, 9)
      }
    }
    // ── the burn bar: races to 99%… and sticks
    const bk = live ? W.pop01(t, TT.burn[0] - 0.1, 0.3, 2.4) * W.outK(t, [TT.notes[0] - 0.15, TT.notes[0]]) : 0
    if (bk > 0.01) {
      x.save(); x.translate(DISC.x, 700); x.scale(bk, bk)
      W.panel(-210, -50, 420, 100, '#e8e4f2', { P: 6 })
      const pct = t < TT.stuck ? Math.floor(99 * ease.outCubic(prog(t, ...TT.burn))) : 99
      W.txt(`BURNING… ${pct}%`, 0, -20, { size: 28, color: INK, shadow: false })
      W.px(-180, 4, 360, 26, INK); W.px(-176, 8, 352 * pct / 100, 18, t > TT.stuck && Math.floor(t * 4) % 2 ? '#ffb02e' : '#4fb0ff')
      x.restore()
    }
    // ── the liner notes (handwritten paper card)
    const nk = live ? easeOutBack(prog(t, TT.notes[0], TT.notes[0] + 0.35), 1.4) * (1 - ease.inCubic(prog(t, TT.notes[1] - 0.2, TT.notes[1]))) : 0
    if (nk > 0.01) {
      x.save(); x.translate(DISC.x - 10, lerp(1500, 1010, nk)); x.rotate(0.04)
      W.panel(-250, -170, 500, 340, '#fbf6e8', { P: 6 })
      for (let i = 0; i < 6; i++) W.px(-230, -112 + i * 52, 460, 2, 'rgba(120,150,220,0.45)')
      W.px(-190, -160, 3, 320, 'rgba(230,90,110,0.5)')
      NOTES.forEach((s, i) => {
        if (i > 0 && t < TT.noteLines[i - 1]) return
        W.txt(s, -170, -130 + i * 52, { size: i ? 36 : 40, color: i ? '#2a2a6a' : HOT, align: 'left', font: SERIF, weight: 600, italic: true, shadow: false })
      })
      x.restore()
    }
    // ── Aquarius pops in for the hand-off
    if (t > TT.aqIn) {
      W.star(AQU, AQ.x, AQ.y, AQ.s, { pop: live ? W.pop01(t, TT.aqIn, 0.35, 2.2) : 1, mood: t > TT.love ? 'heart' : 'wide', look: [-1, -0.6], hops: [TT.aqIn + 0.3, TT.love, TT.love + 0.4], seed: 8 })
      if (t > TT.love) W.sparkles(t, AQ.x, AQ.y - 30, TT.love, 10, 150, 1, [HOT, PINK, GOLD])
    }
    // ── Pisces, bottom-left, crying at the hand-off
    if (t > TT.love - 0.2) W.pisces(178, 1395, 130, 3, 'happy', { pop: live ? W.pop01(t, TT.love - 0.2, 0.3, 2) : 1, hops: [TT.love + 0.2], look: [1, -1] })
  },

  nowWorld(x, t, W) {
    x.translate(540, 1060); x.scale(1.12, 1.12); x.translate(-540, -1000)
    const k = W.pop01(t, NT.in, 0.36, 2)
    let mood = 'happy', look = [1, -0.3]
    if (t > NT.title[0] && t < NT.rows[0]) { mood = 'sparkle' }
    if (t > NT.many && t < NT.cover[0]) { mood = 'wide' }
    if (t > NT.cover[0] && t < NT.smudge) { mood = 'squint'; look = [1, -0.6] }
    if (t > NT.smudge && t < NT.smudge + 0.35) { mood = 'wide' }
    if (t > NT.smudge + 0.35) { mood = 'sparkle'; look = [1, 0] }
    if (t > NT.bop) { mood = 'heart'; look = undefined }
    const hops = [NT.in + 0.3, NT.title[1], ...NT.rows, NT.many + 0.05, NT.smudge, NT.share + 0.02, NT.bop + 0.1, 12.5, 13.0]
    W.star(TAU, ST.x, ST.y, ST.s, { pop: k, mood, look, hops, seed: 5, blink: mood === 'wide' ? false : undefined })
    const pk = W.pop01(t, NT.in + 0.08, 0.36, 2)
    x.save(); x.translate(PH.cx, 990); x.scale(pk, pk); x.translate(-PH.cx, -990)
    playlistPhone(x, t, W)
    x.restore()
    // Aquarius with headphones, bopping
    if (t > NT.aqIn) {
      const bop = t > NT.bop ? Array.from({ length: 12 }, (_, i) => r3(NT.bop + i * 0.278)) : []
      const F = W.star(AQU, AQN.x, AQN.y, AQN.s, { pop: W.pop01(t, NT.aqIn, 0.35, 2.2), mood: t > NT.bop ? 'heart' : 'wide', look: [-1, -0.4], hops: bop, seed: 8 })
      W.inSprite(F, () => { x.fillStyle = INK; x.fillRect(6, 4, 24, 3); x.fillRect(5, 6, 3, 16); x.fillRect(28, 6, 3, 16); x.fillRect(3, 15, 6, 9); x.fillRect(27, 15, 6, 9)
        x.fillStyle = HOT; x.fillRect(4, 16, 4, 7); x.fillRect(28, 16, 4, 7); x.fillStyle = '#3a3166'; x.fillRect(7, 5, 22, 1) })
      if (t > NT.bop) for (let i = 0; i < 3; i++) { const q = ((t - NT.bop) * 0.9 + i / 3) % 1; W.bits(['..NN', '..N.', '..N.', 'NNN.', 'NNN.'], { N: [GOLD, PINK, '#7fe0ff'][i] }, AQN.x + 10 - 26 * Math.sin(q * 6 + i * 2), AQN.y - 110 - q * 170, 6, { alpha: Math.sin(Math.PI * q) }) }
    }
    if (t > NT.aqIn + 0.1) {
      const P = W.pisces(178, 1395, 130, 3, 'happy', { pop: W.pop01(t, NT.aqIn + 0.1, 0.3, 2), hops: [NT.bop + 0.2], look: [1, -1] })
      W.inSprite(P, () => { x.fillStyle = INK; x.fillRect(27, 22, 9, 9); x.fillStyle = '#ffffff'; x.fillRect(28, 23, 7, 7) })
    }
  },

  cues(T) {
    return [
      // THEN: burn whirr, the stuck 99% beeps, pen scratches, heart pop, smudge, hand-off, love
      ['riser', TT.burn[0], TT.burn[1], 0.03], ['pluck', TT.stuck, 1760, 0.035, 0.2, 0.3], ['pluck', r3(TT.stuck + 0.5), 1760, 0.03, 0.2, 0.3], ['pluck', r3(TT.stuck + 1.0), 1760, 0.025, 0.2, 0.3],
      ['whoosh', TT.notes[0], 0.3, 0.035], ...TT.noteLines.flatMap(n => Array.from({ length: 5 }, (_, i) => ['tick', r3(n + i * 0.04), 0.012])),
      ...Array.from({ length: 16 }, (_, i) => ['tick', r3(TT.write[0] + i * 0.044), 0.014]),
      ['pop', TT.heart, 1318.51, 0.045, 0.3], ['whoosh', TT.smudge, 0.15, 0.03], ['pluck', r3(TT.smudge + 0.05), 392, 0.04, 0.3, 0.3],
      ['whoosh', TT.hand[0], 0.35, 0.035], ['pop', TT.aqIn, 880, 0.04, 0.4], ['bell', TT.love, 2349.32, 0.03, 1.0, 0.3], ['pluck', r3(TT.love + 0.1), 1174.66, 0.04, 0.5, 0.3], ['glitter', TT.love, r3(TT.love + 0.4)],
      // NOW: title typing, track pops, the 47 flood, the cover scribble, share, the bop
      ...Array.from({ length: 5 }, (_, i) => ['tick', r3(NT.title[0] + i * 0.06), 0.02]),
      ...NT.rows.map((r, i) => ['pop', r, [987.77, 1174.66, 1318.51, 1567.98][i], 0.035, 0.3]),
      ...Array.from({ length: 10 }, (_, i) => ['pop', r3(NT.many + i * 0.03), 1567.98 + i * 60, 0.012, 0.3]),
      ...Array.from({ length: 9 }, (_, i) => ['tick', r3(NT.cover[0] + i * 0.045), 0.014]), ['pluck', r3(NT.smudge + 0.03), 392, 0.035, 0.3, 0.3],
      ['whoosh', NT.share, 0.35, 0.04], ['pop', r3(NT.share + 0.05), 1174.66, 0.04, 0.3],
      ['pop', NT.aqIn, 880, 0.04, 0.4], ['bell', NT.bop, 2349.32, 0.03, 1.0, 0.4], ['glitter', NT.bop, r3(NT.bop + 0.4)],
    ]
  },
})

// ── NOW: a generic playlist screen
function playlistPhone(x, t, W) {
  const { px, txt } = W
  const L = PH.cx - PH.w / 2, top = PH.top, w = PH.w, h = PH.h
  W.panel(L, top, w, h, '#16112a', { P: 12 })
  const sl = L + 16, st = top + 22, sw = w - 32, sh = h - 44
  px(sl, st, sw, sh, '#1f1940')
  px(sw / 2 + sl - 36, st + 4, 72, 12, '#0c0818')
  // the cover: a square, gradient → the hand-drawn wobbly heart
  const cs = 170, cx0 = sl + (sw - cs) / 2, cy0 = st + 34
  const g = x.createLinearGradient(cx0, cy0, cx0 + cs, cy0 + cs); g.addColorStop(0, '#ff8fb1'); g.addColorStop(1, '#7f6cf0')
  px(cx0 - 6, cy0 - 6, cs + 12, cs + 12, INK); x.fillStyle = g; x.fillRect(cx0, cy0, cs, cs)
  const cp = prog(t, ...NT.cover)
  if (cp > 0) {
    x.save(); x.beginPath(); x.rect(cx0, cy0 + cs * (1 - cp), cs, cs * cp); x.clip()
    W.bits(t > NT.smudge ? WOBBLY : HEART, { H: '#fff6f0' }, cx0 + cs / 2, cy0 + cs / 2, 16, { rot: t > NT.smudge ? 0.18 : 0, outline: INK })
    x.restore()
    if (t > NT.smudge) { x.fillStyle = 'rgba(255,246,240,0.55)'; x.fillRect(cx0 + 100, cy0 + 112, 54, 12); x.fillRect(cx0 + 116, cy0 + 124, 40, 8) }
    if (t < NT.cover[1] + 0.05) W.bits(['.SSSS.', 'SSSSSS', 'SNNNNS', 'SSSSSS', 'SSSSSS', 'SSSSSS'], { S: '#ffd9a8', N: '#ffeedd' }, cx0 + cs / 2 + 50 * Math.sin(t * 16), cy0 + cs * (1 - cp) + 30, 8)
  } else W.bits(['..N.', '..NN', '..N.', 'NNN.', 'NNN.'], { N: 'rgba(255,255,255,0.8)' }, cx0 + cs / 2, cy0 + cs / 2, 12, { outline: null })
  // title
  const tl = 'for u', tp = prog(t, ...NT.title)
  const title = t < NT.title[0] ? '' : tl.slice(0, Math.round(tl.length * tp))
  txt(title || 'new playlist', sl + sw / 2, cy0 + cs + 44, { size: title ? 46 : 28, color: title ? BONE : '#8a84a8', shadow: false, font: INTER, weight: 800 })
  const nSongs = t < NT.rows[0] ? 0 : t < NT.many ? NT.rows.filter(r => t >= r).length : Math.min(47, 4 + Math.floor(43 * clamp((t - NT.many) / 0.3)))
  txt(`${nSongs} songs`, sl + sw / 2, cy0 + cs + 84, { size: 20, color: '#9fe6b0', shadow: false })
  // track rows (they scroll when the flood starts)
  const ry0 = cy0 + cs + 116
  x.save(); x.beginPath(); x.rect(sl, ry0 - 6, sw, sh - (ry0 - st) - 80); x.clip()
  const scroll = t > NT.many ? 120 * ease.inOutCubic(prog(t, NT.many, NT.many + 0.6)) : 0
  const names = [...ROWS, 'the 2 AM one', 'the rainy one', 'u liked it?', 'track 8', 'bus one again']
  names.forEach((s, i) => {
    const at = i < 4 ? NT.rows[i] : NT.many + (i - 4) * 0.06
    if (t < at) return
    const k = easeOutBack(prog(t, at, at + 0.25), 2)
    const y = ry0 + i * 58 - scroll
    x.save(); x.translate(sl + 20, y); x.scale(1, k)
    px(0, 0, 44, 44, ['#ff8fb1', '#7fe0ff', '#f2c75c', '#9fe6b0'][i % 4]); px(14, 12, 6, 20, INK); px(14, 12, 18, 6, INK); px(8, 26, 12, 8, INK)
    x.restore()
    txt(s, sl + 78, y + 22, { size: 22, color: BONE, align: 'left', shadow: false })
  })
  x.restore()
  // share button
  const by = st + sh - 50, dn = t > NT.share && t < NT.share + 0.15
  const sent = t > NT.share
  W.panel(sl + 40, by - 28, sw - 80, 56, dn ? '#fff6c8' : sent ? '#9fe6b0' : HOT, { P: 5 })
  txt(sent ? 'SENT!' : 'SHARE', sl + sw / 2, by, { size: 26, color: INK, shadow: false, font: INTER, weight: 800 })
}

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = TVN
