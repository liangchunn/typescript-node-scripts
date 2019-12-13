export type OptChainType = {
  a?: {
    b?: {
      c: number
    }
  }
}

export function f(arg: OptChainType) {
  return arg.a?.b?.c ?? Infinity
}
