// SPOT THE GREEN FLAG, the long (60 s) version: five rounds of the same split-screen game, used by ksge23 and ksge24.
// Built on ../../ksge01/scenes/greenkit.js and the shared hook kit. No end card, no card cut, no logo.
//
//   0.0–4.6     the hook: a full-frame mid-chaos intro (cfg.intro), the slam title on frame 0, a whip zoom, the promise
//               sticker ("round 5 is the hard one. stay.") by 1.4 s, Pisces already crying in the judge cam.
//   4.6 + 10.4·i   ROUND i+1 (10.4 s each): kit chapter sticker "n · TITLE"; the moment sticker; take A, take B;
//               a fast 3-2-1 on the divider under a record-scratch freeze; the reveal (flag, verdict banner, score +1);
//               THE STARS' one-line why. Round 5 runs longer and pays off the promise.
//   end         THE STARS' last line, then a hard cut (holds ≥ 1.5 s after typing) or the loop-back into frame 0.
//
//   makeGreenLong(cfg) → { DURATION, SCENES, CUES }
//     cfg.id, cfg.hook, cfg.promise, cfg.intro(x, t, C), cfg.last, cfg.ending, cfg.you
//     cfg.rounds: [{ sign, title, premise, win, why, takes: { A: { draw }, B: { draw } }, cues }] × 5
//       take draw(x, tk, S) gets the same S as the short format (S.focus.A / S.focus.B are round-local, tk round-local).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { dialogueBox, talkCues, lineTimes } from '../../startalk.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, screenShake, shakeCues, chapter, chapterCues, loopBack, loopCues } from '../../hookkit.js'
import { cast, drawPanel, drawTimer, drawJudge, buildBug, buildSticker, buildVerdict, flag, sparkles, confetti, hearts, R, box, PANEL, PW, PH, CAM, GREEN, GOLD, BONE, INK, INTER, SERIF, MONO, r3, pop01 } from '../../ksge01/scenes/greenkit.js'

export function makeGreenLong(cfg) {
  const INTRO = 4.6, RL = 10.8, CPS = 30
  // round-local times
  const R0 = { focusA: [0.7, 3.5], focusB: [3.5, 6.3], timer: [6.3, 6.8, 7.3, 7.8], reveal: 7.8, why: 8.25 }
  const rounds = cfg.rounds.map((r, i) => {
    const t0 = r3(INTRO + i * RL)
    const last = i === cfg.rounds.length - 1
    return { ...r, i, t0, t1: r3(t0 + RL), C: cast({ sign: r.sign, you: cfg.you }), last }
  })
  const END_ROUNDS = rounds[rounds.length - 1].t1
  const LASTT = r3(END_ROUNDS - 1.6)            // the final line starts over round 5's tail
  const FINAL = [{ t: LASTT, speaker: 'THE STARS', text: cfg.last }]
  const done = lineTimes(FINAL, { cps: CPS })[0].done
  const LOOP = cfg.ending === 'loop', LB = 0.4
  const DURATION = r3(done + 1.6 + (LOOP ? LB : 0))
  const WHY = rounds.filter(r => !r.last).map(r => [{ t: r3(r.t0 + R0.why), speaker: 'THE STARS', text: r.why }])
  const C0 = cast({ sign: rounds[0].sign, you: cfg.you })

  const HOOK = { at: -1, text: cfg.hook, top: 140, size: 96, accentColor: GREEN, out: [INTRO - 0.3, INTRO - 0.1], width: 1000 }
  const WHIP = { at: 0.15, len: 0.45, from: 1.45, cx: 540, cy: 850 }
  const WHIPS = rounds.map(r => ({ at: r.t0, len: 0.4, from: 1.3, cx: 540, cy: 850, flash: 0.25 }))
  const RECS = rounds.map(r => ({ at: r3(r.t0 + R0.timer[0]), len: r3(R0.reveal - R0.timer[0]), caption: r.ask || 'Which take, *quick?*', sub: `round ${r.i + 1} of 5`, top: 1610 }))
  const SHKS = rounds.map(r => ({ at: r3(r.t0 + R0.reveal), len: 0.45, amp: r.last ? 30 : 18 }))
  const CHAPS = rounds.map(r => ({ at: r.t0, out: [r3(r.t0 + 2.8), r3(r.t0 + 3.0)], n: r.i + 1, title: r.title, x: 70, y: 196, color: r.last ? '#ff8fb1' : GREEN }))
  const isWin = (r, s) => r.win === 'both' || r.win === s

  async function build(stage) {
    try { await Promise.all(["800 74px Inter", "800 50px Inter", "800 28px Inter", "italic 500 64px 'EB Garamond'", "italic 600 92px 'EB Garamond'", "700 24px 'Space Mono'", "700 20px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const promise = buildSticker(root, { text: cfg.promise, chip: 'STAY FOR IT', tilt: 1.4 })
    const premises = rounds.map(r => buildSticker(root, { text: r.premise, chip: `ROUND ${r.i + 1}` }))
    const verdicts = rounds.map(r => buildVerdict(root, r.win === 'both' ? `BOTH. <span style="font:italic 600 92px ${SERIF}">Green.</span>` : `GREEN FLAG: <span style="font:italic 600 92px ${SERIF}">Take ${r.win}</span>`))
    const whyBoxes = WHY.map((L, i) => dialogueBox(root, { lines: L, y: 1580, open: L[0].t - 0.22, close: rounds[i].t1 - 0.05, cps: CPS }))
    const finalBox = dialogueBox(root, { lines: FINAL, y: 1580, open: LASTT - 0.22, close: DURATION + 5, cps: CPS })
    const bug = buildBug(root)
    const score = el('div', { position: 'absolute', right: '56px', top: '56px', padding: '6px 14px', background: INK, border: `4px solid ${GREEN}`, font: `700 24px ${MONO}`, color: GREEN, letterSpacing: '0.06em', display: 'none' }, root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        drawSky(x, t, { ...SKY_H, dim: 0.5 })
        tx.clearRect(0, 0, 1080, 1920)
        const r = t < INTRO ? null : rounds.find(q => t >= q.t0 && (t < q.t1 || q.last)) || rounds[rounds.length - 1]
        let judge = { tears: 2, mood: 'wide', look: [0, -0.5], sweatOn: false, hops: [] }
        if (!r) {
          cfg.intro(x, t, C0)
        } else {
          const u = t - r.t0
          const tk = u < R0.timer[0] ? u : u < R0.reveal ? R0.timer[0] : R0.timer[0] + (u - R0.reveal)
          const fa = R0.focusA, fb = R0.focusB
          const inA = u > fa[0] + 0.1 && u < fa[1], inB = u > fb[0] + 0.1 && u < fb[1]
          const dimA = inB ? 0.42 : 0, dimB = inA ? 0.42 * clamp(prog(u, fa[0] + 0.1, fa[0] + 0.3)) : 0
          const rv = clamp(prog(u, R0.reveal, R0.reveal + 0.35)), fz = u >= R0.timer[0] && u < R0.reveal
          const S0 = { ...r.C, PW, PH, T: { reveal: r.t0 + R0.reveal }, cfg: r, focus: { A: fa, B: fb } }
          for (const s of ['A', 'B']) {
            const won = isWin(r, s) ? rv : 0, lost = isWin(r, s) ? 0 : rv
            drawPanel(x, s, tk, t, r, { ...S0, won, lost, rv }, { dim: (s === 'A' ? dimA : dimB) + (fz ? 0.12 : 0), grey: lost * 0.92, glow: won })
          }
          const fk = clamp(prog(u, R0.reveal - 0.16, R0.reveal))
          for (const s of ['A', 'B']) {
            const P = PANEL[s]
            if (isWin(r, s)) flag(x, t, P.x + 40, P.y + PH - 24, { k: fk, text: 'GREEN', h: 250 })
            else if (fk > 0) flag(x, t, P.x + 40, P.y + PH - 24, { k: fk, col: '#b9b2c9', dark: '#7d7690', droop: clamp(prog(u, R0.reveal + 0.2, R0.reveal + 0.9)), wave: 0.3, h: 210 })
            if (isWin(r, s)) { sparkles(tx, t, P.x + PW / 2, P.y + PH / 2, r.t0 + R0.reveal + 0.02, 12, 220, 1, [GREEN, GOLD, BONE]); confetti(tx, t, r.t0 + R0.reveal + 0.04, P.x + PW / 2, P.y + 260) }
          }
          drawTimer(tx, u, R0.timer, { cy: 850, r: 120 })
          judge = { tears: u < R0.reveal ? 2 : 3, mood: u < R0.reveal ? 'wide' : 'sparkle', look: u < R0.timer[0] ? [u < fb[0] ? -1 : 1, -0.6] : [0, 0], sweatOn: fz, hops: [r.t0 + R0.reveal + 0.04, r.t0 + R0.reveal + 0.5] }
          if (u > R0.reveal) hearts(tx, t, r.t0 + R0.reveal + 0.2, CAM.x + 10, CAM.y - 60, { n: 5, cell: 4, rise: 130 })
        }
        drawJudge(tx, t, C0, judge)
        // DOM layers
        promise.update(t, 1.2, [INTRO - 0.2, INTRO])
        rounds.forEach((q, i) => {
          premises[i].update(t, q.t0 + 0.35, [q.t0 + R0.timer[0] - 0.14, q.t0 + R0.timer[0]])
          verdicts[i].update(t, q.t0 + R0.reveal + 0.05, t < q.t1 || q.last ? 1 : 0)
        })
        whyBoxes.forEach(b => b.update(t))
        finalBox.update(t)
        const n = rounds.filter(q => t >= q.t0 + R0.reveal).length
        score.style.display = t >= INTRO ? 'block' : 'none'
        score.textContent = `GREEN FLAGS ${n}/5`
        bug.update(1)
        drawGrain(gx, t)
        const fl = Math.max(0, ...rounds.map(q => { const d = t - (q.t0 + R0.reveal); return d >= 0 && d < 0.14 ? 1 - d / 0.14 : 0 }))
        flash.style.opacity = String(0.6 * fl)
      },
    }
  }

  const CUES = [
    ['pop', 1.2, 1174.66, 0.04, 0], ['pop', 1.27, 1567.98, 0.03, 0], ['glitter', 1.2, 1.5],
    ...rounds.flatMap(r => {
      const a = r.t0
      return [
        ['pop', r3(a + 0.35), 987.77, 0.035, 0], ['whoosh', r3(a + R0.focusB[0] - 0.14), 0.26, 0.03], ['tick', r3(a + R0.focusB[0]), 0.05],
        ['pop', r3(a + R0.timer[0] + 0.02), 1318.51, 0.05, 0], ['pop', r3(a + R0.timer[1]), 1174.66, 0.05, 0], ['pop', r3(a + R0.timer[2]), 1318.51, 0.055, 0],
        ['riser', r3(a + R0.timer[2]), r3(a + R0.reveal), 0.02],
        ['boom', r3(a + R0.reveal), 0.3], ['tom', r3(a + R0.reveal), 92, { gain: 0.26, decay: 0.3 }], ['bell', r3(a + R0.reveal + 0.04), 1760, 0.04, 1.4, 0], ['glitter', r3(a + R0.reveal + 0.05), r3(a + R0.reveal + 0.7)],
        ['pop', r3(a + R0.reveal + 0.4), 1567.98, 0.035, 0.5],
        ...(r.cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]),
      ]
    }),
    ...WHY.flatMap(L => talkCues(L, { cps: CPS })), ...talkCues(FINAL, { cps: CPS }),
    ...whipZoomCues(WHIP), ...slamTitleCues(HOOK),
    ...WHIPS.flatMap(whipZoomCues), ...RECS.flatMap(recordScratchCues), ...SHKS.flatMap(shakeCues), ...CHAPS.flatMap(chapterCues),
    ...(LOOP ? loopCues({ duration: DURATION, len: LB }) : []),
    ...(cfg.cues || []),
  ].sort((a, b) => a[1] - b[1])
  const SCENES = [build, whipZoom(WHIP), slamTitle(HOOK), ...WHIPS.map(whipZoom), ...RECS.map(recordScratch), ...SHKS.map(screenShake), ...CHAPS.map(chapter)]
  if (LOOP) SCENES.push(loopBack([build, slamTitle(HOOK)], { duration: DURATION, len: LB }))
  const SECTIONS = { drop: INTRO, breakdown: rounds.map(r => r3(r.t0 + R0.timer[0])), lift: rounds.map(r => r3(r.t0 + R0.reveal)) }
  return { DURATION, SCENES, CUES, SECTIONS, INTRO, RL, R0 }
}
export { R, box, INK, BONE, GOLD, GREEN, INTER, MONO, pop01, clamp, lerp, prog, ease }
