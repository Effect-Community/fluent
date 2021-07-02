import type * as A from "@effect-ts/core/Collections/Immutable/Array"
import * as T from "@effect-ts/core/Effect"
import type * as E from "@effect-ts/core/Either"
import type * as O from "@effect-ts/core/Option"
import type * as S from "@effect-ts/core/Sync"

declare global {
  interface Array<T> {
    /**
     * @rewrite pipe from "smart:pipe"
     */
    pipe<Self, Ret>(this: Self, f: (self: Self) => Ret): Ret

    /**
     * @rewrite mapSync_ from "@effect-ts/core/Collections/Immutable/Array"
     */
    mapM<AX, R, E, B>(
      this: A.Array<AX>,
      f: (a: AX) => S.Sync<R, E, B>
    ): S.Sync<R, E, readonly B[]>

    /**
     * @rewrite mapEither_ from "@effect-ts/fluent/Fx/Array"
     */
    mapM<AX, E, B>(
      this: A.Array<AX>,
      f: (a: AX) => E.Either<E, B>
    ): E.Either<E, A.Array<B>>

    /**
     * @rewrite mapOption_ from "@effect-ts/fluent/Fx/Array"
     */
    mapM<AX, B>(this: A.Array<AX>, f: (a: AX) => O.Option<B>): O.Option<A.Array<B>>

    /**
     * @rewrite mapEffect_ from "@effect-ts/core/Collections/Immutable/Array"
     */
    mapM<AX, R, E, B>(
      this: A.Array<AX>,
      f: (a: AX) => T.Effect<R, E, B>
    ): T.Effect<R, E, readonly B[]>
  }
}
