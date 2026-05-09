import { Week } from './types';

export const initialWeeks: Week[] = [
  {
    id: 'w0',
    label: 'Week 0',
    sub: 'w/c 4 May 2026',
    days: [
      { id: 'd0504', d: 4, m: 5, nm: 'Mon', exam: null, tutor: [], sch: [], notes: '' },
      { id: 'd0505', d: 5, m: 5, nm: 'Tue', exam: null, tutor: [], sch: [], notes: '' },
      { id: 'd0506', d: 6, m: 5, nm: 'Wed', exam: null, tutor: [], sch: [], notes: '' },
      { id: 'd0507', d: 7, m: 5, nm: 'Thu', exam: null, tutor: [], sch: [], notes: '' },
      {
        id: 'd0508', d: 8, m: 5, nm: 'Fri',
        exam: { subj: 'Drama Written Paper', board: 'Edexcel', time: 'AM' },
        tutor: [],
        sch: [{ subj: 'English Literature', teacher: 'Miss Cottle', time: '14:10–15:10' }],
        notes: '',
      },
      { id: 'd0509', d: 9, m: 5, nm: 'Sat', exam: null, tutor: [], sch: [], notes: 'Today — exam season starts!' },
      {
        id: 'd0510', d: 10, m: 5, nm: 'Sun', exam: null,
        tutor: [
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '4:00–5:00pm', ng: '5:00–6:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '8:00–9:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
        ],
        sch: [], notes: '',
      },
    ],
  },
  {
    id: 'w1',
    label: 'Week 1',
    sub: 'w/c 11 May 2026',
    days: [
      {
        id: 'd0511', d: 11, m: 5, nm: 'Mon',
        exam: { subj: 'English Literature Paper 1', board: 'AQA', time: 'AM' },
        tutor: [
          { subj: 'English', teacher: 'Ms. Khadijat Ayantunji', uk: '7:30–8:30pm', ng: '8:30–9:30pm', moved: true, reason: 'Normally Tuesday — moved to Mon eve before English Lit Paper 1', ts: "English's regular Tuesday time (7:30–8:30pm UK / 8:30–9:30pm NG)" },
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: true, reason: 'Moved to Mon eve — before Biology Paper 1 on Tue 12 May', ts: "Biology's regular Wednesday time (7:00–8:00pm UK / 8:00–9:00pm NG)" },
        ],
        sch: [
          { subj: 'RPE', teacher: 'Ms Karmock-Golds', time: '11:05–12:05' },
          { subj: 'Biology', teacher: 'Mrs Bayraktar', time: '12:05–13:05' },
        ],
        notes: '',
      },
      {
        id: 'd0512', d: 12, m: 5, nm: 'Tue',
        exam: { subj: 'Biology Paper 1 (AM) + RE Paper 1 (PM)', board: 'AQA', time: 'AM + PM' },
        tutor: [
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '6:00–7:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Tuesday slot ✓', ts: 'Regular Tuesday time' },
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: true, reason: 'Added Tue eve — extra session before Maths Paper 1 on Thu 14 May', ts: "Maths's regular Friday time (7:00–8:00pm UK / 8:00–9:00pm NG)" },
        ],
        sch: [
          { subj: 'Geography', teacher: 'Mrs Calder', time: '14:10–15:10' },
          { subj: 'Computer Science', teacher: 'Mrs Mehta', time: '12:05–13:05' },
        ],
        notes: '',
      },
      {
        id: 'd0513', d: 13, m: 5, nm: 'Wed', exam: null,
        tutor: [
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Wednesday slot ✓', ts: 'Regular Wednesday time' },
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: true, reason: 'Moved to Wed eve — the evening before Maths Paper 1 on Thu 14 May', ts: "Maths's regular Friday time (7:00–8:00pm UK / 8:00–9:00pm NG)" },
        ],
        sch: [
          { subj: 'Maths Non-Calc (H)', teacher: 'Mr Anthony', time: '11:05–12:05' },
          { subj: 'German', teacher: 'Mrs Baker', time: '12:05–13:05' },
        ],
        notes: '',
      },
      {
        id: 'd0514', d: 14, m: 5, nm: 'Thu',
        exam: { subj: 'Maths Paper 1', board: 'Edexcel Higher', time: 'AM' },
        tutor: [],
        sch: [{ subj: 'History Paper 1', teacher: 'Mrs Smith', time: '14:10–15:10' }],
        notes: 'Maths session was Wed 13 eve',
      },
      {
        id: 'd0515', d: 15, m: 5, nm: 'Fri',
        exam: { subj: 'History Paper 1', board: 'OCR A', time: 'AM' },
        tutor: [
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Friday slot ✓', ts: 'Regular Friday time' },
        ],
        sch: [{ subj: 'Chemistry', teacher: 'Mr Butcher', time: '14:10–15:10' }],
        notes: '',
      },
      {
        id: 'd0516', d: 16, m: 5, nm: 'Sat', exam: null,
        tutor: [
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '5:00–6:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
          { subj: 'Physics', teacher: 'Ms. Precious Orunmuyi', uk: '7:00–8:00pm', ng: '7:00–8:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
        ],
        sch: [], notes: '',
      },
      {
        id: 'd0517', d: 17, m: 5, nm: 'Sun', exam: null,
        tutor: [
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '4:00–5:00pm', ng: '5:00–6:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '8:00–9:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
        ],
        sch: [], notes: '',
      },
    ],
  },
  {
    id: 'w2',
    label: 'Week 2',
    sub: 'w/c 18 May 2026',
    days: [
      {
        id: 'd0518', d: 18, m: 5, nm: 'Mon',
        exam: { subj: 'Chemistry Paper 1', board: 'AQA', time: 'AM' },
        tutor: [
          { subj: 'Physics', teacher: 'Ms. Precious Orunmuyi', uk: '7:30–8:30pm', ng: '7:30–8:30pm', moved: false, reason: 'Regular Monday slot ✓', ts: 'Regular Monday time' },
          { subj: 'English', teacher: 'Ms. Khadijat Ayantunji', uk: '7:30–8:30pm', ng: '8:30–9:30pm', moved: true, reason: 'Moved to Mon eve — before English Lit Paper 2 on Tue 19 May', ts: "English's regular Tuesday time (7:30–8:30pm UK / 8:30–9:30pm NG)" },
        ],
        sch: [], notes: 'Chemistry session was Sun 17 eve (8:00–9:00pm)',
      },
      {
        id: 'd0519', d: 19, m: 5, nm: 'Tue',
        exam: { subj: 'English Literature Paper 2', board: 'AQA', time: 'AM' },
        tutor: [
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '6:00–7:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Tuesday slot ✓', ts: 'Regular Tuesday time' },
          { subj: 'English', teacher: 'Ms. Khadijat Ayantunji', uk: '7:30–8:30pm', ng: '8:30–9:30pm', moved: false, reason: 'Regular Tuesday slot ✓', ts: 'Regular Tuesday time' },
        ],
        sch: [
          { subj: 'RPE Paper 2', teacher: 'Ms Karmock-Golds', time: '11:05–12:05' },
          { subj: 'Computer Science Paper 2', teacher: 'Mrs Mehta', time: '12:05–13:05' },
          { subj: 'French Paper 2 Listening', teacher: 'Ms Hau', time: '14:10–15:10' },
        ],
        notes: '',
      },
      {
        id: 'd0520', d: 20, m: 5, nm: 'Wed', exam: null,
        tutor: [
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Wednesday slot ✓', ts: 'Regular Wednesday time' },
          { subj: 'English', teacher: 'Ms. Khadijat Ayantunji', uk: '7:30–8:30pm', ng: '8:30–9:30pm', moved: true, reason: 'Moved to Wed eve — before English Language Paper 1 on Thu 21 May', ts: "English's regular Tuesday time (7:30–8:30pm UK / 8:30–9:30pm NG)" },
        ],
        sch: [{ subj: 'English Language', teacher: 'Miss Cottle', time: '11:05–12:05' }],
        notes: '',
      },
      {
        id: 'd0521', d: 21, m: 5, nm: 'Thu',
        exam: { subj: 'English Language Paper 1', board: 'AQA', time: 'AM' },
        tutor: [],
        sch: [{ subj: 'PE', teacher: 'Mr Williams', time: '11:05–12:05' }],
        notes: 'English session was Wed 20 eve',
      },
      {
        id: 'd0522', d: 22, m: 5, nm: 'Fri',
        exam: { subj: 'French Reading & Listening', board: 'Edexcel Foundation', time: 'AM' },
        tutor: [
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Friday slot ✓', ts: 'Regular Friday time' },
        ],
        sch: [{ subj: 'Engineering Written Paper', teacher: 'Mrs Cameron', time: '14:10–15:10' }],
        notes: '',
      },
      {
        id: 'd0523', d: 23, m: 5, nm: 'Sat', exam: null,
        tutor: [
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '5:00–6:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
          { subj: 'Physics', teacher: 'Ms. Precious Orunmuyi', uk: '7:00–8:00pm', ng: '7:00–8:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
        ],
        sch: [], notes: 'Half term begins',
      },
      {
        id: 'd0524', d: 24, m: 5, nm: 'Sun', exam: null,
        tutor: [
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '4:00–5:00pm', ng: '5:00–6:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '8:00–9:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
        ],
        sch: [], notes: '',
      },
    ],
  },
  {
    id: 'wh',
    label: 'Half Term',
    sub: '25–31 May · No Exams',
    isHT: true,
    days: [
      {
        id: 'd0525', d: 25, m: 5, nm: 'Mon', exam: null,
        tutor: [{ subj: 'Physics', teacher: 'Ms. Precious Orunmuyi', uk: '7:30–8:30pm', ng: '7:30–8:30pm', moved: false, reason: 'Regular Monday slot ✓', ts: 'Regular Monday time' }],
        sch: [], notes: 'Half term',
      },
      {
        id: 'd0526', d: 26, m: 5, nm: 'Tue', exam: null,
        tutor: [
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '6:00–7:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Tuesday slot ✓', ts: 'Regular Tuesday time' },
          { subj: 'English', teacher: 'Ms. Khadijat Ayantunji', uk: '7:30–8:30pm', ng: '8:30–9:30pm', moved: false, reason: 'Regular Tuesday slot ✓', ts: 'Regular Tuesday time' },
        ],
        sch: [], notes: 'Half term',
      },
      {
        id: 'd0527', d: 27, m: 5, nm: 'Wed', exam: null,
        tutor: [{ subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Wednesday slot ✓', ts: 'Regular Wednesday time' }],
        sch: [], notes: 'Half term',
      },
      { id: 'd0528', d: 28, m: 5, nm: 'Thu', exam: null, tutor: [], sch: [], notes: 'Half term' },
      {
        id: 'd0529', d: 29, m: 5, nm: 'Fri', exam: null,
        tutor: [{ subj: 'Maths', teacher: 'Mr. George Ose', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Friday slot ✓', ts: 'Regular Friday time' }],
        sch: [], notes: 'Half term',
      },
      {
        id: 'd0530', d: 30, m: 5, nm: 'Sat', exam: null,
        tutor: [
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '5:00–6:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
          { subj: 'Physics', teacher: 'Ms. Precious Orunmuyi', uk: '7:00–8:00pm', ng: '7:00–8:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
        ],
        sch: [], notes: 'Half term',
      },
      {
        id: 'd0531', d: 31, m: 5, nm: 'Sun', exam: null,
        tutor: [
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '4:00–5:00pm', ng: '5:00–6:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '8:00–9:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
        ],
        sch: [], notes: 'Half term — last day',
      },
    ],
  },
  {
    id: 'w3',
    label: 'Week 3',
    sub: 'w/c 1 June 2026',
    days: [
      {
        id: 'd0601', d: 1, m: 6, nm: 'Mon', exam: null,
        tutor: [
          { subj: 'Physics', teacher: 'Ms. Precious Orunmuyi', uk: '7:30–8:30pm', ng: '7:30–8:30pm', moved: false, reason: 'Regular Monday slot ✓ — eve before Physics Paper 1 on Tue 2 Jun', ts: 'Regular Monday time' },
        ],
        sch: [{ subj: 'Physics Paper 1', teacher: 'Mrs Boyle', time: '11:05–12:05' }],
        notes: '',
      },
      {
        id: 'd0602', d: 2, m: 6, nm: 'Tue',
        exam: { subj: 'Physics Paper 1', board: 'AQA', time: 'AM' },
        tutor: [
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '6:00–7:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Tuesday slot ✓', ts: 'Regular Tuesday time' },
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: true, reason: 'Moved to Tue eve — before Maths Paper 2 on Wed 3 Jun', ts: "Maths's regular Friday time (7:00–8:00pm UK / 8:00–9:00pm NG)" },
        ],
        sch: [
          { subj: 'Maths Calculator (H)', teacher: 'Mr Anthony', time: '11:05–12:05' },
          { subj: 'Geography Paper 2', teacher: 'Mrs Calder', time: '12:05–13:05' },
        ],
        notes: '',
      },
      {
        id: 'd0603', d: 3, m: 6, nm: 'Wed',
        exam: { subj: 'Maths Paper 2', board: 'Edexcel Higher', time: 'AM' },
        tutor: [
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Wednesday slot ✓', ts: 'Regular Wednesday time' },
        ],
        sch: [
          { subj: 'History Paper 2', teacher: 'Ms Dalton', time: '11:05–12:05' },
          { subj: 'English Language Paper 2', teacher: 'Miss Cottle', time: '12:05–13:05' },
        ],
        notes: '',
      },
      {
        id: 'd0604', d: 4, m: 6, nm: 'Thu',
        exam: { subj: 'History Paper 2', board: 'OCR A', time: 'AM' },
        tutor: [
          { subj: 'English', teacher: 'Ms. Khadijat Ayantunji', uk: '7:30–8:30pm', ng: '8:30–9:30pm', moved: true, reason: 'Moved to Thu eve — before English Language Paper 2 on Fri 5 Jun', ts: "English's regular Tuesday time (7:30–8:30pm UK / 8:30–9:30pm NG)" },
        ],
        sch: [{ subj: 'Music Appraising', teacher: 'Mr Flanagan', time: '11:05–12:05' }],
        notes: '',
      },
      {
        id: 'd0605', d: 5, m: 6, nm: 'Fri',
        exam: { subj: 'English Language Paper 2', board: 'AQA', time: 'AM' },
        tutor: [
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Friday slot ✓', ts: 'Regular Friday time' },
        ],
        sch: [
          { subj: 'Biology Paper 2', teacher: 'Mrs Bayraktar', time: '11:05–12:05' },
          { subj: 'Further Maths Paper 1', teacher: 'Mr Anthony', time: '12:05–13:05' },
        ],
        notes: '',
      },
      {
        id: 'd0606', d: 6, m: 6, nm: 'Sat', exam: null,
        tutor: [
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '5:00–6:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
          { subj: 'Physics', teacher: 'Ms. Precious Orunmuyi', uk: '7:00–8:00pm', ng: '7:00–8:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
        ],
        sch: [], notes: '',
      },
      {
        id: 'd0607', d: 7, m: 6, nm: 'Sun', exam: null,
        tutor: [
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '4:00–5:00pm', ng: '5:00–6:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: true, reason: 'Added Sun eve — before Biology Paper 2 on Mon 8 Jun', ts: "Biology's regular Wednesday time (7:00–8:00pm UK / 8:00–9:00pm NG)" },
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '8:00–9:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
        ],
        sch: [], notes: '',
      },
    ],
  },
  {
    id: 'w4',
    label: 'Week 4',
    sub: 'w/c 8 June 2026',
    days: [
      {
        id: 'd0608', d: 8, m: 6, nm: 'Mon',
        exam: { subj: 'Biology Paper 2', board: 'AQA', time: 'AM' },
        tutor: [
          { subj: 'Physics', teacher: 'Ms. Precious Orunmuyi', uk: '7:30–8:30pm', ng: '7:30–8:30pm', moved: false, reason: 'Regular Monday slot ✓', ts: 'Regular Monday time' },
        ],
        sch: [
          { subj: 'History Paper 3', teacher: 'Mrs Smith', time: '11:05–12:05' },
          { subj: 'French Paper 4', teacher: 'Ms Hau', time: '12:05–13:05' },
          { subj: 'Spanish', teacher: 'Ms Cikotic', time: '14:10–15:10' },
        ],
        notes: '',
      },
      {
        id: 'd0609', d: 9, m: 6, nm: 'Tue', exam: null,
        tutor: [
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '6:00–7:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Tuesday slot ✓', ts: 'Regular Tuesday time' },
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: true, reason: 'Moved to Tue eve — before Maths Paper 3 on Wed 10 Jun', ts: "Maths's regular Friday time (7:00–8:00pm UK / 8:00–9:00pm NG)" },
        ],
        sch: [{ subj: 'Maths Calculator 3 (H)', teacher: 'Mr Anthony', time: '11:05–12:05' }],
        notes: '',
      },
      {
        id: 'd0610', d: 10, m: 6, nm: 'Wed',
        exam: { subj: 'Maths Paper 3', board: 'Edexcel Higher', time: 'AM' },
        tutor: [
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Wednesday slot ✓', ts: 'Regular Wednesday time' },
        ],
        sch: [{ subj: 'Food Written Paper', teacher: 'Mrs Masters', time: '11:05–12:05' }],
        notes: '',
      },
      {
        id: 'd0611', d: 11, m: 6, nm: 'Thu', exam: null,
        tutor: [
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '6:00–7:00pm', ng: '6:00–7:00pm', moved: true, reason: 'Moved to Thu eve — before Chemistry Paper 2 on Fri 12 Jun', ts: "Chemistry's regular Tuesday time (6:00–7:00pm UK / 6:00–7:00pm NG)" },
        ],
        sch: [{ subj: 'Chemistry Paper 2', teacher: 'Mr Butcher', time: '11:05–12:05' }],
        notes: '',
      },
      {
        id: 'd0612', d: 12, m: 6, nm: 'Fri',
        exam: { subj: 'Chemistry Paper 2', board: 'AQA', time: 'AM' },
        tutor: [
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Friday slot ✓', ts: 'Regular Friday time' },
        ],
        sch: [{ subj: 'Physics Paper 2', teacher: 'Mrs Boyle', time: '11:05–12:05' }],
        notes: '',
      },
      {
        id: 'd0613', d: 13, m: 6, nm: 'Sat', exam: null,
        tutor: [
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '5:00–6:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
          { subj: 'Physics', teacher: 'Ms. Precious Orunmuyi', uk: '7:00–8:00pm', ng: '7:00–8:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
        ],
        sch: [], notes: '',
      },
      {
        id: 'd0614', d: 14, m: 6, nm: 'Sun', exam: null,
        tutor: [
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '4:00–5:00pm', ng: '5:00–6:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
          { subj: 'Physics', teacher: 'Ms. Precious Orunmuyi', uk: '7:00–8:00pm', ng: '7:00–8:00pm', moved: true, reason: 'Added Sun eve — before Physics Paper 2 on Mon 15 Jun', ts: "Physics's regular Saturday time (7:00–8:00pm UK / 7:00–8:00pm NG)" },
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '8:00–9:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
        ],
        sch: [], notes: '',
      },
    ],
  },
  {
    id: 'wf',
    label: 'Final Week',
    sub: 'w/c 15 June 2026',
    days: [
      {
        id: 'd0615', d: 15, m: 6, nm: 'Mon',
        exam: { subj: 'Physics Paper 2', board: 'AQA', time: 'AM' },
        tutor: [],
        sch: [{ subj: 'Spanish', teacher: 'Ms Cikotic', time: '11:05–12:05' }],
        notes: 'Final exam day!',
      },
      {
        id: 'd0616', d: 16, m: 6, nm: 'Tue', exam: null,
        tutor: [
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '6:00–7:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Tuesday slot ✓', ts: 'Regular Tuesday time' },
          { subj: 'English', teacher: 'Ms. Khadijat Ayantunji', uk: '7:30–8:30pm', ng: '8:30–9:30pm', moved: false, reason: 'Regular Tuesday slot ✓', ts: 'Regular Tuesday time' },
        ],
        sch: [], notes: 'Exams complete!',
      },
      {
        id: 'd0617', d: 17, m: 6, nm: 'Wed', exam: null,
        tutor: [{ subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Wednesday slot ✓', ts: 'Regular Wednesday time' }],
        sch: [], notes: '',
      },
      { id: 'd0618', d: 18, m: 6, nm: 'Thu', exam: null, tutor: [], sch: [], notes: '' },
      {
        id: 'd0619', d: 19, m: 6, nm: 'Fri', exam: null,
        tutor: [{ subj: 'Maths', teacher: 'Mr. George Ose', uk: '7:00–8:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Friday slot ✓', ts: 'Regular Friday time' }],
        sch: [], notes: '',
      },
      {
        id: 'd0620', d: 20, m: 6, nm: 'Sat', exam: null,
        tutor: [
          { subj: 'Biology', teacher: 'Mr. Faronbi Alaba', uk: '5:00–6:00pm', ng: '6:00–7:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
          { subj: 'Physics', teacher: 'Ms. Precious Orunmuyi', uk: '7:00–8:00pm', ng: '7:00–8:00pm', moved: false, reason: 'Regular Saturday slot ✓', ts: 'Regular Saturday time' },
        ],
        sch: [], notes: '',
      },
      {
        id: 'd0621', d: 21, m: 6, nm: 'Sun', exam: null,
        tutor: [
          { subj: 'Maths', teacher: 'Mr. George Ose', uk: '4:00–5:00pm', ng: '5:00–6:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
          { subj: 'Chemistry', teacher: 'Ms. Precious Orunmuyi', uk: '8:00–9:00pm', ng: '8:00–9:00pm', moved: false, reason: 'Regular Sunday slot ✓', ts: 'Regular Sunday time' },
        ],
        sch: [], notes: '',
      },
    ],
  },
];
