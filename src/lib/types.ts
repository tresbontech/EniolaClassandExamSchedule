export interface Exam {
  subj: string;
  board: string;
  time: string;
}

export interface TutorSession {
  subj: string;
  teacher: string;
  uk: string;
  ng: string;
  moved: boolean;
  reason: string;
  ts: string;
}

export interface SchoolSession {
  subj: string;
  teacher: string;
  time: string;
}

export interface Day {
  id: string;
  d: number;
  m: number;
  nm: string;
  exam: Exam | null;
  tutor: TutorSession[];
  sch: SchoolSession[];
  notes: string;
}

export interface Week {
  id: string;
  label: string;
  sub: string;
  isHT?: boolean;
  days: Day[];
}
