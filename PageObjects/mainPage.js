/**
 * MainPage Class
 * 
 * This class contains methods to interact with the main page of the Retirement Calculator application.
 * It includes functionality to launch the retirement calculator page and handle cookie consent.
 */

import { logger } from '../Utils/logUtils.js';
import { takeScreenshot } from '../Utils/screenshotUtils.js';

class MainPage {
    /**
     * Launches the Retirement Calculator page.
     * 
     * - Navigates to the specified URL.
     * - Maximizes the browser window.
     * - Handles the cookie consent popup if it appears.
     * - Logs the status of the operation.
     * - Takes a screenshot if the cookie consent button is clicked.
     * 
     * @async
     * @throws {Error} Logs an error if the cookie consent button is not found or not clickable.
     */
    async launchRetirementPage() {
        logger.info('============================================');
        await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
        await browser.maximizeWindow();
        logger.info('Successfully URL launched');
        try {
            const cookieButton = await $("//*[@class='onetrust-close-btn-handler onetrust-close-btn-ui banner-close-button ot-close-icon']");
            if (await cookieButton.isDisplayed() && await cookieButton.isClickable()) {
                await cookieButton.click();         
                await takeScreenshot('cookie_consent');
            }
        } catch (error) {
            console.log('Cookie consent button not found or not clickable, continuing...');
        }
    }
}

export default new MainPage();