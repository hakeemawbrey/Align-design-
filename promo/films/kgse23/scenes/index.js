// kgse23: GUESS THE SIGN, "Guess the Sign: the late-night texting round" (60 s vertical, star_advice trial, synthwave · Fm, hard cut).
//   Six rounds of 9.5 s (chapter sticker, caption, two clues, Pisces' wrong buzz, 3·2·1, the reveal, a mini last line),
//   then the final score card (57–60). The running gag: Pisces buzzes "PISCES?" every round. Round 6 it IS Pisces
//   (the contestant has gone for tissues: BRB).
//   0.00  frame 0: round 1's silhouette mid-scream at a phone buzzing off the table, ROUND 1 sticker, hook + promise.
//         Hook: "Six silhouettes. One night. *Guess them all.*"   Promise: "round 6 is the hardest"
//   R1 9:02 p.m.  replies "haha", stares at it for ten minutes → AQUARIUS
//   R2 10:15      eats the whole snack waiting for a reply → TAURUS
//   R3 11:00      sends a meme instead of "I miss you" → GEMINI
//   R4 11:40      types a paragraph, sends "ok" → SCORPIO
//   R5 midnight   hypes a friend's text into "SEND IT!!" → LEO
//   R6 1 a.m.     crying at a goodnight text → PISCES (the contestant itself)
//   57–60 final card · last line "Everyone's soft at 1 a.m. Be kind." · hard cut
import { makeGuessLong, box, R, phone, bubble, shadow, chat, label, hearts, tears, drawBits, HEART, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, CYAN, PINK, MINT, RED, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const msgScreen = (lines) => (x, w, h) => { R(x, '#1a1634', 0, 0, w, h); let y = 14; for (const [txt, me] of lines) { y += chat(x, txt, me ? w - 10 : 10, y, { me, size: 16 }) + 10 } }
function table(x) { box(x, 120, 1150, 840, 30, '#5a3a2a', { b: 6 }); R(x, INK, 180, 1186, 16, 64); R(x, INK, 884, 1186, 16, 64) }
const prop = (k, fn) => { if (k > 0.01) fn(k) }

const ROUNDS = [
  { sign: 'aquarius', chapter: '9:02 P.M.', cap: '9:02 p.m. Replied ‘haha’. | *Stared at it for ten minutes.*', clues: ['a telescope', 'a robot sticker'], last: '‘haha’ was *perfect.* | Put it down.',
    draw(x, S) {
      const { u, rv } = S
      table(x)
      const buzz = u < 1.2 ? Math.sin(u * 70) * 8 * (1 - u / 1.2) : 0
      const fall = u < 0.8 ? 0 : 0
      phone(x, 760 + buzz, 1040 - fall, { w: 200, h: 300, rot: 0.1 + buzz * 0.01, fn: msgScreen([['lol did you see that', false], ['haha', true]]) })
      const scream = Math.exp(-u * 2.5)
      const o = { x: 420, y: 980, s: 340, mood: rv > 0.5 ? 'happy' : u < 1 ? 'wide' : 'neutral', look: [1, 0.3], hops: [0.05, 0.5], rot: -0.18 * scream, squash: -0.14 * scream }
      S.sil(o)
      if (u > 1.2 && rv < 0.5) { const m = Math.min(10, Math.floor((u - 1.2) * 2.2)); label(x, `staring: ${m} min`, 760, 840, { size: 32, col: CYAN, font: MONO }) }
      prop(pop01(u, 3.05, 0.3, 2.4), k => { x.save(); x.translate(160, 860); x.rotate(-0.5); x.scale(k, k); box(x, -90, -24, 180, 48, '#5a6aa8', { b: 5 }); box(x, 90, -30, 30, 60, '#3a4a88', { b: 4 }); R(x, INK, -20, 24, 10, 120); R(x, INK, 20, 24, 10, 120); x.restore() })
      prop(pop01(u, 4.25, 0.3, 2.4), k => { x.save(); x.translate(o.x + 120, o.y + 40); x.scale(k, k); box(x, -30, -30, 60, 60, '#c9c4d8', { b: 4 }); R(x, CYAN, -16, -12, 10, 10); R(x, CYAN, 6, -12, 10, 10); R(x, INK, -12, 10, 24, 6); x.restore() })
      if (rv > 0.5) bubble(x, S.t, 420, 720, S.rd.R + 0.3, S.rd.t1, 'okay. phone down.', { size: 30 })
    }, cues: [['pop', 0.02, 220, 0.06, 0.3], ['pop', 0.2, 220, 0.05, 0.3], ['pop', 0.4, 220, 0.04, 0.3], ['tick', 1.5, 0.04], ['tick', 2.0, 0.04], ['tick', 2.5, 0.04]] },
  { sign: 'taurus', chapter: '10:15 P.M.', cap: '10:15. Ate the whole snack | *waiting for a reply.*', clues: ['a velvet cushion', 'a flower pot'], last: 'Snack, breathe. | *It’ll come.*',
    draw(x, S) {
      const { u, rv } = S
      table(x)
      const left = Math.max(0, 12 - Math.floor(u * 2.2))
      box(x, 640, 960, 200, 190, '#e9b24a', { b: 6 }); x.font = `900 30px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('SNACKS', 740, 1010)
      for (let i = 0; i < left; i++) R(x, '#f2d36a', 660 + (i % 6) * 28, 1050 + Math.floor(i / 6) * 30, 22, 22)
      phone(x, 900, 1080, { w: 140, h: 200, rot: -0.1, fn: msgScreen([['so what are you up to?', true]]) })
      const o = { x: 400, y: 990, s: 330, mood: rv > 0.5 ? 'happy' : 'neutral', look: [1, 0.4], hops: Array.from({ length: 10 }, (_, i) => 0.4 + i * 0.5).filter(h => h < 6.3), rot: 0.06 * Math.sin(u * 6), squash: 0.05 * Math.sin(u * 12) }
      S.sil(o)
      if (left === 0 && rv < 0.5) label(x, '…0 left', 740, 920, { size: 34, col: RED, font: INTER, weight: 900 })
      prop(pop01(u, 3.05, 0.3, 2.4), k => { x.save(); x.translate(180, 1120); x.scale(k, k); box(x, -80, -30, 160, 60, '#a03a6a', { b: 5, hi: '#c05a8a' }); x.restore() })
      prop(pop01(u, 4.25, 0.3, 2.4), k => { x.save(); x.translate(180, 900); x.scale(k, k); box(x, -40, 0, 80, 70, '#c86a4a', { b: 5 }); for (const d of [-1, 0, 1]) { x.fillStyle = [PINK, GOLD, '#ff8a5a'][d + 1]; x.beginPath(); x.arc(d * 28, -30 - Math.abs(d) * -10, 20, 0, Math.PI * 2); x.fill() } x.restore() })
      if (rv > 0.5) bubble(x, S.t, 400, 720, S.rd.R + 0.3, S.rd.t1, 'oh! they replied :)', { size: 30 })
    }, cues: Array.from({ length: 10 }, (_, i) => ['tick', +(0.4 + i * 0.5).toFixed(2), 0.04]) },
  { sign: 'gemini', chapter: '11:00 P.M.', cap: '11:00. Sent a meme | *instead of ‘I miss you’.*', clues: ['two phone chargers', 'a chatterbox'], last: 'Memes are nice. | *Words are nicer.*',
    draw(x, S) {
      const { u, rv } = S
      table(x)
      const typed = 'I miss you'.slice(0, Math.max(0, Math.min(10, Math.floor((u - 0.3) * 6)) - Math.max(0, Math.floor((u - 2.2) * 12))))
      phone(x, 760, 960, { w: 250, h: 400, rot: 0.08, fn: (x2, w, h) => { R(x2, '#1a1634', 0, 0, w, h); if (u > 2.6) { R(x2, '#3a3160', w - 190, 20, 180, 150); x2.font = `900 18px ${INTER}`; x2.fillStyle = BONE; x2.textAlign = 'center'; x2.fillText('ME AT 11PM', w - 100, 44); drawBits(x2, ['.YYY.', 'YKYKY', 'YYYYY', 'Y.K.Y', '.YYY.'], { Y: GOLD, K: INK }, w - 100, 110, 9) } R(x2, '#2e2752', 8, h - 60, w - 16, 46); x2.font = `700 18px ${INTER}`; x2.textAlign = 'left'; x2.fillStyle = BONE; x2.fillText(typed + (Math.floor(u * 3) % 2 ? '|' : ''), 16, h - 37) } })
      const o = { x: 400, y: 990, s: 330, mood: rv > 0.5 ? 'happy' : u > 2.2 && u < 2.8 ? 'squint' : 'neutral', look: [1, 0.3], hops: [0.4, 0.8, 1.2, 2.6].filter(h => h < 6.3), rot: 0.05 * Math.sin(u * 3), squash: 0 }
      S.sil(o)
      prop(pop01(u, 3.05, 0.3, 2.4), k => { for (const d of [0, 1]) { x.save(); x.translate(150 + d * 70, 1120); x.scale(k, k); box(x, -16, -30, 32, 50, BONE, { b: 4 }); R(x, INK, -3, 20, 6, 40); x.restore() } })
      prop(pop01(u, 4.25, 0.3, 2.4), k => { x.save(); x.translate(200, 880); x.rotate(0.2); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.moveTo(0, -60); x.lineTo(60, 0); x.lineTo(0, 60); x.lineTo(-60, 0); x.closePath(); x.fill(); x.fillStyle = PINK; x.beginPath(); x.moveTo(0, -50); x.lineTo(50, 0); x.lineTo(0, 50); x.lineTo(-50, 0); x.closePath(); x.fill(); x.restore() })
      if (rv > 0.5) bubble(x, S.t, 400, 720, S.rd.R + 0.3, S.rd.t1, '…also, I miss you.', { size: 30 })
    }, cues: [['tick', 0.5, 0.04], ['tick', 0.8, 0.04], ['tick', 1.1, 0.04], ['whoosh', 2.2, 0.3, 0.03], ['pop', 2.6, 1318.51, 0.04, 0.3]] },
  { sign: 'scorpio', chapter: '11:40 P.M.', cap: '11:40. Typed a paragraph. | *Sent ‘ok’.*', clues: ['a candle', 'a locked diary'], last: 'Your paragraph | *deserved sending.*',
    draw(x, S) {
      const { u, rv } = S
      table(x)
      const shrink = clamp(prog(u, 2.6, 3.0))
      phone(x, 760, 960, { w: 250, h: 400, rot: 0.06, fn: (x2, w, h) => { R(x2, '#1a1634', 0, 0, w, h); chat(x2, 'are you mad at me?', 10, 14, { size: 15 }); const n = Math.min(9, Math.floor(u * 3.5)); if (shrink < 1) { x2.save(); x2.globalAlpha = 1 - shrink; for (let i = 0; i < n; i++) R(x2, '#8a80c0', 16, 70 + i * 26, w - 40 - (i % 3) * 30, 14); x2.restore() } if (u > 3.0) chat(x2, 'ok', w - 10, 70, { me: true, size: 18 }) } })
      const o = { x: 400, y: 990, s: 330, mood: rv > 0.5 ? 'happy' : 'squint', look: [1, 0.3], hops: [0.3, 0.9, 1.5, 2.1, 3.0].filter(h => h < 6.3), rot: 0.06, squash: u > 2.6 && u < 3.1 ? 0.12 : 0 }
      S.sil(o)
      prop(pop01(u, 3.05, 0.3, 2.4), k => { x.save(); x.translate(170, 1080); x.scale(k, k); box(x, -26, -50, 52, 100, '#5a2a4a', { b: 5 }); x.fillStyle = '#ffcf6a'; x.beginPath(); x.ellipse(0, -72, 10, 18, 0, 0, Math.PI * 2); x.fill(); x.restore() })
      prop(pop01(u, 4.25, 0.3, 2.4), k => { x.save(); x.translate(200, 870); x.rotate(-0.1); x.scale(k, k); box(x, -60, -76, 120, 152, '#3a1a3a', { b: 6 }); box(x, 40, -14, 30, 28, GOLD, { b: 4 }); x.restore() })
      if (rv > 0.5) bubble(x, S.t, 400, 720, S.rd.R + 0.3, S.rd.t1, 'sent the paragraph. ok.', { size: 30 })
    }, cues: [['tick', 0.3, 0.04], ['tick', 0.9, 0.04], ['tick', 1.5, 0.04], ['tick', 2.1, 0.04], ['whoosh', 2.6, 0.3, 0.04], ['pop', 3.0, 440, 0.05, 0.3]] },
  { sign: 'leo', chapter: 'MIDNIGHT', cap: 'Midnight. Hyped a friend’s text | *into ‘SEND IT!!’*', clues: ['pom-poms', 'a tiny gold crown'], last: 'Best hype friend | *in the sky.*',
    draw(x, S) {
      const { u, rv } = S
      S.star('virgo', { x: 780, y: 1040, s: 220, mood: u > 3.6 ? 'happy' : 'wide', look: [0, 0.4], seed: 14, hops: [3.6] })
      phone(x, 780, 820, { w: 160, h: 240, rot: -0.05, fn: msgScreen([['want to get coffee this week?', true]].concat(u > 3.6 ? [['yes!!', false]] : [])) })
      const o = { x: 360, y: 990, s: 320, mood: rv > 0.5 ? 'sparkle' : 'happy', look: [1, -0.2], hops: Array.from({ length: 12 }, (_, i) => 0.2 + i * 0.4).filter(h => h < 6.3), rot: 0.18 * Math.sin(u * 7), squash: 0 }
      S.sil(o)
      const shout = ['SEND IT!!', 'YOU GOT THIS', 'SEND!!!']
      shout.forEach((s, i) => { const a = 0.6 + i * 0.9; const k = pop01(u, a, 0.2, 2.6) * outK(u, [a + 0.75, a + 0.85]); if (k > 0.01) label(x, s, [330, 380, 300][i], [700, 680, 720][i], { size: 52 * k, col: GOLD, font: INTER, weight: 900, rot: [-0.12, 0.1, -0.05][i] }) })
      prop(pop01(u, 3.05, 0.3, 2.4), k => { for (const d of [-1, 1]) { x.save(); x.translate(o.x + d * 190, o.y + 20 + 10 * Math.sin(u * 14 + d)); x.scale(k, k); for (let i = 0; i < 10; i++) R(x, i % 2 ? GOLD : PINK, -40 + Math.cos(i) * 30, -40 + Math.sin(i * 1.3) * 30, 16, 16); x.restore() } })
      prop(pop01(u, 4.25, 0.3, 2.4), k => drawBits(x, ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG'], { G: GOLD, R: RED }, o.x, o.y - 175, 14 * k))
      hearts(x, S.t, S.rd.t0 + 3.7, 780, 900, { n: 5 })
      if (rv > 0.5) bubble(x, S.t, 360, 700, S.rd.R + 0.3, S.rd.t1, 'I’M SO PROUD OF YOU', { size: 30 })
    }, cues: [['pop', 0.6, 1318.51, 0.05, -0.3], ['pop', 1.5, 1567.98, 0.05, -0.3], ['pop', 2.4, 1760, 0.05, -0.3], ['pop', 3.6, 987.77, 0.04, 0.3], ['glitter', 3.6, 4.0]] },
  { sign: 'pisces', away: true, chapter: '1 A.M. · HARDEST', cap: '1 a.m. Crying at | *a goodnight text.*', clues: ['a fish-shaped pillow', 'an empty tissue box'], last: 'Happy tears | *count too.*',
    draw(x, S) {
      const { u, rv } = S
      phone(x, 780, 950, { w: 240, h: 360, rot: 0.06, fn: msgScreen([['goodnight :)', false], ['sleep well. today was nice', false]]) })
      const o = { x: 420, y: 1000, s: 360, mood: rv > 0.5 ? 'sparkle' : 'wide', look: [1, -0.2], hops: [0.5, 1.6, 2.7, 3.8].filter(h => h < 6.3), rot: 0.04 * Math.sin(u * 9), squash: 0.05 * Math.sin(u * 8) }
      S.sil(o)
      tears(x, S.t, o, 3)
      prop(pop01(u, 3.05, 0.3, 2.4), k => { x.save(); x.translate(170, 1160); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 90, 44, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7c74f0'; x.beginPath(); x.ellipse(0, 0, 82, 36, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7c74f0'; x.beginPath(); x.moveTo(80, 0); x.lineTo(124, -34); x.lineTo(124, 34); x.closePath(); x.fill(); R(x, INK, -50, -8, 12, 12); x.restore() })
      prop(pop01(u, 4.25, 0.3, 2.4), k => { x.save(); x.translate(920, 1180); x.scale(k, k); box(x, -60, -34, 120, 68, '#9fd8f6', { b: 5 }); R(x, INK, -24, -40, 48, 10); x.restore() })
      hearts(x, S.t, S.rd.t0 + 1.0, 780, 800, { n: 5 })
      if (rv > 0.5) bubble(x, S.t, 420, 720, S.rd.R + 0.3, S.rd.t1, 'it’s ME. I went for tissues.', { size: 30 })
    }, cues: [['pluck', 0.4, 1318.51, 0.035, 0.3, 0.5], ['pluck', 1.6, 1174.66, 0.03, 0.3, 0.5]] },
]

export const EP = makeGuessLong({
  id: 'kgse23', D: 60, ending: 'cut',
  hook: 'Six silhouettes. One night. | *Guess them all.*',
  promise: '★ round 6 is the hardest',
  rounds: ROUNDS,
  final: { title: 'Pisces guessed *‘Pisces’* | six times.', sub: 'Round six, it finally was.', last: 'Everyone’s soft | at 1 a.m. *Be kind.*' },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
