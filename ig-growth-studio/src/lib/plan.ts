/** Helpers for importing posting plans (CSV) and media links. */

/** Google Drive share/view links become direct downloads Instagram can fetch; other https URLs pass through. */
export function toDirectMediaUrl(link: string): string | null {
  const s = link.trim();
  if (!/^https:\/\//i.test(s)) return null;
  let u: URL;
  try {
    u = new URL(s);
  } catch {
    return null;
  }
  if (/(^|\.)drive\.google\.com$/i.test(u.hostname) || /(^|\.)docs\.google\.com$/i.test(u.hostname)) {
    const id = u.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ?? u.searchParams.get("id");
    if (!id) return null;
    return `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=download&confirm=t`;
  }
  return s;
}

/** RFC 4180 CSV (quoted fields, embedded commas, quotes and newlines) into objects keyed by the header row. */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  const src = text.replace(/^﻿/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [header, ...body] = rows.filter((r) => r.some((f) => f.trim() !== ""));
  if (!header) return [];
  const keys = header.map((h) => h.trim().toLowerCase());
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? ""])));
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/**
 * "Wed 4 Nov" + "8:30 PM" → a Date in this computer's time zone. The year is the one that puts the date
 * nearest to `now` (so a December plan read in January lands in the right year). `shiftDays` moves it.
 */
export function parsePlanTime(date: string, time: string, now = new Date(), shiftDays = 0): Date | null {
  const d = date.trim().match(/(\d{1,2})\s+([A-Za-z]{3})[a-z]*(?:\s+(\d{4}))?/) ?? date.trim().match(/([A-Za-z]{3})[a-z]*\s+(\d{1,2})(?:,?\s+(\d{4}))?/);
  if (!d) return null;
  const [day, mon] = /^\d/.test(d[1]) ? [Number(d[1]), d[2]] : [Number(d[2]), d[1]];
  const month = MONTHS.indexOf(mon.toLowerCase());
  const t = time.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*([AaPp][Mm])?$/);
  if (month < 0 || !t) return null;
  let hour = Number(t[1]);
  const minute = Number(t[2] ?? 0);
  if (t[3]) {
    const pm = t[3].toLowerCase() === "pm";
    if (hour === 12) hour = pm ? 12 : 0;
    else if (pm) hour += 12;
  }
  if (hour > 23 || minute > 59 || day < 1 || day > 31) return null;
  const pick = (year: number) => new Date(year, month, day + shiftDays, hour, minute);
  let when: Date;
  if (d[3]) when = pick(Number(d[3]));
  else {
    const y = now.getFullYear();
    when = [y - 1, y, y + 1].map(pick).sort((a, b) => Math.abs(a.getTime() - now.getTime()) - Math.abs(b.getTime() - now.getTime()))[0];
  }
  return Number.isNaN(when.getTime()) ? null : when;
}
