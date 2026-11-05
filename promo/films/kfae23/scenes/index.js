// kfae23: FAKE AD, "The Overthinker Bundle (the full infomercial)" (60 s long trial reel, funk · E, hard cut). Row: m31.md
//   0     frame 0: B&W 2×2 grid, Virgo drafting, Scorpio scrolling at 2 a.m., Cancer re-reading, Gemini refreshing; hook
//         "Overthinkers: | *wait for the price.*"; chapter 1 THE PROBLEM. 0.55 scratch + freeze. 2.65 "There’s GOT to be
//         a better way!"   6.0 whip into colour: INTRODUCING… THE OVERTHINKER BUNDLE
//   7     ② JUST ASK (Virgo asks what they meant; a sweet reply)
//   16    ③ THE FAR CHARGER (Scorpio’s phone charges across the room; Scorpio sleeps)
//   25    ④ BUT WAIT, THERE’S MORE! A FRIEND ON SPEED DIAL (Cancer calls a friend, laughs)
//   34    ⑤ TONIGHT’S DECK, BONUS (Gemini and its crush flip a talk card: "what made you smile today?")
//   43    ⑥ CALL NOW: Pisces calls in, sobs the testimonial on air
//   51    ⑦ THE PRICE: 3-2-1, the tag scrambles… FREE. Everyone cheers.   58.7 last line, hard cut at 60.
import { makeLongAd, quad } from '../longad.js'
import { star, bubble, drawPhone, chat, hearts, label, block, R, bits, ICON, ICOL, prog, ease, lerp, BONE, INK, YEL, RED, INTER, MONO } from '../../kfae01/adkit.js'

function bed(x, cx, cy) { block(x, cx - 220, cy, 440, 80, '#6a4a8a'); block(x, cx - 200, cy - 50, 120, 50, BONE, { bw: 5 }) }
function talkCard(x, cx, cy, flip, text) {
  const sx = Math.abs(Math.cos(flip * Math.PI)), front = flip > 0.5
  x.save(); x.translate(cx, cy); x.scale(Math.max(0.02, sx), 1)
  block(x, -170, -240, 340, 480, front ? '#fff8ec' : '#3a2d66', { bw: 8, hi: null })
  if (!front) { x.strokeStyle = YEL; x.lineWidth = 6; x.strokeRect(-140, -210, 280, 420); label(x, '?', 0, 0, { size: 140, col: YEL }) }
  else { x.font = `800 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; ['what made', 'you smile', 'today?'].forEach((l, i) => x.fillText(l, 0, -50 + i * 54)); x.font = `700 20px ${MONO}`; x.fillStyle = RED; x.fillText('TALK CARD', 0, -190) }
  x.restore(); void text
}
const AD = makeLongAd({
  id: 'kfae23', style: 'funk', key: 'E', seed: 3123, ending: 'cut',
  hook: 'Overthinkers: | *wait for the price.*',
  bundle: 'THE OVERTHINKER BUNDLE',
  grid: [
    quad('virgo', 'DRAFT #41', { prop: (x, t, cx, cy) => { for (let i = 0; i < 4; i++) bubble(x, t, cx - 160 + i * 100, cy - 150 + 30 * Math.sin(t * 6 + i), -1, 99, ['hey', 'heyy', 'hi!', 'nvm'][i], { size: 26 }) } }),
    quad('scorpio', '2:07 AM', { prop: (x, t, cx, cy) => drawPhone(x, cx + 150, cy - 90, { w: 90, h: 150, rot: 0.3, glow: 1 }) }),
    quad('cancer', 'READ IT 30 TIMES', { tears: 2, prop: (x, t, cx, cy) => drawPhone(x, cx + 150, cy - 90, { w: 90, h: 150, rot: -0.2 }) }),
    quad('gemini', 'REFRESH. REFRESH.', { prop: (x, t, cx, cy) => { x.save(); x.translate(cx + 150, cy - 120); x.rotate(t * 8); label(x, '↻', 0, 0, { size: 90, col: BONE }); x.restore() } }),
  ],
  products: [
    { chapter: 'JUST ASK', name: 'JUST ASK™', sub: 'one honest question', icon: 'bubble', col: '#ff4f6d', col2: '#ffd23a',
      tip: '“hey, what did you mean by that?”', pisces: 'they ASKED!! out LOUD!!',
      demo(x, t, A) { star(x, t, { sign: 'virgo', x: 330, y: 1060, s: 270, mood: A.u > 1.1 ? 'heart' : 'happy', look: [1, 0], hops: [A.t0 + 0.2, A.t0 + 1.1] })
        drawPhone(x, 760, 960, { w: 380, h: 440, rot: 0.04, t, screen: (c, W, H, tt) => chat(c, tt, W, H, [{ side: 'R', text: 'hey, what did you mean by that?', at: A.t0 + 0.2 }, { side: 'L', text: 'that I had the best time with you', at: A.t0 + 1.0 }], { size: 30 }) })
        hearts(x, t, 330, 900, A.t0 + 1.1, { n: 5 }) },
      cues: [['pop', 0.2, 880, 0.04, 0.3], ['pop', 1.0, 1318.51, 0.05, 0.3]] },
    { chapter: 'THE FAR CHARGER', name: 'THE FAR|CHARGER', sub: 'cable reaches the other room', icon: 'zz', col: '#3a6cff', col2: '#c9a6ff',
      tip: 'charge your phone across the room. sleep.', pisces: 'they SLEPT eight whole hours',
      demo(x, t, A) { bed(x, 380, 1150); star(x, t, { sign: 'scorpio', x: 400, y: 1090, s: 240, mood: A.u > 0.6 ? 'sleepy' : 'happy', rot: -1.3 })
        block(x, 250, 1120, 300, 60, '#ff8fb1', { bw: 6 })
        drawPhone(x, 920, 900, { w: 120, h: 200 }); R(x, '#5a5470', 916, 1000, 8, 300); label(x, 'CHARGING', 920, 770, { size: 26, col: '#7dffb0' })
        label(x, '☾', lerp(560, 700, prog(A.u, 0, 5)), lerp(700, 820, prog(A.u, 0, 5)), { size: 100, col: YEL, stroke: null }) },
      cues: [['pluck', 0.5, 659.25, 0.03, 0.8, 0], ['pluck', 0.9, 587.33, 0.03, 0.8, 0]] },
    { chapter: 'BUT WAIT', name: 'A FRIEND ON|SPEED DIAL', sub: 'picks up every time', icon: 'heart', col: '#2f9a6a', col2: '#fff1a8',
      tip: 'spiralling? call a friend, not the crush.', pisces: 'I’M the friend!! call ME!!',
      demo(x, t, A) { star(x, t, { sign: 'cancer', x: 330, y: 1060, s: 260, mood: A.u > 0.9 ? 'happy' : 'neutral', look: [1, 0], hops: [A.t0 + 0.9, A.t0 + 1.4, A.t0 + 1.9] })
        drawPhone(x, 770, 960, { w: 320, h: 440, rot: 0.05, k: ease.outBack(prog(t, A.t0, A.t0 + 0.3)), screen: (c, W, H) => { c.fillStyle = '#7dffb0'; c.font = `800 30px ${INTER}`; c.textAlign = 'center'; c.fillText('BEST FRIEND', W / 2, 80); c.fillStyle = BONE; c.font = `600 24px ${INTER}`; c.fillText('00:4' + Math.min(9, Math.floor(A.u * 2)), W / 2, 120) } })
        bubble(x, t, 760, 680, A.t0 + 0.6, A.end, 'ok first of all, you’re amazing', { size: 32, maxW: 380, col: '#c9f2d4' })
        label(x, 'HA!', 330, 860, { size: 56, col: YEL, k: ease.outBack(prog(t, A.t0 + 1.4, A.t0 + 1.7)) }) },
      cues: [['bell', 0.05, 1318.51, 0.03, 0.4, 0.3], ['pop', 0.6, 880, 0.04, 0.3], ['pop', 1.4, 1174.66, 0.04, -0.3]] },
    { chapter: 'BONUS', name: 'TONIGHT’S|DECK', sub: 'talk cards, face down', icon: 'question', col: '#7a3cff', col2: '#ffd23a',
      tip: 'swap the guessing for one real question.', pisces: 'the CARD. the QUESTION. I can’t',
      demo(x, t, A) { star(x, t, { sign: 'gemini', x: 220, y: 1100, s: 220, mood: A.u > 1.6 ? 'heart' : 'sparkle', look: [1, 0], hops: [A.t0 + 1.6] })
        star(x, t, { sign: 'libra', x: 860, y: 1100, s: 220, mood: A.u > 2.2 ? 'happy' : 'neutral', look: [-1, 0], seed: 8, hops: [A.t0 + 2.2] })
        talkCard(x, 540, 960, clamp01((A.u - 0.6) / 0.6), '')
        bubble(x, t, 860, 830, A.t0 + 2.2, A.end, 'honestly? this.', { size: 36 }) },
      cues: [['whoosh', 0.6, 0.4, 0.04], ['pluck', 1.2, 1567.98, 0.04, 0.5, 0], ['pop', 2.2, 1174.66, 0.04, 0.3]] },
  ],
  call: ['I asked what they meant!', 'I put my phone in the hall!', 'I called my best friend!', 'we played a CARD!!', 'I’m just so PROUD'],
  price: 'FREE',
  priceBadge: 'ALL OF IT',
  cast: ['virgo', 'scorpio', 'cancer', 'gemini'],
  fine: '*NO CREDIT CARD. NO SHIPPING. IT WAS ALL ALREADY YOURS.',
  last: 'Everything in the bundle | *was already yours.*',
  lastSize: 84,
  burst: ['#ff2f8a', '#ff8a2f'],
})
function clamp01(v) { return Math.max(0, Math.min(1, v)) }
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [bits, ICON, ICOL]
