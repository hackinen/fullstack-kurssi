const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
     return (blogs.map((blog) => blog.likes).reduce((sum, thisOne) => {
        return sum + thisOne
    }, 0))
}

module.exports = {
    dummy,
    totalLikes
}