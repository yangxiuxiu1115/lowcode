import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { InstanceConfig, RequestConfig } from './type'

class HTTP {
  instance: AxiosInstance
  constructor(config: InstanceConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      config.requestInterceptorsOnFulfilled,
      config.requestInterceptorsOnRejected
    )
    this.instance.interceptors.response.use(
      config.responceInterceptorsOnFulfilled,
      config.responceInterceptorsOnRejected
    )
  }

  request<T>(config: RequestConfig): Promise<T> {
    if (config.requestInterceptors) {
      config = config.requestInterceptors(config)
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((responce) => {
          if (config.responceInterceptors) {
            responce = config.responceInterceptors(responce)
          }

          resolve(responce)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: RequestConfig) {
    return this.request<T>({
      method: 'get',
      ...config,
    })
  }

  post<T>(config: RequestConfig) {
    return this.request<T>({
      method: 'post',
      ...config,
    })
  }

  delete<T>(config: RequestConfig) {
    return this.request<T>({
      method: 'delete',
      ...config,
    })
  }

  patch<T>(config: RequestConfig) {
    return this.request<T>({
      method: 'patch',
      ...config,
    })
  }
}

export default HTTP
