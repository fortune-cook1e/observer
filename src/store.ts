import { Target } from './types'
// connection -> key:Target value: Map()
// Map -> key:keyof Target value:Set
// Set -> Reaction[]
const connectionStore = new WeakMap()

export function createStore(target: Target) {
  let targetWeakMap = connectionStore.get(target)
  if (!targetWeakMap) {
    targetWeakMap = new Map()
    connectionStore.set(target, targetWeakMap)
  }
  return targetWeakMap
}
