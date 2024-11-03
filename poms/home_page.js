const { By, until } = require('selenium-webdriver');
const driver = require('../setup').driver;

class HomePage {

  constructor() {}

  get searchField() {
    // give the element 5 seconds to load
    return driver.wait(until.elementLocated(By.css('[class="search-input-box"]')), 5000);
  }

  get searchForm() {
    // give the form 10 seconds to load
    return driver.wait(until.elementLocated(By.css('[class="SearchBoxForm"]')), 10000);
  }

  async navigateToHomePage(url) {
    await driver.get(url);
  }

  async enterCity(cityName) {
    const element = await driver.wait(until.elementIsEnabled(this.searchField), 10000);
    await element.sendKeys(cityName);
  }

  async submit() {
    await this.searchForm.submit();
  }
}

module.exports = HomePage;
