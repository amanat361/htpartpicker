"use server";

import puppeteer from "puppeteer";

async function scrapeSpecificProduct(url: string) {
  const browser = await puppeteer.launch({
    headless: "new", // Opting into the new Headless mode
  });
  const page = await browser.newPage();
  await page.goto(url);

  const product = await page.evaluate(() => {
    const name = document.querySelector(
      ".product-single-title"
    )?.textContent as string;

    const image_url = document.querySelector(
      ".product__photo-wrapper-product-template img"
    )?.getAttribute("src") as string;

    const price = document.querySelector(
      ".product__price span"
    )?.textContent as string;

    const description = document.querySelector(
      ".product-single__description rte"
    )?.textContent as string;

    const specs = Array.from(
      document.querySelectorAll(".product-single__description .rte ul li"),
      (element) => element.textContent
    );

    const tags = Array.from(
      document.querySelectorAll(".product-single__description .rte p a"),
      (element) => element.textContent
    );

    return {
      name,
      image_url,
      price,
      description,
      specs,
      tags,
    };
  });

  await browser.close();

  return product;
}

async function findAllProductsOnPage(url: string) {
  const browser = await puppeteer.launch({
    headless: "new", // Opting into the new Headless mode
  });
  const page = await browser.newPage();
  await page.goto(url);

  const productLinks: string[] = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll(".product-related-card a[href]"),
      (element) => (element as HTMLAnchorElement).href
    );
    return links;
  });

  await browser.close();

  return productLinks;
}

export async function startScraping(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const url = rawFormData.url as string;
  const productLinks = await findAllProductsOnPage(url);
  const products = await Promise.all(
    productLinks.map((link) => scrapeSpecificProduct(link))
  );
  console.log(products);
  return productLinks;
}
