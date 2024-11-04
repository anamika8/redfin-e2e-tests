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

  async getCurrentUrl(previousUrl) {
    await this.waitForUrlChange(previousUrl);
    return await driver.getCurrentUrl();
  }

  async waitForUrlChange(previousUrl, timeout = 10000) {
    await driver.wait(async () => {
        const currentUrl = await driver.getCurrentUrl();
        return currentUrl !== previousUrl;
    }, timeout);
  }
}

module.exports = SearchResultsPage;
