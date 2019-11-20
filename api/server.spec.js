const request = require("supertest");

const server = require("./server");

it("should set db environment to testing", function() {
  expect(process.env.DB_ENV).toBe("testing");
});

describe("server", function() {
  describe("GET /", function() {
    it("should return 200 OK", function() {
      // run the server
      // make a GET request to /
      // see that the http code of response is 200
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return JSON formatted response", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should return an 'api' property with the value 'Hello world from build-immunization-tracking Back End!' inside the body", function() {
      return request(server)
        .get("/")
        .then(res => {
          // expect(res.body).toEqual({ api: "up" });
          expect(res.body.api).toBe(
            "Hello world from build-immunization-tracking Back End!"
          );
        });
    });
  });
});
