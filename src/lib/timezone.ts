// ── UK DST rules ───────────────────────────────────────────
// Clocks go forward: last Sunday of March  at 01:00 GMT → BST (UTC+1)
// Clocks go back:   last Sunday of October at 02:00 BST → GMT (UTC+0)

function lastSundayOf(year: number, month: number): number {
  // month is 1-based. day-0 trick gives the last day of that month.
  const last = new Date(year, month, 0);
  return last.getDate() - last.getDay(); // subtract days-past-sunday
}

/** Returns the UTC offset for the UK on a given calendar date (0 = GMT, 1 = BST). */
export function ukOffset(year: number, month: number, day: number): 0 | 1 {
  const springDay = lastSundayOf(year, 3);  // last Sunday of March
  const fallDay   = lastSundayOf(year, 10); // last Sunday of October

  const d       = new Date(year, month - 1, day);
  const spring  = new Date(year, 2,  springDay); // March  (index 2)
  const fallBack = new Date(year, 9, fallDay);   // October (index 9)

  return d >= spring && d < fallBack ? 1 : 0;
}

/** Returns "BST" or "GMT" for the UK on a given date. */
export function ukTimezoneLabel(year: number, month: number, day: number): 'BST' | 'GMT' {
  return ukOffset(year, month, day) === 1 ? 'BST' : 'GMT';
}

// Nigeria (WAT) is always UTC+1, no DST.
export const NIGERIA_OFFSET = 1;
export const NIGERIA_LABEL  = 'WAT';

// ── Viewer timezone ─────────────────────────────────────────
export interface ViewerTZ {
  timezone: string;   // IANA name, e.g. "America/New_York"
  offsetHours: number; // e.g. -5
  label: string;      // e.g. "UTC-5"
}

export function getViewerTZ(): ViewerTZ {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offsetMins = -new Date().getTimezoneOffset(); // positive = east of UTC
  const offsetHours = offsetMins / 60;
  const sign = offsetHours >= 0 ? '+' : '';
  const label = `UTC${sign}${Number.isInteger(offsetHours) ? offsetHours : offsetHours.toFixed(1)}`;
  return { timezone, offsetHours, label };
}

/** Friendly short label for display, e.g. "London", "Lagos", "New York". */
export function shortTZName(ianaName: string): string {
  const parts = ianaName.split('/');
  return parts[parts.length - 1].replace(/_/g, ' ');
}
