import HTTP from './request'

const http = new HTTP({
  url: 'localhost:8000',
  timeout: 2000,
  requestInterceptorsOnFulfilled: (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.token = token
    }
    return config
  },
})

export default http
