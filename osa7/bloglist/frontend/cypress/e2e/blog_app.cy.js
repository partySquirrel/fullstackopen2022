describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')
    cy.createUser({
      username: 'cy-user',
      password: 'cy-password',
      name: 'Cy User',
    })
    cy.login({ username: 'cy-user', password: 'cy-password' })
  })

  describe('When logged in', function () {
    it('A new blog can be created', function () {
      cy.contains('Add new blog').click()
      cy.get('input[name=author]').type('cy-author')
      cy.get('input[name=title]').type('cy-title')
      cy.get('input[name=url]').type('http://example.com/cy-url')
      cy.contains('Create').click()
      cy.contains('cy-title by cy-author')
    })

    describe('And a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'another author cypress',
          title: 'another title cypress',
          url: 'http://example.com/cy-url',
        })
      })

      it('it can be viewed', function () {
        cy.contains('another author cypress').contains('View').click()

        cy.contains('another author cypress')
          .parent()
          .should('contain', 'http://example.com/cy-url')
          .should('contain', 'Likes: 0')
      })

      it('it can be liked', function () {
        cy.contains('another author cypress').contains('View').click()

        cy.contains('another author cypress')
          .parent()
          .find('button[name=like]')
          .click()

        cy.contains('another author cypress')
          .parent()
          .should('contain', 'Likes: 1')
      })

      it('it can be removed', function () {
        cy.contains('another author cypress').contains('View').click()

        cy.contains('another author cypress')
          .parent()
          .find('button[name=remove]')
          .click()

        cy.get('html').should('not.contain', 'another author cypress')
      })
    })

    describe('And multiple blogs exist', function () {
      function likeBlog(name, times) {
        cy.contains(name).parent().find('button[name=like]').as('likeButton')
        for (let i = 1; i < times + 1; i++) {
          cy.get('@likeButton').click()
          cy.contains(name).parent().should('contain', `Likes: ${i}`)
        }
      }

      beforeEach(function () {
        cy.createBlog({
          author: 'ranked top',
          title: 'title',
          url: 'http://example.com/cy-url',
        })
        cy.createBlog({
          author: 'ranked bottom',
          title: 'title',
          url: 'http://example.com/cy-url',
        })
        cy.createBlog({
          author: 'ranked middle',
          title: 'title',
          url: 'http://example.com/cy-url',
        })

        cy.contains('ranked top').contains('View').click()
        cy.contains('ranked middle').contains('View').click()
        cy.contains('ranked bottom').contains('View').click()

        likeBlog('ranked middle', 1)
        likeBlog('ranked top', 2)
      })

      it('blogs are sorted by likes', function () {
        cy.get('.blogItem')
          .eq(0)
          .should('contain', 'ranked top')
          .should('contain', 'Likes: 2')
        cy.get('.blogItem')
          .eq(1)
          .should('contain', 'ranked middle')
          .should('contain', 'Likes: 1')
        cy.get('.blogItem')
          .eq(2)
          .should('contain', 'ranked bottom')
          .should('contain', 'Likes: 0')
      })
    })
  })
})
