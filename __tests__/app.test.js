import { TEST_URL } from "../lib/constants";
import { post } from "axios";
import logger from "../utils/logger";

describe("OG Scraper Test Cases", () => {
  const testCases = [
    {
      url: "https://neilpatel.com/blog/open-graph-meta-tags/",
      expectedResponse: {
        ogInfo: {
          ogLocale: "en_US",
          ogType: "article",
          ogTitle:
            "What You Need to Know About Open Graph Meta Tags for Total Facebook and Twitter Mastery",
          ogDescription:
            "It promotes integration between Facebook and other websites by allowing them to become rich graph objects with the same functionality as other Facebook objects.",
          ogUrl: "https://neilpatel.com/blog/open-graph-meta-tags/",
          ogSitename: "Neil Patel",
          ogImage:
            "https://neilpatel.com/wp-content/uploads/2014/03/head-html.png",
        },
      },
    },
    {
      url:
        "https://ahrefs.com/blog/open-graph-meta-tags/#:~:text=Open%20Graph%20meta%20tags%20are%20snippets%20of%20code%20that%20control,head%3E%20section%20of%20a%20webpage.",
      expectedResponse: {
        ogInfo: {
          ogLocale: "en_US",
          ogType: "article",
          ogTitle: "Open Graph Meta Tags: Everything You Need to Know",
          ogDescription:
            "Make your content more clickable and shareable on social media.",
          ogUrl: "https://ahrefs.com/blog/open-graph-meta-tags/",
          ogSitename: "SEO Blog by Ahrefs",
          ogImage:
            "https://ahrefs.com/blog/wp-content/uploads/2020/01/fb-open-graph-tags.png",
          ogImagewidth: "1920",
          ogImageheight: "990",
        },
      },
    },
  ];
  for (let i = 0; i < testCases.length; i++) {
    const { url, expectedResponse } = testCases[i];
    it(`OG Scraping for ${url}`, async (done) => {
      try {
        const query = `{
            getOgMetadata(url:"${url}"){
              ogInfo
            }
          }`;
        const {
          status,
          data: {
            data: { getOgMetadata },
          },
        } = await post(`${TEST_URL}/playground`, {
          query,
        });
        expect(status).toBe(200);
        expect(getOgMetadata).toStrictEqual(expectedResponse);
        done();
      } catch (error) {
        logger.error(`Error while scraping ${url}`, error);
      }
    });
  }
});
