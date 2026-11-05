// kxtve02 · Then vs Now: Extended · "Waiting Up for Their Reply" (60 s vertical, dreamy · Db). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxtve01/tvkit.js.
//   0.00  HOOK: THEN ♊ Gemini mid-dive onto a bed for a buzzing old phone (LOW BATTERY) · NOW ♊ Gemini mid-toss of the
//         phone into a drawer, shoes on. Slam "Sent at *seven.* | No reply. *Panic.*" Record scratch + freeze at 0.9, a
//         caught circle on "had fun today!".
//   6.6   1 · 7 PM SENT          the same text, both eras
//  16.0   2 · 7:40 THE WAIT      THEN refresh, refresh, calls itself to check the phone works · NOW phone face down, cooks
//  25.4   3 · 9 PM THE SPIRAL    THEN drafts "?" "lol" "nvm" (loading bar) · NOW ♎ Libra: "they're probably busy." the park
//  34.8   4 · 11 PM              THEN reread counter climbing · NOW game night, the phone forgotten
//  44.2   5 · 1 AM THE REPLY     THEN "sorry fell asleep! had fun too" — Gemini screams, ♓ Pisces cries on the phone ·
//                                NOW the reply seen at breakfast, an easy answer; Pisces happy-cries over coffee
//  57.9   last line "Same reply. | *Calmer* wait." → cut at 60.
import {
  makeThenNowX, star, room, couch, oldPhone, newPhone, chatPanel, R, speech, hearts, sparkles, drawBits, drawPixelStar,
  pop01, outK, inR, bump, walk, clamp, lerp, prog, ease, rng, mixHex, GOLD, BONE, PINK, INK, INTER, MONO, SW, SH, T, TAU, SPLIT,
} from '../../kxtve01/tvkit.js'
import { caught, caughtCues, loadingBar, loadingBarCues, screenShake, shakeCues } from '../../hookkit.js'

const C = T.ch, SPL = SPLIT
const REC = { at: 0.9, len: 1.5, caption: 'yep. *that’s me.*', top: 1560 }

function bedOld(x, t) {
  room(x, t, { wall: '#6a4a6a', floor: '#3a2a3a', old: true, winX: 660, winW: 260 })
  R(x, INK, 80, 360, 640, 150); R(x, '#f4f0ff', 90, 370, 190, 60); R(x, '#d87aa8', 90, 420, 620, 80); R(x, INK, 70, 290, 26, 220)
}
function phoneBig(x, cx, cy, s, { old = false, text = '', sub = '', glow = 0, rot = 0, screen = '#eef2ff' } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 0, 0, 0, 200); g.addColorStop(0, `rgba(160,210,255,${0.5 * glow})`); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(-200, -200, 400, 400); x.restore() }
  R(x, INK, -70, -130, 140, 260); R(x, old ? '#4a4652' : '#26223a', -62, -122, 124, 244); R(x, screen, -54, -108, 108, old ? 190 : 216)
  if (old) R(x, '#2a2633', -14, 96, 28, 14)
  x.font = `800 20px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK
  if (text) { R(x, '#7fb0ff', -54, -32, 108, 44); x.fillText(text, 0, -4) }
  if (sub) { x.font = `700 13px ${MONO}`; x.fillStyle = '#6a6a8a'; x.fillText(sub, 0, 34) }
  x.restore()
}
function kitchen(x, t, warm = false) {
  room(x, t, { wall: warm ? '#f0c8a0' : '#3a5a6a', floor: warm ? '#c89a70' : '#2a3a48', winX: 620, sky: warm ? '#ffcf9a' : '#141040', lamp: false })
  R(x, INK, 60, 300, 380, 140); R(x, '#d8dde8', 66, 306, 368, 128); R(x, INK, 110, 290, 100, 16); R(x, INK, 270, 290, 100, 16)
}
function park(x, t) {
  R(x, '#141a40', 0, 0, SW, SH)
  for (let i = 0; i < 20; i++) R(x, `rgba(255,240,200,${0.3 + 0.4 * Math.sin(t * 2 + i)})`, (i * 97) % SW, (i * 53) % 260, 4, 4)
  for (const tx of [120, 860]) { R(x, INK, tx - 14, 200, 28, 240); R(x, '#5a3a2a', tx - 8, 200, 16, 240); x.fillStyle = '#2a5a3a'; x.beginPath(); x.arc(tx, 170, 110, 0, TAU); x.fill() }
  R(x, '#2a3a2a', 0, 440, SW, SH - 440)
  R(x, INK, 300, 380, 400, 22); R(x, '#a06a40', 306, 384, 388, 14); R(x, INK, 320, 400, 14, 60); R(x, INK, 666, 400, 14, 60)
  R(x, INK, 760, 120, 10, 320); R(x, '#ffe08a', 740, 100, 50, 30)
}
function gameTable(x, t) {
  room(x, t, { wall: '#4a3a6a', floor: '#2e2448', winX: 680, winW: 240 })
  R(x, INK, 150, 420, 700, 30); R(x, '#a0703a', 156, 424, 688, 22)
  for (let i = 0; i < 6; i++) { x.save(); x.translate(320 + i * 70, 410); x.rotate(-0.2 + i * 0.08); R(x, INK, -24, -34, 48, 68); R(x, ['#f4f0e6', '#ffb0c8'][i % 2], -20, -30, 40, 60); x.restore() }
}

function A(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  if (i < 0) {
    bedOld(x, t)
    star(x, t, { sign: 'gemini', x: 330, y: 300, s: 180, mood: 'wide', look: [1, 0], bangs: true, seed: 4, squash: -0.12 })
    phoneBig(x, 620, 360, 0.9, { old: true, text: 'had fun today!', sub: 'LOW BATTERY', glow: 1, rot: 0.08 * Math.sin(t * 40) })
    star(x, t, { sign: 'pisces', x: 880, y: 470, s: 90, mood: 'wide', tears: 2, seed: 6 })
    return
  }
  if (i === 0) {
    bedOld(x, t)
    phoneBig(x, 600, 300, 0.95, { old: true, text: 'had fun today!', sub: u > 1.5 ? 'delivered' : 'sending…' })
    star(x, t, { sign: 'gemini', x: 330, y: 330, s: 180, mood: u > 1.5 ? 'heart' : 'squint', look: [1, 0], bangs: true, seed: 4, hops: [C[0] + 1.6] })
  } else if (i === 1) {
    bedOld(x, t)
    const call = u > 2.2
    phoneBig(x, 620, 300, 0.95, { old: true, text: call ? 'calling: ME' : 'no new messages', sub: call ? 'line busy…' : 'refresh ↻', screen: call ? '#ffe0e0' : '#eef2ff', rot: 0.05 * Math.sin(t * 20) })
    star(x, t, { sign: 'gemini', x: 320, y: 330, s: 180, mood: call ? 'squint' : 'wide', look: [1, 0], bangs: true, seed: 4, hops: [C[1] + 0.6, C[1] + 1.2, C[1] + 1.8] })
    if (!call) speech(x, t, 820, 130, C[1] + 0.4, 'REFRESH', { size: 32, life: 1.6, col: '#fff3c8' })
  } else if (i === 2) {
    bedOld(x, t)
    const drafts = ['?', 'lol', 'nvm', 'hello??', 'jk']
    const d = drafts[Math.floor(u / 0.8) % drafts.length], del = (u % 0.8) > 0.55
    phoneBig(x, 620, 300, 0.95, { old: true, text: del ? '' : d, sub: del ? 'deleted' : 'draft' })
    star(x, t, { sign: 'gemini', x: 320, y: 330, s: 180, mood: 'squint', look: [1, 0], bangs: true, seed: 4 })
  } else if (i === 3) {
    bedOld(x, t)
    phoneBig(x, 600, 300, 0.95, { old: true, text: 'had fun today!', sub: 'delivered' })
    star(x, t, { sign: 'gemini', x: 320, y: 330, s: 180, mood: 'sleepy', look: [1, 0], bangs: true, seed: 4 })
    const n = Math.min(61, Math.floor(u * 14) + 3)
    x.save(); x.translate(850, 120); x.rotate(0.05); R(x, INK, -110, -34, 220, 68); R(x, '#2a1446', -104, -28, 208, 56); x.font = `700 26px ${MONO}`; x.fillStyle = '#ffd0d0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`REREAD: ${n}`, 0, 0); x.restore()
  } else {
    bedOld(x, t)
    const got = u > 0.3
    phoneBig(x, 610, 300, 1.0, { old: true, text: got ? 'had fun too :)' : '', sub: got ? 'sorry, fell asleep!' : '', glow: got ? 1 : 0 })
    star(x, t, { sign: 'gemini', x: 320, y: 320, s: 190, mood: got ? 'sparkle' : 'sleepy', look: [1, -1], bangs: true, seed: 4, hops: [C[4] + 0.5, C[4] + 0.9, C[4] + 1.3, C[4] + 1.7] })
    // Pisces on the phone (a little call bubble), crying with them
    const k = pop01(t, C[4] + 1.6, 0.35, 2)
    if (k > 0.01) { x.save(); x.translate(860, 160); x.scale(k, k); R(x, INK, -110, -110, 220, 220); R(x, '#2a3a6a', -104, -104, 208, 208); x.restore(); star(x, t, { sign: 'pisces', x: 860, y: 150, s: 120 * k, mood: 'sparkle', tears: 3, seed: 6, raw: true }) }
    if (got) speech(x, t, 320, 110, C[4] + 0.5, 'AAAAH!!', { size: 44, life: 2.6, col: '#fff3c8', shake: 4 })
  }
}

function B(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  if (i < 0) {
    room(x, t, { wall: '#3a4a6a', floor: '#2a2a48', winX: 680, winW: 240 })
    R(x, INK, 80, 330, 260, 150); R(x, '#a07a5a', 86, 336, 248, 138); R(x, INK, 86, 370, 248, 8); R(x, '#5a3a2a', 100, 336, 220, 34)
    newPhone(x, 220, 300 - 60 * Math.sin(t * 3), 0.9, t * 6)
    star(x, t, { sign: 'gemini', x: 470, y: 340, s: 170, mood: 'wink', look: [-1, -0.5], seed: 4 })
    star(x, t, { sign: 'libra', x: 820, y: 360, s: 130, mood: 'happy', seed: 7 })
    return
  }
  if (i === 0) {
    room(x, t, { wall: '#3a4a6a', floor: '#2a2a48', winX: 680, winW: 240 })
    const sent = u > SPL + 1.2
    if (!sent) phoneBig(x, 600, 300, 0.95, { text: 'had fun today!', sub: 'sending' })
    else { R(x, INK, 520, 400, 160, 26); R(x, '#26223a', 524, 404, 152, 18) }
    star(x, t, { sign: 'gemini', x: 330, y: 330, s: 180, mood: sent ? 'happy' : 'neutral', look: [1, 0], seed: 4, hops: [C[0] + SPL + 1.3] })
    if (sent) speech(x, t, 620, 300, C[0] + SPL + 1.3, 'face down.', { size: 32, life: 2.5, col: '#d8ffe0' })
  } else if (i === 1) {
    kitchen(x, t)
    R(x, INK, 130, 270, 160, 30); R(x, '#5a5a6a', 136, 274, 148, 22); R(x, INK, 280, 280, 90, 10)
    for (let k = 0; k < 3; k++) R(x, 'rgba(255,255,255,0.5)', 170 + k * 30, 250 - ((t * 40 + k * 20) % 60), 8, 18)
    star(x, t, { sign: 'gemini', x: 560, y: 340, s: 180, mood: 'happy', look: [-1, 0], seed: 4, hops: [C[1] + SPL + 0.4, C[1] + SPL + 1.4, C[1] + SPL + 2.4, C[1] + SPL + 3.4] })
    for (let k = 0; k < 4; k++) { const tt = (t * 0.8 + k * 0.25) % 1; drawBits(x, ['..NN', '..N.', '..N.', 'NNN.', 'NNN.'], { N: '#ffd0f0' }, 760 + k * 40, 300 - tt * 200, 6, { alpha: 1 - tt }) }
  } else if (i === 2) {
    park(x, t)
    star(x, t, { sign: 'gemini', x: 420, y: 330, s: 170, mood: u > SPL + 2 ? 'happy' : 'neutral', look: [1, 0], seed: 4 })
    star(x, t, { sign: 'libra', x: 600, y: 330, s: 160, mood: 'happy', look: [-1, 0], seed: 7 })
    star(x, t, { sign: 'pisces', x: 880, y: 470, s: 100, mood: 'sparkle', tears: 1, seed: 6 })
  } else if (i === 3) {
    gameTable(x, t)
    star(x, t, { sign: 'gemini', x: 330, y: 330, s: 170, mood: u > SPL + 1 ? 'sparkle' : 'happy', seed: 4, hops: [C[3] + SPL + 1, C[3] + SPL + 3] })
    star(x, t, { sign: 'libra', x: 520, y: 330, s: 150, mood: 'wink', seed: 7 })
    star(x, t, { sign: 'leo', x: 700, y: 330, s: 150, mood: 'wide', seed: 8 })
    star(x, t, { sign: 'pisces', x: 880, y: 340, s: 130, mood: 'happy', tears: 2, seed: 6 })
  } else {
    kitchen(x, t, true)
    R(x, INK, 300, 430, 520, 24); R(x, '#fff4dc', 306, 434, 508, 16)
    for (const cx of [430, 690]) { R(x, INK, cx - 26, 380, 52, 52); R(x, '#ffffff', cx - 22, 384, 44, 44); R(x, '#7a4a2a', cx - 18, 388, 36, 12) }
    const seen = u > SPL
    phoneBig(x, 560, 250, 0.7, { text: seen ? 'had fun too :)' : '', sub: seen ? (u > SPL + 2.5 ? 'me: again soon?' : 'sorry, fell asleep!') : '' })
    star(x, t, { sign: 'gemini', x: 330, y: 360, s: 170, mood: seen ? 'happy' : 'sleepy', look: [1, 0], seed: 4 })
    star(x, t, { sign: 'pisces', x: 820, y: 360, s: 150, mood: 'happy', tears: seen ? 3 : 1, seed: 6, look: [-1, 0] })
    if (t > T.pay) hearts(x, t, 560, 200, T.pay + 0.3, { n: 6, cell: 7 })
  }
}

export const { DURATION, SCENES, CUES, MUSIC } = makeThenNowX({
  id: 'kxtve02', thing: 'Waiting for a reply', stamp: '03·12·2016', accent: '#9fd8ff', ending: 'cut', hookTime: '7:05 PM',
  hook: { text: 'Sent at *seven.* | No reply. *Panic.*' },
  freeze: [REC],
  promise: 'Wait for | *the reply.*',
  chapters: [
    { time: '7 PM', title: 'SENT' }, { time: '7:40 PM', title: 'THE WAIT' }, { time: '9 PM', title: 'THE SPIRAL' },
    { time: '11 PM', title: 'STILL NOTHING' }, { time: '1 AM', title: 'THE REPLY' },
  ],
  A, B,
  lines: [
    { t: 3.5, who: 'stars', text: 'the same text, *ten years apart.*' },
    { t: 7.0, who: 'gemini', text: 'sent. now I *wait.*' },
    { t: 11.3, who: 'gemini', text: 'sent. now I *live.*' },
    { t: 16.4, who: 'gemini', text: 'is my phone *broken?* calling myself.' },
    { t: 20.8, who: 'stars', text: 'cooking with music on. *growth.*' },
    { t: 25.8, who: 'gemini', text: 'do I send “?” or “*lol*”…' },
    { t: 30.2, who: 'libra', text: 'they’re probably *busy.* come out!' },
    { t: 35.2, who: 'stars', text: 'read it *sixty-one* times.' },
    { t: 39.6, who: 'gemini', text: 'wait, where’s my phone? …*whatever.*' },
    { t: 44.6, who: 'gemini', text: 'THEY *REPLIED!!*' },
    { t: 46.4, who: 'pisces', text: 'I’m crying *with* you!!' },
    { t: 48.8, who: 'gemini', text: 'oh, a reply. *sweet.* coffee first.' },
    { t: 51.0, who: 'pisces', text: 'this is *so* healthy I’m crying' },
    { t: 54.0, who: 'stars', text: 'it comes anyway. *live meanwhile.*' },
  ],
  boxes: [[3.4, 6.4], [6.8, 15.8], [16.2, 25.2], [25.6, 34.6], [35.0, 44.0], [44.4, 53.4], [53.8, 58.3]],
  last: 'Same reply. | *Calmer* wait.',
  fx: [
    [caught, { at: 1.1, x: 650, y: 660, r: 120, out: [2.3, 2.45], arrow: 'br', label: 'SENT 7:00 PM' }, caughtCues],
    [loadingBar, { at: C[2] + 1.2, len: 2.8, label: 'overthinking…', stallAt: 99, error: 'Error: too many drafts', y: 560 }, loadingBarCues],
    [screenShake, { at: C[4] + 0.5, len: 0.5, amp: 18 }, shakeCues],
  ],
  music: { style: 'dreamy', key: 'Db', seed: 5102 },
  cues: [['whoosh', 0.02, 0.5, 0.05], ['pop', C[0] + 1.5, 1318.51, 0.035, 0], ['pop', C[4] + 0.3, 1567.98, 0.05, 0], ['glitter', C[4] + 0.3, C[4] + 1.0], ['pop', C[4] + SPL + 0.1, 1046.5, 0.035, 0.3]],
})
