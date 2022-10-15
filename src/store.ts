import { Operation, Target, Reaction, ProxyKey } from './types'
// connection -> key:Target value: Map()
// Map -> key:keyof Target value:Set
// Set -> Reaction[]
const connectionStore = new WeakMap<Target, Map<ProxyKey, Set<Reaction>>>()

export function createStore(target: Target) {
  let targetWeakMap = connectionStore.get(target)
  if (!targetWeakMap) {
    targetWeakMap = new Map()
    connectionStore.set(target, targetWeakMap)
  }
  return targetWeakMap
}

// 将当前reaction注册到 Set中
export function registerReactionForOperation<T>(reaction: Reaction, operation: Operation<T>) {
  const { key, target } = operation
  const reactionForTarget = connectionStore.get(target as Target) as Map<ProxyKey, Set<Reaction>>
  let reactionForKey = reactionForTarget.get(key)

  if (!reactionForKey) {
    reactionForKey = new Set()
    reactionForTarget.set(key, reactionForKey)
  }
  if (!reactionForKey.has(reaction)) {
    reactionForKey.add(reaction)
  }
}

/**
 * @description 将reaction添加到对应key的Set中
 * @param {Operation} operaion
 * @param {Reaction} reaction
 * @date 2022-10-15 21:17:39
 */
export function getReactionsForOperation<T>(operaion: Operation<T>) {
  const { target, key } = operaion
  const reactionForTarget = connectionStore.get(target as any) as Map<ProxyKey, Set<Reaction>>
  const reactionForKey: Set<Reaction> = new Set()

  addReactionForKey<T>({
    reactionForKey,
    reactionForTarget,
    key
  })

  return reactionForKey
}

// 将reaction添加到对应Set中
export function addReactionForKey<T>({
  reactionForKey,
  reactionForTarget,
  key
}: {
  reactionForKey: Set<Reaction>
  reactionForTarget: Map<ProxyKey, Set<Reaction>>
  key: ProxyKey
}) {
  const _reactionForKey = reactionForTarget.get(key)
  if (_reactionForKey) {
    _reactionForKey.forEach(r => {
      reactionForKey.add(r)
    })
  }
}
