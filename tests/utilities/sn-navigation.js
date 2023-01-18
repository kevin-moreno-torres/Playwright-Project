// @ts-check
import { expect } from "@playwright/test";

export class SnNavigation {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').BrowserContext} browserContext
   * @param {string} screenshotFolderPath
   */
  constructor(page, browserContext, screenshotFolderPath) {
    this.page = page;
    this.browserContext = browserContext;
    this.screenshotFolderPath = screenshotFolderPath;
  }

  /**
   * @param {string} instanceUrl
   */
  async goToInstance(instanceUrl) {
    await this.page.goto(instanceUrl);
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);
  }

  /**
   * @param {string} moduleName
   * @param {string} menuItem
   * @param {boolean} [isOpenedInNewTab]
   */
  async navigateToCSMModule(moduleName, menuItem, isOpenedInNewTab) {
    const headerMenu = this.page.locator(
      "div.sn-polaris-navigation.polaris-header-menu"
    );

    await expect(headerMenu).toBeVisible();
    await headerMenu.getByRole("button", { name: "All" }).click();
    await this.page.locator("input#filter").click();
    await this.page.keyboard.press("Control+A");
    await this.page.keyboard.press("Backspace");
    await this.page.fill("input#filter", menuItem);
    const moduleItem = this.page
      .locator("sn-collapsible-list")
      .filter({ hasText: new RegExp(moduleName) });
    if (isOpenedInNewTab) {
      //  ➚ (opens in a new tab)
      await moduleItem
        .getByRole("menuitem", {
          name: menuItem + " ➚ (opens in a new tab)",
          exact: true,
        })
        .click();
      const pagePromise = this.browserContext.waitForEvent("page");
      const newPage = await pagePromise;
      await newPage.waitForLoadState("networkidle");
      this.page = newPage;
    } else {
      await moduleItem
        .getByRole("menuitem", { name: menuItem, exact: true })
        .click();
    }

    await this.page.waitForTimeout(1000);
    await expect(this.page.locator("span.experience-title")).toBeVisible();
    await this.page.screenshot({
      path: this.screenshotFolderPath + "navigate-all-menu.png",
    });
  }
}
