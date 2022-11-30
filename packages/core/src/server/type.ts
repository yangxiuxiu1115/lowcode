import type {
  CreateAxiosDefaults,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

export interface InstanceConfig<T = any> extends CreateAxiosDefaults {
  requestInterceptorsOnFulfilled?: (
    config: AxiosRequestConfig
  ) => AxiosRequestConfig
  requestInterceptorsOnRejected?: (err: any) => any
  responceInterceptorsOnFulfilled?: (responce: T) => T
  responceInterceptorsOnRejected?: (err: any) => any
}

export interface RequestConfig<T = any> extends AxiosRequestConfig {
  requestInterceptors?: (config: AxiosRequestConfig<T>) => AxiosRequestConfig<T>
  responceInterceptors?: (responce: T) => T
}
