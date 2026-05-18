// test/specs/register-instapay.spec.js
const { getDriver } = require('../../helpers/driver');
const { RegisterInstapayPage } = require('../pages/RegisterInstapayPage');

describe('Register for Instapay - Mobile Tests', () => {
    let driver;
    let registerPage;

    before(async () => {
        driver = await getDriver();
        registerPage = new RegisterInstapayPage(driver);
        await driver.pause(3000);
    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });

    // REG-01: Valid registration
    it('REG-01 - Valid registration', async () => {
        await registerPage.fillValidForm();
        await registerPage.clickRegisterButton();
        await driver.pause(2000);
        // Verify success
    });

    // REG-02: Empty Name
    it('REG-02 - Empty Name field', async () => {
        // Relaunch or reset form
        // Test logic here
    });

    // Add more test cases...
});