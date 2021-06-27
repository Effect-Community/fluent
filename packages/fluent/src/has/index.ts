import * as T from "@effect-ts/core/Effect"
import type { Has, Tag } from "@effect-ts/core/Has"
import type { Compute, IsEqualTo, UnionToIntersection } from "@effect-ts/core/Utils"

export type DerivedLifted<A> = UnionToIntersection<
  {
    [K in keyof A]: [A[K]] extends [
      (...args: infer ARGS) => T.Effect<infer RX, infer EX, infer AX>
    ]
      ? IsEqualTo<(...args: ARGS) => T.Effect<RX, EX, AX>, A[K]> extends true
        ? {
            [H in K]: (...args: ARGS) => T.Effect<RX & Has<A>, EX, AX>
          }
        : never
      : never
  }[keyof A]
>

export function deriveLifted_<TX, Ks extends readonly (keyof DerivedLifted<TX>)[]>(
  self: Tag<TX>,
  ...keys: Ks
): Compute<
  UnionToIntersection<
    {
      [k in keyof Ks]: Ks[k] extends keyof DerivedLifted<TX>
        ? { [H in Ks[k]]: DerivedLifted<TX>[Ks[k]] }
        : never
    }[number]
  >,
  "flat"
> {
  const res = {}

  for (const k of keys) {
    // @ts-expect-error
    res[k] = (...args: any[]) => T.accessServiceM(self)((_) => _[k](...args))
  }

  // @ts-expect-error
  return res
}
