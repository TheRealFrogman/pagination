import assert from "assert"
import { randomUUID, UUID } from "crypto"

import { describe, it, test, beforeEach } from "node:test"
import { User } from "./test-entity/User"
import { paginate } from "../src/implement/Paginate"

/**
 * @todo я думаю надо сделать отдельные классы моделей для теста
 */
describe("Pagination", async (t) => {

   let allUsers: User[] = []

   beforeEach(() => {
      const userMock = new User(
         randomUUID(),
         "test@example.com",
         "test_login",
         "test first name",
         "test last name"
      )

      allUsers = [
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         ),
         new User(
            randomUUID(),
            "test@example.com",
            "test_login",
            "test first name",
            "test last name"
         )
      ] satisfies User[]

      assert(allUsers.length === 13)
   })

   await test("throws if limit less than 1", async () => {
      assert.throws(() => {
         paginate(allUsers, {
            current_page: 1,
            limit: 0,
            offset: 0,
            orderBy: null
         })
      })
   })
   await test("throws if current_page less than 1", async () => {
      assert.throws(() => {
         paginate(allUsers, {
            current_page: 0,
            limit: 1,
            offset: 0,
            orderBy: null
         })
      })
   })
   await test("count is 0 if array is empty", async () => {
      const paginatedData = paginate(
      [],
      {
         current_page: 1,
         limit: 10,
         offset: 0,
         orderBy: null
      })
      assert.equal(paginatedData.count, 0)
   })
   await test('count should be 2', async () => {
      const paginatedData = paginate(
      allUsers,
      {
         current_page: 1,
         limit: 2,
         offset: 0,
         orderBy: null
      })
      assert(paginatedData.count === 2)
   })
   await test("can't move back past 1st page, same page is returned", async () => {
      const paginatedData = paginate(
      allUsers,
      {
         current_page: 1,
         limit: 1,
         offset: -1,
         orderBy: null
      })
      assert.strictEqual(paginatedData.page, 1)
      assert.strictEqual(paginatedData.data[0].id, allUsers[0].id)
   })
   await test("can't move further past the last page, same page is returned", async () => {
      const paginatedData = paginate(
      allUsers,
      {
         current_page: 13,
         limit: 1,
         offset: 1,
         orderBy: null
      })
      assert.strictEqual(paginatedData.page, 13)
      assert.strictEqual(paginatedData.data[0].id, allUsers[12].id)
   })

   await test("overflown offset", async (t) => {
      const paginatedData = paginate(
      allUsers,
      {
         current_page: 1,
         limit: 2,
         offset: 10000,
         orderBy: null
      })

      assert.strictEqual(paginatedData.data[0].id, allUsers[12].id)
   })
   describe("page", () => {
      it("calculates first, then applies", async (t) => {
         await t.test("1", () => {
            const paginatedData = paginate(
            allUsers,
            {
               current_page: 11,
               limit: 3,
               offset: -9,
               orderBy: null
            })
            assert.strictEqual(paginatedData.data[0].id, allUsers[3].id)
            assert.strictEqual(paginatedData.data[1].id, allUsers[4].id)
            assert.strictEqual(paginatedData.data[2].id, allUsers[5].id)
         })
         await t.test("2", () => {
            const paginatedData = paginate(
            allUsers,
            {
               current_page: 14,
               limit: 2,
               offset: -7,
               orderBy: null
            })
            assert.strictEqual(paginatedData.data[0].id, allUsers[12].id)
         })
      })
   })
   await test('just has to work as expected', async (t) => {
      await t.test(() => {
         const paginatedData = paginate(
         allUsers,
         {
            current_page: 1,
            limit: 10,
            offset: 1,
            orderBy: null
         })
         assert.strictEqual(paginatedData.page, 2)
         assert.strictEqual(paginatedData.count, 3)
         assert.strictEqual(paginatedData.data[0].id, allUsers[10].id)
         assert.strictEqual(paginatedData.data[1].id, allUsers[11].id)
         assert.strictEqual(paginatedData.data[2].id, allUsers[12].id)
      })
      await t.test(() => {
         const paginatedData = paginate(
         allUsers,
         {
            current_page: 2,
            limit: 4,
            offset: -1,
            orderBy: null
         })
         assert.strictEqual(paginatedData.page, 1)
         assert.strictEqual(paginatedData.count, 4)
         assert.strictEqual(paginatedData.data[0].id, allUsers[0].id)
         assert.strictEqual(paginatedData.data[1].id, allUsers[1].id)
         assert.strictEqual(paginatedData.data[2].id, allUsers[2].id)
         assert.strictEqual(paginatedData.data[3].id, allUsers[3].id)
      })
   })
   await test('total_pages calculation is correct', async (t) => {
      await t.test('with exact division', () => {
         const paginatedData = paginate(
         allUsers,
         {
            current_page: 1,
            limit: 5,
            offset: 0,
            orderBy: null
         })
         assert.strictEqual(paginatedData.total_pages, 3)
      })

      await t.test('with remainder', () => {
         const paginatedData = paginate(
         allUsers,
         {
            current_page: 1,
            limit: 4,
            offset: 0,
            orderBy: null
         })
         assert.strictEqual(paginatedData.total_pages, 4)
      })

      await t.test('with empty array', () => {
         const paginatedData = paginate(
         [],
         {
            current_page: 1,
            limit: 5,
            offset: 0,
            orderBy: null
         })
         assert.strictEqual(paginatedData.total_pages, 0)
      })
   })
})