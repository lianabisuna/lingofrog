import Vue from 'vue'
import Vuex from 'vuex'
import Language from '@/services/language'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    languages: [],
    selected: []
  },
  getters: {
    languages: state => state.languages,
    selected: state => state.selected
  },
  mutations: {
    setLanguages(state, data) {
      state.languages = data
    },
    addSelected(state, data) {
      state.selected.push(data)
    },
    removeSelected(state, index) {
      state.selected.splice(index, 1)
    }
  },
  actions: {
    async getLanguages(state) {
      let response = await Language.getLanguages()
      localStorage.setItem('languages', JSON.stringify(response.data.languages))
      state.commit('setLanguages', response.data.languages)
    }
  },
  modules: {
  }
})
