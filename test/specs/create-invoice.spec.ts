// test/specs/create-invoice.spec.ts
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
        await driver.pause(3000);
    });

    after(async () => {
        if (driver) {
            await driver.deleteSession();
        }
    });

    it('INV-01 - Valid create invoice', async () => {
        await invoicePage.fillValidAmountAndPayment();
        await invoicePage.clickCreateInvoice();
        await driver.pause(2000);
    });

    it('INV-02 - Amount below minimum', async () => {
        await invoicePage.amountInput.click();
        await invoicePage.amountInput.setValue('10000');
        await invoicePage.hideKeyboard();
        await invoicePage.debitCreditRadio.click();
        await invoicePage.clickCreateInvoice();
        await driver.pause(2000);
    });

    it('INV-03 - Amount equals minimum', async () => {
        await invoicePage.amountInput.click();
        await invoicePage.amountInput.setValue('15000');
        await invoicePage.hideKeyboard();
        await invoicePage.debitCreditRadio.click();
        await invoicePage.clickCreateInvoice();
        await driver.pause(2000);
    });

    it('INV-04 - Amount with decimals', async () => {
        await invoicePage.amountInput.click();
        await invoicePage.amountInput.setValue('15000.50');
        await invoicePage.hideKeyboard();
        await invoicePage.debitCreditRadio.click();
        await invoicePage.clickCreateInvoice();
        await driver.pause(2000);
    });

    it('INV-05 - No payment channel selected', async () => {
        await invoicePage.amountInput.click();
        await invoicePage.amountInput.setValue('100000');
        await invoicePage.hideKeyboard();
        await invoicePage.clickCreateInvoice();
        await driver.pause(2000);
    });

    it('INV-06 - Debit/Credit service fee', async () => {
        await invoicePage.fillValidAmountAndPayment();
        await driver.pause(1000);
        const total = await invoicePage.getTotalText();
        console.log('Total displayed:', total);
    });

    it('INV-07 - Virtual account service fee', async () => {
        await invoicePage.amountInput.click();
        await invoicePage.amountInput.setValue('100000');
        await invoicePage.hideKeyboard();
        await invoicePage.virtualAccountRadio.click();
        await driver.pause(1000);
        const total = await invoicePage.getTotalText();
        console.log('Total displayed:', total);
    });

    it('INV-08 - Let customer pay service fee', async () => {
        await invoicePage.fillValidAmountAndPayment();
        await invoicePage.letCustomerPayFeeCheckbox.click();
        await driver.pause(1000);
        const total = await invoicePage.getTotalText();
        console.log('Total displayed:', total);
    });

    it('INV-09 - All optional fields filled', async () => {
        await invoicePage.fillValidAmountAndPayment();
        await invoicePage.fillAllOptionalFields();
        await invoicePage.clickCreateInvoice();
        await driver.pause(2000);
    });

    it('INV-10 - SQL injection', async () => {
        await invoicePage.fillValidAmountAndPayment();
        await invoicePage.customerNameInput.click();
        await invoicePage.customerNameInput.setValue("' OR '1'='1");
        await invoicePage.hideKeyboard();
        await invoicePage.clickCreateInvoice();
        await driver.pause(2000);
    });
});