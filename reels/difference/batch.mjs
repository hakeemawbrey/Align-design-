// The batch: 100 single-pair "What's the difference?" reels (about 25 s each),
// written as a bank of pairs and turned into scripts/batch/NNN-slug.json.
//
//   node reels/difference/batch.mjs          # (re)write the 100 scripts
//   node reels/difference/render.mjs --dir batch --jobs 3 --skip
//
// Each pair: [cat, A, B, art A, art B, [explain A], [explain B], [the difference], extra]
// cat: L (love, dating, feelings) or S (the stars). extra: { say: ['a crush', 'a match'], end, hook }.
// Rules (../SPEC.md): never "compatibility", only "alignment"; no exclamation
// marks; numbers spelled out; no hyphens in spoken lines; every fact holds up.

import { mkdirSync, writeFileSync, readdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(HERE, 'scripts', 'batch')

const P = [
  // ---------------- love, dating, feelings ----------------
  ['L', 'Lust', 'Love', 'solo:flame:rose', 'halo', ['*Lust* wants someone,', 'right now, tonight.'], ['*Love* wants their whole life to go well,', 'even the boring parts.'], ['Lust burns fast.', 'Love keeps the lights *on.*']],
  ['L', 'Butterflies', 'Anxiety', 'solo:butterflies:gold', 'solo:knot:lilac', ['*Butterflies* feel light.', 'You want more of them.'], ['*Anxiety* feels heavy.', 'You want it to stop.'], ['Your body makes almost the same feeling for both.', 'Excitement pulls you *closer.* Anxiety tells you to *brace.*'], { hook: 'Your body can barely tell these apart.' }],
  ['L', 'Alone', 'Lonely', 'solo:alone:blue', 'solo:crowd:lilac', ['*Alone* is a fact.', 'Nobody else is in the room.'], ['*Lonely* is a feeling.', 'You can feel it in a crowded room.'], ['Alone can be *peace.*', 'Lonely is a *need.*']],
  ['L', 'Envy', 'Jealousy', 'solo:star:lilac', 'duo:three:gold:rose', ['*Envy* is wanting what someone else has.'], ['*Jealousy* is fearing you\'ll lose what you have.'], ['Envy needs *two* people.', 'Jealousy needs *three.*']],
  ['L', 'Boundaries', 'Walls', 'solo:door:gold', 'solo:wall:lilac', ['A *boundary* tells people', 'how to love you.'], ['A *wall* keeps them', 'from trying.'], ['Boundaries have a *door.*', 'Walls don\'t.']],
  ['L', 'Ghosting', 'Fading', 'duo:ghost:gold:lilac', 'duo:away:rose:rose', ['*Ghosting* is gone in a day.', 'No message, no reason.'], ['*Fading* is slower.', 'Fewer texts, later replies, then nothing.'], ['One slams the *door.*', 'The other dims the *light.*']],
  ['L', 'A crush', 'A connection', 'solo:thoughts:rose', 'duo:close:gold:gold', ['A *crush* lives mostly in your head.', 'You fill in the blanks.'], ['A *connection* lives between you.', 'They fill in the blanks themselves.'], ['A crush is a *guess.*', 'A connection is an *answer.*'], { say: ['a crush', 'a connection'] }],
  ['L', 'Sympathy', 'Empathy', 'duo:apart:lilac:lilac', 'duo:close:rose:rose', ['*Sympathy* is feeling sorry for someone.'], ['*Empathy* is feeling it with them.'], ['Sympathy says *I\'m sorry.*', 'Empathy says *me too.*']],
  ['L', 'Guilt', 'Shame', 'solo:storm:blue', 'solo:mask:lilac', ['*Guilt* says,', 'I did something bad.'], ['*Shame* says,', 'I am bad.'], ['Guilt can be fixed with an *apology.*', 'Shame needs *kindness.*']],
  ['L', 'Insecurity', 'Intuition', 'solo:knot:lilac', 'solo:star:gold', ['*Insecurity* is loud,', 'and its story keeps changing.'], ['*Intuition* is quiet,', 'and it says the same thing every time.'], ['If it panics, it\'s *insecurity.*', 'If it\'s calm, *listen.*']],
  ['L', 'Settling', 'Choosing', 'solo:chain:lilac', 'duo:close:gold:gold', ['*Settling* is staying', 'because leaving feels scarier.'], ['*Choosing* is staying', 'because you\'d pick them again.'], ['Same person, same house.', 'A different *reason.*']],
  ['L', 'Infatuation', 'Love', 'solo:thoughts:rose', 'halo', ['*Infatuation* loves who you think they are.'], ['*Love* knows who they are,', 'and stays.'], ['Infatuation needs a *mystery.*', 'Love needs the *truth.*']],
  ['L', 'Attachment', 'Love', 'solo:chain:rose', 'solo:heart:gold', ['*Attachment* is needing someone', 'so that you feel okay.'], ['*Love* is wanting them to be okay,', 'even without you.'], ['Attachment holds *tight.*', 'Love holds *open.*']],
  ['L', 'Red flag', 'Dealbreaker', 'solo:flag:rose', 'solo:shield:gold', ['A *red flag* is a warning.', 'Something to watch.'], ['A *dealbreaker* is a line.', 'Something you won\'t stay for.'], ['Red flags ask *questions.*', 'Dealbreakers already *answered* them.'], { say: ['a red flag', 'a dealbreaker'], end: 'deal' }],
  ['L', 'Love bombing', 'Being adored', 'solo:flame:rose', 'solo:heart:gold', ['*Love bombing* is too much, too fast,', 'to win you over.'], ['*Being adored* is steady,', 'and it\'s still there next month.'], ['Love bombing *rushes* you.', 'Real love lets you *breathe.*']],
  ['L', 'Situationship', 'Relationship', 'duo:apart:lilac:rose', 'duo:close:gold:gold', ['A *situationship* has feelings,', 'but no name.'], ['A *relationship* has a name,', 'and plans with dates in them.'], ['If you can\'t say what it is,', 'it\'s a *situationship.*'], { say: ['a situationship', 'a relationship'] }],
  ['L', 'Talking', 'Dating', 'solo:phone:blue', 'duo:close:gold:rose', ['*Talking* is texts and maybes.'], ['*Dating* is plans,', 'in person, on purpose.'], ['Talking is a *screen.*', 'Dating is a *table for two.*'], { hook: 'Three months of texting. Is it dating?' }],
  ['L', 'Arguing', 'Fighting', 'duo:close:mint:mint', 'duo:wall:rose:rose', ['*Arguing* is two people', 'against a problem.'], ['*Fighting* is two people', 'against each other.'], ['In an argument, you can both *win.*', 'In a fight, you both *lose.*']],
  ['L', 'Space', 'Distance', 'duo:apart:gold:gold', 'duo:away:blue:blue', ['*Space* is time apart', 'that brings you back fuller.'], ['*Distance* is time apart', 'that brings you back colder.'], ['Space is *asked* for.', 'Distance just *happens.*']],
  ['L', 'Comfort', 'Complacency', 'solo:heart:gold', 'loop', ['*Comfort* is feeling safe enough', 'to be yourself.'], ['*Complacency* is feeling so safe', 'you stop trying.'], ['Comfort is a *soft place.*', 'Complacency is a *dead end.*']],
  ['L', 'Vulnerability', 'Oversharing', 'solo:door:rose', 'solo:storm:lilac', ['*Vulnerability* is sharing', 'to get closer.'], ['*Oversharing* is sharing for relief,', 'before the trust is there.'], ['Vulnerability *waits* for trust.', 'Oversharing *skips* it.']],
  ['L', 'Having needs', 'Neediness', 'solo:heart:mint', 'solo:thoughts:lilac', ['*Having needs* is normal.', 'You say them out loud.'], ['*Neediness* is needing constant proof,', 'no matter how much you get.'], ['Needs can be *met.*', 'Neediness has no *bottom.*']],
  ['L', 'Loyalty', 'Obligation', 'solo:shield:gold', 'solo:chain:lilac', ['*Loyalty* is staying true', 'because you want to.'], ['*Obligation* is staying', 'because you feel you have to.'], ['Loyalty is a *gift.*', 'Obligation is a *debt.*']],
  ['L', 'Pride', 'Self-respect', 'solo:mirror:gold', 'solo:shield:mint', ['*Pride* needs to win.'], ['*Self respect* only needs', 'to be treated well.'], ['Pride won\'t *apologize.*', 'Self respect won\'t *beg.*'], { say: ['pride', 'self respect'] }],
  ['L', 'Missing them', 'The feeling', 'solo:heart:rose', 'solo:flame:lilac', ['*Missing them* is missing the person,', 'as they really were.'], ['Missing *the feeling* is missing being wanted,', 'by anyone.'], ['Ask yourself if you\'d want them back', 'exactly as they *were.*'], { say: ['missing them', 'missing the feeling'] }],
  ['L', 'Closure', 'Contact', 'solo:door:gold', 'solo:phone:blue', ['*Closure* is something', 'you give yourself.'], ['*Contact* is hoping', 'they\'ll give it to you.'], ['Closure *ends* the story.', 'Contact *reopens* it.']],
  ['L', 'Healing', 'Avoiding', 'solo:seed:mint', 'solo:mask:lilac', ['*Healing* is feeling it,', 'so it can pass.'], ['*Avoiding* is staying busy,', 'so you never have to.'], ['Healing hurts on the *way out.*', 'Avoiding hurts *quietly,* forever.']],
  ['L', 'Forgiving', 'Forgetting', 'solo:heart:rose', 'solo:storm:blue', ['*Forgiving* is letting go of the debt.'], ['*Forgetting* is losing the lesson.'], ['You can forgive someone', 'and still remember *why.*']],
  ['L', 'Romance', 'Love', 'spark', 'road', ['*Romance* is the candles', 'and the surprise.'], ['*Love* is the ride to the airport', 'at five in the morning.'], ['Romance is a *moment.*', 'Love is a *habit.*']],
  ['L', 'Soulmate', 'Life partner', 'solo:star:rose', 'road', ['A *soulmate* is the idea', 'that one person was meant for you.'], ['A *life partner* is someone you choose,', 'again and again.'], ['One is *fate.*', 'The other is a choice you keep *making.*'], { say: ['a soulmate', 'a life partner'] }],
  ['L', 'Friendly', 'Flirting', 'duo:apart:mint:mint', 'beam', ['*Friendly* is warm with everyone.'], ['*Flirting* is warm with you,', 'on purpose, and a little longer.'], ['Friendly is for *everyone.*', 'Flirting is for *one.*'], { say: ['being friendly', 'flirting'] }],
  ['L', 'Admiration', 'Attraction', 'solo:star:gold', 'beam', ['*Admiration* is wanting', 'to be like them.'], ['*Attraction* is wanting', 'to be with them.'], ['Admiration *looks up.*', 'Attraction *leans in.*']],
  ['L', 'Respect', 'Fear', 'solo:shield:gold', 'solo:storm:blue', ['*Respect* is listening', 'because you value them.'], ['*Fear* is listening', 'because of what happens if you don\'t.'], ['Respect grows in *safety.*', 'Fear grows in *silence.*']],
  ['L', 'Exclusive', 'Committed', 'duo:close:rose:rose', 'road', ['*Exclusive* means', 'not seeing anyone else.'], ['*Committed* means', 'building something together.'], ['Exclusive is a *rule.*', 'Committed is a *plan.*']],
  ['L', 'Spark', 'Slow burn', 'spark', 'solo:flame:gold', ['A *spark* is instant.', 'You feel it the first night.'], ['A *slow burn* starts quiet,', 'and gets warmer every week.'], ['Sparks are *bright.*', 'Slow burns are *warm.*'], { say: ['a spark', 'a slow burn'] }],
  ['L', 'Patience', 'Waiting', 'solo:seed:mint', 'solo:clock:lilac', ['*Patience* is trusting the timing', 'while you live your life.'], ['*Waiting* is putting your life on hold', 'for a text.'], ['Patience is *active.*', 'Waiting is *stuck.*']],
  ['L', 'Hope', 'Denial', 'solo:star:gold', 'solo:mask:lilac', ['*Hope* sees what could be,', 'and checks the facts.'], ['*Denial* sees what could be,', 'and ignores the facts.'], ['Hope keeps its eyes *open.*', 'Denial *closes* them.']],
  ['L', 'Compromise', 'Sacrifice', 'duo:close:mint:gold', 'duo:lead:gold:lilac', ['A *compromise* is you both', 'giving a little.'], ['A *sacrifice* is one of you', 'giving a lot.'], ['Compromise is *fair.*', 'Too much sacrifice turns into *resentment.*'], { say: ['a compromise', 'a sacrifice'] }],
  ['L', 'Rebound', 'Fresh start', 'duo:three:rose:lilac', 'road', ['A *rebound* is someone', 'to stop missing someone else.'], ['A *fresh start* is someone you\'d want', 'even if you\'d never been hurt.'], ['A rebound is about your *past.*', 'A fresh start is about *them.*'], { say: ['a rebound', 'a fresh start'] }],
  ['L', 'Grand gesture', 'Effort', 'solo:flame:rose', 'road', ['A *grand gesture* is', 'one big moment.'], ['*Effort* is a thousand small ones.'], ['Gestures *impress* you.', 'Effort *keeps* you.'], { say: ['a grand gesture', 'effort'] }],
  ['L', 'Saying sorry', 'Apologizing', 'solo:heart:lilac', 'solo:seed:mint', ['*Saying sorry* is the word.'], ['*Apologizing* is the word,', 'plus changing what you did.'], ['Sorry is a *start.*', 'Change is the *apology.*']],
  ['L', 'Wanted', 'Chosen', 'beam', 'align', ['Being *wanted* is a feeling', 'in the moment.'], ['Being *chosen* is someone picking you,', 'on purpose, again.'], ['Anyone can want you *tonight.*', 'Choosing shows up *tomorrow.*'], { say: ['being wanted', 'being chosen'] }],
  ['L', 'Codependent', 'Interdependent', 'solo:chain:rose', 'duo:close:mint:gold', ['*Codependency* is losing yourself', 'to hold someone else up.'], ['*Interdependence* is two whole people', 'leaning on each other.'], ['One needs you to *shrink.*', 'The other lets you both *grow.*'], { say: ['codependency', 'interdependence'] }],
  ['L', 'Hard', 'Toxic', 'road', 'solo:storm:mars', ['A *hard* relationship has problems', 'you work on together.'], ['A *toxic* one has problems', 'that work on you.'], ['Hard asks for *effort.*', 'Toxic asks you to *disappear.*'], { say: ['hard', 'toxic'] }],
  ['L', 'Breadcrumbing', 'Slow pace', 'solo:phone:lilac', 'road', ['*Breadcrumbing* is just enough attention', 'to keep you there.'], ['A *slow pace* is less attention,', 'but it always goes somewhere.'], ['Slow *builds.*', 'Breadcrumbs never become a *meal.*'], { say: ['breadcrumbing', 'a slow pace'] }],
  ['L', 'Peace', 'Boredom', 'halo', 'solo:clock:blue', ['*Peace* is calm', 'with someone you trust.'], ['*Boredom* is calm', 'with nothing left to say.'], ['If chaos used to feel like love,', 'peace can feel *boring* at first.']],
  ['L', 'Anxious', 'Avoidant', 'solo:thoughts:rose', 'duo:apart:blue:lilac', ['*Anxious* attachment chases closeness', 'when it\'s scared.'], ['*Avoidant* attachment pulls away', 'when it\'s scared.'], ['Same fear, *opposite* moves.', 'That\'s why they keep finding *each other.*']],
  ['L', 'Shy', 'Introvert', 'solo:knot:rose', 'solo:alone:blue', ['*Shy* is nerves around people.'], ['An *introvert* needs quiet', 'to recharge.'], ['A shy person wants to *join.*', 'An introvert wants to *rest.*'], { say: ['shy', 'introverted'] }],
  ['L', 'Confidence', 'Arrogance', 'solo:star:gold', 'solo:mirror:mars', ['*Confidence* doesn\'t need you to agree.'], ['*Arrogance* needs you to admit', 'it\'s better.'], ['Confidence *lifts* the room.', 'Arrogance *takes* it.']],
  ['L', 'Ego', 'Self-worth', 'solo:mirror:lilac', 'solo:heart:gold', ['*Ego* needs to look good.'], ['*Self worth* knows it\'s good,', 'even when it doesn\'t look it.'], ['Ego gets *hurt.*', 'Self worth gets back *up.*'], { say: ['ego', 'self worth'] }],
  ['L', 'Passion', 'Obsession', 'solo:flame:gold', 'limerence', ['*Passion* is wanting something', 'with your whole heart.'], ['*Obsession* is wanting it', 'more than your peace.'], ['Passion *adds* to your life.', 'Obsession *becomes* it.']],
  ['L', 'Partner', 'Project', 'duo:close:gold:rose', 'solo:seed:mint', ['A *partner* is someone you love', 'as they are.'], ['A *project* is someone you love', 'for who they could be.'], ['You can\'t date someone\'s *potential.*'], { say: ['a partner', 'a project'] }],
  ['L', 'Holding on', 'Letting go', 'solo:chain:lilac', 'solo:door:gold', ['*Holding on* is hope', 'that needs them to change.'], ['*Letting go* is hope', 'that doesn\'t.'], ['Letting go isn\'t giving up on *them.*', 'It\'s giving up the *fight.*']],
  ['L', 'Moving on', 'Getting over', 'road', 'solo:heart:rose', ['*Moving on* is what you do.'], ['*Getting over* is what you feel.'], ['You can move on before you\'re over it.', 'That\'s *normal.*']],
  ['L', 'A break', 'A breakup', 'duo:apart:gold:lilac', 'duo:away:rose:blue', ['A *break* is a pause,', 'with a plan to talk again.'], ['A *breakup* is an end,', 'even if it hurts to say it.'], ['A break has a *date.*', 'A breakup has a *goodbye.*'], { say: ['a break', 'a breakup'] }],
  ['L', 'Nostalgia', 'Regret', 'solo:star:lilac', 'solo:storm:blue', ['*Nostalgia* misses the good parts.'], ['*Regret* wishes you\'d done it differently.'], ['Nostalgia *smiles.*', 'Regret *winces.*']],
  ['L', 'Priority', 'Option', 'align', 'solo:clock:lilac', ['A *priority* gets planned around.'], ['An *option* gets fit in', 'when there\'s time.'], ['You know which one you are', 'by the *calendar.*'], { say: ['a priority', 'an option'] }],
  ['L', 'Sex', 'Intimacy', 'spark', 'halo', ['*Sex* is physical.'], ['*Intimacy* is being known,', 'and it can happen fully dressed.'], ['Sex can happen with a *stranger.*', 'Intimacy *can\'t.*']],
  ['L', 'Honesty', 'Brutality', 'solo:star:gold', 'solo:flame:mars', ['*Honesty* tells the truth', 'to help.'], ['*Brutality* tells the truth', 'to hurt.'], ['Same words.', 'A different *reason.*']],
  ['L', 'Nice', 'Kind', 'solo:mask:rose', 'duo:close:gold:gold', ['*Nice* is pleasant,', 'so things stay smooth.'], ['*Kind* is caring enough', 'to say the hard thing.'], ['Nice *avoids* the conflict.', 'Kind walks *through* it with you.'], { say: ['nice', 'kind'] }],
  ['L', 'Reassurance', 'Validation', 'duo:close:blue:blue', 'solo:heart:rose', ['*Reassurance* calms a fear.'], ['*Validation* says your feeling', 'makes sense.'], ['Reassurance says *it\'s okay.*', 'Validation says *you\'re okay.*']],
  ['L', 'Expectations', 'Standards', 'solo:thoughts:lilac', 'solo:shield:gold', ['*Expectations* are what you think', 'someone will do.'], ['*Standards* are what you\'ll accept.'], ['Expectations are about *them.*', 'Standards are about *you.*']],
  ['L', 'Protective', 'Possessive', 'solo:shield:blue', 'solo:chain:mars', ['*Protective* wants you safe.'], ['*Possessive* wants you theirs,', 'and nobody else\'s.'], ['Protective *trusts* you.', 'Possessive *tracks* you.']],
  ['L', 'Consent', 'Compliance', 'duo:close:mint:mint', 'solo:chain:lilac', ['*Consent* is a free yes.'], ['*Compliance* is a yes', 'because no didn\'t feel safe.'], ['If no wasn\'t an option,', 'yes doesn\'t *count.*']],
  ['L', 'Lonely', 'Ready', 'solo:crowd:lilac', 'solo:star:gold', ['*Lonely* wants anyone', 'to fill the quiet.'], ['*Ready* wants someone,', 'and is fine if it takes a while.'], ['Lonely picks *fast.*', 'Ready picks *well.*']],
  ['L', 'Chemistry', 'Alignment', 'spark', 'road', ['*Chemistry* is how it feels.', 'The pull, the nerves, the spark.'], ['*Alignment* is how it works.', 'Your values, your days, how you fight.'], ['Chemistry gets you a *second date.*', 'Alignment gets you a *second year.*'], { end: 'flip' }],
  ['L', 'A crush', 'A match', 'beam', 'align', ['A *crush* can go one way.', 'You can feel it all alone.'], ['A *match* has to be *mutual.*', 'Both of you, at the same time.'], ['A crush is a *wish.*', 'A match is a *yes,* twice.'], { say: ['a crush', 'a match'], end: 'flip' }],
  ['L', 'Love', 'Limerence', 'halo', 'limerence', ['*Love* is calm.', 'It grows when you know where you stand.'], ['*Limerence* is the obsessive kind,', 'and it feeds on *not knowing.*'], ['If it burns hottest when they pull away,', 'that\'s *limerence.*']],
  ['L', 'Your type', 'Your pattern', 'lineup', 'loop', ['Your *type* is who you\'re drawn to.'], ['Your *pattern* is what keeps happening', 'once you are.'], ['A type is a *preference.*', 'A pattern is a *loop.*']],

  // ---------------- the stars ----------------
  ['S', 'Sun sign', 'Moon sign', 'sun', 'planet:☽:blue:0', ['Your *sun sign* is your core.', 'Who you\'re becoming.'], ['Your *moon sign* is your feelings.', 'What you need to feel safe.'], ['The sun is who you are in *daylight.*', 'The moon is who you are at *home.*']],
  ['S', 'Synastry', 'Composite', 'wheels:overlay', 'wheels:merge', ['*Synastry* lays your chart over theirs,', 'to see how you affect each other.'], ['A *composite* blends both charts into one,', 'the chart of the relationship itself.'], ['Synastry is the *two of you.*', 'A composite is the *us.*'], { say: ['synastry', 'a composite chart'] }],
  ['S', 'Direct', 'Retrograde', 'planet:☿:mint:0', 'loop', ['A planet is *direct*', 'when it moves forward through the signs.'], ['*Retrograde* is when it seems to move backward.', 'It\'s an illusion from our own orbit.'], ['Nothing really goes *backward.*', 'Earth is just *passing* it.']],
  ['S', 'Venus sign', '7th house', 'venus', 'chart', ['Your *Venus sign* is how you love.'], ['Your *seventh house* is the kind of partner', 'you\'re drawn to.'], ['Venus is your *style.*', 'The seventh house is your *type.*'], { say: ['your Venus sign', 'your seventh house'] }],
  ['S', 'Element', 'Modality', 'orbs:FIRE,EARTH,AIR,WATER:mars,gold,mint,blue', 'orbs:START,HOLD,ADAPT:gold,rose,mint', ['Your *element* is what you\'re made of.', 'Fire, earth, air or water.'], ['Your *modality* is how you move.', 'Cardinal starts, fixed holds, mutable adapts.'], ['Element is the *fuel.*', 'Modality is the *driving style.*']],
  ['S', 'Rising', 'Moon', 'rising', 'planet:☽:lilac:0', ['Your *rising* is how you come across', 'before people know you.'], ['Your *moon* is who they meet', 'once they do.'], ['Rising is the *front door.*', 'The moon is the *living room.*'], { say: ['your rising', 'your moon'] }],
  ['S', 'Mercury', 'Venus', 'planet:☿:mint:0', 'venus', ['*Mercury* is how you talk and think.'], ['*Venus* is how you love,', 'and what you value.'], ['Mercury writes the *text.*', 'Venus decides who *gets* it.']],
  ['S', 'Saturn return', 'Jupiter return', 'planet:♄:blue:0', 'planet:♃:gold:0', ['*Saturn* takes about twenty nine years', 'to come back to where it was when you were born.'], ['*Jupiter* takes about twelve.'], ['A Saturn return asks you to *grow up.*', 'A Jupiter return asks you to *grow.*'], { say: ['a Saturn return', 'a Jupiter return'] }],
  ['S', 'On the cusp', 'Your sign', 'slices', 'sign:♉:gold', ['Being *on the cusp* means', 'you were born near the edge of two signs.'], ['But the sun is always in *one* of them.', 'Your birth time decides which.'], ['You can feel like *both.*', 'Your chart still picks *one.*'], { say: ['being on the cusp', 'your sign'] }],
  ['S', 'Western', 'Vedic', 'slices', 'constellation', ['*Western* astrology ties the signs', 'to the seasons.'], ['*Vedic* astrology ties them to the stars,', 'about twenty four degrees away.'], ['That\'s why your Vedic sign', 'is often the one *before.*'], { say: ['Western astrology', 'Vedic astrology'] }],
  ['S', 'Ascendant', 'Descendant', 'rising', 'sign:♎:rose', ['Your *ascendant* was rising in the east', 'when you were born.'], ['Your *descendant* was setting in the west,', 'exactly opposite.'], ['One is how you *show up.*', 'The other is what you look for in a *partner.*']],
  ['S', 'Conjunction', 'Opposition', 'aspect:conjunction', 'aspect:opposition', ['A *conjunction* is two planets', 'in the same place, blending.'], ['An *opposition* is two planets', 'across the sky, pulling.'], ['One *merges.*', 'One *balances.*'], { say: ['a conjunction', 'an opposition'] }],
  ['S', 'Trine', 'Square', 'aspect:trine', 'aspect:square', ['A *trine* is planets a third of the sky apart.', 'Easy and flowing.'], ['A *square* is a quarter apart.', 'Friction that pushes you.'], ['Trines are *gifts.*', 'Squares are *growth.*'], { say: ['a trine', 'a square'] }],
  ['S', 'New moon', 'Full moon', 'moon:new', 'moon:full', ['A *new moon* sits between us and the sun.', 'Dark, a beginning.'], ['A *full moon* has the earth between them.', 'Lit up, a peak.'], ['New moons *plant.*', 'Full moons *harvest.*'], { say: ['a new moon', 'a full moon'] }],
  ['S', 'Waxing', 'Waning', 'moon:waxing', 'moon:waning', ['*Waxing* is the moon', 'growing brighter each night.'], ['*Waning* is the moon', 'shrinking back toward dark.'], ['Waxing *builds.*', 'Waning *lets go.*']],
  ['S', 'Solar eclipse', 'Lunar eclipse', 'eclipse:solar', 'eclipse:lunar', ['A *solar eclipse* is the moon', 'blocking the sun.'], ['A *lunar eclipse* is the earth\'s shadow', 'falling on the moon.'], ['Solar eclipses come at a *new moon.*', 'Lunar ones at a *full moon.*'], { say: ['a solar eclipse', 'a lunar eclipse'] }],
  ['S', 'Fire', 'Water', 'sign:♈:mars', 'sign:♋:blue', ['*Fire* signs act first,', 'and feel later.'], ['*Water* signs feel first,', 'and act later.'], ['Fire brings the *heat.*', 'Water brings the *depth.*'], { say: ['fire signs', 'water signs'] }],
  ['S', 'Earth', 'Air', 'sign:♉:gold', 'sign:♊:mint', ['*Earth* signs trust', 'what they can touch.'], ['*Air* signs trust', 'what they can talk through.'], ['Earth *builds* it.', 'Air *explains* it.'], { say: ['earth signs', 'air signs'] }],
  ['S', 'Cardinal', 'Fixed', 'glyphs:♈♋♎♑:gold', 'glyphs:♉♌♏♒:rose', ['*Cardinal* signs start things.', 'Aries, Cancer, Libra, Capricorn.'], ['*Fixed* signs keep things going.', 'Taurus, Leo, Scorpio, Aquarius.'], ['Cardinal opens the *door.*', 'Fixed won\'t let it *close.*'], { say: ['cardinal signs', 'fixed signs'] }],
  ['S', 'Planet', 'Sign', 'venus', 'sign:♌:gold', ['A *planet* is the what.', 'Venus is love, Mars is drive.'], ['A *sign* is the how.', 'Venus in Leo loves out loud.'], ['The planet is the *actor.*', 'The sign is the *costume.*'], { say: ['a planet', 'a sign'] }],
  ['S', 'Star sign', 'Sun sign', 'constellation', 'sun', ['*Star sign* is what most people call it.'], ['*Sun sign* is the astrologer\'s word.', 'They\'re the same thing.'], ['Trick question.', 'But your *moon sign* is a different story.'], { hook: 'This one is a trick question.' }],
  ['S', 'Mercury retrograde', 'Bad luck', 'loop', 'solo:storm:blue', ['*Mercury retrograde* is a real effect we see from Earth,', 'about three times a year.'], ['*Bad luck* is everything else', 'people blame on it.'], ['Back up your *phone.*', 'Then stop blaming *Mercury.*']],
  ['S', 'Big three', 'Full chart', 'glyphs:☉☽✦:gold', 'chart', ['Your *big three* is your sun,', 'your moon, and your rising.'], ['Your *full chart* adds every planet,', 'and all twelve houses.'], ['The big three is the *headline.*', 'The chart is the *whole story.*'], { say: ['your big three', 'your full chart'], end: 'three' }],
  ['S', 'Sun sign', 'Chart ruler', 'sun', 'planet:♃:gold:0', ['Your *sun sign* is the sign', 'the sun was in.'], ['Your *chart ruler* is the planet', 'that rules your rising sign.'], ['Leo rising?', 'Then the sun runs your *whole chart.*'], { say: ['your sun sign', 'your chart ruler'] }],
  ['S', 'Aries', 'Leo', 'sign:♈:mars', 'sign:♌:gold', ['*Aries* wants to be first.'], ['*Leo* wants to be seen.'], ['Aries *races.*', 'Leo *performs.*']],
  ['S', 'Virgo', 'Capricorn', 'sign:♍:mint', 'sign:♑:blue', ['*Virgo* perfects the details.'], ['*Capricorn* builds the empire.'], ['Virgo asks, is it *right.*', 'Capricorn asks, is it *working.*']],
  ['S', 'Cancer', 'Scorpio', 'sign:♋:blue', 'sign:♏:rose', ['*Cancer* protects its feelings', 'with a shell.'], ['*Scorpio* protects them', 'with a sting.'], ['Cancer *hides* to stay safe.', 'Scorpio *watches.*']],
  ['S', 'Gemini', 'Sagittarius', 'sign:♊:mint', 'sign:♐:lilac', ['*Gemini* wants to know', 'a little about everything.'], ['*Sagittarius* wants to know', 'what it all means.'], ['Gemini asks *what.*', 'Sagittarius asks *why.*']],
  ['S', 'Pisces', 'Aquarius', 'sign:♓:lilac', 'sign:♒:blue', ['*Pisces* feels everyone\'s feelings.'], ['*Aquarius* thinks about everyone\'s future.'], ['Pisces is the *heart* of the crowd.', 'Aquarius is its *mind.*']],
  ['S', 'Taurus', 'Libra', 'sign:♉:gold', 'sign:♎:rose', ['*Taurus* is Venus through the senses.', 'Food, touch, comfort.'], ['*Libra* is Venus through people.', 'Beauty, balance, fairness.'], ['Same ruling planet.', 'Taurus *feels* it. Libra *shares* it.']],
  ['S', 'Horoscope', 'Birth chart', 'horoscope', 'chart', ['A *horoscope* is written for your sun sign.', 'You share it with one in twelve people.'], ['A *birth chart* is the whole sky', 'at your exact minute and place.'], ['A horoscope is a *forecast.*', 'A birth chart is a *map.*'], { say: ['a horoscope', 'a birth chart'], end: 'free' }],
]

const HOOKS = {
  L: [
    'Most people use these like they mean the same thing.',
    'These two get mixed up all the time.',
    'You\'ve felt both. Can you tell them apart?',
    'Same feeling? Not even close.',
    'This one changes how you date.',
    'Two words, one big difference.',
    'Ten seconds, and you\'ll never mix these up again.',
    'If someone has ever confused you, it\'s probably this.',
  ],
  S: [
    'Even people who know their sign mix these up.',
    'Two astrology words, one big difference.',
    'Your chart has both. Do you know which is which?',
    'Most people never learn this one.',
    'Ten seconds, and you\'ll read your chart better.',
  ],
}

const ENDS = {
  share: { lines: ['Send this to someone', 'who mixes them up.'], pill: 'SEND THIS TO SOMEONE' },
  friend: { lines: ['Send this to the friend', 'who needs to hear it.'], pill: 'SEND THIS TO SOMEONE' },
  save: { lines: ['Save this for the next time', 'you\'re not sure.'], pill: 'SAVE THIS FOR LATER' },
  flip: { lines: ['On the Align app,', 'a card only flips when you *both* align.'], pill: 'ALIGN · LINK IN BIO' },
  sky: { lines: ['It\'s why the Align app shows you', 'someone\'s sky before their face.'], pill: 'ALIGN · LINK IN BIO' },
  deal: { lines: ['On the Align app,', 'your dealbreakers go right on your card.'], pill: 'ALIGN · LINK IN BIO' },
  free: { lines: ['Your full chart is free', 'on the Align app.'], pill: 'YOUR CHART · LINK IN BIO' },
  three: { lines: ['It\'s why the Align app reads your *big three,*', 'not just your sun.'], pill: 'ALIGN · LINK IN BIO' },
  sun: { lines: ['Send this to someone', 'who only knows their sun sign.'], pill: 'SEND THIS TO SOMEONE' },
}
const ROTATE = { L: ['share', 'friend', 'sky', 'save', 'flip', 'share', 'friend', 'deal'], S: ['share', 'free', 'sun', 'three', 'save'] }

const TAGS = {
  L: ['relationshipadvice', 'datingtips', 'psychologyfacts', 'love', 'whatsthedifference'],
  S: ['astrology', 'zodiacsigns', 'birthchart', 'astrologyfacts', 'whatsthedifference'],
}

const plain = (s) => s.replace(/\*/g, '')
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const cap = (s) => s[0].toUpperCase() + s.slice(1)

if (P.length !== 100) throw new Error(`the bank has ${P.length} pairs, not 100`)
mkdirSync(OUT, { recursive: true })
for (const f of readdirSync(OUT)) rmSync(path.join(OUT, f))

const count = { L: 0, S: 0 }
P.forEach(([cat, a, b, artA, artB, ea, eb, diff, extra = {}], i) => {
  const n = count[cat]++
  const [sa, sb] = extra.say ?? [a.toLowerCase(), b.toLowerCase()]
  const hook = extra.hook ?? HOOKS[cat][(n * 3 + i) % HOOKS[cat].length]
  const end = ENDS[extra.end ?? ROTATE[cat][n % ROTATE[cat].length]]
  const lines = [...ea, ...eb, ...diff, hook, ...end.lines].join(' ')
  if (/compatib/i.test(lines + a + b)) throw new Error(`pair ${i + 1}: never "compatibility"`)
  if (/[!0-9]/.test(lines)) throw new Error(`pair ${i + 1}: no exclamation marks or digits in spoken lines: ${lines}`)
  if (/\w-\w/.test(lines)) throw new Error(`pair ${i + 1}: no hyphens in spoken lines`)
  const id = `${String(i + 1).padStart(3, '0')}-${slug(a)}-vs-${slug(b)}`
  const script = {
    id,
    title: `${a} vs ${b}`,
    cover: 'What\'s the difference?',
    voice: 'af_heart',
    speed: 1.12,
    caption: `${a.toLowerCase()} vs ${b.toLowerCase()}: what's the difference? ${cat === 'L' ? '💭' : '🌙'}\n${diff.map(plain).join(' ')}`,
    cta: `${cat === 'L' ? 'send this to someone who mixes them up 👀' : 'send this to someone who only knows their sun sign 👀'}\nyour full chart is free on align, link in bio`,
    hashtags: TAGS[cat],
    pairs: [{
      a: { label: a, art: artA },
      b: { label: b, art: artB },
      ask: [hook, `*${cap(sa)}* versus *${sb}.*`],
      explainA: ea,
      explainB: eb,
      diff,
    }],
    end: end,
  }
  writeFileSync(path.join(OUT, `${id}.json`), JSON.stringify(script, null, 2) + '\n')
})
console.log(`wrote ${P.length} scripts → ${path.relative(process.cwd(), OUT)} (${count.L} love, ${count.S} stars)`)
