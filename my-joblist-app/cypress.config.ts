import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{ts,js}',
    setupNodeEvents(on, config) {
      // Add any Node event listeners here if needed
    },
  },
});
