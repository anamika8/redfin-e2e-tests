Feature: Verify that property searches on Redfin returns the correct results

    Background:
        Given User navigates to "https://www.redfin.com/"
        When User types "Portland, OR" in the search field
        And User submits the search
        And User waits 5 seconds for the results to appear

    Scenario: Use your city to perform the property search
        Then Search result page opens with URL containing "/OR/Portland"
        And Search result text contains "Portland, OR homes for sale & real estate"