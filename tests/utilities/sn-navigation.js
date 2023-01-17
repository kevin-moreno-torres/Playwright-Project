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
  }

  /**
   * @param {string} moduleName
   * @param {boolean} [isOpenedInNewTab]
   */
  async navigateToCSMModule(moduleName, isOpenedInNewTab) {
    const headerMenu = this.page.locator(
      "div.sn-polaris-navigation.polaris-header-menu"
    );

    await expect(headerMenu).toBeVisible();
    await headerMenu.getByRole("button", { name: "All" }).click();
    await this.page.locator("input#filter").click();
    await this.page.keyboard.press("Meta+A");
    await this.page.keyboard.press("Backspace");
    await this.page.fill("input#filter", moduleName);
    await this.page
      .locator("span.menu-item-row")
      .getByRole("menuitem", { name: moduleName, exact: true })
      .click();
    /* if (isOpenedInNewTab) {
      const pagePromise = this.browserContext.waitForEvent("page");
      const newPage = await pagePromise;
      await newPage.waitForLoadState("networkidle");
      console.log(await newPage.title());
    } */
    await this.page.waitForLoadState("networkidle");
    await expect(this.page.locator("span.experience-title")).toBeVisible();
    await this.page.screenshot({
      path: this.screenshotFolderPath + "navigate-all-menu.png",
    });
  }
}
