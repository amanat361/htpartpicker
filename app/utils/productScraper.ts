"use server";

import Chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

import type { Page } from "puppeteer-core";
import { mockProducts } from "@lib/products";

export interface Product {
  url: string;
  image: string;
  title: string;
  price: string;
  brand: string;
  description: string;
  highlights: string[];
}

export interface FormState {
  urls: string[];
  products: Product[];
  message: string;
  hasError: boolean;
}

const LOCAL_CHROME_EXECUTABLE =
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

async function getBrandList(url: string): Promise<string[]> {
  const executablePath = await Chromium.executablePath || LOCAL_CHROME_EXECUTABLE;
  const browser = await puppeteer.launch({
    executablePath,
    args: Chromium.args,
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(url);

  // Scrape brand labels with 'for' attribute starting with 'Brand'
  const brands = await page.evaluate(() => {
    const brandLabels = Array.from(document.querySelectorAll('.form-check-label[for^="Brand"]')) as HTMLLabelElement[];
    return brandLabels.map(label => label.textContent?.trim() || '');
  });

  await browser.close();
  return brands;
}

async function findAllProductsOnPage(url: string): Promise<Product[]> {
  const executablePath = await Chromium.executablePath || LOCAL_CHROME_EXECUTABLE;
  const browser = await puppeteer.launch({
    executablePath,
    args: Chromium.args,
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(url);

  // Function to scroll through the page
  async function autoScroll(page: Page) {
    await page.evaluate(async () => {
      await new Promise<void>((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  // Scroll through the page to trigger lazy loading
  await autoScroll(page);

  // Now scrape the products
  const products: Product[] = await page.evaluate(() => {
    const productBlocks = Array.from(
      document.querySelectorAll(".product-block")
    );
    return productBlocks.map((productBlock) => {
      const product: Product = {
        url: "",
        image: "",
        title: "",
        price: "",
        brand: "",
        description: "",
        highlights: [],
      };

      const a = productBlock.querySelector("a");
      product.url = a?.href || "";

      const img = productBlock.querySelector(
        "img.prodImage"
      ) as HTMLImageElement;
      product.image = img?.src || "";

      const h4 = productBlock.querySelector("h4.product-list-items-title");
      product.title = h4?.textContent || "";

      const p = productBlock.querySelector("p.product-list-items-desc");
      product.description = p?.textContent || "";

      const span = productBlock.querySelector("span.price");
      product.price = span?.textContent || "";

      const ul = productBlock.querySelector("ul.product-list-items-highlights");
      if (ul) {
        const lis = ul.querySelectorAll("li");
        product.highlights = Array.from(lis).map((li) => li.textContent || "");
      }

      return product;
    });
  });

  await browser.close();
  return products;
}

export async function startScraping(state: FormState, formData: FormData) {

  
  const rawFormData = Object.fromEntries(formData.entries());
  const url = rawFormData.url as string;
  
  // return {
  //   urls: [...state.urls, url],
  //   hasError: false,
  //   message: "Scraping complete!",
  //   products: [...state.products, ...mockProducts]
  // };

  if (state.urls.includes(url)) {
    return {
      urls: state.urls,
      hasError: true,
      message: "URL has already been scraped!",
      products: state.products,
    };
  }

  console.clear();
  console.log("Scraping started...");
  const brands = await getBrandList(url);
  const products = await findAllProductsOnPage(url);
  products.forEach((product) => {
    const brand = brands.find((brand) => product.title.includes(brand));
    product.brand = brand || "";
  });
  console.log("Scraping complete!");

  if (products.length === 0) {
    return {
      urls: state.urls,
      hasError: true,
      message: "No new products found!",
      products: state.products,
    };
  }

  return {
    urls: [...state.urls, url],
    hasError: false,
    message: "Scraping complete!",
    products: [...state.products, ...products]
  };
}
