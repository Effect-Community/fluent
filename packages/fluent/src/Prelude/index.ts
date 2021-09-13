/* eslint-disable @typescript-eslint/no-namespace */
import { Array } from "@effect-ts/core/Collections/Immutable/Array"
import { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import { Tuple } from "@effect-ts/core/Collections/Immutable/Tuple"
import type * as T from "@effect-ts/core/Effect"
import { Effect } from "@effect-ts/core/Effect"
import { Managed } from "@effect-ts/core/Effect/Managed"
import { Promise } from "@effect-ts/core/Effect/Promise"
import { Has, Tag } from "@effect-ts/core/Has"
import { Option } from "@effect-ts/core/Option"
import { _A, _E, _R } from "@effect-ts/core/Utils"

import {} from "../Extensions"
import { Data } from "../Extensions/data"

declare global {
  export namespace $T {
    export type EffectU<A> = Effect<unknown, never, A>
    export type EffectE<E, A> = Effect<unknown, E, A>
    export type EffectR<R, A> = Effect<R, never, A>
    export type Cb<A> = T.Cb<A>

    export {
      Array,
      Effect,
      Promise,
      Managed,
      Data,
      Option,
      Chunk,
      Tag,
      Has,
      Tuple,
      _A,
      _E,
      _R
    }
  }
}

export {}
