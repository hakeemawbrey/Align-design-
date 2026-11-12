// r2a0395: star_advice, ADVICE ROLLCALL (twelve signs), "What signs need | in a text." (signs3kit social cut,
// music: lofi · G). Ending: lesson.
import { makeFilm, hearts, drawBits, pop01, INK } from '../../signs3kit.js'
import { cam, BITS, RED, ORANGE, GREEN, GREY, CREAM, PINK, GOLD, MINT, LAV, SKYB, BONE, BROWN, DARK } from './gags.js'

/** a voice-note chip with a waveform and a running timer */
function voiceNote(x, cx, cy, k, t, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -60, 380, 120); x.fillStyle = GOLD; x.fillRect(-182, -52, 364, 104)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-160, -24); x.lineTo(-120, 0); x.lineTo(-160, 24); x.fill()
  for (let i = 0; i < 16; i++) { const h = 10 + 30 * Math.abs(Math.sin(i * 1.7 + t * 6)); x.fillRect(-100 + i * 13, -h / 2, 8, h) }
  x.restore()
  const s = Math.min(544, Math.floor(lt * 230)), mm = Math.floor(s / 60), ss = String(s % 60).padStart(2, '0')
  if (k > 0.5) { x.save(); x.fillStyle = BONE; x.font = `700 40px 'Space Mono', monospace`; x.textAlign = 'center'; x.fillText(`${mm}:${ss} / 9:04`, cx, cy + 130); x.restore() }
}

const CAMEOS = [
  cam('aries', 'Reply fast. | *They’re already typing.*', { mood: 'sparkle', hops: [0.5, 1.0] }, [
    ['bubble', 770, 680, lt => 'typing' + '.'.repeat(1 + Math.floor(lt * 4) % 3), 0.3, { size: 54, col: RED, tail: 'bl' }],
    ['label', 760, 900, 'REPLY: 0.4 SEC', 1.2, { size: 46, bg: GOLD, rot: 0.04, mono: true }],
  ]),
  cam('taurus', 'Ask about dinner. | *Seriously, ask.*', { mood: lt => lt > 1.2 ? 'heart' : 'happy' }, [
    ['bubble', 770, 660, 'what did | you eat?', 0.3, { size: 50, tail: 'bl' }],
    ['bits', 'plate', 800, 980, 20, 0.9, {}],
    ['bits', 'muffin', 800, 920, 12, 1.0, {}],
  ]),
  cam('gemini', 'Send the voice note. | *All nine minutes.*', { mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle' }, [
    ['fn', (x, t, lt, t0) => voiceNote(x, 735, 820, 1.25 * pop01(t, t0 + 0.2, 0.3, 2), t, lt)],
  ]),
  cam('cancer', '“Home safe?” | *means everything.*', { mood: 'heart' }, [
    ['bubble', 770, 680, 'home safe?', 0.3, { size: 60, col: PINK, tail: 'bl' }],
    ['bubble', 800, 900, 'yes ♡', 1.1, { size: 54, col: MINT, tail: 'br' }],
    ['hearts', 790, 1000, 1.3, { n: 5 }],
  ]),
  cam('leo', 'Compliments. | *Specific ones.*', { mood: 'sparkle', hops: [1.1] }, [
    ['bubble', 770, 680, 'your laugh | is iconic', 0.3, { size: 52, col: ORANGE, tail: 'bl' }],
    ['label', 790, 920, 'SCREENSHOTTED', 1.2, { size: 42, bg: GOLD, rot: 0.05, mono: true }],
    ['sparkles', 790, 680, 1.3, { n: 6, R: 200 }],
  ]),
  cam('virgo', 'Clear plans. | *Time, place, done.*', { mood: lt => lt > 1.2 ? 'happy' : 'squint' }, [
    ['bubble', 770, 680, '7 pm. | the park.', 0.3, { size: 54, tail: 'bl' }],
    ['label', 790, 920, 'NO “WE’LL SEE”', 1.1, { size: 42, bg: MINT, rot: -0.04 }],
  ]),
  cam('libra', 'A kind word. | *No mixed signals.*', { mood: lt => lt > 1.2 ? 'heart' : 'happy' }, [
    ['bubble', 770, 680, 'love you. | no notes.', 0.3, { size: 54, col: PINK, tail: 'bl' }],
    ['hearts', 790, 980, 1.1, { n: 5 }],
  ]),
  cam('scorpio', 'Honesty. | *Even the hard parts.*', { mood: lt => lt > 1.3 ? 'heart' : 'neutral' }, [
    ['bubble', 770, 680, 'real talk:', 0.3, { size: 60, col: '#c97bff', tail: 'bl' }],
    ['label', 790, 900, 'TRUST: +1', 1.1, { size: 46, bg: MINT, rot: 0.05, mono: true }],
  ]),
  cam('sagittarius', 'Send the photo. | *Of the view.*', { mood: 'sparkle', hops: [0.6, 1.3], star: { x: 150 }, look: [-1, 0] }, [
    ['frame', 320, 800, 0.2, { text: '', w: 300, h: 220, bg: SKYB }],
    ['fn', (x, t, lt, t0) => {
      const k = pop01(t, t0 + 0.2, 0.3, 2)
      if (k <= 0.5) return
      x.save(); x.translate(320, 800); x.rotate(0.05)
      x.fillStyle = GREEN; x.beginPath(); x.moveTo(-150, 110); x.lineTo(-60, -40); x.lineTo(10, 40); x.lineTo(80, -60); x.lineTo(150, 110); x.fill()
      x.fillStyle = BONE; x.beginPath(); x.moveTo(-80, -10); x.lineTo(-60, -40); x.lineTo(-40, -10); x.fill()
      x.fillStyle = GOLD; x.beginPath(); x.arc(100, -70, 22, 0, Math.PI * 2); x.fill()
      x.restore()
    }],
    ['bubble', 330, 1060, 'wish u were here', 1.1, { size: 40, col: GOLD, tail: 'br' }],
  ]),
  cam('capricorn', '“Proud of you.” | *Just say it.*', { mood: lt => lt < 1.2 ? 'neutral' : 'heart' }, [
    ['bubble', 770, 680, 'proud of | you.', 0.3, { size: 60, col: MINT, tail: 'bl' }],
    ['label', 790, 920, 'SAVED FOREVER', 1.2, { size: 42, bg: GOLD, rot: 0.05, mono: true }],
  ]),
  cam('aquarius', 'A weird link. | *They’ll love it.*', { mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1] }, [
    ['bubble', 770, 680, 'look at | this frog', 0.3, { size: 56, col: SKYB, tail: 'bl' }],
    ['label', 790, 920, '“PERFECT.”', 1.1, { size: 48, bg: GREEN, rot: -0.05 }],
  ]),
  cam('pisces', 'A tiny heart. | *Ruins them, nicely.*', { tears: lt => lt < 1.0 ? 2 : 3, mood: lt => lt < 1.0 ? 'heart' : 'wide', keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0] }, [
    ['bubble', 790, 700, '♡', 0.3, { size: 90, col: PINK, tail: 'bl' }],
    ['label', 790, 920, 'CRYING (GOOD)', 1.1, { size: 42, bg: SKYB, rot: 0.04, mono: true }],
  ]),
]

const F = makeFilm({
  id: 'r2a0395', key: 'G', accent: '#8fe3ff', ending: 'lesson',
  title: 'What signs need | *in a text.*',
  cameos: CAMEOS,
  group: { cap: 'Just text them. | *Seriously.*' },
  lesson: { text: 'Text like you care. | *Because you do.*', chip: 'MESSAGE: SENT' },
  last: {
    text: 'Gemini’s voice note | *is still playing.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
