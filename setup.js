const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');


const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(chromeOptions)
  .build();

module.exports = { driver };