import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs }) => {
  const [expandedView, setExpandedView] = useState(false)

  const toggleView = () => {
    setExpandedView(!expandedView)
  }

  const likeBlog = () => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    blogService.update(blog.id, updatedBlog)
      .then(response => {
        updateBlogs()
      })
      .catch(error => {
        console.error('Error liking the blog:', error)
      })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}>{expandedView ? 'hide' : 'view'}</button>
      </div>
      {expandedView && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={likeBlog}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog