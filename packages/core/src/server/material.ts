import http from './request'

interface ResponceData {
  code: string
  data: any
}

export function getMaterails() {
  return http.get<ResponceData>({
    url: '/material',
  })
}
