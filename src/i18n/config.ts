export const defaultLocale = 'ru';

export const locales = {
  ru: {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺'
  }
  // Будущие языки:
  // uk: { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  // kk: { code: 'kk', name: 'Қазақша', flag: '🇰🇿' },
} as const;

export type Locale = keyof typeof locales;

export const defaultCountry = 'RU';
