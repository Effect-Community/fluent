import * as O from "@effect-ts/core/Option"

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
})
