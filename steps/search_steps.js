const { Given, When, Then, setDefaultTimeout, Before } = require('cucumber');
const HomePage = require('../poms/home_page');
const SearchResultsPage = require('../poms/search_results_page');
const driver = require('../setup').driver;

const homePage = new HomePage();
const searchResultsPage = new SearchResultsPage();
// 60 seconds timeout per step
const MAX_TIMEOUT_PER_STEP = 90 * 1000;
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

When('User clicks on the `For Sale` filter', async function () {
    console.log(`User clicks on the 'For Sale' filter`);
    await searchResultsPage.openForSaleFilter();
});

When('User clicks on the `Price` filter', async function () {
    console.log(`User clicks on the 'Price' filter`);
    await searchResultsPage.openPriceFilter();
});

When('User clicks on the `Bed-bath` filter', async function () {
    console.log(`User clicks on the 'Bed/bath' filter`);
    await searchResultsPage.openBedBathFilter();
});

When('User selects {string} under the `For Sale` filter', async function (filterName) {
    console.log(`User selecting ${filterName} as a filter`);
    await searchResultsPage.selectCheckbox(filterName);
    await searchResultsPage.clickDoneButton();
});

When('User enters {string} and {string} as min and max price range', async function (min, max) {
    console.log(`User selecting $${min} & $${max} as price ranges`);
    await searchResultsPage.enterMinPrice(min);
    await searchResultsPage.enterMaxPrice(max);
    await searchResultsPage.clickDoneButton();
});

When('User selects {string} beds and {string} baths from the `House` filter', async function (bedCount, bathCount) {
    console.log(`User selecting ${bedCount} & $${bathCount} as bed/bath choices respectively`);
    await searchResultsPage.selectBedBathOption(bedCount);
    await searchResultsPage.selectBedBathOption(bathCount);
    await searchResultsPage.clickDoneButton();
});

Then('Price of first home in the search result is between {int} and {int}', async function (minPrice, maxPrice) {
    console.log(`Verifying the price range is as expected in the result`);
    const firstHomePrice = await searchResultsPage.getNthHomePriceValue(1);
    console.log(`First home price - ${firstHomePrice}`);
    expect(firstHomePrice).to.be.within(minPrice, maxPrice);
});

Then('Bed count of first home in the search result is atleast {int}', async function (minCount) {
    console.log(`Verifying the bed count is at least ${minCount} in the result`);
    const beds = await searchResultsPage.getNthHomeBedCount(1);
    console.log(`First home bed count - ${beds}`);
    expect(beds).to.be.gte(minCount);
});

Then('Bath count of first home in the search result is atleast {int}', async function (minCount) {
    console.log(`Verifying the bath count is at least ${minCount} in the result`);
    const baths = await searchResultsPage.getNthHomeBathCount(1);
    console.log(`First home bath count - ${baths}`);
    expect(baths).to.be.gte(minCount);
});