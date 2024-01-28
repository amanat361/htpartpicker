"use server";

import puppeteer from "puppeteer";

export interface Product {
  url: string;
  prodImage: string;
  title: string;
  price: string;
  highlights: string[];
}

async function findAllProductsOnPage(url: string) {
  console.log("Now scraping: " + url)
  const browser = await puppeteer.launch({
    headless: "new", // Opting into the new Headless mode
  });
  const page = await browser.newPage();
  await page.goto(url);
  // await page.waitForNetworkIdle({idleTime: 1000});

  const products = await page.evaluate(() => {
    const productBlocks = document.querySelectorAll(".product-block");
    const products: Product[] = [];
    productBlocks.forEach((productBlock) => {
      const product: Product = {
        url: "",
        prodImage: "",
        title: "",
        price: "",
        highlights: [],
      };
      const a = productBlock.querySelector("a");
      if (a) {
        product.url = a.href;
      }
      // page.waitForSelector("img.prodImage", { visible: true });
      const img = productBlock.querySelector("img.prodImage");
      if (img) {
        product.prodImage = img.getAttribute("src") || "";
      }
      const h4 = productBlock.querySelector("h4.product-list-items-title");
      if (h4) {
        product.title = h4.textContent || "";
      }
      const span = productBlock.querySelector("span.price");
      if (span) {
        product.price = span.textContent || "";
      }
      const ul = productBlock.querySelector("ul.product-list-items-highlights");
      if (ul) {
        const lis = ul.querySelectorAll("li");
        lis.forEach((li) => {
          product.highlights.push(li.textContent || "");
        });
      }
      products.push(product);
    });
    return products;
  });

  await browser.close();
  return products;
}

export async function startScraping(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const url = rawFormData.url as string;
  const products = await findAllProductsOnPage(url);
  console.log(products)
  return products;
}
