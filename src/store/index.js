import Vue from 'vue'
import Vuex from 'vuex'
import Language from '@/services/language'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: '',
    languages: [],
    translations: [],
    detected: {
      code: 'en',
      language: 'English'
    },
    drawer: true,
    message: '',
    snackbar: false
  },
  getters: {
    text: state => state.text,
    languages: state => state.languages,
    translations: state => state.translations,
    detected: state => state.detected,
    drawer: state => state.drawer,
    message: state => state.message,
    snackbar: state => state.snackbar
  },
  mutations: {
    updateText(state, data) {
      state.text = data
    },
    setLanguages(state, data) {
      state.languages = data
    },
    addSelected(state, data) {
      state.translations.push(data)
    },
    removeSelected(state, index) {
      state.translations.splice(index, 1);
    },
    addTranslation(state, {key, text, translation}) {
      state.translations[key].translation = translation
      state.translations[key].text = text
    },
    updateDetected(state, data) {
      state.detected = data
    },
    clearTranslations(state) {
      state.translations = []
    },
    updateTranslations(state, data) {
      state.translations = data
    },
    toggleDrawer(state, data) {
      state.drawer = data
    },
    toggleSnackbar(state, data) {
      state.snackbar = data
    },
    updateMessage(state, data) {
      state.snackbar = true
      state.message = data
    }
  },
  actions: {
    async getLanguages(context) {
      let response = await Language.getLanguages()
      localStorage.setItem('languages', JSON.stringify(response.data))
      context.commit('setLanguages', response.data)
    },
    async detectLanguage(context, payload) {
      let response = await Language.detectLanguage(payload)
      let language = context.getters['languages'].find(el => el.code === response.data[0].language)
      let data = {
        code: response.data[0].language,
        language: language.name
      }
      context.commit('updateDetected', data)
    },
    async translateSelected(context) {
      context.getters['translations'].map((el, key) => {
        if (!el.translation || el.text !== context.getters['text']) {
          const payload = {
            q: context.getters['text'],
            source: el.source,
            target: el.target,
            format: 'text'
          }
          context.dispatch('translateText', { payload: payload, key: key })
        }
      })
    },
    async translateText(context, {payload, key}) {
      let data = {}
      await Language.translateText(payload)
        .then(response => {
          data = {
            text: payload.q,
            translation: response.data.translatedText,
            key: key
          }
          context.commit('addTranslation', data)
        })
        .catch(error => {
          data = {
            text: payload.q,
            translation: '',
            key: key
          }
          context.commit('addTranslation', data)
          context.commit('updateMessage', error.response.data.error)
        })
    },
  },
  modules: {
  }
})
