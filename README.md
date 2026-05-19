# XLSmart Assessment: Mobile Automation (Appium + WebdriverIO)

This project is part of the **Senior QA Engineer Assessment** for PT XLSMART Telecom Sejahtera Tbk.

## Objective
Create automation tests for the mobile app **Register for Instapay** and **Create Invoice** pages based on the provided screenshots, using Appium + WebdriverIO with TypeScript.

## 📁 Project Structure
├── test/
│ ├── pages/ # Page Object Models
│ │ ├── CreateInvoicePage.ts
│ │ └── RegisterInstapayPage.ts
│ └── specs/ # Test specs
│ ├── create-invoice.spec.ts
│ ├── mobile-specific.spec.ts
│ └── register-instapay.spec.ts
├── helpers/
│ └── driver.ts # Appium server connection
├── wdio.conf.ts
└── tsconfig.json

## 🧪 Test Coverage
- **Register for Instapay:** 10 functional test cases (REG-01 to REG-10)
- **Create Invoice:** 10 functional test cases (INV-01 to INV-10)
- **Mobile-Specific:** 13 test cases (MOB-01 to MOB-13) covering keyboard, screen rotation, touch targets, network conditions, etc.

## 🛠️ Tools Used
- **Appium** + **WebdriverIO** + **TypeScript** (Mobile Automation)
- **Mocha** + **Chai** (Test Framework & Assertions)

## ⚠️ Important Notes
- The **APK file** and **appPackage/appActivity** information were **not provided** in the assessment.
- Focus was placed on **code logic, structure, test coverage, and best practices** (Page Object Model).

## 🚀 How to Run (When APK & Environment are Available)
```bash
# 1. Start Appium server
appium

# 2. Run tests
npm run test:all