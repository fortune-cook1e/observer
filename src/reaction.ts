import { Operation, Reaction, ReactionFn } from './types'

const reactionStack: Reaction[] = []

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

// 将reaction注册到当前对象的key对应map中
export function registerReactionByOperation(operation: Operation) {
  const runningReaction = reactionStack[reactionStack.length - 1] as undefined | Reaction
  if (runningReaction) {
  }
}

// function queueReaction() {}
