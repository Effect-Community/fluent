import type {} from "../src/Prelude"

describe("Prelude", () => {
  it("works", async () => {
    const logCache: string[] = []
    const log = (s: string) => T.Effect.succeed(() => logCache.push(s))

    const ServiceId = "@demo/Service"
    type ServiceId = typeof ServiceId

    interface Service {
      readonly serviceId: ServiceId
      readonly print: (s: string) => T.EffectU<void>
    }

    const Service = T.Data.tag<Service>()

    const LiveService = T.Effect.succeed(() =>
      Service.of({
        serviceId: ServiceId,
        print: (s) =>
          T.Effect.succeed(() => {
            logCache.push(s)
          })
      })
    )
      .tap((x) => log(`create: ${Service.read(x).serviceId}`))
      .toManaged((x) => log(`close: ${Service.read(x).serviceId}`))
      .toLayer()

    const { print } = Service.deriveLifted("print")

    expect(
      await T.Chunk.from([0, 1, 2])
        .map((n) => n + 1)
        .mapM((x) => T.Effect.succeed(() => x + 1).tap((x) => print(`got: ${x}`)))
        .map((_) => _.toArray())
        .inject(LiveService)
        .runPromise()
    ).toEqual([2, 3, 4])

    expect(logCache).toEqual([
      `create: ${ServiceId}`,
      `got: 2`,
      `got: 3`,
      `got: 4`,
      `close: ${ServiceId}`
    ])
  })

  it("forEachF", async () => {
    const res = await T.Chunk.many(0, 1, 2)
      .forEachF(T.Effect.Applicative)((n) => T.Effect.succeedNow(n + 1))
      .map((_) => _.toArray())
      .runPromise()

    const res2 = T.Chunk.many(0, 1, 2)
      .forEachF(T.Option.Applicative)((n) => T.Option.some(n + 1))
      .map((_) => _.toArray())
      .toUndefined()!

    expect(res).toEqual(res2)
  })
})
