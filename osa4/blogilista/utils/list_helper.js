
const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return (blogs.map((blog) => blog.likes).reduce((sum, thisOne) => {
        return sum + thisOne
    }, 0))
}

const favoriteBlog = (blogs) => {
    const fave = blogs.reduce((mostLikes, blog) => {
        if (blog.likes >= mostLikes.likes) {
            return blog
        } else {
            return mostLikes
        }
    })

    return (
        {
            title: fave.title,
            author: fave.author,
            likes: fave.likes
        }
    )
}

const mostBlogs = (blogs) => {
    authors = lodash.countBy(blogs, (blog => blog.author))

    let formatted = []

    for (const [key,value] of Object.entries(authors)) {
        formatted.push({
            author: key,
            blogs: value
        })
    }

    return (
        formatted.reduce((currentMost, blogger) => {
            if (blogger.blogs >= currentMost.blogs) {
                return blogger
            } else {
                return currentMost
            }
        })
    )
}

const mostLikes = (blogs) => {
    const authors = lodash.groupBy(blogs, (blog => blog.author))

    let formatted = []

    for (const [key,value] of Object.entries(authors)) {
        const likes = value.map(blog => blog.likes).reduce((sum, current) => sum + current)

        formatted.push({
            author: key,
            likes: likes
        })
    }

    return (
        formatted.reduce((currentMost, blogger) => {
            if (blogger.likes >= currentMost.likes) {
                return blogger
            } else {
                return currentMost
            }
        })
    )
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}