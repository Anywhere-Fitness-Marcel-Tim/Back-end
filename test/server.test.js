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
        expect(res.body.id).toBeTruthy();
        expect(res.body.password).toBeTruthy();
    });
});

// describe("PUT /api/users/1", () => {
//     it("updates user", async () => {
//         const res = await request(server)
//             .post("/api/auth/register")
//             .send({ username: "fdudkin", password: "password :)" });
//         expect(res.status).toBe(201);
//         expect(res.body).toMatchObject({
//             username: "fdudkin",
//         });
//         expect(res.body.id).toBeTruthy();
//         expect(res.body.password).toBeTruthy();
//     });
// });
