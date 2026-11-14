/**
 * Converts the value of <input type="datetime-local"> ("2026-11-02T09:30") to UTC,
 * given the browser's Date#getTimezoneOffset() (minutes, UTC minus local).
 */
export function localToUtc(local: string, tzOffsetMinutes: number): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(local);
  if (!m) return null;
  const [, y, mo, d, h, mi] = m.map(Number);
  const date = new Date(Date.UTC(y, mo - 1, d, h, mi) + tzOffsetMinutes * 60_000);
  return Number.isNaN(date.getTime()) ? null : date;
}
