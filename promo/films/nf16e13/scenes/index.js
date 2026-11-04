// nf16e13: MEET THE FAMILY, "The Check-In Word" (35 s vertical, star_advice post, music: lofi · Dm).
// Story 0–30.6, then the shared end card. The series look lives in ../famkit.js (owned by this film).
//   0.0–5.0    HOOK "Before the door opens: | pick a *word.*"  The snowy porch at night. ♋ Cancer mid-reach for the
//              doorbell, ♒ Aquarius hugging a pie. Laughter rattles the door. CANCER: "ok. it gets *loud* in there."
//              AQUARIUS: "how loud?"
//   5.0–11.0   "Ten cousins. | One *very long* hug."  Inside: three little cousins orbit, the dog laps the couch, Aunt ♓
//              Pisces hugs Aquarius and sobs happy tears: "you brought a *PIE!*"  Aquarius, squeezed: "…pie?"  Cancer: "!"
//   11.0–15.6  "The word | was *pie.*"  The quiet kitchen. CANCER: "you good? we can stay here a sec." AQUARIUS: "better.
//              thank you."  Both breathe out (synced squash).
//   15.6       card cut → THE STARS' NOTES: pick a word together · it means check on me, not "we're leaving" · when you
//              hear it, step out together.
//   24.1–30.6  "Back in, | *together.*"  The couch: Aquarius laughing between the cousins, Cancer beside it, Aunt Pisces
//              crying into the pie. THE STARS: "One word. *Two of you.*"
import { makeFamily, bubble, mark, hearts, sparkles, shadow, drawBits, pie, label, puff, R, box, pop01, outK, prog, lerp, clamp, ease, BONE, INK, GOLD, PINK, MINT, SKYB, INTER } from '../famkit.js'

const DOG = ['....BB...', '...BBBB..', 'B..BWBBBB', 'BBBBBBBB.', '.BBBBBBB.', '.BBBBBBB.', '.B.B.B.B.']
function dog(x, t, cx, cy, flip = 1) {
  const run = Math.sin(t * 18) > 0 ? 0 : 3
  drawBits(x, DOG, { B: '#c98a3a', W: INK }, cx, cy - run, 9, { sx: flip })
}
function cousins(x, t, S, cx, cy, rad, n = 3) {
  for (let i = 0; i < n; i++) {
    const a = t * 2.6 + i * (Math.PI * 2 / n)
    const sign = ['aries', 'gemini', 'leo'][i]
    S.cast(x, t, sign, { x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad * 0.35, s: 110, mood: i === 1 ? 'wide' : 'happy', look: [Math.cos(a + 1.6) > 0 ? 1 : -1, 0] })
  }
}

const EP = makeFamily({
  id: 'nf16e13', key: 'Dm',
  cast: {
    you: { sign: 'cancer', role: 'CANCER', acc: { scarf: '#ff8fb1' }, text: '#cfe8ff' },
    them: { sign: 'aquarius', role: 'AQUARIUS', acc: { beanie: '#4f7cd8' }, text: '#bff0ff' },
    aunt: { sign: 'pisces', role: 'AUNT', acc: { glasses: 1, pearls: 1 }, text: '#cfe4ff' },
    aries: { sign: 'aries' }, gemini: { sign: 'gemini' }, leo: { sign: 'leo' },
  },
  beats: [
    { len: 5.0, room: 'porch', roomOpts: { doorX: 560 }, head: 'Before the door opens: | pick a *word.*',
      lines: [{ u: 0.7, who: 'you', text: 'ok. it gets *loud* in there.' }, { u: 3.0, who: 'them', text: 'how loud?' }],
      draw(x, t, S) {
        const u = S.u
        // the doorbell (Cancer mid-reach)
        box(x, 388, 960, 34, 50, '#d8cfc0', { b: 5 }); R(x, u > 0.4 && u < 0.7 ? GOLD : '#c94a5a', 397, 975, 16, 16)
        shadow(x, 255, 1225, 220); shadow(x, 840, 1225, 220)
        S.cast(x, t, 'you', { x: 255, y: 1080, s: 230, mood: u < 2.9 ? 'happy' : 'neutral', look: [1, -0.5], hops: [0.4], squash: u < 0.4 ? -0.06 : 0 })
        const F = S.cast(x, t, 'them', { x: 845, y: 1080, s: 230, mood: u > 3.4 ? 'wide' : 'neutral', look: [-1, 0] })
        pie(x, 845, F.cy + 70, 150)
        // laughter rattling the door
        const words = ['HAHA', 'WHO’S THAT?!', 'HAHAHA']
        words.forEach((w, i) => { const t0 = S.t0 + 1.6 + i * 0.9; bubble(x, t, 560 + [-40, 60, -20][i], 640 - i * 70, t0, t0 + 1.1, w, { size: 30, col: '#ffd98a', tail: 0 }) })
        if (u > 1.6) { const sh = 3 * Math.sin(t * 50) * (Math.sin(t * 3) > 0 ? 1 : 0); R(x, 'rgba(255,217,138,0.2)', 445 + sh, 800, 230, 420) }
        mark(x, t, 845, 870, S.t0 + 3.6, S.t0 + 4.8, '!', SKYB)
      },
      cues: [['pluck', 0.45, 1318.51, 0.035, 0.4, 0.3], ['pluck', 0.55, 987.77, 0.035, 0.4, 0.3], ['pop', 1.6, 880, 0.025, 0], ['pop', 2.5, 987.77, 0.025, 0], ['pop', 3.4, 880, 0.025, 0], ['pop', 3.6, 1567.98, 0.04, 0.3]] },

    { len: 6.0, room: 'living', roomOpts: { couchX: 520 }, head: 'Ten cousins. | One *very long* hug.', pis: false,
      lines: [{ u: 0.5, who: 'aunt', text: 'you brought a *PIE!*' }, { u: 3.5, who: 'them', text: '…*pie?*' }],
      draw(x, t, S) {
        const u = S.u
        // the dog laps the couch
        const dp = ((u * 0.45) % 1)
        dog(x, t, lerp(1100, -60, dp), 1190, -1)
        cousins(x, t, S, 300, 1000, 150)
        // the long hug: Aunt Pisces squeezes Aquarius
        const sq = 0.06 * Math.sin(t * 7)
        shadow(x, 700, 1225, 300)
        const F = S.pisces(x, t, { x: 610, y: 1060, s: 240, mood: 'happy', acc: { glasses: 1, pearls: 1 }, tears: u > 0.5 ? 3 : 2, look: [1, 0] })
        S.cast(x, t, 'them', { x: 800, y: 1075, s: 210, mood: u < 3.4 ? 'wide' : 'squint', look: [0, -1], squash: 0.12 + sq })
        pie(x, 900, 1170, 120)
        hearts(x, t, S.t0 + 0.6, 700, F.cy - 120, { n: 6 })
        // Cancer at the edge: hears the word
        S.cast(x, t, 'you', { x: 140, y: 1150, s: 130, mood: u > 4.2 ? 'wide' : 'happy', look: [1, -0.4], hops: [S.t0 + 4.2] })
        mark(x, t, 140, 1010, S.t0 + 4.2, S.t0 + 5.9, '!', GOLD)
      },
      cues: [['pop', 0.3, 1318.51, 0.04, 0.2], ['glitter', 0.5, 0.9], ['pluck', 3.5, 659.25, 0.03, 0.5, 0.2], ['pop', 4.2, 1760, 0.045, -0.4], ['tick', 4.25, 0.05]] },

    { len: 4.6, room: 'kitchen', roomOpts: { stoveX: 830, sinkX: 230 }, head: 'The word | was *pie.*',
      lines: [{ u: 0.3, who: 'you', text: 'you good? we can stay here a sec.' }, { u: 2.4, who: 'them', text: 'better. *thank you.*' }],
      draw(x, t, S) {
        const u = S.u
        const br = u > 2.0 && u < 3.4 ? 0.1 * Math.sin(Math.PI * prog(u, 2.0, 3.4)) : 0
        S.cast(x, t, 'you', { x: 420, y: 1050, s: 220, mood: 'happy', look: [1, 0], squash: br })
        S.cast(x, t, 'them', { x: 660, y: 1050, s: 220, mood: u > 2.2 ? 'happy' : 'sleepy', look: [-1, 0], squash: br, zzz: false })
        if (u > 2.2) puff(x, t, 660, 900, S.t0 + 2.2, { n: 2, size: 18, col: 'rgba(191,240,255,0.5)' })
        label(x, 'shhh…', 540, 870, { size: 34, col: MINT, alpha: clamp(prog(u, 0.2, 0.6)) * outK(u, [4.2, 4.5]) })
      },
      cues: [['riser', 2.0, 3.0, 0.015], ['bell', 3.0, 1760, 0.02, 0.9, 0]] },

    { len: 8.5, kind: 'notes', pis: { x: 950, y: 1780, s: 130 },
      tips: ['Pick a word *together.*', 'It means *check on me*, not “we’re leaving.”', 'When you hear it, *step out together.*'],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.9, S.t0 + 3.4] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: u > 5.5 ? 'heart' : 'happy', look: [-1, 0], hops: [S.t0 + 5.6] })
        const k = pop01(t, S.t0 + 0.9, 0.3, 2.4)
        if (k > 0.01) bubble(x, t, 680, 1000, S.t0 + 0.9, S.t1 - 0.3, 'pie?', { size: 32, col: '#ffd98a' })
      } },

    { len: 6.5, room: 'living', roomOpts: { couchX: 540 }, head: 'Back in, | *together.*', pis: false,
      lastU: 1.0, last: 'One word. *Two of you.*',
      draw(x, t, S) {
        const u = S.u, ok = S.out
        dog(x, t, 960, 1190, -1)
        S.cast(x, t, 'gemini', { x: 260, y: 1010, s: 120, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.8, S.t0 + 2.4], pop: ok })
        S.cast(x, t, 'leo', { x: 790, y: 1010, s: 120, mood: 'happy', look: [-1, 0], hops: [S.t0 + 1.3], pop: ok })
        S.cast(x, t, 'you', { x: 420, y: 1030, s: 190, mood: 'happy', look: [1, 0], pop: ok })
        const F = S.cast(x, t, 'them', { x: 620, y: 1030, s: 190, mood: u > 0.5 ? 'happy' : 'sparkle', look: [-1, 0], hops: [S.t0 + 0.5, S.t0 + 0.9], pop: ok })
        void F
        bubble(x, t, 620, 820, S.t0 + 0.5, S.t0 + 2.6, 'HAHA', { size: 30, col: '#bff0ff' })
        // Aunt Pisces cries into the pie (top right, by the tree)
        S.pisces(x, t, { x: 880, y: 1180, s: 150, mood: 'happy', acc: { glasses: 1, pearls: 1 }, tears: 3, pop: ok })
        pie(x, 880, 1240, 120, { slice: true })
        sparkles(x, t, 520, 980, S.t0 + 0.4, 10, 220, 2, [GOLD, PINK, BONE])
      },
      cues: [['pop', 0.5, 987.77, 0.03, 0.2], ['pop', 0.9, 1174.66, 0.03, 0.2], ['glitter', 0.4, 0.9]] },
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const STORY_END = EP.STORY_END
void [INTER, ease]
