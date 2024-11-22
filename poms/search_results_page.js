const { By, until } = require('selenium-webdriver');
const driver = require('../setup').driver;

class SearchResultsPage {

  constructor() {}

  get searchHeaderTitle() {
    return driver.wait(until.elementLocated(By.className('bp-DesktopSearchHeader__title')), 10000);
  }

  get accordionCheckboxes() {
    return driver.wait(until.elementsLocated(By.css('input.Checkbox__input[type="checkbox"]')), 10000);
  }

  get bedBathCells() {
    return driver.wait(until.elementsLocated(By.css('div[role="cell"]')), 10000);
  }

  get doneButton() {
    return driver.wait(until.elementLocated(By.css('.ExposedSearchFilter__doneBtn')), 20000);
  }

  get forSaleFilter() {
    const filterXPath = `//p[contains(@class, 'RichSelect__value') and text()='For sale']`;
    return driver.wait(until.elementLocated(By.xpath(filterXPath)), 10000);
  }

  get priceFilter() {
    const filterXPath = `//p[contains(@class, 'RichSelect__value') and text()='Price']`;
    return driver.wait(until.elementLocated(By.xpath(filterXPath)), 10000);
  }

  get bedBathFilter() {
    const filterXPath = `//p[contains(@class, 'RichSelect__value') and text()='Beds/baths']`;
    return driver.wait(until.elementLocated(By.xpath(filterXPath)), 10000);
  }

  get homeTypeFilter() {
    const filterXpath = `//p[contains(@class, 'RichSelect__value') and text()='Home type']`;
    return driver.wait(until.elementLocated(By.xpath(filterXpath), 1000))
  }

  get minPriceField() {
    return driver.wait(until.elementLocated(By.css('input[placeholder="Enter min"]'), 10000));
  }

  get maxPriceField() {
    return driver.wait(until.elementLocated(By.css('input[placeholder="Enter max"]'), 10000));
  }

  get homePriceValues() {
    return driver.wait(until.elementsLocated(By.css('.bp-Homecard__Price--value'), 10000));
  }

  get bedCounts() {
    return driver.wait(until.elementsLocated(By.css('.bp-Homecard__Stats--beds'), 10000));
  }

  get bathCounts() {
    return driver.wait(until.elementsLocated(By.css('.bp-Homecard__Stats--baths'), 10000));
  }

  get homeType(){    
    return driver.wait(until.elementsLocated(By.css('.PropertyTypes__items'), 10000));
  }

  get homeTypeSelected() {
    return driver.wait(until.elementLocated(By.css('.ExposedPropertyTypeFilterContainer .ExposedPropertyTypeFilter .RichSelect__value.text-ellipsis')))
        .then(element => element.getText());  
}

  async getSearchResultText() {
    const element = await this.searchHeaderTitle;
    await driver.wait(until.elementIsVisible(element), 20000);
    return element.getText();
  }

  async getCurrentUrl() {
    return await driver.executeScript('return window.location.href');
  }

  async openForSaleFilter() {
    const element = await this.forSaleFilter;
    await element.click();
  }

  async openPriceFilter() {
    const element = await this.priceFilter;
    await element.click();
  }

  async openBedBathFilter() {
    const element = await this.bedBathFilter;
    await element.click();
  }

  async openhomeTypeFilter() {
    const element = await this.homeTypeFilter;
    await element.click();
  }

  async clickDoneButton() {
    const btn = await this.doneButton;
    await btn.click();
  }

  async enterMinPrice(price) {
    const element = await this.minPriceField;
    await element.sendKeys(price);
  }

  async enterMaxPrice(price) {
    const element = await this.maxPriceField;
    await element.sendKeys(price);
  }

  async selectBedBathOption(optionName) {
    const cells = await this.bedBathCells;
    for (let cell of cells) {
      const cellValue = await cell.getAttribute('data-text');
      if(cellValue === optionName.toLowerCase()){
        await cell.click();
        break;
      }
    }
  }

  async selectCheckbox(filterName) {
    const checkboxes = await this.accordionCheckboxes;
    for (let checkbox of checkboxes) {
      const attributeValue = await checkbox.getAttribute('name');
      if(attributeValue === filterName.toLowerCase()){
        const isChecked = await checkbox.isSelected();
        if (!isChecked) {
            await checkbox.click();
        }
      } else {
        const isChecked = await checkbox.isSelected();
        if (isChecked) {
            await checkbox.click();
        }
      }
    }
  }

  async getNthHomePriceValue(n) {
    const elements = await this.homePriceValues;
    if (elements.length > 0) {
      const priceString = await elements[n-1].getText();
      const priceNumber = Number(priceString.replace(/[$,]/g, ''));
      return priceNumber;
    }
    console.log("No elements found with the specified class.");
    return -1;
  }

  async getNthHomeBedCount(n) {
    const elements = await this.bedCounts;
    if (elements.length > 0) {
      const bedsString = await elements[n-1].getText();
      return Number(bedsString.split(' ')[0]);
    }
    console.log("No elements found with the specified class.");
    return -1;
  }

  async getNthHomeBathCount(n) {
    const elements = await this.bathCounts;
    if (elements.length > 0) {
      const bathString = await elements[n-1].getText();
      return Number(bathString.split(' ')[0]);
    }
    console.log("No elements found with the specified class.");
    return -1;
  }

  async selectHomeType(homeTypeName) {
    const propertyTypeOptions = await this.homeType;  
    if (propertyTypeOptions.length > 0) {
        for (let option of propertyTypeOptions) {
            const label = await option.findElement(By.css('.Label--text'));
            const labelText = await label.getText();
            if (labelText.toLowerCase() === homeTypeName.toLowerCase()) { 
                option.click();
                return;
            }
        }
        console.log("No property type options found.");
        return -1;  
    } 
}


}

module.exports = SearchResultsPage;
