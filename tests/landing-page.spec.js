// @ts-check
const { test, expect } = require("@playwright/test");
const { PlaywrightSN } = require("./utilities/playwright-sn");

const instanceUrl = "https://tokyodemo58nata.service-now.com/",
  user = "admin",
  password = "P@ssword!23",
  screenshotPath = "Screenshots/";

test("Simple Playwright Test", async ({ page }) => {
  const pwsn = new PlaywrightSN(page, screenshotPath);
  await pwsn.goToInstance(instanceUrl);
  await pwsn.logIn(user, password);
  await pwsn.impersonateUser("Abel Tuter");
});
