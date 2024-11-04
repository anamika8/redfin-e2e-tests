const { By, until } = require('selenium-webdriver');
const driver = require('../setup').driver;

class SearchResultsPage {

  constructor() {}

  get searchHeaderTitle() {
    return driver.wait(until.elementLocated(By.className('bp-DesktopSearchHeader__title')), 10000);
  }

  async getSearchResultText() {
    const element = await this.searchHeaderTitle;
    await driver.wait(until.elementIsVisible(element), 20000);
    return element.getText();
  }

  async getCurrentUrl() {
    return await driver.executeScript('return window.location.href');
  }

}

module.exports = SearchResultsPage;
