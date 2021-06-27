// tracing: off

import type * as A from "@effect-ts/core/Collections/Immutable/Array"
import type { Tuple } from "@effect-ts/core/Collections/Immutable/Tuple"
import type * as T from "@effect-ts/core/Effect"
import type { Cause } from "@effect-ts/core/Effect/Cause"
import type { Exit } from "@effect-ts/core/Effect/Exit"
import type { Fiber } from "@effect-ts/core/Effect/Fiber"
import type { Layer } from "@effect-ts/core/Effect/Layer"
import type * as M from "@effect-ts/core/Effect/Managed"
import type { Either } from "@effect-ts/core/Either"
import type { Has, Tag } from "@effect-ts/core/Has"
import type * as O from "@effect-ts/core/Option"
import type * as S from "@effect-ts/core/Sync"
import type { _A, _E, _R, Compute, Erase } from "@effect-ts/core/Utils"

declare global {
  interface Array<T> {
    /**
     * @rewrite mapEffect_ from "@effect-ts/core/Collections/Immutable/Array"
     */
    mapM<AX, R, E, B>(
      this: A.Array<AX>,
      f: (a: AX) => T.Effect<R, E, B>
    ): T.Effect<R, E, readonly B[]>
  }
}

export interface OptionOps<A> {
  /**
   * @rewriteGetter toUndefined from "@effect-ts/core/Option"
   */
  readonly value: A | undefined

  /**
   * @rewrite chain_ from "@effect-ts/core/Option"
   */
  chain<AX, B>(this: O.Option<AX>, f: (a: AX) => O.Option<B>): O.Option<B>

  /**
   * @rewrite isSome from "@effect-ts/core/Option"
   */
  isSome<AX>(this: O.Option<AX>): this is O.Some<AX>

  /**
   * @rewrite isNone from "@effect-ts/core/Option"
   */
  isNone<AX>(this: O.Option<AX>): this is O.None
}

declare module "@effect-ts/system/Option/core" {
  export interface Some<A> extends OptionOps<A> {}
  export interface None extends OptionOps<never> {}
}

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

declare module "@effect-ts/system/Effect/effect" {
  export interface Base<R, E, A> extends Effect<R, E, A> {}

  export interface Effect<R, E, A> {
    /**
     * @rewrite bracketExit_ from "@effect-ts/core/Effect"
     */
    bracket<RX, EX, AX, R2, E2, A2, R3, B>(
      this: T.Effect<RX, EX, AX>,
      use: (a: AX) => Effect<R2, E2, A2>,
      release: (a: AX, exit: Exit<E2, A2>) => Effect<R3, never, B>,
      __trace?: string
    ): T.Effect<RX & R2 & R3, EX | E2, A2>

    /**
     * @rewrite ensuring_ from "@effect-ts/core/Effect"
     */
    ensuring<RX, EX, AX, R1, X>(
      this: T.Effect<RX, EX, AX>,
      finalizer: Effect<R1, never, X>,
      __trace?: string
    ): T.Effect<RX & R1, EX, AX>

    /**
     * @rewrite fromEffect from "@effect-ts/core/Effect/Managed"
     */
    toManaged<RX, EX, AX>(this: T.Effect<RX, EX, AX>): M.Managed<RX, EX, AX>

    /**
     * @rewrite provideService_ from "@effect-ts/core/Effect"
     */
    inject<RX, EX, AX, A2>(
      this: T.Effect<RX, EX, AX>,
      tag: Tag<A2>,
      value: A2
    ): T.Effect<RX extends Has<A2> & infer K ? K : unknown, EX, AX>

    /**
     * @rewrite provideServiceM_ from "@effect-ts/core/Effect"
     */
    inject<RX, EX, AX, R2, E2, A2>(
      this: T.Effect<RX, EX, AX>,
      tag: Tag<A2>,
      value: T.Effect<R2, E2, A2>
    ): T.Effect<R2 & (RX extends Has<A2> & infer K ? K : unknown), EX | E2, AX>

    /**
     * @rewrite provideSomeLayer_ from "@effect-ts/core/Effect"
     */
    inject<RX, EX, AX, R2, E2, A2>(
      this: T.Effect<RX, EX, AX>,
      layer: Layer<R2, E2, A2>
    ): T.Effect<Erase<RX, A2> & R2, EX | E2, AX>

    /**
     * @rewrite foldM_ from "@effect-ts/core/Effect"
     */
    foldM<RX, EX, AX, R2, E2, A2, R3, E3, A3>(
      this: T.Effect<RX, EX, AX>,
      g: (e: EX) => T.Effect<R3, E3, A3>,
      f: (a: AX) => T.Effect<R2, E2, A2>,
      __trace?: string
    ): T.Effect<R & R2 & R3, E2 | E3, A2 | A3>

    /**
     * @rewrite foldCauseM_ from "@effect-ts/core/Effect"
     */
    foldCauseM<RX, EX, AX, R2, E2, A2, R3, E3, A3>(
      this: T.Effect<RX, EX, AX>,
      g: (e: Cause<EX>) => T.Effect<R3, E3, A3>,
      f: (a: AX) => T.Effect<R2, E2, A2>,
      __trace?: string
    ): T.Effect<RX & R2 & R3, E2 | E3, A2 | A3>

    /**
     * @rewrite fork from "@effect-ts/core/Effect"
     */
    fork<RX, EX, AX>(
      this: T.Effect<RX, EX, AX>,
      __trace?: string
    ): T.Effect<RX, never, Fiber<EX, AX>>

    /**
     * @rewrite forkManaged from "@effect-ts/core/Effect"
     */
    forkManaged<RX, EX, AX>(
      this: T.Effect<RX, EX, AX>,
      __trace?: string
    ): M.Managed<RX, never, Fiber<EX, AX>>

    /**
     * @rewrite result from "@effect-ts/core/Effect"
     */
    result<RX, EX, AX>(
      this: T.Effect<RX, EX, AX>,
      __trace?: string
    ): T.Effect<RX, never, Exit<EX, AX>>

    /**
     * @rewrite either from "@effect-ts/core/Effect"
     */
    either<RX, EX, AX>(
      this: T.Effect<RX, EX, AX>,
      __trace?: string
    ): T.Effect<RX, never, Either<EX, AX>>

    /**
     * @rewrite as_ from "@effect-ts/core/Effect"
     */
    as<RX, EX, AX, B>(
      this: T.Effect<RX, EX, AX>,
      b: B,
      __trace?: string
    ): T.Effect<RX, EX, B>

    /**
     * @rewrite map_ from "@effect-ts/core/Effect"
     */
    map<RX, EX, AX, B>(
      this: T.Effect<RX, EX, AX>,
      f: (a: AX) => B,
      __trace?: string
    ): T.Effect<RX, EX, B>

    /**
     * @rewrite chain_ from "@effect-ts/core/Effect"
     */
    chain<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: (a: AX) => T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, B>

    /**
     * @rewrite tap_ from "@effect-ts/core/Effect"
     */
    tap<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: (a: AX) => T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, A>

    /**
     * @rewrite tapError_ from "@effect-ts/core/Effect"
     */
    tapError<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: (e: EX) => T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, A>

    /**
     * @rewrite tapCause_ from "@effect-ts/core/Effect"
     */
    tapCause<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: (e: Cause<EX>) => T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, AX>

    /**
     * @rewrite tapBoth_ from "@effect-ts/core/Effect"
     */
    tapBoth<RX, EX, AX, R2, E2, B, R3, E3, C>(
      this: T.Effect<RX, EX, AX>,
      f: (e: EX) => T.Effect<R2, E2, B>,
      g: (e: AX) => T.Effect<R2, E3, C>,
      __trace?: string
    ): T.Effect<RX & R2 & R3, EX | E2 | E3, AX>

    /**
     * @rewrite catchAll_ from "@effect-ts/core/Effect"
     */
    catchAll<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: (e: EX) => T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, E2, AX | B>

    /**
     * @rewrite catchTag_ from "@effect-ts/core/Effect"
     */
    catchTag<
      RX,
      EX,
      AX,
      Tag extends EX extends { _tag: infer X } ? X : never,
      R2,
      E2,
      B
    >(
      this: T.Effect<RX, EX, AX>,
      tag: Tag,
      f: (e: Extract<EX, { readonly _tag: Tag }>) => T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, E2 | Exclude<EX, { readonly _tag: Tag }>, AX | B>

    /**
     * @rewrite race_ from "@effect-ts/core/Effect"
     */
    race<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, AX | B>

    /**
     * @rewrite zip_ from "@effect-ts/core/Effect"
     */
    zip<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, Tuple<[AX, B]>>

    /**
     * @rewrite zipRight_ from "@effect-ts/core/Effect"
     */
    zipRight<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, B>

    /**
     * @rewrite zipLeft_ from "@effect-ts/core/Effect"
     */
    zipLeft<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, AX>

    /**
     * @rewrite zipPar_ from "@effect-ts/core/Effect"
     */
    zipPar<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, Tuple<[AX, B]>>

    /**
     * @rewrite runPromise from "@effect-ts/core/Effect"
     */
    runPromise<EX, AX>(this: T.Effect<T.DefaultEnv, EX, AX>): Promise<AX>

    /**
     * @rewrite runPromiseExit from "@effect-ts/core/Effect"
     */
    runPromiseExit<EX, AX>(this: T.Effect<T.DefaultEnv, EX, AX>): Promise<Exit<EX, AX>>

    /**
     * @rewrite absolve from "@effect-ts/core/Effect"
     */
    absolve<RX, EX, EE, AA>(
      this: T.Effect<RX, EX, Either<EE, AA>>,
      __trace?: string
    ): T.Effect<RX, EX | EE, AA>

    /**
     * @rewrite bind_ from "@effect-ts/core/Effect"
     */
    bind<RX, EX, AX extends Record<string, unknown>, N extends string, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      n: N & N extends keyof AX ? [`${N} already in use`] : N,
      f: (a: AX) => T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, Compute<AX & { readonly [k in N]: B }, "flat">>

    /**
     * @rewrite let_ from "@effect-ts/core/Effect"
     */
    let<RX, EX, AX extends Record<string, unknown>, N extends string, B>(
      this: T.Effect<RX, EX, AX>,
      n: N & N extends keyof AX ? [`${N} already in use`] : N,
      f: (a: AX) => B,
      __trace?: string
    ): T.Effect<RX, EX, Compute<AX & { readonly [k in N]: B }, "flat">>
  }
}

declare module "@effect-ts/system/Managed/managed" {
  export interface Managed<R, E, A> {
    /**
     * @rewrite as_ from "@effect-ts/core/Effect/Managed"
     */
    as<RX, EX, AX, B>(
      this: M.Managed<RX, EX, AX>,
      b: B,
      __trace?: string
    ): M.Managed<RX, EX, B>

    /**
     * @rewrite map_ from "@effect-ts/core/Effect/Managed"
     */
    map<RX, EX, AX, B>(
      this: M.Managed<RX, EX, AX>,
      f: (a: AX) => B,
      __trace?: string
    ): M.Managed<RX, EX, B>

    /**
     * @rewrite chain_ from "@effect-ts/core/Effect/Managed"
     */
    chain<RX, EX, AX, R2, E2, B>(
      this: M.Managed<RX, EX, AX>,
      f: (a: AX) => M.Managed<R2, E2, B>,
      __trace?: string
    ): M.Managed<RX & R2, EX | E2, B>

    /**
     * @rewrite tapM_ from "@effect-ts/core/Effect/Managed"
     */
    tap<RX, EX, AX, R2, E2, B>(
      this: M.Managed<RX, EX, AX>,
      f: (a: AX) => T.Effect<R2, E2, B>,
      __trace?: string
    ): M.Managed<RX & R2, EX | E2, A>

    /**
     * @rewrite tap_ from "@effect-ts/core/Effect/Managed"
     */
    tap<RX, EX, AX, R2, E2, B>(
      this: M.Managed<RX, EX, AX>,
      f: (a: AX) => M.Managed<R2, E2, B>,
      __trace?: string
    ): M.Managed<RX & R2, EX | E2, A>

    /**
     * @rewrite tapError_ from "@effect-ts/core/Effect/Managed"
     */
    tapError<RX, EX, AX, R2, E2, B>(
      this: M.Managed<RX, EX, AX>,
      f: (e: EX) => M.Managed<R2, E2, B>,
      __trace?: string
    ): M.Managed<RX & R2, EX | E2, A>

    /**
     * @rewrite tapCause_ from "@effect-ts/core/Effect/Managed"
     */
    tapCause<RX, EX, AX, R2, E2, B>(
      this: M.Managed<RX, EX, AX>,
      f: (e: Cause<EX>) => M.Managed<R2, E2, B>,
      __trace?: string
    ): M.Managed<RX & R2, EX | E2, AX>

    /**
     * @rewrite tapBoth_ from "@effect-ts/core/Effect/Managed"
     */
    tapBoth<RX, EX, AX, R2, E2, B, R3, E3, C>(
      this: M.Managed<RX, EX, AX>,
      f: (e: EX) => M.Managed<R2, E2, B>,
      g: (e: AX) => M.Managed<R2, E3, C>,
      __trace?: string
    ): M.Managed<RX & R2 & R3, EX | E2 | E3, AX>

    /**
     * @rewrite catchAll_ from "@effect-ts/core/Effect/Managed"
     */
    catchAll<RX, EX, AX, R2, E2, B>(
      this: M.Managed<RX, EX, AX>,
      f: (e: EX) => M.Managed<R2, E2, B>,
      __trace?: string
    ): M.Managed<RX & R2, E2, AX | B>

    /**
     * @rewrite use_ from "@effect-ts/core/Effect/Managed"
     */
    use<RX, EX, AX, R2, E2, B>(
      this: M.Managed<RX, EX, AX>,
      f: (a: AX) => T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, B>
  }
}
