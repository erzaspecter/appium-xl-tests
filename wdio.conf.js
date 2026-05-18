// wdio.conf.js
const caps = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'be861fb4',        // Ganti dengan device ID Anda
    'appium:udid': 'be861fb4',              // Ganti dengan device ID Anda
    'appium:appPackage': 'com.xlsmart.instapay',  // Ganti dengan package name app
    'appium:appActivity': 'com.xlsmart.instapay.MainActivity', // Ganti dengan activity name
    'appium:noReset': true,
    'appium:ignoreHiddenApiPolicyError': true,
    'appium:skipDeviceInitialization': true,
    'appium:skipServerInstallation': true,
    'appium:autoGrantPermissions': true
};

exports.config = {
    runner: 'local',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    capabilities: [caps],
    specs: ['./test/specs/**/*.js'],
    exclude: [],
    maxInstances: 1,
    logLevel: 'info',
    outputDir: './logs',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    services: ['appium']
};