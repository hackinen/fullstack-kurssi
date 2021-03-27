const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        title: 'blogi',
        author: 'maija meikalainen',
        url: 'www.blogi.fi',
        likes: 4
    },
    {
        title: 'toinen blogi',
        author: 'matti meikalainen',
        url: 'www.blogi2.fi',
        likes: 1
    },
]

const newBlog =
    {
        title: 'mun oma blogi',
        author: 'bloggaaja',
        url: 'www.jeemunblogi.fi',
        likes: 60000
    }

const blogWithNoInitialLikes =
    {
        title: 'nollan tykkäyksen blogi',
        author: 'bloggaaja',
        url: 'www.givemelikes.fi',
    }

const blogWithNoTitle = 
    {
        author: 'matti',
        url: 'www.eiotsikkoa.fi',
        likes: 12
    }

const firstBlogButMoreLikes =
    {
        title: 'blogi',
        author: 'maija meikalainen',
        url: 'www.blogi.fi',
        likes: 5
    }
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})


test('Blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('blog has a field named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('when a new blog is added the number of blogs increases by one', async () => {
    await api
        .post('/api/blogs')
        .send(newBlog)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
})

test('the added blog has the right contents', async () => {
    await api
        .post('/api/blogs')
        .send(newBlog)

    const response = await api.get('/api/blogs')
    expect(response.body[2].title).toContain('mun oma blogi')
})

test('field like has a default value of 0', async () => {
    await api
        .post('/api/blogs')
        .send(blogWithNoInitialLikes)

    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toBe(0)
})

test('new blog has to contain both title and url', async () => {
    await api
        .post('/api/blogs')
        .send(blogWithNoTitle)
        .expect(400)
})

test('deleted blog decreases the number of blogs by one', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)
})

test('updating likes works', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    await api
        .put(`/api/blogs/${id}`)
        .send(firstBlogButMoreLikes)
        .expect(200)
    
    const newResponse = await api.get('/api/blogs')
    expect(newResponse.body[0].likes).toBe(5)
})

afterAll(() => {
    mongoose.connection.close()
})