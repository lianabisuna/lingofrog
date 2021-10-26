import { language as axios } from '@/common/axios.js'

export default {
  getLanguages() {
    return axios.get('/languages')
  },
  detectLanguage(payload) {
    return axios.post('/detect', payload)
  },
  translateText(data) {
    let formData = new FormData();
    formData.append('q', data.q)
    formData.append('source', data.source)
    formData.append('target', data.target)
    formData.append('format', data.format)
    return axios.post('/translate', formData)
  }
};