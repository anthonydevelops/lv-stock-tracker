import { getHtml, getItemDetails } from "./util/scraper";

// "available online" url
const URL: string =
  "https://us.louisvuitton.com/eng-us/women/handbags/iconic-monogram-bags/_/N-1b916w8Zj216ex";

// List of skus to search
const SKUS: string[] = ["M44875", "M57729", "M43596", "M45571"];

const main = async () => {
  const html = await getHtml(URL);
  const item = await getItemDetails(html, SKUS);
  console.log(item);
};

main();
