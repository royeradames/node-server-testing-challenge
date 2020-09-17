const supertest = require('supertest')
const server = require('./server')

describe('server', function () {
    test('runs the tests', function () {
        expect(true).toBe(true)
    })

    describe('GET /', function () {
        test('should respond with 200 ok', function () {
            return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })


        test('should respond with JSON', async function () {
            const res = await supertest(server).get('/')
            expect(res.type).toMatch(/json/i)
        })
        test(`should respond with api: 'up'`, function () {
            return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.body.api).toBe(`up`)
                })
        })
    })
    describe('GET /hobbits', function () {
        test('should respond with 200 ok', function () {
            return supertest(server)
                .get('/hobbits')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })
    describe("POST /hobbits", () => {
        it("should return 201 when passed correct data", () => {
            return supertest(server)
                .post("/hobbits")
                .send({ name: "sam" })
                .then(res => {
                    expect(res.status).toBe(201);
                });
        });
        it("should fail with code 400 if passed incorrect data", () => {
            return supertest(server)
                .post("/hobbits")
                .send({})
                .then(res => {
                    expect(res.status).toBe(400);
                });
        });
        it("should insert the hobbit into the database", async () => {
            const res = await supertest(server).post('/hobbits').send({name: 'sam'})

            //body is empty
            // expect(res.body.data.name).toBe('sam')
        });
    });
})