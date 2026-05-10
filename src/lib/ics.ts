import { Week } from './types';
import { ukOffset, NIGERIA_OFFSET } from './timezone';

const YEAR = 2026;

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function formatICSDate(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`
  );
}

function escapeICS(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n');
}

/** Converts a local hour to UTC using the correct DST offset for that date. */
function toUTC(localHour: number, month: number, day: number): number {
  return localHour - ukOffset(YEAR, month, day);
}

// Parses "7:30–8:30pm" or "4:00–5:00pm" (en-dash or plain hyphen)
function parseEveningTime(
  timeStr: string,
  month: number,
  day: number
): { start: string; end: string } | null {
  const match = timeStr.match(/(\d+):(\d+)[–\-](\d+):(\d+)(am|pm)/i);
  if (!match) return null;

  let sh = parseInt(match[1]);
  let sm = parseInt(match[2]);
  let eh = parseInt(match[3]);
  let em = parseInt(match[4]);

  if (match[5].toLowerCase() === 'pm') {
    if (sh < 12) sh += 12;
    if (eh < 12) eh += 12;
  } else {
    if (sh === 12) sh = 0;
    if (eh === 12) eh = 0;
  }

  // Apply per-date UK DST offset
  const startUTC = new Date(Date.UTC(YEAR, month - 1, day, toUTC(sh, month, day), sm, 0));
  const endUTC   = new Date(Date.UTC(YEAR, month - 1, day, toUTC(eh, month, day), em, 0));
  return { start: formatICSDate(startUTC), end: formatICSDate(endUTC) };
}

// Parses "14:10–15:10" (24-hour school session time, UK local)
function parseSchoolTime(
  timeStr: string,
  month: number,
  day: number
): { start: string; end: string } | null {
  const match = timeStr.match(/(\d+):(\d+)[–\-](\d+):(\d+)/);
  if (!match) return null;

  const sh = parseInt(match[1]);
  const sm = parseInt(match[2]);
  const eh = parseInt(match[3]);
  const em = parseInt(match[4]);

  const startUTC = new Date(Date.UTC(YEAR, month - 1, day, toUTC(sh, month, day), sm, 0));
  const endUTC   = new Date(Date.UTC(YEAR, month - 1, day, toUTC(eh, month, day), em, 0));
  return { start: formatICSDate(startUTC), end: formatICSDate(endUTC) };
}

function examTimes(
  timeLabel: string,
  month: number,
  day: number
): { start: string; end: string } {
  // Standard UK exam slot times (local)
  let sh: number, sm: number, eh: number, em: number;
  if (timeLabel.includes('AM + PM')) {
    sh = 9;  sm = 0; eh = 15; em = 30;
  } else if (timeLabel.includes('AM')) {
    sh = 9;  sm = 0; eh = 12; em = 0;
  } else {
    sh = 13; sm = 0; eh = 15; em = 30;
  }
  const startUTC = new Date(Date.UTC(YEAR, month - 1, day, toUTC(sh, month, day), sm, 0));
  const endUTC   = new Date(Date.UTC(YEAR, month - 1, day, toUTC(eh, month, day), em, 0));
  return { start: formatICSDate(startUTC), end: formatICSDate(endUTC) };
}

export function generateICS(weeks: Week[]): string {
  const dtstamp = formatICSDate(new Date());
  let uid = 1;
  const events: string[] = [];

  for (const week of weeks) {
    for (const day of week.days) {
      const { d, m } = day;
      const tzLabel = ukOffset(YEAR, m, d) === 1 ? 'BST' : 'GMT';

      if (day.exam) {
        const times = examTimes(day.exam.time, m, d);
        events.push([
          'BEGIN:VEVENT',
          `DTSTART:${times.start}`,
          `DTEND:${times.end}`,
          `DTSTAMP:${dtstamp}`,
          `UID:eniola-exam-${uid++}@gcse2026`,
          `SUMMARY:Exam: ${escapeICS(day.exam.subj)}`,
          `DESCRIPTION:Board: ${escapeICS(day.exam.board)}\\nTime: ${escapeICS(day.exam.time)} (UK ${tzLabel})`,
          'CATEGORIES:EXAM',
          'END:VEVENT',
        ].join('\r\n'));
      }

      for (const t of day.tutor) {
        const times = parseEveningTime(t.uk, m, d);
        if (!times) continue;
        events.push([
          'BEGIN:VEVENT',
          `DTSTART:${times.start}`,
          `DTEND:${times.end}`,
          `DTSTAMP:${dtstamp}`,
          `UID:eniola-tutor-${uid++}@gcse2026`,
          `SUMMARY:Tutor: ${escapeICS(t.subj)}${t.moved ? ' (Reshuffled)' : ''}`,
          `DESCRIPTION:Teacher: ${escapeICS(t.teacher)}\\nUK: ${escapeICS(t.uk)} ${tzLabel}\\nNG: ${escapeICS(t.ng)} ${NIGERIA_LABEL}${t.moved ? '\\nNote: ' + escapeICS(t.reason) : ''}`,
          'CATEGORIES:TUTOR',
          'END:VEVENT',
        ].join('\r\n'));
      }

      for (const s of day.sch) {
        const times = parseSchoolTime(s.time, m, d);
        if (!times) continue;
        events.push([
          'BEGIN:VEVENT',
          `DTSTART:${times.start}`,
          `DTEND:${times.end}`,
          `DTSTAMP:${dtstamp}`,
          `UID:eniola-school-${uid++}@gcse2026`,
          `SUMMARY:School: ${escapeICS(s.subj)}`,
          `DESCRIPTION:Teacher: ${escapeICS(s.teacher)}\\nTime: ${escapeICS(s.time)} (UK ${tzLabel})`,
          'CATEGORIES:SCHOOL',
          'END:VEVENT',
        ].join('\r\n'));
      }
    }
  }

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tresbon Tech Academy//Eniola GCSE Calendar 2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Eniola GCSE 2026',
    'X-WR-TIMEZONE:Europe/London',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');
}

// Re-export for convenience
export const NIGERIA_LABEL = 'WAT';
