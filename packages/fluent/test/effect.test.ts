import { Tagged } from "@effect-ts/core/Case"
import { Effect } from "@effect-ts/core/Effect"
import { tag } from "@effect-ts/core/Has"
import * as S from "@effect-ts/core/Sync"
import type { _A } from "@effect-ts/core/Utils"

class Err1 extends Tagged("Err1")<{}> {}
class Err2 extends Tagged("Err2")<{}> {}

const makeConsole = Effect.succeed(() => ({
  log: (s: string) =>
    Effect.succeed(() => {
      console.log(s)
    })
}))

interface Console extends _A<typeof makeConsole> {}
const Console = tag<Console>()
const { log } = Effect.deriveLifted(Console)(["log"], [], [])

describe("Effect API", () => {
  it("fluent", async () => {
    const messages: string[] = []

    const TestConsole = Console.of({
      log: (s) =>
        Effect.succeed(() => {
          messages.push(s)
        })
    }).toLayer()

    const fn = jest.fn()

    const program = Effect.do_
      .let("foo", () => 0)
      .bind("bar", (_) => Effect.succeedNow(_.foo + 1))
      .map((_) => _.bar)
      .as(0)
      .foldM(Effect.failNow, Effect.succeedNow)
      .result()
      .chain(Effect.done)
      .chain(S.succeed)
      .chain(() => Effect.failNow(new Err1()))
      .chain(() => Effect.failNow(new Err2()))
      .catchTag("Err1", (e) => Effect.succeedNow(e._tag.length))
      .tap((n) => log(`n: ${n}`))
      .either()
      .absolve()
      .race(Effect.succeedNow(0).delay(10))
      .ensuring(
        Effect.succeed(() => {
          fn()
        })
      )
      .bracket(Effect.succeedNow, () =>
        Effect.succeed(() => {
          fn()
        })
      )

    expect(await program.inject(TestConsole).runPromise()).toEqual(4)
    expect(messages).toEqual(["n: 4"])
    expect(fn).toHaveBeenCalledTimes(2)
    expect(S.run(S.succeed(0).chain((n) => S.succeed(n + 1)))).toEqual(1)
  })
})
