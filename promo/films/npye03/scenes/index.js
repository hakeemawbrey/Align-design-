// npye03: YOUR SIGN AT THE HOLIDAY PARTY, "Gemini at the holiday party" (16 s vertical trial reel, music: pop · D).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "*Gemini* at the | holiday party:" — Gemini mid-wave, two speech bubbles already up: "hiii!" "omg HI!"
//   2.4–5.2   1 "in *four conversations* at once." Four guests round Gemini; bubbles from every side.
//   5.2       card cut.
//   5.2–8.0   2 "remembers *everyone's* name after." A notepad fills: ARIES (hiking!), LIBRA (new job!),
//             CAPRICORN (the dog!). "how did the new job go?!" Libra melts.
//   8.0–11.6  THE STARS: "Curious is cute. Ask the *follow-up.*"
import { makeEp, R, box, bubble, shadow, sparkles, hearts, hatCells, drawBits, HEART, prog, lerp, ease, INK, BONE, GOLD, PINK, MINT, INTER } from '../../npye01/scenes/kit.js'

const EP = makeEp({
  id: 'npye03', series: 'party', sign: 'gemini', name: 'Gemini', room: { wreathOn: false },
  hook(x, t, S) {
    const { hero, heroHat } = S
    shadow(x, 540, 1125, 250)
    const o = { x: 540, y: 950, s: 280, mood: 'happy', look: [Math.sin(t * 6) > 0 ? 1 : -1, 0], hops: [-0.15, 0.6, 1.2, 1.8], squash: 0.04 * Math.sin(t * 12) }
    hero(x, t, o); heroHat(x, t, o)
    bubble(x, t, 330, 700, -1, 2.35, 'hiii!', { size: 40, tail: 0.5 })
    bubble(x, t, 760, 640, -1, 2.35, 'omg HI!', { size: 40, tail: -0.5 })
    bubble(x, t, 560, 520, 1.0, 2.35, 'you came!!', { size: 36, col: '#fff3b8' })
  },
  hookCues: [['pop', 1.0, 1174.66, 0.035, 0]],
  beats: [
    { caption: 'in *four conversations* at once.',
      draw(x, t, S) {
        const { u, hero, heroHat, guest, dress } = S
        const G4 = [['aries', 230, 900], ['libra', 850, 900], ['capricorn', 300, 1060], ['sagittarius', 790, 1060]]
        G4.forEach(([id, gx, gy], i) => { const g = { x: gx, y: gy, s: 140, mood: 'happy', look: [gx < 540 ? 1 : -1, 0], hops: [S.t0 + 0.2 + i * 0.5], seed: 10 + i }; guest(x, t, id, g); dress(x, t, g, () => hatCells(x, [MINT, GOLD, PINK, BONE][i], INK, 0.1)) })
        const turn = Math.floor(u / 0.45) % 4
        shadow(x, 540, 1110, 230)
        const o = { x: 540, y: 950, s: 240, mood: 'sparkle', look: [[-1, 1, -1, 1][turn], [0, 0, 1, 1][turn]], hops: [0, 0.45, 0.9, 1.35, 1.8, 2.25].map(h => S.t0 + h) }
        hero(x, t, o); heroHat(x, t, o)
        const LN = [['wait, WHAT?', 260, 690], ['no way!', 820, 690], ['tell me EVERYTHING', 560, 520], ['…and THEN?', 560, 640]]
        LN.forEach(([tx, bx, by], i) => bubble(x, t, bx, by, S.t0 + 0.3 + i * 0.45, S.t1, tx, { size: 32, tail: bx < 540 ? 0.4 : -0.4 }))
      },
      pis: { x: 960, y: 760, s: 110 },
      cues: [['pop', 0.3, 880, 0.03, -0.4], ['pop', 0.75, 987.77, 0.03, 0.4], ['pop', 1.2, 1174.66, 0.03, 0], ['pop', 1.65, 1318.51, 0.035, 0]] },
    { caption: 'remembers *everyone’s* name after.',
      draw(x, t, S) {
        const { u, hero, heroHat, guest } = S
        shadow(x, 380, 1110, 220)
        const o = { x: 380, y: 960, s: 240, mood: u < 1.4 ? 'neutral' : 'happy', look: u < 1.4 ? [1, -1] : [1, 0], hops: [S.t0 + 0.1, S.t0 + 1.4] }
        hero(x, t, o); heroHat(x, t, o)
        // the notepad
        x.save(); x.translate(640, 680); x.rotate(0.05)
        box(x, -190, -130, 380, 260, '#fff8e0', { b: 6 })
        for (let i = 0; i < 4; i++) R(x, '#b9d4f0', -170, -86 + i * 56, 340, 3)
        R(x, '#e8344e', -130, -130, 4, 260)
        const NAMES = ['ARIES: hiking!', 'LIBRA: new job!', 'CAP: the dog!']
        x.font = `800 30px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = INK
        NAMES.forEach((n, i) => { if (u > 0.25 + i * 0.35) { x.fillText(n, -112, -64 + i * 56); drawBits(x, HEART, { H: '#ff5c8a' }, 155, -64 + i * 56, 4) } })
        x.restore()
        const g = { x: 760, y: 1000, s: 170, mood: u < 1.6 ? 'wide' : 'heart', look: [-1, 0], hops: [S.t0 + 1.6], seed: 11 }
        guest(x, t, 'libra', g)
        bubble(x, t, 470, 470, S.t0 + 1.35, S.t1, 'how did the new job go?!', { size: 34, tail: -0.4 })
        hearts(x, t, S.t0 + 1.7, 760, 860, { n: 6 })
      },
      cues: [['tick', 0.25, 0.04], ['tick', 0.6, 0.04], ['tick', 0.95, 0.04], ['pop', 1.35, 987.77, 0.035, 0], ['pluck', 1.7, 1174.66, 0.04, 0.5, 0.3], ['pluck', 1.82, 1567.98, 0.035, 0.5, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, heroHat, guest, ok, HOPS } = S
    shadow(x, 430, 1110, 230 * ok); shadow(x, 700, 1110, 170 * ok)
    const o = { x: 430, y: 900, s: 260, pop: ok, mood: 'happy', look: [1, 0], hops: HOPS }
    hero(x, t, o); heroHat(x, t, o)
    guest(x, t, 'libra', { x: 700, y: 950, s: 180, pop: ok, mood: 'happy', look: [-1, 0], hops: [8.6, 9.5, 10.4], seed: 11 })
    bubble(x, t, 700, 740, 8.5, 11.0, 'it went GREAT.', { size: 30, col: '#ffe1f7' })
  },
  last: 'Curious is cute. Ask the *follow-up.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, prog, lerp, ease]
