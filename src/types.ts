export interface Target {
  [prop: string]: any
}

export interface Reaction extends ReactionFn {
  ob?: boolean
}

export type ReactionFn = (args: any) => any

export type ProxyKey = string | symbol

export interface Operation {
  target: Target
  type: 'get' | 'set'
}
