// @ts-check
const { test, expect } = require("@playwright/test");

export class Session {
  constructor(user, password) {
    this.user = user;
    this.password = password;
  }
}
