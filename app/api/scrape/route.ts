import { getPage } from "@utils/puppeteerServer";
import { validateUrl } from "@utils/helperFunctions";
import { mockProducts } from "@lib/products";
import type { Page } from "puppeteer-core";
import { NextResponse } from "next/server";

export interface Product {
  url: string;
  image: string;
  title: string;
  price: string;
  brand: string;
  description: string;
  highlights: string[];
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

export type ResponseJson = {
  url: string;
  message: string;
  products: Product[];
};

type ScrapeResponse = NextResponse<ResponseJson>;

const returnMockData = true;

export async function POST(req: Request): Promise<ScrapeResponse> {
  const body = await req.json();
  const { url } = body;
  console.log("URL: ", url)
  if (!url) {
    const resBody = {url: "", message: "URL is required", products: [] };
    return NextResponse.json(resBody, { status: 400 });
  }

  if (!validateUrl(url)) {
    const resBody = {url: url, message: "Invalid URL!", products: [] };
    return NextResponse.json(resBody, { status: 400 });
  }

  if (returnMockData) {
    const resBody = {url: url, message: "Scraping complete! (Mock Products Returned)", products: mockProducts };
    return NextResponse.json(resBody, { status: 200 });
  }

  try {
    const brands = await getBrandList(url);
    const products = await findAllProductsOnPage(url);

    products.forEach((product) => {
      const brand = brands.find((brand) => product.title.includes(brand));
      product.brand = brand || "";
    });

    if (products.length === 0) {
      const resBody = {url: url, message: "No new products found!", products: [] };
      return NextResponse.json(resBody, { status: 400 });
    }

    const resBody = {url: url, message: "Scraping complete!", products };
    return NextResponse.json(resBody, { status: 200 });
  }
  catch (error) {
    const resBody = {url: url, message: "Failed to scrape the URL!", products: [] };
    return NextResponse.json(resBody, { status: 500 });
  }
}
