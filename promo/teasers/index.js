// Registry of teasers. Each module default-exports:
//   { id, title, duration, build(stage) → { update(t), fx?(ctx, t) }, cues: [[kind, t, ...args]], music: { chords: [[t0, t1, [hz...]]], bpm?, beatFrom?, beatTo? } }
// Sound kinds: 'tick' (t, gain) · 'whoosh' (t, len, gain) · 'bell' (t, hz, gain, decay, pan) · 'boom' (t, gain) · 'glitter' (t0, t1) · 'riser' (t0, t1, gain)
export const TEASERS = {}
const LIST = ['L01-chakra', 'L02-moon', 'L03-aura', 'L04-deck', 'L05-zodiac', 'L06-constellation', 'L07-orbit', 'L08-hyperspace', 'L09-talk', 'L10-faith', '01-blind', '02-aligned', '03-moon', '04-chart-card', '05-talk-cards', '06-new-deck', '07-aura', '08-houston', '09-spark-rub-align', '10-faith']
for (const id of LIST) {
  try { const m = await import(`./t${id}.js`); TEASERS[id] = m.default }
  catch (e) { if (!String(e).includes('Failed to fetch') && !String(e).includes('Cannot find module') && !String(e).includes('ERR_MODULE_NOT_FOUND')) console.error(id, e) }
}
