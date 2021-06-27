import * as A from "@effect-ts/core/Collections/Immutable/Array"
import * as T from "@effect-ts/system/Sync"

/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */
export function mapSync_<A, R, E, B>(self: A.Array<A>, f: (a: A) => T.Sync<R, E, B>) {
  return T.map_(T.forEach_(self, f), A.from)
}

/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @dataFirst mapSync_
 */
export function mapSync<A, R, E, B>(f: (a: A) => T.Sync<R, E, B>) {
  return (self: A.Array<A>) => mapSync_(self, f)
}
