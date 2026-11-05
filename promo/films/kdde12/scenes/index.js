// kdde12 — DEEP DIVE: PISCES IN LOVE, "Everything Nobody Tells You" (≈ 2 min vertical, star_advice; dreamy · Ab).
// Show kit: ../../kdde07/scenes/ddkit.js (read-only) on top of hookkit.js. No end card, no card cut. Hard cut.
//   0–8.5     COLD OPEN  Pisces mid-sob at a tiny bird outside the window, tissues flying everywhere.
//             Slam title "Loving a Pisces? Yes, they're crying." · whip zoom · record scratch + freeze.
//   1 HOW THEY FLIRT   the whole future, on date one · a playlist (fictional song titles) · they remember how you felt
//   2 WHAT THEY NEED   gentleness · reassurance ("you're not too much") · someone who dreams with them
//   3 HOW THEY FIGHT   they soak up everything (the sponge) · they go quiet and cry · what helps: "I'm here."
//   4 WHAT MAKES THEM STAY   feelings welcome · a steady hand on a cloudy day · the payoff: the partner cries too,
//             happily, at the movie, and Pisces is overjoyed.
//   Outro: the couch, both happy-crying. Last line "Let them feel it. Stay anyway."
// Pisces is the hero here AND the research assistant (bottom right) is still sobbing: two Pisces, double tears.
import { buildDeepDive, bits, PIX, PAL, GOLD, BONE, INK, PINK, CYAN, MINT, LAV, MONO, INTER, SERIF, rgba, mixHex } from '../../kdde07/scenes/ddkit.js'

const PS = 'pisces'
const BIRD = ['..KKK...', '.KBBBK..', 'KBWKBBKK', 'KBBBBBGK', '.KBBBBK.', '..KKKK..', '...K.K..']
function windowFrame(x, cx, cy, w, h, t) {
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 10, cy - h / 2 - 10, w + 20, h + 20)
  const g = x.createLinearGradient(0, cy - h / 2, 0, cy + h / 2); g.addColorStop(0, '#8fb0ff'); g.addColorStop(1, '#ffd1e8')
  x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  x.fillStyle = INK; x.fillRect(cx - 5, cy - h / 2, 10, h); x.fillRect(cx - w / 2, cy - 5, w, 10)
  x.fillStyle = '#8a5a3a'; x.fillRect(cx - w / 2 - 20, cy + h / 2 + 4, w + 40, 18)
}
function tissues(x, t, n = 12, seed = 1) {
  for (let i = 0; i < n; i++) {
    const a = t * (1.2 + (i % 3) * 0.3) + i * 1.7 + seed, R = 260 + (i * 53 % 200)
    bits(x, PIX.tissue, PAL, 540 + Math.cos(a) * R, 1000 + Math.sin(a * 1.2) * R * 0.6, 6, { rot: a })
  }
}
function couch(x, cx, cy) {
  x.fillStyle = INK; x.fillRect(cx - 380, cy - 60, 760, 190)
  x.fillStyle = '#5a4a9a'; x.fillRect(cx - 370, cy - 50, 740, 80); x.fillStyle = '#6f5fb8'; x.fillRect(cx - 370, cy + 30, 740, 90)
  x.fillStyle = INK; x.fillRect(cx - 360, cy + 120, 20, 30); x.fillRect(cx + 340, cy + 120, 20, 30)
}
function thought(x, cx, cy, w, h, k, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, w / 2 + 8, h / 2 + 8, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f3eeff'; x.beginPath(); x.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2); x.fill()
  draw && draw()
  x.restore()
}

const chapters = [
  { note: 'Dream back a little. And tell them how they make you feel.',
    beats: [
      { cap: 'The whole future. | *On date one.*',
        lines: [{ text: 'by dessert, they\'ve named your *future dog.*' }, { who: 'sign', text: 'sorry. is "Biscuit" too much? *it\'s Biscuit.*' }],
        draw(x, t, lt, H) {
          H.hero({ x: 300, y: 1060, s: 260, mood: 'sparkle', look: [0.5, -1], tears: 1 })
          H.you({ x: 800, y: 1070, s: 220, mood: lt > 4.4 ? 'happy' : 'neutral', look: [-1, 0] })
          thought(x, 560, 700, 600, 300, H.pop(lt, 0.4, 0.4, 2), () => {
            const scenes = [() => bits(x, ['....KK....', '...KRRK...', '..KRRRRK..', '.KKKKKKKK.', '.KWWYWWWK.', '.KWWWWKWK.', '.KKKKKKKK.'], PAL, -180, 0, 9),
              () => bits(x, ['.KK....KK.', 'KOOK..KOOK', 'KOOKKKKOOK', '.KWWWWWWK.', 'KWWKWWKWWK', 'KWWWWWWWWK', '.KWWPPWWK.', '..KKKKKK..'], PAL, 0, 0, 9),
              () => bits(x, PIX.ring, PAL, 180, 0, 10)]
            scenes.forEach((s, i) => { if (lt > 1 + i * 0.8) s() })
          })
          for (const [bx, by] of [[380, 900], [430, 850]]) { x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 16, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f3eeff'; x.beginPath(); x.arc(bx, by, 11, 0, Math.PI * 2); x.fill() }
        } },
      { cap: 'The *playlist.*',
        lines: [{ text: 'week two: a playlist. *every song is about you.*' }, { text: 'listen to it. *they\'ll ask.*' }],
        draw(x, t, lt, H) {
          H.panel(540, 760, 640, 400, { border: LAV, k: H.pop(lt, 0.3) })
          H.label('FOR YOU ♡ (vol. 1)', 540, 610, { size: 34, font: MONO, weight: 700, col: LAV, k: H.pop(lt, 0.3) })
          ;['Moonbeam For Two', 'You Hung The Stars', 'Tuesday, But Softer', 'Cry Like The Ocean (Live)'].forEach((s, i) => H.label(`${i + 1}. ${s}`, 540, 690 + i * 64, { size: 32, col: BONE, alpha: H.clamp((lt - 0.8 - i * 0.45) * 3) }))
          for (let i = 0; i < 3; i++) H.pix('note', 200 + i * 340 + Math.sin(lt * 3 + i) * 20, 1010 - ((lt * 70 + i * 50) % 120), 7)
          H.hero({ x: 260, y: 1180, s: 200, mood: 'sparkle', look: [1, -1] })
          H.you({ x: 840, y: 1190, s: 180, mood: lt > 4 ? 'heart' : 'happy', look: [-1, -1] })
        } },
      { cap: 'They remember | *how you felt.*',
        lines: [{ who: 'sign', text: 'you seemed tired tuesday. *so I made soup.*' }, { text: 'not what you said. *how you said it.*' }],
        draw(x, t, lt, H) {
          H.hero({ x: 320, y: 1040, s: 250, mood: 'happy', look: [1, 0] })
          const mv = H.in(lt, 1.4, 2.4)
          H.bits(['KKKKKKKKKK', 'KWWWWWWWWK', 'KWOOOOOOWK', '.KWOOOOWK.', '..KKKKKK..'], PAL, H.lerp(420, 640, mv), 1060, 10)
          for (let i = 0; i < 3; i++) H.bits(['K', 'K', '.', 'K'], { K: rgba(BONE, 0.7) }, H.lerp(420, 640, mv) - 30 + i * 30, 990 - ((lt * 60 + i * 15) % 50), 6)
          H.you({ x: 820, y: 1050, s: 220, mood: lt > 2.6 ? 'sparkle' : 'sleepy', look: [-1, 0] })
          H.panel(560, 660, 460, 100, { border: GOLD, k: H.pop(lt, 4.2) }); H.label('FEELING: REMEMBERED', 560, 660, { size: 30, font: MONO, weight: 700, col: GOLD, k: H.pop(lt, 4.2) })
        } },
    ] },
  { note: 'Be gentle, reassure them out loud, and dream with them sometimes.',
    beats: [
      { cap: '*Gentleness.*',
        lines: [{ text: 'a sharp tone lands *ten times harder* on them.' }, { text: 'same words, softer voice. *huge* difference.' }],
        draw(x, t, lt, H) {
          const soft = lt > 3.9
          H.meter(540, 650, 560, soft ? 0.25 : 0.95, { label: soft ? 'VOLUME: SOFT' : 'VOLUME: SHARP', col: soft ? MINT : '#ff5b7a' })
          H.you({ x: 780, y: 1020, s: 230, mood: soft ? 'happy' : 'squint', look: [-1, 0] })
          H.bubble(760, 820, soft ? 'hey, you ok?' : 'WHAT.', { size: soft ? 30 : 44, col: soft ? '#efe6ff' : '#ffb3b3', k: H.pop(lt % 3.9, 0.1) })
          H.hero({ x: 300, y: 1040, s: 260, mood: soft ? 'sparkle' : 'wide', look: [1, 0], tears: soft ? 1 : 3, squash: soft ? 0 : 0.1 })
        } },
      { cap: 'Reassurance. | *Out loud.*',
        lines: [{ who: 'sign', text: 'am I too much? *be honest.*' }, { who: 'you', text: 'you\'re not too much. *you\'re a lot. I like a lot.*' }],
        draw(x, t, lt, H) {
          H.hero({ x: 300, y: 1050, s: 260, mood: lt > 5 ? 'sparkle' : 'wide', look: [1, 0], tears: lt > 5 ? 1 : 2 })
          H.you({ x: 800, y: 1060, s: 220, mood: 'happy', look: [-1, 0] })
          const nk = H.pop(lt, 4.4, 0.4, 2.2)
          H.panel(560, 700, 420, 220, { border: PINK, fillC: '#ffe8f2', k: nk, rot: -0.05 })
          H.label("you're not", 560, 660, { size: 46, col: INK, k: nk, rot: -0.05, shadow: false }); H.label('too much ♡', 560, 730, { size: 46, col: '#c42a5f', k: nk, rot: -0.05, shadow: false })
        } },
      { cap: 'Dream *with* them.',
        lines: [{ who: 'you', text: 'ok. lighthouse cottage. *two cats.* go.' }, { text: 'you don\'t have to believe it. *just play.*' }],
        draw(x, t, lt, H) {
          const m = H.in(lt, 2.6, 4.0)
          thought(x, H.lerp(320, 540, m), 700, 320, 220, H.pop(lt, 0.4), () => bits(x, ['..KK..', '.KYYK.', '.KWWK.', '.KRRK.', '.KWWK.', '.KRRK.', 'KKKKKK'], PAL, 0, 0, 12))
          thought(x, H.lerp(760, 540, m), 700, 320, 220, H.pop(lt, 1.0), () => { bits(x, ['K...K', 'KKKKK', 'KWKWK', 'KKKKK'], PAL, -50, 0, 10); bits(x, ['K...K', 'KKKKK', 'KWKWK', 'KKKKK'], PAL, 50, 0, 10) })
          H.hero({ x: 300, y: 1060, s: 250, mood: m > 0.9 ? 'heart' : 'sparkle', look: [1, -1], tears: 1 })
          H.you({ x: 800, y: 1070, s: 220, mood: 'sparkle', look: [-1, -1] })
          if (m > 0.95) H.spark(t, 540, 700, t - lt + 4.0, 12, 220, 5)
        } },
    ] },
  { note: 'Stay calm, stay close, and let them cry without rushing to fix it.',
    beats: [
      { cap: 'They soak up | *everything.*',
        lines: [{ text: 'your bad day becomes *their* bad day. instantly.' }, { text: 'like a sponge. *a very sweet sponge.*' }],
        draw(x, t, lt, H) {
          H.you({ x: 790, y: 1020, s: 230, mood: 'squint', look: [-1, 0] })
          const n = Math.floor(H.clamp(lt / 5) * 8)
          for (let i = 0; i < 8; i++) { const p = H.clamp((lt - i * 0.6) / 0.6); if (p <= 0 || p >= 1) continue; H.pix(i % 2 ? 'bolt' : 'cloud', H.lerp(720, 330, p), H.lerp(880, 1000, p), 6) }
          H.hero({ x: 320, y: 1040, s: 250 + n * 10, mood: 'wide', look: [1, 0], tears: 2, squash: 0.03 * n })
          H.meter(540, 650, 520, n / 8, { label: 'ABSORBED', col: CYAN })
        } },
      { cap: 'They go quiet. | *And cry.*',
        lines: [{ text: 'the tears aren\'t drama. *it\'s how it leaves.*' }, { text: 'don\'t panic. *it\'s a release valve.*' }],
        draw(x, t, lt, H) {
          H.dim(0.3)
          H.hero({ x: 420, y: 1030, s: 280, mood: 'wide', look: [0, 0.6], tears: 3 })
          H.you({ x: 820, y: 1060, s: 200, mood: lt > 3.6 ? 'happy' : 'wide', look: [-1, 0] })
          for (let i = 0; i < 10; i++) H.pix('drop', 300 + i * 50, 1240 + Math.sin(i + lt * 3) * 6, 5)
        } },
      { cap: 'What *actually* | helps.',
        lines: [{ who: 'you', text: 'I\'m here. *you can feel this.*' }, { text: 'no fixing. no rushing. *just a tissue.*' }],
        draw(x, t, lt, H) {
          const mv = H.in(lt, 0.4, 1.6)
          H.you({ x: H.lerp(820, 640, mv), y: 1050, s: 220, mood: 'happy', look: [-1, 0] })
          H.hero({ x: 380, y: 1040, s: 260, mood: lt > 4 ? 'sparkle' : 'wide', look: [1, 0], tears: lt > 4 ? 1 : 3, pull: lt > 3.6 ? 1 : 0 })
          H.pix('tissue', H.lerp(760, 520, mv), 900, 9)
          if (lt > 4.6) H.pix('bigheart', 510, 830, 7 * H.pop(lt, 4.6))
        } },
    ] },
  { note: 'Make feelings welcome, be steady, and cry with them sometimes.',
    beats: [
      { cap: 'Feelings | *welcome.*',
        lines: [{ text: 'they stay where crying isn\'t *a problem to solve.*' }, { who: 'sign', text: 'oh. I can just… *be like this here?*' }],
        draw(x, t, lt, H) {
          H.panel(540, 680, 560, 140, { border: GOLD, fillC: '#3a2a6a', k: H.pop(lt, 0.4), rot: -0.03 })
          H.label('FEELINGS WELCOME', 540, 680, { size: 50, col: GOLD, k: H.pop(lt, 0.4), rot: -0.03 })
          H.hero({ x: 340, y: 1050, s: 260, mood: lt > 4 ? 'happy' : 'sparkle', look: [1, -1], tears: 2 })
          H.you({ x: 780, y: 1060, s: 220, mood: 'happy', look: [-1, 0] })
        } },
      { cap: 'A steady hand | *on a cloudy day.*',
        lines: [{ text: 'some days the mood is *grey.* that\'s ok.' }, { who: 'you', text: 'blanket? tea? *I\'ll stay.*' }],
        draw(x, t, lt, H) {
          H.pix('cloud', 380, 760 + Math.sin(lt * 2) * 8, 14, { alpha: 1 - H.in(lt, 4.2, 5.4) })
          if (lt > 4.6) H.pix('sun', 380, 760, 12 * H.pop(lt, 4.6))
          H.hero({ x: 380, y: 1050, s: 260, mood: lt > 4.6 ? 'happy' : 'neutral', look: [0, 0.6], tears: lt > 4.6 ? 1 : 2 })
          const bk = H.in(lt, 3.6, 4.4)
          if (bk > 0) H.panel(380, 1175, 300 * bk + 1, 60, { border: '#c06a8a', fillC: '#e08aa8', alpha: bk })
          H.you({ x: 780, y: 1060, s: 220, mood: 'happy', look: [-1, 0] })
          H.pix('cup', 640, 1180, 6)
        } },
      { cap: 'And one day, | *you cry too.*',
        lines: [{ text: 'movie night. the ending. and then *you* go.' }, { who: 'sign', text: 'YOU\'RE CRYING?? *I love you so much.*' }],
        draw(x, t, lt, H) {
          H.panel(540, 700, 560, 330, { border: BONE, fillC: '#1d2a66' })
          H.label('THE END', 540, 700, { size: 56, font: SERIF, weight: '500 italic', col: BONE, alpha: H.clamp(lt - 0.8) })
          couch(x, 540, 1130)
          const youCry = lt > 2.4
          H.you({ x: 680, y: 1030, s: 220, mood: youCry ? 'sparkle' : 'happy', look: [0, -1], tag: true })
          if (youCry) for (let i = 0; i < 2; i++) H.pix('drop', 640 + i * 80, 1020 + ((lt * 90 + i * 30) % 80), 5)
          H.hero({ x: 400, y: 1030, s: 250, mood: lt > 3.9 ? 'heart' : 'wide', look: [1, 0], tears: 3, hops: [3.9, 4.3, 4.7] })
          if (lt > 4) H.spark(t, 540, 900, t - lt + 4.0, 14, 260, 9)
        } },
    ] },
]

const DD = buildDeepDive({
  id: 'kdde12', sign: PS, ep: 12, ending: 'cut',
  hook: { text: 'Loving a *Pisces?* | Yes, they\'re crying.' },
  promise: 'chapter four *will* get you. sorry.',
  cold(x, t, H) {
    windowFrame(x, 760, 760, 300, 300, t)
    H.bits(BIRD, PAL, 800, 860 + Math.sin(t * 6) * 4, 8)
    tissues(x, t, 12, 1)
    H.hero({ x: 420, y: 1060, s: 320, mood: 'wide', look: [1, -1], tears: 3, squash: 0.06 * Math.sin(t * 22), pull: 1 })
  },
  chapters,
  outro(x, t, lt, H) {
    couch(x, 540, 1130)
    H.hero({ x: 420, y: 1030, s: 250, mood: 'heart', look: [1, 0], tears: 3 })
    H.you({ x: 680, y: 1040, s: 220, mood: 'heart', look: [-1, 0] })
    for (let i = 0; i < 2; i++) H.pix('drop', 640 + i * 80, 1040 + ((lt * 90 + i * 30) % 80), 5)
  },
  last: 'Let them feel it. | *Stay* anyway.',
})
export const { DURATION, SCENES, CUES } = DD
export const T = DD.T, CHECK = DD.CHECK
