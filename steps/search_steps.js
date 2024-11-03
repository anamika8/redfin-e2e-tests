const { Given, When, Then } = require('cucumber');
const HomePage = require('../poms/home_page');
const SearchResultsPage = require('../poms/search_results_page');

const homePage = new HomePage();
const searchResultsPage = new SearchResultsPage();

async function getExpect() {
    const chai = await import('chai');
    const { expect } = chai;
    return expect;
}

Given('User navigates to {string}', async function (url) {
    await homePage.navigateToHomePage(url);
});

When('User types {string} in the search field', async function (cityName) {
    await homePage.enterCity(cityName);
});

When('User submits the search', async function () {
    await homePage.submit();
});

When('User selects the first option from the dropdown', async function () {
    await homePage.selectNthSearchOption(1);
});

Then('Search result page opens with URL containing {string}', { timeout: 20000 }, async function (expectedSearchText) {
    const currentUrl = await searchResultsPage.getCurrentUrl();
    const expect = await getExpect();
    expect(currentUrl).to.contain(expectedSearchText);
});

Then('Search result text contains {string}', { timeout: 20000 }, async function (expectedResultText) {
  const resultText = await searchResultsPage.getSearchResultText();
  const expect = await getExpect();
  expect(resultText).to.eq(expectedResultText);
});