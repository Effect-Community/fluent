import * as E from "@effect-ts/core/Either"
import * as O from "@effect-ts/core/Option"

import {} from "../src/Extensions"

describe("Smart", () => {
  it("pipe", () => {
    expect(O.some(1).pipe(O.chain((n) => O.some(n + 1)))).toEqual(O.some(2))

    expect(E.right(0).widenLeft<string>()).toEqual(E.right(0))
  })
})
