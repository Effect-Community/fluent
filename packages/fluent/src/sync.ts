import type * as T from "@effect-ts/core/Effect"
import type * as S from "@effect-ts/core/Sync"

declare module "@effect-ts/system/Sync/core" {
  export interface Sync<R, E, A> extends T.Effect<R, E, A> {
    /**
     * @rewrite chain_ from "@effect-ts/core/Sync"
     */
    chain<RX, EX, AX, R2, E2, B>(
      this: S.Sync<RX, EX, AX>,
      f: (a: AX) => S.Sync<R2, E2, B>
    ): S.Sync<RX & R2, EX | E2, B>

    /**
     * @rewrite chain_ from "@effect-ts/core/Effect"
     */
    chain<RX, EX, AX, R2, E2, B>(
      this: S.Sync<RX, EX, AX>,
      f: (a: AX) => T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, B>
  }
}
