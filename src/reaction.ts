import { getReactionsForOperation, registerReactionForOperation } from './store'
import { Operation, Reaction, ReactionFn } from './types'

const reactionStack: Reaction[] = []

// runAsReaction -> registerReactionByOperation
export function runAsReaction(reaction: Reaction, fn: ReactionFn, context: any, args: any) {
  if (reactionStack.indexOf(reaction) === -1) {
    try {
      reactionStack.push(reaction)
      return Reflect.apply(fn, context, args)
    } finally {
      reactionStack.pop()
    }
  }
}

// 将当前正在执行reaction注册到当前对象的key对应Set中

export function registerRunningReactionForOperation<T>(operation: Operation<T>) {
  const runningReaction = reactionStack[reactionStack.length - 1] as undefined | Reaction
  if (runningReaction) {
    registerReactionForOperation(runningReaction, operation)
  }
}

export function callReactionsForOperation<T>(operation: Operation<T>) {
  getReactionsForOperation<T>(operation).forEach(r => {
    callEveryReaction(r)
  })
}

export function callEveryReaction(reaction: Reaction) {
  reaction()
}
