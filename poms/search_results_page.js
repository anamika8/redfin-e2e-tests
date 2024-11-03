const { By } = require('selenium-webdriver');
const driver = require('../setup').driver;

class SearchResultsPage {

  constructor() {
    this.searchHeaderTitle = driver.findElement(By.css('[data-rf-test-id="h1-header"]'));
  }

  async getSearchResultText() {
    await this.searchHeaderTitle.getText();
  }

  async getCurrentUrl() {
    return await driver.getCurrentUrl();
  }
}

module.exports = SearchResultsPage;
