Feature: Verify that property searches on Redfin returns the correct results

    Scenario: Use your city to perform the property search
        Given User navigates to "https://www.redfin.com/"
        When User types "Portland" in the search field
        And User clicks on the Search button
        Then Search result page opens with URL containing "/OR/Portland"
        And Search result text contains "Portland, OR homes for sale & real estate"