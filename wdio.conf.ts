// wdio.conf.ts
import { Config } from '@wdio/types';

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
    'appium:skipServerInstallation': true,
    'appium:autoGrantPermissions': true
};

export const config: Config.Testrunner = {
    runner: 'local',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    capabilities: [caps],
    specs: ['./test/specs/**/*.ts'],
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
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json'
        }
    }
};