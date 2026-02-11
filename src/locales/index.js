import { createI18n } from 'vue-i18n'
import zhCn from './zh-cn'
import en from './en'

const messages = {
  'zh-cn': zhCn,
  en,
}

export function setupI18n(app) {
  const saved = localStorage.getItem('language') || 'zh-cn'

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: saved,
    fallbackLocale: 'zh-cn',
    messages,
  })

  app.use(i18n)
}

