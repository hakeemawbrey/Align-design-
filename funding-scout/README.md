# Funding scout

A scheduled agent searches the public web twice a day (about 7:42am and 4:42pm Houston time) for funding Align can apply for: grants, accelerators, pitch competitions, fellowships, open investor calls, startup credits, and newly announced funds that match Align's profile.

- `opportunities.json`: every opportunity found so far, one object each, deduplicated by `id`.
- `digest.md`: the latest run's new finds and the deadlines coming up, newest run first.

The agent is read only: it never applies, signs up, or contacts anyone. Check each listing's own page before applying.
