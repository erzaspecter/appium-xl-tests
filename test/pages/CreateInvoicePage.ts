// test/pages/CreateInvoicePage.ts
import { Browser } from 'webdriverio';

export class CreateInvoicePage {
    private driver: Browser;

    constructor(driver: Browser) {
        this.driver = driver;
    }

    // Locators
    get amountInput() {
        return this.driver.$('android=new UiSelector().textContains("Amount").className("android.widget.EditText")');
    }
    get customerNameInput() {
        return this.driver.$('android=new UiSelector().textContains("Customer name").className("android.widget.EditText")');
    }
    get customerEmailInput() {
        return this.driver.$('android=new UiSelector().textContains("Customer email").className("android.widget.EditText")');
    }
    get customerPhoneInput() {
        return this.driver.$('android=new UiSelector().textContains("Customer phone").className("android.widget.EditText")');
    }
    get descriptionInput() {
        return this.driver.$('android=new UiSelector().textContains("Description").className("android.widget.EditText")');
    }
    get referenceNoInput() {
        return this.driver.$('android=new UiSelector().textContains("Reference No").className("android.widget.EditText")');
    }
    get debitCreditRadio() {
        return this.driver.$('android=new UiSelector().textContains("Debit/Credit")');
    }
    get virtualAccountRadio() {
        return this.driver.$('android=new UiSelector().textContains("Virtual account")');
    }
    get shopeePayRadio() {
        return this.driver.$('android=new UiSelector().textContains("ShopeePay")');
    }
    get letCustomerPayFeeCheckbox() {
        return this.driver.$('android=new UiSelector().textContains("Let customer pay the service fee")');
    }
    get totalDisplay() {
        return this.driver.$('android=new UiSelector().textContains("Total").instance(1)');
    }
    get createInvoiceButton() {
        return this.driver.$('android=new UiSelector().text("Create invoice")');
    }
    get errorMessage() {
        return this.driver.$('android=new UiSelector().className("android.widget.TextView").instance(0)');
    }
    get successMessage() {
        return this.driver.$('android=new UiSelector().textContains("invoice").className("android.widget.TextView")');
    }

    async fillValidAmountAndPayment(): Promise<void> {
        await this.amountInput.click();
        await this.amountInput.setValue('100000');
        await this.hideKeyboard();
        await this.debitCreditRadio.click();
    }

    async fillAllOptionalFields(): Promise<void> {
        await this.customerNameInput.click();
        await this.customerNameInput.setValue('Alice Customer');
        await this.customerEmailInput.click();
        await this.customerEmailInput.setValue('alice@example.com');
        await this.customerPhoneInput.click();
        await this.customerPhoneInput.setValue('+6289876543210');
        await this.descriptionInput.click();
        await this.descriptionInput.setValue('Test transaction');
        await this.referenceNoInput.click();
        await this.referenceNoInput.setValue('INV-001');
    }

    async clickCreateInvoice(): Promise<void> {
        await this.createInvoiceButton.click();
    }

    async hideKeyboard(): Promise<void> {
        try {
            await this.driver.hideKeyboard();
        } catch(e) {
            // ignore
        }
    }

    async getTotalText(): Promise<string> {
        return await this.totalDisplay.getText();
    }
}