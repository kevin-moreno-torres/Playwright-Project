// @ts-check
const { test, expect } = require("@playwright/test");
const { PlaywrightSN } = require("./utilities/playwright-sn");

const instanceUrl = "https://instance.service-now.com/",
  user = "user",
  password = "password",
  screenshotPath = "Screenshots/";

test("Simple Playwright Test", async ({ page }) => {
  const pwsn = new PlaywrightSN(page, screenshotPath);
  await pwsn.goToInstance(instanceUrl);
  await pwsn.logIn(user, password);
  await pwsn.impersonateUser("Abel Tuter");
});
