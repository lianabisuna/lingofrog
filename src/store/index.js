import Vue from 'vue'
import Vuex from 'vuex'
import Language from '@/services/language'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: '',
    languages: [],
    selected: [],
    translations: [
      // { source: '', target: '', translation: '', language: '', flag: "" }
    ]
  },
  getters: {
    text: state => state.text,
    languages: state => state.languages,
    selected: state => state.selected,
    translations: state => state.translations
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
      state.translations.push(data)
    }
  },
  actions: {
    async getLanguages(state) {
      let response = await Language.getLanguages()
      localStorage.setItem('languages', JSON.stringify(response.data))
      state.commit('setLanguages', response.data)
    },
    async translateText(state, {payload, language}) {
      let response = await Language.translateText(payload)
      let data = {
        source: payload.source,
        target: payload.target,
        translation: response.data.translatedText,
        language: language
      }
      state.commit('addTranslation', data)
    }
  },
  modules: {
  }
})
