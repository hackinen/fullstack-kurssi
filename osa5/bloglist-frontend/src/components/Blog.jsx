import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, updateBlogs }) => {
  const [expandedView, setExpandedView] = useState(false)

  const toggleView = () => {
    setExpandedView(!expandedView)
  }

  const likeBlog = () => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    blogService.update(blog.id, updatedBlog)
      .then(() => {
        updateBlogs()
      })
      .catch(error => {
        console.error('Error liking the blog:', error)
      })
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.deleteBlog(blog.id)
        .then(() => {
          updateBlogs()
        })
        .catch(error => {
          console.error('Error deleting the blog:', error)
        })
    }
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
          {user && user.username === blog.user.username && (
            <button
              onClick={deleteBlog}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.PropTypes = {
  updateBlogs: PropTypes.func.isRequired,
}

export default Blog