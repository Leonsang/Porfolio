import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // Get the locale from the request parameter to avoid circular dependency
  const locale = await requestLocale;
  
  // Validate that the incoming `locale` parameter is valid
  const validLocale = routing.locales.includes(locale as string) ? (locale as string) : routing.defaultLocale;

  try {
    const messages = (await import(`../../messages/${validLocale}.json`)).default;
    return {
      messages,
      locale: validLocale
    };
  } catch {
    console.warn(`Failed to load messages for locale ${validLocale}, falling back to default`);
    try {
      const defaultMessages = (await import(`../../messages/${routing.defaultLocale}.json`)).default;
      return {
        messages: defaultMessages,
        locale: routing.defaultLocale
      };
    } catch {
      console.error('Failed to load default messages');
      return {
        messages: {},
        locale: routing.defaultLocale
      };
    }
  }
});
