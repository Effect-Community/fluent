import * as E from "@effect-ts/core/Either"
import * as O from "@effect-ts/core/Option"

/**
 * Gets Left
 */
export function unsafeGetLeft<E, A>(self: E.Either<E, A>): E | undefined {
  return self._tag === "Left" ? self.left : void 0
}

/**
 * Gets Left as Option
 */
export function getLeft<E, A>(self: E.Either<E, A>): O.Option<E> {
  return self._tag === "Left" ? O.some(self.left) : O.none
}

/**
 * Gets Right as Option
 */
export function getRight<E, A>(self: E.Either<E, A>): O.Option<A> {
  return self._tag === "Right" ? O.some(self.right) : O.none
}

/**
 * Gets Right
 */
export function unsafeGetRight<E, A>(self: E.Either<E, A>): A | undefined {
  return self._tag === "Right" ? self.right : void 0
}
