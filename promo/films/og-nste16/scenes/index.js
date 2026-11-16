// og-nste16: the social rework of nste16 "Everyone Paired Off" (static HOOK, outline, until 6.4; crazier Cancer; og kit copy).
// orig: nste16 (23 s vertical, Next 30 b33, lofi · Bb). Kit: ../singlekit.js (og copy of nste01/singlekit.js). No end card.
//   0.0–6.8    HOOK "Friends paired up. | I *hugged the coats.*" End of the party: two couples stroll out the glowing door
//              arm in arm ("bye!! we're a WE now!"), Cancer left at the coat rack: "home to cry in the bath."  Pisces sniffles.
//   6.8        THE STARS: "your friends still *want* you around." / "say what you miss. *out loud.*"
//   13.6       Cancer texts the group: "friend breakfast sat? I already baked 40 muffins" → "YES" "FORTY??" "coming!!".
//   17.4       "Cancer: *thriving.*" Last line: "Ask for the *plan* you want." The film ends on it.
import { makeSingle, room, stringLights, box, R, phone, note, shadow, sparkles, hearts, glow, pop01, prog, lerp, ease, T, INK, GOLD } from '../singlekit.js'

const PARTY = (x, t) => {
  room(x, t, { wall: '#2c1f4e', wall2: '#271b47', floor: '#3b2948', win: null })
  stringLights(x, t, -20, 440, 1100, 450, { n: 16, sag: 60, on: 0.6 })
  // the open door, warm hallway light
  box(x, 760, 760, 260, 660, '#ffd98a', { b: 8 }); x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 890, 1100, 420, 0.2, '255,217,138'); x.restore()
  R(x, '#6b4a2f', 1000, 760, 40, 660)
}
function coatRack(x) { R(x, INK, 120, 900, 14, 520); R(x, INK, 70, 1410, 114, 14); for (const [dx, c] of [[-40, '#e8344e'], [44, '#4f7cd8']]) { R(x, INK, 127 + dx - 30, 930, 60, 150); R(x, c, 127 + dx - 26, 934, 52, 142) } }

function s1(x, t, S) {
  const { u, hero, star } = S
  PARTY(x, t)
  coatRack(x)
  const walk = (d) => lerp(500, 980, ease.inOutQuad(Math.min(1, Math.max(0, (u - d) / 4.5))))
  const pairs = [['leo', 'virgo', 0], ['libra', 'taurus', 1.6]]
  for (const [a, b, d] of pairs) {
    const cx = walk(d - 0.8), k = cx > 950 ? 0 : 1
    if (k) { star(x, t, a, { x: cx, y: 1290, s: 160, mood: 'happy', look: [1, 0], seed: 50 + d * 3, glyph: false, hops: [0.4 + d, 0.9 + d, 1.4 + d] }); star(x, t, b, { x: cx + 110, y: 1290, s: 160, mood: 'heart', look: [-1, 0], seed: 51 + d * 3, glyph: false, hops: [0.6 + d, 1.1 + d] }) }
  }
  hero(x, t, { x: 270, y: 1230, s: 260, mood: u > 3.8 ? 'neutral' : 'happy', look: u > 3.8 ? [0, 1] : [1, 0], hops: [1.0, 3.85] })
}
function s2(x, t, S) {
  const { hero } = S
  PARTY(x, t); coatRack(x)
  x.fillStyle = 'rgba(5,4,12,0.55)'; x.fillRect(0, 420, 1080, 1500)
  hero(x, t, { x: 250, y: 1170, s: 200, mood: t > T.B + 1.6 ? 'happy' : 'neutral', look: [1, -1], hops: [T.A + 0.4, T.B + 1.8] })
  note(x, 790, 1170, 'say what|you miss', { w: 320, h: 150, col: '#ffe27a', rot: 0.05, size: 42, k: pop01(t, T.A + 1.5, 0.3, 2.4) })
  sparkles(x, t, 790, 1170, T.B + 1.3, 8, 180, 1)
}
function s3(x, t, S) {
  const { u, hero } = S
  room(x, t, { wall: '#2a2350', wall2: '#251f48', floor: '#352c4e', win: { x: 120, y: 480, w: 240, h: 260 } })
  phone(x, t, { cx: 740, top: 520, w: 520, h: 780, title: 'the friends', size: 34, rot: 0.03, typing: [S.t0 + 0.75, S.t0 + 1.25],
    msgs: [{ at: S.t0 + 0.4, side: 'R', text: 'friend breakfast sat? I already baked 40 muffins' }, { at: S.t0 + 1.3, side: 'L', text: 'YES' }, { at: S.t0 + 1.9, side: 'L', text: 'FORTY??' }, { at: S.t0 + 2.4, side: 'L', text: 'coming!! bringing jam' }] })
  hero(x, t, { x: 280, y: 1230, s: 270, mood: u > 1.3 ? 'happy' : 'sparkle', look: [1, -0.4], hops: [0.4, 1.35, 1.95, 2.45].map(v => S.t0 + v) })
  hearts(x, t, S.t0 + 1.4, 300, 1080, { n: 6 })
}
function fin(x, t, S) {
  const { hero, ok, u } = S
  shadow(x, 540, 1150, 260 * ok)
  hero(x, t, { x: 540, y: 960, s: 300, pop: ok, mood: u > 1.6 ? 'happy' : 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.6, T.last + 1.5] })
}

const EP = makeSingle({
  id: 'og-nste16', sign: 'cancer', name: 'Cancer',
  h1: 'They still *want* you.', h2: 'Ask *out loud.*',
  lines: ['your friends still *want* you around.', 'say what you miss. *out loud.*'],
  last: 'Ask for the *plan* you want.',
  bubbles: [
    { t0: 1.0, t1: 3.5, x: 640, y: 1110, text: 'bye!! we’re a WE now!', size: 40, tail: 0 },
    { t0: 3.85, t1: 6.6, x: 320, y: 1000, text: 'home to cry in the bath.', size: 40, tail: 0 },
  ],
  pis1: { x: 960, y: 1610, s: 120 }, pis3: { x: 960, y: 1630, s: 110 },
  meter: { x: 450, y: 1500 },
  s1, s2, s3, fin,
  cues: [['pop', 14.0, 880, 0.045, 0.3], ['pop', 14.9, 1174.66, 0.04, 0.3], ['pop', 15.5, 1318.51, 0.04, 0.3], ['pop', 16.0, 1567.98, 0.04, 0.3], ['tick', 14.4, 0.02], ['tick', 14.6, 0.02]],
})
export const HOOK = 'Friends paired up. | I *hugged the coats.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 6.4
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [GOLD]
