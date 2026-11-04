// nhqe03: HOLIDAYS THEN VS NOW, "Gemini's holiday texts." (13 s vertical trial reel, promo/films/next30/b48.md,
// music: chiptune · C). Story 0–10.6, then the shared end card. The format lives in ../../nhqe01/scenes/hqkit.js.
//   THEN   a phone with twelve chats, unread dots everywhere, three typing at once; Gemini spinning. Sticker "*twelve* half-chats."
//   NOW    one call, the timer at 1:12:40 and counting; Gemini laughing on the couch. Sticker "one *long* call."
//   7.9    THE STARS: "One real call beats twelve half-chats."
import { makeHQ, box, R, ink, shadow, glow, phone, bubble, INK, BONE, GOLD, MONO, INTER } from '../../nhqe01/scenes/hqkit.js'

const NAMES = ['mom', 'work chat', 'cousins', 'crush', 'gift swap', 'roommate', 'gym pals', 'aunt', 'party!!', 'best friend', 'neighbours', 'unknown']
function chats(x, t, u) {
  const sc = phone(x, 700, 860, { w: 420, h: 800, rot: 0.05 })
  NAMES.forEach((n, i) => {
    const y = sc.y + 14 + i * 60
    R(x, i % 2 ? '#1c1638' : '#221a44', sc.x, y, sc.w, 56)
    x.font = `700 24px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(n, sc.x + 20, y + 28)
    const unread = (i * 7 + Math.floor(u * 6)) % 12 + 1
    R(x, '#ff5c6a', sc.x + sc.w - 62, y + 12, 44, 32); x.textAlign = 'center'; x.fillStyle = '#fff'; x.font = `700 20px ${MONO}`; x.fillText(String(unread), sc.x + sc.w - 40, y + 29)
    if ([1, 4, 8].includes(i)) for (let d = 0; d < 3; d++) R(x, '#7fd0ff', sc.x + 170 + d * 16, y + 24 + 4 * Math.sin(t * 10 - d), 9, 9)
  })
}

const EP = makeHQ({
  id: 'nhqe03', hook: '*Gemini* holiday texts: | then vs now', accent: '#ffe07a', deep: '#a8741a',
  thenCap: '*twelve* half-chats.', nowCap: 'one *long* call.',
  then(x, t, S) {
    chats(x, t, S.u)
    shadow(x, 280, 1280, 240)
    const spin = Math.sin(t * 8)
    S.star(x, t, 'gemini', { x: 280, y: 1090, s: 250, mood: 'wide', look: [Math.sign(spin), -0.4], squash: 0.05 * spin })
    bubble(x, t, 280, 880, S.split ? -1 : 2.7, 5.0, 'wait who said what', { size: 32, tail: 0 })
  },
  now(x, t, S) {
    glow(x, 540, 1000, 600, 0.6)
    box(x, 160, 1050, 760, 110, '#5b4a8a', { b: 7, hi: '#6e5ca0' }); box(x, 160, 930, 760, 130, '#4b3c78', { b: 7 })
    shadow(x, 520, 1200, 260)
    S.star(x, t, 'gemini', { x: 520, y: 960, s: 270, mood: Math.sin(t * 2) > 0 ? 'happy' : 'sparkle', look: [1, -0.3], hops: [5.6, 6.3, 7.1] })
    // the phone at its ear + the call timer
    x.save(); x.translate(680, 900); x.rotate(0.3); box(x, -34, -70, 68, 140, '#2a2148', { b: 5 }); x.restore()
    const sec = 4360 + Math.floor(S.u)
    const tm = `1:${String(Math.floor(sec / 60) % 60).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`
    box(x, 330, 560, 420, 110, '#14102a', { b: 6 })
    ink(x, 'ON CALL', 540, 590, { size: 26, col: '#9fe6b0', font: MONO }); ink(x, tm, 540, 636, { size: 44, col: BONE, font: MONO })
    bubble(x, t, 520, 760, S.split ? -1 : 5.6, 10.6, 'no wait, tell me EVERYTHING', { size: 32, tail: 0 })
  },
  last: 'One real call beats twelve half-chats.',
  cues: [...[2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7].map((c, i) => ['pop', c, [1318.51, 1567.98, 1174.66, 1760][i % 4], 0.025, (i % 2 ? 0.4 : -0.4)]), ['bell', 5.4, 1046.5, 0.025, 1.0, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void GOLD
