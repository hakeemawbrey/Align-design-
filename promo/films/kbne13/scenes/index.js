// kbne13: BREAKING NEWS: THE STARS, Ep 13 · "The group chat went silent" (18 s vertical, star_talk post, music: house · Am).
// No end card, no card cut: the last 0.4 s blends back into frame 0 (kit loopBack). Show look: ../../kbne01/newskit.js.
// Tonight Pisces is off (the seat holds an OFF TONIGHT placard): the story is about them.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; the monitor shows a group chat frozen on "anyone up?", READ BY
//        11. Hook: "BREAKING: The group chat | has gone *silent.*"
//   1.30 cut: the chat. ♓ "anyone up?" 9:40 PM · Read by 11. Nothing. Record scratch at 2.6: "eleven reads. *zero
//        replies.*"
//   4.40 cut: SKY CAM over the city: eleven lit windows, every sign star typing.
//   7.80 cut: the reveal: a second chat, PISCES BDAY (11): "cake: secured", "balloons: me", "act normal in the main chat".
//  11.00 cut: LIVE at Pisces's door. Knock knock; the door opens on eleven stars and a cake: SURPRISE! Pisces sobs.
//  14.40 last headline: "Silence was a | *surprise.*"  17.6–18.0 loops back to frame 0.
import {
  studio, desk, anchor, sign, live, chyron, ticker, room, phone, street, windowFrame, caught, bubble, chip, txt, px, sparkles, drawBits, tears, slam, papers, stamp,
  makeNews, slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, TEAR, PINK,
} from '../../kbne01/newskit.js'

const D = 18
const T = { slam: 0.15, cut1: 1.3, rec: 2.6, cut2: 4.4, cut3: 7.8, cut4: 11.0, knock: 11.3, open: 12.2, cry: 12.6, last: 14.4 }
const CUTS = [T.cut1, T.cut2, T.cut3, T.cut4]
const REC = { at: T.rec, len: 1.2, caption: 'eleven reads. *zero replies.*', top: 1180 }
const S = 'THE STARS', PI = '♓︎ PISCES · LIVE'
const OTHERS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius']
const LINES = [
  { t: 1.6, speaker: S + ' · V.O.', text: '9:40 p.m. Pisces asks: *anyone up?*' },
  { t: 4.7, speaker: S + ' · V.O.', text: 'eleven windows. all lit. all *typing.*' },
  { t: 8.1, speaker: S + ' · V.O.', text: 'just… not in *that* chat.' },
  { t: 12.7, speaker: PI, color: '#8fd0ff', text: 'you guys… *YOU GUYS.*' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'chat' : t < T.cut3 ? 'city' : t < T.cut4 ? 'chat2' : 'door'
const ASK = { at: -9, side: 'L', text: '♓ anyone up?', time: '9:40 PM · Read by 11' }

function cake(x, cx, cy, k = 1) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  px(x, -110, -50, 220, 100, INK); px(x, -104, -44, 208, 88, '#f4ecd8'); px(x, -104, -44, 208, 22, '#ff8fb1')
  px(x, -130, 46, 260, 18, INK); px(x, -124, 48, 248, 12, '#c9c4dc')
  for (let i = 0; i < 3; i++) { px(x, -50 + i * 50 - 5, -80, 10, 34, '#7fd0ff'); px(x, -50 + i * 50 - 6, -96, 12, 16, '#ffd23a') }
  x.restore()
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne13', duration: D, end: 'loop',
  heads: [
    { text: 'BREAKING: The group chat | has gone *silent.*', at: -1, out: [4.2, 4.4], accent: '#7fd0ff' },
    { text: 'SKY CAM: | *eleven* windows.', at: T.cut2 + 0.05, out: [7.6, 7.8], accent: GOLD },
    { text: 'The *other* | chat.', at: T.cut3 + 0.05, out: [10.85, 11.0], accent: PINK },
    { text: 'Silence was a | *surprise.*', at: T.last, gap: 0.08, accent: GOLD, size: 108, accentSize: 156 },
  ],
  lines: LINES, box: { open: 1.4, close: 17.5 },
  cuts: CUTS, recs: [REC],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0) + (t > T.open && t < T.open + 0.4 ? 14 * Math.exp(-(t - T.open) * 8) * Math.sin((t - T.open) * 55) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk') {
      studio(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#16103a', bot: '#0e0a26' })
          phone(xx, tt, { cx: 540, cy: 680, w: 300, h: 300, title: '✦ the stars (12)', font: 18, msgs: [{ at: -9, side: 'L', text: 'anyone up?', time: 'Read by 11' }] })
        },
      })
      anchor(x, t, { mood: 'wide', look: [0.3, -0.6], hops: [0.2] })
      px(x, 700, 1040, 200, 110, INK); px(x, 706, 1046, 188, 98, BONE); txt(x, 'PISCES', 800, 1076, { size: 22, weight: 800, font: INTER, color: INK, shadow: false }); txt(x, 'OFF TONIGHT', 800, 1110, { size: 22, weight: 900, font: INTER, color: RED, shadow: false })
      desk(x, t)
      papers(x, t, -0.3)
      chyron(x, t, { t0: 1.15, label: 'BREAKING', text: 'GROUP CHAT · 11 READ · 0 REPLIES' })
      slam(x, t, { t0: -0.15, land: T.slam, dock: [1.0, 1.3] })
    } else if (sh === 'chat') {
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      const bs = phone(x, st, { cx: 540, cy: 900, w: 640, h: 760, title: '✦ the stars (12)', status: '11 members online', msgs: [ASK] })
      if (bs[0]) caught(x, t, bs[0].tx + 120, bs[0].ty, 150, T.cut1 + 0.5, { w: 10 })
      for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; x.globalAlpha = 1 - p; txt(x, '…', 540 + (i - 1) * 120, 1100 - p * 60, { size: 48, color: BONE }); x.globalAlpha = 1 }
      sign(x, st, 'pisces', { x: 890, y: 1250, s: 150, mood: 'wide', look: [-1, -1], seed: 6, tears: 1 })
      chyron(x, t, { t0: T.cut1, label: 'BREAKING', text: '“ANYONE UP?” · READ BY 11 · NO REPLY' })
    } else if (sh === 'city') {
      live(x, t, FULL, {
        label: 'SKY CAM', place: 'THE WHOLE CITY', clock: '9:44 PM', draw: (xx, tt, R) => {
          room(xx, R, { top: '#0c0828', bot: '#1a1040' })
          OTHERS.forEach((id, i) => {
            const c = i % 4, r = Math.floor(i / 4)
            const cx = 170 + c * 220 + (r % 2) * 110, cy = 620 + r * 230
            const k = pop01(tt, T.cut2 + 0.15 + i * 0.12, 0.3, 2)
            if (k < 0.01) return
            windowFrame(xx, cx, cy, 170 * k, 150 * k, w => sign(w, tt, id, { x: cx, y: cy + 30, s: 100 * k, mood: 'squint', look: [0, 1], seed: 20 + i, glyph: false }))
            for (let d = 0; d < 3; d++) px(xx, cx - 30 + d * 22, cy - 100, 14, 14, Math.floor(tt * 8 + i) % 3 === d ? BONE : '#8a83b8')
          })
        },
      })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: 'ELEVEN SIGNS · ALL ONLINE · ALL TYPING' })
    } else if (sh === 'chat2') {
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      const m = (at, who, text, col) => ({ at, side: 'L', text: `${who} ${text}`, col })
      phone(x, t, { cx: 540, cy: 900, w: 660, h: 780, title: '🎉 PISCES BDAY (11)'.replace('🎉 ', '✦ '), status: 'secret', font: 30, msgs: [
        m(8.0, '♉', 'cake: secured', '#5a4a2a'), m(8.5, '♌', 'balloons: me', '#7a4a1a'), m(9.0, '♍', 'door at 10:15. sharp.', '#2a5a4a'), m(9.5, '♏', 'act normal in the main chat', '#5a2a4a'), m(10.0, '♊', 'I CAN’T act normal', '#2a5a5a'),
      ] })
      stamp(x, t, 540, 1220, 'SECRET CHAT', T.cut3 + 0.4, { size: 54, col: PINK, bg: 'rgba(20,10,40,0.9)' })
      chyron(x, t, { t0: T.cut3, label: 'REVEAL', text: 'A SECOND CHAT · CODE NAME: CAKE' })
    } else {
      live(x, t, FULL, {
        place: 'PISCES’S DOOR', clock: '10:15 PM', draw: (xx, tt, R) => {
          room(xx, R, { top: '#3a2a6a', bot: '#24184a', floor: '#4a3470' })
          const fy = R.y0 + (R.y1 - R.y0) * 0.86
          const op = ease.outCubic(prog(tt, T.open, T.open + 0.5))
          // the doorway: closed door swings to reveal the crowd
          px(xx, 260, 540, 560, fy - 540, INK)
          xx.save(); xx.beginPath(); xx.rect(268, 548, 544, fy - 548); xx.clip()
          px(xx, 268, 548, 544, fy - 548, '#ffd99a')
          if (op > 0) OTHERS.forEach((id, i) => sign(xx, tt, id, { x: 320 + (i % 6) * 90 + (i >= 6 ? 45 : 0), y: i >= 6 ? 1010 : 880, s: 110, mood: 'happy', seed: 30 + i, glyph: false, hops: [T.open + 0.1 + i * 0.03, T.open + 0.8 + i * 0.04] }))
          if (op > 0) cake(xx, 540, 1100, op)
          xx.restore()
          if (op < 1) { px(xx, 268, 548, 544 * (1 - op), fy - 548, '#6a3a7a'); px(xx, 268 + 544 * (1 - op) - 40, (548 + fy) / 2, 20, 20, GOLD) }
          const F = sign(xx, tt, 'pisces', { x: 900, y: 1130, s: 230, mood: tt > T.cry ? 'happy' : tt > T.open ? 'wide' : 'neutral', look: [-1, 0], seed: 6, hops: [T.cry, T.cry + 0.4, T.cry + 0.8, 14.0] })
          tears(xx, tt, F, tt > T.cry ? 3 : 1)
          if (tt > T.knock && tt < T.open) chip(xx, 540, 500, 'KNOCK KNOCK', { size: 28, color: GOLD })
          bubble(xx, tt, 540, 520, T.open + 0.05, null, 'SURPRISE!!', { size: 44, col: '#ffe27a' })
          sparkles(xx, tt, 540, 800, T.open + 0.1, 16, 340, 1, [GOLD, PINK, BONE, TEAR])
        },
      })
      chyron(x, t, { t0: T.cut4, label: 'LIVE', text: 'ELEVEN SIGNS · ONE CAKE · ONE VERY HAPPY PISCES' })
    }
    ticker(x, t, { y: 1404, items: ['MAIN CHAT: SILENT', 'SECRET CHAT: VERY LOUD', 'CAKE: SECURED', 'HAPPY BIRTHDAY, PISCES'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2),
    ...OTHERS.map((_, i) => popCue(T.cut2 + 0.15 + i * 0.12, [659.25, 739.99, 880, 987.77][i % 4], 0.03, (i % 2 ? 0.3 : -0.3))),
    ['tick', T.cut3, 0.05], ...[8.0, 8.5, 9.0, 9.5, 10.0].map((a, i) => popCue(a, [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.04, i % 2 ? 0.2 : -0.2)), ['boom', T.cut3 + 0.45, 0.15],
    ['tom', T.knock, 140, { gain: 0.2, decay: 0.15 }], ['tom', T.knock + 0.25, 140, { gain: 0.2, decay: 0.15 }],
    ...slamCues(T.open, 0.8), ['glitter', T.open, T.open + 0.9], ['clap', T.open + 0.1, { gain: 0.16 }], ['clap', T.open + 0.35, { gain: 0.16 }], ['clap', T.open + 0.6, { gain: 0.16 }],
    ...sobCues(T.cry, 3), ...sobCues(13.6, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
