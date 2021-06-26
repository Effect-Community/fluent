// tracing: off

import type { Tuple } from "@effect-ts/core/Collections/Immutable/Tuple"
import type * as T from "@effect-ts/core/Effect"
import type { Cause } from "@effect-ts/core/Effect/Cause"
import type { Exit } from "@effect-ts/core/Effect/Exit"
import type { Fiber } from "@effect-ts/core/Effect/Fiber"
import type { Layer } from "@effect-ts/core/Effect/Layer"
import type * as M from "@effect-ts/core/Effect/Managed"
import type { Either } from "@effect-ts/core/Either"
import type { Has, Tag } from "@effect-ts/core/Has"
import type * as S from "@effect-ts/core/Sync"
import type { Compute, Erase } from "@effect-ts/core/Utils"

declare module "@effect-ts/system/Sync/core" {
  export interface Sync<R, E, A> extends T.Effect<R, E, A> {
    /**
     * @rewrite chain_ from "@effect-ts/core/Sync"
     */
    chain<R2, E2, B, AX extends A>(
      f: (a: AX) => S.Sync<R2, E2, B>
    ): S.Sync<R & R2, E | E2, B>

    /**
     * @rewrite chain_ from "@effect-ts/core/Effect"
     */
    chain<R2, E2, B, AX extends A>(
      f: (a: AX) => T.Effect<R2, E2, B>
    ): T.Effect<R & R2, E | E2, B>
  }
}

declare module "@effect-ts/system/Effect/effect" {
  export interface Base<R, E, A> extends Effect<R, E, A> {}

  export interface Effect<R, E, A> {
    /**
     * @rewrite bracketExit_ from "@effect-ts/core/Effect"
     */
    bracket<R2, E2, A2, R3, B, AX extends A>(
      use: (a: AX) => Effect<R2, E2, A2>,
      release: (a: AX, exit: Exit<E2, A2>) => Effect<R3, never, B>
    ): T.Effect<R & R2 & R3, E | E2, A2>

    /**
     * @rewrite ensuring_ from "@effect-ts/core/Effect"
     */
    ensuring<R1, X>(finalizer: Effect<R1, never, X>): T.Effect<R & R1, E, A>

    /**
     * @rewrite provideService_ from "@effect-ts/core/Effect"
     */
    inject<A2>(
      tag: Tag<A2>,
      value: A2
    ): T.Effect<R extends Has<A2> & infer K ? K : unknown, E, A>

    /**
     * @rewrite provideServiceM_ from "@effect-ts/core/Effect"
     */
    inject<R2, E2, A2>(
      tag: Tag<A2>,
      value: T.Effect<R2, E2, A2>
    ): T.Effect<R2 & (R extends Has<A2> & infer K ? K : unknown), E | E2, A>

    /**
     * @rewrite provideSomeLayer_ from "@effect-ts/core/Effect"
     */
    inject<R2, E2, A2>(layer: Layer<R2, E2, A2>): T.Effect<Erase<R, A2> & R2, E | E2, A>

    /**
     * @rewrite foldM_ from "@effect-ts/core/Effect"
     */
    foldM<R2, E2, A2, R3, E3, A3, EX extends E, AX extends A>(
      g: (e: EX) => T.Effect<R3, E3, A3>,
      f: (a: AX) => T.Effect<R2, E2, A2>
    ): T.Effect<R & R2 & R3, E2 | E3, A2 | A3>

    /**
     * @rewrite foldCauseM_ from "@effect-ts/core/Effect"
     */
    foldCauseM<R2, E2, A2, R3, E3, A3, EX extends E, AX extends A>(
      g: (e: Cause<EX>) => T.Effect<R3, E3, A3>,
      f: (a: AX) => T.Effect<R2, E2, A2>
    ): T.Effect<R & R2 & R3, E2 | E3, A2 | A3>

    /**
     * @rewrite fork from "@effect-ts/core/Effect"
     */
    fork<EX extends E, AX extends A>(): T.Effect<R, never, Fiber<EX, AX>>

    /**
     * @rewrite forkManaged from "@effect-ts/core/Effect"
     */
    forkManaged<EX extends E, AX extends A>(): M.Managed<R, never, Fiber<EX, AX>>

    /**
     * @rewrite result from "@effect-ts/core/Effect"
     */
    result<EX extends E, AX extends A>(): T.Effect<R, never, Exit<EX, AX>>

    /**
     * @rewrite either from "@effect-ts/core/Effect"
     */
    either<EX extends E, AX extends A>(): T.Effect<R, never, Either<EX, AX>>

    /**
     * @rewrite as_ from "@effect-ts/core/Effect"
     */
    as<B>(b: B): T.Effect<R, E, B>

    /**
     * @rewrite map_ from "@effect-ts/core/Effect"
     */
    map<AX extends A, B>(f: (a: AX) => B): T.Effect<R, E, B>

    /**
     * @rewrite chain_ from "@effect-ts/core/Effect"
     */
    chain<AX extends A, R2, E2, B>(
      f: (a: AX) => T.Effect<R2, E2, B>
    ): T.Effect<R & R2, E | E2, B>

    /**
     * @rewrite tap_ from "@effect-ts/core/Effect"
     */
    tap<AX extends A, R2, E2, B>(
      f: (a: AX) => T.Effect<R2, E2, B>
    ): T.Effect<R & R2, E | E2, A>

    /**
     * @rewrite tapError_ from "@effect-ts/core/Effect"
     */
    tapError<EX extends E, R2, E2, B>(
      f: (e: EX) => T.Effect<R2, E2, B>
    ): T.Effect<R & R2, E | E2, A>

    /**
     * @rewrite tapCause_ from "@effect-ts/core/Effect"
     */
    tapCause<EX extends E, R2, E2, B>(
      f: (e: Cause<EX>) => T.Effect<R2, E2, B>
    ): T.Effect<R & R2, E | E2, A>

    /**
     * @rewrite tapBoth_ from "@effect-ts/core/Effect"
     */
    tapBoth<EX extends E, AX extends A, R2, E2, B, R3, E3, C>(
      f: (e: EX) => T.Effect<R2, E2, B>,
      g: (e: AX) => T.Effect<R2, E3, C>
    ): T.Effect<R & R2 & R3, E | E2 | E3, A>

    /**
     * @rewrite catchAll_ from "@effect-ts/core/Effect"
     */
    catchAll<EX extends E, R2, E2, B>(
      f: (e: EX) => T.Effect<R2, E2, B>
    ): T.Effect<R & R2, E2, A | B>

    /**
     * @rewrite catchTag_ from "@effect-ts/core/Effect"
     */
    catchTag<Tag extends E extends { _tag: infer X } ? X : never, R2, E2, B>(
      tag: Tag,
      f: (e: Extract<E, { readonly _tag: Tag }>) => T.Effect<R2, E2, B>
    ): T.Effect<R & R2, E2 | Exclude<E, { readonly _tag: Tag }>, A | B>

    /**
     * @rewrite race_ from "@effect-ts/core/Effect"
     */
    race<R2, E2, B>(f: T.Effect<R2, E2, B>): T.Effect<R & R2, E | E2, A | B>

    /**
     * @rewrite zip_ from "@effect-ts/core/Effect"
     */
    zip<R2, E2, B, AX extends A>(
      f: T.Effect<R2, E2, B>
    ): T.Effect<R & R2, E | E2, Tuple<[AX, B]>>

    /**
     * @rewrite zipRight_ from "@effect-ts/core/Effect"
     */
    zipRight<R2, E2, B>(f: T.Effect<R2, E2, B>): T.Effect<R & R2, E | E2, B>

    /**
     * @rewrite zipLeft_ from "@effect-ts/core/Effect"
     */
    zipLeft<R2, E2, B>(f: T.Effect<R2, E2, B>): T.Effect<R & R2, E | E2, A>

    /**
     * @rewrite zipPar_ from "@effect-ts/core/Effect"
     */
    zipPar<R2, E2, B, AX extends A>(
      f: T.Effect<R2, E2, B>
    ): T.Effect<R & R2, E | E2, Tuple<[AX, B]>>

    runPromise: [(_: R) => void] extends [(_: T.DefaultEnv) => void]
      ? {
          /**
           * @rewrite runPromise from "@effect-ts/core/Effect"
           */
          <AX extends A>(): Promise<AX>
        }
      : ["required", (_: R) => void]

    runPromiseExit: [(_: R) => void] extends [(_: T.DefaultEnv) => void]
      ? {
          /**
           * @rewrite runPromiseExit from "@effect-ts/core/Effect"
           */
          <EX extends E, AX extends A>(): Promise<Exit<EX, AX>>
        }
      : ["required", (_: R) => void]

    absolve: [() => A] extends [() => Either<infer EE, infer EA>]
      ? {
          /**
           * @rewrite absolve from "@effect-ts/core/Effect"
           */
          (): T.Effect<R, E | EE, EA>
        }
      : ["absolve is available only when A is Either"]

    bind: [() => A] extends [() => Record<string, unknown>]
      ? {
          /**
           * @rewrite bind_ from "@effect-ts/core/Effect"
           */
          <N extends string, R2, E2, B>(
            n: N & N extends keyof A ? [`${N} already in use`] : N,
            f: (a: A) => T.Effect<R2, E2, B>
          ): T.Effect<R & R2, E | E2, Compute<A & { readonly [k in N]: B }, "flat">>
        }
      : ["bind is available only when using `do`"]

    let: [() => A] extends [() => Record<string, unknown>]
      ? {
          /**
           * @rewrite let_ from "@effect-ts/core/Effect"
           */
          <N extends string, B>(
            n: N & N extends keyof A ? [`${N} already in use`] : N,
            f: (a: A) => B
          ): T.Effect<R, E, Compute<A & { readonly [k in N]: B }, "flat">>
        }
      : ["let is available only when using `do`"]
  }
}
