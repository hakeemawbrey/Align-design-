// kdde10 — DEEP DIVE: CAPRICORN IN LOVE, "Everything Nobody Tells You" (≈ 2 min vertical, star_advice; lofi · Eb).
// Show kit: ../../kdde07/scenes/ddkit.js (read-only) on top of hookkit.js. No end card, no card cut. Hard cut.
//   0–8.5     COLD OPEN  Capricorn mid-stamp of a planner, pages flying in a whirl, a clock spinning.
//             Slam title "Capricorn love looks like a spreadsheet." · whip zoom · record scratch + freeze.
//   1 HOW THEY FLIRT   on time, every time · fixes your wobbly chair · the driest joke ever told (tumbleweed)
//   2 WHAT THEY NEED   respect for their goals · patience (a slow-grow plant) · time is how they say it
//   3 HOW THEY FIGHT   problem-solving mode (a whiteboard) · what you needed: "that sounds hard" · fix or a hug?
//   4 WHAT MAKES THEM STAY   reliable, both ways · laugh at the dry jokes · the soft side (Capricorn cries at a puppy
//             video; Pisces cries harder) · the payoff: the last page of the planner is just your name.
//   Outro: the planner open on one page with "YOU" written on it. Last line "Every plan had room for you."
import { buildDeepDive, bits, PIX, PAL, GOLD, BONE, INK, PINK, CYAN, MINT, MONO, INTER, SERIF, rgba, mixHex } from '../../kdde07/scenes/ddkit.js'

const CP = 'capricorn'
function planner(x, cx, cy, w, { rows = [], rot = 0, k = 1, title = 'PLANNER', page = null } = {}) {
  if (k <= 0.01) return
  const h = w * 1.25
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 14, -h / 2 + 18, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#f4e8cc'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#2fc79a'; x.fillRect(-w / 2, -h / 2, w, h * 0.12)
  x.fillStyle = INK; x.font = `800 ${Math.round(w * 0.07)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + h * 0.06)
  for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(-w / 2 + w * (0.15 + i * 0.23), -h / 2 - 16, 10, 26) }
  if (page) { x.fillStyle = '#c42a3f'; x.font = `italic 500 ${Math.round(w * 0.2)}px ${SERIF}`; x.fillText(page, 0, 0) }
  rows.forEach((r, i) => {
    const y = -h / 2 + h * 0.2 + i * h * 0.105
    x.fillStyle = 'rgba(90,123,224,0.3)'; x.fillRect(-w / 2 + 16, y + h * 0.045, w - 32, 2)
    if (!r) return
    x.fillStyle = r.col || '#2c2a7a'; x.font = `700 ${Math.round(w * 0.052)}px ${MONO}`; x.textAlign = 'left'; x.fillText(r.text, -w / 2 + 22, y)
    if (r.strike) { x.fillStyle = '#c42a3f'; x.fillRect(-w / 2 + 18, y - 2, Math.min(w - 36, x.measureText(r.text).width + 10), 5) }
  })
  x.restore()
}
const CHAIR = ['KKKK......', 'KOOK......', 'KOOK......', 'KOOK......', 'KOOKKKKKKK', 'KOOOOOOOOK', 'KKKKKKKKKK', 'KOK....KOK', 'KOK....KOK', 'KK......KK']
const TUMBLE = ['..KKKK..', '.KO.OOK.', 'KO.OO.OK', 'KOO..OOK', 'KO.OO.OK', '.KOO.OK.', '..KKKK..']
const PUPPY = ['.KK....KK.', 'KOOK..KOOK', 'KOOKKKKOOK', '.KWWWWWWK.', 'KWWKWWKWWK', 'KWWWWWWWWK', 'KWWWPPWWWK', '.KWWWWWWK.', '..KKKKKK..']

const chapters = [
  { note: 'Notice the small, steady things. That IS the flirting.',
    beats: [
      { cap: 'On time. | *Every* time.',
        lines: [{ text: 'they show up *two minutes early.* always.' }, { who: 'sign', text: 'I was in the area. *for twenty minutes.*' }],
        draw(x, t, lt, H) {
          H.pix('clock', 540, 640, 14)
          H.label('6:58', 540, 760, { size: 54, font: MONO, weight: 700, col: MINT })
          H.hero({ x: 300, y: 1030, s: 270, mood: 'happy', look: [1, 0], hops: [0.4] })
          const arr = H.in(lt, 2.6, 3.6)
          H.you({ x: H.lerp(1200, 790, arr), y: 1040, s: 230, mood: lt > 4.2 ? 'sparkle' : 'wide', look: [-1, 0] })
          H.stamp('EARLY', 300, 830, H.pop(lt, 1.2), { col: MINT, size: 46, rot: -0.15 })
        } },
      { cap: 'They *fix* | your wobbly chair.',
        lines: [{ text: 'they won\'t say it. they\'ll just *fix* something.' }, { text: 'a tightened screw is a *love letter.*' }],
        draw(x, t, lt, H) {
          const wob = lt < 3.4 ? 0.12 * Math.sin(lt * 14) : 0
          H.bits(CHAIR, PAL, 720, 1000, 22, { rot: wob })
          H.you({ x: 740, y: 820, s: 200, mood: lt < 3.4 ? 'wide' : 'happy', rot: wob, look: [-1, 0] })
          H.hero({ x: 330, y: 1060, s: 250, mood: 'squint', look: [1, 0.5], hops: [1.6, 2.1, 2.6, 3.1] })
          if (lt > 1.4 && lt < 3.4) H.bits(['KKK.', 'KSSK', '.KSSK', '..KSK', '...KK'].map(r => r.padEnd(5, '.')), PAL, 520, 1080 + Math.sin(lt * 20) * 6, 8)
          if (lt > 3.4) H.label('✓ FIXED', 720, 1250, { size: 40, col: MINT, k: H.pop(lt, 3.4) })
        } },
      { cap: 'The *driest* joke | ever told.',
        lines: [{ who: 'sign', text: 'I\'d tell you a joke about time, but *it\'s late.*' }, { text: 'laugh. *they practiced that one.*' }],
        draw(x, t, lt, H) {
          H.hero({ x: 300, y: 1000, s: 270, mood: lt > 2.4 ? 'neutral' : 'wink', look: [1, 0] })
          H.you({ x: 790, y: 1000, s: 230, mood: lt > 4.6 ? 'happy' : 'neutral', look: [-1, 0], squash: lt > 4.6 ? 0.06 * Math.sin(lt * 30) : 0 })
          const roll = H.prog(lt, 1.8, 4.2)
          if (roll > 0 && roll < 1) H.bits(TUMBLE, PAL, H.lerp(-80, 1160, roll), 1210 - Math.abs(Math.sin(roll * 18)) * 50, 10, { rot: roll * 18 })
          H.label('* crickets *', 540, 700, { size: 34, font: MONO, weight: 700, col: '#9fe6b0', k: H.pop(lt, 2.0), alpha: H.out(lt, 4.4, 4.7) })
          if (lt > 4.6) H.label('HA!', 790, 780, { size: 64, col: '#ffe27a', k: H.pop(lt, 4.6) })
        } },
    ] },
  { note: 'Cheer for their goals, be patient, and count the time they give you.',
    beats: [
      { cap: 'Respect | *the goals.*',
        lines: [{ text: 'they have a five-year plan. *ask about it.*' }, { who: 'you', text: 'how\'s the big project going? *tell me.*' }],
        draw(x, t, lt, H) {
          // a little mountain with a flag
          H.bits(['......K......', '.....KGK.....', '.....KRRK....', '.....KK......', '....KSSK.....', '...KSSSSK....', '..KSSWSSSK...', '.KSSSSSSSSK..', 'KSSSSSSSSSSK.', 'KKKKKKKKKKKKK'], PAL, 540, 700, 22)
          H.hero({ x: 300, y: 1060, s: 250, mood: lt > 4.2 ? 'sparkle' : 'neutral', look: [1, -0.8] })
          H.you({ x: 790, y: 1070, s: 220, mood: 'happy', look: [-1, 0] })
          if (lt > 4.4) H.spark(t, 540, 560, t - lt + 4.4, 10, 160, 2)
        } },
      { cap: 'Patience. | *Lots.*',
        lines: [{ text: 'they warm up *slowly.* like a plant, not a match.' }, { text: 'water it. *wait.* it grows.' }],
        draw(x, t, lt, H) {
          const g = H.clamp((lt - 0.5) / 5.5)
          H.pix('plant', 540, 1080 - g * 140, H.lerp(5, 18, g))
          H.label(['WEEK 1', 'WEEK 3', 'MONTH 2', 'MONTH 4'][Math.min(3, Math.floor(g * 4))], 540, 650, { size: 46, font: MONO, weight: 700, col: MINT })
          H.hero({ x: 230, y: 1130, s: 200, mood: g > 0.8 ? 'heart' : 'neutral', look: [1, -0.5] })
          H.you({ x: 850, y: 1140, s: 190, mood: 'happy', look: [-1, -0.5] })
          if (g > 0.85) H.pix('flower', 540, 1080 - g * 140 - 170, 10)
        } },
      { cap: 'Time is how | *they say it.*',
        lines: [{ text: 'a busy person clearing an evening for you?' }, { text: 'that\'s the *big* romantic gesture.' }],
        draw(x, t, lt, H) {
          const clear = H.in(lt, 2.2, 3.4)
          planner(x, 540, 820, 460, { rows: [{ text: '6PM  BUDGET' }, { text: '7PM  EMAILS' }, clear > 0.5 ? { text: '8PM  ♡ YOU', col: '#c42a3f' } : { text: '8PM  REPORT', strike: clear > 0.1 }, { text: '9PM  ♡ YOU', col: '#c42a3f' }, null, null] })
          H.hero({ x: 220, y: 1180, s: 200, mood: clear > 0.5 ? 'happy' : 'squint', look: [1, -1] })
          H.you({ x: 870, y: 1190, s: 180, mood: clear > 0.6 ? 'heart' : 'happy', look: [-1, -1] })
        } },
    ] },
  { note: 'Tell them what you need: a fix, or a hug. Both are love.',
    beats: [
      { cap: 'Problem-solving | *mode.*',
        lines: [{ who: 'you', text: 'my day was *awful.*' }, { who: 'sign', text: 'ok. three solutions. *slide one.*' }],
        draw(x, t, lt, H) {
          H.panel(560, 720, 560, 340, { border: BONE, fillC: '#f4f4f0' })
          ;['1. EMAIL YOUR BOSS', '2. NEW SCHEDULE', '3. BETTER LUNCH'].forEach((s, i) => H.label(s, 560, 620 + i * 90, { size: 32, font: MONO, weight: 700, col: '#1b6a52', shadow: false, alpha: H.clamp((lt - 2.4 - i * 0.6) * 3) }))
          H.hero({ x: 260, y: 1080, s: 240, mood: 'squint', look: [1, -1] })
          H.you({ x: 840, y: 1100, s: 210, mood: lt > 4 ? 'wide' : 'neutral', look: [-1, 0] })
        } },
      { cap: 'What you *needed:* | "that sounds hard."',
        lines: [{ text: 'sometimes the fix *is* just listening.' }, { who: 'sign', text: '…that sounds hard. *I\'m here.*' }],
        draw(x, t, lt, H) {
          const er = H.in(lt, 0.4, 1.4)
          H.panel(560, 720, 560 * (1 - er) + 1, 340, { border: BONE, fillC: '#f4f4f0', alpha: 1 - er })
          const close = H.in(lt, 3.6, 4.6)
          H.hero({ x: H.lerp(300, 450, close), y: 1040, s: 250, mood: close > 0.5 ? 'sparkle' : 'neutral', look: [1, 0] })
          H.you({ x: H.lerp(800, 660, close), y: 1050, s: 230, mood: close > 0.8 ? 'happy' : 'neutral', look: [-1, 0] })
          if (close > 0.9) H.pix('bigheart', 555, 860, 7 * H.pop(lt, 4.7))
        } },
      { cap: '*Fix* or *hug?*',
        lines: [{ who: 'you', text: 'do you want a fix or a *hug?*' }, { text: 'one question. saves *a whole evening.*' }],
        draw(x, t, lt, H) {
          const pick = lt > 3.4
          H.panel(330, 700, 300, 150, { border: CYAN, k: H.pop(lt, 0.5), alpha: pick ? 0.4 : 1 }); H.label('FIX', 330, 700, { size: 52, col: CYAN, k: H.pop(lt, 0.5), alpha: pick ? 0.4 : 1 })
          H.panel(750, 700, 300, 150, { border: PINK, k: H.pop(lt, 0.8) * (pick ? 1.12 : 1) }); H.label('HUG', 750, 700, { size: 52, col: PINK, k: H.pop(lt, 0.8) })
          const go = H.in(lt, 4.0, 5.0)
          H.hero({ x: H.lerp(300, 460, go), y: 1050, s: 250, mood: go > 0.6 ? 'happy' : 'neutral', look: [1, 0] })
          H.you({ x: H.lerp(800, 640, go), y: 1060, s: 230, mood: go > 0.6 ? 'heart' : 'happy', look: [-1, 0] })
        } },
    ] },
  { note: 'Be reliable back, laugh at the dry jokes, and protect the soft side.',
    beats: [
      { cap: 'Reliable, | *both ways.*',
        lines: [{ text: 'they show up. so *you* show up too.' }, { who: 'you', text: 'said I\'d call at eight. *it\'s eight.*' }],
        draw(x, t, lt, H) {
          H.phone(560, 820, 360, 520, t, { title: '♑︎ capricorn', msgs: [{ at: t - lt + 1.0, side: 'R', text: 'calling at 8!' }, { at: t - lt + 3.0, side: 'L', text: '8:00. you called.' }, { at: t - lt + 4.2, side: 'L', text: 'I noticed.' }] })
          H.hero({ x: 220, y: 1180, s: 200, mood: lt > 4.2 ? 'heart' : 'happy', look: [1, -1] })
          H.you({ x: 880, y: 1190, s: 180, mood: 'happy', look: [-1, -1] })
        } },
      { cap: 'Laugh at | *the dry jokes.*',
        lines: [{ who: 'sign', text: 'I\'m reading about anti-gravity. *can\'t put it down.*' }, { who: 'you', text: 'HA. *again.* tell it again.' }],
        draw(x, t, lt, H) {
          H.hero({ x: 300, y: 1000, s: 270, mood: lt > 4.4 ? 'heart' : 'wink', look: [1, 0] })
          H.you({ x: 790, y: 1000, s: 230, mood: 'happy', look: [-1, 0], squash: lt > 3.6 ? 0.07 * Math.sin(lt * 32) : 0 })
          // the book floats up (anti-gravity)
          H.panel(300, H.lerp(800, 640, H.in(lt, 0.4, 2.4)) + Math.sin(lt * 3) * 10, 130, 90, { border: GOLD, fillC: '#5a7be0', rot: 0.1 })
          if (lt > 3.6) for (let i = 0; i < 4; i++) H.label('HA', 700 + i * 70, 800 - ((lt * 90 + i * 40) % 140), { size: 34, col: '#ffe27a', rot: (i % 2 ? 0.2 : -0.2) })
        } },
      { cap: 'The *soft* side.',
        lines: [{ text: 'and one night, a puppy video. *it\'s over.*' }, { who: 'sign', text: 'I\'m fine. it\'s *allergies.*' }],
        draw(x, t, lt, H) {
          H.phone(540, 720, 300, 360, t, { title: 'puppy.mov' })
          H.bits(PUPPY, PAL, 540, 740, 14 + Math.sin(lt * 8) * 1)
          H.hero({ x: 330, y: 1100, s: 240, mood: lt > 1.6 ? 'sparkle' : 'neutral', look: [1, -1] })
          if (lt > 1.6) H.bits(['K', 'C', 'C', 'K'], PAL, 300 + Math.sin(lt * 5) * 4, 1080 + ((lt * 80) % 60), 6)
          H.star('pisces', { x: 760, y: 1110, s: 230, tears: 3, mood: 'wide', look: [-0.5, -1], pop: H.pop(lt, 2.4, 0.35, 2.2) })
          H.label('(PISCES: WORSE)', 760, 1290, { size: 28, font: MONO, weight: 700, col: '#bcb6ff', k: H.pop(lt, 3.0) })
        } },
    ] },
]

const DD = buildDeepDive({
  id: 'kdde10', sign: CP, ep: 10, ending: 'cut',
  hook: { text: 'Capricorn love looks like | a *spreadsheet.*' },
  promise: 'four chapters. wait for *the last page.*',
  cold(x, t, H) {
    for (let i = 0; i < 7; i++) { const a = t * 2.6 + i * 0.9, R = 330 + 40 * Math.sin(i); planner(x, 540 + Math.cos(a) * R, 1000 + Math.sin(a) * R * 0.55, 140, { rot: a * 1.3, title: ['Q1', 'Q2', 'Q3', 'Q4', 'TODO', 'GOALS', 'BUDGET'][i] }) }
    H.pix('clock', 540, 680, 13, { rot: t * 9 })
    const st = Math.abs(Math.sin(t * 4.2 + 1.1))
    planner(x, 560, 1180, 300, { rows: [{ text: '07:00 GYM' }, { text: '08:00 GOALS' }, { text: '09:00 LOVE?' }], rot: -0.05 })
    H.hero({ x: 540, y: 980 - st * 50, s: 300, mood: 'squint', look: [0, 1], squash: 0.14 * (1 - st) })
  },
  chapters,
  outro(x, t, lt, H) {
    planner(x, 540, 990, 440, { title: 'LAST PAGE', page: 'you.', rows: [], k: H.pop(lt, 0.15, 0.4, 2) })
    H.hero({ x: 200, y: 1040, s: 200, mood: 'heart', look: [1, -1] })
    H.you({ x: 880, y: 1040, s: 180, mood: 'heart', look: [-1, -1] })
  },
  last: 'Every plan had | room *for you.*',
})
export const { DURATION, SCENES, CUES } = DD
export const T = DD.T, CHECK = DD.CHECK
