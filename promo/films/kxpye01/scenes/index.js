// kxpye01: YOUR SIGN AT THE PARTY: EXTENDED, "The ugly sweater party" (≈89 s vertical star_talk post,
// promo/films/month2/m43.md, music: chiptune · C). No end card, no card cut; hard cut on the last line.
// The format lives in ./partyfull.js (shared by kxpye01–06): hook 0–4, twelve 6.6 s sign moments in six chapters,
// the goodbye with THE STARS at 83.2.
//   0.0   frame 0: Leo mid-twirl in a light-up sweater, a camera flash mid-pop, the slam title landed, Pisces mid-sob
//   1.3   "WAIT FOR THE WINNER" · 4.0 THE DOOR · 17.2 THE SWEATERS · 30.4 THE SNACKS · 43.6 THE DANCE FLOOR
//   56.8  THE CONTEST · 70.0 THE GOODBYE (Pisces wins "most festive") · 83.6 "Ugly sweater, *beautiful* night."
import { makeParty } from './partyfull.js'

const SW = ['#d63a4a', '#2f8a4e']
const EP = makeParty({
  id: 'kxpye01',
  title: 'Ugly sweater party. | Who *wins?*',
  promise: 'WAIT FOR THE WINNER',
  chapters: ['THE DOOR', 'THE SWEATERS', 'THE SNACKS', 'THE DANCE FLOOR', 'THE CONTEST', 'THE GOODBYE'],
  hook: { sign: 'leo', act: 'spin', dress: 'sweater', sw: ['#f0a020', '#d63a4a'], mood: 'sparkle', prop: { kind: 'camera', at: 'side', from: 0, k: 0.8 }, say: 'rate my sweater!!', sayAt: 1.0 },
  moments: [
    { sign: 'aries', cap: 'arrives first, sweater *on backwards.*', act: 'leap', from: 900, dress: 'sweater', sw: SW, say: 'FIRST!! where is everyone?', mood2: 'wide', say2: '…is the tag meant to be here?', prop2: { kind: 'sweater', a: '#d63a4a', b: '#2f8a4e', label: 'tag: front and centre' } },
    { sign: 'taurus', cap: 'brings cookies *“for the judges.”*', act: 'walkin', say: 'for the judges. obviously.', say2: 'okay. one for me.', prop: { kind: 'cookies', from: 0.4, label: 'a bribe? no. a gift.' }, hearts: true },
    { sign: 'leo', cap: 'the sweater *plays music.*', act: 'hop', act2: 'dance', dress: 'sweater', sw: ['#f0a020', '#d63a4a'], say: 'press the star. go on.', prop2: { kind: 'boombox', label: 'it also lights up' }, confetti: true, crowd2: true },
    { sign: 'virgo', cap: 'hand-knit. *labelled.*', dress: 'sweater', sw: ['#3f7cf0', BONE()], say: 'took me eleven weekends.', prop: { kind: 'note', lines: ['100% hand-knit', 'wash cold', 'please don’t touch'], from: 0.5, w: 420 }, say2: 'you can look. gently.' },
    { sign: 'cancer', cap: 'brought soup *in a sweater cozy.*', act: 'carry', say: 'it was cold, so…', prop: { kind: 'soup', from: 0.3, col: '#d63a4a', label: 'the soup has a sweater too' }, say2: 'everyone eat. please.', hearts: true },
    { sign: 'gemini', cap: 'compliments *every* sweater. twice.', act: 'laps', say: 'love it! love yours! LOVE—', act2: 'hop', guest: { color: '#ffd1e8', name: 'GUEST', side: 'r', from: 3.0, dress: 'sweater', sw: SW }, say2: 'you said that already!', crowd2: true },
    { sign: 'sagittarius', cap: 'starts a *conga line.*', act: 'dance', say: 'everybody, line up!!', prop2: { kind: 'conga', label: 'the whole party' }, confetti: true, crowd2: true },
    { sign: 'libra', cap: 'meets a stranger in *the same sweater.*', dress: 'sweater', sw: ['#c9a6ff', '#ff8fb1'], say: 'wait. is that…', act2: 'cheer', guest: { color: '#9fe6b0', name: 'STRANGER', side: 'r', from: 0.6, dress: 'sweater', sw: ['#c9a6ff', '#ff8fb1'], mood: 'wide', mood2: 'happy' }, say2: 'TWINS!! best friends now.', hearts: true },
    { sign: 'aquarius', cap: 'the sweater is *“a concept.”*', say: 'it’s a sweater about sweaters.', prop: { kind: 'sweater', a: '#cfd6e6', b: '#cfd6e6', from: 0.5, label: 'the concept' }, mood2: 'sparkle', say2: 'you’re not ready for it.' },
    { sign: 'capricorn', cap: 'judges with *a scoring rubric.*', say: 'criteria are criteria.', prop: { kind: 'list', lines: ['ugliness  9', 'lights  10', 'effort  10'], from: 0.5 }, act2: 'hop', say2: 'and the winner is…', mood2: 'wink' },
    { sign: 'scorpio', cap: 'all black. *one tiny reindeer.*', mood: 'squint', dress: 'sweater', sw: ['#2a2238', '#3a3050'], say: 'it’s festive. look closer.', prop2: { kind: 'sweater', a: '#2a2238', b: '#3a3050', label: 'minimalist, actually' } },
    { sign: 'pisces', cap: 'wins *most festive.* sobs.', act: 'hop', act2: 'cheer', dress: 'sweater', sw: ['#ff8fb1', SW[1]], say: 'me?? I didn’t even— (sob)', prop2: { kind: 'trophy', text: '#1', label: 'most festive' }, say2: 'thank you all SO much…', confetti: true, crowd2: true },
  ],
  last: 'Ugly sweater, *beautiful* night.',
})
function BONE() { return '#efe6d6' }

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
