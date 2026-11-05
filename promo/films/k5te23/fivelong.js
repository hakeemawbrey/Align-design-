// FIVE THINGS, LONG: the 60 s version of "5 Things Every ___ Needs to Hear" (batch m33, k5te23 + k5te24). Owned by
// k5te23; k5te24 imports it read-only. Built on ../k5te01/fivekit.js (the short format) and ../hookkit.js (the shared
// hook kit: whip zoom / record scratch / glitch, chapter stickers, the loop helper). No end card, no card cut, no logo.
//
//   0.00–3.00   frame 0 = the sign star mid-chaos + the hook line; the pattern break at brk.at; at 1.25 the promise
//               chip slams ("NUMBER 5 IS THE ONE."). By 3 s the premise has landed.
//   3 + 10·i    five chapters, 10 s each (a new beat every ~3 s):
//               u 0.0  the big number slams, the chapter sticker slaps on, the line sticker pops, the sign reacts
//               u 3.0  the line shrinks to a caption under the chapter sticker; the mini-scene plays (cfg.chapters[i].draw)
//                      with THE STARS' dialogue box (two lines, at u 3.3 and u 6.4); the scene's own gag lands ~u 6
//   53.0–60     the payoff: the last line slams, the hero glows, THE STARS; 'cut' holds to 60, 'loop' eases back to frame 0.
// Pisces sits bottom-right under the box with a running TISSUES counter (or, when Pisces is the hero, the hero cries).
//
//   makeLong(cfg) → { DURATION, SCENES, CUES, MUSIC, T }
//     cfg like fivekit's makeFive, plus: cfg.promise, cfg.chapters: 5 × { text, title, icon, mood, lines: [{ speaker, text, color }] × 2,
//     draw(x, t, S) }  S = { u (s since the scene began), t0 (scene start), hero, HERO, pis(x, t, P, tears, mood, look) }
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, signStar, STAR, dialogueBox, talkCues, talkHops } from '../startalk.js'
import { popText } from '../lesson.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, glitch, glitchCues, screenShake, shakeCues, chapter, chapterCues, loopK } from '../hookkit.js'
import { GOLD, BONE, INK, INTER, SERIF, SKYB, R, r3, pop01, outK, shadow, hearts, sparkles, label, icon, pisces, tissues, inSprite, starFrame, tearsCells } from '../k5te01/fivekit.js'

const CPS = 30

function bigNumber(x, t, n, t0, t1, col, cx = 260, cy = 800) {
  const k = clamp(prog(t, t0, t0 + 0.12)), o = outK(t, [t1 - 0.15, t1])
  if (k <= 0 || o <= 0) return
  const sc = lerp(2.4, 1, ease.outCubic(k)) * (1 + 0.06 * Math.exp(-(t - t0 - 0.12) * 9) * Math.sin((t - t0) * 40) * (t > t0 + 0.12 ? 1 : 0))
  x.save(); x.translate(cx, cy); x.rotate(-0.08 + 0.03 * Math.sin(n * 2.1)); x.scale(sc * lerp(0.8, 1, o), sc * lerp(0.8, 1, o)); x.globalAlpha = clamp(k * 3) * o
  x.font = `800 480px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineJoin = 'round'; x.lineWidth = 34; x.strokeStyle = INK; x.strokeText(String(n), 10, 14)
  x.fillStyle = 'rgba(6,4,18,0.6)'; x.fillText(String(n), 22, 30)
  x.strokeText(String(n), 0, 0); x.fillStyle = col; x.fillText(String(n), 0, 0)
  x.restore()
}
function buildBug(root, name, col) {
  const b = el('div', { position: 'absolute', left: '56px', top: '58px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: col, boxShadow: `0 0 0 4px ${INK}, 0 0 16px ${col}` }, b)
  el('div', { font: `800 27px ${INTER}`, letterSpacing: '0.17em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b,
    `5&nbsp;THINGS&nbsp;EVERY&nbsp;<span style="color:${col}">${name.toUpperCase()}</span>&nbsp;<span style="color:rgba(239,230,214,0.6)">NEEDS&nbsp;TO&nbsp;HEAR</span>`)
}
const rich = (text, col, size) => text.replace(/\s*\|\s*/g, '<br>').replace(/\*([^*]+)\*/g, `<span style="font:italic 500 ${size}px ${SERIF};color:${col};letter-spacing:0">$1</span>`)
function buildSticker(root, { text, col, tilt }) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '1300px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { maxWidth: '960px', padding: '22px 40px 26px', background: BONE, border: `7px solid ${INK}`, borderRadius: '16px', boxShadow: `12px 12px 0 rgba(6,4,18,0.75)`, textAlign: 'center' }, wrap)
  el('div', { font: `800 66px ${INTER}`, lineHeight: '1.06', color: INK, letterSpacing: '-0.015em' }, st, rich(text, col, 82))
  return {
    update(t, at, out) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const k = easeOutBack(prog(t, at, at + 0.26), 2.6), o = outK(t, out)
      st.style.opacity = String(clamp(prog(t, at, at + 0.06)) * o)
      st.style.transform = `translateY(${((1 - o) * -60).toFixed(1)}px) scale(${(lerp(0.4, 1, k) * lerp(0.7, 1, o)).toFixed(4)}) rotate(${tilt}deg)`
    },
  }
}
function buildCaption(root, text, col) {
  const wrap = el('div', { position: 'absolute', left: '60px', top: '350px', width: '960px', display: 'none', textAlign: 'left', pointerEvents: 'none',
    font: `800 50px ${INTER}`, lineHeight: '1.08', color: BONE, textShadow: '0 3px 14px rgba(6,4,18,0.95)' }, root, rich(text.replace(/\s*\|\s*/g, ' '), col, 60))
  return {
    update(t, at, out) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'block' : 'none'
      if (!on) return
      const k = ease.outCubic(prog(t, at, at + 0.3)), o = outK(t, out)
      wrap.style.opacity = String(k * o)
      wrap.style.transform = `translateY(${((1 - k) * 40).toFixed(1)}px)`
    },
  }
}
function buildChip(root, text, col) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '560px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const st = el('div', { padding: '14px 32px 16px', background: col, border: `6px solid ${INK}`, borderRadius: '10px', boxShadow: `8px 8px 0 rgba(6,4,18,0.75)`, font: `800 50px ${INTER}`, letterSpacing: '0.04em', color: INK, whiteSpace: 'nowrap' }, wrap, text)
  return {
    update(t, at, out) {
      const on = t >= at && t < out[1]
      wrap.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = prog(t, at, at + 0.1), o = outK(t, out)
      const sc = lerp(1.9, 1, ease.outCubic(p)) * (1 + 0.04 * Math.exp(-(t - at) * 8) * Math.sin((t - at) * 40))
      st.style.opacity = String(clamp(p * 3) * o)
      st.style.transform = `rotate(-3deg) scale(${(sc * lerp(0.7, 1, o)).toFixed(4)})`
    },
  }
}

export function makeLong(cfg) {
  const HERO = signStar(cfg.sign)
  const D = cfg.D ?? 60, LOOP = cfg.ending === 'loop' ? 0.45 : 0
  const H = 3.0, CH = 10
  const accent = cfg.accent || HERO.color
  const brk = { type: 'whip', at: 0.45, ...(cfg.brk || {}) }
  const FX = {
    whip: { at: brk.at, len: 0.42, from: brk.from ?? 1.55 },
    scratch: { at: brk.at, len: brk.len ?? 0.8, caption: brk.caption || 'yep.', top: brk.top ?? 1540 },
    glitch: { at: brk.at, len: brk.len ?? 0.7, dialog: !!brk.text, text: brk.text || '', amp: 1 },
    flash: { at: brk.at, len: 0.45, amp: 24 },
  }[brk.type]
  const C = cfg.chapters.map((c, i) => H + i * CH)
  const T = { promise: 1.25, hookOut: [H - 0.2, H], last: r3(H + 5 * CH + 0.1), loop: [D - LOOP, D] }
  const LINES = cfg.chapters.map((c, i) => c.lines.map((L, j) => ({ t: r3(C[i] + (j ? 6.4 : 3.3)), speaker: L.speaker || 'THE STARS', text: L.text, color: L.color })))
  const ALL = LINES.flat()
  const hero = (x, t, o = {}) => drawStarChar(x, o.x, o.y, o.s, t, { color: HERO.color, glyph: o.s >= 150 ? HERO.glyph : null, seed: 3, glow: 1.1, ...o })
  const HERO_POS = { x: 740, y: 930, s: 340 }
  const tearsOf = t => (t < C[1] ? 1 : t < C[3] ? 2 : 3)
  const tissueCount = t => { let n = 0; for (let i = 0; i < 5; i++) if (t >= C[i] + 0.4) n += [1, 2, 3, 5, 0][i]; return n }

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 66px Inter", "800 50px Inter", "800 27px Inter", "800 480px Inter", "italic 500 82px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const lv = layerCanvas(root), lx = lv.getContext('2d')
    const HOOK = popText(root, cfg.hookLine, { top: 176, size: 96, accentSize: 128, at: -3, gap: 0.01, accentColor: accent, fit: true })
    const chip = buildChip(root, cfg.promise, GOLD)
    const stickers = cfg.chapters.map((c, i) => buildSticker(root, { text: c.text, col: cfg.deep || '#5a2d9a', tilt: [-2, 1.6, -1.2, 2, -1.6][i] }))
    const caps = cfg.chapters.map(c => buildCaption(root, c.text, accent))
    const boxes = LINES.map((L, i) => dialogueBox(root, { lines: L, y: 1330, cps: CPS, open: C[i] + 3.08, close: C[i] + 9.75 }))
    const LAST = popText(root, cfg.last, { top: 1210, size: 84, accentSize: 116, at: T.last + 0.05, gap: 0.07, accentColor: GOLD, fit: true })
    const top = layerCanvas(root), tx = top.getContext('2d')
    buildBug(root, cfg.bugName || cfg.name, accent)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff6ea', opacity: 0, pointerEvents: 'none' }, root)

    function hookLayer(c, t, th) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(c, t, { ...SKY_H, zoom: lerp(1.7, SKY_H.zoom, ss) })
      cfg.hook(c, th, { hero, k: 1, t, HERO })
    }
    const pisF = (c, t, P, tears, mood, look) => pisces(c, t, P, tears, mood, look)

    function chapterLayer(t) {
      cfg.chapters.forEach((ch, i) => {
        const a = C[i], b = a + CH
        if (t < a || t >= b) return
        const u = t - a
        if (u < 3.0) {
          bigNumber(x, t, i + 1, a, a + 3.0, i === 4 ? GOLD : accent)
          const ho = { ...HERO_POS, mood: ch.mood || 'happy', look: [-0.6, 0.2], hops: [a + 0.02, a + 1.2, a + 2.2] }
          shadow(x, ho.x, ho.y + 170, 240)
          hero(x, t, ho)
          if (cfg.heroTears) inSprite(x, starFrame(ho.x, ho.y, ho.s, t, { hops: ho.hops, seed: 3 }), () => tearsCells(x, t, tearsOf(t)))
          if (ch.icon) {
            const k = pop01(t, a + 0.12, 0.3, 2.6) * outK(t, [a + 2.85, a + 3.0])
            if (k > 0.01) icon(x, ch.icon, ho.x + 150, ho.y - 210 + 8 * Math.sin(t * 5), 11 * k, { rot: 0.1 * Math.sin(t * 4) })
            sparkles(x, t, ho.x + 150, ho.y - 210, a + 0.14, 8, 90, i, [GOLD, BONE, accent])
          }
        } else {
          const k = clamp(prog(u, 3.0, 3.25)) * outK(u, [9.75, 10])
          x.save(); x.globalAlpha = k
          ch.draw(x, t, { u: u - 3.0, t0: a + 3.0, hero, HERO, pis: pisF, accent, tears: tearsOf(t) })
          x.restore()
        }
      })
    }

    function finale(t) {
      if (t < T.last) return
      const k = pop01(t, T.last, 0.34, 2.2)
      shadow(x, 540, 1070, 260 * k)
      const fo = { x: 540, y: 880, s: 300, pop: k, mood: cfg.lastMood || 'sparkle', look: [0, 0], hops: [T.last + 0.05, T.last + 0.8, T.last + 3, T.last + 4.6] }
      if (cfg.finale) cfg.finale(x, t, { hero, HERO, k, u: t - T.last })
      hero(x, t, fo)
      if (cfg.heroTears) inSprite(x, starFrame(fo.x, fo.y, fo.s, t, { pop: k, hops: fo.hops, seed: 3 }), () => tearsCells(x, t, 3))
      hearts(x, t, T.last + 0.2, 540, 700, { n: 6 }); hearts(x, t, T.last + 2.6, 540, 700, { n: 6 }); hearts(x, t, T.last + 4.8, 540, 700, { n: 6 })
      sparkles(x, t, 540, 880, T.last + 0.1, 12, 230, 1, [GOLD, BONE, accent])
      const sk = pop01(t, T.last + 0.3, 0.3, 2.1)
      if (sk > 0.01) { drawStarChar(x, 170, 1640, 150, t, { color: STAR.sky, mood: 'happy', look: [1, -0.6], pop: sk, seed: 2, glow: 1, hops: [T.last + 0.55, T.last + 1.0, T.last + 3.5] }); label(x, 'THE STARS', 170, 1760, { size: 26, col: GOLD, alpha: clamp(sk) }) }
    }

    function piscesCorner(t) {
      if (cfg.heroTears) return
      const z = LOOP ? T.loop[0] : D + 1
      const pk = pop01(t, C[0] + 0.3, 0.3, 2) * outK(t, [z, z + 0.3])
      if (pk <= 0.01) return
      const fin = t >= T.last
      const P = fin ? { x: 900, y: 1640, s: 170 } : { x: 960, y: 1790, s: 120 }
      tissues(x, P.x - P.s * 0.8, P.y + P.s * 0.28, P.s * 0.5 * Math.min(1, pk))
      pisces(x, t, { ...P, pop: pk, hops: C.map(c => c + 0.4) }, fin ? 3 : tearsOf(t), t > C[4] ? 'sparkle' : 'wide', [-1, -0.7])
    }
    function counter(c, t, alpha) {
      if (alpha <= 0 || t < C[0] + 0.4) return
      const n = tissueCount(t), fin = t > C[4] + 6.4
      label(c, `TISSUES: ${fin ? 'ALL OF THEM' : n}`, 1024, 128, { size: 26, col: SKYB, align: 'right', alpha })
    }
    function pips(c, t, alpha) {
      if (alpha <= 0) return
      const X0 = 56, w = 36, gap = 12, Y = 122
      c.save(); c.globalAlpha = alpha
      for (let i = 0; i < 5; i++) { R(c, INK, X0 + i * (w + gap) - 4, Y - 4, w + 8, 18); R(c, t >= C[i] ? (i === 4 ? GOLD : accent) : 'rgba(239,230,214,0.22)', X0 + i * (w + gap), Y, w, 10) }
      c.restore()
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        let zoom = 1
        for (const a of C) { const p = t - a; if (p > 0 && p < 0.3) zoom *= 1 + 0.05 * Math.exp(-p * 14) }
        const dS = Math.min(...C.map(a => (t >= a ? t - a : 9)))
        const shake = dS < 0.25 ? 12 * Math.exp(-dS * 14) * Math.sin(dS * 70) : 0
        x.clearRect(0, 0, 1080, 1920)
        x.save(); x.translate(540, 900); x.scale(zoom, zoom); x.translate(-540 + shake, -900)
        if (t < H + 0.02) hookLayer(x, t, t)
        else { drawSky(x, t, SKY_H); chapterLayer(t); finale(t); piscesCorner(t) }
        x.restore()
        lx.clearRect(0, 0, 1080, 1920)
        let q = 0
        if (LOOP && t > T.loop[0]) { q = loopK(t, D, LOOP); lx.save(); lx.globalAlpha = q; hookLayer(lx, 0, 0); lx.restore() }
        tx.clearRect(0, 0, 1080, 1920)
        pips(tx, t, t >= H ? 1 - q : 0)
        counter(tx, t, 1 - q)
        HOOK.update(0, t < H ? outK(t, T.hookOut) : q)
        chip.update(t, T.promise, T.hookOut)
        stickers.forEach((s, i) => s.update(t, C[i] + 0.06, [C[i] + 2.8, C[i] + 3.05]))
        caps.forEach((s, i) => s.update(t, C[i] + 3.0, [C[i] + 9.75, C[i] + 10]))
        boxes.forEach(b => b.update(t))
        LAST.update(t, 1 - q)
        let fl = 0, fcol = '#fff6ea'
        if (brk.type === 'flash' && t >= brk.at && t < brk.at + 0.16) { fl = 0.9 * (1 - (t - brk.at) / 0.16); fcol = accent }
        for (const a of C) if (t >= a && t < a + 0.1) fl = Math.max(fl, 0.3 * (1 - (t - a) / 0.1))
        if (t >= T.last && t < T.last + 0.12) fl = Math.max(fl, 0.4 * (1 - (t - T.last) / 0.12))
        flash.style.background = fcol; flash.style.opacity = String(fl)
        drawGrain(gx, q > 0.999 ? 0 : t)
      },
    }
  }

  const fxScene = { whip: whipZoom, scratch: recordScratch, glitch, flash: screenShake }[brk.type]
  const main = brk.type === 'scratch' ? frozen(build, [FX]) : build
  const CHAPS = cfg.chapters.map((c, i) => ({ at: r3(C[i] + 0.05), out: [r3(C[i] + 9.7), r3(C[i] + 9.9)], n: i + 1, title: c.title, color: i === 4 ? GOLD : accent }))
  const SCENES = [main, ...(fxScene ? [fxScene(FX)] : []), ...CHAPS.map(o => chapter(o))]

  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const brkCues = { whip: () => whipZoomCues(FX), scratch: () => recordScratchCues(FX), glitch: () => glitchCues(FX), flash: () => [...shakeCues(FX), ['bell', brk.at, 1760, 0.035, 0.8, 0]] }[brk.type]?.() || []
  const CUES = [
    ...brkCues,
    ['pop', T.promise, 1174.66, 0.05, 0], ['tom', T.promise, 110, { gain: 0.24, decay: 0.2 }], ['bell', r3(T.promise + 0.05), 1760, 0.025, 0.8, 0],
    ['whoosh', r3(H - 0.15), 0.2, 0.04],
    ...C.flatMap((a, i) => [
      ['tom', a, 98 - i * 6, { gain: 0.3, decay: 0.25 }], ['tick', a, 0.07], ['pop', r3(a + 0.06), NOTE[(i * 2) % 7], 0.045, (i % 2 ? 0.2 : -0.2)],
      ['pluck', r3(a + 0.4), 2349.32, 0.012, 0.3, 0.6], ['whoosh', r3(a + 2.9), 0.25, 0.03],
      ...chapterCues(CHAPS[i]),
      ...((cfg.chapters[i].cues || []).map(c => [c[0], r3(c[1] + a + 3.0), ...c.slice(2)])),
    ]),
    ...talkCues(ALL, { cps: CPS }),
    ['bell', r3(T.last + 0.05), 1760, 0.035, 1.2, 0], ['glitter', r3(T.last + 0.05), r3(T.last + 0.8)], ['pop', r3(T.last + 0.3), 739.99, 0.035, -0.4],
    ['pluck', r3(T.last + 2.6), 1567.98, 0.025, 0.5, 0.4], ['glitter', r3(T.last + 4.8), r3(T.last + 5.3)],
    ...(LOOP ? [['whoosh', T.loop[0], LOOP, 0.035]] : []),
  ]
  const MUSIC = { style: cfg.music.style, key: cfg.music.key, seed: cfg.music.seed, sections: { drop: H, breakdown: [C[2]], lift: [C[4]], outroAt: r3(Math.max(T.last, D - 3)) }, hits: [C[4], T.last] }
  void talkHops
  return { DURATION: D, SCENES, CUES, MUSIC, T, C }
}
