import Vue from 'vue'
import Vuex from 'vuex'
import Language from '@/services/language'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: '',
    languages: [],
    selected: [],
    translations: [],
    detected: {
      code: 'en',
      language: 'English'
    }
  },
  getters: {
    text: state => state.text,
    languages: state => state.languages,
    selected: state => state.selected,
    translations: state => state.translations,
    detected: state => state.detected
  },
  mutations: {
    updateText(state, data) {
      state.text = data
    },
    setLanguages(state, data) {
      state.languages = data
    },
    addSelected(state, data) {
      state.selected.push(data)
    },
    removeSelected(state, index) {
      state.selected.splice(index, 1)
    },
    addTranslation(state, data) {
      // let index = state.translations.findIndex(el => {
      //   return el.target === data.source && el.text === state.text
      // })

      // if (index < 0)
        state.translations.push(data)
    },
    updateDetected(state, data) {
      state.detected = data
    },
    clearTranslations(state) {
      state.translations = []
    },
    updateTranslations(state, data) {
      state.translations = data
    }
  },
  actions: {
    async getLanguages(context) {
      let response = await Language.getLanguages()
      localStorage.setItem('languages', JSON.stringify(response.data))
      context.commit('setLanguages', response.data)
    },
    async translateText(context, {payload, language}) {
      let response = await Language.translateText(payload)
      let data = {
        text: context.getters['text'],
        source: payload.source,
        target: payload.target,
        translation: response.data.translatedText,
        language: language
      }
      context.commit('addTranslation', data)
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
    async translateSelected(context,) {
      context.getters['selected'].map(lang => {
        const payload = {
          q: context.getters['text'],
          source: context.getters['detected'].code,
          target: lang.code,
          format: 'text'
        }
        context.dispatch('translateText', {payload: payload, language: lang.name})
      })
    }
  },
  modules: {
  }
})
