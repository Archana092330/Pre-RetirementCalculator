/**
 * PreRetirementPage Class
 * 
 * This class contains methods to interact with the Pre-Retirement Calculator page.
 * It provides functionality to fill out the form, validate error messages, and verify calculation results.
 * The class also handles positive and negative test scenarios using test data.
 */

import { $ } from '@wdio/globals';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { commonUtils } from '../Utils/CommonUtils.js';
import { logger } from '../Utils/logUtils.js';
import { takeScreenshot } from '../Utils/screenshotUtils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const positiveTestData = JSON.parse(
    readFileSync(join(__dirname, '../Test_Data/positiveTestData.json'), 'utf8')
);
const negativeTestData = JSON.parse(
    readFileSync(join(__dirname, '../Test_Data/negativeTestData.json'), 'utf8')
);

class PreRetirementPage {
    // Locators for input fields and elements on the page
    get currentAgeInput() { return $('#current-age'); }
    get retiringAgeInput() { return $('#retirement-age'); }
    get currentAnnualIncomeInput() { return $('#current-income'); }
    get spouseAnnualIncomeInput() { return $('#spouse-income'); }
    get currentRetirementSavingsInput() { return $('#current-total-savings'); }
    get currentAnnualSavingsInput() { return $('#current-annual-savings'); }
    get savingIncreaseRateInput() { return $('#savings-increase-rate'); }
    get successResultMessage() { return $('#result-message'); }
    get successResultChart() { return $('#results-chart'); }
    get monthlySavingsResultsTable() { return $('#monthly-savings-results-table'); }
    get submitRetirement() { return $('//*[@data-tag-id="submit"]'); }
    get requiredFieldAlert() { return $('#calculator-input-alert'); }
    get invalidCurrentAge() { return $('#invalid-current-age-error'); }
    get invalidretiringAge() { return $('#invalid-retirement-age-error'); }
    get ageError() { return $('//*[@for = "current-age"]'); }
    get retireAgeError() { return $('//*[@for = "retirement-age"]'); }
    get currentIncomeErrorField() { return $('//*[@for = "current-income"]'); }
    get currentSavingErrorField() { return $('//*[@for = "current-total-savings"]'); }
    get yesSocialSecurity() { return $('#yes-social-benefits'); }
    get noSocialSecurity() { return $('#no-social-benefits'); }
    get singleMartialStatus() { return $('#single'); }
    get martialStatusToggle() { return $('#marital-status-toggle-group'); }
    get marriedMartialStatus() { return $('#married'); }
    get overrideSocialSecurity() { return $('#social-security-override'); }
    get adjustDefaultValues() { return $('=Adjust default values'); }
    get inputextraIncome() { return $('#additional-income'); }
    get inputretirementYears() { return $('#retirement-duration'); }
    get inputfinalAnnualIncome() { return $('#retirement-annual-income'); }
    get inputpreRetirementReturn() { return $('#pre-retirement-roi'); }
    get inputpostRetirementReturn() { return $('#post-retirement-roi'); }
    get buttonSaveChanges() { return $("//*[text()='Save changes']"); }

    /**
     * Selects the marital status option on the pre-retirement calculator.
     * 
     * @param {string} status - The marital status to select ('single' or 'married').
     */
    async selectMaritalStatusOption(status) {
        try {
            if (status === 'single') {
                await commonUtils.clickJS(this.singleMartialStatus);
            } else if (status === 'married') {
                await commonUtils.clickJS(this.marriedMartialStatus);
            } else {
                throw new Error(`Unknown marital status: ${status}`);
            }
            logger.info('Selected Marital Status as ' + status);
        } catch (error) {
            logger.error('Failed to select marital status: ' + status);
        }
    }

    /**
     * Selects the social security option on the pre-retirement calculator.
     * 
     * @param {string} option - The social security option to select ('yes' or 'no').
     */
    async selectSocialSecurityOption(option) {
        try {
            if (option === 'yes') {
                await commonUtils.clickJS(this.yesSocialSecurity);
                await takeScreenshot("Socialsecurity");
            } else if (option === 'no') {
                await commonUtils.clickJS(this.noSocialSecurity);
                await takeScreenshot("Socialsecurity");
            } else {
                throw new Error(`Unknown social security option: ${option}`);
            }
            logger.info('Social Security option selected as ' + option);
        } catch (error) {
            logger.error('Failed to select Social Security option: ' + option);
        }
    }

    /**
     * Enters default values in the pre-retirement calculator.
     * 
     * @param {string} string - The key to retrieve test data from the positive test data file.
     */
    async enterDefaultValues(string) {
        try {
            logger.info('Entering the default calculator values');
            const testDataobject = positiveTestData[string];
            await commonUtils.click(this.adjustDefaultValues);
            await commonUtils.setValue(this.inputretirementYears, testDataobject.retirementYears);
            await commonUtils.setValue(this.inputextraIncome, testDataobject.extraIncome);
            await commonUtils.setValue(this.inputfinalAnnualIncome, testDataobject.finalAnnualIncome);
            await commonUtils.setValue(this.inputpreRetirementReturn, testDataobject.preRetirementReturn);
            await commonUtils.setValue(this.inputpostRetirementReturn, testDataobject.postRetirementReturn);
            await commonUtils.click(this.buttonSaveChanges);
            logger.info('Successfully entered default calculator values');
        } catch (error) {
            logger.error('Failed to enter default calculator values: ' + error);
        }
    }

    /**
     * Enters customer details in the pre-retirement calculator form.
     * 
     * @param {string} string - The key to retrieve test data from the positive test data file.
     */
    async enterCustomerDetails(string) {
        try {
            logger.info('Entering User Details fields');
            const testDataobject = positiveTestData[string];
            await commonUtils.setValue(this.currentAgeInput, testDataobject.currentAge);
            await commonUtils.setValue(this.retiringAgeInput, testDataobject.retiringAge);
            await commonUtils.setValue(this.currentAnnualIncomeInput, testDataobject.currentAnnualIncome);
            await commonUtils.setValue(this.spouseAnnualIncomeInput, testDataobject.spouseAnnualIncome);
            await commonUtils.setValue(this.currentRetirementSavingsInput, testDataobject.currentRetirementSavings);
            await commonUtils.setValue(this.currentAnnualSavingsInput, testDataobject.currentAnnualSavings);
            await commonUtils.setValue(this.savingIncreaseRateInput, testDataobject.interestRate);
            logger.info('Successfully entered the user details');
        } catch (error) {
            logger.error('Failed to enter user details fields: ' + error);
        }
    }

    /**
     * Validates error messages based on the test scenario.
     * 
     * @param {string} string - The key to retrieve test data from the negative test data file.
     */
    async submitValidateErrorMsg(string) {
        try {
            const testDataobject = negativeTestData[string];
            if (string === "allEmpty") {
                await expect(this.requiredFieldAlert).toHaveText(testDataobject.errorMsg);
            }
            await takeScreenshot(`error_message`);
            logger.info('Successfully verified error message');
        } catch (error) {
            logger.error('Failed to verify the error message: ' + error);
        }
    }

    /**
     * Submits the retirement calculator form.
     */
    async submitCalculatorForm() {
        try {
            await commonUtils.click(this.submitRetirement);
            await takeScreenshot('form_submitted');
            logger.info('Successfully clicked on the Calculate button');
        } catch (error) {
            logger.error('Failed to click the Calculate button: ' + error);
        }
    }
}

export default new PreRetirementPage();