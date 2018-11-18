import dotEvent from "dot-event"
import dotStore from "dot-store"
import { readFile } from "fs-extra"

import dotLogger from "../dist/logger"

test("logs text", async () => {
  const events = dotEvent()
  const store = dotStore(events)

  dotLogger({ events, store })

  await events.logger("test", ["hello"])
  const out = await readFile(store.get("test.log"))

  expect(out.toString()).toMatch(/hello/)
})

test("logs events", async () => {
  const events = dotEvent()
  const store = dotStore(events)

  dotLogger({ events, store })

  await events.emit("hello", "world")
  const out = await readFile(store.get("any.log"))

  expect(out.toString()).toMatch(/emit\thello\t"world"/)
})
