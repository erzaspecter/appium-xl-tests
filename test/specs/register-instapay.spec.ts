// test/specs/register-instapay.spec.ts
import { Browser } from 'webdriverio';
import { getDriver } from '../../helpers/driver';
import { RegisterInstapayPage } from '../pages/RegisterInstapayPage';
import { expect } from 'chai';

describe('Register for Instapay - Mobile Tests', () => {
    let driver: Browser;
    let registerPage: RegisterInstapayPage;

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
        
        const success = await registerPage.successMessage.isDisplayed().catch(() => false);
        expect(success).to.be.true;
    });

    // REG-02: Empty Name
    it('REG-02 - Empty Name field', async () => {
        await registerPage.fillValidForm();
        await registerPage.nameInput.click();
        await registerPage.nameInput.clearValue();
        await registerPage.nameInput.setValue('');
        await registerPage.hideKeyboard();
        await registerPage.clickRegisterButton();
        await driver.pause(2000);
        
        const errorMsg = await registerPage.getErrorMessage();
        expect(errorMsg).to.include('Name is required');
    });

    // REG-03: Empty Email
    it('REG-03 - Empty Email field', async () => {
        await registerPage.fillValidForm();
        await registerPage.emailInput.click();
        await registerPage.emailInput.clearValue();
        await registerPage.emailInput.setValue('');
        await registerPage.hideKeyboard();
        await registerPage.clickRegisterButton();
        await driver.pause(2000);
        
        const errorMsg = await registerPage.getErrorMessage();
        expect(errorMsg).to.include('Email is required');
    });

    // REG-04: Invalid email format
    it('REG-04 - Invalid email format', async () => {
        await registerPage.fillValidForm();
        await registerPage.emailInput.click();
        await registerPage.emailInput.clearValue();
        await registerPage.emailInput.setValue('notanemail');
        await registerPage.hideKeyboard();
        await registerPage.clickRegisterButton();
        await driver.pause(2000);
        
        const errorMsg = await registerPage.getErrorMessage();
        expect(errorMsg).to.include('Invalid email format');
    });

    // REG-05: Empty Phone number
    it('REG-05 - Empty Phone number', async () => {
        await registerPage.fillValidForm();
        await registerPage.phoneInput.click();
        await registerPage.phoneInput.clearValue();
        await registerPage.phoneInput.setValue('');
        await registerPage.hideKeyboard();
        await registerPage.clickRegisterButton();
        await driver.pause(2000);
        
        const errorMsg = await registerPage.getErrorMessage();
        expect(errorMsg).to.include('Phone number is required');
    });

    // REG-06: Invalid phone format (missing +62)
    it('REG-06 - Invalid phone format (missing +62)', async () => {
        await registerPage.fillValidForm();
        await registerPage.phoneInput.click();
        await registerPage.phoneInput.clearValue();
        await registerPage.phoneInput.setValue('81234567890');
        await registerPage.hideKeyboard();
        await registerPage.clickRegisterButton();
        await driver.pause(2000);
        
        const errorMsg = await registerPage.getErrorMessage();
        expect(errorMsg).to.include('Phone must start with +62');
    });

    // REG-07: Empty Store name
    it('REG-07 - Empty Store name', async () => {
        await registerPage.fillValidForm();
        await registerPage.storeNameInput.click();
        await registerPage.storeNameInput.clearValue();
        await registerPage.storeNameInput.setValue('');
        await registerPage.hideKeyboard();
        await registerPage.clickRegisterButton();
        await driver.pause(2000);
        
        const errorMsg = await registerPage.getErrorMessage();
        expect(errorMsg).to.include('Store name is required');
    });

    // REG-08: No business category selected
    it('REG-08 - No business category selected', async () => {
        await registerPage.fillValidForm();
        await registerPage.clickRegisterButton();
        await driver.pause(2000);
        
        const errorMsg = await registerPage.getErrorMessage();
        expect(errorMsg).to.include('Business category is required');
    });

    // REG-09: Declaration checkbox unchecked
    it('REG-09 - Declaration checkbox unchecked', async () => {
        await registerPage.fillValidForm();
        await registerPage.declarationCheckbox.click();
        await registerPage.clickRegisterButton();
        await driver.pause(2000);
        
        const errorMsg = await registerPage.getErrorMessage();
        expect(errorMsg).to.include('declare that information is true');
    });

    // REG-10: Terms & Conditions unchecked
    it('REG-10 - Terms & Conditions unchecked', async () => {
        await registerPage.fillValidForm();
        await registerPage.termsCheckbox.click();
        await registerPage.clickRegisterButton();
        await driver.pause(2000);
        
        const errorMsg = await registerPage.getErrorMessage();
        expect(errorMsg).to.include('agree to the terms and conditions');
    });
});