import { language } from '@/common/axios.js'

export default {
  getLanguages() {
    return language.get('/languages')
  },
  detectLanguage(payload) {
    return language.post('/detect', payload)
  },
  translateText(payload) {
    return language.post('', payload)
  }
};