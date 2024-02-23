import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

import type { Page } from "puppeteer-core";

let _page: Page | null = null;

const GITHUB_CHROME_EXECUTABLE =
  "https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar";

async function getBrowser() {
  return puppeteer.launch({
    executablePath: await chromium.executablePath(GITHUB_CHROME_EXECUTABLE),
    args: chromium.args,
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
    ignoreHTTPSErrors: true,
  });
}

export async function getPage() {
  if (_page) {
    return _page;
  }
  const browser = await getBrowser();
  _page = await browser.newPage();
  return _page;
}