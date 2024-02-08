"use server";

import { getPage } from "@utils/puppeteerServer";
import { validateUrl } from "@utils/helperFunctions";
import { mockProducts } from "@lib/products";

import type { Page } from "puppeteer-core";

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

async function getBrandList(url: string): Promise<string[]> {
  const page = await getPage();
  await page.goto(url);

  const brands = await page.evaluate(() => {
    const brandLabels = Array.from(
      document.querySelectorAll('.form-check-label[for^="Brand"]')
    ) as HTMLLabelElement[];
    return brandLabels.map((label) => label.textContent?.trim() || "");
  });

  return brands;
}

async function findAllProductsOnPage(url: string): Promise<Product[]> {
  const page = await getPage();
  await page.goto(url);

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

  return products;
}

export async function startScraping(state: FormState, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const url = rawFormData.url as string;

  if (!validateUrl(url)) {
    return {
      urls: state.urls,
      hasError: true,
      message: "Invalid URL!",
      products: state.products,
    };
  }

  // uncomment to use mock data
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

  const brands = await getBrandList(url);
  const products = await findAllProductsOnPage(url);
  products.forEach((product) => {
    const brand = brands.find((brand) => product.title.includes(brand));
    product.brand = brand || "";
  });

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
    products: [...state.products, ...products],
  };
}

type ScrapeLinkResponse = {
  hasError: boolean;
  message: string;
  products: Product[];
};

export async function scrapeLink(url: string): Promise<ScrapeLinkResponse> {
  if (!validateUrl(url)) {
    return {
      hasError: true,
      message: "Invalid URL!",
      products: [],
    };
  }

  // uncomment to use mock data
  return {
    hasError: false,
    message: "Scraping complete!",
    products: mockProducts
  };


  const brands = await getBrandList(url);
  const products = await findAllProductsOnPage(url);
  products.forEach((product) => {
    const brand = brands.find((brand) => product.title.includes(brand));
    product.brand = brand || "";
  });

  if (products.length === 0) {
    return {
      hasError: true,
      message: "No new products found!",
      products: [],
    };
  }

  return {
    hasError: false,
    message: "Scraping complete!",
    products,
  };
}
