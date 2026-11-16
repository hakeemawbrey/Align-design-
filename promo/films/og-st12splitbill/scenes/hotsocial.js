// hotsocial — the OG social cut of sthot.js's hotEpisode (copied into this film's folder; the shared kit is untouched).
// Same five-beat story, same set, cast, objection burst, verdict card and last line; changed for Instagram:
//   • no HOT TAKE stamp / animated take (the film's static HOOK replaces it), no HEAT meter, no AGREE / DISAGREE pill
//   • no screen shakes; no word-pop sound bursts (stamp ignite, heat pops, verdict / last-line word pops, pill blips)
//   • nothing fades out before the story end: the film ends ON its last beat
//   • safe zones: the dialogue box sits at y 1330–1560 and inside x 80–960
// Same config as hotEpisode (see sthot.js). Returns { SCENES, CUES, DURATION, STORY_END, T }.
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { easeOutBack, GRAIN_H } from '../../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { objection, objectionCues, verdictCard, verdictCues, drawHotSet, cityStar, CITIES, loadHotFonts, HOT, r3 } from '../../sthot.js'

export function hotEpisode(C) {
  const DURATION = C.duration, STORY_END = DURATION - ENDCARD_LEN
  const CPS = C.cps || 28
  const OBJ = C.objection
  const who = w => (w === 'pro' ? C.pro : C.con)
  const LINES = C.lines.map(L => ({ t: L.t, speaker: who(L.who).name, color: who(L.who).textColor || HOT.gold, text: L.text }))
  const LT = lineTimes(LINES, { cps: CPS })
  const V = C.verdict, P = { dur: 0.75, ...C.pill }, LAST = C.last
  const T = {
    take: C.take, obj: OBJ, verdict: V.at, pill: P.at, last: LAST.at, LT, lines: LINES,
    close: r3(V.at - 0.1), vOut: V.out || [r3(P.at - 0.2), r3(P.at + 0.02)],
    slide: [r3(OBJ - 0.05), r3(OBJ + 0.32)], out: [r3(STORY_END + 5), r3(STORY_END + 6)],   // never fades in the cut
  }
  const conEnters = (C.con.enter || 'objection') === 'objection'
  const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
  const firstLine = w => { const i = C.lines.findIndex(L => L.who === w); return i < 0 ? null : i }
  const pi = firstLine('pro'), ci = firstLine('con')
  const PRO_K = [[0, S_('wink', [1, 0])], [0.9, S_('happy', [1, 0])], [OBJ, S_('wide', [1, 0], { blink: false })], [OBJ + 0.6, S_('squint', [1, 0])]]
  if (pi != null) PRO_K.push([LINES[pi].t, S_('happy', [0, 0])])
  if (ci != null) PRO_K.push([LT[ci].done + 0.1, S_('eyeroll')], [LT[ci].done + 1.0, S_('squint', [1, 0])])
  PRO_K.push([V.at, S_('neutral', [0, -1])], [LAST.at, S_('happy', [1, 0])], [LAST.at + 0.9, S_('sparkle', [1, 0])])
  const CON_K = [[0, S_('squint', [-1, 0])], [OBJ, S_('wide', [-1, 0], { blink: false })], [OBJ + 0.4, S_('squint', [-1, 0])]]
  if (ci != null) CON_K.push([LINES[ci].t, S_('squint', [-1, 0])])
  C.lines.forEach((L, i) => { if (L.who === 'pro' && i > 0) CON_K.push([LT[i].done, S_('wide', [-1, 0], { blink: false })], [LT[i].done + 0.5, S_('neutral', [-1, 0])]) })
  CON_K.push([V.at, S_('neutral', [0, -1])], [LAST.at, S_('neutral', [-1, 0])], [LAST.at + 0.9, S_('happy', [-1, 0])])
  const merge = (A, B = []) => [...A, ...B].sort((a, b) => a[0] - b[0])
  const PK = merge(PRO_K, C.moods?.pro), CK = merge(CON_K, C.moods?.con)
  const keyedS = (t, K) => { let v = K[0][1]; for (const [k, s] of K) if (t >= k) v = s; return v }
  const HOPS = {
    pro: [0.35, ...talkHops(LINES, C.pro.name, { cps: CPS }), LAST.at + 0.2, ...(C.pro.hops || [])],
    con: [OBJ + 0.34, ...talkHops(LINES, C.con.name, { cps: CPS }), LAST.at + 0.9, ...(C.con.hops || [])],
  }
  function star(x, t, S, K, hops, xx, extra = {}) {
    const st = keyedS(t, K)
    const o = { glyph: S.glyph, ...st, hops, seed: S.seed || 3, ...extra }
    return S.city ? cityStar(x, xx, S.y, S.size, t, { city: S.city, prop: S.prop, ...o, color: S.color || (CITIES[S.city] || {}).color }) : drawStarChar(x, xx, S.y, S.size, t, { color: S.color, ...o })
  }
  async function build(stage) {
    await loadHotFonts()
    const root = fill(stage, { background: '#0a0616' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const box = LINES.length ? dialogueBox(root, { lines: LINES, y: C.boxY || 1330, width: 880, height: 230, W: 1040, open: LINES[0].t - 0.2, close: T.close, cps: CPS }) : null
    const verdict = verdictCard(root, { ...V, out: T.vOut })
    const last = popText(root, LAST.text, { top: LAST.top || 250, size: LAST.size || 112, accentSize: LAST.accentSize || 160, at: LAST.at, gap: LAST.gap || 0.12, accentColor: C.accentColor || HOT.gold, wobble: true, fit: true })
    const ov = layerCanvas(root), ox = ov.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    function scene(t) {
      x.clearRect(0, 0, 1080, 1920)
      x.save()
      let speaking = null
      LINES.forEach((L, i) => { if (t >= L.t && t < (LINES[i + 1] ? LINES[i + 1].t : T.close)) speaking = C.lines[i].who === 'pro' ? 'left' : 'right' })
      drawHotSet(x, t, { heat: (C.heat.level / 5) * (0.5 + 0.5 * clamp((t - OBJ) / 0.5)), dim: 0.35, spot: speaking, ...(C.set || {}) })
      if (C.back) C.back(x, t, T)
      const rp = star(x, t, C.pro, PK, HOPS.pro, C.pro.x, { squash: t > OBJ && t < OBJ + 0.4 ? -0.08 : 0 })
      let rc = null
      if (!conEnters || t >= T.slide[0]) {
        const inK = conEnters ? easeOutBack(prog(t, ...T.slide), 1.3) : 1
        rc = star(x, t, C.con, CK, HOPS.con, lerp(1320, C.con.x, inK), { squash: conEnters ? 0.06 * Math.sin((t - OBJ) * 20) * (1 - prog(t, OBJ, OBJ + 0.5)) : 0 })
      }
      if (C.pro.draw) C.pro.draw(x, t, rp, T)
      if (rc && C.con.draw) C.con.draw(x, t, rc, T)
      if (C.front) C.front(x, t, T, rp, rc)
      x.restore()
    }
    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        scene(t)
        if (box) box.update(t)
        verdict.update(t)
        last.update(t, t < LAST.at ? 0 : 1)
        ox.clearRect(0, 0, 1080, 1920)
        objection(ox, t, { at: OBJ, x: 540, y: C.objY || 800, ...(C.objOpts || {}) })
        if (C.over) C.over(ox, t, T)
        drawGrain(gx, t)
      },
    }
  }
  // endcard + cardFrame stay listed: --social switches both off and cuts the film at STORY_END
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: '', corners: 'tl bl br' })]
  const quiet = cues => cues.filter(c => c[0] !== 'pop' && c[0] !== 'pluck')   // the gavel stays, the word pops go
  const CUES = [
    ...objectionCues(OBJ, { key: C.key }), ['whoosh', T.slide[0], 0.35, 0.04],
    ...quiet(verdictCues(V.at, { text: V.text, key: C.key })),
    ['pluck', r3(LAST.at + 0.12), 1174.66, 0.035, 0.6, 0],
    ...(LINES.length ? talkCues(LINES, { cps: CPS, pitch: { [C.pro.name]: 987.77, [C.con.name]: 659.25 } }) : []),
    ...(C.cues || []),
    ...endcardCues(STORY_END),
  ]
  return { SCENES, CUES, DURATION, STORY_END, T }
}
void ease
