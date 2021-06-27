import * as T from "@effect-ts/core/Effect"
import { tag } from "@effect-ts/core/Has"
import * as S from "@effect-ts/core/Sync"
import type { _A } from "@effect-ts/core/Utils"

export const makeConsole = T.succeedWith(() => {
  return {
    log: (s: string) =>
      T.succeedWith(() => {
        console.log(s)
      })
  }
})

export interface Console extends _A<typeof makeConsole> {}
export const Console = tag<Console>()
export const LiveConsole = makeConsole.toLayer(Console)

const { log } = T.deriveLifted(Console)(["log"], [], [])

describe("Array API", () => {
  it("fluent", async () => {
    const messages: string[] = []

    const TestConsole = Console.of({
      log: (s) =>
        T.succeedWith(() => {
          messages.push(s)
        })
    }).toLayer()

    const program = [0, 1, 2].mapM((n) => T.succeed(n + 1).zipLeft(log(`n: ${n}`)))

    expect(await program.inject(TestConsole).runPromise()).toEqual([1, 2, 3])
    expect(messages).toEqual(["n: 0", "n: 1", "n: 2"])

    expect(S.run([0, 1, 2].mapM((n) => S.succeed(n + 1)))).toEqual([1, 2, 3])

    const mockConsole = jest.fn()

    const spyConsole = jest.spyOn(console, "log").mockImplementation(mockConsole)

    await program.inject(LiveConsole).runPromise()

    spyConsole.mockRestore()

    expect(mockConsole).toHaveBeenNthCalledWith(1, "n: 0")
    expect(mockConsole).toHaveBeenNthCalledWith(2, "n: 1")
    expect(mockConsole).toHaveBeenNthCalledWith(3, "n: 2")
  })
})
