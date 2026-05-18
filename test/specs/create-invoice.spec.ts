import { Browser } from 'webdriverio';
import { getDriver } from '../../helpers/driver';
import { CreateInvoicePage } from '../pages/CreateInvoicePage';
import { expect } from 'chai';

describe('Create Invoice Page - Mobile Tests', () => {
    let driver: Browser;
    let invoicePage: CreateInvoicePage;

    before(async () => {
        driver = await getDriver();
        invoicePage = new CreateInvoicePage(driver);
    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });

    it('INV-01 - Valid create invoice', async () => {
        await invoicePage.fillValidAmountAndPayment();
        await invoicePage.clickCreateInvoice();
        await invoicePage.successMessage.waitForDisplayed({ timeout: 5000 });
        expect(await invoicePage.successMessage.getText()).to.contain('invoice');
    });

    it('INV-02 - Amount below minimum', async () => {
        await invoicePage.amountInput.setValue('10000');
        await invoicePage.hideKeyboard();
        await invoicePage.debitCreditRadio.click();
        await invoicePage.clickCreateInvoice();
        await invoicePage.errorMessage.waitForDisplayed({ timeout: 5000 });
        expect(await invoicePage.errorMessage.getText()).to.contain('minimum');
    });

    it('INV-03 - Amount equals minimum', async () => {
        await invoicePage.amountInput.setValue('15000');
        await invoicePage.hideKeyboard();
        await invoicePage.debitCreditRadio.click();
        await invoicePage.clickCreateInvoice();
        await invoicePage.successMessage.waitForDisplayed({ timeout: 5000 });
        expect(await invoicePage.successMessage.getText()).to.contain('invoice');
    });

    it('INV-04 - Amount with decimals', async () => {
        await invoicePage.amountInput.setValue('15000.50');
        await invoicePage.hideKeyboard();
        await invoicePage.debitCreditRadio.click();
        await invoicePage.clickCreateInvoice();
        await invoicePage.successMessage.waitForDisplayed({ timeout: 5000 });
        expect(await invoicePage.successMessage.getText()).to.contain('invoice');
    });

    it('INV-05 - No payment channel selected', async () => {
        await invoicePage.amountInput.setValue('100000');
        await invoicePage.hideKeyboard();
        await invoicePage.clickCreateInvoice();
        await invoicePage.errorMessage.waitForDisplayed({ timeout: 5000 });
        expect(await invoicePage.errorMessage.getText()).to.contain('payment channel');
    });

    it('INV-06 - Debit/Credit service fee', async () => {
        await invoicePage.fillValidAmountAndPayment();
        const total = await invoicePage.getTotalText();
        expect(total).to.match(/\d+/); // cek angka muncul
    });

    it('INV-07 - Virtual account service fee', async () => {
        await invoicePage.amountInput.setValue('100000');
        await invoicePage.hideKeyboard();
        await invoicePage.virtualAccountRadio.click();
        const total = await invoicePage.getTotalText();
        expect(total).to.match(/\d+/);
    });

    it('INV-08 - Let customer pay service fee', async () => {
        await invoicePage.fillValidAmountAndPayment();
        await invoicePage.letCustomerPayFeeCheckbox.click();
        const total = await invoicePage.getTotalText();
        expect(total).to.match(/\d+/);
    });

    it('INV-09 - All optional fields filled', async () => {
        await invoicePage.fillValidAmountAndPayment();
        await invoicePage.fillAllOptionalFields();
        await invoicePage.clickCreateInvoice();
        await invoicePage.successMessage.waitForDisplayed({ timeout: 5000 });
        expect(await invoicePage.successMessage.getText()).to.contain('invoice');
    });

    it('INV-10 - SQL injection', async () => {
        await invoicePage.fillValidAmountAndPayment();
        await invoicePage.customerNameInput.setValue("' OR '1'='1");
        await invoicePage.hideKeyboard();
        await invoicePage.clickCreateInvoice();
        await invoicePage.errorMessage.waitForDisplayed({ timeout: 5000 });
        expect(await invoicePage.errorMessage.getText()).to.contain('invalid');
    });
});
