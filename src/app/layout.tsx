import type { Metadata } from 'next';
/* eslint-disable @next/next/no-page-custom-font */
import './globals.css';

export const metadata: Metadata = {
  title: 'Erick Sang Cifuentes - Data Engineer Portfolio',
  description: 'Portfolio of Erick Sang Cifuentes, Data Engineer with 5+ years of experience in building robust data pipelines and cloud solutions.',
  keywords: ['Data Engineer', 'Python', 'SQL', 'AWS', 'Azure', 'GCP', 'Power BI', 'ETL', 'Data Pipeline'],
  authors: [{ name: 'Erick Sang Cifuentes' }],
  openGraph: {
    title: 'Erick Sang Cifuentes - Data Engineer Portfolio',
    description: 'Building robust data pipelines and transforming raw data into actionable insights',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children
}: RootLayoutProps) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-black text-green-400 font-rajdhani overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
