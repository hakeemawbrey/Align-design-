// og-ktte22 (og social cut of ktte22): static HOOK (outline) replaces the slammed title; no series bug; no flash; no
// loop (ends on the friends and the confetti); a calm countdown instead of the slam-zoom one; louder cards.
// ktte22: THIS OR THAT: LOVE EDITION, "The Zodiac Votes: Single at Midnight" (~9 s vertical, star advice trial reel,
// house · F). Loops. Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: the 12 signs mid-jump under frozen confetti, a 3-2-1 countdown to midnight starting.
//   SAD vs SPARKLY: 11 signs run to SPARKLY; Pisces alone at SAD, crying.
//   twist: STAY SAD ALONE vs LEAVE EARLY → the friends drop a third card, JOIN THE CONFETTI, and pull Pisces in:
//   all 12 at JOIN THE CONFETTI, happy tears.
//   Last: "Single at midnight. *Never alone.*" Seamless loop back to frame 0.
import { makeTT, confetti, label, prog, ease, GOLD, BONE } from './ttkit.js'

// og (calm): the 3-2-1 countdown drawn in the scene (no 2.6x slam zoom under the hook)
const CD = { at: 0.15, from: 3, gap: 0.38, go: 'MIDNIGHT!', y: 1110 }
function calmCountdown(x, t) {
  const i = Math.floor((t - CD.at) / CD.gap), n = CD.from + 1
  if (i < 0 || i >= n) return
  const lt = t - CD.at - i * CD.gap, a = (1 - ease.inQuad(prog(lt, CD.gap - 0.1, CD.gap))) * Math.min(1, lt / 0.06)
  const txt = i < CD.from ? String(CD.from - i) : CD.go
  label(x, txt, 540, CD.y, { size: i < CD.from ? 260 : 150, col: i < CD.from ? BONE : GOLD, alpha: a, font: "Inter, 'Helvetica Neue', Arial, sans-serif", weight: 800 })
}

const VOTE = [...Array(11).fill('b'), 'a']
const EP = makeTT({
  id: 'og-ktte22', mode: 'crowd',
  hook: 'SINGLE AT MIDNIGHT: | *SAD OR SPARKLY?*', accent: '#f2c75c',
  hookUntil: 3.2,
  r0: -0.3,
  rounds: [
    { a: 'SAD\n(ON PURPOSE)', b: 'SPARKLY\n(TOO MUCH)', ia: 'moon', ib: 'spark', pick: VOTE, d: 3.0, pickAt: 1.4, stagger: 0.04 },
    { a: 'STAY SAD ALONE', b: 'LEAVE EARLY', ia: 'moon', ib: 'house', pick: Array(12).fill('c'), c: { text: 'JOIN THE CONFETTI', ic: 'spark', at: 0.3, tag: 'FRIENDS SAY' }, d: 2.0, pickAt: 0.85, stagger: 0.03 },
  ],
  last: 'Single at midnight. | *Never alone.*',
  ending: 'cut', fin: 2.5, finY: 760,
  mid(x, t, S) {
    calmCountdown(x, t)
    confetti(x, t, -0.6, 540, 1000, { n: 30 })
    confetti(x, t, S.T.realOf(S.T.rounds[0].t0 + 1.35), 790, 900, { n: 34 })
    confetti(x, t, S.T.realOf(S.T.E - 0.2), 540, 760, { n: 40 })
  },
  cues: [...[0, 1, 2].map(i => ['pop', +(CD.at + i * CD.gap + 0.1).toFixed(3), 880, 0.04, 0]), ['bell', +(CD.at + 3 * CD.gap + 0.1).toFixed(3), 1760, 0.03, 0.8, 0], ['glitter', +(CD.at + 3 * CD.gap + 0.1).toFixed(3), +(CD.at + 3 * CD.gap + 0.5).toFixed(3)]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const HOOK = 'Single at midnight: | *sad or sparkly?*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = +EP.T.realOf(EP.HOOK_UNTIL).toFixed(2)
