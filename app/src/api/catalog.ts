import { BONUS, COMETS, DECK, MORE, TONIGHT, type Profile } from '../data/profiles'

/**
 * The seeded profiles as the database has them. Cards already in the app are
 * updated in place (name, bio, photo, reading…); new rows with a deal order
 * join tonight's deal, and new comets join the comet pool. So the deck can be
 * edited in Supabase without shipping a new build.
 */
export function hydrateCatalog(rows: Profile[]) {
  const all = [...DECK, ...BONUS, ...MORE, ...COMETS]
  for (const row of rows) {
    const have = all.find((p) => p.id === row.id)
    if (have) {
      // keep the app's photo path when the database has none
      Object.assign(have, { ...row, photo: row.photo ?? have.photo, real: false })
    }
  }
  const known = new Set(all.map((p) => p.id))
  const fresh = rows.filter((r) => !known.has(r.id))
  // rows the app has never seen: comets to the comet pool, the rest to the end of the deal
  for (const r of fresh) (r.comet ? COMETS : TONIGHT).push(r)
}
