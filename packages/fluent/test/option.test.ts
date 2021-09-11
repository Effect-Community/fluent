import * as E from "@effect-ts/core/Either"
import * as O from "@effect-ts/core/Option"

import {} from "../src/Extensions"

describe("Option API", () => {
  it("option", () => {
    expect(O.some(1).value).toEqual(1)
    expect(O.none.value).toEqual(void 0)

    const fn = (n: number) => O.some(n).chain((k) => (k > 0 ? O.some(k) : O.none))

    const res0 = fn(0)
    const res1 = fn(1)

    expect(res0.value).toEqual(void 0)
    expect(res1.value).toEqual(1)

    if (res1.isSome()) {
      expect(res1.value).toEqual(1)
    }
  })

  it("ap", () => {
    expect(
      O.some((n: number) => (s: string) => `${s}: ${n}`)
        .ap(O.some(0))
        .ap(O.some("ok"))
        .getOrElse(() => "n/a")
    ).toEqual("ok: 0")
  })

  it("partitionMap", () => {
    const res = O.some(1).partition((n) => (n > 0 ? E.right(n) : E.left(n)))

    expect(res).toEqual({ left: O.none, right: O.some(1) })
  })
})
