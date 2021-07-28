import {} from "../../packages/fluent/src/Extensions"

declare global {
  namespace jest {
    interface Matchers<R, T = {}> {
      equals(b: unknown): void
    }
  }
}
