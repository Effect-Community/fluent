// ets_tracing: off

import type * as A from "@effect-ts/core/Collections/Immutable/Array"
import type * as T from "@effect-ts/core/Effect"
import type * as E from "@effect-ts/core/Either"
import type * as O from "@effect-ts/core/Option"
import type * as S from "@effect-ts/core/Sync"

interface ArrayOps {
  /**
   * @ets_rewrite_method pipe from "smart:pipe"
   */
  pipe<Self, Ret>(this: Self, f: (self: Self) => Ret): Ret

  /**
   * @ets_rewrite_method map_ from "@effect-ts/core/Collections/Immutable/Array"
   */
  map<AX, B>(this: A.Array<AX>, f: (a: AX) => B): A.Array<B>

  /**
   * @ets_rewrite_method map_ from "@effect-ts/core/Collections/Immutable/Array"
   */
  map<AX, B>(this: AX[], f: (a: AX) => B): B[]

  /**
   * @ets_rewrite_method mapSync_ from "@effect-ts/core/Collections/Immutable/Array"
   */
  mapM<AX, R, E, B>(
    this: A.Array<AX>,
    f: (a: AX) => S.Sync<R, E, B>
  ): S.Sync<R, E, readonly B[]>

  /**
   * @ets_rewrite_method mapEither_ from "@effect-ts/fluent/Fx/Array"
   */
  mapM<AX, E, B>(
    this: A.Array<AX>,
    f: (a: AX) => E.Either<E, B>
  ): E.Either<E, A.Array<B>>

  /**
   * @ets_rewrite_method mapOption_ from "@effect-ts/fluent/Fx/Array"
   */
  mapM<AX, B>(this: A.Array<AX>, f: (a: AX) => O.Option<B>): O.Option<A.Array<B>>

  /**
   * @ets_rewrite_method mapEffect_ from "@effect-ts/core/Collections/Immutable/Array"
   */
  mapM<AX, R, E, B>(
    this: A.Array<AX>,
    f: (a: AX) => T.Effect<R, E, B>
  ): T.Effect<R, E, readonly B[]>

  /**
   * @ets_rewrite_method toMutable from "@effect-ts/core/Collections/Immutable/Array"
   */
  mutable<AX>(this: A.Array<AX>): AX[]

  /**
   * @ets_rewrite_method fromMutable from "@effect-ts/core/Collections/Immutable/Array"
   */
  immutable<AX>(this: AX[]): A.Array<AX>
}

declare global {
  interface Array<T> extends ArrayOps {}
  interface ReadonlyArray<T> extends ArrayOps {
    /**
     * @ets_rewrite_method map_ from "@effect-ts/core/Collections/Immutable/Array"
     */
    map<AX, B>(this: A.Array<AX>, f: (a: AX) => B): A.Array<B>
  }
}
