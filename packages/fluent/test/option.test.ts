import * as O from "@effect-ts/core/Option"

describe("Option API", () => {
  it("option", () => {
    expect(O.some(1).value).toEqual(1)
    expect(O.none.value).toEqual(void 0)
  })
})
