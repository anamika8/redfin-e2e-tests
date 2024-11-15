Feature: Verify that property searches on Redfin returns the correct results

    Scenario: Use your city to perform the property search and use 3 filters to get search results
        Given User navigates to "https://www.redfin.com/"
        When User types "Portland, OR" in the search field
        And User submits the search
        And User waits 5 seconds for the results to appear
        Then Search result page opens with URL containing '/OR/Portland'
        When User clicks on the `For Sale` filter
        And User selects 'Active' under the `For Sale` filter
        And User clicks on the `Price` filter
        And User enters '300000' and '400000' as min and max price range
        And User clicks on the `Bed-bath` filter
        And User selects '3' beds and '2+' baths from the `House` filter
        And User clicks on the `Home type` filter
        And User selects 'Townhouse' from the `Home type` filter
        Then Search result text contains "Portland, OR homes for sale & real estate"
        And Home type filter in the search result is 'Townhouse'
        And Price of first home in the search result is between 300000 and 400000
        And Bed count of first home in the search result is atleast 3
        And Bath count of first home in the search result is atleast 2
       