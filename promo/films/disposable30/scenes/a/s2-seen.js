// S2 · SEEN → GHOSTED. AGAIN. (4.4–11.2). The personal example after the hook: ghosted a1's phone scene
// ("Seen. 3 days ago." → typed-and-deleted "did I do something wrong?" → Theo dissolves → "Ghosted. Again." → the
// thread list greys out), played on a clock that starts at 4.4 and runs 8/6.8 ≈ 1.18× so its 8 s fit 6.8 s.
// a1 wakes from the dark room and goes dark itself, so it slots between s1's cut and s3's fade-up with no pops.
import a1, { cues as a1Cues, A1_END } from './a1-seen.js'

export const S2_START = 4.4, S2_END = 11.2
const K = A1_END / (S2_END - S2_START)
const local = t => (t - S2_START) * K
const global = u => S2_START + u / K

export default async function build(stage) {
  const s = await a1(stage)
  return { ...s, start: S2_START, end: S2_END, update: t => s.update(local(t)) }
}

// cue format: [kind, time, ...] — whoosh durations stretch with the clock too
export const cues = a1Cues.map(c => c[0] === 'whoosh' ? [c[0], global(c[1]), c[2] / K, ...c.slice(3)] : [c[0], global(c[1]), ...c.slice(2)])
