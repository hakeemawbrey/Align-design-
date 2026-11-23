# Houston Star Talk: 250 Houston-specific Star Talk videos (Houston beta + beta party, Jan 9)

The user asked: "make 250 very Houston specific Houston star talk videos, needs a very good hook caption and visual to get attention within 2 seconds. This is to promote our Houston beta and beta party Jan 9th. Run multiple agents research Houston … lore and city culture and references. Make 3 first so I can approve."

## Status
- The first 3 are waiting for approval:
  - `hst001` neighborhoods as signs
  - `hst002` POV: Scorpio on the 610
  - `hst003` how each sign RSVPs
- Party details: only the date (**Jan 9**) is known. Never invent a venue, a time or an RSVP mechanism. The closing card says "HOUSTON BETA PARTY · JAN 9 · join the Houston beta".

## Format (every video)
- **Engine:** promo/films/starrace/ep.js (`makeEpisode`). It handles scenes, keyframed stars, bubbles, props and a custom end card. The Houston kit is promo/films/htxstar/kit.js: street sign, freeway shield, skyline, car, freeway, heat sun, sweat, shimmer and `partyCard`. Scripts live in promo/films/htxstar/eps.js. One folder per video, `promo/films/hstNNN/`.
- **Hook (0–2 s):**
  - The HOOK caption is static from frame 1: box style, 4–8 words, 2 lines at most.
  - Frame 0 is already busy, with motion and a Houston symbol (a green street sign, the 610 shield, brake lights, the skyline, the heat sun).
  - No fade-in and no logo.
- **Pacing:** a cut or new beat every 2–4 s. Lengths run 20–35 s. Render with `--social --calm=1` (normal speed).
- **CTA:**
  - A persistent "HOU BETA · JAN 9" badge (top left, after the hook).
  - The payoff line in character.
  - The party ticket card at the end.
  - The post caption's first line carries the date. Comment prompts are identity-based ("comment your sign + side of town"); never gate content behind likes.
- **Safe zones:** keep the characters and CTA above y≈1450 and out of the right-hand ~150 px button column for key text.

## Research (3 agents, Nov 2026): what to use
**Neighborhoods** (affectionate stereotypes):
- **Inside vs outside the Loop:** this is the identity split.
- **Montrose:** artsy, murals, vintage, plants.
- **The Heights:** bungalows, porches, dogs in bandanas; nobody ever leaves the Heights.
- **EaDo:** identical new townhomes; "EaDo or East End?"
- **Midtown:** young professionals, brunch.
- **Rice Village:** students, shops, no parking.
- **River Oaks:** gently fancy.
- **Uptown / the Post Oak area:** dressed up. Don't say "Galleria" (it's a brand).
- **Memorial:** 5am joggers, the park loop.
- **Bellaire Blvd / Asiatown:** food crawls, boba, late night.
- **Katy:** "everyone has a cousin in Katy"; big, and it still says "Houston".
- **Sugar Land:** tidy and family-focused.
- **Pearland:** pear puns.
- **The Woodlands:** "not actually Houston", the bubble.
- **Cypress / Spring:** "is it Spring or The Woodlands?"
- **Clear Lake:** space-engineer neighbors, boats.
- **Third Ward, Fifth Ward, Second Ward and Gulfton:** celebratory only (culture, music, food, history). Never crime or poverty jokes.

**Driving:**
- **The 610 Loop / "the Loop":** the meme "minimum speed is 85" (a meme, not a stat).
- **Ring roads:** Beltway 8, and the Grand Parkway as "the third loop".
- **Freeway names:** Katy Freeway (I-10), Gulf Freeway / North Freeway (I-45), Southwest Freeway (59/69), 290, 288.
- **"Feeder road":** uniquely Houston.
- **Everyday lore:** Texas U-turns, distance measured in minutes ("20 minutes without traffic"), "Houston is an hour from Houston", construction forever, turn signals as a "factory defect".
- **Street-name passwords:** Kuykendahl ("KIRK-en-doll"), San Felipe ("San Fill-uh-pee"), Westheimer's bumps.
- No road-rage or crash jokes.

**Weather** (no disasters):
- Two seasons; "it's not the heat, it's the humidity"; October is still summer.
- The one 55° day: puffer coats, beanies, posting the car thermometer. Then 80° again by Thursday.
- Indoor AC is arctic, so bring a sweater. Parking by shade.
- Oak pollen on every car. Mosquitoes are the city bird. Love bugs (keep it clean).
- No hurricane, flood or freeze jokes. That includes "H-Town till I drown".

**Food** (generic dish names, no restaurant brands):
- Tex-Mex vs Mexican, queso.
- Breakfast tacos (flour vs corn).
- **Kolache vs klobasnek:** the sweet one vs the sausage one. This is the big nerd fight and perfect for Virgo.
- **Crawfish:** the season starts around January; small early on, peaks in March. Viet-Cajun is a Houston signature.
- Pho on a "cold" 60° day, boba, hot pot.
- Hillcroft chaat and sweets; jollof, suya and puff-puff (lovingly).
- Brisket debates, chopped beef, boudin.
- Lemon pepper wet wings.
- Raspas, mangonadas, elote, snowballs.
- Brunch: long waits, planned outfits, no drink jokes.
- Food trucks.
- "You can eat around the world on one street" (no rankings or statistics).

**Culture:**
- "Houston friendly"; "y'all"; "fixin' to"; "mane"; "H-Town"; "Bayou City"; "Space City".
- "Houston, we have a *match*" (no agency marks).
- **Slab culture:** candy paint, swangas/elbows, popped trunks with lit messages, grippin' grain. Celebrate it. A popped trunk reading "BETA PARTY JAN 9" is great.
- Chopped-and-screwed as a sound gag (a slowed voice) only. Never syrup, lean or purple-cup imagery.
- Zydeco, Tejano, two-step.
- Murals.
- Free museum Thursdays.
- Run clubs on the bayou trails, pickleball.
- Galveston day trips; the brown-water joke is beloved.
- Karaoke on Bellaire.
- The Waugh bridge bats at sunset.
- Hermann Park paddle boats.
- The downtown tunnels: air-conditioned, closed weekends.
- Rothko Chapel (quiet).
- Discovery Green; Buffalo Bayou.
- "Where'd you go to high school?"
- "Where are you from originally?"
- No zoning: a taco stand next to a mansion.

**Dating:**
- "He lives in Katy. That's long distance."
- "Is it inside the Loop?"
- Meeting at a halfway coffee shop on a feeder road.
- Brunch first dates.
- Run-club dating.
- "Everyone says dating here is hard" (no rankings).

**January 9 energy:**
- New year, new match.
- The first coat week.
- Crawfish just starting.
- King cake season (it starts Jan 6).
- Lunar New Year coming on Bellaire.
- Rodeo countdown: say "rodeo season" and "boots coming out"; the rodeo name is a brand.
- Playoff watch parties (no team or league names; say "the big game").

**Never use:**
- Team names or marks, "Clutch City" and stadium names.
- The Galleria, the Rodeo / Go Texan Day, the Art Car Parade, NASA / Space Center, the Kemah Boardwalk and toll-tag brands.
- Drink or drug slang.
- Disasters.
- Statistics or rankings.
- Real people.
- Mean jokes about any neighborhood or group.

**Hooks that test well (keep to ≤10 words):**
- "Houston neighborhoods as zodiac signs"
- "POV: a Scorpio on the 610 at 5pm"
- "The signs when it's 80° in January"
- "Inside the Loop vs outside: the signs decide"
- "Houston suburbs as zodiac signs (Katy, you know)"
- "12 signs, 12 breakfast taco orders"
- "Your sign's Houston red flag. Sorry."
- "Tell me you're a Houston Leo without telling me"
- "Which sign brings crawfish to the cookout?"
- "Day N until Jan 9: [sign] is ready"

## The first 3
| folder | hook | format | payoff |
|---|---|---|---|
| hst001 | Houston neighborhoods as zodiac signs | list: 12 cards (a green street sign, the star and one line each) | "Wrong? Comment your sign + side of town." → the party ticket |
| hst002 | POV: a Scorpio on the 610 at 5pm | skit: brake lights, the 610 shield, the other signs in nearby cars | "…but for the beta party, I'd do the 610 twice." → the party ticket |
| hst003 | How each sign RSVPs to the Houston beta party | list: an invite card, then each sign's reply | Scorpio left you on read… and is there first → the party ticket |
