import type { Tuple } from "@effect-ts/core/Collections/Immutable/Tuple"
import type * as E from "@effect-ts/core/Either"
import type { Predicate, Refinement } from "@effect-ts/core/Function"
import type * as O from "@effect-ts/core/Option"
import type { Separated } from "@effect-ts/core/Utils"

export interface OptionOps<A> {
  /**
   * @rewrite pipe from "smart:pipe"
   */
  pipe<Self, Ret>(this: Self, f: (self: Self) => Ret): Ret

  /**
   * @rewrite ap_ from "@effect-ts/core/Option"
   */
  ap<AX, B>(this: O.Option<(a: AX) => B>, fa: O.Option<AX>): O.Option<B>

  /**
   * @rewrite chain_ from "@effect-ts/core/Option"
   */
  chain<AX, B>(this: O.Option<AX>, f: (a: AX) => O.Option<B>): O.Option<B>

  /**
   * @rewrite duplicate from "@effect-ts/core/Option"
   */
  duplicate<AX>(this: O.Option<AX>): O.Option<O.Option<AX>>

  /**
   * @rewrite exists_ from "@effect-ts/core/Option"
   */
  exists<AX>(this: O.Option<AX>, predicate: Predicate<AX>): boolean

  /**
   * @rewrite extend_ from "@effect-ts/core/Option"
   */
  extend<AX, B>(this: O.Option<AX>, f: (a: O.Option<AX>) => B): O.Option<B>

  /**
   * @rewrite flatten from "@effect-ts/core/Option"
   */
  flatten<AX>(this: O.Option<O.Option<AX>>): O.Option<AX>

  /**
   * @rewrite filter_ from "@effect-ts/core/Option"
   */
  filter<AX, BX extends AX>(
    this: O.Option<AX>,
    refinement: Refinement<AX, BX>
  ): O.Option<BX>

  /**
   * @rewrite filter_ from "@effect-ts/core/Option"
   */
  filter<AX>(this: O.Option<AX>, refinement: Predicate<AX>): O.Option<AX>

  /**
   * @rewrite filterMap_ from "@effect-ts/core/Option"
   */
  filter<AX, BX>(this: O.Option<AX>, refinement: (a: AX) => O.Option<BX>): O.Option<BX>

  /**
   * @rewrite fold_ from "@effect-ts/core/Option"
   */
  fold<AX, B, C>(this: O.Option<AX>, onNone: () => B, onSome: (a: AX) => C): B | C

  /**
   * @rewrite getOrElse_ from "@effect-ts/core/Option"
   */
  getOrElse<AX, B>(this: O.Option<AX>, f: () => B): O.Option<AX | B>

  /**
   * @rewrite isSome from "@effect-ts/core/Option"
   */
  isSome<AX>(this: O.Option<AX>): this is O.Some<AX>

  /**
   * @rewrite isNone from "@effect-ts/core/Option"
   */
  isNone<AX>(this: O.Option<AX>): this is O.None

  /**
   * @rewrite map_ from "@effect-ts/core/Option"
   */
  map<AX, B>(this: O.Option<AX>, f: (a: AX) => B): O.Option<B>

  /**
   * @rewrite partitionMap_ from "@effect-ts/core/Option"
   */
  partition<AX, B, C>(
    this: O.Option<AX>,
    f: (a: AX) => E.Either<B, C>
  ): Separated<O.Option<B>, O.Option<C>>

  /**
   * @rewrite partition_ from "@effect-ts/core/Option"
   */
  partition<AX, B extends AX>(
    this: O.Option<AX>,
    ref: Refinement<AX, B>
  ): Separated<O.Option<Exclude<AX, B>>, O.Option<B>>

  /**
   * @rewrite partition_ from "@effect-ts/core/Option"
   */
  partition<AX>(
    this: O.Option<AX>,
    ref: Predicate<AX>
  ): Separated<O.Option<AX>, O.Option<AX>>

  /**
   * @rewrite separate from "@effect-ts/core/Option"
   */
  separate<AX, BX>(
    this: O.Option<E.Either<AX, BX>>
  ): Separated<O.Option<AX>, O.Option<BX>>

  /**
   * @rewrite tap_ from "@effect-ts/core/Option"
   */
  tap<AX, B>(this: O.Option<AX>, f: (a: AX) => O.Option<B>): O.Option<AX>

  /**
   * @rewriteGetter toUndefined from "@effect-ts/core/Option"
   */
  readonly value: A | undefined

  /**
   * @rewrite zip_ from "@effect-ts/core/Option"
   */
  zip<AX, B>(this: O.Option<AX>, fa: O.Option<B>): O.Option<Tuple<[AX, B]>>

  /**
   * @rewrite zipFirst_ from "@effect-ts/core/Option"
   */
  zipLeft<AX, B>(this: O.Option<AX>, fa: O.Option<B>): O.Option<AX>

  /**
   * @rewrite zipSecond_ from "@effect-ts/core/Option"
   */
  zipRight<AX, B>(this: O.Option<AX>, fa: O.Option<B>): O.Option<B>
}

declare module "@effect-ts/system/Option/core" {
  export interface Some<A> extends OptionOps<A> {}
  export interface None extends OptionOps<never> {}
}
