const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");

const userPupkin = {
    username: "vpupkin",
    password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
    role_id: 1
};

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db("users").truncate();
    await db("roles").truncate();

    await db("roles").insert({role_name: "user"});
    await db("roles").insert({role_name: "trainer"});
    await db("roles").insert({role_name: "admin"});
    await db("users").insert(userPupkin);
});

afterAll(async () => {
    await db.destroy();
});

describe("GET /api/users/1", () => {
    it("returns user object", async () => {
        const res = await request(server).get("/api/users/1");
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            username: "vpupkin",
            role_name: "user",
        });
    });
});

describe("PUT /api/users/1", () => {
    it("updates user", async () => {
        const res = await request(server)
            .put("/api/users/1")
            .send({ username: "fdudkin", password: "password :)", role_name: "trainer" });
        expect(res.body).toMatchObject({
            username: "fdudkin",
            role_name: "trainer"
        });
    });

    it("works with GET", async () => {
        const user = await request(server).get("/api/users/1");
        user.body.role_name = "trainer"
        const res = await request(server).put("/api/users/1").send(user.body);
        expect(res.body).toMatchObject({
            username: "vpupkin",
            role_name: "trainer"
        });
    });
});
