'use client';
import { useCallback, useEffect, useState } from 'react';
import { Day, Week } from '@/lib/types';
import { initialWeeks } from '@/lib/data';
import { generateICS } from '@/lib/ics';
import DayCard from '@/components/DayCard';
import DayModal from '@/components/DayModal';

const STORAGE_KEY = 'eniola-gcse-2026';

function CalendarIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm5 3h4v1H6V7zm0 2h4v1H6V9zm-2 2h6v1H4v-1z" />
    </svg>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: color }} />
      {label}
    </span>
  );
}

export default function HomePage() {
  const [weeks, setWeeks] = useState<Week[]>(initialWeeks);
  const [mounted, setMounted] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [toast, setToast] = useState('');

  // Load from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setWeeks(JSON.parse(saved));
    } catch { /* ignore */ }
    setMounted(true);
  }, []);

  // Persist to localStorage on every change after mount
  useEffect(() => {
    if (mounted) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(weeks)); } catch { /* ignore */ }
    }
  }, [weeks, mounted]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleSave = useCallback((updated: Day) => {
    setWeeks((prev) =>
      prev.map((wk) => ({
        ...wk,
        days: wk.days.map((d) => (d.id === updated.id ? updated : d)),
      }))
    );
    // Modal stays open — each entry has its own Update button
    showToast('Saved');
  }, []);

  const handleAddToCalendar = () => {
    const ics = generateICS(weeks);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Eniola_GCSE_2026.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('📅 Calendar file downloaded — open it to import into Google / Apple / Outlook Calendar');
  };

  const handleReset = () => {
    if (window.confirm('Reset all changes back to the original schedule?')) {
      setWeeks(initialWeeks);
      showToast('Schedule reset to original');
    }
  };

  // Find the current selected day from latest weeks state (so modal sees fresh data)
  const liveSelectedDay = selectedDay
    ? weeks.flatMap((w) => w.days).find((d) => d.id === selectedDay.id) ?? null
    : null;

  return (
    <>
      {/* ── STICKY HEADER ──────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm no-print">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 py-3 flex-wrap">
            <div>
              <h1 className="text-base font-semibold text-gray-900 leading-tight">
                Eniola — GCSE Exam & Tutor Calendar 2026
              </h1>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Tresbon Tech Academy · Tap any day to view or edit
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={() => window.print()} className="btn-ghost">
                Print / PDF
              </button>
              <button onClick={handleReset} className="btn-ghost">
                Reset
              </button>
              <button
                onClick={handleAddToCalendar}
                className="btn-primary flex items-center gap-1.5"
              >
                <CalendarIcon />
                Add to Calendar
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 pb-2.5">
            <LegendDot color="#378ADD" label="Exam day" />
            <LegendDot color="#63B96A" label="Tutor — regular" />
            <LegendDot color="#EF9F27" label="Tutor — reshuffled" />
            <LegendDot color="#7F77DD" label="School drop-in" />
          </div>
        </div>
      </header>

      {/* ── CALENDAR GRID ──────────────────────────────────── */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        {weeks.map((wk) => (
          <section key={wk.id}>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-200">
              {wk.label}{' '}
              <span className="font-normal normal-case tracking-normal text-gray-400">
                — {wk.sub}
              </span>
            </div>
            <div className="overflow-x-auto -mx-1">
              <div className="grid grid-cols-7 gap-1.5 min-w-[560px] px-1">
                {wk.days.map((day) => (
                  <DayCard
                    key={day.id}
                    day={day}
                    isHT={wk.isHT}
                    onClick={() => setSelectedDay(day)}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        <footer className="text-center text-[11px] text-gray-400 pb-6 pt-2">
          Prepared by Oluwole Elvis Benson · Tresbon Tech Academy
        </footer>
      </main>

      {/* ── MODAL ──────────────────────────────────────────── */}
      {liveSelectedDay && (
        <DayModal
          day={liveSelectedDay}
          onSave={handleSave}
          onClose={() => setSelectedDay(null)}
        />
      )}

      {/* ── TOAST ──────────────────────────────────────────── */}
      <div
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 no-print
          ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      >
        <div className="bg-gray-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg max-w-sm text-center">
          {toast}
        </div>
      </div>
    </>
  );
}
