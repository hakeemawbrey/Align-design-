// kxgne04: STAR TALK GAME NIGHT: FULL GAMES, Ep 4, "Libra vs Capricorn: The Dinner Question" (≈ 115 s vertical,
// music: jazzy · Bb). The feeling: being single at the holiday dinner. Set + timeline: ../../kxgne01/fullgame.js.
// Holiday edition: a long dinner table runs along the front of the stage (plates, a pie, candles), string lights.
//   0.0    frame 0: a card "SO… SEEING ANYONE?" mid-slam into the marquee; Libra mid-gasp, its fork flying; Capricorn
//          frozen mid-sip of water (splash). Hook: "“So… seeing anyone?” *Buzz* in."  0.5 record scratch.
//   10 R1 → Libra · 30 R2 → both · 50 R3 → Capricorn · 70 LIGHTNING (4 each) · 90 FINAL ×2 → both
//   110    8–8, a tie. THE STARS: "One seat. *Zero* apologies."  LOOP: the next guest's card slams back down (frame 0).
import { makeFullGame, drawSlamCard, R, box, INK, BONE, GOLD, RED, GREEN, prog, clamp } from '../../kxgne01/fullgame.js'

function table(x, t) {
  // string lights across the top of the stage
  for (let i = 0; i < 16; i++) {
    const px = 30 + i * 68, py = 322 + 18 * Math.sin((i / 15) * Math.PI)
    const on = (i + Math.floor(t * 3)) % 3 !== 0
    R(x, INK, px - 7, py - 7, 14, 18); R(x, on ? ['#ff8f9f', '#ffd23a', '#9fe6b0', '#7fd0ff'][i % 4] : '#4a3d6a', px - 4, py - 4, 8, 12)
  }
  // the long table along the front of the stage
  R(x, INK, 0, 1326, 1080, 92); R(x, '#b8303f', 0, 1330, 1080, 84); R(x, '#d8475a', 0, 1330, 1080, 10)
  for (let i = 0; i < 12; i++) R(x, '#9a2534', i * 92 + 20, 1344, 46, 6)
  // plates, a pie, candles
  for (const px of [120, 400, 680, 960]) { x.fillStyle = INK; x.beginPath(); x.ellipse(px, 1340, 62, 16, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.ellipse(px, 1338, 54, 12, 0, 0, Math.PI * 2); x.fill() }
  box(x, 500, 1300, 80, 34, '#e0a25a', { b: 5, hi: '#f3c27f' }); for (let i = 0; i < 4; i++) R(x, '#a8642c', 512 + i * 18, 1308, 8, 4)
  for (const px of [300, 780]) { R(x, INK, px - 8, 1270, 16, 64); R(x, BONE, px - 5, 1274, 10, 58); const fl = 4 * Math.sin(t * 13 + px); R(x, '#ffd23a', px - 5 + fl * 0.3, 1252, 10, 16); R(x, '#fff1c8', px - 2, 1258, 4, 8) }
}

const EP = makeFullGame({
  id: 'kxgne04',
  A: { sign: 'libra', stat: 'polite smiles: 40', intro: { mood: 'wide', look: [0, -1], squash: -0.08 } },
  B: { sign: 'capricorn', stat: 'five-year plan: page 3', intro: { mood: 'squint', look: [-0.6, 0] } },
  hook: '“So… seeing anyone?” | *Buzz* in.',
  accent: '#ff8f9f',
  scratch: 'the holiday dinner. *round one.*',
  welcome: 'game night. *dinner edition!*',
  rounds: [
    { prompt: 'you ask if I’m seeing anyone. I say: ___', first: 'B', buzzAt: 1.5,
      a: { text: 'not right now, and I’m really happy! how’s your garden?' },
      b: { text: 'my five-year plan is on page three.', lose: 'squint' },
      point: 'A', gag: 'AUDIENCE: (claps)', host: 'honest, then a *question.* point, Libra!', cam: '(sobbing) ask about the GARDEN' },
    { prompt: 'Your cousin brings a date. You’re solo.', first: 'A',
      a: { text: 'GREEN. happy for them!', flag: 'G' },
      b: { text: 'GREEN. more pie for me.', flag: 'G' },
      point: 'both', gag: 'AUDIENCE: (laughs)', host: 'happy for them, *and* pie. both!', cam: '(sobbing) pie is love' },
    { prompt: 'Someone tries to set you up. At the table.', first: 'B',
      a: { text: 'say yes to be polite. regret it in January.', lose: 'squint' },
      b: { text: 'thank them. maybe later. pass the potatoes.' },
      point: 'B', gag: 'AUDIENCE: (gasps)', host: 'kind *and* clear. point, Capricorn!', cam: '(sobbing) pass the potatoes' },
  ],
  lightning: [
    { prompt: 'Bring a pretend date?', a: { text: 'RED. just bring me.', flag: 'R' }, b: { text: 'RED. too much admin.', flag: 'R' }, point: 'both' },
    { prompt: 'Answer “seeing anyone?” honestly?', a: { text: 'GREEN. no shame.', flag: 'G' }, b: { text: 'GREEN. then dessert.', flag: 'G' }, point: 'both' },
    { prompt: 'Hide in the kitchen all night?', a: { text: 'RED. help with dishes!', flag: 'R' }, b: { text: 'RED. I’ll dry.', flag: 'R' }, point: 'both' },
    { prompt: 'Toast to being single?', a: { text: 'GREEN!! cheers, me.', flag: 'G' }, b: { text: 'GREEN. fiscally sound.', flag: 'G' }, point: 'both' },
  ],
  final: { prompt: 'The youngest cousin whispers: “are you sad you’re single?”', first: 'A',
    a: { text: 'nope. my life’s full. and you’re in it.' },
    b: { text: 'sometimes. mostly no. let’s get dessert.', mood: 'happy' },
    point: 'both', gag: 'AUDIENCE: AWWWW', host: 'honest *and* gentle. double, both!', cam: '(sobbing) the COUSIN' },
  last: 'One seat. *Zero* apologies.',
  talk: 'card-talk-4.png',
  ending: 'loop',
  draw(x, t) {
    table(x, t)
    drawSlamCard(x, t, { at: -0.4, out: [5.5, 5.9], lines: ['SO… SEEING ANYONE?'], size: 80, col: '#ff8f9f', sub: 'AT THE DINNER TABLE' })
    // Libra's fork, flying
    if (t < 2.2) {
      const p = (t + 0.45) / 2.65, px = 250 - 260 * p, py = 980 - 520 * 4 * p * (1 - p) + 200 * p
      x.save(); x.translate(px, py); x.rotate(p * 9)
      R(x, INK, -6, -50, 12, 100); R(x, '#cfd3e6', -3, -46, 6, 92); for (let i = 0; i < 3; i++) { R(x, INK, -14 + i * 11, -76, 8, 30); R(x, '#cfd3e6', -12 + i * 11, -74, 4, 26) }
      x.restore()
    }
    // Capricorn mid-sip: a glass, water splashing out
    if (t < 6.1) {
      const k = clamp(1 - prog(t, 5.8, 6.1))
      x.save(); x.translate(990, 1040); x.scale(k, k); x.rotate(-0.25)
      R(x, INK, -26, -40, 52, 80); R(x, 'rgba(200,230,255,0.75)', -21, -35, 42, 70); R(x, '#7fd0ff', -21, -5, 42, 40)
      x.restore()
      for (let i = 0; i < 7; i++) { const q = ((t * 1.3 + i / 7) % 1); R(x, '#9fd8f6', 960 - 70 * q + i * 6, 990 - 120 * q + 160 * q * q, 9, 12) }
    }
    void GOLD; void RED; void GREEN
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
