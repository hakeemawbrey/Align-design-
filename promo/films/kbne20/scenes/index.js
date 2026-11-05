// kbne20: BREAKING NEWS: THE STARS, Ep 20 (long) · "Year in Review: The Stars' Biggest Stories" (90 s vertical, star_talk
// post, music: cinematic · C). No end card, no card cut: the last 0.4 s blends back into frame 0 (kit loopBack).
// Show look: ../../kbne01/newskit.js. Promise up front: "THE TOP STORY WILL GET YOU". Five chapter stickers.
// Every sign gets one small, sweet win; a picture-in-picture of ♓ Pisces cries a little harder at each story.
//   0–6     frame 0: mid-whip into the desk, the slab mid-slam, the monitor spinning through the year, twelve thumbnails
//           flying, Pisces mid-sob. Hook: "BREAKING: The year's biggest stories. | *All twelve.*"
//   1 SPRING (6–22): ♈ Aries said sorry first · ♉ Taurus split the dessert · ♊ Gemini put the phone away at dinner.
//   2 SUMMER (22–38): ♋ Cancer went to the party solo and loved it · ♌ Leo let a friend tell the story · ♍ Virgo left the
//           dishes till morning.
//   3 AUTUMN (38–54): ♎ Libra said no and felt fine · ♏ Scorpio told a friend the whole truth · ♐ Sagittarius showed up
//           on time.
//   4 WINTER (54–70): ♑ Capricorn took a real day off · ♒ Aquarius remembered a birthday · the whole group threw a
//           surprise party.
//   5 TOP STORY (70–90): a drumroll; "our co-anchor cried at every single *story.*" The newsroom holds up AND WE LOVE YOU
//           FOR IT; everyone cries. Last headline (85.4): "Small news. | *Big* year."  89.6–90 loops back to frame 0.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, caught, bubble, chip, txt, px, sparkles, tears, slam, stamp, promise, chap, drawBits,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, SERIF, GOLD, BONE, RED, INK, TEAR, PINK, CYAN, GREEN, LAV,
} from '../../kbne01/newskit.js'
import { chapter, chapterCues } from '../../hookkit.js'

const D = 90
const ALL = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const G = { aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓' }
// the twelve stories: [start, sign(s), month, headline, prop bitmap key, V.O. line]
const STORIES = [
  [6.4, 'aries', 'MARCH', 'ARIES SAID SORRY FIRST', 'heart', 'March: an Aries said *sorry* first. no tie-breaker needed.'],
  [11.8, 'taurus', 'APRIL', 'TAURUS SPLIT THE DESSERT', 'cake', 'April: a Taurus *split* the dessert. voluntarily.'],
  [17.2, 'gemini', 'MAY', 'GEMINI PUT THE PHONE AWAY AT DINNER', 'phone', 'May: a Gemini put the phone *away.* for a whole dinner.'],
  [22.4, 'cancer', 'JUNE', 'CANCER WENT TO THE PARTY SOLO', 'star', 'June: Cancer went to the party *solo.* and loved it.'],
  [27.8, 'leo', 'JULY', 'LEO LET A FRIEND TELL THE STORY', 'spot', 'July: a Leo let a friend tell the *story.* the whole story.'],
  [33.2, 'virgo', 'AUGUST', 'VIRGO LEFT THE DISHES TILL MORNING', 'dish', 'August: a Virgo left the dishes till *morning.*'],
  [38.4, 'libra', 'SEPTEMBER', 'LIBRA SAID NO. FELT FINE.', 'check', 'September: a Libra said *no.* and felt fine about it.'],
  [43.8, 'scorpio', 'OCTOBER', 'SCORPIO TOLD A FRIEND THE WHOLE TRUTH', 'heart', 'October: a Scorpio told a friend the *whole* truth.'],
  [49.2, 'sagittarius', 'NOVEMBER', 'SAGITTARIUS SHOWED UP ON TIME', 'clock', 'November: a Sagittarius showed up *on time.* early, even.'],
  [54.4, 'capricorn', 'DECEMBER', 'CAPRICORN TOOK A REAL DAY OFF', 'sun', 'December: a Capricorn took a *real* day off.'],
  [59.8, 'aquarius', 'DECEMBER', 'AQUARIUS REMEMBERED A BIRTHDAY', 'cake', 'also December: an Aquarius *remembered* a birthday.'],
  [65.2, 'group', 'DECEMBER', 'THE GROUP CHAT THREW A SURPRISE PARTY', 'cake', 'and the group chat went quiet… for a *surprise party.*'],
]
const T = { slam: 0.15, desk: 1.3, ch2: 22.0, ch3: 38.0, ch4: 54.0, ch5: 70.6, drum: [71.0, 73.4], reveal: 73.5, newsroom: 77.6, cry: 81.4, deskF: 83.6, last: 85.4 }
const CUTS = [6.0, ...STORIES.slice(1).map(s => s[0] - 0.3), T.ch5, T.newsroom, T.deskF]
const CH = [chap(6.1, 1, 'Spring'), chap(T.ch2 + 0.1, 2, 'Summer'), chap(T.ch3 + 0.1, 3, 'Autumn'), chap(T.ch4 + 0.1, 4, 'Winter'), chap(T.ch5 + 0.1, 5, 'Top story')]
const S = 'THE STARS', PI = '♓︎ PISCES'
const LINES = [
  { t: 1.6, speaker: S, text: 'good evening, and welcome to the year in *review.*' },
  ...STORIES.map(s => ({ t: s[0] + 0.3, speaker: S + ' · V.O.', text: s[5] })),
  { t: 71.0, speaker: S, text: 'and our top story of the year…' },
  { t: 74.0, speaker: S, text: 'our co-anchor cried at every single *story.*' },
  { t: 78.0, speaker: S, text: 'and we have something to *say* about that.' },
  { t: 81.6, speaker: PI, color: '#8fd0ff', text: 'you GUYS. (sob) *you guys.*' },
]
const story = t => { let k = 0; for (let i = 0; i < STORIES.length; i++) if (t >= STORIES[i][0] - 0.3) k = i; return k }
const shot = t => t < 6.0 ? 'desk0' : t < T.ch5 ? 'story' : t < T.newsroom ? 'deskTop' : t < T.deskF ? 'newsroom' : 'deskF'
const SEASON = i => i < 3 ? ['#3a6a4a', '#2a4a3a'] : i < 6 ? ['#6a5a2a', '#4a3a1a'] : i < 9 ? ['#6a3a2a', '#3a2418'] : ['#2a3a6a', '#1a2448']
const BM = {
  heart: [['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }],
  cake: [['..C.C.C..', '..F.F.F..', 'PPPPPPPPP', 'WWWWWWWWW', 'WWWWWWWWW', 'PPPPPPPPP'], { C: '#ffd23a', F: '#ff8f6a', P: '#ff8fb1', W: '#f4ecd8' }],
  phone: [['.KKKKK.', 'KBBBBBK', 'KBBBBBK', 'KBBBBBK', 'KBBBBBK', 'KBBBBBK', '.KKKKK.'], { K: '#3a2d74', B: '#120c2a' }],
  star: [['...G...', '..GGG..', 'GGGGGGG', '.GGGGG.', '.GG.GG.'], { G: GOLD }],
  spot: [['..YYY..', '.YYYYY.', 'YYYYYYY', '..YYY..'], { Y: '#fff1c8' }],
  dish: [['.WWWWW.', 'WWBBBWW', 'WBBBBBW', 'WWBBBWW', '.WWWWW.'], { W: '#f4ecd8', B: '#8fd0ff' }],
  check: [['......G', '.....GG', 'G...GG.', 'GG.GG..', '.GGG...', '..G....'], { G: GREEN }],
  clock: [['.WWWWW.', 'WW.K.WW', 'W..K..W', 'W..KKKW', 'W.....W', 'WW...WW', '.WWWWW.'], { W: '#f4ecd8', K: INK }],
  sun: [['.....S.....', '..S..S..S..', '...SSSSS...', 'SSSSSSSSSSS', '...SSSSS...', '..S..S..S..', '.....S.....'], { S: '#ffd23a' }],
}
function pip(x, t, i) {
  // Pisces reacts, picture-in-picture, crying harder each story
  const X0 = 760, Y0 = 1060, w = 250, h = 210
  px(x, X0 - 8, Y0 - 8, w + 16, h + 16, INK); px(x, X0 - 4, Y0 - 4, w + 8, h + 8, BONE)
  x.save(); x.beginPath(); x.rect(X0, Y0, w, h); x.clip(); room(x, { x0: X0, y0: Y0, x1: X0 + w, y1: Y0 + h }, { top: '#2a1d5c', bot: '#1a1440' })
  const F = sign(x, t, 'pisces', { x: X0 + w / 2, y: Y0 + 150, s: 150, mood: i % 3 === 2 ? 'happy' : 'sparkle', seed: 6, glyph: false, hops: [STORIES[i][0] + 0.8] })
  tears(x, t, F, i < 3 ? 1 : i < 7 ? 2 : 3)
  x.restore()
  txt(x, 'CO-ANCHOR CAM', X0 + w / 2, Y0 + h - 14, { size: 16, color: TEAR })
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne20', duration: D, end: 'loop',
  heads: [
    { text: 'BREAKING: The year’s biggest stories. | *All twelve.*', at: -1, out: [5.8, 6.0], accent: GOLD },
    { text: '*Spring.*', at: 6.1, out: [21.8, 22.0], accent: '#9fe6b0' },
    { text: '*Summer.*', at: T.ch2 + 0.1, out: [37.8, 38.0], accent: '#ffe27a' },
    { text: '*Autumn.*', at: T.ch3 + 0.1, out: [53.8, 54.0], accent: '#ff8f6a' },
    { text: '*Winter.*', at: T.ch4 + 0.1, out: [70.4, 70.6], accent: '#7fd0ff' },
    { text: 'The *top* | story.', at: T.ch5 + 0.1, out: [85.2, 85.4], accent: TEAR },
    { text: 'Small news. | *Big* year.', at: T.last, gap: 0.09, accent: GOLD, size: 116, accentSize: 168 },
  ],
  lines: LINES, box: { open: 1.4, close: 89.5 },
  cuts: CUTS, fx: CH.map(c => chapter(c)), fxCues: CH.flatMap(c => chapterCues(c)),
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0) + (t > T.reveal && t < T.reveal + 0.4 ? 18 * Math.exp(-(t - T.reveal) * 10) * Math.sin((t - T.reveal) * 60) : 0),
  over(x, t) { promise(x, t, 'THE TOP STORY WILL GET YOU', [0.2, 5.6]) },
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh.startsWith('desk')) {
      const top = sh === 'deskTop', f = sh === 'deskF'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#2a1d5c', bot: '#1a1440' })
          if (sh === 'desk0' || f) {
            // the year spinning: twelve thumbnails orbiting the monitor
            ALL.forEach((id, i) => { const a = i / 12 * Math.PI * 2 + tt * 1.4; const X = 540 + Math.cos(a) * 200, Y = 675 + Math.sin(a) * 110; px(xx, X - 34, Y - 30, 68, 60, INK); px(xx, X - 30, Y - 26, 60, 52, '#3a2d74'); sign(xx, tt, id, { x: X, y: Y + 14, s: 46, seed: 20 + i, glyph: false, mood: 'happy' }) })
            txt(xx, 'THE YEAR', 540, 680, { size: 44, weight: 900, font: INTER, color: GOLD })
            return
          }
          if (top && tt < T.reveal) { txt(xx, '???', 540, 690, { size: 110, weight: 900, font: INTER, color: GOLD, alpha: 0.6 + 0.4 * Math.sin(tt * 20) }); return }
          sign(xx, tt, 'pisces', { x: 540, y: 760, s: 170, mood: 'happy', seed: 6, tears: 3 })
          chip(xx, 540, 600, 'STORY OF THE YEAR', { size: 20, color: GOLD })
        },
        a: { mood: f ? (t > T.last ? 'sparkle' : 'happy') : top ? (t > T.reveal ? 'sparkle' : 'squint') : 'wide', look: top ? [1, -0.4] : [0.3, -0.4], hops: f ? [84.0, 84.8, T.last] : top ? [71.1, 71.7, T.reveal, 74.1, 74.7] : [1.7, 2.3, 2.9] },
        p: { mood: top && t < T.reveal ? 'wide' : 'happy', tears: f ? 3 : top ? (t > T.reveal ? 3 : 2) : 2, tissue: f ? 1 : 0, look: top && t > T.reveal ? [-1, 0] : [-1, -0.5], hops: f ? [83.8, 84.2, 84.6, 85.1] : top ? [T.reveal + 0.1, 74.4, 75.0, 76.0] : [0.25] },
        chyron: { t0: sh === 'desk0' ? 1.15 : top ? T.ch5 : T.deskF, label: top ? 'TOP STORY' : sh === 'desk0' ? 'BREAKING' : 'YEAR IN REVIEW', text: sh === 'desk0' ? 'THE YEAR IN REVIEW · TWELVE STORIES · ALL GOOD NEWS' : top ? (t < T.reveal ? 'AND THE TOP STORY IS…' : 'PISCES · CRIED AT EVERY SINGLE STORY') : 'SMALL NEWS · BIG YEAR · SEE YOU NEXT YEAR' },
        slam: sh === 'desk0' ? { t0: -0.15, land: T.slam, dock: [1.0, 1.3], text: 'YEAR IN REVIEW' } : null, papers: sh === 'desk0' ? -0.3 : null,
      })
      if (top && t > T.reveal) stamp(x, t, 540, 860, 'PISCES', T.reveal, { size: 110, col: TEAR, bg: 'rgba(20,10,40,0.9)', t1: T.newsroom - 0.3 })
      if (top && t > T.drum[0] && t < T.reveal) for (let i = 0; i < 6; i++) { const p = (t * 3 + i / 6) % 1; x.globalAlpha = 1 - p; txt(x, 'DRUMROLL', 540 + Math.sin(i * 2) * 300, 620 + p * 300, { size: 26, color: GOLD }); x.globalAlpha = 1 }
    } else if (sh === 'story') {
      const i = story(t), [t0, who, month, head, prop] = STORIES[i]
      const [top, bot] = SEASON(i)
      live(x, t, FULL, {
        label: 'ARCHIVE', place: month, clock: `STORY ${i + 1} / 12`, draw: (xx, tt, R) => {
          room(xx, R, { top, bot, floor: 'rgba(0,0,0,0.25)' })
          // season details: leaves / sun / snow
          for (let k = 0; k < 14; k++) { const X = (k * 83 + tt * (i < 3 ? 10 : i < 9 ? 30 : 20)) % 1000 + 40, Y = R.y0 + ((k * 61 + tt * (i < 9 ? 50 : 70)) % (R.y1 - R.y0)); px(xx, X, Y, 10, 10, i < 3 ? '#ffb3c8' : i < 6 ? 'rgba(255,230,160,0.4)' : i < 9 ? '#ff8f6a' : '#ffffff') }
          const zoom = 1 + 0.06 * prog(tt, t0, t0 + 5)
          xx.save(); xx.translate(540, 980); xx.scale(zoom, zoom); xx.translate(-540, -980)
          if (who === 'group') ALL.slice(0, 11).forEach((id, j) => sign(xx, tt, id, { x: 160 + (j % 6) * 150 + (j >= 6 ? 75 : 0), y: j >= 6 ? 1100 : 960, s: 120, mood: 'happy', seed: 30 + j, glyph: false, hops: [t0 + 0.4 + j * 0.05, t0 + 1.8 + j * 0.05] }))
          else sign(xx, tt, who, { x: 420, y: 1040, s: 300, mood: 'happy', look: [1, -0.3], seed: 40 + i, hops: [t0 + 0.4, t0 + 1.4, t0 + 2.6, t0 + 3.8] })
          const [bm, cols] = BM[prop]
          drawBits(xx, bm, cols, who === 'group' ? 540 : 760, who === 'group' ? 720 : 860 - 10 * Math.sin(tt * 3), 18 * pop01(tt, t0 + 0.5, 0.35, 2.4))
          xx.restore()
          sparkles(xx, tt, 760, 860, t0 + 0.55, 12, 180, i, [GOLD, BONE, PINK])
          chip(xx, 540, 640, `${who === 'group' ? '✦' : G[who]} ${month}`, { size: 30, color: GOLD, k: pop01(tt, t0, 0.3, 2) })
        },
      })
      pip(x, t, i)
      chyron(x, t, { t0: t0 - 0.3, label: month, text: head })
    } else if (sh === 'newsroom') {
      live(x, t, FULL, {
        label: 'LIVE', place: 'THE NEWSROOM', clock: '11:59 PM', draw: (xx, tt, R) => {
          room(xx, R, { top: '#2a1d5c', bot: '#1a1440', floor: '#2a1f55' })
          // eleven signs holding up one long card
          const k = pop01(tt, T.newsroom + 0.4, 0.4, 2)
          ALL.slice(0, 11).forEach((id, j) => { const F = sign(xx, tt, id, { x: 110 + j * 86, y: 1110, s: 110, mood: tt > T.cry ? 'happy' : 'sparkle', seed: 50 + j, glyph: false, hops: [T.newsroom + 0.3 + j * 0.04, T.cry + j * 0.05] }); if (tt > T.cry) tears(xx, tt, F, 2) })
          xx.save(); xx.translate(540, 820); xx.scale(k, k)
          px(xx, -480, -110, 960, 220, INK); px(xx, -472, -102, 944, 204, '#f4ecd8')
          txt(xx, 'AND WE LOVE YOU', 0, -34, { size: 64, weight: 900, font: INTER, color: RED, shadow: false })
          txt(xx, 'FOR IT.', 0, 46, { size: 64, weight: 900, font: INTER, color: RED, shadow: false })
          xx.restore()
          const P = sign(xx, tt, 'pisces', { x: 540, y: 620, s: 170, mood: tt > T.cry ? 'happy' : 'wide', seed: 6, hops: [T.cry, T.cry + 0.4, T.cry + 0.8, T.cry + 1.2] })
          tears(xx, tt, P, 3)
          for (let j = 0; j < 4; j++) drawBits(xx, BM.heart[0], BM.heart[1], 200 + j * 230, 560 - 30 * Math.sin(tt * 2 + j), 7 * pop01(tt, T.cry + j * 0.15, 0.3, 2.4))
        },
      })
      chyron(x, t, { t0: T.newsroom, label: 'LIVE', text: 'THE NEWSROOM HAS A MESSAGE · TISSUES DISTRIBUTED' })
    }
    ticker(x, t, { y: 1404, items: ['THE YEAR IN REVIEW', 'TWELVE STORIES', 'ALL OF THEM GOOD', 'CO-ANCHOR: CRYING (HAPPY)', 'SEE YOU NEXT YEAR'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ['whoosh', 0.3, 1.2, 0.03],
    ...STORIES.flatMap((s, i) => [popCue(s[0] + 0.5, [659.25, 739.99, 880, 987.77, 1174.66, 1318.51][i % 6], 0.045, 0), ['glitter', s[0] + 0.55, s[0] + 1.0], ['pluck', s[0] + 0.85, 1567.98, 0.03, 0.4, 0.4]]),
    ...sobCues(9.0, 2), ...sobCues(25.0, 2), ...sobCues(41.0, 3), ...sobCues(57.0, 3), ...sobCues(67.0, 3),
    ...stingCues(T.ch5 + 0.1, 0.9), ...Array.from({ length: 20 }, (_, i) => ['tom', +(T.drum[0] + i * 0.12).toFixed(2), 160, { gain: 0.06 + 0.006 * i, decay: 0.08 }]),
    ...slamCues(T.reveal, 1), ['bell', T.reveal + 0.05, 1760, 0.04, 1.5, 0], ['glitter', T.reveal, T.reveal + 0.8],
    ['swell', T.newsroom, T.newsroom + 1.2, { gain: 0.04 }], popCue(T.newsroom + 0.5, 1174.66, 0.045, 0), ...slamCues(T.cry, 0.5), ['glitter', T.cry, T.cry + 1.0], ...sobCues(T.cry + 0.1, 3), ...sobCues(83.8, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
