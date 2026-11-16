// og-kose12: social rework of kose12 (Overthinking Simulator, "Meme in the group chat"). Static HOOK (box) 0–2.25 replaces
// the animated hook and the record-scratch; no series bug, no whips/shake, no slam title, crazier Aries; ends on the flood of replies.
// The kit is a local copy (scenes/simkit.js) laid out inside the app's safe zones.
//   0.0  HOOK over Aries yelling at a silent group chat (a meme sent, *chirp*).  2.35–7.1 three simulations, DELETED.
//   7.2 MEANWHILE: the friends are all crying laughing (Pisces hardest).  9.6 the replies flood in.  12.4 "Everyone was laughing | too hard to type."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText } from './simkit.js'
export const HOOK = 'I sent a meme. | 4 minutes: *silence.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.25
const FRIENDS = ['gemini', 'cancer', 'leo', 'pisces']
function meme(x, t, R) {
  // the meme bubble (a pixel dog in a frame + caption), from me, plus crickets
  const w = 460, h = 400, bx = R.x + R.w - 40 - w, by = R.y + 110
  x.fillStyle = INK; x.fillRect(bx - 6, by - 6, w + 12, h + 12); x.fillStyle = GOLD; x.fillRect(bx, by, w, h)
  x.fillStyle = '#9fd2ff'; x.fillRect(bx + 20, by + 20, w - 40, h - 120); icon(x, 'dog', bx + w / 2, by + 150, 22)
  richText(x, 'me pretending | I’m fine', bx + w / 2, by + h - 94, { size: 36, color: INK, shadow: false })
  x.font = `700 34px 'Space Mono', monospace`; x.fillStyle = '#9fe6b0'; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.globalAlpha *= 0.6 + 0.4 * Math.sin(t * 8); x.fillText('* chirp *', R.x + 40, R.y + R.h - 120); x.fillText('* chirp *', R.x + 120, R.y + R.h - 60)
}
function header(x, t, R) { x.fillStyle = 'rgba(255,255,255,0.06)'; x.fillRect(R.x, R.y, R.w, 70); x.font = `700 32px 'Space Mono', monospace`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('THE GROUP (6)', R.x + 30, R.y + 37) }
function meanwhile(x, t, R) {
  richText(x, 'MEANWHILE…', R.x + R.w / 2, R.y + 30, { size: 56, acc: GOLD })
  FRIENDS.forEach((s, i) => { const px = R.x + 120 + i * 200, py = R.y + 260 + (i % 2) * 50; drawSign(x, t, s, { x: px, y: py, s: 170 }, { mood: 'happy', tears: s === 'pisces' ? 3 : 2, squash: 0.12 * Math.max(0, Math.sin(t * 14 + i)), seed: 20 + i }) })
  richText(x, 'too busy *laughing* | to type', R.x + R.w / 2, R.y + R.h - 130, { size: 46, acc: PINK })
}
export const CFG = {
  sign: 'aries', duration: 14, ending: 'cut',
  hook: '',
  heads: [
    { t: 2.3, text: 'Simulating the | *silence…*', color: GOLD },
    { t: 7.15, text: 'Plot | *twist.*', color: PINK },
    { t: 12.4, text: 'Everyone was laughing | *too hard to type.*', color: GOLD, size: 76 },
  ],
  bar: { label: 'Waiting for a laugh…', keys: [[0, 9], [0.4, 9], [2.35, 14], [7.1, 66], [9.6, 99]], err: [[0, 0.4]], labels: [[0, 'Waiting for a laugh…'], [2.35, 'Drafting a war speech…'], [9.6, 'Replies: too many']] },
  panels: [
    { t0: -1, t1: 2.3, kind: 'custom', draw: (x, t, R) => { header(x, t, R); meme(x, t, R) } },
    { t0: 2.35, t1: 3.7, kind: 'theory', n: 1, of: 3, title: 'They’re *screenshotting* it | to a chat ABOUT me.', size: 52, del: 3.15, scene: { items: [{ sign: 'gemini', x: 0.3, y: 0.7, s: 160, mood: 'squint' }, { sign: 'leo', x: 0.7, y: 0.7, s: 160, mood: 'squint' }] } },
    { t0: 3.7, t1: 5.4, kind: 'theory', n: 2, of: 3, title: 'They left the chat. | *All of them.* At once.', size: 54, del: 4.85, scene: { items: [{ icon: 'ghost', x: 0.35, y: 0.66, cell: 14, bob: 1 }, { icon: 'ghost', x: 0.65, y: 0.68, cell: 14, bob: 1 }] } },
    { t0: 5.4, t1: 7.1, kind: 'theory', n: 3, of: 3, title: 'A *new chat.* Name: | “not Aries”.', size: 52, del: 6.55, scene: { items: [{ sign: 'cancer', x: 0.3, y: 0.7, s: 160, mood: 'neutral' }, { sign: 'gemini', x: 0.7, y: 0.7, s: 160, mood: 'neutral' }] } },
    { t0: 7.2, t1: 9.6, kind: 'custom', draw: meanwhile },
    { t0: 9.6, t1: 15, kind: 'chat', title: 'THE GROUP (6)', keep: true, msgs: [
      { at: 9.65, side: 'L', text: 'HAHAHAHA', col: '#bff5cf' }, { at: 9.85, side: 'L', text: 'I’M CRYING', col: '#ffd1e0' },
      { at: 10.05, side: 'L', text: 'the DOG', col: '#cfe9ff' }, { at: 10.25, side: 'L', text: 'why is this so me', col: '#fff1c8' },
      { at: 10.45, side: 'L', text: 'STOP I can’t breathe', col: '#bff5cf' }, { at: 10.65, side: 'L', text: 'framing this', col: '#ffd1e0' },
    ] },
  ],
  says: [
    { t: 0.2, who: 'sign', text: 'HELLO?? I CAN SEE YOU’RE ONLINE.', d: 1.8 },
    { t: 5.8, who: 'sup', text: 'please don’t start a rival chat', d: 1.3 },
    { t: 11.0, who: 'sign', text: 'I KNEW IT. framing my own meme.', d: 1.4 },
  ],
  moods: [[0, 'wide', [0.6, -1]], [2.0, 'wide', [0.4, -1]], [3.7, 'squint', [0.4, -1]], [7.2, 'wide', [0.4, -1]], [9.7, 'sparkle'], [11.2, 'happy']],
  squash: [[0, 0.18], [0.4, 0]], steam: [[0, 0.4], [5.4, 7.1]], panic: [[0, 0.4], [6.6, 7.1]],
  sup: { moods: [[0, 'wide'], [7.4, 'happy']], tears: [[0, 2], [7.4, 3]] },
  fx: [],
  music: { style: 'house', key: 'C', seed: 812, drop: 1.8, sections: { breakdown: [5.4], lift: [7.2] }, hits: [9.6] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
