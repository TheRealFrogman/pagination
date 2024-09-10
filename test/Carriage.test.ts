import assert from "assert";
import test, { describe } from "node:test";
import { Carriage } from "../src/implement/Carriage";

describe("carriage", async () => {
   test("works as expected", () => {
      const carriage = new Carriage(1, 2, 13)
      carriage.shiftBy(-1)
      assert.deepEqual(carriage.bounds, [0, 2])
      carriage.shiftBy(5)
      assert.deepEqual(carriage.bounds, [10, 12])
   })

   test("can't move back past 0 index", () => {
      const carriage = new Carriage(1, 2, 13)
      carriage.shiftBy(-1)
      assert.deepEqual(carriage.bounds, [0, 2])
   })
   test("overflow shift", async (t) => {
      await t.test("overflow shift 1", () => {
         const carriage = new Carriage(1, 5, 13)
         carriage.shiftBy(3)
         assert.deepEqual(carriage.bounds, [10, 15])
      })
      await t.test("overflow shift 2", () => {
         const carriage = new Carriage(1, 5, 3643)
         carriage.shiftBy(12312432523)
         assert.deepEqual(carriage.bounds, [3640, 3645])
      })
   })
   test("overflow width", async (t) => {
      await t.test("overflow width 1", () => {
         const carriage = new Carriage(1, 1, 123)
         carriage.shiftBy(120)
         assert.deepEqual(carriage.bounds, [120, 121])

      })
      await t.test("overflow width 2", () => {
         const carriage = new Carriage(1, 2, 123)
         carriage.shiftBy(60)
         assert.deepEqual(carriage.bounds, [120, 122])

      })
   })
   test("page", async (t) => {
      await t.test("page 1", () => {
         const carriage = new Carriage(1, 2, 13)
         carriage.shiftBy(1)
         assert.deepEqual(carriage.page, 2)

      })
      await t.test("page 2", () => {
         const carriage = new Carriage(1, 5, 13)
         carriage.shiftBy(5)
         assert.deepEqual(carriage.page, 3)
      })
      await t.test("page 3", () => {
         const carriage = new Carriage(5, 5, 13)
         carriage.shiftBy(-3)
         assert.deepEqual(carriage.page, 2)
         assert.deepEqual(carriage.bounds, [5, 10])
      })
   })
})