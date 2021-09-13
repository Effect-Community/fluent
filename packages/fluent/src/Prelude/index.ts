/* eslint-disable @typescript-eslint/no-namespace */
import { Array } from "@effect-ts/core/Collections/Immutable/Array"
import { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import { Tuple } from "@effect-ts/core/Collections/Immutable/Tuple"
import {
  Cb,
  Effect,
  IO as EffectE,
  RIO as EffectR,
  UIO as EffectU
} from "@effect-ts/core/Effect"
import { Managed } from "@effect-ts/core/Effect/Managed"
import { Promise } from "@effect-ts/core/Effect/Promise"
import { Has, Tag } from "@effect-ts/core/Has"
import { Option } from "@effect-ts/core/Option"
import { _A, _E, _R } from "@effect-ts/core/Utils"

import {} from "../Extensions"
import { Data } from "../Extensions/data"

declare global {
  export namespace $T {
    export {
      Array,
      Effect,
      Promise,
      Managed,
      Data,
      Option,
      Chunk,
      Cb,
      EffectU,
      EffectR,
      EffectE,
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
