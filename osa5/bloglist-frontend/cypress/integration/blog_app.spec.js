const user = {
    name: 'Matti Meikäläinen',
    username: 'admin',
    password: 'user'
}

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

  Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: {title: title, author: author, url: url, likes: likes} ,
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
      }
    })
  
    cy.visit('http://localhost:3000')
  })


describe('Blog front page', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', user) 

        cy.visit('http://localhost:3000')  
    })


    it('front page can be opened', function() {
      cy.contains('log in to application')
    })

    it('user can login', function () {
        cy.get('#username').type(user.username)
        cy.get('#password').type(user.password)
        cy.get('#login-button').click()
        cy.contains(`${user.name} logged in`)
      })

      it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type(user.username)
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
    
        cy.get('.error')
            .should('contain', 'wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', `${user.name} logged in`)
      })
})

describe('When logged in', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.login({ username: user.username, password: user.password })
    })

    it('a new blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#blog-title').type('a blog created by cypress')
        cy.get('#blog-author').type('author cypress')
        cy.get('#blog-url').type('url cypress')
        cy.get('#create-blog-button').click()

        cy.contains('a blog created by cypress')
        cy.contains('author cypress')
    })

    it('existing blog is visible', function() {
        const blog = {
            title : 'default title',
            author : 'default author',
            url : 'default url'
        }
        cy.createBlog(blog)
        cy.contains('default title')
        cy.contains('default author')
    })

    it('blog can be liked', function() {
        const blog = {
            title : 'default title',
            author : 'default author',
            url : 'default url',
            likes: 0
        }
        cy.createBlog(blog)

        cy.get('#infoButton').click()
        cy.contains('default url')
        cy.contains('likes 0')
        cy.get('#likeButton').click()
        cy.contains('likes 1')
    })

    it('blog can be deleted', function() {
        const blog = {
            title : 'default title',
            author : 'default author',
            url : 'default url',
            likes: 0
        }
        cy.createBlog(blog)

        cy.get('#infoButton').click()
        cy.get('#removeButton').click()
        cy.get('html').should('not.contain', `default title`)
    })

    it.only('blogs are ordered by likes', function() {
        const blog1 = {
            title : 'least likes',
            author : 'default author',
            url : 'default url',
            likes: 1
        }
        const blog2 = {
            title : 'most likes',
            author : 'default author',
            url : 'default url',
            likes: 4
        }
        const blog3 = {
            title : 'middle likes',
            author : 'default author',
            url : 'default url',
            likes: 3
        }
        cy.createBlog(blog1)
        cy.createBlog(blog2)
        cy.createBlog(blog3)

        cy.get('.blog').eq(0).should('contain', 'most likes')
        cy.get('.blog').eq(1).should('contain', 'middle likes')
        cy.get('.blog').eq(2).should('contain', 'least likes')
    })
})

  