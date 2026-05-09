'use client';
import { useEffect, useState } from 'react';
import { Day, Exam, TutorSession, SchoolSession } from '@/lib/types';

const MF = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

interface Props {
  day: Day;
  onSave: (day: Day) => void;
  onClose: () => void;
}

const blankTutor = (): TutorSession => ({
  subj: '', teacher: '', uk: '7:00–8:00pm', ng: '8:00–9:00pm',
  moved: false, reason: '', ts: '',
});
const blankSchool = (): SchoolSession => ({ subj: '', teacher: '', time: '09:00–10:00' });
const blankExam = (): Exam => ({ subj: '', board: '', time: 'AM' });

function gcalLink(summary: string, start: string, end: string, details = ''): string {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  return `${base}&text=${encodeURIComponent(summary)}&dates=${start}/${end}&details=${encodeURIComponent(details)}`;
}

function icsDatetime(year: number, month: number, day: number, hour: number, min: number): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  // BST → UTC: subtract 1
  const h = hour - 1;
  return `${year}${pad(month)}${pad(day)}T${pad(h)}${pad(min)}00Z`;
}

function parseHourMin(timeStr: string): { sh: number; sm: number; eh: number; em: number } | null {
  const m = timeStr.match(/(\d+):(\d+)[–\-](\d+):(\d+)(am|pm)/i);
  if (!m) return null;
  let sh = parseInt(m[1]), sm = parseInt(m[2]);
  let eh = parseInt(m[3]), em = parseInt(m[4]);
  if (m[5].toLowerCase() === 'pm') {
    if (sh < 12) sh += 12;
    if (eh < 12) eh += 12;
  }
  return { sh, sm, eh, em };
}

export default function DayModal({ day, onSave, onClose }: Props) {
  const [edited, setEdited] = useState<Day>({
    ...day,
    exam: day.exam ? { ...day.exam } : null,
    tutor: day.tutor.map((t) => ({ ...t })),
    sch: day.sch.map((s) => ({ ...s })),
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Exam helpers
  const setExam = (exam: Exam | null) => setEdited((p) => ({ ...p, exam }));
  const updExam = (field: keyof Exam, val: string) =>
    setEdited((p) => p.exam ? { ...p, exam: { ...p.exam, [field]: val } } : p);

  // Tutor helpers
  const updTutor = (i: number, field: keyof TutorSession, val: string | boolean) =>
    setEdited((p) => ({ ...p, tutor: p.tutor.map((t, j) => j === i ? { ...t, [field]: val } : t) }));
  const addTutor = () => setEdited((p) => ({ ...p, tutor: [...p.tutor, blankTutor()] }));
  const delTutor = (i: number) => setEdited((p) => ({ ...p, tutor: p.tutor.filter((_, j) => j !== i) }));

  // School helpers
  const updSch = (i: number, field: keyof SchoolSession, val: string) =>
    setEdited((p) => ({ ...p, sch: p.sch.map((s, j) => j === i ? { ...s, [field]: val } : s) }));
  const addSch = () => setEdited((p) => ({ ...p, sch: [...p.sch, blankSchool()] }));
  const delSch = (i: number) => setEdited((p) => ({ ...p, sch: p.sch.filter((_, j) => j !== i) }));

  // Google Calendar links for exams
  function examGcal(exam: Exam): string {
    const year = 2026;
    let sh = 8, sm = 0, eh = 11, em = 0;
    if (exam.time.includes('PM')) { sh = 12; sm = 0; eh = 14; em = 30; }
    if (exam.time.includes('AM + PM')) { sh = 8; sm = 0; eh = 14; em = 30; }
    const start = icsDatetime(year, day.m, day.d, sh, sm);
    const end = icsDatetime(year, day.m, day.d, eh, em);
    return gcalLink(`Exam: ${exam.subj}`, start, end, `Board: ${exam.board}`);
  }

  function tutorGcal(t: TutorSession): string {
    const parsed = parseHourMin(t.uk);
    if (!parsed) return '#';
    const { sh, sm, eh, em } = parsed;
    const start = icsDatetime(2026, day.m, day.d, sh, sm);
    const end = icsDatetime(2026, day.m, day.d, eh, em);
    return gcalLink(`Tutor: ${t.subj}${t.moved ? ' (Reshuffled)' : ''}`, start, end,
      `Teacher: ${t.teacher}\nUK: ${t.uk} / NG: ${t.ng}${t.moved ? '\n' + t.reason : ''}`);
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-t-2xl sm:rounded-xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">

        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                {day.nm}, {day.d} {MF[day.m]} 2026
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {edited.exam ? `Exam day · ${edited.exam.board}` : 'Edit any field below'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-gray-600 text-2xl leading-none p-1 -mt-0.5 flex-shrink-0"
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 px-5 py-5 space-y-6">

          {/* ── EXAM ─────────────────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="section-label">Exam</span>
              {edited.exam ? (
                <button onClick={() => setExam(null)} className="btn-danger text-[10px]">Remove</button>
              ) : (
                <button onClick={() => setExam(blankExam())} className="btn-add text-[10px]">+ Add exam</button>
              )}
            </div>

            {edited.exam ? (
              <div className="bg-exam-bg border border-exam-border rounded-lg p-3 space-y-2.5">
                <Label text="Subject">
                  <input className="input-field" value={edited.exam.subj}
                    onChange={(e) => updExam('subj', e.target.value)}
                    placeholder="e.g. Biology Paper 1" />
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Label text="Exam board">
                    <input className="input-field" value={edited.exam.board}
                      onChange={(e) => updExam('board', e.target.value)}
                      placeholder="e.g. AQA" />
                  </Label>
                  <Label text="Slot">
                    <select className="input-field" value={edited.exam.time}
                      onChange={(e) => updExam('time', e.target.value)}>
                      <option>AM</option>
                      <option>PM</option>
                      <option>AM + PM</option>
                    </select>
                  </Label>
                </div>
                <a
                  href={examGcal(edited.exam)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-exam-muted hover:underline mt-1"
                >
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3 1.5A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v1H3v-1ZM1 4h14v9.5A1.5 1.5 0 0 1 13.5 15h-11A1.5 1.5 0 0 1 1 13.5V4Zm4 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5Zm0 2.5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5Z" />
                  </svg>
                  Add this exam to Google Calendar
                </a>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No exam scheduled</p>
            )}
          </section>

          {/* ── TUTOR SESSIONS ────────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="section-label">Tutor Sessions</span>
              <button onClick={addTutor} className="btn-add text-[10px]">+ Add session</button>
            </div>

            {edited.tutor.length === 0 && (
              <p className="text-xs text-gray-400 italic">No tutor sessions</p>
            )}
            <div className="space-y-3">
              {edited.tutor.map((t, i) => (
                <div key={i} className={`rounded-lg border p-3 space-y-2.5 ${t.moved ? 'bg-moved-bg border-moved-border' : 'bg-kept-bg border-kept-border'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${t.moved ? 'text-moved-muted' : 'text-kept-muted'}`}>
                      {t.moved ? '▶ Reshuffled' : '✓ Regular'}
                    </span>
                    <button onClick={() => delTutor(i)} className="text-[10px] text-red-400 hover:text-red-600 font-medium">
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Label text="Subject">
                      <input className="input-field" value={t.subj}
                        onChange={(e) => updTutor(i, 'subj', e.target.value)}
                        placeholder="e.g. Maths" />
                    </Label>
                    <Label text="Teacher">
                      <input className="input-field" value={t.teacher}
                        onChange={(e) => updTutor(i, 'teacher', e.target.value)}
                        placeholder="Teacher name" />
                    </Label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Label text="UK time">
                      <input className="input-field" value={t.uk}
                        onChange={(e) => updTutor(i, 'uk', e.target.value)}
                        placeholder="7:00–8:00pm" />
                    </Label>
                    <Label text="Nigeria time">
                      <input className="input-field" value={t.ng}
                        onChange={(e) => updTutor(i, 'ng', e.target.value)}
                        placeholder="8:00–9:00pm" />
                    </Label>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={t.moved}
                      onChange={(e) => updTutor(i, 'moved', e.target.checked)}
                      className="rounded border-gray-300 text-moved" />
                    <span className="text-xs text-gray-600">Reshuffled / moved</span>
                  </label>

                  {t.moved && (
                    <Label text="Reason">
                      <input className="input-field" value={t.reason}
                        onChange={(e) => updTutor(i, 'reason', e.target.value)}
                        placeholder="Why it was moved" />
                    </Label>
                  )}

                  <a
                    href={tutorGcal(t)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 hover:underline"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3 1.5A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v1H3v-1ZM1 4h14v9.5A1.5 1.5 0 0 1 13.5 15h-11A1.5 1.5 0 0 1 1 13.5V4Zm4 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5Zm0 2.5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5Z" />
                    </svg>
                    Add to Google Calendar
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* ── SCHOOL SESSIONS ───────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="section-label">School Drop-ins</span>
              <button onClick={addSch} className="btn-add text-[10px]">+ Add</button>
            </div>

            {edited.sch.length === 0 && (
              <p className="text-xs text-gray-400 italic">No school sessions</p>
            )}
            <div className="space-y-2">
              {edited.sch.map((s, i) => (
                <div key={i} className="bg-school-bg border border-school-border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-school-muted">Session {i + 1}</span>
                    <button onClick={() => delSch(i)} className="text-[10px] text-red-400 hover:text-red-600 font-medium">Remove</button>
                  </div>
                  <Label text="Subject">
                    <input className="input-field" value={s.subj}
                      onChange={(e) => updSch(i, 'subj', e.target.value)}
                      placeholder="e.g. Biology" />
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Label text="Teacher">
                      <input className="input-field" value={s.teacher}
                        onChange={(e) => updSch(i, 'teacher', e.target.value)}
                        placeholder="Teacher name" />
                    </Label>
                    <Label text="Time (24h)">
                      <input className="input-field" value={s.time}
                        onChange={(e) => updSch(i, 'time', e.target.value)}
                        placeholder="14:10–15:10" />
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── NOTES ─────────────────────────────────── */}
          <section>
            <div className="section-label">Notes</div>
            <textarea
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-800
                         resize-y min-h-[70px] focus:outline-none focus:border-gray-400 bg-white"
              value={edited.notes}
              onChange={(e) => setEdited((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Add notes, reminders, prep tips…"
            />
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-3 flex justify-end gap-2 no-print">
          <button onClick={onClose} className="btn-ghost">Cancel</button>
          <button onClick={() => onSave(edited)} className="btn-primary text-xs">Save changes</button>
        </div>
      </div>
    </div>
  );
}

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] text-gray-400 mb-1">{text}</p>
      {children}
    </div>
  );
}
