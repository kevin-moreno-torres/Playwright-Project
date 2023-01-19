// @ts-check
import { test, expect } from "@playwright/test";
import { SnNavigation } from "./utilities/sn-navigation-utility";
import { SnSession } from "./utilities/sn-session-utility";

let instance;

class SnPwAtf {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    instance = this;
  }

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').BrowserContext} context
   * @param {string} testSuiteName
   */
  initialize(page, context, testSuiteName) {
    return {
      navigation: new SnNavigation(page, context, testSuiteName),
      session: new SnSession(page, testSuiteName),
    };
  }
}

let snPwAtfInstance = Object.freeze(new SnPwAtf());
export default snPwAtfInstance;
