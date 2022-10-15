import handlers from './handlers'
import { rawToProxy, proxyToRaw } from './internal'
import { createStore } from './store'

export function observable<T extends object>(target: T) {
  const proxyTarget = rawToProxy.get(target)
  return proxyTarget || createObservable(target)
}

function createObservable<T extends object>(target: T) {
  const proxyTarget = new Proxy<T>(target, handlers)
  rawToProxy.set(target, proxyTarget)
  proxyToRaw.set(proxyTarget, target)
  createStore(target)
  return proxyTarget
}
