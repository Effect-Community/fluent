import type { Chunk } from "@effect-ts/core/Collections/Immutable/Chunk"
import type { NonEmptyArray } from "@effect-ts/core/Collections/Immutable/NonEmptyArray"
import type { SortedSet } from "@effect-ts/core/Collections/Immutable/SortedSet"
import type * as Tp from "@effect-ts/core/Collections/Immutable/Tuple"
import type * as T from "@effect-ts/core/Effect"
import type { Cause } from "@effect-ts/core/Effect/Cause"
import type { Clock, HasClock } from "@effect-ts/core/Effect/Clock"
import type { Exit } from "@effect-ts/core/Effect/Exit"
import type * as Fiber from "@effect-ts/core/Effect/Fiber"
import type { Layer } from "@effect-ts/core/Effect/Layer"
import type * as M from "@effect-ts/core/Effect/Managed"
import type * as P from "@effect-ts/core/Effect/Promise"
import type { Schedule } from "@effect-ts/core/Effect/Schedule"
import type { Scope } from "@effect-ts/core/Effect/Scope"
import type { Supervisor } from "@effect-ts/core/Effect/Supervisor"
import * as E from "@effect-ts/core/Either"
import type { Has, Tag } from "@effect-ts/core/Has"
import type * as O from "@effect-ts/core/Option"
import type {
  _A,
  _E,
  _R,
  Compute,
  EnforceNonEmptyRecord,
  Erase,
  ForcedArray
} from "@effect-ts/core/Utils"
import type { NoSuchElementException } from "@effect-ts/system/GlobalExceptions"

declare module "@effect-ts/system/Effect/effect" {
  export interface Base<R, E, A> extends Effect<R, E, A> {}

  export interface Effect<R, E, A> {
    /**
     * @rewrite pipe from "smart:pipe"
     */
    pipe<Self, Ret>(this: Self, f: (self: Self) => Ret): Ret

    /**
     * @rewrite absolve from "@effect-ts/core/Effect"
     */
    absolve<RX, EX, EE, AA>(
      this: T.Effect<RX, EX, E.Either<EE, AA>>,
      __trace?: string
    ): T.Effect<RX, EX | EE, AA>

    /**
     * @rewrite absorb from "@effect-ts/core/Effect"
     */
    absorb<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, unknown, A>

    /**
     * @rewrite absorbWith_ from "@effect-ts/core/Effect"
     */
    absorbWith<R, A, E>(
      this: T.Effect<R, E, A>,
      f: (e: E) => unknown,
      __trace?: string | undefined
    ): T.Effect<R, unknown, A>

    /**
     * @rewrite andThen_ from "@effect-ts/core/Effect"
     */
    andThen<R, E, A, E1, A1>(
      this: Effect<R, E, A>,
      fb: Effect<A, E1, A1>,
      __trace?: string
    ): Effect<R, E | E1, A1>

    /**
     * @rewrite ap_ from "@effect-ts/core/Effect"
     */
    ap<R, E, B, R2, E2, A>(
      this: T.Effect<R, E, (a: A) => B>,
      fa: T.Effect<R2, E2, A>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E | E2, B>

    /**
     * @rewrite asService_ from "@effect-ts/core/Effect"
     */
    asService<R, E, A>(
      this: T.Effect<R, E, A>,
      has: Tag<A>,
      __trace?: string | undefined
    ): T.Effect<R, E, Has<A>>

    /**
     * @rewrite as_ from "@effect-ts/core/Effect"
     */
    as<RX, EX, AX, B>(
      this: T.Effect<RX, EX, AX>,
      b: B,
      __trace?: string
    ): T.Effect<RX, EX, B>

    /**
     * @rewrite asSome from "@effect-ts/core/Effect"
     */
    asSome<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, E, O.Option<A>>

    /**
     * @rewrite asSomeError from "@effect-ts/core/Effect"
     */
    asSomeError<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, O.Option<E>, A>

    /**
     * @rewrite asUnit from "@effect-ts/core/Effect"
     */
    asUnit<R, E, X>(
      this: T.Effect<R, E, X>,
      __trace?: string | undefined
    ): T.Effect<R, E, void>

    /**
     * @rewrite awaitAllChildren from "@effect-ts/core/Effect"
     */
    awaitAllChildren<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite bimap_ from "@effect-ts/core/Effect"
     */
    bimap<R, E, A, E2, B>(
      this: T.Effect<R, E, A>,
      f: (e: E) => E2,
      g: (a: A) => B,
      __trace?: string | undefined
    ): T.Effect<R, E2, B>

    /**
     * @rewrite bind_ from "@effect-ts/core/Effect"
     */
    bind<RX, EX, AX extends Record<string, unknown>, N extends string, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      n: N & N extends keyof AX ? [`${N} already in use`] : N,
      f: (a: AX) => T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<
      RX & R2,
      EX | E2,
      Compute<
        AX &
          {
            readonly [k in N]: B
          },
        "flat"
      >
    >

    /**
     * @rewrite bindAll_ from "@effect-ts/core/Effect"
     */
    bindAll<
      K,
      NER extends Record<string, Effect<any, any, any>> &
        {
          [k in keyof K & keyof NER]?: never
        },
      R,
      E
    >(
      this: Effect<R, E, K>,
      r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>,
      __trace?: string
    ): Effect<
      R & _R<NER[keyof NER]>,
      E | _E<NER[keyof NER]>,
      Compute<
        K &
          {
            readonly [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>]
              ? A
              : never
          },
        "flat"
      >
    >

    /**
     * @rewrite bindAllPar_ from "@effect-ts/core/Effect"
     */
    bindAllPar<
      K,
      NER extends Record<string, Effect<any, any, any>> &
        {
          [k in keyof K & keyof NER]?: never
        },
      R,
      E
    >(
      this: Effect<R, E, K>,
      r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>,
      __trace?: string
    ): Effect<
      R & _R<NER[keyof NER]>,
      E | _E<NER[keyof NER]>,
      Compute<
        K &
          {
            readonly [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>]
              ? A
              : never
          },
        "flat"
      >
    >

    /**
     * @rewrite bindAllParN_ from "@effect-ts/core/Effect"
     */
    bindAllParN<
      K,
      NER extends Record<string, Effect<any, any, any>> &
        {
          [k in keyof K & keyof NER]?: never
        },
      R,
      E
    >(
      this: Effect<R, E, K>,
      n: number,
      r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Effect<any, any, any>>,
      __trace?: string
    ): Effect<
      R & _R<NER[keyof NER]>,
      E | _E<NER[keyof NER]>,
      Compute<
        K &
          {
            readonly [K in keyof NER]: [NER[K]] extends [Effect<any, any, infer A>]
              ? A
              : never
          },
        "flat"
      >
    >

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
     * @rewrite bracketFiber_ from "@effect-ts/core/Effect"
     */
    bracketFiber<R, E, A, R2, E2, A2>(
      this: Effect<R, E, A>,
      use: (f: Fiber.Runtime<E, A>) => Effect<R2, E2, A2>,
      __trace?: string
    ): Effect<R & R2, E2, Exit<E, A>>

    /**
     * @rewrite bracketOnError_ from "@effect-ts/core/Effect"
     */
    bracketOnError<R, E, A, E1, R1, A1, R2, E2, X>(
      this: Effect<R, E, A>,
      use: (a: A) => Effect<R1, E1, A1>,
      release: (a: A, e: Exit<E1, A1>) => Effect<R2, E2, X>,
      __trace?: string
    ): Effect<R & R1 & R2, E | E1 | E2, A1>

    /**
     * @rewrite cached_ from "@effect-ts/core/Effect"
     */
    cached<R, E, A>(
      this: T.Effect<R, E, A>,
      ttl: number,
      __trace?: string | undefined
    ): T.RIO<R & Has<Clock>, T.IO<E, A>>

    /**
     * @rewrite cachedInvalidate_ from "@effect-ts/core/Effect"
     */
    cachedInvalidate<R, E, A>(
      this: T.Effect<R, E, A>,
      ttl: number,
      __trace?: string | undefined
    ): T.RIO<R & Has<Clock>, Tp.Tuple<[T.IO<E, A>, T.UIO<void>]>>

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
     * @rewrite catchAllCause_ from "@effect-ts/core/Effect"
     */
    catchAllCause<R2, E2, A2, R, E, A>(
      this: T.Effect<R2, E2, A2>,
      f: (_: Cause<E2>) => T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R2 & R, E, A2 | A>

    /**
     * @rewrite catchAllDefect_ from "@effect-ts/core/Effect"
     */
    catchAllDefect<R2, E2, A2, R, E, A>(
      this: T.Effect<R2, E2, A2>,
      f: (_: unknown) => T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R2 & R, E2 | E, A2 | A>

    /**
     * @rewrite catchSome_ from "@effect-ts/core/Effect"
     */
    catchSome<R, E, A, R2, E2, A2>(
      this: T.Effect<R, E, A>,
      f: (e: E) => O.Option<T.Effect<R2, E2, A2>>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E | E2, A | A2>

    /**
     * @rewrite catchSomeCause_ from "@effect-ts/core/Effect"
     */
    catchSomeCause<R2, E2, A2, R, E, A>(
      this: T.Effect<R2, E2, A2>,
      f: (_: Cause<E2>) => O.Option<T.Effect<R, E, A>>,
      __trace?: string | undefined
    ): T.Effect<R2 & R, E2 | E, A2 | A>

    /**
     * @rewrite catchSomeDefect_ from "@effect-ts/core/Effect"
     */
    catchSomeDefect<R2, E2, A2, R, E, A>(
      this: T.Effect<R2, E2, A2>,
      f: (_: unknown) => O.Option<T.Effect<R, E, A>>,
      __trace?: string | undefined
    ): T.Effect<R2 & R, E2 | E, A2 | A>

    /**
     * @rewrite cause from "@effect-ts/core/Effect"
     */
    cause<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.RIO<R, Cause<E>>

    /**
     * @rewrite chain_ from "@effect-ts/core/Effect"
     */
    chain<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: (a: AX) => T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, B>

    /**
     * @rewrite chainError_ from "@effect-ts/core/Effect"
     */
    chainError<R, E, A, R2, E2>(
      this: T.Effect<R, E, A>,
      f: (e: E) => T.RIO<R2, E2>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E2, A>

    /**
     * @rewrite compose_ from "@effect-ts/core/Effect"
     */
    compose<A, E1, B, R, E>(
      this: T.Effect<R, E, A>,
      that: T.Effect<A, E1, B>,
      __trace?: string | undefined
    ): T.Effect<R, E1 | E, B>

    /**
     * @rewrite continueOrFail_ from "@effect-ts/core/Effect"
     */
    continueOrFail<R, E, E1, A, A2>(
      this: Effect<R, E, A>,
      f: () => E1,
      pf: (a: A) => O.Option<A2>,
      __trace?: string
    ): Effect<R, E | E1, A2>

    /**
     * @rewrite continueOrFailM_ from "@effect-ts/core/Effect"
     */
    continueOrFailM<R, E, E1, A, R2, E2, A2>(
      this: Effect<R, E, A>,
      f: () => E1,
      pf: (a: A) => O.Option<Effect<R2, E2, A2>>,
      __trace?: string
    ): Effect<R & R2, E | E1 | E2, A2>

    /**
     * @rewrite delay_ from "@effect-ts/core/Effect"
     */
    delay<R, E, A>(
      this: T.Effect<R, E, A>,
      ms: number,
      __trace?: string | undefined
    ): T.Effect<R & Has<Clock>, E, A>

    /**
     * @rewrite either from "@effect-ts/core/Effect"
     */
    either<RX, EX, AX>(
      this: T.Effect<RX, EX, AX>,
      __trace?: string
    ): T.Effect<RX, never, E.Either<EX, AX>>

    /**
     * @rewrite ensuring_ from "@effect-ts/core/Effect"
     */
    ensuring<RX, EX, AX, R1, X>(
      this: T.Effect<RX, EX, AX>,
      finalizer: Effect<R1, never, X>,
      __trace?: string
    ): T.Effect<RX & R1, EX, AX>

    /**
     * @rewrite ensuringChild_ from "@effect-ts/core/Effect"
     */
    ensuringChild<R, E, A, R2, X>(
      this: T.Effect<R, E, A>,
      f: (_: Fiber.Fiber<any, Chunk<unknown>>) => T.RIO<R2, X>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E, A>

    /**
     * @rewrite ensuringChildren_ from "@effect-ts/core/Effect"
     */
    ensuringChildren<R, E, A, R1, X>(
      this: T.Effect<R, E, A>,
      children: (_: SortedSet<Fiber.Runtime<any, any>>) => T.RIO<R1, X>,
      __trace?: string | undefined
    ): T.Effect<R & R1, E, A>

    /**
     * @rewrite eventually from "@effect-ts/core/Effect"
     */
    eventually<R, E, A>(
      fa: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, never, A>

    /**
     * @rewrite flatten from "@effect-ts/core/Effect"
     */
    flatten<R, E, R1, E1, A>(
      this: T.Effect<R, E, T.Effect<R1, E1, A>>,
      __trace?: string | undefined
    ): T.Effect<R & R1, E | E1, A>

    /**
     * @rewrite flattenErrorOption_ from "@effect-ts/core/Effect"
     */
    flattenErrorOption<R, E, A, E2>(
      this: T.Effect<R, O.Option<E>, A>,
      def: () => E2,
      __trace?: string | undefined
    ): T.Effect<R, E | E2, A>

    /**
     * @rewrite flip from "@effect-ts/core/Effect"
     */
    flip<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, A, E>

    /**
     * @rewrite flipWith_ from "@effect-ts/core/Effect"
     */
    flipWith<R, E, A, R2, E2, A2>(
      this: T.Effect<R, E, A>,
      f: (self: T.Effect<R, A, E>) => T.Effect<R2, A2, E2>,
      __trace?: string | undefined
    ): T.Effect<R2, E2, A2>

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
     * @rewrite foldM_ from "@effect-ts/core/Effect"
     */
    foldM<RX, EX, AX, R2, E2, A2, R3, E3, A3>(
      this: T.Effect<RX, EX, AX>,
      g: (e: EX) => T.Effect<R3, E3, A3>,
      f: (a: AX) => T.Effect<R2, E2, A2>,
      __trace?: string
    ): T.Effect<R & R2 & R3, E2 | E3, A2 | A3>

    /**
     * @rewrite forever from "@effect-ts/core/Effect"
     */
    forever<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, E, never>

    /**
     * @rewrite fork from "@effect-ts/core/Effect"
     */
    fork<RX, EX, AX>(
      this: T.Effect<RX, EX, AX>,
      __trace?: string
    ): T.Effect<RX, never, Fiber.FiberContext<EX, AX>>

    /**
     * @rewrite forkAs_ from "@effect-ts/core/Effect"
     */
    forkAs<R, E, A>(
      this: T.Effect<R, E, A>,
      name: string,
      __trace?: string | undefined
    ): T.RIO<R, Fiber.FiberContext<E, A>>

    /**
     * @rewrite forkManaged from "@effect-ts/core/Effect"
     */
    forkManaged<RX, EX, AX>(
      this: T.Effect<RX, EX, AX>,
      __trace?: string
    ): M.Managed<RX, never, Fiber.Fiber<EX, AX>>

    /**
     * @rewrite forkDaemon from "@effect-ts/core/Effect"
     */
    forkDaemon<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.RIO<R, Fiber.FiberContext<E, A>>

    /**
     * @rewrite forkDaemonReport_ from "@effect-ts/core/Effect"
     */
    forkDaemonReport<R, E, A>(
      this: T.Effect<R, E, A>,
      reportFailure: T.FailureReporter,
      __trace?: string | undefined
    ): T.RIO<R, Fiber.FiberContext<E, A>>

    /**
     * @rewrite forkIn_ from "@effect-ts/core/Effect"
     */
    forkIn<R, E, A>(
      this: T.Effect<R, E, A>,
      scope: Scope<Exit<any, any>>,
      __trace?: string | undefined
    ): T.RIO<R, Fiber.Runtime<E, A>>

    /**
     * @rewrite forkInReport_ from "@effect-ts/core/Effect"
     */
    forkInReport<R, E, A>(
      this: T.Effect<R, E, A>,
      scope: Scope<Exit<any, any>>,
      reportFailure: T.FailureReporter,
      __trace?: string | undefined
    ): T.RIO<R, Fiber.Runtime<E, A>>

    /**
     * @rewrite forkWithErrorHandler_ from "@effect-ts/core/Effect"
     */
    forkWithErrorHandler<R, R2, E, A>(
      self: T.Effect<R, E, A>,
      handler: (e: E) => T.RIO<R2, void>,
      __trace?: string | undefined
    ): T.RIO<R & R2, Fiber.FiberContext<E, A>>

    /**
     * @rewrite get from "@effect-ts/core/Effect"
     */
    get<R, E, A>(
      this: T.Effect<R, E, O.Option<A>>,
      __trace?: string | undefined
    ): T.Effect<R, O.Option<E>, A>

    /**
     * @rewrite ifM_ from "@effect-ts/core/Effect"
     */
    ifM<R, E, R1, E1, A1, R2, E2, A2>(
      this: Effect<R, E, boolean>,
      onTrue: () => Effect<R1, E1, A1>,
      onFalse: () => Effect<R2, E2, A2>,
      __trace?: string
    ): Effect<R & R1 & R2, E | E1 | E2, A1 | A2>

    /**
     * @rewrite provideAll_ from "@effect-ts/core/Effect"
     */
    injectAll<RX, EX, AX>(
      this: T.Effect<RX, EX, AX>,
      env: AX
    ): T.Effect<unknown, EX, AX>

    /**
     * @rewrite provideAll_ from "@effect-ts/core/Effect"
     */
    injectEnv<RX, EX, AX, AX2>(
      this: T.Effect<RX, EX, AX>,
      env: AX2
    ): T.Effect<RX extends Has<AX2> & infer K ? K : unknown, EX, AX>

    /**
     * @rewrite provideSome_ from "@effect-ts/core/Effect"
     */
    injectSome<RX, EX, AX, R2>(
      this: T.Effect<RX, EX, AX>,
      env: (_: R2) => AX
    ): T.Effect<R2, EX, AX>

    /**
     * @rewrite provideService_ from "@effect-ts/core/Effect"
     */
    injectService<RX, EX, AX, A2>(
      this: T.Effect<RX, EX, AX>,
      tag: Tag<A2>,
      value: A2
    ): T.Effect<RX extends Has<A2> & infer K ? K : unknown, EX, AX>

    /**
     * @rewrite provideServiceM_ from "@effect-ts/core/Effect"
     */
    injectServiceM<RX, EX, AX, R2, E2, A2>(
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
     * @rewrite ignore from "@effect-ts/core/Effect"
     */
    ignore<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.RIO<R, void>

    /**
     * @rewrite in_ from "@effect-ts/core/Effect"
     */
    in<R, E, A>(
      this: T.Effect<R, E, A>,
      scope: Scope<any>,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite interruptAllChildren from "@effect-ts/core/Effect"
     */
    interruptAllChildren<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite interruptStatus_ from "@effect-ts/core/Effect"
     */
    interruptStatus<R, E, A>(
      this: T.Effect<R, E, A>,
      flag: Fiber.InterruptStatus,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite interruptible from "@effect-ts/core/Effect"
     */
    interruptible<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite isFailure from "@effect-ts/core/Effect"
     */
    isFailure<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, never, boolean>

    /**
     * @rewrite isSuccess from "@effect-ts/core/Effect"
     */
    isSuccess<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, never, boolean>

    /**
     * @rewrite join_ from "@effect-ts/core/Effect"
     */
    join<R, E, A, R1, E1, A1>(
      this: T.Effect<R, E, A>,
      that: T.Effect<R1, E1, A1>,
      __trace?: string | undefined
    ): T.Effect<E.Either<R, R1>, E | E1, A | A1>

    /**
     * @rewrite joinEither_ from "@effect-ts/core/Effect"
     */
    joinEither<R, E, A, R1, E1, A1>(
      this: T.Effect<R, E, A>,
      that: T.Effect<R1, E1, A1>,
      __trace?: string | undefined
    ): T.Effect<E.Either<R, R1>, E | E1, E.Either<A, A1>>

    /**
     * @rewrite left from "@effect-ts/core/Effect"
     */
    left<R, E, B, C>(self: T.Effect<R, E, E.Either<B, C>>): T.Effect<R, O.Option<E>, B>

    /**
     * @rewrite leftOrFail_ from "@effect-ts/core/Effect"
     */
    leftOrFail<R, E, B, C, E1>(
      this: T.Effect<R, E, E.Either<B, C>>,
      orFail: (c: C) => E1,
      __trace?: string | undefined
    ): T.Effect<R, E | E1, B>

    /**
     * @rewrite leftOrFailException from "@effect-ts/core/Effect"
     */
    leftOrFailException<R, E, B, C>(
      this: T.Effect<R, E, E.Either<B, C>>,
      __trace?: string | undefined
    ): T.Effect<R, E | NoSuchElementException, B>

    /**
     * @rewrite let_ from "@effect-ts/core/Effect"
     */
    let<RX, EX, AX extends Record<string, unknown>, N extends string, B>(
      this: T.Effect<RX, EX, AX>,
      n: N & N extends keyof AX ? [`${N} already in use`] : N,
      f: (a: AX) => B,
      __trace?: string
    ): T.Effect<
      RX,
      EX,
      Compute<
        AX &
          {
            readonly [k in N]: B
          },
        "flat"
      >
    >

    /**
     * @rewrite map_ from "@effect-ts/core/Effect"
     */
    map<RX, EX, AX, B>(
      this: T.Effect<RX, EX, AX>,
      f: (a: AX) => B,
      __trace?: string
    ): T.Effect<RX, EX, B>

    /**
     * @rewrite mapErrorCause_ from "@effect-ts/core/Effect"
     */
    mapErrorCause<R, E, A, E2>(
      this: T.Effect<R, E, A>,
      f: (cause: Cause<E>) => Cause<E2>,
      __trace?: string | undefined
    ): T.Effect<R, E2, A>

    /**
     * @rewrite mapError_ from "@effect-ts/core/Effect"
     */
    mapError<R, E, E2, A>(
      this: T.Effect<R, E, A>,
      f: (e: E) => E2,
      __trace?: string | undefined
    ): T.Effect<R, E2, A>

    /**
     * @rewrite mapN_ from "@effect-ts/core/Effect"
     */
    mapN<T extends NonEmptyArray<Effect<any, any, any>>, B>(
      f: (..._: ForcedArray<{ [k in keyof T]: _A<T[k]> }>) => B,
      __trace?: string
    ): (t: Tp.Tuple<T>) => Effect<_R<T[number]>, _E<T[number]>, B>

    /**
     * @rewrite mapNPar_ from "@effect-ts/core/Effect"
     */
    mapNPar<T extends NonEmptyArray<Effect<any, any, any>>, B>(
      f: (...args: ForcedArray<{ [k in keyof T]: _A<T[k]> }>) => B,
      __trace?: string
    ): (t: Tp.Tuple<T>) => Effect<_R<T[number]>, _E<T[number]>, B>

    /**
     * @rewrite mapNParN_ from "@effect-ts/core/Effect"
     */
    mapNParN<T extends NonEmptyArray<Effect<any, any, any>>, B>(
      n: number,
      f: (...args: ForcedArray<{ [k in keyof T]: _A<T[k]> }>) => B,
      __trace?: string
    ): (t: Tp.Tuple<T>) => Effect<_R<T[number]>, _E<T[number]>, B>

    /**
     * @rewrite mapTryCatch_ from "@effect-ts/core/Effect"
     */
    mapTryCatch<R, E1, E, A, B>(
      this: T.Effect<R, E1, A>,
      f: (a: A) => B,
      onThrow: (u: unknown) => E,
      __trace?: string | undefined
    ): T.Effect<R, E1 | E, B>

    /**
     * @rewrite merge from "@effect-ts/core/Effect"
     */
    merge<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, never, E | A>

    /**
     * @rewrite onError_ from "@effect-ts/core/Effect"
     */
    onError<R, E, A, R2, E2, X>(
      this: T.Effect<R, E, A>,
      cleanup: (exit: Cause<E>) => T.Effect<R2, E2, X>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E | E2, A>

    /**
     * @rewrite onExit_ from "@effect-ts/core/Effect"
     */
    onExit<R, E, A, R2, E2, X>(
      this: T.Effect<R, E, A>,
      cleanup: (exit: Exit<E, A>) => T.Effect<R2, E2, X>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E | E2, A>

    /**
     * @rewrite onFirst from "@effect-ts/core/Effect"
     */
    onFirst<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, E, Tp.Tuple<[A, R]>>

    /**
     * @rewrite onInterrupt_ from "@effect-ts/core/Effect"
     */
    onInterrupt<R, E, A, R2, X>(
      self: T.Effect<R, E, A>,
      cleanup: (interruptors: readonly Fiber.FiberID[]) => T.Effect<R2, never, X>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E, A>

    /**
     * @rewrite onSecond from "@effect-ts/core/Effect"
     */
    onSecond<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, E, Tp.Tuple<[R, A]>>

    /**
     * @rewrite onTermination_ from "@effect-ts/core/Effect"
     */
    onTermination<R1, R, E, A, X>(
      this: T.Effect<R, E, A>,
      cleanup: (_: Cause<never>) => T.RIO<R1, X>,
      __trace?: string | undefined
    ): T.Effect<R & R1, E, A>

    /**
     * @rewrite once from "@effect-ts/core/Effect"
     */
    once<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.UIO<T.Effect<R, E, void>>

    /**
     * @rewrite onlyDefaultEnv from "smart:identity"
     */
    onlyDefaultEnv<E, A>(
      self: T.Effect<T.DefaultEnv, E, A>
    ): T.Effect<T.DefaultEnv, E, A>

    /**
     * @rewrite option from "@effect-ts/core/Effect"
     */
    option<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.RIO<R, O.Option<A>>

    /**
     * @rewrite optional from "@effect-ts/core/Effect"
     */
    optional<R, E, A>(
      this: T.Effect<R, O.Option<E>, A>,
      __trace?: string | undefined
    ): T.Effect<R, E, O.Option<A>>

    /**
     * @rewrite orDie from "@effect-ts/core/Effect"
     */
    orDie<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, never, A>

    /**
     * @rewrite orDieKeep from "@effect-ts/core/Effect"
     */
    orDieKeep<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, never, A>

    /**
     * @rewrite orDieWith_ from "@effect-ts/core/Effect"
     */
    orDieWith<R, E, A>(
      this: T.Effect<R, E, A>,
      f: (e: E) => unknown,
      __trace?: string | undefined
    ): T.Effect<R, never, A>

    /**
     * @rewrite orElseEither_ from "@effect-ts/core/Effect"
     */
    orElseEither<R, E, A, R2, E2, A2>(
      this: T.Effect<R, E, A>,
      that: () => T.Effect<R2, E2, A2>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E2, E.Either<A, A2>>

    /**
     * @rewrite orElseFail_ from "@effect-ts/core/Effect"
     */
    orElseFail<R, E, A, E2>(
      this: T.Effect<R, E, A>,
      e: E2,
      __trace?: string | undefined
    ): T.Effect<R, E2, A>

    /**
     * @rewrite orElseOptional_ from "@effect-ts/core/Effect"
     */
    orElseOptional<R, E, A, R2, E2, A2>(
      this: T.Effect<R, O.Option<E>, A>,
      that: () => T.Effect<R2, O.Option<E2>, A2>,
      __trace?: string | undefined
    ): T.Effect<R & R2, O.Option<E | E2>, A | A2>

    /**
     * @rewrite orElseSucceed_ from "@effect-ts/core/Effect"
     */
    orElseSucceed<R, E, A, A2>(
      this: T.Effect<R, E, A>,
      a: A2,
      __trace?: string | undefined
    ): T.Effect<R, E, A | A2>

    /**
     * @rewrite orElse_ from "@effect-ts/core/Effect"
     */
    orElse<R, E, A, R2, E2, A2>(
      this: T.Effect<R, E, A>,
      that: () => T.Effect<R2, E2, A2>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E2, A | A2>

    /**
     * @rewrite overrideForkScope_ from "@effect-ts/core/Effect"
     */
    overrideForkScope<R, E, A>(
      this: T.Effect<R, E, A>,
      scope: Scope<Exit<any, any>>,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite race_ from "@effect-ts/core/Effect"
     */
    race<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, AX | B>

    /**
     * @rewrite raceEither_ from "@effect-ts/core/Effect"
     */
    raceEither<R, E, A, R2, E2, A2>(
      this: T.Effect<R, E, A>,
      that: T.Effect<R2, E2, A2>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E | E2, E.Either<A, A2>>

    /**
     * @rewrite raceFirst_ from "@effect-ts/core/Effect"
     */
    raceFirst<R, R2, E, E2, A, A2>(
      this: T.Effect<R, E, A>,
      that: T.Effect<R2, E2, A2>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E | E2, A | A2>

    /**
     * @rewrite raceWith_ from "@effect-ts/core/Effect"
     */
    raceWith<R, E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>(
      this: Effect<R, E, A>,
      right: Effect<R1, E1, A1>,
      leftWins: (exit: Exit<E, A>, fiber: Fiber.Fiber<E1, A1>) => Effect<R2, E2, A2>,
      rightWins: (exit: Exit<E1, A1>, fiber: Fiber.Fiber<E, A>) => Effect<R3, E3, A3>,
      __trace?: string
    ): Effect<R & R1 & R2 & R3, E2 | E3, A2 | A3>

    /**
     * @rewrite raceWithScope_ from "@effect-ts/core/Effect"
     */
    raceWithScope<R, E, A, R1, E1, A1, R2, E2, A2, R3, E3, A3>(
      this: Effect<R, E, A>,
      right: Effect<R1, E1, A1>,
      leftWins: (exit: Exit<E, A>, fiber: Fiber.Fiber<E1, A1>) => Effect<R2, E2, A2>,
      rightWins: (exit: Exit<E1, A1>, fiber: Fiber.Fiber<E, A>) => Effect<R3, E3, A3>,
      scope: Scope<Exit<any, any>>,
      __trace?: string
    ): Effect<R & R1 & R2 & R3, E2 | E3, A2 | A3>

    /**
     * @rewrite refailWithTrace from "@effect-ts/core/Effect"
     */
    refailWithTrace<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite refineOrDie_ from "@effect-ts/core/Effect"
     */
    refineOrDie<R, A, E, E1>(
      this: T.Effect<R, E, A>,
      pf: (e: E) => O.Option<E1>,
      __trace?: string | undefined
    ): T.Effect<R, E1, A>

    /**
     * @rewrite refineOrDieWith_ from "@effect-ts/core/Effect"
     */
    refineOrDieWith<R, A, E, E1>(
      this: T.Effect<R, E, A>,
      pf: (e: E) => O.Option<E1>,
      f: (e: E) => unknown,
      __trace?: string | undefined
    ): T.Effect<R, E1, A>

    /**
     * @rewrite reject_ from "@effect-ts/core/Effect"
     */
    reject<R, E, A, E1>(
      this: T.Effect<R, E, A>,
      pf: (a: A) => O.Option<E1>,
      __trace?: string | undefined
    ): T.Effect<R, E | E1, A>

    /**
     * @rewrite repeat_ from "@effect-ts/core/Effect"
     */
    repeat<R, E, A, SR, B>(
      this: T.Effect<R, E, A>,
      schedule: Schedule<SR, A, B>,
      __trace?: string | undefined
    ): T.Effect<R & SR & Has<Clock>, E, B>

    /**
     * @rewrite repeatN_ from "@effect-ts/core/Effect"
     */
    repeatN<R, E, A>(
      this: T.Effect<R, E, A>,
      n: number,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite repeatOrElse_ from "@effect-ts/core/Effect"
     */
    repeatOrElse<R, E, A, SR, B, R2, E2, C>(
      this: Effect<R, E, A>,
      schedule: Schedule<SR, A, B>,
      orElse: (_: E, __: O.Option<B>) => Effect<R2, E2, C>,
      __trace?: string
    ): Effect<R & SR & R2 & HasClock, E2, C | B>

    /**
     * @rewrite repeatOrElseEither_ from "@effect-ts/core/Effect"
     */
    repeatOrElseEither<R, E, Env1, A, B, R2, E2, C>(
      this: Effect<R, E, A>,
      schedule: Schedule<Env1, A, B>,
      orElse: (_: E, __: O.Option<B>) => Effect<R2, E2, C>,
      __trace?: string
    ): Effect<R & Env1 & R2 & HasClock, E2, E.Either<C, B>>

    /**
     * @rewrite repeatUntilM_ from "@effect-ts/core/Effect"
     */
    repeatUntilM<R, E, A, R1, E1>(
      this: T.Effect<R, E, A>,
      f: (a: A) => T.Effect<R1, E1, boolean>,
      __trace?: string | undefined
    ): T.Effect<R & R1, E | E1, A>

    /**
     * @rewrite repeatUntil_ from "@effect-ts/core/Effect"
     */
    repeatUntil<R, E, A>(
      this: T.Effect<R, E, A>,
      f: (a: A) => boolean,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite repeatWhileM_ from "@effect-ts/core/Effect"
     */
    repeatWhileM<R, E, A, R1, E1>(
      this: T.Effect<R, E, A>,
      f: (a: A) => T.Effect<R1, E1, boolean>,
      __trace?: string | undefined
    ): T.Effect<R & R1, E | E1, A>

    /**
     * @rewrite repeatWhile_ from "@effect-ts/core/Effect"
     */
    repeatWhile<R, E, A>(
      this: T.Effect<R, E, A>,
      f: (a: A) => boolean,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite replaceService_ from "@effect-ts/core/Effect"
     */
    replaceService<R1, E1, A1, T>(
      ma: T.Effect<R1 & Has<T>, E1, A1>,
      tag: Tag<T>,
      f: (_: T) => T,
      __trace?: string | undefined
    ): T.Effect<R1 & Has<T>, E1, A1>

    /**
     * @rewrite replaceServiceM_ from "@effect-ts/core/Effect"
     */
    replaceServiceM<R, E, T, R1, E1, A1>(
      this: Effect<R1 & Has<T>, E1, A1>,
      tag: Tag<T>,
      f: (_: T) => Effect<R, E, T>,
      __trace?: string
    ): Effect<R & R1 & Has<T>, E | E1, A1>

    /**
     * @rewrite replicate_ from "@effect-ts/core/Effect"
     */
    replicate<R, E, A>(this: T.Effect<R, E, A>, n: number): readonly T.Effect<R, E, A>[]

    /**
     * @rewrite require_ from "@effect-ts/core/Effect"
     */
    require<R, A, E, E2>(
      this: T.Effect<R, E, O.Option<A>>,
      error: () => E2,
      __trace?: string | undefined
    ): T.Effect<R, E | E2, A>

    /**
     * @rewrite reserve_ from "@effect-ts/core/Effect"
     */
    reserve<R, E, R2, E2, R3, E3, B, A>(
      this: Effect<R, E, M.Reservation<R2, E2, A>>,
      use: (a: A) => Effect<R3, E3, B>,
      __trace?: string
    ): Effect<R & R2 & R3, E | E2 | E3, B>

    /**
     * @rewrite resetForkScope_ from "@effect-ts/core/Effect"
     */
    resetForkScope<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite result from "@effect-ts/core/Effect"
     */
    result<RX, EX, AX>(
      this: T.Effect<RX, EX, AX>,
      __trace?: string
    ): T.Effect<RX, never, Exit<EX, AX>>

    /**
     * @rewrite resurrect from "@effect-ts/core/Effect"
     */
    resurrect<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, unknown, A>

    /**
     * @rewrite retry_ from "@effect-ts/core/Effect"
     */
    retry<R, E extends I, I, A, R1, O>(
      this: T.Effect<R, E, A>,
      policy: Schedule<R1, I, O>,
      __trace?: string | undefined
    ): T.Effect<R & R1 & Has<Clock>, E, A>

    /**
     * @rewrite retryOrElse_ from "@effect-ts/core/Effect"
     */
    retryOrElse<R, E extends I, I, A, R1, O, R2, E2, A2>(
      self: Effect<R, E, A>,
      policy: Schedule<R1, I, O>,
      orElse: (e: E, o: O) => Effect<R2, E2, A2>,
      __trace?: string
    ): Effect<R & R1 & R2 & HasClock, E2, A | A2>

    /**
     * @rewrite retryOrElseEither_ from "@effect-ts/core/Effect"
     */
    retryOrElseEither<R, E extends I, A, I, R1, O, R2, E2, A2>(
      self: Effect<R, E, A>,
      policy: Schedule<R1, I, O>,
      orElse: (e: E, o: O) => Effect<R2, E2, A2>,
      __trace?: string
    ): Effect<R & R1 & R2 & HasClock, E2, E.Either<A2, A>>

    /**
     * @rewrite retryUntilM_ from "@effect-ts/core/Effect"
     */
    retryUntilM<R, E, A, R1, E1>(
      this: T.Effect<R, E, A>,
      f: (a: E) => T.Effect<R1, E1, boolean>,
      __trace?: string | undefined
    ): T.Effect<R & R1, E | E1, A>

    /**
     * @rewrite retryUntil_ from "@effect-ts/core/Effect"
     */
    retryUntil<R, E, A>(
      this: T.Effect<R, E, A>,
      f: (a: E) => boolean,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite retryWhileM_ from "@effect-ts/core/Effect"
     */
    retryWhileM<R, E, A, R1, E1>(
      this: T.Effect<R, E, A>,
      f: (a: E) => T.Effect<R1, E1, boolean>,
      __trace?: string | undefined
    ): T.Effect<R & R1, E | E1, A>

    /**
     * @rewrite retryWhile_ from "@effect-ts/core/Effect"
     */
    retryWhile<R, E, A>(
      this: T.Effect<R, E, A>,
      f: (a: E) => boolean,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite right from "@effect-ts/core/Effect"
     */
    right<R, E, B, C>(
      this: T.Effect<R, E, E.Either<B, C>>,
      __trace?: string | undefined
    ): T.Effect<R, O.Option<E>, C>

    /**
     * @rewrite runPromise from "@effect-ts/core/Effect"
     */
    runPromise<EX, AX>(this: T.Effect<T.DefaultEnv, EX, AX>): Promise<AX>

    /**
     * @rewrite runPromiseExit from "@effect-ts/core/Effect"
     */
    runPromiseExit<EX, AX>(this: T.Effect<T.DefaultEnv, EX, AX>): Promise<Exit<EX, AX>>

    /**
     * @rewrite runFiber from "@effect-ts/core/Effect"
     */
    runFiber<EX, AX>(this: T.Effect<T.DefaultEnv, EX, AX>): Fiber.Fiber<EX, AX>

    /**
     * @rewrite sandbox from "@effect-ts/core/Effect"
     */
    sandbox<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R, Cause<E>, A>

    /**
     * @rewrite sandboxWith_ from "@effect-ts/core/Effect"
     */
    sandboxWith<R, E, A, E2>(
      this: Effect<R, E, A>,
      f: (_: Effect<R, Cause<E>, A>) => Effect<R, Cause<E2>, A>,
      __trace?: string
    ): Effect<R, E2, A>

    /**
     * @rewrite some from "@effect-ts/core/Effect"
     */
    some<R, E, A>(
      this: T.Effect<R, E, O.Option<A>>,
      __trace?: string | undefined
    ): T.Effect<R, O.Option<E>, A>

    /**
     * @rewrite someOrElseM_ from "@effect-ts/core/Effect"
     */
    someOrElseM<R, E, A, R2, E2, B>(
      this: T.Effect<R, E, O.Option<A>>,
      orElse: T.Effect<R2, E2, B>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E | E2, A | B>

    /**
     * @rewrite someOrElse_ from "@effect-ts/core/Effect"
     */
    someOrElse<R, E, A, B>(
      this: T.Effect<R, E, O.Option<A>>,
      orElse: () => B,
      __trace?: string | undefined
    ): T.Effect<R, E, A | B>

    /**
     * @rewrite someOrFail_ from "@effect-ts/core/Effect"
     */
    someOrFail<R, E, A, E2>(
      this: T.Effect<R, E, O.Option<A>>,
      orFail: () => E2,
      __trace?: string | undefined
    ): T.Effect<R, E | E2, A>

    /**
     * @rewrite someOrFailException from "@effect-ts/core/Effect"
     */
    someOrFailException<R, E, A>(
      this: T.Effect<R, E, O.Option<A>>,
      __trace?: string | undefined
    ): T.Effect<R, E | NoSuchElementException, A>

    /**
     * @rewrite summarized_ from "@effect-ts/core/Effect"
     */
    summarized<R, E, A, R2, E2, B, C>(
      this: Effect<R, E, A>,
      summary: Effect<R2, E2, B>,
      f: (start: B, end: B) => C,
      __trace?: string
    ): Effect<R & R2, E | E2, Tp.Tuple<[C, A]>>

    /**
     * @rewrite supervised_ from "@effect-ts/core/Effect"
     */
    supervised<R, E, A>(
      this: T.Effect<R, E, A>,
      supervisor: Supervisor<any>,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

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
     * @rewrite fromRawEffect from "@effect-ts/core/Effect/Layer"
     */
    toLayer<RX, EX, AX>(this: T.Effect<RX, EX, AX>): Layer<RX, EX, AX>

    /**
     * @rewrite fromEffect_ from "@effect-ts/core/Effect/Layer"
     */
    toLayer<RX, EX, AX>(
      this: T.Effect<RX, EX, AX>,
      tag: Tag<AX>
    ): Layer<RX, EX, Has<AX>>

    /**
     * @rewrite fromEffect from "@effect-ts/core/Effect/Managed"
     */
    toManaged<RX, EX, AX>(this: T.Effect<RX, EX, AX>): M.Managed<RX, EX, AX>

    /**
     * @rewrite toManagedRelease_ from "@effect-ts/core/Effect"
     */
    toManaged<A, R1, E1, R>(
      this: T.Effect<R1, E1, A>,
      release: (a: A) => T.Effect<R, never, any>
    ): M.Managed<R1 & R, E1, A>

    /**
     * @rewrite timed from "@effect-ts/core/Effect"
     */
    timed<R, E, A>(
      this: T.Effect<R, E, A>,
      __trace?: string | undefined
    ): T.Effect<R & Has<Clock>, E, Tp.Tuple<[number, A]>>

    /**
     * @rewrite timedWith_ from "@effect-ts/core/Effect"
     */
    timedWith<R, E, A, R2, E2>(
      this: T.Effect<R, E, A>,
      msTime: T.Effect<R2, E2, number>,
      __trace?: string | undefined
    ): T.Effect<R & R2, E | E2, Tp.Tuple<[number, A]>>

    /**
     * @rewrite timeoutFail_ from "@effect-ts/core/Effect"
     */
    timeoutFail<R, E, E2, A>(
      this: T.Effect<R, E, A>,
      d: number,
      e: () => E2,
      __trace?: string | undefined
    ): T.Effect<R & Has<Clock>, E | E2, A>

    /**
     * @rewrite timeoutTo_ from "@effect-ts/core/Effect"
     */
    timeoutTo<R, E, A, B, B2>(
      this: T.Effect<R, E, A>,
      delay: number,
      orElse: B,
      f: (a: A) => B2,
      __trace?: string | undefined
    ): T.Effect<R & Has<Clock>, E, B | B2>

    /**
     * @rewrite timeout_ from "@effect-ts/core/Effect"
     */
    timeout<R, E, A>(
      this: T.Effect<R, E, A>,
      d: number,
      __trace?: string | undefined
    ): T.Effect<R & Has<Clock>, E, O.Option<A>>

    /**
     * @rewrite to_ from "@effect-ts/core/Effect"
     */
    to<R, E, A>(
      this: T.Effect<R, E, A>,
      promise: P.Promise<E, A>,
      __trace?: string | undefined
    ): T.Effect<R, never, boolean>

    /**
     * @rewrite traced from "@effect-ts/core/Effect"
     */
    traced<R, E, A>(this: T.Effect<R, E, A>): T.Effect<R, E, A>

    /**
     * @rewrite tracingStatus_ from "@effect-ts/core/Effect"
     */
    tracingStatus<R, E, A>(this: T.Effect<R, E, A>, flag: boolean): T.Effect<R, E, A>

    /**
     * @rewrite uncause from "@effect-ts/core/Effect"
     */
    uncause<R, E>(
      this: T.RIO<R, Cause<E>>,
      __trace?: string | undefined
    ): T.Effect<R, E, void>

    /**
     * @rewrite unfailable from "smart:identity"
     */
    unfailable<R, A>(this: T.Effect<R, never, A>): T.RIO<R, A>

    /**
     * @rewrite uninterruptible from "@effect-ts/core/Effect"
     */
    uninterruptible: <R, E, A>(effect: T.Effect<R, E, A>) => T.Effect<R, E, A>

    /**
     * @rewrite unlessM_ from "@effect-ts/core/Effect"
     */
    unlessM<R2, E2, R, E, A>(
      this: T.Effect<R, E, A>,
      bool: T.Effect<R2, E2, boolean>,
      __trace?: string | undefined
    ): T.Effect<R2 & R, E2 | E, void>

    /**
     * @rewrite unless_ from "@effect-ts/core/Effect"
     */
    unless<R, E, A>(
      this: T.Effect<R, E, A>,
      pred: () => boolean,
      __trace?: string | undefined
    ): T.Effect<R, E, void>

    /**
     * @rewrite unrefineWith_ from "@effect-ts/core/Effect"
     */
    unrefineWith<R, E, E1, E2, A>(
      this: T.Effect<R, E, A>,
      pf: (u: unknown) => O.Option<E1>,
      f: (e: E) => E2,
      __trace?: string | undefined
    ): T.Effect<R, E1 | E2, A>

    /**
     * @rewrite unrefine_ from "@effect-ts/core/Effect"
     */
    unrefine<R, E, A, E1>(
      this: T.Effect<R, E, A>,
      pf: (u: unknown) => O.Option<E1>,
      __trace?: string | undefined
    ): T.Effect<R, E | E1, A>

    /**
     * @rewrite unrefine_ from "@effect-ts/core/Effect"
     */
    unsandbox<R, E, A>(
      this: T.Effect<R, Cause<E>, A>,
      __trace?: string | undefined
    ): T.Effect<R, E, A>

    /**
     * @rewrite untraced from "@effect-ts/core/Effect"
     */
    untraced<R, E, A>(this: T.Effect<R, E, A>): T.Effect<R, E, A>

    /**
     * @rewrite updateService_ from "@effect-ts/core/Effect"
     */
    updateService<T, R, E, A>(
      this: T.Effect<R, E, A>,
      tag: Tag<T>,
      f: (_: T) => T,
      __trace?: string | undefined
    ): T.Effect<R & Has<T>, E, A>

    /**
     * @rewrite whenM_ from "@effect-ts/core/Effect"
     */
    whenM<R1, E1, A, R, E>(
      this: T.Effect<R1, E1, A>,
      predicate: T.Effect<R, E, boolean>,
      __trace?: string | undefined
    ): T.Effect<R & R1, E1 | E, void>

    /**
     * @rewrite when_ from "@effect-ts/core/Effect"
     */
    when<R1, E1, A>(
      this: T.Effect<R1, E1, A>,
      predicate: () => boolean,
      __trace?: string | undefined
    ): T.Effect<R1, E1, O.Option<A>>

    /**
     * @rewrite zip_ from "@effect-ts/core/Effect"
     */
    zip<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, Tp.Tuple<[AX, B]>>

    /**
     * @rewrite zipPar_ from "@effect-ts/core/Effect"
     */
    zipPar<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, Tp.Tuple<[AX, B]>>

    /**
     * @rewrite zipRight_ from "@effect-ts/core/Effect"
     */
    zipRight<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, B>

    /**
     * @rewrite zipRightPar_ from "@effect-ts/core/Effect"
     */
    zipRightPar<RX, EX, AX, R2, E2, B>(
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
     * @rewrite zipLeftPar_ from "@effect-ts/core/Effect"
     */
    zipLeftPar<RX, EX, AX, R2, E2, B>(
      this: T.Effect<RX, EX, AX>,
      f: T.Effect<R2, E2, B>,
      __trace?: string
    ): T.Effect<RX & R2, EX | E2, AX>

    /**
     * @rewrite zipWith_ from "@effect-ts/core/Effect"
     */
    zipWith<R, E, A, R2, E2, A2, B>(
      this: T.Effect<R, E, A>,
      that: T.Effect<R2, E2, A2>,
      f: (a: A, b: A2) => B,
      __trace?: string | undefined
    ): T.Effect<R & R2, E | E2, B>

    /**
     * @rewrite zipWithPar_ from "@effect-ts/core/Effect"
     */
    zipWithPar<R, E, A, R2, E2, A2, B>(
      this: T.Effect<R, E, A>,
      that: T.Effect<R2, E2, A2>,
      f: (a: A, b: A2) => B,
      __trace?: string | undefined
    ): T.Effect<R & R2, E | E2, B>
  }
}
