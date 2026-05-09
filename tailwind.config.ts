import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        exam: {
          DEFAULT: '#378ADD',
          bg: '#E6F1FB',
          text: '#0C447C',
          muted: '#185FA5',
          border: '#B5D4F4',
        },
        kept: {
          DEFAULT: '#63B96A',
          bg: '#EAF3DE',
          text: '#27500A',
          muted: '#3B6D11',
          border: '#A8D9AC',
        },
        moved: {
          DEFAULT: '#EF9F27',
          bg: '#FAEEDA',
          text: '#633806',
          muted: '#854F0B',
          border: '#F5C97A',
        },
        school: {
          DEFAULT: '#7F77DD',
          bg: '#EEEDFE',
          text: '#3C3489',
          muted: '#534AB7',
          border: '#CECBF6',
        },
      },
    },
  },
  plugins: [],
};

export default config;
