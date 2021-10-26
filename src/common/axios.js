import axios from 'axios'

const language = axios.create({
  baseURL: 'https://libretranslate.de'
  // baseURL: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
  // headers: {
  //   'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
  //   'x-rapidapi-key': '3edc4281f5msh7f023170c4a1bf0p13f5f2jsn7699bb9495fe'
  // }
})

// const flag = axios.create({
//   baseURL: '',
//   headers: {
//     '': ''
//   }
// })

export {
  language,
  // flag
};