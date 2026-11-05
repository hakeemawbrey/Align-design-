// DATE YOURSELF (Month 2 boost, batch m16, star_advice posts): the format engine shared by kdye01–kdye20.
// Lives in kdye01's folder; the other kdye films import it read-only. Rows: promo/films/month2/m16.md.
//
// The format (no end card, no card cut, no logo — the video ends on its last beat):
//   0.0        frame 0 = thumbnail: the episode's opener is already mid-chaos and the hook line (≤ 7 words) is on screen.
//   0.0–1.0    a pattern break from hookkit.js (whip zoom / record scratch + freeze / colour flash / sudden silence).
//   ~1.3       the rubber stamp slams: "SOLO DATE IDEA FOR A ♑ CAPRICORN" (the series' signature beat).
//   ~3.0 →     the date plays out stop by stop (a numbered sticker per stop; long films use hookkit chapter stickers
//              and promise the payoff up front). THE STARS talk in the RPG box. Pisces cries somewhere in every film.
//   end        the last line pops big and holds ~0.8 s, then a hard cut — or the last 0.4 s loops back to frame 0.
//
//   makeDate(cfg) → { DURATION, SCENES, CUES }
//     cfg.id, cfg.sign ('capricorn'), cfg.name ('Capricorn'), cfg.D (story length = DURATION), cfg.ending ('cut'|'loop')
//     cfg.hook  '…*accent*…' hook line (≤ 7 words), cfg.hookSize, cfg.hookAccent (colour)
//     cfg.opener(x, t, S)  draws the frame-0 chaos (runs from 0 until cfg.stops[0].a)
//     cfg.breakFx  'whip' | 'scratch' | 'flash' | 'silence' | 'glitch' — the first-second pattern break (hookkit)
//     cfg.stops: [{ a, b, sticker, draw(x, t, S), chapter? }]  S = { u (t − a), a, b, hero(x, t, o), pis(x, t, o, tears) }
//     cfg.lines: [{ t, who: 'stars'|'hero'|'pisces'|string, text }]  (the RPG box; grouped into boxes by cfg.boxes)
//     cfg.boxes: [[open, close, [lineIdx…]], …]
//     cfg.promise: { text, at, out }   long films: the payoff promised up front ("wait for attempt seven")
//     cfg.last: { t, text }  the last line (big type), held to the end
//     cfg.cam(t) → { zoom, dx, dy } optional camera on the canvas; cfg.cues: extra sound cues
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import * as HK from '../hookkit.js'
import { INK, BONE, GOLD, PINK, RED, INTER, SERIF, MONO, pop01, outK, starFrame, inSprite, tearsCells, r3 } from './props.js'

export const BUG_COL = '#ffb36b'
export const LOOP_LEN = 0.42
const CPS = 30

// ── DOM pieces
function buildBug(root, at) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'none', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', borderRadius: '50%', background: BUG_COL, boxShadow: `0 0 0 4px ${INK}, 0 0 16px rgba(255,179,107,0.7)` }, b)
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.22em', color: BUG_COL, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'DATE&nbsp;<span style="color:rgba(255,255,255,0.7)">YOURSELF</span>')
  return {
    update(t, out = 1) {
      const k = at <= 0 ? out : pop01(t, at, 0.36, 2.2) * out
      b.style.display = k <= 0.01 ? 'none' : 'flex'
      b.style.opacity = String(clamp(k * 2))
      b.style.transform = `scale(${(0.6 + 0.4 * clamp(k)).toFixed(4)})`
    },
  }
}

// the stamp imprint: "SOLO DATE IDEA | FOR A ♑ CAPRICORN" in the sign's colour, double border, tilted
function buildStamp(root, { name, glyph, ink, at, out, top = 760 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '20px 44px 26px', border: `10px solid ${ink}`, outline: `4px solid ${ink}`, outlineOffset: '9px', borderRadius: '12px', transformOrigin: '50% 50%',
    background: 'rgba(12,8,28,0.82)', textAlign: 'center', color: ink, textShadow: '0 4px 18px rgba(6,4,18,0.6)' }, wrap)
  el('div', { font: `800 56px ${INTER}`, letterSpacing: '0.12em', lineHeight: '1.05', whiteSpace: 'nowrap' }, st, 'SOLO DATE IDEA')
  el('div', { font: `italic 500 104px ${SERIF}`, lineHeight: '1.0', whiteSpace: 'nowrap' }, st, `for a ${glyph}︎ ${name}`)
  wrap.style.display = 'flex'
  const fitK = Math.min(1, 960 / Math.max(1, st.offsetWidth || 1))
  wrap.style.display = 'none'
  return {
    update(t, shrink = 0) {
      const on = t >= at - 0.02 && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, at - 0.02, at + 0.07), o = outK(t, out)
      const sc = lerp(1.6, 1, ease.outCubic(p)) * (1 + 0.04 * Math.exp(-(t - at) * 8) * Math.sin((t - at) * 40))
      st.style.opacity = String(clamp(p * 2) * clamp(o))
      st.style.transform = `translateY(${(-shrink * 520).toFixed(1)}px) rotate(-5deg) scale(${(sc * fitK * lerp(1, 0.5, shrink) * lerp(0.8, 1, o)).toFixed(4)})`
    },
  }
}

// the stop sticker: a tilted bone sticker with a numbered badge (Inter 800 + one *italic* accent)
function buildSticker(root, { n, text, badge, deep, at, out, tilt, top = 300 }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: top + 'px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { display: 'flex', alignItems: 'center', gap: '20px', maxWidth: '940px', padding: '14px 30px 16px 18px', background: BONE, border: `6px solid ${INK}`, borderRadius: '14px',
    boxShadow: '10px 10px 0 rgba(6,4,18,0.7)', transformOrigin: '50% 50%' }, wrap)
  if (n != null) el('div', { flex: '0 0 auto', minWidth: '64px', height: '64px', padding: '0 8px', borderRadius: '32px', background: badge, border: `5px solid ${INK}`, display: 'grid', placeItems: 'center', font: `800 32px ${INTER}`, color: INK, boxSizing: 'border-box' }, st, String(n))
  const html = text.replace(/\*([^*]+)\*/g, `<span style="font:italic 500 58px ${SERIF};color:${deep};letter-spacing:0">$1</span>`)
  el('div', { font: `800 44px ${INTER}`, lineHeight: '1.08', color: INK, letterSpacing: '-0.01em' }, st, html)
  return {
    update(t) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.34), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.1)) * o)
      st.style.transform = `translateY(${((1 - o) * 30).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.85, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════ the episode
export function makeDate(cfg) {
  const HERO = signStar(cfg.sign), PIS = signStar('pisces')
  const D = cfg.D, LOOP = cfg.ending === 'loop'
  const stops = cfg.stops
  const firstA = stops[0].a
  const stampAt = cfg.stampAt ?? 1.3
  const stampOut = cfg.stampOut ?? [firstA - 0.25, firstA]
  const lastT = cfg.last.t
  const SPEAK = { stars: 'THE STARS', hero: `${HERO.glyph}︎ ${cfg.name.toUpperCase()}`, pisces: `${PIS.glyph}︎ PISCES` }
  const COLS = { stars: undefined, hero: cfg.heroLineCol || '#9fe6b0', pisces: '#8fd8f6' }
  const LINES = (cfg.lines || []).map(l => ({ t: l.t, speaker: SPEAK[l.who] || l.who, text: l.text, color: COLS[l.who] }))
  const starsHops = talkHops(LINES, SPEAK.stars, { cps: CPS })
  const heroHops = talkHops(LINES, SPEAK.hero, { cps: CPS })

  const hero = (x, t, o = {}) => {
    const opts = { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o, hops: [...(o.hops || []), ...heroHops] }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    const F = starFrame(o.x, o.y, o.s, t, opts)
    if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
    return F
  }
  const pis = (x, t, o = {}, tears = 2) => {
    const opts = { color: PIS.color, glyph: o.s >= 150 ? PIS.glyph : null, mood: 'sparkle', look: [-1, -0.4], seed: 6, glow: 0.85, tips: false, ...o }
    drawStarChar(x, o.x, o.y, o.s, t, opts)
    const F = starFrame(o.x, o.y, o.s, t, opts)
    if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
    return F
  }
  const stars = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: STAR.sky, mood: 'happy', seed: 2, glow: 1.05, ...o, hops: [...(o.hops || []), ...starsHops] })

  function drawWorld(x, t) {
    if (t < firstA) { cfg.opener(x, t, { u: t, hero, pis, stars }); return }
    for (let i = 0; i < stops.length; i++) {
      const s = stops[i]
      if (t >= s.a && (t < s.b || i === stops.length - 1)) { s.draw(x, t, { u: t - s.a, a: s.a, b: s.b, hero, pis, stars }); return }
    }
  }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 56px Inter", "800 44px Inter", "800 28px Inter", "700 30px Inter", "italic 500 150px 'EB Garamond'", "italic 500 104px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const stamp = buildStamp(root, { name: cfg.name, glyph: HERO.glyph, ink: cfg.stampInk || HERO.color, at: stampAt, out: stampOut, top: cfg.stampTop ?? 1180 })
    const stickers = stops.filter(s => s.sticker).map((s, i) => buildSticker(root, { n: s.n ?? (i + 1), text: s.sticker, badge: s.badge || HERO.color, deep: cfg.deep || '#b2402a', at: s.a + 0.25, out: [s.b - 0.2, s.b], tilt: [-2.2, 1.8, -1.4, 2.0, -1.8][i % 5], top: s.stickerTop ?? 300 }))
    const PROMISE = cfg.promise ? buildSticker(root, { n: null, text: cfg.promise.text, badge: PINK, deep: '#c42a5a', at: cfg.promise.at, out: cfg.promise.out, tilt: 2.5, top: cfg.promise.top ?? 1620 }) : null
    const boxes = (cfg.boxes || []).map(([open, close, idx]) => dialogueBox(root, { lines: idx.map(i => LINES[i]), y: cfg.boxY ?? 1450, open, close, cps: CPS }))
    const LAST = popText(root, cfg.last.text, { top: cfg.last.top ?? 300, size: cfg.last.size ?? 92, accentSize: (cfg.last.size ?? 92) * 1.36, at: lastT, gap: 0.08, accentColor: cfg.last.accent || GOLD, fit: true, wobble: true })
    const extra = cfg.dom ? cfg.dom(root) : null
    const bug = buildBug(root, 0)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    function paint(ctx, t) {
      const cam = cfg.cam ? cfg.cam(t) : { zoom: 1, dx: 0, dy: 0 }
      drawSky(ctx, t, { ...SKY_H, dim: 0.5 })
      ctx.save()
      ctx.translate(540 + (cam.dx || 0), 960 + (cam.dy || 0)); ctx.scale(cam.zoom || 1, cam.zoom || 1); ctx.rotate(cam.rot || 0); ctx.translate(-540, -960)
      drawWorld(ctx, t)
      ctx.restore()
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        paint(x, t)
        for (const b of boxes) b.update(t)
        stamp.update(t)
        for (const s of stickers) s.update(t)
        if (PROMISE) PROMISE.update(t)
        LAST.update(t, 1)
        if (extra) extra.update(t)
        bug.update(t, 1)
        drawGrain(gx, t)
      },
    }
  }

  const CUES = [
    ...talkCues(LINES, { cps: CPS }),
    ['whoosh', r3(stampAt - 0.2), 0.4, 0.04], ['boom', stampAt, 0.22], ['tom', stampAt, 96, { gain: 0.28, decay: 0.28 }], ['tick', stampAt, 0.07],
    ...stops.filter(s => s.sticker).map(s => ['pop', r3(s.a + 0.27), 987.77, 0.04, 0]),
    ...stops.flatMap(s => (s.cues || []).map(c => [c[0], r3(c[1] + s.a), ...c.slice(2)])),
    ...(cfg.promise ? [['pop', cfg.promise.at + 0.05, 1318.51, 0.04, 0.2]] : []),
    ...Array.from({ length: cfg.last.text.split(/\s+/).length }, (_, i) => ['pop', r3(lastT + i * 0.08), [587.33, 659.25, 739.99, 880, 987.77, 1174.66][i % 6], 0.03, i % 2 ? 0.15 : -0.15]),
    ...(cfg.cues || []),
  ]
  // ── the hook kit: slam title on frame 0, the episode's effects, the stamp's shake, chapters, the loop helper
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop ?? 190, size: cfg.hookSize ?? 112, accentColor: cfg.hookAccent || HERO.color, out: cfg.hookOut ?? [firstA - 0.25, firstA] }
  const SHAKE = { at: stampAt, len: 0.4, amp: 18, seed: 3 }
  const FX = [{ kind: 'shake', o: SHAKE }, ...(cfg.fx || []), ...(cfg.chapters || []).map(o => ({ kind: 'chapter', o }))]
  const MAKE = { whip: [HK.whipZoom, HK.whipZoomCues], scratch: [HK.recordScratch, HK.recordScratchCues], shake: [HK.screenShake, HK.shakeCues],
    caught: [HK.caught, HK.caughtCues], call: [HK.incomingCall, HK.incomingCallCues], notif: [HK.notification, HK.notificationCues],
    loading: [HK.loadingBar, HK.loadingBarCues], countdown: [HK.countdown, HK.countdownCues], hud: [HK.gameHud, HK.gameHudCues],
    achievement: [HK.achievement, HK.achievementCues], chapter: [HK.chapter, HK.chapterCues], glitch: [HK.glitch, HK.glitchCues] }
  const RECS = FX.filter(f => f.kind === 'scratch').map(f => f.o)
  const main = RECS.length ? HK.frozen(build, RECS) : build
  const SCENES = [main, ...FX.map(f => MAKE[f.kind][0](f.o)), HK.slamTitle(HOOK)]
  if (LOOP) SCENES.push(HK.loopBack([build, HK.slamTitle(HOOK)], { duration: D, len: LOOP_LEN }))
  CUES.push(...FX.flatMap(f => MAKE[f.kind][1](f.o)), ...(cfg.quietHook ? [] : HK.slamTitleCues(HOOK)), ...(LOOP ? HK.loopCues({ duration: D, len: LOOP_LEN }) : []))
  return { DURATION: D, SCENES, CUES: CUES.filter(c => c[1] >= 0 && c[1] < D + 0.5) }
}
