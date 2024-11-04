const { Given, When, Then, setDefaultTimeout, Before } = require('cucumber');
const HomePage = require('../poms/home_page');
const SearchResultsPage = require('../poms/search_results_page');

const homePage = new HomePage();
const searchResultsPage = new SearchResultsPage();
// 60 seconds timeout per step
const MAX_TIMEOUT_PER_STEP = 60 * 1000;
let expect;
let currentUrl = '';
setDefaultTimeout(MAX_TIMEOUT_PER_STEP);

async function getExpect() {
    const chai = await import('chai');
    const { expect } = chai;
    return expect;
}

Before(async function () {
    expect = await getExpect();
});

async function retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) throw error;
            console.warn(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
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

When('User waits {int} seconds for the results to appear', async function (secs) {
    await new Promise(resolve => setTimeout(resolve, secs * 1000));
    console.log(`Waited ${secs} seconds for the result to appear`);
});

Then('Search result page opens with URL containing {string}', async function (expectedSearchText) {
    console.log(`Verifying the result page URL contains - ${expectedSearchText}`);
    const newURL = await retry(async () => {
        return await searchResultsPage.getCurrentUrl(currentUrl, MAX_TIMEOUT_PER_STEP);
    });
    expect(newURL).to.contain(expectedSearchText);
});

Then('Search result text contains {string}', async function (expectedResultText) {
    console.log(`Verifying the correct search result is displayed`);
    const resultText = await retry(async () => {
        return await searchResultsPage.getSearchResultText();
    });
    expect(resultText).to.eq(expectedResultText);
});