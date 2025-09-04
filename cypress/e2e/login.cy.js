/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  // Helper function to perform login
  const login = () => {
    cy.get('#loginButton').should('be.visible').click();
    cy.get('#email').type('faiz@gmail.com');
    cy.get('#password').type('P@ssw0rd');
    cy.get('#loginSubmitButton')
      .contains(/^Login$/)
      .click();
    // Wait for login to complete
    cy.get('#profileDropdown').should('be.visible');
  };

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus ada pada halaman login
    cy.get('#loginButton').should('be.visible').click();
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#loginSubmitButton')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should show login button when login fails with invalid credentials', () => {
    cy.get('#loginButton').should('be.visible').click();

    // Check if email and password inputs are visible after clicking
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    // mengisi username dengan email yang salah
    cy.get('#email').type('error@gmail.com');

    // mengisi password
    cy.get('#password').type('password');

    // menekan tombol Login
    cy.get('#loginSubmitButton')
      .contains(/^Login$/)
      .click();

    // memverifikasi login gagal dan tombol login masih terlihat
    cy.get('#loginButton')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display profile dropdown when logging in with specific user', () => {
    cy.get('#loginButton').should('be.visible').click();
    // mengisi username dengan email yang ditentukan
    cy.get('#email').type('faiz@gmail.com');

    // mengisi password yang ditentukan
    cy.get('#password').type('P@ssw0rd');

    // Wait for the API responses and UI to update by asserting on network requests
    // or by waiting for the profileDropdown to be visible
    // Set up interceptors before clicking the button
    cy.intercept('POST', '**/login').as('loginRequest');
    cy.intercept('GET', '**/users/me').as('getUserRequest');

    // menekan tombol Login
    cy.get('#loginSubmitButton')
      .contains(/^Login$/)
      .click();

    // Wait for the intercepted requests after clicking
    cy.wait('@loginRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 200);;
    cy.wait('@getUserRequest', { timeout: 10000 });
    // memverifikasi bahwa elemen profileDropdown ditampilkan setelah login berhasil
    cy.get('#profileDropdown', { timeout: 10000 }).should('be.visible');
  });

  it('should create a new thread when dummy button is clicked', () => {
    // Wait for the API responses and UI to update by asserting on network requests
    // or by waiting for the profileDropdown to be visible
    cy.intercept('POST', '**/login').as('loginRequest');
    cy.intercept('GET', '**/users/me').as('getUserRequest');
    // Login first
    login();
    // Wait for the API responses and UI to update by asserting on network requests
    // or by waiting for the profileDropdown to be visible
    cy.wait('@loginRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 200);;
    cy.wait('@getUserRequest', { timeout: 10000 });
    // Click the dummy button to show thread creation form
    cy.get('#dummyButtonInput').click();

    // Verify thread creation form elements are visible
    cy.get('#threadTitle').should('be.visible');
    cy.get('#threadFill').should('be.visible');
    cy.get('#threadCategory').should('be.visible');

    // Fill in the thread creation form with dummy text
    cy.get('#threadTitle').type('Test Thread Title');
    cy.get('#threadFill').type('This is the content of my test thread');
    cy.get('#threadCategory').type('testing');

    // Submit the thread by clicking publish button
    cy.get('#threadPublish').click();

    // Verify the thread was published successfully
    cy.contains('Test Thread Title').should('be.visible');
  });

  it('should logout successfully when clicking logout button', () => {
    // Wait for the API responses and UI to update by asserting on network requests
    // or by waiting for the profileDropdown to be visible
    cy.intercept('POST', '**/login').as('loginRequest');
    cy.intercept('GET', '**/users/me').as('getUserRequest');
    // Login first
    login();
    // Wait for the API responses and UI to update by asserting on network requests
    // or by waiting for the profileDropdown to be visible
    cy.wait('@loginRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 200);;
    cy.wait('@getUserRequest', { timeout: 10000 });
    // Verify profile dropdown is visible and click it
    cy.get('#profileDropdown', { timeout: 10000 }).should('be.visible').click();

    // Find and click the logout button in the dropdown
    cy.get('#logoutButton').should('be.visible').click();

    // Verify that after logout, the login button is visible again
    cy.get('#loginButton').should('be.visible');
  });
});
