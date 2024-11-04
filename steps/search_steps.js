const { Given, When, Then } = require('cucumber');
const HomePage = require('../poms/home_page');
const SearchResultsPage = require('../poms/search_results_page');

const homePage = new HomePage();
const searchResultsPage = new SearchResultsPage();
let currentUrl = '';

async function getExpect() {
    const chai = await import('chai');
    const { expect } = chai;
    return expect;
}

Given('User navigates to {string}', async function (url) {
    console.log(`Opening the home page - ${url}`);
    await homePage.navigateToHomePage(url);
    currentUrl = url;
});

When('User types {string} in the search field', async function (cityName) {
    console.log(`Entering the search city - ${cityName}`);
    await homePage.enterCity(cityName);
});

When('User submits the search', async function () {
    console.log(`Submitting search`)
    await homePage.submit();
});

Then('Search result page opens with URL containing {string}', { timeout: 20000 }, async function (expectedSearchText) {
    console.log(`Verifying the result page URL contains - ${expectedSearchText}`);
    const newURL = await searchResultsPage.getCurrentUrl(currentUrl);
    const expect = await getExpect();
    expect(newURL).to.contain(expectedSearchText);
});

Then('Search result text contains {string}', { timeout: 20000 }, async function (expectedResultText) {
    console.log(`Verifying the correct search result is displayed`);
    const resultText = await searchResultsPage.getSearchResultText();
    const expect = await getExpect();
    expect(resultText).to.eq(expectedResultText);
});