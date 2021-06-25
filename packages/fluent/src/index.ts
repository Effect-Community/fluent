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
import type { Compute, Erase } from "@effect-ts/core/Utils"

declare module "@effect-ts/core/Effect" {
  type EitherA<A extends Either<any, any>> = [A] extends [Either<any, infer X>]
    ? X
    : never
  type EitherE<A extends Either<any, any>> = [A] extends [Either<infer X, any>]
    ? X
    : never

  export interface Effect<R, E, A> {
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
    foldM<R2, E2, A2, R3, E3, A3>(
      g: (e: E) => T.Effect<R3, E3, A3>,
      f: (a: A) => T.Effect<R2, E2, A2>
    ): T.Effect<R & R2 & R3, E2 | E3, A2 | A3>

    /**
     * @rewrite foldCauseM_ from "@effect-ts/core/Effect"
     */
    foldCauseM<R2, E2, A2, R3, E3, A3>(
      g: (e: Cause<E>) => T.Effect<R3, E3, A3>,
      f: (a: A) => T.Effect<R2, E2, A2>
    ): T.Effect<R & R2 & R3, E2 | E3, A2 | A3>

    /**
     * @rewrite fork from "@effect-ts/core/Effect"
     */
    fork(): T.Effect<R, never, Fiber<E, A>>

    /**
     * @rewrite forkManaged from "@effect-ts/core/Effect"
     */
    forkManaged(): M.Managed<R, never, Fiber<E, A>>

    /**
     * @rewrite result from "@effect-ts/core/Effect"
     */
    result(): T.Effect<R, never, Exit<E, A>>

    /**
     * @rewrite either from "@effect-ts/core/Effect"
     */
    either(): T.Effect<R, never, Either<E, A>>

    /**
     * @rewrite as_ from "@effect-ts/core/Effect"
     */
    as<B>(b: B): T.Effect<R, E, B>

    /**
     * @rewrite map_ from "@effect-ts/core/Effect"
     */
    map<B>(f: (a: A) => B): T.Effect<R, E, B>

    /**
     * @rewrite chain_ from "@effect-ts/core/Effect"
     */
    chain<R2, E2, B>(f: (a: A) => T.Effect<R2, E2, B>): T.Effect<R & R2, E | E2, B>

    /**
     * @rewrite tap_ from "@effect-ts/core/Effect"
     */
    tap<R2, E2, B>(f: (a: A) => T.Effect<R2, E2, B>): T.Effect<R & R2, E | E2, A>

    /**
     * @rewrite tapError_ from "@effect-ts/core/Effect"
     */
    tapError<R2, E2, B>(f: (e: E) => T.Effect<R2, E2, B>): T.Effect<R & R2, E | E2, A>

    /**
     * @rewrite tapCause_ from "@effect-ts/core/Effect"
     */
    tapCause<R2, E2, B>(
      f: (e: Cause<E>) => T.Effect<R2, E2, B>
    ): T.Effect<R & R2, E | E2, A>

    /**
     * @rewrite tapBoth_ from "@effect-ts/core/Effect"
     */
    tapBoth<R2, E2, B, R3, E3, C>(
      f: (e: E) => T.Effect<R2, E2, B>,
      g: (e: Cause<E>) => T.Effect<R2, E3, C>
    ): T.Effect<R & R2 & R3, E | E2 | E3, A>

    /**
     * @rewrite catchAll_ from "@effect-ts/core/Effect"
     */
    catchAll<R2, E2, B>(f: (e: E) => T.Effect<R2, E2, B>): T.Effect<R & R2, E2, A | B>

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
    zip<R2, E2, B>(f: T.Effect<R2, E2, B>): T.Effect<R & R2, E | E2, Tuple<[A, B]>>

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
    zipPar<R2, E2, B>(f: T.Effect<R2, E2, B>): T.Effect<R & R2, E | E2, Tuple<[A, B]>>

    runPromise: [(_: R) => void] extends [(_: T.DefaultEnv) => void]
      ? {
          /**
           * @rewrite runPromise from "@effect-ts/core/Effect"
           */
          (): Promise<A>
        }
      : ["required", (_: R) => void]

    runPromiseExit: [(_: R) => void] extends [(_: T.DefaultEnv) => void]
      ? {
          /**
           * @rewrite runPromiseExit from "@effect-ts/core/Effect"
           */
          (): Promise<Exit<E, A>>
        }
      : ["required", (_: R) => void]

    absolve: [A] extends [Either<any, any>]
      ? {
          /**
           * @rewrite absolve from "@effect-ts/core/Effect"
           */
          (): T.Effect<R, E | EitherE<A>, EitherA<A>>
        }
      : ["absolve is available only when A is Either"]

    bind: [A] extends [Record<string, unknown>]
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

    let: [A] extends [Record<string, unknown>]
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
