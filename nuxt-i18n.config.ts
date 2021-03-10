import type { NuxtVueI18n } from 'nuxt-i18n'

const dateTimeFormatsCommon = {
  dateTime: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  },
  date: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  dateWithoutYear: {
    month: 'long',
    day: 'numeric',
  },
  dateWithDayOfWeek: {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  },
}

const options: NuxtVueI18n.Options.AllOptionsInterface = {
  strategy: 'prefix_except_default',
  detectBrowserLanguage: false,
  defaultLocale: 'ja',
  vueI18n: {
    fallbackLocale: 'ja',
    dateTimeFormats: {
      ja: dateTimeFormatsCommon,
      en: dateTimeFormatsCommon,
    },
    formatFallbackMessages: true,
  },
  // vueI18nLoader: true,
  lazy: true,
  langDir: 'assets/locales/',
  locales: [
    {
      code: 'ja',
      name: '日本語',
      iso: 'ja-JP',
      file: 'ja.json',
      description: 'Japanese',
    },
    {
      code: 'en',
      name: 'English',
      iso: 'en-US',
      file: 'en.json',
      description: 'English',
    }
  ],
  seo: false,
}

export default options
