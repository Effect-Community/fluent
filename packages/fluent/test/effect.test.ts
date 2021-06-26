import { Tagged } from "@effect-ts/core/Case"
import * as T from "@effect-ts/core/Effect"
import * as L from "@effect-ts/core/Effect/Layer"
import { tag } from "@effect-ts/core/Has"
import * as S from "@effect-ts/core/Sync"
import type { _A } from "@effect-ts/core/Utils"

class Err1 extends Tagged("Err1")<{}> {}
class Err2 extends Tagged("Err2")<{}> {}

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

describe("Effect API", () => {
  it("fluent", async () => {
    const messages: string[] = []

    const TestConsole = L.pure(Console)({
      log: (s) =>
        T.succeedWith(() => {
          messages.push(s)
        })
    })

    const fn = jest.fn()

    const program = T.do
      .let("foo", () => 0)
      .bind("bar", (_) => T.succeed(_.foo + 1))
      .map((_) => _.bar)
      .as(0)
      .foldM(T.fail, T.succeed)
      .result()
      .chain(T.done)
      .chain(S.succeed)
      .chain(() => T.fail(new Err1()))
      .chain(() => T.fail(new Err2()))
      .catchTag("Err1", (e) => T.succeed(e._tag.length))
      .tap((n) => log(`n: ${n}`))
      .either()
      .absolve()
      .race(T.delay(10)(T.succeed(0)))
      .ensuring(
        T.succeedWith(() => {
          fn()
        })
      )
      .bracket(T.succeed, () =>
        T.succeedWith(() => {
          fn()
        })
      )

    expect(await program.inject(TestConsole).runPromise()).toEqual(4)
    expect(messages).toEqual(["n: 4"])
    expect(fn).toHaveBeenCalledTimes(2)
    expect(S.run(S.succeed(0).chain((n) => S.succeed(n + 1)))).toEqual(1)
  })
})