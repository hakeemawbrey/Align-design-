// kdde08 — DEEP DIVE: SCORPIO IN LOVE, "Everything Nobody Tells You" (≈ 2 min vertical, star_advice; cinematic · C#m).
// Show kit: ../../kdde07/scenes/ddkit.js (read-only) on top of hookkit.js. No end card, no card cut. LOOPS to frame 0.
//   0–8.5     COLD OPEN  Scorpio mid-slam of a heavy door, dust flying, a giant eye in the keyhole.
//             Slam title "Loving a Scorpio: the unlocked version." · whip zoom · record scratch + freeze.
//   1 HOW THEY FLIRT   one question, very deep · the eye contact (a staring-contest HUD) · they remember (the toast file)
//   2 WHAT THEY NEED   honesty, even awkward · privacy, both ways · trust grows slow (a meter, one bar per kept promise)
//   3 HOW THEY FIGHT   they go quiet · then they say all of it (the scroll) · what helps: "I'm not going anywhere."
//   4 WHAT MAKES THEM STAY   the same you, every day · their secrets, safe · the payoff: the door opens from inside and
//             Scorpio hands over a talk card.
//   Outro: by the open door. Last line "Same you, every day. That's the key." then eases back into the slamming door.
// Pisces (the research assistant, bottom right) cries all film.
import { buildDeepDive, bits, PIX, PAL, GOLD, BONE, INK, PINK, CYAN, MINT, MONO, INTER, rgba, mixHex } from '../../kdde07/scenes/ddkit.js'

const SC = 'scorpio'
// the door: a heavy plank door in a stone frame (open 0…1 swings it toward the viewer, revealing warm light)
function door(x, cx, cy, w, h, { open = 0, slam = 0, eye = 0, t = 0, label = null, light = 0 } = {}) {
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.fillRect(-w / 2 - 34, -h / 2 - 34, w + 68, h + 34)
  x.fillStyle = '#5a4a6e'; x.fillRect(-w / 2 - 26, -h / 2 - 26, w + 52, h + 26)
  for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#4a3c5c' : '#66557a'; x.fillRect(-w / 2 - 26 + (i % 2) * 20, -h / 2 - 26 + i * (h / 8), 20, h / 8 - 4); x.fillRect(w / 2 + 6 - (i % 2) * 0, -h / 2 - 26 + i * (h / 8), 20, h / 8 - 4) }
  // light behind
  const lg = x.createLinearGradient(0, -h / 2, 0, h / 2); lg.addColorStop(0, '#ffe7a8'); lg.addColorStop(1, '#ffb36b')
  x.fillStyle = light > 0 || open > 0 ? lg : '#0b0718'; x.fillRect(-w / 2, -h / 2, w, h)
  // the slab (scaleX shrinks as it swings open)
  const sx = Math.cos(open * 1.35) * (1 + slam * 0.04)
  x.save(); x.translate(-w / 2, 0); x.scale(sx, 1 + slam * 0.02); x.translate(w / 2, 0)
  x.fillStyle = INK; x.fillRect(-w / 2, -h / 2, w, h)
  for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#7a3a52' : '#8c4560'; x.fillRect(-w / 2 + 6 + i * (w - 12) / 5, -h / 2 + 6, (w - 12) / 5 - 6, h - 12) }
  x.fillStyle = '#2a1222'; x.fillRect(-w / 2 + 6, -h / 2 + h * 0.2, w - 12, 18); x.fillRect(-w / 2 + 6, h / 2 - h * 0.25, w - 12, 18)
  // keyhole + eye
  x.fillStyle = GOLD; x.beginPath(); x.arc(w * 0.28, 10, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#0b0718'; x.beginPath(); x.arc(w * 0.28, 0, 16, 0, Math.PI * 2); x.fill(); x.fillRect(w * 0.28 - 8, 0, 16, 40)
  if (eye > 0.01) {
    x.save(); x.globalAlpha = eye
    x.fillStyle = '#fff8ec'; x.beginPath(); x.ellipse(w * 0.28, 4, 13, 9, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#e23d66'; x.beginPath(); x.arc(w * 0.28 + 3 * Math.sin(t * 3), 4, 6, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.beginPath(); x.arc(w * 0.28 + 3 * Math.sin(t * 3), 4, 3, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  if (label) { x.font = `800 30px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 0, -h / 2 + h * 0.12) }
  x.restore()
  x.restore()
}
function dust(x, t, t0, cx, cy, n = 18, seed = 3) {
  const d = t - t0
  if (d < 0 || d > 1.4) return
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed, sp = 200 + (i * 37 % 160); x.save(); x.globalAlpha = 1 - d / 1.4; x.fillStyle = i % 2 ? '#c9b48a' : '#8f7f9a'; x.fillRect(cx + Math.cos(a) * sp * d, cy + Math.sin(a) * sp * d * 0.5 - 60 * d, 12, 12); x.restore() }
}
const TOAST = ['.KKKKKK.', 'KOOOOOOK', 'KOYYYYOK', 'KOYYYYOK', 'KOYYYYOK', 'KOOOOOOK', '.KKKKKK.']
const SCROLL_LINES = ['I felt left out at the party.', 'not because of you, exactly.', 'I wanted you to notice me.', 'I should have said it then.', "I'm saying it now.", "that's everything. I think."]

const chapters = [
  { note: 'Answer the deep question honestly. They ask because they care.',
    beats: [
      { cap: 'One question. | *Very* deep.',
        lines: [{ who: 'sign', text: "so. what's your biggest *fear?*" }, { who: 'you', text: "it's our *first date??*" }],
        draw(x, t, lt, H) {
          // the depth gauge: SMALL TALK → THE DEEP END
          H.panel(540, 620, 760, 110, { k: H.pop(lt, 0.2) })
          const f = H.in(lt, 0.6, 1.6)
          H.label('SMALL TALK', 300, 620, { size: 28, font: MONO, weight: 700, col: rgba(BONE, 0.6) }); H.label('THE DEEP END', 760, 620, { size: 28, font: MONO, weight: 700, col: '#ff6f91' })
          H.pix('star', H.lerp(220, 870, f), 660, 4)
          for (let i = 0; i < 7; i++) { const yy = 1200 - ((lt * 120 + i * 70) % 420); H.bits(['.KK.', 'KCCK', 'KCCK', '.KK.'], PAL, 220 + i * 110, yy, 4, { alpha: f }) }
          H.hero({ x: 300, y: 960, s: 290, mood: 'squint', look: [1, 0] })
          H.you({ x: 790, y: 980, s: 240, mood: lt > 3.9 ? 'wide' : 'happy', look: [-1, 0], squash: lt > 3.9 ? -0.08 : 0 })
          if (lt > 5.4) H.pix('sweat', 880, 830, 7)
        } },
      { cap: 'The *eye contact.*',
        lines: [{ text: 'they hold your gaze like it\'s a *sport.*' }, { text: "it's not a test. *they're just listening.*" }],
        draw(x, t, lt, H) {
          H.panel(540, 620, 640, 100, { border: '#ff6f91', k: H.pop(lt, 0.15) })
          const secs = Math.min(99, Math.floor(H.clamp(lt - 0.4, 0, 10) * 9))
          H.label(`STARING CONTEST · ${String(secs).padStart(2, '0')}s`, 540, 620, { size: 34, font: MONO, weight: 700, col: BONE, k: H.pop(lt, 0.15) })
          const blink = lt > 4.3
          H.hero({ x: 300, y: 960, s: 290, mood: blink ? 'happy' : 'squint', look: [1, 0], blink: false })
          H.you({ x: 790, y: 980, s: 240, mood: blink ? 'happy' : 'squint', look: [-1, 0], blink: lt > 4.0 && lt < 4.3 ? 1 : false })
          // laser-ish gaze lines
          if (!blink) { x.save(); x.globalAlpha = 0.5 + 0.3 * Math.sin(lt * 20); x.fillStyle = '#ff6f91'; for (let i = 0; i < 12; i++) x.fillRect(400 + i * 28, 905 + Math.sin(i + lt * 8) * 4, 16, 6); x.restore() }
          H.stamp('YOU BLINKED', 540, 1220, H.pop(lt, 4.3), { col: GOLD, size: 46 })
        } },
      { cap: 'They *remember.*',
        lines: [{ who: 'sign', text: 'you said you hate cold toast. *three weeks ago.*' }, { text: 'one tiny detail, *filed forever.*' }],
        draw(x, t, lt, H) {
          // a filing cabinet
          H.panel(300, 760, 300, 360, { border: '#8f7f9a', fillC: '#3a2f52' })
          const pull = H.in(lt, 0.5, 1.2)
          H.panel(300 + pull * 60, 680, 260, 90, { border: GOLD, fillC: '#5a4a72' })
          const fk = H.pop(lt, 1.4, 0.35, 2)
          H.panel(560, 640, 420, 140, { k: fk, border: BONE, fillC: '#f4e8cc', rot: -0.05 })
          H.label('FILE #318: HATES COLD TOAST', 560, 620, { size: 25, font: MONO, weight: 700, col: INK, k: fk, rot: -0.05, shadow: false })
          H.label('noted: 3 weeks ago', 560, 665, { size: 24, font: MONO, weight: 700, col: '#c42a3f', k: fk, rot: -0.05, shadow: false })
          const hand = H.in(lt, 4.0, 4.8)
          H.hero({ x: H.lerp(300, 520, hand), y: 1060, s: 240, mood: lt > 4.8 ? 'happy' : 'neutral', look: [1, 0] })
          H.you({ x: 820, y: 1060, s: 220, mood: lt > 5.0 ? 'heart' : 'happy', look: [-1, 0] })
          const tk = H.pop(lt, 4.0)
          H.bits(TOAST, PAL, H.lerp(420, 690, hand), 960, 9 * tk)
          for (let i = 0; i < 3; i++) if (lt > 4.2) H.bits(['K', 'K', '.', 'K'], { K: rgba(BONE, 0.7) }, H.lerp(420, 690, hand) - 20 + i * 20, 900 - ((lt * 60 + i * 15) % 50), 5)
        } },
    ] },
  { note: 'Be honest, respect their privacy, and let trust take its time.',
    beats: [
      { cap: 'Honesty. | *Even awkward.*',
        lines: [{ who: 'you', text: 'I… actually *hate* that movie.' }, { who: 'sign', text: 'thank you. *finally,* the truth.' }],
        draw(x, t, lt, H) {
          H.you({ x: 780, y: 980, s: 250, mood: lt < 3.6 ? 'squint' : 'happy', look: [-1, 0.3] })
          if (lt < 3.6) for (let i = 0; i < 3; i++) H.pix('sweat', 860 + i * 26, 820 + ((lt * 160 + i * 50) % 90), 6)
          H.hero({ x: 300, y: 980, s: 280, mood: lt > 3.9 ? 'sparkle' : 'wide', look: [1, 0] })
          H.meter(540, 650, 560, H.in(lt, 3.9, 5.0) * 0.9 + 0.1, { label: 'TRUST', col: MINT, k: H.pop(lt, 0.3) })
          if (lt > 5.0) H.spark(t, 540, 650, t - lt + 5.0, 12, 220, 4)
        } },
      { cap: 'Privacy, | *both ways.*',
        lines: [{ text: 'they keep some doors shut. so do you. *healthy.*' }, { text: 'no snooping, no tests. *just trust.*' }],
        draw(x, t, lt, H) {
          door(x, 300, 780, 220, 320, { label: 'MINE', t })
          door(x, 780, 780, 220, 320, { label: 'YOURS', t })
          H.hero({ x: 300, y: 1090, s: 200, mood: 'happy', hops: [1.0, 4.4] })
          H.you({ x: 780, y: 1090, s: 190, mood: 'happy', hops: [1.3, 4.7] })
          // a phone face down + a tick
          H.panel(540, 1220, 160, 70, { border: '#5a4a72', fillC: '#1b1236', k: H.pop(lt, 3.9) })
          H.label('✓ NOT SNOOPING', 540, 1290, { size: 26, font: MONO, weight: 700, col: MINT, k: H.pop(lt, 4.3) })
        } },
      { cap: 'Trust grows | *slow.*',
        lines: [{ text: 'their trust meter only goes up *with time.*' }, { text: 'every kept promise: *one bar.*' }],
        draw(x, t, lt, H) {
          const f = H.clamp((lt - 0.8) / 5.5)
          H.meter(540, 650, 720, Math.floor(f * 12) / 12, { label: 'TRUST', col: MINT, n: 12 })
          const days = ['DAY 1', 'DAY 9', 'DAY 30', 'DAY 64', 'DAY 100']
          const di = Math.min(4, Math.floor(f * 5))
          H.panel(780, 920, 200, 120, { border: BONE, fillC: '#f4e8cc', rot: 0.04 })
          H.label(days[di], 780, 920, { size: 40, font: MONO, weight: 700, col: INK, rot: 0.04, shadow: false })
          const pk = H.lerp(4, 13, f)
          H.pix('plant', 300, 1180 - pk * 4, pk)
          H.hero({ x: 520, y: 1100, s: 230, mood: f > 0.8 ? 'sparkle' : 'neutral', look: [-1, 0] })
          H.you({ x: 800, y: 1140, s: 180, mood: 'happy', look: [-1, -0.4] })
        } },
    ] },
  { note: 'Give them quiet, then hear all of it. Stay calm and stay close.',
    beats: [
      { cap: 'They go | *quiet.*',
        lines: [{ text: 'when they\'re hurt, the room goes *silent.*' }, { text: "silence isn't punishment. *it's processing.*" }],
        draw(x, t, lt, H) {
          H.dim(0.35 * H.in(lt, 0.3, 1.2))
          H.hero({ x: 330, y: 980, s: 280, mood: 'neutral', look: [-1, 0.6], rot: -0.08 })
          H.you({ x: 790, y: 990, s: 230, mood: 'wide', look: [-1, 0] })
          H.bubble(330, 760, '…', { k: H.pop(lt, 1.2), size: 40 })
          const v = 1 - H.in(lt, 0.4, 2.2)
          H.meter(540, 650, 500, v, { label: `VOLUME: ${Math.round(v * 10)}`, col: CYAN })
        } },
      { cap: 'Then they say | *all of it.*',
        lines: [{ who: 'sign', text: "ok. here's everything. it's a lot. *sorry.*" }, { text: 'let them finish. then: *thank you for telling me.*' }],
        draw(x, t, lt, H) {
          const un = H.in(lt, 0.4, 3.4)
          const len = 60 + un * 620
          H.panel(560, 560 + len / 2, 520, len, { border: '#c9b48a', fillC: '#f4e8cc' })
          x.save(); x.beginPath(); x.rect(300, 560, 520, len); x.clip()
          SCROLL_LINES.forEach((s, i) => H.label(s, 560, 610 + i * 100, { size: 28, font: MONO, weight: 700, col: INK, shadow: false, alpha: H.clamp((lt - 0.6 - i * 0.45) * 3) }))
          x.restore()
          H.hero({ x: 190, y: 980, s: 200, mood: lt > 2 ? 'squint' : 'neutral', look: [1, 0] })
          H.you({ x: 900, y: 1150, s: 180, mood: lt > 4 ? 'sparkle' : 'happy', look: [-1, -1] })
        } },
      { cap: 'What *actually* | helps.',
        lines: [{ who: 'you', text: "I'm not going anywhere. *talk when you're ready.*" }, { text: 'the door opens *from their side.*' }],
        draw(x, t, lt, H) {
          const op = H.in(lt, 4.2, 6.0) * 0.5
          door(x, 360, 860, 300, 440, { open: op, t })
          if (op > 0.05) H.hero({ x: 330, y: 960, s: 170, mood: 'sparkle', look: [1, 0], alpha: H.clamp(op * 4) })
          H.you({ x: 780, y: 1050, s: 220, mood: 'happy', look: [-1, 0] })
          H.pix('cup', 640, 1150, 6)
        } },
    ] },
  { note: 'Be the same person every day. Keep their secrets. Let them open up.',
    beats: [
      { cap: 'The same you, | *every day.*',
        lines: [{ text: 'they stay for someone *consistent.*' }, { text: 'same kindness on a monday as a *saturday.*' }],
        draw(x, t, lt, H) {
          const D = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
          D.forEach((d, i) => {
            const k = H.pop(lt, 0.4 + i * 0.5, 0.3, 2.2), cx = 200 + (i % 4) * 230, cy = 640 + Math.floor(i / 4) * 230
            H.panel(cx, cy, 190, 190, { k, border: BONE, fillC: '#2a1f55', rot: (i % 2 ? 0.03 : -0.03) })
            H.label(d, cx, cy - 60, { size: 28, font: MONO, weight: 700, col: GOLD, k })
            if (k > 0.3) H.you({ x: cx, y: cy + 20, s: 100, mood: 'happy', tag: false, pop: k, seed: 21 })
          })
          H.hero({ x: 880, y: 1150, s: 220, mood: lt > 4 ? 'heart' : 'sparkle', look: [-1, -1] })
        } },
      { cap: 'Their secrets, | *safe.*',
        lines: [{ who: 'sign', text: "I've never told anyone *this.*" }, { text: "keep it. *never* make it a joke later." }],
        draw(x, t, lt, H) {
          H.hero({ x: 420, y: 990, s: 260, mood: 'squint', look: [1, 0] })
          H.you({ x: 720, y: 1000, s: 230, mood: lt > 2 ? 'sparkle' : 'happy', look: [-1, 0] })
          H.bubble(470, 760, 'psst…', { k: H.pop(lt, 0.5), size: 30 })
          const mv = H.in(lt, 2.2, 3.2)
          H.bits(PIX.key, PAL, H.lerp(470, 720, mv), H.lerp(840, 820, mv), 6)
          H.bits(['.KK.KK.', 'KRRKRRK', 'KRGGGRK', 'KRGKGRK', '.KRRRK.', '..KRK..', '...K...'], PAL, 720, 690, 10 * H.pop(lt, 3.4))
          H.stamp('SAFE', 720, 560, H.pop(lt, 4.4), { col: MINT, size: 54 })
        } },
      { cap: 'The door | *opens.*',
        lines: [{ text: 'and one day, *without being asked…*' }, { who: 'sign', text: 'here. I picked you a *talk card.*' }],
        draw(x, t, lt, H) {
          const op = H.in(lt, 1.0, 2.6)
          door(x, 400, 860, 340, 480, { open: op, t })
          // light pours out
          if (op > 0) { const g = x.createRadialGradient(400, 900, 0, 400, 900, 600); g.addColorStop(0, `rgba(255,215,140,${0.35 * op})`); g.addColorStop(1, 'rgba(255,215,140,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1200) }
          const step = H.in(lt, 2.4, 3.4)
          H.hero({ x: H.lerp(400, 480, step), y: H.lerp(960, 1080, step), s: H.lerp(180, 250, step), mood: lt > 3.6 ? 'happy' : 'sparkle', look: [1, 0], alpha: H.clamp(op * 3) })
          H.you({ x: 820, y: 1080, s: 230, mood: lt > 4.6 ? 'heart' : 'wide', look: [-1, 0] })
          H.card(650, 860, 170, 'What made you feel safe this week?', { k: H.pop(lt, 4.0, 0.35, 2), rot: 0.08 })
          if (lt > 4.6) H.spark(t, 650, 860, t - lt + 4.6, 12, 220, 7)
        } },
    ] },
]

const DD = buildDeepDive({
  id: 'kdde08', sign: SC, ep: 8, ending: 'loop',
  hook: { text: 'Loving a *Scorpio:* | the unlocked version.' },
  promise: 'stay for *chapter four.* it opens up.',
  cold(x, t, H) {
    const ph = (t * 1.3 + 0.62) % 1, slam = Math.max(0, 1 - ph * 5)
    door(x, 560, 980, 380, 560, { slam, eye: 1, t })
    dust(x, t, Math.floor(t * 1.3 + 0.62) / 1.3 - 0.62 / 1.3, 560, 1260, 18, 2)
    for (let i = 0; i < 14; i++) { const r = H.rng(i * 7 + 1); x.save(); x.globalAlpha = 0.8; x.fillStyle = i % 2 ? '#c9b48a' : '#8f7f9a'; x.fillRect(260 + r() * 600, 1180 + r() * 140 - slam * 40, 12, 12); x.restore() }
    H.hero({ x: 300, y: 1130, s: 280, mood: 'squint', look: [1, -0.2], rot: -0.18, squash: 0.08 * slam })
  },
  chapters,
  outro(x, t, lt, H) {
    door(x, 400, 860, 340, 480, { open: 1, t })
    const g = x.createRadialGradient(400, 900, 0, 400, 900, 600); g.addColorStop(0, 'rgba(255,215,140,0.35)'); g.addColorStop(1, 'rgba(255,215,140,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1200)
    H.hero({ x: 460, y: 1080, s: 250, mood: 'heart', look: [1, 0] })
    H.you({ x: 760, y: 1080, s: 230, mood: 'heart', look: [-1, 0] })
    H.bits(PIX.key, PAL, 610, 900, 7 * H.pop(lt, 0.5))
  },
  last: 'Same you, every day. | That\'s *the key.*',
})
export const { DURATION, SCENES, CUES } = DD
export const T = DD.T, CHECK = DD.CHECK
