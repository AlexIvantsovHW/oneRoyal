const request = require("supertest");
const { app } = require("../../app");
import { Server } from "http";
let server: Server;

describe("User API", () => {
  beforeAll(() => {
    server = app.listen(6000);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("GET /users - should return a list of users", async () => {
    const response = await request(app).get("/users/");
    expect(response.status).toBe(201);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        email: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
      })
    );
  });
  test("POST /users - should not create a user with existing email", async () => {
    const existingUser = {
      email: "test.user@example.com",
      password: "Test@1234",
      username: "testUser",
    };

    const response = await request(app).post("/users/").send(existingUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toMatch(
      /User testUser was successfully created!/
    );
  });
});
