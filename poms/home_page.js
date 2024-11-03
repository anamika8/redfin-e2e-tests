const { By } = require('selenium-webdriver');
const driver = require('../setup').driver;

class HomePage {

  constructor() {
    this.searchField = driver.findElement(By.css('[class="search-input-box"]'));
    this.searchButton = driver.findElement(By.css('[class="SearchButton"]'));
  }

  async navigateToHomePage(url) {
    await driver.get(url);
  }

  async enterCity(cityName) {
    await this.searchField.sendKeys(username);
  }

  async submit() {
    await this.searchButton.click();
  }
}

module.exports = HomePage;
