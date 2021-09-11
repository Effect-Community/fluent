import type * as _Case from "@effect-ts/core/Case"
import type { Chunk as XChunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import type { Effect as XEffect } from "@effect-ts/core/Effect"
import type { Managed as XManaged } from "@effect-ts/core/Effect/Managed"
import type * as _Function from "@effect-ts/core/Function"
import type * as _Has from "@effect-ts/core/Has"
import type { _A, _E, _R } from "@effect-ts/core/Utils"

import type { Data as XData } from "../Extensions/data"

declare global {
  type Effect<R, E, A> = XEffect<R, E, A>
  const Effect: typeof XEffect

  type Managed<R, E, A> = XManaged<R, E, A>
  const Managed: typeof XManaged

  type Chunk<A> = XChunk<A>
  const Chunk: typeof XChunk

  type _AOf<X> = _A<X>
  type _EOf<X> = _E<X>
  type _ROf<X> = _R<X>

  type Data = typeof XData
  const Data: typeof XData
}
