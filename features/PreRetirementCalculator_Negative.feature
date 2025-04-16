Feature: Calculate savings using Pre-retirement Calculator - Negative Scenario
Background: 
    Given User is on the pre-retirement calculator page

Scenario Outline: User checking the error message with different set of invalid data
    When User fills "<invalidTestdata>" fields on the pre-retirement calculator page
    And User submits the retirement calculator form
    Then User is able to see message for "<invalidTestdata>" with retirement saving amount
    Examples:
      | invalidTestdata                 |
      | negative age                    | 
      | invalid age                     |
      | age greater than retirement age |           
      | invalid income format           |
      | negative savings amount         |
      | retirement age less than age    |
      | invalid characters in fields    |
