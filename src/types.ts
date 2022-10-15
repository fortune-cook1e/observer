export interface Target extends Object {
  [prop: string]: any
}

export interface Reaction extends ReactionFn {
  ob?: boolean
}

export type ReactionFn = (args?: any) => any

export type ProxyKey = string | symbol

export interface Operation<T = Target> {
  target: T
  type: 'get' | 'set'
  key: ProxyKey
}
