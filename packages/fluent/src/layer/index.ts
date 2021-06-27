import * as T from "@effect-ts/core/Effect"
import * as L from "@effect-ts/core/Effect/Layer"
import type { Has, Tag } from "@effect-ts/core/Has"

/**
 * Constructs a layer from the specified effect.
 */
export function fromEffect_<R, E, T>(
  resource: T.Effect<R, E, T>,
  has: Tag<T>
): L.Layer<R, E, Has<T>> {
  return L.fromEffect(has)(resource)
}
