const request = require("supertest");

const server = require("../api/server");
const db = require("../data/dbConfig");

describe("GET /api/screenings", () => {
  beforeEach(async () => {
    await db("screening").truncate();
  });

  it("should return 200 when registered", async () => {
    const auth = await request(server)
      .get("/api/screenings")
    //   .send({
    //     username: "Test",
    //     password: "pass"
    //   });

    expect(auth.status).toBe(200);
  });

  it("should return json when registered", async () => {
    const auth = await request(server)
      .get("/api/screenings")
    //   .send({
    //     username: "Test",
    //     password: "pass"
    //   });

    expect(auth.type).toMatch(/json/i);
  });
});

describe("POST /api/screenings", () => {
  it("should return 201 when logged in", async () => {
    await request(server)
      .post("/api/screenings")
      .send({
        
        date: "04/12/2010",
        height: 63.1,
        weight: 26.5,
        child_id: 1
      });

    const auth = await request(server)
      .post("/api/screenings")
      .send({
        
        date: "04/12/2010",
        height: 63.1,
        weight: 26.5,
        child_id: 1
      });

    expect(auth.status).toBe(201);
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
