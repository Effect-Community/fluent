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

export const { log } = Console.deriveLifted("log")

export const makePrinter = T.do
  .bind("console", () => T.service(Console))
  .map((_) => ({
    printN: (n: number) => _.console.log(`n: ${n}`)
  }))

export interface Printer extends _A<typeof makePrinter> {}
export const Printer = tag<Printer>()
export const LivePrinter = makePrinter.toLayer(Printer)

export const { printN } = Printer.deriveLifted("printN")

describe("Array API", () => {
  it("fluent", async () => {
    const messages: string[] = []

    const TestConsole = Console.of({
      log: (s) =>
        T.succeedWith(() => {
          messages.push(s)
        })
    }).toLayer()

    const program = [0, 1, 2].mapM((n) => T.succeed(n + 1).tap(printN))

    expect(await program.inject(TestConsole[">+>"](LivePrinter)).runPromise()).toEqual([
      1, 2, 3
    ])
    expect(messages).toEqual(["n: 1", "n: 2", "n: 3"])

    expect(S.run([0, 1, 2].mapM((n) => S.succeed(n + 1)))).toEqual([1, 2, 3])

    const mockConsole = jest.fn()

    const spyConsole = jest.spyOn(console, "log").mockImplementation(mockConsole)

    await program.inject(LiveConsole[">+>"](LivePrinter)).runPromise()

    spyConsole.mockRestore()

    expect(mockConsole).toHaveBeenNthCalledWith(1, "n: 1")
    expect(mockConsole).toHaveBeenNthCalledWith(2, "n: 2")
    expect(mockConsole).toHaveBeenNthCalledWith(3, "n: 3")
  })
})
