import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders short blog content', () => {
    
    //Arrange
    const blog = {
        user: "some user",
        likes: 313,
        author: "some author",
        title: 'some title',
        url: "some url"
    }

    //Act
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')
    
    //Assert
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes)
})

test('renders long blog content', async () => {

    //Arrange
    const blog = {
        user: "some user",
        likes: 2,
        author: "some author",
        title: 'some title',
        url: "some url"
    }

    //Act
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')
    const user = userEvent.setup()
    const button = screen.getByTestId('infoButton')
    await user.click(button)

    //Assert
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent('some url')
    expect(div).toHaveTextContent(2)
})

test('pressing like twice', async () => {

    //Arrange
    const blog = {
        user: "some user",
        likes: 2,
        author: "some author",
        title: 'some title',
        url: "some url"
    }
    
    const mockUpdate = jest.fn()

    //Act
    render(<Blog blog={blog} updateBlog={mockUpdate}/>)
    const user = userEvent.setup()
    const infoButton = screen.getByTestId('infoButton')
    await user.click(infoButton)

    const likeButton = screen.getByTestId('likeButton')
    await user.click(likeButton)
    await user.click(likeButton)

    //Assert
    expect(mockUpdate.mock.calls).toHaveLength(2)
})