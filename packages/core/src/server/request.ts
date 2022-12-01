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

  retry<T>(config: RequestConfig, limit: number = 3) {
    return new Promise((resolve, reject) => {
      this.request<T>(config)
        .then((value) => {
          resolve(value)
        })
        .catch((err) => {
          if (limit) {
            this.retry<T>(config, limit--)
              .then((val) => {
                resolve(val)
              })
              .catch((err) => {
                reject(err)
              })
          } else {
            reject(err)
          }
        })
    })
  }

  Limit<T>(configList: RequestConfig[], max: number = 5) {
    return new Promise((resolve, reject) => {
      const len = Math.min(configList.length, max)
      const values: T[] = []
      let index: number = 0
      const start = () => {
        if (index === configList.length) {
          resolve(values)
          return
        }
        const config = configList[index]
        this.request<T>(config)
          .then((val) => {
            values[index++] = val
            start()
          })
          .catch((err) => {
            values[index++] = err
            start()
          })
      }

      while (index < len) {
        start()
        index++
      }
    })
  }
}

export default HTTP
