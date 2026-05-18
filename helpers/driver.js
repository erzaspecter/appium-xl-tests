// helpers/driver.js
const { remote } = require('webdriverio');

const caps = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'be861fb4',
    'appium:udid': 'be861fb4',
    'appium:appPackage': 'com.xlsmart.instapay',
    'appium:appActivity': 'com.xlsmart.instapay.MainActivity',
    'appium:noReset': true,
    'appium:ignoreHiddenApiPolicyError': true,
    'appium:skipDeviceInitialization': true,
    'appium:skipServerInstallation': true
};

async function getDriver() {
    const driver = await remote({
        hostname: '127.0.0.1',
        port: 4723,
        path: '/',
        capabilities: caps
    });
    return driver;
}

module.exports = { getDriver };