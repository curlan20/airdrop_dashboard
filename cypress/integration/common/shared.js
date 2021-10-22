import { Before } from 'cypress-cucumber-preprocessor/steps';

Before({ tags: "@mobile" }, () => {
  cy.viewport('iphone-6');
});

Before({ tags: "@desktop" }, () => {
  cy.viewport(1280, 1060);
});
