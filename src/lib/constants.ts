// Tutor subject → default teacher + times
export const TUTOR_MAP: Record<string, { teacher: string; uk: string; ng: string }> = {
  'Maths':     { teacher: 'Mr. George Ose',         uk: '7:00–8:00pm', ng: '8:00–9:00pm' },
  'Chemistry': { teacher: 'Ms. Precious Orunmuyi',  uk: '6:00–7:00pm', ng: '6:00–7:00pm' },
  'Physics':   { teacher: 'Ms. Precious Orunmuyi',  uk: '7:00–8:00pm', ng: '7:00–8:00pm' },
  'Biology':   { teacher: 'Mr. Faronbi Alaba',      uk: '7:00–8:00pm', ng: '8:00–9:00pm' },
  'English':   { teacher: 'Ms. Khadijat Ayantunji', uk: '7:30–8:30pm', ng: '8:30–9:30pm' },
};

export const TUTOR_SUBJECTS = Object.keys(TUTOR_MAP);

export const TUTORS = [
  'Mr. George Ose',
  'Ms. Precious Orunmuyi',
  'Mr. Faronbi Alaba',
  'Ms. Khadijat Ayantunji',
];

export const UK_TIME_SLOTS = [
  '4:00–5:00pm',
  '5:00–6:00pm',
  '6:00–7:00pm',
  '7:00–8:00pm',
  '7:30–8:30pm',
  '8:00–9:00pm',
  '8:30–9:30pm',
  '9:00–10:00pm',
];

export const NG_TIME_SLOTS = [
  '5:00–6:00pm',
  '6:00–7:00pm',
  '7:00–8:00pm',
  '7:30–8:30pm',
  '8:00–9:00pm',
  '8:30–9:30pm',
  '9:00–10:00pm',
  '10:00–11:00pm',
];

export const SCHOOL_TIMES = [
  '08:30–09:30',
  '09:00–10:00',
  '09:30–10:30',
  '10:00–11:00',
  '10:05–11:05',
  '11:05–12:05',
  '12:05–13:05',
  '13:05–14:05',
  '14:10–15:10',
  '15:10–16:10',
];

export const EXAM_BOARDS = [
  'AQA',
  'Edexcel',
  'Edexcel Higher',
  'Edexcel Foundation',
  'OCR A',
  'OCR',
  'WJEC',
  'Eduqas',
  'Cambridge',
];

// School subject → default teacher
export const SCHOOL_MAP: Record<string, string> = {
  'Biology':                    'Mrs Bayraktar',
  'Biology Paper 2':            'Mrs Bayraktar',
  'Chemistry':                  'Mr Butcher',
  'Chemistry Paper 2':          'Mr Butcher',
  'Computer Science':           'Mrs Mehta',
  'Computer Science Paper 2':   'Mrs Mehta',
  'Engineering Written Paper':  'Mrs Cameron',
  'English Language':           'Miss Cottle',
  'English Language Paper 2':   'Miss Cottle',
  'English Literature':         'Miss Cottle',
  'Food Written Paper':         'Mrs Masters',
  'French Paper 2 Listening':   'Ms Hau',
  'French Paper 4':             'Ms Hau',
  'Further Maths Paper 1':      'Mr Anthony',
  'Geography':                  'Mrs Calder',
  'Geography Paper 2':          'Mrs Calder',
  'German':                     'Mrs Baker',
  'History Paper 1':            'Mrs Smith',
  'History Paper 2':            'Ms Dalton',
  'History Paper 3':            'Mrs Smith',
  'Maths Calculator (H)':       'Mr Anthony',
  'Maths Calculator 3 (H)':     'Mr Anthony',
  'Maths Non-Calc (H)':         'Mr Anthony',
  'Music Appraising':           'Mr Flanagan',
  'PE':                         'Mr Williams',
  'Physics Paper 1':            'Mrs Boyle',
  'Physics Paper 2':            'Mrs Boyle',
  'RPE':                        'Ms Karmock-Golds',
  'RPE Paper 2':                'Ms Karmock-Golds',
  'Spanish':                    'Ms Cikotic',
};

export const SCHOOL_SUBJECTS = Object.keys(SCHOOL_MAP).sort();
