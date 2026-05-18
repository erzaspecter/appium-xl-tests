// test/pages/RegisterInstapayPage.js
class RegisterInstapayPage {
    constructor(driver) {
        this.driver = driver;
    }

    // Locators
    get nameInput() {
        return this.driver.$('android=new UiSelector().textContains("Name").className("android.widget.EditText")');
    }
    get emailInput() {
        return this.driver.$('android=new UiSelector().textContains("Email").className("android.widget.EditText")');
    }
    get phoneInput() {
        return this.driver.$('android=new UiSelector().textContains("Phone").className("android.widget.EditText")');
    }
    get storeNameInput() {
        return this.driver.$('android=new UiSelector().textContains("Store name").className("android.widget.EditText")');
    }
    get businessCategoryDropdown() {
        return this.driver.$('android=new UiSelector().textContains("Business category")');
    }
    get declarationCheckbox() {
        return this.driver.$('android=new UiSelector().textContains("I hereby declare")');
    }
    get termsCheckbox() {
        return this.driver.$('android=new UiSelector().textContains("I have read and agreed")');
    }
    get registerButton() {
        return this.driver.$('android=new UiSelector().text("Sign up")');
    }
    get errorMessage() {
        return this.driver.$('android=new UiSelector().className("android.widget.TextView").instance(0)');
    }

    // Methods
    async fillValidForm() {
        await this.nameInput.click();
        await this.nameInput.setValue('John Doe');
        await this.emailInput.click();
        await this.emailInput.setValue('john@example.com');
        await this.phoneInput.click();
        await this.phoneInput.setValue('+6281234567890');
        await this.storeNameInput.click();
        await this.storeNameInput.setValue('John Store');
        await this.businessCategoryDropdown.click();
        await this.driver.pause(500);
        const fashionOption = await this.driver.$('android=new UiSelector().text("Fashion")');
        await fashionOption.click();
        await this.declarationCheckbox.click();
        await this.termsCheckbox.click();
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async getErrorMessage() {
        await this.errorMessage.waitForDisplayed({ timeout: 5000 });
        return await this.errorMessage.getText();
    }
}

module.exports = { RegisterInstapayPage };