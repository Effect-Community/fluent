import * as T from "@effect-ts/core/Effect"
import * as L from "@effect-ts/core/Effect/Layer"
import * as M from "@effect-ts/core/Effect/Managed"
import { tag } from "@effect-ts/core/Has"
import type { _A } from "@effect-ts/core/Utils"

import {} from "../src/Extensions"

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

describe("Managed API", () => {
  it("fluent", async () => {
    const messages: string[] = []

    const TestConsole = L.pure(Console)({
      log: (s) =>
        T.succeedWith(() => {
          messages.push(s)
        })
    })

    const program = log("init")
      .toManaged()
      .tap(() => log("ok"))
      .tap(() => M.finalizer(log("close")))
      .use(T.succeed)

    expect(await program.inject(TestConsole).runPromise()).toEqual(void 0)
    expect(messages).toEqual(["init", "ok", "close"])
  })
})
