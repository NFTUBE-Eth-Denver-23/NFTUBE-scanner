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

instance.interceptors.request.use(
  async (config: any) => {
    return config
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
