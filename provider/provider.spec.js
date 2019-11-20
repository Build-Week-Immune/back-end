const db = require("../data/dbConfig");

const { add } = require("./provider-model");

describe("hobbits model", function() {
  describe("add()", function() {
    beforeEach(async () => {
      await db("immundatabase").truncate();
    });

    it("should insert a immundatabase", async function() {
      // insert a hobbit into the db
      await add({ ProviderName: "sam" });

      // check if it was inserted into the db
      const hobbits = await db("immundatabase"); // read from db directly
      expect(hobbits).toHaveLength(1); // at least we know one record was inserted
    });

    it("should insert the provided hobbit", async function() {
      await insert({ ProviderName: "sam" });
      await insert({ ProviderName: "gaffer" });

      const hobbits = await db("immundatabase"); // read from db directly

      expect(immundatabase).toHaveLength(2); // both records are there
      expect(immundatabase[0].name).toBe("sam"); // the first record is sam
      expect(immundatabase[1].name).toBe("gaffer"); // the second record is gaffer
    });

    it("should return the inserted hobbit", async function() {
      let hobbit = await insert({ name: "sam" });
      expect(hobbit.name).toBe("sam");
      expect(hobbit.id).toBeDefined(); // now I know it's coming from the db

      hobbit = await insert({ name: "gaffer" });
      expect(hobbit.name).toBe("gaffer");
      expect(hobbit.id).toBeDefined();
    });
  });
});
