// ets_tracing: off

import * as A from "@effect-ts/core/Collections/Immutable/Array"
import * as E from "@effect-ts/core/Either"
import * as O from "@effect-ts/core/Option"

export function mapEither_<E, A, B>(
  self: A.Array<A>,
  f: (a: A) => E.Either<E, B>
): E.Either<E, A.Array<B>> {
  const res = [] as B[]
  for (const a of self) {
    const x = f(a)
    if (E.isLeft(x)) {
      return x
    }
    res.push(x.right)
  }
  return E.right(res)
}

export function mapOption_<E, A, B>(
  self: A.Array<A>,
  f: (a: A) => O.Option<B>
): O.Option<A.Array<B>> {
  const res = [] as B[]
  for (const a of self) {
    const x = f(a)
    if (O.isNone(x)) {
      return x
    }
    res.push(x.value)
  }
  return O.some(res)
}
