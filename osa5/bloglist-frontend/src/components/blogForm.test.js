import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './blogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const sendButton = screen.getByText('create')

  await userEvent.type(container.querySelector('#blog-title'), 'new title')
  await userEvent.type(container.querySelector('#blog-author'), 'new author')
  await userEvent.type(container.querySelector('#blog-url'), 'new url')
  await userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('new title')
  expect(createBlog.mock.calls[0][0].author).toBe('new author')
  expect(createBlog.mock.calls[0][0].url).toBe('new url')
  expect(createBlog.mock.calls[0][0].likes).toBe(0)
})