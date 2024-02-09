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

export type ScrapeLink = {
  url: string;
  scraping: boolean;
  hasError: boolean;
  message: string;
  products: Product[];
};

async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100; // You can adjust this value based on the average size of the elements
      var previousHeight = -1;

      var checkScroll = () => {
        var scrollHeight = document.body.scrollHeight;
        if (totalHeight >= scrollHeight && previousHeight === scrollHeight) {
          // If we've reached the bottom and the height hasn't changed, we're done
          resolve();
        } else {
          previousHeight = scrollHeight; // Update the last known height
          window.scrollBy(0, distance);
          totalHeight += distance;
          setTimeout(checkScroll, 100); // Adjust this value as needed for load times
        }
      };

      checkScroll();
    });
  });
}

// async function autoScroll(page: Page) {
//   await page.evaluate(async () => {
//     await new Promise<void>((resolve, reject) => {
//       var totalHeight = 0;
//       var distance = 300;
//       var timer = setInterval(() => {
//         var scrollHeight = document.body.scrollHeight;
//         window.scrollBy(0, distance);
//         totalHeight += distance;

//         if (totalHeight >= scrollHeight) {
//           clearInterval(timer);
//           resolve();
//         }
//       }, 30);
//     });
//   });
// }

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

const returnMockData = process.env.NODE_ENV === "development";

export async function POST(req: Request): Promise<NextResponse<ScrapeLink>> {
  const body = await req.json();
  const { url } = body;

  // Check if the URL is in the request body
  if (!url) {
    const resBody = {
      url: "URL undefined",
      scraping: false,
      hasError: true,
      message: "URL is required!",
      products: [],
    };
    return NextResponse.json(resBody, { status: 400 });
  }

  // Check if the URL is valid
  if (!validateUrl(url)) {
    const resBody = {
      url: url,
      scraping: false,
      hasError: true,
      message: "Invalid URL!",
      products: [],
    };
    return NextResponse.json(resBody, { status: 400 });
  }

  // Return mock data if the flag is set
  if (returnMockData) {
    // wait 10 seconds to simulate a slow response
    await new Promise((resolve) => setTimeout(resolve, 10000));

    const resBody = {
      url: url,
      scraping: false,
      hasError: false,
      message: `${mockProducts.length} mock products scraped!`,
      products: mockProducts,
    };
    return NextResponse.json(resBody, { status: 200 });
  }

  // Scrape the URL
  try {
    const brands = await getBrandList(url);
    const products = await findAllProductsOnPage(url);

    if (brands.length === 0) {
      const resBody = {
        url: url,
        scraping: false,
        hasError: false,
        message: "No brands found!",
        products: [],
      };
      return NextResponse.json(resBody, { status: 400 });
    }

    if (products.length === 0) {
      const resBody = {
        url: url,
        scraping: false,
        hasError: false,
        message: "No products found!",
        products: [],
      };
      return NextResponse.json(resBody, { status: 400 });
    }

    products.forEach((product) => {
      const brand = brands.find((brand) => product.title.includes(brand));
      product.brand = brand || "";
    });

    const resBody = {
      url: url,
      scraping: false,
      hasError: false,
      message: `${products.length} products scraped successfully!`,
      products: products,
    };
    return NextResponse.json(resBody, { status: 200 });
  } catch (error) {
    const resBody = {
      url: url,
      scraping: false,
      hasError: true,
      message: "Error scraping the URL",
      products: [],
    };
    return NextResponse.json(resBody, { status: 500 });
  }
}
