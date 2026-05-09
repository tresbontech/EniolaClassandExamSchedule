'use client';
import { Day } from '@/lib/types';
import { subjectColor } from '@/lib/constants';

const M = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const TODAY_D = 9;
const TODAY_M = 5;

function isToday(d: number, m: number) {
  return d === TODAY_D && m === TODAY_M;
}

interface Props {
  day: Day;
  isHT?: boolean;
  onClick: () => void;
}

export default function DayCard({ day, isHT, onClick }: Props) {
  const weekend = day.nm === 'Sat' || day.nm === 'Sun';
  const today = isToday(day.d, day.m);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      className={[
        'relative rounded-lg border p-2 pb-3 min-h-[110px] cursor-pointer transition-all select-none',
        'hover:shadow-md',
        day.exam ? 'border-t-[3px] border-t-exam' : 'border-t',
        isHT ? 'bg-gray-50 opacity-75' : 'bg-white',
        today
          ? 'border-exam/50 ring-2 ring-exam/20'
          : 'border-gray-200 hover:border-gray-300',
      ].join(' ')}
    >
      {/* Day name + today dot */}
      <div className="flex justify-between items-start mb-0.5">
        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
          {day.nm}
        </span>
        {today && <span className="w-1.5 h-1.5 rounded-full bg-exam flex-shrink-0 mt-0.5" />}
      </div>

      {/* Day number */}
      <div className={`text-[15px] font-semibold mb-1.5 leading-none ${weekend ? 'text-gray-400' : 'text-gray-900'}`}>
        {day.d}
        <span className="text-[10px] font-normal text-gray-400 ml-0.5">{M[day.m]}</span>
      </div>

      {/* Pills */}
      {day.exam && (
        <div className="text-[9px] rounded px-1.5 py-0.5 mb-1 bg-exam-bg text-exam-text font-semibold truncate leading-snug">
          ✦ {day.exam.subj.length > 20 ? day.exam.subj.slice(0, 19) + '…' : day.exam.subj}
        </div>
      )}
      {day.tutor.map((t, i) => {
        const c = subjectColor(t.subj);
        return (
          <div key={i}
            style={{ background: c.bg, color: c.text, borderLeft: `2px solid ${c.accent}` }}
            className="text-[9px] rounded px-1.5 py-0.5 mb-1 truncate leading-snug"
          >
            {t.moved ? '▶ ' : ''}{t.subj} {t.uk}
          </div>
        );
      })}
      {day.sch.map((s, i) => (
        <div key={i} className="text-[9px] rounded px-1.5 py-0.5 mb-1 bg-school-bg text-school-text truncate leading-snug">
          {s.subj.length > 18 ? s.subj.slice(0, 17) + '…' : s.subj}
        </div>
      ))}
    </div>
  );
}
