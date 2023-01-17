// @ts-check
import { expect } from "@playwright/test";

export class SnNavigation {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {any} screenshotFolderPath
   */
  constructor(page, screenshotFolderPath) {
    this.page = page;
    this.screenshotFolderPath = screenshotFolderPath;
  }

  /**
   * @param {string} instanceUrl
   */
  async goToInstance(instanceUrl) {
    await this.page.goto(instanceUrl);
  }
}
