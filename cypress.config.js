import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
//    baseUrl:"http://localhost:5173/",  bunu yazdıktan sonra cy.visit içine /'yi yazmak yeterli olur.
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
