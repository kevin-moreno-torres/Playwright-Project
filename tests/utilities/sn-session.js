// @ts-check
import { expect } from "@playwright/test";

export class SnSession {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {any} screenshotFolderPath
   */
  constructor(page, screenshotFolderPath) {
    this.page = page;
    this.screenshotFolderPath = screenshotFolderPath;
  }

  /**
   * @param {string} userName
   * @param {string} userPassword
   */
  async logIn(userName, userPassword) {
    const loginBtn = this.page.locator("#sysverb_login");

    await this.page.screenshot({
      path: this.screenshotFolderPath + "login-page.png",
    });
    await expect(loginBtn).toBeEnabled();
    await this.page.locator("#user_name").fill(userName);
    await this.page.locator("#user_password").fill(userPassword);
    await loginBtn.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.screenshot({
      path: this.screenshotFolderPath + "logged-in.png",
    });
  }

  /**
   * @param {string} userName
   */
  async impersonateUser(userName) {
    const avatarBtn = this.page.locator(
        "div.header-avatar-button.contextual-zone-button.user-menu"
      ),
      impersonateBtn = this.page.locator(
        "button.user-menu-button.impersonateUser.keyboard-navigatable.polaris-enabled"
      ),
      impersonationArea = this.page.locator("sn-impersonation"),
      modalWindow = impersonationArea.locator("div.now-modal-dialog"),
      listbox = this.page.locator("seismic-hoist"),
      userLocator = listbox.getByRole("option");

    await expect(avatarBtn).toBeVisible();
    await avatarBtn.click();
    await expect(impersonateBtn).toBeVisible();
    await impersonateBtn.click();
    await expect(modalWindow).toBeVisible();
    await this.page.getByLabel("Select a user").fill(userName);
    await expect(
      listbox.getByRole("listbox", { name: "Select a user" })
    ).toBeVisible();
    await expect(userLocator).toHaveCount(1);
    await userLocator.click();
    await this.page.screenshot({
      path: this.screenshotFolderPath + "impersonate-modal.png",
    });
    await modalWindow.getByRole("button", { name: "Impersonate user" }).click();
    await expect(modalWindow).toBeHidden();
    await this.page.waitForLoadState("networkidle");
    await this.page.screenshot({
      path: this.screenshotFolderPath + "impersonated-successfully.png",
    });
  }
}
