// trdayphone: A DAY IN THE LIFE OF… a phone waiting for a text back (30 s vertical, Star Talk Trends §10.5, music: lofi · Eb)
// Story 0–25.6, then the shared end card. The vlog look lives in ./day.js (identical in all five trday films).
//   0.0–5.0   8:12 PM "A day in the life of… | *a phone.*"  ♊ has just sent "had fun tonight!" (delivered).
//             "message sent. now we *wait*." Sticker "status: *delivered*".
//   5.0–9.3   8:14 PM "Checking: | *constantly.*"  ♊ pokes the screen awake six times; the phone squints at every flash.
//             "two minutes. she checked me *six* times." Sticker "checks: *6*".
//   9.3–13.3  8:31 PM "Buzz! | *wrong one.*"  Three buzzes, rule of three: "battery low", "reminder: water the plant",
//             "mom: did you eat?" ♊ leaps, droops, leaps, droops. "wrong buzz. wrong buzz. hi, *mom*."
//             Sticker "false alarms: *3*".
//  13.4       card cut.
//  13.4–18.6  8:47 PM "Then: | *the right one.*"  The phone feels it coming, vibrates hard: "♌ had the best time.
//             again soon?" ♊ explodes with joy; Pisces sobs. "incoming… it's *them*. it's THEM!" Sticker "buzz: *finally*".
//  18.6–22.4  8:48 PM "Reply: | *a talk card.*"  ♊ answers "yes!!" plus a talk card. "she answered with a *talk card*.
//             classy." Sticker "mood: *charged*".
//  22.4–25.5  "*Worth* | the wait."  ♊ hugs the phone; the phone winks. Everything pops out by 25.5.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, PINK, INTER, MONO, FONTS, pop01, outK, popOut, drawBits, sparkles, hearts, pisces,
  buildBug, buildClock, buildProgress, buildSticker, drawWash, handheld, wordPops, stickerCue, clockCues,
} from './day.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GEM = signStar('gemini'), LEO = signStar('leo')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.15, h0Land: 0.85, h0Out: [4.75, 4.95], sent: 0.9, deliv: 1.6,
  h1: 5.0, h1Out: [9.05, 9.25], pokes: [5.7, 6.25, 6.8, 7.3, 7.75, 8.15],
  h2: 9.35, h2Out: [12.95, 13.15], buzz: [9.55, 10.3, 11.05],
  cut: 13.4,
  h3: 13.45, h3Out: [18.4, 18.6], feel: 13.9, right: 14.6, joy: 14.95,
  h4: 18.65, h4Out: [22.2, 22.4], reply: 19.2, card: 19.7,
  h5: 22.5, hug: [22.6, 23.0], wink: 23.3,
  out: [25.05, 25.45], h5Out: [25.15, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE PHONE', SC = '#7fd0ff'
const LINES = [
  { t: 2.3, speaker: SPEAK, color: SC, text: 'message sent. now we *wait*.' },
  { t: 5.8, speaker: SPEAK, color: SC, text: 'two minutes. she checked me *six* times.' },
  { t: 9.75, speaker: SPEAK, color: SC, text: 'wrong buzz. wrong buzz. hi, *mom*.' },
  { t: 15.2, speaker: SPEAK, color: SC, text: "incoming… it's *them*. it's THEM!" },
  { t: 18.9, speaker: SPEAK, color: SC, text: 'she answered with a *talk card*. classy.' },
]
const CPS = 30
const BOX1 = { open: 2.1, close: 13.15 }, BOX2 = { open: 15.0, close: 22.15 }
const STAMPS = [{ t: 0, text: '8:12 PM' }, { t: T.h1, text: '8:14 PM' }, { t: T.h2, text: '8:31 PM' }, { t: T.h3, text: '8:47 PM' }, { t: T.h4, text: '8:48 PM' }, { t: T.h5, text: '8:49 PM' }]
const STICK = [
  { text: 'status: *delivered*', x: 640, y: 1295, rot: -3, at: 3.2, out: [4.7, 4.95] },
  { text: 'checks: *6*', x: 660, y: 1295, rot: 4, at: 8.3, out: [9.0, 9.25] },
  { text: 'false alarms: *3*', x: 640, y: 1295, rot: -3, at: 11.7, out: [12.9, 13.15] },
  { text: 'buzz: *finally*', x: 660, y: 1295, rot: 3, at: 16.1, out: [18.35, 18.6] },
  { text: 'mood: *charged*', x: 640, y: 1295, rot: -3, at: 20.6, out: [22.15, 22.4] },
]
const CUTS = [9.3, { t: T.cut, kind: 'flip' }, 18.62]
const NOTES = [{ t: T.buzz[0], title: 'BATTERY', text: 'battery low', bad: true }, { t: T.buzz[1], title: 'REMINDER', text: 'water the plant', bad: true }, { t: T.buzz[2], title: 'MOM', text: 'did you eat?', bad: true }]

// layout
const PH = { x: 560, y: 860, w: 400, h: 660 }
const GEMP = { x: 195, y: 1150, s: 220 }
const PISP = { x: 950, y: 1250, s: 110 }
const GEM_HOPS = [T.sent - 0.1, ...T.pokes, ...T.buzz.map(b => b + 0.1), T.joy, T.joy + 0.35, T.joy + 0.7, T.reply, T.hug[0], T.wink]
const PHONE_HOPS = [T.deliv, ...T.buzz, T.right, T.reply, T.wink, ...talkHops(LINES, SPEAK, { cps: CPS })]

// ── face bitmaps
function eyeBM(kind, lx = 0, ly = 0) {
  if (kind === 'shut') return ['WWWW']
  if (kind === 'happy') return ['.WW.', 'W..W']
  if (kind === 'squint') return ['WWWW', '.WW.']
  if (kind === 'heart') return ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
  const wide = kind === 'wide'
  const w = wide ? 5 : 4, h = wide ? 6 : 5, ps = wide ? 1 : 2
  const rows = Array.from({ length: h }, (_, j) => Array.from({ length: w }, (_, i) => ((i === 0 || i === w - 1) && (j === 0 || j === h - 1)) ? '.' : 'W'))
  const px = clamp(Math.round((w - ps) / 2 + lx), 0, w - ps), py = clamp(Math.round((h - ps) / 2 + ly), 1, h - 1 - ps)
  for (let j = 0; j < ps; j++) for (let i = 0; i < ps; i++) rows[py + j][px + i] = 'K'
  return rows.map(r => r.join(''))
}
const MOUTH = { smile: ['W...W', '.WWW.'], grin: ['WWWWW', 'WRRRW', '.WWW.'], o: ['.WW.', 'W..W', '.WW.'], flat: ['WWWW'], wavy: ['W.W.W', '.W.W.'] }
const FCOL = { W: '#eaf6ff', K: '#0b0820', H: '#ff4f86', R: '#ff8fa0' }

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const cardImg = await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + 'card-talk-6.png' })
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'A day in the life of… | *a phone.*', { top: 176, size: 84, accentSize: 128, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, accentColor: '#7fd0ff' })
  const H1 = popText(root, 'Checking: | *constantly.*', { top: 176, size: 100, accentSize: 140, at: T.h1, gap: 0.1, accentColor: '#c9a6ff' })
  const H2 = popText(root, 'Buzz! | *wrong one.*', { top: 176, size: 100, accentSize: 140, at: T.h2, gap: 0.1, accentColor: '#ff8f6a' })
  const H3 = popText(root, 'Then: | *the right one.*', { top: 176, size: 100, accentSize: 140, at: T.h3, gap: 0.1, accentColor: GOLD })
  const H4 = popText(root, 'Reply: | *a talk card.*', { top: 176, size: 100, accentSize: 140, at: T.h4, gap: 0.1, accentColor: '#ff8fb1' })
  const H5 = popText(root, '*Worth* | the wait.', { top: 176, size: 120, accentSize: 170, at: T.h5, gap: 0.14, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out]]
  const stickers = STICK.map(s => buildSticker(root, s))
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 3), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(3), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const clock = buildClock(root, { stamps: STAMPS, at: T.bug + 0.1 })
  const bar = buildProgress(root, { end: STORY_END, marks: STAMPS.slice(1).map(s => s.t), at: T.bug + 0.15 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const lastPoke = t => { let p = -1e9; for (const v of T.pokes) if (v <= t) p = v; return t - p }
  const lastBuzz = t => { let p = -1e9; for (const v of [...T.buzz, T.right]) if (v <= t) p = v; return t - p }

  function phoneFace(t) {
    let f = { eyes: 'open', mouth: 'smile', look: [0, 0] }
    if (t > T.deliv && t < T.h1) f = { eyes: 'open', mouth: 'flat', look: [-1, 0] }
    if (t >= T.h1) { f = { eyes: 'open', mouth: 'flat', look: [-1, 0] }; if (lastPoke(t) < 0.4) f = { eyes: 'squint', mouth: 'wavy' } }
    if (t > T.pokes[5] + 0.4 && t < T.h2) f = { eyes: 'squint', mouth: 'flat' }
    if (t >= T.h2) { f = { eyes: 'open', mouth: 'flat', look: [-1, 0] }; if (lastBuzz(t) < 0.5) f = { eyes: 'wide', mouth: 'o' }; else if (t > T.buzz[0]) f = { eyes: 'open', mouth: 'wavy', look: [-1, 1] } }
    if (t >= T.cut) f = { eyes: 'open', mouth: 'flat', look: [0, -1] }
    if (t > T.feel) f = { eyes: 'wide', mouth: 'o', look: [0, -1] }
    if (t > T.right) f = { eyes: 'heart', mouth: 'grin' }
    if (t > T.h4) f = { eyes: 'happy', mouth: 'grin' }
    if (t > T.h5) f = { eyes: t > T.wink && t < T.wink + 0.9 ? 'wink' : 'happy', mouth: 'grin' }
    return f
  }

  function banner(t, y0, t0, title, text, { gold = false, life = 0.95 } = {}) {
    if (t < t0) return
    const k = ease.outBack(prog(t, t0, t0 + 0.25)) * (life ? outK(t, [t0 + life - 0.15, t0 + life]) : 1)
    if (k <= 0.01) return
    const w = PH.w - 64, h = 112
    x.save(); x.translate(0, y0 - (1 - k) * 80); x.globalAlpha *= clamp(k * 2)
    x.fillStyle = gold ? '#fff1c8' : '#2b2160'; x.fillRect(-w / 2 + 6, 0, w - 12, h); x.fillRect(-w / 2, 6, w, h - 12)
    x.fillStyle = gold ? GOLD : '#4a3c8a'; x.fillRect(-w / 2 + 16, 18, 44, 44)
    x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = gold ? INK : '#c9bff0'; x.fillText(title, -w / 2 + 74, 40)
    x.font = `600 27px ${INTER}`; x.fillStyle = gold ? INK : BONE
    String(text).split('|').forEach((ln, i) => x.fillText(ln.trim(), -w / 2 + 74, 76 + i * 30))
    x.restore()
  }
  function bubble(t, y, t0, text, side, { col = '#4f8df0', size = 28 } = {}) {
    if (t < t0) return
    const k = easeOutBack(prog(t, t0, t0 + 0.25), 2)
    x.save(); x.font = `600 ${size}px ${INTER}`
    const w = x.measureText(text).width + 36, h = size + 26
    const bx = side === 'R' ? PH.w / 2 - 40 - w : -PH.w / 2 + 40
    x.translate(bx + (side === 'R' ? w : 0), y + h); x.scale(k, k); x.translate(side === 'R' ? -w : 0, -h)
    x.fillStyle = col; x.fillRect(4, 0, w - 8, h); x.fillRect(0, 4, w, h - 8)
    x.fillStyle = BONE; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillText(text, 18, h / 2 + 1)
    x.restore()
  }

  function phone(t) {
    const o = popOut(t, T.out)
    if (o <= 0.01) return
    const lb = lastBuzz(t), buzzing = lb >= 0 && lb < (t > T.right - 0.01 && t < T.right + 2 ? 0.9 : 0.5)
    const feel = t > T.feel && t < T.right ? 2 * Math.sin(t * 60) : 0
    const jx = buzzing ? 12 * Math.sin(t * 90) : feel
    let sq = 0
    for (const h of PHONE_HOPS) { const d = t - h; if (d > 0 && d < 0.5) sq = 0.05 * Math.sin(d * 18) * Math.exp(-d * 6) }
    const hug = ease.inOutCubic(prog(t, ...T.hug))
    const pi = pop01(t, 0.3, 0.4, 1.8)
    x.save(); x.translate(PH.x + jx - 40 * hug, PH.y); x.rotate(-0.06 * hug + 0.02 * Math.sin(t * 1.3)); x.scale(pi * o * (1 + sq), pi * o * (1 - sq * 0.9))
    const w = PH.w, h = PH.h, C = 12
    x.fillStyle = INK; x.fillRect(-w / 2 + C, -h / 2, w - 2 * C, h); x.fillRect(-w / 2, -h / 2 + C, w, h - 2 * C)
    x.fillStyle = '#ff8fb1'; x.fillRect(-w / 2 + 2 * C, -h / 2 + C, w - 4 * C, h - 2 * C); x.fillRect(-w / 2 + C, -h / 2 + 2 * C, w - 2 * C, h - 4 * C)
    x.fillStyle = '#ffb3cf'; x.fillRect(-w / 2 + 2 * C, -h / 2 + C, w - 4 * C, C / 2)
    const sw = w - 4 * C, sh = h - 4 * C
    // the screen (brightens on a poke / a buzz)
    const flash = Math.max(lastPoke(t) >= 0 ? Math.exp(-lastPoke(t) * 6) : 0, buzzing ? 0.35 : 0)
    x.fillStyle = '#120c2a'; x.fillRect(-sw / 2, -sh / 2, sw, sh)
    if (flash > 0.01) { x.fillStyle = `rgba(200,230,255,${(0.45 * flash).toFixed(3)})`; x.fillRect(-sw / 2, -sh / 2, sw, sh) }
    x.fillStyle = INK; x.fillRect(-50, -sh / 2, 100, 14)
    x.save(); x.beginPath(); x.rect(-sw / 2, -sh / 2, sw, sh); x.clip()
    // top: the thread / the banners
    const top = -sh / 2 + 40
    if (t < T.h2 - 0.1) {
      x.font = `700 22px ${MONO}`; x.fillStyle = '#9a90c8'; x.textAlign = 'center'; x.fillText(`${LEO.glyph}︎ LEO`, 0, top + 6)
      bubble(t, top + 30, T.sent, 'had fun tonight!', 'R')
      if (t > T.deliv) { x.font = `700 18px ${MONO}`; x.fillStyle = '#9a90c8'; x.textAlign = 'right'; x.fillText('delivered', PH.w / 2 - 44, top + 112) }
    } else if (t < T.cut) {
      NOTES.forEach((n, i) => banner(t, top + 10 + i * 0, n.t, n.title, n.text, { life: i < 2 ? 0.7 : 2.4 }))
    } else if (t < T.h4) {
      banner(t, top + 10, T.right, `${LEO.glyph}︎ LEO`, 'had the best time. | again soon?', { gold: true, life: 0 })
    } else {
      x.font = `700 22px ${MONO}`; x.fillStyle = '#9a90c8'; x.textAlign = 'center'; x.fillText(`${LEO.glyph}︎ LEO`, 0, top + 6)
      bubble(t, top + 24, T.h4 - 0.2, 'again soon?', 'L', { col: '#3b3466' })
      bubble(t, top + 92, T.reply, 'yes!!', 'R')
      if (cardImg && t > T.card) {
        const k = easeOutBack(prog(t, T.card, T.card + 0.3), 1.6), cw = 120 * k, ch = cw * cardImg.height / cardImg.width
        x.save(); x.translate(PH.w / 2 - 120, top + 160 + ch / 2); x.rotate(0.06); x.drawImage(cardImg, -cw / 2, 0 - ch / 2, cw, ch); x.restore()
      }
    }
    // the face (lower half of the screen)
    let f = phoneFace(t), eyes = f.eyes
    if (eyes === 'open' || eyes === 'wide') { const ph = (t * 0.31 + 0.2) % 1; if (ph < 0.04) eyes = 'shut' }
    const L = eyes === 'wink' ? 'happy' : eyes, R = eyes === 'wink' ? 'open' : eyes
    const fy = t >= T.h4 ? 200 : 120, fc = t >= T.h4 ? 9 : 12
    drawBits(x, eyeBM(L, f.look?.[0] ?? 0, f.look?.[1] ?? 0), FCOL, -fc * 5, fy, fc, { outline: null })
    drawBits(x, eyeBM(R, f.look?.[0] ?? 0, f.look?.[1] ?? 0), FCOL, fc * 5, fy, fc, { outline: null })
    drawBits(x, MOUTH[f.mouth], FCOL, 0, fy + fc * 5, fc, { outline: null })
    x.restore()
    x.restore()
    // buzz marks
    if (buzzing) for (const s of [-1, 1]) for (let k = 0; k < 2; k++) drawBits(x, ['K.', '.K', 'K.', '.K'], { K: GOLD }, PH.x + s * (PH.w / 2 + 34 + k * 26), PH.y - 120 + k * 60, 8, { outline: null, alpha: 0.9 })
  }

  function owner(t) {
    const o = popOut(t, T.out)
    let mood = 'happy', look = [1, -0.5]
    if (t > T.deliv) { mood = 'neutral'; look = [1, -0.5] }
    if (t >= T.h1) mood = 'neutral'
    for (const p of T.pokes) if (t > p && t < p + 0.3) { mood = 'wide' }
    if (t >= T.h2) { mood = 'neutral'; for (const b of T.buzz) { if (t > b && t < b + 0.35) mood = 'sparkle'; if (t > b + 0.35 && t < b + 0.75) mood = 'wide' } if (t > T.buzz[2] + 0.75) mood = 'eyeroll' }
    if (t >= T.cut) mood = 'sleepy'
    if (t > T.feel) mood = 'wide'
    if (t > T.joy) { mood = 'heart'; look = undefined }
    if (t > T.h4) mood = 'sparkle'
    if (t > T.reply + 0.5) mood = 'happy'
    if (t > T.hug[0]) mood = 'heart'
    const hug = ease.inOutCubic(prog(t, ...T.hug))
    const jump = t > T.joy && t < T.joy + 1.2 ? 60 * Math.abs(Math.sin((t - T.joy) * Math.PI / 0.4)) : 0
    // droop after each wrong buzz
    let droop = 0
    for (const b of T.buzz) droop = Math.max(droop, ease.inOutCubic(prog(t, b + 0.45, b + 0.7)) * outK(t, [b + 0.7, b + 0.75 + (b === T.buzz[2] ? 1.5 : 0.1)]))
    drawStarChar(x, GEMP.x + 120 * hug, GEMP.y - jump, GEMP.s, t, { color: GEM.color, glyph: GEM.glyph, mood, look, hops: GEM_HOPS, pop: pop01(t, 0.5, 0.36, 2) * o, seed: 4, glow: 1.1, squash: 0.12 * droop, zzz: false })
    if (t > T.joy && t < T.joy + 0.8) sparkles(x, t, GEMP.x, GEMP.y - 80, T.joy, 12, 190, 1, [GOLD, BONE, PINK])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, { ...SKY_H, moon: null, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) })
      drawWash(x, t, { warm: popOut(t, T.out) })
      const hh = handheld(t)
      x.save(); x.translate(540 + hh.dx, 960 + hh.dy); x.rotate(hh.rot); x.translate(-540, -960)
      if (t < T.out[1] + 0.02) {
        // the nightstand
        const tk = clamp(prog(t, 0, 0.5)) * popOut(t, T.out)
        if (tk > 0.01) { x.save(); x.globalAlpha *= tk; x.fillStyle = INK; x.fillRect(0, 1222, 1080, 46); x.fillStyle = '#7a4e6e'; x.fillRect(0, 1230, 1080, 30); x.fillStyle = '#9b6a8a'; x.fillRect(0, 1230, 1080, 8); x.restore() }
        pisces(x, t, { ...PISP, pop: pop01(t, 0.9, 0.36, 2) * popOut(t, T.out) }, t > T.joy ? 3 : t > T.h2 ? 2 : 1, t > T.joy ? 'happy' : t > T.h2 && t < T.cut ? 'wide' : 'sparkle', [-1, -0.5])
        phone(t)
        owner(t)
        if (t > T.joy) hearts(x, t, PH.x, PH.y - 250, T.joy, { n: 8, life: 3, spread: 420, alpha: outK(t, [T.h3Out[0], T.h3Out[1]]) })
        if (t > T.hug[1]) hearts(x, t, PH.x - 120, PH.y - 200, T.hug[1], { n: 6, life: 2, spread: 300, alpha: popOut(t, T.out) })
        if (t > T.wink && t < T.wink + 0.8) sparkles(x, t, PH.x, PH.y, T.wink, 12, 300, 3, [GOLD, BONE, '#7fd0ff'])
      }
      x.restore()
      box1.update(t); box2.update(t)
      for (const s of stickers) s.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut)); clock.update(t, outK(t, T.bugOut)); bar.update(t, outK(t, T.bugOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.4, between the wrong buzzes and the right one)
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br' }), cardCuts(CUTS)]

// ── sound
const bzz = (t0, n = 5, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * 0.07).toFixed(3), gain])
export const CUES = [
  ...wordPops(T.h0, 5, 0.07, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.1, 1318.51, 0.04, 0],
  ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.bug + 0.16, 0.03],
  ['whoosh', T.sent, 0.3, 0.03], ['pop', T.sent + 0.05, 1318.51, 0.04, 0.3], ['tick', T.deliv, 0.04],
  // checking
  ...wordPops(T.h1, 3, 0.1, 2, 0.026), ...T.pokes.map((p, i) => ['pop', p, 1567.98 + i * 40, 0.03, 0.2]),
  // wrong buzzes
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ...T.buzz.flatMap((b, i) => [...bzz(b), ['pop', b + 0.35, 1174.66, 0.035, -0.4], ['pluck', b + 0.5, [392, 370, 349.23][i], 0.035, 0.5, -0.4]]),
  // the right one
  ...wordPops(T.h3, 4, 0.1, 3, 0.026), ['riser', T.feel, T.right, 0.03], ...bzz(T.right, 10, 0.04), ['pop', T.right + 0.05, 1567.98, 0.05, 0], ['bell', T.right + 0.1, 2349.32, 0.03, 1.0, 0],
  ['pop', T.joy, 1318.51, 0.05, -0.3], ['pop', T.joy + 0.35, 1567.98, 0.045, -0.3], ['pop', T.joy + 0.7, 1975.53, 0.04, -0.3], ['glitter', T.joy, T.joy + 0.8],
  // reply
  ...wordPops(T.h4, 4, 0.1, 0, 0.026), ['whoosh', T.reply, 0.3, 0.03], ['pop', T.reply + 0.05, 1318.51, 0.04, 0.3], ['whoosh', T.card, 0.3, 0.03], ['pluck', T.card + 0.3, 1318.51, 0.04, 0.6, 0.3],
  // worth the wait
  ...wordPops(T.h5, 4, 0.14, 2, 0.03), ['pluck', T.hug[1], 1174.66, 0.04, 0.6, -0.2], ['pop', T.wink, 1567.98, 0.045, 0.2], ['bell', T.wink + 0.05, 2349.32, 0.025, 1.0, 0.2], ['glitter', T.wink, T.wink + 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...clockCues(STAMPS), ...STICK.flatMap((s, i) => stickerCue(s.at, i)),
  ...talkCues(LINES, { cps: CPS }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
