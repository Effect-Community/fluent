import type * as A from "@effect-ts/core/Collections/Immutable/Array"
import * as T from "@effect-ts/core/Effect"
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
     * @rewrite mapEffect_ from "@effect-ts/core/Collections/Immutable/Array"
     */
    mapM<AX, R, E, B>(
      this: A.Array<AX>,
      f: (a: AX) => T.Effect<R, E, B>
    ): T.Effect<R, E, readonly B[]>
  }
}
