// kdwe13 · Don't Watch This If You're a ___ · "Virgo Ignores Its Own Advice" (18 s vertical, hard cut) · lofi · Bb
//   0      Virgo jabbing a pointer stick at the lens; "VIRGO. | Do *not* zoom in." · scratch + freeze · whip out
//   1.5    on a call, coaching a friend: ♍ "just tell them how you *feel.*" · "honesty is *attractive.*"
//   6.2    whip zoom onto its own phone: a draft to its crush, saved 41 days ago · "Its own draft: | *41 days* old."
//   8.4    deletes it… types it again
//   10.4   "The friend who | *gives* advice." · Pisces sobbing: "take your own *advice!!*"
//   13.3   SEND → Virgo falls over · 15.9 "Great advice. | *Finally* used it." · hard cut at 18
import { dwFilm, tag } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const VI = tag('virgo'), PI = tag('pisces')
const DRAFT = 6.2, DEL = [8.4, 9.2], RETYPE = [9.3, 10.2], PIS = 10.6, SEND = 13.3
const MSG = 'hey. i really like spending time with you. want to get dinner, just us?'
function draftText(t) {
  if (t < DEL[0]) return MSG
  if (t < DEL[1]) return MSG.slice(0, Math.floor(MSG.length * (1 - prog(t, ...DEL))))
  return MSG.slice(0, Math.floor(MSG.length * prog(t, ...RETYPE)))
}
const F = dwFilm({
  id: 'kdwe13', sign: 'virgo', dur: 18, ending: 'cut',
  hook: 'VIRGO.|Do *not* zoom in.', hookOut: 1.3, scratch: 'zooming *in.*',
  lens: { mood: 'squint', look: [0, 0] }, pull: { x: 330, y: 1250, s: 310 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 10.4, cam: [1.05, 560, 1050] },
  ],
  flashes: [SEND],
  shakes: [SEND + 0.5],
  heads: [
    { text: 'Its own draft:|*41 days* old.', at: 6.4, out: [10.0, 10.25], top: 240, size: 90 },
    { text: 'The friend who|*gives* advice.', at: 10.4, out: [12.9, 13.15], top: 250, size: 90 },
    { text: 'Great advice.|*Finally* used it.', at: 15.9, top: 250, size: 96 },
  ],
  boxes: [
    { open: 1.45, close: 6.0, lines: [{ t: 1.6, speaker: VI, text: 'just tell them how you *feel.*', color: '#9fe6b0' }, { t: 3.9, speaker: VI, text: 'honesty is *attractive.*', color: '#9fe6b0' }] },
    { open: 10.9, close: 13.2, lines: [{ t: 11.05, speaker: PI, text: 'take your own *advice!!*', color: '#9fd7ff' }] },
  ],
  pitch: { [VI]: 659.25, [PI]: 1046.5 },
  paint(x, t, K) {
    K.room(x, t, { wall: '#26364a', wall2: '#141e2c', floor: '#2a2e3a', window: true, frame: '#9fe6b0' })
    // a whiteboard of advice
    K.box(x, 520, 820, 460, 300, '#efe6d6', { o: 8 })
    ;['ADVICE FOR FRIENDS:', '1. say how you feel', '2. be kind + clear', '3. just send it'].forEach((l, i) => K.txt(x, l, 545, 860 + i * 58, { size: i ? 26 : 22, align: 'left', color: i ? '#2a3a4a' : K.RED }))
    K.box(x, 200, 1340, 700, 30, '#6a7a8a')
    if (t > PIS) K.pisces(x, t, { x: 820, y: 1220, s: 250, pop: K.pop01(t, PIS, 0.4), look: [-1, 0], tears: 3 })
    if (!K.hide) {
      const fall = ease.outBack(prog(t, SEND + 0.3, SEND + 0.8))
      const mood = t < DRAFT ? 'happy' : t < DEL[0] ? 'wide' : t < SEND ? 'squint' : 'wide'
      K.star(x, t, 'virgo', { x: 330 - fall * 30, y: 1250 + fall * 40, s: 310, mood, look: t < DRAFT ? [1, -0.4] : [0.5, 0.5], seed: 5, rot: -fall * 1.45 })
      if (t < DRAFT) { x.save(); x.translate(460, 1170); x.rotate(0.3); K.box(x, -22, -50, 44, 100, '#1a1236', { o: 3 }); x.restore() }
    }
  },
  over(x, t, K) {
    const k = K.inOut(t, DRAFT, 10.3) + (t > SEND - 1.1 && t < 15.6 ? K.inOut(t, SEND - 1.1, 15.6) : 0)
    if (k <= 0.01) return
    const sent = t > SEND
    K.phone(x, t, {
      X: 560, Y: 930, w: 520, h: 760, pop: clamp(k, 0, 1.2), rot: -0.03, title: sent ? 'CRUSH ♡' : 'DRAFTS', time: '9:14',
      bubbles: sent ? [{ side: 'R', text: MSG, size: 28 }, { side: 'C', text: 'Sent ✓', color: 'rgba(0,0,0,0)', ink: '#9fe6b0', size: 22 }] : [],
      screen: sent ? null : (c, tt, w, h) => {
        K.rrect(c, -w / 2 + 24, -h / 2 + 170, w - 48, 360, 20, '#2c2450')
        K.txt(c, 'to: crush ♡', -w / 2 + 50, -h / 2 + 206, { size: 24, align: 'left', color: '#ff8fb1' })
        // the draft, wrapped
        const s = draftText(tt), words = s.split(' '), rows = []; let cur = ''
        c.font = `700 26px ${K.MONO}`
        for (const wd of words) { const tst = cur ? cur + ' ' + wd : wd; if (c.measureText(tst).width > w - 110 && cur) { rows.push(cur); cur = wd } else cur = tst }
        rows.push(cur + (Math.floor(tt * 3) % 2 ? '|' : ''))
        rows.forEach((r, i) => K.txt(c, r, -w / 2 + 50, -h / 2 + 260 + i * 38, { size: 26, align: 'left', color: '#efe6d6' }))
        K.txt(c, 'saved 41 days ago', -w / 2 + 50, -h / 2 + 500, { size: 20, align: 'left', color: '#bdb3d8' })
        const pressed = tt > SEND - 0.4
        K.rrect(c, -110, h / 2 - 140, 220, 70, 35, pressed ? '#ff3b4e' : '#3a2f5a'); K.txt(c, 'SEND', 0, h / 2 - 104, { size: 30, color: '#fff' })
      },
    })
  },
  cues: [
    ['whoosh', DRAFT - 0.05, 0.3, 0.05], ['pop', DRAFT + 0.2, 523.25, 0.04, 0],
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(DEL[0] + i * 0.1).toFixed(2), 0.03]),
    ...Array.from({ length: 9 }, (_, i) => ['tick', +(RETYPE[0] + i * 0.1).toFixed(2), 0.035]),
    ['pop', PIS + 0.03, 987.77, 0.05, 0.3], ['glitter', PIS, PIS + 1.4],
    ['whoosh', SEND - 0.1, 0.3, 0.06], ['bell', SEND + 0.05, 1567.98, 0.05, 1.4, 0], ['boom', SEND + 0.5, 0.08],
  ],
  music: { style: 'lofi', key: 'Bb', seed: 4113, sections: { drop: 1.42, breakdown: [DRAFT], lift: [SEND] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
