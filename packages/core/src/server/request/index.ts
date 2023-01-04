import HTTP from './request'

const http = new HTTP({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 2000,
  requestInterceptorsOnFulfilled: (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.token = token
    }
    return config
  },
  responceInterceptorsOnFulfilled: (responce) => {
    if (responce.status === 200) {
      return responce.data
    }
    return responce
  }
})

export default http
