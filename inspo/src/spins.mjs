// Suggested Align spins. Each one keeps the reference post's move and swaps
// the subject for something true about Align. Matched against the post's
// caption and type, so every post gets a few to start from.
//
// Self-contained (no imports): the build also bakes this file into the review page.
// House voice: short sentences, no exclamation marks, no "manifest", astrology
// reads and never decides, never "download Align".

export const SPINS = [
  { id: 'comment-card', name: 'Comment your sign', match: /comment\s*[“"'‘]?\w|dm me|i'?ll send|link in bio/, uses: ['caption', 'hook'],
    spin: 'Comment-to-get, but the prize is a card: "comment your sign and I\'ll tell you the card you\'d be dealt at 11:11 tonight." Reply with its aura, its push and its pull. No photo.' },
  { id: 'deal-night-series', name: 'Deal Night series', match: /\bpart\s*\d|\d+ parts|\bpt\.?\s*\d|\bep\.?\s*\d|episode|series|\bvote|\bvotes|decided by|day \d+/, uses: ['series', 'format'],
    spin: 'A nightly series called Deal Night. Each episode deals one veiled card on screen, the comments vote align or release, and the next episode shows whether it was mutual.' },
  { id: 'dear-sign', name: 'Dear [sign]', match: /aries|taurus|gemini|cancer|\bleo\b|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces|zodiac|\bsigns?\b|♈|♉|♊|♋|♌|♍|♎|♏|♐|♑|♒|♓/, uses: ['hook', 'text'],
    spin: '"dear [sign]," then one true trait, the place they rub (push) and the thing that pulls them in. Ends on the card a [sign] would be dealt tonight. It can sting, but it never punches down.' },
  { id: 'sky-tonight', name: 'Tonight\'s sky as a deal', match: /mercury|retrograde|full moon|new moon|eclipse|venus|saturn|moon|astrological event|equinox|solstice|transit/, uses: ['format', 'series'],
    spin: 'Tonight\'s sky read as a hand of cards: what this [full moon / retrograde] does to your deck, one sign group per beat. Payoff: tonight\'s event card (Lunar peek, Comet, Second look).' },
  { id: 'talk-card-pull', name: 'Pull a talk card', match: /tarot|reading|pick a card|pull a card|oracle|cards?\b/, uses: ['format', 'hook'],
    spin: 'Swap the tarot pull for a talk card: draw one of the 51 questions on camera ("planned date or spontaneous date?") and the viewer answers in the comments. Neither answer shows until both of you have.' },
  { id: 'built-with-claude', name: 'Built with Claude Code', match: /claude|\bai\b|gpt|automat|pipeline|agent|n8n|no camera|workflow|sop|prompt|vibe ?cod/, uses: ['pipeline', 'series'],
    spin: 'Build in public: one Align reel made start to finish with Claude Code (script, Align Town 3D, captions), sped up. End on the finished reel, and the real view count once it\'s in.' },
  { id: 'trial-numbers', name: 'Founder numbers', match: /views|followers|viral|\d+k\b|million|grew|growth|algorithm|watch time|retention|reach/, uses: ['hook', 'caption'],
    spin: 'Founder diary with one real number: "[N] trial reels in, here\'s what the skip rate taught us about a dating app with no photos." Numbers from instagram/ stats, never invented.' },
  { id: 'pov-1111', name: 'POV at 11:11', match: /\bpov\b|when (it|you|they|your|he|she)|me when|that moment|nobody:|be like/, uses: ['format', 'text'],
    spin: 'POV skit: it\'s 11:11, the new deal lands, and the one card you aligned on last night has aligned back. One line of text on screen, a held reaction, the match animation as the payoff.' },
  { id: 'honest-opener', name: 'Say the honest thing', match: /text(ing|ed)?\b|\bdm\b|message|first move|ex\b|dating|crush|situationship|relationship|love|boyfriend|girlfriend|partner/, uses: ['hook', 'format'],
    spin: 'Show a chat that opens from something on their card, the way Align prompts it ("say the honest thing"). Then the line people actually send. Keep it warm, a little funny, and true.' },
  { id: 'the-reveal', name: 'The reveal', match: /reveal|before and after|before\/after|transformation|glow ?up|wait for it|till the end|stay to the end|watch till/, uses: ['edit', 'visual'],
    spin: 'Keep their reveal structure: a veiled card, the auras collide, "You both aligned", then the face flips. Use the hold-to-the-end tension on the veil.' },
  { id: 'peek', name: 'You get 3 seconds', match: /\b\d+ seconds?\b|blink|quick look|peek|sneak/, uses: ['hook', 'edit'],
    spin: 'Hook on the peek: "you get three seconds to see their face. Then it seals." Hold the card, show the photo for three seconds, let it close.' },
  { id: 'sound-led', name: 'The flip lands on the drop', match: /song|verse|album|lyrics|track|sound|audio|beat|music|\bft\.|feat|playlist|kanye|drake|cole|savage|taylor|sza/, uses: ['audio', 'edit'],
    spin: 'A sound-led edit: build to the drop with veiled cards being dealt, and land the card flip exactly on it. Pick sounds that feel like 2am, not a party.' },
  { id: 'day-building', name: 'A day building it', match: /vlog|day in (my|the) life|what i do in a day|routine|behind the scenes|bts\b|office|studio/, uses: ['format', 'visual'],
    spin: 'A day building a dating app with no photos: small real moments, one caption each, closing on the deal landing at 11:11.' },
  { id: 'slow-line', name: 'One slow line', match: /life|decision|becoming|healing|trust|energy|universe|reality|spiritual|mindset|self|growth|you deserve|reminder/, uses: ['text', 'audio'],
    spin: 'One slow line per screen over a mood sound, lowercase: "you weren\'t too much. you were early." Last screen: "read the sky before the face." No logo until the end card.' },
  { id: 'read-a-card', name: 'How to read a card', match: /how to|tutorial|guide|steps?\b|tips?\b|learn|explained|breakdown|101|beginner/, uses: ['format', 'text'],
    spin: 'Tutorial shape: how to read an Align card in 20 seconds. Aura, then push (where you\'ll rub), pull (what draws you in), align (where it holds). Demo on one real card from the deck.' },
  { id: 'signs-ranked', name: 'Signs ranked', match: /\btop \d|ranking|ranked|tier|as (a|an)\b|signs as|which sign|most likely|least likely/, uses: ['format', 'carousel'],
    spin: 'Rank the signs by who texts first (or who releases a perfect card over one dealbreaker). Who\'s-more-likely is a real talk card kind, so end on "play it with your match".' },
  { id: 'carousel-dear', name: 'Lowercase carousel', match: /swipe|slides?\b|carousel|save this|save for later/, uses: ['carousel', 'caption'],
    spin: 'Carousel: slide 1 is a lowercase hook ("the sign who leaves you on read"), then one sign or one truth per slide, and the last slide carries one Align idea. Never an ad.' },
  { id: 'guess-big-three', name: 'Guess my big three', match: /guess|quiz|challenge|game|test|can you|try this/, uses: ['format', 'caption'],
    spin: 'A game: "guess my big three from my dealbreakers." Show three dealbreakers, ask for Sun, Moon and Rising in the comments, and reveal in the next video.' },
  { id: 'reply-with-card', name: 'Reply with a talk card', match: /\?|replying to|reply|asked me|you asked|q&a|question/, uses: ['format', 'caption'],
    spin: 'Answer a real comment by playing it as a talk card on screen, then answering it honestly yourself. Ask viewers for their answer and keep it sealed until the next video.' },
  { id: 'why-no-photos', name: 'Why no photos', match: /psycholog|brain|science|study|research|fact|why (do|does|we)|truth about|nobody talks about/, uses: ['hook', 'format'],
    spin: 'Explainer: why Align hides photos until it\'s mutual. One claim per beat, honest about what\'s opinion, and the 3-second peek as the proof you still get a look.' },
  { id: 'celebrity-card', name: 'Their card, not their face', match: /fashion|vogue|celebrity|hollywood|red carpet|performance|actor|actress|singer|idol|bts|met gala/, uses: ['visual', 'format'],
    spin: 'What a famous person\'s Align card would read, from their public birth date: sun sign, push, pull, align. No face until the flip. Only public facts, nothing invented.' },
  { id: 'inside-a-card', name: 'What\'s inside a card', match: /inside|what are you paying|teardown|tear down|how it'?s made|made of|anatomy|explained/, uses: ['format', 'visual'],
    spin: 'Teardown: what\'s inside one Align card, layer by layer: aura, chart, dealbreakers, the veil, the photo underneath. Clean product shots, one label per layer.' },
  { id: 'align-town', name: 'Align Town walk', match: /3d|after effects|blender|animation|animated|cgi|motion design|render/, uses: ['visual', 'edit'],
    spin: 'An Align Town walk: the camera moves one way through the 3D astrology town, one card per street, slow. A line of text per card, and the deal at the end.' },
  { id: 'meme', name: 'Card-game meme', match: /lol|lmao|😂|🤣|meme|funny|joke|hack|crazy|bro\b|ngl|fr\b|😭/, uses: ['format', 'text'],
    spin: 'Meme format: "me releasing a perfect chart because their dealbreaker is \'no cats\'." The target is the behaviour, never the sign or the person.' },
  { id: 'place-card', name: 'Place card date', match: /caf[eé]|coffee|food|restaurant|bar\b|date night|dinner|brunch|eat/, uses: ['format', 'visual'],
    spin: 'Place cards: two people, one place card, "if they say yes, it\'s a date." Film it at a real café and end on the check-in card they unlock there.' },
  { id: 'founder-why', name: 'Why I built it', match: /founder|startup|business|linkedin|b2b|entrepreneur|building|ceo|launch/, uses: ['hook', 'format'],
    spin: 'Founder story in 30 seconds: why build a dating app played as a card game, with no photos. One true moment, one number, and the line "read the sky before the face."' },
  { id: 'before-align', name: 'First sketch vs now', match: /tbt|throwback|years? ago|old me|then vs now|first (video|post|day)|journey/, uses: ['visual', 'format'],
    spin: 'Then and now: the first sketch of the veiled card next to the app today, cut on the beat. Caption: what changed and why.' },
]

// For posts whose caption says little, rotate through spins that suit the type.
const FALLBACK = {
  Reel: ['pov-1111', 'the-reveal', 'slow-line', 'sound-led', 'meme', 'align-town', 'peek', 'day-building', 'guess-big-three', 'honest-opener'],
  Carousel: ['carousel-dear', 'dear-sign', 'signs-ranked', 'inside-a-card', 'read-a-card'],
  Post: ['carousel-dear', 'slow-line', 'dear-sign', 'meme', 'before-align'],
}
const hash = (str) => { let h = 7; for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h }

/** The best few spins for one post: caption matches first, then ones that suit its type. */
export function suggestSpins(item, n = 3) {
  const text = `${item.about || ''}`.toLowerCase()
  const scored = SPINS.map((s, i) => ({ s, i, hits: (text.match(new RegExp(s.match.source, 'g')) || []).length }))
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits || a.i - b.i)
    .map((x) => x.s)
  const pool = FALLBACK[item.type] || FALLBACK.Reel
  const start = hash(item.id || item.about || '') % pool.length
  for (const id of [...pool.slice(start), ...pool.slice(0, start)]) {
    if (scored.length >= n) break
    const s = SPINS.find((x) => x.id === id)
    if (!scored.includes(s)) scored.push(s)
  }
  return scored.slice(0, n)
}
