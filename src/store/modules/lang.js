import Cookies from 'js-cookie'
import * as types from '../mutation-types'

const locale = 'fr'
const locales = ['fr', 'en']

export const state = {
  locale: Cookies.get('locale') || locale,
  locales: locales
}

export const getters = {
  locale: state => state.locale,
  locales: state => state.locales
}

export const mutations = {
  [types.SET_LOCALE] (state, { locale }) {
    state.locale = locale
  }
}

export const actions = {
  setLocale ({ commit }, { locale }) {
    commit(types.SET_LOCALE, { locale })

    Cookies.set('locale', locale, { expires: 365 })
  }
}