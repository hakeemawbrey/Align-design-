// NATURE DOCUMENTARY NARRATOR: the shared format of Trends Vol. 2 eps 36–40 (nt2e36–nt2e40), on
// ../../nt2e21/scenes/trendkit.js. Letterbox bars, a slow handheld drift, a lower third ("THE TAURUS · *Taurus
// cozius*"), leafy bushes in the foreground as the hide, and THE STARS narrating in a hush in the dialogue box (speaker
// THE NARRATOR). Three observed behaviours with chapter tags ("I · THE NEST"); the third (under the one card cut) is
// the rare, tender one (a blinking RARE FOOTAGE chip). Pisces watches from the hide with binoculars and cries.
//
// 23 s (slate 25 s) · story 0–20.6 · then the 2.4 s short end card. No card-back cut: the old cut time is a white flash.
//   0.00–2.40  hook (on screen at t = 0): the hook caption + the sign mid-behaviour + the lower third.
//   2.40–7.40  chapter I · 7.40–12.40 chapter II · 12.40–17.00 chapter III (card cut 12.4) · 17.0 finale · 17.3 last line.
//
//   makeNat(cfg) → { DURATION, SCENES, CUES }
//     cfg.id, cfg.sign, cfg.mate, cfg.latin ('Taurus cozius'), cfg.hook (text), cfg.accent, cfg.deep
//     cfg.hookDraw(x, t, S), cfg.chapters: 3 × { tag, line, draw(x, t, S), pose(u) → hero opts, cues }
//     cfg.last, cfg.finaleDraw(x, t, S)
import {
  makeFilm, star, pisces, theStars, at, R, box, label, shadow, sparkles, hearts, bushProp, binoculars, pop01, outK,
  popOut, prog, lerp, clamp, ease, r3, el, NAMES, GOLD, BONE, INK, PINK, INTER, SERIF, MONO, CPS,
} from '../../nt2e21/scenes/trendkit.js'

export const DURATION = 25   // the slate length; the film itself is 2.0 s shorter (short end card, CHANGE 4 Nov, see trendkit.js makeFilm)
const STORY_END = DURATION - 4.4
export const T = {
  hookOut: [2.25, 2.4],
  ch: [[2.4, 7.4], [7.4, 12.4], [12.4, 17.0]],
  cut: 12.4, fin: 17.0, last: 17.3, boxClose: 20.2, out: [20.2, 20.6], lt: [0.0, 4.6],
}
const GROUND = 1240

function letterbox(x) { R(x, '#000', 0, 0, 1080, 130); R(x, '#000', 0, 1790, 1080, 130) }
function vignette(x) {
  const g = x.createRadialGradient(540, 960, 380, 540, 960, 1100)
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.55)')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
}
function ground(x, t) {
  R(x, '#1a2a26', 0, GROUND, 1080, 700); R(x, '#24402f', 0, GROUND, 1080, 12)
  for (let i = 0; i < 26; i++) { const gx = (i * 97) % 1080, gy = GROUND + 20 + ((i * 53) % 160); R(x, '#2f5a3a', gx, gy - 14 - Math.sin(t * 2 + i) * 2, 6, 14); R(x, '#2f5a3a', gx + 8, gy - 10, 6, 10) }
}

/** the lower third (DOM): a bone rule, THE <SIGN> in Inter 800, the Latin name in Garamond italic */
function buildLowerThird(root, { name, latin, col, at: a, out }) {
  const w = el('div', { position: 'absolute', left: '64px', top: '1250px', display: 'none', pointerEvents: 'none' }, root)
  const rule = el('div', { height: '6px', background: col, width: '0px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.6)' }, w)
  const n = el('div', { font: `800 54px ${INTER}`, letterSpacing: '0.14em', color: BONE, textShadow: '0 3px 12px rgba(0,0,0,0.9)', whiteSpace: 'nowrap' }, w, `THE ${name.toUpperCase()}`)
  const l = el('div', { font: `italic 500 50px ${SERIF}`, color: col, textShadow: '0 3px 12px rgba(0,0,0,0.9)', whiteSpace: 'nowrap', marginTop: '2px' }, w, latin)
  return {
    update(t) {
      const on = t >= a && t < out[1]
      w.style.display = on ? 'block' : 'none'
      if (!on) return
      const o = outK(t, out), p = a < 0 ? 1 : ease.outCubic(prog(t, a, a + 0.5))
      rule.style.width = (420 * p).toFixed(0) + 'px'
      n.style.opacity = String(o * clamp(p * 1.4)); l.style.opacity = String(o * clamp(p * 1.4 - 0.2))
      w.style.transform = `translateX(${((1 - o) * -40).toFixed(1)}px)`
    },
  }
}
/** the chapter tag (DOM): "I · THE NEST" in Garamond small caps under the bug */
function buildChapter(root, { n, text, at: a, out, rare }) {
  const w = el('div', { position: 'absolute', left: '64px', top: '150px', display: 'none', alignItems: 'center', gap: '18px', pointerEvents: 'none' }, root)
  el('div', { font: `italic 500 52px ${SERIF}`, color: GOLD, textShadow: '0 3px 10px rgba(0,0,0,0.9)' }, w, n)
  el('div', { width: '40px', height: '3px', background: BONE, opacity: 0.7 }, w)
  el('div', { font: `500 44px ${SERIF}`, letterSpacing: '0.12em', color: BONE, fontVariant: 'small-caps', textShadow: '0 3px 10px rgba(0,0,0,0.9)', whiteSpace: 'nowrap' }, w, text)
  const chip = rare ? el('div', { position: 'absolute', left: '0', top: '78px', display: 'flex', alignItems: 'center', gap: '10px', font: `700 26px ${MONO}`, letterSpacing: '0.12em', color: '#ff6b7f', whiteSpace: 'nowrap' }, w, '<span style="width:18px;height:18px;border-radius:50%;background:#ff4a64;display:inline-block"></span>RARE FOOTAGE') : null
  return {
    update(t) {
      const on = t >= a && t < out[1]
      w.style.display = on ? 'flex' : 'none'
      if (!on) return
      const p = ease.outCubic(prog(t, a, a + 0.4)), o = outK(t, out)
      w.style.opacity = String(p * o); w.style.transform = `translateY(${((1 - p) * 16).toFixed(1)}px)`
      if (chip) chip.style.opacity = String(t > a + 0.5 ? (Math.floor((t - a) * 2) % 2 ? 0.35 : 1) : 0)
    },
  }
}

export function makeNat(cfg) {
  const HERO = cfg.sign, MATE = cfg.mate
  const C = T.ch
  const SPEAK = 'THE NARRATOR'
  const LINES = [...cfg.chapters.map((c, i) => ({ t: r3(C[i][0] + 0.55), speaker: SPEAK, text: c.line })), { t: T.last, speaker: SPEAK, text: cfg.last }]
  const hero = (x, t, o) => star(x, t, HERO, { seed: 3, glow: 1.1, ...o })
  const mate = (x, t, o) => star(x, t, MATE, { seed: 7, ...o })

  function cam(t) {
    // slow push per shot + handheld drift
    let a = 0, z0 = 1.22
    const shots = [0, ...C.map(c => c[0]), T.fin]
    for (const s of shots) if (t >= s) a = s
    const next = shots.find(s => s > a) ?? STORY_END
    const z = z0 + 0.06 * prog(t, a, next)
    return { z, dx: 6 * Math.sin(t * 0.9) + 3 * Math.sin(t * 2.3), dy: 4 * Math.sin(t * 1.1 + 1) }
  }
  function hide(x, t, peekK, tears) {
    bushProp(x, t, 110, 1330, 330, 200, { seed: 1 })
    // Pisces peeks over the right bush with binoculars
    if (peekK > 0.01) {
      const F = pisces(x, t, { x: 870, y: 1250 - 50 * peekK, s: 140 }, tears, 'sparkle', [-1, -0.3])
      binoculars(x, 870, F.cy + 6, 1.2)
    }
    bushProp(x, t, 975, 1345, 300, 200, { seed: 4, col: '#2a5e36' })
  }

  function paint(x, t) {
    const c = cam(t)
    x.save(); x.translate(540 + c.dx, 1150 + c.dy); x.scale(c.z, c.z); x.translate(-540, -1150)
    ground(x, t)
    let i = -1
    for (let k = 0; k < 3; k++) if (t >= C[k][0] && t < C[k][1]) i = k
    if (t < C[0][0]) {
      const o = { x: 540, y: 1090, s: 330, mood: cfg.hookMood || 'happy', look: [1, -0.2], hops: [0.4, 1.3] }
      shadow(x, o.x, GROUND, 300)
      if (cfg.hookDraw) cfg.hookDraw(x, t, { hero, mate, o, under: true })
      hero(x, t, o)
      if (cfg.hookDraw) cfg.hookDraw(x, t, { hero, mate, o, under: false })
      hide(x, t, 1, 2)
    } else if (i >= 0) {
      const [a, b] = C[i], u = t - a, ch = cfg.chapters[i]
      const ho = { x: 540, y: 1090, s: 300, mood: 'neutral', look: [1, 0], ...(ch.pose ? ch.pose(u, t) : {}) }
      const S = { u, a, b, i, hero, mate, ho }
      if (ch.draw) ch.draw(x, t, { ...S, under: true })
      shadow(x, ho.x, GROUND, ho.s * 0.9)
      if (!ho.hide) hero(x, t, ho)
      if (ch.draw) ch.draw(x, t, { ...S, under: false })
      hide(x, t, pop01(t, a + 0.6, 0.4, 1.6), i === 2 ? 3 : 2)
    } else if (t >= T.fin && t < T.out[1]) {
      const ok = popOut(t, T.out)
      shadow(x, 420, GROUND, 270 * ok); shadow(x, 680, GROUND, 230 * ok)
      if (cfg.finaleDraw) cfg.finaleDraw(x, t, { hero, mate, ok, under: true })
      hero(x, t, { x: 420, y: 1090, s: 290, pop: ok, mood: 'happy', look: [1, 0], hops: [T.fin + 0.2, T.last + 1.8] })
      mate(x, t, { x: 690, y: 1105, s: 240, pop: ok, mood: 'heart', look: [-1, 0], hops: [T.fin + 0.3, T.last + 2.0] })
      if (cfg.finaleDraw) cfg.finaleDraw(x, t, { hero, mate, ok, under: false })
      hearts(x, t, T.fin + 0.4, 555, 930, { n: 6 })
      hide(x, t, ok, 3)
      // THE STARS, the narrator, peek over the left bush with a tiny mic
      const sk = pop01(t, T.fin + 0.3, 0.4, 2) * ok
      if (sk > 0.01) { const r = theStars(x, t, { x: 200, y: 1250 - 50 * sk, s: 140, pop: sk, mood: 'happy', look: [1, -0.2] }); box(x, 255, r.y - 10, 16, 40, '#5a5470', { b: 4 }); box(x, 249, r.y - 34, 28, 26, '#8c86a8', { b: 4 }) }
    }
    x.restore()
    vignette(x)
    letterbox(x)
  }

  return makeFilm({
    id: cfg.id, duration: DURATION,
    bug: { main: 'NATURE', dim: 'DOCUMENTARY' },
    hook: { text: cfg.hook, color: cfg.accent, out: T.hookOut, top: 230, size: 80, accentSize: 114 },
    paint,
    dom(root) {
      return [
        buildLowerThird(root, { name: NAMES[HERO], latin: cfg.latin, col: cfg.accent, at: -1, out: [T.lt[1] - 0.3, T.lt[1]] }),
        ...cfg.chapters.map((ch, i) => buildChapter(root, { n: ['I', 'II', 'III'][i], text: ch.tag, at: C[i][0] + 0.15, out: [C[i][1] - 0.25, C[i][1]], rare: i === 2 })),
      ]
    },
    lines: LINES, box: { open: LINES[0].t - 0.22, close: T.boxClose, y: 1460, h: 270 },
    pitch: { [SPEAK]: 659.25 },
    flashes: [],
    cuts: [{ t: T.cut, kind: 'flip' }],
    cues: [
      ['whoosh', 0.2, 0.6, 0.015], ['pluck', 0.5, 1174.66, 0.025, 0.8, -0.3],
      ...cfg.chapters.flatMap((ch, i) => {
        const a = C[i][0]
        return [...(i ? [['whoosh', r3(a - 0.1), 0.4, 0.02]] : []), ['pluck', r3(a + 0.15), [987.77, 880, 1318.51][i], 0.03, 0.8, -0.2], ['tick', r3(a + 0.15), 0.02],
          ...(i === 2 ? [['glitter', r3(a + 0.5), r3(a + 1.2)], ['bell', r3(a + 0.6), 1567.98, 0.025, 1.4, 0]] : []), ...at(a, ch.cues)]
      }),
      ['whoosh', T.fin - 0.05, 0.4, 0.02], ['bell', r3(T.fin + 0.4), 1318.51, 0.03, 1.4, 0], ['glitter', r3(T.fin + 0.4), r3(T.fin + 1.0)],
    ],
  })
}
void [sparkles, label, lerp, PINK, INK]
