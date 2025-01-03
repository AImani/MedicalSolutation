import { FC } from 'react'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { IntlProvider } from 'react-intl'
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en'
import '@formatjs/intl-relativetimeformat/locale-data/fa'
import { WithChildren } from '../helpers'
import { useLang } from './Metronici18n'

import faMessages from './messages/fa.json'

const allMessages = {
  fa: faMessages,
}

i18next
  .use(initReactI18next)
  .init({
    resources: {
      fa: {
        translation: faMessages,
      },
    },
    lng: 'fa',
    fallbackLng: 'fa',
    interpolation: {
      escapeValue: false,
    },
  });

const I18nProvider: FC<WithChildren> = ({ children }) => {
  const locale = useLang()
  const messages = allMessages[locale]

  return (
    <IntlProvider locale={'fa'} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export { I18nProvider }
