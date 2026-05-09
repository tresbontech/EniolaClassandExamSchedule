import { Week } from './types';

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

// Parses "7:30–8:30pm" or "4:00–5:00pm" (en-dash or hyphen)
function parseEveningTime(
  timeStr: string,
  year: number,
  month: number,
  day: number
): { start: string; end: string } | null {
  const match = timeStr.match(/(\d+):(\d+)[–\-](\d+):(\d+)(am|pm)/i);
  if (!match) return null;

  let sh = parseInt(match[1]);
  let sm = parseInt(match[2]);
  let eh = parseInt(match[3]);
  let em = parseInt(match[4]);
  const period = match[5].toLowerCase();

  if (period === 'pm') {
    if (sh < 12) sh += 12;
    if (eh < 12) eh += 12;
  } else {
    if (sh === 12) sh = 0;
    if (eh === 12) eh = 0;
  }

  // BST (May/Jun) = UTC+1 → subtract 1 for UTC
  sh -= 1;
  eh -= 1;

  const start = new Date(Date.UTC(year, month - 1, day, sh, sm, 0));
  const end = new Date(Date.UTC(year, month - 1, day, eh, em, 0));
  return { start: formatICSDate(start), end: formatICSDate(end) };
}

// Parses "14:10–15:10" (24h school time)
function parseSchoolTime(
  timeStr: string,
  year: number,
  month: number,
  day: number
): { start: string; end: string } | null {
  const match = timeStr.match(/(\d+):(\d+)[–\-](\d+):(\d+)/);
  if (!match) return null;

  const sh = parseInt(match[1]) - 1; // BST → UTC
  const sm = parseInt(match[2]);
  const eh = parseInt(match[3]) - 1;
  const em = parseInt(match[4]);

  const start = new Date(Date.UTC(year, month - 1, day, sh, sm, 0));
  const end = new Date(Date.UTC(year, month - 1, day, eh, em, 0));
  return { start: formatICSDate(start), end: formatICSDate(end) };
}

function examTimes(
  timeLabel: string,
  year: number,
  month: number,
  day: number
): { start: string; end: string } {
  // All times in BST (UTC+1), so subtract 1 for UTC
  let sh: number, sm: number, eh: number, em: number;
  if (timeLabel.includes('AM + PM')) {
    sh = 8; sm = 0; eh = 14; em = 30; // 9am–3:30pm BST
  } else if (timeLabel.includes('AM')) {
    sh = 8; sm = 0; eh = 11; em = 0; // 9am–12pm BST
  } else {
    sh = 12; sm = 0; eh = 14; em = 30; // 1pm–3:30pm BST
  }
  const start = new Date(Date.UTC(year, month - 1, day, sh, sm, 0));
  const end = new Date(Date.UTC(year, month - 1, day, eh, em, 0));
  return { start: formatICSDate(start), end: formatICSDate(end) };
}

export function generateICS(weeks: Week[]): string {
  const dtstamp = formatICSDate(new Date());
  const year = 2026;
  let uid = 1;
  const events: string[] = [];

  for (const week of weeks) {
    for (const day of week.days) {
      const { d, m } = day;

      if (day.exam) {
        const times = examTimes(day.exam.time, year, m, d);
        events.push(
          [
            'BEGIN:VEVENT',
            `DTSTART:${times.start}`,
            `DTEND:${times.end}`,
            `DTSTAMP:${dtstamp}`,
            `UID:eniola-exam-${uid++}@gcse2026`,
            `SUMMARY:Exam: ${escapeICS(day.exam.subj)}`,
            `DESCRIPTION:Board: ${escapeICS(day.exam.board)}\\nTime: ${escapeICS(day.exam.time)}`,
            'CATEGORIES:EXAM',
            'END:VEVENT',
          ].join('\r\n')
        );
      }

      for (const t of day.tutor) {
        const times = parseEveningTime(t.uk, year, m, d);
        if (!times) continue;
        events.push(
          [
            'BEGIN:VEVENT',
            `DTSTART:${times.start}`,
            `DTEND:${times.end}`,
            `DTSTAMP:${dtstamp}`,
            `UID:eniola-tutor-${uid++}@gcse2026`,
            `SUMMARY:Tutor: ${escapeICS(t.subj)}${t.moved ? ' (Reshuffled)' : ''}`,
            `DESCRIPTION:Teacher: ${escapeICS(t.teacher)}\\nUK: ${escapeICS(t.uk)}\\nNG: ${escapeICS(t.ng)}${t.moved ? '\\nNote: ' + escapeICS(t.reason) : ''}`,
            'CATEGORIES:TUTOR',
            'END:VEVENT',
          ].join('\r\n')
        );
      }

      for (const s of day.sch) {
        const times = parseSchoolTime(s.time, year, m, d);
        if (!times) continue;
        events.push(
          [
            'BEGIN:VEVENT',
            `DTSTART:${times.start}`,
            `DTEND:${times.end}`,
            `DTSTAMP:${dtstamp}`,
            `UID:eniola-school-${uid++}@gcse2026`,
            `SUMMARY:School: ${escapeICS(s.subj)}`,
            `DESCRIPTION:Teacher: ${escapeICS(s.teacher)}\\nTime: ${escapeICS(s.time)}`,
            'CATEGORIES:SCHOOL',
            'END:VEVENT',
          ].join('\r\n')
        );
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
