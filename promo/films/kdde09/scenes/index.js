// kdde09 — DEEP DIVE: SAGITTARIUS IN LOVE, "Everything Nobody Tells You" (≈ 2 min vertical, star_advice; house · A).
// Show kit: ../../kdde07/scenes/ddkit.js (read-only) on top of hookkit.js. No end card, no card cut. Hard cut.
//   0–8.5     COLD OPEN  Sagittarius mid-leap off a suitcase, a map unfolding mid-air, tickets flying.
//             Slam title "Loving a Sagittarius? Pack light." · whip zoom · record scratch + freeze.
//   1 HOW THEY FLIRT   jokes as a love language · dares (the giant dumpling) · "come with me" to a street fair
//   2 WHAT THEY NEED   freedom (the leash snaps into a ribbon) · honesty, even blunt · new things, together
//   3 HOW THEY FIGHT   the brutally honest one-liner · the joke too soon · what helps: "say it kind, then say it true"
//   4 WHAT MAKES THEM STAY   a partner who's an adventure too · a home that isn't a cage · the payoff: Sagittarius
//             folds the map away and just takes your hand.
//   Outro: a hilltop at night, two stars, hand in hand. Last line "Don't hold the map. Hold the hand."
// Pisces (the research assistant, bottom right) cries all film.
import { buildDeepDive, bits, PIX, PAL, GOLD, BONE, INK, PINK, CYAN, MINT, MONO, INTER, rgba, mixHex } from '../../kdde07/scenes/ddkit.js'

const SG = 'sagittarius'
function suitcase(x, cx, cy, w, { rot = 0, open = 0 } = {}) {
  const h = w * 0.7
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillRect(-w * 0.18, -h / 2 - 34, w * 0.36, 34)
  x.fillStyle = '#c86a3a'; x.fillRect(-w / 2, -h / 2, w, h); x.fillStyle = '#e88a52'; x.fillRect(-w / 2, -h / 2, w, h * 0.2)
  x.fillStyle = '#5a2a1a'; x.fillRect(-w * 0.3, -h / 2, 10, h); x.fillRect(w * 0.3 - 10, -h / 2, 10, h)
  x.fillStyle = '#ffe27a'; x.fillRect(-w * 0.12, -h * 0.05, w * 0.24, h * 0.24); x.fillStyle = INK; x.font = `800 ${Math.round(w * 0.07)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GO', 0, h * 0.07)
  x.restore()
}
function map(x, cx, cy, w, { unfold = 1, rot = 0, route = 1, alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  const h = w * 0.68, sx = 0.2 + 0.8 * unfold
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? '#e9dcb4' : '#f4e8cc'; x.fillRect(-w / 2 + i * w / 4, -h / 2, w / 4, h) }
  x.fillStyle = '#9fd8c8'; x.fillRect(-w / 2 + w * 0.1, -h / 2 + h * 0.55, w * 0.3, h * 0.3)
  x.fillStyle = '#7ab86a'; x.fillRect(w * 0.15, -h / 2 + h * 0.1, w * 0.25, h * 0.25)
  x.strokeStyle = '#c42a3f'; x.lineWidth = 6; x.setLineDash([16, 12]); x.beginPath()
  const pts = [[-0.4, 0.3], [-0.2, -0.1], [0.05, 0.2], [0.25, -0.2], [0.42, 0.05]]
  const n = Math.max(1, Math.floor(route * (pts.length - 1)) + 1)
  pts.slice(0, n).forEach(([a, b], i) => (i ? x.lineTo(a * w, b * h) : x.moveTo(a * w, b * h))); x.stroke(); x.setLineDash([])
  x.fillStyle = '#c42a3f'; x.font = `900 ${Math.round(w * 0.12)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; if (route >= 1) x.fillText('✕', pts[4][0] * w, pts[4][1] * h)
  x.restore()
}
function ticket(x, cx, cy, w, rot, text = 'ADMIT 2') {
  const h = w * 0.45
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8); x.fillStyle = '#ffe27a'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#c42a3f'; x.fillRect(w * 0.2, -h / 2, 4, h)
  x.fillStyle = INK; x.font = `800 ${Math.round(Math.min(w * 0.15, w * 1.15 / Math.max(1, text.length)))}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, -w * 0.12, 2)
  x.restore()
}
const DUMPLING = ['....KKKK....', '..KKWWWWKK..', '.KWWSWWSWWK.', 'KWWWWWWWWWWK', 'KWWWWWWWWWWK', '.KWWWWWWWWK.', '..KKKKKKKK..']
const LEASH = (x, x0, y0, x1, y1, snap, t) => {
  x.save(); x.strokeStyle = snap ? '#ff8fb1' : '#8f7f9a'; x.lineWidth = 10; x.beginPath()
  if (!snap) { x.moveTo(x0, y0); x.quadraticCurveTo((x0 + x1) / 2, Math.max(y0, y1) + 60, x1, y1) }
  else for (let i = 0; i < 2; i++) { const sx = i ? x1 : x0, sy = i ? y1 : y0, d = i ? -1 : 1; x.moveTo(sx, sy); for (let k = 1; k <= 8; k++) x.lineTo(sx + d * k * 14, sy + Math.sin(k * 1.4 + t * 6) * 22) }
  x.stroke(); x.restore()
}

const chapters = [
  { note: 'Laugh at the jokes, take a dare or two, and say yes to the random street fair.',
    beats: [
      { cap: 'Jokes are their | *love language.*',
        lines: [{ text: 'if they roast you a little, *they like you a lot.*' }, { who: 'sign', text: 'nice shoes. very *bold choice.*' }],
        draw(x, t, lt, H) {
          H.hero({ x: 300, y: 970, s: 290, mood: lt > 4.2 ? 'wink' : 'happy', look: [1, 0] })
          H.you({ x: 790, y: 980, s: 240, mood: lt > 5 ? 'happy' : lt > 4.2 ? 'wide' : 'happy', look: [-1, 0], squash: lt > 5 ? 0.08 * Math.sin(lt * 30) : 0 })
          // a laugh meter that pegs
          H.meter(540, 650, 560, H.clamp(0.2 + H.in(lt, 4.8, 5.6) * 0.8), { label: 'LAUGH METER', col: '#ffe27a', k: H.pop(lt, 0.3) })
          if (lt > 5) for (let i = 0; i < 4; i++) H.label('HA', 700 + i * 70, 800 - ((lt * 90 + i * 40) % 140), { size: 34, col: '#ffe27a', rot: (i % 2 ? 0.2 : -0.2) })
        } },
      { cap: 'Dares. | *So many dares.*',
        lines: [{ who: 'sign', text: "bet you can't eat that in *one bite.*" }, { text: 'a dare is their way of saying *play with me.*' }],
        draw(x, t, lt, H) {
          const grow = H.in(lt, 0.6, 2.0)
          H.bits(DUMPLING, PAL, 560, 740, H.lerp(6, 20, grow))
          H.label('THE DARE', 560, 580, { size: 32, font: MONO, weight: 700, col: GOLD, k: H.pop(lt, 0.3), spacing: 4 })
          H.hero({ x: 250, y: 1060, s: 240, mood: 'wink', look: [1, -0.5] })
          H.you({ x: 830, y: 1080, s: 220, mood: lt > 2 ? 'wide' : 'happy', look: [-1, -0.8] })
          H.stamp('CHALLENGE ACCEPTED', 560, 1000, H.pop(lt, 4.6), { col: '#ff8fb1', size: 42 })
        } },
      { cap: '"Come with me." | *Right now.*',
        lines: [{ who: 'sign', text: "there's a street fair two blocks away. *let's go.*" }, { text: "it's not chaos. *it's an invitation.*" }],
        draw(x, t, lt, H) {
          // bunting + stall
          for (let i = 0; i < 10; i++) H.bits(['KKKK', 'KRRK', '.KK.'].map(r => r.replace(/R/g, 'RGPC'[i % 4])), PAL, 80 + i * 105, 600 + Math.sin(i * 0.9) * 14, 10)
          H.panel(560, 860, 440, 220, { border: '#ff8fb1', fillC: '#7a2a4a' })
          H.label('STREET FAIR', 560, 800, { size: 46, col: '#ffe27a' }); H.label('crêpes · lanterns · music', 560, 880, { size: 26, font: MONO, weight: 700, col: BONE })
          const run = H.in(lt, 3.6, 5.6)
          H.hero({ x: H.lerp(260, 640, run), y: 1150, s: 220, mood: 'happy', look: [1, 0], hops: [3.7, 4.1, 4.5, 4.9, 5.3] })
          H.you({ x: H.lerp(120, 480, H.in(lt, 3.9, 5.9)), y: 1160, s: 190, mood: 'sparkle', look: [1, 0], hops: [4.0, 4.4, 4.8, 5.2] })
        } },
    ] },
  { note: 'Give them room to roam, ask for the honest answer, and try new things together.',
    beats: [
      { cap: 'Freedom, | *not a leash.*',
        lines: [{ text: 'hold on too tight and they *start to drift.*' }, { text: 'let go a little and they *come right back.*' }],
        draw(x, t, lt, H) {
          const snap = lt > 3.9
          const back = H.in(lt, 4.6, 5.8)
          const hx = snap ? H.lerp(560, 360, back) : 360 + 200 * H.in(lt, 0.5, 3.0) + 20 * Math.sin(lt * 9) * H.clamp(lt - 2)
          LEASH(x, 760, 960, hx + 60, 960, snap, t)
          if (snap) for (let i = 0; i < 6; i++) H.pix('heart', 560 + Math.cos(i) * 160 * H.clamp((lt - 3.9) * 2), 820 - Math.sin(i * 2) * 100, 4)
          H.hero({ x: hx, y: 960, s: 250, mood: snap ? 'happy' : 'squint', look: [snap ? 1 : -1, 0] })
          H.you({ x: 800, y: 980, s: 230, mood: snap ? 'heart' : 'neutral', look: [-1, 0] })
          if (snap) H.stamp('TRUST > LEASH', 540, 660, H.pop(lt, 4.0), { col: MINT, size: 46 })
        } },
      { cap: 'Honesty, | *even blunt.*',
        lines: [{ who: 'you', text: 'be honest. is this outfit *too much?*' }, { who: 'sign', text: 'yes. and I love that about you.' }],
        draw(x, t, lt, H) {
          H.you({ x: 760, y: 980, s: 250, mood: lt > 4.5 ? 'sparkle' : 'neutral', look: [-1, 0] })
          // a giant feather boa on YOU
          for (let i = 0; i < 9; i++) H.bits(['.PP.', 'PPPP', '.PP.'], PAL, 640 + i * 30, 1110 + Math.sin(i + lt * 4) * 10, 8)
          H.hero({ x: 300, y: 980, s: 270, mood: lt > 4 ? 'happy' : 'squint', look: [1, 0] })
          H.meter(540, 650, 560, lt > 4 ? 1 : 0.5, { label: lt > 4 ? 'HONEST + KIND' : 'HONEST', col: lt > 4 ? MINT : '#ff8fb1', k: H.pop(lt, 0.3) })
        } },
      { cap: 'New things, | *together.*',
        lines: [{ text: 'same café every week? they\'ll *quietly wilt.*' }, { text: 'a new spot, a new class. *they bloom.*' }],
        draw(x, t, lt, H) {
          const items = ['POTTERY CLASS', 'NIGHT HIKE', 'NEW NOODLES', 'SALSA NIGHT']
          items.forEach((s, i) => { const k = H.pop(lt, 3.9 + i * 0.4); H.panel(300 + (i % 2) * 480, 620 + Math.floor(i / 2) * 140, 400, 100, { k, border: MINT, rot: i % 2 ? 0.03 : -0.03 }); H.label('✓ ' + s, 300 + (i % 2) * 480, 620 + Math.floor(i / 2) * 140, { size: 32, col: BONE, k, rot: i % 2 ? 0.03 : -0.03 }) })
          const wilt = lt < 3.9
          H.hero({ x: 330, y: 1060, s: 250, mood: wilt ? 'sleepy' : 'sparkle', rot: wilt ? -0.25 : 0, squash: wilt ? 0.12 : 0 })
          H.you({ x: 780, y: 1080, s: 220, mood: wilt ? 'neutral' : 'happy', look: [-1, 0] })
          if (wilt) H.label('SAME CAFÉ · WEEK 9', 540, 700, { size: 34, font: MONO, weight: 700, col: rgba(BONE, 0.6) })
        } },
    ] },
  { note: "Ask them to be kind with the truth. And give the jokes a break mid-feelings.",
    beats: [
      { cap: 'The brutally | *honest one-liner.*',
        lines: [{ who: 'sign', text: "you're being kind of dramatic." }, { text: 'true? maybe. kind? *not yet.*' }],
        draw(x, t, lt, H) {
          H.hero({ x: 300, y: 980, s: 270, mood: 'neutral', look: [1, 0] })
          const hit = H.in(lt, 0.6, 1.0)
          H.you({ x: 800, y: 990, s: 240, mood: lt > 1 ? 'wide' : 'neutral', look: [-1, 0], rot: lt > 1 ? 0.12 * Math.exp(-(lt - 1) * 3) : 0 })
          if (lt > 0.4) { H.bits(['..KK..', '.KRRK.', 'KRRRRK', '.KRRK.', '..KK..'], PAL, H.lerp(420, 740, hit), 900, 9) }
          if (lt > 1) H.pix('brokenheart', 800, 760, 8 * H.pop(lt, 1.0))
        } },
      { cap: 'The joke | *too soon.*',
        lines: [{ who: 'sign', text: 'so… on a scale of one to ten, how mad?' }, { text: "humor is how they *cope.* say when it's not time." }],
        draw(x, t, lt, H) {
          H.hero({ x: 300, y: 980, s: 270, mood: lt < 3 ? 'wink' : 'wide', look: [1, 0] })
          H.you({ x: 800, y: 990, s: 240, mood: 'neutral', look: [-1, 0] })
          // a sad trombone rimshot sign
          H.panel(540, 650, 460, 100, { border: '#ff6f91', k: H.pop(lt, 2.2) })
          H.label('TOO SOON', 540, 650, { size: 46, col: '#ff6f91', k: H.pop(lt, 2.2) })
          H.label('…', 800, 800, { size: 80, col: BONE, k: H.pop(lt, 1.4) })
        } },
      { cap: 'What *actually* | helps.',
        lines: [{ who: 'you', text: 'say it kind first. *then* say it true.' }, { who: 'sign', text: 'I hurt you. *I\'m sorry.*' }],
        draw(x, t, lt, H) {
          H.card(540, 700, 170, 'Kind first, then true?', { k: H.pop(lt, 0.4), rot: -0.06 })
          H.you({ x: 800, y: 1040, s: 230, mood: lt > 4.2 ? 'sparkle' : 'happy', look: [-1, 0] })
          H.hero({ x: 290, y: 1040, s: 250, mood: lt > 4 ? 'sparkle' : 'squint', look: [1, 0] })
          if (lt > 4.6) H.pix('bigheart', 540, 960, 8 * H.pop(lt, 4.6))
        } },
    ] },
  { note: 'Be an adventure, make home warm, and hold the hand, not the map.',
    beats: [
      { cap: 'Be an adventure | *too.*',
        lines: [{ text: 'they stay with someone who *brings ideas.*' }, { who: 'you', text: 'I planned a mystery day. *no spoilers.*' }],
        draw(x, t, lt, H) {
          ticket(x, 540, 640, 260, -0.08 + 0.04 * Math.sin(lt * 3), 'MYSTERY DAY')
          H.you({ x: 780, y: 1000, s: 240, mood: 'wink', look: [-1, 0] })
          H.hero({ x: 300, y: 1000, s: 270, mood: lt > 4 ? 'heart' : 'sparkle', look: [1, -0.5], hops: [4.0, 4.4, 4.8] })
          if (lt > 4) H.spark(t, 540, 640, t - lt + 4.0, 12, 200, 2)
        } },
      { cap: 'Home, but | *not a cage.*',
        lines: [{ text: 'they love coming back to a place that *lets them go.*' }, { text: 'warm lights. *open door.*' }],
        draw(x, t, lt, H) {
          // a little house with an open door
          H.bits(['....KKKKKKKK....', '...KRRRRRRRRK...', '..KRRRRRRRRRRK..', '.KRRRRRRRRRRRRK.', 'KKKKKKKKKKKKKKKK', '.KWWWWWWWWWWWWK.', '.KWYYWWWWWWYYWK.', '.KWYYWWKKWWYYWK.', '.KWWWWWKYKWWWWK.', '.KWWWWWKYKWWWWK.', '.KKKKKKKKKKKKKK.'], PAL, 540, 760, 22)
          const lv = H.in(lt, 0.5, 2.4), cb = H.in(lt, 3.6, 5.4)
          H.hero({ x: lt < 3.6 ? H.lerp(560, 960, lv) : H.lerp(960, 600, cb), y: 1140, s: 200, mood: 'happy', look: [lt < 3.6 ? 1 : -1, 0], hops: [0.6, 1.0, 1.4, 3.8, 4.2, 4.6] })
          H.you({ x: 360, y: 1150, s: 200, mood: lt > 5 ? 'heart' : 'happy', look: [1, 0] })
          if (lt < 3.6 && lt > 1) H.bubble(360, 960, 'have fun!', { k: H.pop(lt, 1.0), size: 30 })
        } },
      { cap: 'The *ending.*',
        lines: [{ text: 'and the day they stop looking at *the map…*' }, { who: 'sign', text: "this. I'm *good* right here." }],
        draw(x, t, lt, H) {
          const fold = H.in(lt, 2.0, 3.2)
          map(x, 540, 680, 520, { unfold: 1 - fold, alpha: 1 - fold * 0.9 })
          const close = H.in(lt, 3.4, 4.6)
          H.hero({ x: H.lerp(300, 450, close), y: 1040, s: 260, mood: lt > 4 ? 'heart' : 'neutral', look: [lt > 2 ? 1 : 0, lt > 2 ? 0 : -1] })
          H.you({ x: H.lerp(800, 650, close), y: 1050, s: 230, mood: lt > 4.4 ? 'heart' : 'happy', look: [-1, 0] })
          if (close > 0.95) { H.pix('bigheart', 550, 880, 8 * H.pop(lt, 4.6)); H.spark(t, 550, 880, t - lt + 4.6, 12, 200, 6) }
        } },
    ] },
]

const DD = buildDeepDive({
  id: 'kdde09', sign: SG, ep: 9, ending: 'cut', chLen: 26.4,
  hook: { text: 'Loving a *Sagittarius?* | Pack light.' },
  intro: 'a field guide to loving a *Sag.*',
  promise: "four chapters. *the ending,* though.",
  cold(x, t, H) {
    suitcase(x, 360, 1230, 300, { rot: -0.1 + 0.05 * Math.sin(t * 8) })
    map(x, 640, 720, 460, { unfold: 0.6 + 0.4 * Math.sin(t * 3) ** 2, rot: 0.15 * Math.sin(t * 2.5) })
    for (let i = 0; i < 5; i++) { const a = t * 1.8 + i * 1.3; ticket(x, 540 + Math.cos(a) * 360, 980 + Math.sin(a * 1.3) * 220, 130, a) }
    const leap = Math.abs(Math.sin(t * 3.2 + 1.2))
    H.hero({ x: 520, y: 1040 - leap * 120, s: 300, mood: 'happy', look: [1, -1], rot: 0.25 * Math.sin(t * 3.2), squash: -0.12 * leap })
  },
  chapters,
  outro(x, t, lt, H) {
    // a hilltop at night
    x.fillStyle = '#1b2a4a'; x.beginPath(); x.ellipse(540, 1350, 760, 260, 0, Math.PI, 0); x.fill(); x.fillRect(0, 1348, 1080, 580)
    x.fillStyle = '#26385e'; x.beginPath(); x.ellipse(540, 1380, 700, 220, 0, Math.PI, 0); x.fill(); x.fillRect(0, 1378, 1080, 560)
    H.pix('moon', 860, 620, 12)
    H.hero({ x: 450, y: 1040, s: 250, mood: 'heart', look: [1, 0] })
    H.you({ x: 650, y: 1050, s: 230, mood: 'heart', look: [-1, 0] })
    x.fillStyle = INK; x.fillRect(520, 1090, 70, 14); x.fillStyle = GOLD; x.fillRect(524, 1093, 62, 8)
  },
  last: "Don't hold the map. | Hold *the hand.*",
})
export const { DURATION, SCENES, CUES } = DD
export const T = DD.T, CHECK = DD.CHECK
