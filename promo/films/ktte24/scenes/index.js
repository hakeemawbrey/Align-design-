// ktte24: THIS OR THAT: LOVE EDITION (long), "The Best First Date Tournament" (60 s vertical, star advice trial reel,
// pop · D). Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
// Eight first-date ideas, the 12 signs as judges: each match they run to the card they'd pick; the loser card flies.
// A bracket strip at the top crosses out each eliminated date. No counts on screen: it's characters, not a survey.
//   frame 0: two date cards mid-smash (PICNIC vs BOWLING), the judges mid-stampede; whip zoom.
//   promise: "stay for the final."   chapters: 1 QUARTERFINALS · 2 SEMIFINALS · 3 THE FINAL · 4 THE WINNER
//   QF: PICNIC beats BOWLING · MINI GOLF beats MUSEUM · COFFEE WALK beats COOKING CLASS · STARGAZING beats ARCADE
//   SF: the upset, STARGAZING beats MINI GOLF (Leo: "WHAT?!") · COFFEE WALK beats PICNIC (Pisces: "bye, picnic…")
//   FINAL: STARGAZING vs COFFEE WALK splits evenly: TIE! → SUDDEN DEATH: Cancer switches ("you can TALK on a walk")
//   → COFFEE WALK wins; confetti, Pisces cries at every elimination and loudest at the end.
//   Last: "Best date: *the one where you talk.*" Hard cut.
import { makeTT, bubble, label, pop01, outK, R, RED, GOLD, BONE, INK, INTER, MONO, confetti, hearts } from '../../ktte01/scenes/ttkit.js'
import { chapter, chapterCues } from '../../hookkit.js'

// judges: 0 ari 1 tau 2 gem 3 can 4 leo 5 vir 6 lib 7 sco 8 sag 9 cap 10 aqu 11 pis
const M = (a, b, ia, ib, pick, win, note) => ({ a, b, ia, ib, pick, win, d: 7.0, pickAt: 0.9, winAt: 2.7, stagger: 0.07, note,
  cues: [['bell', 2.7, 1318.51, 0.04, 1.2, 0], ['pop', 2.75, 1760, 0.035, 0.2], ['whoosh', 2.72, 0.3, 0.04]] })
const P = s => [...s]   // 'abba…' → one pick per judge, in judge order
const rounds = [
  M('PICNIC', 'BOWLING', 'heart', 'star', P('bababaaabaaa'), 'a', ['SAGITTARIUS', 'bowling shoes though!!']),   // BOWLING: ari gem leo sag
  M('MUSEUM', 'MINI GOLF', 'star', 'hand', P('bbbbbabbbaaa'), 'b', ['VIRGO', 'the museum has labels…']),       // MUSEUM: vir sco cap aqu pis
  M('COOKING CLASS', 'COFFEE WALK', 'fork', 'heart', P('babaaabbbbbb'), 'b', ['TAURUS', 'but… the snacks.']),                               // COOKING: tau can leo vir
  M('STARGAZING', 'ARCADE', 'star', 'spark', P('babaaaaabaaa'), 'a', ['ARIES', 'arcade had a SCOREBOARD']),                                 // ARCADE: ari gem sag
  { ...M('MINI GOLF', 'STARGAZING', 'hand', 'star', P('ababababbabb'), 'b', ['LEO', 'WHAT?! mini golf was RIGHT THERE']), d: 7.0 },   // MINI GOLF: ari gem leo lib sag
  { ...M('PICNIC', 'COFFEE WALK', 'heart', 'heart', P('babaabbbbaba'), 'b', ['PISCES', 'bye, picnic…']), d: 7.0 },   // PICNIC: tau can (leo) cap pis
  { a: 'STARGAZING', b: 'COFFEE WALK', ia: 'star', ib: 'heart', pick: P('bbbaabbaabaa'), d: 5.6, pickAt: 0.9, stagger: 0.07, tie: true },     // an even split
  { a: 'STARGAZING', b: 'COFFEE WALK', ia: 'star', ib: 'heart', pick: P('bbbbabbaabaa'), win: 'b', d: 6.2, pickAt: 1.0, winAt: 3.0, stagger: 0.07, sd: true,   // Cancer switches
    cues: [['bell', 3.0, 1318.51, 0.05, 1.6, 0], ['pop', 3.05, 1760, 0.04, 0.2]] },
]

const NAMES = ['PICNIC', 'BOWLING', 'MUSEUM', 'MINI GOLF', 'COOKING CLASS', 'COFFEE WALK', 'STARGAZING', 'ARCADE']
const OUT = { BOWLING: 0, MUSEUM: 1, 'COOKING CLASS': 2, ARCADE: 3, 'MINI GOLF': 4, PICNIC: 5, STARGAZING: 7 }   // eliminated in round i
const EP = makeTT({
  id: 'ktte24', mode: 'crowd',
  hook: '8 DATES. 12 JUDGES. | *ONE WINNER.*', accent: '#ff8fb1',
  brk: { kind: 'whip', t: 0.12 },
  rounds, r0: -0.4,
  last: 'Best date: | *the one where you talk.*',
  ending: 'cut', fin: 5.2, finSide: 'b', finY: 760,
  over(x, t, S) {
    const T = S.T, v = S.v
    // the bracket strip: 8 pills, crossed out as they're eliminated
    if (v > T.hookOut + 0.2 && v < T.E - 0.1) {
      NAMES.forEach((n, i) => {
        const cx = 160 + (i % 4) * 253, cy = i < 4 ? 378 : 420
        const oi = OUT[n], r = oi != null ? T.rounds[oi] : null
        const gone = r ? v >= r.t0 + (r.winAt ?? r.pickAt + 1) : false
        const champ = n === 'COFFEE WALK' && v >= T.E
        x.font = `700 22px ${MONO}`; const w = 236
        R(x, INK, cx - w / 2 - 3, cy - 17, w + 6, 34); R(x, champ ? GOLD : gone ? '#2a2148' : '#3a2d66', cx - w / 2, cy - 14, w, 28)
        x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = champ ? INK : gone ? 'rgba(239,230,214,0.35)' : BONE; x.fillText(n, cx, cy + 1)
        if (gone) R(x, RED, cx - w / 2 + 10, cy - 2, w - 20, 5)
      })
    }
    // the promise
    bubble(x, t, 540, 1700, 1.3, 7.0, 'stay for the final.', { size: 42, col: '#ffe6a6' })
    // judge comments + TIE / SUDDEN DEATH stamps
    for (const r of T.rounds) {
      if (r.note) { const a = T.realOf(r.t0 + 3.0); bubble(x, t, 540, 1052, a, a + 2.6, `${r.note[0]}: ${r.note[1].replace(/\*/g, '')}`, { size: 36 }) }
      if (r.tie) { const a = T.realOf(r.t0 + 2.4), k = pop01(t, a, 0.25, 2.6) * outK(t, [T.realOf(r.t1) - 0.2, T.realOf(r.t1)]); if (k > 0.01) label(x, 'TIE!', 540, 1080, { size: 140 * k, col: RED, font: INTER, weight: 800, rot: -0.08 }) }
      if (r.sd) {
        const a = T.realOf(r.t0 + 0.05), k = pop01(t, a, 0.25, 2.6) * outK(t, [a + 1.0, a + 1.2]); if (k > 0.01) label(x, 'SUDDEN DEATH', 540, 1080, { size: 90 * k, col: RED, font: INTER, weight: 800, rot: -0.06 })
        bubble(x, t, 540, 1052, T.realOf(r.t0 + 1.6), T.realOf(r.t0 + 4.2), 'CANCER: wait. you can TALK on a walk.', { size: 34 })
      }
    }
    if (v >= T.E - 0.3) { confetti(x, t, T.realOf(T.E - 0.2), 540, 700, { n: 40 }); hearts(x, t, T.realOf(T.E + 0.2), 955, 1420, { n: 6 }) }
  },
  fx(T) {
    const real = v => +T.realOf(v).toFixed(3)
    const at = [real(T.hookOut + 0.25), real(T.rounds[4].t0), real(T.rounds[6].t0), real(T.rounds[7].t0 + 3.0)]
    T.chap = at
    const scenes = [], cues = []
    ;['QUARTERFINALS', 'SEMIFINALS', 'THE FINAL', 'THE WINNER'].forEach((title, i) => { const C = { at: at[i], out: [at[i] + 3.0, at[i] + 3.3], n: i + 1, title, y: 200 }; scenes.push(chapter(C)); cues.push(...chapterCues(C)) })
    return { scenes, cues }
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHAPTERS = EP.T.chap
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].t0 + 3.0).toFixed(3)
