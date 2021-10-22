import Vue from 'vue'
import Vuex from 'vuex'
import Language from '@/services/language'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    word: '',
    languages: [],
    selected: [],
    translations: [
      // { source: '', target: '', translation: '', language: '', flag: "" }
    ]
  },
  getters: {
    word: state => state.word,
    languages: state => state.languages,
    selected: state => state.selected,
    translations: state => state.translations
  },
  mutations: {
    updateWord(state, data) {
      state.word = data
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
      state.translations.push(data)
    }
  },
  actions: {
    async getLanguages(state) {
      let response = await Language.getLanguages()
      localStorage.setItem('languages', JSON.stringify(response.data.languages))
      state.commit('setLanguages', response.data.languages)
    },
    async translateText(state, {payload, language}) {
      let response = await Language.translateText(payload)
      let data = {
        source: payload.source,
        target: payload.target,
        translation: response.data.data.translations.translatedText,
        language: language
      }
      state.commit('addTranslation', data)
    }
  },
  modules: {
  }
})
