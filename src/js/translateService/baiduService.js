import md5 from 'md5'
import sharedTranslateService from './shared'

const baiduService = () => {
  let state = {
    id: 'baidu',
    name: 'Baidu Translate',
    smallcase: 'ʙᴀɪᴅᴜ',

    getUrl: (sourceLanguage, targetLanguage, query) => {
      sourceLanguage = sourceLanguage ? sourceLanguage.split('-')[0] : 'auto'
      targetLanguage = targetLanguage.split('-')[0]
      const path = 'https://fanyi-api.baidu.com/api/trans/vip/translate'
      const params = {
        'q': encodeURI(query),
        'from': sourceLanguage,
        'to': targetLanguage,
        'appid': '20190324000280614',
        'salt': '1435660288',
        'sign': md5(`20190324000280614${query}1435660288rYR8A0Lek15iB6v1yn0k`)
      }
      return baiduService().getUrlWithParams(path, params)
    },

    getSiteUrl: (sourceLanguage, targetLanguage, query) => {
      sourceLanguage = sourceLanguage ? sourceLanguage.split('-')[0] : 'auto'
      targetLanguage = targetLanguage.split('-')[0]
      return `https://fanyi.baidu.com/#${sourceLanguage}/${targetLanguage}/${encodeURI(query)}`
    },

    getNormalizedData: (data) => {
      console.info(data, 'data')
      const translations = data['trans_result']
      const detectedSourceLanguage = data.from
      const normalizedData = translations.map(translation => {
        return {
          translatedText: translation.dst,
          detectedSourceLanguage: detectedSourceLanguage
        }
      })
      return normalizedData
    }
  }
  return Object.assign(
    state,
    sharedTranslateService(state)
  )
}

export default baiduService

