// @ts-check
const { test, expect } = require("@playwright/test");
let pageObj;
const INSTANCE_URL = "https://tokyodemo58nata.service-now.com/",
  USER = "admin",
  PASSWORD = "P@ssword!23",
  SCREENSHOT_PATH = "Screenshots/";

test("Simple Playwright Test", async ({ page }) => {
  pageObj = page;
  await pageObj.goto(INSTANCE_URL);
  await LogIn();
  await ImpersonateUser("Abel Tuter");
});

async function LogIn() {
  const loginBtn = pageObj.locator("#sysverb_login");

  await pageObj.screenshot({ path: SCREENSHOT_PATH + "login-page.png" });
  await expect(loginBtn).toBeEnabled();
  await pageObj.locator("#user_name").fill(USER);
  await pageObj.locator("#user_password").fill(PASSWORD);
  await loginBtn.click();
  await expect(pageObj.locator("span.experience-title")).toBeVisible();
  await pageObj.screenshot({ path: SCREENSHOT_PATH + "logged-in.png" });
}

/**
 * @param {string} userName
 */
async function ImpersonateUser(userName) {
  const avatarBtn = pageObj.locator(
      "div.header-avatar-button.contextual-zone-button.user-menu"
    ),
    impersonateBtn = pageObj.locator(
      "button.user-menu-button.impersonateUser.keyboard-navigatable.polaris-enabled"
    ),
    impersonationArea = pageObj.locator("sn-impersonation"),
    modalWindow = impersonationArea.locator("div.now-modal-dialog"),
    listbox = pageObj.locator("seismic-hoist"),
    userLocator = listbox.getByRole("option");

  await expect(avatarBtn).toBeVisible();
  await avatarBtn.click();
  await expect(impersonateBtn).toBeVisible();
  await impersonateBtn.click();
  await expect(modalWindow).toBeVisible();
  await pageObj.fill('input[placeholder="Search for a user"]', userName);
  await expect(
    listbox.getByRole("listbox", { name: "Select a user" })
  ).toBeVisible();
  await expect(userLocator).toHaveCount(1);
  await userLocator.click();
  await pageObj.screenshot({ path: SCREENSHOT_PATH + "impersonate-modal.png" });
  await modalWindow.getByRole("button", { name: "Impersonate user" }).click();
  await expect(modalWindow).toBeHidden();
  await expect(pageObj.locator("span.experience-title")).toBeVisible();
  await pageObj.screenshot({
    path: SCREENSHOT_PATH + "impersonated-successfully.png",
  });
}
