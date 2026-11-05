// kcfe16: ZODIAC CONFESSIONAL ep 16 (long), "Episode: The Double Text" (75 s vertical, music: pop · E). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition. Chapter stickers from the hook kit.
// Cast: ♈ Aries, ♍ Virgo, ♓ Pisces (Pisces is in the cast this time; the grey stagehand takes the boom when Pisces talks).
//   0.0–4.0   COLD OPEN (flash-forward to the dinner): Aries mid-thumb-SLAM on SEND, a second bubble flying out (whip);
//             hook "Someone *double texted.* Dinner decides who." · record scratch: "wait for *the dinner.*"
//   4.2–14.0  CH 1 · ARRIVALS: THE HOUSE at night. Aries sprints in ("I'm here! early! is that bad?"), Virgo with a
//             labelled suitcase ("I packed for every scenario."), Pisces already crying ("I'm just so happy to be here.")
//   14.0–39.5 CH 2 · CONFESSIONALS: Aries "I sent one text." / "then I sent *one more text.*" / "they hadn't replied in
//             *ninety seconds.*" · Virgo "I drafted it *eleven times.*" (drafts stack up) / "didn't send *any* of them." /
//             PRODUCER "why?" / "what if the comma was *wrong?*" · Pisces "I sent a *voice note.*" / "I was crying in it." /
//             "it's *four minutes long.*" / PRODUCER "…did they listen?"
//   39.5–57.5 CH 3 · THE DINNER: "so. has anyone… texted anyone?" · a phone face-up on the table BUZZES (shake, rattle):
//             WHOSE PHONE? · lights flicker through the accusations · PRODUCER "so who double texted?" · ALL "…all of us."
//   57.5–75.0 CH 4 · THE VERDICT: three phones, three replies: Aries' crush "lol I love that you texted twice" ·
//             Virgo finally sends draft 11 → "hi!! was hoping you'd text" ("…the comma was *fine.*") · Pisces gets a voice
//             note back ("they cried *too!*") · group hug, Pisces floods.
//   72.0      last line "Double text. *Single* regret: none." holds → hard cut at 75.0.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, RED, INTER, MONO,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, recChrome, blk, rr, sparkles, step, pop01,
  buildBug, buildLower, buildCaps, buildSlam, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { drawHouse, walker, phoneShot, dinner, flicker, drawBubbleWave, CAST3 } from './longkit.js'
import {
  slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, chapter, chapterCues, screenShake, shakeCues,
} from '../../hookkit.js'

export const DURATION = 75
const ARI = SIGN('aries'), VIR = SIGN('virgo'), PIS = SIGN('pisces')
// shots: [t0, t1, kind, arg]
const SHOTS = [
  [0, 4.2, 'cold'],
  [4.2, 14.0, 'arrive'],
  [14.0, 22.2, 'booth', 'aries'], [22.2, 30.2, 'booth', 'virgo'], [30.2, 39.5, 'booth', 'pisces'],
  [39.5, 57.6, 'dinner'],
  [57.6, 62.6, 'phone', 'aries'], [62.6, 66.9, 'phone', 'virgo'], [66.9, 70.6, 'phone', 'pisces'],
  [70.6, 75.1, 'hug'],
]
const T = { scratch: 0.9, buzz: 44.0, flick: [47.0, 49.2, 51.3], allOf: 54.6, last: 72.0 }
const HOOK = { at: -1, text: 'Someone *double texted.* | Dinner decides who.', top: 150, size: 88, accentColor: ARI.color, out: [4.0, 4.2] }
const WHIP0 = { at: -0.26, len: 0.5, from: 1.7, blur: 12 }
const REC = { at: T.scratch, len: 1.7, caption: 'wait for *the dinner.*', sub: 'you’re probably wondering how we got here', top: 1560 }
const CH = [
  { at: 4.3, out: [13.7, 14.0], n: 1, title: 'ARRIVALS', color: GOLD },
  { at: 14.1, out: [39.2, 39.5], n: 2, title: 'CONFESSIONALS', color: '#7fd0f0' },
  { at: 39.6, out: [57.3, 57.6], n: 3, title: 'THE DINNER', color: PINK },
  { at: 57.7, out: [71.6, 72.0], n: 4, title: 'THE VERDICT', color: '#9fe6b0' },
]
const WHIPS = SHOTS.slice(1).map(s => ({ at: s[0] - 0.04, len: 0.4, from: 1.5 }))
const SHAKE = { at: T.buzz, len: 0.6, amp: 26 }
const w = id => { const s = SIGN(id); return { who: `${s.glyph}︎ ${s.name}`, color: s.color } }
const CAPS = [
  { t: 5.0, end: 7.3, ...w('aries'), text: "I'm here! early! *is that bad?*" },
  { t: 8.0, end: 10.3, ...w('virgo'), text: 'I packed for *every scenario.*' },
  { t: 11.0, end: 13.7, ...w('pisces'), text: "I'm just so *happy* to be here." },
  { t: 14.6, end: 16.0, kind: 'prod', text: 'did you text them?' },
  { t: 16.2, end: 18.0, ...w('aries'), text: 'I sent one text.' },
  { t: 18.1, end: 20.2, ...w('aries'), text: 'then I sent *one more text.*', accent: RED },
  { t: 20.3, end: 22.1, ...w('aries'), text: "they hadn't replied in *ninety seconds.*" },
  { t: 22.5, end: 24.6, ...w('virgo'), text: 'I drafted it *eleven times.*' },
  { t: 24.8, end: 27.0, ...w('virgo'), text: "didn't send *any* of them." },
  { t: 27.1, end: 28.2, kind: 'prod', text: 'why?' },
  { t: 28.3, end: 30.1, ...w('virgo'), text: 'what if the comma was *wrong?*' },
  { t: 30.5, end: 32.2, ...w('pisces'), text: 'I sent a *voice note.*' },
  { t: 32.4, end: 34.4, ...w('pisces'), text: 'I was *crying* in it.', accent: '#9fc4ff' },
  { t: 34.6, end: 36.6, ...w('pisces'), text: "it's *four minutes long.*" },
  { t: 36.8, end: 39.4, kind: 'prod', text: '…did they listen?' },
  { t: 40.2, end: 42.6, ...w('aries'), text: 'so. has anyone… *texted* anyone?' },
  { t: 46.2, end: 48.4, ...w('virgo'), text: "not mine. I never *send* anything." },
  { t: 48.5, end: 50.6, ...w('aries'), text: 'ok it might be mine. *twice.*', accent: RED },
  { t: 50.7, end: 52.6, ...w('pisces'), text: 'mine too. I sent *a song.*' },
  { t: 52.8, end: 54.4, kind: 'prod', text: 'so who double texted?' },
  { t: T.allOf, end: 57.4, who: 'ALL THREE', color: BONE, text: '…*all* of us.' },
  { t: 60.4, end: 62.5, ...w('aries'), text: 'they *loved* it??' },
  { t: 65.0, end: 66.8, ...w('virgo'), text: '…the comma was *fine.*' },
  { t: 68.4, end: 70.5, ...w('pisces'), text: 'they cried *too!*', accent: '#9fc4ff' },
  { t: T.last, end: 99, who: 'THE HOUSE', color: BONE, text: 'Double text. *Single* regret: none.' },
]
const LOWER = { aries: '“replies in 0.2 seconds”', virgo: '“drafts everything”', pisces: '“feels it all, live”' }
const shotAt = t => SHOTS.find(s => t >= s[0] && t < s[1]) || SHOTS[SHOTS.length - 1]

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const whose = buildSlam(root, 'WHOSE PHONE?', { top: 520, size: 120, color: '#ffffff', rot: -5, bg: RED })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function sendBubbles(cx, cy, t, t0) {
    // two blue bubbles flying up out of the phone
    for (let i = 0; i < 2; i++) {
      const u = t - t0 - i * 0.35
      const p = Math.max(0, u)
      const bx = cx + 40 + p * 120, by = cy - 120 - p * 380 - i * 10
      x.save(); x.translate(bx, by); x.rotate(-0.15 + i * 0.1)
      x.fillStyle = INK; rr(x, -116, -40, 232, 80, 34); x.fill(); x.fillStyle = '#4f8dff'; rr(x, -110, -34, 220, 68, 30); x.fill()
      x.font = `800 30px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(i ? 'hi again!!' : 'hey :)', 0, 2)
      x.restore()
    }
  }
  function phoneInHand(cx, cy, s = 1, rot = 0, glow = '#4f8dff') {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
    x.fillStyle = INK; rr(x, -56, -96, 112, 192, 20); x.fill(); x.fillStyle = '#2b2440'; rr(x, -48, -88, 96, 176, 16); x.fill(); x.fillStyle = glow; rr(x, -40, -78, 80, 156, 12); x.fill()
    x.restore()
  }

  function cold(t) {
    dinner(x, t, [{ id: 'virgo', mood: 'wide', look: [1, 0] }, { id: 'aries', mood: 'squint', look: [0, 1] }, { id: 'pisces', mood: 'wide', look: [-1, 0], tears: 3 }], { rattle: 0 })
    phoneInHand(690, 1120, 1.1, 0.2)
    // the thumb slam
    const th = Math.max(0, Math.sin(Math.PI * prog(t, -0.4, 0.2)))
    x.fillStyle = INK; rr(x, 650, 1040 - th * 60, 90, 120, 40); x.fill(); x.fillStyle = ARI.color; rr(x, 658, 1048 - th * 60, 74, 104, 34); x.fill()
    sendBubbles(690, 1120, t, -0.6)
    recChrome(x, t, { label: 'COMING UP', tc0: 2600, y0: 440 })
  }

  function arrive(t) {
    drawHouse(x, t)
    walker(x, t, 'aries', { t0: 4.4, t1: 5.0, from: -250, to: 230, y: 1190, s: 230, mood: 'happy', bag: { color: '#e8603a' } })
    walker(x, t, 'virgo', { t0: 7.6, t1: 8.6, from: 1300, to: 400, y: 1230, s: 230, mood: 'neutral', bag: { color: '#9fe6b0', label: 'PLAN B' } })
    walker(x, t, 'pisces', { t0: 10.6, t1: 11.6, from: 1300, to: 860, y: 1190, s: 230, mood: 'sparkle', tears: 3 })
    recChrome(x, t, { label: 'DAY 1', tc0: 300, y0: 440 })
  }

  function booth(t, id) {
    drawBooth(x, t, { sign: id })
    const isP = id === 'pisces'
    let mood = 'neutral', look = [0, 0], tears = 0
    if (id === 'aries') mood = step(t, [[14, 'squint'], [16.2, 'happy'], [18.1, 'wink'], [20.3, 'wide']])
    if (id === 'virgo') mood = step(t, [[22, 'neutral'], [24.8, 'squint'], [28.3, 'wide']])
    if (isP) { mood = step(t, [[30, 'sparkle'], [32.4, 'wide'], [36.8, 'wide']]); tears = t > 32.4 ? 4 : 2 }
    const F = seat(x, t, id, { ...SUBJ, hops: CAPS.filter(c => c.who && c.who.includes(SIGN(id).name) && c.t > 14 && c.t < 39.5).map(c => c.t + 0.05) }, { mood, look, tears, seed: 3 })
    drawChairFront(x)
    if (id === 'aries' && t > 18.1 && t < 22.1) { phoneInHand(SUBJ.x + 230, F.cy + 110, 1, 0.15); sendBubbles(SUBJ.x + 230, F.cy + 110, t, 18.2) }
    if (id === 'virgo') {
      // drafts stack up: eleven index cards
      const n = Math.min(11, Math.floor(prog(t, 22.6, 24.5) * 11.99))
      for (let i = 0; i < n; i++) { x.save(); x.translate(170 + (i % 2) * 14, 1180 - i * 26); x.rotate(-0.1 + (i % 3) * 0.08); blk(x, -80, -26, 160, 52, '#fbf7ee', { r: 4, ink: 4, hi: 0, lo: 0 }); x.font = `800 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`DRAFT ${i + 1}`, 0, 2); x.restore() }
      if (t > 28.3) { x.font = `900 160px 'EB Garamond'`; x.fillStyle = RED; x.textAlign = 'center'; x.fillText(',', 860, 820 + Math.sin(t * 8) * 10) }
    }
    if (isP && t > 30.5) drawBubbleWave(x, SUBJ.x, 600, 520, t, { k: pop01(t, 30.5, 0.3, 2) })
    boomOp(x, t, isP ? { who: 'stage', glyph: false, mood: 'squint', tears: t > 34.6 ? 1 : 0 } : { tears: 2, mood: 'sparkle' })
    recChrome(x, t, { tc0: 3600 + SHOTS.findIndex(s => s[3] === id) * 600, y0: 440 })
  }

  function dinnerShot(t) {
    const buzzing = t > T.buzz && t < T.buzz + 2.0
    const gasp = t > T.buzz
    const cast = [
      { id: 'virgo', mood: step(t, [[39, 'neutral'], [40.2, 'squint'], [T.buzz, 'wide'], [46.2, 'squint'], [48.5, 'wide'], [T.allOf, 'neutral']]), look: t > T.buzz && t < 46 ? [1, 1] : [1, 0], hops: [46.25, 46.9] },
      { id: 'aries', mood: step(t, [[39, 'happy'], [40.2, 'wink'], [T.buzz, 'wide'], [48.5, 'squint'], [T.allOf, 'neutral']]), look: t > T.buzz && t < 46 ? [0, 1] : undefined, hops: [40.25, 41.0, 48.55, 49.2], sweat: t > 48.5 && t < T.allOf ? 1 : 0 },
      { id: 'pisces', mood: step(t, [[39, 'sparkle'], [T.buzz, 'wide'], [50.7, 'sparkle'], [T.allOf, 'wide']]), look: t > T.buzz && t < 46 ? [-1, 1] : [-1, 0], tears: gasp ? 3 : 2, hops: [50.75, 51.4] },
    ]
    dinner(x, t, cast, { rattle: buzzing ? 4 : 0 })
    // the phone on the table
    const bz = buzzing ? Math.sin(t * 70) * 10 : 0
    x.save(); x.translate(540 + bz, 1215); x.rotate(0.08); x.fillStyle = INK; rr(x, -90, -40, 180, 80, 14); x.fill(); x.fillStyle = buzzing ? '#7fe0a0' : '#2b2440'; rr(x, -82, -32, 164, 64, 10); x.fill(); x.restore()
    if (buzzing) { x.save(); x.strokeStyle = '#7fe0a0'; x.lineWidth = 6; for (let i = 0; i < 3; i++) { const p = (t * 2.5 + i / 3) % 1; x.globalAlpha = 1 - p; x.beginPath(); x.ellipse(540, 1215, 120 + p * 120, 50 + p * 40, 0, 0, Math.PI * 2); x.stroke() } x.restore() }
    const dk = flicker(t, T.flick)
    if (dk) { x.fillStyle = `rgba(2,1,8,${dk})`; x.fillRect(0, 0, 1080, 1920) }
    boomOp(x, t, { who: 'stage', glyph: false, mood: gasp ? 'wide' : 'neutral', tears: 0, mic: [560, 640], op: [960, 520], size: 140 })
    recChrome(x, t, { tc0: 7200, y0: 440 })
  }

  function phone(t, id) {
    if (id === 'aries') phoneShot(x, t, { owner: 'aries', title: '♌︎ them', msgs: [{ at: 0, side: 'R', text: 'hey :)' }, { at: 0, side: 'R', text: 'hi again!!' }, { at: 58.3, side: 'L', text: 'lol I love that you texted twice' }], typing: [57.6, 58.3], peekMood: t > 58.3 ? 'heart' : 'wide' })
    if (id === 'virgo') phoneShot(x, t, { owner: 'virgo', title: '♎︎ them', msgs: [{ at: 63.2, side: 'R', text: 'hi! I had a really nice time.' }, { at: 64.2, side: 'L', text: "hi!! was hoping you'd text" }], typing: [63.5, 64.2], peekMood: t > 64.2 ? 'heart' : 'squint' })
    if (id === 'pisces') {
      phoneShot(x, t, { owner: 'pisces', title: '♋︎ them', msgs: [], tears: 4, peekMood: 'sparkle' })
      drawBubbleWave(x, 470, 1100, 420, t, { col: '#3a3550', k: pop01(t, 67.3, 0.3, 2) })
      if (t > 67.3) { x.font = `800 30px ${INTER}`; x.fillStyle = '#9fc4ff'; x.textAlign = 'left'; x.fillText('voice note · 4:12 · "I cried too"', 270, 1190) }
    }
    if (t > 58.3 && id === 'aries') sparkles(x, t, 540, 1200, 58.3, 10, 200, 1, [PINK, GOLD, BONE])
    if (t > 64.2 && id === 'virgo') sparkles(x, t, 540, 1200, 64.2, 10, 200, 2, [PINK, GOLD, BONE])
  }

  function hug(t) {
    const k = ease.outBack(prog(t, 70.6, 71.3))
    const cast = [
      { id: 'virgo', mood: 'happy', pos: { x: lerp(250, 380, k) } },
      { id: 'aries', mood: 'happy', pos: { y: 960 } },
      { id: 'pisces', mood: 'sparkle', tears: 4, pos: { x: lerp(830, 700, k) } },
    ]
    dinner(x, t, cast.map(c => ({ ...c, hops: [70.7, 71.2, T.last + 0.05] })))
    sparkles(x, t, 540, 900, 70.8, 16, 360, 1, [PINK, GOLD, BONE])
    sparkles(x, t, 540, 900, T.last, 16, 420, 2, [PINK, GOLD, BONE])
    boomOp(x, t, { who: 'stage', glyph: false, mood: 'sparkle', tears: 2, mic: [560, 640], op: [960, 520], size: 140 })
    recChrome(x, t, { tc0: 7300, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const [, , kind, arg] = shotAt(t)
      if (kind === 'cold') cold(t)
      else if (kind === 'arrive') arrive(t)
      else if (kind === 'booth') booth(t, arg)
      else if (kind === 'dinner') dinnerShot(t)
      else if (kind === 'phone') phone(t, arg)
      else hug(t)
      // lower third: arrivals (who just walked in) and booths
      let lid = null
      if (kind === 'arrive') lid = t > 10.6 ? 'pisces' : t > 7.6 ? 'virgo' : t > 4.4 ? 'aries' : null
      if (kind === 'booth') lid = arg
      lower.update(t, { k: lid ? 1 : 0, name: lid ? `${SIGN(lid).glyph}︎ ${SIGN(lid).name}` : '', color: lid ? SIGN(lid).color : GOLD, tag: lid ? LOWER[lid] : '' })
      whose.update(t, [T.buzz + 0.15, T.buzz + 2.0])
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [frozen(build, [REC]), whipZoom(WHIP0), slamTitle(HOOK), recordScratch(REC), ...WHIPS.map(w => whipZoom(w)), ...CH.map(c => chapter(c)), screenShake(SHAKE)]
export const CUES = [
  ['tom', 0.0, 120, { gain: 0.25, decay: 0.2 }], ['whoosh', 0.05, 0.4, 0.05],
  ...whipZoomCues(WHIP0), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...WHIPS.flatMap(w => whipZoomCues(w)), ...CH.flatMap(c => chapterCues(c)), ...shakeCues(SHAKE),
  ...capCues(CAPS),
  ['tom', 4.95, 90, { gain: 0.18, decay: 0.2 }], ['tom', 8.55, 90, { gain: 0.18, decay: 0.2 }], ...sobCues(11.2, 3, 0.4),
  ['whoosh', 18.3, 0.3, 0.04], ['whoosh', 18.65, 0.3, 0.04],
  ...Array.from({ length: 11 }, (_, i) => ['tick', +(22.6 + i * 0.17).toFixed(3), 0.035]),
  ...sobCues(32.5, 5, 0.4),
  ...Array.from({ length: 6 }, (_, i) => ['pluck', +(T.buzz + i * 0.3).toFixed(3), 196, 0.05, 0.15, 0]),
  ...T.flick.map(f => ['tick', f, 0.07]), ['riser', 52.8, 54.5, 0.025], ['tom', T.allOf, 80, { gain: 0.25, decay: 0.3 }],
  ['pop', 58.3, 1318.5, 0.045, 0], ['glitter', 58.3, 58.8], ['pop', 64.2, 1318.5, 0.045, 0], ['glitter', 64.2, 64.7], ['pop', 67.3, 1046.5, 0.04, 0], ...sobCues(67.6, 5, 0.4),
  ['glitter', 70.7, 71.3], ['bell', 70.75, 1318.5, 0.03, 1.2, 0], ...sobCues(71.0, 3, 0.4),
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
