// kxgne08: STAR TALK GAME NIGHT: FULL GAMES, Ep 8, "Virgo vs Sagittarius: First Date Eve" (≈ 115 s vertical,
// music: lofi · C). The feeling: first-date nerves. Set + timeline: ../../kxgne01/fullgame.js.
//   0.0    frame 0: the marquee is a giant red countdown "FIRST DATE IN 23:59:59"; Virgo mid-panic, its outfit checklist
//          flying out of the clipboard; Sagittarius mid-leap high over its podium. Hook: "First date tomorrow. *Both* panicking."
//   10 R1 → Sag · 30 R2 → both · 50 R3 → both · 70 LIGHTNING (Virgo 4, Sag 3) · 90 FINAL ×2 → both
//   110    8–8, a tie. THE STARS: "Nervous is just *excited* early."  Hard cut.
import { makeFullGame, screamLines, R, box, INK, BONE, RED, MONO, INTER, clamp, prog } from '../../kxgne01/fullgame.js'

function countdownBoard(x, t) {
  if (t >= 6.0) return
  const o = clamp(1 - prog(t, 5.6, 6.0)), s = Math.max(0, Math.floor(t))
  const txt = `23:59:${String(59 - s).padStart(2, '0')}`
  x.save(); x.globalAlpha = o
  R(x, '#12060e', 44, 360, 992, 302)
  x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ff8f9f'; x.fillText('FIRST DATE IN', 540, 418)
  const pulse = 1 + 0.04 * Math.max(0, Math.sin(t * Math.PI * 2))
  x.translate(540, 540); x.scale(pulse, pulse)
  x.font = `700 150px ${MONO}`; x.fillStyle = INK; x.fillText(txt, 6, 6); x.fillStyle = RED; x.fillText(txt, 0, 0)
  x.restore()
}
function checklist(x, t) {
  if (t >= 4) return
  const items = ['outfit 1?', 'outfit 7??', 'topics', 'breath mint', 'backup topics', 'CALM']
  items.forEach((it, i) => {
    const tt = t + 0.8 + i * 0.12, a = -Math.PI / 2 - 0.9 + i * 0.36
    const px = 250 + Math.cos(a) * 380 * tt, py = 1000 + Math.sin(a) * 280 * tt + 150 * tt * tt
    if (py > 1500) return
    x.save(); x.globalAlpha = Math.max(0, 1 - t / 4); x.translate(px, py); x.rotate(Math.sin(tt * 3 + i) * 0.5)
    x.font = `700 24px ${MONO}`; const w = x.measureText(it).width + 40
    box(x, -w / 2, -22, w, 44, BONE, { b: 4 }); R(x, '#4fcf7e', -w / 2 + 8, -6, 12, 12)
    x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(it, -w / 2 + 28, 1)
    x.restore()
  })
}

const EP = makeFullGame({
  id: 'kxgne08',
  A: { sign: 'virgo', stat: 'outfits tried: 7', prop: 'clipboard', propUntil: 10, intro: { mood: 'wide', look: [0, -1], squash: -0.1 } },
  B: { sign: 'sagittarius', stat: 'plans made: 0', intro: { mood: 'sparkle', look: [-0.5, -0.4] },
    dy: t => (t > -0.6 && t < 1.7 ? -300 * Math.sin(Math.PI * (t + 0.6) / 2.3) : 0) },
  hook: 'First date tomorrow. | *Both* panicking.',
  accent: '#ff8f9f',
  scratch: 'twenty-four hours. *zero* chill.',
  welcome: 'game night. *date eve!*',
  rounds: [
    { prompt: 'can’t wait for tomorrow! I ___', first: 'B', buzzAt: 1.4,
      a: { text: 'booked a table. and a backup. and a backup’s backup.', lose: 'squint' },
      b: { text: 'planned NOTHING. we’ll wing it!', mood: 'sparkle', then: { at: 7.6, text: '…ok, booked the place you mentioned.', mood: 'happy' } },
      point: 'B', host: 'it *remembered!* point, Sagittarius!', cam: '(sobbing) it REMEMBERED' },
    { prompt: 'They admit they’re nervous too.', first: 'A',
      a: { text: 'GREEN. so relieved.', flag: 'G' },
      b: { text: 'GREEN. nervous twins!', flag: 'G' },
      point: 'both', gag: 'AUDIENCE: AWWW', host: 'nervous *together.* both score!', cam: '(sobbing) nervous TWINS' },
    { prompt: 'Awkward silence. Minute two.', first: 'B',
      a: { text: 'notes, topic seven: weather.', mood: 'neutral', then: { at: 7.6, text: '…no. ask what made them laugh today.', mood: 'happy' } },
      b: { text: 'ask about their favorite trip.' },
      point: 'both', host: 'curious beats *prepared.* both!', cam: '(sobbing) what made YOU laugh' },
  ],
  lightning: [
    { prompt: 'Rehearse in the mirror?', a: { text: 'GREEN. a little.', flag: 'G' }, b: { text: 'GREEN. sure!', flag: 'G' }, point: 'both' },
    { prompt: 'Show up ten minutes early?', a: { text: 'GREEN. with a snack.', flag: 'G' }, b: { text: 'on time-ish?', flag: 'GR', mood: 'squint' }, point: 'A' },
    { prompt: 'Phone face down all night?', a: { text: 'GREEN. done.', flag: 'G' }, b: { text: 'GREEN. eyes up!', flag: 'G' }, point: 'both' },
    { prompt: 'Say “I had fun” if you did?', a: { text: 'GREEN. out loud.', flag: 'G' }, b: { text: 'GREEN. and mean it.', flag: 'G' }, point: 'both' },
  ],
  final: { prompt: 'Your date knocks over a water glass. They’re mortified.', first: 'A',
    a: { text: 'napkins out. “now we have a story.”' },
    b: { text: 'laugh with them. order another. keep going.', mood: 'happy' },
    point: 'both', gag: 'AUDIENCE: (cheers)', host: 'kind about the *spill.* double, both!', cam: '(sobbing) now they have a STORY' },
  last: 'Nervous is just *excited* early.',
  talk: 'card-talk-6.png',
  ending: 'cut',
  draw(x, t) { countdownBoard(x, t); checklist(x, t); screamLines(x, t, 250, 1040, 2.8, { text: 'EEK!', col: '#9fe6b0', r: 150 }) },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
