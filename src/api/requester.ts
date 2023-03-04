import { Auth } from 'aws-amplify'
import Config from 'react-native-config'
import axios from 'axios'

const instance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})
const needsAccessToken = ['query_assets_by_nft_id', 'query_collections']

instance.interceptors.request.use(
  async (config: any) => {
    if (!config.data) {
      if (
        config.params &&
        needsAccessToken.includes(config.url.split('/')[0])
      ) {
        const session = await Auth.currentSession()
        const queryParams = JSON.parse(config.params.QUERY_PARAMS)
        queryParams.userId = session.getIdToken().payload.sub
        config.params.QUERY_PARAMS = JSON.stringify(queryParams)
        config.headers.Authorization = `Bearer ${session
          .getAccessToken()
          .getJwtToken()}`
      }
      return config
    } else {
      const session = await Auth.currentSession()
      config.headers.Authorization = `Bearer ${session
        .getAccessToken()
        .getJwtToken()}`
      config.data.userId = session.getIdToken().payload.sub

      // console.log('configconfig', config)
      return config
    }
  },
  error => {
    if (error && error.response && error.response.status) {
      if (error.response.status === 401) {
      } else {
        return Promise.reject(error)
      }
    } else {
      return Promise.reject(error)
    }
  },
)

export { instance }
