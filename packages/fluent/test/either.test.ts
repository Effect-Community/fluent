import * as E from "@effect-ts/core/Either"
import * as O from "@effect-ts/core/Option"

import {} from "../src/Extensions"

describe("Either API", () => {
  it("either", () => {
    expect(O.some(1).toUndefined()).toEqual(1)
    expect(O.none.toUndefined()).toEqual(void 0)

    const fn = (n: number) =>
      E.right(n).chain((k) => (k > 0 ? E.right(k) : E.left("error")))

    const res0 = fn(0)
    const res1 = fn(1)

    expect(res0.left).toEqual("error")
    expect(res0.right).toEqual(void 0)

    expect(res1.right).toEqual(1)
    expect(res1.left).toEqual(void 0)

    if (res0.isLeft()) {
      expect(res0.left).toEqual("error")
    }

    if (res1.isRight()) {
      expect(res1.right).toEqual(1)
    }
  })
})
