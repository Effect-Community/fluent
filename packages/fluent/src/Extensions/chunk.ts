/* eslint-disable @typescript-eslint/no-namespace */

import type * as C from "@effect-ts/core/Collections/Immutable/Chunk"
import type * as T from "@effect-ts/core/Effect"
import type * as F from "@effect-ts/core/Function"

declare module "@effect-ts/system/Collections/Immutable/Chunk" {
  namespace Chunk {
    /**
     * @ets_rewrite_static from from "@effect-ts/core/Collections/Immutable/Chunk"
     */
    const from: typeof C.from
    /**
     * @ets_rewrite_static empty from "@effect-ts/core/Collections/Immutable/Chunk"
     */
    const empty: typeof C.empty
  }

  interface Chunk<A> {
    /**
     * @ets_rewrite_method toArray from "@effect-ts/core/Collections/Immutable/Chunk"
     */
    array<A>(this: Chunk<A>): readonly A[]

    /**
     * @ets_rewrite_method map_ from "@effect-ts/core/Collections/Immutable/Chunk"
     */
    map<A, B>(this: Chunk<A>, f: (a: A) => B): Chunk<B>

    /**
     * @ets_rewrite_method mapM_ from "@effect-ts/core/Collections/Immutable/Chunk"
     */
    mapM<R, E, A, B>(
      this: Chunk<A>,
      f: (a: A) => T.Effect<R, E, B>
    ): T.Effect<R, E, Chunk<B>>

    /**
     * @ets_rewrite_method filter_ from "@effect-ts/core/Collections/Immutable/Chunk"
     */
    filter<A, B extends A>(this: Chunk<A>, f: F.Refinement<A, B>): Chunk<B>

    /**
     * @ets_rewrite_method filter_ from "@effect-ts/core/Collections/Immutable/Chunk"
     */
    filter<A>(this: Chunk<A>, f: F.Predicate<A>): Chunk<A>
  }
}
