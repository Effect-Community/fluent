import * as T from "@effect-ts/core/Effect"
import * as L from "@effect-ts/core/Effect/Layer"
import { tag } from "@effect-ts/core/Has"
import type { _A } from "@effect-ts/core/Utils"

const makeConsole = T.succeedWith(() => {
  return {
    log: (s: string) =>
      T.succeedWith(() => {
        console.log(s)
      })
  }
})

interface Console extends _A<typeof makeConsole> {}
const Console = tag<Console>()
const { log } = T.deriveLifted(Console)(["log"], [], [])

describe("Array API", () => {
  it("fluent", async () => {
    const messages: string[] = []

    const TestConsole = L.pure(Console)({
      log: (s) =>
        T.succeedWith(() => {
          messages.push(s)
        })
    })

    const program = [0, 1, 2].mapM((n) => T.succeed(n + 1).zipLeft(log(`n: ${n}`)))

    expect(await program.inject(TestConsole).runPromise()).toEqual([1, 2, 3])
    expect(messages).toEqual(["n: 0", "n: 1", "n: 2"])
  })
})
