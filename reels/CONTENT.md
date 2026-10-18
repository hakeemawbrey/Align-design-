# zodiac.exe — writing guide

Every line in `content/<sign>.json` follows this file. The validator
(`npm run check`) enforces the hard limits.

## The format

Each reel is ~7–9 seconds: a weird low-poly 3D world, a shiny little figure,
some blob creatures with eyes, and **one Windows-98 popup** that types out
**one line**. The popup's title bar names the sign (`scorpio.exe`). At the
end, the sign's glyph pops over the figure's head.

Reference: @whonagy — "The cycle ends when the pattern changes." / "Break the loop 👁"

So a line has to land in one read, in about 3 seconds.

## A line

- **Speaks directly to one sign**, by name, as the first word:
  `Scorpio, you can't heal in the room that keeps hurting you.`
- Sentence case, ends with a period (or a `?` if it's a question).
- **40–95 characters** including the sign's name. Shorter is better.
- One idea. No lists, no "and also".
- Calm, cryptic-wise, a little eerie, like a message from the simulation.
  Aphorism energy: "The cycle ends when the pattern changes."
- Rooted in **one real trait of the sign** (Scorpio tests people, Leo needs
  an audience, Virgo edits people, Pisces falls for potential, etc.), then
  advice that is true for anyone.
- Blunt but kind. It can sting; it never insults the sign or the reader.
- No emoji, no hashtags, no "bestie", no "manifest", no exclamation marks,
  no therapy jargon (attachment style, trauma bond, narcissist, toxic,
  boundaries-as-a-buzzword, healing journey). No claims that astrology
  decides anything. No promises of a soulmate.
- Plain short words. No em dashes, no semicolons. Commas are fine.

## Topics

Two topics, half each:

- `love`: dating, relationships, exes, situationships, texting, jealousy,
  being chosen, choosing, leaving, staying, friends who are more than friends.
- `self`: discipline, self-worth, habits, loops, ambition, rest, money,
  confidence, loneliness, comparison, starting over.

## JSON

`content/<sign>.json`:

```json
{
  "sign": "scorpio",
  "lines": [
    { "topic": "love", "text": "Scorpio, they already passed the test you never told them about.", "caption": "put the magnifying glass down" },
    { "topic": "self", "text": "Scorpio, the cycle ends when you stop rereading the old messages.", "caption": "break the loop" }
  ]
}
```

- `caption`: the reel's post caption, 2–6 words, lowercase, offhand, no
  hashtags, no emoji (the renderer adds 👁 and tags).
- No duplicate or near-duplicate lines within a sign. Across signs, don't
  reuse the same sentence with the name swapped.
