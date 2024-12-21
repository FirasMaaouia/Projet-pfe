const request = require("supertest");
const express = require("express");
const authRoutes = require("../../routes/authRoutes");
const auth = require("../../middleware/auth");

const app = express();
app.use(express.json());
app.use(authRoutes);

// Mock the auth middleware to bypass actual token validation
jest.mock("../../middleware/auth", () => jest.fn((req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader === "Bearer validtoken") {
    return next();
  }
  res.status(401).send({ message: "Authentication failed!" });
}));

describe("Integration Tests for Auth Routes", () => {
  test("GET /test - valid auth token", async () => {
    const response = await request(app)
      .get("/test")
      .set("Authorization", "Bearer validtoken");

    expect(response.status).toBe(200);
    expect(response.text).toBe("request passed");
  });

  test("GET /test - no auth token", async () => {
    const response = await request(app).get("/test");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Authentication failed!");
  });
});
