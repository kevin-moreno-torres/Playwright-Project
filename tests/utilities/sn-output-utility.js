// @ts-check
import config from "../../playwright.config";

export class SnOutput {
  /**
   * @param {string} testSuiteName
   */
  constructor(testSuiteName) {
    this.testSuiteName = testSuiteName;
  }

  /**
   * @param {import('@playwright/test').Page} page
   * @param {string} fileName
   */
  async takeScreenShot(page, fileName) {
    await page.screenshot({
      path: `${config.outputDir}/${this.testSuiteName}/${fileName}`,
    });
  }
}
