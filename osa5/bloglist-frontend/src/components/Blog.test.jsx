import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'
import {test, expect, vi} from 'vitest' // vscode kept compaining without imports

test('renders only title and author by default', () => {
  const blog = {
    title: 'Title of Test Blog',
    author: 'Test Author',
    url: 'www.testblog.com',
  }
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<Blog user={user} blog={blog} updateBlogs={mockHandler}/>)

  const element = screen.getByText('Title of Test Blog Test Author')

  expect(element).toBeDefined()
})

test('view button shows the extended view for a blog', async () => {
  const blog = {
    title: 'Title of Test Blog',
    author: 'Test Author',
    url: 'www.testblog.com',
  }
  const user = {
    username: 'kayttaja',
    name: 'Maija Meikalainen'
  }

  const updateBlogs = vi.fn()
  const testuser = userEvent.setup()

  render(<Blog user={user} blog={blog} updateBlogs={updateBlogs}/>)

  const button = screen.getByText('view')
  await testuser.click(button)

  //todo
})