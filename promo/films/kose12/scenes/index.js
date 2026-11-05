// kose12 — OVERTHINKING SIMULATOR, Ep 12: "Meme in the group chat" (14 s vertical, star_talk, house · C). Hard cut.
//   0.0  FRAME 0: Aries mid-yell at a silent group chat (a meme sent, *chirp*); hook on screen.
//   0.4  record scratch + freeze "it’s been *four minutes.*"  2.0–7.1 three simulations, DELETED.  7.2 MEANWHILE: the
//   friends are all crying laughing (Pisces hardest).  9.6 the replies flood in.  12.4 "Everyone was laughing | too hard to type."
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText } from '../../kose01/scenes/simkit.js'
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
  FRIENDS.forEach((s, i) => { const px = R.x + 130 + i * 220, py = R.y + 380 + (i % 2) * 60; drawSign(x, t, s, { x: px, y: py, s: 190 }, { mood: 'happy', tears: s === 'pisces' ? 3 : 2, squash: 0.12 * Math.max(0, Math.sin(t * 14 + i)), seed: 20 + i }) })
  richText(x, 'too busy *laughing* | to type', R.x + R.w / 2, R.y + R.h - 160, { size: 46, acc: PINK })
}
export const CFG = {
  ep: 12, sign: 'aries', duration: 14, ending: 'cut',
  hook: 'Sent a meme. | Group chat: *silence.*',
  heads: [
    { t: 1.95, text: 'Simulating the | *silence…*', color: GOLD },
    { t: 7.15, text: 'Plot | *twist.*', color: PINK },
    { t: 12.4, text: 'Everyone was laughing | *too hard to type.*', color: GOLD, slam: true, size: 90 },
  ],
  bar: { label: 'Waiting for a laugh…', keys: [[0, 9], [0.4, 9], [2, 14], [7.1, 66], [9.6, 99]], err: [[0, 0.4]], labels: [[0, 'Waiting for a laugh…'], [9.6, 'Replies: too many']] },
  panels: [
    { t0: -1, t1: 1.95, kind: 'custom', draw: (x, t, R) => { header(x, t, R); meme(x, t, R) } },
    { t0: 2.0, t1: 3.7, kind: 'theory', n: 1, of: 3, title: 'They’re *screenshotting* it | to judge me.', size: 52, del: 3.15, scene: { items: [{ sign: 'gemini', x: 0.3, y: 0.7, s: 160, mood: 'squint' }, { sign: 'leo', x: 0.7, y: 0.7, s: 160, mood: 'squint' }] } },
    { t0: 3.7, t1: 5.4, kind: 'theory', n: 2, of: 3, title: 'They left the chat. | *All of them.*', size: 54, del: 4.85, scene: { items: [{ icon: 'ghost', x: 0.35, y: 0.66, cell: 14, bob: 1 }, { icon: 'ghost', x: 0.65, y: 0.68, cell: 14, bob: 1 }] } },
    { t0: 5.4, t1: 7.1, kind: 'theory', n: 3, of: 3, title: 'They made a *new chat.* | Without me.', size: 52, del: 6.55, scene: { items: [{ sign: 'cancer', x: 0.3, y: 0.7, s: 160, mood: 'neutral' }, { sign: 'gemini', x: 0.7, y: 0.7, s: 160, mood: 'neutral' }] } },
    { t0: 7.2, t1: 9.6, kind: 'custom', draw: meanwhile },
    { t0: 9.6, t1: 15, kind: 'chat', title: 'THE GROUP (6)', keep: true, msgs: [
      { at: 9.65, side: 'L', text: 'HAHAHAHA', col: '#bff5cf' }, { at: 9.85, side: 'L', text: 'I’M CRYING', col: '#ffd1e0' },
      { at: 10.05, side: 'L', text: 'the DOG', col: '#cfe9ff' }, { at: 10.25, side: 'L', text: 'why is this so me', col: '#fff1c8' },
      { at: 10.45, side: 'L', text: 'STOP I can’t breathe', col: '#bff5cf' }, { at: 10.65, side: 'L', text: 'framing this', col: '#ffd1e0' },
    ] },
  ],
  says: [
    { t: 0.0, who: 'sign', text: 'HELLO??', d: 0.4 },
    { t: 5.8, who: 'sup', text: 'not a new chat', d: 1.2 },
    { t: 11.0, who: 'sign', text: 'they LOVED it.', d: 1.3 },
  ],
  moods: [[0, 'wide', [0.6, -1]], [2.0, 'wide', [0.4, -1]], [3.7, 'squint', [0.4, -1]], [7.2, 'wide', [0.4, -1]], [9.7, 'sparkle'], [11.2, 'happy']],
  squash: [[0, 0.18], [0.4, 0]], steam: [[0, 0.4], [5.4, 7.1]], panic: [[0, 0.4], [6.6, 7.1]],
  sup: { moods: [[0, 'wide'], [7.4, 'happy']], tears: [[0, 2], [7.4, 3]] },
  fx: [{ t: -0.06, kind: 'whip', from: 1.3 }, { t: 0.4, kind: 'scratch', d: 1.3, caption: 'it’s been *four minutes.*', top: 1470 }, { t: 7.2, kind: 'whip', from: 1.2 }, { t: 9.6, kind: 'shake', d: 0.4 }],
  music: { style: 'house', key: 'C', seed: 812, drop: 1.8, sections: { breakdown: [5.4], lift: [7.2] }, hits: [9.6] },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
