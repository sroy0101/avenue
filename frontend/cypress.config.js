const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // baseUrl: "https://localhost:3000",
  testUserName: 'product_manager',
  testuserPassword: 'pypy!1234',
});
