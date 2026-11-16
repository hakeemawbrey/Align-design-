// og-kxtre07: social rework of kxtre07. Static HOOK (outline) 0–3.5 replaces the slammed hook, whip, shake, pops and
// promise; kit copy ./xkit.js (og social xkit: no bug, chapter cards, flashes, slams; calm last line; hard cut); captions
// in the top band (after the hook); bubbles moved inside the call window; Pisces clear of the app buttons; no sign glyphs
// in chat text; crazier lines (Gemini decodes a 2019 like, Libra built a 40-slide deck, Cancer's 9-paragraph text).
// (original notes:)
// kxtre07: POV, "POV: You're the Friend Who Gives Advice" (120 s vertical, Trends: Extended ep 7, rows in
// promo/films/month2/m41.md; music: synthwave · F#m). Engine: ../../kxtre01/scenes/xkit.js. No end card; hard cut.
// Second person: YOU are the camera (your phone at the bottom of the frame). Everyone texts you for advice: ♊ Gemini,
// ♎ Libra, ♋ Cancer, ♓ Pisces (a crying voice note about a dog). You're brilliant at it. Your own draft to your own crush
// (♉ Taurus) sits unsent. At midnight Pisces, still crying, asks "who gives YOU advice?" and you finally ask the chat.
//   0.0–3.6   frame 0: four phones slamming into frame at once, notifications dropping; whip + shake
//   1 8:00 PM Gemini · 2 8:20 PM Libra · 3 8:45 PM Cancer · 4 9:10 PM Pisces · 5 THE ADVICE (achievement)
//   6 YOUR CRUSH (the unsent draft) · 7 THE CRACK ("I'm fine", to nobody) · 8 THE TURN (Pisces calls)
//   9 YOU ASK ("ok, my turn. help."): the chat floods in; you send it; "me too." Last: "Advice giver. | *Advice taker, too.*"
import {
  makeEp, star, pisces, room, tag, sfx, hearts, sparkles, confetti, phone, label, glowSpot,
  prog, lerp, clamp, ease, R, box, GOLD, BONE, PINK, INK, MINT, SKYB, RED, INTER, MONO, r3,
} from './xkit.js'

export const HOOK = 'You fix everyone’s | *love life but yours.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5

const ACC = '#ff7eb6'
// a friend on a video call, looking straight at you (the lens)
function callWin(x, t, id, name, o = {}) {
  const { y = 760, s = 330, mood = 'wide', tears = 0, hops } = o
  box(x, 110, y - 330, 860, 600, '#1d1640', { b: 8 })
  glowSpot(x, 540, y, 380, '255,126,182', 0.18)
  x.save(); x.beginPath(); x.rect(110, y - 330, 860, 600); x.clip()
  if (id === 'pisces') pisces(x, t, { x: 540, y: y + 40, s, tears: tears || 3, mood, look: [0, 0], noBox: true, hops })
  else star(x, t, id, { x: 540, y: y + 40, s, mood, look: [0, 0], hops, tears })
  x.restore()
  tag(x, name, 260, y - 290, 1, { bg: BONE, size: 30, rot: -0.03 })
}
// your phone at the bottom of the frame (your thumbs on it)
// og: the phone sits higher (y 1080–1580) so its typing line stays above the app's caption band
function you(x, t, msgs, typing, title = 'YOU', { y = 1330, h = 500 } = {}) {
  phone(x, t, 540, y, { w: 900, h, title, msgs, typing, size: 36 })
  for (const tx of [150, 930]) { box(x, tx - 50, y + h / 2 - 50, 100, 200, '#f2c0a0', { b: 6 }) }
}
function bg(x, t, night = true) { room(x, t, { wall: '#1f1840', wall2: '#261e4c', night, window: false, art: false, lamp: false }) }

function hook(x, t, S) {
  bg(x, t)
  ;[[250, 600, -0.3, '#ffd27a'], [820, 560, 0.25, '#7fd0ff'], [300, 1200, 0.2, '#ff8fb1'], [800, 1250, -0.2, '#9fe6b0']].forEach(([px, py, r, c], i) => {
    x.save(); x.translate(px, py + (i < 2 ? 80 : 0)); x.rotate(r); box(x, -130, -220, 260, 440, '#14102c', { b: 8 }); R(x, c, -100, -60, 200, 80); x.restore()
    label(x, ['help', 'HELP', 'quick q', '???'][i], px, py + (i < 2 ? 80 : 0) + 60, { size: 44, col: c, font: INTER, weight: 800 })
  })
  pisces(x, t, { x: 540, y: 960, s: 200, tears: 3, look: [0, 0] })
  void S
}

const C = []
const ask = (name, stampT, id, label2, q, reply, caption, extra = {}) => ({ name, dur: extra.dur || 13, stamp: stampT, caption, captionAt: 2.8,
  fx: [['notif', { at: 0.3, out: [3.4, 3.7], title: 'texts', body: `${label2}: ${q}`, glyph: extra.glyph || '★' }]],
  bubbles: extra.bubbles || [],
  cues: [...Array.from({ length: 14 }, (_, i) => ['tick', r3(5.2 + i * 0.18), 0.02]), ['pop', 8.4, 1046.5, 0.05, 0], ['glitter', 9.2, 9.8]],
  draw(x, t, S) {
    bg(x, t)
    callWin(x, t, id, label2.toUpperCase(), { mood: S.u > 9.2 ? (extra.endMood || 'happy') : (extra.mood || 'wide'), hops: S.hops(1, 4, 9.2, 9.7), tears: id === 'pisces' ? 3 : 0 })
    if (extra.drawIn) extra.drawIn(x, t, S)
    you(x, t, [{ at: S.at(0.4), me: false, text: q }, ...(S.u > 8.4 ? [{ at: S.at(8.4), me: true, text: reply }] : [])], S.u < 8.4 ? { from: S.at(5.0), to: S.at(8.2), text: reply } : null)
    if (S.u > 9.2) hearts(x, t, S.at(9.2), 540, 600)
    if (id !== 'pisces') pisces(x, t, { x: 860, y: 1100, s: 110, tears: 1, look: [-1, -1], pop: S.w(4, 13) })
  } })
C.push(ask('8:00 PM', '8:00 PM', 'gemini', 'Gemini', 'they liked my story from 2019. at 3am. EXPLAIN', 'it means say hi. one word. hi.', 'Gemini. *again.*', { glyph: '★', bubbles: [{ at: 3.9, end: 7.4, x: 540, y: 580, text: 'is it a SIGN?? from the UNIVERSE??', size: 34 }] }))
C.push(ask('8:20 PM', '8:20 PM', 'libra', 'Libra', 'two people asked me out. I made a 40-slide deck', 'skip to slide 1: who do you light up around?', 'then *Libra.*', { glyph: '★', mood: 'squint',
  drawIn(x, t, S) { const sw = Math.sin(S.u * 3); hearts(x, t, S.at(Math.floor(S.u)), 300 + sw * 40, 700, { n: 2 }); hearts(x, t, S.at(Math.floor(S.u) + 0.5), 780 - sw * 40, 700, { n: 2 }) } }))
C.push(ask('8:45 PM', '8:45 PM', 'cancer', 'Cancer', 'my happy holidays text to my ex is 9 paragraphs', 'send zero paragraphs. you come first.', 'then *Cancer.*', { glyph: '★', mood: 'sparkle' }))
C.push(ask('9:10 PM', '9:10 PM', 'pisces', 'Pisces', 'voice note 14:52 (crying)', 'we are going to see that dog again tomorrow', 'and *Pisces.* crying. about a dog.', { glyph: '★', mood: 'sparkle', endMood: 'happy', dur: 12,
  bubbles: [{ at: 3.9, end: 7.4, x: 540, y: 580, text: 'THE DOG WORE A TINY SCARF. I’M NOT OK.', size: 32, col: '#cfe9ff' }] }))
C.push({ name: 'THE ADVICE', dur: 12, caption: 'you are *brilliant* at this.', captionAt: 2.8,
  fx: [['ach', { at: 8.2, out: [11.2, 11.6], text: 'unpaid therapist *of the year.*', y: 1260 }]],
  cues: [1.0, 2.4, 3.8, 5.2, 6.6].map(v => ['pop', v, 880, 0.05, 0]),
  draw(x, t, S) {
    bg(x, t)
    const tips = ['SAY HOW YOU FEEL', 'BE KIND. BE CLEAR.', 'SLEEP ON IT', 'ASK, DON\'T GUESS', 'HYDRATE. THEN TEXT.']
    tips.forEach((tp, i) => tag(x, tp, 540 + (i % 2 ? 120 : -120), 440 + i * 150, S.w(1 + i * 1.4, 12), { bg: [GOLD, PINK, SKYB, MINT, BONE][i], size: 44, rot: (i % 2 ? 0.05 : -0.05) }))
    pisces(x, t, { x: 850, y: 1300, s: 130, tears: 2, look: [-1, -1], hops: S.hops(8.2) })
    star(x, t, 'gemini', { x: 150, y: 1300, s: 130, mood: 'heart', look: [1, -1], hops: S.hops(8.2, 8.6) })
  } })
C.push({ name: 'YOUR CRUSH', dur: 13, caption: 'your own draft? *unsent. 21 days.*', captionAt: 2.8,
  cues: Array.from({ length: 10 }, (_, i) => ['tick', r3(1 + i * 1.1), 0.03]),
  draw(x, t, S) {
    bg(x, t)
    callWin(x, t, 'taurus', 'TAURUS (CRUSH) · OFFLINE', { mood: 'neutral', s: 260 })
    const days = Math.floor(1 + 20 * prog(S.u, 1, 11))
    tag(x, `DRAFT SAVED · DAY ${days}`, 540, 1080, S.w(1, 13), { bg: GOLD, size: 36 })
    you(x, t, [], { from: S.at(-5), to: S.at(-4), text: 'I like talking to you' }, 'TAURUS')
    pisces(x, t, { x: 860, y: 1100, s: 110, tears: 2, look: [-1, -1], pop: S.w(5, 13) })
  } })
C.push({ name: 'THE CRACK', dur: 12, stamp: '12:04 AM', caption: 'midnight. *“I’m fine.”* to nobody.', captionAt: 2.8,
  cues: Array.from({ length: 9 }, (_, i) => ['tick', r3(3 + i * 0.2), 0.02]),
  draw(x, t, S) {
    R(x, '#0c0a1c', 0, 0, 1080, 1920)
    glowSpot(x, 540, 1400, 600, '127,208,240', 0.2)
    label(x, 'NOTES', 540, 500, { size: 40, col: BONE, font: INTER, weight: 800 })
    you(x, t, [], { from: S.at(3), to: S.at(5), text: "I'm fine." }, 'NOTES · just me')
    for (let i = 0; i < 20; i++) R(x, '#ffffff', (i * 173) % 1080, (i * 97) % 1100, 4, 4)
    pisces(x, t, { x: 860, y: 1000, s: 110, tears: 1, look: [-1, 1], pop: S.w(6, 12), mood: 'sleepy' })
  } })
C.push({ name: 'THE TURN', dur: 13, caption: 'then Pisces *calls you.*', captionAt: 4.0,
  fx: [['call', { at: 0.3, out: [3.0, 3.2], name: 'Pisces', sub: 'incoming call… (crying)', glyph: '★', color: '#9a7be0', answerAt: 2.2 }]],
  bubbles: [{ at: 4.6, end: 8.0, x: 540, y: 580, text: 'are YOU ok though?', size: 40, col: '#cfe9ff' }, { at: 8.0, end: 12.6, x: 540, y: 580, text: 'who gives YOU advice?', size: 40, col: '#cfe9ff' }],
  cues: [['tom', 8.2, 90, { gain: 0.25, decay: 0.3 }]],
  draw(x, t, S) {
    bg(x, t)
    callWin(x, t, 'pisces', 'PISCES', { mood: S.u > 8 ? 'wide' : 'sparkle', s: 360, hops: S.hops(4.6, 8.0) })
    you(x, t, [], null, 'YOU')
    if (S.u > 9) sfx(x, t, '…', 540, 1260, S.at(9), { size: 80, col: BONE, life: 3 })
  } })
C.push({ name: 'YOU ASK', dur: 16, caption: null,
  cues: [...Array.from({ length: 12 }, (_, i) => ['tick', r3(0.6 + i * 0.12), 0.02]), ['pop', 2.2, 783.99, 0.05, 0], ['pop', 3.4, 880, 0.04, -0.4], ['pop', 4.0, 987.77, 0.04, 0.4], ['pop', 4.6, 1046.5, 0.04, -0.4], ['pop', 5.2, 1174.66, 0.04, 0.4],
    ['whoosh', 8.6, 0.3, 0.04], ['pop', 8.8, 1318.51, 0.05, 0], ['bell', 10.4, 1567.98, 0.05, 1.0, 0], ['glitter', 10.4, 11.2]],
  draw(x, t, S) {
    bg(x, t)
    const flood = [['Gemini: SAY IT. I’LL WAIT. (I won’t)', 3.4], ['Libra: I made YOU a deck now', 4.0], ['Cancer: already knitting you a scarf', 4.6], ['Pisces: WE LOVE YOU (sobbing)', 5.2]]
    phone(x, t, 540, 820, { w: 900, h: 640, title: 'THE STARS GROUP CHAT', size: 34, msgs: [{ at: S.at(2.2), me: true, text: 'ok. my turn. help.' }, ...flood.map(([m, a]) => ({ at: S.at(a), me: false, text: m }))], typing: S.u < 2.2 ? { from: S.at(0.6), to: S.at(2.0), text: 'ok. my turn. help.' } : null })
    const sent = S.u > 8.8
    you(x, t, sent ? [{ at: S.at(8.8), me: true, text: 'I like talking to you' }, ...(S.u > 10.4 ? [{ at: S.at(10.4), me: false, text: 'me too.' }] : [])] : [], sent ? null : { from: S.at(-5), to: S.at(-4), text: 'I like talking to you' }, 'TAURUS', { y: 1360, h: 440 })
    if (S.u > 10.4) { confetti(x, t, S.at(10.4), 540, 1200); hearts(x, t, S.at(10.6 + Math.floor((S.u - 10.6) / 1.6) * 1.6), 540, 1150, { n: 7 }) }
    star(x, t, 'taurus', { x: 150, y: 1150, s: 170, pop: S.w(10.6, 16.1), mood: 'heart', look: [1, 0], hops: S.hops(11, 12.2, 13.4, 14.6) })
    pisces(x, t, { x: 850, y: 1150, s: 130, tears: 3, look: [-1, -1], hops: S.hops(5.2, 10.4, 10.9) })
  } })

const EP = makeEp({
  id: 'og-kxtre07', bug: 'POV', lead: 'gemini', accent: ACC, deep: '#b0487a', capTop: 250, cam: { s: 1, cx: 540, cy: 1000, dy: 0 },
  music: { style: 'synthwave', key: 'F#m', seed: 4107, breakdown: [79.6], lift: [91.6] },
  hook: {
    text: 'POV: everyone texts | *you* for advice.', len: 3.6, draw: hook, top: 250, size: 100,
    fx: [], cues: [],   // og (social): no frame-0 whip / shake / pop burst
  },
  chapters: C,
  last: { text: 'Advice giver. | *Advice taker, too.*', at: 14.2, top: 250, size: 90 },
  ending: 'cut',
  hits: [91.6, 115.0],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [sparkles, GOLD, RED, INTER, MONO, INK, PINK, ease]
