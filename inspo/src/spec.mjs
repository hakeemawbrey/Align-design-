// Your review → instructions for Claude Code to build (and keep feeding) an
// endless Align content generator. Rewritten every time you save a pick.
//
// Self-contained (no imports): the build also bakes this file into the review
// page, so the page can show and copy the same instructions.

export function generatorSpec({ items, decisions, uses, spins, now = new Date().toISOString() }) {
  const byId = new Map(items.map((i) => [i.id, i]))
  const useLabel = (k) => uses.find((u) => u.key === k)?.label ?? k
  const one = (s) => (s || '').replace(/\s+/g, ' ').trim()
  const short = (s, n) => { const t = one(s); return t.length > n ? t.slice(0, n - 1) + '…' : t }
  const rows = Object.entries(decisions)
    .filter(([id, d]) => byId.has(id) && d)
    .map(([id, d]) => ({ ...byId.get(id), ...d }))
    .sort((a, b) => a.id.localeCompare(b.id))
  const use = rows.filter((r) => r.status === 'accepted')
  const maybe = rows.filter((r) => r.status === 'maybe')
  const skip = rows.filter((r) => r.status === 'rejected')
  const notes = rows.filter((r) => one(r.feedback))

  // Which spin library entries the founder actually picked, so the generator can weight them.
  const spinCounts = {}
  for (const r of [...use, ...maybe]) for (const s of spins) if (one(r.spin).includes(one(s.spin).slice(0, 60))) spinCounts[s.id] = (spinCounts[s.id] || 0) + (r.status === 'accepted' ? 3 : 1)
  const useCounts = {}
  for (const r of use) for (const u of r.uses || []) useCounts[u] = (useCounts[u] || 0) + 1

  const recipe = (r) => [
    `### ${r.id} · @${r.creator} · ${r.type}${r.status === 'maybe' ? ' · maybe (weight 1)' : ' · use (weight 3)'}`,
    `- Source: ${r.url}${r.about ? ` · "${short(r.about, 180)}"` : ''}`,
    `- Take: ${(r.uses || []).map(useLabel).join(', ') || '(not ticked: infer from the feedback)'}`,
    one(r.feedback) ? `- Founder's feedback: ${one(r.feedback)}` : null,
    one(r.spin) ? `- **Align spin:** ${one(r.spin)}` : '- Align spin: none written yet; pick from the spin library below, guided by Take.',
  ].filter(Boolean).join('\n')

  return [
    '# Build: the Align infinite content generator',
    '',
    `_Written from the founder's inspo review on ${now.slice(0, 10)}: ${use.length} to use, ${maybe.length} maybe, ${skip.length} skipped, ${notes.length} with written feedback, out of ${items.length} posts. This file is regenerated every time a pick is saved; rebuild the generator's recipe deck from it whenever it changes._`,
    '',
    '## To Claude Code',
    '',
    'Build a program at `generator/` (Node, ES modules, no paid services) that turns the recipes below into an endless supply of new Align content, in Align\'s voice, without ever repeating itself.',
    '',
    '1. **Recipe deck.** Parse this file (or `inspo/out/accepted.json` + `inspo/data/decisions.json`) into recipes: format, what to take, the founder\'s feedback, the Align spin. "Use" recipes weigh 3, "maybe" weigh 1. Re-read on every run so new picks flow in.',
    '2. **Variables.** Cross each recipe with things that change: the 12 signs; tonight\'s real sky (moon phase, retrogrades, ingresses; compute with an ephemeris library, never guess dates); Align features and true facts from `founder/data/align-brief.json`; story angles and hook types from `founder/src/library.mjs`; the 51 talk cards in `app/src`; Align vocabulary (deal, deck, align, release, peek, veil, reveal, 11:11). Recipes × variables give thousands of distinct pieces; when they run low, ask Claude to propose new variables in the same voice.',
    '3. **Never repeat.** Hash recipe id + variables + hook and keep a ledger in `generator/data/made.json`. Also reject anything too close to an earlier piece (same first line, same sign and format within 14 days).',
    '4. **Write the piece.** For each pick, write a complete script in the shape the repo already renders: reels → `reels/scripts/*.json` (or Align Town in `reels/town/`), carousels → `carousel/content/*.json`, talking-head → founder scripts (`founder/out/scripts/*.json`). Read those schemas first and validate against them. Use Claude (Anthropic API, the latest model) for the writing, with the recipe, the variables, the voice rules and the taste rules below in the prompt.',
    '5. **Hard rules.** Carry over structure only: never their words, footage, audio, likeness or captions. Follow the founder\'s Align spin over everything else. Every "Skip it" reason below is an avoid rule. Voice rules from `founder/data/align-brief.json` → `voice.rules`: short sentences, no exclamation marks, no emoji in lines, no "manifest", no therapy jargon, astrology reads and never decides, never "download Align", at most two Align vocabulary words per piece. Anything only the founder knows (a real number, a date) stays a `[bracket]`. Write a check that fails a piece on any of these.',
    '6. **Learn from results.** Read `instagram/data/posts.json` (skip rate, average watch, shares, saves from trial reels). Recipes whose pieces beat the median skip rate get their weight doubled; ones that lose three times running get halved. Log every change.',
    '7. **Run it.** `npm run make -- --count 10 [--kind reel|carousel|talking] [--sign leo] [--recipe i0002]` writes a batch and prints a table; `npm run make -- --daily` makes one day\'s batch (for example 3 reels and 1 carousel) and is safe to schedule. Hand the reels to `reels/` to render and to `instagram/` to post as trial reels.',
    '8. **Test it.** No network in tests (fake Claude and Meta). Cover: deck parsing, weighting, the no-repeat ledger, every voice rule, schema validation, and that a skipped post\'s reason blocks a matching piece.',
    '',
    '## Taste rules (the founder\'s own words)',
    '',
    notes.length ? 'Treat each line as a rule for every piece, not just its recipe.' : '_No written feedback yet. As the founder reviews, their notes land here._',
    '',
    ...notes.map((r) => `- (${r.status === 'rejected' ? 'avoid' : r.status === 'maybe' ? 'maybe' : 'use'}, ${r.id} @${r.creator}) ${one(r.feedback)}`),
    '',
    '## What they want to take most',
    '',
    Object.keys(useCounts).length
      ? Object.entries(useCounts).sort((a, b) => b[1] - a[1]).map(([k, n]) => `- ${useLabel(k)}: ${n}`).join('\n')
      : '_Nothing ticked yet._',
    '',
    `## Recipes (${use.length + maybe.length})`,
    '',
    ...(use.length + maybe.length ? [...use, ...maybe].map((r) => recipe(r) + '\n') : ['_No posts marked "Use it" or "Maybe" yet._', '']),
    `## Avoid (${skip.length} skipped)`,
    '',
    ...skip.filter((r) => one(r.feedback) || one(r.spin)).map((r) => `- ${r.id} @${r.creator}: ${one(r.feedback) || one(r.spin)}`),
    skip.some((r) => !one(r.feedback) && !one(r.spin)) ? `- ${skip.filter((r) => !one(r.feedback) && !one(r.spin)).length} more skipped without a reason. Don't copy their formats: ${[...new Set(skip.filter((r) => !one(r.feedback)).map((r) => r.type))].join(', ')} by ${skip.filter((r) => !one(r.feedback)).slice(0, 12).map((r) => '@' + r.creator).join(', ')}${skip.length > 12 ? '…' : ''}.` : '',
    '',
    '## Spin library',
    '',
    'Ready-made Align spins (the review page suggests them per post). Use them as extra recipes when a variable fits, weighted by how often the founder picked them' + (Object.keys(spinCounts).length ? ' (picked: ' + Object.entries(spinCounts).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ×${n}`).join(', ') + ')' : '') + '.',
    '',
    ...spins.map((s) => `- **${s.name}** (\`${s.id}\`, ${s.uses.map(useLabel).join(', ')}): ${s.spin}`),
    '',
  ].join('\n')
}
