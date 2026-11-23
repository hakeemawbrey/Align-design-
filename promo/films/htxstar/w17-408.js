// hst408 · 21 days · POV: you're a Taurus on a Bellaire Blvd food crawl · jazzy
import { ep, C, Y, G, Kp, clamp, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, bellaire, soupPot, glasses, taco, kolache } from './w17.js'

const L = 300, R = 780, M = 540
const steam = (x, t, cx, cy) => { for (let k = 0; k < 4; k++) { const ph = (t * 0.6 + k / 4) % 1; x.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(cx - 45 + k * 30, cy - ph * 140); x.quadraticCurveTo(cx - 25 + k * 30, cy - 40 - ph * 140, cx - 45 + k * 30, cy - 80 - ph * 140); x.stroke() } }
const bowl = (x, t, cx, cy) => { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 96, 0, Math.PI); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, 88, 0, Math.PI); x.fill(); x.fillStyle = '#c98e4a'; x.fillRect(cx - 88, cy - 6, 176, 12); steam(x, t, cx, cy - 20) }
const boba = (x, cx, cy) => { box(x, cx - 50, cy - 90, 100, 170, '#e8c8a0', 5); for (let k = 0; k < 8; k++) { x.fillStyle = INK; x.beginPath(); x.arc(cx - 30 + (k % 4) * 20, cy + 50 + Math.floor(k / 4) * 18, 8, 0, Math.PI * 2); x.fill() } box(x, cx + 8, cy - 150, 14, 70, PINK, 3) }
const counter = (x) => { box(x, 60, 1150, 960, 40, '#8a5530', 6) }
const chopsticks = (x, P, id) => { const [cx, cy, s] = P.at(id); x.strokeStyle = '#c98e4a'; x.lineWidth = 8; x.beginPath(); x.moveTo(cx + s * 0.4, cy); x.lineTo(cx + s * 0.62, cy - s * 0.32); x.moveTo(cx + s * 0.44, cy + 8); x.lineTo(cx + s * 0.7, cy - s * 0.24); x.stroke() }
const stop = (n, name) => (x, t, lt) => { bellaire(x, t); const k = Kp(lt, 0.05); if (k > 0) { x.save(); x.translate(M, 470); x.scale(k, k); box(x, -260, -56, 520, 112, '#1c1240', 6); txt(x, `STOP ${n}: ${name}`, 0, 2, { size: 54, col: GOLD, font: MONO, weight: 700 }); x.restore() } }

export const EP = ep(21, {
  hook: "POV: you're a Taurus | 21 days out",
  hookSet: (x, t) => bellaire(x, t),
  hookFront: (x, t, lt, P) => chopsticks(x, P, 'taurus'),
  hookCast: C({ taurus: [[0, L, Y, 270], [1.4, L + 50, Y, 270]], sagittarius: [R, Y, 210] }), hookMood: { taurus: 'heart', sagittarius: 'sparkle' }, hookLook: { taurus: [0, 0] },
  calX: 560, calY: 760, calS: 0.6,
  scenes: [
    { dur: 3.4, set: (x, t) => bellaire(x, t), front: (x, t, lt, P) => chopsticks(x, P, 'taurus'), cast: C({ taurus: [M, Y, 300] }), mood: { taurus: 'happy' }, look: { taurus: [0, 0] },
      lines: [[0.15, 1.6, 'taurus', "you're coming | on the crawl."], [1.9, 1.3, 'taurus', "it's | research."]] },
    { dur: 3.4, set: stop(1, 'PHO'), back: (x, t) => { counter(x); bowl(x, t, 780, 1150) }, cast: C({ taurus: [L, Y, 250] }), mood: { taurus: 'heart' },
      lines: [[0.6, 2.4, 'taurus', "pho. it's 62°. | that's a cold front."]] },
    { dur: 3.6, set: stop(2, 'BOBA'), back: (x, t) => { counter(x); boba(x, 540, 1060) }, cast: C({ gemini: [L - 60, Y, 220], taurus: [R + 40, Y, 240] }), mood: { gemini: 'sparkle', taurus: 'happy' },
      lines: [[0.3, 1.5, 'gemini', 'half sugar, | extra pearls.'], [2.0, 1.4, 'taurus', 'you get one | too.']] },
    { dur: 3.6, set: stop(3, 'HOT POT'), back: (x, t) => { counter(x); x.fillStyle = INK; x.beginPath(); x.arc(540, 1130, 130, 0, Math.PI); x.fill(); x.fillStyle = '#c0302a'; x.beginPath(); x.arc(540, 1130, 118, 0, Math.PI); x.fill(); for (let k = 0; k < 6; k++) { const ph = (t * 2 + k / 6) % 1; x.fillStyle = 'rgba(255,200,150,0.8)'; x.beginPath(); x.arc(450 + k * 36, 1150 - ph * 20, 8 * (1 - ph) + 2, 0, Math.PI * 2); x.fill() } steam(x, t, 540, 1080) },
      cast: C({ sagittarius: [200, Y, 220], taurus: [880, Y, 230] }), mood: { sagittarius: 'wide', taurus: 'wink' },
      lines: [[0.2, 1.4, 'sagittarius', 'another | stop?'], [1.8, 1.6, 'taurus', 'the night is | young, mane.']] },
    { dur: 3.6, set: stop(4, 'SWEETS'), back: (x, t) => { counter(x); for (let k = 0; k < 5; k++) { box(x, 330 + k * 90, 1080, 70, 60, [GOLD, PINK, '#f4e1b0', MINT, '#e8b86a'][k], 4) } },
      cast: C({ taurus: [L, Y, 250], cancer: [R, Y, 230] }), mood: { taurus: 'heart', cancer: 'happy' },
      lines: [[0.2, 1.4, 'taurus', 'dessert | is a stop.'], [1.8, 1.6, 'cancer', 'take some | for your mama.']] },
    { dur: 3.4, set: (x, t) => bellaire(x, t), front: (x, t, lt, P) => glasses(x, P, 'taurus'), cast: C({ taurus: [M, Y, 290] }), mood: { taurus: lt => lt > 1.8 ? 'sleepy' : 'squint' },
      lines: [[0.2, 1.4, 'taurus', 'research done. | conclusion:'], [1.8, 1.3, 'taurus', "I'm still | hungry."]] },
    { dur: 3.6, set: (x, t) => bellaire(x, t), cast: C({ taurus: [M, Y, 300] }), mood: { taurus: 'happy' }, look: { taurus: [0, 0] },
      lines: [[0.15, 1.6, 'taurus', 'a good night | starts with'], [1.9, 1.6, 'taurus', 'a good meal | with your people.']] },
  ],
  stamp: { set: (x, t) => bellaire(x, t), cast: C({ taurus: [L, Y, 240], sagittarius: [R, Y, 210] }), mood: { taurus: 'heart', sagittarius: 'sparkle' }, look: { taurus: [0, 0] },
    lines: [[1.2, 2.2, 'taurus', 'come hungry. | 21 days.']] },
  line: 'Come hungry. Jan 9.', stars: ['taurus', 'gemini', 'sagittarius', 'cancer'],
})
