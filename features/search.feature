Feature: Verify that property searches on Redfin returns the correct results

    Scenario: Use your city to perform the property search
        Given User navigates to "https://www.redfin.com/"
        When User types "Portland, OR" in the search field
        And User submits the search
        Then Search result text contains "Portland, OR homes for sale & real estate"
        And Search result page opens with URL containing "/OR/Portland"