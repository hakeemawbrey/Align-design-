# Planet Talk: build guide (120 videos, a Month 2 add-on)

**The idea:** the planets talk to the zodiac signs. 10 planets × 12 signs = 120 videos. Each planet is a character
with a big, consistent personality, and in each episode it talks to one sign about love, dating, being single or
friendship, in the planet's own area. The sign talks back.

**The rules are the Month 2 boost rules:** follow **promo/films/MONTH2-BUILD.md** for everything (setup, rows file,
no end card, no card transition, no "Align" on screen, crazy frame-0 hooks, loop or hard-cut endings, Pisces cries in
every film, house rules, checks, render, upload and record). The differences from that guide:

- **Batch:** your batch is in `promo/library/planets/series.json` (p01 … p10), and each batch is one planet. The
  series entry lists every episode: `sign`, `long` (true = 60–90 s, your planet's home sign or signs; otherwise
  20–35 s) and `account`.
- **Files:** write rows to `promo/films/planets/<batch>.md`. Record uploads in
  `promo/library/uploads/pt-<batch>.json`, with the same fields plus `"sign"` and `"account"`. Pages are 39 or 40,
  and the page urls are in promo/library/pages.json.
- **Folders:** `<prefix>e<NN>`, e.g. `kpsue05` (the Sun to Leo), `kpvee02` (Venus to Taurus).
- **The planet kit:** batch **p01 (The Sun)** builds `promo/films/planetkit.js` FIRST. It's a shared module with all
  10 planet characters (face, colour, size, idle motion, talk animation, voice pitch for talkCues), a sign-meets-planet
  two-shot layout and a planet "entrance" hook. Then it pushes the marker `promo/films/planetkit.READY`, and only then
  builds its own Sun episodes. Every other batch writes and pushes its rows first, then waits for planetkit.READY on
  origin (git pull every 3 minutes). The kit is read-only for everyone except p01, and p01 must keep its API stable
  once the marker is pushed. Use hookkit.js for the hooks once it exists (it's being built in parallel).
- **The characters** (keep them consistent across all batches):

  | Planet | Character |
  |---|---|
  | **The Sun** | Warm, loud, main-character energy, gives everyone a pep talk |
  | **The Moon** | Soft, moody, remembers every feeling, speaks in a hush |
  | **Mercury** | Fast talker, texts in bursts, the overthinker's coach |
  | **Venus** | Glamorous romantic, all about love languages and self-worth |
  | **Mars** | Bold, impatient, "just ask them out" energy, means well |
  | **Jupiter** | Big generous uncle energy, everything is an adventure |
  | **Saturn** | Strict but secretly sweet, boundaries and commitment |
  | **Uranus** | Chaotic genius, "what if you did the unexpected" |
  | **Neptune** | Dreamy, poetic, the romance-movie fan, gently warns about rose-tinted glasses |
  | **Pluto** | Deep, intense, transformation and letting go. Small, and proud of it ("still counts") |

- **Each episode:** the hook is the planet arriving in a crazy way and calling the sign out ("SCORPIO. We need to
  talk." as Pluto looms over the horizon). Then a relatable situation for that sign, the planet's take, and the sign's
  reaction. End on a punchline, loop or hard cut.
  - **Long (home sign) episodes** are a full heart-to-heart or mini-story, with chapters, a payoff and a beat every
    8–10 s.
  - **Advice stays warm and healthy;** the joke is on the situation, never on the sign.
- **Truth:**
  - Astrology is framed as a lens ("in astrology, Venus rules…"), never science.
  - Any astronomy fact must be true; check it or leave it out. True ones you can use: Venus spins the opposite way
    to most planets; Mercury is closest to the Sun; Saturn has rings; Pluto is classed as a dwarf planet; the Moon
    always shows Earth the same face.
  - Rulerships: the modern ones as listed in series.json `home`.
- **Accounts:** odd episodes (Aries, Gemini, Leo, Libra, Sagittarius, Aquarius) post on star_talk, so lean funnier.
  Even ones post on star_advice, so lean warmer and more advice-led. Write captions in that account's voice
  (promo/posting/CAPTIONS.md).
- **Commit messages:** "Planet Talk: <planet> to <sign>: <title> (<len> s)" and "Planet Talk uploads: <batch> (+<k> films)".
