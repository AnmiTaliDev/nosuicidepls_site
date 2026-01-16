import { defaultLocale, defaultCountry, type Locale } from './config';
import ruTranslations from './ru.json';
import helplines from '../data/helplines.json';

type Translations = typeof ruTranslations;
type TranslationKey = string;

const translations: Record<string, Translations> = {
  ru: ruTranslations,
};

/**
 * Получить перевод по ключу
 * @param key - ключ в формате "section.key" (например "pause.title")
 * @param locale - код языка
 * @returns переведённый текст или ключ, если перевод не найден
 */
export function t(key: TranslationKey, locale: Locale = defaultLocale): string {
  const keys = key.split('.');
  let result: unknown = translations[locale] || translations[defaultLocale];

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      // Если перевод не найден, пробуем русский
      result = translations[defaultLocale];
      for (const fallbackKey of keys) {
        if (result && typeof result === 'object' && fallbackKey in result) {
          result = (result as Record<string, unknown>)[fallbackKey];
        } else {
          return key; // Возвращаем ключ, если перевод не найден
        }
      }
      break;
    }
  }

  return typeof result === 'string' ? result : key;
}

/**
 * Получить все переводы для локали
 */
export function getTranslations(locale: Locale = defaultLocale): Translations {
  return translations[locale] || translations[defaultLocale];
}

/**
 * Получить данные о телефонах доверия для страны
 */
export function getHelplineByCountry(countryCode: string) {
  const code = countryCode.toUpperCase();
  return (helplines as Record<string, typeof helplines.RU>)[code] || helplines[defaultCountry];
}

/**
 * Получить список всех стран с телефонами доверия
 */
export function getAllCountries() {
  return Object.values(helplines as Record<string, typeof helplines.RU>).map(country => ({
    code: country.code,
    name: country.name,
    nameLocal: country.nameLocal,
  }));
}

/**
 * Получить основной телефон для страны (для закреплённой плашки)
 */
export function getPrimaryHelpline(countryCode: string) {
  const country = getHelplineByCountry(countryCode);
  return country?.primary || null;
}
