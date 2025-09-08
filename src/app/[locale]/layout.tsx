import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    console.log('Invalid locale:', locale, 'Redirecting to default');
    notFound();
  }

  let messages;
  try {
    messages = await getMessages();
    console.log('Messages loaded for locale:', locale);
  } catch (error) {
    console.error('Error loading messages for locale:', locale, error);
    // Fallback to default locale messages
    try {
      messages = await getMessages({ locale: routing.defaultLocale });
    } catch (fallbackError) {
      console.error('Fallback messages also failed:', fallbackError);
      messages = {};
    }
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}