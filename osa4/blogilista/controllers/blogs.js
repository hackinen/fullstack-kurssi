const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (blog.title === undefined || blog.url === undefined) {
      response.status(400).json()
    } else {
      blog.likes = blog.likes === undefined
        ? 0
        : blog.likes

      const result = await blog.save()
      response.status(201).json(result)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    response.json(updatedBlog)


    await Blog.findByIdAndUpdate
})

module.exports = blogsRouter