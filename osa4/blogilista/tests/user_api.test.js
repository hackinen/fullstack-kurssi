const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

const validUser = {
    username: 'meikalainen',
    name: 'Matti Meikalainen',
    password: 'matti1980'
}

const userWithShortUsername = {
    username: 'a',
    name: 'Anna-Leena',
    password: 'salasana'
}

const userWithNoUsername = {
    name: 'Anna-Leena',
    password: 'salasana'
}

const userWithNoPassword = {
    username: 'annaleena',
    name: 'Anna-Leena'
}

const userWithShortPassword = {
    username: 'annaleena',
    name: 'Anna-Leena',
    password: 's'
}

describe('Creating a user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('User is created with valid username and password', async () => {
        await api
            .post('/api/users')
            .send(validUser)

        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(1)
        expect(response.body[0].name).toContain(validUser.name)
        expect(response.body[0].username).toContain(validUser.username)
    })

    test('User is not created if username too short', async () => {
        let response = await api
            .post('/api/users')
            .send(userWithShortUsername)
            .expect(400)
        
        expect(response.body.error).toContain('invalid username')

        response = await api.get('/api/users')
        expect(response.body).toHaveLength(0)
    })

    test('User is not created if username does not exist', async () => {
        let response = await api
            .post('/api/users')
            .send(userWithNoUsername)
            .expect(400)
        
        expect(response.body.error).toContain('invalid username')

        response = await api.get('/api/users')
        expect(response.body).toHaveLength(0)
    })

    test('User is not created if password does not exist', async () => {
        let response = await api
            .post('/api/users')
            .send(userWithNoPassword)
            .expect(400)
        
        expect(response.body.error).toContain('invalid password')

        response = await api.get('/api/users')
        expect(response.body).toHaveLength(0)
    })

    test('User is not created if password is too short', async () => {
        let response = await api
            .post('/api/users')
            .send(userWithShortPassword)
            .expect(400)
        
        expect(response.body.error).toContain('invalid password')

        response = await api.get('/api/users')
        expect(response.body).toHaveLength(0)
    })
})

afterAll(() => {
    mongoose.connection.close()
})