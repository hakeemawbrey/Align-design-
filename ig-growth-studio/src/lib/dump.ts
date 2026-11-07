import type { InStatement } from "@libsql/client";
import type { DB } from "./db";

/** Everything the app stores, in dependency order. */
export const DUMP_TABLES = ["settings", "accounts", "posts", "niche_accounts", "likes", "follower_snapshots", "reply_drafts"] as const;

type Value = string | number | null;
export interface Dump {
  tables: Record<string, { columns: string[]; rows: Value[][] }>;
}

export async function exportDump(db: DB): Promise<Dump> {
  const tables: Dump["tables"] = {};
  for (const t of DUMP_TABLES) {
    const rs = await db.execute(`SELECT * FROM ${t}`);
    tables[t] = { columns: rs.columns, rows: rs.rows.map((r) => rs.columns.map((_, i) => r[i] as Value)) };
  }
  return { tables };
}

async function count(db: DB, table: string) {
  return Number((await db.execute(`SELECT COUNT(*) AS n FROM ${table}`)).rows[0].n);
}

/**
 * Loads a dump into an (empty) database in one transaction. Refuses if accounts or posts already exist,
 * unless `replace` is set, which wipes them first. `dryRun` only reports counts.
 */
export async function importDump(db: DB, dump: Dump, opts: { replace?: boolean; dryRun?: boolean } = {}) {
  const before = { accounts: await count(db, "accounts"), posts: await count(db, "posts") };
  const incoming: Record<string, number> = {};
  const statements: InStatement[] = [];
  if (opts.replace) for (const t of [...DUMP_TABLES].reverse()) if (t !== "settings") statements.push(`DELETE FROM ${t}`);
  for (const t of DUMP_TABLES) {
    const table = dump.tables[t];
    if (!table) continue;
    // Column names come from our own schema; reject anything else.
    if (!table.columns.every((c) => /^[a-z_]+$/.test(c))) throw new Error(`Bad column name in ${t}`);
    incoming[t] = table.rows.length;
    const sql = `INSERT OR REPLACE INTO ${t} (${table.columns.join(", ")}) VALUES (${table.columns.map(() => "?").join(", ")})`;
    for (const row of table.rows) statements.push({ sql, args: row });
  }
  if ((before.accounts || before.posts) && !opts.replace) {
    return { ok: false as const, error: "Cloud database is not empty; send replace: true to overwrite it.", before, incoming };
  }
  if (opts.dryRun) return { ok: true as const, dryRun: true, before, incoming };
  await db.batch(statements, "write");
  return { ok: true as const, before, incoming, after: { accounts: await count(db, "accounts"), posts: await count(db, "posts") } };
}
