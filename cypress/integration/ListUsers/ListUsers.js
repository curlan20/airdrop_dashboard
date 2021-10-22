import { Given, Before, When, And, Then } from 'cypress-cucumber-preprocessor/steps';

Before( () => {
  cy.viewport(1280, 1060);
});

Given('I am on the main page', () => {
  cy.visit('/')
});

Then('I should see all users', (term) => {
  cy.contains('User List')
  cy.get('.ant-table-row-level-0').should('have.length', 1)
});
