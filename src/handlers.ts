import { ProxyKey } from './types'
import { registerRunningReactionForOperation, callReactionsForOperation } from './reaction'
import { rawToProxy } from './internal'

function get<T>(target: T, key: ProxyKey, receiver: any) {
  const result = Reflect.get(target as object, key, receiver)

  const observableResult = rawToProxy.get(target)

  // 将当前正在执行的reaction注册到 key对应的Set中
  // 注册原理：当回调函数中触发数据的get时，当前数据可以捕捉到当前正在
  // 执行的reaction 通过 reactionStack实现
  registerRunningReactionForOperation({
    target,
    key,
    type: 'get'
  })

  if (observableResult) {
    return observableResult
  }

  return result
}

function set<T>(target: T, key: ProxyKey, value: any, receiver: any) {
  const result = Reflect.set(target as object, key, value, receiver)

  const oldValue = target[key as keyof T]

  // 如果值不相同则执行所有reaction
  if (oldValue !== value) {
    callReactionsForOperation({
      target,
      key,
      type: 'set'
    })
  }

  return result
}

export default {
  get,
  set
}
