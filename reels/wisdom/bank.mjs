// Align Wisdom: the words. One sign at a time, the stars talk straight to it.
//
// A reel is a hook, three pieces of wisdom, and a send-off. The pieces come
// from the sign's own list plus the shared list (the shared ones are written
// with {sign} so they fit anyone). compose(sign, seed) picks them, so every
// seed is a different reel, and the stream never runs out:
// per sign, two of its twelve lines and one of the other twenty-one, in
// order, times eight hooks and six send-offs: over sixty thousand reels.
//
// House rules (lint() checks them): spell numbers as words, no digits, no
// exclamation marks, no hyphens, "alignment" never "compatibility", never
// "on Align", no soulmate promises. Keep each piece to two short sentences,
// about 90 characters, so it fits the dialogue box in four rows.

export const SIGNS = [
  { id: 'aries', name: 'Aries', glyph: '♈', el: 'fire', aura: 'Ember', color: '#f0603a', light: '#ffb39a', dark: '#5a1c10' },
  { id: 'taurus', name: 'Taurus', glyph: '♉', el: 'earth', aura: 'Honey', color: '#e9b24a', light: '#ffe1a0', dark: '#4e3510' },
  { id: 'gemini', name: 'Gemini', glyph: '♊', el: 'air', aura: 'Signal', color: '#f2cf4a', light: '#fff0a8', dark: '#4f4210' },
  { id: 'cancer', name: 'Cancer', glyph: '♋', el: 'water', aura: 'Tide', color: '#3fb6f0', light: '#a8e4ff', dark: '#0f3550' },
  { id: 'leo', name: 'Leo', glyph: '♌', el: 'fire', aura: 'Goldleaf', color: '#f39a3a', light: '#ffd09a', dark: '#55300f' },
  { id: 'virgo', name: 'Virgo', glyph: '♍', el: 'earth', aura: 'Rose Quartz', color: '#ef5c94', light: '#ffb6d2', dark: '#561a33' },
  { id: 'libra', name: 'Libra', glyph: '♎', el: 'air', aura: 'Orchid', color: '#e163d6', light: '#ffbdf6', dark: '#4d1a49' },
  { id: 'scorpio', name: 'Scorpio', glyph: '♏', el: 'water', aura: 'Garnet', color: '#e23d66', light: '#ff9fb7', dark: '#55102a' },
  { id: 'sagittarius', name: 'Sagittarius', glyph: '♐', el: 'fire', aura: 'Amethyst', color: '#a35cf0', light: '#dcbcff', dark: '#36165a' },
  { id: 'capricorn', name: 'Capricorn', glyph: '♑', el: 'earth', aura: 'Jade', color: '#2fc79a', light: '#a6f0d6', dark: '#0e4636' },
  { id: 'aquarius', name: 'Aquarius', glyph: '♒', el: 'air', aura: 'Ion', color: '#38c4ec', light: '#b2ecff', dark: '#0e3d4e' },
  { id: 'pisces', name: 'Pisces', glyph: '♓', el: 'water', aura: 'Dusk', color: '#7c74f0', light: '#c6c1ff', dark: '#25205a' },
]

// *word* is said a little brighter: it lights up in the sign's colour.
export const WISDOM = {
  aries: [
    'Not every fire needs to be *fought*. Some just need to be *fed*.',
    'You are allowed to *arrive* without kicking the door in.',
    'Being first is a gift. Waiting for the right one is a *skill*.',
    'The people who match your speed will *find* you. Stop running to prove it.',
    'Anger is information. Read it, then *put it down*.',
    'Start fewer things. *Finish* the ones that make you glow.',
    'You do not have to win the argument to be *right* about yourself.',
    'Brave is not loud. Sometimes brave is saying *I miss you* first.',
    'Rest is not losing. It is how fire *keeps burning*.',
    'Let someone take care of you. It is not a *defeat*.',
    'Your spark is real. Let it *warm* people, not burn them.',
    'Impatience is just hope in a hurry. *Breathe*, it is coming.',
  ],
  taurus: [
    'Your loyalty is rare. Give it to people who *notice* it.',
    'Comfort is not the same as *home*. Know the difference.',
    'You can hold on with *open hands*.',
    'Slow is not stuck. You are *growing roots*.',
    'Being stubborn kept you safe. Being *soft* will keep you loved.',
    'The right person will not rush you. They will *sit with* you.',
    'Let the old routine go. A *better one* is waiting.',
    'You deserve the same care you give your *favorite things*.',
    'Not every change is a loss. Some are a *harvest*.',
    'You build beautiful things. Let someone *build with* you.',
    'Peace is your love language. Do not trade it for *drama*.',
    'Say what you want out loud. People cannot *read your calm*.',
  ],
  gemini: [
    'You are not too much. You are *many*, and all of you is welcome.',
    'The right person will *love* every version of you.',
    'Your mind is a gift. Give your *heart* a turn to talk.',
    'You do not have to *explain* yourself to be understood.',
    'Curiosity is not *flaky*. It is how you love the world.',
    'Pick one thing today and let it have *all* of you.',
    'Say the *real thing* before the funny thing.',
    'You can change your mind and still *keep your word*.',
    'Somebody wants to hear the *whole story*. Tell it.',
    'Overthinking is just love with *nowhere to go*. Give it a home.',
    'You light up rooms. Make sure *someone* lights up yours.',
    'Stay for the *quiet part*. That is where it gets real.',
  ],
  cancer: [
    'You are allowed to be *held* too.',
    'Your softness is not a *weakness*. It is your shell, from the inside.',
    'Not everyone deserves a key to your *home*.',
    'Feel it fully, then let the tide *take it out*.',
    'You remember everything. Remember your *own worth* too.',
    'The past is a place to *visit*, not a place to live.',
    'Mothering everyone is beautiful. Who is *mothering you*?',
    'Say the hurt *gently*. It still counts.',
    'The right one will not make you *guess* how they feel.',
    'Your moods are weather, not *who you are*.',
    'Come out of the shell. The water is *warmer* than you think.',
    'Home is not a place. It is the people who *stay*.',
  ],
  leo: [
    'You do not have to *perform* to be loved.',
    'The sun does not ask if it is too bright. *Shine*.',
    'Your heart is *loyal* and loud. Let it be gentle too.',
    'Not everyone will clap. *Keep going* anyway.',
    'Being proud of yourself is not *ego*. It is *healing*.',
    'Let someone else hold the *spotlight*. You are still the sun.',
    'The right person will *celebrate* you on your quiet days.',
    'Generous people need *refills* too. Ask for one.',
    'You are allowed to be *tired* of being strong.',
    'Real love will not dim you. It will *turn you up*.',
    'Your warmth is a gift. Do not hand it to *cold hands*.',
    'Crowns are heavy. Take yours *off* tonight.',
  ],
  virgo: [
    'You are not a *project*. You are a person.',
    'Done is *beautiful*. Perfect is a myth.',
    'You notice everything. Notice what you *did right* today.',
    'Let someone help, even if they *fold it wrong*.',
    'Your care is in the *details*. The right one sees them.',
    'Worry is not *control*. Put it down for one night.',
    'Be as *kind* to yourself as you are to your plants.',
    'You do not have to *earn* rest.',
    'Not every flaw needs *fixing*. Some are just *yours*.',
    'Love is not a *checklist*. Leave room to be surprised.',
    'The mess is not *failure*. It is life, happening.',
    'You are *enough* before the list is done.',
  ],
  libra: [
    'Peace that costs *you* is not peace.',
    'You can *disagree* and still be loved.',
    'Choose. The right answer is the one that *feels like you*.',
    'Balance is not *pleasing everyone*. Put yourself on the scale.',
    'You are allowed to want *more* than fair.',
    'Beauty is not *shallow* to you. It is how you *love*.',
    'Say no *sweetly*. But say it.',
    'The right partner will *meet* you halfway, not wait for you to walk it.',
    'Your charm opens doors. Your *honesty* keeps them open.',
    'Being alone for a while is not *failing* at love.',
    'You give harmony to everyone. *Keep some* for yourself.',
    'Let it be *uneven* for a moment. It will settle.',
  ],
  scorpio: [
    'You can *trust* again. Start small.',
    'Not every silence is a *secret*. Some are just *rest*.',
    'Your intensity is *depth*. The right one will want to dive.',
    'Letting go is not *losing*. It is *shedding*.',
    'You do not have to test people. *Watch* them.',
    'Forgive them for you, not for *them*.',
    'Your walls kept you alive. Now let them *have a door*.',
    'The truth you are afraid of will *set you free*.',
    'You were made to *transform*, not to stay the same.',
    'Say the soft thing. *Vulnerable* is the real power.',
    'Someone wants to know the *real* you. Let them find out.',
    'Rebirth is your *superpower*. Use it on yourself.',
  ],
  sagittarius: [
    'Freedom is better *shared*.',
    'You do not have to leave to *grow*. Sometimes you stay.',
    'Your honesty is a gift. Wrap it *kindly*.',
    'The adventure can be *one person* deep.',
    'Running is not the same as *exploring*.',
    'Your hope is *contagious*. Keep spreading it.',
    'Commitment is not a *cage*. It is a *compass*.',
    'Laugh at it, then *feel* it.',
    'The right one will pack a bag and come *with* you.',
    'Some answers are *here*, not out there.',
    'Aim your arrow at *one* thing for a while.',
    'Every road taught you something. Let *this one* stay.',
  ],
  capricorn: [
    'You are more than what you *achieve*.',
    'The mountain will still be there *tomorrow*. Rest.',
    'Being *needed* is not the same as being *loved*.',
    'Let someone see you *without the armor*.',
    'You built all of this. Let yourself *enjoy* it.',
    'Soft is not *slow*. Soft is *strong*.',
    'Love is not a *goal*. It is a *place*.',
    'Your patience is a gift. Use it on *yourself*.',
    'You do not have to carry the whole family *alone*.',
    'Laugh more. It is *not wasted* time.',
    'The right one will *climb with* you, not just watch.',
    'You are allowed to *want* things that do not make sense.',
  ],
  aquarius: [
    'You are allowed to *need* people.',
    'Being different is your *gift*. Being *distant* is a choice.',
    'Let someone into the *inner* room.',
    'You love humanity. Let *one human* love you back.',
    'Feelings are not *illogical*. They are *data*.',
    'The future you dream of *starts* with today.',
    'Your weird is *wonderful*. Find who agrees.',
    'Detached is not the same as *at peace*.',
    'Say *I care* out loud. It changes things.',
    'The right one will think you are a *genius* and a *mess*. Both true.',
    'You do not have to *save the world* tonight.',
    'Real freedom includes the freedom to *stay*.',
  ],
  pisces: [
    'Your *dreams* are not an escape. They are a *map*.',
    'You feel everything. Choose what you *keep*.',
    'Not every rescue is *yours* to make.',
    'Boundaries are how *kind* people stay kind.',
    'The right one will *swim to* you.',
    'Your intuition is right. *Trust* it this time.',
    'You can love someone and still *walk away*.',
    'Come back to *shore* sometimes. Rest there.',
    'Soft hearts are *strong* hearts. Remember that.',
    'Write it, paint it, sing it. Just do not *bury* it.',
    'You are not *too sensitive*. The world is too loud.',
    'Let someone *hold the dream* with you.',
  ],
}

// Fits any sign. {sign} becomes the name.
export const SHARED = [
  'You are not behind, {sign}. You are *right on time*.',
  'The person who is meant for you will *not* be confused about you.',
  'Stop shrinking to fit in rooms you have *outgrown*.',
  'Rest is part of the *plan*.',
  'Whoever *stays* when you are quiet is your person.',
  'Not everything that ends was a *mistake*.',
  'Heal out loud, {sign}. You do not have to *hide* it.',
  'You are allowed to *start over* as many times as you need.',
  'Protect your *peace* like it is rent.',
  'The love you give is a *mirror*. Look into it.',
  'Your *energy* is a door. Choose who walks in.',
]

export const HOOKS = [
  '{sign}. The stars have something to *tell* you.',
  '{sign}, listen. This one is for *you*.',
  'Hey, {sign}. A little *wisdom* tonight.',
  '{sign}. If this found you, it was *meant* to.',
  'Dear {sign}. Read this *slowly*.',
  '{sign}, stop scrolling. We see *you*.',
  'A word for you, {sign}.',
  'Psst. {sign}. Up *here*.',
]

export const SENDOFFS = [
  'Send this to a {sign} you *love*.',
  'Save this, {sign}. Come back to it.',
  'Tag the {sign} who *needs* this.',
  'Send this to your {sign}.',
  'Keep this one, {sign}.',
  'Share this with a {sign}. They will *know*.',
]

// mulberry32, the same as the engines
export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const hashStr = (s) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0 }
const fill = (s, sign) => s.replaceAll('{sign}', sign.name)

/** sign: id or object, seed: any integer. Returns a reel script. */
export function compose(signId, seed = 0) {
  const sign = typeof signId === 'string' ? SIGNS.find((s) => s.id === signId) : signId
  if (!sign) throw new Error(`no sign ${signId}`)
  const r = rng(hashStr(sign.id) ^ Math.imul(seed + 1, 0x9e3779b1))
  const pick = (a) => a[Math.floor(r() * a.length)]
  // two from the sign's own list, one more from the sign or the shared list
  const own = [...WISDOM[sign.id]]
  const pool = []
  for (let i = 0; i < 2; i++) pool.push(own.splice(Math.floor(r() * own.length), 1)[0])
  const rest = [...own, ...SHARED]
  pool.push(rest[Math.floor(r() * rest.length)])
  // the strongest-feeling one goes last: put the shared one in the middle
  const lines = [pool[0], pool[2], pool[1]].map((l) => fill(l, sign))
  const hook = fill(pick(HOOKS), sign)
  const send = fill(pick(SENDOFFS), sign)
  return {
    id: `${sign.id}-${String(seed).padStart(4, '0')}`,
    sign: sign.id,
    seed,
    hook,
    lines,
    send,
    caption: `${sign.glyph} ${sign.name}, ${plain(lines[lines.length - 1]).replace(/^./, (c) => c.toLowerCase())}\n\nThe stars talk to one sign at a time. Follow for yours.`,
    hashtags: [sign.id, `${sign.id}season`, 'zodiac', 'astrology', 'pixelart', 'wisdom', 'advice', 'align'],
  }
}

export const plain = (s) => s.replace(/\*/g, '')

// "*keeps burning*." → words with an emphasis flag
export function lineWords(line) {
  const out = []
  let em = false
  for (const raw of line.split(/\s+/).filter(Boolean)) {
    if (raw.startsWith('*')) em = true
    const ends = raw.replace(/[.,!?;:…]+$/, '').endsWith('*')
    out.push({ w: plain(raw), em })
    if (ends) em = false
  }
  return out
}

/** a reel's pages: the hook, the wisdom, the send-off */
export const pagesOf = (reel) => [
  { kind: 'hook', text: reel.hook },
  ...reel.lines.map((text) => ({ kind: 'wisdom', text })),
  { kind: 'send', text: reel.send },
]

/** the endless order: every sign in turn, then the seed goes up */
export function* stream(start = 0) {
  for (let n = start; ; n++) yield compose(SIGNS[n % 12].id, Math.floor(n / 12))
}

export function lint() {
  const bad = []
  const all = [...Object.values(WISDOM).flat(), ...SHARED, ...HOOKS, ...SENDOFFS]
  for (const l of all) {
    const p = plain(l)
    if (/\d/.test(p)) bad.push(['digit', l])
    if (/!/.test(p)) bad.push(['exclamation', l])
    if (/\w-\w/.test(p)) bad.push(['hyphen', l])
    if (/compatib|soulmate|on Align/i.test(p)) bad.push(['house rule', l])
    if (p.replaceAll('{sign}', 'Sagittarius').length > 96) bad.push(['too long', l])
    if ((l.match(/\*/g) || []).length % 2) bad.push(['unclosed *', l])
  }
  for (const s of SIGNS) if ((WISDOM[s.id] || []).length < 10) bad.push(['few lines', s.id])
  return bad
}

if (typeof process !== 'undefined' && /bank\.mjs$/.test(process.argv?.[1] ?? '')) {
  const bad = lint()
  for (const [why, l] of bad) console.log(`${why}: ${l}`)
  const n = Object.values(WISDOM).flat().length
  console.log(`${n} sign lines, ${SHARED.length} shared, ${HOOKS.length} hooks, ${SENDOFFS.length} send-offs; ${bad.length} problems`)
  const it = stream(Number(process.argv[2] || 0))
  for (let i = 0; i < 3; i++) console.log(JSON.stringify(it.next().value, null, 1))
  process.exit(bad.length ? 1 : 0)
}
