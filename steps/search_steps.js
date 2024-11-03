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

When('User clicks on the Search button', async function () {
    await homePage.submit();
});

Then('Search result page opens with URL containing {string}', async function (expectedSearchText) {
    const currentUrl = await searchResultsPage.getCurrentUrl();
    getExpect(currentUrl).to.contain(expectedSearchText);
});

Then('Search result text contains {string}', async function (expectedResultText) {
  const resultText = await searchResultsPage.getSearchResultText();
  getExpect(resultText).to.eq(expectedResultText);
});
