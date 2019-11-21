const request = require("supertest");

const server = require("../api/server");
const db = require("../data/dbConfig");

describe("POST /api/children ", () => {
  beforeEach(async () => {
    await db("children").truncate();
  });

  it("should return 201 when registered", async () => {
    const immundatabase= await request(server)
      .get("/api/children ")
      .send({
        username: "Test",
        password: "pass"
      });

    expect(auth.status).toBe(200);
  });

  it("should return json when registered", async () => {
    const immundatabase = await request(server)
      .post("/api/children ")
    
    expect(auth.type).toMatch(/json/i);
  });
});

describe("POST /api/auth/login", () => {
  it("should return 200 when logged in", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({
        username: "Test",
        password: "pass"
      });

    const auth = await request(server)
      .post("/api/auth/login")
      .send({
        username: "Test",
        password: "pass"
      });

    expect(auth.status).toBe(200);
  });

  it("should return json when logged in", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({
        username: "Test",
        password: "pass"
      });

    const auth = await request(server)
      .post("/api/auth/login")
      .send({
        username: "Test",
        password: "pass"
      });

    expect(auth.type).toMatch(/json/i);
  });
});

