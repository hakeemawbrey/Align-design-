// kfae24: FAKE AD, "The Breakup Recovery Kit (the full infomercial)" (60 s long trial reel, pop · A, loops). Row: m31.md
// Long-ad engine: ../../kfae23/longad.js (read-only).
//   0     frame 0: B&W 2×2 grid of day-1 misery: Aries face-down in tissues, Leo staring at old photos, Libra typing to
//         the ex, Taurus finishing a whole tub of ice cream; hook "Heartbroken? | *Wait for the free gift.*"
//   0.55  scratch + freeze. 2.65 "There’s GOT to be a better way!"   6.0 colour: INTRODUCING… THE BREAKUP RECOVERY KIT
//   7     ② THE MUTE BUTTON (Aries mutes their updates for a while: space, not spite)
//   16    ③ THE FRIEND RECALL (Taurus texts the friends it went quiet on; they show up with soup)
//   25    ④ BUT WAIT: THE NEW ROUTINE (Leo’s first good morning walk)
//   34    ⑤ BONUS: THE FEELINGS JOURNAL (Libra writes the text in a journal instead of sending it)
//   43    ⑥ TESTIMONIALS: Pisces sobs through the whole testimonial on air
//   51    ⑦ THE FREE GIFT: 3-2-1… the tag says TIME; everyone cheers.   58.7 last line, eases back into frame 0.
import { makeLongAd, quad } from '../../kfae23/longad.js'
import { star, bubble, drawPhone, chat, hearts, label, block, R, bits, ICON, ICOL, prog, ease, lerp, BONE, INK, YEL, RED, INTER } from '../../kfae01/adkit.js'

function tissues(x, cx, cy) { for (let i = 0; i < 5; i++) block(x, cx - 160 + i * 64, cy + 40 + (i % 2) * 14, 56, 40, '#ffffff', { bw: 4, hi: null }) }
function tub(x, cx, cy) { block(x, cx - 50, cy - 60, 100, 110, '#ff8fb1', { bw: 6 }); R(x, BONE, cx - 40, cy - 54, 80, 20) }
function sun(x, t, cx, cy, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.6); x.fillStyle = YEL; for (let i = 0; i < 8; i++) { x.rotate(Math.PI / 4); x.fillRect(70, -10, 50, 20) } x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.fill(); x.restore() }
function journal(x, cx, cy, lines) { block(x, cx - 190, cy - 140, 380, 280, '#fff8ec', { bw: 7, hi: null }); R(x, '#c45a9a', cx - 190, cy - 140, 24, 280); x.font = `700 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; lines.forEach((l, i) => x.fillText(l, cx - 150, cy - 90 + i * 44)) }
const AD = makeLongAd({
  id: 'kfae24', style: 'pop', key: 'A', seed: 3124, ending: 'loop',
  hook: 'Heartbroken? | *Wait for the free gift.*',
  bundle: 'THE BREAKUP RECOVERY KIT',
  chapters: ['DAY 1'],
  grid: [
    quad('aries', 'FACE-DOWN', { tears: 3, rot: 0.15, prop: (x, t, cx, cy) => tissues(x, cx, cy + 80) }),
    quad('leo', 'OLD PHOTOS', { tears: 1, prop: (x, t, cx, cy) => { for (let i = 0; i < 3; i++) { x.save(); x.translate(cx - 150 + i * 150, cy - 150); x.rotate(0.2 * Math.sin(t * 3 + i)); block(x, -45, -55, 90, 110, BONE, { bw: 5, hi: null }); bits(x, ICON.heart, 0, 0, 5, ICOL); x.restore() } } }),
    quad('libra', 'TYPING TO THE EX', { prop: (x, t, cx, cy) => drawPhone(x, cx + 150, cy - 100, { w: 100, h: 160, rot: 0.2, glow: 1 }) }),
    quad('taurus', 'THE WHOLE TUB', { mood: 'squint', prop: (x, t, cx, cy) => tub(x, cx + 150, cy - 90) }),
  ],
  products: [
    { chapter: 'THE MUTE BUTTON', name: 'THE MUTE|BUTTON', sub: 'space, not spite', icon: 'zz', col: '#3a6cff', col2: '#c9f2ff',
      tip: 'mute their updates for a while. space, not spite.', pisces: 'so MATURE',
      demo(x, t, A) { star(x, t, { sign: 'aries', x: 320, y: 1060, s: 260, mood: A.u > 0.9 ? 'happy' : 'neutral', look: [1, 0], hops: [A.t0 + 0.3, A.t0 + 0.9] })
        drawPhone(x, 760, 960, { w: 360, h: 440, rot: 0.04, screen: (c, W, H) => { c.font = `800 30px ${INTER}`; c.fillStyle = BONE; c.textAlign = 'center'; c.fillText('their updates', W / 2, 90); R(c, A.u > 0.3 ? '#7dffb0' : '#5a5470', W / 2 - 70, 140, 140, 60); R(c, BONE, A.u > 0.3 ? W / 2 + 16 : W / 2 - 66, 146, 50, 48); c.fillStyle = A.u > 0.3 ? '#7dffb0' : BONE; c.fillText(A.u > 0.3 ? 'MUTED' : 'ON', W / 2, 260) } })
        label(x, 'breathe…', 320, 860, { size: 44, col: BONE, k: ease.outBack(prog(t, A.t0 + 0.9, A.t0 + 1.2)) }) },
      cues: [['tick', 0.3, 0.07], ['pop', 0.32, 880, 0.04, 0.3], ['pluck', 0.9, 659.25, 0.03, 0.8, 0]] },
    { chapter: 'THE FRIEND RECALL', name: 'THE FRIEND|RECALL', sub: 'they missed you too', icon: 'heart', col: '#2f9a6a', col2: '#fff1a8',
      tip: 'text the friends you went quiet on. they missed you.', pisces: 'they brought SOUP',
      demo(x, t, A) { star(x, t, { sign: 'taurus', x: 300, y: 1060, s: 240, mood: A.u > 1.0 ? 'happy' : 'neutral', look: [1, 0], hops: [A.t0 + 1.0] })
        bubble(x, t, 330, 830, A.t0 + 0.2, A.t0 + 1.2, 'hey… I miss you guys', { size: 32 })
        const k1 = ease.outBack(prog(t, A.t0 + 0.9, A.t0 + 1.2)), k2 = ease.outBack(prog(t, A.t0 + 1.15, A.t0 + 1.45))
        star(x, t, { sign: 'sagittarius', x: 640, y: 1070, s: 200, pop: k1, mood: 'happy', look: [-1, 0], seed: 7 })
        star(x, t, { sign: 'gemini', x: 840, y: 1070, s: 200, pop: k2, mood: 'happy', look: [-1, 0], seed: 4 })
        bits(x, ICON.mug, 740, 1150, 9, { ...ICOL, H: '#ffb02f' })
        bubble(x, t, 740, 840, A.t0 + 1.4, A.end, 'we brought soup!!', { size: 34, col: '#c9f2d4' }) },
      cues: [['pop', 0.2, 880, 0.04, -0.3], ['pop', 0.9, 1174.66, 0.04, 0.3], ['pop', 1.15, 1318.51, 0.04, 0.3]] },
    { chapter: 'BUT WAIT', name: 'THE NEW|ROUTINE', sub: 'one small habit', icon: 'clock', col: '#ffb02f', col2: '#fff1a8',
      tip: 'add one small new habit. a morning walk counts.', pisces: 'a GOOD morning!!',
      demo(x, t, A) { sun(x, t, 820, lerp(1000, 700, prog(A.u, 0, 2.5)), clamp01(A.u * 2)); R(x, '#2f9a6a', 0, 1230, 1080, 30)
        star(x, t, { sign: 'leo', x: lerp(160, 520, prog(A.u, 0, 4)), y: 1100, s: 240, mood: 'happy', look: [1, -0.3], hops: [0.4, 0.9, 1.4, 1.9, 2.4, 2.9, 3.4].map(d => A.t0 + d) })
        bubble(x, t, lerp(160, 520, prog(A.u, 0, 4)), 870, A.t0 + 1.0, A.end, 'good morning!', { size: 38 }) },
      cues: [['bell', 0.3, 1760, 0.03, 1.0, 0], ['pop', 1.0, 1174.66, 0.04, 0]] },
    { chapter: 'BONUS', name: 'THE FEELINGS|JOURNAL', sub: 'unsent, on purpose', icon: 'envelope', col: '#c45a9a', col2: '#fff1a8',
      tip: 'write the text in a journal. don’t send it.', pisces: 'the GROWTH. the PENMANSHIP.',
      demo(x, t, A) { star(x, t, { sign: 'libra', x: 260, y: 1090, s: 230, mood: A.u > 2.2 ? 'happy' : 'neutral', look: [1, 0.4], hops: [A.t0 + 2.2] })
        const L = ['dear ex,', 'I miss us sometimes.', 'I’m also doing ok.', '— not sending this :)']
        journal(x, 680, 1000, L.slice(0, Math.min(4, Math.floor(A.u * 1.8) + 1)))
        label(x, 'NOT SENT', 680, 820, { size: 40, col: '#7dffb0', k: ease.outBack(prog(t, A.t0 + 2.2, A.t0 + 2.5)), rot: -0.08 }) },
      cues: [['tick', 0.0, 0.04], ['tick', 0.55, 0.04], ['tick', 1.1, 0.04], ['tick', 1.65, 0.04], ['pop', 2.2, 1174.66, 0.04, 0.3]] },
  ],
  callChapter: 'TESTIMONIALS',
  call: ['I muted. I didn’t block in anger!', 'my friends brought SOUP', 'I walk every morning now', 'my journal is SO long', 'I’m ok. I’m really ok.'],
  priceChapter: 'THE FREE GIFT',
  price: 'TIME',
  priceBadge: 'FREE GIFT',
  cast: ['aries', 'taurus', 'leo', 'libra'],
  fine: '*RESULTS TAKE TIME. CRYING IS INCLUDED.',
  last: 'Results take time. | *You’ll still be OK.*',
  burst: ['#ff6fb0', '#ffb02f'],
})
function clamp01(v) { return Math.max(0, Math.min(1, v)) }
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [chat, hearts, RED]
