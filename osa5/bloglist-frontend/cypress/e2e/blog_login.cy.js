describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')
    cy.createUser({ name: 'Cy User', username: 'cy-user', password: 'cy-password', })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('fails with incorrect credentials', function () {
      cy.get('#username').type('cy-user')
      cy.get('#password').type('cy-password-2')
      cy.get('button#login').click()

      cy.get('.error').contains('wrong credentials')
      cy.contains('Login')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cy-user')
      cy.get('#password').type('cy-password')
      cy.get('button#login').click()

      cy.contains('login success')
      cy.contains('Log out')
    })
  })

  describe('Logout', function () {
    beforeEach(function () {
      cy.login({ username: 'cy-user', password: 'cy-password' })
    })

    it('logged in user can log out', function () {
      cy.get('button#logout').click()

      cy.contains('user logged out')
      cy.contains('Login')
    })
  })
})