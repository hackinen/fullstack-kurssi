import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BLogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  // list of all blogs
  const [blogs, setBlogs] = useState([])



  //notifications/errors
  const [notification, setNotification] = useState(null)
  const [messageType, setmessageType] = useState("notification")

  //login info
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


  //EFFECT HOOKS
  
  // get blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // get possible logged user info during page refresh
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  
  // when pressing submit button, add new blog
  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          console.log(returnedBlog)
          setBlogs(blogs.concat(returnedBlog))
          showNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added.`, 'notification')
        })
  }


  const showNotification = (message, type) => {
    setmessageType(type)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    // login with loginservice
    loginService.login({ username, password }).then(user =>{
      // save token to browser local storage
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      // save token to blogService
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    })
    .catch(exception => {
      console.log(exception)
      showNotification('wrong username or password', 'error')
    })
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
  }





  // Apufunktiot
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )





  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} messageType={messageType} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} messageType={messageType} />
      <div>
        {user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='new note'>
        <BLogForm createBlog={addBlog} />
      </Togglable>     
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App