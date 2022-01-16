import axios, { AxiosPromise } from "axios";
import * as cheerio from "cheerio";
import { CheerioAPI } from "cheerio";

const URL: string =
  "https://us.louisvuitton.com/eng-us/women/handbags/iconic-monogram-bags/_/N-1b916w8";

interface Item {
  title: string;
  date: string;
  status: string;
}

// Queries the site for html
const getHtml = (url: string): string => {
  const data: any = axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};

// Pulls product name
const getItemName = (html: string, sku: string): string => {
  const site = getHtml(html);
  const $: CheerioAPI = cheerio.load(site);
  const title = $("#lv-card-" + sku).text();
  return `${title} - ${sku}`;
};

// Pulls LV item information on whether it's in stock
const getItemDetails = (html: string, skus: string[]): Item[] => {
  const $: CheerioAPI = cheerio.load(html);
  const data: Item[] = [];

  skus.map(async (sku) => {
    const info: Item = {
      title:
        $("#product-" + sku).length > 0
          ? `${$("#product-" + sku)
              .text()
              .trim()} - ${sku}`
          : await getItemName(URL, sku),
      date: new Date().toLocaleString(),
      status: $("#product-" + sku).text() !== "" ? "In Stock" : "Out of stock",
    };

    data.push(info);
  });

  return data;
};

export { getHtml, getItemDetails };
