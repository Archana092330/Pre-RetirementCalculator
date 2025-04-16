Feature: Calculate savings using Pre-retirement Calculator

Background: 
    Given User is on the pre-retirement calculator page

Scenario Outline: Submitting the form with required data
Then User fills "<allrequired>" fields on the pre-retirement calculator page
Then User submits the retirement calculator form
Then User is able to see message for "<allrequired>" with retirement saving amount

Examples:
      | allrequired |
      | required    |
      | all         |

Scenario: Social Security fields should display/hide based on Social Security benefits toggle
    When User selects social security field as "yes" on the pre-retirement calculator page
    Then social security benefits "is" visible
    When User selects social security field as "no" on the pre-retirement calculator page
    Then social security benefits "not" visible

Scenario: User is able to update default calculator values
    Then User fills "required" fields on the pre-retirement calculator page
    Then User changes the "default" calculator values on the pre-retirement calculator page
    And User submits the retirement calculator form
    Then User is able to see message for "default" with retirement saving amount
