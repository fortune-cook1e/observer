import { ProxyKey } from './types'

function get<T>(target: T, key: ProxyKey, receiver: any) {
  const result = Reflect.get(target as object, key, receiver)
  return result
}

export default {
  get
}
