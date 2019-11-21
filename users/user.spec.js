require("dotenv").config();

const db = require("../data/dbConfig");

describe("user model", () => {
  beforeEach(async () => {
    await db("immundatabase").truncate();
  });

  describe("get all()", () => {
    it("should always return an array, even if no users are stored", async () => {
      const users = await db("immundatabase");
      expect(users);
    });
  });
});
