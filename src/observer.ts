import { runAsReaction } from './reaction'
import { Reaction, ReactionFn } from './types'

export function observe(fn: ReactionFn) {
  const reaction = function () {
    // @ts-ignore
    const context = this
    return runAsReaction(reaction, fn, context, arguments)
  }

  reaction()

  return reaction
}
