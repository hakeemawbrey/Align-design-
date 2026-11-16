// og-kgse04: social rework of kgse04 (static HOOK replaces the slammed hook; ends on the last line, no loop; Gemini
// pastes the crush story into mom's chat and the plumber's too). Kit: ./guesskit.js (og copy of ../../kgse01/scenes/guesskit.js).
// Was: kgse04: GUESS THE SIGN, "Same crush story, four chats" (8 s vertical, star_advice trial, funk · A, loop).
//   0.00  frame 0: the silhouette mid-spin, four phones orbiting it, each with "typing…".
//         Hook: "Told the same crush story *four times.*"
//   0.35  whip zoom · COPY · PASTE · PASTE · PASTE, the same message lands in all four chats
//   C1 "two of everything" · C2 "four open chats" · buzz · 3·2·1 · reveal: GEMINI · last line · loop
import { makeGuess, R, phone, bubble, shadow, label, chat, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, CYAN, PINK, MINT, INTER, MONO } from './guesskit.js'

const CHATS = ['bestie', 'mom', 'the group', 'the plumber']
const PASTE = [1.35, 1.85, 2.35, 2.85]
function scr(i, u) {
  return (x, w, h) => {
    R(x, '#1a1634', 0, 0, w, h)
    x.font = `800 17px ${INTER}`; x.fillStyle = CYAN; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(CHATS[i], 10, 16)
    if (u < PASTE[i]) { const d = '•'.repeat(1 + Math.floor(u * 4) % 3); chat(x, d, 10, 40, { size: 16 }) }
    else { chat(x, 'ok so. THEM. again.', w - 8, 38, { me: true, size: 14 }); chat(x, ['OMG go on', 'who??', 'AGAIN?', 'sir, the sink'][i], 8, 80, { size: 14 }) }
  }
}

export const EP = makeGuess({
  id: 'og-kgse04', sign: 'gemini', D: 8, ending: 'loop', brk: 'whip',
  hook: 'Told the same crush story | *four times.*',   // og: unused (static HOOK below)
  clues: ['two of everything', 'told the plumber too'],
  last: 'Pick one friend. | *Call them instead.*',
  draw(x, S) {
    const { t, u, rv } = S
    const spin = u * (rv > 0.5 ? 0.6 : 2.2) + 0.6
    shadow(x, 540, 1240, 300)
    const back = [], front = []
    for (let i = 0; i < 4; i++) { const a = spin + i * Math.PI / 2; (Math.sin(a) < 0 ? back : front).push([i, a]) }
    const ph = ([i, a]) => phone(x, 540 + Math.cos(a) * 330, 960 + Math.sin(a) * 120, { w: 150, h: 230, rot: Math.cos(a) * 0.2, k: 0.8 + 0.2 * Math.sin(a), fn: scr(i, u) })
    back.forEach(ph)
    S.sil({ x: 540, y: 1000, s: 360, mood: rv > 0.5 ? 'happy' : 'wide', look: [Math.cos(spin * 2), 0], hops: [...PASTE, 3.5].filter(h => h < S.R), rot: 0.22 * Math.sin(u * 7) * Math.exp(-u * 0.8), squash: -0.08 * Math.exp(-u * 3) })
    front.forEach(ph)
    PASTE.forEach((p, i) => { const k = pop01(t, p, 0.2, 2.6) * outK(t, [p + 0.4, p + 0.5]); if (k > 0.01) label(x, i ? ['', 'PASTE', 'PASTE AGAIN', 'PASTE?!'][i] : 'COPY · PASTE', [300, 780, 330, 760][i], [700, 690, 1140, 1150][i], { size: 44 * k, col: GOLD, font: INTER, weight: 900, rot: [-0.15, 0.12, 0.1, -0.12][i] }) })
    if (rv > 0.5) bubble(x, t, 540, 700, S.R + 0.3, S.D + 1, 'ok. ONE call. (two max.)', { size: 32 })
  },
  cues: [...PASTE.flatMap((p, i) => [['pop', p, [880, 987.77, 1174.66, 1318.51][i], 0.05, (i % 2 ? 0.3 : -0.3)], ['tick', p + 0.02, 0.05]]), ['whoosh', 0.1, 0.5, 0.03]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Told the same crush | story in *4 chats.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.2
