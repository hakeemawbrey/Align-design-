// st13juno (30 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E36) · story 0–25.6, then the end card.
//   ❓ "Who is *Juno* in astrology?"  ♄ SATURN (glasses, pointer) teaches ♉ TAURUS: Juno is an asteroid (✓) in the
//   main belt between Mars and Jupiter, discovered in 1804 (✓); some astrologers read Juno as commitment and
//   partnership (✦). Lightbulb: "a rock that commits? relatable." Last line (Saturn): "Even *asteroids* commit."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { SATURN, drawSaturn } from '../../st5cast.js'
import { EX } from '../../stexplain.js'
import { makeEpisode } from './classkit.js'

const TAU = signStar('taurus')
const SUN = { x: 30, y: 230 }                        // board-relative
const RM = 200, RJ = 470, A = 0.42                   // Mars / Jupiter orbit radii, half-sweep
const hash = n => { const s = Math.sin(n * 91.7 + 13.1) * 43758.5453; return s - Math.floor(s) }
const JUNO = { r: 335, a: 0.12 }

function system(x, t, B, M) {
  const sx = B.x0 + SUN.x, sy = B.y0 + SUN.y
  // the Sun: a little chalk-yellow pixel disc with rays
  const sk = clamp(prog(t, M.rock + 0.1, M.rock + 0.4))
  if (sk > 0) {
    x.save(); x.globalAlpha *= sk
    x.fillStyle = EX.chalkYellow; x.beginPath(); x.arc(sx, sy, 26, 0, Math.PI * 2); x.fill()
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + t * 0.4; x.fillRect(sx + Math.cos(a) * 38 - 4, sy + Math.sin(a) * 38 - 4, 8, 8) }
    x.restore()
  }
  // the belt: chalk rocks between the two orbits
  const bk = clamp(prog(t, M.belt + 0.3, M.belt + 1.2))
  for (let i = 0; i < 70; i++) {
    const r = 262 + hash(i) * 140, a = (hash(i + 40) * 2 - 1) * A * 0.95 + t * 0.012 * (480 / r)
    if (hash(i + 80) > bk) continue
    const px = sx + Math.cos(a) * r, py = sy + Math.sin(a) * r, s = 3 + Math.round(hash(i + 7) * 3)
    x.fillStyle = 'rgba(244,241,232,0.55)'; x.fillRect(px - s / 2, py - s / 2, s, s)
  }
  // Juno: one rock, circled in pink, with a tiny pixel ring
  const jk = clamp(prog(t, M.rock + 0.6, M.rock + 0.9))
  if (jk > 0) {
    const a = JUNO.a + t * 0.012 * (480 / JUNO.r), px = sx + Math.cos(a) * JUNO.r, py = sy + Math.sin(a) * JUNO.r
    x.save(); x.globalAlpha *= jk
    x.fillStyle = EX.ink; x.fillRect(px - 9, py - 9, 18, 18); x.fillStyle = '#d8cbb8'; x.fillRect(px - 7, py - 7, 14, 14); x.fillStyle = '#ffffff'; x.fillRect(px - 5, py - 5, 4, 4)
    x.strokeStyle = EX.chalkPink; x.lineWidth = 5; x.beginPath(); x.arc(px, py, 30 + 2 * Math.sin(t * 5), 0, Math.PI * 2 * jk); x.stroke()
    x.font = "700 30px 'Space Mono', monospace"; x.fillStyle = EX.chalkPink; x.textAlign = 'center'; x.fillText('JUNO', px, py - 44)
    // the commitment ring, once astrologers get involved
    const rk = clamp(prog(t, M.astro + 0.4, M.astro + 0.8))
    if (rk > 0) {
      x.globalAlpha = jk * rk
      const ry = py + 46 + Math.sin(t * 4) * 3
      x.strokeStyle = EX.gold; x.lineWidth = 6; x.beginPath(); x.arc(px, ry, 13, 0, Math.PI * 2); x.stroke()
      x.fillStyle = '#9fdcff'; x.fillRect(px - 6, ry - 24, 12, 10); x.fillStyle = '#ffffff'; x.fillRect(px - 3, ry - 22, 4, 4)
    }
    x.restore()
  }
}

const arc = r => Array.from({ length: 25 }, (_, i) => { const a = -A + 2 * A * i / 24; return [SUN.x + Math.cos(a) * r, SUN.y + Math.sin(a) * r] })

const EP = makeEpisode({
  id: 'st13juno', numeral: 'S13 E36', duration: 30, key: 'F',
  q: 'Who is *Juno* in astrology?', qAccent: EX.chalkPink,
  teacher: { tag: SATURN.tag, color: SATURN.tagColor, pitch: 440, size: 230, pointer: false,
    draw: (ctx, X, Y, s, t, o) => { const r = drawSaturn(ctx, X, Y - 20, s, t, { ...o, rot: -0.18 }); return { ...r, size: s, top: r.top } } },
  student: { tag: '♉ TAURUS', color: TAU.color, glyph: TAU.glyph, pitch: 659.25 },
  board: { title: 'WHO IS JUNO?' },
  script: [
    { who: 's', text: "Juno? a new planet?? a new SIGN??" },
    { who: 't', text: 'Juno is an *asteroid*. A space rock.', mark: 'rock', tag: { kind: 'sky', x: 820, y: 112, align: 'right' } },
    { who: 't', text: 'Main belt, Mars to Jupiter. Found in *1804*.', mark: 'belt', tag: { kind: 'sky', x: 820, y: 262, align: 'right' } },
    { who: 't', text: 'Some astrologers read it as *commitment*.', mark: 'astro', tag: { kind: 'astro', x: 820, y: 412, align: 'right' } },
    { who: 's', text: 'a rock that commits? *relatable*.', mark: 'bulb' },
  ],
  bulb: 'bulb',
  chalk: [
    { line: arc(RM), at: 'rock+0.2', dur: 0.6, width: 4 },
    { text: 'MARS', x: SUN.x + Math.cos(-A) * RM - 30, y: SUN.y + Math.sin(-A) * RM - 52, at: 'rock+0.6', size: 26, color: '#ff9a6a', cps: 20 },
    { line: arc(RJ), at: 'belt+0.1', dur: 0.7, width: 4 },
    { text: 'JUPITER', x: SUN.x + Math.cos(-A) * RJ - 90, y: SUN.y + Math.sin(-A) * RJ - 52, at: 'belt+0.5', size: 26, color: '#f7dca0', cps: 24 },
    { draw: system },
    { text: '= *ASTEROID*', x: 820, y: 40, at: 'rock+1.0', size: 30, align: 'right' },
    { text: 'MAIN BELT|FOUND *1804*', x: 820, y: 162, at: 'belt+1.0', size: 30, align: 'right' },
    { text: '= *COMMITMENT*', x: 820, y: 340, at: 'astro+0.6', size: 30, align: 'right', color: EX.lilac },
  ],
  recap: ['Juno is an *asteroid*', 'Main belt. Found in *1804*.', 'Astro: *commitment*'],
  last: 'Even *asteroids* commit.', lastWho: 't',
  moods(t, who, ph, M) {
    if (who === 't') {
      if (ph === 'last' || ph === 'recap' || ph === 'bulb') return { mood: 'happy', look: [1, 0] }
      if (ph === 'q' || ph === 0) return { mood: 'squint', look: [1, 0] }
      return { mood: 'neutral', look: [1, -1] }
    }
    if (ph === 'q') return { mood: 'wide', look: [0, -1] }
    if (ph === 'last' || ph === 'recap') return { mood: 'happy', look: [-1, 0] }
    if (ph === 'bulb') return { mood: 'sparkle', look: [-1, -1] }
    if (ph === 0) return { mood: 'wide', look: [-1, 0] }
    if (t >= M.astro + 0.4) return { mood: 'heart', look: [-1, -1] }
    return { mood: 'neutral', look: [-1, -1] }
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
