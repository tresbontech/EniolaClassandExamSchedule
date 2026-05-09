'use client';
import { useEffect, useState } from 'react';
import { Day, Exam, TutorSession, SchoolSession } from '@/lib/types';
import {
  TUTOR_MAP, TUTOR_SUBJECTS, TUTORS,
  UK_TIME_SLOTS, NG_TIME_SLOTS,
  EXAM_BOARDS,
  SCHOOL_MAP, SCHOOL_SUBJECTS, SCHOOL_TIMES,
  subjectColor,
} from '@/lib/constants';

const MF = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

interface Props {
  day: Day;
  onSave: (day: Day) => void;
  onClose: () => void;
}

const blankTutor = (): TutorSession => ({
  subj: 'Maths', teacher: 'Mr. George Ose',
  uk: '7:00–8:00pm', ng: '8:00–9:00pm',
  moved: false, reason: '', ts: '',
});
const blankSchool = (): SchoolSession => ({ subj: '', teacher: '', time: '11:05–12:05' });
const blankExam = (): Exam => ({ subj: '', board: 'AQA', time: 'AM' });

// ── Helpers ────────────────────────────────────────────────
function gcalLink(summary: string, start: string, end: string, details = '') {
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(summary)}&dates=${start}/${end}&details=${encodeURIComponent(details)}`;
}
function icsDatetime(year: number, month: number, day: number, hour: number, min: number) {
  const p = (n: number) => n.toString().padStart(2, '0');
  return `${year}${p(month)}${p(day)}T${p(hour - 1)}${p(min)}00Z`;
}
function parseHourMin(timeStr: string) {
  const m = timeStr.match(/(\d+):(\d+)[–\-](\d+):(\d+)(am|pm)/i);
  if (!m) return null;
  let sh = +m[1], sm = +m[2], eh = +m[3], em = +m[4];
  if (m[5].toLowerCase() === 'pm') { if (sh < 12) sh += 12; if (eh < 12) eh += 12; }
  return { sh, sm, eh, em };
}

// Returns slot list ensuring the current value is always present
function slotOptions(list: string[], current: string) {
  return current && !list.includes(current) ? [current, ...list] : list;
}

// ── Sub-components ─────────────────────────────────────────
function UpdateBtn({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <button onClick={onClick}
      className={`text-[11px] font-semibold px-3 py-1 rounded-md transition-all duration-200 border ${
        saved ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-gray-900 text-white border-gray-900 hover:bg-gray-700'
      }`}>
      {saved ? '✓ Updated' : 'Update'}
    </button>
  );
}

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return <div><p className="text-[10px] text-gray-400 mb-1">{text}</p>{children}</div>;
}

function CalIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 1.5A1.5 1.5 0 0 1 4.5 0h7A1.5 1.5 0 0 1 13 1.5v1H3v-1ZM1 4h14v9.5A1.5 1.5 0 0 1 13.5 15h-11A1.5 1.5 0 0 1 1 13.5V4Zm4 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5Zm0 2.5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5Z" />
    </svg>
  );
}

// ── Main modal ─────────────────────────────────────────────
export default function DayModal({ day, onSave, onClose }: Props) {
  const [edited, setEdited] = useState<Day>({
    ...day,
    exam:  day.exam  ? { ...day.exam }           : null,
    tutor: day.tutor.map((t) => ({ ...t })),
    sch:   day.sch.map((s) => ({ ...s })),
  });
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const markSaved = (key: string) => {
    setSavedKeys((p) => new Set([...p, key]));
    setTimeout(() => setSavedKeys((p) => { const n = new Set(p); n.delete(key); return n; }), 2000);
  };
  const update = (key: string, snapshot?: Day) => { onSave(snapshot ?? edited); markSaved(key); };

  // ── Exam ───────────────────────────────────────────────
  const setExam = (exam: Exam | null) => { const n = { ...edited, exam }; setEdited(n); onSave(n); };
  const updExam = (field: keyof Exam, val: string) =>
    setEdited((p) => p.exam ? { ...p, exam: { ...p.exam, [field]: val } } : p);

  // ── Tutor ──────────────────────────────────────────────
  const updTutor = (i: number, patch: Partial<TutorSession>) =>
    setEdited((p) => ({ ...p, tutor: p.tutor.map((t, j) => j === i ? { ...t, ...patch } : t) }));

  const onTutorSubjChange = (i: number, subj: string) => {
    const def = TUTOR_MAP[subj];
    updTutor(i, def ? { subj, teacher: def.teacher, uk: def.uk, ng: def.ng } : { subj });
  };

  const addTutor = () => setEdited((p) => ({ ...p, tutor: [...p.tutor, blankTutor()] }));
  const delTutor = (i: number) => {
    const n = { ...edited, tutor: edited.tutor.filter((_, j) => j !== i) };
    setEdited(n); onSave(n);
  };

  // ── School ─────────────────────────────────────────────
  const updSch = (i: number, patch: Partial<SchoolSession>) =>
    setEdited((p) => ({ ...p, sch: p.sch.map((s, j) => j === i ? { ...s, ...patch } : s) }));

  const onSchSubjChange = (i: number, subj: string) => {
    const teacher = SCHOOL_MAP[subj] ?? '';
    updSch(i, { subj, teacher });
  };

  const addSch = () => setEdited((p) => ({ ...p, sch: [...p.sch, blankSchool()] }));
  const delSch = (i: number) => {
    const n = { ...edited, sch: edited.sch.filter((_, j) => j !== i) };
    setEdited(n); onSave(n);
  };

  // ── Google Calendar links ──────────────────────────────
  function examGcal(exam: Exam) {
    let sh = 8, sm = 0, eh = 11, em = 0;
    if (exam.time === 'PM')       { sh = 12; eh = 14; em = 30; }
    if (exam.time === 'AM + PM')  { sh = 8;  eh = 14; em = 30; }
    return gcalLink(`Exam: ${exam.subj}`,
      icsDatetime(2026, day.m, day.d, sh, sm),
      icsDatetime(2026, day.m, day.d, eh, em),
      `Board: ${exam.board}`);
  }
  function tutorGcal(t: TutorSession) {
    const p = parseHourMin(t.uk);
    if (!p) return '#';
    return gcalLink(`Tutor: ${t.subj}${t.moved ? ' (Reshuffled)' : ''}`,
      icsDatetime(2026, day.m, day.d, p.sh, p.sm),
      icsDatetime(2026, day.m, day.d, p.eh, p.em),
      `Teacher: ${t.teacher}\nUK: ${t.uk} / NG: ${t.ng}${t.moved ? '\n' + t.reason : ''}`);
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-t-2xl sm:rounded-xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">

        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                {day.nm}, {day.d} {MF[day.m]} 2026
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Edit any field then click <strong className="text-gray-600">Update</strong> to save
              </p>
            </div>
            <button onClick={onClose}
              className="text-gray-300 hover:text-gray-600 text-2xl leading-none p-1 -mt-0.5 flex-shrink-0">
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
              {edited.exam
                ? <button onClick={() => setExam(null)} className="btn-danger text-[10px]">Remove</button>
                : <button onClick={() => setExam(blankExam())} className="btn-add text-[10px]">+ Add exam</button>}
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
                    <select className="input-field" value={edited.exam.board}
                      onChange={(e) => updExam('board', e.target.value)}>
                      {!EXAM_BOARDS.includes(edited.exam.board) && edited.exam.board &&
                        <option value={edited.exam.board}>{edited.exam.board}</option>}
                      {EXAM_BOARDS.map((b) => <option key={b}>{b}</option>)}
                    </select>
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
                <div className="flex items-center justify-between pt-1">
                  <a href={examGcal(edited.exam)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-exam-muted hover:underline">
                    <CalIcon />Add to Google Calendar
                  </a>
                  <UpdateBtn onClick={() => update('exam')} saved={savedKeys.has('exam')} />
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No exam scheduled</p>
            )}
          </section>

          {/* ── TUTOR SESSIONS ──────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="section-label">Tutor Sessions</span>
              <button onClick={addTutor} className="btn-add text-[10px]">+ Add session</button>
            </div>

            {edited.tutor.length === 0 &&
              <p className="text-xs text-gray-400 italic">No tutor sessions</p>}

            <div className="space-y-3">
              {edited.tutor.map((t, i) => {
                const key = `tutor-${i}`;
                const c = subjectColor(t.subj);
                return (
                  <div key={i}
                    style={{ background: c.bg, borderColor: c.border, borderLeftColor: c.accent, borderLeftWidth: '3px' }}
                    className="rounded-lg border p-3 space-y-2.5">

                    <div className="flex items-center justify-between">
                      <span style={{ color: c.muted }} className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span style={{ background: c.accent }} className="w-2 h-2 rounded-full inline-block" />
                        {t.subj} · {t.moved ? '▶ Reshuffled' : '✓ Regular'}
                      </span>
                      <button onClick={() => delTutor(i)}
                        className="text-[10px] text-red-400 hover:text-red-600 font-medium">Remove</button>
                    </div>

                    {/* Subject — drives teacher + default times */}
                    <div className="grid grid-cols-2 gap-2">
                      <Label text="Subject">
                        <select className="input-field" value={t.subj}
                          onChange={(e) => onTutorSubjChange(i, e.target.value)}>
                          {!TUTOR_SUBJECTS.includes(t.subj) && t.subj &&
                            <option value={t.subj}>{t.subj}</option>}
                          {TUTOR_SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </Label>
                      <Label text="Teacher">
                        <select className="input-field" value={t.teacher}
                          onChange={(e) => updTutor(i, { teacher: e.target.value })}>
                          {!TUTORS.includes(t.teacher) && t.teacher &&
                            <option value={t.teacher}>{t.teacher}</option>}
                          {TUTORS.map((n) => <option key={n}>{n}</option>)}
                        </select>
                      </Label>
                    </div>

                    {/* Times */}
                    <div className="grid grid-cols-2 gap-2">
                      <Label text="🇬🇧 UK time">
                        <select className="input-field" value={t.uk}
                          onChange={(e) => updTutor(i, { uk: e.target.value })}>
                          {slotOptions(UK_TIME_SLOTS, t.uk).map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </Label>
                      <Label text="🇳🇬 Nigeria time">
                        <select className="input-field" value={t.ng}
                          onChange={(e) => updTutor(i, { ng: e.target.value })}>
                          {slotOptions(NG_TIME_SLOTS, t.ng).map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </Label>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={t.moved}
                        onChange={(e) => updTutor(i, { moved: e.target.checked })}
                        className="rounded border-gray-300" />
                      <span className="text-xs text-gray-600">Reshuffled / moved</span>
                    </label>

                    {t.moved && (
                      <Label text="Reason">
                        <input className="input-field" value={t.reason}
                          onChange={(e) => updTutor(i, { reason: e.target.value })}
                          placeholder="Why it was moved" />
                      </Label>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <a href={tutorGcal(t)} target="_blank" rel="noopener noreferrer"
                        style={{ color: c.muted }}
                        className="inline-flex items-center gap-1 text-[10px] hover:underline opacity-80">
                        <CalIcon />Add to Google Calendar
                      </a>
                      <UpdateBtn onClick={() => update(key)} saved={savedKeys.has(key)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── SCHOOL SESSIONS ─────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="section-label">School Drop-ins</span>
              <button onClick={addSch} className="btn-add text-[10px]">+ Add</button>
            </div>

            {edited.sch.length === 0 &&
              <p className="text-xs text-gray-400 italic">No school sessions</p>}

            <div className="space-y-2">
              {edited.sch.map((s, i) => {
                const key = `sch-${i}`;
                return (
                  <div key={i} className="bg-school-bg border border-school-border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-school-muted">
                        Session {i + 1}
                      </span>
                      <button onClick={() => delSch(i)}
                        className="text-[10px] text-red-400 hover:text-red-600 font-medium">Remove</button>
                    </div>

                    {/* Subject — auto-fills teacher */}
                    <Label text="Subject">
                      <select className="input-field" value={s.subj}
                        onChange={(e) => onSchSubjChange(i, e.target.value)}>
                        <option value="">— select subject —</option>
                        {!SCHOOL_SUBJECTS.includes(s.subj) && s.subj &&
                          <option value={s.subj}>{s.subj}</option>}
                        {SCHOOL_SUBJECTS.map((subj) => <option key={subj}>{subj}</option>)}
                      </select>
                    </Label>

                    <div className="grid grid-cols-2 gap-2">
                      <Label text="Teacher">
                        <input className="input-field" value={s.teacher}
                          onChange={(e) => updSch(i, { teacher: e.target.value })}
                          placeholder="Auto-filled from subject" />
                      </Label>
                      <Label text="Time">
                        <select className="input-field" value={s.time}
                          onChange={(e) => updSch(i, { time: e.target.value })}>
                          {slotOptions(SCHOOL_TIMES, s.time).map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </Label>
                    </div>

                    <div className="flex justify-end pt-1">
                      <UpdateBtn onClick={() => update(key)} saved={savedKeys.has(key)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── NOTES ───────────────────────────────── */}
          <section>
            <div className="section-label">Notes</div>
            <textarea
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm text-gray-800
                         resize-y min-h-[70px] focus:outline-none focus:border-gray-400 bg-white"
              value={edited.notes}
              onChange={(e) => setEdited((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Add notes, reminders, prep tips…"
            />
            <div className="flex justify-end mt-2">
              <UpdateBtn onClick={() => update('notes')} saved={savedKeys.has('notes')} />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-3 flex justify-end no-print">
          <button onClick={onClose} className="btn-ghost">Done</button>
        </div>
      </div>
    </div>
  );
}
