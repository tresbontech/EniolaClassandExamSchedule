import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eniola — GCSE Exam & Tutor Calendar 2026',
  description: 'GCSE exam and tutor session calendar for Eniola, prepared by Tresbon Tech Academy.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAF8] text-[#1A1916]">{children}</body>
    </html>
  );
}
