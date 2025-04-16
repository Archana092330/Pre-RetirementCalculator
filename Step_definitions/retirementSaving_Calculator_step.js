/**
 * Step Definitions for Retirement Savings Calculator
 * 
 * This file contains step definitions for the pre-retirement calculator feature.
 * It includes steps for navigating to the calculator page, filling out fields, submitting the form,
 * validating error messages, and interacting with specific fields like social security options.
 */

import { Given, When, Then } from '@wdio/cucumber-framework';
import preRetirementCalculator from '../PageObjects/preRetirementCalculator.js';
import mainPage from '../PageObjects/mainPage.js';

// Step Definitions

/**
 * Step to navigate to the pre-retirement calculator page.
 * 
 * @Given User is on the pre-retirement calculator page
 */
Given(/^User is on the pre-retirement calculator page$/, async () => {
    await mainPage.launchRetirementPage();
});

/**
 * Step to fill fields on the pre-retirement calculator page with specified test data.
 * 
 * @When User fills "<string>" fields on the pre-retirement calculator page
 * @param {string} string - The key to retrieve test data (e.g., "negative age", "invalid income format").
 */
When(/^User fills "([^"]*)" fields on the pre-retirement calculator page$/, async function(string) {
    await preRetirementCalculator.enterCustomerDetails(string);
});

/**
 * Step to submit the retirement calculator form.
 * 
 * @When User submits the retirement calculator form
 */
When(/^User submits the retirement calculator form$/, async function() {
    await preRetirementCalculator.submitCalculatorForm();
});

/**
 * Step to validate the error message or success message after form submission.
 * 
 * @Then User is able to see message with retirement saving amount
 * @param {string} string - The key to retrieve expected messages (e.g., error or success messages).
 */
Then(/^User is able to see message for "([^"]*)" with retirement saving amount$/, async function(string) {
    await preRetirementCalculator.submitValidateErrorMsg(string);
});

/**
 * Step to select the social security option on the pre-retirement calculator page.
 * 
 * @When User selects social security field as "<string>" on the pre-retirement calculator page
 * @param {string} string - The social security option to select ("yes" or "no").
 */
When(/^User selects social security field as "([^"]*)" on the pre-retirement calculator page$/, async function(string) {
    await preRetirementCalculator.selectSocialSecurityOption(string);
});

/**
 * Step to validate the visibility of social security benefits based on the selected option.
 * 
 * @Then social security benefits "<string>" visible
 * @param {string} string - The expected visibility status ("yes" or "no").
 */
Then(/^social security benefits "([^"]*)" visible$/, async function(string) {
    await preRetirementCalculator.selectSocialSecurityOption(string);
});

/**
 * Step to validate the retirement saving amount message.
 * 
 * @Then User is able to see message with retirement saving amount
 * @param {string} string - The key to retrieve expected retirement saving amount.
 */
Then(/^User is able to see message with retirement saving amount$/, async function(string) {
    await preRetirementCalculator.assertRetirementAmount(string);
});

/**
 * Step to change default calculator values on the pre-retirement calculator page.
 * 
 * @Then User changes the "<string>" calculator values on the pre-retirement calculator page
 * @param {string} string - The key to retrieve test data for default values.
 */
Then(/^User changes the "([^"]*)" calculator values on the pre-retirement calculator page$/, async function(string) {
    await preRetirementCalculator.enterDefaultValues(string);
});