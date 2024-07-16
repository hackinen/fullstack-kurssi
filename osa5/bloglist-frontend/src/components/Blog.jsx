import { useState, useEffect } from 'react'

const Blog = ({ blog }) => {
  const [expandedView, setExpandedView] = useState(false)

  const toggleView = () => {
    setExpandedView(!expandedView);
  };

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
            <button>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog