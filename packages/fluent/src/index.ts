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
import type { _A, _E, _R, Compute, Erase } from "@effect-ts/core/Utils"

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
    bracket<Self, R2, E2, A2, R3, B>(
      this: Self,
      use: (a: _A<Self>) => Effect<R2, E2, A2>,
      release: (a: _A<Self>, exit: Exit<E2, A2>) => Effect<R3, never, B>
    ): T.Effect<_R<Self> & R2 & R3, _E<Self> | E2, A2>

    /**
     * @rewrite ensuring_ from "@effect-ts/core/Effect"
     */
    ensuring<Self, R1, X>(
      this: Self,
      finalizer: Effect<R1, never, X>
    ): T.Effect<_R<Self> & R1, _E<Self>, _A<Self>>

    /**
     * @rewrite provideService_ from "@effect-ts/core/Effect"
     */
    inject<Self, A2>(
      this: Self,
      tag: Tag<A2>,
      value: A2
    ): T.Effect<_R<Self> extends Has<A2> & infer K ? K : unknown, _E<Self>, _A<Self>>

    /**
     * @rewrite provideServiceM_ from "@effect-ts/core/Effect"
     */
    inject<Self, R2, E2, A2>(
      this: Self,
      tag: Tag<A2>,
      value: T.Effect<R2, E2, A2>
    ): T.Effect<
      R2 & (_R<Self> extends Has<A2> & infer K ? K : unknown),
      _E<Self> | E2,
      _A<Self>
    >

    /**
     * @rewrite provideSomeLayer_ from "@effect-ts/core/Effect"
     */
    inject<Self, R2, E2, A2>(
      this: Self,
      layer: Layer<R2, E2, A2>
    ): T.Effect<Erase<_R<Self>, A2> & R2, _E<Self> | E2, _A<Self>>

    /**
     * @rewrite foldM_ from "@effect-ts/core/Effect"
     */
    foldM<Self, R2, E2, A2, R3, E3, A3>(
      this: Self,
      g: (e: _E<Self>) => T.Effect<R3, E3, A3>,
      f: (a: _A<Self>) => T.Effect<R2, E2, A2>
    ): T.Effect<R & R2 & R3, E2 | E3, A2 | A3>

    /**
     * @rewrite foldCauseM_ from "@effect-ts/core/Effect"
     */
    foldCauseM<Self, R2, E2, A2, R3, E3, A3>(
      this: Self,
      g: (e: Cause<_E<Self>>) => T.Effect<R3, E3, A3>,
      f: (a: _A<Self>) => T.Effect<R2, E2, A2>
    ): T.Effect<_R<Self> & R2 & R3, E2 | E3, A2 | A3>

    /**
     * @rewrite fork from "@effect-ts/core/Effect"
     */
    fork<Self>(this: Self): T.Effect<_R<Self>, never, Fiber<_E<Self>, _A<Self>>>

    /**
     * @rewrite forkManaged from "@effect-ts/core/Effect"
     */
    forkManaged<Self>(this: Self): M.Managed<_R<Self>, never, Fiber<_E<Self>, _A<Self>>>

    /**
     * @rewrite result from "@effect-ts/core/Effect"
     */
    result<Self>(this: Self): T.Effect<_R<Self>, never, Exit<_E<Self>, _A<Self>>>

    /**
     * @rewrite either from "@effect-ts/core/Effect"
     */
    either<Self>(this: Self): T.Effect<_R<Self>, never, Either<_E<Self>, _A<Self>>>

    /**
     * @rewrite as_ from "@effect-ts/core/Effect"
     */
    as<Self, B>(this: Self, b: B): T.Effect<_R<Self>, _E<Self>, B>

    /**
     * @rewrite map_ from "@effect-ts/core/Effect"
     */
    map<Self, B>(this: Self, f: (a: _A<Self>) => B): T.Effect<_R<Self>, _E<Self>, B>

    /**
     * @rewrite chain_ from "@effect-ts/core/Effect"
     */
    chain<Self, R2, E2, B>(
      this: Self,
      f: (a: _A<Self>) => T.Effect<R2, E2, B>
    ): T.Effect<_R<Self> & R2, _E<Self> | E2, B>

    /**
     * @rewrite tap_ from "@effect-ts/core/Effect"
     */
    tap<Self, R2, E2, B>(
      this: Self,
      f: (a: _A<Self>) => T.Effect<R2, E2, B>
    ): T.Effect<_R<Self> & R2, _E<Self> | E2, A>

    /**
     * @rewrite tapError_ from "@effect-ts/core/Effect"
     */
    tapError<Self, R2, E2, B>(
      this: Self,
      f: (e: _E<Self>) => T.Effect<R2, E2, B>
    ): T.Effect<_R<Self> & R2, _E<Self> | E2, A>

    /**
     * @rewrite tapCause_ from "@effect-ts/core/Effect"
     */
    tapCause<Self, R2, E2, B>(
      this: Self,
      f: (e: Cause<_E<Self>>) => T.Effect<R2, E2, B>
    ): T.Effect<_R<Self> & R2, _E<Self> | E2, _A<Self>>

    /**
     * @rewrite tapBoth_ from "@effect-ts/core/Effect"
     */
    tapBoth<Self, R2, E2, B, R3, E3, C>(
      this: Self,
      f: (e: _E<Self>) => T.Effect<R2, E2, B>,
      g: (e: _A<Self>) => T.Effect<R2, E3, C>
    ): T.Effect<_R<Self> & R2 & R3, _E<Self> | E2 | E3, _A<Self>>

    /**
     * @rewrite catchAll_ from "@effect-ts/core/Effect"
     */
    catchAll<Self, R2, E2, B>(
      this: Self,
      f: (e: _E<Self>) => T.Effect<R2, E2, B>
    ): T.Effect<_R<Self> & R2, E2, _A<Self> | B>

    /**
     * @rewrite catchTag_ from "@effect-ts/core/Effect"
     */
    catchTag<
      Self,
      Tag extends _E<Self> extends { _tag: infer X } ? X : never,
      R2,
      E2,
      B
    >(
      this: Self,
      tag: Tag,
      f: (e: Extract<_E<Self>, { readonly _tag: Tag }>) => T.Effect<R2, E2, B>
    ): T.Effect<
      _R<Self> & R2,
      E2 | Exclude<_E<Self>, { readonly _tag: Tag }>,
      _A<Self> | B
    >

    /**
     * @rewrite race_ from "@effect-ts/core/Effect"
     */
    race<Self, R2, E2, B>(
      this: Self,
      f: T.Effect<R2, E2, B>
    ): T.Effect<_R<Self> & R2, _E<Self> | E2, _A<Self> | B>

    /**
     * @rewrite zip_ from "@effect-ts/core/Effect"
     */
    zip<Self, R2, E2, B>(
      this: Self,
      f: T.Effect<R2, E2, B>
    ): T.Effect<_R<Self> & R2, _E<Self> | E2, Tuple<[_A<Self>, B]>>

    /**
     * @rewrite zipRight_ from "@effect-ts/core/Effect"
     */
    zipRight<Self, R2, E2, B>(
      this: Self,
      f: T.Effect<R2, E2, B>
    ): T.Effect<_R<Self> & R2, _E<Self> | E2, B>

    /**
     * @rewrite zipLeft_ from "@effect-ts/core/Effect"
     */
    zipLeft<Self, R2, E2, B>(
      this: Self,
      f: T.Effect<R2, E2, B>
    ): T.Effect<_R<Self> & R2, _E<Self> | E2, _A<Self>>

    /**
     * @rewrite zipPar_ from "@effect-ts/core/Effect"
     */
    zipPar<Self, R2, E2, B>(
      this: Self,
      f: T.Effect<R2, E2, B>
    ): T.Effect<_R<Self> & R2, _E<Self> | E2, Tuple<[_A<Self>, B]>>

    runPromise: [(_: R) => void] extends [(_: T.DefaultEnv) => void]
      ? {
          /**
           * @rewrite runPromise from "@effect-ts/core/Effect"
           */
          <Self>(this: Self): Promise<_A<Self>>
        }
      : ["required", (_: R) => void]

    runPromiseExit: [(_: R) => void] extends [(_: T.DefaultEnv) => void]
      ? {
          /**
           * @rewrite runPromiseExit from "@effect-ts/core/Effect"
           */
          <Self>(this: Self): Promise<Exit<_E<Self>, _A<Self>>>
        }
      : ["required", (_: R) => void]

    absolve: [() => A] extends [() => Either<infer EE, infer EA>]
      ? {
          /**
           * @rewrite absolve from "@effect-ts/core/Effect"
           */
          <Self>(this: Self): T.Effect<_R<Self>, _E<Self> | EE, EA>
        }
      : ["absolve is available only when A is Either"]

    bind: [() => A] extends [() => Record<string, unknown>]
      ? {
          /**
           * @rewrite bind_ from "@effect-ts/core/Effect"
           */
          <Self, N extends string, R2, E2, B>(
            this: Self,
            n: N & N extends keyof _A<Self> ? [`${N} already in use`] : N,
            f: (a: _A<Self>) => T.Effect<R2, E2, B>
          ): T.Effect<
            _R<Self> & R2,
            _E<Self> | E2,
            Compute<_A<Self> & { readonly [k in N]: B }, "flat">
          >
        }
      : ["bind is available only when using `do`"]

    let: [() => A] extends [() => Record<string, unknown>]
      ? {
          /**
           * @rewrite let_ from "@effect-ts/core/Effect"
           */
          <Self, N extends string, B>(
            this: Self,
            n: N & N extends keyof _A<Self> ? [`${N} already in use`] : N,
            f: (a: _A<Self>) => B
          ): T.Effect<
            _R<Self>,
            _E<Self>,
            Compute<_A<Self> & { readonly [k in N]: B }, "flat">
          >
        }
      : ["let is available only when using `do`"]
  }
}
