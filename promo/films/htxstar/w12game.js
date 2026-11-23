// w12 · Houston Star Talk game shows (hst286–hst298). A tiny game-show builder on top of starrace/ep.js:
// gameEp(G) turns a list of beats (open, q, doors, ladder, viewer, win) into ep.js scenes and the sound cues.
// The viewer is always asked to play along and comment an answer. Party facts: only the date (Jan 9).
import { clamp, prog, ease } from '../../src/lib.js'
import { taco } from './kit.js'
import { kolache, klobasnek, partyCard } from './kit.js'
import {
  Kp, BADGE, STING, buzzS, dingS, nopeS, music, lines, studio, bulbs, logo, miniLogo, qcard, podium, micStand, ladder, clockRing, stamp, confetti,
  label, sparkles, pop01, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, box, txt, BRAKE,
} from './w12kit.js'

const r2 = v => Math.round(v * 100) / 100
const HOST = [170, 1250, 180], PY = 1245, PS = 170, PODTOP = 1300

export function gameEp(G) {
  const th = G.th || {}, logoCol = G.logoCol || '#e0306a', pl = G.players || []
  const px = pl.length === 2 ? [520, 820] : pl.length === 1 ? [700] : []
  const cast0 = (extra = {}) => { const c = { [G.host]: [[0, ...HOST]] }; pl.forEach((p, i) => { c[p.id] = [[0, px[i], PY, PS]] }); return { ...c, ...extra } }
  let acc = 0
  const cues = [...STING]
  let score = pl.map(() => 0)
  const scenes = G.beats.map((b, bi) => {
    const t0 = acc; acc += b.dur
    const sc = b.sc ? [...b.sc] : [...score]; const prev = [...score]; score = sc
    const buzzAt = b.buzz ? b.buzz[0] : null, who = b.buzz ? b.buzz[1] : null
    if (buzzAt != null) cues.push(buzzS(r2(t0 + buzzAt)))
    if (b.reveal) cues.push((b.pick == null || b.pick[0] === b.reveal[0] ? dingS : nopeS)(r2(t0 + b.reveal[1])))
    if (b.k === 'win') cues.push(['riser', r2(t0), r2(t0 + 0.9)], dingS(r2(t0 + 0.9)))
    const pods = (x, t, lt) => pl.forEach((p, i) => { const show = lt > (b.reveal?.[1] ?? 0) + 0.2 ? sc[i] : prev[i]; podium(x, px[i], PODTOP, { col: p.col, name: p.name, score: show, lit: who === i ? clamp(1 - Math.abs(lt - buzzAt - 0.4) / 0.6) : 0 }) })
    const ok = b.reveal && (b.pick == null || b.pick[0] === b.reveal[0])
    const S = { dur: b.dur, lines: b.lines || [], mood: b.mood || {}, hops: b.hops || {}, look: b.look, stick: b.stick }
    if (b.k === 'open') return { ...S,
      set: (x, t, lt) => { studio(x, t, th); logo(x, t, G.show, G.sub, { cy: 770, s: 0.9, col: logoCol, k: bi === 0 ? 1 : Kp(lt, 0, 0.4) }) },
      back: (x, t, lt) => micStand(x, 540, 1440),
      front: (x, t, lt) => { b.front?.(x, t, lt) },
      cast: { [G.host]: [[0, 540, 1180, 230]], ...Object.fromEntries(pl.map((p, i) => { const e = pl.length === 2 ? [190, 890][i] : 890; return [p.id, [[0, e < 540 ? -170 : 1250, PY + 60, PS], [0.9, e, PY + 60, PS]]] })), ...(b.cast || {}) },
      mood: { [G.host]: 'sparkle', ...(b.mood || {}) }, hops: { [G.host]: [0.02, 0.5, 1.0], ...(b.hops || {}) } }
    if (b.k === 'q') return { ...S,
      set: (x, t, lt) => { studio(x, t, th); miniLogo(x, t, G.show, logoCol); qcard(x, t, lt, { q: b.q, opts: b.opts, at: 0.1, pick: b.pick, reveal: b.reveal, tag: b.tag, cy: 680, col: th.card }); b.prop?.(x, t, lt) },
      back: (x, t, lt) => micStand(x, HOST[0], 1440),
      front: (x, t, lt) => { pods(x, t, lt); if (b.reveal) stamp(x, 900, 560, ok, Kp(lt, b.reveal[1], 0.3) * (1 - clamp((lt - b.reveal[1] - 1.2) / 0.3))); b.front?.(x, t, lt) },
      cast: cast0(b.cast), mood: { [G.host]: 'happy', ...(b.mood || {}) } }
    if (b.k === 'viewer') return { ...S,
      set: (x, t, lt) => { studio(x, t, th); miniLogo(x, t, G.show, logoCol); qcard(x, t, lt, { q: b.q, opts: b.opts, at: 0.1, tag: b.tag || 'YOUR TURN', cy: 680, col: th.card }); clockRing(x, 880, 1230, 80, 1 - clamp(lt / (b.dur - 0.4)), Math.max(0, Math.ceil((b.dur - 0.4 - lt) * 5 / (b.dur - 0.4)))) },
      front: (x, t, lt) => { label(x, 540, 1560, b.cta || 'COMMENT YOUR ANSWER', Kp(lt, 1.0, 0.35), { size: 50, bg: GOLD, rot: -0.03 }); b.front?.(x, t, lt) },
      cast: { [G.host]: [[0, 420, 1270, 240]], ...(b.cast || {}) }, mood: { [G.host]: 'wink', ...(b.mood || {}) }, hops: { [G.host]: [0.1, 1.0], ...(b.hops || {}) } }
    if (b.k === 'ladder') return { ...S,
      set: (x, t, lt) => { studio(x, t, th); miniLogo(x, t, G.show, logoCol); ladder(x, t, 560, 800, G.rungs, Math.floor(b.cur), { k: Kp(lt, 0, 0.35) }); if (b.cur % 1) sparkles(x, t, 560, 800 - 4 * 94 / 2 * 2, t - lt + 0.4, 12, 300, 4) },
      front: (x, t, lt) => { pods(x, t, lt); b.front?.(x, t, lt) },
      cast: cast0(b.cast) }
    if (b.k === 'doors') return { ...S,
      set: (x, t, lt) => { studio(x, t, th); miniLogo(x, t, G.show, logoCol); G.doors.forEach((d, i) => door(x, t, 210 + i * 330, 820, i + 1, d, b.open?.[i] != null ? clamp((lt - b.open[i]) / 0.5) : b.wasOpen?.[i] ? 1 : 0, b.hi === i)) },
      back: (x, t, lt) => micStand(x, HOST[0], 1440),
      front: (x, t, lt) => { pods(x, t, lt); b.front?.(x, t, lt) },
      cast: cast0(b.cast) }
    if (b.k === 'win') return { ...S,
      set: (x, t, lt) => { studio(x, t, th); logo(x, t, G.show, G.sub, { cy: 640, col: logoCol, s: 0.85 }) },
      back: (x, t, lt) => micStand(x, HOST[0], 1440),
      front: (x, t, lt) => { pods(x, t, lt); confetti(x, t, t - lt + 0.8, 50); b.front?.(x, t, lt) },
      cast: cast0(b.cast), mood: { [G.host]: 'heart', ...Object.fromEntries(pl.map(p => [p.id, 'sparkle'])), ...(b.mood || {}) }, hops: { [G.host]: [0.9, 1.4], ...Object.fromEntries(pl.map((p, i) => [p.id, [1.0 + i * 0.1, 1.6 + i * 0.1, 2.2]])), ...(b.hops || {}) } }
    throw new Error('beat ' + b.k)
  })
  return {
    hook: G.hook, badge: BADGE, cues: [...cues, ...(G.cues || [])], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: G.endLine, stars: G.endStars }),
    scenes,
  }
}
/** a game-show door: numbered, swings open to show a prize card */
function door(x, t, cx, cy, n, d, open, hi) {
  const w = 280, h = 420, l = cx - w / 2, tp = cy - h / 2
  box(x, l - 10, tp - 10, w + 20, h + 20, hi ? GOLD : '#3a2a6a', 6)
  // behind the door: the prize
  box(x, l, tp, w, h, '#1c1240', 0); lines(x, d, cx, cy, { size: 34, col: GOLD, lh: 1.25 })
  if (open < 1) { const ww = w * (1 - ease.inOutCubic(open)); box(x, l, tp, ww, h, ['#c0304a', '#2b5fb0', '#1f7a4a'][n - 1], 5); if (ww > 80) { txt(x, String(n), l + ww / 2, cy - 40, { size: 130, col: BONE }); x.fillStyle = GOLD; x.beginPath(); x.arc(l + ww - 30, cy + 40, 14, 0, Math.PI * 2); x.fill() } }
}

// ── the 13 episodes ─────────────────────────────────────────────────────────────────────────────────────────
const P = (id, name, col) => ({ id, name, col })
export const W12G = {
  // hst286 · say the street name right (Kuykendahl, San Felipe, Westheimer, the feeder road)
  hst286: { show: 'SAY IT | RIGHT, H-TOWN', sub: 'THE PRONUNCIATION GAME', host: 'leo', logoCol: '#e0306a', th: { bg1: '#3a0f4a', bg2: '#0c0620', card: '#1c1a5a' },
    hook: 'Can you say | this Houston street?', players: [P('gemini', 'MONTROSE', '#2b5fb0'), P('taurus', 'PEARLAND', '#1f7a4a')],
    music: ['funk', 'E', 4286], endLine: 'Say it right. Jan 9.', endStars: ['leo', 'taurus', 'gemini', 'virgo'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'leo', 'welcome to | the show!'], [1.8, 1.3, 'leo', 'you at home: | play along.']] },
      { k: 'q', dur: 4.8, tag: 'ROUND 1', q: 'How do you say | KUYKENDAHL?', opts: ['KOY-ken-doll', 'KIRK-en-doll', 'KYE-ken-dahl', 'I just say "Kirk"'], buzz: [1.4, 0], pick: [0, 1.6], reveal: [1, 3.0],
        lines: [[1.6, 1.2, 'gemini', 'KOY-ken- | doll!'], [3.3, 1.4, 'leo', 'oh, | Gemini.']], mood: { gemini: lt => lt > 3 ? 'wide' : 'sparkle' } },
      { k: 'q', dur: 4.4, tag: 'ROUND 2', q: 'How do you say | SAN FELIPE?', opts: ['San Fuh-LEE-pay', 'San Fill-uh-pee', 'San Phil', 'Felipe Street'], buzz: [1.3, 1], pick: [1, 1.5], reveal: [1, 2.6], sc: [0, 1],
        lines: [[1.5, 1.1, 'taurus', 'San | Fill-uh-pee.'], [2.8, 1.4, 'leo', 'Pearland | KNOWS.']], mood: { taurus: 'sparkle' } },
      { k: 'q', dur: 4.4, tag: 'ROUND 3', q: 'Westheimer is | famous for its...', opts: ['bumps', 'quiet', 'zero traffic', 'shortness'], buzz: [1.3, 0], pick: [0, 1.5], reveal: [0, 2.5], sc: [1, 1],
        lines: [[1.5, 1.0, 'gemini', 'BUMPS!'], [2.7, 1.5, 'gemini', 'my coffee | felt every one.']], mood: { gemini: 'squint' } },
      { k: 'q', dur: 4.6, tag: 'TIEBREAKER', q: "What's a | FEEDER ROAD?", opts: ['a frontage road', 'a farm road', 'a bike lane', 'a vibe'], buzz: [1.2, 1], pick: [0, 1.4], reveal: [0, 2.6], sc: [1, 2],
        lines: [[1.4, 1.2, 'taurus', 'the road | beside the road.'], [2.8, 1.5, 'leo', 'TAURUS | TAKES IT!']], mood: { taurus: 'heart', gemini: 'eyeroll' } },
      { k: 'viewer', dur: 5.0, q: 'Your turn: how do | YOU say Kuykendahl?', opts: ['KIRK-en-doll', 'KOY-ken-doll', 'I just point', 'I take 290'],
        lines: [[0.6, 1.8, 'leo', 'comment it. | no googling.'], [2.8, 1.6, 'leo', "we'll know."]] },
      { k: 'win', dur: 3.0, sc: [1, 2], lines: [[0.8, 1.9, 'taurus', 'I won a | party ticket?!']] },
    ] },

  // hst287 · kolache or klobasnek (Virgo hosts with a clipboard)
  hst287: { show: 'KNOW YOUR | KOLACHE', sub: 'THE PASTRY QUIZ', host: 'virgo', logoCol: '#c9783a', th: { bg1: '#4a2a12', bg2: '#140a04', card: '#3a1f0c', beam: 'rgba(255,220,170,0.10)' },
    hook: 'Kolache or | klobasnek? | Miss one, you\'re out', players: [P('sagittarius', 'KATY', '#8a3ab0'), P('cancer', 'BELLAIRE', '#c0304a')],
    music: ['chiptune', 'G', 4287], endLine: 'Know your pastry. Jan 9.', endStars: ['virgo', 'cancer', 'sagittarius', 'taurus'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'virgo', 'tonight: | pastry.'], [1.8, 1.3, 'virgo', 'you at home, | keep score.']] },
      { k: 'q', dur: 4.8, tag: 'EXHIBIT A', q: 'This one is | a...', opts: ['klobasnek', 'kolache', 'donut', 'breakfast taco'], buzz: [1.3, 0], pick: [0, 1.5], reveal: [1, 2.9],
        prop: (x, t, lt) => kolache(x, 870, 650, 0.9 * Kp(lt, 0.2)), lines: [[1.5, 1.2, 'sagittarius', 'klobasnek!'], [3.1, 1.5, 'virgo', 'it has | FRUIT in it.']], mood: { sagittarius: lt => lt > 3 ? 'wide' : 'sparkle' } },
      { k: 'q', dur: 4.4, tag: 'EXHIBIT B', q: 'And | this one?', opts: ['kolache', 'klobasnek', 'hot dog', 'sandwich'], buzz: [1.2, 1], pick: [1, 1.4], reveal: [1, 2.5], sc: [0, 1],
        prop: (x, t, lt) => klobasnek(x, 860, 650, 0.9 * Kp(lt, 0.2)), lines: [[1.4, 1.1, 'cancer', 'sausage = | klobasnek.'], [2.7, 1.4, 'virgo', 'thank | you.']], mood: { cancer: 'sparkle' } },
      { k: 'q', dur: 4.4, tag: 'TRICK QUESTION', q: 'Breakfast taco: | flour or corn?', opts: ['flour', 'corn', 'both are right', 'only on Sunday'], buzz: [1.3, 0], pick: [2, 1.5], reveal: [2, 2.6], sc: [1, 1],
        prop: (x, t, lt) => taco(x, 880, 640, Kp(lt, 0.2)), lines: [[1.5, 1.1, 'sagittarius', 'BOTH!'], [2.8, 1.4, 'sagittarius', "I'm | learning."]], mood: { sagittarius: 'heart' } },
      { k: 'q', dur: 4.6, tag: 'FINAL', q: 'Where do you get | them at 7am?', opts: ['a donut shop', 'a gas station', 'a bakery', 'all of the above'], buzz: [1.2, 1], pick: [3, 1.4], reveal: [3, 2.6], sc: [1, 2],
        lines: [[1.4, 1.2, 'cancer', 'all of | the above.'], [2.8, 1.6, 'virgo', "correct. | it's Houston."]], mood: { cancer: 'sparkle', virgo: 'happy' } },
      { k: 'viewer', dur: 5.0, q: 'Settle it: the | sausage one is a...', opts: ['klobasnek', 'kolache', 'pig in a blanket', 'I just eat it'],
        lines: [[0.6, 1.8, 'virgo', 'comment it. | I read them all.'], [2.8, 1.6, 'virgo', 'with my | clipboard.']], mood: { virgo: 'squint' } },
      { k: 'win', dur: 3.0, sc: [1, 2], lines: [[0.8, 1.9, 'virgo', 'Cancer wins. | Katy, study.']] },
    ] },

  // hst288 · Houston measures distance in minutes
  hst288: { show: 'MINUTES, | NOT MILES', sub: 'THE HOUSTON DISTANCE QUIZ', host: 'capricorn', logoCol: '#2b8ab0', th: { bg1: '#0f2a4a', bg2: '#050c18', card: '#10304a', beam: 'rgba(180,230,255,0.10)' },
    hook: 'How far is Katy? | Answer in minutes', players: [P('aries', 'THE HEIGHTS', '#c0304a'), P('libra', 'SUGAR LAND', '#c98e5a')],
    music: ['pop', 'A', 4288], endLine: 'Leave early. Jan 9.', endStars: ['capricorn', 'libra', 'aries', 'pisces'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'capricorn', 'one rule: | no miles.'], [1.8, 1.3, 'capricorn', 'you too, | at home.']] },
      { k: 'q', dur: 4.8, tag: 'ROUND 1', q: 'How far is Katy | from downtown?', opts: ['30 miles', 'one podcast', 'depends on the day', 'a fun drive'], buzz: [1.2, 0], pick: [0, 1.4], reveal: [2, 2.9],
        lines: [[1.4, 1.2, 'aries', '30 MILES!'], [3.1, 1.5, 'capricorn', 'we said | no miles.']], mood: { aries: lt => lt > 3 ? 'wide' : 'sparkle' } },
      { k: 'q', dur: 4.4, tag: 'ROUND 2', q: 'Houston is | an hour from...', opts: ['Galveston', 'Austin', 'Houston', 'the beach'], buzz: [1.2, 1], pick: [2, 1.4], reveal: [2, 2.5], sc: [0, 1],
        lines: [[1.4, 1.1, 'libra', 'Houston.'], [2.7, 1.5, 'libra', 'it is always | Houston.']], mood: { libra: 'sparkle' } },
      { k: 'q', dur: 4.6, tag: 'ROUND 3', q: 'Your date texts | "10 minutes out"', opts: ["they're close", "they're parking", "they haven't left", 'on the Beltway'], buzz: [1.2, 0], pick: [3, 1.4], reveal: [2, 2.7], sc: [0, 1],
        lines: [[1.4, 1.2, 'aries', 'on the | Beltway?'], [2.9, 1.6, 'capricorn', "they haven't | left. it's fine."]], mood: { aries: 'wide' } },
      { k: 'q', dur: 4.4, tag: 'FINAL', q: 'The Grand Parkway | is also...', opts: ['the third loop', 'the short way', 'a scenic trail', 'a feeder'], buzz: [1.1, 1], pick: [0, 1.3], reveal: [0, 2.4], sc: [0, 2],
        lines: [[1.3, 1.1, 'libra', 'the third | loop!'], [2.6, 1.5, 'capricorn', 'Sugar Land | wins.']], mood: { libra: 'heart' } },
      { k: 'viewer', dur: 5.0, q: 'In MINUTES: | you to downtown?', opts: ['under 20', '20 without traffic', '45 on a good day', 'I never go'],
        lines: [[0.6, 1.8, 'capricorn', 'comment your | minutes.'], [2.8, 1.6, 'capricorn', 'not | your miles.']] },
      { k: 'win', dur: 3.0, sc: [0, 2], lines: [[0.8, 1.9, 'aries', 'how far | is Jan 9?']] },
    ] },

  // hst289 · inside the Loop or not (Pisces cries)
  hst289: { show: 'INSIDE | THE LOOP?', sub: 'BUZZ IN OR GET OUT', host: 'aquarius', logoCol: '#7a3ad0', th: { bg1: '#1a0a4a', bg2: '#06021a', card: '#24124a', beam: 'rgba(200,170,255,0.12)' },
    hook: 'Inside the Loop | or not? Buzz in.', players: [P('scorpio', 'EADO', '#6a1f3a'), P('pisces', 'CLEAR LAKE', '#2b8ab0')],
    music: ['synthwave', 'D', 4289], endLine: 'Inside or out, Jan 9.', endStars: ['aquarius', 'pisces', 'scorpio', 'leo'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'aquarius', "it's simple: | in or out."], [1.8, 1.3, 'aquarius', 'you play | too.']] },
      { k: 'q', dur: 4.2, tag: 'ROUND 1', q: 'MONTROSE?', opts: ['INSIDE', 'OUTSIDE'], buzz: [1.0, 0], pick: [0, 1.2], reveal: [0, 2.3], sc: [1, 0],
        lines: [[1.2, 1.0, 'scorpio', 'inside.'], [2.5, 1.4, 'scorpio', 'obviously.']], mood: { scorpio: 'squint' } },
      { k: 'q', dur: 4.8, tag: 'ROUND 2', q: 'THE WOODLANDS?', opts: ['INSIDE', 'OUTSIDE'], buzz: [1.0, 1], pick: [0, 1.2], reveal: [1, 2.4], sc: [1, 0],
        lines: [[1.2, 1.0, 'pisces', 'inside?'], [2.6, 1.0, 'pisces', 'oh no.'], [3.6, 1.1, 'aquarius', "it's its own | bubble."]], mood: { pisces: lt => lt > 2.4 ? 'wide' : 'happy' } },
      { k: 'q', dur: 4.2, tag: 'ROUND 3', q: 'THE HEIGHTS?', opts: ['INSIDE', 'OUTSIDE'], buzz: [1.0, 1], pick: [0, 1.2], reveal: [0, 2.3], sc: [1, 1],
        lines: [[1.2, 1.0, 'pisces', 'INSIDE!'], [2.5, 1.5, 'pisces', 'I got one! | (happy tears)']], mood: { pisces: 'heart' } },
      { k: 'q', dur: 4.2, tag: 'FINAL', q: 'PEARLAND?', opts: ['INSIDE', 'OUTSIDE'], buzz: [1.0, 0], pick: [1, 1.2], reveal: [1, 2.3], sc: [2, 1],
        lines: [[1.2, 1.0, 'scorpio', 'outside.'], [2.5, 1.5, 'scorpio', 'pear-fectly | outside.']], mood: { scorpio: 'wink' } },
      { k: 'viewer', dur: 5.0, q: 'Your place: inside | or outside the Loop?', opts: ['inside', 'outside', 'on the line', 'in Katy, hi'],
        lines: [[0.6, 1.8, 'aquarius', 'comment your | side of town.'], [2.8, 1.6, 'aquarius', 'both are | welcome.']] },
      { k: 'win', dur: 3.0, sc: [2, 1], lines: [[0.8, 1.9, 'pisces', "I'm crying | but happy."]] },
    ] },

  // hst290 · the Houston seasons quiz
  hst290: { show: 'NAME THAT | SEASON', sub: 'HOUSTON WEATHER EDITION', host: 'sagittarius', logoCol: '#e07a1c', th: { bg1: '#4a1a0a', bg2: '#180604', card: '#4a200c', beam: 'rgba(255,200,120,0.12)' },
    hook: 'Name all four | Houston seasons', players: [P('cancer', 'MIDTOWN', '#2b8ab0'), P('leo', 'RIVER OAKS', '#c98e1a')],
    music: ['house', 'F', 4290], endLine: 'Dress for 80. Jan 9.', endStars: ['sagittarius', 'cancer', 'leo', 'aries'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'sagittarius', "it's hot in | here! as usual."], [1.8, 1.3, 'sagittarius', 'play along, | you.']] },
      { k: 'q', dur: 4.6, tag: 'ROUND 1', q: 'October in | Houston is...', opts: ['fall', 'summer', 'pumpkin season', 'sweater weather'], buzz: [1.2, 1], pick: [0, 1.4], reveal: [1, 2.7],
        lines: [[1.4, 1.1, 'leo', 'fall?'], [2.9, 1.5, 'sagittarius', "it's | summer."]], mood: { leo: lt => lt > 2.7 ? 'wide' : 'happy' } },
      { k: 'q', dur: 4.4, tag: 'ROUND 2', q: "It's 55°. | You wear...", opts: ['a light jacket', 'shorts', 'a tank top', 'everything I own'], buzz: [1.2, 0], pick: [3, 1.4], reveal: [3, 2.5], sc: [1, 0],
        lines: [[1.4, 1.1, 'cancer', 'everything | I own.'], [2.7, 1.5, 'sagittarius', 'correct. and | a beanie.']], mood: { cancer: 'sparkle' } },
      { k: 'q', dur: 4.4, tag: 'ROUND 3', q: "It's not the heat, | it's the...", opts: ['wind', 'humidity', 'traffic', 'sun'], buzz: [1.1, 1], pick: [1, 1.3], reveal: [1, 2.4], sc: [1, 1],
        lines: [[1.3, 1.1, 'leo', 'humidity.'], [2.6, 1.5, 'leo', 'my hair | knows.']], mood: { leo: 'squint' } },
      { k: 'q', dur: 4.4, tag: 'FINAL', q: 'Indoor AC | in Houston is...', opts: ['perfect', 'arctic', 'off', 'a myth'], buzz: [1.1, 0], pick: [1, 1.3], reveal: [1, 2.4], sc: [2, 1],
        lines: [[1.3, 1.1, 'cancer', 'ARCTIC.'], [2.6, 1.5, 'cancer', 'sweater lives | in my car.']], mood: { cancer: 'heart' } },
      { k: 'viewer', dur: 5.0, q: "Name Houston's | real seasons", opts: ['summer, not-summer', 'hot and hotter', 'the one cold day', 'pollen, then summer'],
        lines: [[0.6, 1.8, 'sagittarius', 'comment your | four seasons.'], [2.8, 1.6, 'sagittarius', 'all summer | counts.']] },
      { k: 'win', dur: 3.0, sc: [2, 1], lines: [[0.8, 1.9, 'cancer', 'I won! | bring a sweater.']] },
    ] },

  // hst291 · pick a door, get a Houston date
  hst291: { show: 'PICK | A DOOR', sub: 'THE HOUSTON DATE GAME', host: 'gemini', logoCol: '#1f7a4a', th: { bg1: '#0a3a2a', bg2: '#03140e', card: '#0c3a28', beam: 'rgba(190,255,220,0.10)' },
    hook: 'Pick a door. | Get a Houston date.', players: [P('taurus', 'GULFTON', '#c0304a')],
    music: ['jazzy', 'Bb', 4291], endLine: 'Your door: Jan 9.', endStars: ['gemini', 'taurus', 'libra', 'cancer'],
    doors: ['PADDLE | BOATS | at the park', 'BATS AT | SUNSET | Waugh bridge', 'FREE | MUSEUM | THURSDAY'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'gemini', 'three doors, | three dates!'], [1.8, 1.3, 'gemini', 'you pick | one too.']] },
      { k: 'doors', dur: 3.6, hi: null, lines: [[0.5, 1.2, 'taurus', 'door 2. | no, 1.'], [1.9, 1.4, 'taurus', 'no wait...']], mood: { taurus: 'squint' }, look: { taurus: [-1, -1] } },
      { k: 'doors', dur: 4.2, open: [0.4], hi: 0, lines: [[1.0, 1.4, 'gemini', 'paddle boats | at the park!'], [2.6, 1.4, 'taurus', 'my legs are | tired already.']], mood: { taurus: 'eyeroll' } },
      { k: 'doors', dur: 4.2, open: [null, 0.4], wasOpen: [1], hi: 1, lines: [[1.0, 1.4, 'gemini', 'bats at | sunset!'], [2.6, 1.4, 'taurus', 'romantic. | and batty.']], mood: { taurus: 'wide' } },
      { k: 'doors', dur: 4.2, open: [null, null, 0.4], wasOpen: [1, 1], hi: 2, lines: [[1.0, 1.4, 'gemini', 'free museum | Thursday!'], [2.6, 1.4, 'taurus', 'free AND | quiet? yes.']], mood: { taurus: 'heart' } },
      { k: 'viewer', dur: 5.0, q: 'Which door would | YOU pick?', opts: ['1: paddle boats', '2: bats at sunset', '3: museum night', 'all 3, one day'],
        lines: [[0.6, 1.8, 'gemini', 'comment your | door number.'], [2.8, 1.6, 'gemini', 'and who | you take.']] },
      { k: 'win', dur: 3.0, lines: [[0.8, 1.9, 'taurus', 'door 3. | final answer.']] },
    ] },

  // hst292 · finish the phrase like a Houstonian
  hst292: { show: 'FINISH | THE PHRASE', sub: 'SAY IT LIKE A LOCAL', host: 'libra', logoCol: '#c0306a', th: { bg1: '#3a1030', bg2: '#12040e', card: '#3a1232', beam: 'rgba(255,190,220,0.10)' },
    hook: 'Finish this like | a real Houstonian', players: [P('virgo', 'THE HEIGHTS', '#1f7a4a'), P('sagittarius', 'CYPRESS', '#8a3ab0')],
    music: ['lofi', 'Eb', 4292], endLine: 'Finish it Jan 9.', endStars: ['libra', 'virgo', 'sagittarius', 'gemini'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'libra', 'finish the | phrase, y\'all.'], [1.8, 1.3, 'libra', 'you too. | out loud.']] },
      { k: 'q', dur: 4.4, tag: 'ROUND 1', q: "Where'd you go | to ___?", opts: ['college', 'high school', 'church', 'brunch'], buzz: [1.1, 0], pick: [1, 1.3], reveal: [1, 2.4], sc: [1, 0],
        lines: [[1.3, 1.1, 'virgo', 'high school.'], [2.6, 1.5, 'virgo', 'the first | question. always.']], mood: { virgo: 'sparkle' } },
      { k: 'q', dur: 4.6, tag: 'ROUND 2', q: "I'm fixin' ___ | head out.", opts: ['to', 'for', 'a sandwich', 'the car'], buzz: [1.1, 1], pick: [2, 1.3], reveal: [0, 2.6], sc: [1, 0],
        lines: [[1.3, 1.1, 'sagittarius', 'a sandwich?'], [2.8, 1.5, 'libra', "fixin' TO, | babe."]], mood: { sagittarius: lt => lt > 2.6 ? 'wide' : 'happy' } },
      { k: 'q', dur: 4.4, tag: 'ROUND 3', q: 'Mosquitoes are | the city ___', opts: ['pet', 'bird', 'mascot', 'secret'], buzz: [1.1, 0], pick: [1, 1.3], reveal: [1, 2.4], sc: [2, 0],
        lines: [[1.3, 1.1, 'virgo', 'bird.'], [2.6, 1.5, 'virgo', 'I carry | repellent.']], mood: { virgo: 'squint' } },
      { k: 'q', dur: 4.4, tag: 'FINAL', q: 'Is it inside | the ___?', opts: ['Loop', 'house', 'car', 'mall'], buzz: [1.0, 1], pick: [0, 1.2], reveal: [0, 2.3], sc: [2, 1],
        lines: [[1.2, 1.1, 'sagittarius', 'the LOOP!'], [2.5, 1.6, 'sagittarius', 'every first | date asks.']], mood: { sagittarius: 'heart' } },
      { k: 'viewer', dur: 5.0, q: 'Finish it: "Where | are you from ___?"', opts: ['originally', 'exactly', 'today', 'again'],
        lines: [[0.6, 1.8, 'libra', 'comment it, | plus your answer.'], [2.8, 1.6, 'libra', "I'll go first: | originally?"]] },
      { k: 'win', dur: 3.0, sc: [2, 1], lines: [[0.8, 1.9, 'virgo', 'fixin\' to | celebrate.']] },
    ] },

  // hst293 · true or false (Pisces hosts and cries at every answer)
  hst293: { show: 'TRUE | OR FALSE', sub: 'THE HOUSTON LIGHTNING ROUND', host: 'pisces', logoCol: '#2b8ab0', th: { bg1: '#0a2a4a', bg2: '#020a18', card: '#0c2a4a', beam: 'rgba(170,220,255,0.12)' },
    hook: 'True or false: | Houston has winter', players: [P('aries', 'MEMORIAL', '#c0304a'), P('capricorn', 'BELLAIRE', '#4a5a7a')],
    music: ['dreamy', 'C', 4293], endLine: 'True: Jan 9.', endStars: ['pisces', 'aries', 'capricorn', 'cancer'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'pisces', "I'm already | emotional."], [1.8, 1.3, 'pisces', 'you play | too, ok?']] },
      { k: 'q', dur: 4.6, tag: 'TRUE OR FALSE', q: 'The downtown tunnels | are open weekends', opts: ['TRUE', 'FALSE'], buzz: [1.1, 0], pick: [0, 1.3], reveal: [1, 2.5],
        lines: [[1.3, 1.1, 'aries', 'TRUE!'], [2.7, 1.6, 'pisces', 'they close | weekends. (sob)']], mood: { aries: lt => lt > 2.5 ? 'wide' : 'sparkle' } },
      { k: 'q', dur: 4.4, tag: 'TRUE OR FALSE', q: 'Bats live under | a bridge on Waugh', opts: ['TRUE', 'FALSE'], buzz: [1.1, 1], pick: [0, 1.3], reveal: [0, 2.4], sc: [0, 1],
        lines: [[1.3, 1.1, 'capricorn', 'true.'], [2.6, 1.5, 'pisces', "it's so | beautiful."]] },
      { k: 'q', dur: 4.4, tag: 'TRUE OR FALSE', q: 'Crawfish season | starts in January', opts: ['TRUE', 'FALSE'], buzz: [1.0, 0], pick: [0, 1.2], reveal: [0, 2.3], sc: [1, 1],
        lines: [[1.2, 1.1, 'aries', 'TRUE!'], [2.5, 1.5, 'aries', "small ones. | I'm ready."]], mood: { aries: 'heart' } },
      { k: 'q', dur: 4.4, tag: 'TRUE OR FALSE', q: 'Turn signals | are optional', opts: ['TRUE', 'FALSE'], buzz: [1.0, 1], pick: [1, 1.2], reveal: [1, 2.3], sc: [1, 2],
        lines: [[1.2, 1.1, 'capricorn', 'false. | use them.'], [2.5, 1.5, 'pisces', 'thank you. | (sob)']], mood: { capricorn: 'squint' } },
      { k: 'viewer', dur: 5.0, q: 'True or false: | Houston has winter', opts: ['TRUE', 'FALSE', 'one day of it', 'it was a Tuesday'],
        lines: [[0.6, 1.8, 'pisces', 'comment! | be honest.'], [2.8, 1.6, 'pisces', "I'll cry | either way."]] },
      { k: 'win', dur: 3.0, sc: [1, 2], lines: [[0.8, 1.9, 'capricorn', 'Bellaire | wins. dinner?']] },
    ] },

  // hst294 · climb the ladder to the Jan 9 ticket (Houston food)
  hst294: { show: 'CLIMB TO | JAN 9', sub: 'THE HOUSTON FOOD LADDER', host: 'scorpio', logoCol: '#6a1f3a', th: { bg1: '#2a0a1a', bg2: '#0a0208', card: '#2a0c1c', beam: 'rgba(255,170,190,0.10)' },
    hook: 'Five questions | between you | and Jan 9', players: [P('aquarius', 'MONTROSE', '#2b8ab0')],
    rungs: ['A BOBA', 'A CRAWFISH TRAY', 'A RASPA', 'A BRISKET PLATE', 'THE JAN 9 TICKET'],
    music: ['pop', 'Db', 4294], endLine: 'Top rung: Jan 9.', endStars: ['scorpio', 'aquarius', 'taurus', 'sagittarius'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'scorpio', 'five rungs. | one ticket.'], [1.8, 1.3, 'scorpio', 'you climb | with them.']] },
      { k: 'ladder', dur: 2.8, cur: 0, lines: [[0.6, 1.8, 'aquarius', 'boba first. | fine by me.']] },
      { k: 'q', dur: 4.4, tag: 'RUNG 2', q: 'Viet-Cajun crawfish | is a Houston...', opts: ['signature', 'secret', 'myth', 'dessert'], pick: [0, 1.3], reveal: [0, 2.4], sc: [1],
        lines: [[1.3, 1.1, 'aquarius', 'signature.'], [2.6, 1.5, 'scorpio', 'correct. | climb.']] },
      { k: 'q', dur: 4.2, tag: 'RUNG 3', q: 'A raspa is...', opts: ['shaved ice', 'a dance', 'a car part', 'a road'], pick: [0, 1.2], reveal: [0, 2.3], sc: [2],
        lines: [[1.2, 1.1, 'aquarius', 'shaved ice!'], [2.5, 1.4, 'aquarius', 'with chamoy.']], mood: { aquarius: 'sparkle' } },
      { k: 'q', dur: 5.0, tag: 'RUNG 4', q: 'Lemon pepper ___ | is the wing order', opts: ['dry', 'wet', 'mild', 'plain'], pick: [1, 2.8], reveal: [1, 3.8], sc: [3],
        lines: [[0.9, 1.4, 'aquarius', 'phone a | Katy cousin!'], [2.6, 1.0, 'aquarius', 'WET.'], [3.9, 1.0, 'scorpio', 'correct.']], mood: { aquarius: lt => lt < 2.4 ? 'wide' : 'heart' } },
      { k: 'ladder', dur: 3.0, cur: 3.5, lines: [[0.4, 2.2, 'scorpio', 'last rung. | the ticket.']], mood: { scorpio: 'squint' } },
      { k: 'viewer', dur: 5.0, q: 'For the ticket: | flour or corn?', tag: 'FINAL RUNG', opts: ['flour', 'corn', 'both, always', "whatever's hot"],
        lines: [[0.6, 1.8, 'scorpio', 'you decide | this one.'], [2.8, 1.6, 'scorpio', 'comment it.']] },
      { k: 'win', dur: 3.0, sc: [5], lines: [[0.8, 1.9, 'aquarius', 'top rung: | Jan 9!']] },
    ] },

  // hst295 · name that freeway
  hst295: { show: 'NAME THAT | FREEWAY', sub: 'ONE HONK TO ANSWER', host: 'taurus', logoCol: '#1f7a4a', th: { bg1: '#14322a', bg2: '#050e0a', card: '#1f4a3a', beam: 'rgba(200,255,220,0.10)' },
    hook: 'Name that | Houston freeway | in one honk', players: [P('leo', 'KATY', '#c98e1a'), P('libra', 'SPRING', '#8a3ab0')],
    music: ['screwed', 'F', 4295], endLine: 'Take any freeway. Jan 9.', endStars: ['taurus', 'leo', 'libra', 'scorpio'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'taurus', 'buzzers are | car horns.'], [1.8, 1.3, 'taurus', 'you honk | at home.']] },
      { k: 'q', dur: 4.4, tag: 'HONK 1', q: 'The Katy Freeway | is also...', opts: ['I-10', 'I-45', '288', '290'], buzz: [1.0, 0], pick: [0, 1.2], reveal: [0, 2.3], sc: [1, 0],
        lines: [[1.2, 1.1, 'leo', 'I-10!'], [2.5, 1.5, 'leo', 'I live | on it.']], mood: { leo: 'sparkle' } },
      { k: 'q', dur: 4.4, tag: 'HONK 2', q: 'Gulf Freeway and | North Freeway?', opts: ['I-10', 'I-45', '610', 'Beltway 8'], buzz: [1.0, 1], pick: [1, 1.2], reveal: [1, 2.3], sc: [1, 1],
        lines: [[1.2, 1.1, 'libra', 'I-45.'], [2.5, 1.5, 'libra', 'one road, | two names.']] },
      { k: 'q', dur: 4.6, tag: 'HONK 3', q: 'The Southwest | Freeway is...', opts: ['59/69', 'I-10', '290', 'Beltway 8'], buzz: [1.0, 0], pick: [2, 1.2], reveal: [0, 2.5], sc: [1, 1],
        lines: [[1.2, 1.1, 'leo', '290?'], [2.7, 1.6, 'leo', "it's all one | freeway to me."]], mood: { leo: lt => lt > 2.5 ? 'eyeroll' : 'happy' } },
      { k: 'q', dur: 4.4, tag: 'HONK 4', q: '"Minimum speed: 85" | (the meme)', opts: ['the 610 Loop', 'a feeder road', 'a school zone', 'a parking lot'], buzz: [1.0, 1], pick: [0, 1.2], reveal: [0, 2.3], sc: [1, 2],
        lines: [[1.2, 1.1, 'libra', 'the 610.'], [2.5, 1.5, 'libra', 'a meme. | not advice.']], mood: { libra: 'wink' } },
      { k: 'viewer', dur: 5.0, q: 'Your freeway | every day?', opts: ['I-10', 'I-45', '59/69', 'the feeder, always'],
        lines: [[0.6, 1.8, 'taurus', 'comment your | road.'], [2.8, 1.6, 'taurus', 'no honking | in comments.']] },
      { k: 'win', dur: 3.0, sc: [1, 2], lines: [[0.8, 1.9, 'libra', 'Spring wins! | ...or Woodlands?']] },
    ] },

  // hst296 · match the sign to its Houston weekend
  hst296: { show: 'MATCH | THE WEEKEND', sub: 'WHICH SIGN DOES THIS?', host: 'cancer', logoCol: '#c98e5a', th: { bg1: '#3a2a10', bg2: '#120c04', card: '#3a2a12', beam: 'rgba(255,230,170,0.10)' },
    hook: 'Your sign\'s | Houston weekend', players: [P('gemini', 'MIDTOWN', '#2b8ab0'), P('virgo', 'RICE VILLAGE', '#1f7a4a')],
    music: ['lofi', 'Ab', 4296], endLine: 'One weekend for all: Jan 9.', endStars: ['cancer', 'gemini', 'virgo', 'pisces'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'cancer', 'one weekend. | which sign?'], [1.8, 1.3, 'cancer', 'you guess | too, sweetie.']] },
      { k: 'q', dur: 4.4, tag: 'WEEKEND 1', q: 'Run club on the | bayou at 6am', opts: ['Aries', 'Pisces', 'Taurus', 'Leo'], buzz: [1.1, 0], pick: [0, 1.3], reveal: [0, 2.4], sc: [1, 0],
        lines: [[1.3, 1.1, 'gemini', 'Aries.'], [2.6, 1.5, 'gemini', 'they lap | everyone.']] },
      { k: 'q', dur: 4.4, tag: 'WEEKEND 2', q: 'Brunch: two-hour | wait, worth it', opts: ['Taurus', 'Virgo', 'Aquarius', 'Scorpio'], buzz: [1.1, 1], pick: [0, 1.3], reveal: [0, 2.4], sc: [1, 1],
        lines: [[1.3, 1.1, 'virgo', 'Taurus.'], [2.6, 1.5, 'virgo', 'outfit | planned.']] },
      { k: 'q', dur: 4.6, tag: 'WEEKEND 3', q: 'A quiet afternoon | at the Rothko Chapel', opts: ['Leo', 'Pisces', 'Sagittarius', 'Gemini'], buzz: [1.0, 0], pick: [3, 1.2], reveal: [1, 2.5], sc: [1, 1],
        lines: [[1.2, 1.1, 'gemini', 'me! | I can be quiet!'], [2.7, 1.5, 'cancer', 'Pisces, | sweetie.']], mood: { gemini: lt => lt > 2.5 ? 'wide' : 'sparkle' } },
      { k: 'q', dur: 4.4, tag: 'WEEKEND 4', q: 'Karaoke on Bellaire | until late', opts: ['Leo', 'Capricorn', 'Virgo', 'Cancer'], buzz: [1.0, 1], pick: [0, 1.2], reveal: [0, 2.3], sc: [1, 2],
        lines: [[1.2, 1.1, 'virgo', 'Leo.'], [2.5, 1.5, 'virgo', 'with a | setlist.']] },
      { k: 'viewer', dur: 5.0, q: "Your sign's | Houston weekend?", opts: ['run club', 'brunch line', 'museum day', 'karaoke night'],
        lines: [[0.6, 1.8, 'cancer', 'comment your | sign + plan.'], [2.8, 1.6, 'cancer', 'I made | snacks.']] },
      { k: 'win', dur: 3.0, sc: [1, 2], lines: [[0.8, 1.9, 'virgo', 'I wrote it | all down.']] },
    ] },

  // hst297 · you're the contestant (H-Town slang, a countdown clock on every question)
  hst297: { show: "YOU'RE | ON THE CLOCK", sub: 'THE H-TOWN SLANG GAME', host: 'aries', logoCol: '#c0304a', th: { bg1: '#4a0a14', bg2: '#140206', card: '#3a0c14', beam: 'rgba(255,200,190,0.12)' },
    hook: "You're the contestant. | Clock's running.", players: [],
    music: ['chiptune', 'D', 4297], endLine: 'Play it out loud. Jan 9.', endStars: ['aries', 'leo', 'capricorn', 'pisces'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'aries', 'no other | players.'], [1.8, 1.3, 'aries', "it's YOU. | ready?"]] },
      ...[
        ['What does | "mane" mean?', ['man / bro', 'a horse thing', 'money', 'a road'], 0, "it's \"man.\" | you knew."],
        ['"Swangas" are...', ['wheels that poke out', 'a dance move', 'a sandwich', 'sunglasses'], 0, 'slab | culture!'],
        ['"Y\'all" is...', ['singular', 'plural', 'both', 'a vibe'], 2, 'both. | always.'],
        ['H-Town is | also called...', ['Bayou City', 'Space City', 'both', 'neither'], 2, 'both! | 4 for 4?'],
      ].map(([q, opts, right, said], i) => ({ k: 'q', dur: 4.4, tag: `Q${i + 1} · 3 SECONDS`, q, opts, reveal: [right, 3.0],
        front: (x, t, lt) => clockRing(x, 880, 1230, 80, 1 - clamp((lt - 0.2) / 2.8), Math.max(0, Math.ceil(3 - (lt - 0.2)))),
        lines: [[0.5, 2.0, 'aries', ['3, 2, 1...', 'go go go!', 'tick tock!', 'last one!'][i]], [3.1, 1.3, 'aries', said]], mood: { aries: lt => lt > 3 ? 'sparkle' : 'squint' } })),
      { k: 'viewer', dur: 5.0, q: 'Your score | out of 4?', opts: ['4: born here', '3: moved here', '2: Katy cousin', '0: just visiting'], cta: 'COMMENT YOUR SCORE',
        lines: [[0.6, 1.8, 'aries', 'comment it. | be honest.'], [2.8, 1.6, 'aries', 'all scores | invited.']] },
      { k: 'win', dur: 3.0, lines: [[0.8, 1.9, 'aries', 'you won. | see you there.']] },
    ] },

  // hst298 · which sign said it (Houston dating lines)
  hst298: { show: 'WHO | SAID IT?', sub: 'HOUSTON DATING EDITION', host: 'leo', logoCol: '#e0306a', th: { bg1: '#2a0a3a', bg2: '#0a0212', card: '#2a0c3a', beam: 'rgba(255,190,240,0.10)' },
    hook: 'Which sign said | this about | Houston dating?', players: [P('taurus', 'THIRD WARD', '#c98e1a'), P('sagittarius', 'EAST END', '#2b8ab0')],
    music: ['funk', 'A', 4298], endLine: 'Say it in person. Jan 9.', endStars: ['leo', 'scorpio', 'libra', 'aries'],
    beats: [
      { k: 'open', dur: 3.2, lines: [[0.4, 1.3, 'leo', 'real quotes. | which sign?'], [1.8, 1.3, 'leo', 'you guess | too.']] },
      { k: 'q', dur: 4.8, tag: 'QUOTE 1', q: '"He lives in Katy. | That\'s long distance."', opts: ['Leo', 'Scorpio', 'Libra', 'Aries'], buzz: [1.2, 0], pick: [0, 1.4], reveal: [1, 2.7],
        lines: [[1.4, 1.1, 'taurus', 'Leo!'], [2.9, 1.6, 'leo', 'I would never. | ...I might.']], mood: { leo: lt => lt > 2.7 ? 'wink' : 'wide' } },
      { k: 'q', dur: 4.4, tag: 'QUOTE 2', q: '"Is it inside | the Loop, though?"', opts: ['Capricorn', 'Pisces', 'Gemini', 'Taurus'], buzz: [1.1, 1], pick: [0, 1.3], reveal: [0, 2.4], sc: [0, 1],
        lines: [[1.3, 1.1, 'sagittarius', 'Capricorn.'], [2.6, 1.5, 'sagittarius', 'checks the | map first.']] },
      { k: 'q', dur: 4.6, tag: 'QUOTE 3', q: '"Meet halfway? A coffee | shop on the feeder."', opts: ['Libra', 'Aries', 'Virgo', 'Cancer'], buzz: [1.1, 0], pick: [0, 1.3], reveal: [0, 2.4], sc: [1, 1],
        lines: [[1.3, 1.1, 'taurus', 'Libra.'], [2.6, 1.6, 'taurus', 'fair to | both sides.']], mood: { taurus: 'sparkle' } },
      { k: 'q', dur: 4.4, tag: 'QUOTE 4', q: '"First date? | Run club. 6am."', opts: ['Aries', 'Pisces', 'Taurus', 'Aquarius'], buzz: [1.0, 1], pick: [0, 1.2], reveal: [0, 2.3], sc: [1, 2],
        lines: [[1.2, 1.1, 'sagittarius', 'Aries.'], [2.5, 1.5, 'taurus', 'not me. | I sleep.']], mood: { taurus: 'sleepy' } },
      { k: 'viewer', dur: 5.0, q: 'What does YOUR sign | say on a first date?', opts: ['"you from here?"', '"inside the Loop?"', '"20 min, no traffic"', '"high school?"'],
        lines: [[0.6, 1.8, 'leo', 'comment your | sign + line.'], [2.8, 1.6, 'leo', "we'll guess | who said it."]] },
      { k: 'win', dur: 3.0, sc: [1, 2], lines: [[0.8, 1.9, 'sagittarius', 'East End | takes it!']] },
    ] },
}
